# ADR-007: Prompt Enrichment via Pre-fetched Repo Data

**Status**: Accepted
**Date**: 2026-03-25

## Context

`gpt-4o-mini` (and all GitHub Models API models) have no web-browsing capability. Passing only a GitHub URL in the prompt results in hallucinated or stale training-data responses. Real repo metadata must be injected into the prompt by `evaluate.ts` before the LLM call.

## Decision

`evaluate.ts` pre-fetches the following before building the prompt:

| Endpoint | Data injected |
|----------|--------------|
| `GET /repos/<owner>/<repo>` | `description`, `language`, `stargazers_count`, `archived`, `pushed_at`, `topics`, `license.spdx_id` |
| `GET /repos/<owner>/<repo>/readme` | Base64-decoded, truncated to last newline at or before 15 000 chars (approx. 20k tokens) |
| `GET /repos/<owner>/<repo>/releases/latest` | `tag_name` (stored as `version_at_eval`; `null` on 404) |
| `GET /repos/<owner>/<repo>/languages` | Top 3 languages by bytes |

`buildPrompt()` in `evaluate.ts` iterates `classification.yaml` to inject dimension guidance dynamically — no hardcoded field names in the script (see ADR-012).

## Consequences

- 4 additional GitHub API calls per evaluation; adds latency but ensures accuracy
- README truncated at the last newline at or before 15 000 chars (approx. 20k tokens) — avoids token budget overruns while capturing enough detail (features, roadmap, comparisons) from long READMEs. The script should ideally prioritize the Introduction, Features, and any "Comparison" headers if further truncation is required.
- `version_at_eval`, `stars_at_eval`, `starred`, `language`, and `schema_version` are written by the script directly from API responses — not from model output

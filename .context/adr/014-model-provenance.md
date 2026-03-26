# ADR-014: Model Provenance Tracking

**Status**: Accepted
**Date**: 2026-03-25

## Context

`schema_version` in page frontmatter tracks when a page was evaluated against an outdated *local* classification config. It does not capture which LLM model produced the scores.

This matters because:

- GitHub Models API may update `gpt-4o-mini` in place (new weights, system prompt, RLHF tuning) without changing its identifier in the API contract
- A model update can shift score distributions across all repos — e.g. the model becomes more generous on `community` scores — without any local config change triggering re-evaluation
- Without a recorded `model_id`, there is no way to query "which pages were evaluated before the model changed" or to compare score distributions across model versions

Options considered:

- **Don't track** — simple; acceptable if scores are treated as approximate and not compared over time
- **Track `schema_version` only** — already implemented; does not capture model identity
- **Track a prompt hash** — captures both schema and prompt framing changes; complex to compute and unstable (whitespace changes invalidate it)
- **Track `model_id`** — records the model constant used at eval time; simple, stable, queryable in frontmatter

## Decision

Add `model_id` to page frontmatter. `evaluate.ts` writes the value of its internal model constant (e.g. `"gpt-4o-mini"`) at evaluation time — never from model output.

```yaml
model_id: "gpt-4o-mini"   # model used at eval time
```

When the model constant in `evaluate.ts` is changed, existing pages with the old `model_id` are identifiable and can be queued for re-evaluation manually (or via a targeted `schema-sync` run). This does not happen automatically — a model change does not bump `schema_version`.

## Consequences

- Every page carries a stable, queryable record of which model produced its scores
- Score drift from upstream model updates is detectable by comparing `model_id` across the corpus
- No automatic re-evaluation on model change — this is intentional; the operator decides whether a model update warrants re-scoring the entire corpus
- `model_id` is validated by `repo-page.schema.json` as a non-empty string; no enum constraint (to avoid needing a schema bump on every model change)
- Prompt hash was rejected: too fragile, high maintenance cost for low additional signal given that prompt content is already fully captured by `schema_version` + `model_id`

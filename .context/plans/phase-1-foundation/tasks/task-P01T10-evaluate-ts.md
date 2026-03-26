# P01T10 — `scripts/evaluate.ts`

## Goal
Core evaluation script: fetch repo data, build prompt, call GitHub Models API,
write evaluated page as a pull request branch.

## Files
- `scripts/evaluate.ts`

## Implementation
- **Repo data fetch**: `GET /repos/{owner}/{repo}` via GitHub REST API — name,
  description, language, stars, topics, homepage, README (truncated at last
  newline ≤ 4000 chars — see ADR-007).
- **Prompt builder**: inject fetched data + classification schema into system
  prompt; request structured JSON response matching Zod schema.
- **LLM call**: GitHub Models API, `gpt-4o-mini` — see ADR-002.
- **Response validation**: Zod parse → exit on failure — see ADR-008.
- **Idempotency guard**: if `docs/repos/<owner>-<repo>.md` already exists, skip
  (no re-evaluation unless `pending-re-evaluation` label) — see ADR-013.
- **Page writer**: render validated response into frontmatter + body per
  `page-template.yaml`; write to `docs/repos/<owner>-<repo>.md`.
- `--dry-run` flag: fetch + prompt + validate but do not write file — see ADR-018.
- `model_id` in frontmatter — see ADR-014.

## TDD
Write `scripts/evaluate.test.ts` collocated **before** implementing. Extract pure functions
to make them testable in isolation.

**Happy path**
- Prompt builder: README at exactly 4000 chars truncates at last newline, not mid-word
- Prompt builder: README shorter than 4000 chars is not truncated
- Page renderer: valid LLM JSON response → correct frontmatter field values
- Idempotency guard: existing page file → returns skip signal; missing file → proceeds

**Failure modes**
- LLM returns JSON that fails Zod schema → script exits non-zero, no file written, error logged with raw response excerpt
- GitHub Models API responds 429 → script exits non-zero with "rate limited" message (no retry; workflow will requeue)
- GitHub Models API responds 5xx → script exits non-zero with status code in message
- GitHub REST API returns 404 for the repo → script exits non-zero with "repo not found" message
- PR already open on branch `eval/<owner>-<repo>-*` → script exits 0 with "PR already open, skipping" message (idempotent)

## References
- `adr/002-llm-model-and-auth.md` — GitHub Models API + gpt-4o-mini
- `adr/007-prompt-enrichment.md` — pre-fetch repo data, README truncation
- `adr/008-response-validation.md` — Zod validation
- `adr/013-evaluation-idempotency.md` — page-exists guard
- `adr/014-model-provenance.md` — `model_id` frontmatter
- `site-structure.md` — page body template

## Verification
```sh
bun scripts/evaluate.ts --dry-run owner/repo
echo $?  # 0 = LLM round-trip succeeded, page not written
```

## Status
pending

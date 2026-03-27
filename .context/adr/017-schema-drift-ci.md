# ADR-017: Generated JSON Schema Drift Enforcement in CI

**Status**: Accepted
**Date**: 2026-03-25

## Context

`generate-schema.ts` emits two generated artefacts committed to the repo:

- `docs/schema/repo-page.schema.json` — derived from `PageFrontmatterSchema` (Zod), which is itself derived from `classification.yaml`
- `docs/schema/compare-page.schema.json` — derived from `ComparePageFrontmatterSchema` (Zod)

`review.yml` uses these files via Ajv to validate frontmatter on every PR. If a developer changes `classification.yaml` without re-running `bun run generate:schema`, the committed JSON schemas are stale. `review.yml` then validates PRs against an outdated schema — either too strict (blocking valid pages) or too permissive (passing invalid ones), silently corrupting the CI gate.

There is no existing CI step that detects this drift.

## Decision

Add a `check:schema` npm script that regenerates the JSON schemas and diffs them against the committed files, exiting non-zero if any difference is found:

```json
"check:schema": "bun scripts/generate-schema.ts --check"
```

`generate-schema.ts` in `--check` mode writes to a temp directory and runs `git diff --no-index --exit-code docs/schema/repo-page.schema.json <tmp>/repo-page.schema.json && git diff --no-index --exit-code docs/schema/compare-page.schema.json <tmp>/compare-page.schema.json`. Any divergence fails with a descriptive message: *"Committed schema is stale. Run `bun run generate:schema` and commit the result."*

Run `check:schema` as an unconditional early step in `review.yml` — before the branch-prefix dispatch — so it gates all PRs to `main`, not just eval branches. Also run it in `schema-sync.yml` before scanning for stale pages, to catch the case where `classification.yaml` was changed without regenerating schemas.

## Consequences

- **Coverage**: any PR that introduces a classification change without regenerating schemas is blocked at `review.yml` before validation runs.
- **Developer workflow**: when changing `classification.yaml`, the required sequence is: edit → `bun run generate:schema` → commit both files together. This is documented in `../knowledge-base/site-structure.md`.
- **No runtime overhead**: `--check` mode writes to `/tmp`; no repo changes are made by the check.
- **False negatives eliminated**: the existing note in `../knowledge-base/site-structure.md` ("Must be committed alongside any change to `classification.yaml`") becomes machine-enforced rather than convention-only.
- **One extra CI step per PR**: negligible cost (< 2 s).

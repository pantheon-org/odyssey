# P03T30 — `.github/workflows/schema-sync.yml`

## Goal
Trigger `schema-sync.ts` whenever `classification.yaml` is pushed to `main`.

## Files
- `.github/workflows/schema-sync.yml`

## Implementation
- Trigger: `push` to `main` with path filter `docs/schema/classification.yaml`.
- Steps: checkout → setup-bun → `bun install` → `bun run check:schema` (ADR-017)
  → `bun scripts/schema-sync.ts`.
- `check:schema` step comes first; if JSON schemas are stale, fail fast before
  scanning pages.
- See `workflows.md` for full YAML spec.

## References
- `adr/017-schema-drift-ci.md` — `check:schema` step
- `adr/019-schema-sync-throttling.md` — issue creation throttling
- `workflows.md` — schema-sync.yml spec

## Verification
```sh
# Push a trivial change to classification.yaml on a branch and merge
gh workflow run schema-sync.yml
gh run list --workflow=schema-sync.yml --limit=1
```

## Acceptance Criteria
- [ ] Push of `docs/schema/classification.yaml` to `main` triggers `schema-sync.yml`
- [ ] `bun run check:schema` step runs first; a stale JSON schema causes the workflow to fail before scanning pages
- [ ] Workflow completes with conclusion `success` when schemas are in sync and no stale pages are found
- [ ] `workflow_dispatch` allows manual runs

## Status
pending

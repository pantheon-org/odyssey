# P03T17 — `.github/workflows/schema-sync.yml`

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
- See `../../../knowledge-base/workflows.md` for full YAML spec.

## References
- `adr/017-schema-drift-ci.md` — `check:schema` step
- `adr/019-schema-sync-throttling.md` — issue creation throttling
- `../../../knowledge-base/workflows.md` — schema-sync.yml spec

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

## Definition of Done

**Must Have**
- [ ] Push of `docs/schema/classification.yaml` to `main` triggers `schema-sync.yml`
- [ ] `bun run check:schema` runs first; a stale JSON schema causes the workflow to fail before scanning pages
- [ ] Workflow completes with conclusion `success` when schemas are in sync and no stale pages exist

**Should Have**
- [ ] All acceptance criteria pass, including `workflow_dispatch` allowing manual runs

**Could Have**
- [ ] Workflow summary step reports the number of stale pages found and issues created

**Won't Have (this iteration)**
- Automatic schema generation within this workflow — `generate:schema` must be run and committed manually before pushing `classification.yaml`

## Status
pending

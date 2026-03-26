# P03T10 — `.github/workflows/compare.yml`

## Goal
Trigger `compare.ts` on repo page pushes and `groups.yaml` pushes; protect against
cascade storms.

## Files
- `.github/workflows/compare.yml`

## Implementation
- Triggers:
  - `push` to `main` with path filter `docs/repos/**` (new/updated repo page)
  - `push` to `main` with path filter `docs/schema/groups.yaml`
- Cascade protection:
  - `compare.ts` no-op fast exit when repo is in no group (ADR-016).
  - Global serialisation: `concurrency: group: compare, cancel-in-progress: false`
    so runs queue rather than cancel.
  - `p-limit(3)` for group LLM calls within a run (ADR-016).
- Steps: checkout → setup-bun → `bun install` → `bun scripts/compare.ts` →
  open PR `compare/<group-id>-<GITHUB_RUN_ID>` if page changed.

## References
- `adr/016-compare-cascade-protection.md` — cascade protection design
- `workflows.md` — compare.yml spec

## Verification
```sh
gh workflow run compare.yml
gh run list --workflow=compare.yml --limit=1
```

## Status
pending

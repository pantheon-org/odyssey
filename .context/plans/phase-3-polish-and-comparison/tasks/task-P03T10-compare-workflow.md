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
- `../../../knowledge-base/workflows.md` — compare.yml spec

## Verification
```sh
gh workflow run compare.yml
gh run list --workflow=compare.yml --limit=1
```

## Acceptance Criteria
- [ ] Push of a file under `docs/repos/**` to `main` triggers `compare.yml`
- [ ] Push of `docs/schema/groups.yaml` to `main` triggers `compare.yml`
- [ ] A repo that belongs to no group causes the workflow to exit 0 without opening a PR
- [ ] Concurrent workflow runs queue (not cancel) due to `concurrency: cancel-in-progress: false`
- [ ] When a group is affected, a PR is opened on a branch matching `compare/<group-id>-<GITHUB_RUN_ID>`

## Definition of Done

**Must Have**
- [ ] `compare.yml` triggers on `docs/repos/**` and `docs/schema/groups.yaml` pushes to `main`
- [ ] A repo in no group causes the workflow to exit 0 without opening a PR
- [ ] When a group is affected, a PR is opened on a branch matching `compare/<group-id>-<GITHUB_RUN_ID>`

**Should Have**
- [ ] All acceptance criteria verified including concurrent runs queuing (not cancelling) via `concurrency: cancel-in-progress: false`

**Could Have**
- [ ] Workflow summary step that logs which groups were triggered and how many pages were updated

**Won't Have (this iteration)**
- Fan-out parallelism across groups within a single workflow run — `p-limit(3)` within a single job is the design

## Status
pending

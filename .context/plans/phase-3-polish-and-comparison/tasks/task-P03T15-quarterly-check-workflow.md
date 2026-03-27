# P03T15 — `.github/workflows/quarterly-check.yml`

## Goal
Run `quarterly-check.ts` on a quarterly cron schedule.

## Files
- `.github/workflows/quarterly-check.yml`

## Implementation
- Trigger: `schedule: [{cron: "0 9 1 1,4,7,10 *"}]` (first day of each quarter,
  09:00 UTC) and `workflow_dispatch`.
- Steps: checkout → setup-bun → `bun install` → `bun scripts/quarterly-check.ts`.
- No write-back needed (only creates GitHub Issues, no file commits).
- See `../../../knowledge-base/workflows.md` for full YAML spec.

## References
- `adr/006-re-evaluation-cadence.md` — quarterly cron rationale
- `../../../knowledge-base/workflows.md` — quarterly-check.yml spec

## Verification
```sh
gh workflow run quarterly-check.yml
gh run list --workflow=quarterly-check.yml --limit=1
```

## Acceptance Criteria
- [ ] `gh workflow run quarterly-check.yml` completes with conclusion `success`
- [ ] Workflow YAML contains a `schedule` cron trigger: `0 9 1 1,4,7,10 *`
- [ ] `workflow_dispatch` trigger allows manual runs without changing the schedule
- [ ] Workflow creates `pending-re-evaluation` issues only (no file writes)

## Definition of Done

**Must Have**
- [ ] `.github/workflows/quarterly-check.yml` exists with a `schedule` cron trigger `0 9 1 1,4,7,10 *` and `workflow_dispatch`
- [ ] `gh workflow run quarterly-check.yml` completes with conclusion `success`

**Should Have**
- [ ] All acceptance criteria pass, including confirming the workflow creates `pending-re-evaluation` issues only (no file writes)

**Could Have**
- [ ] Workflow step summary output shows the count of repos scanned and issues created per run

**Won't Have (this iteration)**
- Per-repo configurable re-evaluation cadence — the quarterly schedule applies uniformly to all evaluated repos

## Depends on

- [P03T14](task-P03T14-quarterly-check-ts.md) — `scripts/quarterly-check.ts` must be implemented; the workflow calls it

## Context

_Minimum reads before starting:_

- `../../../knowledge-base/workflows.md` — quarterly-check.yml cron schedule and GH_PAT secrets

## Status
pending

# P03T28 — `.github/workflows/quarterly-check.yml`

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

## Status
pending

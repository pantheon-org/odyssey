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
- See `workflows.md` for full YAML spec.

## References
- `adr/006-re-evaluation-cadence.md` — quarterly cron rationale
- `workflows.md` — quarterly-check.yml spec

## Verification
```sh
gh workflow run quarterly-check.yml
gh run list --workflow=quarterly-check.yml --limit=1
```

## Status
pending

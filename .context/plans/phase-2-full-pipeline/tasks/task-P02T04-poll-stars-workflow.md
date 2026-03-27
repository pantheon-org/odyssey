# P02T04 — `.github/workflows/poll-stars.yml`

## Goal
Run `poll-stars.ts` on a 15-minute cron schedule.

## Files
- `.github/workflows/poll-stars.yml`

## Implementation
- Trigger: `schedule: [{cron: "*/15 * * * *"}]` and `workflow_dispatch` (manual
  re-run).
- Steps: checkout (with write permission) → setup-bun → `bun install` →
  `bun scripts/poll-stars.ts` → commit updated cursor back to `main` if changed.
- Requires `contents: write` permission to commit the cursor update.
- See `workflows.md` for the full YAML spec.

## References
- `workflows.md` — full YAML spec for poll-stars.yml

## Verification
```sh
gh workflow run poll-stars.yml
gh run list --workflow=poll-stars.yml --limit=1
```

## Acceptance Criteria
- [ ] `gh workflow run poll-stars.yml` completes with conclusion `success`
- [ ] Workflow is configured with a `schedule` cron trigger running every 15 minutes
- [ ] `workflow_dispatch` trigger allows manual re-runs
- [ ] Workflow requires `contents: write` permission (to support future cursor commits if needed)

## Status
pending

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
- See `../../../knowledge-base/workflows.md` for the full YAML spec.

## References
- `../../../knowledge-base/workflows.md` — full YAML spec for poll-stars.yml

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

## Definition of Done

**Must Have**
- [ ] `.github/workflows/poll-stars.yml` exists with a `schedule` cron trigger (`*/15 * * * *`) and `workflow_dispatch`
- [ ] `gh workflow run poll-stars.yml` completes with conclusion `success`
- [ ] Workflow declares `contents: write` permission

**Should Have**
- [ ] All acceptance criteria are verified (cron trigger, dispatch trigger, permission, successful manual run)

**Could Have**
- [ ] Workflow includes a step summary output showing how many new issues were created on each run

**Won't Have (this iteration)**
- Cursor commit-back logic — the full-list strategy (ADR-022) means no cursor file needs to be committed

## Status
pending

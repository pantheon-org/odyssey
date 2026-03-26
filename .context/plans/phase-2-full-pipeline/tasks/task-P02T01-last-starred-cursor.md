# P02T01 — `.github/data/last-starred.txt`

## Goal
Commit an initial cursor file so `poll-stars.ts` has a known starting point.

## Files
- `.github/data/last-starred.txt`

## Implementation
- Content: ISO 8601 timestamp of the oldest star to start polling from, or the
  ID of the last known starred repo.
- The cursor is updated in-place by `poll-stars.ts` after each successful poll
  run (committed back to `main` via the workflow).
- See `adr/001-trigger-mechanism.md` for polling approach rationale.

## References
- `adr/001-trigger-mechanism.md` — cron polling vs webhooks decision

## Verification
```sh
test -f .github/data/last-starred.txt && echo "ok"
cat .github/data/last-starred.txt  # non-empty
```

## Status
pending

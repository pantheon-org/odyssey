# P02T01 — `.github/data/last-starred.txt`

## Goal
Establish the initial cursor so `poll-stars.ts` has a known starting point.

## Storage: `actions/cache` (not a committed file)

The cursor is persisted via GitHub Actions cache under the key `poll-stars-cursor`,
**not** committed to `main`. Committing the cursor on every poll run produces noise
in git history and a race window: two overlapping cron runs can both read the same
stale value before either writes back, causing duplicate `pending-evaluation` issues
that ADR-009 deduplication must then suppress.

`actions/cache` gives last-write-wins semantics with no git churn. On a cold cache
miss (first run, or cache evicted) `poll-stars.ts` falls back to an environment
variable `POLL_STARS_SINCE` set in the workflow — an ISO 8601 timestamp representing
the oldest star to include on the initial sweep.

## Files
- No committed file. The workflow sets `POLL_STARS_SINCE` as a fallback default.

## Implementation
- `poll-stars.ts` reads the cursor from the cache (injected via `INPUT_CURSOR` env).
- On success, outputs the new cursor value for the workflow to save back to cache.
- Workflow step: `actions/cache` restore before script, save after script.
- See `adr/001-trigger-mechanism.md` for full cursor persistence rationale.

## References
- `adr/001-trigger-mechanism.md` — cron polling, cursor storage decision
- `adr/009-deduplication.md` — issue deduplication as a secondary safety net

## Verification
```sh
# Workflow log shows cache hit/miss on restore step
# No new commits appear on main after poll runs
# Duplicate issue check: starring same repo twice produces only one issue
```

## Status
pending

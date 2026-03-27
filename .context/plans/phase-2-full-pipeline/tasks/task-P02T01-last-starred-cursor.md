# P02T01 — Cursor / intake bootstrap

## Status
Superseded — timestamp cursor retired per ADR-022.

## What changed
The intake source moved from `GET /users/thoroc/starred` (timestamp-ordered) to a
GitHub List fetched via GraphQL. GitHub Lists carry no per-item "added_at" timestamp,
so there is no cursor to advance.

The `actions/cache` cursor key (`poll-stars-cursor`) and the `POLL_STARS_SINCE` env
var fallback are **not needed**. The workflow only needs `LIST_OWNER` and `LIST_NAME`
env vars (see `task-P02T03-poll-stars-ts.md`).

Deduplication (ADR-009) — searching for existing `Evaluate: owner/repo` issues before
creating a new one — is the sole mechanism for skipping already-processed repos.

## References
- `adr/022-github-list-intake.md` — decision that retired the cursor
- `adr/009-deduplication.md` — issue dedup as the correctness guarantee

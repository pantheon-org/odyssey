# ADR-001: Trigger Mechanism for New Starred Repos

**Status**: Superseded by ADR-022
**Date**: 2026-03-25
**Superseded by**: `adr/022-github-list-intake.md` (2026-03-27) — intake source changed from `thoroc`'s starred list to a named GitHub List ("Look the Loony Mob") owned by a project OWNER or COLLABORATOR; timestamp cursor retired in favour of full-list scan + issue dedup.

## Context

We need to detect when `thoroc` stars a new GitHub repository and enqueue it for evaluation. Options considered:

- **GitHub webhook** on `star` events — requires the receiving server to exist; not viable for a static pipeline with no always-on infrastructure
- **GitHub App with `starring` event** — requires App installation and separate secret management
- **Cron polling** of `GET /users/thoroc/starred` — works from GitHub Actions without extra infrastructure; tolerates up to 15 min latency

## Decision

Cron polling every 15 minutes via `poll-stars.yml`. A cursor (`last-starred.txt`) tracks the ISO timestamp of the last seen star to diff against the API response.

## Consequences

- Up to 15-minute delay between starring and evaluation starting — acceptable for a personal knowledge base
- No missed events: cursor advances only after all issues are created
- Requires `GH_PAT` with `read:user` scope to read another user's starred list
- Concurrent runs can overlap; deduplication (ADR-009) is required

## Cursor persistence

The cursor is stored via `actions/cache` (key: `poll-stars-cursor`) rather than committed back to `main`. Committing the cursor on every run would produce noise in git history and a race window when two cron runs overlap and both read the same stale cursor value before either writes back.

`actions/cache` provides last-write-wins semantics scoped to the branch; the poll workflow saves the updated cursor at the end of a successful run. Worst case on a cold cache miss: the poll re-scans from the configured start date and deduplication (ADR-009) suppresses duplicate issues.

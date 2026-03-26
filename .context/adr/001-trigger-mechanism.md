# ADR-001: Trigger Mechanism for New Starred Repos

**Status**: Accepted
**Date**: 2026-03-25

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

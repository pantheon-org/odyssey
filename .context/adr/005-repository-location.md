# ADR-005: Repository Location

**Status**: Accepted
**Date**: 2026-03-25

## Context

The pipeline and site need a home repository. Options:

- **`thoroc/odyssey`** — personal account; simpler permissions; starred list is on this account
- **`pantheon-org/odyssey`** — org account; cleaner separation of personal projects from the org namespace; potential for future collaborators

## Decision

`pantheon-org/odyssey`.

## Consequences

- `GH_PAT` must have `repo` scope on the `pantheon-org` org to create issues, branches, and PRs
- The starred list read is still from `thoroc` (`GET /users/thoroc/starred`) — the PAT must also have `read:user` on that account
- GitHub Actions minutes are billed to the org; the cron-heavy workflow (15-min poll) should be monitored

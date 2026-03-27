# ADR-006: Re-evaluation Cadence

**Status**: Accepted
**Date**: 2026-03-25

## Context

Repo quality changes over time — projects get abandoned, release major versions, gain traction, or get archived. A one-time evaluation becomes stale. Options:

- **Never re-evaluate** — evaluations rot; not useful long-term
- **Re-evaluate on every quarterly cron regardless** — wastes API quota; most repos don't change meaningfully
- **Re-evaluate on detected material changes** — targeted; only re-evaluates repos that have actually changed

Material change signals identified:
- Major version bump (new semver major in latest release)
- Repo archived
- Long dormancy (no commits in 12 months AND maintenance score was ≥ 3)
- Revival (commits resumed after 6+ months of silence)
- Stars surge (star count grew > 50% since last evaluation AND absolute growth > 50 stars)
- Schema drift (classification config version changed — see ADR-012)

## Decision

Quarterly cron (`quarterly-check.yml`, 1st of Jan/Apr/Jul/Oct at 09:00 UTC) checks all evaluated pages for material changes and creates `pending-re-evaluation` issues for affected repos. Schema drift is handled primarily by `schema-sync.yml` (ADR-012); quarterly-check is a safety net for any that slipped through.

## Consequences

- `evaluated_at`, `version_at_eval`, `stars_at_eval`, and `schema_version` must be written to frontmatter on every evaluation run and read by `quarterly-check.ts`
- `version_at_eval: null` is valid (no releases); major-version comparison is skipped for these repos
- `quarterly-check.ts` makes one GitHub API call per evaluated repo; with a large corpus this could be slow — add pagination and rate-limit handling

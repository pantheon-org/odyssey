# ADR-009: Issue Deduplication

**Status**: Accepted
**Date**: 2026-03-25

## Context

Two scenarios can produce duplicate evaluation issues:
1. `poll-stars.yml` runs overlap (15-min cron, GH Actions scheduling is not exact)
2. A user un-stars and re-stars a repo before the first evaluation completes

Without deduplication, duplicate issues would trigger duplicate evaluations, wasting API quota and creating duplicate pages.

## Decision

Before creating any issue, `poll-stars.ts` and `schema-sync.ts` query the GitHub Issues search API:

```
GET /search/issues?q=repo:pantheon-org/odyssey+"Evaluate: owner/repo"+is:open
```

If an open issue with that title exists, the creation is skipped silently.

The same check applies in `quarterly-check.ts` and `schema-sync.ts` before creating `Re-evaluate:` issues.

## Consequences

- One extra API call per candidate repo per poll run; negligible for personal use
- Issue titles must be treated as stable identifiers — format must not change without updating the search query
- Does not prevent a second evaluation if the first issue is closed before the second poll runs; this is acceptable (re-evaluation is idempotent)

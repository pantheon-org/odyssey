# ADR-019: schema-sync Issue Creation Throttling

**Status**: Accepted
**Date**: 2026-03-25

## Context

`schema-sync.ts` creates one `pending-re-evaluation` issue per stale repo page when `classification.yaml` version changes. With a corpus of hundreds of repos, a single version bump creates hundreds of issues in rapid succession via `GH_PAT`.

This creates two problems:
1. **GitHub secondary rate limits**: rapid sequential API calls (`POST /repos/.../issues`) can exceed GitHub's secondary rate limit (burst protection), causing 429 errors and partial issue creation.
2. **Issue tracker noise**: hundreds of open issues appear simultaneously, degrading the Issues UI for any human operator inspecting the queue.

`quarterly-check.ts` already uses `p-limit(5)` for its GitHub API calls (ADR note in `toolchain.md`). `schema-sync.ts` has no equivalent throttle.

## Decision

`schema-sync.ts` uses `p-limit(5)` for issue creation, matching the concurrency cap used by `quarterly-check.ts`.

The dedup check (`search for open issue`) and issue creation (`POST /repos/.../issues`) are grouped into a single throttled task per repo:

```
p-limit(5) → for each stale repo: [dedup search] → [create issue if not found]
```

This means at most 5 repos are processed concurrently at any time, capping burst API usage to ~10 calls/s rather than N calls/s for N repos.

The same `p-limit` instance governs both the dedup search and the creation for a given repo — they run sequentially within the task to preserve the search-before-create invariant (see ADR-009).

## Consequences

- **Throughput**: a 500-repo wave creates issues at ~5 concurrent searches + creates. Wall-clock time increases from near-instant to ~1-2 minutes — acceptable for a background sync job.
- **No data loss**: dedup is preserved per-repo; throttling does not affect correctness.
- **Consistency with quarterly-check.ts**: both scripts now use the same p-limit(5) pattern, making the codebase easier to reason about.
- **GitHub secondary rate limit risk eliminated**: burst is capped; 429s become very unlikely at corpus sizes the project is expected to reach.

# ADR-013: Evaluation Idempotency Guard

**Status**: Accepted
**Date**: 2026-03-25

## Context

ADR-009 prevents duplicate issues from being created by searching for an open issue before creating a new one. However, GitHub's search index has a propagation lag of several seconds — two rapid `poll-stars` runs can both pass the dedup search and create issues for the same repo before either issue is indexed.

`evaluate.yml` uses a per-issue `concurrency` group, which prevents the *same issue* from being evaluated concurrently. But it does not prevent two *different issues* for the same repo from both triggering evaluations. If both reach `evaluate.ts`, the second run would overwrite the page written by the first, open a second PR, and leave the first PR conflicted.

## Decision

`evaluate.ts` performs a content-level idempotency check as its **first step**, before any LLM call or branch creation:

1. `GET /repos/pantheon-org/odyssey/contents/docs/repos/<owner>-<repo>.md` on `main`
2. If the file exists (HTTP 200): comment on the issue ("page already exists at `docs/repos/<owner>-<repo>.md`, closing as duplicate"), apply label `duplicate`, close the issue, exit 0
3. If the file does not exist (HTTP 404): proceed with evaluation normally

This guard is deliberately simple — it checks existence only, not staleness. A `pending-re-evaluation` issue for a repo that already has a page must pass the guard (the file exists), which would incorrectly close it.

**Exception for re-evaluations**: the guard is skipped when the triggering label is `pending-re-evaluation`. The page is expected to already exist in that case; the intent is to overwrite it.

## Consequences

- Duplicate issues created by search-lag races are self-healing: the second evaluation closes itself without side effects
- No LLM calls or branch creation wasted on duplicate work
- The guard adds one GitHub API call per evaluation (negligible latency)
- Re-evaluation issues (`pending-re-evaluation`) bypass the guard — this is correct and intentional
- Combining this with ADR-009 (search before create) and `concurrency: poll-stars` gives three independent layers of duplicate prevention

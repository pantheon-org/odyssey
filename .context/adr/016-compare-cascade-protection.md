# ADR-016: compare.yml Cascade Protection During Mass Re-evaluation

**Status**: Accepted
**Date**: 2026-03-25

## Context

`compare.yml` triggers on every push to `docs/repos/**`. During a schema-sync or quarterly re-evaluation wave, many `evaluate.yml` runs complete in sequence, each merging a PR to `main` and pushing a `docs/repos/*.md` file. Each such push independently triggers `compare.yml`.

With global serialisation (`concurrency: group: compare, cancel-in-progress: false`), these runs queue rather than race. However, a 100-repo re-evaluation wave can create a queue depth of 100 `compare.yml` runs. Each queued run must determine whether its changed repo belongs to any group before deciding whether to call the LLM. Without an explicit no-op fast-exit, every queued run incurs at least one GitHub API call even when the changed repo is in no group.

Additionally, within a single `compare.ts` run that must regenerate multiple affected groups (e.g. a `groups.yaml` change that adds five new groups at once), there is no parallelism cap — groups are processed sequentially by default, increasing run time linearly.

## Decision

Three complementary controls:

### 1. No-op fast exit

`compare.ts` determines affected groups as its **first step**, before any API calls or file reads:

1. If triggered by `docs/repos/<owner>-<repo>.md` push: check group membership from the in-memory `groups.yaml`. If the repo does not appear in any group, exit 0 immediately — no LLM calls, no file reads.
2. If triggered by `docs/schema/groups.yaml` push: all groups are affected; proceed normally.
3. If triggered by `workflow_dispatch` with a `group_id` input: process only that group.

### 2. Within-run concurrency cap

When a single `compare.ts` run has multiple affected groups (e.g. after a `groups.yaml` change), group LLM calls are parallelised with `p-limit(3)`. This caps concurrent GitHub Models API calls at 3 per run while still processing large batches faster than full serialisation.

### 3. Per-group error isolation (already specified)

One group failing does not abort other groups in the same run — errors are caught per-group, logged, and the run continues.

## Consequences

- **Cascade cost**: a 100-repo schema-sync wave generates 100 queued `compare.yml` runs. Runs for repos not in any group exit in < 1 s with no API calls. Only runs for repos that belong to at least one group proceed to LLM generation.
- **Peak LLM rate**: at most 3 concurrent group comparisons per compare.ts run, with at most 1 run executing at a time (global serialisation). This stays well within the GitHub Models free-tier rate limit.
- **Queue drain time**: a 100-run queue drains as fast as the no-op runs clear. The slow path (actual LLM calls) is only entered for group members.
- **Tradeoff**: if every repo is in a group (unlikely at typical corpus sizes), cascade protection provides no relief. At that scale, a more sophisticated approach (e.g. batching all re-evaluations and dispatching compare once at the end) would be needed. This is not anticipated for the current use case.

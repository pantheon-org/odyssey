# ADR-003: Queue Persistence

**Status**: Accepted
**Date**: 2026-03-25

## Context

Between detecting a new starred repo and running evaluation, we need a durable queue that survives workflow restarts and supports manual re-triggering. Options considered:

- **JSON files in the repo** (`queue/*.json`) — simple but requires a commit per enqueue and a separate cleanup step; no native retry mechanism
- **GitHub Actions workflow inputs** — ephemeral; lost on failure
- **External queue (SQS, Redis)** — requires infrastructure and secrets
- **GitHub Issues** — native to GitHub, auditable, commentable, re-triggerable by re-adding a label, persistent across failures

## Decision

GitHub Issues with labels (`pending-evaluation`, `pending-re-evaluation`). Each issue title encodes the target (`Evaluate: owner/repo`) and the body carries metadata (`starred_at`, `description`, `html_url`).

Issues are created using `GH_PAT` (not `GITHUB_TOKEN`) to allow downstream workflow triggers (see Required Secrets in `../knowledge-base/workflows.md`).

## Consequences

- Full audit trail: every enqueue, evaluation, and re-evaluation is visible in the issue tracker
- Re-triggerable: re-adding the label fires `evaluate.yml` again
- Deduplication required to avoid duplicate issues (ADR-009)
- Issue titles must be stable (`Evaluate: owner/repo`) for dedup search queries
- Increases GitHub API calls; unlikely to hit rate limits for personal use

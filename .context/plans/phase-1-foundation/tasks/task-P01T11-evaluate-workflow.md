# P01T11 — `.github/workflows/evaluate.yml`

## Goal
GitHub Actions workflow that runs `evaluate.ts` on a manually provided repo.

## Files
- `.github/workflows/evaluate.yml`

## Implementation
- Trigger: `workflow_dispatch` with `owner/repo` string input.
- Also triggers on `issues` (labeled `pending-evaluation` or `pending-re-evaluation`)
  to support Phase 2 automation and manual submissions (Path D).
- **Job condition** (must be first check): label must be `pending-evaluation` or
  `pending-re-evaluation` AND `github.event.issue.author_association` must be
  `OWNER`, `COLLABORATOR`, or `MEMBER`. Silently no-ops for external submitters.
  See ADR-021.
- Steps: checkout → `setup-bun@v2` (reads `.bun-version`) → `bun install` →
  `bun scripts/evaluate.ts <owner/repo>` → open PR targeting `main`.
- Branch name: `eval/<owner>-<repo>-<GITHUB_RUN_ID>` (manual) or
  `re-eval/<owner>-<repo>-<GITHUB_RUN_ID>` (re-evaluation).
- Secrets needed: `GITHUB_TOKEN` (default), `MODELS_API_KEY` (GitHub Models).
- Idempotency: `evaluate.ts` skips if page exists (ADR-013); re-eval label
  overrides the guard.

## References
- `workflows.md` — full YAML spec for evaluate.yml
- `adr/013-evaluation-idempotency.md` — skip guard behaviour

## Verification
```sh
# Dispatch manually via GitHub UI or:
gh workflow run evaluate.yml -f repo=owner/repo
gh run list --workflow=evaluate.yml --limit=1
```

## Acceptance Criteria
- [ ] `workflow_dispatch` with a valid `owner/repo` input triggers the workflow and opens a PR
- [ ] An issue labeled `pending-evaluation` by an `OWNER`, `COLLABORATOR`, or `MEMBER` fires the workflow
- [ ] An issue labeled `pending-evaluation` by an external user causes a silent no-op (job-level condition)
- [ ] An issue labeled `pending-re-evaluation` fires the workflow and bypasses the idempotency guard
- [ ] PR branch name matches `eval/<owner>-<repo>-<GITHUB_RUN_ID>` for manual dispatch
- [ ] PR branch name matches `re-eval/<owner>-<repo>-<GITHUB_RUN_ID>` for re-evaluation

## Status
pending

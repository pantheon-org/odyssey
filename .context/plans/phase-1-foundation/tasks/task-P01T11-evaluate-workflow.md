# P01T11 — `.github/workflows/evaluate.yml`

## Goal
GitHub Actions workflow that runs `evaluate.ts` on a manually provided repo.

## Files
- `.github/workflows/evaluate.yml`

## Implementation
- Trigger: `workflow_dispatch` with `owner/repo` string input.
- Also triggers on `issues` (labeled `pending-evaluation` or `pending-re-evaluation`)
  to support Phase 2 automation.
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

## Status
pending

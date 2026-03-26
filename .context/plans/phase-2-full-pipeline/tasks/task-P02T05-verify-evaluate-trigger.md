# P02T05 — Verify `evaluate.yml` label trigger

## Goal
Confirm `evaluate.yml` fires correctly on `pending-evaluation` and
`pending-re-evaluation` issue labels, and that the idempotency guard behaves
correctly for `pending-re-evaluation`.

## Files
- `.github/workflows/evaluate.yml` (already created in P01T10 — verify only,
  may need minor amendment)

## Implementation
- Verify the `issues: [labeled]` trigger is present and filters on both labels.
- `pending-evaluation`: evaluate.ts runs; idempotency guard may skip if page exists.
- `pending-re-evaluation`: evaluate.ts runs; idempotency guard is bypassed — see ADR-013.
- Branch name: `re-eval/<owner>-<repo>-<GITHUB_RUN_ID>` for re-evaluation runs.

## References
- `adr/013-evaluation-idempotency.md` — page-exists guard, re-eval override
- `workflows.md` — evaluate.yml trigger spec

## Verification
```sh
# Create a test issue with pending-evaluation label
gh issue create --title "test: owner/repo" --label "pending-evaluation"
# Expect: evaluate.yml triggers within seconds
gh run list --workflow=evaluate.yml --limit=3
```

## Status
pending

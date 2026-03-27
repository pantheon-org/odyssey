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
- `../../../knowledge-base/workflows.md` — evaluate.yml trigger spec

## Verification
```sh
# Create a test issue with pending-evaluation label
gh issue create --title "test: owner/repo" --label "pending-evaluation"
# Expect: evaluate.yml triggers within seconds
gh run list --workflow=evaluate.yml --limit=3
```

## Acceptance Criteria
- [ ] Adding `pending-evaluation` label to an issue triggers `evaluate.yml` within seconds
- [ ] Adding `pending-re-evaluation` label triggers `evaluate.yml` and the run bypasses the idempotency guard
- [ ] Re-evaluation PR branch name matches `re-eval/<owner>-<repo>-<GITHUB_RUN_ID>`
- [ ] `evaluate.yml` workflow file contains both label values in the `issues: labeled` trigger filter

## Definition of Done

**Must Have**
- [ ] `evaluate.yml` contains both `pending-evaluation` and `pending-re-evaluation` in its `issues: labeled` trigger filter
- [ ] Adding `pending-evaluation` label to an issue triggers `evaluate.yml` within seconds
- [ ] `pending-re-evaluation` runs bypass the idempotency guard and use the `re-eval/<owner>-<repo>-<GITHUB_RUN_ID>` branch name

**Should Have**
- [ ] All acceptance criteria verified via live label tests with `gh run list` confirmation

**Could Have**
- [ ] Inline comment in `evaluate.yml` explaining the two-label pattern and idempotency guard bypass

**Won't Have (this iteration)**
- Additional label variants or label-hierarchy logic beyond the two defined labels

## Depends on

_None — this is a Wave 1 task. Phase 1 evaluate.yml must be merged._

## Context

_Minimum reads before starting:_

- `../../../knowledge-base/workflows.md` — evaluate.yml trigger and label flow

## Status
pending

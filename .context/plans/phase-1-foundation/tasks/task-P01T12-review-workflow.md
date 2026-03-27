# P01T12 — `.github/workflows/review.yml`

## Goal
CI workflow: validate page, check schema drift, auto-merge passing PRs.

## Files
- `.github/workflows/review.yml`

## Implementation
- Trigger: `pull_request` targeting `main` (branches `eval/*` and `re-eval/*`;
  extended in Phase 3 to also `compare/*`).
- Steps:
  1. Checkout → setup-bun → `bun install`
  2. `bun run check:schema` — exits 1 if JSON schema stale (ADR-017)
  3. `bun scripts/validate-page.ts <changed-file>` — exits 1 if page invalid
  4. Auto-merge on success (via `gh pr merge --auto --squash`)
- Must be the required status check configured in branch protection (P01T13).

## References
- `../../../knowledge-base/workflows.md` — full YAML spec for review.yml
- `adr/017-schema-drift-ci.md` — `check:schema` step requirement

## Verification
```sh
gh workflow run evaluate.yml -f repo=owner/test-repo
# Expect: review.yml triggers automatically on the opened PR
```

## Acceptance Criteria
- [ ] Opening an `eval/*` PR triggers `review.yml`
- [ ] A stale JSON schema causes the workflow to exit 1 before `validate-page.ts` runs
- [ ] An invalid repo page causes the job to exit 1 and the PR is not auto-merged
- [ ] A valid repo page passes all checks and the PR is auto-merged via squash
- [ ] `review / validate` is the status check name visible in the PR checks UI

## Status
pending

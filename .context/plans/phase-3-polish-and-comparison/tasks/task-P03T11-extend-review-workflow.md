# P03T11 — Extend `review.yml` for compare branches

## Goal
Make `review.yml` also validate comparison pages on `compare/*` branches.

## Files
- `.github/workflows/review.yml` (extend existing P01T11 file)

## Implementation
- Update the `pull_request` trigger branch filter to include `compare/**` alongside
  `eval/**` and `re-eval/**`.
- Add a conditional step: if the changed file is under `docs/compare/`, run
  `bun scripts/validate-compare.ts <changed-file>` instead of `validate-page.ts`.
- All other steps (check:schema, auto-merge) remain unchanged.

## References
- `workflows.md` — review.yml spec, branch filter details

## Verification
```sh
# Open a compare/* PR and confirm review.yml runs validate-compare.ts
gh pr list --head "compare/" --limit 3
```

## Acceptance Criteria
- [ ] Opening a `compare/*` PR triggers `review.yml`
- [ ] A changed file under `docs/compare/` causes `validate-compare.ts` to run (not `validate-page.ts`)
- [ ] A changed file under `docs/repos/` still runs `validate-page.ts` as before
- [ ] Auto-merge on success still applies for `compare/*` PRs
- [ ] All other steps (check:schema) remain unchanged

## Status
pending

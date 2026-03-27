# P01T17 — Integration-lite test profile (fixture repo / mocked GH)

## Goal
Provide a deterministic Cucumber profile that runs on PRs without live GitHub
dependencies. This gives early signal while keeping the `@integration` gate on
`main` for real end-to-end coverage.

## Files
- `cucumber.json`
- `features/step-definitions/**/*.ts`
- `scripts/test-fixtures/**` (if needed)

## Implementation
- Add a new Cucumber profile (e.g. `integration-lite`) that runs a subset of
  scenarios against deterministic fixtures.
- **Recommendation:** use a mocked GitHub API layer used by the step definitions.
  This keeps PR CI deterministic and avoids live org access.
- Tag scenarios with `@integration-lite` where applicable and ensure PR CI runs
  `--profile integration-lite`.
- Keep `@integration` scenarios unchanged for the `main`-branch gate.

## Verification
```sh
bunx cucumber-js --config cucumber.json --profile integration-lite
```

## Acceptance Criteria
- [ ] `bunx cucumber-js --profile integration-lite` exits 0 in a CI environment without live GitHub secrets
- [ ] `integration-lite` scenarios use fixture data only — no live GitHub API calls
- [ ] Scenarios tagged `@integration-lite` are included; scenarios tagged `@integration` (only) are excluded from this profile
- [ ] PR CI workflow runs the `integration-lite` profile and fails fast on scenario failures

## Status
pending

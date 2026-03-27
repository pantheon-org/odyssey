# P02T07 — Star automation test harness (test account + fallback trigger)

## Goal
Make the star-based pipeline testable and repeatable in CI, with a controlled
test account and a fallback trigger when star events are unreliable.

## Files
- `.github/workflows/poll-stars.yml`
- `features/step-definitions/**/*.ts`
- `docs/` (if a fixture repo is documented)

## Implementation
- Research and document the exact PAT scopes required for starring and polling.
- Define a dedicated test account and PAT scopes required for starring.
- Use a controlled fixture repo for star/unstar operations.
- Add a fallback trigger (e.g. label or dispatch) to simulate a star when the API
  or permissions are flaky, and document when to use it.
- Update BDD steps to prefer the real star path, falling back only when needed.

## Verification
```sh
bunx cucumber-js --config cucumber.json --profile integration --tags "@phase2"
```

## Acceptance Criteria
- [ ] Required PAT scopes for starring and polling are documented (in a comment or README section)
- [ ] A dedicated test account and controlled fixture repo are defined and referenced in step definitions
- [ ] Step definitions use the real star path by default; fallback trigger is invoked only when the API is unavailable
- [ ] The fallback trigger mechanism is documented with a clear note on when to use it
- [ ] `bunx cucumber-js --profile integration --tags "@phase2"` exits 0

## Status
pending

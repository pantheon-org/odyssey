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

## Status
pending

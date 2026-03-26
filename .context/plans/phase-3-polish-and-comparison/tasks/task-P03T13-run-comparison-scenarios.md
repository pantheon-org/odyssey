# P03T13 — Run Phase 3 BDD comparison scenarios

## Goal
Execute Phase 3 CucumberJS comparison scenarios against the live pipeline;
all must pass.

## Files
- No new files — verification only (scenarios and step definitions defined in P03T04).

## Steps
Run the Phase 3 Cucumber suite:

```sh
bunx cucumber-js --config cucumber.json --tags "@phase3"
```

Individual step assertions cover:
1. `groups.yaml` push triggers `compare.yml`.
2. `compare.yml` opens a `compare/<group-id>-<run-id>` PR.
3. `review.yml` runs `validate-compare.ts`, checks pass, PR auto-merges.
4. `deploy.yml` publishes the comparison page.
5. Page accessible at `/compare/test-group` with "Recommendation" and "Summary table" sections.

## Verification
```sh
bunx cucumber-js --config cucumber.json --tags "@phase3"
# 1 scenario (1 passed, 0 failed)
```

## Exit criteria
`bunx cucumber-js --tags "@phase3"` exits 0.

## Status
pending

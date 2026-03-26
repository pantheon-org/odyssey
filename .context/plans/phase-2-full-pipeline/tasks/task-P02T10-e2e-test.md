# P02T10 — Run Phase 2 BDD scenarios

## Goal
Execute Phase 2 CucumberJS scenarios against the live pipeline; all must pass.

## Files
- No new files — verification only (scenarios and step definitions defined in P02T09).

## Steps
Run the Phase 2 Cucumber suite:

```sh
bunx cucumber-js --config cucumber.json --tags "@phase2"
```

Individual step assertions cover:
1. Starring triggers `poll-stars.yml` → `pending-evaluation` issue created.
2. Issue label triggers `evaluate.yml` → PR opened.
3. `review.yml` validates and auto-merges PR.
4. `deploy.yml` publishes the new page.
5. Page accessible on GitHub Pages within 15 minutes.

## Verification
```sh
bunx cucumber-js --config cucumber.json --tags "@phase2"
# 1 scenario (1 passed, 0 failed)
```

## Exit criteria
`bunx cucumber-js --tags "@phase2"` exits 0.

## Status
pending

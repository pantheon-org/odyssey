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

## Definition of Done

**Must Have**
- [ ] `bunx cucumber-js --config cucumber.json --tags "@phase3"` exits 0 with 1 scenario passed, 0 failed
- [ ] All 5 pipeline steps (groups.yaml push → compare.yml → PR → review → page published) are asserted

**Should Have**
- [ ] Full scenario completes end-to-end with the comparison page accessible at `/compare/test-group` containing "Recommendation" and "Summary table" sections

**Could Have**
- [ ] Scenario step outputs structured logs so each pipeline step is diagnosable independently in CI

**Won't Have (this iteration)**
- Multi-group parallel scenario coverage — single group scenario is the target for this phase

## Depends on

- [P03T04](task-P03T04-bdd-comparison-feature.md) — BDD feature file and step definitions must exist
- [P03T11](task-P03T11-extend-review-workflow.md) — review.yml compare branch support must be merged
- [P03T12](task-P03T12-seed-first-group.md) — fixture repos and first group must be seeded

## Context

_Minimum reads before starting:_

- `../../../knowledge-base/workflows.md` — full comparison pipeline flow
- `../../../adr/018-testing-strategy.md` — BDD integration test scope

## Status
pending

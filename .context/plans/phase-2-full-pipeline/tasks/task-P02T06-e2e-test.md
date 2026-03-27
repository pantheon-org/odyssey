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

## Definition of Done

**Must Have**
- [ ] `bunx cucumber-js --config cucumber.json --tags "@phase2"` exits 0 with 1 scenario passed, 0 failed
- [ ] All 5 pipeline steps (star → issue → PR → merge → page published) are asserted by individual step definitions

**Should Have**
- [ ] Full scenario completes end-to-end within the 15-minute timeout defined in the scenario

**Could Have**
- [ ] Retry/polling helpers emit progress logs so flaky network steps are diagnosable in CI output

**Won't Have (this iteration)**
- Parallelised multi-repo pipeline scenario — single scenario coverage is the target for this phase

## Depends on

- [P02T02](task-P02T02-phase2-bdd-feature.md) — feature file and step definitions must exist
- [P02T04](task-P02T04-poll-stars-workflow.md) — poll-stars.yml must be merged and working
- [P02T05](task-P02T05-verify-evaluate-trigger.md) — evaluate.yml label trigger verified

## Context

_Minimum reads before starting:_

- `../../../knowledge-base/workflows.md` — full pipeline flow end-to-end
- `../../../adr/018-testing-strategy.md` — BDD integration test scope

## Status
pending

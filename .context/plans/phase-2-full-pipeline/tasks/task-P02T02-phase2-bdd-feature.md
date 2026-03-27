# P02T02 — BDD: Phase 2 feature file + step definitions

> **BDD — write the feature file before starting P02T02 (poll-stars.ts).**
> The Phase 2 scenario defines the acceptance criterion for the automated pipeline.

## Goal
Write the Phase 2 CucumberJS e2e scenario before implementing the pipeline,
then implement step definitions.

## Files
- `features/poll-stars.feature` — Phase 2 e2e scenario
- `features/step-definitions/poll-stars.steps.ts` — step definitions

## Feature scenario

```gherkin
Feature: Automated star-to-page pipeline

  @phase2 @slow
  Scenario: Starring a repo triggers automatic evaluation
    Given the repository "owner/repo" has not been starred by "thoroc"
    And no "pending-evaluation" issue exists for "owner/repo"
    When "thoroc" stars "owner/repo" on GitHub
    And the poll-stars workflow runs
    Then a "pending-evaluation" issue is created for "owner/repo"
    And the evaluate workflow triggers automatically from the issue label
    And the review workflow validates and auto-merges the PR
    And the page is published on GitHub Pages within 15 minutes
```

## Implementation
- Steps extend the shared World from `features/world/github.world.ts` (P01T15).
- New helpers: `gh api user/starred/...` for starring; issue polling with timeout.
- Scenario is tagged `@slow`; run with `--tags "@phase2 and not @slow"` for
  fast structural checks.

## References
- `adr/018-testing-strategy.md` — BDD testing strategy

## Verification
```sh
bunx cucumber-js --config cucumber.json --tags "@phase2" --dry-run
# All steps listed (pending or passing, no undefined)
```

## Acceptance Criteria
- [ ] `features/poll-stars.feature` exists and contains the exact Gherkin scenario specified in this task
- [ ] Scenario is tagged `@phase2 @slow`
- [ ] `bunx cucumber-js --tags "@phase2" --dry-run` exits 0 with no "undefined" steps
- [ ] All step definitions are registered in `features/step-definitions/poll-stars.steps.ts`

## Definition of Done

**Must Have**
- [ ] `features/poll-stars.feature` exists and contains the exact Gherkin scenario specified in this task with `@phase2 @slow` tags
- [ ] `features/step-definitions/poll-stars.steps.ts` registers all step definitions for the scenario

**Should Have**
- [ ] `bunx cucumber-js --tags "@phase2" --dry-run` exits 0 with no "undefined" steps (all acceptance criteria checked off)

**Could Have**
- [ ] Step definitions include inline JSDoc explaining the World helpers used for starring and issue polling

**Won't Have (this iteration)**
- Live end-to-end execution against the real GitHub API — that is deferred to the slow `@phase2` suite run in P02T06

## Status
pending

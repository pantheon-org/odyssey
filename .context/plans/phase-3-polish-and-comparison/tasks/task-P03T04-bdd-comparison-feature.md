# P03T04 — BDD: Comparison pipeline feature scenario + step definitions

> **BDD — write the feature file before starting P03T04 (groups.yaml).**
> The Phase 3 comparison scenario defines the acceptance criterion for the
> entire comparison pipeline (P03T04–P03T11).

## Goal
Write the CucumberJS comparison pipeline scenario before implementing it,
then implement step definitions and drive the pipeline to green.

## Files
- `features/compare.feature` — Phase 3 comparison e2e scenario
- `features/step-definitions/compare.steps.ts` — step definitions

## Feature scenario

```gherkin
Feature: Automated comparison pipeline

  Background:
    Given at least 2 repositories are evaluated
    And they share 2 or more tags

  @phase3 @slow
  Scenario: Seeding a group triggers a published comparison page
    Given no group "test-group" exists in "docs/schema/groups.yaml"
    When "test-group" is added to "groups.yaml" and merged to main
    Then the compare workflow triggers for "test-group"
    And a pull request is opened with the comparison page for "test-group"
    And the review workflow validates and auto-merges the PR
    And the comparison page is published at "/compare/test-group"
    And the page contains a "Recommendation" section
    And the page contains a "Summary table" section
```

## Implementation
- Steps extend the shared World from `features/world/github.world.ts`.
- New helpers: `groups.yaml` file mutation, PR polling for `compare/*` branches,
  comparison page URL assertion.
- Tag `@slow`; fast structural check: `--tags "@phase3 and not @slow" --dry-run`.

## References
- `adr/018-testing-strategy.md` — BDD testing strategy
- `adr/016-compare-cascade-protection.md` — compare pipeline flow

## Verification
```sh
bunx cucumber-js --config cucumber.json --tags "@phase3" --dry-run
# All steps listed — none undefined
# After implementing P03T04–P03T11:
bunx cucumber-js --config cucumber.json --tags "@phase3"
# 1 scenario (1 passed, 0 failed)
```

## Definition of Done

**Must Have**
- [ ] `features/compare.feature` exists with the exact Gherkin scenario specified in this task, tagged `@phase3 @slow`
- [ ] `features/step-definitions/compare.steps.ts` registers all step definitions with no "undefined" steps

**Should Have**
- [ ] `bunx cucumber-js --tags "@phase3" --dry-run` exits 0 with no undefined steps (structural check passes before P03T05–P03T12 are implemented)

**Could Have**
- [ ] Fast structural tag check (`--tags "@phase3 and not @slow" --dry-run`) is documented in a Makefile or `package.json` script

**Won't Have (this iteration)**
- Live end-to-end scenario execution — that is deferred to P03T13 once the full comparison pipeline is implemented

## Depends on

_None — this is a Wave 1 task. Phase 2 must be complete._

## Context

_Minimum reads before starting:_

- `../../../knowledge-base/workflows.md` — compare.yml pipeline flow
- `../../../adr/018-testing-strategy.md` — BDD-first rationale

## Status
pending

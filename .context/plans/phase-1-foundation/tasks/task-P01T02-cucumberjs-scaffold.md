# P01T02 — CucumberJS scaffold + Phase 1 e2e feature file

> **BDD — write this task before starting P01T03.**
> The Phase 1 e2e scenario defines the acceptance criterion for the whole phase.
> Implementation tasks P01T03–P01T13 exist to make this scenario green.

## Goal
Install CucumberJS, scaffold the `features/` structure, and write the Phase 1
e2e feature scenario before any implementation begins.

## Files
- `package.json` (add `@cucumber/cucumber`, `@cucumber/pretty-formatter`)
- `features/evaluate.feature` — Phase 1 e2e scenario
- `features/step-definitions/evaluate.steps.ts` — step definitions stub (pending)
- `cucumber.json` — CucumberJS config (paths, require, format)

## Feature scenario

```gherkin
Feature: Manual repo evaluation

  Scenario: Dispatching evaluate.yml produces a published page
    Given the repository "owner/repo" has not been previously evaluated
    When the evaluate workflow is dispatched for "owner/repo"
    Then a pull request is opened on branch matching "eval/owner-repo-*"
    And the review workflow validates the page and auto-merges the PR
    And the deploy workflow publishes the page to GitHub Pages
    And the page at "/repos/owner-repo" is accessible and contains dimension scores
```

## Implementation
- Install: `bun add -d @cucumber/cucumber @cucumber/pretty-formatter`.
- Add `test:e2e` script: `bunx cucumber-js --config cucumber.json`.
- `cucumber.json`: `paths: ["features/**/*.feature"]`,
  `require: ["features/step-definitions/**/*.ts"]`, `format: "pretty"`.
- Step definitions use `gh` CLI and `curl` to interact with GitHub; wrap in
  `world` for setup/teardown.
- Steps are initially `pending` — they turn green as P01T03–P01T15 implement
  the pipeline.

## References
- `adr/018-testing-strategy.md` — BDD testing strategy

## Verification
```sh
bunx cucumber-js --config cucumber.json --dry-run
# All steps listed as "pending" — not yet implemented
```

## Status
pending

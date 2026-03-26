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

## CI limitations

These BDD scenarios are **integration tests against live GitHub**, not unit tests.
They require:
- A `GH_PAT` with `repo`, `workflow`, and `read:user` scopes
- The `pantheon-org/odyssey` repo accessible with Actions enabled
- GitHub Pages configured on the repo

**They cannot run in standard PR CI** (forks have no access to org secrets).
Tag all Phase 1/2/3 e2e scenarios `@integration` in addition to their phase tag.
The `bun test` gate (unit tests) runs on every PR; BDD gates run on the `main`
branch only, with secrets injected via the repo's Actions environment.

Concretely, `cucumber.json` defines two profiles:
- `default` — runs `not @integration` (safe for PR CI)
- `integration` — runs all scenarios (main branch, requires secrets)
Add a third profile:
- `integration-lite` — runs deterministic fixture-based scenarios (safe for PR CI)

Phase gates use the `integration` profile:
```sh
bunx cucumber-js --config cucumber.json --profile integration --tags "@phase1"
```

## References
- `adr/018-testing-strategy.md` — BDD testing strategy

## Verification
```sh
bunx cucumber-js --config cucumber.json --dry-run
# All steps listed as "pending" — not yet implemented
```

## Status
pending

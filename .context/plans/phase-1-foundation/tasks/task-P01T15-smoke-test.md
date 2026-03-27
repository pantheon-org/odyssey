# P01T15 — BDD: Phase 1 step definitions + run scenarios

## Goal
Implement CucumberJS step definitions for the Phase 1 e2e feature (P01T14),
then run the full scenario green.

## Files
- `features/step-definitions/evaluate.steps.ts`
- `features/world/github.world.ts` (shared World with `gh` CLI helpers, polling)

## Implementation
Implement all steps from `features/evaluate.feature`:

- **Given** "the repository has not been previously evaluated" — delete any
  existing `docs/repos/<owner>-<repo>.md` on a test branch; confirm no open PR.
- **When** "the evaluate workflow is dispatched" — `gh workflow run evaluate.yml -f repo=<owner>/<repo>`.
- **Then** "a pull request is opened on branch matching eval/…" — poll
  `gh pr list --head "eval/" --state open` with timeout 5 min.
- **And** "review.yml validates and auto-merges" — poll `gh run list --workflow=review.yml`
  until status `completed`; assert `conclusion: success`.
- **And** "deploy.yml publishes the page" — poll `gh run list --workflow=deploy.yml`
  until `completed`; assert `conclusion: success`.
- **And** "the page is accessible and contains dimension scores" —
  `curl -sf <pages-url>/repos/<owner>-<repo>` → assert 200 + frontmatter present.

Use `setDefaultTimeout(300_000)` in `cucumber.json`. Tag scenarios `@slow` to
allow `--tags "not @slow"` for fast local runs.

## Depends on

- P01T11 — `evaluate.yml` must be deployed and dispatchable
- P01T12 — `review.yml` must auto-merge passing PRs
- P01T13 — `deploy.yml` must publish to GitHub Pages

## Context

_Minimum reads before starting:_

- `../../../.context/adr/018-testing-strategy.md` — BDD testing strategy, step polling pattern
- `features/evaluate.feature` — the scenario whose steps you are implementing

## References
- `adr/018-testing-strategy.md` — BDD testing strategy

## Verification
```sh
bunx cucumber-js --config cucumber.json --tags "@phase1"
# 1 scenario, all steps green
```

## Status
pending

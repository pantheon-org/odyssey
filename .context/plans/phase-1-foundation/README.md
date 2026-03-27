# Phase 1 — Foundation

**Goal:** Working end-to-end evaluation triggered manually. No automation yet.

**Exit criteria:** Manually triggering `evaluate.yml` produces a valid evaluated page
published to GitHub Pages, `bun test` passes, and the Phase 1 Cucumber e2e scenario is green.

**Depends on:** Nothing (greenfield).

---

## Testing approach

- **BDD first**: P01T02 (CucumberJS scaffold + e2e feature) must be completed before
  any implementation task. The Cucumber scenario is the acceptance criterion for the phase.
- **TDD**: every implementation task (P01T04–P01T10) has a collocated test file written
  *before* the source file. Red → green → refactor.

---

## Tasks

Parallel waves — tasks in the same wave can be implemented concurrently in separate
worktrees (see AGENTS.md for the worktree pattern). A task cannot start until all its
dependencies are merged to `main`.

| ID | Task | Depends | Wave | Status |
|----|------|---------|------|--------|
| [P01T01](tasks/task-P01T01-bun-project-init.md) | Bun project init | — | 1 | pending |
| [P01T02](tasks/task-P01T02-cucumberjs-scaffold.md) | **BDD: CucumberJS scaffold + Phase 1 e2e feature** | P01T01 | 2 | pending |
| [P01T03](tasks/task-P01T03-classification-yaml.md) | `docs/schema/classification.yaml` | P01T01 | 2 | pending |
| [P01T07](tasks/task-P01T07-page-template-yaml.md) | `docs/schema/page-template.yaml` | P01T01 | 2 | pending |
| [P01T08](tasks/task-P01T08-vitepress-scaffold.md) | VitePress scaffold | P01T01 | 2 | pending |
| [P01T04](tasks/task-P01T04-classification-ts.md) | `scripts/classification.ts` (TDD) | P01T03 | 3 | pending |
| [P01T13](tasks/task-P01T13-deploy-workflow.md) | `.github/workflows/deploy.yml` | P01T08 | 3 | pending |
| [P01T05](tasks/task-P01T05-schema-ts.md) | `scripts/schema.ts` (TDD) | P01T04 | 4 | pending |
| [P01T06](tasks/task-P01T06-generate-schema-ts.md) | `scripts/generate-schema.ts` (TDD) | P01T05 | 5 | pending |
| [P01T09](tasks/task-P01T09-validate-page-ts.md) | `scripts/validate-page.ts` (TDD) | P01T06, P01T07 | 6 | pending |
| [P01T10](tasks/task-P01T10-evaluate-ts.md) | `scripts/evaluate.ts` (TDD) | P01T04, P01T05, P01T07 | 6 | pending |
| [P01T11](tasks/task-P01T11-evaluate-workflow.md) | `.github/workflows/evaluate.yml` | P01T10 | 7 | pending |
| [P01T12](tasks/task-P01T12-review-workflow.md) | `.github/workflows/review.yml` | P01T09, P01T10 | 7 | pending |
| [P01T14](tasks/task-P01T14-branch-protection.md) | Branch protection on `main` | P01T12 | 8 | pending |
| [P01T15](tasks/task-P01T15-smoke-test.md) | BDD: Phase 1 step definitions + run scenarios | P01T11, P01T12, P01T13 | 8 | pending |
| [P01T16](tasks/task-P01T16-issue-template.md) | `.github/ISSUE_TEMPLATE/submit-repo.yml` | P01T11 | 8 | done |
| [P01T17](tasks/task-P01T17-integration-lite.md) | Integration-lite test profile (fixture repo / mocked GH) | P01T02, P01T15 | 9 | pending |

---

## Gate

```sh
bun test
bun run docs:build
# Phase gate — requires GH_PAT + live GitHub (main branch only, see P01T02 for CI limitations)
bunx cucumber-js --config cucumber.json --profile integration --tags "@phase1"
# All Phase 1 scenarios green
```

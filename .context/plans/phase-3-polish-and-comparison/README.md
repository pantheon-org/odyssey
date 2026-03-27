# Phase 3 — Polish and Comparison

**Goal:** Operational hygiene and cross-repo comparison pipeline.

**Depends on:** Phase 2 complete (automated pipeline running, ≥2 evaluated repos
sharing tags for a first comparison group).

> Phase 3b (navigation and site UX tasks) has been moved to [Phase 4](../phase-4-site-ux-and-navigation/README.md).

---

## Phase 3a — Operational hygiene + comparison pipeline

**Exit criteria:** At least one comparison page generated end-to-end; quarterly-check
and schema-sync workflows green on dry-run; Phase 3 Cucumber comparison scenario green.

## Tasks

Parallel waves — tasks in the same wave can be implemented concurrently in separate
worktrees (see AGENTS.md for the worktree pattern). A task cannot start until all its
dependencies are merged to `main`.

| ID | Task | Depends | Wave | Status |
|----|------|---------|------|--------|
| [P03T01](tasks/task-P03T01-ranking-index-page.md) | `docs/rankings/index.md` | — | 1 | pending |
| [P03T04](tasks/task-P03T04-bdd-comparison-feature.md) | BDD: Comparison pipeline feature scenario + step definitions | — | 1 | pending |
| [P03T05](tasks/task-P03T05-groups-yaml.md) | `docs/schema/groups.yaml` | — | 1 | pending |
| [P03T06](tasks/task-P03T06-compare-template-yaml.md) | `docs/schema/compare-template.yaml` | — | 1 | pending |
| [P03T14](tasks/task-P03T14-quarterly-check-ts.md) | `scripts/quarterly-check.ts` (TDD) | — | 1 | pending |
| [P03T16](tasks/task-P03T16-schema-sync-ts.md) | `scripts/schema-sync.ts` (TDD) | — | 1 | pending |
| [P03T02](tasks/task-P03T02-ranking-group-pages.md) | `docs/rankings/<group-slug>.md` | [P03T05](tasks/task-P03T05-groups-yaml.md) | 2 | pending |
| [P03T07](tasks/task-P03T07-extend-generate-schema-ts.md) | Extend `scripts/generate-schema.ts` | [P03T05](tasks/task-P03T05-groups-yaml.md) | 2 | pending |
| [P03T09](tasks/task-P03T09-compare-ts.md) | `scripts/compare.ts` (TDD) | [P03T05](tasks/task-P03T05-groups-yaml.md), [P03T06](tasks/task-P03T06-compare-template-yaml.md) | 2 | pending |
| [P03T15](tasks/task-P03T15-quarterly-check-workflow.md) | `.github/workflows/quarterly-check.yml` | [P03T14](tasks/task-P03T14-quarterly-check-ts.md) | 2 | pending |
| [P03T17](tasks/task-P03T17-schema-sync-workflow.md) | `.github/workflows/schema-sync.yml` | [P03T16](tasks/task-P03T16-schema-sync-ts.md) | 2 | pending |
| [P03T03](tasks/task-P03T03-ranking-sidebar-config.md) | Register rankings in VitePress sidebar | [P03T01](tasks/task-P03T01-ranking-index-page.md), [P03T02](tasks/task-P03T02-ranking-group-pages.md) | 3 | pending |
| [P03T08](tasks/task-P03T08-validate-compare-ts.md) | `scripts/validate-compare.ts` (TDD) | [P03T07](tasks/task-P03T07-extend-generate-schema-ts.md), [P03T06](tasks/task-P03T06-compare-template-yaml.md) | 3 | pending |
| [P03T10](tasks/task-P03T10-compare-workflow.md) | `.github/workflows/compare.yml` | [P03T09](tasks/task-P03T09-compare-ts.md) | 3 | pending |
| [P03T11](tasks/task-P03T11-extend-review-workflow.md) | Extend `review.yml` for compare branches | [P03T08](tasks/task-P03T08-validate-compare-ts.md), [P03T10](tasks/task-P03T10-compare-workflow.md) | 4 | pending |
| [P03T12](tasks/task-P03T12-seed-first-group.md) | Seed fixture repos + first group in `groups.yaml` | [P03T09](tasks/task-P03T09-compare-ts.md), [P03T10](tasks/task-P03T10-compare-workflow.md), [P03T11](tasks/task-P03T11-extend-review-workflow.md) | 4 | pending |
| [P03T13](tasks/task-P03T13-run-comparison-scenarios.md) | Run Phase 3 BDD comparison scenarios | [P03T04](tasks/task-P03T04-bdd-comparison-feature.md), [P03T11](tasks/task-P03T11-extend-review-workflow.md), [P03T12](tasks/task-P03T12-seed-first-group.md) | 5 | pending |

## Testing approach

- **BDD first**: P03T04 (comparison e2e feature) must be completed before P03T05
  (groups.yaml). The Cucumber scenario is the acceptance criterion for the comparison pipeline.
- **TDD**: implementation tasks P03T08, P03T09, P03T14, and P03T16 each have a
  collocated test file written *before* the source file. Red → green → refactor.

## Gate

```sh
bun test
# Phase gate — requires GH_PAT + live GitHub (main branch only, see P01T02 for CI limitations)
bunx cucumber-js --config cucumber.json --profile integration --tags "@phase3a"
bun scripts/quarterly-check.ts --dry-run
bun scripts/schema-sync.ts --dry-run
# Comparison page generated end-to-end; hygiene scripts exit 0
```

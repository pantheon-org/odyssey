# Phase 3 — Polish and Comparison

**Goal:** Operational hygiene and cross-repo comparison pipeline.

**Depends on:** Phase 2 complete (automated pipeline running, ≥2 evaluated repos
sharing tags for a first comparison group).

> Phase 3b (navigation and site UX tasks) has been moved to [Phase 4](../phase-4-site-ux-and-navigation/README.md).

---

## Phase 3a — Operational hygiene + comparison pipeline

**Exit criteria:** At least one comparison page generated end-to-end; quarterly-check
and schema-sync workflows green on dry-run; Phase 3 Cucumber comparison scenario green.

### Testing approach

- **BDD first**: P03T04 (comparison e2e feature) must be completed before P03T05
  (groups.yaml). The Cucumber scenario is the acceptance criterion for the comparison pipeline.
- **TDD**: implementation tasks P03T08, P03T09, P03T27, and P03T29 each have a
  collocated test file written *before* the source file. Red → green → refactor.

### Operational hygiene (moved from Phase 2)

These scripts require a populated `docs/repos/` to be meaningful and are not on the
critical path for the automated pipeline.

| ID | Task | Status |
|----|------|--------|
| [P03T27](tasks/task-P03T27-quarterly-check-ts.md) | `scripts/quarterly-check.ts` (TDD) | pending |
| [P03T28](tasks/task-P03T28-quarterly-check-workflow.md) | `.github/workflows/quarterly-check.yml` | pending |
| [P03T29](tasks/task-P03T29-schema-sync-ts.md) | `scripts/schema-sync.ts` (TDD) | pending |
| [P03T30](tasks/task-P03T30-schema-sync-workflow.md) | `.github/workflows/schema-sync.yml` | pending |

### Ranking pages

| ID | Task | Status |
|----|------|--------|
| [P03T01](tasks/task-P03T01-ranking-index-page.md) | `docs/rankings/index.md` | pending |
| [P03T02](tasks/task-P03T02-ranking-group-pages.md) | `docs/rankings/<group-slug>.md` | pending |
| [P03T03](tasks/task-P03T03-ranking-sidebar-config.md) | Register rankings in VitePress sidebar | pending |

### Comparison pipeline

| ID | Task | Status |
|----|------|--------|
| [P03T04](tasks/task-P03T04-bdd-comparison-feature.md) | **BDD: comparison e2e feature + step definitions stub** | pending |
| [P03T05](tasks/task-P03T05-groups-yaml.md) | `docs/schema/groups.yaml` | pending |
| [P03T06](tasks/task-P03T06-compare-template-yaml.md) | `docs/schema/compare-template.yaml` | pending |
| [P03T07](tasks/task-P03T07-extend-generate-schema-ts.md) | Extend `generate-schema.ts` | pending |
| [P03T08](tasks/task-P03T08-validate-compare-ts.md) | `scripts/validate-compare.ts` (TDD) | pending |
| [P03T09](tasks/task-P03T09-compare-ts.md) | `scripts/compare.ts` (TDD) | pending |
| [P03T10](tasks/task-P03T10-compare-workflow.md) | `.github/workflows/compare.yml` | pending |
| [P03T11](tasks/task-P03T11-extend-review-workflow.md) | Extend `review.yml` for compare branches | pending |
| [P03T12](tasks/task-P03T12-seed-first-group.md) | Seed fixture repos + first group in `groups.yaml` | pending |
| [P03T13](tasks/task-P03T13-run-comparison-scenarios.md) | Run Phase 3 BDD comparison scenarios | pending |

### Phase 3a gate

```sh
bun test
# Phase gate — requires GH_PAT + live GitHub (main branch only, see P01T02 for CI limitations)
bunx cucumber-js --config cucumber.json --profile integration --tags "@phase3a"
bun scripts/quarterly-check.ts --dry-run
bun scripts/schema-sync.ts --dry-run
# Comparison page generated end-to-end; hygiene scripts exit 0
```

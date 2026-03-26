# Phase 3 — Polish and Comparison

**Goal:** Improved site UX, observability, and cross-repo comparison.

**Exit criteria:** Global ranking page live; at least one comparison page generated
end-to-end; score cards render consistently; Phase 3 Cucumber scenario is green.

**Depends on:** Phase 2 complete (automated pipeline running, ≥2 evaluated repos
sharing tags for a first comparison group).

---

## Testing approach

- **BDD first**: P03T04 (comparison e2e feature) must be completed before P03T05
  (groups.yaml). The Cucumber scenario is the acceptance criterion for the comparison pipeline.
- **TDD**: implementation tasks P03T08 and P03T09 each have a collocated test file
  written *before* the source file. Red → green → refactor.

---

## Tasks

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
| [P03T12](tasks/task-P03T12-seed-first-group.md) | Seed first group in `groups.yaml` | pending |
| [P03T13](tasks/task-P03T13-run-comparison-scenarios.md) | Run Phase 3 BDD comparison scenarios | pending |

### Navigation — tags and categories

| ID | Task | Status |
|----|------|--------|
| [P03T14](tasks/task-P03T14-tags-index-page.md) | `docs/tags/index.md` | pending |
| [P03T15](tasks/task-P03T15-tags-group-pages.md) | `docs/tags/groups/<group>.md` | pending |
| [P03T16](tasks/task-P03T16-tag-detail-pages.md) | `docs/tags/<tag-id>.md` | pending |
| [P03T17](tasks/task-P03T17-categories-index-page.md) | `docs/categories/index.md` | pending |
| [P03T18](tasks/task-P03T18-category-detail-pages.md) | `docs/categories/<category>.md` | pending |
| [P03T19](tasks/task-P03T19-nav-sidebar-config.md) | Register tags/ and categories/ in sidebar | pending |

### Navigation — per-page cross-references

| ID | Task | Status |
|----|------|--------|
| [P03T20](tasks/task-P03T20-related-loader-ts.md) | `docs/.vitepress/loaders/related.ts` | pending |
| [P03T21](tasks/task-P03T21-groups-loader-ts.md) | `docs/.vitepress/loaders/groups.ts` | pending |
| [P03T22](tasks/task-P03T22-wire-cross-references.md) | Wire loaders into repo page template | pending |

### Site UX

| ID | Task | Status |
|----|------|--------|
| [P03T23](tasks/task-P03T23-score-card-component.md) | VitePress theme — score card component | pending |
| [P03T24](tasks/task-P03T24-stats-dashboard.md) | Stats dashboard on `docs/index.md` | pending |
| [P03T25](tasks/task-P03T25-local-search.md) | VitePress built-in local search | pending |
| [P03T26](tasks/task-P03T26-group-discovery-hint.md) | Group-discovery hint in `evaluate.ts` | pending |

---

## Gate

```sh
bun test
bunx cucumber-js --config cucumber.json --tags "@phase3"
# All Phase 3 scenarios green; global ranking page and comparison page live
```

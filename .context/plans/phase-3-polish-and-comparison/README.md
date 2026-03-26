# Phase 3 — Polish and Comparison

**Goal:** Operational hygiene, improved site UX, and cross-repo comparison.

**Depends on:** Phase 2 complete (automated pipeline running, ≥2 evaluated repos
sharing tags for a first comparison group).

This phase is split into two independently deliverable sub-phases so that a stall
in the comparison pipeline does not block site UX work.

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
| [P03T12](tasks/task-P03T12-seed-first-group.md) | Seed first group in `groups.yaml` | pending |
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

---

## Phase 3b — Navigation and site UX

**Exit criteria:** Global ranking page live; tag and category pages navigable;
score cards render consistently; search functional; Phase 3b Cucumber scenario green.

**Depends on:** Phase 3a complete (≥1 comparison page live, ≥several evaluated repos
to populate tag/category pages meaningfully).

### Testing approach

No new TDD targets in 3b (all logic is data-loader or VitePress config). BDD scenario
at P03T04 covers the comparison side; 3b work is verified by visual/navigation smoke tests.

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

### Phase 3b gate

```sh
bun run docs:build   # VitePress build must pass with all pages rendering
bun test
# Tag, category, and cross-reference pages navigable; score cards render
```

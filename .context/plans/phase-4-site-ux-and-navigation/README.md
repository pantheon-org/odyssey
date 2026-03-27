# Phase 4 — Site UX and Navigation

**Goal:** Tags and category navigation, per-page cross-references, score card
component, stats dashboard, and local search.

**Depends on:** Phase 3a complete (≥1 comparison page live, ≥several evaluated repos
in the knowledge graph to populate tag/category pages meaningfully).

---

## Testing approach

No new TDD targets in Phase 4 (all logic is data-loader or VitePress config). BDD
scenario at P03T04 covers the comparison side. Add a minimal automated navigation
check (P04T14) to reduce regression risk; supplement with visual/navigation smoke
tests.

---

## Ordering constraints

- **P04T01–P04T06** (tags/categories nav): can proceed in parallel once Phase 3a is
  complete.
- **P04T07–P04T08** (loaders): should be implemented before P04T09 (wiring), as the
  wiring task depends on both loaders being available.
- **P04T10–P04T14** (UX polish — score card, stats dashboard, local search,
  group-discovery hint, navigation checks): best tackled last, after the navigation
  structure is in place.

---

## Navigation — tags and categories

| ID | Task | Status |
|----|------|--------|
| [P04T01](tasks/task-P04T01-tags-index-page.md) | `docs/tags/index.md` | pending |
| [P04T02](tasks/task-P04T02-tags-group-pages.md) | `docs/tags/groups/<group>.md` | pending |
| [P04T03](tasks/task-P04T03-tag-detail-pages.md) | `docs/tags/<tag-id>.md` | pending |
| [P04T04](tasks/task-P04T04-categories-index-page.md) | `docs/categories/index.md` | pending |
| [P04T05](tasks/task-P04T05-category-detail-pages.md) | `docs/categories/<category>.md` | pending |
| [P04T06](tasks/task-P04T06-nav-sidebar-config.md) | Register tags/ and categories/ in sidebar | pending |

## Navigation — per-page cross-references

| ID | Task | Status |
|----|------|--------|
| [P04T07](tasks/task-P04T07-related-loader-ts.md) | `docs/.vitepress/loaders/related.ts` | pending |
| [P04T08](tasks/task-P04T08-groups-loader-ts.md) | `docs/.vitepress/loaders/groups.ts` | pending |
| [P04T09](tasks/task-P04T09-wire-cross-references.md) | Wire loaders into repo page template | pending |

## Site UX

| ID | Task | Status |
|----|------|--------|
| [P04T10](tasks/task-P04T10-score-card-component.md) | VitePress theme — score card component | pending |
| [P04T11](tasks/task-P04T11-stats-dashboard.md) | Stats dashboard on `docs/index.md` | pending |
| [P04T12](tasks/task-P04T12-local-search.md) | VitePress built-in local search | pending |
| [P04T13](tasks/task-P04T13-group-discovery-hint.md) | Group-discovery hint in `evaluate.ts` | pending |
| [P04T14](tasks/task-P04T14-navigation-checks.md) | Minimal automated navigation checks | pending |

---

## Phase 4 gate

```sh
bun run docs:build
# all tag/category pages navigable; score cards render; local search functional
```

**Exit criteria:** `bun run docs:build` passes; tag/category pages navigable; score
cards render consistently; navigation checks green.

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

## Tasks

Parallel waves — tasks in the same wave can be implemented concurrently in separate
worktrees (see AGENTS.md for the worktree pattern). A task cannot start until all its
dependencies are merged to `main`.

| ID | Task | Depends | Wave | Status |
|----|------|---------|------|--------|
| [P04T01](tasks/task-P04T01-tags-index-page.md) | `docs/tags/index.md` | — | 1 | pending |
| [P04T02](tasks/task-P04T02-tags-group-pages.md) | `docs/tags/groups/<group>.md` | — | 1 | pending |
| [P04T03](tasks/task-P04T03-tag-detail-pages.md) | `docs/tags/<tag-id>.md` | — | 1 | pending |
| [P04T04](tasks/task-P04T04-categories-index-page.md) | `docs/categories/index.md` | — | 1 | pending |
| [P04T05](tasks/task-P04T05-category-detail-pages.md) | `docs/categories/<category>.md` | — | 1 | pending |
| [P04T07](tasks/task-P04T07-related-loader-ts.md) | `docs/.vitepress/loaders/related.ts` | — | 1 | pending |
| [P04T08](tasks/task-P04T08-groups-loader-ts.md) | `docs/.vitepress/loaders/groups.ts` | — | 1 | pending |
| [P04T10](tasks/task-P04T10-score-card-component.md) | VitePress theme — score card component | — | 1 | pending |
| [P04T11](tasks/task-P04T11-stats-dashboard.md) | Stats dashboard on `docs/index.md` | — | 1 | pending |
| [P04T12](tasks/task-P04T12-local-search.md) | VitePress built-in local search | — | 1 | pending |
| [P04T13](tasks/task-P04T13-group-discovery-hint.md) | Group-discovery hint in `evaluate.ts` | — | 1 | pending |
| [P04T06](tasks/task-P04T06-nav-sidebar-config.md) | Register tags/ and categories/ in sidebar | [P04T01](tasks/task-P04T01-tags-index-page.md), [P04T02](tasks/task-P04T02-tags-group-pages.md), [P04T03](tasks/task-P04T03-tag-detail-pages.md), [P04T04](tasks/task-P04T04-categories-index-page.md), [P04T05](tasks/task-P04T05-category-detail-pages.md) | 2 | pending |
| [P04T09](tasks/task-P04T09-wire-cross-references.md) | Wire loaders into repo page template | [P04T07](tasks/task-P04T07-related-loader-ts.md), [P04T08](tasks/task-P04T08-groups-loader-ts.md) | 2 | pending |
| [P04T14](tasks/task-P04T14-navigation-checks.md) | Minimal automated navigation checks | [P04T06](tasks/task-P04T06-nav-sidebar-config.md), [P04T09](tasks/task-P04T09-wire-cross-references.md) | 3 | pending |

---

## Phase 4 gate

```sh
bun run docs:build
# all tag/category pages navigable; score cards render; local search functional
```

**Exit criteria:** `bun run docs:build` passes; tag/category pages navigable; score
cards render consistently; navigation checks green.

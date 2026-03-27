# P04T04 — `docs/categories/index.md`

## Goal
Categories index page: all categories with repo counts and average total scores.

## Files
- `docs/categories/index.md`

## Implementation
- Data loader: reads `classification.yaml` for category list; reads all
  `docs/repos/*.md` frontmatter to compute per-category repo count and average
  score; sorts by count descending.
- Renders as a table with links to category detail pages.

## References
- `../../../knowledge-base/site-structure.md` — categories section layout
- `../../../knowledge-base/classification.md` — category definitions

## Verification
```sh
bun run docs:build
grep -r "categories/index" docs/.vitepress/dist/ | head -3
```

## Acceptance Criteria
- [ ] `bun run docs:build` generates `docs/.vitepress/dist/categories/index.html` without error
- [ ] Index table lists all categories defined in `classification.yaml`
- [ ] Each row shows repo count, average total score, and a link to the category detail page
- [ ] Categories are sorted by repo count descending

## Definition of Done

**Must Have**
- [ ] `bun run docs:build` generates `docs/.vitepress/dist/categories/index.html` without error
- [ ] Index table lists all categories from `classification.yaml` sorted by repo count descending, with repo count, average total score, and a link to the detail page per row

**Should Have**
- [ ] All acceptance criteria pass including correct sort order and link targets

**Could Have**
- [ ] Categories with zero repos are shown at the bottom with a visual indicator that they have no entries yet

**Won't Have (this iteration)**
- Category create/edit UI — categories are managed via `classification.yaml` directly

## Status
pending

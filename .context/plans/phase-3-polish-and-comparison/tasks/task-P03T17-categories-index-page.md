# P03T17 — `docs/categories/index.md`

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
- `site-structure.md` — categories section layout
- `classification.md` — category definitions

## Verification
```sh
bun run docs:build
grep -r "categories/index" docs/.vitepress/dist/ | head -3
```

## Status
pending

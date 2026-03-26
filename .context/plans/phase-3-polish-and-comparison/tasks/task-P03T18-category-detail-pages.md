# P03T18 — `docs/categories/<category>.md`

## Goal
Per-category detail page: all repos in this category, sorted by total score.

## Files
- `docs/categories/<category>.md` (one per category in `classification.yaml`)

## Implementation
- Data loader: filters all `docs/repos/*.md` frontmatter where `category === <category>`;
  sorts by total score descending.
- Renders as a ranked list with score, tags, and verdict.

## References
- `site-structure.md` — category detail page layout
- `classification.md` — category definitions

## Verification
```sh
bun run docs:build
ls docs/.vitepress/dist/categories/ | head -5
```

## Status
pending

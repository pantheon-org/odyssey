# P04T05 — `docs/categories/<category>.md`

## Goal
Per-category detail page: all repos in this category, sorted by total score.

## Files
- `docs/categories/<category>.md` (one per category in `classification.yaml`)

## Implementation
- Data loader: filters all `docs/repos/*.md` frontmatter where `category === <category>`;
  sorts by total score descending.
- Renders as a ranked list with score, tags, and verdict.

## References
- `../../../knowledge-base/site-structure.md` — category detail page layout
- `../../../knowledge-base/classification.md` — category definitions

## Verification
```sh
bun run docs:build
ls docs/.vitepress/dist/categories/ | head -5
```

## Acceptance Criteria
- [ ] `bun run docs:build` generates one detail page per category in `docs/.vitepress/dist/categories/`
- [ ] Each page lists only repos whose `category` frontmatter matches that category
- [ ] Repos are sorted by total score descending
- [ ] Each row includes score, tags, and verdict
- [ ] A category with no repos renders an empty list without a build error

## Definition of Done

**Must Have**
- [ ] `bun run docs:build` generates one detail page per category in `docs/.vitepress/dist/categories/`
- [ ] Each page lists only repos whose `category` frontmatter matches that category, sorted by total score descending, with score, tags, and verdict per row

**Should Have**
- [ ] All acceptance criteria pass, including the empty-category edge case rendering without a build error

**Could Have**
- [ ] Category detail pages include a link back to the categories index page

**Won't Have (this iteration)**
- Sub-category or nested category hierarchy — flat category structure per `classification.yaml` is the design

## Status
pending

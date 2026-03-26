# P03T24 — Stats dashboard on `docs/index.md`

## Goal
Add a stats dashboard to the home page: total repos, average scores, top tags,
category breakdown.

## Files
- `docs/index.md`
- `docs/.vitepress/loaders/stats.ts` (data loader)

## Implementation
- Data loader: reads all `docs/repos/*.md` frontmatter; computes:
  - Total evaluated repos
  - Average total score
  - Top 5 tags by repo count
  - Category distribution
- Injects data into the home page hero section via VitePress data loader.

## References
- `site-structure.md` — home page layout, stats section

## Verification
```sh
bun run docs:build
grep -r "total\|average" docs/.vitepress/dist/index.html | head -5
```

## Status
pending

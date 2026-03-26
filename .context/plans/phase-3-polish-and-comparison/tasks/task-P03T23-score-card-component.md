# P03T23 — VitePress theme — score card component

## Goal
Implement a reusable score card component that renders dimension scores as a
visual card on repo pages.

## Files
- `docs/.vitepress/theme/ScoreCard.vue`
- `docs/.vitepress/theme/index.ts` (register component)

## Implementation
- Props: dimensions array (label + score 1–5), category, verdict, total score.
- Visual: colour-coded score cells (e.g. green 4–5, yellow 3, red 1–2).
- Used in the repo page template via frontmatter data.
- No external UI library — use inline CSS or CSS variables consistent with the
  VitePress default theme.

## References
- `site-structure.md` — score card layout spec

## Verification
```sh
bun run docs:build
# Visually inspect a repo page for score card rendering
```

## Status
pending

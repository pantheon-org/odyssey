# P03T22 — Wire loaders into repo page template

## Goal
Inject related repos and group membership data into the repo page template for
rendering.

## Files
- `docs/.vitepress/theme/RepoPage.vue` (or equivalent theme extension)
- `scripts/evaluate.ts` (minor: ensure `tags` and `owner/repo` are in frontmatter)

## Implementation
- Extend the VitePress theme to call `getRelated()` and `getGroups()` at build
  time for each repo page (via `<script setup>` + `useData()`).
- Render a "Related repos" sidebar section (top 3) and a "Part of groups" section.
- No new scripts; data provided by the loaders from P03T19 and P03T20.
- See `site-structure.md` for the repo page cross-reference layout.

## References
- `site-structure.md` — cross-reference layout spec

## Verification
```sh
bun run docs:build
grep -r "related\|groups" docs/.vitepress/dist/repos/ | head -5
```

## Status
pending

# P03T19 — Register tags/ and categories/ in VitePress sidebar

## Goal
Add `tags/` and `categories/` navigation sections to the VitePress config.

## Files
- `docs/.vitepress/config.ts`

## Implementation
- Add sidebar sections for Tags (linking to `tags/index.md` and tag group pages)
  and Categories (linking to `categories/index.md` and category detail pages).
- Dynamic children can use VitePress `generateSidebar` or a manual listing.
- See `site-structure.md` for the complete sidebar structure spec.

## References
- `site-structure.md` — sidebar structure

## Verification
```sh
bun run docs:build
grep -r "tags\|categories" docs/.vitepress/dist/index.html | head -5
```

## Status
pending

# P03T25 — VitePress built-in local search

## Goal
Verify that VitePress local search indexes the repo and comparison page corpus correctly.

## Files
- `docs/.vitepress/config.ts` (enable `search: { provider: 'local' }` if not already set)

## Implementation
- Enable `search: { provider: 'local' }` in VitePress config.
- Verify the search index is generated at build time and covers:
  - Repo pages (`docs/repos/*.md`)
  - Comparison pages (`docs/compare/*.md`)
  - Tag and category pages
- No external search plugin needed — built into VitePress.

## References
- `site-structure.md` — search configuration

## Verification
```sh
bun run docs:build
ls docs/.vitepress/dist/assets/ | grep -i "search\|index"
# Built site search icon functional in browser
```

## Status
pending

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
- `../../../knowledge-base/site-structure.md` — search configuration

## Verification
```sh
bun run docs:build
ls docs/.vitepress/dist/assets/ | grep -i "search\|index"
# Built site search icon functional in browser
```

## Acceptance Criteria
- [ ] A search index file is present in `docs/.vitepress/dist/assets/` after `bun run docs:build`
- [ ] Search covers repo pages, comparison pages, tag pages, and category pages
- [ ] `search: { provider: 'local' }` is set in `docs/.vitepress/config.ts`
- [ ] No external search plugin or additional dependency is introduced

## Status
pending

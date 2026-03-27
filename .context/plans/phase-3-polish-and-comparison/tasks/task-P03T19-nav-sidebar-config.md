# P03T19 — Register tags/ and categories/ in VitePress sidebar

## Goal
Add `tags/` and `categories/` navigation sections to the VitePress config.

## Files
- `docs/.vitepress/config.ts`

## Implementation
- Add sidebar sections for Tags (linking to `tags/index.md` and tag group pages)
  and Categories (linking to `categories/index.md` and category detail pages).
- Dynamic children can use VitePress `generateSidebar` or a manual listing.
- See `../../../knowledge-base/site-structure.md` for the complete sidebar structure spec.

## References
- `../../../knowledge-base/site-structure.md` — sidebar structure

## Verification
```sh
bun run docs:build
grep -r "tags\|categories" docs/.vitepress/dist/index.html | head -5
```

## Acceptance Criteria
- [ ] Built `index.html` sidebar contains "Tags" and "Categories" sections
- [ ] "Tags" section links to `tags/index.md` and at least one tag group page
- [ ] "Categories" section links to `categories/index.md`
- [ ] `bun run docs:build` completes without errors after this change

## Definition of Done

**Must Have**
- [ ] Built `index.html` sidebar contains "Tags" and "Categories" sections
- [ ] "Tags" section links to `tags/index.md` and at least one tag group page; "Categories" section links to `categories/index.md`
- [ ] `bun run docs:build` completes without errors after this change

**Should Have**
- [ ] All acceptance criteria verified against the built HTML output

**Could Have**
- [ ] Sidebar sections auto-populate new tag groups and category pages dynamically so no manual config update is needed when new entries are added

**Won't Have (this iteration)**
- Collapsible sidebar sections or custom icons — default VitePress navigation styling is sufficient

## Status
pending

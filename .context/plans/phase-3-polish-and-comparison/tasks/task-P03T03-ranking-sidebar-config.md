# P03T03 — Register rankings in VitePress sidebar

## Goal
Add `rankings/` to the VitePress sidebar config so ranking pages are navigable.

## Files
- `docs/.vitepress/config.ts`

## Implementation
- Add a `Rankings` sidebar section pointing to `rankings/index.md` and any
  per-group pages.
- Dynamic group pages can be added programmatically via a data loader that
  enumerates `docs/rankings/*.md` at build time.

## References
- `../../../knowledge-base/site-structure.md` — sidebar structure spec

## Verification
```sh
bun run docs:build
# Rankings section visible in built HTML sidebar
grep -r "rankings" docs/.vitepress/dist/ | head -5
```

## Acceptance Criteria
- [ ] Built HTML sidebar contains a "Rankings" section
- [ ] "Rankings" section links to `rankings/index.md`
- [ ] Per-group ranking pages are reachable from the sidebar navigation
- [ ] `bun run docs:build` completes without errors after this change

## Definition of Done

**Must Have**
- [ ] Built HTML sidebar contains a "Rankings" section linking to `rankings/index.md`
- [ ] Per-group ranking pages are reachable from the sidebar navigation
- [ ] `bun run docs:build` completes without errors after this change

**Should Have**
- [ ] All acceptance criteria verified against the built HTML output

**Could Have**
- [ ] Sidebar auto-populates new group pages dynamically via a data loader so no manual config update is needed when groups are added

**Won't Have (this iteration)**
- Custom sidebar icons or visual theming for the Rankings section — default VitePress styling is sufficient

## Status
pending

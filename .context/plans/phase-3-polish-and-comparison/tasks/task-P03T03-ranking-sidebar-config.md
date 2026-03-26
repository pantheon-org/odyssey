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
- `site-structure.md` — sidebar structure spec

## Verification
```sh
bun run docs:build
# Rankings section visible in built HTML sidebar
grep -r "rankings" docs/.vitepress/dist/ | head -5
```

## Status
pending

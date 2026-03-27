# P01T08 — VitePress scaffold

## Goal
Create the minimal VitePress site: `docs/index.md` home page and
`docs/.vitepress/config.ts` with base config.

## Files
- `docs/index.md`
- `docs/.vitepress/config.ts`

## Implementation
- `config.ts`: title, description, sidebar stub, `srcDir: 'docs'`.
- `docs/index.md`: hero layout (stats dashboard added in Phase 3).
- Register `repos/` in sidebar; leave `rankings/`, `tags/`, `categories/` for Phase 3.
- See `site-structure.md` for the full VitePress layout specification.

## References
- `site-structure.md` — VitePress config spec, sidebar structure, frontmatter schema

## Verification
```sh
bun run docs:build 2>&1 | tail -5
# expect: "build complete"
```

## Acceptance Criteria
- [ ] `bun run docs:build` completes with "build complete" in output
- [ ] `docs/.vitepress/dist/index.html` exists after build
- [ ] `docs/.vitepress/config.ts` includes a `repos/` sidebar section
- [ ] `docs/index.md` uses a hero layout (no 404 on the home page)
- [ ] Build produces no errors for missing pages or broken config

## Status
pending

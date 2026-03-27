# P03T14 — `docs/tags/index.md`

## Goal
Tags index page: all tags grouped by their `group`, with repo counts per tag.

## Files
- `docs/tags/index.md`

## Implementation
- VitePress data loader: reads `docs/schema/classification.yaml` for tag groups and
  all `docs/repos/*.md` frontmatter for tag usage counts.
- Renders groups as sections; each tag shows count and links to its detail page.
- Deprecated tags (with `replaced_by`) shown with a visual indicator — see ADR-020.

## References
- `site-structure.md` — tags section layout
- `adr/020-tag-vocabulary-model.md` — deprecated tag rendering

## Verification
```sh
bun run docs:build 2>&1 | grep -i "tags"
grep -r "tags/index" docs/.vitepress/dist/ | head -3
```

## Acceptance Criteria
- [ ] `bun run docs:build` generates `docs/.vitepress/dist/tags/index.html` without error
- [ ] Index lists all tag groups from `classification.yaml` as named sections
- [ ] Each tag shows its repo usage count and links to `docs/tags/<tag-id>.md`
- [ ] Deprecated tags (with `replaced_by`) are visually distinguished from active tags

## Status
pending

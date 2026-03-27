# P03T16 — `docs/tags/<tag-id>.md`

## Goal
Per-tag detail page: all repos with this tag, sorted by total score.

## Files
- `docs/tags/<tag-id>.md` (one per active tag in `classification.yaml`)

## Implementation
- Data loader: filters all `docs/repos/*.md` frontmatter for repos with this
  `tag-id` in their `tags[]`; sorts by total score descending.
- Deprecated tags: render with a redirect notice pointing to `replaced_by` tag.
- Pages are static; regenerated on every build.

## References
- `site-structure.md` — tag detail page layout
- `adr/020-tag-vocabulary-model.md` — deprecated tag redirect notice

## Verification
```sh
bun run docs:build
ls docs/.vitepress/dist/tags/ | head -5
```

## Acceptance Criteria
- [ ] `bun run docs:build` generates one detail page per active tag in `docs/.vitepress/dist/tags/`
- [ ] Each page lists only repos whose `tags[]` frontmatter includes that tag, sorted by total score descending
- [ ] Deprecated tags render a redirect notice pointing to the `replaced_by` tag (not a 404)
- [ ] Active tags with no repos render an empty list without a build error

## Status
pending

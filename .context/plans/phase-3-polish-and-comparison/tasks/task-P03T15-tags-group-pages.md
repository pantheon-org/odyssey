# P03T15 — `docs/tags/groups/<group>.md`

## Goal
Per-tag-group page: all tags in a group with their repos.

## Files
- `docs/tags/groups/<group>.md` (one per tag group in `classification.yaml`)

## Implementation
- Data loader: reads tag group from `classification.yaml`, then filters all
  `docs/repos/*.md` by tags belonging to this group.
- Renders tag list with per-tag repo counts and links to `docs/tags/<tag-id>.md`.
- Pages are static (one per group); regenerated on every build.

## References
- `site-structure.md` — tag group page layout
- `adr/020-tag-vocabulary-model.md` — tag group structure

## Verification
```sh
bun run docs:build
ls docs/.vitepress/dist/tags/groups/
```

## Acceptance Criteria
- [ ] `bun run docs:build` generates one page per tag group under `docs/.vitepress/dist/tags/groups/`
- [ ] Each page lists only tags belonging to that specific group
- [ ] Each tag entry shows its repo count and links to the corresponding `docs/tags/<tag-id>.md`
- [ ] Number of generated pages matches the number of tag groups in `classification.yaml`

## Status
pending

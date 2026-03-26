# P03T02 — `docs/rankings/<group-slug>.md`

## Goal
Per-group ranking page: lists repos belonging to a group, sorted by total score.

## Files
- `docs/rankings/<group-slug>.md` (one per group; generated or static)

## Implementation
- Data loader reads `docs/schema/groups.yaml` to enumerate groups, then filters
  `docs/repos/*.md` frontmatter by `groups` membership.
- At Phase 3 start, create the page for the first seeded group (see P03T11).
- New group pages are created as groups are seeded in `groups.yaml` — manual
  process or scripted.
- See `compare-rankings.md` for per-group ranking schema.

## References
- `compare-rankings.md` — per-group ranking page schema
- `site-structure.md` — data loader pattern

## Verification
```sh
bun run docs:build 2>&1 | grep -i "rankings"
# per-group page renders for the seeded group
```

## Status
pending

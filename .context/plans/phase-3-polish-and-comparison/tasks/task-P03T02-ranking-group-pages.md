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
- See `../../../knowledge-base/compare-rankings.md` for per-group ranking schema.

## References
- `../../../knowledge-base/compare-rankings.md` — per-group ranking page schema
- `../../../knowledge-base/site-structure.md` — data loader pattern

## Verification
```sh
bun run docs:build 2>&1 | grep -i "rankings"
# per-group page renders for the seeded group
```

## Acceptance Criteria
- [ ] `bun run docs:build` generates a per-group ranking page for each seeded group in `groups.yaml`
- [ ] Each per-group page lists only repos that are members of that group
- [ ] Repos are sorted by total score descending
- [ ] A group with no evaluated members renders an empty table without a build error

## Definition of Done

**Must Have**
- [ ] `bun run docs:build` generates a per-group ranking page for each seeded group in `groups.yaml`
- [ ] Each per-group page lists only that group's member repos, sorted by total score descending

**Should Have**
- [ ] All acceptance criteria pass, including the empty-group edge case rendering an empty table without a build error

**Could Have**
- [ ] Script or generator to scaffold new per-group pages automatically when a group is added to `groups.yaml`

**Won't Have (this iteration)**
- Cross-group score comparison within a single page — that is the responsibility of the comparison pipeline (P03T09)

## Status
pending

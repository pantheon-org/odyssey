# P03T12 — Seed first group in `groups.yaml`

## Goal
Add the first real comparison group once ≥2 overlapping repos are evaluated.

## Files
- `docs/schema/groups.yaml`

## Implementation
- Prerequisite: ≥2 repos evaluated that share 2+ tags (group-discovery hint from
  P03T25 surfaces candidates).
- Add a group entry: `id`, `label`, `description`, `members: [owner/repo, ...]`.
- Commit to `main` via PR — this push triggers `compare.yml` automatically.

## References
- `compare-rankings.md` — groups.yaml schema, seeding strategy
- `adr/015-compare-rankings.md` — comparison page rationale

## Verification
```sh
bun -e "import { parse } from 'yaml'; import { readFileSync } from 'fs'; const g = parse(readFileSync('docs/schema/groups.yaml', 'utf8')); console.log(g.groups.length > 0 ? 'seeded' : 'empty')"
```

## Status
pending

# P03T12 — Seed fixture repos + first group in `groups.yaml`

## Goal
Create deterministic fixture repos and seed the first real comparison group once
≥2 overlapping repos are evaluated.

## Files
- `docs/schema/groups.yaml`

## Implementation
- Establish fixture repos (or controlled test repos) with overlapping tags so the
  comparison pipeline has stable inputs.
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

## Acceptance Criteria
- [ ] `groups.yaml` contains at least one group entry with valid `id`, `label`, `description`, and `members[]`
- [ ] All repos listed in `members[]` have existing evaluated pages in `docs/repos/`
- [ ] The seeded group's members share at least 2 tags (prerequisite for meaningful comparison)
- [ ] Committing `groups.yaml` via a PR and merging to `main` triggers `compare.yml`

## Status
pending

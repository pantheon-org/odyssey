# P03T05 — `docs/schema/groups.yaml`

## Goal
Create the initial groups config file with an empty groups list and `version: "1.0.0"`.

## Files
- `docs/schema/groups.yaml`

## Implementation
- Fields: `version: "1.0.0"`, `groups: []`.
- Each group entry (added in P03T11): `id`, `label`, `description`, `members[]`
  (list of `owner/repo` strings).
- See `compare-rankings.md` for the full groups.yaml schema design.

## Produces
- `docs/schema/groups.yaml` — consumed by P03T07, P03T08, P03T09 (compare.ts)
  - `version` (string)
  - `groups[]` — each entry: `{ id: string, label: string, description: string, members: string[] }` where `members` are `owner/repo` strings

## References
- `compare-rankings.md` — `groups.yaml` design, group schema
- `adr/015-compare-rankings.md` — comparison pages vs ranking pages rationale

## Verification
```sh
bun -e "import { parse } from 'yaml'; import { readFileSync } from 'fs'; const g = parse(readFileSync('docs/schema/groups.yaml', 'utf8')); console.log(g.version, Array.isArray(g.groups) ? 'ok' : 'bad')"
```

## Status
pending

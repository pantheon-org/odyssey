# P03T05 — `docs/schema/groups.yaml`

## Goal
Create the initial groups config file with an empty groups list and `version: "1.0.0"`.

## Files
- `docs/schema/groups.yaml`

## Implementation
- Fields: `version: "1.0.0"`, `groups: []`.
- Each group entry (added in P03T11): `id`, `label`, `description`, `members[]`
  (list of `owner/repo` strings).
- See `../../../knowledge-base/compare-rankings.md` for the full groups.yaml schema design.

## Produces
- `docs/schema/groups.yaml` — consumed by P03T07, P03T08, P03T09 (compare.ts)
  - `version` (string)
  - `groups[]` — each entry: `{ id: string, label: string, description: string, members: string[] }` where `members` are `owner/repo` strings

## References
- `../../../knowledge-base/compare-rankings.md` — `groups.yaml` design, group schema
- `adr/015-compare-rankings.md` — comparison pages vs ranking pages rationale

## Verification
```sh
bun -e "import { parse } from 'yaml'; import { readFileSync } from 'fs'; const g = parse(readFileSync('docs/schema/groups.yaml', 'utf8')); console.log(g.version, Array.isArray(g.groups) ? 'ok' : 'bad')"
```

## Acceptance Criteria
- [ ] File parses as valid YAML without error
- [ ] `version` is `"1.0.0"` on creation
- [ ] `groups` is an array (empty at creation)
- [ ] Once a group is added, each entry contains `id`, `label`, `description`, and `members[]` fields

## Definition of Done

**Must Have**
- [ ] `docs/schema/groups.yaml` exists, parses as valid YAML, and contains `version: "1.0.0"` and `groups: []` at creation
- [ ] Once a group entry is added, it contains `id`, `label`, `description`, and `members[]` fields

**Should Have**
- [ ] All acceptance criteria verified via the inline bun parse snippet

**Could Have**
- [ ] JSON Schema or Zod schema for `groups.yaml` to catch malformed group entries at edit time

**Won't Have (this iteration)**
- Automated group-membership validation against existing `docs/repos/` pages — that is handled by P03T12 seeding prerequisites

## Depends on

_None — this is a Wave 1 task._

## Context

_Minimum reads before starting:_

- `../../../knowledge-base/classification.md` — classification dimensions and tag structure
- `../../../knowledge-base/architecture.md` — groups.yaml role in comparison pipeline

## Status
pending

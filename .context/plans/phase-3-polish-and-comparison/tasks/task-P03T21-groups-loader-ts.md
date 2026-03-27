# P03T21 — `docs/.vitepress/loaders/groups.ts`

## Goal
Data loader returning the groups a given repo belongs to.

## Files
- `docs/.vitepress/loaders/groups.ts`

## Implementation
- Reads `docs/schema/groups.yaml`.
- For a given `owner/repo`, returns all group entries where `members[]` contains
  it, along with links to the group's comparison and ranking pages.
- Used by the repo page template (P03T21).

## References
- `site-structure.md` — groups cross-reference loader spec
- `compare-rankings.md` — groups.yaml schema

## Verification
```sh
bun -e "import { getGroups } from './docs/.vitepress/loaders/groups.ts'; console.log(getGroups('owner/repo'))"
```

## Acceptance Criteria
- [ ] `getGroups('owner/repo')` returns all groups whose `members[]` contains that repo
- [ ] Returns an empty array when the repo has no group membership
- [ ] Each returned entry includes links to the group's comparison page (`/compare/<group-id>`) and ranking page (`/rankings/<group-id>`)

## Status
pending

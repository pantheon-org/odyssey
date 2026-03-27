# P04T08 — `docs/.vitepress/loaders/groups.ts`

## Goal
Data loader returning the groups a given repo belongs to.

## Files
- `docs/.vitepress/loaders/groups.ts`

## Implementation
- Reads `docs/schema/groups.yaml`.
- For a given `owner/repo`, returns all group entries where `members[]` contains
  it, along with links to the group's comparison and ranking pages.
- Used by the repo page template (P04T09).

## References
- `../../../knowledge-base/site-structure.md` — groups cross-reference loader spec
- `../../../knowledge-base/compare-rankings.md` — groups.yaml schema

## Verification
```sh
bun -e "import { getGroups } from './docs/.vitepress/loaders/groups.ts'; console.log(getGroups('owner/repo'))"
```

## Acceptance Criteria
- [ ] `getGroups('owner/repo')` returns all groups whose `members[]` contains that repo
- [ ] Returns an empty array when the repo has no group membership
- [ ] Each returned entry includes links to the group's comparison page (`/compare/<group-id>`) and ranking page (`/rankings/<group-id>`)

## Definition of Done

**Must Have**
- [ ] `getGroups('owner/repo')` returns all groups whose `members[]` contains that repo, each entry including links to `/compare/<group-id>` and `/rankings/<group-id>`
- [ ] Returns an empty array when the repo has no group membership

**Should Have**
- [ ] All acceptance criteria verified, including correct link paths for both comparison and ranking pages

**Could Have**
- [ ] Unit tests collocated at `docs/.vitepress/loaders/groups.test.ts` covering membership, non-membership, and multiple-group scenarios

**Won't Have (this iteration)**
- Transitive group membership or inheritance — direct `members[]` lookup only

## Depends on

_None — this is a Wave 1 task. Phase 3a must be complete._

## Context

_Minimum reads before starting:_

- `../../../knowledge-base/architecture.md` — groups.ts loader role
- `../../../knowledge-base/toolchain.md` — VitePress data loader pattern

## Status
pending

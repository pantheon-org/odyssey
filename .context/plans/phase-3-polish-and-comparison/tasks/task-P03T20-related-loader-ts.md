# P03T20 — `docs/.vitepress/loaders/related.ts`

## Goal
Data loader returning the top-3 related repos for a given repo, by shared-tag count.

## Files
- `docs/.vitepress/loaders/related.ts`

## Implementation
- Input: current repo's `tags[]` from frontmatter.
- Algorithm: for each other evaluated repo, count shared tags; sort by count
  descending, tie-break by total score; keep top 3; require ≥1 shared tag minimum.
- Returns an array of `{ owner, repo, sharedTags, totalScore }`.
- Used by the repo page template (P03T21).

## References
- `site-structure.md` — related repos loader spec

## Verification
```sh
bun -e "import { getRelated } from './docs/.vitepress/loaders/related.ts'; console.log(getRelated(['owner/repo']))"
```

## Acceptance Criteria
- [ ] `getRelated('owner/repo')` returns at most 3 repos
- [ ] All returned repos share at least 1 tag with the input repo
- [ ] Repos with more shared tags rank higher; ties broken by total score descending
- [ ] Returns an empty array when no repos share any tags with the input
- [ ] Does not return the input repo itself in the results

## Status
pending

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
- `../../../knowledge-base/site-structure.md` — related repos loader spec

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

## Definition of Done

**Must Have**
- [ ] `getRelated('owner/repo')` returns at most 3 repos, each sharing ≥1 tag with the input, ranked by shared-tag count then total score
- [ ] Returns an empty array when no repos share any tags; never returns the input repo itself

**Should Have**
- [ ] All acceptance criteria verified, including tie-breaking by total score and the self-exclusion rule

**Could Have**
- [ ] Unit tests collocated at `docs/.vitepress/loaders/related.test.ts` covering edge cases (ties, empty corpus, single-repo corpus)

**Won't Have (this iteration)**
- Semantic or embedding-based similarity — shared-tag count is the sole similarity signal for this iteration

## Status
pending

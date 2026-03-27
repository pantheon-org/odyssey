# P04T11 — Stats dashboard on `docs/index.md`

## Goal
Add a stats dashboard to the home page: total repos, average scores, top tags,
category breakdown.

## Files
- `docs/index.md`
- `docs/.vitepress/loaders/stats.ts` (data loader)

## Implementation
- Data loader: reads all `docs/repos/*.md` frontmatter; computes:
  - Total evaluated repos
  - Average total score
  - Top 5 tags by repo count
  - Category distribution
- Injects data into the home page hero section via VitePress data loader.

## References
- `../../../knowledge-base/site-structure.md` — home page layout, stats section

## Verification
```sh
bun run docs:build
grep -r "total\|average" docs/.vitepress/dist/index.html | head -5
```

## Acceptance Criteria
- [ ] Built `index.html` displays the total number of evaluated repos
- [ ] Built `index.html` displays the average total score across all repos
- [ ] Built `index.html` displays the top 5 tags by repo count
- [ ] Built `index.html` displays the category distribution (count per category)
- [ ] Dashboard renders with zero repos without a build error (empty-state handling)

## Definition of Done

**Must Have**
- [ ] Built `index.html` displays total evaluated repos, average total score, top 5 tags by repo count, and category distribution
- [ ] Dashboard renders without a build error when `docs/repos/` is empty (zero-repo empty state)

**Should Have**
- [ ] All acceptance criteria verified against the built HTML output

**Could Have**
- [ ] Dashboard includes a "last updated" timestamp derived from the most recent `evaluated_at` frontmatter value

**Won't Have (this iteration)**
- Live/real-time stats updates — data is computed from committed frontmatter at build time only

## Depends on

_None — this is a Wave 1 task. Phase 3a must be complete._

## Context

_Minimum reads before starting:_

- `../../../knowledge-base/architecture.md` — docs/index.md role as the site home
- `../../../knowledge-base/toolchain.md` — VitePress data loader for aggregated stats

## Status
pending

# P03T01 — `docs/rankings/index.md`

## Goal
Global ranking page: lists all evaluated repos sorted by total score using a
VitePress data loader.

## Files
- `docs/rankings/index.md`

## Implementation
- VitePress data loader: reads all `docs/repos/*.md` frontmatter, computes total
  score (sum of dimension scores), sorts descending.
- Renders as a table: rank, repo name (link), category, total score, top tags.
- No new workflow needed — pure data loader, regenerated on every `docs:build`.

## References
- `../../../knowledge-base/site-structure.md` — ranking page schema, data loader pattern
- `../../../knowledge-base/compare-rankings.md` — ranking page design detail

## Verification
```sh
bun run docs:build 2>&1 | grep -i "rankings"
# page renders without error
```

## Acceptance Criteria
- [ ] `bun run docs:build` generates `docs/.vitepress/dist/rankings/index.html` without error
- [ ] Rankings table lists all evaluated repos sorted by total score descending
- [ ] Each row includes repo name (as a link to the repo page), category, total score, and top tags
- [ ] An empty `docs/repos/` directory renders an empty table without a build error

## Definition of Done

**Must Have**
- [ ] `docs/rankings/index.md` exists and `bun run docs:build` generates `docs/.vitepress/dist/rankings/index.html` without error
- [ ] Rankings table lists all evaluated repos sorted by total score descending, with repo name link, category, total score, and top tags per row

**Should Have**
- [ ] All acceptance criteria pass, including the empty-`docs/repos/` edge case rendering an empty table without a build error

**Could Have**
- [ ] Pagination or a "show more" mechanism for large repo sets (>50 repos)

**Won't Have (this iteration)**
- Live score recomputation via API — scores are read from committed frontmatter only

## Status
pending

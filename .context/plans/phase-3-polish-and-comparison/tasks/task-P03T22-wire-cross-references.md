# P03T22 — Wire loaders into repo page template

## Goal
Inject related repos and group membership data into the repo page template for
rendering.

## Files
- `docs/.vitepress/theme/RepoPage.vue` (or equivalent theme extension)
- `scripts/evaluate.ts` (minor: ensure `tags` and `owner/repo` are in frontmatter)

## Implementation
- Extend the VitePress theme to call `getRelated()` and `getGroups()` at build
  time for each repo page (via `<script setup>` + `useData()`).
- Render a "Related repos" sidebar section (top 3) and a "Part of groups" section.
- No new scripts; data provided by the loaders from P03T19 and P03T20.
- See `../../../knowledge-base/site-structure.md` for the repo page cross-reference layout.

## References
- `../../../knowledge-base/site-structure.md` — cross-reference layout spec

## Verification
```sh
bun run docs:build
grep -r "related\|groups" docs/.vitepress/dist/repos/ | head -5
```

## Acceptance Criteria
- [ ] Built repo pages include a "Related repos" section listing up to 3 repos
- [ ] Built repo pages include a "Part of groups" section listing any groups the repo belongs to
- [ ] "Related repos" section is absent when the repo shares no tags with any other evaluated repo
- [ ] "Part of groups" section is absent when the repo has no group membership
- [ ] `bun run docs:build` completes without theme or component errors

## Status
pending

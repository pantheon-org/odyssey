# P04T09 — Wire loaders into repo page template

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
- No new scripts; data provided by the loaders from P04T07 and P04T08.
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

## Definition of Done

**Must Have**
- [ ] Built repo pages include a "Related repos" section (up to 3 entries) and a "Part of groups" section
- [ ] "Related repos" section is absent when the repo shares no tags; "Part of groups" section is absent when the repo has no group membership
- [ ] `bun run docs:build` completes without theme or component errors

**Should Have**
- [ ] All acceptance criteria verified against built HTML output in `docs/.vitepress/dist/repos/`

**Could Have**
- [ ] Visual snapshot tests for the cross-reference sections to prevent unintentional regressions in layout

**Won't Have (this iteration)**
- User-facing "add to group" or "suggest related repo" interactions — read-only display only

## Depends on

- [P04T07](task-P04T07-related-loader-ts.md) — `related.ts` loader must be implemented before wiring
- [P04T08](task-P04T08-groups-loader-ts.md) — `groups.ts` loader must be implemented before wiring

## Context

_Minimum reads before starting:_

- `../../../knowledge-base/toolchain.md` — VitePress data loader wiring pattern
- `../../../knowledge-base/architecture.md` — repo page template structure

## Status
pending

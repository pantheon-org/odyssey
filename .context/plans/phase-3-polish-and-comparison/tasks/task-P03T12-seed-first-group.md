# P03T12 — Seed fixture repos + first group in `groups.yaml`

## Goal
Create deterministic fixture repos and seed the first real comparison group once
≥2 overlapping repos are evaluated.

## Files
- `docs/schema/groups.yaml`

## Implementation
- Establish fixture repos (or controlled test repos) with overlapping tags so the
  comparison pipeline has stable inputs.
- Prerequisite: ≥2 repos evaluated that share 2+ tags (group-discovery hint from
  P03T25 surfaces candidates).
- Add a group entry: `id`, `label`, `description`, `members: [owner/repo, ...]`.
- Commit to `main` via PR — this push triggers `compare.yml` automatically.

## References
- `../../../knowledge-base/compare-rankings.md` — groups.yaml schema, seeding strategy
- `adr/015-compare-rankings.md` — comparison page rationale

## Verification
```sh
bun -e "import { parse } from 'yaml'; import { readFileSync } from 'fs'; const g = parse(readFileSync('docs/schema/groups.yaml', 'utf8')); console.log(g.groups.length > 0 ? 'seeded' : 'empty')"
```

## Acceptance Criteria
- [ ] `groups.yaml` contains at least one group entry with valid `id`, `label`, `description`, and `members[]`
- [ ] All repos listed in `members[]` have existing evaluated pages in `docs/repos/`
- [ ] The seeded group's members share at least 2 tags (prerequisite for meaningful comparison)
- [ ] Committing `groups.yaml` via a PR and merging to `main` triggers `compare.yml`

## Definition of Done

**Must Have**
- [ ] `groups.yaml` contains at least one group entry with valid `id`, `label`, `description`, and `members[]`
- [ ] All repos in `members[]` have existing evaluated pages in `docs/repos/`
- [ ] Merging the PR containing the seeded group triggers `compare.yml`

**Should Have**
- [ ] All acceptance criteria pass, including the shared-tags prerequisite (≥2 tags shared among members)

**Could Have**
- [ ] A short comment in `groups.yaml` documenting why the first group was chosen and which shared tags qualified it

**Won't Have (this iteration)**
- Automated group-candidate discovery tooling — the group-discovery hint from P03T26 surfaces candidates but manual curation is the process

## Depends on

- [P03T09](task-P03T09-compare-ts.md) — `scripts/compare.ts` must be runnable to generate the fixture comparison page
- [P03T10](task-P03T10-compare-workflow.md) — `compare.yml` must be merged so the fixture group triggers correctly
- [P03T11](task-P03T11-extend-review-workflow.md) — `review.yml` must handle compare branches before the fixture PR can auto-merge

## Context

_Minimum reads before starting:_

- `../../../knowledge-base/architecture.md` — fixture repo pattern and groups.yaml structure

## Status
pending

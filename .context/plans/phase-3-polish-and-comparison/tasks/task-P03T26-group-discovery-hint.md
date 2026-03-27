# P03T26 — Group-discovery hint in `evaluate.ts`

## Goal
After evaluating a repo, post a comment on the PR if it shares ≥2 tags with
any existing group's members.

## Files
- `scripts/evaluate.ts` (extend existing P01T09 file)

## Implementation
- After writing the repo page, check `groups.yaml` for groups whose members
  share ≥2 tags with the newly evaluated repo.
- If found, post a PR comment listing the matching groups as curation candidates.
- Uses GitHub REST API `POST /repos/.../issues/<pr-number>/comments`.
- No new workflow step needed — runs at the end of the existing evaluate workflow.

## References
- `../../../knowledge-base/compare-rankings.md` — group-discovery hint design
- `adr/015-compare-rankings.md` — comparison groups curation

## Verification
```sh
# Evaluate a repo that shares tags with an existing group member
gh workflow run evaluate.yml -f repo=owner/repo-with-shared-tags
# Expect: PR comment listing candidate groups
```

## Acceptance Criteria
- [ ] Evaluating a repo that shares ≥2 tags with any existing group member posts a PR comment listing the matching group names
- [ ] Evaluating a repo with fewer than 2 shared tags with any group member posts no comment
- [ ] Comment is posted on the evaluation PR (not as a separate issue)
- [ ] No new workflow step is required — hint runs at the end of the existing evaluate workflow

## Definition of Done

**Must Have**
- [ ] Evaluating a repo that shares ≥2 tags with any existing group member posts a PR comment listing the matching group names
- [ ] Evaluating a repo with fewer than 2 shared tags with any group member posts no comment

**Should Have**
- [ ] All acceptance criteria pass, including the comment appearing on the evaluation PR (not a separate issue) and no new workflow step being required

**Could Have**
- [ ] Comment includes direct links to the candidate group's comparison and ranking pages

**Won't Have (this iteration)**
- Automated group creation from the discovery hint — manual curation of `groups.yaml` remains the process

## Status
pending

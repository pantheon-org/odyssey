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
- `compare-rankings.md` — group-discovery hint design
- `adr/015-compare-rankings.md` — comparison groups curation

## Verification
```sh
# Evaluate a repo that shares tags with an existing group member
gh workflow run evaluate.yml -f repo=owner/repo-with-shared-tags
# Expect: PR comment listing candidate groups
```

## Status
pending

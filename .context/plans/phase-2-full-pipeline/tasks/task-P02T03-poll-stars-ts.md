# P02T03 — `scripts/poll-stars.ts`

## Goal
Detect newly starred repos since the last cursor, deduplicate, and open a
`pending-evaluation` issue for each new repo.

## Files
- `scripts/poll-stars.ts`

## Implementation
- Read `LIST_OWNER` and `LIST_NAME` from environment (set in `poll-stars.yml`).
- Query the GitHub **GraphQL API** for `user(login: LIST_OWNER).lists` — filter nodes
  where `name` matches `LIST_NAME` (case-insensitive) — paginate repositories via
  `pageInfo.endCursor` until all pages are consumed.
- No timestamp cursor — the full list is fetched on every run (see ADR-022).
- Dedup: search existing `Evaluate: owner/repo` issues before creating — see ADR-009.
- Create one GitHub Issue per new repo with label `pending-evaluation`.
- `--dry-run` flag: fetch + diff but do not create issues — see ADR-018.

## TDD
Write `scripts/poll-stars.test.ts` collocated **before** implementing.
- List filter: only repos in the matching list name → returned; other list names → excluded
- Pagination: multiple pages of list repos → all collected before dedup
- Dedup: existing issue found for repo → no new issue created
- Dedup: no existing issue → issue would be created
- `--dry-run`: no write operations executed, exits 0
- Missing list: `LIST_NAME` not found among owner's lists → exits non-zero with clear error

## References
- `adr/022-github-list-intake.md` — GitHub List as intake source (replaces ADR-001 star polling)
- `adr/009-deduplication.md` — issue dedup via search before create
- `../../../knowledge-base/workflows.md` — poll-stars.yml trigger chain

## Verification
```sh
bun scripts/poll-stars.ts --dry-run
echo $?  # 0 = ran without error
```

## Acceptance Criteria
- [ ] `--dry-run` exits 0 without creating any GitHub issues
- [ ] Repos in the matching `LIST_NAME` list are returned; repos in other lists are excluded
- [ ] All pages of a multi-page list are collected before deduplication
- [ ] Existing `Evaluate: owner/repo` issue prevents a duplicate issue from being created
- [ ] Missing `LIST_NAME` among the owner's lists causes non-zero exit with a descriptive error
- [ ] All TDD cases pass (`bun test scripts/poll-stars.test.ts` exits 0)

## Definition of Done

**Must Have**
- [ ] `scripts/poll-stars.ts` exists and fetches all pages of the GitHub List via GraphQL, deduplicates against existing issues, and creates one `pending-evaluation` issue per new repo
- [ ] `--dry-run` flag exits 0 without creating any GitHub issues
- [ ] Missing `LIST_NAME` causes non-zero exit with a descriptive error message

**Should Have**
- [ ] All TDD cases pass (`bun test scripts/poll-stars.test.ts` exits 0), covering list filter, pagination, dedup, dry-run, and missing-list scenarios

**Could Have**
- [ ] Improved error messages that include the list of available list names when `LIST_NAME` is not found

**Won't Have (this iteration)**
- Timestamp-based cursor advancement — the full-list fetch strategy (ADR-022) replaces it and is out of scope

## Status
pending

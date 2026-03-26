# P02T03 — `scripts/poll-stars.ts`

## Goal
Detect newly starred repos since the last cursor, deduplicate, and open a
`pending-evaluation` issue for each new repo.

## Files
- `scripts/poll-stars.ts`

## Implementation
- Read cursor from `.github/data/last-starred.txt`.
- `GET /users/thoroc/starred?per_page=100&sort=created&direction=desc` — paginate
  until cursor is reached.
- Dedup: search existing issues before creating — see ADR-009.
- Create one GitHub Issue per new repo with label `pending-evaluation`.
- Update cursor file with the newest star timestamp after successful run.
- `--dry-run` flag: fetch + diff but do not create issues or update cursor — see ADR-018.

## TDD
Write `scripts/poll-stars.test.ts` collocated **before** implementing.
- Cursor diff: repos newer than cursor → returned; repos at or before cursor → excluded
- Dedup: existing issue found for repo → no new issue created
- Dedup: no existing issue → issue would be created
- `--dry-run`: no write operations executed, exits 0

## References
- `adr/001-trigger-mechanism.md` — polling approach
- `adr/009-deduplication.md` — issue dedup via search before create
- `workflows.md` — poll-stars.yml trigger chain

## Verification
```sh
bun scripts/poll-stars.ts --dry-run
echo $?  # 0 = ran without error
```

## Status
pending

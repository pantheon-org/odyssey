# P03T27 — `scripts/quarterly-check.ts`

## Goal
Scan all evaluated repos for material changes; open `pending-re-evaluation` issues
for repos that have changed significantly.

## Files
- `scripts/quarterly-check.ts`

## Implementation
- Read all `docs/repos/*.md` frontmatter to get the list of evaluated repos and
  their `evaluated_at` timestamps (no GitHub API calls at this stage).
- For each repo, `GET /repos/{owner}/{repo}` to fetch current stats — concurrency
  capped at `p-limit(5)` — see `../../../knowledge-base/toolchain.md`.
- Material-change heuristics: star count delta ≥ 20%, description changed,
  archived status changed, null-safe version comparison for schema drift safety net.
- Dedup before creating issues — see ADR-009.
- `--dry-run` flag: fetch + diff but do not create issues — see ADR-018.

## TDD
Write `scripts/quarterly-check.test.ts` collocated **before** implementing.
- Star delta ≥20% → triggers re-evaluation; <20% → does not
- Description changed → triggers re-evaluation
- Archived flag changed → triggers re-evaluation
- No change across all signals → no issue
- `null` `version_at_eval` → skips major-version comparison safely
- Concurrency: assert `p-limit(5)` means ≤5 simultaneous mock API calls

## References
- `adr/006-re-evaluation-cadence.md` — material-change heuristics definition
- `adr/009-deduplication.md` — issue dedup
- `adr/018-testing-strategy.md` — `--dry-run`
- `../../../knowledge-base/toolchain.md` — `p-limit(5)` usage

## Verification
```sh
bun scripts/quarterly-check.ts --dry-run
echo $?  # 0 = ran without error
```

## Acceptance Criteria
- [ ] `--dry-run` exits 0 without creating any issues
- [ ] A repo with a star count delta ≥20% since evaluation is flagged for re-evaluation
- [ ] A repo with a star count delta <20% is not flagged
- [ ] A repo whose description changed since evaluation is flagged
- [ ] A repo whose archived status changed is flagged
- [ ] A `pending-re-evaluation` issue already open for a repo prevents a duplicate
- [ ] At most 5 simultaneous GitHub API calls are in flight at any time (`p-limit(5)`)
- [ ] All TDD cases pass (`bun test scripts/quarterly-check.test.ts` exits 0)

## Status
pending

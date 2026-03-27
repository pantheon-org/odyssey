# P03T29 — `scripts/schema-sync.ts`

## Goal
Scan all evaluated pages for `schema_version` mismatches and open
`pending-re-evaluation` issues for stale pages.

## Files
- `scripts/schema-sync.ts`

## Implementation
- Read current `schema_version` from `classification.yaml`.
- Scan all `docs/repos/*.md` frontmatter; collect repos where
  `frontmatter.schema_version !== current`.
- Create `pending-re-evaluation` issues for mismatched repos.
- Issue creation concurrency: `p-limit(5)` — see ADR-019.
- Dedup: search before create — see ADR-009.
- `--dry-run` flag: scan + diff but do not create issues — see ADR-018.

## TDD
Write `scripts/schema-sync.test.ts` collocated **before** implementing.
- Version mismatch → repo collected for re-evaluation issue
- Version match → repo skipped
- Empty repos directory → exits 0, no issues
- `p-limit(5)` throttle: ≤5 concurrent issue-creation calls

## References
- `adr/012-classification-evolution.md` — schema_version versioning policy
- `adr/019-schema-sync-throttling.md` — p-limit(5) for issue creation
- `adr/009-deduplication.md` — issue dedup

## Verification
```sh
bun scripts/schema-sync.ts --dry-run
echo $?  # 0 = ran without error
```

## Acceptance Criteria
- [ ] `--dry-run` exits 0 without creating any issues
- [ ] Repo pages with `schema_version` different from the current `classification.yaml` version are collected for re-evaluation
- [ ] Repo pages with a matching `schema_version` are skipped
- [ ] An empty `docs/repos/` directory exits 0 without error
- [ ] An already-open `pending-re-evaluation` issue prevents a duplicate from being created
- [ ] At most 5 simultaneous issue-creation calls are in flight (`p-limit(5)`)
- [ ] All TDD cases pass (`bun test scripts/schema-sync.test.ts` exits 0)

## Definition of Done

**Must Have**
- [ ] `bun scripts/schema-sync.ts --dry-run` exits 0 without creating any issues
- [ ] Repo pages with a mismatched `schema_version` are collected for re-evaluation; pages with a matching version are skipped
- [ ] An already-open `pending-re-evaluation` issue prevents a duplicate from being created

**Should Have**
- [ ] All TDD cases pass (`bun test scripts/schema-sync.test.ts` exits 0), including empty-repos-directory and `p-limit(5)` throttle cases

**Could Have**
- [ ] `--dry-run` output lists all mismatched repos with their stored vs current `schema_version` values

**Won't Have (this iteration)**
- Automatic page re-generation without human review — issues are created to trigger the existing evaluation workflow

## Status
pending

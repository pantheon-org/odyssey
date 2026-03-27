# P03T08 — `scripts/validate-compare.ts`

## Goal
Validate a comparison page: Ajv frontmatter check + body section check against
`compare-template.yaml`.

## Files
- `scripts/validate-compare.ts`

## Implementation
- CLI: `bun scripts/validate-compare.ts <file>` → exit 0 or 1 + errors.
- Mirrors `validate-page.ts` pattern; uses `compare-page.schema.json` and
  `compare-template.yaml`.
- `--dry-run` flag — see ADR-018.

## TDD
Write `scripts/validate-compare.test.ts` collocated **before** implementing.
- Valid compare frontmatter + all required sections → exit 0
- Missing `members` field → exit 1
- Missing required section (e.g. "Recommendation") → exit 1
- `--dry-run` with invalid page → logs errors but exits 0

## Depends on
- P03T07 — reads `docs/schema/compare-page.schema.json` for Ajv; file must be committed before this script runs
  - Expected frontmatter fields: `group_id`, `group_label`, `members[]`, `generated_at`, `model_id`, `schema_version`
- P03T06 — reads `docs/schema/compare-template.yaml` for required section names
  - Required sections: "Summary table", "Recommendation", "Comparison"

## References
- `adr/008-response-validation.md` — Ajv validation approach
- `compare-rankings.md` — compare page schema

## Verification
```sh
bun scripts/validate-compare.ts docs/compare/example-group.md
echo $?  # 0 = valid
```

## Status
pending

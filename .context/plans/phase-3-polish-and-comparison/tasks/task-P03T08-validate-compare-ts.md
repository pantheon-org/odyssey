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

- [P03T07](task-P03T07-extend-generate-schema-ts.md) — `docs/schema/compare-page.schema.json` must be generated and committed
- [P03T06](task-P03T06-compare-template-yaml.md) — `docs/schema/compare-template.yaml` must exist

## References
- `adr/008-response-validation.md` — Ajv validation approach
- `../../../knowledge-base/compare-rankings.md` — compare page schema

## Verification
```sh
bun scripts/validate-compare.ts docs/compare/example-group.md
echo $?  # 0 = valid
```

## Acceptance Criteria
- [ ] Valid compare page (correct frontmatter + all required sections) exits 0
- [ ] Page missing `members` field exits 1 with a descriptive error
- [ ] Page missing "Recommendation" section exits 1 with the section name in the error output
- [ ] `--dry-run` with an invalid page exits 0 but prints all validation errors
- [ ] All TDD cases pass (`bun test scripts/validate-compare.test.ts` exits 0)

## Definition of Done

**Must Have**
- [ ] `bun scripts/validate-compare.ts <file>` exits 0 for a valid compare page and exits 1 for missing `members` field or missing required section
- [ ] `--dry-run` with an invalid page exits 0 but prints all validation errors

**Should Have**
- [ ] All TDD cases pass (`bun test scripts/validate-compare.test.ts` exits 0)

**Could Have**
- [ ] Error output includes the line number or section context where the validation failure occurred

**Won't Have (this iteration)**
- Auto-fix mode that inserts missing sections — validation-only is the intended scope

## Context

_Minimum reads before starting:_

- `../../../knowledge-base/toolchain.md` — Ajv validation approach
- `../../../knowledge-base/architecture.md` — compare page frontmatter fields

## Status
pending

# P01T09 — `scripts/validate-page.ts`

## Goal
Validate a repo page: Ajv frontmatter check against JSON Schema + body section
check against `page-template.yaml`.

## Files
- `scripts/validate-page.ts`

## Implementation
- CLI: `bun scripts/validate-page.ts <file>` → exit 0 (valid) or 1 + error list.
- Frontmatter: parse YAML front matter, validate with Ajv against
  `docs/schema/repo-page.schema.json`.
- Body: parse headings, assert all required sections from `page-template.yaml`
  are present; assert `min_content_length` threshold is met.
- `--dry-run` flag: report errors but always exit 0 — see ADR-018.

## TDD
Write `scripts/validate-page.test.ts` collocated **before** implementing.
- Valid frontmatter + all required sections → exit 0
- Missing dimension score → exit 1 with descriptive error
- `min_content_length` not met → exit 1
- Missing required body section → exit 1
- `--dry-run` with invalid page → logs errors but exits 0

## References
- `adr/008-response-validation.md` — Ajv validation approach
- `adr/018-testing-strategy.md` — `--dry-run` flag requirement
- `site-structure.md` — frontmatter schema, page body template

## Verification
```sh
bun scripts/validate-page.ts docs/repos/example.md
echo $?  # 0 = valid
```

## Status
pending

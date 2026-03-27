# P01T06 — `scripts/generate-schema.ts`

## Goal
Emit `docs/schema/repo-page.schema.json` from the Zod schema; wire `generate:schema`
and `check:schema` npm scripts.

## Files
- `scripts/generate-schema.ts`
- `docs/schema/repo-page.schema.json` (generated artefact — commit to repo)
- `package.json` (add `generate:schema`, `check:schema` scripts)

## Implementation
- `generate:schema`: runs `generate-schema.ts`, writes JSON Schema file.
- `check:schema`: regenerates in-memory, diffs against committed file — exits 1
  if stale (enforces parity in CI). See ADR-017.
- At Phase 1 scope, only `repo-page.schema.json`; Phase 3 extends this script
  to also emit `compare-page.schema.json`.

## TDD
Write `scripts/generate-schema.test.ts` collocated **before** implementing.
- Running `generate:schema` produces a JSON Schema that validates a known-valid frontmatter object
- Stale committed schema → `check:schema` exits 1; fresh schema → exits 0

## Depends on
- P01T05 — imports `buildSchemas()` from `scripts/schema.ts` to get the JSON Schema object to serialize

## Produces
- `docs/schema/repo-page.schema.json` (committed artefact) — consumed by P01T09 (validate-page.ts) for Ajv frontmatter validation
- `package.json` scripts `generate:schema` and `check:schema` — used in CI (ADR-017) and extended by P03T07

## References
- `adr/017-schema-drift-ci.md` — `check:schema` CI enforcement
- `classification.md` — schema versioning

## Verification
```sh
bun run generate:schema
bun run check:schema
echo $?  # must be 0
```

## Status
pending

# P03T07 — Extend `scripts/generate-schema.ts`

## Goal
Extend the schema generator to also emit `docs/schema/compare-page.schema.json`.

## Files
- `scripts/generate-schema.ts` (extend existing P01T05 file)
- `docs/schema/compare-page.schema.json` (generated artefact — commit)

## Implementation
- Add `buildCompareSchema()` alongside existing `buildRepoPageSchema()`.
- Compare page frontmatter: `group_id`, `group_label`, `members[]`, `generated_at`,
  `model_id`, `schema_version` — see `compare-rankings.md`.
- `generate:schema` script now emits both JSON Schema files.
- `check:schema` script checks both files for drift — see ADR-017.

## Depends on
- P01T06 — extends `scripts/generate-schema.ts`; must understand the existing `buildRepoPageSchema()` pattern before adding `buildCompareSchema()` alongside it
- P03T05 — `members[]` in the compare schema maps to the `groups.yaml` `members[]` shape (array of `owner/repo` strings)

## Produces
- `docs/schema/compare-page.schema.json` (committed artefact) — consumed by P03T08 (validate-compare.ts) for Ajv frontmatter validation
  - Frontmatter fields: `group_id` (string), `group_label` (string), `members[]` (string[]), `generated_at` (ISO datetime string), `model_id` (string), `schema_version` (string)

## References
- `compare-rankings.md` — compare page frontmatter schema
- `adr/017-schema-drift-ci.md` — `check:schema` must cover both schemas

## Verification
```sh
bun run generate:schema
test -f docs/schema/compare-page.schema.json && echo "ok"
bun run check:schema && echo "schemas in sync"
```

## Status
pending

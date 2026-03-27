# P03T07 — Extend `scripts/generate-schema.ts`

## Goal
Extend the schema generator to also emit `docs/schema/compare-page.schema.json`.

## Files
- `scripts/generate-schema.ts` (extend existing P01T05 file)
- `docs/schema/compare-page.schema.json` (generated artefact — commit)

## Implementation
- Add `buildCompareSchema()` alongside existing `buildRepoPageSchema()`.
- Compare page frontmatter: `group_id`, `group_label`, `members[]`, `generated_at`,
  `model_id`, `schema_version` — see `../../../knowledge-base/compare-rankings.md`.
- `generate:schema` script now emits both JSON Schema files.
- `check:schema` script checks both files for drift — see ADR-017.

## Depends on

- [P03T05](task-P03T05-groups-yaml.md) — `docs/schema/groups.yaml` schema shape must be finalised before extending the generator

## Produces
- `docs/schema/compare-page.schema.json` (committed artefact) — consumed by P03T08 (validate-compare.ts) for Ajv frontmatter validation
  - Frontmatter fields: `group_id` (string), `group_label` (string), `members[]` (string[]), `generated_at` (ISO datetime string), `model_id` (string), `schema_version` (string)

## References
- `../../../knowledge-base/compare-rankings.md` — compare page frontmatter schema
- `adr/017-schema-drift-ci.md` — `check:schema` must cover both schemas

## Verification
```sh
bun run generate:schema
test -f docs/schema/compare-page.schema.json && echo "ok"
bun run check:schema && echo "schemas in sync"
```

## Acceptance Criteria
- [ ] `bun run generate:schema` emits both `repo-page.schema.json` and `compare-page.schema.json`
- [ ] `bun run check:schema` exits 0 when both committed schemas are fresh
- [ ] Stale `compare-page.schema.json` causes `bun run check:schema` to exit 1
- [ ] `compare-page.schema.json` includes fields: `group_id`, `group_label`, `members`, `generated_at`, `model_id`, `schema_version`
- [ ] Existing `repo-page.schema.json` generation is unaffected

## Definition of Done

**Must Have**
- [ ] `bun run generate:schema` emits both `repo-page.schema.json` and `compare-page.schema.json`
- [ ] `compare-page.schema.json` includes all required fields: `group_id`, `group_label`, `members`, `generated_at`, `model_id`, `schema_version`
- [ ] `bun run check:schema` exits 0 when both committed schemas are fresh; exits 1 when `compare-page.schema.json` is stale

**Should Have**
- [ ] All acceptance criteria pass, including the regression check that existing `repo-page.schema.json` generation is unaffected

**Could Have**
- [ ] Inline JSDoc on `buildCompareSchema()` documenting the frontmatter fields it emits

**Won't Have (this iteration)**
- Automatic schema publishing to an external registry — committed JSON Schema files in the repo are sufficient

## Context

_Minimum reads before starting:_

- `../../../knowledge-base/toolchain.md` — Zod + JSON Schema generation approach
- `../../../knowledge-base/classification.md` — schema versioning

## Status
pending

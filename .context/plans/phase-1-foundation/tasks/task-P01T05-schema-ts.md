# P01T05 — `scripts/schema.ts`

## Goal
Implement `buildSchemas()` — generates dynamic Zod schemas from the loaded
`Classification` object.

## Files
- `scripts/schema.ts`

## Implementation
- `buildSchemas(c: Classification): { repoPageSchema: ZodObject, ... }`.
- Frontmatter schema: all dimension scores (1–5 integers), `category` enum,
  `verdict` enum, `tags` array, `model_id` string — see ADR-014.
- `schema_version` field derived from `classification.yaml` `version` field.
- Export both the Zod schema and a JSON Schema (via `zod-to-json-schema` or
  equivalent) for Ajv consumption in `validate-page.ts`.

## TDD
Write `scripts/schema.test.ts` collocated **before** implementing.
- Valid classification → Zod schema contains all dimension keys
- Score range 1–5 enforced (0 and 6 fail validation)
- Extra fields rejected
- `model_id` and `schema_version` fields present

## Depends on
- P01T04 — imports `loadClassification` and `Classification` type from `scripts/classification.ts`

## Produces
- `scripts/schema.ts` — exports `buildSchemas(c: Classification)`
  - Returns `{ repoPageSchema: ZodObject, repoPageJsonSchema: JSONSchema }`
  - `repoPageSchema` (Zod) — consumed by P01T10 (evaluate.ts) for LLM response validation
  - `repoPageJsonSchema` (plain object) — consumed by P01T06 to serialize to `repo-page.schema.json`
  - Schema fields: one integer (1–5) per `dimension.id`, `category` enum, `verdict` enum, `tags[]`, `enterprise_use` enum, `risk_flags[]`, `model_id` string, `schema_version` string

## Context

_Minimum reads before starting:_

- `../../../knowledge-base/classification.md` — frontmatter field list
- `../../../.context/adr/014-model-provenance.md` — `model_id` requirement
- `../../../.context/adr/008-response-validation.md` — Zod + JSON Schema + Ajv strategy

## References
- `../../../knowledge-base/classification.md` — frontmatter field list
- `adr/014-model-provenance.md` — `model_id` requirement
- `adr/008-response-validation.md` — Zod + JSON Schema + Ajv strategy

## Verification
```sh
bun -e "import { buildSchemas } from './scripts/schema.ts'; import { loadClassification } from './scripts/classification.ts'; const s = buildSchemas(loadClassification()); console.log(Object.keys(s))"
```

## Acceptance Criteria
- [ ] `buildSchemas()` returns both `repoPageSchema` (Zod object) and `repoPageJsonSchema` (plain object)
- [ ] Zod schema rejects dimension scores `< 1` and `> 5`; accepts `1` through `5`
- [ ] Zod schema rejects objects with extra fields not in the classification
- [ ] `model_id` and `schema_version` fields are present in the schema
- [ ] All TDD cases pass (`bun test scripts/schema.test.ts` exits 0)

## Status
pending

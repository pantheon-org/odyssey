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

## References
- `classification.md` — frontmatter field list
- `adr/014-model-provenance.md` — `model_id` requirement
- `adr/008-response-validation.md` — Zod + JSON Schema + Ajv strategy

## Verification
```sh
bun -e "import { buildSchemas } from './scripts/schema.ts'; import { loadClassification } from './scripts/classification.ts'; const s = buildSchemas(loadClassification()); console.log(Object.keys(s))"
```

## Status
pending

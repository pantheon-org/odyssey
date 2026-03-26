# ADR-008: LLM Response Validation

**Status**: Accepted
**Date**: 2026-03-25

## Context

LLM responses can be malformed, missing fields, or out of range even with `response_format: { type: 'json_object' }`. Writing a bad response to the repo would create broken pages and silent data corruption.

## Decision

Two-layer validation:

1. **Runtime (evaluate.ts)**: `ClassificationSchema` built dynamically from `classification.yaml` via `buildSchemas()` in `scripts/schema.ts`. Parsed with Zod — throws on any violation before `writePage()` is called. Retried up to 3 times with 5 s back-off on non-2xx or parse failure.

2. **CI gate (review.yml)**: `validate-page.ts` validates the committed frontmatter against the static `docs/schema/repo-page.schema.json` (generated from `PageFrontmatterSchema` via `zod-to-json-schema`) using Ajv. This catches any drift between what `evaluate.ts` wrote and what the schema expects.

## Consequences

- Pages are never committed with invalid frontmatter
- The Zod → JSON schema pipeline (`scripts/generate-schema.ts`, `bun run generate:schema`) must be re-run and committed whenever `classification.yaml` changes
- `docs/schema/repo-page.schema.json` is a committed artefact; it must not be edited by hand
- Ajv is a dev dependency used only in CI; it does not ship to the VitePress site

# ADR-011: Schema Format for Page Validation

**Status**: Accepted
**Date**: 2026-03-25

## Context

Page validation in `review.yml` needs to check frontmatter correctness and body structure. Options:

- **Hardcode checks in `validate-page.ts`** — brittle; every schema change requires a code change
- **Markdown template file** — human-readable but hard to parse programmatically; no type enforcement
- **JSON Schema + YAML body rules** — machine-readable; toolchain-agnostic; separates frontmatter rules (JSON Schema) from body structure rules (YAML)

## Decision

Two files serve as the schema authority:

| File | Purpose |
|------|---------|
| `docs/schema/repo-page.schema.json` | JSON Schema for frontmatter — generated from `PageFrontmatterSchema` (Zod) via `zod-to-json-schema`; consumed by Ajv in `validate-page.ts` |
| `docs/schema/page-template.yaml` | Required body sections with `heading` and `min_content_length` rules; consumed by `validate-page.ts` at runtime |

`scripts/schema.ts` is the TypeScript source of truth. `scripts/generate-schema.ts` emits the JSON Schema. Both schema files are committed to the repo.

## Consequences

- The JSON Schema can be used by any JSON Schema-aware tool (IDE, linters, other CI steps) without the TypeScript toolchain
- `repo-page.schema.json` must never be edited by hand — it is a generated artefact
- `page-template.yaml` is human-editable; adding a required section requires only editing this file, not TypeScript
- Workflow: edit `classification.yaml` → run `bun run generate:schema` → commit both files together

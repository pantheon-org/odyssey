# ADR-012: Classification Evolution

**Status**: Amended
**Date**: 2026-03-25
**Amended**: 2026-03-25 — version bump semantics narrowed; see Amendment below

## Context

The initial set of scoring dimensions (maturity, maintenance, completeness, documentation, community) reflects a snapshot of what's useful today. New axes may emerge over time (e.g. security posture, AI/LLM relevance, licensing compatibility). Hardcoding dimensions in Zod schemas and prompt strings makes adding a new axis a multi-file, error-prone change.

Additionally, when the classification changes, existing evaluated pages become incomplete — they were scored against a different schema and are missing new dimensions.

## Decision

`docs/schema/classification.yaml` is the single source of truth for all scoring axes, categories, and verdicts. It carries a `version` field that must be bumped on every change.

All downstream artefacts are derived from this file:
- `scripts/schema.ts` → `buildSchemas()` generates Zod schemas dynamically
- `scripts/generate-schema.ts` → emits `docs/schema/repo-page.schema.json`
- `evaluate.ts` → `buildPrompt()` injects dimensions into the LLM prompt
- Page Scores table rows are generated from `classification.yaml` dimensions

Each committed page records `schema_version` in frontmatter. `schema-sync.yml` fires on every push that touches `classification.yaml` and creates `pending-re-evaluation` issues for all pages whose `schema_version` does not match the current version. `quarterly-check.ts` performs the same check as a safety net.

**Workflow for adding a new dimension**:
1. Add entry to `dimensions` in `classification.yaml`, bump `version`
2. `bun run generate:schema` → commit `classification.yaml` + `repo-page.schema.json` together
3. Push to `main` → `schema-sync.yml` fires → all existing pages queued for re-evaluation

## Consequences

- No hardcoded dimension names anywhere in scripts or workflows
- Re-evaluation is automatic and comprehensive on every `dimensions` change
- A large corpus will generate many re-evaluation issues at once on a dimension change; this is expected and handled by the existing evaluate/review/deploy pipeline

## Amendment

**Original**: "the `version` field must be bumped on every change" and "any change = bump = re-evaluate all."

**Revised**: `version` must be bumped only when `dimensions` change (add, remove, rename, or description update). Additive-only changes to `categories` or `verdicts` do **not** require a version bump and do not trigger re-evaluation.

**Rationale**: `category` is a descriptive label applied per-repo — adding a new valid value does not invalidate existing pages, which remain schema-valid under an expanded enum. `verdict` is similarly additive. Only `dimensions` changes affect the scoring structure that every page encodes; those pages must be re-evaluated to include new dimension scores.

**Operational rule** (see also `classification.md`):

| Change type | Bump `version`? | Re-evaluation triggered? |
|-------------|----------------|--------------------------|
| Add / remove / rename a `dimension` | Yes | Yes |
| Change a `dimension` description | Yes | Yes |
| Add a new `category` or `verdict` | No | No — run `bun run generate:schema` and commit only |
| Change a `category` or `verdict` label/description | No | No |

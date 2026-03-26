# ADR-010: Rationale Persistence

**Status**: Accepted
**Date**: 2026-03-25

## Context

The LLM returns score integers plus a `rationale` string for each dimension. Options for storing rationales:

- **Frontmatter only (integers)** — compact, queryable by VitePress; rationales lost
- **Frontmatter with rationale fields** — frontmatter becomes very large; rationale strings complicate schema validation
- **Markdown body (score table)** — rationales are human-readable in the rendered page; frontmatter stays clean with integers only

## Decision

Frontmatter stores **score integers only**. Rationales are written to the markdown body as a Scores table:

```markdown
## Scores

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Maturity | 4/5 | Stable API, used in production... |
| ...
```

Body structure is validated by `validate-page.ts` against `docs/schema/page-template.yaml`.

## Consequences

- Frontmatter integers are available for VitePress data queries (filtering, sorting, stats)
- Rationales are preserved in the rendered page and git history
- The Scores table rows are generated dynamically from `classification.yaml` dimensions by `evaluate.ts` — adding a dimension automatically adds a row

# Starred Repo Classifier — Index

This document has been decomposed. All content lives in the following files:

## Knowlege-base articles

| Document | Contents |
|----------|----------|
| [`architecture.md`](knowledge-base/architecture.md) | Pipeline diagrams, component map, cross-workflow trigger chain |
| [`classification.md`](knowledge-base/classification.md) | `classification.yaml` design, schema versioning, dimension evolution |
| [`workflows.md`](knowledge-base/workflows.md) | All six GitHub Actions workflows (YAML, steps, secrets matrix) |
| [`site-structure.md`](knowledge-base/site-structure.md) | VitePress layout, frontmatter schema, page body template |
| [`toolchain.md`](knowledge-base/toolchain.md) | Bun, TypeScript, Biome, `package.json` scripts, `tsconfig.json` |
| [`compare-rankings.md`](knowledge-base/compare-rankings.md) | `groups.yaml` design, comparison page schema, ranking page schema, generation strategy |

## Implementation plan

| Document | Contents |
|----------|----------|
| [`implementation-plan.md`](plans/implementation-plan.md) | Phased delivery checklist, resolved decisions |

## Architecture Decision Records

| Document | Contents |
|----------|----------|
| [`001-trigger-mechanism.md`](adr/001-trigger-mechanism.md) | ADR: cron polling vs webhooks |
| [`002-llm-model-and-auth.md`](adr/002-llm-model-and-auth.md) | ADR: GitHub Models API + gpt-4o-mini |
| [`003-queue-persistence.md`](adr/003-queue-persistence.md) | ADR: GitHub Issues as queue |
| [`004-static-site-generator.md`](adr/004-static-site-generator.md) | ADR: VitePress |
| [`005-repository-location.md`](adr/005-repository-location.md) | ADR: pantheon-org/odyssey |
| [`006-re-evaluation-cadence.md`](adr/006-re-evaluation-cadence.md) | ADR: quarterly cron + material change heuristics |
| [`007-prompt-enrichment.md`](adr/007-prompt-enrichment.md) | ADR: pre-fetch repo data before LLM call |
| [`008-response-validation.md`](adr/008-response-validation.md) | ADR: Zod + JSON Schema + Ajv |
| [`009-deduplication.md`](adr/009-deduplication.md) | ADR: issue dedup via search before create |
| [`010-rationale-persistence.md`](adr/010-rationale-persistence.md) | ADR: integers in frontmatter, rationales in body |
| [`011-schema-format.md`](adr/011-schema-format.md) | ADR: JSON Schema from Zod + YAML body rules |
| [`012-classification-evolution.md`](adr/012-classification-evolution.md) | ADR: versioned `classification.yaml`, schema-sync workflow *(amended)* |
| [`013-evaluation-idempotency.md`](adr/013-evaluation-idempotency.md) | ADR: page-exists guard in `evaluate.ts` as third dedup layer |
| [`014-model-provenance.md`](adr/014-model-provenance.md) | ADR: `model_id` in frontmatter for model drift detection |
| [`015-compare-rankings.md`](adr/015-compare-rankings.md) | ADR: comparison pages (LLM-generated) vs ranking pages (data loaders); `groups.yaml` curation |
| [`016-compare-cascade-protection.md`](adr/016-compare-cascade-protection.md) | ADR: no-op fast exit + p-limit(3) in compare.ts during mass re-evaluation waves |
| [`017-schema-drift-ci.md`](adr/017-schema-drift-ci.md) | ADR: `check:schema` CI step enforces committed JSON schemas stay in sync with Zod |
| [`018-testing-strategy.md`](adr/018-testing-strategy.md) | ADR: Bun test runner for pure functions + `--dry-run` flag on all scripts |
| [`019-schema-sync-throttling.md`](adr/019-schema-sync-throttling.md) | ADR: p-limit(5) for issue creation in schema-sync.ts to prevent burst flooding |
| [`020-tag-vocabulary-model.md`](adr/020-tag-vocabulary-model.md) | ADR: controlled grouped flat tags in classification.yaml; starter vocabulary; evolution policy |

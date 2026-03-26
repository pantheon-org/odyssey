# Starred Repo Classifier — Index

This document has been decomposed. All content lives in the following files:

| Document | Contents |
|----------|----------|
| [`architecture.md`](architecture.md) | Pipeline diagrams, component map, cross-workflow trigger chain |
| [`classification.md`](classification.md) | `classification.yaml` design, schema versioning, dimension evolution |
| [`workflows.md`](workflows.md) | All six GitHub Actions workflows (YAML, steps, secrets matrix) |
| [`site-structure.md`](site-structure.md) | VitePress layout, frontmatter schema, page body template |
| [`toolchain.md`](toolchain.md) | Bun, TypeScript, Biome, `package.json` scripts, `tsconfig.json` |
| [`compare-rankings.md`](compare-rankings.md) | `groups.yaml` design, comparison page schema, ranking page schema, generation strategy |
| [`plans/implementation-plan.md`](plans/implementation-plan.md) | Phased delivery checklist, resolved decisions |
| [`adr/001-trigger-mechanism.md`](adr/001-trigger-mechanism.md) | ADR: cron polling vs webhooks |
| [`adr/002-llm-model-and-auth.md`](adr/002-llm-model-and-auth.md) | ADR: GitHub Models API + gpt-4o-mini |
| [`adr/003-queue-persistence.md`](adr/003-queue-persistence.md) | ADR: GitHub Issues as queue |
| [`adr/004-static-site-generator.md`](adr/004-static-site-generator.md) | ADR: VitePress |
| [`adr/005-repository-location.md`](adr/005-repository-location.md) | ADR: pantheon-org/odyssey |
| [`adr/006-re-evaluation-cadence.md`](adr/006-re-evaluation-cadence.md) | ADR: quarterly cron + material change heuristics |
| [`adr/007-prompt-enrichment.md`](adr/007-prompt-enrichment.md) | ADR: pre-fetch repo data before LLM call |
| [`adr/008-response-validation.md`](adr/008-response-validation.md) | ADR: Zod + JSON Schema + Ajv |
| [`adr/009-deduplication.md`](adr/009-deduplication.md) | ADR: issue dedup via search before create |
| [`adr/010-rationale-persistence.md`](adr/010-rationale-persistence.md) | ADR: integers in frontmatter, rationales in body |
| [`adr/011-schema-format.md`](adr/011-schema-format.md) | ADR: JSON Schema from Zod + YAML body rules |
| [`adr/012-classification-evolution.md`](adr/012-classification-evolution.md) | ADR: versioned `classification.yaml`, schema-sync workflow *(amended)* |
| [`adr/013-evaluation-idempotency.md`](adr/013-evaluation-idempotency.md) | ADR: page-exists guard in `evaluate.ts` as third dedup layer |
| [`adr/014-model-provenance.md`](adr/014-model-provenance.md) | ADR: `model_id` in frontmatter for model drift detection |
| [`adr/015-compare-rankings.md`](adr/015-compare-rankings.md) | ADR: comparison pages (LLM-generated) vs ranking pages (data loaders); `groups.yaml` curation |
| [`adr/016-compare-cascade-protection.md`](adr/016-compare-cascade-protection.md) | ADR: no-op fast exit + p-limit(3) in compare.ts during mass re-evaluation waves |
| [`adr/017-schema-drift-ci.md`](adr/017-schema-drift-ci.md) | ADR: `check:schema` CI step enforces committed JSON schemas stay in sync with Zod |
| [`adr/018-testing-strategy.md`](adr/018-testing-strategy.md) | ADR: Bun test runner for pure functions + `--dry-run` flag on all scripts |
| [`adr/019-schema-sync-throttling.md`](adr/019-schema-sync-throttling.md) | ADR: p-limit(5) for issue creation in schema-sync.ts to prevent burst flooding |
| [`adr/020-tag-vocabulary-model.md`](adr/020-tag-vocabulary-model.md) | ADR: controlled grouped flat tags in classification.yaml; starter vocabulary; evolution policy |

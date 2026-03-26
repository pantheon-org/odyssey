# Implementation Plan — Index

Refer to sibling documents for full detail on each area:

- [`../architecture.md`](../architecture.md) — pipeline diagrams, component map
- [`../classification.md`](../classification.md) — classification config, schema evolution
- [`../workflows.md`](../workflows.md) — all six GitHub Actions workflows
- [`../site-structure.md`](../site-structure.md) — VitePress layout, frontmatter schema, page template
- [`../toolchain.md`](../toolchain.md) — Bun, TypeScript, Biome, package scripts
- [`../adr/`](../adr/) — one ADR per architectural decision

---

## Testing strategy

- **TDD** for all implementation tasks: write the collocated test file *before* writing
  the source. Test files sit alongside their source (`scripts/foo.test.ts`, not in `__tests__/`).
- **BDD** for e2e acceptance: CucumberJS feature scenarios are written at the *start*
  of each phase, before implementation begins. Step definitions turn green as the pipeline
  is built. See `adr/018-testing-strategy.md`.

---

## Phases

| Phase | Goal | Tasks | Exit Criteria |
|-------|------|-------|---------------|
| [Phase 1 — Foundation](phase-1-foundation/README.md) | Working end-to-end evaluation, manually triggered | 15 | `bun test` + `cucumber @phase1` green; manual dispatch produces a published page |
| [Phase 2 — Full Pipeline](phase-2-full-pipeline/README.md) | Fully automated star-to-page pipeline with re-evaluation | 10 | `bun test` + `cucumber @phase2` green; starring produces a published page automatically |
| [Phase 3 — Polish and Comparison](phase-3-polish-and-comparison/README.md) | Improved UX, navigation, and cross-repo comparison | 26 | `bun test` + `cucumber @phase3` green; ranking and comparison pages live |

---

## Resolved Decisions

| Decision | ADR |
|----------|-----|
| Trigger mechanism (cron vs webhooks) | [ADR-001](../adr/001-trigger-mechanism.md) |
| LLM model and auth | [ADR-002](../adr/002-llm-model-and-auth.md) |
| Queue persistence (GitHub Issues) | [ADR-003](../adr/003-queue-persistence.md) |
| Static site generator (VitePress) | [ADR-004](../adr/004-static-site-generator.md) |
| Repository location | [ADR-005](../adr/005-repository-location.md) |
| Re-evaluation cadence | [ADR-006](../adr/006-re-evaluation-cadence.md) |
| Prompt enrichment (pre-fetch + README truncation) | [ADR-007](../adr/007-prompt-enrichment.md) |
| Response validation (Zod + Ajv) | [ADR-008](../adr/008-response-validation.md) |
| Issue deduplication | [ADR-009](../adr/009-deduplication.md) |
| Rationale persistence | [ADR-010](../adr/010-rationale-persistence.md) |
| Schema format | [ADR-011](../adr/011-schema-format.md) |
| Classification evolution | [ADR-012](../adr/012-classification-evolution.md) |
| Evaluation idempotency | [ADR-013](../adr/013-evaluation-idempotency.md) |
| Model provenance (`model_id`) | [ADR-014](../adr/014-model-provenance.md) |
| Comparison pages vs ranking pages | [ADR-015](../adr/015-compare-rankings.md) |
| Compare cascade protection | [ADR-016](../adr/016-compare-cascade-protection.md) |
| Schema drift CI (`check:schema`) | [ADR-017](../adr/017-schema-drift-ci.md) |
| Testing strategy (TDD + BDD + `--dry-run`) | [ADR-018](../adr/018-testing-strategy.md) |
| Schema-sync issue creation throttling | [ADR-019](../adr/019-schema-sync-throttling.md) |
| Tag vocabulary model | [ADR-020](../adr/020-tag-vocabulary-model.md) |

# Implementation Plan — Index

Refer to sibling documents for full detail on each area:

- [`../knowledge-base/architecture.md`](../knowledge-base/architecture.md) — pipeline diagrams, component map
- [`../knowledge-base/classification.md`](../knowledge-base/classification.md) — classification config, schema evolution
- [`../knowledge-base/workflows.md`](../knowledge-base/workflows.md) — all six GitHub Actions workflows
- [`../knowledge-base/site-structure.md`](../knowledge-base/site-structure.md) — VitePress layout, frontmatter schema, page template
- [`../knowledge-base/toolchain.md`](../knowledge-base/toolchain.md) — Bun, TypeScript, Biome, package scripts
- [`../adr/`](../adr/) — one ADR per architectural decision

---

## Testing strategy

- **TDD** for all implementation tasks: write the collocated test file *before* writing
  the source. Test files sit alongside their source (`scripts/foo.test.ts`, not in `__tests__/`).
- **BDD** for e2e acceptance: CucumberJS feature scenarios are written at the *start*
  of each phase, before implementation begins. Step definitions turn green as the pipeline
  is built. See `adr/018-testing-strategy.md`.
- **BDD CI scope**: BDD e2e scenarios interact with live GitHub via `gh` CLI and require
  `GH_PAT`. They are tagged `@integration` and run only on the `main` branch via the
  `integration` cucumber profile. The `default` profile (PR CI) runs unit tests only.
  See `P01T02` for the two-profile `cucumber.json` setup.
- **Integration-lite profile**: add a hermetic Cucumber profile for PR CI that uses a
  fixture repo (or mocked GitHub API) and deterministic test data. Live GitHub remains
  the `main`-branch gate; integration-lite provides repeatable signal earlier.

---

## Phases

| Phase | Goal | Tasks | Exit Criteria |
|-------|------|-------|---------------|
| [Phase 1 — Foundation](phase-1-foundation/README.md) | Working end-to-end evaluation, manually triggered | 16 | `bun test` + `cucumber @phase1` green; manual dispatch produces a published page |
| [Phase 2 — Full Pipeline](phase-2-full-pipeline/README.md) | Fully automated star-to-page pipeline | 6 | `bun test` + `cucumber @phase2` green; starring produces a published page automatically |
| [Phase 3a — Operational hygiene + comparison](phase-3-polish-and-comparison/README.md) | Hygiene scripts + cross-repo comparison pipeline | 17 | `bun test` + `cucumber @phase3a` green; quarterly-check/schema-sync dry-run pass; ≥1 comparison page live |
| [Phase 3b — Navigation + UX](phase-3-polish-and-comparison/README.md) | Tags, categories, cross-references, site UX | 13 | `bun run docs:build` passes; tag/category pages navigable; score cards render |

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

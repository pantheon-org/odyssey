# Phase 2 — Full Pipeline

**Goal:** Fully automated star-to-page pipeline.

**Exit criteria:** Starring a repo produces a published page with no manual intervention;
`bun test` passes; the Phase 2 Cucumber e2e scenario is green.

**Depends on:** Phase 1 complete (evaluate.yml, review.yml, deploy.yml all working).

**Note:** Operational hygiene scripts (`quarterly-check.ts`, `schema-sync.ts`) are deferred
to Phase 3 — they require a populated `docs/repos/` to be meaningful and are not on the
critical path for the automated pipeline.

---

## Testing approach

- **BDD first**: P02T02 (Phase 2 e2e feature) must be completed before P02T03
  (poll-stars.ts). The Cucumber scenario is the acceptance criterion for the phase.
- **TDD**: implementation task P02T03 has a collocated test file written *before* the
  source file. Red → green → refactor.

---

## Tasks

| ID | Task | Status |
|----|------|--------|
| [P02T01](tasks/task-P02T01-last-starred-cursor.md) | `actions/cache` cursor initialisation | pending |
| [P02T02](tasks/task-P02T02-phase2-bdd-feature.md) | **BDD: Phase 2 e2e feature + step definitions stub** | pending |
| [P02T03](tasks/task-P02T03-poll-stars-ts.md) | `scripts/poll-stars.ts` (TDD) | pending |
| [P02T04](tasks/task-P02T04-poll-stars-workflow.md) | `.github/workflows/poll-stars.yml` | pending |
| [P02T05](tasks/task-P02T05-verify-evaluate-trigger.md) | Verify `evaluate.yml` label trigger | pending |
| [P02T06](tasks/task-P02T06-e2e-test.md) | Run Phase 2 BDD scenarios | pending |

---

## Gate

```sh
bun test
# Phase gate — requires GH_PAT + live GitHub (main branch only, see P01T02 for CI limitations)
bunx cucumber-js --config cucumber.json --profile integration --tags "@phase2"
# Phase 2 scenario green; starring produces a published page automatically
```

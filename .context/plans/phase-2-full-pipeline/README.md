# Phase 2 — Full Pipeline

**Goal:** Fully automated star-to-page pipeline.

**Exit criteria:** Starring a repo produces a published page with no manual intervention;
`bun test` passes; the Phase 2 Cucumber e2e scenario is green.

**Depends on:** Phase 1 complete (evaluate.yml, review.yml, deploy.yml all working).

**Note:** Operational hygiene scripts (`quarterly-check.ts`, `schema-sync.ts`) are deferred
to Phase 3 — they require a populated `docs/repos/` to be meaningful and are not on the
critical path for the automated pipeline.

**Note:** Star automation prerequisites — the star-based pipeline depends on verified
PAT scopes and a dedicated test account. This research is captured in `P02T07` and
must be completed before the Phase 2 integration gate is reliable.

---

## Testing approach

- **BDD first**: P02T02 (Phase 2 e2e feature) must be completed before P02T03
  (poll-stars.ts). The Cucumber scenario is the acceptance criterion for the phase.
- **TDD**: implementation task P02T03 has a collocated test file written *before* the
  source file. Red → green → refactor.

---

## Tasks

Parallel waves — tasks in the same wave can be implemented concurrently in separate
worktrees (see AGENTS.md for the worktree pattern). A task cannot start until all its
dependencies are merged to `main`.

| ID | Task | Depends | Wave | Status |
|----|------|---------|------|--------|
| [P02T01](tasks/task-P02T01-last-starred-cursor.md) | `actions/cache` cursor initialisation | — | — | pending |
| [P02T02](tasks/task-P02T02-phase2-bdd-feature.md) | **BDD: Phase 2 e2e feature + step definitions stub** | — | 1 | pending |
| [P02T03](tasks/task-P02T03-poll-stars-ts.md) | `scripts/poll-stars.ts` (TDD) | — | 1 | pending |
| [P02T05](tasks/task-P02T05-verify-evaluate-trigger.md) | Verify `evaluate.yml` label trigger | — | 1 | pending |
| [P02T04](tasks/task-P02T04-poll-stars-workflow.md) | `.github/workflows/poll-stars.yml` | [P02T03](tasks/task-P02T03-poll-stars-ts.md) | 2 | pending |
| [P02T06](tasks/task-P02T06-e2e-test.md) | Run Phase 2 BDD scenarios | [P02T02](tasks/task-P02T02-phase2-bdd-feature.md), [P02T04](tasks/task-P02T04-poll-stars-workflow.md), [P02T05](tasks/task-P02T05-verify-evaluate-trigger.md) | 3 | pending |
| [P02T07](tasks/task-P02T07-star-test-harness.md) | Star automation test harness (test acct + fallback trigger) | [P02T02](tasks/task-P02T02-phase2-bdd-feature.md), [P02T04](tasks/task-P02T04-poll-stars-workflow.md) | 3 | pending |
| [P02T08](tasks/task-P02T08-branch-protection.md) | Enable branch protection after workflows stable | [P02T04](tasks/task-P02T04-poll-stars-workflow.md), [P02T05](tasks/task-P02T05-verify-evaluate-trigger.md) | 3 | pending |

---

## Gate

```sh
bun test
# Phase gate — requires GH_PAT + live GitHub (main branch only, see P01T02 for CI limitations)
bunx cucumber-js --config cucumber.json --profile integration --tags "@phase2"
# Phase 2 scenario green; starring produces a published page automatically
```

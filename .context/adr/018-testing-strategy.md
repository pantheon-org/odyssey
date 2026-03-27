# ADR-018: Testing Strategy

**Status**: Accepted (amended 2026-03-26 — added TDD, BDD, collocation)
**Date**: 2026-03-25

## Context

All scripts are designed to run inside GitHub Actions; they authenticate via secrets,
create GitHub resources, and call external APIs. This makes local iteration slow.
Additionally, there is no unit test coverage for pure-function logic (schema building,
prompt construction, frontmatter parsing, material-change heuristics), so regressions
are only detected when a full pipeline run produces a bad page.

## Decision

Three-level approach:

---

### Level 1 — TDD unit tests for pure functions (Bun built-in test runner)

**Test-Driven Development**: write the test file *before* writing the implementation.
Follow the red → green → refactor cycle on every implementation task.

**Collocation**: test files live alongside their source, not in a separate directory.

```
scripts/
  classification.ts
  classification.test.ts   ← collocated, not in __tests__/
  schema.ts
  schema.test.ts
  evaluate.ts
  evaluate.test.ts
  ...
```

Test only pure, side-effect-free functions. No mocking of GitHub API or external
services — those are out of scope for unit tests.

Functions to test (non-exhaustive):

| Function | Test file | Key cases |
|----------|-----------|-----------|
| `buildSchemas()` | `scripts/schema.test.ts` | Schema shape matches `classification.yaml`; score range 1–5 enforced; extra fields rejected |
| `loadClassification()` | `scripts/classification.test.ts` | Parses valid YAML; throws on missing required fields |
| Prompt builder | `scripts/evaluate.test.ts` | Dimensions injected; README truncated at last newline ≤ 4000 chars |
| Page renderer | `scripts/evaluate.test.ts` | Valid LLM response → correct frontmatter keys |
| `validate-page.ts` pure logic | `scripts/validate-page.test.ts` | Valid page exits 0; missing dimension exits 1; `min_content_length` not met exits 1 |
| Material-change heuristics | `scripts/quarterly-check.test.ts` | Star delta ≥20%, description change, archived flag each trigger; no-change does not |
| Issue dedup search | `scripts/poll-stars.test.ts` | Found → no create; not-found → create |
| Schema version mismatch | `scripts/schema-sync.test.ts` | Mismatch collected; match skipped |
| `validate-compare.ts` pure logic | `scripts/validate-compare.test.ts` | Valid compare page exits 0; missing section exits 1 |
| Group resolution | `scripts/compare.test.ts` | Member repo → group returned; non-member → empty; no-group → fast exit |

Run with `bun test`.

---

### Level 1.5 — Orchestration tests with mocked APIs

**Mock Service Worker (MSW)** or direct `fetch` mocking is used to test the orchestration
logic in `evaluate.ts`, `poll-stars.ts`, etc. This bridges the gap between pure
functions and live e2e tests.

These tests ensure:
- API responses are correctly parsed and passed to prompt builders
- Errors from GitHub API are handled (retries, issue labeling)
- File system writes are correctly orchestrated (using a temporary directory)

```
scripts/
  evaluate.orchestration.test.ts
  poll-stars.orchestration.test.ts
```

---

### Level 2 — `--dry-run` flag on all scripts

Each script accepts `--dry-run` (parsed from `process.argv`). In dry-run mode:

- All read operations execute normally
- All write operations log `[dry-run] would <action>: <details>` and are skipped
- Script exits 0

| Script | Suppressed writes |
|--------|-------------------|
| `evaluate.ts` | Branch creation, commit, PR, issue comment/label change |
| `poll-stars.ts` | Issue creation, cursor commit |
| `quarterly-check.ts` | Issue creation |
| `schema-sync.ts` | Issue creation |
| `compare.ts` | Branch creation, commit, PR |

---

### Level 3 — BDD e2e scenarios (CucumberJS)

**Behaviour-Driven Development**: write the `.feature` file *before* implementing
the pipeline. Step definitions are implemented incrementally; they turn green as
the pipeline is built. Rinse and repeat.

Feature files live in `features/`; step definitions in `features/step-definitions/`.

| Feature file | Covers | Tag |
|---|---|---|
| `features/evaluate.feature` | Manual dispatch → published page | `@phase1` |
| `features/poll-stars.feature` | Star → issue → page pipeline | `@phase2` |
| `features/compare.feature` | Group seeded → comparison page | `@phase3` |

Runner: `bunx cucumber-js --config cucumber.json`.

Long-running scenarios (polling GitHub Actions) are tagged `@slow` and can be
skipped for fast local feedback with `--tags "not @slow"`.

---

### What is explicitly out of scope

- Integration tests against live GitHub API (CI is the integration test)
- Snapshot testing of generated pages (schema validation in `review.yml` covers structural correctness)
- Mocking the full GitHub API surface (too brittle to be useful)

## Consequences

- TDD ensures pure-function regressions are caught before push
- BDD feature files serve as living documentation of pipeline behaviour
- Collocated tests are easier to find and maintain than a separate `__tests__/` directory
- `--dry-run` enables safe local exploration against real GitHub state
- Bun built-in test runner requires no additional test framework dependency

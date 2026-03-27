# `review.yml` — Validate and auto-merge

```yaml
on:
  pull_request:
    types: [opened, synchronize]
    branches: [main]

permissions:
  contents: write        # merge
  pull-requests: write   # post review comment, approve
```

Runs only on `eval/*`, `re-eval/*`, and `compare/*` branches.

**Steps**:
1. `bun install --frozen-lockfile`
2. `bun run lint` — Biome (TS/JS/JSON)
3. `bun run lint:md` — markdownlint-cli2
4. `bun run check:yaml` — parse-check all `.yaml`/`.yml`
5. `bun run check:schema` — regenerates JSON schemas in a temp directory and diffs against committed `docs/schema/repo-page.schema.json` and `docs/schema/compare-page.schema.json`; exits non-zero if stale. Runs unconditionally on all branches. See ADR-017.
6. Dispatch on branch prefix:
   - `eval/*` / `re-eval/*` → `bun scripts/validate-page.ts <changed-file>`
     - Validate frontmatter against `repo-page.schema.json` (Ajv)
     - Validate body sections against `page-template.yaml`
     - Verify file path matches `docs/repos/<owner>-<repo>.md`
   - `compare/*` → `bun scripts/validate-compare.ts <changed-file>`
     - Validate frontmatter against `compare-page.schema.json` (Ajv)
     - Validate body sections against `compare-template.yaml`
     - Verify file path matches `docs/compare/<group-slug>.md`
7. Post PR review comment with formatted summary
8. All checks pass → `gh pr merge --auto --squash`
9. **On validation failure**: post review comment with Ajv error details; exit non-zero (fails the required status check; PR stays open for inspection; no auto-merge)

> **Auto-merge trust boundary**: `review.yml` validates structural correctness (schema + body sections) only — it does not assert semantic quality. A hallucinated 5/5 across all dimensions will pass and auto-merge. This is intentional: `odyssey` is a personal curation tool; the human act of starring is the quality signal. The LLM provides structured scores and rationales for browsing, not a gating judgement. If you want human review before merge, remove `gh pr merge --auto` and approve PRs manually.

> **Prerequisite**: Branch protection on `main` must list this workflow's check as required. Set in Settings → Branches → Branch protection rules.

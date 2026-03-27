# `compare.yml` — Generate comparison pages

```yaml
on:
  push:
    branches: [main]
    paths:
      - 'docs/repos/**'
      - 'docs/schema/groups.yaml'
  workflow_dispatch:
    inputs:
      group_id:
        description: 'Specific group to regenerate (leave empty for all affected groups)'
        required: false

concurrency:
  group: compare
  cancel-in-progress: false   # queue regenerations; don't discard in-flight LLM calls

permissions:
  contents: write
  pull-requests: write
```

**Steps**:
1. `bun install --frozen-lockfile`
2. `bun run lint` — Biome (TS/JS/JSON)
3. `bun run lint:md` — markdownlint-cli2
4. `bun run check:yaml` — parse-check all `.yaml`/`.yml`
5. `bun scripts/compare.ts`
   - Read `docs/schema/groups.yaml`
   - Determine affected groups: from changed `docs/repos/` files (cross-reference group membership) or `dispatch` input; if `groups.yaml` changed, all groups are affected
   - **No-op fast exit**: if no groups are affected (changed repo is not a member of any group), exit 0 immediately — no API calls, no LLM calls. See ADR-016.
   - Skip any group with fewer than 2 repos that have evaluated pages
   - Use `p-limit(3)` to process up to 3 affected groups concurrently; each group:
     - Read all member repo pages from `docs/repos/` — extract frontmatter + body
     - Build comparison prompt: inject scores, summaries, tags, and verdicts for all members
     - Call GitHub Models API with up to 3 retries
     - Validate response structure in-process (compare-page schema + compare-template)
     - Write `docs/compare/<group-slug>.md` (frontmatter + Summary table + Recommendation + Comparison sections)
     - Commit to branch `compare/<group-slug>`, open PR via `GH_PAT`
   - **On error for a group**: log error details; continue with remaining groups. See ADR-016.

> **Cascade behaviour**: during a mass re-evaluation wave (e.g. schema-sync), `compare.yml` queues one run per merged eval PR. Runs where the changed repo belongs to no group are no-ops (< 1 s). Only runs where the repo is a group member incur LLM calls — capped at 3 concurrent groups per run, serialised across runs by the `concurrency: group: compare` block. See ADR-016.

> **Ranking pages are not generated here.** `docs/rankings/index.md` and `docs/rankings/<group>.md` are built by VitePress data loaders at `docs:build` time — always current, no committed file needed.

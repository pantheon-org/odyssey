# `quarterly-check.yml` — Detect material changes

```yaml
on:
  schedule:
    - cron: '0 9 1 1,4,7,10 *'   # 1st Jan, Apr, Jul, Oct 09:00 UTC
  workflow_dispatch:

permissions:
  issues: write
```

**Steps**:
1. `bun install --frozen-lockfile`
2. `bun run lint` — Biome (TS/JS/JSON)
3. `bun run lint:md` — markdownlint-cli2
4. `bun run check:yaml` — parse-check all `.yaml`/`.yml`
5. `bun scripts/quarterly-check.ts`
   - Load current `classification.yaml` version
   - Read all `docs/repos/*.md` frontmatter (synchronous, no API call)
   - Use `p-limit(5)` to cap concurrent GitHub API calls at 5; prevents secondary rate-limit errors on large corpora
   - For each page (up to 5 in parallel):
     - `GET /repos/<owner>/<repo>` — fetch `archived`, `pushed_at`, `stargazers_count`, latest release
     - Run material-change heuristics (see table below)
     - If triggered: dedup check, then create issue via `GH_PAT` with title `Re-evaluate: owner/repo`, label `pending-re-evaluation`, body:
       ```
       **Trigger**: <signal description, e.g. "Major version bump: v3.2.1 → v4.0.0">
       **Evaluated schema_version**: <schema_version from frontmatter>
       **Current classification.yaml version**: <current version>
       **Stars at eval**: <stars_at_eval> → **Current stars**: <stargazers_count>
       **URL**: https://github.com/<owner>/<repo>
       ```
   - Issues are created with `p-limit(5)` (same cap used for API reads)

**Material-change heuristics**:

| Signal | Threshold |
|--------|-----------|
| Major version bump | Latest tag major > `version_at_eval` major (skip if `version_at_eval` is null) |
| Archived | `archived: true` |
| Long dormancy | No commits in 12 months AND maintenance score was ≥ 3 |
| Revival | Commits resumed after 6+ months of silence |
| Stars surge | `stargazers_count` grew > 50% since `stars_at_eval` AND absolute growth > 50 stars |
| Schema drift | `schema_version` != current `classification.yaml` version |

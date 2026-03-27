# `poll-stars.yml` — Detect new starred repos

```yaml
on:
  schedule:
    - cron: '*/15 * * * *'
  workflow_dispatch:

concurrency:
  group: poll-stars
  cancel-in-progress: false   # queue, don't cancel — two concurrent polls would both miss each other's new issues

permissions:
  contents: write   # commit cursor file
  issues: write     # create pending-evaluation issues
```

> **Why serialise poll-stars?** GitHub Issues search index has a propagation lag of several seconds. Two concurrent runs both searching before the first create is indexed will both pass the dedup check and both create the same issue. Serialising eliminates this race at the source.

**Steps**:
1. `bun install --frozen-lockfile`
2. `bun run lint` — Biome (TS/JS/JSON)
3. `bun run lint:md` — markdownlint-cli2
4. `bun run check:yaml` — parse-check all `.yaml`/`.yml`
5. `bun scripts/poll-stars.ts`
   - Read cursor from `.github/data/last-starred.txt`
   - `GET /users/thoroc/starred?sort=created&direction=desc&per_page=50`
   - For each repo starred after cursor: search for open issue `Evaluate: owner/repo` — skip if found
   - Create issue via `GH_PAT`: title `Evaluate: owner/repo`, label `pending-evaluation`, body:
     ```
     **Starred**: <starred_at ISO date>
     **Description**: <repo description, or *(none)*>
     **Language**: <primary language, or *(unknown)*>
     **Stars**: <stargazers_count>
     **URL**: https://github.com/<owner>/<repo>
     ```
   - **Commit cursor last**: advance `last-starred.txt` only after all issues in this batch are created; if the commit fails, the next run re-fetches the same window and dedup skips already-open issues — no duplicates, no data loss, cursor self-heals on next successful run

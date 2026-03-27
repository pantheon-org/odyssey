# `schema-sync.yml` — Re-evaluate on classification change

```yaml
on:
  push:
    branches: [main]
    paths:
      - 'docs/schema/classification.yaml'
  workflow_dispatch:

permissions:
  issues: write
```

**Steps**:
1. `bun install --frozen-lockfile`
2. `bun run lint` — Biome (TS/JS/JSON)
3. `bun run lint:md` — markdownlint-cli2
4. `bun run check:yaml` — parse-check all `.yaml`/`.yml`
5. `bun run check:schema` — fail fast if committed JSON schemas are stale (see ADR-017); prevents creating re-evaluation issues with a mismatched schema.
6. `bun scripts/schema-sync.ts`
   - Read current `version` from `classification.yaml`
   - For each `docs/repos/*.md`: read `schema_version` from frontmatter
   - Use `p-limit(5)` for issue creation: for each stale page, run dedup search then create `pending-re-evaluation` issue via `GH_PAT` (see ADR-019), body:
     ```
     **Trigger**: Schema version mismatch
     **Page schema_version**: <schema_version from frontmatter>
     **Current classification.yaml version**: <current version>
     **URL**: https://github.com/<owner>/<repo>
     ```

Designed to be idempotent: a second push without a version bump produces no new issues (dedup suppresses them).

# `deploy.yml` — Build and publish GitHub Pages

```yaml
on:
  push:
    branches: [main]
    paths:
      - 'docs/**'

concurrency:
  group: pages
  cancel-in-progress: true   # only the latest push to main wins; earlier queued deploys are discarded

permissions:
  contents: read
  pages: write
  id-token: write
```

> **Why `cancel-in-progress: true`?** Multiple PRs merging in quick succession each trigger `deploy.yml`. Only the final state matters — cancelling stale deploys prevents a race where an older build overwrites a newer one on GitHub Pages.

**Steps**:
1. `bun install --frozen-lockfile`
2. `bun run docs:build` (`vitepress build docs`)
3. `actions/upload-pages-artifact` with `docs/.vitepress/dist`
4. `actions/deploy-pages`

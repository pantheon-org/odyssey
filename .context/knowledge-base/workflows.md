# GitHub Actions Workflows

All workflows use explicit `permissions:` blocks. `GITHUB_TOKEN` is used for read-only operations and LLM API calls; `GH_PAT` is used wherever downstream workflow triggers are required.

## Secrets Matrix

| Secret | Scope | Used by |
|--------|-------|---------|
| `GITHUB_TOKEN` | Auto-injected | GitHub Models API calls; read-only GitHub API calls |
| `GH_PAT` | `public_repo` + `workflow` on `thoroc` | Creating issues, branches, PRs — all cross-workflow trigger points |

> **Security Note**: Prefer **Fine-grained Personal Access Tokens** over classic PATs. Scope the token specifically to the `odyssey` repository with "Read & Write" access to `Contents`, `Issues`, `Pull requests`, and `Workflows`.

> **Why GH_PAT?** When `GITHUB_TOKEN` creates an issue or PR, GitHub suppresses downstream `issues` / `pull_request` workflow triggers to prevent infinite loops. `GH_PAT` bypasses this and allows the chain: `poll-stars → evaluate → review → deploy`.

> **Why `public_repo` + `workflow` only?** All target repos are public and `odyssey` itself is public. `repo` (full private-repo control) is unnecessary and widens blast radius on PAT compromise. `workflow` is required to trigger workflow dispatch events via the API.

---

## Workflows

| File | Purpose |
|------|---------|
| [poll-stars.yml](workflows/poll-stars.md) | Detect new starred repos every 15 min; create `pending-evaluation` issues |
| [evaluate.yml](workflows/evaluate.md) | Classify repo via LLM and open a PR with the generated page |
| [review.yml](workflows/review.md) | Validate schema + body sections; auto-merge on success |
| [deploy.yml](workflows/deploy.md) | Build and publish VitePress site to GitHub Pages |
| [quarterly-check.yml](workflows/quarterly-check.md) | Detect material changes; queue re-evaluations |
| [schema-sync.yml](workflows/schema-sync.md) | Re-evaluate all pages when `classification.yaml` version bumps |
| [compare.yml](workflows/compare.md) | Generate comparison pages for repo groups |

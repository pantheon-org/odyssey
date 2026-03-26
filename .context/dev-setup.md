# Local development setup

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Bun | ≥1.1 | `curl -fsSL https://bun.sh/install \| bash` |
| GitHub CLI (`gh`) | ≥2.40 | `brew install gh` |

## Secrets

Three credentials are required. None are committed — set them as environment variables
or export them in your shell profile.

### `GITHUB_TOKEN`

A fine-grained PAT or classic token for the `pantheon-org/odyssey` repo.

Required scopes (classic token): `repo`, `workflow`

```sh
export GITHUB_TOKEN=ghp_...
```

Used by: `evaluate.ts` (open PR), `validate-page.ts` (check PR status), `gh` CLI in BDD step definitions.

### `GH_PAT`

A **separate** classic PAT for cross-workflow triggers and reading `thoroc`'s starred list.

Required scopes: `repo`, `workflow`, `read:user`

```sh
export GH_PAT=ghp_...
```

Used by: `poll-stars.ts` (`GET /users/thoroc/starred`), `poll-stars.yml` (dispatch `evaluate.yml`).

Why separate from `GITHUB_TOKEN`? `GITHUB_TOKEN` (the Actions built-in) cannot trigger
downstream workflows. `GH_PAT` is the workaround — see `.context/workflows.md` secrets matrix.

### GitHub Models API access

`evaluate.ts` calls the GitHub Models API (`https://models.inference.ai.azure.com`) using
`GITHUB_TOKEN`. Access requires your GitHub account to be enrolled in the GitHub Models beta.

Check access:
```sh
curl -s -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://models.inference.ai.azure.com/v1/models | jq '.[].id'
# Should list "gpt-4o-mini" among others
```

If you see a 403, join the waitlist at https://github.com/marketplace/models.

## Running scripts locally

All scripts accept `--dry-run` — reads execute, writes and API mutations are skipped.
Use this for local iteration against real GitHub state without side effects.

```sh
bun scripts/evaluate.ts --dry-run owner/repo
bun scripts/poll-stars.ts --dry-run
bun scripts/quarterly-check.ts --dry-run
bun scripts/schema-sync.ts --dry-run
bun scripts/compare.ts --dry-run
```

## Running tests

```sh
bun test                         # Unit tests (no secrets needed)
bun run lint                     # Biome lint
bun run check:schema             # Verify committed JSON schema is current
```

## Running BDD e2e scenarios

BDD scenarios interact with live GitHub and require both `GITHUB_TOKEN` and `GH_PAT`.
They run against the real `pantheon-org/odyssey` repo and will open issues, PRs,
and trigger workflows.

```sh
# Dry-run (lists steps as pending, no GitHub calls)
bunx cucumber-js --config cucumber.json --dry-run

# Full integration run (main branch only — do not run on feature branches)
bunx cucumber-js --config cucumber.json --profile integration --tags "@phase1"
```

See `P01T02` for the two-profile `cucumber.json` setup and CI vs local distinctions.

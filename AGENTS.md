# Odyssey — Agent Guide

## Current status

This repository is in the **planning and documentation phase**. Only `.context/`
planning documents, ADRs, and this guide exist. No source code, workflows, or
VitePress site have been implemented yet.

Start here: `.context/plans/implementation-plan.md`

## Skills

The following [Tessl](https://tessl.io) tiles are vendored in this repo (see `tessl.json`):

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `pantheon-ai/agents-md` | writing or updating AGENTS.md | Deterministic AGENTS.md authoring |
| `pantheon-ai/markdown-authoring` | writing Markdown docs | Lint-compliant Markdown with CI integration |
| `neomatrix369/learning-opportunity` | explaining concepts | Progressive concept teaching (3 depth levels) |
| `cappasoft/web-dev-estimation` | estimating tasks | Calibrated web-dev time estimates |

Skill stubs are vendored into `.agents/skills/`, `.claude/skills/`, `.cursor/skills/`, etc.
for harness-agnostic access.

## Intended commands (once implemented)

All commands will use `bun` — Node.js will not be required.

```bash
bun install                     # Install dependencies (uses bun.lockb)
bun test                        # Run unit tests (collocated *.test.ts files)
bunx cucumber-js --config cucumber.json  # Run BDD e2e scenarios
bunx cucumber-js --tags "not @slow"      # Skip long-running pipeline scenarios
bun run lint                    # biome ci . (TS/JS/JSON)
bun run lint:md                 # markdownlint-cli2 (Markdown)
bun run check:yaml              # parse-check all .yaml/.yml files
bun run check                   # biome check --write .
bun run format                  # biome format --write .
bun run generate:schema         # Emit docs/schema/repo-page.schema.json
bun run check:schema            # Fail if committed JSON schema is stale
bun run validate:page           # Validate a repo page against schema + page-template.yaml
bun run docs:dev                # VitePress dev server
bun run docs:build              # Build VitePress site → docs/.vitepress/dist
```

Dry-run flags (all scripts will support this — reads execute, writes are skipped):

```bash
bun scripts/evaluate.ts --dry-run
bun scripts/poll-stars.ts --dry-run
bun scripts/quarterly-check.ts --dry-run
bun scripts/schema-sync.ts --dry-run
bun scripts/compare.ts --dry-run
```

## Intended architecture

Odyssey is a fully-automated GitHub Actions pipeline that classifies repos from a
curated GitHub List and publishes a VitePress site to GitHub Pages. No server;
everything is scripts + workflows + static files.

### Pipeline flow

```mermaid
flowchart TD
    subgraph A["Path A — List intake"]
        PS["poll-stars.yml\ncron every 15 min\nFetch GitHub List: Look the Loony Mob via GraphQL\nCreate issue: pending-evaluation"]
    end

    subgraph B["Path B — Quarterly re-eval"]
        QC["quarterly-check.yml\ncron quarterly\nCheck material changes and schema drift\nCreate issue: pending-re-evaluation"]
    end

    subgraph C["Path C — Schema evolution"]
        SS["schema-sync.yml\non push to classification.yaml\nScan for schema_version mismatch\nCreate issue: pending-re-evaluation"]
    end

    subgraph D["Path D — Manual submission"]
        IT["Issue template: Evaluate: owner/repo\nLabel pending-evaluation applied on open\nauthor_association guard: OWNER / COLLABORATOR / MEMBER only"]
    end

    subgraph Eval["evaluate.yml — on issue labeled"]
        EV["Guard: page exists? Close as duplicate\nFetch repo data via GitHub API\nCall GitHub Models API with retry\nWrite docs/repos/owner-repo.md\nCommit and open PR"]
    end

    subgraph Rev["review.yml — on PR opened"]
        RV["Validate frontmatter and body sections\nPost score card comment\nAll checks pass: auto-merge"]
    end

    subgraph Dep["deploy.yml — on push to main"]
        DP["bun run docs:build\nDeploy to GitHub Pages"]
    end

    PS --> EV
    IT --> EV
    QC --> EV
    SS --> EV
    EV --> RV
    RV --> DP
```

Comparison pages (`docs/rankings/`) will be generated at build time by VitePress data
loaders — never committed.

### Planned source locations

| Component | Path | Role |
|-----------|------|------|
| `poll-stars.ts` | `scripts/` | Fetches GitHub List via GraphQL, creates `pending-evaluation` issues |
| `evaluate.ts` | `scripts/` | LLM orchestration: fetch → prompt → call → write page |
| `classification.ts` | `scripts/` | Parses `classification.yaml` |
| `schema.ts` | `scripts/` | Builds Zod schemas dynamically from classification config |
| `generate-schema.ts` | `scripts/` | Emits `docs/schema/repo-page.schema.json` |
| `validate-page.ts` | `scripts/` | Ajv + page-template.yaml checks |
| `quarterly-check.ts` | `scripts/` | Scans pages for material changes / schema drift |
| `schema-sync.ts` | `scripts/` | Creates re-evaluation issues for schema_version mismatches |
| `compare.ts` | `scripts/` | Builds comparison pages from `groups.yaml` |
| `classification.yaml` | `docs/schema/` | **Single source of truth** for dimensions, categories, verdicts, schema_version |
| `groups.yaml` | `docs/schema/` | Comparison group membership |
| `page-template.yaml` | `docs/schema/` | Required body sections for repo pages |

### Schema versioning

`classification.yaml` will carry a `version` field. Every `docs/repos/*.md` frontmatter
will include `schema_version`. When they diverge, `schema-sync.ts` creates a
`pending-re-evaluation` issue. The committed `repo-page.schema.json` is generated from
`classification.yaml` — `bun run check:schema` verifies they're in sync (enforced in CI).

### Secrets

`GITHUB_TOKEN` cannot trigger downstream workflows. Use `GH_PAT` (Personal Access
Token) for all cross-workflow trigger points. See `.context/knowledge-base/workflows.md` for the full
secrets matrix.

### Concurrency limits (planned)

- GitHub API calls in `quarterly-check.ts` and issue creation in `schema-sync.ts`: `p-limit(5)`
- LLM calls in `compare.ts`: `p-limit(3)`

## Testing strategy

Three levels — see `.context/adr/018-testing-strategy.md` for full rationale.

1. **TDD unit tests** (`bun test`) — pure functions only; no GitHub API mocks. Tests
   are **collocated** alongside source (`scripts/classification.test.ts`, not
   `__tests__/`). Write the test file **before** the implementation (red → green →
   refactor).

2. **`--dry-run` flag** — all scripts will accept `--dry-run`; reads execute, writes
   are skipped and logged. Use for local iteration against real GitHub state.

3. **BDD e2e** (CucumberJS) — feature files in `features/`, step definitions in
   `features/step-definitions/`. Write the `.feature` file before implementing the
   pipeline stage. Long-running scenarios tagged `@slow`.

## Conventions

- Always create feature branches — never commit directly to `main`.
- Conventional commit messages (`feat:`, `fix:`, `docs:`, etc.).
- All diagrams must be Mermaid — never ASCII art.
- `.context/` files shard at 300 lines.

## Context documents

| Document | Purpose |
|----------|---------|
| `.context/plans/implementation-plan.md` | Phased implementation plan |
| `.context/knowledge-base/architecture.md` | Component map and data flow |
| `.context/knowledge-base/toolchain.md` | Full tool choices with rationale |
| `.context/knowledge-base/workflows.md` | All GitHub Actions workflows with steps and secrets |
| `.context/knowledge-base/classification.md` | Classification schema design |
| `.context/adr/` | All architectural decision records (001–022) |

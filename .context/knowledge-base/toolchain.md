# Toolchain

## Stack

| Concern | Tool | Notes |
|---------|------|-------|
| Runtime | **Bun** | All scripts run with `bun run`; no Node required |
| Language | **TypeScript** | Strict mode; `.ts` extensions throughout |
| Linting / formatting | **Biome** (`@biomejs/biome`) | Replaces ESLint + Prettier; enforced in CI |
| Package manager | **Bun** | `bun install`, `bun.lockb` committed |
| Schema validation (runtime) | **Zod** | Dynamic schemas built from `classification.yaml` |
| Schema generation | **zod-to-json-schema** | Emits `repo-page.schema.json` |
| Schema validation (CI) | **Ajv** | Validates frontmatter against JSON Schema in `review.yml` |
| YAML parsing | **yaml** (`eemeli/yaml`) | Used by scripts to load `classification.yaml` and `page-template.yaml`; TypeScript types included — no `@types/` needed |
| Static site | **VitePress** | Docs site; `docs/.vitepress/dist` deployed to GitHub Pages |
| VitePress sidebar | **vitepress-sidebar** (`jooy2/vitepress-sidebar`) | Auto-generates sidebar from `docs/repos/`; reads `title` from frontmatter |
| Concurrency limiter | **p-limit** | Throttles parallel GitHub API calls in `quarterly-check.ts` and issue creation in `schema-sync.ts` (cap 5); group LLM calls in `compare.ts` (cap 3) |
| Test runner | **Bun built-in** (`bun:test`) | Unit tests for pure functions in `scripts/__tests__/`; run with `bun test` |
| GitHub API client | **@octokit/rest** | Used by all scripts for authenticated GitHub API calls |

---

## `package.json` Scripts

```json
{
  "scripts": {
    "generate:schema": "bun scripts/generate-schema.ts",
    "check:schema":    "bun scripts/generate-schema.ts --check",
    "validate:page":   "bun scripts/validate-page.ts",
    "lint":            "biome ci .",
    "format":          "biome format --write .",
    "check":           "biome check --write .",
    "test":            "bun test",
    "docs:build":      "vitepress build docs",
    "docs:dev":        "vitepress dev docs",
    "docs:preview":    "vitepress preview docs"
  }
}
```

> **`check:schema`**: runs `generate-schema.ts --check`, which writes schemas to a temp directory and diffs against committed files; exits non-zero if stale. Run locally after any change to `classification.yaml`. Enforced in CI by `review.yml` (step 3) and `schema-sync.yml` (step 2). See ADR-017.

> **`--dry-run` flag**: all pipeline scripts (`evaluate.ts`, `poll-stars.ts`, `quarterly-check.ts`, `schema-sync.ts`, `compare.ts`) accept a `--dry-run` flag. In dry-run mode, read operations execute normally; write operations (issue creation, branch creation, PRs, commits, comments) are replaced with `console.log("[dry-run] would <action>: <details>")`. Use for local debugging without side effects. See ADR-018.

---

## `biome.json`

Minimal starting config — extend as needed.

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.0/schema.json",
  "organizeImports": { "enabled": true },
  "linter": {
    "enabled": true,
    "rules": { "recommended": true }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  }
}
```

---

## CI Setup (all workflows that install deps)

```yaml
- uses: oven-sh/setup-bun@v2
  # no bun-version: — setup-bun@v2 reads .bun-version from repo root automatically
- run: bun install --frozen-lockfile
- run: bun run lint      # biome ci — fails on format or lint violations
```

Add these steps before any `bun scripts/...` call in every workflow job.

**`.bun-version`** — single line in repo root, e.g. `1.2.5`. Keeps local dev and CI on the same version without touching workflow YAML. Update by editing this file.

---

## `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "skipLibCheck": true
  }
}
```

---

## Resolved Decisions

- ~~Pin Bun version?~~ — **Yes**: `.bun-version` file in repo root; `setup-bun@v2` reads it automatically; no `bun-version:` input needed in workflow YAML.
- ~~`js-yaml` vs Bun-native?~~ — **`yaml` package** (`eemeli/yaml`): TypeScript types included, actively maintained, no `@types/` dependency. Bun has no built-in YAML parser.
- ~~Testing approach for CI-first scripts?~~ — **Bun built-in test runner + `--dry-run` flags**: unit tests for pure functions (`scripts/__tests__/`); dry-run suppresses all writes for local iteration. See ADR-018.
- ~~Schema drift detection?~~ — **`check:schema` CI step**: `generate-schema.ts --check` enforced in `review.yml` and `schema-sync.yml`. See ADR-017.

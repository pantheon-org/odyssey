# Site Structure

## VitePress Layout

```
docs/
├── .vitepress/
│   └── config.ts              # site config: title, sidebar, theme, search
├── index.md                   # home page: stats, latest additions, top tags, categories
├── schema/
│   ├── classification.yaml    # evolving typology (source of truth — see classification.md)
│   ├── groups.yaml            # comparison group definitions (source of truth — see compare-rankings.md)
│   ├── page-template.yaml     # required body sections + rules for repo pages
│   ├── compare-template.yaml  # required body sections + rules for comparison pages
│   ├── repo-page.schema.json  # generated JSON Schema for repo frontmatter (do not edit)
│   └── compare-page.schema.json  # generated JSON Schema for compare frontmatter (do not edit)
├── repos/
│   └── <owner>-<repo>.md      # one page per evaluated repo
├── tags/
│   ├── index.md               # all tags with repo counts, grouped by group (data loader)
│   ├── groups/
│   │   └── <group>.md         # all tags in a group + their repos (data loader)
│   └── <tag-id>.md            # repos with this tag, sorted by score (data loader)
├── categories/
│   ├── index.md               # all categories with repo counts + avg score (data loader)
│   └── <category>.md          # repos in this category, sorted by score (data loader)
├── compare/
│   └── <group-slug>.md        # one comparison page per group (LLM-generated, committed)
└── rankings/
    ├── index.md               # global ranking of all repos (VitePress data loader)
    └── <group-slug>.md        # per-group ranking (VitePress data loader)
```

---

## Page Frontmatter Schema

Each `docs/repos/<owner>-<repo>.md` carries this frontmatter. Fields marked **dynamic** are generated from `classification.yaml` and will expand as new dimensions or categories are added.

```yaml
---
title: "owner/repo"
category: library              # dynamic: one of classification.yaml[categories]
language: TypeScript           # primary language from GitHub API
maturity: 4                    # dynamic: integer 1-5, one per classification.yaml[dimensions]
maintenance: 3
completeness: 5
documentation: 4
community: 2
verdict: gem                   # dynamic: one of classification.yaml[verdicts[].id]
tags: [typescript, testing, cli]
starred: 2026-03-20            # ISO date from GitHub starred_at
evaluated_at: 2026-03-25       # ISO date written by evaluate.ts on every run
version_at_eval: "v3.2.1"      # latest release tag at eval time; null if no releases
stars_at_eval: 4821            # stargazers_count at eval time
schema_version: "1.0.0"        # version of classification.yaml used at eval time
model_id: "gpt-4o-mini"        # model used at eval time; changing this constant triggers re-evaluation
---
```

`evaluated_at`, `version_at_eval`, `stars_at_eval`, `schema_version`, and `model_id` are written by `evaluate.ts` — never from model output.

> **Prompt drift coverage**: the LLM prompt is derived entirely from `classification.yaml` (dimensions, descriptions, verdicts). Meaningful prompt changes flow through a `schema_version` bump and trigger re-evaluation automatically. `model_id` covers the residual case: an upstream model update (e.g. `gpt-4o-mini` refreshed by OpenAI) that changes score distributions without any local config change. If you update the model constant in `evaluate.ts`, update all stale pages by running `schema-sync` manually or bumping `schema_version`.

---

## Page Body Structure

Validated by `validate-page.ts` against `docs/schema/page-template.yaml`.

```markdown
## Summary

1-2 sentences from the model describing the repository.

## Scores

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Maturity | 4/5 | Stable API, used in production by several large projects... |
| Maintenance | 3/5 | Active but slow to merge PRs... |
| Completeness | 5/5 | Covers the full stated scope... |
| Documentation | 4/5 | Good docs with examples... |
| Community | 2/5 | Small community, few contributors... |

## Tags

testing, cli, developer-tooling

## Verdict

**gem** — A well-maintained, production-ready library that delivers on its promise.

## Related

| Repo | Shared tags | Total | Verdict |
|------|-------------|-------|---------|
| [owner/repo-a](../repos/owner-repo-a.md) | testing, cli | 21/25 | gem |
| [owner/repo-b](../repos/owner-repo-b.md) | testing | 18/25 | solid |
| [owner/repo-c](../repos/owner-repo-c.md) | developer-tooling | 17/25 | solid |

## Groups

Part of: [CLI Tools](../compare/cli-tools.md) · [Testing Libraries](../rankings/testing-libraries.md)
```

- **Dimension rows** are generated dynamically from `classification.yaml` by `evaluate.ts`. Adding a new dimension adds a new row automatically.
- **Tags** are selected from the controlled vocabulary in `classification.yaml`. Language names are never used as tags.
- **Related** section is computed at `docs:build` time by a VitePress data loader — top 3 repos by shared-tag count, tie-broken by total score. Requires at least 1 shared tag. Never stored in frontmatter; always fresh.
- **Groups** section is computed at `docs:build` time by a VitePress data loader from `groups.yaml`. Only shown if the repo appears in at least one group.

---

## `docs/schema/page-template.yaml`

Defines required body sections. `validate-page.ts` loads this at runtime — adding a section requires only editing this YAML.

```yaml
sections:
  - heading: Summary
    min_content_length: 20
    description: "1-2 sentence description of the repository"

  - heading: Scores
    min_content_length: 50
    description: "Markdown table with Dimension / Score / Rationale rows"

  - heading: Tags
    min_content_length: 5
    description: "Comma-separated list of tags"

  - heading: Verdict
    min_content_length: 20
    description: "Verdict value followed by one-sentence justification"
```

> **Note**: `Related` and `Groups` sections are **not** in `page-template.yaml` — they are injected by VitePress data loaders at build time, not written by `evaluate.ts`. `validate-page.ts` does not check for them.

---

## `docs/schema/repo-page.schema.json`

Generated artefact. Do not edit by hand. Regenerate with:

```sh
bun run generate:schema
```

Must be committed alongside any change to `classification.yaml`. `review.yml` uses this file via Ajv to validate frontmatter on every PR.

---

## VitePress Config Notes

- **Search**: VitePress built-in local search — no external service required
- **Sidebar**: auto-generated using `vitepress-sidebar` (jooy2/vitepress-sidebar). Config in `docs/.vitepress/config.ts`:

  ```typescript
  import { withSidebar } from 'vitepress-sidebar'
  import type { UserConfig } from 'vitepress'

  const config: UserConfig = {
    title: 'Odyssey',
    themeConfig: {
      search: { provider: 'local' },
    },
  }

  export default withSidebar(config, {
    documentRootPath: '/docs',
    scanStartPath: 'repos',
    useTitleFromFrontmatter: true,
    frontmatterTitleFieldName: 'title',
    sortMenusByFrontmatterOrder: false,
  })
  ```

  `title` in each repo page's frontmatter (`owner/repo`) becomes the sidebar label. No manual config required when new pages are added.

- **Phase 3 score card**: implemented as a `.vitepress/theme/` extension (markdown-it plugin or theme component), not a standalone Vue SFC
- **Tag pages**: auto-generated tag index in `docs/tags/` using a VitePress plugin (to be selected in Phase 3)
- **Tag pages**: `docs/tags/<tag-id>.md` and `docs/tags/groups/<group>.md` are generated by VitePress data loaders — same pattern as ranking pages, no external plugin. The tag index (`docs/tags/index.md`) groups tags by their `group` field from `classification.yaml`.
- **Category pages**: `docs/categories/<category>.md` — same data-loader pattern; source is all `docs/repos/*.md` frontmatter filtered by `category` field.
- **Related repos**: injected into each repo page by a shared data loader utility. Top-3 by shared-tag count, tie-broken by total score; minimum 1 shared tag required.
- **Groups cross-reference**: injected into each repo page by a data loader that reads `groups.yaml` and finds all groups listing that repo.

- **Build time at scale**: ranking page data loaders read all `docs/repos/*.md` frontmatter synchronously at build time. For corpora up to ~1 000 repos this is fast (< 5 s on typical CI runners — frontmatter reads are file I/O, not API calls). Beyond ~2 000 repos, consider caching frontmatter in a pre-built JSON file (generated once per build, consumed by all loaders) to avoid O(N) individual file reads per loader invocation. This optimisation is deferred until corpus size warrants it.

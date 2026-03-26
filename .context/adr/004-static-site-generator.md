# ADR-004: Static Site Generator

**Status**: Accepted
**Date**: 2026-03-25

## Context

The output of the pipeline is a browsable, searchable site of evaluated repos. Options considered:

- **Jekyll** — GitHub Pages default; Ruby toolchain; limited component model
- **Docusaurus** — React-based; heavier build; Node-only
- **Astro** — flexible; requires more configuration for a docs-style layout
- **VitePress** — Vue 3 native; purpose-built for Markdown documentation; built-in local search; frontmatter-driven; fast Vite build

The site is Markdown-heavy (one `.md` per repo) with frontmatter-driven metadata, which maps naturally to VitePress.

## Decision

VitePress. Deployed via `actions/deploy-pages` on push to `main` (paths: `docs/**`).

## Consequences

- Frontmatter fields are available as page data in Vue components and theme extensions
- Built-in local search covers the full repo corpus without external search infrastructure
- Phase 3 score card component will be implemented as a VitePress theme extension (`.vitepress/theme/`), not a standalone SFC
- `docs/.vitepress/dist` is the deploy artefact; never committed to the repo

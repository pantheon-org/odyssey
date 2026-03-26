# ADR-020: Tag Vocabulary Model

**Status**: Accepted
**Date**: 2026-03-25

## Context

The original tag design used free-form LLM output — the model invented tags for each repo. Analysis of a real sample of starred repos (`mishushakov/llm-scraper`, `microsoft/mcp-for-beginners`, `alexzhang13/rlm`, `p-e-w/heretic`, `microsoft/RPG-ZeroRepo`, `pmarreck/codescan`, `nixlim/task_templating`, `open-horizon-labs/superego`, `803/skills-supply`) revealed two problems:

1. **Language tags are redundant.** `language` is already a structured frontmatter field. A `typescript` tag duplicates it and pollutes tag pages with noise.
2. **Coarse domain tags destroy discovery value.** A single `llm` tag would group inference libraries, safety tools, data extractors, and code generators together — repos that have nothing useful in common for a "related repos" recommendation.

The `category` field already covers artifact type (library, tool, framework…). Tags need to cover two orthogonal axes not captured by existing fields:
- **Domain** — what problem space does this repo address?
- **Ecosystem** — what platform, protocol, or product does it target or integrate with?

## Decision

### Vocabulary structure

Tags are defined in `classification.yaml` under a new `tags` top-level section. Each entry has:

```yaml
tags:
  - id: llm-inference        # URL-safe kebab-case; used in file paths and frontmatter
    group: llm               # navigation/display grouping — not a hierarchy
    description: "Libraries and runtimes for running or serving LLMs"
```

The LLM receives the full tag list and descriptions in the prompt and assigns the most applicable subset to each repo. The prompt explicitly instructs the model **not** to use language names as tags — language is already captured in the `language` frontmatter field.

Groups are a display convenience, not a strict taxonomy. A repo can hold tags from multiple groups (e.g. `llm-tooling` from group `llm` + `claude-code` from group `agent`).

### Starter vocabulary

```yaml
# Group: llm — problem sub-domains within the LLM space
- { id: llm-inference,      group: llm,        description: "Libraries/runtimes for running or serving LLMs" }
- { id: llm-tooling,        group: llm,        description: "Tools that use LLMs to perform a task (scraping, extraction, generation)" }
- { id: llm-safety,         group: llm,        description: "Guardrails, alignment, censorship controls, or red-teaming" }
- { id: llm-evaluation,     group: llm,        description: "Benchmarking, scoring, or comparing LLM outputs" }
- { id: prompt-engineering, group: llm,        description: "Prompt construction, templating, or chaining" }

# Group: agent — agentic systems and related protocols/products
- { id: agent-framework,    group: agent,      description: "Frameworks for building autonomous or semi-autonomous agents" }
- { id: agent-tooling,      group: agent,      description: "Tools that extend, manage, or distribute agent capabilities" }
- { id: mcp,                group: agent,      description: "Implements or integrates the Model Context Protocol" }
- { id: mcp-server,         group: agent,      description: "Provides an MCP server (tool/resource provider)" }
- { id: claude,             group: agent,      description: "Targets or extends the Claude/Anthropic API" }
- { id: claude-code,        group: agent,      description: "Extension, plugin, or skill set for Claude Code specifically" }
- { id: openai,             group: agent,      description: "Targets or extends the OpenAI API" }

# Group: code — code-centric tooling (not LLM-specific)
- { id: code-generation,    group: code,       description: "Generates source code, scaffolds, or boilerplate" }
- { id: code-search,        group: code,       description: "Searches or indexes codebases semantically or syntactically" }
- { id: code-analysis,      group: code,       description: "Static analysis, linting, or type checking" }
- { id: code-review,        group: code,       description: "Automated code review or PR feedback" }
- { id: refactoring,        group: code,       description: "Automated or assisted code transformation" }

# Group: devex — developer experience and workflow
- { id: cli,                group: devex,      description: "Primarily a command-line interface tool" }
- { id: developer-tooling,  group: devex,      description: "General-purpose tooling that improves developer workflow" }
- { id: testing,            group: devex,      description: "Test runners, assertion libraries, or test utilities" }
- { id: debugging,          group: devex,      description: "Debugging, tracing, or profiling tools" }
- { id: observability,      group: devex,      description: "Logging, metrics, distributed tracing" }
- { id: documentation,      group: devex,      description: "Documentation generation or management" }

# Group: data — data handling and processing
- { id: data-extraction,    group: data,       description: "Scraping, parsing, or extracting structured data" }
- { id: data-pipeline,      group: data,       description: "ETL, streaming, or batch data processing" }
- { id: database,           group: data,       description: "Database clients, ORMs, or query builders" }

# Group: infra — infrastructure and operations
- { id: deployment,         group: infra,      description: "Deployment automation or release management" }
- { id: containerisation,   group: infra,      description: "Docker, Kubernetes, or container orchestration" }
- { id: ci-cd,              group: infra,      description: "Continuous integration or delivery pipelines" }
- { id: infrastructure-as-code, group: infra,  description: "Terraform, CDK, Pulumi, or similar IaC tools" }

# Group: learning — educational and reference material
- { id: learning,           group: learning,   description: "Curriculum, tutorials, or structured learning material" }
- { id: reference,          group: learning,   description: "Specifications, guides, or reference documentation" }

# Group: ecosystem — target platforms not covered by agent group
- { id: vscode,             group: ecosystem,  description: "VS Code extension or tight VS Code integration" }
- { id: github,             group: ecosystem,  description: "GitHub API integration or GitHub-native tooling" }
- { id: github-actions,     group: ecosystem,  description: "GitHub Actions workflow or custom action" }
- { id: nx,                 group: ecosystem,  description: "Nx monorepo plugin or integration" }
- { id: bun,                group: ecosystem,  description: "Bun runtime library or tight Bun integration" }
```

Groups are expected to **evolve** as the corpus grows. The initial set reflects the current sample; new groups and tags will be added without re-evaluation. Renaming or removing a tag `id` is breaking and requires a `schema_version` bump.

### Evolution policy

| Change | Breaking? | `schema_version` bump? | Action |
|--------|-----------|------------------------|--------|
| Add a tag to an existing group | No | No | Run `bun run generate:schema`, commit |
| Add a new group | No | No | Run `bun run generate:schema`, commit |
| Change a tag's `group` (display only) | No | No | Run `bun run generate:schema`, commit |
| Change a tag's `description` | No | No | Commit only — no schema output affected |
| Rename a tag `id` | Yes | Yes | Add `replaced_by: new-id` to old entry; bump version; schema-sync queues re-evals |
| Remove a tag `id` | Yes | Yes | Add `deprecated: true` to entry; tag page renders with deprecation notice during re-eval window; remove entry after all pages re-evaluated |

The `replaced_by` and `deprecated` fields on tag entries are consumed by the tag data loader to render redirect/deprecation pages during the re-evaluation window, preventing 404s.

## Consequences

- The LLM cannot invent tags; all tags are auditable and navigable
- Tag pages (`docs/tags/<id>.md`) are only generated for tags in the vocabulary plus any `deprecated: true` entries still present
- Tag group pages (`docs/tags/groups/<group>.md`) provide a middle navigation layer between the tag index and individual tag pages
- The vocabulary will need curation over time as new problem domains appear in the corpus; this is intentional and expected
- `language` field in frontmatter remains the canonical source for language — tags never duplicate it

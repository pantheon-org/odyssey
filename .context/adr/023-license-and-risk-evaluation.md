# ADR-023: License and Risk Evaluation Fields

**Status**: Accepted
**Date**: 2026-03-27

## Context

The current evaluation captures quality dimensions (maturity, maintenance, completeness,
documentation, community) and a qualitative verdict. It does not answer two questions
that matter for enterprise adoption and safe dependency selection:

1. **Enterprise FOSS usability** — can this be used freely in a commercial/enterprise
   context, or are there licensing restrictions or costs?
2. **Liability risk** — is this project a liability in disguise, through copyleft
   virality, license bait-and-switch history, single-maintainer fragility, known CVEs,
   or vendor capture?

## Decision

Three new fields are added to every repo page frontmatter:

| Field | Source | Type |
|-------|--------|------|
| `license` | GitHub REST API (`license.spdx_id`) | string — deterministic |
| `enterprise_use` | LLM-classified | enum from `enterprise_use_verdicts` |
| `risk_flags` | LLM-classified | `string[]` from `risk_flags` vocabulary |

### `license` (deterministic, not LLM)

`GET /repos/{owner}/{repo}` returns `license.spdx_id`. This is fetched in the existing
repo data fetch step in `evaluate.ts` and written verbatim to frontmatter. The LLM does
not infer the license — it receives the fetched SPDX identifier as a fact.

Values: standard SPDX string (e.g. `MIT`, `Apache-2.0`, `GPL-3.0-only`) or `"none"` when
no license file is detected. GitHub's `NOASSERTION` is stored as `"unclear"`.

### `enterprise_use` (LLM-classified)

The LLM assigns exactly one value from the `enterprise_use_verdicts` vocabulary defined
in `classification.yaml`, using `license` plus any licensing context in the README.

```yaml
enterprise_use_verdicts:
  - id: free
    description: >
      Permissive license (MIT, Apache-2.0, BSD-*) — safe for commercial and enterprise
      use at no cost. No conditions imposed on consumers beyond attribution.
  - id: restricted
    description: >
      Copyleft license (GPL-2.0, GPL-3.0, AGPL-3.0, LGPL) — usable but viral.
      Distribution or network use of a derivative may require open-sourcing it.
  - id: commercial
    description: >
      Source-available but commercially restricted (BSL-1.1, SSPL-1.0, Commons Clause,
      or an explicit non-commercial clause) — not freely usable in enterprise SaaS or
      commercial products without a paid licence.
  - id: unclear
    description: >
      No license file, a custom or unrecognised license, or genuinely ambiguous terms.
      Treat as all-rights-reserved until legal counsel verifies.
```

### `risk_flags` (LLM-classified, 0–N)

The LLM assigns zero or more flags from the `risk_flags` vocabulary. An empty array is
a valid and expected result for the majority of repos.

```yaml
risk_flags:
  - id: no-license
    description: >
      No license file present. Copyright defaults to all-rights-reserved; using this
      project in any product is legally unsafe without explicit permission from the author.
  - id: license-changed
    description: >
      The project has a documented history of switching from a permissive to a more
      restrictive license (e.g. Terraform OSS → BSL, Redis → SSPL, Elasticsearch → SSPL).
      Future changes cannot be ruled out.
  - id: copyleft-viral
    description: >
      GPL or AGPL license. Linking or deploying a modified version may require
      open-sourcing the consuming codebase under the same terms.
  - id: sspl-bsl
    description: >
      SSPL or BSL licence. Marketed as open source by some vendors but explicitly
      restricts use in competing commercial services. OSI does not recognise either
      as an open-source licence.
  - id: single-maintainer
    description: >
      A single active maintainer with no clear succession plan or governance structure.
      Bus-factor of one; project health is entirely dependent on one person's availability.
  - id: no-recent-activity
    description: >
      No commits, releases, or issue responses detectable in the past 12 months.
      The project appears unmaintained regardless of its formal licence status.
  - id: known-cve
    description: >
      The project has publicly disclosed CVEs or documented security vulnerabilities
      that are either unpatched or patched only in newer versions incompatible with
      common usage.
  - id: vendor-capture
    description: >
      The project is controlled by a commercial vendor whose interests may diverge
      from the open-source community — evidenced by CLA requirements, proprietary
      extensions, or a history of restricting forks.
  - id: deep-lock-in
    description: >
      Adopting this project creates hard-to-reverse coupling to a specific vendor,
      proprietary protocol, or hosted service — where migrating later would require
      significant re-engineering.
```

## Evolution policy

Mirrors the tag vocabulary policy from ADR-020:

| Change | Breaking | `schema_version` bump | Action |
|--------|----------|-----------------------|--------|
| Add an `enterprise_use_verdict` | No | No | Run `bun run generate:schema`, commit |
| Add a `risk_flag` | No | No | Run `bun run generate:schema`, commit |
| Change a verdict/flag `description` | No | No | Commit only |
| Rename or remove a verdict/flag `id` | Yes | Yes | Bump version; schema-sync queues re-evals |

## Consequences

- `license` is fetched deterministically — immune to LLM hallucination.
- `enterprise_use` and `risk_flags` are LLM-assigned but constrained to a controlled
  vocabulary — hallucination is bounded to selecting from a known set.
- `task-P01T10-evaluate-ts.md` must add `license.spdx_id` to the repo data fetch step
  and include `enterprise_use` and `risk_flags` in the Zod output schema.
- No `schema_version` bump for this initial addition — these are new fields on a
  schema that has no committed pages yet.
- The prompt must instruct the model that `license` is already known as a fact; it
  should use that fact (not re-infer it) when classifying `enterprise_use`.
- Sites generated before this ADR was adopted will lack these fields; quarterly-check
  will queue re-evaluation once the fields are present in the schema.

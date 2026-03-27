# P01T03 — `docs/schema/classification.yaml`

## Goal
Create the initial classification config with dimensions, categories, verdicts,
and `version: "1.0.0"`.

## Files
- `docs/schema/classification.yaml`

## Implementation
- Fields: `version`, `dimensions[]` (id, label, description, scale 1–5),
  `categories[]` (id, label), `verdicts[]` (id, label), `tags` grouped vocabulary.
- Populate starter vocabulary for all four fields — see `classification.md` for
  dimension weights policy (none), verdict numeric weights policy (none), and
  category/verdict change rules.
- Tag vocabulary: controlled grouped flat tags, no language tags — see ADR-020.

## Produces
- `docs/schema/classification.yaml` — consumed by P01T04, P01T05, P01T10
  - `version` (string) — written verbatim to `schema_version` frontmatter on every repo page
  - `dimensions[].id` (string[]) — each becomes a required integer frontmatter field (score 1–5)
  - `categories[].id` (string[]) — allowed values for the `category` frontmatter enum
  - `verdicts[].id` (string[]) — allowed values for the `verdict` frontmatter enum
  - `enterprise_use_verdicts[].id` (string[]) — allowed values for the `enterprise_use` frontmatter enum
  - `risk_flags[].id` (string[]) — allowed values in the `risk_flags[]` frontmatter array
  - `tags` (grouped vocabulary) — allowed values for the `tags[]` frontmatter array

## References
- `classification.md` — full schema spec, dimension list, evolution policy
- `adr/020-tag-vocabulary-model.md` — tag structure, starter vocabulary

## Verification
```sh
bun -e "import { parse } from 'yaml'; import { readFileSync } from 'fs'; parse(readFileSync('docs/schema/classification.yaml', 'utf8')); console.log('ok')"
```

## Acceptance Criteria
- [ ] File parses as valid YAML without error
- [ ] `version` is a non-empty semantic-version string (e.g. `"1.0.0"`)
- [ ] `dimensions[]`, `categories[]`, `verdicts[]`, `enterprise_use_verdicts[]`, `risk_flags[]` each contain at least one entry with an `id` field
- [ ] `tags` vocabulary is non-empty and structured as named groups per ADR-020
- [ ] No language tags are present in the `tags` vocabulary

## Status
pending

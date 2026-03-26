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

## References
- `classification.md` — full schema spec, dimension list, evolution policy
- `adr/020-tag-vocabulary-model.md` — tag structure, starter vocabulary

## Verification
```sh
bun -e "import { parse } from 'yaml'; import { readFileSync } from 'fs'; parse(readFileSync('docs/schema/classification.yaml', 'utf8')); console.log('ok')"
```

## Status
pending

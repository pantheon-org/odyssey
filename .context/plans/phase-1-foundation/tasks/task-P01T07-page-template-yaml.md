# P01T07 — `docs/schema/page-template.yaml`

## Goal
Define the required body sections for a repo evaluation page.

## Files
- `docs/schema/page-template.yaml`

## Implementation
- List required section headings (e.g. Overview, Scores, Rationale, Tags).
- Used by `validate-page.ts` to check body completeness.
- See `site-structure.md` for the full page body template and required sections.

## Produces
- `docs/schema/page-template.yaml` — consumed by P01T09 (validate-page.ts) and P01T10 (evaluate.ts prompt builder)
  - `sections[]` (string[]) — required heading names that every repo page body must contain
  - `min_content_length` (number) — minimum body character count threshold

## References
- `site-structure.md` — page body template, required section list

## Verification
```sh
bun -e "import { parse } from 'yaml'; import { readFileSync } from 'fs'; const t = parse(readFileSync('docs/schema/page-template.yaml', 'utf8')); console.log(t.sections?.length > 0 ? 'ok' : 'empty')"
```

## Status
pending

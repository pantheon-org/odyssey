# P03T06 — `docs/schema/compare-template.yaml`

## Goal
Define required sections for comparison pages.

## Files
- `docs/schema/compare-template.yaml`

## Implementation
- Required sections: Summary table, Recommendation, Comparison.
- Used by `validate-compare.ts` (P03T07) for body completeness checks.
- See `compare-rankings.md` for the full compare page body template.

## Produces
- `docs/schema/compare-template.yaml` — consumed by P03T08 (validate-compare.ts)
  - `sections[]` (string[]) — required headings: "Summary table", "Recommendation", "Comparison"

## References
- `compare-rankings.md` — comparison page schema, required sections

## Verification
```sh
bun -e "import { parse } from 'yaml'; import { readFileSync } from 'fs'; const t = parse(readFileSync('docs/schema/compare-template.yaml', 'utf8')); console.log(t.sections?.length > 0 ? 'ok' : 'empty')"
```

## Status
pending

# P01T04 — `scripts/classification.ts`

## Goal
Implement `loadClassification()` — reads and parses `docs/schema/classification.yaml`
into a typed object.

## Files
- `scripts/classification.ts`

## Implementation
- Use `yaml` package (`eemeli/yaml`) for parsing — no `js-yaml` — see `toolchain.md`.
- Return typed `Classification` interface matching `classification.yaml` shape.
- Export `loadClassification(): Classification`.

## TDD
Write `scripts/classification.test.ts` collocated **before** implementing.
- Parses a valid `classification.yaml` → returns correct `version` and populated arrays
- Throws when `version`, `dimensions`, `categories`, or `verdicts` are missing
- Throws on malformed YAML

## References
- `classification.md` — Classification type shape
- `toolchain.md` — YAML parser choice

## Verification
```sh
bun -e "import { loadClassification } from './scripts/classification.ts'; console.log(loadClassification().version)"
```

## Status
pending

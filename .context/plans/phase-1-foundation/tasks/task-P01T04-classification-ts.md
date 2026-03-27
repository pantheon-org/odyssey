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

## Depends on
- P01T03 — `docs/schema/classification.yaml` must exist; the test fixture loads it

## Produces
- `scripts/classification.ts` — exports `loadClassification(): Classification`
  - `Classification` shape: `{ version: string, dimensions: Dimension[], categories: Category[], verdicts: Verdict[], enterprise_use_verdicts: Verdict[], risk_flags: RiskFlag[], tags: TagVocabulary }`
  - Consumed by P01T05 (`buildSchemas()`), P01T06 (`generate-schema.ts`), P01T10 (`evaluate.ts`)

## References
- `classification.md` — Classification type shape
- `toolchain.md` — YAML parser choice

## Verification
```sh
bun -e "import { loadClassification } from './scripts/classification.ts'; console.log(loadClassification().version)"
```

## Acceptance Criteria
- [ ] `loadClassification()` returns an object with non-empty `version`, `dimensions`, `categories`, `verdicts` arrays
- [ ] Calling `loadClassification()` on malformed YAML throws a descriptive error
- [ ] Calling `loadClassification()` on a file missing `version` or `dimensions` throws
- [ ] All three TDD cases pass (`bun test scripts/classification.test.ts` exits 0)

## Status
pending

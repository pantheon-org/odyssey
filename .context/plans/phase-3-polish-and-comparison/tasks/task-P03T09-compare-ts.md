# P03T09 — `scripts/compare.ts`

## Goal
Generate a comparison page for a group: resolve members, build prompt, call LLM,
write page.

## Files
- `scripts/compare.ts`

## Implementation
- Input: `<group-id>` argument.
- **No-op fast exit**: if the triggering repo push affects no group in `groups.yaml`,
  exit 0 immediately — see ADR-016.
- **Group resolution**: read `groups.yaml`, find groups containing the affected repo.
- **Prompt build**: inject all member repo frontmatter + body into prompt; request
  structured comparison response.
- **LLM call**: GitHub Models API, `gpt-4o-mini` — see ADR-002.
- **Response validation**: Zod parse → fail on invalid response.
- **Concurrency**: `p-limit(3)` for group LLM calls — see ADR-016.
- **Page write**: render to `docs/compare/<group-id>.md` with frontmatter +
  required sections.
- `--dry-run` flag: resolve + prompt + validate but do not write — see ADR-018.

## TDD
Write `scripts/compare.test.ts` collocated **before** implementing. Extract
pure functions to make them testable in isolation.
- Group resolution: repo is a member → group returned; repo not a member → empty list
- No-op fast exit: repo belongs to no group → returns skip signal immediately
- Prompt builder: all member page bodies injected into prompt string
- `p-limit(3)`: ≤3 concurrent LLM call slots

## Depends on
- P03T05 — reads `docs/schema/groups.yaml`; group entry shape: `{ id: string, label: string, description: string, members: string[] }`
- P03T06 — reads `docs/schema/compare-template.yaml` for required body section names when rendering the output page
- P01T10 — reads existing evaluated repo pages from `docs/repos/<owner>-<repo>.md` (written by evaluate.ts) to build the comparison prompt; these pages must exist for any group member before compare.ts can run for that group

## References
- `adr/015-compare-rankings.md` — comparison page design
- `adr/016-compare-cascade-protection.md` — no-op fast exit, p-limit(3)
- `../../../knowledge-base/compare-rankings.md` — generation strategy, page schema

## Verification
```sh
bun scripts/compare.ts --dry-run <group-id>
echo $?  # 0 = LLM round-trip succeeded, page not written
```

## Acceptance Criteria
- [ ] `--dry-run <group-id>` exits 0 (LLM round-trip succeeded, no file written)
- [ ] A repo belonging to no group causes immediate exit 0 without making an LLM call
- [ ] Generated comparison page contains "Summary table", "Recommendation", and "Comparison" sections
- [ ] At most 3 simultaneous LLM calls are in flight at any time (`p-limit(3)` enforced)
- [ ] LLM JSON validation failure causes non-zero exit; no file written
- [ ] All TDD cases pass (`bun test scripts/compare.test.ts` exits 0)

## Status
pending

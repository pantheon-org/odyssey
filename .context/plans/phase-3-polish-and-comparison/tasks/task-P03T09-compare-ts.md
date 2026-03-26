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

## References
- `adr/015-compare-rankings.md` — comparison page design
- `adr/016-compare-cascade-protection.md` — no-op fast exit, p-limit(3)
- `compare-rankings.md` — generation strategy, page schema

## Verification
```sh
bun scripts/compare.ts --dry-run <group-id>
echo $?  # 0 = LLM round-trip succeeded, page not written
```

## Status
pending

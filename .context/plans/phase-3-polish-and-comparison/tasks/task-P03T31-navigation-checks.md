# P03T31 — Minimal automated navigation checks

## Goal
Add a lightweight automated check that verifies critical navigation paths and
prevents regressions in tags/categories/group pages.

## Files
- `package.json` (add `check:links` or similar script)
- `scripts/check-links.ts` (or a small link-check tool config)

## Implementation
- **Recommendation:** implement a minimal link-check script that covers:
  - `/tags/`, `/categories/`, and `/rankings/` index pages
  - A sample tag page and category page
  - A comparison page
- Keep it fast and deterministic; avoid live network calls.

## Verification
```sh
bun run check:links
```

## Status
pending

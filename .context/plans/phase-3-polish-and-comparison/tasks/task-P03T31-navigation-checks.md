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

## Acceptance Criteria
- [ ] `bun run check:links` exits 0 on a correctly built site
- [ ] Script checks `/tags/`, `/categories/`, and `/rankings/` index pages
- [ ] Script checks at least one tag detail page and one category detail page
- [ ] Script checks at least one comparison page
- [ ] Script makes no live network calls — runs against the built static output only
- [ ] A broken internal link (e.g. missing page file) causes `check:links` to exit 1

## Status
pending

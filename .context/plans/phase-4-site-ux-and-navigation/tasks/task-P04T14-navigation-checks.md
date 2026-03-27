# P04T14 — Minimal automated navigation checks

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

## Definition of Done

**Must Have**
- [ ] `bun run check:links` exits 0 on a correctly built site and exits 1 when a broken internal link is detected
- [ ] Script checks `/tags/`, `/categories/`, `/rankings/` index pages, at least one tag detail page, one category detail page, and one comparison page

**Should Have**
- [ ] All acceptance criteria pass, including the no-live-network-calls constraint (runs against built static output only)

**Could Have**
- [ ] Check is integrated as a CI step in the deploy workflow so broken links block deployment

**Won't Have (this iteration)**
- External URL validation (e.g. checking GitHub repo links are still live) — internal static link checking only

## Status
pending

# P01T13 — `.github/workflows/deploy.yml`

## Goal
Build the VitePress site and publish to GitHub Pages on every push to `main`.

## Files
- `.github/workflows/deploy.yml`

## Implementation
- Trigger: `push` to `main`.
- Steps: checkout → setup-bun → `bun install` → `bun run docs:build` →
  deploy `docs/.vitepress/dist` to `gh-pages` branch (or Pages via Actions deploy).
- Use `actions/deploy-pages` with appropriate permissions.
- See `../../../knowledge-base/workflows.md` for the full YAML spec.

## Depends on

- P01T08 — VitePress must be scaffolded; `bun run docs:build` must succeed

## Context

_Minimum reads before starting:_

- `../../../knowledge-base/workflows.md` — full YAML spec for deploy.yml

## References
- `../../../knowledge-base/workflows.md` — full YAML spec for deploy.yml

## Verification
```sh
gh workflow run deploy.yml
# Expect: site live at https://<org>.github.io/odyssey/
curl -sf https://pantheon-org.github.io/odyssey/ | grep -q "odyssey" && echo "ok"
```

## Acceptance Criteria
- [ ] Every push to `main` triggers `deploy.yml`
- [ ] Workflow job completes with conclusion `success`
- [ ] `curl -sf https://pantheon-org.github.io/odyssey/` returns HTTP 200
- [ ] The published page contains the word "odyssey" in the HTML

## Status
pending

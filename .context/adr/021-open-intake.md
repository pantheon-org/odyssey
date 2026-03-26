# ADR-021 — Open intake via issue template

## Status
Accepted

## Context
Originally the only intake path was `poll-stars.ts`, which scoped the catalog strictly to repos starred by `thoroc`. This made the source implicit and the pipeline self-contained, but blocked collaborators from nominating repos they find valuable without starring them on a personal account.

The evaluate pipeline is already issue-driven: `evaluate.yml` triggers on `issues: labeled` and parses `owner/repo` from the issue title. The machinery to accept a manually opened issue already exists — only the entry point and access gate were missing.

## Decision
Add a GitHub issue template (Path D) that allows collaborators to submit any public repo for evaluation:

1. **Issue template** at `.github/ISSUE_TEMPLATE/submit-repo.yml` — uses GitHub's YAML form format with `labels: ["pending-evaluation"]` in frontmatter, so the label fires `evaluate.yml` automatically when the issue is opened.
2. **`author_association` guard** added as the first condition of the `evaluate.yml` job — the workflow runs only when the issue author's association is `OWNER`, `COLLABORATOR`, or `MEMBER`. External submitters are silently no-oped; a maintainer can manually re-label any legitimate external issue.
3. **No `source` field** in the repo page schema — the distinction between "starred" and "submitted" is operationally irrelevant once a page is evaluated.

## Consequences

**Positive**
- Collaborators can nominate repos without coupling to a personal stars list.
- Zero new scripts or workflow files — the template + one condition change is the entire surface area.
- The existing dedup search and idempotency guard in `evaluate.ts` cover the new path without modification.

**Negative / trade-offs**
- `author_association` filtering silently ignores external submissions. There is no rejection comment or notification — an external submitter gets no feedback. Acceptable given the project's personal/collaborative scope.
- The `pending-evaluation` label is now applied both by `poll-stars.ts` (via `GH_PAT`) and by the issue template (at issue-open time). Both paths are already covered by the same `evaluate.yml` trigger — no divergence risk.

## Alternatives considered

**Auto-label workflow** — a separate workflow watching `issues: opened` and applying the label based on title pattern. Rejected: the issue template achieves the same result without an extra workflow, and title-matching regexes are fragile.

**`source` frontmatter field** — track whether a page originated from a star or a manual submission. Rejected: adds schema complexity for no downstream value; the intake path does not affect classification, site rendering, or re-evaluation logic.

**Open to all GitHub users** — remove the `author_association` guard entirely. Rejected: exposes GitHub Models API quota and Actions minutes to arbitrary external use with no access control.

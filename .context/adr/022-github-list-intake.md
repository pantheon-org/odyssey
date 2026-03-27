# ADR-022 — GitHub List as intake source

**Status**: Accepted
**Date**: 2026-03-27
**Amends**: ADR-001

## Context

ADR-001 scoped intake to repos starred by `thoroc` via `GET /users/thoroc/starred`. This couples the catalog to a single user's personal star activity and excludes curated sub-sets of that activity (e.g. themed lists) and any collaborator's own curation.

GitHub's **Lists** feature lets a user organise their starred repos into named collections. The project owner and collaborators may maintain a list — named **"Look the Loony Mob"** — as the curated intake set, decoupling the pipeline from the raw star feed.

GitHub Lists are only accessible via the **GraphQL API** (`user.lists`); there is no equivalent REST endpoint. The GraphQL schema should be verified at [GitHub GraphQL Explorer](https://docs.github.com/en/graphql/overview/explorer) before implementation.

## Decision

Replace `GET /users/thoroc/starred` with a GraphQL query against the named list:

```graphql
query($login: String!, $after: String) {
  user(login: $login) {
    lists(first: 25) {
      nodes {
        name
        repositories(first: 100, after: $after) {
          nodes { nameWithOwner }
          pageInfo { hasNextPage endCursor }
        }
      }
    }
  }
}
```

Filter the returned `lists.nodes` by `name === LIST_NAME` (case-insensitive).

**Configuration** (environment variables, set in `poll-stars.yml`):

| Variable | Description | Example |
|---|---|---|
| `LIST_OWNER` | GitHub login of the list owner | `thoroc` |
| `LIST_NAME` | Exact list name | `Look the Loony Mob` |

The list owner **must** be a project OWNER, COLLABORATOR, or MEMBER of `pantheon-org/odyssey`. This is an operational constraint enforced by documentation and `evaluate.yml`'s `author_association` guard (ADR-021), not by code.

## Cursor change

GitHub Lists expose no per-item "added_at" timestamp. The timestamp cursor from ADR-001 does not apply.

The cursor is replaced by the **issue-dedup search** (ADR-009) as the sole mechanism for skipping already-processed repos. On each poll run, the full list is fetched and every repo is tested against existing `Evaluate: owner/repo` issues before creating a new one. The `actions/cache` cursor key (`poll-stars-cursor`) is retired.

To bound GraphQL quota on large lists, pagination uses `pageInfo.endCursor` and stops once all pages are consumed. Lists are expected to remain small (< 500 repos); if they grow the per-run page count can be tuned via `LIST_PAGE_SIZE` (default: 100).

## Consequences

**Positive**
- Any project collaborator can curate the intake list without starring repos on their personal account.
- Multiple collaborators can own a list with the same name; `LIST_OWNER` selects which one to poll.
- No new workflow file — only `poll-stars.yml` env vars change.

**Negative / trade-offs**
- GraphQL instead of REST: slightly more complex query, but `@octokit/graphql` (or `bun fetch` with the GitHub GraphQL endpoint) handles it cleanly.
- Full list scan on every run (no timestamp delta): acceptable while the list stays small; dedup search (ADR-009) is the correctness guarantee.
- `author_association` guard in `evaluate.yml` is not automatically enforced for the poll path — the list owner's identity is trusted via the `LIST_OWNER` env var. Maintainers must keep this value set to a genuine collaborator.

## Alternatives considered

**Keep starring + add list as a second source** — poll both feeds and union results. Rejected: two intake paths with different cursor models increase complexity for no immediate gain. The list replaces the star feed; any repo the owner wants evaluated can be added to the list.

**REST workaround (scraping)** — GitHub's web UI renders lists but there is no public REST API. Rejected: fragile and against GitHub's ToS.

**Webhook on list changes** — GitHub does not fire webhook events for list additions. Not viable.

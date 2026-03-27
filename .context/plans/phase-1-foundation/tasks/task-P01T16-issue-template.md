# P01T16 — `.github/ISSUE_TEMPLATE/submit-repo.yml`

## Goal
GitHub issue template that lets collaborators submit any public repo for evaluation without touching the pipeline internals.

## Files
- `.github/ISSUE_TEMPLATE/submit-repo.yml`

## Implementation
- YAML issue form with `labels: ["pending-evaluation"]` in frontmatter — the label fires `evaluate.yml` automatically on issue open.
- `title` pre-filled as `"Evaluate: "` so the user completes it with `owner/repo` in the correct format that `evaluate.ts` already parses.
- Body contains a single required `input` field for the repository (informational only — `evaluate.ts` fetches all data from the GitHub API and does not read the issue body).
- No new script or workflow changes required beyond the `author_association` guard already added to `evaluate.yml` (task P01T11).

```yaml
name: Submit repository for evaluation
description: Propose any public GitHub repository for classification
title: "Evaluate: "
labels:
  - pending-evaluation
body:
  - type: input
    id: repo
    attributes:
      label: Repository (owner/repo)
      description: The GitHub repository to evaluate
      placeholder: "e.g. facebook/react"
    validations:
      required: true
  - type: textarea
    id: reason
    attributes:
      label: Why is this repo interesting? (optional)
      description: Brief context for the evaluator — not used by the pipeline
    validations:
      required: false
```

## References
- `adr/021-open-intake.md` — decision record for this intake path
- `task-P01T11-evaluate-workflow.md` — author_association guard in evaluate.yml

## Verification
```sh
# Open the template in the GitHub UI:
# https://github.com/pantheon-org/odyssey/issues/new/choose
# Confirm pending-evaluation label is pre-applied on submit
# Confirm evaluate.yml fires for collaborators, no-ops for outsiders
```

## Acceptance Criteria
- [ ] Issue template appears under `https://github.com/pantheon-org/odyssey/issues/new/choose`
- [ ] Submitting the form pre-applies the `pending-evaluation` label on the created issue
- [ ] `evaluate.yml` fires automatically when the issue is opened by a collaborator or member
- [ ] `evaluate.yml` silently no-ops when the issue is opened by an external account

## Status
pending

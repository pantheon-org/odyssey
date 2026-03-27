# P02T08 — Enable branch protection after workflows stable

## Goal
Turn on branch protection on `main` once `evaluate.yml`, `review.yml`, and
`deploy.yml` are stable and reliably green.

## Files
- GitHub repository settings (branch protection rules)

## Implementation
- Require the core workflows as required checks.
- Require linear history and block force pushes.
- Ensure required checks are stable before enforcing.

## Verification
Attempt a direct push to `main` and confirm it is blocked without required checks.

## Definition of Done

**Must Have**
- [ ] Branch protection rule on `main` is enabled, requiring `evaluate.yml`, `review.yml`, and `deploy.yml` as required status checks
- [ ] A direct push to `main` without passing required checks is blocked

**Should Have**
- [ ] Linear history and block-force-pushes settings are also enabled alongside required checks

**Could Have**
- [ ] Branch protection settings are documented in the repository wiki or a `docs/` reference page for future maintainers

**Won't Have (this iteration)**
- Infrastructure-as-code (e.g. Terraform) management of branch protection — manual GitHub UI configuration is sufficient

## Depends on

- [P02T04](task-P02T04-poll-stars-workflow.md) — poll-stars.yml must be stable before protecting
- [P02T05](task-P02T05-verify-evaluate-trigger.md) — evaluate.yml trigger verified and stable

## Context

_Minimum reads before starting:_

- `../../../knowledge-base/workflows.md` — required status checks per workflow

## Status
pending

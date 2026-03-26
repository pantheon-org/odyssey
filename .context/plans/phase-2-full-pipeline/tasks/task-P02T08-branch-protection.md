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

## Status
pending

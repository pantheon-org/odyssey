# P01T14 — Branch protection on `main`

## Goal
Configure `main` to require the `review.yml` status check before merging.

## Files
- GitHub repository settings (no file — repository configuration)

## Implementation
- Enable branch protection rule for `main`:
  - Required status checks: `review / validate` (the job name in `review.yml`)
  - Require branches to be up to date before merging: yes
  - Restrict who can push: block direct pushes
- Configure via GitHub UI or `gh api`:

```sh
gh api repos/pantheon-org/odyssey/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["review / validate"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews=null \
  --field restrictions=null
```

## References
- `../../../knowledge-base/workflows.md` — expected job name in review.yml

## Verification
```sh
gh api repos/pantheon-org/odyssey/branches/main/protection \
  --jq '.required_status_checks.contexts[]'
# Expect: "review / validate"
```

## Status
pending

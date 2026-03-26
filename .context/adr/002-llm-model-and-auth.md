# ADR-002: LLM Model and Authentication

**Status**: Accepted
**Date**: 2026-03-25

## Context

Classification requires an LLM call. Options considered:

- **OpenAI API** — requires a paid API key and an extra secret
- **GitHub Copilot** — not accessible via API in Actions context
- **Google Gemini** — requires a Google API key and an extra secret
- **GitHub Models API** (`models.inference.ai.azure.com`) — available free tier in GitHub Actions using the auto-injected `GITHUB_TOKEN`; no extra secret needed

Structured JSON output reliability was also a factor. `gpt-4o-mini` supports `response_format: { type: 'json_object' }` which significantly reduces malformed responses.

## Decision

GitHub Models API with `gpt-4o-mini`. Auth via `Authorization: Bearer ${{ secrets.GITHUB_TOKEN }}` — no extra secret required.

## Consequences

- Zero additional secret management
- Subject to GitHub Models free-tier rate limits; retry logic (3 attempts, 5 s back-off) is required
- Model is not browsing the web — repo data must be pre-fetched and injected into the prompt (see ADR-007)
- Model selection can be changed by updating a single constant; the prompt contract is model-agnostic

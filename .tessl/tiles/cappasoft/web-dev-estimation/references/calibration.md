# Agent Calibration Reference

## Why agent ≠ human for estimation

A human developer estimates their own speed and cognitive load.
A coding agent (Claude Code) has a radically different performance profile:

- **Fast**: mechanical generation, pattern-matching, well-documented APIs
- **Slow**: ambiguity resolution, exploratory debugging, multi-file reasoning with unclear contracts
- **Asymmetric risk**: agents move faster in the wrong direction — spec clarity has higher leverage than with humans

---

## Calibration Table

| Task type | Human baseline | Agent multiplier | Rationale |
|---|---|---|---|
| Boilerplate / scaffolding | 1× | **0.2–0.3×** | Agent generates in seconds; no cognitive load |
| CRUD endpoints / forms | 1× | **0.3–0.4×** | Well-trodden pattern, agent copies confidently |
| UI component (existing design system) | 1× | **0.4–0.5×** | Follows existing patterns well |
| UI component (no design system) | 1× | **0.6–0.8×** | Must invent conventions; higher correction rate |
| Business logic (clear spec) | 1× | **0.5–0.6×** | Reasons well with clear requirements |
| Business logic (partial spec) | 1× | **0.8–1.0×** | Clarification loops are expensive |
| Integration (documented 3rd-party API) | 1× | **0.6–0.8×** | Docs must be ingested, edge cases explored |
| Integration (poor/missing docs) | 1× | **1.2–2.0×** | High hallucination risk on API contracts |
| Debugging (clear stack trace) | 1× | **0.7–1.0×** | Often faster than human with good visibility |
| Debugging (intermittent / no trace) | 1× | **1.0–1.8×** | Expensive retry loops; agent fabricates root causes |
| Auth / permissions / roles | 1× | **0.8–1.2×** | Security-critical; validation loops required |
| Database migration | 1× | **0.7–1.0×** | Mechanical, but schema knowledge required |
| Architecture / design decisions | 1× | **1.0–1.5×** | Requires human validation; agent oversimplifies |
| Refactor: extract hook/util | 1× | **0.3–0.5×** | Pattern-matching, agent is good at this |
| Refactor: cross-cutting concern | 1× | **0.8–1.2×** | Multi-file, risk of missing call sites |
| Ambiguous / underspecified task | 1× | **1.5–3.0×** | The single most expensive multiplier |
| Writing / updating tests | 1× | **0.4–0.6×** | Agent generates test boilerplate well |
| E2E test (Playwright/Cypress) | 1× | **0.5–0.8×** | Selector strategy matters; fragility risk |

---

## Correction Factors (stack on top of base multiplier)

| Factor | Adjustment | When to apply |
|---|---|---|
| Clear spec / precise ticket | −10% | Written requirements with acceptance criteria |
| Vague spec | +30% | "Make it work like X" without specifics |
| No spec at all | +80% | Verbal description only |
| High prior art in codebase | −20% | Nearly identical pattern exists |
| Greenfield (no prior art) | +40% | No similar pattern to copy |
| External API (good docs) | +20% | Stripe, Twilio, SendGrid, etc. |
| External API (poor docs) | +40% | Internal microservice, legacy vendor |
| Auth / shared state dependency | +25% | Task touches session, permissions, tokens |
| DB migration required | +15% | Schema change needed |
| Monorepo / complex build | +20% | Multiple packages, cross-boundary imports |
| No TypeScript / no types | +30% | Agent loses inference; more hallucination risk |
| Deprecated or legacy stack | +50% | Agent training data coverage drops sharply |

---

## The Ambiguity Cost — Why It Hits Harder with Agents

With a human developer: vague task → conversation → clarification → work resumes.

With a coding agent:
1. Vague task → agent makes plausible assumptions
2. Agent produces something convincing but wrong
3. Developer discovers the mismatch (minutes or hours later)
4. Correction requires understanding what the agent assumed
5. Re-run with corrected prompt → new output → re-validate

**The cost of wrong direction is higher** because agents move faster into that direction.

**Rule of thumb**: Every hour spent on spec before the agent starts saves 2–4 hours of correction after.

---

## Stack-Specific Notes

### TypeScript / Next.js / React
- Server Components vs Client Components boundary confusion = common agent error (+20% on RSC tasks)
- App Router vs Pages Router: if mixed, add +30% to routing-related tasks
- Tailwind: agent very reliable; shadcn/ui: reliable if it's in the codebase already

### Python / FastAPI / Django
- Pydantic v2 migration: agent still sometimes generates v1 syntax (+15% on schema tasks)
- Django ORM: agent reliable; raw SQL complex queries: less reliable (+25%)
- Async/sync mixing: high risk of subtle bugs (+20%)

### Go
- Interface satisfaction errors: agent catches well
- Goroutine patterns: reliable for common patterns, risky for novel ones (+30%)
- Error wrapping conventions: agent needs explicit guidance

### Node.js (Express / NestJS)
- NestJS decorators: agent reliable if codebase has examples
- Middleware chain: agent sometimes misorders; add validation step

---

*Last updated: March 2026 — calibrate against your own observed agent performance and update this file*

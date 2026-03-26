# Common Patterns & Reference Times

Agent-calibrated reference times for a TypeScript full-stack app (Next.js + Node/Supabase).
Adjust using the stack-specific notes in `calibration.md` for other stacks.

---

## T-Shirt Size Reference

| Size | Agent time | Human equivalent | Use when |
|---|---|---|---|
| XS | < 30 min | < 2h | Single file change, clear pattern exists |
| S | 30 min – 2h | 2–8h (1 day) | 2–5 files, clear spec, high prior art |
| M | 2–6h | 1–3 days | Cross-cutting, some integration, tests required |
| L | 6–16h | 3–7 days | Multi-service, new patterns, significant testing |
| XL | 16–40h | 1–3 weeks | Major feature, architecture decision, migrations |
| XXL | > 40h | > 3 weeks | **Decompose further before estimating** |

---

## Frontend Patterns

| Pattern | Agent time | Notes |
|---|---|---|
| New React component (existing design system) | 10–25 min | |
| New React component (no design system) | 25–60 min | Must invent props/styles |
| New page / route (simple, no data) | 15–30 min | |
| New page with data fetching (SWR/React Query) | 30–60 min | |
| New page with server-side data (Next.js RSC) | 45–90 min | RSC boundary confusion risk |
| Form with validation (react-hook-form / zod) | 30–60 min | |
| Complex form (multi-step, conditional fields) | 1–3h | |
| Data table with pagination + filters | 45–90 min | If pattern exists in codebase |
| Data table (greenfield) | 1.5–3h | |
| Modal / drawer / dialog | 15–30 min | |
| Infinite scroll / virtual list | 1–2h | |
| Charts / data visualization (recharts/d3) | 45–120 min | Depends on complexity |
| Drag-and-drop interface | 1.5–3h | High hallucination risk on libraries |
| Responsive layout (existing patterns) | 20–45 min | |
| Animation / transition | 30–90 min | CSS > Framer Motion for agent reliability |
| i18n: add translation keys | 15–30 min | |
| i18n: new locale setup | 45–90 min | |
| Dark mode toggle | 20–45 min | |
| Image upload UI | 30–60 min | |
| File upload with progress | 45–90 min | |

---

## Backend Patterns

| Pattern | Agent time | Notes |
|---|---|---|
| New API endpoint (REST, with validation + types) | 15–30 min | |
| New API endpoint (with complex business logic) | 30–90 min | |
| CRUD endpoints (full set: list, get, create, update, delete) | 45–90 min | |
| Auth: new role or permission | 30–90 min | Depends on auth system complexity |
| Auth: new OAuth provider | 1–3h | Provider docs quality varies widely |
| Webhook handler (receive + validate) | 30–60 min | |
| Webhook handler (receive + validate + retry logic) | 1–2h | |
| Background job / queue task | 45–120 min | |
| Scheduled task (cron) | 20–45 min | |
| Email sending (transactional) | 30–60 min | If provider SDK is in codebase |
| Email template (new) | 20–45 min | |
| File upload + storage (S3/R2/Supabase Storage) | 45–90 min | |
| Search (full-text, existing infra) | 30–60 min | |
| Search (new setup: Typesense/Algolia/pg full-text) | 1.5–4h | |
| Rate limiting | 20–45 min | |
| Caching layer (Redis) | 45–90 min | |
| PDF generation | 45–120 min | Library matters: puppeteer > pdfkit for agent |
| CSV/Excel export | 30–60 min | |
| Integrate new 3rd-party SDK (good docs) | 1–3h | |
| Integrate new 3rd-party SDK (poor/missing docs) | 2–6h | High variance |
| GraphQL: new query/mutation | 20–45 min | |
| GraphQL: new type + resolver | 30–60 min | |
| WebSocket / real-time event | 1–3h | |

---

## Database Patterns

| Pattern | Agent time | Notes |
|---|---|---|
| Add column to existing table + migrate | 15–30 min | |
| Add column + update ORM types | 20–40 min | |
| New table (simple, 5–10 cols) | 20–40 min | |
| New table with relations + indexes | 30–60 min | |
| Multi-tenant: isolate new resource | 45–120 min | RLS / scoping complexity |
| Add RLS policy (Supabase) | 20–45 min | |
| Complex query optimization | 1–4h | High variance, depends on data model |
| Data migration (transform existing data) | 45–180 min | Risk of data loss; always needs review |
| Seed / fixture data | 20–45 min | |

---

## Testing Patterns

| Pattern | Agent time | Notes |
|---|---|---|
| Unit tests for existing module | 20–45 min | |
| Unit tests for new module (alongside) | 10–25 min | Agent writes as it builds |
| Integration test (API endpoint) | 20–45 min | |
| E2E test (Playwright): simple flow | 30–60 min | |
| E2E test (Playwright): complex flow (auth + data) | 45–120 min | |
| Mock external service in tests | 20–45 min | |
| Snapshot test update | 5–15 min | |
| Test coverage audit + fill gaps | 1–3h | Depends on gap size |

---

## Infrastructure / DevOps Patterns

| Pattern | Agent time | Notes |
|---|---|---|
| Environment variable: add + document | 10–20 min | |
| Docker: add service to compose | 20–40 min | |
| CI pipeline: add step | 20–45 min | |
| Feature flag: add + gate | 20–45 min | If flag system exists |
| Feature flag: new system setup | 1–3h | |
| Logging: add structured log | 10–20 min | |
| Monitoring: add metric / alert | 30–60 min | Depends on provider |
| Deploy: new environment setup | 1–3h | High variance |

---

## Known Agent Failure Patterns

Document these per project as you encounter them.
Add to this file when Claude Code makes a systematic mistake on your stack.

| Failure pattern | Symptom | Fix |
|---|---|---|
| RSC/Client boundary confusion | "use client" missing or misplaced | Explicit instruction in prompt |
| Tailwind class purge | Classes not in safelist | Check tailwind.config.ts |
| Prisma type drift | Generated types stale | Run `prisma generate` first |
| Zod inference mismatch | `z.infer` used on wrong schema | Add explicit type annotation |
| Missing `await` in async chain | Silent undefined | Add `// always await` comment |
| Import path assumption | Wrong relative path depth | Read file structure before generating |

*Add your stack-specific failures here as you observe them.*

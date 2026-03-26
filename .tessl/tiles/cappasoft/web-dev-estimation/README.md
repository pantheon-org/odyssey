# web-dev-estimation

**Agent Skill for Claude Code — Agent-calibrated web development estimation**

Estimates implementation time for web development tasks (frontend and/or backend) by reading the actual codebase and applying multipliers calibrated for **AI coding agents**, not human developers.

---

## Why this skill exists

Most estimation tools assume a human developer.
AI coding agents have a radically different performance profile:

- **10× faster** on mechanical work (boilerplate, CRUD, wiring)
- **Comparable or slower** on ambiguous, exploratory, or poorly-documented work
- **Higher cost of wrong direction** — agents move fast in the wrong direction when specs are vague

This skill encodes that difference into a structured, honest workflow.

---

## What it does

1. Detects your project stack automatically
2. Reads the codebase before estimating (non-negotiable)
3. Decomposes the task into sub-tasks of 5–120 agent-minutes
4. Applies agent-calibrated multipliers from a documented calibration table
5. Outputs a structured estimate with confidence level, assumptions, risks, and T-shirt size
6. **Batch mode**: scans [BMAD Method](https://bmad-method.org) stories, spec folders, PRDs, or backlogs and produces a consolidated estimate table

---

## Structure

```
web-dev-estimation/
├── SKILL.md                    # Workflow + invocation modes (load first)
├── references/
│   ├── calibration.md          # Agent vs. human multiplier table + stack notes
│   ├── patterns.md             # Common pattern reference times + T-shirt sizing
│   └── honesty-rules.md        # Non-negotiable rules + escalation thresholds
├── evals/
│   └── evals.json              # Test scenarios for skill validation
├── bin/
│   └── install.js              # npx installer
└── package.json                # npm package for npx distribution
```

Progressive disclosure: only `SKILL.md` loads automatically. Reference files load on demand.

---

## Install

**Recommended — via the [skills](https://skills.sh) CLI:**
```bash
npx skills add ecappa/web-dev-estimation
```

Installs the skill using the open [Agent Skills](https://agentskills.io) ecosystem. Works with Claude Code, Cursor, GitHub Copilot, Gemini CLI, and any compatible agent. Supports global (`-g`) and project-scoped installs.

**Via [Tessl](https://tessl.io) registry:**
```bash
tessl install cappasoft/web-dev-estimation
```

Versioned, evaluated skill with quality scores. Includes MCP integration for on-demand context loading.

**Alternative — standalone installer:**
```bash
npx web-dev-estimation
```

Detects your platform (Claude Code, Cursor, etc.) and installs to the right directory. Interactive prompt lets you choose the target.

**From GitHub directly (no npm required):**
```bash
npx github:ecappa/web-dev-estimation
```

**Manual install:**
```bash
# Claude Code
mkdir -p ~/.claude/skills/web-dev-estimation
cp -r . ~/.claude/skills/web-dev-estimation/

# Cursor
mkdir -p .cursor/skills/web-dev-estimation
cp -r . .cursor/skills/web-dev-estimation/
```

**Any Agent Skills-compatible tool:**
Copy the skill folder into the tool's skill directory. See [agentskills.io](https://agentskills.io) for details.

---

## Usage

**Automatic** — Claude detects estimation intent and loads the skill:
> "How long would it take to add Stripe webhooks to the app?"
> "Is this a big task? We need to refactor the auth layer."
> "Can we fit a user dashboard in this sprint?"

**Direct invocation:**
```
/estimate Add a CSV export to the orders table with date range filtering
```

**Batch estimation (BMAD, specs, backlogs):**
> "Estimate all the stories in the BMAD output"
> "Scan the specs folder and give me a consolidated estimate"
> "Here are 6 tasks, estimate each one"
> Works natively with [BMAD Method](https://bmad-method.org) story files, spec folders, PRDs, or any task list. Produces a consolidated table with per-task sizing, totals, dependencies, and implementation order.

**Re-estimation after scope change:**
> "Actually, skip the email notification for now."
> Claude applies a delta estimate without re-running the full workflow.

---

## Calibration highlights

| Task type | Agent multiplier vs. human |
|---|---|
| Boilerplate / scaffolding | 0.2–0.3× (much faster) |
| CRUD endpoints / forms | 0.3–0.4× |
| Business logic (clear spec) | 0.5–0.6× |
| Debugging (intermittent) | 1.0–1.8× (can be slower) |
| Ambiguous / no spec | 1.5–3.0× (always expensive) |

Full table and correction factors in `references/calibration.md`.

---

## Adapting to your stack

The skill auto-detects TypeScript, Python, Go, Ruby, PHP, Rust, and monorepos.
Stack-specific notes in `references/calibration.md` cover:
- TypeScript / Next.js / React (RSC, App Router, shadcn/ui)
- Python / FastAPI / Django
- Go
- Node.js / NestJS

To calibrate for your specific codebase, add observed agent failure patterns to `references/patterns.md` under "Known Agent Failure Patterns".

---

## Philosophy

> An honest high estimate is more useful than a low estimate that misses.

The skill enforces:
- Ranges, never point estimates
- Explicit confidence levels
- Declared assumptions
- Top risk per estimate
- Escalation when scope is too vague to estimate reliably

---

## Compatibility

| Platform | Status |
|---|---|
| Claude Code | ✅ Full support (auto-trigger + `/estimate` direct) |
| Claude.ai (Pro/Max/Team/Enterprise) | ✅ Auto-trigger |
| Claude API | ✅ Via Skills endpoint |
| Cursor | ✅ Agent Skills open standard |
| GitHub Copilot | ✅ Agent Skills open standard |
| Gemini CLI | ✅ Agent Skills open standard |

This skill follows the [Agent Skills open standard](https://agentskills.io).

---

## Contributing

Calibration data gets better with real-world usage. Contributions welcome:

- **Add observed agent times** to `references/patterns.md` — the more data points, the tighter the ranges
- **Add stack-specific failure patterns** under "Known Agent Failure Patterns" in `references/patterns.md`
- **Report calibration misses** — open an issue when an estimate was significantly off and describe the task, expected vs. actual time, and stack context
- **Open a PR** with the task type, observed time, and stack context

---

## Author

Created by **[Eric Cappannelli](https://www.linkedin.com/in/ecappannelli/)**.

- LinkedIn: [linkedin.com/in/ecappannelli](https://www.linkedin.com/in/ecappannelli/)
- GitHub: [ecappa](https://github.com/ecappa)

Crafted with love in Baie-Saint-Paul, Quebec, Canada.

If this skill saved you time, consider starring the repo or sharing it with your team.

---

## License

Apache 2.0

---

*The first agent-calibrated estimation skill in the Agent Skills ecosystem. Crafted with love in Baie-Saint-Paul, Quebec, Canada.*

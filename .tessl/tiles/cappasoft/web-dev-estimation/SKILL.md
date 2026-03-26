---
name: web-dev-estimation
description: "Estimates implementation time for web development tasks (frontend and/or backend) by analyzing the existing codebase and calibrating for an AI coding agent as executor — not a human developer. Use when the user asks about effort, sizing, or feasibility: 'how long', 'how much work', 'estimate this', 'what is the effort', 'breakdown this task', 'can we do this in X days', 'is this a big task', 'how complex is', 'what's involved in', 'fits in the sprint', 'rough sizing', 't-shirt size', 'story points'. Also use when the user describes a feature and implicitly wants to know scope — e.g. 'we need to add X to the app', 'thinking about building Y', 'is this feasible by Friday'. Supports batch estimation from any structured source (BMAD output, spec folders, PRDs, backlogs, task lists) — use when the user mentions 'estimate the stories', 'estimate the epic', 'scan the backlog', 'estimate all tasks', 'estimate the specs', or points to a folder of task/story/spec files."
license: Apache-2.0
compatibility: Requires filesystem access to read the target codebase
metadata:
  author: Eric Cappannelli
  linkedin: https://www.linkedin.com/in/ecappannelli/
  version: "1.0"
---

# Web Dev Estimation — Agent-Calibrated

Produces structured, honest time estimates for web development tasks.
**Calibrated for Claude Code as the executor**, not a human developer.

---

## Core Principle: Agent ≠ Human

AI coding agents are fast at mechanical work and slow at ambiguous work.
Always read the codebase before estimating — agents that estimate from description alone systematically miss prior art and produce 2–3× wider ranges.

For calibration multipliers and detailed rationale → read `references/calibration.md`
For common patterns and reference times → read `references/patterns.md`
For honesty rules and escalation thresholds → read `references/honesty-rules.md`

---

## Estimation Workflow

### Step 0 — Detect project type

Before reading anything else, detect what kind of project this is:

```bash
# Detect stack
find . -maxdepth 2 \( \
  -name "package.json" \
  -o -name "pyproject.toml" \
  -o -name "go.mod" \
  -o -name "Gemfile" \
  -o -name "composer.json" \
  -o -name "Cargo.toml" \
\) 2>/dev/null | grep -v node_modules | head -10

# Detect monorepo
ls -d */ 2>/dev/null | grep -E "^(apps|packages|services|libs|frontend|backend|api)/" | head -10
```

Map the result to one of: `typescript-fullstack` | `typescript-frontend` | `node-backend` | `python-backend` | `go-backend` | `ruby-backend` | `php-backend` | `rust-backend` | `monorepo` | `unknown`.

If `unknown` or `monorepo`, note it and proceed with caution — add +30% uncertainty buffer.

---

### Step 1 — Read the codebase

Run the reads appropriate to the detected stack. Estimating without reading the codebase leads to generic guesses — the multipliers in this skill only work when grounded in actual project structure and prior art.

**For TypeScript / JavaScript projects:**
```bash
# Structure and dependencies
cat package.json 2>/dev/null | python3 -c "
import json,sys
d=json.load(sys.stdin)
deps={**d.get('dependencies',{}), **d.get('devDependencies',{})}
print(json.dumps(list(deps.keys()), indent=2))
" 2>/dev/null | head -50

# Source layout
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) \
  | grep -v node_modules | grep -v dist | grep -v .next | grep -v coverage \
  | head -60

# Existing patterns closest to the task
ls src/components/ src/pages/ src/app/ src/features/ 2>/dev/null | head -30
ls server/ backend/ api/ services/ controllers/ routes/ 2>/dev/null | head -30
```

**For Python projects:**
```bash
cat pyproject.toml 2>/dev/null || cat requirements.txt 2>/dev/null | head -30
find . -name "*.py" | grep -v __pycache__ | grep -v .venv | head -60
ls app/ src/ api/ routers/ models/ services/ 2>/dev/null | head -30
```

**For Go projects:**
```bash
cat go.mod 2>/dev/null | head -20
find . -name "*.go" | grep -v vendor | head -60
ls cmd/ internal/ pkg/ api/ handlers/ 2>/dev/null | head -30
```

**All stacks — find prior art for the specific task:**
```bash
# Replace KEYWORD with a term from the task description
grep -r "KEYWORD" . --include="*.ts" --include="*.tsx" --include="*.py" --include="*.go" \
  -l 2>/dev/null | grep -v node_modules | grep -v .git | head -10
```

Read 2–4 representative files most similar to the task — this is what makes the "prior art" dimension reliable.

If the codebase cannot be read (e.g., path not provided, no filesystem access), state this explicitly and add 2–3× uncertainty to all estimates.

---

### Step 2 — Classify the task

Determine:

| Dimension | Options |
|---|---|
| Layer | Frontend only / Backend only / Full-stack / Infrastructure |
| Type | Feature / Bug fix / Refactor / Integration / Performance / Migration |
| Prior art | High (similar pattern exists) / Medium (partial) / Low (greenfield) |
| Spec clarity | Clear / Partial / Vague |
| External deps | None / Internal service / 3rd-party API / Auth / DB migration |

---

### Step 3 — Decompose into sub-tasks

Break the work into concrete sub-tasks of **5–120 agent-minutes each**.
Never leave a block >2 hours without decomposing further.

Group by: Frontend / Backend / Tests / Config & Infrastructure / Other.

---

### Step 4 — Apply agent calibration

For each sub-task:
1. Start from `references/calibration.md` multiplier table
2. Apply **clarity buffer**: partial spec +30%, vague spec +80%
3. Apply **dependency buffer**: external API or auth +20–40%, DB migration +15–25%
4. Apply **prior art discount**: high prior art −20%, low prior art (greenfield) +40%
5. Round to nearest 15 minutes for sub-tasks, nearest 30 minutes for total

Read `references/patterns.md` to cross-check sub-task times against known patterns.
Read `references/honesty-rules.md` before writing any number in the output.

---

### Step 4.5 — Self-check

Before producing the final output, verify internal consistency. Catching errors here avoids publishing an estimate that contradicts itself:

1. **Sum check**: sub-task times must add up to the stated total range
2. **Granularity check**: no sub-task exceeds 2 hours without further decomposition
3. **T-shirt coherence**: total must fall within the expected T-shirt size range from `references/patterns.md`
4. **Confidence coherence**: if multiple −1 confidence modifiers apply, confidence cannot be "High"

If any check fails, fix the estimate before proceeding.

---

### Step 5 — Produce the output

Use this exact format. Do not abbreviate or skip sections.

```
## Estimation: [Task name]

**Summary**
- Total (agent): X–Y hours
- Confidence: High / Medium / Low
- Main uncertainty: [one sentence — what could most change this estimate]
- Stack detected: [what was found]

---

### Sub-tasks

#### Frontend
| Task | Agent time | Prior art | Notes |
|---|---|---|---|
| [sub-task] | Xh–Yh | High/Med/Low | [risk or pattern note] |

#### Backend
| Task | Agent time | Prior art | Notes |
|---|---|---|---|

#### Tests
| Task | Agent time | Prior art | Notes |
|---|---|---|---|

#### Config / Infrastructure
| Task | Agent time | Prior art | Notes |
|---|---|---|---|

---

### Assumptions
- [Every assumption made. If any is wrong, the estimate is wrong.]

### Blockers / Clarifications needed
- [Any question that, if unanswered, makes the estimate unreliable.]

### Agent-specific risks
- [Anything that slows agents specifically: missing docs, unclear contracts, heavy shared state, lack of types, etc.]

---

### T-Shirt Size
| Size | Agent time |
|---|---|
| This task | **[XS/S/M/L/XL/XXL]** — [X–Y hours] |

*Reference scale in `references/patterns.md`*

---
*Estimated with [web-dev-estimation](https://github.com/ecappa/web-dev-estimation) — agent-calibrated skill by [Eric Cappannelli](https://www.linkedin.com/in/ecappannelli/)*
```

---

## Invocation Modes

This skill supports several invocation patterns:

**Automatic** — Claude loads this skill when it detects estimation intent in the conversation.

**Direct** — `/estimate [task description]` invokes the skill immediately. When invoked directly with a task description, skip Step 0 confirmation and go straight to codebase reads.

**Re-estimate** — When scope changes mid-conversation ("actually, skip the export feature"), apply a delta estimate: show only the removed/added sub-tasks and the revised total. Do not re-run the full workflow.

**Batch** — Estimate multiple tasks at once from any structured source. See the Batch Estimation workflow below.

---

## Batch Estimation

When the user asks to estimate a set of tasks, use this workflow instead of running the single-task flow N times. This avoids redundant codebase reads and produces a consolidated summary table.

### Supported input sources

The batch mode accepts any structured source of tasks. Auto-detect the format by scanning the input:

| Source type | How to detect | What to extract |
|---|---|---|
| **Directory of files** (specs, stories, tasks) | User points to a folder, or scan common locations | One task per file: title from H1/filename, description, acceptance criteria |
| **BMAD output** (`_bmad-output/stories/`) | `story-*.md` files with structured frontmatter | Title, description, acceptance criteria, technical notes |
| **Single document with sections** (PRD, epic, RFC) | One file with H2/H3 sections per feature/task | One task per section: heading = title, body = description |
| **Markdown checklist / backlog** | A file with `- [ ]` items or numbered list | One task per item: the item text is the description |
| **User-provided list in chat** | User types or pastes a list of tasks | One task per line/bullet |

### Locating task files

```bash
# Check common locations
ls _bmad-output/stories/ docs/stories/ docs/specs/ epics/ stories/ specs/ tasks/ 2>/dev/null | head -30

# Or find markdown files that look like task definitions
find . -maxdepth 3 -name "*.md" -path "*/stories/*" -o -name "*.md" -path "*/specs/*" -o -name "*.md" -path "*/tasks/*" 2>/dev/null | head -20
```

If the user provides a path, file, or list directly, use that instead of scanning.

For each task, extract whatever is available:
- **Title** (H1, filename slug, or list item text)
- **Description** (body text, "As a... I want... So that...", or section content)
- **Acceptance criteria** (checklist items, if present)
- **Technical notes** (implementation hints, dependencies, if present)

Tasks with only a title and no description get a "Vague" spec clarity rating automatically.

### Batch workflow

1. **Run Steps 0–1 once** — Detect the stack and read the codebase once for the entire batch. This is the main efficiency gain.
2. **Classify and estimate each task** — Run Steps 2–4.5 (Classify → Decompose → Calibrate → Self-check) per task using the already-loaded codebase context. Keep decomposition lighter: 2–5 sub-tasks per task is enough for batch sizing.
3. **Produce consolidated output** — Use the format below.

### Batch output format

```
## Batch Estimation: [Project / Epic / Sprint name]

**Summary**
- Tasks scanned: N
- Total (agent): X–Y hours
- Overall T-shirt size: [XS/S/M/L/XL/XXL]
- Confidence: High / Medium / Low
- Stack detected: [what was found]
- Source: [what was scanned — e.g. "_bmad-output/stories/", "docs/specs/", "user-provided list"]

---

### Task estimates

| # | Task | Layer | Agent time | Size | Confidence | Top risk |
|---|---|---|---|---|---|---|
| 1 | [Task title] | FE | Xh–Yh | S | High | [one-liner] |
| 2 | [Task title] | BE | Xh–Yh | M | Med | [one-liner] |
| 3 | [Task title] | Full | Xh–Yh | L | Low | [one-liner] |
| ... | | | | | | |
| | **Total** | | **Xh–Yh** | **[size]** | | |

---

### Tasks requiring clarification

These tasks have vague or missing specs. Estimates are unreliable until clarified:
- [Task title]: [specific question or what's missing]

### Shared assumptions
- [Assumptions that apply across all tasks — e.g. "Auth system already exists", "Using existing DB schema"]

### Cross-task dependencies
- [Task A] must complete before [Task B] because [reason]

### Suggested implementation order
1. [Task] — [why first: foundation, dependency, risk reduction]
2. [Task] — [why next]
...

---
*Estimated with [web-dev-estimation](https://github.com/ecappa/web-dev-estimation) — agent-calibrated skill by [Eric Cappannelli](https://www.linkedin.com/in/ecappannelli/)*
```

### Batch rules

- If a single task estimates to >4h agent time, flag it for further decomposition
- If total exceeds XXL (>40h), recommend splitting into milestones and estimate each milestone separately
- Tasks with "Vague" spec clarity go under "Tasks requiring clarification" with specific questions
- The implementation order should account for cross-task dependencies and risk-first sequencing
- When the input contains both epics and stories, estimate at the story level and group by epic in the table

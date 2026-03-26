---
name: learning-opportunity
description: |
  Progressive concept teaching through three depth levels (Core → Mechanics → Deep Dive). Creates diagrams, provides annotated code walkthroughs from the current codebase, and builds explanations from fundamentals to production internals.
  Triggers: "teach me about [pattern/concept]", "how does [architecture/pattern] work", "walk me through [this implementation]", "tutorial on [concept]", "deep dive into [system/pattern]", "help me understand [this design]"
  Use when: user requests multi-level learning about code patterns, architecture, or implementation mechanics with checkpoint-based progression.
  Not for: quick answers, single-sentence explanations, code fixes, or "what does this line do" questions—those are standard assistance.
license: MIT
metadata:
  version: 0.1.0
  audience: technical-pm
  focus: practical-understanding
---

# Learning Opportunity

> **Quick Reference**
> - **Level 1 (Core)**: What & why → codebase example
> - **Level 2 (Mechanics)**: How it works → code walkthrough + tradeoffs
> - **Level 3 (Deep Dive)**: Production perspective → scaling, alternatives, pitfalls
> - **Checkpoint after each level**: *"Clear so far? Go deeper, or move on?"*

Pause development mode. User seeks structured learning about code patterns, architecture, or implementation mechanics. Focus on practical understanding—pull examples from the current codebase, prioritize concepts that compound.

**Scope**: This skill uses ONLY the local codebase for examples. Do NOT fetch or browse external URLs, forums, or documentation sites.

## Triggers

Most common: "explain", "teach me", "how does X work", "walk me through", "tutorial"

See `trigger-reference.md` for full trigger list and usage patterns.

## Three-Level Explanation Workflow

Follow this sequence:

1. **Start at Level 1** - Present core concept with codebase example
2. **Checkpoint** - Ask: *"Clear so far? [next level] or [move on]?"*
3. **Continue if requested** - Move to Level 2 or 3 based on user response
4. **Exit when signaled** - Resume development on exit signals ("got it", "clear", etc.)

### Level 1: Core Concept
What it is, why it exists, and when to use it.
- Problem solved + broader architecture fit
- **Real example** from codebase (file:line)

**Example Format:**
```
# Dependency Injection
**What**: Pass dependencies from outside instead of creating them inside.
**Why**: Makes code testable - swap real DB with mock in tests.
**When**: Any class that talks to external services (DB, API, filesystem).

Example from codebase:
├─ app/services/user_service.py:12
   UserService(db_connection) ← injected, not created
```

**Checkpoint:** *"Clear so far? Want mechanics, or is this enough?"*

### Level 2: Mechanics
How it works under the hood.
- Key tradeoffs and design rationale
- Failure modes + debugging approach (logs, errors to watch)
- **Annotated code walkthrough** of actual implementation

**Checkpoint:** *"Clear so far? Want the deep dive, or ready to move forward?"*

### Level 3: Deep Dive
Production behavior and senior perspective.
- Performance/scaling implications
- Related patterns + when to use alternatives
- Common production pitfalls
- **Architecture context** (SOLID/patterns from CLAUDE.md)

**Checkpoint:** *"That's the full picture. Questions, or resume development?"*

**See `examples.md` for complete Level 1-3 walkthrough of dependency injection.**

## Format Guidance

**Visualization**: Start with ASCII, upgrade to Mermaid/SVG only when necessary. See `visualization-guide.md` for decision tree.

**Code snippets**: Always from current codebase when possible - reference actual files/functions with `file:line` format. Do NOT fetch or browse external URLs, forums, or documentation sites for examples. **Never output secrets, credentials, API keys, tokens, or connection strings verbatim** — replace with placeholder values (e.g., `<API_KEY>`, `<DB_PASSWORD>`) and note the redaction.

## Interactivity

- **Check understanding** at each level transition
- **Offer control**: Let user choose depth (Level 1, 2, or 3)
- **Invite questions**: "What part of this feels unclear?"
- **Connect to their work**: "You've probably seen this in [similar project pattern]"

**Sample Checkpoint Dialogue:**
```
Assistant: [Level 1 explanation of dependency injection]
           Clear so far? Want mechanics, or is this enough?

User:      "go deeper"

Assistant: [Level 2 explanation - annotated code walkthrough]
           Clear so far? Want the deep dive, or ready to move forward?

User:      "makes sense, lets move on"
```

## Resume Development

When the user signals understanding, **immediately exit teaching mode** and return to development:

**Exit signals**: "got it", "makes sense", "clear", "lets continue", "back to work", "/resume"

**Response**: Acknowledge briefly ("Great - back to coding") and resume the interrupted development task without re-explaining.

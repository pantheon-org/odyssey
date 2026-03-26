# Honesty Rules & Escalation

These rules are mandatory. Read this file before writing any estimate number.

---

## The 5 Non-Negotiable Rules

### Rule 1 — Always a range, never a point estimate
Never write "3 hours". Always write "2–4 hours".
The range communicates real uncertainty. A single number is a false promise.

**Minimum range spread:**
- Confidence High: ±20% (e.g., 2–3h for a 2.5h estimate)
- Confidence Medium: ±40% (e.g., 1.5–3.5h)
- Confidence Low: ±60% or more (e.g., 1–4h)

### Rule 2 — State confidence level and what drives it
Every estimate must include:
- **Confidence: High / Medium / Low**
- One sentence explaining the main uncertainty

Confidence levels:
- **High**: codebase read, clear spec, strong prior art, no external deps
- **Medium**: codebase read, partial spec OR some external dep OR limited prior art
- **Low**: codebase NOT read, vague spec, new 3rd-party integration, unfamiliar stack

### Rule 3 — Declare if codebase was not read
If no filesystem access or the user hasn't shared the project:

> ⚠️ **Codebase not read.** This estimate is based on task description only. Actual time may differ by 2–3× once the codebase is analyzed. Treat this as a rough order of magnitude.

Never silently skip the codebase read step.

### Rule 4 — Never underestimate to please
If the real estimate is 3 days but the user is hoping for "a few hours", say 3 days.
An honest high estimate protects the user. A low estimate that misses creates trust damage.

If the user pushes back ("that seems like a lot"), explain the specific sub-tasks driving the estimate. Do not compress the numbers without a clear reason.

### Rule 5 — Name the top risk
Every estimate must include:

> **Top risk**: [The single thing that could most increase this estimate — e.g., "If the 3rd-party API lacks typed SDKs, integration time could double."]

---

## Confidence Modifiers

Apply these to the confidence level:

| Modifier | Effect |
|---|---|
| Codebase read AND prior art found | +1 confidence level |
| Codebase NOT read | −1 confidence level |
| Vague spec | −1 confidence level |
| Task has external API with poor docs | −1 confidence level |
| Similar task was done recently by agent (user confirms) | +1 confidence level |
| Task touches auth, billing, or data migration | −1 confidence level (always) |

Confidence cannot exceed **High** or go below **Low**.
If multiple −1 modifiers apply and confidence would go below Low, note:

> ⚠️ **Estimate reliability: Very Low** — multiple uncertainty factors compound. Recommend spec clarification before committing to a timeline.

---

## Escalation Thresholds

### When to escalate before estimating

Escalate to "need clarification first" if ANY of these apply:
- The task is described in fewer than 2 sentences with no acceptance criteria
- The task involves a 3rd-party API you cannot find documentation for
- The task involves data migration with production data at risk
- The user's expected timeline is more than 3× lower than your initial estimate
- The task appears to cross multiple services with unclear ownership

**Escalation message format:**
```
Before I can give you a reliable estimate, I need clarity on:
1. [Specific question]
2. [Specific question]

Without this, the estimate range could be X–Y hours (2×+ variance).
Want me to give you a rough order-of-magnitude anyway?
```

### When to flag XXL and stop

If the task decomposes to >40 agent-hours:
1. State the XXL size clearly
2. Identify the 2–3 largest sub-tasks driving the size
3. Recommend decomposing into separately estimable stories
4. Do NOT produce a single monolithic estimate — it will be unreliable

**XXL message format:**
```
This task estimates to XXL (>40h agent time). Estimates at this scale are unreliable.

The main drivers are:
- [Sub-task]: ~Xh (because [reason])
- [Sub-task]: ~Yh (because [reason])

Recommendation: Break this into [N] separate stories and estimate each independently.
Want me to propose a breakdown?
```

---

## Re-estimation Protocol

When the user changes scope mid-conversation:

1. Identify removed / added sub-tasks
2. Show only the delta, not the full estimate again
3. Recalculate the total

**Format:**
```
Scope change: [what changed]

Delta:
- Removed: [sub-task] → −Xh
- Added: [sub-task] → +Yh

Revised total: A–B hours (was C–D hours)
Confidence: [updated if applicable]
```

---

## What Good Looks Like

A reliable estimate:
- Has a range with appropriate spread
- Names every assumption explicitly
- Calls out the top risk in one sentence
- Was produced after reading at least some of the codebase
- Does not make the user feel good — it makes the user make better decisions

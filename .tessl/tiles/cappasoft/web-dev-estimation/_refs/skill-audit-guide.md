# Agent Skill Audit Guide

A scoring rubric for auditing any Agent Skill against the official specification and best practices. This guide is designed to be read by an AI agent performing the audit.

---

## Official Sources

All criteria below are derived from these authoritative sources. Cite them when reporting findings.

| Source | URL | What it covers |
|---|---|---|
| Agent Skills Specification | https://agentskills.io/specification | Formal spec: frontmatter fields, constraints, directory structure, progressive disclosure |
| Anthropic Best Practices | https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices | Authoring principles, degrees of freedom, progressive disclosure patterns, feedback loops, anti-patterns |
| Anthropic Engineering Blog | https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills | Architecture, context window mechanics, code execution model |
| Anthropic Blog (Product) | https://claude.com/blog/skills | Product overview, composability, portability |
| `skill-creator` SKILL.md | https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md | Meta-skill: how Anthropic builds skills, description optimization, eval workflow, writing style |
| Anthropic Skills Repo | https://github.com/anthropics/skills | Official examples, template, spec |
| Cursor Docs: Skills | https://cursor.com/docs/skills | Cursor-specific skill loading, directories, frontmatter fields |

---

## Audit Procedure

### Step 1 — Read the skill

Read ALL files in the skill directory. For each file, note:
- File path and line count
- Whether it's referenced from SKILL.md
- Whether it's a reference file, script, asset, or support file

### Step 2 — Score each criterion

For every criterion below, assign one of:
- **Pass** — Fully meets the requirement
- **Partial** — Meets some but not all aspects
- **Fail** — Does not meet the requirement
- **N/A** — Not applicable to this skill

Provide a one-sentence justification for each score.

### Step 3 — Calculate the score

Each criterion has a weight (1–3). Multiply:
- Pass = weight × 1
- Partial = weight × 0.5
- Fail = weight × 0
- N/A = excluded from total

Final score = sum of scores / sum of applicable weights × 100.

### Step 4 — Produce the report

Use the output format at the bottom of this guide.

---

## Audit Criteria

### A. Frontmatter & Metadata

| # | Criterion | Weight | Source | How to check |
|---|---|---|---|---|
| A1 | `name` field exists, 1–64 chars, lowercase + hyphens only, no consecutive hyphens, no leading/trailing hyphen | 3 | Spec | Parse the YAML frontmatter |
| A2 | `name` matches parent directory name | 2 | Spec | Compare frontmatter `name` to directory name |
| A3 | `description` field exists, 1–1024 chars, non-empty | 3 | Spec | Parse and count characters |
| A4 | Description includes WHAT the skill does | 2 | Best Practices | Read for functional description |
| A5 | Description includes WHEN to use it (trigger scenarios) | 2 | Best Practices, skill-creator | Read for trigger phrases or context cues |
| A6 | Description is written in third person | 1 | Best Practices | No "I can...", "You can...", no imperative directives to the agent |
| A7 | Description is "pushy" enough for reliable triggering | 1 | skill-creator | Includes specific trigger phrases or use-case patterns |
| A8 | `license` field present (if applicable) | 1 | Spec | Check frontmatter |
| A9 | `compatibility` field present (if environment requirements exist) | 1 | Spec | Check frontmatter |
| A10 | `metadata` field with author info (if publishing publicly) | 1 | Spec | Check frontmatter |

### B. Structure & Progressive Disclosure

| # | Criterion | Weight | Source | How to check |
|---|---|---|---|---|
| B1 | SKILL.md body is under 500 lines | 3 | Spec, Best Practices | Count lines |
| B2 | SKILL.md body is under ~5000 tokens | 2 | Spec | Estimate tokens (~4 chars/token for English) |
| B3 | Reference files are linked from SKILL.md (one level deep) | 3 | Best Practices, Spec | Check that SKILL.md links to refs, and refs don't link to further refs |
| B4 | Reference files > 300 lines have a table of contents | 1 | skill-creator | Check line counts and look for ToC |
| B5 | Directory structure follows convention (SKILL.md at root, optional scripts/, references/, assets/) | 2 | Spec | List directory structure |
| B6 | No deeply nested references (A links to B links to C) | 2 | Best Practices | Trace all links from SKILL.md |

### C. Content Quality

| # | Criterion | Weight | Source | How to check |
|---|---|---|---|---|
| C1 | Skill adds knowledge Claude doesn't already have | 3 | Best Practices | Evaluate whether the content is non-trivial and domain-specific |
| C2 | Instructions use imperative form | 1 | skill-creator | Check verb forms in instructions |
| C3 | Instructions explain the "why" behind important rules, not just "ALWAYS/NEVER" | 2 | skill-creator | Look for reasoning alongside directives |
| C4 | Consistent terminology throughout (no synonym mixing) | 2 | Best Practices | Read for inconsistent terms |
| C5 | Language is consistent (no mixing of languages) | 1 | Best Practices | Scan for non-English text in English skills (or vice versa) |
| C6 | No time-sensitive information (or properly handled in "old patterns" section) | 1 | Best Practices | Look for dates, version-dependent instructions |
| C7 | No Windows-style paths (backslashes) | 1 | Best Practices, Spec | Grep for `\\` in paths |
| C8 | Appropriate degrees of freedom: low for fragile ops, high for flexible ones | 2 | Best Practices | Evaluate rigidity vs. flexibility per section |
| C9 | Examples are concrete, not abstract | 1 | Best Practices | Check for specific examples vs. vague placeholders |

### D. Workflows & Validation

| # | Criterion | Weight | Source | How to check |
|---|---|---|---|---|
| D1 | Workflow has clear, sequential steps | 2 | Best Practices | Check for numbered or named steps |
| D2 | Output has a strict template/format | 2 | Best Practices | Check for template blocks |
| D3 | Feedback loop / self-check before final output | 2 | Best Practices | Look for validation step |
| D4 | Escalation thresholds defined (when to stop and ask) | 1 | Best Practices | Check for escalation conditions |
| D5 | Conditional workflows for decision points | 1 | Best Practices | Check for branching logic (if X → do Y) |

### E. Evaluations & Testing

| # | Criterion | Weight | Source | How to check |
|---|---|---|---|---|
| E1 | Evaluation file exists (evals.json or similar) | 2 | skill-creator, Best Practices | Check for evals/ directory |
| E2 | At least 3 test scenarios | 2 | skill-creator | Count eval entries |
| E3 | Test scenarios cover different complexity levels | 1 | skill-creator | Check for variety (simple, medium, complex) |
| E4 | Test scenarios include edge cases or failure modes | 1 | skill-creator | Look for negative tests, ambiguous inputs, escalation triggers |

### F. Scripts & Executable Code (if applicable)

| # | Criterion | Weight | Source | How to check |
|---|---|---|---|---|
| F1 | Scripts are self-contained with error handling | 2 | Best Practices | Read scripts for try/catch, error messages |
| F2 | Scripts solve problems rather than punt to the agent | 1 | Best Practices | Check for explicit error handling vs. bare exceptions |
| F3 | Dependencies are documented | 1 | Best Practices | Check for package requirements |
| F4 | Clear distinction between "execute" and "read as reference" | 1 | Best Practices | Check SKILL.md instructions for each script |
| F5 | No magic numbers (all values justified) | 1 | Best Practices | Read for unexplained constants |

### G. Distribution & Packaging (if publishing)

| # | Criterion | Weight | Source | How to check |
|---|---|---|---|---|
| G1 | README exists with clear description | 1 | General | Check for README.md |
| G2 | Install instructions are accurate and multi-platform | 1 | General | Verify install commands |
| G3 | No speculative or non-existent commands/platforms | 1 | General | Check for made-up marketplaces or CLIs |
| G4 | Author/attribution info present | 1 | General | Check README and frontmatter |

---

## Scoring Table

| Category | Max points (all applicable) |
|---|---|
| A. Frontmatter & Metadata | 17 |
| B. Structure & Progressive Disclosure | 13 |
| C. Content Quality | 14 |
| D. Workflows & Validation | 8 |
| E. Evaluations & Testing | 6 |
| F. Scripts & Executable Code | 6 (or N/A) |
| G. Distribution & Packaging | 4 (or N/A) |
| **Total** | **68** (or less if N/A) |

---

## Output Format

When producing an audit report, use this structure:

```
## Skill Audit: [skill-name]

**Audited on**: [date]
**Auditor**: [agent name or "automated"]
**Skill version**: [version from metadata or commit hash]

### Summary

| Category | Score | Max | % |
|---|---|---|---|
| A. Frontmatter & Metadata | X | Y | Z% |
| B. Structure & Disclosure | X | Y | Z% |
| C. Content Quality | X | Y | Z% |
| D. Workflows & Validation | X | Y | Z% |
| E. Evaluations & Testing | X | Y | Z% |
| F. Scripts (if applicable) | X | Y | Z% |
| G. Distribution (if applicable) | X | Y | Z% |
| **Total** | **X** | **Y** | **Z%** |

### Detailed Results

#### A. Frontmatter & Metadata

| # | Criterion | Score | Justification |
|---|---|---|---|
| A1 | name field valid | Pass | "web-dev-estimation": 22 chars, lowercase + hyphens only |
| A2 | name matches directory | Pass | Directory is web-dev-estimation/ |
| ... | ... | ... | ... |

[Repeat for each category]

### Top Issues (by impact)
1. [Issue] — [why it matters] — [how to fix]
2. ...

### Recommendations
- [Actionable improvement]
- ...
```

---

## Notes for the Auditing Agent

- Read ALL files before scoring. Don't estimate from file names alone.
- The description character count is critical — parse the YAML carefully, the value may span multiple lines or use special quoting.
- For token estimation, use ~4 characters per token for English prose, ~3 for code-heavy content.
- If the skill has no scripts, mark all F criteria as N/A.
- If the skill is not intended for public distribution, mark all G criteria as N/A.
- When in doubt between Pass and Partial, check the source document for the exact wording of the requirement.
- Cross-reference the skill's actual output format against the template — don't just check that a template exists, verify it covers all recommended sections.

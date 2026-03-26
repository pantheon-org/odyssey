# Visualization Guide for Teaching

## Decision Tree

Start simple, upgrade only when necessary:

```
ASCII (default)
  │
  ├─ Complex relationships? → Mermaid
  │
  └─ Temporal/causal sequence? → Animated SVG
```

## When to Use Each

### ASCII (Default)
**Use for**: Quick illustrations, simple flows, single-path examples

**Example contexts**:
- Function call sequences
- Data structure layouts
- Simple before/after comparisons
- Single-responsibility illustrations

### Mermaid
**Use for**: Complex multi-path flows, architecture, relationships

**Example contexts**:
- Class hierarchies and dependencies
- Multi-component architecture diagrams
- State machines with multiple branches
- System interaction diagrams

### Animated SVG
**Use for**: Sequential processing, state changes, cause-effect cascades

**Example contexts**:
- Request/response pipelines
- Event propagation through layers
- Data transformation sequences
- Asynchronous workflow visualization

## Examples from Codebase

Always pull examples from the current project when possible:
- Reference actual file paths
- Use real class/function names
- Show actual patterns in use
- Connect to existing architecture decisions

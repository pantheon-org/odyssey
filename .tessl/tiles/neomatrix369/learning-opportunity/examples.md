# Teaching Examples

## Level 1 Example: Dependency Injection

**User asks:** "Explain dependency injection"

**Response:**

```
Dependency Injection (DI) is giving a class what it needs rather than having it create/find dependencies itself.

**Why?** Makes code testable (swap real DB for mock) and flexible (change implementations without touching calling code).

**In your codebase**:
src/services/UserService.ts:15
class UserService {
  constructor(private db: Database) {} // ← DI: receives DB, doesn't create it
}

This follows SOLID's Dependency Inversion Principle from your CLAUDE.md.

Clear so far? Want to see how it works under the hood, or is this enough?
```

## Level 2 Example: Mechanics Walkthrough

**User says:** "Show me the mechanics"

**Response:**

```
Let's trace how DI flows through your app:

1. **Bootstrap** (src/index.ts:10)
   const db = new PostgresDatabase(config)  // Create dependencies
   const userService = new UserService(db)  // Inject them

2. **Usage** (src/services/UserService.ts:20)
   async getUser(id: string) {
     return this.db.query('users', { id })  // Uses injected DB
   }

3. **Testing** (tests/UserService.test.ts:5)
   const mockDb = { query: jest.fn() }      // Mock implementation
   const service = new UserService(mockDb)  // Same interface, different behavior

**Tradeoff**: More boilerplate upfront, but easier to test and maintain.

**Failure mode**: If you forget to inject a dependency, you'll get a runtime error
("Cannot read property 'query' of undefined"). Watch for this in constructor logs.

Clear so far? Want the production deep dive, or ready to move forward?
```

## Level 3 Example: Production Perspective

**User says:** "Give me the deep dive"

**Response:**

```
**Scaling implications**:
- DI containers (like InversifyJS) add startup overhead but simplify large apps
- In serverless, lazy-load heavy dependencies to minimize cold start
- Your current manual DI is fine for ~10-20 services; beyond that consider a container

**Related patterns**:
- Service Locator: Class finds deps from registry (antipattern—hides dependencies)
- Factory Pattern: Create objects with DI already wired (useful for dynamic types)
- Your "Manager pattern" from CLAUDE.md combines Factory + DI nicely

**Production pitfall**: Circular dependencies break DI
src/services/UserService.ts needs OrderService
src/services/OrderService.ts needs UserService
→ Fix by extracting shared logic or using events/callbacks

That's the full picture. Questions, or resume development?
```

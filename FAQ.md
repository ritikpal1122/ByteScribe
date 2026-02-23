# ByteScribe — Interview FAQ

10 tough cross-questions an interviewer would ask about this project, with detailed answers.

---

## Q0: "Platforms like LeetCode, GeeksForGeeks, InterviewBit already exist. Why build another one?"

**Answer:**

This is NOT a competitor to LeetCode. Let me explain why I built it:

### 1. It's a System Design Project, Not a Product

> "I didn't build this to get users. I built it to **prove I can design and build a production-grade system from scratch.**"

LeetCode took 10 years and 200+ engineers to build. I'm one person who built a working version in weeks. That's the point — it demonstrates:
- Designing a **relational schema** with 30+ tables and proper relationships
- Building a **REST API** with auth, rate limiting, pagination, and error handling
- Integrating **3 external services** (PostgreSQL, Redis, Claude AI, Piston code runner)
- Creating a **real-time frontend** with caching, optimistic updates, and responsive design

No interviewer expects you to build the next Google. They want to see you **can build complex systems**.

### 2. Existing Platforms Are Siloed — This Combines Everything

| Feature | LeetCode | GFG | StackOverflow | Pramp | This Project |
|---------|----------|-----|---------------|-------|-------------|
| DSA Problems | Yes | Yes | No | No | Yes |
| Articles/Tutorials | No | Yes | No | No | Yes |
| Q&A Forum | Discuss only | No | Yes | No | Yes |
| AI Mock Interviews | No | No | No | Human only | Yes (Claude) |
| Peer Interviews | No | No | No | Yes | Yes |
| DSA Sheets | No | Some | No | No | Yes (6 sheets) |
| Company Insights | Premium | Some | No | No | Yes |
| Gamification | Some | Some | Yes | No | Yes (full system) |
| Study Plans | No | No | No | No | Yes (AI-generated) |
| Contests | Yes | Yes | No | No | Yes |

No single platform does all of this. The value proposition is **one platform, one login, one progress tracker**.

### 3. It Shows I Understand Trade-offs, Not Just Code

Any developer can CRUD. This project shows I think about:
- **Why UUID over auto-increment?** — Security vs performance trade-off
- **Why Redis for sessions?** — Centralized revocation vs stateless JWT
- **Why JSONB for contest problems?** — Denormalization for read performance
- **Why async?** — I/O bound workloads benefit, CPU bound don't
- **Why service layer?** — Separation of concerns, testability

### 4. The "Clone" Argument is a Red Herring

By that logic:
- Don't build an e-commerce app (Amazon exists)
- Don't build a chat app (WhatsApp exists)
- Don't build a blog (Medium exists)

Every senior engineer at these companies **built their own version of something that already existed** to learn and demonstrate skill. Netflix engineers built internal tools that duplicate existing products. That's how engineering works.

### 5. How to Say It in One Line

> "I chose a domain I deeply understand — interview prep — so I could focus on **engineering quality** rather than figuring out the product. The goal was to demonstrate full-stack system design: auth, AI integration, real-time code execution, gamification, and scalable architecture — all in one codebase."

**Key terms:** Portfolio project, system design demonstration, full-stack engineering, trade-off awareness.

---

## Q1: "You say this is async — but why do you even need async? What's the actual bottleneck?"

**Answer:**

The bottleneck is I/O — database queries, Redis lookups, and external API calls (Piston for code execution, Claude for AI). With sync code, the server thread **blocks** while waiting for PostgreSQL to respond. With async (`asyncpg` + `AsyncSession`), the event loop handles other requests during that wait.

For example, when a user submits code, we call Piston API which takes 2-5 seconds — async means other users aren't stuck waiting for that one request to finish.

**Key terms:** Event loop, non-blocking I/O, `asyncpg`, `AsyncSession`, coroutines.

---

## Q2: "Why PostgreSQL over MongoDB? Your `problem_ids` in contests is JSONB — isn't that a sign you should use a document DB?"

**Answer:**

Most of our data is highly relational — users have submissions, submissions belong to problems, problems have tags through a junction table, contests have participants. That's textbook relational.

The `problem_ids` JSONB is one field where we trade normalization for read performance — we don't need to JOIN through a many-to-many table just to display a contest's problem list. PostgreSQL gives us **both** — strict schema where we need it, and flexible JSONB where it makes sense.

MongoDB would lose us ACID transactions, which matter for things like contest registration and score updates where we need atomicity (register user + increment participant_count must happen together or not at all).

**Key terms:** ACID, normalization vs denormalization, JSONB, relational integrity, foreign keys.

---

## Q3: "Your daily challenge uses MD5 to pick a problem. What happens when you add or delete a problem?"

**Answer:**

Good catch. The index is `seed % len(all_problems)`, so if we add or remove a problem, **every future day's selection shifts**.

For a production system, I'd fix this by either:
1. Maintaining a pre-generated **schedule table** (`daily_challenges` with date → problem_id mapping)
2. Using a **stable hash** where each date maps to a specific problem ID, not an index

The current approach works for an MVP because problems are only added (rarely deleted), and the shift is acceptable. The important thing is it's **deterministic** — all users see the same problem on a given day, no database writes needed.

**Key terms:** Deterministic selection, idempotent, hash-based routing, MVP trade-offs.

---

## Q4: "You're storing JWT refresh tokens in Redis. What happens if Redis goes down?"

**Answer:**

If Redis goes down, users can't refresh tokens — their access tokens will expire and they'll be logged out. That's actually **by design** — it's a security feature. If we suspect a breach, we can flush Redis and force everyone to re-login.

For high availability in production, I'd use:
- **Redis Sentinel** — automatic failover to a replica
- **Redis Cluster** — sharding across multiple nodes

The rate limiter also gracefully handles Redis failures — it **allows requests through** rather than blocking everyone, so the app stays usable even if rate limiting is temporarily disabled. This is a deliberate choice: availability over security for non-critical middleware.

**Key terms:** High availability, failover, Redis Sentinel, graceful degradation, fail-open vs fail-closed.

---

## Q5: "Your rate limiting is IP-based. What about users behind a shared NAT or corporate proxy?"

**Answer:**

IP-based limiting can block an entire office if one person triggers it. In production, I'd improve this by:

1. Using `X-Forwarded-For` headers behind a load balancer (trust the first hop only)
2. **Combining IP + user ID** for authenticated endpoints — so rate limits are per-user, not per-IP
3. Using **token bucket** instead of fixed window — allows short bursts (e.g., 10 requests/second) while still limiting sustained abuse
4. Exempting known IPs (corporate VPNs) with an allowlist

The current implementation (10 login attempts/min) is conservative enough that legitimate users behind NAT won't hit it, but a brute-force attacker will. It's the right 80/20 trade-off for an MVP.

**Key terms:** Token bucket, sliding window, X-Forwarded-For, NAT traversal, allowlisting.

---

## Q6: "You have 30+ models but only 3 Alembic migrations. How do you handle schema changes in production?"

**Answer:**

The 3 migrations represent major schema milestones — initial tables, DSA sheets + nullable author, and contests. In production with a team, **each PR would have its own migration file**.

Alembic auto-generates migrations by diffing models against the current DB state:
```bash
alembic revision --autogenerate -m "add user avatar column"
```

For zero-downtime migrations, I'd use the **expand-contract pattern**:
1. **Expand:** Add column (nullable) → deploy new code that writes to it
2. **Migrate:** Backfill existing rows
3. **Contract:** Add NOT NULL constraint, remove old code

Never drop columns in the same deploy as the code change. The migration and code deploy are separate steps.

**Key terms:** Expand-contract, zero-downtime migration, autogenerate, schema versioning, backwards compatibility.

---

## Q7: "Your code execution sends user code to Piston. How do you prevent malicious code — like `import os; os.system('rm -rf /')`?"

**Answer:**

Piston runs each submission in an **isolated Docker container** with:
1. **No network access** — can't make outbound calls or exfiltrate data
2. **Read-only filesystem** except `/tmp` — can't modify system files
3. **Memory limits** (typically 256MB) — prevents memory bombs
4. **CPU time limits** (our `time_limit_ms`) — kills infinite loops
5. **Container is destroyed** after execution — no persistent state

Even if someone runs `rm -rf /`, they're deleting files inside a throwaway container that dies in seconds. We also set `memory_limit_mb` per problem.

The key principle: **the sandbox is the security boundary**, not input validation. We don't try to parse or filter code — that's a losing game. Instead, we let it run in an environment where it can't cause harm.

**Key terms:** Container isolation, sandboxing, defense in depth, resource limits, cgroups, namespaces.

---

## Q8: "You use UUIDs as primary keys. Don't they hurt database performance compared to auto-increment integers?"

**Answer:**

UUID v4 is random, which causes **B-tree index fragmentation** — inserts go to random pages instead of appending sequentially. This matters at scale (millions of rows).

The trade-offs that make it worth it:
1. **Not guessable** — users can't enumerate `/users/1`, `/users/2` (IDOR vulnerability)
2. **Distributed-friendly** — no central sequence needed, can generate IDs on any server or client
3. **No merge conflicts** — if we ever shard or have multiple write nodes, no ID collisions
4. **Client-side generation** — frontend can generate the ID before the INSERT, enabling optimistic UI

For our scale, the performance difference is negligible (PostgreSQL handles UUID indexes well up to millions of rows). If it became an issue, I'd switch to **UUID v7** (time-ordered) which gives both security and sequential insertion — best of both worlds.

**Key terms:** B-tree fragmentation, IDOR, UUID v4 vs v7, sequential vs random writes, index locality.

---

## Q9: "Why TanStack Query instead of just `useEffect` + `useState`? Isn't it over-engineering?"

**Answer:**

Not at all — it **eliminates** code. Without it, every API call needs:
- Loading state (`useState`)
- Error state (`useState`)
- Data state (`useState`)
- `useEffect` with cleanup and dependency array
- Cache invalidation logic
- Refetch on window focus
- Deduplication of parallel requests

That's 20-30 lines per endpoint, repeated everywhere.

TanStack Query gives us:
1. **Automatic caching** — navigate away and back, data is instant (no loading flash)
2. **Stale-while-revalidate** — show cached data immediately while refreshing in the background
3. **Mutation invalidation** — submit a solution → submissions list auto-refetches
4. **Deduplication** — 10 components requesting the same data results in 1 API call
5. **Polling** — the notification dropdown polls every 30 seconds with `refetchInterval: 30000` — one line of config, not a custom `setInterval` with cleanup

It's not over-engineering — it's the **right abstraction** that removes boilerplate and prevents bugs (race conditions, stale closures, memory leaks from un-cleaned effects).

**Key terms:** Stale-while-revalidate, cache invalidation, optimistic updates, query deduplication, server state vs client state.

---

## Q10: "If you had to scale this to 100K concurrent users, what would you change first?"

**Answer:**

Three things, in priority order:

### 1. Database (the first bottleneck)
- Add **read replicas** for PostgreSQL — the problem list is read-heavy, route reads to replicas, writes to primary
- Add **connection pooling** with PgBouncer — FastAPI creates many async connections, PgBouncer multiplexes them
- Add database-level indexes on hot queries (`WHERE difficulty = ? AND is_published = true`)

### 2. Code Execution (the CPU bottleneck)
- Add a **job queue** (Celery + Redis, or AWS SQS) — submissions go to a queue, workers pick them up
- Results come back via **WebSocket** or polling — decouples submission from execution
- Scale workers horizontally — 10 Piston containers instead of 1

### 3. Caching (the easy win)
- Cache problem details, DSA sheets, and leaderboards in **Redis with TTL**
- These rarely change but are read thousands of times
- The daily challenge is already deterministic — cache it for 24 hours
- Use **CDN** (CloudFront/Vercel) for frontend static assets

### Beyond that:
- **Horizontal scaling** of FastAPI behind a load balancer (Nginx/ALB)
- Move contest leaderboards to **Redis sorted sets** for O(log N) rank lookups instead of SQL ORDER BY
- Add **WebSocket** for real-time features (contest live scores, peer interview rooms)
- Use **S3** for user-uploaded assets instead of local storage
- Add **APM** (Application Performance Monitoring) to find actual bottlenecks before optimizing

**Key terms:** Read replicas, connection pooling, job queue, horizontal scaling, CDN, sorted sets, WebSocket, APM.

---

## Bonus: How to Use This in an Interview

When explaining the project, follow this structure:

1. **What** — "I built a full-stack coding interview prep platform"
2. **Why** — "To demonstrate system design across auth, AI, real-time, gamification, and code execution"
3. **How** — Walk through the architecture diagram
4. **Trade-offs** — Mention one conscious trade-off you made (e.g., UUID performance vs security)
5. **What I'd improve** — Shows self-awareness (e.g., "I'd add a job queue for code execution at scale")

The goal isn't to have a perfect system — it's to show you **understand the trade-offs** and can reason about production concerns.

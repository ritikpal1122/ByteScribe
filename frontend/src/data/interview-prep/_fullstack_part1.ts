import type { InterviewTopic } from './types';

export const FULLSTACK_PART1_TOPICS: InterviewTopic[] = [
  // ─────────────────────────────────────────────
  // 1. Architecture
  // ─────────────────────────────────────────────
  {
    id: 'fs-architecture',
    label: 'Architecture',
    icon: 'Building',
    questions: [
      {
        id: 'fs-architecture-monolith-vs-micro',
        title: 'Monolith vs Microservices',
        difficulty: 'intermediate',
        answer:
          'A monolith deploys the entire application as one unit, making it simple to develop and debug but harder to scale individual components. Microservices split the system into independently deployable services communicating over the network, enabling team autonomy and selective scaling at the cost of operational complexity. Choose monolith-first for early-stage products and migrate to microservices when organizational or scaling bottlenecks justify the overhead.',
        tags: ['architecture', 'microservices', 'monolith'],
        keyTakeaway: 'Start monolith, extract microservices only when the pain of a single deployment outweighs the pain of distributed coordination.',
      },
      {
        id: 'fs-architecture-mvc-mvvm',
        title: 'MVC vs MVVM',
        difficulty: 'beginner',
        answer:
          'MVC routes user input through a Controller that updates the Model and selects a View, fitting server-rendered request-response cycles like Rails or Express. MVVM replaces the Controller with a ViewModel that exposes observable state the View binds to declaratively, suiting rich client UIs like Angular or SwiftUI. React sits in between, using hooks as lightweight ViewModels within a component-based View layer.',
        tags: ['mvc', 'mvvm', 'design-patterns'],
        keyTakeaway: 'MVC is request-oriented, MVVM is binding-oriented; pick based on your runtime model.',
      },
      {
        id: 'fs-architecture-clean',
        title: 'Clean Architecture',
        difficulty: 'advanced',
        answer:
          'Clean Architecture organizes code in concentric layers where dependencies point inward: Entities at the core, then Use Cases, Interface Adapters, and Frameworks on the outside. This ensures business logic has zero coupling to databases, web frameworks, or UI, making the core trivially testable and swappable. The trade-off is more boilerplate and indirection, which is only justified in long-lived systems with complex domain rules.',
        tags: ['clean-architecture', 'separation-of-concerns', 'testability'],
        keyTakeaway: 'Dependencies always point inward so the domain layer never knows about infrastructure.',
      },
      {
        id: 'fs-architecture-ddd',
        title: 'Domain-Driven Design',
        difficulty: 'advanced',
        answer:
          'DDD models software around the business domain using Bounded Contexts, Aggregates, Entities, Value Objects, and a shared Ubiquitous Language between developers and domain experts. Each Bounded Context owns its own models and data store, preventing concept leakage across team boundaries. It shines in complex domains with rich business rules but adds unnecessary ceremony for simple CRUD applications.',
        tags: ['ddd', 'bounded-context', 'aggregates', 'domain-modeling'],
        keyTakeaway: 'Bounded Contexts enforce that each subdomain owns its language and data, preventing model corruption.',
      },
      {
        id: 'fs-architecture-event-driven',
        title: 'Event-Driven Architecture',
        difficulty: 'intermediate',
        answer:
          'Components communicate by producing and consuming immutable events through a broker like Kafka or RabbitMQ, decoupling producers from consumers and enabling asynchronous processing. This improves scalability and resilience since services can fail independently without blocking the event pipeline. The main challenges are eventual consistency, event ordering guarantees, and debugging distributed event chains.',
        tags: ['events', 'message-broker', 'async'],
        keyTakeaway: 'Events decouple services temporally and spatially but require careful handling of ordering and idempotency.',
      },
      {
        id: 'fs-architecture-hexagonal',
        title: 'Hexagonal Architecture',
        difficulty: 'advanced',
        answer:
          'Hexagonal Architecture (Ports and Adapters) places the application core behind port interfaces, with adapters implementing those ports for specific technologies like HTTP, databases, or message queues. This means you can swap PostgreSQL for DynamoDB by writing a new adapter without touching business logic. It is conceptually similar to Clean Architecture but emphasizes symmetry between driving (input) and driven (output) sides.',
        tags: ['hexagonal', 'ports-and-adapters', 'architecture'],
        keyTakeaway: 'Ports define what the app needs; adapters implement how, keeping the core technology-agnostic.',
      },
      {
        id: 'fs-architecture-cqrs',
        title: 'CQRS Pattern',
        difficulty: 'advanced',
        answer:
          'CQRS separates the write model (commands) from the read model (queries), allowing each side to be optimized, scaled, and stored independently. The write side enforces business invariants on a normalized store while the read side uses denormalized projections optimized for specific query patterns. It pairs naturally with Event Sourcing but can be used without it when read and write workloads have vastly different performance profiles.',
        tags: ['cqrs', 'event-sourcing', 'read-write-separation'],
        keyTakeaway: 'Separate read and write models so each can be independently optimized and scaled.',
      },
      {
        id: 'fs-architecture-serverless',
        title: 'Serverless Architecture',
        difficulty: 'intermediate',
        answer:
          'Serverless lets you deploy individual functions (Lambda, Cloud Functions) that auto-scale to zero and bill per invocation, eliminating server management. It excels for bursty, event-driven workloads like webhooks, image processing, and scheduled jobs where idle time would waste money. Cold starts, vendor lock-in, 15-minute execution limits, and difficult local debugging are the primary trade-offs.',
        tags: ['serverless', 'lambda', 'faas'],
        keyTakeaway: 'Serverless eliminates server management and scales to zero but introduces cold starts and vendor lock-in.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. Authentication Flows
  // ─────────────────────────────────────────────
  {
    id: 'fs-auth',
    label: 'Authentication Flows',
    icon: 'Shield',
    questions: [
      {
        id: 'fs-auth-jwt',
        title: 'JWT Authentication Flow',
        difficulty: 'intermediate',
        answer:
          'The client sends credentials to the server, which validates them and returns a signed JWT containing user claims. On subsequent requests the client sends the JWT in the Authorization header, and the server verifies the signature without a database lookup, making it stateless. The downside is that JWTs cannot be revoked before expiry unless you maintain a server-side blocklist or use short-lived tokens paired with refresh tokens.',
        tags: ['jwt', 'stateless', 'bearer-token'],
        keyTakeaway: 'JWTs enable stateless auth by embedding claims in a signed token, but revocation requires extra infrastructure.',
      },
      {
        id: 'fs-auth-oauth2-oidc',
        title: 'OAuth 2.0 and OpenID Connect',
        difficulty: 'intermediate',
        answer:
          'OAuth 2.0 is an authorization framework that lets a user grant a third-party app scoped access to their resources without sharing credentials, using grant types like Authorization Code and Client Credentials. OpenID Connect (OIDC) layers identity on top of OAuth 2.0 by adding an ID token (a JWT) that carries user profile claims. Always use the Authorization Code flow with PKCE for public clients like SPAs and mobile apps to prevent token interception.',
        tags: ['oauth2', 'oidc', 'authorization-code', 'pkce'],
        keyTakeaway: 'OAuth 2.0 handles authorization, OIDC adds authentication on top; always use PKCE for public clients.',
      },
      {
        id: 'fs-auth-sessions',
        title: 'Session Management',
        difficulty: 'beginner',
        answer:
          'The server creates a session record after login and sends the session ID in an HttpOnly, Secure, SameSite cookie; the browser automatically attaches it on every request. The server looks up the session in a fast store like Redis to load user state, making revocation instant by simply deleting the record. Sessions are simpler to secure than JWTs but require server-side storage and sticky sessions or a shared store in multi-node deployments.',
        tags: ['sessions', 'cookies', 'redis'],
        keyTakeaway: 'Sessions store state server-side for instant revocation but require shared storage across nodes.',
      },
      {
        id: 'fs-auth-social-login',
        title: 'Social Login Integration',
        difficulty: 'beginner',
        answer:
          'Social login delegates authentication to providers like Google, GitHub, or Apple using the OAuth 2.0 Authorization Code flow, reducing sign-up friction and offloading password management. After the provider redirects back with an authorization code, your server exchanges it for tokens and upserts a user record linked to the provider ID. Handle edge cases like email collisions across providers and always allow users to unlink or add alternative login methods.',
        tags: ['social-login', 'oauth', 'user-onboarding'],
        keyTakeaway: 'Social login reduces friction by delegating auth to trusted providers but requires careful account-linking logic.',
      },
      {
        id: 'fs-auth-mfa',
        title: 'Multi-Factor Authentication',
        difficulty: 'intermediate',
        answer:
          'MFA requires users to present two or more independent factors: something they know (password), something they have (TOTP app, hardware key), or something they are (biometrics). TOTP generates a time-based 6-digit code using a shared secret, while WebAuthn/FIDO2 uses public-key cryptography with hardware tokens, eliminating phishing risk entirely. Always offer recovery codes and support multiple second-factor methods to prevent account lockout.',
        tags: ['mfa', 'totp', 'webauthn'],
        keyTakeaway: 'MFA combines independent factors; prefer WebAuthn for phishing resistance, TOTP for broad device support.',
      },
      {
        id: 'fs-auth-sso',
        title: 'Single Sign-On',
        difficulty: 'advanced',
        answer:
          'SSO allows users to authenticate once with a central Identity Provider (IdP) and gain access to multiple Service Providers (SPs) without re-entering credentials, using protocols like SAML 2.0 or OIDC. The IdP issues an assertion or token that each SP validates independently, meaning session management and MFA enforcement happen in one place. Enterprise SSO typically uses SAML while modern apps prefer OIDC for its simpler JSON-based token flow.',
        tags: ['sso', 'saml', 'identity-provider'],
        keyTakeaway: 'SSO centralizes authentication at an IdP so users log in once and access many services.',
      },
      {
        id: 'fs-auth-refresh-rotation',
        title: 'Refresh Token Rotation',
        difficulty: 'advanced',
        answer:
          'Refresh token rotation issues a new refresh token with every access token renewal and invalidates the old one, so a stolen refresh token can only be used once before detection. If the server sees a reuse of an already-rotated token, it revokes the entire token family, forcing the user to re-authenticate. Store refresh tokens in HttpOnly cookies or secure native storage, never in localStorage, and set reasonable expiration windows.',
        tags: ['refresh-tokens', 'token-rotation', 'security'],
        keyTakeaway: 'Rotating refresh tokens on each use limits the window of exploitation if a token is stolen.',
      },
      {
        id: 'fs-auth-passwordless',
        title: 'Passwordless Authentication',
        difficulty: 'intermediate',
        answer:
          'Passwordless auth replaces passwords with magic links sent via email, one-time codes via SMS, or WebAuthn-based biometrics and hardware keys. Magic links contain a single-use, time-limited token that the server verifies to create a session, eliminating credential stuffing entirely. WebAuthn is the most secure variant since the private key never leaves the device, but magic links offer the broadest compatibility across devices and user demographics.',
        tags: ['passwordless', 'magic-link', 'webauthn'],
        keyTakeaway: 'Passwordless auth eliminates credential-based attacks; magic links are simple, WebAuthn is strongest.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Data Flow
  // ─────────────────────────────────────────────
  {
    id: 'fs-data-flow',
    label: 'Data Flow',
    icon: 'ArrowRightLeft',
    questions: [
      {
        id: 'fs-data-flow-client-server',
        title: 'Client-Server Communication',
        difficulty: 'beginner',
        answer:
          'The client sends HTTP requests to the server which processes them and returns responses, typically as JSON, following a stateless request-response cycle. The browser handles cookies, CORS preflight, and content negotiation automatically, while the server enforces authentication, authorization, and validation on every request. Keep the API surface predictable by using standard HTTP methods (GET, POST, PUT, DELETE) and status codes (200, 201, 400, 401, 404, 500).',
        tags: ['http', 'client-server', 'rest'],
        keyTakeaway: 'HTTP is stateless request-response; use standard methods and status codes for a predictable API surface.',
      },
      {
        id: 'fs-data-flow-rest-vs-graphql',
        title: 'REST vs GraphQL',
        difficulty: 'intermediate',
        answer:
          'REST exposes fixed resource endpoints that return predetermined data shapes, making caching trivial via HTTP semantics but often causing over-fetching or under-fetching. GraphQL lets clients specify exactly which fields they need in a single query, eliminating round trips and wasted bandwidth, but shifts complexity to the server with resolver optimization, N+1 prevention, and rate-limit design. Use REST for simple, cacheable CRUD APIs and GraphQL when clients have diverse, deeply nested data requirements.',
        tags: ['rest', 'graphql', 'api-design'],
        keyTakeaway: 'REST is simple and cacheable; GraphQL eliminates over-fetching but adds server-side complexity.',
      },
      {
        id: 'fs-data-flow-websockets',
        title: 'WebSockets',
        difficulty: 'intermediate',
        answer:
          'WebSockets upgrade an HTTP connection to a persistent, full-duplex TCP channel where both client and server can push messages at any time without polling. This is ideal for real-time features like chat, live dashboards, multiplayer games, and collaborative editing where low latency and bidirectional communication are critical. The trade-offs are stateful connections that complicate horizontal scaling (requiring sticky sessions or a pub/sub backplane like Redis) and the need for explicit reconnection and heartbeat logic.',
        tags: ['websockets', 'real-time', 'bidirectional'],
        keyTakeaway: 'WebSockets provide full-duplex real-time communication but require stateful connection management.',
      },
      {
        id: 'fs-data-flow-sse',
        title: 'Server-Sent Events',
        difficulty: 'intermediate',
        answer:
          'SSE opens a one-way HTTP streaming connection where the server pushes text-based events to the client using the EventSource API, with automatic reconnection and last-event-ID resumption built in. It is simpler than WebSockets for use cases that only need server-to-client updates like live feeds, notifications, and progress bars. SSE works over standard HTTP/2 multiplexing, avoids WebSocket infrastructure overhead, but is limited to text data and unidirectional flow.',
        tags: ['sse', 'streaming', 'server-push'],
        keyTakeaway: 'SSE is simpler than WebSockets for server-to-client streaming with built-in reconnection.',
      },
      {
        id: 'fs-data-flow-optimistic-updates',
        title: 'Optimistic Updates',
        difficulty: 'intermediate',
        answer:
          'Optimistic updates immediately reflect a mutation in the UI before the server confirms it, making the app feel instant by assuming success and rolling back only on failure. The client caches the previous state, applies the change locally, fires the API call, and reverts to the snapshot if the request fails. Libraries like TanStack Query provide onMutate, onError, and onSettled hooks that make this pattern straightforward to implement with automatic cache invalidation.',
        tags: ['optimistic-ui', 'tanstack-query', 'ux'],
        keyTakeaway: 'Optimistic updates show the result immediately and roll back on failure for a snappy UX.',
      },
      {
        id: 'fs-data-flow-validation',
        title: 'Data Validation (Client + Server)',
        difficulty: 'beginner',
        answer:
          'Client-side validation provides instant feedback using libraries like Zod or Yup before the request is sent, improving UX and reducing unnecessary network calls. Server-side validation is the security boundary and must re-validate every field since client checks can be bypassed entirely. Share a single schema definition (e.g., Zod) between frontend and backend in a monorepo to keep rules in sync and avoid drift.',
        tags: ['validation', 'zod', 'security'],
        keyTakeaway: 'Always validate on the server for security; validate on the client for UX; share schemas to avoid drift.',
      },
      {
        id: 'fs-data-flow-error-handling',
        title: 'Error Handling Patterns',
        difficulty: 'intermediate',
        answer:
          'Structure API errors with a consistent envelope containing a machine-readable error code, a human-readable message, and optional field-level validation details so clients can display targeted feedback. Use HTTP status codes correctly (400 for bad input, 401 for unauthenticated, 403 for unauthorized, 404 for missing, 422 for validation, 500 for server faults) and include a correlation ID for tracing. On the client, centralize error handling in an HTTP interceptor that shows toast notifications for generic errors and lets individual components handle domain-specific ones.',
        tags: ['error-handling', 'http-status', 'api-design'],
        keyTakeaway: 'Use a consistent error envelope with machine codes, human messages, and correlation IDs across all endpoints.',
      },
      {
        id: 'fs-data-flow-api-versioning',
        title: 'API Versioning',
        difficulty: 'advanced',
        answer:
          'API versioning prevents breaking existing clients when the contract changes, with common strategies being URL path versioning (/v1/users), header versioning (Accept: application/vnd.api.v2+json), and query parameter versioning. URL-path versioning is the most explicit and widely adopted because it is visible, cacheable, and easy to route at the load-balancer level. Internally, map versions to transformation layers rather than duplicating entire codebases, and sunset old versions with deprecation headers and migration guides.',
        tags: ['api-versioning', 'backward-compatibility', 'api-design'],
        keyTakeaway: 'URL-path versioning is simplest; map versions to transformation layers instead of duplicating code.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Database Design
  // ─────────────────────────────────────────────
  {
    id: 'fs-db',
    label: 'Database Design',
    icon: 'Database',
    questions: [
      {
        id: 'fs-db-schema-design',
        title: 'Schema Design Principles',
        difficulty: 'intermediate',
        answer:
          'Start with a normalized schema (3NF) to eliminate data redundancy and update anomalies, then selectively denormalize for read-heavy query paths once profiling proves the need. Name tables as plural nouns, columns as snake_case, and always include id, created_at, and updated_at on every table for debugging and auditing. Design schemas around access patterns rather than object hierarchies, and use database constraints (NOT NULL, UNIQUE, CHECK, FK) as the last line of defense for data integrity.',
        tags: ['schema-design', 'normalization', 'constraints'],
        keyTakeaway: 'Normalize first, denormalize later for performance; enforce integrity with database-level constraints.',
      },
      {
        id: 'fs-db-sql-vs-nosql',
        title: 'SQL vs NoSQL Choice',
        difficulty: 'intermediate',
        answer:
          'SQL databases (PostgreSQL, MySQL) enforce schemas, support ACID transactions, and excel at complex joins and aggregations, making them the default for most applications with structured, relational data. NoSQL databases (MongoDB, DynamoDB, Redis) trade schema rigidity for flexible documents, horizontal scalability, and sub-millisecond reads optimized for specific access patterns. Choose SQL unless you have a concrete reason for NoSQL such as massive write throughput, schema-less data, or a key-value access pattern that does not require joins.',
        tags: ['sql', 'nosql', 'postgresql', 'mongodb'],
        keyTakeaway: 'Default to SQL for relational integrity; use NoSQL when access patterns, scale, or schema flexibility demand it.',
      },
      {
        id: 'fs-db-migrations',
        title: 'Database Migrations',
        difficulty: 'beginner',
        answer:
          'Migrations are versioned, sequential scripts that evolve the database schema alongside application code, tracked in a migrations table so each environment knows which have been applied. Tools like Alembic (Python), Knex (Node), and Flyway (Java) generate up/down scripts that can be reviewed in pull requests and rolled back if deployment fails. Always make migrations backward-compatible (additive columns, not renames) so the old application version still works during rolling deployments.',
        tags: ['migrations', 'alembic', 'schema-evolution'],
        keyTakeaway: 'Migrations version-control schema changes; keep them backward-compatible for safe rolling deployments.',
      },
      {
        id: 'fs-db-seeding',
        title: 'Database Seeding',
        difficulty: 'beginner',
        answer:
          'Seed scripts populate the database with initial or test data, and must be idempotent so running them multiple times produces the same result without duplicates. Use a unique natural key like a slug to check for existing records before inserting, and separate reference data seeds (roles, categories) from development sample data. Run seeds in a transaction so a partial failure does not leave the database in an inconsistent state.',
        tags: ['seeding', 'idempotent', 'dev-tooling'],
        keyTakeaway: 'Seed scripts must be idempotent by checking a natural key before inserting to avoid duplicates.',
      },
      {
        id: 'fs-db-relationships',
        title: 'Database Relationships',
        difficulty: 'beginner',
        answer:
          'One-to-many uses a foreign key on the child table, many-to-many uses a junction table with composite foreign keys, and one-to-one uses a foreign key with a UNIQUE constraint. Always index foreign key columns since the database does not do this automatically in PostgreSQL, and consider ON DELETE behavior (CASCADE, SET NULL, RESTRICT) based on domain rules. Use junction tables with extra columns (like role or joined_at) when the relationship itself carries data.',
        tags: ['relationships', 'foreign-keys', 'indexing'],
        keyTakeaway: 'Index all foreign keys, choose ON DELETE behavior intentionally, and use junction tables when relationships carry data.',
      },
      {
        id: 'fs-db-soft-deletes',
        title: 'Soft Deletes',
        difficulty: 'intermediate',
        answer:
          'Soft deletes mark rows as deleted (via a deleted_at timestamp or is_deleted flag) instead of physically removing them, preserving data for auditing, undo functionality, and referential integrity. Every query must filter out soft-deleted rows, which is best handled with a default scope or database view so developers cannot accidentally expose deleted data. The downside is table bloat over time, requiring periodic archival or hard-delete jobs, and added complexity in unique constraints that must account for deleted rows.',
        tags: ['soft-delete', 'audit', 'data-retention'],
        keyTakeaway: 'Soft deletes preserve data but require default query filters and periodic archival to prevent bloat.',
      },
      {
        id: 'fs-db-audit-trails',
        title: 'Audit Trails',
        difficulty: 'advanced',
        answer:
          'Audit trails record who changed what and when, typically in a separate audit_log table storing the table name, row ID, action (INSERT/UPDATE/DELETE), old and new values as JSON, the actor ID, and a timestamp. Implement them via database triggers for guaranteed capture regardless of application code path, or via application-level middleware for richer context like request ID and IP address. For regulated industries, audit logs must be append-only and tamper-evident, often stored in a separate database or immutable storage.',
        tags: ['audit-trail', 'compliance', 'change-tracking'],
        keyTakeaway: 'Audit trails capture every mutation with actor, timestamp, and before/after values for accountability.',
      },
      {
        id: 'fs-db-multi-tenancy',
        title: 'Multi-Tenancy',
        difficulty: 'advanced',
        answer:
          'Multi-tenancy serves multiple customers from a shared application with three main strategies: shared database with a tenant_id column on every table (cheapest, hardest to isolate), schema-per-tenant (good isolation with shared infrastructure), and database-per-tenant (strongest isolation, highest operational cost). The tenant_id approach requires enforcing tenant filters on every query, ideally via Row-Level Security policies in PostgreSQL so data leakage is impossible even if application code has a bug. Choose based on your isolation requirements, compliance needs, and operational budget.',
        tags: ['multi-tenancy', 'row-level-security', 'saas'],
        keyTakeaway: 'Use Row-Level Security with a tenant_id column for cost-effective multi-tenancy with strong isolation.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. API Integration
  // ─────────────────────────────────────────────
  {
    id: 'fs-api',
    label: 'API Integration',
    icon: 'Plug',
    questions: [
      {
        id: 'fs-api-third-party',
        title: 'Third-Party API Integration',
        difficulty: 'intermediate',
        answer:
          'Wrap third-party APIs in an adapter or service class that isolates the external contract from your domain logic, making it easy to mock in tests and swap providers later. Always set timeouts, implement retries with exponential backoff, and use circuit breakers to prevent a slow external service from cascading failures into your system. Store API keys in environment variables or a secrets manager, never in source code, and log all outgoing requests with correlation IDs for debugging.',
        tags: ['third-party', 'adapter-pattern', 'resilience'],
        keyTakeaway: 'Wrap external APIs in adapters with timeouts, retries, and circuit breakers to isolate failure.',
      },
      {
        id: 'fs-api-rate-limiting',
        title: 'API Rate Limiting',
        difficulty: 'intermediate',
        answer:
          'Rate limiting protects your API from abuse and ensures fair resource allocation by capping requests per client using algorithms like token bucket, sliding window, or fixed window counters stored in Redis. Return 429 Too Many Requests with Retry-After, X-RateLimit-Limit, and X-RateLimit-Remaining headers so clients can self-throttle. Apply different limits per tier (anonymous, free, paid) and per endpoint (stricter on auth routes to prevent brute force).',
        tags: ['rate-limiting', 'redis', 'token-bucket'],
        keyTakeaway: 'Rate limit with Redis-backed counters and return standard headers so clients can adapt their request rate.',
      },
      {
        id: 'fs-api-webhooks',
        title: 'Webhook Handling',
        difficulty: 'intermediate',
        answer:
          'Webhooks are HTTP callbacks where an external service POSTs event payloads to your endpoint, requiring immediate 2xx acknowledgment followed by async processing to avoid timeouts. Verify webhook authenticity using HMAC signature validation with a shared secret, and store the raw payload before processing so you can replay failed events. Make handlers idempotent by tracking event IDs, since providers retry on failures and you may receive the same event multiple times.',
        tags: ['webhooks', 'hmac', 'idempotency'],
        keyTakeaway: 'Acknowledge webhooks immediately, verify HMAC signatures, and process idempotently with stored raw payloads.',
      },
      {
        id: 'fs-api-sdk-design',
        title: 'SDK Design',
        difficulty: 'advanced',
        answer:
          'A good SDK provides a typed, ergonomic wrapper around your API that handles authentication, serialization, retries, and pagination so consumers write minimal boilerplate. Design it with sensible defaults, method chaining or builder patterns, and comprehensive TypeDoc/JSDoc so IDE autocompletion serves as living documentation. Publish it as a versioned package with semantic versioning, changelog, and auto-generated types from your OpenAPI spec to keep the SDK in sync with the API.',
        tags: ['sdk', 'developer-experience', 'openapi'],
        keyTakeaway: 'Auto-generate SDK types from your OpenAPI spec so the client library never drifts from the API contract.',
      },
      {
        id: 'fs-api-caching',
        title: 'API Caching Strategies',
        difficulty: 'intermediate',
        answer:
          'Cache API responses at multiple layers: CDN for public, static content; reverse proxy (Nginx, Varnish) for semi-dynamic responses; application-level cache (Redis) for computed or aggregated data; and HTTP cache headers (Cache-Control, ETag, Last-Modified) for client-side caching. Use cache-aside (lazy loading) where the app checks cache first and populates on miss, or write-through where every write updates both database and cache atomically. Invalidation is the hard part: use TTLs as a safety net, event-driven invalidation for consistency, and cache tags for bulk purging.',
        tags: ['caching', 'redis', 'cdn', 'cache-invalidation'],
        keyTakeaway: 'Cache at multiple layers with TTLs as safety nets and event-driven invalidation for consistency.',
      },
      {
        id: 'fs-api-error-recovery',
        title: 'Error Recovery Patterns',
        difficulty: 'advanced',
        answer:
          'Implement exponential backoff with jitter for transient failures, circuit breakers that trip after N consecutive failures to avoid hammering a downed service, and dead-letter queues for messages that fail processing after max retries. The bulkhead pattern isolates critical integrations into separate thread or connection pools so one slow dependency cannot exhaust resources for others. Log every retry attempt with context, alert on circuit-breaker state changes, and provide fallback responses (cached data or graceful degradation) when recovery is not possible.',
        tags: ['circuit-breaker', 'retry', 'dead-letter-queue', 'bulkhead'],
        keyTakeaway: 'Combine retries with backoff, circuit breakers, and fallbacks to gracefully handle external failures.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. Deployment
  // ─────────────────────────────────────────────
  {
    id: 'fs-deployment',
    label: 'Deployment',
    icon: 'Rocket',
    questions: [
      {
        id: 'fs-deployment-cicd',
        title: 'CI/CD Pipelines',
        difficulty: 'intermediate',
        answer:
          'CI (Continuous Integration) automatically runs linting, type checking, and tests on every push or pull request to catch regressions before merge. CD (Continuous Deployment/Delivery) automatically builds, tags, and deploys artifacts to staging or production after CI passes, using tools like GitHub Actions, GitLab CI, or CircleCI. A solid pipeline includes steps for lint, test, build, security scan, deploy to staging, integration tests, and promote to production with rollback capability.',
        tags: ['ci-cd', 'github-actions', 'automation'],
        keyTakeaway: 'CI catches bugs on every push; CD automates deployment so shipping is boring and repeatable.',
      },
      {
        id: 'fs-deployment-docker',
        title: 'Docker Basics',
        difficulty: 'beginner',
        answer:
          'Docker packages your application with its dependencies into an immutable container image that runs identically on any host, eliminating the "works on my machine" problem. A Dockerfile defines the build steps: start from a base image, copy source, install dependencies, and set the entrypoint, ideally using multi-stage builds to keep the final image small. Use docker-compose for local multi-service development (app, database, cache) and push images to a registry (ECR, GHCR) for deployment.',
        tags: ['docker', 'containers', 'dockerfile'],
        keyTakeaway: 'Docker ensures environment parity from development to production with immutable, reproducible images.',
      },
      {
        id: 'fs-deployment-env-management',
        title: 'Environment Management',
        difficulty: 'beginner',
        answer:
          'Maintain separate configurations for development, staging, and production using environment variables loaded from .env files locally and from secrets managers (AWS SSM, Vault, Doppler) in deployed environments. Never commit secrets to source control; use .env.example as a template documenting required variables without values. Validate all environment variables at application startup using a schema (Zod, pydantic) so misconfigurations fail fast rather than causing runtime errors in production.',
        tags: ['environment', 'secrets', 'configuration'],
        keyTakeaway: 'Validate environment variables at startup and never commit secrets; use secrets managers in production.',
      },
      {
        id: 'fs-deployment-blue-green',
        title: 'Blue-Green Deployment',
        difficulty: 'advanced',
        answer:
          'Blue-green deployment maintains two identical production environments: Blue runs the current version while Green receives the new deployment and is verified with smoke tests before the load balancer switches traffic from Blue to Green. Rollback is instant since Blue is still running the old version and you just switch traffic back. The trade-off is double the infrastructure cost during the transition window, though cloud auto-scaling and ephemeral environments mitigate this significantly.',
        tags: ['blue-green', 'zero-downtime', 'rollback'],
        keyTakeaway: 'Blue-green gives instant rollback by maintaining two production environments and switching traffic at the load balancer.',
      },
      {
        id: 'fs-deployment-feature-flags',
        title: 'Feature Flags',
        difficulty: 'intermediate',
        answer:
          'Feature flags wrap new functionality in conditional checks that can be toggled at runtime without redeploying, enabling trunk-based development where incomplete features are merged but hidden behind flags. They support gradual rollouts (1% to 10% to 100% of users), A/B testing, kill switches for emergencies, and environment-specific behavior. Use a service like LaunchDarkly or Unleash for centralized flag management with targeting rules, and always clean up stale flags to prevent technical debt.',
        tags: ['feature-flags', 'trunk-based-dev', 'gradual-rollout'],
        keyTakeaway: 'Feature flags decouple deployment from release, enabling gradual rollouts and instant kill switches.',
      },
      {
        id: 'fs-deployment-cdn',
        title: 'CDN Setup',
        difficulty: 'intermediate',
        answer:
          'A CDN caches static assets (JS, CSS, images, fonts) and sometimes dynamic content at edge servers geographically close to users, reducing latency and offloading traffic from your origin server. Configure cache headers (Cache-Control: public, max-age=31536000, immutable) for hashed assets and shorter TTLs for HTML, and use cache busting via content hashes in filenames to safely deploy updates. Popular options include CloudFront, Cloudflare, and Vercel Edge, each offering DDoS protection and edge functions as additional benefits.',
        tags: ['cdn', 'caching', 'performance', 'cloudflare'],
        keyTakeaway: 'Serve hashed static assets through a CDN with long cache lifetimes and cache-bust via filename hashes.',
      },
      {
        id: 'fs-deployment-ssl-tls',
        title: 'SSL/TLS Configuration',
        difficulty: 'beginner',
        answer:
          'SSL/TLS encrypts traffic between client and server using certificate-based asymmetric key exchange followed by symmetric encryption, preventing eavesdropping and man-in-the-middle attacks. Use Let\'s Encrypt with auto-renewal (Certbot or cloud-managed certificates) for free TLS, enforce HTTPS everywhere with HSTS headers, and configure your server to use TLS 1.2+ with strong cipher suites. Terminate TLS at the load balancer or reverse proxy to simplify certificate management and offload encryption overhead from application servers.',
        tags: ['ssl', 'tls', 'https', 'letsencrypt'],
        keyTakeaway: 'Use Let\'s Encrypt with auto-renewal, enforce HSTS, and terminate TLS at the load balancer.',
      },
    ],
  },
];

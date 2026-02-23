import type { InterviewTopic } from './types';

export const BACKEND_PART1_TOPICS: InterviewTopic[] = [
  // ─────────────────────────────────────────────
  // 1. API Design (10 questions)
  // ─────────────────────────────────────────────
  {
    id: 'be-api',
    label: 'API Design',
    icon: 'Globe',
    questions: [
      {
        id: 'be-api-rest',
        title: 'What are REST principles?',
        difficulty: 'beginner',
        answer:
          'REST is an architectural style using stateless HTTP requests with uniform resource URLs. Key constraints include client-server separation, statelessness, cacheability, and a uniform interface with standard HTTP methods.',
        tags: ['api', 'rest', 'http'],
        keyTakeaway:
          'REST provides a scalable, stateless architecture for web APIs.',
      },
      {
        id: 'be-api-http-methods',
        title: 'When do you use GET, POST, PUT, PATCH, and DELETE?',
        difficulty: 'beginner',
        answer:
          'GET reads a resource, POST creates one, PUT fully replaces it, PATCH partially updates it, and DELETE removes it. GET and DELETE have no request body; PUT and PATCH require one describing the changes.',
        tags: ['http', 'methods', 'crud'],
        keyTakeaway:
          'Each HTTP method maps to a specific CRUD operation on a resource.',
      },
      {
        id: 'be-api-status-codes',
        title: 'What are the most important HTTP status code ranges?',
        difficulty: 'beginner',
        answer:
          '2xx means success (200 OK, 201 Created, 204 No Content). 4xx means client error (400 Bad Request, 401 Unauthorized, 404 Not Found). 5xx means server error (500 Internal, 503 Unavailable).',
        tags: ['http', 'status-codes', 'api'],
        keyTakeaway:
          'Status codes let clients programmatically handle success, client errors, and server errors.',
      },
      {
        id: 'be-api-versioning',
        title: 'How do you version an API?',
        difficulty: 'intermediate',
        answer:
          'Common strategies are URL path versioning (/v1/users), query parameter (?version=1), and Accept header versioning. URL path is simplest and most widely adopted; header-based keeps URLs clean but is harder to test in browsers.',
        tags: ['api', 'versioning', 'design'],
        keyTakeaway:
          'URL path versioning is the most popular approach for its simplicity.',
      },
      {
        id: 'be-api-pagination',
        title: 'What are common pagination strategies?',
        difficulty: 'intermediate',
        answer:
          'Offset-based uses page/limit params and is simple but slow on large datasets. Cursor-based passes an opaque token pointing to the last item, giving consistent performance. Keyset pagination uses a sorted column value as the cursor.',
        tags: ['api', 'pagination', 'performance'],
        keyTakeaway:
          'Cursor-based pagination outperforms offset-based on large datasets.',
      },
      {
        id: 'be-api-hateoas',
        title: 'What is HATEOAS?',
        difficulty: 'advanced',
        answer:
          'HATEOAS (Hypermedia as the Engine of Application State) means API responses include links to related actions and resources. Clients discover available operations at runtime instead of hardcoding URLs, making the API self-describing.',
        tags: ['rest', 'hateoas', 'hypermedia'],
        keyTakeaway:
          'HATEOAS lets clients navigate an API dynamically through embedded links.',
      },
      {
        id: 'be-api-rate-limiting',
        title: 'How does API rate limiting work?',
        difficulty: 'intermediate',
        answer:
          'Rate limiting caps the number of requests a client can make in a time window. Common algorithms are fixed window, sliding window, and token bucket. Responses include X-RateLimit headers so clients know their remaining quota.',
        tags: ['api', 'rate-limiting', 'security'],
        keyTakeaway:
          'Rate limiting protects servers from abuse and ensures fair usage across clients.',
      },
      {
        id: 'be-api-idempotency',
        title: 'What is idempotency and why does it matter?',
        difficulty: 'intermediate',
        answer:
          'An idempotent operation produces the same result no matter how many times it is called. GET, PUT, and DELETE are idempotent by design; POST is not. Idempotency keys let clients safely retry failed requests without creating duplicates.',
        tags: ['api', 'idempotency', 'reliability'],
        keyTakeaway:
          'Idempotency enables safe retries in distributed systems.',
      },
      {
        id: 'be-api-content-negotiation',
        title: 'What is content negotiation?',
        difficulty: 'intermediate',
        answer:
          'Content negotiation lets clients request specific response formats via the Accept header (e.g., application/json or application/xml). The server inspects the header and returns data in the preferred format or 406 Not Acceptable.',
        tags: ['http', 'content-negotiation', 'headers'],
        keyTakeaway:
          'The Accept header drives server-side content negotiation for response format.',
      },
      {
        id: 'be-api-openapi',
        title: 'What is OpenAPI and why use it?',
        difficulty: 'beginner',
        answer:
          'OpenAPI (formerly Swagger) is a standard specification for describing REST APIs in YAML or JSON. It enables auto-generated docs, client SDKs, and request validation. Tools like Swagger UI render interactive documentation from the spec.',
        tags: ['api', 'openapi', 'documentation'],
        keyTakeaway:
          'OpenAPI standardizes API contracts and powers automated tooling.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. Databases (12 questions)
  // ─────────────────────────────────────────────
  {
    id: 'be-databases',
    label: 'Databases',
    icon: 'Database',
    questions: [
      {
        id: 'be-databases-sql-vs-nosql',
        title: 'SQL vs NoSQL databases?',
        difficulty: 'beginner',
        answer:
          'SQL databases (PostgreSQL, MySQL) store data in structured tables with strict schemas and support ACID transactions. NoSQL databases (MongoDB, DynamoDB) offer flexible schemas and horizontal scaling but trade off consistency or join support.',
        tags: ['sql', 'nosql', 'databases'],
        keyTakeaway:
          'Choose SQL for relational integrity and NoSQL for flexible schemas and horizontal scale.',
      },
      {
        id: 'be-databases-acid',
        title: 'What are ACID properties?',
        difficulty: 'beginner',
        answer:
          'ACID stands for Atomicity (all or nothing), Consistency (valid state transitions), Isolation (concurrent transactions do not interfere), and Durability (committed data survives crashes). These guarantee reliable database transactions.',
        tags: ['acid', 'transactions', 'databases'],
        keyTakeaway:
          'ACID ensures transactions are reliable even under failures and concurrency.',
      },
      {
        id: 'be-databases-normalization',
        title: 'What is database normalization?',
        difficulty: 'intermediate',
        answer:
          'Normalization organizes tables to reduce data redundancy by splitting data into related tables. Normal forms (1NF, 2NF, 3NF) progressively eliminate partial and transitive dependencies. Over-normalizing can hurt read performance, so denormalization is sometimes used.',
        tags: ['normalization', 'schema', 'design'],
        keyTakeaway:
          'Normalization reduces redundancy; denormalization trades it for read speed.',
      },
      {
        id: 'be-databases-indexing',
        title: 'How do database indexes work?',
        difficulty: 'intermediate',
        answer:
          'An index is a B-tree (or hash) data structure that maps column values to row locations, speeding up lookups from O(n) to O(log n). Indexes accelerate reads but slow down writes because the index must be updated on every insert or update.',
        tags: ['indexing', 'performance', 'databases'],
        keyTakeaway:
          'Indexes trade write overhead for dramatically faster read queries.',
      },
      {
        id: 'be-databases-query-optimization',
        title: 'How do you optimize slow SQL queries?',
        difficulty: 'intermediate',
        answer:
          'Use EXPLAIN ANALYZE to read the query plan, add indexes on filtered/joined columns, avoid SELECT *, and reduce subqueries in favor of JOINs. Limit result sets early with WHERE clauses and use pagination to avoid scanning entire tables.',
        tags: ['sql', 'optimization', 'performance'],
        keyTakeaway:
          'EXPLAIN ANALYZE reveals bottlenecks; targeted indexes fix most slow queries.',
      },
      {
        id: 'be-databases-orm',
        title: 'What is an ORM and what are its trade-offs?',
        difficulty: 'beginner',
        answer:
          'An ORM (Object-Relational Mapper) like SQLAlchemy or Prisma maps database rows to language objects, reducing boilerplate SQL. Trade-offs include hidden query complexity, potential N+1 problems, and difficulty expressing advanced SQL constructs.',
        tags: ['orm', 'sqlalchemy', 'databases'],
        keyTakeaway:
          'ORMs boost productivity but can mask performance issues if used carelessly.',
      },
      {
        id: 'be-databases-migrations',
        title: 'What are database migrations?',
        difficulty: 'beginner',
        answer:
          'Migrations are versioned scripts that evolve a database schema over time (add columns, create tables). Tools like Alembic or Flyway track which migrations have been applied and support rollbacks. They keep schema changes reproducible across environments.',
        tags: ['migrations', 'schema', 'alembic'],
        keyTakeaway:
          'Migrations version-control schema changes for consistent deployments.',
      },
      {
        id: 'be-databases-connection-pooling',
        title: 'Why use connection pooling?',
        difficulty: 'intermediate',
        answer:
          'Creating a new database connection is expensive (TCP handshake, auth). A connection pool (e.g., PgBouncer) maintains reusable connections, reducing latency and preventing the database from being overwhelmed by too many simultaneous connections.',
        tags: ['connection-pool', 'performance', 'databases'],
        keyTakeaway:
          'Connection pools reuse open connections to cut latency and protect the database.',
      },
      {
        id: 'be-databases-read-replicas',
        title: 'What are read replicas?',
        difficulty: 'intermediate',
        answer:
          'Read replicas are copies of the primary database that serve read queries, distributing load. The primary handles all writes and asynchronously replicates changes. This improves read throughput but introduces slight replication lag.',
        tags: ['replication', 'scaling', 'databases'],
        keyTakeaway:
          'Read replicas scale read throughput at the cost of slight replication lag.',
      },
      {
        id: 'be-databases-sharding',
        title: 'What is database sharding?',
        difficulty: 'advanced',
        answer:
          'Sharding horizontally partitions data across multiple database instances by a shard key (e.g., user ID). Each shard holds a subset of rows, enabling linear write scaling. Cross-shard queries and rebalancing are the main operational challenges.',
        tags: ['sharding', 'scaling', 'distributed'],
        keyTakeaway:
          'Sharding scales writes horizontally but adds complexity for cross-shard operations.',
      },
      {
        id: 'be-databases-n-plus-one',
        title: 'What is the N+1 query problem?',
        difficulty: 'intermediate',
        answer:
          'N+1 occurs when code fetches a list (1 query) then loops to fetch related data for each item (N queries). Fix it with eager loading (JOIN or IN clause) so related data is fetched in one or two queries instead of N+1.',
        tags: ['n+1', 'orm', 'performance'],
        keyTakeaway:
          'Eager loading eliminates N+1 by batching related data fetches.',
      },
      {
        id: 'be-databases-transactions',
        title: 'How do database transactions and isolation levels work?',
        difficulty: 'advanced',
        answer:
          'A transaction groups statements into an atomic unit that is committed or rolled back together. Isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) control visibility of concurrent changes, trading consistency for throughput.',
        tags: ['transactions', 'isolation', 'concurrency'],
        keyTakeaway:
          'Higher isolation levels prevent anomalies but reduce concurrency throughput.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Auth & Security (10 questions)
  // ─────────────────────────────────────────────
  {
    id: 'be-auth',
    label: 'Auth & Security',
    icon: 'Shield',
    questions: [
      {
        id: 'be-auth-jwt',
        title: 'How does JWT authentication work?',
        difficulty: 'beginner',
        answer:
          'A JWT is a signed token with a header, payload, and signature. The server issues it on login; the client sends it in the Authorization header on subsequent requests. The server verifies the signature without needing a session store.',
        tags: ['jwt', 'auth', 'tokens'],
        keyTakeaway:
          'JWTs enable stateless authentication by embedding claims in a signed token.',
      },
      {
        id: 'be-auth-oauth2',
        title: 'What is OAuth 2.0?',
        difficulty: 'intermediate',
        answer:
          'OAuth 2.0 is an authorization framework that lets third-party apps access resources on behalf of a user without sharing passwords. It uses grant types (authorization code, client credentials) and issues access tokens with scoped permissions.',
        tags: ['oauth', 'authorization', 'security'],
        keyTakeaway:
          'OAuth 2.0 delegates authorization without exposing user credentials to third parties.',
      },
      {
        id: 'be-auth-session',
        title: 'How does session-based authentication work?',
        difficulty: 'beginner',
        answer:
          'On login, the server creates a session stored in memory or a database and sends a session ID cookie. Each subsequent request includes the cookie, and the server looks up the session to identify the user. Logout destroys the session.',
        tags: ['session', 'cookies', 'auth'],
        keyTakeaway:
          'Session auth stores state server-side and identifies users via a cookie.',
      },
      {
        id: 'be-auth-password-hashing',
        title: 'Why use bcrypt for password hashing?',
        difficulty: 'beginner',
        answer:
          'Bcrypt is a slow-by-design hashing algorithm with a configurable cost factor, making brute-force attacks impractical. It automatically generates and embeds a unique salt per password. Never store passwords as plain text or fast hashes like MD5.',
        tags: ['bcrypt', 'hashing', 'passwords'],
        keyTakeaway:
          'Bcrypt intentionally slow hashing makes brute-force attacks computationally expensive.',
      },
      {
        id: 'be-auth-cors',
        title: 'What is CORS and why is it needed?',
        difficulty: 'intermediate',
        answer:
          'CORS (Cross-Origin Resource Sharing) is a browser mechanism that restricts web pages from making requests to a different origin. Servers whitelist allowed origins via Access-Control-Allow-Origin headers, letting frontends safely call external APIs.',
        tags: ['cors', 'browser', 'security'],
        keyTakeaway:
          'CORS headers tell browsers which cross-origin requests to permit.',
      },
      {
        id: 'be-auth-csrf',
        title: 'How do you prevent CSRF attacks?',
        difficulty: 'intermediate',
        answer:
          'CSRF tricks a logged-in user into making unwanted requests. Prevent it with anti-CSRF tokens embedded in forms, SameSite cookie attributes, and verifying the Origin/Referer header. Token-based APIs using Authorization headers are inherently immune.',
        tags: ['csrf', 'security', 'cookies'],
        keyTakeaway:
          'Anti-CSRF tokens and SameSite cookies stop forged cross-site requests.',
      },
      {
        id: 'be-auth-xss',
        title: 'How do you prevent XSS attacks?',
        difficulty: 'intermediate',
        answer:
          'XSS injects malicious scripts into pages viewed by other users. Prevent it by escaping all user output, using Content-Security-Policy headers, and sanitizing HTML input. Frameworks like React auto-escape by default, reducing the risk.',
        tags: ['xss', 'security', 'injection'],
        keyTakeaway:
          'Always escape user content and set CSP headers to block injected scripts.',
      },
      {
        id: 'be-auth-sql-injection',
        title: 'What is SQL injection and how do you prevent it?',
        difficulty: 'beginner',
        answer:
          'SQL injection occurs when untrusted input is concatenated directly into a query string, allowing attackers to manipulate the query. Prevent it by always using parameterized queries or prepared statements so user input is never interpreted as SQL.',
        tags: ['sql-injection', 'security', 'databases'],
        keyTakeaway:
          'Parameterized queries fully prevent SQL injection by separating code from data.',
      },
      {
        id: 'be-auth-https-tls',
        title: 'Why is HTTPS/TLS essential?',
        difficulty: 'beginner',
        answer:
          'HTTPS encrypts data in transit using TLS, preventing eavesdropping and man-in-the-middle attacks. TLS also verifies server identity via certificates. Without it, credentials, tokens, and sensitive data travel in plain text over the network.',
        tags: ['https', 'tls', 'encryption'],
        keyTakeaway:
          'TLS encrypts all traffic and authenticates the server to prevent interception.',
      },
      {
        id: 'be-auth-rbac',
        title: 'What is role-based access control (RBAC)?',
        difficulty: 'intermediate',
        answer:
          'RBAC assigns permissions to roles (admin, editor, viewer) rather than individual users. Users are granted roles, and middleware checks the role before allowing access to resources. It simplifies permission management as the system grows.',
        tags: ['rbac', 'authorization', 'access-control'],
        keyTakeaway:
          'RBAC simplifies permissions by grouping them into reusable roles.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Server Frameworks (8 questions)
  // ─────────────────────────────────────────────
  {
    id: 'be-frameworks',
    label: 'Server Frameworks',
    icon: 'Server',
    questions: [
      {
        id: 'be-frameworks-express-fastify',
        title: 'Express vs Fastify?',
        difficulty: 'intermediate',
        answer:
          'Express is the most popular Node.js framework with a huge middleware ecosystem but is callback-based and slower. Fastify uses a schema-based approach for automatic validation and serialization, delivering significantly higher throughput with lower overhead.',
        tags: ['express', 'fastify', 'node'],
        keyTakeaway:
          'Fastify offers better performance; Express has a larger ecosystem.',
      },
      {
        id: 'be-frameworks-django-fastapi',
        title: 'Django vs FastAPI?',
        difficulty: 'intermediate',
        answer:
          'Django is a batteries-included framework with an ORM, admin panel, and templating. FastAPI is async-first, uses Pydantic for validation, and auto-generates OpenAPI docs. Choose Django for full-stack apps, FastAPI for high-performance async APIs.',
        tags: ['django', 'fastapi', 'python'],
        keyTakeaway:
          'Django is full-stack; FastAPI is optimized for async API development.',
      },
      {
        id: 'be-frameworks-spring-boot',
        title: 'What is Spring Boot?',
        difficulty: 'intermediate',
        answer:
          'Spring Boot is a Java framework that auto-configures Spring applications with sensible defaults, embedded servers, and starter dependencies. It powers most enterprise Java microservices with features like dependency injection, AOP, and robust security.',
        tags: ['spring', 'java', 'enterprise'],
        keyTakeaway:
          'Spring Boot simplifies Java microservice development with auto-configuration.',
      },
      {
        id: 'be-frameworks-middleware',
        title: 'What is the middleware pattern?',
        difficulty: 'beginner',
        answer:
          'Middleware functions sit between the incoming request and the route handler, forming a pipeline. Each middleware can inspect, modify, or short-circuit the request/response. Common uses include logging, authentication, CORS, and rate limiting.',
        tags: ['middleware', 'pipeline', 'architecture'],
        keyTakeaway:
          'Middleware chains process requests through reusable, composable functions.',
      },
      {
        id: 'be-frameworks-routing',
        title: 'How does server-side routing work?',
        difficulty: 'beginner',
        answer:
          'The router matches incoming request paths and HTTP methods to handler functions. Routes can include dynamic parameters (/users/:id) and are typically grouped by resource. Most frameworks support route prefixes, guards, and nested routers.',
        tags: ['routing', 'http', 'handlers'],
        keyTakeaway:
          'Routers map URL patterns and HTTP methods to the correct handler functions.',
      },
      {
        id: 'be-frameworks-error-handling',
        title: 'How should a backend handle errors?',
        difficulty: 'intermediate',
        answer:
          'Use a global error handler middleware that catches thrown exceptions and maps them to appropriate HTTP status codes. Return consistent error response shapes with a message and error code. Log stack traces server-side but never expose them to clients.',
        tags: ['errors', 'middleware', 'api'],
        keyTakeaway:
          'Global error handlers ensure consistent error responses and prevent leaking internals.',
      },
      {
        id: 'be-frameworks-request-lifecycle',
        title: 'What is the request lifecycle in a backend framework?',
        difficulty: 'intermediate',
        answer:
          'A request flows through: server receives it, parses the body, runs middleware (auth, validation), matches a route, executes the handler, serializes the response, and runs response middleware (compression, headers). Errors can short-circuit any step.',
        tags: ['lifecycle', 'request', 'pipeline'],
        keyTakeaway:
          'Requests pass through parsing, middleware, routing, and serialization stages.',
      },
      {
        id: 'be-frameworks-di',
        title: 'What is dependency injection?',
        difficulty: 'intermediate',
        answer:
          'Dependency injection provides a component its dependencies from the outside rather than having it create them. This decouples code, simplifies testing with mocks, and centralizes configuration. Frameworks like Spring and FastAPI have built-in DI containers.',
        tags: ['di', 'architecture', 'testing'],
        keyTakeaway:
          'DI decouples components by injecting dependencies instead of hardcoding them.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. Caching (8 questions)
  // ─────────────────────────────────────────────
  {
    id: 'be-caching',
    label: 'Caching',
    icon: 'Zap',
    questions: [
      {
        id: 'be-caching-redis',
        title: 'What is Redis and when do you use it?',
        difficulty: 'beginner',
        answer:
          'Redis is an in-memory key-value store used for caching, session storage, rate limiting, and pub/sub. It supports data structures like strings, hashes, lists, and sorted sets. Data is primarily in memory, with optional persistence to disk.',
        tags: ['redis', 'caching', 'in-memory'],
        keyTakeaway:
          'Redis provides sub-millisecond in-memory storage for caching and real-time features.',
      },
      {
        id: 'be-caching-strategies',
        title: 'What are cache-aside, write-through, and write-behind?',
        difficulty: 'intermediate',
        answer:
          'Cache-aside: app reads cache first, fills from DB on miss. Write-through: writes go to cache and DB simultaneously, guaranteeing consistency. Write-behind: writes go to cache immediately and asynchronously sync to DB, improving write latency.',
        tags: ['caching', 'strategies', 'patterns'],
        keyTakeaway:
          'Cache-aside is most common; write-through and write-behind optimize for write workloads.',
      },
      {
        id: 'be-caching-ttl',
        title: 'What is TTL in caching?',
        difficulty: 'beginner',
        answer:
          'TTL (Time To Live) is the duration a cached entry remains valid before automatic expiration. Short TTLs keep data fresh but increase cache misses; long TTLs improve hit rates but risk serving stale data. Choose TTL based on how often data changes.',
        tags: ['ttl', 'expiration', 'caching'],
        keyTakeaway:
          'TTL balances data freshness against cache hit rate.',
      },
      {
        id: 'be-caching-invalidation',
        title: 'Why is cache invalidation hard?',
        difficulty: 'advanced',
        answer:
          'Invalidation is hard because you must know exactly when data changes and which cache keys are affected. Strategies include event-driven invalidation on writes, TTL-based expiry, and versioned keys. Getting it wrong means users see stale or inconsistent data.',
        tags: ['invalidation', 'consistency', 'caching'],
        keyTakeaway:
          'Cache invalidation requires precise coordination between writes and cached entries.',
      },
      {
        id: 'be-caching-cdn',
        title: 'How does a CDN cache content?',
        difficulty: 'beginner',
        answer:
          'A CDN (Content Delivery Network) caches static assets at edge servers worldwide, serving them from the location closest to the user. It reduces origin server load and latency. Cache-Control and ETag headers govern what gets cached and for how long.',
        tags: ['cdn', 'edge', 'performance'],
        keyTakeaway:
          'CDNs serve cached content from nearby edge nodes, slashing latency.',
      },
      {
        id: 'be-caching-http-headers',
        title: 'What HTTP headers control caching?',
        difficulty: 'intermediate',
        answer:
          'Cache-Control sets max-age, no-cache, and no-store directives. ETag provides a fingerprint for conditional requests (If-None-Match). Last-Modified enables time-based revalidation. Together they let browsers and proxies cache responses efficiently.',
        tags: ['http', 'headers', 'caching'],
        keyTakeaway:
          'Cache-Control, ETag, and Last-Modified govern browser and proxy caching behavior.',
      },
      {
        id: 'be-caching-distributed',
        title: 'What is distributed caching?',
        difficulty: 'intermediate',
        answer:
          'Distributed caching spreads cached data across multiple nodes (e.g., Redis Cluster, Memcached) so any application server can access it. It eliminates per-server cache duplication, provides higher availability, and scales horizontally with consistent hashing.',
        tags: ['distributed', 'cluster', 'caching'],
        keyTakeaway:
          'Distributed caches share state across servers for consistency and scalability.',
      },
      {
        id: 'be-caching-stampede',
        title: 'What is a cache stampede and how do you prevent it?',
        difficulty: 'advanced',
        answer:
          'A cache stampede occurs when a popular key expires and many concurrent requests simultaneously hit the database to rebuild it. Prevent it with locking (only one request rebuilds), staggered TTLs, or early probabilistic recomputation before expiry.',
        tags: ['stampede', 'thundering-herd', 'caching'],
        keyTakeaway:
          'Locking and staggered TTLs prevent mass simultaneous cache rebuilds.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. Message Queues (6 questions)
  // ─────────────────────────────────────────────
  {
    id: 'be-queues',
    label: 'Message Queues',
    icon: 'MessageSquare',
    questions: [
      {
        id: 'be-queues-rabbitmq-kafka',
        title: 'RabbitMQ vs Kafka?',
        difficulty: 'intermediate',
        answer:
          'RabbitMQ is a traditional message broker with flexible routing, acknowledgments, and per-message delivery. Kafka is a distributed log designed for high-throughput event streaming with durable, replayable partitions. Use RabbitMQ for task queues, Kafka for event pipelines.',
        tags: ['rabbitmq', 'kafka', 'messaging'],
        keyTakeaway:
          'RabbitMQ suits task queues; Kafka suits high-throughput event streaming.',
      },
      {
        id: 'be-queues-pubsub',
        title: 'What is the pub/sub pattern?',
        difficulty: 'beginner',
        answer:
          'Publish/subscribe decouples producers from consumers. Publishers emit messages to a topic; all subscribers to that topic receive a copy. This enables fan-out communication where one event triggers multiple independent consumers without them knowing about each other.',
        tags: ['pubsub', 'messaging', 'patterns'],
        keyTakeaway:
          'Pub/sub fans out messages to multiple independent subscribers.',
      },
      {
        id: 'be-queues-task-queues',
        title: 'What are task queues like Celery or Bull?',
        difficulty: 'intermediate',
        answer:
          'Task queues offload time-consuming work (emails, image processing, reports) to background workers. Celery (Python) and Bull (Node) let you define tasks, push them to a broker (Redis/RabbitMQ), and process them asynchronously with retries and scheduling.',
        tags: ['celery', 'bull', 'background-jobs'],
        keyTakeaway:
          'Task queues move heavy work to background workers for better response times.',
      },
      {
        id: 'be-queues-dlq',
        title: 'What is a dead letter queue?',
        difficulty: 'intermediate',
        answer:
          'A dead letter queue (DLQ) stores messages that repeatedly fail processing after a configured number of retries. It prevents poison messages from blocking the main queue and gives engineers a place to inspect and replay failed messages later.',
        tags: ['dlq', 'error-handling', 'messaging'],
        keyTakeaway:
          'DLQs isolate failed messages so they do not block healthy processing.',
      },
      {
        id: 'be-queues-event-driven',
        title: 'What is event-driven architecture?',
        difficulty: 'intermediate',
        answer:
          'Event-driven architecture has services communicate by emitting and reacting to events rather than direct API calls. This decouples services, improves scalability, and enables eventual consistency. A message broker or event bus mediates the communication.',
        tags: ['events', 'architecture', 'decoupling'],
        keyTakeaway:
          'Event-driven architecture decouples services through asynchronous event exchange.',
      },
      {
        id: 'be-queues-ordering',
        title: 'How do you guarantee message ordering?',
        difficulty: 'advanced',
        answer:
          'Kafka guarantees order within a partition by appending messages sequentially. Assign related messages the same partition key (e.g., user ID) so they land in one partition. RabbitMQ guarantees order per queue but loses it with multiple competing consumers.',
        tags: ['ordering', 'kafka', 'partitions'],
        keyTakeaway:
          'Partition keys in Kafka ensure ordered processing for related messages.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. Concurrency (6 questions)
  // ─────────────────────────────────────────────
  {
    id: 'be-concurrency',
    label: 'Concurrency',
    icon: 'Layers',
    questions: [
      {
        id: 'be-concurrency-threading-async',
        title: 'Threading vs async/await?',
        difficulty: 'intermediate',
        answer:
          'Threading uses OS-managed threads that run in parallel, suitable for CPU-bound work but with high memory overhead per thread. Async/await uses a single-threaded event loop with cooperative scheduling, ideal for I/O-bound work with thousands of concurrent connections.',
        tags: ['threading', 'async', 'concurrency'],
        keyTakeaway:
          'Use threads for CPU-bound parallelism and async for high-concurrency I/O.',
      },
      {
        id: 'be-concurrency-race-conditions',
        title: 'What is a race condition?',
        difficulty: 'beginner',
        answer:
          'A race condition occurs when two concurrent operations read and write shared state in an unpredictable order, producing incorrect results. Classic example: two threads incrementing a counter can lose updates. Prevent with locks, atomic operations, or serialized access.',
        tags: ['race-condition', 'bugs', 'concurrency'],
        keyTakeaway:
          'Race conditions cause non-deterministic bugs from unsynchronized shared state access.',
      },
      {
        id: 'be-concurrency-mutexes',
        title: 'What are mutexes and locks?',
        difficulty: 'intermediate',
        answer:
          'A mutex (mutual exclusion) ensures only one thread accesses a critical section at a time. A thread acquires the lock, performs work, then releases it. Deadlocks occur if two threads each hold a lock the other needs, so lock ordering is important.',
        tags: ['mutex', 'locks', 'synchronization'],
        keyTakeaway:
          'Mutexes serialize access to shared resources but risk deadlocks if mismanaged.',
      },
      {
        id: 'be-concurrency-process-thread',
        title: 'Process vs thread?',
        difficulty: 'beginner',
        answer:
          'A process has its own memory space and is isolated from other processes. Threads share memory within the same process, making communication faster but requiring synchronization. Crashing one thread can take down the whole process; a crashed process is isolated.',
        tags: ['process', 'thread', 'os'],
        keyTakeaway:
          'Processes are isolated with separate memory; threads share memory within a process.',
      },
      {
        id: 'be-concurrency-event-loop',
        title: 'How does the event loop work?',
        difficulty: 'intermediate',
        answer:
          'The event loop continuously dequeues callbacks from a task queue and executes them on a single thread. I/O operations are delegated to the OS and their callbacks are queued when complete. This lets Node.js and Python asyncio handle thousands of connections without threading.',
        tags: ['event-loop', 'async', 'node'],
        keyTakeaway:
          'The event loop handles I/O concurrency on one thread via non-blocking callbacks.',
      },
      {
        id: 'be-concurrency-thread-pool',
        title: 'What is a thread pool?',
        difficulty: 'intermediate',
        answer:
          'A thread pool pre-creates a fixed number of worker threads that pull tasks from a queue. This avoids the overhead of creating and destroying threads per request. Most web servers (Tomcat, Gunicorn) use thread pools to handle concurrent requests efficiently.',
        tags: ['thread-pool', 'workers', 'performance'],
        keyTakeaway:
          'Thread pools amortize thread creation cost by reusing a fixed set of workers.',
      },
    ],
  },
];

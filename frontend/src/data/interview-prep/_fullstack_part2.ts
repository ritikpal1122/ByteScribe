import type { InterviewTopic } from './types';

export const FULLSTACK_PART2_TOPICS: InterviewTopic[] = [
  // ─────────────────────────────────────────────
  // 1. Monitoring & Observability
  // ─────────────────────────────────────────────
  {
    id: 'fs-monitoring',
    label: 'Monitoring & Observability',
    icon: 'BarChart3',
    description:
      'Techniques and tools for gaining visibility into application health, performance, and user experience in production environments.',
    questions: [
      {
        id: 'fs-monitoring-app-monitoring',
        title: 'What is application monitoring and why is it essential in production?',
        difficulty: 'beginner',
        answer:
          'Application monitoring is the continuous collection of metrics like response times, throughput, error rates, and resource utilization from a running system. It enables teams to detect degradations before users report them and provides the data needed for capacity planning. Without monitoring, you are essentially flying blind and can only react to outages instead of preventing them.',
        tags: ['monitoring', 'observability', 'metrics'],
        keyTakeaway: 'Monitoring turns invisible production problems into actionable alerts before users are impacted.',
      },
      {
        id: 'fs-monitoring-error-tracking',
        title: 'How does Sentry-style error tracking differ from plain log files?',
        difficulty: 'intermediate',
        answer:
          'Error tracking tools like Sentry capture the full exception context including stack traces, breadcrumbs, user sessions, and environment metadata, then deduplicate and group identical errors automatically. Plain log files require manual search, lack structured context, and give no insight into error frequency or regression. Sentry also provides real-time alerting and release tracking so teams can correlate new errors with specific deployments.',
        tags: ['sentry', 'error-tracking', 'debugging', 'observability'],
        keyTakeaway: 'Dedicated error tracking provides grouped, contextualized exceptions that logs alone cannot offer.',
      },
      {
        id: 'fs-monitoring-uptime',
        title: 'What is uptime monitoring and how does it work?',
        difficulty: 'beginner',
        answer:
          'Uptime monitoring uses external probes that periodically send HTTP requests to your endpoints from multiple geographic locations and alert you when responses fail or exceed latency thresholds. Services like Pingdom, UptimeRobot, or AWS Route 53 health checks verify availability from the outside, catching issues invisible to internal metrics. This is the first line of defense because it mirrors what real users experience.',
        tags: ['uptime', 'health-checks', 'alerting'],
        keyTakeaway: 'External uptime checks catch outages that internal monitoring may miss because they test from the user perspective.',
      },
      {
        id: 'fs-monitoring-rum',
        title: 'What is Real User Monitoring (RUM)?',
        difficulty: 'intermediate',
        answer:
          'RUM collects performance data from actual browser sessions including page load time, time to interactive, largest contentful paint, and JavaScript errors. Unlike synthetic tests, RUM reflects the true diversity of user devices, networks, and geographies. It powers data-driven decisions about which performance optimizations will have the highest real-world impact.',
        tags: ['rum', 'performance', 'web-vitals', 'frontend'],
        keyTakeaway: 'RUM measures real user experience across diverse conditions, complementing lab-based performance tests.',
      },
      {
        id: 'fs-monitoring-synthetic',
        title: 'How does synthetic monitoring complement RUM?',
        difficulty: 'intermediate',
        answer:
          'Synthetic monitoring runs scripted browser transactions on a fixed schedule from known locations, providing a consistent performance baseline independent of traffic volume. It catches regressions during low-traffic periods when RUM data is sparse and verifies critical user flows like login or checkout proactively. Combining both gives a complete picture: synthetic for consistency and early detection, RUM for real-world breadth.',
        tags: ['synthetic-monitoring', 'testing', 'performance'],
        keyTakeaway: 'Synthetic monitoring provides a controlled baseline that detects regressions even when real traffic is low.',
      },
      {
        id: 'fs-monitoring-log-aggregation',
        title: 'Why aggregate logs and what does the ELK stack provide?',
        difficulty: 'advanced',
        answer:
          'Log aggregation centralizes logs from all services into a searchable store so engineers can correlate events across microservices during incident investigation. The ELK stack (Elasticsearch, Logstash, Kibana) ingests logs via Logstash, indexes them in Elasticsearch for fast full-text queries, and visualizes trends in Kibana dashboards. Structured logging with consistent fields like request IDs enables tracing a single request across dozens of services in seconds.',
        tags: ['logging', 'elk', 'elasticsearch', 'observability'],
        keyTakeaway: 'Centralized log aggregation with structured fields lets teams trace requests across distributed services in seconds.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. Scaling
  // ─────────────────────────────────────────────
  {
    id: 'fs-scaling',
    label: 'Scaling',
    icon: 'TrendingUp',
    description:
      'Strategies for handling increased load, from vertical scaling single servers to horizontally distributed architectures with caching, replication, and auto-scaling.',
    questions: [
      {
        id: 'fs-scaling-horizontal',
        title: 'What is horizontal scaling and when do you choose it over vertical?',
        difficulty: 'beginner',
        answer:
          'Horizontal scaling adds more machines behind a load balancer, while vertical scaling upgrades a single machine with more CPU and RAM. Horizontal scaling is preferred when you need fault tolerance and near-linear throughput growth, but it requires stateless application design. Vertical scaling is simpler and suits workloads with strong single-thread requirements, though it hits a hardware ceiling.',
        tags: ['scaling', 'horizontal', 'vertical', 'architecture'],
        keyTakeaway: 'Horizontal scaling adds machines for fault tolerance and linear growth; vertical scaling upgrades one machine for simplicity.',
      },
      {
        id: 'fs-scaling-database',
        title: 'How do you scale a relational database beyond a single server?',
        difficulty: 'advanced',
        answer:
          'The main strategies are read replicas to offload read traffic, connection pooling to reduce per-connection overhead, partitioning (sharding) to distribute data across nodes, and vertical scaling of the primary. Sharding introduces complexity around cross-shard queries and distributed transactions, so most teams exhaust read replicas, caching, and query optimization first. Tools like PgBouncer, Vitess, and Citus help at each stage.',
        tags: ['database', 'sharding', 'replication', 'scaling'],
        keyTakeaway: 'Exhaust read replicas, caching, and query tuning before resorting to sharding, which adds significant complexity.',
      },
      {
        id: 'fs-scaling-caching',
        title: 'What are the main caching strategies and their trade-offs?',
        difficulty: 'intermediate',
        answer:
          'Cache-aside (lazy loading) populates the cache on a miss, keeping it simple but risking stale data until TTL expiry. Write-through updates cache and database synchronously, guaranteeing freshness at the cost of write latency. Write-behind (write-back) batches writes asynchronously for high throughput but risks data loss on cache failure.',
        tags: ['caching', 'redis', 'performance', 'consistency'],
        keyTakeaway: 'Cache-aside is simplest, write-through ensures freshness, and write-behind maximizes throughput at a durability risk.',
      },
      {
        id: 'fs-scaling-load-balancing',
        title: 'How does load balancing work and what algorithms are commonly used?',
        difficulty: 'intermediate',
        answer:
          'A load balancer distributes incoming requests across multiple backend servers to prevent any single server from becoming a bottleneck. Common algorithms include round-robin, least connections, IP hash for session affinity, and weighted variants for heterogeneous hardware. Layer 7 (HTTP) balancers like NGINX can route based on URL paths or headers, while Layer 4 (TCP) balancers offer lower latency.',
        tags: ['load-balancing', 'nginx', 'infrastructure', 'scaling'],
        keyTakeaway: 'Load balancers distribute traffic across servers using algorithms like round-robin or least connections to prevent bottlenecks.',
      },
      {
        id: 'fs-scaling-cdn',
        title: 'What role does a CDN play in scaling a web application?',
        difficulty: 'beginner',
        answer:
          'A CDN caches static assets and sometimes dynamic content at edge servers geographically close to users, reducing latency and offloading bandwidth from your origin server. This dramatically improves time to first byte for global users and absorbs traffic spikes that would otherwise overwhelm your infrastructure. Modern CDNs like Cloudflare and CloudFront also offer edge compute, DDoS protection, and automatic image optimization.',
        tags: ['cdn', 'performance', 'caching', 'infrastructure'],
        keyTakeaway: 'CDNs reduce latency by serving content from edge nodes near users while offloading origin server traffic.',
      },
      {
        id: 'fs-scaling-connection-pooling',
        title: 'Why is database connection pooling critical at scale?',
        difficulty: 'intermediate',
        answer:
          'Each database connection consumes memory and OS resources on the database server, and PostgreSQL forks a new process per connection, making thousands of direct connections expensive. A connection pooler like PgBouncer maintains a small pool of reusable connections and multiplexes application requests across them. This lets you scale to many application instances without exhausting database resources.',
        tags: ['connection-pooling', 'pgbouncer', 'database', 'scaling'],
        keyTakeaway: 'Connection pooling multiplexes many application requests over few database connections, preventing resource exhaustion.',
      },
      {
        id: 'fs-scaling-read-replicas',
        title: 'How do read replicas improve database performance?',
        difficulty: 'intermediate',
        answer:
          'Read replicas are copies of the primary database that receive streaming updates via replication and serve read-only queries, distributing read load across multiple servers. Most web applications are read-heavy (often 90%+ reads), so replicas can multiply effective throughput without touching the write path. The trade-off is replication lag, which means replicas may serve slightly stale data for a brief window.',
        tags: ['read-replicas', 'replication', 'database', 'scaling'],
        keyTakeaway: 'Read replicas distribute the read-heavy portion of database traffic while the primary handles all writes.',
      },
      {
        id: 'fs-scaling-auto-scaling',
        title: 'What is auto-scaling and how do you configure it effectively?',
        difficulty: 'advanced',
        answer:
          'Auto-scaling automatically adjusts the number of running instances based on metrics like CPU utilization, request count, or custom application metrics. Effective configuration requires appropriate scale-up thresholds, conservative scale-down cooldowns to prevent flapping, and pre-warming for predictable traffic spikes. Scaling on request queue depth or latency percentiles often works better than CPU alone for web services.',
        tags: ['auto-scaling', 'cloud', 'infrastructure', 'elasticity'],
        keyTakeaway: 'Auto-scaling should trigger on application-level metrics like queue depth or latency, not just CPU utilization.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Developer Productivity
  // ─────────────────────────────────────────────
  {
    id: 'fs-devprod',
    label: 'Developer Productivity',
    icon: 'Wrench',
    description:
      'Tools, workflows, and practices that reduce friction in the development lifecycle, from repository structure to code review and documentation.',
    questions: [
      {
        id: 'fs-devprod-monorepo',
        title: 'What are the trade-offs between monorepo and polyrepo approaches?',
        difficulty: 'intermediate',
        answer:
          'A monorepo keeps all projects in one repository, enabling atomic cross-project changes, shared tooling, and easier dependency management, but it requires specialized build tools like Nx or Turborepo to stay fast. Polyrepo gives each service its own repository with independent CI, clearer ownership boundaries, and simpler access control. Choose monorepo when teams share lots of code; choose polyrepo when teams are autonomous and services rarely change together.',
        tags: ['monorepo', 'polyrepo', 'architecture', 'tooling'],
        keyTakeaway: 'Monorepos excel at shared code and atomic changes; polyrepos excel at team autonomy and independent deployment.',
      },
      {
        id: 'fs-devprod-codegen',
        title: 'How does code generation improve developer productivity?',
        difficulty: 'intermediate',
        answer:
          'Code generation automates the creation of repetitive boilerplate such as API client types from OpenAPI specs, database types from schema introspection, or GraphQL hooks from queries. This eliminates manual synchronization between layers and catches contract mismatches at build time rather than runtime. Tools like openapi-typescript, Prisma, and graphql-codegen are widely used in fullstack projects.',
        tags: ['codegen', 'tooling', 'types', 'automation'],
        keyTakeaway: 'Code generation eliminates boilerplate and catches contract mismatches between layers at build time.',
      },
      {
        id: 'fs-devprod-linting',
        title: 'Why should linting and formatting be automated in CI?',
        difficulty: 'beginner',
        answer:
          'Automated linting (ESLint, Ruff) catches bugs and enforces conventions, while formatters (Prettier, Black) eliminate style debates by producing deterministic output. Running both in CI ensures every merged change meets standards regardless of individual editor setups. This frees code reviews to focus on logic, architecture, and correctness instead of nitpicking whitespace and import order.',
        tags: ['linting', 'formatting', 'ci', 'eslint'],
        keyTakeaway: 'Automated linting and formatting in CI eliminate style debates and let reviews focus on logic and design.',
      },
      {
        id: 'fs-devprod-git-workflows',
        title: 'What Git branching strategy works best for most teams?',
        difficulty: 'intermediate',
        answer:
          'Trunk-based development with short-lived feature branches is the most effective strategy for most teams, as validated by the DORA research. Developers branch from main, keep branches under a day or two, and merge via pull request after CI passes. Feature flags replace long-lived branches for hiding incomplete work, avoiding the merge conflicts and delayed integration that Git Flow introduces.',
        tags: ['git', 'branching', 'trunk-based', 'workflow'],
        keyTakeaway: 'Short-lived feature branches merged frequently into trunk reduce conflicts and improve deployment frequency.',
      },
      {
        id: 'fs-devprod-code-review',
        title: 'What makes a code review process effective?',
        difficulty: 'intermediate',
        answer:
          'Effective reviews are small (under 400 lines), focused on one concern, and reviewed within a few hours to maintain flow. Reviewers should prioritize correctness, security, and maintainability over style which should be automated by linters. A culture of constructive feedback and clear review checklists dramatically improves both quality and velocity.',
        tags: ['code-review', 'collaboration', 'quality', 'process'],
        keyTakeaway: 'Small, prompt reviews focused on correctness and design yield better results than large, style-focused gatekeeping.',
      },
      {
        id: 'fs-devprod-documentation',
        title: 'What documentation practices provide the highest ROI for engineering teams?',
        difficulty: 'beginner',
        answer:
          'Architecture Decision Records (ADRs) capture the why behind design choices and remain valuable for years. Runbooks for on-call engineers and onboarding guides for new hires are high-ROI because they reduce repeated questions. API docs should be auto-generated from code (OpenAPI, JSDoc) so they stay in sync, since manually maintained docs inevitably drift and become misleading.',
        tags: ['documentation', 'adrs', 'onboarding', 'api-docs'],
        keyTakeaway: 'ADRs, runbooks, and auto-generated API docs provide the highest long-term return on documentation effort.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Payments Integration
  // ─────────────────────────────────────────────
  {
    id: 'fs-payments',
    label: 'Payments Integration',
    icon: 'CreditCard',
    description:
      'Integrating payment processors, handling webhooks, ensuring PCI compliance, and managing recurring billing in web applications.',
    questions: [
      {
        id: 'fs-payments-stripe',
        title: 'How does a typical Stripe integration flow work?',
        difficulty: 'intermediate',
        answer:
          'The client creates a PaymentIntent via your backend, which returns a client secret to the frontend. The frontend uses Stripe.js and Elements to securely collect card details and confirm the payment without sensitive data touching your server. After confirmation, Stripe sends webhook events to your backend to update order status, ensuring you handle asynchronous outcomes reliably.',
        tags: ['stripe', 'payments', 'integration', 'frontend'],
        keyTakeaway: 'Stripe integration keeps card data off your servers by using client-side Elements and server-side webhooks for confirmation.',
      },
      {
        id: 'fs-payments-intents',
        title: 'What is a PaymentIntent and why does Stripe use this model?',
        difficulty: 'intermediate',
        answer:
          'A PaymentIntent represents the lifecycle of a single payment attempt, tracking its state from creation through authentication, capture, and settlement. This model handles the complexity of 3D Secure, retries, and asynchronous bank responses in a single object with a clear state machine. It replaced the older Charges API because modern regulations like SCA (Strong Customer Authentication) require multi-step flows.',
        tags: ['stripe', 'payment-intent', 'sca', 'api-design'],
        keyTakeaway: 'PaymentIntents model the full payment lifecycle to handle multi-step flows like 3D Secure and SCA compliance.',
      },
      {
        id: 'fs-payments-webhooks',
        title: 'Why are webhooks essential for payment processing?',
        difficulty: 'intermediate',
        answer:
          'Payments are inherently asynchronous because bank transfers, fraud checks, and 3D Secure can take seconds to days, so your backend cannot rely on synchronous API responses alone. Webhooks deliver events like payment_intent.succeeded or charge.disputed to your server as they occur, letting you update order status and provision access reliably. Always verify webhook signatures and implement idempotent handlers to safely process retries.',
        tags: ['webhooks', 'payments', 'async', 'reliability'],
        keyTakeaway: 'Webhooks are required because payments are asynchronous; always verify signatures and handle events idempotently.',
      },
      {
        id: 'fs-payments-pci',
        title: 'What does PCI compliance mean for a web application?',
        difficulty: 'advanced',
        answer:
          'PCI DSS is a set of security standards required for any business handling credit card data, with compliance levels based on transaction volume. Using Stripe Elements or Checkout means card data never touches your servers, qualifying you for the simplest self-assessment (SAQ A) with only about 20 controls. If you store card numbers server-side, you face the full 300+ control SAQ D, which is prohibitively expensive for most startups.',
        tags: ['pci', 'compliance', 'security', 'payments'],
        keyTakeaway: 'Use hosted payment fields like Stripe Elements to avoid handling card data and stay in the simplest PCI compliance tier.',
      },
      {
        id: 'fs-payments-subscriptions',
        title: 'How do you implement subscription billing with Stripe?',
        difficulty: 'advanced',
        answer:
          'Stripe Subscriptions tie a Customer to a recurring Price, automatically generating invoices and charging the payment method on each billing cycle. Your backend must handle webhook events like invoice.paid, invoice.payment_failed, and customer.subscription.updated to sync subscription state and manage access. Dunning retry logic is configurable in the dashboard, and you should implement grace periods and clear proration rules for plan changes.',
        tags: ['subscriptions', 'billing', 'stripe', 'saas'],
        keyTakeaway: 'Subscription billing requires webhook-driven state sync and careful handling of failed payments, prorations, and cancellations.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. File Storage
  // ─────────────────────────────────────────────
  {
    id: 'fs-files',
    label: 'File Storage',
    icon: 'Upload',
    description:
      'Patterns for handling file uploads, cloud storage integration, image optimization, and serving static assets efficiently at scale.',
    questions: [
      {
        id: 'fs-files-cloud-storage',
        title: 'Why use S3 or cloud object storage instead of local disk?',
        difficulty: 'beginner',
        answer:
          'Cloud object storage like S3 provides virtually unlimited capacity, 99.999999999% durability, built-in redundancy across availability zones, and pay-per-use pricing. Local disk does not survive instance termination, cannot be shared across scaled instances, and requires manual backup management. Object storage also integrates natively with CDNs, access policies, and lifecycle rules for automatic archival or deletion.',
        tags: ['s3', 'cloud-storage', 'infrastructure', 'files'],
        keyTakeaway: 'Cloud object storage offers durability, scalability, and shareability that local disk cannot provide in distributed systems.',
      },
      {
        id: 'fs-files-presigned-urls',
        title: 'What are presigned URLs and why use them for uploads?',
        difficulty: 'intermediate',
        answer:
          'A presigned URL is a time-limited, signed URL that grants temporary permission to upload or download an object directly to/from S3 without the request passing through your application server. This offloads bandwidth and CPU from your backend, eliminates file size limitations imposed by API gateways, and keeps your S3 credentials server-side. The backend generates the URL with the target key, content type, and expiry, then the client uploads directly.',
        tags: ['presigned-urls', 's3', 'uploads', 'security'],
        keyTakeaway: 'Presigned URLs let clients upload directly to S3, offloading bandwidth from your server while keeping credentials safe.',
      },
      {
        id: 'fs-files-image-optimization',
        title: 'How should you handle image optimization in a fullstack application?',
        difficulty: 'intermediate',
        answer:
          'Serve images in modern formats like WebP or AVIF with responsive srcset attributes so browsers download the smallest sufficient variant. Use an image CDN like Cloudinary, imgix, or Cloudflare Images that transforms and caches images on the fly based on URL parameters for dimensions, format, and quality. This avoids storing dozens of pre-generated variants and ensures optimal delivery to every device and screen size.',
        tags: ['images', 'optimization', 'webp', 'cdn'],
        keyTakeaway: 'Use an image CDN with on-the-fly transforms to serve optimal formats and sizes without pre-generating variants.',
      },
      {
        id: 'fs-files-cdn-static',
        title: 'How do you serve static assets through a CDN efficiently?',
        difficulty: 'beginner',
        answer:
          'Configure your build tool to produce content-hashed filenames (e.g., main.a1b2c3.js) and set long Cache-Control max-age headers since the hash changes on every rebuild, making cache invalidation automatic. Upload build artifacts to S3 or a storage bucket and point a CDN distribution at it as the origin. This pattern ensures users always get fresh code after deploys while maximizing cache hit rates for unchanged assets.',
        tags: ['cdn', 'static-assets', 'caching', 'deployment'],
        keyTakeaway: 'Content-hashed filenames with long cache headers give you both instant updates on deploy and maximum cache hit rates.',
      },
      {
        id: 'fs-files-multipart',
        title: 'When and how should you use multipart uploads?',
        difficulty: 'advanced',
        answer:
          'Multipart upload splits a large file into smaller chunks (typically 5-100 MB each) that upload in parallel and can individually retry on failure. S3 requires multipart for objects over 5 GB and recommends it for anything over 100 MB because it improves throughput and resilience over unreliable networks. Your backend initiates the upload, the client uploads parts directly to S3 with presigned URLs, and the backend completes or aborts after all parts finish.',
        tags: ['multipart', 'uploads', 's3', 'large-files'],
        keyTakeaway: 'Multipart uploads enable parallel, resumable transfers for large files by splitting them into independently uploaded chunks.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. Search Implementation
  // ─────────────────────────────────────────────
  {
    id: 'fs-search',
    label: 'Search Implementation',
    icon: 'Search',
    description:
      'Building search functionality from basic full-text queries to advanced Elasticsearch-powered search with facets and autocomplete.',
    questions: [
      {
        id: 'fs-search-fulltext',
        title: 'How does full-text search work at the database level?',
        difficulty: 'intermediate',
        answer:
          'Full-text search creates an inverted index that maps every normalized word (token) to the rows containing it, enabling fast lookups without scanning every row. PostgreSQL provides built-in tsvector and tsquery types that handle tokenization, stemming, stop words, and ranking, which is sufficient for many applications. A GIN index on a tsvector column can handle millions of documents without any external search engine.',
        tags: ['full-text-search', 'postgresql', 'indexing', 'database'],
        keyTakeaway: 'PostgreSQL full-text search with GIN indexes handles millions of documents and avoids the need for a separate search engine.',
      },
      {
        id: 'fs-search-elasticsearch',
        title: 'When should you introduce Elasticsearch instead of database search?',
        difficulty: 'advanced',
        answer:
          'Introduce Elasticsearch when you need features like fuzzy matching, synonym expansion, relevance tuning with custom scoring, multi-language analyzers, or search across tens of millions of documents with sub-100ms latency. It also excels at aggregations and analytics queries that would be slow in a relational database. The trade-off is operational complexity: you must maintain a separate cluster and keep the search index synchronized with your source of truth.',
        tags: ['elasticsearch', 'search', 'infrastructure', 'scaling'],
        keyTakeaway: 'Use Elasticsearch when you need advanced relevance tuning, fuzzy matching, or analytics beyond what database search provides.',
      },
      {
        id: 'fs-search-indexing',
        title: 'How do you keep a search index in sync with your primary database?',
        difficulty: 'advanced',
        answer:
          'The most reliable approach is Change Data Capture (CDC), where tools like Debezium stream database changes to Elasticsearch via Kafka with minimal lag. A simpler alternative is application-level dual writes, where your API updates both the database and search index, though this risks inconsistency if one write fails. Periodic full reindexing as a fallback ensures eventual consistency regardless of the sync mechanism.',
        tags: ['indexing', 'cdc', 'sync', 'elasticsearch'],
        keyTakeaway: 'Change Data Capture provides the most reliable index sync; periodic full reindexing serves as a safety net.',
      },
      {
        id: 'fs-search-faceted',
        title: 'What is faceted search and how is it implemented?',
        difficulty: 'intermediate',
        answer:
          'Faceted search lets users narrow results by categories (e.g., brand, price range, rating) while showing count badges for each option, like filters on e-commerce sites. Elasticsearch implements this via aggregation queries that compute bucket counts alongside the search results in a single request. The UI renders these aggregation buckets as clickable filters, and selecting a facet adds a filter term to the query while recomputing remaining counts.',
        tags: ['faceted-search', 'aggregations', 'elasticsearch', 'ux'],
        keyTakeaway: 'Faceted search uses aggregation queries to compute filter counts alongside results in a single request.',
      },
      {
        id: 'fs-search-autocomplete',
        title: 'How do you build a performant autocomplete/typeahead feature?',
        difficulty: 'intermediate',
        answer:
          'Autocomplete requires sub-50ms responses, so use dedicated data structures like Elasticsearch completion suggesters backed by FST (finite state transducer) indexes or a prefix trie in Redis. Debounce keystrokes on the frontend (200-300ms) to avoid flooding the backend, and cache recent queries. For small datasets, client-side filtering of a preloaded list is the simplest and fastest approach.',
        tags: ['autocomplete', 'typeahead', 'search', 'performance'],
        keyTakeaway: 'Autocomplete needs specialized indexes and frontend debouncing to deliver sub-50ms suggestions at scale.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. Background Jobs
  // ─────────────────────────────────────────────
  {
    id: 'fs-jobs',
    label: 'Background Jobs',
    icon: 'Clock',
    description:
      'Designing reliable job queues, scheduling recurring tasks, handling retries, and ensuring exactly-once semantics in distributed systems.',
    questions: [
      {
        id: 'fs-jobs-queues',
        title: 'What is a job queue and when should you use one?',
        difficulty: 'beginner',
        answer:
          'A job queue decouples time-consuming work like sending emails, processing images, or generating reports from the request-response cycle by placing tasks in a persistent queue for workers to process asynchronously. This keeps API response times fast and lets you scale workers independently from web servers. Popular implementations include BullMQ (Redis-backed for Node.js), Celery (Python), and Sidekiq (Ruby).',
        tags: ['job-queue', 'async', 'architecture', 'bullmq'],
        keyTakeaway: 'Job queues move slow work out of the request path, keeping APIs fast and allowing independent worker scaling.',
      },
      {
        id: 'fs-jobs-cron',
        title: 'How do you run cron jobs reliably in a distributed environment?',
        difficulty: 'intermediate',
        answer:
          'Traditional cron on a single server is a single point of failure and does not prevent duplicate execution across scaled instances. Use a distributed scheduler like node-cron with a Redis lock, pg_cron for PostgreSQL, or a managed service like AWS EventBridge to trigger jobs. The key requirement is leader election or distributed locking to ensure exactly one instance executes each scheduled task.',
        tags: ['cron', 'scheduling', 'distributed', 'reliability'],
        keyTakeaway: 'Distributed cron requires leader election or locking to prevent duplicate execution across multiple instances.',
      },
      {
        id: 'fs-jobs-retries',
        title: 'What retry strategy should background jobs use?',
        difficulty: 'intermediate',
        answer:
          'Use exponential backoff with jitter to avoid thundering herd problems when many failed jobs retry simultaneously. Set a maximum retry count (typically 3-5) and move permanently failed jobs to a dead letter queue for manual inspection. Each retry should log context about the failure reason so engineers can diagnose systemic issues from the dead letter queue.',
        tags: ['retries', 'backoff', 'dead-letter', 'reliability'],
        keyTakeaway: 'Exponential backoff with jitter prevents thundering herds; dead letter queues capture permanently failed jobs for review.',
      },
      {
        id: 'fs-jobs-idempotent',
        title: 'Why must background jobs be idempotent?',
        difficulty: 'advanced',
        answer:
          'Job queues guarantee at-least-once delivery, meaning a job may execute more than once due to worker crashes, network timeouts, or redelivery after acknowledgment failures. If a job is not idempotent, duplicate execution causes bugs like sending duplicate emails, double-charging customers, or corrupting data. Achieve idempotency by using unique job IDs with deduplication checks, database upserts, or conditional updates that are safe to repeat.',
        tags: ['idempotency', 'reliability', 'at-least-once', 'jobs'],
        keyTakeaway: 'Jobs must be idempotent because at-least-once delivery means any job may execute multiple times.',
      },
      {
        id: 'fs-jobs-monitoring',
        title: 'How do you monitor background job health?',
        difficulty: 'intermediate',
        answer:
          'Track key metrics including queue depth (backlog), processing rate (throughput), error rate, job duration percentiles, and dead letter queue size. Alert when queue depth grows faster than processing rate, indicating workers cannot keep up, or when the dead letter queue exceeds a threshold. Tools like Bull Board, Flower (Celery), or custom Grafana dashboards provide real-time visibility into these metrics.',
        tags: ['monitoring', 'metrics', 'jobs', 'observability'],
        keyTakeaway: 'Monitor queue depth, processing rate, and dead letter queue size to detect backlogs and systemic job failures early.',
      },
      {
        id: 'fs-jobs-scheduled',
        title: 'How do you implement delayed and scheduled tasks in a job queue?',
        difficulty: 'intermediate',
        answer:
          'Most job queue libraries support delayed jobs by specifying a delay or a future timestamp when enqueuing; the job remains invisible to workers until the scheduled time. BullMQ uses Redis sorted sets with timestamps as scores, and Celery uses countdown or eta parameters. For recurring schedules, define repeatable jobs with a cron expression so the queue system automatically enqueues the next instance after each execution.',
        tags: ['scheduling', 'delayed-jobs', 'cron', 'bullmq'],
        keyTakeaway: 'Job queues support delayed execution via timestamps and recurring tasks via cron expressions on repeatable jobs.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. Real-time Features
  // ─────────────────────────────────────────────
  {
    id: 'fs-realtime',
    label: 'Real-time Features',
    icon: 'Radio',
    description:
      'Building real-time communication with WebSockets, Server-Sent Events, and managed real-time databases for live updates, presence, and collaboration.',
    questions: [
      {
        id: 'fs-realtime-websockets',
        title: 'How do WebSockets work and when should you use them?',
        difficulty: 'intermediate',
        answer:
          'WebSockets upgrade an HTTP connection to a persistent, full-duplex TCP channel where both client and server can send messages at any time without repeated handshakes. Use them when you need low-latency bidirectional communication like chat, multiplayer games, or collaborative editing. They require stateful connections, which complicates horizontal scaling since you need sticky sessions or a pub/sub layer like Redis to broadcast across servers.',
        tags: ['websockets', 'real-time', 'bidirectional', 'tcp'],
        keyTakeaway: 'WebSockets provide full-duplex real-time communication but require sticky sessions or pub/sub for horizontal scaling.',
      },
      {
        id: 'fs-realtime-sse',
        title: 'When would you choose Server-Sent Events over WebSockets?',
        difficulty: 'intermediate',
        answer:
          'SSE is ideal when you only need server-to-client streaming, such as live dashboards, notification feeds, or progress updates, because it works over standard HTTP with automatic reconnection and last-event-id tracking built into the browser. SSE is simpler to deploy behind load balancers and proxies since it is just a long-lived HTTP response. Choose WebSockets only when you need client-to-server messages on the same channel.',
        tags: ['sse', 'server-sent-events', 'streaming', 'real-time'],
        keyTakeaway: 'Use SSE for server-to-client streaming; it is simpler than WebSockets and works natively with HTTP infrastructure.',
      },
      {
        id: 'fs-realtime-socketio',
        title: 'What does Socket.io provide beyond raw WebSockets?',
        difficulty: 'intermediate',
        answer:
          'Socket.io adds automatic fallback to HTTP long-polling when WebSockets are unavailable, transparent reconnection with buffered events, rooms and namespaces for organizing connections, and built-in acknowledgment callbacks. It also provides a Redis adapter for broadcasting events across multiple server instances, solving the horizontal scaling problem. The trade-off is a proprietary protocol, meaning both client and server must use the Socket.io library.',
        tags: ['socket-io', 'websockets', 'real-time', 'scaling'],
        keyTakeaway: 'Socket.io wraps WebSockets with reconnection, rooms, fallbacks, and multi-server broadcasting via Redis adapter.',
      },
      {
        id: 'fs-realtime-firebase',
        title: 'How do real-time databases like Firebase Realtime or Firestore work?',
        difficulty: 'beginner',
        answer:
          'Firebase syncs data between clients and the cloud in real time by maintaining persistent connections and pushing changes to all subscribed clients within milliseconds. Firestore organizes data as documents in collections with real-time listeners that fire on any document change matching a query. This eliminates the need to build your own WebSocket server, pub/sub layer, and conflict resolution, making it ideal for apps where real-time sync is a core feature.',
        tags: ['firebase', 'firestore', 'real-time', 'baas'],
        keyTakeaway: 'Firebase provides managed real-time sync that eliminates building your own WebSocket and pub/sub infrastructure.',
      },
      {
        id: 'fs-realtime-presence',
        title: 'How do you implement user presence detection (online/offline status)?',
        difficulty: 'advanced',
        answer:
          'Presence detection tracks which users are currently connected by maintaining a heartbeat or connection state in a shared store like Redis or Firebase presence. When a WebSocket disconnects or heartbeat times out, the user is marked offline after a grace period to handle brief network blips. The challenge at scale is efficiently broadcasting presence changes to potentially thousands of interested clients without overwhelming the system.',
        tags: ['presence', 'real-time', 'websockets', 'redis'],
        keyTakeaway: 'Presence detection uses heartbeats with a grace period to track online status and must broadcast changes efficiently.',
      },
      {
        id: 'fs-realtime-conflict',
        title: 'How do you handle conflict resolution in real-time collaborative editing?',
        difficulty: 'advanced',
        answer:
          'The two main approaches are Operational Transformation (OT), used by Google Docs, which transforms concurrent operations against each other to preserve intent, and CRDTs (Conflict-free Replicated Data Types), used by Figma and Yjs, which use mathematically guaranteed merge properties that converge without a central server. CRDTs are increasingly preferred because they work offline and in peer-to-peer topologies, while OT requires a central sequencing server.',
        tags: ['crdt', 'ot', 'collaboration', 'conflict-resolution'],
        keyTakeaway: 'CRDTs are replacing OT for collaborative editing because they converge automatically without a central server.',
      },
    ],
  },
];

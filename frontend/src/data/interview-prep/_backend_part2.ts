import type { InterviewTopic } from './types';

export const BACKEND_PART2_TOPICS: InterviewTopic[] = [
  // ─────────────────────────────────────────────
  // 1. Microservices (10 questions)
  // ─────────────────────────────────────────────
  {
    id: 'be-microservices',
    label: 'Microservices',
    icon: 'Boxes',
    description:
      'Architecture patterns, communication strategies, and operational challenges of building distributed microservice systems.',
    questions: [
      {
        id: 'be-microservices-monolith-vs-micro',
        title: 'Monolith vs Microservices',
        difficulty: 'beginner',
        answer:
          'A monolith deploys the entire application as a single unit with shared memory and a single database, making it simpler to develop and debug initially. Microservices split the application into independently deployable services, each owning its own data store, which enables independent scaling and team autonomy at the cost of added operational complexity such as network latency, distributed transactions, and service discovery.',
        tags: ['architecture', 'monolith', 'microservices'],
        keyTakeaway:
          'Start with a monolith and extract microservices only when organizational or scaling pain justifies the distributed-systems overhead.',
      },
      {
        id: 'be-microservices-service-discovery',
        title: 'Service Discovery',
        difficulty: 'intermediate',
        answer:
          'Service discovery lets services find each other dynamically without hardcoded addresses, using either client-side discovery where the client queries a registry like Consul or Eureka, or server-side discovery where a load balancer or DNS like AWS ELB handles resolution. In Kubernetes, service discovery is built-in through kube-dns and ClusterIP services, so each service gets a stable DNS name that resolves to healthy pod IPs automatically.',
        tags: ['service-discovery', 'consul', 'kubernetes', 'dns'],
        keyTakeaway:
          'Service discovery eliminates hardcoded endpoints by letting services register themselves and look up others via a registry or DNS.',
      },
      {
        id: 'be-microservices-api-gateway',
        title: 'API Gateway Pattern',
        difficulty: 'intermediate',
        answer:
          'An API gateway sits between clients and backend microservices, providing a single entry point that handles cross-cutting concerns like authentication, rate limiting, request routing, and response aggregation. Popular implementations include Kong, AWS API Gateway, and Envoy, which can also perform protocol translation, SSL termination, and request/response transformation. The gateway prevents clients from needing to know about individual service addresses and simplifies client-side logic by aggregating multiple service calls into a single API response.',
        tags: ['api-gateway', 'routing', 'kong', 'envoy'],
        keyTakeaway:
          'An API gateway provides a unified entry point that offloads authentication, rate limiting, and routing from individual services.',
      },
      {
        id: 'be-microservices-circuit-breaker',
        title: 'Circuit Breaker Pattern',
        difficulty: 'intermediate',
        answer:
          'The circuit breaker pattern prevents cascading failures by wrapping remote calls in a state machine with three states: closed (normal operation), open (all calls fail fast without reaching the downstream), and half-open (a few probe requests test if the downstream has recovered). When failures exceed a threshold the circuit opens, giving the failing service time to recover instead of being overwhelmed with requests. Libraries like Hystrix, Resilience4j, and Polly implement this pattern with configurable failure thresholds, timeout durations, and fallback responses.',
        tags: ['circuit-breaker', 'resilience', 'fault-tolerance'],
        keyTakeaway:
          'A circuit breaker fails fast when a downstream service is unhealthy, preventing cascade failures and allowing recovery time.',
      },
      {
        id: 'be-microservices-saga',
        title: 'Saga Pattern',
        difficulty: 'advanced',
        answer:
          'The saga pattern manages distributed transactions across multiple services by breaking them into a sequence of local transactions, each publishing an event or command that triggers the next step. If any step fails, compensating transactions are executed in reverse order to undo previously completed steps. There are two coordination approaches: choreography where each service listens for events and acts independently, and orchestration where a central coordinator directs the saga steps.',
        tags: ['saga', 'distributed-transactions', 'choreography', 'orchestration'],
        keyTakeaway:
          'Sagas replace distributed ACID transactions with a sequence of local transactions and compensating actions for rollback.',
      },
      {
        id: 'be-microservices-communication',
        title: 'Inter-Service Communication',
        difficulty: 'intermediate',
        answer:
          'Synchronous communication uses REST or gRPC where the caller blocks until a response arrives, which is simple but creates tight coupling and latency chains. Asynchronous communication uses message brokers like Kafka, RabbitMQ, or SQS where services publish events without waiting for consumers, enabling loose coupling and better fault tolerance. Most production systems use a mix: synchronous for queries needing immediate responses and asynchronous for commands, notifications, and event-driven workflows.',
        tags: ['grpc', 'messaging', 'kafka', 'async-communication'],
        keyTakeaway:
          'Use synchronous calls for real-time queries and asynchronous messaging for event-driven workflows to balance coupling and latency.',
      },
      {
        id: 'be-microservices-event-sourcing',
        title: 'Event Sourcing',
        difficulty: 'advanced',
        answer:
          'Event sourcing persists every state change as an immutable event in an append-only log rather than storing only the current state, allowing you to reconstruct any past state by replaying events from the beginning. This provides a complete audit trail, enables temporal queries, and supports building multiple read-optimized projections from the same event stream. The trade-off is increased storage, eventual consistency in read models, and complexity in handling schema evolution of events over time.',
        tags: ['event-sourcing', 'cqrs', 'audit-log'],
        keyTakeaway:
          'Event sourcing stores every state change as an immutable event, providing a full audit trail and the ability to rebuild state at any point in time.',
      },
      {
        id: 'be-microservices-sidecar',
        title: 'Sidecar Pattern',
        difficulty: 'advanced',
        answer:
          'The sidecar pattern deploys a helper process alongside the main application container in the same pod or host, handling cross-cutting concerns like logging, monitoring, TLS termination, and service mesh communication without modifying application code. Service meshes like Istio and Linkerd use Envoy sidecars to transparently manage mTLS, traffic routing, retries, and observability between services. This allows polyglot services to gain infrastructure capabilities uniformly regardless of what language or framework they use.',
        tags: ['sidecar', 'service-mesh', 'istio', 'envoy'],
        keyTakeaway:
          'A sidecar process handles infrastructure concerns like networking and observability alongside the main container without changing application code.',
      },
      {
        id: 'be-microservices-strangler-fig',
        title: 'Strangler Fig Migration',
        difficulty: 'advanced',
        answer:
          'The strangler fig pattern incrementally migrates a monolith to microservices by routing new functionality and gradually re-routed existing features to new services while the monolith continues serving unreplaced parts. A facade or API gateway intercepts requests and decides whether to forward them to the legacy monolith or the new microservice, allowing a gradual, low-risk transition. Over time the monolith shrinks as more routes are redirected until it can be fully decommissioned.',
        tags: ['migration', 'strangler-fig', 'monolith', 'refactoring'],
        keyTakeaway:
          'The strangler fig pattern lets you incrementally replace a monolith by routing traffic to new microservices one feature at a time.',
      },
      {
        id: 'be-microservices-data-ownership',
        title: 'Data Ownership in Microservices',
        difficulty: 'intermediate',
        answer:
          'Each microservice should own its data store exclusively and never allow other services to access its database directly, enforcing encapsulation at the data layer. Other services request data through the owning service API or subscribe to its published events, which prevents tight schema coupling and allows each service to choose the most appropriate database technology. Cross-service queries are handled via API composition, CQRS read models, or materialized views built from event streams.',
        tags: ['data-ownership', 'database-per-service', 'encapsulation'],
        keyTakeaway:
          'Each microservice exclusively owns its database, and other services access that data only through APIs or published events.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. GraphQL (6 questions)
  // ─────────────────────────────────────────────
  {
    id: 'be-graphql',
    label: 'GraphQL',
    icon: 'GitBranch',
    description:
      'Core GraphQL concepts including schema design, resolvers, performance pitfalls, and how it compares to REST.',
    questions: [
      {
        id: 'be-graphql-queries-mutations-subscriptions',
        title: 'Queries, Mutations, and Subscriptions',
        difficulty: 'beginner',
        answer:
          'GraphQL defines three root operation types: queries for reading data, mutations for writing or modifying data, and subscriptions for receiving real-time updates pushed from the server over WebSockets. Queries and mutations follow a request-response pattern where the client specifies exactly which fields it needs, while subscriptions maintain a persistent connection for streaming events. All three use the same schema type system and can return complex nested object graphs.',
        tags: ['graphql', 'queries', 'mutations', 'subscriptions'],
        keyTakeaway:
          'Queries read data, mutations modify data, and subscriptions stream real-time updates, all using the same typed schema.',
      },
      {
        id: 'be-graphql-resolvers',
        title: 'Resolvers',
        difficulty: 'intermediate',
        answer:
          'Resolvers are functions that populate each field in a GraphQL schema by fetching data from databases, APIs, or any other source, forming a resolver chain where parent resolvers pass results to child resolvers. Each resolver receives four arguments: the parent object, the field arguments, a shared context object for auth and database connections, and schema info. The execution engine calls resolvers top-down, and any field without a custom resolver falls back to a default that reads the property name from the parent object.',
        tags: ['resolvers', 'graphql', 'data-fetching'],
        keyTakeaway:
          'Resolvers are per-field functions that fetch data for the schema, chaining from parent to child to build the full response.',
      },
      {
        id: 'be-graphql-schema-design',
        title: 'Schema Design Best Practices',
        difficulty: 'intermediate',
        answer:
          'Good GraphQL schema design uses descriptive type names, avoids exposing database internals, and models relationships using connection-based pagination with edges and nodes for large lists. Input types should be used for mutation arguments to group parameters cleanly, and nullable versus non-nullable fields should reflect actual business invariants. Deprecating fields with the @deprecated directive instead of removing them maintains backward compatibility for existing clients.',
        tags: ['schema', 'graphql', 'api-design', 'pagination'],
        keyTakeaway:
          'Design schemas around business domain concepts, use connection pagination for lists, and deprecate fields instead of removing them.',
      },
      {
        id: 'be-graphql-n-plus-one',
        title: 'N+1 Problem and DataLoader',
        difficulty: 'advanced',
        answer:
          'The N+1 problem occurs when a list query triggers one database call for the parent list and then N additional calls to resolve a nested field for each item, devastating performance at scale. DataLoader solves this by batching and deduplicating all data-fetching calls within a single tick of the event loop into one bulk query, turning N+1 queries into just 2. DataLoader instances should be created per-request to avoid caching stale data across different users or mutations.',
        tags: ['n-plus-one', 'dataloader', 'batching', 'performance'],
        keyTakeaway:
          'DataLoader batches and deduplicates resolver calls within a single tick to eliminate N+1 query performance problems.',
      },
      {
        id: 'be-graphql-rest-vs-graphql',
        title: 'REST vs GraphQL Trade-offs',
        difficulty: 'intermediate',
        answer:
          'REST uses multiple endpoints with fixed response shapes and benefits from native HTTP caching, making it ideal for public APIs and CDN-friendly resources. GraphQL uses a single endpoint where clients specify exactly the data they need, eliminating over-fetching and under-fetching but requiring application-level caching like persisted queries. REST is simpler to monitor and rate-limit per endpoint, while GraphQL excels in complex frontends that aggregate data from many backend services.',
        tags: ['rest', 'graphql', 'api-design', 'caching'],
        keyTakeaway:
          'REST offers simplicity and native HTTP caching while GraphQL provides flexible queries that eliminate over-fetching and under-fetching.',
      },
      {
        id: 'be-graphql-federation',
        title: 'GraphQL Federation',
        difficulty: 'advanced',
        answer:
          'Federation lets multiple teams each own a GraphQL subgraph for their domain, and a gateway composes them into a single unified supergraph that clients query as if it were one API. Each subgraph can extend types owned by other subgraphs using the @key directive to define entity boundaries and the @external directive to reference foreign fields. Apollo Federation is the most widely adopted implementation, enabling independent deployment and scaling of subgraphs while presenting a seamless schema to consumers.',
        tags: ['federation', 'apollo', 'subgraph', 'gateway'],
        keyTakeaway:
          'Federation composes independently owned subgraphs into a single unified API via a gateway, enabling team autonomy at scale.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Linux & Networking (10 questions)
  // ─────────────────────────────────────────────
  {
    id: 'be-linux',
    label: 'Linux & Networking',
    icon: 'Terminal',
    description:
      'Essential Linux administration, networking protocols, and debugging tools every backend engineer should know.',
    questions: [
      {
        id: 'be-linux-tcp-ip',
        title: 'TCP/IP Fundamentals',
        difficulty: 'beginner',
        answer:
          'TCP/IP is a four-layer protocol stack where the link layer handles physical transmission, the internet layer routes packets via IP, the transport layer provides reliable ordered delivery via TCP or fast unreliable delivery via UDP, and the application layer carries protocols like HTTP and DNS. TCP uses a three-way handshake to establish connections and sequence numbers with acknowledgments to guarantee delivery and ordering. Understanding TCP is critical for debugging issues like connection timeouts, packet retransmission, and window sizing that affect application performance.',
        tags: ['tcp', 'ip', 'networking', 'protocols'],
        keyTakeaway:
          'TCP/IP provides reliable, ordered data delivery through a four-layer stack, with TCP using handshakes and acknowledgments to guarantee transmission.',
      },
      {
        id: 'be-linux-dns',
        title: 'DNS Resolution',
        difficulty: 'beginner',
        answer:
          'DNS translates human-readable domain names into IP addresses through a hierarchical lookup process that queries root servers, TLD servers, and authoritative nameservers, with results cached at each level according to TTL values. Common record types include A records for IPv4 addresses, AAAA for IPv6, CNAME for aliases, MX for mail servers, and TXT for verification and SPF. DNS caching at the browser, OS, and resolver levels significantly reduces lookup latency, but stale caches can cause issues during migrations or failovers.',
        tags: ['dns', 'networking', 'resolution', 'caching'],
        keyTakeaway:
          'DNS hierarchically resolves domain names to IP addresses using cached lookups across root, TLD, and authoritative nameservers.',
      },
      {
        id: 'be-linux-http2',
        title: 'HTTP/2 and HTTP/3',
        difficulty: 'intermediate',
        answer:
          'HTTP/2 introduced binary framing, multiplexing multiple requests over a single TCP connection, header compression with HPACK, and server push, eliminating the head-of-line blocking at the HTTP layer that plagued HTTP/1.1. HTTP/3 replaces TCP with QUIC, a UDP-based transport that eliminates head-of-line blocking at the transport layer and provides faster connection establishment with built-in TLS 1.3. Most modern web servers and CDNs support HTTP/2 by default, and HTTP/3 adoption is growing rapidly for mobile and high-latency networks.',
        tags: ['http2', 'http3', 'quic', 'multiplexing'],
        keyTakeaway:
          'HTTP/2 multiplexes requests over one TCP connection, while HTTP/3 uses QUIC over UDP to eliminate transport-layer head-of-line blocking.',
      },
      {
        id: 'be-linux-load-balancing',
        title: 'Load Balancing',
        difficulty: 'intermediate',
        answer:
          'Load balancers distribute incoming traffic across multiple backend servers using algorithms like round-robin, least connections, IP hash, or weighted distribution to improve availability and throughput. Layer 4 load balancers operate at the TCP level making routing decisions based on IP and port, while layer 7 load balancers inspect HTTP headers, cookies, and URL paths for content-aware routing. Production setups often combine both: an L4 balancer like AWS NLB at the edge for raw throughput and an L7 balancer like Nginx or HAProxy behind it for application routing.',
        tags: ['load-balancing', 'nginx', 'haproxy', 'scaling'],
        keyTakeaway:
          'Load balancers distribute traffic across servers using algorithms like round-robin or least-connections, operating at either L4 or L7.',
      },
      {
        id: 'be-linux-reverse-proxy',
        title: 'Reverse Proxy',
        difficulty: 'intermediate',
        answer:
          'A reverse proxy sits in front of backend servers and forwards client requests to them, providing benefits like SSL termination, caching, compression, and hiding the internal server topology from the public internet. Nginx and Caddy are popular reverse proxies that can also serve static files, handle rate limiting, and add security headers before forwarding requests to application servers. Unlike a forward proxy that acts on behalf of clients, a reverse proxy acts on behalf of servers and is essential in production for security, performance, and zero-downtime deployments.',
        tags: ['reverse-proxy', 'nginx', 'ssl-termination', 'security'],
        keyTakeaway:
          'A reverse proxy forwards client requests to backend servers while providing SSL termination, caching, and security isolation.',
      },
      {
        id: 'be-linux-file-permissions',
        title: 'Linux File Permissions',
        difficulty: 'beginner',
        answer:
          'Linux file permissions use a three-group model of owner, group, and others, each with read, write, and execute bits represented as a three-digit octal number like 755 or symbolic notation like rwxr-xr-x. The chmod command modifies permissions, chown changes ownership, and special bits include setuid, setgid, and the sticky bit for shared directories. Misconfigured permissions are a common security vulnerability, such as world-readable private keys or world-writable config files that allow privilege escalation.',
        tags: ['linux', 'permissions', 'chmod', 'security'],
        keyTakeaway:
          'Linux permissions control read, write, and execute access for owner, group, and others using octal notation like 755.',
      },
      {
        id: 'be-linux-process-management',
        title: 'Process Management',
        difficulty: 'intermediate',
        answer:
          'Linux processes are managed through signals, with SIGTERM for graceful shutdown, SIGKILL for forced termination, and SIGHUP traditionally for reloading configuration. Key commands include ps and top for viewing processes, kill for sending signals, nice and renice for adjusting priority, and nohup or disown for detaching processes from the terminal. Understanding process states, zombie processes caused by parents not calling wait, and orphan process adoption by init is essential for debugging production server issues.',
        tags: ['linux', 'processes', 'signals', 'debugging'],
        keyTakeaway:
          'Linux manages processes through signals like SIGTERM and SIGKILL, with tools like ps, top, and kill for inspection and control.',
      },
      {
        id: 'be-linux-systemd',
        title: 'systemd Service Management',
        difficulty: 'intermediate',
        answer:
          'systemd is the init system and service manager on most modern Linux distributions, using unit files to define how services start, stop, restart, and depend on each other. Key commands include systemctl start, stop, enable, disable, and status for managing services, and journalctl for viewing structured service logs. Unit files in /etc/systemd/system/ specify the ExecStart command, restart policies, resource limits, and dependency ordering, making systemd the standard way to run backend applications as daemons in production.',
        tags: ['systemd', 'linux', 'services', 'deployment'],
        keyTakeaway:
          'systemd manages Linux services through unit files and systemctl, handling startup, dependencies, restarts, and logging via journalctl.',
      },
      {
        id: 'be-linux-network-debugging',
        title: 'Network Debugging Tools',
        difficulty: 'intermediate',
        answer:
          'curl tests HTTP endpoints with full control over headers, methods, and payloads, while wget is simpler for downloading files. dig and nslookup query DNS records to verify resolution, traceroute shows the network path to a host, and netstat or ss display active connections and listening ports. tcpdump and Wireshark capture raw packets for deep inspection, and these tools together form the essential toolkit for diagnosing connectivity, DNS, latency, and TLS issues in production.',
        tags: ['debugging', 'curl', 'dig', 'tcpdump'],
        keyTakeaway:
          'Use curl for HTTP testing, dig for DNS queries, ss for connection inspection, and tcpdump for packet-level network debugging.',
      },
      {
        id: 'be-linux-firewall',
        title: 'Firewall Basics',
        difficulty: 'beginner',
        answer:
          'Firewalls filter network traffic based on rules that allow or deny packets by source IP, destination port, protocol, and connection state, with iptables and its modern replacement nftables being the standard Linux tools. UFW is a user-friendly frontend for iptables that simplifies common tasks like allowing SSH on port 22 or HTTP on port 80. Cloud providers offer security groups and network ACLs as managed firewalls, and the principle of least privilege means only opening the exact ports and IP ranges required for the application to function.',
        tags: ['firewall', 'iptables', 'security', 'networking'],
        keyTakeaway:
          'Firewalls filter traffic by IP, port, and protocol using tools like iptables or cloud security groups following the principle of least privilege.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Design Patterns (8 questions)
  // ─────────────────────────────────────────────
  {
    id: 'be-patterns',
    label: 'Design Patterns',
    icon: 'Puzzle',
    description:
      'Classic and modern design patterns used in backend development for maintainable, extensible, and testable code.',
    questions: [
      {
        id: 'be-patterns-singleton',
        title: 'Singleton Pattern',
        difficulty: 'beginner',
        answer:
          'The singleton pattern ensures a class has exactly one instance and provides a global access point to it, commonly used for database connection pools, configuration managers, and logging services. It is typically implemented by making the constructor private and exposing a static method that lazily creates the instance on first access. While useful for truly shared resources, singletons make unit testing harder because of hidden global state, which is why dependency injection is often preferred in modern codebases.',
        tags: ['singleton', 'creational', 'global-state'],
        keyTakeaway:
          'Singleton ensures one instance of a class, useful for connection pools but problematic for testing due to global state.',
      },
      {
        id: 'be-patterns-factory',
        title: 'Factory Pattern',
        difficulty: 'beginner',
        answer:
          'The factory pattern encapsulates object creation logic behind a method or class, letting calling code request objects by type or configuration without knowing the concrete class being instantiated. Factory Method defines an interface for creation in a superclass and lets subclasses decide which class to instantiate, while Abstract Factory creates families of related objects. This pattern is everywhere in backend frameworks: database driver selection, serializer creation, and payment processor instantiation based on provider configuration.',
        tags: ['factory', 'creational', 'abstraction'],
        keyTakeaway:
          'Factory encapsulates object creation behind a method, decoupling client code from concrete class instantiation logic.',
      },
      {
        id: 'be-patterns-observer',
        title: 'Observer Pattern',
        difficulty: 'intermediate',
        answer:
          'The observer pattern defines a one-to-many relationship where a subject notifies all registered observers automatically when its state changes, enabling loose coupling between the event source and its consumers. In backend systems this manifests as event emitters, pub/sub systems, webhook callbacks, and message broker consumers that react to domain events. The pattern is fundamental to event-driven architectures but requires careful handling of observer lifecycle, error isolation, and ordering guarantees.',
        tags: ['observer', 'behavioral', 'events', 'pub-sub'],
        keyTakeaway:
          'Observer notifies all registered listeners when state changes, forming the basis of event-driven and pub/sub architectures.',
      },
      {
        id: 'be-patterns-strategy',
        title: 'Strategy Pattern',
        difficulty: 'intermediate',
        answer:
          'The strategy pattern defines a family of interchangeable algorithms behind a common interface, letting the client switch between them at runtime without modifying the consuming code. Backend examples include swappable caching strategies for Redis versus Memcached, interchangeable payment processors, configurable sorting or filtering algorithms, and pluggable authentication methods. This pattern follows the open-closed principle because you can add new strategies without changing existing code, and it makes each algorithm independently testable.',
        tags: ['strategy', 'behavioral', 'algorithms', 'open-closed'],
        keyTakeaway:
          'Strategy encapsulates interchangeable algorithms behind a common interface, enabling runtime swapping without modifying client code.',
      },
      {
        id: 'be-patterns-repository',
        title: 'Repository Pattern',
        difficulty: 'intermediate',
        answer:
          'The repository pattern abstracts data access behind a collection-like interface with methods such as find, save, and delete, decoupling business logic from the specific database or ORM being used. This makes it easy to swap data sources, mock the data layer in unit tests, and encapsulate complex query logic in a single place. In practice, repositories often wrap an ORM like SQLAlchemy or Prisma and expose domain-oriented methods like findActiveUsersByRole rather than raw SQL or ORM query builders.',
        tags: ['repository', 'data-access', 'abstraction', 'testing'],
        keyTakeaway:
          'Repository abstracts data access behind a collection-like interface, decoupling business logic from database implementation.',
      },
      {
        id: 'be-patterns-decorator',
        title: 'Decorator Pattern',
        difficulty: 'intermediate',
        answer:
          'The decorator pattern wraps an object with additional behavior at runtime without modifying its interface, allowing you to stack multiple decorators for composable functionality. Backend examples include adding logging, caching, retry logic, or authentication checks around a service by wrapping it in decorator layers. In Python and TypeScript, language-level decorators and higher-order functions make this pattern syntactically lightweight, appearing commonly as middleware, route guards, and function wrappers.',
        tags: ['decorator', 'structural', 'composition', 'middleware'],
        keyTakeaway:
          'Decorator wraps an object to add behavior like logging or caching without modifying the original class or interface.',
      },
      {
        id: 'be-patterns-adapter',
        title: 'Adapter Pattern',
        difficulty: 'beginner',
        answer:
          'The adapter pattern converts the interface of one class into another interface that the client expects, allowing incompatible classes to work together without modifying their source code. Common backend uses include wrapping third-party APIs to match your internal interface, adapting legacy systems to new contracts, and normalizing responses from different payment gateways or email providers into a unified format. Adapters are often used alongside the strategy pattern, where each adapter implements the strategy interface for a different external service.',
        tags: ['adapter', 'structural', 'integration', 'compatibility'],
        keyTakeaway:
          'Adapter converts an incompatible interface into one the client expects, commonly used to normalize third-party API responses.',
      },
      {
        id: 'be-patterns-dependency-injection',
        title: 'Dependency Injection',
        difficulty: 'intermediate',
        answer:
          'Dependency injection supplies an object with its dependencies from the outside rather than having it create them internally, following the inversion of control principle. Constructor injection is the most common form where dependencies are passed as constructor parameters, making them explicit, immutable, and easy to replace with mocks in tests. DI containers like Spring in Java, NestJS in TypeScript, and FastAPI Depends in Python automate the wiring and lifecycle management of dependencies.',
        tags: ['dependency-injection', 'ioc', 'testing', 'decoupling'],
        keyTakeaway:
          'Dependency injection passes dependencies from outside rather than creating them internally, enabling testability and loose coupling.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. Serverless (6 questions)
  // ─────────────────────────────────────────────
  {
    id: 'be-serverless',
    label: 'Serverless',
    icon: 'Cloud',
    description:
      'Serverless computing concepts, cold starts, event-driven architectures, and managed infrastructure patterns.',
    questions: [
      {
        id: 'be-serverless-lambda',
        title: 'Lambda and Cloud Functions',
        difficulty: 'beginner',
        answer:
          'Serverless functions like AWS Lambda, Google Cloud Functions, and Azure Functions let you run code without provisioning servers, automatically scaling from zero to thousands of concurrent instances based on incoming events. You pay only for actual compute time measured in milliseconds, making them cost-effective for sporadic or bursty workloads. Each invocation runs in an isolated environment with configurable memory from 128 MB to 10 GB, a maximum execution time of 15 minutes on AWS, and support for most mainstream runtimes.',
        tags: ['lambda', 'serverless', 'cloud-functions', 'scaling'],
        keyTakeaway:
          'Serverless functions run code on-demand without managing servers, scaling automatically and billing only for execution time.',
      },
      {
        id: 'be-serverless-cold-starts',
        title: 'Cold Starts',
        difficulty: 'intermediate',
        answer:
          'A cold start occurs when a serverless function is invoked after being idle, requiring the platform to provision a new execution environment, download the code, initialize the runtime, and run initialization code before handling the request. Cold starts typically add 100ms to 2 seconds of latency depending on the runtime, package size, and VPC configuration, with Java and .NET experiencing the longest cold starts due to JIT compilation. Mitigation strategies include provisioned concurrency, keeping functions warm with scheduled pings, minimizing deployment package size, and choosing lightweight runtimes like Node.js or Python.',
        tags: ['cold-start', 'latency', 'serverless', 'optimization'],
        keyTakeaway:
          'Cold starts add latency when spinning up idle serverless functions, mitigated by provisioned concurrency and small deployment packages.',
      },
      {
        id: 'be-serverless-event-driven',
        title: 'Event-Driven Architecture',
        difficulty: 'intermediate',
        answer:
          'Event-driven architecture triggers serverless functions in response to events from sources like API Gateway HTTP requests, S3 file uploads, DynamoDB stream changes, SQS messages, and scheduled cron expressions via CloudWatch Events. This decoupled model means producers and consumers evolve independently, and the platform handles all the plumbing of event delivery, retry, and scaling. The pattern naturally leads to eventual consistency and requires idempotent function handlers because events may be delivered more than once.',
        tags: ['event-driven', 'triggers', 'decoupling', 'idempotency'],
        keyTakeaway:
          'Event-driven serverless functions react to triggers like uploads, messages, and schedules with automatic scaling and delivery.',
      },
      {
        id: 'be-serverless-api-gateway',
        title: 'Serverless API Gateway',
        difficulty: 'intermediate',
        answer:
          'A serverless API gateway like AWS API Gateway or Google Cloud Endpoints provides managed HTTP routing, request validation, authentication, throttling, and CORS handling in front of Lambda functions without running any servers. It supports REST and WebSocket APIs, can transform requests and responses, integrates with Cognito or custom authorizers for auth, and provides built-in usage plans for rate limiting API consumers. The combination of API Gateway plus Lambda is the most common serverless pattern for building REST APIs.',
        tags: ['api-gateway', 'serverless', 'routing', 'authentication'],
        keyTakeaway:
          'Serverless API gateways provide managed routing, auth, and throttling in front of functions without server infrastructure.',
      },
      {
        id: 'be-serverless-step-functions',
        title: 'Step Functions and Workflows',
        difficulty: 'advanced',
        answer:
          'AWS Step Functions and similar services like Google Workflows orchestrate multi-step serverless workflows as state machines with visual representations, handling branching, parallel execution, error handling, retries, and wait states. They solve the problem of coordinating multiple Lambda functions that need to run in sequence or parallel with complex control flow, replacing fragile chains of function-to-function invocations. Step Functions support both standard workflows for long-running processes up to one year and express workflows for high-volume short-duration event processing.',
        tags: ['step-functions', 'orchestration', 'workflow', 'state-machine'],
        keyTakeaway:
          'Step Functions orchestrate multi-step serverless workflows as state machines with built-in error handling and visual monitoring.',
      },
      {
        id: 'be-serverless-databases',
        title: 'Serverless Databases',
        difficulty: 'intermediate',
        answer:
          'Serverless databases like DynamoDB, Aurora Serverless, Firestore, and PlanetScale scale automatically without capacity planning, charge based on actual reads and writes, and eliminate connection management headaches that traditional databases have with Lambda. DynamoDB offers single-digit millisecond latency at any scale with a pay-per-request model, while Aurora Serverless provides MySQL and PostgreSQL compatibility with automatic scaling. The main trade-off is reduced query flexibility compared to traditional databases, vendor lock-in, and the need to design data models around the database access patterns.',
        tags: ['dynamodb', 'aurora-serverless', 'database', 'scaling'],
        keyTakeaway:
          'Serverless databases auto-scale and charge per operation, eliminating capacity planning but requiring access-pattern-driven data modeling.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. Logging & Monitoring (6 questions)
  // ─────────────────────────────────────────────
  {
    id: 'be-logging',
    label: 'Logging & Monitoring',
    icon: 'BarChart3',
    description:
      'Observability practices including structured logging, metrics collection, distributed tracing, and alerting strategies.',
    questions: [
      {
        id: 'be-logging-structured',
        title: 'Structured Logging',
        difficulty: 'beginner',
        answer:
          'Structured logging outputs log entries as JSON objects with consistent fields like timestamp, level, message, request_id, and user_id instead of free-form text strings, making logs machine-parseable and easily searchable in aggregation platforms. This enables powerful filtering and aggregation queries like finding all ERROR logs for a specific user or calculating p99 response times from log data. Libraries like structlog for Python, Winston for Node.js, and Serilog for .NET make structured logging straightforward to adopt.',
        tags: ['structured-logging', 'json', 'observability'],
        keyTakeaway:
          'Structured logging outputs JSON with consistent fields, enabling machine parsing, powerful queries, and aggregation across distributed systems.',
      },
      {
        id: 'be-logging-elk',
        title: 'ELK Stack',
        difficulty: 'intermediate',
        answer:
          'The ELK stack consists of Elasticsearch for storing and searching logs, Logstash for ingesting and transforming log data from multiple sources, and Kibana for visualizing and exploring logs through dashboards and queries. Modern deployments often replace Logstash with lightweight Filebeat agents on each server that ship logs directly to Elasticsearch, and the stack is now officially called the Elastic Stack. Alternatives include Grafana Loki which indexes only metadata rather than full log content, offering significantly lower storage costs for high-volume logging.',
        tags: ['elk', 'elasticsearch', 'kibana', 'log-aggregation'],
        keyTakeaway:
          'ELK combines Elasticsearch for search, Logstash for ingestion, and Kibana for visualization to centralize log management.',
      },
      {
        id: 'be-logging-prometheus',
        title: 'Prometheus and Grafana',
        difficulty: 'intermediate',
        answer:
          'Prometheus is a pull-based metrics system that scrapes numeric time-series data from application /metrics endpoints at regular intervals, storing them in a local time-series database with a powerful query language called PromQL. Grafana connects to Prometheus as a data source and provides rich dashboards for visualizing metrics like request rates, error percentages, latency histograms, and resource utilization. The four golden signals to monitor are latency, traffic, errors, and saturation, which together give a comprehensive view of service health.',
        tags: ['prometheus', 'grafana', 'metrics', 'monitoring'],
        keyTakeaway:
          'Prometheus scrapes and stores time-series metrics queried via PromQL, with Grafana providing dashboards for the four golden signals.',
      },
      {
        id: 'be-logging-distributed-tracing',
        title: 'Distributed Tracing',
        difficulty: 'advanced',
        answer:
          'Distributed tracing tracks a single request as it flows through multiple microservices by propagating a unique trace ID in headers, with each service recording a span containing timing, status, and metadata for its portion of the work. Tools like Jaeger, Zipkin, and AWS X-Ray collect and visualize these traces as waterfall diagrams showing the full request path, latencies at each hop, and where errors or bottlenecks occur. OpenTelemetry has become the industry standard for instrumentation, providing vendor-neutral SDKs that export traces, metrics, and logs to any compatible backend.',
        tags: ['tracing', 'opentelemetry', 'jaeger', 'observability'],
        keyTakeaway:
          'Distributed tracing propagates trace IDs across services to visualize request flow, latency, and errors through the full call chain.',
      },
      {
        id: 'be-logging-alerting',
        title: 'Alerting Strategies',
        difficulty: 'intermediate',
        answer:
          'Effective alerting defines rules based on symptoms rather than causes, using metrics thresholds like error rate above 1 percent for 5 minutes or p99 latency exceeding 500ms, and routes alerts to the right team via PagerDuty, Opsgenie, or Slack. Alert fatigue from noisy or non-actionable alerts is the biggest operational risk, so every alert should be urgent, require human action, and include a runbook link describing diagnosis and remediation steps. Severity levels should distinguish between page-worthy incidents that wake someone up and warning-level notifications that can wait until business hours.',
        tags: ['alerting', 'pagerduty', 'sre', 'on-call'],
        keyTakeaway:
          'Alert on symptoms not causes, ensure every alert is actionable with a runbook, and separate page-worthy from warning-level severity.',
      },
      {
        id: 'be-logging-log-levels',
        title: 'Log Levels',
        difficulty: 'beginner',
        answer:
          'Standard log levels from most to least severe are FATAL for unrecoverable errors causing shutdown, ERROR for failures requiring attention, WARN for unexpected but handled situations, INFO for significant business events, DEBUG for detailed diagnostic information, and TRACE for the most granular execution details. Production systems typically run at INFO level and temporarily switch to DEBUG for troubleshooting, while TRACE is reserved for development. Consistent log level usage across all services is essential because aggregation platforms filter and alert based on these levels.',
        tags: ['log-levels', 'logging', 'debugging', 'best-practices'],
        keyTakeaway:
          'Use ERROR for failures needing action, INFO for business events in production, and DEBUG only temporarily for troubleshooting.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. Backend Testing (8 questions)
  // ─────────────────────────────────────────────
  {
    id: 'be-testing',
    label: 'Backend Testing',
    icon: 'TestTube',
    description:
      'Testing strategies for backend systems including unit, integration, end-to-end, contract, and load testing.',
    questions: [
      {
        id: 'be-testing-unit-integration-e2e',
        title: 'Unit, Integration, and E2E Tests',
        difficulty: 'beginner',
        answer:
          'Unit tests verify individual functions or classes in isolation with mocked dependencies, running in milliseconds and forming the largest layer of the testing pyramid. Integration tests verify that multiple components work together correctly, such as an API endpoint hitting a real test database and returning the expected response. E2E tests simulate full user workflows across the entire stack and are the slowest and most brittle, so they should cover only critical paths like authentication, checkout, and data creation flows.',
        tags: ['unit-tests', 'integration-tests', 'e2e', 'testing-pyramid'],
        keyTakeaway:
          'The testing pyramid prioritizes many fast unit tests, fewer integration tests with real dependencies, and minimal E2E tests for critical paths.',
      },
      {
        id: 'be-testing-mocking',
        title: 'Mocking and Test Doubles',
        difficulty: 'intermediate',
        answer:
          'Test doubles replace real dependencies in tests with controlled alternatives: stubs return predetermined responses, mocks verify that specific methods were called with expected arguments, fakes provide working but simplified implementations like an in-memory database, and spies wrap real objects to record call information. Over-mocking is a common anti-pattern where tests become tightly coupled to implementation details rather than testing behavior, causing them to break on every refactor without catching real bugs. Mock external boundaries like HTTP APIs and third-party services, but prefer real implementations for internal components when feasible.',
        tags: ['mocking', 'stubs', 'fakes', 'test-doubles'],
        keyTakeaway:
          'Mock external boundaries like APIs and third-party services, but avoid over-mocking internal components to keep tests focused on behavior.',
      },
      {
        id: 'be-testing-test-databases',
        title: 'Test Database Strategies',
        difficulty: 'intermediate',
        answer:
          'Integration tests need a real database to verify queries, constraints, and migrations, with three main approaches: a dedicated test database reset between test suites, Docker containers spun up per test run using Testcontainers, or transaction rollback where each test runs in a transaction that is rolled back after completion. Transaction rollback is fastest because no data cleanup is needed, but it cannot test transaction boundaries or commit hooks. Testcontainers provides the most realistic environment by running the exact same database version as production in an isolated container.',
        tags: ['test-database', 'testcontainers', 'docker', 'isolation'],
        keyTakeaway:
          'Use transaction rollback for fast isolation or Testcontainers for realistic database testing with production-identical versions.',
      },
      {
        id: 'be-testing-contract',
        title: 'Contract Testing',
        difficulty: 'advanced',
        answer:
          'Contract testing verifies that two services can communicate correctly by having the consumer define a contract specifying expected request shapes and response formats, which the provider then validates against. Pact is the most popular tool, using consumer-driven contracts where frontend or client teams define what they expect and the provider CI pipeline verifies it can fulfill those contracts. This catches integration breakages at build time without needing to deploy both services together, making it especially valuable in microservices architectures where full integration environments are expensive.',
        tags: ['contract-testing', 'pact', 'microservices', 'api'],
        keyTakeaway:
          'Contract testing validates that services fulfill agreed-upon API contracts, catching integration breakages at build time without deploying together.',
      },
      {
        id: 'be-testing-load',
        title: 'Load Testing',
        difficulty: 'intermediate',
        answer:
          'Load testing simulates realistic traffic patterns against your system to identify performance bottlenecks, determine maximum throughput, and verify that response times stay within SLA thresholds under expected and peak load. Tools like k6, Locust, Gatling, and Apache JMeter generate concurrent virtual users executing scripted scenarios while measuring latency percentiles, error rates, and throughput. Critical practices include testing against a production-like environment, ramping load gradually to find the breaking point, and establishing performance baselines that CI pipelines can compare against to detect regressions.',
        tags: ['load-testing', 'k6', 'performance', 'benchmarking'],
        keyTakeaway:
          'Load testing simulates concurrent users to find bottlenecks and verify response times stay within SLA thresholds under peak traffic.',
      },
      {
        id: 'be-testing-tdd',
        title: 'Test-Driven Development',
        difficulty: 'intermediate',
        answer:
          'TDD follows a red-green-refactor cycle where you write a failing test first that defines desired behavior, write the minimum code to make it pass, then refactor the implementation while keeping tests green. This approach drives better API design because you think about the interface as a consumer before writing the implementation, and it guarantees high test coverage since every piece of code exists to satisfy a test. TDD works best for business logic with clear inputs and outputs, but is less practical for exploratory prototyping, UI work, or infrastructure code where requirements are still being discovered.',
        tags: ['tdd', 'red-green-refactor', 'methodology'],
        keyTakeaway:
          'TDD writes failing tests before implementation, driving better design and guaranteed coverage through the red-green-refactor cycle.',
      },
      {
        id: 'be-testing-fixtures',
        title: 'Test Fixtures and Factories',
        difficulty: 'intermediate',
        answer:
          'Test fixtures provide pre-configured data and state that tests can rely on, while factories dynamically generate test objects with sensible defaults and optional overrides for specific fields. Factory libraries like FactoryBot for Ruby, factory_boy for Python, and Fishery for TypeScript reduce boilerplate by letting you declare a template once and create variations per test. Fixtures should be minimal and test-specific to avoid fragile shared state, and each test should set up only the data it needs rather than relying on a large shared fixture that many tests depend on.',
        tags: ['fixtures', 'factories', 'test-data', 'setup'],
        keyTakeaway:
          'Factories generate test objects with defaults and overrides, reducing boilerplate while keeping test data minimal and test-specific.',
      },
      {
        id: 'be-testing-coverage',
        title: 'Code Coverage',
        difficulty: 'beginner',
        answer:
          'Code coverage measures the percentage of code lines, branches, and functions executed during test runs, reported by tools like Istanbul/nyc for JavaScript, coverage.py for Python, and JaCoCo for Java. While useful for identifying untested code paths, high coverage does not guarantee test quality because tests can execute code without making meaningful assertions. A practical target is 80 percent line coverage with focus on branch coverage for critical business logic, combined with mutation testing tools like Stryker or mutmut that verify tests actually detect injected bugs.',
        tags: ['code-coverage', 'istanbul', 'mutation-testing', 'quality'],
        keyTakeaway:
          'Code coverage identifies untested paths but does not guarantee quality, so combine it with meaningful assertions and mutation testing.',
      },
    ],
  },
];

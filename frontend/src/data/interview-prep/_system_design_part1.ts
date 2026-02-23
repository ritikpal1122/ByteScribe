import type { InterviewTopic } from './types';

export const SD_PART1_TOPICS: InterviewTopic[] = [
  // ─────────────────────────────────────────────
  // 1. System Design Fundamentals (10 questions)
  // ─────────────────────────────────────────────
  {
    id: 'sd-fundamentals',
    label: 'System Design Fundamentals',
    icon: 'BookOpen',
    description:
      'Core concepts and trade-offs that underpin every large-scale distributed system design.',
    questions: [
      {
        id: 'sd-fundamentals-vertical-vs-horizontal',
        title: 'What is the difference between vertical and horizontal scaling?',
        difficulty: 'beginner',
        answer:
          'Vertical scaling (scaling up) adds more CPU, RAM, or storage to a single machine, while horizontal scaling (scaling out) adds more machines to distribute the load. Horizontal scaling is generally preferred for large systems because it avoids single points of failure and hardware ceiling limits.',
        tags: ['scalability', 'infrastructure', 'fundamentals'],
        keyTakeaway:
          'Horizontal scaling distributes load across machines and avoids the hardware ceiling of a single server.',
      },
      {
        id: 'sd-fundamentals-latency-throughput',
        title: 'What is the difference between latency and throughput?',
        difficulty: 'beginner',
        answer:
          'Latency is the time it takes for a single request to travel from client to server and back, while throughput is the total number of requests the system can handle per unit of time. Optimizing for one often comes at the cost of the other, such as batching which improves throughput but increases individual request latency.',
        tags: ['performance', 'latency', 'throughput'],
        keyTakeaway:
          'Latency measures per-request delay; throughput measures overall system capacity per unit time.',
      },
      {
        id: 'sd-fundamentals-cap',
        title: 'What is the CAP theorem?',
        difficulty: 'intermediate',
        answer:
          'The CAP theorem states that a distributed system can only guarantee two of three properties: Consistency, Availability, and Partition tolerance. Since network partitions are inevitable in distributed systems, you must choose between consistency (CP systems like ZooKeeper) and availability (AP systems like Cassandra).',
        tags: ['distributed-systems', 'cap', 'trade-offs'],
        keyTakeaway:
          'CAP forces a trade-off between consistency and availability during network partitions.',
      },
      {
        id: 'sd-fundamentals-consistency-models',
        title: 'What are the main consistency models in distributed systems?',
        difficulty: 'intermediate',
        answer:
          'Strong consistency ensures every read returns the most recent write, linearizability being the strictest form. Eventual consistency guarantees that all replicas converge to the same value given enough time without new writes, which is the model used by DynamoDB and Cassandra. Causal consistency sits between them, preserving the order of causally related operations.',
        tags: ['consistency', 'distributed-systems', 'replication'],
        keyTakeaway:
          'Strong consistency sacrifices latency for correctness; eventual consistency favors availability and speed.',
      },
      {
        id: 'sd-fundamentals-availability-patterns',
        title: 'What are common availability patterns?',
        difficulty: 'intermediate',
        answer:
          'Failover patterns include active-passive where a standby takes over when the primary fails, and active-active where multiple nodes serve traffic simultaneously. Replication ensures data durability across nodes, while health checks and heartbeats detect failures quickly to trigger automatic recovery.',
        tags: ['availability', 'failover', 'redundancy'],
        keyTakeaway:
          'Active-active provides higher availability than active-passive but adds complexity in conflict resolution.',
      },
      {
        id: 'sd-fundamentals-fault-tolerance',
        title: 'What is fault tolerance and how do you design for it?',
        difficulty: 'intermediate',
        answer:
          'Fault tolerance is a system\'s ability to continue operating correctly when components fail. Key techniques include redundancy at every layer, graceful degradation where non-critical features are shed under load, circuit breakers that prevent cascading failures, and bulkhead isolation that limits the blast radius of a single failure.',
        tags: ['fault-tolerance', 'resilience', 'reliability'],
        keyTakeaway:
          'Design for failure by adding redundancy, circuit breakers, and bulkheads to contain blast radius.',
      },
      {
        id: 'sd-fundamentals-sla-slo-sli',
        title: 'What are SLAs, SLOs, and SLIs?',
        difficulty: 'beginner',
        answer:
          'An SLI (Service Level Indicator) is a quantitative measure like request latency or error rate. An SLO (Service Level Objective) is a target value for an SLI, such as 99.9% of requests under 200ms. An SLA (Service Level Agreement) is a formal contract with consequences if SLOs are not met.',
        tags: ['reliability', 'monitoring', 'operations'],
        keyTakeaway:
          'SLIs measure, SLOs set targets, and SLAs are contractual commitments with penalties for violations.',
      },
      {
        id: 'sd-fundamentals-idempotency',
        title: 'Why is idempotency important in distributed systems?',
        difficulty: 'intermediate',
        answer:
          'Idempotency ensures that performing the same operation multiple times produces the same result as performing it once. This is critical because network failures, retries, and message duplication are common in distributed systems, and without idempotency a retried payment could charge a customer twice.',
        tags: ['idempotency', 'reliability', 'distributed-systems'],
        keyTakeaway:
          'Idempotent operations are safe to retry, which is essential for reliable distributed communication.',
      },
      {
        id: 'sd-fundamentals-estimation',
        title: 'How do you approach back-of-envelope estimation?',
        difficulty: 'beginner',
        answer:
          'Start by estimating daily active users and average requests per user to get queries per second (QPS). Then calculate storage needs using average payload size multiplied by request volume, and estimate bandwidth from QPS times response size. Use powers of two and round aggressively to keep calculations simple.',
        tags: ['estimation', 'capacity-planning', 'interview'],
        keyTakeaway:
          'Break capacity estimates into QPS, storage, and bandwidth using simple multiplication and powers of two.',
      },
      {
        id: 'sd-fundamentals-framework',
        title: 'What framework should you follow in a system design interview?',
        difficulty: 'beginner',
        answer:
          'Follow four steps: clarify requirements and constraints by asking questions, propose a high-level design with core components, deep-dive into critical components discussing trade-offs, and wrap up by addressing bottlenecks, scaling, and monitoring. Spend roughly 5, 15, 20, and 5 minutes on each step respectively.',
        tags: ['interview', 'framework', 'methodology'],
        keyTakeaway:
          'Structure your answer into requirements, high-level design, deep dive, and wrap-up to stay organized.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. Networking (8 questions)
  // ─────────────────────────────────────────────
  {
    id: 'sd-networking',
    label: 'Networking',
    icon: 'Globe',
    description:
      'Networking protocols, DNS, CDNs, and communication patterns that form the backbone of distributed systems.',
    questions: [
      {
        id: 'sd-networking-dns',
        title: 'How does DNS resolution work?',
        difficulty: 'beginner',
        answer:
          'DNS resolves domain names to IP addresses through a hierarchical lookup: the client queries a recursive resolver, which checks root nameservers, then TLD nameservers, then authoritative nameservers for the domain. Results are cached at each level based on TTL values, and techniques like GeoDNS route users to the nearest data center.',
        tags: ['dns', 'networking', 'infrastructure'],
        keyTakeaway:
          'DNS is a hierarchical caching system that translates domain names to IP addresses through recursive lookups.',
      },
      {
        id: 'sd-networking-cdn',
        title: 'What is a CDN and how does it work?',
        difficulty: 'beginner',
        answer:
          'A Content Delivery Network is a geographically distributed network of edge servers that cache and serve content close to users to reduce latency. When a user requests content, DNS routes them to the nearest edge server; if the content is cached (hit) it is served immediately, otherwise the edge fetches it from the origin server (miss) and caches it.',
        tags: ['cdn', 'caching', 'performance'],
        keyTakeaway:
          'CDNs reduce latency by serving cached content from edge servers geographically close to users.',
      },
      {
        id: 'sd-networking-tcp-udp',
        title: 'When would you choose TCP over UDP and vice versa?',
        difficulty: 'intermediate',
        answer:
          'TCP provides reliable, ordered delivery with flow control and congestion management, making it ideal for web traffic, file transfers, and APIs. UDP sacrifices reliability for speed with no handshake or retransmission, making it suitable for real-time applications like video streaming, gaming, and DNS queries where low latency matters more than occasional packet loss.',
        tags: ['tcp', 'udp', 'protocols'],
        keyTakeaway:
          'TCP guarantees reliable ordered delivery; UDP trades reliability for lower latency in real-time use cases.',
      },
      {
        id: 'sd-networking-http-versions',
        title: 'What are the key differences between HTTP/1.1, HTTP/2, and HTTP/3?',
        difficulty: 'intermediate',
        answer:
          'HTTP/1.1 uses persistent connections but suffers from head-of-line blocking since requests are sequential per connection. HTTP/2 introduces multiplexing of multiple streams over a single TCP connection plus header compression via HPACK. HTTP/3 replaces TCP with QUIC (UDP-based) to eliminate TCP-level head-of-line blocking and enables faster connection establishment with built-in TLS 1.3.',
        tags: ['http', 'protocols', 'performance'],
        keyTakeaway:
          'Each HTTP version addresses the previous one\'s bottleneck: pipelining, multiplexing, then QUIC-based transport.',
      },
      {
        id: 'sd-networking-websockets',
        title: 'When should you use WebSockets?',
        difficulty: 'intermediate',
        answer:
          'WebSockets provide full-duplex, persistent communication over a single TCP connection, making them ideal for real-time features like chat, live notifications, collaborative editing, and live dashboards. They begin with an HTTP upgrade handshake and then maintain an open connection, unlike polling or SSE which are unidirectional.',
        tags: ['websockets', 'real-time', 'protocols'],
        keyTakeaway:
          'Use WebSockets when you need bidirectional, low-latency, persistent communication between client and server.',
      },
      {
        id: 'sd-networking-grpc',
        title: 'What is gRPC and when is it preferred over REST?',
        difficulty: 'intermediate',
        answer:
          'gRPC is a high-performance RPC framework that uses HTTP/2 for transport and Protocol Buffers for serialization, providing strongly typed contracts, streaming support, and efficient binary encoding. It is preferred for internal microservice communication where low latency and strong type safety matter, but is less suitable for browser clients due to limited native support.',
        tags: ['grpc', 'rpc', 'microservices'],
        keyTakeaway:
          'gRPC excels at internal service-to-service communication with strong typing and efficient binary serialization.',
      },
      {
        id: 'sd-networking-tls',
        title: 'How does TLS/SSL secure communication?',
        difficulty: 'intermediate',
        answer:
          'TLS secures communication through a handshake where the client and server agree on a cipher suite, the server presents its certificate for authentication, and they establish a shared session key using asymmetric encryption. All subsequent data is encrypted using symmetric encryption with the session key, providing confidentiality, integrity, and authentication.',
        tags: ['tls', 'security', 'encryption'],
        keyTakeaway:
          'TLS uses asymmetric encryption to exchange keys, then symmetric encryption for fast, secure data transfer.',
      },
      {
        id: 'sd-networking-api-gateway',
        title: 'What role does an API gateway play?',
        difficulty: 'intermediate',
        answer:
          'An API gateway acts as a single entry point for all client requests, handling cross-cutting concerns like authentication, rate limiting, request routing, load balancing, and protocol translation. It decouples clients from the internal microservice topology, so backend services can evolve independently without breaking client contracts.',
        tags: ['api-gateway', 'microservices', 'infrastructure'],
        keyTakeaway:
          'API gateways centralize cross-cutting concerns and decouple clients from internal service topology.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Databases at Scale (12 questions)
  // ─────────────────────────────────────────────
  {
    id: 'sd-databases',
    label: 'Databases at Scale',
    icon: 'Database',
    description:
      'Strategies for scaling databases including sharding, replication, partitioning, and choosing the right data store.',
    questions: [
      {
        id: 'sd-databases-sql-vs-nosql',
        title: 'When should you choose SQL vs NoSQL?',
        difficulty: 'beginner',
        answer:
          'SQL databases are ideal when you need ACID transactions, complex joins, and a well-defined relational schema, such as financial systems. NoSQL databases excel when you need flexible schemas, horizontal scalability, and high write throughput, such as social media feeds or IoT data where denormalized access patterns are predictable.',
        tags: ['sql', 'nosql', 'database-selection'],
        keyTakeaway:
          'Choose SQL for strong consistency and complex queries; choose NoSQL for flexible schemas and horizontal scale.',
      },
      {
        id: 'sd-databases-sharding',
        title: 'What are common sharding strategies?',
        difficulty: 'advanced',
        answer:
          'Range-based sharding partitions data by key ranges (e.g., A-M, N-Z) but can create hotspots. Hash-based sharding distributes data by hashing the shard key for even distribution but makes range queries expensive. Directory-based sharding uses a lookup table to map keys to shards, offering flexibility but adding a single point of dependency.',
        tags: ['sharding', 'partitioning', 'scalability'],
        keyTakeaway:
          'Hash-based sharding distributes evenly but sacrifices range queries; range-based is efficient for scans but risks hotspots.',
      },
      {
        id: 'sd-databases-replication',
        title: 'What is the difference between leader-follower and multi-leader replication?',
        difficulty: 'intermediate',
        answer:
          'Leader-follower replication has one primary node handling all writes and replicating to read-only followers, offering simplicity but a single write bottleneck. Multi-leader replication allows writes on multiple nodes for geographic distribution and higher write throughput, but requires conflict resolution strategies like last-write-wins or custom merge logic.',
        tags: ['replication', 'distributed-systems', 'consistency'],
        keyTakeaway:
          'Leader-follower is simpler but limits write throughput; multi-leader scales writes but introduces conflict resolution complexity.',
      },
      {
        id: 'sd-databases-partitioning',
        title: 'What is database partitioning and why is it used?',
        difficulty: 'intermediate',
        answer:
          'Partitioning splits a large table into smaller physical segments to improve query performance and manageability. Horizontal partitioning (sharding) distributes rows across different nodes, while vertical partitioning splits columns into separate tables. Time-based partitioning is common for logs and events, allowing efficient archival of old partitions.',
        tags: ['partitioning', 'performance', 'scalability'],
        keyTakeaway:
          'Partitioning improves performance by reducing the data each query must scan and enabling parallel access.',
      },
      {
        id: 'sd-databases-consistent-hashing',
        title: 'How does consistent hashing work?',
        difficulty: 'advanced',
        answer:
          'Consistent hashing maps both data keys and server nodes onto a virtual ring using a hash function. Each key is assigned to the next node clockwise on the ring, so when a node is added or removed only the keys between it and its predecessor need to be remapped. Virtual nodes improve balance by assigning multiple ring positions to each physical server.',
        tags: ['consistent-hashing', 'distributed-systems', 'partitioning'],
        keyTakeaway:
          'Consistent hashing minimizes key redistribution when nodes change, remapping only a fraction of keys instead of all.',
      },
      {
        id: 'sd-databases-read-replicas',
        title: 'How do read replicas improve database performance?',
        difficulty: 'beginner',
        answer:
          'Read replicas are copies of the primary database that handle read queries, distributing read traffic across multiple nodes and reducing load on the primary. They introduce replication lag meaning reads may return slightly stale data. Read replicas are effective when the read-to-write ratio is high, such as in content-heavy applications.',
        tags: ['read-replicas', 'replication', 'performance'],
        keyTakeaway:
          'Read replicas scale read throughput by distributing queries, trading off slight staleness from replication lag.',
      },
      {
        id: 'sd-databases-wal',
        title: 'What is a write-ahead log (WAL)?',
        difficulty: 'intermediate',
        answer:
          'A write-ahead log is a sequential, append-only file where every change is recorded before it is applied to the database. This ensures durability because the WAL can be replayed to recover committed transactions after a crash. WAL is also the foundation for replication, as followers can consume the log stream to stay in sync with the leader.',
        tags: ['wal', 'durability', 'recovery'],
        keyTakeaway:
          'WAL guarantees durability by persisting changes sequentially before applying them, enabling crash recovery and replication.',
      },
      {
        id: 'sd-databases-lsm-btree',
        title: 'What is the difference between LSM trees and B-trees?',
        difficulty: 'advanced',
        answer:
          'B-trees are the traditional index structure used by SQL databases, offering fast reads through balanced tree lookups but requiring random I/O for writes. LSM trees buffer writes in memory (memtable) and flush sorted runs to disk, optimizing write throughput at the cost of read amplification from merging multiple levels during compaction.',
        tags: ['lsm-tree', 'b-tree', 'storage-engines'],
        keyTakeaway:
          'B-trees optimize for reads with in-place updates; LSM trees optimize for writes with sequential, append-only I/O.',
      },
      {
        id: 'sd-databases-time-series',
        title: 'What are time-series databases and when should you use them?',
        difficulty: 'intermediate',
        answer:
          'Time-series databases like InfluxDB and TimescaleDB are optimized for ingesting, storing, and querying timestamped data with high write throughput. They use columnar storage and time-based partitioning for efficient aggregation queries over time ranges. Use them for monitoring metrics, IoT sensor data, financial tick data, and application telemetry.',
        tags: ['time-series', 'databases', 'monitoring'],
        keyTakeaway:
          'Time-series databases are purpose-built for high-volume timestamped data with efficient time-range aggregation.',
      },
      {
        id: 'sd-databases-graph',
        title: 'When would you use a graph database?',
        difficulty: 'intermediate',
        answer:
          'Graph databases like Neo4j store data as nodes and edges, excelling at traversing complex relationships that would require expensive joins in relational databases. They are ideal for social networks, recommendation engines, fraud detection, and knowledge graphs where relationship depth and traversal speed are primary access patterns.',
        tags: ['graph-database', 'relationships', 'data-modeling'],
        keyTakeaway:
          'Graph databases outperform relational stores when queries involve deep, multi-hop relationship traversals.',
      },
      {
        id: 'sd-databases-newsql',
        title: 'What is NewSQL and what problem does it solve?',
        difficulty: 'advanced',
        answer:
          'NewSQL databases like CockroachDB and Google Spanner provide the horizontal scalability of NoSQL while maintaining full ACID transactions and SQL compatibility. They achieve this through distributed consensus protocols like Raft or Paxos and techniques like clock synchronization for global consistency, bridging the gap between relational guarantees and distributed scale.',
        tags: ['newsql', 'distributed-databases', 'scalability'],
        keyTakeaway:
          'NewSQL combines the horizontal scalability of NoSQL with the ACID guarantees and SQL interface of relational databases.',
      },
      {
        id: 'sd-databases-data-lake',
        title: 'What is a data lake and how does it differ from a data warehouse?',
        difficulty: 'intermediate',
        answer:
          'A data lake stores raw, unstructured, and semi-structured data in its native format at low cost, typically on object storage like S3, using a schema-on-read approach. A data warehouse stores structured, processed data with a predefined schema-on-write optimized for analytical queries. Modern architectures often use a lakehouse pattern combining both approaches.',
        tags: ['data-lake', 'data-warehouse', 'analytics'],
        keyTakeaway:
          'Data lakes store raw data cheaply with schema-on-read; data warehouses store curated data with schema-on-write for fast analytics.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Caching (8 questions)
  // ─────────────────────────────────────────────
  {
    id: 'sd-caching',
    label: 'Caching',
    icon: 'Zap',
    description:
      'Caching strategies, eviction policies, and common pitfalls for improving system performance and reducing load.',
    questions: [
      {
        id: 'sd-caching-cache-aside',
        title: 'How does the cache-aside pattern work?',
        difficulty: 'beginner',
        answer:
          'In cache-aside, the application first checks the cache for data; on a miss, it reads from the database, stores the result in the cache, and returns it. The application manages both the cache and database independently, making it simple and flexible. The downside is potential inconsistency between cache and database if the data is updated without invalidating the cache.',
        tags: ['cache-aside', 'caching-patterns', 'read-performance'],
        keyTakeaway:
          'Cache-aside gives the application full control over caching but requires explicit invalidation to prevent stale data.',
      },
      {
        id: 'sd-caching-write-through',
        title: 'What is write-through caching?',
        difficulty: 'intermediate',
        answer:
          'Write-through caching writes data to both the cache and the database synchronously on every write operation. This ensures the cache always contains the latest data, providing strong consistency between cache and store. The trade-off is higher write latency since every write must complete in both layers before returning to the client.',
        tags: ['write-through', 'caching-patterns', 'consistency'],
        keyTakeaway:
          'Write-through ensures cache-database consistency at the cost of increased write latency.',
      },
      {
        id: 'sd-caching-write-behind',
        title: 'What is write-behind (write-back) caching?',
        difficulty: 'intermediate',
        answer:
          'Write-behind caching writes data to the cache immediately and asynchronously flushes changes to the database in batches. This dramatically reduces write latency and database load by coalescing multiple writes. The risk is data loss if the cache node fails before the pending writes are persisted to the database.',
        tags: ['write-behind', 'caching-patterns', 'performance'],
        keyTakeaway:
          'Write-behind minimizes write latency by batching async database writes, but risks data loss on cache failure.',
      },
      {
        id: 'sd-caching-eviction',
        title: 'What are the main cache eviction policies?',
        difficulty: 'beginner',
        answer:
          'LRU (Least Recently Used) evicts the entry that was accessed longest ago and works well for most workloads. LFU (Least Frequently Used) evicts entries accessed least often, which is better for skewed access patterns. TTL (Time-To-Live) expires entries after a fixed duration, which is essential for ensuring data freshness.',
        tags: ['eviction', 'lru', 'lfu', 'ttl'],
        keyTakeaway:
          'LRU is the most common eviction policy; TTL is often combined with LRU to bound staleness.',
      },
      {
        id: 'sd-caching-redis-memcached',
        title: 'When would you choose Redis over Memcached?',
        difficulty: 'intermediate',
        answer:
          'Redis supports rich data structures (lists, sets, sorted sets, hashes), persistence, replication, Lua scripting, and pub/sub, making it suitable for diverse use cases beyond simple caching. Memcached is simpler with a pure key-value model and multi-threaded architecture, making it slightly faster for basic caching of large, flat string values at high concurrency.',
        tags: ['redis', 'memcached', 'comparison'],
        keyTakeaway:
          'Choose Redis for rich data structures and persistence; choose Memcached for simple, high-throughput key-value caching.',
      },
      {
        id: 'sd-caching-cdn-caching',
        title: 'How does CDN caching differ from application-level caching?',
        difficulty: 'intermediate',
        answer:
          'CDN caching stores content at geographically distributed edge servers close to users, reducing network latency for static assets and cacheable API responses. Application-level caching (like Redis) sits near the application server and reduces database load for dynamic, frequently accessed data. They operate at different layers and are typically used together.',
        tags: ['cdn', 'caching-layers', 'performance'],
        keyTakeaway:
          'CDN caching reduces network latency at the edge; application caching reduces database load at the backend.',
      },
      {
        id: 'sd-caching-invalidation',
        title: 'Why is cache invalidation considered difficult?',
        difficulty: 'advanced',
        answer:
          'Cache invalidation is hard because you must ensure cached data stays consistent with the source of truth across distributed nodes with varying latencies. Common approaches include TTL-based expiration, event-driven invalidation via pub/sub, and versioned keys. The core difficulty is that between a write and invalidation there is always a window where stale data can be served.',
        tags: ['cache-invalidation', 'consistency', 'distributed-systems'],
        keyTakeaway:
          'Cache invalidation is fundamentally hard because there is always a window between a write and its propagation to all cache nodes.',
      },
      {
        id: 'sd-caching-thundering-herd',
        title: 'What is the thundering herd problem in caching?',
        difficulty: 'advanced',
        answer:
          'The thundering herd occurs when a popular cache key expires and many concurrent requests simultaneously miss the cache, all hitting the database at once to recompute the same value. Solutions include cache locking where only one request rebuilds the value while others wait, request coalescing, and staggered TTLs to prevent synchronized expiration.',
        tags: ['thundering-herd', 'cache-stampede', 'concurrency'],
        keyTakeaway:
          'Prevent thundering herd with cache locks, request coalescing, or staggered TTLs so only one request rebuilds a hot key.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. Message Queues (10 questions)
  // ─────────────────────────────────────────────
  {
    id: 'sd-queues',
    label: 'Message Queues',
    icon: 'MessageSquare',
    description:
      'Asynchronous messaging patterns, event-driven architectures, and stream processing fundamentals.',
    questions: [
      {
        id: 'sd-queues-pubsub-p2p',
        title: 'What is the difference between pub/sub and point-to-point messaging?',
        difficulty: 'beginner',
        answer:
          'In point-to-point messaging, each message is consumed by exactly one consumer from a queue, making it ideal for task distribution. In pub/sub, a message published to a topic is delivered to all subscribers, enabling event broadcasting. Point-to-point guarantees single processing while pub/sub enables fan-out to multiple independent consumers.',
        tags: ['pub-sub', 'point-to-point', 'messaging-patterns'],
        keyTakeaway:
          'Point-to-point delivers to one consumer for work distribution; pub/sub fans out to all subscribers for event broadcasting.',
      },
      {
        id: 'sd-queues-kafka',
        title: 'How does Kafka achieve high throughput?',
        difficulty: 'advanced',
        answer:
          'Kafka achieves high throughput through sequential disk I/O via append-only commit logs, zero-copy data transfer from disk to network, message batching on both producer and consumer sides, and partitioned topics that enable parallel processing. Consumers track their own offset rather than the broker tracking delivery state, eliminating per-message bookkeeping.',
        tags: ['kafka', 'throughput', 'architecture'],
        keyTakeaway:
          'Kafka uses append-only logs, zero-copy transfer, batching, and partitioning to achieve millions of messages per second.',
      },
      {
        id: 'sd-queues-rabbitmq',
        title: 'When would you choose RabbitMQ over Kafka?',
        difficulty: 'intermediate',
        answer:
          'RabbitMQ excels at complex routing with exchanges (direct, topic, fanout, headers), supports per-message acknowledgment, and provides priority queues. Choose RabbitMQ for traditional task queues, RPC patterns, and when messages need flexible routing rules. Choose Kafka when you need high-throughput log-based streaming, replay capability, and long-term message retention.',
        tags: ['rabbitmq', 'kafka', 'comparison'],
        keyTakeaway:
          'RabbitMQ is better for complex routing and task queues; Kafka is better for high-throughput event streaming with replay.',
      },
      {
        id: 'sd-queues-delivery-semantics',
        title: 'What are the different message delivery guarantees?',
        difficulty: 'intermediate',
        answer:
          'At-most-once delivery sends messages without retries, risking loss but preventing duplicates. At-least-once delivery retries on failure, guaranteeing delivery but potentially creating duplicates. Exactly-once delivery ensures messages are processed exactly one time, typically achieved through idempotent consumers or transactional outbox patterns rather than the broker alone.',
        tags: ['delivery-semantics', 'reliability', 'messaging'],
        keyTakeaway:
          'At-least-once with idempotent consumers is the most practical approach since true exactly-once is very expensive.',
      },
      {
        id: 'sd-queues-dlq',
        title: 'What is a dead letter queue?',
        difficulty: 'beginner',
        answer:
          'A dead letter queue (DLQ) is a separate queue where messages are routed after failing to be processed a configured number of times. DLQs prevent poison messages from blocking the main queue and allow engineers to inspect, debug, and replay failed messages later. They are essential for building resilient messaging pipelines.',
        tags: ['dlq', 'error-handling', 'reliability'],
        keyTakeaway:
          'Dead letter queues isolate failed messages so they do not block processing and can be inspected and replayed later.',
      },
      {
        id: 'sd-queues-event-sourcing',
        title: 'What is event sourcing?',
        difficulty: 'advanced',
        answer:
          'Event sourcing persists every state change as an immutable event in an append-only log rather than storing only the current state. The current state is reconstructed by replaying events from the beginning or from a snapshot. This provides a complete audit trail, enables temporal queries, and allows rebuilding read models, but increases storage and complexity.',
        tags: ['event-sourcing', 'architecture', 'audit'],
        keyTakeaway:
          'Event sourcing stores every state change as an immutable event, enabling full audit trails and state reconstruction.',
      },
      {
        id: 'sd-queues-cqrs',
        title: 'What is CQRS and why is it used?',
        difficulty: 'advanced',
        answer:
          'CQRS (Command Query Responsibility Segregation) separates the write model (commands) from the read model (queries), allowing each to be optimized independently. The write side can use a normalized event store while the read side uses denormalized views tailored to specific query patterns. It pairs naturally with event sourcing but adds eventual consistency between the two models.',
        tags: ['cqrs', 'architecture', 'read-write-separation'],
        keyTakeaway:
          'CQRS optimizes reads and writes independently by separating them into distinct models with different data stores.',
      },
      {
        id: 'sd-queues-stream-processing',
        title: 'What is stream processing and how does it differ from batch processing?',
        difficulty: 'intermediate',
        answer:
          'Stream processing handles data continuously as it arrives in real time, using tools like Kafka Streams, Flink, or Spark Streaming, providing low-latency results for use cases like fraud detection. Batch processing collects data over a period and processes it all at once, offering higher throughput for analytics and ETL but with inherent delay.',
        tags: ['stream-processing', 'batch-processing', 'real-time'],
        keyTakeaway:
          'Stream processing provides low-latency continuous results; batch processing offers higher throughput with inherent delay.',
      },
      {
        id: 'sd-queues-backpressure',
        title: 'What is backpressure and how do you handle it?',
        difficulty: 'intermediate',
        answer:
          'Backpressure occurs when a producer generates messages faster than a consumer can process them, risking memory exhaustion or message loss. Handling strategies include bounded queues that block or reject producers when full, rate limiting on the producer side, scaling consumers horizontally, and load shedding where low-priority messages are dropped under pressure.',
        tags: ['backpressure', 'flow-control', 'resilience'],
        keyTakeaway:
          'Handle backpressure with bounded queues, rate limiting, consumer scaling, or load shedding to prevent system overload.',
      },
      {
        id: 'sd-queues-ordering',
        title: 'How do you guarantee message ordering in a distributed queue?',
        difficulty: 'advanced',
        answer:
          'Global ordering across all messages is extremely expensive and limits throughput to a single partition. Partition-level ordering (as in Kafka) guarantees order within a partition by assigning related messages the same partition key. For most use cases, per-entity ordering (e.g., all events for user X go to the same partition) is sufficient and preserves parallelism.',
        tags: ['ordering', 'partitioning', 'distributed-systems'],
        keyTakeaway:
          'Use partition keys to guarantee per-entity ordering while maintaining parallelism across partitions.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. Load Balancing (6 questions)
  // ─────────────────────────────────────────────
  {
    id: 'sd-load-balancing',
    label: 'Load Balancing',
    icon: 'Scale',
    description:
      'Load balancing algorithms, health checking, and traffic distribution strategies for high availability.',
    questions: [
      {
        id: 'sd-load-balancing-l4-vs-l7',
        title: 'What is the difference between L4 and L7 load balancing?',
        difficulty: 'intermediate',
        answer:
          'L4 (transport layer) load balancers route traffic based on IP address and TCP/UDP port without inspecting packet contents, making them very fast and efficient. L7 (application layer) load balancers can inspect HTTP headers, URLs, cookies, and content to make intelligent routing decisions like path-based routing. L7 is more flexible but adds latency from deeper packet inspection.',
        tags: ['l4', 'l7', 'load-balancing', 'networking'],
        keyTakeaway:
          'L4 is faster with simple TCP-level routing; L7 enables content-aware decisions like path-based or header-based routing.',
      },
      {
        id: 'sd-load-balancing-algorithms',
        title: 'What are the common load balancing algorithms?',
        difficulty: 'beginner',
        answer:
          'Round-robin distributes requests sequentially to each server and works well when servers have equal capacity. Least-connections sends requests to the server with the fewest active connections, adapting to varying request durations. IP-hash routes requests from the same client IP to the same server, useful for session affinity without sticky session configuration.',
        tags: ['round-robin', 'least-connections', 'ip-hash'],
        keyTakeaway:
          'Round-robin is simplest; least-connections adapts to uneven load; IP-hash provides implicit session affinity.',
      },
      {
        id: 'sd-load-balancing-health-checks',
        title: 'How do health checks work in load balancing?',
        difficulty: 'beginner',
        answer:
          'Health checks are periodic probes sent by the load balancer to backend servers to verify they are functioning correctly. Active health checks send requests to a dedicated health endpoint and expect a specific response code. If a server fails consecutive checks it is removed from the pool, and it is re-added once it passes checks again, preventing traffic from reaching unhealthy nodes.',
        tags: ['health-checks', 'availability', 'monitoring'],
        keyTakeaway:
          'Health checks automatically remove unhealthy servers from the pool and re-add them when they recover.',
      },
      {
        id: 'sd-load-balancing-sticky-sessions',
        title: 'What are sticky sessions and when should you avoid them?',
        difficulty: 'intermediate',
        answer:
          'Sticky sessions (session affinity) route all requests from a given user to the same backend server, typically using cookies or IP-based mapping. They are useful when session state is stored in-memory on the server. However, they create uneven load distribution, complicate scaling, and cause disruption when a server goes down, so externalizing session state to Redis is preferred.',
        tags: ['sticky-sessions', 'session-management', 'scalability'],
        keyTakeaway:
          'Avoid sticky sessions by externalizing session state to a shared store like Redis for better scalability.',
      },
      {
        id: 'sd-load-balancing-reverse-proxy',
        title: 'What is a reverse proxy and how does it relate to load balancing?',
        difficulty: 'beginner',
        answer:
          'A reverse proxy sits between clients and backend servers, forwarding client requests to the appropriate server and returning the response. It provides security by hiding backend topology, enables SSL termination, caching, and compression at a central point. Load balancing is one function of a reverse proxy; tools like Nginx and HAProxy serve both roles simultaneously.',
        tags: ['reverse-proxy', 'nginx', 'infrastructure'],
        keyTakeaway:
          'A reverse proxy is a superset of a load balancer, adding security, SSL termination, caching, and compression.',
      },
      {
        id: 'sd-load-balancing-gslb',
        title: 'What is Global Server Load Balancing (GSLB)?',
        difficulty: 'advanced',
        answer:
          'GSLB distributes traffic across data centers in different geographic regions using DNS-based routing, typically returning the IP of the nearest or healthiest data center. It considers factors like geographic proximity, server health, and current load to route users optimally. GSLB is essential for disaster recovery, enabling automatic failover to another region when an entire data center goes down.',
        tags: ['gslb', 'geo-routing', 'disaster-recovery'],
        keyTakeaway:
          'GSLB uses DNS to route users to the nearest healthy data center, enabling geographic distribution and regional failover.',
      },
    ],
  },
];

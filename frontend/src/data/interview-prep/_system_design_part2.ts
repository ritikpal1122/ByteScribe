import type { InterviewTopic } from './types';

export const SD_PART2_TOPICS: InterviewTopic[] = [
  // ─────────────────────────────────────────────
  // 1. Microservices Architecture
  // ─────────────────────────────────────────────
  {
    id: 'sd-microservices',
    label: 'Microservices Architecture',
    icon: 'Boxes',
    questions: [
      {
        id: 'sd-microservices-monolith-vs-micro',
        title: 'What are the trade-offs between monolith and microservices?',
        difficulty: 'beginner',
        answer:
          'A monolith is simpler to develop, test, and deploy but becomes harder to scale and maintain as it grows. Microservices allow independent scaling and deployment of each service but introduce network latency, data consistency challenges, and operational complexity.',
        tags: ['microservices', 'monolith', 'architecture'],
        keyTakeaway:
          'Start with a monolith and extract microservices only when complexity or scaling demands justify the operational overhead.',
      },
      {
        id: 'sd-microservices-service-discovery',
        title: 'How does service discovery work in a microservices architecture?',
        difficulty: 'intermediate',
        answer:
          'Service discovery lets services locate each other dynamically without hard-coded addresses. Client-side discovery has each service query a registry like Consul or Eureka, while server-side discovery uses a load balancer or DNS that resolves service names to healthy instances.',
        tags: ['microservices', 'service-discovery', 'consul'],
        keyTakeaway:
          'Service discovery decouples services from fixed network locations by using a registry that tracks live instances.',
      },
      {
        id: 'sd-microservices-api-gateway',
        title: 'What is the role of an API gateway?',
        difficulty: 'beginner',
        answer:
          'An API gateway is a single entry point that routes client requests to the appropriate microservices, handling cross-cutting concerns like authentication, rate limiting, and response aggregation. It shields clients from the internal service topology and simplifies client-side logic.',
        tags: ['microservices', 'api-gateway', 'routing'],
        keyTakeaway:
          'An API gateway centralizes routing, auth, and rate limiting so individual services do not have to.',
      },
      {
        id: 'sd-microservices-circuit-breaker',
        title: 'What is the circuit breaker pattern?',
        difficulty: 'intermediate',
        answer:
          'The circuit breaker monitors calls to a downstream service and trips open after a failure threshold, immediately returning errors instead of waiting for timeouts. After a cooldown period it enters a half-open state, allowing a few test requests to determine if the downstream has recovered.',
        tags: ['microservices', 'circuit-breaker', 'resilience'],
        keyTakeaway:
          'Circuit breakers prevent cascading failures by fast-failing requests to unhealthy downstream services.',
      },
      {
        id: 'sd-microservices-saga',
        title: 'What is the saga pattern?',
        difficulty: 'advanced',
        answer:
          'The saga pattern manages distributed transactions by breaking them into a sequence of local transactions, each with a compensating action for rollback. It avoids distributed locks by using choreography (events) or orchestration (central coordinator).',
        tags: ['microservices', 'saga', 'distributed-transactions'],
        keyTakeaway:
          'Sagas replace distributed transactions with a chain of local transactions and compensations.',
      },
      {
        id: 'sd-microservices-sidecar',
        title: 'What is the sidecar pattern?',
        difficulty: 'intermediate',
        answer:
          'The sidecar pattern deploys a helper process alongside each service instance to handle cross-cutting concerns like logging, monitoring, or TLS termination. This keeps the main service code clean and allows infrastructure capabilities to be updated independently of the business logic.',
        tags: ['microservices', 'sidecar', 'infrastructure'],
        keyTakeaway:
          'Sidecars offload infrastructure concerns into a co-deployed helper process, keeping service code focused on business logic.',
      },
      {
        id: 'sd-microservices-service-mesh',
        title: 'What is a service mesh?',
        difficulty: 'advanced',
        answer:
          'A service mesh is an infrastructure layer of sidecar proxies (like Envoy in Istio) that handles service-to-service communication, providing mutual TLS, traffic management, observability, and retries transparently. The control plane configures all proxies while the data plane handles actual traffic.',
        tags: ['microservices', 'service-mesh', 'istio'],
        keyTakeaway:
          'A service mesh provides uniform observability, security, and traffic control across all services without code changes.',
      },
      {
        id: 'sd-microservices-decomposition',
        title: 'What strategies exist for decomposing a monolith into microservices?',
        difficulty: 'intermediate',
        answer:
          'Common strategies include decomposing by business domain using bounded contexts from Domain-Driven Design, by team ownership, or by identifying seams in the codebase with minimal cross-dependencies. The strangler fig pattern incrementally replaces monolith functionality by routing specific requests to new services.',
        tags: ['microservices', 'decomposition', 'ddd'],
        keyTakeaway:
          'Use bounded contexts and the strangler fig pattern to incrementally extract services from a monolith.',
      },
      {
        id: 'sd-microservices-communication',
        title: 'What are the main inter-service communication patterns?',
        difficulty: 'beginner',
        answer:
          'Synchronous communication uses REST or gRPC for request-response interactions with low latency but tight coupling. Asynchronous communication uses message brokers like Kafka or RabbitMQ for event-driven interactions that decouple services but add eventual consistency complexity.',
        tags: ['microservices', 'communication', 'messaging'],
        keyTakeaway:
          'Choose synchronous calls for real-time queries and asynchronous events for decoupled, eventually consistent workflows.',
      },
      {
        id: 'sd-microservices-data-consistency',
        title: 'How do you maintain data consistency across microservices?',
        difficulty: 'advanced',
        answer:
          'Since each service owns its database, you cannot use traditional ACID transactions across services. Instead, use sagas for orchestrated workflows, event sourcing to capture all state changes as events, and the outbox pattern to atomically publish events alongside local database writes.',
        tags: ['microservices', 'data-consistency', 'event-sourcing'],
        keyTakeaway:
          'Embrace eventual consistency using sagas, event sourcing, and the transactional outbox pattern across service boundaries.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. Storage Systems
  // ─────────────────────────────────────────────
  {
    id: 'sd-storage',
    label: 'Storage Systems',
    icon: 'HardDrive',
    questions: [
      {
        id: 'sd-storage-block-file-object',
        title: 'What is the difference between block, file, and object storage?',
        difficulty: 'beginner',
        answer:
          'Block storage splits data into fixed-size blocks with no metadata, offering the lowest latency for databases and VMs. File storage organizes data in a hierarchy of directories, while object storage uses a flat namespace with rich metadata, making it ideal for unstructured data at massive scale.',
        tags: ['storage', 'block', 'object-storage'],
        keyTakeaway:
          'Block is fastest for structured I/O, file suits hierarchical access, and object scales best for unstructured data.',
      },
      {
        id: 'sd-storage-hdfs',
        title: 'How does HDFS work?',
        difficulty: 'intermediate',
        answer:
          'HDFS splits large files into 128 MB blocks and distributes them across DataNodes, with a NameNode tracking block locations and metadata. Each block is replicated (default 3 copies) across different racks for fault tolerance, and clients read from the nearest replica for locality.',
        tags: ['storage', 'hdfs', 'hadoop'],
        keyTakeaway:
          'HDFS achieves fault tolerance and throughput by splitting files into replicated blocks managed by a central NameNode.',
      },
      {
        id: 'sd-storage-s3',
        title: 'What makes Amazon S3 highly available and durable?',
        difficulty: 'intermediate',
        answer:
          'S3 stores objects redundantly across multiple Availability Zones within a region, providing 99.999999999% durability. It uses consistent hashing for partition placement, versioning for accidental deletion protection, and event-driven replication to ensure no single failure loses data.',
        tags: ['storage', 's3', 'durability', 'aws'],
        keyTakeaway:
          'S3 achieves eleven nines of durability by replicating objects across multiple isolated availability zones.',
      },
      {
        id: 'sd-storage-replication',
        title: 'What are the main data replication strategies?',
        difficulty: 'intermediate',
        answer:
          'Single-leader replication routes all writes through one node that streams changes to followers, offering strong consistency but a write bottleneck. Multi-leader and leaderless replication allow writes at multiple nodes for higher availability but require conflict resolution mechanisms like last-write-wins or CRDTs.',
        tags: ['storage', 'replication', 'consistency'],
        keyTakeaway:
          'Single-leader replication is simplest for consistency; multi-leader and leaderless trade consistency for availability.',
      },
      {
        id: 'sd-storage-erasure-coding',
        title: 'What is erasure coding and when is it preferred over replication?',
        difficulty: 'advanced',
        answer:
          'Erasure coding splits data into fragments and generates parity shards so the original data can be reconstructed from a subset, typically using 50% less storage than 3x replication for equivalent fault tolerance. It is preferred for cold or archival data where the higher CPU cost of encoding and decoding is acceptable.',
        tags: ['storage', 'erasure-coding', 'fault-tolerance'],
        keyTakeaway:
          'Erasure coding trades compute overhead for significantly lower storage costs compared to full replication.',
      },
      {
        id: 'sd-storage-content-addressable',
        title: 'What is content-addressable storage?',
        difficulty: 'advanced',
        answer:
          'Content-addressable storage (CAS) identifies data by its cryptographic hash rather than a file path or name, so identical content is stored only once. Git uses this model internally with SHA hashes, and it naturally enables deduplication, tamper detection, and immutable storage.',
        tags: ['storage', 'cas', 'deduplication'],
        keyTakeaway:
          'CAS addresses data by its hash, enabling automatic deduplication and integrity verification.',
      },
      {
        id: 'sd-storage-tiering',
        title: 'What is hot, warm, and cold storage tiering?',
        difficulty: 'beginner',
        answer:
          'Storage tiering classifies data by access frequency: hot storage uses fast SSDs for frequently accessed data, warm storage uses cheaper HDDs for occasional access, and cold storage uses archival media like tape or S3 Glacier for rarely accessed data. Automated policies migrate data between tiers based on access patterns.',
        tags: ['storage', 'tiering', 'cost-optimization'],
        keyTakeaway:
          'Tiering reduces costs by automatically moving infrequently accessed data to cheaper, slower storage.',
      },
      {
        id: 'sd-storage-san',
        title: 'What is a storage area network (SAN)?',
        difficulty: 'intermediate',
        answer:
          'A SAN is a dedicated high-speed network that connects servers to shared block-level storage devices, making remote disks appear as locally attached volumes. SANs use protocols like Fibre Channel or iSCSI and are common in enterprise environments where multiple servers need low-latency access to centralized storage.',
        tags: ['storage', 'san', 'enterprise'],
        keyTakeaway:
          'SANs provide shared, high-performance block storage over a dedicated network separate from regular LAN traffic.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Rate Limiting & Throttling
  // ─────────────────────────────────────────────
  {
    id: 'sd-rate-limiting',
    label: 'Rate Limiting & Throttling',
    icon: 'Shield',
    questions: [
      {
        id: 'sd-rate-limiting-token-bucket',
        title: 'How does the token bucket algorithm work?',
        difficulty: 'beginner',
        answer:
          'A token bucket holds tokens that refill at a fixed rate up to a maximum capacity, and each request consumes one token. If the bucket is empty the request is rejected, but the bucket can accumulate tokens to allow short bursts above the steady-state rate.',
        tags: ['rate-limiting', 'token-bucket', 'algorithm'],
        keyTakeaway:
          'Token bucket allows controlled bursts while enforcing an average request rate via a refilling token pool.',
      },
      {
        id: 'sd-rate-limiting-leaky-bucket',
        title: 'How does the leaky bucket algorithm differ from token bucket?',
        difficulty: 'intermediate',
        answer:
          'The leaky bucket processes requests at a constant rate regardless of arrival pattern, queuing excess requests and dropping them when the queue is full. Unlike token bucket, it smooths out bursts completely, producing a perfectly uniform output rate.',
        tags: ['rate-limiting', 'leaky-bucket', 'traffic-shaping'],
        keyTakeaway:
          'Leaky bucket enforces a strictly uniform output rate by queuing bursts, unlike token bucket which permits them.',
      },
      {
        id: 'sd-rate-limiting-window',
        title: 'What is the difference between fixed window and sliding window rate limiting?',
        difficulty: 'intermediate',
        answer:
          'Fixed window counters reset at regular intervals, allowing up to 2x the limit at window boundaries when requests cluster at the end of one window and start of the next. Sliding window uses a rolling time frame or weighted combination of current and previous windows to eliminate this boundary burst problem.',
        tags: ['rate-limiting', 'sliding-window', 'fixed-window'],
        keyTakeaway:
          'Sliding window eliminates the boundary burst problem of fixed window by using a rolling time frame.',
      },
      {
        id: 'sd-rate-limiting-distributed',
        title: 'How do you implement distributed rate limiting?',
        difficulty: 'advanced',
        answer:
          'Distributed rate limiting typically uses a centralized store like Redis with atomic Lua scripts for counter operations, ensuring all nodes share the same state. Alternatively, each node can maintain a local limit proportional to the cluster size, trading slight inaccuracy for lower latency and no central dependency.',
        tags: ['rate-limiting', 'distributed', 'redis'],
        keyTakeaway:
          'Use a shared Redis counter with atomic operations for accurate distributed rate limiting across multiple nodes.',
      },
      {
        id: 'sd-rate-limiting-quota',
        title: 'How do you design API quota management?',
        difficulty: 'intermediate',
        answer:
          'API quota management assigns usage limits per client or API key, tracked over billing periods like daily or monthly windows. It requires a durable store for quota counters, grace period handling for slightly over-limit bursts, and clear HTTP 429 responses with Retry-After headers and usage dashboards.',
        tags: ['rate-limiting', 'quota', 'api-management'],
        keyTakeaway:
          'Quota management tracks per-client usage against billing-period limits and communicates remaining capacity via response headers.',
      },
      {
        id: 'sd-rate-limiting-layers',
        title: 'At which layers should rate limiting be applied?',
        difficulty: 'intermediate',
        answer:
          'Rate limiting should be applied at multiple layers: at the edge with CDN or load balancer rules for coarse IP-based limits, at the API gateway for per-user or per-key limits, and within individual services for resource-specific throttling. Defense in depth prevents any single layer bypass from overwhelming the system.',
        tags: ['rate-limiting', 'defense-in-depth', 'architecture'],
        keyTakeaway:
          'Apply rate limiting at the edge, gateway, and service levels for defense in depth against traffic spikes.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Real-world System Designs
  // ─────────────────────────────────────────────
  {
    id: 'sd-real-world',
    label: 'Real-world System Designs',
    icon: 'Building',
    questions: [
      {
        id: 'sd-real-world-url-shortener',
        title: 'How would you design a URL shortener?',
        difficulty: 'beginner',
        answer:
          'Generate a unique short code using base62 encoding of an auto-incrementing ID or a hash of the long URL, then store the mapping in a key-value store. Reads heavily dominate writes, so a cache layer in front of the datastore handles the vast majority of redirects without hitting the database.',
        tags: ['system-design', 'url-shortener', 'hashing'],
        keyTakeaway:
          'A URL shortener maps base62-encoded IDs to long URLs and relies on heavy caching for read-dominant traffic.',
      },
      {
        id: 'sd-real-world-chat',
        title: 'How would you design a real-time chat system?',
        difficulty: 'intermediate',
        answer:
          'Use WebSocket connections for real-time message delivery, with a presence service tracking online users and a message queue for reliable delivery to offline recipients. Messages are persisted in a partitioned datastore keyed by conversation ID, and a fan-out service distributes group messages to all participants.',
        tags: ['system-design', 'chat', 'websocket'],
        keyTakeaway:
          'Real-time chat combines WebSocket connections for live delivery with persistent queues for offline message guarantees.',
      },
      {
        id: 'sd-real-world-news-feed',
        title: 'How would you design a news feed system?',
        difficulty: 'intermediate',
        answer:
          'The two core approaches are fan-out on write, which precomputes each follower feed when a post is created, and fan-out on read, which assembles the feed at request time. A hybrid approach uses fan-out on write for normal users and fan-out on read for celebrity accounts to avoid writing to millions of follower feeds.',
        tags: ['system-design', 'news-feed', 'fan-out'],
        keyTakeaway:
          'Hybrid fan-out precomputes feeds for normal users on write and assembles celebrity feeds on read to balance cost and latency.',
      },
      {
        id: 'sd-real-world-notification',
        title: 'How would you design a notification system?',
        difficulty: 'intermediate',
        answer:
          'A notification service receives events from various producers, applies user preference filters and deduplication, then routes notifications to the appropriate delivery channel (push, SMS, email) via dedicated workers. Priority queues ensure critical alerts are delivered first, and a feedback loop tracks delivery status and user engagement.',
        tags: ['system-design', 'notifications', 'message-queue'],
        keyTakeaway:
          'A notification system decouples event ingestion from multi-channel delivery using preference-aware routing and priority queues.',
      },
      {
        id: 'sd-real-world-autocomplete',
        title: 'How would you design a search autocomplete system?',
        difficulty: 'intermediate',
        answer:
          'Build a trie data structure storing popular query prefixes with frequency counts, served from in-memory caches at the edge for sub-10ms latency. The trie is rebuilt periodically from aggregated search logs using a MapReduce pipeline, and results are ranked by frequency, recency, and personalization signals.',
        tags: ['system-design', 'autocomplete', 'trie'],
        keyTakeaway:
          'Search autocomplete uses an in-memory trie of popular prefixes rebuilt periodically from aggregated query logs.',
      },
      {
        id: 'sd-real-world-file-storage',
        title: 'How would you design a distributed file storage system like Google Drive?',
        difficulty: 'advanced',
        answer:
          'Split files into encrypted chunks stored across multiple nodes with replication for durability, and maintain a metadata service tracking chunk locations, file hierarchy, and sharing permissions. A sync service uses operational transforms or CRDTs to handle concurrent edits, with change notifications pushed via long polling or WebSockets.',
        tags: ['system-design', 'file-storage', 'distributed'],
        keyTakeaway:
          'Distributed file storage chunks and replicates file blocks while a metadata service manages hierarchy, sharing, and sync.',
      },
      {
        id: 'sd-real-world-video-streaming',
        title: 'How would you design a video streaming platform?',
        difficulty: 'advanced',
        answer:
          'Uploaded videos are transcoded into multiple resolutions and bitrates by a distributed encoding pipeline, then distributed to CDN edge servers worldwide. Adaptive bitrate streaming (HLS/DASH) lets clients dynamically switch quality based on bandwidth, while a recommendation service drives content discovery.',
        tags: ['system-design', 'video-streaming', 'cdn'],
        keyTakeaway:
          'Video streaming transcodes into multiple bitrates, distributes via CDN, and uses adaptive streaming for quality adjustment.',
      },
      {
        id: 'sd-real-world-ride-sharing',
        title: 'How would you design a ride-sharing system like Uber?',
        difficulty: 'advanced',
        answer:
          'A location service ingests driver GPS updates into a geospatial index (like a quadtree or geohash grid) for efficient nearest-driver queries. The matching service pairs riders with drivers using ETA-based ranking, and a dispatch service manages trip state transitions with a pricing engine computing dynamic surge pricing based on supply and demand.',
        tags: ['system-design', 'ride-sharing', 'geospatial'],
        keyTakeaway:
          'Ride-sharing uses a geospatial index for driver proximity queries and a matching service for ETA-based rider-driver pairing.',
      },
      {
        id: 'sd-real-world-payment',
        title: 'How would you design a payment processing system?',
        difficulty: 'advanced',
        answer:
          'Payment systems require idempotency keys on every request to prevent double charges, with each transaction progressing through states (pending, authorized, captured, settled) in a state machine. An event-sourced ledger provides an immutable audit trail, and reconciliation jobs compare internal records with bank statements to detect discrepancies.',
        tags: ['system-design', 'payments', 'idempotency'],
        keyTakeaway:
          'Payment systems use idempotency keys, state machines, and event-sourced ledgers to ensure exactly-once processing and auditability.',
      },
      {
        id: 'sd-real-world-social-graph',
        title: 'How would you design a social graph service?',
        difficulty: 'intermediate',
        answer:
          'Store relationships as edges in an adjacency list, partitioned by user ID and backed by a graph database or sharded key-value store for efficient traversal queries like mutual friends. A cache layer stores frequently accessed friend lists, and a separate service computes graph analytics like degrees of separation or friend suggestions asynchronously.',
        tags: ['system-design', 'social-graph', 'graph-database'],
        keyTakeaway:
          'A social graph stores relationships as adjacency lists in a sharded store with caching for frequent traversal queries.',
      },
      {
        id: 'sd-real-world-recommendation',
        title: 'How would you design a recommendation engine?',
        difficulty: 'advanced',
        answer:
          'Combine collaborative filtering (users who liked X also liked Y) with content-based filtering (items similar in features to what the user engaged with) in a two-stage pipeline: candidate generation narrows millions of items to hundreds, then a ranking model scores them using user features and context. Results are cached and refreshed periodically.',
        tags: ['system-design', 'recommendation', 'machine-learning'],
        keyTakeaway:
          'Recommendation engines use a two-stage pipeline of candidate generation and ranking to efficiently personalize from millions of items.',
      },
      {
        id: 'sd-real-world-metrics',
        title: 'How would you design a metrics and analytics pipeline?',
        difficulty: 'intermediate',
        answer:
          'Ingest events through a message broker like Kafka for durability and decoupling, process them in real-time with a stream processor like Flink for dashboards and alerts, and batch-load into a columnar data warehouse for historical analysis. A time-series database stores aggregated metrics for efficient range queries and downsampling.',
        tags: ['system-design', 'metrics', 'analytics', 'kafka'],
        keyTakeaway:
          'Metrics pipelines combine stream processing for real-time alerts with batch loading into columnar stores for historical analysis.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. Back-of-Envelope Estimation
  // ─────────────────────────────────────────────
  {
    id: 'sd-estimation',
    label: 'Back-of-Envelope Estimation',
    icon: 'Calculator',
    questions: [
      {
        id: 'sd-estimation-qps',
        title: 'How do you estimate queries per second (QPS) for a service?',
        difficulty: 'beginner',
        answer:
          'Start with daily active users, estimate the average number of actions per user per day, and divide by 86,400 seconds to get average QPS. Multiply by a peak factor (typically 2-5x average) to get peak QPS, which is what you should design capacity for.',
        tags: ['estimation', 'qps', 'capacity'],
        keyTakeaway:
          'Average QPS equals daily requests divided by 86,400, then multiply by a peak factor for capacity planning.',
      },
      {
        id: 'sd-estimation-storage',
        title: 'How do you estimate storage requirements?',
        difficulty: 'beginner',
        answer:
          'Calculate the average size of each data object, multiply by the number of new objects per day, then multiply by the retention period in days. Account for replication factor (typically 3x), indexing overhead (10-30%), and growth projections over 3-5 years to determine total storage needed.',
        tags: ['estimation', 'storage', 'capacity-planning'],
        keyTakeaway:
          'Total storage equals object size times daily volume times retention, multiplied by replication factor and growth margin.',
      },
      {
        id: 'sd-estimation-bandwidth',
        title: 'How do you estimate bandwidth requirements?',
        difficulty: 'intermediate',
        answer:
          'Multiply peak QPS by the average response size to get peak egress bandwidth. For a service handling 10K QPS with 50 KB average responses, peak bandwidth is 500 MB/s or about 4 Gbps. Consider both ingress (uploads, API requests) and egress (responses, downloads) separately.',
        tags: ['estimation', 'bandwidth', 'network'],
        keyTakeaway:
          'Peak bandwidth equals peak QPS multiplied by average response size, calculated separately for ingress and egress.',
      },
      {
        id: 'sd-estimation-memory',
        title: 'How do you estimate memory requirements for a cache?',
        difficulty: 'intermediate',
        answer:
          'Apply the 80/20 rule: if 20% of data accounts for 80% of reads, cache that 20%. Multiply the total dataset size by 0.2 to get the working set, then account for cache metadata overhead and a replication factor across cache nodes. For sessions, multiply concurrent users by average session size.',
        tags: ['estimation', 'memory', 'caching'],
        keyTakeaway:
          'Cache the top 20% of data by access frequency and multiply the working set by replication factor for total memory.',
      },
      {
        id: 'sd-estimation-latency-numbers',
        title: 'What latency numbers should every engineer know?',
        difficulty: 'beginner',
        answer:
          'L1 cache reference is about 0.5 ns, main memory access is 100 ns, SSD random read is 150 microseconds, HDD seek is 10 ms, and a round trip within the same datacenter is about 0.5 ms. A cross-continent network round trip is roughly 150 ms, making it the most expensive common operation.',
        tags: ['estimation', 'latency', 'fundamentals'],
        keyTakeaway:
          'Memory is 200x faster than SSD, SSD is 60x faster than HDD, and network round trips dominate at 150ms cross-continent.',
      },
      {
        id: 'sd-estimation-capacity-planning',
        title: 'What is the process for capacity planning?',
        difficulty: 'intermediate',
        answer:
          'Capacity planning involves estimating current resource usage, projecting growth rates over 1-3 years, identifying bottlenecks in compute, memory, storage, and network, and provisioning with headroom (typically 30-50% above projected peak). Load testing validates estimates, and autoscaling handles unexpected spikes.',
        tags: ['estimation', 'capacity-planning', 'scaling'],
        keyTakeaway:
          'Capacity planning projects resource needs with growth margin and validates estimates through load testing.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. Distributed Systems
  // ─────────────────────────────────────────────
  {
    id: 'sd-distributed',
    label: 'Distributed Systems',
    icon: 'Network',
    questions: [
      {
        id: 'sd-distributed-consensus',
        title: 'What are consensus algorithms like Raft and Paxos?',
        difficulty: 'advanced',
        answer:
          'Consensus algorithms ensure a cluster of nodes agrees on a single value even when some nodes fail. Paxos is the foundational algorithm but notoriously hard to implement, while Raft was designed to be understandable, using leader election, log replication, and safety rules to achieve the same guarantees with clearer semantics.',
        tags: ['distributed-systems', 'consensus', 'raft', 'paxos'],
        keyTakeaway:
          'Raft and Paxos ensure cluster-wide agreement on values despite node failures, with Raft being the more practical choice.',
      },
      {
        id: 'sd-distributed-leader-election',
        title: 'How does leader election work in distributed systems?',
        difficulty: 'intermediate',
        answer:
          'Leader election selects one node to coordinate actions, typically using a consensus algorithm or a distributed lock service like ZooKeeper. In Raft, nodes start as followers, become candidates after a randomized timeout, and win election by receiving a majority of votes, with term numbers preventing split-brain scenarios.',
        tags: ['distributed-systems', 'leader-election', 'coordination'],
        keyTakeaway:
          'Leader election uses majority voting with term numbers to ensure exactly one coordinator despite network partitions.',
      },
      {
        id: 'sd-distributed-locks',
        title: 'How do distributed locks work?',
        difficulty: 'intermediate',
        answer:
          'Distributed locks coordinate access to shared resources across nodes, commonly implemented using Redis (Redlock algorithm) or ZooKeeper (ephemeral znodes). They must handle lock expiration to prevent deadlocks from crashed holders and use fencing tokens to prevent stale lock holders from making unsafe writes.',
        tags: ['distributed-systems', 'distributed-locks', 'redis'],
        keyTakeaway:
          'Distributed locks require expiration for deadlock prevention and fencing tokens to guard against stale lock holders.',
      },
      {
        id: 'sd-distributed-vector-clocks',
        title: 'What are vector clocks and why are they needed?',
        difficulty: 'advanced',
        answer:
          'Vector clocks track causality between events in distributed systems by maintaining a vector of logical counters, one per node. They detect whether two events are causally related or concurrent, which physical timestamps cannot reliably do due to clock skew, enabling correct conflict detection in systems like DynamoDB.',
        tags: ['distributed-systems', 'vector-clocks', 'causality'],
        keyTakeaway:
          'Vector clocks capture causal ordering between distributed events, detecting true conflicts that wall-clock timestamps miss.',
      },
      {
        id: 'sd-distributed-bloom-filters',
        title: 'What is a Bloom filter and when would you use one?',
        difficulty: 'intermediate',
        answer:
          'A Bloom filter is a space-efficient probabilistic data structure that tests set membership with no false negatives but a small false positive rate. It is used to avoid expensive lookups: checking if a key exists in a database, if a URL has been crawled, or if a username is taken before querying the actual store.',
        tags: ['distributed-systems', 'bloom-filter', 'data-structure'],
        keyTakeaway:
          'Bloom filters cheaply answer "definitely not in set" queries, eliminating unnecessary database or network lookups.',
      },
      {
        id: 'sd-distributed-gossip',
        title: 'How does the gossip protocol work?',
        difficulty: 'intermediate',
        answer:
          'In the gossip protocol, each node periodically selects a random peer and exchanges state information, spreading updates exponentially like an epidemic. It provides eventual consistency for cluster membership, failure detection, and metadata propagation with O(log N) convergence time and no single point of failure.',
        tags: ['distributed-systems', 'gossip', 'protocol'],
        keyTakeaway:
          'Gossip spreads state updates exponentially via random peer exchanges, achieving eventual consistency without centralized coordination.',
      },
      {
        id: 'sd-distributed-consistent-hashing',
        title: 'What is consistent hashing and why is it important?',
        difficulty: 'intermediate',
        answer:
          'Consistent hashing maps both keys and nodes onto a circular hash ring so that adding or removing a node only remaps keys on the neighboring segment, not the entire dataset. Virtual nodes (multiple hash positions per physical node) ensure even distribution, making it the foundation of partitioning in systems like DynamoDB and Cassandra.',
        tags: ['distributed-systems', 'consistent-hashing', 'partitioning'],
        keyTakeaway:
          'Consistent hashing minimizes key redistribution when nodes change by mapping keys and nodes onto a shared hash ring.',
      },
      {
        id: 'sd-distributed-split-brain',
        title: 'What is the split-brain problem?',
        difficulty: 'intermediate',
        answer:
          'Split-brain occurs when a network partition divides a cluster into two or more groups, each believing it is the active partition and accepting writes independently, leading to data divergence. Solutions include quorum-based systems requiring a majority to operate, fencing via STONITH, and leader leases with bounded expiration.',
        tags: ['distributed-systems', 'split-brain', 'partition'],
        keyTakeaway:
          'Split-brain is prevented by requiring a quorum majority to accept writes, ensuring only one partition remains active.',
      },
      {
        id: 'sd-distributed-byzantine',
        title: 'What is Byzantine fault tolerance?',
        difficulty: 'advanced',
        answer:
          'Byzantine fault tolerance (BFT) handles nodes that behave arbitrarily, including sending conflicting messages or lying about their state, not just crashing. PBFT requires 3f+1 nodes to tolerate f Byzantine faults, making it expensive but necessary for trustless environments like blockchain consensus.',
        tags: ['distributed-systems', 'byzantine', 'fault-tolerance'],
        keyTakeaway:
          'BFT tolerates malicious or arbitrary node behavior but requires 3f+1 nodes, making it costlier than crash fault tolerance.',
      },
      {
        id: 'sd-distributed-crdts',
        title: 'What are CRDTs and when are they useful?',
        difficulty: 'advanced',
        answer:
          'Conflict-free Replicated Data Types (CRDTs) are data structures that can be independently updated on different replicas and merged automatically without conflicts, always converging to the same state. They are ideal for collaborative editing, distributed counters, and shopping carts where eventual consistency is acceptable and coordination-free updates are needed.',
        tags: ['distributed-systems', 'crdts', 'eventual-consistency'],
        keyTakeaway:
          'CRDTs guarantee automatic conflict-free merging across replicas, enabling coordination-free updates with eventual consistency.',
      },
    ],
  },
];

import type { InterviewTopic } from './types';

export const SQL_PART2_TOPICS: InterviewTopic[] = [
  // ─── 1. Indexing & Performance (12 Qs) ───────────────────────────────
  {
    id: 'sql-indexing',
    label: 'Indexing & Performance',
    icon: 'Zap',
    questions: [
      {
        id: 'sql-indexing-btree',
        title: 'What is a B-tree index?',
        difficulty: 'beginner',
        answer:
          'A B-tree index is a balanced tree structure that keeps data sorted for efficient lookups, range scans, and ordered retrieval. Most databases use B-tree as the default index type because it handles equality and range queries well.',
        tags: ['indexing', 'b-tree', 'performance'],
        keyTakeaway:
          'B-tree indexes are the workhorse of database query optimization.',
      },
      {
        id: 'sql-indexing-hash',
        title: 'How does a hash index differ from a B-tree index?',
        difficulty: 'intermediate',
        answer:
          'A hash index maps keys through a hash function to bucket locations, providing O(1) equality lookups but no support for range queries. B-tree indexes are slower for exact matches but support ordering, range scans, and prefix searches.',
        tags: ['indexing', 'hash-index', 'comparison'],
        keyTakeaway:
          'Use hash indexes only when you exclusively need equality comparisons.',
      },
      {
        id: 'sql-indexing-composite',
        title: 'What is a composite index and when should you use one?',
        difficulty: 'intermediate',
        answer:
          'A composite index spans multiple columns in a specific order. It is useful when queries frequently filter or sort on those columns together. The leftmost prefix rule means the index can serve queries on the leading column(s) but not on trailing columns alone.',
        tags: ['indexing', 'composite-index', 'query-optimization'],
        keyTakeaway:
          'Column order in a composite index matters — put the most selective or most-queried column first.',
      },
      {
        id: 'sql-indexing-covering',
        title: 'What is a covering index?',
        difficulty: 'advanced',
        answer:
          'A covering index includes all columns a query needs, so the database can satisfy the query entirely from the index without visiting the table heap. This avoids random I/O to the main table and can dramatically speed up read-heavy queries.',
        tags: ['indexing', 'covering-index', 'performance'],
        keyTakeaway:
          'A covering index eliminates table lookups by storing all required columns in the index itself.',
      },
      {
        id: 'sql-indexing-partial',
        title: 'What is a partial (filtered) index?',
        difficulty: 'advanced',
        answer:
          'A partial index only indexes rows that satisfy a WHERE predicate, making it smaller and faster than a full index. It is ideal when queries consistently filter on a subset of data, such as only active users or recent orders.',
        tags: ['indexing', 'partial-index', 'optimization'],
        keyTakeaway:
          'Partial indexes reduce storage and maintenance cost by indexing only the rows you actually query.',
      },
      {
        id: 'sql-indexing-explain',
        title: 'What does EXPLAIN / EXPLAIN ANALYZE do?',
        difficulty: 'beginner',
        answer:
          'EXPLAIN shows the query planner\'s execution plan without running the query, while EXPLAIN ANALYZE actually executes it and reports real timing and row counts. Together they help you identify sequential scans, bad join orders, and missing indexes.',
        tags: ['explain', 'query-plan', 'debugging'],
        keyTakeaway:
          'Always use EXPLAIN ANALYZE to compare estimated vs actual row counts when diagnosing slow queries.',
      },
      {
        id: 'sql-indexing-query-optimization',
        title: 'What are common strategies for SQL query optimization?',
        difficulty: 'intermediate',
        answer:
          'Key strategies include adding appropriate indexes, rewriting subqueries as joins, avoiding SELECT *, reducing the result set early with WHERE clauses, and using LIMIT. Analyzing the execution plan with EXPLAIN is always the first step.',
        tags: ['optimization', 'performance', 'best-practices'],
        keyTakeaway:
          'Measure before optimizing — use EXPLAIN ANALYZE to find the actual bottleneck.',
      },
      {
        id: 'sql-indexing-selectivity',
        title: 'What is index selectivity?',
        difficulty: 'advanced',
        answer:
          'Index selectivity is the ratio of distinct values to total rows in an indexed column. A highly selective index (close to 1.0) narrows results quickly, while a low-selectivity index like a boolean column barely helps the optimizer.',
        tags: ['indexing', 'selectivity', 'performance'],
        keyTakeaway:
          'High selectivity means the index filters out most rows, making it more useful to the query planner.',
      },
      {
        id: 'sql-indexing-fulltext',
        title: 'How do full-text search indexes work?',
        difficulty: 'intermediate',
        answer:
          'Full-text indexes tokenize text into lexemes, store them in an inverted index, and support natural-language search with ranking. They handle stemming, stop words, and phrase matching far more efficiently than LIKE with wildcards.',
        tags: ['full-text-search', 'indexing', 'text'],
        keyTakeaway:
          'Full-text indexes provide relevance-ranked search that LIKE patterns cannot achieve.',
      },
      {
        id: 'sql-indexing-index-only-scan',
        title: 'What is an index-only scan?',
        difficulty: 'intermediate',
        answer:
          'An index-only scan retrieves all required data directly from the index without accessing the heap table. It is only possible when the index covers every column the query references and the visibility map confirms rows are all-visible.',
        tags: ['indexing', 'index-only-scan', 'performance'],
        keyTakeaway:
          'Index-only scans are the fastest read path because they skip the table entirely.',
      },
      {
        id: 'sql-indexing-table-statistics',
        title: 'Why are table statistics important for query planning?',
        difficulty: 'intermediate',
        answer:
          'The query planner relies on table statistics like row count, data distribution histograms, and null fractions to estimate cost and choose optimal plans. Stale statistics can lead the planner to pick sequential scans or bad join strategies.',
        tags: ['statistics', 'query-planner', 'performance'],
        keyTakeaway:
          'Run ANALYZE regularly so the planner has accurate statistics for choosing the best execution plan.',
      },
      {
        id: 'sql-indexing-planner-hints',
        title: 'What are query planner hints and should you use them?',
        difficulty: 'advanced',
        answer:
          'Planner hints (e.g., USE INDEX in MySQL, pg_hint_plan in PostgreSQL) force the optimizer to choose a specific plan. They are generally discouraged because they bypass cost-based optimization, but can be useful as a last resort when the planner consistently picks a bad plan.',
        tags: ['planner-hints', 'optimization', 'advanced'],
        keyTakeaway:
          'Prefer fixing statistics or rewriting queries over using planner hints.',
      },
    ],
  },

  // ─── 2. Advanced SQL (10 Qs) ─────────────────────────────────────────
  {
    id: 'sql-advanced',
    label: 'Advanced SQL',
    icon: 'Sparkles',
    questions: [
      {
        id: 'sql-advanced-cte',
        title: 'What is a Common Table Expression (CTE)?',
        difficulty: 'beginner',
        answer:
          'A CTE is a named temporary result set defined with a WITH clause that exists only for the duration of a single query. It improves readability by breaking complex queries into logical steps and can be referenced multiple times in the main query.',
        tags: ['cte', 'with-clause', 'readability'],
        keyTakeaway:
          'CTEs make complex queries more readable and maintainable without creating temporary tables.',
      },
      {
        id: 'sql-advanced-recursive-cte',
        title: 'How do recursive CTEs work?',
        difficulty: 'advanced',
        answer:
          'A recursive CTE has an anchor member and a recursive member joined by UNION ALL. The anchor produces the initial rows, then the recursive member repeatedly references the CTE itself until no new rows are produced. They are ideal for traversing hierarchical data like org charts or trees.',
        tags: ['recursive-cte', 'hierarchical', 'advanced'],
        keyTakeaway:
          'Recursive CTEs solve tree and graph traversal problems directly in SQL.',
      },
      {
        id: 'sql-advanced-pivot',
        title: 'What is PIVOT and UNPIVOT?',
        difficulty: 'intermediate',
        answer:
          'PIVOT transforms rows into columns by aggregating values around a category, turning long data into wide format. UNPIVOT does the reverse, converting columns back into rows. Not all databases support native PIVOT syntax — alternatives use CASE with GROUP BY.',
        tags: ['pivot', 'unpivot', 'data-transformation'],
        keyTakeaway:
          'PIVOT rotates rows to columns; UNPIVOT rotates columns to rows.',
      },
      {
        id: 'sql-advanced-json',
        title: 'How do SQL databases handle JSON data?',
        difficulty: 'intermediate',
        answer:
          'Modern databases provide JSON functions to store, query, and manipulate JSON within relational tables. PostgreSQL offers JSONB with GIN indexing for fast lookups, MySQL has JSON_EXTRACT and generated columns, and SQL Server provides OPENJSON for shredding JSON into rows.',
        tags: ['json', 'semi-structured', 'postgresql'],
        keyTakeaway:
          'JSONB in PostgreSQL offers the best combination of flexibility and indexable JSON storage.',
      },
      {
        id: 'sql-advanced-array-ops',
        title: 'What are array operations in SQL?',
        difficulty: 'intermediate',
        answer:
          'PostgreSQL supports native array columns with operators like ANY, ALL, @> (contains), and && (overlaps). Arrays are useful for storing small, ordered collections without a separate join table, though they sacrifice referential integrity.',
        tags: ['arrays', 'postgresql', 'data-types'],
        keyTakeaway:
          'Arrays simplify schemas for small multi-value fields but should not replace proper relational modeling.',
      },
      {
        id: 'sql-advanced-generated-columns',
        title: 'What are generated (computed) columns?',
        difficulty: 'intermediate',
        answer:
          'Generated columns derive their value from an expression on other columns in the same row. They can be virtual (computed on read) or stored (persisted on write). They are useful for full-name concatenation, price calculations, or indexing expressions.',
        tags: ['generated-columns', 'computed', 'schema-design'],
        keyTakeaway:
          'Generated columns keep derived data consistent without application-level logic.',
      },
      {
        id: 'sql-advanced-views-materialized',
        title: 'What is the difference between a view and a materialized view?',
        difficulty: 'beginner',
        answer:
          'A regular view is a saved query that executes each time it is referenced, while a materialized view caches the result set on disk and must be explicitly refreshed. Materialized views trade freshness for faster reads on expensive aggregations.',
        tags: ['views', 'materialized-view', 'caching'],
        keyTakeaway:
          'Use materialized views when you can tolerate slightly stale data in exchange for much faster queries.',
      },
      {
        id: 'sql-advanced-stored-procedures',
        title: 'What are stored procedures and when should you use them?',
        difficulty: 'intermediate',
        answer:
          'Stored procedures are precompiled SQL programs stored in the database that encapsulate business logic, reduce network round-trips, and can run within a single transaction. They are best for complex multi-step operations but can hinder portability and make debugging harder.',
        tags: ['stored-procedures', 'server-side', 'performance'],
        keyTakeaway:
          'Stored procedures reduce round-trips but couple business logic to the database.',
      },
      {
        id: 'sql-advanced-triggers',
        title: 'What are triggers and what are their trade-offs?',
        difficulty: 'intermediate',
        answer:
          'Triggers are database callbacks that fire automatically before or after INSERT, UPDATE, or DELETE events. They enforce constraints and audit changes but can cause hard-to-debug side effects, cascade performance issues, and make application behavior less transparent.',
        tags: ['triggers', 'automation', 'trade-offs'],
        keyTakeaway:
          'Use triggers sparingly — they are powerful but make data flow harder to reason about.',
      },
      {
        id: 'sql-advanced-dynamic-sql',
        title: 'What is dynamic SQL and what are its risks?',
        difficulty: 'advanced',
        answer:
          'Dynamic SQL constructs and executes SQL strings at runtime, enabling flexible queries where table or column names vary. Its main risk is SQL injection if user input is concatenated directly. Always use parameterized queries or QUOTE_IDENT to sanitize identifiers.',
        tags: ['dynamic-sql', 'security', 'sql-injection'],
        keyTakeaway:
          'Dynamic SQL is flexible but demands strict parameterization to prevent injection attacks.',
      },
    ],
  },

  // ─── 3. Transactions & Concurrency (10 Qs) ───────────────────────────
  {
    id: 'sql-transactions',
    label: 'Transactions & Concurrency',
    icon: 'Lock',
    questions: [
      {
        id: 'sql-transactions-acid',
        title: 'What are the ACID properties?',
        difficulty: 'beginner',
        answer:
          'ACID stands for Atomicity (all or nothing), Consistency (valid state transitions), Isolation (concurrent transactions don\'t interfere), and Durability (committed data survives crashes). These properties guarantee reliable transaction processing in relational databases.',
        tags: ['acid', 'transactions', 'fundamentals'],
        keyTakeaway:
          'ACID properties ensure database transactions are reliable even during failures and concurrent access.',
      },
      {
        id: 'sql-transactions-isolation-levels',
        title: 'What are the four SQL isolation levels?',
        difficulty: 'intermediate',
        answer:
          'READ UNCOMMITTED allows dirty reads, READ COMMITTED prevents them, REPEATABLE READ also prevents non-repeatable reads, and SERIALIZABLE prevents phantom reads by fully isolating transactions. Higher isolation reduces anomalies but increases contention and potential for deadlocks.',
        tags: ['isolation-levels', 'concurrency', 'transactions'],
        keyTakeaway:
          'Choose the lowest isolation level that your application can tolerate to maximize concurrency.',
      },
      {
        id: 'sql-transactions-deadlocks',
        title: 'What is a deadlock and how do databases handle them?',
        difficulty: 'intermediate',
        answer:
          'A deadlock occurs when two or more transactions each hold a lock the other needs, creating a circular wait. Databases detect deadlocks with a wait-for graph and abort one transaction (the victim) so the others can proceed. Applications should retry the aborted transaction.',
        tags: ['deadlock', 'locking', 'concurrency'],
        keyTakeaway:
          'Design transactions to acquire locks in a consistent order to minimize deadlocks.',
      },
      {
        id: 'sql-transactions-optimistic-pessimistic',
        title: 'What is the difference between optimistic and pessimistic locking?',
        difficulty: 'intermediate',
        answer:
          'Pessimistic locking acquires locks upfront (SELECT FOR UPDATE) and blocks other transactions. Optimistic locking uses a version column or timestamp, allowing concurrent reads and detecting conflicts at commit time. Optimistic locking scales better under low contention.',
        tags: ['locking', 'optimistic', 'pessimistic'],
        keyTakeaway:
          'Use optimistic locking for read-heavy workloads and pessimistic locking when conflicts are frequent.',
      },
      {
        id: 'sql-transactions-savepoints',
        title: 'What are savepoints?',
        difficulty: 'intermediate',
        answer:
          'Savepoints mark intermediate points within a transaction so you can roll back to a specific point without aborting the entire transaction. They are useful for retrying a portion of a complex transaction or handling expected errors inside a larger unit of work.',
        tags: ['savepoints', 'transactions', 'rollback'],
        keyTakeaway:
          'Savepoints allow partial rollbacks within a transaction without losing all prior work.',
      },
      {
        id: 'sql-transactions-two-phase-commit',
        title: 'What is a two-phase commit (2PC)?',
        difficulty: 'advanced',
        answer:
          'Two-phase commit is a distributed protocol where a coordinator first asks all participants to prepare (vote yes/no), then issues a global commit or abort. It guarantees atomicity across multiple databases but adds latency and is a blocking protocol if the coordinator fails.',
        tags: ['2pc', 'distributed', 'transactions'],
        keyTakeaway:
          'Two-phase commit ensures cross-database atomicity at the cost of availability during coordinator failures.',
      },
      {
        id: 'sql-transactions-mvcc',
        title: 'What is MVCC (Multi-Version Concurrency Control)?',
        difficulty: 'advanced',
        answer:
          'MVCC keeps multiple versions of each row so readers see a consistent snapshot without blocking writers. PostgreSQL stores old row versions in the heap and reclaims them via VACUUM, while MySQL/InnoDB uses undo logs. MVCC enables high-concurrency reads without shared locks.',
        tags: ['mvcc', 'concurrency', 'snapshot'],
        keyTakeaway:
          'MVCC lets readers and writers operate simultaneously without blocking each other.',
      },
      {
        id: 'sql-transactions-phantom-reads',
        title: 'What are phantom reads?',
        difficulty: 'intermediate',
        answer:
          'A phantom read occurs when a transaction re-executes a range query and finds new rows that were inserted by another committed transaction. Phantom reads are prevented at the SERIALIZABLE isolation level, which uses predicate locks or serializable snapshot isolation.',
        tags: ['phantom-reads', 'isolation', 'anomalies'],
        keyTakeaway:
          'Phantom reads involve newly inserted rows appearing between two identical range queries in one transaction.',
      },
      {
        id: 'sql-transactions-write-skew',
        title: 'What is write skew?',
        difficulty: 'advanced',
        answer:
          'Write skew occurs when two concurrent transactions read overlapping data, make decisions based on what they read, and write to different rows, producing a state that violates a constraint neither transaction individually broke. Only SERIALIZABLE isolation prevents write skew.',
        tags: ['write-skew', 'anomaly', 'serializable'],
        keyTakeaway:
          'Write skew is a subtle concurrency bug that only SERIALIZABLE isolation can prevent.',
      },
      {
        id: 'sql-transactions-advisory-locks',
        title: 'What are advisory locks?',
        difficulty: 'advanced',
        answer:
          'Advisory locks are application-managed locks that the database tracks but does not enforce on any table or row. They are useful for coordinating external resources, preventing duplicate job processing, or implementing custom mutual-exclusion schemes across connections.',
        tags: ['advisory-locks', 'application-locking', 'coordination'],
        keyTakeaway:
          'Advisory locks provide database-coordinated mutual exclusion for application-level resources.',
      },
    ],
  },

  // ─── 4. Database Administration (8 Qs) ───────────────────────────────
  {
    id: 'sql-admin',
    label: 'Database Administration',
    icon: 'Settings',
    questions: [
      {
        id: 'sql-admin-backup-restore',
        title: 'What are the main approaches to database backup and restore?',
        difficulty: 'beginner',
        answer:
          'Logical backups (pg_dump, mysqldump) export SQL statements and are portable but slow for large databases. Physical backups copy data files directly and are faster to restore. Point-in-time recovery combines base backups with WAL/binlog replay for minimal data loss.',
        tags: ['backup', 'restore', 'disaster-recovery'],
        keyTakeaway:
          'Combine physical base backups with continuous WAL archiving for production-grade disaster recovery.',
      },
      {
        id: 'sql-admin-replication',
        title: 'What is the difference between synchronous and asynchronous replication?',
        difficulty: 'intermediate',
        answer:
          'Synchronous replication waits for the replica to confirm a write before committing, guaranteeing zero data loss but adding latency. Asynchronous replication commits locally first and streams changes later, offering better performance but risking data loss if the primary fails.',
        tags: ['replication', 'sync', 'async', 'high-availability'],
        keyTakeaway:
          'Synchronous replication trades write latency for zero data loss; async trades consistency for speed.',
      },
      {
        id: 'sql-admin-partitioning',
        title: 'What is table partitioning and what types exist?',
        difficulty: 'intermediate',
        answer:
          'Partitioning splits a large table into smaller physical segments based on a key. Range partitioning divides by value ranges (e.g., dates), list partitioning by discrete values (e.g., regions), and hash partitioning distributes evenly across buckets. It improves query pruning and maintenance.',
        tags: ['partitioning', 'range', 'list', 'hash'],
        keyTakeaway:
          'Partition large tables by your most common query filter to enable partition pruning.',
      },
      {
        id: 'sql-admin-vacuuming',
        title: 'Why is VACUUM important in PostgreSQL?',
        difficulty: 'intermediate',
        answer:
          'PostgreSQL\'s MVCC leaves dead tuples after updates and deletes. VACUUM reclaims that space and updates visibility maps and statistics. Without regular vacuuming, table bloat grows, index performance degrades, and transaction ID wraparound can halt the database.',
        tags: ['vacuum', 'postgresql', 'maintenance'],
        keyTakeaway:
          'Autovacuum must stay healthy to prevent bloat and the catastrophic transaction ID wraparound.',
      },
      {
        id: 'sql-admin-connection-pooling',
        title: 'Why is connection pooling important?',
        difficulty: 'beginner',
        answer:
          'Each database connection consumes memory and OS resources, so opening a new connection per request is expensive. Connection poolers like PgBouncer or HikariCP maintain a pool of reusable connections, reducing overhead and allowing many application threads to share fewer database connections.',
        tags: ['connection-pooling', 'pgbouncer', 'scalability'],
        keyTakeaway:
          'Connection pooling dramatically reduces the overhead of establishing and tearing down database connections.',
      },
      {
        id: 'sql-admin-slow-queries',
        title: 'How do you monitor and diagnose slow queries?',
        difficulty: 'intermediate',
        answer:
          'Enable slow query logging (log_min_duration_statement in PostgreSQL, slow_query_log in MySQL) to capture problematic queries. Use pg_stat_statements or Performance Schema to aggregate query stats, then run EXPLAIN ANALYZE on the worst offenders to find missing indexes or bad plans.',
        tags: ['monitoring', 'slow-queries', 'diagnostics'],
        keyTakeaway:
          'pg_stat_statements is the single most valuable extension for finding your slowest queries.',
      },
      {
        id: 'sql-admin-pg-stat-views',
        title: 'What useful information do pg_stat views provide?',
        difficulty: 'advanced',
        answer:
          'pg_stat_user_tables shows sequential vs index scans, dead tuples, and last vacuum time. pg_stat_activity reveals current running queries and wait events. pg_stat_bgwriter and pg_stat_wal track checkpoint and WAL performance for tuning I/O and replication.',
        tags: ['pg-stat', 'monitoring', 'postgresql'],
        keyTakeaway:
          'pg_stat views give real-time visibility into query patterns, table health, and I/O behavior.',
      },
      {
        id: 'sql-admin-maintenance',
        title: 'What routine maintenance tasks should a DBA perform?',
        difficulty: 'beginner',
        answer:
          'Regular tasks include running ANALYZE to update statistics, monitoring autovacuum health, verifying backups with test restores, reviewing slow query logs, checking replication lag, rotating logs, and applying security patches. Automating these tasks with cron or pg_cron reduces human error.',
        tags: ['maintenance', 'dba', 'best-practices'],
        keyTakeaway:
          'Automate routine maintenance and regularly test backup restores — untested backups are not backups.',
      },
    ],
  },

  // ─── 5. Database-Specific Features (8 Qs) ────────────────────────────
  {
    id: 'sql-specific',
    label: 'Database-Specific Features',
    icon: 'Layers',
    questions: [
      {
        id: 'sql-specific-pg-jsonb',
        title: 'What is PostgreSQL JSONB and how does it differ from JSON?',
        difficulty: 'intermediate',
        answer:
          'JSONB stores JSON in a decomposed binary format that is slightly slower to ingest but much faster to query. Unlike the JSON type which stores raw text, JSONB supports GIN indexing, containment operators (@>), and key-existence checks for efficient semi-structured queries.',
        tags: ['postgresql', 'jsonb', 'semi-structured'],
        keyTakeaway:
          'Always prefer JSONB over JSON in PostgreSQL unless you need to preserve exact formatting.',
      },
      {
        id: 'sql-specific-pg-arrays-extensions',
        title: 'What are PostgreSQL arrays and extensions?',
        difficulty: 'intermediate',
        answer:
          'PostgreSQL supports native array columns with operators like ANY, @>, and array_agg. Extensions like PostGIS (geospatial), pg_trgm (fuzzy search), and hstore (key-value) add specialized capabilities without leaving the database, installed via CREATE EXTENSION.',
        tags: ['postgresql', 'arrays', 'extensions'],
        keyTakeaway:
          'PostgreSQL extensions let you add specialized features like geospatial queries without external tools.',
      },
      {
        id: 'sql-specific-mysql-engines',
        title: 'What are MySQL storage engines and when do they matter?',
        difficulty: 'intermediate',
        answer:
          'MySQL\'s pluggable storage engine architecture lets each table use a different engine. InnoDB (default) provides ACID transactions, row-level locking, and crash recovery. MyISAM is legacy, faster for read-only loads but lacks transactions. MEMORY stores data in RAM for temporary tables.',
        tags: ['mysql', 'innodb', 'storage-engines'],
        keyTakeaway:
          'Always use InnoDB for MySQL unless you have a very specific reason not to.',
      },
      {
        id: 'sql-specific-mysql-autoincrement',
        title: 'How does MySQL AUTO_INCREMENT work and what are its gotchas?',
        difficulty: 'beginner',
        answer:
          'AUTO_INCREMENT generates a unique sequential integer for each new row. Gaps can appear from rollbacks, deletes, or bulk inserts. In InnoDB the counter is stored in memory and was lost on restart before MySQL 8.0, which persists it in the redo log.',
        tags: ['mysql', 'auto-increment', 'primary-key'],
        keyTakeaway:
          'AUTO_INCREMENT may produce gaps — never rely on it for gapless sequences.',
      },
      {
        id: 'sql-specific-sqlite',
        title: 'What makes SQLite unique among databases?',
        difficulty: 'beginner',
        answer:
          'SQLite is a serverless, zero-configuration, file-based database embedded directly into the application process. It uses dynamic type affinity rather than strict types and supports most SQL features. It is ideal for mobile apps, testing, and small-to-medium workloads.',
        tags: ['sqlite', 'embedded', 'serverless'],
        keyTakeaway:
          'SQLite is the most deployed database in the world, ideal for embedded and single-writer scenarios.',
      },
      {
        id: 'sql-specific-sqlserver-tsql',
        title: 'What are notable T-SQL features in SQL Server?',
        difficulty: 'intermediate',
        answer:
          'T-SQL extends standard SQL with TRY/CATCH error handling, MERGE for upserts, OUTPUT clause to return affected rows, window functions with ROWS/RANGE framing, and temporal tables for automatic row versioning. It also supports cross-database queries within the same server instance.',
        tags: ['sql-server', 't-sql', 'features'],
        keyTakeaway:
          'T-SQL\'s OUTPUT clause and temporal tables are standout features not universally available elsewhere.',
      },
      {
        id: 'sql-specific-oracle-plsql',
        title: 'What are key Oracle features like sequences and PL/SQL?',
        difficulty: 'intermediate',
        answer:
          'Oracle uses sequences as standalone objects for generating unique numbers, separate from tables. PL/SQL is a powerful procedural language tightly integrated with SQL, supporting packages, exception handling, and bulk operations (FORALL, BULK COLLECT) for high-performance data processing.',
        tags: ['oracle', 'plsql', 'sequences'],
        keyTakeaway:
          'Oracle\'s PL/SQL offers the richest server-side procedural language among major databases.',
      },
      {
        id: 'sql-specific-distributed-columnar',
        title: 'What are distributed SQL and column-store databases?',
        difficulty: 'advanced',
        answer:
          'Distributed SQL databases like CockroachDB and YugabyteDB spread data across nodes while maintaining SQL semantics and strong consistency. Column-store databases like ClickHouse and TimescaleDB store data by column rather than row, enabling extreme compression and fast analytical aggregations.',
        tags: ['distributed-sql', 'column-store', 'cockroachdb', 'timescaledb'],
        keyTakeaway:
          'Distributed SQL scales writes horizontally; column stores optimize analytical reads on large datasets.',
      },
    ],
  },
];

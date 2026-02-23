import type { InterviewTopic } from './types';

export const SQL_PART1_TOPICS: InterviewTopic[] = [
  // ─────────────────────────────────────────────
  // 1. SQL Basics (8 questions)
  // ─────────────────────────────────────────────
  {
    id: 'sql-basics',
    label: 'SQL Basics',
    icon: 'BookOpen',
    description:
      'Foundational SQL syntax including SELECT, filtering, sorting, and data types.',
    questions: [
      {
        id: 'sql-basics-select',
        title: 'What does SELECT do in SQL?',
        difficulty: 'beginner',
        answer:
          'SELECT retrieves data from one or more tables. You specify columns to return, or use * for all columns, and can filter with WHERE, sort with ORDER BY, and limit with LIMIT.',
        tags: ['sql', 'select', 'querying'],
        keyTakeaway: 'SELECT is the fundamental read operation in SQL.',
      },
      {
        id: 'sql-basics-where',
        title: 'How does the WHERE clause work?',
        difficulty: 'beginner',
        answer:
          'WHERE filters rows before they are returned by specifying a boolean condition. It supports comparison operators like =, <>, <, >, and logical operators AND, OR, and NOT to combine conditions.',
        tags: ['sql', 'where', 'filtering'],
        keyTakeaway:
          'WHERE filters rows based on conditions before any grouping or ordering occurs.',
      },
      {
        id: 'sql-basics-order-by',
        title: 'What does ORDER BY do and what are its options?',
        difficulty: 'beginner',
        answer:
          'ORDER BY sorts the result set by one or more columns in ascending (ASC, the default) or descending (DESC) order. You can sort by column name, alias, or ordinal position, and NULLs sort first or last depending on the database.',
        tags: ['sql', 'order-by', 'sorting'],
        keyTakeaway:
          'ORDER BY sorts results and defaults to ascending order.',
      },
      {
        id: 'sql-basics-limit',
        title: 'How do LIMIT and OFFSET work?',
        difficulty: 'beginner',
        answer:
          'LIMIT restricts the number of rows returned, while OFFSET skips a specified number of rows before starting to return results. Together they enable pagination, though large OFFSET values can be slow because the database still scans skipped rows.',
        tags: ['sql', 'limit', 'pagination'],
        keyTakeaway:
          'LIMIT caps returned rows and OFFSET skips rows for pagination.',
      },
      {
        id: 'sql-basics-distinct',
        title: 'What does DISTINCT do?',
        difficulty: 'beginner',
        answer:
          'DISTINCT eliminates duplicate rows from the result set based on the selected columns. It compares all specified columns together, so two rows must match on every selected column to be considered duplicates.',
        tags: ['sql', 'distinct', 'deduplication'],
        keyTakeaway:
          'DISTINCT removes duplicate rows by comparing all selected columns.',
      },
      {
        id: 'sql-basics-like',
        title: 'How does the LIKE operator work for pattern matching?',
        difficulty: 'beginner',
        answer:
          'LIKE performs pattern matching on string columns using % as a wildcard for any sequence of characters and _ for a single character. It is case-sensitive in most databases, though ILIKE in PostgreSQL provides case-insensitive matching.',
        tags: ['sql', 'like', 'pattern-matching'],
        keyTakeaway:
          'LIKE uses % for multi-character and _ for single-character wildcards.',
      },
      {
        id: 'sql-basics-null-handling',
        title: 'How does SQL handle NULL values?',
        difficulty: 'beginner',
        answer:
          'NULL represents an unknown or missing value, and any comparison with NULL yields NULL rather than true or false. You must use IS NULL or IS NOT NULL to check for NULLs, and functions like COALESCE return the first non-NULL argument.',
        tags: ['sql', 'null', 'coalesce'],
        keyTakeaway:
          'NULL is not equal to anything, including itself; use IS NULL to test for it.',
      },
      {
        id: 'sql-basics-data-types',
        title: 'What are the common SQL data types?',
        difficulty: 'beginner',
        answer:
          'Common SQL data types include INTEGER and BIGINT for whole numbers, DECIMAL/NUMERIC for exact precision, VARCHAR and TEXT for strings, DATE, TIMESTAMP, and BOOLEAN. Choosing the right type ensures data integrity and optimal storage.',
        tags: ['sql', 'data-types', 'schema'],
        keyTakeaway:
          'Choosing correct data types enforces data integrity and optimizes storage.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. Joins & Subqueries (12 questions)
  // ─────────────────────────────────────────────
  {
    id: 'sql-joins',
    label: 'Joins & Subqueries',
    icon: 'GitMerge',
    description:
      'Combining data from multiple tables with joins, subqueries, and set operations.',
    questions: [
      {
        id: 'sql-joins-inner-join',
        title: 'What is an INNER JOIN?',
        difficulty: 'beginner',
        answer:
          'INNER JOIN returns only rows that have matching values in both tables based on the join condition. If a row in either table has no match, it is excluded from the result set entirely.',
        tags: ['sql', 'inner-join', 'joins'],
        keyTakeaway:
          'INNER JOIN returns only rows with matches in both tables.',
      },
      {
        id: 'sql-joins-left-join',
        title: 'How does LEFT JOIN differ from INNER JOIN?',
        difficulty: 'beginner',
        answer:
          'LEFT JOIN returns all rows from the left table and matching rows from the right table. Where there is no match, the right-side columns are filled with NULLs, preserving every row from the left table.',
        tags: ['sql', 'left-join', 'outer-join'],
        keyTakeaway:
          'LEFT JOIN keeps all left-table rows, filling NULLs for unmatched right-side columns.',
      },
      {
        id: 'sql-joins-right-full-outer',
        title: 'What are RIGHT JOIN and FULL OUTER JOIN?',
        difficulty: 'intermediate',
        answer:
          'RIGHT JOIN keeps all rows from the right table with NULLs for unmatched left columns, which is the mirror of LEFT JOIN. FULL OUTER JOIN combines both, returning all rows from both tables and filling NULLs wherever a match is absent on either side.',
        tags: ['sql', 'right-join', 'full-outer-join'],
        keyTakeaway:
          'FULL OUTER JOIN preserves all rows from both tables, filling NULLs where no match exists.',
      },
      {
        id: 'sql-joins-cross-join',
        title: 'What is a CROSS JOIN?',
        difficulty: 'intermediate',
        answer:
          'CROSS JOIN produces the Cartesian product of two tables, pairing every row from the first table with every row from the second. If table A has M rows and table B has N rows, the result has M x N rows.',
        tags: ['sql', 'cross-join', 'cartesian-product'],
        keyTakeaway:
          'CROSS JOIN produces every possible combination of rows from two tables.',
      },
      {
        id: 'sql-joins-self-join',
        title: 'What is a self-join and when would you use one?',
        difficulty: 'intermediate',
        answer:
          'A self-join joins a table to itself using aliases to treat it as two separate tables. It is commonly used for hierarchical data like employee-manager relationships or finding pairs within the same table.',
        tags: ['sql', 'self-join', 'hierarchical-data'],
        keyTakeaway:
          'Self-joins compare rows within the same table using table aliases.',
      },
      {
        id: 'sql-joins-correlated-subquery',
        title: 'What is a correlated subquery?',
        difficulty: 'advanced',
        answer:
          'A correlated subquery references columns from the outer query and is re-executed for each row of the outer query. This makes it powerful for row-by-row comparisons but potentially slow, since it runs once per outer row.',
        tags: ['sql', 'correlated-subquery', 'performance'],
        keyTakeaway:
          'Correlated subqueries reference the outer query and execute once per outer row.',
      },
      {
        id: 'sql-joins-exists-vs-in',
        title: 'What is the difference between EXISTS and IN?',
        difficulty: 'intermediate',
        answer:
          'EXISTS returns true if the subquery produces any rows and short-circuits on the first match, making it efficient for large subquery results. IN checks if a value matches any value in a list or subquery result and can struggle with NULLs in the subquery.',
        tags: ['sql', 'exists', 'in', 'subqueries'],
        keyTakeaway:
          'EXISTS short-circuits on the first match while IN compares against the full result set.',
      },
      {
        id: 'sql-joins-derived-tables',
        title: 'What is a derived table?',
        difficulty: 'intermediate',
        answer:
          'A derived table is a subquery in the FROM clause that acts as a temporary inline table. It must be given an alias and is useful for breaking complex queries into logical steps without creating views or temporary tables.',
        tags: ['sql', 'derived-table', 'subquery'],
        keyTakeaway:
          'Derived tables are subqueries in the FROM clause that act as inline temporary tables.',
      },
      {
        id: 'sql-joins-union-vs-union-all',
        title: 'What is the difference between UNION and UNION ALL?',
        difficulty: 'intermediate',
        answer:
          'UNION combines results from two queries and removes duplicate rows, which requires an extra sort or hash step. UNION ALL concatenates all rows without deduplication and is faster, so prefer it when duplicates are acceptable or impossible.',
        tags: ['sql', 'union', 'set-operations'],
        keyTakeaway:
          'UNION removes duplicates while UNION ALL keeps all rows and is faster.',
      },
      {
        id: 'sql-joins-intersect-except',
        title: 'What do INTERSECT and EXCEPT do?',
        difficulty: 'intermediate',
        answer:
          'INTERSECT returns only rows that appear in both query results, like a set intersection. EXCEPT returns rows from the first query that do not appear in the second, effectively performing a set difference.',
        tags: ['sql', 'intersect', 'except', 'set-operations'],
        keyTakeaway:
          'INTERSECT finds common rows between queries; EXCEPT finds rows only in the first query.',
      },
      {
        id: 'sql-joins-lateral-join',
        title: 'What is a lateral join?',
        difficulty: 'advanced',
        answer:
          'A lateral join allows a subquery in the FROM clause to reference columns from preceding tables in the same FROM clause. It is essentially a correlated subquery that can return multiple columns and rows, supported via LATERAL in PostgreSQL or CROSS APPLY in SQL Server.',
        tags: ['sql', 'lateral-join', 'cross-apply'],
        keyTakeaway:
          'Lateral joins let FROM-clause subqueries reference columns from earlier tables.',
      },
      {
        id: 'sql-joins-anti-join',
        title: 'What is an anti-join pattern?',
        difficulty: 'advanced',
        answer:
          'An anti-join returns rows from one table that have no matching rows in another table. It is typically implemented using LEFT JOIN with a WHERE right_table.id IS NULL, or using NOT EXISTS with a correlated subquery.',
        tags: ['sql', 'anti-join', 'not-exists'],
        keyTakeaway:
          'Anti-joins find rows with no match, commonly done via LEFT JOIN ... WHERE id IS NULL.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Aggregation & Window Functions (12 questions)
  // ─────────────────────────────────────────────
  {
    id: 'sql-aggregation',
    label: 'Aggregation & Window Functions',
    icon: 'BarChart3',
    description:
      'Grouping, summarizing data with aggregate functions, and advanced analytics with window functions.',
    questions: [
      {
        id: 'sql-aggregation-group-by',
        title: 'How does GROUP BY work?',
        difficulty: 'beginner',
        answer:
          'GROUP BY collapses rows with the same values in specified columns into a single summary row. Every column in SELECT must either appear in the GROUP BY clause or be wrapped in an aggregate function like COUNT, SUM, or AVG.',
        tags: ['sql', 'group-by', 'aggregation'],
        keyTakeaway:
          'GROUP BY groups rows so aggregate functions can summarize each group.',
      },
      {
        id: 'sql-aggregation-having',
        title: 'What is the difference between WHERE and HAVING?',
        difficulty: 'beginner',
        answer:
          'WHERE filters individual rows before grouping occurs, while HAVING filters groups after GROUP BY and aggregation. You use HAVING to apply conditions on aggregate results like HAVING COUNT(*) > 5.',
        tags: ['sql', 'having', 'where', 'filtering'],
        keyTakeaway:
          'WHERE filters rows before grouping; HAVING filters groups after aggregation.',
      },
      {
        id: 'sql-aggregation-count-sum-avg',
        title: 'How do COUNT, SUM, AVG, MIN, and MAX work?',
        difficulty: 'beginner',
        answer:
          'COUNT returns the number of rows or non-NULL values, SUM and AVG compute the total and mean of numeric columns, and MIN and MAX return the smallest and largest values. All ignore NULLs except COUNT(*), which counts all rows including NULLs.',
        tags: ['sql', 'aggregate-functions', 'count', 'sum'],
        keyTakeaway:
          'Aggregate functions summarize groups of rows and ignore NULLs except COUNT(*).',
      },
      {
        id: 'sql-aggregation-row-number',
        title: 'What does ROW_NUMBER() do?',
        difficulty: 'intermediate',
        answer:
          'ROW_NUMBER() assigns a unique sequential integer to each row within a partition, ordered by a specified column. Unlike RANK, it never produces ties or gaps; every row gets a distinct number even if values are identical.',
        tags: ['sql', 'row-number', 'window-function'],
        keyTakeaway:
          'ROW_NUMBER() assigns unique sequential numbers with no ties or gaps.',
      },
      {
        id: 'sql-aggregation-rank-dense-rank',
        title: 'What is the difference between RANK() and DENSE_RANK()?',
        difficulty: 'intermediate',
        answer:
          'RANK() assigns the same rank to tied rows but leaves gaps after ties, so ranks might go 1, 2, 2, 4. DENSE_RANK() also gives tied rows the same rank but does not leave gaps, producing 1, 2, 2, 3 instead.',
        tags: ['sql', 'rank', 'dense-rank', 'window-function'],
        keyTakeaway:
          'RANK() leaves gaps after ties while DENSE_RANK() does not.',
      },
      {
        id: 'sql-aggregation-ntile',
        title: 'What does NTILE() do?',
        difficulty: 'intermediate',
        answer:
          'NTILE(n) divides the ordered result set within a partition into n roughly equal buckets and assigns a bucket number from 1 to n. If rows do not divide evenly, earlier buckets get one extra row each.',
        tags: ['sql', 'ntile', 'window-function', 'bucketing'],
        keyTakeaway:
          'NTILE(n) distributes rows into n equal-sized buckets within each partition.',
      },
      {
        id: 'sql-aggregation-lag-lead',
        title: 'How do LAG() and LEAD() work?',
        difficulty: 'intermediate',
        answer:
          'LAG() accesses a value from a previous row and LEAD() accesses a value from a subsequent row within the same partition, based on the ORDER BY. They accept an optional offset (default 1) and a default value for when no row exists at that offset.',
        tags: ['sql', 'lag', 'lead', 'window-function'],
        keyTakeaway:
          'LAG looks at previous rows and LEAD looks at following rows within a partition.',
      },
      {
        id: 'sql-aggregation-first-last-value',
        title: 'What do FIRST_VALUE() and LAST_VALUE() return?',
        difficulty: 'advanced',
        answer:
          'FIRST_VALUE() returns the value from the first row in the window frame and LAST_VALUE() returns the value from the last row. LAST_VALUE() often requires an explicit frame clause like ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING to see the entire partition.',
        tags: ['sql', 'first-value', 'last-value', 'window-function'],
        keyTakeaway:
          'LAST_VALUE needs an explicit frame clause to see the entire partition.',
      },
      {
        id: 'sql-aggregation-running-totals',
        title: 'How do you compute a running total in SQL?',
        difficulty: 'intermediate',
        answer:
          'A running total uses SUM() as a window function with an ORDER BY clause, such as SUM(amount) OVER (ORDER BY date). The default frame accumulates from the first row to the current row, producing a cumulative sum.',
        tags: ['sql', 'running-total', 'cumulative-sum', 'window-function'],
        keyTakeaway:
          'SUM() OVER (ORDER BY ...) computes a cumulative running total by default.',
      },
      {
        id: 'sql-aggregation-partition-by',
        title: 'What does PARTITION BY do in a window function?',
        difficulty: 'intermediate',
        answer:
          'PARTITION BY divides the result set into independent groups for the window function to operate on separately. It is similar to GROUP BY but does not collapse rows; each row retains its identity while accessing partition-level calculations.',
        tags: ['sql', 'partition-by', 'window-function'],
        keyTakeaway:
          'PARTITION BY creates independent groups for window functions without collapsing rows.',
      },
      {
        id: 'sql-aggregation-frame-clauses',
        title: 'What are window frame clauses?',
        difficulty: 'advanced',
        answer:
          'Frame clauses define which rows relative to the current row are included in the window calculation. They use ROWS or RANGE with bounds like UNBOUNDED PRECEDING, CURRENT ROW, and N FOLLOWING to create sliding windows for moving averages or running totals.',
        tags: ['sql', 'frame-clause', 'window-function', 'rows-range'],
        keyTakeaway:
          'Frame clauses control the sliding window of rows used by window functions.',
      },
      {
        id: 'sql-aggregation-moving-average',
        title: 'How do you calculate a moving average?',
        difficulty: 'advanced',
        answer:
          'A moving average uses AVG() as a window function with a frame clause that defines the window size, such as AVG(value) OVER (ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) for a 3-row moving average. The frame slides forward with each row.',
        tags: ['sql', 'moving-average', 'frame-clause', 'analytics'],
        keyTakeaway:
          'Moving averages combine AVG() with a ROWS BETWEEN frame clause to create sliding windows.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Data Manipulation - DML (8 questions)
  // ─────────────────────────────────────────────
  {
    id: 'sql-dml',
    label: 'Data Manipulation (DML)',
    icon: 'Pencil',
    description:
      'Inserting, updating, deleting, and merging data in SQL tables.',
    questions: [
      {
        id: 'sql-dml-insert',
        title: 'How does the INSERT statement work?',
        difficulty: 'beginner',
        answer:
          'INSERT adds one or more new rows to a table by specifying the target columns and corresponding values. You can insert a single row with VALUES, multiple rows with comma-separated value lists, or use INSERT...SELECT to insert from a query result.',
        tags: ['sql', 'insert', 'dml'],
        keyTakeaway:
          'INSERT adds rows to a table using VALUES for literals or SELECT for query results.',
      },
      {
        id: 'sql-dml-update',
        title: 'How does the UPDATE statement work?',
        difficulty: 'beginner',
        answer:
          'UPDATE modifies existing rows in a table by setting columns to new values, usually with a WHERE clause to target specific rows. Without a WHERE clause, UPDATE changes every row in the table, which is a common and dangerous mistake.',
        tags: ['sql', 'update', 'dml'],
        keyTakeaway:
          'Always use WHERE with UPDATE to avoid accidentally modifying every row.',
      },
      {
        id: 'sql-dml-delete',
        title: 'How does the DELETE statement work?',
        difficulty: 'beginner',
        answer:
          'DELETE removes rows from a table that match the WHERE condition. Like UPDATE, omitting WHERE deletes all rows, and DELETE is logged row by row, making it slower than TRUNCATE for removing all data.',
        tags: ['sql', 'delete', 'dml'],
        keyTakeaway:
          'DELETE removes rows matching a condition and is logged per row for rollback support.',
      },
      {
        id: 'sql-dml-merge-upsert',
        title: 'What is MERGE (UPSERT) and when do you use it?',
        difficulty: 'intermediate',
        answer:
          'MERGE combines INSERT and UPDATE in a single atomic statement, inserting rows that do not exist and updating those that do. PostgreSQL uses INSERT...ON CONFLICT, MySQL uses INSERT...ON DUPLICATE KEY UPDATE, and standard SQL uses the MERGE statement.',
        tags: ['sql', 'merge', 'upsert', 'dml'],
        keyTakeaway:
          'UPSERT atomically inserts or updates depending on whether the row already exists.',
      },
      {
        id: 'sql-dml-insert-select',
        title: 'How does INSERT...SELECT work?',
        difficulty: 'intermediate',
        answer:
          'INSERT...SELECT inserts rows into a target table using the result of a SELECT query as the data source. The selected columns must match the target columns in number and compatible types, making it ideal for data migration and table copying.',
        tags: ['sql', 'insert-select', 'data-migration'],
        keyTakeaway:
          'INSERT...SELECT populates a table from query results, useful for data migration.',
      },
      {
        id: 'sql-dml-returning',
        title: 'What does the RETURNING clause do?',
        difficulty: 'intermediate',
        answer:
          'RETURNING appends output to INSERT, UPDATE, or DELETE statements, returning the affected rows or specific columns without a separate SELECT. It is supported in PostgreSQL and Oracle but not in MySQL, where you use LAST_INSERT_ID() instead.',
        tags: ['sql', 'returning', 'postgresql'],
        keyTakeaway:
          'RETURNING lets you retrieve affected rows directly from DML statements without a separate query.',
      },
      {
        id: 'sql-dml-bulk-operations',
        title: 'What are best practices for bulk DML operations?',
        difficulty: 'advanced',
        answer:
          'Bulk operations should batch inserts into multi-row VALUES statements, disable indexes during large loads, and wrap batches in explicit transactions. Using COPY (PostgreSQL) or LOAD DATA (MySQL) is significantly faster than row-by-row inserts for large datasets.',
        tags: ['sql', 'bulk-operations', 'performance'],
        keyTakeaway:
          'Bulk loading tools like COPY are orders of magnitude faster than individual INSERT statements.',
      },
      {
        id: 'sql-dml-truncate-vs-delete',
        title: 'What is the difference between TRUNCATE and DELETE?',
        difficulty: 'intermediate',
        answer:
          'TRUNCATE removes all rows from a table instantly by deallocating data pages, while DELETE removes rows one by one and logs each removal. TRUNCATE resets auto-increment counters, cannot have a WHERE clause, and is typically not rollback-safe in MySQL.',
        tags: ['sql', 'truncate', 'delete', 'performance'],
        keyTakeaway:
          'TRUNCATE is faster for removing all rows but cannot filter and may not be rollback-safe.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. Schema Design (10 questions)
  // ─────────────────────────────────────────────
  {
    id: 'sql-schema',
    label: 'Schema Design',
    icon: 'Database',
    description:
      'Designing tables, relationships, constraints, and normalization for relational databases.',
    questions: [
      {
        id: 'sql-schema-normalization-1nf',
        title: 'What is First Normal Form (1NF)?',
        difficulty: 'beginner',
        answer:
          'A table is in 1NF when every column contains only atomic values with no repeating groups or arrays. Each cell must hold a single value, and each row must be uniquely identifiable, typically through a primary key.',
        tags: ['sql', 'normalization', '1nf', 'schema-design'],
        keyTakeaway:
          '1NF requires atomic column values and no repeating groups.',
      },
      {
        id: 'sql-schema-normalization-2nf-3nf',
        title: 'What are 2NF and 3NF?',
        difficulty: 'intermediate',
        answer:
          '2NF requires 1NF plus every non-key column must depend on the entire primary key, not just part of a composite key. 3NF additionally requires that non-key columns depend only on the primary key and not on other non-key columns, eliminating transitive dependencies.',
        tags: ['sql', 'normalization', '2nf', '3nf'],
        keyTakeaway:
          '2NF eliminates partial dependencies; 3NF eliminates transitive dependencies.',
      },
      {
        id: 'sql-schema-bcnf',
        title: 'What is Boyce-Codd Normal Form (BCNF)?',
        difficulty: 'advanced',
        answer:
          'BCNF is a stricter version of 3NF where every determinant must be a candidate key. A table can be in 3NF but not BCNF when a non-candidate-key column determines part of a candidate key, which is rare but occurs with overlapping composite keys.',
        tags: ['sql', 'bcnf', 'normalization', 'schema-design'],
        keyTakeaway:
          'BCNF requires every determinant to be a candidate key, stricter than 3NF.',
      },
      {
        id: 'sql-schema-denormalization',
        title: 'When and why would you denormalize a schema?',
        difficulty: 'intermediate',
        answer:
          'Denormalization intentionally introduces redundancy to reduce expensive joins and improve read performance for specific query patterns. Common examples include adding a cached total column, storing computed aggregates, or duplicating a frequently accessed column to avoid a join.',
        tags: ['sql', 'denormalization', 'performance', 'schema-design'],
        keyTakeaway:
          'Denormalization trades write complexity for read performance by adding controlled redundancy.',
      },
      {
        id: 'sql-schema-primary-foreign-keys',
        title: 'What are primary keys and foreign keys?',
        difficulty: 'beginner',
        answer:
          'A primary key uniquely identifies each row in a table and cannot contain NULLs. A foreign key is a column that references the primary key of another table, enforcing referential integrity so that child rows always point to valid parent rows.',
        tags: ['sql', 'primary-key', 'foreign-key', 'constraints'],
        keyTakeaway:
          'Primary keys uniquely identify rows; foreign keys enforce relationships between tables.',
      },
      {
        id: 'sql-schema-constraints',
        title: 'What are UNIQUE, CHECK, and DEFAULT constraints?',
        difficulty: 'intermediate',
        answer:
          'UNIQUE ensures no two rows share the same value in a column, CHECK validates that values satisfy a boolean expression, and DEFAULT provides a value when none is specified during insert. These constraints enforce data integrity at the database level.',
        tags: ['sql', 'constraints', 'unique', 'check'],
        keyTakeaway:
          'Constraints enforce data rules at the database level, preventing invalid data from being stored.',
      },
      {
        id: 'sql-schema-data-type-choices',
        title: 'How do you choose the right data types for columns?',
        difficulty: 'intermediate',
        answer:
          'Choose the smallest type that fits your data: use INTEGER over BIGINT when values fit, DECIMAL for money instead of FLOAT to avoid rounding errors, and VARCHAR(n) with a sensible limit over unbounded TEXT. Proper types improve storage efficiency, query performance, and data validation.',
        tags: ['sql', 'data-types', 'performance', 'schema-design'],
        keyTakeaway:
          'Use the smallest appropriate type and prefer DECIMAL over FLOAT for exact precision.',
      },
      {
        id: 'sql-schema-enums',
        title: 'When should you use ENUMs versus lookup tables?',
        difficulty: 'intermediate',
        answer:
          'ENUMs are convenient for small, rarely changing value sets like status or role, but modifying them requires DDL changes. Lookup tables with foreign keys are more flexible for frequently changing or user-defined values and support metadata like descriptions.',
        tags: ['sql', 'enum', 'lookup-table', 'schema-design'],
        keyTakeaway:
          'Use ENUMs for stable small sets and lookup tables for values that change frequently.',
      },
      {
        id: 'sql-schema-composite-keys',
        title: 'What are composite keys and when do you use them?',
        difficulty: 'intermediate',
        answer:
          'A composite key uses two or more columns together as the primary key to uniquely identify a row. They are common in junction tables for many-to-many relationships and when no single column naturally provides uniqueness.',
        tags: ['sql', 'composite-key', 'primary-key', 'schema-design'],
        keyTakeaway:
          'Composite keys combine multiple columns for uniqueness, especially in junction tables.',
      },
      {
        id: 'sql-schema-relationships-junction',
        title:
          'How do you model one-to-many and many-to-many relationships?',
        difficulty: 'intermediate',
        answer:
          'One-to-many is modeled by adding a foreign key on the "many" side pointing to the "one" table. Many-to-many requires a junction table with two foreign keys, one to each related table, and the combination of both keys typically forms the composite primary key.',
        tags: ['sql', 'relationships', 'junction-table', 'many-to-many'],
        keyTakeaway:
          'Many-to-many relationships require a junction table with foreign keys to both related tables.',
      },
    ],
  },
];

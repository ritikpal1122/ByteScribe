import type { InterviewTopic } from './types';

export const SDET_PART1_TOPICS: InterviewTopic[] = [
  // ─── 1. Testing Strategy (8 Qs) ───
  {
    id: 'sdet-strategy',
    icon: 'Target',
    label: 'Testing Strategy',
    description:
      'Core testing methodologies, planning approaches, and quality assurance strategies every SDET must master.',
    questions: [
      {
        id: 'sdet-strategy-pyramid',
        title: 'What is the test pyramid and why does it matter?',
        difficulty: 'beginner',
        answer:
          'The test pyramid is a model with many unit tests at the base, fewer integration tests in the middle, and the fewest end-to-end tests at the top. It matters because unit tests are fast and cheap while E2E tests are slow and brittle, so allocating effort according to the pyramid maximizes confidence per dollar spent. A typical healthy ratio is roughly 70% unit, 20% integration, and 10% E2E.',
        tags: ['test-pyramid', 'unit-testing', 'testing-strategy'],
        keyTakeaway:
          'Favor many fast unit tests over few slow E2E tests to keep feedback loops short.',
      },
      {
        id: 'sdet-strategy-shift-left',
        title: 'What is shift-left testing?',
        difficulty: 'intermediate',
        answer:
          'Shift-left testing means moving testing activities earlier in the software development lifecycle, ideally into requirements and design phases. It catches defects when they are cheapest to fix and encourages developers to write testable code from the start. Practices include TDD, static analysis, and peer code review with test coverage checks.',
        tags: ['shift-left', 'sdlc', 'early-testing'],
        keyTakeaway:
          'The earlier a defect is found, the cheaper it is to fix.',
      },
      {
        id: 'sdet-strategy-risk-based',
        title: 'How does risk-based testing prioritize effort?',
        difficulty: 'intermediate',
        answer:
          'Risk-based testing ranks features by their likelihood of failure multiplied by business impact, then allocates the most testing effort to the highest-risk areas. It ensures critical paths receive thorough coverage even when time is limited. A risk matrix or heatmap is typically maintained and updated each sprint.',
        tags: ['risk-based', 'prioritization', 'test-planning'],
        keyTakeaway:
          'Test the riskiest, highest-impact areas first to maximize defect prevention ROI.',
      },
      {
        id: 'sdet-strategy-test-plan',
        title: 'What are the key elements of a test plan?',
        difficulty: 'beginner',
        answer:
          'A test plan defines scope, objectives, test strategy, entry/exit criteria, resource allocation, schedule, and risk mitigation. It serves as the single source of truth so every stakeholder knows what will be tested, how, and when. Good plans are living documents updated as requirements evolve.',
        tags: ['test-plan', 'documentation', 'planning'],
        keyTakeaway:
          'A test plan aligns the team on scope, approach, and exit criteria before testing begins.',
      },
      {
        id: 'sdet-strategy-metrics',
        title: 'Which test metrics should an SDET track?',
        difficulty: 'intermediate',
        answer:
          'Key metrics include defect detection rate, test pass/fail ratio, code coverage percentage, mean time to detect, and escaped defect count. These metrics help teams measure testing effectiveness and identify process gaps. Tracking trends over sprints matters more than any single snapshot value.',
        tags: ['metrics', 'kpi', 'quality-assurance'],
        keyTakeaway:
          'Track defect detection rate and escaped defects to gauge testing effectiveness over time.',
      },
      {
        id: 'sdet-strategy-regression',
        title: 'What is regression testing and when should it run?',
        difficulty: 'beginner',
        answer:
          'Regression testing re-executes existing tests after code changes to verify that previously working functionality is not broken. It should run on every pull request via CI and as a full suite before each release. Automating the regression suite is essential because manual re-runs do not scale.',
        tags: ['regression', 'ci', 'automation'],
        keyTakeaway:
          'Automate regression tests and run them on every code change to catch unintended side effects.',
      },
      {
        id: 'sdet-strategy-smoke-sanity',
        title: 'What is the difference between smoke and sanity testing?',
        difficulty: 'beginner',
        answer:
          'Smoke testing is a broad, shallow check that major features work after a new build, while sanity testing is a narrow, deep check of a specific bug fix or feature change. Smoke tests are run first to decide if a build is stable enough for further testing. Sanity tests are run later to confirm targeted fixes without re-testing everything.',
        tags: ['smoke-testing', 'sanity-testing', 'build-verification'],
        keyTakeaway:
          'Smoke tests verify the build is testable; sanity tests verify a specific fix is correct.',
      },
      {
        id: 'sdet-strategy-exploratory',
        title: 'How does exploratory testing complement automated testing?',
        difficulty: 'advanced',
        answer:
          'Exploratory testing relies on human creativity and domain knowledge to discover defects that scripted tests miss, such as usability issues, edge cases, and unexpected workflows. It is session-based, time-boxed, and guided by charters rather than predefined steps. Combining it with automation gives both breadth from scripts and depth from human intuition.',
        tags: ['exploratory', 'manual-testing', 'session-based', 'usability'],
        keyTakeaway:
          'Exploratory testing uncovers defects that scripted automation cannot anticipate.',
      },
    ],
  },

  // ─── 2. Test Automation (10 Qs) ───
  {
    id: 'sdet-automation',
    icon: 'Bot',
    label: 'Test Automation',
    description:
      'Frameworks, patterns, and best practices for building maintainable, reliable automated test suites.',
    questions: [
      {
        id: 'sdet-automation-pom',
        title: 'What is the Page Object Model and why use it?',
        difficulty: 'beginner',
        answer:
          'The Page Object Model encapsulates each web page or component as a class whose methods represent user actions and whose properties expose element locators. It eliminates duplicated selectors across tests and confines UI changes to a single class. This separation of concerns makes tests more readable and dramatically reduces maintenance cost.',
        tags: ['page-object-model', 'design-pattern', 'maintainability'],
        keyTakeaway:
          'POM centralizes locators and actions per page so UI changes only require one-place updates.',
      },
      {
        id: 'sdet-automation-selenium',
        title: 'How does Selenium WebDriver interact with browsers?',
        difficulty: 'beginner',
        answer:
          'Selenium WebDriver sends commands over the W3C WebDriver protocol to a browser-specific driver binary which translates them into native browser actions. The client library serializes calls as HTTP requests to the driver server, making it language-agnostic. This architecture supports Chrome, Firefox, Edge, and Safari through their respective drivers.',
        tags: ['selenium', 'webdriver', 'browser-automation'],
        keyTakeaway:
          'WebDriver uses a client-server protocol so tests written in any language can control any supported browser.',
      },
      {
        id: 'sdet-automation-playwright',
        title: 'What advantages does Playwright offer over Selenium?',
        difficulty: 'intermediate',
        answer:
          'Playwright communicates with browsers via the DevTools protocol instead of WebDriver, giving it built-in auto-waiting, network interception, and multi-browser support in a single install. It offers reliable selectors, native mobile emulation, and trace-viewer debugging out of the box. These features result in less flaky tests and faster setup compared to traditional Selenium setups.',
        tags: ['playwright', 'devtools-protocol', 'modern-automation'],
        keyTakeaway:
          'Playwright reduces flakiness with auto-waiting and provides richer debugging than WebDriver-based tools.',
      },
      {
        id: 'sdet-automation-framework-selection',
        title: 'How do you choose the right test automation framework?',
        difficulty: 'intermediate',
        answer:
          'Evaluate frameworks by language ecosystem fit, community support, reporting capabilities, CI integration ease, and team skill set. Consider whether the project needs UI, API, or both types of testing and whether the framework supports parallel execution natively. A proof-of-concept on a real user flow is the best way to validate the choice before committing.',
        tags: ['framework-selection', 'evaluation', 'tooling'],
        keyTakeaway:
          'Pick a framework that matches your team skills, tech stack, and CI requirements after a quick proof-of-concept.',
      },
      {
        id: 'sdet-automation-parallel',
        title: 'How does parallel test execution improve feedback time?',
        difficulty: 'intermediate',
        answer:
          'Parallel execution distributes tests across multiple threads, processes, or machines so the total wall-clock time approaches total-time divided by worker count. It requires tests to be independent with no shared mutable state, which enforces good test design. Tools like pytest-xdist, TestNG, and Playwright natively support sharding across workers.',
        tags: ['parallel-execution', 'speed', 'scalability'],
        keyTakeaway:
          'Parallelism slashes suite run time but demands fully isolated, stateless tests.',
      },
      {
        id: 'sdet-automation-cross-browser',
        title: 'What is the best approach to cross-browser testing?',
        difficulty: 'intermediate',
        answer:
          'Run the full suite on the primary browser in CI and a smaller critical-path subset on secondary browsers to balance coverage against execution time. Cloud grids like BrowserStack or Sauce Labs provide on-demand browser and OS combinations without maintaining local infrastructure. Prioritize browsers by your analytics data rather than testing every possible combination.',
        tags: ['cross-browser', 'browser-grid', 'compatibility'],
        keyTakeaway:
          'Use analytics to pick target browsers and run secondary browsers on a cloud grid for efficiency.',
      },
      {
        id: 'sdet-automation-visual-regression',
        title: 'How does visual regression testing work?',
        difficulty: 'advanced',
        answer:
          'Visual regression testing captures screenshots of UI components or pages and compares them pixel-by-pixel or perceptually against approved baselines. Any difference beyond a configurable threshold is flagged as a failure requiring human review. Tools like Percy, Applitools Eyes, and Playwright screenshot assertions automate this comparison inside CI pipelines.',
        tags: ['visual-regression', 'screenshot', 'ui-testing', 'percy'],
        keyTakeaway:
          'Screenshot diffing catches unintended visual changes that functional assertions miss.',
      },
      {
        id: 'sdet-automation-test-data',
        title: 'How should test data be managed in automation?',
        difficulty: 'advanced',
        answer:
          'Tests should create their own data via API or factory methods at setup and tear it down after execution so they remain independent and repeatable. Shared static datasets lead to flaky failures when tests mutate overlapping records. For complex domains, use libraries like Faker or FactoryBot to generate realistic yet isolated data on the fly.',
        tags: ['test-data', 'fixtures', 'data-management'],
        keyTakeaway:
          'Each test should own its data lifecycle to guarantee isolation and repeatability.',
      },
      {
        id: 'sdet-automation-ci-integration',
        title: 'How do you integrate automated tests into CI?',
        difficulty: 'intermediate',
        answer:
          'Add a test stage in the CI pipeline that installs dependencies, starts required services, runs the suite, and publishes results as artifacts. Gate merges on test passage so broken code never reaches the main branch. Use caching for dependencies and Docker services for databases to keep pipeline spin-up time under a minute.',
        tags: ['ci-integration', 'pipeline', 'gating'],
        keyTakeaway:
          'Gate merges on passing tests and cache dependencies to keep CI feedback fast.',
      },
      {
        id: 'sdet-automation-flaky-tests',
        title: 'How do you identify and fix flaky tests?',
        difficulty: 'advanced',
        answer:
          'Flaky tests pass and fail without code changes, usually caused by race conditions, shared state, or environment instability. Quarantine them with a retry-and-tag mechanism so they do not block the pipeline while you investigate root causes. Fixes typically involve adding proper waits, isolating test data, or replacing non-deterministic dependencies with mocks.',
        tags: ['flaky-tests', 'reliability', 'quarantine', 'debugging'],
        keyTakeaway:
          'Quarantine flaky tests immediately and fix root causes like race conditions and shared state.',
      },
    ],
  },

  // ─── 3. API Testing (8 Qs) ───
  {
    id: 'sdet-api',
    icon: 'Globe',
    label: 'API Testing',
    description:
      'Techniques for validating REST, GraphQL, and contract-driven APIs at speed and scale.',
    questions: [
      {
        id: 'sdet-api-rest',
        title: 'What are the key areas to validate in REST API testing?',
        difficulty: 'beginner',
        answer:
          'Validate status codes, response body structure, data types, error messages, headers, and response times for every endpoint. Cover positive paths, negative inputs, boundary values, and authentication scenarios. Automating these checks in a framework like RestAssured or Supertest catches regressions faster than manual Postman runs.',
        tags: ['rest-api', 'validation', 'http-status'],
        keyTakeaway:
          'Test status codes, body schema, error handling, and auth for every REST endpoint.',
      },
      {
        id: 'sdet-api-graphql',
        title: 'How does testing a GraphQL API differ from REST?',
        difficulty: 'intermediate',
        answer:
          'GraphQL uses a single endpoint with flexible queries, so tests must cover various query shapes, nested resolvers, and variable combinations instead of fixed URL paths. Errors return 200 with an errors array rather than HTTP status codes, requiring assertion logic on the response body. Schema introspection can be used to auto-generate test cases for all types and fields.',
        tags: ['graphql', 'query-testing', 'schema-introspection'],
        keyTakeaway:
          'GraphQL tests must validate query shapes and error arrays since all responses return 200.',
      },
      {
        id: 'sdet-api-postman-newman',
        title: 'How do Postman and Newman fit into API test automation?',
        difficulty: 'beginner',
        answer:
          'Postman provides a GUI for designing, running, and sharing API test collections with built-in assertion scripts. Newman is its CLI runner that executes those same collections in CI pipelines, producing JUnit or HTML reports. Together they bridge manual exploration and automated regression in one workflow.',
        tags: ['postman', 'newman', 'cli-runner'],
        keyTakeaway:
          'Postman designs tests interactively and Newman runs them headlessly in CI.',
      },
      {
        id: 'sdet-api-contract-testing',
        title: 'What is contract testing and how does Pact work?',
        difficulty: 'advanced',
        answer:
          'Contract testing verifies that a consumer and provider agree on the API shape without requiring both to run simultaneously. Pact lets the consumer define expected interactions as a contract file, which the provider verifies independently against its implementation. This decouples team deployments and catches integration mismatches at build time rather than in staging.',
        tags: ['contract-testing', 'pact', 'consumer-driven'],
        keyTakeaway:
          'Pact lets teams verify API contracts independently so integration issues surface at build time.',
      },
      {
        id: 'sdet-api-schema-validation',
        title: 'Why is schema validation important for API tests?',
        difficulty: 'intermediate',
        answer:
          'Schema validation ensures every response conforms to its OpenAPI or JSON Schema definition, catching missing fields, wrong types, and unexpected properties automatically. It acts as a safety net beyond hand-written assertions and can be run against live responses or generated mocks. Libraries like Ajv or joi make schema checks a single function call in tests.',
        tags: ['schema-validation', 'openapi', 'json-schema'],
        keyTakeaway:
          'Automated schema checks catch structural regressions that hand-written assertions may miss.',
      },
      {
        id: 'sdet-api-auth-testing',
        title: 'How do you test authentication and authorization in APIs?',
        difficulty: 'intermediate',
        answer:
          'Test that unauthenticated requests return 401, unauthorized role requests return 403, valid tokens grant access, and expired or malformed tokens are rejected. Cover token refresh flows, OAuth scopes, and rate limits on login endpoints. Always test both positive access and negative denial to ensure the security boundary is tight.',
        tags: ['authentication', 'authorization', 'security-testing'],
        keyTakeaway:
          'Always verify both permitted and denied access paths to confirm the auth boundary is enforced.',
      },
      {
        id: 'sdet-api-load-testing',
        title: 'How do you load test an API?',
        difficulty: 'advanced',
        answer:
          'Define realistic user scenarios with expected request rates, ramp them up using tools like k6, Locust, or Artillery, and measure latency percentiles, throughput, and error rates under load. Run load tests against a production-like environment with representative data volumes to get meaningful results. Integrate them into CI as nightly jobs with pass/fail thresholds on p95 latency.',
        tags: ['load-testing', 'k6', 'throughput'],
        keyTakeaway:
          'Measure p95 latency and error rate under realistic load to find capacity limits before users do.',
      },
      {
        id: 'sdet-api-mocking',
        title: 'When and how should you mock APIs in testing?',
        difficulty: 'intermediate',
        answer:
          'Mock external dependencies when they are slow, unreliable, or costly so tests remain fast and deterministic. Tools like WireMock, MSW, and Nock intercept HTTP calls and return predefined responses without hitting real services. Mocks should be kept in sync with the real API via contract tests to prevent drift.',
        tags: ['mocking', 'wiremock', 'msw', 'test-doubles'],
        keyTakeaway:
          'Mock external APIs for speed and reliability but validate mocks with contract tests to prevent drift.',
      },
    ],
  },

  // ─── 4. Performance Testing (8 Qs) ───
  {
    id: 'sdet-performance',
    icon: 'Zap',
    label: 'Performance Testing',
    description:
      'Load, stress, and performance profiling techniques to ensure applications meet SLA targets.',
    questions: [
      {
        id: 'sdet-performance-load',
        title: 'What is load testing and what does it measure?',
        difficulty: 'beginner',
        answer:
          'Load testing simulates the expected number of concurrent users or requests to verify the system handles normal traffic within acceptable response times. It measures throughput, latency, error rate, and resource utilization under a defined load profile. The goal is to confirm the system meets its SLA before going to production.',
        tags: ['load-testing', 'concurrency', 'sla'],
        keyTakeaway:
          'Load testing proves the system meets its SLA under expected concurrent traffic.',
      },
      {
        id: 'sdet-performance-stress',
        title: 'How does stress testing differ from load testing?',
        difficulty: 'intermediate',
        answer:
          'Stress testing pushes the system beyond its expected capacity to find the breaking point and observe how it degrades and recovers. Unlike load testing which validates normal conditions, stress testing reveals failure modes like memory leaks, connection pool exhaustion, and cascading timeouts. It answers the question of what happens when traffic spikes unexpectedly.',
        tags: ['stress-testing', 'breaking-point', 'resilience'],
        keyTakeaway:
          'Stress testing finds the breaking point and reveals how the system fails under extreme load.',
      },
      {
        id: 'sdet-performance-tools',
        title: 'Compare JMeter, k6, and Gatling for performance testing.',
        difficulty: 'intermediate',
        answer:
          'JMeter is GUI-driven and Java-based with a massive plugin ecosystem but heavy resource usage. k6 uses JavaScript for test scripts, is lightweight, and integrates well with modern CI pipelines. Gatling uses Scala DSL, produces excellent HTML reports, and handles high concurrency efficiently with its async architecture.',
        tags: ['jmeter', 'k6', 'gatling', 'tool-comparison'],
        keyTakeaway:
          'Choose k6 for developer-friendly scripting, JMeter for GUI-based scenarios, and Gatling for high-concurrency Scala projects.',
      },
      {
        id: 'sdet-performance-response-time',
        title: 'What response time metrics should you track?',
        difficulty: 'beginner',
        answer:
          'Track minimum, average, median, p90, p95, and p99 response times to understand the full latency distribution. Averages hide outliers, so percentile metrics are more meaningful for user experience. A system with a fast average but terrible p99 still delivers a poor experience to one in a hundred users.',
        tags: ['response-time', 'latency', 'monitoring'],
        keyTakeaway:
          'Percentile metrics like p95 and p99 matter more than averages because averages hide tail latency.',
      },
      {
        id: 'sdet-performance-throughput',
        title: 'What is throughput and how is it measured?',
        difficulty: 'beginner',
        answer:
          'Throughput is the number of successful transactions the system processes per unit of time, typically expressed as requests per second. It indicates system capacity and is measured alongside latency to get a complete performance picture. High throughput with low latency is ideal; if throughput plateaus while latency climbs, you have hit a bottleneck.',
        tags: ['throughput', 'rps', 'capacity'],
        keyTakeaway:
          'Throughput shows system capacity; when it plateaus while latency rises, a bottleneck exists.',
      },
      {
        id: 'sdet-performance-percentiles',
        title: 'Why are p95 and p99 percentiles critical?',
        difficulty: 'intermediate',
        answer:
          'P95 means 95% of requests complete within that time, and p99 captures the slowest 1% which often affect power users or retry storms. Tail latency drives user-perceived quality because even a small fraction of slow requests compounds across microservice call chains. SLOs should be defined on percentiles rather than averages to protect worst-case user experience.',
        tags: ['percentiles', 'tail-latency', 'slo'],
        keyTakeaway:
          'Define SLOs on p95/p99 because tail latency compounds across service call chains.',
      },
      {
        id: 'sdet-performance-bottleneck',
        title: 'How do you identify performance bottlenecks?',
        difficulty: 'advanced',
        answer:
          'Correlate load test results with infrastructure metrics like CPU, memory, disk I/O, network, and database query times to pinpoint the saturated resource. Profiling tools, APM dashboards, and flame graphs help trace slow code paths. Common culprits include unindexed queries, synchronous I/O, inadequate connection pools, and missing caches.',
        tags: ['bottleneck', 'profiling', 'apm', 'infrastructure'],
        keyTakeaway:
          'Cross-reference load test latency spikes with CPU, memory, and query metrics to find the saturated resource.',
      },
      {
        id: 'sdet-performance-budgets',
        title: 'What are performance budgets and how are they enforced?',
        difficulty: 'advanced',
        answer:
          'Performance budgets set maximum thresholds for metrics like page load time, bundle size, or API p95 latency that the team commits to not exceeding. They are enforced by CI checks that fail the build when a budget is breached, preventing gradual degradation. Tools like Lighthouse CI, webpack bundle analyzer, and k6 thresholds automate this enforcement.',
        tags: ['performance-budgets', 'ci-enforcement', 'lighthouse'],
        keyTakeaway:
          'Enforce performance budgets in CI so gradual degradation is caught before it reaches users.',
      },
    ],
  },

  // ─── 5. CI/CD for Testing (6 Qs) ───
  {
    id: 'sdet-cicd',
    icon: 'GitBranch',
    label: 'CI/CD for Testing',
    description:
      'Integrating test suites into continuous integration and delivery pipelines for fast, reliable feedback.',
    questions: [
      {
        id: 'sdet-cicd-pipeline',
        title: 'How should tests be structured in a CI/CD pipeline?',
        difficulty: 'intermediate',
        answer:
          'Organize tests into stages: lint and unit tests run first for fast feedback, integration tests run next, and E2E tests run last since they are slowest. Each stage gates the next so failures are caught early without wasting compute on downstream stages. Keep the total pipeline under 15 minutes by parallelizing within each stage.',
        tags: ['pipeline-stages', 'gating', 'fast-feedback'],
        keyTakeaway:
          'Layer tests by speed in the pipeline so fast checks gate slower ones and feedback stays under 15 minutes.',
      },
      {
        id: 'sdet-cicd-environments',
        title: 'How do you manage test environments in CI?',
        difficulty: 'intermediate',
        answer:
          'Use ephemeral environments spun up per pipeline run via Docker Compose or Kubernetes namespaces so tests never compete for shared resources. Seed the database with known fixtures at startup and destroy everything on teardown to ensure repeatability. Infrastructure-as-code templates guarantee environment parity between CI, staging, and production.',
        tags: ['test-environments', 'ephemeral', 'docker', 'iac'],
        keyTakeaway:
          'Ephemeral per-run environments eliminate shared-state flakiness and guarantee test isolation.',
      },
      {
        id: 'sdet-cicd-reporting',
        title: 'What makes a good test reporting strategy in CI?',
        difficulty: 'beginner',
        answer:
          'Publish JUnit XML or JSON reports as pipeline artifacts and integrate with dashboards like Allure, ReportPortal, or native CI summaries for visibility. Reports should show pass/fail counts, failure screenshots or logs, duration trends, and flaky test history. Sending a Slack or email summary on failure ensures the team reacts quickly.',
        tags: ['reporting', 'allure', 'dashboards'],
        keyTakeaway:
          'Publish structured reports with failure artifacts and trend history so teams act on failures fast.',
      },
      {
        id: 'sdet-cicd-parallelization',
        title: 'How do you parallelize tests across CI runners?',
        difficulty: 'advanced',
        answer:
          'Split the test suite into balanced shards using file-based or timing-based algorithms and distribute each shard to a separate CI runner. Tools like CircleCI parallelism, GitHub Actions matrix, and pytest-split handle sharding automatically. Rebalancing shards based on historical run times prevents one slow shard from bottlenecking the entire pipeline.',
        tags: ['parallelization', 'sharding', 'matrix-builds'],
        keyTakeaway:
          'Shard tests by historical run time across CI runners to minimize total wall-clock duration.',
      },
      {
        id: 'sdet-cicd-testcontainers',
        title: 'What are Testcontainers and why are they useful?',
        difficulty: 'intermediate',
        answer:
          'Testcontainers is a library that programmatically starts Docker containers for databases, message brokers, or any service needed by integration tests. Each test class gets a fresh, disposable container so there is no need for a shared staging database. It works in CI and locally, making the test environment portable and reproducible.',
        tags: ['testcontainers', 'docker', 'integration-testing'],
        keyTakeaway:
          'Testcontainers gives each test a fresh disposable service container for truly isolated integration tests.',
      },
      {
        id: 'sdet-cicd-quality-gates',
        title: 'What are quality gates and how do they prevent bad releases?',
        difficulty: 'intermediate',
        answer:
          'Quality gates are automated checkpoints that block promotion to the next stage unless defined criteria are met, such as 80% code coverage, zero critical bugs, and all E2E tests passing. They are enforced via CI rules, merge checks, or deployment policies so human oversight is not the only safety net. Well-defined gates balance release velocity with product quality.',
        tags: ['quality-gates', 'merge-checks', 'release-criteria'],
        keyTakeaway:
          'Quality gates automate go/no-go decisions so bad code cannot bypass coverage and test thresholds.',
      },
    ],
  },
];

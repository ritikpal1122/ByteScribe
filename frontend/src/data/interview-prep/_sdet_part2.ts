import type { InterviewTopic } from './types';

export const SDET_PART2_TOPICS: InterviewTopic[] = [
  // ── 1. Mobile Testing (6 Qs) ──────────────────────────────────
  {
    id: 'sdet-mobile',
    icon: 'Smartphone',
    label: 'Mobile Testing',
    questions: [
      {
        id: 'sdet-mobile-appium',
        title: 'What is Appium and how does it work?',
        difficulty: 'intermediate',
        answer:
          'Appium is an open-source cross-platform automation framework that drives iOS and Android apps using the WebDriver protocol. It launches a server that translates WebDriver commands into platform-specific calls (UIAutomator2 for Android, XCUITest for iOS) without requiring app source code modification. Tests can be written in any language that has a Selenium client library.',
        tags: ['appium', 'mobile', 'automation'],
        keyTakeaway:
          'Appium provides cross-platform mobile automation via the WebDriver protocol without modifying the app under test.',
      },
      {
        id: 'sdet-mobile-ios-vs-android',
        title: 'What are key differences when testing iOS vs Android?',
        difficulty: 'intermediate',
        answer:
          'iOS testing requires macOS with Xcode and uses XCUITest under the hood, while Android uses UIAutomator2 or Espresso and runs on any OS. iOS has stricter signing and provisioning requirements, and the simulator is less performant than Android emulators. Android fragmentation across OEMs and OS versions demands broader device coverage.',
        tags: ['ios', 'android', 'mobile', 'fragmentation'],
        keyTakeaway:
          'iOS demands macOS and strict signing; Android demands wider device coverage due to fragmentation.',
      },
      {
        id: 'sdet-mobile-device-farms',
        title: 'How do cloud device farms help mobile testing?',
        difficulty: 'intermediate',
        answer:
          'Cloud device farms like BrowserStack, Sauce Labs, and AWS Device Farm provide access to hundreds of real devices and OS versions without maintaining physical hardware. They integrate with CI pipelines so tests run in parallel across multiple device configurations. This drastically reduces the cost and effort of achieving broad device coverage.',
        tags: ['device-farm', 'cloud', 'mobile'],
        keyTakeaway:
          'Device farms eliminate hardware maintenance and enable parallel testing across many real devices.',
      },
      {
        id: 'sdet-mobile-responsive',
        title: 'How do you test responsive design on mobile?',
        difficulty: 'beginner',
        answer:
          'Responsive testing verifies that layouts adapt correctly to different screen sizes, orientations, and pixel densities. You can use browser DevTools device emulation for quick checks and real devices or cloud farms for accurate validation. Automated visual regression tools like Percy or Applitools capture screenshots across viewports and flag layout differences.',
        tags: ['responsive', 'viewport', 'visual-regression'],
        keyTakeaway:
          'Combine browser emulation for speed with real-device testing for accuracy when validating responsive layouts.',
      },
      {
        id: 'sdet-mobile-challenges',
        title: 'What are mobile-specific testing challenges?',
        difficulty: 'intermediate',
        answer:
          'Mobile tests must handle interrupts like calls, notifications, and low-battery alerts that can disrupt flows. Network variability (2G/3G/4G/Wi-Fi transitions) and GPS/sensor mocking add complexity absent in web testing. Gesture interactions such as swipe, pinch, and long-press require specialized driver commands and careful coordinate handling.',
        tags: ['mobile', 'gestures', 'interrupts', 'network'],
        keyTakeaway:
          'Mobile testing uniquely contends with interrupts, network variability, and gesture-based interactions.',
      },
      {
        id: 'sdet-mobile-performance',
        title: 'How do you test mobile app performance?',
        difficulty: 'advanced',
        answer:
          'Mobile performance testing measures launch time, frame rate, memory consumption, CPU usage, and battery drain under realistic conditions. Tools like Android Profiler, Xcode Instruments, and Firebase Performance Monitoring capture these metrics on real devices. You set budgets for each metric and fail CI builds when regressions exceed thresholds.',
        tags: ['performance', 'mobile', 'profiling'],
        keyTakeaway:
          'Track launch time, frame rate, memory, and battery metrics with device profilers and enforce budgets in CI.',
      },
    ],
  },

  // ── 2. Security Testing (8 Qs) ────────────────────────────────
  {
    id: 'sdet-security',
    icon: 'Shield',
    label: 'Security Testing',
    questions: [
      {
        id: 'sdet-security-owasp',
        title: 'What is the OWASP Top 10?',
        difficulty: 'beginner',
        answer:
          'The OWASP Top 10 is a regularly updated list of the most critical web application security risks, including injection, broken authentication, and security misconfiguration. It serves as a baseline checklist for security testing and secure development training. Teams use it to prioritize which vulnerability classes to test for first.',
        tags: ['owasp', 'security', 'web'],
        keyTakeaway:
          'The OWASP Top 10 is the industry-standard checklist for prioritizing web security testing efforts.',
      },
      {
        id: 'sdet-security-sql-injection',
        title: 'How do you test for SQL injection?',
        difficulty: 'intermediate',
        answer:
          'SQL injection testing involves sending crafted payloads like single quotes, UNION SELECT statements, and boolean-based conditions through every user input and API parameter. Automated scanners such as sqlmap and OWASP ZAP systematically fuzz inputs and analyze responses for database errors or data leakage. Prevention is verified by confirming the app uses parameterized queries or ORM-bound parameters exclusively.',
        tags: ['sql-injection', 'security', 'fuzzing'],
        keyTakeaway:
          'Test every input with injection payloads and verify the app uses parameterized queries throughout.',
      },
      {
        id: 'sdet-security-xss',
        title: 'How do you test for cross-site scripting (XSS)?',
        difficulty: 'intermediate',
        answer:
          'XSS testing injects script tags and event-handler payloads into form fields, URL parameters, and headers, then checks if the browser executes them. Stored XSS requires checking that persisted user content is sanitized on output, while reflected XSS targets server responses that echo input. Tools like Burp Suite and OWASP ZAP automate payload generation and detection.',
        tags: ['xss', 'security', 'injection'],
        keyTakeaway:
          'Inject script payloads into every user-controllable input and verify output encoding prevents execution.',
      },
      {
        id: 'sdet-security-csrf',
        title: 'How do you test for CSRF vulnerabilities?',
        difficulty: 'intermediate',
        answer:
          'CSRF testing crafts forged requests from a different origin and checks whether the server accepts state-changing operations without a valid anti-CSRF token. You verify that every mutating endpoint requires and validates a CSRF token or uses SameSite cookie attributes. Automated tools can replay captured requests with the token stripped to confirm rejection.',
        tags: ['csrf', 'security', 'tokens'],
        keyTakeaway:
          'Verify every state-changing endpoint rejects requests missing a valid CSRF token.',
      },
      {
        id: 'sdet-security-pentest',
        title: 'What are the basics of penetration testing?',
        difficulty: 'advanced',
        answer:
          'Penetration testing simulates real-world attacks through phases: reconnaissance, scanning, exploitation, and reporting. Testers use tools like Metasploit, Burp Suite, and Nmap to discover and exploit vulnerabilities in a controlled scope. The final report classifies findings by severity and provides remediation guidance for development teams.',
        tags: ['pentest', 'security', 'exploitation'],
        keyTakeaway:
          'Pen testing follows recon-scan-exploit-report phases to find vulnerabilities before real attackers do.',
      },
      {
        id: 'sdet-security-sast-dast',
        title: 'What is the difference between SAST and DAST?',
        difficulty: 'intermediate',
        answer:
          'SAST (Static Application Security Testing) analyzes source code or bytecode without running the app, catching issues like hardcoded secrets and insecure patterns early in the SDLC. DAST (Dynamic Application Security Testing) probes a running application by sending malicious requests and observing responses. Combining both in CI gives coverage of code-level flaws and runtime vulnerabilities.',
        tags: ['sast', 'dast', 'security', 'ci'],
        keyTakeaway:
          'SAST finds code-level flaws without execution; DAST finds runtime vulnerabilities by probing a live app.',
      },
      {
        id: 'sdet-security-dependency-scan',
        title: 'How do you scan for dependency vulnerabilities?',
        difficulty: 'beginner',
        answer:
          'Tools like Snyk, Dependabot, and npm audit compare your dependency tree against known vulnerability databases (CVE/NVD) and flag insecure versions. They integrate into CI to block merges when critical vulnerabilities are detected and can auto-generate upgrade pull requests. Regular scanning is essential because new CVEs are published daily against existing packages.',
        tags: ['dependencies', 'security', 'snyk', 'cve'],
        keyTakeaway:
          'Automate dependency scanning in CI to catch known CVEs and block insecure packages from shipping.',
      },
      {
        id: 'sdet-security-automation',
        title: 'How do you automate security testing in CI/CD?',
        difficulty: 'advanced',
        answer:
          'Security test automation embeds SAST, DAST, dependency scanning, and secret detection as pipeline stages that run on every commit or merge request. Tools like OWASP ZAP can run in headless mode, and SAST scanners like Semgrep provide fast incremental analysis. Quality gates fail the build when severity thresholds are exceeded, shifting security left without slowing delivery.',
        tags: ['automation', 'security', 'ci-cd', 'shift-left'],
        keyTakeaway:
          'Embed SAST, DAST, and dependency scanning as CI gates to enforce security on every code change.',
      },
    ],
  },

  // ── 3. Test Data Management (6 Qs) ────────────────────────────
  {
    id: 'sdet-data',
    icon: 'Database',
    label: 'Test Data Management',
    questions: [
      {
        id: 'sdet-data-generation',
        title: 'How do you generate test data effectively?',
        difficulty: 'beginner',
        answer:
          'Test data generation uses libraries like Faker, Factory Bot, or Fishery to produce realistic, randomized data that covers edge cases. Generated data avoids the brittleness of hard-coded values and can be seeded for reproducibility. Combining random generation with explicit boundary-value data gives both breadth and precision.',
        tags: ['test-data', 'faker', 'generation'],
        keyTakeaway:
          'Use data generation libraries with seeds for reproducible yet realistic test data.',
      },
      {
        id: 'sdet-data-masking',
        title: 'What is data masking and why is it important?',
        difficulty: 'intermediate',
        answer:
          'Data masking replaces sensitive production data (PII, financial records) with realistic but fake equivalents so it can be safely used in non-production environments. Techniques include substitution, shuffling, and tokenization that preserve data format and referential integrity. This satisfies privacy regulations like GDPR while giving testers realistic datasets.',
        tags: ['data-masking', 'pii', 'gdpr'],
        keyTakeaway:
          'Data masking protects sensitive information while preserving realistic data characteristics for testing.',
      },
      {
        id: 'sdet-data-fixtures',
        title: 'What are fixtures and factories in testing?',
        difficulty: 'beginner',
        answer:
          'Fixtures are predefined, static data snapshots loaded before tests run, providing a known database state. Factories are programmatic builders that create objects on demand with sensible defaults and allow per-test overrides. Factories are generally preferred because they are more flexible, self-documenting, and avoid the "mystery guest" anti-pattern of distant fixture files.',
        tags: ['fixtures', 'factories', 'test-data'],
        keyTakeaway:
          'Factories create test data programmatically with defaults and overrides, offering more flexibility than static fixtures.',
      },
      {
        id: 'sdet-data-seeding',
        title: 'How do you handle database seeding for tests?',
        difficulty: 'intermediate',
        answer:
          'Database seeding populates a test database with a baseline dataset before the test suite runs, typically using migration scripts or seed functions. Idempotent seeds check for existing records before inserting to avoid duplicates on re-runs. For speed, many teams seed once per suite and use transactions or truncation between individual tests to reset state.',
        tags: ['seeding', 'database', 'idempotent'],
        keyTakeaway:
          'Use idempotent seed scripts and per-test transaction rollbacks for fast, repeatable database state.',
      },
      {
        id: 'sdet-data-driven',
        title: 'What is data-driven testing?',
        difficulty: 'beginner',
        answer:
          'Data-driven testing separates test logic from test inputs by feeding multiple data sets into the same test case via parameterization. Frameworks support this through decorators like pytest parametrize, JUnit MethodSource, or external CSV/JSON files. This maximizes coverage with minimal code duplication and makes adding new scenarios trivial.',
        tags: ['data-driven', 'parameterization', 'coverage'],
        keyTakeaway:
          'Data-driven testing runs the same logic across many input sets to maximize coverage with minimal duplication.',
      },
      {
        id: 'sdet-data-isolation',
        title: 'How do you ensure test data isolation?',
        difficulty: 'intermediate',
        answer:
          'Test isolation ensures each test creates and tears down its own data so tests do not interfere with one another. Common strategies include wrapping each test in a database transaction that rolls back, using unique identifiers per test run, or spinning up ephemeral database containers. Proper isolation eliminates flaky failures caused by shared mutable state.',
        tags: ['isolation', 'transactions', 'containers'],
        keyTakeaway:
          'Wrap tests in transactions or use ephemeral databases to guarantee no shared state between tests.',
      },
    ],
  },

  // ── 4. BDD & TDD (6 Qs) ───────────────────────────────────────
  {
    id: 'sdet-bdd',
    icon: 'BookOpen',
    label: 'BDD & TDD',
    questions: [
      {
        id: 'sdet-bdd-tdd',
        title: 'What is Test-Driven Development (TDD)?',
        difficulty: 'beginner',
        answer:
          'TDD is a development practice where you write a failing test before writing the production code to make it pass. The cycle is red (write failing test), green (write minimal code to pass), and refactor (improve design while keeping tests green). This produces well-tested, modular code and catches design issues early.',
        tags: ['tdd', 'red-green-refactor', 'design'],
        keyTakeaway:
          'TDD writes tests first, then minimal code to pass, then refactors, producing well-tested modular code.',
      },
      {
        id: 'sdet-bdd-overview',
        title: 'What is Behavior-Driven Development (BDD)?',
        difficulty: 'beginner',
        answer:
          'BDD extends TDD by writing tests in natural language that describe expected behavior from a user perspective, using Given-When-Then syntax. It bridges communication between developers, testers, and business stakeholders through shared, executable specifications. BDD focuses on what the system should do rather than how it is implemented.',
        tags: ['bdd', 'given-when-then', 'collaboration'],
        keyTakeaway:
          'BDD uses natural-language specifications to align developers, testers, and stakeholders on expected behavior.',
      },
      {
        id: 'sdet-bdd-cucumber',
        title: 'How do Cucumber and Gherkin work together?',
        difficulty: 'intermediate',
        answer:
          'Gherkin is a plain-text language for writing feature files with scenarios in Given-When-Then steps that anyone can read. Cucumber is the test runner that parses Gherkin files and maps each step to code-defined step definitions that execute the actual test logic. This separation lets non-technical stakeholders author and review test scenarios directly.',
        tags: ['cucumber', 'gherkin', 'step-definitions'],
        keyTakeaway:
          'Gherkin defines readable scenarios; Cucumber maps each step to executable code via step definitions.',
      },
      {
        id: 'sdet-bdd-red-green-refactor',
        title: 'Explain the red-green-refactor cycle.',
        difficulty: 'beginner',
        answer:
          'Red means writing a test that fails because the feature does not exist yet, confirming the test can actually detect failure. Green means writing the simplest possible code to make the test pass, avoiding premature optimization. Refactor means cleaning up both production and test code while continuously running the suite to ensure nothing breaks.',
        tags: ['tdd', 'red-green-refactor', 'workflow'],
        keyTakeaway:
          'Fail first (red), pass minimally (green), then clean up (refactor) while keeping all tests green.',
      },
      {
        id: 'sdet-bdd-given-when-then',
        title: 'What does Given-When-Then mean in BDD?',
        difficulty: 'beginner',
        answer:
          'Given sets up the preconditions or initial context for the scenario. When describes the action or event the user performs. Then asserts the expected outcome, and optional And/But steps extend any section for readability without adding new keywords.',
        tags: ['bdd', 'given-when-then', 'gherkin'],
        keyTakeaway:
          'Given establishes context, When triggers the action, and Then verifies the expected result.',
      },
      {
        id: 'sdet-bdd-acceptance-criteria',
        title: 'How do acceptance criteria relate to BDD?',
        difficulty: 'intermediate',
        answer:
          'Acceptance criteria define the conditions a feature must satisfy to be considered complete, and in BDD they translate directly into Gherkin scenarios. Each criterion becomes one or more Given-When-Then scenarios that serve as both documentation and automated tests. This tight coupling ensures every business requirement has a corresponding executable verification.',
        tags: ['acceptance-criteria', 'bdd', 'requirements'],
        keyTakeaway:
          'Acceptance criteria map directly to Gherkin scenarios, ensuring every requirement is automatically verified.',
      },
    ],
  },

  // ── 5. Chaos Engineering (4 Qs) ───────────────────────────────
  {
    id: 'sdet-chaos',
    icon: 'Flame',
    label: 'Chaos Engineering',
    questions: [
      {
        id: 'sdet-chaos-monkey',
        title: 'What is Chaos Monkey?',
        difficulty: 'intermediate',
        answer:
          'Chaos Monkey is a Netflix-created tool that randomly terminates production instances to verify that services can tolerate unexpected failures gracefully. It runs during business hours so engineers are available to observe system behavior and fix weaknesses. The approach forces teams to design for redundancy and automatic failover from the start.',
        tags: ['chaos-monkey', 'netflix', 'resilience'],
        keyTakeaway:
          'Chaos Monkey randomly kills instances in production to force resilient, fault-tolerant system design.',
      },
      {
        id: 'sdet-chaos-fault-injection',
        title: 'What is fault injection and how is it used?',
        difficulty: 'advanced',
        answer:
          'Fault injection deliberately introduces failures like network latency, packet loss, disk errors, or service unavailability into a system to test its resilience. Tools like Gremlin, Litmus, and Toxiproxy let you target specific failure modes with precise control over blast radius. The results reveal whether retry logic, circuit breakers, and fallback mechanisms work correctly under stress.',
        tags: ['fault-injection', 'resilience', 'gremlin'],
        keyTakeaway:
          'Fault injection introduces controlled failures to validate that resilience mechanisms work as designed.',
      },
      {
        id: 'sdet-chaos-game-days',
        title: 'What are game days in chaos engineering?',
        difficulty: 'intermediate',
        answer:
          'Game days are planned events where teams intentionally inject failures into systems while monitoring the impact and practicing incident response. They combine chaos experiments with collaborative learning, often involving multiple teams and realistic scenarios. The post-game-day review identifies gaps in monitoring, runbooks, and system architecture.',
        tags: ['game-day', 'chaos', 'incident-response'],
        keyTakeaway:
          'Game days are scheduled chaos sessions that test both system resilience and team incident-response readiness.',
      },
      {
        id: 'sdet-chaos-resilience',
        title: 'How does resilience testing differ from traditional testing?',
        difficulty: 'advanced',
        answer:
          'Traditional testing verifies that the system works correctly under expected conditions, while resilience testing verifies it degrades gracefully under unexpected failures. Resilience tests target infrastructure-level faults like node crashes, network partitions, and dependency outages rather than application-logic bugs. The goal is to confirm that SLOs are maintained even when components fail.',
        tags: ['resilience', 'chaos', 'slo', 'degradation'],
        keyTakeaway:
          'Resilience testing validates graceful degradation under failure, not just correct behavior under normal conditions.',
      },
    ],
  },

  // ── 6. Accessibility Testing (6 Qs) ───────────────────────────
  {
    id: 'sdet-a11y',
    icon: 'Eye',
    label: 'Accessibility Testing',
    questions: [
      {
        id: 'sdet-a11y-axe',
        title: 'What is axe-core and how is it used?',
        difficulty: 'beginner',
        answer:
          'axe-core is an open-source accessibility testing engine that checks a rendered DOM against WCAG rules and returns violations with impact severity and fix suggestions. It integrates into unit tests via jest-axe, into E2E tests via cypress-axe or playwright, and into browser DevTools via the axe extension. Running it in CI catches accessibility regressions before they reach production.',
        tags: ['axe-core', 'a11y', 'automation'],
        keyTakeaway:
          'axe-core programmatically audits a rendered page for WCAG violations and integrates easily into CI.',
      },
      {
        id: 'sdet-a11y-screen-reader',
        title: 'How do you test with screen readers?',
        difficulty: 'intermediate',
        answer:
          'Screen reader testing requires manually navigating the application using VoiceOver (macOS/iOS), NVDA or JAWS (Windows), or TalkBack (Android) to verify that content is announced correctly. You check that headings, landmarks, form labels, and dynamic updates are conveyed in a logical order. Automated tools cannot fully replace this because they cannot evaluate the subjective clarity of the auditory experience.',
        tags: ['screen-reader', 'a11y', 'manual-testing'],
        keyTakeaway:
          'Manual screen reader testing is essential because automated tools cannot evaluate the quality of the auditory experience.',
      },
      {
        id: 'sdet-a11y-wcag',
        title: 'What is WCAG compliance?',
        difficulty: 'beginner',
        answer:
          'WCAG (Web Content Accessibility Guidelines) defines success criteria across four principles: Perceivable, Operable, Understandable, and Robust, at three conformance levels (A, AA, AAA). Most organizations target Level AA, which covers critical needs like text alternatives, keyboard access, and sufficient color contrast. WCAG conformance is often a legal requirement under regulations like ADA and EN 301 549.',
        tags: ['wcag', 'a11y', 'compliance'],
        keyTakeaway:
          'WCAG Level AA is the standard conformance target covering text alternatives, keyboard access, and contrast.',
      },
      {
        id: 'sdet-a11y-keyboard',
        title: 'How do you test keyboard accessibility?',
        difficulty: 'beginner',
        answer:
          'Keyboard testing verifies that every interactive element is reachable via Tab, activatable via Enter or Space, and dismissable via Escape where appropriate. You check for a visible focus indicator on every focusable element and ensure the tab order follows a logical reading sequence. Automated tests can assert focusability and tab index, but manual testing catches subtle order and visibility issues.',
        tags: ['keyboard', 'a11y', 'focus', 'tab-order'],
        keyTakeaway:
          'Every interactive element must be reachable, activatable, and visually focused via keyboard alone.',
      },
      {
        id: 'sdet-a11y-contrast',
        title: 'What are color contrast requirements?',
        difficulty: 'beginner',
        answer:
          'WCAG AA requires a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text (18px+ or 14px+ bold) against its background. Tools like axe-core, Lighthouse, and browser DevTools automatically flag elements that fail these ratios. Insufficient contrast makes content unreadable for users with low vision or color blindness.',
        tags: ['contrast', 'a11y', 'wcag', 'color'],
        keyTakeaway:
          'WCAG AA requires 4.5:1 contrast for normal text and 3:1 for large text against backgrounds.',
      },
      {
        id: 'sdet-a11y-automation',
        title: 'How do you automate accessibility testing?',
        difficulty: 'intermediate',
        answer:
          'Automated a11y testing integrates axe-core or Lighthouse into CI to scan every page and component for WCAG violations on each build. You can add jest-axe assertions in component tests and cypress-axe or playwright checks in E2E suites for layered coverage. Automated tools catch roughly 30-50% of issues, so they must be complemented with manual screen reader and keyboard testing.',
        tags: ['automation', 'a11y', 'ci', 'axe-core'],
        keyTakeaway:
          'Automate a11y checks in CI with axe-core but complement with manual testing since tools catch only 30-50% of issues.',
      },
    ],
  },

  // ── 7. Test Architecture (8 Qs) ───────────────────────────────
  {
    id: 'sdet-architecture',
    icon: 'Building',
    label: 'Test Architecture',
    questions: [
      {
        id: 'sdet-architecture-framework-design',
        title: 'What makes a good test framework design?',
        difficulty: 'advanced',
        answer:
          'A good test framework separates concerns into layers: a driver/client layer for interacting with the system, a page-object or service layer for domain abstractions, and a test layer for assertions and scenarios. It provides sensible defaults, consistent configuration, and easy extensibility via hooks or plugins. The framework should minimize boilerplate so engineers spend time writing meaningful tests, not fighting infrastructure.',
        tags: ['framework', 'architecture', 'design'],
        keyTakeaway:
          'Layer the framework into driver, abstraction, and test layers with sensible defaults and easy extensibility.',
      },
      {
        id: 'sdet-architecture-custom-assertions',
        title: 'Why create custom assertions in a test framework?',
        difficulty: 'intermediate',
        answer:
          'Custom assertions encapsulate domain-specific checks into reusable methods with clear failure messages, improving readability and maintainability. For example, expectUserToBeLoggedIn() is far more expressive than asserting on cookie values and DOM elements separately. They reduce duplication across tests and make failures self-documenting without requiring investigation.',
        tags: ['assertions', 'readability', 'reusability'],
        keyTakeaway:
          'Custom assertions improve readability, reduce duplication, and produce self-documenting failure messages.',
      },
      {
        id: 'sdet-architecture-hooks-fixtures',
        title: 'How do test hooks and fixtures improve test design?',
        difficulty: 'intermediate',
        answer:
          'Hooks (beforeAll, beforeEach, afterEach, afterAll) and fixtures manage setup and teardown logic outside individual test bodies, keeping tests focused on behavior. Fixtures provide scoped resources like database connections, authenticated sessions, or mock servers that are created and cleaned up automatically. Proper use of scoping (session, module, function) optimizes performance by reusing expensive resources.',
        tags: ['hooks', 'fixtures', 'setup', 'teardown'],
        keyTakeaway:
          'Hooks and scoped fixtures centralize setup/teardown, keeping test bodies focused on assertions.',
      },
      {
        id: 'sdet-architecture-reporting',
        title: 'What should test reporting include?',
        difficulty: 'beginner',
        answer:
          'Test reports should show pass/fail/skip counts, execution time, failure messages with stack traces, and trend history over recent runs. Rich reporters like Allure add screenshots on failure, step-by-step logs, and environment metadata for debugging. Reports should be automatically published to a dashboard accessible by the whole team after each CI run.',
        tags: ['reporting', 'allure', 'ci', 'dashboards'],
        keyTakeaway:
          'Reports need pass/fail counts, failure details, screenshots, and trend history published to a team dashboard.',
      },
      {
        id: 'sdet-architecture-categorization',
        title: 'How do you categorize tests effectively?',
        difficulty: 'intermediate',
        answer:
          'Tests are categorized by type (unit, integration, E2E), by feature area, by priority (smoke, regression, full), and by speed (fast, slow) using tags, markers, or directory structure. This enables selective execution such as running only smoke tests on every commit and the full regression suite nightly. Consistent categorization also helps identify coverage gaps by mapping tests to features.',
        tags: ['categorization', 'tags', 'smoke', 'regression'],
        keyTakeaway:
          'Tag tests by type, feature, and priority to enable selective execution and coverage gap analysis.',
      },
      {
        id: 'sdet-architecture-maintainability',
        title: 'How do you keep tests maintainable over time?',
        difficulty: 'intermediate',
        answer:
          'Maintainable tests follow DRY principles through shared utilities and page objects, use descriptive names that explain intent, and avoid testing implementation details. Regularly refactor tests alongside production code, delete obsolete tests, and enforce consistent patterns via linting and code review. A test that is hard to understand or frequently breaks without real regressions should be rewritten.',
        tags: ['maintainability', 'refactoring', 'page-objects'],
        keyTakeaway:
          'Keep tests maintainable with shared abstractions, intent-revealing names, and regular refactoring.',
      },
      {
        id: 'sdet-architecture-code-review',
        title: 'What should you look for in test code reviews?',
        difficulty: 'intermediate',
        answer:
          'Review test code for clear arrange-act-assert structure, meaningful assertions that verify behavior rather than implementation, and absence of flaky patterns like arbitrary sleeps or order-dependent tests. Check that new tests actually fail when the feature is broken (mutation testing mindset) and follow established framework conventions. Also verify that test names describe the scenario and expected outcome.',
        tags: ['code-review', 'quality', 'assertions'],
        keyTakeaway:
          'Review tests for clear structure, behavior-focused assertions, and verify they actually catch real failures.',
      },
      {
        id: 'sdet-architecture-documentation',
        title: 'How should test suites be documented?',
        difficulty: 'beginner',
        answer:
          'Test documentation should include a high-level strategy document explaining the testing pyramid, tool choices, and conventions, plus a contribution guide for writing new tests. Individual tests should be self-documenting through descriptive names and well-structured arrange-act-assert patterns. A living test plan mapping features to test types and coverage percentages helps track completeness.',
        tags: ['documentation', 'test-plan', 'conventions'],
        keyTakeaway:
          'Document test strategy and conventions at the suite level; individual tests should be self-documenting via clear naming.',
      },
    ],
  },
];

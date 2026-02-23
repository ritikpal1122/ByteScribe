import type { DocCategory } from './types';

// Part 7: TypeScript 5.x Features + Config & Tooling
export const TS_PART7_CATEGORIES: DocCategory[] = [
  {
    id: 'ts-modern',
    label: 'TypeScript 5.x Features',
    icon: 'Sparkles',
    entries: [
      {
        id: 'const-type-parameters',
        title: 'const Type Parameters',
        difficulty: 'advanced',
        tags: ['const', 'generics', 'literal-types', 'TS5.0', 'type-parameters'],
        cheatSheetSummary: 'TS 5.0 const modifier on generics preserves literal types instead of widening.',
        sections: [
          {
            heading: 'Preserving Literal Types in Generics',
            content:
              'TypeScript 5.0 introduced the const modifier for type parameters, which tells the compiler to infer the narrowest (most literal) type possible for generic arguments. Without const, TypeScript widens literal values to their base types — for example, "hello" becomes string and [1, 2, 3] becomes number[]. Adding const to a type parameter is equivalent to the caller writing "as const" on their argument, but without requiring the caller to remember to do so.',
            analogy: 'Think of it like a camera with two modes: without const, the camera takes a blurry wide-angle shot (string, number[]), losing detail. With const, it switches to a high-resolution macro lens that captures every fine detail ("home", "about", "contact" as exact literals). The subject is the same, but the level of detail preserved is dramatically different.',
            code: `// Without const — types are widened
function getRoutes<T extends readonly string[]>(routes: T): T {
  return routes;
}
const widened = getRoutes(['home', 'about', 'contact']);
// Type: string[] — literal values lost!

// With const — literal types preserved (TS 5.0)
function getRoutesConst<const T extends readonly string[]>(routes: T): T {
  return routes;
}
const narrow = getRoutesConst(['home', 'about', 'contact']);
// Type: readonly ["home", "about", "contact"]

type Route = (typeof narrow)[number];
// Type: "home" | "about" | "contact"

console.log(narrow);
console.log(typeof narrow[0]);`,
            codeHighlightLines: [2, 9],
            output: `["home", "about", "contact"]
string`,
            tip: 'Use const type parameters when you want callers to get literal type inference automatically, without needing to write "as const" on every call.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n    subgraph "Without const"\n        IN1["[\'home\',\'about\',\'contact\']"] -->|"inferred as"| OUT1["string[]"]\n        OUT1 -->|"element type"| T1["string"]\n    end\n    subgraph "With const"\n        IN2["[\'home\',\'about\',\'contact\']"] -->|"inferred as"| OUT2["readonly [\'home\',\'about\',\'contact\']"]\n        OUT2 -->|"element type"| T2["\'home\' | \'about\' | \'contact\'"]\n    end\n    style OUT1 fill:#fca5a5,stroke:#ef4444\n    style OUT2 fill:#86efac,stroke:#22c55e',
              caption: 'Without const, TypeScript widens literals to their base types. With const, the exact literal types are preserved.',
            },
          },
          {
            heading: 'Practical Uses of const Generics',
            content:
              'The const type parameter modifier is especially useful for builder patterns, configuration objects, and any API where preserving the exact shape of the input matters for type safety downstream. It eliminates an entire class of type-widening bugs and removes the burden from the caller to specify "as const". This is one of the most impactful features in TypeScript 5.0 for library authors.',
            code: `// Config builder with const type parameter
function defineConfig<const T extends {
  routes: Record<string, string>;
  features: readonly string[];
}>(config: T): T {
  return config;
}

const appConfig = defineConfig({
  routes: {
    home: '/',
    about: '/about',
    blog: '/blog',
  },
  features: ['auth', 'analytics', 'i18n'],
});

// appConfig.routes.home is typed as "/" not string
// appConfig.features[0] is typed as "auth" not string
type Features = (typeof appConfig.features)[number];
// Type: "auth" | "analytics" | "i18n"

type RouteKeys = keyof typeof appConfig.routes;
// Type: "home" | "about" | "blog"

console.log(appConfig.routes.home);
console.log(appConfig.features);`,
            codeHighlightLines: [2, 3, 4, 5, 20, 23],
            output: `/
["auth", "analytics", "i18n"]`,
            note: 'The const modifier only affects inference. It does not make the value immutable at runtime — you still need Object.freeze() or readonly types for runtime immutability.',
          },
        ],
        quiz: [
          {
            question: 'What does the const modifier on a type parameter do in TypeScript 5.0?',
            options: [
              'Makes the value immutable at runtime',
              'Infers the narrowest (most literal) type for generic arguments',
              'Converts the parameter to a constant variable',
              'Prevents the type parameter from being used with arrays',
            ],
            correctIndex: 1,
            explanation: 'The const modifier tells the compiler to infer the narrowest literal type possible for generic arguments, equivalent to the caller writing "as const" on their argument.',
          },
          {
            question: 'Without the const modifier, what type does TypeScript infer for ["home", "about"] passed to a generic function?',
            options: [
              'readonly ["home", "about"]',
              '"home" | "about"',
              'string[]',
              'tuple<string, string>',
            ],
            correctIndex: 2,
            explanation: 'Without const, TypeScript widens literal values to their base types, so ["home", "about"] becomes string[] instead of preserving the literal tuple type.',
          },
          {
            question: 'Which syntax is correct for defining a const type parameter?',
            options: [
              'function foo<T extends const string>(x: T): T',
              'function foo<const T extends string>(x: T): T',
              'function foo<T>(const x: T): T',
              'const function foo<T extends string>(x: T): T',
            ],
            correctIndex: 1,
            explanation: 'The const modifier goes before the type parameter name: <const T extends string>. It modifies the type parameter inference behavior.',
          },
        ],
        challenge: {
          prompt: 'Create a function defineRoutes that uses a const type parameter to preserve literal route path values. The function should accept an object where keys are route names and values are path strings, and return the same object with preserved literal types.',
          starterCode: `// Define a function that preserves literal types of route paths
function defineRoutes(/* add type parameter and parameter */) {
  // implementation
}

// This should preserve literal types
const routes = defineRoutes({
  home: '/',
  about: '/about',
  blog: '/blog/posts',
});

// Type of routes.home should be '/' not string
type HomePath = typeof routes.home;`,
          solutionCode: `function defineRoutes<const T extends Record<string, string>>(routes: T): T {
  return routes;
}

const routes = defineRoutes({
  home: '/',
  about: '/about',
  blog: '/blog/posts',
});

// Type of routes.home is '/' (literal)
type HomePath = typeof routes.home; // '/'
type AllPaths = (typeof routes)[keyof typeof routes]; // '/' | '/about' | '/blog/posts'

console.log(routes.home);`,
          hints: [
            'Use the const modifier before the type parameter name in the generic signature',
            'The type parameter should extend Record<string, string> to ensure all values are strings',
            'The function simply returns the input — the magic is in the type inference',
          ],
        },
      },
      {
        id: 'decorator-metadata',
        title: 'Decorator Metadata',
        difficulty: 'advanced',
        tags: ['decorators', 'metadata', 'Symbol.metadata', 'TS5.2', 'reflection'],
        cheatSheetSummary: 'TS 5.2 decorator metadata API: attach and retrieve metadata via Symbol.metadata.',
        sections: [
          {
            heading: 'The Decorator Metadata API',
            content:
              'TypeScript 5.2 added support for the TC39 Decorator Metadata proposal, which provides a standardized way for decorators to attach metadata to classes. Each class gets a metadata object accessible via Symbol.metadata. Decorators can write to the context.metadata object during decoration, and consumers can read it later from the class. This replaces the older reflect-metadata library with a native, standards-based approach.',
            analogy: 'Think of it like sticky notes on a filing cabinet: each decorator is a person who slaps a labeled sticky note (metadata) onto a specific drawer (class method). Later, anyone can walk up to the cabinet, read all the sticky notes via Symbol.metadata, and know exactly what instructions were attached without opening any drawers.',
            code: `// Define a decorator that records metadata
function track(label: string) {
  return function (
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    // Write to the metadata object
    context.metadata[context.name as string] = {
      tracked: true,
      label,
    };
  };
}

class Analytics {
  @track('page-view')
  view() {
    console.log('Viewing page');
  }

  @track('button-click')
  click() {
    console.log('Button clicked');
  }
}

// Read metadata via Symbol.metadata
const meta = Analytics[Symbol.metadata];
console.log(meta);`,
            codeHighlightLines: [8, 9, 10, 16, 21, 28],
            output: `{
  view: { tracked: true, label: "page-view" },
  click: { tracked: true, label: "button-click" }
}`,
            tip: 'Decorator metadata is inherited through the prototype chain. A subclass can access metadata defined on its parent class.',
          },
          {
            heading: 'Accessing Metadata at Runtime',
            content:
              'The metadata object lives on the class constructor under Symbol.metadata. This makes it easy to build frameworks that inspect decorated classes at runtime — for dependency injection, ORM mapping, validation, or serialization. Unlike the older experimental decorators, this API is based on the Stage 3 TC39 proposal and will be part of the JavaScript standard. Libraries can read metadata without any runtime dependency on TypeScript.',
            code: `// Validation decorator using metadata
function validate(rule: string) {
  return function (
    _target: undefined,
    context: ClassFieldDecoratorContext
  ) {
    const fieldName = String(context.name);
    const rules: Record<string, string> =
      (context.metadata['validations'] as Record<string, string>) ?? {};
    rules[fieldName] = rule;
    context.metadata['validations'] = rules;
  };
}

class UserForm {
  @validate('required|email')
  email: string = '';

  @validate('required|min:3')
  name: string = '';

  @validate('required|min:8')
  password: string = '';
}

// Framework reads validation rules from metadata
const validations = UserForm[Symbol.metadata]?.['validations'];
console.log('Validation rules:', validations);

// Use rules to validate an instance
function checkRules(cls: any, data: Record<string, string>) {
  const rules = cls[Symbol.metadata]?.['validations'] ?? {};
  for (const [field, rule] of Object.entries(rules)) {
    console.log(\`Checking \${field}: \${rule}\`);
  }
}
checkRules(UserForm, { email: 'a@b.com', name: 'Al', password: '123' });`,
            codeHighlightLines: [9, 10, 11, 16, 19, 22, 27],
            output: `Validation rules: { email: "required|email", name: "required|min:3", password: "required|min:8" }
Checking email: required|email
Checking name: required|min:3
Checking password: required|min:8`,
            note: 'Symbol.metadata requires targeting ES2022 or later and enabling the decorators compiler option in tsconfig.json.',
          },
        ],
        quiz: [
          {
            question: 'How do decorators attach metadata to a class in TypeScript 5.2?',
            options: [
              'By modifying the class prototype directly',
              'By writing to the context.metadata object during decoration',
              'By using the Reflect.defineMetadata API',
              'By adding properties to the constructor function',
            ],
            correctIndex: 1,
            explanation: 'In the TC39 Decorator Metadata proposal supported by TS 5.2, decorators write to context.metadata, and consumers read it later from the class via Symbol.metadata.',
          },
          {
            question: 'How do you access decorator metadata on a class at runtime?',
            options: [
              'Reflect.getMetadata(MyClass)',
              'MyClass.__metadata__',
              'MyClass[Symbol.metadata]',
              'Object.getOwnPropertyDescriptor(MyClass, "metadata")',
            ],
            correctIndex: 2,
            explanation: 'The metadata object lives on the class constructor under Symbol.metadata, providing a standardized way to access all metadata attached by decorators.',
          },
          {
            question: 'What does the TC39 Decorator Metadata proposal replace?',
            options: [
              'The class decorator pattern',
              'The older reflect-metadata library',
              'TypeScript enums',
              'The Proxy API',
            ],
            correctIndex: 1,
            explanation: 'The native decorator metadata API replaces the older reflect-metadata library with a standards-based approach that does not require any runtime dependency.',
          },
        ],
        challenge: {
          prompt: 'Create a @log decorator that records method names and their invocation counts using Symbol.metadata. After decorating methods on a class, read the metadata to verify which methods are logged.',
          starterCode: `// Create a decorator that records method info in metadata
function log(
  target: Function,
  context: ClassMethodDecoratorContext
) {
  // TODO: Write method name to context.metadata
}

class Service {
  @log
  fetchData() {
    console.log('fetching...');
  }

  @log
  saveData() {
    console.log('saving...');
  }
}

// TODO: Read metadata from Service[Symbol.metadata]
// and log which methods are decorated`,
          solutionCode: `function log(
  target: Function,
  context: ClassMethodDecoratorContext
) {
  const methods: string[] =
    (context.metadata['loggedMethods'] as string[]) ?? [];
  methods.push(String(context.name));
  context.metadata['loggedMethods'] = methods;
}

class Service {
  @log
  fetchData() {
    console.log('fetching...');
  }

  @log
  saveData() {
    console.log('saving...');
  }
}

const meta = Service[Symbol.metadata];
console.log('Logged methods:', meta?.['loggedMethods']);
// Output: Logged methods: ["fetchData", "saveData"]`,
          hints: [
            'Use context.metadata to store an array of method names',
            'Read existing metadata first (it may be undefined on the first decorator call) and append to it',
            'Access the final metadata via ClassName[Symbol.metadata]',
          ],
        },
      },
      {
        id: 'using-keyword',
        title: 'using & Disposable',
        difficulty: 'advanced',
        tags: ['using', 'disposable', 'resource-management', 'TS5.2', 'AsyncDisposable'],
        cheatSheetSummary: 'TS 5.2 explicit resource management: using/await using auto-disposes resources.',
        sections: [
          {
            heading: 'Explicit Resource Management',
            content:
              'TypeScript 5.2 supports the TC39 Explicit Resource Management proposal with the using keyword. When you declare a variable with using, its Symbol.dispose method is automatically called when the variable goes out of scope (at the end of the block). This is similar to Python\'s "with" statement, C#\'s "using" declaration, or Java\'s try-with-resources. It ensures resources like file handles, database connections, and locks are always cleaned up.',
            analogy: 'Think of it like a hotel checkout system: when you declare "using file = new TempFile()", you are checking into a room. No matter what happens during your stay (even if an exception throws you out), the hotel automatically cleans and resets the room (calls Symbol.dispose) when you leave the block. You never have to remember to return the key yourself.',
            code: `// Define a disposable resource
class TempFile implements Disposable {
  name: string;

  constructor(name: string) {
    this.name = name;
    console.log(\`Created temp file: \${name}\`);
  }

  write(data: string) {
    console.log(\`Writing to \${this.name}: \${data}\`);
  }

  [Symbol.dispose]() {
    console.log(\`Cleaned up temp file: \${this.name}\`);
  }
}

function processData() {
  using file = new TempFile('data.tmp');
  file.write('hello world');
  // file[Symbol.dispose]() is called automatically here
}

processData();
console.log('After processData — file is cleaned up');`,
            codeHighlightLines: [2, 14, 15, 16, 20],
            output: `Created temp file: data.tmp
Writing to data.tmp: hello world
Cleaned up temp file: data.tmp
After processData — file is cleaned up`,
            tip: 'Resources declared with using are disposed in reverse order of declaration, similar to a stack. The last resource created is the first to be disposed.',
            diagram: {
              kind: 'custom',
              type: 'stack',
              data: {
                title: 'Resource Lifecycle with using',
                items: [
                  { value: 'Enter scope', color: '#22c55e' },
                  { value: 'using file = new TempFile()', color: '#3b82f6' },
                  { value: 'file.write("hello")', color: '#3b82f6' },
                  { value: 'Exit scope (end of block)', color: '#f59e0b' },
                  { value: 'file[Symbol.dispose]() called automatically', color: '#ef4444' },
                ],
                direction: 'top-to-bottom',
              },
              caption: 'The using keyword ensures Symbol.dispose is automatically called when the variable goes out of scope, even if an exception is thrown.',
            },
          },
          {
            heading: 'Async Disposable with await using',
            content:
              'For resources that require asynchronous cleanup — such as database connections, network streams, or worker threads — TypeScript provides await using with the AsyncDisposable interface. The resource must implement Symbol.asyncDispose, which returns a Promise. The await using syntax ensures the async cleanup completes before execution continues past the block. This is essential for properly shutting down I/O resources.',
            analogy: 'Think of it like a self-closing vault door with a timer lock: "await using" opens the vault and guarantees the heavy door will fully close and lock (async cleanup) before anyone can proceed to the next task. Unlike a regular door that closes instantly, this one needs time to seal, and the system patiently waits for the seal to complete.',
            code: `// Async disposable resource
class DbConnection implements AsyncDisposable {
  #url: string;

  constructor(url: string) {
    this.#url = url;
    console.log(\`Connected to \${url}\`);
  }

  async query(sql: string) {
    console.log(\`Executing: \${sql}\`);
    return [{ id: 1, name: 'Alice' }];
  }

  async [Symbol.asyncDispose]() {
    console.log(\`Closing connection to \${this.#url}\`);
    // Simulate async cleanup
    await new Promise(r => setTimeout(r, 100));
    console.log('Connection closed');
  }
}

async function fetchUsers() {
  await using db = new DbConnection('postgres://localhost/app');
  const users = await db.query('SELECT * FROM users');
  console.log('Users:', users);
  // db[Symbol.asyncDispose]() called automatically
}

await fetchUsers();`,
            codeHighlightLines: [2, 15, 16, 17, 18, 19, 24],
            output: `Connected to postgres://localhost/app
Executing: SELECT * FROM users
Users: [{ id: 1, name: "Alice" }]
Closing connection to postgres://localhost/app
Connection closed`,
            note: 'await using can only be used inside async functions or at the top level of a module with top-level await enabled.',
          },
          {
            heading: 'DisposableStack for Multiple Resources',
            content:
              'When you need to manage multiple disposable resources as a group, TypeScript provides DisposableStack and AsyncDisposableStack. You can add resources to the stack, and all of them will be disposed when the stack goes out of scope. This is useful when the number of resources is dynamic or when you want to combine resources from different sources into a single cleanup scope.',
            code: `// DisposableStack groups multiple resources
class Lock implements Disposable {
  constructor(public name: string) {
    console.log(\`Acquired lock: \${name}\`);
  }
  [Symbol.dispose]() {
    console.log(\`Released lock: \${name}\`);
  }
}

function criticalSection() {
  using stack = new DisposableStack();

  const lock1 = stack.use(new Lock('mutex-a'));
  const lock2 = stack.use(new Lock('mutex-b'));

  // Can also add arbitrary cleanup
  stack.defer(() => {
    console.log('Custom cleanup executed');
  });

  console.log('Doing critical work...');
  // All resources disposed in reverse order at block end
}

criticalSection();
console.log('All locks released');`,
            codeHighlightLines: [12, 14, 15, 18, 19, 20],
            output: `Acquired lock: mutex-a
Acquired lock: mutex-b
Doing critical work...
Custom cleanup executed
Released lock: mutex-b
Released lock: mutex-a
All locks released`,
            tip: 'DisposableStack.defer() lets you register arbitrary cleanup callbacks without creating a full Disposable class, similar to Go\'s defer statement.',
            diagram: {
              kind: 'custom',
              type: 'stack',
              data: {
                title: 'DisposableStack — LIFO Disposal Order',
                items: [
                  { value: 'Acquire lock: mutex-a', color: '#3b82f6' },
                  { value: 'Acquire lock: mutex-b', color: '#3b82f6' },
                  { value: 'Register: custom cleanup', color: '#8b5cf6' },
                  { value: '--- scope exit (reverse order) ---', color: '#f59e0b' },
                  { value: 'Custom cleanup executed', color: '#ef4444' },
                  { value: 'Released lock: mutex-b', color: '#ef4444' },
                  { value: 'Released lock: mutex-a', color: '#ef4444' },
                ],
                direction: 'top-to-bottom',
              },
              caption: 'DisposableStack disposes resources in reverse order (LIFO). The last resource acquired is the first to be released.',
            },
          },
        ],
        quiz: [
          {
            question: 'What interface must a resource implement to be used with the using keyword?',
            options: [
              'IDisposable',
              'Disposable',
              'AutoCloseable',
              'Releasable',
            ],
            correctIndex: 1,
            explanation: 'A resource must implement the Disposable interface by providing a [Symbol.dispose]() method, which is automatically called when the variable goes out of scope.',
          },
          {
            question: 'When are resources declared with using disposed?',
            options: [
              'When garbage collected',
              'When explicitly called',
              'At the end of the block where they are declared',
              'When the program exits',
            ],
            correctIndex: 2,
            explanation: 'Resources declared with using are automatically disposed at the end of the block (scope) where they are declared, even if an exception is thrown.',
          },
          {
            question: 'What is the correct keyword for async disposable resources?',
            options: [
              'using async',
              'async using',
              'await using',
              'using await',
            ],
            correctIndex: 2,
            explanation: 'The await using syntax is used for async disposable resources that implement Symbol.asyncDispose, ensuring the async cleanup completes before continuing.',
          },
          {
            question: 'In what order are multiple resources declared with using disposed?',
            options: [
              'In the order they were declared (FIFO)',
              'In reverse order of declaration (LIFO)',
              'Alphabetically by variable name',
              'In parallel',
            ],
            correctIndex: 1,
            explanation: 'Resources declared with using are disposed in reverse order (LIFO — last in, first out), similar to a stack. The last resource created is the first to be disposed.',
          },
        ],
        challenge: {
          prompt: 'Create a DatabaseConnection class that implements the Disposable interface. It should log when the connection is opened and closed. Write a function that uses the using keyword to automatically manage the connection lifecycle.',
          starterCode: `// Create a disposable database connection
class DatabaseConnection {
  // TODO: Implement Disposable interface

  constructor(public url: string) {
    // TODO: log connection opened
  }

  query(sql: string): string[] {
    console.log(\`Executing: \${sql}\`);
    return ['row1', 'row2'];
  }

  // TODO: Implement Symbol.dispose
}

function runQuery() {
  // TODO: Use 'using' keyword to manage the connection
  // and run a query
}

runQuery();
console.log('Connection should be closed by now');`,
          solutionCode: `class DatabaseConnection implements Disposable {
  constructor(public url: string) {
    console.log(\`Connected to \${url}\`);
  }

  query(sql: string): string[] {
    console.log(\`Executing: \${sql}\`);
    return ['row1', 'row2'];
  }

  [Symbol.dispose]() {
    console.log(\`Disconnected from \${this.url}\`);
  }
}

function runQuery() {
  using db = new DatabaseConnection('postgres://localhost/mydb');
  const results = db.query('SELECT * FROM users');
  console.log('Results:', results);
  // db[Symbol.dispose]() is called automatically here
}

runQuery();
console.log('Connection should be closed by now');`,
          hints: [
            'Implement the Disposable interface by adding a [Symbol.dispose]() method to the class',
            'Use the using keyword instead of const/let when declaring the database connection variable',
            'The dispose method is automatically called when the function scope ends',
          ],
        },
      },
      {
        id: 'config-extends',
        title: 'Extending Configs',
        difficulty: 'advanced',
        tags: ['tsconfig', 'extends', 'project-references', 'composite', 'monorepo'],
        cheatSheetSummary: 'Use tsconfig extends for shared base configs, project references for monorepos.',
        sections: [
          {
            heading: 'Shared Base Configs with extends',
            content:
              'The tsconfig extends property allows one configuration file to inherit from another, enabling shared compiler settings across projects. You can extend from a local file, an npm package (like @tsconfig/recommended), or a path relative to the current config. Properties in the child config override the parent. This is essential for maintaining consistent settings across a monorepo or organization without duplicating configuration.',
            analogy: 'Think of it like a corporate dress code: the headquarters (base tsconfig) sets the default rules for all employees. Each regional office (child tsconfig) inherits those rules but can override specific items like "casual Fridays" (outDir, rootDir). Everyone shares the same foundation, but local adjustments are permitted where needed.',
            code: `// tsconfig.base.json — shared across all projects
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}

// packages/api/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}

// packages/web/tsconfig.json — extends from npm
{
  "extends": "@tsconfig/vite-react/tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}`,
            codeHighlightLines: [19, 29],
            output: `// Resolved packages/api/tsconfig.json compilerOptions:
// target: "ES2022"     (inherited)
// strict: true         (inherited)
// outDir: "./dist"     (local override)
// rootDir: "./src"     (local override)`,
            tip: 'Use @tsconfig/strictest as a base for maximum type safety. It enables every strict flag including noUncheckedIndexedAccess and exactOptionalPropertyTypes.',
          },
          {
            heading: 'Project References & Composite Projects',
            content:
              'TypeScript project references let you split a large codebase into smaller projects that can be built independently and depend on each other. Each referenced project must have composite: true in its tsconfig. The tsc --build (tsc -b) command understands project references and only rebuilds what changed. This dramatically improves build times in monorepos and ensures correct build order based on dependency relationships.',
            analogy: 'Think of it like an assembly line in a factory: the shared package is built first (raw materials), then the API and web packages are assembled in parallel using those materials. If only the shared package changes, the factory (tsc -b) knows to re-manufacture just that part and the downstream products that depend on it, skipping everything else.',
            code: `// packages/shared/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}

// packages/api/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "references": [
    { "path": "../shared" }
  ],
  "include": ["src/**/*"]
}

// Root tsconfig.json — orchestrates all projects
{
  "files": [],
  "references": [
    { "path": "packages/shared" },
    { "path": "packages/api" },
    { "path": "packages/web" }
  ]
}

// Build commands:
// tsc -b                    # build all projects
// tsc -b --watch            # incremental watch mode
// tsc -b --clean            # clean build outputs
// tsc -b packages/api       # build api + its dependencies`,
            codeHighlightLines: [4, 19, 20, 28, 29, 30, 31],
            output: `// tsc -b output:
// Building packages/shared...  (built first — no deps)
// Building packages/api...     (depends on shared)
// Building packages/web...     (depends on shared)`,
            note: 'Projects with composite: true must have declaration: true and all source files must be matched by include or files. TypeScript enforces this at build time.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    ROOT["Root tsconfig.json\\n(orchestrator)"] --> SHARED["packages/shared\\ncomposite: true"]\n    ROOT --> API["packages/api"]\n    ROOT --> WEB["packages/web"]\n    SHARED -->|"referenced by"| API\n    SHARED -->|"referenced by"| WEB\n    subgraph "tsc -b Build Order"\n        B1["1. Build shared"] --> B2["2. Build api (parallel)"]\n        B1 --> B3["3. Build web (parallel)"]\n    end\n    style SHARED fill:#86efac,stroke:#22c55e\n    style API fill:#93c5fd,stroke:#3b82f6\n    style WEB fill:#fde68a,stroke:#f59e0b',
              caption: 'Project references define a dependency graph. tsc -b builds in correct order and only rebuilds changed packages.',
            },
          },
        ],
        quiz: [
          {
            question: 'What does the extends property in tsconfig.json do?',
            options: [
              'Extends the TypeScript language with new syntax',
              'Allows one configuration file to inherit from another',
              'Extends the compilation target to newer JS versions',
              'Adds new file extensions to the compilation',
            ],
            correctIndex: 1,
            explanation: 'The extends property lets a tsconfig inherit compiler options from another config file (local or npm package). Child properties override parent values.',
          },
          {
            question: 'What must a project have in its tsconfig to be used as a project reference?',
            options: [
              '"references": true',
              '"composite": true',
              '"incremental": true',
              '"declaration": false',
            ],
            correctIndex: 1,
            explanation: 'Each referenced project must have composite: true in its tsconfig, which also implicitly requires declaration: true. This enables the project references build system.',
          },
          {
            question: 'What command builds all projects in the correct dependency order?',
            options: [
              'tsc --build-all',
              'tsc -b',
              'tsc --project-refs',
              'tsc --composite',
            ],
            correctIndex: 1,
            explanation: 'The tsc -b (or tsc --build) command understands project references and builds in correct dependency order, only rebuilding what has changed.',
          },
        ],
        challenge: {
          prompt: 'Write three tsconfig.json configurations for a monorepo: a base config, a shared library config that extends the base with composite: true, and an app config that extends the base and references the shared library.',
          starterCode: `// Write the configs as TypeScript objects (simulating JSON)

// Base config (tsconfig.base.json)
const baseConfig = {
  compilerOptions: {
    // TODO: Add common compiler options
  }
};

// Shared library config (packages/shared/tsconfig.json)
const sharedConfig = {
  // TODO: Extend base, enable composite
};

// App config (packages/app/tsconfig.json)
const appConfig = {
  // TODO: Extend base, reference shared
};

console.log('Base:', JSON.stringify(baseConfig, null, 2));
console.log('Shared:', JSON.stringify(sharedConfig, null, 2));
console.log('App:', JSON.stringify(appConfig, null, 2));`,
          solutionCode: `const baseConfig = {
  compilerOptions: {
    target: 'ES2022',
    module: 'ESNext',
    moduleResolution: 'bundler',
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
    declaration: true,
    declarationMap: true,
    sourceMap: true,
  }
};

const sharedConfig = {
  extends: '../../tsconfig.base.json',
  compilerOptions: {
    composite: true,
    outDir: './dist',
    rootDir: './src',
  },
  include: ['src/**/*'],
};

const appConfig = {
  extends: '../../tsconfig.base.json',
  compilerOptions: {
    outDir: './dist',
    rootDir: './src',
  },
  references: [
    { path: '../shared' },
  ],
  include: ['src/**/*'],
};

console.log('Base:', JSON.stringify(baseConfig, null, 2));
console.log('Shared:', JSON.stringify(sharedConfig, null, 2));
console.log('App:', JSON.stringify(appConfig, null, 2));`,
          hints: [
            'The base config should contain common options like target, module, strict, etc.',
            'The shared library needs composite: true and declaration: true to work as a project reference',
            'The app config uses "references" array with a "path" pointing to the shared package directory',
          ],
        },
      },
      {
        id: 'import-attributes',
        title: 'Import Attributes',
        difficulty: 'advanced',
        tags: ['import-attributes', 'import-assertions', 'json', 'TS5.3', 'modules'],
        cheatSheetSummary: 'Import attributes specify module type: import data from "./x.json" with { type: "json" }.',
        sections: [
          {
            heading: 'Import Attributes Syntax',
            content:
              'TypeScript 5.3 added support for import attributes (the evolution of import assertions). Import attributes use the "with" keyword to provide metadata about a module import, most commonly to specify the type of non-JavaScript modules like JSON or CSS. This replaced the older "assert" syntax from import assertions. The runtime and bundler use this information to determine how to load and parse the module correctly.',
            code: `// Import JSON with type attribute (TS 5.3+)
import packageJson from './package.json' with { type: 'json' };
console.log(packageJson.name);
console.log(packageJson.version);

// Dynamic import with attributes
const config = await import('./config.json', {
  with: { type: 'json' },
});
console.log(config.default.apiUrl);

// Re-export with attributes
export { default as schema } from './schema.json' with { type: 'json' };

// CSS module import (bundler-dependent)
// import styles from './app.css' with { type: 'css' };

// The old "assert" syntax (deprecated, TS 5.3+)
// import data from './data.json' assert { type: 'json' };
// Use "with" instead of "assert" going forward`,
            codeHighlightLines: [2, 7, 8, 13],
            output: `my-app
1.0.0
https://api.example.com`,
            tip: 'Import attributes with "with" replaced import assertions with "assert". Always use the "with" syntax — the "assert" keyword is deprecated and will be removed.',
          },
          {
            heading: 'Configuring Import Attributes',
            content:
              'To use import attributes, your tsconfig must target a module system that supports them. The "nodenext" and "esnext" module settings both support the syntax. For JSON imports specifically, you also need resolveJsonModule: true. Bundlers like Vite and esbuild handle import attributes during transformation, while Node.js requires them for non-JS module types. The TypeScript compiler validates the attribute syntax but passes them through to the output.',
            code: `// tsconfig.json for import attributes
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "resolveJsonModule": true,
    "target": "ES2022"
  }
}

// Node.js usage — required for JSON in ESM
// package.json must have "type": "module"
import data from './data.json' with { type: 'json' };

// TypeScript validates the syntax:
// import x from './y.json' with { type: 'xml' };
// Error: 'xml' is not a valid import attribute type

// Vite/bundler usage — typically resolveJsonModule is enough
// Vite strips import attributes during build
import config from './config.json';  // works without attribute in Vite

// For type-only imports, attributes are erased
import type { Config } from './config.json' with { type: 'json' };
// No runtime effect — purely for type checking

console.log('Import attributes configured correctly');`,
            output: `Import attributes configured correctly`,
            note: 'In Node.js ESM, importing a .json file without the { type: "json" } attribute will throw an ERR_IMPORT_ATTRIBUTE_MISSING error at runtime.',
          },
        ],
        quiz: [
          {
            question: 'What keyword is used for import attributes in TypeScript 5.3+?',
            options: [
              'assert',
              'with',
              'type',
              'as',
            ],
            correctIndex: 1,
            explanation: 'Import attributes use the "with" keyword (e.g., import x from "./y.json" with { type: "json" }). The older "assert" keyword is deprecated.',
          },
          {
            question: 'What is the most common use case for import attributes?',
            options: [
              'Specifying the character encoding of a file',
              'Declaring module scope variables',
              'Specifying the type of non-JavaScript modules like JSON',
              'Adding runtime metadata to imports',
            ],
            correctIndex: 2,
            explanation: 'Import attributes are most commonly used to specify the type of non-JavaScript modules (e.g., JSON, CSS) so the runtime and bundler know how to load and parse them.',
          },
          {
            question: 'What happens to import attributes on type-only imports?',
            options: [
              'They cause a compile error',
              'They are preserved in the output',
              'They are erased along with the type import',
              'They are converted to runtime assertions',
            ],
            correctIndex: 2,
            explanation: 'For type-only imports (import type), attributes are erased along with the import since they have no runtime effect — they exist purely for type checking.',
          },
        ],
        challenge: {
          prompt: 'Write code that demonstrates three different ways to use import attributes: a static import, a dynamic import, and a re-export — all importing JSON modules with the correct type attribute.',
          starterCode: `// 1. Static import with attribute
// TODO: Import package.json with type attribute

// 2. Dynamic import with attribute
async function loadConfig() {
  // TODO: Dynamically import config.json with attribute
}

// 3. Re-export with attribute
// TODO: Re-export a JSON module with attribute

// Log results
// console.log(packageJson.name);`,
          solutionCode: `// 1. Static import with attribute
import packageJson from './package.json' with { type: 'json' };

// 2. Dynamic import with attribute
async function loadConfig() {
  const config = await import('./config.json', {
    with: { type: 'json' },
  });
  console.log('Config loaded:', config.default);
  return config.default;
}

// 3. Re-export with attribute
export { default as schema } from './schema.json' with { type: 'json' };

// Log results
console.log('Package:', packageJson.name, packageJson.version);
await loadConfig();`,
          hints: [
            'Static imports use: import x from "./file.json" with { type: "json" }',
            'Dynamic imports pass attributes as a second argument: import("./file.json", { with: { type: "json" } })',
            'Re-exports support attributes after the module specifier: export { default } from "./file.json" with { type: "json" }',
          ],
        },
      },
      {
        id: 'isolated-declarations',
        title: 'Isolated Declarations',
        difficulty: 'advanced',
        tags: ['isolatedDeclarations', 'TS5.5', 'parallel-emit', 'declaration', 'performance'],
        cheatSheetSummary: 'TS 5.5 isolatedDeclarations enables parallel .d.ts generation by requiring explicit types on exports.',
        sections: [
          {
            heading: 'What Are Isolated Declarations?',
            content:
              'TypeScript 5.5 introduced the isolatedDeclarations compiler option, which requires that all exported functions, variables, and classes have explicit type annotations. When enabled, the compiler can generate .d.ts declaration files by looking at each file in isolation — without resolving imports or performing cross-file type inference. This unlocks parallel declaration emit by tools like esbuild, swc, and oxc, dramatically speeding up builds in large codebases.',
            analogy: 'Think of it like a self-contained recipe card: without isolatedDeclarations, the recipe says "add the sauce from the other recipe on page 47" (cross-file inference). With it, every recipe card must list its own ingredients explicitly. This means any chef (build tool) can prepare the dish independently without flipping through the entire cookbook.',
            code: `// tsconfig.json
// { "compilerOptions": { "isolatedDeclarations": true } }

// ERROR with isolatedDeclarations — inferred return type
// export function add(a: number, b: number) {
//   return a + b;
// }
// Fix: add explicit return type

// CORRECT — explicit return type annotation
export function add(a: number, b: number): number {
  return a + b;
}

// ERROR — inferred type from expression
// export const config = { port: 3000, host: 'localhost' };
// Fix: annotate the type

// CORRECT — explicit type annotation
export const config: { port: number; host: string } = {
  port: 3000,
  host: 'localhost',
};

// satisfies also works for isolated declarations
export const routes = {
  home: '/',
  about: '/about',
} satisfies Record<string, string>;

console.log(add(2, 3));
console.log(config);`,
            codeHighlightLines: [11, 20, 21, 22, 23],
            output: `5
{ port: 3000, host: "localhost" }`,
            tip: 'Enable isolatedDeclarations gradually: start with a few packages in a monorepo and expand as you add explicit types to exports.',
          },
          {
            heading: 'Parallel Emit and Build Performance',
            content:
              'The main benefit of isolatedDeclarations is enabling parallel .d.ts generation. Normally, TypeScript must type-check the entire program to generate declaration files because return types and variable types can depend on cross-file inference. With isolatedDeclarations, each file is self-contained for declaration purposes, so tools like esbuild and swc can emit .d.ts files in parallel without running the full TypeScript checker. This can reduce build times by 50-80% in large projects.',
            code: `// Build pipeline with isolatedDeclarations
// 1. Fast transpile + declaration emit (parallel, per-file)
//    swc or esbuild handles this in milliseconds
//
// 2. Type checking (separate step, can run in parallel)
//    tsc --noEmit verifies full program correctness

// package.json scripts
// {
//   "scripts": {
//     "build": "swc src -d dist && tsc --noEmit",
//     "build:fast": "swc src -d dist",
//     "typecheck": "tsc --noEmit",
//     "dev": "swc src -d dist --watch"
//   }
// }

// Example: what isolated declarations require
export interface User {
  id: string;
  name: string;
}

// Return type must be explicit for exports
export function createUser(name: string): User {
  return { id: crypto.randomUUID(), name };
}

// Internal (non-exported) functions can still infer
function formatName(first: string, last: string) {
  return \`\${first} \${last}\`; // inference OK — not exported
}

export const user = createUser('Alice');
console.log(user);`,
            codeHighlightLines: [25, 30],
            output: `{ id: "a1b2c3d4-...", name: "Alice" }`,
            note: 'isolatedDeclarations only requires explicit types on exports. Private/internal functions and variables can still use type inference freely.',
          },
        ],
        quiz: [
          {
            question: 'What does the isolatedDeclarations compiler option require?',
            options: [
              'All functions must be async',
              'All exported functions, variables, and classes must have explicit type annotations',
              'All imports must be type-only',
              'All files must have at most one export',
            ],
            correctIndex: 1,
            explanation: 'isolatedDeclarations requires explicit type annotations on all exports so that .d.ts files can be generated by looking at each file in isolation, without cross-file type inference.',
          },
          {
            question: 'What is the main benefit of isolatedDeclarations?',
            options: [
              'Smaller bundle sizes',
              'Better runtime performance',
              'Enables parallel .d.ts generation by tools like esbuild and swc',
              'Eliminates the need for tsconfig.json',
            ],
            correctIndex: 2,
            explanation: 'When each file is self-contained for declaration purposes, tools like esbuild and swc can emit .d.ts files in parallel without running the full TypeScript checker, reducing build times by 50-80%.',
          },
          {
            question: 'Do non-exported (internal) functions need explicit return types with isolatedDeclarations?',
            options: [
              'Yes, all functions must have explicit types',
              'No, only exported functions need explicit types',
              'Only if they are async',
              'Only if they are generic',
            ],
            correctIndex: 1,
            explanation: 'isolatedDeclarations only requires explicit types on exports. Private/internal functions and variables can still use type inference freely.',
          },
        ],
        challenge: {
          prompt: 'Refactor a module so it compiles with isolatedDeclarations enabled. The module has exported functions and variables with inferred types that need explicit annotations.',
          starterCode: `// This module does NOT compile with isolatedDeclarations
// Fix all exports to have explicit type annotations

export function multiply(a: number, b: number) {
  return a * b;
}

export const appConfig = {
  port: 3000,
  host: 'localhost',
  debug: true,
};

export function getUsers() {
  return [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
  ];
}

// Internal helper — does NOT need annotation
function formatId(id: string) {
  return \`user-\${id}\`;
}`,
          solutionCode: `// All exports have explicit type annotations

export function multiply(a: number, b: number): number {
  return a * b;
}

interface AppConfig {
  port: number;
  host: string;
  debug: boolean;
}

export const appConfig: AppConfig = {
  port: 3000,
  host: 'localhost',
  debug: true,
};

interface User {
  id: string;
  name: string;
}

export function getUsers(): User[] {
  return [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
  ];
}

// Internal helper — does NOT need annotation
function formatId(id: string) {
  return \`user-\${id}\`;
}`,
          hints: [
            'Add explicit return types to all exported functions (e.g., : number, : User[])',
            'Define interfaces for complex object types used in exports',
            'Non-exported functions can keep their inferred types — only exports matter',
          ],
        },
      },
    ],
  },
  {
    id: 'ts-tooling',
    label: 'Config & Tooling',
    icon: 'Settings',
    entries: [
      {
        id: 'compiler-options-guide',
        title: 'Compiler Options Guide',
        difficulty: 'intermediate',
        tags: ['tsconfig', 'compiler-options', 'strict', 'modules', 'emit', 'config'],
        cheatSheetSummary: 'Key tsconfig options: strict for safety, module for resolution, target for output level.',
        sections: [
          {
            heading: 'Type Checking Options',
            content:
              'The most important compiler options control how strictly TypeScript checks your code. The strict flag is a shorthand that enables a family of strict checks including strictNullChecks, noImplicitAny, strictFunctionTypes, and more. Beyond strict, options like noUncheckedIndexedAccess and exactOptionalPropertyTypes provide even tighter safety. These options are the primary reason to use TypeScript — turning them off defeats the purpose.',
            code: `// tsconfig.json — type checking options
{
  "compilerOptions": {
    // Master strict flag (enables all below)
    "strict": true,
    // Individually controlled by strict:
    // "strictNullChecks": true,      // null/undefined are distinct types
    // "noImplicitAny": true,         // error on implicit any
    // "strictFunctionTypes": true,   // strict function type checking
    // "strictBindCallApply": true,   // strict bind/call/apply
    // "strictPropertyInitialization": true,
    // "noImplicitThis": true,
    // "alwaysStrict": true,          // emit "use strict"

    // Beyond strict — extra safety
    "noUncheckedIndexedAccess": true, // arr[0] is T | undefined
    "exactOptionalPropertyTypes": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}

// Example: noUncheckedIndexedAccess effect
const arr: string[] = ['a', 'b', 'c'];
// const first: string = arr[0];  // Error! Type is string | undefined
const first: string | undefined = arr[0];
if (first !== undefined) {
  console.log(first.toUpperCase()); // OK after narrowing
}`,
            output: `A`,
            tip: 'Start every new project with "strict": true and "noUncheckedIndexedAccess": true. These two options catch the vast majority of type-related bugs.',
          },
          {
            heading: 'Module & Resolution Options',
            content:
              'Module options control how TypeScript resolves imports and what module format it outputs. The most important are module (what JS module system to emit), moduleResolution (how to find modules), and target (what JS version to output). For modern projects, moduleResolution: "bundler" works best with Vite/webpack, while "nodenext" is correct for Node.js libraries. Getting these wrong is the most common source of tsconfig frustration.',
            analogy: 'Think of it like choosing a shipping method and address format: "module" is the type of truck (ESM, CommonJS), "moduleResolution" is the GPS system that finds packages (bundler vs nodenext), and "target" is the road network available (ES2022 highways vs ES5 back roads). Mismatching them is like sending a cargo ship down a bicycle path.',
            code: `// Modern web app (Vite, webpack, etc.)
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "noEmit": true,         // bundler handles emit
    "jsx": "react-jsx",     // for React projects
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]    // path aliases
    }
  }
}

// Node.js library
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}

// Key differences:
// "bundler" — no file extensions needed, paths resolved by bundler
// "nodenext" — requires .js extensions in imports (even for .ts files)
// "node" (legacy) — only for CommonJS projects, avoid for new code

// Example with nodenext: must use .js extension
// import { utils } from './utils.js';  // resolves to utils.ts`,
            output: `// moduleResolution comparison:
// "bundler"  → import { x } from './utils'     (no extension)
// "nodenext" → import { x } from './utils.js'  (extension required)`,
            note: 'The "node" moduleResolution is legacy and only handles CommonJS. For modern Node.js ESM projects, always use "nodenext".',
          },
          {
            heading: 'Emit & Interop Options',
            content:
              'Emit options control what TypeScript outputs when it compiles. Key options include declaration (generate .d.ts files), sourceMap (generate source maps for debugging), and outDir (output directory). Interop options like esModuleInterop and allowSyntheticDefaultImports ensure CommonJS and ESM modules work together smoothly. In projects using a bundler, you often set noEmit: true and let the bundler handle output.',
            code: `// Library with full emit
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,         // generate .d.ts files
    "declarationMap": true,      // map .d.ts back to .ts for "go to source"
    "sourceMap": true,           // .js.map for debugging
    "declarationDir": "./types", // separate dir for .d.ts

    // Interop
    "esModuleInterop": true,     // fixes CJS/ESM default import
    "allowSyntheticDefaultImports": true,
    "isolatedModules": true,     // ensure each file can be transpiled alone

    // Incremental builds
    "incremental": true,         // cache build info for faster rebuilds
    "tsBuildInfoFile": "./.tsbuildinfo"
  }
}

// Bundler project — no emit needed
{
  "compilerOptions": {
    "noEmit": true,              // bundler handles all output
    "isolatedModules": true,     // required by most bundlers
    "verbatimModuleSyntax": true // preserve import/export exactly
  }
}

// verbatimModuleSyntax replaces these older flags:
// "importsNotUsedAsValues": "error"     (deprecated)
// "preserveValueImports": true          (deprecated)
// Now: use 'import type' for type-only imports

import type { User } from './types';     // erased at runtime
import { createUser } from './factory';  // kept at runtime`,
            output: `// verbatimModuleSyntax enforces:
// import type { X } from ... → always erased
// import { X } from ...      → always kept
// No ambiguity about what's a runtime import`,
            tip: 'Enable verbatimModuleSyntax in new projects. It forces you to use "import type" for types, making the runtime behavior of imports explicit and predictable.',
          },
        ],
        quiz: [
          {
            question: 'What does the strict flag in tsconfig.json enable?',
            options: [
              'Only strictNullChecks',
              'A family of strict checks including strictNullChecks, noImplicitAny, strictFunctionTypes, and more',
              'Runtime type checking',
              'Stricter module resolution',
            ],
            correctIndex: 1,
            explanation: 'The strict flag is a shorthand that enables a family of strict type checking options including strictNullChecks, noImplicitAny, strictFunctionTypes, strictBindCallApply, and more.',
          },
          {
            question: 'What does noUncheckedIndexedAccess do?',
            options: [
              'Prevents accessing array elements by index',
              'Makes array element access return T | undefined instead of T',
              'Throws runtime errors on out-of-bounds access',
              'Disables bracket notation for objects',
            ],
            correctIndex: 1,
            explanation: 'With noUncheckedIndexedAccess, accessing an array element by index (arr[0]) returns T | undefined, forcing you to handle the case where the element might not exist.',
          },
          {
            question: 'Which moduleResolution setting should you use with Vite or webpack?',
            options: [
              '"node"',
              '"classic"',
              '"bundler"',
              '"commonjs"',
            ],
            correctIndex: 2,
            explanation: 'The "bundler" moduleResolution is designed for projects using Vite, webpack, or similar bundlers. It supports features like no file extensions in imports and path aliases.',
          },
          {
            question: 'What does verbatimModuleSyntax enforce?',
            options: [
              'All imports must use default exports',
              'All type imports must use "import type" syntax',
              'All modules must be CommonJS',
              'All exports must have documentation',
            ],
            correctIndex: 1,
            explanation: 'verbatimModuleSyntax forces you to use "import type" for type-only imports, making the distinction between runtime and type-only imports explicit and unambiguous.',
          },
        ],
        challenge: {
          prompt: 'Create a tsconfig.json configuration (as a TypeScript object) for a modern React + Vite project. It should include strict type checking, bundler module resolution, React JSX support, path aliases, and common safety options.',
          starterCode: `// Build a tsconfig for a React + Vite project
const tsconfig = {
  compilerOptions: {
    // TODO: Add target and module settings

    // TODO: Add module resolution for bundler

    // TODO: Add strict type checking options

    // TODO: Add React JSX support

    // TODO: Add path aliases for "@/*"

    // TODO: Add emit settings (bundler handles emit)
  },
  include: ['src'],
};

console.log(JSON.stringify(tsconfig, null, 2));`,
          solutionCode: `const tsconfig = {
  compilerOptions: {
    // Target and module
    target: 'ES2022',
    module: 'ESNext',

    // Module resolution for bundler
    moduleResolution: 'bundler',
    resolveJsonModule: true,
    allowImportingTsExtensions: true,

    // Strict type checking
    strict: true,
    noUncheckedIndexedAccess: true,
    noFallthroughCasesInSwitch: true,
    noImplicitReturns: true,
    noImplicitOverride: true,

    // React JSX
    jsx: 'react-jsx',

    // Path aliases
    baseUrl: '.',
    paths: {
      '@/*': ['./src/*'],
    },

    // Emit (bundler handles it)
    noEmit: true,
    isolatedModules: true,
    verbatimModuleSyntax: true,

    // Interop
    esModuleInterop: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
  },
  include: ['src'],
};

console.log(JSON.stringify(tsconfig, null, 2));`,
          hints: [
            'Use moduleResolution: "bundler" since Vite handles module resolution',
            'Set noEmit: true because Vite/esbuild handles the actual JavaScript output',
            'Use jsx: "react-jsx" for modern React JSX transform (no import React needed)',
          ],
        },
      },
      {
        id: 'eslint-typescript',
        title: 'ESLint + TypeScript',
        difficulty: 'intermediate',
        tags: ['eslint', 'typescript-eslint', 'linting', 'type-aware', 'rules'],
        cheatSheetSummary: 'Use @typescript-eslint for TS-aware linting with type-checked rules.',
        sections: [
          {
            heading: 'Setting Up @typescript-eslint',
            content:
              'The @typescript-eslint project provides an ESLint parser and plugin for TypeScript. It replaces the default ESLint parser with one that understands TypeScript syntax and provides hundreds of TypeScript-specific lint rules. The flat config format (eslint.config.js) is now the standard. The recommended configs provide sensible defaults, while the strict and stylistic configs add more opinionated rules.',
            analogy: 'Think of it like adding a specialized spellchecker on top of a regular one: ESLint catches general JavaScript issues (grammar), while @typescript-eslint adds a layer that understands TypeScript-specific patterns (technical jargon). Together, they catch mistakes that neither could find alone.',
            code: `// Install dependencies
// npm install -D eslint @typescript-eslint/parser
//   @typescript-eslint/eslint-plugin typescript-eslint

// eslint.config.js (flat config — ESLint 9+)
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Customize rules
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    ignores: ['dist/', 'node_modules/', '*.js'],
  }
);

// Run: npx eslint .
// Fix:  npx eslint . --fix`,
            output: `// Example ESLint output:
// src/utils.ts:12:7  error  'temp' is assigned but never used
//   @typescript-eslint/no-unused-vars
// src/api.ts:5:1  error  Use 'import type' for type imports
//   @typescript-eslint/consistent-type-imports`,
            tip: 'Use the consistent-type-imports rule to enforce "import type" everywhere. This pairs perfectly with verbatimModuleSyntax in your tsconfig.',
          },
          {
            heading: 'Type-Aware Linting Rules',
            content:
              'Type-aware rules use the TypeScript compiler API to perform deeper analysis than syntax-only rules. They can catch bugs like floating promises, unsafe any usage, and incorrect comparisons. Enabling type-aware linting requires pointing ESLint to your tsconfig. These rules are slower because they invoke the type checker, but they catch bugs that no other tool can find. The recommended-type-checked config enables the most valuable type-aware rules.',
            code: `// eslint.config.js with type-aware linting
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // Key type-aware rules
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
    },
  }
);

// These rules catch real bugs:
// no-floating-promises → forgot to await an async call
// no-misused-promises  → passing async fn where sync expected
// await-thenable       → awaiting a non-Promise value
// no-unnecessary-condition → condition always true/false`,
            codeHighlightLines: [7, 10, 11, 12, 19, 20, 21],
            output: `// Type-aware lint catches:
// fetchData();  →  error: Promises must be awaited or returned
// arr.forEach(async (x) => ...)  →  error: misused promise
// await 42;  →  error: awaiting a non-thenable value`,
            note: 'Type-aware linting adds 2-5 seconds to lint time because it runs the TypeScript type checker. Use it in CI and editor, but consider disabling in pre-commit hooks for speed.',
          },
        ],
        quiz: [
          {
            question: 'What is the standard config format for @typescript-eslint with ESLint 9+?',
            options: [
              '.eslintrc.json',
              '.eslintrc.yml',
              'eslint.config.js (flat config)',
              'tseslint.config.json',
            ],
            correctIndex: 2,
            explanation: 'ESLint 9+ uses the flat config format (eslint.config.js), which is now the standard. The older .eslintrc.* formats are deprecated.',
          },
          {
            question: 'What do type-aware linting rules require to function?',
            options: [
              'A .eslintrc.json file',
              'Pointing ESLint to your tsconfig via parserOptions',
              'The TypeScript CLI installed globally',
              'A special ESLint binary',
            ],
            correctIndex: 1,
            explanation: 'Type-aware rules use the TypeScript compiler API, so ESLint must be configured with parserOptions.projectService or parserOptions.project pointing to your tsconfig.',
          },
          {
            question: 'Which rule catches forgotten await on async function calls?',
            options: [
              '@typescript-eslint/no-explicit-any',
              '@typescript-eslint/no-floating-promises',
              '@typescript-eslint/await-thenable',
              '@typescript-eslint/consistent-type-imports',
            ],
            correctIndex: 1,
            explanation: 'The no-floating-promises rule detects when a Promise-returning function is called without awaiting, returning, or handling the result, which is a common source of bugs.',
          },
        ],
        challenge: {
          prompt: 'Write an ESLint flat config (as a TypeScript/JavaScript object structure) that sets up @typescript-eslint with recommended rules, type-aware linting, and custom rule overrides for a TypeScript project.',
          starterCode: `// Build an ESLint flat config for a TypeScript project
// Simulate the config structure as a plain object

const eslintConfig = [
  // TODO: Add recommended configs

  // TODO: Add TypeScript-specific file config with rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    // TODO: Add language options with parser settings

    rules: {
      // TODO: Add custom rule overrides
    },
  },

  // TODO: Add ignores
];

console.log('ESLint config entries:', eslintConfig.length);`,
          solutionCode: `// Simulated ESLint flat config structure
const eslintConfig = [
  // Base recommended config
  { name: 'eslint/recommended', rules: { 'no-unused-vars': 'off' } },

  // TypeScript recommended
  { name: 'typescript-eslint/recommended' },

  // Type-aware linting
  { name: 'typescript-eslint/recommended-type-checked' },

  // Custom TypeScript rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: '.',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
    },
  },

  // Ignores
  {
    ignores: ['dist/', 'node_modules/', '*.js', 'coverage/'],
  },
];

console.log('ESLint config entries:', eslintConfig.length);
eslintConfig.forEach((entry, i) => {
  console.log(\`  [\${i}]: \${entry.name || (entry.ignores ? 'ignores' : 'custom rules')}\`);
});`,
          hints: [
            'The flat config format uses an array of config objects, each applying to specific files',
            'Type-aware linting needs languageOptions.parserOptions.projectService: true',
            'Use the ignores property to exclude build output and node_modules directories',
          ],
        },
      },
      {
        id: 'ts-with-bundlers',
        title: 'TypeScript with Bundlers',
        difficulty: 'intermediate',
        tags: ['vite', 'esbuild', 'swc', 'bundler', 'transpile-only'],
        cheatSheetSummary: 'Modern bundlers transpile TS without type checking. Use tsc --noEmit separately.',
        sections: [
          {
            heading: 'Transpile-Only Mode with Bundlers',
            content:
              'Modern bundlers like Vite, esbuild, and swc strip TypeScript types without running the type checker. This makes compilation extremely fast — esbuild can process thousands of files per second. However, it means type errors are not caught during the build. The standard practice is to run tsc --noEmit separately for type checking, either in CI, as a pre-commit hook, or in a parallel terminal. This separation of concerns gives you the best of both worlds: fast builds and thorough type checking.',
            analogy: 'Think of it like a two-pass assembly line: the first pass (esbuild/swc) quickly strips away the packaging (types) and shapes the product (JS), ignoring any defect labels. The second pass (tsc --noEmit) is the quality inspector who carefully checks every label but does not touch the product. Running them in parallel gives you speed and safety.',
            code: `// vite.config.ts — Vite uses esbuild for TS
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],  // uses esbuild under the hood
  // No TypeScript plugin needed — Vite handles .ts natively
});

// tsconfig.json for Vite projects
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "noEmit": true,           // Vite handles emit
    "isolatedModules": true,  // required for esbuild compat
    "strict": true
  }
}

// package.json scripts
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "typecheck": "tsc --noEmit --watch",
    "preview": "vite preview"
  }
}

// Run typecheck in parallel during development:
// Terminal 1: npm run dev
// Terminal 2: npm run typecheck`,
            codeHighlightLines: [17, 18, 27],
            output: `// Build pipeline:
// 1. vite build → esbuild strips types, bundles JS (fast)
// 2. tsc --noEmit → checks types, reports errors (thorough)
// Both can run in parallel in CI`,
            tip: 'Always run tsc --noEmit in your CI pipeline. Bundlers will happily build code with type errors — only tsc catches them.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n    TS[".ts files"] --> ESBUILD["esbuild / swc\\n(strip types, fast)"]\n    TS --> TSC["tsc --noEmit\\n(type check, thorough)"]\n    ESBUILD --> JS[".js bundle\\n(no type errors caught)"]\n    TSC --> ERRS["Type errors\\n(compile-time safety)"]\n    subgraph "Development"\n        DEV1["Terminal 1: vite dev"] ~~~ DEV2["Terminal 2: tsc --noEmit --watch"]\n    end\n    subgraph "CI Pipeline"\n        CI1["tsc --noEmit"] --> CI2["vite build"]\n    end',
              caption: 'Modern workflow separates fast transpilation (esbuild/swc) from thorough type checking (tsc --noEmit). Both run in parallel.',
            },
          },
          {
            heading: 'Limitations of Transpile-Only',
            content:
              'When bundlers strip types without the full TypeScript compiler, certain TypeScript features do not work correctly. Const enums are inlined by tsc but treated as regular enums by esbuild. Namespace merging and legacy decorators may not work as expected. The isolatedModules flag warns you about features that break in transpile-only mode. Understanding these limitations prevents subtle bugs in production.',
            code: `// Features that DO NOT work in transpile-only mode:

// 1. Const enums (esbuild treats as regular enums)
// const enum Direction { Up, Down, Left, Right }
// tsc inlines: const d = 0;
// esbuild emits: const d = Direction.Up; (runtime lookup)

// 2. Namespace merging across files
// Requires cross-file analysis that esbuild cannot do

// 3. Legacy experimental decorators (emitDecoratorMetadata)
// esbuild/swc have partial support but edge cases differ

// Features that WORK fine in transpile-only mode:
// ✓ Type annotations and interfaces (stripped)
// ✓ Enums (non-const)
// ✓ Generics
// ✓ Type guards and narrowing
// ✓ TC39 decorators (stage 3)
// ✓ JSX/TSX
// ✓ Path aliases (with bundler resolution)

// tsconfig.json: enable isolatedModules to catch issues
{
  "compilerOptions": {
    "isolatedModules": true,
    // Warns about:
    // - const enums
    // - re-exporting types without 'type' keyword
    // - files without imports/exports
    "verbatimModuleSyntax": true
    // Enforces 'import type' for type-only imports
  }
}

// Safe alternative to const enum
const Direction = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;
type Direction = (typeof Direction)[keyof typeof Direction];`,
            codeHighlightLines: [25, 30, 36, 37, 38, 39, 40, 41, 42],
            output: `// isolatedModules catches:
// "const enum" usage → error: not compatible
// "export { Type }" → error: use "export type { Type }"`,
            note: 'If you use Vite, esbuild, or swc, always enable isolatedModules and verbatimModuleSyntax to avoid features that break in transpile-only mode.',
          },
        ],
      },
      {
        id: 'migration-from-js',
        title: 'Migrating from JavaScript',
        difficulty: 'intermediate',
        tags: ['migration', 'allowJs', 'checkJs', 'JSDoc', 'gradual-adoption'],
        cheatSheetSummary: 'Migrate gradually: allowJs → checkJs → JSDoc types → rename .js to .ts.',
        sections: [
          {
            heading: 'Gradual Adoption with allowJs',
            content:
              'TypeScript supports a gradual migration strategy that lets you add types incrementally without converting your entire codebase at once. The allowJs option lets TypeScript compile .js files alongside .ts files. The checkJs option enables type checking on .js files using JSDoc annotations. This means you can start getting type safety benefits immediately, converting files to .ts one at a time as your team is ready.',
            analogy: 'Think of it like renovating a house room by room while still living in it: allowJs lets you move into the TypeScript house without forcing you to remodel everything at once. checkJs is like hiring an inspector to review the unrenovated rooms. You upgrade one room (file) at a time, and the house remains livable throughout the process.',
            code: `// Step 1: Add tsconfig.json with allowJs
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "allowJs": true,          // compile JS files
    "checkJs": false,         // don't check JS yet
    "outDir": "./dist",
    "strict": false,          // start lenient
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}

// Step 2: Enable checkJs for type checking JS files
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true            // now JS files are checked
  }
}

// Step 3: Opt out specific files if needed
// Add // @ts-nocheck at top of problematic JS files

// Step 4: Gradually enable strict options
// Start with these (least disruptive):
// "noImplicitAny": false  →  true
// "strictNullChecks": false  →  true
// Then eventually: "strict": true

console.log('Migration started successfully');`,
            codeHighlightLines: [6, 7, 20],
            output: `Migration started successfully`,
            tip: 'Start with the largest, most-imported files first. Converting shared utility modules to .ts gives you the most type coverage for the least effort.',
          },
          {
            heading: 'JSDoc Types for JavaScript Files',
            content:
              'TypeScript can read JSDoc type annotations in JavaScript files when checkJs is enabled. This lets you add types to JavaScript code without renaming files to .ts. JSDoc supports most TypeScript features including generics, union types, type imports, and function overloads. This is a great intermediate step — your code stays valid JavaScript while getting full type checking.',
            code: `// utils.js — fully type-checked via JSDoc

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} [email]  — optional property
 */

/**
 * Creates a new user
 * @param {string} name
 * @param {string} [email]  — optional parameter
 * @returns {User}
 */
function createUser(name, email) {
  return {
    id: crypto.randomUUID(),
    name,
    ...(email ? { email } : {}),
  };
}

/** @type {User[]} */
const users = [];

/**
 * @template T
 * @param {T[]} arr
 * @param {(item: T) => boolean} predicate
 * @returns {T | undefined}
 */
function findItem(arr, predicate) {
  return arr.find(predicate);
}

// Import types from .ts files in JSDoc
/** @type {import('./types').Config} */
const config = { port: 3000 };

console.log(createUser('Alice'));`,
            output: `{ id: "a1b2c3d4-...", name: "Alice" }`,
            note: 'JSDoc types are checked identically to TypeScript annotations. They catch the same errors — the only difference is syntax.',
          },
          {
            heading: 'Renaming .js to .ts',
            content:
              'The final migration step is renaming .js files to .ts (or .jsx to .tsx). Do this file by file, fixing type errors as you go. The key strategy is to start with strict: false and fix easy wins, then progressively enable stricter options. Use the any type as a temporary escape hatch for complex types you will fix later. Track migration progress by counting remaining .js files or using a script to measure type coverage.',
            code: `// Migration checklist for each file:
// 1. Rename: utils.js → utils.ts
// 2. Add parameter types to functions
// 3. Add return types to exported functions
// 4. Replace JSDoc @typedef with interface/type
// 5. Fix any type errors

// Before (utils.js with JSDoc):
/** @param {string} name  @returns {string} */
// function greet(name) { return \`Hello \${name}\`; }

// After (utils.ts):
function greet(name: string): string {
  return \`Hello \${name}\`;
}

// Temporary escape hatches for complex types:
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const legacyData: any = getLegacyData();

// Track migration progress
// find src -name "*.js" | wc -l   → remaining JS files
// find src -name "*.ts" | wc -l   → converted TS files

// package.json script for tracking
// {
//   "scripts": {
//     "migration:status":
//       "echo JS: $(find src -name '*.js' | wc -l)
//              TS: $(find src -name '*.ts' | wc -l)"
//   }
// }

// Progressive strict mode:
// Phase 1: "strict": false, "noImplicitAny": true
// Phase 2: + "strictNullChecks": true
// Phase 3: + "strictFunctionTypes": true
// Phase 4: "strict": true  (all strict flags)

console.log(greet('TypeScript'));`,
            output: `Hello TypeScript`,
            tip: 'Create a @types directory for .d.ts declaration files that describe untyped third-party libraries. This avoids adding any to your code for missing type definitions.',
          },
        ],
      },
      {
        id: 'performance-tips',
        title: 'Performance Tips',
        difficulty: 'intermediate',
        tags: ['performance', 'skipLibCheck', 'incremental', 'project-references', 'build-speed'],
        cheatSheetSummary: 'Speed up TypeScript: skipLibCheck, incremental builds, project references, tsc --noEmit.',
        sections: [
          {
            heading: 'Faster Compilation',
            content:
              'TypeScript compilation speed matters for developer experience and CI times. The most impactful optimizations are skipLibCheck (skip checking .d.ts files), incremental builds (cache previous results), and project references (only rebuild changed packages). Together these can reduce build times from minutes to seconds in large codebases. Measuring with tsc --diagnostics helps identify bottlenecks.',
            analogy: 'Think of it like optimizing a morning commute: skipLibCheck is skipping the traffic-jammed highway (library type checking) and taking a shortcut. Incremental builds are remembering yesterday\'s route (cache) so you do not recalculate everything from scratch. Project references are carpooling (building packages together in the right order) so each car does not duplicate the entire trip.',
            code: `// tsconfig.json — performance-optimized
{
  "compilerOptions": {
    // Skip checking .d.ts files (biggest single speedup)
    "skipLibCheck": true,

    // Cache build results for faster rebuilds
    "incremental": true,
    "tsBuildInfoFile": "./.tsbuildinfo",

    // Separate type checking from emit
    "noEmit": true,             // let bundler handle emit

    // Reduce work
    "isolatedModules": true,    // no cross-file analysis needed
    "disableSourceOfProjectReferenceRedirect": true
  }
}

// Measure compilation time
// tsc --noEmit --diagnostics
// Output:
//   Files:           1,247
//   Lines:           98,432
//   Identifiers:     112,890
//   Symbols:         76,543
//   Types:           23,456
//   Memory used:     198,432K
//   Assignability cache size:  12,345
//   Check time:      4.21s
//   Total time:      5.67s

// tsc --noEmit --extendedDiagnostics  (more detail)
// Shows time spent in each compilation phase

// Trace specific slow types
// tsc --generateTrace ./trace
// Analyze with: chrome://tracing or @typescript/analyze-trace`,
            output: `// Typical speedups:
// skipLibCheck:   30-50% faster
// incremental:    60-80% faster on rebuilds
// project refs:   only rebuild changed packages`,
            tip: 'Run tsc --noEmit --diagnostics to see compilation stats. If "Check time" is high, look for complex conditional types or deeply nested generics.',
          },
          {
            heading: 'Optimizing Type Checking Patterns',
            content:
              'Beyond compiler options, how you write TypeScript affects checking speed. Avoid deeply nested conditional types, prefer interfaces over type intersections (interfaces are cached better), and limit use of complex mapped types in hot paths. For monorepos, project references ensure only changed packages are rechecked. Running tsc --generateTrace helps identify specific types that are slow to check.',
            code: `// SLOW: Deep conditional type chains
// type DeepPartial<T> = T extends object
//   ? { [K in keyof T]?: DeepPartial<T[K]> }
//   : T;
// On large types, this causes exponential checking time

// FASTER: Use interface extends instead of intersections
// Slow:
type SlowUser = BaseUser & { role: string } & { settings: Settings };

// Fast: interfaces are cached by name
interface FastUser extends BaseUser {
  role: string;
  settings: Settings;
}

// Project references for monorepo (build only what changed)
// tsconfig.json (root)
{
  "references": [
    { "path": "./packages/shared" },
    { "path": "./packages/api" },
    { "path": "./packages/web" }
  ]
}
// tsc -b  →  builds in dependency order, skips unchanged

// CI optimization: parallel type checking
// {
//   "scripts": {
//     "typecheck": "tsc -b --force",
//     "typecheck:incremental": "tsc -b",
//     "lint": "eslint . --cache",
//     "ci": "npm run typecheck & npm run lint & wait"
//   }
// }

// Cache .tsbuildinfo in CI for incremental builds
// Use actions/cache with path .tsbuildinfo
// and key based on tsconfig.json hash`,
            codeHighlightLines: [9, 12, 13, 14],
            output: `// Monorepo build with project references:
// tsc -b (first run):  12.3s (full build)
// tsc -b (no changes):  0.2s (cache hit)
// tsc -b (one pkg changed):  1.8s (incremental)`,
            note: 'Cache .tsbuildinfo files in CI to get incremental build benefits across pipeline runs. This can reduce CI type-check time by 70% or more.',
          },
        ],
      },
      {
        id: 'ts-node-and-runners',
        title: 'Running TypeScript',
        difficulty: 'intermediate',
        tags: ['ts-node', 'tsx', 'bun', 'deno', 'runtime', 'execution'],
        cheatSheetSummary: 'Run TS directly: tsx (fastest Node), Bun (native TS), Deno (native TS), ts-node (legacy).',
        sections: [
          {
            heading: 'TypeScript Runners for Node.js',
            content:
              'Several tools let you run TypeScript files directly without a separate compile step. tsx is the fastest Node.js-based runner, using esbuild for near-instant transpilation. ts-node is the older standard that supports full type checking but is slower. Node.js 22+ has experimental --experimental-strip-types flag for native TS support. For development and scripts, tsx is the recommended choice due to its speed and zero-config setup.',
            analogy: 'Think of it like different ways to read a foreign-language book: ts-node is like hiring a meticulous translator who checks every grammar rule before reading each page (slow but thorough). tsx is like wearing real-time translation glasses that instantly convert text as you scan it (fast, no grammar check). Bun and Deno are like being natively bilingual and reading without any translation step at all.',
            code: `// tsx — fastest Node.js TS runner (recommended)
// npm install -D tsx
// npx tsx src/script.ts
// npx tsx --watch src/server.ts  (watch mode)

// ts-node — traditional runner with type checking
// npm install -D ts-node
// npx ts-node src/script.ts
// npx ts-node --esm src/script.ts  (for ESM projects)

// Node.js 22+ native TypeScript (experimental)
// node --experimental-strip-types src/script.ts

// package.json scripts
{
  "scripts": {
    "dev": "tsx --watch src/server.ts",
    "start": "node dist/server.js",
    "script": "tsx src/scripts/seed.ts",
    "test": "tsx --test src/**/*.test.ts"
  }
}

// ts-node config in tsconfig.json
{
  "ts-node": {
    "esm": true,
    "transpileOnly": true,
    "compilerOptions": {
      "module": "ESNext",
      "moduleResolution": "bundler"
    }
  }
}

// tsx requires no configuration — just works
console.log('Running TypeScript directly!');`,
            output: `Running TypeScript directly!`,
            tip: 'Use tsx for development scripts and local development servers. It is 10-50x faster than ts-node because it uses esbuild and skips type checking.',
          },
          {
            heading: 'Bun and Deno — Native TypeScript Runtimes',
            content:
              'Bun and Deno are alternative JavaScript runtimes that support TypeScript natively without any configuration or additional tools. Bun uses its own transpiler written in Zig for extremely fast startup. Deno has a built-in TypeScript compiler and also performs type checking by default. Both runtimes are increasingly used for scripts, APIs, and full applications, offering a simpler developer experience compared to the Node.js + bundler + runner stack.',
            code: `// Bun — native TypeScript support, fastest startup
// bun run src/server.ts
// bun --watch src/server.ts
// bun test                    (built-in test runner)
// bun build src/index.ts --outdir ./dist

// Bun reads tsconfig.json automatically
// No additional config needed for most projects

// Deno — native TypeScript with permissions
// deno run src/server.ts
// deno run --allow-net --allow-read src/server.ts
// deno check src/server.ts    (type-check without running)
// deno test                   (built-in test runner)

// Deno config (deno.json)
{
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  },
  "imports": {
    "std/": "https://deno.land/std@0.220.0/"
  }
}

// Speed comparison (hello world):
// tsx:      ~120ms startup
// ts-node:  ~800ms startup
// bun:      ~20ms startup
// deno:     ~30ms startup
// node (compiled JS): ~30ms startup

console.log('TypeScript runs everywhere!');`,
            output: `TypeScript runs everywhere!`,
            note: 'Bun and Deno strip types without type checking by default (like esbuild). Use "deno check" or "tsc --noEmit" for type verification in CI.',
          },
        ],
      },
    ],
  },
];

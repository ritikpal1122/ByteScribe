import type { DocCategory } from './types';

// Part 1: Getting Started + Basic Types
export const TS_PART1_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Getting Started                                              */
  /* ------------------------------------------------------------ */
  {
    id: 'ts-getting-started',
    label: 'Getting Started',
    icon: 'Rocket',
    entries: [
      {
        id: 'what-is-typescript',
        title: 'What is TypeScript',
        difficulty: 'beginner',
        tags: ['intro', 'basics', 'microsoft', 'typed', 'superset'],
        cheatSheetSummary: 'Typed superset of JavaScript by Microsoft that compiles to plain JS.',
        sections: [
          {
            heading: 'What is TypeScript?',
            content:
              'Imagine writing JavaScript but with a helpful assistant looking over your shoulder, catching mistakes before they ever reach your users. That is TypeScript in a nutshell. Developed by Microsoft and first released in 2012, TypeScript is a statically typed superset of JavaScript -- meaning every valid JavaScript program is already valid TypeScript. You simply layer on optional type annotations, interfaces, generics, and other features that catch bugs at compile time instead of at runtime. When you are done, TypeScript compiles (or "transpiles") everything down to plain JavaScript that runs anywhere JS does: browsers, Node.js, Deno, Bun, serverless functions, you name it. It is no wonder TypeScript consistently ranks among the top five most-loved languages in developer surveys. The key insight here is that TypeScript does not replace JavaScript -- it supercharges it.',
            code: `// A simple TypeScript file (greet.ts)
// Type annotations tell the compiler what types to expect
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// The compiler catches errors before runtime
const message: string = greet('TypeScript');
console.log(message);

// This would cause a compile-time error:
// greet(42); // Error: Argument of type 'number'
//            // is not assignable to parameter of type 'string'`,
            output: `Hello, TypeScript!`,
            tip: 'TypeScript is purely a development-time tool. All type annotations are completely stripped away during compilation, so there is zero runtime overhead -- your users download the same lean JavaScript they always would.',
            analogy: 'Think of it like a spell-checker for your code: it catches mistakes while you write, but the published document (the JavaScript output) is clean text with no red squiggly lines baked in.',
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    A["greet.ts\\n(TypeScript Source)"] -->|tsc compile| B["greet.js\\n(Plain JavaScript)"]
    B --> C["Browser"]
    B --> D["Node.js"]
    B --> E["Deno / Bun"]
    style A fill:#3178c6,color:#fff
    style B fill:#f7df1e,color:#000
    style C fill:#e8e8e8,color:#000
    style D fill:#68a063,color:#fff
    style E fill:#e8e8e8,color:#000`,
              caption: 'TypeScript compiles to plain JavaScript that runs anywhere JS does',
            },
          },
          {
            heading: 'Why TypeScript?',
            content:
              'Let\'s be honest: if you have ever spent an afternoon debugging a "cannot read property of undefined" error in JavaScript, you already know why TypeScript exists. TypeScript gives you a robust type system that acts like a safety net for your codebase, and the bigger the codebase, the more valuable that net becomes. But the benefits go beyond catching bugs. Your IDE transforms into a superpower -- autocompletion becomes eerily accurate, refactoring works across thousands of files with confidence, and inline documentation appears as you type. Think of it this way: in plain JavaScript, your editor is guessing about your code. With TypeScript, it actually understands it. That is why virtually every major framework has embraced TypeScript. Angular was built in it from the start. Vue 3 rewrote its core in TypeScript. SvelteKit and most React projects use it by default. The ecosystem has spoken, and the verdict is clear.',
            code: `// TypeScript enables powerful IDE features and catches bugs early

interface User {
  id: number;
  name: string;
  email: string;
}

function sendWelcomeEmail(user: User): void {
  // IDE autocompletes user.id, user.name, user.email
  console.log(\`Sending email to \${user.email}\`);
  console.log(\`Welcome, \${user.name}! Your ID is \${user.id}\`);
}

const alice: User = { id: 1, name: 'Alice', email: 'alice@example.com' };
sendWelcomeEmail(alice);

// Compile-time error: Property 'username' does not exist on type 'User'
// console.log(alice.username);`,
            output: `Sending email to alice@example.com
Welcome, Alice! Your ID is 1`,
            note: 'TypeScript adds absolutely no new runtime behavior to your code. It is a purely compile-time layer -- once the types are checked, they vanish from the output. Your runtime performance is identical to hand-written JavaScript.',
            codeHighlightLines: [3, 4, 5, 6, 7, 9],
          },
          {
            heading: 'TypeScript vs JavaScript',
            content:
              'Coming from JavaScript, you might wonder: "Why add all this extra syntax?" Here is the core difference. JavaScript uses dynamic typing -- types are checked when the code actually runs, which means bugs hide until your users trigger them. TypeScript adds static typing -- types are checked before the code runs, which means bugs are caught while you are still writing the code. Think of it like a spell-checker for a document: you could publish without one and hope for the best, or you could catch the typos before anyone reads it. The beautiful part? You do not have to go all-in overnight. Since any JavaScript code is already valid TypeScript, you can adopt it file by file. Rename `.js` to `.ts`, fix the errors the compiler flags, and move on. Many teams start by adding types to just their most critical modules and expand from there. TypeScript meets you where you are.',
            code: `// JavaScript — errors only discovered at runtime
// function add(a, b) { return a + b; }
// add('5', 3);  // Returns '53' — silent bug!

// TypeScript — errors caught at compile time
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(5, 3));    // 8
// add('5', 3);            // Compile error!

// Gradual adoption: start with 'any' and tighten over time
let legacy: any = 'I could be anything';
legacy = 42;     // no error with 'any'
legacy = true;   // still no error

// Then progressively add types
let strict: string = 'I am always a string';
console.log(strict.toUpperCase());`,
            output: `8
I AM ALWAYS A STRING`,
            tip: 'You do not need to convert an entire project at once. The most successful TypeScript migrations are gradual -- rename files from `.js` to `.ts` one at a time, fix what the compiler flags, and let momentum build. Teams typically see immediate value from even partial adoption.',
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    subgraph JS["JavaScript (Dynamic Typing)"]
        A1["Write Code"] --> A2["Run Code"]
        A2 --> A3{"Bug?"}
        A3 -->|Yes| A4["Runtime Error 💥\\nUser sees crash"]
        A3 -->|No| A5["Works ✓"]
    end
    subgraph TS["TypeScript (Static Typing)"]
        B1["Write Code"] --> B2["Compile"]
        B2 --> B3{"Type Error?"}
        B3 -->|Yes| B4["Compile Error\\nDev fixes immediately"]
        B3 -->|No| B5["Run Code ✓"]
    end
    style JS fill:#f7df1e22,stroke:#f7df1e
    style TS fill:#3178c622,stroke:#3178c6`,
              caption: 'JavaScript catches bugs at runtime; TypeScript catches them at compile time',
            },
          },
        ],
        quiz: [
          {
            question: 'What is TypeScript\'s relationship to JavaScript?',
            options: [
              'TypeScript is a completely different language that compiles to JavaScript',
              'TypeScript is a statically typed superset of JavaScript',
              'TypeScript replaces JavaScript at runtime',
              'TypeScript is a JavaScript framework like React or Angular',
            ],
            correctIndex: 1,
            explanation: 'TypeScript is a statically typed superset of JavaScript, meaning every valid JavaScript program is already valid TypeScript. It adds optional type annotations and compiles down to plain JavaScript.',
          },
          {
            question: 'What happens to TypeScript type annotations at runtime?',
            options: [
              'They are preserved and checked at runtime',
              'They are converted to runtime validation code',
              'They are completely stripped away during compilation',
              'They are stored as metadata in the JavaScript output',
            ],
            correctIndex: 2,
            explanation: 'TypeScript is purely a development-time tool. All type annotations are completely stripped away during compilation, resulting in zero runtime overhead.',
          },
          {
            question: 'How does TypeScript catch bugs differently from JavaScript?',
            options: [
              'TypeScript catches bugs at runtime using type guards',
              'TypeScript catches bugs at compile time before the code runs',
              'TypeScript uses runtime assertions to catch bugs',
              'TypeScript does not catch bugs, it only adds documentation',
            ],
            correctIndex: 1,
            explanation: 'TypeScript uses static typing to check types at compile time, catching bugs before the code ever runs, unlike JavaScript which discovers type errors at runtime.',
          },
        ],
        challenge: {
          prompt: 'Create a TypeScript function called "introduce" that takes a name (string) and age (number) as parameters and returns a greeting string. Then call it and log the result.',
          starterCode: `// Create a function that takes a name and age and returns a greeting
// function introduce(...) { ... }

// Call the function and log the result
`,
          solutionCode: `function introduce(name: string, age: number): string {
  return \`Hi, I'm \${name} and I'm \${age} years old.\`;
}

const result: string = introduce('Alice', 30);
console.log(result);`,
          hints: [
            'Use type annotations after each parameter name with a colon, e.g., name: string',
            'Add a return type annotation after the closing parenthesis of the parameters',
            'Use a template literal (backticks) to build the greeting string',
          ],
        },
      },
      {
        id: 'setup-and-installation',
        title: 'Setup & Installation',
        difficulty: 'beginner',
        tags: ['install', 'npm', 'tsc', 'ts-node', 'compiler', 'setup'],
        cheatSheetSummary: 'npm install typescript, compile with tsc, run directly with ts-node or tsx.',
        sections: [
          {
            heading: 'Installing TypeScript',
            content:
              'Getting started with TypeScript is refreshingly simple -- if you have Node.js installed, you are two commands away from writing your first typed program. TypeScript is distributed as an npm package, and the recommended approach is to install it locally as a dev dependency so every team member uses the same version. The package includes `tsc`, the TypeScript compiler, which transforms your `.ts` files into plain `.js` files. For quick experimentation without a compilation step, tools like `ts-node` and `tsx` let you run TypeScript files directly. And if you are starting a new project with a modern framework like Next.js, Vite, or Angular, TypeScript support is baked in from the start -- you may not even need to set it up manually.',
            code: `# Install TypeScript as a dev dependency (recommended)
npm install --save-dev typescript

# Or install globally for CLI access
npm install -g typescript

# Check the installed version
npx tsc --version
# Output: Version 5.7.2

# Initialize a new TypeScript project (creates tsconfig.json)
npx tsc --init

# Compile a single file
npx tsc hello.ts        # produces hello.js

# Compile the entire project (uses tsconfig.json)
npx tsc

# Watch mode — recompile on file changes
npx tsc --watch`,
            output: `Version 5.7.2
Created a new tsconfig.json with:
  target: es2016
  module: commonjs
  strict: true`,
            tip: 'Always install TypeScript as a local dev dependency (`--save-dev`) rather than globally. This ensures every team member and your CI pipeline use exactly the same compiler version, avoiding those maddening "it works on my machine" moments.',
          },
          {
            heading: 'Running TypeScript Directly',
            content:
              'While `tsc` compiles TypeScript to JavaScript, you do not always want a two-step process during development. That is where direct execution tools come in. The `tsx` package (not to be confused with the `.tsx` JSX file extension) is the modern go-to runner. It offers fast startup times, excellent ESM support, and a built-in watch mode -- think of it as the successor to `ts-node`. For even more speed, Bun has native TypeScript support built right in with zero configuration. These tools are perfect for development servers, one-off scripts, and rapid prototyping. When it comes time to ship production code, you will still want `tsc` to generate optimized JavaScript output.',
            code: `# Install tsx (recommended modern runner)
npm install --save-dev tsx

# Run a TypeScript file directly
npx tsx hello.ts

# Watch mode with tsx
npx tsx watch server.ts

# Alternative: ts-node (older, still widely used)
npm install --save-dev ts-node
npx ts-node hello.ts

# Bun has native TypeScript support
bun run hello.ts

# Using tsx in package.json scripts
# {
#   "scripts": {
#     "dev": "tsx watch src/server.ts",
#     "start": "node dist/server.js",
#     "build": "tsc",
#     "typecheck": "tsc --noEmit"
#   }
# }`,
            output: `Hello, TypeScript!`,
            tip: 'Add `"typecheck": "tsc --noEmit"` to your `package.json` scripts and run it in your CI pipeline. This validates every type in your project without producing output files, catching errors before they reach production.',
          },
          {
            heading: 'Project Structure',
            content:
              'A well-organized TypeScript project follows a simple convention: source files live in `src/`, compiled output goes to `dist/` (or `build/`), and the `tsconfig.json` file at the root configures everything. This separation keeps your repository clean -- you can gitignore the entire output directory since it is regenerated on every build. One thing that trips up newcomers is type declaration files (`.d.ts`). These describe the shape of JavaScript libraries that were not written in TypeScript. The good news? The `@types` scope on npm hosts community-maintained declarations for thousands of popular packages, so `npm install --save-dev @types/express` is usually all you need. Many modern libraries ship their own type declarations built-in, so check the package first before reaching for `@types`.',
            code: `// Typical TypeScript project structure
// my-project/
// ├── src/
// │   ├── index.ts        ← entry point
// │   ├── utils.ts         ← utility functions
// │   └── types.ts         ← shared type definitions
// ├── dist/                ← compiled JS output (gitignored)
// ├── node_modules/
// ├── tsconfig.json        ← compiler configuration
// ├── package.json
// └── .gitignore

// Installing type declarations for JS libraries
// npm install --save-dev @types/node     (Node.js APIs)
// npm install --save-dev @types/express  (Express framework)
// npm install --save-dev @types/lodash   (Lodash utility)

// src/index.ts
import { formatDate } from './utils';

const today: Date = new Date();
console.log(formatDate(today));

// src/utils.ts
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}`,
            output: `2025-01-15`,
            note: 'Many modern packages ship their own type declarations (look for a `"types"` or `"typings"` field in their `package.json`). You only need `@types/*` packages for libraries that do not bundle their own types. When in doubt, try importing the library first -- TypeScript will tell you if types are missing.',
          },
        ],
        quiz: [
          {
            question: 'What is the recommended way to install TypeScript for a project?',
            options: [
              'Install it globally with npm install -g typescript',
              'Install it as a dev dependency with npm install --save-dev typescript',
              'Download the TypeScript binary from the official website',
              'TypeScript comes pre-installed with Node.js',
            ],
            correctIndex: 1,
            explanation: 'Installing TypeScript as a local dev dependency (--save-dev) ensures every team member and CI pipeline use exactly the same compiler version, avoiding version mismatch issues.',
          },
          {
            question: 'Which tool is the recommended modern way to run TypeScript files directly without a separate compilation step?',
            options: [
              'tsc --run',
              'node --typescript',
              'tsx',
              'npm run typescript',
            ],
            correctIndex: 2,
            explanation: 'The tsx package is the modern go-to runner for executing TypeScript files directly. It offers fast startup times, excellent ESM support, and a built-in watch mode.',
          },
          {
            question: 'What does the command "npx tsc --init" do?',
            options: [
              'Installs TypeScript globally',
              'Compiles all TypeScript files in the project',
              'Creates a new tsconfig.json configuration file',
              'Initializes a new npm project with TypeScript',
            ],
            correctIndex: 2,
            explanation: 'Running npx tsc --init creates a new tsconfig.json file with default compiler options, which serves as the configuration center for your TypeScript project.',
          },
        ],
        challenge: {
          prompt: 'Create a TypeScript utility file (utils.ts) that exports a function called "capitalize" which takes a string parameter and returns the string with its first letter capitalized. Then create an index.ts that imports and uses it.',
          starterCode: `// utils.ts
// Export a function that capitalizes the first letter of a string

// index.ts
// Import the capitalize function and use it
`,
          solutionCode: `// utils.ts
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// index.ts
import { capitalize } from './utils';

const greeting: string = capitalize('hello typescript');
console.log(greeting); // Hello typescript`,
          hints: [
            'Use the export keyword before the function declaration to make it importable',
            'Use str.charAt(0).toUpperCase() to capitalize the first character and str.slice(1) to get the rest',
            'Use a named import with curly braces: import { capitalize } from "./utils"',
          ],
        },
      },
      {
        id: 'hello-world-ts',
        title: 'Hello World',
        difficulty: 'beginner',
        crossLanguageId: 'hello-world',
        tags: ['hello-world', 'first-program', 'compilation', 'basics'],
        cheatSheetSummary: 'Write .ts file with type annotations, compile with tsc, run the .js output.',
        sections: [
          {
            heading: 'Your First TypeScript Program',
            content:
              'Let\'s write your first TypeScript program, and I promise it will feel familiar. If you know JavaScript, you already know TypeScript -- you are just adding a few annotations. Create a file with a `.ts` extension, sprinkle in some type annotations to tell the compiler what you expect, and you are done. The beauty of this first example is how little changes from JavaScript. The `: string` after `name` is your way of saying "this parameter must be a string." The `: void` after the function parentheses says "this function does not return anything." These annotations are the entire difference between TypeScript and JavaScript -- and they are what give you superpowers.',
            code: `// hello.ts — your first TypeScript file
const greeting: string = 'Hello, TypeScript!';
console.log(greeting);

// A typed function
function sayHello(name: string, times: number): void {
  for (let i = 0; i < times; i++) {
    console.log(\`Hello, \${name}!\`);
  }
}

sayHello('World', 3);

// Compile and run:
// npx tsc hello.ts      → produces hello.js
// node hello.js          → runs the output
// Or run directly:
// npx tsx hello.ts`,
            output: `Hello, TypeScript!
Hello, World!
Hello, World!
Hello, World!`,
            tip: 'During development, skip the compilation step entirely and run TypeScript files directly with `npx tsx hello.ts`. Save `tsc` for when you need to produce distributable JavaScript for production.',
          },
          {
            heading: 'What the Compiler Produces',
            content:
              'Here is something that surprises many newcomers: the JavaScript that `tsc` produces looks almost identical to what you wrote. The compiler simply strips away all the type annotations, interfaces, and type aliases -- they vanish completely. No runtime library gets bundled in. No performance overhead is added. The output is clean, readable JavaScript that any developer could maintain. This is by design. TypeScript is not a new language that compiles to JavaScript (like CoffeeScript was). It is JavaScript with a type layer on top, and that layer exists solely at compile time. One bonus: the compiler can also "downlevel" modern syntax to older JavaScript versions, so you can write cutting-edge code while supporting legacy browsers.',
            code: `// INPUT: hello.ts
function add(a: number, b: number): number {
  return a + b;
}

interface Point {
  x: number;
  y: number;
}

const origin: Point = { x: 0, y: 0 };
console.log(add(origin.x, origin.y));

// OUTPUT: hello.js (after tsc compilation)
// "use strict";
// function add(a, b) {
//     return a + b;
// }
// const origin = { x: 0, y: 0 };
// console.log(add(origin.x, origin.y));

// Notice: all type annotations and the interface are gone!
// The output is clean, readable JavaScript.
console.log('Types are erased at compile time');`,
            output: `0
Types are erased at compile time`,
            note: 'TypeScript interfaces and type aliases produce absolutely zero JavaScript output. They are compile-time-only constructs that exist purely to help you write correct code. This is what makes TypeScript a "zero-cost abstraction" -- the types help during development but have no runtime footprint.',
            codeHighlightLines: [2, 6, 7, 8, 11],
          },
        ],
        quiz: [
          {
            question: 'What happens to TypeScript interfaces in the compiled JavaScript output?',
            options: [
              'They are converted to JavaScript classes',
              'They are preserved as runtime objects',
              'They are completely removed and produce zero JavaScript output',
              'They are converted to JSON Schema definitions',
            ],
            correctIndex: 2,
            explanation: 'TypeScript interfaces and type aliases are compile-time-only constructs. They are completely stripped away during compilation and produce absolutely zero JavaScript output.',
          },
          {
            question: 'What is the file extension for TypeScript source files?',
            options: [
              '.typescript',
              '.tsc',
              '.ts',
              '.type',
            ],
            correctIndex: 2,
            explanation: 'TypeScript files use the .ts extension (or .tsx for files containing JSX). The compiler processes these files and outputs .js files.',
          },
          {
            question: 'Which command compiles a TypeScript file and produces a JavaScript file?',
            options: [
              'node hello.ts',
              'npx tsc hello.ts',
              'npm compile hello.ts',
              'typescript build hello.ts',
            ],
            correctIndex: 1,
            explanation: 'The TypeScript compiler (tsc) is used to compile .ts files into .js files. Running "npx tsc hello.ts" compiles hello.ts and produces hello.js.',
          },
        ],
        challenge: {
          prompt: 'Write a TypeScript program that defines an interface called "Book" with properties title (string), author (string), and pages (number). Create a function called "summarize" that takes a Book and returns a formatted summary string. Create a book object and log its summary.',
          starterCode: `// Define a Book interface
// interface Book { ... }

// Create a summarize function that takes a Book and returns a string
// function summarize(...) { ... }

// Create a book and log its summary
`,
          solutionCode: `interface Book {
  title: string;
  author: string;
  pages: number;
}

function summarize(book: Book): string {
  return \`"\${book.title}" by \${book.author} (\${book.pages} pages)\`;
}

const myBook: Book = { title: 'TypeScript Handbook', author: 'Microsoft', pages: 350 };
console.log(summarize(myBook));
// Output: "TypeScript Handbook" by Microsoft (350 pages)`,
          hints: [
            'An interface defines the shape of an object with property names and their types',
            'The function parameter should be typed as Book, and the return type should be string',
            'Use template literals (backticks) to build the formatted summary string',
          ],
        },
      },
      {
        id: 'tsconfig-json',
        title: 'tsconfig.json',
        difficulty: 'beginner',
        tags: ['tsconfig', 'compiler-options', 'configuration', 'strict', 'target', 'module'],
        cheatSheetSummary: 'Configure the compiler with target, module, strict, outDir, and other key options.',
        sections: [
          {
            heading: 'Essential Compiler Options',
            content:
              'Think of `tsconfig.json` as the control center for your TypeScript project. It tells the compiler which files to include, what JavaScript version to target, how strictly to check your types, and where to put the output. Let\'s walk through the options that matter most. The `"target"` option sets the ECMAScript version for your output -- `ES2022` is a solid modern default that covers async/await, optional chaining, and most features you would want. The `"module"` option determines the module system -- use `NodeNext` for Node.js projects or `ESNext` for bundled frontend projects. And then there is `"strict"` -- the single most important option. Setting it to `true` enables a collection of strict checks that catch the most bugs. If you take one thing away from this section, let it be this: always enable strict mode in new projects.',
            code: `// tsconfig.json — recommended starting configuration
{
  "compilerOptions": {
    // JavaScript version for output
    "target": "ES2022",

    // Module system
    "module": "NodeNext",
    "moduleResolution": "NodeNext",

    // Enable all strict type checks (highly recommended)
    "strict": true,

    // Output directory for compiled files
    "outDir": "./dist",
    "rootDir": "./src",

    // Allow importing .json files
    "resolveJsonModule": true,

    // Ensure each file can be safely transpiled in isolation
    "isolatedModules": true,

    // Skip type-checking node_modules for speed
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}`,
            tip: 'Always enable `"strict": true` in new projects. It activates `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, and several other checks that collectively catch the vast majority of type-related bugs. Turning it on from the start is far easier than retrofitting it later.',
            analogy: 'Think of it like the settings panel on a camera: target is your resolution, module is the file format, and strict is auto-focus -- you almost always want it on, and turning it off only makes sense when you have a very specific reason.',
          },
          {
            heading: 'What "strict" Enables',
            content:
              'When you set `"strict": true`, you are actually flipping on a collection of individual strict checks all at once. Let\'s demystify the most impactful ones. First, `strictNullChecks` -- this is the single most valuable check in all of TypeScript. It means `null` and `undefined` are no longer silently assignable to every type, so you must handle them explicitly. No more "cannot read property of undefined" surprises. Second, `noImplicitAny` -- if TypeScript cannot figure out a type and you have not annotated one, it flags an error instead of silently falling back to `any`. Third, `strictFunctionTypes` -- it ensures function parameter types are checked correctly, closing a subtle but dangerous loophole. You can also enable or disable each check individually, which is invaluable when migrating an existing JavaScript codebase where turning everything on at once would produce an overwhelming number of errors.',
            code: `// With strict: true, these are all enabled:

// strictNullChecks — null/undefined must be handled explicitly
function getLength(str: string | null): number {
  // return str.length;  // Error: 'str' is possibly 'null'
  if (str === null) return 0;
  return str.length;     // OK — null is narrowed out
}

// noImplicitAny — must annotate when types can't be inferred
// function log(value) {}  // Error: Parameter 'value' implicitly has 'any'
function log(value: unknown): void {
  console.log(value);
}

// strictFunctionTypes — safer function type checks
type Handler = (event: MouseEvent) => void;
// const handler: Handler = (e: Event) => {};  // Error!

// noImplicitReturns — all code paths must return
function divide(a: number, b: number): number {
  if (b === 0) return 0;   // must handle all paths
  return a / b;
}

console.log(getLength('hello'));
console.log(getLength(null));
console.log(divide(10, 3));`,
            output: `5
0
3.3333333333333335`,
            warning: 'Turning on strict mode in a large existing JavaScript project can produce hundreds or even thousands of errors. Do not panic -- migrate gradually by enabling individual checks one at a time. Start with `strictNullChecks` (the highest-value check), fix those errors, then enable `noImplicitAny`, and so on.',
            codeHighlightLines: [4, 6, 7, 12, 21, 22],
          },
          {
            heading: 'Advanced Options and Project References',
            content:
              'Once you are comfortable with the basics, `tsconfig.json` has deeper features that become essential as your project grows. Path aliases let you write clean imports like `import { User } from \'@/models\'` instead of navigating a maze of `../../../models/User`. Declaration file generation (`"declaration": true`) is crucial if you are building a library that others will consume. Source maps connect the compiled JavaScript back to your original TypeScript for seamless debugging. And for monorepos, project references let you split a large codebase into smaller sub-projects that build independently and incrementally -- a massive win for build times. These are not features you need on day one, but knowing they exist means you will not hit a wall as your project scales.',
            code: `// Advanced tsconfig.json options
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",

    // Path aliases — cleaner imports
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@models/*": ["./src/models/*"],
      "@utils/*": ["./src/utils/*"]
    },

    // Generate .d.ts declaration files (for libraries)
    "declaration": true,
    "declarationMap": true,

    // Source maps for debugging
    "sourceMap": true,

    // Allow default imports from CommonJS modules
    "esModuleInterop": true,

    // React JSX support
    "jsx": "react-jsx"
  },
  // Project references for monorepos
  "references": [
    { "path": "./packages/shared" },
    { "path": "./packages/server" }
  ]
}`,
            tip: 'Path aliases (`@/` prefix) are a game-changer for readability, replacing deeply nested imports like `"../../../models/User"`. Just remember to configure your bundler (Vite, webpack) or runtime (tsx, ts-node) to resolve the same aliases -- TypeScript path mappings only affect type checking, not module resolution at runtime.',
          },
        ],
        quiz: [
          {
            question: 'What does the "strict" option in tsconfig.json do?',
            options: [
              'It enables only strictNullChecks',
              'It enables a collection of strict type-checking options all at once',
              'It prevents any use of the any type',
              'It makes all variables immutable',
            ],
            correctIndex: 1,
            explanation: 'Setting "strict": true enables a collection of individual strict checks including strictNullChecks, noImplicitAny, strictFunctionTypes, and several others that collectively catch the most type-related bugs.',
          },
          {
            question: 'What does the "target" option in tsconfig.json control?',
            options: [
              'The browser to deploy to',
              'The ECMAScript version of the compiled JavaScript output',
              'The TypeScript version to use',
              'The operating system to target',
            ],
            correctIndex: 1,
            explanation: 'The "target" option sets the ECMAScript version for the compiled JavaScript output. For example, ES2022 supports modern features like async/await and optional chaining.',
          },
          {
            question: 'What are path aliases in tsconfig.json used for?',
            options: [
              'Renaming TypeScript files during compilation',
              'Creating shorter, cleaner import paths instead of deeply nested relative paths',
              'Aliasing npm package names',
              'Mapping TypeScript files to JavaScript output files',
            ],
            correctIndex: 1,
            explanation: 'Path aliases let you write clean imports like "@/models/User" instead of navigating relative paths like "../../../models/User", improving code readability.',
          },
          {
            question: 'Which strict check prevents null and undefined from being silently assignable to every type?',
            options: [
              'noImplicitAny',
              'strictFunctionTypes',
              'strictNullChecks',
              'noImplicitReturns',
            ],
            correctIndex: 2,
            explanation: 'strictNullChecks is the single most valuable strict check. It ensures null and undefined are not silently assignable to every type, forcing you to handle them explicitly.',
          },
        ],
        challenge: {
          prompt: 'Write a function called "safeGet" that takes a value of type string | null and a default value of type string. If the value is null, return the default; otherwise return the value uppercased. Use strictNullChecks-compatible code with proper null handling.',
          starterCode: `// Write a function that safely handles a nullable string
// It should return the uppercased value, or the default if null

// function safeGet(...): string { ... }

// Test it:
// console.log(safeGet('hello', 'default'));  // HELLO
// console.log(safeGet(null, 'default'));      // default
`,
          solutionCode: `function safeGet(value: string | null, defaultValue: string): string {
  if (value === null) {
    return defaultValue;
  }
  return value.toUpperCase();
}

console.log(safeGet('hello', 'default'));  // HELLO
console.log(safeGet(null, 'default'));      // default
console.log(safeGet('typescript', 'N/A')); // TYPESCRIPT`,
          hints: [
            'The first parameter should have type string | null to accept both strings and null',
            'Use an if check for null before calling string methods like toUpperCase()',
            'TypeScript narrows the type inside the if block, so after checking for null, the value is known to be string',
          ],
        },
      },
    ],
  },
  /* ------------------------------------------------------------ */
  /*  Basic Types                                                  */
  /* ------------------------------------------------------------ */
  {
    id: 'ts-basic-types',
    label: 'Basic Types',
    icon: 'Box',
    entries: [
      {
        id: 'type-annotations',
        title: 'Type Annotations',
        difficulty: 'beginner',
        tags: ['annotations', 'string', 'number', 'boolean', 'types', 'variables'],
        cheatSheetSummary: 'Add : type after variables, parameters, and return types to annotate explicitly.',
        sections: [
          {
            heading: 'Annotating Variables',
            content:
              'Type annotations are the bread and butter of TypeScript. The syntax is simple: after a variable name, add a colon and the type. That is it. Think of it like labeling containers in your kitchen -- you are telling yourself (and the compiler) exactly what goes inside. The three most common primitive types are `string`, `number`, and `boolean`, and here is a crucial detail: they are all lowercase. Do not confuse them with the uppercase JavaScript wrapper objects (`String`, `Number`, `Boolean`), which are something else entirely and should never be used as type annotations. Once you annotate a variable, TypeScript becomes your guardian. Try to assign a number to a string variable? The compiler catches it instantly. This might feel restrictive at first, but give it a week -- you will start to appreciate how many subtle bugs it prevents.',
            code: `// Variable annotations: let/const name: type = value
let username: string = 'Alice';
let age: number = 30;
let isActive: boolean = true;

// TypeScript prevents type mismatches
// username = 42;     // Error: Type 'number' is not assignable to type 'string'
// age = 'thirty';    // Error: Type 'string' is not assignable to type 'number'
// isActive = 'yes';  // Error: Type 'string' is not assignable to type 'boolean'

// Use lowercase types, not wrapper objects
// let bad: String = 'hello';  // Avoid! Use 'string' not 'String'
let good: string = 'hello';

console.log(\`\${username} is \${age} years old, active: \${isActive}\`);
console.log(typeof username, typeof age, typeof isActive);`,
            output: `Alice is 30 years old, active: true
string number boolean`,
            warning: 'Always use lowercase primitive types: `string`, `number`, `boolean`. The uppercase versions (`String`, `Number`, `Boolean`) are JavaScript wrapper objects -- they behave differently and will cause subtle bugs. This is the single most common TypeScript newbie mistake.',
            codeHighlightLines: [2, 3, 4, 13],
          },
          {
            heading: 'Function Parameter and Return Types',
            content:
              'If there is one place where type annotations deliver the most value, it is functions. Think about it: a function is a contract. It says "give me these inputs, and I will give you this output." Type annotations make that contract explicit and enforceable. Annotate parameters so callers cannot pass the wrong types. Annotate return types so the function cannot accidentally return the wrong thing. Use `void` for functions that do not return a value (like event handlers or loggers), and use the `never` type for functions that never return at all (like error throwers). Optional parameters get a `?` after the parameter name, meaning callers can omit them. This is where TypeScript really starts to feel like a productivity multiplier -- your IDE uses these annotations to give you perfect autocompletion at every call site.',
            code: `// Parameter and return type annotations
function greet(name: string, formal: boolean): string {
  if (formal) {
    return \`Good day, \${name}.\`;
  }
  return \`Hey, \${name}!\`;
}

console.log(greet('Alice', true));
console.log(greet('Bob', false));

// void return — function does not return a value
function logMessage(msg: string): void {
  console.log(\`[LOG] \${msg}\`);
  // no return statement needed
}

logMessage('Server started');

// Arrow function with types
const multiply = (a: number, b: number): number => a * b;
console.log(multiply(6, 7));

// Optional parameters use ?
function createUser(name: string, email?: string): string {
  return email ? \`\${name} <\${email}>\` : name;
}

console.log(createUser('Alice', 'alice@test.com'));
console.log(createUser('Bob'));`,
            output: `Good day, Alice.
Hey, Bob!
[LOG] Server started
42
Alice <alice@test.com>
Bob`,
            tip: 'TypeScript can often infer return types automatically, so you do not always need to annotate them. However, explicitly annotating return types on exported and public functions is a best practice -- it serves as living documentation and catches accidental changes to your API surface.',
            codeHighlightLines: [2, 13, 21, 25],
          },
          {
            heading: 'Object and Array Annotations',
            content:
              'Beyond primitives, TypeScript lets you describe the shape of objects and arrays with precision. You can annotate objects inline by specifying each property and its type inside curly braces -- it looks just like a JavaScript object literal, but with types instead of values. For arrays, add `[]` after the element type (or use the `Array<T>` generic syntax -- both mean the same thing). TypeScript then enforces that every required property exists and every element matches the expected type. For complex shapes that you use more than once, you will want to extract them into a named `interface` or `type` alias (we will cover those soon). But for one-off annotations -- like a function parameter that takes a specific object shape -- inline types are perfectly fine and keep things concise.',
            code: `// Inline object type annotation
let user: { name: string; age: number; active: boolean } = {
  name: 'Alice',
  age: 30,
  active: true,
};

console.log(user.name, user.age);

// Array type annotations (two equivalent syntaxes)
let scores: number[] = [95, 87, 92];
let names: Array<string> = ['Alice', 'Bob', 'Charlie'];

console.log(scores);
console.log(names);

// Array of objects
let users: { id: number; name: string }[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

for (const u of users) {
  console.log(\`#\${u.id}: \${u.name}\`);
}

// Readonly annotation prevents mutation
const config: { readonly host: string; port: number } = {
  host: 'localhost',
  port: 3000,
};
// config.host = '0.0.0.0';  // Error: Cannot assign to 'host' because it is a read-only property
config.port = 8080;  // OK — port is not readonly
console.log(\`\${config.host}:\${config.port}\`);`,
            output: `Alice 30
[ 95, 87, 92 ]
[ 'Alice', 'Bob', 'Charlie' ]
#1: Alice
#2: Bob
localhost:8080`,
            tip: 'If you find yourself writing the same inline object type more than once, that is your cue to extract it into a named `interface` or `type` alias. It improves readability and makes refactoring painless since you change the shape in one place.',
          },
        ],
        quiz: [
          {
            question: 'Which is the correct way to annotate a variable as a string in TypeScript?',
            options: [
              'let name: String = "Alice"',
              'let name: string = "Alice"',
              'let string name = "Alice"',
              'let name = string("Alice")',
            ],
            correctIndex: 1,
            explanation: 'TypeScript uses lowercase primitive types (string, number, boolean). The uppercase versions (String, Number, Boolean) are JavaScript wrapper objects and should never be used as type annotations.',
          },
          {
            question: 'What does the "void" return type indicate on a function?',
            options: [
              'The function returns null',
              'The function returns undefined explicitly',
              'The function does not return a value',
              'The function can return any value',
            ],
            correctIndex: 2,
            explanation: 'The void return type indicates that a function does not return a meaningful value. It is commonly used for functions that perform side effects like logging or event handlers.',
          },
          {
            question: 'How do you mark a function parameter as optional in TypeScript?',
            options: [
              'Add a ? after the parameter name',
              'Wrap the parameter type in Optional<>',
              'Use the optional keyword before the parameter',
              'Set the parameter type to undefined',
            ],
            correctIndex: 0,
            explanation: 'Optional parameters are marked with a ? after the parameter name, like (name: string, email?: string). Callers can omit optional parameters.',
          },
        ],
        challenge: {
          prompt: 'Create a function called "createProfile" that takes a name (string), age (number), and an optional email (string). It should return an object with those properties. Also create a readonly config object with host (string) and port (number) properties.',
          starterCode: `// Create a function that builds a user profile object
// The email parameter should be optional

// function createProfile(...): { name: string; age: number; email?: string } { ... }

// Create a readonly config object
// const config: { readonly host: string; readonly port: number } = ...

// Test:
// console.log(createProfile('Alice', 30, 'alice@test.com'));
// console.log(createProfile('Bob', 25));
// console.log(config);
`,
          solutionCode: `function createProfile(
  name: string,
  age: number,
  email?: string
): { name: string; age: number; email?: string } {
  if (email) {
    return { name, age, email };
  }
  return { name, age };
}

const config: { readonly host: string; readonly port: number } = {
  host: 'localhost',
  port: 3000,
};

console.log(createProfile('Alice', 30, 'alice@test.com'));
console.log(createProfile('Bob', 25));
console.log(config);`,
          hints: [
            'Use ? after the parameter name to make it optional: email?: string',
            'The return type should include email as an optional property with email?: string',
            'Use the readonly modifier before each property name in the config type annotation',
          ],
        },
      },
      {
        id: 'type-inference',
        title: 'Type Inference',
        difficulty: 'beginner',
        tags: ['inference', 'implicit', 'let', 'const', 'contextual'],
        cheatSheetSummary: 'TypeScript automatically infers types from initializers, narrowing, and context.',
        sections: [
          {
            heading: 'How Type Inference Works',
            content:
              'Here is something that surprises many people coming to TypeScript: you do not actually need to annotate every single variable. TypeScript is remarkably smart about figuring out types on its own through a process called type inference. When you write `let count = 42`, TypeScript sees the `42` and automatically infers `count` as `number`. No annotation needed. But there is a subtle and important distinction between `let` and `const`. A `let` variable can be reassigned, so TypeScript infers the general type (`string`, `number`). A `const` can never change, so TypeScript infers the exact literal type (`"hello"`, `42`, `true`). This distinction matters more than you might think -- it affects how values interact with union types and function parameters. The golden rule? Let inference do its job for local variables. Add explicit annotations for function parameters, return types, and anything exported from a module.',
            code: `// TypeScript infers types from initialization
let message = 'hello';     // inferred as string
let count = 42;            // inferred as number
let active = true;         // inferred as boolean

// Hovering over these in your IDE shows the inferred type
// let message: string
// let count: number
// let active: boolean

// const infers narrower literal types
const greeting = 'hello';  // inferred as 'hello' (literal type)
const maxRetries = 3;      // inferred as 3 (literal type)
const enabled = true;      // inferred as true (literal type)

// Return type inference
function add(a: number, b: number) {
  return a + b;  // return type inferred as number
}

const result = add(5, 3);  // result inferred as number
console.log(result);

// Array inference
const numbers = [1, 2, 3];        // inferred as number[]
const mixed = [1, 'hello', true]; // inferred as (string | number | boolean)[]

console.log(typeof message, typeof greeting);
console.log(numbers, mixed);`,
            output: `8
string string
[ 1, 2, 3 ] [ 1, 'hello', true ]`,
            tip: 'Resist the urge to annotate every variable -- that is "over-typing" and it makes your code noisier without adding safety. Let TypeScript infer local variables from their initializers. Save explicit annotations for function signatures, class properties, and exported APIs where the intent needs to be documented.',
            analogy: 'Think of it like a detective examining clues: TypeScript looks at the value you assign and deduces the type, just like a detective deduces the suspect from the evidence. You only need to "tell" it when the clues are ambiguous.',
          },
          {
            heading: 'Contextual Typing',
            content:
              'Contextual typing is one of TypeScript\'s most elegant features, and it is the reason you almost never need to annotate callback parameters. Here is how it works: when TypeScript knows what type a function expects (because of the context it appears in), it automatically infers the types of the parameters you pass. So when you write `names.map(name => name.toUpperCase())`, TypeScript knows `names` is a `string[]`, which means `.map()` expects a callback with a `string` parameter, which means `name` must be a `string`. All of that happens automatically. The same magic applies to event handlers, promise callbacks, array methods, and any function that passes its arguments to a well-typed function. This is why well-typed libraries feel so smooth to use in TypeScript -- the types flow through your code like water.',
            code: `// Contextual typing with array methods
const names = ['Alice', 'Bob', 'Charlie'];

// TypeScript knows 'name' is string from the array type
const upper = names.map(name => name.toUpperCase());
console.log(upper);

// 'n' is inferred as string, 'i' as number
const indexed = names.map((n, i) => \`\${i}: \${n}\`);
console.log(indexed);

// Contextual typing with event handlers (in browser code)
// document.addEventListener('click', event => {
//   console.log(event.clientX);  // event is MouseEvent
// });

// Contextual typing from variable type
type MathFn = (a: number, b: number) => number;

const add: MathFn = (a, b) => a + b;       // a, b inferred as number
const subtract: MathFn = (a, b) => a - b;  // a, b inferred as number

console.log(add(10, 5));
console.log(subtract(10, 5));

// Contextual typing with Promise.all
const results = [1, 2, 3].filter(n => n > 1);  // n inferred as number
console.log(results);`,
            output: `[ 'ALICE', 'BOB', 'CHARLIE' ]
[ '0: Alice', '1: Bob', '2: Charlie' ]
15
5
[ 2, 3 ]`,
            note: 'Contextual typing is why annotating callback parameters is almost always unnecessary (and even discouraged by some linters). The type flows from the outer function signature into the callback automatically. If you find yourself annotating every callback parameter, you are fighting the type system instead of working with it.',
          },
        ],
        quiz: [
          {
            question: 'What type does TypeScript infer for "const greeting = \'hello\'"?',
            options: [
              'string',
              '"hello" (string literal type)',
              'any',
              'String',
            ],
            correctIndex: 1,
            explanation: 'When you use const, TypeScript infers the narrowest possible literal type. Since a const can never be reassigned, "hello" is inferred as the literal type "hello", not the general string type.',
          },
          {
            question: 'What is "contextual typing" in TypeScript?',
            options: [
              'Manually adding type annotations to every variable',
              'TypeScript inferring parameter types from the context where a function is used',
              'Using the typeof operator to check types at runtime',
              'Converting JavaScript files to TypeScript',
            ],
            correctIndex: 1,
            explanation: 'Contextual typing occurs when TypeScript infers the types of callback parameters from the surrounding context. For example, in names.map(name => ...), TypeScript knows name is a string because names is a string array.',
          },
          {
            question: 'What type does TypeScript infer for "let count = 42"?',
            options: [
              '42 (numeric literal type)',
              'any',
              'number',
              'integer',
            ],
            correctIndex: 2,
            explanation: 'With let, TypeScript infers the general type (number) because the variable can be reassigned to any number. This is different from const, which would infer the literal type 42.',
          },
        ],
        challenge: {
          prompt: 'Create a type alias called "MathFn" for a function that takes two numbers and returns a number. Then create three functions (add, subtract, multiply) using this type and demonstrate that TypeScript infers the parameter types from the alias (contextual typing).',
          starterCode: `// Define a MathFn type alias for (a: number, b: number) => number

// Create add, subtract, and multiply using the MathFn type
// Let TypeScript infer parameter types from the alias

// Test each function and log the results
`,
          solutionCode: `type MathFn = (a: number, b: number) => number;

const add: MathFn = (a, b) => a + b;
const subtract: MathFn = (a, b) => a - b;
const multiply: MathFn = (a, b) => a * b;

// TypeScript infers a and b as number from MathFn
console.log(add(10, 5));       // 15
console.log(subtract(10, 5));  // 5
console.log(multiply(10, 5));  // 50

// Bonus: use in an array
const operations: MathFn[] = [add, subtract, multiply];
operations.forEach(op => console.log(op(20, 4)));`,
          hints: [
            'Define the type alias using: type MathFn = (a: number, b: number) => number',
            'When assigning to a variable typed as MathFn, you do not need to annotate the arrow function parameters -- TypeScript infers them',
            'You can store all three functions in an array typed as MathFn[] to demonstrate the pattern further',
          ],
        },
      },
      {
        id: 'arrays-and-tuples',
        title: 'Arrays & Tuples',
        difficulty: 'beginner',
        tags: ['array', 'tuple', 'readonly', 'typed-array', 'list', 'collection'],
        cheatSheetSummary: 'Arrays use T[] or Array<T>. Tuples are fixed-length typed arrays [string, number].',
        sections: [
          {
            heading: 'Typed Arrays',
            content:
              'In plain JavaScript, arrays can hold anything -- numbers, strings, objects, other arrays, all mixed together. TypeScript brings order to this chaos by letting you declare what an array should contain. You have two equivalent syntaxes: `number[]` (the shorthand most developers prefer) and `Array<number>` (the generic form, useful when the element type is complex). Once declared, TypeScript enforces the element type on every operation -- pushing, assigning, spreading, you name it. And for arrays that should never be modified after creation, the `readonly` modifier is your friend. It removes mutating methods like `push`, `pop`, and `splice` from the type, making your immutable-data intentions crystal clear to both the compiler and your teammates.',
            code: `// Two equivalent array type syntaxes
const scores: number[] = [95, 87, 92, 78];
const names: Array<string> = ['Alice', 'Bob', 'Charlie'];

// Type is enforced on all operations
scores.push(100);         // OK
// scores.push('high');   // Error: Argument of type 'string' is not assignable

// Array methods preserve types
const doubled = scores.map(s => s * 2);    // number[]
const passing = scores.filter(s => s >= 90); // number[]
console.log(doubled);
console.log(passing);

// Readonly arrays prevent mutation
const frozenScores: readonly number[] = [95, 87, 92];
// frozenScores.push(100);   // Error: Property 'push' does not exist on 'readonly number[]'
// frozenScores[0] = 0;      // Error: Index signature in type 'readonly number[]' only permits reading

// ReadonlyArray<T> is equivalent to readonly T[]
const frozenNames: ReadonlyArray<string> = ['Alice', 'Bob'];
console.log(frozenScores);
console.log(frozenNames);`,
            output: `[ 190, 174, 184, 156, 200 ]
[ 95, 92, 100 ]
[ 95, 87, 92 ]
[ 'Alice', 'Bob' ]`,
            tip: 'Use `readonly` arrays for function parameters that should not modify the caller\'s data. This is not just defensive programming -- it communicates intent. When a teammate sees `function process(items: readonly string[])`, they immediately know the function will not mutate the input.',
            analogy: 'Think of it like a vending machine: a regular array is a machine where you can both add and remove items, while a readonly array is a display case -- you can look at what is inside but you cannot change the contents.',
          },
          {
            heading: 'Tuple Types',
            content:
              'While arrays hold a variable number of same-typed elements, tuples are fixed-length arrays where each position has its own specific type. Think of a tuple like a row in a spreadsheet -- the first column might be an ID (number), the second a name (string), the third a status (boolean). Tuples are perfect for returning multiple values from a function without creating a named interface, representing coordinate pairs, or working with structured data where position carries meaning. If you have used React\'s `useState` hook, you have already used tuples -- `useState` returns a `[value, setter]` tuple. TypeScript 4.0 introduced labeled tuple elements, which give names to each position for better readability and IDE tooltips.',
            code: `// Basic tuple: fixed types at each position
let point: [number, number] = [10, 20];
console.log(point[0], point[1]);

// Tuple with different types
let userRecord: [number, string, boolean] = [1, 'Alice', true];
const [id, name, active] = userRecord;  // destructuring works
console.log(\`#\${id}: \${name}, active: \${active}\`);

// Labeled tuples (TypeScript 4.0+) for documentation
type Coordinate = [x: number, y: number, z: number];
const position: Coordinate = [5, 10, 15];
console.log(position);

// Tuples from functions — common pattern
function divide(a: number, b: number): [result: number, remainder: number] {
  return [Math.floor(a / b), a % b];
}

const [quotient, remainder] = divide(17, 5);
console.log(\`17 / 5 = \${quotient} remainder \${remainder}\`);

// Optional tuple elements
type Range = [start: number, end?: number];
const full: Range = [0, 100];
const open: Range = [0];
console.log(full, open);`,
            output: `10 20
#1: Alice, active: true
[ 5, 10, 15 ]
17 / 5 = 3 remainder 2
[ 0, 100 ] [ 0 ]`,
            note: 'If you have used React hooks, you have been using tuples all along. `useState` returns `[value, setter]`, `useReducer` returns `[state, dispatch]`. Tuples are also the idiomatic way to return multiple values from any function without the overhead of creating a named type.',
            codeHighlightLines: [2, 6, 11, 16],
          },
          {
            heading: 'Rest Elements and Readonly Tuples',
            content:
              'TypeScript tuples go well beyond simple fixed-length arrays. Rest elements let you define a fixed head followed by a variable-length tail (or vice versa), which is incredibly useful for functions with a few required leading arguments followed by any number of extras. Readonly tuples ensure immutability, which matters in functional programming patterns and state management. And then there is the `as const` assertion -- one of the most useful tricks in TypeScript. When you write `[255, 128, 0] as const`, TypeScript infers the type as `readonly [255, 128, 0]` instead of `number[]`. Every value becomes a literal type, and the array becomes a readonly tuple. This is the go-to pattern for defining constant configurations, color values, and lookup tables.',
            code: `// Rest element in a tuple
type StringAndNumbers = [string, ...number[]];
const data: StringAndNumbers = ['scores', 95, 87, 92, 78];
const [label, ...values] = data;
console.log(label);   // 'scores'
console.log(values);  // [95, 87, 92, 78]

// Leading rest element (TypeScript 4.2+)
type LastIsString = [...number[], string];
const row: LastIsString = [1, 2, 3, 'end'];
console.log(row);

// Readonly tuples
const frozen: readonly [string, number] = ['Alice', 30];
// frozen[0] = 'Bob';  // Error: Cannot assign to '0' because it is a read-only property
console.log(frozen);

// 'as const' creates a readonly tuple from a literal
const color = [255, 128, 0] as const;
// type is readonly [255, 128, 0] — literal types!
// color.push(100);   // Error: push does not exist on readonly
console.log(color);

// Practical: type-safe event system
type EventEntry = [name: string, timestamp: number, payload: unknown];
const events: EventEntry[] = [
  ['click', Date.now(), { x: 100, y: 200 }],
  ['keypress', Date.now(), { key: 'Enter' }],
];
console.log(events.length, 'events recorded');`,
            output: `scores
[ 95, 87, 92, 78 ]
[ 1, 2, 3, 'end' ]
[ 'Alice', 30 ]
[ 255, 128, 0 ]
2 events recorded`,
            tip: 'Reach for `as const` whenever you define a constant array or object that should never change. It gives you the narrowest possible types (literal values + readonly), which unlocks more precise type checking and better autocompletion downstream.',
          },
        ],
        quiz: [
          {
            question: 'What is the difference between number[] and Array<number> in TypeScript?',
            options: [
              'number[] is faster at runtime',
              'Array<number> supports more methods',
              'They are completely equivalent syntaxes',
              'number[] is for primitive arrays, Array<number> is for object arrays',
            ],
            correctIndex: 2,
            explanation: 'Both number[] and Array<number> are completely equivalent ways to declare a typed array in TypeScript. The shorthand T[] syntax is more commonly used, while the generic Array<T> form is useful when the element type is complex.',
          },
          {
            question: 'What is a tuple in TypeScript?',
            options: [
              'A resizable array with mixed types',
              'A fixed-length array where each position has its own specific type',
              'An immutable array of strings',
              'A key-value pair data structure',
            ],
            correctIndex: 1,
            explanation: 'Tuples are fixed-length arrays where each position has its own specific type. For example, [string, number] means the first element must be a string and the second must be a number.',
          },
          {
            question: 'What does "as const" do when applied to an array literal?',
            options: [
              'Makes the array resizable',
              'Converts it to a Set',
              'Infers it as a readonly tuple with literal types for each element',
              'Creates a deep copy of the array',
            ],
            correctIndex: 2,
            explanation: 'The "as const" assertion infers the array as a readonly tuple with literal types. For example, [1, 2, 3] as const becomes readonly [1, 2, 3] instead of number[].',
          },
        ],
        challenge: {
          prompt: 'Create a function called "parseCSVRow" that takes a CSV string (like "Alice,30,true") and returns a labeled tuple [name: string, age: number, active: boolean]. Parse each field from the comma-separated string.',
          starterCode: `// Define a labeled tuple type for a parsed CSV row
// type CSVRow = [name: string, age: number, active: boolean]

// Create a function that parses a CSV string into this tuple
// function parseCSVRow(csv: string): CSVRow { ... }

// Test:
// const row = parseCSVRow('Alice,30,true');
// console.log(row);
`,
          solutionCode: `type CSVRow = [name: string, age: number, active: boolean];

function parseCSVRow(csv: string): CSVRow {
  const parts = csv.split(',');
  const name = parts[0];
  const age = parseInt(parts[1], 10);
  const active = parts[2] === 'true';
  return [name, age, active];
}

const row = parseCSVRow('Alice,30,true');
const [name, age, active] = row;
console.log(row);               // ['Alice', 30, true]
console.log(name, age, active); // Alice 30 true

const row2 = parseCSVRow('Bob,25,false');
console.log(row2);              // ['Bob', 25, false]`,
          hints: [
            'Use string.split(",") to break the CSV string into an array of string parts',
            'Use parseInt() to convert the age string to a number, and compare with "true" for the boolean',
            'Return the values as a tuple literal: [name, age, active]',
          ],
        },
      },
      {
        id: 'enums',
        title: 'Enums',
        difficulty: 'beginner',
        tags: ['enum', 'const-enum', 'string-enum', 'numeric-enum', 'union'],
        cheatSheetSummary: 'Named constants with numeric or string values. Prefer const enums or union types.',
        sections: [
          {
            heading: 'Numeric and String Enums',
            content:
              'Enums give you a way to define a set of named constants, and they are one of the few TypeScript features that actually produce runtime JavaScript (most TypeScript features vanish after compilation). Numeric enums auto-increment from 0 by default, so `Up` is 0, `Down` is 1, and so on. You can also set custom starting values like HTTP status codes. String enums require you to assign a value to every member explicitly, but the payoff is huge: when you see `"RED"` in your logs or debugger, you immediately know what it means. With numeric enums, you would see `0` and have to look it up. That is why most TypeScript developers prefer string enums when readability matters -- and readability almost always matters.',
            code: `// Numeric enum — auto-increments from 0
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right,   // 3
}

console.log(Direction.Up);      // 0
console.log(Direction.Right);   // 3

// Custom starting value
enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500,
}

console.log(HttpStatus.OK);        // 200
console.log(HttpStatus.NotFound);  // 404

// String enum — explicit string values
enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
}

console.log(Color.Red);    // 'RED'
console.log(Color.Green);  // 'GREEN'

function paint(color: Color): void {
  console.log(\`Painting with \${color}\`);
}

paint(Color.Blue);
// paint('BLUE');  // Error: Argument of type '"BLUE"' is not assignable to parameter of type 'Color'`,
            output: `0
3
200
404
RED
GREEN
Painting with BLUE`,
            tip: 'Prefer string enums over numeric enums in most situations. When debugging, seeing `"NOT_FOUND"` in your logs is infinitely more helpful than seeing `404` (or worse, `3`). String values are self-documenting -- you never need a reverse lookup to understand what they mean.',
          },
          {
            heading: 'Const Enums and Reverse Mappings',
            content:
              'Regular enums generate a JavaScript object at runtime, which means they add to your bundle size. Const enums solve this by inlining the values directly at every usage site during compilation -- the enum object disappears entirely from the output. Where `const level = Priority.High` would normally look up a property on the `Priority` object, with a const enum it compiles to `const level = 2`. Zero runtime overhead. The tradeoff? You cannot use const enum values dynamically (no `Object.keys()`, no iteration). Numeric enums also have a neat trick called reverse mapping: you can look up the name from the value, which is great for logging and debugging. String enums do not support this feature.',
            code: `// Const enum — inlined at compile time, no runtime object
const enum Priority {
  Low = 0,
  Medium = 1,
  High = 2,
  Critical = 3,
}

// In the compiled JS, this becomes: const level = 2;
const level = Priority.High;
console.log(level);  // 2

// Reverse mapping (only numeric enums)
enum StatusCode {
  Success = 0,
  Warning = 1,
  Error = 2,
}

// Forward: name → value
console.log(StatusCode.Success);  // 0
console.log(StatusCode.Error);    // 2

// Reverse: value → name
console.log(StatusCode[0]);  // 'Success'
console.log(StatusCode[2]);  // 'Error'

// Iterating over enum members
for (const key of Object.keys(StatusCode)) {
  if (isNaN(Number(key))) {
    console.log(\`\${key} = \${StatusCode[key as keyof typeof StatusCode]}\`);
  }
}`,
            output: `2
0
2
Success
Error
Success = 0
Warning = 1
Error = 2`,
            warning: 'Const enums are completely erased at compile time -- there is no runtime object to inspect. This means `Object.keys()`, `Object.values()`, and dynamic property access will not work. If you need to iterate over enum members or pass them dynamically, use a regular enum instead.',
          },
          {
            heading: 'Enums vs Union Types',
            content:
              'Here is a question that sparks debate in every TypeScript team: should you use enums or union types? The honest answer is that many experienced TypeScript developers prefer union types of string literals for most cases. Union types are simpler (no new syntax to learn), produce zero runtime code (they vanish entirely after compilation), work naturally with string comparisons (no need to import the enum), and play better with JavaScript interop. Enums earn their place when you need a runtime object for iteration, reverse mappings from values to names, or nominal typing where only the enum member is accepted (not an equivalent string). The `as const` object pattern shown below gives you the best of both worlds: a runtime object you can iterate over, plus type-safe literal types.',
            code: `// Union type alternative (often preferred)
type Direction = 'up' | 'down' | 'left' | 'right';

function move(dir: Direction): void {
  console.log(\`Moving \${dir}\`);
}

move('up');     // OK
move('left');   // OK
// move('diagonal'); // Error: not assignable to type 'Direction'

// Union types work naturally with string comparison
const dir: Direction = 'up';
if (dir === 'up') console.log('Going up!');

// Union type with object map (enum-like pattern)
const STATUS = {
  OK: 200,
  NOT_FOUND: 404,
  ERROR: 500,
} as const;

type StatusCode = (typeof STATUS)[keyof typeof STATUS]; // 200 | 404 | 500

function handleStatus(code: StatusCode): void {
  console.log(\`Status: \${code}\`);
}

handleStatus(STATUS.OK);        // OK
handleStatus(200);              // Also OK — it's just a number
// handleStatus(201);           // Error: not assignable to 200 | 404 | 500

console.log('Union types produce zero runtime code');`,
            output: `Moving up
Moving left
Going up!
Status: 200
Status: 200
Union types produce zero runtime code`,
            tip: 'For most use cases, union types of string literals are the pragmatic choice. They are lighter, simpler, and require no imports. Reserve enums for when you genuinely need runtime features like iteration or reverse lookup -- and when you do, consider the `as const` object pattern as a middle ground.',
          },
        ],
        quiz: [
          {
            question: 'What value does the first member of a numeric enum get by default?',
            options: [
              '1',
              '0',
              '-1',
              'It must be explicitly assigned',
            ],
            correctIndex: 1,
            explanation: 'Numeric enums auto-increment starting from 0 by default. So the first member gets 0, the second gets 1, and so on, unless custom values are specified.',
          },
          {
            question: 'What is the key advantage of string enums over numeric enums?',
            options: [
              'String enums are faster at runtime',
              'String enums support reverse mapping',
              'String enum values are self-documenting and readable in logs/debugger',
              'String enums take less memory',
            ],
            correctIndex: 2,
            explanation: 'String enum values are human-readable. Seeing "NOT_FOUND" in your logs is much more informative than seeing a number like 404 or 3. This makes debugging significantly easier.',
          },
          {
            question: 'What happens when you use a const enum in TypeScript?',
            options: [
              'The enum values become immutable at runtime',
              'The enum is inlined at every usage site and the enum object is removed from the output',
              'The enum can only contain constant expressions',
              'The enum members cannot be used in switch statements',
            ],
            correctIndex: 1,
            explanation: 'Const enums are completely inlined at compile time. Every reference to a const enum member is replaced with its literal value, and the enum object itself is removed from the JavaScript output, resulting in zero runtime overhead.',
          },
          {
            question: 'Why do many TypeScript developers prefer union types over enums?',
            options: [
              'Union types are faster at runtime',
              'Union types support reverse mapping',
              'Union types produce zero runtime code and work naturally with string comparisons',
              'Union types can have methods attached to them',
            ],
            correctIndex: 2,
            explanation: 'Union types of string literals produce zero runtime code (they vanish after compilation), work naturally with string comparisons without needing imports, and are simpler to use than enums.',
          },
        ],
        challenge: {
          prompt: 'Create a string enum called "LogLevel" with members Debug, Info, Warn, and Error (with values "DEBUG", "INFO", "WARN", "ERROR"). Write a function "log" that takes a LogLevel and a message string, and prints them formatted. Also create an equivalent union type version called "LogLevelUnion" and a function that uses it.',
          starterCode: `// Create a string enum LogLevel with DEBUG, INFO, WARN, ERROR values

// Write a log function that takes a LogLevel and message

// Create an equivalent union type version

// Test both approaches
`,
          solutionCode: `// Enum approach
enum LogLevel {
  Debug = 'DEBUG',
  Info = 'INFO',
  Warn = 'WARN',
  Error = 'ERROR',
}

function log(level: LogLevel, message: string): void {
  console.log(\`[\${level}] \${message}\`);
}

log(LogLevel.Info, 'Server started');
log(LogLevel.Error, 'Connection failed');

// Union type approach (often preferred)
type LogLevelUnion = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

function logUnion(level: LogLevelUnion, message: string): void {
  console.log(\`[\${level}] \${message}\`);
}

logUnion('INFO', 'Server started');
logUnion('ERROR', 'Connection failed');`,
          hints: [
            'String enum members require explicit string values: Debug = "DEBUG"',
            'Use template literals to format the log output: `[${level}] ${message}`',
            'The union type version uses string literals directly: type LogLevelUnion = "DEBUG" | "INFO" | "WARN" | "ERROR"',
          ],
        },
      },
      {
        id: 'any-unknown-never',
        title: 'any, unknown & never',
        difficulty: 'intermediate',
        tags: ['any', 'unknown', 'never', 'type-safety', 'narrowing', 'exhaustive'],
        cheatSheetSummary: 'any disables checks, unknown requires narrowing, never represents impossible values.',
        sections: [
          {
            heading: 'The any Type',
            content:
              'Let\'s talk about `any` -- TypeScript\'s escape hatch and its most dangerous feature. When you type a variable as `any`, you are telling the compiler: "Trust me, I know what I am doing. Do not check anything." The compiler obeys, and suddenly that variable can hold any value, be called as a function, have any property accessed on it -- all without a single error. This makes `any` useful during gradual migration from JavaScript, where you need to get things compiling before you can get things correct. But here is the problem: `any` is contagious. If `x` is `any`, then `x.foo.bar.baz` is also `any`, and so is any variable assigned from it. One `any` can silently disable type checking across an entire chain of operations. Every `any` in your codebase is a potential runtime crash that TypeScript cannot warn you about. The rule of thumb? Use `any` as a temporary stepping stone, never as a destination.',
            code: `// 'any' turns off all type checking
let value: any = 'hello';
value = 42;           // OK
value = true;         // OK
value = { x: 1 };    // OK

// any allows any operation — no compile errors
console.log(value.nonExistent);         // undefined at runtime
console.log(value.toUpperCase?.());     // undefined at runtime
// value();  // would throw at runtime, but no compile error

// any is contagious — it spreads through operations
let x: any = 'hello';
let y = x.foo.bar.baz;  // y is also 'any' — no errors, no safety

// Practical use: migrating from JavaScript
function legacyFunction(data: any): any {
  return data.result;
}

// Better: use unknown instead and narrow
console.log('any disables all type safety');
console.log('Use it sparingly during JS→TS migration');`,
            output: `undefined
undefined
any disables all type safety
Use it sparingly during JS→TS migration`,
            warning: 'Every use of `any` punches a hole in your type safety that can spread silently through your codebase. Treat `any` like a code smell -- it should trigger a TODO comment explaining why it is there and when it will be replaced. Use `unknown` instead when you genuinely do not know the type.',
            analogy: 'Think of it like disabling the safety on a power tool: it lets you work faster and without restrictions, but one wrong move and you get hurt. The tool (compiler) will not stop you from making mistakes.',
          },
          {
            heading: 'The unknown Type',
            content:
              'If `any` is the rebel that ignores all rules, `unknown` is the responsible adult. Like `any`, a variable of type `unknown` can hold any value. But unlike `any`, you cannot do anything with it until you prove what it actually is. Try to call `.toUpperCase()` on an `unknown`? TypeScript says no. First, you need to narrow it -- use a `typeof` check, an `instanceof` check, or a custom type guard to verify the type. Only then does TypeScript let you use the value. This makes `unknown` the perfect type for data from the outside world: API responses you have not validated yet, user input you do not trust, `JSON.parse()` results, error objects in catch blocks. In all these cases, you genuinely do not know what you have until you check, and `unknown` forces you to do that checking. It is the type-safe way to say "I do not know yet."',
            code: `// unknown — can hold any value, but must be narrowed before use
let input: unknown = 'hello';

// Cannot use directly — must narrow first
// input.toUpperCase();  // Error: 'input' is of type 'unknown'

// Narrow with typeof
if (typeof input === 'string') {
  console.log(input.toUpperCase());  // OK — narrowed to string
}

// Narrow with instanceof
function processError(err: unknown): string {
  if (err instanceof Error) {
    return err.message;             // narrowed to Error
  }
  if (typeof err === 'string') {
    return err;                      // narrowed to string
  }
  return 'Unknown error occurred';
}

console.log(processError(new Error('timeout')));
console.log(processError('network failure'));
console.log(processError(42));

// Practical: safe JSON parsing
function parseJSON(text: string): unknown {
  return JSON.parse(text);  // returns unknown instead of any
}

const data = parseJSON('{"name": "Alice", "age": 30}');
// data.name;  // Error: 'data' is of type 'unknown'
if (typeof data === 'object' && data !== null && 'name' in data) {
  console.log((data as { name: string }).name);
}`,
            output: `HELLO
timeout
network failure
Unknown error occurred
Alice`,
            tip: 'Make `unknown` your default choice whenever you receive data from outside your type-safe boundary -- API responses, `JSON.parse()`, user input, third-party library callbacks, and especially `catch` block error objects (use `catch (err: unknown)` instead of the default `any`). It forces you to validate before you use, which is exactly what you should be doing anyway.',
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    A["unknown value"] --> B{"typeof check"}
    B -->|"=== 'string'"| C["Narrowed to string\\nCan use .toUpperCase()"]
    B -->|"=== 'number'"| D["Narrowed to number\\nCan use .toFixed()"]
    B -->|"=== 'object'"| E{"instanceof check"}
    E -->|"instanceof Error"| F["Narrowed to Error\\nCan use .message"]
    E -->|"instanceof Array"| G["Narrowed to Array\\nCan use .map()"]
    E -->|"other"| H["Still unknown\\nNeed more checks"]
    style A fill:#e74c3c,color:#fff
    style C fill:#27ae60,color:#fff
    style D fill:#27ae60,color:#fff
    style F fill:#27ae60,color:#fff
    style G fill:#27ae60,color:#fff`,
              caption: 'Narrowing an unknown value through type checks',
            },
          },
          {
            heading: 'The never Type',
            content:
              'The `never` type is TypeScript\'s way of representing impossibility -- values that can never exist. It appears in two practical contexts. First, functions that never successfully return: a function that always throws an error returns `never` because the caller never receives a value. Second, and more powerfully, exhaustiveness checking. When you narrow a union type through a series of checks, whatever remains after all possibilities are eliminated is `never`. This means you can assign it to a `never` variable as a compile-time assertion that you have handled every case. The brilliant part? If someone adds a new variant to your union type but forgets to handle it in the switch statement, the assignment to `never` fails at compile time, immediately flagging the oversight. This pattern alone prevents an entire category of bugs in real-world applications.',
            code: `// Functions that never return
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // runs forever
  }
}

// Exhaustiveness checking with never
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }
  | { kind: 'triangle'; base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.side ** 2;
    case 'triangle':
      return 0.5 * shape.base * shape.height;
    default:
      // If all cases are handled, shape is 'never' here
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

console.log(area({ kind: 'circle', radius: 5 }).toFixed(2));
console.log(area({ kind: 'square', side: 4 }));
console.log(area({ kind: 'triangle', base: 6, height: 3 }));

// If you add a new shape to the union but forget to handle it,
// the default case will cause a compile error!
console.log('Exhaustive checks prevent missed cases');`,
            output: `78.54
16
9
Exhaustive checks prevent missed cases`,
            tip: 'The exhaustiveness pattern with `never` in default/else branches is one of the most valuable patterns in TypeScript. Adopt it in every switch statement over a discriminated union. When someone adds a new variant six months from now, the compiler will point them to every switch statement that needs updating -- no grep required.',
          },
        ],
        quiz: [
          {
            question: 'What is the key difference between "any" and "unknown" in TypeScript?',
            options: [
              'any is faster at runtime than unknown',
              'unknown can hold any value but requires type narrowing before use, while any disables all checking',
              'any can only hold primitive types, unknown can hold any type',
              'There is no difference, they are aliases for each other',
            ],
            correctIndex: 1,
            explanation: 'Both any and unknown can hold any value. The critical difference is that unknown requires you to narrow (check) the type before performing operations on it, while any disables all type checking entirely.',
          },
          {
            question: 'When does the "never" type appear in TypeScript?',
            options: [
              'When a variable is uninitialized',
              'When a function returns null',
              'When a function never successfully returns (throws or infinite loop) or when all union possibilities are exhausted',
              'When a variable has been garbage collected',
            ],
            correctIndex: 2,
            explanation: 'The never type represents impossibility. It appears when a function always throws or loops forever (never returns), and when all possibilities in a union type have been narrowed away through type checks.',
          },
          {
            question: 'Why is "any" considered dangerous in TypeScript?',
            options: [
              'It causes runtime performance issues',
              'It increases bundle size',
              'It is contagious and silently disables type checking across chains of operations',
              'It prevents the use of interfaces',
            ],
            correctIndex: 2,
            explanation: 'The any type is contagious -- if x is any, then x.foo.bar.baz is also any, and any variable assigned from it loses type safety. One any can silently disable type checking across an entire chain of operations.',
          },
        ],
        challenge: {
          prompt: 'Write a function called "processInput" that takes a parameter of type unknown. Use type narrowing to handle three cases: if it is a string, return it uppercased; if it is a number, return it doubled; if it is an Error, return its message. For anything else, throw an error using a never-returning helper function.',
          starterCode: `// Write a helper function that throws and returns never
// function fail(message: string): never { ... }

// Write processInput that handles unknown input
// function processInput(input: unknown): string | number { ... }

// Test:
// console.log(processInput('hello'));
// console.log(processInput(21));
// console.log(processInput(new Error('oops')));
`,
          solutionCode: `function fail(message: string): never {
  throw new Error(message);
}

function processInput(input: unknown): string | number {
  if (typeof input === 'string') {
    return input.toUpperCase();
  }
  if (typeof input === 'number') {
    return input * 2;
  }
  if (input instanceof Error) {
    return input.message;
  }
  fail('Unsupported input type');
}

console.log(processInput('hello'));            // HELLO
console.log(processInput(21));                 // 42
console.log(processInput(new Error('oops'))); // oops`,
          hints: [
            'Use typeof checks for primitive types: typeof input === "string" and typeof input === "number"',
            'Use instanceof to check for Error objects: input instanceof Error',
            'A function that always throws has return type never, and can be used where any return type is expected',
          ],
        },
      },
      {
        id: 'union-intersection',
        title: 'Union & Intersection Types',
        difficulty: 'intermediate',
        tags: ['union', 'intersection', 'discriminated', 'narrowing', 'composable', 'type-guard'],
        cheatSheetSummary: 'Union (A | B) means either type. Intersection (A & B) means both types combined.',
        sections: [
          {
            heading: 'Union Types',
            content:
              'Union types are one of the most frequently used features in TypeScript, and understanding them well is essential. Written with the pipe operator (`|`), a union type `A | B` means "this value is either an `A` or a `B`." Think of it like a door that accepts two different keys -- the lock does not care which key you use, as long as it is one of the two. Unions appear everywhere: function parameters that accept multiple types, variables whose type changes based on a condition, API responses that can be success or error, and configuration values that might be a string or a number. The catch is that you can only use operations that are valid for every member of the union. To access type-specific features, you need to narrow the union using `typeof`, `instanceof`, or other checks. TypeScript tracks these checks through control flow analysis, so once you are inside an `if (typeof x === "string")` block, the compiler knows `x` is a `string`.',
            code: `// Basic union type
let value: string | number;
value = 'hello';    // OK
value = 42;         // OK
// value = true;    // Error: Type 'boolean' is not assignable

// Union in function parameters
function format(input: string | number): string {
  if (typeof input === 'string') {
    return input.toUpperCase();      // narrowed to string
  }
  return input.toFixed(2);           // narrowed to number
}

console.log(format('hello'));   // 'HELLO'
console.log(format(3.14159));   // '3.14'

// Union of multiple types
type ID = string | number;
type Result = string | number | boolean | null;

// Array of union types
const mixed: (string | number)[] = [1, 'two', 3, 'four'];
console.log(mixed);

// Union with literal types
type Status = 'loading' | 'success' | 'error';

function showStatus(status: Status): void {
  console.log(\`Current status: \${status}\`);
}

showStatus('success');
// showStatus('pending'); // Error: '"pending"' is not assignable to type 'Status'`,
            output: `HELLO
3.14
[ 1, 'two', 3, 'four' ]
Current status: success`,
            tip: 'Unions of string literals (like `type Status = \'loading\' | \'success\' | \'error\'`) are the TypeScript way to express "one of these specific values." They replace both enums and magic strings in most codebases, giving you autocomplete and compile-time validation without any runtime overhead.',
          },
          {
            heading: 'Discriminated Unions',
            content:
              'Discriminated unions (also called tagged unions) are arguably the most powerful pattern in TypeScript, and once you learn them, you will see them everywhere. The idea is simple: each member of a union has a common property (the "discriminant" or "tag") with a unique literal type value. When you check that property, TypeScript automatically narrows the type to the matching member. For example, if you check `shape.kind === \'circle\'`, TypeScript instantly knows the shape has a `radius` property. This pattern is the backbone of state machines, Redux actions, API response handling, message passing systems, and compiler AST nodes. It gives you both type safety and runtime dispatch in one elegant package. The key insight is that the discriminant property must have literal types -- string literals are the most common, but number and boolean literals work too.',
            code: `// Discriminated union with 'kind' as the discriminant
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };

function describeShape(shape: Shape): string {
  switch (shape.kind) {
    case 'circle':
      return \`Circle with radius \${shape.radius}\`;
    case 'rectangle':
      return \`Rectangle \${shape.width}x\${shape.height}\`;
    case 'triangle':
      return \`Triangle with base \${shape.base}\`;
  }
}

console.log(describeShape({ kind: 'circle', radius: 5 }));
console.log(describeShape({ kind: 'rectangle', width: 10, height: 5 }));

// API response pattern
type ApiResponse<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }
  | { status: 'loading' };

function handleResponse(res: ApiResponse<string[]>): void {
  if (res.status === 'success') {
    console.log('Data:', res.data);     // data is accessible
  } else if (res.status === 'error') {
    console.log('Error:', res.message); // message is accessible
  } else {
    console.log('Loading...');
  }
}

handleResponse({ status: 'success', data: ['Alice', 'Bob'] });
handleResponse({ status: 'error', message: 'Network timeout' });`,
            output: `Circle with radius 5
Rectangle 10x5
Data: [ 'Alice', 'Bob' ]
Error: Network timeout`,
            note: 'The discriminant property must have literal types (string literals, number literals, or boolean literals) for TypeScript to narrow the union. Common discriminant names include `kind`, `type`, `status`, `tag`, and `action`. Pick one convention for your codebase and stick with it.',
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    A["shape: Shape"] --> B{"shape.kind === ?"}
    B -->|"'circle'"| C["{ kind: 'circle', radius }\\nAccess: shape.radius"]
    B -->|"'rectangle'"| D["{ kind: 'rectangle', width, height }\\nAccess: shape.width, shape.height"]
    B -->|"'triangle'"| E["{ kind: 'triangle', base, height }\\nAccess: shape.base, shape.height"]
    style A fill:#3178c6,color:#fff
    style B fill:#f39c12,color:#fff
    style C fill:#27ae60,color:#fff
    style D fill:#27ae60,color:#fff
    style E fill:#27ae60,color:#fff`,
              caption: 'Discriminated union narrows the type based on the tag property',
            },
          },
          {
            heading: 'Intersection Types',
            content:
              'If union types represent "either/or," intersection types represent "both/and." Written with the ampersand (`&`), an intersection type `A & B` produces a type that has all properties from both `A` and `B`. Think of it like mixing ingredients -- you start with separate components and combine them into something richer. Intersections are the TypeScript way to compose types from smaller building blocks, which promotes the principle of composition over inheritance. Instead of creating a massive `User` interface with twenty properties, you can build it from focused pieces: `HasName & HasEmail & HasRole & Timestamped`. This makes each piece independently testable and reusable. Intersections also shine when you need to extend a type from a library without modifying it -- just intersect it with your extra properties.',
            code: `// Intersection: combines multiple types
type HasName = { name: string };
type HasAge = { age: number };
type HasEmail = { email: string };

// Person has ALL properties from all three types
type Person = HasName & HasAge & HasEmail;

const alice: Person = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com',
};
console.log(alice);

// Extending types with intersection
type Timestamped = { createdAt: Date; updatedAt: Date };

type UserRecord = Person & Timestamped;

const record: UserRecord = {
  name: 'Bob',
  age: 25,
  email: 'bob@example.com',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-06-15'),
};
console.log(\`\${record.name}, created: \${record.createdAt.toISOString().split('T')[0]}\`);

// Intersection with functions
type Logger = { log: (msg: string) => void };
type Serializable = { toJSON: () => string };

type LoggableEntity = Person & Logger & Serializable;

const entity: LoggableEntity = {
  name: 'Charlie',
  age: 35,
  email: 'charlie@example.com',
  log: (msg) => console.log(\`[\${msg}]\`),
  toJSON: () => JSON.stringify({ name: 'Charlie' }),
};

entity.log('created');
console.log(entity.toJSON());`,
            output: `{ name: 'Alice', age: 30, email: 'alice@example.com' }
Bob, created: 2024-01-01
[created]
{"name":"Charlie"}`,
            tip: 'Use intersection types to compose small, focused type building blocks rather than creating one monolithic interface. `type User = Identifiable & Named & Emailable & Timestamped` reads like a sentence and makes each piece independently reusable across your codebase.',
            analogy: 'Think of it like stacking transparencies on an overhead projector: each sheet (type) adds its own content (properties), and the final image (intersection) shows everything combined.',
          },
        ],
        quiz: [
          {
            question: 'What does the union type "string | number" mean in TypeScript?',
            options: [
              'The value must be both a string and a number simultaneously',
              'The value can be either a string or a number',
              'The value is converted from string to number',
              'The value is always a string that contains a number',
            ],
            correctIndex: 1,
            explanation:
              'A union type A | B means the value can be either type A or type B. With string | number, the variable can hold a string value or a number value, but not both at the same time.',
          },
          {
            question: 'What is a discriminated union in TypeScript?',
            options: [
              'A union type that cannot be narrowed',
              'A union where each member has a common property with a unique literal type value used for narrowing',
              'A union of only primitive types',
              'A union type that is automatically converted to an intersection',
            ],
            correctIndex: 1,
            explanation:
              'A discriminated union is a union where each member shares a common property (the discriminant) with a unique literal value. Checking this property narrows the type to the specific member, enabling type-safe property access.',
          },
          {
            question: 'What does an intersection type "A & B" produce?',
            options: [
              'A type with only properties common to both A and B',
              'A type that is either A or B',
              'A type that has all properties from both A and B',
              'A type that removes properties from A that exist in B',
            ],
            correctIndex: 2,
            explanation:
              'An intersection type A & B creates a type that has ALL properties from both A and B. It combines the two types, requiring all properties from both to be present.',
          },
          {
            question: 'How do you narrow a union type in TypeScript?',
            options: [
              'Use a type cast with "as" keyword only',
              'Use typeof checks, instanceof checks, or discriminant property checks',
              'Union types cannot be narrowed',
              'Use the narrow() built-in function',
            ],
            correctIndex: 1,
            explanation:
              'Union types can be narrowed using typeof checks (for primitives), instanceof checks (for class instances), or by checking a discriminant property. TypeScript tracks these checks through control flow analysis.',
          },
        ],
        challenge: {
          prompt:
            'Create a discriminated union type called "Result" with two variants: { status: "ok", value: string } and { status: "err", message: string }. Write a function "processResult" that uses a switch on the status to handle both cases. Also create a "Timestamped" intersection type that adds createdAt (Date) to any Result.',
          starterCode: `// Define a discriminated union type Result
// type Result = ...

// Write a function that processes a Result using a switch statement
// function processResult(result: Result): string { ... }

// Create an intersection type that adds a timestamp
// type TimestampedResult = Result & ...

// Test:
// processResult({ status: 'ok', value: 'hello' })
// processResult({ status: 'err', message: 'fail' })
`,
          solutionCode: `type Result =
  | { status: 'ok'; value: string }
  | { status: 'err'; message: string };

function processResult(result: Result): string {
  switch (result.status) {
    case 'ok':
      return \`Success: \${result.value.toUpperCase()}\`;
    case 'err':
      return \`Error: \${result.message}\`;
  }
}

console.log(processResult({ status: 'ok', value: 'hello' }));
console.log(processResult({ status: 'err', message: 'not found' }));

// Intersection adds timestamp to Result
type Timestamped = { createdAt: Date };
type TimestampedResult = Result & Timestamped;

const tr: TimestampedResult = {
  status: 'ok',
  value: 'data',
  createdAt: new Date(),
};
console.log(tr.status, tr.createdAt);`,
          hints: [
            'Use a common "status" property with literal types "ok" and "err" as the discriminant',
            'In the switch statement, TypeScript narrows the type in each case branch so you can access variant-specific properties',
            'Use the & operator to intersect Result with a Timestamped type that has a createdAt: Date property',
          ],
        },
      },
      {
        id: 'literal-types',
        title: 'Literal Types',
        difficulty: 'intermediate',
        tags: ['literal', 'string-literal', 'template-literal', 'const', 'narrowing'],
        cheatSheetSummary: 'Exact value types like "hello" or 42. Narrow values using as const.',
        sections: [
          {
            heading: 'String, Number, and Boolean Literals',
            content:
              'Here is a mind-bending idea: in TypeScript, a specific value can be a type. The string `"hello"` is not just a value of type `string` -- it is also its own type, `"hello"`, that only accepts that exact string. This is what literal types are. On their own, they seem overly restrictive (why would a variable only hold one value?). But combine them with unions, and they become incredibly powerful. `type Direction = \'north\' | \'south\' | \'east\' | \'west\'` creates a type that accepts exactly four strings -- nothing more, nothing less. This gives you exhaustive autocompletion, compile-time validation, and self-documenting code. The `as const` assertion is what bridges the gap between runtime values and literal types. Without it, `{ port: 3000 }` infers `port` as `number`. With it, `port` becomes the literal type `3000`. This distinction matters when you need precise types for configuration objects, constants, and lookup tables.',
            code: `// String literal types
type Direction = 'north' | 'south' | 'east' | 'west';

let heading: Direction = 'north';   // OK
// heading = 'up';   // Error: Type '"up"' is not assignable to type 'Direction'

function navigate(dir: Direction): void {
  console.log(\`Heading \${dir}\`);
}
navigate('east');

// Numeric literal types
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
const roll: DiceRoll = 4;      // OK
// const bad: DiceRoll = 7;    // Error: Type '7' is not assignable

// Boolean literal types
type True = true;
type Falsy = false | 0 | '' | null | undefined;

// 'as const' narrows to literal types
const config = {
  port: 3000,        // type: number (without as const)
  host: 'localhost', // type: string (without as const)
} as const;
// Now: config.port is type 3000, config.host is type 'localhost'

console.log(\`Direction: \${heading}\`);
console.log(\`Dice roll: \${roll}\`);
console.log(\`Config: \${config.host}:\${config.port}\`);`,
            output: `Heading east
Direction: north
Dice roll: 4
Config: localhost:3000`,
            tip: 'Apply `as const` to objects and arrays whenever you want TypeScript to infer literal types for all values. Without it, `{ port: 3000 }` gives you `{ port: number }`. With it, you get `{ readonly port: 3000 }` -- a much more precise type that catches more bugs.',
            codeHighlightLines: [2, 13, 22, 23, 24, 25],
          },
          {
            heading: 'Template Literal Types',
            content:
              'Template literal types (introduced in TypeScript 4.1) are where the type system starts to feel like magic. Just like template strings build strings from expressions at runtime, template literal types build string types from other types at compile time. Write `\\`${Shade}-${Color}\\`` and TypeScript generates every possible combination: `"light-red"`, `"light-green"`, `"dark-blue"`, and so on. This is extraordinarily useful for modeling real-world patterns: CSS class name conventions, event handler names (`onClick`, `onFocus`, `onBlur`), API route patterns, and database column names. TypeScript even provides built-in utility types like `Capitalize`, `Uppercase`, `Lowercase`, and `Uncapitalize` to transform string literals at the type level. If you have ever wished you could generate a set of valid strings from a pattern rather than listing them all by hand, template literal types are your answer.',
            code: `// Template literal types build strings from other types
type Color = 'red' | 'green' | 'blue';
type Shade = 'light' | 'dark';

// Creates: 'light-red' | 'light-green' | 'light-blue' |
//          'dark-red' | 'dark-green' | 'dark-blue'
type ColorVariant = \`\${Shade}-\${Color}\`;

const variant: ColorVariant = 'dark-blue';   // OK
// const bad: ColorVariant = 'bright-red';   // Error

// Event handler pattern
type EventName = 'click' | 'focus' | 'blur';
type HandlerName = \`on\${Capitalize<EventName>}\`;
// 'onClick' | 'onFocus' | 'onBlur'

const handler: HandlerName = 'onClick';

// API route pattern
type Method = 'get' | 'post' | 'put' | 'delete';
type Route = \`/api/\${string}\`;

function request(method: Method, route: Route): void {
  console.log(\`\${method.toUpperCase()} \${route}\`);
}

request('get', '/api/users');
request('post', '/api/users');
// request('patch', '/api/users');  // Error: 'patch' not in Method

console.log(\`Variant: \${variant}\`);
console.log(\`Handler: \${handler}\`);`,
            output: `GET /api/users
POST /api/users
Variant: dark-blue
Handler: onClick`,
            note: 'TypeScript provides four built-in utility types for template literals: `Uppercase`, `Lowercase`, `Capitalize`, and `Uncapitalize`. These transform string literal types at the type level and are used extensively in library type definitions for creating patterns like event handler names and CSS-in-JS property types.',
            analogy: 'Think of it like a label maker with interchangeable cartridges: you snap in a "shade" cartridge and a "color" cartridge, and the machine automatically produces every possible label combination for you.',
          },
        ],
        quiz: [
          {
            question: 'What is a literal type in TypeScript?',
            options: [
              'Any string, number, or boolean type',
              'A type that represents one exact specific value, like "hello" or 42',
              'A type that can only be used with const variables',
              'A type alias for primitive types',
            ],
            correctIndex: 1,
            explanation:
              'A literal type represents one exact value. The string "hello" is not just a string -- it is its own type that only accepts that exact string. Combined with unions, literal types create powerful type-safe enumerations.',
          },
          {
            question: 'What does "as const" do when applied to an object?',
            options: [
              'Makes the object immutable at runtime',
              'Converts all property values to their narrowest literal types and makes them readonly',
              'Creates a deep copy of the object',
              'Freezes the object using Object.freeze()',
            ],
            correctIndex: 1,
            explanation:
              'The "as const" assertion narrows all property values to their literal types (e.g., 3000 instead of number) and makes all properties readonly. This is purely a compile-time effect -- it does not add runtime immutability.',
          },
          {
            question: 'What does the template literal type `${Shade}-${Color}` produce when Shade is "light" | "dark" and Color is "red" | "blue"?',
            options: [
              'A single string type "Shade-Color"',
              'The union "light-red" | "light-blue" | "dark-red" | "dark-blue"',
              'A function that concatenates strings',
              'An error because template literals cannot be used in types',
            ],
            correctIndex: 1,
            explanation:
              'Template literal types generate every possible combination of the constituent union types. With 2 shades and 2 colors, you get 4 combinations: "light-red" | "light-blue" | "dark-red" | "dark-blue".',
          },
        ],
        challenge: {
          prompt:
            'Create a type "HTTPMethod" as a union of literal types "GET" | "POST" | "PUT" | "DELETE". Then create a template literal type "Endpoint" that combines a method with a route pattern like `${HTTPMethod} /api/${string}`. Write a function that accepts only valid Endpoint strings.',
          starterCode: `// Define an HTTPMethod literal union type

// Define a template literal type Endpoint

// Write a function that takes a valid Endpoint and logs the method and path
// function handleRequest(endpoint: Endpoint): void { ... }

// Test:
// handleRequest('GET /api/users')
// handleRequest('POST /api/users')
`,
          solutionCode: `type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = \`\${HTTPMethod} /api/\${string}\`;

function handleRequest(endpoint: Endpoint): void {
  const [method, path] = endpoint.split(' ');
  console.log(\`Method: \${method}, Path: \${path}\`);
}

handleRequest('GET /api/users');
handleRequest('POST /api/users');
handleRequest('DELETE /api/users/123');
// handleRequest('PATCH /api/users');  // Error: not assignable

// Bonus: as const for configuration
const routes = {
  users: '/api/users',
  posts: '/api/posts',
} as const;

// routes.users is type '/api/users' (literal), not string
console.log(routes.users);`,
          hints: [
            'Template literal types use the same backtick syntax as runtime template strings but at the type level',
            'Use string.split(" ") to separate the method from the path at runtime',
            'The "as const" assertion narrows object property values to their literal types',
          ],
        },
      },
      {
        id: 'type-aliases',
        title: 'Type Aliases',
        difficulty: 'intermediate',
        tags: ['type', 'alias', 'generic', 'recursive', 'conditional', 'utility'],
        cheatSheetSummary: 'Use the type keyword to create reusable named types, including generics and conditionals.',
        sections: [
          {
            heading: 'Defining Type Aliases',
            content:
              'Type aliases use the `type` keyword to give a name to any type expression, and they are one of the features you will use most heavily in TypeScript. Think of them as variables, but for types. You can alias anything: primitives, objects, unions, tuples, functions, or any combination. Unlike interfaces (which are limited to object shapes), type aliases can directly represent unions (`type ID = string | number`) and tuples (`type Pair = [string, number]`). Under the hood, a type alias is just a name -- TypeScript treats the alias and the underlying type as completely interchangeable. This is called "structural typing," and it means two type aliases with the same shape are considered identical even if they have different names. Type aliases really shine for complex unions and function signatures that would be tedious to write out repeatedly.',
            code: `// Simple type aliases
type ID = string | number;
type Callback = (data: string) => void;
type Point = { x: number; y: number };
type Pair<T> = [T, T];

// Using the aliases
const userId: ID = 'abc-123';
const numericId: ID = 42;

const point: Point = { x: 10, y: 20 };
const pair: Pair<string> = ['hello', 'world'];

console.log(userId, numericId);
console.log(point);
console.log(pair);

// Function type alias
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

console.log(add(5, 3));
console.log(multiply(5, 3));

// Complex object type alias
type ApiConfig = {
  baseUrl: string;
  timeout: number;
  headers: Record<string, string>;
  retries?: number;
};

const config: ApiConfig = {
  baseUrl: 'https://api.example.com',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
};
console.log(config.baseUrl);`,
            output: `abc-123 42
{ x: 10, y: 20 }
[ 'hello', 'world' ]
8
15
https://api.example.com`,
            tip: 'The age-old question: `type` vs `interface`? Use `type` for unions, tuples, and function types (interfaces cannot express these). Use `interface` for object shapes that might be extended with `extends` or declaration merging. For plain object types, either works -- just be consistent within your codebase.',
          },
          {
            heading: 'Generic Type Aliases',
            content:
              'Generic type aliases take the concept of reusable types to the next level. By adding type parameters in angle brackets, you create type templates that work across different types -- write once, use with any type. The classic example is a `Result<T>` type that represents either a success (containing data of type `T`) or a failure (containing an error message). You define it once, then use `Result<User>`, `Result<number>`, `Result<string[]>` -- each gets its own type-safe version. Generics can also have constraints (using `extends`) to limit what types are accepted, and default values (using `=`) to provide sensible defaults. If this reminds you of generic functions in other languages, that is exactly what it is -- parametric polymorphism applied to type aliases.',
            code: `// Generic wrapper type
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// Reuse with different types
const userResult: Result<{ name: string }> = {
  success: true,
  data: { name: 'Alice' },
};

const numberResult: Result<number> = {
  success: false,
  error: 'Not found',
};

console.log(userResult);
console.log(numberResult);

// Generic with constraints
type Lengthwise = { length: number };
type Measured<T extends Lengthwise> = {
  value: T;
  length: number;
};

const measured: Measured<string> = {
  value: 'hello',
  length: 5,
};
console.log(measured);

// Multiple type parameters
type Dictionary<K extends string | number, V> = {
  entries: Array<{ key: K; value: V }>;
  get: (key: K) => V | undefined;
};

// Default type parameters
type Container<T = string> = { value: T };
const strContainer: Container = { value: 'hello' };        // T defaults to string
const numContainer: Container<number> = { value: 42 };

console.log(strContainer, numContainer);`,
            output: `{ success: true, data: { name: 'Alice' } }
{ success: false, error: 'Not found' }
{ value: 'hello', length: 5 }
{ value: 'hello' } { value: 42 }`,
            tip: 'Default type parameters (`T = string`) are a small feature with big ergonomic impact. They let callers skip the type argument when the default is appropriate, reducing boilerplate. Use them whenever there is a "most common" type for a generic parameter.',
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    A["Result&lt;T&gt;"] --> B{"success?"}
    B -->|"true"| C["{ success: true, data: T }"]
    B -->|"false"| D["{ success: false, error: string }"]
    C --> E["Result&lt;User&gt;\\ndata: User"]
    C --> F["Result&lt;number&gt;\\ndata: number"]
    C --> G["Result&lt;string[]&gt;\\ndata: string[]"]
    style A fill:#3178c6,color:#fff
    style B fill:#f39c12,color:#fff
    style C fill:#27ae60,color:#fff
    style D fill:#e74c3c,color:#fff`,
              caption: 'A generic Result<T> type can be reused with any data type',
            },
          },
          {
            heading: 'Recursive and Conditional Type Aliases',
            content:
              'Now we enter the deep end of TypeScript\'s type system. Recursive type aliases reference themselves, which is essential for modeling tree structures, nested JSON, linked lists, and any data with arbitrary depth. The `JSONValue` type below is a perfect example -- JSON values can contain arrays of JSON values, which can contain objects of JSON values, nested infinitely. Conditional types take it further with a ternary-like syntax: `T extends U ? X : Y` means "if `T` is assignable to `U`, the type is `X`, otherwise `Y`." Combined with the `infer` keyword (which extracts a type from a pattern), conditional types enable utilities like `ReturnType<T>` that extract the return type of any function. These are advanced tools -- you will not need them every day, but when you do, they are irreplaceable. Just be mindful of readability: a deeply nested conditional type that takes five minutes to decipher is not helping anyone.',
            code: `// Recursive type: JSON value
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const data: JSONValue = {
  name: 'Alice',
  age: 30,
  scores: [95, 87, 92],
  address: {
    city: 'New York',
    zip: null,
  },
};
console.log(typeof data);

// Recursive type: nested tree
type TreeNode<T> = {
  value: T;
  children: TreeNode<T>[];
};

const tree: TreeNode<string> = {
  value: 'root',
  children: [
    { value: 'child1', children: [] },
    { value: 'child2', children: [
      { value: 'grandchild', children: [] },
    ]},
  ],
};
console.log(tree.value, '->', tree.children.length, 'children');

// Conditional types
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;   // true
type B = IsString<number>;   // false

// Practical conditional type: extract return type
type ReturnOf<T> = T extends (...args: any[]) => infer R ? R : never;

type FnReturn = ReturnOf<(x: number) => string>;  // string

// Practical: make all properties nullable
type Nullable<T> = { [K in keyof T]: T[K] | null };

type User = { name: string; age: number };
type NullableUser = Nullable<User>;
// { name: string | null; age: number | null }

const partial: NullableUser = { name: 'Alice', age: null };
console.log(partial);`,
            output: `object
root -> 2 children
{ name: 'Alice', age: null }`,
            warning: 'Deeply recursive and complex conditional types can significantly slow down the TypeScript compiler and produce error messages that are nearly impossible to decipher. Keep type-level logic as simple as possible. If a type alias requires more than a few seconds to understand, consider breaking it into smaller, well-named pieces or adding a comment explaining what it does.',
            analogy: 'Think of it like Russian nesting dolls (matryoshka): a recursive type contains smaller versions of itself, each potentially containing even smaller ones, down to the base case.',
          },
        ],
        quiz: [
          {
            question: 'What can type aliases represent that interfaces cannot?',
            options: [
              'Object shapes with methods',
              'Extended types using inheritance',
              'Unions, tuples, and function types directly',
              'Generic type parameters',
            ],
            correctIndex: 2,
            explanation:
              'Type aliases can directly represent unions (type ID = string | number), tuples (type Pair = [string, number]), and function types (type Fn = () => void). Interfaces are limited to object shapes and cannot express these forms directly.',
          },
          {
            question: 'What does a generic type alias like "Result<T>" allow you to do?',
            options: [
              'Create a type that only works with one specific type',
              'Create a reusable type template that works across different types',
              'Create a type that automatically converts between types',
              'Create a type that disables type checking for T',
            ],
            correctIndex: 1,
            explanation:
              'Generic type aliases create reusable type templates. You define the structure once with a type parameter T, then use it with different types: Result<User>, Result<number>, Result<string[]> -- each gets its own type-safe version.',
          },
          {
            question: 'What does the conditional type "T extends string ? true : false" do?',
            options: [
              'Converts T to a string at runtime',
              'Checks at compile time if T is assignable to string, resolving to true or false accordingly',
              'Throws an error if T is not a string',
              'Creates a boolean variable based on the value of T',
            ],
            correctIndex: 1,
            explanation:
              'Conditional types use a ternary-like syntax at the type level. "T extends string ? true : false" evaluates at compile time: if T is assignable to string, the type resolves to the literal type true; otherwise, it resolves to false.',
          },
          {
            question: 'Why are recursive type aliases useful?',
            options: [
              'They improve runtime performance',
              'They allow modeling data structures with arbitrary nesting depth, like trees and JSON',
              'They automatically flatten nested objects',
              'They prevent circular references in code',
            ],
            correctIndex: 1,
            explanation:
              'Recursive type aliases reference themselves, which is essential for modeling data with arbitrary depth: tree structures (TreeNode containing TreeNode children), nested JSON values, linked lists, and similar recursive data patterns.',
          },
        ],
        challenge: {
          prompt:
            'Create a generic type alias called "ApiResponse<T>" that is a discriminated union with three variants: success (with data of type T), error (with a message string and code number), and loading (with no extra fields). Then create a recursive type "NestedArray<T>" that represents an array where elements can be either T or NestedArray<T>.',
          starterCode: `// Define a generic ApiResponse<T> discriminated union
// type ApiResponse<T> = ...

// Write a function to handle the response
// function handleResponse<T>(res: ApiResponse<T>): void { ... }

// Define a recursive NestedArray<T> type
// type NestedArray<T> = ...

// Test:
// handleResponse<string>({ status: 'success', data: 'hello' });
// const nested: NestedArray<number> = [1, [2, [3, 4]], 5];
`,
          solutionCode: `type ApiResponse<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; message: string; code: number }
  | { status: 'loading' };

function handleResponse<T>(res: ApiResponse<T>): void {
  switch (res.status) {
    case 'success':
      console.log('Data:', res.data);
      break;
    case 'error':
      console.log(\`Error \${res.code}: \${res.message}\`);
      break;
    case 'loading':
      console.log('Loading...');
      break;
  }
}

handleResponse<string>({ status: 'success', data: 'hello' });
handleResponse<number>({ status: 'error', message: 'Not found', code: 404 });
handleResponse<boolean>({ status: 'loading' });

// Recursive type
type NestedArray<T> = Array<T | NestedArray<T>>;

const nested: NestedArray<number> = [1, [2, [3, 4]], 5];
console.log(nested);

function flatten<T>(arr: NestedArray<T>): T[] {
  return arr.flat(Infinity) as T[];
}
console.log(flatten(nested));`,
          hints: [
            'Use a "status" property with literal types "success", "error", and "loading" as the discriminant',
            'The generic parameter T determines the type of data in the success variant',
            'For the recursive type, NestedArray<T> is an Array whose elements are either T or another NestedArray<T>',
          ],
        },
      },
    ],
  },
];

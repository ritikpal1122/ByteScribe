import type { DocCategory } from './types';

// Part 5: Modules & Namespaces + Async Patterns
export const TS_PART5_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Modules & Namespaces                                         */
  /* ------------------------------------------------------------ */
  {
    id: 'ts-modules',
    label: 'Modules & Namespaces',
    icon: 'Package',
    entries: [
      {
        id: 'es-modules-ts',
        title: 'ES Modules in TypeScript',
        difficulty: 'intermediate',
        tags: ['modules', 'import', 'export', 'type-only', 'barrel', 're-export'],
        cheatSheetSummary:
          'import/export with types, import type for type-only imports, re-exports, barrel files for clean public APIs.',
        sections: [
          {
            heading: 'Import and Export with Types',
            content:
              'TypeScript fully supports ES module syntax with added type awareness. You can export and import values, functions, classes, interfaces, and type aliases using standard ES module syntax. Named exports allow consumers to import only what they need, while default exports provide a single primary value per module. TypeScript validates that all imported names exist in the source module at compile time, catching typos and missing exports early.',
            code: `// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export interface MathResult {
  value: number;
  operation: string;
}

export default class Calculator {
  result: number = 0;
  add(n: number): this { this.result += n; return this; }
}

// main.ts
import Calculator, { add, type MathResult } from './math';

const sum: number = add(2, 3);
const calc = new Calculator();
console.log(sum);
console.log(calc.add(10).add(5).result);`,
            output: `5
15`,
            tip: 'Prefer named exports over default exports. Named exports provide better auto-import support, refactoring safety, and explicit API surfaces.',
            codeHighlightLines: [2, 6, 11, 17],
          },
          {
            heading: 'Type-Only Imports',
            content:
              'TypeScript 3.8 introduced import type and export type for importing and exporting only type information. These imports are completely erased during compilation and produce no runtime code. This is important for avoiding circular dependency issues at runtime, reducing bundle size, and making the intent explicit. When using isolatedModules or verbatimModuleSyntax, type-only imports become essential for types that would otherwise cause runtime errors.',
            code: `// types.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export type Role = 'admin' | 'editor' | 'viewer';

// service.ts
import type { User, Role } from './types';

// This import is erased at compile time
function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`;
}

function checkAccess(role: Role): boolean {
  return role === 'admin' || role === 'editor';
}

const user: User = { id: 1, name: 'Alice', email: 'a@b.com' };
console.log(greetUser(user));
console.log(checkAccess('admin'));`,
            output: `Hello, Alice!
true`,
            warning: 'With verbatimModuleSyntax enabled in tsconfig, you must use import type for type-only imports. Regular import of a type will cause a compile error.',
            analogy: 'Think of it like a ghost import: import type brings in the shape and blueprint of a type for the compiler to see, but it vanishes entirely before the code ever runs. No runtime footprint at all.',
            codeHighlightLines: [11],
          },
          {
            heading: 'Re-exports and Barrel Files',
            content:
              'Barrel files (typically index.ts) re-export items from multiple modules through a single entry point. This pattern simplifies imports for consumers and provides a clean public API boundary. You can selectively re-export, rename exports, or re-export everything from a module. Barrel files are widely used in libraries and large applications to organize code into logical feature modules with well-defined public interfaces.',
            code: `// models/user.ts
export interface User { id: number; name: string; }
export function createUser(name: string): User {
  return { id: Date.now(), name };
}

// models/post.ts
export interface Post { id: number; title: string; authorId: number; }
export function createPost(title: string, authorId: number): Post {
  return { id: Date.now(), title, authorId };
}

// models/index.ts  (barrel file)
export { User, createUser } from './user';
export { Post, createPost } from './post';
export type { User as IUser } from './user';   // renamed re-export

// app.ts — single clean import
// import { createUser, createPost } from './models';
const user = { id: 1, name: 'Alice' };
const post = { id: 2, title: 'Hello', authorId: user.id };
console.log(user);
console.log(post);`,
            output: `{ id: 1, name: 'Alice' }
{ id: 2, title: 'Hello', authorId: 1 }`,
            tip: 'Avoid deep barrel file nesting (barrel importing from another barrel). This can cause circular dependencies and slow build times. Keep barrels shallow.',
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart TD
    U["models/user.ts"] -->|"export User, createUser"| B["models/index.ts (barrel)"]
    P["models/post.ts"] -->|"export Post, createPost"| B
    B -->|"single import"| A["app.ts"]
    style B fill:#e3f2fd,stroke:#1565c0`,
              caption: 'Barrel file aggregates exports from multiple modules into a single clean import point',
            },
          },
        ],
        quiz: [
          {
            question: 'What does `import type { User }` do differently from `import { User }`?',
            options: [
              'It imports the User class with all methods available at runtime',
              'It imports only the type information, which is erased at compile time',
              'It imports the User as a read-only constant',
              'It imports the User lazily, loading it only when first accessed',
            ],
            correctIndex: 1,
            explanation:
              '`import type` brings in only the type information for the TypeScript compiler. It is completely erased during compilation and produces no runtime JavaScript code, reducing bundle size and avoiding circular dependency issues.',
          },
          {
            question: 'What is a barrel file in the context of TypeScript modules?',
            options: [
              'A file that compresses multiple modules into a single bundle',
              'A file that encrypts module exports for security',
              'An index.ts file that re-exports items from multiple modules through a single entry point',
              'A configuration file that lists all modules in the project',
            ],
            correctIndex: 2,
            explanation:
              'A barrel file (typically index.ts) re-exports items from multiple modules, providing a clean single import point for consumers. This simplifies imports and creates a well-defined public API boundary.',
          },
          {
            question: 'When is `import type` required rather than optional?',
            options: [
              'When importing from node_modules',
              'When importing default exports',
              'When verbatimModuleSyntax is enabled in tsconfig and you are importing a type',
              'When importing from .d.ts files',
            ],
            correctIndex: 2,
            explanation:
              'With verbatimModuleSyntax enabled, TypeScript requires that type-only imports use `import type`. A regular import of something that only exists as a type will cause a compile error.',
          },
        ],
        challenge: {
          prompt:
            'Create a barrel file pattern: define two module files (user.ts and product.ts) with exported interfaces and factory functions, then create a barrel index.ts that re-exports everything. Use type-only re-exports for the interfaces.',
          starterCode: `// user.ts exports
interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(name: string, email: string): User {
  return { id: Date.now(), name, email };
}

// product.ts exports
interface Product {
  id: number;
  title: string;
  price: number;
}

function createProduct(title: string, price: number): Product {
  return { id: Date.now(), title, price };
}

// TODO: Write barrel re-exports below
// Use 'export' and 'export type' to re-export from the modules above
// Then use the barrel imports to create a user and product
`,
          solutionCode: `// user.ts exports
interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(name: string, email: string): User {
  return { id: Date.now(), name, email };
}

// product.ts exports
interface Product {
  id: number;
  title: string;
  price: number;
}

function createProduct(title: string, price: number): Product {
  return { id: Date.now(), title, price };
}

// Barrel re-exports (index.ts)
export type { User } from './user';
export { createUser } from './user';
export type { Product } from './product';
export { createProduct } from './product';

// Consumer code (app.ts)
// import { createUser, createProduct, type User, type Product } from './models';
const user: User = createUser('Alice', 'alice@example.com');
const product: Product = createProduct('Widget', 9.99);

console.log(user);
console.log(product);`,
          hints: [
            'Use `export type { InterfaceName }` for type-only re-exports and `export { functionName }` for value re-exports.',
            'The barrel file should re-export from both user.ts and product.ts so consumers can import everything from a single path.',
            'After re-exporting, demonstrate the barrel import by creating instances using the factory functions with proper type annotations.',
          ],
        },
      },
      {
        id: 'declaration-files',
        title: 'Declaration Files (.d.ts)',
        difficulty: 'intermediate',
        tags: ['declaration', 'd.ts', 'declare', 'ambient', 'DefinitelyTyped', '@types'],
        cheatSheetSummary:
          'Writing .d.ts files for type declarations, declare keyword for ambient values, ambient modules, DefinitelyTyped/@types packages.',
        sections: [
          {
            heading: 'Writing Declaration Files',
            content:
              'Declaration files (.d.ts) describe the shape of existing JavaScript code without providing implementations. They contain only type information and are used by the TypeScript compiler for type checking and IntelliSense. When you write a library in TypeScript, the compiler can generate .d.ts files automatically using the declaration flag. For third-party JavaScript libraries without types, you write .d.ts files manually or install them from @types.',
            code: `// utils.d.ts — declaration file for a JS library
declare function formatDate(date: Date, format: string): string;
declare function parseDate(input: string): Date | null;

declare const VERSION: string;

declare interface Config {
  apiUrl: string;
  timeout: number;
  retries?: number;
}

declare class Logger {
  constructor(prefix: string);
  info(message: string): void;
  error(message: string, err?: Error): void;
}

// Usage in .ts file (compiler knows the shapes)
// const logger = new Logger('App');
// logger.info(formatDate(new Date(), 'YYYY-MM-DD'));
console.log('Declaration files provide types without implementations');
console.log('The compiler erases them entirely from output');`,
            output: `Declaration files provide types without implementations
The compiler erases them entirely from output`,
            tip: 'Enable "declaration": true in tsconfig.json to auto-generate .d.ts files from your TypeScript source. This is essential when publishing a library.',
            analogy: 'Think of it like a blueprint for a house: the .d.ts file shows every room, door, and window (the types), but contains no actual bricks or wiring (no runtime code). Builders (the compiler) use the blueprint to verify that everything fits together.',
            codeHighlightLines: [2, 3, 5, 7, 13],
          },
          {
            heading: 'Ambient Modules and declare module',
            content:
              'The declare module syntax creates ambient module declarations for modules that lack type definitions. This is commonly used for CSS modules, image imports, and untyped npm packages. You place these in a .d.ts file included in your project. Ambient declarations tell TypeScript what shape to expect without providing actual runtime code. Wildcard module declarations using patterns can type entire categories of imports at once.',
            code: `// global.d.ts — ambient module declarations

// Type CSS module imports
declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Type image imports
declare module '*.png' {
  const src: string;
  export default src;
}

// Type an untyped npm package
declare module 'untyped-lib' {
  export function doSomething(input: string): number;
  export interface Options {
    verbose: boolean;
    maxRetries: number;
  }
}

// Usage would be:
// import styles from './App.css';
// import logo from './logo.png';
// import { doSomething } from 'untyped-lib';
console.log('Ambient modules type external resources');
console.log('Wildcard patterns type entire file categories');`,
            output: `Ambient modules type external resources
Wildcard patterns type entire file categories`,
            warning: 'Ambient module declarations apply globally. Avoid conflicts by keeping them in a dedicated typings or @types folder and ensuring they are included in tsconfig.',
            codeHighlightLines: [4, 10, 16],
          },
          {
            heading: 'DefinitelyTyped and @types',
            content:
              'DefinitelyTyped is a massive community repository of type declarations for thousands of JavaScript packages. When you install @types/lodash, TypeScript automatically picks up the type declarations. The typeRoots and types options in tsconfig.json control which @types packages are included. For packages that ship their own types (indicated by a types or typings field in package.json), no @types package is needed. The compiler resolves types from node_modules/@types by default.',
            code: `// Installing types for a JS library:
// npm install --save-dev @types/lodash

// tsconfig.json controls type resolution
// {
//   "compilerOptions": {
//     "typeRoots": ["./node_modules/@types", "./typings"],
//     "types": ["node", "jest"]
//   }
// }

// After installing @types/lodash, full IntelliSense works:
// import _ from 'lodash';
// const sorted = _.sortBy([3, 1, 2]);  // typed as number[]
// const grouped = _.groupBy(['a', 'bb'], 'length');

// Check if a package ships its own types:
// Look for "types" or "typings" in package.json
interface PackageJson {
  name: string;
  types?: string;    // e.g., "./dist/index.d.ts"
  typings?: string;  // older field, same purpose
}
const pkg: PackageJson = { name: 'my-lib', types: './dist/index.d.ts' };
console.log(\`\${pkg.name} ships types at: \${pkg.types}\`);`,
            output: `my-lib ships types at: ./dist/index.d.ts`,
            tip: 'Use "types" in tsconfig to limit which @types are auto-included. This prevents test types (like @types/jest) from leaking into your production source files.',
          },
        ],
        quiz: [
          {
            question: 'What do declaration files (.d.ts) contain?',
            options: [
              'Compiled JavaScript output from TypeScript source',
              'Only type information without runtime implementations',
              'Test cases for TypeScript modules',
              'Configuration settings for the TypeScript compiler',
            ],
            correctIndex: 1,
            explanation:
              'Declaration files (.d.ts) contain only type declarations and no runtime code. They describe the shape of existing JavaScript code so TypeScript can provide type checking and IntelliSense without seeing the actual implementations.',
          },
          {
            question: 'What does `declare module "*.css"` accomplish?',
            options: [
              'It compiles CSS files into TypeScript modules',
              'It creates an ambient module declaration that types all .css file imports',
              'It converts CSS classes to TypeScript interfaces',
              'It imports CSS files as JavaScript objects at runtime',
            ],
            correctIndex: 1,
            explanation:
              'The wildcard `declare module "*.css"` creates an ambient module declaration that tells TypeScript what type to assign to any import of a .css file. This is compile-time only and does not affect how the files are actually loaded.',
          },
          {
            question: 'Where does TypeScript look for @types packages by default?',
            options: [
              'In the project root directory',
              'In the tsconfig.json file',
              'In node_modules/@types',
              'In a dedicated typings/ folder',
            ],
            correctIndex: 2,
            explanation:
              'TypeScript automatically resolves type declarations from node_modules/@types by default. The typeRoots and types options in tsconfig.json can customize this behavior to include additional locations or limit which @types packages are included.',
          },
          {
            question: 'How do you enable automatic .d.ts file generation from TypeScript source?',
            options: [
              'Set "declaration": true in tsconfig.json compilerOptions',
              'Run tsc --generate-declarations',
              'Add /// <reference declaration /> to each file',
              'Install @types/declaration-generator',
            ],
            correctIndex: 0,
            explanation:
              'Setting "declaration": true in tsconfig.json instructs the TypeScript compiler to automatically generate .d.ts files alongside the JavaScript output. This is essential when publishing a TypeScript library.',
          },
        ],
        challenge: {
          prompt:
            'Write a declaration file for a fictional JavaScript utility library called "string-tools" that provides: a capitalize function, a truncate function with an options parameter, and a StringTransformer class. Then demonstrate how you would use these typed declarations.',
          starterCode: `// string-tools.d.ts
// TODO: Declare the module 'string-tools' with:
// 1. A function capitalize(str: string): string
// 2. A function truncate(str: string, options?: { maxLength: number; suffix?: string }): string
// 3. A class StringTransformer with:
//    - constructor(input: string)
//    - toUpperCase(): StringTransformer
//    - reverse(): StringTransformer
//    - value(): string

// Usage demonstration
// import { capitalize, truncate, StringTransformer } from 'string-tools';
`,
          solutionCode: `// string-tools.d.ts
declare module 'string-tools' {
  export function capitalize(str: string): string;

  export interface TruncateOptions {
    maxLength: number;
    suffix?: string;
  }

  export function truncate(str: string, options?: TruncateOptions): string;

  export class StringTransformer {
    constructor(input: string);
    toUpperCase(): StringTransformer;
    reverse(): StringTransformer;
    value(): string;
  }
}

// Usage demonstration
// import { capitalize, truncate, StringTransformer } from 'string-tools';
// const title = capitalize('hello world');            // string
// const short = truncate('long text...', { maxLength: 5, suffix: '...' }); // string
// const result = new StringTransformer('hello')
//   .toUpperCase()
//   .reverse()
//   .value();   // string
console.log('Declaration file typed successfully');`,
          hints: [
            'Use `declare module "string-tools" { ... }` to create the ambient module declaration.',
            'Export the TruncateOptions as a separate interface within the module for cleaner typing of the options parameter.',
            'The StringTransformer methods that return StringTransformer enable method chaining (fluent API pattern).',
          ],
        },
      },
      {
        id: 'module-resolution',
        title: 'Module Resolution',
        difficulty: 'intermediate',
        tags: ['module-resolution', 'paths', 'baseUrl', 'node', 'bundler'],
        cheatSheetSummary:
          'Node vs bundler resolution strategies, paths mapping for aliases, baseUrl for absolute imports, moduleResolution compiler option.',
        sections: [
          {
            heading: 'Resolution Strategies',
            content:
              'TypeScript offers several module resolution strategies that determine how import specifiers are resolved to files. The "node" strategy mimics Node.js resolution, checking node_modules and index files. The "bundler" strategy (TypeScript 5.0+) is designed for projects using bundlers like Webpack or Vite, supporting package.json exports and extensionless imports. The "nodenext" strategy supports ESM and CJS interop in Node.js. Choosing the right strategy is critical for correct type resolution and avoiding phantom import errors.',
            code: `// tsconfig.json — key module resolution options
// {
//   "compilerOptions": {
//     "moduleResolution": "bundler",  // or "node", "nodenext"
//     "module": "esnext",
//     "target": "es2022",
//     "esModuleInterop": true
//   }
// }

// With "node" resolution, TS looks for:
//   ./utils  ->  ./utils.ts, ./utils/index.ts
//   'lodash' ->  node_modules/lodash/...

// With "bundler" resolution (TS 5.0+):
//   Supports package.json "exports" field
//   Allows extensionless relative imports
//   Designed for Vite, Webpack, esbuild

// With "nodenext" resolution:
//   Requires file extensions in relative imports
//   import { foo } from './utils.js';  // required!

console.log('moduleResolution controls how imports are resolved');
console.log('"bundler" is best for Vite/Webpack projects');`,
            output: `moduleResolution controls how imports are resolved
"bundler" is best for Vite/Webpack projects`,
            tip: 'For modern projects using Vite or Webpack, set moduleResolution to "bundler". For Node.js ESM projects, use "nodenext". Avoid the legacy "node" strategy for new projects.',
            analogy: 'Think of it like GPS navigation modes: "node" follows the old road map that Node.js uses, "bundler" follows the modern highway system that Vite and Webpack understand, and "nodenext" is the updated road map for modern Node.js with ESM street signs.',
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart TD
    I["import './utils'"] --> S{"moduleResolution?"}
    S -->|"node"| N["./utils.ts -> ./utils/index.ts -> node_modules"]
    S -->|"bundler"| B["./utils.ts (+ pkg exports)"]
    S -->|"nodenext"| NX["requires ./utils.js extension"]
    style N fill:#fff3e0,stroke:#e65100
    style B fill:#e8f5e9,stroke:#2e7d32
    style NX fill:#e3f2fd,stroke:#1565c0`,
              caption: 'Different resolution strategies resolve the same import specifier differently',
            },
          },
          {
            heading: 'Path Mapping and baseUrl',
            content:
              'The paths option in tsconfig.json creates import aliases that map to physical file paths. Combined with baseUrl, it allows clean imports like @/components/Button instead of long relative paths. Path mappings are resolved at compile time by TypeScript but require a corresponding runtime alias configuration in your bundler (e.g., Vite resolve.alias or Webpack resolve.alias). The baseUrl option sets the root directory for non-relative module imports.',
            code: `// tsconfig.json
// {
//   "compilerOptions": {
//     "baseUrl": ".",
//     "paths": {
//       "@/*": ["src/*"],
//       "@components/*": ["src/components/*"],
//       "@utils/*": ["src/utils/*"],
//       "@models": ["src/models/index.ts"]
//     }
//   }
// }

// Without path mapping:
// import { Button } from '../../../components/Button';
// import { formatDate } from '../../utils/date';

// With path mapping:
// import { Button } from '@components/Button';
// import { formatDate } from '@utils/date';
// import { User } from '@models';

// vite.config.ts — must mirror the aliases at runtime
// import { defineConfig } from 'vite';
// import path from 'path';
// export default defineConfig({
//   resolve: {
//     alias: { '@': path.resolve(__dirname, 'src') }
//   }
// });

console.log('Path aliases simplify imports across the project');
console.log('Remember to configure aliases in your bundler too');`,
            output: `Path aliases simplify imports across the project
Remember to configure aliases in your bundler too`,
            warning: 'TypeScript paths are compile-time only. You must also configure matching aliases in your bundler (Vite, Webpack) or use a tool like tsconfig-paths for Node.js runtime.',
          },
        ],
        quiz: [
          {
            question: 'Which moduleResolution strategy is recommended for projects using Vite or Webpack?',
            options: [
              '"node"',
              '"classic"',
              '"bundler"',
              '"nodenext"',
            ],
            correctIndex: 2,
            explanation:
              'The "bundler" strategy (TypeScript 5.0+) is designed for projects using bundlers like Vite and Webpack. It supports package.json "exports" fields and allows extensionless relative imports, matching how modern bundlers resolve modules.',
          },
          {
            question: 'What is required when using "nodenext" module resolution for relative imports?',
            options: [
              'Imports must use the .ts file extension',
              'Imports must include the .js file extension',
              'Imports must use the full absolute path',
              'Imports must use the @ alias prefix',
            ],
            correctIndex: 1,
            explanation:
              'With "nodenext" module resolution, relative imports must include the .js file extension (e.g., import { foo } from "./utils.js"). This matches Node.js ESM resolution rules, even though the source files are .ts.',
          },
          {
            question: 'What additional configuration is needed when using TypeScript path aliases?',
            options: [
              'No additional configuration — TypeScript handles it completely',
              'A matching alias configuration in your bundler or runtime (e.g., Vite resolve.alias)',
              'A separate paths.json file in the project root',
              'Installing the @types/paths package from npm',
            ],
            correctIndex: 1,
            explanation:
              'TypeScript path aliases are compile-time only. You must also configure matching aliases in your bundler (Vite, Webpack) or use a tool like tsconfig-paths for Node.js runtime to ensure the aliases resolve correctly at runtime.',
          },
        ],
        challenge: {
          prompt:
            'Set up a tsconfig.json with path aliases that map @models/*, @utils/*, and @services/* to their respective src subdirectories. Then write example code that uses these path aliases instead of long relative imports.',
          starterCode: `// TODO: Write the tsconfig.json compilerOptions with:
// - baseUrl set to "."
// - paths mapping for @models/*, @utils/*, @services/*
// Then show import examples using the aliases

// Without aliases (ugly):
// import { User } from '../../../models/User';
// import { formatDate } from '../../utils/date';
// import { ApiService } from '../../../services/api';

// With aliases (clean):
// TODO: Write the clean imports and usage
`,
          solutionCode: `// tsconfig.json compilerOptions:
// {
//   "compilerOptions": {
//     "baseUrl": ".",
//     "paths": {
//       "@models/*": ["src/models/*"],
//       "@utils/*": ["src/utils/*"],
//       "@services/*": ["src/services/*"]
//     }
//   }
// }

// vite.config.ts (must mirror aliases):
// import { defineConfig } from 'vite';
// import path from 'path';
// export default defineConfig({
//   resolve: {
//     alias: {
//       '@models': path.resolve(__dirname, 'src/models'),
//       '@utils': path.resolve(__dirname, 'src/utils'),
//       '@services': path.resolve(__dirname, 'src/services'),
//     }
//   }
// });

// Clean imports using aliases:
// import { User } from '@models/User';
// import { formatDate } from '@utils/date';
// import { ApiService } from '@services/api';

interface User { id: number; name: string; }
function formatDate(d: Date): string { return d.toISOString().split('T')[0]; }
class ApiService {
  async getUser(id: number): Promise<User> {
    return { id, name: 'Alice' };
  }
}

const api = new ApiService();
api.getUser(1).then(user => {
  console.log(\`User: \${user.name}, fetched on \${formatDate(new Date())}\`);
});`,
          hints: [
            'The paths option uses glob patterns: "@models/*" maps to ["src/models/*"] where * is the wildcard that matches any subpath.',
            'Remember that baseUrl must be set for paths to work. Setting it to "." means paths are relative to the tsconfig.json location.',
            'You need to mirror the aliases in your bundler config (Vite, Webpack) since TypeScript paths are compile-time only.',
          ],
        },
      },
      {
        id: 'namespaces',
        title: 'Namespaces',
        difficulty: 'intermediate',
        tags: ['namespace', 'internal-modules', 'legacy', 'merging', 'organization'],
        cheatSheetSummary:
          'namespace keyword groups related code, namespace merging, mostly a legacy pattern — prefer ES modules in modern code.',
        sections: [
          {
            heading: 'Namespace Basics',
            content:
              'Namespaces (formerly called internal modules) use the namespace keyword to group related types, functions, and variables under a single name. They create a closure that prevents polluting the global scope. While namespaces were essential before ES modules became standard, they are now considered a legacy pattern for most use cases. However, they remain useful for declaration merging and organizing large ambient type definitions.',
            code: `namespace Validation {
  export interface Validator {
    isValid(value: string): boolean;
  }

  export class EmailValidator implements Validator {
    isValid(value: string): boolean {
      return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
    }
  }

  export class MinLengthValidator implements Validator {
    constructor(private minLength: number) {}
    isValid(value: string): boolean {
      return value.length >= this.minLength;
    }
  }
}

// Access via namespace prefix
const emailCheck = new Validation.EmailValidator();
const lengthCheck = new Validation.MinLengthValidator(5);

console.log(emailCheck.isValid('alice@example.com'));
console.log(emailCheck.isValid('not-an-email'));
console.log(lengthCheck.isValid('hi'));
console.log(lengthCheck.isValid('hello world'));`,
            output: `true
false
false
true`,
            warning: 'Do not use namespaces and ES modules together in the same file. If your file has import or export statements, use ES modules exclusively. Namespaces are for script files or ambient declarations.',
            analogy: 'Think of it like a filing cabinet with labeled drawers: the namespace is the cabinet label (e.g., "Validation"), and everything inside is accessed by opening that specific drawer. It keeps related items together and out of the global clutter.',
          },
          {
            heading: 'Namespace Merging and When to Use',
            content:
              'TypeScript supports declaration merging where multiple namespace declarations with the same name are combined into a single namespace. This also works across interfaces, classes, and enums. Namespace merging is one of the few scenarios where namespaces are still valuable in modern TypeScript. It allows extending third-party types, adding static members to classes, and augmenting enums with utility functions. For organizing application code, always prefer ES modules.',
            code: `// Namespace merging — declarations combine
namespace Animals {
  export class Dog {
    constructor(public name: string) {}
    speak(): string { return \`\${this.name} says Woof!\`; }
  }
}

namespace Animals {
  export class Cat {
    constructor(public name: string) {}
    speak(): string { return \`\${this.name} says Meow!\`; }
  }
}

// Both Dog and Cat are in Animals
const dog = new Animals.Dog('Rex');
const cat = new Animals.Cat('Whiskers');
console.log(dog.speak());
console.log(cat.speak());

// Merging namespace with class (adding statics)
class Album {
  constructor(public title: string, public artist: string) {}
}
namespace Album {
  export function create(title: string, artist: string): Album {
    return new Album(title, artist);
  }
}

const album = Album.create('OK Computer', 'Radiohead');
console.log(\`\${album.title} by \${album.artist}\`);`,
            output: `Rex says Woof!
Whiskers says Meow!
OK Computer by Radiohead`,
            tip: 'Use namespace merging to add static helper methods to classes or utility functions to enums. For all other code organization, prefer ES modules with import/export.',
            codeHighlightLines: [2, 9, 23, 26],
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart LR
    NS1["namespace Animals (Dog)"] -->|merge| R["Animals { Dog, Cat }"]
    NS2["namespace Animals (Cat)"] -->|merge| R
    CL["class Album"] -->|merge| AL["Album { new(), create() }"]
    NS3["namespace Album"] -->|merge| AL
    style R fill:#e8f5e9,stroke:#2e7d32
    style AL fill:#e3f2fd,stroke:#1565c0`,
              caption: 'Multiple namespace declarations with the same name merge into one, and namespaces can merge with classes',
            },
          },
        ],
        quiz: [
          {
            question: 'What is the primary reason namespaces are considered a legacy pattern in modern TypeScript?',
            options: [
              'They are slower than ES modules at runtime',
              'They do not support type checking',
              'ES modules provide better tooling, tree-shaking, and standard-based code organization',
              'TypeScript plans to remove namespace support in a future version',
            ],
            correctIndex: 2,
            explanation:
              'ES modules are the standard module system supported by browsers and Node.js, offering better tree-shaking, bundler integration, and tooling support. Namespaces were essential before ES modules became standard but are now unnecessary for most application code organization.',
          },
          {
            question: 'What happens when two namespace declarations with the same name exist in TypeScript?',
            options: [
              'The compiler throws a duplicate identifier error',
              'The second declaration overrides the first',
              'They are merged into a single namespace containing members from both',
              'Only the first declaration is used; the second is ignored',
            ],
            correctIndex: 2,
            explanation:
              'TypeScript supports declaration merging for namespaces. Multiple namespace declarations with the same name are combined into a single namespace containing all exported members from each declaration.',
          },
          {
            question: 'Which scenario is namespaces still valuable for in modern TypeScript?',
            options: [
              'Organizing application business logic',
              'Declaration merging to add static members to classes or extend enums',
              'Replacing import/export statements',
              'Creating private variables inaccessible to other modules',
            ],
            correctIndex: 1,
            explanation:
              'Namespace merging remains valuable for adding static helper methods to classes, utility functions to enums, and extending third-party type definitions. For all other code organization, ES modules are preferred.',
          },
        ],
        challenge: {
          prompt:
            'Create a namespace called Geometry that contains interfaces for Shape and Circle, a function to calculate circle area, and then use namespace merging to add a Rectangle interface and its area function in a second namespace declaration. Finally, merge the namespace with a class.',
          starterCode: `// TODO: Create namespace Geometry with:
// - Interface Shape { kind: string }
// - Interface Circle extends Shape { radius: number }
// - Function circleArea(c: Circle): number

// TODO: Merge a second Geometry namespace with:
// - Interface Rectangle extends Shape { width: number; height: number }
// - Function rectangleArea(r: Rectangle): number

// TODO: Create a class ShapeFactory and merge a namespace
// ShapeFactory onto it with a static createCircle helper

// Test it all
`,
          solutionCode: `namespace Geometry {
  export interface Shape { kind: string; }
  export interface Circle extends Shape { radius: number; }
  export function circleArea(c: Circle): number {
    return Math.PI * c.radius ** 2;
  }
}

namespace Geometry {
  export interface Rectangle extends Shape { width: number; height: number; }
  export function rectangleArea(r: Rectangle): number {
    return r.width * r.height;
  }
}

class ShapeFactory {
  static defaultUnit = 'px';
}
namespace ShapeFactory {
  export function createCircle(radius: number): Geometry.Circle {
    return { kind: 'circle', radius };
  }
  export function createRectangle(w: number, h: number): Geometry.Rectangle {
    return { kind: 'rectangle', width: w, height: h };
  }
}

const circle = ShapeFactory.createCircle(5);
const rect = ShapeFactory.createRectangle(4, 6);
console.log(\`Circle area: \${Geometry.circleArea(circle).toFixed(2)}\`);
console.log(\`Rectangle area: \${Geometry.rectangleArea(rect)}\`);
console.log(\`Default unit: \${ShapeFactory.defaultUnit}\`);`,
          hints: [
            'Both namespace declarations must use the same name (Geometry) and export their members for them to merge.',
            'When merging a namespace with a class, the class must be declared first, then the namespace of the same name adds static-like members.',
            'Use Geometry.Circle and Geometry.Rectangle as types when referencing them outside the namespace.',
          ],
        },
      },
      {
        id: 'triple-slash-directives',
        title: 'Triple-Slash Directives',
        difficulty: 'intermediate',
        tags: ['triple-slash', 'reference', 'directive', 'types', 'path', 'lib'],
        cheatSheetSummary:
          '/// <reference> directives for types, path, and lib. Mostly replaced by tsconfig but still needed for some ambient type scenarios.',
        sections: [
          {
            heading: 'Reference Directives',
            content:
              'Triple-slash directives are single-line comments containing XML tags that serve as compiler instructions. The /// <reference path="..." /> directive declares a dependency on another file. The /// <reference types="..." /> directive includes types from an @types package. The /// <reference lib="..." /> directive includes a built-in lib file. These directives must appear at the top of the file before any code. They are largely replaced by tsconfig.json includes and types options but remain necessary in specific scenarios.',
            code: `// /// <reference types="node" />
// Above makes Node.js types available in this file

// /// <reference path="./global.d.ts" />
// Above includes type declarations from another file

// /// <reference lib="es2022" />
// Above includes built-in ES2022 type definitions

// When still needed:
// 1. Script files (no import/export) needing type references
// 2. Declaration files referencing other declaration files
// 3. Overriding default lib inclusions

// Modern alternative — tsconfig.json handles most cases:
// {
//   "compilerOptions": {
//     "types": ["node", "jest"],
//     "lib": ["es2022", "dom"]
//   },
//   "include": ["src/**/*", "typings/**/*"]
// }

console.log('Triple-slash directives are compile-time instructions');
console.log('tsconfig.json replaces most directive use cases');`,
            output: `Triple-slash directives are compile-time instructions
tsconfig.json replaces most directive use cases`,
            tip: 'Prefer configuring types and lib in tsconfig.json over triple-slash directives. Use directives only in .d.ts files or when you need file-level type granularity.',
          },
          {
            heading: 'Practical Directive Scenarios',
            content:
              'Triple-slash directives are still essential in declaration files that need to reference other declaration files, when authoring global type augmentations, and for library authors who need to express type dependencies. The reference types directive is particularly useful in monorepo setups where different packages need different ambient types. In .d.ts files distributed with npm packages, these directives ensure consumers get the right type dependencies automatically.',
            code: `// Example: library declaration file (my-lib.d.ts)
// /// <reference types="node" />

// Augmenting global types (global.d.ts)
// /// <reference lib="dom" />
declare global {
  interface Window {
    __APP_VERSION__: string;
    __DEBUG_MODE__: boolean;
  }
}

// In a script file without modules:
// /// <reference path="./vendor/legacy-lib.d.ts" />
// /// <reference types="jquery" />
// Now $ and jQuery are available globally

// Conditional type references in a monorepo:
// packages/server/src/env.d.ts
// /// <reference types="node" />
//
// packages/client/src/env.d.ts
// /// <reference types="vite/client" />

// Export needed to make this a module
export {};
console.log('Directives are essential in .d.ts files');
console.log('They express type-level dependencies for libraries');`,
            output: `Directives are essential in .d.ts files
They express type-level dependencies for libraries`,
            note: 'The export {} at the end of a .d.ts file with declare global makes it a module augmentation. Without it, the file is treated as a global script and declare global is unnecessary.',
            codeHighlightLines: [6, 7, 8, 9, 10, 25],
          },
        ],
        quiz: [
          {
            question: 'Where must triple-slash directives appear in a TypeScript file?',
            options: [
              'Anywhere in the file as long as they are inside comments',
              'At the very top of the file before any code or statements',
              'Inside a namespace or module block',
              'After all import statements',
            ],
            correctIndex: 1,
            explanation:
              'Triple-slash directives must appear at the very top of the file before any code, statements, or other non-directive comments. If placed elsewhere, they are treated as regular comments and ignored by the compiler.',
          },
          {
            question: 'What does `/// <reference types="node" />` do?',
            options: [
              'It imports the Node.js runtime into the current file',
              'It includes type declarations from the @types/node package for type checking',
              'It compiles the file with the Node.js compiler instead of tsc',
              'It enables Node.js-specific syntax extensions in TypeScript',
            ],
            correctIndex: 1,
            explanation:
              'The `/// <reference types="node" />` directive tells the TypeScript compiler to include type declarations from the @types/node package, making types like Buffer, process, and fs available for type checking in that file.',
          },
          {
            question: 'Why is `export {}` sometimes required in a .d.ts file with `declare global`?',
            options: [
              'It exports all declared global types to other files',
              'It prevents the file from being compiled to JavaScript',
              'It makes the file a module so that declare global works as an augmentation',
              'It is required syntax for all TypeScript declaration files',
            ],
            correctIndex: 2,
            explanation:
              'Adding `export {}` turns the file into a module (it has at least one export). This is necessary because `declare global` only works as a module augmentation. Without it, the file is treated as a global script and declare global is redundant.',
          },
          {
            question: 'Which modern alternative largely replaces triple-slash directives?',
            options: [
              'package.json scripts',
              'tsconfig.json with types, lib, and include options',
              'ESLint configuration files',
              'Webpack loader configuration',
            ],
            correctIndex: 1,
            explanation:
              'The tsconfig.json file provides types, lib, and include options that handle most use cases that triple-slash directives were originally designed for. Directives are still needed in specific scenarios like .d.ts files referencing other declarations.',
          },
        ],
        challenge: {
          prompt:
            'Write a global.d.ts file that uses declare global to augment the Window interface with custom properties: __APP_VERSION__ (string), __DEBUG_MODE__ (boolean), and __FEATURE_FLAGS__ (a Record of string keys to boolean values). Include the export {} to make it a module augmentation.',
          starterCode: `// global.d.ts
// TODO: Augment the global Window interface with:
//   __APP_VERSION__: string
//   __DEBUG_MODE__: boolean
//   __FEATURE_FLAGS__: Record<string, boolean>
// Remember to add export {} at the end

// After this file, the following should type-check in any .ts file:
// window.__APP_VERSION__       // string
// window.__DEBUG_MODE__        // boolean
// window.__FEATURE_FLAGS__     // Record<string, boolean>
`,
          solutionCode: `// global.d.ts
declare global {
  interface Window {
    __APP_VERSION__: string;
    __DEBUG_MODE__: boolean;
    __FEATURE_FLAGS__: Record<string, boolean>;
  }
}

export {};

// Now these are valid in any .ts file:
// console.log(window.__APP_VERSION__);
// if (window.__DEBUG_MODE__) { ... }
// const darkMode = window.__FEATURE_FLAGS__['dark-mode'];
`,
          hints: [
            'Use `declare global { ... }` to augment global types from within a module file.',
            'Inside declare global, extend the existing `interface Window` with your custom properties.',
            'Add `export {}` at the end so the file is treated as a module, which is required for declare global to work as an augmentation.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Async Patterns                                               */
  /* ------------------------------------------------------------ */
  {
    id: 'ts-async',
    label: 'Async Patterns',
    icon: 'Clock',
    entries: [
      {
        id: 'promises-typed',
        title: 'Typed Promises',
        difficulty: 'intermediate',
        tags: ['promise', 'async', 'Promise.all', 'Promise.allSettled', 'tuple'],
        cheatSheetSummary:
          'Promise<T> for typed async values, async functions infer return types, Promise.all with tuple types, Promise.allSettled for error-tolerant concurrency.',
        sections: [
          {
            heading: 'Promise<T> Basics',
            content:
              'In TypeScript, promises are generic over their resolved value type using Promise<T>. When you create a new Promise, TypeScript infers T from the resolve call or you can specify it explicitly. Async functions always return a Promise wrapping their return type. TypeScript enforces that you handle the correct type when consuming the resolved value, catching type mismatches at compile time rather than runtime.',
            code: `// Explicit Promise<T> typing
function fetchUser(id: number): Promise<{ name: string; age: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'Alice', age: 30 });
    }, 100);
  });
}

// Async function — return type inferred as Promise<string>
async function greet(id: number): Promise<string> {
  const user = await fetchUser(id);
  return \`Hello, \${user.name}! Age: \${user.age}\`;
}

// Consuming typed promises
async function main() {
  const user = await fetchUser(1);
  console.log(user.name);
  console.log(user.age);

  const message = await greet(1);
  console.log(message);
}
main();`,
            output: `Alice
30
Hello, Alice! Age: 30`,
            tip: 'Annotate the return type of public async functions explicitly. It serves as documentation and catches accidental return type changes.',
            analogy: 'Think of it like an IOU note with a specific denomination: Promise<string> is a note that says "I will give you a string later." TypeScript verifies the denomination matches when the IOU is redeemed.',
            codeHighlightLines: [2, 11],
          },
          {
            heading: 'Promise.all with Tuple Types',
            content:
              'Promise.all accepts an array or tuple of promises and returns a promise that resolves when all inputs resolve. TypeScript preserves tuple types, meaning each position in the result array retains its specific type. This is powerful for parallel data fetching where each promise returns a different type. If any promise rejects, the entire Promise.all rejects with that error.',
            code: `interface User { name: string; role: string; }
interface Post { title: string; likes: number; }
interface Settings { theme: string; lang: string; }

async function getUser(): Promise<User> {
  return { name: 'Alice', role: 'admin' };
}
async function getPosts(): Promise<Post[]> {
  return [{ title: 'Hello TS', likes: 42 }];
}
async function getSettings(): Promise<Settings> {
  return { theme: 'dark', lang: 'en' };
}

async function loadDashboard() {
  // Tuple type: [User, Post[], Settings]
  const [user, posts, settings] = await Promise.all([
    getUser(),
    getPosts(),
    getSettings(),
  ]);

  // Each variable is correctly typed
  console.log(\`User: \${user.name} (\${user.role})\`);
  console.log(\`Posts: \${posts.length}, first: \${posts[0].title}\`);
  console.log(\`Theme: \${settings.theme}, Lang: \${settings.lang}\`);
}
loadDashboard();`,
            output: `User: Alice (admin)
Posts: 1, first: Hello TS
Theme: dark, Lang: en`,
            tip: 'Promise.all short-circuits on the first rejection. If you need all results regardless of individual failures, use Promise.allSettled instead.',
            codeHighlightLines: [17, 18, 19, 20],
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart LR
    G1["getUser(): Promise&lt;User&gt;"] --> PA["Promise.all"]
    G2["getPosts(): Promise&lt;Post[]&gt;"] --> PA
    G3["getSettings(): Promise&lt;Settings&gt;"] --> PA
    PA --> R["[User, Post[], Settings]"]
    style PA fill:#e3f2fd,stroke:#1565c0
    style R fill:#e8f5e9,stroke:#2e7d32`,
              caption: 'Promise.all preserves the tuple type so each position retains its specific type',
            },
          },
          {
            heading: 'Promise.allSettled and Promise.race',
            content:
              'Promise.allSettled waits for all promises to settle (fulfill or reject) and returns an array of result objects with status, value, or reason fields. TypeScript types each result as PromiseSettledResult<T>, which is a discriminated union of PromiseFulfilledResult<T> and PromiseRejectedResult. Promise.race resolves or rejects as soon as the first promise settles. These patterns are essential for resilient concurrent operations.',
            code: `async function fetchData(url: string): Promise<string> {
  if (url.includes('fail')) throw new Error(\`Failed: \${url}\`);
  return \`Data from \${url}\`;
}

async function main() {
  const results = await Promise.allSettled([
    fetchData('/api/users'),
    fetchData('/api/fail'),
    fetchData('/api/posts'),
  ]);

  for (const result of results) {
    if (result.status === 'fulfilled') {
      console.log('OK:', result.value);
    } else {
      console.log('ERR:', result.reason.message);
    }
  }

  // Extract only successful results with type narrowing
  const successes = results
    .filter((r): r is PromiseFulfilledResult<string> =>
      r.status === 'fulfilled')
    .map(r => r.value);
  console.log('Successes:', successes);
}
main();`,
            output: `OK: Data from /api/users
ERR: Failed: /api/fail
OK: Data from /api/posts
Successes: [ 'Data from /api/users', 'Data from /api/posts' ]`,
            tip: 'Use a type predicate in the filter callback to narrow PromiseSettledResult to PromiseFulfilledResult. This gives you typed access to .value without casts.',
            analogy: 'Think of it like sending multiple couriers and waiting for all of them to return, successful or not: Promise.allSettled collects every report. Promise.race, by contrast, only cares about whoever arrives first.',
            codeHighlightLines: [7, 14, 16, 23, 24],
          },
        ],
        quiz: [
          {
            question: 'What type does TypeScript infer for the resolved value of `Promise.all([getUser(), getPosts()])` where getUser returns `Promise<User>` and getPosts returns `Promise<Post[]>`?',
            options: [
              'Promise<(User | Post[])[]>',
              'Promise<[User, Post[]]>',
              'Promise<User & Post[]>',
              'Promise<unknown[]>',
            ],
            correctIndex: 1,
            explanation:
              'TypeScript preserves tuple types with Promise.all. When given a tuple of promises with different resolved types, the result is a Promise of a tuple where each position retains its specific type: Promise<[User, Post[]]>.',
          },
          {
            question: 'What happens when one promise in a Promise.all call rejects?',
            options: [
              'The other promises continue and their results are collected with undefined for the failed one',
              'All promises are cancelled immediately',
              'The entire Promise.all rejects with the first rejection error',
              'The rejected promise is replaced with null in the result tuple',
            ],
            correctIndex: 2,
            explanation:
              'Promise.all short-circuits on the first rejection. As soon as any promise rejects, the entire Promise.all rejects with that error. The remaining promises still run, but their results are discarded.',
          },
          {
            question: 'How do you extract only successful results from Promise.allSettled with proper type narrowing?',
            options: [
              'Use .map() to access .value on every result',
              'Use .filter() with a type predicate `r is PromiseFulfilledResult<T>` checking r.status === "fulfilled"',
              'Use try/catch around each result access',
              'Cast the results array to the fulfilled type directly',
            ],
            correctIndex: 1,
            explanation:
              'Using a type predicate in .filter() narrows each element from PromiseSettledResult<T> to PromiseFulfilledResult<T>, giving typed access to .value without unsafe casts.',
          },
          {
            question: 'When should you prefer Promise.allSettled over Promise.all?',
            options: [
              'When all promises are guaranteed to succeed',
              'When you need the results of every promise regardless of individual failures',
              'When you only need the result of the fastest promise',
              'When the promises must execute sequentially rather than in parallel',
            ],
            correctIndex: 1,
            explanation:
              'Promise.allSettled is designed for scenarios where you want every result, whether fulfilled or rejected. It never short-circuits, waiting for all promises to settle and reporting each outcome individually.',
          },
        ],
        challenge: {
          prompt:
            'Write a function `fetchAllSafe` that takes an array of URL strings, fetches each one using a simulated async fetcher, and uses Promise.allSettled to return only the successful results as a string array with proper type narrowing.',
          starterCode: `// Simulated fetcher
async function fetchUrl(url: string): Promise<string> {
  if (url.includes('error')) throw new Error(\`Failed: \${url}\`);
  return \`Content from \${url}\`;
}

// TODO: Implement fetchAllSafe
// 1. Call fetchUrl for each URL using Promise.allSettled
// 2. Filter to only fulfilled results with a type predicate
// 3. Return the string[] of successful values
async function fetchAllSafe(urls: string[]): Promise<string[]> {
  // Your implementation here
}

// Test
async function main() {
  const results = await fetchAllSafe(['/api/users', '/api/error', '/api/posts']);
  console.log(results);
  // Expected: ['Content from /api/users', 'Content from /api/posts']
}
main();
`,
          solutionCode: `async function fetchUrl(url: string): Promise<string> {
  if (url.includes('error')) throw new Error(\`Failed: \${url}\`);
  return \`Content from \${url}\`;
}

async function fetchAllSafe(urls: string[]): Promise<string[]> {
  const results = await Promise.allSettled(urls.map(url => fetchUrl(url)));

  return results
    .filter((r): r is PromiseFulfilledResult<string> => r.status === 'fulfilled')
    .map(r => r.value);
}

async function main() {
  const results = await fetchAllSafe(['/api/users', '/api/error', '/api/posts']);
  console.log(results);
}
main();
`,
          hints: [
            'Use `urls.map(url => fetchUrl(url))` to create an array of promises to pass to Promise.allSettled.',
            'The type predicate `(r): r is PromiseFulfilledResult<string> => r.status === "fulfilled"` narrows the union type.',
            'After filtering, chain `.map(r => r.value)` to extract the string values from fulfilled results.',
          ],
        },
      },
      {
        id: 'async-await-ts',
        title: 'Async/Await in TypeScript',
        difficulty: 'intermediate',
        tags: ['async', 'await', 'error-handling', 'try-catch', 'async-iterator'],
        cheatSheetSummary:
          'Typing async functions, structured error handling with try/catch, typed error patterns, async iterators with for-await-of.',
        sections: [
          {
            heading: 'Typing Async Functions',
            content:
              'Async functions in TypeScript always return a Promise. The compiler infers the promise type from the return statements, but explicit annotations improve readability and act as a contract. You cannot use await outside an async function (unless using top-level await in ES modules). TypeScript ensures that awaited values are correctly unwrapped from their Promise wrapper, giving you direct access to the resolved type.',
            code: `// Return type is inferred as Promise<number>
async function computeSum(a: number, b: number): Promise<number> {
  return a + b;
}

// Async arrow functions
const fetchName = async (id: number): Promise<string> => {
  const names = ['Alice', 'Bob', 'Charlie'];
  return names[id] ?? 'Unknown';
};

// Async methods in classes
class ApiClient {
  private baseUrl: string;
  constructor(baseUrl: string) { this.baseUrl = baseUrl; }

  async get<T>(path: string): Promise<T> {
    console.log(\`GET \${this.baseUrl}\${path}\`);
    return {} as T;  // simplified for demo
  }
}

async function main() {
  const sum = await computeSum(3, 4);
  console.log('Sum:', sum);
  const name = await fetchName(1);
  console.log('Name:', name);
  const client = new ApiClient('https://api.example.com');
  await client.get<{ id: number }>('/users/1');
}
main();`,
            output: `Sum: 7
Name: Bob
GET https://api.example.com/users/1`,
            tip: 'Use generics with async methods (like get<T>) to let callers specify the expected response type. This provides type safety without runtime overhead.',
            codeHighlightLines: [2, 7, 17],
          },
          {
            heading: 'Error Handling Patterns',
            content:
              'TypeScript catches errors in async functions using try/catch, but the catch clause types the error as unknown by default (since TypeScript 4.4 with useUnknownInCatchVariables). This forces you to narrow the error type before accessing properties. Common patterns include instanceof checks, type guards, and result wrapper types that encode success or failure in the type system. Properly typed error handling prevents runtime surprises.',
            code: `// Custom error class for type narrowing
class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchData(url: string): Promise<string> {
  if (url.includes('404')) throw new ApiError(404, 'Not found');
  if (url.includes('500')) throw new ApiError(500, 'Server error');
  return 'data';
}

async function main() {
  try {
    const data = await fetchData('/api/404');
    console.log(data);
  } catch (err: unknown) {
    // Must narrow unknown before accessing properties
    if (err instanceof ApiError) {
      console.log(\`API Error \${err.statusCode}: \${err.message}\`);
    } else if (err instanceof Error) {
      console.log(\`Error: \${err.message}\`);
    } else {
      console.log('Unknown error:', err);
    }
  }
}
main();`,
            output: `API Error 404: Not found`,
            warning: 'Never type catch errors as any. Use unknown and narrow with instanceof or type guards. This prevents accessing nonexistent properties on non-Error thrown values.',
            analogy: 'Think of it like receiving an unlabeled package (unknown): you cannot just open it and assume what is inside. You must inspect it first (instanceof check) to determine whether it is an ApiError, a plain Error, or something else entirely.',
            codeHighlightLines: [2, 19, 21, 23],
          },
          {
            heading: 'Result Type Pattern',
            content:
              'The Result type pattern (inspired by Rust) encodes success and failure in the type system, avoiding try/catch entirely. A function returns either { ok: true, value: T } or { ok: false, error: E }, creating a discriminated union that TypeScript narrows automatically. This pattern makes error handling explicit in function signatures and prevents forgotten catch blocks. It is especially useful for operations that are expected to fail regularly, like validation or API calls.',
            code: `type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

async function parseJson<T>(raw: string): Promise<Result<T, string>> {
  try {
    const value = JSON.parse(raw) as T;
    return { ok: true, value };
  } catch {
    return { ok: false, error: \`Invalid JSON: \${raw.slice(0, 20)}...\` };
  }
}

interface User { name: string; age: number; }

async function main() {
  const good = await parseJson<User>('{"name":"Alice","age":30}');
  if (good.ok) {
    console.log(\`User: \${good.value.name}, Age: \${good.value.age}\`);
  }

  const bad = await parseJson<User>('not json at all');
  if (!bad.ok) {
    console.log(\`Parse error: \${bad.error}\`);
  }

  // Exhaustive handling
  const result = await parseJson<number[]>('[1,2,3]');
  console.log(result.ok ? \`Items: \${result.value.length}\` : result.error);
}
main();`,
            output: `User: Alice, Age: 30
Parse error: Invalid JSON: not json at all...
Items: 3`,
            tip: 'The Result pattern works well with discriminated unions. The ok field narrows the type automatically, so you get full IntelliSense for value on success and error on failure.',
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart TD
    F["parseJson(raw)"] --> C{"JSON.parse succeeds?"}
    C -->|Yes| S["{ ok: true, value: T }"]
    C -->|No| E["{ ok: false, error: string }"]
    S --> N{"result.ok?"}
    E --> N
    N -->|true| V["Access result.value (narrowed to T)"]
    N -->|false| ER["Access result.error (narrowed to E)"]
    style S fill:#e8f5e9,stroke:#2e7d32
    style E fill:#fce4ec,stroke:#c62828`,
              caption: 'The Result discriminated union lets TypeScript narrow to value or error based on the ok flag',
            },
            codeHighlightLines: [1, 2, 3, 8, 10],
          },
        ],
        quiz: [
          {
            question: 'Why does TypeScript type the catch clause variable as `unknown` by default (with useUnknownInCatchVariables)?',
            options: [
              'Because JavaScript only throws Error objects',
              'Because any value can be thrown in JavaScript, so the type cannot be known at compile time',
              'Because unknown is faster than any for error handling at runtime',
              'Because TypeScript always uses unknown for all function parameters',
            ],
            correctIndex: 1,
            explanation:
              'In JavaScript, literally any value can be thrown (strings, numbers, objects, Errors, etc.). Since the compiler cannot know what type was thrown, it types the catch variable as `unknown`, forcing you to narrow before accessing properties.',
          },
          {
            question: 'What is the main advantage of the Result<T, E> type pattern over try/catch?',
            options: [
              'It eliminates all runtime errors from the application',
              'It makes error handling explicit in the return type, preventing forgotten catch blocks',
              'It is faster at runtime than try/catch',
              'It automatically retries failed operations up to three times',
            ],
            correctIndex: 1,
            explanation:
              'The Result pattern encodes success and failure directly in the return type. Callers must handle both variants to access the value, making error handling explicit and impossible to accidentally forget, unlike try/catch where errors can silently propagate.',
          },
          {
            question: 'How should you safely access the `message` property on a catch clause variable typed as `unknown`?',
            options: [
              'Cast it directly with `(err as Error).message`',
              'Access err.message directly since all thrown values have it',
              'Use `if (err instanceof Error)` to narrow and then access err.message',
              'Use `typeof err === "error"` to check the type first',
            ],
            correctIndex: 2,
            explanation:
              'Using `instanceof Error` is the safest way to narrow an unknown catch variable. It confirms the value is an Error instance before accessing .message, preventing runtime errors when non-Error values are thrown.',
          },
        ],
        challenge: {
          prompt:
            'Implement a Result type as a discriminated union and a `safeDivide` function that returns `Result<number, string>`. It should return an error variant for division by zero and a success variant otherwise. Write a main function demonstrating both cases with proper narrowing.',
          starterCode: `// TODO: Define Result<T, E> as a discriminated union with:
//   { ok: true; value: T } | { ok: false; error: E }

// TODO: Implement safeDivide(a: number, b: number): Result<number, string>
// Return error for division by zero

// TODO: Write main that tests both success and error cases
async function main() {
  // safeDivide(10, 2) should print "Result: 5"
  // safeDivide(10, 0) should print "Error: Division by zero"
}
main();
`,
          solutionCode: `type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function safeDivide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { ok: false, error: 'Division by zero' };
  }
  return { ok: true, value: a / b };
}

async function main() {
  const good = safeDivide(10, 2);
  if (good.ok) {
    console.log(\`Result: \${good.value}\`);
  }

  const bad = safeDivide(10, 0);
  if (!bad.ok) {
    console.log(\`Error: \${bad.error}\`);
  }
}
main();
`,
          hints: [
            'The Result type is a union of `{ ok: true; value: T }` and `{ ok: false; error: E }` where `ok` is the discriminant.',
            'Check `b === 0` to decide whether to return the success or error variant.',
            'Use `if (result.ok)` to narrow to the success variant and access `.value`, or `if (!result.ok)` for the error variant and `.error`.',
          ],
        },
      },
      {
        id: 'async-generators',
        title: 'Async Generators',
        difficulty: 'intermediate',
        tags: ['async-generator', 'AsyncGenerator', 'for-await-of', 'streaming', 'iterator'],
        cheatSheetSummary:
          'AsyncGenerator<Y,R,N> type, for await...of consumption, practical patterns for streaming and paginated data.',
        sections: [
          {
            heading: 'AsyncGenerator Basics',
            content:
              'Async generators combine async functions with generator syntax, allowing you to yield values asynchronously over time. They are declared with async function* and produce an AsyncGenerator<Yield, Return, Next> type. The for await...of loop consumes async generators naturally, awaiting each yielded value. This pattern is ideal for streaming data, paginated API responses, and any scenario where values arrive asynchronously over time.',
            code: `// AsyncGenerator<Yield, Return, Next>
async function* countUp(limit: number): AsyncGenerator<number> {
  for (let i = 1; i <= limit; i++) {
    await new Promise(resolve => setTimeout(resolve, 50));
    yield i;
  }
}

// Paginated API simulation
async function* fetchPages<T>(
  fetcher: (page: number) => Promise<{ data: T[]; hasMore: boolean }>
): AsyncGenerator<T[]> {
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const result = await fetcher(page);
    yield result.data;
    hasMore = result.hasMore;
    page++;
  }
}

async function main() {
  // Consume with for-await-of
  for await (const num of countUp(5)) {
    process.stdout.write(\`\${num} \`);
  }
  console.log();

  // Paginated fetching
  const pages = fetchPages(async (page) => ({
    data: [\`item-\${page}a\`, \`item-\${page}b\`],
    hasMore: page < 3,
  }));
  for await (const batch of pages) {
    console.log('Batch:', batch);
  }
}
main();`,
            output: `1 2 3 4 5
Batch: [ 'item-1a', 'item-1b' ]
Batch: [ 'item-2a', 'item-2b' ]
Batch: [ 'item-3a', 'item-3b' ]`,
            tip: 'Async generators are lazy — they only execute up to the next yield when the consumer requests the next value. This makes them memory-efficient for large datasets.',
            analogy: 'Think of it like a conveyor belt with a pause button: the async generator places one item on the belt (yield), then pauses until the consumer picks it up (await). The belt does not flood the consumer with all items at once.',
            codeHighlightLines: [2, 5, 10, 12, 17, 25],
          },
          {
            heading: 'Streaming and Transformation Patterns',
            content:
              'Async generators can be composed and transformed just like synchronous iterators. You can create helper functions that accept an async iterable and yield transformed values, building pipelines for data processing. This pattern is heavily used in Node.js streams, server-sent events, WebSocket message processing, and real-time data feeds. TypeScript ensures type safety flows through each stage of the pipeline.',
            code: `// Transform helper: map over async iterable
async function* asyncMap<T, U>(
  source: AsyncIterable<T>,
  fn: (item: T) => U | Promise<U>
): AsyncGenerator<U> {
  for await (const item of source) {
    yield await fn(item);
  }
}

// Filter helper
async function* asyncFilter<T>(
  source: AsyncIterable<T>,
  predicate: (item: T) => boolean | Promise<boolean>
): AsyncGenerator<T> {
  for await (const item of source) {
    if (await predicate(item)) yield item;
  }
}

// Source generator
async function* generateNumbers(): AsyncGenerator<number> {
  for (let i = 1; i <= 10; i++) yield i;
}

async function main() {
  // Build a pipeline: generate -> filter evens -> double
  const source = generateNumbers();
  const evens = asyncFilter(source, n => n % 2 === 0);
  const doubled = asyncMap(evens, n => n * 2);

  const results: number[] = [];
  for await (const val of doubled) {
    results.push(val);
  }
  console.log('Pipeline result:', results);
}
main();`,
            output: `Pipeline result: [ 4, 8, 12, 16, 20 ]`,
            warning: 'Always handle errors in async generator pipelines. An unhandled rejection in a yielded promise will propagate to the consumer and terminate the for-await-of loop.',
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart LR
    G["generateNumbers() 1..10"] -->|"AsyncIterable"| F["asyncFilter(even?)"]
    F -->|"2,4,6,8,10"| M["asyncMap(n*2)"]
    M -->|"4,8,12,16,20"| C["for await...of consumer"]
    style G fill:#fff3e0,stroke:#e65100
    style F fill:#e3f2fd,stroke:#1565c0
    style M fill:#e8f5e9,stroke:#2e7d32`,
              caption: 'Async generator pipeline: each stage transforms the stream with full type safety',
            },
            codeHighlightLines: [2, 3, 4, 5, 12, 13, 14, 15],
          },
        ],
        quiz: [
          {
            question: 'How do you declare an async generator function in TypeScript?',
            options: [
              'async function generatorName() { yield value; }',
              'function* async generatorName() { yield value; }',
              'async function* generatorName() { yield value; }',
              'generator async function* generatorName() { yield value; }',
            ],
            correctIndex: 2,
            explanation:
              'Async generators use the `async function*` syntax, combining the async keyword with the generator asterisk. This allows the function to both `yield` values and `await` promises within its body.',
          },
          {
            question: 'What loop construct is used to consume values from an async generator?',
            options: [
              'for...of',
              'for await...of',
              'while (await generator.next()) with manual value extraction',
              'Array.from(generator).forEach()',
            ],
            correctIndex: 1,
            explanation:
              'The `for await...of` loop is specifically designed for consuming async iterables. It automatically awaits each yielded value, making it the natural and ergonomic way to consume async generators.',
          },
          {
            question: 'What does "lazy evaluation" mean in the context of async generators?',
            options: [
              'The generator executes all code upfront but delays returning results',
              'The generator only executes up to the next yield when the consumer requests the next value',
              'The generator skips values that take too long to compute',
              'The generator caches all yielded values in memory for fast re-reads',
            ],
            correctIndex: 1,
            explanation:
              'Lazy evaluation means the generator pauses after each yield and only resumes when the consumer requests the next value. This makes async generators memory-efficient because they process one item at a time rather than loading everything upfront.',
          },
          {
            question: 'What is the return type of `async function* generateItems(): ??? { yield "hello"; }`?',
            options: [
              'Promise<string[]>',
              'AsyncIterable<string>',
              'AsyncGenerator<string>',
              'Generator<Promise<string>>',
            ],
            correctIndex: 2,
            explanation:
              'An async generator function returns an AsyncGenerator<Yield, Return, Next>. For a function that yields strings, the type is AsyncGenerator<string>. AsyncGenerator also implements AsyncIterable, which is why for await...of works with it.',
          },
        ],
        challenge: {
          prompt:
            'Create an async generator function `paginatedFetch` that simulates paginated API calls. It should accept totalItems and pageSize, yield Item[] arrays for each page, and stop when all items are yielded. Then consume it with for await...of.',
          starterCode: `interface Item {
  id: number;
  name: string;
}

// TODO: Implement paginatedFetch as an async generator
// It should yield Item[] arrays, one per page
// async function* paginatedFetch(totalItems: number, pageSize: number): AsyncGenerator<Item[]> {
//   ...
// }

async function main() {
  // Fetch 7 items with page size 3 (should yield pages of [3, 3, 1] items)
  // for await (const page of paginatedFetch(7, 3)) {
  //   console.log(\`Page with \${page.length} items:\`, page.map(i => i.name));
  // }
}
main();
`,
          solutionCode: `interface Item {
  id: number;
  name: string;
}

async function* paginatedFetch(totalItems: number, pageSize: number): AsyncGenerator<Item[]> {
  let fetched = 0;
  while (fetched < totalItems) {
    const count = Math.min(pageSize, totalItems - fetched);
    const page: Item[] = [];
    for (let i = 0; i < count; i++) {
      page.push({ id: fetched + i + 1, name: \`Item \${fetched + i + 1}\` });
    }
    await new Promise(resolve => setTimeout(resolve, 50));
    yield page;
    fetched += count;
  }
}

async function main() {
  for await (const page of paginatedFetch(7, 3)) {
    console.log(\`Page with \${page.length} items:\`, page.map(i => i.name));
  }
}
main();
`,
          hints: [
            'Track how many items have been fetched with a counter and loop while fetched < totalItems.',
            'Use `Math.min(pageSize, totalItems - fetched)` to compute each page size (the last page may be smaller).',
            'Use `yield` inside the while loop to emit each page array, and add an `await` to simulate async work.',
          ],
        },
      },
      {
        id: 'typed-event-emitters',
        title: 'Typed Event Emitters',
        difficulty: 'intermediate',
        tags: ['events', 'event-emitter', 'typed-events', 'generic', 'EventTarget'],
        cheatSheetSummary:
          'Strongly-typed event systems using generics, type-safe emit/on patterns, EventTarget typing in the browser.',
        sections: [
          {
            heading: 'Generic Typed Event Emitter',
            content:
              'A typed event emitter uses TypeScript generics and mapped types to ensure that event names and their payload types are checked at compile time. By defining an event map interface, you get autocomplete for event names and type-safe callbacks. This prevents common bugs like misspelled event names or wrong handler signatures. The pattern uses keyof and indexed access types to connect event names to their data shapes.',
            code: `// Type-safe event emitter
type EventMap = Record<string, unknown>;
type EventCallback<T> = (data: T) => void;

class TypedEmitter<Events extends EventMap> {
  private listeners = new Map<string, Set<Function>>();

  on<K extends keyof Events & string>(
    event: K,
    callback: EventCallback<Events[K]>
  ): void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(callback);
  }

  emit<K extends keyof Events & string>(event: K, data: Events[K]): void {
    this.listeners.get(event)?.forEach(cb => cb(data));
  }
}

// Define events with their payload types
interface AppEvents {
  login: { userId: string; timestamp: number };
  logout: { userId: string };
  error: { code: number; message: string };
}

const emitter = new TypedEmitter<AppEvents>();

emitter.on('login', (data) => {
  // data is typed as { userId: string; timestamp: number }
  console.log(\`User \${data.userId} logged in at \${data.timestamp}\`);
});

emitter.on('error', (data) => {
  console.log(\`Error \${data.code}: \${data.message}\`);
});

emitter.emit('login', { userId: 'alice', timestamp: Date.now() });
emitter.emit('error', { code: 500, message: 'Internal error' });`,
            output: `User alice logged in at 1700000000000
Error 500: Internal error`,
            tip: 'Use interface declaration merging to extend event maps across modules. This lets plugins register their own event types on a shared emitter.',
            analogy: 'Think of it like a radio with preset stations: the event map defines which stations (event names) exist and what kind of broadcast (payload type) each one sends. You can only tune in (on) to real stations, and your receiver (callback) is built for that exact signal format.',
            codeHighlightLines: [5, 8, 9, 10, 16, 22, 23, 24, 25],
          },
          {
            heading: 'EventTarget and DOM Event Typing',
            content:
              'The browser EventTarget and Node.js EventEmitter can be typed using TypeScript interfaces and generics. For DOM events, TypeScript provides built-in types like MouseEvent, KeyboardEvent, and CustomEvent<T>. When creating custom DOM events, use CustomEvent<T> with a typed detail property. For addEventListener, TypeScript narrows the event type based on the event name string when using the HTMLElementEventMap.',
            code: `// Typing DOM event handlers
function setupButton(id: string): void {
  // addEventListener uses HTMLElementEventMap for type inference
  // button.addEventListener('click', (e: MouseEvent) => { ... });
  // button.addEventListener('keydown', (e: KeyboardEvent) => { ... });
  console.log(\`Button \${id} would be set up in a browser\`);
}

// Typed CustomEvent
interface NotificationDetail {
  title: string;
  severity: 'info' | 'warning' | 'error';
}

function createNotification(detail: NotificationDetail): CustomEvent<NotificationDetail> {
  return new CustomEvent<NotificationDetail>('notification', { detail });
}

// Type-safe Node.js EventEmitter pattern
interface ServerEvents {
  request: [url: string, method: string];
  connection: [clientId: string];
  error: [err: Error];
}

// Simulated typed handler
function handleEvent<K extends keyof ServerEvents>(
  event: K,
  ...args: ServerEvents[K]
): void {
  console.log(\`Event: \${String(event)}, Args: \${args.join(', ')}\`);
}

setupButton('submit');
handleEvent('request', '/api/users', 'GET');
handleEvent('connection', 'client-42');`,
            output: `Button submit would be set up in a browser
Event: request, Args: /api/users, GET
Event: connection, Args: client-42`,
            tip: 'Use tuple types in event maps (like [url: string, method: string]) for multi-argument events. Named tuple elements provide documentation in IDE tooltips.',
            codeHighlightLines: [10, 11, 12, 15, 20, 21, 22, 23, 27, 28, 29],
          },
        ],
        quiz: [
          {
            question: 'How does a typed event emitter enforce type safety for event handlers at compile time?',
            options: [
              'By validating event names at runtime using string comparison',
              'By using an event map interface with keyof and indexed access types to connect event names to payload types',
              'By requiring all events to use the same payload type',
              'By throwing runtime errors when mismatched event types are detected',
            ],
            correctIndex: 1,
            explanation:
              'A typed event emitter defines an interface mapping event names to their payload types. Using `keyof Events` and `Events[K]` indexed access, TypeScript constrains both the event name and the callback parameter type at compile time, catching mismatches before any code runs.',
          },
          {
            question: 'What is the purpose of `CustomEvent<T>` in TypeScript DOM event typing?',
            options: [
              'It creates a new HTML element type with custom behavior',
              'It defines a custom error type specifically for event handlers',
              'It creates a DOM event with a typed `detail` property of type T',
              'It replaces the standard Event class in all browsers',
            ],
            correctIndex: 2,
            explanation:
              'CustomEvent<T> is a generic DOM event type where the `detail` property is typed as T. This enables dispatching and listening for custom events with type-safe payloads in browser applications.',
          },
          {
            question: 'Why use named tuple types like `[url: string, method: string]` in event maps?',
            options: [
              'They are required by TypeScript to compile event map interfaces',
              'They provide descriptive labels in IDE tooltips and autocomplete for each tuple position',
              'They make event dispatch faster at runtime by using named arguments',
              'They allow an unlimited number of arguments in event handlers',
            ],
            correctIndex: 1,
            explanation:
              'Named tuple elements add descriptive labels (like `url` and `method`) to each position. These labels appear in IDE tooltips and autocomplete suggestions, serving as inline documentation for multi-argument events without affecting runtime behavior.',
          },
        ],
        challenge: {
          prompt:
            'Build a type-safe event emitter class with `on`, `off`, and `emit` methods. Define a ChatEvents interface with "message", "userJoined", and "userLeft" events, each with a typed payload. Demonstrate subscribing, emitting, and then unsubscribing a handler.',
          starterCode: `// TODO: Define ChatEvents interface with:
//   message: { userId: string; text: string; timestamp: number }
//   userJoined: { userId: string; username: string }
//   userLeft: { userId: string }

// TODO: Implement TypedEmitter<Events> class with on, off, and emit methods

// TODO: Create a ChatEvents emitter, subscribe to events,
// emit some events, then unsubscribe a handler and show it no longer fires
async function main() {
  // const emitter = new TypedEmitter<ChatEvents>();
  // ...
}
main();
`,
          solutionCode: `type EventMap = Record<string, unknown>;
type EventCallback<T> = (data: T) => void;

class TypedEmitter<Events extends EventMap> {
  private listeners = new Map<string, Set<Function>>();

  on<K extends keyof Events & string>(event: K, cb: EventCallback<Events[K]>): void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(cb);
  }

  off<K extends keyof Events & string>(event: K, cb: EventCallback<Events[K]>): void {
    this.listeners.get(event)?.delete(cb);
  }

  emit<K extends keyof Events & string>(event: K, data: Events[K]): void {
    this.listeners.get(event)?.forEach(fn => fn(data));
  }
}

interface ChatEvents {
  message: { userId: string; text: string; timestamp: number };
  userJoined: { userId: string; username: string };
  userLeft: { userId: string };
}

async function main() {
  const emitter = new TypedEmitter<ChatEvents>();

  const onMessage = (data: ChatEvents['message']) => {
    console.log(\`[\${data.userId}]: \${data.text}\`);
  };

  emitter.on('message', onMessage);
  emitter.on('userJoined', (data) => console.log(\`\${data.username} joined the chat\`));

  emitter.emit('userJoined', { userId: 'u1', username: 'Alice' });
  emitter.emit('message', { userId: 'u1', text: 'Hello everyone!', timestamp: Date.now() });

  // Unsubscribe and verify handler no longer fires
  emitter.off('message', onMessage);
  emitter.emit('message', { userId: 'u1', text: 'This will not be logged', timestamp: Date.now() });

  console.log('Done');
}
main();
`,
          hints: [
            'Store listeners in a `Map<string, Set<Function>>` for efficient add/remove operations.',
            'The `off` method should use `Set.delete()` to remove the specific callback function reference.',
            'Use `keyof Events & string` as the constraint for event name parameters to ensure only valid string event keys are accepted.',
          ],
        },
      },
    ],
  },
];

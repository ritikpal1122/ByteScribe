import type { DocCategory } from './types';

// Part 2: Interfaces & Classes
export const TS_PART2_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Interfaces                                                   */
  /* ------------------------------------------------------------ */
  {
    id: 'ts-interfaces',
    label: 'Interfaces',
    icon: 'FileText',
    entries: [
      {
        id: 'interface-basics',
        title: 'Interface Basics',
        difficulty: 'intermediate',
        tags: ['interface', 'optional', 'readonly', 'extends', 'typescript', 'shape'],
        cheatSheetSummary: 'Interfaces define object shapes. Use ? for optional, readonly for immutable, extends to inherit.',
        sections: [
          {
            heading: 'Defining Interfaces',
            content:
              'An interface in TypeScript describes the shape of an object by declaring property names and their types. Interfaces are purely a compile-time construct and produce no JavaScript output. They act as contracts that objects must satisfy when used as type annotations. Unlike type aliases, interfaces are open and can be extended or merged, making them ideal for public API definitions.',
            code: `interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
};

// Type-checked: missing or extra properties cause errors
console.log(\`\${user.name} <\${user.email}>\`);

// Interfaces work as function parameter types
function greet(u: User): string {
  return \`Hello, \${u.name}!\`;
}
console.log(greet(user));`,
            output: `Alice <alice@example.com>
Hello, Alice!`,
            tip: 'Interfaces only exist at compile time. After compilation, all interface annotations are removed and produce zero runtime overhead.',
            analogy: 'Think of it like a blueprint for a house: the blueprint specifies where the doors and windows go (the shape), but it is not the house itself. Any house built to match the blueprint satisfies the contract.',
          },
          {
            heading: 'Optional and Readonly Properties',

            content:
              'Optional properties are marked with a question mark (?) and may or may not be present on the object. Readonly properties are prefixed with the readonly modifier and cannot be reassigned after the object is created. Combining these modifiers lets you model data precisely, distinguishing between fields that must always exist and those that are optional or immutable.',
            code: `interface Config {
  readonly host: string;
  readonly port: number;
  debug?: boolean;
  logLevel?: 'info' | 'warn' | 'error';
}

const config: Config = {
  host: 'localhost',
  port: 3000,
};

// config.host = 'other'; // Error: readonly
console.log(config.debug);      // undefined (optional)
console.log(config.host);       // 'localhost'

// Optional properties require checks before use
if (config.logLevel) {
  console.log(\`Log level: \${config.logLevel}\`);
} else {
  console.log('Log level: default');
}`,
            output: `undefined
localhost
Log level: default`,
            note: 'readonly prevents reassignment but does not make nested objects deeply immutable. Use Readonly<T> utility type or libraries like Immer for deep immutability.',
            codeHighlightLines: [2, 3, 4, 5],
          },
          {
            heading: 'Extending Interfaces',
            content:
              'Interfaces can extend one or more other interfaces using the extends keyword. The child interface inherits all properties from its parents and can add new ones. This enables you to build complex types incrementally from simpler building blocks. Multiple inheritance is supported, letting an interface extend several parents at once, which is more flexible than class inheritance.',
            code: `interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface Identifiable {
  id: string;
}

// Extend multiple interfaces
interface BlogPost extends Identifiable, Timestamped {
  title: string;
  content: string;
  published: boolean;
}

const post: BlogPost = {
  id: 'abc-123',
  title: 'TypeScript Interfaces',
  content: 'Interfaces are powerful...',
  published: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-06-15'),
};

console.log(\`[\${post.id}] \${post.title}\`);
console.log(\`Published: \${post.published}\`);`,
            output: `[abc-123] TypeScript Interfaces
Published: true`,
            tip: 'Prefer small, focused interfaces that you compose with extends. This follows the Interface Segregation Principle and makes your types more reusable across the codebase.',
            diagram: {
              kind: 'mermaid',
              code: `classDiagram
    class Identifiable {
        +string id
    }
    class Timestamped {
        +Date createdAt
        +Date updatedAt
    }
    class BlogPost {
        +string id
        +Date createdAt
        +Date updatedAt
        +string title
        +string content
        +boolean published
    }
    Identifiable <|-- BlogPost : extends
    Timestamped <|-- BlogPost : extends`,
              caption: 'BlogPost extends both Identifiable and Timestamped, inheriting all their properties',
            },
          },
        ],
        quiz: [
          {
            question: 'What happens to TypeScript interfaces after compilation to JavaScript?',
            options: [
              'They are converted to runtime type checks',
              'They are completely removed and produce no JavaScript output',
              'They become JavaScript classes',
              'They are converted to JSON schema objects',
            ],
            correctIndex: 1,
            explanation: 'Interfaces are purely a compile-time construct. After compilation, all interface annotations are removed and produce zero runtime overhead.',
          },
          {
            question: 'How do you mark a property as optional in a TypeScript interface?',
            options: [
              'Using the optional keyword before the property name',
              'Using the | undefined union type only',
              'Using a question mark (?) after the property name',
              'Wrapping the type in Optional<T>',
            ],
            correctIndex: 2,
            explanation: 'Optional properties are marked with a question mark (?) after the property name, e.g., debug?: boolean. The property may or may not be present on the object.',
          },
          {
            question: 'What keyword is used to inherit from one or more interfaces?',
            options: [
              'implements',
              'extends',
              'inherits',
              'uses',
            ],
            correctIndex: 1,
            explanation: 'Interfaces use the extends keyword for inheritance. A child interface can extend multiple parent interfaces separated by commas, inheriting all their properties.',
          },
          {
            question: 'What does the readonly modifier do on an interface property?',
            options: [
              'Makes the property invisible to other code',
              'Prevents the property from being read',
              'Prevents the property from being reassigned after the object is created',
              'Makes the property deeply immutable including nested objects',
            ],
            correctIndex: 2,
            explanation: 'The readonly modifier prevents reassignment of the property after the object is created. However, it does not make nested objects deeply immutable.',
          },
        ],
        challenge: {
          prompt: 'Create an interface hierarchy for a media library. Define a base MediaItem interface with id (string), title (string), and optional rating (number). Then create a Song interface that extends MediaItem and adds artist (string) and durationSecs (number). Create a Playlist interface that extends MediaItem and adds songs (Song[]) and readonly createdBy (string). Finally, create a playlist object and a function that calculates total duration.',
          starterCode: `// Define the MediaItem interface
// ...

// Define Song extending MediaItem
// ...

// Define Playlist extending MediaItem
// ...

// Create a playlist with at least 2 songs
// ...

// Write a function that calculates total duration of a playlist
function totalDuration(playlist: Playlist): number {
  // your code here
}

// Test it
// console.log(totalDuration(myPlaylist));`,
          solutionCode: `interface MediaItem {
  id: string;
  title: string;
  rating?: number;
}

interface Song extends MediaItem {
  artist: string;
  durationSecs: number;
}

interface Playlist extends MediaItem {
  songs: Song[];
  readonly createdBy: string;
}

const myPlaylist: Playlist = {
  id: 'pl-1',
  title: 'Favorites',
  rating: 5,
  createdBy: 'Alice',
  songs: [
    { id: 's1', title: 'Song A', artist: 'Artist 1', durationSecs: 210 },
    { id: 's2', title: 'Song B', artist: 'Artist 2', durationSecs: 185 },
    { id: 's3', title: 'Song C', artist: 'Artist 1', durationSecs: 240 },
  ],
};

function totalDuration(playlist: Playlist): number {
  return playlist.songs.reduce((sum, song) => sum + song.durationSecs, 0);
}

console.log(\`Total duration: \${totalDuration(myPlaylist)}s\`);`,
          hints: [
            'Start with the base MediaItem interface, then use extends to build Song and Playlist on top of it.',
            'Use Array.reduce() to sum up all durationSecs values from the songs array.',
            'Remember that readonly on createdBy means you cannot reassign it after the object is created.',
          ],
        },
      },
      {
        id: 'function-types',
        title: 'Function Types in Interfaces',
        difficulty: 'intermediate',
        tags: ['function-type', 'call-signature', 'construct-signature', 'overload'],
        cheatSheetSummary: 'Interfaces can describe callable objects with call/construct signatures and overloads.',
        sections: [
          {
            heading: 'Call Signatures and Method Signatures',
            content:
              'Interfaces can describe functions using call signatures, which define the parameter types and return type of a callable object. A call signature looks like a function declaration without the function keyword or name. Method signatures within an interface define methods on an object. The distinction matters: call signatures describe standalone callable objects, while method signatures describe functions attached to an object.',
            code: `// Call signature — describes a standalone function
interface MathOperation {
  (a: number, b: number): number;
}

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;
console.log(add(3, 4));       // 7
console.log(multiply(3, 4));  // 12

// Method signatures on an object
interface Calculator {
  value: number;
  add(n: number): Calculator;
  subtract(n: number): Calculator;
  result(): number;
}

const calc: Calculator = {
  value: 0,
  add(n) { return { ...this, value: this.value + n }; },
  subtract(n) { return { ...this, value: this.value - n }; },
  result() { return this.value; },
};
console.log(calc.add(10).subtract(3).result());`,
            output: `7
12
7`,
            tip: 'Use call signatures when you need a callable interface that also has properties. Method signatures are best for describing object methods within a larger interface.',
            codeHighlightLines: [2, 3, 14, 15, 16],
            analogy: 'Think of it like a job description: a call signature describes what a freelancer (standalone function) can do, while method signatures describe the duties of employees (methods) within a company (object).',
          },
          {
            heading: 'Construct Signatures and Overloaded Functions',
            content:
              'Construct signatures describe types that can be instantiated with the new keyword. They use the new prefix before the parameter list. Overloaded function types define multiple call signatures on the same interface, allowing a function to accept different argument types and return different results. TypeScript resolves the correct overload at compile time based on the arguments provided.',
            code: `// Construct signature
interface UserConstructor {
  new (name: string, age: number): { name: string; age: number };
}

function createUser(Ctor: UserConstructor, name: string, age: number) {
  return new Ctor(name, age);
}

class SimpleUser {
  constructor(public name: string, public age: number) {}
}

const u = createUser(SimpleUser, 'Alice', 30);
console.log(u.name, u.age);

// Overloaded function type
interface Formatter {
  (value: string): string;
  (value: number): string;
  (value: Date): string;
}

const format: Formatter = ((value: string | number | Date): string => {
  if (typeof value === 'string') return value.toUpperCase();
  if (typeof value === 'number') return value.toFixed(2);
  return value.toISOString().split('T')[0];
}) as Formatter;

console.log(format('hello'));
console.log(format(3.14159));
console.log(format(new Date('2024-06-15')));`,
            output: `Alice 30
HELLO
3.14
2024-06-15`,
            warning: 'Construct signatures are an advanced feature primarily used in factory patterns and dependency injection. Most codebases rarely need them directly.',
          },
        ],
        quiz: [
          {
            question: 'What is a call signature in a TypeScript interface?',
            options: [
              'A signature that defines a class constructor',
              'A signature that describes a callable object with parameter and return types',
              'A signature that validates function arguments at runtime',
              'A signature used to name anonymous functions',
            ],
            correctIndex: 1,
            explanation: 'A call signature describes a callable object by defining its parameter types and return type. It looks like a function declaration without the function keyword or name, e.g., (a: number, b: number): number.',
          },
          {
            question: 'What distinguishes a construct signature from a call signature?',
            options: [
              'Construct signatures use the class keyword',
              'Construct signatures use the new prefix before the parameter list',
              'Construct signatures cannot have return types',
              'Construct signatures are only used with abstract classes',
            ],
            correctIndex: 1,
            explanation: 'Construct signatures use the new prefix before the parameter list, e.g., new (name: string): User. They describe types that can be instantiated with the new keyword.',
          },
          {
            question: 'How does TypeScript resolve overloaded function types defined in an interface?',
            options: [
              'It picks the first matching overload at runtime',
              'It resolves the correct overload at compile time based on the arguments',
              'It always uses the last defined overload',
              'It throws an error if multiple overloads match',
            ],
            correctIndex: 1,
            explanation: 'TypeScript resolves the correct overload at compile time based on the arguments provided. The compiler checks each overload signature in order and uses the first one that matches.',
          },
        ],
        challenge: {
          prompt: 'Create an interface StringProcessor with two call signatures (overloads): one that takes a single string and returns a string, and another that takes a string and a number (repeat count) and returns a string. Implement a function that satisfies this interface: when given just a string, it returns it uppercased; when given a string and a number, it repeats the string that many times separated by spaces.',
          starterCode: `// Define the StringProcessor interface with overloaded call signatures
// ...

// Implement the function
const process: StringProcessor = // your implementation

// Test
console.log(process('hello'));        // HELLO
console.log(process('ha', 3));        // ha ha ha`,
          solutionCode: `interface StringProcessor {
  (input: string): string;
  (input: string, repeat: number): string;
}

const process: StringProcessor = ((input: string, repeat?: number): string => {
  if (repeat !== undefined) {
    return Array(repeat).fill(input).join(' ');
  }
  return input.toUpperCase();
}) as StringProcessor;

console.log(process('hello'));        // HELLO
console.log(process('ha', 3));        // ha ha ha`,
          hints: [
            'Define two call signatures inside the interface, each with different parameter lists.',
            'The implementation function must handle both cases, so use an optional parameter for repeat and check if it is defined.',
            'You may need to cast the implementation as StringProcessor since TypeScript needs help matching overloads.',
          ],
        },
      },
      {
        id: 'index-signatures',
        title: 'Index Signatures',
        difficulty: 'intermediate',
        tags: ['index-signature', 'dynamic-keys', 'record', 'dictionary', 'typescript'],
        cheatSheetSummary: 'Index signatures allow dynamic keys: { [key: string]: Type }. Use with known props for flexibility.',
        sections: [
          {
            heading: 'String and Number Index Signatures',
            content:
              'Index signatures let you describe objects with dynamic keys whose names are not known at compile time. A string index signature uses [key: string]: Type and allows any string key. A number index signature uses [key: number]: Type and is used for array-like objects. The number index return type must be a subtype of the string index return type, because JavaScript converts number keys to strings at runtime.',
            code: `// String index signature — dictionary pattern
interface StringMap {
  [key: string]: string;
}

const headers: StringMap = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer token123',
};
headers['X-Custom'] = 'custom-value';
console.log(headers['Content-Type']);

// Number index signature — array-like
interface NumberArray {
  [index: number]: string;
  length: number;
}

const arr: NumberArray = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
console.log(arr[0], arr[1], arr[2]);

// Readonly index signature
interface ReadonlyMap {
  readonly [key: string]: number;
}

const scores: ReadonlyMap = { alice: 95, bob: 87 };
// scores['alice'] = 100; // Error: readonly
console.log(scores['alice']);`,
            output: `application/json
a b c
95`,
            tip: 'Prefer the Record<K, V> utility type over manual index signatures for simple key-value maps. Record<string, number> is equivalent to { [key: string]: number } but more readable.',
            analogy: 'Think of it like a dictionary or phone book: you do not know all the entries in advance, but you know every entry maps a name (string key) to a phone number (value type).',
          },
          {
            heading: 'Mixing Known and Dynamic Keys',
            content:
              'You can combine specific known properties with an index signature to get the best of both worlds. The known properties provide autocompletion and strict type checking, while the index signature allows additional dynamic keys. All explicitly declared properties must conform to the index signature type. This pattern is common for configuration objects and API responses where some fields are always present and others vary.',
            code: `// Known properties + dynamic keys
interface APIResponse {
  status: number;
  message: string;
  [key: string]: string | number | boolean;
}

const response: APIResponse = {
  status: 200,
  message: 'OK',
  userId: 42,
  isAdmin: true,
  theme: 'dark',
};

console.log(response.status);    // autocompletion works
console.log(response.message);
console.log(response['userId']); // dynamic access

// Pattern: environment variables
interface Env {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: string;
  [key: string]: string;
}

const env: Env = {
  NODE_ENV: 'production',
  PORT: '3000',
  DATABASE_URL: 'postgres://localhost/db',
  SECRET_KEY: 'abc123',
};

console.log(\`\${env.NODE_ENV} on port \${env.PORT}\`);`,
            output: `200
OK
42
production on port 3000`,
            note: 'When mixing known and dynamic properties, every declared property type must be assignable to the index signature type. This can sometimes require widening the index signature with a union.',
          },
        ],
        quiz: [
          {
            question: 'What is the syntax for a string index signature in TypeScript?',
            options: [
              'index: string => Type',
              '{ [key: string]: Type }',
              '{ string: Type }',
              '{ key<string>: Type }',
            ],
            correctIndex: 1,
            explanation: 'A string index signature uses the syntax { [key: string]: Type }, where key is a placeholder name and Type is the value type for all string-keyed properties.',
          },
          {
            question: 'Why must a number index return type be a subtype of the string index return type?',
            options: [
              'Because number indices are always converted to string indices by TypeScript',
              'Because JavaScript converts number keys to strings at runtime',
              'Because number types are a subset of string types',
              'This is not actually a requirement in TypeScript',
            ],
            correctIndex: 1,
            explanation: 'JavaScript converts number keys to strings at runtime (e.g., obj[0] becomes obj["0"]). Therefore, the number index return type must be compatible with the string index return type.',
          },
          {
            question: 'What happens when you add a readonly modifier to an index signature?',
            options: [
              'All keys become readonly strings',
              'The object cannot have new keys added',
              'Properties accessed via the index signature cannot be reassigned',
              'The object is frozen at runtime',
            ],
            correctIndex: 2,
            explanation: 'A readonly index signature (readonly [key: string]: Type) prevents reassignment of properties accessed via the index signature. It is a compile-time check only.',
          },
          {
            question: 'When mixing known properties with an index signature, what constraint applies?',
            options: [
              'Known properties must come before the index signature',
              'Known property types must be assignable to the index signature type',
              'You can only have one known property with an index signature',
              'Known properties override the index signature for their keys',
            ],
            correctIndex: 1,
            explanation: 'All explicitly declared property types must be assignable to the index signature type. This ensures type consistency when properties are accessed dynamically.',
          },
        ],
        challenge: {
          prompt: 'Create a type-safe configuration system using index signatures. Define a CSSStyles interface with known properties color (string), fontSize (string), and display (string), plus an index signature that allows any additional string keys with string values. Write a function mergeStyles that takes two CSSStyles objects and returns a merged result where the second object overrides the first.',
          starterCode: `// Define the CSSStyles interface
// ...

// Implement mergeStyles
function mergeStyles(base: CSSStyles, overrides: CSSStyles): CSSStyles {
  // your code here
}

// Test
const base: CSSStyles = {
  color: 'black',
  fontSize: '16px',
  display: 'block',
  margin: '0',
};

const overrides: CSSStyles = {
  color: 'red',
  fontSize: '20px',
  display: 'flex',
  padding: '10px',
};

console.log(mergeStyles(base, overrides));`,
          solutionCode: `interface CSSStyles {
  color: string;
  fontSize: string;
  display: string;
  [key: string]: string;
}

function mergeStyles(base: CSSStyles, overrides: CSSStyles): CSSStyles {
  return { ...base, ...overrides };
}

const base: CSSStyles = {
  color: 'black',
  fontSize: '16px',
  display: 'block',
  margin: '0',
};

const overrides: CSSStyles = {
  color: 'red',
  fontSize: '20px',
  display: 'flex',
  padding: '10px',
};

const merged = mergeStyles(base, overrides);
console.log(merged);
// { color: 'red', fontSize: '20px', display: 'flex', margin: '0', padding: '10px' }`,
          hints: [
            'The index signature [key: string]: string allows any additional string keys beyond color, fontSize, and display.',
            'Use the spread operator (...) to merge two objects, with the second object\'s values overriding the first.',
            'All known properties must have types assignable to the index signature type (string in this case).',
          ],
        },
      },
      {
        id: 'interface-vs-type',
        title: 'Interface vs Type',
        difficulty: 'intermediate',
        tags: ['interface', 'type-alias', 'extends', 'intersection', 'declaration-merging', 'best-practices'],
        cheatSheetSummary: 'Use interface for object shapes and public APIs. Use type for unions, primitives, and complex types.',
        sections: [
          {
            heading: 'Key Differences',
            content:
              'Both interface and type alias can describe object shapes, but they differ in important ways. Interfaces support declaration merging, meaning multiple declarations with the same name automatically combine. Type aliases do not merge and will cause an error if declared twice. Interfaces use extends for inheritance while types use intersection (&). Interfaces can only describe object shapes, while type aliases can represent any type including unions, primitives, tuples, and mapped types.',
            code: `// Interface — extends for inheritance
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}

// Type — intersection for combining
type AnimalT = {
  name: string;
};
type DogT = AnimalT & {
  breed: string;
};

// Both work the same way here
const dog1: Dog = { name: 'Rex', breed: 'Lab' };
const dog2: DogT = { name: 'Max', breed: 'Poodle' };
console.log(dog1.name, dog1.breed);
console.log(dog2.name, dog2.breed);

// Type can do things interface cannot
type ID = string | number;           // union
type Pair = [string, number];         // tuple
type Callback = (data: string) => void; // function

const id: ID = 42;
const pair: Pair = ['age', 30];
console.log(id, pair);`,
            output: `Rex Lab
Max Poodle
42 ['age', 30]`,
            tip: 'A practical guideline: use interface for objects you expect others to extend or implement, and type for everything else (unions, tuples, mapped types, utility compositions).',
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    A{"What are you typing?"} -->|"Object shape"| B{"Will it be extended\\nor merged?"}
    A -->|"Union / Tuple / Primitive"| C["Use type"]
    A -->|"Function signature"| C
    B -->|"Yes"| D["Use interface"]
    B -->|"No / Don't care"| E["Either works\\nBe consistent"]
    style C fill:#3178c6,color:#fff
    style D fill:#27ae60,color:#fff
    style E fill:#f39c12,color:#fff`,
              caption: 'Decision guide for choosing between interface and type',
            },
          },
          {
            heading: 'Declaration Merging with Interfaces',
            content:
              'Declaration merging is unique to interfaces. When two interface declarations share the same name in the same scope, TypeScript automatically merges them into a single interface containing all properties from both. This feature is heavily used for augmenting third-party library types and extending global types like Window or NodeJS.Process. Type aliases cannot be reopened or merged, so each name must be unique.',
            code: `// Declaration merging — interfaces combine automatically
interface Window {
  title: string;
}

interface Window {
  appVersion: string;
}

// Merged: Window has both title and appVersion
const win: Window = {
  title: 'My App',
  appVersion: '2.0.0',
};
console.log(\`\${win.title} v\${win.appVersion}\`);

// Type aliases cannot merge
// type Point = { x: number };
// type Point = { y: number }; // Error: Duplicate identifier

// Practical: augmenting Express Request
// declare module 'express' {
//   interface Request {
//     userId?: string;
//     role?: 'admin' | 'user';
//   }
// }

// Interface extends type (and vice versa)
type HasName = { name: string };
interface Employee extends HasName {
  company: string;
}
const emp: Employee = { name: 'Alice', company: 'Acme' };
console.log(\`\${emp.name} at \${emp.company}\`);`,
            output: `My App v2.0.0
Alice at Acme`,
            note: 'Declaration merging is powerful but can cause confusion. In application code, prefer explicit extends over relying on automatic merging. Merging is most useful when augmenting third-party types.',
          },
          {
            heading: 'Practical Guidelines',
            content:
              'In practice, the choice between interface and type often comes down to team convention and specific use cases. Many teams default to interface for object shapes because of better error messages and performance in large codebases. The TypeScript team itself recommends interface for public API surfaces. Use type when you need unions, intersections of non-object types, mapped types, conditional types, or tuple definitions. Consistency within a project matters more than the specific choice.',
            code: `// Guideline 1: interface for objects/classes
interface UserService {
  getUser(id: string): Promise<User>;
  createUser(data: CreateUserDTO): Promise<User>;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateUserDTO {
  name: string;
  email: string;
}

// Guideline 2: type for unions and complex types
type Status = 'active' | 'inactive' | 'banned';
type Result<T> = { ok: true; data: T } | { ok: false; error: string };

// Guideline 3: type for function signatures
type Handler = (req: Request, res: Response) => void;

// Guideline 4: type for utility compositions
type Nullable<T> = T | null;
type Optional<T> = T | undefined;

const status: Status = 'active';
const result: Result<User> = {
  ok: true,
  data: { id: '1', name: 'Alice', email: 'a@b.com' },
};
console.log(status);
console.log(result.ok ? result.data.name : result.error);`,
            output: `active
Alice`,
            tip: 'When in doubt, start with interface. If you need a union, tuple, or mapped type, switch to type. The TypeScript compiler can optimize interface checks slightly better in very large projects.',
          },
        ],
        quiz: [
          {
            question: 'Which feature is unique to interfaces and NOT available with type aliases?',
            options: [
              'Describing object shapes',
              'Declaration merging',
              'Using generics',
              'Extending other types',
            ],
            correctIndex: 1,
            explanation: 'Declaration merging is unique to interfaces. Multiple interface declarations with the same name automatically combine into one. Type aliases cannot be reopened or merged.',
          },
          {
            question: 'Which of the following can only be expressed with a type alias, not an interface?',
            options: [
              'An object with methods',
              'A union type like string | number',
              'An object that extends another object',
              'A generic type parameter',
            ],
            correctIndex: 1,
            explanation: 'Union types (e.g., string | number) can only be expressed with type aliases. Interfaces can only describe object shapes, not unions, primitives, or tuples.',
          },
          {
            question: 'How does interface inheritance differ from type intersection?',
            options: [
              'Interfaces use & while types use extends',
              'Interfaces use extends while types use & (intersection)',
              'They are identical in every way',
              'Types cannot combine multiple shapes',
            ],
            correctIndex: 1,
            explanation: 'Interfaces use the extends keyword for inheritance, while types use the intersection operator (&) to combine shapes. Both achieve similar results for object shapes.',
          },
        ],
        challenge: {
          prompt: 'Demonstrate the differences between interface and type by creating: (1) An interface Animal with name (string) and sound (string). (2) A type alias AnimalAction as a union of "eat" | "sleep" | "play". (3) A type alias AnimalWithAction using intersection of Animal & { action: AnimalAction }. (4) Demonstrate declaration merging by adding a second Animal interface declaration with age (number). Create an object that satisfies the merged Animal type and the AnimalWithAction type.',
          starterCode: `// 1. Define Animal interface
// ...

// 2. Define AnimalAction type alias (union)
// ...

// 3. Define AnimalWithAction type (intersection)
// ...

// 4. Add age via declaration merging (second Animal interface)
// ...

// Create objects and test
// ...`,
          solutionCode: `interface Animal {
  name: string;
  sound: string;
}

type AnimalAction = 'eat' | 'sleep' | 'play';

type AnimalWithAction = Animal & { action: AnimalAction };

// Declaration merging — adds age to Animal
interface Animal {
  age: number;
}

// Animal now has name, sound, AND age
const cat: Animal = {
  name: 'Whiskers',
  sound: 'meow',
  age: 3,
};

const playfulCat: AnimalWithAction = {
  name: 'Whiskers',
  sound: 'meow',
  age: 3,
  action: 'play',
};

console.log(\`\${cat.name} (\${cat.age}yo) says \${cat.sound}\`);
console.log(\`\${playfulCat.name} is \${playfulCat.action}ing\`);`,
          hints: [
            'Interfaces merge automatically when declared with the same name in the same scope. Just write another interface Animal block.',
            'Union types use the pipe (|) operator and can only be created with type aliases.',
            'Intersection types use the & operator to combine multiple shapes into one.',
          ],
        },
      },
      {
        id: 'declaration-merging',
        title: 'Declaration Merging',
        difficulty: 'intermediate',
        tags: ['declaration-merging', 'module-augmentation', 'ambient', 'third-party', 'global'],
        cheatSheetSummary: 'Interfaces with the same name merge. Use module augmentation to extend third-party types.',
        sections: [
          {
            heading: 'How Interfaces Merge',
            content:
              'When multiple interface declarations share the same name within the same scope, TypeScript merges them into one. Non-function members must have the same type if they appear in both declarations. Function members from later declarations have higher overload priority. This mechanism is used extensively in TypeScript definition files (.d.ts) to split large interfaces across multiple blocks for readability and to allow libraries to be extended incrementally.',
            code: `// Multiple declarations merge into one
interface Box {
  width: number;
  height: number;
}

interface Box {
  depth: number;
  label?: string;
}

// Box now has width, height, depth, and label
const box: Box = {
  width: 10,
  height: 20,
  depth: 5,
};
console.log(\`Box: \${box.width}x\${box.height}x\${box.depth}\`);

// Function overloads merge (later declarations first)
interface Serializer {
  serialize(value: string): string;
}

interface Serializer {
  serialize(value: number): string;
  serialize(value: boolean): string;
}

// Effective order: boolean, number, string
const serializer: Serializer = {
  serialize(value: string | number | boolean): string {
    return JSON.stringify(value);
  },
};
console.log(serializer.serialize(42));
console.log(serializer.serialize(true));
console.log(serializer.serialize('hello'));`,
            output: `Box: 10x20x5
"42"
"true"
"hello"`,
            warning: 'Non-function members with conflicting types across merged interfaces will cause a compile error. Ensure property types are consistent across all declarations.',
            analogy: 'Think of it like adding pages to a loose-leaf binder: each interface declaration is a new page, and TypeScript combines them all into a single complete document.',
          },
          {
            heading: 'Module Augmentation',
            content:
              'Module augmentation lets you add new declarations to existing modules, including third-party libraries. You wrap the augmentation in a declare module block and add interface declarations that merge with the originals. This is how you extend types like Express Request, or add custom properties to library objects. Global augmentation uses declare global to extend built-in types like Array, String, or Window.',
            code: `// Simulating module augmentation pattern
// In a real project, this extends a third-party module:
//
// declare module 'express-serve-static-core' {
//   interface Request {
//     userId?: string;
//     sessionId?: string;
//   }
// }

// Global augmentation example
declare global {
  interface Array<T> {
    toShuffled(): T[];
  }
}

Array.prototype.toShuffled = function <T>(this: T[]): T[] {
  const arr = [...this];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const nums = [1, 2, 3, 4, 5];
console.log('Original:', nums);
console.log('Shuffled:', nums.toShuffled());

// Namespace merging with classes
class Album {
  title: string;
  constructor(title: string) { this.title = title; }
}
namespace Album {
  export const defaultTitle = 'Untitled';
}
const a = new Album(Album.defaultTitle);
console.log(a.title);`,
            output: `Original: [1, 2, 3, 4, 5]
Shuffled: [3, 1, 5, 2, 4]
Untitled`,
            tip: 'Use module augmentation sparingly. It is best reserved for adding missing type information to third-party libraries. For your own code, prefer explicit extends or composition.',
          },
        ],
        quiz: [
          {
            question: 'What happens when two interface declarations with the same name exist in the same scope?',
            options: [
              'The second declaration causes a compile error',
              'The second declaration silently replaces the first',
              'TypeScript merges them into a single interface with all properties',
              'Only the first declaration is used',
            ],
            correctIndex: 2,
            explanation: 'TypeScript merges multiple interface declarations with the same name into one. The merged interface contains all properties from all declarations.',
          },
          {
            question: 'What is module augmentation used for in TypeScript?',
            options: [
              'Creating new modules from scratch',
              'Adding new declarations to existing modules, including third-party libraries',
              'Removing unused exports from modules',
              'Converting CommonJS modules to ES modules',
            ],
            correctIndex: 1,
            explanation: 'Module augmentation lets you add new declarations to existing modules using declare module blocks. This is commonly used to extend third-party library types.',
          },
          {
            question: 'When function overloads are merged across interface declarations, what is the priority order?',
            options: [
              'Alphabetical order of parameter types',
              'Earlier declarations have higher priority',
              'Later declarations have higher overload priority',
              'All overloads have equal priority',
            ],
            correctIndex: 2,
            explanation: 'Function members from later interface declarations have higher overload priority. TypeScript places later declarations first when resolving overloads.',
          },
          {
            question: 'Which syntax is used for global augmentation in TypeScript?',
            options: [
              'declare module "global" { }',
              'declare global { }',
              'global namespace { }',
              'augment global { }',
            ],
            correctIndex: 1,
            explanation: 'Global augmentation uses the declare global { } syntax to extend built-in types like Array, String, or Window.',
          },
        ],
        challenge: {
          prompt: 'Demonstrate declaration merging by creating a Settings interface in three separate declarations. The first should have theme ("light" | "dark"). The second should add language (string) and fontSize (number). The third should add a method validate() that returns boolean. Then create a class AppSettings that uses declaration merging with a namespace to add a static defaults property. Instantiate and test everything.',
          starterCode: `// First Settings declaration
interface Settings {
  // ...
}

// Second Settings declaration
// ...

// Third Settings declaration
// ...

// AppSettings class with namespace merging
class AppSettings {
  // implement Settings
}

// Add static defaults via namespace
// namespace AppSettings { ... }

// Test
// ...`,
          solutionCode: `interface Settings {
  theme: 'light' | 'dark';
}

interface Settings {
  language: string;
  fontSize: number;
}

interface Settings {
  validate(): boolean;
}

// Merged: Settings has theme, language, fontSize, and validate()
class AppSettings implements Settings {
  constructor(
    public theme: 'light' | 'dark',
    public language: string,
    public fontSize: number,
  ) {}

  validate(): boolean {
    return this.fontSize >= 8 && this.fontSize <= 72;
  }
}

namespace AppSettings {
  export const defaults: Settings = {
    theme: 'light',
    language: 'en',
    fontSize: 16,
    validate() { return true; },
  };
}

const settings = new AppSettings('dark', 'en', 14);
console.log(\`Theme: \${settings.theme}, Font: \${settings.fontSize}\`);
console.log(\`Valid: \${settings.validate()}\`);
console.log(\`Default theme: \${AppSettings.defaults.theme}\`);`,
          hints: [
            'Write three separate interface Settings blocks. TypeScript will automatically merge all properties and methods into a single interface.',
            'Use namespace AppSettings to add static members to the class via namespace-class merging.',
            'The class must implement all merged properties: theme, language, fontSize, and validate().',
          ],
        },
      },
    ],
  },
  /* ------------------------------------------------------------ */
  /*  Classes                                                      */
  /* ------------------------------------------------------------ */
  {
    id: 'ts-classes',
    label: 'Classes',
    icon: 'Layers',
    entries: [
      {
        id: 'class-basics-ts',
        title: 'Class Basics',
        difficulty: 'intermediate',
        crossLanguageId: 'class-basics',
        tags: ['class', 'constructor', 'access-modifiers', 'public', 'private', 'protected'],
        cheatSheetSummary: 'Classes with typed properties and access modifiers: public (default), private, protected.',
        sections: [
          {
            heading: 'Typed Properties and Constructor',
            content:
              'TypeScript classes require property declarations with explicit types before they can be used. Properties can be initialized in the declaration or in the constructor. Unlike JavaScript, TypeScript enforces that all declared properties are initialized by the end of the constructor. The strictPropertyInitialization compiler option (enabled by default in strict mode) catches uninitialized properties at compile time.',
            code: `class User {
  id: number;
  name: string;
  email: string;
  isActive: boolean = true; // default value

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  display(): string {
    const status = this.isActive ? 'active' : 'inactive';
    return \`[\${this.id}] \${this.name} (\${status})\`;
  }
}

const user = new User(1, 'Alice', 'alice@example.com');
console.log(user.display());
console.log(user.email);`,
            output: `[1] Alice (active)
alice@example.com`,
            tip: 'Enable strict mode in tsconfig.json to get strictPropertyInitialization checks. Use the definite assignment assertion (!) only when you are certain a property will be initialized outside the constructor.',
          },
          {
            heading: 'Access Modifiers',
            content:
              'TypeScript provides three access modifiers: public, private, and protected. Public members are accessible everywhere and are the default. Private members are only accessible within the class that declares them. Protected members are accessible within the class and its subclasses. These modifiers are enforced at compile time only and do not affect the generated JavaScript. For runtime privacy, use ES2022 private fields (#field).',
            code: `class BankAccount {
  public owner: string;
  private balance: number;
  protected accountType: string;

  constructor(owner: string, initial: number) {
    this.owner = owner;
    this.balance = initial;
    this.accountType = 'checking';
  }

  public deposit(amount: number): void {
    this.balance += amount;
    console.log(\`Deposited \${amount}. Balance: \${this.balance}\`);
  }

  public getBalance(): number {
    return this.balance;
  }

  private logTransaction(type: string, amount: number): void {
    console.log(\`[\${type}] \${amount} by \${this.owner}\`);
  }
}

const account = new BankAccount('Alice', 1000);
account.deposit(500);
console.log(\`Balance: \${account.getBalance()}\`);
// account.balance;         // Error: private
// account.logTransaction;  // Error: private`,
            output: `Deposited 500. Balance: 1500
Balance: 1500`,
            note: 'TypeScript access modifiers are compile-time only. The generated JavaScript has no enforcement. Use #privateField syntax (ES2022) if you need runtime privacy.',
            analogy: 'Think of it like rooms in a building: public is the lobby (anyone can enter), protected is the staff area (employees and their teams only), and private is the vault (only the bank manager has the key).',
            codeHighlightLines: [2, 3, 4],
          },
          {
            heading: 'Methods and Static Members',
            content:
              'Class methods define behavior on instances, while static members belong to the class itself rather than any instance. Static methods are called on the class directly and are commonly used for factory methods, utility functions, and singleton patterns. TypeScript also supports getters and setters using the get and set keywords, which allow computed properties with validation logic.',
            code: `class Temperature {
  private celsius: number;

  constructor(celsius: number) {
    this.celsius = celsius;
  }

  // Getter — computed property
  get fahrenheit(): number {
    return this.celsius * 9 / 5 + 32;
  }

  // Setter — with validation
  set fahrenheit(f: number) {
    this.celsius = (f - 32) * 5 / 9;
  }

  // Static factory methods
  static fromFahrenheit(f: number): Temperature {
    return new Temperature((f - 32) * 5 / 9);
  }

  static readonly ABSOLUTE_ZERO = -273.15;

  toString(): string {
    return \`\${this.celsius.toFixed(1)}°C / \${this.fahrenheit.toFixed(1)}°F\`;
  }
}

const temp = new Temperature(100);
console.log(temp.toString());
temp.fahrenheit = 72;
console.log(temp.toString());

const boiling = Temperature.fromFahrenheit(212);
console.log(boiling.toString());
console.log(\`Absolute zero: \${Temperature.ABSOLUTE_ZERO}°C\`);`,
            output: `100.0°C / 212.0°F
22.2°C / 72.0°F
100.0°C / 212.0°F
Absolute zero: -273.15°C`,
            tip: 'Use static factory methods (e.g., fromFahrenheit, fromJSON) to provide alternative ways to construct instances with meaningful names, instead of overloading the constructor.',
          },
        ],
        quiz: [
          {
            question: 'What happens if a class property is declared but not initialized in the constructor with strictPropertyInitialization enabled?',
            options: [
              'The property is automatically set to undefined',
              'TypeScript throws a compile-time error',
              'The property is removed from the class at runtime',
              'TypeScript assigns a default value based on the type',
            ],
            correctIndex: 1,
            explanation:
              'With strictPropertyInitialization enabled (part of strict mode), TypeScript reports a compile-time error for properties that are declared but not definitely initialized by the end of the constructor. You must either initialize them or use the definite assignment assertion (!).',
          },
          {
            question: 'Which access modifier is the default for class members in TypeScript?',
            options: [
              'private',
              'protected',
              'public',
              'internal',
            ],
            correctIndex: 2,
            explanation:
              'In TypeScript, class members are public by default. You do not need to explicitly write the public keyword, though many style guides recommend including it for clarity.',
          },
          {
            question: 'What is the difference between TypeScript "private" and JavaScript "#private" fields?',
            options: [
              'They are identical in behavior and interchangeable',
              'TypeScript private is compile-time only; #private provides runtime enforcement',
              'TypeScript private is stronger because it works with older JavaScript versions',
              '#private only works in classes that extend other classes',
            ],
            correctIndex: 1,
            explanation:
              'TypeScript\'s private modifier is enforced only at compile time and the generated JavaScript has no access restriction. ES2022 #private fields provide true runtime privacy and the property is not accessible outside the class, even through bracket notation.',
          },
          {
            question: 'What is the purpose of static members in a TypeScript class?',
            options: [
              'They can only be used inside the constructor',
              'They belong to the class itself rather than any instance',
              'They are immutable and cannot be changed after declaration',
              'They are only accessible from subclasses',
            ],
            correctIndex: 1,
            explanation:
              'Static members belong to the class itself, not to instances. They are accessed via the class name (e.g., Temperature.ABSOLUTE_ZERO) and are commonly used for factory methods, utility functions, constants, and singleton patterns.',
          },
        ],
        challenge: {
          prompt:
            'Create a `Counter` class with a private `count` property (initially 0), public methods `increment()`, `decrement()`, and `getCount()`, a static factory method `startAt(n: number): Counter`, and a static readonly property `MAX_COUNT = 1000`. The increment method should not exceed MAX_COUNT. Use a getter for the current value as well.',
          starterCode: `class Counter {
  // TODO: private count property
  // TODO: static readonly MAX_COUNT

  // TODO: increment (should not exceed MAX_COUNT)
  // TODO: decrement (should not go below 0)
  // TODO: getCount method
  // TODO: get value getter
  // TODO: static startAt factory method
}

// Test
const counter = Counter.startAt(5);
counter.increment();
counter.increment();
console.log(counter.value);    // 7
counter.decrement();
console.log(counter.getCount()); // 6
console.log(Counter.MAX_COUNT);  // 1000`,
          solutionCode: `class Counter {
  private count: number = 0;
  static readonly MAX_COUNT = 1000;

  get value(): number {
    return this.count;
  }

  increment(): void {
    if (this.count < Counter.MAX_COUNT) {
      this.count++;
    }
  }

  decrement(): void {
    if (this.count > 0) {
      this.count--;
    }
  }

  getCount(): number {
    return this.count;
  }

  static startAt(n: number): Counter {
    const counter = new Counter();
    counter.count = Math.min(n, Counter.MAX_COUNT);
    return counter;
  }
}

// Test
const counter = Counter.startAt(5);
counter.increment();
counter.increment();
console.log(counter.value);    // 7
counter.decrement();
console.log(counter.getCount()); // 6
console.log(Counter.MAX_COUNT);  // 1000`,
          hints: [
            'Use "private count: number = 0" for the internal state and "static readonly MAX_COUNT = 1000" for the class-level constant.',
            'In the static factory method, create a new Counter instance and set its private count directly (static methods can access private members of the same class).',
            'Use a getter "get value()" to provide read-only access to the count without exposing the private property.',
          ],
        },
      },
      {
        id: 'abstract-classes',
        title: 'Abstract Classes',
        difficulty: 'intermediate',
        tags: ['abstract', 'inheritance', 'template-method', 'polymorphism', 'typescript'],
        cheatSheetSummary: 'abstract classes define partial implementations. Abstract methods must be implemented by subclasses.',
        sections: [
          {
            heading: 'Abstract Classes and Methods',
            content:
              'Abstract classes are base classes that cannot be instantiated directly. They are declared with the abstract keyword and can contain both implemented methods and abstract methods. Abstract methods have no body and must be implemented by any non-abstract subclass. This pattern enforces a contract: subclasses must provide specific behavior while inheriting shared functionality from the abstract base.',
            code: `abstract class Shape {
  abstract area(): number;
  abstract perimeter(): number;

  // Concrete method — shared by all subclasses
  describe(): string {
    return \`Area: \${this.area().toFixed(2)}, Perimeter: \${this.perimeter().toFixed(2)}\`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) { super(); }

  area(): number { return Math.PI * this.radius ** 2; }
  perimeter(): number { return 2 * Math.PI * this.radius; }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) { super(); }

  area(): number { return this.width * this.height; }
  perimeter(): number { return 2 * (this.width + this.height); }
}

// const s = new Shape(); // Error: cannot instantiate abstract
const shapes: Shape[] = [new Circle(5), new Rectangle(4, 6)];
shapes.forEach(s => console.log(s.describe()));`,
            output: `Area: 78.54, Perimeter: 31.42
Area: 24.00, Perimeter: 20.00`,
            tip: 'Use abstract classes when you want to share implementation code among related classes. Use interfaces when you only need to define a contract without any shared implementation.',
            diagram: {
              kind: 'mermaid',
              code: `classDiagram
    class Shape {
        <<abstract>>
        +area()* number
        +perimeter()* number
        +describe() string
    }
    class Circle {
        -number radius
        +area() number
        +perimeter() number
    }
    class Rectangle {
        -number width
        -number height
        +area() number
        +perimeter() number
    }
    Shape <|-- Circle
    Shape <|-- Rectangle`,
              caption: 'Shape is abstract with concrete method describe(); Circle and Rectangle implement the abstract methods',
            },
          },
          {
            heading: 'Template Method Pattern',
            content:
              'The template method pattern uses an abstract class to define the skeleton of an algorithm in a base method, deferring certain steps to subclasses via abstract methods. The base class controls the overall flow while subclasses customize specific steps. This is one of the most common design patterns enabled by abstract classes and is widely used in frameworks for lifecycle hooks, data processing pipelines, and rendering engines.',
            code: `abstract class DataProcessor {
  // Template method — defines the algorithm skeleton
  process(data: string[]): string[] {
    const validated = this.validate(data);
    const transformed = this.transform(validated);
    this.log(transformed);
    return transformed;
  }

  protected abstract validate(data: string[]): string[];
  protected abstract transform(data: string[]): string[];

  // Default implementation — subclasses can override
  protected log(result: string[]): void {
    console.log(\`Processed \${result.length} items\`);
  }
}

class UpperCaseProcessor extends DataProcessor {
  protected validate(data: string[]): string[] {
    return data.filter(s => s.length > 0);
  }
  protected transform(data: string[]): string[] {
    return data.map(s => s.toUpperCase());
  }
}

const processor = new UpperCaseProcessor();
const result = processor.process(['hello', '', 'world', 'ts']);
console.log(result);`,
            output: `Processed 3 items
['HELLO', 'WORLD', 'TS']`,
            note: 'The template method pattern inverts control: the base class calls subclass methods, not the other way around. This is the Hollywood Principle: "Don\'t call us, we\'ll call you."',
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    A["process(data)"] --> B["1. validate(data)"]
    B --> C["2. transform(validated)"]
    C --> D["3. log(transformed)"]
    D --> E["return transformed"]
    B -.->|"Subclass implements"| F["UpperCaseProcessor.validate\\nfilter empty strings"]
    C -.->|"Subclass implements"| G["UpperCaseProcessor.transform\\nmap to uppercase"]
    D -.->|"Optional override"| H["Default: log count"]
    style A fill:#3178c6,color:#fff
    style F fill:#27ae60,color:#fff
    style G fill:#27ae60,color:#fff
    style H fill:#f39c12,color:#fff`,
              caption: 'The template method defines the algorithm skeleton; subclasses fill in the steps',
            },
          },
          {
            heading: 'Abstract vs Interface',
            content:
              'Abstract classes and interfaces both define contracts, but they serve different purposes. Abstract classes can contain implemented methods, constructor logic, and state, while interfaces are purely structural contracts with no runtime presence. A class can implement multiple interfaces but can only extend one abstract class. Choose abstract classes when you need shared implementation; choose interfaces when you only need a type contract.',
            code: `// Interface — pure contract, no implementation
interface Serializable {
  serialize(): string;
}

interface Loggable {
  log(): void;
}

// Abstract class — partial implementation + contract
abstract class Entity {
  constructor(public readonly id: string) {}

  abstract validate(): boolean;

  toJSON(): object {
    return { id: this.id };
  }
}

// Class extends one abstract, implements multiple interfaces
class Product extends Entity implements Serializable, Loggable {
  constructor(id: string, public name: string, public price: number) {
    super(id);
  }

  validate(): boolean {
    return this.name.length > 0 && this.price > 0;
  }

  serialize(): string {
    return JSON.stringify({ id: this.id, name: this.name, price: this.price });
  }

  log(): void {
    console.log(\`Product[\${this.id}]: \${this.name} $\${this.price}\`);
  }
}

const p = new Product('p1', 'Widget', 9.99);
p.log();
console.log(\`Valid: \${p.validate()}\`);
console.log(p.serialize());`,
            output: `Product[p1]: Widget $9.99
Valid: true
{"id":"p1","name":"Widget","price":9.99}`,
            tip: 'A common pattern is to use an interface for the public API type and an abstract class for shared implementation. Consumers depend on the interface; implementations extend the abstract class.',
            diagram: {
              kind: 'mermaid',
              code: `classDiagram
    class Serializable {
        <<interface>>
        +serialize() string
    }
    class Loggable {
        <<interface>>
        +log() void
    }
    class Entity {
        <<abstract>>
        +string id
        +validate()* boolean
        +toJSON() object
    }
    class Product {
        +string name
        +number price
        +validate() boolean
        +serialize() string
        +log() void
    }
    Entity <|-- Product : extends
    Serializable <|.. Product : implements
    Loggable <|.. Product : implements`,
              caption: 'Product extends one abstract class and implements multiple interfaces',
            },
          },
        ],
        quiz: [
          {
            question: 'What happens if you try to instantiate an abstract class directly with the new keyword?',
            options: [
              'An empty object is created with no methods',
              'TypeScript throws a compile-time error',
              'A runtime error is thrown after the object is created',
              'The abstract methods are automatically set to undefined',
            ],
            correctIndex: 1,
            explanation:
              'Abstract classes cannot be instantiated directly. TypeScript reports a compile-time error if you attempt "new AbstractClass()". You must create a concrete (non-abstract) subclass that implements all abstract methods and instantiate that instead.',
          },
          {
            question: 'What is the key difference between an abstract method and a concrete method in an abstract class?',
            options: [
              'Abstract methods have a body; concrete methods do not',
              'Abstract methods have no body and must be implemented by subclasses; concrete methods have a body and are inherited',
              'Concrete methods cannot be overridden by subclasses',
              'Abstract methods are always private; concrete methods are always public',
            ],
            correctIndex: 1,
            explanation:
              'Abstract methods are declared without a body (no implementation) and must be implemented by every non-abstract subclass. Concrete methods have a full implementation that subclasses inherit and can optionally override.',
          },
          {
            question: 'What design principle does the template method pattern follow?',
            options: [
              'The Open/Closed Principle: classes are open for extension but closed for modification',
              'The Hollywood Principle: the base class calls subclass methods, not the other way around',
              'The Single Responsibility Principle: each class handles one concern',
              'The Dependency Inversion Principle: depend on abstractions, not concretions',
            ],
            correctIndex: 1,
            explanation:
              'The template method pattern follows the Hollywood Principle: "Don\'t call us, we\'ll call you." The base class controls the overall algorithm flow and calls abstract methods that subclasses implement, inverting the typical control flow.',
          },
          {
            question: 'Can a class extend an abstract class AND implement interfaces at the same time?',
            options: [
              'No, a class must choose between extends and implements',
              'Yes, but only if the abstract class also implements those interfaces',
              'Yes, using extends for the abstract class and implements for the interfaces',
              'Only if all interfaces match the abstract class methods exactly',
            ],
            correctIndex: 2,
            explanation:
              'A class can extend one abstract class and implement multiple interfaces simultaneously: "class Product extends Entity implements Serializable, Loggable". The class must satisfy all requirements from both the abstract class and the interfaces.',
          },
        ],
        challenge: {
          prompt:
            'Create an abstract class `Validator<T>` with an abstract method `validate(value: T): boolean` and a concrete method `validateAll(values: T[]): { valid: T[]; invalid: T[] }`. Then create two concrete subclasses: `NumberRangeValidator` (validates numbers within a min-max range) and `StringLengthValidator` (validates strings within a min-max length).',
          starterCode: `abstract class Validator<T> {
  // TODO: abstract validate method
  // TODO: concrete validateAll method that uses validate()
}

class NumberRangeValidator extends Validator<number> {
  // TODO: constructor takes min and max
  // TODO: implement validate
}

class StringLengthValidator extends Validator<string> {
  // TODO: constructor takes minLength and maxLength
  // TODO: implement validate
}

// Test
const numValidator = new NumberRangeValidator(1, 100);
const result1 = numValidator.validateAll([5, 150, 42, -3, 99]);
console.log('Valid numbers:', result1.valid);   // [5, 42, 99]
console.log('Invalid numbers:', result1.invalid); // [150, -3]

const strValidator = new StringLengthValidator(2, 5);
const result2 = strValidator.validateAll(['hi', 'a', 'hello', 'toolong', 'ok']);
console.log('Valid strings:', result2.valid);   // ['hi', 'hello', 'ok']
console.log('Invalid strings:', result2.invalid); // ['a', 'toolong']`,
          solutionCode: `abstract class Validator<T> {
  abstract validate(value: T): boolean;

  validateAll(values: T[]): { valid: T[]; invalid: T[] } {
    const valid: T[] = [];
    const invalid: T[] = [];
    for (const value of values) {
      if (this.validate(value)) {
        valid.push(value);
      } else {
        invalid.push(value);
      }
    }
    return { valid, invalid };
  }
}

class NumberRangeValidator extends Validator<number> {
  constructor(private min: number, private max: number) {
    super();
  }

  validate(value: number): boolean {
    return value >= this.min && value <= this.max;
  }
}

class StringLengthValidator extends Validator<string> {
  constructor(private minLength: number, private maxLength: number) {
    super();
  }

  validate(value: string): boolean {
    return value.length >= this.minLength && value.length <= this.maxLength;
  }
}

// Test
const numValidator = new NumberRangeValidator(1, 100);
const result1 = numValidator.validateAll([5, 150, 42, -3, 99]);
console.log('Valid numbers:', result1.valid);   // [5, 42, 99]
console.log('Invalid numbers:', result1.invalid); // [150, -3]

const strValidator = new StringLengthValidator(2, 5);
const result2 = strValidator.validateAll(['hi', 'a', 'hello', 'toolong', 'ok']);
console.log('Valid strings:', result2.valid);   // ['hi', 'hello', 'ok']
console.log('Invalid strings:', result2.invalid); // ['a', 'toolong']`,
          hints: [
            'The abstract class Validator<T> should declare "abstract validate(value: T): boolean" without a body.',
            'The validateAll method is concrete and loops through values, using this.validate() to partition them into valid and invalid arrays.',
            'Each subclass constructor should call super() and store min/max as private parameter properties.',
          ],
        },
      },
      {
        id: 'class-implements',
        title: 'Implementing Interfaces',
        difficulty: 'intermediate',
        tags: ['implements', 'interface', 'class', 'multiple-interfaces', 'type-checking'],
        cheatSheetSummary: 'implements keyword enforces that a class satisfies an interface contract. Supports multiple interfaces.',
        sections: [
          {
            heading: 'implements Keyword and Multiple Interfaces',
            content:
              'The implements keyword declares that a class must conform to the shape defined by one or more interfaces. TypeScript checks at compile time that all required properties and methods from the interface are present in the class. A class can implement multiple interfaces separated by commas, which is TypeScript\'s way of supporting multiple inheritance of contracts. Unlike extends, implements does not inherit any implementation — it only enforces the shape.',
            code: `interface Printable {
  print(): string;
}

interface Comparable<T> {
  compareTo(other: T): number;
}

interface Cloneable<T> {
  clone(): T;
}

class Task implements Printable, Comparable<Task>, Cloneable<Task> {
  constructor(
    public title: string,
    public priority: number,
  ) {}

  print(): string {
    return \`Task: \${this.title} (priority: \${this.priority})\`;
  }

  compareTo(other: Task): number {
    return this.priority - other.priority;
  }

  clone(): Task {
    return new Task(this.title, this.priority);
  }
}

const t1 = new Task('Write docs', 2);
const t2 = new Task('Fix bug', 1);
console.log(t1.print());
console.log(\`t1 vs t2: \${t1.compareTo(t2) > 0 ? 't1 higher' : 't2 higher'}\`);

const t3 = t1.clone();
console.log(\`Clone: \${t3.print()}\`);
console.log(\`Same ref? \${t1 === t3}\`);`,
            output: `Task: Write docs (priority: 2)
t1 vs t2: t1 higher
Clone: Task: Write docs (priority: 2)
Same ref? false`,
            tip: 'Implementing an interface does not provide any implementation. You must write every method body yourself. If you want shared implementation, use an abstract class instead.',
            analogy: 'Think of it like signing a contract: the interface is the contract that lists obligations (methods you must provide), and the class is the party that signs it and must fulfill every obligation listed.',
          },
          {
            heading: 'Static Side vs Instance Side',
            content:
              'When a class implements an interface, only the instance side is checked. The constructor and static members are not part of the instance type. To type-check the static side (including the constructor signature), you need a separate interface and use it as a type for the class itself, not for its instances. This distinction is important when writing factory functions or registries that work with class constructors.',
            code: `// Instance interface — describes what instances look like
interface ClockInterface {
  currentTime: Date;
  tick(): void;
}

// Static/constructor interface — describes the class itself
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

// The class implements the instance interface
class DigitalClock implements ClockInterface {
  currentTime: Date = new Date();

  constructor(hour: number, minute: number) {
    this.currentTime.setHours(hour, minute);
  }

  tick(): void {
    const h = this.currentTime.getHours();
    const m = this.currentTime.getMinutes();
    console.log(\`Digital: \${h}:\${String(m).padStart(2, '0')}\`);
  }
}

// Factory function checks the static side
function createClock(
  Ctor: ClockConstructor,
  hour: number,
  minute: number,
): ClockInterface {
  return new Ctor(hour, minute);
}

const clock = createClock(DigitalClock, 14, 30);
clock.tick();

// Type-checking instances against interfaces
const clocks: ClockInterface[] = [
  new DigitalClock(9, 0),
  new DigitalClock(17, 45),
];
clocks.forEach(c => c.tick());`,
            output: `Digital: 14:30
Digital: 9:00
Digital: 17:45`,
            warning: 'The implements clause only checks the instance side. If you need to enforce a constructor signature, use a separate constructor interface and a factory function pattern.',
            codeHighlightLines: [2, 3, 4, 8, 9, 13],
          },
        ],
        quiz: [
          {
            question: 'What does the implements keyword do when used with a class?',
            options: [
              'It inherits all methods and properties from the interface automatically',
              'It enforces at compile time that the class satisfies the interface contract',
              'It generates default implementations for all interface methods',
              'It creates a runtime type check that throws if the contract is violated',
            ],
            correctIndex: 1,
            explanation:
              'The implements keyword is a compile-time check that verifies the class provides all properties and methods defined in the interface. Unlike extends, it does not inherit any implementation -- you must write every method body yourself.',
          },
          {
            question: 'When a class implements an interface, which side of the class is checked?',
            options: [
              'Both the static and instance sides are checked together',
              'Only the static side (constructor and static methods) is checked',
              'Only the instance side is checked; the constructor and static members are not part of the check',
              'Neither side is checked; it is documentation only',
            ],
            correctIndex: 2,
            explanation:
              'When a class implements an interface, only the instance side is type-checked. The constructor signature and static members are not part of the instance type. To type-check the static side, you need a separate constructor interface.',
          },
          {
            question: 'How do you type-check a class constructor signature against an interface?',
            options: [
              'Add "static implements" to the class declaration',
              'Use a separate constructor interface with a "new" signature and a factory function',
              'Add the constructor signature directly to the instance interface',
              'It is not possible to type-check constructors in TypeScript',
            ],
            correctIndex: 1,
            explanation:
              'To type-check the static/constructor side of a class, define a separate interface with a construct signature (new (...): Type) and use it as a parameter type in a factory function. The class itself is then passed as an argument, and TypeScript verifies it matches.',
          },
        ],
        challenge: {
          prompt:
            'Create interfaces `Equatable<T>` (with equals(other: T): boolean), `Hashable` (with hashCode(): number), and `Displayable` (with display(): string). Implement a `Color` class that implements all three interfaces. Two colors are equal if they have the same r, g, b values. The hash code can be computed as r * 65536 + g * 256 + b.',
          starterCode: `interface Equatable<T> {
  // TODO
}

interface Hashable {
  // TODO
}

interface Displayable {
  // TODO
}

class Color implements Equatable<Color>, Hashable, Displayable {
  constructor(
    public readonly r: number,
    public readonly g: number,
    public readonly b: number,
  ) {}

  // TODO: implement equals
  // TODO: implement hashCode
  // TODO: implement display (return "rgb(r, g, b)" format)
}

// Test
const red = new Color(255, 0, 0);
const blue = new Color(0, 0, 255);
const red2 = new Color(255, 0, 0);

console.log(red.display());         // rgb(255, 0, 0)
console.log(red.equals(red2));      // true
console.log(red.equals(blue));      // false
console.log(red.hashCode());        // 16711680`,
          solutionCode: `interface Equatable<T> {
  equals(other: T): boolean;
}

interface Hashable {
  hashCode(): number;
}

interface Displayable {
  display(): string;
}

class Color implements Equatable<Color>, Hashable, Displayable {
  constructor(
    public readonly r: number,
    public readonly g: number,
    public readonly b: number,
  ) {}

  equals(other: Color): boolean {
    return this.r === other.r && this.g === other.g && this.b === other.b;
  }

  hashCode(): number {
    return this.r * 65536 + this.g * 256 + this.b;
  }

  display(): string {
    return \`rgb(\${this.r}, \${this.g}, \${this.b})\`;
  }
}

// Test
const red = new Color(255, 0, 0);
const blue = new Color(0, 0, 255);
const red2 = new Color(255, 0, 0);

console.log(red.display());         // rgb(255, 0, 0)
console.log(red.equals(red2));      // true
console.log(red.equals(blue));      // false
console.log(red.hashCode());        // 16711680`,
          hints: [
            'Each interface should declare exactly one method with the appropriate signature.',
            'For equals, compare all three channel values (r, g, b) using strict equality (===).',
            'The hash code formula r * 65536 + g * 256 + b converts RGB to a single unique integer (same concept as hexadecimal color encoding).',
          ],
        },
      },
      {
        id: 'parameter-properties',
        title: 'Parameter Properties',
        difficulty: 'intermediate',
        tags: ['parameter-properties', 'constructor-shorthand', 'readonly', 'typescript', 'class'],
        cheatSheetSummary: 'Constructor params with public/private/protected/readonly auto-create and assign class properties.',
        sections: [
          {
            heading: 'Constructor Shorthand',
            content:
              'Parameter properties let you declare and initialize class properties directly in the constructor parameter list. By adding an access modifier (public, private, or protected) or readonly to a constructor parameter, TypeScript automatically creates a matching class property and assigns the argument value to it. This eliminates the boilerplate of declaring properties separately and assigning them in the constructor body.',
            code: `// Without parameter properties (verbose)
class UserVerbose {
  private id: number;
  public name: string;
  readonly email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

// With parameter properties (concise)
class User {
  constructor(
    private id: number,
    public name: string,
    public readonly email: string,
  ) {}

  display(): string {
    return \`[\${this.id}] \${this.name} <\${this.email}>\`;
  }
}

const user = new User(1, 'Alice', 'alice@example.com');
console.log(user.display());
console.log(user.name);    // public — accessible
// console.log(user.id);   // Error: private
// user.email = 'new';     // Error: readonly`,
            output: `[1] Alice <alice@example.com>
Alice`,
            tip: 'Parameter properties save significant boilerplate in data-heavy classes. The class body can be empty ({}) if the constructor is the only method, which is common for DTOs and value objects.',
            analogy: 'Think of it like a self-unpacking suitcase: instead of taking each item out of the suitcase (constructor argument) and placing it on a shelf (property assignment) one by one, the suitcase unpacks itself the moment you set it down.',
            codeHighlightLines: [17, 18, 19],
          },
          {
            heading: 'Real-World Patterns',
            content:
              'Parameter properties shine in domain models, DTOs (Data Transfer Objects), and configuration classes where you have many properties to declare. You can mix parameter properties with regular parameters and additional constructor logic. Combine readonly with private for truly immutable internal state. This pattern is idiomatic in TypeScript and is used extensively in frameworks like Angular and NestJS for dependency injection.',
            code: `// Domain model with mixed parameters
class Product {
  public readonly slug: string;

  constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    private stock: number = 0,
  ) {
    this.slug = name.toLowerCase().replace(/\\s+/g, '-');
  }

  purchase(qty: number): boolean {
    if (qty > this.stock) return false;
    this.stock -= qty;
    return true;
  }

  getStock(): number {
    return this.stock;
  }

  toString(): string {
    return \`\${this.name} ($\${this.price}) - \${this.stock} in stock\`;
  }
}

const product = new Product('p1', 'Blue Widget', 19.99, 50);
console.log(product.toString());
console.log(\`Slug: \${product.slug}\`);

product.purchase(3);
console.log(\`After purchase: \${product.getStock()} left\`);

// NestJS-style dependency injection pattern
class UserService {
  constructor(
    private readonly userRepo: { find(id: string): string },
    private readonly logger: { log(msg: string): void },
  ) {}

  getUser(id: string): string {
    this.logger.log(\`Fetching user \${id}\`);
    return this.userRepo.find(id);
  }
}

const svc = new UserService(
  { find: (id) => \`User(\${id})\` },
  { log: (msg) => console.log(\`[LOG] \${msg}\`) },
);
console.log(svc.getUser('42'));`,
            output: `Blue Widget ($19.99) - 50 in stock
Slug: blue-widget
After purchase: 47 left
[LOG] Fetching user 42
User(42)`,
            note: 'Parameter properties with readonly and private together (private readonly) are the strongest guarantee: the property is only visible inside the class and cannot be reassigned after construction.',
          },
        ],
        quiz: [
          {
            question: 'What does adding an access modifier to a constructor parameter do in TypeScript?',
            options: [
              'It restricts the parameter from being used inside the constructor body',
              'It automatically creates a class property with the same name and assigns the argument value',
              'It makes the parameter optional with a default value',
              'It adds runtime type checking for the parameter',
            ],
            correctIndex: 1,
            explanation:
              'Adding an access modifier (public, private, protected) or readonly to a constructor parameter creates a parameter property. TypeScript automatically declares a class property with the same name and assigns the constructor argument to it, eliminating boilerplate code.',
          },
          {
            question: 'Which of the following is NOT a valid parameter property modifier?',
            options: [
              'public',
              'private readonly',
              'static',
              'protected',
            ],
            correctIndex: 2,
            explanation:
              'The static keyword cannot be used as a parameter property modifier. Only public, private, protected, and readonly (or combinations like "private readonly") are valid. Static members belong to the class itself and cannot be initialized per-instance through the constructor.',
          },
          {
            question: 'What is the equivalent verbose code for "constructor(private name: string) {}"?',
            options: [
              'A class with no properties and a constructor that takes a string parameter',
              'A class with a private "name" property declared separately, and a constructor that assigns this.name = name',
              'A class with a public "name" property and a private constructor',
              'A class with a readonly "name" property that cannot be changed',
            ],
            correctIndex: 1,
            explanation:
              'The parameter property "private name: string" is shorthand for: declaring "private name: string;" in the class body and writing "this.name = name;" in the constructor body. It saves two lines of boilerplate per property.',
          },
        ],
        challenge: {
          prompt:
            'Create a `DatabaseConfig` class using parameter properties that takes host (public readonly string), port (public readonly number), database (public readonly string), user (private string), and password (private string). Add a public method `connectionString()` that returns a masked connection string "postgresql://user:***@host:port/database", and a private method `rawConnectionString()` that includes the real password.',
          starterCode: `class DatabaseConfig {
  // TODO: Use parameter properties for all five fields

  connectionString(): string {
    // TODO: Return masked connection string
  }

  private rawConnectionString(): string {
    // TODO: Return real connection string
  }
}

// Test
const config = new DatabaseConfig(
  'localhost', 5432, 'mydb', 'admin', 's3cret'
);
console.log(config.host);              // localhost
console.log(config.port);              // 5432
console.log(config.database);          // mydb
console.log(config.connectionString()); // postgresql://admin:***@localhost:5432/mydb
// config.user;     // Error: private
// config.password; // Error: private`,
          solutionCode: `class DatabaseConfig {
  constructor(
    public readonly host: string,
    public readonly port: number,
    public readonly database: string,
    private user: string,
    private password: string,
  ) {}

  connectionString(): string {
    return \`postgresql://\${this.user}:***@\${this.host}:\${this.port}/\${this.database}\`;
  }

  private rawConnectionString(): string {
    return \`postgresql://\${this.user}:\${this.password}@\${this.host}:\${this.port}/\${this.database}\`;
  }
}

// Test
const config = new DatabaseConfig(
  'localhost', 5432, 'mydb', 'admin', 's3cret'
);
console.log(config.host);              // localhost
console.log(config.port);              // 5432
console.log(config.database);          // mydb
console.log(config.connectionString()); // postgresql://admin:***@localhost:5432/mydb
// config.user;     // Error: private
// config.password; // Error: private`,
          hints: [
            'Use "public readonly" for host, port, and database to make them accessible but immutable.',
            'Use "private" for user and password to hide them from external access.',
            'The constructor body can be empty ({}) since parameter properties handle all the assignments automatically.',
          ],
        },
      },
      {
        id: 'decorators',
        title: 'Decorators',
        difficulty: 'intermediate',
        tags: ['decorator', 'metadata', 'class-decorator', 'method-decorator', 'decorator-factory', 'stage-3'],
        cheatSheetSummary: '@decorator syntax for meta-programming. Class, method, and property decorators. Stage 3 in TS 5.0+.',
        sections: [
          {
            heading: 'Class Decorators',
            content:
              'Decorators are special functions that can modify or annotate classes, methods, properties, and parameters using the @expression syntax. Class decorators receive the class constructor as their argument and can return a new constructor to replace the original. In TypeScript 5.0+, decorators follow the TC39 Stage 3 proposal which differs from the older experimental decorators. Class decorators are applied when the class is defined, not when instances are created.',
            code: `// Class decorator — seals the class
function sealed(
  target: Function,
  _context: ClassDecoratorContext,
) {
  Object.seal(target);
  Object.seal(target.prototype);
  console.log(\`Sealed: \${target.name}\`);
}

// Decorator with metadata
function entity(tableName: string) {
  return function (
    target: Function,
    _context: ClassDecoratorContext,
  ) {
    (target as any).tableName = tableName;
    console.log(\`Entity: \${target.name} -> \${tableName}\`);
  };
}

@sealed
@entity('users')
class User {
  constructor(public name: string) {}
}

const user = new User('Alice');
console.log(user.name);
console.log((User as any).tableName);`,
            output: `Entity: User -> users
Sealed: User
Alice
users`,
            tip: 'Decorators are applied bottom-up: the decorator closest to the class runs first. In the example above, @entity runs before @sealed.',
            codeHighlightLines: [2, 3, 4, 22, 23],
          },
          {
            heading: 'Method and Property Decorators',
            content:
              'Method decorators receive the method function and a context object describing the decorated element. They can wrap the original method to add behavior like logging, validation, caching, or access control. Property decorators work similarly but operate on class fields. The Stage 3 decorator API uses a context object with metadata about the decorated element instead of the older descriptor-based approach.',
            code: `// Method decorator — logging wrapper
function log(
  originalMethod: Function,
  context: ClassMethodDecoratorContext,
) {
  const name = String(context.name);
  function replacement(this: any, ...args: any[]) {
    console.log(\`-> \${name}(\${args.join(', ')})\`);
    const result = originalMethod.call(this, ...args);
    console.log(\`<- \${name} returned \${result}\`);
    return result;
  }
  return replacement;
}

// Validation decorator
function bound(
  originalMethod: Function,
  context: ClassMethodDecoratorContext,
) {
  const name = context.name;
  context.addInitializer(function (this: any) {
    this[name] = this[name].bind(this);
  });
}

class MathService {
  @log
  add(a: number, b: number): number {
    return a + b;
  }

  @log
  multiply(a: number, b: number): number {
    return a * b;
  }
}

const math = new MathService();
math.add(3, 4);
math.multiply(5, 6);`,
            output: `-> add(3, 4)
<- add returned 7
-> multiply(5, 6)
<- multiply returned 30`,
            note: 'Stage 3 decorators (TS 5.0+) use a context object instead of property descriptors. The older experimental decorators (--experimentalDecorators) use a different API and are still supported but considered legacy.',
            analogy: 'Think of it like wrapping a gift: the original method is the gift inside, and the decorator wraps it with extra behavior (the wrapping paper and ribbon). The recipient (caller) interacts with the wrapper, which then hands them the gift.',
          },
          {
            heading: 'Decorator Factories',
            content:
              'A decorator factory is a function that returns a decorator. This pattern lets you configure decorators with arguments, making them flexible and reusable. Decorator factories are the standard way to create parameterized decorators. They follow the pattern: outer function receives configuration, returns inner function that is the actual decorator. This is widely used in frameworks like Angular (@Component, @Injectable) and NestJS (@Controller, @Get).',
            code: `// Decorator factory — configurable min/max validation
function range(min: number, max: number) {
  return function (
    originalMethod: Function,
    context: ClassMethodDecoratorContext,
  ) {
    return function (this: any, value: number) {
      if (value < min || value > max) {
        throw new RangeError(
          \`\${String(context.name)}: \${value} not in [\${min}, \${max}]\`
        );
      }
      return originalMethod.call(this, value);
    };
  };
}

// Retry decorator factory
function retry(attempts: number) {
  return function (
    originalMethod: Function,
    context: ClassMethodDecoratorContext,
  ) {
    return async function (this: any, ...args: any[]) {
      for (let i = 0; i < attempts; i++) {
        try {
          return await originalMethod.call(this, ...args);
        } catch (e) {
          if (i === attempts - 1) throw e;
          console.log(\`Retry \${i + 1}/\${attempts}...\`);
        }
      }
    };
  };
}

class Thermostat {
  private temp = 20;

  @range(10, 35)
  setTemp(value: number): number {
    this.temp = value;
    return this.temp;
  }
}

const t = new Thermostat();
console.log(\`Set: \${t.setTemp(25)}\`);
try {
  t.setTemp(50);
} catch (e: any) {
  console.log(\`Error: \${e.message}\`);
}`,
            output: `Set: 25
Error: setTemp: 50 not in [10, 35]`,
            tip: 'Decorator factories follow a common pattern: configure -> decorate -> execute. The outer function captures config, the middle function is the decorator, and the inner function is the runtime wrapper.',
            analogy: 'Think of it like ordering a custom phone case: you choose the design (configuration arguments), the factory produces the case (decorator function), and it wraps around your phone (the method it decorates).',
          },
        ],
        quiz: [
          {
            question: 'In what order are multiple decorators applied to a single class?',
            options: [
              'Top-to-bottom: the first decorator listed runs first',
              'Bottom-to-top: the decorator closest to the class runs first',
              'Alphabetical order by decorator name',
              'Random order that cannot be predicted',
            ],
            correctIndex: 1,
            explanation:
              'Decorators are applied bottom-to-top. In "@a @b class C {}", @b runs first (closest to the class), then @a. Think of it like nested function calls: a(b(C)). The decorators are evaluated top-to-bottom, but applied bottom-to-top.',
          },
          {
            question: 'What is a decorator factory?',
            options: [
              'A class that creates decorator instances at runtime',
              'A function that returns a decorator, allowing configuration with arguments',
              'A built-in TypeScript feature that auto-generates decorators',
              'A special syntax for applying multiple decorators at once',
            ],
            correctIndex: 1,
            explanation:
              'A decorator factory is a function that accepts configuration arguments and returns the actual decorator function. This pattern (e.g., @range(1, 100)) allows you to create parameterized, reusable decorators. Frameworks like Angular use this extensively (@Component({...})).',
          },
          {
            question: 'How do Stage 3 decorators (TS 5.0+) differ from older experimental decorators?',
            options: [
              'Stage 3 decorators are slower and have fewer features',
              'Stage 3 decorators use a context object instead of property descriptors',
              'Stage 3 decorators can only be applied to classes, not methods',
              'Stage 3 decorators require a special import statement to use',
            ],
            correctIndex: 1,
            explanation:
              'Stage 3 decorators (TC39 proposal, supported in TS 5.0+) use a context object (ClassDecoratorContext, ClassMethodDecoratorContext, etc.) instead of the older descriptor-based API. The older experimental decorators (--experimentalDecorators) are still supported but considered legacy.',
          },
          {
            question: 'What does context.addInitializer() do in a Stage 3 method decorator?',
            options: [
              'It adds a new method to the class prototype',
              'It registers a callback that runs when a new instance of the class is created',
              'It initializes the decorator factory with default values',
              'It adds type information to the TypeScript compiler',
            ],
            correctIndex: 1,
            explanation:
              'context.addInitializer() registers a callback function that will be called each time a new instance of the class is created. This is useful for per-instance setup like binding methods to the instance (as shown in the @bound decorator example).',
          },
        ],
        challenge: {
          prompt:
            'Create a method decorator called `@measure` that logs how long a method takes to execute. It should log the method name and execution time in milliseconds. Apply it to a class with a method that performs a computation (e.g., summing numbers up to n). Test it and verify the timing output.',
          starterCode: `// Create the measure decorator
function measure(
  originalMethod: Function,
  context: ClassMethodDecoratorContext,
) {
  // TODO: Return a wrapper that measures execution time
  // Use performance.now() or Date.now() for timing
  // Log: "methodName took Xms"
}

class Calculator {
  @measure
  sumUpTo(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  }
}

// Test
const calc = new Calculator();
const result = calc.sumUpTo(1000000);
console.log(\`Result: \${result}\`);`,
          solutionCode: `function measure(
  originalMethod: Function,
  context: ClassMethodDecoratorContext,
) {
  const name = String(context.name);
  return function (this: unknown, ...args: unknown[]) {
    const start = performance.now();
    const result = originalMethod.call(this, ...args);
    const end = performance.now();
    console.log(\`\${name} took \${(end - start).toFixed(2)}ms\`);
    return result;
  };
}

class Calculator {
  @measure
  sumUpTo(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  }
}

// Test
const calc = new Calculator();
const result = calc.sumUpTo(1000000);
console.log(\`Result: \${result}\`);
// Output:
// sumUpTo took X.XXms
// Result: 500000500000`,
          hints: [
            'Use performance.now() before and after calling originalMethod.call(this, ...args) to measure elapsed time.',
            'Get the method name from String(context.name) since context.name may be a symbol.',
            'Remember to return the result from the original method so the wrapper is transparent to callers.',
          ],
        },
      },
    ],
  },
];

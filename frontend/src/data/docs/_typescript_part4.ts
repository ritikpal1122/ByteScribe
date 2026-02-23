import type { DocCategory } from './types';

// Part 4: Utility Types (13 entries)
export const TS_PART4_CATEGORIES: DocCategory[] = [
  {
    id: 'ts-utility-types',
    label: 'Utility Types',
    icon: 'Wrench',
    entries: [
      {
        id: 'partial-type',
        title: 'Partial<T>',
        difficulty: 'intermediate',
        signature: 'type Partial<T> = { [P in keyof T]?: T[P] }',
        tags: ['utility-type', 'partial', 'optional', 'mapped-type'],
        cheatSheetSummary: '`Partial<T>` makes all properties of T optional.',
        sections: [
          { heading: 'Overview', content: 'Partial<T> constructs a type with all properties of T set to optional. This is extremely useful for update operations where you only want to provide a subset of an object\'s fields. Under the hood, it uses a mapped type to iterate over each key of T and add the ? modifier.',
            code: `interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// All properties become optional
type PartialUser = Partial<User>;

const update: PartialUser = { name: 'Alice' }; // OK
const empty: PartialUser = {};                   // OK

// Real-world: update function
function updateUser(id: number, fields: Partial<User>): User {
  const existing: User = { id, name: 'Old', email: 'old@x.com', age: 0 };
  return { ...existing, ...fields };
}

const updated = updateUser(1, { name: 'New', age: 30 });
console.log(updated);`,
            output: `{ id: 1, name: 'New', email: 'old@x.com', age: 30 }`,
            tip: 'Partial<T> is the idiomatic way to type update/patch payloads. Combine with Required<Pick<T, K>> when some fields must be present in the update.',
            analogy: 'Think of it like a restaurant order form where every item is optional: you check only the dishes you want, and the kitchen fills in defaults for the rest.',
            codeHighlightLines: [9, 15, 17],
          },
          { heading: 'Practical Usage', content: 'Partial is commonly paired with spread syntax in immutable update patterns. It is also useful for configuration objects where defaults fill in missing values. When building forms, Partial allows intermediate states where not all fields have been filled in yet.',
            code: `interface Config {
  host: string;
  port: number;
  debug: boolean;
}

// Merge defaults with user overrides
function createConfig(overrides: Partial<Config>): Config {
  const defaults: Config = { host: 'localhost', port: 3000, debug: false };
  return { ...defaults, ...overrides };
}

const dev = createConfig({ debug: true });
console.log(dev);

const prod = createConfig({ host: 'api.example.com', port: 443 });
console.log(prod);`,
            output: `{ host: 'localhost', port: 3000, debug: true }
{ host: 'api.example.com', port: 443, debug: false }`,
            tip: 'For deeply nested objects, Partial only makes the top-level properties optional. You may need a custom DeepPartial type for recursive optionality.' },
        ],
        quiz: [
          {
            question: 'What does Partial<T> do to the properties of T?',
            options: [
              'Makes all properties required',
              'Makes all properties optional',
              'Makes all properties readonly',
              'Removes all properties',
            ],
            correctIndex: 1,
            explanation: 'Partial<T> uses a mapped type with the ? modifier to make every property of T optional, allowing you to provide any subset of the fields.',
          },
          {
            question: 'What is the result of Partial<{ name: string; age: number }>?',
            options: [
              '{ name: string; age: number }',
              '{ name?: string; age?: number }',
              '{ readonly name: string; readonly age: number }',
              '{ name: string | null; age: number | null }',
            ],
            correctIndex: 1,
            explanation: 'Partial adds the ? modifier to each property, making them all optional. The resulting type is { name?: string; age?: number }.',
          },
          {
            question: 'Does Partial<T> make nested object properties optional?',
            options: [
              'Yes, it recursively makes all nested properties optional',
              'No, it only affects top-level properties',
              'It depends on the strictNullChecks setting',
              'It only makes nested properties optional if they are primitives',
            ],
            correctIndex: 1,
            explanation: 'Partial<T> only makes the top-level properties optional. Nested objects retain their original property modifiers. You need a custom DeepPartial type for recursive optionality.',
          },
        ],
        challenge: {
          prompt: 'Create a function called mergeDefaults that takes a defaults object of type T and an overrides object of type Partial<T>, and returns a merged object of type T where overrides take precedence. Test it with an interface Settings { theme: string; fontSize: number; showSidebar: boolean }.',
          starterCode: `interface Settings {
  theme: string;
  fontSize: number;
  showSidebar: boolean;
}

// Implement mergeDefaults here
function mergeDefaults<T>(defaults: T, overrides: Partial<T>): T {
  // Your code here
}

const defaults: Settings = { theme: 'light', fontSize: 14, showSidebar: true };
const result = mergeDefaults(defaults, { theme: 'dark', fontSize: 18 });
console.log(result);`,
          solutionCode: `interface Settings {
  theme: string;
  fontSize: number;
  showSidebar: boolean;
}

function mergeDefaults<T>(defaults: T, overrides: Partial<T>): T {
  return { ...defaults, ...overrides };
}

const defaults: Settings = { theme: 'light', fontSize: 14, showSidebar: true };
const result = mergeDefaults(defaults, { theme: 'dark', fontSize: 18 });
console.log(result);
// { theme: 'dark', fontSize: 18, showSidebar: true }`,
          hints: [
            'Use the spread operator (...) to merge objects, with overrides spread second so they take precedence.',
            'The function signature is already provided — focus on the single-line body using object spread.',
            'Remember that spreading overrides after defaults means any key present in overrides will overwrite the default value.',
          ],
        },
      },
      {
        id: 'required-type',
        title: 'Required<T>',
        difficulty: 'intermediate',
        signature: 'type Required<T> = { [P in keyof T]-?: T[P] }',
        tags: ['utility-type', 'required', 'mandatory', 'mapped-type'],
        cheatSheetSummary: '`Required<T>` makes all properties of T required (removes optional).',
        sections: [
          { heading: 'Overview', content: 'Required<T> constructs a type with all properties of T set to required, removing any optional modifiers. It is the exact opposite of Partial<T>. Under the hood, it uses the -? syntax to strip optional markers from each property. This is useful when you want to enforce that all fields are provided.',
            code: `interface Options {
  host?: string;
  port?: number;
  debug?: boolean;
}

// All properties are now required
type StrictOptions = Required<Options>;

// Error: Property 'debug' is missing
// const bad: StrictOptions = { host: 'localhost', port: 3000 };

const good: StrictOptions = {
  host: 'localhost',
  port: 3000,
  debug: false,
};

console.log(good);`,
            output: `{ host: 'localhost', port: 3000, debug: false }`,
            tip: 'Required<T> is especially useful for validated or finalized configuration objects where all values must be resolved.',
            analogy: 'Think of it like a mandatory checklist before a flight: every single item must be checked off, no exceptions. Required removes the "optional" checkbox from every field.' },
          { heading: 'Practical Usage', content: 'Required is often used after a validation step to signal that all optional properties have been resolved. For instance, user input might have optional fields, but after processing and applying defaults, every field is guaranteed to exist. This creates a strong contract between validation and downstream logic.',
            code: `interface FormInput {
  name?: string;
  email?: string;
  age?: number;
}

function validateForm(input: FormInput): Required<FormInput> {
  if (!input.name) throw new Error('Name is required');
  if (!input.email) throw new Error('Email is required');
  return {
    name: input.name,
    email: input.email,
    age: input.age ?? 0,
  };
}

const validated = validateForm({ name: 'Alice', email: 'a@b.com' });
console.log(validated);
// validated.name is guaranteed to be string, not string | undefined`,
            output: `{ name: 'Alice', email: 'a@b.com', age: 0 }`,
            tip: 'Combine Required with Pick to require only specific keys: Required<Pick<T, "name" | "email">> makes just name and email mandatory.',
            codeHighlightLines: [7, 10, 11, 12, 13],
          },
        ],
        quiz: [
          {
            question: 'What does Required<T> do?',
            options: [
              'Makes all properties optional',
              'Removes all properties from T',
              'Makes all properties required (removes optional modifiers)',
              'Makes all properties readonly',
            ],
            correctIndex: 2,
            explanation: 'Required<T> uses the -? syntax in a mapped type to strip the optional modifier from every property, making all fields mandatory.',
          },
          {
            question: 'What is the relationship between Required<T> and Partial<T>?',
            options: [
              'They are identical',
              'Required<T> is the exact opposite of Partial<T>',
              'Required<T> is a subset of Partial<T>',
              'They only work on different types',
            ],
            correctIndex: 1,
            explanation: 'Required<T> and Partial<T> are exact opposites. Partial adds the ? modifier to all properties, while Required removes it with -?.',
          },
          {
            question: 'Given interface Config { host?: string; port?: number }, what is Required<Config>?',
            options: [
              '{ host?: string; port?: number }',
              '{ host: string; port: number }',
              '{ readonly host: string; readonly port: number }',
              '{ host: string | undefined; port: number | undefined }',
            ],
            correctIndex: 1,
            explanation: 'Required removes the ? from each property, so host and port both become mandatory string and number respectively.',
          },
        ],
        challenge: {
          prompt: 'Create a function called validateAndComplete that accepts a Partial<Profile> and returns a Required<Profile>. The Profile interface has name (string), email (string), and bio (string). If any field is missing, fill it with a sensible default value.',
          starterCode: `interface Profile {
  name: string;
  email: string;
  bio: string;
}

function validateAndComplete(input: Partial<Profile>): Required<Profile> {
  // Your code here
}

const result = validateAndComplete({ name: 'Alice' });
console.log(result);`,
          solutionCode: `interface Profile {
  name: string;
  email: string;
  bio: string;
}

function validateAndComplete(input: Partial<Profile>): Required<Profile> {
  return {
    name: input.name ?? 'Anonymous',
    email: input.email ?? 'no-reply@example.com',
    bio: input.bio ?? 'No bio provided.',
  };
}

const result = validateAndComplete({ name: 'Alice' });
console.log(result);
// { name: 'Alice', email: 'no-reply@example.com', bio: 'No bio provided.' }`,
          hints: [
            'Use the nullish coalescing operator (??) to provide default values for each field.',
            'You must return an object with all three properties explicitly set — TypeScript will not let you return a partial object.',
            'Each field can fall back to a default string: a placeholder name, email, and bio message.',
          ],
        },
      },
      {
        id: 'readonly-type',
        title: 'Readonly<T>',
        difficulty: 'intermediate',
        signature: 'type Readonly<T> = { readonly [P in keyof T]: T[P] }',
        tags: ['utility-type', 'readonly', 'immutable', 'mapped-type'],
        cheatSheetSummary: '`Readonly<T>` makes all properties of T readonly (immutable).',
        sections: [
          { heading: 'Overview', content: 'Readonly<T> constructs a type where all properties of T are set to readonly, preventing reassignment after initialization. This is a compile-time safety measure that enforces immutability patterns. It does not affect runtime behavior, but it catches accidental mutation bugs during development.',
            code: `interface Point {
  x: number;
  y: number;
}

const origin: Readonly<Point> = { x: 0, y: 0 };
// origin.x = 5; // Error: Cannot assign to 'x' because it is a read-only property

// Useful for function parameters you don't want mutated
function distance(a: Readonly<Point>, b: Readonly<Point>): number {
  // a.x = 0; // Error: cannot mutate
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}

const d = distance({ x: 0, y: 0 }, { x: 3, y: 4 });
console.log(d);`,
            output: `5`,
            tip: 'Readonly<T> only makes the top-level properties readonly. Nested objects can still be mutated. Use a DeepReadonly utility for full immutability.',
            analogy: 'Think of it like putting a document behind glass in a museum display: you can look at every field, but you cannot reach in and change anything.' },
          { heading: 'Practical Usage', content: 'Readonly is especially valuable for Redux-style state management, configuration objects, and function parameters where you want to guarantee no side effects. Combining Readonly with as const assertions gives you both readonly properties and literal types for maximum type safety.',
            code: `// Redux-style state
interface AppState {
  user: string;
  count: number;
  items: string[];
}

function reducer(state: Readonly<AppState>, action: string): AppState {
  // state.count++; // Error: cannot mutate
  switch (action) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'reset':
      return { ...state, count: 0, items: [] };
    default:
      return { ...state };
  }
}

const initial: Readonly<AppState> = { user: 'Alice', count: 0, items: [] };
const next = reducer(initial, 'increment');
console.log(next);`,
            output: `{ user: 'Alice', count: 1, items: [] }`,
            tip: 'For arrays, use ReadonlyArray<T> or readonly T[] to prevent push, pop, and index assignment. Readonly<T> on an object with an array property only prevents reassigning the property, not mutating the array itself.',
            codeHighlightLines: [8, 12, 14],
          },
        ],
        quiz: [
          {
            question: 'What happens if you try to reassign a property on a Readonly<T> object?',
            options: [
              'It silently fails at runtime',
              'It throws a runtime error',
              'TypeScript reports a compile-time error',
              'The value is reassigned but the type is unchanged',
            ],
            correctIndex: 2,
            explanation: 'Readonly<T> is a compile-time construct. TypeScript will report an error like "Cannot assign to \'x\' because it is a read-only property." There is no runtime enforcement.',
          },
          {
            question: 'Does Readonly<T> make nested objects immutable?',
            options: [
              'Yes, all nested properties become readonly',
              'No, only top-level properties are made readonly',
              'Only if the nested object also uses Readonly',
              'It depends on the compiler version',
            ],
            correctIndex: 1,
            explanation: 'Readonly<T> only applies the readonly modifier to top-level properties. Nested objects can still be mutated unless they are also wrapped in Readonly.',
          },
          {
            question: 'Which utility type prevents array mutation (push, pop, etc.)?',
            options: [
              'Readonly<T[]>',
              'ReadonlyArray<T>',
              'Both Readonly<T[]> and ReadonlyArray<T> prevent array mutation',
              'Neither — arrays cannot be made readonly',
            ],
            correctIndex: 2,
            explanation: 'Both ReadonlyArray<T> and readonly T[] (or Readonly<T[]>) prevent array mutation methods like push and pop. They are equivalent representations.',
          },
        ],
        challenge: {
          prompt: 'Create a function called freeze that takes an object of type T and returns a Readonly<T>. Then create a function called cloneAndModify that accepts a Readonly<Point> and returns a new (mutable) Point with the x value doubled. Test with Point { x: number; y: number }.',
          starterCode: `interface Point {
  x: number;
  y: number;
}

function freeze<T>(obj: T): Readonly<T> {
  // Your code here
}

function cloneAndModify(p: Readonly<Point>): Point {
  // Your code here — return a new Point with x doubled
}

const original = freeze({ x: 5, y: 10 });
// original.x = 99; // Should be an error!
const modified = cloneAndModify(original);
console.log(modified);`,
          solutionCode: `interface Point {
  x: number;
  y: number;
}

function freeze<T>(obj: T): Readonly<T> {
  return Object.freeze(obj) as Readonly<T>;
}

function cloneAndModify(p: Readonly<Point>): Point {
  return { x: p.x * 2, y: p.y };
}

const original = freeze({ x: 5, y: 10 });
// original.x = 99; // Error: Cannot assign to 'x' because it is a read-only property
const modified = cloneAndModify(original);
console.log(modified);
// { x: 10, y: 10 }`,
          hints: [
            'For freeze, you can use Object.freeze() and cast the result to Readonly<T>.',
            'For cloneAndModify, create a brand new object with spread or literal syntax — do not try to mutate the readonly input.',
            'The key insight is that Readonly prevents mutation, so you must create new objects instead of modifying existing ones.',
          ],
        },
      },
      {
        id: 'record-type',
        title: 'Record<K, V>',
        difficulty: 'intermediate',
        signature: 'type Record<K extends keyof any, T> = { [P in K]: T }',
        tags: ['utility-type', 'record', 'dictionary', 'mapped-type', 'object'],
        cheatSheetSummary: '`Record<K, V>` constructs an object type with keys K and values V.',
        sections: [
          { heading: 'Overview', content: 'Record<K, V> constructs an object type whose property keys are K and whose values are V. It is commonly used for dictionaries, lookup maps, and any scenario where you need typed dynamic keys. When K is a union of string literals, TypeScript ensures every member is present as a key.',
            code: `// Simple dictionary
type Fruit = 'apple' | 'banana' | 'cherry';
type FruitPrices = Record<Fruit, number>;

const prices: FruitPrices = {
  apple: 1.5,
  banana: 0.75,
  cherry: 3.0,
  // Must include ALL fruits — missing one is an error
};

console.log(prices.apple);

// Dynamic string keys
type UserMap = Record<string, { name: string; age: number }>;
const users: UserMap = {
  u1: { name: 'Alice', age: 30 },
  u2: { name: 'Bob', age: 25 },
};

console.log(users['u1']);`,
            output: `1.5
{ name: 'Alice', age: 30 }`,
            tip: 'When keys are a union type, Record enforces exhaustiveness. If you add a new member to the union, TypeScript flags every Record that is missing it.',
            analogy: 'Think of it like a spreadsheet where the column headers are fixed (the keys K) and every cell in the data column must hold the same kind of value (V). If you add a new column header to K, every row must fill it in.',
            codeHighlightLines: [2, 3, 5, 6, 7, 8],
          },
          { heading: 'Practical Usage', content: 'Record is the go-to type for lookup tables, enum-to-value maps, and grouped data. It is more expressive than a plain index signature because it can constrain keys to specific literals. Combined with union types, it creates exhaustive mappings that the compiler can verify.',
            code: `// Status code descriptions
type HttpStatus = 200 | 301 | 404 | 500;
const statusMessages: Record<HttpStatus, string> = {
  200: 'OK',
  301: 'Moved Permanently',
  404: 'Not Found',
  500: 'Internal Server Error',
};

console.log(statusMessages[404]);

// Group items by category
type Category = 'fruit' | 'vegetable';
const inventory: Record<Category, string[]> = {
  fruit: ['apple', 'banana'],
  vegetable: ['carrot', 'pea'],
};

console.log(inventory.fruit);`,
            output: `Not Found
['apple', 'banana']`,
            tip: 'Prefer Record<string, T> over { [key: string]: T } for consistency and readability. They are equivalent, but Record is more concise.' },
        ],
        quiz: [
          {
            question: 'What does Record<K, V> construct?',
            options: [
              'An array of V elements indexed by K',
              'An object type with keys of type K and values of type V',
              'A tuple of K and V pairs',
              'A map that only allows string keys',
            ],
            correctIndex: 1,
            explanation: 'Record<K, V> creates an object type where every key is of type K and every value is of type V. When K is a union, it ensures exhaustive key coverage.',
          },
          {
            question: 'What happens when K in Record<K, V> is a union of string literals?',
            options: [
              'Only one of the union members needs to be present as a key',
              'TypeScript ignores the union and allows any string key',
              'Every member of the union must be present as a key',
              'It causes a compilation error',
            ],
            correctIndex: 2,
            explanation: 'When K is a union of string literals, Record ensures exhaustive coverage — every member of the union must appear as a property key in the resulting object.',
          },
          {
            question: 'Which two are equivalent type definitions?',
            options: [
              'Record<string, number> and Map<string, number>',
              'Record<string, number> and { [key: string]: number }',
              'Record<string, number> and Array<number>',
              'Record<string, number> and Partial<number>',
            ],
            correctIndex: 1,
            explanation: 'Record<string, number> is syntactic sugar for the index signature { [key: string]: number }. They produce the same type. Map is a runtime data structure, not a type alias.',
          },
        ],
        challenge: {
          prompt: 'Create a type-safe color theme system. Define a type ThemeColor as a union of "primary" | "secondary" | "accent" | "background" | "text". Create a Record-based Theme type mapping each color name to a hex string. Write a function getContrastColor that returns "black" or "white" based on whether the color starts with "#F" or "#f" (light) vs anything else (dark).',
          starterCode: `type ThemeColor = 'primary' | 'secondary' | 'accent' | 'background' | 'text';

// Define Theme type using Record
type Theme = // Your code here

// Create a theme object
const myTheme: Theme = {
  // Fill in hex color strings
};

function getContrastColor(theme: Theme, color: ThemeColor): 'black' | 'white' {
  // Return 'black' for light colors (starting with #F or #f), 'white' for dark
}

console.log(getContrastColor(myTheme, 'background'));`,
          solutionCode: `type ThemeColor = 'primary' | 'secondary' | 'accent' | 'background' | 'text';

type Theme = Record<ThemeColor, string>;

const myTheme: Theme = {
  primary: '#3B82F6',
  secondary: '#10B981',
  accent: '#F59E0B',
  background: '#F8FAFC',
  text: '#1E293B',
};

function getContrastColor(theme: Theme, color: ThemeColor): 'black' | 'white' {
  const hex = theme[color];
  return hex.startsWith('#F') || hex.startsWith('#f') ? 'black' : 'white';
}

console.log(getContrastColor(myTheme, 'background')); // 'black'
console.log(getContrastColor(myTheme, 'text'));        // 'white'`,
          hints: [
            'The Theme type is simply Record<ThemeColor, string> — mapping each color name to a hex string.',
            'Use string startsWith method to check if the hex color begins with "#F" or "#f".',
            'Because Theme uses a union for keys, TypeScript will force you to define all five color entries.',
          ],
        },
      },
      {
        id: 'pick-type',
        title: 'Pick<T, K>',
        difficulty: 'intermediate',
        signature: 'type Pick<T, K extends keyof T> = { [P in K]: T[P] }',
        tags: ['utility-type', 'pick', 'subset', 'mapped-type', 'selection'],
        cheatSheetSummary: '`Pick<T, K>` selects a subset of properties K from type T.',
        sections: [
          { heading: 'Overview', content: 'Pick<T, K> constructs a type by selecting the set of properties K from T. This is useful for creating lighter versions of existing types, such as API response shapes or form data types that only need certain fields. The second type parameter K must be a union of keys that exist in T.',
            code: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Only pick what the API returns publicly
type PublicUser = Pick<User, 'id' | 'name' | 'email'>;

const user: PublicUser = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  // password not allowed here
};

console.log(user);

// Pick for form data
type LoginForm = Pick<User, 'email' | 'password'>;
const form: LoginForm = { email: 'a@b.com', password: 'secret' };
console.log(Object.keys(form));`,
            output: `{ id: 1, name: 'Alice', email: 'alice@example.com' }
['email', 'password']`,
            tip: 'Pick is the opposite of Omit. Use Pick when you know the small set of fields you want, and Omit when you want everything except a few fields.',
            analogy: 'Think of it like a spotlight on a stage: Pick illuminates only the chosen actors (properties) and leaves the rest in darkness. You see exactly what you selected and nothing more.',
            codeHighlightLines: [10, 22],
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart LR
    U["User: id, name, email, password, createdAt"] -->|"Pick 'id','name','email'"| P["PublicUser: id, name, email"]
    U -->|"Pick 'email','password'"| L["LoginForm: email, password"]
    style P fill:#e8f5e9,stroke:#2e7d32
    style L fill:#e3f2fd,stroke:#1565c0`,
              caption: 'Pick selects different subsets of User for different use cases',
            },
          },
          { heading: 'Practical Usage', content: 'Pick is heavily used in layered architectures to create DTOs (Data Transfer Objects) from domain models. It helps enforce separation of concerns by ensuring that only relevant fields are exposed at each layer. It also works well with intersection types to compose new types from multiple picks.',
            code: `interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
}

// List view only needs summary fields
type ProductSummary = Pick<Product, 'id' | 'name' | 'price'>;

// Cart item combines pick with extra fields
type CartItem = Pick<Product, 'id' | 'name' | 'price'> & {
  quantity: number;
};

const item: CartItem = {
  id: 'p1',
  name: 'Widget',
  price: 9.99,
  quantity: 3,
};

console.log(item);
console.log('Total:', item.price * item.quantity);`,
            output: `{ id: 'p1', name: 'Widget', price: 9.99, quantity: 3 }
Total: 29.97`,
            tip: 'Combine Pick with intersection (&) to extend a picked type with additional properties, which is a clean alternative to creating a brand new interface.' },
        ],
        quiz: [
          {
            question: 'What does Pick<T, K> do?',
            options: [
              'Removes properties K from type T',
              'Makes properties K optional in type T',
              'Selects only properties K from type T',
              'Makes properties K required in type T',
            ],
            correctIndex: 2,
            explanation: 'Pick<T, K> creates a new type by selecting only the specified properties K from T. All other properties are excluded from the resulting type.',
          },
          {
            question: 'What is Pick<{ id: number; name: string; email: string }, "id" | "name">?',
            options: [
              '{ email: string }',
              '{ id: number; name: string }',
              '{ id: number; name: string; email: string }',
              '{ id?: number; name?: string }',
            ],
            correctIndex: 1,
            explanation: 'Pick selects only the specified keys. Pick with "id" | "name" results in { id: number; name: string }, excluding the email property entirely.',
          },
          {
            question: 'What happens if K includes a key that does not exist in T?',
            options: [
              'TypeScript silently ignores the invalid key',
              'The property is added with type unknown',
              'TypeScript reports a compile-time error',
              'The property is added with type any',
            ],
            correctIndex: 2,
            explanation: 'Pick constrains K to keyof T, so specifying a key that does not exist in T causes a compile-time error: "Type X is not assignable to type keyof T".',
          },
          {
            question: 'How can you combine Pick with other types to add extra properties?',
            options: [
              'Use Partial<Pick<T, K>>',
              'Use Pick<T, K> & { extraProp: type }',
              'Use Pick<T, K> | { extraProp: type }',
              'You cannot add extra properties to a Pick type',
            ],
            correctIndex: 1,
            explanation: 'Using the intersection operator (&), you can combine a Pick type with additional properties: Pick<T, K> & { extraProp: type } creates a type that has both the picked properties and the new ones.',
          },
        ],
        challenge: {
          prompt: 'Given a Product interface with id, name, description, price, stock, and sku fields, create three derived types using Pick: ProductCard (id, name, price), ProductDetail (id, name, description, price), and OrderLineItem which is Pick<Product, "id" | "name" | "price"> intersected with { quantity: number }. Create a function that converts a ProductDetail and a quantity into an OrderLineItem.',
          starterCode: `interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
}

// Define derived types using Pick
type ProductCard = // Your code
type ProductDetail = // Your code
type OrderLineItem = // Your code

function toOrderLineItem(product: ProductDetail, quantity: number): OrderLineItem {
  // Your code here
}

const detail: ProductDetail = { id: 'p1', name: 'Widget', description: 'A fine widget', price: 9.99 };
const lineItem = toOrderLineItem(detail, 3);
console.log(lineItem);`,
          solutionCode: `interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
}

type ProductCard = Pick<Product, 'id' | 'name' | 'price'>;
type ProductDetail = Pick<Product, 'id' | 'name' | 'description' | 'price'>;
type OrderLineItem = Pick<Product, 'id' | 'name' | 'price'> & { quantity: number };

function toOrderLineItem(product: ProductDetail, quantity: number): OrderLineItem {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity,
  };
}

const detail: ProductDetail = { id: 'p1', name: 'Widget', description: 'A fine widget', price: 9.99 };
const lineItem = toOrderLineItem(detail, 3);
console.log(lineItem);
// { id: 'p1', name: 'Widget', price: 9.99, quantity: 3 }`,
          hints: [
            'Use Pick<Product, "key1" | "key2"> syntax to select specific properties from Product.',
            'For OrderLineItem, use the intersection operator (&) to combine a Pick type with { quantity: number }.',
            'In toOrderLineItem, you need to extract only the id, name, and price from the ProductDetail (dropping description) and add quantity.',
          ],
        },
      },
      {
        id: 'omit-type',
        title: 'Omit<T, K>',
        difficulty: 'intermediate',
        signature: 'type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>',
        tags: ['utility-type', 'omit', 'exclude-keys', 'mapped-type', 'removal'],
        cheatSheetSummary: '`Omit<T, K>` creates a type by removing properties K from T.',
        sections: [
          { heading: 'Overview', content: 'Omit<T, K> constructs a type by picking all properties from T and then removing the keys specified in K. It is the inverse of Pick and is particularly useful when you want most properties of a type but need to exclude a few sensitive or irrelevant fields. Under the hood, it combines Pick and Exclude.',
            code: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Remove sensitive fields
type SafeUser = Omit<User, 'password'>;

const user: SafeUser = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  createdAt: new Date(),
  // password is not allowed
};

console.log(Object.keys(user));

// Remove multiple keys
type UserInput = Omit<User, 'id' | 'createdAt'>;
const input: UserInput = {
  name: 'Bob',
  email: 'bob@example.com',
  password: 'secret123',
};
console.log(Object.keys(input));`,
            output: `['id', 'name', 'email', 'createdAt']
['name', 'email', 'password']`,
            tip: 'Omit does not enforce that K is a key of T. You can omit keys that do not exist without errors, which can hide typos. Use a stricter custom StrictOmit if needed.',
            analogy: 'Think of it like redacting a document: you start with the full page and black out the fields you want hidden. Everything else remains visible and intact.',
            codeHighlightLines: [10, 23],
          },
          { heading: 'Practical Usage', content: 'Omit is commonly used to create "create" or "input" types from entity types by removing auto-generated fields like id and timestamps. It is also useful for component prop types where you want to pass through most HTML attributes but override a few specific ones.',
            code: `interface DbEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  status: 'active' | 'archived';
}

// Input type for creating new entities
type CreateInput = Omit<DbEntity, 'id' | 'createdAt' | 'updatedAt'>;

const newEntity: CreateInput = {
  name: 'My Item',
  description: 'A great item',
  status: 'active',
};

console.log(newEntity);

// Update type: omit id, make rest optional
type UpdateInput = Partial<Omit<DbEntity, 'id'>>;
const patch: UpdateInput = { name: 'Renamed' };
console.log(patch);`,
            output: `{ name: 'My Item', description: 'A great item', status: 'active' }
{ name: 'Renamed' }`,
            tip: 'The pattern Partial<Omit<T, "id">> is very common for update/patch endpoints. It creates a type where all fields except id are optional.',
            codeHighlightLines: [11, 22],
          },
        ],
        quiz: [
          {
            question: 'What is the relationship between Omit and Pick?',
            options: [
              'They are identical utilities',
              'Omit is the inverse of Pick — it removes specified keys instead of selecting them',
              'Omit works on unions while Pick works on objects',
              'Pick can only select one key while Omit can remove multiple',
            ],
            correctIndex: 1,
            explanation: 'Omit is the inverse of Pick. Pick selects only the specified keys, while Omit removes the specified keys and keeps everything else.',
          },
          {
            question: 'Does Omit enforce that the keys being omitted actually exist on the type?',
            options: [
              'Yes, it causes a compile error if the key does not exist',
              'No, you can omit keys that do not exist without errors',
              'Only in strict mode',
              'Only if K extends keyof T',
            ],
            correctIndex: 1,
            explanation: 'Omit uses "K extends keyof any" (not "K extends keyof T"), so you can omit keys that do not exist on T without errors. This can hide typos.',
          },
          {
            question: 'What is the common pattern Partial<Omit<T, "id">> used for?',
            options: [
              'Creating a type for new entity creation',
              'Creating a type for update/patch endpoints where all fields except id are optional',
              'Making the id field required and all others optional',
              'Removing the id field entirely',
            ],
            correctIndex: 1,
            explanation: 'Partial<Omit<T, "id">> first removes the id field, then makes all remaining fields optional. This is the standard pattern for update/patch payloads.',
          },
        ],
        challenge: {
          prompt: 'Create a "create entity" pattern. Given an Entity interface with id (string), createdAt (Date), updatedAt (Date), title (string), content (string), and published (boolean), use Omit to create a CreateEntityInput type that excludes the auto-generated fields (id, createdAt, updatedAt). Then write a function createEntity that accepts CreateEntityInput and returns a full Entity with generated values.',
          starterCode: `interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  published: boolean;
}

// Define CreateEntityInput using Omit
type CreateEntityInput = // Your code

function createEntity(input: CreateEntityInput): Entity {
  // Your code — generate id, createdAt, updatedAt
}

const entity = createEntity({ title: 'Hello', content: 'World', published: false });
console.log(entity);`,
          solutionCode: `interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  published: boolean;
}

type CreateEntityInput = Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>;

function createEntity(input: CreateEntityInput): Entity {
  const now = new Date();
  return {
    id: Math.random().toString(36).slice(2, 10),
    createdAt: now,
    updatedAt: now,
    ...input,
  };
}

const entity = createEntity({ title: 'Hello', content: 'World', published: false });
console.log(entity);
// { id: 'a1b2c3d4', createdAt: Date, updatedAt: Date, title: 'Hello', content: 'World', published: false }`,
          hints: [
            'Use Omit<Entity, "id" | "createdAt" | "updatedAt"> to exclude the auto-generated fields.',
            'In createEntity, generate an id (e.g., with Math.random().toString(36)) and set both timestamps to new Date().',
            'Spread the input object into the return value along with the generated fields.',
          ],
        },
      },
      {
        id: 'exclude-type',
        title: 'Exclude<T, U>',
        difficulty: 'intermediate',
        signature: 'type Exclude<T, U> = T extends U ? never : T',
        tags: ['utility-type', 'exclude', 'union', 'conditional-type', 'filter'],
        cheatSheetSummary: '`Exclude<T, U>` removes union members from T that are assignable to U.',
        sections: [
          { heading: 'Overview', content: 'Exclude<T, U> constructs a type by excluding from T all union members that are assignable to U. It operates on union types, not object properties (that is what Omit does). It uses a distributive conditional type under the hood, processing each member of the union individually.',
            code: `type Status = 'active' | 'inactive' | 'banned' | 'pending';

// Remove specific statuses
type AllowedStatus = Exclude<Status, 'banned'>;
// Result: 'active' | 'inactive' | 'pending'

type VisibleStatus = Exclude<Status, 'banned' | 'inactive'>;
// Result: 'active' | 'pending'

const s1: AllowedStatus = 'active';    // OK
// const s2: AllowedStatus = 'banned'; // Error

// Exclude primitives from a union
type Mixed = string | number | boolean | null;
type NonNull = Exclude<Mixed, null>;
// Result: string | number | boolean

const val: NonNull = 'hello'; // OK
// const bad: NonNull = null;  // Error

console.log(typeof val);`,
            output: `string`,
            tip: 'Exclude works on union types. To remove properties from object types, use Omit instead. They serve complementary purposes.',
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart LR
    S["'active' | 'inactive' | 'banned' | 'pending'"]
    S -->|"Exclude 'banned'"| R["'active' | 'inactive' | 'pending'"]
    S -->|"Exclude 'banned'|'inactive'"| R2["'active' | 'pending'"]
    style R fill:#e8f5e9,stroke:#2e7d32
    style R2 fill:#fff3e0,stroke:#e65100`,
              caption: 'Exclude filters out matching union members, keeping the rest',
            },
          },
          { heading: 'Practical Usage', content: 'Exclude is useful for narrowing event types, filtering action unions in reducers, and creating constrained subsets of string literal unions. It is a foundational building block used internally by several other utility types including Omit and NonNullable.',
            code: `// Filter event types
type AppEvent =
  | { type: 'click'; x: number; y: number }
  | { type: 'keypress'; key: string }
  | { type: 'scroll'; offset: number }
  | { type: 'resize'; width: number; height: number };

type EventType = AppEvent['type'];
// 'click' | 'keypress' | 'scroll' | 'resize'

type UIEventType = Exclude<EventType, 'scroll' | 'resize'>;
// 'click' | 'keypress'

// Narrow function parameter
function handleUIEvent(type: UIEventType): void {
  console.log('Handling:', type);
}

handleUIEvent('click');    // OK
// handleUIEvent('scroll'); // Error

// Exclude is how NonNullable works:
type MyNonNullable<T> = Exclude<T, null | undefined>;
type Safe = MyNonNullable<string | null>; // string`,
            output: `Handling: click`,
            tip: 'Exclude distributes over unions automatically. Exclude<A | B | C, B> checks each member individually: A extends B? no -> A; B extends B? yes -> never; C extends B? no -> C. Result: A | C.',
            analogy: 'Think of it like a bouncer at a club with a "not allowed" list: every member of the union lines up, and anyone on the blacklist (U) gets turned away. Only the allowed members pass through.' },
        ],
        quiz: [
          {
            question: 'What does Exclude<T, U> operate on?',
            options: [
              'Object properties',
              'Union type members',
              'Array elements',
              'Function parameters',
            ],
            correctIndex: 1,
            explanation: 'Exclude operates on union types, removing members that are assignable to U. For removing object properties, use Omit instead.',
          },
          {
            question: 'What is the result of Exclude<"a" | "b" | "c", "b">?',
            options: [
              '"a" | "c"',
              '"b"',
              '"a" | "b" | "c"',
              'never',
            ],
            correctIndex: 0,
            explanation: 'Exclude removes union members assignable to U. Since "b" matches, it is removed, leaving "a" | "c".',
          },
          {
            question: 'What is Exclude<string | number | null | undefined, null | undefined> equivalent to?',
            options: [
              'string | number | null',
              'null | undefined',
              'string | number',
              'never',
            ],
            correctIndex: 2,
            explanation: 'This excludes null and undefined from the union, leaving string | number. This is exactly what the NonNullable utility type does.',
          },
          {
            question: 'How does Exclude distribute over unions?',
            options: [
              'It checks the entire union against U at once',
              'It checks each member of the union individually against U',
              'It only checks the first member of the union',
              'Distribution depends on the strictNullChecks setting',
            ],
            correctIndex: 1,
            explanation: 'Exclude uses a distributive conditional type. Each member of T is individually checked: if it extends U, it becomes never (removed); otherwise it is kept.',
          },
        ],
        challenge: {
          prompt: 'Create a permission system. Define a type Permission as "read" | "write" | "delete" | "admin" | "superadmin". Use Exclude to create a RegularPermission type that excludes admin-level permissions ("admin" | "superadmin"). Write a function hasPermission that accepts a RegularPermission and logs whether access is granted.',
          starterCode: `type Permission = 'read' | 'write' | 'delete' | 'admin' | 'superadmin';

// Create RegularPermission using Exclude
type RegularPermission = // Your code

function hasPermission(perm: RegularPermission): void {
  // Log "Access granted for: <perm>"
}

hasPermission('read');
hasPermission('write');
// hasPermission('admin'); // Should be a type error`,
          solutionCode: `type Permission = 'read' | 'write' | 'delete' | 'admin' | 'superadmin';

type RegularPermission = Exclude<Permission, 'admin' | 'superadmin'>;

function hasPermission(perm: RegularPermission): void {
  console.log('Access granted for:', perm);
}

hasPermission('read');    // OK
hasPermission('write');   // OK
hasPermission('delete');  // OK
// hasPermission('admin'); // Error: Argument of type '"admin"' is not assignable`,
          hints: [
            'Use Exclude<Permission, "admin" | "superadmin"> to remove the admin-level permissions from the union.',
            'The resulting type RegularPermission will be "read" | "write" | "delete".',
            'The function body just needs to console.log the granted permission.',
          ],
        },
      },
      {
        id: 'extract-type',
        title: 'Extract<T, U>',
        difficulty: 'intermediate',
        signature: 'type Extract<T, U> = T extends U ? T : never',
        tags: ['utility-type', 'extract', 'union', 'conditional-type', 'filter'],
        cheatSheetSummary: '`Extract<T, U>` extracts union members from T that are assignable to U.',
        sections: [
          { heading: 'Overview', content: 'Extract<T, U> constructs a type by extracting from T all union members that are assignable to U. It is the opposite of Exclude. Like Exclude, it uses a distributive conditional type, keeping members that match rather than removing them. This is useful for narrowing broad unions to specific subsets.',
            code: `type Status = 'active' | 'inactive' | 'banned' | 'pending';

// Keep only specific members
type ActiveStatuses = Extract<Status, 'active' | 'pending'>;
// Result: 'active' | 'pending'

const s: ActiveStatuses = 'active'; // OK
// const bad: ActiveStatuses = 'banned'; // Error

// Extract by assignability
type Primitives = string | number | boolean | object | (() => void);
type StringOrNumber = Extract<Primitives, string | number>;
// Result: string | number

type Functions = Extract<Primitives, Function>;
// Result: () => void

const fn: Functions = () => {};
console.log(typeof fn);`,
            output: `function`,
            tip: 'Extract and Exclude are complementary. Extract keeps matching members while Exclude removes them. Together they let you partition any union type.',
            analogy: 'Think of it like panning for gold: you sift through a mixed union and Extract keeps only the nuggets (members) that match the shape you are looking for, discarding everything else.' },
          { heading: 'Practical Usage', content: 'Extract is commonly used to narrow discriminated unions to specific variants, pull out function types from mixed unions, and create type-safe event handlers. It is especially powerful when combined with mapped types to create handlers for specific subsets of events or actions.',
            code: `// Discriminated union of actions
type Action =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number }
  | { type: 'SET_FILTER'; filter: string };

// Extract only actions that have an 'id' field
type TodoAction = Extract<Action, { id: number }>;
// Result: { type: 'TOGGLE_TODO'; id: number } | { type: 'DELETE_TODO'; id: number }

function handleTodoAction(action: TodoAction) {
  console.log('Todo action on id:', action.id);
}

handleTodoAction({ type: 'TOGGLE_TODO', id: 5 });

// Extract specific action by type
type AddAction = Extract<Action, { type: 'ADD_TODO' }>;
// Result: { type: 'ADD_TODO'; text: string }

const add: AddAction = { type: 'ADD_TODO', text: 'Learn TypeScript' };
console.log(add);`,
            output: `Todo action on id: 5
{ type: 'ADD_TODO', text: 'Learn TypeScript' }`,
            tip: 'Extract<Action, { type: "ADD_TODO" }> is a clean pattern for extracting a single variant from a discriminated union without redefining it.',
            codeHighlightLines: [9, 19],
          },
        ],
        quiz: [
          {
            question: 'What does Extract<T, U> do?',
            options: [
              'Removes members from T that are assignable to U',
              'Extracts members from T that are assignable to U',
              'Extracts properties from object type T',
              'Creates a union of T and U',
            ],
            correctIndex: 1,
            explanation: 'Extract<T, U> keeps only the union members of T that are assignable to U, discarding the rest. It is the opposite of Exclude.',
          },
          {
            question: 'What is Extract<string | number | boolean, string | number>?',
            options: [
              'boolean',
              'string | number | boolean',
              'string | number',
              'never',
            ],
            correctIndex: 2,
            explanation: 'Extract keeps members assignable to the second argument. string and number are assignable to string | number, so they are kept. boolean is not, so it is removed.',
          },
          {
            question: 'How can you extract a specific variant from a discriminated union?',
            options: [
              'Extract<Union, { type: "specific" }>',
              'Exclude<Union, { type: "specific" }>',
              'Pick<Union, "type">',
              'Omit<Union, "type">',
            ],
            correctIndex: 0,
            explanation: 'Extract<Action, { type: "ADD_TODO" }> matches the union member whose type field is "ADD_TODO", extracting that specific variant.',
          },
        ],
        challenge: {
          prompt: 'Given a discriminated union of Shape types (Circle with radius, Square with side, Rectangle with width and height, Triangle with base and height), use Extract to create types for only shapes that have a "height" property. Then write a function getHeight that accepts only those extracted shapes and returns the height.',
          starterCode: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };

// Extract shapes that have a height property
type ShapeWithHeight = // Your code

function getHeight(shape: ShapeWithHeight): number {
  // Your code
}

console.log(getHeight({ kind: 'rectangle', width: 10, height: 20 }));
console.log(getHeight({ kind: 'triangle', base: 5, height: 12 }));`,
          solutionCode: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };

type ShapeWithHeight = Extract<Shape, { height: number }>;

function getHeight(shape: ShapeWithHeight): number {
  return shape.height;
}

console.log(getHeight({ kind: 'rectangle', width: 10, height: 20 })); // 20
console.log(getHeight({ kind: 'triangle', base: 5, height: 12 }));   // 12
// getHeight({ kind: 'circle', radius: 5 }); // Error!`,
          hints: [
            'Use Extract<Shape, { height: number }> to keep only union members that have a height property.',
            'The result will be the rectangle and triangle variants, since they both have height: number.',
            'In getHeight, you can safely access shape.height since all extracted variants have it.',
          ],
        },
      },
      {
        id: 'nonnullable-type',
        title: 'NonNullable<T>',
        difficulty: 'intermediate',
        signature: 'type NonNullable<T> = Exclude<T, null | undefined>',
        tags: ['utility-type', 'nonnullable', 'null-safety', 'conditional-type'],
        cheatSheetSummary: '`NonNullable<T>` removes null and undefined from T.',
        sections: [
          { heading: 'Overview', content: 'NonNullable<T> constructs a type by excluding null and undefined from T. It is essentially a shorthand for Exclude<T, null | undefined>. This is invaluable when working with strict null checks, converting nullable types to their guaranteed-present forms after validation or null guards.',
            code: `type MaybeString = string | null | undefined;

// Remove null and undefined
type SafeString = NonNullable<MaybeString>;
// Result: string

const s: SafeString = 'hello'; // OK
// const bad: SafeString = null;     // Error
// const bad2: SafeString = undefined; // Error

// Works with complex unions
type MaybeUser = { name: string } | null | undefined;
type User = NonNullable<MaybeUser>;
// Result: { name: string }

const user: User = { name: 'Alice' };
console.log(user.name);

// Type-level null stripping
type Input = string | number | null | boolean | undefined;
type Clean = NonNullable<Input>;
// Result: string | number | boolean`,
            output: `Alice`,
            tip: 'NonNullable is often used with function return types: NonNullable<ReturnType<typeof fn>> gives the return type with null and undefined removed.',
            analogy: 'Think of it like a water filter that removes impurities: NonNullable takes a type that may contain null or undefined "contaminants" and filters them out, leaving only the clean, guaranteed-present types.' },
          { heading: 'Practical Usage', content: 'NonNullable is commonly used after runtime null checks to match the narrowed type. It is also helpful for typing the output of find, map, or database query operations where you have already filtered out null values but need the type system to reflect that.',
            code: `interface Config {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
}

// After validation, all values are present
function getRequiredConfig(config: Config): {
  apiUrl: NonNullable<Config['apiUrl']>;
  timeout: NonNullable<Config['timeout']>;
  retries: NonNullable<Config['retries']>;
} {
  return {
    apiUrl: config.apiUrl ?? 'https://api.example.com',
    timeout: config.timeout ?? 5000,
    retries: config.retries ?? 3,
  };
}

const resolved = getRequiredConfig({ apiUrl: 'https://my-api.com' });
console.log(resolved);

// Filter out nulls from array with type narrowing
const items: (string | null)[] = ['a', null, 'b', null, 'c'];
const cleaned: string[] = items.filter(
  (item): item is NonNullable<typeof item> => item !== null
);
console.log(cleaned);`,
            output: `{ apiUrl: 'https://my-api.com', timeout: 5000, retries: 3 }
['a', 'b', 'c']`,
            tip: 'The type guard (item): item is NonNullable<typeof item> combined with filter is the type-safe way to remove nulls from an array.',
            codeHighlightLines: [9, 10, 11, 26, 27],
          },
        ],
        quiz: [
          {
            question: 'What does NonNullable<T> remove from T?',
            options: [
              'Only null',
              'Only undefined',
              'Both null and undefined',
              'All falsy values (null, undefined, 0, "")',
            ],
            correctIndex: 2,
            explanation: 'NonNullable<T> is defined as Exclude<T, null | undefined>, so it removes both null and undefined from the union type.',
          },
          {
            question: 'What is NonNullable<string | number | null | undefined>?',
            options: [
              'string | number | null',
              'string | number',
              'string',
              'never',
            ],
            correctIndex: 1,
            explanation: 'NonNullable removes null and undefined, leaving string | number.',
          },
          {
            question: 'Which type guard pattern works with NonNullable to filter nulls from an array?',
            options: [
              'items.filter(x => x !== null)',
              'items.filter((x): x is NonNullable<typeof x> => x !== null)',
              'items.map(x => x!)',
              'items.filter(Boolean)',
            ],
            correctIndex: 1,
            explanation: 'The type predicate (x): x is NonNullable<typeof x> => x !== null tells TypeScript that the filtered array contains no nulls. Without the type guard, TypeScript cannot narrow the array element type.',
          },
        ],
        challenge: {
          prompt: 'Create a function called compactArray that takes an array of (T | null | undefined)[] and returns T[] with all null and undefined values removed. Use NonNullable in the return type and a type guard in the filter. Test with a mixed array of numbers and nulls.',
          starterCode: `function compactArray<T>(items: (T | null | undefined)[]): NonNullable<T>[] {
  // Your code here — use filter with a type guard
}

const mixed = [1, null, 2, undefined, 3, null, 4];
const clean = compactArray(mixed);
console.log(clean);
console.log(clean.length);`,
          solutionCode: `function compactArray<T>(items: (T | null | undefined)[]): NonNullable<T>[] {
  return items.filter(
    (item): item is NonNullable<T> => item !== null && item !== undefined
  );
}

const mixed = [1, null, 2, undefined, 3, null, 4];
const clean = compactArray(mixed);
console.log(clean);   // [1, 2, 3, 4]
console.log(clean.length); // 4`,
          hints: [
            'Use Array.filter with a type guard predicate: (item): item is NonNullable<T> => ...',
            'The filter condition should check for both null and undefined: item !== null && item !== undefined.',
            'The return type NonNullable<T>[] ensures the result array has no null or undefined elements.',
          ],
        },
      },
      {
        id: 'returntype-type',
        title: 'ReturnType<T>',
        difficulty: 'intermediate',
        signature: 'type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any',
        tags: ['utility-type', 'returntype', 'function', 'infer', 'conditional-type'],
        cheatSheetSummary: '`ReturnType<T>` extracts the return type of function type T.',
        sections: [
          { heading: 'Overview', content: 'ReturnType<T> constructs a type consisting of the return type of function T. It uses conditional types with the infer keyword to extract the return type. This is useful when you want to reference a function\'s return type without duplicating it, keeping your types DRY and automatically in sync with the function implementation.',
            code: `function createUser(name: string, age: number) {
  return { id: Math.random(), name, age, createdAt: new Date() };
}

// Extract the return type automatically
type User = ReturnType<typeof createUser>;
// Result: { id: number; name: string; age: number; createdAt: Date }

const user: User = {
  id: 1,
  name: 'Alice',
  age: 30,
  createdAt: new Date(),
};
console.log(user.name);

// Works with arrow functions too
const fetchData = async (url: string) => {
  return { data: 'response', status: 200 };
};

type FetchResult = ReturnType<typeof fetchData>;
// Result: Promise<{ data: string; status: number }>`,
            output: `Alice`,
            tip: 'Use typeof before the function name: ReturnType<typeof myFunction>. ReturnType expects a type, not a value, so typeof converts the function value to its type.',
            analogy: 'Think of it like reading the label on the output slot of a machine: you do not need to know how the machine works internally, ReturnType just tells you what comes out the other end.',
            codeHighlightLines: [6, 22],
          },
          { heading: 'Practical Usage', content: 'ReturnType is especially useful in testing, where you need to mock return values, and in state management, where reducer return types should match the state type. It eliminates manual type duplication and ensures that changes to a function\'s return value automatically propagate to all dependent types.',
            code: `// Factory pattern — type derived from factory
function createAPIClient(baseUrl: string) {
  return {
    get: (path: string) => fetch(baseUrl + path),
    post: (path: string, body: unknown) =>
      fetch(baseUrl + path, { method: 'POST', body: JSON.stringify(body) }),
    baseUrl,
  };
}

type APIClient = ReturnType<typeof createAPIClient>;

function useClient(client: APIClient) {
  console.log('Client base URL:', client.baseUrl);
}

// Extract return type of a method
type GetResult = ReturnType<APIClient['get']>;
// Result: Promise<Response>

const client = createAPIClient('https://api.example.com');
useClient(client);`,
            output: `Client base URL: https://api.example.com`,
            tip: 'For async functions, ReturnType gives you Promise<T>. Use Awaited<ReturnType<typeof fn>> to unwrap the Promise and get T directly.' },
        ],
        quiz: [
          {
            question: 'Why do you need typeof when using ReturnType with a function?',
            options: [
              'typeof converts the function to a string',
              'ReturnType expects a type, not a value, so typeof converts the function value to its type',
              'typeof makes the function generic',
              'It is optional — ReturnType works without typeof',
            ],
            correctIndex: 1,
            explanation: 'ReturnType<T> expects T to be a function type, not a runtime value. typeof converts a function value into its corresponding type so ReturnType can extract the return type.',
          },
          {
            question: 'What does ReturnType<typeof fn> give for an async function that returns { data: string }?',
            options: [
              '{ data: string }',
              'Promise<{ data: string }>',
              'void',
              'string',
            ],
            correctIndex: 1,
            explanation: 'Async functions always return a Promise. ReturnType captures the full return type, which is Promise<{ data: string }>. Use Awaited<ReturnType<typeof fn>> to unwrap the Promise.',
          },
          {
            question: 'How can you get the unwrapped return type of an async function?',
            options: [
              'ReturnType<typeof asyncFn>',
              'Awaited<ReturnType<typeof asyncFn>>',
              'Parameters<typeof asyncFn>',
              'Extract<ReturnType<typeof asyncFn>, Promise<any>>',
            ],
            correctIndex: 1,
            explanation: 'Awaited<ReturnType<typeof asyncFn>> first gets the Promise<T> return type via ReturnType, then unwraps the Promise via Awaited to give you T.',
          },
        ],
        challenge: {
          prompt: 'Create a factory function called createStore that returns an object with getState, setState, and subscribe methods. Then use ReturnType<typeof createStore> to define a Store type. Write a function that accepts a Store and logs its current state.',
          starterCode: `function createStore(initialState: { count: number }) {
  let state = initialState;
  const listeners: (() => void)[] = [];
  return {
    getState: () => state,
    setState: (newState: Partial<typeof state>) => {
      state = { ...state, ...newState };
      listeners.forEach(fn => fn());
    },
    subscribe: (listener: () => void) => {
      listeners.push(listener);
      return () => { /* unsubscribe */ };
    },
  };
}

// Define Store type using ReturnType
type Store = // Your code

function logState(store: Store): void {
  // Your code
}

const store = createStore({ count: 0 });
store.setState({ count: 5 });
logState(store);`,
          solutionCode: `function createStore(initialState: { count: number }) {
  let state = initialState;
  const listeners: (() => void)[] = [];
  return {
    getState: () => state,
    setState: (newState: Partial<typeof state>) => {
      state = { ...state, ...newState };
      listeners.forEach(fn => fn());
    },
    subscribe: (listener: () => void) => {
      listeners.push(listener);
      return () => {
        const idx = listeners.indexOf(listener);
        if (idx >= 0) listeners.splice(idx, 1);
      };
    },
  };
}

type Store = ReturnType<typeof createStore>;

function logState(store: Store): void {
  console.log('Current state:', store.getState());
}

const store = createStore({ count: 0 });
store.setState({ count: 5 });
logState(store);
// Current state: { count: 5 }`,
          hints: [
            'Use ReturnType<typeof createStore> to automatically derive the Store type from the factory function.',
            'The logState function just needs to call store.getState() and log the result.',
            'ReturnType keeps your Store type in sync with createStore — if you add methods, the type updates automatically.',
          ],
        },
      },
      {
        id: 'parameters-type',
        title: 'Parameters<T>',
        difficulty: 'intermediate',
        signature: 'type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never',
        tags: ['utility-type', 'parameters', 'function', 'tuple', 'infer'],
        cheatSheetSummary: '`Parameters<T>` extracts the parameter types of function T as a tuple.',
        sections: [
          { heading: 'Overview', content: 'Parameters<T> constructs a tuple type from the parameter types of a function type T. This lets you reference a function\'s parameter list as a type without repeating it. The result is a tuple where each element corresponds to a parameter position. You can index into the tuple to get individual parameter types.',
            code: `function greet(name: string, age: number, active: boolean) {
  return \`\${name} is \${age}\`;
}

type GreetParams = Parameters<typeof greet>;
// Result: [name: string, age: number, active: boolean]

// Use the full tuple
const args: GreetParams = ['Alice', 30, true];
console.log(greet(...args));

// Index into individual parameters
type FirstParam = Parameters<typeof greet>[0]; // string
type SecondParam = Parameters<typeof greet>[1]; // number

const name: FirstParam = 'Bob';
const age: SecondParam = 25;
console.log(name, age);`,
            output: `Alice is 30
Bob 25`,
            tip: 'Use Parameters<typeof fn>[0] to extract the type of the first argument, [1] for the second, and so on. This avoids manually duplicating parameter types.',
            codeHighlightLines: [5, 13, 14],
          },
          { heading: 'Practical Usage', content: 'Parameters is useful for creating wrapper functions, middleware, and decorators that need to forward arguments to another function while maintaining type safety. It is also valuable for testing, where you need to construct valid argument lists for functions under test.',
            code: `// Type-safe wrapper function
function logCall<T extends (...args: any[]) => any>(
  fn: T,
  ...args: Parameters<T>
): ReturnType<T> {
  console.log('Calling with:', args);
  return fn(...args);
}

function add(a: number, b: number): number {
  return a + b;
}

const result = logCall(add, 3, 4); // Fully typed!
console.log('Result:', result);

// Reuse another function's parameter shape
function fetchUser(id: string, options: { cache: boolean }) {
  return { id, cached: options.cache };
}

type FetchUserArgs = Parameters<typeof fetchUser>;
const myArgs: FetchUserArgs = ['user-1', { cache: true }];
console.log(fetchUser(...myArgs));`,
            output: `Calling with: [3, 4]
Result: 7
{ id: 'user-1', cached: true }`,
            tip: 'Combine Parameters with ReturnType to create fully typed wrappers: a function that takes the same parameters and returns the same type as the wrapped function.',
            analogy: 'Think of it like tracing the input plugs on a machine: Parameters tells you exactly what shape and type of connectors go into each slot, so you can build a compatible adapter.' },
        ],
        quiz: [
          {
            question: 'What type does Parameters<T> produce?',
            options: [
              'An object type with parameter names as keys',
              'A tuple type of all parameter types',
              'The type of the first parameter',
              'A union of all parameter types',
            ],
            correctIndex: 1,
            explanation: 'Parameters<T> produces a tuple type where each element corresponds to a parameter position of the function. For example, Parameters<(a: string, b: number) => void> is [string, number].',
          },
          {
            question: 'How do you get the type of the second parameter of a function?',
            options: [
              'Parameters<typeof fn>[1]',
              'Parameters<typeof fn>[2]',
              'Parameters<typeof fn>.second',
              'Parameters<typeof fn>["1"]',
            ],
            correctIndex: 0,
            explanation: 'Parameters produces a tuple, and tuple indexing is zero-based. Index [1] gives the type of the second parameter.',
          },
          {
            question: 'What is a common use case for Parameters<T>?',
            options: [
              'Creating class constructors',
              'Generating documentation',
              'Building type-safe wrapper functions that forward arguments',
              'Converting functions to arrow functions',
            ],
            correctIndex: 2,
            explanation: 'Parameters<T> is commonly used with wrapper functions, middleware, and decorators that need to accept and forward the same arguments as the wrapped function while maintaining type safety.',
          },
        ],
        challenge: {
          prompt: 'Create a type-safe debounce function. It should accept any function and a delay in milliseconds, and return a debounced version that accepts the same parameters (using Parameters<T>). The debounced function should use setTimeout and clearTimeout internally.',
          starterCode: `function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  // Your code here
}

function search(query: string, page: number): void {
  console.log(\`Searching: \${query}, page \${page}\`);
}

const debouncedSearch = debounce(search, 300);
debouncedSearch('typescript', 1); // typed correctly!
// debouncedSearch(123); // Should be a type error`,
          solutionCode: `function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}

function search(query: string, page: number): void {
  console.log(\`Searching: \${query}, page \${page}\`);
}

const debouncedSearch = debounce(search, 300);
debouncedSearch('typescript', 1); // Fully typed: (query: string, page: number) => void
// debouncedSearch(123); // Error: expected string, got number`,
          hints: [
            'The return type is (...args: Parameters<T>) => void — this ensures the debounced function has the same parameter types.',
            'Store a timeoutId variable in the closure. Clear it on each call and set a new timeout.',
            'Use ReturnType<typeof setTimeout> for the timeoutId type to be cross-platform compatible.',
          ],
        },
      },
      {
        id: 'awaited-type',
        title: 'Awaited<T>',
        difficulty: 'intermediate',
        signature: 'type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T',
        tags: ['utility-type', 'awaited', 'promise', 'async', 'infer'],
        cheatSheetSummary: '`Awaited<T>` recursively unwraps Promise types. Available since TS 4.5.',
        sections: [
          { heading: 'Overview', content: 'Awaited<T> recursively unwraps Promise types to give you the resolved value type. It handles nested promises (Promise<Promise<T>>) by unwrapping all layers. If T is not a Promise, it returns T unchanged. This was introduced in TypeScript 4.5 and is particularly useful for typing the results of async operations and Promise.all.',
            code: `// Basic unwrapping
type A = Awaited<Promise<string>>;        // string
type B = Awaited<Promise<Promise<number>>>; // number (recursive!)
type C = Awaited<string>;                  // string (non-promise unchanged)

// Useful with async function return types
async function fetchUser() {
  return { id: 1, name: 'Alice' };
}

type User = Awaited<ReturnType<typeof fetchUser>>;
// Result: { id: 1, name: string } — Promise unwrapped!

const user: User = { id: 1, name: 'Alice' };
console.log(user);

// Promise.all result typing
type Results = Awaited<Promise<[string, number, boolean]>>;
// Result: [string, number, boolean]`,
            output: `{ id: 1, name: 'Alice' }`,
            tip: 'Awaited<ReturnType<typeof asyncFn>> is the standard pattern for getting the resolved return type of an async function.',
            analogy: 'Think of it like unwrapping nested gift boxes: Awaited keeps opening each Promise wrapper until it finds the actual value inside, no matter how many layers of wrapping there are.',
            codeHighlightLines: [2, 3, 11],
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart LR
    P2["Promise&lt;Promise&lt;number&gt;&gt;"] -->|unwrap| P1["Promise&lt;number&gt;"]
    P1 -->|unwrap| V["number"]
    S["string"] -->|"not a Promise"| S2["string (unchanged)"]
    style V fill:#e8f5e9,stroke:#2e7d32
    style S2 fill:#e3f2fd,stroke:#1565c0`,
              caption: 'Awaited recursively unwraps Promise layers until it reaches the resolved value type',
            },
          },
          { heading: 'Practical Usage', content: 'Awaited is essential for typing the results of Promise.all, Promise.race, and other Promise combinators. Before TypeScript 4.5, developers had to write custom unwrap types. Awaited also simplifies generic async utility functions where the resolved type needs to be referenced.',
            code: `// Type-safe Promise.all helper
async function fetchAll() {
  const [user, posts, settings] = await Promise.all([
    Promise.resolve({ name: 'Alice' }),
    Promise.resolve([{ title: 'Post 1' }, { title: 'Post 2' }]),
    Promise.resolve({ theme: 'dark' }),
  ]);
  return { user, posts, settings };
}

type DashboardData = Awaited<ReturnType<typeof fetchAll>>;
// { user: { name: string }; posts: { title: string }[]; settings: { theme: string } }

// Generic async cache
async function cached<T extends Promise<any>>(
  key: string,
  fn: () => T
): Promise<Awaited<T>> {
  console.log('Computing for key:', key);
  return await fn();
}

const result = await cached('user', () => Promise.resolve({ id: 1 }));
console.log(result);`,
            output: `Computing for key: user
{ id: 1 }`,
            tip: 'Awaited handles PromiseLike as well as Promise, so it works with any thenable object, not just native Promises.' },
        ],
        quiz: [
          {
            question: 'What does Awaited<Promise<Promise<string>>> resolve to?',
            options: [
              'Promise<Promise<string>>',
              'Promise<string>',
              'string',
              'never',
            ],
            correctIndex: 2,
            explanation: 'Awaited recursively unwraps all Promise layers. Promise<Promise<string>> becomes Promise<string> after one unwrap, then string after the second. The final result is string.',
          },
          {
            question: 'What does Awaited<string> return?',
            options: [
              'never',
              'Promise<string>',
              'string',
              'It causes a compilation error',
            ],
            correctIndex: 2,
            explanation: 'If T is not a Promise, Awaited returns T unchanged. Since string is not a Promise, Awaited<string> is simply string.',
          },
          {
            question: 'What is the standard pattern for getting the resolved return type of an async function?',
            options: [
              'ReturnType<typeof asyncFn>',
              'Awaited<typeof asyncFn>',
              'Awaited<ReturnType<typeof asyncFn>>',
              'Parameters<typeof asyncFn>',
            ],
            correctIndex: 2,
            explanation: 'Awaited<ReturnType<typeof asyncFn>> first extracts the return type (Promise<T>) via ReturnType, then unwraps the Promise via Awaited to get T.',
          },
          {
            question: 'When was the Awaited utility type introduced?',
            options: [
              'TypeScript 3.0',
              'TypeScript 4.0',
              'TypeScript 4.5',
              'TypeScript 5.0',
            ],
            correctIndex: 2,
            explanation: 'Awaited was introduced in TypeScript 4.5. Before that, developers had to write custom recursive unwrap types.',
          },
        ],
        challenge: {
          prompt: 'Create a function called fetchAllData that uses Promise.all to fetch a user (returns { name: string }), their posts (returns { title: string }[]), and settings (returns { theme: string }). Use Awaited<ReturnType<typeof fetchAllData>> to define a DashboardData type. Write a function renderDashboard that accepts DashboardData and logs a summary.',
          starterCode: `async function fetchUser(): Promise<{ name: string }> {
  return { name: 'Alice' };
}

async function fetchPosts(): Promise<{ title: string }[]> {
  return [{ title: 'Post 1' }, { title: 'Post 2' }];
}

async function fetchSettings(): Promise<{ theme: string }> {
  return { theme: 'dark' };
}

async function fetchAllData() {
  // Use Promise.all to fetch all three
}

// Define DashboardData using Awaited + ReturnType
type DashboardData = // Your code

function renderDashboard(data: DashboardData): void {
  // Log a summary
}`,
          solutionCode: `async function fetchUser(): Promise<{ name: string }> {
  return { name: 'Alice' };
}

async function fetchPosts(): Promise<{ title: string }[]> {
  return [{ title: 'Post 1' }, { title: 'Post 2' }];
}

async function fetchSettings(): Promise<{ theme: string }> {
  return { theme: 'dark' };
}

async function fetchAllData() {
  const [user, posts, settings] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchSettings(),
  ]);
  return { user, posts, settings };
}

type DashboardData = Awaited<ReturnType<typeof fetchAllData>>;

function renderDashboard(data: DashboardData): void {
  console.log(\`User: \${data.user.name}\`);
  console.log(\`Posts: \${data.posts.map(p => p.title).join(', ')}\`);
  console.log(\`Theme: \${data.settings.theme}\`);
}

fetchAllData().then(renderDashboard);
// User: Alice
// Posts: Post 1, Post 2
// Theme: dark`,
          hints: [
            'In fetchAllData, use const [user, posts, settings] = await Promise.all([fetchUser(), fetchPosts(), fetchSettings()]) and return an object with all three.',
            'The DashboardData type is Awaited<ReturnType<typeof fetchAllData>> — this unwraps the Promise to get the resolved object type.',
            'In renderDashboard, access data.user.name, data.posts, and data.settings.theme for the summary.',
          ],
        },
      },
      {
        id: 'noinfert-type',
        title: 'NoInfer<T>',
        difficulty: 'intermediate',
        signature: 'type NoInfer<T> = intrinsic',
        tags: ['utility-type', 'noinfer', 'inference', 'generic', 'constraint'],
        cheatSheetSummary: '`NoInfer<T>` prevents type inference in a generic position. Available since TS 5.4.',
        sections: [
          { heading: 'Overview', content: 'NoInfer<T> is an intrinsic utility type introduced in TypeScript 5.4 that blocks the compiler from inferring a type parameter from a specific position. This is useful in generic functions where multiple parameters use the same type variable, and you want inference to be driven by one specific parameter rather than all of them. It prevents unwanted type widening from secondary arguments.',
            code: `// Without NoInfer — T widens unexpectedly
function createFSM<T extends string>(
  initial: T,
  states: T[]
) {
  return { current: initial, states };
}
// T is inferred as 'idle' | 'loading' | 'error' — all three
const fsm1 = createFSM('idle', ['idle', 'loading', 'error']);

// With NoInfer — T inferred only from 'initial'
function createFSMSafe<T extends string>(
  initial: T,
  states: NoInfer<T>[]
) {
  return { current: initial, states };
}
// T is inferred as 'idle' from the first argument only
// const fsm2 = createFSMSafe('idle', ['idle', 'loading', 'error']); // Error!
const fsm2 = createFSMSafe('idle', ['idle']); // OK
console.log(fsm2);`,
            output: `{ current: 'idle', states: ['idle'] }`,
            tip: 'Use NoInfer on parameters that should be constrained by inference from other parameters, not contribute to inference themselves.',
            analogy: 'Think of it like a one-way mirror at a police lineup: the "initial" parameter is the witness who drives the identification (inference), while NoInfer tells the "states" parameter to stay behind the glass and not influence the outcome.',
            codeHighlightLines: [3, 4, 13, 14],
          },
          { heading: 'Practical Usage', content: 'NoInfer is particularly valuable for default value parameters, event emitter patterns, and any API where one argument should define the type and other arguments should conform to it. Without NoInfer, TypeScript often widens the inferred type to a union of all argument types, which reduces type safety.',
            code: `// Default value that must match the main type
function getOrDefault<T>(
  value: T | undefined,
  defaultVal: NoInfer<T>
): T {
  return value ?? defaultVal;
}

// T inferred from value only
const num = getOrDefault<number>(undefined, 42);
console.log(num);

// Without NoInfer, this would infer T as number | string
// getOrDefault(undefined, 'fallback'); // Error: string not assignable to number

// Event system with constrained listeners
type Events = {
  click: { x: number; y: number };
  keypress: { key: string };
};

function on<K extends keyof Events>(
  event: K,
  handler: (data: NoInfer<Events[K]>) => void
): void {
  console.log('Registered handler for:', event);
}

on('click', (data) => console.log(data.x, data.y));
on('keypress', (data) => console.log(data.key));`,
            output: `Registered handler for: click
Registered handler for: keypress`,
            tip: 'NoInfer is an intrinsic type (handled by the compiler, not implementable in userland). It is a zero-cost annotation that only affects type checking, not runtime behavior.',
            codeHighlightLines: [4, 23],
          },
        ],
        quiz: [
          {
            question: 'What does NoInfer<T> do?',
            options: [
              'Prevents TypeScript from inferring T at that position',
              'Makes T optional',
              'Converts T to never',
              'Forces T to be inferred as a literal type',
            ],
            correctIndex: 0,
            explanation: 'NoInfer<T> blocks the compiler from using that parameter position to infer the type variable T. Inference is driven only by other positions where NoInfer is not used.',
          },
          {
            question: 'When was NoInfer<T> introduced?',
            options: [
              'TypeScript 4.0',
              'TypeScript 4.5',
              'TypeScript 5.0',
              'TypeScript 5.4',
            ],
            correctIndex: 3,
            explanation: 'NoInfer<T> is an intrinsic utility type introduced in TypeScript 5.4.',
          },
          {
            question: 'What problem does NoInfer<T> solve in generic functions?',
            options: [
              'It prevents runtime type errors',
              'It prevents unwanted type widening when multiple parameters use the same type variable',
              'It makes the function faster to compile',
              'It allows the function to accept more types',
            ],
            correctIndex: 1,
            explanation: 'Without NoInfer, TypeScript infers T from all parameter positions, often widening it to a union. NoInfer restricts inference to specific positions, preventing unwanted widening.',
          },
          {
            question: 'What is the runtime impact of NoInfer<T>?',
            options: [
              'It adds a runtime type check',
              'It wraps the value in a proxy',
              'It has zero runtime impact — it only affects type checking',
              'It converts the value to a readonly version',
            ],
            correctIndex: 2,
            explanation: 'NoInfer is a compile-time-only annotation. It is an intrinsic type handled by the TypeScript compiler and produces no runtime code.',
          },
        ],
        challenge: {
          prompt: 'Create a type-safe createSelect function that accepts a list of options and a default value. The default must be one of the options. Use NoInfer on the default parameter so that T is inferred only from the options array, not widened by the default value.',
          starterCode: `// Without NoInfer — T would widen from both parameters
// Fix this using NoInfer on the defaultValue parameter
function createSelect<T extends string>(
  options: T[],
  defaultValue: T
): { options: T[]; selected: T } {
  return { options, selected: defaultValue };
}

// This should work:
const select = createSelect(['small', 'medium', 'large'], 'medium');
console.log(select);

// This should cause a type error (but without NoInfer it won't):
// const bad = createSelect(['small', 'medium', 'large'], 'xlarge');`,
          solutionCode: `function createSelect<T extends string>(
  options: T[],
  defaultValue: NoInfer<T>
): { options: T[]; selected: T } {
  return { options, selected: defaultValue };
}

// T is inferred as 'small' | 'medium' | 'large' from options only
const select = createSelect(['small', 'medium', 'large'], 'medium');
console.log(select);
// { options: ['small', 'medium', 'large'], selected: 'medium' }

// This correctly causes a type error with NoInfer:
// const bad = createSelect(['small', 'medium', 'large'], 'xlarge');
// Error: Argument of type '"xlarge"' is not assignable to parameter of type '"small" | "medium" | "large"'`,
          hints: [
            'Wrap the defaultValue parameter type with NoInfer<T> so it does not contribute to inference of T.',
            'With NoInfer, T will be inferred solely from the options array, and defaultValue must conform to that inferred type.',
            'The function body does not change — NoInfer only affects type checking, not the implementation.',
          ],
        },
      },
    ],
  },
];

import type { DocCategory } from './types';

// Part 3: Generics & Advanced Types
export const TS_PART3_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Generics                                                     */
  /* ------------------------------------------------------------ */
  {
    id: 'ts-generics',
    label: 'Generics',
    icon: 'Code',
    entries: [
      {
        id: 'generic-functions',
        title: 'Generic Functions',
        difficulty: 'intermediate',
        tags: ['generic', 'type-parameter', 'constraints', 'extends', 'default-type'],
        cheatSheetSummary: 'function fn<T>(arg: T): T — type parameters make functions reusable across types.',
        sections: [
          {
            heading: 'Basic Generic Functions',
            content:
              'Generic functions let you write a single function that works with many types while preserving type safety. You declare a type parameter in angle brackets before the parameter list. TypeScript can often infer the type argument from the value you pass, so you rarely need to specify it explicitly. This is one of the most powerful features in TypeScript and is used extensively in libraries like React and lodash.',
            code: `// Basic generic function
function identity<T>(value: T): T {
  return value;
}

// TypeScript infers the type argument
const str = identity('hello');  // type: string
const num = identity(42);       // type: number
console.log(str, num);

// Explicit type argument (rarely needed)
const arr = identity<number[]>([1, 2, 3]);
console.log(arr);

// Multiple type parameters
function pair<A, B>(first: A, second: B): [A, B] {
  return [first, second];
}

const p = pair('age', 30);  // type: [string, number]
console.log(p);

// Generic arrow function
const toArray = <T>(value: T): T[] => [value];
console.log(toArray(42));
console.log(toArray('hi'));`,
            output: `hello 42
[1, 2, 3]
['age', 30]
[42]
['hi']`,
            tip: 'Let TypeScript infer type arguments whenever possible. Explicit type arguments like fn<string>(...) are only needed when inference fails or you want a wider type.',
            analogy: 'Think of it like a vending machine with a shape-sorter slot: whatever shape (type) you push in, the same shape comes out. The machine does not care whether it is a circle or square — it preserves the exact shape.',
            codeHighlightLines: [2, 7, 8, 15, 16],
          },
          {
            heading: 'Generic Constraints with extends',
            content:
              'You can restrict what types a generic accepts using the extends keyword. Constraints ensure the type parameter has certain properties, preventing you from passing incompatible types. Without constraints, TypeScript assumes the type parameter could be anything and limits what operations you can perform. Constraints strike a balance between flexibility and safety.',
            code: `// Constraint: T must have a length property
function logLength<T extends { length: number }>(item: T): void {
  console.log(\`Length: \${item.length}\`);
}

logLength('hello');      // string has length
logLength([1, 2, 3]);   // array has length
// logLength(42);        // Error: number has no length

// Constraint with interface
interface Printable {
  toString(): string;
}

function print<T extends Printable>(value: T): string {
  return value.toString();
}

console.log(print(42));
console.log(print({ toString: () => 'custom' }));

// Multiple constraints using intersection
interface HasId { id: number; }
interface HasName { name: string; }

function display<T extends HasId & HasName>(item: T): string {
  return \`\${item.id}: \${item.name}\`;
}

console.log(display({ id: 1, name: 'Alice', age: 30 }));`,
            output: `Length: 5
Length: 3
42
custom
1: Alice`,
            note: 'Constraints are checked at compile time. The extends keyword in generics means "is assignable to", not class inheritance.',
            analogy: 'Think of it like a building security badge: the generic is an open door, but the constraint is a minimum clearance level. Anyone with at least that clearance (the required properties) may enter.',
            codeHighlightLines: [2, 15, 26],
            diagram: {
              kind: 'mermaid' as const,
              code: `graph TD
    A["T (unconstrained)"] -->|"extends"| B["{ length: number }"]
    C["string"] -->|"has length ✓"| B
    D["number[]"] -->|"has length ✓"| B
    E["number"] -->|"no length ✗"| F["Compile Error"]
    style F fill:#fee,stroke:#c33`,
              caption: 'Generic constraint: only types with a length property pass the extends check',
            },
          },
          {
            heading: 'Default Type Parameters',
            content:
              'Generic type parameters can have default values, similar to default function parameters. When a default is provided, callers can omit that type argument and the default will be used. This is commonly seen in library types like React component props. Default type parameters must come after required type parameters, just like default function parameters come after required ones.',
            code: `// Default type parameter
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message: string;
}

// Without specifying T, it defaults to unknown
const res1: ApiResponse = {
  data: 'anything',
  status: 200,
  message: 'OK',
};

// With explicit type
const res2: ApiResponse<{ id: number; name: string }> = {
  data: { id: 1, name: 'Alice' },
  status: 200,
  message: 'OK',
};

console.log(res1.status);
console.log(res2.data.name);

// Default with constraint
function createState<T extends object = Record<string, unknown>>(
  initial: T
): { get: () => T; set: (val: T) => void } {
  let state = initial;
  return {
    get: () => state,
    set: (val: T) => { state = val; },
  };
}

const s = createState({ count: 0 });
console.log(s.get());`,
            output: `200
Alice
{ count: 0 }`,
            tip: 'Default type parameters are especially useful in library code. They let consumers use simple types for common cases while allowing advanced users to customize.',
          },
        ],
        quiz: [
          {
            question: 'What does TypeScript do when you call identity(42) without specifying a type argument?',
            options: [
              'It throws a compile-time error requiring an explicit type',
              'It infers the type argument as number from the value passed',
              'It defaults the type argument to any',
              'It defaults the type argument to unknown',
            ],
            correctIndex: 1,
            explanation: 'TypeScript can infer type arguments from the values passed to generic functions. When you call identity(42), TypeScript infers T as number from the argument.',
          },
          {
            question: 'What is the purpose of the extends keyword in a generic constraint like <T extends { length: number }>?',
            options: [
              'It makes T inherit from an anonymous class',
              'It restricts T to types that have a length property of type number',
              'It converts T to have a length property at runtime',
              'It creates a new type that merges T with { length: number }',
            ],
            correctIndex: 1,
            explanation: 'The extends keyword in generics constrains the type parameter so only types assignable to the constraint are accepted. This ensures T has a length property of type number.',
          },
          {
            question: 'What is the type of the variable p in: const p = pair("age", 30)?',
            options: [
              '[string, string]',
              '[any, any]',
              '[string, number]',
              'Array<string | number>',
            ],
            correctIndex: 2,
            explanation: 'TypeScript infers both type parameters from the arguments. "age" is string and 30 is number, so the return type is [string, number] — a tuple.',
          },
          {
            question: 'What is the correct default type parameter syntax?',
            options: [
              'function fn<T = string>(arg: T): T',
              'function fn<T default string>(arg: T): T',
              'function fn<T : string>(arg: T): T',
              'function fn<T || string>(arg: T): T',
            ],
            correctIndex: 0,
            explanation: 'Default type parameters use the = syntax, just like default function parameters. The syntax is <T = DefaultType>.',
          },
        ],
        challenge: {
          prompt: 'Write a generic function called wrapInArray that takes a value of any type T and a count (number), and returns an array of T filled with that value count times. For example, wrapInArray("hello", 3) should return ["hello", "hello", "hello"].',
          starterCode: `// Write your generic function here
function wrapInArray</* fill in */>(/* fill in */): /* fill in */ {
  // Your implementation
}

// Test cases
console.log(wrapInArray('hello', 3));  // ['hello', 'hello', 'hello']
console.log(wrapInArray(42, 2));       // [42, 42]
console.log(wrapInArray(true, 1));     // [true]`,
          solutionCode: `function wrapInArray<T>(value: T, count: number): T[] {
  return Array(count).fill(value);
}

// Test cases
console.log(wrapInArray('hello', 3));  // ['hello', 'hello', 'hello']
console.log(wrapInArray(42, 2));       // [42, 42]
console.log(wrapInArray(true, 1));     // [true]`,
          hints: [
            'The function needs a single type parameter T for the value type.',
            'The return type should be T[] since you are returning an array of the same type.',
            'You can use Array(count).fill(value) to create the filled array.',
          ],
        },
      },
      {
        id: 'generic-interfaces',
        title: 'Generic Interfaces',
        difficulty: 'intermediate',
        tags: ['generic', 'interface', 'constraint', 'keyof', 'reusable'],
        cheatSheetSummary: 'interface Box<T> { value: T } — parameterize interfaces for reusable contracts.',
        sections: [
          {
            heading: 'Generic Interface Definition',
            content:
              'Generic interfaces allow you to define contracts that work with multiple types. The type parameter is specified when the interface is used, making a single interface definition serve many concrete types. This is fundamental to TypeScript collections, Promise types, and API response shapes. You can also use generics in interface method signatures for even more flexibility.',
            code: `// Generic interface
interface Box<T> {
  value: T;
  map<U>(fn: (val: T) => U): Box<U>;
}

function createBox<T>(value: T): Box<T> {
  return {
    value,
    map<U>(fn: (val: T) => U): Box<U> {
      return createBox(fn(value));
    },
  };
}

const numBox = createBox(42);
console.log(numBox.value);

const strBox = numBox.map(n => n.toString());
console.log(strBox.value);

// Generic interface for a repository
interface Repository<T extends { id: number }> {
  findById(id: number): T | undefined;
  findAll(): T[];
  save(item: T): void;
}

// keyof constraint
interface Lookup<T> {
  get<K extends keyof T>(key: K): T[K];
  set<K extends keyof T>(key: K, value: T[K]): void;
}

// Usage type-checks keys and values
type User = { name: string; age: number };
declare const lookup: Lookup<User>;
// lookup.get('name') returns string
// lookup.set('age', 30) is valid
// lookup.set('age', 'thirty') would be a type error
console.log('Generic interfaces defined');`,
            output: `42
42
Generic interfaces defined`,
            tip: 'Use keyof constraints (K extends keyof T) to create type-safe property access. This ensures only valid keys are accepted and the return type matches the property.',
            analogy: 'Think of it like a shipping box with a label: Box<T> is the box, and T is whatever you print on the label. The label guarantees anyone who opens the box knows exactly what is inside.',
            codeHighlightLines: [2, 3, 4, 30, 31],
          },
          {
            heading: 'Generic Class and Constraint Patterns',
            content:
              'Generic interfaces are often implemented by generic classes. The class provides the concrete behavior while the interface defines the contract. Constraints on generic interfaces ensure implementors work with types that have required properties. This pattern is the backbone of dependency injection and service layers in TypeScript applications.',
            code: `// Generic class implementing a generic interface
interface Collection<T> {
  add(item: T): void;
  get(index: number): T | undefined;
  size(): number;
}

class TypedList<T> implements Collection<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  size(): number {
    return this.items.length;
  }

  filter(predicate: (item: T) => boolean): TypedList<T> {
    const result = new TypedList<T>();
    for (const item of this.items) {
      if (predicate(item)) result.add(item);
    }
    return result;
  }
}

const numbers = new TypedList<number>();
numbers.add(10);
numbers.add(20);
numbers.add(30);
console.log('Size:', numbers.size());
console.log('First:', numbers.get(0));

const big = numbers.filter(n => n > 15);
console.log('Filtered size:', big.size());`,
            output: `Size: 3
First: 10
Filtered size: 2`,
            note: 'When a class implements a generic interface, the class itself is typically generic too. This ensures the type flows through from the interface contract to the implementation.',
            diagram: {
              kind: 'mermaid' as const,
              code: `classDiagram
    class Collection~T~ {
        <<interface>>
        +add(item: T) void
        +get(index: number) T | undefined
        +size() number
    }
    class TypedList~T~ {
        -items: T[]
        +add(item: T) void
        +get(index: number) T | undefined
        +size() number
        +filter(predicate) TypedList~T~
    }
    Collection~T~ <|.. TypedList~T~ : implements`,
              caption: 'TypedList<T> implements the Collection<T> interface and adds a filter method',
            },
          },
        ],
        quiz: [
          {
            question: 'What does the generic interface Box<T> with a map<U> method enable?',
            options: [
              'It allows you to change the interface at runtime',
              'It lets you transform the contained value to a different type while preserving the Box structure',
              'It creates a copy of the Box with the same type',
              'It only works with primitive types',
            ],
            correctIndex: 1,
            explanation: 'The map<U> method on Box<T> takes a function (val: T) => U and returns a Box<U>. This transforms the contained value from type T to type U while preserving the Box wrapper — a functor pattern.',
          },
          {
            question: 'What does K extends keyof T achieve in a generic interface?',
            options: [
              'K becomes a copy of T',
              'K is restricted to the string literal union of T\'s property names',
              'K inherits all methods from T',
              'K becomes an alias for T',
            ],
            correctIndex: 1,
            explanation: 'keyof T produces a union of all property names of T. Constraining K extends keyof T means K can only be one of those property names, enabling type-safe property access.',
          },
          {
            question: 'Why does the Repository interface use T extends { id: number }?',
            options: [
              'To ensure every repository has a numeric index',
              'To make id optional on all types',
              'To guarantee items stored in the repository have an id property for lookup',
              'To restrict the repository to only number types',
            ],
            correctIndex: 2,
            explanation: 'The constraint T extends { id: number } ensures any type stored in the repository has an id property, which the repository needs for operations like findById.',
          },
        ],
        challenge: {
          prompt: 'Create a generic interface KeyValueStore<K, V> with methods: set(key: K, value: V): void, get(key: K): V | undefined, and has(key: K): boolean. Then implement it as a class MapStore<K, V> using a Map internally.',
          starterCode: `// Define the generic interface
interface KeyValueStore<K, V> {
  // Add method signatures
}

// Implement the interface
class MapStore<K, V> implements KeyValueStore<K, V> {
  // Your implementation
}

// Test
const store = new MapStore<string, number>();
store.set('a', 1);
store.set('b', 2);
console.log(store.get('a'));    // 1
console.log(store.has('c'));    // false`,
          solutionCode: `interface KeyValueStore<K, V> {
  set(key: K, value: V): void;
  get(key: K): V | undefined;
  has(key: K): boolean;
}

class MapStore<K, V> implements KeyValueStore<K, V> {
  private map = new Map<K, V>();

  set(key: K, value: V): void {
    this.map.set(key, value);
  }

  get(key: K): V | undefined {
    return this.map.get(key);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }
}

const store = new MapStore<string, number>();
store.set('a', 1);
store.set('b', 2);
console.log(store.get('a'));    // 1
console.log(store.has('c'));    // false`,
          hints: [
            'The interface needs two type parameters K and V for key and value types.',
            'Use a private Map<K, V> field inside the class to store the data.',
            'Delegate each method to the corresponding Map method (map.set, map.get, map.has).',
          ],
        },
      },
      {
        id: 'generic-classes',
        title: 'Generic Classes',
        difficulty: 'intermediate',
        tags: ['generic', 'class', 'repository', 'bounded', 'type-parameter'],
        cheatSheetSummary: 'class Stack<T> { ... } — classes with type parameters for reusable data structures.',
        sections: [
          {
            heading: 'Class with Type Parameter',
            content:
              'Generic classes parameterize the type of data they operate on. The type parameter is declared after the class name and can be used throughout the class body for properties, method parameters, and return types. This is the standard approach for building type-safe data structures like stacks, queues, and linked lists in TypeScript.',
            code: `// Generic Stack implementation
class Stack<T> {
  private elements: T[] = [];

  push(item: T): void {
    this.elements.push(item);
  }

  pop(): T | undefined {
    return this.elements.pop();
  }

  peek(): T | undefined {
    return this.elements[this.elements.length - 1];
  }

  isEmpty(): boolean {
    return this.elements.length === 0;
  }

  get size(): number {
    return this.elements.length;
  }
}

const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
numStack.push(3);
console.log('Peek:', numStack.peek());
console.log('Pop:', numStack.pop());
console.log('Size:', numStack.size);

const strStack = new Stack<string>();
strStack.push('hello');
strStack.push('world');
console.log('String peek:', strStack.peek());`,
            output: `Peek: 3
Pop: 3
Size: 2
String peek: world`,
            tip: 'Generic classes are ideal for container types. The type parameter ensures you cannot accidentally mix incompatible types within the same instance.',
            analogy: 'Think of it like a stack of cafeteria trays: each stack holds only one kind of tray. A Stack<number> is the number-tray stack and a Stack<string> is the string-tray stack — you cannot place a string tray on the number stack.',
            codeHighlightLines: [2, 5, 9, 13, 25],
          },
          {
            heading: 'Generic Repository and Bounded Generics',
            content:
              'The repository pattern is a classic use case for generic classes. A base repository defines CRUD operations once, then concrete repositories inherit it for specific entity types. Bounded generics (using extends) ensure the type parameter meets minimum requirements, such as having an id property. This pattern reduces boilerplate and enforces consistent data access patterns.',
            code: `// Entity base type
interface Entity {
  id: string;
  createdAt: Date;
}

// Generic repository with bounded type
class BaseRepository<T extends Entity> {
  protected items = new Map<string, T>();

  save(item: T): void {
    this.items.set(item.id, item);
  }

  findById(id: string): T | undefined {
    return this.items.get(id);
  }

  findAll(): T[] {
    return Array.from(this.items.values());
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }
}

// Concrete entity
interface User extends Entity {
  name: string;
  email: string;
}

// Concrete repository
class UserRepository extends BaseRepository<User> {
  findByEmail(email: string): User | undefined {
    return this.findAll().find(u => u.email === email);
  }
}

const repo = new UserRepository();
repo.save({ id: '1', name: 'Alice', email: 'a@b.com', createdAt: new Date() });
repo.save({ id: '2', name: 'Bob', email: 'b@b.com', createdAt: new Date() });

console.log('All:', repo.findAll().map(u => u.name));
console.log('By email:', repo.findByEmail('a@b.com')?.name);`,
            output: `All: ['Alice', 'Bob']
By email: Alice`,
            note: 'The constraint T extends Entity guarantees every item has an id, so the repository can safely use item.id as the map key without additional runtime checks.',
            diagram: {
              kind: 'mermaid' as const,
              code: `classDiagram
    class Entity {
        <<interface>>
        +id: string
        +createdAt: Date
    }
    class User {
        <<interface>>
        +name: string
        +email: string
    }
    class BaseRepository~T extends Entity~ {
        #items: Map
        +save(item: T) void
        +findById(id: string) T?
        +findAll() T[]
        +delete(id: string) boolean
    }
    class UserRepository {
        +findByEmail(email: string) User?
    }
    Entity <|-- User : extends
    BaseRepository~T~ <|-- UserRepository : extends
    BaseRepository~T~ ..> Entity : T bounded by`,
              caption: 'UserRepository inherits generic CRUD from BaseRepository, bounded by Entity',
            },
          },
        ],
        quiz: [
          {
            question: 'What is the main advantage of using a generic class like Stack<T> over a plain class with any?',
            options: [
              'Generic classes are faster at runtime',
              'Generic classes use less memory',
              'Generic classes prevent mixing incompatible types in the same instance',
              'Generic classes generate different code for each type',
            ],
            correctIndex: 2,
            explanation: 'A Stack<number> only accepts numbers and a Stack<string> only accepts strings. This prevents accidentally pushing a string onto a number stack, catching errors at compile time rather than runtime.',
          },
          {
            question: 'In the BaseRepository<T extends Entity> example, what does the constraint provide?',
            options: [
              'It makes T an abstract class',
              'It guarantees T has id and createdAt properties',
              'It creates a database connection for T',
              'It converts T to an Entity at runtime',
            ],
            correctIndex: 1,
            explanation: 'The constraint T extends Entity ensures that any type used with BaseRepository has at least the id: string and createdAt: Date properties that Entity defines, allowing the repository to safely use item.id.',
          },
          {
            question: 'How does UserRepository extend BaseRepository<User>?',
            options: [
              'It reimplements all CRUD methods',
              'It inherits generic CRUD methods and adds a domain-specific findByEmail method',
              'It changes the generic type to any',
              'It removes the type constraint',
            ],
            correctIndex: 1,
            explanation: 'UserRepository extends BaseRepository<User>, inheriting save, findById, findAll, and delete methods for free, while adding a new findByEmail method specific to User.',
          },
        ],
        challenge: {
          prompt: 'Create a generic Queue<T> class with methods: enqueue(item: T), dequeue(): T | undefined, peek(): T | undefined, isEmpty(): boolean, and a size getter. The queue should be FIFO (first in, first out).',
          starterCode: `class Queue<T> {
  // Your implementation

  enqueue(item: T): void {
    // Add to end
  }

  dequeue(): T | undefined {
    // Remove from front
  }

  peek(): T | undefined {
    // Look at front without removing
  }

  isEmpty(): boolean {
    // Check if empty
  }

  get size(): number {
    // Return count
  }
}

// Test
const q = new Queue<string>();
q.enqueue('first');
q.enqueue('second');
q.enqueue('third');
console.log(q.peek());      // 'first'
console.log(q.dequeue());   // 'first'
console.log(q.dequeue());   // 'second'
console.log(q.size);        // 1`,
          solutionCode: `class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  get size(): number {
    return this.items.length;
  }
}

// Test
const q = new Queue<string>();
q.enqueue('first');
q.enqueue('second');
q.enqueue('third');
console.log(q.peek());      // 'first'
console.log(q.dequeue());   // 'first'
console.log(q.dequeue());   // 'second'
console.log(q.size);        // 1`,
          hints: [
            'Use a private array T[] to store the queue elements.',
            'enqueue adds to the end (push), dequeue removes from the front (shift).',
            'peek returns the first element without modifying the array.',
          ],
        },
      },
      {
        id: 'generic-constraints',
        title: 'Generic Constraints',
        difficulty: 'intermediate',
        tags: ['constraint', 'extends', 'keyof', 'conditional', 'bounded'],
        cheatSheetSummary: 'T extends X restricts what types T can be. keyof T constrains to valid property keys.',
        sections: [
          {
            heading: 'The extends Keyword in Generics',
            content:
              'The extends keyword constrains a type parameter to types that are assignable to a given type. This lets you access properties and methods on the constrained type without type errors. Without constraints, TypeScript treats the type parameter as unknown and prevents most operations. Constraints are the bridge between fully generic and fully concrete types.',
            code: `// Without constraint — very limited
function badLength<T>(item: T): number {
  // return item.length;  // Error: Property 'length' does not exist on type 'T'
  return 0;
}

// With constraint — T must have length
function getLength<T extends { length: number }>(item: T): number {
  return item.length;  // OK: T is guaranteed to have length
}

console.log(getLength('hello'));     // 5
console.log(getLength([1, 2, 3]));  // 3
console.log(getLength({ length: 42, extra: true })); // 42

// Constraint with another type parameter
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'Alice', age: 30, active: true };
console.log(getProperty(user, 'name'));    // type: string
console.log(getProperty(user, 'age'));     // type: number
// getProperty(user, 'missing');           // Error: not assignable to keyof`,
            output: `5
3
42
Alice
30`,
            tip: 'Use the minimal constraint necessary. Constraining to { length: number } is more flexible than constraining to string | Array<unknown> because it accepts any object with a length property.',
            codeHighlightLines: [2, 8, 17],
          },
          {
            heading: 'keyof and Index Constraints',
            content:
              'The keyof operator produces a union of all known property names of a type. Combined with generic constraints, it creates type-safe property access patterns. Indexed access types (T[K]) resolve to the type of a specific property, enabling functions that return the correct type based on which key is provided. This pattern is central to how TypeScript models dictionary-like access.',
            code: `// keyof produces a union of property names
interface Config {
  host: string;
  port: number;
  debug: boolean;
}

type ConfigKey = keyof Config;  // 'host' | 'port' | 'debug'

// Type-safe getter with correct return type
function getConfig<K extends keyof Config>(
  config: Config,
  key: K
): Config[K] {
  return config[key];
}

const cfg: Config = { host: 'localhost', port: 3000, debug: true };
const host = getConfig(cfg, 'host');     // type: string
const port = getConfig(cfg, 'port');     // type: number
const debug = getConfig(cfg, 'debug');   // type: boolean
console.log(host, port, debug);

// Pick specific keys from an object
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}

const partial = pick(cfg, ['host', 'port']);
console.log(partial);`,
            output: `localhost 3000 true
{ host: 'localhost', port: 3000 }`,
            note: 'The return type Config[K] is an indexed access type. When K is "port", Config["port"] resolves to number, giving you precise return types.',
            analogy: 'Think of it like a filing cabinet where each drawer is labeled. keyof gives you the set of labels, and T[K] opens the specific drawer to reveal what is inside. You can only open drawers that actually exist.',
            codeHighlightLines: [8, 11, 12, 13, 14],
          },
          {
            heading: 'Multiple and Conditional Constraints',
            content:
              'TypeScript supports multiple constraints through intersection types and conditional type patterns. You can require a type parameter to satisfy multiple interfaces simultaneously. Conditional types within constraints enable more advanced patterns where the constraint itself depends on another type parameter. These techniques are common in utility library types.',
            code: `// Multiple constraints via intersection
interface Serializable {
  serialize(): string;
}

interface Loggable {
  log(): void;
}

function process<T extends Serializable & Loggable>(item: T): string {
  item.log();
  return item.serialize();
}

const obj = {
  data: 'test',
  serialize() { return JSON.stringify(this.data); },
  log() { console.log('Processing:', this.data); },
};

console.log(process(obj));

// Constructor constraint — T must be newable
type Constructor<T = object> = new (...args: unknown[]) => T;

function createInstance<T>(Ctor: Constructor<T>): T {
  return new Ctor();
}

class Foo {
  value = 42;
}

const foo = createInstance(Foo);
console.log(foo.value);

// Constraining to function types
function applyTwice<T, R>(fn: (arg: T) => R, value: T): [R, R] {
  return [fn(value), fn(value)];
}

const doubled = applyTwice((n: number) => n * 2, 5);
console.log(doubled);`,
            output: `Processing: test
"test"
42
[10, 10]`,
            warning: 'Avoid overly complex constraints. If a constraint requires more than two or three intersections, consider defining a named interface that combines the requirements.',
            diagram: {
              kind: 'mermaid' as const,
              code: `graph LR
    S["Serializable"] --- I["T extends Serializable & Loggable"]
    L["Loggable"] --- I
    I -->|"allows"| P["process(item)"]
    style I fill:#e8f5e9,stroke:#2e7d32`,
              caption: 'Multiple constraints require T to satisfy both Serializable AND Loggable via intersection',
            },
          },
        ],
        quiz: [
          {
            question: 'Why would you use T extends { length: number } instead of T extends string | Array<unknown>?',
            options: [
              'It is faster at runtime',
              'It is more restrictive and only allows strings',
              'It is more flexible — it accepts any type with a length property, not just strings and arrays',
              'It has no practical difference',
            ],
            correctIndex: 2,
            explanation: 'Constraining to { length: number } accepts any object with a length property (strings, arrays, typed arrays, custom objects), while string | Array<unknown> only accepts those two specific types.',
          },
          {
            question: 'What does the function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] return?',
            options: [
              'Always returns string',
              'Returns the type of the specific property accessed by key K',
              'Returns T regardless of K',
              'Returns keyof T',
            ],
            correctIndex: 1,
            explanation: 'T[K] is an indexed access type that resolves to the type of property K on type T. If K is "name" and T has name: string, then T[K] resolves to string.',
          },
          {
            question: 'What does the type Constructor<T = object> = new (...args: unknown[]) => T represent?',
            options: [
              'A function that returns a promise of T',
              'A type for any callable function',
              'A type for a class constructor that creates instances of T',
              'A type for static methods only',
            ],
            correctIndex: 2,
            explanation: 'The new keyword in the type signature indicates this is a constructor type. It represents any class or constructor function that can be called with new to create an instance of T.',
          },
          {
            question: 'When using multiple constraints like T extends Serializable & Loggable, what must T satisfy?',
            options: [
              'Either Serializable or Loggable',
              'Both Serializable and Loggable simultaneously',
              'Only Serializable',
              'Neither — the intersection makes them cancel out',
            ],
            correctIndex: 1,
            explanation: 'The intersection & requires T to satisfy both Serializable AND Loggable. The type must have all methods and properties from both interfaces.',
          },
        ],
        challenge: {
          prompt: 'Write a generic function called pluck that takes an array of objects and a key, and returns an array of values for that key. Use constraints to ensure the key is valid for the object type. Example: pluck([{name: "Alice", age: 30}, {name: "Bob", age: 25}], "name") returns ["Alice", "Bob"].',
          starterCode: `// Write your generic pluck function
function pluck</* type params */>(/* params */): /* return type */ {
  // Implementation
}

// Test cases
const people = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
];

console.log(pluck(people, 'name'));  // ['Alice', 'Bob', 'Charlie']
console.log(pluck(people, 'age'));   // [30, 25, 35]`,
          solutionCode: `function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map(item => item[key]);
}

const people = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
];

console.log(pluck(people, 'name'));  // ['Alice', 'Bob', 'Charlie']
console.log(pluck(people, 'age'));   // [30, 25, 35]`,
          hints: [
            'You need two type parameters: T for the object type and K for the key type.',
            'Use K extends keyof T to constrain K to valid property names of T.',
            'The return type is T[K][] — an array of the property value types.',
          ],
        },
      },
    ],
  },
  /* ------------------------------------------------------------ */
  /*  Advanced Types                                               */
  /* ------------------------------------------------------------ */
  {
    id: 'ts-advanced-types',
    label: 'Advanced Types',
    icon: 'Zap',
    entries: [
      {
        id: 'conditional-types',
        title: 'Conditional Types',
        difficulty: 'advanced',
        tags: ['conditional', 'extends', 'infer', 'distributive', 'type-level'],
        cheatSheetSummary: 'T extends U ? X : Y — type-level if/else. Use infer to extract types.',
        sections: [
          {
            heading: 'Basic Conditional Types',
            content:
              'Conditional types select one of two types based on a condition, using the syntax T extends U ? X : Y. They act as if/else at the type level. If T is assignable to U, the type resolves to X; otherwise Y. This is the foundation of many built-in utility types like Extract, Exclude, and NonNullable. Conditional types become truly powerful when combined with generics.',
            code: `// Basic conditional type
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;    // true
type B = IsString<number>;    // false
type C = IsString<'hello'>;   // true (literal extends string)

// Practical: unwrap Promise type
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type D = UnwrapPromise<Promise<string>>;  // string
type E = UnwrapPromise<Promise<number>>;  // number
type F = UnwrapPromise<boolean>;          // boolean (not a Promise)

// Nested conditional
type TypeName<T> =
  T extends string ? 'string' :
  T extends number ? 'number' :
  T extends boolean ? 'boolean' :
  T extends Function ? 'function' :
  'object';

type T1 = TypeName<string>;       // 'string'
type T2 = TypeName<() => void>;   // 'function'
type T3 = TypeName<number[]>;     // 'object'

console.log('Conditional types resolve at compile time');`,
            output: `Conditional types resolve at compile time`,
            tip: 'Conditional types are evaluated at compile time and produce zero runtime overhead. They exist purely in the type system.',
            analogy: 'Think of it like a mail sorting machine: each letter (type) passes through a checkpoint. If the letter fits the "string" slot, it goes into the "true" bin; otherwise it goes into the "false" bin. Nested conditionals are just multiple sorting stages in sequence.',
            codeHighlightLines: [2, 9, 16, 17, 18, 19, 20],
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart TD
    A["T"] -->|"T extends string?"| B{Yes / No}
    B -->|Yes| C["true"]
    B -->|No| D["false"]
    E["IsString&lt;string&gt;"] --> C
    F["IsString&lt;number&gt;"] --> D
    style C fill:#e8f5e9,stroke:#2e7d32
    style D fill:#fce4ec,stroke:#c62828`,
              caption: 'Conditional type IsString<T> acts as a type-level if/else branch',
            },
          },
          {
            heading: 'The infer Keyword',
            content:
              'The infer keyword declares a type variable within a conditional type that TypeScript will try to infer from the checked type. It can only appear in the extends clause of a conditional type. This is how you extract types from complex structures like function return types, Promise contents, and array elements. Many built-in utility types like ReturnType and Parameters use infer internally.',
            code: `// Extract function return type
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type R1 = MyReturnType<() => string>;         // string
type R2 = MyReturnType<(x: number) => boolean>; // boolean

// Extract function parameters
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;

type P1 = MyParameters<(a: string, b: number) => void>;  // [string, number]

// Extract array element type
type ElementType<T> = T extends (infer E)[] ? E : T;

type El1 = ElementType<string[]>;   // string
type El2 = ElementType<number>;     // number (not an array)

// Extract Promise inner type (recursive)
type DeepUnwrap<T> = T extends Promise<infer U> ? DeepUnwrap<U> : T;

type DU1 = DeepUnwrap<Promise<Promise<string>>>;  // string
type DU2 = DeepUnwrap<Promise<number>>;            // number

// Infer in template literal types
type ExtractRouteParam<T> = T extends \`\${string}:\${infer Param}/\${infer Rest}\`
  ? Param | ExtractRouteParam<Rest>
  : T extends \`\${string}:\${infer Param}\`
    ? Param
    : never;

type Params = ExtractRouteParam<'/users/:userId/posts/:postId'>;
// type: 'userId' | 'postId'

console.log('infer extracts types from structures');`,
            output: `infer extracts types from structures`,
            note: 'The infer keyword only works inside the extends clause of a conditional type. You cannot use it in other positions.',
            analogy: 'Think of it like an X-ray machine for types: infer scans through the outer structure (a Promise, a function, an array) and extracts the hidden inner type, like seeing what is inside a wrapped gift without opening it.',
            codeHighlightLines: [2, 8, 13, 19],
          },
          {
            heading: 'Distributive Conditional Types',
            content:
              'When a conditional type acts on a union type, it distributes over each member of the union individually. This means T extends U ? X : Y applied to A | B | C becomes (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y). This distribution is automatic when T is a naked type parameter. You can prevent distribution by wrapping the type in a tuple.',
            code: `// Distributive behavior with union
type ToArray<T> = T extends unknown ? T[] : never;

// Distributes over union: string[] | number[]
type Distributed = ToArray<string | number>;

// Prevent distribution with tuple wrapping
type ToArrayNonDist<T> = [T] extends [unknown] ? T[] : never;

// Does NOT distribute: (string | number)[]
type NonDistributed = ToArrayNonDist<string | number>;

// Built-in Exclude uses distribution
type MyExclude<T, U> = T extends U ? never : T;

type Remaining = MyExclude<'a' | 'b' | 'c', 'a' | 'c'>;  // 'b'

// Built-in Extract uses distribution
type MyExtract<T, U> = T extends U ? T : never;

type Strings = MyExtract<string | number | boolean, string | boolean>;
// string | boolean

// NonNullable via distribution
type MyNonNullable<T> = T extends null | undefined ? never : T;

type Safe = MyNonNullable<string | null | undefined>;  // string

console.log('Distributive types process each union member separately');`,
            output: `Distributive types process each union member separately`,
            warning: 'Distribution can cause surprising results. If you want to check a union as a whole rather than distributing, wrap both sides in tuples: [T] extends [U] ? X : Y.',
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart LR
    U["string | number"] -->|distribute| S["string extends unknown?"]
    U -->|distribute| N["number extends unknown?"]
    S -->|"Yes → string[]"| R["string[] | number[]"]
    N -->|"Yes → number[]"| R
    U2["string | number"] -->|"[T] wrap"| W["[string|number] extends [unknown]?"]
    W -->|"Yes"| R2["(string|number)[]"]
    style R fill:#e3f2fd,stroke:#1565c0
    style R2 fill:#fff3e0,stroke:#e65100`,
              caption: 'Distributed vs non-distributed conditional types produce different results for unions',
            },
          },
        ],
        quiz: [
          {
            question: 'What does the type IsString<number> resolve to given type IsString<T> = T extends string ? true : false?',
            options: [
              'true',
              'false',
              'never',
              'boolean',
            ],
            correctIndex: 1,
            explanation: 'Since number does not extend string, the conditional type resolves to the false branch, producing the literal type false.',
          },
          {
            question: 'What does the infer keyword do in T extends Promise<infer U> ? U : T?',
            options: [
              'It creates a new type variable U that defaults to unknown',
              'It declares U as a type alias for T',
              'It asks TypeScript to infer and capture the inner type of the Promise into U',
              'It constrains U to be a subtype of Promise',
            ],
            correctIndex: 2,
            explanation: 'The infer keyword declares a type variable U that TypeScript will try to fill in by matching the structure of T against Promise<U>. If T is Promise<string>, then U is inferred as string.',
          },
          {
            question: 'What is distributive behavior in conditional types?',
            options: [
              'The conditional type is applied once to the entire union',
              'The conditional type is applied separately to each member of a union and the results are combined',
              'The conditional type randomly picks one member from the union',
              'The conditional type converts the union to an intersection',
            ],
            correctIndex: 1,
            explanation: 'When a conditional type acts on a naked type parameter that is a union, it distributes: each member is checked individually and the results are unioned together. ToArray<string | number> becomes string[] | number[].',
          },
          {
            question: 'How can you prevent distributive behavior in a conditional type?',
            options: [
              'Use the nondistributive keyword',
              'Wrap both sides in tuples: [T] extends [U] ? X : Y',
              'Use the as keyword instead of extends',
              'Add a void constraint to the type parameter',
            ],
            correctIndex: 1,
            explanation: 'Wrapping the type parameter in a tuple [T] prevents distribution because T is no longer a "naked" type parameter. The conditional checks the tuple as a whole rather than distributing over union members.',
          },
        ],
        challenge: {
          prompt: 'Create a conditional utility type called Flatten<T> that: if T is an array, extracts the element type; if T is a Promise, extracts the resolved type; otherwise returns T unchanged. Test it with various types.',
          starterCode: `// Define the Flatten type
type Flatten<T> = // your conditional type here

// Test cases - these should all compile without errors
type A = Flatten<string[]>;           // should be string
type B = Flatten<Promise<number>>;    // should be number
type C = Flatten<boolean>;            // should be boolean
type D = Flatten<number[][]>;         // should be number[] (one level)

// Runtime verification
const a: A = 'hello';
const b: B = 42;
const c: C = true;
const d: D = [1, 2, 3];
console.log(a, b, c, d);`,
          solutionCode: `type Flatten<T> =
  T extends (infer E)[]
    ? E
    : T extends Promise<infer R>
      ? R
      : T;

type A = Flatten<string[]>;           // string
type B = Flatten<Promise<number>>;    // number
type C = Flatten<boolean>;            // boolean
type D = Flatten<number[][]>;         // number[]

const a: A = 'hello';
const b: B = 42;
const c: C = true;
const d: D = [1, 2, 3];
console.log(a, b, c, d);`,
          hints: [
            'Use nested conditional types: first check if T extends an array, then check if T extends a Promise.',
            'Use infer to capture the element type of the array: T extends (infer E)[].',
            'Use infer to capture the resolved type of the Promise: T extends Promise<infer R>.',
          ],
        },
      },
      {
        id: 'mapped-types',
        title: 'Mapped Types',
        difficulty: 'advanced',
        tags: ['mapped', 'keyof', 'readonly', 'optional', 'remapping', 'as'],
        cheatSheetSummary: '{ [K in keyof T]: ... } — transform every property in a type systematically.',
        sections: [
          {
            heading: 'Basic Mapped Types',
            content:
              'Mapped types iterate over the keys of a type and produce a new type by transforming each property. The syntax { [K in keyof T]: NewType } creates a new type with the same keys as T but with transformed value types. Built-in utility types like Partial, Required, Readonly, and Record are all mapped types. They are essential for creating type transformations without repetition.',
            code: `// Make all properties optional (like built-in Partial)
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

// Make all properties required (like built-in Required)
type MyRequired<T> = {
  [K in keyof T]-?: T[K];  // -? removes optionality
};

// Make all properties readonly
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

interface User {
  name: string;
  age: number;
  email?: string;
}

type PartialUser = MyPartial<User>;
// { name?: string; age?: number; email?: string }

type RequiredUser = MyRequired<User>;
// { name: string; age: number; email: string }

type ReadonlyUser = MyReadonly<User>;
// { readonly name: string; readonly age: number; readonly email?: string }

// Transform value types
type Stringify<T> = {
  [K in keyof T]: string;
};

type StringUser = Stringify<User>;
// { name: string; age: string; email: string }

const su: StringUser = { name: 'Alice', age: '30', email: 'a@b.com' };
console.log(su.name, su.age);`,
            output: `Alice 30`,
            tip: 'Use -? to remove optional modifiers and -readonly to remove readonly modifiers. These are the only two modifiers you can add or remove in mapped types.',
            analogy: 'Think of it like a cookie cutter applied to every property: the mapped type stamps the same transformation onto each key, turning a whole object type at once, just like a cookie cutter shapes every piece of dough identically.',
          },
          {
            heading: 'Mapped Types with Value Transformation',
            content:
              'Mapped types can transform value types using conditional types, indexed access, and other type operators. This enables powerful patterns like making all properties nullable, wrapping values in Promises, or creating getter/setter interfaces from plain objects. Combining mapped types with conditional types lets you selectively transform properties based on their original type.',
            code: `// Nullable: make every property T | null
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

interface Config {
  host: string;
  port: number;
  debug: boolean;
}

type NullableConfig = Nullable<Config>;
const cfg: NullableConfig = { host: 'localhost', port: null, debug: true };
console.log(cfg);

// Wrap each property in a getter function
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type ConfigGetters = Getters<Config>;
// { getHost: () => string; getPort: () => number; getDebug: () => boolean }

// Pick only properties of a certain type
type PickByType<T, ValueType> = {
  [K in keyof T as T[K] extends ValueType ? K : never]: T[K];
};

type StringProps = PickByType<Config, string>;
// { host: string }

type NumericProps = PickByType<Config, number>;
// { port: number }

console.log('Mapped types transform properties systematically');`,
            output: `{ host: 'localhost', port: null, debug: true }
Mapped types transform properties systematically`,
            note: 'The as clause in mapped types (introduced in TS 4.1) lets you remap keys. Use never to filter out keys or template literals to rename them.',
            codeHighlightLines: [2, 3, 18, 26, 27],
          },
          {
            heading: 'Key Remapping with as',
            content:
              'TypeScript 4.1 introduced key remapping in mapped types using the as clause. This lets you transform or filter property keys during mapping. You can rename keys using template literal types, filter keys by mapping them to never, or compute entirely new key names based on the original. Key remapping is what makes utility types like prefixed event handlers and fluent builder types possible.',
            code: `// Prefix all keys
type Prefixed<T, P extends string> = {
  [K in keyof T as \`\${P}_\${string & K}\`]: T[K];
};

interface Actions {
  click: () => void;
  hover: () => void;
}

type OnActions = Prefixed<Actions, 'on'>;
// { on_click: () => void; on_hover: () => void }

// Remove specific keys (filter)
type OmitByName<T, Names extends string> = {
  [K in keyof T as K extends Names ? never : K]: T[K];
};

interface Full {
  id: number;
  name: string;
  password: string;
  email: string;
}

type Safe = OmitByName<Full, 'password'>;
// { id: number; name: string; email: string }

// Create event handler map
type EventMap<T> = {
  [K in keyof T as \`on\${Capitalize<string & K>}Change\`]: (
    newValue: T[K],
    oldValue: T[K]
  ) => void;
};

interface FormData {
  name: string;
  age: number;
}

type FormEvents = EventMap<FormData>;
// { onNameChange: (n: string, o: string) => void;
//   onAgeChange: (n: number, o: number) => void }

console.log('Key remapping enables advanced type transformations');`,
            output: `Key remapping enables advanced type transformations`,
            tip: 'Key remapping with as is one of the most powerful features in TypeScript. Combine it with template literal types to create fully typed event systems and API layers.',
            analogy: 'Think of it like a mail forwarding service: the original key is the old address, and the as clause is the forwarding rule that rewrites it into a new address before delivery.',
          },
        ],
        quiz: [
          {
            question: 'What does the mapped type { [K in keyof T]?: T[K] } produce?',
            options: [
              'A type with all properties of T made required',
              'A type with all properties of T made optional',
              'A type with all properties of T made readonly',
              'A type with all properties of T removed',
            ],
            correctIndex: 1,
            explanation: 'The ? modifier after the key makes each property optional. This is exactly how the built-in Partial<T> utility type works.',
          },
          {
            question: 'What does -? do in a mapped type like { [K in keyof T]-?: T[K] }?',
            options: [
              'It makes properties optional',
              'It removes the optional modifier, making all properties required',
              'It deletes properties from the type',
              'It makes properties nullable',
            ],
            correctIndex: 1,
            explanation: 'The -? syntax removes the optional modifier from properties. This is how the built-in Required<T> utility type works, ensuring all properties must be provided.',
          },
          {
            question: 'What does the as clause do in { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] }?',
            options: [
              'It casts each value to a getter function',
              'It remaps (renames) each key using the template literal pattern',
              'It asserts that K is a string type',
              'It filters out non-string keys',
            ],
            correctIndex: 1,
            explanation: 'The as clause in mapped types remaps keys. Here each key K is transformed into a new key like "getName", "getAge", etc., using template literal types with Capitalize.',
          },
          {
            question: 'How do you filter out keys in a mapped type using key remapping?',
            options: [
              'Use the delete keyword in the as clause',
              'Set the value type to undefined',
              'Map the unwanted keys to never in the as clause',
              'Use the Omit utility type inside the mapped type',
            ],
            correctIndex: 2,
            explanation: 'When a key is remapped to never via the as clause, that property is excluded from the resulting type. This is how you can filter properties by name or type within a mapped type.',
          },
        ],
        challenge: {
          prompt: 'Create a mapped utility type called Mutable<T> that removes the readonly modifier from all properties. Then create a second type Optional<T, K> that makes only the specified keys optional while keeping the rest required.',
          starterCode: `// Remove readonly from all properties
type Mutable<T> = {
  // your mapped type here
};

// Make only specified keys optional
type Optional<T, K extends keyof T> = // your type here

// Test Mutable
interface ReadonlyUser {
  readonly name: string;
  readonly age: number;
  readonly email: string;
}

type MutableUser = Mutable<ReadonlyUser>;
const user: MutableUser = { name: 'Alice', age: 30, email: 'a@b.com' };
user.name = 'Bob'; // should be allowed
console.log(user.name);

// Test Optional
interface Config {
  host: string;
  port: number;
  debug: boolean;
}

type FlexConfig = Optional<Config, 'debug' | 'port'>;
const cfg: FlexConfig = { host: 'localhost' };
console.log(cfg);`,
          solutionCode: `type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface ReadonlyUser {
  readonly name: string;
  readonly age: number;
  readonly email: string;
}

type MutableUser = Mutable<ReadonlyUser>;
const user: MutableUser = { name: 'Alice', age: 30, email: 'a@b.com' };
user.name = 'Bob';
console.log(user.name);

interface Config {
  host: string;
  port: number;
  debug: boolean;
}

type FlexConfig = Optional<Config, 'debug' | 'port'>;
const cfg: FlexConfig = { host: 'localhost' };
console.log(cfg);`,
          hints: [
            'Use -readonly to remove the readonly modifier in mapped types.',
            'For Optional, combine Omit<T, K> with Partial<Pick<T, K>> using intersection &.',
            'Omit removes the specified keys, Pick selects them, and Partial makes them optional.',
          ],
        },
      },
      {
        id: 'template-literal-types',
        title: 'Template Literal Types',
        difficulty: 'advanced',
        tags: ['template-literal', 'string-manipulation', 'Uppercase', 'Lowercase', 'pattern'],
        cheatSheetSummary: '`${A}_${B}` at the type level. Combine with Uppercase/Lowercase for string transforms.',
        sections: [
          {
            heading: 'Template Literal Type Construction',
            content:
              'Template literal types use the same backtick syntax as JavaScript template literals but operate at the type level. They construct new string literal types by interpolating other types. When combined with union types, they produce the Cartesian product of all possible combinations. This enables fully typed string patterns for CSS properties, event names, API routes, and more.',
            code: `// Basic template literal type
type Greeting = \`Hello, \${string}\`;

const g1: Greeting = 'Hello, world';     // OK
const g2: Greeting = 'Hello, TypeScript'; // OK
// const g3: Greeting = 'Hi, world';      // Error

// Union expansion (Cartesian product)
type Color = 'red' | 'blue';
type Size = 'small' | 'large';

type ClassNames = \`\${Size}-\${Color}\`;
// 'small-red' | 'small-blue' | 'large-red' | 'large-blue'

const cls: ClassNames = 'small-red';  // OK
console.log(cls);

// Event names from property keys
type PropEventName<T> = {
  [K in keyof T as \`on\${Capitalize<string & K>}Change\`]: (val: T[K]) => void;
};

interface Settings {
  theme: string;
  volume: number;
}

type SettingsEvents = PropEventName<Settings>;
// { onThemeChange: (val: string) => void; onVolumeChange: (val: number) => void }

// HTTP methods and routes
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Route = '/users' | '/posts';
type Endpoint = \`\${Method} \${Route}\`;
// 'GET /users' | 'GET /posts' | 'POST /users' | ... (8 combinations)

console.log('Template literal types produce:', 'small-red');`,
            output: `small-red
Template literal types produce: small-red`,
            tip: 'Template literal types with unions produce the Cartesian product. Two unions of 3 and 4 members produce 12 string literal types automatically.',
            analogy: 'Think of it like a combination lock with multiple dials: each dial position represents a union member, and the lock produces every possible combination of dial settings as distinct string types.',
            codeHighlightLines: [2, 9, 10, 12, 32, 33, 34],
          },
          {
            heading: 'String Manipulation and Pattern Matching',
            content:
              'TypeScript provides built-in string manipulation types: Uppercase, Lowercase, Capitalize, and Uncapitalize. These transform string literal types at the type level. Combined with template literals and infer, they enable pattern matching on string types. You can extract parts of string types, validate formats, and build fully typed parsers — all at compile time with zero runtime cost.',
            code: `// Built-in string manipulation types
type Upper = Uppercase<'hello'>;        // 'HELLO'
type Lower = Lowercase<'HELLO'>;        // 'hello'
type Cap = Capitalize<'hello'>;         // 'Hello'
type Uncap = Uncapitalize<'Hello'>;     // 'hello'

// camelCase to SCREAMING_SNAKE_CASE (simplified)
type ScreamingSnake<S extends string> =
  S extends \`\${infer Head}\${infer Tail}\`
    ? Tail extends Uncapitalize<Tail>
      ? \`\${Uppercase<Head>}\${ScreamingSnake<Tail>}\`
      : \`\${Uppercase<Head>}_\${ScreamingSnake<Tail>}\`
    : S;

type Screamed = ScreamingSnake<'fontSize'>;  // 'FONT_SIZE'

// Pattern matching with infer
type ExtractDomain<T extends string> =
  T extends \`\${string}://\${infer Domain}/\${string}\`
    ? Domain
    : never;

type D = ExtractDomain<'https://example.com/path'>;  // 'example.com'

// Split string type
type Split<S extends string, D extends string> =
  S extends \`\${infer Head}\${D}\${infer Tail}\`
    ? [Head, ...Split<Tail, D>]
    : [S];

type Parts = Split<'a.b.c', '.'>;  // ['a', 'b', 'c']

console.log('String manipulation types work at compile time');`,
            output: `String manipulation types work at compile time`,
            note: 'Recursive template literal types can hit the TypeScript recursion limit for very long strings. Keep recursive type operations under about 50 levels of depth.',
            codeHighlightLines: [2, 3, 4, 5, 19, 20, 27, 28],
          },
        ],
        quiz: [
          {
            question: 'How many string literal types does `${Size}-${Color}` produce when Size = "small" | "large" and Color = "red" | "blue"?',
            options: [
              '2 types',
              '3 types',
              '4 types',
              '8 types',
            ],
            correctIndex: 2,
            explanation: 'Template literal types produce the Cartesian product of all union members. With 2 sizes and 2 colors, you get 2 x 2 = 4 combinations: "small-red", "small-blue", "large-red", "large-blue".',
          },
          {
            question: 'What does the built-in type Capitalize<"hello"> resolve to?',
            options: [
              '"HELLO"',
              '"Hello"',
              '"hello"',
              '"hELLO"',
            ],
            correctIndex: 1,
            explanation: 'Capitalize transforms only the first character to uppercase, producing "Hello". For full uppercase you would use Uppercase<"hello"> which produces "HELLO".',
          },
          {
            question: 'What does ExtractDomain<"https://example.com/path"> resolve to given type ExtractDomain<T> = T extends `${string}://${infer D}/${string}` ? D : never?',
            options: [
              '"https://example.com/path"',
              '"example.com"',
              '"path"',
              '"https"',
            ],
            correctIndex: 1,
            explanation: 'The template literal pattern matches the URL structure and infers "example.com" as the Domain portion between :// and the next /.',
          },
        ],
        challenge: {
          prompt: 'Create a utility type called CSSProperty<T> that generates valid CSS-like property strings. Given an object type with property names and value unions, produce a union of strings like "color: red" or "display: flex".',
          starterCode: `// Create a type that generates CSS-like property strings
type CSSProperty<T> = // your template literal type here

// Test
interface Styles {
  color: 'red' | 'blue' | 'green';
  display: 'flex' | 'block' | 'none';
}

type ValidCSS = CSSProperty<Styles>;
// Should be: "color: red" | "color: blue" | "color: green"
//          | "display: flex" | "display: block" | "display: none"

const css1: ValidCSS = 'color: red';
const css2: ValidCSS = 'display: flex';
console.log(css1, css2);`,
          solutionCode: `type CSSProperty<T> = {
  [K in keyof T]: \`\${string & K}: \${string & T[K]}\`;
}[keyof T];

interface Styles {
  color: 'red' | 'blue' | 'green';
  display: 'flex' | 'block' | 'none';
}

type ValidCSS = CSSProperty<Styles>;

const css1: ValidCSS = 'color: red';
const css2: ValidCSS = 'display: flex';
console.log(css1, css2);`,
          hints: [
            'Use a mapped type to iterate over keys, then index into it with [keyof T] to get a union of all values.',
            'The template literal `${string & K}: ${string & T[K]}` combines the key and value.',
            'The string & K intersection ensures K is treated as a string type for template literal interpolation.',
          ],
        },
      },
      {
        id: 'type-guards',
        title: 'Type Guards',
        difficulty: 'advanced',
        tags: ['type-guard', 'typeof', 'instanceof', 'in', 'is', 'asserts', 'narrowing'],
        cheatSheetSummary: 'Narrow types at runtime: typeof, instanceof, in, custom is/asserts predicates.',
        sections: [
          {
            heading: 'Built-in Type Guards',
            content:
              'Type guards are runtime checks that narrow a type within a conditional block. TypeScript understands typeof, instanceof, and the in operator as built-in type guards. After a type guard check, TypeScript automatically narrows the variable to a more specific type in the truthy branch. This is called control flow narrowing and is one of the most intuitive features of the type system.',
            code: `// typeof narrowing
function format(value: string | number | boolean): string {
  if (typeof value === 'string') {
    return value.toUpperCase();  // narrowed to string
  }
  if (typeof value === 'number') {
    return value.toFixed(2);     // narrowed to number
  }
  return value ? 'yes' : 'no';  // narrowed to boolean
}

console.log(format('hello'));
console.log(format(3.14159));
console.log(format(true));

// instanceof narrowing
class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

function handleError(err: Error | ApiError): string {
  if (err instanceof ApiError) {
    return \`HTTP \${err.statusCode}: \${err.message}\`;  // narrowed
  }
  return \`Error: \${err.message}\`;
}

console.log(handleError(new ApiError(404, 'Not Found')));
console.log(handleError(new Error('Unknown')));

// "in" narrowing
interface Dog { bark(): string; breed: string; }
interface Cat { meow(): string; color: string; }

function speak(animal: Dog | Cat): string {
  if ('bark' in animal) {
    return animal.bark();  // narrowed to Dog
  }
  return animal.meow();   // narrowed to Cat
}`,
            output: `HELLO
3.14
yes
HTTP 404: Not Found
Error: Unknown`,
            tip: 'TypeScript narrows types automatically after truthiness checks, equality checks, and type guard expressions. Always prefer narrowing over type assertions.',
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart TD
    V["value: string | number | boolean"] --> T1{"typeof === 'string'?"}
    T1 -->|Yes| S["string — .toUpperCase()"]
    T1 -->|No| T2{"typeof === 'number'?"}
    T2 -->|Yes| N["number — .toFixed()"]
    T2 -->|No| B["boolean — ternary"]
    style S fill:#e8f5e9,stroke:#2e7d32
    style N fill:#e3f2fd,stroke:#1565c0
    style B fill:#fff3e0,stroke:#e65100`,
              caption: 'Control flow narrowing: each typeof check eliminates one branch of the union',
            },
          },
          {
            heading: 'Custom Type Predicates',
            content:
              'Custom type predicates use the is keyword in a function return type to tell TypeScript that a boolean return narrows the parameter type. The syntax is paramName is Type. When the function returns true, TypeScript narrows the argument to the specified type. This is essential for complex checks that typeof and instanceof cannot handle, such as validating API responses or discriminating between similar object shapes.',
            code: `// Custom type predicate with "is"
interface Fish { swim(): void; species: string; }
interface Bird { fly(): void; species: string; }

function isFish(animal: Fish | Bird): animal is Fish {
  return 'swim' in animal;
}

function move(animal: Fish | Bird): string {
  if (isFish(animal)) {
    animal.swim();  // narrowed to Fish
    return \`\${animal.species} swims\`;
  }
  animal.fly();     // narrowed to Bird
  return \`\${animal.species} flies\`;
}

const fish: Fish = { swim() {}, species: 'Salmon' };
const bird: Bird = { fly() {}, species: 'Eagle' };
console.log(move(fish));
console.log(move(bird));

// Validate unknown data with type predicate
interface User {
  name: string;
  age: number;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'age' in value &&
    typeof (value as User).name === 'string' &&
    typeof (value as User).age === 'number'
  );
}

const data: unknown = JSON.parse('{"name":"Alice","age":30}');
if (isUser(data)) {
  console.log(\`User: \${data.name}, age \${data.age}\`);
}`,
            output: `Salmon swims
Eagle flies
User: Alice, age 30`,
            note: 'Type predicates shift the responsibility of correctness to you. If your predicate returns true for a value that does not actually match the type, TypeScript will trust it and you may get runtime errors.',
            analogy: 'Think of it like a customs officer with a checklist: the is predicate is the officer declaring "this passport belongs to a Fish." Once stamped, the system trusts that declaration for all downstream checks.',
            codeHighlightLines: [5, 29],
          },
          {
            heading: 'Assertion Functions',
            content:
              'Assertion functions use the asserts keyword to tell TypeScript that if the function returns normally (without throwing), a condition is guaranteed to be true. Unlike type predicates which return boolean, assertion functions throw on failure. After calling an assertion function, TypeScript narrows the type for all subsequent code in the same scope, not just inside an if block. This pattern is ideal for validation at the boundaries of your application.',
            code: `// Assertion function — narrows after the call
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error(\`Expected string, got \${typeof value}\`);
  }
}

function processInput(input: unknown): string {
  assertIsString(input);
  // After assertion, input is narrowed to string
  return input.toUpperCase();
}

console.log(processInput('hello'));

// Assert non-null
function assertDefined<T>(
  value: T | null | undefined,
  name: string
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(\`\${name} must be defined\`);
  }
}

function getUser(id: number): { name: string } | null {
  return id === 1 ? { name: 'Alice' } : null;
}

const user = getUser(1);
assertDefined(user, 'user');
// user is narrowed to { name: string } from here on
console.log(user.name);

// Assertion with condition
function assert(condition: unknown, msg: string): asserts condition {
  if (!condition) throw new Error(msg);
}

const val: string | number = 'test';
assert(typeof val === 'string', 'Must be string');
console.log(val.toUpperCase());  // narrowed to string`,
            output: `HELLO
Alice
TEST`,
            warning: 'Assertion functions must throw (not return false) when the condition fails. If you forget to throw, TypeScript still narrows the type, leading to potential runtime errors.',
            codeHighlightLines: [2, 19, 35],
          },
        ],
        quiz: [
          {
            question: 'What does TypeScript infer about a variable after a typeof value === "string" check inside an if block?',
            options: [
              'The variable is typed as any inside the block',
              'The variable is narrowed to the string type inside the truthy block',
              'The variable retains its original union type',
              'The variable is typed as unknown inside the block',
            ],
            correctIndex: 1,
            explanation: 'TypeScript uses control flow analysis to narrow the type. After a typeof === "string" check, the variable is narrowed to string within the truthy branch of the conditional.',
          },
          {
            question: 'What is the difference between a type predicate (is) and an assertion function (asserts)?',
            options: [
              'Type predicates return boolean and narrow in if blocks; assertion functions throw on failure and narrow all subsequent code',
              'Type predicates are for classes; assertion functions are for interfaces',
              'Type predicates work at compile time; assertion functions work at runtime only',
              'There is no difference; they are interchangeable',
            ],
            correctIndex: 0,
            explanation: 'A type predicate (param is Type) returns boolean and narrows inside if/else branches. An assertion function (asserts param is Type) throws if the condition fails and narrows the type for all code after the call.',
          },
          {
            question: 'What is the risk of an incorrect type predicate function?',
            options: [
              'TypeScript will catch the error at compile time',
              'The function will automatically throw at runtime',
              'TypeScript trusts the predicate and may allow unsafe operations if the predicate is wrong',
              'The function will return undefined instead of boolean',
            ],
            correctIndex: 2,
            explanation: 'TypeScript completely trusts the return type of a type predicate. If you write a predicate that returns true for values that do not match the stated type, TypeScript will narrow incorrectly and runtime errors may occur.',
          },
          {
            question: 'Which built-in operator checks if a property exists on an object for type narrowing?',
            options: [
              'typeof',
              'instanceof',
              'in',
              'keyof',
            ],
            correctIndex: 2,
            explanation: 'The in operator checks for property existence on an object at runtime. TypeScript recognizes "prop" in obj as a type guard and narrows the type accordingly. keyof is a type-level operator and does not work at runtime.',
          },
        ],
        challenge: {
          prompt: 'Create a type predicate function isNonEmpty that checks whether an array has at least one element, narrowing the type from T[] to [T, ...T[]]. Then write an assertion function assertNonEmpty that throws if the array is empty.',
          starterCode: `// Type predicate: narrows T[] to non-empty tuple
function isNonEmpty<T>(arr: T[]): /* return type predicate */ {
  // your code here
}

// Assertion function: throws if array is empty
function assertNonEmpty<T>(arr: T[]): /* assertion signature */ {
  // your code here
}

// Test type predicate
const nums: number[] = [1, 2, 3];
if (isNonEmpty(nums)) {
  const first: number = nums[0]; // should be safe
  console.log('First:', first);
}

// Test assertion function
const names: string[] = ['Alice', 'Bob'];
assertNonEmpty(names);
console.log('First name:', names[0]);`,
          solutionCode: `function isNonEmpty<T>(arr: T[]): arr is [T, ...T[]] {
  return arr.length > 0;
}

function assertNonEmpty<T>(arr: T[]): asserts arr is [T, ...T[]] {
  if (arr.length === 0) {
    throw new Error('Array must not be empty');
  }
}

const nums: number[] = [1, 2, 3];
if (isNonEmpty(nums)) {
  const first: number = nums[0];
  console.log('First:', first);
}

const names: string[] = ['Alice', 'Bob'];
assertNonEmpty(names);
console.log('First name:', names[0]);`,
          hints: [
            'The type predicate return type is: arr is [T, ...T[]].',
            'The assertion signature is: asserts arr is [T, ...T[]].',
            'The assertion function must throw an error when the condition fails, not return false.',
          ],
        },
      },
      {
        id: 'satisfies-operator',
        title: 'The satisfies Operator',
        difficulty: 'advanced',
        tags: ['satisfies', 'literal', 'type-checking', 'inference', 'TS4.9'],
        cheatSheetSummary: 'expr satisfies Type — validate a type without widening. Keeps literal types intact.',
        sections: [
          {
            heading: 'satisfies vs Type Annotation',
            content:
              'The satisfies operator (TypeScript 4.9+) validates that an expression matches a type without changing the inferred type. Unlike a type annotation (const x: Type = ...) which widens the type, satisfies preserves the specific literal types. This means you get both compile-time validation that the shape is correct and full autocompletion for the specific values. It solves the longstanding tension between type safety and type specificity.',
            code: `// Problem: type annotation widens the type
type Colors = Record<string, [number, number, number] | string>;

const colorsAnnotated: Colors = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255],
};
// colorsAnnotated.red is: string | [number, number, number]
// We lose the knowledge that red is specifically a tuple!

// Solution: satisfies preserves literal types
const colors = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255],
} satisfies Colors;

// colors.red is: [number, number, number]  (preserved!)
// colors.green is: string                   (preserved!)
console.log(colors.red[0]);         // OK: TypeScript knows it is a tuple
console.log(colors.green.toUpperCase()); // OK: TypeScript knows it is string

// Error detection still works:
// const bad = { red: true } satisfies Colors;
// Error: boolean is not assignable to [number, number, number] | string

console.log(colors.red);
console.log(colors.green);`,
            output: `255
#00FF00
[255, 0, 0]
#00ff00`,
            tip: 'Use satisfies when you want to validate the shape but keep the specific inferred type. Use a type annotation when you want to widen to the annotated type.',
            analogy: 'Think of it like a teacher checking homework: a type annotation says "rewrite your answer in my format," while satisfies says "I will check your answer is correct but let you keep your own handwriting."',
            codeHighlightLines: [4, 13, 17],
          },
          {
            heading: 'Practical Use Cases',
            content:
              'The satisfies operator shines in configuration objects, route definitions, theme constants, and any scenario where you need both type validation and literal type preservation. It is especially useful with as const for creating exhaustive, type-safe lookup objects. Before satisfies, you had to choose between safety (annotation) and specificity (no annotation). Now you can have both.',
            code: `// Type-safe configuration with specific values
interface AppConfig {
  apiUrl: string;
  retries: number;
  features: Record<string, boolean>;
}

const config = {
  apiUrl: 'https://api.example.com',
  retries: 3,
  features: {
    darkMode: true,
    notifications: false,
    beta: true,
  },
} satisfies AppConfig;

// config.apiUrl is 'https://api.example.com' (literal), not just string
// config.features.darkMode is boolean (validated key exists)
console.log(config.apiUrl);
console.log(config.features.darkMode);

// Route map with exhaustive checking
type Route = '/home' | '/about' | '/contact';

const routes = {
  '/home': { component: 'HomePage', auth: false },
  '/about': { component: 'AboutPage', auth: false },
  '/contact': { component: 'ContactPage', auth: true },
} satisfies Record<Route, { component: string; auth: boolean }>;

// TypeScript knows exact keys and values
console.log(routes['/home'].component);

// With as const + satisfies for maximum specificity
const palette = {
  primary: '#3b82f6',
  secondary: '#10b981',
  danger: '#ef4444',
} as const satisfies Record<string, string>;

// palette.primary is '#3b82f6' (exact literal), not string
console.log(palette.primary);`,
            output: `https://api.example.com
true
HomePage
#3b82f6`,
            note: 'Combine as const satisfies Type for the most specific types. as const makes values readonly literals, while satisfies validates the overall shape.',
          },
        ],
        quiz: [
          {
            question: 'What is the key difference between const x: Type = value and const x = value satisfies Type?',
            options: [
              'satisfies is slower at compile time',
              'Type annotation widens the type; satisfies validates while preserving the inferred literal type',
              'satisfies changes the runtime behavior of the value',
              'Type annotation only works with primitive types',
            ],
            correctIndex: 1,
            explanation: 'A type annotation (: Type) widens the variable to the annotated type, losing specific literal types. The satisfies operator validates the value matches the type while preserving the original inferred type.',
          },
          {
            question: 'Given const colors = { red: [255, 0, 0], green: "#00ff00" } satisfies Record<string, [number, number, number] | string>, what is the type of colors.red?',
            options: [
              'string | [number, number, number]',
              '[number, number, number]',
              'number[]',
              'unknown',
            ],
            correctIndex: 1,
            explanation: 'With satisfies, TypeScript validates the overall structure but preserves the specific inferred type for each property. Since red is assigned a three-element array, its type is preserved as [number, number, number].',
          },
          {
            question: 'What does as const satisfies Type do when combined?',
            options: [
              'It makes the value mutable and validates the type',
              'It makes all values readonly literals and validates the shape against Type',
              'It converts the value to a constant at runtime',
              'It is a syntax error in TypeScript',
            ],
            correctIndex: 1,
            explanation: 'Combining as const with satisfies gives you maximum specificity: as const makes all values deeply readonly with literal types, while satisfies validates that the overall shape conforms to the specified type.',
          },
        ],
        challenge: {
          prompt: 'Create a type-safe theme configuration using satisfies. Define a Theme type with required color properties (primary, secondary, danger as strings) and optional spacing properties (small, medium, large as numbers). Use satisfies to validate the theme while preserving literal types.',
          starterCode: `interface Theme {
  colors: {
    primary: string;
    secondary: string;
    danger: string;
  };
  spacing?: {
    small: number;
    medium: number;
    large: number;
  };
}

// Create a theme using satisfies to preserve literal types
const myTheme = {
  // fill in your theme values
} // add satisfies here

// These should work with specific literal types
console.log(myTheme.colors.primary);
console.log(myTheme.spacing?.small);`,
          solutionCode: `interface Theme {
  colors: {
    primary: string;
    secondary: string;
    danger: string;
  };
  spacing?: {
    small: number;
    medium: number;
    large: number;
  };
}

const myTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#10b981',
    danger: '#ef4444',
  },
  spacing: {
    small: 4,
    medium: 8,
    large: 16,
  },
} satisfies Theme;

// myTheme.colors.primary is '#3b82f6' (literal), not string
console.log(myTheme.colors.primary);
console.log(myTheme.spacing?.small);`,
          hints: [
            'Place satisfies Theme after the closing brace of the object literal.',
            'TypeScript will validate that your object matches the Theme interface while preserving exact literal types.',
            'Try adding an invalid property to see that satisfies catches type errors.',
          ],
        },
      },
      {
        id: 'const-assertions',
        title: 'const Assertions',
        difficulty: 'advanced',
        tags: ['const', 'as-const', 'readonly', 'literal', 'tuple', 'enum-like'],
        cheatSheetSummary: 'as const makes values deeply readonly with literal types. No widening.',
        sections: [
          {
            heading: 'as const Basics',
            content:
              'The as const assertion tells TypeScript to infer the narrowest possible type for a value. Strings become literal types instead of string, numbers become literal types instead of number, arrays become readonly tuples, and objects become deeply readonly with literal property types. This prevents type widening and is essential for creating truly immutable data structures at the type level.',
            code: `// Without as const — types are widened
const name1 = 'Alice';           // type: 'Alice' (already literal for const)
let name2 = 'Alice';             // type: string (widened for let)

// as const on a let prevents widening
// let name3 = 'Alice' as const; // type: 'Alice' (but still reassignable!)

// Arrays become readonly tuples
const point = [10, 20] as const;
// type: readonly [10, 20]  (not number[])
console.log(point[0]);  // type is 10, not number

// Objects become deeply readonly
const config = {
  api: 'https://api.example.com',
  port: 3000,
  features: ['auth', 'logging'],
} as const;
// type: {
//   readonly api: 'https://api.example.com';
//   readonly port: 3000;
//   readonly features: readonly ['auth', 'logging'];
// }

console.log(config.api);
console.log(config.port);
console.log(config.features);

// config.port = 4000;           // Error: readonly
// config.features.push('new');  // Error: readonly array

// Type extraction from const values
type Features = typeof config.features[number];
// 'auth' | 'logging'

console.log('as const preserves exact literal types');`,
            output: `10
https://api.example.com
3000
['auth', 'logging']
as const preserves exact literal types`,
            tip: 'Use as const for any value that should never change. It gives you the tightest possible type and communicates immutability intent to other developers.',
            analogy: 'Think of it like freezing food: as const deep-freezes the entire value so nothing can change. Without it, TypeScript treats values like fresh produce that might be swapped out for something else of the same general category.',
            codeHighlightLines: [9, 14, 15, 16, 17, 18, 33],
          },
          {
            heading: 'Enum-like Objects and Advanced Patterns',
            content:
              'The as const assertion is the recommended alternative to TypeScript enums. An as const object provides the same functionality as an enum but with better tree-shaking, no runtime code generation, and more flexibility. You can derive union types from the keys or values, use them in discriminated unions, and pass them to functions that expect literal types. This pattern is widely adopted in modern TypeScript codebases.',
            code: `// Enum-like object with as const
const Status = {
  Pending: 'PENDING',
  Active: 'ACTIVE',
  Inactive: 'INACTIVE',
} as const;

// Derive the union type from values
type StatusType = typeof Status[keyof typeof Status];
// 'PENDING' | 'ACTIVE' | 'INACTIVE'

function setStatus(status: StatusType): void {
  console.log('Status set to:', status);
}

setStatus(Status.Active);     // OK
setStatus('PENDING');          // OK (it is the same literal type)
// setStatus('UNKNOWN');       // Error: not in the union

// Derive union from keys
type StatusKey = keyof typeof Status;
// 'Pending' | 'Active' | 'Inactive'

// Readonly tuples for function arguments
function createPoint(...args: readonly [number, number, number?]) {
  const [x, y, z = 0] = args;
  return { x, y, z };
}

const coords = [1, 2, 3] as const;
const p = createPoint(...coords);
console.log(p);

// as const in discriminated unions
const actions = [
  { type: 'INCREMENT', payload: 1 },
  { type: 'DECREMENT', payload: 1 },
  { type: 'RESET' },
] as const;

type Action = typeof actions[number];
// Exact union of the three action shapes

console.log('Enum-like objects with as const are the modern pattern');`,
            output: `Status set to: ACTIVE
{ x: 1, y: 2, z: 3 }
Enum-like objects with as const are the modern pattern`,
            note: 'Prefer as const objects over TypeScript enums. They produce no extra runtime code, work with standard JavaScript tooling, and support tree-shaking in bundlers.',
            codeHighlightLines: [2, 3, 4, 5, 6, 9],
          },
        ],
        quiz: [
          {
            question: 'What is the type of const point = [10, 20] as const?',
            options: [
              'number[]',
              '[number, number]',
              'readonly [10, 20]',
              'readonly number[]',
            ],
            correctIndex: 2,
            explanation: 'With as const, the array becomes a readonly tuple with literal types. Each element retains its exact literal type (10 and 20), not the wider number type, and the array is marked readonly.',
          },
          {
            question: 'What does typeof Status[keyof typeof Status] produce when Status is defined as const with values "PENDING", "ACTIVE", "INACTIVE"?',
            options: [
              'string',
              '"PENDING" | "ACTIVE" | "INACTIVE"',
              '"Pending" | "Active" | "Inactive"',
              'unknown',
            ],
            correctIndex: 1,
            explanation: 'typeof Status gives the type of the object. keyof typeof Status gives the union of keys. Indexing with those keys produces the union of all value types, which are the literal string types because of as const.',
          },
          {
            question: 'Why are as const objects preferred over TypeScript enums in modern codebases?',
            options: [
              'They are faster at runtime',
              'They produce no extra runtime code, work with standard JavaScript tooling, and support tree-shaking',
              'They support numeric values while enums do not',
              'They are required by React and other frameworks',
            ],
            correctIndex: 1,
            explanation: 'TypeScript enums generate extra runtime JavaScript code. as const objects are plain JavaScript objects with no extra generated code, making them compatible with tree-shaking and standard tooling.',
          },
          {
            question: 'What happens when you try to modify a property on an object declared with as const?',
            options: [
              'The modification succeeds at runtime but TypeScript warns',
              'TypeScript produces a compile-time error because the property is readonly',
              'The value is silently ignored at runtime',
              'TypeScript converts the value to the readonly type automatically',
            ],
            correctIndex: 1,
            explanation: 'as const makes all properties deeply readonly. Any attempt to reassign a property results in a compile-time error: "Cannot assign to ... because it is a read-only property."',
          },
        ],
        challenge: {
          prompt: 'Create an enum-like object using as const for HTTP status codes. Include at least 5 common status codes (200, 201, 400, 404, 500). Derive a union type of all status codes and a union type of all status names. Write a function that takes a status code and returns the corresponding name.',
          starterCode: `// Create an enum-like object for HTTP status codes
const HttpStatus = {
  // Add status codes here
} as const;

// Derive the union type of all status code values
type StatusCode = // your type here

// Derive the union type of all status names (keys)
type StatusName = // your type here

// Write a function that returns the name for a given code
function getStatusName(code: StatusCode): StatusName {
  // your code here
}

// Test
console.log(getStatusName(200)); // 'OK'
console.log(getStatusName(404)); // 'NotFound'`,
          solutionCode: `const HttpStatus = {
  OK: 200,
  Created: 201,
  BadRequest: 400,
  NotFound: 404,
  InternalServerError: 500,
} as const;

type StatusCode = typeof HttpStatus[keyof typeof HttpStatus];
// 200 | 201 | 400 | 404 | 500

type StatusName = keyof typeof HttpStatus;
// 'OK' | 'Created' | 'BadRequest' | 'NotFound' | 'InternalServerError'

function getStatusName(code: StatusCode): StatusName {
  const entries = Object.entries(HttpStatus) as [StatusName, StatusCode][];
  const found = entries.find(([, value]) => value === code);
  if (!found) throw new Error(\`Unknown status code: \${code}\`);
  return found[0];
}

console.log(getStatusName(200)); // 'OK'
console.log(getStatusName(404)); // 'NotFound'`,
          hints: [
            'Use typeof HttpStatus to get the type of the object, then keyof to get the key union.',
            'Index with [keyof typeof HttpStatus] to get the union of all values.',
            'Use Object.entries to iterate and find the matching key for a given value.',
          ],
        },
      },
    ],
  },
];

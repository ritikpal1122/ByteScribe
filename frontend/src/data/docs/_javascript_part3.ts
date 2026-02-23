import type { DocCategory } from './types';

// Part 3: Objects & Classes + Modules & Async
export const JS_PART3_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Objects & Classes                                            */
  /* ------------------------------------------------------------ */
  {
    id: 'js-objects-classes',
    label: 'Objects & Classes',
    icon: 'Package',
    entries: [
      {
        id: 'objects',
        title: 'Objects',
        difficulty: 'beginner',
        tags: ['object', 'property', 'method', 'literal', 'key-value'],
        cheatSheetSummary: 'Key-value pairs. Access with dot or bracket notation. Mutable by default.',
        quiz: [
          {
            question: 'What is the correct way to check if an object has its own property (not inherited) in modern JavaScript?',
            options: [
              'obj.hasOwnProperty("key")',
              'Object.hasOwn(obj, "key")',
              '"key" in obj',
              'obj.key !== undefined',
            ],
            correctIndex: 1,
            explanation: 'Object.hasOwn(obj, key) is the modern, safe way to check for own properties. It works even on objects created with Object.create(null), unlike obj.hasOwnProperty(). The "in" operator also checks the prototype chain, and checking against undefined fails for properties explicitly set to undefined.',
          },
          {
            question: 'What does Object.freeze() do to an object?',
            options: [
              'Makes the object and all nested objects immutable',
              'Prevents adding new properties but allows modifying existing ones',
              'Makes the object shallowly immutable (nested objects can still be modified)',
              'Deletes all properties from the object',
            ],
            correctIndex: 2,
            explanation: 'Object.freeze() is a shallow operation. It prevents adding, removing, or modifying properties on the top level, but nested objects are still mutable. For deep immutability, you need to recursively freeze or use structuredClone() for deep copies.',
          },
          {
            question: 'What does Object.fromEntries(Object.entries(obj).filter(([k, v]) => v > 10)) do?',
            options: [
              'Throws an error because fromEntries does not accept filtered arrays',
              'Returns a new object with only the properties whose values are greater than 10',
              'Modifies the original object in place, removing properties with values <= 10',
              'Returns an array of key-value pairs where values are greater than 10',
            ],
            correctIndex: 1,
            explanation: 'Object.entries() converts an object to an array of [key, value] pairs. Filtering that array and passing the result to Object.fromEntries() creates a new object containing only the pairs that passed the filter. The original object is never modified.',
          },
          {
            question: 'What is the output of: const a = "x"; const obj = { [a]: 1, [a + "y"]: 2 }; console.log(Object.keys(obj));',
            options: [
              '["a", "ay"]',
              '["x", "xy"]',
              '["[a]", "[ay]"]',
              'SyntaxError: unexpected token',
            ],
            correctIndex: 1,
            explanation: 'Computed property names (using square brackets) evaluate the expression inside to determine the key. The variable a holds "x", so [a] becomes "x" and [a + "y"] becomes "xy". The keys are the computed string values, not the variable names.',
          },
        ],
        challenge: {
          prompt: 'Write a function `pick` that takes an object and an array of keys, and returns a new object containing only those keys that exist in the original object. Do not modify the original object.',
          starterCode: `function pick(obj, keys) {
  // TODO: Create a new object containing only the specified keys from obj
  // TODO: Only include keys that actually exist in the original object
  // TODO: Return the new object
}

// Test cases
const user = { name: 'Alice', age: 30, email: 'alice@example.com', role: 'admin' };
console.log(pick(user, ['name', 'email']));
// Expected: { name: 'Alice', email: 'alice@example.com' }
console.log(pick(user, ['name', 'phone']));
// Expected: { name: 'Alice' }
console.log(pick(user, []));
// Expected: {}`,
          solutionCode: `function pick(obj, keys) {
  return Object.fromEntries(
    keys.filter(key => Object.hasOwn(obj, key))
        .map(key => [key, obj[key]])
  );
}

// Test cases
const user = { name: 'Alice', age: 30, email: 'alice@example.com', role: 'admin' };
console.log(pick(user, ['name', 'email']));
// { name: 'Alice', email: 'alice@example.com' }
console.log(pick(user, ['name', 'phone']));
// { name: 'Alice' }
console.log(pick(user, []));
// {}`,
          hints: [
            'Use Object.fromEntries() to build an object from an array of [key, value] pairs.',
            'Filter the keys array to only include keys that exist in the original object using Object.hasOwn().',
            'Map each valid key to a [key, obj[key]] pair before passing to Object.fromEntries().',
          ],
        },
        sections: [
          {
            heading: 'Object Creation and Access',
            content:
              'Objects are the fundamental building block in JavaScript. A plain object is a collection of key-value pairs where keys are strings or symbols and values can be anything. Objects are created with literal syntax {}, the Object constructor, or Object.create(). Properties are accessed with dot notation or bracket notation, the latter being required for dynamic keys.',
            code: `// Object literal
const person = {
  name: 'Alice',
  age: 30,
  greet() {
    return \`Hi, I'm \${this.name}\`;
  },
};

// Dot notation
console.log(person.name);
console.log(person.greet());

// Bracket notation (for dynamic keys)
const key = 'age';
console.log(person[key]);

// Computed property names
const field = 'score';
const obj = { [field]: 100, [\`\${field}Max\`]: 200 };
console.log(obj);

// Shorthand property names
const x = 10, y = 20;
const point = { x, y }; // same as { x: x, y: y }
console.log(point);

// Check if key exists
console.log('name' in person);
console.log(Object.hasOwn(person, 'name'));`,
            output: `Alice
Hi, I'm Alice
30
{ score: 100, scoreMax: 200 }
{ x: 10, y: 20 }
true
true`,
            tip: 'Use Object.hasOwn(obj, key) instead of obj.hasOwnProperty(key). It is safer because it works on objects created with Object.create(null).',
            analogy: 'Think of it like a filing cabinet: each drawer (key) has a label, and inside is the document (value). Dot notation is opening a drawer by its label, bracket notation is looking up which drawer to open from a note.',
            codeHighlightLines: [2, 3, 4, 5, 6, 16, 17],
          },
          {
            heading: 'Modifying and Iterating Objects',
            content:
              'Objects are mutable by default. You can add, modify, and delete properties freely. Object.keys(), Object.values(), and Object.entries() provide arrays for iteration. Object.freeze() makes an object shallowly immutable. Object.assign() and spread syntax create shallow copies and merge objects.',
            code: `const config = { debug: false, port: 3000 };

// Adding and modifying
config.host = 'localhost';
config.debug = true;
console.log(config);

// Deleting
delete config.debug;
console.log(config);

// Iterating
for (const [key, val] of Object.entries(config)) {
  console.log(\`\${key}: \${val}\`);
}

// Merging objects
const defaults = { theme: 'dark', lang: 'en', debug: false };
const userPrefs = { lang: 'fr', fontSize: 16 };
const settings = { ...defaults, ...userPrefs };
console.log(settings);

// Freezing (shallow)
const frozen = Object.freeze({ x: 1, nested: { y: 2 } });
// frozen.x = 99; // silently fails (or TypeError in strict mode)
frozen.nested.y = 99; // works! Freeze is shallow
console.log(frozen.nested.y);`,
            output: `{ debug: true, port: 3000, host: 'localhost' }
{ port: 3000, host: 'localhost' }
port: 3000
host: localhost
{ theme: 'dark', lang: 'fr', debug: false, fontSize: 16 }
99`,
            tip: 'Object.freeze() is shallow. For deep immutability, use structuredClone() to create a deep copy, or use a library like Immer for immutable updates.',
            diagram: {
              kind: 'mermaid',
              code: `graph LR
  A["{ ...defaults }"] --> C["settings"]
  B["{ ...userPrefs }"] --> C
  C["{ theme: 'dark', lang: 'fr', debug: false, fontSize: 16 }"]
  style A fill:#4a9eff,color:#fff
  style B fill:#ff6b6b,color:#fff
  style C fill:#51cf66,color:#fff`,
              caption: 'Object spread merging: later properties overwrite earlier ones',
            },
            codeHighlightLines: [20, 21, 24, 26],
          },
          {
            heading: 'Object Utility Methods',
            content:
              'The Object class provides many useful static methods. Object.keys/values/entries convert objects to arrays for functional processing. Object.fromEntries converts arrays of pairs back to objects. Object.assign copies properties between objects. Object.defineProperty gives fine-grained control over property behavior.',
            code: `const scores = { alice: 95, bob: 87, charlie: 92 };

// Transform with entries + fromEntries
const curved = Object.fromEntries(
  Object.entries(scores).map(([name, score]) =>
    [name, Math.min(score + 5, 100)]
  )
);
console.log(curved);

// Filter object properties
const passing = Object.fromEntries(
  Object.entries(scores).filter(([, s]) => s >= 90)
);
console.log('Passing:', passing);

// Object.assign (shallow copy/merge)
const target = { a: 1 };
Object.assign(target, { b: 2 }, { c: 3 });
console.log(target);

// Property descriptors
const user = {};
Object.defineProperty(user, 'id', {
  value: 42,
  writable: false,
  enumerable: true,
});
console.log(user.id);
// user.id = 99; // TypeError in strict mode

// Object.keys only returns enumerable own properties
console.log(Object.keys(user));`,
            output: `{ alice: 100, bob: 92, charlie: 97 }
Passing: { alice: 95, charlie: 92 }
{ a: 1, b: 2, c: 3 }
42
['id']`,
            tip: 'Object.entries() + Object.fromEntries() is the object equivalent of array map/filter. It lets you transform and filter objects functionally.',
            diagram: {
              kind: 'mermaid',
              code: `graph LR
  A["Object"] -->|"Object.entries()"| B["[key, value] pairs"]
  B -->|".map() / .filter()"| C["Transformed pairs"]
  C -->|"Object.fromEntries()"| D["New Object"]
  style A fill:#4a9eff,color:#fff
  style B fill:#ffa94d,color:#fff
  style C fill:#ffa94d,color:#fff
  style D fill:#51cf66,color:#fff`,
              caption: 'The entries-transform-fromEntries pipeline for functional object manipulation',
            },
          },
        ],
      },
      {
        id: 'prototypes',
        title: 'Prototypes',
        difficulty: 'advanced',
        tags: ['prototype', 'chain', 'inheritance', '__proto__', 'Object.create'],
        cheatSheetSummary: 'Every object has a prototype chain. Properties are looked up the chain.',
        quiz: [
          {
            question: 'When you access a property on an object that does not exist on the object itself, what happens?',
            options: [
              'JavaScript throws a ReferenceError',
              'JavaScript returns null immediately',
              'JavaScript walks up the prototype chain looking for the property',
              'JavaScript creates the property with a value of undefined',
            ],
            correctIndex: 2,
            explanation: 'When a property is not found on the object itself, JavaScript follows the prototype chain (via [[Prototype]]) looking for the property on each ancestor. If it reaches null (the end of the chain) without finding it, undefined is returned. No error is thrown and no property is created.',
          },
          {
            question: 'Where are methods defined in a class declaration stored?',
            options: [
              'Directly on each instance of the class',
              'On the class constructor function itself',
              'On the prototype object of the class (ClassName.prototype)',
              'In a separate methods table managed by the JavaScript engine',
            ],
            correctIndex: 2,
            explanation: 'Class methods (non-static) are stored on ClassName.prototype. All instances share the same method via the prototype chain, rather than each instance having its own copy. This is memory-efficient. Static methods are stored on the constructor function itself.',
          },
          {
            question: 'What is the difference between "in" operator and hasOwnProperty() when checking for a property?',
            options: [
              'There is no difference; they behave identically',
              '"in" checks the entire prototype chain, while hasOwnProperty() only checks the object itself',
              '"in" only checks the object itself, while hasOwnProperty() checks the prototype chain',
              '"in" works only with string keys, while hasOwnProperty() works with symbols too',
            ],
            correctIndex: 1,
            explanation: 'The "in" operator returns true if the property exists anywhere in the prototype chain (own or inherited). hasOwnProperty() returns true only if the property is directly on the object itself, not inherited. For example, "toString" in {} is true, but {}.hasOwnProperty("toString") is false.',
          },
          {
            question: 'What does Object.create(null) produce?',
            options: [
              'An empty object with Object.prototype as its prototype',
              'null',
              'An object with no prototype (no inherited methods like toString)',
              'A TypeError because null is not a valid prototype',
            ],
            correctIndex: 2,
            explanation: 'Object.create(null) creates an object with absolutely no prototype. This means it does not inherit toString(), hasOwnProperty(), or any other Object.prototype methods. It is a truly empty object, often used as a dictionary/map to avoid prototype pollution.',
          },
        ],
        challenge: {
          prompt: 'Create a prototype chain using Object.create() that models a vehicle hierarchy: Vehicle -> Car -> ElectricCar. Each level should add its own method, and you should demonstrate prototype chain property lookup.',
          starterCode: `// TODO: Create a 'vehicle' base object with a 'describe' method
// that returns "I am a <type>" using this.type

// TODO: Create a 'car' object that inherits from vehicle
// Add a 'drive' method that returns "<type> is driving"
// Set type to 'car'

// TODO: Create an 'electricCar' object that inherits from car
// Add a 'charge' method that returns "<type> is charging"
// Set type to 'electric car'

// Test prototype chain lookup
// console.log(electricCar.describe());  // inherited from vehicle
// console.log(electricCar.drive());     // inherited from car
// console.log(electricCar.charge());    // own method
// console.log(vehicle.isPrototypeOf(electricCar)); // true`,
          solutionCode: `const vehicle = {
  type: 'vehicle',
  describe() {
    return \`I am a \${this.type}\`;
  },
};

const car = Object.create(vehicle);
car.type = 'car';
car.drive = function () {
  return \`\${this.type} is driving\`;
};

const electricCar = Object.create(car);
electricCar.type = 'electric car';
electricCar.charge = function () {
  return \`\${this.type} is charging\`;
};

// Test prototype chain lookup
console.log(electricCar.describe());  // "I am a electric car" (from vehicle)
console.log(electricCar.drive());     // "electric car is driving" (from car)
console.log(electricCar.charge());    // "electric car is charging" (own)
console.log(vehicle.isPrototypeOf(electricCar)); // true
console.log(car.isPrototypeOf(electricCar));     // true`,
          hints: [
            'Use Object.create(parentObj) to create a new object whose prototype is parentObj.',
            'Set properties directly on each object after creating it (e.g., car.type = "car").',
            'Methods using "this" will resolve to the calling object at runtime, even if the method is defined higher in the chain.',
          ],
        },
        sections: [
          {
            heading: 'The Prototype Chain',
            content:
              'Every JavaScript object has a hidden link to another object called its prototype. When you access a property that does not exist on the object, JavaScript walks up the prototype chain until it finds the property or reaches null. This is how inheritance works in JavaScript. Classes are syntactic sugar over this prototype mechanism.',
            code: `// Every object inherits from Object.prototype
const obj = { x: 1 };
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

// Prototype chain lookup
const parent = { greet() { return \`Hello from \${this.name}\`; } };
const child = Object.create(parent);
child.name = 'Alice';
console.log(child.greet()); // Found on prototype

// Verify property location
console.log(child.hasOwnProperty('name'));   // true (own)
console.log(child.hasOwnProperty('greet'));  // false (inherited)
console.log('greet' in child);               // true (found in chain)

// How class methods use prototypes
class Foo {
  bar() { return 42; }
}
const foo = new Foo();
console.log(foo.hasOwnProperty('bar'));           // false
console.log(Foo.prototype.hasOwnProperty('bar')); // true

// Chain: foo -> Foo.prototype -> Object.prototype -> null
console.log(Object.getPrototypeOf(foo) === Foo.prototype);`,
            output: `true
Hello from Alice
true
false
true
false
true
true`,
            tip: 'Avoid modifying built-in prototypes like Array.prototype. It can break libraries and is considered bad practice. The only exception is polyfilling missing features.',
            analogy: 'Think of it like a family tree of dictionaries: if you cannot find a word in your personal dictionary, you check your parent\'s dictionary, then your grandparent\'s, all the way up until you find it or run out of dictionaries.',
            diagram: {
              kind: 'mermaid',
              code: `graph TB
  A["foo (instance)"] -->|"__proto__"| B["Foo.prototype"]
  B -->|"__proto__"| C["Object.prototype"]
  C -->|"__proto__"| D["null"]
  A -.->|"own: (none)"| A
  B -.->|"own: bar()"| B
  C -.->|"own: toString(), hasOwnProperty()..."| C
  style A fill:#4a9eff,color:#fff
  style B fill:#ffa94d,color:#fff
  style C fill:#51cf66,color:#fff
  style D fill:#868e96,color:#fff`,
              caption: 'Prototype chain: property lookup walks from instance to null',
            },
            codeHighlightLines: [6, 7, 8, 12, 13, 14],
          },
          {
            heading: 'Creating Prototype Chains',
            content:
              'Object.create() creates a new object with a specified prototype, giving you direct control over the prototype chain. This is the mechanism that class extends uses under the hood. Understanding prototypes helps you debug inheritance issues and comprehend how JavaScript frameworks implement their object systems.',
            code: `// Object.create — explicit prototype chain
const animal = {
  type: 'animal',
  speak() {
    return \`\${this.name} makes a sound\`;
  },
};

const dog = Object.create(animal);
dog.name = 'Rex';
dog.bark = function() { return \`\${this.name} barks!\`; };

console.log(dog.speak()); // inherited from animal
console.log(dog.bark());  // own method
console.log(dog.type);    // inherited

// Multi-level chain
const puppy = Object.create(dog);
puppy.name = 'Max';
console.log(puppy.speak()); // from animal
console.log(puppy.bark());  // from dog

// Property shadowing
puppy.type = 'puppy'; // shadows animal.type
console.log(puppy.type);       // 'puppy' (own)
delete puppy.type;
console.log(puppy.type);       // 'animal' (inherited again)

// Checking the chain
console.log(animal.isPrototypeOf(dog));   // true
console.log(animal.isPrototypeOf(puppy)); // true
console.log(dog.isPrototypeOf(puppy));    // true`,
            output: `Rex makes a sound
Rex barks!
animal
Max makes a sound
Max barks!
puppy
animal
true
true
true`,
            tip: 'In modern code, use classes for inheritance instead of manual prototype manipulation. Classes provide cleaner syntax while using the same prototype mechanism.',
          },
        ],
      },
      {
        id: 'classes',
        title: 'Classes',
        difficulty: 'intermediate',
        tags: ['class', 'constructor', 'extends', 'super', 'static', 'private'],
        cheatSheetSummary: 'ES2015 class syntax over prototypes. extends for inheritance, # for private.',
        quiz: [
          {
            question: 'What happens if you forget to call super() in a subclass constructor before using "this"?',
            options: [
              'The code runs fine but "this" is undefined',
              'A ReferenceError is thrown',
              'The parent constructor is called automatically',
              'The subclass inherits default values from the parent',
            ],
            correctIndex: 1,
            explanation: 'In a subclass constructor, you must call super() before accessing "this". The super() call is what initializes "this" in the subclass context. If you try to access "this" before calling super(), JavaScript throws a ReferenceError: Must call super constructor in derived class before accessing "this".',
          },
          {
            question: 'What is the difference between a private field (#field) and a conventionally "private" field (_field)?',
            options: [
              'There is no difference; both are enforced at runtime',
              '#field is enforced at the language level and cannot be accessed outside the class; _field is just a naming convention with no enforcement',
              '_field provides stronger privacy than #field',
              '#field can be accessed through reflection while _field cannot',
            ],
            correctIndex: 1,
            explanation: 'Private fields with the # prefix are a language-level guarantee. Attempting to access #field outside the class results in a SyntaxError. The underscore prefix (_field) is merely a naming convention that signals intent but provides no actual access restriction -- the property is fully accessible from outside.',
          },
          {
            question: 'What does the static keyword do in a class?',
            options: [
              'Makes the method immutable and prevents overriding',
              'Makes the method available only on the class itself, not on instances',
              'Makes the method private to the module',
              'Makes the method callable without parentheses',
            ],
            correctIndex: 1,
            explanation: 'Static methods and properties belong to the class constructor itself, not to instances. You call them as ClassName.method(), not instance.method(). Static members are commonly used for utility functions, factory methods, or class-level state like counters.',
          },
          {
            question: 'In the mixin pattern `class User extends Timestamped(Serializable(Object))`, what is the prototype chain?',
            options: [
              'User -> Object -> Serializable -> Timestamped',
              'User -> Timestamped -> Serializable -> Object',
              'User -> Serializable -> Timestamped -> Object',
              'User -> Timestamped & Serializable -> Object',
            ],
            correctIndex: 1,
            explanation: 'Mixin functions wrap classes: Serializable(Object) creates a class extending Object, then Timestamped() wraps that. The chain goes User -> Timestamped(wrapper) -> Serializable(wrapper) -> Object. Each mixin creates a new anonymous class in the chain, so the lookup goes from most recent wrapper to the base.',
          },
        ],
        challenge: {
          prompt: 'Create a `Stack` class with private fields that implements push, pop, peek, isEmpty, and size. The internal storage should use a private array field (#items). Include proper error handling for popping/peeking an empty stack.',
          starterCode: `class Stack {
  // TODO: Declare a private field #items initialized to an empty array

  // TODO: push(value) - add value to the top of the stack

  // TODO: pop() - remove and return the top value, throw Error if empty

  // TODO: peek() - return the top value without removing it, throw Error if empty

  // TODO: isEmpty() - return true if stack has no elements

  // TODO: get size() - return the number of elements (use a getter)
}

// Test cases
const stack = new Stack();
console.log(stack.isEmpty());  // true
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.size);       // 3
console.log(stack.peek());     // 3
console.log(stack.pop());      // 3
console.log(stack.pop());      // 2
console.log(stack.size);       // 1
console.log(stack.isEmpty());  // false`,
          solutionCode: `class Stack {
  #items = [];

  push(value) {
    this.#items.push(value);
  }

  pop() {
    if (this.isEmpty()) throw new Error('Stack is empty');
    return this.#items.pop();
  }

  peek() {
    if (this.isEmpty()) throw new Error('Stack is empty');
    return this.#items[this.#items.length - 1];
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  get size() {
    return this.#items.length;
  }
}

// Test cases
const stack = new Stack();
console.log(stack.isEmpty());  // true
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.size);       // 3
console.log(stack.peek());     // 3
console.log(stack.pop());      // 3
console.log(stack.pop());      // 2
console.log(stack.size);       // 1
console.log(stack.isEmpty());  // false`,
          hints: [
            'Declare the private field with #items = []; at the top of the class body.',
            'Use Array.prototype.push() and Array.prototype.pop() internally -- they naturally operate on the end of the array which represents the top of the stack.',
            'For peek(), access the last element with this.#items[this.#items.length - 1] without removing it.',
          ],
        },
        sections: [
          {
            heading: 'Class Basics',
            content:
              'ES2015 classes provide a clean syntax for creating objects and implementing inheritance. Classes have constructors, instance methods, static methods, and getters/setters. The extends keyword implements inheritance, and super calls the parent class. While classes look like traditional OOP, they are syntactic sugar over JavaScript\'s prototype-based system.',
            code: `class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    return \`\${this.name} says \${this.sound}\`;
  }

  static compare(a, b) {
    return a.name.localeCompare(b.name);
  }

  get info() {
    return \`\${this.name} (\${this.constructor.name})\`;
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name, 'Woof');
  }

  fetch(item) {
    return \`\${this.name} fetches the \${item}\`;
  }
}

const dog = new Dog('Rex');
console.log(dog.speak());
console.log(dog.fetch('ball'));
console.log(dog.info);
console.log(dog instanceof Dog);
console.log(dog instanceof Animal);`,
            output: `Rex says Woof
Rex fetches the ball
Rex (Dog)
true
true`,
            tip: 'Always call super() in a subclass constructor before accessing "this". Forgetting this throws a ReferenceError.',
            analogy: 'Think of it like a blueprint for a house: the class is the blueprint (Animal), and each instance (dog) is a house built from that blueprint. extends is like creating a specialized blueprint (Dog) that inherits all the features of the original and adds its own.',
            diagram: {
              kind: 'mermaid',
              code: `classDiagram
  class Animal {
    +name
    +sound
    +speak()
    +compare()$
    +info
  }
  class Dog {
    +fetch(item)
  }
  Animal <|-- Dog : extends
  Dog : constructor calls super()`,
              caption: 'Class inheritance: Dog extends Animal',
            },
            codeHighlightLines: [20, 21, 22],
          },
          {
            heading: 'Private Fields and Modern Features',
            content:
              'ES2022 introduced true private fields and methods using the # prefix. Unlike the underscore convention (_name), # fields are genuinely inaccessible outside the class. Modern classes also support public class fields, private static members, and static initialization blocks for complex setup logic.',
            code: `class BankAccount {
  // Public field
  owner;

  // Private fields (truly inaccessible outside)
  #balance = 0;
  #log = [];

  constructor(owner, initial) {
    this.owner = owner;
    this.#balance = initial;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error('Positive amounts only');
    this.#balance += amount;
    this.#record('deposit', amount);
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error('Insufficient funds');
    this.#balance -= amount;
    this.#record('withdrawal', amount);
  }

  // Private method
  #record(type, amount) {
    this.#log.push({ type, amount, date: new Date() });
  }

  get balance() {
    return this.#balance;
  }

  // Static private
  static #count = 0;
  static getCount() { return BankAccount.#count; }
}

const acct = new BankAccount('Alice', 1000);
acct.deposit(500);
acct.withdraw(200);
console.log(\`Balance: \${acct.balance}\`);
// console.log(acct.#balance); // SyntaxError!`,
            output: `Balance: 1300`,
            tip: 'Private fields (#) are a language-level guarantee, not a convention. TypeScript\'s "private" is only compile-time. The # prefix works at runtime in plain JS.',
            codeHighlightLines: [6, 7, 27, 28, 36],
          },
          {
            heading: 'Class Patterns',
            content:
              'Classes support useful patterns like mixins (sharing behavior across unrelated classes), the builder pattern (fluent method chaining), and abstract-like base classes (enforcing method implementation in subclasses). These patterns make classes more flexible while maintaining clean, organized code.',
            code: `// Mixin pattern — share behavior across classes
const Serializable = (Base) => class extends Base {
  toJSON() {
    return JSON.stringify(this);
  }
  static fromJSON(json) {
    return Object.assign(new this(), JSON.parse(json));
  }
};

const Timestamped = (Base) => class extends Base {
  constructor(...args) {
    super(...args);
    this.createdAt = new Date().toISOString();
  }
};

class User extends Timestamped(Serializable(Object)) {
  constructor(name) {
    super();
    this.name = name;
  }
}

const user = new User('Alice');
console.log(user.name);
console.log(user.createdAt ? 'has timestamp' : 'no timestamp');

// Builder pattern with method chaining
class QueryBuilder {
  #table = '';
  #conditions = [];
  #limit = null;

  from(table) { this.#table = table; return this; }
  where(condition) { this.#conditions.push(condition); return this; }
  limitTo(n) { this.#limit = n; return this; }

  build() {
    let q = \`SELECT * FROM \${this.#table}\`;
    if (this.#conditions.length) {
      q += ' WHERE ' + this.#conditions.join(' AND ');
    }
    if (this.#limit) q += \` LIMIT \${this.#limit}\`;
    return q;
  }
}

const query = new QueryBuilder()
  .from('users')
  .where('active = true')
  .where('age > 18')
  .limitTo(10)
  .build();
console.log(query);`,
            output: `Alice
has timestamp
SELECT * FROM users WHERE active = true AND age > 18 LIMIT 10`,
            tip: 'Mixins are a powerful alternative to deep inheritance chains. They let you compose behavior from multiple sources without the diamond problem.',
            analogy: 'Think of mixins like adding accessories to a car: the base car (class) rolls off the line, and mixins snap on extra capabilities like GPS (Serializable) and a dashcam (Timestamped), without redesigning the whole car.',
            diagram: {
              kind: 'mermaid',
              code: `graph BT
  O["Object"] --> S["Serializable(Object)"]
  S --> T["Timestamped(Serializable(Object))"]
  T --> U["User"]
  style O fill:#868e96,color:#fff
  style S fill:#4a9eff,color:#fff
  style T fill:#ffa94d,color:#fff
  style U fill:#51cf66,color:#fff`,
              caption: 'Mixin composition: each mixin wraps the previous class',
            },
          },
        ],
      },
      {
        id: 'destructuring',
        title: 'Destructuring',
        difficulty: 'beginner',
        tags: ['destructuring', 'unpack', 'extract', 'assignment', 'pattern'],
        cheatSheetSummary: 'Extract values from arrays/objects into variables: const { a, b } = obj;',
        quiz: [
          {
            question: 'What is the output of: const { a: x, b: y = 5 } = { a: 1 }; console.log(x, y);',
            options: [
              '1 5',
              'undefined 5',
              'a 5',
              '1 undefined',
            ],
            correctIndex: 0,
            explanation: 'In { a: x, b: y = 5 }, "a: x" means rename property "a" to variable "x" (so x = 1). "b: y = 5" means rename property "b" to variable "y" with a default of 5. Since "b" does not exist in the source object, y gets the default value 5. Result: x = 1, y = 5.',
          },
          {
            question: 'How do you swap two variables using destructuring?',
            options: [
              'const [a, b] = [b, a];',
              '[a, b] = [b, a];',
              'let { a, b } = { b, a };',
              'swap(a, b);',
            ],
            correctIndex: 1,
            explanation: 'The syntax [a, b] = [b, a] creates a temporary array [b, a] and then destructures it back into a and b. This works because the right-hand side is fully evaluated before the assignment happens. Note: the variables must already be declared (with let/var), so you use assignment without const/let.',
          },
          {
            question: 'What does this code do? function greet({ name = "World" } = {}) { return `Hello, ${name}!`; }',
            options: [
              'Always throws an error because the parameter syntax is invalid',
              'Destructures the argument with a default for "name", and defaults the entire parameter to {} if no argument is passed',
              'Creates a required parameter that must be an object with a name property',
              'Assigns "World" to the global variable name',
            ],
            correctIndex: 1,
            explanation: 'This uses two levels of defaults: the = {} provides a default empty object if no argument is passed at all (preventing a TypeError on destructuring undefined), and name = "World" provides a default for the name property if it is missing. So greet() returns "Hello, World!" and greet({name: "Alice"}) returns "Hello, Alice!".',
          },
          {
            question: 'What is the output of: const [a, , b, ...rest] = [1, 2, 3, 4, 5]; console.log(a, b, rest);',
            options: [
              '1 2 [3, 4, 5]',
              '1 3 [4, 5]',
              '1 undefined 3',
              'SyntaxError: unexpected token',
            ],
            correctIndex: 1,
            explanation: 'Array destructuring matches by position. "a" gets index 0 (1), the empty slot skips index 1 (2), "b" gets index 2 (3), and ...rest collects the remaining elements [4, 5]. The comma with no variable name between is how you skip elements.',
          },
        ],
        challenge: {
          prompt: 'Write a function `parseUrl` that takes a URL-like object and uses nested destructuring with defaults to extract and return its components. Handle missing properties gracefully.',
          starterCode: `function parseUrl(urlObj) {
  // TODO: Use nested destructuring to extract:
  //   - protocol (default: 'https')
  //   - host (default: 'localhost')
  //   - port (default: 443)
  //   - path from pathname (rename to 'path', default: '/')
  //   - first query parameter key and value (from params array, default: [])
  // TODO: Return an object with all extracted values

}

// Test cases
console.log(parseUrl({
  protocol: 'http',
  host: 'example.com',
  port: 8080,
  pathname: '/api/users',
  params: [['page', '1'], ['limit', '10']]
}));
// Expected: { protocol: 'http', host: 'example.com', port: 8080, path: '/api/users', firstParam: ['page', '1'] }

console.log(parseUrl({}));
// Expected: { protocol: 'https', host: 'localhost', port: 443, path: '/', firstParam: undefined }`,
          solutionCode: `function parseUrl(urlObj) {
  const {
    protocol = 'https',
    host = 'localhost',
    port = 443,
    pathname: path = '/',
    params = [],
  } = urlObj;

  const [firstParam] = params;

  return { protocol, host, port, path, firstParam };
}

// Test cases
console.log(parseUrl({
  protocol: 'http',
  host: 'example.com',
  port: 8080,
  pathname: '/api/users',
  params: [['page', '1'], ['limit', '10']]
}));
// { protocol: 'http', host: 'example.com', port: 8080, path: '/api/users', firstParam: ['page', '1'] }

console.log(parseUrl({}));
// { protocol: 'https', host: 'localhost', port: 443, path: '/', firstParam: undefined }`,
          hints: [
            'Use the syntax { propertyName: newName = defaultValue } to rename and provide a default in one destructuring expression.',
            'Destructure the params array separately with const [firstParam] = params to get the first element (or undefined if empty).',
            'Remember that destructuring defaults only apply when the value is undefined, not when it is null or other falsy values.',
          ],
        },
        sections: [
          {
            heading: 'Array Destructuring',
            content:
              'Destructuring is a concise syntax for extracting values from arrays and properties from objects into individual variables. Array destructuring matches by position. You can skip elements with empty slots, use rest syntax to collect remaining elements, and provide default values for missing elements.',
            code: `// Basic array destructuring
const [first, second, third] = [1, 2, 3];
console.log(first, second, third);

// Skip elements
const [, , thirdOnly] = ['a', 'b', 'c'];
console.log(thirdOnly); // 'c'

// Rest syntax
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Default values
const [a = 10, b = 20, c = 30] = [1, 2];
console.log(a, b, c); // 1 2 30

// Swap variables
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1

// From function return
function getCoords() { return [40.7, -74.0]; }
const [lat, lng] = getCoords();
console.log(\`Lat: \${lat}, Lng: \${lng}\`);`,
            output: `1 2 3
c
1
[2, 3, 4, 5]
1 2 30
2 1
Lat: 40.7, Lng: -74`,
            tip: 'Array destructuring works with any iterable, not just arrays. You can destructure strings, Maps, Sets, and generator results.',
            analogy: 'Think of it like opening a numbered locker row: you assign each locker\'s contents to a named variable by its position. Skip a locker by leaving a blank, or grab all remaining lockers with ...rest.',
            diagram: {
              kind: 'custom',
              type: 'array',
              data: { values: [1, 2, 3, 4, 5], highlightIndices: [0, 1, 2] },
              caption: 'Array destructuring picks values by index position',
            },
          },
          {
            heading: 'Object Destructuring',
            content:
              'Object destructuring matches by property name, not position. You can rename variables, provide defaults, destructure nested objects, and use it in function parameters for named arguments. Object destructuring in function parameters is extremely common in React and modern JavaScript.',
            code: `// Basic object destructuring
const { name, age, city = 'Unknown' } = {
  name: 'Alice', age: 30
};
console.log(name, age, city);

// Rename while destructuring
const { name: userName, age: userAge } = {
  name: 'Bob', age: 25
};
console.log(userName, userAge);

// Nested destructuring
const { address: { street, zip } } = {
  address: { street: '123 Main St', zip: '10001' }
};
console.log(street, zip);

// In function parameters (very common in React)
function createUser({ name, role = 'user', active = true }) {
  return { name, role, active };
}
console.log(createUser({ name: 'Alice' }));
console.log(createUser({ name: 'Bob', role: 'admin' }));

// Rest in object destructuring
const { id, ...rest } = { id: 1, name: 'Alice', age: 30 };
console.log(id);   // 1
console.log(rest);  // { name: 'Alice', age: 30 }`,
            output: `Alice 30 Unknown
Bob 25
123 Main St 10001
{ name: 'Alice', role: 'user', active: true }
{ name: 'Bob', role: 'admin', active: true }
1
{ name: 'Alice', age: 30 }`,
            tip: 'Destructuring in function parameters gives you named arguments with defaults, making function calls much more readable than positional arguments.',
            codeHighlightLines: [2, 3, 8, 9, 14, 15, 20],
          },
        ],
      },
      {
        id: 'spread-rest',
        title: 'Spread & Rest Operators',
        difficulty: 'beginner',
        tags: ['spread', 'rest', 'clone', 'merge', 'variadic'],
        cheatSheetSummary: '...spread expands elements; ...rest collects them. Shallow copies only.',
        quiz: [
          {
            question: 'What is the output of: const a = { x: 1, y: 2 }; const b = { y: 3, z: 4 }; console.log({ ...a, ...b });',
            options: [
              '{ x: 1, y: 2, z: 4 }',
              '{ x: 1, y: 3, z: 4 }',
              '{ x: 1, y: [2, 3], z: 4 }',
              'TypeError: cannot spread objects',
            ],
            correctIndex: 1,
            explanation: 'When spreading objects, later properties overwrite earlier ones with the same key. { ...a, ...b } first copies x: 1, y: 2 from a, then y: 3, z: 4 from b. Since b is spread second, its y: 3 overwrites a\'s y: 2. The result is { x: 1, y: 3, z: 4 }.',
          },
          {
            question: 'Is const clone = { ...original } a deep copy or a shallow copy?',
            options: [
              'Deep copy -- all nested objects are cloned recursively',
              'Shallow copy -- nested objects still reference the same memory',
              'It depends on whether the object has methods',
              'Neither -- it creates a frozen copy',
            ],
            correctIndex: 1,
            explanation: 'Object spread creates a shallow copy. Top-level primitive properties are copied by value, but nested objects and arrays are copied by reference. Modifying a nested object in the clone will also affect the original. For deep copies, use structuredClone().',
          },
          {
            question: 'What is the difference between spread and rest when both use the ... syntax?',
            options: [
              'There is no difference; they are the same operation',
              'Spread expands elements outward, rest collects elements inward; context determines which is used',
              'Spread is for arrays only, rest is for objects only',
              'Spread is used in function calls, rest is used in variable declarations',
            ],
            correctIndex: 1,
            explanation: 'Despite using the same ... syntax, spread and rest serve opposite purposes. Spread appears in array literals, object literals, and function calls to expand/unpack elements. Rest appears in function parameters and destructuring patterns to collect remaining elements into a single variable. The context determines which operation is performed.',
          },
          {
            question: 'How do you remove a property from an object immutably using rest?',
            options: [
              'delete obj.prop; return obj;',
              'const { prop, ...rest } = obj; // rest has everything except prop',
              'obj.prop = undefined; return obj;',
              'Object.remove(obj, "prop");',
            ],
            correctIndex: 1,
            explanation: 'Using object rest destructuring, const { prop, ...rest } = obj creates a new object "rest" that contains all properties except "prop". The original object is never modified. This is the idiomatic immutable way to remove a property, commonly used in Redux reducers and React state updates.',
          },
        ],
        challenge: {
          prompt: 'Write a function `mergeConfigs` that takes a default config object and any number of override objects, merging them left to right. Later values should override earlier ones. Return a new object without modifying any input.',
          starterCode: `function mergeConfigs(defaults, ...overrides) {
  // TODO: Merge defaults with all override objects
  // TODO: Later overrides should take precedence over earlier ones
  // TODO: Return a new object (do not modify inputs)
}

// Test cases
const defaults = { theme: 'dark', lang: 'en', debug: false, port: 3000 };
const env = { debug: true, port: 8080 };
const user = { lang: 'fr' };

console.log(mergeConfigs(defaults, env, user));
// Expected: { theme: 'dark', lang: 'fr', debug: true, port: 8080 }

console.log(mergeConfigs(defaults));
// Expected: { theme: 'dark', lang: 'en', debug: false, port: 3000 }

console.log(defaults);
// Expected: { theme: 'dark', lang: 'en', debug: false, port: 3000 } (unchanged)`,
          solutionCode: `function mergeConfigs(defaults, ...overrides) {
  return Object.assign({}, defaults, ...overrides);
  // Alternative: return { ...defaults, ...Object.assign({}, ...overrides) };
  // Or even simpler: return overrides.reduce((acc, obj) => ({ ...acc, ...obj }), { ...defaults });
}

// Test cases
const defaults = { theme: 'dark', lang: 'en', debug: false, port: 3000 };
const env = { debug: true, port: 8080 };
const user = { lang: 'fr' };

console.log(mergeConfigs(defaults, env, user));
// { theme: 'dark', lang: 'fr', debug: true, port: 8080 }

console.log(mergeConfigs(defaults));
// { theme: 'dark', lang: 'en', debug: false, port: 3000 }

console.log(defaults);
// { theme: 'dark', lang: 'en', debug: false, port: 3000 } (unchanged)`,
          hints: [
            'Use the spread operator (...) to merge objects: { ...obj1, ...obj2 } creates a new object where obj2 properties overwrite obj1.',
            'The ...overrides rest parameter gives you an array of all override objects. You need to spread each one.',
            'Object.assign({}, defaults, ...overrides) is another approach -- the empty {} ensures the original defaults object is not modified.',
          ],
        },
        sections: [
          {
            heading: 'Spread Operator',
            content:
              'The spread operator (...) expands an iterable into individual elements. In arrays, it copies elements. In objects, it copies properties. In function calls, it spreads array elements as arguments. Spread creates shallow copies, which is important for immutable update patterns used in React, Redux, and other state management libraries.',
            code: `// Spread in arrays
const arr1 = [1, 2, 3];
const arr2 = [0, ...arr1, 4];
console.log(arr2);

// Spread in objects (merge/clone)
const defaults = { theme: 'dark', lang: 'en' };
const prefs = { lang: 'fr' };
const settings = { ...defaults, ...prefs };
console.log(settings); // later spread wins

// Shallow clone
const original = { a: 1, nested: { b: 2 } };
const clone = { ...original };
clone.a = 99;         // does NOT affect original
clone.nested.b = 99;  // DOES affect original (shallow!)
console.log(original.a, original.nested.b);

// Spread in function calls
const nums = [5, 3, 8, 1];
console.log(Math.max(...nums));

// Spread strings
console.log([...'Hello']);

// Combine arrays
const all = [...[1, 2], ...[3, 4], ...[5]];
console.log(all);`,
            output: `[0, 1, 2, 3, 4]
{ theme: 'dark', lang: 'fr' }
1 99
8
['H', 'e', 'l', 'l', 'o']
[1, 2, 3, 4, 5]`,
            tip: 'Spread creates shallow copies. For deep copies, use structuredClone(obj). The JSON parse/stringify trick fails with functions, Dates, and undefined values.',
            analogy: 'Think of it like unpacking a suitcase: ...spread opens the suitcase and lays out all items individually so they can be placed into a new container one by one.',
          },
          {
            heading: 'Rest Operator',
            content:
              'The rest operator (...) collects remaining elements into an array or object. In function parameters, it gathers extra arguments. In destructuring, it captures remaining elements. Rest must always be the last element in its context. Despite using the same ... syntax, rest and spread serve opposite purposes.',
            code: `// Rest in function parameters
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4));

// Rest after named parameters
function log(level, ...messages) {
  console.log(\`[\${level}]\`, messages.join(' '));
}
log('INFO', 'Server', 'started', 'on', 'port', '3000');

// Rest in array destructuring
const [first, second, ...others] = [1, 2, 3, 4, 5];
console.log(first, second, others);

// Rest in object destructuring
const { id, ...userData } = {
  id: 1, name: 'Alice', age: 30, email: 'a@b.com'
};
console.log(id);
console.log(userData);

// Practical: remove a property immutably
const user = { name: 'Alice', password: 'secret', age: 30 };
const { password, ...safeUser } = user;
console.log(safeUser); // no password!`,
            output: `10
[INFO] Server started on port 3000
1 2 [3, 4, 5]
1
{ name: 'Alice', age: 30, email: 'a@b.com' }
{ name: 'Alice', age: 30 }`,
            tip: 'Use object rest to remove properties immutably: const { unwanted, ...rest } = obj. This is cleaner than Object.assign + delete.',
            analogy: 'Think of it like a vacuum cleaner: ...rest sucks up all the remaining items into a single bag, so you get the first few named items individually and everything else collected together.',
            codeHighlightLines: [2, 8, 14, 18, 26],
          },
        ],
      },
    ],
  },
  /* ------------------------------------------------------------ */
  /*  Modules & Async                                              */
  /* ------------------------------------------------------------ */
  {
    id: 'js-modules-async',
    label: 'Modules & Async',
    icon: 'Zap',
    entries: [
      {
        id: 'modules',
        title: 'ES Modules',
        difficulty: 'intermediate',
        tags: ['import', 'export', 'module', 'esm', 'dynamic-import'],
        cheatSheetSummary: 'import/export for modular code. Named exports preferred over default.',
        quiz: [
          {
            question: 'What is the key difference between named exports and default exports?',
            options: [
              'Named exports are faster to load than default exports',
              'A module can have multiple named exports but only one default export',
              'Default exports are automatically cached but named exports are not',
              'Named exports can only export functions, while default exports can export anything',
            ],
            correctIndex: 1,
            explanation: 'A module can have as many named exports as needed (export function add, export const PI, etc.) but only a single default export (export default ...). Named exports must be imported by their exact name (or renamed with "as"), while the default export can be imported with any name.',
          },
          {
            question: 'What does import * as math from "./math.js" do?',
            options: [
              'Imports only the default export and names it "math"',
              'Imports all named exports as properties of a namespace object called "math"',
              'Executes the module but does not import anything',
              'Creates a deep copy of the module and assigns it to "math"',
            ],
            correctIndex: 1,
            explanation: 'The import * as name syntax creates a namespace object containing all named exports from the module as properties. You access them as math.add(), math.PI, etc. The default export is available as math.default. This is useful when you want all exports from a module under a single namespace.',
          },
          {
            question: 'What does dynamic import() return?',
            options: [
              'The module object directly',
              'undefined -- it loads the module as a side effect',
              'A Promise that resolves to the module object',
              'A string containing the module source code',
            ],
            correctIndex: 2,
            explanation: 'Dynamic import() returns a Promise that resolves to the module namespace object. This means you must use await or .then() to access the module contents. It enables lazy loading, code splitting, and conditional module loading -- all impossible with static import statements.',
          },
          {
            question: 'Why are named exports generally preferred over default exports?',
            options: [
              'Named exports are smaller in file size',
              'Named exports enable better IDE autocomplete, consistent naming, and easier refactoring',
              'Default exports cause memory leaks in large applications',
              'Named exports support tree-shaking while default exports do not',
            ],
            correctIndex: 1,
            explanation: 'Named exports enforce a consistent name across all files that import them, making it easy to search and refactor. IDEs can autocomplete named exports because the names are known. Default exports can be imported with any name, leading to inconsistency across a codebase. Both support tree-shaking in modern bundlers.',
          },
        ],
        sections: [
          {
            heading: 'Named and Default Exports',
            content:
              'ES Modules are the standard module system for JavaScript. Each file is a module with its own scope. Named exports let you export multiple values, while default exports provide a single main export per module. Modules are always in strict mode and are evaluated only once (cached after first import). They work in browsers with type="module" and in Node.js.',
            code: `// --- math.js ---
// Named exports
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export const PI = 3.14159;

// Default export (one per module)
export default class Calculator {
  add(a, b) { return a + b; }
}

// --- app.js ---
// Named imports (must match export names)
import { add, subtract, PI } from './math.js';

// Rename on import
import { add as sum } from './math.js';

// Default import (any name)
import Calculator from './math.js';

// Import everything as namespace
import * as math from './math.js';
// math.add(1, 2);
// math.PI;

// Re-export from another module
export { add, subtract } from './math.js';
export { default as Calculator } from './math.js';

console.log('Module imports demonstrated');`,
            output: `Module imports demonstrated`,
            tip: 'Prefer named exports over default exports. Named exports provide better IDE autocomplete, easier refactoring, and consistent naming across your codebase.',
            diagram: {
              kind: 'mermaid',
              code: `graph LR
  M["math.js"] -->|"named: add, subtract, PI"| A["app.js"]
  M -->|"default: Calculator"| A
  A -->|"re-export"| O["other.js"]
  style M fill:#4a9eff,color:#fff
  style A fill:#51cf66,color:#fff
  style O fill:#ffa94d,color:#fff`,
              caption: 'Module import/export flow: named and default exports',
            },
            codeHighlightLines: [3, 4, 5, 8, 14],
          },
          {
            heading: 'Dynamic Imports',
            content:
              'Dynamic import() returns a Promise that resolves to the module object. It enables lazy loading — loading modules only when needed, which reduces initial bundle size. This is essential for code splitting in modern web applications, conditional module loading, and loading modules based on user actions.',
            code: `// Dynamic import — returns a Promise
async function loadModule() {
  const module = await import('./heavy-module.js');
  module.doSomething();
}

// Conditional loading
async function loadLocale(lang) {
  const locale = await import(\`./locales/\${lang}.js\`);
  return locale.translations;
}

// Dynamic import with destructuring
async function loadUtils() {
  const { debounce, throttle } = await import('./utils.js');
  return { debounce, throttle };
}

// Top-level await (ES modules only)
// const config = await import('./config.js');

// Pattern: lazy component loading (React)
// const LazyComponent = React.lazy(() => import('./MyComponent'));

console.log('Dynamic imports are lazy-loaded');
console.log('They return Promises');`,
            output: `Dynamic imports are lazy-loaded
They return Promises`,
            tip: 'Dynamic import() is the key to code splitting. In React, use React.lazy(() => import("./Component")) for route-based code splitting.',
            analogy: 'Think of it like ordering food only when hungry instead of pre-cooking everything: dynamic import() fetches a module on demand, saving startup time by not loading code you may never need.',
          },
        ],
      },
      {
        id: 'promises',
        title: 'Promises',
        difficulty: 'intermediate',
        tags: ['promise', 'async', 'then', 'catch', 'resolve', 'reject'],
        cheatSheetSummary: 'Represents a future value. .then() for success, .catch() for errors.',
        quiz: [
          {
            question: 'What are the three possible states of a Promise?',
            options: [
              'waiting, done, failed',
              'pending, fulfilled, rejected',
              'open, closed, error',
              'created, resolved, destroyed',
            ],
            correctIndex: 1,
            explanation: 'A Promise is always in exactly one of three states: pending (initial state, operation in progress), fulfilled (operation completed successfully with a value), or rejected (operation failed with a reason/error). Once a Promise is fulfilled or rejected, it is "settled" and its state never changes again.',
          },
          {
            question: 'What is the difference between Promise.all() and Promise.allSettled()?',
            options: [
              'They are identical in behavior',
              'Promise.all() rejects immediately if any promise rejects; Promise.allSettled() waits for all to complete regardless of outcome',
              'Promise.all() is synchronous; Promise.allSettled() is asynchronous',
              'Promise.all() returns an array; Promise.allSettled() returns an object',
            ],
            correctIndex: 1,
            explanation: 'Promise.all() is "fail fast": if any promise rejects, the entire Promise.all() rejects immediately (even if other promises are still pending). Promise.allSettled() always waits for every promise to either fulfill or reject, and returns an array of { status, value/reason } objects describing each outcome.',
          },
          {
            question: 'What does Promise.race() resolve with?',
            options: [
              'The value of the promise that was created first',
              'The value of all promises combined',
              'The value (or rejection) of whichever promise settles first',
              'The value of the slowest promise',
            ],
            correctIndex: 2,
            explanation: 'Promise.race() settles with whichever promise settles first, whether it fulfills or rejects. If the first settled promise fulfills, race fulfills. If it rejects, race rejects. The other promises continue running but their results are ignored. This is useful for timeout patterns.',
          },
          {
            question: 'What happens if you do not attach a .catch() handler to a rejected promise?',
            options: [
              'The error is silently ignored with no consequences',
              'The promise automatically retries the operation',
              'An unhandled promise rejection occurs, which crashes Node.js and logs warnings in browsers',
              'The promise converts the rejection to a resolved value of undefined',
            ],
            correctIndex: 2,
            explanation: 'Unhandled promise rejections are a serious issue. In Node.js (since v15), they cause the process to crash with an exit code. In browsers, they trigger a warning in the console and fire an "unhandledrejection" event on window. Always handle rejections with .catch() or try/catch with await.',
          },
        ],
        challenge: {
          prompt: 'Implement a `timeout` function that wraps a promise with a time limit. If the original promise does not settle within the specified milliseconds, reject with a "Timeout" error. If it settles in time, return its result.',
          starterCode: `function timeout(promise, ms) {
  // TODO: Create a timeout promise that rejects after ms milliseconds
  // TODO: Use Promise.race() to race the original promise against the timeout
  // TODO: Return the racing promise
}

// Test cases
async function test() {
  // Should resolve (fast enough)
  const fast = timeout(
    new Promise(resolve => setTimeout(() => resolve('done'), 50)),
    200
  );
  console.log(await fast); // 'done'

  // Should reject (too slow)
  try {
    await timeout(
      new Promise(resolve => setTimeout(() => resolve('too late'), 500)),
      100
    );
  } catch (e) {
    console.log(e.message); // 'Timeout'
  }
}
test();`,
          solutionCode: `function timeout(promise, ms) {
  const timer = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  return Promise.race([promise, timer]);
}

// Test cases
async function test() {
  // Should resolve (fast enough)
  const fast = timeout(
    new Promise(resolve => setTimeout(() => resolve('done'), 50)),
    200
  );
  console.log(await fast); // 'done'

  // Should reject (too slow)
  try {
    await timeout(
      new Promise(resolve => setTimeout(() => resolve('too late'), 500)),
      100
    );
  } catch (e) {
    console.log(e.message); // 'Timeout'
  }
}
test();`,
          hints: [
            'Create a new Promise that automatically rejects after the specified milliseconds using setTimeout.',
            'Use Promise.race() to race the original promise against the timeout promise -- whichever settles first wins.',
            'The timeout rejection should use new Error("Timeout") so the caller can catch it with a meaningful message.',
          ],
        },
        sections: [
          {
            heading: 'Creating and Using Promises',
            content:
              'Promises represent a value that may not be available yet but will resolve or reject in the future. A Promise is always in one of three states: pending, fulfilled, or rejected. The .then() method handles successful resolution, .catch() handles rejection, and .finally() runs cleanup regardless of outcome. Promises solve the "callback hell" problem by enabling linear chaining.',
            code: `// Creating a Promise
const fetchUser = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve({ id: 1, name: 'Alice' });
    } else {
      reject(new Error('User not found'));
    }
  }, 100);
});

// Consuming with .then/.catch/.finally
fetchUser
  .then(user => {
    console.log('User:', user.name);
    return user.id;
  })
  .then(id => console.log('ID:', id))
  .catch(err => console.error('Error:', err.message))
  .finally(() => console.log('Done'));

// Shorthand creation
const resolved = Promise.resolve(42);
const rejected = Promise.reject(new Error('fail'));

resolved.then(v => console.log('Resolved:', v));
rejected.catch(e => console.log('Rejected:', e.message));`,
            output: `User: Alice
ID: 1
Done
Resolved: 42
Rejected: fail`,
            tip: 'Always handle Promise rejections with .catch() or try/catch. Unhandled rejections crash Node.js and log warnings in browsers.',
            analogy: 'Think of it like a restaurant pager: when you order food (create a Promise), you get a pager (the Promise object). It will either buzz when your food is ready (resolve) or notify you the dish is unavailable (reject). You do not stand and wait at the counter the whole time.',
            diagram: {
              kind: 'mermaid',
              code: `stateDiagram-v2
  [*] --> Pending
  Pending --> Fulfilled : resolve(value)
  Pending --> Rejected : reject(error)
  Fulfilled --> [*] : .then()
  Rejected --> [*] : .catch()`,
              caption: 'Promise lifecycle: pending to fulfilled or rejected',
            },
            codeHighlightLines: [2, 6, 8, 14, 15, 19, 20],
          },
          {
            heading: 'Promise Combinators',
            content:
              'Promise combinators allow you to work with multiple promises concurrently. Promise.all() waits for all to resolve (fails fast on any rejection). Promise.allSettled() waits for all to complete regardless of outcome. Promise.race() resolves with the first settled promise. Promise.any() resolves with the first fulfilled promise.',
            code: `// Promise.all — all must succeed
const [a, b] = await Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
]);
console.log('all:', a, b);

// Promise.allSettled — all complete, never rejects
const results = await Promise.allSettled([
  Promise.resolve('ok'),
  Promise.reject(new Error('fail')),
  Promise.resolve('also ok'),
]);
for (const r of results) {
  console.log(r.status, r.value ?? r.reason?.message);
}

// Promise.race — first to settle wins
const winner = await Promise.race([
  new Promise(r => setTimeout(() => r('slow'), 200)),
  new Promise(r => setTimeout(() => r('fast'), 50)),
]);
console.log('race winner:', winner);

// Promise.any — first to fulfill (ignores rejections)
const first = await Promise.any([
  Promise.reject(new Error('fail1')),
  new Promise(r => setTimeout(() => r('success'), 50)),
  Promise.reject(new Error('fail2')),
]);
console.log('any first:', first);`,
            output: `all: 1 2
fulfilled ok
rejected fail
fulfilled also ok
race winner: fast
any first: success`,
            tip: 'Use Promise.all() for parallel operations that all need to succeed. Use Promise.allSettled() when you want results regardless of individual failures.',
            diagram: {
              kind: 'mermaid',
              code: `graph TB
  subgraph "Promise.all()"
    A1["P1 ok"] & A2["P2 ok"] & A3["P3 ok"] --> AR["All results"]
  end
  subgraph "Promise.race()"
    R1["P1 slow"] & R2["P2 FAST"] --> RR["First settled"]
  end
  subgraph "Promise.any()"
    N1["P1 reject"] & N2["P2 OK"] & N3["P3 reject"] --> NR["First fulfilled"]
  end
  style AR fill:#51cf66,color:#fff
  style RR fill:#4a9eff,color:#fff
  style NR fill:#ffa94d,color:#fff`,
              caption: 'Promise combinators: different strategies for handling multiple promises',
            },
          },
        ],
      },
      {
        id: 'async-await',
        title: 'async / await',
        difficulty: 'intermediate',
        tags: ['async', 'await', 'asynchronous', 'promise', 'try-catch'],
        cheatSheetSummary: 'async functions return Promises. await pauses until Promise resolves.',
        quiz: [
          {
            question: 'What does an async function always return?',
            options: [
              'The raw value that is returned in the function body',
              'undefined',
              'A Promise that wraps the return value',
              'An iterator object',
            ],
            correctIndex: 2,
            explanation: 'An async function always returns a Promise. If you return a value (e.g., return 42), the function returns Promise.resolve(42). If you throw an error, it returns a rejected Promise. Even if you return another Promise, the async function wraps it correctly. This means the caller always receives a Promise.',
          },
          {
            question: 'What is wrong with this code? async function fetchAll(urls) { const results = []; for (const url of urls) { results.push(await fetch(url)); } return results; }',
            options: [
              'Nothing -- this is the correct pattern for fetching multiple URLs',
              'The function should use .then() instead of await',
              'Each fetch waits for the previous one to complete, making it sequential instead of parallel',
              'The results array will contain Promises instead of responses',
            ],
            correctIndex: 2,
            explanation: 'Using await inside a loop makes each iteration wait for the previous one to finish, turning parallel-capable operations into sequential ones. For independent operations, use Promise.all(urls.map(url => fetch(url))) to start all fetches simultaneously and await them all together.',
          },
          {
            question: 'How should you handle errors in async/await code?',
            options: [
              'Use .catch() on the async function call only',
              'Wrap await calls in try/catch blocks',
              'Errors in async functions cannot be caught',
              'Use window.onerror to catch all async errors globally',
            ],
            correctIndex: 1,
            explanation: 'The primary way to handle errors in async/await code is try/catch blocks. Wrapping await calls in try/catch lets you handle rejections just like synchronous errors. You can also add .catch() to the returned Promise from the caller side, but try/catch inside the async function is the most readable and maintainable approach.',
          },
          {
            question: 'What is top-level await and where can it be used?',
            options: [
              'Using await outside any function, available in all JavaScript environments',
              'Using await outside any function, available only in ES modules (not CommonJS)',
              'A special syntax that makes all code in a file async',
              'A feature that has been proposed but is not yet available in any runtime',
            ],
            correctIndex: 1,
            explanation: 'Top-level await allows you to use await outside of an async function, but only in ES modules (files with type="module" in browsers or .mjs in Node.js). It is not available in CommonJS modules (require/module.exports) or regular script tags. The module itself becomes async when top-level await is used.',
          },
        ],
        challenge: {
          prompt: 'Write an async function `withRetry` that takes an async function and retries it up to a specified number of times with an exponential backoff delay. If all attempts fail, throw the last error.',
          starterCode: `async function withRetry(fn, maxRetries = 3, baseDelay = 100) {
  // TODO: Loop through attempts (1 to maxRetries)
  // TODO: Try calling await fn() and return the result if successful
  // TODO: If it fails and there are retries left, wait with exponential backoff
  //       (baseDelay * 2^(attempt-1)) before next attempt
  // TODO: If all attempts fail, throw the last error
}

// Test case
let callCount = 0;
const unreliable = async () => {
  callCount++;
  if (callCount < 3) throw new Error(\`Fail #\${callCount}\`);
  return 'success!';
};

withRetry(unreliable, 5, 50).then(result => {
  console.log(result);       // 'success!'
  console.log(callCount);    // 3
});`,
          solutionCode: `async function withRetry(fn, maxRetries = 3, baseDelay = 100) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

// Test case
let callCount = 0;
const unreliable = async () => {
  callCount++;
  if (callCount < 3) throw new Error(\`Fail #\${callCount}\`);
  return 'success!';
};

withRetry(unreliable, 5, 50).then(result => {
  console.log(result);       // 'success!'
  console.log(callCount);    // 3
});`,
          hints: [
            'Use a for loop from attempt 1 to maxRetries, with try/catch inside each iteration.',
            'Calculate exponential backoff as baseDelay * Math.pow(2, attempt - 1), so delays are 100ms, 200ms, 400ms, etc.',
            'Store the error in a variable (lastError) so you can throw it after all retries are exhausted.',
          ],
        },
        sections: [
          {
            heading: 'async/await Basics',
            content:
              'async/await is syntactic sugar over Promises that makes asynchronous code look synchronous. An async function always returns a Promise. The await keyword pauses execution until the Promise resolves, making error handling with try/catch straightforward. This is the preferred way to write async code in modern JavaScript.',
            code: `// async function always returns a Promise
async function fetchUser(id) {
  try {
    // await pauses until Promise resolves
    const response = await fetch(\`/api/users/\${id}\`);
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed:', error.message);
    throw error;
  }
}

// Sequential vs Parallel
async function loadData() {
  // Sequential — slow (each waits for previous)
  const a = await Promise.resolve(1);
  const b = await Promise.resolve(2);
  console.log('Sequential:', a, b);

  // Parallel — fast (both start immediately)
  const [x, y] = await Promise.all([
    Promise.resolve(10),
    Promise.resolve(20),
  ]);
  console.log('Parallel:', x, y);
}
await loadData();

// Top-level await (ES modules)
const data = await Promise.resolve('top-level');
console.log(data);`,
            output: `Sequential: 1 2
Parallel: 10 20
top-level`,
            tip: 'Avoid "await in a loop" for independent operations. Use Promise.all(items.map(async item => ...)) to run them in parallel.',
            analogy: 'Think of it like reading a recipe step by step: await is the moment you pause and wait for the oven to finish before moving to the next step. Without await, you would keep adding ingredients to a dish that is not ready yet.',
            codeHighlightLines: [5, 7, 18, 19, 23, 24, 25],
          },
          {
            heading: 'Advanced async Patterns',
            content:
              'Async/await enables clean patterns for complex workflows: sequential processing with for...of, parallel mapping with Promise.all, retry logic, timeout handling, and concurrent processing with limits. Understanding these patterns is essential for building performant and resilient applications.',
            code: `// Retry pattern
async function withRetry(fn, maxRetries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      console.log(\`Attempt \${attempt} failed, retrying...\`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}

// Timeout pattern
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  return Promise.race([promise, timeout]);
}

// Process array items sequentially
async function processSequentially(items) {
  const results = [];
  for (const item of items) {
    const result = await Promise.resolve(item * 2);
    results.push(result);
  }
  return results;
}

const seq = await processSequentially([1, 2, 3]);
console.log('Sequential:', seq);

// Process in parallel (all at once)
const par = await Promise.all([1, 2, 3].map(
  async (item) => item * 2
));
console.log('Parallel:', par);`,
            output: `Sequential: [2, 4, 6]
Parallel: [2, 4, 6]`,
            tip: 'For rate-limited APIs, use a concurrency limiter (like p-limit) instead of awaiting one at a time or firing all at once.',
            diagram: {
              kind: 'mermaid',
              code: `graph LR
  subgraph "Sequential"
    S1["await item1"] --> S2["await item2"] --> S3["await item3"]
  end
  subgraph "Parallel"
    P1["item1"] & P2["item2"] & P3["item3"] --> PA["Promise.all()"]
  end
  style S1 fill:#ff6b6b,color:#fff
  style S2 fill:#ff6b6b,color:#fff
  style S3 fill:#ff6b6b,color:#fff
  style P1 fill:#51cf66,color:#fff
  style P2 fill:#51cf66,color:#fff
  style P3 fill:#51cf66,color:#fff
  style PA fill:#4a9eff,color:#fff`,
              caption: 'Sequential waits for each item; parallel starts all at once',
            },
          },
        ],
      },
      {
        id: 'event-loop',
        title: 'The Event Loop',
        difficulty: 'advanced',
        tags: ['event-loop', 'microtask', 'macrotask', 'concurrency', 'call-stack'],
        cheatSheetSummary: 'Single-threaded with microtask (Promises) and macrotask (setTimeout) queues.',
        quiz: [
          {
            question: 'In what order does the following code log? console.log("A"); setTimeout(() => console.log("B"), 0); Promise.resolve().then(() => console.log("C")); console.log("D");',
            options: [
              'A, B, C, D',
              'A, D, B, C',
              'A, D, C, B',
              'A, C, D, B',
            ],
            correctIndex: 2,
            explanation: 'Synchronous code runs first: "A" then "D". Then the microtask queue (Promises) is drained: "C". Finally the macrotask queue (setTimeout) runs: "B". Microtasks always run before macrotasks, even with a 0ms timeout. The order is: A, D, C, B.',
          },
          {
            question: 'What is the difference between microtasks and macrotasks?',
            options: [
              'Microtasks are smaller in memory; macrotasks use more memory',
              'Microtasks (Promises, queueMicrotask) run before macrotasks (setTimeout, setInterval) after each synchronous execution',
              'They are different names for the same queue',
              'Microtasks run in a separate thread; macrotasks run on the main thread',
            ],
            correctIndex: 1,
            explanation: 'Microtasks (Promise callbacks, queueMicrotask) are processed immediately after the current synchronous code completes, before any macrotask. All pending microtasks are drained (including newly added ones) before the event loop picks up the next macrotask (setTimeout, setInterval, I/O callbacks). This is why Promise.then runs before setTimeout(..., 0).',
          },
          {
            question: 'Why does setTimeout(fn, 0) not run immediately?',
            options: [
              'There is always a minimum 4ms delay enforced by the browser',
              'The callback is placed in the macrotask queue and only runs after all synchronous code and microtasks complete',
              'setTimeout with 0ms is treated as an error and ignored',
              'It does run immediately in all JavaScript environments',
            ],
            correctIndex: 1,
            explanation: 'setTimeout(fn, 0) schedules fn as a macrotask. Even with 0ms delay, the callback must wait for: (1) all remaining synchronous code to finish, (2) all microtasks to be drained. Only then does the event loop pick a macrotask from the queue. Additionally, browsers enforce a minimum ~4ms delay for nested setTimeout calls (after 5 nesting levels).',
          },
          {
            question: 'What happens if a microtask keeps spawning new microtasks infinitely?',
            options: [
              'The event loop processes them in round-robin with macrotasks',
              'JavaScript throws a stack overflow error after 1000 microtasks',
              'The event loop is starved: macrotasks and rendering never get a chance to run, and the page freezes',
              'The browser automatically kills microtasks after 5 seconds',
            ],
            correctIndex: 2,
            explanation: 'The event loop drains ALL microtasks before moving to macrotasks or rendering. If a microtask keeps adding more microtasks, the microtask queue never empties. This starves the event loop: no setTimeout callbacks fire, no I/O is handled, and the browser cannot repaint, causing the page to freeze completely.',
          },
        ],
        sections: [
          {
            heading: 'How the Event Loop Works',
            content:
              'JavaScript is single-threaded but handles concurrency through an event loop. The loop continuously checks the call stack and task queues. When the stack is empty, it processes all microtasks (Promises, queueMicrotask), then picks one macrotask (setTimeout, setInterval, I/O). This model explains why setTimeout(fn, 0) does not run immediately.',
            code: `// Event loop ordering
console.log('1. Synchronous');

setTimeout(() => {
  console.log('4. Macrotask (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Microtask (Promise)');
});

console.log('2. Synchronous');

// Output order:
// 1. Synchronous
// 2. Synchronous
// 3. Microtask (Promise)
// 4. Macrotask (setTimeout)

// queueMicrotask — explicit microtask
queueMicrotask(() => {
  console.log('Also a microtask');
});

// Microtasks can spawn more microtasks
Promise.resolve().then(() => {
  console.log('Micro 1');
  Promise.resolve().then(() => {
    console.log('Micro 2 (spawned by Micro 1)');
  });
});`,
            output: `1. Synchronous
2. Synchronous
3. Microtask (Promise)
Also a microtask
Micro 1
Micro 2 (spawned by Micro 1)
4. Macrotask (setTimeout)`,
            tip: 'Never run CPU-intensive synchronous code in the main thread. Use Web Workers (browser) or worker_threads (Node.js) for heavy computation.',
            analogy: 'Think of it like a single waiter at a restaurant: the waiter (call stack) serves one table at a time. VIP orders (microtasks/Promises) always get served before regular orders (macrotasks/setTimeout), even if the regular orders came first.',
            diagram: {
              kind: 'mermaid',
              code: `graph TB
  CS["Call Stack (empty?)"] -->|yes| MQ["Microtask Queue"]
  MQ -->|"all microtasks done?"| TQ["Macrotask Queue"]
  TQ -->|"pick one task"| CS
  MQ -->|"more microtasks?"| MQ
  style CS fill:#4a9eff,color:#fff
  style MQ fill:#51cf66,color:#fff
  style TQ fill:#ffa94d,color:#fff`,
              caption: 'Event loop: stack empties, all microtasks run, then one macrotask',
            },
            codeHighlightLines: [2, 4, 5, 8, 9, 12],
          },
          {
            heading: 'Practical Implications',
            content:
              'Understanding the event loop is crucial for performance and correctness. Long-running synchronous code blocks the event loop, freezing the UI in browsers and blocking I/O in Node.js. setTimeout with 0ms does not mean "run immediately" — it means "run after current sync code and all microtasks." This knowledge helps you optimize rendering, schedule work, and avoid common timing bugs.',
            code: `// setTimeout(fn, 0) runs AFTER all sync and microtask code
const start = Date.now();

setTimeout(() => {
  console.log(\`setTimeout: \${Date.now() - start}ms\`);
}, 0);

// This blocks the event loop for ~100ms
let sum = 0;
for (let i = 0; i < 10_000_000; i++) sum += i;

console.log(\`Sync done: \${Date.now() - start}ms\`);

// Yielding to the event loop
async function processLargeArray(arr) {
  const results = [];
  for (let i = 0; i < arr.length; i++) {
    results.push(arr[i] * 2);
    // Yield every 1000 items to keep UI responsive
    if (i % 1000 === 0) {
      await new Promise(r => setTimeout(r, 0));
    }
  }
  return results;
}

console.log('Event loop understanding is key');`,
            output: `Sync done: 15ms
Event loop understanding is key
setTimeout: 16ms`,
            tip: 'Use requestAnimationFrame in browsers for visual updates and requestIdleCallback for low-priority work to avoid blocking the main thread.',
          },
        ],
      },
      {
        id: 'generators',
        title: 'Generators',
        difficulty: 'advanced',
        tags: ['generator', 'yield', 'iterator', 'lazy', 'infinite'],
        cheatSheetSummary: 'function* with yield. Pausable functions that produce sequences lazily.',
        signature: 'function* name() { yield value; }',
        quiz: [
          {
            question: 'What does calling a generator function return?',
            options: [
              'The first yielded value',
              'undefined',
              'An iterator object with a next() method',
              'A Promise that resolves to the yielded values',
            ],
            correctIndex: 2,
            explanation: 'Calling a generator function does NOT execute its body. Instead, it returns an iterator object (a "generator object") with methods like next(), return(), and throw(). The generator body only starts executing when you call .next() on the returned iterator. Each next() call runs until the next yield or return.',
          },
          {
            question: 'What does the next() method return?',
            options: [
              'Just the yielded value',
              'An object { value, done } where value is the yielded value and done indicates if the generator is finished',
              'A Promise containing the yielded value',
              'An array of all remaining values',
            ],
            correctIndex: 1,
            explanation: 'Each call to next() returns an object with two properties: "value" (the yielded or returned value) and "done" (a boolean). When the generator yields, done is false. When it returns (or has no more code), done is true and value is the return value (or undefined).',
          },
          {
            question: 'What does yield* do?',
            options: [
              'Yields all values at once as an array',
              'Multiplies the yielded value',
              'Delegates to another iterable, yielding each of its values one by one',
              'Makes the yield asynchronous',
            ],
            correctIndex: 2,
            explanation: 'yield* delegates to another iterable (array, string, or another generator). It yields each value from the delegated iterable one at a time, as if the outer generator had yielded each one individually. It is a clean way to flatten or compose generators without manual loops.',
          },
          {
            question: 'How do you consume an async generator?',
            options: [
              'With a regular for...of loop',
              'By calling .next() synchronously',
              'With a for await...of loop',
              'By spreading it into an array with [...]',
            ],
            correctIndex: 2,
            explanation: 'Async generators (async function*) produce promises of values. You consume them with for await...of, which awaits each yielded promise automatically. Regular for...of does not work because it does not handle the async nature. You can also manually call .next() and await the result, but for await...of is the standard approach.',
          },
        ],
        challenge: {
          prompt: 'Create a generator function `range` that works like Python\'s range: range(stop), range(start, stop), or range(start, stop, step). It should yield numbers in the specified range. Handle edge cases like negative steps for counting down.',
          starterCode: `function* range(startOrStop, stop, step) {
  // TODO: Handle the three calling conventions:
  //   range(5)       -> yields 0, 1, 2, 3, 4
  //   range(2, 5)    -> yields 2, 3, 4
  //   range(0, 10, 2) -> yields 0, 2, 4, 6, 8
  //   range(5, 0, -1) -> yields 5, 4, 3, 2, 1
  // TODO: Determine actual start, stop, step values based on arguments
  // TODO: Yield values in the range
}

// Test cases
console.log([...range(5)]);           // [0, 1, 2, 3, 4]
console.log([...range(2, 5)]);        // [2, 3, 4]
console.log([...range(0, 10, 2)]);    // [0, 2, 4, 6, 8]
console.log([...range(5, 0, -1)]);    // [5, 4, 3, 2, 1]
console.log([...range(0, 0)]);        // []`,
          solutionCode: `function* range(startOrStop, stop, step) {
  let start;
  if (stop === undefined) {
    start = 0;
    stop = startOrStop;
    step = 1;
  } else if (step === undefined) {
    start = startOrStop;
    step = 1;
  } else {
    start = startOrStop;
  }

  if (step > 0) {
    for (let i = start; i < stop; i += step) {
      yield i;
    }
  } else if (step < 0) {
    for (let i = start; i > stop; i += step) {
      yield i;
    }
  }
}

// Test cases
console.log([...range(5)]);           // [0, 1, 2, 3, 4]
console.log([...range(2, 5)]);        // [2, 3, 4]
console.log([...range(0, 10, 2)]);    // [0, 2, 4, 6, 8]
console.log([...range(5, 0, -1)]);    // [5, 4, 3, 2, 1]
console.log([...range(0, 0)]);        // []`,
          hints: [
            'Check if "stop" is undefined to determine the calling convention: if so, treat the first argument as "stop" and start from 0.',
            'Use separate loops for positive and negative steps, or use a condition like (step > 0 ? i < stop : i > stop) to handle both directions.',
            'Generators are lazy, so even range(0, Infinity) would work without running out of memory -- it yields one value at a time.',
          ],
        },
        sections: [
          {
            heading: 'Generator Basics',
            content:
              'Generators are special functions declared with function* that can be paused and resumed. They produce values on demand using the yield keyword. Calling a generator returns an iterator object with a next() method. Each next() call resumes execution until the next yield, returning { value, done }. Generators are lazy — they compute values only when requested.',
            code: `// Basic generator
function* count(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const counter = count(1, 5);
console.log(counter.next()); // { value: 1, done: false }
console.log(counter.next()); // { value: 2, done: false }

// Generators are iterable
for (const n of count(1, 5)) {
  process.stdout.write(n + ' ');
}
console.log();

// Spread into array
console.log([...count(1, 5)]);

// Infinite generator
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Take first 8 Fibonacci numbers
const fib = fibonacci();
const first8 = Array.from({ length: 8 }, () => fib.next().value);
console.log(first8);`,
            output: `{ value: 1, done: false }
{ value: 2, done: false }
1 2 3 4 5
[1, 2, 3, 4, 5]
[0, 1, 1, 2, 3, 5, 8, 13]`,
            tip: 'Generators create values lazily. They compute the next value only when next() is called, making them ideal for infinite sequences or large datasets.',
            analogy: 'Think of it like a vending machine with a button: each time you press the button (call next()), it dispenses one item (yield) and then pauses. It does not prepare everything upfront, only producing the next item when asked.',
            codeHighlightLines: [2, 4, 9, 10, 22, 25],
          },
          {
            heading: 'Generator Patterns',
            content:
              'Generators support delegation with yield*, allowing one generator to delegate to another. They can receive values via next(value), enabling two-way communication. Async generators (async function*) produce async sequences consumable with for await...of. These patterns are used in libraries like Redux-Saga for managing side effects.',
            code: `// yield* — delegate to another iterable
function* concat(...iterables) {
  for (const iterable of iterables) {
    yield* iterable;
  }
}
console.log([...concat([1, 2], [3, 4], 'ab')]);

// Two-way communication
function* calculator() {
  let total = 0;
  while (true) {
    const input = yield total;
    if (input === null) return total;
    total += input;
  }
}
const calc = calculator();
calc.next();       // prime the generator
calc.next(10);     // total = 10
calc.next(20);     // total = 30
const result = calc.next(5); // total = 35
console.log('Total:', result.value);

// Async generator
async function* fetchPages(baseUrl, maxPages) {
  for (let page = 1; page <= maxPages; page++) {
    const data = await Promise.resolve({ page, items: [page * 10] });
    yield data;
  }
}

// Consume with for await...of
(async () => {
  for await (const page of fetchPages('/api', 3)) {
    console.log('Page:', page.page, 'Items:', page.items);
  }
})();`,
            output: `[1, 2, 3, 4, 'a', 'b']
Total: 35
Page: 1 Items: [10]
Page: 2 Items: [20]
Page: 3 Items: [30]`,
            tip: 'Async generators are perfect for paginated API results, streaming data, or any scenario where you need to await data between yields.',
            diagram: {
              kind: 'mermaid',
              code: `sequenceDiagram
  participant Caller
  participant Gen as calculator()
  Caller->>Gen: next() [prime]
  Gen-->>Caller: { value: 0, done: false }
  Caller->>Gen: next(10)
  Gen-->>Caller: { value: 10, done: false }
  Caller->>Gen: next(20)
  Gen-->>Caller: { value: 30, done: false }
  Caller->>Gen: next(5)
  Gen-->>Caller: { value: 35, done: false }`,
              caption: 'Two-way generator communication: values flow in both directions',
            },
          },
        ],
      },
    ],
  },
];

import type { DocCategory } from './types';

// Part 1: Getting Started + Data Types
export const JS_PART1_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Getting Started                                              */
  /* ------------------------------------------------------------ */
  {
    id: 'js-getting-started',
    label: 'Getting Started',
    icon: 'Rocket',
    entries: [
      {
        id: 'what-is-javascript',
        title: 'What is JavaScript',
        difficulty: 'beginner',
        tags: ['intro', 'basics', 'history', 'web'],
        cheatSheetSummary: 'Dynamic, interpreted language that powers interactivity on the web and beyond.',
        sections: [
          {
            heading: 'What is JavaScript?',
            content:
              'Welcome to JavaScript -- quite possibly the most important programming language you will ever learn. Created in just 10 days by Brendan Eich in 1995 for Netscape Navigator, JavaScript started as a humble scripting language for adding sparkle to web pages. Fast-forward to today, and it has become a true Swiss Army knife of programming. It runs in every browser on the planet, powers backend servers through Node.js, builds mobile apps with React Native, and even controls robots and IoT devices. Here is the remarkable part: JavaScript is the *only* language natively understood by all web browsers. That means if you want to make a webpage interactive -- animate something, validate a form, fetch data from an API -- JavaScript is your language. Whether you are building a simple to-do list or architecting a complex real-time application, your JavaScript journey starts right here.',
            code: `// JavaScript runs in two main environments:

// 1. Browser — manipulate web pages
document.querySelector('h1').textContent = 'Hello, JavaScript!';

// 2. Node.js — run on the server
const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Hello from Node.js!');
});
server.listen(3000);
console.log('Server running on port 3000');`,
            output: `Server running on port 3000`,
            tip: 'JavaScript and Java are completely unrelated languages despite the similar name. The naming was a marketing decision made in the 1990s.',
            note: 'JavaScript was originally called "Mocha," then "LiveScript," before being renamed to "JavaScript" to ride the hype wave of Java in 1995. The official name of the language standard is actually ECMAScript (maintained by ECMA International), which is why you will often see features referred to as ES6, ES2020, etc.',
            analogy: 'Think of it like electricity in a building: JavaScript is the invisible force that powers every interactive element on a webpage, from flickering lights (animations) to automatic doors (event handlers).',
            diagram: {
              kind: 'mermaid',
              code: `graph LR
  A["JavaScript Engine"] --> B["Browser (V8, SpiderMonkey)"]
  A --> C["Node.js (V8)"]
  B --> D["DOM Manipulation"]
  B --> E["Web APIs"]
  C --> F["File System"]
  C --> G["HTTP Server"]`,
              caption: 'JavaScript runs in two main environments: browsers and Node.js',
            },
            codeHighlightLines: [4, 8, 9, 10],
          },
          {
            heading: 'Running in the Browser',
            content:
              'Every modern browser ships with its own JavaScript engine -- think of it as a built-in translator that reads your JavaScript and converts it into instructions the computer can execute. Chrome and Edge use the V8 engine, Firefox uses SpiderMonkey, and Safari uses JavaScriptCore. The quickest way to start experimenting? Open your browser\'s developer console right now (press F12, or Cmd+Option+J on Mac) and start typing JavaScript directly. For real projects, you will embed scripts in HTML pages using the `<script>` tag. The browser also hands you a treasure chest of Web APIs -- the DOM for manipulating page elements, `fetch` for making network requests, `localStorage` for saving data locally, and hundreds more. These APIs are what make JavaScript in the browser so powerful: the language itself is just the beginning.',
            code: `<!-- Inline script in HTML -->
<script>
  console.log('Page loaded!');
</script>

<!-- External script file (preferred) -->
<script src="app.js" defer></script>

<!-- Module script with import/export support -->
<script type="module" src="main.js"></script>`,
            output: `Page loaded!`,
            tip: 'Use the "defer" attribute on script tags so the browser downloads the script in parallel but only executes it after the HTML is fully parsed.',
            warning: 'Placing `<script>` tags in the `<head>` without `defer` or `async` blocks HTML parsing, causing your page to appear blank until the script finishes loading. Always use `defer` for external scripts, or place your `<script>` tags at the end of `<body>`.',
            analogy: 'Think of it like a restaurant kitchen: the HTML is the recipe card, the CSS is the plating instructions, and JavaScript is the chef who actually does the cooking and can change the dish in real-time based on customer feedback.',
            codeHighlightLines: [7, 10],
          },
          {
            heading: 'Running in Node.js',
            content:
              'Node.js broke JavaScript free from the browser in 2009, and it changed everything. Built on Google\'s lightning-fast V8 engine, Node.js lets you run JavaScript on your computer as a standalone program -- perfect for building web servers, command-line tools, build pipelines, and entire backend systems. To run a JavaScript file, just type `node filename.js` in your terminal. Node.js comes bundled with npm (Node Package Manager), which gives you access to over two million open-source packages -- the largest software registry in the world. Need to read files? Node has built-in modules for that. Want to build a REST API? There are dozens of frameworks to choose from. The beauty is that you use the same language on both the frontend and backend, which means less context-switching and more productivity.',
            code: `// Save this as hello.js and run: node hello.js
console.log('Hello from Node.js!');
console.log('Node version:', process.version);

// Node.js provides built-in modules
const path = require('path');
console.log(path.join('/users', 'documents', 'file.txt'));

// ES Module syntax (with "type": "module" in package.json)
// import { readFile } from 'fs/promises';
// const content = await readFile('data.txt', 'utf-8');`,
            output: `Hello from Node.js!
Node version: v20.11.0
/users/documents/file.txt`,
            tip: 'Use "node --watch app.js" (Node 18+) to auto-restart your script when files change during development.',
            note: 'Node.js also introduced alternative runtimes like Deno (created by the same person, Ryan Dahl) and Bun (focused on speed). All three run JavaScript outside the browser, but Node.js remains the most widely used with the largest ecosystem by far.',
          },
        ],
        quiz: [
          {
            question: 'Who created JavaScript and in what year?',
            options: [
              'Brendan Eich in 1995',
              'James Gosling in 1995',
              'Guido van Rossum in 1991',
              'Dennis Ritchie in 1972',
            ],
            correctIndex: 0,
            explanation:
              'Brendan Eich created JavaScript in just 10 days in 1995 while working at Netscape Communications.',
          },
          {
            question: 'What is the official standard name for JavaScript?',
            options: [
              'JavaWebScript',
              'ECMAScript',
              'WebScript',
              'LiveScript',
            ],
            correctIndex: 1,
            explanation:
              'The official standard name is ECMAScript, maintained by ECMA International. Feature versions are referred to as ES6, ES2020, etc.',
          },
          {
            question: 'Which attribute should you use on a <script> tag to prevent it from blocking HTML parsing?',
            options: [
              'async',
              'defer',
              'lazy',
              'noblock',
            ],
            correctIndex: 1,
            explanation:
              'The "defer" attribute tells the browser to download the script in parallel but only execute it after the HTML is fully parsed.',
          },
        ],
        challenge: {
          prompt:
            'Create a simple Node.js HTTP server that responds with "Welcome to JavaScript!" on port 8080. Log a message to the console when the server starts.',
          starterCode: `const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
  // TODO: Set the response
});

// TODO: Start listening on port 8080 and log a message`,
          solutionCode: `const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Welcome to JavaScript!');
});

server.listen(8080, () => {
  console.log('Server running on port 8080');
});`,
          hints: [
            'Use res.end() to send a response string back to the client.',
            'Call server.listen() with a port number and an optional callback function.',
            'The callback passed to server.listen() runs once the server is ready.',
          ],
        },
      },
      {
        id: 'console-and-output',
        title: 'Console & Output',
        difficulty: 'beginner',
        tags: ['console', 'logging', 'debugging', 'output'],
        cheatSheetSummary: 'console.log() prints values; console.table(), console.warn(), console.error() for variants.',
        sections: [
          {
            heading: 'console.log and Friends',
            content:
              'If `console.log()` is your first JavaScript friend, it will be your most loyal one. Think of it as your window into what your code is actually doing -- it prints values to the browser\'s developer console or the terminal in Node.js. Unlike many languages that require special formatting for different data types, `console.log()` handles everything gracefully: strings, numbers, objects, arrays -- just pass them in. But `console.log()` has some talented siblings too. `console.warn()` prints warnings with a yellow icon, `console.error()` prints errors with a red icon (both useful for distinguishing severity levels at a glance), and `console.table()` renders arrays and objects as beautiful, readable tables. There is also `console.time()` and `console.timeEnd()` for measuring how long code takes to execute -- invaluable when you start caring about performance.',
            code: `// Basic output
console.log('Hello, world!');

// Multiple values separated by spaces
console.log('Name:', 'Alice', 'Age:', 25);

// Objects are printed with their structure
console.log({ name: 'Alice', age: 25 });

// console.table for arrays of objects
console.table([
  { name: 'Alice', score: 95 },
  { name: 'Bob', score: 87 },
]);

// Timing code execution
console.time('loop');
for (let i = 0; i < 1_000_000; i++) {}
console.timeEnd('loop');`,
            output: `Hello, world!
Name: Alice Age: 25
{ name: 'Alice', age: 25 }
┌─────────┬─────────┬───────┐
│ (index) │  name   │ score │
├─────────┼─────────┼───────┤
│    0    │ 'Alice' │  95   │
│    1    │  'Bob'  │  87   │
└─────────┴─────────┴───────┘
loop: 2.345ms`,
            tip: 'Use console.dir(obj, { depth: null }) in Node.js to print deeply nested objects that console.log would truncate.',
            note: 'In the browser, `console.log()` for objects shows a live, expandable reference. This means if you log an object and then mutate it, expanding the log later shows the *mutated* state, not the state at the time of logging. Use `console.log(JSON.parse(JSON.stringify(obj)))` to capture a snapshot instead.',
            analogy: 'Think of it like a dashboard in a car: console.log is the speedometer showing you what is happening, console.warn is the check-engine light, and console.error is the red warning alarm.',
            codeHighlightLines: [2, 11, 12, 13, 17, 19],
          },
          {
            heading: 'Formatted Output',
            content:
              'JavaScript does not have a built-in `printf()` like C or Python\'s f-strings... but template literals (backtick strings with `${}` expressions) are arguably even better. They let you embed any expression directly inside a string, making your output code clean and readable. For more precise formatting, you have string methods like `padStart()` and `padEnd()` for alignment (perfect for building CLI tables), and `toFixed()` for controlling decimal places on numbers. And here is a fun trick: in the browser console, you can use `%c` format specifiers to add CSS styling to your log output -- colorful, bold, even with background colors. It is great for making important debug messages stand out in a sea of logs.',
            code: `const name = 'Alice';
const score = 95.678;

// Template literal interpolation
console.log(\`Student: \${name}, Score: \${score.toFixed(1)}\`);

// Padding for aligned output
const items = [
  { label: 'Apples', price: 1.5 },
  { label: 'Bananas', price: 0.75 },
  { label: 'Cherries', price: 3.2 },
];
for (const item of items) {
  const label = item.label.padEnd(12);
  const price = item.price.toFixed(2).padStart(6);
  console.log(\`\${label} $\${price}\`);
}

// Console with severity levels
console.warn('This is a warning');
console.error('This is an error');
console.info('This is informational');`,
            output: `Student: Alice, Score: 95.7
Apples       $  1.50
Bananas      $  0.75
Cherries     $  3.20
This is a warning
This is an error
This is informational`,
            tip: 'Use console.group() and console.groupEnd() to create collapsible groups of log messages in the browser console for organized debugging.',
            warning: 'Remember to remove or disable `console.log()` calls before deploying to production. Excessive logging can hurt performance and may accidentally expose sensitive data. Consider using a logging library with log levels (debug, info, warn, error) for production code.',
          },
          {
            heading: 'Strict Mode',
            content:
              'Imagine JavaScript has a "safety net" mode that catches mistakes that would otherwise fail silently. That is exactly what strict mode does. Without it, JavaScript is frustratingly forgiving -- misspell a variable name and it silently creates a global variable instead of throwing an error. Assign to a read-only property? Silent failure. Duplicate function parameter names? No complaint. Strict mode turns all of these silent failures into loud, clear errors that help you fix bugs faster. You opt in by adding the string `\'use strict\'` at the top of a file or function. But here is the good news: if you are writing modern JavaScript using ES modules (with `import`/`export`), you are *already* in strict mode automatically -- no directive needed. Same goes for code inside `class` bodies. Strict mode is essentially the JavaScript community saying, "We made some design mistakes in the early days -- here is how to opt out of them."',
            code: `'use strict';

// Without strict mode, typos create global variables silently
// In strict mode, this throws a ReferenceError
// username = 'Alice'; // ReferenceError: username is not defined

// Strict mode prevents duplicate parameter names
// function add(a, a) {} // SyntaxError in strict mode

// In strict mode, assigning to read-only properties throws
const obj = {};
Object.defineProperty(obj, 'x', { value: 42, writable: false });
// obj.x = 100; // TypeError in strict mode

console.log('Strict mode is active');
console.log('ES modules are always strict');`,
            output: `Strict mode is active
ES modules are always strict`,
            tip: 'If you use ES modules (import/export), strict mode is automatic. You only need the "use strict" directive for classic scripts and Node.js CommonJS files.',
            note: 'Strict mode was introduced in ES5 (2009). The reason it uses a string literal (`\'use strict\'`) rather than a keyword is backward compatibility -- older engines that do not understand strict mode simply see a string expression with no side effects and ignore it.',
            analogy: 'Think of it like the difference between a casual spelling checker and a strict grammar checker: without strict mode, JavaScript lets you get away with sloppy code, while strict mode underlines every mistake in red.',
            codeHighlightLines: [1],
          },
        ],
        quiz: [
          {
            question: 'Which console method renders arrays of objects as a formatted table?',
            options: [
              'console.log()',
              'console.table()',
              'console.dir()',
              'console.format()',
            ],
            correctIndex: 1,
            explanation:
              'console.table() renders arrays and objects as readable, formatted tables in the console.',
          },
          {
            question: 'What does console.time() / console.timeEnd() measure?',
            options: [
              'Memory usage of a code block',
              'The current date and time',
              'Elapsed time between the two calls',
              'CPU cycles consumed',
            ],
            correctIndex: 2,
            explanation:
              'console.time(label) starts a timer and console.timeEnd(label) stops it, printing the elapsed time in milliseconds.',
          },
          {
            question: 'What does "use strict" do at the top of a JavaScript file?',
            options: [
              'Enables TypeScript mode',
              'Turns silent failures into thrown errors and prevents some unsafe actions',
              'Makes the code run faster',
              'Disables all console output',
            ],
            correctIndex: 1,
            explanation:
              'Strict mode converts silent errors into thrown errors, prevents accidental global variables, and disallows some unsafe syntax.',
          },
          {
            question: 'In ES modules (import/export), is strict mode enabled automatically?',
            options: [
              'No, you must always add "use strict"',
              'Yes, ES modules are always in strict mode',
              'Only in Node.js, not in browsers',
              'Only if you add type="strict" to the script tag',
            ],
            correctIndex: 1,
            explanation:
              'ES modules are automatically in strict mode. You only need the "use strict" directive for classic scripts and CommonJS files.',
          },
        ],
        challenge: {
          prompt:
            'Write a function called formatScores that takes an array of objects with "name" and "score" properties, logs them using console.table(), and then logs each entry formatted as "Name: <name>, Score: <score>" using template literals and padEnd for alignment.',
          starterCode: `function formatScores(students) {
  // TODO: Log the students array as a table

  // TODO: Loop through students and log each one
  // Format: "Name: <name padded to 10 chars>, Score: <score>"
}

formatScores([
  { name: 'Alice', score: 95 },
  { name: 'Bob', score: 87 },
  { name: 'Charlie', score: 92 },
]);`,
          solutionCode: `function formatScores(students) {
  console.table(students);

  for (const student of students) {
    const name = student.name.padEnd(10);
    console.log(\`Name: \${name}, Score: \${student.score}\`);
  }
}

formatScores([
  { name: 'Alice', score: 95 },
  { name: 'Bob', score: 87 },
  { name: 'Charlie', score: 92 },
]);`,
          hints: [
            'Use console.table() to display the array as a table.',
            'Use a for...of loop to iterate through the students array.',
            'Use padEnd(10) on the name string to ensure consistent alignment.',
          ],
        },
      },
      {
        id: 'variables-and-types',
        title: 'Variables & Types',
        difficulty: 'beginner',
        tags: ['variables', 'let', 'const', 'var', 'scope', 'types'],
        cheatSheetSummary: 'Use const by default, let for reassignment, avoid var. JS has 7 primitive types.',
        sections: [
          {
            heading: 'Declaring Variables: let, const, var',
            content:
              'JavaScript gives you three ways to declare variables, and choosing the right one matters more than you might think. Think of `const` like writing in permanent marker -- once you assign a value, you cannot reassign it. This is your default choice for most things, because it makes your code predictable and communicates "this value will not change." Use `let` when you genuinely need to reassign a variable -- loop counters, accumulators, values that get updated over time. Think of `let` as writing in pencil: you can erase and rewrite. Then there is `var`, the original way to declare variables from JavaScript\'s early days. Here is the problem with `var`: it is function-scoped, not block-scoped. That means a variable declared with `var` inside an `if` block leaks out into the surrounding function, leading to subtle and maddening bugs. In modern JavaScript, there is almost never a reason to use `var`. One crucial subtlety: `const` does NOT mean the value is immutable -- it means the *binding* cannot be reassigned. A `const` array can still have items pushed into it, and a `const` object can still have its properties modified. The reference is locked, but the contents are free to change.',
            code: `// const — cannot be reassigned (use by default)
const PI = 3.14159;
const name = 'Alice';
// PI = 3; // TypeError: Assignment to constant variable

// const does NOT mean immutable — objects/arrays can be modified
const arr = [1, 2, 3];
arr.push(4); // OK — modifying the array, not the binding
console.log(arr); // [1, 2, 3, 4]

// let — block-scoped, can be reassigned
let count = 0;
count = count + 1;
console.log('count:', count);

// var — function-scoped (avoid in modern code)
var x = 10;
if (true) {
  var x = 20; // same variable! overwrites outer x
}
console.log('var x:', x); // 20 (surprising!)

// let respects block scope
let y = 10;
if (true) {
  let y = 20; // different variable
}
console.log('let y:', y); // 10 (expected)`,
            output: `[1, 2, 3, 4]
count: 1
var x: 20
let y: 10`,
            tip: 'Default to const everywhere. Only use let when you genuinely need to reassign the variable (loop counters, accumulators). Never use var in new code.',
            warning: 'A common misconception: `const` does NOT make objects or arrays immutable. `const obj = { x: 1 }; obj.x = 2;` works perfectly fine. If you need true immutability, use `Object.freeze()` -- but be aware it is only shallow (nested objects remain mutable).',
            diagram: {
              kind: 'mermaid',
              code: `graph TD
  A["var x = 10"] -->|"function-scoped"| B["Visible in entire function"]
  C["let y = 10"] -->|"block-scoped"| D["Visible only inside { }"]
  E["const z = 10"] -->|"block-scoped + no reassign"| F["Visible only inside { }, cannot rebind"]
  style A fill:#f66,stroke:#333
  style C fill:#6af,stroke:#333
  style E fill:#6c6,stroke:#333`,
              caption: 'var leaks out of blocks, while let and const stay contained',
            },
            codeHighlightLines: [1, 2, 11, 12, 17, 18, 19],
          },
          {
            heading: 'Primitive Types',
            content:
              'JavaScript has seven primitive types, and understanding them is like learning the periodic table of JavaScript -- everything in the language is built on top of these. Primitives are *immutable* (you cannot change the string `"hello"` in place) and are *compared by value* (two separate strings containing `"hello"` are equal). The `typeof` operator is your detective tool for identifying types at runtime, though it has one famous bug that has been around since 1995 and will never be fixed: `typeof null` returns `"object"` instead of `"null"`. This happened because of how values were stored in memory in the original JavaScript engine -- null was represented as the null pointer (0x00), and objects were identified by a type tag of 0, so null was mistakenly classified as an object. Understanding these types deeply will save you from countless debugging sessions, because JavaScript is dynamically typed -- variables do not have types, *values* do. The same variable can hold a string one moment and a number the next.',
            code: `// string — text data
const greeting = 'Hello';
console.log(typeof greeting); // 'string'

// number — 64-bit floating point (IEEE 754)
const integer = 42;
const float = 3.14;
console.log(typeof integer); // 'number'

// bigint — arbitrary precision integers (ES2020)
const huge = 9007199254740993n;
console.log(typeof huge); // 'bigint'

// boolean
const yes = true;
console.log(typeof yes); // 'boolean'

// null — intentional absence of value
const empty = null;
console.log(typeof empty); // 'object' (historic bug!)

// undefined — variable declared but not assigned
let x;
console.log(typeof x); // 'undefined'

// symbol — unique identifier
const id = Symbol('description');
console.log(typeof id); // 'symbol'`,
            output: `string
number
bigint
boolean
object
undefined
symbol`,
            tip: 'JavaScript has only one number type (64-bit float). Integers are safe up to 2^53 - 1 (Number.MAX_SAFE_INTEGER = 9007199254740991). Use BigInt for larger values.',
            note: 'You might wonder why `typeof null === "object"` was never fixed. The TC39 committee (the group that maintains JavaScript) actually proposed a fix in 2006, but it was rejected because too much existing code on the web relied on this behavior. Fixing it would have broken countless websites. This is a perfect example of backward compatibility shaping a language.',
            analogy: 'Think of it like atoms in chemistry: primitives are the fundamental building blocks (hydrogen, oxygen, carbon) that cannot be broken down further, and everything else (objects, arrays, functions) is a molecule assembled from these atoms.',
          },
          {
            heading: 'Reference Types: Objects and Arrays',
            content:
              'Beyond primitives, JavaScript has reference types -- and this distinction is one of the most important concepts you will encounter. While primitives are compared by *value* (like comparing the actual text on two pieces of paper), reference types are compared by *reference* (like comparing the addresses of two houses -- even if the houses look identical, they are at different addresses). This means two objects with identical content are NOT equal unless they are literally the same object in memory. Think of it this way: when you assign an object to a variable, the variable does not contain the object itself -- it contains a *pointer* (a reference) to where that object lives in memory. Arrays are actually a special type of object with numeric keys and a magic `length` property. And here is a fun fact: functions in JavaScript are also objects! You can attach properties to them, pass them around, and store them in variables. This "functions are first-class objects" concept is one of the things that makes JavaScript so flexible and powerful.',
            code: `// Objects — key-value pairs
const person = { name: 'Alice', age: 30 };
console.log(typeof person); // 'object'

// Arrays — ordered collections
const nums = [1, 2, 3];
console.log(typeof nums); // 'object' (arrays are objects)
console.log(Array.isArray(nums)); // true

// Reference comparison
const a = { x: 1 };
const b = { x: 1 };
const c = a;
console.log(a === b); // false (different objects)
console.log(a === c); // true (same reference)

// Functions are objects too
function greet() { return 'hi'; }
console.log(typeof greet); // 'function'
greet.customProp = 42;
console.log(greet.customProp); // 42`,
            output: `object
object
true
false
true
function
42`,
            tip: 'Use Array.isArray() to check if a value is an array, since typeof returns "object" for both arrays and plain objects.',
            warning: 'Because objects are compared by reference, `{ x: 1 } === { x: 1 }` is `false`. This catches many beginners off guard, especially when checking if arrays are "equal." To compare object contents, you need a deep equality check -- use `JSON.stringify()` for simple cases or a library like Lodash\'s `_.isEqual()` for robust comparison.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  { label: 'Variable a', value: '→ ref 0x01', color: '#4ade80' },
                  { label: 'Variable b', value: '→ ref 0x02', color: '#f87171' },
                  { label: 'Variable c', value: '→ ref 0x01', color: '#4ade80' },
                  { label: 'Heap 0x01', value: '{ x: 1 }', color: '#93c5fd' },
                  { label: 'Heap 0x02', value: '{ x: 1 }', color: '#93c5fd' },
                ],
              },
              caption: 'Variables a and c point to the same object in memory (0x01), while b points to a different object (0x02), even though both contain { x: 1 }',
            },
            codeHighlightLines: [11, 12, 13, 14, 15],
          },
        ],
        quiz: [
          {
            question: 'What is the key difference between let and var?',
            options: [
              'let is faster than var',
              'let is block-scoped while var is function-scoped',
              'var cannot be reassigned',
              'let can only hold strings',
            ],
            correctIndex: 1,
            explanation:
              'let is block-scoped (visible only inside the enclosing { }), while var is function-scoped and leaks out of blocks like if/for.',
          },
          {
            question: 'What does const prevent?',
            options: [
              'Modifying the properties of an object',
              'Adding items to an array',
              'Reassigning the variable binding',
              'All mutations of any kind',
            ],
            correctIndex: 2,
            explanation:
              'const prevents reassignment of the variable binding, but does NOT make the value immutable. A const array can still have items pushed into it.',
          },
          {
            question: 'What does typeof null return?',
            options: [
              '"null"',
              '"undefined"',
              '"object"',
              '"boolean"',
            ],
            correctIndex: 2,
            explanation:
              'typeof null returns "object" due to a historic bug from JavaScript\'s first implementation in 1995 that can never be fixed.',
          },
          {
            question: 'How do you correctly check if a value is an array?',
            options: [
              'typeof value === "array"',
              'value instanceof Object',
              'Array.isArray(value)',
              'value.type === "array"',
            ],
            correctIndex: 2,
            explanation:
              'Array.isArray() is the correct way because typeof returns "object" for both arrays and plain objects.',
          },
        ],
        challenge: {
          prompt:
            'Create three variables: a const object called "config" with properties "theme" (string) and "version" (number), a let variable called "counter" initialized to 0, and demonstrate that you can modify the const object\'s properties but cannot reassign the const binding. Increment the counter and log all values.',
          starterCode: `// TODO: Create a const object called config with theme and version

// TODO: Create a let variable called counter initialized to 0

// TODO: Modify config.theme to 'dark'

// TODO: Increment counter by 1

// TODO: Log config and counter
// Try uncommenting the line below — it should cause an error:
// config = { theme: 'new', version: 2 };`,
          solutionCode: `const config = { theme: 'light', version: 1 };
let counter = 0;

config.theme = 'dark';
counter += 1;

console.log('Config:', config);
console.log('Counter:', counter);
// config = { theme: 'new', version: 2 }; // TypeError: Assignment to constant variable`,
          hints: [
            'Use const for the config object and let for the counter variable.',
            'You can modify properties of a const object (config.theme = "dark") because const only prevents reassignment of the binding.',
            'Use += 1 or ++ to increment the counter.',
          ],
        },
      },
    ],
  },
  /* ------------------------------------------------------------ */
  /*  Data Types                                                   */
  /* ------------------------------------------------------------ */
  {
    id: 'js-data-types',
    label: 'Data Types',
    icon: 'Database',
    entries: [
      {
        id: 'numbers',
        title: 'Numbers',
        difficulty: 'beginner',
        tags: ['number', 'integer', 'float', 'math', 'arithmetic'],
        cheatSheetSummary: 'All numbers are 64-bit floats. Safe integers up to 2^53 - 1.',
        sections: [
          {
            heading: 'Number Basics',
            content:
              'Here is something that surprises people coming from other languages: JavaScript has just ONE number type. Whether you write `42` or `42.0`, it is the same 64-bit IEEE 754 floating-point number under the hood. There are no separate `int`, `float`, or `double` types -- just `number`. This simplicity is mostly a blessing (no worrying about integer overflow or type widening), but it does come with quirks. You get three special numeric values: `Infinity` (try dividing by zero), `-Infinity`, and the enigmatic `NaN` (Not a Number). And NaN has the distinction of being the only value in JavaScript that is not equal to itself -- `NaN === NaN` is `false`. Yes, really. This is actually part of the IEEE 754 specification, not a JavaScript-specific oddity, but it still catches everyone off guard the first time. You can write numbers in several formats: decimal (everyday use), hexadecimal with `0x` (great for colors and bitmasks), octal with `0o`, binary with `0b`, and scientific notation with `e`. ES2021 even added numeric separators (underscores) so you can write `1_000_000` instead of squinting at `1000000`.',
            code: `// Integer and float are the same type
console.log(typeof 42);       // 'number'
console.log(typeof 3.14);     // 'number'
console.log(42 === 42.0);     // true

// Different notations
console.log(0xFF);   // 255 (hexadecimal)
console.log(0o77);   // 63 (octal)
console.log(0b1010); // 10 (binary)
console.log(1e6);    // 1000000 (scientific)

// Readable large numbers with underscores (ES2021)
const billion = 1_000_000_000;
console.log(billion); // 1000000000

// Special values
console.log(Infinity);          // Infinity
console.log(-Infinity);         // -Infinity
console.log(NaN);               // NaN
console.log(typeof NaN);        // 'number' (ironic!)
console.log(NaN === NaN);       // false (NaN is not equal to itself)
console.log(Number.isNaN(NaN)); // true (proper check)`,
            output: `number
number
true
255
63
10
1000000
1000000000
Infinity
-Infinity
NaN
number
false
true`,
            tip: 'Always use Number.isNaN() to check for NaN, not the global isNaN() function. The global version coerces its argument to a number first, leading to unexpected results like isNaN("hello") returning true.',
            warning: 'The fact that `typeof NaN` returns `"number"` is one of JavaScript\'s most ironic quirks. "Not a Number" is, technically, a number. This is because NaN is a special IEEE 754 floating-point value -- it is the *result* of a numeric operation that did not produce a meaningful number (like `0 / 0` or `parseInt("abc")`).',
            analogy: 'Think of it like a universal measuring tape: whether you are measuring millimeters or kilometers, JavaScript uses the same ruler (64-bit float) for everything, which is convenient but means extreme precision at very large or very small scales can get fuzzy.',
          },
          {
            heading: 'Arithmetic and Math Object',
            content:
              'JavaScript gives you all the standard arithmetic operators you would expect: `+` for addition, `-` for subtraction, `*` for multiplication, `/` for division, `%` for the remainder, and `**` for exponentiation (raising to a power). For anything more advanced, there is the `Math` object -- think of it as your built-in scientific calculator. It is packed with constants like `Math.PI` and `Math.E`, and functions for rounding (`Math.round`, `Math.floor`, `Math.ceil`), trigonometry (`Math.sin`, `Math.cos`), random numbers (`Math.random()`), and much more. One thing to note: `Math` is not a constructor -- you never write `new Math()`. You just call its methods directly. The most common recipe you will use is generating random integers in a range: `Math.floor(Math.random() * (max - min + 1)) + min`. You will use this pattern so often it is worth committing to memory.',
            code: `// Arithmetic operators
console.log(10 + 3);   // 13
console.log(10 - 3);   // 7
console.log(10 * 3);   // 30
console.log(10 / 3);   // 3.3333...
console.log(10 % 3);   // 1 (remainder)
console.log(2 ** 10);  // 1024 (exponentiation)

// Math object
console.log(Math.PI);            // 3.141592653589793
console.log(Math.round(4.7));    // 5
console.log(Math.floor(4.7));    // 4
console.log(Math.ceil(4.2));     // 5
console.log(Math.abs(-15));      // 15
console.log(Math.sqrt(144));     // 12
console.log(Math.max(5, 10, 3)); // 10
console.log(Math.min(5, 10, 3)); // 3

// Random number between 1 and 10
const random = Math.floor(Math.random() * 10) + 1;
console.log('Random:', random);`,
            output: `13
7
30
3.3333333333333335
1
1024
3.141592653589793
5
4
5
15
12
10
3
Random: 7`,
            tip: 'Floating-point math can be imprecise: 0.1 + 0.2 === 0.30000000000000004. For currency, use integers representing cents, or a library like decimal.js.',
            warning: 'The `%` operator in JavaScript is a *remainder* operator, not a true *modulo* operator. The difference matters with negative numbers: `-7 % 3` gives `-1` in JavaScript (remainder), but in Python it gives `2` (modulo). If you need true modulo behavior, use `((n % m) + m) % m`.',
            codeHighlightLines: [6, 7, 20],
          },
          {
            heading: 'Number Methods and Parsing',
            content:
              'Numbers in JavaScript come with several handy methods for formatting and conversion. `toFixed()` is your go-to for controlling decimal places (perfect for prices and percentages) -- but watch out, it returns a *string*, not a number. `toPrecision()` controls the total number of significant digits. And `toString()` with a radix argument lets you convert numbers to any base -- hex, binary, octal, you name it. For the reverse journey -- turning strings into numbers -- you have three main tools. `parseInt()` is lenient: it reads from the start of a string and stops at the first non-numeric character, so `parseInt("42px")` gives you `42`. `parseFloat()` works similarly for decimals. `Number()` is the strict option: give it anything it cannot fully convert and you get `NaN`. Knowing when to use which is key. Use `Number()` when you want strict validation, and `parseInt()`/`parseFloat()` when you are parsing values from messy real-world input like CSS values or user data.',
            code: `// Number formatting
const price = 19.956;
console.log(price.toFixed(2));      // '19.96' (string)
console.log(price.toPrecision(4));  // '19.96' (string)
console.log((255).toString(16));    // 'ff' (hex)
console.log((255).toString(2));     // '11111111' (binary)

// Parsing strings to numbers
console.log(parseInt('42'));         // 42
console.log(parseInt('42px'));       // 42 (stops at non-digit)
console.log(parseInt('0xFF', 16));   // 255
console.log(parseFloat('3.14'));     // 3.14

// Number() is stricter
console.log(Number('42'));           // 42
console.log(Number('42px'));         // NaN (strict)
console.log(Number(''));             // 0
console.log(Number(true));           // 1
console.log(Number(false));          // 0

// Safe integer range
console.log(Number.MAX_SAFE_INTEGER);  // 9007199254740991
console.log(Number.isSafeInteger(9007199254740991)); // true
console.log(Number.isSafeInteger(9007199254740992)); // false`,
            output: `19.96
19.96
ff
11111111
42
42
255
3.14
42
NaN
0
1
0
9007199254740991
true
false`,
            tip: 'parseInt() always takes an optional radix (base) parameter. Always specify it explicitly to avoid surprises: parseInt("08", 10) ensures decimal parsing.',
            warning: 'Watch out: `Number("")` returns `0`, not `NaN`. This means an empty form input would be converted to `0` rather than being flagged as invalid. Always validate inputs before converting: check for empty strings explicitly before calling `Number()`.',
          },
        ],
        quiz: [
          {
            question: 'How many number types does JavaScript have?',
            options: [
              'Three: int, float, and double',
              'Two: int and float',
              'One: all numbers are 64-bit floats',
              'Four: int, float, double, and BigInt',
            ],
            correctIndex: 2,
            explanation:
              'JavaScript has only one number type. All numbers are 64-bit IEEE 754 floating-point values, whether you write 42 or 42.0.',
          },
          {
            question: 'What does NaN === NaN evaluate to?',
            options: [
              'true',
              'false',
              'undefined',
              'TypeError',
            ],
            correctIndex: 1,
            explanation:
              'NaN is the only value in JavaScript that is not equal to itself. Use Number.isNaN() to check for NaN.',
          },
          {
            question: 'What does parseInt("42px") return?',
            options: [
              'NaN',
              '"42"',
              '42',
              'undefined',
            ],
            correctIndex: 2,
            explanation:
              'parseInt() is lenient and reads from the start of the string, stopping at the first non-numeric character. So parseInt("42px") returns 42.',
          },
        ],
        challenge: {
          prompt:
            'Write a function called randomInRange(min, max) that returns a random integer between min and max (inclusive). Then use it to generate and log 5 random numbers between 1 and 100, each formatted with toFixed(0) and padStart(3) for aligned output.',
          starterCode: `function randomInRange(min, max) {
  // TODO: Return a random integer between min and max (inclusive)
}

// TODO: Generate and log 5 random numbers between 1 and 100
// Format: "Roll 1:   42"
// Format: "Roll 2:    7"
for (let i = 1; i <= 5; i++) {
  const num = randomInRange(1, 100);
  // TODO: Log with padStart alignment
}`,
          solutionCode: `function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (let i = 1; i <= 5; i++) {
  const num = randomInRange(1, 100);
  console.log(\`Roll \${i}: \${String(num).padStart(3)}\`);
}`,
          hints: [
            'Use Math.floor(Math.random() * (max - min + 1)) + min for a random integer in a range.',
            'Convert the number to a string with String(num) before using padStart().',
            'padStart(3) will left-pad single and double digit numbers with spaces for alignment.',
          ],
        },
      },
      {
        id: 'strings',
        title: 'Strings',
        difficulty: 'beginner',
        tags: ['string', 'text', 'charAt', 'substring', 'immutable'],
        cheatSheetSummary: 'Immutable sequences of UTF-16 characters. Use single, double, or backtick quotes.',
        sections: [
          {
            heading: 'String Basics',
            content:
              'Strings are one of the most used data types in any language, and JavaScript gives you three ways to create them: single quotes (`\'hello\'`), double quotes (`"hello"`), and backticks (`` `hello` ``). Single and double quotes are interchangeable -- pick one style and be consistent. Backticks (template literals) are the modern powerhouse that we will explore in detail later. The key insight about JavaScript strings is that they are *immutable*. Once a string is created, it can never be changed in place. When you call `toUpperCase()` or `slice()`, you get a *new* string back -- the original is untouched. Think of strings as being carved in stone: you can make copies with modifications, but you cannot alter the original carving. Strings are sequences of UTF-16 code units (not characters!), which matters when you work with emoji or characters outside the Basic Multilingual Plane. The `length` property gives you the number of code units, and bracket notation (`str[0]`) lets you access individual characters. ES2022 added the `at()` method, which supports negative indices -- no more `str[str.length - 1]` to get the last character.',
            code: `// Creating strings
const single = 'Hello';
const double = "World";
const backtick = \`Hello, \${double}!\`;
console.log(backtick);

// String length and character access
const str = 'JavaScript';
console.log(str.length);    // 10
console.log(str[0]);        // 'J'
console.log(str[str.length - 1]); // 't'
console.log(str.at(-1));    // 't' (ES2022)

// Strings are immutable
const greeting = 'hello';
// greeting[0] = 'H'; // Silently fails (no error, but no change)
const fixed = 'H' + greeting.slice(1);
console.log(fixed); // 'Hello'

// Comparing strings
console.log('abc' === 'abc'); // true
console.log('abc' < 'abd');   // true (lexicographic)
console.log('a' < 'A');       // false (lowercase > uppercase in UTF-16)`,
            output: `Hello, World!
10
J
t
t
Hello
true
true
false`,
            tip: 'Use str.at(-1) (ES2022) to access the last character instead of str[str.length - 1]. It is cleaner and works with negative indices.',
            warning: 'Emoji and some international characters take up two "code units" in UTF-16. This means `"😀".length` is `2`, not `1`. If you need to count actual characters (grapheme clusters), use `[..."😀"].length` or the `Intl.Segmenter` API for full accuracy.',
            analogy: 'Think of it like a line of Scrabble tiles: each tile is a character, and the whole row is a string. You can read any tile by position, but to change a tile you must build an entirely new row from scratch.',
          },
          {
            heading: 'Common String Methods',
            content:
              'JavaScript strings come loaded with a Swiss Army knife of methods for searching, extracting, and transforming text. For searching, you have `includes()` (is this substring anywhere in here?), `startsWith()`, `endsWith()`, and `indexOf()` (where exactly is it?). For extracting parts of strings, `slice()` is your best friend -- it takes a start index, an optional end index, and even supports negative indices to count from the end. For transforming, `trim()` strips whitespace (essential for user input!), `toUpperCase()` and `toLowerCase()` change case, and `replace()` / `replaceAll()` swap out substrings. And `split()` is the bridge between strings and arrays -- pass it a delimiter and it breaks the string into an array of parts. The key thing to remember is that *every single one of these methods returns a new string*. The original string is never modified. This means you can safely chain them together without worrying about side effects: `" Hello World ".trim().toLowerCase()` gives you `"hello world"`.',
            code: `const text = '  Hello, World!  ';

// Trimming whitespace
console.log(text.trim());       // 'Hello, World!'
console.log(text.trimStart());  // 'Hello, World!  '

// Case conversion
console.log('hello'.toUpperCase()); // 'HELLO'
console.log('HELLO'.toLowerCase()); // 'hello'

// Searching
console.log('Hello World'.includes('World'));    // true
console.log('Hello World'.startsWith('Hello'));  // true
console.log('Hello World'.endsWith('World'));    // true
console.log('Hello World'.indexOf('World'));     // 6

// Extracting
console.log('Hello World'.slice(0, 5));    // 'Hello'
console.log('Hello World'.slice(-5));      // 'World'

// Replacing
console.log('foo bar foo'.replace('foo', 'baz'));    // 'baz bar foo'
console.log('foo bar foo'.replaceAll('foo', 'baz')); // 'baz bar baz'

// Splitting
console.log('a,b,c'.split(','));  // ['a', 'b', 'c']`,
            output: `Hello, World!
Hello, World!
HELLO
hello
true
true
true
6
Hello
World
baz bar foo
baz bar baz
['a', 'b', 'c']`,
            tip: 'String methods never mutate the original. They always return a new string. Chain them together for transformations: " Hello ".trim().toLowerCase() gives "hello".',
            note: 'The difference between `replace()` and `replaceAll()`: `replace()` with a plain string only replaces the *first* occurrence. Before `replaceAll()` existed (ES2021), you had to use a regex with the global flag: `str.replace(/foo/g, "bar")`. Now `replaceAll()` makes the intent much clearer.',
          },
          {
            heading: 'String Iteration and Conversion',
            content:
              'Strings in JavaScript are *iterable*, which means you can loop over their characters with `for...of` and spread them into arrays with `[...str]`. This is incredibly useful for character-level processing. The split-process-join pattern is one of the most common string manipulation techniques: split a string into an array, transform the pieces, then join them back together. For example, reversing a string is as simple as `[...str].reverse().join("")`. When building strings inside loops, here is a performance tip that separates beginners from pros: do NOT concatenate with `+=` in each iteration. Instead, collect the pieces in an array and `join()` them at the end. Why? Because strings are immutable, each `+=` creates a brand new string, copying all previous characters. With an array, you are just appending to a list, and the final `join()` creates the string in one efficient pass.',
            code: `// Iterating over characters
for (const char of 'Hello') {
  process.stdout.write(char + ' ');
}
console.log();

// Spread into array
const chars = [...'Hello'];
console.log(chars); // ['H', 'e', 'l', 'l', 'o']

// Split and join
const csv = 'Alice,Bob,Charlie';
const names = csv.split(',');
console.log(names); // ['Alice', 'Bob', 'Charlie']
console.log(names.join(' & ')); // 'Alice & Bob & Charlie'

// Build strings efficiently
const parts = [];
for (let i = 1; i <= 5; i++) {
  parts.push(\`Item \${i}\`);
}
console.log(parts.join(', '));

// Repeat
console.log('ha'.repeat(3)); // 'hahaha'

// Pad
console.log('5'.padStart(3, '0')); // '005'
console.log('hi'.padEnd(10, '.')); // 'hi........'`,
            output: `H e l l o
['H', 'e', 'l', 'l', 'o']
['Alice', 'Bob', 'Charlie']
Alice & Bob & Charlie
Item 1, Item 2, Item 3, Item 4, Item 5
hahaha
005
hi........`,
            tip: 'When building strings in a loop, collect parts in an array and use join(). This is much faster than repeated string concatenation with += for large strings.',
            note: '`padStart()` and `padEnd()` are incredibly useful for formatting output: zero-padding numbers (`"5".padStart(3, "0")` gives `"005"`), aligning columns in CLI tools, and formatting timestamps. They were added in ES2017.',
          },
        ],
        quiz: [
          {
            question: 'Are JavaScript strings mutable or immutable?',
            options: [
              'Mutable -- you can change characters in place',
              'Immutable -- string methods return new strings',
              'Mutable only with let, immutable with const',
              'It depends on the string length',
            ],
            correctIndex: 1,
            explanation:
              'JavaScript strings are immutable. Methods like toUpperCase() and slice() always return a new string; the original is never modified.',
          },
          {
            question: 'What does "Hello World".slice(-5) return?',
            options: [
              '"Hello"',
              '"World"',
              '"orld"',
              '" Worl"',
            ],
            correctIndex: 1,
            explanation:
              'slice() with a negative index counts from the end. slice(-5) extracts the last 5 characters: "World".',
          },
          {
            question: 'What is the difference between replace() and replaceAll() with a plain string?',
            options: [
              'They are identical',
              'replace() replaces all occurrences, replaceAll() replaces only the first',
              'replace() replaces only the first occurrence, replaceAll() replaces all',
              'replaceAll() is case-insensitive',
            ],
            correctIndex: 2,
            explanation:
              'replace() with a plain string only replaces the first occurrence. replaceAll() (ES2021) replaces every occurrence.',
          },
          {
            question: 'What is the most efficient way to build a string inside a loop?',
            options: [
              'Use += concatenation in each iteration',
              'Use String.concat() in each iteration',
              'Collect parts in an array and join() at the end',
              'Use document.write()',
            ],
            correctIndex: 2,
            explanation:
              'Since strings are immutable, += creates a new string each iteration. Collecting parts in an array and using join() at the end is much more efficient.',
          },
        ],
        challenge: {
          prompt:
            'Write a function called capitalizeWords(str) that takes a sentence and returns it with the first letter of each word capitalized. Use split(), map(), and join().',
          starterCode: `function capitalizeWords(str) {
  // TODO: Split the string into words
  // TODO: Capitalize the first letter of each word
  // TODO: Join the words back together
}

console.log(capitalizeWords('hello world'));
// Expected: 'Hello World'
console.log(capitalizeWords('the quick brown fox'));
// Expected: 'The Quick Brown Fox'`,
          solutionCode: `function capitalizeWords(str) {
  return str
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

console.log(capitalizeWords('hello world'));
console.log(capitalizeWords('the quick brown fox'));`,
          hints: [
            'Split the string by spaces using split(" ") to get an array of words.',
            'For each word, use word[0].toUpperCase() to capitalize the first letter, then add word.slice(1) for the rest.',
            'Use join(" ") to reassemble the words with spaces.',
          ],
        },
      },
      {
        id: 'template-literals',
        title: 'Template Literals',
        difficulty: 'beginner',
        tags: ['template', 'backtick', 'interpolation', 'multiline', 'tagged'],
        cheatSheetSummary: 'Backtick strings with ${expression} interpolation and multi-line support.',
        sections: [
          {
            heading: 'String Interpolation',
            content:
              'If there is one feature of modern JavaScript that you will use every single day, it is template literals. Wrapped in backticks instead of quotes, they let you embed expressions directly inside strings using `${}` syntax. No more clunky string concatenation with `+` signs and accidentally forgetting spaces. Any valid JavaScript expression goes inside those curly braces: variables, function calls, math, ternary operators -- even other template literals. The result is code that reads almost like plain English. Compare `"Hello, " + name + "! You are " + age + " years old."` with `` `Hello, ${name}! You are ${age} years old.` `` -- the template literal version is dramatically more readable and less error-prone. Once you start using template literals, you will never want to go back to string concatenation. They are the preferred way to build strings in modern JavaScript, and most style guides and linters will point you toward them.',
            code: `const name = 'Alice';
const age = 30;

// String interpolation
const message = \`Hello, \${name}! You are \${age} years old.\`;
console.log(message);

// Expressions inside \${}
console.log(\`Next year you'll be \${age + 1}\`);
console.log(\`Is adult: \${age >= 18 ? 'yes' : 'no'}\`);
console.log(\`Uppercase: \${name.toUpperCase()}\`);

// Comparison with concatenation (old way)
const old = 'Hello, ' + name + '! You are ' + age + ' years old.';
console.log(old); // Same result, but harder to read`,
            output: `Hello, Alice! You are 30 years old.
Next year you'll be 31
Is adult: yes
Uppercase: ALICE
Hello, Alice! You are 30 years old.`,
            tip: 'Template literals are the preferred way to build strings in modern JavaScript. They are more readable and less error-prone than string concatenation with +.',
            note: 'You can nest template literals inside each other: `` `Hello ${`${firstName} ${lastName}`}` ``. This is occasionally useful but can hurt readability -- if your template is getting complex, extract the expression into a variable first.',
          },
          {
            heading: 'Multi-line Strings',
            content:
              'Before template literals, creating multi-line strings in JavaScript was painful -- you had to chain strings together with `+` and manually insert `\\n` for line breaks. Template literals changed everything: just press Enter inside your backticks, and the line break is preserved in the resulting string. This makes them perfect for HTML templates, SQL queries, email bodies, and any text that naturally spans multiple lines. One thing to be mindful of: the whitespace and indentation inside template literals is part of the string. If you indent your template literal to match your code formatting, those leading spaces become part of the output. A quick `.trim()` at the end removes any leading/trailing whitespace, and for more control, you can use a dedent utility or start your content right after the opening backtick.',
            code: `// Multi-line strings preserve whitespace and newlines
const html = \`
  <div class="card">
    <h2>Alice</h2>
    <p>Age: 30</p>
  </div>
\`;
console.log(html);

// Without template literals (old way)
const oldHtml = '<div class="card">\\n' +
  '  <h2>Alice</h2>\\n' +
  '  <p>Age: 30</p>\\n' +
  '</div>';
console.log(oldHtml);

// Practical: SQL query
const table = 'users';
const query = \`
  SELECT name, email
  FROM \${table}
  WHERE active = true
  ORDER BY name ASC
\`;
console.log(query.trim());`,
            output: `
  <div class="card">
    <h2>Alice</h2>
    <p>Age: 30</p>
  </div>

<div class="card">
  <h2>Alice</h2>
  <p>Age: 30</p>
</div>
SELECT name, email
  FROM users
  WHERE active = true
  ORDER BY name ASC`,
            tip: 'Use .trim() on template literals that start with a newline to remove the leading whitespace. Alternatively, start your content on the same line as the opening backtick.',
            warning: 'Never inject user input directly into SQL queries via template literals -- this is a SQL injection vulnerability. Template literals make string building easy, but they provide no sanitization. Always use parameterized queries when working with databases.',
          },
          {
            heading: 'Tagged Template Literals',
            content:
              'Tagged template literals are one of JavaScript\'s most powerful and underappreciated features. Here is the idea: you can place a function name directly before a template literal (no parentheses!), and JavaScript will call that function with the string parts and interpolated values as separate arguments. The tag function receives an array of the raw string segments and the evaluated expressions, and can process them however it wants -- returning a string, an object, a DOM element, anything. This might sound abstract, so let\'s make it concrete: `styled-components` uses tagged templates to write CSS in JavaScript (`` css`color: ${primary}` ``). GraphQL uses them to parse queries (`` gql`{ user { name } }` ``). And the `html` tag in lit-html builds efficient DOM templates. You can write your own tag functions too -- the example below shows how to build a safe HTML escaper that prevents XSS attacks. Once you understand tagged templates, you will start seeing them everywhere in modern JavaScript libraries.',
            code: `// Tagged template literal
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] !== undefined
      ? \`**\${values[i]}**\` : '');
  }, '');
}

const name = 'Alice';
const score = 95;
const output = highlight\`Student \${name} scored \${score} points\`;
console.log(output);

// Practical: safe HTML escaping
function safeHtml(strings, ...values) {
  const escape = (s) => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return strings.reduce((result, str, i) =>
    result + str + (values[i] !== undefined ? escape(values[i]) : ''), '');
}

const userInput = '<script>alert("xss")</script>';
console.log(safeHtml\`<p>User said: \${userInput}</p>\`);`,
            output: `Student **Alice** scored **95** points
<p>User said: &lt;script&gt;alert("xss")&lt;/script&gt;</p>`,
            tip: 'Tagged templates are how styled-components (css`...`), GraphQL (gql`...`), and lit-html (html`...`) work. The tag function can return anything, not just strings.',
            note: 'The tag function also receives a special `strings.raw` property containing the raw, unprocessed string segments (backslash sequences are not interpreted). The built-in `String.raw` tag uses this: `` String.raw`\\n` `` returns the literal characters `\\n` (two characters), not a newline.',
            diagram: {
              kind: 'mermaid',
              code: `graph LR
  A["highlight\`Student \${name} scored \${score}\`"] --> B["Tag Function"]
  B --> C["strings: ['Student ', ' scored ', ' points']"]
  B --> D["values: ['Alice', 95]"]
  C --> E["Interleave + Transform"]
  D --> E
  E --> F["'Student **Alice** scored **95** points'"]`,
              caption: 'A tagged template splits the literal into string segments and interpolated values, passing both to the tag function',
            },
            codeHighlightLines: [2, 3, 4, 5, 11],
          },
        ],
        quiz: [
          {
            question: 'What syntax is used for template literal interpolation?',
            options: [
              '#{expression}',
              '${expression} inside backticks',
              '%(expression) inside quotes',
              '{expression} inside double quotes',
            ],
            correctIndex: 1,
            explanation:
              'Template literals use backticks (`) with ${expression} syntax to embed JavaScript expressions directly into strings.',
          },
          {
            question: 'What is a tagged template literal?',
            options: [
              'A template literal with an HTML tag inside it',
              'A template literal with a label comment',
              'A function called with a template literal that receives string parts and values as arguments',
              'A template literal that is cached for performance',
            ],
            correctIndex: 2,
            explanation:
              'A tagged template places a function name before a template literal. The function receives the string segments and interpolated values as separate arguments.',
          },
          {
            question: 'Do template literals preserve whitespace and newlines?',
            options: [
              'No, whitespace is automatically trimmed',
              'Yes, all whitespace and newlines are part of the string',
              'Only newlines are preserved, not spaces',
              'Only if you use the raw tag',
            ],
            correctIndex: 1,
            explanation:
              'Template literals preserve all whitespace and newlines exactly as written. Use .trim() to remove leading/trailing whitespace if needed.',
          },
        ],
        challenge: {
          prompt:
            'Create a tagged template literal function called currency that formats interpolated numbers as USD currency (e.g., $1,234.56) while leaving string values untouched.',
          starterCode: `function currency(strings, ...values) {
  // TODO: Interleave strings and values
  // TODO: Format number values as USD currency
  // Hint: use toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

const item = 'Widget';
const price = 1234.5;
const tax = 98.76;
console.log(currency\`Item: \${item}, Price: \${price}, Tax: \${tax}\`);
// Expected: "Item: Widget, Price: $1,234.50, Tax: $98.76"`,
          solutionCode: `function currency(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i];
    if (value === undefined) return result + str;
    const formatted = typeof value === 'number'
      ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      : value;
    return result + str + formatted;
  }, '');
}

const item = 'Widget';
const price = 1234.5;
const tax = 98.76;
console.log(currency\`Item: \${item}, Price: \${price}, Tax: \${tax}\`);`,
          hints: [
            'Use strings.reduce() to interleave string segments with processed values.',
            'Check typeof value === "number" to decide whether to format as currency.',
            'Use value.toLocaleString("en-US", { style: "currency", currency: "USD" }) for formatting.',
          ],
        },
      },
      {
        id: 'booleans',
        title: 'Booleans',
        difficulty: 'beginner',
        tags: ['boolean', 'true', 'false', 'truthy', 'falsy', 'logic'],
        cheatSheetSummary: 'true/false values. Six falsy values: false, 0, "", null, undefined, NaN.',
        sections: [
          {
            heading: 'Boolean Values and Truthy/Falsy',
            content:
              'JavaScript has two boolean values, `true` and `false`, but here is where things get interesting: *any* value in JavaScript can behave as a boolean when used in a conditional context. JavaScript will automatically coerce values to `true` (truthy) or `false` (falsy). You need to memorize the six falsy values -- they are the only values that coerce to `false`: `false` itself, `0` (and `-0` and `0n`), `""` (empty string), `null`, `undefined`, and `NaN`. Everything else is truthy. And I mean *everything*: empty arrays `[]`, empty objects `{}`, the string `"0"`, the string `"false"` -- all truthy. This catches many people off guard. Think of it this way: JavaScript considers "something exists and has substance" as truthy, while "nothing, zero, or empty text" is falsy. Understanding truthy/falsy is essential because it is baked into every `if` statement, every `&&` and `||` expression, and every ternary operator you write. Master this, and a huge class of JavaScript behavior suddenly makes sense.',
            code: `// Boolean literals
console.log(true);
console.log(false);
console.log(typeof true); // 'boolean'

// Falsy values — these all evaluate to false
console.log(Boolean(false));     // false
console.log(Boolean(0));         // false
console.log(Boolean(''));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false

// Truthy surprises — these are all truthy!
console.log(Boolean([]));    // true (empty array)
console.log(Boolean({}));    // true (empty object)
console.log(Boolean('0'));   // true (non-empty string)
console.log(Boolean('false')); // true (non-empty string)
console.log(Boolean(-1));    // true (non-zero)`,
            output: `true
false
boolean
false
false
false
false
false
false
true
true
true
true
true`,
            tip: 'The double NOT operator (!!) is a common shorthand for converting any value to its boolean equivalent: !!0 is false, !!"hello" is true. It is equivalent to Boolean().',
            warning: 'Empty arrays `[]` are truthy! This means `if ([]) { ... }` WILL execute. If you want to check for an empty array, test `if (arr.length > 0)` or `if (arr.length)` instead. Same for objects: `if (Object.keys(obj).length)` checks if an object has any properties.',
            analogy: 'Think of it like a light switch test: falsy values are situations where the room is "off" (no power, unplugged, broken bulb), while truthy values are anything where the light is "on," even if it is just a dim nightlight.',
            diagram: {
              kind: 'mermaid',
              code: `graph TD
  A["Any JavaScript Value"] --> B{"Is it one of the 6 falsy values?"}
  B -->|"false, 0, '', null, undefined, NaN"| C["Falsy (coerces to false)"]
  B -->|"Everything else"| D["Truthy (coerces to true)"]
  D --> E["[], {}, '0', 'false', -1, Infinity, ..."]
  style C fill:#f66,stroke:#333
  style D fill:#6c6,stroke:#333`,
              caption: 'JavaScript coerces any value to boolean — only 6 specific values are falsy',
            },
          },
          {
            heading: 'Logical Operators',
            content:
              'Let\'s talk about a JavaScript superpower that confuses most beginners: the logical operators `&&`, `||`, and `!` do NOT necessarily return `true` or `false`. Wait, what? Here is how they actually work. The `&&` (AND) operator evaluates left to right and returns the *first falsy value* it encounters, or the *last value* if all are truthy. The `||` (OR) operator does the opposite: it returns the *first truthy value*, or the *last value* if all are falsy. Only `!` (NOT) always returns a boolean. This behavior is called *short-circuit evaluation* and it unlocks some elegant patterns. Using `||` for default values: `const name = userInput || "Anonymous"` -- if `userInput` is falsy, use the default. Using `&&` as a guard: `user && user.name` -- only access `.name` if `user` is truthy. These patterns are idiomatic JavaScript and you will see them everywhere. Once you internalize how short-circuit evaluation works, you will write more concise, expressive code.',
            code: `// Logical AND (&&) — returns first falsy or last truthy
console.log('hello' && 42);     // 42 (both truthy, returns last)
console.log(0 && 'hello');      // 0 (short-circuits on first falsy)
console.log('' && 'hello');     // '' (short-circuits on first falsy)

// Logical OR (||) — returns first truthy or last falsy
console.log(0 || 'default');    // 'default'
console.log('hello' || 42);    // 'hello' (returns first truthy)
console.log('' || 0 || null);  // null (all falsy, returns last)

// Logical NOT (!) — always returns boolean
console.log(!true);     // false
console.log(!0);        // true
console.log(!'hello');  // false

// Practical: default values
const username = '' || 'Anonymous';
console.log(username); // 'Anonymous'

// Guard clause
const user = { name: 'Alice' };
const displayName = user && user.name;
console.log(displayName); // 'Alice'`,
            output: `42
0

default
hello
null
false
true
false
Anonymous
Alice`,
            tip: 'Use ?? (nullish coalescing) instead of || for default values when 0 or empty string are valid values. The || operator treats all falsy values as missing.',
            warning: 'Using `||` for defaults has a subtle trap: `const port = config.port || 3000` will use 3000 if `config.port` is `0` -- because `0` is falsy! If `0` is a valid value, use `??` (nullish coalescing) instead: `const port = config.port ?? 3000`, which only falls through on `null` or `undefined`.',
            diagram: {
              kind: 'mermaid',
              code: `graph LR
  subgraph "AND (&&)"
    A1["A && B"] --> A2{"A is falsy?"}
    A2 -->|Yes| A3["Return A (short-circuit)"]
    A2 -->|No| A4["Return B"]
  end
  subgraph "OR (||)"
    B1["A || B"] --> B2{"A is truthy?"}
    B2 -->|Yes| B3["Return A (short-circuit)"]
    B2 -->|No| B4["Return B"]
  end`,
              caption: 'Short-circuit evaluation: && stops at the first falsy value, || stops at the first truthy value',
            },
            codeHighlightLines: [2, 3, 7, 8, 17],
          },
          {
            heading: 'Comparison and Equality',
            content:
              'This is where JavaScript gets weird -- or rather, this is where JavaScript\'s most notorious design decision lives. The language has TWO equality operators: `==` (loose equality, with type coercion) and `===` (strict equality, no coercion). The rule is simple: **always use `===`**. The `==` operator tries to be "helpful" by converting types before comparing, which leads to a hall of mirrors where `0 == false` is `true`, `"" == false` is `true`, and `null == undefined` is `true`, but `0 == null` is somehow `false`. The coercion rules for `==` are so complex that even experienced developers cannot predict all the edge cases from memory. With `===`, what you see is what you get: values must be the same type AND the same value. No surprises. For the truly pedantic among us, there is also `Object.is()`, which is even stricter than `===`: it distinguishes `+0` from `-0` and considers `NaN` equal to `NaN` (the only comparison where `NaN === NaN` is `false` but `Object.is(NaN, NaN)` is `true`). The one legitimate use of `==` is `value == null`, which checks for both `null` and `undefined` in one concise expression.',
            code: `// Strict equality (===) — no coercion, always use this
console.log(1 === 1);        // true
console.log(1 === '1');      // false
console.log(0 === false);    // false

// Loose equality (==) — with coercion, avoid this
console.log(1 == '1');       // true (string coerced to number)
console.log(0 == false);     // true
console.log('' == false);    // true
console.log(null == undefined); // true

// Object.is() — strictest comparison
console.log(Object.is(NaN, NaN));  // true (unlike ===)
console.log(Object.is(+0, -0));    // false (unlike ===)

// Comparison operators
console.log(5 > 3);       // true
console.log(5 >= 5);      // true
console.log('abc' < 'abd'); // true (lexicographic)`,
            output: `true
false
false
true
true
true
true
true
false
true
true
true`,
            tip: 'Always use === instead of ==. The only practical exception is checking for null or undefined together with value == null, which matches both null and undefined in one check.',
            note: 'The JavaScript equality comparison rules are so notoriously complex that there is a famous table called the "JavaScript equality table" that shows all 24x24 possible `==` comparisons. It is worth looking at once -- not to memorize, but to convince yourself to always use `===` instead.',
          },
        ],
        quiz: [
          {
            question: 'Which of the following is truthy in JavaScript?',
            options: [
              '0',
              '""',
              '[]',
              'null',
            ],
            correctIndex: 2,
            explanation:
              'Empty arrays [] are truthy in JavaScript. Only false, 0, "", null, undefined, and NaN are falsy. All objects (including empty arrays and objects) are truthy.',
          },
          {
            question: 'What does "hello" && 42 evaluate to?',
            options: [
              'true',
              '"hello"',
              '42',
              'false',
            ],
            correctIndex: 2,
            explanation:
              'The && operator returns the first falsy value or the last value if all are truthy. Since "hello" is truthy, it evaluates the right side and returns 42.',
          },
          {
            question: 'What is the difference between == and ===?',
            options: [
              'There is no difference',
              '== compares values with type coercion, === compares without coercion',
              '=== is faster but otherwise identical',
              '== only works with numbers, === works with all types',
            ],
            correctIndex: 1,
            explanation:
              '== (loose equality) converts types before comparing, so 1 == "1" is true. === (strict equality) requires both type and value to match, so 1 === "1" is false.',
          },
          {
            question: 'What does 0 || "default" evaluate to?',
            options: [
              '0',
              '"default"',
              'true',
              'false',
            ],
            correctIndex: 1,
            explanation:
              'The || operator returns the first truthy value. Since 0 is falsy, it moves to the next operand and returns "default".',
          },
        ],
        challenge: {
          prompt:
            'Write a function called getDisplayName(user) that accepts a user object with optional properties firstName, lastName, and nickname. Return the nickname if it exists, otherwise return "firstName lastName" if both exist, otherwise return "Anonymous". Use logical operators (||, &&) and/or nullish coalescing (??).',
          starterCode: `function getDisplayName(user) {
  // TODO: Return nickname if it exists
  // TODO: Return "firstName lastName" if both exist
  // TODO: Return "Anonymous" as fallback
}

console.log(getDisplayName({ nickname: 'Ace' }));
// Expected: 'Ace'
console.log(getDisplayName({ firstName: 'Alice', lastName: 'Smith' }));
// Expected: 'Alice Smith'
console.log(getDisplayName({}));
// Expected: 'Anonymous'`,
          solutionCode: `function getDisplayName(user) {
  if (user.nickname) return user.nickname;
  if (user.firstName && user.lastName) {
    return \`\${user.firstName} \${user.lastName}\`;
  }
  return 'Anonymous';
}

console.log(getDisplayName({ nickname: 'Ace' }));
console.log(getDisplayName({ firstName: 'Alice', lastName: 'Smith' }));
console.log(getDisplayName({}));`,
          hints: [
            'Check user.nickname first -- if it is truthy, return it immediately.',
            'Use && to check if both firstName and lastName exist before combining them.',
            'Use a template literal to combine firstName and lastName with a space.',
          ],
        },
      },
      {
        id: 'null-undefined',
        title: 'null & undefined',
        difficulty: 'beginner',
        tags: ['null', 'undefined', 'nullish', 'absence', 'void'],
        cheatSheetSummary: 'null = intentional absence, undefined = uninitialized. Use ?? for defaults.',
        sections: [
          {
            heading: 'null vs undefined',
            content:
              'Most languages have one way to say "nothing." JavaScript, true to form, has two: `null` and `undefined`. You might be wondering: why two? Here is the mental model that makes it click. Think of `undefined` as "this slot exists but nobody put anything in it yet." A variable you declared but did not assign? `undefined`. An object property that does not exist? `undefined`. A function that does not return anything? Returns `undefined`. It is JavaScript\'s way of saying "I have no idea what this should be." Now think of `null` as a deliberate choice: "I explicitly set this to nothing." When an API returns `null`, it is telling you "I looked, and there is nothing here." When you set a variable to `null`, you are communicating intent -- this value is intentionally empty. The practical difference matters: `undefined` usually signals a bug or an uninitialized state, while `null` signals a conscious decision. And yes, `typeof null` returns `"object"` -- this is a legendary bug from JavaScript\'s first implementation in 1995 that can never be fixed because too much code depends on it.',
            code: `// undefined — variable declared but not assigned
let x;
console.log(x);            // undefined
console.log(typeof x);     // 'undefined'

// undefined from missing property
const obj = { name: 'Alice' };
console.log(obj.age);      // undefined

// undefined from function with no return
function doNothing() {}
console.log(doNothing());  // undefined

// null — intentional absence of value
let user = null; // explicitly set to "no value"
console.log(user);          // null
console.log(typeof null);   // 'object' (historic bug!)

// Checking for null and undefined
console.log(null === undefined);  // false
console.log(null == undefined);   // true (only case where == is useful)

// Practical null check
function getUser(id) {
  if (id === 0) return null; // no user found
  return { id, name: 'Alice' };
}
const result = getUser(0);
console.log(result === null ? 'No user' : result.name);`,
            output: `undefined
undefined
undefined
undefined
null
object
false
true
No user`,
            tip: 'Use value == null (loose equality) to check for both null and undefined in a single expression. This is the one case where == is preferred over ===.',
            note: 'Some codebases follow the convention of using `null` for "value was looked up and not found" and `undefined` for "value was never set." For example, `Map.get()` returns `undefined` for missing keys, while `document.getElementById()` returns `null` when no element matches. Understanding this distinction helps you debug faster.',
            analogy: 'Think of it like a hotel room: undefined means you walk up to a door that has never been assigned to anyone (room 000 on the register), while null means you open an assigned room and find it intentionally left empty -- the guest checked out.',
          },
          {
            heading: 'Nullish Coalescing and Optional Chaining',
            content:
              'Meet two operators that were introduced in ES2020 and immediately became essential to modern JavaScript. The nullish coalescing operator (`??`) provides a default value *only* when the left side is `null` or `undefined`. This is a crucial upgrade over `||`, which treats ALL falsy values as "missing." Why does this matter? Imagine `config.port || 3000` -- if `config.port` is `0` (a perfectly valid port number), `||` treats it as falsy and gives you `3000`. With `config.port ?? 3000`, the `0` is preserved because it is not `null` or `undefined`. The optional chaining operator (`?.`) is equally game-changing. Before it existed, accessing nested properties was a minefield: `user.address.city` would throw a `TypeError` if `address` was `undefined`. You had to write tedious checks like `user && user.address && user.address.city`. Now you just write `user?.address?.city` -- if any part of the chain is `null` or `undefined`, the entire expression short-circuits to `undefined` instead of throwing. These two operators together form the ultimate defensive programming duo.',
            code: `// Nullish coalescing (??) — default for null/undefined only
const a = 0 ?? 'default';      // 0 (0 is NOT null/undefined)
const b = '' ?? 'default';     // '' (empty string is NOT null)
const c = null ?? 'default';   // 'default'
const d = undefined ?? 'default'; // 'default'

console.log(a, b, c, d);

// Compare with || (treats all falsy as missing)
const e = 0 || 'default';      // 'default' (0 is falsy)
const f = '' || 'default';     // 'default' ('' is falsy)
console.log(e, f);

// Optional chaining (?.)
const user = { address: { city: 'NYC' } };
console.log(user.address?.city);     // 'NYC'
console.log(user.phone?.number);     // undefined (no error)
console.log(user.getName?.());       // undefined (safe method call)

// Combined pattern
const config = { port: 0, host: null };
const port = config.port ?? 3000;        // 0 (intended!)
const host = config.host ?? 'localhost'; // 'localhost'
console.log(\`\${host}:\${port}\`);`,
            output: `0  default default
default default
NYC
undefined
undefined
localhost:0`,
            tip: 'Optional chaining cannot be used on the left side of an assignment: user?.name = "Bob" is a syntax error. It is read-only access.',
            warning: 'Do not overuse optional chaining. Writing `a?.b?.c?.d?.e` everywhere can mask real bugs -- if `a.b` should always exist, do not use `?.` on it. Reserve optional chaining for properties that are genuinely optional. If something is unexpectedly `undefined`, you *want* the error so you can fix the root cause.',
            diagram: {
              kind: 'mermaid',
              code: `graph TD
  A["value ?? default"] --> B{"value === null or undefined?"}
  B -->|Yes| C["Use default"]
  B -->|No| D["Use value (even 0, '', false)"]
  E["value || default"] --> F{"value is falsy?"}
  F -->|Yes| G["Use default"]
  F -->|No| H["Use value"]
  style C fill:#6c6,stroke:#333
  style D fill:#6c6,stroke:#333
  style G fill:#f96,stroke:#333
  style H fill:#6c6,stroke:#333`,
              caption: '?? only falls through on null/undefined, while || falls through on ALL falsy values (0, "", false, null, undefined, NaN)',
            },
            codeHighlightLines: [2, 3, 4, 5, 10, 11, 22, 23],
          },
          {
            heading: 'Defensive Programming Patterns',
            content:
              'The dreaded `"Cannot read properties of undefined (reading \'xxx\')"` is the single most common JavaScript runtime error. It happens when you try to access a property on something that is `null` or `undefined`. The good news? Modern JavaScript gives you a complete toolkit to prevent it. Default function parameters let you specify fallback values right in the function signature -- `function greet(name = "World")` elegantly handles cases where no argument is passed. Destructuring with defaults combines object unpacking with fallback values. And the `?.` + `??` combo handles even the deepest nested structures from API responses where any level might be missing. The key insight is to think about the "unhappy path" proactively. What if the API returns `null`? What if the user object has no address? What if the config file is missing a field? By using these patterns consistently, you eliminate an entire category of runtime crashes and make your code resilient to unexpected data.',
            code: `// Default function parameters
function greet(name = 'World') {
  return \`Hello, \${name}!\`;
}
console.log(greet());         // 'Hello, World!'
console.log(greet('Alice'));  // 'Hello, Alice!'
console.log(greet(undefined)); // 'Hello, World!'
console.log(greet(null));      // 'Hello, null!' (null is explicit)

// Destructuring with defaults
const { theme = 'light', fontSize = 14 } = { theme: 'dark' };
console.log(theme, fontSize); // 'dark' 14

// Safe nested access pattern
const response = { data: { users: [{ name: 'Alice' }] } };
const firstUser = response?.data?.users?.[0]?.name ?? 'Unknown';
console.log(firstUser); // 'Alice'

const empty = {};
const missing = empty?.data?.users?.[0]?.name ?? 'Unknown';
console.log(missing); // 'Unknown'`,
            output: `Hello, World!
Hello, Alice!
Hello, World!
Hello, null!
dark 14
Alice
Unknown`,
            tip: 'Combine optional chaining with nullish coalescing for the safest data access pattern: response?.data?.value ?? defaultValue. This handles the full chain of potential null/undefined values.',
            warning: 'Default parameters only trigger on `undefined`, NOT on `null`. So `greet(null)` produces `"Hello, null!"`, not `"Hello, World!"`. This is by design -- `null` is an explicit value, while `undefined` means "nothing was provided." Keep this in mind when your functions might receive `null` from APIs or databases.',
          },
        ],
        quiz: [
          {
            question: 'What is the conceptual difference between null and undefined?',
            options: [
              'They are exactly the same thing',
              'null means intentional absence, undefined means uninitialized/not set',
              'undefined is for objects, null is for primitives',
              'null throws errors, undefined does not',
            ],
            correctIndex: 1,
            explanation:
              'undefined means a value was never set (uninitialized variable, missing property). null means a value was explicitly set to "nothing" -- it is an intentional absence.',
          },
          {
            question: 'What does the ?? (nullish coalescing) operator do differently from ||?',
            options: [
              'They are identical',
              '?? only falls through on null or undefined, while || falls through on any falsy value',
              '?? is faster than ||',
              '?? works only with strings',
            ],
            correctIndex: 1,
            explanation:
              'The ?? operator only uses the default when the left side is null or undefined. Unlike ||, it preserves falsy values like 0, "", and false.',
          },
          {
            question: 'What does user?.address?.city do if user.address is undefined?',
            options: [
              'Throws a TypeError',
              'Returns null',
              'Returns undefined without throwing',
              'Returns an empty string',
            ],
            correctIndex: 2,
            explanation:
              'Optional chaining (?.) short-circuits to undefined if any part of the chain is null or undefined, instead of throwing a TypeError.',
          },
        ],
        challenge: {
          prompt:
            'Write a function called safeGet(obj, path, defaultValue) that safely accesses a nested property using a dot-separated path string (e.g., "address.city.zip"). Return defaultValue if any part of the path is null or undefined.',
          starterCode: `function safeGet(obj, path, defaultValue) {
  // TODO: Split the path by '.'
  // TODO: Traverse the object step by step
  // TODO: Return defaultValue if any step is null/undefined
}

const data = { user: { address: { city: 'NYC' } } };
console.log(safeGet(data, 'user.address.city', 'Unknown'));
// Expected: 'NYC'
console.log(safeGet(data, 'user.phone.number', 'N/A'));
// Expected: 'N/A'
console.log(safeGet(data, 'user.address', {}));
// Expected: { city: 'NYC' }`,
          solutionCode: `function safeGet(obj, path, defaultValue) {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current == null) return defaultValue;
    current = current[key];
  }
  return current ?? defaultValue;
}

const data = { user: { address: { city: 'NYC' } } };
console.log(safeGet(data, 'user.address.city', 'Unknown'));
console.log(safeGet(data, 'user.phone.number', 'N/A'));
console.log(safeGet(data, 'user.address', {}));`,
          hints: [
            'Use path.split(".") to break the path into an array of keys.',
            'Loop through the keys, accessing obj[key] at each step. If the result is null or undefined, return the defaultValue.',
            'Use == null to check for both null and undefined in one expression.',
          ],
        },
      },
      {
        id: 'symbols',
        title: 'Symbols',
        difficulty: 'intermediate',
        tags: ['symbol', 'unique', 'property', 'well-known', 'iterator'],
        cheatSheetSummary: 'Unique, immutable identifiers. Used as object property keys and for well-known protocols.',
        sections: [
          {
            heading: 'Creating and Using Symbols',
            content:
              'Symbols are the most mysterious of JavaScript\'s primitive types, and many developers go their entire careers without creating one directly. But understanding them unlocks a deeper appreciation of how JavaScript works under the hood. Here is the core idea: every `Symbol()` call creates a completely unique value that can never be duplicated. Even `Symbol("description")` and `Symbol("description")` with the same description are different symbols -- the description is just a label for debugging, not an identifier. So what are they for? Symbols are primarily used as object property keys when you need to guarantee that your property will never collide with any other property -- even if someone else adds a property with the same "name" later. This is especially valuable when you are extending objects you do not own (think library code or monkey-patching). Here is the elegant part: symbol-keyed properties are "hidden" from normal iteration. They do not show up in `for...in` loops, `Object.keys()`, or `JSON.stringify()`. They are like secret compartments in an object. You need `Object.getOwnPropertySymbols()` to find them.',
            code: `// Creating symbols — each is unique
const id1 = Symbol('description');
const id2 = Symbol('description');
console.log(id1 === id2); // false (always unique!)
console.log(typeof id1);  // 'symbol'
console.log(id1.toString()); // 'Symbol(description)'

// Using symbols as object keys
const SECRET_KEY = Symbol('secret');
const user = {
  name: 'Alice',
  [SECRET_KEY]: 'hidden_value',
};

console.log(user.name);        // 'Alice'
console.log(user[SECRET_KEY]); // 'hidden_value'

// Symbol properties are hidden from normal iteration
console.log(Object.keys(user));       // ['name']
console.log(JSON.stringify(user));     // '{"name":"Alice"}'

// But accessible via specific methods
console.log(Object.getOwnPropertySymbols(user)); // [Symbol(secret)]`,
            output: `false
symbol
Symbol(description)
Alice
hidden_value
['name']
{"name":"Alice"}
[Symbol(secret)]`,
            tip: 'Symbols are perfect for defining "hidden" properties on objects that should not interfere with normal property access or JSON serialization.',
            note: 'Symbols cannot be implicitly converted to strings. Writing `"My symbol: " + mySymbol` throws a `TypeError`. You must explicitly call `mySymbol.toString()` or `mySymbol.description` to get a string representation. This prevents accidental coercion, which is intentional -- symbols are meant to be used as identifiers, not as display text.',
            analogy: 'Think of it like a wax seal on an envelope: each symbol is a unique stamp that nobody else can forge. Even if two people use the same design, the actual seals are physically distinct and cannot be confused with each other.',
          },
          {
            heading: 'Global Symbol Registry and Well-Known Symbols',
            content:
              'Regular symbols are unique to the code that creates them, but sometimes you need a symbol that can be shared across different parts of your application -- or even across different JavaScript realms (like iframes or web workers). That is what `Symbol.for()` does: it looks up a symbol in a global registry by a string key, creating it if it does not exist, and returns the same symbol every time. Think of it like a global singleton for symbols. But the truly fascinating part of the symbol story is *well-known symbols* -- a set of built-in symbols that JavaScript uses internally to define core language behavior. `Symbol.iterator` defines how an object behaves in `for...of` loops and spread syntax. `Symbol.toPrimitive` controls how an object converts to numbers and strings. `Symbol.hasInstance` customizes `instanceof` checks. By implementing these symbols on your objects, you are essentially plugging into JavaScript\'s internal protocols. It is like getting access to the engine room of the language and rewiring how things work for your custom types.',
            code: `// Global symbol registry — shared symbols
const s1 = Symbol.for('app.id');
const s2 = Symbol.for('app.id');
console.log(s1 === s2); // true (same global symbol!)
console.log(Symbol.keyFor(s1)); // 'app.id'

// Well-known symbol: Symbol.iterator
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { done: true };
      }
    };
  }
};

console.log([...range]); // [1, 2, 3, 4, 5]

// Well-known symbol: Symbol.toPrimitive
const money = {
  amount: 42,
  currency: 'USD',
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return this.amount;
    return \`\${this.amount} \${this.currency}\`;
  }
};
console.log(+money);      // 42
console.log(\`\${money}\`);  // '42 USD'`,
            output: `true
app.id
[1, 2, 3, 4, 5]
42
42 USD`,
            tip: 'Symbol.for() is useful for defining application-wide constants that need to be accessed across modules. Regular Symbol() should be used for truly unique, file-private identifiers.',
            note: 'There are 13 well-known symbols in JavaScript, including `Symbol.iterator`, `Symbol.asyncIterator`, `Symbol.toPrimitive`, `Symbol.toStringTag`, `Symbol.hasInstance`, and `Symbol.species`. You do not need to memorize them all, but knowing that `Symbol.iterator` exists is essential for understanding how `for...of`, spread syntax, and destructuring work under the hood.',
            codeHighlightLines: [11, 15, 16, 17, 30, 31],
          },
        ],
        quiz: [
          {
            question: 'What happens when you create two Symbols with the same description?',
            options: [
              'They are equal',
              'The second one throws an error',
              'They are completely unique and not equal',
              'They share the same reference',
            ],
            correctIndex: 2,
            explanation:
              'Every Symbol() call creates a completely unique value. Symbol("desc") === Symbol("desc") is false -- the description is just a debugging label.',
          },
          {
            question: 'Do symbol-keyed properties show up in Object.keys()?',
            options: [
              'Yes, always',
              'No, they are hidden from Object.keys(), for...in, and JSON.stringify()',
              'Only if the symbol was created with Symbol.for()',
              'Only in strict mode',
            ],
            correctIndex: 1,
            explanation:
              'Symbol-keyed properties are hidden from Object.keys(), for...in loops, and JSON.stringify(). Use Object.getOwnPropertySymbols() to access them.',
          },
          {
            question: 'What is the difference between Symbol() and Symbol.for()?',
            options: [
              'They are identical',
              'Symbol() creates a unique symbol; Symbol.for() looks up or creates a shared symbol in a global registry',
              'Symbol.for() is deprecated',
              'Symbol() is only for browsers, Symbol.for() is for Node.js',
            ],
            correctIndex: 1,
            explanation:
              'Symbol() always creates a new unique symbol. Symbol.for(key) checks a global registry first and returns an existing symbol with that key, or creates one if it does not exist.',
          },
        ],
        challenge: {
          prompt:
            'Create a custom iterable object called "countdown" that counts down from a given number to 1 using Symbol.iterator. Then spread it into an array and log the result.',
          starterCode: `const countdown = {
  from: 5,
  // TODO: Implement [Symbol.iterator]() method
  // It should yield values from this.from down to 1
};

// TODO: Spread the countdown into an array and log it
// Expected: [5, 4, 3, 2, 1]`,
          solutionCode: `const countdown = {
  from: 5,
  [Symbol.iterator]() {
    let current = this.from;
    return {
      next() {
        return current >= 1
          ? { value: current--, done: false }
          : { done: true };
      }
    };
  }
};

console.log([...countdown]); // [5, 4, 3, 2, 1]`,
          hints: [
            'Implement a [Symbol.iterator]() method that returns an object with a next() method.',
            'The next() method should return { value, done: false } for each number, and { done: true } when finished.',
            'Use a closure variable (let current = this.from) that decrements on each call to next().',
          ],
        },
      },
      {
        id: 'bigint',
        title: 'BigInt',
        difficulty: 'intermediate',
        tags: ['bigint', 'large-numbers', 'integer', 'precision', 'arbitrary'],
        cheatSheetSummary: 'Arbitrary-precision integers using the n suffix. Cannot mix with Number.',
        sections: [
          {
            heading: 'BigInt Basics',
            content:
              'Remember how we said JavaScript numbers are 64-bit floats and integers are only safe up to 2^53 - 1? Well, `BigInt` (introduced in ES2020) is the solution when you need to go beyond that limit. Create one by adding `n` to the end of an integer literal or by calling `BigInt()`. BigInt can represent integers of *arbitrary* precision -- as large as your memory can hold. But here is the catch that trips people up: BigInt and regular Number live in completely separate worlds. You cannot mix them in arithmetic expressions (`10n + 5` throws a `TypeError`), you must explicitly convert between them. This is actually a good design decision -- it prevents accidental precision loss. BigInt supports all the standard arithmetic operators except the unary `+` operator. Division with BigInt performs *integer division* (truncation toward zero), so `7n / 2n` gives `3n`, not `3.5n`. There is no `BigFloat` in JavaScript -- BigInt is strictly for integers.',
            code: `// Creating BigInt values
const big = 9007199254740993n; // beyond MAX_SAFE_INTEGER
const fromFunc = BigInt('123456789012345678901234567890');
console.log(big);
console.log(fromFunc);
console.log(typeof big); // 'bigint'

// Number precision problem that BigInt solves
console.log(9007199254740992 === 9007199254740993); // true! (unsafe)
console.log(9007199254740992n === 9007199254740993n); // false (correct)

// Arithmetic with BigInt
console.log(10n + 20n);   // 30n
console.log(10n * 20n);   // 200n
console.log(10n ** 100n); // very large number

// Division truncates (integer division)
console.log(7n / 2n);     // 3n (not 3.5n)

// Cannot mix BigInt and Number
try {
  console.log(10n + 5); // TypeError!
} catch (e) {
  console.log('Error:', e.message);
}
console.log(10n + BigInt(5)); // 15n (explicit conversion)`,
            output: `9007199254740993n
123456789012345678901234567890n
bigint
true
false
30n
200n
100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n
3n
Error: Cannot mix BigInt and other types
15n`,
            tip: 'BigInt operations are significantly slower than regular Number operations. Only use BigInt when you actually need integers larger than 2^53.',
            warning: 'Be careful converting large BigInts to Numbers: `Number(9007199254740993n)` silently loses precision and gives you `9007199254740992`. Always check if the BigInt is within the safe integer range before converting with `Number.isSafeInteger(Number(bigintValue))`.',
            codeHighlightLines: [2, 9, 10, 22],
          },
          {
            heading: 'BigInt Practical Use Cases',
            content:
              'You might be wondering: when would I actually need BigInt in real-world code? More often than you think! Social media platforms like Twitter/X use snowflake IDs that exceed `Number.MAX_SAFE_INTEGER`. Blockchain and cryptocurrency applications deal with enormous transaction values. Financial systems sometimes need to represent amounts in the smallest currency unit (think of a value like 10^18 wei in Ethereum). And if you ever do competitive programming in JavaScript, BigInt is a lifesaver for problems involving factorials or combinatorics. One important gotcha: `JSON.stringify()` does not know how to handle BigInt -- it throws a `TypeError`. You need a custom serializer that converts BigInt values to strings. And on the receiving end, you need to know which fields to parse back into BigInt. The comparison story is interesting too: loose equality (`==`) works across BigInt and Number (so `10n == 10` is `true`), but strict equality (`===`) does not (because they are different types). Comparison operators like `<` and `>` do work across types, which is convenient for sorting.',
            code: `// Working with large IDs
const tweetId = 1234567890123456789n;
console.log(\`Tweet ID: \${tweetId}\`);

// BigInt comparison with Number (loose)
console.log(10n == 10);   // true (loose)
console.log(10n === 10);  // false (strict, different types)
console.log(10n < 20);    // true (comparison works)

// Factorial with BigInt
function factorial(n) {
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}
console.log(\`20! = \${factorial(20)}\`);
console.log(\`50! = \${String(factorial(50)).length} digits\`);

// JSON workaround
const data = { id: 123456789012345678n, name: 'Alice' };
const json = JSON.stringify(data, (key, value) =>
  typeof value === 'bigint' ? value.toString() : value
);
console.log(json);

// Convert back
const parsed = JSON.parse(json);
const id = BigInt(parsed.id);
console.log(id, typeof id);`,
            output: `Tweet ID: 1234567890123456789
true
false
true
20! = 2432902008176640000
50! = 65 digits
{"id":"123456789012345678","name":"Alice"}
123456789012345678n bigint`,
            tip: 'When receiving large integer IDs from APIs, request them as strings to avoid precision loss, then convert to BigInt if needed for arithmetic.',
            note: 'Many APIs (including Twitter/X) send large IDs as both a number field and a string field (e.g., `id` and `id_str`) specifically because JavaScript\'s `JSON.parse()` loses precision on large integers. When working with such APIs, always use the string version.',
          },
        ],
        quiz: [
          {
            question: 'How do you create a BigInt literal in JavaScript?',
            options: [
              'Wrap the number in BigInt()',
              'Add an n suffix to the integer literal',
              'Both A and B are valid ways',
              'Use the big keyword',
            ],
            correctIndex: 2,
            explanation:
              'You can create a BigInt using the n suffix (42n) or by calling BigInt(42) or BigInt("42"). Both approaches are valid.',
          },
          {
            question: 'What happens when you try to add a BigInt and a regular Number (10n + 5)?',
            options: [
              'It returns 15n',
              'It returns 15',
              'It throws a TypeError',
              'It returns NaN',
            ],
            correctIndex: 2,
            explanation:
              'You cannot mix BigInt and Number in arithmetic operations. 10n + 5 throws a TypeError. You must convert explicitly: 10n + BigInt(5).',
          },
          {
            question: 'What does 7n / 2n return?',
            options: [
              '3.5n',
              '3n',
              '4n',
              'TypeError',
            ],
            correctIndex: 1,
            explanation:
              'BigInt division performs integer division (truncation toward zero). 7n / 2n returns 3n, not 3.5n, because BigInt cannot represent fractions.',
          },
        ],
        challenge: {
          prompt:
            'Write a BigInt factorial function and a custom JSON serializer. Compute factorial(25) using BigInt, then serialize an object containing the result to JSON (BigInt is not natively supported by JSON.stringify).',
          starterCode: `function factorial(n) {
  // TODO: Compute factorial using BigInt
  // Start with result = 1n and multiply up to BigInt(n)
}

const result = {
  input: 25,
  factorial: factorial(25),
};

// TODO: Serialize 'result' to JSON
// Hint: JSON.stringify does not support BigInt natively
// Use a replacer function to convert BigInts to strings
console.log(/* your JSON string */);`,
          solutionCode: `function factorial(n) {
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}

const result = {
  input: 25,
  factorial: factorial(25),
};

const json = JSON.stringify(result, (key, value) =>
  typeof value === 'bigint' ? value.toString() : value
);
console.log(json);`,
          hints: [
            'Initialize the result as 1n (BigInt literal) and loop from 2n up to BigInt(n).',
            'JSON.stringify() throws on BigInt values. Pass a replacer function as the second argument.',
            'In the replacer, check typeof value === "bigint" and convert to string with value.toString().',
          ],
        },
      },
      {
        id: 'type-coercion',
        title: 'Type Coercion',
        difficulty: 'intermediate',
        tags: ['coercion', 'conversion', 'equality', 'truthy', 'falsy', 'casting'],
        cheatSheetSummary: 'JS auto-converts types. Use === to avoid coercion. Know falsy values.',
        sections: [
          {
            heading: 'Implicit Type Coercion',
            content:
              'Type coercion is JavaScript\'s most polarizing feature -- some call it a design flaw, others call it a powerful feature. Here is what happens: when JavaScript encounters an operator or comparison between incompatible types, it *automatically* converts one or both values to make the operation work. The `+` operator is the trickiest because it plays double duty: if *either* operand is a string, JavaScript concatenates; otherwise, it adds. This is why `"5" + 3` gives you `"53"` (string concatenation) while `"5" - 3` gives you `2` (numeric subtraction -- the `-` operator only does math, so it converts the string to a number). The `==` operator performs coercion before comparing, following a complex set of rules that even the language specification describes in a multi-page algorithm. This is exactly why `===` (strict equality) exists and why every JavaScript style guide on the planet tells you to use it. The unary `+` operator is a common shorthand for converting to a number: `+"42"` gives `42`. Understanding these coercion rules does not mean you should rely on them -- it means you can recognize and debug them when you encounter them in code.',
            code: `// String concatenation vs addition
console.log('5' + 3);       // '53' (number coerced to string)
console.log('5' - 3);       // 2 (string coerced to number)
console.log('5' * 2);       // 10 (string coerced to number)
console.log('5' / 2);       // 2.5 (string coerced to number)

// Loose equality (==) performs coercion
console.log(1 == '1');       // true
console.log(0 == false);     // true
console.log('' == false);    // true
console.log(null == undefined); // true
console.log(0 == null);     // false (special case!)

// Strict equality (===) — no coercion
console.log(1 === '1');      // false
console.log(0 === false);    // false
console.log('' === false);   // false

// Unary + converts to number
console.log(+'42');       // 42
console.log(+'');         // 0
console.log(+true);       // 1
console.log(+false);      // 0
console.log(+null);       // 0
console.log(+undefined);  // NaN`,
            output: `53
2
10
2.5
true
true
true
true
false
false
false
false
42
0
1
0
0
NaN`,
            tip: 'Always use === instead of ==. The only exception is value == null to check for both null and undefined in one expression.',
            warning: 'The `+` operator with strings is the #1 source of coercion bugs. If you are adding numbers from user input or API responses, ALWAYS convert to numbers first with `Number()` or `parseInt()`. Otherwise `"5" + "3"` gives you `"53"`, not `8`.',
            diagram: {
              kind: 'mermaid',
              code: `graph TD
  A["'5' + 3"] --> B{"Either operand is a string?"}
  B -->|"Yes → concatenate"| C["'53'"]
  D["'5' - 3"] --> E{"- only does math"}
  E -->|"Convert string to number"| F["5 - 3 = 2"]
  style C fill:#f96,stroke:#333
  style F fill:#6c6,stroke:#333`,
              caption: 'The + operator concatenates if either side is a string; other math operators always convert to numbers',
            },
            codeHighlightLines: [2, 3, 14, 15, 16],
          },
          {
            heading: 'Explicit Type Conversion',
            content:
              'While implicit coercion happens automatically (and often unexpectedly), explicit conversion is when YOU decide to change a value\'s type, making your intentions crystal clear to anyone reading the code. The Big Three conversion functions are `Number()`, `String()`, and `Boolean()`. `Number()` is strict -- it returns `NaN` for anything it cannot fully convert (like `"42px"`), unlike `parseInt()` which is lenient and stops at the first non-numeric character. One particularly sneaky behavior: `Number("")` returns `0`, not `NaN`, which can silently turn empty form inputs into zeros. `Boolean()` follows the truthy/falsy rules we covered earlier, but watch out for `Boolean("0")` returning `true` (it is a non-empty string!) and `Boolean([])` returning `true` (objects are always truthy). The key insight is this: explicit conversion makes your code\'s behavior *predictable*. When someone reads `Number(input)`, they know exactly what is happening. When they see `+input` or `input - 0`, the intent is murkier. Write code for humans first, computers second.',
            code: `// Explicit conversions
console.log(Number('42'));       // 42
console.log(Number('42px'));     // NaN (strict)
console.log(Number(''));         // 0
console.log(Number(true));       // 1
console.log(Number(null));       // 0
console.log(Number(undefined));  // NaN

console.log(String(42));         // '42'
console.log(String(null));       // 'null'
console.log(String(undefined));  // 'undefined'
console.log(String(true));       // 'true'

console.log(Boolean(0));         // false
console.log(Boolean(''));        // false
console.log(Boolean('0'));       // true (non-empty string!)
console.log(Boolean([]));        // true (objects are always truthy)

// parseInt is more lenient
console.log(parseInt('42px'));   // 42 (stops at non-digit)
console.log(parseInt('0xFF', 16)); // 255
console.log(parseFloat('3.14abc')); // 3.14`,
            output: `42
NaN
0
1
0
NaN
42
null
undefined
true
false
false
true
true
42
255
3.14`,
            tip: 'Objects are always truthy in JavaScript, even empty arrays [] and empty objects {}. This is a common source of bugs: if ([]) runs, and if ({}) runs.',
            warning: 'Be careful with `Number(null)` returning `0` and `Number(undefined)` returning `NaN`. These inconsistencies mean that `null` and `undefined` behave differently in numeric contexts. Always handle these cases explicitly rather than relying on coercion.',
          },
          {
            heading: 'Coercion Gotchas and Best Practices',
            content:
              'Let\'s explore the JavaScript Coercion Hall of Fame -- the examples that have launched a thousand memes and conference talks. `[] + []` is an empty string (both arrays are coerced to strings, empty arrays become `""`). `[] + {}` gives `"[object Object]"` (the array becomes `""` and the object becomes its `toString()` representation). `true + true` is `2` (booleans are coerced to numbers). And here is a real head-scratcher: `null >= 0` is `true`, but `null > 0` is `false` and `null == 0` is also `false`. How can something be "greater than or equal to zero" but neither "greater than zero" nor "equal to zero"? The answer is that comparison operators and equality operators use different coercion rules. Comparisons convert `null` to `0`, but `==` has a special rule that `null` only equals `undefined`. These edge cases are fun to study, but the lesson is practical: write defensive, explicit code. Use `===` for comparisons, `Number()` for conversions, template literals for string building, and `Array.from()` or spread for array concatenation. Let your code communicate your intent.',
            code: `// Famous coercion gotchas
console.log([] + []);           // '' (both coerced to strings)
console.log([] + {});           // '[object Object]'
console.log({} + []);           // '[object Object]' (or 0 in some contexts)
console.log(true + true);       // 2
console.log(true + 'hello');    // 'truehello'

// The + trap with arrays
console.log([1, 2] + [3, 4]);  // '1,23,4' (not [1,2,3,4]!)

// Comparison gotchas
console.log(null > 0);   // false
console.log(null == 0);  // false
console.log(null >= 0);  // true (inconsistent!)

// Best practices
// 1. Always use === for comparison
// 2. Use explicit conversion: Number(), String(), Boolean()
// 3. Use template literals instead of + for string building
// 4. Be explicit about your intentions

const input = '42';
const num = Number(input);  // explicit, clear
console.log(num + 10);      // 52 (no confusion)`,
            output: `
[object Object]
[object Object]
2
truehello
1,23,4
false
false
true
52`,
            tip: 'When concatenating strings with values, always use template literals: `Total: ${count}` instead of "Total: " + count. This avoids accidental type coercion.',
            warning: 'To concatenate arrays, NEVER use `+` (it coerces both to strings). Use the spread operator `[...arr1, ...arr2]` or `arr1.concat(arr2)`. The `+` operator on arrays is one of the most common JavaScript mistakes.',
            analogy: 'Think of it like a multilingual translator who sometimes guesses what language you meant: JavaScript tries to be helpful by converting types automatically, but these "helpful" guesses can produce nonsensical translations, which is why being explicit (using ===, Number(), String()) is always safer.',
          },
        ],
        quiz: [
          {
            question: 'What does "5" + 3 evaluate to in JavaScript?',
            options: [
              '8',
              '"53"',
              'NaN',
              'TypeError',
            ],
            correctIndex: 1,
            explanation:
              'The + operator performs string concatenation when either operand is a string. "5" + 3 coerces 3 to a string and concatenates, resulting in "53".',
          },
          {
            question: 'What does "5" - 3 evaluate to?',
            options: [
              '"53"',
              '"2"',
              '2',
              'NaN',
            ],
            correctIndex: 2,
            explanation:
              'The - operator only does math (unlike +). It coerces "5" to the number 5, then subtracts 3 to get 2.',
          },
          {
            question: 'What does Number("") return?',
            options: [
              'NaN',
              '0',
              'undefined',
              '""',
            ],
            correctIndex: 1,
            explanation:
              'Number("") returns 0, not NaN. This is a common gotcha -- empty strings convert to 0, which can silently turn empty form inputs into zeros.',
          },
          {
            question: 'What does [] + [] evaluate to?',
            options: [
              '[]',
              '0',
              '"" (empty string)',
              'NaN',
            ],
            correctIndex: 2,
            explanation:
              'Both arrays are coerced to strings (empty arrays become ""), and then the two empty strings are concatenated, resulting in an empty string "".',
          },
        ],
        challenge: {
          prompt:
            'Write a function called strictAdd(a, b) that safely adds two values. It should convert both to numbers explicitly, check if either result is NaN, and either return the sum or throw an error with a descriptive message.',
          starterCode: `function strictAdd(a, b) {
  // TODO: Convert a and b to numbers explicitly
  // TODO: Check if either is NaN
  // TODO: Throw an Error if invalid, otherwise return the sum
}

console.log(strictAdd('5', '3'));   // 8
console.log(strictAdd(10, 20));     // 30

try {
  strictAdd('hello', 5);
} catch (e) {
  console.log(e.message);
  // Expected: something like 'Invalid number: hello'
}`,
          solutionCode: `function strictAdd(a, b) {
  const numA = Number(a);
  const numB = Number(b);
  if (Number.isNaN(numA)) throw new Error(\`Invalid number: \${a}\`);
  if (Number.isNaN(numB)) throw new Error(\`Invalid number: \${b}\`);
  return numA + numB;
}

console.log(strictAdd('5', '3'));   // 8
console.log(strictAdd(10, 20));     // 30

try {
  strictAdd('hello', 5);
} catch (e) {
  console.log(e.message); // 'Invalid number: hello'
}`,
          hints: [
            'Use Number() for explicit conversion rather than parseInt() to be strict about invalid input.',
            'Use Number.isNaN() (not the global isNaN()) to check for NaN values.',
            'Throw a new Error() with a descriptive message that includes the invalid input value.',
          ],
        },
      },
    ],
  },
];

import type { DocCategory } from './types';

// Part 7: Modern JavaScript (ES2020+)
export const JS_PART7_CATEGORIES: DocCategory[] = [
  {
    id: 'js-modern',
    label: 'Modern JavaScript (ES2020+)',
    icon: 'Sparkles',
    entries: [
      {
        id: 'optional-chaining',
        title: 'Optional Chaining (?.)',
        difficulty: 'beginner',
        tags: ['optional-chaining', 'safe-access', 'null', 'undefined', 'ES2020'],
        cheatSheetSummary: 'Safe property access: obj?.prop returns undefined instead of throwing.',
        quiz: [
          {
            question: 'What does optional chaining (?.) return when it encounters null or undefined in the chain?',
            options: [
              'It throws a TypeError',
              'It returns null',
              'It returns undefined',
              'It returns an empty string',
            ],
            correctIndex: 2,
            explanation: 'Optional chaining short-circuits and returns undefined whenever it encounters null or undefined at any point in the chain, preventing TypeError.',
          },
          {
            question: 'Which of the following is a valid use of optional chaining?',
            options: [
              'user?.name = "Bob"',
              'user?.getName?.()',
              'user?.["name"] = "Bob"',
              'delete user?.name',
            ],
            correctIndex: 1,
            explanation: 'Optional chaining works with method calls (obj?.method()), property access (obj?.prop), and bracket notation (obj?.[expr]). It cannot be used on the left side of an assignment.',
          },
          {
            question: 'What is the output of: const x = {}; console.log(x?.a?.b?.c);',
            options: [
              'null',
              'TypeError is thrown',
              'undefined',
              '{}',
            ],
            correctIndex: 2,
            explanation: 'Since x.a is undefined, the ?. operator short-circuits the rest of the chain and returns undefined without throwing an error.',
          },
          {
            question: 'How does optional chaining differ from the logical AND (&&) approach for safe access?',
            options: [
              'They are identical in behavior',
              'Optional chaining always returns undefined on failure, while && returns the first falsy value',
              'Optional chaining is slower at runtime',
              'Optional chaining only works on arrays',
            ],
            correctIndex: 1,
            explanation: 'With &&, expressions like 0 && something return 0 (a falsy value), while optional chaining only short-circuits on null or undefined and always returns undefined when it does.',
          },
        ],
        challenge: {
          prompt: 'Write a function called safeGet that takes an object and an array of string keys, and safely navigates through the nested properties using optional chaining logic. If any key in the path is missing, return a provided default value.',
          starterCode: `function safeGet(obj, keys, defaultValue) {
  // Navigate through obj using the keys array
  // Return the nested value if it exists, or defaultValue if any key is missing
}

// Test cases:
const data = { a: { b: { c: 42 } } };
console.log(safeGet(data, ['a', 'b', 'c'], 0));     // 42
console.log(safeGet(data, ['a', 'x', 'c'], 0));     // 0
console.log(safeGet(data, ['a', 'b'], 0));           // { c: 42 }
console.log(safeGet(null, ['a'], 'default'));         // 'default'`,
          solutionCode: `function safeGet(obj, keys, defaultValue) {
  let current = obj;
  for (const key of keys) {
    if (current == null) {
      return defaultValue;
    }
    current = current[key];
  }
  return current ?? defaultValue;
}

// Test cases:
const data = { a: { b: { c: 42 } } };
console.log(safeGet(data, ['a', 'b', 'c'], 0));     // 42
console.log(safeGet(data, ['a', 'x', 'c'], 0));     // 0
console.log(safeGet(data, ['a', 'b'], 0));           // { c: 42 }
console.log(safeGet(null, ['a'], 'default'));         // 'default'`,
          hints: [
            'Use a loop to walk through each key in the keys array.',
            'At each step, check if the current value is null or undefined before continuing.',
            'Use the nullish coalescing operator (??) on the final result to apply the default value.',
          ],
        },
        sections: [
          {
            heading: 'Safe Property Access',
            content:
              'Optional chaining (?.) short-circuits to undefined when you try to access a property on null or undefined, instead of throwing a TypeError. It works with property access (obj?.prop), bracket notation (obj?.[expr]), and method calls (obj?.method()). This eliminates the need for verbose null checks and is one of the most impactful ES2020 features.',
            analogy: 'Think of it like knocking on doors in a hallway — if a door leads to an empty room (null), you just stop and say "nothing here" instead of crashing through the wall trying to reach the next room.',
            code: `const user = {
  name: 'Alice',
  address: {
    city: 'NYC',
    zip: '10001',
  },
  // no 'phone' property
};

// Without optional chaining (verbose)
const city1 = user.address ? user.address.city : undefined;

// With optional chaining (clean)
const city2 = user.address?.city;
console.log(city2); // 'NYC'

// Safe access on missing properties
console.log(user.phone?.number);      // undefined (no error)
console.log(user.getName?.());        // undefined (no error)
console.log(user.friends?.[0]?.name); // undefined

// Chained deeply
const response = { data: { users: [{ name: 'Alice' }] } };
console.log(response?.data?.users?.[0]?.name); // 'Alice'

const empty = {};
console.log(empty?.data?.users?.[0]?.name); // undefined

// With method calls
const arr = [1, 2, 3];
console.log(arr.find?.(x => x > 5)); // undefined (not found)

// Does NOT work on left side of assignment
// user?.name = 'Bob'; // SyntaxError!`,
            codeHighlightLines: [14, 18, 19, 20],
            output: `NYC
undefined
undefined
undefined
Alice
undefined
undefined`,
            tip: 'Optional chaining returns undefined when any part of the chain is null or undefined. Combine with ?? for a default value: obj?.prop ?? "default".',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n    A["user"] -->|"?.address"| B{"address exists?"}\n    B -->|"yes"| C["address obj"]\n    B -->|"no (null/undefined)"| D["undefined ⛔"]\n    C -->|"?.city"| E{"city exists?"}\n    E -->|"yes"| F["\'NYC\' ✅"]\n    E -->|"no"| D\n    A -->|"?.phone"| G{"phone exists?"}\n    G -->|"no"| D',
              caption: 'Optional chaining short-circuits to undefined at the first null/undefined in the chain, preventing TypeError.',
            },
          },
          {
            heading: 'Practical Patterns',
            content:
              'Optional chaining is especially useful when working with API responses, configuration objects, and event handlers where data structure is not guaranteed. It has become one of the most commonly used features in modern JavaScript codebases. Combined with nullish coalescing (??), it provides a complete solution for safe data access with fallback values.',
            code: `// API response handling
function getUserCity(response) {
  return response?.data?.user?.address?.city ?? 'Unknown';
}
console.log(getUserCity({ data: { user: { address: { city: 'NYC' } } } }));
console.log(getUserCity({ data: {} }));
console.log(getUserCity(null));

// Event handler safety
function handleClick(event) {
  const value = event?.target?.dataset?.id;
  const text = event?.target?.textContent?.trim();
  console.log({ value, text });
}
handleClick({ target: { dataset: { id: '42' }, textContent: ' Click Me ' } });
handleClick({});

// Configuration with defaults
function initApp(config) {
  const port = config?.server?.port ?? 3000;
  const host = config?.server?.host ?? 'localhost';
  const debug = config?.logging?.debug ?? false;
  return { port, host, debug };
}
console.log(initApp({ server: { port: 8080 } }));
console.log(initApp(undefined));`,
            codeHighlightLines: [3, 20, 21, 22],
            output: `NYC
Unknown
Unknown
{ value: '42', text: 'Click Me' }
{ value: undefined, text: undefined }
{ port: 8080, host: 'localhost', debug: false }
{ port: 3000, host: 'localhost', debug: false }`,
            tip: 'Optional chaining ?. and nullish coalescing ?? together form JavaScript\'s "safe navigation" pattern, similar to Kotlin\'s ?. and ?:.',
          },
        ],
      },
      {
        id: 'nullish-coalescing',
        title: 'Nullish Coalescing (??)',
        difficulty: 'beginner',
        tags: ['nullish-coalescing', 'default', 'null', 'undefined', 'ES2020'],
        cheatSheetSummary: 'Provides default only for null/undefined, unlike || which catches all falsy values.',
        quiz: [
          {
            question: 'What is the result of: 0 ?? 42?',
            options: [
              '42',
              '0',
              'undefined',
              'null',
            ],
            correctIndex: 1,
            explanation: 'The ?? operator only provides the right-hand default when the left-hand side is null or undefined. Since 0 is neither null nor undefined, the result is 0.',
          },
          {
            question: 'What is the key difference between ?? and ||?',
            options: [
              '?? is faster than ||',
              '|| only works with booleans while ?? works with any type',
              '?? triggers default only for null/undefined, while || triggers for any falsy value',
              '?? and || are identical in behavior',
            ],
            correctIndex: 2,
            explanation: 'The || operator considers all falsy values (0, "", false, null, undefined, NaN) as reasons to use the default. The ?? operator only considers null and undefined.',
          },
          {
            question: 'What happens with: null ?? undefined ?? "found"?',
            options: [
              'null',
              'undefined',
              '"found"',
              'TypeError is thrown',
            ],
            correctIndex: 2,
            explanation: 'Chaining ?? evaluates left to right. null triggers the next operand (undefined), which also triggers the next operand ("found"), so the result is "found".',
          },
          {
            question: 'Why does "a || b ?? c" cause a SyntaxError?',
            options: [
              'Because ?? does not exist in JavaScript',
              'Because mixing ?? with || or && without parentheses is forbidden to avoid ambiguity',
              'Because you can only use ?? once per expression',
              'Because b is not declared',
            ],
            correctIndex: 1,
            explanation: 'JavaScript deliberately forbids mixing ?? with || or && without explicit parentheses to prevent ambiguous operator precedence. Use (a || b) ?? c or a || (b ?? c) instead.',
          },
        ],
        challenge: {
          prompt: 'Write a function called mergeDefaults that takes a user settings object and a defaults object, and returns a new object where null or undefined values in the user settings are replaced by the corresponding default values. Use the ?? operator. Importantly, falsy values like 0, "", and false in the user settings should NOT be replaced.',
          starterCode: `function mergeDefaults(settings, defaults) {
  // Return a new object with defaults applied for null/undefined values
  // Do NOT replace 0, '', or false
}

// Test cases:
console.log(mergeDefaults(
  { volume: 0, theme: null, notifications: false, language: undefined },
  { volume: 50, theme: 'dark', notifications: true, language: 'en' }
));
// Expected: { volume: 0, theme: 'dark', notifications: false, language: 'en' }`,
          solutionCode: `function mergeDefaults(settings, defaults) {
  const result = { ...settings };
  for (const key of Object.keys(defaults)) {
    result[key] = result[key] ?? defaults[key];
  }
  return result;
}

// Test cases:
console.log(mergeDefaults(
  { volume: 0, theme: null, notifications: false, language: undefined },
  { volume: 50, theme: 'dark', notifications: true, language: 'en' }
));
// Expected: { volume: 0, theme: 'dark', notifications: false, language: 'en' }`,
          hints: [
            'Start by spreading the settings object into a new result object.',
            'Iterate over the keys of the defaults object.',
            'Use ?? to decide whether to use the settings value or the default value for each key.',
          ],
        },
        sections: [
          {
            heading: 'Nullish vs Falsy Defaults',
            content:
              'The nullish coalescing operator (??) provides a default value only when the left-hand side is null or undefined. This is different from || which provides a default for any falsy value (including 0, empty string, and false). This distinction is critical when 0, "", or false are valid, intentional values that should not be replaced by a default.',
            analogy: 'Think of it like a substitute teacher: || steps in whenever the original teacher is absent OR just feeling unwell (any falsy value), while ?? only steps in when the teacher literally does not exist (null or undefined) — it respects a teacher who showed up but scored zero on enthusiasm.',
            code: `// ?? vs ||
const count1 = 0 || 10;    // 10 (0 is falsy!)
const count2 = 0 ?? 10;    // 0 (0 is NOT null/undefined)
console.log('||:', count1, '??:', count2);

const text1 = '' || 'default';   // 'default' ('' is falsy!)
const text2 = '' ?? 'default';   // '' ('' is NOT null/undefined)
console.log('||:', text1, '??:', text2);

const bool1 = false || true;     // true (false is falsy!)
const bool2 = false ?? true;     // false (false is NOT null/undefined)
console.log('||:', bool1, '??:', bool2);

// Only null and undefined trigger ??
console.log(null ?? 'default');      // 'default'
console.log(undefined ?? 'default'); // 'default'
console.log(0 ?? 'default');         // 0
console.log('' ?? 'default');        // ''
console.log(false ?? 'default');     // false
console.log(NaN ?? 'default');       // NaN

// Practical: config with valid zero/empty values
const config = { port: 0, host: '', debug: false, name: null };
const port = config.port ?? 3000;     // 0 (intended!)
const host = config.host ?? 'localhost'; // '' (intended!)
const debug = config.debug ?? true;   // false (intended!)
const name = config.name ?? 'App';    // 'App' (null triggers default)
console.log({ port, host, debug, name });`,
            codeHighlightLines: [2, 3, 24, 25, 26, 27],
            output: `||: 10 ??: 0
||: default ??:
||: true ??: false
default
default
0

false
NaN
{ port: 0, host: '', debug: false, name: 'App' }`,
            tip: 'Use ?? instead of || when 0, empty string, or false are valid values. The || operator treats all falsy values as "missing", which is often wrong.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    subgraph "|| (OR) triggers on ALL falsy"\n        F1["0"] --> DEF1["default ❌"]\n        F2["\'\'"] --> DEF1\n        F3["false"] --> DEF1\n        F4["null"] --> DEF1\n        F5["undefined"] --> DEF1\n        F6["NaN"] --> DEF1\n    end\n    subgraph "?? (Nullish) triggers ONLY on null/undefined"\n        N1["null"] --> DEF2["default ✅"]\n        N2["undefined"] --> DEF2\n        N3["0"] --> KEEP1["0 (kept)"]\n        N4["\'\'"] --> KEEP2["\'\' (kept)"]\n        N5["false"] --> KEEP3["false (kept)"]\n        N6["NaN"] --> KEEP4["NaN (kept)"]\n    end',
              caption: 'The key difference: ?? only replaces null and undefined, preserving valid falsy values like 0, empty string, and false.',
            },
          },
          {
            heading: 'Chaining and Combining',
            content:
              'The ?? operator can be chained to try multiple fallback values. It can be combined with optional chaining (?.) for safe property access with defaults. However, ?? cannot be directly mixed with && or || without parentheses — this is a deliberate design choice to prevent ambiguous operator precedence.',
            code: `// Chaining ?? for multiple fallbacks
const a = null;
const b = undefined;
const c = 'found';
console.log(a ?? b ?? c); // 'found'

// Combined with optional chaining
const user = { settings: { theme: null } };
const theme = user.settings?.theme ?? 'light';
console.log('Theme:', theme); // 'light'

// Cannot mix with && or || without parens
// const x = a || b ?? c; // SyntaxError!
const x = (a || b) ?? c; // OK with parens
console.log(x);

// Nullish coalescing assignment (??=) — ES2021
let value = null;
value ??= 'default'; // assign only if null/undefined
console.log(value); // 'default'

let existing = 'keep';
existing ??= 'ignored'; // not null/undefined, no assignment
console.log(existing); // 'keep'

// Practical: initialize missing config values
const options = { retries: undefined, timeout: 0 };
options.retries ??= 3;
options.timeout ??= 5000;
console.log(options);`,
            output: `found
Theme: light
found
default
keep
{ retries: 3, timeout: 0 }`,
            tip: 'The ??= assignment operator is perfect for initializing config objects: options.key ??= defaultValue only assigns if the value is null or undefined.',
          },
        ],
      },
      {
        id: 'logical-assignment',
        title: 'Logical Assignment Operators',
        difficulty: 'intermediate',
        tags: ['logical-assignment', 'ES2021', 'nullish', 'short-circuit', 'assign'],
        cheatSheetSummary: '??=, ||=, &&= combine logical operators with assignment. ES2021.',
        quiz: [
          {
            question: 'What is the value of x after: let x = 0; x ??= 42;',
            options: [
              '42',
              '0',
              'undefined',
              'null',
            ],
            correctIndex: 1,
            explanation: 'The ??= operator only assigns when the left-hand side is null or undefined. Since x is 0 (which is neither null nor undefined), the assignment does not happen and x remains 0.',
          },
          {
            question: 'What is the value of x after: let x = ""; x ||= "hello";',
            options: [
              '""',
              '"hello"',
              'undefined',
              'true',
            ],
            correctIndex: 1,
            explanation: 'The ||= operator assigns when the left-hand side is falsy. An empty string is falsy, so x gets reassigned to "hello".',
          },
          {
            question: 'What is the value of x after: let x = 0; x &&= 5;',
            options: [
              '5',
              '0',
              'true',
              'undefined',
            ],
            correctIndex: 1,
            explanation: 'The &&= operator only assigns when the left-hand side is truthy. Since 0 is falsy, the assignment is skipped and x remains 0.',
          },
          {
            question: 'Which logical assignment operator should you use to set a default value while preserving falsy values like 0 and ""?',
            options: [
              '||= because it handles all falsy values',
              '&&= because it checks truthiness',
              '??= because it only triggers on null or undefined',
              '= because simple assignment always works',
            ],
            correctIndex: 2,
            explanation: 'The ??= operator is the correct choice when you want to assign a default only if the current value is null or undefined, while preserving intentional falsy values like 0, "", or false.',
          },
        ],
        challenge: {
          prompt: 'Write a function called normalizeOptions that takes an options object and uses all three logical assignment operators (??=, ||=, &&=) to normalize it. Use ??= for "timeout" (default 3000, preserve 0). Use ||= for "name" (default "anonymous", replace empty strings). Use &&= on "email" to lowercase it only if it exists.',
          starterCode: `function normalizeOptions(options) {
  // Use ??= to set timeout default (preserve 0)
  // Use ||= to set name default (replace empty string)
  // Use &&= to lowercase email only if truthy
  return options;
}

// Test cases:
console.log(normalizeOptions({ timeout: 0, name: '', email: 'ALICE@TEST.COM' }));
// Expected: { timeout: 0, name: 'anonymous', email: 'alice@test.com' }

console.log(normalizeOptions({ timeout: null, name: 'Bob', email: '' }));
// Expected: { timeout: 3000, name: 'Bob', email: '' }`,
          solutionCode: `function normalizeOptions(options) {
  options.timeout ??= 3000;
  options.name ||= 'anonymous';
  options.email &&= options.email.toLowerCase();
  return options;
}

// Test cases:
console.log(normalizeOptions({ timeout: 0, name: '', email: 'ALICE@TEST.COM' }));
// Expected: { timeout: 0, name: 'anonymous', email: 'alice@test.com' }

console.log(normalizeOptions({ timeout: null, name: 'Bob', email: '' }));
// Expected: { timeout: 3000, name: 'Bob', email: '' }`,
          hints: [
            'Remember: ??= only assigns if the value is null or undefined (not 0 or "").',
            'Remember: ||= assigns if the value is any falsy value (0, "", false, null, undefined).',
            'Remember: &&= only assigns if the value is truthy, so it skips "" and null.',
          ],
        },
        sections: [
          {
            heading: 'Logical Assignment Operators',
            content:
              'ES2021 introduced three logical assignment operators that combine logical operators with assignment using short-circuit evaluation. ??= assigns only if the current value is null or undefined. ||= assigns only if the current value is falsy. &&= assigns only if the current value is truthy. These operators make default value initialization and conditional updates more concise.',
            analogy: 'Think of it like auto-filling a form: ??= only fills in a field if it is completely blank (null/undefined), ||= fills it in if the answer looks empty or wrong (falsy), and &&= overwrites it only if there is already a valid answer there (truthy).',
            code: `// Nullish coalescing assignment (??=)
let a = null;
a ??= 'default';
console.log(a); // 'default'

let b = 0;
b ??= 42;
console.log(b); // 0 (0 is not null/undefined)

// Logical OR assignment (||=)
let c = '';
c ||= 'fallback';
console.log(c); // 'fallback' ('' is falsy)

let d = 'existing';
d ||= 'ignored';
console.log(d); // 'existing' (truthy, not assigned)

// Logical AND assignment (&&=)
let e = 1;
e &&= 2;
console.log(e); // 2 (1 is truthy, so assign)

let f = 0;
f &&= 2;
console.log(f); // 0 (0 is falsy, skip assignment)

// Practical: object initialization
const opts = {};
opts.retries ??= 3;
opts.timeout ??= 5000;
opts.debug ??= false;
console.log(opts);

// Conditional transformation
let user = { name: 'Alice', email: 'alice@test.com' };
user.name &&= user.name.toUpperCase();
console.log(user.name); // 'ALICE'`,
            codeHighlightLines: [3, 7, 12, 21, 25],
            output: `default
0
fallback
existing
2
0
{ retries: 3, timeout: 5000, debug: false }
ALICE`,
            tip: 'Use ??= for config defaults (preserves 0 and ""). Use ||= for fallbacks when any falsy value should trigger the default. Use &&= for conditional transformations.',
          },
          {
            heading: 'Real-World Examples',
            content:
              'Logical assignment operators shine in configuration initialization, lazy property computation, and conditional updates. They eliminate common patterns like "if (x === null) x = default" and "x = x || default", making code more concise without sacrificing readability.',
            analogy: 'Think of it like a smart thermostat: ??= sets the temperature only if nobody has programmed it yet, ||= resets it whenever the current setting seems off, and &&= adjusts it only if the system is already running.',
            code: `// Configuration merging
function createServer(options = {}) {
  options.port ??= 3000;
  options.host ??= 'localhost';
  options.cors ??= true;
  options.maxBodySize ??= '10mb';
  return options;
}
console.log(createServer({ port: 8080 }));
console.log(createServer());

// Lazy initialization
class Cache {
  #data = null;

  getData() {
    this.#data ??= this.#expensiveLoad();
    return this.#data;
  }

  #expensiveLoad() {
    console.log('Loading data...');
    return { items: [1, 2, 3] };
  }
}

const cache = new Cache();
console.log(cache.getData()); // 'Loading data...' + data
console.log(cache.getData()); // cached, no loading

// Normalize API response
function normalizeUser(raw) {
  raw.displayName ||= raw.email?.split('@')[0] || 'Anonymous';
  raw.avatar ||= '/default-avatar.png';
  raw.role ??= 'viewer';
  return raw;
}
console.log(normalizeUser({ email: 'alice@test.com', role: 'admin' }));`,
            output: `{ port: 8080, host: 'localhost', cors: true, maxBodySize: '10mb' }
{ port: 3000, host: 'localhost', cors: true, maxBodySize: '10mb' }
Loading data...
{ items: [1, 2, 3] }
{ items: [1, 2, 3] }
{ email: 'alice@test.com', role: 'admin', displayName: 'alice', avatar: '/default-avatar.png' }`,
            tip: 'Logical assignment operators use short-circuit evaluation. The right side is only evaluated if the assignment will actually happen, which is important for expensive operations.',
          },
        ],
      },
      {
        id: 'top-level-await',
        title: 'Top-Level await',
        difficulty: 'intermediate',
        tags: ['await', 'top-level', 'module', 'ES2022', 'async'],
        cheatSheetSummary: 'Use await at the module top level without wrapping in async function.',
        quiz: [
          {
            question: 'Where does top-level await work?',
            options: [
              'In any JavaScript file',
              'Only inside async functions',
              'Only in ES modules (type="module")',
              'In both CommonJS and ES modules',
            ],
            correctIndex: 2,
            explanation: 'Top-level await only works in ES modules. It does not work in CommonJS modules or regular script tags. The script or module must be declared with type="module".',
          },
          {
            question: 'What happens to a module that imports another module using top-level await?',
            options: [
              'It throws an error because await is only allowed in async functions',
              'It executes immediately without waiting for the imported module',
              'It blocks until the imported module\'s top-level await resolves',
              'It skips the import and continues execution',
            ],
            correctIndex: 2,
            explanation: 'Modules that use top-level await block their importers until the awaited promise resolves. This ensures dependent modules have fully initialized data before they are used.',
          },
          {
            question: 'What was the common workaround before top-level await was introduced?',
            options: [
              'Using synchronous XMLHttpRequest',
              'Wrapping code in an async IIFE: (async () => { ... })()',
              'Using callback functions instead of promises',
              'Using setTimeout with 0 delay',
            ],
            correctIndex: 1,
            explanation: 'Before top-level await, developers had to wrap their async code in an async immediately invoked function expression (IIFE) to use the await keyword at the module level.',
          },
        ],
        challenge: {
          prompt: 'Write a module-style script that uses top-level await to load configuration from an async source, then uses that configuration to initialize an application object. Simulate the async config loading with a Promise that resolves after a short delay.',
          starterCode: `// Simulate an async config loader
function loadConfig() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        apiUrl: 'https://api.example.com',
        timeout: 5000,
        retries: 3,
      });
    }, 100);
  });
}

// TODO: Use top-level await to load config and create an app object
// The app object should have: config, startedAt (Date), and a status of 'ready'

// console.log(app);`,
          solutionCode: `// Simulate an async config loader
function loadConfig() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        apiUrl: 'https://api.example.com',
        timeout: 5000,
        retries: 3,
      });
    }, 100);
  });
}

// Use top-level await to load config and create an app object
const config = await loadConfig();
const app = {
  config,
  startedAt: new Date(),
  status: 'ready',
};

console.log(app);`,
          hints: [
            'You can use await directly at the module level without wrapping in an async function.',
            'Call loadConfig() with await to get the resolved configuration object.',
            'Create the app object using the loaded config as a property.',
          ],
        },
        sections: [
          {
            heading: 'Top-Level await in Modules',
            content:
              'Top-level await (ES2022) allows you to use the await keyword at the module level, outside of any async function. This simplifies module initialization that depends on asynchronous operations like loading configuration, database connections, or fetching initial data. It only works in ES modules (type="module"), not in CommonJS or regular scripts.',
            analogy: 'Think of it like being allowed to wait for your coffee at the counter before sitting down — previously you had to sit first (wrap in async function) and then send someone to get it, but now you can just wait right there at the top level.',
            code: `// Before top-level await — had to use async IIFE
/*(async () => {
  const response = await fetch('/api/config');
  const config = await response.json();
  // use config...
})();*/

// With top-level await — clean and simple
// const response = await fetch('/api/config');
// const config = await response.json();
// export { config };

// Practical: conditional module loading
// const mode = process.env.NODE_ENV;
// const logger = await import(
//   mode === 'production' ? './prod-logger.js' : './dev-logger.js'
// );

// Practical: database connection
// export const db = await connectToDatabase(process.env.DB_URL);

// Simulated example
const data = await Promise.resolve({ loaded: true, items: [1, 2, 3] });
console.log('Module data:', data);

// Modules that use top-level await block their importers
// until the await resolves. This is intentional — it ensures
// dependent modules have fully initialized data.
const config = await Promise.resolve({
  apiUrl: 'https://api.example.com',
  timeout: 5000,
});
console.log('Config loaded:', config.apiUrl);`,
            output: `Module data: { loaded: true, items: [1, 2, 3] }
Config loaded: https://api.example.com`,
            tip: 'Top-level await blocks module evaluation until the Promise resolves. Use it for initialization, but avoid long-running operations that delay module loading.',
          },
        ],
      },
      {
        id: 'private-class-fields',
        title: 'Private Class Fields (#)',
        difficulty: 'intermediate',
        tags: ['private', 'class', 'field', 'method', 'encapsulation', 'ES2022'],
        cheatSheetSummary: '#field syntax for truly private class members. Language-level guarantee.',
        quiz: [
          {
            question: 'What happens when you try to access a private field (e.g., obj.#count) from outside the class?',
            options: [
              'It returns undefined',
              'It returns null',
              'It throws a SyntaxError',
              'It returns the value but logs a warning',
            ],
            correctIndex: 2,
            explanation: 'Attempting to access a private field from outside the class throws a SyntaxError. This is enforced at the language level, providing true encapsulation unlike the underscore convention.',
          },
          {
            question: 'How do private class fields (#) differ from TypeScript\'s "private" keyword?',
            options: [
              'They are identical in behavior',
              '# fields are enforced at runtime; TypeScript private is compile-time only',
              'TypeScript private is more secure than # fields',
              '# fields only work in TypeScript, not plain JavaScript',
            ],
            correctIndex: 1,
            explanation: 'Private fields with # are a true language-level guarantee enforced at runtime in plain JavaScript. TypeScript\'s "private" keyword is only a compile-time check and has no runtime enforcement.',
          },
          {
            question: 'What is "brand checking" with private fields?',
            options: [
              'Checking the brand name of a JavaScript engine',
              'Using #field in obj to check if an object is an instance of the class',
              'Verifying the version of the class',
              'Checking the constructor name of an object',
            ],
            correctIndex: 1,
            explanation: 'Brand checking uses the "in" operator with private fields (#field in obj) to reliably test if an object is an instance of a specific class. It is more reliable than instanceof across different realms.',
          },
        ],
        challenge: {
          prompt: 'Create a BankAccount class with truly private fields for #balance and #transactionHistory. Implement deposit(amount), withdraw(amount), and getStatement() methods. The withdraw method should throw an error if there are insufficient funds. The getStatement method should return a copy of the transaction history (not the internal array).',
          starterCode: `class BankAccount {
  // Declare private fields here

  constructor(initialBalance = 0) {
    // Initialize private fields
  }

  deposit(amount) {
    // Add to balance, record transaction
  }

  withdraw(amount) {
    // Subtract from balance if sufficient funds, record transaction
    // Throw error if insufficient funds
  }

  getStatement() {
    // Return a copy of transaction history
  }

  get balance() {
    // Return current balance
  }
}

// Test cases:
const account = new BankAccount(100);
account.deposit(50);
account.withdraw(30);
console.log(account.balance);       // 120
console.log(account.getStatement());
// console.log(account.#balance);   // SyntaxError!`,
          solutionCode: `class BankAccount {
  #balance;
  #transactionHistory;

  constructor(initialBalance = 0) {
    this.#balance = initialBalance;
    this.#transactionHistory = [
      { type: 'initial', amount: initialBalance, date: new Date() },
    ];
  }

  deposit(amount) {
    if (amount <= 0) throw new Error('Deposit must be positive');
    this.#balance += amount;
    this.#transactionHistory.push({
      type: 'deposit',
      amount,
      date: new Date(),
    });
  }

  withdraw(amount) {
    if (amount <= 0) throw new Error('Withdrawal must be positive');
    if (amount > this.#balance) throw new Error('Insufficient funds');
    this.#balance -= amount;
    this.#transactionHistory.push({
      type: 'withdrawal',
      amount,
      date: new Date(),
    });
  }

  getStatement() {
    return structuredClone(this.#transactionHistory);
  }

  get balance() {
    return this.#balance;
  }
}

// Test cases:
const account = new BankAccount(100);
account.deposit(50);
account.withdraw(30);
console.log(account.balance);       // 120
console.log(account.getStatement());
// console.log(account.#balance);   // SyntaxError!`,
          hints: [
            'Declare private fields with # at the top of the class body, before the constructor.',
            'Use this.#fieldName to access private fields within class methods.',
            'Use structuredClone() or spread to return a copy of the transaction history, not the internal array reference.',
          ],
        },
        sections: [
          {
            heading: 'Private Fields and Methods',
            content:
              'ES2022 introduced truly private class fields and methods using the # prefix. Unlike the _convention, # fields are genuinely inaccessible outside the class at the language level — attempting to access them throws a SyntaxError. This provides real encapsulation, not just a naming convention. Private fields must be declared in the class body before use.',
            analogy: 'Think of it like a hotel room safe versus a "do not touch" sign. The underscore convention (_secret) is the sign — anyone can ignore it. The # prefix is the actual safe with a lock that only the class itself can open.',
            code: `class Counter {
  // Private field (must be declared)
  #count = 0;
  #max;

  // Private static field
  static #instances = 0;

  constructor(max = Infinity) {
    this.#max = max;
    Counter.#instances++;
  }

  increment() {
    if (this.#count >= this.#max) {
      throw new Error('Max reached');
    }
    this.#count++;
    this.#log('incremented');
  }

  // Private method
  #log(action) {
    console.log(\`Counter \${action}: \${this.#count}\`);
  }

  get value() {
    return this.#count;
  }

  // Check if another Counter has same count
  equals(other) {
    return this.#count === other.#count;
  }

  static getInstanceCount() {
    return Counter.#instances;
  }
}

const c = new Counter(5);
c.increment();
c.increment();
console.log('Value:', c.value);
// console.log(c.#count); // SyntaxError!
// c.#log('test');         // SyntaxError!

console.log('Instances:', Counter.getInstanceCount());`,
            codeHighlightLines: [3, 4, 7, 23, 24],
            output: `Counter incremented: 1
Counter incremented: 2
Value: 2
Instances: 1`,
            tip: 'Private fields with # are a true language guarantee, unlike TypeScript\'s "private" which is only compile-time. The # prefix is enforced at runtime in plain JavaScript.',
            diagram: {
              kind: 'mermaid',
              code: 'classDiagram\n    class Counter {\n        -int #count\n        -int #max\n        -int #instances$\n        +Counter(max)\n        +increment() void\n        -#log(action) void\n        +value() int\n        +equals(other) bool\n        +getInstanceCount()$ int\n    }\n    note for Counter "#count, #max, #log\\nare truly private —\\ninaccessible outside\\nthe class at runtime"',
              caption: 'Private fields (#) are enforced at the language level. External access to #count or #log causes a SyntaxError.',
            },
          },
          {
            heading: 'Private Field Patterns',
            content:
              'Private fields enable patterns that were previously only possible with closures or WeakMaps. They are ideal for internal state management, validation, caching, and implementing the observer pattern. Private fields can also be checked with the "in" operator to test if an object is an instance of a class without using instanceof.',
            code: `class EventEmitter {
  #listeners = new Map();

  on(event, handler) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, []);
    }
    this.#listeners.get(event).push(handler);
    return this;
  }

  emit(event, ...args) {
    const handlers = this.#listeners.get(event) ?? [];
    handlers.forEach(h => h(...args));
    return this;
  }

  off(event, handler) {
    const handlers = this.#listeners.get(event) ?? [];
    this.#listeners.set(event, handlers.filter(h => h !== handler));
    return this;
  }

  // Brand checking with private in
  static isEmitter(obj) {
    return #listeners in obj;
  }
}

const emitter = new EventEmitter();
emitter
  .on('data', (msg) => console.log('Received:', msg))
  .on('data', (msg) => console.log('Also got:', msg));

emitter.emit('data', 'hello');
console.log('Is emitter:', EventEmitter.isEmitter(emitter));
console.log('Is emitter:', EventEmitter.isEmitter({}));`,
            codeHighlightLines: [25, 26],
            output: `Received: hello
Also got: hello
Is emitter: true
Is emitter: false`,
            tip: 'Use "#field in obj" (brand checking) to safely test if an object is an instance of your class. It is more reliable than instanceof across realms.',
          },
        ],
      },
      {
        id: 'at-method',
        title: 'Array/String.at()',
        difficulty: 'beginner',
        tags: ['at', 'array', 'string', 'negative-index', 'access', 'ES2022'],
        cheatSheetSummary: 'Access elements by index with negative index support: arr.at(-1).',
        signature: 'arr.at(index): T | undefined',
        quiz: [
          {
            question: 'What does arr.at(-1) return?',
            options: [
              'The first element of the array',
              'undefined',
              'The last element of the array',
              '-1',
            ],
            correctIndex: 2,
            explanation: 'The at() method with a negative index counts from the end of the array. at(-1) returns the last element, at(-2) returns the second-to-last, and so on.',
          },
          {
            question: 'What does [1, 2, 3].at(10) return?',
            options: [
              '3 (wraps around)',
              'null',
              'undefined',
              'Throws a RangeError',
            ],
            correctIndex: 2,
            explanation: 'When the index is out of range (either positive or negative), at() returns undefined, just like bracket notation with out-of-range indices.',
          },
          {
            question: 'Which of these is equivalent to arr.at(-1)?',
            options: [
              'arr[-1]',
              'arr[arr.length - 1]',
              'arr.last()',
              'arr.end()',
            ],
            correctIndex: 1,
            explanation: 'arr.at(-1) is equivalent to arr[arr.length - 1]. JavaScript bracket notation does not support negative indices (arr[-1] looks up a property named "-1"), and there is no built-in last() or end() method on arrays.',
          },
        ],
        challenge: {
          prompt: 'Write a function called rotateArray that takes an array and a number n, and returns a new array rotated by n positions. Use the at() method to access elements. Positive n rotates right, negative n rotates left.',
          starterCode: `function rotateArray(arr, n) {
  // Return a new array rotated by n positions
  // Use .at() for element access
}

// Test cases:
console.log(rotateArray([1, 2, 3, 4, 5], 2));   // [4, 5, 1, 2, 3]
console.log(rotateArray([1, 2, 3, 4, 5], -2));  // [3, 4, 5, 1, 2]
console.log(rotateArray(['a', 'b', 'c'], 1));   // ['c', 'a', 'b']`,
          solutionCode: `function rotateArray(arr, n) {
  const len = arr.length;
  if (len === 0) return [];
  const shift = ((n % len) + len) % len; // normalize to positive
  return arr.map((_, i) => arr.at(i - shift));
}

// Test cases:
console.log(rotateArray([1, 2, 3, 4, 5], 2));   // [4, 5, 1, 2, 3]
console.log(rotateArray([1, 2, 3, 4, 5], -2));  // [3, 4, 5, 1, 2]
console.log(rotateArray(['a', 'b', 'c'], 1));   // ['c', 'a', 'b']`,
          hints: [
            'Normalize n to handle values larger than the array length using modulo (%).',
            'Use .at() with negative indices to wrap around the array.',
            'Map over the array indices and use at(i - shift) to pick the correct element.',
          ],
        },
        sections: [
          {
            heading: 'Negative Indexing with at()',
            content:
              'The at() method (ES2022) provides a way to access array and string elements using both positive and negative integers. Negative indices count from the end, so at(-1) returns the last element. This is a much cleaner alternative to arr[arr.length - 1]. The method works on arrays, strings, and typed arrays.',
            analogy: 'Think of it like numbering seats in a row from both ends — seat 0 is the first from the left, and seat -1 is the first from the right (the last one). You can pick whichever direction is more convenient.',
            code: `const arr = ['a', 'b', 'c', 'd', 'e'];

// Positive indices (same as bracket notation)
console.log(arr.at(0));  // 'a'
console.log(arr.at(2));  // 'c'

// Negative indices (count from end)
console.log(arr.at(-1)); // 'e' (last)
console.log(arr.at(-2)); // 'd' (second to last)
console.log(arr.at(-5)); // 'a' (first)

// vs old way
console.log(arr[arr.length - 1]); // 'e' (verbose)

// Works on strings too
const str = 'Hello';
console.log(str.at(0));   // 'H'
console.log(str.at(-1));  // 'o'

// Out of range returns undefined
console.log(arr.at(100)); // undefined
console.log(arr.at(-100)); // undefined

// Practical: get last N elements
function lastN(arr, n) {
  return arr.slice(-n);
}
console.log(lastN([1, 2, 3, 4, 5], 3));`,
            codeHighlightLines: [8, 9, 13],
            output: `a
c
e
d
a
e
H
o
undefined
undefined
[3, 4, 5]`,
            tip: 'at(-1) is the cleanest way to access the last element. Use it instead of arr[arr.length - 1] everywhere in modern code.',
          },
        ],
      },
      {
        id: 'object-hasOwn',
        title: 'Object.hasOwn()',
        difficulty: 'beginner',
        tags: ['object', 'hasOwn', 'property', 'check', 'own', 'ES2022'],
        cheatSheetSummary: 'Check if object has own property. Safer than hasOwnProperty().',
        signature: 'Object.hasOwn(obj, prop): boolean',
        quiz: [
          {
            question: 'Why is Object.hasOwn() preferred over obj.hasOwnProperty()?',
            options: [
              'It is faster in all JavaScript engines',
              'It works on objects created with Object.create(null) and cannot be overridden',
              'It can check inherited properties too',
              'It returns the property value instead of a boolean',
            ],
            correctIndex: 1,
            explanation: 'Object.hasOwn() is a static method that works on objects with no prototype (Object.create(null)) and cannot be overridden by a custom hasOwnProperty on the object itself, making it safer and more reliable.',
          },
          {
            question: 'What does Object.hasOwn({ toString: 42 }, "toString") return?',
            options: [
              'false, because toString is inherited',
              'true, because toString is an own property on this object',
              'TypeError',
              'undefined',
            ],
            correctIndex: 1,
            explanation: 'Even though toString normally exists on the prototype, in this case it has been defined directly on the object as an own property with value 42, so Object.hasOwn returns true.',
          },
          {
            question: 'What happens with: const d = Object.create(null); d.key = 1; d.hasOwnProperty("key")?',
            options: [
              'Returns true',
              'Returns false',
              'Throws a TypeError because d has no prototype',
              'Returns undefined',
            ],
            correctIndex: 2,
            explanation: 'Objects created with Object.create(null) have no prototype, so they do not have the hasOwnProperty method. Calling d.hasOwnProperty() throws a TypeError. This is one of the key reasons Object.hasOwn() was introduced.',
          },
        ],
        challenge: {
          prompt: 'Write a function called pickOwn that takes an object and an array of keys, and returns a new object containing only the specified keys that are own properties of the source object. Use Object.hasOwn() for the check. Do not include inherited properties.',
          starterCode: `function pickOwn(obj, keys) {
  // Return a new object with only the specified own properties
  // Use Object.hasOwn() to check each key
}

// Test cases:
const proto = { inherited: true };
const obj = Object.create(proto);
obj.name = 'Alice';
obj.age = 30;

console.log(pickOwn(obj, ['name', 'age', 'inherited']));
// Expected: { name: 'Alice', age: 30 }
// 'inherited' should NOT be included because it's on the prototype

console.log(pickOwn({ a: 1, b: 2, c: 3 }, ['a', 'c', 'z']));
// Expected: { a: 1, c: 3 }`,
          solutionCode: `function pickOwn(obj, keys) {
  const result = {};
  for (const key of keys) {
    if (Object.hasOwn(obj, key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

// Test cases:
const proto = { inherited: true };
const obj = Object.create(proto);
obj.name = 'Alice';
obj.age = 30;

console.log(pickOwn(obj, ['name', 'age', 'inherited']));
// Expected: { name: 'Alice', age: 30 }
// 'inherited' should NOT be included because it's on the prototype

console.log(pickOwn({ a: 1, b: 2, c: 3 }, ['a', 'c', 'z']));
// Expected: { a: 1, c: 3 }`,
          hints: [
            'Create an empty result object and iterate over the keys array.',
            'For each key, use Object.hasOwn(obj, key) to check if it is an own property.',
            'Only add the key-value pair to the result if hasOwn returns true.',
          ],
        },
        sections: [
          {
            heading: 'Safer Property Checking',
            content:
              'Object.hasOwn() (ES2022) checks if an object has a property as its own (non-inherited) property. It is the safer replacement for obj.hasOwnProperty() because it works on objects created with Object.create(null) (which have no prototype) and cannot be overridden by defining a custom hasOwnProperty method on the object.',
            analogy: 'Think of it like asking the building registry if apartment 5B is owned by someone, rather than knocking on the door and asking the person inside — the registry (Object.hasOwn) cannot be fooled by an imposter, but the person at the door (hasOwnProperty) could be anyone.',
            code: `const user = { name: 'Alice', age: 30 };

// Object.hasOwn (recommended, ES2022)
console.log(Object.hasOwn(user, 'name'));     // true
console.log(Object.hasOwn(user, 'toString')); // false (inherited)

// vs hasOwnProperty (old way)
console.log(user.hasOwnProperty('name'));     // true

// Object.hasOwn works with Object.create(null)
const dict = Object.create(null);
dict.key = 'value';
console.log(Object.hasOwn(dict, 'key')); // true
// dict.hasOwnProperty('key'); // TypeError! (no prototype)

// Works even if hasOwnProperty is overridden
const tricky = {
  hasOwnProperty: () => false, // malicious override!
  name: 'gotcha',
};
console.log(tricky.hasOwnProperty('name'));    // false (wrong!)
console.log(Object.hasOwn(tricky, 'name'));    // true (correct!)

// Practical: safe object iteration
function ownEntries(obj) {
  return Object.keys(obj)
    .filter(key => Object.hasOwn(obj, key))
    .map(key => [key, obj[key]]);
}
console.log(ownEntries({ a: 1, b: 2 }));`,
            codeHighlightLines: [4, 13, 21, 22],
            output: `true
false
true
true
false
true
[['a', 1], ['b', 2]]`,
            tip: 'Always use Object.hasOwn(obj, key) instead of obj.hasOwnProperty(key). It is safer, more readable, and works in all edge cases.',
          },
        ],
      },
      {
        id: 'structuredClone-deep',
        title: 'Deep Cloning with structuredClone()',
        difficulty: 'intermediate',
        tags: ['structuredClone', 'deep-copy', 'clone', 'copy', 'ES2022'],
        cheatSheetSummary: 'Deep clone any value. Handles Dates, Maps, Sets, circular refs.',
        signature: 'structuredClone(value, options?): T',
        quiz: [
          {
            question: 'Which of the following can structuredClone() handle that JSON.parse(JSON.stringify()) cannot?',
            options: [
              'Simple strings and numbers',
              'Nested plain objects',
              'Dates, Maps, Sets, and circular references',
              'Arrays of primitives',
            ],
            correctIndex: 2,
            explanation: 'structuredClone() properly handles Date objects (preserving them as Dates), Map, Set, RegExp, ArrayBuffer, and even circular references. JSON round-trip turns Dates into strings, loses Maps/Sets entirely, and throws on circular references.',
          },
          {
            question: 'What type of value CANNOT be cloned by structuredClone()?',
            options: [
              'Date objects',
              'Functions',
              'Maps and Sets',
              'Nested arrays',
            ],
            correctIndex: 1,
            explanation: 'structuredClone() cannot clone functions, DOM nodes, or Symbols. Attempting to clone an object containing a function will throw a DataCloneError.',
          },
          {
            question: 'What is the advantage of spread ({...obj}) over structuredClone() for flat objects?',
            options: [
              'Spread handles nested objects better',
              'Spread is significantly faster for shallow copies',
              'Spread can clone functions',
              'Spread preserves Map and Set types',
            ],
            correctIndex: 1,
            explanation: 'For flat objects (no nested objects or special types), spread ({...obj}) is significantly faster because it performs a simple shallow copy without the overhead of the structured clone algorithm.',
          },
          {
            question: 'What happens when you structuredClone an object with a circular reference?',
            options: [
              'It throws a DataCloneError',
              'It correctly clones the object preserving the circular reference',
              'It sets the circular property to null',
              'It enters an infinite loop',
            ],
            correctIndex: 1,
            explanation: 'structuredClone() uses the structured clone algorithm which correctly handles circular references. The cloned object will have its own circular reference pointing to itself, independent of the original.',
          },
        ],
        challenge: {
          prompt: 'Write a function called deepMerge that takes a target object and a source object, and deeply merges the source into a clone of the target (without modifying either original). For nested objects, merge recursively. For arrays and non-object values, the source value should overwrite the target value. Use structuredClone() to avoid mutating the originals.',
          starterCode: `function deepMerge(target, source) {
  // Clone target using structuredClone to avoid mutation
  // Recursively merge source properties into the clone
  // Arrays and primitives from source overwrite target
  // Nested objects are merged recursively
}

// Test cases:
const base = {
  theme: 'dark',
  layout: { sidebar: true, width: 200 },
  colors: ['red', 'blue'],
};
const overrides = {
  theme: 'light',
  layout: { width: 300, compact: true },
  colors: ['green'],
};

const merged = deepMerge(base, overrides);
console.log(merged);
// { theme: 'light', layout: { sidebar: true, width: 300, compact: true }, colors: ['green'] }
console.log(base.layout.width); // 200 (original not modified)`,
          solutionCode: `function deepMerge(target, source) {
  const result = structuredClone(target);

  for (const key of Object.keys(source)) {
    if (
      Object.hasOwn(result, key) &&
      typeof result[key] === 'object' &&
      result[key] !== null &&
      !Array.isArray(result[key]) &&
      typeof source[key] === 'object' &&
      source[key] !== null &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(result[key], source[key]);
    } else {
      result[key] = structuredClone(source[key]);
    }
  }

  return result;
}

// Test cases:
const base = {
  theme: 'dark',
  layout: { sidebar: true, width: 200 },
  colors: ['red', 'blue'],
};
const overrides = {
  theme: 'light',
  layout: { width: 300, compact: true },
  colors: ['green'],
};

const merged = deepMerge(base, overrides);
console.log(merged);
// { theme: 'light', layout: { sidebar: true, width: 300, compact: true }, colors: ['green'] }
console.log(base.layout.width); // 200 (original not modified)`,
          hints: [
            'Start by creating a deep clone of the target using structuredClone().',
            'Iterate over the keys of the source object.',
            'If both the target and source values for a key are plain objects (not arrays), recurse.',
            'Otherwise, clone and assign the source value directly.',
          ],
        },
        sections: [
          {
            heading: 'Deep Cloning in Modern JavaScript',
            content:
              'Before structuredClone(), deep cloning required JSON.parse(JSON.stringify()) which fails with Dates, Maps, Sets, undefined, and circular references. structuredClone() uses the structured clone algorithm to properly handle all these types. It is available globally in all modern browsers (since 2022) and Node.js 17+.',
            analogy: 'Think of it like a 3D printer that can perfectly replicate an object including all of its internal parts — unlike a photocopier (JSON round-trip) that only captures the surface and loses colors and textures in the process.',
            code: `// Deep clone with complex types
const original = {
  date: new Date('2024-01-01'),
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
  nested: {
    array: [{ deep: true }],
  },
  regex: /hello/gi,
};

const clone = structuredClone(original);

// Verify deep independence
clone.nested.array[0].deep = false;
clone.set.add(99);
console.log('Original deep:', original.nested.array[0].deep); // true
console.log('Clone deep:', clone.nested.array[0].deep);       // false
console.log('Original set:', [...original.set]);  // [1, 2, 3]
console.log('Clone set:', [...clone.set]);         // [1, 2, 3, 99]
console.log('Date preserved:', clone.date instanceof Date);

// Handles circular references
const obj = { name: 'circular' };
obj.self = obj;
const circClone = structuredClone(obj);
console.log(circClone.self.name);          // 'circular'
console.log(circClone.self === circClone); // true`,
            codeHighlightLines: [12, 15, 16],
            output: `Original deep: true
Clone deep: false
Original set: [1, 2, 3]
Clone set: [1, 2, 3, 99]
Date preserved: true
circular
true`,
            tip: 'structuredClone() cannot clone functions, DOM nodes, or Error objects. For those cases, you need a custom deep clone implementation.',
          },
          {
            heading: 'Comparison of Cloning Methods',
            content:
              'JavaScript has three main cloning approaches: spread/Object.assign (shallow), JSON round-trip (deep but limited), and structuredClone (deep and comprehensive). Understanding when to use each is important. Spread is fastest for flat objects. JSON works for simple serializable data. structuredClone handles the most types correctly.',
            code: `// 1. Spread — SHALLOW copy
const a = { x: 1, nested: { y: 2 } };
const shallow = { ...a };
shallow.nested.y = 99;
console.log('Spread (shallow):', a.nested.y); // 99 (shared!)

// 2. JSON — deep but limited
const b = { x: 1, date: new Date(), fn: () => {} };
const jsonClone = JSON.parse(JSON.stringify(b));
console.log('JSON date:', typeof jsonClone.date); // string (broken!)
console.log('JSON fn:', jsonClone.fn);             // undefined (lost!)

// 3. structuredClone — deep and correct
const c = { x: 1, date: new Date(), map: new Map([['a', 1]]) };
const deepClone = structuredClone(c);
console.log('Clone date:', deepClone.date instanceof Date); // true
console.log('Clone map:', deepClone.map.get('a'));           // 1

// Cannot clone:
const fails = [
  // { fn: () => {} },        // functions
  // { dom: document.body },  // DOM nodes
  // { sym: Symbol() },       // symbols as values
];
for (const obj of fails) {
  try {
    structuredClone(obj);
  } catch (e) {
    console.log('Cannot clone:', e.message);
  }
}

// Performance tip: use spread for flat objects (faster)
const flat = { a: 1, b: 2, c: 3 };
const copy1 = { ...flat };           // fastest
const copy2 = structuredClone(flat); // works but overkill`,
            output: `Spread (shallow): 99
JSON date: string
JSON fn: undefined
Clone date: true
Clone map: 1`,
            tip: 'Use spread ({...obj}) for flat objects. Use structuredClone() for objects with nested objects, Maps, Sets, Dates, or circular references. Avoid JSON round-trip.',
            diagram: {
              kind: 'custom',
              type: 'algorithm-steps',
              data: {
                title: 'Cloning Methods Comparison',
                steps: [
                  { label: 'Spread {...obj}', detail: 'Shallow copy only. Nested objects are shared references. Fastest for flat objects.', status: 'partial' },
                  { label: 'JSON roundtrip', detail: 'Deep copy but loses Date (→string), Map, Set, undefined, functions, circular refs.', status: 'partial' },
                  { label: 'structuredClone()', detail: 'Deep copy. Handles Date, Map, Set, RegExp, ArrayBuffer, circular refs. Cannot clone functions or DOM nodes.', status: 'complete' },
                ],
              },
              caption: 'Three cloning approaches ranked by capability: spread is shallow-only, JSON is deep but lossy, structuredClone is deep and comprehensive.',
            },
          },
        ],
      },
    ],
  },
];

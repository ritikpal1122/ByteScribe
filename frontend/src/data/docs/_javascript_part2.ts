import type { DocCategory } from './types';

// Part 2: Control Flow + Functions
export const JS_PART2_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Control Flow                                                 */
  /* ------------------------------------------------------------ */
  {
    id: 'js-control-flow',
    label: 'Control Flow',
    icon: 'GitBranch',
    entries: [
      {
        id: 'conditionals',
        title: 'Conditionals',
        difficulty: 'beginner',
        tags: ['if', 'else', 'ternary', 'conditional', 'branching'],
        cheatSheetSummary: 'if/else for branching. Ternary (a ? b : c) for inline conditions.',
        sections: [
          {
            heading: 'if / else / else if',
            content:
              'Every program needs to make decisions, and `if/else` is where it all starts. Think of it as a fork in the road: your code checks a condition, and then takes one path or another. But here is the thing that catches almost every JavaScript beginner off guard: conditions are not limited to `true` or `false`. JavaScript will silently coerce any value into a boolean, and the rules are quirky. There are exactly six "falsy" values: `false`, `0`, `""` (empty string), `null`, `undefined`, and `NaN`. Absolutely everything else is truthy, including empty arrays `[]` and empty objects `{}`. That trips people up constantly. One more pro pattern to learn early: the guard clause. Instead of nesting `if` inside `if` inside `if` (the dreaded pyramid of doom), handle your edge cases at the top with early returns, then write your main logic at the top level. Your future self will thank you.',
            code: `const score = 85;

if (score >= 90) {
  console.log('A grade');
} else if (score >= 80) {
  console.log('B grade');
} else if (score >= 70) {
  console.log('C grade');
} else {
  console.log('Needs improvement');
}

// Truthy/falsy gotchas
if ([]) console.log('empty array is truthy');
if ({}) console.log('empty object is truthy');
if ('0') console.log("string '0' is truthy");

// Guard clause pattern (early return)
function processUser(user) {
  if (!user) return null;
  if (!user.isActive) return null;
  return user.name.toUpperCase();
}
console.log(processUser({ name: 'Alice', isActive: true }));
console.log(processUser(null));`,
            output: `B grade
empty array is truthy
empty object is truthy
string '0' is truthy
ALICE
null`,
            tip: 'Prefer guard clauses (early returns) over deeply nested if/else. Handle edge cases first, then write the main logic at the top level. This is one of the single biggest readability improvements you can make to any function.',
            warning: 'Empty arrays `[]` and empty objects `{}` are truthy in JavaScript! This is the #1 gotcha for developers coming from Python, where `[]` and `{}` are falsy. Always use `.length === 0` to check for empty arrays.',
            diagram: {
              kind: 'mermaid',
              code: `graph TD
  A["score = 85"] --> B{"score >= 90?"}
  B -->|Yes| C["'A grade'"]
  B -->|No| D{"score >= 80?"}
  D -->|Yes| E["'B grade'"]
  D -->|No| F{"score >= 70?"}
  F -->|Yes| G["'C grade'"]
  F -->|No| H["'Needs improvement'"]
  style E fill:#6c6,stroke:#333`,
              caption: 'if/else if/else evaluates conditions top-to-bottom, taking the first match',
            },
            codeHighlightLines: [3, 5, 7, 20, 21],
          },
          {
            heading: 'Ternary Operator',

            content:
              'The ternary operator is the Swiss Army knife of inline conditions: `condition ? valueIfTrue : valueIfFalse`. It is the only JavaScript operator that takes three operands, and it is everywhere in modern JS, especially in React JSX where you cannot use `if/else` statements inside curly braces. The key insight is that a ternary is an expression (it produces a value), while `if/else` is a statement (it does not). That is why ternaries work inside template literals, return statements, and JSX. But here is the golden rule: if your ternary is getting complicated, do not nest it more than one level deep. The moment you find yourself squinting to figure out what a ternary does, switch back to `if/else`. Readability always wins over cleverness.',
            code: `const age = 20;

// Basic ternary
const status = age >= 18 ? 'adult' : 'minor';
console.log(status); // 'adult'

// In template literals
console.log(\`You are \${age >= 18 ? 'an adult' : 'a minor'}\`);

// For assignment with fallback
const user = { name: 'Alice' };
const displayName = user.name ? user.name : 'Anonymous';
console.log(displayName);

// Nested ternary (use sparingly)
const score = 85;
const grade = score >= 90 ? 'A'
            : score >= 80 ? 'B'
            : score >= 70 ? 'C'
            : 'F';
console.log(\`Grade: \${grade}\`);

// In function returns
const abs = (n) => n >= 0 ? n : -n;
console.log(abs(-5)); // 5
console.log(abs(3));  // 3`,
            output: `adult
You are an adult
Alice
Grade: B
5
3`,
            tip: 'In React, ternaries are your bread and butter for conditional rendering: `{isLoggedIn ? <Dashboard /> : <Login />}`. For showing/hiding a single element, prefer `&&` instead: `{isAdmin && <AdminPanel />}`.',
            note: 'For simple fallbacks like `user.name ? user.name : "Anonymous"`, you can use the shorter `user.name || "Anonymous"`, or even better, `user.name ?? "Anonymous"` if you want to allow empty strings.',
            analogy: 'Think of it like a coin flip question: "Is this true? If yes, give me A; if no, give me B." The ternary is the inline way to ask and answer in a single breath.',
          },
          {
            heading: 'Conditional Patterns',
            content:
              'Once you are comfortable with `if/else` and ternaries, it is time to level up with patterns that experienced JavaScript developers use daily. Object lookup tables are a clean, elegant replacement for long `switch` or `if/else` chains: define a plain object where keys are your conditions and values are your results. Short-circuit evaluation with `&&` and `||` provides one-liner conditionals, but there is a critical subtlety you need to know: `||` returns the first truthy value, which means `0 || 3000` gives you `3000` even though `0` is a perfectly valid number. That is exactly why the nullish coalescing operator `??` was added in ES2020: it only treats `null` and `undefined` as "missing," leaving `0`, `""`, and `false` alone. Understanding the difference between `||` and `??` will save you from some of the most subtle bugs in JavaScript.',
            code: `// Object lookup table (replaces switch)
const actions = {
  save: () => console.log('Saving...'),
  delete: () => console.log('Deleting...'),
  edit: () => console.log('Editing...'),
};
const command = 'save';
actions[command]?.(); // 'Saving...' (safe call)

// Short-circuit conditional execution
const isAdmin = true;
isAdmin && console.log('Welcome, admin!');

// Default with ||
const port = 0 || 3000; // 3000 (0 is falsy — bug!)
const betterPort = 0 ?? 3000; // 0 (correct with ??)
console.log('port:', port, 'betterPort:', betterPort);

// Multiple conditions with array methods
const conditions = [true, true, false, true];
const allTrue = conditions.every(Boolean);
const anyTrue = conditions.some(Boolean);
console.log('all:', allTrue, 'any:', anyTrue);

// Pattern matching alternative (using object)
function getLabel(code) {
  return {
    200: 'OK',
    404: 'Not Found',
    500: 'Server Error',
  }[code] ?? 'Unknown';
}
console.log(getLabel(404));
console.log(getLabel(999));`,
            output: `Saving...
Welcome, admin!
port: 3000 betterPort: 0
all: false any: true
Not Found
Unknown`,
            tip: 'Object lookup tables are not just cleaner than switch statements, they are also dynamic: you can add, remove, or override entries at runtime. This makes them perfect for plugin systems and command dispatchers.',
            warning: 'The `||` operator falls back for ALL falsy values (`0`, `""`, `false`, `null`, `undefined`, `NaN`). If `0` or `""` are valid values in your context, always use `??` instead. This is one of the most common sources of subtle bugs in JavaScript.',
            codeHighlightLines: [8, 15, 16, 31],
          },
        ],
        quiz: [
          {
            question: 'Which of the following values is truthy in JavaScript?',
            options: ['0', 'null', '[]', '""'],
            correctIndex: 2,
            explanation: 'Empty arrays `[]` are truthy in JavaScript. The falsy values are: false, 0, "", null, undefined, and NaN. Everything else, including empty arrays and empty objects, is truthy.',
          },
          {
            question: 'What does the nullish coalescing operator (??) do differently from the logical OR (||)?',
            options: [
              'They behave identically',
              '?? only treats null and undefined as "missing", while || treats all falsy values as "missing"',
              '?? works with objects, || does not',
              '?? was deprecated in favor of ||',
            ],
            correctIndex: 1,
            explanation: 'The || operator returns the right-hand operand for ANY falsy value (0, "", false, null, undefined, NaN). The ?? operator only falls back for null and undefined, making it safer when 0 or "" are valid values.',
          },
          {
            question: 'What is a guard clause?',
            options: [
              'A special type of switch statement',
              'An early return at the top of a function to handle edge cases',
              'A ternary operator used inside an if block',
              'A try/catch block around conditionals',
            ],
            correctIndex: 1,
            explanation: 'Guard clauses handle edge cases at the top of a function with early returns, avoiding deeply nested if/else blocks (the "pyramid of doom"). This keeps the main logic at the top level and improves readability.',
          },
        ],
        challenge: {
          prompt: 'Write a function called `classifyTemperature` that takes a number (temperature in Fahrenheit) and returns "freezing" if below 32, "cold" if 32-59, "comfortable" if 60-79, "hot" if 80-99, or "extreme" if 100 or above. Use the nullish coalescing operator to return "invalid" if the input is null or undefined.',
          starterCode: `function classifyTemperature(temp) {
  // Use ?? to handle null/undefined
  // Use if/else or ternary to classify the temperature
}

console.log(classifyTemperature(25));    // "freezing"
console.log(classifyTemperature(55));    // "cold"
console.log(classifyTemperature(72));    // "comfortable"
console.log(classifyTemperature(95));    // "hot"
console.log(classifyTemperature(105));   // "extreme"
console.log(classifyTemperature(null));  // "invalid"`,
          solutionCode: `function classifyTemperature(temp) {
  const t = temp ?? null;
  if (t === null) return 'invalid';
  if (t < 32) return 'freezing';
  if (t < 60) return 'cold';
  if (t < 80) return 'comfortable';
  if (t < 100) return 'hot';
  return 'extreme';
}

console.log(classifyTemperature(25));    // "freezing"
console.log(classifyTemperature(55));    // "cold"
console.log(classifyTemperature(72));    // "comfortable"
console.log(classifyTemperature(95));    // "hot"
console.log(classifyTemperature(105));   // "extreme"
console.log(classifyTemperature(null));  // "invalid"`,
          hints: [
            'Use the ?? operator to check if temp is null or undefined, then use guard clauses (early returns) for each temperature range.',
            'Remember that guard clauses check conditions top-to-bottom with early returns, so order your range checks from lowest to highest.',
            'The ?? operator only treats null and undefined as "missing" — 0 would still be a valid temperature.',
          ],
        },
      },
      {
        id: 'switch',
        title: 'switch Statement',
        difficulty: 'beginner',
        tags: ['switch', 'case', 'break', 'default', 'fall-through'],
        cheatSheetSummary: 'Multi-way branching with strict equality. Always include break.',
        sections: [
          {
            heading: 'switch Basics',
            content:
              'The `switch` statement is for when you have one value and you want to compare it against many possible matches. Think of it like a receptionist directing visitors: "Are you here for sales? Go to floor 2. Marketing? Floor 3." Two important things to know. First, `switch` uses strict equality (`===`), so the number `1` will NOT match the string `"1"`. Second, and this is the trap that bites everyone at least once, if you forget `break`, execution will "fall through" into the next case. That is actually a feature, not a bug: you can intentionally group cases that share the same logic (like grouping "grape" and "blueberry" together). But accidental fall-through is such a common source of bugs that ESLint even has a rule for it. When you use `switch` inside a function, you can `return` directly from each case, which eliminates the need for `break` entirely. That is the cleanest pattern.',
            code: `const fruit = 'apple';

switch (fruit) {
  case 'apple':
    console.log('Red or green');
    break;
  case 'banana':
    console.log('Yellow');
    break;
  case 'grape':
  case 'blueberry': // fall-through: both hit same block
    console.log('Purple');
    break;
  default:
    console.log('Unknown fruit');
}

// switch with return (no break needed)
function getDayType(day) {
  switch (day.toLowerCase()) {
    case 'saturday':
    case 'sunday':
      return 'weekend';
    case 'monday':
    case 'tuesday':
    case 'wednesday':
    case 'thursday':
    case 'friday':
      return 'weekday';
    default:
      return 'invalid';
  }
}
console.log(getDayType('Saturday'));
console.log(getDayType('Monday'));`,
            output: `Red or green
weekend
weekday`,
            tip: 'When using `switch` inside a function, prefer `return` over `break`. It is cleaner, you cannot accidentally forget it, and it makes each case self-contained.',
            warning: 'Forgetting `break` in a `switch` is one of the most classic JavaScript bugs. Without it, execution silently falls through to the next case. Enable the ESLint `no-fallthrough` rule to catch this automatically.',
            analogy: 'Think of it like an elevator with labeled buttons: you press a floor number (the value), the elevator compares it against each labeled stop (the cases), and takes you to the matching floor. Without "break," the elevator keeps going through every floor below.',
            codeHighlightLines: [6, 10, 11, 23],
          },
          {
            heading: 'switch vs Object Lookup',
            content:
              'Here is an honest question: should you ever use `switch`? In many cases, the answer is no. Object lookup tables are simpler, more concise, and immune to the fall-through bug. They also have a superpower that `switch` does not: the values can be functions, and you can add or remove entries dynamically at runtime. The rule of thumb is straightforward: if you are mapping one value to another (like HTTP codes to messages), use an object lookup. If each case needs multiple statements with complex logic, side effects, or early returns, then `switch` earns its keep. The calculator example below shows the sweet spot for object lookups: each operation is a small function, and the whole thing reads like a data structure rather than control flow.',
            code: `// Object lookup — often cleaner than switch
const httpStatus = {
  200: 'OK',
  201: 'Created',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
};

function getStatusText(code) {
  return httpStatus[code] ?? 'Unknown Status';
}
console.log(getStatusText(200));
console.log(getStatusText(404));
console.log(getStatusText(999));

// Object lookup with functions
const calculator = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

function calculate(a, op, b) {
  const fn = calculator[op];
  if (!fn) throw new Error(\`Unknown operator: \${op}\`);
  return fn(a, b);
}
console.log(calculate(10, '+', 5));
console.log(calculate(10, '*', 3));`,
            output: `OK
Not Found
Unknown Status
15
30`,
            tip: 'For simple value mappings, prefer object lookups over switch. For complex multi-statement logic per case, switch may be more appropriate. Let the complexity of each case guide your choice.',
            note: 'Object lookups combined with the `??` (nullish coalescing) operator give you a clean default value for missing keys, just like the `default` case in a switch. This pattern is very common in configuration and routing code.',
          },
        ],
        quiz: [
          {
            question: 'What type of equality does the switch statement use in JavaScript?',
            options: ['Loose equality (==)', 'Strict equality (===)', 'Object.is()', 'It depends on the value type'],
            correctIndex: 1,
            explanation: 'The switch statement uses strict equality (===), meaning the number 1 will NOT match the string "1". This is an important detail to remember when comparing values in switch cases.',
          },
          {
            question: 'What happens if you forget the break statement in a switch case?',
            options: [
              'A syntax error is thrown',
              'The case is skipped',
              'Execution falls through to the next case',
              'The default case runs',
            ],
            correctIndex: 2,
            explanation: 'Without break, execution "falls through" into the next case and continues executing code until it hits a break, return, or the end of the switch block. This can be intentional (grouping cases) or a bug.',
          },
          {
            question: 'When should you prefer an object lookup over a switch statement?',
            options: [
              'When you have more than 10 cases',
              'When mapping one value to another simple value or function',
              'When you need to use regular expressions',
              'When you are inside a loop',
            ],
            correctIndex: 1,
            explanation: 'Object lookups are simpler and more concise for value-to-value or value-to-function mappings. Switch is better when each case requires complex multi-statement logic with side effects or early returns.',
          },
          {
            question: 'What is the purpose of the default case in a switch statement?',
            options: [
              'It runs before all other cases',
              'It runs after all other cases regardless',
              'It handles the scenario when no other case matches',
              'It is required by JavaScript syntax',
            ],
            correctIndex: 2,
            explanation: 'The default case handles any value that does not match the other cases. It is optional but recommended, similar to an else clause at the end of an if/else chain.',
          },
        ],
        challenge: {
          prompt: 'Create a function called `getHttpMessage` that takes an HTTP status code and returns a descriptive message. Use an object lookup table (not a switch statement). Handle codes 200, 201, 204, 301, 400, 401, 403, 404, and 500. Return "Unknown status code" for any unrecognized code.',
          starterCode: `function getHttpMessage(code) {
  // Create an object lookup table for HTTP status codes
  // Return the message or "Unknown status code" for unrecognized codes
}

console.log(getHttpMessage(200)); // "OK - Request successful"
console.log(getHttpMessage(404)); // "Not Found - Resource does not exist"
console.log(getHttpMessage(500)); // "Internal Server Error"
console.log(getHttpMessage(999)); // "Unknown status code"`,
          solutionCode: `function getHttpMessage(code) {
  const messages = {
    200: 'OK - Request successful',
    201: 'Created - Resource created successfully',
    204: 'No Content - Request successful, no body',
    301: 'Moved Permanently - Resource relocated',
    400: 'Bad Request - Invalid input',
    401: 'Unauthorized - Authentication required',
    403: 'Forbidden - Access denied',
    404: 'Not Found - Resource does not exist',
    500: 'Internal Server Error',
  };
  return messages[code] ?? 'Unknown status code';
}

console.log(getHttpMessage(200)); // "OK - Request successful"
console.log(getHttpMessage(404)); // "Not Found - Resource does not exist"
console.log(getHttpMessage(500)); // "Internal Server Error"
console.log(getHttpMessage(999)); // "Unknown status code"`,
          hints: [
            'Define a plain object where keys are the status codes (numbers) and values are the message strings.',
            'Use bracket notation to look up the code: messages[code], and use the ?? operator for the default.',
            'Remember that ?? only falls back for null and undefined, which is exactly what you get when a key is missing from an object.',
          ],
        },
      },
      {
        id: 'loops',
        title: 'Loops',
        difficulty: 'beginner',
        tags: ['for', 'while', 'do-while', 'loop', 'iteration', 'break', 'continue'],
        cheatSheetSummary: 'for, while, do...while for iteration. break exits, continue skips.',
        sections: [
          {
            heading: 'for, while, and do...while',
            content:
              'Loops are how you tell JavaScript to do something over and over. Let us break down the three classic loops, each with its own personality. The `for` loop is the workhorse: you set up a counter, define when to stop, and say how to increment. It is explicit and predictable. The `while` loop is more free-form: it just keeps going as long as a condition is true, which makes it perfect when you do not know ahead of time how many iterations you need (like reading a stream or polling an API). Then there is the `do...while` loop, the adventurous cousin: it always runs at least once before checking the condition. It is rare in practice, but useful for things like "ask the user for input until they give something valid." Two keywords give you surgical control inside any loop: `break` stops the loop immediately and moves on, while `continue` skips the rest of the current iteration and jumps to the next one. Think of `break` as "I found what I needed, let us get out of here" and `continue` as "skip this one, next please."',
            code: `// Classic for loop
for (let i = 0; i < 5; i++) {
  process.stdout.write(i + ' ');
}
console.log();

// while loop
let n = 1;
while (n <= 16) {
  process.stdout.write(n + ' ');
  n *= 2;
}
console.log();

// do...while — always runs at least once
let count = 0;
do {
  count++;
} while (count < 5);
console.log('count:', count);

// break — exit loop early
for (let i = 0; i < 100; i++) {
  if (i > 5) break;
  process.stdout.write(i + ' ');
}
console.log();

// continue — skip iteration
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) continue;
  process.stdout.write(i + ' ');
}
console.log();`,
            output: `0 1 2 3 4
1 2 4 8 16
count: 5
0 1 2 3 4 5
1 3 5 7 9`,
            tip: 'In modern JavaScript, you will rarely write raw `for` loops over arrays. Prefer `for...of` for iterating values and array methods like `map`, `filter`, and `reduce` for transformations. They are more readable and less prone to off-by-one errors.',
            warning: 'Infinite loops are the classic `while` loop pitfall. Always make sure your loop condition will eventually become `false`. If you are writing `while (true)`, make sure there is a `break` inside, and think carefully about whether it is always reachable.',
            diagram: {
              kind: 'mermaid',
              code: `graph TD
  subgraph "for loop"
    F1["Init: let i = 0"] --> F2{"i < 5?"}
    F2 -->|Yes| F3["Execute body"]
    F3 --> F4["i++"]
    F4 --> F2
    F2 -->|No| F5["Exit"]
  end
  subgraph "while loop"
    W1{"condition?"}
    W1 -->|Yes| W2["Execute body"]
    W2 --> W1
    W1 -->|No| W3["Exit"]
  end
  subgraph "do...while"
    D1["Execute body"] --> D2{"condition?"}
    D2 -->|Yes| D1
    D2 -->|No| D3["Exit"]
  end`,
              caption: 'for checks before each iteration; while checks before; do...while checks after (always runs at least once)',
            },
            codeHighlightLines: [2, 9, 17, 24, 31],
          },
          {
            heading: 'Labeled Statements',
            content:
              'Labeled statements are one of those features most JavaScript developers have never heard of, and honestly, you might go your entire career without needing them. But when you do need them, nothing else will do the job. Here is the scenario: you have a nested loop (a loop inside a loop), and you want to `break` out of the outer loop from inside the inner one. Without labels, `break` only exits the innermost loop. A label is just a name followed by a colon that you place before a loop. Then you can say `break myLabel` or `continue myLabel` to control that specific loop from anywhere inside it. The classic use case is searching through a 2D grid: once you find what you are looking for, you want to bail out of both loops at once.',
            code: `// Labeled break — exit outer loop from inner loop
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      console.log(\`Breaking at i=\${i}, j=\${j}\`);
      break outer;
    }
    console.log(\`i=\${i}, j=\${j}\`);
  }
}

console.log('---');

// Labeled continue — skip to next outer iteration
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) continue outer;
    console.log(\`i=\${i}, j=\${j}\`);
  }
}`,
            output: `i=0, j=0
i=0, j=1
i=0, j=2
i=1, j=0
Breaking at i=1, j=1
---
i=0, j=0
i=1, j=0
i=2, j=0`,
            tip: 'If you find yourself reaching for labeled loops, take a step back and ask: can I extract this into a separate function and use `return` instead? Nine times out of ten, that refactor produces cleaner, more testable code.',
            note: 'Labels are not `goto` statements. They can only be used with `break` and `continue`, and only for loops (and `switch` for `break`). They do not allow arbitrary jumps through your code.',
            codeHighlightLines: [2, 6, 15, 17],
          },
          {
            heading: 'Iterating with Indices',
            content:
              'Sometimes you need both the index and the value as you loop through an array. Maybe you are building a numbered list, or you need to know whether you are on the first or last element. JavaScript gives you three good options, each with its own flavor. The classic `for` loop is the old reliable: you get the index as your loop variable and grab the value with bracket notation. The modern `for...of` with `.entries()` is the cleanest: it gives you `[index, value]` pairs that you can destructure beautifully. And `forEach` is the functional approach: a callback that receives the value, index, and the whole array. The key difference to remember is that `forEach` cannot be stopped with `break`. If you might need to exit early, go with `for...of` or the classic `for` loop.',
            code: `const fruits = ['apple', 'banana', 'cherry'];

// Classic for — full control over index
for (let i = 0; i < fruits.length; i++) {
  console.log(\`\${i}: \${fruits[i]}\`);
}
console.log('---');

// for...of with entries() — modern and clean
for (const [index, fruit] of fruits.entries()) {
  console.log(\`\${index}: \${fruit}\`);
}
console.log('---');

// forEach — callback with index
fruits.forEach((fruit, index) => {
  console.log(\`\${index}: \${fruit}\`);
});
console.log('---');

// Reverse iteration
for (let i = fruits.length - 1; i >= 0; i--) {
  console.log(\`\${i}: \${fruits[i]}\`);
}`,
            output: `0: apple
1: banana
2: cherry
---
0: apple
1: banana
2: cherry
---
0: apple
1: banana
2: cherry
---
2: cherry
1: banana
0: apple`,
            tip: 'Need to check if any element matches a condition? Use `find()` or `some()` instead of a `forEach` with a flag variable. They short-circuit on the first match and make your intent crystal clear.',
            warning: '`forEach` cannot be stopped with `break` or `return` (the `return` only exits the callback, not the loop). If you need early termination, use `for...of` with `break`, or use `some()`/`find()` which stop at the first match.',
            analogy: 'Think of it like reading a numbered list: the classic for loop is counting each item aloud ("Item 1, Item 2..."), for...of with entries() is reading pairs from a table of contents, and forEach is handing each item to an assistant one at a time.',
          },
        ],
        quiz: [
          {
            question: 'What is the key difference between a while loop and a do...while loop?',
            options: [
              'while loops are faster',
              'do...while always executes its body at least once before checking the condition',
              'while loops can use break but do...while cannot',
              'do...while loops cannot have a counter variable',
            ],
            correctIndex: 1,
            explanation: 'A do...while loop executes the body first and then checks the condition, guaranteeing at least one execution. A while loop checks the condition first, so it might never execute if the condition is initially false.',
          },
          {
            question: 'What does the continue statement do inside a loop?',
            options: [
              'Stops the loop entirely',
              'Restarts the loop from the beginning',
              'Skips the rest of the current iteration and jumps to the next one',
              'Throws an error',
            ],
            correctIndex: 2,
            explanation: 'continue skips the remainder of the current iteration and jumps to the next iteration of the loop. break, on the other hand, exits the loop entirely.',
          },
          {
            question: 'Why might you NOT want to use forEach when iterating over an array?',
            options: [
              'forEach is slower than for loops',
              'forEach does not support the callback pattern',
              'forEach cannot be stopped early with break',
              'forEach modifies the original array',
            ],
            correctIndex: 2,
            explanation: 'forEach cannot be stopped with break or return (return only exits the callback, not the iteration). If you need early termination, use for...of with break, or array methods like find() or some() that short-circuit.',
          },
        ],
        challenge: {
          prompt: 'Write a function called `fizzBuzz` that takes a number n and returns an array of strings from 1 to n. For multiples of 3, use "Fizz". For multiples of 5, use "Buzz". For multiples of both 3 and 5, use "FizzBuzz". Otherwise, use the number as a string.',
          starterCode: `function fizzBuzz(n) {
  // Use a for loop to build an array of results
  // Check divisibility with the % operator
}

console.log(fizzBuzz(15));
// ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]`,
          solutionCode: `function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      result.push('FizzBuzz');
    } else if (i % 3 === 0) {
      result.push('Fizz');
    } else if (i % 5 === 0) {
      result.push('Buzz');
    } else {
      result.push(String(i));
    }
  }
  return result;
}

console.log(fizzBuzz(15));
// ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]`,
          hints: [
            'Check for multiples of both 3 and 5 first (i % 15 === 0), because if you check for 3 or 5 individually first, you will never reach the combined case.',
            'Use the modulo operator (%) to check divisibility: i % 3 === 0 means i is divisible by 3.',
            'Convert numbers to strings with String(i) or template literals when adding them to the result array.',
          ],
        },
      },
      {
        id: 'for-of-for-in',
        title: 'for...of & for...in',
        difficulty: 'beginner',
        tags: ['for-of', 'for-in', 'iteration', 'iterable', 'enumerable'],
        cheatSheetSummary: 'for...of iterates values (arrays, strings). for...in iterates object keys.',
        sections: [
          {
            heading: 'for...of — Iterating Values',
            content:
              'If there is one loop construct you should reach for by default in modern JavaScript, it is `for...of`. It gives you the values of any iterable: arrays, strings, Maps, Sets, generators, and even DOM NodeLists. The syntax is beautifully simple: `for (const item of collection)`. No index counters, no `.length` checks, no off-by-one bugs. And unlike `forEach`, you can use `break` and `continue` with `for...of`, giving you full control over the iteration. When combined with destructuring, `for...of` becomes incredibly expressive. Iterating over a Map gives you `[key, value]` pairs. Iterating over an array of objects lets you pull out exactly the properties you need. This is the loop that modern JavaScript was designed around.',
            code: `// Arrays
const colors = ['red', 'green', 'blue'];
for (const color of colors) {
  console.log(color);
}

// Strings
for (const char of 'Hello') {
  process.stdout.write(char + ' ');
}
console.log();

// Maps
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (const [key, value] of map) {
  console.log(\`\${key}: \${value}\`);
}

// Sets
const set = new Set([10, 20, 30]);
for (const num of set) {
  process.stdout.write(num + ' ');
}
console.log();

// With destructuring
const people = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
];
for (const { name, age } of people) {
  console.log(\`\${name} is \${age}\`);
}`,
            output: `red
green
blue
H e l l o
a: 1
b: 2
c: 3
10 20 30
Alice is 30
Bob is 25`,
            tip: '`for...of` works with anything that implements the `Symbol.iterator` protocol. This includes arrays, strings, Maps, Sets, TypedArrays, and generators. You can even make your own objects iterable by defining `[Symbol.iterator]()`.',
            note: '`for...of` does NOT work on plain objects. If you try `for (const x of {a: 1})`, you will get a TypeError. For objects, use `Object.entries()` to get iterable pairs: `for (const [k, v] of Object.entries(obj))`.',
            analogy: 'Think of it like a conveyor belt: for...of puts each item in front of you one at a time -- you just grab and use it, without worrying about the machinery (indices, counters) moving the belt.',
            codeHighlightLines: [3, 15, 31],
          },
          {
            heading: 'for...in — Iterating Object Keys',
            content:
              'Let us talk about `for...in`, and let us start with the most important rule: never use `for...in` on arrays. Seriously. It is designed for objects, and using it on arrays is a recipe for bugs. Here is why: `for...in` iterates over all enumerable string-keyed properties, including ones inherited from the prototype chain. On an array, that means you get index strings like `"0"`, `"1"`, `"2"` (strings, not numbers!), plus any custom properties anyone has added, plus inherited properties. It is a minefield. For objects, `for...in` works fine but has one gotcha: it walks up the prototype chain. If the object inherits properties from its constructor prototype, those show up too. That is why you will often see `Object.hasOwn(obj, key)` (or the older `obj.hasOwnProperty(key)`) as a guard inside `for...in` loops. In modern JavaScript, you are almost always better off using `Object.keys()`, `Object.values()`, or `Object.entries()` instead.',
            code: `// Iterating object keys
const person = { name: 'Alice', age: 30, city: 'NYC' };
for (const key in person) {
  console.log(\`\${key}: \${person[key]}\`);
}

// for...in includes inherited properties
function Animal(name) { this.name = name; }
Animal.prototype.speak = function() {};
const dog = new Animal('Rex');
dog.breed = 'Lab';

console.log('--- for...in (includes prototype):');
for (const key in dog) {
  console.log(key);
}

console.log('--- Own properties only:');
for (const key in dog) {
  if (Object.hasOwn(dog, key)) {
    console.log(key);
  }
}

// NEVER use for...in on arrays
const arr = [10, 20, 30];
arr.custom = 'oops';
console.log('--- for...in on array (bad):');
for (const key in arr) {
  console.log(key, typeof key); // keys are strings!
}`,
            output: `name: Alice
age: 30
city: NYC
--- for...in (includes prototype):
name
breed
speak
--- Own properties only:
name
breed
--- for...in on array (bad):
0 string
1 string
2 string
custom string`,
            warning: 'NEVER use `for...in` on arrays. The keys are strings (not numbers), inherited and custom properties show up, and iteration order is not guaranteed for numeric-like keys in all engines. Use `for...of` or array methods instead.',
            tip: 'Use `Object.hasOwn(obj, key)` (ES2022) instead of `obj.hasOwnProperty(key)`. It works even when the object does not inherit from `Object.prototype` (like objects created with `Object.create(null)`).',
            diagram: {
              kind: 'mermaid',
              code: `graph TD
  A["for...of"] --> B["Iterates VALUES"]
  B --> C["Arrays, Strings, Maps, Sets"]
  D["for...in"] --> E["Iterates KEYS (strings)"]
  E --> F["Object own + inherited properties"]
  style A fill:#6c6,stroke:#333
  style D fill:#f96,stroke:#333
  style B fill:#6c6,stroke:#333
  style E fill:#f96,stroke:#333`,
              caption: 'for...of gives you values from iterables; for...in gives you string keys from objects (including inherited ones)',
            },
          },
          {
            heading: 'Object Iteration Alternatives',
            content:
              'Forget `for...in`. The modern way to iterate over objects is with the `Object.keys()`, `Object.values()`, and `Object.entries()` trio. These methods only return an object\'s own properties (no prototype chain surprises), and they return real arrays, which means you can chain all the array methods you love: `map`, `filter`, `reduce`, `forEach`, and more. The real power move is `Object.entries()` combined with `Object.fromEntries()`. Together, they let you transform objects the same way `map` transforms arrays: convert to entries, transform, and convert back. Need to double every value in an object? Filter out certain properties? Rename keys? This pattern handles it all. Once you internalize this, you will wonder how you ever worked with objects without it.',
            code: `const scores = { alice: 95, bob: 87, charlie: 92 };

// Object.keys() — array of keys
console.log(Object.keys(scores));

// Object.values() — array of values
console.log(Object.values(scores));

// Object.entries() — array of [key, value] pairs
console.log(Object.entries(scores));

// Practical: transform with Object.entries + map
const doubled = Object.fromEntries(
  Object.entries(scores).map(([name, score]) => [name, score * 2])
);
console.log(doubled);

// Filter object properties
const passing = Object.fromEntries(
  Object.entries(scores).filter(([, score]) => score >= 90)
);
console.log('Passing:', passing);

// Iterate with forEach
Object.entries(scores).forEach(([name, score]) => {
  console.log(\`\${name}: \${score}\`);
});`,
            output: `['alice', 'bob', 'charlie']
[95, 87, 92]
[['alice', 95], ['bob', 87], ['charlie', 92]]
{ alice: 190, bob: 174, charlie: 184 }
Passing: { alice: 95, charlie: 92 }
alice: 95
bob: 87
charlie: 92`,
            tip: 'Think of `Object.entries()` and `Object.fromEntries()` as "object map/filter." They give objects the same transformation superpowers that arrays have always had. This pattern is indispensable when working with API responses, configuration objects, and state management.',
            note: 'The order of keys from `Object.keys()` follows a specific rule: integer-like keys come first (in ascending numeric order), then string keys in insertion order. For most use cases this does not matter, but be aware if key ordering is important to your logic.',
            codeHighlightLines: [4, 7, 10, 13, 14],
          },
        ],
        quiz: [
          {
            question: 'What does for...of iterate over?',
            options: [
              'Object keys as strings',
              'Values of iterable objects (arrays, strings, Maps, Sets)',
              'Only array indices',
              'Object prototype properties',
            ],
            correctIndex: 1,
            explanation: 'for...of iterates over the values of any iterable: arrays, strings, Maps, Sets, generators, and DOM NodeLists. It does NOT work on plain objects (use Object.entries() for that).',
          },
          {
            question: 'Why should you never use for...in on arrays?',
            options: [
              'It is slower than for...of',
              'It gives you string keys instead of numbers, includes inherited/custom properties, and order is not guaranteed',
              'It does not work on arrays at all',
              'It modifies the array during iteration',
            ],
            correctIndex: 1,
            explanation: 'for...in gives you string keys ("0", "1", "2"), includes any custom or inherited enumerable properties, and does not guarantee order for numeric-like keys. Use for...of or array methods for arrays.',
          },
          {
            question: 'What does Object.fromEntries() do?',
            options: [
              'Converts an object to an array of entries',
              'Converts an array of [key, value] pairs into an object',
              'Filters entries from an object',
              'Creates a deep copy of an object',
            ],
            correctIndex: 1,
            explanation: 'Object.fromEntries() takes an iterable of [key, value] pairs (like the array returned by Object.entries()) and creates a new object. Combined with Object.entries(), it enables map/filter transformations on objects.',
          },
          {
            question: 'What does Object.hasOwn(obj, key) check?',
            options: [
              'Whether the key exists anywhere in the prototype chain',
              'Whether the object has the key as its own (non-inherited) property',
              'Whether the key is enumerable',
              'Whether the value at that key is not undefined',
            ],
            correctIndex: 1,
            explanation: 'Object.hasOwn() (ES2022) checks if the object has the specified property as its own property (not inherited from the prototype chain). It is the modern replacement for obj.hasOwnProperty(key).',
          },
        ],
        challenge: {
          prompt: 'Write a function called `invertObject` that takes an object and returns a new object where keys and values are swapped. Use Object.entries() and Object.fromEntries() to achieve this. If multiple keys have the same value, the last one wins.',
          starterCode: `function invertObject(obj) {
  // Use Object.entries() and Object.fromEntries() to swap keys and values
}

console.log(invertObject({ a: '1', b: '2', c: '3' }));
// { '1': 'a', '2': 'b', '3': 'c' }

console.log(invertObject({ name: 'Alice', greeting: 'Hello' }));
// { Alice: 'name', Hello: 'greeting' }`,
          solutionCode: `function invertObject(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [value, key])
  );
}

console.log(invertObject({ a: '1', b: '2', c: '3' }));
// { '1': 'a', '2': 'b', '3': 'c' }

console.log(invertObject({ name: 'Alice', greeting: 'Hello' }));
// { Alice: 'name', Hello: 'greeting' }`,
          hints: [
            'Object.entries(obj) gives you an array of [key, value] pairs. You need to transform each pair to [value, key].',
            'Use .map() on the entries array to swap each [key, value] to [value, key], then pass the result to Object.fromEntries().',
          ],
        },
      },
      {
        id: 'error-handling',
        title: 'Error Handling',
        difficulty: 'intermediate',
        tags: ['try', 'catch', 'throw', 'error', 'finally', 'exception'],
        cheatSheetSummary: 'try/catch/finally for errors. Custom error classes extend Error.',
        sections: [
          {
            heading: 'try / catch / finally',
            content:
              'Error handling is where good code becomes great code. Without it, one bad JSON string or one failed network call brings your entire application crashing down. JavaScript uses the `try/catch/finally` pattern: wrap risky code in `try`, handle failures in `catch`, and use `finally` for cleanup that must happen regardless of success or failure (like closing database connections or clearing loading states). The `throw` statement lets you create your own errors when things go wrong. A crucial best practice: always throw `Error` objects, never raw strings. `Error` objects capture stack traces, which are the breadcrumb trail you need for debugging. Throwing a string like `throw "something broke"` gives you an error with no stack trace, and debugging without a stack trace is like looking for a needle in a haystack blindfolded. Since ES2019, you can even omit the error parameter in `catch` if you do not need it.',
            code: `// Basic try/catch/finally
try {
  const data = JSON.parse('invalid json');
} catch (error) {
  console.log('Caught:', error.message);
} finally {
  console.log('Cleanup always runs');
}

// Throwing errors
function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

try {
  console.log(divide(10, 2));
  console.log(divide(10, 0));
} catch (error) {
  console.log('Error:', error.message);
}

// Optional catch binding (ES2019) — omit error variable
try {
  JSON.parse('bad');
} catch {
  console.log('Parse failed (no error variable needed)');
}`,
            output: `Caught: Unexpected token i in JSON at position 0
Cleanup always runs
5
Error: Division by zero
Parse failed (no error variable needed)`,
            tip: 'Always throw `Error` objects, never strings: `throw new Error("message")` not `throw "message"`. Only `Error` objects give you stack traces, and stack traces are your best friend when debugging production issues.',
            warning: 'The `finally` block runs even if you `return` from inside `try` or `catch`. If `finally` also has a `return`, it will override the `return` from `try`/`catch`. This is a rare but extremely confusing edge case to be aware of.',
            diagram: {
              kind: 'mermaid',
              code: `graph TD
  A["try block"] --> B{"Error thrown?"}
  B -->|Yes| C["catch block"]
  B -->|No| D["Skip catch"]
  C --> E["finally block (always runs)"]
  D --> E
  E --> F["Continue execution"]`,
              caption: 'try executes risky code; catch handles errors; finally always runs regardless of outcome',
            },
            analogy: 'Think of it like a trapeze act: the try block is the performer attempting a trick, catch is the safety net that prevents a fatal fall, and finally is the cleanup crew that sweeps the stage whether the trick succeeds or fails.',
            codeHighlightLines: [2, 4, 6, 12],
          },
          {
            heading: 'Custom Error Classes',
            content:
              'As your application grows, generic `Error` objects are not enough. You need to distinguish between a validation error, a not-found error, and a network error so you can handle each one differently. The solution is custom error classes that extend `Error`. Each custom class can carry extra context: a `field` property for validation errors, a `statusCode` for HTTP errors, or any other metadata your error-handling logic needs. Then in your `catch` block, you use `instanceof` to route errors to the right handler. This pattern is everywhere in production codebases: Express.js middleware, API error handling, form validation layers. Since ES2022, you can also chain errors using the `cause` option: when you catch a low-level error and want to throw a higher-level one, pass the original as `{ cause: originalError }`. This preserves the full error chain for debugging while giving callers a meaningful error message.',
            code: `// Custom error classes
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

class NotFoundError extends Error {
  constructor(resource) {
    super(\`\${resource} not found\`);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

// Using custom errors
function validateAge(age) {
  if (typeof age !== 'number') {
    throw new ValidationError('age', 'Age must be a number');
  }
  if (age < 0 || age > 150) {
    throw new ValidationError('age', 'Age must be 0-150');
  }
  return age;
}

try {
  validateAge('twenty');
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(\`Validation: \${error.field} — \${error.message}\`);
  } else {
    throw error; // re-throw unknown errors
  }
}

// Error cause chaining (ES2022)
try {
  try {
    JSON.parse('bad');
  } catch (err) {
    throw new Error('Config load failed', { cause: err });
  }
} catch (error) {
  console.log(error.message);
  console.log('Caused by:', error.cause.message);
}`,
            output: `Validation: age — Age must be a number
Config load failed
Caused by: Unexpected token b in JSON at position 0`,
            tip: 'Always re-throw errors you do not know how to handle: `catch (error) { if (error instanceof MyError) { ... } else { throw error; } }`. Silently swallowing unknown errors is the fastest way to create impossible-to-debug applications.',
            note: 'When building an API, map your custom error classes to HTTP status codes in a centralized error handler. For example, `ValidationError` maps to 400, `NotFoundError` to 404, `AuthError` to 401. This pattern keeps your route handlers clean and your error responses consistent.',
            codeHighlightLines: [2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 32, 44],
          },
          {
            heading: 'Async Error Handling',
            content:
              'Async error handling is where many developers hit a wall. The rules change when you are dealing with Promises and `async/await`. In async functions, wrap your `await` calls in `try/catch` exactly like synchronous code. For raw Promises, chain `.catch()` on the end. The cardinal sin of async JavaScript is leaving a Promise rejection unhandled: in Node.js, this will crash your process with an `UnhandledPromiseRejection`, and in the browser, it silently swallows the error. Here is the key insight: `Promise.all()` fails fast. If any one of the promises rejects, the whole thing rejects and the rest are effectively ignored. If you want all promises to complete regardless of individual failures, use `Promise.allSettled()` instead. It returns the result of every promise, whether it fulfilled or rejected, letting you handle each outcome individually. This is particularly useful for things like batch API calls where partial success is acceptable.',
            code: `// Async/await error handling
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`);
    }
    return await response.json();
  } catch (error) {
    console.log('Fetch failed:', error.message);
    return null; // graceful fallback
  }
}

// Promise .catch()
function riskyOperation() {
  return Promise.reject(new Error('Something went wrong'));
}

riskyOperation()
  .then(result => console.log(result))
  .catch(error => console.log('Caught:', error.message));

// Handle multiple async operations
async function loadAll() {
  const results = await Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject(new Error('Failure')),
    Promise.resolve('Another success'),
  ]);

  for (const result of results) {
    if (result.status === 'fulfilled') {
      console.log('OK:', result.value);
    } else {
      console.log('FAIL:', result.reason.message);
    }
  }
}
loadAll();`,
            output: `Caught: Something went wrong
OK: Success
FAIL: Failure
OK: Another success`,
            tip: 'Use `Promise.allSettled()` when you want resilience (all promises complete, failures handled individually). Use `Promise.all()` when you want fail-fast behavior (one failure aborts everything). Choosing the right one depends on whether partial results are useful.',
            warning: 'Every `async` function returns a Promise. If you call an async function without `await` and it throws, you get an unhandled rejection. In Node.js, this crashes your process. Always `await` async calls or attach a `.catch()` handler.',
            diagram: {
              kind: 'mermaid',
              code: `graph LR
  subgraph "Promise.all()"
    A1["Promise A"] --> R1["Rejects"]
    A2["Promise B"] --> R1
    A3["Promise C"] --> R1
    R1 --> F1["Whole group FAILS"]
  end
  subgraph "Promise.allSettled()"
    B1["Promise A: fulfilled"] --> R2["All results collected"]
    B2["Promise B: rejected"] --> R2
    B3["Promise C: fulfilled"] --> R2
    R2 --> F2["Handle each individually"]
  end`,
              caption: 'Promise.all fails fast on first rejection; Promise.allSettled waits for all and reports each result',
            },
            analogy: 'Think of it like ordering food for a group: Promise.all is "if any dish fails, cancel the whole order," while Promise.allSettled is "bring whatever is ready and tell me which ones could not be made."',
          },
        ],
        quiz: [
          {
            question: 'What does the finally block do in a try/catch/finally statement?',
            options: [
              'It only runs if the try block succeeds',
              'It only runs if an error is caught',
              'It always runs regardless of whether an error occurred',
              'It replaces the catch block',
            ],
            correctIndex: 2,
            explanation: 'The finally block always runs, whether the try block succeeded or an error was caught. It is ideal for cleanup operations like closing connections, clearing loading states, or releasing resources.',
          },
          {
            question: 'Why should you throw Error objects instead of strings?',
            options: [
              'Strings cannot be caught by catch blocks',
              'Error objects capture stack traces for debugging',
              'Throwing strings is a syntax error',
              'Error objects are faster to process',
            ],
            correctIndex: 1,
            explanation: 'Error objects automatically capture stack traces, which show you exactly where the error originated and the call chain that led to it. Throwing a raw string gives you no stack trace, making debugging extremely difficult.',
          },
          {
            question: 'What is the difference between Promise.all() and Promise.allSettled()?',
            options: [
              'They behave identically',
              'Promise.all() fails fast on the first rejection; Promise.allSettled() waits for all and reports each result',
              'Promise.allSettled() is faster',
              'Promise.all() only works with async/await',
            ],
            correctIndex: 1,
            explanation: 'Promise.all() rejects immediately when any promise rejects (fail-fast). Promise.allSettled() waits for all promises to complete and returns an array of result objects with status "fulfilled" or "rejected" for each one.',
          },
          {
            question: 'What does the error cause option (ES2022) allow you to do?',
            options: [
              'Catch errors from specific modules only',
              'Chain errors by preserving the original error as the cause of a new higher-level error',
              'Prevent errors from propagating',
              'Automatically retry failed operations',
            ],
            correctIndex: 1,
            explanation: 'The cause option (new Error("message", { cause: originalError })) lets you wrap a low-level error in a more meaningful error while preserving the original. This creates an error chain that is invaluable for debugging.',
          },
        ],
        challenge: {
          prompt: 'Create a custom error class called `ApiError` that extends Error, takes a statusCode and message, and sets the name property to "ApiError". Then write a function `fetchUser` that takes an id and throws ApiError with status 400 for non-numeric ids, status 404 for id > 100, and returns { id, name: "User " + id } otherwise. Wrap the call in a try/catch that logs different messages based on the statusCode.',
          starterCode: `class ApiError extends Error {
  // Add constructor with statusCode and message
}

function fetchUser(id) {
  // Throw ApiError(400, ...) if id is not a number
  // Throw ApiError(404, ...) if id > 100
  // Return user object otherwise
}

// Test with try/catch
try {
  console.log(fetchUser(42));
  console.log(fetchUser('abc'));
} catch (error) {
  // Handle ApiError differently based on statusCode
  console.log(error.message);
}`,
          solutionCode: `class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

function fetchUser(id) {
  if (typeof id !== 'number') {
    throw new ApiError(400, 'Invalid ID: must be a number');
  }
  if (id > 100) {
    throw new ApiError(404, \`User \${id} not found\`);
  }
  return { id, name: 'User ' + id };
}

try {
  console.log(fetchUser(42));    // { id: 42, name: 'User 42' }
  console.log(fetchUser('abc')); // throws ApiError
} catch (error) {
  if (error instanceof ApiError) {
    console.log(\`[\${error.statusCode}] \${error.message}\`);
  } else {
    throw error;
  }
}`,
          hints: [
            'Extend Error with super(message) in the constructor, then assign this.name and this.statusCode as instance properties.',
            'Use typeof id !== "number" to validate the input, and use instanceof ApiError in the catch block to handle your custom error type.',
            'Always re-throw errors you do not recognize (the else branch in catch) to avoid silently swallowing unexpected errors.',
          ],
        },
      },
    ],
  },
  /* ------------------------------------------------------------ */
  /*  Functions                                                    */
  /* ------------------------------------------------------------ */
  {
    id: 'js-functions',
    label: 'Functions',
    icon: 'Boxes',
    entries: [
      {
        id: 'functions',
        title: 'Function Declarations & Expressions',
        difficulty: 'beginner',
        tags: ['function', 'declaration', 'expression', 'hoisting', 'default-params'],
        cheatSheetSummary: 'Declared with function keyword. Declarations are hoisted, expressions are not.',
        sections: [
          {
            heading: 'Function Declarations vs Expressions',
            content:
              'JavaScript gives you multiple ways to define functions, and the differences actually matter. A function declaration (using the `function` keyword as a statement) is hoisted, meaning JavaScript moves it to the top of its scope before executing any code. That is why you can call a declared function before its definition appears in the file. A function expression (assigning a function to a variable with `const` or `let`) is NOT hoisted. Try to call it before its definition, and you get a `ReferenceError`. So which should you use? Many developers prefer function declarations for top-level, standalone functions because hoisting lets you organize your code with the "main" logic at the top and helper functions below. Function expressions shine for callbacks, conditional definitions, and when you want to guarantee the function cannot be called before it is defined. Default parameters (added in ES2015) are a game-changer: instead of checking `if (name === undefined)` inside every function, you declare the fallback right in the parameter list. Clean, self-documenting, and obvious to anyone reading the signature.',
            code: `// Function declaration — hoisted
console.log(add(2, 3)); // 5 (works before definition!)

function add(a, b) {
  return a + b;
}

// Function expression — NOT hoisted
// console.log(multiply(2, 3)); // ReferenceError!
const multiply = function(a, b) {
  return a * b;
};
console.log(multiply(2, 3)); // 6

// Named function expression (useful for recursion/stack traces)
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
};
console.log(factorial(5)); // 120

// Default parameters
function greet(name = 'World', greeting = 'Hello') {
  return \`\${greeting}, \${name}!\`;
}
console.log(greet());
console.log(greet('Alice'));
console.log(greet('Alice', 'Hi'));`,
            output: `5
6
120
Hello, World!
Hello, Alice!
Hi, Alice!`,
            tip: 'Named function expressions like `const factorial = function fact(n) { ... }` give you the best of both worlds: the variable name for external reference and the function name for recursion and cleaner stack traces during debugging.',
            warning: 'Hoisting only works for function declarations, not expressions. `const add = function() {}` and `const add = () => {}` are both expressions and will throw `ReferenceError` if called before their definition line. This is actually a feature, as it prevents subtle bugs caused by calling functions before they are initialized.',
            diagram: {
              kind: 'mermaid',
              code: `graph TD
  A["JavaScript Engine Reads File"] --> B["Phase 1: Hoist declarations"]
  B --> C["function add() moved to top"]
  B --> D["const multiply stays in place"]
  C --> E["Phase 2: Execute code"]
  D --> E
  E --> F["add(2,3) works anywhere"]
  E --> G["multiply(2,3) only after definition"]
  style C fill:#6c6,stroke:#333
  style D fill:#f96,stroke:#333`,
              caption: 'Function declarations are hoisted (available everywhere); expressions are not (available only after definition)',
            },
            codeHighlightLines: [2, 4, 10, 23],
          },
          {
            heading: 'Rest Parameters and Arguments',
            content:
              'What if you do not know how many arguments a function will receive? That is where rest parameters come in. The `...args` syntax collects all remaining arguments into a real array, and it is one of those features that, once you learn it, you will use constantly. Before ES2015, JavaScript had the `arguments` object, which was array-like but not actually an array (you could not use `map`, `filter`, or `reduce` on it directly). Rest parameters fixed that: they give you a genuine array with all the array methods you know and love. One important rule: the rest parameter must be the last parameter in the function signature. You can have named parameters before it to capture specific arguments, and the rest parameter scoops up everything else. This pattern is beautiful for creating logging functions, event emitters, or any utility that needs to forward an arbitrary number of arguments.',
            code: `// Rest parameters — collect remaining args into an array
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Rest after named parameters
function log(level, ...messages) {
  console.log(\`[\${level}]\`, ...messages);
}
log('INFO', 'Server started', 'on port 3000');
log('ERROR', 'Connection failed');

// Functions as first-class values
const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
};

function calculate(op, a, b) {
  const fn = operations[op];
  if (!fn) throw new Error(\`Unknown: \${op}\`);
  return fn(a, b);
}
console.log(calculate('add', 10, 5));
console.log(calculate('multiply', 3, 7));`,
            output: `10
[INFO] Server started on port 3000
[ERROR] Connection failed
15
21`,
            tip: 'Rest parameters create a real array, so you can use `map`, `filter`, `reduce`, and all other array methods directly. The old `arguments` object required `Array.from(arguments)` first. Always prefer rest parameters in modern code.',
            note: 'Functions in JavaScript are "first-class citizens," meaning they can be assigned to variables, stored in arrays and objects, passed as arguments, and returned from other functions. This is the foundation that makes JavaScript so powerful for functional and event-driven programming.',
            analogy: 'Think of it like a moving box with a label: the named parameters are items you specifically labeled and set aside, while the rest parameter (...args) is the box that catches everything else that did not have its own label.',
          },
          {
            heading: 'Returning Values',
            content:
              'Every function in JavaScript returns something. If you do not include an explicit `return` statement, the function silently returns `undefined`. This is important to understand because it affects how your code behaves when you chain function calls or use return values in conditionals. When you need to return multiple values, JavaScript has two elegant approaches: return an object for named values (which the caller destructures with `{ min, max }`), or return an array for positional values (destructured with `[quotient, remainder]`). The object approach is usually better because the names are self-documenting and the order does not matter. But the real mind-bender for beginners is that functions can return other functions. This is called a higher-order function, and it is one of the most powerful concepts in JavaScript. When `multiplier(2)` returns `(n) => n * factor`, that returned function remembers that `factor` is `2`. That is a closure in action, and we will dive deep into closures shortly.',
            code: `// Explicit return
function square(n) {
  return n * n;
}
console.log(square(5)); // 25

// No return = undefined
function doSomething() {
  console.log('Working...');
}
console.log(doSomething()); // undefined

// Return multiple values via object
function getMinMax(arr) {
  return {
    min: Math.min(...arr),
    max: Math.max(...arr),
  };
}
const { min, max } = getMinMax([5, 1, 8, 3]);
console.log(\`min: \${min}, max: \${max}\`);

// Return multiple values via array
function divmod(a, b) {
  return [Math.floor(a / b), a % b];
}
const [quotient, remainder] = divmod(17, 5);
console.log(\`17 / 5 = \${quotient} remainder \${remainder}\`);

// Return a function (higher-order)
function multiplier(factor) {
  return (n) => n * factor;
}
const double = multiplier(2);
console.log(double(5)); // 10`,
            output: `25
Working...
undefined
min: 1, max: 8
17 / 5 = 3 remainder 2
10`,
            tip: 'Prefer returning objects over arrays for multiple return values. `const { min, max } = getMinMax(arr)` is self-documenting and order-independent. `const [a, b] = fn()` requires you to remember what position each value is in.',
            warning: 'A common trap with `return`: if you put the return value on the next line after `return`, JavaScript\'s automatic semicolon insertion (ASI) will treat it as `return;` (returning `undefined`). Always start the return value on the same line as the `return` keyword.',
            codeHighlightLines: [3, 15, 16, 17, 25, 32],
          },
        ],
        quiz: [
          {
            question: 'What is the key difference between a function declaration and a function expression?',
            options: [
              'Function declarations are faster',
              'Function declarations are hoisted (can be called before definition); expressions are not',
              'Function expressions cannot take parameters',
              'Function declarations cannot be assigned to variables',
            ],
            correctIndex: 1,
            explanation: 'Function declarations are hoisted by the JavaScript engine, meaning they are moved to the top of their scope and can be called before their definition appears in the code. Function expressions (const fn = function() {}) are NOT hoisted.',
          },
          {
            question: 'What does a rest parameter (...args) do?',
            options: [
              'Spreads an array into individual arguments',
              'Collects all remaining arguments into a real array',
              'Creates a copy of the arguments object',
              'Limits the number of arguments a function can accept',
            ],
            correctIndex: 1,
            explanation: 'Rest parameters (...args) collect all remaining arguments passed to a function into a genuine array. Unlike the old arguments object, this array supports all array methods like map, filter, and reduce.',
          },
          {
            question: 'What happens when a JavaScript function does not have an explicit return statement?',
            options: [
              'It throws an error',
              'It returns null',
              'It returns undefined',
              'It returns 0',
            ],
            correctIndex: 2,
            explanation: 'Every function in JavaScript returns undefined by default if there is no explicit return statement. This is important to remember when using return values from functions that are meant to produce side effects only.',
          },
        ],
        challenge: {
          prompt: 'Write a function called `createFormatter` that takes a template string with placeholders like "{name}" and "{age}", and returns a new function that accepts an object and fills in the placeholders. Use rest parameters, default parameters, and return a function (higher-order pattern).',
          starterCode: `function createFormatter(template = 'Hello, {name}!') {
  // Return a function that takes an object and replaces {key} with obj[key]
}

const greet = createFormatter('Hello, {name}! You are {age} years old.');
console.log(greet({ name: 'Alice', age: 30 }));
// "Hello, Alice! You are 30 years old."

const simple = createFormatter();
console.log(simple({ name: 'Bob' }));
// "Hello, Bob!"`,
          solutionCode: `function createFormatter(template = 'Hello, {name}!') {
  return (data) => {
    return template.replace(/\\{(\\w+)\\}/g, (match, key) => {
      return data[key] !== undefined ? data[key] : match;
    });
  };
}

const greet = createFormatter('Hello, {name}! You are {age} years old.');
console.log(greet({ name: 'Alice', age: 30 }));
// "Hello, Alice! You are 30 years old."

const simple = createFormatter();
console.log(simple({ name: 'Bob' }));
// "Hello, Bob!"`,
          hints: [
            'Use String.prototype.replace() with a regex like /\\{(\\w+)\\}/g to find all {key} placeholders in the template.',
            'The replace callback receives the full match and the captured group (the key name). Use the key to look up the value in the data object.',
            'The function returned by createFormatter is a closure over the template parameter -- it remembers the template string even after createFormatter returns.',
          ],
        },
      },
      {
        id: 'arrow-functions',
        title: 'Arrow Functions',
        difficulty: 'beginner',
        tags: ['arrow', 'lambda', 'fat-arrow', 'concise', 'this', 'lexical'],
        cheatSheetSummary: '(params) => expression. No own this/arguments. Ideal for callbacks.',
        signature: '(params) => expression  |  (params) => { statements }',
        sections: [
          {
            heading: 'Arrow Function Syntax',
            content:
              'Arrow functions, introduced in ES2015, are the single most-used function syntax in modern JavaScript. Open any React codebase and you will see them everywhere: callbacks, event handlers, component definitions, utility functions. The syntax is elegant: `(params) => expression`. When the body is a single expression, the result is returned implicitly, no `return` keyword needed. That means `x => x * 2` is a complete function. For a single parameter, you can even drop the parentheses: `x => x * 2`. For zero parameters, empty parens are required: `() => "hello"`. For multi-line logic, add curly braces and you are back to explicit `return`. There is one gotcha that catches everyone: returning an object literal. Since braces can mean either "function body" or "object literal," you need to wrap the object in parentheses: `(name) => ({ name, active: true })`. Without the outer parens, JavaScript thinks the braces are a function body and `name` is a label, not a key.',
            code: `// Concise body — implicit return
const double = (x) => x * 2;
const add = (a, b) => a + b;
console.log(double(5));  // 10
console.log(add(3, 4));  // 7

// Single parameter — parens optional
const square = x => x * x;
console.log(square(5)); // 25

// No parameters — parens required
const greet = () => 'Hello!';
console.log(greet());

// Return object literal — must wrap in parens
const makeUser = (name) => ({ name, active: true });
console.log(makeUser('Alice'));

// Block body — explicit return needed
const factorial = (n) => {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};
console.log(factorial(5)); // 120`,
            output: `10
7
25
Hello!
{ name: 'Alice', active: true }
120`,
            tip: 'When returning an object literal from an arrow function, always wrap it in parentheses: `() => ({ key: value })`. This is so common in React (returning state objects) that it will become second nature.',
            warning: 'Arrow functions do NOT have their own `this`, `arguments`, `super`, or `new.target`. They inherit these from their enclosing scope. This is usually what you want for callbacks, but it means arrow functions cannot be used as constructors (calling `new` on them throws a TypeError).',
            codeHighlightLines: [2, 3, 8, 16],
          },
          {
            heading: 'Arrow Functions and this',
            content:
              'Here is the moment of truth: the `this` keyword is one of the most confusing parts of JavaScript, and arrow functions exist partly to tame it. In a regular function, `this` is determined by HOW the function is called, not where it is defined. That means the same function can have a different `this` depending on whether it is called as a method, a callback, or a standalone function. This is the source of countless bugs, especially with `setTimeout`, event handlers, and array methods inside objects. Arrow functions take a completely different approach: they do not have their own `this` at all. Instead, they capture `this` from the surrounding scope at the time they are defined. Think of it like a photograph: the arrow function takes a snapshot of `this` and keeps it forever. That is why arrow functions are perfect for callbacks and event handlers inside methods. But there is a flip side: never use an arrow function as an object method if you need `this` to refer to the object. Since arrow functions do not have their own `this`, `this.name` will look for `name` in the outer scope, not on the object.',
            code: `const person = {
  name: 'Alice',

  // Regular method — this refers to person
  greet() {
    return \`Hi, I'm \${this.name}\`;
  },

  // Problem: this is lost in regular callback
  greetLater() {
    setTimeout(function() {
      // console.log(this.name); // undefined — this is global/undefined
    }, 100);
  },

  // Solution: arrow function captures outer this
  greetLaterFixed() {
    setTimeout(() => {
      console.log(\`Later: \${this.name}\`);
    }, 100);
  },
};

console.log(person.greet());
person.greetLaterFixed();

// Arrow functions in array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('doubled:', doubled);
console.log('evens:', evens);
console.log('sum:', sum);`,
            output: `Hi, I'm Alice
Later: Alice
doubled: [2, 4, 6, 8, 10]
evens: [2, 4]
sum: 15`,
            tip: 'The simple rule: use arrow functions for callbacks and inline functions. Use regular `function` or method shorthand (`greet() {}`) for object methods and class methods where you need `this` to refer to the instance.',
            warning: 'Never use arrow functions as object methods when you need `this`: `{ greet: () => this.name }` will NOT work because the arrow function captures `this` from the outer scope, not the object. Use the shorthand method syntax instead: `{ greet() { return this.name; } }`.',
            analogy: 'Think of it like a camera: a regular function is like looking through your own eyes (this changes depending on where you stand), while an arrow function is like a photograph taken at the moment of creation (this is frozen in place, capturing whatever was in view at that moment).',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  { label: 'Regular function', value: 'this = determined at CALL time', color: '#f87171' },
                  { label: 'Arrow function', value: 'this = captured at DEFINITION time', color: '#4ade80' },
                  { label: 'person.greet()', value: 'this = person', color: '#93c5fd' },
                  { label: 'setTimeout(function)', value: 'this = global/undefined', color: '#f87171' },
                  { label: 'setTimeout(() => ...)', value: 'this = person (captured)', color: '#4ade80' },
                ],
              },
              caption: 'Regular functions get this at call time (unpredictable); arrow functions capture this at definition time (predictable)',
            },
          },
        ],
        quiz: [
          {
            question: 'What happens when you return an object literal from an arrow function without wrapping it in parentheses?',
            options: [
              'It works correctly',
              'JavaScript interprets the braces as a function body, not an object literal',
              'It throws a syntax error',
              'The object is returned as a string',
            ],
            correctIndex: 1,
            explanation: 'Since curly braces can mean either "function body" or "object literal," JavaScript interprets `() => { key: value }` as a function body with a label statement. You must wrap object literals in parentheses: `() => ({ key: value })`.',
          },
          {
            question: 'How does `this` work in arrow functions compared to regular functions?',
            options: [
              'Arrow functions always bind this to the global object',
              'Arrow functions do not have their own this; they capture this from the enclosing scope at definition time',
              'Arrow functions and regular functions handle this identically',
              'Arrow functions throw an error when you use this',
            ],
            correctIndex: 1,
            explanation: 'Arrow functions do not have their own this binding. They lexically capture this from the surrounding scope at the time they are defined. This makes them ideal for callbacks inside methods, where regular functions would lose the this reference.',
          },
          {
            question: 'Why should you NOT use an arrow function as an object method?',
            options: [
              'Arrow functions are slower when used as methods',
              'Arrow functions cannot access object properties',
              'The arrow function captures this from the outer scope, not the object',
              'Arrow functions cannot be called with dot notation',
            ],
            correctIndex: 2,
            explanation: 'Since arrow functions capture this from the enclosing scope (not the object they are defined on), using them as methods means this will not refer to the object. Use method shorthand syntax instead: `{ greet() { return this.name; } }`.',
          },
          {
            question: 'When can you omit parentheses around arrow function parameters?',
            options: [
              'Never, parentheses are always required',
              'When there is exactly one parameter',
              'When there are no parameters',
              'When the function has a concise body',
            ],
            correctIndex: 1,
            explanation: 'You can omit parentheses only when there is exactly one parameter: `x => x * 2`. For zero parameters, you need empty parens: `() => ...`. For multiple parameters, you need parens: `(a, b) => ...`. For destructured parameters, you also need parens.',
          },
        ],
        challenge: {
          prompt: 'Refactor the following code to use arrow functions wherever appropriate. Convert the standalone functions to arrow function expressions and fix the setTimeout callback so that `this.name` works correctly inside the Timer object.',
          starterCode: `const Timer = {
  name: 'MyTimer',
  seconds: 0,
  start: function() {
    // Fix: this.name is undefined in the callback
    setTimeout(function() {
      console.log(this.name + ' started');
    }, 100);
  },
};

// Convert these to arrow functions
function double(x) {
  return x * 2;
}

function isEven(n) {
  return n % 2 === 0;
}

function sum(a, b) {
  return a + b;
}

const numbers = [1, 2, 3, 4, 5, 6];
const result = numbers.filter(isEven).map(double).reduce(sum, 0);
console.log(result); // 24`,
          solutionCode: `const Timer = {
  name: 'MyTimer',
  seconds: 0,
  start() {
    setTimeout(() => {
      console.log(this.name + ' started');
    }, 100);
  },
};

// Converted to arrow functions
const double = (x) => x * 2;
const isEven = (n) => n % 2 === 0;
const sum = (a, b) => a + b;

const numbers = [1, 2, 3, 4, 5, 6];
const result = numbers.filter(isEven).map(double).reduce(sum, 0);
console.log(result); // 24

Timer.start(); // "MyTimer started"`,
          hints: [
            'Replace the setTimeout regular function callback with an arrow function so that `this` captures the Timer object from the enclosing start() method.',
            'Simple one-expression functions like double, isEven, and sum are perfect candidates for concise arrow function syntax with implicit return.',
            'Keep the start method as a regular method (shorthand syntax) since it needs its own this binding to the Timer object.',
          ],
        },
      },
      {
        id: 'closures',
        title: 'Closures',
        difficulty: 'intermediate',
        tags: ['closure', 'scope', 'lexical', 'encapsulation', 'factory'],
        cheatSheetSummary: 'Functions that remember variables from their creation scope.',
        sections: [
          {
            heading: 'Understanding Closures',
            content:
              'Closures are a rite of passage for JavaScript developers. Once they click, you will see them everywhere, and they will change how you think about functions forever. Here is the core idea: a closure is a function that remembers the variables from the scope where it was created, even after that scope has finished executing. Think of it like a backpack: every function carries a backpack containing all the variables it could see when it was born. Even when that function travels far from home (gets passed as a callback, returned from another function, stored in a variable), it still has access to everything in its backpack. The magical part is that closures are not something you opt into. They happen automatically, every single time a function references a variable from an outer scope. You have been using closures since your first callback function, probably without realizing it. The `createCounter` example below is the classic demonstration: the `count` variable is completely private. No code outside can access or modify it directly. The only way to interact with it is through the methods returned by `createCounter`. That is encapsulation without classes.',
            code: `// Basic closure — inner function remembers outer variable
function createCounter() {
  let count = 0; // private — not accessible outside
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount());  // 1
// count variable is completely private

// Factory function using closure
function createMultiplier(factor) {
  return (number) => number * factor;
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5));  // 10
console.log(triple(5));  // 15

// Each closure has its own scope
const counters = [];
for (let i = 0; i < 3; i++) {
  counters.push(() => i); // let creates new scope each iteration
}
console.log(counters.map(fn => fn())); // [0, 1, 2]`,
            output: `1
2
1
1
10
15
[0, 1, 2]`,
            tip: 'Closures keep references to variables, not copies of their values. If the closed-over variable changes, the closure sees the updated value. This is a feature for counters and caches, but a bug if you are not expecting it.',
            warning: 'The classic closure trap: using `var` in a `for` loop. Because `var` is function-scoped (not block-scoped), all closures share the same variable and see its final value. Always use `let` in loops to get a fresh binding per iteration. This is one of the strongest arguments for never using `var` in modern JavaScript.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  { label: 'createCounter() scope', value: 'let count = 0', color: '#fbbf24' },
                  { label: 'increment()', value: 'closes over → count', color: '#4ade80' },
                  { label: 'decrement()', value: 'closes over → count', color: '#4ade80' },
                  { label: 'getCount()', value: 'closes over → count', color: '#4ade80' },
                  { label: 'Outside world', value: 'cannot access count directly', color: '#f87171' },
                ],
              },
              caption: 'The returned functions form closures over the private count variable -- they can read and modify it, but outside code cannot',
            },
            analogy: 'Think of it like a backpack that a function carries with it everywhere: when the function was created, it packed all the variables it could see into its backpack. Even after leaving its hometown (the parent scope), it can always reach into the backpack and use those variables.',
            codeHighlightLines: [3, 5, 6, 7, 20],
          },
          {
            heading: 'Practical Closure Patterns',
            content:
              'Now that you understand closures conceptually, let us see why they are so valuable in real-world code. Memoization is one of the most practical applications: wrap any expensive function in a memoizer, and it automatically caches results using a closure over a `Map`. Call it with the same arguments twice, and the second call is instant. Partial application is another power pattern: pre-fill some arguments of a function to create a more specific version. Instead of writing `add(10, 5)` every time, create `const add10 = partial(add, 10)` and then just call `add10(5)`. You will see this pattern everywhere in functional libraries like Lodash and Ramda, in Redux middleware, and in React hooks. The rate limiter example shows a real production use case: the `calls` counter and the `setInterval` reset are both trapped in the closure, invisible to the outside world. The only way to interact with the rate limiter is through the function it returns. This is the essence of closure-based encapsulation.',
            code: `// Memoization
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  console.log(\`Computing for \${n}...\`);
  return n * n;
});
console.log(expensiveCalc(5)); // Computing... 25
console.log(expensiveCalc(5)); // 25 (cached, no log)

// Partial application
function partial(fn, ...presetArgs) {
  return (...laterArgs) => fn(...presetArgs, ...laterArgs);
}
const add = (a, b) => a + b;
const add10 = partial(add, 10);
console.log(add10(5));  // 15
console.log(add10(20)); // 30

// Rate limiter using closure
function createRateLimiter(maxCalls, windowMs) {
  let calls = 0;
  setInterval(() => { calls = 0; }, windowMs);
  return (fn) => {
    if (calls < maxCalls) {
      calls++;
      return fn();
    }
    return 'Rate limited';
  };
}`,
            output: `Computing for 5...
25
25
15
30`,
            tip: 'React hooks like `useState` and `useEffect` are closures under the hood. When you write `const [count, setCount] = useState(0)`, the `count` variable is captured by every event handler and effect in that render. Understanding closures is the key to understanding why stale state bugs happen in React.',
            note: 'Memoization with `JSON.stringify(args)` works for primitive arguments but fails for object arguments that are structurally identical but referentially different. For object arguments, consider using a `WeakMap` or a more sophisticated cache key strategy.',
            codeHighlightLines: [3, 5, 6, 7, 8, 21, 22, 31, 32],
          },
        ],
        quiz: [
          {
            question: 'What is a closure in JavaScript?',
            options: [
              'A function that is immediately invoked',
              'A function that remembers variables from the scope where it was created, even after that scope has finished executing',
              'A function that closes over all global variables',
              'A function that cannot be called more than once',
            ],
            correctIndex: 1,
            explanation: 'A closure is a function that retains access to variables from its enclosing scope, even after the outer function has returned. The inner function "closes over" those variables, keeping references to them alive.',
          },
          {
            question: 'What happens when you use var instead of let in a for loop that creates closures?',
            options: [
              'Each closure gets its own copy of the variable',
              'All closures share the same variable and see its final value',
              'The code throws a ReferenceError',
              'var and let behave identically in for loops',
            ],
            correctIndex: 1,
            explanation: 'Because var is function-scoped (not block-scoped), all closures created in the loop share the same variable. By the time the closures are called, the loop has finished and the variable holds its final value. Using let creates a new binding per iteration, fixing this problem.',
          },
          {
            question: 'How does the memoize function use closures?',
            options: [
              'It creates a new function on every call',
              'It stores the cache Map in a closure that persists across calls to the memoized function',
              'It uses global variables to store cached results',
              'It modifies the original function to add caching',
            ],
            correctIndex: 1,
            explanation: 'The memoize function creates a cache (Map) in its scope and returns a new function that closes over that cache. Every call to the returned function can access the cache to check for and store results, without the cache being visible to outside code.',
          },
        ],
        challenge: {
          prompt: 'Create a function called `createBankAccount` that uses closures to create a private bank account. It should take an initial balance and return an object with methods: deposit(amount), withdraw(amount), and getBalance(). Withdrawals that exceed the balance should be rejected with a message. Keep a private transaction history array that logs each operation.',
          starterCode: `function createBankAccount(initialBalance) {
  // Private state: balance and transaction history
  // Return object with deposit, withdraw, getBalance, and getHistory methods
}

const account = createBankAccount(100);
console.log(account.getBalance());   // 100
account.deposit(50);
console.log(account.getBalance());   // 150
console.log(account.withdraw(30));   // { success: true, balance: 120 }
console.log(account.withdraw(200));  // { success: false, message: "Insufficient funds" }
console.log(account.getHistory());   // array of transaction records`,
          solutionCode: `function createBankAccount(initialBalance) {
  let balance = initialBalance;
  const history = [];

  return {
    deposit(amount) {
      balance += amount;
      history.push({ type: 'deposit', amount, balance });
      return { success: true, balance };
    },
    withdraw(amount) {
      if (amount > balance) {
        history.push({ type: 'withdraw-failed', amount, balance });
        return { success: false, message: 'Insufficient funds' };
      }
      balance -= amount;
      history.push({ type: 'withdraw', amount, balance });
      return { success: true, balance };
    },
    getBalance() {
      return balance;
    },
    getHistory() {
      return [...history];
    },
  };
}

const account = createBankAccount(100);
console.log(account.getBalance());   // 100
account.deposit(50);
console.log(account.getBalance());   // 150
console.log(account.withdraw(30));   // { success: true, balance: 120 }
console.log(account.withdraw(200));  // { success: false, message: "Insufficient funds" }
console.log(account.getHistory());`,
          hints: [
            'Declare balance and history as variables inside createBankAccount. The returned methods will form closures over them, making them private.',
            'In the withdraw method, check if the amount exceeds the balance before subtracting. Push a record to the history array for every operation (including failed ones).',
            'Return a copy of the history array with [...history] to prevent outside code from mutating the private transaction log.',
          ],
        },
      },
      {
        id: 'higher-order-functions',
        title: 'Higher-Order Functions',
        difficulty: 'intermediate',
        tags: ['higher-order', 'callback', 'functional', 'compose', 'pipe'],
        cheatSheetSummary: 'Functions that accept or return other functions.',
        sections: [
          {
            heading: 'Functions as Arguments',
            content:
              'A higher-order function is simply a function that takes another function as an argument, returns a function, or both. If that sounds abstract, here is the thing: you have been using them since day one. Every time you write `array.map(x => x * 2)`, you are passing a function to a higher-order function. `map`, `filter`, and `reduce` are the "Big Three" of higher-order functions in JavaScript, and mastering them will transform how you write code. Instead of writing `for` loops that mutate variables, you chain declarative transformations that describe WHAT you want, not HOW to get it. The chain in the example below reads almost like English: "take the numbers, keep the even ones, square them, and add them all up." That is the beauty of higher-order functions. They let you think in transformations rather than in loops and counters. Writing your own higher-order functions is just as natural. The `repeat` function below takes a count and a function, and calls that function `n` times. Simple, reusable, composable.',
            code: `// map, filter, reduce — the big three
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const doubled = numbers.map(n => n * 2);
console.log('doubled:', doubled);

const evens = numbers.filter(n => n % 2 === 0);
console.log('evens:', evens);

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('sum:', sum);

// Chaining higher-order functions
const result = numbers
  .filter(n => n % 2 === 0)     // [2, 4, 6, 8, 10]
  .map(n => n ** 2)              // [4, 16, 36, 64, 100]
  .reduce((acc, n) => acc + n, 0); // 220
console.log('chain result:', result);

// Custom higher-order function
function repeat(n, fn) {
  for (let i = 0; i < n; i++) {
    fn(i);
  }
}
repeat(3, (i) => console.log(\`Iteration \${i}\`));`,
            output: `doubled: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
evens: [2, 4, 6, 8, 10]
sum: 55
chain result: 220
Iteration 0
Iteration 1
Iteration 2`,
            tip: 'When chaining `map`, `filter`, and `reduce`, each step creates a new array (except `reduce`). For very large arrays (100K+ elements), consider using a single `reduce` instead of a chain, or use a lazy iteration library to avoid intermediate allocations.',
            note: 'Always provide an initial value as the second argument to `reduce`: `.reduce((acc, n) => acc + n, 0)`. Without it, `reduce` uses the first element as the initial accumulator, which fails on empty arrays and can cause subtle bugs with non-numeric data.',
            diagram: {
              kind: 'custom',
              type: 'array',
              data: {
                values: [
                  { step: 'Input', items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
                  { step: '.filter(even)', items: [2, 4, 6, 8, 10] },
                  { step: '.map(n**2)', items: [4, 16, 36, 64, 100] },
                  { step: '.reduce(sum)', items: [220] },
                ],
              },
              caption: 'Data flows through the chain: filter keeps even numbers, map squares them, reduce sums the result',
            },
            codeHighlightLines: [4, 7, 10, 15, 16, 17],
          },
          {
            heading: 'Functions Returning Functions',
            content:
              'When a function returns a function, you unlock composition: the ability to build complex behavior by snapping together simple pieces, like LEGO bricks. `pipe` and `compose` are the crown jewels of this approach. `pipe` chains functions left to right (like Unix pipes: `data | transform1 | transform2`), while `compose` chains right to left (like mathematical function composition: `f(g(x))`). Most developers find `pipe` more intuitive because it reads in the order the data flows. Currying takes this idea in another direction: it transforms a function that takes multiple arguments into a chain of functions that each take one argument. Why is that useful? Because it lets you partially apply arguments to create specialized functions. `add(1)(2)(3)` might look odd at first, but `const add5 = add(5)` is incredibly practical. You will find currying and composition everywhere in the JavaScript ecosystem: Redux middleware, Ramda and Lodash/fp, RxJS operators, and Express middleware stacks.',
            code: `// Compose — right to left
const compose = (...fns) =>
  (x) => fns.reduceRight((acc, fn) => fn(acc), x);

// Pipe — left to right (more intuitive)
const pipe = (...fns) =>
  (x) => fns.reduce((acc, fn) => fn(acc), x);

const double = x => x * 2;
const addOne = x => x + 1;
const square = x => x * x;

const transform = pipe(double, addOne, square);
console.log(transform(3)); // pipe: 3 -> 6 -> 7 -> 49

// Currying
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...more) => curried(...args, ...more);
  };
}

const add = curry((a, b, c) => a + b + c);
console.log(add(1)(2)(3));     // 6
console.log(add(1, 2)(3));     // 6
console.log(add(1)(2, 3));     // 6

// Practical: create configured functions
const add5 = add(5);
const add5and10 = add5(10);
console.log(add5and10(1)); // 16`,
            output: `49
6
6
6
16`,
            tip: '`pipe` reads left to right (like data flowing through a pipeline) and is usually more intuitive. `compose` reads right to left (like math notation f(g(x))). In practice, pick one and stick with it across your codebase for consistency.',
            note: 'The `curry` function uses `fn.length` to know how many arguments the original function expects. This breaks with rest parameters (`...args`) and default parameters, both of which cause `fn.length` to be unreliable. Keep curried functions simple with explicit parameters.',
            diagram: {
              kind: 'mermaid',
              code: `graph LR
  A["3"] -->|"double"| B["6"]
  B -->|"addOne"| C["7"]
  C -->|"square"| D["49"]
  style A fill:#93c5fd,stroke:#333
  style D fill:#4ade80,stroke:#333`,
              caption: 'pipe(double, addOne, square)(3): data flows left to right through each transformation',
            },
            codeHighlightLines: [6, 7, 13, 18, 19, 21],
          },
        ],
        quiz: [
          {
            question: 'What is a higher-order function?',
            options: [
              'A function that runs faster than other functions',
              'A function that takes another function as an argument, returns a function, or both',
              'A function defined at the top of a file',
              'A function that can only be called once',
            ],
            correctIndex: 1,
            explanation: 'A higher-order function is one that operates on other functions: it either takes a function as an argument (like map, filter, reduce), returns a function (like curry, compose), or both. This is a core concept of functional programming.',
          },
          {
            question: 'What is the difference between pipe and compose?',
            options: [
              'pipe is faster than compose',
              'pipe chains functions left to right; compose chains them right to left',
              'compose only works with two functions',
              'pipe can only be used with arrays',
            ],
            correctIndex: 1,
            explanation: 'pipe applies functions left to right (in reading order), while compose applies them right to left (like mathematical function composition f(g(x))). Most developers find pipe more intuitive because the data flows in the order you read it.',
          },
          {
            question: 'What does currying a function do?',
            options: [
              'Makes the function run asynchronously',
              'Transforms a function with multiple arguments into a chain of single-argument functions',
              'Caches the result of the function',
              'Converts the function to an arrow function',
            ],
            correctIndex: 1,
            explanation: 'Currying transforms a function like add(a, b, c) into add(a)(b)(c), where each call returns a new function that takes the next argument. This enables partial application: const add5 = add(5) creates a specialized function.',
          },
          {
            question: 'Why should you always provide an initial value to reduce()?',
            options: [
              'It is required by the JavaScript specification',
              'It makes reduce run faster',
              'Without it, reduce uses the first element as the accumulator, which fails on empty arrays and causes bugs with non-numeric data',
              'The initial value sets the return type',
            ],
            correctIndex: 2,
            explanation: 'Without an initial value, reduce uses the first array element as the starting accumulator. This throws a TypeError on empty arrays and can cause unexpected behavior when the accumulator type differs from the element type.',
          },
        ],
        challenge: {
          prompt: 'Implement a `pipe` function and use it to create a text processing pipeline. The pipeline should: (1) trim whitespace, (2) convert to lowercase, (3) replace spaces with hyphens, and (4) remove any non-alphanumeric characters except hyphens. This creates a URL-friendly "slug" from any text input.',
          starterCode: `// Implement pipe
function pipe(...fns) {
  // Return a function that passes input through each fn left-to-right
}

// Define individual transformation functions
// const trim = ...
// const toLower = ...
// const spacesToHyphens = ...
// const removeSpecialChars = ...

// Create the slug pipeline
// const slugify = pipe(trim, toLower, spacesToHyphens, removeSpecialChars);

console.log(slugify('  Hello World!  '));     // "hello-world"
console.log(slugify(' My Blog Post #1! ')); // "my-blog-post-1"`,
          solutionCode: `function pipe(...fns) {
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
}

const trim = (s) => s.trim();
const toLower = (s) => s.toLowerCase();
const spacesToHyphens = (s) => s.replace(/\\s+/g, '-');
const removeSpecialChars = (s) => s.replace(/[^a-z0-9-]/g, '');

const slugify = pipe(trim, toLower, spacesToHyphens, removeSpecialChars);

console.log(slugify('  Hello World!  '));     // "hello-world"
console.log(slugify(' My Blog Post #1! ')); // "my-blog-post-1"`,
          hints: [
            'pipe takes a list of functions and returns a new function. Use reduce to pass the input through each function: fns.reduce((acc, fn) => fn(acc), x).',
            'Each transformation function takes a string and returns a string. Use .trim(), .toLowerCase(), .replace() with regex patterns.',
            'For removing special characters, use a regex like /[^a-z0-9-]/g which keeps only lowercase letters, digits, and hyphens.',
          ],
        },
      },
      {
        id: 'iife',
        title: 'IIFE (Immediately Invoked Function Expression)',
        difficulty: 'intermediate',
        tags: ['iife', 'scope', 'module', 'pattern', 'encapsulation'],
        cheatSheetSummary: '(function() { ... })() — creates private scope. Less needed with ES modules.',
        signature: '(function() { /* code */ })();',
        sections: [
          {
            heading: 'IIFE Pattern',
            content:
              'An IIFE (pronounced "iffy") is a function that runs the instant it is defined. The syntax looks unusual at first: you wrap a function in parentheses to make it an expression, then immediately invoke it with `()`. Why would you do this? Because it creates a private scope. Any variables declared inside the IIFE are invisible to the outside world, preventing pollution of the global or enclosing scope. Before ES modules came along, IIFEs were THE way to write modular JavaScript. jQuery plugins, Node.js libraries, browser scripts: they all used IIFEs to avoid name collisions. In modern JavaScript with `import/export`, you rarely need IIFEs for encapsulation. But they still have two strong use cases. First, async IIFEs: `(async () => { ... })()` lets you use `await` in contexts where top-level `await` is not available. Second, one-time initialization: when you need to compute a complex value and do not want temporary variables leaking into the surrounding scope. The IIFE runs, returns a value, and all its internal state disappears.',
            code: `// Basic IIFE
(function() {
  const secret = 'hidden';
  console.log('IIFE ran!', secret);
})();
// console.log(secret); // ReferenceError — not accessible

// IIFE with return value
const result = (function() {
  const x = 10;
  const y = 20;
  return x + y;
})();
console.log('Result:', result); // 30

// Arrow function IIFE
const config = (() => {
  const env = 'production';
  const debug = false;
  return { env, debug };
})();
console.log('Config:', config);

// Async IIFE
(async () => {
  const data = await Promise.resolve('loaded');
  console.log('Async IIFE:', data);
})();

// IIFE for one-time setup
const counter = (() => {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count,
  };
})();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2`,
            output: `IIFE ran! hidden
Result: 30
Config: { env: 'production', debug: false }
Async IIFE: loaded
1
2`,
            tip: 'Async IIFEs are still genuinely useful in 2024+. Use `(async () => { const data = await fetch(url); ... })()` in scripts, test files, or any context where top-level `await` is not supported.',
            note: 'With ES modules (`import`/`export`), you get file-level scope for free, so IIFEs for encapsulation are rarely needed. But if you are writing a `<script>` tag without `type="module"`, variables are global by default, and an IIFE is still the right tool for isolation.',
            analogy: 'Think of it like a self-destructing message: the IIFE creates a private room, does its work, hands you the result through a slot in the door, and then the room vanishes -- no one can ever go back inside.',
            codeHighlightLines: [2, 5, 9, 13, 17, 21, 25, 28],
          },
          {
            heading: 'Module Pattern with IIFE',
            content:
              'The module pattern is where IIFEs truly shine, and understanding it is essential even in the ES modules era, because so much existing JavaScript uses it. The pattern is elegant: an IIFE that returns a public API object, keeping everything else private. Think of it as building a black box. The inside has private variables, private helper functions, and internal state. The outside only sees the methods you choose to expose. In the `UserModule` example below, the `users` array, the `nextId` counter, and the `validate` function are completely hidden. The only way to interact with the module is through `add`, `getAll`, `findById`, and `count`. Notice that `getAll` returns a copy of the array with `[...users]`, not the original. This is defensive programming: even though the `users` array is private, returning it directly would let callers mutate it. Many legacy codebases, npm packages, and browser libraries you use every day are structured exactly like this.',
            code: `// Module pattern
const UserModule = (() => {
  // Private state
  const users = [];
  let nextId = 1;

  // Private function
  function validate(name) {
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid name');
    }
  }

  // Public API
  return {
    add(name) {
      validate(name);
      const user = { id: nextId++, name };
      users.push(user);
      return user;
    },
    getAll() {
      return [...users]; // return copy, not reference
    },
    findById(id) {
      return users.find(u => u.id === id) ?? null;
    },
    count() {
      return users.length;
    },
  };
})();

console.log(UserModule.add('Alice'));
console.log(UserModule.add('Bob'));
console.log('Count:', UserModule.count());
console.log('All:', UserModule.getAll());
console.log('Find:', UserModule.findById(1));`,
            output: `{ id: 1, name: 'Alice' }
{ id: 2, name: 'Bob' }
Count: 2
All: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
Find: { id: 1, name: 'Alice' }`,
            tip: 'In new projects, prefer ES modules (`export`/`import`) over the IIFE module pattern. ES modules give you static analysis, tree-shaking, and better tooling. But when reading legacy code, recognizing this pattern is essential: it is the backbone of pre-2015 JavaScript architecture.',
            note: 'The module pattern is the predecessor to ES modules, CommonJS (`require`/`module.exports`), and AMD (`define`/`require`). Understanding it helps you appreciate why JavaScript developed its module systems the way it did, and makes reading older codebases much easier.',
            diagram: {
              kind: 'mermaid',
              code: `graph TD
  A["IIFE Creates Private Scope"] --> B["Private: users[], nextId, validate()"]
  A --> C["Public API returned"]
  C --> D["add()"]
  C --> E["getAll()"]
  C --> F["findById()"]
  C --> G["count()"]
  D --> B
  E --> B
  F --> B
  G --> B
  style B fill:#f87171,stroke:#333
  style C fill:#4ade80,stroke:#333`,
              caption: 'The module pattern: the IIFE returns a public API that has closure access to private internal state',
            },
            codeHighlightLines: [2, 4, 5, 8, 15, 32],
          },
        ],
      },
    ],
  },
];

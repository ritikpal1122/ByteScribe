import type { DocCategory } from './types';

// Part 6: Built-in Objects + DOM Basics
export const JS_PART6_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Built-in Objects                                             */
  /* ------------------------------------------------------------ */
  {
    id: 'js-built-in-objects',
    label: 'Built-in Objects',
    icon: 'Box',
    entries: [
      {
        id: 'math-object',
        title: 'Math Object',
        difficulty: 'beginner',
        tags: ['math', 'random', 'round', 'floor', 'ceil', 'constants'],
        cheatSheetSummary: 'Static math functions: Math.floor(), Math.random(), Math.max(), etc.',
        sections: [
          { heading: 'Math Methods', content: 'The Math object provides static methods and constants for mathematical operations. It is not a constructor so you call methods directly. Common methods include floor(), ceil(), round() for rounding, min(), max() for extremes, abs() for absolute value, and random() for generating random numbers between 0 and 1.',
            analogy: 'Think of it like a scientific calculator you never need to turn on — it is always available as a global utility, and you just press the function button you need.',
            code: `// Rounding
console.log(Math.floor(4.7));   // 4 (round down)
console.log(Math.ceil(4.2));    // 5 (round up)
console.log(Math.round(4.5));   // 5 (round to nearest)
console.log(Math.trunc(4.9));   // 4 (remove decimal)
console.log(Math.trunc(-4.9));  // -4

// Min, Max, Abs
console.log(Math.max(5, 10, 3));  // 10
console.log(Math.min(5, 10, 3));  // 3
console.log(Math.abs(-15));       // 15

// Powers and roots
console.log(Math.sqrt(144));    // 12
console.log(Math.cbrt(27));     // 3
console.log(Math.pow(2, 10));   // 1024
console.log(Math.log2(1024));   // 10

// Random number in range [min, max]
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log('Random 1-10:', randomInt(1, 10));

// Constants
console.log('PI:', Math.PI.toFixed(5));
console.log('E:', Math.E.toFixed(5));`,
            codeHighlightLines: [18, 19, 20],
            output: `4
5
5
4
-4
10
3
15
12
3
1024
10
Random 1-10: 7
PI: 3.14159
E: 2.71828`,
            tip: 'Math.random() returns [0, 1) — it can return 0 but never exactly 1. For cryptographic randomness, use crypto.getRandomValues().',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n    subgraph Rounding\n        A["4.7"] -->|"Math.floor()"| B["4"]\n        C["4.2"] -->|"Math.ceil()"| D["5"]\n        E["4.5"] -->|"Math.round()"| F["5"]\n        G["4.9"] -->|"Math.trunc()"| H["4"]\n    end\n    subgraph Random\n        I["Math.random()"] -->|"× (max-min+1)"| J["scaled"]\n        J -->|"Math.floor()"| K["integer"]\n        K -->|"+ min"| L["randomInt(min,max)"]\n    end',
              caption: 'Math rounding methods and the random integer generation pipeline.',
            } },
        ],
        quiz: [
          {
            question: 'What does Math.floor(-3.2) return?',
            options: ['-3', '-4', '-2', 'NaN'],
            correctIndex: 1,
            explanation: 'Math.floor() rounds toward negative infinity. For -3.2, the next integer toward negative infinity is -4, not -3. This is a common mistake — Math.trunc(-3.2) would return -3.',
          },
          {
            question: 'What is the range of values returned by Math.random()?',
            options: ['[0, 1] (inclusive on both ends)', '(0, 1) (exclusive on both ends)', '[0, 1) (includes 0, excludes 1)', '(0, 1] (excludes 0, includes 1)'],
            correctIndex: 2,
            explanation: 'Math.random() returns a floating-point number from 0 (inclusive) up to but not including 1. This is why the randomInt formula uses Math.floor() rather than Math.round().',
          },
          {
            question: 'How do you find the largest value in an array [5, 12, 3, 9] using Math?',
            options: ['Math.max([5, 12, 3, 9])', 'Math.max(...[5, 12, 3, 9])', 'Math.largest(5, 12, 3, 9)', '[5, 12, 3, 9].max()'],
            correctIndex: 1,
            explanation: 'Math.max() expects individual arguments, not an array. You must spread the array with the spread operator (...) to pass each element as a separate argument.',
          },
          {
            question: 'What does Math.round(2.5) return?',
            options: ['2', '3', '2.5', 'It alternates between 2 and 3'],
            correctIndex: 1,
            explanation: 'Math.round() rounds to the nearest integer, and for the .5 case in JavaScript it always rounds up (toward positive infinity). So Math.round(2.5) returns 3.',
          },
        ],
        challenge: {
          prompt: 'Write a function called clampedRandom that takes three parameters: min (number), max (number), and count (number). It should return an array of `count` random integers, each between min and max (inclusive). Also write a function called stats that takes an array of numbers and returns an object with min, max, and average properties.',
          starterCode: `function clampedRandom(min, max, count) {
  // TODO: Generate an array of 'count' random integers between min and max (inclusive)
  // Hint: Use Math.floor() and Math.random()
}

function stats(numbers) {
  // TODO: Return an object with min, max, and average of the array
  // Hint: Use Math.min(), Math.max(), and array reduce
}

// Test
const randoms = clampedRandom(1, 6, 10);
console.log('Random values:', randoms);
console.log('Stats:', stats(randoms));`,
          solutionCode: `function clampedRandom(min, max, count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return result;
}

function stats(numbers) {
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
    average: numbers.reduce((sum, n) => sum + n, 0) / numbers.length,
  };
}

// Test
const randoms = clampedRandom(1, 6, 10);
console.log('Random values:', randoms);
console.log('Stats:', stats(randoms));`,
          hints: [
            'For clampedRandom, use the formula Math.floor(Math.random() * (max - min + 1)) + min inside a loop.',
            'For stats, spread the array into Math.min() and Math.max(), and use reduce() to compute the sum for the average.',
            'Remember that Math.min() and Math.max() take individual arguments, not arrays, so you need the spread operator.',
          ],
        },
      },
      {
        id: 'date-object',
        title: 'Date Object',
        difficulty: 'intermediate',
        tags: ['date', 'time', 'timestamp', 'format', 'datetime'],
        cheatSheetSummary: 'new Date() for current time. Date.now() for timestamp. Use libraries for formatting.',
        sections: [
          { heading: 'Creating and Using Dates', content: 'The Date object represents a single moment in time as milliseconds since January 1, 1970 UTC (Unix epoch). You create dates with new Date(), passing various formats. Date.now() returns the current timestamp without creating an object. The built-in formatting is limited; for production apps, use Intl.DateTimeFormat or libraries like date-fns.',
            analogy: 'Think of it like a stopwatch that started ticking on January 1, 1970 and never stopped — every Date is just how many milliseconds have passed since then.',
            code: `// Current date/time
const now = new Date();
console.log(now.toISOString());

// From specific values (month is 0-indexed!)
const birthday = new Date(2000, 0, 15); // Jan 15, 2000
console.log(birthday.toDateString());

// From string
const parsed = new Date('2024-06-15T10:30:00Z');
console.log(parsed.toLocaleDateString());

// Timestamp (milliseconds since epoch)
console.log(Date.now());

// Extracting parts
const d = new Date('2024-06-15T14:30:45');
console.log('Year:', d.getFullYear());
console.log('Month:', d.getMonth()); // 0-indexed! (5 = June)
console.log('Day:', d.getDate());
console.log('Hours:', d.getHours());

// Date arithmetic
const future = new Date();
future.setDate(future.getDate() + 7); // Add 7 days
console.log('In a week:', future.toDateString());

// Time difference
const start = Date.now();
for (let i = 0; i < 1000000; i++) {}
console.log(\`Elapsed: \${Date.now() - start}ms\`);`,
            codeHighlightLines: [6, 19],
            output: `2024-06-15T12:00:00.000Z
Sat Jan 15 2000
6/15/2024
1718451600000
Year: 2024
Month: 5
Day: 15
Hours: 14
In a week: Sat Jun 22 2024
Elapsed: 3ms`,
            tip: 'Date months are 0-indexed (0=January, 11=December). This is one of the most common Date bugs. Consider using Temporal API (upcoming) or date-fns library.' },
        ],
        quiz: [
          {
            question: 'What month does new Date(2024, 3, 1) represent?',
            options: ['March', 'April', 'January', 'December'],
            correctIndex: 1,
            explanation: 'Date months are 0-indexed in JavaScript. So month 0 is January, month 3 is April. This is one of the most common Date-related bugs.',
          },
          {
            question: 'What does Date.now() return?',
            options: ['A Date object for the current time', 'A formatted date string', 'Milliseconds since January 1, 1970 UTC', 'Seconds since January 1, 1970 UTC'],
            correctIndex: 2,
            explanation: 'Date.now() returns the number of milliseconds elapsed since the Unix epoch (January 1, 1970 00:00:00 UTC) as a plain number, without creating a Date object.',
          },
          {
            question: 'How do you add 30 days to a Date object stored in variable d?',
            options: ['d + 30', 'd.addDays(30)', 'd.setDate(d.getDate() + 30)', 'd.setTime(d.getTime() + 30)'],
            correctIndex: 2,
            explanation: 'd.setDate(d.getDate() + 30) gets the current day-of-month, adds 30, and sets it back. JavaScript automatically handles month/year overflow. Note: setTime() + 30 would only add 30 milliseconds.',
          },
        ],
        challenge: {
          prompt: 'Write a function called daysBetween that takes two date strings (in "YYYY-MM-DD" format) and returns the number of days between them (always positive). Then write a function called formatRelative that takes a Date and returns a human-readable string like "3 days ago", "in 5 hours", or "just now" (within 60 seconds).',
          starterCode: `function daysBetween(dateStr1, dateStr2) {
  // TODO: Parse both date strings and return the absolute number of days between them
  // Hint: Subtract Date objects to get milliseconds difference
}

function formatRelative(date) {
  // TODO: Return a human-readable relative time string
  // "X days ago", "in X days", "X hours ago", "in X hours", "just now"
  // Hint: Compare with Date.now()
}

// Test
console.log(daysBetween('2024-01-01', '2024-03-01')); // 60
console.log(daysBetween('2024-03-01', '2024-01-01')); // 60 (always positive)

const yesterday = new Date(Date.now() - 86400000);
console.log(formatRelative(yesterday)); // "1 days ago"`,
          solutionCode: `function daysBetween(dateStr1, dateStr2) {
  const d1 = new Date(dateStr1);
  const d2 = new Date(dateStr2);
  const diffMs = Math.abs(d2 - d1);
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

function formatRelative(date) {
  const now = Date.now();
  const diffMs = date.getTime() - now;
  const absDiffMs = Math.abs(diffMs);

  const seconds = Math.floor(absDiffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'just now';

  const suffix = diffMs < 0 ? 'ago' : '';
  const prefix = diffMs > 0 ? 'in ' : '';

  if (days > 0) return prefix + days + ' days' + (suffix ? ' ' + suffix : '');
  if (hours > 0) return prefix + hours + ' hours' + (suffix ? ' ' + suffix : '');
  return prefix + minutes + ' minutes' + (suffix ? ' ' + suffix : '');
}

// Test
console.log(daysBetween('2024-01-01', '2024-03-01')); // 60
console.log(daysBetween('2024-03-01', '2024-01-01')); // 60 (always positive)

const yesterday = new Date(Date.now() - 86400000);
console.log(formatRelative(yesterday)); // "1 days ago"`,
          hints: [
            'Subtracting two Date objects gives you the difference in milliseconds. Divide by (1000 * 60 * 60 * 24) to convert to days.',
            'Use Math.abs() to ensure daysBetween always returns a positive number regardless of argument order.',
            'For formatRelative, compare the date timestamp with Date.now() and convert the difference into appropriate units.',
          ],
        },
      },
      {
        id: 'json-parse-stringify',
        title: 'JSON.parse() & JSON.stringify()',
        difficulty: 'beginner',
        tags: ['json', 'parse', 'stringify', 'serialize', 'deserialize'],
        cheatSheetSummary: 'stringify() converts to JSON string. parse() converts back to object.',
        sections: [
          { heading: 'Serialization and Parsing', content: 'JSON (JavaScript Object Notation) is the standard data interchange format. JSON.stringify() converts a JavaScript value to a JSON string. JSON.parse() converts a JSON string back to a JavaScript value. Note that stringify ignores undefined, functions, and symbols. The replacer and reviver parameters allow custom serialization logic.',
            analogy: 'Think of it like packing a suitcase (stringify) and unpacking it (parse) — some things you own cannot travel (functions, undefined), so they get left behind when you pack.',
            code: `const data = {
  name: 'Alice',
  age: 30,
  scores: [95, 87, 92],
  active: true,
};

// Serialize
const json = JSON.stringify(data);
console.log(json);

// Pretty-print
console.log(JSON.stringify(data, null, 2));

// Parse back
const parsed = JSON.parse(json);
console.log(parsed.name, parsed.scores);

// What stringify ignores
const tricky = {
  name: 'Bob',
  greet: function() {},  // ignored
  value: undefined,       // ignored
  id: Symbol('id'),       // ignored
};
console.log(JSON.stringify(tricky)); // only name

// Custom replacer
const filtered = JSON.stringify(data, (key, value) => {
  if (key === 'age') return undefined; // exclude age
  return value;
});
console.log(filtered);

// Deep clone (quick but limited)
const clone = JSON.parse(JSON.stringify(data));
clone.scores.push(100);
console.log('Original:', data.scores.length);
console.log('Clone:', clone.scores.length);`,
            codeHighlightLines: [9, 16, 26],
            output: `{"name":"Alice","age":30,"scores":[95,87,92],"active":true}
{
  "name": "Alice",
  "age": 30,
  "scores": [95, 87, 92],
  "active": true
}
Alice [95, 87, 92]
{"name":"Bob"}
{"name":"Alice","scores":[95,87,92],"active":true}
Original: 3
Clone: 4`,
            tip: 'JSON.stringify() drops undefined, functions, and symbols. For deep cloning that handles Dates, Maps, and more, use structuredClone().' },
        ],
        quiz: [
          {
            question: 'What does JSON.stringify({ a: undefined, b: function(){}, c: 42 }) return?',
            options: ['{"a":null,"b":null,"c":42}', '{"a":undefined,"c":42}', '{"c":42}', 'It throws an error'],
            correctIndex: 2,
            explanation: 'JSON.stringify() silently omits properties whose values are undefined, functions, or symbols. Only "c" with its number value survives serialization.',
          },
          {
            question: 'What is the purpose of the third argument in JSON.stringify(data, null, 2)?',
            options: ['It limits the recursion depth to 2 levels', 'It indents the output with 2 spaces for readability', 'It only includes 2 properties', 'It rounds numbers to 2 decimal places'],
            correctIndex: 1,
            explanation: 'The third argument to JSON.stringify() controls indentation for pretty-printing. A number specifies how many spaces to use; a string (like "\\t") uses that string for each indent level.',
          },
          {
            question: 'What happens when you call JSON.parse("undefined")?',
            options: ['Returns undefined', 'Returns null', 'Returns the string "undefined"', 'Throws a SyntaxError'],
            correctIndex: 3,
            explanation: 'JSON.parse() throws a SyntaxError because "undefined" is not valid JSON. Valid JSON primitives are strings, numbers, booleans, null, objects, and arrays. Always wrap JSON.parse() in a try/catch.',
          },
          {
            question: 'What is a limitation of using JSON.parse(JSON.stringify(obj)) for deep cloning?',
            options: ['It cannot clone arrays', 'It loses Date objects, functions, Map, Set, and undefined values', 'It only works with primitive values', 'It mutates the original object'],
            correctIndex: 1,
            explanation: 'The JSON clone trick converts Dates to strings, drops functions/undefined/symbols entirely, and cannot handle Map, Set, RegExp, or circular references. Use structuredClone() instead.',
          },
        ],
        challenge: {
          prompt: 'Write a function called safeJsonParse that takes a JSON string and a fallback value, returning the parsed result or the fallback if parsing fails. Then write a function called serializeWithDates that stringifies an object but converts Date objects to a special format { __type: "Date", value: isoString }, and a corresponding deserializeWithDates that restores them.',
          starterCode: `function safeJsonParse(jsonString, fallback) {
  // TODO: Parse the JSON string and return the result
  // If parsing fails, return the fallback value instead
}

function serializeWithDates(obj) {
  // TODO: JSON.stringify with a replacer that converts Date instances
  // to { __type: "Date", value: date.toISOString() }
}

function deserializeWithDates(jsonString) {
  // TODO: JSON.parse with a reviver that converts
  // { __type: "Date", value: "..." } back to Date objects
}

// Test
console.log(safeJsonParse('{"a":1}', {}));   // { a: 1 }
console.log(safeJsonParse('invalid', {}));     // {}

const data = { name: 'Event', date: new Date('2024-06-15') };
const json = serializeWithDates(data);
console.log(json);
const restored = deserializeWithDates(json);
console.log(restored.date instanceof Date); // true`,
          solutionCode: `function safeJsonParse(jsonString, fallback) {
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
}

function serializeWithDates(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (value instanceof Date) {
      return { __type: 'Date', value: value.toISOString() };
    }
    return value;
  });
}

function deserializeWithDates(jsonString) {
  return JSON.parse(jsonString, (key, value) => {
    if (value && value.__type === 'Date') {
      return new Date(value.value);
    }
    return value;
  });
}

// Test
console.log(safeJsonParse('{"a":1}', {}));   // { a: 1 }
console.log(safeJsonParse('invalid', {}));     // {}

const data = { name: 'Event', date: new Date('2024-06-15') };
const json = serializeWithDates(data);
console.log(json);
const restored = deserializeWithDates(json);
console.log(restored.date instanceof Date); // true`,
          hints: [
            'Wrap JSON.parse() in a try/catch block for safeJsonParse — return the fallback in the catch.',
            'The second argument to JSON.stringify() is a replacer function that receives each key/value pair and can transform the value.',
            'The second argument to JSON.parse() is a reviver function that can transform values during parsing — check for the __type marker.',
          ],
        },
      },
      {
        id: 'map-object',
        title: 'Map',
        difficulty: 'intermediate',
        tags: ['map', 'dictionary', 'hash', 'key-value', 'collection'],
        cheatSheetSummary: 'Key-value pairs with any key type. Ordered. O(1) get/set.',
        sections: [
          { heading: 'Map Basics', content: 'Map is a collection of key-value pairs where keys can be any type (not just strings). It maintains insertion order, has a .size property, and provides O(1) average-time get/set/has operations. Map is preferred over plain objects when keys are dynamic, non-string, or when you need to iterate in insertion order.',
            analogy: 'Think of it like a coat check at a venue — you hand over any item (the key, which can be anything), get a ticket, and use that exact item to retrieve your value later.',
            code: `// Creating a Map
const map = new Map();
map.set('name', 'Alice');
map.set(42, 'number key');
map.set(true, 'boolean key');
const objKey = { id: 1 };
map.set(objKey, 'object key');

console.log(map.get('name'));    // 'Alice'
console.log(map.has(42));        // true
console.log(map.size);           // 4

// Initialize from array of pairs
const scores = new Map([
  ['alice', 95],
  ['bob', 87],
  ['charlie', 92],
]);

// Iterate (preserves insertion order)
for (const [key, value] of scores) {
  console.log(\`\${key}: \${value}\`);
}

// Convert to/from Object
const obj = Object.fromEntries(scores);
console.log(obj);

const backToMap = new Map(Object.entries(obj));
console.log(backToMap.size);

// Delete and clear
map.delete(42);
console.log('After delete:', map.size);`,
            output: `Alice
true
4
alice: 95
bob: 87
charlie: 92
{ alice: 95, bob: 87, charlie: 92 }
3
After delete: 3`,
            tip: 'Map is better than plain objects for frequent additions/deletions, non-string keys, and when insertion order matters. Use objects for static configuration data.',
            diagram: {
              kind: 'custom',
              type: 'hash-map',
              data: {
                title: 'Map Key-Value Storage',
                entries: [
                  { key: '"name"', value: '"Alice"', keyType: 'string' },
                  { key: '42', value: '"number key"', keyType: 'number' },
                  { key: 'true', value: '"boolean key"', keyType: 'boolean' },
                  { key: '{ id: 1 }', value: '"object key"', keyType: 'object' },
                ],
                operations: ['set O(1)', 'get O(1)', 'has O(1)', 'delete O(1)'],
              },
              caption: 'Map stores key-value pairs with any key type and O(1) average-time operations.',
            } },
        ],
        quiz: [
          {
            question: 'What is a key advantage of Map over a plain object for key-value storage?',
            options: ['Map is faster for all operations', 'Map keys can be any type, not just strings and symbols', 'Map uses less memory than objects', 'Map values can be any type (objects cannot)'],
            correctIndex: 1,
            explanation: 'The primary advantage of Map is that keys can be any value type: objects, numbers, booleans, etc. Plain object keys are always coerced to strings (or symbols). Both Map values and object values can be any type.',
          },
          {
            question: 'How do you get the number of entries in a Map?',
            options: ['map.length', 'map.count()', 'map.size', 'Object.keys(map).length'],
            correctIndex: 2,
            explanation: 'Map has a .size property that returns the number of key-value pairs. Unlike arrays, Map does not have .length. Object.keys() does not work on Map instances.',
          },
          {
            question: 'What happens when you use an object as a Map key and then create an identical-looking object to retrieve the value?',
            options: ['It retrieves the value because the objects look the same', 'It returns undefined because Map uses reference equality for object keys', 'It throws a TypeError', 'It returns null'],
            correctIndex: 1,
            explanation: 'Map uses reference equality (===) for object keys. Two objects that look identical but are different references are treated as different keys. You must use the exact same object reference to retrieve the value.',
          },
          {
            question: 'How do you convert a Map to a plain object?',
            options: ['JSON.parse(map)', '{...map}', 'Object.fromEntries(map)', 'map.toObject()'],
            correctIndex: 2,
            explanation: 'Object.fromEntries() converts an iterable of key-value pairs (like a Map) into a plain object. Note that non-string keys will be coerced to strings in the resulting object.',
          },
        ],
        challenge: {
          prompt: 'Write a function called wordFrequency that takes a string of text and returns a Map where keys are lowercase words and values are their frequency counts, sorted by frequency (most frequent first). Then write a function called topN that takes the frequency Map and a number n, returning the top n entries as an array of [word, count] pairs.',
          starterCode: `function wordFrequency(text) {
  // TODO: Split text into words, count each word's frequency
  // Return a Map sorted by frequency (descending)
  // Hint: Convert to lowercase, split by whitespace, use Map
}

function topN(freqMap, n) {
  // TODO: Return the top n [word, count] entries from the Map
}

// Test
const text = 'the cat sat on the mat the cat liked the mat';
const freq = wordFrequency(text);
console.log([...freq]);
console.log('Top 2:', topN(freq, 2));`,
          solutionCode: `function wordFrequency(text) {
  const words = text.toLowerCase().split(/\\s+/).filter(w => w.length > 0);
  const freq = new Map();
  for (const word of words) {
    freq.set(word, (freq.get(word) || 0) + 1);
  }
  // Sort by frequency descending
  const sorted = new Map(
    [...freq.entries()].sort((a, b) => b[1] - a[1])
  );
  return sorted;
}

function topN(freqMap, n) {
  return [...freqMap.entries()].slice(0, n);
}

// Test
const text = 'the cat sat on the mat the cat liked the mat';
const freq = wordFrequency(text);
console.log([...freq]);
console.log('Top 2:', topN(freq, 2));`,
          hints: [
            'Split the text with split(/\\s+/) and convert to lowercase. Use Map.get() with a default of 0 to count occurrences.',
            'To sort a Map, convert its entries to an array, sort, then construct a new Map from the sorted array.',
            'For topN, convert the Map entries to an array with [...map.entries()] and use .slice(0, n).',
          ],
        },
      },
      {
        id: 'set-object',
        title: 'Set',
        difficulty: 'intermediate',
        tags: ['set', 'unique', 'deduplicate', 'collection', 'membership'],
        cheatSheetSummary: 'Collection of unique values. O(1) add/has/delete.',
        sections: [
          { heading: 'Set Basics', content: 'Set stores unique values of any type with O(1) add, delete, and has operations. Duplicates are automatically removed. Sets are iterable and maintain insertion order. They are perfect for deduplication, membership testing, and set operations like union and intersection.',
            analogy: 'Think of it like a guest list at an exclusive party — once your name is on the list, adding it again does nothing. Checking if someone is on the list is instant.',
            code: `// Create a Set
const set = new Set([1, 2, 3, 2, 1]);
console.log(set.size); // 3 (duplicates removed)

set.add(4);
set.add(2); // already exists, ignored
console.log(set.has(3)); // true
set.delete(1);
console.log([...set]); // [2, 3, 4]

// Deduplicate an array
const arr = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(arr)];
console.log('Unique:', unique);

// Set operations
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

// Union
const union = new Set([...a, ...b]);
console.log('Union:', [...union]);

// Intersection
const intersection = new Set([...a].filter(x => b.has(x)));
console.log('Intersection:', [...intersection]);

// Difference
const difference = new Set([...a].filter(x => !b.has(x)));
console.log('Difference:', [...difference]);`,
            output: `3
true
[2, 3, 4]
Unique: [1, 2, 3, 4]
Union: [1, 2, 3, 4, 5, 6]
Intersection: [3, 4]
Difference: [1, 2]`,
            tip: '[...new Set(array)] is the most concise way to deduplicate an array. For large arrays, this is also efficient at O(n).',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TB\n    subgraph "Set A {1,2,3,4}"\n        A1["1"] & A2["2"] & A3["3"] & A4["4"]\n    end\n    subgraph "Set B {3,4,5,6}"\n        B3["3"] & B4["4"] & B5["5"] & B6["6"]\n    end\n    subgraph Results\n        U["Union: {1,2,3,4,5,6}"]\n        I["Intersection: {3,4}"]\n        D["Difference A-B: {1,2}"]\n    end\n    A1 & A2 & A3 & A4 & B5 & B6 --> U\n    A3 & A4 --> I\n    A1 & A2 --> D',
              caption: 'Set operations: union combines both sets, intersection finds common elements, difference finds elements only in A.',
            } },
        ],
        quiz: [
          {
            question: 'What does new Set([1, 2, 2, 3, 1]).size return?',
            options: ['5', '3', '2', '1'],
            correctIndex: 1,
            explanation: 'Set automatically removes duplicates. The array [1, 2, 2, 3, 1] has three unique values (1, 2, 3), so the Set has size 3.',
          },
          {
            question: 'How do you compute the intersection of two Sets a and b?',
            options: ['a.intersect(b)', 'new Set(a & b)', 'new Set([...a].filter(x => b.has(x)))', 'a.filter(x => b.has(x))'],
            correctIndex: 2,
            explanation: 'JavaScript Sets do not have built-in intersection methods (prior to 2024). You spread one Set into an array, filter it by membership in the other Set, and construct a new Set from the result.',
          },
          {
            question: 'Does Set use strict equality (===) or SameValueZero for comparison?',
            options: ['Strict equality (===), so NaN !== NaN', 'SameValueZero, so NaN is considered equal to NaN', 'Loose equality (==), so 1 and "1" are the same', 'Reference equality only'],
            correctIndex: 1,
            explanation: 'Set uses the SameValueZero algorithm, which is like === except that NaN is considered equal to NaN. This means a Set can only contain one NaN value, unlike with === where NaN !== NaN.',
          },
        ],
        challenge: {
          prompt: 'Write a function called symmetricDifference that takes two arrays and returns a new array containing elements that are in either array but NOT in both (the symmetric difference). Use Set for efficient lookup. Then write a function called isSubset that checks if all elements of array a are contained in array b.',
          starterCode: `function symmetricDifference(arr1, arr2) {
  // TODO: Return elements in either arr1 or arr2, but not both
  // Hint: Use Set for O(1) lookups
}

function isSubset(a, b) {
  // TODO: Return true if every element of a is in b
  // Hint: Use Set for efficient membership testing
}

// Test
console.log(symmetricDifference([1, 2, 3, 4], [3, 4, 5, 6])); // [1, 2, 5, 6]
console.log(isSubset([1, 2], [1, 2, 3, 4])); // true
console.log(isSubset([1, 5], [1, 2, 3, 4])); // false`,
          solutionCode: `function symmetricDifference(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const result = [];
  for (const item of set1) {
    if (!set2.has(item)) result.push(item);
  }
  for (const item of set2) {
    if (!set1.has(item)) result.push(item);
  }
  return result;
}

function isSubset(a, b) {
  const setB = new Set(b);
  return a.every(item => setB.has(item));
}

// Test
console.log(symmetricDifference([1, 2, 3, 4], [3, 4, 5, 6])); // [1, 2, 5, 6]
console.log(isSubset([1, 2], [1, 2, 3, 4])); // true
console.log(isSubset([1, 5], [1, 2, 3, 4])); // false`,
          hints: [
            'Convert both arrays to Sets, then find elements in set1 not in set2, and elements in set2 not in set1.',
            'For isSubset, convert the larger array to a Set and use .every() on the smaller array to check membership.',
            'Remember that Set.has() is O(1), making these operations much more efficient than nested loops.',
          ],
        },
      },
      {
        id: 'weakmap-weakset',
        title: 'WeakMap & WeakSet',
        difficulty: 'advanced',
        tags: ['weakmap', 'weakset', 'garbage-collection', 'memory', 'cache'],
        cheatSheetSummary: 'Weak references to object keys. Entries are garbage-collectible.',
        sections: [
          { heading: 'WeakMap and WeakSet', content: 'WeakMap and WeakSet hold "weak" references to their keys (WeakMap) or values (WeakSet). This means entries are automatically garbage collected when no other reference to the key/value exists. They are used for caching, storing private data, and tracking objects without preventing garbage collection. WeakMap keys must be objects; WeakSet values must be objects.',
            analogy: 'Think of it like sticky notes attached to physical objects — when the object is thrown away, the sticky note disappears with it. You never have to clean up the notes yourself.',
            code: `// WeakMap — keys must be objects
const cache = new WeakMap();

function expensiveCompute(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const result = obj.value * 2; // expensive work
  cache.set(obj, result);
  return result;
}

let data = { value: 42 };
console.log(expensiveCompute(data)); // computes
console.log(expensiveCompute(data)); // cached
// When data = null, cache entry is garbage collected

// WeakSet — track processed objects
const processed = new WeakSet();

function processOnce(obj) {
  if (processed.has(obj)) {
    console.log('Already processed');
    return;
  }
  processed.add(obj);
  console.log('Processing:', obj.name);
}

const user = { name: 'Alice' };
processOnce(user); // 'Processing: Alice'
processOnce(user); // 'Already processed'

// WeakMap for private data
const privateData = new WeakMap();
class Person {
  constructor(name, secret) {
    privateData.set(this, { secret });
    this.name = name;
  }
  getSecret() {
    return privateData.get(this).secret;
  }
}`,
            codeHighlightLines: [5, 6, 7, 20, 21],
            output: `84
84
Processing: Alice
Already processed`,
            tip: 'WeakMap/WeakSet are not iterable and have no size property. Use them for metadata and caching where you want automatic cleanup.' },
        ],
        quiz: [
          {
            question: 'What types of values can be used as keys in a WeakMap?',
            options: ['Any value including primitives', 'Only strings and symbols', 'Only objects (and functions)', 'Only objects created with the new keyword'],
            correctIndex: 2,
            explanation: 'WeakMap keys must be objects (including functions, arrays, and other reference types). Primitives like strings or numbers cannot be used because they are not garbage-collectible references.',
          },
          {
            question: 'Why does WeakMap NOT have a .size property or support iteration?',
            options: ['It is a design oversight that will be fixed', 'Because entries can be garbage collected at any time, the size is unpredictable', 'Because WeakMap is always empty', 'For performance reasons only'],
            correctIndex: 1,
            explanation: 'Since the garbage collector can remove WeakMap entries at any time when keys lose their external references, the number of entries is non-deterministic. Iteration and size would expose garbage collection timing, breaking JavaScript engine optimizations.',
          },
          {
            question: 'What happens to a WeakMap entry when the key object is no longer referenced anywhere else?',
            options: ['The entry remains in the WeakMap indefinitely', 'The entry becomes eligible for garbage collection', 'The key is set to null but the value persists', 'A "delete" event is fired'],
            correctIndex: 1,
            explanation: 'WeakMap holds weak references to keys. When no other reference to the key object exists, both the key and value become eligible for garbage collection. This is the core purpose of WeakMap.',
          },
        ],
        challenge: {
          prompt: 'Write a memoize function that uses WeakMap to cache results of a computation on objects. The function should take a computation function as an argument and return a new function that caches results by the input object. If the same object is passed again, return the cached result.',
          starterCode: `function memoize(computeFn) {
  // TODO: Return a function that caches results using WeakMap
  // The cache key should be the object argument
  // If computeFn was already called with this exact object, return cached result
}

// Test
const getFullName = memoize((user) => {
  console.log('Computing...');
  return user.first + ' ' + user.last;
});

const user = { first: 'Alice', last: 'Smith' };
console.log(getFullName(user)); // "Computing..." then "Alice Smith"
console.log(getFullName(user)); // "Alice Smith" (no "Computing..." — cached!)`,
          solutionCode: `function memoize(computeFn) {
  const cache = new WeakMap();
  return function(obj) {
    if (cache.has(obj)) {
      return cache.get(obj);
    }
    const result = computeFn(obj);
    cache.set(obj, result);
    return result;
  };
}

// Test
const getFullName = memoize((user) => {
  console.log('Computing...');
  return user.first + ' ' + user.last;
});

const user = { first: 'Alice', last: 'Smith' };
console.log(getFullName(user)); // "Computing..." then "Alice Smith"
console.log(getFullName(user)); // "Alice Smith" (no "Computing..." — cached!)`,
          hints: [
            'Create a WeakMap inside the memoize closure to store cached results.',
            'In the returned function, check cache.has(obj) first. If it exists, return cache.get(obj). Otherwise, compute and store.',
            'WeakMap is ideal here because the cache automatically cleans up when the object key is garbage collected, preventing memory leaks.',
          ],
        },
      },
      {
        id: 'regexp',
        title: 'RegExp',
        difficulty: 'intermediate',
        tags: ['regex', 'regexp', 'pattern', 'match', 'test', 'replace'],
        cheatSheetSummary: 'Regular expressions for pattern matching. /pattern/flags syntax.',
        sections: [
          { heading: 'Regular Expression Basics', content: 'Regular expressions (regex) are patterns for matching text. JavaScript supports regex literals (/pattern/flags) and the RegExp constructor. The test() method checks if a pattern matches. Common flags: g (global), i (case-insensitive), m (multiline), s (dotAll), u (unicode). Regex is used with string methods like match(), replace(), search(), and split().',
            code: `// Regex literals
const pattern = /hello/i; // case-insensitive
console.log(pattern.test('Hello World')); // true

// Common patterns
const email = /^[\\w.]+@[\\w.]+\\.[a-z]{2,}$/i;
console.log(email.test('user@example.com')); // true
console.log(email.test('invalid@'));          // false

const phone = /^\\d{3}-\\d{3}-\\d{4}$/;
console.log(phone.test('555-123-4567'));     // true

// Capture groups
const dateStr = '2024-06-15';
const dateRegex = /^(\\d{4})-(\\d{2})-(\\d{2})$/;
const [, year, month, day] = dateStr.match(dateRegex);
console.log({ year, month, day });

// Named groups
const namedRegex = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const { groups } = dateStr.match(namedRegex);
console.log(groups);

// Replace with regex
console.log('foo123bar456'.replace(/\\d+/g, '#'));`,
            codeHighlightLines: [15, 16, 20, 21],
            output: `true
true
false
true
{ year: '2024', month: '06', day: '15' }
{ year: '2024', month: '06', day: '15' }
foo#bar#`,
            tip: 'Named capture groups (?<name>...) make regex more readable. Access them via match.groups.name instead of positional indices.' },
        ],
        quiz: [
          {
            question: 'What does the g flag do in a regular expression like /word/g?',
            options: ['Makes the regex greedy', 'Enables global matching to find all matches, not just the first', 'Makes it case-insensitive', 'Enables grouping support'],
            correctIndex: 1,
            explanation: 'The g (global) flag tells the regex engine to find all matches in the string, not stop after the first one. Without g, methods like match() return only the first match with capture groups. With g, match() returns an array of all matched strings.',
          },
          {
            question: 'What does /^\\d{3}-\\d{4}$/ match?',
            options: ['Any string containing digits and a dash', 'Exactly 3 digits, a dash, then 4 digits (and nothing else)', '3 or more digits, a dash, then 4 or more digits', 'A string starting with 3 digits or ending with 4 digits'],
            correctIndex: 1,
            explanation: 'The ^ and $ anchors mean the pattern must match the entire string. \\d{3} matches exactly 3 digits, - matches a literal dash, and \\d{4} matches exactly 4 digits. So it matches strings like "555-1234" and nothing else.',
          },
          {
            question: 'What is the difference between .match() and .matchAll() for regex?',
            options: ['matchAll() is faster', 'match() with /g returns all matches as strings; matchAll() returns an iterator of detailed match objects', 'matchAll() is for case-insensitive matching', 'There is no difference; matchAll() is an alias'],
            correctIndex: 1,
            explanation: 'With the g flag, match() returns a simple array of matched strings, losing capture group info. matchAll() returns an iterator where each result includes the full match, capture groups, index, and named groups.',
          },
          {
            question: 'What does "hello world".replace(/\\b\\w/g, c => c.toUpperCase()) return?',
            options: ['"HELLO WORLD"', '"Hello World"', '"Hello world"', '"hELLO wORLD"'],
            correctIndex: 1,
            explanation: 'The regex /\\b\\w/g matches the first character after each word boundary. The callback converts that character to uppercase, producing title case: "Hello World".',
          },
        ],
        challenge: {
          prompt: 'Write a function called extractEmails that takes a string of text and returns an array of all email addresses found in it. Then write a function called maskEmails that takes a string and replaces each email address with a masked version (e.g., "alice@example.com" becomes "a****@example.com").',
          starterCode: `function extractEmails(text) {
  // TODO: Use a regex to find all email addresses in the text
  // Return an array of matched emails
}

function maskEmails(text) {
  // TODO: Replace each email in the text with a masked version
  // Keep first char of local part, replace rest with ****, keep the @domain
  // e.g., "alice@example.com" -> "a****@example.com"
}

// Test
const text = 'Contact alice@example.com or bob.smith@company.org for info.';
console.log(extractEmails(text));
// ['alice@example.com', 'bob.smith@company.org']

console.log(maskEmails(text));
// 'Contact a****@example.com or b****@company.org for info.'`,
          solutionCode: `function extractEmails(text) {
  const emailRegex = /[\\w.+-]+@[\\w.-]+\\.[a-z]{2,}/gi;
  return text.match(emailRegex) || [];
}

function maskEmails(text) {
  const emailRegex = /([\\w.+-])([\\w.+-]*)(@[\\w.-]+\\.[a-z]{2,})/gi;
  return text.replace(emailRegex, (match, firstChar, rest, domain) => {
    return firstChar + '****' + domain;
  });
}

// Test
const text = 'Contact alice@example.com or bob.smith@company.org for info.';
console.log(extractEmails(text));
// ['alice@example.com', 'bob.smith@company.org']

console.log(maskEmails(text));
// 'Contact a****@example.com or b****@company.org for info.'`,
          hints: [
            'A basic email regex pattern is /[\\w.+-]+@[\\w.-]+\\.[a-z]{2,}/gi. Use .match() with the g flag to find all occurrences.',
            'For masking, use capture groups to separate the first character, the rest of the local part, and the domain portion.',
            'The .replace() method can take a function as the second argument, receiving the full match and capture groups.',
          ],
        },
      },
      {
        id: 'proxy-reflect',
        title: 'Proxy & Reflect',
        difficulty: 'advanced',
        tags: ['proxy', 'reflect', 'metaprogramming', 'intercept', 'trap'],
        cheatSheetSummary: 'Proxy intercepts operations on objects. Reflect provides default behavior.',
        sections: [
          { heading: 'Proxy and Reflect', content: 'Proxy wraps an object and intercepts fundamental operations like property access, assignment, and function calls using "traps". Reflect provides the default behavior for each trap, making it easy to augment operations without replacing them. Proxies power reactive frameworks like Vue 3, validation layers, and observable patterns.',
            analogy: 'Think of it like a security guard standing in front of a building (the target object) — every visitor (operation) must pass through the guard first, who can inspect, modify, or reject the request before forwarding it inside.',
            code: `// Validation proxy
const validator = {
  set(target, prop, value) {
    if (prop === 'age') {
      if (typeof value !== 'number' || value < 0) {
        throw new TypeError('Age must be a positive number');
      }
    }
    return Reflect.set(target, prop, value);
  },
  get(target, prop) {
    return prop in target ? target[prop] : \`No such property: \${prop}\`;
  },
};

const user = new Proxy({}, validator);
user.name = 'Alice';
user.age = 30;
console.log(user.name);
console.log(user.age);
console.log(user.email); // 'No such property: email'

try {
  user.age = -5;
} catch (e) {
  console.log('Error:', e.message);
}

// Logging proxy
function withLogging(obj) {
  return new Proxy(obj, {
    get(target, prop) {
      console.log(\`GET \${String(prop)}\`);
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      console.log(\`SET \${String(prop)} = \${value}\`);
      return Reflect.set(target, prop, value);
    },
  });
}
const logged = withLogging({ x: 1 });
logged.x;
logged.y = 2;`,
            output: `Alice
30
No such property: email
Error: Age must be a positive number
GET x
SET y = 2`,
            tip: 'Proxies have a performance cost. Avoid them in tight loops. For simple validation, use setters or validation functions instead.',
            diagram: {
              kind: 'mermaid',
              code: 'sequenceDiagram\n    participant Caller\n    participant Proxy as Proxy (Handler)\n    participant Target as Target Object\n    Caller->>Proxy: user.age = -5\n    Proxy->>Proxy: set trap validates\n    Proxy--xCaller: TypeError: Age must be positive\n    Caller->>Proxy: user.name = "Alice"\n    Proxy->>Proxy: set trap validates\n    Proxy->>Target: Reflect.set(target, "name", "Alice")\n    Target-->>Proxy: true\n    Proxy-->>Caller: true\n    Caller->>Proxy: user.email\n    Proxy->>Proxy: get trap checks\n    Proxy-->>Caller: "No such property: email"',
              caption: 'Proxy intercepts operations and either forwards them to the target via Reflect or rejects them based on validation logic.',
            } },
        ],
        quiz: [
          {
            question: 'What is the role of Reflect in Proxy handlers?',
            options: ['Reflect creates the Proxy object', 'Reflect provides the default behavior for each trap, allowing you to forward the operation to the target', 'Reflect is required for Proxy to work', 'Reflect intercepts errors thrown in traps'],
            correctIndex: 1,
            explanation: 'Reflect methods mirror each Proxy trap and perform the default operation. For example, Reflect.set() does what a normal property assignment does. This lets you augment behavior (like logging) while still forwarding to the original operation.',
          },
          {
            question: 'What must the set trap return to indicate success?',
            options: ['The new value', 'The target object', 'true (or a truthy value)', 'undefined'],
            correctIndex: 2,
            explanation: 'The set trap must return true to indicate the assignment was successful. Returning false or a falsy value will cause a TypeError in strict mode. Reflect.set() conveniently returns a boolean.',
          },
          {
            question: 'Which of the following CANNOT be intercepted by a Proxy?',
            options: ['Property access with obj.prop', 'The typeof operator', 'The delete operator', 'The in operator'],
            correctIndex: 1,
            explanation: 'The typeof operator cannot be trapped by a Proxy. It always returns "object" for Proxy-wrapped objects. However, property access (get), deletion (deleteProperty), and the in operator (has) all have corresponding Proxy traps.',
          },
        ],
        challenge: {
          prompt: 'Create a function called createSchema that takes a schema object describing valid property types (e.g., { name: "string", age: "number", active: "boolean" }) and returns a Proxy that validates assignments against this schema. If a value does not match the expected type, throw a TypeError. Also handle reading non-existent properties by returning a default message.',
          starterCode: `function createSchema(schema) {
  // TODO: Return a Proxy that validates set operations against the schema
  // schema example: { name: 'string', age: 'number', active: 'boolean' }
  // Throw TypeError if value type does not match schema
  // Return "Property [prop] not defined in schema" for unknown get operations
}

// Test
const user = createSchema({ name: 'string', age: 'number', active: 'boolean' });
user.name = 'Alice';   // OK
user.age = 30;          // OK
user.active = true;     // OK
console.log(user.name, user.age, user.active);

try {
  user.age = 'thirty'; // Should throw TypeError
} catch (e) {
  console.log(e.message);
}
console.log(user.email); // "Property email not defined in schema"`,
          solutionCode: `function createSchema(schema) {
  return new Proxy({}, {
    set(target, prop, value) {
      if (prop in schema) {
        const expectedType = schema[prop];
        if (typeof value !== expectedType) {
          throw new TypeError(
            \`Property "\${prop}" must be of type \${expectedType}, got \${typeof value}\`
          );
        }
      }
      return Reflect.set(target, prop, value);
    },
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      if (!(prop in schema) && typeof prop === 'string') {
        return \`Property \${prop} not defined in schema\`;
      }
      return undefined;
    },
  });
}

// Test
const user = createSchema({ name: 'string', age: 'number', active: 'boolean' });
user.name = 'Alice';   // OK
user.age = 30;          // OK
user.active = true;     // OK
console.log(user.name, user.age, user.active);

try {
  user.age = 'thirty'; // Should throw TypeError
} catch (e) {
  console.log(e.message);
}
console.log(user.email); // "Property email not defined in schema"`,
          hints: [
            'In the set trap, check if the property exists in the schema object. If so, verify typeof value matches the expected type string.',
            'Use Reflect.set() to perform the actual assignment after validation passes.',
            'In the get trap, check if the property exists in the target first. If not and it is not in the schema, return the default message.',
          ],
        },
      },
      {
        id: 'intl',
        title: 'Intl (Internationalization)',
        difficulty: 'intermediate',
        tags: ['intl', 'locale', 'format', 'number', 'date', 'currency'],
        cheatSheetSummary: 'Locale-aware formatting for numbers, dates, currencies, and more.',
        sections: [
          { heading: 'Intl API', content: 'The Intl object provides language-sensitive string comparison, number formatting, and date/time formatting. Intl.NumberFormat handles currency, percentages, and unit formatting. Intl.DateTimeFormat provides locale-aware date formatting. Intl.RelativeTimeFormat generates "3 days ago" style strings. These APIs work in all modern browsers and Node.js.',
            analogy: 'Think of it like a universal translator for numbers and dates — you give it a value and a locale, and it knows exactly how that culture writes their currencies, decimals, and date formats.',
            code: `// Number formatting
const numFmt = new Intl.NumberFormat('en-US');
console.log(numFmt.format(1234567.89));

// Currency
const usd = new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD'
});
console.log(usd.format(42.5));

const eur = new Intl.NumberFormat('de-DE', {
  style: 'currency', currency: 'EUR'
});
console.log(eur.format(42.5));

// Percentage
const pct = new Intl.NumberFormat('en-US', { style: 'percent' });
console.log(pct.format(0.856));

// Date formatting
const date = new Date('2024-06-15');
console.log(new Intl.DateTimeFormat('en-US', {
  dateStyle: 'full'
}).format(date));

console.log(new Intl.DateTimeFormat('ja-JP', {
  dateStyle: 'long'
}).format(date));

// Relative time
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
console.log(rtf.format(-1, 'day'));
console.log(rtf.format(3, 'hour'));`,
            output: `1,234,567.89
$42.50
42,50 \u20AC
86%
Saturday, June 15, 2024
2024\u5E746\u670815\u65E5
yesterday
in 3 hours`,
            tip: 'Intl formatters are locale-aware and handle edge cases correctly. Always prefer them over manual string formatting for user-facing output.' },
        ],
        quiz: [
          {
            question: 'What does new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(1000) return?',
            options: ['1000 USD', '$1000', '$1,000.00', '1,000.00 $'],
            correctIndex: 2,
            explanation: 'Intl.NumberFormat with en-US locale and USD currency formats with the dollar sign prefix, thousands separator comma, and two decimal places: "$1,000.00".',
          },
          {
            question: 'What is the purpose of Intl.RelativeTimeFormat?',
            options: ['To calculate the difference between two dates', 'To format durations like "2 hours 30 minutes"', 'To produce locale-aware relative time strings like "3 days ago" or "in 2 hours"', 'To convert timestamps between time zones'],
            correctIndex: 2,
            explanation: 'Intl.RelativeTimeFormat generates locale-aware strings for relative time expressions. You provide a numeric value and a unit, and it returns strings like "3 days ago", "yesterday", "in 2 hours", etc.',
          },
          {
            question: 'Why is Intl.NumberFormat preferred over manual formatting like toFixed() for user-facing output?',
            options: ['It is faster', 'It handles locale-specific decimal separators, grouping, and currency symbols correctly', 'It supports more decimal places', 'It works in older browsers that toFixed() does not support'],
            correctIndex: 1,
            explanation: 'Different locales use different decimal separators (. vs ,), thousands grouping (1,000 vs 1.000), and currency symbol placement. Intl.NumberFormat handles all these variations automatically based on the locale.',
          },
        ],
        challenge: {
          prompt: 'Write a function called formatPrice that takes a number and a currency code (e.g., "USD", "EUR", "JPY") and returns a locale-appropriate formatted price string. Detect the appropriate locale from the currency. Then write a function called formatList that takes an array of strings and formats it as a grammatically correct list (e.g., ["a", "b", "c"] -> "a, b, and c").',
          starterCode: `function formatPrice(amount, currency) {
  // TODO: Format the amount as a currency string
  // Map common currencies to appropriate locales:
  // USD -> en-US, EUR -> de-DE, GBP -> en-GB, JPY -> ja-JP
}

function formatList(items) {
  // TODO: Format an array of strings as a grammatical list
  // ["apples"] -> "apples"
  // ["apples", "bananas"] -> "apples and bananas"
  // ["apples", "bananas", "cherries"] -> "apples, bananas, and cherries"
  // Hint: Use Intl.ListFormat
}

// Test
console.log(formatPrice(42.99, 'USD'));   // $42.99
console.log(formatPrice(42.99, 'EUR'));   // 42,99 \u20AC
console.log(formatPrice(1000, 'JPY'));    // \uFFE51,000

console.log(formatList(['apples', 'bananas', 'cherries']));
// "apples, bananas, and cherries"`,
          solutionCode: `function formatPrice(amount, currency) {
  const localeMap = {
    USD: 'en-US',
    EUR: 'de-DE',
    GBP: 'en-GB',
    JPY: 'ja-JP',
    INR: 'en-IN',
    CNY: 'zh-CN',
  };
  const locale = localeMap[currency] || 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

function formatList(items) {
  const formatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
  });
  return formatter.format(items);
}

// Test
console.log(formatPrice(42.99, 'USD'));   // $42.99
console.log(formatPrice(42.99, 'EUR'));   // 42,99 \u20AC
console.log(formatPrice(1000, 'JPY'));    // \uFFE51,000

console.log(formatList(['apples', 'bananas', 'cherries']));
// "apples, bananas, and cherries"`,
          hints: [
            'Create a mapping object from currency codes to locale strings (e.g., "USD" -> "en-US").',
            'Intl.ListFormat with type "conjunction" and style "long" produces grammatically correct lists with "and".',
            'Remember that Intl.NumberFormat automatically handles decimal places based on the currency (JPY has 0, USD has 2).',
          ],
        },
      },
      {
        id: 'structuredClone',
        title: 'structuredClone()',
        difficulty: 'intermediate',
        signature: 'structuredClone(value): T',
        tags: ['clone', 'deep-copy', 'structured', 'copy', 'immutable'],
        cheatSheetSummary: 'Creates a deep copy of a value. Handles nested objects, arrays, Dates, Maps, Sets.',
        sections: [
          { heading: 'Deep Cloning', content: 'structuredClone() creates a deep copy of a value using the structured clone algorithm. Unlike JSON.parse(JSON.stringify()), it correctly handles Dates, Maps, Sets, ArrayBuffers, RegExps, and circular references. However, it cannot clone functions, DOM nodes, or objects with custom prototypes. Available since 2022 in all major browsers and Node.js 17+.',
            code: `// Deep clone with nested objects
const original = {
  name: 'Alice',
  scores: [95, 87],
  metadata: {
    created: new Date('2024-01-01'),
    tags: new Set(['admin', 'active']),
  },
};

const clone = structuredClone(original);
clone.scores.push(100);
clone.metadata.tags.add('new');

console.log('Original scores:', original.scores);
console.log('Clone scores:', clone.scores);
console.log('Original tags:', [...original.metadata.tags]);
console.log('Clone tags:', [...clone.metadata.tags]);

// Handles circular references
const circular = { name: 'self' };
circular.self = circular;
const cloned = structuredClone(circular);
console.log(cloned.self.name); // 'self'
console.log(cloned.self === cloned); // true (preserved)

// Cannot clone functions
try {
  structuredClone({ fn: () => {} });
} catch (e) {
  console.log('Error:', e.message);
}`,
            output: `Original scores: [95, 87]
Clone scores: [95, 87, 100]
Original tags: ['admin', 'active']
Clone tags: ['admin', 'active', 'new']
self
true
Error: function could not be cloned`,
            tip: 'structuredClone() is the modern replacement for JSON.parse(JSON.stringify()). Use it for deep cloning; use spread ({...obj}) for shallow cloning.' },
        ],
        quiz: [
          {
            question: 'Which of the following can structuredClone() handle that JSON.parse(JSON.stringify()) cannot?',
            options: ['Nested arrays', 'Boolean values', 'Circular references and Date objects', 'String properties'],
            correctIndex: 2,
            explanation: 'structuredClone() correctly handles circular references (JSON stringify would throw), preserves Date objects (JSON converts them to strings), and also handles Maps, Sets, RegExps, and ArrayBuffers.',
          },
          {
            question: 'What happens when you try to structuredClone an object containing a function?',
            options: ['The function is cloned as-is', 'The function is silently dropped', 'It throws a DOMException/DataCloneError', 'The function is converted to a string'],
            correctIndex: 2,
            explanation: 'structuredClone() throws a DataCloneError when encountering a function because functions cannot be serialized by the structured clone algorithm. Unlike JSON.stringify(), which silently drops functions, structuredClone() fails loudly.',
          },
          {
            question: 'What is the difference between spread ({...obj}) and structuredClone(obj)?',
            options: ['Spread is deep, structuredClone is shallow', 'Spread is shallow (one level), structuredClone is deep (all levels)', 'They are identical', 'Spread handles circular references, structuredClone does not'],
            correctIndex: 1,
            explanation: 'The spread operator ({...obj}) creates a shallow copy: nested objects still share references with the original. structuredClone() creates a deep copy where all nested objects, arrays, Maps, Sets, etc. are recursively cloned.',
          },
        ],
        challenge: {
          prompt: 'Write a function called deepFreeze that takes an object and returns a deeply frozen clone of it using structuredClone and Object.freeze. The original object should not be modified. All nested objects, arrays, and properties should be frozen so no mutations are possible.',
          starterCode: `function deepFreeze(obj) {
  // TODO: 1. Deep clone the object with structuredClone
  // 2. Recursively freeze the clone and all nested objects/arrays
  // 3. Return the frozen clone
}

// Test
const data = {
  name: 'Alice',
  scores: [95, 87],
  nested: { a: { b: 2 } },
};

const frozen = deepFreeze(data);
console.log(frozen.name); // 'Alice'

// These should all fail silently (or throw in strict mode)
try { frozen.name = 'Bob'; } catch(e) { console.log('Cannot modify name'); }
try { frozen.scores.push(100); } catch(e) { console.log('Cannot push to scores'); }
try { frozen.nested.a.b = 99; } catch(e) { console.log('Cannot modify nested'); }

// Original should be unchanged and unfrozen
data.name = 'Modified';
console.log(data.name); // 'Modified' (original is still mutable)`,
          solutionCode: `function deepFreeze(obj) {
  const clone = structuredClone(obj);

  function freeze(value) {
    if (value === null || typeof value !== 'object') return value;
    Object.freeze(value);
    for (const key of Object.keys(value)) {
      if (typeof value[key] === 'object' && value[key] !== null && !Object.isFrozen(value[key])) {
        freeze(value[key]);
      }
    }
    return value;
  }

  return freeze(clone);
}

// Test
const data = {
  name: 'Alice',
  scores: [95, 87],
  nested: { a: { b: 2 } },
};

const frozen = deepFreeze(data);
console.log(frozen.name); // 'Alice'

// These should all fail silently (or throw in strict mode)
try { frozen.name = 'Bob'; } catch(e) { console.log('Cannot modify name'); }
try { frozen.scores.push(100); } catch(e) { console.log('Cannot push to scores'); }
try { frozen.nested.a.b = 99; } catch(e) { console.log('Cannot modify nested'); }

// Original should be unchanged and unfrozen
data.name = 'Modified';
console.log(data.name); // 'Modified' (original is still mutable)`,
          hints: [
            'First use structuredClone() to create a deep copy so the original is never affected.',
            'Write a recursive helper that calls Object.freeze() on the object, then iterates over all property values and recursively freezes any that are objects.',
            'Check Object.isFrozen() before recursing to avoid infinite loops with circular references.',
          ],
        },
      },
      {
        id: 'promise-methods',
        title: 'Promise Static Methods',
        difficulty: 'intermediate',
        tags: ['promise', 'all', 'allSettled', 'race', 'any', 'resolve', 'reject'],
        cheatSheetSummary: 'Promise.all(), allSettled(), race(), any() for concurrent operations.',
        sections: [
          { heading: 'Promise Combinators', content: 'Promise provides four static combinators for working with multiple promises. all() waits for all to succeed (fails fast). allSettled() waits for all to complete regardless. race() resolves with the first to settle. any() resolves with the first to fulfill (ignores rejections). Each serves a different concurrency pattern.',
            analogy: 'Think of it like ordering food from multiple restaurants at once: all() means your dinner is ruined if any single order fails; race() means you eat whichever meal arrives first; any() means you eat the first successful delivery, ignoring the ones that got canceled.',
            code: `// Promise.all — all must succeed
const all = await Promise.all([
  Promise.resolve('a'),
  Promise.resolve('b'),
  Promise.resolve('c'),
]);
console.log('all:', all);

// Promise.allSettled — never rejects
const settled = await Promise.allSettled([
  Promise.resolve('ok'),
  Promise.reject(new Error('fail')),
]);
console.log('settled:', settled.map(r =>
  r.status === 'fulfilled' ? r.value : r.reason.message
));

// Promise.race — first to settle
const race = await Promise.race([
  new Promise(r => setTimeout(() => r('slow'), 100)),
  new Promise(r => setTimeout(() => r('fast'), 10)),
]);
console.log('race:', race);

// Promise.any — first to fulfill
const any = await Promise.any([
  Promise.reject(new Error('a')),
  Promise.resolve('b'),
  Promise.resolve('c'),
]);
console.log('any:', any);

// Utility: Promise.resolve / Promise.reject
const p = Promise.resolve(42);
console.log(await p);`,
            output: `all: ['a', 'b', 'c']
settled: ['ok', 'fail']
race: fast
any: b
42`,
            tip: 'Use all() when all results are needed. Use allSettled() when partial failures are acceptable. Use race() for timeouts. Use any() for redundant sources.' },
        ],
        quiz: [
          {
            question: 'What happens if one promise in Promise.all() rejects?',
            options: ['The other promises are cancelled', 'Promise.all() waits for all to complete, then rejects', 'Promise.all() immediately rejects with that error, ignoring pending promises', 'Promise.all() returns null for the rejected promise'],
            correctIndex: 2,
            explanation: 'Promise.all() fails fast: as soon as any single promise rejects, the entire Promise.all() rejects immediately with that rejection reason. The other promises continue running (they are NOT cancelled) but their results are ignored.',
          },
          {
            question: 'What does Promise.allSettled() return for a mix of resolved and rejected promises?',
            options: ['Only the resolved values', 'Only the rejected reasons', 'An array of objects with {status, value} or {status, reason} for each promise', 'It throws an AggregateError'],
            correctIndex: 2,
            explanation: 'Promise.allSettled() never rejects. It returns an array of result objects, each with a status ("fulfilled" or "rejected") and either a value (for fulfilled) or reason (for rejected).',
          },
          {
            question: 'What is the difference between Promise.race() and Promise.any()?',
            options: ['They are identical', 'race() resolves with the first to settle (resolve OR reject); any() resolves with the first to fulfill (ignores rejections)', 'race() is faster', 'any() waits for all to complete, race() does not'],
            correctIndex: 1,
            explanation: 'Promise.race() settles with whichever promise settles first, whether it resolves or rejects. Promise.any() only resolves with the first fulfillment, skipping over rejections. Promise.any() only rejects if ALL promises reject.',
          },
          {
            question: 'How would you implement a timeout for a fetch request using Promise combinators?',
            options: ['Use Promise.all() with a timer', 'Use Promise.race() between the fetch and a setTimeout that rejects', 'Use Promise.any() with multiple fetch calls', 'Use Promise.allSettled() and check timing'],
            correctIndex: 1,
            explanation: 'Promise.race() between the actual async operation and a timer promise that rejects after the timeout period gives you a clean timeout pattern. Whichever settles first wins.',
          },
        ],
        challenge: {
          prompt: 'Write a function called fetchWithTimeout that takes a promise and a timeout in milliseconds, and returns a new promise that rejects with "Timeout" if the original promise does not settle within the timeout. Then write a function called fetchAll that takes an array of URL strings, fetches them all concurrently, and returns an object with { successful: [...results], failed: [...errors] }.',
          starterCode: `function fetchWithTimeout(promise, timeoutMs) {
  // TODO: Race the promise against a timeout
  // If the promise settles first, return its result
  // If the timeout fires first, reject with new Error('Timeout')
}

async function fetchAll(urls) {
  // TODO: Fetch all URLs concurrently
  // Return { successful: [...values], failed: [...errors] }
  // Hint: Use Promise.allSettled()
}

// Test
const slow = new Promise(r => setTimeout(() => r('done'), 5000));
fetchWithTimeout(slow, 100)
  .then(v => console.log(v))
  .catch(e => console.log('Caught:', e.message)); // "Caught: Timeout"

const fast = Promise.resolve('quick');
fetchWithTimeout(fast, 1000)
  .then(v => console.log(v)); // "quick"`,
          solutionCode: `function fetchWithTimeout(promise, timeoutMs) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeoutMs);
  });
  return Promise.race([promise, timeout]);
}

async function fetchAll(urls) {
  const promises = urls.map(url =>
    fetch(url).then(res => {
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      return res.json();
    })
  );
  const results = await Promise.allSettled(promises);
  const successful = [];
  const failed = [];
  for (const result of results) {
    if (result.status === 'fulfilled') {
      successful.push(result.value);
    } else {
      failed.push(result.reason.message);
    }
  }
  return { successful, failed };
}

// Test
const slow = new Promise(r => setTimeout(() => r('done'), 5000));
fetchWithTimeout(slow, 100)
  .then(v => console.log(v))
  .catch(e => console.log('Caught:', e.message)); // "Caught: Timeout"

const fast = Promise.resolve('quick');
fetchWithTimeout(fast, 1000)
  .then(v => console.log(v)); // "quick"`,
          hints: [
            'Create a timeout promise with new Promise((_, reject) => setTimeout(() => reject(...), ms)) and race it with the original promise.',
            'For fetchAll, use Promise.allSettled() to ensure all requests complete regardless of individual failures.',
            'Separate the allSettled results by checking result.status === "fulfilled" vs "rejected".',
          ],
        },
      },
      {
        id: 'url-api',
        title: 'URL API',
        difficulty: 'intermediate',
        tags: ['url', 'parse', 'query', 'search-params', 'href'],
        cheatSheetSummary: 'Parse and construct URLs with URL and URLSearchParams.',
        sections: [
          { heading: 'URL and URLSearchParams', content: 'The URL API provides a clean way to parse, construct, and manipulate URLs. The URL constructor parses a URL string into its components (protocol, hostname, pathname, search, hash). URLSearchParams handles query string parsing and construction, making it easy to work with query parameters without manual string manipulation.',
            code: `// Parse a URL
const url = new URL('https://example.com:8080/path?q=hello&page=2#section');
console.log('Protocol:', url.protocol);
console.log('Host:', url.host);
console.log('Pathname:', url.pathname);
console.log('Search:', url.search);
console.log('Hash:', url.hash);

// Query parameters
console.log('q:', url.searchParams.get('q'));
console.log('page:', url.searchParams.get('page'));

// Build URL with params
const apiUrl = new URL('https://api.example.com/search');
apiUrl.searchParams.set('q', 'javascript');
apiUrl.searchParams.set('page', '1');
apiUrl.searchParams.set('sort', 'relevance');
console.log(apiUrl.href);

// URLSearchParams standalone
const params = new URLSearchParams({ name: 'Alice', age: '30' });
console.log(params.toString());
params.append('hobby', 'coding');
console.log(params.toString());

// Iterate params
for (const [key, value] of params) {
  console.log(\`\${key} = \${value}\`);
}`,
            output: `Protocol: https:
Host: example.com:8080
Pathname: /path
Search: ?q=hello&page=2
Hash: #section
q: hello
page: 2
https://api.example.com/search?q=javascript&page=1&sort=relevance
name=Alice&age=30
name=Alice&age=30&hobby=coding
name = Alice
age = 30
hobby = coding`,
            tip: 'Always use the URL API instead of manual string concatenation for building URLs. It handles encoding, edge cases, and query parameter management correctly.' },
        ],
        quiz: [
          {
            question: 'What does new URL("/path", "https://example.com") produce?',
            options: ['It throws an error because /path is not a full URL', 'A URL object for "https://example.com/path"', 'A URL object for "/path"', 'It throws because URL only takes one argument'],
            correctIndex: 1,
            explanation: 'The URL constructor accepts an optional second argument as a base URL. When a relative path is provided as the first argument, it is resolved against the base URL, producing "https://example.com/path".',
          },
          {
            question: 'What is the difference between URLSearchParams.set() and URLSearchParams.append()?',
            options: ['set() and append() are identical', 'set() replaces any existing value for the key; append() adds an additional value for the same key', 'set() is for strings only; append() handles any type', 'append() throws if the key already exists'],
            correctIndex: 1,
            explanation: 'set() replaces all existing values for a key with a single new value. append() adds a new name-value pair without removing existing ones. This means a key can have multiple values when using append().',
          },
          {
            question: 'How do you properly encode a query parameter value that contains special characters?',
            options: ['Manually call encodeURIComponent()', 'Use URLSearchParams which handles encoding automatically', 'Use escape()', 'Replace spaces with + manually'],
            correctIndex: 1,
            explanation: 'URLSearchParams automatically handles URL encoding for both keys and values. When you call set() or append(), special characters are encoded. This is safer and cleaner than manually calling encodeURIComponent().',
          },
        ],
        challenge: {
          prompt: 'Write a function called buildApiUrl that takes a base URL string, an endpoint path, and an object of query parameters, then returns a properly constructed URL string. Handle edge cases like trailing slashes on the base URL and leading slashes on the path. Then write a function called parseQueryString that takes a query string (with or without the leading "?") and returns a plain object of key-value pairs.',
          starterCode: `function buildApiUrl(baseUrl, path, params = {}) {
  // TODO: Combine baseUrl + path + query params into a valid URL string
  // Handle trailing/leading slashes properly
  // e.g., buildApiUrl('https://api.com/', '/users', { page: 1, sort: 'name' })
  //   -> 'https://api.com/users?page=1&sort=name'
}

function parseQueryString(queryString) {
  // TODO: Parse a query string into a plain object
  // Handle optional leading "?"
  // e.g., '?name=Alice&age=30' -> { name: 'Alice', age: '30' }
}

// Test
console.log(buildApiUrl('https://api.com/', '/users', { page: 1, sort: 'name' }));
console.log(buildApiUrl('https://api.com', 'users', { q: 'hello world' }));
console.log(parseQueryString('?name=Alice&age=30&hobby=coding'));
console.log(parseQueryString('key=value'));`,
          solutionCode: `function buildApiUrl(baseUrl, path, params = {}) {
  // Normalize: remove trailing slash from base, remove leading slash from path
  const normalizedBase = baseUrl.replace(/\\/+$/, '');
  const normalizedPath = path.replace(/^\\/+/, '');
  const url = new URL(normalizedPath, normalizedBase + '/');
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }
  return url.href;
}

function parseQueryString(queryString) {
  const cleaned = queryString.startsWith('?') ? queryString.slice(1) : queryString;
  const params = new URLSearchParams(cleaned);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
}

// Test
console.log(buildApiUrl('https://api.com/', '/users', { page: 1, sort: 'name' }));
console.log(buildApiUrl('https://api.com', 'users', { q: 'hello world' }));
console.log(parseQueryString('?name=Alice&age=30&hobby=coding'));
console.log(parseQueryString('key=value'));`,
          hints: [
            'Use the URL constructor with a base URL to handle path joining. Strip trailing/leading slashes to avoid double slashes.',
            'Use url.searchParams.set() for each key-value pair in the params object.',
            'For parseQueryString, strip the leading "?" if present, then pass the string to new URLSearchParams() and iterate with a for...of loop.',
          ],
        },
      },
    ],
  },
  /* ------------------------------------------------------------ */
  /*  DOM Basics                                                   */
  /* ------------------------------------------------------------ */
  {
    id: 'js-dom-basics',
    label: 'DOM Basics',
    icon: 'Layout',
    entries: [
      {
        id: 'dom-selectors',
        title: 'DOM Selectors',
        difficulty: 'beginner',
        tags: ['dom', 'querySelector', 'getElementById', 'selector', 'element'],
        cheatSheetSummary: 'querySelector() and querySelectorAll() select DOM elements with CSS selectors.',
        sections: [
          { heading: 'Selecting Elements', content: 'The DOM (Document Object Model) represents HTML as a tree of objects. JavaScript can access and modify these objects. querySelector() returns the first matching element, while querySelectorAll() returns all matching elements as a NodeList. These methods accept any valid CSS selector, making them the most versatile selection methods.',
            analogy: 'Think of it like using a search bar for your HTML page — you type a CSS selector as your query, and the DOM returns the matching elements, just like a search engine returns matching results.',
            code: `// querySelector — first match
const heading = document.querySelector('h1');
const btn = document.querySelector('.btn-primary');
const nav = document.querySelector('#main-nav');
const firstLink = document.querySelector('nav a');

// querySelectorAll — all matches (returns NodeList)
const allButtons = document.querySelectorAll('button');
const items = document.querySelectorAll('.list-item');

// Convert NodeList to Array for array methods
const itemsArray = [...document.querySelectorAll('.item')];
const filtered = itemsArray.filter(el => el.dataset.active === 'true');

// Older methods (still valid)
const byId = document.getElementById('main');
const byClass = document.getElementsByClassName('card');
const byTag = document.getElementsByTagName('p');

// Scoped selection (search within an element)
const container = document.querySelector('.container');
const innerBtn = container?.querySelector('button');

// Check if element matches a selector
// heading?.matches('.title'); // true/false
// heading?.closest('.wrapper'); // find ancestor`,
            output: `// These return DOM element references
// heading: <h1>...</h1>
// allButtons: NodeList [button, button, ...]`,
            tip: 'querySelector/All is the preferred modern approach. Use getElementById only when you need the slight performance benefit for ID-based lookups.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    DOC["document"] --> HTML["html"]\n    HTML --> HEAD["head"]\n    HTML --> BODY["body"]\n    BODY --> NAV["nav#main-nav"]\n    BODY --> MAIN["main.container"]\n    NAV --> A1["a.nav-link"]\n    NAV --> A2["a.nav-link"]\n    MAIN --> H1["h1"]\n    MAIN --> UL["ul.list"]\n    UL --> LI1["li.list-item"]\n    UL --> LI2["li.list-item"]\n    UL --> LI3["li.list-item"]\n    style H1 fill:#fbbf24,stroke:#d97706,color:#000\n    style LI1 fill:#6ee7b7,stroke:#10b981,color:#000\n    style LI2 fill:#6ee7b7,stroke:#10b981,color:#000\n    style LI3 fill:#6ee7b7,stroke:#10b981,color:#000',
              caption: 'The DOM is a tree of element nodes. querySelector uses CSS selectors to find elements in this tree.',
            } },
        ],
        quiz: [
          {
            question: 'What does document.querySelectorAll(".card") return?',
            options: ['An Array of elements', 'A single Element', 'A NodeList of all elements with class "card"', 'undefined if no matches are found'],
            correctIndex: 2,
            explanation: 'querySelectorAll() always returns a NodeList, even if no elements match (in which case it returns an empty NodeList). A NodeList is array-like but is not a true Array, so you may need to spread it [...nodeList] to use array methods like .filter() or .map().',
          },
          {
            question: 'What is the key difference between querySelector() and getElementById()?',
            options: ['querySelector() only works with classes', 'getElementById() accepts any CSS selector', 'querySelector() accepts any CSS selector; getElementById() only accepts an ID string (without the # prefix)', 'There is no difference'],
            correctIndex: 2,
            explanation: 'querySelector() accepts any valid CSS selector (classes, IDs, attributes, combinators, etc.), while getElementById() only takes a plain ID string (without #). querySelector("#main") and getElementById("main") select the same element.',
          },
          {
            question: 'What does element.closest(".wrapper") do?',
            options: ['Finds the nearest child with class "wrapper"', 'Finds the nearest ancestor (or self) that matches the selector ".wrapper"', 'Returns the closest sibling', 'Returns all elements with class "wrapper"'],
            correctIndex: 1,
            explanation: 'closest() traverses up the DOM tree from the element (including itself) and returns the first ancestor that matches the given CSS selector. It returns null if no match is found. It is the opposite direction of querySelector() which searches downward.',
          },
        ],
        challenge: {
          prompt: 'Write a function called findElements that takes a CSS selector string and returns an object with: count (number of matches), elements (array of matched elements), and textContents (array of each element\'s textContent). Use querySelectorAll and convert the NodeList properly.',
          starterCode: `function findElements(selector) {
  // TODO: Query the DOM with the selector
  // Return { count, elements, textContents }
  // count: number of matched elements
  // elements: array (not NodeList) of matched elements
  // textContents: array of textContent strings from each element
}

// Example usage (assuming a page with list items):
// const result = findElements('.list-item');
// console.log(result.count);        // 3
// console.log(result.textContents); // ['Item 1', 'Item 2', 'Item 3']`,
          solutionCode: `function findElements(selector) {
  const nodeList = document.querySelectorAll(selector);
  const elements = [...nodeList];
  return {
    count: elements.length,
    elements,
    textContents: elements.map(el => el.textContent.trim()),
  };
}

// Example usage (assuming a page with list items):
// const result = findElements('.list-item');
// console.log(result.count);        // 3
// console.log(result.textContents); // ['Item 1', 'Item 2', 'Item 3']`,
          hints: [
            'Use document.querySelectorAll(selector) to get all matching elements as a NodeList.',
            'Convert the NodeList to a true array with [...nodeList] or Array.from(nodeList).',
            'Use .map(el => el.textContent.trim()) to extract and clean up text content from each element.',
          ],
        },
      },
      {
        id: 'dom-manipulation',
        title: 'DOM Manipulation',
        difficulty: 'beginner',
        tags: ['dom', 'create', 'append', 'remove', 'modify', 'element'],
        cheatSheetSummary: 'createElement(), append(), remove(), textContent, innerHTML for DOM changes.',
        sections: [
          { heading: 'Modifying the DOM', content: 'JavaScript can create, modify, and remove DOM elements dynamically. document.createElement() creates new elements. Element properties like textContent, innerHTML, classList, and style modify existing elements. Methods like append(), prepend(), remove(), and replaceWith() change the DOM tree structure. Modern methods like insertAdjacentHTML() offer flexible insertion.',
            code: `// Create and add elements
const div = document.createElement('div');
div.textContent = 'Hello, DOM!';
div.className = 'greeting';
div.id = 'my-div';
div.setAttribute('data-count', '42');
document.body.append(div);

// Modify content
const heading = document.querySelector('h1');
heading.textContent = 'New Title';   // text only (safe)
heading.innerHTML = '<em>New</em> Title'; // HTML (XSS risk!)

// Modify classes
div.classList.add('active', 'visible');
div.classList.remove('hidden');
div.classList.toggle('dark-mode');
console.log(div.classList.contains('active')); // true

// Modify styles
div.style.color = 'blue';
div.style.fontSize = '20px';
div.style.cssText = 'color: red; font-size: 24px;';

// Remove elements
div.remove(); // removes from DOM

// Insert adjacent
const list = document.querySelector('ul');
list?.insertAdjacentHTML('beforeend', '<li>New item</li>');

// Clone
const template = document.querySelector('.template');
const clone = template?.cloneNode(true); // deep clone`,
            codeHighlightLines: [11, 12],
            output: `// DOM is modified in the browser
// Elements are created, styled, and manipulated`,
            tip: 'Use textContent instead of innerHTML when inserting user-provided text. innerHTML can execute scripts (XSS vulnerability).' },
        ],
        quiz: [
          {
            question: 'What is the security risk of using innerHTML with user-provided content?',
            options: ['It is slower than textContent', 'It can lead to XSS (cross-site scripting) attacks because HTML and scripts are parsed', 'It causes memory leaks', 'It does not work in all browsers'],
            correctIndex: 1,
            explanation: 'innerHTML parses the string as HTML, which means any <script> tags or event handler attributes (like onerror) in user-provided content will be executed. This is a cross-site scripting (XSS) vulnerability. Use textContent for user-provided text.',
          },
          {
            question: 'What does element.classList.toggle("active") do?',
            options: ['Always adds the "active" class', 'Always removes the "active" class', 'Adds "active" if absent, removes it if present', 'Throws an error if the class does not exist'],
            correctIndex: 2,
            explanation: 'classList.toggle() adds the class if the element does not have it, and removes it if the element already has it. It also returns a boolean indicating whether the class is now present.',
          },
          {
            question: 'What is the difference between append() and appendChild()?',
            options: ['They are identical', 'append() can take strings and multiple nodes; appendChild() only takes a single Node', 'appendChild() is newer and more powerful', 'append() only works with text, not elements'],
            correctIndex: 1,
            explanation: 'append() is the modern method that can accept multiple arguments including both Node objects and plain strings (which become text nodes). appendChild() only accepts a single Node object and returns it. append() is generally preferred.',
          },
          {
            question: 'What does cloneNode(true) do differently than cloneNode(false)?',
            options: ['true makes the clone read-only', 'true creates a deep clone (element and all its children); false clones only the element itself', 'true copies event listeners; false does not', 'true copies the element to the clipboard'],
            correctIndex: 1,
            explanation: 'cloneNode(true) performs a deep clone: the element and all its descendant elements and text are copied. cloneNode(false) is a shallow clone: only the element itself (with attributes) is copied, without children. Neither copies event listeners.',
          },
        ],
        challenge: {
          prompt: 'Write a function called createCard that takes an object { title, body, tags } and returns a DOM element representing a card. The card should be a div with class "card", containing an h2 for the title, a p for the body, and a div with class "tags" containing span elements for each tag. Then write a function called replaceContent that takes a container element and an array of card data, clears the container, and appends the created cards.',
          starterCode: `function createCard({ title, body, tags }) {
  // TODO: Create a card DOM element:
  // <div class="card">
  //   <h2>{title}</h2>
  //   <p>{body}</p>
  //   <div class="tags">
  //     <span class="tag">{tag1}</span>
  //     <span class="tag">{tag2}</span>
  //   </div>
  // </div>
}

function replaceContent(container, cardsData) {
  // TODO: Clear the container and append cards for each data item
}

// Example usage:
// const container = document.querySelector('#cards');
// replaceContent(container, [
//   { title: 'Card 1', body: 'Body text', tags: ['js', 'dom'] },
//   { title: 'Card 2', body: 'More text', tags: ['css'] },
// ]);`,
          solutionCode: `function createCard({ title, body, tags }) {
  const card = document.createElement('div');
  card.className = 'card';

  const h2 = document.createElement('h2');
  h2.textContent = title;

  const p = document.createElement('p');
  p.textContent = body;

  const tagsDiv = document.createElement('div');
  tagsDiv.className = 'tags';
  for (const tag of tags) {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    tagsDiv.append(span);
  }

  card.append(h2, p, tagsDiv);
  return card;
}

function replaceContent(container, cardsData) {
  container.innerHTML = '';
  for (const data of cardsData) {
    container.append(createCard(data));
  }
}

// Example usage:
// const container = document.querySelector('#cards');
// replaceContent(container, [
//   { title: 'Card 1', body: 'Body text', tags: ['js', 'dom'] },
//   { title: 'Card 2', body: 'More text', tags: ['css'] },
// ]);`,
          hints: [
            'Use document.createElement() for each HTML element. Set textContent (not innerHTML) for user content to prevent XSS.',
            'Use append() to add multiple children at once: card.append(h2, p, tagsDiv).',
            'Clear the container with container.innerHTML = "" before appending new cards.',
          ],
        },
      },
      {
        id: 'dom-events',
        title: 'DOM Events',
        difficulty: 'intermediate',
        tags: ['dom', 'event', 'listener', 'click', 'addEventListener', 'delegation'],
        cheatSheetSummary: 'addEventListener() attaches handlers. Event delegation handles dynamic elements.',
        sections: [
          { heading: 'Event Handling', content: 'Events are actions that happen in the browser: clicks, key presses, form submissions, scroll, etc. addEventListener() attaches event handlers to elements. The event object provides information about what happened. Event delegation uses a single listener on a parent to handle events from child elements, which is essential for dynamic content.',
            analogy: 'Think of it like a receptionist at a front desk — instead of every employee answering their own phone (one listener per element), the receptionist takes all calls (event delegation) and routes them to the right person based on who the caller asked for.',
            code: `// Basic event listener
const button = document.querySelector('#my-btn');
button?.addEventListener('click', (event) => {
  console.log('Clicked!', event.target.textContent);
});

// Common events
const input = document.querySelector('input');
input?.addEventListener('input', (e) => {
  console.log('Value:', e.target.value);
});
input?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') console.log('Enter pressed!');
});

// Event delegation (handles dynamically added elements)
const list = document.querySelector('#todo-list');
list?.addEventListener('click', (event) => {
  const li = event.target.closest('li');
  if (!li) return;
  li.classList.toggle('completed');
});

// Remove listener
function handler() { console.log('Once'); }
button?.addEventListener('click', handler);
button?.removeEventListener('click', handler);

// Once option (auto-removes after first call)
button?.addEventListener('click', () => {
  console.log('Only fires once');
}, { once: true });

// Prevent default behavior
const form = document.querySelector('form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  // handle form data with JS instead
});`,
            codeHighlightLines: [17, 18, 19, 20, 21],
            output: `// Event handlers fire in response to user actions
// 'Clicked!' logged when button is clicked
// 'Value: ...' logged on every keystroke`,
            tip: 'Use event delegation for lists and dynamic content. Attach one listener to the parent instead of one per child element.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart BT\n    subgraph "Event Bubbling"\n        LI["li (click target)"] -->|"bubbles up"| UL["ul#todo-list (listener)"]\n        UL -->|"bubbles up"| BODY["body"]\n        BODY -->|"bubbles up"| DOC["document"]\n    end\n    subgraph "Event Delegation"\n        UL2["ul#todo-list\\n1 listener"] --- LI1["li: Item 1"]\n        UL2 --- LI2["li: Item 2"]\n        UL2 --- LI3["li: Item 3 (new)"]\n    end',
              caption: 'Events bubble from the clicked child up through the DOM tree. Event delegation uses one parent listener to handle clicks on any child, including dynamically added ones.',
            } },
        ],
        quiz: [
          {
            question: 'What is event delegation?',
            options: ['Adding an event listener to every child element individually', 'Adding a single event listener to a parent that handles events from its children via bubbling', 'Using setTimeout to delay event handling', 'Passing events from one element to another manually'],
            correctIndex: 1,
            explanation: 'Event delegation exploits event bubbling: you attach one listener to a parent element and use event.target or event.target.closest() to determine which child was actually clicked. This handles dynamically added children and is more memory-efficient.',
          },
          {
            question: 'What does event.preventDefault() do?',
            options: ['Stops the event from bubbling up', 'Prevents the browser default action (like form submission or link navigation)', 'Removes the event listener', 'Prevents any other handlers from running'],
            correctIndex: 1,
            explanation: 'preventDefault() stops the browser\'s default action for that event. For example, it prevents a form from submitting and reloading the page, or prevents a link from navigating. It does NOT stop event propagation (use stopPropagation() for that).',
          },
          {
            question: 'What is the difference between event.target and event.currentTarget?',
            options: ['They are always the same element', 'target is the element that was actually clicked; currentTarget is the element the listener is attached to', 'currentTarget is the element that was clicked; target is the parent', 'target is for mouse events; currentTarget is for keyboard events'],
            correctIndex: 1,
            explanation: 'event.target is the actual element that triggered the event (e.g., the specific li clicked). event.currentTarget is the element the listener is attached to (e.g., the parent ul). In event delegation, these are different.',
          },
          {
            question: 'What does the { once: true } option do in addEventListener?',
            options: ['The listener fires only on the first element that matches', 'The listener automatically removes itself after being called once', 'The event can only be triggered once per page load', 'It makes the listener synchronous'],
            correctIndex: 1,
            explanation: 'The { once: true } option tells the browser to automatically remove the event listener after it fires once. This is cleaner than manually calling removeEventListener() for one-time handlers.',
          },
        ],
        challenge: {
          prompt: 'Write a function called delegateEvent that takes a parent element, an event type, a CSS selector for child elements, and a callback. It should add a single event listener on the parent that only fires the callback when the event target matches the selector (or is a child of a matching element). Return a cleanup function that removes the listener.',
          starterCode: `function delegateEvent(parent, eventType, selector, callback) {
  // TODO: Add a single event listener on parent
  // When the event fires, check if event.target matches the selector
  // or if event.target.closest(selector) matches an element inside parent
  // Call callback with (event, matchedElement) if it matches
  // Return a function that removes the event listener
}

// Example usage:
// const cleanup = delegateEvent(
//   document.querySelector('#todo-list'),
//   'click',
//   'li.todo-item',
//   (event, li) => {
//     li.classList.toggle('completed');
//     console.log('Toggled:', li.textContent);
//   }
// );
// // Later: cleanup() to remove the listener`,
          solutionCode: `function delegateEvent(parent, eventType, selector, callback) {
  function handler(event) {
    const matchedElement = event.target.closest(selector);
    if (matchedElement && parent.contains(matchedElement)) {
      callback(event, matchedElement);
    }
  }

  parent.addEventListener(eventType, handler);

  return function cleanup() {
    parent.removeEventListener(eventType, handler);
  };
}

// Example usage:
// const cleanup = delegateEvent(
//   document.querySelector('#todo-list'),
//   'click',
//   'li.todo-item',
//   (event, li) => {
//     li.classList.toggle('completed');
//     console.log('Toggled:', li.textContent);
//   }
// );
// // Later: cleanup() to remove the listener`,
          hints: [
            'Use event.target.closest(selector) to find the nearest ancestor (or self) matching the selector. This handles clicks on nested elements inside the target.',
            'Check parent.contains(matchedElement) to make sure the matched element is actually inside the parent (not a match from elsewhere in the DOM).',
            'Store the handler function reference so you can pass it to removeEventListener in the cleanup function.',
          ],
        },
      },
      {
        id: 'dom-storage',
        title: 'Web Storage',
        difficulty: 'beginner',
        tags: ['localStorage', 'sessionStorage', 'storage', 'persist', 'cache'],
        cheatSheetSummary: 'localStorage persists across sessions. sessionStorage clears on tab close.',
        sections: [
          { heading: 'localStorage and sessionStorage', content: 'Web Storage provides key-value storage in the browser. localStorage data persists across sessions (survives browser restart). sessionStorage data is cleared when the tab closes. Both store strings only, so use JSON.stringify/parse for objects. The storage limit is typically 5-10 MB per origin.',
            analogy: 'Think of it like two kinds of notebooks: localStorage is a permanent journal that survives even if you close and reopen it, while sessionStorage is a whiteboard that gets erased as soon as you leave the room (close the tab).',
            code: `// localStorage — persists permanently
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
console.log('Theme:', theme);

// Store objects as JSON
const user = { name: 'Alice', prefs: { lang: 'en' } };
localStorage.setItem('user', JSON.stringify(user));
const loaded = JSON.parse(localStorage.getItem('user'));
console.log('User:', loaded.name);

// Remove and clear
localStorage.removeItem('theme');
// localStorage.clear(); // removes everything

// sessionStorage — cleared when tab closes
sessionStorage.setItem('tempData', 'temporary');

// Check if key exists
if (localStorage.getItem('user') !== null) {
  console.log('User data exists');
}

// Helper for typed storage
function getStorage(key, fallback) {
  const item = localStorage.getItem(key);
  if (item === null) return fallback;
  try { return JSON.parse(item); }
  catch { return item; }
}
console.log(getStorage('missing', 'default'));

// Listen for storage changes (cross-tab)
window.addEventListener('storage', (event) => {
  console.log(\`\${event.key}: \${event.oldValue} -> \${event.newValue}\`);
});`,
            output: `Theme: dark
User: Alice
User data exists
default`,
            tip: 'localStorage is synchronous and blocks the main thread. For large data, use IndexedDB. Never store sensitive data (tokens, passwords) in localStorage.' },
        ],
        quiz: [
          {
            question: 'What is the key difference between localStorage and sessionStorage?',
            options: ['localStorage stores objects; sessionStorage stores strings only', 'localStorage persists until manually cleared; sessionStorage clears when the tab/window closes', 'sessionStorage has more storage space', 'localStorage works across all domains; sessionStorage is origin-specific'],
            correctIndex: 1,
            explanation: 'localStorage data persists indefinitely (survives browser restarts) until it is manually removed via removeItem() or clear(). sessionStorage data is cleared when the browser tab or window is closed. Both are origin-specific and both store strings only.',
          },
          {
            question: 'What does localStorage.getItem("nonexistent") return?',
            options: ['undefined', 'An empty string ""', 'null', 'It throws a ReferenceError'],
            correctIndex: 2,
            explanation: 'localStorage.getItem() returns null when the key does not exist. This is important to check because JSON.parse(null) returns null (does not throw), but passing null to methods expecting a string can cause issues.',
          },
          {
            question: 'Why must you use JSON.stringify/parse with localStorage?',
            options: ['Because localStorage only accepts JSON format', 'Because localStorage stores everything as strings, so objects need serialization', 'Because it is faster than storing objects directly', 'You do not need to; localStorage handles objects natively'],
            correctIndex: 1,
            explanation: 'localStorage stores all values as strings. If you store an object directly, it becomes "[object Object]". You must serialize with JSON.stringify() before storing and deserialize with JSON.parse() when retrieving to preserve the data structure.',
          },
          {
            question: 'When does the "storage" event fire?',
            options: ['Whenever localStorage changes in the current tab', 'Only when another tab/window from the same origin changes localStorage', 'Only when sessionStorage is cleared', 'On every page load'],
            correctIndex: 1,
            explanation: 'The "storage" event fires in OTHER tabs/windows from the same origin when localStorage is changed. It does NOT fire in the tab that made the change. This is useful for cross-tab communication and keeping tabs in sync.',
          },
        ],
        challenge: {
          prompt: 'Write a class called TypedStorage that wraps localStorage with type-safe get/set methods. The constructor takes a prefix string (to namespace keys). Implement get(key, fallback) that returns the parsed value or fallback, set(key, value) that stringifies and stores, remove(key), and clear() that only removes keys with the prefix. Handle JSON parse errors gracefully.',
          starterCode: `class TypedStorage {
  // TODO: Constructor takes a prefix for namespacing keys
  constructor(prefix) {
  }

  // TODO: Get a value by key, parsing from JSON. Return fallback if missing or parse error.
  get(key, fallback) {
  }

  // TODO: Set a value by key, serializing to JSON
  set(key, value) {
  }

  // TODO: Remove a single key
  remove(key) {
  }

  // TODO: Remove only keys that start with this instance's prefix
  clear() {
  }
}

// Test
const store = new TypedStorage('myapp');
store.set('user', { name: 'Alice', age: 30 });
console.log(store.get('user', null)); // { name: 'Alice', age: 30 }
console.log(store.get('missing', 'default')); // 'default'
store.remove('user');
console.log(store.get('user', null)); // null`,
          solutionCode: `class TypedStorage {
  constructor(prefix) {
    this.prefix = prefix + ':';
  }

  _key(key) {
    return this.prefix + key;
  }

  get(key, fallback) {
    const raw = localStorage.getItem(this._key(key));
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  set(key, value) {
    localStorage.setItem(this._key(key), JSON.stringify(value));
  }

  remove(key) {
    localStorage.removeItem(this._key(key));
  }

  clear() {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }
}

// Test
const store = new TypedStorage('myapp');
store.set('user', { name: 'Alice', age: 30 });
console.log(store.get('user', null)); // { name: 'Alice', age: 30 }
console.log(store.get('missing', 'default')); // 'default'
store.remove('user');
console.log(store.get('user', null)); // null`,
          hints: [
            'Prefix all keys with the namespace (e.g., "myapp:user") to avoid conflicts with other parts of the app.',
            'Always wrap JSON.parse() in a try/catch and return the fallback value if parsing fails.',
            'For clear(), iterate localStorage.length and collect keys starting with the prefix, then remove them in a separate loop to avoid index shifting.',
          ],
        },
      },
    ],
  },
];

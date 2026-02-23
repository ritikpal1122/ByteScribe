import type { DocCategory } from './types';

// Part 5: String Methods (20 entries)
export const JS_PART5_CATEGORIES: DocCategory[] = [
  {
    id: 'js-string-methods',
    label: 'String Methods',
    icon: 'Type',
    entries: [
      {
        id: 'str-charAt',
        title: 'String.charAt()',
        difficulty: 'beginner',
        signature: 'str.charAt(index): string',
        tags: ['string', 'charAt', 'character', 'access', 'index'],
        cheatSheetSummary: 'Returns character at index. Empty string if out of bounds.',
        sections: [
          { heading: 'Overview', content: 'charAt() returns the character at a specified index. If the index is out of range, it returns an empty string (unlike bracket notation which returns undefined). For modern code, bracket notation (str[0]) or str.at() is usually preferred, but charAt() is still useful when you want an empty string fallback.',
            code: `const str = 'JavaScript';
console.log(str.charAt(0));   // 'J'
console.log(str.charAt(4));   // 'S'
console.log(str.charAt(100)); // '' (out of range)
console.log(str[100]);        // undefined (bracket notation)

// Iterate characters
for (let i = 0; i < str.length; i++) {
  process.stdout.write(str.charAt(i) + ' ');
}
console.log();

// Comparison with at() (ES2022)
console.log(str.at(0));   // 'J'
console.log(str.at(-1));  // 't' (negative index!)`,
            output: `J
S

J a v a S c r i p t
J
t`,
            tip: 'Prefer str.at(-1) for the last character. Prefer bracket notation str[i] for general character access. Use charAt() when you want "" instead of undefined for out-of-range indices.',
            analogy: 'Think of it like a row of mailboxes numbered from 0: charAt(4) opens mailbox 4 and returns the letter inside. If the mailbox does not exist, you get an empty envelope instead of an error.' },
        ],
        quiz: [
          {
            question: 'What does charAt() return when the index is out of range?',
            options: ['undefined', 'null', 'An empty string', 'It throws an error'],
            correctIndex: 2,
            explanation: 'charAt() returns an empty string ("") when the index is out of range, unlike bracket notation (str[i]) which returns undefined.',
          },
          {
            question: 'What is the output of "Hello".charAt(1)?',
            options: ['H', 'e', 'l', 'o'],
            correctIndex: 1,
            explanation: 'charAt(1) returns the character at index 1. Since string indices are 0-based, index 0 is "H" and index 1 is "e".',
          },
          {
            question: 'Which method supports negative indices for accessing characters from the end?',
            options: ['charAt()', 'charCodeAt()', 'at()', 'substring()'],
            correctIndex: 2,
            explanation: 'The at() method (ES2022) supports negative indices, so str.at(-1) returns the last character. charAt() does not support negative indices.',
          },
        ],
        challenge: {
          prompt: 'Write a function called getFirstAndLast that takes a string and returns an object with "first" and "last" properties containing the first and last characters of the string. Use charAt().',
          starterCode: `function getFirstAndLast(str) {
  // Your code here
}

console.log(getFirstAndLast('Hello'));
// Expected: { first: 'H', last: 'o' }
console.log(getFirstAndLast('A'));
// Expected: { first: 'A', last: 'A' }`,
          solutionCode: `function getFirstAndLast(str) {
  return {
    first: str.charAt(0),
    last: str.charAt(str.length - 1),
  };
}

console.log(getFirstAndLast('Hello'));
// { first: 'H', last: 'o' }
console.log(getFirstAndLast('A'));
// { first: 'A', last: 'A' }`,
          hints: [
            'Use str.charAt(0) to get the first character.',
            'The last character is at index str.length - 1.',
            'Return an object literal with the "first" and "last" properties.',
          ],
        },
      },
      {
        id: 'str-charCodeAt',
        title: 'String.charCodeAt()',
        difficulty: 'intermediate',
        signature: 'str.charCodeAt(index): number',
        tags: ['string', 'charCode', 'unicode', 'UTF-16', 'ascii'],
        cheatSheetSummary: 'Returns UTF-16 code unit at index. NaN if out of range.',
        sections: [
          { heading: 'Overview', content: 'charCodeAt() returns the UTF-16 code unit (0-65535) at the specified index. It returns NaN for out-of-range indices. This is useful for character-level operations like Caesar ciphers, alphabetical indexing, and character validation. For full Unicode code points (including emoji), use codePointAt() instead.',
            code: `console.log('A'.charCodeAt(0));   // 65
console.log('a'.charCodeAt(0));   // 97
console.log('0'.charCodeAt(0));   // 48
console.log(' '.charCodeAt(0));   // 32

// Convert back with String.fromCharCode
console.log(String.fromCharCode(65));  // 'A'
console.log(String.fromCharCode(72, 101, 108, 108, 111)); // 'Hello'

// Practical: shift cipher
function caesarCipher(str, shift) {
  return [...str].map(ch => {
    const code = ch.charCodeAt(0);
    if (code >= 65 && code <= 90) { // uppercase
      return String.fromCharCode(((code - 65 + shift) % 26) + 65);
    }
    if (code >= 97 && code <= 122) { // lowercase
      return String.fromCharCode(((code - 97 + shift) % 26) + 97);
    }
    return ch;
  }).join('');
}
console.log(caesarCipher('Hello', 3)); // 'Khoor'`,
            output: `65
97
48
32
A
Hello
Khoor`,
            tip: 'For emoji and characters outside the Basic Multilingual Plane, use str.codePointAt() and String.fromCodePoint() instead of charCodeAt/fromCharCode.',
            codeHighlightLines: [1, 2, 7, 13, 15] },
        ],
        quiz: [
          {
            question: 'What does charCodeAt() return for an out-of-range index?',
            options: ['0', '-1', 'undefined', 'NaN'],
            correctIndex: 3,
            explanation: 'charCodeAt() returns NaN when the index is out of range, unlike charAt() which returns an empty string.',
          },
          {
            question: 'What is the UTF-16 code unit for the uppercase letter "A"?',
            options: ['41', '65', '97', '90'],
            correctIndex: 1,
            explanation: '"A".charCodeAt(0) returns 65. Uppercase letters A-Z have code units 65-90 in UTF-16/ASCII.',
          },
          {
            question: 'Which method should you use for characters outside the Basic Multilingual Plane (like emoji)?',
            options: ['charCodeAt()', 'charAt()', 'codePointAt()', 'indexOf()'],
            correctIndex: 2,
            explanation: 'codePointAt() handles full Unicode code points including emoji and other characters above U+FFFF, while charCodeAt() only returns UTF-16 code units (0-65535).',
          },
          {
            question: 'What does String.fromCharCode(72, 101, 108, 108, 111) return?',
            options: ['"Hello"', '"World"', '"72101108108111"', 'An array of characters'],
            correctIndex: 0,
            explanation: 'String.fromCharCode() converts UTF-16 code units back to characters. 72="H", 101="e", 108="l", 108="l", 111="o", producing "Hello".',
          },
        ],
        challenge: {
          prompt: 'Write a function called isUpperCase that takes a single character and returns true if it is an uppercase letter (A-Z), using charCodeAt(). Do not use regex or toUpperCase().',
          starterCode: `function isUpperCase(char) {
  // Your code here
}

console.log(isUpperCase('A')); // true
console.log(isUpperCase('z')); // false
console.log(isUpperCase('5')); // false
console.log(isUpperCase('M')); // true`,
          solutionCode: `function isUpperCase(char) {
  const code = char.charCodeAt(0);
  return code >= 65 && code <= 90;
}

console.log(isUpperCase('A')); // true
console.log(isUpperCase('z')); // false
console.log(isUpperCase('5')); // false
console.log(isUpperCase('M')); // true`,
          hints: [
            'Get the character code with char.charCodeAt(0).',
            'Uppercase A is 65 and uppercase Z is 90.',
            'Check if the code falls within the range 65 to 90 inclusive.',
          ],
        },
      },
      {
        id: 'str-concat',
        title: 'String.concat()',
        difficulty: 'beginner',
        signature: 'str.concat(...strings): string',
        tags: ['string', 'concat', 'join', 'combine', 'append'],
        cheatSheetSummary: 'Concatenates strings. Template literals or + are preferred.',
        sections: [
          { heading: 'Overview', content: 'concat() joins two or more strings and returns a new string. It does not modify the original. However, template literals (`${a} ${b}`) and the + operator are almost always preferred for their cleaner syntax. concat() exists mainly for historical reasons and for cases where you need to concatenate from an array of strings.',
            code: `const greeting = 'Hello';
const name = 'World';

// concat method
console.log(greeting.concat(', ', name, '!'));

// + operator (simpler)
console.log(greeting + ', ' + name + '!');

// Template literal (best)
console.log(\`\${greeting}, \${name}!\`);

// concat with multiple args
console.log(''.concat('a', 'b', 'c', 'd'));

// For arrays of strings, use join()
const parts = ['Hello', 'Beautiful', 'World'];
console.log(parts.join(' '));`,
            output: `Hello, World!
Hello, World!
Hello, World!
abcd
Hello Beautiful World`,
            tip: 'Prefer template literals over concat() for readability. Use Array.join() when combining many string fragments — it is faster than repeated concatenation.' },
        ],
        quiz: [
          {
            question: 'What is the preferred modern way to concatenate strings in JavaScript?',
            options: ['concat()', 'The + operator', 'Template literals', 'Array.join()'],
            correctIndex: 2,
            explanation: 'Template literals (`${a} ${b}`) are the preferred modern approach for string concatenation due to their clean, readable syntax and support for embedded expressions.',
          },
          {
            question: 'Does concat() modify the original string?',
            options: ['Yes, it appends to the original', 'No, it returns a new string', 'It depends on the number of arguments', 'It modifies the original only if called on a variable'],
            correctIndex: 1,
            explanation: 'Strings in JavaScript are immutable. concat() always returns a new string without modifying the original.',
          },
          {
            question: 'What is the best approach when combining many string fragments from an array?',
            options: ['concat() in a loop', 'The + operator in a loop', 'Array.join()', 'Template literals in a loop'],
            correctIndex: 2,
            explanation: 'Array.join() is the most efficient and clean approach for combining many string fragments from an array. It avoids repeated string creation.',
          },
        ],
        challenge: {
          prompt: 'Write a function called buildGreeting that takes a name, time of day ("morning", "afternoon", "evening"), and a language ("en", "es") and returns a greeting string. Use concat() for the English greeting and template literals for the Spanish greeting.',
          starterCode: `function buildGreeting(name, timeOfDay, lang) {
  // Your code here
}

console.log(buildGreeting('Alice', 'morning', 'en'));
// Expected: "Good morning, Alice!"
console.log(buildGreeting('Carlos', 'evening', 'es'));
// Expected: "Buenas evening, Carlos!"`,
          solutionCode: `function buildGreeting(name, timeOfDay, lang) {
  if (lang === 'en') {
    return ''.concat('Good ', timeOfDay, ', ', name, '!');
  }
  return \`Buenas \${timeOfDay}, \${name}!\`;
}

console.log(buildGreeting('Alice', 'morning', 'en'));
// "Good morning, Alice!"
console.log(buildGreeting('Carlos', 'evening', 'es'));
// "Buenas evening, Carlos!"`,
          hints: [
            'Use concat() by calling it on an empty string: "".concat(...)',
            'For template literals, use backticks with ${expression} syntax.',
            'Check the lang parameter to decide which approach to use.',
          ],
        },
      },
      {
        id: 'str-includes',
        title: 'String.includes()',
        difficulty: 'beginner',
        signature: 'str.includes(search, position?): boolean',
        tags: ['string', 'includes', 'contains', 'search', 'substring'],
        cheatSheetSummary: 'Returns true if string contains the substring. Case-sensitive.',
        sections: [
          { heading: 'Overview', content: 'includes() determines whether a string contains a given substring, returning true or false. It is case-sensitive and accepts an optional position to start searching from. This is more readable than indexOf() !== -1 for simple existence checks. For case-insensitive checks, convert both strings to the same case first.',
            code: `const text = 'Hello, World!';

console.log(text.includes('World'));   // true
console.log(text.includes('world'));   // false (case-sensitive!)
console.log(text.includes('Hello', 1)); // false (search from index 1)

// Case-insensitive check
const lower = text.toLowerCase();
console.log(lower.includes('world')); // true

// Practical: search filter
const items = ['JavaScript', 'TypeScript', 'Python', 'Java'];
const query = 'script';
const matches = items.filter(item =>
  item.toLowerCase().includes(query.toLowerCase())
);
console.log('Matches:', matches);

// vs indexOf
console.log(text.indexOf('World') !== -1); // true (old way)
console.log(text.includes('World'));        // true (modern)`,
            output: `true
false
false
true
Matches: ['JavaScript', 'TypeScript']
true
true`,
            tip: 'includes() is case-sensitive. For case-insensitive search, convert both strings with toLowerCase() or toUpperCase() before comparing.',
            analogy: 'Think of it like using Ctrl+F in a document: includes() searches the entire string for an exact substring match and tells you whether it found it or not.',
            codeHighlightLines: [3, 4, 14, 15] },
        ],
        quiz: [
          {
            question: 'Is String.includes() case-sensitive?',
            options: ['No, it is case-insensitive by default', 'Yes, it is always case-sensitive', 'It depends on the locale', 'Only when the second parameter is provided'],
            correctIndex: 1,
            explanation: 'includes() is always case-sensitive. "Hello".includes("hello") returns false. For case-insensitive checks, convert both strings to the same case first.',
          },
          {
            question: 'What does the optional second parameter of includes() do?',
            options: ['Sets the maximum search length', 'Specifies the position to start searching from', 'Makes the search case-insensitive', 'Limits the number of results'],
            correctIndex: 1,
            explanation: 'The second parameter specifies the index position to start the search from. Characters before that position are not searched.',
          },
          {
            question: 'What does includes() return when the search string is not found?',
            options: ['-1', 'null', 'undefined', 'false'],
            correctIndex: 3,
            explanation: 'includes() returns a boolean: true if the substring is found, false otherwise. This is different from indexOf() which returns -1 when not found.',
          },
        ],
        challenge: {
          prompt: 'Write a function called filterByKeyword that takes an array of strings and a keyword, and returns all strings that contain the keyword (case-insensitive). Use includes().',
          starterCode: `function filterByKeyword(items, keyword) {
  // Your code here
}

const fruits = ['Apple Pie', 'Banana Split', 'apple sauce', 'Cherry', 'APPLE cider'];
console.log(filterByKeyword(fruits, 'apple'));
// Expected: ['Apple Pie', 'apple sauce', 'APPLE cider']`,
          solutionCode: `function filterByKeyword(items, keyword) {
  const lowerKeyword = keyword.toLowerCase();
  return items.filter(item =>
    item.toLowerCase().includes(lowerKeyword)
  );
}

const fruits = ['Apple Pie', 'Banana Split', 'apple sauce', 'Cherry', 'APPLE cider'];
console.log(filterByKeyword(fruits, 'apple'));
// ['Apple Pie', 'apple sauce', 'APPLE cider']`,
          hints: [
            'Convert both the item and keyword to lowercase for case-insensitive matching.',
            'Use Array.filter() to keep only the items that match.',
            'Call toLowerCase() on both strings before using includes().',
          ],
        },
      },
      {
        id: 'str-indexOf',
        title: 'String.indexOf()',
        difficulty: 'beginner',
        signature: 'str.indexOf(search, fromIndex?): number',
        tags: ['string', 'indexOf', 'search', 'position', 'find'],
        cheatSheetSummary: 'Returns first index of substring, or -1 if not found.',
        sections: [
          { heading: 'Overview', content: 'indexOf() returns the index of the first occurrence of a substring. It returns -1 if the substring is not found. An optional second argument specifies where to start searching. Use includes() for simple existence checks, but indexOf() when you need the actual position.',
            code: `const str = 'hello world hello';

console.log(str.indexOf('hello'));    // 0
console.log(str.indexOf('hello', 1)); // 12 (search from index 1)
console.log(str.indexOf('xyz'));      // -1

// Find all occurrences
function findAll(str, search) {
  const positions = [];
  let pos = str.indexOf(search);
  while (pos !== -1) {
    positions.push(pos);
    pos = str.indexOf(search, pos + 1);
  }
  return positions;
}
console.log(findAll('abcabcabc', 'abc'));

// lastIndexOf — search from the end
console.log(str.lastIndexOf('hello')); // 12

// Practical: extract file extension
const filename = 'archive.tar.gz';
const lastDot = filename.lastIndexOf('.');
const ext = filename.slice(lastDot + 1);
console.log('Extension:', ext);`,
            output: `0
12
-1
[0, 3, 6]
12
Extension: gz`,
            tip: 'Use lastIndexOf() to find the last occurrence. Use includes() when you only need to know if the substring exists (no position needed).',
            codeHighlightLines: [3, 4, 10, 13, 24] },
        ],
        quiz: [
          {
            question: 'What does indexOf() return when the substring is not found?',
            options: ['0', 'null', 'false', '-1'],
            correctIndex: 3,
            explanation: 'indexOf() returns -1 when the substring is not found. This is a common pattern: check if result !== -1 to confirm a match.',
          },
          {
            question: 'What is the difference between indexOf() and includes()?',
            options: ['indexOf() is case-insensitive', 'indexOf() returns the position while includes() returns a boolean', 'includes() is faster', 'There is no difference'],
            correctIndex: 1,
            explanation: 'indexOf() returns the numeric index of the first match (or -1), while includes() returns a boolean (true/false). Use indexOf() when you need the position, includes() when you only need existence.',
          },
          {
            question: 'What does lastIndexOf() do?',
            options: ['Returns the last character', 'Searches from the end and returns the index of the last occurrence', 'Returns the index from the end of the string', 'Searches in reverse order only'],
            correctIndex: 1,
            explanation: 'lastIndexOf() returns the index of the last occurrence of the search string. The index returned is still measured from the beginning of the string.',
          },
        ],
        challenge: {
          prompt: 'Write a function called findAllPositions that takes a string and a search substring, and returns an array of all indices where the substring occurs. Use indexOf() with its fromIndex parameter.',
          starterCode: `function findAllPositions(str, search) {
  // Your code here
}

console.log(findAllPositions('banana', 'an'));
// Expected: [1, 3]
console.log(findAllPositions('hello world', 'o'));
// Expected: [4, 7]
console.log(findAllPositions('test', 'xyz'));
// Expected: []`,
          solutionCode: `function findAllPositions(str, search) {
  const positions = [];
  let pos = str.indexOf(search);
  while (pos !== -1) {
    positions.push(pos);
    pos = str.indexOf(search, pos + 1);
  }
  return positions;
}

console.log(findAllPositions('banana', 'an'));
// [1, 3]
console.log(findAllPositions('hello world', 'o'));
// [4, 7]
console.log(findAllPositions('test', 'xyz'));
// []`,
          hints: [
            'Start by finding the first occurrence with indexOf().',
            'Use a while loop that continues as long as indexOf() does not return -1.',
            'After each found position, search again starting from pos + 1.',
          ],
        },
      },
      {
        id: 'str-slice',
        title: 'String.slice()',
        difficulty: 'beginner',
        signature: 'str.slice(start, end?): string',
        tags: ['string', 'slice', 'extract', 'substring', 'negative'],
        cheatSheetSummary: 'Extracts a section of a string. Supports negative indices.',
        sections: [
          { heading: 'Overview', content: 'slice() extracts a section of a string and returns it as a new string. It takes a start index (inclusive) and an optional end index (exclusive). Negative indices count from the end. Unlike substring(), slice() handles negative indices correctly and is generally preferred in modern code.',
            code: `const str = 'JavaScript';

console.log(str.slice(0, 4));   // 'Java'
console.log(str.slice(4));      // 'Script'
console.log(str.slice(-6));     // 'Script'
console.log(str.slice(-6, -1)); // 'Scrip'
console.log(str.slice(0, -6));  // 'Java'

// Original unchanged
console.log(str);

// Practical: truncate with ellipsis
function truncate(str, maxLen) {
  return str.length > maxLen
    ? str.slice(0, maxLen - 3) + '...'
    : str;
}
console.log(truncate('Hello, World!', 10));
console.log(truncate('Hi', 10));

// Extract domain from URL
const url = 'https://www.example.com/path';
const domain = url.slice(url.indexOf('//') + 2, url.indexOf('/', 8));
console.log('Domain:', domain);`,
            output: `Java
Script
Script
Scrip
Java
JavaScript
Hello,...
Hi
Domain: www.example.com`,
            tip: 'Prefer slice() over substring(). slice() supports negative indices and has more predictable behavior when start > end.',
            analogy: 'Think of it like cutting a ribbon: you mark a start point and an end point, and slice() snips out that section. Negative numbers let you measure from the right end of the ribbon.',
            codeHighlightLines: [3, 4, 5, 15] },
        ],
        quiz: [
          {
            question: 'What does slice() return when given a negative index?',
            options: ['An error', 'An empty string', 'It counts from the end of the string', 'undefined'],
            correctIndex: 2,
            explanation: 'Negative indices in slice() count from the end of the string. str.slice(-3) returns the last 3 characters.',
          },
          {
            question: 'Is the end index inclusive or exclusive in slice()?',
            options: ['Inclusive', 'Exclusive', 'It depends on whether the index is negative', 'Both start and end are inclusive'],
            correctIndex: 1,
            explanation: 'The end index in slice() is exclusive. str.slice(0, 4) returns characters at indices 0, 1, 2, 3 but not 4.',
          },
          {
            question: 'What does "JavaScript".slice(4) return?',
            options: ['"Java"', '"Script"', '"aScrip"', '"aScript"'],
            correctIndex: 1,
            explanation: 'When only the start index is provided, slice() extracts from that index to the end. "JavaScript".slice(4) returns "Script".',
          },
          {
            question: 'Why is slice() preferred over substring()?',
            options: ['slice() is faster', 'slice() supports negative indices and has more predictable behavior', 'substring() is deprecated', 'slice() can modify the original string'],
            correctIndex: 1,
            explanation: 'slice() supports negative indices and does not swap arguments when start > end, making its behavior more predictable than substring().',
          },
        ],
        challenge: {
          prompt: 'Write a function called truncateMiddle that takes a string and a max length. If the string exceeds maxLen, keep the first and last portions with "..." in the middle. For example, truncateMiddle("abcdefghij", 7) should return "ab...ij".',
          starterCode: `function truncateMiddle(str, maxLen) {
  // Your code here
}

console.log(truncateMiddle('abcdefghij', 7));
// Expected: "ab...ij"
console.log(truncateMiddle('Hello, World!', 9));
// Expected: "Hel...d!"
console.log(truncateMiddle('Hi', 10));
// Expected: "Hi"`,
          solutionCode: `function truncateMiddle(str, maxLen) {
  if (str.length <= maxLen) return str;
  const charsToShow = maxLen - 3;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return str.slice(0, frontChars) + '...' + str.slice(-backChars);
}

console.log(truncateMiddle('abcdefghij', 7));
// "ab...ij"
console.log(truncateMiddle('Hello, World!', 9));
// "Hel...d!"
console.log(truncateMiddle('Hi', 10));
// "Hi"`,
          hints: [
            'If the string is already within maxLen, return it unchanged.',
            'Calculate how many visible characters you need: maxLen - 3 (for the "...").',
            'Use slice(0, frontChars) for the beginning and slice(-backChars) for the end.',
          ],
        },
      },
      {
        id: 'str-substring',
        title: 'String.substring()',
        difficulty: 'beginner',
        signature: 'str.substring(start, end?): string',
        tags: ['string', 'substring', 'extract', 'range'],
        cheatSheetSummary: 'Extracts characters between two indices. Swaps if start > end.',
        sections: [
          { heading: 'Overview', content: 'substring() extracts characters between two indices. Unlike slice(), it swaps arguments if start > end, and treats negative indices as 0. Most developers prefer slice() for its more predictable behavior, but substring() is still common in existing codebases.',
            code: `const str = 'JavaScript';

console.log(str.substring(0, 4));  // 'Java'
console.log(str.substring(4));     // 'Script'

// substring swaps if start > end
console.log(str.substring(4, 0));  // 'Java' (swapped!)
console.log(str.slice(4, 0));      // '' (slice returns empty)

// Negative values become 0
console.log(str.substring(-3));    // 'JavaScript' (treated as 0)
console.log(str.slice(-3));        // 'ipt' (from end)

// Practical comparison
const text = 'Hello, World!';
// Both work for basic extraction:
console.log(text.slice(7, 12));      // 'World'
console.log(text.substring(7, 12));  // 'World'`,
            output: `Java
Script
Java

JavaScript
ipt
World
World`,
            tip: 'Prefer slice() over substring() in new code. slice() handles negative indices correctly and does not swap arguments, making it more predictable.',
            codeHighlightLines: [7, 8, 11, 12] },
        ],
        quiz: [
          {
            question: 'What happens when you call substring() with start > end?',
            options: ['It returns an empty string', 'It throws an error', 'It swaps the arguments', 'It returns undefined'],
            correctIndex: 2,
            explanation: 'substring() automatically swaps the arguments if start > end. So substring(4, 0) is treated as substring(0, 4). This differs from slice() which returns an empty string.',
          },
          {
            question: 'How does substring() handle negative indices?',
            options: ['It counts from the end', 'It treats them as 0', 'It throws a RangeError', 'It returns NaN'],
            correctIndex: 1,
            explanation: 'substring() treats negative values as 0. This means substring(-3) is the same as substring(0), which returns the entire string.',
          },
          {
            question: 'Which method is generally preferred in modern JavaScript: slice() or substring()?',
            options: ['substring() because it auto-swaps', 'slice() because it handles negatives and is more predictable', 'They are equally preferred', 'Neither, use substr() instead'],
            correctIndex: 1,
            explanation: 'slice() is preferred because it supports negative indices correctly and has more predictable behavior (no argument swapping).',
          },
        ],
        challenge: {
          prompt: 'Write a function called extractBetween that takes a string, a start marker, and an end marker, and returns the text between them. Use substring() with indexOf() to find the positions.',
          starterCode: `function extractBetween(str, startMarker, endMarker) {
  // Your code here
}

console.log(extractBetween('Hello [World] Foo', '[', ']'));
// Expected: "World"
console.log(extractBetween('<title>My Page</title>', '<title>', '</title>'));
// Expected: "My Page"`,
          solutionCode: `function extractBetween(str, startMarker, endMarker) {
  const startIdx = str.indexOf(startMarker) + startMarker.length;
  const endIdx = str.indexOf(endMarker, startIdx);
  return str.substring(startIdx, endIdx);
}

console.log(extractBetween('Hello [World] Foo', '[', ']'));
// "World"
console.log(extractBetween('<title>My Page</title>', '<title>', '</title>'));
// "My Page"`,
          hints: [
            'Find the start position using indexOf(startMarker) and add the length of startMarker.',
            'Find the end position using indexOf(endMarker, startIdx) to search after the start marker.',
            'Use substring(startIdx, endIdx) to extract the text between the markers.',
          ],
        },
      },
      {
        id: 'str-split',
        title: 'String.split()',
        difficulty: 'beginner',
        signature: 'str.split(separator, limit?): string[]',
        tags: ['string', 'split', 'array', 'tokenize', 'parse'],
        cheatSheetSummary: 'Splits string into array by separator. Inverse of Array.join().',
        sections: [
          { heading: 'Overview', content: 'split() divides a string into an array of substrings based on a separator. The separator can be a string or regular expression. An optional limit parameter restricts the number of splits. split() is the inverse of Array.join(). It is essential for parsing CSV, URLs, and any delimited text.',
            code: `// Basic splitting
console.log('a,b,c'.split(','));     // ['a', 'b', 'c']
console.log('hello world'.split(' ')); // ['hello', 'world']

// Split into characters
console.log('hello'.split(''));      // ['h', 'e', 'l', 'l', 'o']

// With limit
console.log('a,b,c,d,e'.split(',', 3)); // ['a', 'b', 'c']

// Split with regex
console.log('one1two2three'.split(/\\d/)); // ['one', 'two', 'three']

// Parse CSV line
const csv = 'Alice,30,NYC';
const [name, age, city] = csv.split(',');
console.log({ name, age: Number(age), city });

// Split and rejoin (transform)
const kebab = 'hello-world-foo';
const camel = kebab.split('-')
  .map((w, i) => i === 0 ? w : w[0].toUpperCase() + w.slice(1))
  .join('');
console.log(camel); // 'helloWorldFoo'`,
            output: `['a', 'b', 'c']
['hello', 'world']
['h', 'e', 'l', 'l', 'o']
['a', 'b', 'c']
['one', 'two', 'three']
{ name: 'Alice', age: 30, city: 'NYC' }
helloWorldFoo`,
            tip: 'split("") splits into individual characters. For Unicode-aware character splitting, use [...str] instead, which correctly handles emoji and multi-byte characters.',
            analogy: 'Think of it like breaking a chocolate bar along its scored lines: split() breaks the string at each separator and gives you an array of the pieces.',
            diagram: {
              kind: 'mermaid',
              code: `graph LR
  A["'a,b,c'"] -->|"split(',')"| B["['a', 'b', 'c']"]
  B -->|"join(',')"| A
  style A fill:#4a9eff,color:#fff
  style B fill:#51cf66,color:#fff`,
              caption: 'split() and join() are inverse operations',
            },
            codeHighlightLines: [2, 16, 21, 22, 23] },
        ],
        quiz: [
          {
            question: 'What is the inverse operation of split()?',
            options: ['concat()', 'slice()', 'join()', 'merge()'],
            correctIndex: 2,
            explanation: 'Array.join() is the inverse of split(). "a,b".split(",") gives ["a","b"], and ["a","b"].join(",") gives "a,b".',
          },
          {
            question: 'What does "hello".split("") return?',
            options: ['["hello"]', '["h", "e", "l", "l", "o"]', '["h", "ello"]', 'An empty array'],
            correctIndex: 1,
            explanation: 'Splitting with an empty string separator splits the string into individual characters: ["h", "e", "l", "l", "o"].',
          },
          {
            question: 'What does the optional limit parameter do in split()?',
            options: ['Limits the length of each substring', 'Limits the number of elements in the resulting array', 'Limits the search area', 'Limits the number of separators checked'],
            correctIndex: 1,
            explanation: 'The limit parameter restricts the number of splits, so the resulting array will have at most that many elements.',
          },
          {
            question: 'Can split() accept a regular expression as the separator?',
            options: ['No, only strings', 'Yes, and it splits on each match of the regex', 'Yes, but only without capture groups', 'Only with the /g flag'],
            correctIndex: 1,
            explanation: 'split() can accept a regular expression as the separator. It splits the string at each match of the regex pattern.',
          },
        ],
        challenge: {
          prompt: 'Write a function called toCamelCase that converts a hyphenated string (like "my-variable-name") to camelCase (like "myVariableName"). Use split() and join().',
          starterCode: `function toCamelCase(str) {
  // Your code here
}

console.log(toCamelCase('background-color'));
// Expected: "backgroundColor"
console.log(toCamelCase('my-long-variable-name'));
// Expected: "myLongVariableName"
console.log(toCamelCase('hello'));
// Expected: "hello"`,
          solutionCode: `function toCamelCase(str) {
  return str.split('-')
    .map((word, i) =>
      i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');
}

console.log(toCamelCase('background-color'));
// "backgroundColor"
console.log(toCamelCase('my-long-variable-name'));
// "myLongVariableName"
console.log(toCamelCase('hello'));
// "hello"`,
          hints: [
            'Split the string by "-" to get an array of words.',
            'Keep the first word as-is, but capitalize the first letter of every subsequent word.',
            'Join the array back together with an empty string.',
          ],
        },
      },
      {
        id: 'str-trim',
        title: 'String.trim()',
        difficulty: 'beginner',
        signature: 'str.trim(): string',
        tags: ['string', 'trim', 'whitespace', 'clean', 'strip'],
        cheatSheetSummary: 'Removes whitespace from both ends. Also trimStart() and trimEnd().',
        sections: [
          { heading: 'Overview', content: 'trim() removes whitespace from both ends of a string. This includes spaces, tabs, newlines, and other Unicode whitespace characters. trimStart() (alias trimLeft()) removes only leading whitespace, and trimEnd() (alias trimRight()) removes only trailing whitespace. These methods are essential for cleaning user input.',
            code: `const messy = '   Hello, World!   ';

console.log(messy.trim());      // 'Hello, World!'
console.log(messy.trimStart()); // 'Hello, World!   '
console.log(messy.trimEnd());   // '   Hello, World!'

// Removes tabs, newlines, etc.
console.log('\\t\\n Hello \\n\\t'.trim()); // 'Hello'

// Practical: clean user input
function cleanInput(input) {
  return input.trim().replace(/\\s+/g, ' ');
}
console.log(cleanInput('  hello   world  '));

// Validate non-empty after trim
function isNotBlank(str) {
  return str.trim().length > 0;
}
console.log(isNotBlank('  '));    // false
console.log(isNotBlank(' hi ')); // true`,
            output: `Hello, World!
Hello, World!
   Hello, World!
Hello
hello world
false
true`,
            tip: 'Always trim() user input before validation or storage. Leading/trailing whitespace is a common source of bugs in form handling.',
            codeHighlightLines: [3, 4, 5, 12] },
        ],
        quiz: [
          {
            question: 'What types of whitespace does trim() remove?',
            options: ['Only spaces', 'Spaces and tabs', 'Spaces, tabs, newlines, and other Unicode whitespace', 'Only leading spaces'],
            correctIndex: 2,
            explanation: 'trim() removes all Unicode whitespace characters from both ends, including spaces, tabs (\\t), newlines (\\n), carriage returns (\\r), and other Unicode space characters.',
          },
          {
            question: 'What does trimStart() do?',
            options: ['Removes whitespace from both ends', 'Removes whitespace from the beginning only', 'Removes whitespace from the end only', 'Removes the first character'],
            correctIndex: 1,
            explanation: 'trimStart() (also aliased as trimLeft()) removes whitespace only from the beginning (left side) of the string.',
          },
          {
            question: 'What does "  ".trim().length return?',
            options: ['2', '0', '1', 'undefined'],
            correctIndex: 1,
            explanation: 'Trimming a string that contains only whitespace results in an empty string "", which has a length of 0.',
          },
        ],
        challenge: {
          prompt: 'Write a function called normalizeInput that takes a string, trims whitespace from both ends, collapses multiple internal spaces into a single space, and returns the result. Use trim() and replace().',
          starterCode: `function normalizeInput(str) {
  // Your code here
}

console.log(normalizeInput('  hello   world  '));
// Expected: "hello world"
console.log(normalizeInput('\\t  foo   bar  baz \\n'));
// Expected: "foo bar baz"
console.log(normalizeInput('  single  '));
// Expected: "single"`,
          solutionCode: `function normalizeInput(str) {
  return str.trim().replace(/\\s+/g, ' ');
}

console.log(normalizeInput('  hello   world  '));
// "hello world"
console.log(normalizeInput('\\t  foo   bar  baz \\n'));
// "foo bar baz"
console.log(normalizeInput('  single  '));
// "single"`,
          hints: [
            'First call trim() to remove leading and trailing whitespace.',
            'Then use replace() with a regex to collapse multiple spaces.',
            'The regex /\\s+/g matches one or more whitespace characters globally.',
          ],
        },
      },
      {
        id: 'str-toUpperCase',
        title: 'String.toUpperCase()',
        difficulty: 'beginner',
        signature: 'str.toUpperCase(): string',
        tags: ['string', 'uppercase', 'case', 'transform'],
        cheatSheetSummary: 'Converts all characters to uppercase. Returns new string.',
        sections: [
          { heading: 'Overview', content: 'toUpperCase() returns a new string with all characters converted to uppercase. It does not modify the original string. For locale-sensitive conversions (like Turkish "i"), use toLocaleUpperCase() instead. This method is commonly used for case-insensitive comparisons and formatting.',
            code: `console.log('hello'.toUpperCase()); // 'HELLO'
console.log('Hello World'.toUpperCase()); // 'HELLO WORLD'
console.log('abc123'.toUpperCase()); // 'ABC123'

// Case-insensitive comparison
const a = 'Hello';
const b = 'hello';
console.log(a.toUpperCase() === b.toUpperCase()); // true

// Capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
console.log(capitalize('hello'));
console.log(capitalize('javaScript'));

// Title case
function titleCase(str) {
  return str.split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}
console.log(titleCase('hello world foo bar'));`,
            output: `HELLO
HELLO WORLD
ABC123
true
Hello
JavaScript
Hello World Foo Bar`,
            tip: 'For case-insensitive comparison, prefer toLowerCase() over toUpperCase() — it is a convention and slightly faster in some engines.',
            codeHighlightLines: [12, 20] },
        ],
        quiz: [
          {
            question: 'Does toUpperCase() modify the original string?',
            options: ['Yes', 'No, it returns a new string', 'Only if assigned back', 'It depends on the engine'],
            correctIndex: 1,
            explanation: 'Strings in JavaScript are immutable. toUpperCase() always returns a new string; the original string is never modified.',
          },
          {
            question: 'What does "abc123".toUpperCase() return?',
            options: ['"ABC123"', '"ABC"', 'An error (numbers cannot be uppercased)', '"abc123" (unchanged)'],
            correctIndex: 0,
            explanation: 'toUpperCase() converts all alphabetic characters to uppercase and leaves non-alphabetic characters (like numbers) unchanged. Result: "ABC123".',
          },
          {
            question: 'When should you use toLocaleUpperCase() instead of toUpperCase()?',
            options: ['Always, it is the modern replacement', 'When dealing with locale-sensitive characters like Turkish "i"', 'When performance matters', 'When the string contains numbers'],
            correctIndex: 1,
            explanation: 'toLocaleUpperCase() handles locale-specific case mappings. For example, in Turkish, "i".toLocaleUpperCase("tr") produces "I" with a dot, which differs from the standard uppercase.',
          },
        ],
        challenge: {
          prompt: 'Write a function called titleCase that takes a sentence and converts it to Title Case (first letter of each word capitalized, rest lowercase). Use toUpperCase(), toLowerCase(), and split()/join().',
          starterCode: `function titleCase(str) {
  // Your code here
}

console.log(titleCase('hello world'));
// Expected: "Hello World"
console.log(titleCase('jAVASCRIPT IS FUN'));
// Expected: "Javascript Is Fun"
console.log(titleCase('a'));
// Expected: "A"`,
          solutionCode: `function titleCase(str) {
  return str.split(' ')
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(' ');
}

console.log(titleCase('hello world'));
// "Hello World"
console.log(titleCase('jAVASCRIPT IS FUN'));
// "Javascript Is Fun"
console.log(titleCase('a'));
// "A"`,
          hints: [
            'Split the string into words using split(" ").',
            'For each word, uppercase the first character and lowercase the rest.',
            'Join the words back with a space.',
          ],
        },
      },
      {
        id: 'str-toLowerCase',
        title: 'String.toLowerCase()',
        difficulty: 'beginner',
        signature: 'str.toLowerCase(): string',
        tags: ['string', 'lowercase', 'case', 'transform'],
        cheatSheetSummary: 'Converts all characters to lowercase. Returns new string.',
        sections: [
          { heading: 'Overview', content: 'toLowerCase() returns a new string with all characters converted to lowercase. It is the counterpart of toUpperCase() and is the standard method for normalizing strings for case-insensitive operations. For locale-sensitive conversions, use toLocaleLowerCase().',
            code: `console.log('HELLO'.toLowerCase());     // 'hello'
console.log('Hello World'.toLowerCase()); // 'hello world'

// Normalize for comparison
function equalsIgnoreCase(a, b) {
  return a.toLowerCase() === b.toLowerCase();
}
console.log(equalsIgnoreCase('Hello', 'hello')); // true

// Search filter
const items = ['JavaScript', 'TypeScript', 'Python'];
const query = 'SCRIPT';
const results = items.filter(item =>
  item.toLowerCase().includes(query.toLowerCase())
);
console.log(results);

// Slug generation
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, '')
    .replace(/\\s+/g, '-');
}
console.log(slugify('Hello World! How Are You?'));`,
            output: `hello
hello world
true
['JavaScript', 'TypeScript']
hello-world-how-are-you`,
            tip: 'Always normalize case before comparing strings. Inconsistent casing is a very common source of bugs in search, auth, and data matching.',
            codeHighlightLines: [6, 14, 21] },
        ],
        quiz: [
          {
            question: 'What is the convention for case-insensitive string comparison?',
            options: ['Use toUpperCase() on both strings', 'Use toLowerCase() on both strings', 'Use localeCompare()', 'Use === directly'],
            correctIndex: 1,
            explanation: 'The convention is to use toLowerCase() for case-insensitive comparisons. While toUpperCase() also works, toLowerCase() is the standard practice.',
          },
          {
            question: 'What does toLowerCase() do with non-alphabetic characters?',
            options: ['Removes them', 'Converts them to spaces', 'Leaves them unchanged', 'Throws an error'],
            correctIndex: 2,
            explanation: 'toLowerCase() only affects alphabetic characters. Numbers, symbols, spaces, and other non-alphabetic characters are left unchanged.',
          },
          {
            question: 'Why is normalizing case important before comparing strings?',
            options: ['It makes the comparison faster', 'It prevents encoding errors', 'Inconsistent casing is a common source of bugs in search and matching', 'It is required by the JavaScript specification'],
            correctIndex: 2,
            explanation: 'Inconsistent casing is a very common source of bugs. Users might type "Hello", "hello", or "HELLO" to mean the same thing, so normalizing case ensures correct matching.',
          },
        ],
        challenge: {
          prompt: 'Write a function called slugify that takes a string and converts it to a URL-friendly slug: lowercase, trimmed, non-alphanumeric characters removed, and spaces replaced with hyphens.',
          starterCode: `function slugify(str) {
  // Your code here
}

console.log(slugify('Hello World!'));
// Expected: "hello-world"
console.log(slugify('  JavaScript Is Awesome!!! '));
// Expected: "javascript-is-awesome"
console.log(slugify('User  Name  123'));
// Expected: "user-name-123"`,
          solutionCode: `function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, '')
    .replace(/\\s+/g, '-');
}

console.log(slugify('Hello World!'));
// "hello-world"
console.log(slugify('  JavaScript Is Awesome!!! '));
// "javascript-is-awesome"
console.log(slugify('User  Name  123'));
// "user-name-123"`,
          hints: [
            'Start by converting to lowercase with toLowerCase().',
            'Use trim() to remove leading/trailing whitespace.',
            'Use replace() with regex to remove non-alphanumeric characters and collapse spaces into hyphens.',
          ],
        },
      },
      {
        id: 'str-replace',
        title: 'String.replace()',
        difficulty: 'beginner',
        signature: 'str.replace(search, replacement): string',
        tags: ['string', 'replace', 'substitute', 'regex', 'pattern'],
        cheatSheetSummary: 'Replaces first match. Use regex with /g for all, or replaceAll().',
        sections: [
          { heading: 'Overview', content: 'replace() returns a new string with the first match of a pattern replaced. The pattern can be a string or regular expression. With a string pattern, only the first occurrence is replaced. For all occurrences, use a regex with the global flag (/g) or replaceAll(). The replacement can be a string or a function for dynamic replacements.',
            code: `const text = 'foo bar foo baz foo';

// Replace first occurrence only
console.log(text.replace('foo', 'qux'));

// Replace ALL with regex /g flag
console.log(text.replace(/foo/g, 'qux'));

// Replace with function
console.log('hello world'.replace(/\\b\\w/g, ch => ch.toUpperCase()));

// Special replacement patterns
console.log('John Smith'.replace(/(\\w+) (\\w+)/, '$2, $1'));

// Remove characters
console.log('Hello! World? 123'.replace(/[^a-zA-Z\\s]/g, ''));

// Practical: template replacement
function template(str, vars) {
  return str.replace(/\\{(\\w+)\\}/g, (_, key) => vars[key] ?? '');
}
console.log(template('Hello, {name}! You are {age}.', { name: 'Alice', age: 30 }));`,
            output: `qux bar foo baz foo
qux bar qux baz qux
Hello World
Smith, John
Hello World
Hello, Alice! You are 30.`,
            tip: 'replace() with a string pattern only replaces the first match. Use replaceAll() or a regex with /g flag to replace all occurrences.',
            analogy: 'Think of it like find-and-replace in a text editor: by default it replaces only the first match, but with the /g flag (or replaceAll) it replaces every occurrence throughout the document.',
            codeHighlightLines: [4, 7, 10, 13, 20] },
        ],
        quiz: [
          {
            question: 'How many occurrences does replace() with a string pattern replace?',
            options: ['All occurrences', 'Only the first occurrence', 'Only the last occurrence', 'It depends on the string length'],
            correctIndex: 1,
            explanation: 'When using a string pattern (not regex), replace() only replaces the first occurrence. Use replaceAll() or a regex with /g flag for all occurrences.',
          },
          {
            question: 'What does the "$2, $1" replacement pattern do in replace()?',
            options: ['Inserts literal "$2, $1"', 'Swaps the first and second capture groups', 'Repeats the match twice', 'Replaces with the second and first characters'],
            correctIndex: 1,
            explanation: '$1 and $2 are backreferences to capture groups in the regex. "$2, $1" swaps the first and second captured groups.',
          },
          {
            question: 'Can the replacement argument of replace() be a function?',
            options: ['No, only strings', 'Yes, and the function receives the match as an argument', 'Only with the /g flag', 'Only in ES2020+'],
            correctIndex: 1,
            explanation: 'The replacement can be a function that receives the match (and capture groups) as arguments and returns the replacement string. This enables dynamic replacements.',
          },
          {
            question: 'How do you replace ALL occurrences with replace()?',
            options: ['Call replace() multiple times', 'Use a regex with the /g (global) flag', 'Pass a third argument as true', 'Use the /all flag'],
            correctIndex: 1,
            explanation: 'To replace all occurrences with replace(), use a regex with the /g (global) flag: str.replace(/pattern/g, replacement). Or use replaceAll().',
          },
        ],
        challenge: {
          prompt: 'Write a function called simpleTemplate that takes a template string with {placeholders} and an object of values, and replaces all placeholders with their corresponding values. Use replace() with a regex and a replacement function.',
          starterCode: `function simpleTemplate(template, values) {
  // Your code here
}

console.log(simpleTemplate('Hello, {name}! You are {age} years old.', { name: 'Alice', age: 30 }));
// Expected: "Hello, Alice! You are 30 years old."
console.log(simpleTemplate('{greeting}, {target}!', { greeting: 'Hi', target: 'World' }));
// Expected: "Hi, World!"`,
          solutionCode: `function simpleTemplate(template, values) {
  return template.replace(/\\{(\\w+)\\}/g, (match, key) => {
    return values[key] !== undefined ? values[key] : match;
  });
}

console.log(simpleTemplate('Hello, {name}! You are {age} years old.', { name: 'Alice', age: 30 }));
// "Hello, Alice! You are 30 years old."
console.log(simpleTemplate('{greeting}, {target}!', { greeting: 'Hi', target: 'World' }));
// "Hi, World!"`,
          hints: [
            'Use a regex like /\\{(\\w+)\\}/g to match placeholders like {name}.',
            'The replacement function receives the full match and capture groups as arguments.',
            'Look up the captured key in the values object and return it, or return the original match if not found.',
          ],
        },
      },
      {
        id: 'str-replaceAll',
        title: 'String.replaceAll()',
        difficulty: 'beginner',
        signature: 'str.replaceAll(search, replacement): string',
        tags: ['string', 'replaceAll', 'substitute', 'global', 'all'],
        cheatSheetSummary: 'Replaces ALL occurrences of a substring. ES2021.',
        sections: [
          { heading: 'Overview', content: 'replaceAll() returns a new string with all occurrences of a search string replaced. Introduced in ES2021, it is a cleaner alternative to using replace() with a global regex flag. It makes the intent of replacing all matches explicit and avoids regex escaping issues with special characters.',
            code: `const text = 'foo bar foo baz foo';

// replaceAll — all occurrences
console.log(text.replaceAll('foo', 'qux'));

// Compare with replace (first only)
console.log(text.replace('foo', 'qux'));

// Works with special regex characters (no escaping needed)
console.log('price: $10 + $20'.replaceAll('$', '€'));
// With replace + regex you'd need: /\\$/g

// replaceAll with function
console.log('aAbBcC'.replaceAll(/[a-z]/g, ch => ch.toUpperCase()));

// Practical: sanitize HTML
function escapeHtml(str) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
console.log(escapeHtml('<div class="x">A & B</div>'));`,
            output: `qux bar qux baz qux
qux bar foo baz foo
price: €10 + €20
AABBCC
&lt;div class=&quot;x&quot;&gt;A &amp; B&lt;/div&gt;`,
            tip: 'replaceAll() with a regex argument requires the /g flag. Without it, a TypeError is thrown (unlike replace which works without /g).',
            codeHighlightLines: [4, 10, 19, 20, 21, 22] },
        ],
        quiz: [
          {
            question: 'When was replaceAll() introduced in JavaScript?',
            options: ['ES2015', 'ES2019', 'ES2021', 'ES2023'],
            correctIndex: 2,
            explanation: 'replaceAll() was introduced in ES2021 as a cleaner alternative to replace() with a global regex for replacing all occurrences.',
          },
          {
            question: 'What advantage does replaceAll() have over replace() with a regex?',
            options: ['It is faster', 'It avoids regex escaping issues with special characters', 'It supports capture groups', 'It can replace across multiple lines'],
            correctIndex: 1,
            explanation: 'replaceAll() with a string pattern avoids the need to escape special regex characters. For example, replaceAll("$", "€") works directly, while replace() would need /\\$/g.',
          },
          {
            question: 'What happens if you pass a regex WITHOUT the /g flag to replaceAll()?',
            options: ['It replaces the first match only', 'It replaces all matches', 'It throws a TypeError', 'It returns undefined'],
            correctIndex: 2,
            explanation: 'replaceAll() with a regex argument requires the /g flag. Without it, a TypeError is thrown. This is different from replace() which works without /g.',
          },
        ],
        challenge: {
          prompt: 'Write a function called escapeHtml that takes a string and replaces all HTML-special characters: & with &amp;, < with &lt;, > with &gt;, and " with &quot;. Use replaceAll().',
          starterCode: `function escapeHtml(str) {
  // Your code here
}

console.log(escapeHtml('<div class="x">A & B</div>'));
// Expected: "&lt;div class=&quot;x&quot;&gt;A &amp; B&lt;/div&gt;"
console.log(escapeHtml('No special chars'));
// Expected: "No special chars"`,
          solutionCode: `function escapeHtml(str) {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

console.log(escapeHtml('<div class="x">A & B</div>'));
// "&lt;div class=&quot;x&quot;&gt;A &amp; B&lt;/div&gt;"
console.log(escapeHtml('No special chars'));
// "No special chars"`,
          hints: [
            'Replace & first to avoid double-escaping the & in other replacements.',
            'Chain replaceAll() calls for each special character.',
            'The order matters: always replace & before < and > so &lt; does not become &amp;lt;.',
          ],
        },
      },
      {
        id: 'str-startsWith',
        title: 'String.startsWith()',
        difficulty: 'beginner',
        signature: 'str.startsWith(search, position?): boolean',
        tags: ['string', 'startsWith', 'prefix', 'check', 'begins'],
        cheatSheetSummary: 'Returns true if string starts with the given substring. Case-sensitive.',
        sections: [
          { heading: 'Overview', content: 'startsWith() determines whether a string begins with the specified characters. It is case-sensitive and accepts an optional position to start checking from. This method is cleaner and more efficient than using indexOf() === 0 or a regular expression for prefix checks.',
            code: `const url = 'https://www.example.com';
console.log(url.startsWith('https')); // true
console.log(url.startsWith('http'));  // true
console.log(url.startsWith('ftp'));   // false

// Case-sensitive
console.log('Hello'.startsWith('hello')); // false

// Start from position
console.log('Hello World'.startsWith('World', 6)); // true

// Practical: route matching
function matchRoute(path) {
  if (path.startsWith('/api/')) return 'API';
  if (path.startsWith('/admin/')) return 'Admin';
  return 'Public';
}
console.log(matchRoute('/api/users'));
console.log(matchRoute('/admin/dashboard'));
console.log(matchRoute('/home'));`,
            output: `true
true
false
false
true
API
Admin
Public`,
            tip: 'startsWith() is more readable and performant than regex for simple prefix checks. Use regex only when you need pattern matching.',
            analogy: 'Think of it like checking the area code of a phone number: startsWith() looks at just the beginning of the string without scanning the rest.' },
        ],
        quiz: [
          {
            question: 'Is startsWith() case-sensitive?',
            options: ['No, it is case-insensitive', 'Yes, it is case-sensitive', 'It depends on the locale', 'Only when checking ASCII characters'],
            correctIndex: 1,
            explanation: 'startsWith() is case-sensitive. "Hello".startsWith("hello") returns false. Convert to the same case first for case-insensitive checks.',
          },
          {
            question: 'What does the optional second parameter of startsWith() do?',
            options: ['Sets the end position', 'Sets the position to start checking from', 'Makes it case-insensitive', 'Sets the maximum length to check'],
            correctIndex: 1,
            explanation: 'The second parameter specifies the position to start checking from. "Hello World".startsWith("World", 6) returns true because "World" begins at index 6.',
          },
          {
            question: 'Which is more performant for checking string prefixes: startsWith() or regex?',
            options: ['Regex is always faster', 'startsWith() is more performant for simple prefix checks', 'They are identical in performance', 'It depends on the string length'],
            correctIndex: 1,
            explanation: 'startsWith() is more performant than regex for simple prefix checks because it does not need to compile and execute a regular expression.',
          },
        ],
        challenge: {
          prompt: 'Write a function called categorizeUrl that takes a URL string and returns its category: "secure" if it starts with "https://", "insecure" if it starts with "http://", "file" if it starts with "file://", or "unknown" otherwise. Use startsWith().',
          starterCode: `function categorizeUrl(url) {
  // Your code here
}

console.log(categorizeUrl('https://example.com'));
// Expected: "secure"
console.log(categorizeUrl('http://example.com'));
// Expected: "insecure"
console.log(categorizeUrl('file:///home/user'));
// Expected: "file"
console.log(categorizeUrl('ftp://server'));
// Expected: "unknown"`,
          solutionCode: `function categorizeUrl(url) {
  if (url.startsWith('https://')) return 'secure';
  if (url.startsWith('http://')) return 'insecure';
  if (url.startsWith('file://')) return 'file';
  return 'unknown';
}

console.log(categorizeUrl('https://example.com'));
// "secure"
console.log(categorizeUrl('http://example.com'));
// "insecure"
console.log(categorizeUrl('file:///home/user'));
// "file"
console.log(categorizeUrl('ftp://server'));
// "unknown"`,
          hints: [
            'Use startsWith() to check each protocol prefix.',
            'Check "https://" before "http://" since "https" also starts with "http".',
            'Return "unknown" as the default if no prefix matches.',
          ],
        },
      },
      {
        id: 'str-endsWith',
        title: 'String.endsWith()',
        difficulty: 'beginner',
        signature: 'str.endsWith(search, length?): boolean',
        tags: ['string', 'endsWith', 'suffix', 'check', 'extension'],
        cheatSheetSummary: 'Returns true if string ends with the given substring.',
        sections: [
          { heading: 'Overview', content: 'endsWith() determines whether a string ends with the specified characters. The optional second parameter specifies the length of the string to search (as if the string were that length). This is commonly used for file extension checks, URL validation, and suffix matching.',
            code: `const filename = 'document.pdf';
console.log(filename.endsWith('.pdf'));  // true
console.log(filename.endsWith('.doc'));  // false

// Check file type
function getFileType(name) {
  if (name.endsWith('.jpg') || name.endsWith('.png')) return 'image';
  if (name.endsWith('.pdf')) return 'document';
  if (name.endsWith('.mp4')) return 'video';
  return 'unknown';
}
console.log(getFileType('photo.jpg'));
console.log(getFileType('report.pdf'));

// With length parameter (search within first N chars)
console.log('Hello World'.endsWith('Hello', 5)); // true

// Case-insensitive check
const file = 'Image.PNG';
console.log(file.toLowerCase().endsWith('.png')); // true`,
            output: `true
false
image
document
true
true`,
            tip: 'When checking file extensions, consider case-insensitivity: filename.toLowerCase().endsWith(\'.pdf\') handles both .pdf and .PDF.',
            codeHighlightLines: [2, 7, 8, 9, 16] },
        ],
        quiz: [
          {
            question: 'What does the optional second parameter of endsWith() specify?',
            options: ['The position to start checking from', 'The length of the string to consider (as if the string were that length)', 'The number of characters to check', 'The position to end checking at'],
            correctIndex: 1,
            explanation: 'The second parameter specifies the length of the string to search, as if the string were only that long. "Hello World".endsWith("Hello", 5) returns true.',
          },
          {
            question: 'What is a common use case for endsWith()?',
            options: ['Sorting strings', 'Checking file extensions', 'Counting characters', 'Replacing substrings'],
            correctIndex: 1,
            explanation: 'endsWith() is commonly used for checking file extensions (e.g., filename.endsWith(".pdf")), URL suffixes, and other suffix-based validations.',
          },
          {
            question: 'How would you do a case-insensitive endsWith() check?',
            options: ['Use endsWith() with a flag', 'Convert the string to lowercase first', 'Use a regex instead', 'Pass "i" as the third argument'],
            correctIndex: 1,
            explanation: 'endsWith() does not have a case-insensitive option. Convert both the string and the search value to the same case first: str.toLowerCase().endsWith(suffix.toLowerCase()).',
          },
        ],
        challenge: {
          prompt: 'Write a function called getFileType that takes a filename and returns its type: "image" for .jpg/.png/.gif, "document" for .pdf/.doc/.txt, "code" for .js/.ts/.py, or "unknown". Use endsWith() and handle case-insensitivity.',
          starterCode: `function getFileType(filename) {
  // Your code here
}

console.log(getFileType('photo.JPG'));
// Expected: "image"
console.log(getFileType('report.pdf'));
// Expected: "document"
console.log(getFileType('app.ts'));
// Expected: "code"
console.log(getFileType('data.csv'));
// Expected: "unknown"`,
          solutionCode: `function getFileType(filename) {
  const name = filename.toLowerCase();
  const imageExts = ['.jpg', '.png', '.gif'];
  const docExts = ['.pdf', '.doc', '.txt'];
  const codeExts = ['.js', '.ts', '.py'];

  if (imageExts.some(ext => name.endsWith(ext))) return 'image';
  if (docExts.some(ext => name.endsWith(ext))) return 'document';
  if (codeExts.some(ext => name.endsWith(ext))) return 'code';
  return 'unknown';
}

console.log(getFileType('photo.JPG'));
// "image"
console.log(getFileType('report.pdf'));
// "document"
console.log(getFileType('app.ts'));
// "code"
console.log(getFileType('data.csv'));
// "unknown"`,
          hints: [
            'Convert the filename to lowercase first for case-insensitive matching.',
            'Create arrays of extensions for each file type.',
            'Use Array.some() with endsWith() to check if the filename matches any extension in a group.',
          ],
        },
      },
      {
        id: 'str-padStart',
        title: 'String.padStart()',
        difficulty: 'beginner',
        signature: 'str.padStart(targetLength, padString?): string',
        tags: ['string', 'padStart', 'padding', 'align', 'format'],
        cheatSheetSummary: 'Pads the beginning of a string to reach target length.',
        sections: [
          { heading: 'Overview', content: 'padStart() pads the beginning of a string with a specified character (or space by default) until it reaches the target length. If the string is already equal to or longer than the target, it is returned unchanged. This is commonly used for formatting numbers with leading zeros, aligning text, and creating fixed-width output.',
            code: `// Leading zeros
console.log('5'.padStart(3, '0'));    // '005'
console.log('42'.padStart(3, '0'));   // '042'
console.log('123'.padStart(3, '0')); // '123' (already 3 chars)

// Right-align numbers
const prices = [1.5, 10.99, 100, 0.5];
prices.forEach(p => {
  console.log(p.toFixed(2).padStart(8));
});

// Format time
function formatTime(h, m, s) {
  return [h, m, s]
    .map(n => String(n).padStart(2, '0'))
    .join(':');
}
console.log(formatTime(9, 5, 3)); // '09:05:03'

// Mask credit card
function maskCard(num) {
  const last4 = num.slice(-4);
  return last4.padStart(num.length, '*');
}
console.log(maskCard('4111222233334444'));`,
            output: `005
042
123
    1.50
   10.99
  100.00
    0.50
09:05:03
************4444`,
            tip: 'padStart() is ideal for formatting timestamps, serial numbers, and any numeric output that needs consistent width.',
            analogy: 'Think of it like writing a check amount in a fixed-width box: you fill the empty spaces on the left with zeros or asterisks to prevent tampering and ensure uniform width.',
            codeHighlightLines: [2, 9, 15, 23] },
        ],
        quiz: [
          {
            question: 'What is the default pad character if none is specified?',
            options: ['"0"', '"-"', 'A space (" ")', '"."'],
            correctIndex: 2,
            explanation: 'If no padString is specified, padStart() uses a space (" ") as the default padding character.',
          },
          {
            question: 'What happens if the string is already longer than the target length?',
            options: ['It is truncated', 'It throws an error', 'It is returned unchanged', 'It wraps to the next line'],
            correctIndex: 2,
            explanation: 'If the string is already equal to or longer than the target length, padStart() returns the string unchanged without any truncation.',
          },
          {
            question: 'What does "5".padStart(3, "0") return?',
            options: ['"500"', '"050"', '"005"', '"5  "'],
            correctIndex: 2,
            explanation: 'padStart() pads the beginning of the string. "5" has length 1 and needs to reach length 3, so two "0"s are added to the front: "005".',
          },
          {
            question: 'Which is a common practical use of padStart()?',
            options: ['Sorting strings', 'Adding leading zeros to numbers', 'Removing whitespace', 'Converting to uppercase'],
            correctIndex: 1,
            explanation: 'padStart() is commonly used for formatting numbers with leading zeros (e.g., "5".padStart(2, "0") gives "05" for time formatting).',
          },
        ],
        challenge: {
          prompt: 'Write a function called formatTime that takes hours, minutes, and seconds as numbers and returns a formatted time string "HH:MM:SS" with leading zeros. Use padStart().',
          starterCode: `function formatTime(h, m, s) {
  // Your code here
}

console.log(formatTime(9, 5, 3));
// Expected: "09:05:03"
console.log(formatTime(14, 30, 0));
// Expected: "14:30:00"
console.log(formatTime(0, 0, 0));
// Expected: "00:00:00"`,
          solutionCode: `function formatTime(h, m, s) {
  return [h, m, s]
    .map(n => String(n).padStart(2, '0'))
    .join(':');
}

console.log(formatTime(9, 5, 3));
// "09:05:03"
console.log(formatTime(14, 30, 0));
// "14:30:00"
console.log(formatTime(0, 0, 0));
// "00:00:00"`,
          hints: [
            'Convert each number to a string with String(n).',
            'Use padStart(2, "0") to ensure each part is at least 2 characters.',
            'Join the parts with ":" using Array.join().',
          ],
        },
      },
      {
        id: 'str-padEnd',
        title: 'String.padEnd()',
        difficulty: 'beginner',
        signature: 'str.padEnd(targetLength, padString?): string',
        tags: ['string', 'padEnd', 'padding', 'align', 'format'],
        cheatSheetSummary: 'Pads the end of a string to reach target length.',
        sections: [
          { heading: 'Overview', content: 'padEnd() pads the end of a string with a specified character until it reaches the target length. It is the counterpart of padStart(). This is useful for left-aligning text in fixed-width columns, creating tables, and formatting output.',
            code: `// Basic padding
console.log('hi'.padEnd(10, '.'));    // 'hi........'
console.log('hello'.padEnd(10));     // 'hello     '
console.log('toolong'.padEnd(5));    // 'toolong' (unchanged)

// Aligned table output
const items = [
  { name: 'Apples', price: 1.50 },
  { name: 'Bananas', price: 0.75 },
  { name: 'Cherries', price: 3.20 },
];
console.log('Item'.padEnd(12) + 'Price');
console.log('-'.repeat(18));
items.forEach(item => {
  const name = item.name.padEnd(12);
  const price = ('$' + item.price.toFixed(2)).padStart(6);
  console.log(name + price);
});`,
            output: `hi........
hello
toolong
Item        Price
------------------
Apples      $ 1.50
Bananas     $ 0.75
Cherries    $ 3.20`,
            tip: 'Combine padEnd() for left-aligning labels with padStart() for right-aligning values to create neatly formatted console output.',
            codeHighlightLines: [2, 12, 15, 16] },
        ],
        quiz: [
          {
            question: 'What does padEnd() do?',
            options: ['Pads the beginning of a string', 'Pads the end of a string', 'Pads both ends of a string', 'Trims the end of a string'],
            correctIndex: 1,
            explanation: 'padEnd() pads the end (right side) of a string with a specified character until it reaches the target length. It is the counterpart of padStart().',
          },
          {
            question: 'What does "hi".padEnd(10, ".") return?',
            options: ['"........hi"', '"hi........"', '"..hi........."', '"hi"'],
            correctIndex: 1,
            explanation: '"hi" has length 2. padEnd(10, ".") appends dots to the end until the total length is 10: "hi........".',
          },
          {
            question: 'How can you combine padEnd() and padStart() effectively?',
            options: ['They cannot be combined', 'Use padEnd() for left-aligning labels and padStart() for right-aligning values', 'Use them to center text', 'Use padEnd() first, then padStart()'],
            correctIndex: 1,
            explanation: 'padEnd() left-aligns text (padding on the right) and padStart() right-aligns text (padding on the left). Combining them creates neatly formatted console tables.',
          },
        ],
        challenge: {
          prompt: 'Write a function called printTable that takes an array of objects with "label" and "value" properties and prints them as a formatted table. Use padEnd() for labels and padStart() for values.',
          starterCode: `function printTable(rows) {
  // Your code here
}

printTable([
  { label: 'Name', value: 'Alice' },
  { label: 'Age', value: '30' },
  { label: 'Location', value: 'NYC' },
]);
// Expected output (approximately):
// Name       |   Alice
// Age        |      30
// Location   |     NYC`,
          solutionCode: `function printTable(rows) {
  const labelWidth = Math.max(...rows.map(r => r.label.length)) + 2;
  const valueWidth = 8;
  rows.forEach(row => {
    const label = row.label.padEnd(labelWidth);
    const value = row.value.padStart(valueWidth);
    console.log(label + '| ' + value);
  });
}

printTable([
  { label: 'Name', value: 'Alice' },
  { label: 'Age', value: '30' },
  { label: 'Location', value: 'NYC' },
]);`,
          hints: [
            'Calculate the max label length to determine how wide the label column should be.',
            'Use padEnd() on labels to left-align them in a fixed-width column.',
            'Use padStart() on values to right-align them.',
          ],
        },
      },
      {
        id: 'str-repeat',
        title: 'String.repeat()',
        difficulty: 'beginner',
        signature: 'str.repeat(count): string',
        tags: ['string', 'repeat', 'duplicate', 'multiply', 'generate'],
        cheatSheetSummary: 'Returns string repeated count times. Zero returns empty string.',
        sections: [
          { heading: 'Overview', content: 'repeat() constructs a new string by repeating the original string a specified number of times. A count of 0 returns an empty string. Negative counts or Infinity throw a RangeError. This method is useful for creating separators, visual patterns, and indentation.',
            code: `console.log('ha'.repeat(3));     // 'hahaha'
console.log('abc'.repeat(2));    // 'abcabc'
console.log('-'.repeat(30));     // '------------------------------'
console.log('hello'.repeat(0));  // ''

// Create indentation
function indent(level) {
  return '  '.repeat(level);
}
console.log(indent(0) + 'root');
console.log(indent(1) + 'child');
console.log(indent(2) + 'grandchild');

// Create a simple progress bar
function progressBar(percent, width = 20) {
  const filled = Math.round(width * percent / 100);
  const empty = width - filled;
  return '[' + '\u2588'.repeat(filled) + '\u2591'.repeat(empty) + '] ' + percent + '%';
}
console.log(progressBar(75));
console.log(progressBar(30));`,
            output: `hahaha
abcabc
------------------------------

root
  child
    grandchild
[███████████████░░░░░] 75%
[██████░░░░░░░░░░░░░░] 30%`,
            tip: 'repeat() is much cleaner than a loop for generating repeated patterns. Combine with padStart/padEnd for formatted output.',
            codeHighlightLines: [8, 16, 17, 18] },
        ],
        quiz: [
          {
            question: 'What does "ha".repeat(0) return?',
            options: ['"ha"', '""', 'undefined', 'null'],
            correctIndex: 1,
            explanation: 'repeat(0) returns an empty string. A count of 0 means the string is not repeated at all.',
          },
          {
            question: 'What happens if you pass a negative number to repeat()?',
            options: ['It returns an empty string', 'It reverses the string', 'It throws a RangeError', 'It returns undefined'],
            correctIndex: 2,
            explanation: 'Passing a negative number or Infinity to repeat() throws a RangeError. The count must be a non-negative finite integer.',
          },
          {
            question: 'What does "-".repeat(5) return?',
            options: ['"-----"', '"-5"', '"5-"', '"-    "'],
            correctIndex: 0,
            explanation: '"-".repeat(5) repeats the hyphen character 5 times, producing "-----".',
          },
        ],
        challenge: {
          prompt: 'Write a function called createProgressBar that takes a percentage (0-100) and a total width, and returns a string like "[████░░░░░░] 45%". Use repeat() with block characters.',
          starterCode: `function createProgressBar(percent, width) {
  // Use '\\u2588' for filled and '\\u2591' for empty
  // Your code here
}

console.log(createProgressBar(75, 20));
// Expected: "[███████████████░░░░░] 75%"
console.log(createProgressBar(0, 10));
// Expected: "[░░░░░░░░░░] 0%"
console.log(createProgressBar(100, 10));
// Expected: "[██████████] 100%"`,
          solutionCode: `function createProgressBar(percent, width) {
  const filled = Math.round(width * percent / 100);
  const empty = width - filled;
  return '[' + '\\u2588'.repeat(filled) + '\\u2591'.repeat(empty) + '] ' + percent + '%';
}

console.log(createProgressBar(75, 20));
// "[███████████████░░░░░] 75%"
console.log(createProgressBar(0, 10));
// "[░░░░░░░░░░] 0%"
console.log(createProgressBar(100, 10));
// "[██████████] 100%"`,
          hints: [
            'Calculate the number of filled blocks: Math.round(width * percent / 100).',
            'The number of empty blocks is width minus filled blocks.',
            'Use repeat() with Unicode block characters to build the bar.',
          ],
        },
      },
      {
        id: 'str-match',
        title: 'String.match()',
        difficulty: 'intermediate',
        signature: 'str.match(regexp): string[] | null',
        tags: ['string', 'match', 'regex', 'pattern', 'extract'],
        cheatSheetSummary: 'Returns array of regex matches, or null if no match.',
        sections: [
          { heading: 'Overview', content: 'match() retrieves the matches when matching a string against a regular expression. Without the global flag (/g), it returns the first match with capturing groups. With /g, it returns all matches but without group details. For all matches with group details, use matchAll(). Returns null if no match is found.',
            code: `const text = 'The price is $42.50 and $18.99';

// Without /g — first match with groups
const single = text.match(/\\$(\\d+\\.\\d{2})/);
console.log(single[0]); // '$42.50' (full match)
console.log(single[1]); // '42.50' (capture group)

// With /g — all matches (no groups)
const all = text.match(/\\$\\d+\\.\\d{2}/g);
console.log(all); // ['$42.50', '$18.99']

// matchAll — all matches WITH groups (ES2020)
const matches = [...text.matchAll(/\\$(\\d+\\.\\d{2})/g)];
for (const m of matches) {
  console.log(\`Full: \${m[0]}, Amount: \${m[1]}\`);
}

// No match returns null
console.log('hello'.match(/\\d+/)); // null

// Practical: extract emails
const msg = 'Contact alice@test.com or bob@test.com';
const emails = msg.match(/[\\w.]+@[\\w.]+/g);
console.log(emails);`,
            output: `$42.50
42.50
['$42.50', '$18.99']
Full: $42.50, Amount: 42.50
Full: $18.99, Amount: 18.99
null
['alice@test.com', 'bob@test.com']`,
            tip: 'Use matchAll() with /g when you need both all matches and capture groups. It returns an iterator of match arrays.',
            analogy: 'Think of it like using a metal detector on a beach: without /g it stops at the first find and gives you full details. With /g it sweeps the whole beach and gives you a list of everything it found.',
            diagram: {
              kind: 'mermaid',
              code: `graph TB
  A["match() without /g"] --> B["First match + capture groups"]
  C["match() with /g"] --> D["All matches, no groups"]
  E["matchAll() with /g"] --> F["All matches + capture groups"]
  style B fill:#51cf66,color:#fff
  style D fill:#4a9eff,color:#fff
  style F fill:#ffa94d,color:#fff`,
              caption: 'Three modes of regex matching in JavaScript strings',
            },
            codeHighlightLines: [4, 5, 6, 9, 13] },
        ],
        quiz: [
          {
            question: 'What does match() return when there is no match?',
            options: ['An empty array', 'An empty string', 'undefined', 'null'],
            correctIndex: 3,
            explanation: 'match() returns null when there is no match. Always check for null before accessing the result to avoid TypeError.',
          },
          {
            question: 'What is the difference between match() with and without the /g flag?',
            options: ['No difference', 'Without /g it returns the first match with capture groups; with /g it returns all matches without groups', 'Without /g it searches only the beginning', 'With /g it returns null for multiple matches'],
            correctIndex: 1,
            explanation: 'Without /g, match() returns the first match along with capture groups, index, and input. With /g, it returns an array of all matches but without capture group details.',
          },
          {
            question: 'Which method should you use to get all matches WITH capture group details?',
            options: ['match() with /g', 'matchAll() with /g', 'search()', 'replace() with a function'],
            correctIndex: 1,
            explanation: 'matchAll() (ES2020) returns an iterator of all matches, each including capture groups, index, and input. It requires the /g flag.',
          },
          {
            question: 'What does the [1] element of a non-global match() result represent?',
            options: ['The second match', 'The first capture group', 'The index of the match', 'The input string'],
            correctIndex: 1,
            explanation: 'In a non-global match result, [0] is the full match and [1], [2], etc. are the capture groups from parentheses in the regex.',
          },
        ],
        challenge: {
          prompt: 'Write a function called extractPrices that takes a text string and returns an array of all dollar amounts found (as numbers). Use match() with a regex to find patterns like $42.50, $18, etc.',
          starterCode: `function extractPrices(text) {
  // Your code here
}

console.log(extractPrices('Items cost $42.50 and $18.99 plus $5 shipping'));
// Expected: [42.50, 18.99, 5]
console.log(extractPrices('No prices here'));
// Expected: []`,
          solutionCode: `function extractPrices(text) {
  const matches = text.match(/\\$\\d+(\\.\\d{1,2})?/g);
  if (!matches) return [];
  return matches.map(m => parseFloat(m.slice(1)));
}

console.log(extractPrices('Items cost $42.50 and $18.99 plus $5 shipping'));
// [42.50, 18.99, 5]
console.log(extractPrices('No prices here'));
// []`,
          hints: [
            'Use a regex like /\\$\\d+(\\.\\d{1,2})?/g to match dollar amounts.',
            'match() returns null if no matches, so handle that case.',
            'Remove the "$" sign with slice(1) and convert to number with parseFloat().',
          ],
        },
      },
      {
        id: 'str-search',
        title: 'String.search()',
        difficulty: 'intermediate',
        signature: 'str.search(regexp): number',
        tags: ['string', 'search', 'regex', 'find', 'index'],
        cheatSheetSummary: 'Returns index of first regex match, or -1. Like indexOf for regex.',
        sections: [
          { heading: 'Overview', content: 'search() executes a search for a match between a regular expression and the string, returning the index of the first match. It returns -1 if no match is found. It is similar to indexOf() but works with regex patterns. Unlike match(), search() only returns the index, not the matched content.',
            code: `const text = 'Hello World 123';

// Search with regex
console.log(text.search(/\\d+/));     // 12 (first digit)
console.log(text.search(/World/));   // 6
console.log(text.search(/xyz/));     // -1 (not found)

// Case-insensitive search
console.log(text.search(/hello/i));  // 0

// Practical: find first non-alphanumeric
const str = 'Hello, World!';
const pos = str.search(/[^a-zA-Z0-9\\s]/);
console.log(\`First special char at index \${pos}: '\${str[pos]}'\`);

// Validate if string contains a pattern
function containsNumber(str) {
  return str.search(/\\d/) !== -1;
}
console.log(containsNumber('hello123'));  // true
console.log(containsNumber('hello'));     // false

// search() ignores the g flag
console.log('abc'.search(/b/g)); // 1 (g flag has no effect)`,
            output: `12
6
-1
0
First special char at index 5: ','
true
false
1`,
            tip: 'search() is like indexOf() for regex patterns. Use indexOf() for plain string searches (faster) and search() only when you need regex pattern matching.',
            codeHighlightLines: [4, 5, 9, 13] },
        ],
        quiz: [
          {
            question: 'What does search() return when no match is found?',
            options: ['null', 'false', '0', '-1'],
            correctIndex: 3,
            explanation: 'search() returns -1 when no match is found, similar to indexOf(). It returns the index of the first match otherwise.',
          },
          {
            question: 'How is search() different from indexOf()?',
            options: ['search() is faster', 'search() accepts a regex while indexOf() accepts a string', 'indexOf() returns a boolean', 'search() returns the matched text'],
            correctIndex: 1,
            explanation: 'search() works with regular expressions, allowing pattern matching. indexOf() only works with plain string searches and is faster for simple lookups.',
          },
          {
            question: 'Does the /g (global) flag affect search()?',
            options: ['Yes, it finds all matches', 'Yes, it searches from the end', 'No, the /g flag has no effect on search()', 'It throws an error'],
            correctIndex: 2,
            explanation: 'The /g flag has no effect on search(). It always returns the index of the first match regardless of the global flag.',
          },
        ],
        challenge: {
          prompt: 'Write a function called findFirstDigitPosition that takes a string and returns the index of the first digit character, or -1 if there are no digits. Use search() with a regex.',
          starterCode: `function findFirstDigitPosition(str) {
  // Your code here
}

console.log(findFirstDigitPosition('Hello World 123'));
// Expected: 12
console.log(findFirstDigitPosition('abc5def'));
// Expected: 3
console.log(findFirstDigitPosition('no digits here'));
// Expected: -1`,
          solutionCode: `function findFirstDigitPosition(str) {
  return str.search(/\\d/);
}

console.log(findFirstDigitPosition('Hello World 123'));
// 12
console.log(findFirstDigitPosition('abc5def'));
// 3
console.log(findFirstDigitPosition('no digits here'));
// -1`,
          hints: [
            'Use the regex /\\d/ to match a single digit character.',
            'search() returns the index of the first match, which is exactly what we need.',
            'If no digit is found, search() automatically returns -1.',
          ],
        },
      },
    ],
  },
];

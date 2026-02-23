import type { DocCategory } from './types';

// Part 4: Array Methods (25 entries)
export const JS_PART4_CATEGORIES: DocCategory[] = [
  {
    id: 'js-array-methods',
    label: 'Array Methods',
    icon: 'List',
    entries: [
      {
        id: 'arr-push',
        title: 'Array.push()',
        difficulty: 'beginner',
        signature: 'arr.push(...items): number',
        tags: ['array', 'push', 'add', 'append', 'mutate'],
        cheatSheetSummary: 'Adds elements to the end. Returns new length. Mutates.',
        sections: [
          { heading: 'Overview', content: 'push() adds one or more elements to the end of an array and returns the new length. It mutates the original array in place. This is an O(1) amortized operation, making it efficient for building arrays incrementally.',
            code: `const fruits = ['apple', 'banana'];
const newLen = fruits.push('cherry');
console.log(fruits);
console.log('New length:', newLen);

// Push multiple items
fruits.push('date', 'elderberry');
console.log(fruits);`,
            output: `['apple', 'banana', 'cherry']
New length: 3
['apple', 'banana', 'cherry', 'date', 'elderberry']`,
            tip: 'push() returns the new length, not the array. For immutable alternatives, use spread: [...arr, newItem].',
            analogy: 'Think of it like adding books to the right end of a bookshelf: push() places new books at the end without moving the existing ones.',
            diagram: {
              kind: 'custom',
              type: 'array',
              data: { values: ['apple', 'banana', 'cherry'], highlightIndices: [2] },
              caption: 'push() appends "cherry" at index 2',
            },
            codeHighlightLines: [2, 7] },
          { heading: 'Practical Usage', content: 'push() is commonly used for accumulating results in loops, building arrays from streamed data, and implementing stacks (LIFO). Combined with pop(), it forms a stack data structure.',
            code: `// Building an array in a loop
const squares = [];
for (let i = 1; i <= 5; i++) {
  squares.push(i * i);
}
console.log(squares);

// Stack pattern (LIFO)
const stack = [];
stack.push('a');
stack.push('b');
stack.push('c');
console.log(stack.pop()); // 'c'
console.log(stack);`,
            output: `[1, 4, 9, 16, 25]
c
['a', 'b']`,
            diagram: {
              kind: 'custom',
              type: 'stack',
              data: { values: ['a', 'b', 'c'], highlightIndices: [2], operation: 'push/pop' },
              caption: 'Stack: push adds to top, pop removes from top (LIFO)',
            } },
        ],
        quiz: [
          {
            question: 'What does Array.push() return?',
            options: ['The modified array', 'The new length of the array', 'The pushed element', 'undefined'],
            correctIndex: 1,
            explanation: 'push() returns the new length of the array after adding elements, not the array itself.',
          },
          {
            question: 'Which statement about push() is true?',
            options: ['It is O(n) because it shifts elements', 'It creates a new array', 'It mutates the original array in place', 'It can only add one element at a time'],
            correctIndex: 2,
            explanation: 'push() mutates the original array by appending elements to the end. It is O(1) amortized and can accept multiple arguments.',
          },
          {
            question: 'What is the immutable alternative to push()?',
            options: ['arr.concat(item)', 'arr.append(item)', '[...arr, item]', 'Both arr.concat(item) and [...arr, item]'],
            correctIndex: 3,
            explanation: 'Both concat() and the spread operator create a new array with the added element, leaving the original unchanged.',
          },
        ],
        challenge: {
          prompt: 'Write a function `buildStack` that takes an array of operations (strings like "push:X" or "pop") and simulates a stack using push() and pop(). Return the final stack state.',
          starterCode: `function buildStack(operations) {
  const stack = [];
  // Process each operation
  // "push:X" -> push X onto stack
  // "pop" -> pop from stack
  return stack;
}

console.log(buildStack(['push:a', 'push:b', 'push:c', 'pop', 'push:d']));
// Expected: ['a', 'b', 'd']`,
          solutionCode: `function buildStack(operations) {
  const stack = [];
  for (const op of operations) {
    if (op.startsWith('push:')) {
      stack.push(op.slice(5));
    } else if (op === 'pop') {
      stack.pop();
    }
  }
  return stack;
}

console.log(buildStack(['push:a', 'push:b', 'push:c', 'pop', 'push:d']));
// ['a', 'b', 'd']`,
          hints: [
            'Use string methods like startsWith() and slice() to parse each operation.',
            'Loop through the operations array and call push() or pop() based on the operation type.',
          ],
        },
      },
      {
        id: 'arr-pop',
        title: 'Array.pop()',
        difficulty: 'beginner',
        signature: 'arr.pop(): T | undefined',
        tags: ['array', 'pop', 'remove', 'last', 'mutate'],
        cheatSheetSummary: 'Removes and returns the last element. Mutates. O(1).',
        sections: [
          { heading: 'Overview', content: 'pop() removes the last element from an array and returns it. If the array is empty, it returns undefined. This is an O(1) operation since no re-indexing is needed. It mutates the original array.',
            code: `const colors = ['red', 'green', 'blue'];
const last = colors.pop();
console.log('Removed:', last);
console.log('Remaining:', colors);

// Pop from empty array
const empty = [];
console.log(empty.pop()); // undefined`,
            output: `Removed: blue
Remaining: ['red', 'green']
undefined`,
            tip: 'pop() and push() together implement a stack (Last In, First Out). Both are O(1) operations.',
            analogy: 'Think of it like taking the top plate off a stack of plates: you always remove the most recently added item, and no other plates need to move.',
            codeHighlightLines: [2, 3] },
        ],
        quiz: [
          {
            question: 'What does pop() return when called on an empty array?',
            options: ['null', 'An error is thrown', 'undefined', 'An empty array'],
            correctIndex: 2,
            explanation: 'When called on an empty array, pop() returns undefined without throwing an error.',
          },
          {
            question: 'What is the time complexity of Array.pop()?',
            options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
            correctIndex: 2,
            explanation: 'pop() is O(1) because it only removes the last element without needing to re-index any other elements.',
          },
          {
            question: 'Which data structure do push() and pop() together implement?',
            options: ['Queue (FIFO)', 'Stack (LIFO)', 'Linked List', 'Priority Queue'],
            correctIndex: 1,
            explanation: 'push() and pop() together implement a Stack (Last In, First Out) data structure, where the most recently added element is removed first.',
          },
        ],
        challenge: {
          prompt: 'Write a function `popUntil` that removes elements from the end of an array using pop() until it finds a target value (which should also be removed). Return an array of all removed elements in the order they were popped.',
          starterCode: `function popUntil(arr, target) {
  const removed = [];
  // Pop elements until you find target or array is empty
  return removed;
}

const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
console.log(popUntil(colors, 'blue'));
// Expected: ['purple', 'yellow', 'blue']
console.log(colors);
// Expected: ['red', 'green']`,
          solutionCode: `function popUntil(arr, target) {
  const removed = [];
  while (arr.length > 0) {
    const item = arr.pop();
    removed.push(item);
    if (item === target) break;
  }
  return removed;
}

const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
console.log(popUntil(colors, 'blue'));
// ['purple', 'yellow', 'blue']
console.log(colors);
// ['red', 'green']`,
          hints: [
            'Use a while loop that continues as long as the array has elements.',
            'Pop each element, push it to the removed array, and check if it matches the target to break.',
          ],
        },
      },
      {
        id: 'arr-shift',
        title: 'Array.shift()',
        difficulty: 'beginner',
        signature: 'arr.shift(): T | undefined',
        tags: ['array', 'shift', 'remove', 'first', 'mutate'],
        cheatSheetSummary: 'Removes and returns the first element. Mutates. O(n).',
        sections: [
          { heading: 'Overview', content: 'shift() removes the first element from an array and returns it, shifting all remaining elements down by one index. This is an O(n) operation because every element must be re-indexed. For queue operations on large arrays, consider using a linked list or deque implementation instead.',
            code: `const queue = ['first', 'second', 'third'];
const front = queue.shift();
console.log('Removed:', front);
console.log('Remaining:', queue);

// Queue pattern (FIFO): push + shift
const q = [];
q.push('a');
q.push('b');
q.push('c');
console.log(q.shift()); // 'a'
console.log(q.shift()); // 'b'
console.log(q);`,
            output: `Removed: first
Remaining: ['second', 'third']
a
b
['c']`,
            tip: 'shift() is O(n) because it re-indexes all elements. For performance-critical queues, use a pointer-based approach or a proper queue data structure.',
            diagram: {
              kind: 'custom',
              type: 'queue',
              data: { values: ['a', 'b', 'c'], highlightIndices: [0], operation: 'shift' },
              caption: 'Queue: shift removes from front, push adds to back (FIFO)',
            } },
        ],
        quiz: [
          {
            question: 'What is the time complexity of Array.shift()?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
            correctIndex: 2,
            explanation: 'shift() is O(n) because removing the first element requires re-indexing every remaining element in the array.',
          },
          {
            question: 'Which combination of methods implements a Queue (FIFO)?',
            options: ['push() + pop()', 'push() + shift()', 'unshift() + pop()', 'unshift() + shift()'],
            correctIndex: 1,
            explanation: 'push() adds to the end and shift() removes from the front, implementing a First In, First Out (FIFO) queue.',
          },
          {
            question: 'What does shift() return on an empty array?',
            options: ['null', 'An empty string', 'undefined', 'It throws a TypeError'],
            correctIndex: 2,
            explanation: 'Like pop(), shift() returns undefined when called on an empty array without throwing an error.',
          },
        ],
        challenge: {
          prompt: 'Write a function `processQueue` that takes a queue array and a processing function. Use shift() to process items one at a time from the front. Return an array of processed results.',
          starterCode: `function processQueue(queue, processFn) {
  const results = [];
  // Process each item from the front of the queue
  return results;
}

const tasks = ['task1', 'task2', 'task3'];
const results = processQueue(tasks, t => t.toUpperCase());
console.log(results);
// Expected: ['TASK1', 'TASK2', 'TASK3']
console.log(tasks);
// Expected: [] (queue is drained)`,
          solutionCode: `function processQueue(queue, processFn) {
  const results = [];
  while (queue.length > 0) {
    const item = queue.shift();
    results.push(processFn(item));
  }
  return results;
}

const tasks = ['task1', 'task2', 'task3'];
const results = processQueue(tasks, t => t.toUpperCase());
console.log(results);
// ['TASK1', 'TASK2', 'TASK3']
console.log(tasks);
// []`,
          hints: [
            'Use a while loop that checks queue.length > 0.',
            'shift() removes and returns the front element, then pass it to the processing function.',
          ],
        },
      },
      {
        id: 'arr-unshift',
        title: 'Array.unshift()',
        difficulty: 'beginner',
        signature: 'arr.unshift(...items): number',
        tags: ['array', 'unshift', 'prepend', 'add', 'mutate'],
        cheatSheetSummary: 'Adds elements to the start. Returns new length. Mutates. O(n).',
        sections: [
          { heading: 'Overview', content: 'unshift() adds one or more elements to the beginning of an array and returns the new length. Like shift(), it is O(n) because all existing elements must be re-indexed. Use spread for an immutable alternative: [newItem, ...arr].',
            code: `const nums = [3, 4, 5];
const newLen = nums.unshift(1, 2);
console.log(nums);
console.log('New length:', newLen);

// Immutable alternative with spread
const original = [3, 4, 5];
const withPrefix = [1, 2, ...original];
console.log(withPrefix);
console.log('Original unchanged:', original);`,
            output: `[1, 2, 3, 4, 5]
New length: 5
[1, 2, 3, 4, 5]
Original unchanged: [3, 4, 5]`,
            tip: 'When order of insertion matters, note that unshift(1, 2) inserts [1, 2, ...] not [2, 1, ...]. All items are inserted at once.',
            diagram: {
              kind: 'custom',
              type: 'array',
              data: { values: [1, 2, 3, 4, 5], highlightIndices: [0, 1] },
              caption: 'unshift(1, 2) inserts at the beginning, shifting existing elements right',
            },
            codeHighlightLines: [2, 8] },
        ],
        quiz: [
          {
            question: 'What does Array.unshift() return?',
            options: ['The modified array', 'The first element', 'The new length of the array', 'undefined'],
            correctIndex: 2,
            explanation: 'Like push(), unshift() returns the new length of the array after adding elements to the beginning.',
          },
          {
            question: 'What is the result of calling unshift(1, 2) on [3, 4, 5]?',
            options: ['[2, 1, 3, 4, 5]', '[1, 2, 3, 4, 5]', '[3, 4, 5, 1, 2]', '[1, 3, 4, 5, 2]'],
            correctIndex: 1,
            explanation: 'unshift(1, 2) inserts both items at the beginning in the same order they are passed, resulting in [1, 2, 3, 4, 5].',
          },
          {
            question: 'What is the time complexity of unshift()?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
            correctIndex: 2,
            explanation: 'unshift() is O(n) because all existing elements must be shifted to higher indices to make room at the beginning.',
          },
        ],
        challenge: {
          prompt: 'Write a function `prependHistory` that maintains a history array with a max length. Use unshift() to add new entries at the front, and if the array exceeds maxLength, trim it from the end.',
          starterCode: `function prependHistory(history, newEntry, maxLength) {
  // Add newEntry to the front
  // If history exceeds maxLength, trim from the end
  return history;
}

const history = ['page3', 'page2', 'page1'];
prependHistory(history, 'page4', 4);
console.log(history);
// Expected: ['page4', 'page3', 'page2', 'page1']
prependHistory(history, 'page5', 4);
console.log(history);
// Expected: ['page5', 'page4', 'page3', 'page2']`,
          solutionCode: `function prependHistory(history, newEntry, maxLength) {
  history.unshift(newEntry);
  if (history.length > maxLength) {
    history.length = maxLength;
  }
  return history;
}

const history = ['page3', 'page2', 'page1'];
prependHistory(history, 'page4', 4);
console.log(history);
// ['page4', 'page3', 'page2', 'page1']
prependHistory(history, 'page5', 4);
console.log(history);
// ['page5', 'page4', 'page3', 'page2']`,
          hints: [
            'Use unshift() to add the new entry to the front of the array.',
            'You can truncate an array by setting its .length property to the desired max length.',
          ],
        },
      },
      {
        id: 'arr-splice',
        title: 'Array.splice()',
        difficulty: 'intermediate',
        signature: 'arr.splice(start, deleteCount?, ...items): T[]',
        tags: ['array', 'splice', 'insert', 'remove', 'replace', 'mutate'],
        cheatSheetSummary: 'Insert, remove, or replace elements at any position. Mutates. Returns removed items.',
        sections: [
          { heading: 'Overview', content: 'splice() is the Swiss army knife of array mutation. It can insert, remove, or replace elements at any position. The first argument is the start index, the second is how many elements to delete, and remaining arguments are elements to insert. It returns an array of removed elements and mutates the original.',
            code: `const arr = ['a', 'b', 'c', 'd', 'e'];

// Remove 2 elements at index 1
const removed = arr.splice(1, 2);
console.log('Removed:', removed);
console.log('Array:', arr);

// Insert at index 1 (delete 0)
arr.splice(1, 0, 'x', 'y');
console.log('After insert:', arr);

// Replace 1 element at index 2
arr.splice(2, 1, 'Z');
console.log('After replace:', arr);

// Remove from end using negative index
const arr2 = [1, 2, 3, 4, 5];
arr2.splice(-2); // remove last 2
console.log('After splice(-2):', arr2);`,
            output: `Removed: ['b', 'c']
Array: ['a', 'd', 'e']
After insert: ['a', 'x', 'y', 'd', 'e']
After replace: ['a', 'x', 'Z', 'd', 'e']
After splice(-2): [1, 2, 3]`,
            tip: 'Use toSpliced() (ES2023) for an immutable version that returns a new array without modifying the original.',
            analogy: 'Think of it like editing a sentence: splice lets you delete words, insert new ones, or replace a section all in one operation. It is the surgical tool for array mutation.',
            codeHighlightLines: [4, 9, 13, 18] },
        ],
        quiz: [
          {
            question: 'What does splice() return?',
            options: ['The modified array', 'The new length', 'An array of removed elements', 'undefined'],
            correctIndex: 2,
            explanation: 'splice() returns an array containing the removed elements. If no elements are removed, it returns an empty array.',
          },
          {
            question: 'What does arr.splice(1, 0, "x") do?',
            options: ['Removes element at index 1', 'Replaces element at index 1 with "x"', 'Inserts "x" at index 1 without removing anything', 'Removes "x" from the array'],
            correctIndex: 2,
            explanation: 'When the deleteCount is 0, splice() inserts elements at the specified index without removing any existing elements.',
          },
          {
            question: 'What is the ES2023 immutable alternative to splice()?',
            options: ['toSpliced()', 'sliced()', 'immutableSplice()', 'withSplice()'],
            correctIndex: 0,
            explanation: 'toSpliced() (ES2023) performs the same operation as splice() but returns a new array instead of mutating the original.',
          },
          {
            question: 'What does arr.splice(-2) do?',
            options: ['Inserts -2 at the end', 'Removes the first 2 elements', 'Removes the last 2 elements', 'Does nothing'],
            correctIndex: 2,
            explanation: 'A negative start index counts from the end of the array. splice(-2) removes everything from the second-to-last element onward.',
          },
        ],
        challenge: {
          prompt: 'Write a function `insertSorted` that inserts a number into an already sorted array at the correct position using splice(), maintaining sort order.',
          starterCode: `function insertSorted(sortedArr, num) {
  // Find the correct position and insert using splice
  return sortedArr;
}

const arr = [1, 3, 5, 7, 9];
insertSorted(arr, 4);
console.log(arr);
// Expected: [1, 3, 4, 5, 7, 9]
insertSorted(arr, 0);
console.log(arr);
// Expected: [0, 1, 3, 4, 5, 7, 9]`,
          solutionCode: `function insertSorted(sortedArr, num) {
  let index = sortedArr.findIndex(n => n >= num);
  if (index === -1) index = sortedArr.length;
  sortedArr.splice(index, 0, num);
  return sortedArr;
}

const arr = [1, 3, 5, 7, 9];
insertSorted(arr, 4);
console.log(arr);
// [1, 3, 4, 5, 7, 9]
insertSorted(arr, 0);
console.log(arr);
// [0, 1, 3, 4, 5, 7, 9]`,
          hints: [
            'Use findIndex() to find the first element that is greater than or equal to the number to insert.',
            'If findIndex() returns -1 (no element is larger), insert at the end using sortedArr.length as the index.',
          ],
        },
      },
      {
        id: 'arr-slice',
        title: 'Array.slice()',
        difficulty: 'beginner',
        signature: 'arr.slice(start?, end?): T[]',
        tags: ['array', 'slice', 'extract', 'copy', 'non-mutating'],
        cheatSheetSummary: 'Returns a shallow copy of a portion. Does NOT mutate.',
        sections: [
          { heading: 'Overview', content: 'slice() returns a shallow copy of a portion of an array. It takes a start index (inclusive) and an optional end index (exclusive). Negative indices count from the end. Unlike splice(), slice() does not modify the original array. Calling slice() with no arguments creates a shallow clone of the entire array.',
            code: `const arr = [0, 1, 2, 3, 4, 5];

console.log(arr.slice(1, 4));   // [1, 2, 3]
console.log(arr.slice(2));      // [2, 3, 4, 5]
console.log(arr.slice(-3));     // [3, 4, 5]
console.log(arr.slice(-3, -1)); // [3, 4]
console.log(arr.slice());       // [0, 1, 2, 3, 4, 5] (clone)

// Original is unchanged
console.log('Original:', arr);

// Practical: paginate results
const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const page = 2, pageSize = 3;
const pageItems = items.slice((page - 1) * pageSize, page * pageSize);
console.log(\`Page \${page}:\`, pageItems);`,
            output: `[1, 2, 3]
[2, 3, 4, 5]
[3, 4, 5]
[3, 4]
[0, 1, 2, 3, 4, 5]
Original: [0, 1, 2, 3, 4, 5]
Page 2: ['d', 'e', 'f']`,
            tip: 'Remember: slice() = non-mutating copy, splice() = mutating modification. The "p" in splice stands for "place/remove in place".',
            diagram: {
              kind: 'custom',
              type: 'array',
              data: { values: [0, 1, 2, 3, 4, 5], highlightIndices: [1, 2, 3] },
              caption: 'slice(1, 4) extracts indices 1, 2, 3 (start inclusive, end exclusive)',
            },
            codeHighlightLines: [3, 15] },
        ],
        quiz: [
          {
            question: 'Does slice() mutate the original array?',
            options: ['Yes, it removes elements from the original', 'Yes, it modifies elements in place', 'No, it returns a new array', 'Only when called without arguments'],
            correctIndex: 2,
            explanation: 'slice() is non-mutating. It always returns a new array containing a shallow copy of the selected elements.',
          },
          {
            question: 'What does arr.slice(1, 4) return from [0, 1, 2, 3, 4, 5]?',
            options: ['[1, 2, 3, 4]', '[1, 2, 3]', '[0, 1, 2, 3]', '[2, 3, 4]'],
            correctIndex: 1,
            explanation: 'slice() uses inclusive start and exclusive end. slice(1, 4) extracts elements at indices 1, 2, and 3.',
          },
          {
            question: 'What does arr.slice(-2) return from [1, 2, 3, 4, 5]?',
            options: ['[1, 2, 3]', '[4, 5]', '[1, 2]', '[3, 4, 5]'],
            correctIndex: 1,
            explanation: 'A negative index counts from the end. slice(-2) extracts the last 2 elements: [4, 5].',
          },
        ],
        challenge: {
          prompt: 'Write a function `paginate` that takes an array, a page number (1-based), and a page size. Use slice() to return the items for that page, or an empty array if the page is out of range.',
          starterCode: `function paginate(items, page, pageSize) {
  // Return the items for the given page
  // Page numbers start at 1
  return [];
}

const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
console.log(paginate(items, 1, 3)); // Expected: ['a', 'b', 'c']
console.log(paginate(items, 2, 3)); // Expected: ['d', 'e', 'f']
console.log(paginate(items, 3, 3)); // Expected: ['g', 'h']
console.log(paginate(items, 4, 3)); // Expected: []`,
          solutionCode: `function paginate(items, page, pageSize) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return items.slice(start, end);
}

const items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
console.log(paginate(items, 1, 3)); // ['a', 'b', 'c']
console.log(paginate(items, 2, 3)); // ['d', 'e', 'f']
console.log(paginate(items, 3, 3)); // ['g', 'h']
console.log(paginate(items, 4, 3)); // []`,
          hints: [
            'Calculate the start index as (page - 1) * pageSize.',
            'slice() safely handles out-of-range indices by returning an empty array, so no extra bounds checking is needed.',
          ],
        },
      },
      {
        id: 'arr-concat',
        title: 'Array.concat()',
        difficulty: 'beginner',
        signature: 'arr.concat(...items): T[]',
        tags: ['array', 'concat', 'merge', 'combine', 'non-mutating'],
        cheatSheetSummary: 'Merges arrays into a new array. Does NOT mutate.',
        sections: [
          { heading: 'Overview', content: 'concat() merges two or more arrays into a new array without modifying the originals. It can take arrays or individual values as arguments. In modern code, the spread operator (...) often replaces concat for its cleaner syntax.',
            code: `const a = [1, 2];
const b = [3, 4];
const c = [5, 6];

const merged = a.concat(b, c);
console.log(merged);
console.log('Original a:', a); // unchanged

// Mix arrays and values
console.log(a.concat(3, [4, 5]));

// Spread alternative (modern)
const spread = [...a, ...b, ...c];
console.log('Spread:', spread);

// Concat does NOT flatten nested arrays
console.log([1].concat([[2, 3]])); // [1, [2, 3]]`,
            output: `[1, 2, 3, 4, 5, 6]
Original a: [1, 2]
[1, 2, 3, 4, 5]
Spread: [1, 2, 3, 4, 5, 6]
[1, [2, 3]]`,
            tip: 'Prefer spread [...a, ...b] over a.concat(b) in modern code. Spread is more readable and consistent with other spread uses.' },
        ],
        quiz: [
          {
            question: 'Does concat() flatten nested arrays?',
            options: ['Yes, it flattens all levels', 'Yes, but only one level', 'No, nested arrays remain nested', 'Only if you pass the flatten option'],
            correctIndex: 2,
            explanation: 'concat() does NOT flatten nested arrays. [1].concat([[2, 3]]) results in [1, [2, 3]], not [1, 2, 3]. Use flat() for flattening.',
          },
          {
            question: 'What does [1, 2].concat(3, [4, 5]) return?',
            options: ['[1, 2, 3, [4, 5]]', '[1, 2, 3, 4, 5]', '[1, 2, [3, 4, 5]]', '[[1, 2], 3, [4, 5]]'],
            correctIndex: 1,
            explanation: 'concat() spreads top-level array arguments but keeps individual values as-is, resulting in [1, 2, 3, 4, 5].',
          },
          {
            question: 'Does concat() mutate the original array?',
            options: ['Yes', 'No, it returns a new array', 'Only when called with no arguments', 'Only when merging more than 2 arrays'],
            correctIndex: 1,
            explanation: 'concat() always returns a new array and never modifies the original arrays.',
          },
        ],
        challenge: {
          prompt: 'Write a function `mergeUnique` that takes multiple arrays and merges them into a single array with no duplicate values, using concat() and Set.',
          starterCode: `function mergeUnique(...arrays) {
  // Merge all arrays and remove duplicates
  return [];
}

console.log(mergeUnique([1, 2, 3], [2, 3, 4], [4, 5, 6]));
// Expected: [1, 2, 3, 4, 5, 6]
console.log(mergeUnique(['a', 'b'], ['b', 'c'], ['c', 'd']));
// Expected: ['a', 'b', 'c', 'd']`,
          solutionCode: `function mergeUnique(...arrays) {
  const merged = [].concat(...arrays);
  return [...new Set(merged)];
}

console.log(mergeUnique([1, 2, 3], [2, 3, 4], [4, 5, 6]));
// [1, 2, 3, 4, 5, 6]
console.log(mergeUnique(['a', 'b'], ['b', 'c'], ['c', 'd']));
// ['a', 'b', 'c', 'd']`,
          hints: [
            'Use [].concat(...arrays) to merge all arrays into one.',
            'Convert the merged array to a Set to remove duplicates, then spread back into an array.',
          ],
        },
      },
      {
        id: 'arr-join',
        title: 'Array.join()',
        difficulty: 'beginner',
        signature: 'arr.join(separator?): string',
        tags: ['array', 'join', 'string', 'concatenate', 'separator'],
        cheatSheetSummary: 'Joins all elements into a string with a separator. Default: comma.',
        sections: [
          { heading: 'Overview', content: 'join() creates a string by concatenating all array elements with a specified separator. The default separator is a comma. Elements are converted to strings automatically. undefined and null become empty strings. join() is the inverse of String.split().',
            code: `const words = ['Hello', 'World'];
console.log(words.join(' '));     // 'Hello World'
console.log(words.join(', '));    // 'Hello, World'
console.log(words.join(''));      // 'HelloWorld'
console.log(words.join());        // 'Hello,World' (default comma)

// Building CSV
const row = ['Alice', 30, 'NYC'];
console.log(row.join(','));

// Building paths
const parts = ['users', 'alice', 'documents'];
console.log(parts.join('/'));

// Efficient string building
const items = [];
for (let i = 1; i <= 5; i++) items.push(\`Item \${i}\`);
console.log(items.join(' | '));`,
            output: `Hello World
Hello, World
HelloWorld
Hello,World
Alice,30,NYC
users/alice/documents
Item 1 | Item 2 | Item 3 | Item 4 | Item 5`,
            tip: 'join() is significantly faster than string concatenation in a loop. Collect values in an array and join once at the end.',
            analogy: 'Think of it like stringing beads on a necklace: each array element is a bead, and the separator is the knot between them.' },
        ],
        quiz: [
          {
            question: 'What is the default separator for join()?',
            options: ['A space " "', 'An empty string ""', 'A comma ","', 'No separator'],
            correctIndex: 2,
            explanation: 'When called without arguments, join() uses a comma as the default separator.',
          },
          {
            question: 'What does [1, null, undefined, 2].join("-") return?',
            options: ['"1-null-undefined-2"', '"1---2"', '"1-2"', 'It throws an error'],
            correctIndex: 1,
            explanation: 'null and undefined are converted to empty strings in join(), so the result is "1---2".',
          },
          {
            question: 'Which method is the inverse of join()?',
            options: ['Array.from()', 'String.split()', 'String.concat()', 'Array.concat()'],
            correctIndex: 1,
            explanation: 'String.split() is the inverse of Array.join(). join() converts an array to a string, while split() converts a string to an array.',
          },
        ],
        challenge: {
          prompt: 'Write a function `toCSV` that takes an array of objects and converts them to a CSV string. The first line should be the headers (keys), and subsequent lines should be the values.',
          starterCode: `function toCSV(data) {
  if (data.length === 0) return '';
  // Build CSV string using join()
  return '';
}

const people = [
  { name: 'Alice', age: 30, city: 'NYC' },
  { name: 'Bob', age: 25, city: 'LA' },
  { name: 'Charlie', age: 35, city: 'Chicago' },
];
console.log(toCSV(people));
// Expected:
// name,age,city
// Alice,30,NYC
// Bob,25,LA
// Charlie,35,Chicago`,
          solutionCode: `function toCSV(data) {
  if (data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const rows = data.map(obj => headers.map(h => obj[h]).join(','));
  return [headers.join(','), ...rows].join('\\n');
}

const people = [
  { name: 'Alice', age: 30, city: 'NYC' },
  { name: 'Bob', age: 25, city: 'LA' },
  { name: 'Charlie', age: 35, city: 'Chicago' },
];
console.log(toCSV(people));`,
          hints: [
            'Use Object.keys() on the first object to get the header row, then join with commas.',
            'Map over each object, extract values in header order, join each row with commas, then join all rows with newlines.',
          ],
        },
      },
      {
        id: 'arr-indexOf',
        title: 'Array.indexOf()',
        difficulty: 'beginner',
        signature: 'arr.indexOf(item, fromIndex?): number',
        tags: ['array', 'indexOf', 'search', 'find', 'index'],
        cheatSheetSummary: 'Returns first index of element, or -1 if not found. Uses strict equality.',
        sections: [
          { heading: 'Overview', content: 'indexOf() returns the first index at which a given element is found, using strict equality (===). It returns -1 if the element is not found. An optional second argument specifies the index to start searching from. For objects or complex conditions, use findIndex() instead.',
            code: `const arr = ['a', 'b', 'c', 'b', 'a'];

console.log(arr.indexOf('b'));     // 1 (first occurrence)
console.log(arr.indexOf('b', 2)); // 3 (search from index 2)
console.log(arr.indexOf('z'));     // -1 (not found)

// Check if element exists
if (arr.indexOf('c') !== -1) {
  console.log('Found c');
}

// Prefer includes() for existence checks
console.log(arr.includes('c')); // true (cleaner)

// indexOf uses strict equality — cannot find objects by value
const users = [{ id: 1 }, { id: 2 }];
console.log(users.indexOf({ id: 1 })); // -1 (different object)`,
            output: `1
3
-1
Found c
true
-1`,
            tip: 'Use includes() for simple existence checks and indexOf() only when you need the actual position. indexOf() cannot find NaN, but includes() can.',
            codeHighlightLines: [3, 4, 13] },
        ],
        quiz: [
          {
            question: 'What does indexOf() return when the element is not found?',
            options: ['undefined', 'null', '-1', 'false'],
            correctIndex: 2,
            explanation: 'indexOf() returns -1 when the searched element is not found in the array.',
          },
          {
            question: 'Can indexOf() find NaN in an array?',
            options: ['Yes', 'No, because NaN !== NaN', 'Only with a fromIndex', 'Only in strict mode'],
            correctIndex: 1,
            explanation: 'indexOf() uses strict equality (===) and since NaN !== NaN in JavaScript, it cannot find NaN. Use includes() instead.',
          },
          {
            question: 'What does ["a", "b", "c", "b"].indexOf("b", 2) return?',
            options: ['1', '2', '3', '-1'],
            correctIndex: 2,
            explanation: 'The second argument tells indexOf() to start searching from index 2. The next occurrence of "b" after index 2 is at index 3.',
          },
        ],
        challenge: {
          prompt: 'Write a function `findAllIndices` that returns an array of all indices where a value appears in an array, using indexOf() with the fromIndex parameter.',
          starterCode: `function findAllIndices(arr, value) {
  const indices = [];
  // Find all occurrences using indexOf with fromIndex
  return indices;
}

console.log(findAllIndices([1, 2, 3, 2, 4, 2, 5], 2));
// Expected: [1, 3, 5]
console.log(findAllIndices(['a', 'b', 'a', 'c', 'a'], 'a'));
// Expected: [0, 2, 4]`,
          solutionCode: `function findAllIndices(arr, value) {
  const indices = [];
  let idx = arr.indexOf(value);
  while (idx !== -1) {
    indices.push(idx);
    idx = arr.indexOf(value, idx + 1);
  }
  return indices;
}

console.log(findAllIndices([1, 2, 3, 2, 4, 2, 5], 2));
// [1, 3, 5]
console.log(findAllIndices(['a', 'b', 'a', 'c', 'a'], 'a'));
// [0, 2, 4]`,
          hints: [
            'Start with indexOf(value) to find the first occurrence, then loop using indexOf(value, lastIndex + 1).',
            'Continue the loop while indexOf() does not return -1.',
          ],
        },
      },
      {
        id: 'arr-includes',
        title: 'Array.includes()',
        difficulty: 'beginner',
        signature: 'arr.includes(item, fromIndex?): boolean',
        tags: ['array', 'includes', 'contains', 'membership', 'search'],
        cheatSheetSummary: 'Returns true if array contains the element. Can find NaN.',
        sections: [
          { heading: 'Overview', content: 'includes() returns true if the array contains the specified element. Unlike indexOf(), it returns a boolean (more intuitive for existence checks) and can correctly find NaN values. It uses the SameValueZero algorithm, which is like strict equality but treats NaN as equal to NaN.',
            code: `const fruits = ['apple', 'banana', 'cherry'];

console.log(fruits.includes('banana')); // true
console.log(fruits.includes('grape'));  // false

// includes can find NaN (indexOf cannot!)
const nums = [1, 2, NaN, 4];
console.log(nums.includes(NaN));  // true
console.log(nums.indexOf(NaN));   // -1 (fails!)

// Search from specific index
console.log(fruits.includes('apple', 1)); // false (starts from index 1)

// Practical: validate input
const validRoles = ['admin', 'editor', 'viewer'];
function isValidRole(role) {
  return validRoles.includes(role);
}
console.log(isValidRole('admin'));  // true
console.log(isValidRole('hacker')); // false`,
            output: `true
false
true
-1
false
true
false`,
            tip: 'For frequent membership checks on large collections, convert to a Set first: new Set(arr).has(item) is O(1) vs includes() O(n).',
            codeHighlightLines: [8, 9] },
        ],
        quiz: [
          {
            question: 'What algorithm does includes() use for comparison?',
            options: ['Abstract equality (==)', 'Strict equality (===)', 'SameValueZero', 'Object.is()'],
            correctIndex: 2,
            explanation: 'includes() uses the SameValueZero algorithm, which is like strict equality but treats NaN as equal to NaN.',
          },
          {
            question: 'What does [1, 2, NaN].includes(NaN) return?',
            options: ['true', 'false', 'undefined', 'It throws an error'],
            correctIndex: 0,
            explanation: 'Unlike indexOf(), includes() can correctly find NaN because it uses SameValueZero instead of strict equality.',
          },
          {
            question: 'For frequent membership checks on large arrays, what is a better alternative?',
            options: ['Use indexOf() instead', 'Convert to a Set and use has()', 'Use a for loop', 'Use filter().length > 0'],
            correctIndex: 1,
            explanation: 'Set.has() is O(1) compared to includes() which is O(n), making it much faster for frequent lookups on large collections.',
          },
        ],
        challenge: {
          prompt: 'Write a function `validateInput` that checks if a user input value is one of the allowed values. Use includes() for the check and return an object with `valid` (boolean) and `message` (string).',
          starterCode: `function validateInput(input, allowedValues) {
  // Check if input is in allowedValues using includes()
  // Return { valid: boolean, message: string }
  return { valid: false, message: '' };
}

const roles = ['admin', 'editor', 'viewer'];
console.log(validateInput('admin', roles));
// Expected: { valid: true, message: 'Input "admin" is valid.' }
console.log(validateInput('hacker', roles));
// Expected: { valid: false, message: 'Input "hacker" is not valid. Allowed: admin, editor, viewer' }`,
          solutionCode: `function validateInput(input, allowedValues) {
  if (allowedValues.includes(input)) {
    return { valid: true, message: \`Input "\${input}" is valid.\` };
  }
  return {
    valid: false,
    message: \`Input "\${input}" is not valid. Allowed: \${allowedValues.join(', ')}\`,
  };
}

const roles = ['admin', 'editor', 'viewer'];
console.log(validateInput('admin', roles));
// { valid: true, message: 'Input "admin" is valid.' }
console.log(validateInput('hacker', roles));
// { valid: false, message: 'Input "hacker" is not valid. Allowed: admin, editor, viewer' }`,
          hints: [
            'Use includes() to check if the input is in the allowedValues array.',
            'Use join() to list the allowed values in the error message.',
          ],
        },
      },
      {
        id: 'arr-find',
        title: 'Array.find()',
        difficulty: 'beginner',
        signature: 'arr.find(callback): T | undefined',
        tags: ['array', 'find', 'search', 'first', 'predicate'],
        cheatSheetSummary: 'Returns first element matching the callback. undefined if none.',
        sections: [
          { heading: 'Overview', content: 'find() returns the first element in the array that satisfies the provided callback function. If no element matches, it returns undefined. Unlike filter() which returns all matches, find() stops at the first match, making it more efficient when you only need one result.',
            code: `const users = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
];

const bob = users.find(u => u.name === 'Bob');
console.log(bob);

const adult = users.find(u => u.age >= 30);
console.log('First adult:', adult.name);

const missing = users.find(u => u.id === 99);
console.log('Missing:', missing); // undefined

// With nullish coalescing for default
const user = users.find(u => u.id === 99) ?? { name: 'Guest' };
console.log('Fallback:', user.name);`,
            output: `{ id: 2, name: 'Bob', age: 25 }
First adult: Alice
Missing: undefined
Fallback: Guest`,
            tip: 'find() returns the actual element (by reference for objects), not a copy. Modifying the returned object modifies the original array element.',
            analogy: 'Think of it like searching through a deck of cards face by face: find() flips cards one at a time and stops as soon as it spots the card matching your criteria.' },
        ],
        quiz: [
          {
            question: 'What does find() return when no element matches?',
            options: ['null', '-1', 'An empty array', 'undefined'],
            correctIndex: 3,
            explanation: 'find() returns undefined when no element satisfies the callback, unlike filter() which returns an empty array.',
          },
          {
            question: 'How does find() differ from filter()?',
            options: ['find() returns an array, filter() returns one element', 'find() returns the first match and stops, filter() returns all matches', 'find() mutates the array, filter() does not', 'There is no difference'],
            correctIndex: 1,
            explanation: 'find() short-circuits and returns the first matching element. filter() always processes the entire array and returns all matches.',
          },
          {
            question: 'If find() returns an object, what happens when you modify that object?',
            options: ['Nothing, find() returns a copy', 'The original array element is also modified', 'An error is thrown', 'The array is immutable after find()'],
            correctIndex: 1,
            explanation: 'find() returns a reference to the actual element in the array. Modifying the returned object modifies the original array element.',
          },
        ],
        challenge: {
          prompt: 'Write a function `findWithDefault` that searches an array of objects using find(), but returns a default object if no match is found. Use the nullish coalescing operator (??).',
          starterCode: `function findWithDefault(users, predicate, defaultUser) {
  // Find the user matching the predicate, or return defaultUser
  return null;
}

const users = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true },
];

console.log(findWithDefault(users, u => u.id === 2, { id: 0, name: 'Guest', active: false }));
// Expected: { id: 2, name: 'Bob', active: false }
console.log(findWithDefault(users, u => u.id === 99, { id: 0, name: 'Guest', active: false }));
// Expected: { id: 0, name: 'Guest', active: false }`,
          solutionCode: `function findWithDefault(users, predicate, defaultUser) {
  return users.find(predicate) ?? defaultUser;
}

const users = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true },
];

console.log(findWithDefault(users, u => u.id === 2, { id: 0, name: 'Guest', active: false }));
// { id: 2, name: 'Bob', active: false }
console.log(findWithDefault(users, u => u.id === 99, { id: 0, name: 'Guest', active: false }));
// { id: 0, name: 'Guest', active: false }`,
          hints: [
            'Use find() with the provided predicate function to search the array.',
            'Use the ?? operator to return defaultUser when find() returns undefined.',
          ],
        },
      },
      {
        id: 'arr-findIndex',
        title: 'Array.findIndex()',
        difficulty: 'beginner',
        signature: 'arr.findIndex(callback): number',
        tags: ['array', 'findIndex', 'search', 'index', 'predicate'],
        cheatSheetSummary: 'Returns index of first matching element, or -1. Like find() but returns index.',
        sections: [
          { heading: 'Overview', content: 'findIndex() returns the index of the first element that satisfies the callback. It returns -1 if no element matches. This is useful when you need the position to update or remove an element, or when working with splice(). It is the callback-based equivalent of indexOf().',
            code: `const tasks = [
  { id: 1, title: 'Code', done: true },
  { id: 2, title: 'Test', done: false },
  { id: 3, title: 'Deploy', done: false },
];

const idx = tasks.findIndex(t => t.id === 2);
console.log('Index of task 2:', idx);

// Use index to update
if (idx !== -1) {
  tasks[idx] = { ...tasks[idx], done: true };
}
console.log('Updated:', tasks[idx]);

// Use index to remove
const removeIdx = tasks.findIndex(t => t.id === 3);
if (removeIdx !== -1) {
  tasks.splice(removeIdx, 1);
}
console.log('After remove:', tasks.length);

// Not found
console.log(tasks.findIndex(t => t.id === 99)); // -1`,
            output: `Index of task 2: 1
Updated: { id: 2, title: 'Test', done: true }
After remove: 2
-1`,
            tip: 'findIndex() with splice() is a common pattern for removing an item by condition from an array.',
            codeHighlightLines: [7, 12, 17, 19] },
        ],
        quiz: [
          {
            question: 'What does findIndex() return when no element matches?',
            options: ['undefined', 'null', '0', '-1'],
            correctIndex: 3,
            explanation: 'findIndex() returns -1 when no element satisfies the callback, consistent with indexOf() behavior.',
          },
          {
            question: 'How does findIndex() differ from indexOf()?',
            options: ['findIndex() takes a callback, indexOf() takes a value', 'findIndex() returns a boolean, indexOf() returns an index', 'They are identical', 'findIndex() searches from the end'],
            correctIndex: 0,
            explanation: 'findIndex() accepts a callback function for complex matching, while indexOf() only searches for a specific value using strict equality.',
          },
          {
            question: 'What is a common use case for findIndex() combined with splice()?',
            options: ['Sorting an array', 'Removing an item by condition', 'Copying an array', 'Reversing an array'],
            correctIndex: 1,
            explanation: 'findIndex() + splice() is a common pattern: find the index of an element matching a condition, then use splice() to remove it.',
          },
        ],
        challenge: {
          prompt: 'Write a function `updateById` that finds an object by its id in an array and updates it with new properties using findIndex(). Return true if updated, false if not found.',
          starterCode: `function updateById(items, id, updates) {
  // Find the item by id using findIndex
  // If found, merge updates into the item
  // Return true if updated, false if not found
  return false;
}

const todos = [
  { id: 1, text: 'Buy groceries', done: false },
  { id: 2, text: 'Clean house', done: false },
  { id: 3, text: 'Write code', done: false },
];

console.log(updateById(todos, 2, { done: true })); // Expected: true
console.log(todos[1]); // Expected: { id: 2, text: 'Clean house', done: true }
console.log(updateById(todos, 99, { done: true })); // Expected: false`,
          solutionCode: `function updateById(items, id, updates) {
  const idx = items.findIndex(item => item.id === id);
  if (idx === -1) return false;
  items[idx] = { ...items[idx], ...updates };
  return true;
}

const todos = [
  { id: 1, text: 'Buy groceries', done: false },
  { id: 2, text: 'Clean house', done: false },
  { id: 3, text: 'Write code', done: false },
];

console.log(updateById(todos, 2, { done: true })); // true
console.log(todos[1]); // { id: 2, text: 'Clean house', done: true }
console.log(updateById(todos, 99, { done: true })); // false`,
          hints: [
            'Use findIndex() with a callback that checks item.id === id.',
            'If the index is not -1, use spread to merge the existing item with updates: { ...items[idx], ...updates }.',
          ],
        },
      },
      {
        id: 'arr-filter',
        title: 'Array.filter()',
        difficulty: 'beginner',
        signature: 'arr.filter(callback): T[]',
        tags: ['array', 'filter', 'select', 'where', 'non-mutating'],
        cheatSheetSummary: 'Returns new array with elements that pass the test. Non-mutating.',
        sections: [
          { heading: 'Overview', content: 'filter() creates a new array containing only the elements that satisfy the provided callback function. The callback should return a truthy or falsy value. filter() never modifies the original array and always returns an array (possibly empty). It is one of the most commonly used array methods in JavaScript.',
            code: `const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = numbers.filter(n => n % 2 === 0);
console.log('Evens:', evens);

const big = numbers.filter(n => n > 5);
console.log('Greater than 5:', big);

// Filter objects
const people = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 25 },
];
const adults = people.filter(p => p.age >= 18);
console.log('Adults:', adults.map(p => p.name));

// Remove falsy values
const mixed = [0, 'hello', '', null, 42, undefined, 'world'];
const truthy = mixed.filter(Boolean);
console.log('Truthy:', truthy);

// Chaining filter + map
const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 10);
console.log('Even x10:', result);`,
            output: `Evens: [2, 4, 6, 8, 10]
Greater than 5: [6, 7, 8, 9, 10]
Adults: ['Alice', 'Charlie']
Truthy: ['hello', 42, 'world']
Even x10: [20, 40, 60, 80, 100]`,
            tip: 'filter(Boolean) is a quick way to remove all falsy values (null, undefined, 0, "", false, NaN) from an array.',
            analogy: 'Think of it like a sieve: you pour the entire array through it, and only the elements that pass your test make it through to the new array.',
            diagram: {
              kind: 'custom',
              type: 'array',
              data: { values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], highlightIndices: [1, 3, 5, 7, 9] },
              caption: 'filter(n => n % 2 === 0) keeps only even-indexed values (2, 4, 6, 8, 10)',
            },
            codeHighlightLines: [3, 20, 25, 26] },
        ],
        quiz: [
          {
            question: 'What does filter() return if no elements pass the test?',
            options: ['undefined', 'null', '-1', 'An empty array []'],
            correctIndex: 3,
            explanation: 'filter() always returns an array. If no elements pass the test, it returns an empty array, never undefined or null.',
          },
          {
            question: 'What does filter(Boolean) remove from an array?',
            options: ['Only null values', 'Only undefined values', 'All falsy values (null, undefined, 0, "", false, NaN)', 'Only non-primitive values'],
            correctIndex: 2,
            explanation: 'Passing Boolean as the callback removes all falsy values because Boolean(falsyValue) returns false.',
          },
          {
            question: 'Does filter() mutate the original array?',
            options: ['Yes', 'No, it always returns a new array', 'Only if the callback mutates elements', 'Only for arrays of objects'],
            correctIndex: 1,
            explanation: 'filter() is non-mutating and always returns a new array containing the elements that passed the test.',
          },
          {
            question: 'Which is more efficient to check if at least one element matches: filter().length > 0 or some()?',
            options: ['filter().length > 0', 'some()', 'They are equally efficient', 'It depends on the array size'],
            correctIndex: 1,
            explanation: 'some() short-circuits at the first match, while filter() processes the entire array. some() is more efficient for existence checks.',
          },
        ],
        challenge: {
          prompt: 'Write a function `filterByMultipleCriteria` that takes an array of products and an object of filter criteria, and returns products that match ALL criteria.',
          starterCode: `function filterByMultipleCriteria(products, criteria) {
  // Filter products that match ALL criteria
  // criteria is an object like { category: 'electronics', inStock: true }
  return [];
}

const products = [
  { name: 'Laptop', category: 'electronics', price: 999, inStock: true },
  { name: 'Phone', category: 'electronics', price: 699, inStock: false },
  { name: 'Shirt', category: 'clothing', price: 29, inStock: true },
  { name: 'Tablet', category: 'electronics', price: 499, inStock: true },
];

console.log(filterByMultipleCriteria(products, { category: 'electronics', inStock: true }));
// Expected: [{ name: 'Laptop', ... }, { name: 'Tablet', ... }]`,
          solutionCode: `function filterByMultipleCriteria(products, criteria) {
  return products.filter(product =>
    Object.entries(criteria).every(([key, value]) => product[key] === value)
  );
}

const products = [
  { name: 'Laptop', category: 'electronics', price: 999, inStock: true },
  { name: 'Phone', category: 'electronics', price: 699, inStock: false },
  { name: 'Shirt', category: 'clothing', price: 29, inStock: true },
  { name: 'Tablet', category: 'electronics', price: 499, inStock: true },
];

console.log(filterByMultipleCriteria(products, { category: 'electronics', inStock: true }));
// [{ name: 'Laptop', ... }, { name: 'Tablet', ... }]`,
          hints: [
            'Use Object.entries(criteria) to get key-value pairs, then check if the product has matching values for all criteria.',
            'Combine filter() with every() to ensure ALL criteria are matched for each product.',
          ],
        },
      },
      {
        id: 'arr-map',
        title: 'Array.map()',
        difficulty: 'beginner',
        signature: 'arr.map(callback): U[]',
        tags: ['array', 'map', 'transform', 'convert', 'non-mutating'],
        cheatSheetSummary: 'Returns new array with each element transformed by the callback.',
        sections: [
          { heading: 'Overview', content: 'map() creates a new array by applying a callback function to every element of the original array. It always returns an array of the same length as the original. The callback receives the current element, index, and the full array. map() is the primary tool for transforming data in JavaScript and is heavily used in React for rendering lists.',
            code: `const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled);

const strings = numbers.map(n => \`Item \${n}\`);
console.log('Strings:', strings);

// Transform objects
const users = [
  { first: 'Alice', last: 'Smith' },
  { first: 'Bob', last: 'Jones' },
];
const names = users.map(u => \`\${u.first} \${u.last}\`);
console.log('Names:', names);

// With index
const indexed = ['a', 'b', 'c'].map((val, i) => \`\${i}: \${val}\`);
console.log('Indexed:', indexed);

// Extract a property
const ages = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
].map(p => p.age);
console.log('Ages:', ages);`,
            output: `Doubled: [2, 4, 6, 8, 10]
Strings: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
Names: ['Alice Smith', 'Bob Jones']
Indexed: ['0: a', '1: b', '2: c']
Ages: [30, 25]`,
            tip: 'Do not use map() for side effects (like logging). Use forEach() instead. map() is for transformations that produce a new array.',
            analogy: 'Think of it like a factory assembly line: each item enters, gets transformed by the callback function, and comes out the other side changed. The number of items always stays the same.',
            diagram: {
              kind: 'mermaid',
              code: `graph LR
  A["[1, 2, 3, 4, 5]"] -->|"map(n => n * 2)"| B["[2, 4, 6, 8, 10]"]
  style A fill:#4a9eff,color:#fff
  style B fill:#51cf66,color:#fff`,
              caption: 'map() transforms each element 1-to-1, preserving array length',
            },
            codeHighlightLines: [3, 14, 25] },
        ],
        quiz: [
          {
            question: 'Does map() ever change the length of the resulting array?',
            options: ['Yes, it removes undefined values', 'Yes, if the callback returns nothing', 'No, the result always has the same length as the input', 'Only if the callback returns an array'],
            correctIndex: 2,
            explanation: 'map() always returns an array of the same length as the original. Each element is transformed 1-to-1.',
          },
          {
            question: 'Why should you NOT use map() for side effects?',
            options: ['It throws an error for side effects', 'It creates an unnecessary new array that gets discarded', 'It is slower than forEach()', 'map() cannot have side effects'],
            correctIndex: 1,
            explanation: 'Using map() for side effects creates an unnecessary array that is discarded. Use forEach() for side effects and map() for transformations.',
          },
          {
            question: 'What does [1, 2, 3].map(String) return?',
            options: ['["1", "2", "3"]', '[1, 2, 3]', '["123"]', 'An error'],
            correctIndex: 0,
            explanation: 'Passing the String constructor as the callback converts each element to a string, resulting in ["1", "2", "3"].',
          },
        ],
        challenge: {
          prompt: 'Write a function `transformKeys` that takes an array of objects and a key mapping object, and returns new objects with renamed keys using map().',
          starterCode: `function transformKeys(items, keyMap) {
  // keyMap is like { oldKey: 'newKey', ... }
  // Return new objects with renamed keys
  return [];
}

const data = [
  { first_name: 'Alice', last_name: 'Smith', email_addr: 'alice@test.com' },
  { first_name: 'Bob', last_name: 'Jones', email_addr: 'bob@test.com' },
];

const keyMap = { first_name: 'firstName', last_name: 'lastName', email_addr: 'email' };
console.log(transformKeys(data, keyMap));
// Expected: [
//   { firstName: 'Alice', lastName: 'Smith', email: 'alice@test.com' },
//   { firstName: 'Bob', lastName: 'Jones', email: 'bob@test.com' },
// ]`,
          solutionCode: `function transformKeys(items, keyMap) {
  return items.map(item => {
    const newItem = {};
    for (const [oldKey, value] of Object.entries(item)) {
      const newKey = keyMap[oldKey] || oldKey;
      newItem[newKey] = value;
    }
    return newItem;
  });
}

const data = [
  { first_name: 'Alice', last_name: 'Smith', email_addr: 'alice@test.com' },
  { first_name: 'Bob', last_name: 'Jones', email_addr: 'bob@test.com' },
];

const keyMap = { first_name: 'firstName', last_name: 'lastName', email_addr: 'email' };
console.log(transformKeys(data, keyMap));`,
          hints: [
            'Use map() to iterate over each item, and Object.entries() to iterate over each key-value pair.',
            'Look up the old key in keyMap to get the new key. If not in keyMap, keep the original key.',
          ],
        },
      },
      {
        id: 'arr-reduce',
        title: 'Array.reduce()',
        difficulty: 'intermediate',
        signature: 'arr.reduce(callback, initialValue?): U',
        tags: ['array', 'reduce', 'accumulate', 'fold', 'aggregate'],
        cheatSheetSummary: 'Reduces array to a single value using an accumulator callback.',
        sections: [
          { heading: 'Overview', content: 'reduce() executes a callback on each element, accumulating a single result. The callback receives the accumulator and current element. Always provide an initial value as the second argument to avoid errors on empty arrays and to clarify intent. reduce() can implement virtually any array transformation, but should not be overused when simpler methods suffice.',
            code: `const numbers = [1, 2, 3, 4, 5];

// Sum
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('Sum:', sum);

// Max value
const max = numbers.reduce((a, b) => a > b ? a : b);
console.log('Max:', max);

// Frequency counter
const words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple'];
const freq = words.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
console.log('Frequency:', freq);

// Group by property
const people = [
  { name: 'Alice', dept: 'Eng' },
  { name: 'Bob', dept: 'Sales' },
  { name: 'Charlie', dept: 'Eng' },
];
const grouped = people.reduce((acc, p) => {
  (acc[p.dept] ??= []).push(p.name);
  return acc;
}, {});
console.log('Grouped:', grouped);

// Flatten nested arrays (prefer flat() for simple cases)
const nested = [[1, 2], [3, 4], [5]];
const flat = nested.reduce((acc, arr) => [...acc, ...arr], []);
console.log('Flat:', flat);`,
            output: `Sum: 15
Max: 5
Frequency: { apple: 3, banana: 2, cherry: 1 }
Grouped: { Eng: ['Alice', 'Charlie'], Sales: ['Bob'] }
Flat: [1, 2, 3, 4, 5]`,
            tip: 'Always provide an initial value to reduce(). Without it, the first element is used as the initial accumulator, which fails on empty arrays and is confusing.',
            analogy: 'Think of it like a snowball rolling downhill: the accumulator starts as a small snowball (initial value), and each element in the array adds more snow to it. By the end, you have one large result.',
            diagram: {
              kind: 'mermaid',
              code: `graph LR
  A["acc=0"] -->|"+1"| B["1"]
  B -->|"+2"| C["3"]
  C -->|"+3"| D["6"]
  D -->|"+4"| E["10"]
  E -->|"+5"| F["15"]
  style A fill:#868e96,color:#fff
  style F fill:#51cf66,color:#fff`,
              caption: 'reduce() with sum: accumulator grows with each element',
            },
            codeHighlightLines: [4, 13, 14, 15, 16, 25, 26] },
        ],
        quiz: [
          {
            question: 'What happens if you call reduce() on an empty array without an initial value?',
            options: ['It returns undefined', 'It returns null', 'It throws a TypeError', 'It returns an empty array'],
            correctIndex: 2,
            explanation: 'Calling reduce() on an empty array without an initial value throws a TypeError because there is no initial value to start with.',
          },
          {
            question: 'What are the first two parameters of the reduce callback?',
            options: ['(element, index)', '(accumulator, currentValue)', '(previousValue, nextValue)', '(result, remainder)'],
            correctIndex: 1,
            explanation: 'The reduce callback receives (accumulator, currentValue, currentIndex, array). The accumulator holds the running result.',
          },
          {
            question: 'Why should you always provide an initial value to reduce()?',
            options: ['It is required by the spec', 'It prevents errors on empty arrays and clarifies intent', 'It makes reduce() faster', 'It is only needed for numeric operations'],
            correctIndex: 1,
            explanation: 'Without an initial value, reduce() throws on empty arrays and uses the first element as the accumulator, which can be confusing.',
          },
          {
            question: 'What does [1, 2, 3, 4].reduce((acc, n) => acc + n, 10) return?',
            options: ['10', '20', '15', '25'],
            correctIndex: 1,
            explanation: 'Starting with 10, the reduce adds each element: 10 + 1 + 2 + 3 + 4 = 20.',
          },
        ],
        challenge: {
          prompt: 'Write a function `groupBy` that takes an array and a key function, and groups elements into an object using reduce(). Each key maps to an array of matching elements.',
          starterCode: `function groupBy(arr, keyFn) {
  // Use reduce to group elements
  return {};
}

const people = [
  { name: 'Alice', department: 'Engineering' },
  { name: 'Bob', department: 'Sales' },
  { name: 'Charlie', department: 'Engineering' },
  { name: 'Diana', department: 'Sales' },
  { name: 'Eve', department: 'Marketing' },
];

console.log(groupBy(people, p => p.department));
// Expected: {
//   Engineering: [{ name: 'Alice', ... }, { name: 'Charlie', ... }],
//   Sales: [{ name: 'Bob', ... }, { name: 'Diana', ... }],
//   Marketing: [{ name: 'Eve', ... }]
// }`,
          solutionCode: `function groupBy(arr, keyFn) {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    (acc[key] ??= []).push(item);
    return acc;
  }, {});
}

const people = [
  { name: 'Alice', department: 'Engineering' },
  { name: 'Bob', department: 'Sales' },
  { name: 'Charlie', department: 'Engineering' },
  { name: 'Diana', department: 'Sales' },
  { name: 'Eve', department: 'Marketing' },
];

console.log(groupBy(people, p => p.department));`,
          hints: [
            'Initialize reduce with an empty object {}. For each element, compute the key using keyFn.',
            'Use the nullish assignment operator (??=) or an if check to initialize the array for each key before pushing.',
          ],
        },
      },
      {
        id: 'arr-forEach',
        title: 'Array.forEach()',
        difficulty: 'beginner',
        signature: 'arr.forEach(callback): void',
        tags: ['array', 'forEach', 'iterate', 'loop', 'side-effect'],
        cheatSheetSummary: 'Calls a function for each element. Returns undefined. Cannot break.',
        sections: [
          { heading: 'Overview', content: 'forEach() executes a callback function once for each array element. Unlike map(), it returns undefined and is designed for side effects like logging, DOM manipulation, or API calls. An important limitation: you cannot break out of a forEach loop — use for...of with break if you need early termination.',
            code: `const fruits = ['apple', 'banana', 'cherry'];

// Basic iteration
fruits.forEach((fruit, index) => {
  console.log(\`\${index}: \${fruit}\`);
});

// Side effects (DOM, logging, etc.)
const log = [];
[1, 2, 3].forEach(n => log.push(n * 2));
console.log('Log:', log);

// forEach returns undefined
const result = [1, 2, 3].forEach(n => n * 2);
console.log('Returns:', result); // undefined

// Cannot break! Use for...of instead
// fruits.forEach(f => { if (f === 'banana') break; }); // SyntaxError!

// for...of allows break
for (const fruit of fruits) {
  if (fruit === 'banana') break;
  console.log(fruit);
}`,
            output: `0: apple
1: banana
2: cherry
Log: [2, 4, 6]
Returns: undefined
apple`,
            tip: 'Use map() when you need a result array. Use forEach() only for side effects. Use for...of when you need break/continue.' },
        ],
        quiz: [
          {
            question: 'What does forEach() return?',
            options: ['The original array', 'A new array', 'The number of iterations', 'undefined'],
            correctIndex: 3,
            explanation: 'forEach() always returns undefined. It is designed for side effects, not for producing a result value.',
          },
          {
            question: 'Can you use "break" inside a forEach callback?',
            options: ['Yes', 'No, it causes a SyntaxError', 'Yes, but only with a label', 'Yes, using return instead'],
            correctIndex: 1,
            explanation: 'break cannot be used inside a forEach callback because the callback is a regular function, not a loop body. Use for...of with break instead.',
          },
          {
            question: 'When should you prefer forEach() over map()?',
            options: ['When you need to transform each element', 'When you need a new array', 'When performing side effects like logging or DOM updates', 'When you need to filter elements'],
            correctIndex: 2,
            explanation: 'forEach() is for side effects (logging, DOM manipulation, API calls). map() should be used when you need to produce a new transformed array.',
          },
        ],
        challenge: {
          prompt: 'Write a function `batchProcess` that takes an array of items and a batch size. Use forEach() to process items in batches, calling a provided batchHandler with each batch.',
          starterCode: `function batchProcess(items, batchSize, batchHandler) {
  let batch = [];
  // Use forEach to collect items into batches
  // When a batch is full, call batchHandler(batch)
  // Don't forget the last partial batch!
}

const results = [];
batchProcess([1, 2, 3, 4, 5, 6, 7], 3, batch => {
  results.push([...batch]);
});
console.log(results);
// Expected: [[1, 2, 3], [4, 5, 6], [7]]`,
          solutionCode: `function batchProcess(items, batchSize, batchHandler) {
  let batch = [];
  items.forEach((item, index) => {
    batch.push(item);
    if (batch.length === batchSize || index === items.length - 1) {
      batchHandler(batch);
      batch = [];
    }
  });
}

const results = [];
batchProcess([1, 2, 3, 4, 5, 6, 7], 3, batch => {
  results.push([...batch]);
});
console.log(results);
// [[1, 2, 3], [4, 5, 6], [7]]`,
          hints: [
            'Push each item to a batch array inside forEach. When batch.length equals batchSize, call the handler and reset the batch.',
            'Check if the current index is the last element to handle the final partial batch.',
          ],
        },
      },
      {
        id: 'arr-some',
        title: 'Array.some()',
        difficulty: 'beginner',
        signature: 'arr.some(callback): boolean',
        tags: ['array', 'some', 'any', 'exists', 'test'],
        cheatSheetSummary: 'Returns true if at least one element passes the test. Short-circuits.',
        sections: [
          { heading: 'Overview', content: 'some() tests whether at least one element satisfies the callback. It returns true as soon as it finds a match (short-circuits), making it efficient for existence checks. On an empty array, some() returns false. It is the array equivalent of a logical OR across all elements.',
            code: `const numbers = [1, 3, 5, 7, 8, 9];

console.log(numbers.some(n => n % 2 === 0)); // true (8 is even)
console.log(numbers.some(n => n > 100));      // false

// Check if any user is admin
const users = [
  { name: 'Alice', role: 'user' },
  { name: 'Bob', role: 'admin' },
];
const hasAdmin = users.some(u => u.role === 'admin');
console.log('Has admin:', hasAdmin);

// Better than filter().length > 0
// BAD:  users.filter(u => u.role === 'admin').length > 0
// GOOD: users.some(u => u.role === 'admin')

// Empty array returns false
console.log([].some(x => true)); // false`,
            output: `true
false
Has admin: true
false`,
            tip: 'some() is more efficient than filter().length > 0 because it stops at the first match instead of checking every element.' },
        ],
        quiz: [
          {
            question: 'What does [].some(x => true) return?',
            options: ['true', 'false', 'undefined', 'It throws an error'],
            correctIndex: 1,
            explanation: 'some() returns false for an empty array because there are no elements that could satisfy the condition.',
          },
          {
            question: 'Does some() short-circuit?',
            options: ['No, it always checks every element', 'Yes, it stops at the first truthy result', 'Only for primitive arrays', 'Only when used with arrow functions'],
            correctIndex: 1,
            explanation: 'some() stops iterating as soon as the callback returns true for any element, making it efficient for existence checks.',
          },
          {
            question: 'What is the logical equivalent of some() across array elements?',
            options: ['AND (&&)', 'OR (||)', 'NOT (!)', 'XOR (^)'],
            correctIndex: 1,
            explanation: 'some() is like logical OR: it returns true if at least one element passes the test, just as OR returns true if at least one operand is true.',
          },
        ],
        challenge: {
          prompt: 'Write a function `hasPermission` that checks if a user has any of the required permissions using some(). Users have a roles array, and each role has a permissions array.',
          starterCode: `function hasPermission(user, requiredPermissions) {
  // Check if user has at least one of the required permissions
  // across all their roles
  return false;
}

const user = {
  name: 'Alice',
  roles: [
    { name: 'editor', permissions: ['read', 'write'] },
    { name: 'reviewer', permissions: ['read', 'comment'] },
  ],
};

console.log(hasPermission(user, ['delete', 'write'])); // Expected: true (has 'write')
console.log(hasPermission(user, ['delete', 'admin'])); // Expected: false`,
          solutionCode: `function hasPermission(user, requiredPermissions) {
  return requiredPermissions.some(perm =>
    user.roles.some(role => role.permissions.includes(perm))
  );
}

const user = {
  name: 'Alice',
  roles: [
    { name: 'editor', permissions: ['read', 'write'] },
    { name: 'reviewer', permissions: ['read', 'comment'] },
  ],
};

console.log(hasPermission(user, ['delete', 'write'])); // true
console.log(hasPermission(user, ['delete', 'admin'])); // false`,
          hints: [
            'Use some() on requiredPermissions to check if any required permission exists.',
            'For each required permission, use another some() on user.roles to check if any role has that permission.',
          ],
        },
      },
      {
        id: 'arr-every',
        title: 'Array.every()',
        difficulty: 'beginner',
        signature: 'arr.every(callback): boolean',
        tags: ['array', 'every', 'all', 'validate', 'test'],
        cheatSheetSummary: 'Returns true if ALL elements pass the test. Short-circuits on first failure.',
        sections: [
          { heading: 'Overview', content: 'every() tests whether all elements satisfy the callback. It returns false as soon as one element fails (short-circuits). On an empty array, every() returns true (vacuous truth). It is the array equivalent of a logical AND across all elements and is commonly used for validation.',
            code: `const numbers = [2, 4, 6, 8, 10];

console.log(numbers.every(n => n % 2 === 0)); // true (all even)
console.log(numbers.every(n => n < 10));       // false (10 fails)

// Validate form fields
const fields = [
  { name: 'email', value: 'a@b.com', valid: true },
  { name: 'name', value: 'Alice', valid: true },
  { name: 'age', value: '', valid: false },
];
const formValid = fields.every(f => f.valid);
console.log('Form valid:', formValid);

// Type checking
const allNumbers = [1, 2, 3].every(x => typeof x === 'number');
console.log('All numbers:', allNumbers);

// Empty array is vacuously true
console.log([].every(x => false)); // true`,
            output: `true
false
Form valid: false
All numbers: true
true`,
            tip: 'every() returns true for empty arrays (vacuous truth). If you need to ensure the array is non-empty, check arr.length > 0 && arr.every(...).',
            analogy: 'Think of it like a security checkpoint: every() checks each person in line and the moment one fails the check, the whole line is rejected. If the line is empty, everyone passed (vacuously).' },
        ],
        quiz: [
          {
            question: 'What does [].every(x => false) return?',
            options: ['false', 'true', 'undefined', 'It throws an error'],
            correctIndex: 1,
            explanation: 'every() returns true for an empty array (vacuous truth). Since there are no elements that fail the condition, the result is true.',
          },
          {
            question: 'Does every() short-circuit?',
            options: ['No, it always checks every element', 'Yes, it stops at the first falsy result', 'Only for arrays longer than 10 elements', 'Only when the callback is an arrow function'],
            correctIndex: 1,
            explanation: 'every() stops iterating as soon as the callback returns false for any element, making it efficient when an early element fails.',
          },
          {
            question: 'What is the relationship between some() and every()?',
            options: ['They are identical', 'every() is the logical negation of some()', '!arr.every(fn) is equivalent to arr.some(x => !fn(x))', 'some() is faster than every()'],
            correctIndex: 2,
            explanation: 'By De Morgan\'s laws: !arr.every(fn) === arr.some(x => !fn(x)), and !arr.some(fn) === arr.every(x => !fn(x)).',
          },
        ],
        challenge: {
          prompt: 'Write a function `validateForm` that takes a form object with field values and a rules object. Each rule is a function that returns true if valid. Use every() to check if all fields pass their validation rules.',
          starterCode: `function validateForm(form, rules) {
  // Check if every field in rules passes its validation
  // Return { valid: boolean, errors: string[] }
  return { valid: false, errors: [] };
}

const form = { email: 'alice@test.com', age: '15', name: '' };
const rules = {
  email: v => v.includes('@'),
  age: v => Number(v) >= 18,
  name: v => v.length > 0,
};

console.log(validateForm(form, rules));
// Expected: { valid: false, errors: ['age', 'name'] }`,
          solutionCode: `function validateForm(form, rules) {
  const errors = [];
  const valid = Object.entries(rules).every(([field, rule]) => {
    const passes = rule(form[field]);
    if (!passes) errors.push(field);
    return passes;
  });
  return { valid: errors.length === 0, errors };
}

const form = { email: 'alice@test.com', age: '15', name: '' };
const rules = {
  email: v => v.includes('@'),
  age: v => Number(v) >= 18,
  name: v => v.length > 0,
};

console.log(validateForm(form, rules));
// { valid: false, errors: ['age', 'name'] }`,
          hints: [
            'Use Object.entries(rules) to iterate over field names and their validation functions.',
            'Note: since we want to collect ALL errors, we should check each field even after failures. Consider using a loop or filter instead of relying on every() short-circuiting.',
          ],
        },
      },
      {
        id: 'arr-sort',
        title: 'Array.sort()',
        difficulty: 'intermediate',
        signature: 'arr.sort(compareFn?): T[]',
        tags: ['array', 'sort', 'order', 'compare', 'mutate'],
        cheatSheetSummary: 'Sorts in place. ALWAYS pass a comparator for numbers. Mutates.',
        sections: [
          { heading: 'Overview', content: 'sort() sorts the array in place and returns the sorted array. The critical gotcha: the default sort is lexicographic (converts to strings), which produces incorrect results for numbers. ALWAYS provide a comparator function for numeric sorting. The comparator returns negative (a before b), zero (equal), or positive (b before a).',
            code: `// DEFAULT SORT IS WRONG FOR NUMBERS!
console.log([10, 9, 2, 1, 11].sort());
// [1, 10, 11, 2, 9] — lexicographic!

// CORRECT: numeric comparator
console.log([10, 9, 2, 1, 11].sort((a, b) => a - b));
// Ascending: [1, 2, 9, 10, 11]

console.log([10, 9, 2, 1, 11].sort((a, b) => b - a));
// Descending: [11, 10, 9, 2, 1]

// Sort strings (case-insensitive)
const names = ['Charlie', 'alice', 'Bob'];
names.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(names);

// Sort objects by property
const users = [
  { name: 'Charlie', age: 35 },
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
];
users.sort((a, b) => a.age - b.age);
console.log(users.map(u => \`\${u.name}(\${u.age})\`));`,
            output: `[1, 10, 11, 2, 9]
[1, 2, 9, 10, 11]
[11, 10, 9, 2, 1]
['alice', 'Bob', 'Charlie']
['Bob(25)', 'Alice(30)', 'Charlie(35)']`,
            tip: 'Use toSorted() (ES2023) for a non-mutating sort. It returns a new sorted array: arr.toSorted((a, b) => a - b).',
            codeHighlightLines: [2, 6, 9, 23] },
        ],
        quiz: [
          {
            question: 'What does [10, 9, 2, 1, 11].sort() produce WITHOUT a comparator?',
            options: ['[1, 2, 9, 10, 11]', '[11, 10, 9, 2, 1]', '[1, 10, 11, 2, 9]', '[1, 2, 10, 11, 9]'],
            correctIndex: 2,
            explanation: 'Without a comparator, sort() converts elements to strings and sorts lexicographically. "10" comes before "2" because "1" < "2".',
          },
          {
            question: 'What comparator sorts numbers in ascending order?',
            options: ['(a, b) => b - a', '(a, b) => a - b', '(a, b) => a > b', '(a, b) => a < b'],
            correctIndex: 1,
            explanation: '(a, b) => a - b sorts in ascending order. If a < b, it returns negative (a comes first). If a > b, it returns positive (b comes first).',
          },
          {
            question: 'Does sort() mutate the original array?',
            options: ['No, it returns a new sorted array', 'Yes, it sorts in place and returns the same array', 'Only for arrays of primitives', 'Only if no comparator is provided'],
            correctIndex: 1,
            explanation: 'sort() mutates the original array in place and returns the same array reference. Use toSorted() (ES2023) for a non-mutating alternative.',
          },
          {
            question: 'What is the ES2023 non-mutating alternative to sort()?',
            options: ['sortedCopy()', 'toSorted()', 'Array.sort()', 'immutableSort()'],
            correctIndex: 1,
            explanation: 'toSorted() (ES2023) returns a new sorted array without modifying the original.',
          },
        ],
        challenge: {
          prompt: 'Write a function `multiSort` that sorts an array of objects by multiple fields. The sort criteria should be an array of { field, order } objects where order is "asc" or "desc".',
          starterCode: `function multiSort(arr, criteria) {
  // Sort by multiple fields
  // criteria: [{ field: 'age', order: 'asc' }, { field: 'name', order: 'desc' }]
  return [...arr].sort((a, b) => {
    // Compare using each criterion in order
    return 0;
  });
}

const people = [
  { name: 'Charlie', age: 30 },
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Diana', age: 25 },
];

console.log(multiSort(people, [{ field: 'age', order: 'asc' }, { field: 'name', order: 'asc' }]));
// Expected: Bob(25), Diana(25), Alice(30), Charlie(30)`,
          solutionCode: `function multiSort(arr, criteria) {
  return [...arr].sort((a, b) => {
    for (const { field, order } of criteria) {
      let cmp = a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
      if (order === 'desc') cmp = -cmp;
      if (cmp !== 0) return cmp;
    }
    return 0;
  });
}

const people = [
  { name: 'Charlie', age: 30 },
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Diana', age: 25 },
];

console.log(multiSort(people, [{ field: 'age', order: 'asc' }, { field: 'name', order: 'asc' }]));
// [Bob(25), Diana(25), Alice(30), Charlie(30)]`,
          hints: [
            'Loop through the criteria array inside the comparator. For each criterion, compare the corresponding field values.',
            'If the comparison for a criterion is not zero, return it immediately. If it is zero (tie), move to the next criterion.',
            'Negate the comparison result for descending order.',
          ],
        },
      },
      {
        id: 'arr-reverse',
        title: 'Array.reverse()',
        difficulty: 'beginner',
        signature: 'arr.reverse(): T[]',
        tags: ['array', 'reverse', 'order', 'mutate'],
        cheatSheetSummary: 'Reverses the array in place. Mutates. Use toReversed() for immutable.',
        sections: [
          { heading: 'Overview', content: 'reverse() reverses the array in place and returns the reversed array (same reference). It mutates the original. For a non-mutating version, use toReversed() (ES2023) or spread + reverse: [...arr].reverse().',
            code: `const arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]

// Non-mutating alternatives
const original = ['a', 'b', 'c'];
const reversed1 = [...original].reverse();
const reversed2 = original.toReversed(); // ES2023
console.log('Original:', original);
console.log('Reversed:', reversed1);

// Practical: reverse a string
const str = 'Hello';
const reversedStr = [...str].reverse().join('');
console.log(reversedStr); // 'olleH'

// Check palindrome
const word = 'racecar';
const isPalindrome = word === [...word].reverse().join('');
console.log(\`\${word} is palindrome: \${isPalindrome}\`);`,
            output: `[5, 4, 3, 2, 1]
Original: ['a', 'b', 'c']
Reversed: ['c', 'b', 'a']
olleH
racecar is palindrome: true`,
            tip: 'Use toReversed() (ES2023) when you need immutability. In older environments, use [...arr].reverse() to create a reversed copy.' },
        ],
        quiz: [
          {
            question: 'Does reverse() return a new array?',
            options: ['Yes, it always returns a new array', 'No, it returns the same array reference (mutated in place)', 'Only when called on a frozen array', 'It returns undefined'],
            correctIndex: 1,
            explanation: 'reverse() mutates the original array and returns the same array reference, not a copy.',
          },
          {
            question: 'How do you reverse an array without mutating the original?',
            options: ['arr.reverse(false)', 'arr.toReversed() or [...arr].reverse()', 'Array.reverse(arr)', 'arr.reversed()'],
            correctIndex: 1,
            explanation: 'Use toReversed() (ES2023) or the spread-then-reverse pattern: [...arr].reverse() to create a reversed copy.',
          },
          {
            question: 'What does [...str].reverse().join("") do when str is a string?',
            options: ['Sorts the string', 'Reverses the string', 'Removes duplicate characters', 'Converts to uppercase'],
            correctIndex: 1,
            explanation: 'Spreading a string into an array creates an array of characters, reversing it flips the order, and join("") combines them back into a reversed string.',
          },
        ],
        challenge: {
          prompt: 'Write a function `isPalindrome` that checks if a string is a palindrome (reads the same forwards and backwards), ignoring case and non-alphanumeric characters. Use array reverse().',
          starterCode: `function isPalindrome(str) {
  // Clean the string, reverse it, and compare
  return false;
}

console.log(isPalindrome('racecar'));       // Expected: true
console.log(isPalindrome('A man a plan a canal Panama'));  // Expected: true
console.log(isPalindrome('hello'));         // Expected: false
console.log(isPalindrome('Was it a car or a cat I saw?')); // Expected: true`,
          solutionCode: `function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = [...cleaned].reverse().join('');
  return cleaned === reversed;
}

console.log(isPalindrome('racecar'));       // true
console.log(isPalindrome('A man a plan a canal Panama'));  // true
console.log(isPalindrome('hello'));         // false
console.log(isPalindrome('Was it a car or a cat I saw?')); // true`,
          hints: [
            'First clean the string: convert to lowercase and remove non-alphanumeric characters using replace() with a regex.',
            'Spread the cleaned string into an array, reverse it, join it back, and compare with the cleaned string.',
          ],
        },
      },
      {
        id: 'arr-flat',
        title: 'Array.flat()',
        difficulty: 'intermediate',
        signature: 'arr.flat(depth?): T[]',
        tags: ['array', 'flat', 'flatten', 'nested', 'depth'],
        cheatSheetSummary: 'Flattens nested arrays by specified depth. Default depth is 1.',
        sections: [
          { heading: 'Overview', content: 'flat() creates a new array with all sub-array elements concatenated up to the specified depth. The default depth is 1. Use Infinity to completely flatten any level of nesting. flat() also removes empty slots (holes) in arrays. It is non-mutating and returns a new array.',
            code: `// Default: flatten one level
console.log([1, [2, 3], [4, [5]]].flat());
// [1, 2, 3, 4, [5]]

// Flatten two levels
console.log([1, [2, [3, [4]]]].flat(2));
// [1, 2, 3, [4]]

// Flatten completely
console.log([1, [2, [3, [4, [5]]]]].flat(Infinity));
// [1, 2, 3, 4, 5]

// Removes array holes
console.log([1, , 3, , 5].flat());
// [1, 3, 5]

// Practical: collect nested results
const departments = [
  { name: 'Eng', members: ['Alice', 'Bob'] },
  { name: 'Sales', members: ['Charlie', 'Dave'] },
];
const allMembers = departments.map(d => d.members).flat();
console.log(allMembers);
// Equivalent: departments.flatMap(d => d.members)`,
            output: `[1, 2, 3, 4, [5]]
[1, 2, 3, [4]]
[1, 2, 3, 4, 5]
[1, 3, 5]
['Alice', 'Bob', 'Charlie', 'Dave']`,
            tip: 'Use flat(Infinity) carefully on untrusted data — deeply nested arrays could cause performance issues. Specify an explicit depth when possible.',
            codeHighlightLines: [2, 6, 10] },
        ],
        quiz: [
          {
            question: 'What is the default depth for flat()?',
            options: ['0', '1', 'Infinity', 'It flattens all levels by default'],
            correctIndex: 1,
            explanation: 'flat() defaults to a depth of 1, meaning it only flattens one level of nesting.',
          },
          {
            question: 'How do you completely flatten a deeply nested array?',
            options: ['flat(0)', 'flat()', 'flat(Infinity)', 'flat(-1)'],
            correctIndex: 2,
            explanation: 'flat(Infinity) recursively flattens all levels of nesting, no matter how deep.',
          },
          {
            question: 'What does flat() do with array holes (empty slots)?',
            options: ['Fills them with undefined', 'Fills them with null', 'Removes them', 'Throws an error'],
            correctIndex: 2,
            explanation: 'flat() removes empty slots (holes) from arrays, effectively cleaning up sparse arrays.',
          },
        ],
        challenge: {
          prompt: 'Write a function `deepFlatten` that flattens an arbitrarily nested array WITHOUT using flat(). Use recursion and reduce() instead.',
          starterCode: `function deepFlatten(arr) {
  // Flatten without using flat()
  // Use recursion + reduce or concat
  return [];
}

console.log(deepFlatten([1, [2, [3, [4, [5]]]]]));
// Expected: [1, 2, 3, 4, 5]
console.log(deepFlatten([[1, 2], [3, [4, 5]], 6]));
// Expected: [1, 2, 3, 4, 5, 6]`,
          solutionCode: `function deepFlatten(arr) {
  return arr.reduce((acc, item) => {
    if (Array.isArray(item)) {
      return acc.concat(deepFlatten(item));
    }
    return acc.concat(item);
  }, []);
}

console.log(deepFlatten([1, [2, [3, [4, [5]]]]]));
// [1, 2, 3, 4, 5]
console.log(deepFlatten([[1, 2], [3, [4, 5]], 6]));
// [1, 2, 3, 4, 5, 6]`,
          hints: [
            'Use reduce() with an empty array as the initial accumulator.',
            'For each element, check if it is an array using Array.isArray(). If so, recursively flatten it and concat the result.',
          ],
        },
      },
      {
        id: 'arr-flatMap',
        title: 'Array.flatMap()',
        difficulty: 'intermediate',
        signature: 'arr.flatMap(callback): U[]',
        tags: ['array', 'flatMap', 'map', 'flatten', 'transform'],
        cheatSheetSummary: 'Maps each element then flattens one level. Equivalent to map().flat(1).',
        sections: [
          { heading: 'Overview', content: 'flatMap() maps each element using a callback and then flattens the result by one level. It is equivalent to map() followed by flat(1) but more efficient as it does both in a single pass. flatMap() is especially useful when the mapping function returns arrays, such as splitting strings or expanding items.',
            code: `// Split sentences into words
const sentences = ['hello world', 'foo bar baz'];
const words = sentences.flatMap(s => s.split(' '));
console.log(words);

// Expand items (one-to-many mapping)
const items = [
  { name: 'A', tags: ['x', 'y'] },
  { name: 'B', tags: ['y', 'z'] },
];
const expanded = items.flatMap(item =>
  item.tags.map(tag => ({ name: item.name, tag }))
);
console.log(expanded);

// Filter and transform in one step
const numbers = [1, 2, 3, 4, 5];
const evenDoubled = numbers.flatMap(n =>
  n % 2 === 0 ? [n * 2] : []
);
console.log(evenDoubled); // [4, 8]

// Duplicate elements
console.log([1, 2, 3].flatMap(n => [n, n]));`,
            output: `['hello', 'world', 'foo', 'bar', 'baz']
[{name:'A',tag:'x'},{name:'A',tag:'y'},{name:'B',tag:'y'},{name:'B',tag:'z'}]
[4, 8]
[1, 1, 2, 2, 3, 3]`,
            tip: 'flatMap() only flattens one level. If your callback returns nested arrays, you will need .flat() as well.',
            analogy: 'Think of it like a one-to-many translation: each input word can expand into multiple output words (or none), and the results are concatenated into a single flat sentence.',
            codeHighlightLines: [3, 11, 12, 18, 19] },
        ],
        quiz: [
          {
            question: 'What is flatMap() equivalent to?',
            options: ['map().flat()', 'flat().map()', 'map().flat(1)', 'map().flat(Infinity)'],
            correctIndex: 2,
            explanation: 'flatMap() is equivalent to map() followed by flat(1). It maps each element and then flattens the result by one level.',
          },
          {
            question: 'How can flatMap() be used to filter and transform in one step?',
            options: ['Return null for filtered items', 'Return undefined for filtered items', 'Return an empty array [] for filtered items', 'Throw an error for filtered items'],
            correctIndex: 2,
            explanation: 'Return an empty array [] for items you want to exclude and [transformedValue] for items you want to keep. flatMap flattens both cases into a single result array.',
          },
          {
            question: 'How many levels does flatMap() flatten?',
            options: ['0', '1', '2', 'Infinity'],
            correctIndex: 1,
            explanation: 'flatMap() only flattens one level of nesting. If the callback returns deeply nested arrays, additional flattening is needed.',
          },
        ],
        challenge: {
          prompt: 'Write a function `expandRanges` that takes an array of range strings like "1-3" and individual numbers like "5", and expands them into a flat array of numbers using flatMap().',
          starterCode: `function expandRanges(ranges) {
  // Use flatMap to expand range strings into individual numbers
  // "1-3" -> [1, 2, 3], "5" -> [5]
  return [];
}

console.log(expandRanges(['1-3', '5', '7-9']));
// Expected: [1, 2, 3, 5, 7, 8, 9]
console.log(expandRanges(['10-12', '15', '20-22']));
// Expected: [10, 11, 12, 15, 20, 21, 22]`,
          solutionCode: `function expandRanges(ranges) {
  return ranges.flatMap(range => {
    if (range.includes('-')) {
      const [start, end] = range.split('-').map(Number);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
    return [Number(range)];
  });
}

console.log(expandRanges(['1-3', '5', '7-9']));
// [1, 2, 3, 5, 7, 8, 9]
console.log(expandRanges(['10-12', '15', '20-22']));
// [10, 11, 12, 15, 20, 21, 22]`,
          hints: [
            'Use flatMap() on the ranges array. Check if each range contains a "-" to determine if it is a range or a single number.',
            'For ranges, split on "-", parse the start and end, and use Array.from() to generate the sequence.',
          ],
        },
      },
      {
        id: 'arr-fill',
        title: 'Array.fill()',
        difficulty: 'beginner',
        signature: 'arr.fill(value, start?, end?): T[]',
        tags: ['array', 'fill', 'initialize', 'replace', 'mutate'],
        cheatSheetSummary: 'Fills array elements with a static value. Mutates.',
        sections: [
          { heading: 'Overview', content: 'fill() changes all elements in an array (or a range of elements) to a static value. It mutates the original array and returns it. The optional start and end parameters define the range to fill. fill() is commonly used to initialize arrays with default values.',
            code: `// Fill entire array
const arr = new Array(5).fill(0);
console.log(arr); // [0, 0, 0, 0, 0]

// Fill a range
const nums = [1, 2, 3, 4, 5];
nums.fill(99, 1, 4);
console.log(nums); // [1, 99, 99, 99, 5]

// Initialize a grid (CAREFUL with objects!)
// WRONG: all rows are the same reference
const bad = new Array(3).fill([0, 0, 0]);
bad[0][0] = 1;
console.log(bad); // [[1,0,0],[1,0,0],[1,0,0]] — all changed!

// CORRECT: use Array.from with map
const good = Array.from({ length: 3 }, () => [0, 0, 0]);
good[0][0] = 1;
console.log(good); // [[1,0,0],[0,0,0],[0,0,0]] — independent!`,
            output: `[0, 0, 0, 0, 0]
[1, 99, 99, 99, 5]
[[1,0,0],[1,0,0],[1,0,0]]
[[1,0,0],[0,0,0],[0,0,0]]`,
            tip: 'Never use fill() with objects or arrays — all elements share the same reference. Use Array.from({ length: n }, () => newObj()) instead.',
            codeHighlightLines: [2, 7, 12, 17] },
        ],
        quiz: [
          {
            question: 'Why is new Array(3).fill([]) dangerous?',
            options: ['It creates 3 empty arrays', 'All 3 elements share the same array reference', 'fill() does not work with arrays', 'It throws a TypeError'],
            correctIndex: 1,
            explanation: 'fill() assigns the same reference to every element. All 3 slots point to the exact same array object, so modifying one modifies all.',
          },
          {
            question: 'What does fill() return?',
            options: ['undefined', 'The new length', 'A new filled array', 'The modified original array'],
            correctIndex: 3,
            explanation: 'fill() mutates the original array and returns the same array reference, not a copy.',
          },
          {
            question: 'What does [1, 2, 3, 4, 5].fill(0, 2, 4) produce?',
            options: ['[0, 0, 0, 0, 0]', '[1, 2, 0, 0, 5]', '[1, 2, 0, 0, 0]', '[0, 0, 3, 4, 5]'],
            correctIndex: 1,
            explanation: 'fill(0, 2, 4) fills with 0 from index 2 (inclusive) to index 4 (exclusive), resulting in [1, 2, 0, 0, 5].',
          },
        ],
        challenge: {
          prompt: 'Write a function `createMatrix` that creates an m x n matrix (2D array) filled with a specified value. Do NOT use fill() with arrays directly (to avoid the shared reference bug).',
          starterCode: `function createMatrix(rows, cols, value) {
  // Create a rows x cols matrix filled with value
  // Avoid the fill() reference bug!
  return [];
}

const matrix = createMatrix(3, 4, 0);
console.log(matrix);
// Expected: [[0,0,0,0], [0,0,0,0], [0,0,0,0]]

matrix[0][0] = 1;
console.log(matrix);
// Expected: [[1,0,0,0], [0,0,0,0], [0,0,0,0]]
// (only first row changed, not all rows)`,
          solutionCode: `function createMatrix(rows, cols, value) {
  return Array.from({ length: rows }, () =>
    new Array(cols).fill(value)
  );
}

const matrix = createMatrix(3, 4, 0);
console.log(matrix);
// [[0,0,0,0], [0,0,0,0], [0,0,0,0]]

matrix[0][0] = 1;
console.log(matrix);
// [[1,0,0,0], [0,0,0,0], [0,0,0,0]]`,
          hints: [
            'Use Array.from() with a mapping function to create independent row arrays for each row.',
            'fill() is safe for primitive values within each row. The bug only occurs when fill() is used with objects or arrays as the fill value.',
          ],
        },
      },
      {
        id: 'arr-from',
        title: 'Array.from()',
        difficulty: 'intermediate',
        signature: 'Array.from(iterable, mapFn?): T[]',
        tags: ['array', 'from', 'convert', 'create', 'iterable'],
        cheatSheetSummary: 'Creates array from iterable or array-like. Optional map function.',
        sections: [
          { heading: 'Overview', content: 'Array.from() creates a new array from an iterable or array-like object. An optional second argument provides a map function applied during creation (more efficient than separate Array.from + map). It is commonly used to create arrays from strings, NodeLists, Sets, Maps, and to generate sequences.',
            code: `// From string
console.log(Array.from('Hello'));

// From Set
console.log(Array.from(new Set([1, 2, 2, 3])));

// Generate a range
const range = Array.from({ length: 5 }, (_, i) => i + 1);
console.log('Range:', range);

// Generate sequence with formula
const squares = Array.from({ length: 5 }, (_, i) => (i + 1) ** 2);
console.log('Squares:', squares);

// Create 2D grid
const grid = Array.from({ length: 3 }, (_, row) =>
  Array.from({ length: 3 }, (_, col) => row * 3 + col)
);
console.log('Grid:', grid);

// From Map
const map = new Map([['a', 1], ['b', 2]]);
console.log(Array.from(map));

// From array-like (NodeList in browsers)
// const divs = Array.from(document.querySelectorAll('div'));`,
            output: `['H', 'e', 'l', 'l', 'o']
[1, 2, 3]
Range: [1, 2, 3, 4, 5]
Squares: [1, 4, 9, 16, 25]
Grid: [[0,1,2],[3,4,5],[6,7,8]]
[['a',1],['b',2]]`,
            tip: 'Array.from({ length: n }, mapFn) is the cleanest way to generate a sequence. It replaces the old Array(n).fill().map() pattern.',
            codeHighlightLines: [8, 12, 16, 17] },
        ],
      },
      {
        id: 'arr-isArray',
        title: 'Array.isArray()',
        difficulty: 'beginner',
        signature: 'Array.isArray(value): boolean',
        tags: ['array', 'isArray', 'type-check', 'validate'],
        cheatSheetSummary: 'Returns true if value is an array. Reliable type check.',
        sections: [
          { heading: 'Overview', content: 'Array.isArray() determines whether the passed value is an Array. It is the most reliable way to check for arrays because typeof returns "object" for both arrays and plain objects. It works correctly across different execution contexts (like iframes) where instanceof Array may fail.',
            code: `// typeof is unreliable for arrays
console.log(typeof []);       // 'object'
console.log(typeof {});       // 'object'
console.log(typeof null);     // 'object'

// Array.isArray is reliable
console.log(Array.isArray([]));          // true
console.log(Array.isArray([1, 2, 3]));   // true
console.log(Array.isArray({}));          // false
console.log(Array.isArray('hello'));     // false
console.log(Array.isArray(null));        // false
console.log(Array.isArray(undefined));   // false

// Practical: normalize to array
function toArray(input) {
  if (Array.isArray(input)) return input;
  return [input];
}
console.log(toArray([1, 2]));  // [1, 2]
console.log(toArray(42));      // [42]
console.log(toArray('hello')); // ['hello']`,
            output: `object
object
object
true
true
false
false
false
false
[1, 2]
[42]
['hello']`,
            tip: 'Always use Array.isArray() instead of instanceof Array. instanceof can fail across iframe boundaries where each frame has its own Array constructor.',
            codeHighlightLines: [2, 3, 4, 7, 16] },
        ],
      },
    ],
  },
];

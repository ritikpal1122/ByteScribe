import type { DocCategory } from './types';

// Part 4: List Methods + Tuple Methods
export const PART4_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  List Methods                                                 */
  /* ------------------------------------------------------------ */
  {
    id: 'list-methods',
    label: 'List Methods',
    icon: 'Layers',
    entries: [
      {
        id: 'list-append',
        title: 'append() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'list.append(element) adds a single element to the end of the list. It modifies the list in place and returns None. The element can be of any type including another list, in which case it is added as a single nested item rather than having its contents merged.',
            code: `# Signature
list.append(element)

# Parameters:
#   element — the item to add to the end of the list`,
            diagram: {
              kind: 'custom',
              type: 'array',
              data: {
                values: ['"apple"', '"banana"', '"cherry"'],
                highlightIndices: [2],
                title: 'After fruits.append("cherry")',
              },
              caption: 'append() always adds the new element at the end (rightmost position)',
            },
          },
          {
            heading: 'Examples',
            content:
              'Appending different types of elements to a list.',
            code: `fruits = ["apple", "banana"]
fruits.append("cherry")
print(fruits)

numbers = [1, 2, 3]
numbers.append([4, 5])
print(numbers)

mixed = []
mixed.append(42)
mixed.append("hello")
mixed.append(True)
print(mixed)`,
            output: `['apple', 'banana', 'cherry']
[1, 2, 3, [4, 5]]
[42, 'hello', True]`,
            tip: 'If you want to add multiple items from another iterable, use extend() instead. append() with a list creates a nested list.',
            analogy: 'Think of it like adding a new person to the back of a queue -- they always join at the end, and the line grows by exactly one.',
            codeHighlightLines: [2, 6],
          },
        ],
        quiz: [
          {
            question: 'What does list.append() return?',
            options: [
              'The updated list',
              'The appended element',
              'None',
              'The length of the list after appending',
            ],
            correctIndex: 2,
            explanation:
              'append() modifies the list in place and always returns None. It does not return the list or the element.',
          },
          {
            question: 'What is the result of [1, 2, 3].append([4, 5]) when you print the list?',
            options: [
              '[1, 2, 3, 4, 5]',
              '[1, 2, 3, [4, 5]]',
              '[[1, 2, 3], [4, 5]]',
              'TypeError: cannot append a list',
            ],
            correctIndex: 1,
            explanation:
              'append() adds the argument as a single element. Passing a list creates a nested list [1, 2, 3, [4, 5]]. Use extend() to merge lists.',
          },
          {
            question: 'How many elements does the list have after: x = []; x.append("a"); x.append("b"); x.append("c")?',
            options: ['0', '1', '2', '3'],
            correctIndex: 3,
            explanation:
              'Each call to append() adds exactly one element. After three calls, the list contains 3 elements: ["a", "b", "c"].',
          },
          {
            question: 'Which of the following is equivalent to my_list.append(item)?',
            options: [
              'my_list = my_list + item',
              'my_list[len(my_list):] = [item]',
              'my_list.extend(item)',
              'my_list.insert(0, item)',
            ],
            correctIndex: 1,
            explanation:
              'Slice assignment my_list[len(my_list):] = [item] inserts item at the end, which is equivalent to append(). extend() would try to iterate over item, and insert(0, item) adds to the front.',
          },
        ],
        challenge: {
          prompt:
            'Write a function build_squares that takes an integer n and returns a list of the squares of numbers from 1 to n (inclusive), built using append().',
          starterCode: `def build_squares(n):
    # TODO: Create an empty list
    # TODO: Loop from 1 to n (inclusive)
    # TODO: Append the square of each number to the list
    # TODO: Return the list
    pass

# Test
print(build_squares(5))   # [1, 4, 9, 16, 25]
print(build_squares(3))   # [1, 4, 9]`,
          solutionCode: `def build_squares(n):
    squares = []
    for i in range(1, n + 1):
        squares.append(i ** 2)
    return squares

# Test
print(build_squares(5))   # [1, 4, 9, 16, 25]
print(build_squares(3))   # [1, 4, 9]`,
          hints: [
            'Start by creating an empty list with squares = [].',
            'Use range(1, n + 1) to loop from 1 to n inclusive.',
            'Inside the loop, append i ** 2 (or i * i) to the list.',
          ],
        },
      },
      {
        id: 'list-clear',
        title: 'clear() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'list.clear() removes all items from the list, leaving it empty. It modifies the list in place and returns None. This is equivalent to del list[:] or assigning an empty slice.',
            code: `# Signature
list.clear()

# Parameters: none`,
          },
          {
            heading: 'Examples',
            content:
              'Clearing lists in different scenarios.',
            code: `tasks = ["email", "report", "meeting"]
print("Before:", tasks)
tasks.clear()
print("After:", tasks)
print("Length:", len(tasks))

# clear() keeps the same list object
original = [1, 2, 3]
alias = original
original.clear()
print("Alias:", alias)`,
            output: `Before: ['email', 'report', 'meeting']
After: []
Length: 0
Alias: []`,
            analogy: 'Think of it like erasing a whiteboard -- the board (list object) remains, but all content is wiped clean.',
          },
        ],
        quiz: [
          {
            question: 'What does list.clear() return?',
            options: [
              'An empty list []',
              'The original list before clearing',
              'None',
              'True if items were removed, False otherwise',
            ],
            correctIndex: 2,
            explanation:
              'clear() modifies the list in place and returns None. It does not return the emptied list or any status value.',
          },
          {
            question: 'After a = [1,2,3]; b = a; a.clear(), what is b?',
            options: ['[1, 2, 3]', '[]', 'None', 'Raises an error'],
            correctIndex: 1,
            explanation:
              'b is an alias for the same list object as a. When a.clear() empties the list in place, b also sees the empty list because they reference the same object.',
          },
          {
            question: 'Which of the following is NOT equivalent to my_list.clear()?',
            options: [
              'del my_list[:]',
              'my_list[:] = []',
              'my_list = []',
              'while my_list: my_list.pop()',
            ],
            correctIndex: 2,
            explanation:
              'my_list = [] creates a new empty list object and rebinds the variable. The original list object (and any aliases) remain unchanged. The other options all modify the existing list in place.',
          },
          {
            question: 'What is len(x) after x = [1, 2, 3]; x.clear()?',
            options: ['3', '1', '0', 'None'],
            correctIndex: 2,
            explanation:
              'clear() removes all items from the list, leaving it with length 0.',
          },
        ],
        challenge: {
          prompt:
            'Write a function reset_if_too_long that takes a list and a maximum length. If the list has more items than the max, clear it and return True. Otherwise leave it alone and return False.',
          starterCode: `def reset_if_too_long(lst, max_length):
    # TODO: Check if the list length exceeds max_length
    # TODO: If so, clear the list and return True
    # TODO: Otherwise return False
    pass

# Test
data = [1, 2, 3, 4, 5]
print(reset_if_too_long(data, 3))   # True
print(data)                          # []

data2 = [1, 2]
print(reset_if_too_long(data2, 5))  # False
print(data2)                         # [1, 2]`,
          solutionCode: `def reset_if_too_long(lst, max_length):
    if len(lst) > max_length:
        lst.clear()
        return True
    return False

# Test
data = [1, 2, 3, 4, 5]
print(reset_if_too_long(data, 3))   # True
print(data)                          # []

data2 = [1, 2]
print(reset_if_too_long(data2, 5))  # False
print(data2)                         # [1, 2]`,
          hints: [
            'Use len(lst) to check the current length of the list.',
            'Call lst.clear() to empty the list in place so the caller sees the change.',
            'Return True after clearing, or False if no clearing was needed.',
          ],
        },
      },
      {
        id: 'list-copy',
        title: 'copy() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'list.copy() returns a shallow copy of the list. The new list is a different object but contains references to the same elements. For lists of immutable types (int, str, tuple) this behaves like a full copy. For nested mutable objects, changes to the inner objects will be reflected in both lists.',
            code: `# Signature
list.copy()

# Parameters: none
# Returns: a new list with the same elements`,
          },
          {
            heading: 'Examples',
            content:
              'Demonstrating shallow copy behaviour.',
            code: `original = [1, 2, 3]
duplicate = original.copy()
duplicate.append(4)
print("Original:", original)
print("Duplicate:", duplicate)

# Shallow copy — nested objects are shared
nested = [[1, 2], [3, 4]]
shallow = nested.copy()
shallow[0].append(99)
print("Nested original:", nested)
print("Shallow copy:", shallow)`,
            output: `Original: [1, 2, 3]
Duplicate: [1, 2, 3, 4]
Nested original: [[1, 2, 99], [3, 4]]
Shallow copy: [[1, 2, 99], [3, 4]]`,
            tip: 'For a full deep copy of nested structures, use copy.deepcopy() from the copy module.',
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    A["original"] --> L1["[1, 2, 3]"]
    B["duplicate = original.copy()"] --> L2["[1, 2, 3]"]
    L1 -. "separate objects" .-> L2
    C["nested"] --> N1["[[1,2], [3,4]]"]
    D["shallow = nested.copy()"] --> N2["[ref, ref]"]
    N1 -- "shared inner lists" --> INNER["[1,2]  [3,4]"]
    N2 -- "shared inner lists" --> INNER`,
              caption: 'Shallow copy creates a new outer list, but inner mutable objects are still shared references',
            },
            codeHighlightLines: [2, 9, 10],
          },
        ],
        quiz: [
          {
            question: 'What kind of copy does list.copy() create?',
            options: [
              'A deep copy (all nested objects are duplicated)',
              'A shallow copy (new outer list, shared inner references)',
              'An alias (same object, different variable name)',
              'A frozen copy (immutable version of the list)',
            ],
            correctIndex: 1,
            explanation:
              'list.copy() creates a shallow copy: a new list object is created, but the elements inside still reference the same objects as the original.',
          },
          {
            question: 'Given a = [[1,2]]; b = a.copy(); b[0].append(3), what is a?',
            options: [
              '[[1, 2]]',
              '[[1, 2, 3]]',
              '[[1, 2], [3]]',
              'Raises an error',
            ],
            correctIndex: 1,
            explanation:
              'Since copy() is shallow, a[0] and b[0] reference the same inner list. Modifying b[0] also modifies a[0], so a becomes [[1, 2, 3]].',
          },
          {
            question: 'Which of the following is NOT equivalent to my_list.copy()?',
            options: [
              'my_list[:]',
              'list(my_list)',
              'my_list',
              '[x for x in my_list]',
            ],
            correctIndex: 2,
            explanation:
              'my_list without any copy operation just creates another reference to the same object, not a copy. The other three all create new list objects with the same elements (shallow copies).',
          },
        ],
        challenge: {
          prompt:
            'Write a function safe_modify that takes a list of numbers, creates a copy, doubles every element in the copy, and returns the copy -- without changing the original list.',
          starterCode: `def safe_modify(numbers):
    # TODO: Create a copy of the list
    # TODO: Double each element in the copy (multiply by 2)
    # TODO: Return the modified copy
    pass

# Test
original = [1, 2, 3, 4]
result = safe_modify(original)
print(result)     # [2, 4, 6, 8]
print(original)   # [1, 2, 3, 4]  (unchanged)`,
          solutionCode: `def safe_modify(numbers):
    doubled = numbers.copy()
    for i in range(len(doubled)):
        doubled[i] *= 2
    return doubled

# Test
original = [1, 2, 3, 4]
result = safe_modify(original)
print(result)     # [2, 4, 6, 8]
print(original)   # [1, 2, 3, 4]  (unchanged)`,
          hints: [
            'Use numbers.copy() to create a shallow copy so the original is not modified.',
            'Loop through the copy by index and multiply each element by 2.',
            'Return the modified copy at the end.',
          ],
        },
      },
      {
        id: 'list-count',
        title: 'count() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'list.count(element) returns the number of times the specified element appears in the list. It uses equality comparison (==) to match elements. If the element is not found, it returns 0.',
            code: `# Signature
list.count(element)

# Parameters:
#   element — the value to count
# Returns: int`,
          },
          {
            heading: 'Examples',
            content:
              'Counting occurrences of different element types.',
            code: `colors = ["red", "blue", "red", "green", "red"]
print(colors.count("red"))
print(colors.count("yellow"))

numbers = [1, 2, 2, 3, 2, 4, 2]
print(numbers.count(2))

booleans = [True, False, True, True]
print(booleans.count(True))`,
            output: `3
0
4
3`,
          },
        ],
        quiz: [
          {
            question: 'What does [1, 2, 2, 3].count(2) return?',
            options: ['1', '2', '3', '4'],
            correctIndex: 1,
            explanation:
              'The value 2 appears exactly twice in the list [1, 2, 2, 3], so count() returns 2.',
          },
          {
            question: 'What does [1, 2, 3].count(99) return?',
            options: ['None', '-1', '0', 'Raises ValueError'],
            correctIndex: 2,
            explanation:
              'When the element is not found, count() returns 0. It does not raise an error or return a sentinel value like -1.',
          },
          {
            question: 'What does [True, 1, False, 0].count(True) return?',
            options: ['1', '2', '3', '4'],
            correctIndex: 1,
            explanation:
              'In Python, True == 1 evaluates to True, so count(True) matches both True and 1, returning 2.',
          },
          {
            question: 'Which statement about count() is correct?',
            options: [
              'It returns the index of the element',
              'It modifies the list by removing counted elements',
              'It uses == equality to compare elements',
              'It raises TypeError for unhashable elements',
            ],
            correctIndex: 2,
            explanation:
              'count() uses the == equality operator to match elements. It does not modify the list, return indices, or require hashability.',
          },
        ],
        challenge: {
          prompt:
            'Write a function most_frequent that takes a list and returns the element that appears most often. If there is a tie, return any one of the most frequent elements.',
          starterCode: `def most_frequent(lst):
    # TODO: Track the element with the highest count
    # TODO: Use list.count() for each unique element
    # TODO: Return the most frequent element
    pass

# Test
print(most_frequent([1, 2, 2, 3, 3, 3, 4]))  # 3
print(most_frequent(["a", "b", "a", "c"]))    # "a"`,
          solutionCode: `def most_frequent(lst):
    best = lst[0]
    best_count = lst.count(best)
    for item in set(lst):
        c = lst.count(item)
        if c > best_count:
            best = item
            best_count = c
    return best

# Test
print(most_frequent([1, 2, 2, 3, 3, 3, 4]))  # 3
print(most_frequent(["a", "b", "a", "c"]))    # "a"`,
          hints: [
            'Iterate over the unique elements using set(lst) to avoid counting duplicates.',
            'For each unique element, call lst.count(element) and track the highest count.',
            'Keep updating a best variable whenever you find a higher count.',
          ],
        },
      },
      {
        id: 'list-extend',
        title: 'extend() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'list.extend(iterable) appends all items from the given iterable to the end of the list. It modifies the list in place and returns None. The iterable can be a list, tuple, set, string, or any other iterable object.',
            code: `# Signature
list.extend(iterable)

# Parameters:
#   iterable — any iterable whose items will be appended`,
            diagram: {
              kind: 'custom',
              type: 'array',
              data: {
                values: ['1', '2', '3', '4', '5', '6'],
                highlightIndices: [3, 4, 5],
                title: 'After [1,2,3].extend([4,5,6])',
              },
              caption: 'extend() unpacks the iterable and appends each element individually (highlighted: new elements)',
            },
          },
          {
            heading: 'Examples',
            content:
              'Extending a list with different iterable types.',
            code: `nums = [1, 2, 3]
nums.extend([4, 5, 6])
print(nums)

letters = ["a", "b"]
letters.extend(("c", "d"))
print(letters)

chars = ["x"]
chars.extend("hello")
print(chars)`,
            output: `[1, 2, 3, 4, 5, 6]
['a', 'b', 'c', 'd']
['x', 'h', 'e', 'l', 'l', 'o']`,
            tip: 'extend() is equivalent to list += iterable. Both unpack the iterable and add each item individually.',
            codeHighlightLines: [2, 6, 10],
          },
        ],
        quiz: [
          {
            question: 'What does list.extend() return?',
            options: [
              'The extended list',
              'The number of items added',
              'None',
              'A new combined list',
            ],
            correctIndex: 2,
            explanation:
              'Like all in-place list mutation methods, extend() modifies the list directly and returns None.',
          },
          {
            question: 'What is the result of x = [1]; x.extend("hi"); print(x)?',
            options: [
              '[1, "hi"]',
              '[1, "h", "i"]',
              'TypeError',
              '[1, ["h", "i"]]',
            ],
            correctIndex: 1,
            explanation:
              'extend() iterates over the argument. Strings are iterable, so "hi" is unpacked into individual characters "h" and "i", giving [1, "h", "i"].',
          },
          {
            question: 'What is the difference between append([4,5]) and extend([4,5])?',
            options: [
              'They do the same thing',
              'append adds [4,5] as one nested element; extend adds 4 and 5 separately',
              'extend adds [4,5] as one nested element; append adds 4 and 5 separately',
              'append raises an error when given a list',
            ],
            correctIndex: 1,
            explanation:
              'append() adds its argument as a single element (creating a nested list), while extend() iterates over its argument and adds each item individually.',
          },
        ],
        challenge: {
          prompt:
            'Write a function merge_sorted that takes two already-sorted lists and returns a new sorted list containing all elements from both, using extend() to combine them and sort() to order the result.',
          starterCode: `def merge_sorted(list1, list2):
    # TODO: Create a copy of list1 so we don't modify the original
    # TODO: Extend the copy with list2
    # TODO: Sort the combined list
    # TODO: Return the sorted result
    pass

# Test
print(merge_sorted([1, 3, 5], [2, 4, 6]))   # [1, 2, 3, 4, 5, 6]
print(merge_sorted([10, 20], [5, 15, 25]))   # [5, 10, 15, 20, 25]`,
          solutionCode: `def merge_sorted(list1, list2):
    result = list1.copy()
    result.extend(list2)
    result.sort()
    return result

# Test
print(merge_sorted([1, 3, 5], [2, 4, 6]))   # [1, 2, 3, 4, 5, 6]
print(merge_sorted([10, 20], [5, 15, 25]))   # [5, 10, 15, 20, 25]`,
          hints: [
            'Use list1.copy() to avoid modifying the original list.',
            'Call result.extend(list2) to add all elements from the second list.',
            'Use result.sort() to sort the combined list in ascending order.',
          ],
        },
      },
      {
        id: 'list-index',
        title: 'index() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'list.index(element, start, end) returns the zero-based index of the first occurrence of the specified element. The optional start and end parameters limit the search to a slice of the list. Raises ValueError if the element is not found.',
            code: `# Signature
list.index(element, start=0, end=len(list))

# Parameters:
#   element — the value to search for
#   start   — (optional) index to begin searching
#   end     — (optional) index to stop searching (exclusive)
# Returns: int`,
          },
          {
            heading: 'Examples',
            content:
              'Finding elements in a list with and without slice bounds.',
            code: `fruits = ["apple", "banana", "cherry", "banana", "date"]
print(fruits.index("banana"))
print(fruits.index("banana", 2))

numbers = [10, 20, 30, 20, 40]
print(numbers.index(20))
print(numbers.index(20, 2, 5))`,
            output: `1
3
1
3`,
            analogy: 'Think of it like asking "where is the first occurrence of this item?" in a numbered shelf -- it scans left to right and returns the position number.',
          },
        ],
        quiz: [
          {
            question: 'What does ["a","b","c","b"].index("b") return?',
            options: ['0', '1', '3', '[1, 3]'],
            correctIndex: 1,
            explanation:
              'index() returns the position of the first occurrence. "b" first appears at index 1, so that is what is returned.',
          },
          {
            question: 'What happens when you call [1, 2, 3].index(99)?',
            options: [
              'Returns -1',
              'Returns None',
              'Raises ValueError',
              'Raises IndexError',
            ],
            correctIndex: 2,
            explanation:
              'When the element is not found in the list, index() raises a ValueError. It does not return -1 or None.',
          },
          {
            question: 'What does [10, 20, 30, 20].index(20, 2) return?',
            options: ['1', '2', '3', 'Raises ValueError'],
            correctIndex: 2,
            explanation:
              'The start parameter 2 tells index() to begin searching from index 2. It skips the 20 at index 1 and finds the 20 at index 3.',
          },
        ],
        challenge: {
          prompt:
            'Write a function find_all_indices that takes a list and a target value, and returns a list of all indices where the target appears. Use the index() method with the start parameter to find successive occurrences.',
          starterCode: `def find_all_indices(lst, target):
    # TODO: Create an empty list to store indices
    # TODO: Use a loop with index() and start parameter
    #       to find each occurrence
    # TODO: Handle ValueError when no more occurrences exist
    # TODO: Return the list of indices
    pass

# Test
print(find_all_indices([1, 2, 3, 2, 4, 2], 2))   # [1, 3, 5]
print(find_all_indices(["a", "b", "a"], "a"))      # [0, 2]
print(find_all_indices([1, 2, 3], 99))             # []`,
          solutionCode: `def find_all_indices(lst, target):
    indices = []
    start = 0
    while True:
        try:
            idx = lst.index(target, start)
            indices.append(idx)
            start = idx + 1
        except ValueError:
            break
    return indices

# Test
print(find_all_indices([1, 2, 3, 2, 4, 2], 2))   # [1, 3, 5]
print(find_all_indices(["a", "b", "a"], "a"))      # [0, 2]
print(find_all_indices([1, 2, 3], 99))             # []`,
          hints: [
            'Use a while True loop and catch ValueError to know when to stop.',
            'After finding an index, set start to idx + 1 so the next search begins after the found position.',
            'Append each found index to your result list.',
          ],
        },
      },
      {
        id: 'list-insert',
        title: 'insert() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'list.insert(index, element) inserts the element at the given position. All existing elements from that position onward are shifted to the right. It modifies the list in place and returns None. If the index is greater than the list length, the element is appended at the end.',
            code: `# Signature
list.insert(index, element)

# Parameters:
#   index   — position at which to insert (0-based)
#   element — the item to insert`,
            diagram: {
              kind: 'custom',
              type: 'array',
              data: {
                values: ['"Python"', '"Go"', '"Java"', '"C++"'],
                highlightIndices: [1],
                title: 'After languages.insert(1, "Go")',
              },
              caption: 'insert() places the new element at the specified index and shifts everything after it to the right',
            },
          },
          {
            heading: 'Examples',
            content:
              'Inserting elements at various positions.',
            code: `languages = ["Python", "Java", "C++"]
languages.insert(1, "Go")
print(languages)

languages.insert(0, "Rust")
print(languages)

languages.insert(100, "Zig")
print(languages)`,
            output: `['Python', 'Go', 'Java', 'C++']
['Rust', 'Python', 'Go', 'Java', 'C++']
['Rust', 'Python', 'Go', 'Java', 'C++', 'Zig']`,
            tip: 'Inserting at index 0 adds to the front. For frequent front insertions, consider collections.deque which offers O(1) appendleft().',
            codeHighlightLines: [2, 5, 8],
          },
        ],
        quiz: [
          {
            question: 'What does list.insert() return?',
            options: [
              'The inserted element',
              'The new length of the list',
              'The modified list',
              'None',
            ],
            correctIndex: 3,
            explanation:
              'insert() modifies the list in place and returns None, like other in-place list mutation methods.',
          },
          {
            question: 'What happens when you call [1, 2, 3].insert(100, 99)?',
            options: [
              'Raises IndexError',
              'Inserts 99 at the end, giving [1, 2, 3, 99]',
              'Pads the list with None up to index 100',
              'Inserts 99 at index 2',
            ],
            correctIndex: 1,
            explanation:
              'When the index exceeds the list length, insert() simply appends the element at the end rather than raising an error.',
          },
          {
            question: 'After x = ["b","c"]; x.insert(0, "a"), what is x?',
            options: [
              '["b", "c", "a"]',
              '["a", "b", "c"]',
              '["b", "a", "c"]',
              '["a"]',
            ],
            correctIndex: 1,
            explanation:
              'insert(0, "a") places "a" at the very beginning of the list, shifting all existing elements to the right.',
          },
          {
            question: 'What is the time complexity of list.insert(0, element)?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
            correctIndex: 2,
            explanation:
              'Inserting at the beginning requires shifting all existing elements one position to the right, which takes O(n) time.',
          },
        ],
        challenge: {
          prompt:
            'Write a function insert_sorted that takes a sorted list and a new value, and inserts the value at the correct position to keep the list sorted.',
          starterCode: `def insert_sorted(sorted_list, value):
    # TODO: Find the correct index where value should be inserted
    # TODO: Use insert() to place the value at that index
    # TODO: The list should remain sorted after insertion
    pass

# Test
nums = [1, 3, 5, 7, 9]
insert_sorted(nums, 4)
print(nums)   # [1, 3, 4, 5, 7, 9]

insert_sorted(nums, 0)
print(nums)   # [0, 1, 3, 4, 5, 7, 9]

insert_sorted(nums, 10)
print(nums)   # [0, 1, 3, 4, 5, 7, 9, 10]`,
          solutionCode: `def insert_sorted(sorted_list, value):
    for i in range(len(sorted_list)):
        if value <= sorted_list[i]:
            sorted_list.insert(i, value)
            return
    sorted_list.append(value)

# Test
nums = [1, 3, 5, 7, 9]
insert_sorted(nums, 4)
print(nums)   # [1, 3, 4, 5, 7, 9]

insert_sorted(nums, 0)
print(nums)   # [0, 1, 3, 4, 5, 7, 9]

insert_sorted(nums, 10)
print(nums)   # [0, 1, 3, 4, 5, 7, 9, 10]`,
          hints: [
            'Loop through the list and find the first element that is greater than or equal to the value.',
            'Insert at that index using sorted_list.insert(i, value).',
            'If no element is larger, append the value at the end.',
          ],
        },
      },
      {
        id: 'list-pop',
        title: 'pop() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'list.pop(index) removes and returns the element at the given index. If no index is provided, it removes and returns the last element. Raises IndexError if the list is empty or the index is out of range.',
            code: `# Signature
list.pop(index=-1)

# Parameters:
#   index — (optional) position of the element to remove; defaults to -1
# Returns: the removed element`,
            analogy: 'Think of it like a spring-loaded magazine for cards -- pop() ejects the top card (last element) by default, or you can specify which slot to eject from.',
          },
          {
            heading: 'Examples',
            content:
              'Popping elements from different positions.',
            code: `stack = [10, 20, 30, 40, 50]
last = stack.pop()
print(last)
print(stack)

first = stack.pop(0)
print(first)
print(stack)

middle = stack.pop(1)
print(middle)
print(stack)`,
            output: `50
[10, 20, 30, 40]
10
[20, 30, 40]
30
[20, 40]`,
            codeHighlightLines: [2, 6, 10],
          },
        ],
        quiz: [
          {
            question: 'What does [10, 20, 30].pop() return?',
            options: ['10', '20', '30', 'None'],
            correctIndex: 2,
            explanation:
              'pop() with no argument removes and returns the last element. The last element of [10, 20, 30] is 30.',
          },
          {
            question: 'What happens when you call [].pop()?',
            options: [
              'Returns None',
              'Returns 0',
              'Raises IndexError',
              'Raises ValueError',
            ],
            correctIndex: 2,
            explanation:
              'Calling pop() on an empty list raises an IndexError because there are no elements to remove.',
          },
          {
            question: 'What is the difference between pop() and remove()?',
            options: [
              'pop() takes an index and returns the element; remove() takes a value and returns None',
              'pop() takes a value; remove() takes an index',
              'They are identical but with different names',
              'pop() works on any iterable; remove() only works on lists',
            ],
            correctIndex: 0,
            explanation:
              'pop() removes by index position and returns the removed element. remove() removes by value (first occurrence) and returns None.',
          },
          {
            question: 'After x = [1,2,3]; y = x.pop(1), what are x and y?',
            options: [
              'x=[1,3], y=2',
              'x=[1,2], y=3',
              'x=[2,3], y=1',
              'x=[1,2,3], y=None',
            ],
            correctIndex: 0,
            explanation:
              'pop(1) removes and returns the element at index 1, which is 2. The list becomes [1, 3] and y is 2.',
          },
        ],
        challenge: {
          prompt:
            'Write a function rotate_left that takes a list and an integer n, and rotates the list n positions to the left in place using pop(0) and append(). Return the modified list.',
          starterCode: `def rotate_left(lst, n):
    # TODO: Pop from the front and append to the back, n times
    # TODO: Handle edge cases (empty list, n larger than length)
    # TODO: Return the list
    pass

# Test
data = [1, 2, 3, 4, 5]
rotate_left(data, 2)
print(data)   # [3, 4, 5, 1, 2]

data2 = ["a", "b", "c"]
rotate_left(data2, 1)
print(data2)  # ["b", "c", "a"]`,
          solutionCode: `def rotate_left(lst, n):
    if not lst:
        return lst
    n = n % len(lst)
    for _ in range(n):
        lst.append(lst.pop(0))
    return lst

# Test
data = [1, 2, 3, 4, 5]
rotate_left(data, 2)
print(data)   # [3, 4, 5, 1, 2]

data2 = ["a", "b", "c"]
rotate_left(data2, 1)
print(data2)  # ["b", "c", "a"]`,
          hints: [
            'Use lst.pop(0) to remove and get the first element, then lst.append() to add it to the end.',
            'Repeat this n times in a loop.',
            'Use n % len(lst) to handle cases where n is larger than the list length.',
          ],
        },
      },
      {
        id: 'list-remove',
        title: 'remove() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'list.remove(element) removes the first occurrence of the specified element from the list. It modifies the list in place and returns None. Raises ValueError if the element is not present in the list.',
            code: `# Signature
list.remove(element)

# Parameters:
#   element — the value to remove (first occurrence only)`,
          },
          {
            heading: 'Examples',
            content:
              'Removing elements and handling missing values safely.',
            code: `pets = ["cat", "dog", "bird", "dog", "fish"]
pets.remove("dog")
print(pets)

# Safe removal pattern
items = [1, 2, 3]
value = 5
if value in items:
    items.remove(value)
    print("Removed", value)
else:
    print(f"{value} not found")
print(items)`,
            output: `['cat', 'bird', 'dog', 'fish']
5 not found
[1, 2, 3]`,
            tip: 'remove() only deletes the first match. To remove all occurrences, use a list comprehension: [x for x in lst if x != value].',
          },
        ],
        quiz: [
          {
            question: 'What does list.remove() return?',
            options: [
              'The removed element',
              'The index of the removed element',
              'True if the element was found',
              'None',
            ],
            correctIndex: 3,
            explanation:
              'remove() modifies the list in place and always returns None. If you need the removed value, use pop() with an index instead.',
          },
          {
            question: 'After x = [1, 2, 3, 2]; x.remove(2), what is x?',
            options: [
              '[1, 3]',
              '[1, 3, 2]',
              '[1, 2, 3]',
              '[1, 2, 2]',
            ],
            correctIndex: 1,
            explanation:
              'remove() only removes the first occurrence of 2 (at index 1). The second 2 at the end remains, giving [1, 3, 2].',
          },
          {
            question: 'What happens when you call [1, 2, 3].remove(99)?',
            options: [
              'Returns None silently',
              'Returns False',
              'Raises ValueError',
              'Raises IndexError',
            ],
            correctIndex: 2,
            explanation:
              'When the element is not found in the list, remove() raises a ValueError. Use "if value in list" to check first.',
          },
        ],
        challenge: {
          prompt:
            'Write a function remove_all that takes a list and a target value, and removes ALL occurrences of that value from the list in place. Return the number of items removed.',
          starterCode: `def remove_all(lst, target):
    # TODO: Count how many times target appears
    # TODO: Remove each occurrence using remove()
    # TODO: Return the count of removed items
    pass

# Test
data = [1, 2, 3, 2, 4, 2, 5]
count = remove_all(data, 2)
print(data)    # [1, 3, 4, 5]
print(count)   # 3`,
          solutionCode: `def remove_all(lst, target):
    count = 0
    while target in lst:
        lst.remove(target)
        count += 1
    return count

# Test
data = [1, 2, 3, 2, 4, 2, 5]
count = remove_all(data, 2)
print(data)    # [1, 3, 4, 5]
print(count)   # 3`,
          hints: [
            'Use a while loop that continues as long as the target is in the list.',
            'Call lst.remove(target) in each iteration and increment a counter.',
            'The loop ends automatically when all occurrences are removed.',
          ],
        },
      },
      {
        id: 'list-reverse',
        title: 'reverse() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'list.reverse() reverses the elements of the list in place. It modifies the original list and returns None. This is more memory-efficient than creating a reversed copy with slicing.',
            code: `# Signature
list.reverse()

# Parameters: none
# Returns: None (modifies list in place)`,
          },
          {
            heading: 'Examples',
            content:
              'Reversing lists in place versus creating reversed copies.',
            code: `nums = [1, 2, 3, 4, 5]
nums.reverse()
print(nums)

words = ["hello", "world"]
words.reverse()
print(words)

# For a new reversed list without modifying the original
original = [10, 20, 30]
reversed_copy = original[::-1]
print("Original:", original)
print("Reversed copy:", reversed_copy)`,
            output: `[5, 4, 3, 2, 1]
['world', 'hello']
Original: [10, 20, 30]
Reversed copy: [30, 20, 10]`,
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    A["[1, 2, 3, 4, 5]"] -- "list.reverse()" --> B["[5, 4, 3, 2, 1]"]
    C["[10, 20, 30]"] -- "[::-1] (new list)" --> D["[30, 20, 10]"]
    C -. "original unchanged" .-> C`,
              caption: 'reverse() mutates in place, while [::-1] creates a new reversed copy',
            },
          },
        ],
        quiz: [
          {
            question: 'What does list.reverse() return?',
            options: [
              'A new reversed list',
              'The same list (for chaining)',
              'None',
              'True if the list changed',
            ],
            correctIndex: 2,
            explanation:
              'reverse() modifies the list in place and returns None. To get a new reversed list, use slicing [::-1] or the built-in reversed() function.',
          },
          {
            question: 'Which creates a new reversed list without modifying the original?',
            options: [
              'original.reverse()',
              'original[::-1]',
              'reverse(original)',
              'original.reversed()',
            ],
            correctIndex: 1,
            explanation:
              'Slicing with [::-1] creates a new list in reversed order without modifying the original. reverse() modifies in place, and reversed() is a built-in function (not a method) that returns an iterator.',
          },
          {
            question: 'After x = [1,2,3]; y = x.reverse(), what is y?',
            options: ['[3, 2, 1]', '[1, 2, 3]', 'None', '[]'],
            correctIndex: 2,
            explanation:
              'reverse() returns None, so y is None. The list x itself is reversed to [3, 2, 1], but the return value is None.',
          },
        ],
        challenge: {
          prompt:
            'Write a function is_palindrome that takes a list and returns True if the list reads the same forwards and backwards. Use the reverse() method on a copy to avoid modifying the original.',
          starterCode: `def is_palindrome(lst):
    # TODO: Create a copy of the list
    # TODO: Reverse the copy
    # TODO: Compare the copy with the original
    # TODO: Return True if they are equal, False otherwise
    pass

# Test
print(is_palindrome([1, 2, 3, 2, 1]))   # True
print(is_palindrome([1, 2, 3]))          # False
print(is_palindrome(["a", "b", "a"]))    # True
print(is_palindrome([]))                  # True`,
          solutionCode: `def is_palindrome(lst):
    reversed_copy = lst.copy()
    reversed_copy.reverse()
    return lst == reversed_copy

# Test
print(is_palindrome([1, 2, 3, 2, 1]))   # True
print(is_palindrome([1, 2, 3]))          # False
print(is_palindrome(["a", "b", "a"]))    # True
print(is_palindrome([]))                  # True`,
          hints: [
            'Use lst.copy() to create a copy, so the original list is not modified.',
            'Call reverse() on the copy to reverse it in place.',
            'Compare the original list with the reversed copy using ==.',
          ],
        },
      },
      {
        id: 'list-sort',
        title: 'sort() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'list.sort(key=None, reverse=False) sorts the list in place in ascending order by default. The optional key parameter accepts a function that extracts a comparison key from each element. Set reverse=True for descending order. Raises TypeError if elements are not comparable. Returns None.',
            code: `# Signature
list.sort(*, key=None, reverse=False)

# Parameters:
#   key     — (optional) function that returns a sort key for each element
#   reverse — (optional) if True, sort in descending order
# Returns: None (modifies list in place)`,
            analogy: 'Think of it like organizing books on a shelf -- sort() rearranges them right where they are, while sorted() would copy them to a new shelf in order.',
          },
          {
            heading: 'Examples',
            content:
              'Sorting with default order, reverse order, and custom keys.',
            code: `nums = [3, 1, 4, 1, 5, 9, 2]
nums.sort()
print(nums)

nums.sort(reverse=True)
print(nums)

words = ["banana", "apple", "fig", "cherry"]
words.sort(key=len)
print(words)`,
            output: `[1, 1, 2, 3, 4, 5, 9]
[9, 5, 4, 3, 2, 1, 1]
['fig', 'apple', 'banana', 'cherry']`,
            tip: 'Use sorted(list) instead if you need a new sorted list without modifying the original. It accepts the same key and reverse parameters.',
            codeHighlightLines: [2, 5, 9],
          },
        ],
        quiz: [
          {
            question: 'What does list.sort() return?',
            options: [
              'A new sorted list',
              'The same list object',
              'None',
              'The number of swaps performed',
            ],
            correctIndex: 2,
            explanation:
              'sort() sorts the list in place and returns None. To get a new sorted list, use the built-in sorted() function instead.',
          },
          {
            question: 'What does ["banana","apple","fig"].sort(key=len) produce?',
            options: [
              '["apple", "banana", "fig"]',
              '["fig", "apple", "banana"]',
              '["banana", "apple", "fig"]',
              '["fig", "banana", "apple"]',
            ],
            correctIndex: 1,
            explanation:
              'key=len sorts by string length: "fig" (3), "apple" (5), "banana" (6). So the result is ["fig", "apple", "banana"].',
          },
          {
            question: 'How do you sort a list in descending order?',
            options: [
              'list.sort(descending=True)',
              'list.sort(reverse=True)',
              'list.sort(order="desc")',
              'list.reverse_sort()',
            ],
            correctIndex: 1,
            explanation:
              'The reverse parameter of sort() controls the order. Setting reverse=True sorts in descending order.',
          },
          {
            question: 'What happens when you try to sort [1, "a", 2]?',
            options: [
              'It sorts by string representation',
              'Numbers come before strings',
              'Raises TypeError',
              'Returns the list unchanged',
            ],
            correctIndex: 2,
            explanation:
              'Python 3 does not support comparison between different types like int and str. Attempting to sort such a list raises a TypeError.',
          },
        ],
        challenge: {
          prompt:
            'Write a function sort_by_last_char that takes a list of strings and returns a new list sorted by the last character of each string. If two strings have the same last character, preserve their relative order.',
          starterCode: `def sort_by_last_char(words):
    # TODO: Use sorted() with a key function that extracts the last character
    # TODO: Return the new sorted list
    pass

# Test
print(sort_by_last_char(["hello", "world", "python", "code"]))
# ["code", "world", "python", "hello"]
# (sorted by: 'e', 'd', 'n', 'o' -> 'd','e','n','o')

print(sort_by_last_char(["abc", "xyz", "mno"]))
# ["abc", "mno", "xyz"]`,
          solutionCode: `def sort_by_last_char(words):
    return sorted(words, key=lambda w: w[-1])

# Test
print(sort_by_last_char(["hello", "world", "python", "code"]))
# ["code", "world", "python", "hello"]

print(sort_by_last_char(["abc", "xyz", "mno"]))
# ["abc", "mno", "xyz"]`,
          hints: [
            'Use the sorted() built-in to create a new list instead of modifying in place.',
            'Pass a key function using lambda: key=lambda w: w[-1].',
            'w[-1] gives the last character of the string, which sorted() will use for comparison.',
          ],
        },
      },
    ],
  },
  /* ------------------------------------------------------------ */
  /*  Tuple Methods                                                */
  /* ------------------------------------------------------------ */
  {
    id: 'tuple-methods',
    label: 'Tuple Methods',
    icon: 'Package',
    entries: [
      {
        id: 'tuple-count',
        title: 'count() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'tuple.count(element) returns the number of times the specified element appears in the tuple. It uses equality comparison (==) to match elements. If the element is not found, it returns 0. Behaves identically to list.count().',
            code: `# Signature
tuple.count(element)

# Parameters:
#   element — the value to count
# Returns: int`,
          },
          {
            heading: 'Examples',
            content:
              'Counting occurrences in tuples of different types.',
            code: `colors = ("red", "blue", "red", "green", "red")
print(colors.count("red"))
print(colors.count("yellow"))

grades = (90, 85, 90, 78, 90, 85)
print(grades.count(90))
print(grades.count(100))`,
            output: `3
0
3
0`,
            tip: 'Tuples have only two methods: count() and index(). Their immutability means no methods that modify the sequence.',
            analogy: 'Think of it like counting how many red marbles are in a sealed jar -- you can look and count, but you cannot add or remove any.',
          },
        ],
        quiz: [
          {
            question: 'What does (1, 2, 2, 3, 2).count(2) return?',
            options: ['1', '2', '3', '4'],
            correctIndex: 2,
            explanation:
              'The value 2 appears three times in the tuple (at indices 1, 2, and 4), so count() returns 3.',
          },
          {
            question: 'How many methods do tuples have?',
            options: [
              '0 -- tuples have no methods',
              '2 -- count() and index()',
              '5 -- count, index, sort, reverse, copy',
              'The same number as lists',
            ],
            correctIndex: 1,
            explanation:
              'Tuples are immutable, so they only have two methods: count() and index(). All other list methods that modify the sequence are not available.',
          },
          {
            question: 'What does (True, 1, 0, False).count(False) return?',
            options: ['1', '2', '3', '0'],
            correctIndex: 1,
            explanation:
              'In Python, False == 0 evaluates to True. So count(False) matches both False and 0, returning 2.',
          },
        ],
        challenge: {
          prompt:
            'Write a function grade_summary that takes a tuple of letter grades (e.g., ("A", "B", "A", "C", "B", "A")) and returns a dictionary mapping each unique grade to its count, using tuple.count().',
          starterCode: `def grade_summary(grades):
    # TODO: Find the unique grades using set()
    # TODO: For each unique grade, count occurrences using tuple.count()
    # TODO: Build and return a dictionary of grade -> count
    pass

# Test
result = grade_summary(("A", "B", "A", "C", "B", "A"))
print(result)   # {'A': 3, 'B': 2, 'C': 1}

result2 = grade_summary(("Pass", "Fail", "Pass", "Pass"))
print(result2)  # {'Pass': 3, 'Fail': 1}`,
          solutionCode: `def grade_summary(grades):
    summary = {}
    for grade in set(grades):
        summary[grade] = grades.count(grade)
    return summary

# Test
result = grade_summary(("A", "B", "A", "C", "B", "A"))
print(result)   # {'A': 3, 'B': 2, 'C': 1}

result2 = grade_summary(("Pass", "Fail", "Pass", "Pass"))
print(result2)  # {'Pass': 3, 'Fail': 1}`,
          hints: [
            'Use set(grades) to get the unique grade values.',
            'Loop over the unique grades and call grades.count(grade) for each one.',
            'Store the results in a dictionary with the grade as key and count as value.',
          ],
        },
      },
      {
        id: 'tuple-index',
        title: 'index() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'tuple.index(element, start, end) returns the zero-based index of the first occurrence of the specified element. The optional start and end parameters limit the search to a slice of the tuple. Raises ValueError if the element is not found.',
            code: `# Signature
tuple.index(element, start=0, end=len(tuple))

# Parameters:
#   element — the value to search for
#   start   — (optional) index to begin searching
#   end     — (optional) index to stop searching (exclusive)
# Returns: int`,
          },
          {
            heading: 'Examples',
            content:
              'Finding elements in tuples with and without slice bounds.',
            code: `days = ("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun")
print(days.index("Wed"))
print(days.index("Sat"))

nums = (10, 20, 30, 20, 40, 20)
print(nums.index(20))
print(nums.index(20, 2))
print(nums.index(20, 4, 6))`,
            output: `2
5
1
3
5`,
            codeHighlightLines: [2, 6, 7, 8],
          },
        ],
        quiz: [
          {
            question: 'What does ("a","b","c","b").index("b") return?',
            options: ['0', '1', '3', '[1, 3]'],
            correctIndex: 1,
            explanation:
              'index() returns the position of the first occurrence. "b" first appears at index 1.',
          },
          {
            question: 'What happens when you call (1, 2, 3).index(99)?',
            options: [
              'Returns -1',
              'Returns None',
              'Raises ValueError',
              'Raises IndexError',
            ],
            correctIndex: 2,
            explanation:
              'When the element is not found, index() raises a ValueError, just like list.index().',
          },
          {
            question: 'What does (10, 20, 30, 20).index(20, 2) return?',
            options: ['1', '2', '3', 'Raises ValueError'],
            correctIndex: 2,
            explanation:
              'The start parameter 2 tells index() to begin searching from index 2. It finds 20 at index 3.',
          },
          {
            question: 'Can tuple.index() find nested tuples?',
            options: [
              'No, it only works with primitive types',
              'Yes, it uses == equality which works for nested tuples',
              'Only if the nested tuple is hashable',
              'Only with the deep=True parameter',
            ],
            correctIndex: 1,
            explanation:
              'index() uses == equality comparison, which works correctly for comparing tuples (including nested ones), since tuples support equality comparison by value.',
          },
        ],
        challenge: {
          prompt:
            'Write a function safe_tuple_index that takes a tuple, a target value, and a default value. It returns the index of the target if found, or the default value if the target is not in the tuple. Use a try/except block with tuple.index().',
          starterCode: `def safe_tuple_index(tpl, target, default=-1):
    # TODO: Try to find the index using tuple.index()
    # TODO: If ValueError is raised, return the default value
    pass

# Test
days = ("Mon", "Tue", "Wed", "Thu", "Fri")
print(safe_tuple_index(days, "Wed"))        # 2
print(safe_tuple_index(days, "Sat"))        # -1
print(safe_tuple_index(days, "Sat", None))  # None`,
          solutionCode: `def safe_tuple_index(tpl, target, default=-1):
    try:
        return tpl.index(target)
    except ValueError:
        return default

# Test
days = ("Mon", "Tue", "Wed", "Thu", "Fri")
print(safe_tuple_index(days, "Wed"))        # 2
print(safe_tuple_index(days, "Sat"))        # -1
print(safe_tuple_index(days, "Sat", None))  # None`,
          hints: [
            'Wrap the tpl.index(target) call in a try block.',
            'Catch ValueError in the except block and return the default value.',
            'If no exception occurs, the try block returns the found index directly.',
          ],
        },
      },
    ],
  },
];

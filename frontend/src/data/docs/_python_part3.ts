import type { DocCategory } from './types';

// Part 3: Built-in Functions Reference
export const PART3_CATEGORIES: DocCategory[] = [
  {
    id: 'builtin-functions',
    label: 'Built-in Functions',
    icon: 'Code2',
    entries: [
      /* ------------------------------------------------------------ */
      /*  abs()                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-abs',
        title: 'abs() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'abs(x) returns the absolute value of a number. The argument may be an integer, a floating-point number, or any object that implements __abs__(). For complex numbers, it returns the magnitude.',
            code: `# Signature
abs(x)

# x can be int, float, or complex`,
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    A["Input: -42"] --> B["abs()"]
    B --> C["Output: 42"]
    D["Input: 3+4j"] --> B
    B --> E["Output: 5.0"]`,
              caption: 'abs() transforms negative values to positive and complex numbers to their magnitude',
            },
          },
          {
            heading: 'Examples',
            content:
              'abs() works with negative integers, floats, and complex numbers. It always returns a non-negative value of the same numeric type (except complex, which returns a float).',
            code: `print(abs(-42))
print(abs(3.14))
print(abs(-0.0))
print(abs(3 + 4j))`,
            output: `42
3.14
0.0
5.0`,
            tip: 'For complex numbers, abs() returns the magnitude calculated as sqrt(real**2 + imag**2).',
            analogy: 'Think of it like measuring the distance from zero on a number line -- direction does not matter, only how far away the number is.',
            codeHighlightLines: [1, 4],
          },
          {
            heading: 'Edge Cases',
            content:
              'abs() raises a TypeError if given a non-numeric type like a string. It works correctly with very large integers since Python has arbitrary-precision integers.',
            code: `# Large integer -- no overflow in Python
print(abs(-10**100))

# Boolean values work (bool is a subclass of int)
print(abs(True))
print(abs(False))`,
            output: `10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
1
0`,
          },
        ],
        quiz: [
          {
            question: 'What does abs(-7.5) return?',
            options: ['-7.5', '7.5', '7', '-7'],
            correctIndex: 1,
            explanation: 'abs() returns the absolute value of its argument. For -7.5, the absolute value is 7.5. The type (float) is preserved.',
          },
          {
            question: 'What does abs(3 + 4j) return?',
            options: ['7', '3 + 4j', '5.0', '25'],
            correctIndex: 2,
            explanation: 'For complex numbers, abs() returns the magnitude calculated as sqrt(real**2 + imag**2). sqrt(9 + 16) = sqrt(25) = 5.0.',
          },
          {
            question: 'What happens when you call abs("hello")?',
            options: ['Returns 5', 'Returns "hello"', 'Raises TypeError', 'Returns 0'],
            correctIndex: 2,
            explanation: 'abs() only works with numeric types (int, float, complex) or objects implementing __abs__(). Passing a string raises a TypeError.',
          },
        ],
        challenge: {
          prompt: 'Write a function called distance_from_origin that takes two parameters x and y (coordinates on a 2D plane) and returns the distance from the origin (0, 0) using abs() and the Pythagorean theorem. Hint: the distance is abs(complex(x, y)).',
          starterCode: `def distance_from_origin(x, y):
    # Return the distance from (0, 0) to (x, y)
    pass

# Test cases
print(distance_from_origin(3, 4))   # Expected: 5.0
print(distance_from_origin(-5, 0))  # Expected: 5.0
print(distance_from_origin(0, 0))   # Expected: 0.0`,
          solutionCode: `def distance_from_origin(x, y):
    return abs(complex(x, y))

# Test cases
print(distance_from_origin(3, 4))   # 5.0
print(distance_from_origin(-5, 0))  # 5.0
print(distance_from_origin(0, 0))   # 0.0`,
          hints: [
            'A point (x, y) can be represented as the complex number x + yj.',
            'abs() on a complex number returns its magnitude, which equals sqrt(x**2 + y**2).',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  all()                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-all',
        title: 'all() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'all(iterable) returns True if all elements of the iterable are truthy (or if the iterable is empty). It short-circuits and returns False as soon as it finds a falsy element.',
            code: `# Signature
all(iterable)

# Equivalent to:
# def all(iterable):
#     for element in iterable:
#         if not element:
#             return False
#     return True`,
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    A["[True, True, False, True]"] --> B{"Element Falsy?"}
    B -- "No" --> C["Check next"]
    C --> B
    B -- "Yes (False found)" --> D["Return False"]
    B -- "End of list" --> E["Return True"]`,
              caption: 'all() short-circuits: it stops as soon as it encounters a falsy element',
            },
            analogy: 'Think of it like a strict teacher checking homework -- if even one student did not submit, the whole class fails the check.',
          },
          {
            heading: 'Examples',
            content:
              'all() is commonly used to verify that every element in a collection satisfies a condition. Pass a generator expression for memory-efficient evaluation.',
            code: `print(all([True, True, True]))
print(all([True, False, True]))
print(all([]))  # empty iterable

# With a generator expression
nums = [2, 4, 6, 8]
print(all(n % 2 == 0 for n in nums))

# Strings are truthy, empty string is falsy
print(all(["hello", "world"]))
print(all(["hello", ""]))`,
            output: `True
False
True
True
True
False`,
            tip: 'all([]) returns True because there are no elements to be falsy. This is called a "vacuous truth" in logic.',
            codeHighlightLines: [2, 7],
          },
          {
            heading: 'Common Patterns',
            content:
              'all() is often used for input validation, checking that all items in a list meet certain criteria before proceeding.',
            code: `# Validate that all scores are passing (>= 60)
scores = [85, 92, 78, 65, 90]
if all(s >= 60 for s in scores):
    print("All students passed!")

# Check all values are non-None
data = {"name": "Alice", "age": 30, "email": "a@b.com"}
print(all(v is not None for v in data.values()))`,
            output: `All students passed!
True`,
          },
        ],
        quiz: [
          {
            question: 'What does all([]) return?',
            options: ['False', 'True', 'None', 'Raises ValueError'],
            correctIndex: 1,
            explanation: 'all([]) returns True because there are no elements that are falsy. This is known as a "vacuous truth" in logic.',
          },
          {
            question: 'What does all([1, 2, 0, 3]) return?',
            options: ['True', 'False', '0', 'None'],
            correctIndex: 1,
            explanation: '0 is a falsy value in Python. Since all() requires every element to be truthy and 0 is falsy, it returns False.',
          },
          {
            question: 'What does all(n > 0 for n in [3, 5, 7]) return?',
            options: ['[True, True, True]', 'True', '3', 'False'],
            correctIndex: 1,
            explanation: 'The generator expression produces True for each element since all values are greater than 0. all() returns True because every element is truthy.',
          },
        ],
        challenge: {
          prompt: 'Write a function called is_valid_password that takes a string password and returns True only if ALL of these conditions are met: length >= 8, contains at least one digit, and contains at least one uppercase letter. Use all() in your solution.',
          starterCode: `def is_valid_password(password):
    # Check all conditions using all()
    pass

# Test cases
print(is_valid_password("Hello123"))    # Expected: True
print(is_valid_password("hello123"))    # Expected: False (no uppercase)
print(is_valid_password("Hello"))       # Expected: False (too short, no digit)
print(is_valid_password("ABCD1234"))    # Expected: True`,
          solutionCode: `def is_valid_password(password):
    conditions = [
        len(password) >= 8,
        any(c.isdigit() for c in password),
        any(c.isupper() for c in password),
    ]
    return all(conditions)

# Test cases
print(is_valid_password("Hello123"))    # True
print(is_valid_password("hello123"))    # False (no uppercase)
print(is_valid_password("Hello"))       # False (too short, no digit)
print(is_valid_password("ABCD1234"))    # True`,
          hints: [
            'Build a list of boolean conditions and pass them to all().',
            'Use any() with a generator to check if at least one character is a digit or uppercase.',
            'The string methods .isdigit() and .isupper() check individual characters.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  any()                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-any',
        title: 'any() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'any(iterable) returns True if any element of the iterable is truthy. It returns False if the iterable is empty or all elements are falsy. It short-circuits on the first truthy element.',
            code: `# Signature
any(iterable)

# Equivalent to:
# def any(iterable):
#     for element in iterable:
#         if element:
#             return True
#     return False`,
            analogy: 'Think of it like a fire alarm system -- if any single detector goes off, the whole building alarm triggers.',
          },
          {
            heading: 'Examples',
            content:
              'any() is useful when you need to check if at least one condition is met. Like all(), it works efficiently with generator expressions.',
            code: `print(any([False, False, True]))
print(any([False, False, False]))
print(any([]))  # empty iterable

# Check if any number is negative
nums = [3, -1, 7, 2]
print(any(n < 0 for n in nums))

# Falsy values: 0, None, "", [], False
print(any([0, None, "", [], False]))`,
            output: `True
False
False
True
False`,
            codeHighlightLines: [1, 7],
          },
          {
            heading: 'Common Patterns',
            content:
              'any() pairs well with string methods for searching and validation tasks.',
            code: `# Check if any word starts with a vowel
words = ["banana", "apple", "cherry"]
vowels = "aeiou"
print(any(w[0].lower() in vowels for w in words))

# Check if a file has any of the allowed extensions
filename = "report.pdf"
allowed = [".pdf", ".docx", ".txt"]
print(any(filename.endswith(ext) for ext in allowed))`,
            output: `True
True`,
            tip: 'any() and all() are complementary: not any(x) is equivalent to all(not x for x in iterable).',
          },
        ],
        quiz: [
          {
            question: 'What does any([0, None, "", False]) return?',
            options: ['True', 'False', 'None', '0'],
            correctIndex: 1,
            explanation: 'All values in the list (0, None, "", False) are falsy. Since none of them are truthy, any() returns False.',
          },
          {
            question: 'What does any([]) return?',
            options: ['True', 'False', 'None', 'Raises ValueError'],
            correctIndex: 1,
            explanation: 'any([]) returns False because there are no truthy elements in an empty iterable. This is the opposite of all([]) which returns True.',
          },
          {
            question: 'Which expression checks if any number in a list is negative?',
            options: [
              'all(n < 0 for n in nums)',
              'any(n < 0 for n in nums)',
              'any(n > 0 for n in nums)',
              'sum(n < 0 for n in nums)',
            ],
            correctIndex: 1,
            explanation: 'any(n < 0 for n in nums) returns True as soon as it finds at least one negative number in the iterable.',
          },
        ],
        challenge: {
          prompt: 'Write a function called has_duplicates that takes a list and returns True if any element appears more than once. Use any() with a creative approach (hint: compare the list length with the set length, or use counting).',
          starterCode: `def has_duplicates(items):
    # Return True if any element appears more than once
    pass

# Test cases
print(has_duplicates([1, 2, 3, 4]))       # Expected: False
print(has_duplicates([1, 2, 3, 2]))       # Expected: True
print(has_duplicates(["a", "b", "a"]))    # Expected: True
print(has_duplicates([]))                  # Expected: False`,
          solutionCode: `def has_duplicates(items):
    seen = set()
    return any(item in seen or not seen.add(item) is None and False for item in items)

# Simpler alternative:
def has_duplicates(items):
    return len(items) != len(set(items))

# Test cases
print(has_duplicates([1, 2, 3, 4]))       # False
print(has_duplicates([1, 2, 3, 2]))       # True
print(has_duplicates(["a", "b", "a"]))    # True
print(has_duplicates([]))                  # False`,
          hints: [
            'One approach: if the length of the list differs from the length of its set, there are duplicates.',
            'Another approach: use a set to track seen items and any() to short-circuit on the first duplicate.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  ascii()                                                     */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-ascii',
        title: 'ascii() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'ascii(object) returns a string containing a printable representation of an object, but escapes non-ASCII characters using \\x, \\u, or \\U escapes. It is similar to repr() but ensures the result contains only ASCII characters.',
            code: `# Signature
ascii(object)`,
          },
          {
            heading: 'Examples',
            content:
              'ascii() is useful for debugging strings that contain Unicode characters, as it makes every non-ASCII character visible in escaped form.',
            code: `print(ascii("hello"))
print(ascii("cafe\u0301"))
print(ascii("Python \u00e9\u00e8\u00ea"))
print(ascii("\u4f60\u597d"))  # Chinese characters
print(ascii([1, 2, "caf\u00e9"]))`,
            output: `'hello'
'caf\\xe9'
'Python \\xe9\\xe8\\xea'
'\\u4f60\\u597d'
[1, 2, 'caf\\xe9']`,
            tip: 'Use ascii() when logging or transmitting data that must be pure ASCII. For human-readable output, prefer repr() or str().',
          },
          {
            heading: 'Edge Cases',
            content:
              'ascii() calls __repr__() on the object first, then escapes non-ASCII characters in the result. It works on any object, not just strings.',
            code: `# Works on numbers (no escaping needed)
print(ascii(42))
print(ascii(3.14))

# Works on booleans
print(ascii(True))

# Works on None
print(ascii(None))`,
            output: `42
3.14
True
None`,
          },
        ],
        quiz: [
          {
            question: 'What does ascii("caf\\u00e9") return?',
            options: ['"caf\\u00e9"', "'caf\\\\xe9'", "'cafe'", "'caf\\u00e9'"],
            correctIndex: 1,
            explanation: 'ascii() escapes non-ASCII characters. The e-acute (\\u00e9) is escaped to \\xe9 in the output, and the result is wrapped in quotes like repr().',
          },
          {
            question: 'How does ascii() differ from repr()?',
            options: [
              'ascii() returns bytes, repr() returns strings',
              'ascii() escapes all non-ASCII characters, repr() may leave them as-is',
              'They are identical in all cases',
              'repr() works on more types than ascii()',
            ],
            correctIndex: 1,
            explanation: 'ascii() is like repr() but additionally escapes all non-ASCII characters using \\x, \\u, or \\U escape sequences, ensuring the output is pure ASCII.',
          },
        ],
        challenge: {
          prompt: 'Write a function called safe_log that takes any string and returns a version safe for ASCII-only log files. Use ascii() but strip the surrounding quotes that ascii() adds to strings.',
          starterCode: `def safe_log(text):
    # Return an ASCII-safe version of the text without surrounding quotes
    pass

# Test cases
print(safe_log("hello"))          # Expected: hello
print(safe_log("caf\\u00e9"))     # Expected: caf\\xe9
print(safe_log("\\u4f60\\u597d"))  # Expected: \\u4f60\\u597d`,
          solutionCode: `def safe_log(text):
    result = ascii(text)
    # ascii() wraps strings in quotes, so strip them
    return result[1:-1]

# Test cases
print(safe_log("hello"))          # hello
print(safe_log("caf\\u00e9"))     # caf\\xe9
print(safe_log("\\u4f60\\u597d"))  # \\u4f60\\u597d`,
          hints: [
            'ascii() on a string returns it wrapped in quotes, like repr() does.',
            'You can strip the first and last characters (the quotes) using string slicing: result[1:-1].',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  bin()                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-bin',
        title: 'bin() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'bin(x) converts an integer to a binary string prefixed with "0b". The argument must be an integer or an object that defines __index__(). Negative numbers are prefixed with "-0b".',
            code: `# Signature
bin(x)  # x must be an int`,
          },
          {
            heading: 'Examples',
            content:
              'bin() is handy for visualizing the binary representation of integers, which is useful in bitwise operations, networking, and low-level programming.',
            code: `print(bin(10))
print(bin(255))
print(bin(-7))
print(bin(0))

# Remove the "0b" prefix if needed
print(bin(42)[2:])
print(bin(42).replace("0b", ""))`,
            output: `0b1010
0b11111111
-0b111
0b0
101010
101010`,
            tip: 'Use format(x, "b") or f"{x:b}" for more control over binary formatting, such as zero-padding: f"{x:08b}" gives an 8-bit representation.',
            analogy: 'Think of it like translating a number from everyday decimal language into the native language that computers speak -- ones and zeros.',
            codeHighlightLines: [1, 2],
          },
          {
            heading: 'Common Patterns',
            content:
              'bin() is often combined with int() to convert between binary strings and integers.',
            code: `# Round-trip: int -> binary string -> int
num = 42
binary_str = bin(num)
back_to_int = int(binary_str, 2)
print(f"{num} -> {binary_str} -> {back_to_int}")

# Count set bits (1s) in a number
n = 255
print(f"Set bits in {n}: {bin(n).count('1')}")`,
            output: `42 -> 0b101010 -> 42
Set bits in 255: 8`,
          },
        ],
        quiz: [
          {
            question: 'What does bin(10) return?',
            options: ['"1010"', '"0b1010"', '0b1010', '10'],
            correctIndex: 1,
            explanation: 'bin() returns a string prefixed with "0b" followed by the binary representation. For 10, the binary is 1010, so it returns "0b1010".',
          },
          {
            question: 'What does bin(-7) return?',
            options: ['"-0b111"', '"0b-111"', '"0b11111001"', '"-111"'],
            correctIndex: 0,
            explanation: 'For negative numbers, bin() prefixes the result with "-0b". So bin(-7) returns "-0b111".',
          },
          {
            question: 'How can you get a binary string without the "0b" prefix?',
            options: [
              'bin(x, prefix=False)',
              'bin(x)[2:]',
              'binary(x)',
              'bin(x).strip("0b")',
            ],
            correctIndex: 1,
            explanation: 'Slicing bin(x)[2:] removes the "0b" prefix. Alternatively, you can use format(x, "b") or f"{x:b}" for prefix-free binary strings.',
          },
        ],
        challenge: {
          prompt: 'Write a function called count_set_bits that takes a non-negative integer and returns the number of 1-bits in its binary representation. Use bin() in your solution.',
          starterCode: `def count_set_bits(n):
    # Return the number of 1s in the binary representation of n
    pass

# Test cases
print(count_set_bits(0))    # Expected: 0
print(count_set_bits(7))    # Expected: 3 (111)
print(count_set_bits(255))  # Expected: 8 (11111111)
print(count_set_bits(10))   # Expected: 2 (1010)`,
          solutionCode: `def count_set_bits(n):
    return bin(n).count('1')

# Test cases
print(count_set_bits(0))    # 0
print(count_set_bits(7))    # 3 (111)
print(count_set_bits(255))  # 8 (11111111)
print(count_set_bits(10))   # 2 (1010)`,
          hints: [
            'bin() returns a string, so you can use string methods on the result.',
            'The str.count() method counts occurrences of a substring.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  bool()                                                      */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-bool',
        title: 'bool() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'bool(x) converts a value to a Boolean (True or False) using the standard truth-testing rules. With no argument, bool() returns False. An object is considered falsy if it is None, False, zero (0, 0.0, 0j), or an empty collection ("", [], {}, set(), etc.).',
            code: `# Signature
bool(x)
bool()  # returns False`,
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    A["bool(x)"] --> B{"Is x None, False, 0, 0.0, 0j, empty?"}
    B -- "Yes" --> C["Returns False"]
    B -- "No" --> D["Returns True"]
    E["Falsy values:"] --> F["None, False, 0, 0.0, 0j"]
    E --> G["'', [], {}, set(), ()"]`,
              caption: 'Python truthiness rules: a value is falsy if it is None, False, zero, or an empty container',
            },
          },
          {
            heading: 'Examples',
            content:
              'Understanding truthiness is fundamental in Python. bool() makes the implicit truth-testing explicit so you can see exactly what Python considers truthy or falsy.',
            code: `# Falsy values
print(bool(0))
print(bool(""))
print(bool([]))
print(bool(None))
print(bool(0.0))

# Truthy values
print(bool(1))
print(bool("hello"))
print(bool([1, 2]))
print(bool(-1))
print(bool(0.001))`,
            output: `False
False
False
False
False
True
True
True
True
True`,
            analogy: 'Think of it like a light switch test -- if there is any "substance" to the value (non-zero, non-empty), the switch is ON (True). Only emptiness or nothingness turns it OFF (False).',
          },
          {
            heading: 'Common Patterns',
            content:
              'Custom objects can define truthiness by implementing __bool__() or __len__(). If __bool__ is not defined, Python falls back to __len__, treating zero length as falsy.',
            code: `class Bag:
    def __init__(self, items):
        self.items = items
    def __len__(self):
        return len(self.items)

empty_bag = Bag([])
full_bag = Bag(["apple", "banana"])
print(bool(empty_bag))
print(bool(full_bag))`,
            output: `False
True`,
            tip: 'bool is a subclass of int in Python, so True == 1 and False == 0. You can even do arithmetic: True + True == 2.',
            codeHighlightLines: [4, 5, 9, 10],
          },
        ],
        quiz: [
          {
            question: 'What does bool([]) return?',
            options: ['True', 'False', '[]', 'None'],
            correctIndex: 1,
            explanation: 'An empty list is a falsy value in Python. bool([]) returns False because empty containers are considered falsy.',
          },
          {
            question: 'What does bool("False") return?',
            options: ['False', 'True', 'Raises ValueError', 'None'],
            correctIndex: 1,
            explanation: 'The string "False" is a non-empty string, and all non-empty strings are truthy. bool("False") returns True. It does not parse the string content.',
          },
          {
            question: 'Which of these values is truthy?',
            options: ['0', '""', 'None', '[0]'],
            correctIndex: 3,
            explanation: '[0] is a non-empty list (it has one element), so it is truthy. The fact that it contains 0 does not matter -- the list itself is not empty.',
          },
          {
            question: 'What does bool() with no arguments return?',
            options: ['True', 'False', 'None', 'Raises TypeError'],
            correctIndex: 1,
            explanation: 'bool() with no arguments returns False, just like int() returns 0 and str() returns "".',
          },
        ],
        challenge: {
          prompt: 'Write a function called count_truthy that takes a list of mixed values and returns the count of truthy values using bool().',
          starterCode: `def count_truthy(values):
    # Return the number of truthy values in the list
    pass

# Test cases
print(count_truthy([1, 0, "hello", "", None, True, [], [1]]))  # Expected: 4
print(count_truthy([0, False, None, "", []]))                    # Expected: 0
print(count_truthy([1, 2, 3]))                                   # Expected: 3`,
          solutionCode: `def count_truthy(values):
    return sum(bool(v) for v in values)

# Test cases
print(count_truthy([1, 0, "hello", "", None, True, [], [1]]))  # 4
print(count_truthy([0, False, None, "", []]))                    # 0
print(count_truthy([1, 2, 3]))                                   # 3`,
          hints: [
            'bool() converts any value to True or False, and True counts as 1 in arithmetic.',
            'sum() with a generator of boolean values counts the True values.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  chr()                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-chr',
        title: 'chr() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'chr(i) returns the string representing a character whose Unicode code point is the integer i. The valid range is 0 to 1,114,111 (0x10FFFF). It is the inverse of ord().',
            code: `# Signature
chr(i)  # 0 <= i <= 1_114_111`,
          },
          {
            heading: 'Examples',
            content:
              'chr() is useful for generating characters from their numeric codes, building character sequences, and working with Unicode.',
            code: `print(chr(65))    # uppercase A
print(chr(97))    # lowercase a
print(chr(48))    # digit 0
print(chr(9829))  # heart symbol
print(chr(128013))  # snake emoji

# Generate the alphabet
alphabet = "".join(chr(i) for i in range(65, 91))
print(alphabet)`,
            output: `A
a
0
\u2665
\uD83D\uDC0D
ABCDEFGHIJKLMNOPQRSTUVWXYZ`,
            tip: 'chr() and ord() are inverses: chr(ord("A")) == "A" and ord(chr(65)) == 65.',
            analogy: 'Think of it like a phone book lookup in reverse -- you give the number and get back the name (character) associated with it.',
          },
          {
            heading: 'Edge Cases',
            content:
              'chr() raises a ValueError if the argument is outside the valid Unicode range, and a TypeError if the argument is not an integer.',
            code: `# Valid boundary values
print(repr(chr(0)))      # null character
print(repr(chr(32)))     # space
print(repr(chr(127)))    # DEL control character
print(repr(chr(1114111)))  # max Unicode code point

# Convert between chr and ord
char = "Z"
print(f"ord('{char}') = {ord(char)}")
print(f"chr({ord(char)}) = '{chr(ord(char))}'")`,
            output: `'\\x00'
' '
'\\x7f'
'\\U0010ffff'
ord('Z') = 90
chr(90) = 'Z'`,
          },
        ],
        quiz: [
          {
            question: 'What does chr(65) return?',
            options: ['"65"', '"A"', '65', '"a"'],
            correctIndex: 1,
            explanation: 'chr(65) returns "A" because 65 is the Unicode code point (and ASCII value) for the uppercase letter A.',
          },
          {
            question: 'What is the relationship between chr() and ord()?',
            options: [
              'They are the same function',
              'chr() is the inverse of ord()',
              'ord() converts to binary, chr() converts from binary',
              'They both convert to integers',
            ],
            correctIndex: 1,
            explanation: 'chr() and ord() are inverses: chr(ord("A")) == "A" and ord(chr(65)) == 65. chr() converts integer to character, ord() converts character to integer.',
          },
          {
            question: 'What is the valid range for chr()?',
            options: ['0 to 127', '0 to 255', '0 to 65535', '0 to 1114111'],
            correctIndex: 3,
            explanation: 'chr() accepts integers from 0 to 1,114,111 (0x10FFFF), which covers the entire Unicode code space.',
          },
        ],
        challenge: {
          prompt: 'Write a function called caesar_cipher that takes a string and an integer shift, and returns the string with each letter shifted by the given amount in the alphabet. Non-letter characters should remain unchanged. Use chr() and ord().',
          starterCode: `def caesar_cipher(text, shift):
    # Shift each letter by 'shift' positions, wrapping around
    pass

# Test cases
print(caesar_cipher("abc", 1))        # Expected: bcd
print(caesar_cipher("xyz", 3))        # Expected: abc
print(caesar_cipher("Hello, World!", 5))  # Expected: Mjqqt, Btwqi!`,
          solutionCode: `def caesar_cipher(text, shift):
    result = []
    for ch in text:
        if ch.isalpha():
            base = ord('A') if ch.isupper() else ord('a')
            shifted = chr((ord(ch) - base + shift) % 26 + base)
            result.append(shifted)
        else:
            result.append(ch)
    return ''.join(result)

# Test cases
print(caesar_cipher("abc", 1))        # bcd
print(caesar_cipher("xyz", 3))        # abc
print(caesar_cipher("Hello, World!", 5))  # Mjqqt, Btwqi!`,
          hints: [
            'Use ord() to get the numeric value, add the shift, then use chr() to convert back.',
            'Use modulo 26 to wrap around the alphabet: (ord(ch) - base + shift) % 26 + base.',
            'Handle uppercase and lowercase separately using different base values (ord("A") vs ord("a")).',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  complex()                                                   */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-complex',
        title: 'complex() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'complex(real=0, imag=0) creates a complex number from a real part and an optional imaginary part. It can also parse a string representation like "1+2j". When called with no arguments, it returns 0j.',
            code: `# Signatures
complex()            # returns 0j
complex(real, imag)  # returns real + imag*1j
complex("1+2j")     # parses from string`,
          },
          {
            heading: 'Examples',
            content:
              'Complex numbers in Python use j (not i) for the imaginary unit. The complex() constructor gives you a clear way to create them programmatically.',
            code: `print(complex(3, 4))
print(complex(1))
print(complex())
print(complex("5+3j"))

# Access real and imaginary parts
c = complex(3, 4)
print(f"Real: {c.real}, Imag: {c.imag}")

# Arithmetic with complex numbers
a = complex(2, 3)
b = complex(1, -1)
print(f"Sum: {a + b}")
print(f"Product: {a * b}")`,
            output: `(3+4j)
(1+0j)
0j
(5+3j)
Real: 3.0, Imag: 4.0
Sum: (3+2j)
Product: (5+1j)`,
          },
          {
            heading: 'Common Patterns',
            content:
              'You can use abs() to get the magnitude of a complex number, and the conjugate() method to get the complex conjugate.',
            code: `c = complex(3, 4)

# Magnitude (distance from origin)
print(abs(c))

# Conjugate (flip sign of imaginary part)
print(c.conjugate())

# Check if a number is complex
print(isinstance(1 + 2j, complex))
print(isinstance(42, complex))`,
            output: `5.0
(3-4j)
True
False`,
            tip: 'When parsing from a string, there must be no spaces around the + or - sign: complex("1+2j") works but complex("1 + 2j") raises a ValueError.',
          },
        ],
        quiz: [
          {
            question: 'What does complex(3, 4) return?',
            options: ['3.4', '(3+4j)', '7', '(3, 4)'],
            correctIndex: 1,
            explanation: 'complex(3, 4) creates the complex number 3 + 4j, displayed as (3+4j) in Python.',
          },
          {
            question: 'What does complex() with no arguments return?',
            options: ['0', '(0+0j)', '0j', 'None'],
            correctIndex: 2,
            explanation: 'complex() with no arguments returns 0j, which is the complex zero value.',
          },
          {
            question: 'Which of these raises a ValueError?',
            options: ['complex("1+2j")', 'complex("1 + 2j")', 'complex(1, 2)', 'complex("5j")'],
            correctIndex: 1,
            explanation: 'complex("1 + 2j") raises ValueError because there must be no spaces around the + or - sign when parsing from a string.',
          },
        ],
        challenge: {
          prompt: 'Write a function called complex_distance that takes two complex numbers and returns the distance between them in the complex plane. Use abs() and complex number arithmetic.',
          starterCode: `def complex_distance(z1, z2):
    # Return the distance between two complex numbers
    pass

# Test cases
print(complex_distance(complex(0, 0), complex(3, 4)))  # Expected: 5.0
print(complex_distance(complex(1, 1), complex(4, 5)))  # Expected: 5.0
print(complex_distance(complex(0, 0), complex(0, 0)))  # Expected: 0.0`,
          solutionCode: `def complex_distance(z1, z2):
    return abs(z2 - z1)

# Test cases
print(complex_distance(complex(0, 0), complex(3, 4)))  # 5.0
print(complex_distance(complex(1, 1), complex(4, 5)))  # 5.0
print(complex_distance(complex(0, 0), complex(0, 0)))  # 0.0`,
          hints: [
            'The distance between two complex numbers is the absolute value of their difference.',
            'abs() on a complex number returns its magnitude (distance from origin).',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  divmod()                                                    */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-divmod',
        title: 'divmod() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'divmod(a, b) takes two non-complex numbers and returns a tuple (quotient, remainder) equivalent to (a // b, a % b). It performs both integer division and modulo in a single operation.',
            code: `# Signature
divmod(a, b)  # returns (a // b, a % b)`,
            analogy: 'Think of it like dividing a pile of marbles among friends -- divmod tells you how many each person gets (quotient) and how many are left over (remainder).',
          },
          {
            heading: 'Examples',
            content:
              'divmod() is more efficient than computing // and % separately. It is often used for time conversions, pagination, and any scenario where you need both the quotient and remainder.',
            code: `print(divmod(17, 5))
print(divmod(10, 3))
print(divmod(100, 7))

# Works with floats too
print(divmod(7.5, 2.5))

# Convert seconds to minutes and seconds
total_seconds = 3725
minutes, seconds = divmod(total_seconds, 60)
hours, minutes = divmod(minutes, 60)
print(f"{hours}h {minutes}m {seconds}s")`,
            output: `(3, 2)
(3, 1)
(14, 2)
(3.0, 0.0)
1h 2m 5s`,
            tip: 'divmod(a, b) is slightly faster than computing (a // b, a % b) separately because the CPU performs division and modulo in one instruction.',
            codeHighlightLines: [9, 10, 11],
          },
          {
            heading: 'Edge Cases',
            content:
              'divmod() follows Python floor division rules. For negative numbers, the result may differ from other languages that use truncation division.',
            code: `# Negative dividend
print(divmod(-17, 5))
# Python floors toward negative infinity: -17 // 5 = -4

# Negative divisor
print(divmod(17, -5))

# Both negative
print(divmod(-17, -5))`,
            output: `(-4, 3)
(-4, -3)
(3, -2)`,
          },
        ],
        quiz: [
          {
            question: 'What does divmod(17, 5) return?',
            options: ['(3, 2)', '(3.4, 0)', '3.4', '(2, 3)'],
            correctIndex: 0,
            explanation: 'divmod(17, 5) returns (3, 2) because 17 // 5 = 3 (quotient) and 17 % 5 = 2 (remainder).',
          },
          {
            question: 'What is the advantage of divmod(a, b) over (a // b, a % b)?',
            options: [
              'It returns floats instead of integers',
              'It performs both operations in a single CPU instruction, which is faster',
              'It handles negative numbers differently',
              'It works with strings as well',
            ],
            correctIndex: 1,
            explanation: 'divmod() computes both the quotient and remainder in a single division operation, making it slightly more efficient than computing them separately.',
          },
          {
            question: 'How can you convert 3725 seconds into hours, minutes, and seconds using divmod?',
            options: [
              'divmod(3725, 3600)',
              'divmod(3725, 60) then divmod(minutes, 60)',
              'divmod(3725, 60) only',
              'divmod(3725, 24)',
            ],
            correctIndex: 1,
            explanation: 'First divmod(3725, 60) gives (62, 5) for 62 minutes and 5 seconds, then divmod(62, 60) gives (1, 2) for 1 hour and 2 minutes.',
          },
        ],
        challenge: {
          prompt: 'Write a function called format_duration that takes a total number of seconds (integer) and returns a formatted string like "2h 5m 30s". Use divmod() for the conversions.',
          starterCode: `def format_duration(total_seconds):
    # Convert seconds to hours, minutes, seconds using divmod
    pass

# Test cases
print(format_duration(3725))    # Expected: 1h 2m 5s
print(format_duration(60))      # Expected: 0h 1m 0s
print(format_duration(3661))    # Expected: 1h 1m 1s
print(format_duration(0))       # Expected: 0h 0m 0s`,
          solutionCode: `def format_duration(total_seconds):
    minutes, seconds = divmod(total_seconds, 60)
    hours, minutes = divmod(minutes, 60)
    return f"{hours}h {minutes}m {seconds}s"

# Test cases
print(format_duration(3725))    # 1h 2m 5s
print(format_duration(60))      # 0h 1m 0s
print(format_duration(3661))    # 1h 1m 1s
print(format_duration(0))       # 0h 0m 0s`,
          hints: [
            'First use divmod(total_seconds, 60) to get minutes and remaining seconds.',
            'Then use divmod(minutes, 60) to get hours and remaining minutes.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  enumerate()                                                 */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-enumerate',
        title: 'enumerate() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'enumerate(iterable, start=0) returns an enumerate object that yields tuples of (index, element) from the iterable. The start parameter lets you begin counting from a value other than 0.',
            code: `# Signature
enumerate(iterable, start=0)`,
            diagram: {
              kind: 'custom',
              type: 'array',
              data: {
                values: ['(0, "apple")', '(1, "banana")', '(2, "cherry")'],
                highlightIndices: [0, 1, 2],
                title: 'enumerate(["apple", "banana", "cherry"])',
              },
              caption: 'enumerate() pairs each element with its index as a tuple',
            },
          },
          {
            heading: 'Examples',
            content:
              'enumerate() is the Pythonic way to loop over a sequence when you need both the index and the value. It replaces the manual pattern of maintaining a counter variable.',
            code: `fruits = ["apple", "banana", "cherry"]

for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

print("---")

# Start counting from 1
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")`,
            output: `0: apple
1: banana
2: cherry
---
1. apple
2. banana
3. cherry`,
            tip: 'Prefer enumerate() over range(len(seq)) -- it is more readable and considered idiomatic Python.',
            analogy: 'Think of it like a teacher calling roll -- each student gets a number (index) paired with their name (element).',
            codeHighlightLines: [3, 9],
          },
          {
            heading: 'Common Patterns',
            content:
              'enumerate() works with any iterable, including strings, files, and generators. You can also convert it to a list of tuples or a dictionary.',
            code: `# Convert to a list of tuples
print(list(enumerate(["a", "b", "c"])))

# Create a dict mapping index to value
colors = ["red", "green", "blue"]
index_map = dict(enumerate(colors))
print(index_map)

# Enumerate over a string
for i, ch in enumerate("Hi!"):
    print(f"  {i} -> {repr(ch)}")`,
            output: `[(0, 'a'), (1, 'b'), (2, 'c')]
{0: 'red', 1: 'green', 2: 'blue'}
  0 -> 'H'
  1 -> 'i'
  2 -> '!'`,
          },
        ],
        quiz: [
          {
            question: 'What is the default start value for enumerate()?',
            options: ['1', '0', '-1', 'None'],
            correctIndex: 1,
            explanation: 'enumerate() defaults to start=0, so the first index is 0. You can change this with the start parameter.',
          },
          {
            question: 'What does list(enumerate(["a", "b"], start=5)) return?',
            options: [
              '[(5, "a"), (6, "b")]',
              '[(0, "a"), (1, "b")]',
              '["a", "b"]',
              '[(5, "a"), (5, "b")]',
            ],
            correctIndex: 0,
            explanation: 'With start=5, the first index is 5 and subsequent indices increment by 1, giving [(5, "a"), (6, "b")].',
          },
          {
            question: 'Why is enumerate() preferred over range(len(seq))?',
            options: [
              'It is faster',
              'It is more readable and Pythonic',
              'It uses less memory',
              'It supports negative indices',
            ],
            correctIndex: 1,
            explanation: 'enumerate() is preferred because it directly gives both the index and value, making the code more readable and considered idiomatic Python.',
          },
        ],
        challenge: {
          prompt: 'Write a function called find_all_indices that takes a list and a target value, and returns a list of all indices where the target appears. Use enumerate() in your solution.',
          starterCode: `def find_all_indices(items, target):
    # Return a list of indices where target is found
    pass

# Test cases
print(find_all_indices([1, 2, 3, 2, 4, 2], 2))   # Expected: [1, 3, 5]
print(find_all_indices(["a", "b", "a"], "a"))      # Expected: [0, 2]
print(find_all_indices([1, 2, 3], 5))              # Expected: []`,
          solutionCode: `def find_all_indices(items, target):
    return [i for i, val in enumerate(items) if val == target]

# Test cases
print(find_all_indices([1, 2, 3, 2, 4, 2], 2))   # [1, 3, 5]
print(find_all_indices(["a", "b", "a"], "a"))      # [0, 2]
print(find_all_indices([1, 2, 3], 5))              # []`,
          hints: [
            'Use enumerate() to get both index and value in your loop.',
            'A list comprehension with a condition is a clean way to filter indices.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  globals()                                                   */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-globals',
        title: 'globals() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'globals() returns a dictionary representing the current global symbol table. This is always the dictionary of the current module. The returned dictionary is the actual symbol table, so modifications to it affect the module namespace.',
            code: `# Signature
globals()  # returns dict of global symbol table`,
          },
          {
            heading: 'Examples',
            content:
              'globals() is useful for introspection, dynamic variable access, and debugging. It shows all names defined at the module level, including imports, functions, and variables.',
            code: `x = 42
name = "Python"

g = globals()
print(type(g))
print("x" in g)
print(g["x"])
print(g["name"])

# Dynamically set a global variable
globals()["dynamic_var"] = 99
print(dynamic_var)`,
            output: `<class 'dict'>
True
42
Python
99`,
            tip: 'Modifying globals() directly is powerful but can make code hard to follow. Use it sparingly and prefer explicit variable assignments in production code.',
            analogy: 'Think of it like a master directory for the entire building (module) -- it lists every named room (variable) and what is inside.',
          },
          {
            heading: 'Common Patterns',
            content:
              'globals() is often used in metaprogramming, template engines, and factory patterns where you need to look up or register names dynamically.',
            code: `# List user-defined global variables (exclude dunder names)
x = 10
y = 20

user_globals = {
    k: v for k, v in globals().items()
    if not k.startswith("_")
}
# Filter to just simple types for display
for k, v in user_globals.items():
    if isinstance(v, (int, float, str)):
        print(f"  {k} = {v}")`,
            output: `  x = 10
  y = 20`,
          },
        ],
        quiz: [
          {
            question: 'What does globals() return?',
            options: [
              'A list of global variable names',
              'A dictionary of the current global symbol table',
              'A tuple of all global values',
              'A set of global variable names',
            ],
            correctIndex: 1,
            explanation: 'globals() returns a dictionary representing the current global symbol table, mapping variable names (strings) to their values.',
          },
          {
            question: 'What happens when you modify the dictionary returned by globals()?',
            options: [
              'Nothing, it is a copy',
              'It raises an error',
              'It modifies the actual global namespace',
              'It only works in Python 2',
            ],
            correctIndex: 2,
            explanation: 'The dictionary returned by globals() is the actual symbol table of the module. Modifying it directly changes the global namespace.',
          },
        ],
        challenge: {
          prompt: 'Write a function called create_globals that takes a dictionary of name-value pairs and creates each as a global variable using globals(). Then verify the variables exist.',
          starterCode: `def create_globals(var_dict):
    # Create global variables from the dictionary
    pass

# Test
create_globals({"greeting": "hello", "count": 42})
print(greeting)  # Expected: hello
print(count)     # Expected: 42`,
          solutionCode: `def create_globals(var_dict):
    for name, value in var_dict.items():
        globals()[name] = value

# Test
create_globals({"greeting": "hello", "count": 42})
print(greeting)  # hello
print(count)     # 42`,
          hints: [
            'globals() returns a mutable dictionary that represents the module namespace.',
            'Assigning to globals()[key] = value creates or updates a global variable.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  id()                                                        */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-id',
        title: 'id() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'id(object) returns the identity of an object, which is an integer guaranteed to be unique and constant for the object during its lifetime. In CPython, this is the memory address of the object.',
            code: `# Signature
id(object)`,
          },
          {
            heading: 'Examples',
            content:
              'id() is used to check if two variables reference the exact same object in memory. The "is" operator is equivalent to comparing id() values.',
            code: `a = [1, 2, 3]
b = a         # b references the same list
c = [1, 2, 3] # c is a different list with same content

print(f"id(a) = {id(a)}")
print(f"id(b) = {id(b)}")
print(f"id(c) = {id(c)}")
print(f"a is b: {a is b}")
print(f"a is c: {a is c}")
print(f"a == c: {a == c}")`,
            output: `id(a) = 140234866534400
id(b) = 140234866534400
id(c) = 140234866537600
a is b: True
a is c: False
a == c: True`,
            tip: 'The exact id values will differ every time you run the program. What matters is whether two variables share the same id (same object) or not.',
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    A["a"] -- "points to" --> OBJ1["[1, 2, 3] @ 0x7F...400"]
    B["b"] -- "points to" --> OBJ1
    C["c"] -- "points to" --> OBJ2["[1, 2, 3] @ 0x7F...600"]`,
              caption: 'a and b share the same object identity, while c is a separate object with equal content',
            },
            codeHighlightLines: [2, 3, 8, 9],
          },
          {
            heading: 'Common Patterns',
            content:
              'Python caches small integers (-5 to 256) and interned strings, so these objects share identity. This is an implementation detail of CPython, not a language guarantee.',
            code: `# Small integers are cached
a = 256
b = 256
print(f"a is b (256): {a is b}")

# Strings may be interned
s1 = "hello"
s2 = "hello"
print(f"s1 is s2: {s1 is s2}")

# None is a singleton
print(f"id(None) == id(None): {id(None) == id(None)}")`,
            output: `a is b (256): True
s1 is s2: True
id(None) == id(None): True`,
          },
        ],
        quiz: [
          {
            question: 'What does id() return in CPython?',
            options: [
              'A hash code',
              'The memory address of the object',
              'A random unique number',
              'The index in the garbage collector',
            ],
            correctIndex: 1,
            explanation: 'In CPython, id() returns the memory address of the object. It is guaranteed to be unique and constant for the object during its lifetime.',
          },
          {
            question: 'If a = [1, 2] and b = a, what is true about id(a) and id(b)?',
            options: [
              'id(a) != id(b) always',
              'id(a) == id(b) always',
              'It depends on the list contents',
              'id() does not work with lists',
            ],
            correctIndex: 1,
            explanation: 'b = a makes b reference the same object as a. Since they point to the same object, id(a) == id(b). This is what the "is" operator checks.',
          },
          {
            question: 'What does the "is" operator compare?',
            options: [
              'Values (like ==)',
              'Types',
              'Object identity (id values)',
              'Hash codes',
            ],
            correctIndex: 2,
            explanation: 'The "is" operator checks if two variables reference the exact same object, which is equivalent to comparing their id() values.',
          },
        ],
        challenge: {
          prompt: 'Write a function called are_same_object that takes two arguments and returns a tuple of (same_identity, same_value) where same_identity checks if they are the same object (using id()) and same_value checks if they have equal values.',
          starterCode: `def are_same_object(a, b):
    # Return (same_identity, same_value)
    pass

# Test cases
x = [1, 2, 3]
y = x
z = [1, 2, 3]
print(are_same_object(x, y))  # Expected: (True, True)
print(are_same_object(x, z))  # Expected: (False, True)
print(are_same_object(x, [4, 5]))  # Expected: (False, False)`,
          solutionCode: `def are_same_object(a, b):
    return (id(a) == id(b), a == b)

# Test cases
x = [1, 2, 3]
y = x
z = [1, 2, 3]
print(are_same_object(x, y))  # (True, True)
print(are_same_object(x, z))  # (False, True)
print(are_same_object(x, [4, 5]))  # (False, False)`,
          hints: [
            'Use id(a) == id(b) to check identity (same as "a is b").',
            'Use a == b to check value equality.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  int()                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-int',
        title: 'int() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'int(x, base=10) converts a number or string to an integer. When converting from a string, you can specify the base (2 to 36). With no arguments, int() returns 0. Float arguments are truncated toward zero.',
            code: `# Signatures
int()           # returns 0
int(x)          # converts x to int
int(x, base)    # parses string x in given base`,
          },
          {
            heading: 'Examples',
            content:
              'int() handles strings, floats, and other numeric types. When converting floats, it truncates toward zero rather than rounding.',
            code: `print(int())
print(int("42"))
print(int(3.9))     # truncates, does not round
print(int(-3.9))    # truncates toward zero
print(int(True))

# Different bases
print(int("1010", 2))   # binary
print(int("ff", 16))    # hexadecimal
print(int("77", 8))     # octal
print(int("z", 36))     # base 36`,
            output: `0
42
3
-3
1
10
255
63
35`,
            tip: 'int() truncates toward zero. If you want rounding, use round() instead. If you want floor division, use math.floor().',
            analogy: 'Think of it like a currency exchange booth -- you hand it a value in one format (string, float, binary) and it gives you back a clean whole number.',
            codeHighlightLines: [3, 4, 8, 9],
          },
          {
            heading: 'Edge Cases',
            content:
              'int() can parse strings with leading/trailing whitespace but not with embedded commas or underscores in all contexts. Python 3.6+ allows underscores as visual separators in numeric literals.',
            code: `# Whitespace is stripped
print(int("  123  "))

# Underscores work in string parsing (Python 3.6+)
print(int("1_000_000"))

# Prefix notation with base=0 auto-detects base
print(int("0b1010", 0))   # binary
print(int("0o77", 0))     # octal
print(int("0xff", 0))     # hex`,
            output: `123
1000000
10
63
255`,
          },
        ],
        quiz: [
          {
            question: 'What does int(3.9) return?',
            options: ['4', '3', '3.0', '3.9'],
            correctIndex: 1,
            explanation: 'int() truncates toward zero when converting a float, it does not round. So int(3.9) returns 3, not 4.',
          },
          {
            question: 'What does int("ff", 16) return?',
            options: ['255', '"ff"', '15', 'Raises ValueError'],
            correctIndex: 0,
            explanation: 'int("ff", 16) parses the string "ff" as a hexadecimal number. ff in hex equals 15*16 + 15 = 255.',
          },
          {
            question: 'What does int() with no arguments return?',
            options: ['None', '1', '0', 'Raises TypeError'],
            correctIndex: 2,
            explanation: 'int() with no arguments returns 0, the default integer value.',
          },
          {
            question: 'What does int(-3.9) return?',
            options: ['-4', '-3', '-3.0', '3'],
            correctIndex: 1,
            explanation: 'int() truncates toward zero, not toward negative infinity. So int(-3.9) returns -3 (closer to zero), not -4.',
          },
        ],
        challenge: {
          prompt: 'Write a function called parse_number that takes a string and automatically detects if it is binary (starts with 0b), octal (starts with 0o), hexadecimal (starts with 0x), or decimal, and returns the integer value. Use int() with the appropriate base.',
          starterCode: `def parse_number(s):
    # Automatically detect the base and convert to int
    pass

# Test cases
print(parse_number("0b1010"))   # Expected: 10
print(parse_number("0o77"))     # Expected: 63
print(parse_number("0xff"))     # Expected: 255
print(parse_number("42"))       # Expected: 42`,
          solutionCode: `def parse_number(s):
    return int(s, 0)

# Test cases
print(parse_number("0b1010"))   # 10
print(parse_number("0o77"))     # 63
print(parse_number("0xff"))     # 255
print(parse_number("42"))       # 42`,
          hints: [
            'int() has a special base=0 mode that auto-detects the base from the prefix.',
            'With base=0, int() recognizes 0b (binary), 0o (octal), 0x (hex), and plain decimal strings.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  len()                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-len',
        title: 'len() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'len(s) returns the number of items in an object. The argument can be a sequence (string, bytes, tuple, list, range) or a collection (dict, set, frozenset). Custom objects can support len() by implementing __len__().',
            code: `# Signature
len(s)`,
          },
          {
            heading: 'Examples',
            content:
              'len() is one of the most frequently used built-in functions. It works with all standard container types and returns the count of top-level items.',
            code: `print(len("hello"))
print(len([1, 2, 3, 4]))
print(len({"a": 1, "b": 2}))
print(len(set([1, 2, 2, 3])))
print(len(range(100)))
print(len(()))  # empty tuple
print(len(b"bytes"))`,
            output: `5
4
2
3
100
0
5`,
          },
          {
            heading: 'Common Patterns',
            content:
              'len() is often used in conditions, loops, and assertions. For strings, len() returns the number of characters (Unicode code points), not bytes.',
            code: `# Check if a collection is empty (Pythonic: use truthiness)
items = []
if not items:  # preferred over len(items) == 0
    print("List is empty")

# Unicode string length vs byte length
text = "cafe\u0301"  # e with accent
print(f"Characters: {len(text)}")
print(f"UTF-8 bytes: {len(text.encode('utf-8'))}")

# Custom class with __len__
class Stack:
    def __init__(self):
        self._items = []
    def push(self, item):
        self._items.append(item)
    def __len__(self):
        return len(self._items)

s = Stack()
s.push("a")
s.push("b")
print(f"Stack size: {len(s)}")`,
            output: `List is empty
Characters: 4
UTF-8 bytes: 5
Stack size: 2`,
            tip: 'Prefer "if not my_list:" over "if len(my_list) == 0:" for emptiness checks. It is more Pythonic and slightly faster.',
          },
        ],
        quiz: [
          {
            question: 'What does len({}) return?',
            options: ['1', '0', 'None', 'Raises TypeError'],
            correctIndex: 1,
            explanation: 'An empty dictionary has no key-value pairs, so len({}) returns 0.',
          },
          {
            question: 'What does len("hello") return?',
            options: ['4', '5', '6', '10'],
            correctIndex: 1,
            explanation: 'len("hello") returns 5 because the string "hello" has 5 characters (Unicode code points).',
          },
          {
            question: 'What does len(range(100)) return?',
            options: ['99', '100', '101', 'Raises TypeError'],
            correctIndex: 1,
            explanation: 'range(100) generates numbers from 0 to 99, which is 100 elements. len() works on range objects in O(1) time.',
          },
        ],
        challenge: {
          prompt: 'Write a function called longest_word that takes a sentence string and returns the longest word in it. If there are ties, return the first one. Use len() in your solution.',
          starterCode: `def longest_word(sentence):
    # Return the longest word in the sentence
    pass

# Test cases
print(longest_word("The quick brown fox"))          # Expected: quick
print(longest_word("I love Python programming"))    # Expected: programming
print(longest_word("hi"))                           # Expected: hi`,
          solutionCode: `def longest_word(sentence):
    words = sentence.split()
    return max(words, key=len)

# Test cases
print(longest_word("The quick brown fox"))          # quick
print(longest_word("I love Python programming"))    # programming
print(longest_word("hi"))                           # hi`,
          hints: [
            'Split the sentence into words using .split().',
            'Use max() with key=len to find the word with the greatest length.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  list()                                                      */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-list',
        title: 'list() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'list() creates a new list. With no arguments it returns an empty list. With an iterable argument it creates a list containing the items from that iterable. This is equivalent to [item for item in iterable].',
            code: `# Signatures
list()           # empty list []
list(iterable)   # list from iterable`,
          },
          {
            heading: 'Examples',
            content:
              'list() is commonly used to convert other iterables (tuples, sets, generators, strings, dict keys) into list form for indexing or mutation.',
            code: `# From various iterables
print(list("hello"))
print(list((1, 2, 3)))
print(list({3, 1, 2}))
print(list(range(5)))

# From dict (gets keys by default)
d = {"a": 1, "b": 2, "c": 3}
print(list(d))
print(list(d.values()))
print(list(d.items()))`,
            output: `['h', 'e', 'l', 'l', 'o']
[1, 2, 3]
[1, 2, 3]
[0, 1, 2, 3, 4]
['a', 'b', 'c']
[1, 2, 3]
[('a', 1), ('b', 2), ('c', 3)]`,
            tip: 'list() makes a shallow copy. Nested mutable objects are shared, not duplicated. For deep copies, use copy.deepcopy().',
          },
          {
            heading: 'Common Patterns',
            content:
              'list() is often used to materialize generators and iterators when you need to access items by index or iterate multiple times.',
            code: `# Materialize a generator
squares = list(x**2 for x in range(6))
print(squares)

# Shallow copy of a list
original = [1, 2, 3]
copy = list(original)
copy.append(4)
print(f"Original: {original}")
print(f"Copy: {copy}")

# Convert map/filter results
nums = [1, 2, 3, 4, 5]
evens = list(filter(lambda x: x % 2 == 0, nums))
print(f"Evens: {evens}")`,
            output: `[0, 1, 4, 9, 16, 25]
Original: [1, 2, 3]
Copy: [1, 2, 3, 4]
Evens: [2, 4]`,
          },
        ],
        quiz: [
          {
            question: 'What does list("abc") return?',
            options: ['["abc"]', '["a", "b", "c"]', '"abc"', '[97, 98, 99]'],
            correctIndex: 1,
            explanation: 'list() iterates over the string character by character, creating a list of individual characters: ["a", "b", "c"].',
          },
          {
            question: 'What does list() with no arguments return?',
            options: ['None', '[None]', '[]', 'Raises TypeError'],
            correctIndex: 2,
            explanation: 'list() with no arguments returns an empty list [].',
          },
          {
            question: 'Does list(original) create a deep copy?',
            options: [
              'Yes, it deep copies all nested objects',
              'No, it creates a shallow copy',
              'It depends on the contents',
              'It creates a reference, not a copy',
            ],
            correctIndex: 1,
            explanation: 'list() creates a shallow copy. The list itself is new, but nested mutable objects (like inner lists) are still shared references.',
          },
        ],
        challenge: {
          prompt: 'Write a function called unique_ordered that takes a list and returns a new list with duplicates removed, preserving the original order. Use list() and a set for tracking.',
          starterCode: `def unique_ordered(items):
    # Return a list with duplicates removed, order preserved
    pass

# Test cases
print(unique_ordered([3, 1, 4, 1, 5, 9, 2, 6, 5]))  # Expected: [3, 1, 4, 5, 9, 2, 6]
print(unique_ordered(["a", "b", "a", "c", "b"]))      # Expected: ['a', 'b', 'c']
print(unique_ordered([]))                               # Expected: []`,
          solutionCode: `def unique_ordered(items):
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

# Test cases
print(unique_ordered([3, 1, 4, 1, 5, 9, 2, 6, 5]))  # [3, 1, 4, 5, 9, 2, 6]
print(unique_ordered(["a", "b", "a", "c", "b"]))      # ['a', 'b', 'c']
print(unique_ordered([]))                               # []`,
          hints: [
            'Use a set to track which items you have already seen.',
            'Iterate through the original list, appending only items not yet in the seen set.',
            'Sets have O(1) lookup, making this approach efficient.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  locals()                                                    */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-locals',
        title: 'locals() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'locals() returns a dictionary representing the current local symbol table. At the module level, locals() and globals() return the same dictionary. Inside a function, it captures all local variables at the time of the call.',
            code: `# Signature
locals()  # returns dict of local symbol table`,
          },
          {
            heading: 'Examples',
            content:
              'locals() is primarily used for debugging and introspection. It shows all variables in the current scope.',
            code: `def greet(name, greeting="Hello"):
    message = f"{greeting}, {name}!"
    local_vars = locals()
    print(local_vars)
    return message

greet("Alice")

# At module level, locals() == globals()
x = 10
print("x" in locals())`,
            output: `{'name': 'Alice', 'greeting': 'Hello', 'message': 'Hello, Alice!', 'local_vars': {...}}
True`,
          },
          {
            heading: 'Common Patterns',
            content:
              'locals() is handy for string formatting and creating quick debug output of all variables in scope.',
            code: `def calculate_bmi(weight_kg, height_m):
    bmi = weight_kg / (height_m ** 2)
    category = (
        "underweight" if bmi < 18.5 else
        "normal" if bmi < 25 else
        "overweight"
    )
    # Use locals() for formatted output
    print("BMI Report: weight={weight_kg}kg, "
          "height={height_m}m, "
          "bmi={bmi:.1f}, "
          "category={category}".format(**locals()))

calculate_bmi(70, 1.75)`,
            output: `BMI Report: weight=70kg, height=1.75m, bmi=22.9, category=normal`,
            tip: 'Unlike globals(), modifying the dictionary returned by locals() inside a function does NOT change the actual local variables. The dict is a snapshot, not a live reference.',
          },
        ],
        quiz: [
          {
            question: 'At the module level, what is the relationship between locals() and globals()?',
            options: [
              'They always return different dictionaries',
              'They return the same dictionary',
              'locals() is a subset of globals()',
              'globals() is a subset of locals()',
            ],
            correctIndex: 1,
            explanation: 'At the module level (not inside a function), locals() and globals() return the same dictionary because the local scope IS the global scope.',
          },
          {
            question: 'Can you modify local variables by modifying the dict returned by locals()?',
            options: [
              'Yes, always',
              'No, never inside a function',
              'Only in Python 2',
              'Only for mutable types',
            ],
            correctIndex: 1,
            explanation: 'Inside a function, the dict returned by locals() is a snapshot. Modifying it does NOT change the actual local variables. This is different from globals().',
          },
        ],
        challenge: {
          prompt: 'Write a function called debug_locals that takes arbitrary keyword arguments and prints each variable name and its type using locals(). Use the **kwargs pattern and locals().',
          starterCode: `def debug_locals(**kwargs):
    # Print each local variable name, value, and type
    pass

# Test
debug_locals(name="Alice", age=30, scores=[90, 85])
# Expected output (order may vary):
# name = Alice (str)
# age = 30 (int)
# scores = [90, 85] (list)`,
          solutionCode: `def debug_locals(**kwargs):
    for name, value in kwargs.items():
        print(f"{name} = {value} ({type(value).__name__})")

# Test
debug_locals(name="Alice", age=30, scores=[90, 85])
# name = Alice (str)
# age = 30 (int)
# scores = [90, 85] (list)`,
          hints: [
            'The **kwargs parameter captures keyword arguments as a dictionary.',
            'type(value).__name__ gives a clean string name for the type.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  max()                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-max',
        title: 'max() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'max(iterable, *, key=None, default=...) returns the largest item in an iterable. Alternatively, max(arg1, arg2, *args, key=None) returns the largest of two or more arguments. The key parameter specifies a function for custom comparison.',
            code: `# Signatures
max(iterable, *, key=None, default=None)
max(arg1, arg2, *args, key=None)`,
          },
          {
            heading: 'Examples',
            content:
              'max() works with any comparable items. The key parameter accepts a function that extracts a comparison key from each element.',
            code: `print(max([3, 1, 4, 1, 5, 9]))
print(max(10, 20, 30))
print(max("apple", "banana", "cherry"))

# With key function
words = ["Python", "is", "awesome"]
print(max(words, key=len))

# With default for empty iterables
print(max([], default="N/A"))

# Find the longest string
names = ["Alice", "Bob", "Charlotte", "Dan"]
print(max(names, key=len))`,
            output: `9
30
cherry
awesome
N/A
Charlotte`,
            tip: 'Always provide a default parameter when the iterable might be empty, otherwise max() raises a ValueError.',
            codeHighlightLines: [7, 10],
          },
          {
            heading: 'Common Patterns',
            content:
              'max() is frequently used with dictionaries, tuples, and custom objects by specifying a key function.',
            code: `# Find the key with the highest value in a dict
scores = {"Alice": 92, "Bob": 87, "Charlie": 95}
top_student = max(scores, key=scores.get)
print(f"Top student: {top_student} ({scores[top_student]})")

# Max of tuples (compares element by element)
points = [(1, 5), (3, 2), (2, 8)]
print(max(points))              # by first element
print(max(points, key=lambda p: p[1]))  # by second element`,
            output: `Top student: Charlie (95)
(3, 2)
(2, 8)`,
          },
        ],
        quiz: [
          {
            question: 'What does max([]) return?',
            options: ['0', 'None', '[]', 'Raises ValueError'],
            correctIndex: 3,
            explanation: 'max() raises a ValueError when given an empty iterable unless you provide a default parameter: max([], default=0).',
          },
          {
            question: 'What does max("apple", "banana", "cherry") return?',
            options: ['"apple"', '"cherry"', '"banana"', '6'],
            correctIndex: 1,
            explanation: 'Strings are compared lexicographically. "cherry" comes last alphabetically among the three options, so max() returns "cherry".',
          },
          {
            question: 'What does max(["hi", "hello", "hey"], key=len) return?',
            options: ['"hi"', '"hello"', '"hey"', '5'],
            correctIndex: 1,
            explanation: 'With key=len, max() compares elements by their length. "hello" has 5 characters, which is the longest, so it is returned.',
          },
        ],
        challenge: {
          prompt: 'Write a function called second_largest that takes a list of numbers and returns the second largest unique value. Use max() or sorted() creatively.',
          starterCode: `def second_largest(nums):
    # Return the second largest unique value
    pass

# Test cases
print(second_largest([3, 1, 4, 1, 5, 9]))  # Expected: 5
print(second_largest([10, 10, 10, 5]))      # Expected: 5
print(second_largest([1, 2]))               # Expected: 1`,
          solutionCode: `def second_largest(nums):
    unique = list(set(nums))
    unique.sort(reverse=True)
    return unique[1]

# Test cases
print(second_largest([3, 1, 4, 1, 5, 9]))  # 5
print(second_largest([10, 10, 10, 5]))      # 5
print(second_largest([1, 2]))               # 1`,
          hints: [
            'First remove duplicates using set() to get unique values.',
            'Sort the unique values in descending order and return the second element.',
            'Alternatively, find max(), remove it, then find max() again.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  min()                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-min',
        title: 'min() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'min(iterable, *, key=None, default=...) returns the smallest item in an iterable. Alternatively, min(arg1, arg2, *args, key=None) returns the smallest of two or more arguments. It mirrors max() in every way.',
            code: `# Signatures
min(iterable, *, key=None, default=None)
min(arg1, arg2, *args, key=None)`,
          },
          {
            heading: 'Examples',
            content:
              'min() follows the same rules as max() but returns the smallest element. It supports key functions, default values, and multiple arguments.',
            code: `print(min([3, 1, 4, 1, 5, 9]))
print(min(10, 20, 30))
print(min("apple", "banana", "cherry"))

# With key function -- shortest word
words = ["Python", "is", "awesome"]
print(min(words, key=len))

# Clamp a value between min and max
value = 150
clamped = max(0, min(value, 100))
print(f"Clamped: {clamped}")`,
            output: `1
10
apple
is
Clamped: 100`,
          },
          {
            heading: 'Common Patterns',
            content:
              'min() and max() together are useful for finding ranges, clamping values, and normalizing data.',
            code: `# Find the range of a dataset
data = [23, 45, 12, 67, 34, 89, 5]
print(f"Min: {min(data)}, Max: {max(data)}")
print(f"Range: {max(data) - min(data)}")

# Find closest value to a target
target = 50
closest = min(data, key=lambda x: abs(x - target))
print(f"Closest to {target}: {closest}")`,
            output: `Min: 5, Max: 89
Range: 84
Closest to 50: 45`,
            tip: 'To find both min and max in a single pass over large data, consider using a manual loop or the statistics module rather than calling min() and max() separately.',
          },
        ],
        quiz: [
          {
            question: 'What does min("apple", "banana", "cherry") return?',
            options: ['"cherry"', '"banana"', '"apple"', '5'],
            correctIndex: 2,
            explanation: 'Strings are compared lexicographically. "apple" comes first alphabetically, so min() returns "apple".',
          },
          {
            question: 'What does max(0, min(150, 100)) return?',
            options: ['150', '100', '0', 'Raises ValueError'],
            correctIndex: 1,
            explanation: 'This is a clamping pattern. min(150, 100) returns 100, then max(0, 100) returns 100. The value 150 is clamped to the maximum of 100.',
          },
          {
            question: 'How do you find the value closest to a target in a list?',
            options: [
              'min(data)',
              'min(data, key=lambda x: abs(x - target))',
              'max(data, key=lambda x: target - x)',
              'sorted(data)[len(data) // 2]',
            ],
            correctIndex: 1,
            explanation: 'min() with key=lambda x: abs(x - target) finds the element whose absolute distance from the target is smallest.',
          },
        ],
        challenge: {
          prompt: 'Write a function called clamp that takes a value, a minimum, and a maximum, and returns the value clamped within that range. Use min() and max().',
          starterCode: `def clamp(value, min_val, max_val):
    # Return value clamped between min_val and max_val
    pass

# Test cases
print(clamp(15, 0, 10))    # Expected: 10
print(clamp(-5, 0, 10))    # Expected: 0
print(clamp(5, 0, 10))     # Expected: 5
print(clamp(100, 50, 75))  # Expected: 75`,
          solutionCode: `def clamp(value, min_val, max_val):
    return max(min_val, min(value, max_val))

# Test cases
print(clamp(15, 0, 10))    # 10
print(clamp(-5, 0, 10))    # 0
print(clamp(5, 0, 10))     # 5
print(clamp(100, 50, 75))  # 75`,
          hints: [
            'Use min(value, max_val) to cap the value at the upper bound.',
            'Then use max(min_val, ...) to ensure it does not go below the lower bound.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  open()                                                      */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-open',
        title: 'open() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'open(file, mode="r", encoding=None, ...) opens a file and returns a file object. Common modes are "r" (read text), "w" (write text, truncates), "a" (append), "rb"/"wb" (binary). Always specify encoding for text files to avoid platform-dependent behavior.',
            code: `# Common signatures
open(file, mode="r", encoding="utf-8")
open(file, mode="w", encoding="utf-8")
open(file, mode="rb")  # binary read`,
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    A["open(file, mode)"] --> B{"Mode?"}
    B -- "'r'" --> C["Read text"]
    B -- "'w'" --> D["Write text (truncate)"]
    B -- "'a'" --> E["Append text"]
    B -- "'rb'" --> F["Read binary"]
    B -- "'wb'" --> G["Write binary"]
    C --> H["Returns file object"]
    D --> H
    E --> H
    F --> H
    G --> H`,
              caption: 'open() file modes determine how the file is accessed',
            },
          },
          {
            heading: 'Examples',
            content:
              'Always use open() with a "with" statement (context manager) to ensure the file is properly closed, even if an exception occurs.',
            code: `# Writing to a file
with open("example.txt", "w", encoding="utf-8") as f:
    f.write("Hello, World!\\n")
    f.write("Python is great.\\n")

# Reading the entire file
with open("example.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)

# Reading line by line
with open("example.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(f"Line: {line.strip()}")`,
            output: `Hello, World!
Python is great.

Line: Hello, World!
Line: Python is great.`,
            tip: 'Always specify encoding="utf-8" explicitly. The default encoding varies by platform (UTF-8 on Linux/macOS, but locale-dependent on Windows).',
            analogy: 'Think of it like opening a physical book -- you choose to read it, write in it, or append notes at the end, and you always close it when done.',
            codeHighlightLines: [2, 7, 12],
          },
          {
            heading: 'Common Patterns',
            content:
              'open() supports several modes and can work with binary data, appending, and simultaneous read/write.',
            code: `# Append to a file
with open("log.txt", "a", encoding="utf-8") as f:
    f.write("New log entry\\n")

# Read lines into a list
with open("example.txt", encoding="utf-8") as f:
    lines = f.readlines()
    print(lines)

# Binary mode for non-text files
with open("image.png", "rb") as f:
    header = f.read(8)
    print(f"First 8 bytes: {header}")`,
            output: `['Hello, World!\\n', 'Python is great.\\n']
First 8 bytes: b'\\x89PNG\\r\\n\\x1a\\n'`,
          },
        ],
        quiz: [
          {
            question: 'What is the recommended way to use open() in Python?',
            options: [
              'f = open("file.txt"); f.close()',
              'with open("file.txt") as f:',
              'open("file.txt").read()',
              'try: f = open("file.txt") finally: f.close()',
            ],
            correctIndex: 1,
            explanation: 'Using "with open(...) as f:" is the recommended pattern because the context manager automatically closes the file, even if an exception occurs.',
          },
          {
            question: 'What does mode "a" do in open()?',
            options: [
              'Opens for reading all content',
              'Opens for appending (adds to the end)',
              'Opens for automatic mode detection',
              'Opens for asynchronous reading',
            ],
            correctIndex: 1,
            explanation: 'Mode "a" opens the file for appending. Writes are added to the end of the file without truncating existing content.',
          },
          {
            question: 'Why should you specify encoding="utf-8" explicitly?',
            options: [
              'It makes the file smaller',
              'It is required by Python 3',
              'The default encoding varies by platform',
              'It enables emoji support',
            ],
            correctIndex: 2,
            explanation: 'The default encoding depends on the platform (UTF-8 on Linux/macOS, locale-dependent on Windows). Explicit encoding ensures consistent behavior.',
          },
        ],
        challenge: {
          prompt: 'Write a function called word_count that takes a filename and returns a dictionary mapping each word (lowercased) to its count. Use open() with a context manager.',
          starterCode: `def word_count(filename):
    # Read file and count word occurrences
    pass

# Assume "sample.txt" contains: "Hello world hello Python world"
# Expected: {"hello": 2, "world": 2, "python": 1}`,
          solutionCode: `def word_count(filename):
    counts = {}
    with open(filename, "r", encoding="utf-8") as f:
        for line in f:
            for word in line.lower().split():
                counts[word] = counts.get(word, 0) + 1
    return counts

# Usage: word_count("sample.txt")`,
          hints: [
            'Use a with statement to safely open and read the file.',
            'Split each line into words and convert to lowercase for case-insensitive counting.',
            'Use dict.get(key, 0) to handle the first occurrence of each word.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  pow()                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-pow',
        title: 'pow() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'pow(base, exp, mod=None) returns base raised to the power exp. With the optional mod argument, it returns (base ** exp) % mod, which is computed more efficiently than doing the operations separately. The two-argument form is equivalent to the ** operator.',
            code: `# Signatures
pow(base, exp)        # same as base ** exp
pow(base, exp, mod)   # efficient (base ** exp) % mod`,
          },
          {
            heading: 'Examples',
            content:
              'The two-argument form computes exponentiation. The three-argument form is especially useful in cryptography and modular arithmetic because it avoids creating huge intermediate values.',
            code: `print(pow(2, 10))
print(pow(3, 4))
print(pow(2, -1))   # negative exponent returns float

# Three-argument form: modular exponentiation
print(pow(2, 10, 1000))  # 1024 % 1000
print(pow(3, 100, 97))   # efficient for large exponents

# Equivalent to ** operator
print(2 ** 10)
print(pow(2, 10))`,
            output: `1024
81
0.5
24
35
1024
1024`,
            tip: 'pow(base, exp, mod) uses fast modular exponentiation internally, making it efficient even for very large exponents. This is the standard approach in RSA cryptography.',
          },
          {
            heading: 'Edge Cases',
            content:
              'pow() with mod requires all arguments to be integers and the exponent to be non-negative. Some special cases are worth noting.',
            code: `# Any number to the power 0 is 1
print(pow(999, 0))

# 0 to any positive power is 0
print(pow(0, 100))

# pow with floats
print(pow(2.5, 2))

# Modular inverse (Python 3.8+): pow(a, -1, mod)
# Finds x such that (a * x) % mod == 1
print(pow(3, -1, 7))  # 3 * 5 = 15, 15 % 7 = 1`,
            output: `1
0
6.25
5`,
          },
        ],
        quiz: [
          {
            question: 'What does pow(2, 10) return?',
            options: ['20', '100', '1024', '512'],
            correctIndex: 2,
            explanation: 'pow(2, 10) computes 2 raised to the 10th power, which equals 1024.',
          },
          {
            question: 'What is the advantage of pow(base, exp, mod) over (base ** exp) % mod?',
            options: [
              'It returns a float instead of int',
              'It avoids creating huge intermediate values',
              'It works with negative exponents',
              'It is more readable',
            ],
            correctIndex: 1,
            explanation: 'The three-argument form pow(base, exp, mod) uses modular exponentiation internally, avoiding the creation of astronomically large intermediate values.',
          },
          {
            question: 'What does pow(3, -1, 7) compute (Python 3.8+)?',
            options: [
              '0.333...',
              'The modular inverse: a number x where (3 * x) % 7 == 1',
              'Raises ValueError',
              '-3',
            ],
            correctIndex: 1,
            explanation: 'pow(3, -1, 7) computes the modular inverse of 3 mod 7. It finds x such that (3 * x) % 7 == 1. The answer is 5 because 3 * 5 = 15 and 15 % 7 = 1.',
          },
        ],
        challenge: {
          prompt: 'Write a function called is_power_of_two that takes a positive integer and returns True if it is a power of 2. Use pow() or the ** operator creatively, or use a logarithmic/bitwise approach.',
          starterCode: `def is_power_of_two(n):
    # Return True if n is a power of 2
    pass

# Test cases
print(is_power_of_two(1))    # Expected: True  (2**0)
print(is_power_of_two(16))   # Expected: True  (2**4)
print(is_power_of_two(10))   # Expected: False
print(is_power_of_two(1024)) # Expected: True  (2**10)`,
          solutionCode: `def is_power_of_two(n):
    if n <= 0:
        return False
    return n & (n - 1) == 0

# Test cases
print(is_power_of_two(1))    # True  (2**0)
print(is_power_of_two(16))   # True  (2**4)
print(is_power_of_two(10))   # False
print(is_power_of_two(1024)) # True  (2**10)`,
          hints: [
            'A power of 2 in binary has exactly one 1-bit (e.g., 8 = 1000).',
            'The bitwise trick: n & (n - 1) == 0 is True only for powers of 2 (and 0).',
            'Alternatively, check if any pow(2, k) equals n for k in range(0, 31).',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  print()                                                     */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-print',
        title: 'print() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'print(*objects, sep=" ", end="\\n", file=sys.stdout, flush=False) prints objects to the text stream file, separated by sep and followed by end. It converts each object to a string using str().',
            code: `# Signature
print(*objects, sep=" ", end="\\n", file=None, flush=False)`,
          },
          {
            heading: 'Examples',
            content:
              'print() is the most commonly used function in Python. The sep and end parameters give you fine control over formatting without needing string concatenation.',
            code: `print("Hello, World!")
print("one", "two", "three")
print("one", "two", "three", sep=", ")
print("one", "two", "three", sep=" -> ")

# Custom end (no newline)
print("Loading", end="")
print("...", end="")
print(" Done!")

# Print multiple types
print("Age:", 25, "Height:", 5.9, "Active:", True)`,
            output: `Hello, World!
one two three
one, two, three
one -> two -> three
Loading... Done!
Age: 25 Height: 5.9 Active: True`,
          },
          {
            heading: 'Common Patterns',
            content:
              'print() can write to files and is useful for quick debugging. For production logging, prefer the logging module instead.',
            code: `import sys

# Print to stderr
print("Warning: low memory", file=sys.stderr)

# Pretty-print a separator
print("=" * 40)
print("REPORT".center(40))
print("=" * 40)

# Unpack a list into print
items = ["apple", "banana", "cherry"]
print(*items, sep=" | ")`,
            output: `Warning: low memory
========================================
               REPORT
========================================
apple | banana | cherry`,
            tip: 'Use f-strings (f"...") for complex formatting rather than passing many arguments to print(). It is more readable: print(f"Name: {name}, Age: {age}").',
          },
        ],
        quiz: [
          {
            question: 'What is the default separator for print()?',
            options: ['","', '"\\n"', '" " (space)', '"\\t" (tab)'],
            correctIndex: 2,
            explanation: 'By default, print() separates multiple arguments with a single space. You can change this with the sep parameter.',
          },
          {
            question: 'What is the default end character for print()?',
            options: ['" " (space)', '"\\n" (newline)', 'None', '""'],
            correctIndex: 1,
            explanation: 'print() appends a newline character ("\\n") after the output by default. Use end="" to suppress the newline.',
          },
          {
            question: 'How do you print to stderr instead of stdout?',
            options: [
              'print("msg", stderr=True)',
              'print("msg", file=sys.stderr)',
              'eprint("msg")',
              'print.error("msg")',
            ],
            correctIndex: 1,
            explanation: 'Use the file parameter: print("msg", file=sys.stderr). You need to import sys first.',
          },
        ],
        challenge: {
          prompt: 'Write a function called print_table that takes a list of dictionaries (all with the same keys) and prints a formatted table with headers. Use print() with sep and string formatting.',
          starterCode: `def print_table(records):
    # Print a formatted table with headers
    pass

# Test
data = [
    {"name": "Alice", "age": 30, "city": "NYC"},
    {"name": "Bob", "age": 25, "city": "LA"},
    {"name": "Charlie", "age": 35, "city": "Chicago"},
]
print_table(data)
# Expected output:
# name     | age | city
# ---------|-----|--------
# Alice    | 30  | NYC
# Bob      | 25  | LA
# Charlie  | 35  | Chicago`,
          solutionCode: `def print_table(records):
    if not records:
        return
    headers = list(records[0].keys())
    col_widths = {h: max(len(h), max(len(str(r[h])) for r in records)) for h in headers}
    header_line = " | ".join(h.ljust(col_widths[h]) for h in headers)
    print(header_line)
    print("-|-".join("-" * col_widths[h] for h in headers))
    for record in records:
        row = " | ".join(str(record[h]).ljust(col_widths[h]) for h in headers)
        print(row)

# Test
data = [
    {"name": "Alice", "age": 30, "city": "NYC"},
    {"name": "Bob", "age": 25, "city": "LA"},
    {"name": "Charlie", "age": 35, "city": "Chicago"},
]
print_table(data)`,
          hints: [
            'Calculate column widths based on the longest value in each column.',
            'Use str.ljust() to pad strings to a fixed width for alignment.',
            'Print the header row first, then a separator line, then each data row.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  property()                                                  */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-property',
        title: 'property() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'property(fget=None, fset=None, fdel=None, doc=None) returns a property attribute. It is most commonly used as a decorator (@property) to define managed attributes that look like simple attributes but execute getter/setter methods behind the scenes.',
            code: `# As a decorator (most common)
# @property          -- getter
# @name.setter       -- setter
# @name.deleter      -- deleter

# Or as a function
# attr = property(fget, fset, fdel, doc)`,
            analogy: 'Think of it like a security guard at a door -- the property looks like a regular room (attribute), but the guard (getter/setter) checks everyone going in and out.',
          },
          {
            heading: 'Examples',
            content:
              'The @property decorator lets you add validation and computed attributes while keeping a clean attribute-access syntax for users of the class.',
            code: `class Circle:
    def __init__(self, radius):
        self._radius = radius  # private attribute

    @property
    def radius(self):
        """The radius of the circle."""
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @property
    def area(self):
        import math
        return math.pi * self._radius ** 2

c = Circle(5)
print(f"Radius: {c.radius}")
print(f"Area: {c.area:.2f}")

c.radius = 10
print(f"New radius: {c.radius}")
print(f"New area: {c.area:.2f}")`,
            output: `Radius: 5
Area: 78.54
New radius: 10
New area: 314.16`,
            tip: 'Use @property for validation, computed attributes, and to maintain backward compatibility when refactoring a public attribute into a method.',
            codeHighlightLines: [5, 10, 16],
          },
          {
            heading: 'Common Patterns',
            content:
              'Properties are widely used for read-only attributes, lazy computation, and encapsulating internal state changes.',
            code: `class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @property
    def fahrenheit(self):
        return self.celsius * 9/5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9

t = Temperature(100)
print(f"{t.celsius}C = {t.fahrenheit}F")

t.fahrenheit = 32
print(f"{t.fahrenheit}F = {t.celsius}C")`,
            output: `100C = 212.0F
32F = 0.0C`,
          },
        ],
        quiz: [
          {
            question: 'What does @property do in Python?',
            options: [
              'Makes an attribute private',
              'Creates a getter method that looks like attribute access',
              'Prevents attribute modification',
              'Makes a class immutable',
            ],
            correctIndex: 1,
            explanation: '@property creates a managed attribute with a getter method. When you access obj.attr, it actually calls the getter method behind the scenes.',
          },
          {
            question: 'How do you define a setter for a property named "radius"?',
            options: [
              '@setter',
              '@radius.setter',
              '@property.setter',
              '@set_radius',
            ],
            correctIndex: 1,
            explanation: 'The setter decorator uses the property name: @radius.setter. The method below it must also be named "radius".',
          },
          {
            question: 'When is @property most useful?',
            options: [
              'For storing data in a database',
              'For validation, computed attributes, and backward compatibility',
              'For making methods faster',
              'For parallel processing',
            ],
            correctIndex: 1,
            explanation: '@property is most useful for adding validation to attribute setting, creating computed/derived attributes, and maintaining backward compatibility when refactoring.',
          },
        ],
        challenge: {
          prompt: 'Write a class called BankAccount with a property balance that prevents setting a negative balance (raises ValueError). Include deposit and withdraw methods.',
          starterCode: `class BankAccount:
    def __init__(self, initial_balance=0):
        # Initialize the balance
        pass

    @property
    def balance(self):
        pass

    @balance.setter
    def balance(self, value):
        pass

    def deposit(self, amount):
        pass

    def withdraw(self, amount):
        pass

# Test
account = BankAccount(100)
print(account.balance)       # Expected: 100
account.deposit(50)
print(account.balance)       # Expected: 150
account.withdraw(30)
print(account.balance)       # Expected: 120`,
          solutionCode: `class BankAccount:
    def __init__(self, initial_balance=0):
        self.balance = initial_balance

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("Balance cannot be negative")
        self._balance = value

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        self.balance -= amount

# Test
account = BankAccount(100)
print(account.balance)       # 100
account.deposit(50)
print(account.balance)       # 150
account.withdraw(30)
print(account.balance)       # 120`,
          hints: [
            'Store the actual value in a private attribute like self._balance.',
            'The setter should validate and raise ValueError for negative values.',
            'deposit and withdraw can simply modify self.balance, triggering the setter validation.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  range()                                                     */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-range',
        title: 'range() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'range(stop) or range(start, stop, step) returns an immutable sequence of numbers. It generates values lazily, so it uses constant memory regardless of the range size. The stop value is exclusive.',
            code: `# Signatures
range(stop)              # 0 to stop-1
range(start, stop)       # start to stop-1
range(start, stop, step) # start to stop-1, by step`,
          },
          {
            heading: 'Examples',
            content:
              'range() is the standard way to generate a sequence of integers for loops, indexing, and iteration. It does not create a list in memory -- it computes values on the fly.',
            code: `print(list(range(5)))
print(list(range(2, 8)))
print(list(range(0, 20, 3)))
print(list(range(10, 0, -1)))

# Common for-loop usage
for i in range(3):
    print(f"Iteration {i}")`,
            output: `[0, 1, 2, 3, 4]
[2, 3, 4, 5, 6, 7]
[0, 3, 6, 9, 12, 15, 18]
[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
Iteration 0
Iteration 1
Iteration 2`,
            tip: 'range() objects support membership testing (5 in range(10) is O(1)), slicing, and indexing -- they are not just iterators.',
            analogy: 'Think of it like a number dispenser at a deli counter -- it gives you the next number on demand without printing all tickets upfront.',
          },
          {
            heading: 'Common Patterns',
            content:
              'range() is memory efficient and supports many sequence operations. Use it to generate indices, count backwards, or step through numbers.',
            code: `# Memory efficient: does not store all values
r = range(1_000_000)
print(f"Length: {len(r)}")
print(f"500000 in r: {500000 in r}")  # O(1) check
print(f"r[999999]: {r[999999]}")

# Reverse iteration
for i in range(5, 0, -1):
    print(i, end=" ")
print()

# Generate even numbers
evens = list(range(0, 20, 2))
print(evens)`,
            output: `Length: 1000000
500000 in r: True
r[999999]: 999999
5 4 3 2 1
[0, 2, 4, 6, 8, 10, 12, 14, 16, 18]`,
          },
        ],
        quiz: [
          {
            question: 'What does range(5) generate?',
            options: ['[1, 2, 3, 4, 5]', '[0, 1, 2, 3, 4]', '[0, 1, 2, 3, 4, 5]', '[1, 2, 3, 4]'],
            correctIndex: 1,
            explanation: 'range(5) generates numbers starting from 0 up to (but not including) 5: 0, 1, 2, 3, 4.',
          },
          {
            question: 'What is the time complexity of "5 in range(1000000)"?',
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
            correctIndex: 1,
            explanation: 'range objects support O(1) membership testing because they can compute whether a value falls within the range mathematically.',
          },
          {
            question: 'How do you generate numbers counting backward from 10 to 1?',
            options: ['range(10, 0)', 'range(10, 0, -1)', 'range(1, 10, -1)', 'range(10, 1)'],
            correctIndex: 1,
            explanation: 'range(10, 0, -1) starts at 10, counts down by 1, and stops before 0, generating 10, 9, 8, ..., 1.',
          },
          {
            question: 'Does range() create a list in memory?',
            options: [
              'Yes, it creates a list of all values',
              'No, it computes values lazily on demand',
              'It depends on the range size',
              'Only in Python 2',
            ],
            correctIndex: 1,
            explanation: 'range() is lazy -- it computes values on the fly and uses constant memory regardless of the range size.',
          },
        ],
        challenge: {
          prompt: 'Write a function called fizzbuzz that takes n and returns a list where each element is "Fizz" for multiples of 3, "Buzz" for multiples of 5, "FizzBuzz" for multiples of both, or the number as a string. Use range().',
          starterCode: `def fizzbuzz(n):
    # Return FizzBuzz results for numbers 1 to n
    pass

# Test cases
print(fizzbuzz(15))
# Expected: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']`,
          solutionCode: `def fizzbuzz(n):
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result

# Test cases
print(fizzbuzz(15))`,
          hints: [
            'Use range(1, n + 1) to generate numbers from 1 to n inclusive.',
            'Check divisibility by 15 first (for FizzBuzz), then by 3 and 5 separately.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  round()                                                     */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-round',
        title: 'round() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'round(number, ndigits=None) rounds a number to a given precision in decimal digits. If ndigits is omitted or None, it returns the nearest integer. Python uses "banker\'s rounding" (round half to even) to reduce cumulative rounding bias.',
            code: `# Signatures
round(number)          # returns int
round(number, ndigits) # returns float (same type as input)`,
          },
          {
            heading: 'Examples',
            content:
              'round() is straightforward for most cases, but its behavior with exact halfway values (banker\'s rounding) surprises many programmers coming from other languages.',
            code: `print(round(3.7))
print(round(3.2))
print(round(3.14159, 2))
print(round(3.14159, 4))

# Banker's rounding: round half to even
print(round(0.5))   # rounds to 0 (even)
print(round(1.5))   # rounds to 2 (even)
print(round(2.5))   # rounds to 2 (even)
print(round(3.5))   # rounds to 4 (even)`,
            output: `4
3
3.14
3.1416
0
2
2
4`,
            tip: 'Banker\'s rounding avoids the upward bias of always rounding 0.5 up. For traditional rounding, use math.floor(x + 0.5) or the decimal module.',
            codeHighlightLines: [7, 8, 9, 10],
          },
          {
            heading: 'Common Patterns',
            content:
              'round() with negative ndigits rounds to the left of the decimal point, which is useful for rounding to the nearest ten, hundred, etc.',
            code: `# Negative ndigits: round to tens, hundreds, etc.
print(round(1234, -1))   # nearest 10
print(round(1234, -2))   # nearest 100
print(round(1234, -3))   # nearest 1000

# ndigits=0 returns float, ndigits=None returns int
print(round(3.7, 0))   # 4.0 (float)
print(round(3.7))       # 4 (int)
print(type(round(3.7, 0)), type(round(3.7)))`,
            output: `1230
1200
1000
4.0
4
<class 'float'> <class 'int'>`,
          },
        ],
        quiz: [
          {
            question: 'What does round(2.5) return in Python 3?',
            options: ['3', '2', '2.5', '2.0'],
            correctIndex: 1,
            explanation: 'Python uses "banker\'s rounding" (round half to even). Since 2 is even, 2.5 rounds to 2, not 3.',
          },
          {
            question: 'What does round(3.14159, 2) return?',
            options: ['3.14', '3.15', '3.1', '3.14159'],
            correctIndex: 0,
            explanation: 'round(3.14159, 2) rounds to 2 decimal places. The third decimal is 1, which is less than 5, so it rounds down to 3.14.',
          },
          {
            question: 'What does round(1234, -2) return?',
            options: ['1234', '1200', '1230', '1300'],
            correctIndex: 1,
            explanation: 'Negative ndigits rounds to the left of the decimal point. -2 rounds to the nearest hundred, so 1234 becomes 1200.',
          },
        ],
        challenge: {
          prompt: 'Write a function called round_to_nearest that takes a number and a step value, and rounds the number to the nearest multiple of step. For example, round_to_nearest(17, 5) should return 15.',
          starterCode: `def round_to_nearest(number, step):
    # Round number to the nearest multiple of step
    pass

# Test cases
print(round_to_nearest(17, 5))     # Expected: 15
print(round_to_nearest(18, 5))     # Expected: 20
print(round_to_nearest(3.7, 0.5))  # Expected: 3.5
print(round_to_nearest(100, 30))   # Expected: 90`,
          solutionCode: `def round_to_nearest(number, step):
    return round(number / step) * step

# Test cases
print(round_to_nearest(17, 5))     # 15
print(round_to_nearest(18, 5))     # 20
print(round_to_nearest(3.7, 0.5))  # 3.5
print(round_to_nearest(100, 30))   # 90`,
          hints: [
            'Divide the number by the step, round to the nearest integer, then multiply back by the step.',
            'round(number / step) * step handles all cases cleanly.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  slice()                                                     */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-slice',
        title: 'slice() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'slice(stop) or slice(start, stop, step) creates a slice object representing the set of indices specified by range(start, stop, step). Slice objects are used internally when you write a[1:5] syntax and can be stored in variables for reuse.',
            code: `# Signatures
slice(stop)
slice(start, stop)
slice(start, stop, step)`,
          },
          {
            heading: 'Examples',
            content:
              'Slice objects let you define a slicing pattern once and reuse it across multiple sequences. This is useful when processing columnar data or applying the same extraction logic repeatedly.',
            code: `s = slice(1, 5)
data = [10, 20, 30, 40, 50, 60, 70]
text = "Hello, World!"

print(data[s])
print(text[s])

# Equivalent to data[::2]
every_other = slice(None, None, 2)
print(data[every_other])

# Named slices for readability
FIRST_NAME = slice(0, 10)
LAST_NAME = slice(10, 20)
record = "Alice     Smith     "
print(record[FIRST_NAME].strip())
print(record[LAST_NAME].strip())`,
            output: `[20, 30, 40, 50]
ello
[10, 30, 50, 70]
Alice
Smith`,
            diagram: {
              kind: 'custom',
              type: 'array',
              data: {
                values: ['10', '20', '30', '40', '50', '60', '70'],
                highlightIndices: [1, 2, 3, 4],
                title: 'slice(1, 5) selects indices 1 through 4',
              },
              caption: 'slice(1, 5) extracts elements at positions 1, 2, 3, 4 (stop is exclusive)',
            },
          },
          {
            heading: 'Common Patterns',
            content:
              'Slice objects have start, stop, and step attributes, and an indices() method that returns concrete index values for a sequence of a given length.',
            code: `s = slice(1, 10, 2)
print(f"start={s.start}, stop={s.stop}, step={s.step}")

# indices() returns (start, stop, step) adjusted for length
print(s.indices(7))  # adjusted for sequence of length 7

# Use indices() to iterate manually
data = "abcdefg"
start, stop, step = s.indices(len(data))
result = ""
for i in range(start, stop, step):
    result += data[i]
print(result)`,
            output: `start=1, stop=10, step=2
(1, 7, 2)
bdf`,
            tip: 'Named slice objects make fixed-width file parsing much more readable than hard-coded index numbers scattered throughout your code.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  sorted()                                                    */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-sorted',
        title: 'sorted() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'sorted(iterable, *, key=None, reverse=False) returns a new sorted list from the items in iterable. Unlike list.sort(), which sorts in place, sorted() works on any iterable and always returns a new list.',
            code: `# Signature
sorted(iterable, *, key=None, reverse=False)`,
            analogy: 'Think of it like a librarian who takes a pile of books, arranges them in order, and gives you back a neatly organized new stack -- the original pile stays untouched.',
          },
          {
            heading: 'Examples',
            content:
              'sorted() is versatile and works with lists, tuples, strings, dicts, and any iterable. The key parameter enables custom sort orders.',
            code: `print(sorted([3, 1, 4, 1, 5, 9, 2, 6]))
print(sorted("python"))
print(sorted([3, 1, 4], reverse=True))

# Sort strings by length
words = ["banana", "pie", "apple", "kiwi"]
print(sorted(words))
print(sorted(words, key=len))

# Case-insensitive sort
names = ["charlie", "Alice", "bob"]
print(sorted(names, key=str.lower))`,
            output: `[1, 1, 2, 3, 4, 5, 6, 9]
['h', 'n', 'o', 'p', 't', 'y']
[4, 3, 1]
['apple', 'banana', 'kiwi', 'pie']
['banana', 'kiwi', 'pie', 'apple']
['Alice', 'bob', 'charlie']`,
            tip: 'sorted() uses Timsort, which is O(n log n) and is stable -- equal elements maintain their original relative order.',
            codeHighlightLines: [3, 8, 12],
          },
          {
            heading: 'Common Patterns',
            content:
              'sorted() is commonly combined with operator.itemgetter or lambda functions for sorting complex data structures like lists of tuples or dictionaries.',
            code: `# Sort list of tuples by second element
students = [("Alice", 88), ("Bob", 95), ("Charlie", 82)]
by_grade = sorted(students, key=lambda s: s[1], reverse=True)
print(by_grade)

# Sort a dictionary by values
scores = {"Alice": 92, "Bob": 87, "Charlie": 95}
sorted_scores = sorted(scores.items(), key=lambda x: x[1])
print(sorted_scores)

# Multi-key sort
data = [("A", 2), ("B", 1), ("A", 1)]
print(sorted(data, key=lambda x: (x[0], x[1])))`,
            output: `[('Bob', 95), ('Alice', 88), ('Charlie', 82)]
[('Bob', 87), ('Alice', 92), ('Charlie', 95)]
[('A', 1), ('A', 2), ('B', 1)]`,
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  sum()                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-sum',
        title: 'sum() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'sum(iterable, start=0) sums the items of an iterable from left to right and returns the total. The optional start value is added to the sum (defaults to 0). It does not work with strings -- use str.join() instead.',
            code: `# Signature
sum(iterable, start=0)`,
          },
          {
            heading: 'Examples',
            content:
              'sum() is the standard way to add up numbers in Python. It works with integers, floats, and any objects that support the + operator (except strings).',
            code: `print(sum([1, 2, 3, 4, 5]))
print(sum(range(101)))   # 0 + 1 + ... + 100

# With a start value
print(sum([1, 2, 3], 10))

# Sum of floats
print(sum([0.1, 0.2, 0.3]))

# Sum with generator expression
print(sum(x**2 for x in range(5)))`,
            output: `15
5050
16
0.6000000000000001
30`,
            tip: 'For precise decimal summation, use math.fsum() which tracks partial sums to avoid floating-point errors: math.fsum([0.1, 0.2, 0.3]) returns exactly 0.6.',
          },
          {
            heading: 'Common Patterns',
            content:
              'sum() can flatten lists and compute conditional totals when combined with generator expressions.',
            code: `# Flatten a list of lists
nested = [[1, 2], [3, 4], [5, 6]]
flat = sum(nested, [])
print(flat)

# Count items matching a condition (True == 1)
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_count = sum(1 for n in nums if n % 2 == 0)
print(f"Even numbers: {even_count}")

# Conditional sum
total_evens = sum(n for n in nums if n % 2 == 0)
print(f"Sum of evens: {total_evens}")`,
            output: `[1, 2, 3, 4, 5, 6]
Even numbers: 5
Sum of evens: 30`,
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  tuple()                                                     */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-tuple',
        title: 'tuple() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'tuple() creates an empty tuple. tuple(iterable) creates a tuple from the items of an iterable. Tuples are immutable sequences, meaning their contents cannot be changed after creation.',
            code: `# Signatures
tuple()           # empty tuple ()
tuple(iterable)   # tuple from iterable`,
          },
          {
            heading: 'Examples',
            content:
              'tuple() converts any iterable into a tuple. Tuples are commonly used for fixed collections of items, dictionary keys, and function return values.',
            code: `print(tuple())
print(tuple([1, 2, 3]))
print(tuple("hello"))
print(tuple(range(5)))
print(tuple({3, 1, 2}))

# Tuples from dict
d = {"a": 1, "b": 2}
print(tuple(d))          # keys
print(tuple(d.items()))  # key-value pairs`,
            output: `()
(1, 2, 3)
('h', 'e', 'l', 'l', 'o')
(0, 1, 2, 3, 4)
(1, 2, 3)
('a', 'b')
(('a', 1), ('b', 2))`,
          },
          {
            heading: 'Common Patterns',
            content:
              'Tuples are immutable, hashable (when contents are hashable), and thus can be used as dictionary keys or set elements. They also support packing and unpacking.',
            code: `# Tuples as dict keys (lists cannot be used)
locations = {}
locations[(40.7, -74.0)] = "New York"
locations[(51.5, -0.1)] = "London"
print(locations[(40.7, -74.0)])

# Tuple unpacking
point = (10, 20, 30)
x, y, z = point
print(f"x={x}, y={y}, z={z}")

# Immutability
t = tuple([1, 2, 3])
try:
    t[0] = 99
except TypeError as e:
    print(f"Error: {e}")`,
            output: `New York
x=10, y=20, z=30
Error: 'tuple' object does not support item assignment`,
            tip: 'Use tuples for data that should not change, like coordinates or database records. Use lists when you need to add, remove, or modify elements.',
            analogy: 'Think of it like a sealed envelope -- once you put items inside and seal it, you cannot change the contents. You can only look at what is inside.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  type()                                                      */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-type',
        title: 'type() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'type(object) returns the type of an object. With three arguments, type(name, bases, dict) creates a new type (class) dynamically. The single-argument form is used far more commonly for inspecting types.',
            code: `# Signatures
type(object)              # returns the type
type(name, bases, dict)   # creates a new class`,
          },
          {
            heading: 'Examples',
            content:
              'type() is essential for debugging and introspection. It tells you exactly what kind of object you are working with.',
            code: `print(type(42))
print(type(3.14))
print(type("hello"))
print(type([1, 2]))
print(type({"a": 1}))
print(type(True))
print(type(None))

# type() returns the class itself, which you can compare
print(type(42) == int)
print(type("hi") == str)

# type() vs isinstance()
print(type(True) == int)        # False: bool is not int
print(isinstance(True, int))    # True: bool inherits from int`,
            output: `<class 'int'>
<class 'float'>
<class 'str'>
<class 'list'>
<class 'dict'>
<class 'bool'>
<class 'NoneType'>
True
True
False
True`,
          },
          {
            heading: 'Common Patterns',
            content:
              'For type checking, isinstance() is usually preferred over type() because it supports inheritance. type() is more useful for exact type comparison and dynamic class creation.',
            code: `# isinstance() handles inheritance
class Animal:
    pass

class Dog(Animal):
    pass

d = Dog()
print(f"type(d) == Dog: {type(d) == Dog}")
print(f"type(d) == Animal: {type(d) == Animal}")
print(f"isinstance(d, Animal): {isinstance(d, Animal)}")

# Dynamic class creation with type()
MyClass = type("MyClass", (object,), {"x": 10, "greet": lambda self: "Hi!"})
obj = MyClass()
print(f"obj.x = {obj.x}")
print(f"obj.greet() = {obj.greet()}")
print(type(obj))`,
            output: `type(d) == Dog: True
type(d) == Animal: False
isinstance(d, Animal): True
obj.x = 10
obj.greet() = Hi!
<class '__main__.MyClass'>`,
            tip: 'Use isinstance(obj, SomeClass) for type checks in production code. Use type(obj) when you need the exact type for debugging or metaclass operations.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  zip()                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'fn-zip',
        title: 'zip() Function',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax',
            content:
              'zip(*iterables, strict=False) returns an iterator of tuples, where the i-th tuple contains the i-th element from each of the argument iterables. It stops when the shortest iterable is exhausted. In Python 3.10+, strict=True raises ValueError if iterables have different lengths.',
            code: `# Signature
zip(*iterables, strict=False)  # strict added in 3.10`,
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    A["names: [Alice, Bob, Charlie]"] --> Z["zip()"]
    B["ages: [30, 25, 35]"] --> Z
    Z --> C["(Alice, 30)"]
    Z --> D["(Bob, 25)"]
    Z --> E["(Charlie, 35)"]`,
              caption: 'zip() pairs elements from multiple iterables by position, like a zipper merging two sides',
            },
          },
          {
            heading: 'Examples',
            content:
              'zip() is the standard way to iterate over multiple sequences in parallel. It pairs up elements by position, creating tuples from corresponding elements.',
            code: `names = ["Alice", "Bob", "Charlie"]
ages = [30, 25, 35]
cities = ["NYC", "LA", "Chicago"]

# Zip two lists
for name, age in zip(names, ages):
    print(f"{name} is {age}")

print("---")

# Zip three lists
for name, age, city in zip(names, ages, cities):
    print(f"{name}, {age}, {city}")

# Convert to list of tuples
print(list(zip(names, ages)))`,
            output: `Alice is 30
Bob is 25
Charlie is 35
---
Alice, 30, NYC
Bob, 25, LA
Charlie, 35, Chicago
[('Alice', 30), ('Bob', 25), ('Charlie', 35)]`,
            analogy: 'Think of it like a zipper on a jacket -- it interlocks teeth from two separate sides into matched pairs.',
          },
          {
            heading: 'Common Patterns',
            content:
              'zip() is commonly used for creating dictionaries from key-value pairs, transposing matrices, and "unzipping" data.',
            code: `# Create a dict from two lists
keys = ["name", "age", "role"]
values = ["Alice", 30, "engineer"]
person = dict(zip(keys, values))
print(person)

# Unzip: transpose rows to columns
pairs = [("a", 1), ("b", 2), ("c", 3)]
letters, numbers = zip(*pairs)
print(f"Letters: {letters}")
print(f"Numbers: {numbers}")

# Transpose a matrix
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
transposed = list(zip(*matrix))
for row in transposed:
    print(row)`,
            output: `{'name': 'Alice', 'age': 30, 'role': 'engineer'}
Letters: ('a', 'b', 'c')
Numbers: (1, 2, 3)
(1, 4, 7)
(2, 5, 8)
(3, 6, 9)`,
            tip: 'zip() stops at the shortest iterable. Use itertools.zip_longest() if you need to pad shorter iterables with a fill value instead of truncating.',
            codeHighlightLines: [4, 9, 15],
          },
        ],
      },
    ],
  },
];

import type { DocCategory } from './types';

// Part 6: String Methods
export const PART6_CATEGORIES: DocCategory[] = [
  {
    id: 'string-methods',
    label: 'String Methods',
    icon: 'Code2',
    entries: [
      /* ------------------------------------------------------------ */
      /*  capitalize                                                   */
      /* ------------------------------------------------------------ */
      {
        id: 'str-capitalize',
        title: 'capitalize() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.capitalize() returns a copy of the string with the first character capitalized and the rest lowercased. Takes no parameters.',
            code: `str.capitalize()`,
          },
          {
            heading: 'Examples',
            content: 'Basic usage of capitalize().',
            code: `print("hello world".capitalize())
print("PYTHON".capitalize())
print("123abc".capitalize())`,
            output: `Hello world
Python
123abc`,
            analogy: 'Think of it like a sentence formatter: it gives the first letter a promotion to uppercase and demotes every other letter to lowercase, just like how a sentence starts with one capital letter.',
            codeHighlightLines: [1, 2],
          },
        ],
        quiz: [
          {
            question: 'What does "HELLO WORLD".capitalize() return?',
            options: [
              '"HELLO WORLD"',
              '"Hello world"',
              '"Hello World"',
              '"hello world"',
            ],
            correctIndex: 1,
            explanation:
              'capitalize() uppercases only the first character and lowercases all remaining characters, so "HELLO WORLD" becomes "Hello world".',
          },
          {
            question: 'What does "123abc".capitalize() return?',
            options: ['"123Abc"', '"123abc"', '"123ABC"', 'It raises an error'],
            correctIndex: 1,
            explanation:
              'The first character "1" is not alphabetic so it stays unchanged, and the remaining characters are lowercased. Since "abc" is already lowercase, the result is "123abc".',
          },
          {
            question: 'Does capitalize() modify the original string?',
            options: [
              'Yes, it modifies the string in place',
              'No, it returns a new string',
              'It depends on whether the string is mutable',
              'Only if the string is assigned to a variable',
            ],
            correctIndex: 1,
            explanation:
              'Strings in Python are immutable. capitalize() always returns a new string and leaves the original unchanged.',
          },
        ],
        challenge: {
          prompt:
            'Write a function that takes a sentence and capitalizes it properly: first character uppercase, rest lowercase, but preserves leading whitespace.',
          starterCode: `def smart_capitalize(text):
    # TODO: Handle leading whitespace
    # TODO: Capitalize the non-whitespace portion
    # TODO: Return the combined result
    pass

# Test
print(smart_capitalize("  hello WORLD"))  # "  Hello world"
print(smart_capitalize("PYTHON"))         # "Python"`,
          solutionCode: `def smart_capitalize(text):
    leading_spaces = len(text) - len(text.lstrip())
    stripped = text[leading_spaces:]
    return text[:leading_spaces] + stripped.capitalize()

# Test
print(smart_capitalize("  hello WORLD"))  # "  Hello world"
print(smart_capitalize("PYTHON"))         # "Python"`,
          hints: [
            'Use lstrip() to find where the actual text starts.',
            'Slice the string to separate leading whitespace from the rest.',
            'Apply capitalize() only to the non-whitespace portion, then rejoin.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  casefold                                                     */
      /* ------------------------------------------------------------ */
      {
        id: 'str-casefold',
        title: 'casefold() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.casefold() returns a casefolded copy of the string. Casefolding is similar to lowercasing but more aggressive -- it handles special Unicode characters for caseless matching.',
            code: `str.casefold()`,
            analogy: 'Think of it like a universal translator for letter case: while lower() only handles the common cases, casefold() flattens every possible letter variation across all languages into one comparable form.',
          },
          {
            heading: 'Examples',
            content: 'Casefold is preferred over lower() for case-insensitive comparisons.',
            code: `print("HELLO".casefold())
print("Straße".casefold())
print("HELLO".casefold() == "hello".casefold())`,
            output: `hello
strasse
True`,
            tip: 'Use casefold() instead of lower() when comparing strings from different languages. The German "ß" casefolds to "ss", which lower() does not handle.',
            codeHighlightLines: [2],
          },
        ],
        quiz: [
          {
            question: 'What does "Straße".casefold() return?',
            options: ['"straße"', '"strasse"', '"STRASSE"', '"Strasse"'],
            correctIndex: 1,
            explanation:
              'casefold() is more aggressive than lower(). It converts the German "ß" to "ss", resulting in "strasse".',
          },
          {
            question: 'When should you prefer casefold() over lower()?',
            options: [
              'When you need faster performance',
              'When comparing strings from different languages for equality',
              'When you want to preserve Unicode characters',
              'When the string contains only ASCII characters',
            ],
            correctIndex: 1,
            explanation:
              'casefold() is designed for caseless matching across languages. It handles special Unicode characters like the German eszett that lower() does not convert.',
          },
          {
            question: 'What is the result of "ß".lower() == "ss"?',
            options: ['True', 'False', 'It raises a UnicodeError', 'It depends on the Python version'],
            correctIndex: 1,
            explanation:
              'lower() does not convert "ß" to "ss" -- it leaves it as "ß". Only casefold() performs this more aggressive Unicode normalization, so "ß".lower() == "ss" is False.',
          },
        ],
        challenge: {
          prompt:
            'Write a function that performs a case-insensitive comparison of two strings, correctly handling Unicode characters like the German eszett.',
          starterCode: `def caseless_equal(s1, s2):
    # TODO: Compare strings in a case-insensitive, Unicode-aware way
    pass

# Test
print(caseless_equal("Straße", "STRASSE"))  # True
print(caseless_equal("Hello", "hello"))     # True
print(caseless_equal("abc", "def"))         # False`,
          solutionCode: `def caseless_equal(s1, s2):
    return s1.casefold() == s2.casefold()

# Test
print(caseless_equal("Straße", "STRASSE"))  # True
print(caseless_equal("Hello", "hello"))     # True
print(caseless_equal("abc", "def"))         # False`,
          hints: [
            'Use casefold() instead of lower() for proper Unicode handling.',
            'Apply casefold() to both strings before comparing.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  center                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'str-center',
        title: 'center() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.center(width, fillchar=" ") returns the string centered in a string of given width, padded with the optional fill character (default is a space).',
            code: `str.center(width, fillchar=" ")`,
          },
          {
            heading: 'Examples',
            content: 'Center a string within a given width.',
            code: `print("hi".center(10))
print("hi".center(10, "-"))
print("Python".center(20, "="))`,
            output: `    hi
----hi----
=======Python=======`,
            analogy: 'Think of it like centering a title on a page: equal padding is added on both sides so the text sits right in the middle of the available space.',
          },
        ],
        quiz: [
          {
            question: 'What does "hi".center(10, "-") return?',
            options: ['"----hi----"', '"-----hi---"', '"---hi-----"', '"--hi------"'],
            correctIndex: 0,
            explanation:
              '"hi" is 2 characters. center(10) needs 8 fill characters total. They are split evenly: 4 on the left and 4 on the right, giving "----hi----".',
          },
          {
            question: 'What happens when the width is less than or equal to the string length?',
            options: [
              'An error is raised',
              'The string is truncated',
              'The original string is returned unchanged',
              'The string is padded with one character on each side',
            ],
            correctIndex: 2,
            explanation:
              'When the width is less than or equal to the length of the string, center() returns the original string unchanged -- no truncation occurs.',
          },
          {
            question: 'If the padding cannot be split evenly, where does the extra character go?',
            options: [
              'On the left side',
              'On the right side',
              'It raises an error',
              'The string is not centered',
            ],
            correctIndex: 1,
            explanation:
              'When there is an odd number of fill characters needed, Python places the extra character on the right side.',
          },
        ],
        challenge: {
          prompt:
            'Write a function that creates a centered banner with a border around it.',
          starterCode: `def make_banner(text, width=40, border_char="*"):
    # TODO: Create a top border line
    # TODO: Center the text within the border
    # TODO: Create a bottom border line
    # TODO: Return all lines joined with newline
    pass

# Test
print(make_banner("Hello", 20, "#"))`,
          solutionCode: `def make_banner(text, width=40, border_char="*"):
    top = border_char * width
    middle = border_char + text.center(width - 2) + border_char
    bottom = border_char * width
    return "\\n".join([top, middle, bottom])

# Test
print(make_banner("Hello", 20, "#"))`,
          hints: [
            'The top and bottom borders are just the border_char repeated width times.',
            'The middle line has border_char on each side, so center the text in width - 2.',
            'Use join() with newline to combine all three lines.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  count                                                        */
      /* ------------------------------------------------------------ */
      {
        id: 'str-count',
        title: 'count() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.count(sub, start=0, end=len(str)) returns the number of non-overlapping occurrences of substring sub in the range [start, end).',
            code: `str.count(sub, start, end)`,
          },
          {
            heading: 'Examples',
            content: 'Count occurrences of a substring.',
            code: `print("banana".count("a"))
print("banana".count("an"))
print("hello world".count("o", 0, 5))`,
            output: `3
2
1`,
            codeHighlightLines: [3],
          },
        ],
        quiz: [
          {
            question: 'What does "banana".count("an") return?',
            options: ['1', '2', '3', '0'],
            correctIndex: 1,
            explanation:
              '"an" appears at index 1 ("banana") and index 3 ("banana"). These are non-overlapping, so count returns 2.',
          },
          {
            question: 'What does "aaa".count("aa") return?',
            options: ['0', '1', '2', '3'],
            correctIndex: 1,
            explanation:
              'count() finds non-overlapping occurrences. The first "aa" is found at index 0-1, and then it starts searching at index 2, where there is only one "a" left -- not enough for another match. So the answer is 1.',
          },
          {
            question: 'What does "hello".count("") return?',
            options: ['0', '5', '6', 'It raises a ValueError'],
            correctIndex: 2,
            explanation:
              'Counting the empty string returns len(str) + 1, because the empty string is considered to exist between and around every character. For "hello" (length 5), that is 6.',
          },
        ],
        challenge: {
          prompt:
            'Write a function that counts the number of vowels in a given string (case-insensitive).',
          starterCode: `def count_vowels(text):
    # TODO: Count all vowels (a, e, i, o, u) in the text
    # TODO: Make it case-insensitive
    pass

# Test
print(count_vowels("Hello World"))  # 3
print(count_vowels("AEIOU"))       # 5`,
          solutionCode: `def count_vowels(text):
    lower = text.lower()
    return sum(lower.count(v) for v in "aeiou")

# Test
print(count_vowels("Hello World"))  # 3
print(count_vowels("AEIOU"))       # 5`,
          hints: [
            'Convert the string to lowercase first so you only need to check lowercase vowels.',
            'Use count() for each vowel and sum up the results.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  encode                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'str-encode',
        title: 'encode() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.encode(encoding="utf-8", errors="strict") returns the string encoded as bytes. The errors parameter controls how encoding errors are handled: "strict" raises an error, "ignore" skips bad chars, "replace" uses a replacement marker.',
            code: `str.encode(encoding="utf-8", errors="strict")`,
            analogy: 'Think of it like packing a suitcase for travel: your human-readable text (string) gets converted into a compact binary format (bytes) suitable for transmission over a network or storage on disk.',
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart LR
    A["str (Unicode text)"] -->|".encode(encoding)"| B["bytes (raw binary)"]
    B -->|".decode(encoding)"| A
    style A fill:#e0f2fe,stroke:#0284c7
    style B fill:#fef3c7,stroke:#d97706`,
              caption: 'Encoding converts Unicode strings to bytes; decoding reverses the process.',
            },
          },
          {
            heading: 'Examples',
            content: 'Encode strings to bytes.',
            code: `print("hello".encode())
print("café".encode("utf-8"))
print("café".encode("ascii", errors="ignore"))`,
            output: `b'hello'
b'caf\\xc3\\xa9'
b'caf'`,
            tip: 'When writing to files or sending data over the network, you almost always need bytes. encode() with utf-8 is the safest default.',
            codeHighlightLines: [3],
          },
        ],
        quiz: [
          {
            question: 'What does "hello".encode() return?',
            options: ['"hello"', "b'hello'", '["h","e","l","l","o"]', 'A list of integers'],
            correctIndex: 1,
            explanation:
              'encode() with default utf-8 encoding converts the string to a bytes object. For ASCII-compatible characters, the bytes literal looks like b\'hello\'.',
          },
          {
            question: 'What happens when you try to encode "cafe\\u0301" with ASCII and errors="strict"?',
            options: [
              'It returns b\'cafe\'',
              'It silently skips the accent',
              'It raises a UnicodeEncodeError',
              'It replaces the accent with "?"',
            ],
            correctIndex: 2,
            explanation:
              'With errors="strict" (the default), encoding a non-ASCII character using the ASCII codec raises a UnicodeEncodeError.',
          },
          {
            question: 'What is the default encoding used by encode()?',
            options: ['ascii', 'utf-8', 'latin-1', 'utf-16'],
            correctIndex: 1,
            explanation:
              'The default encoding for str.encode() is "utf-8", which can represent every Unicode character.',
          },
        ],
        challenge: {
          prompt:
            'Write a function that safely encodes a string to bytes, replacing any unencodable characters with a placeholder.',
          starterCode: `def safe_encode(text, encoding="ascii"):
    # TODO: Encode text using the given encoding
    # TODO: Replace characters that cannot be encoded with "?"
    pass

# Test
print(safe_encode("cafe\\u0301"))    # b'cafe?'
print(safe_encode("hello"))         # b'hello'`,
          solutionCode: `def safe_encode(text, encoding="ascii"):
    return text.encode(encoding, errors="replace")

# Test
print(safe_encode("cafe\\u0301"))    # b'cafe?'
print(safe_encode("hello"))         # b'hello'`,
          hints: [
            'The encode() method has an errors parameter that controls error handling.',
            'Use errors="replace" to substitute unencodable characters with a replacement marker.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  endswith                                                     */
      /* ------------------------------------------------------------ */
      {
        id: 'str-endswith',
        title: 'endswith() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.endswith(suffix, start, end) returns True if the string ends with the specified suffix. The suffix can also be a tuple of strings to check.',
            code: `str.endswith(suffix, start, end)`,
          },
          {
            heading: 'Examples',
            content: 'Check string endings.',
            code: `print("hello.py".endswith(".py"))
print("data.csv".endswith((".csv", ".tsv")))
print("report.pdf".endswith(".doc"))`,
            output: `True
True
False`,
            codeHighlightLines: [2],
          },
        ],
        quiz: [
          {
            question: 'What does "data.csv".endswith((".csv", ".tsv")) return?',
            options: ['True', 'False', 'It raises a TypeError', '(".csv", ".tsv")'],
            correctIndex: 0,
            explanation:
              'endswith() accepts a tuple of suffixes and returns True if the string ends with any one of them. "data.csv" ends with ".csv", so it returns True.',
          },
          {
            question: 'Can you pass a list instead of a tuple to endswith()?',
            options: [
              'Yes, it works the same way',
              'No, it raises a TypeError',
              'Yes, but only in Python 3.10+',
              'It depends on the string content',
            ],
            correctIndex: 1,
            explanation:
              'endswith() only accepts a string or a tuple of strings. Passing a list raises a TypeError.',
          },
          {
            question: 'What does "hello".endswith("") return?',
            options: ['True', 'False', 'It raises a ValueError', 'None'],
            correctIndex: 0,
            explanation:
              'Every string ends with the empty string, so endswith("") always returns True.',
          },
        ],
        challenge: {
          prompt:
            'Write a function that filters a list of filenames to only include files with specific extensions.',
          starterCode: `def filter_files(filenames, extensions):
    # TODO: Return only filenames that end with one of the given extensions
    # extensions is a list like [".py", ".js", ".ts"]
    pass

# Test
files = ["app.py", "style.css", "main.js", "data.txt", "test.py"]
print(filter_files(files, [".py", ".js"]))  # ["app.py", "main.js", "test.py"]`,
          solutionCode: `def filter_files(filenames, extensions):
    ext_tuple = tuple(extensions)
    return [f for f in filenames if f.endswith(ext_tuple)]

# Test
files = ["app.py", "style.css", "main.js", "data.txt", "test.py"]
print(filter_files(files, [".py", ".js"]))  # ["app.py", "main.js", "test.py"]`,
          hints: [
            'endswith() accepts a tuple (not a list), so convert extensions to a tuple first.',
            'Use a list comprehension to filter the filenames.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  expandtabs                                                   */
      /* ------------------------------------------------------------ */
      {
        id: 'str-expandtabs',
        title: 'expandtabs() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.expandtabs(tabsize=8) returns a copy of the string where all tab characters are expanded to spaces. The default tab size is 8 characters.',
            code: `str.expandtabs(tabsize=8)`,
          },
          {
            heading: 'Examples',
            content: 'Expand tabs to spaces.',
            code: `print("a\\tb\\tc".expandtabs())
print("a\\tb\\tc".expandtabs(4))
print("name\\tage".expandtabs(10))`,
            output: `a       b       c
a   b   c
name      age`,
          },
        ],
        quiz: [
          {
            question: 'What is the default tab size for expandtabs()?',
            options: ['2', '4', '8', '16'],
            correctIndex: 2,
            explanation:
              'The default tab size for expandtabs() is 8 characters, matching the traditional terminal tab stop width.',
          },
          {
            question: 'Does expandtabs() insert a fixed number of spaces for each tab?',
            options: [
              'Yes, always exactly tabsize spaces',
              'No, it pads to the next tab stop position',
              'Yes, but only for the first tab',
              'It depends on the Python version',
            ],
            correctIndex: 1,
            explanation:
              'expandtabs() aligns to tab stop positions (multiples of tabsize). The number of spaces inserted depends on the current column position, not a fixed count.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  find                                                         */
      /* ------------------------------------------------------------ */
      {
        id: 'str-find',
        title: 'find() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.find(sub, start, end) returns the lowest index where substring sub is found within the slice [start:end]. Returns -1 if the substring is not found.',
            code: `str.find(sub, start, end)`,
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart TD
    A["Call str.find(sub)"] --> B{"Is sub in str?"}
    B -->|Yes| C["Return lowest index"]
    B -->|No| D["Return -1"]
    style A fill:#e0f2fe,stroke:#0284c7
    style C fill:#dcfce7,stroke:#16a34a
    style D fill:#fee2e2,stroke:#dc2626`,
              caption: 'find() returns the index of the first match, or -1 if not found.',
            },
          },
          {
            heading: 'Examples',
            content: 'Find substring positions.',
            code: `print("hello world".find("world"))
print("hello world".find("xyz"))
print("banana".find("a", 2))`,
            output: `6
-1
3`,
            tip: 'Prefer find() over index() when you are not sure the substring exists. find() returns -1 instead of raising a ValueError.',
          },
        ],
        quiz: [
          {
            question: 'What does "hello world".find("xyz") return?',
            options: ['0', 'None', '-1', 'It raises a ValueError'],
            correctIndex: 2,
            explanation:
              'find() returns -1 when the substring is not found, unlike index() which raises a ValueError.',
          },
          {
            question: 'What does "banana".find("a", 2) return?',
            options: ['1', '2', '3', '-1'],
            correctIndex: 2,
            explanation:
              'Starting the search at index 2, the first "a" found is at index 3 (the second "a" in "banana").',
          },
          {
            question: 'What is the key difference between find() and index()?',
            options: [
              'find() is faster than index()',
              'find() returns -1 when not found, index() raises ValueError',
              'find() only works with single characters',
              'index() searches from the right',
            ],
            correctIndex: 1,
            explanation:
              'The only difference is the behavior when the substring is not found: find() returns -1, while index() raises a ValueError.',
          },
        ],
        challenge: {
          prompt:
            'Write a function that finds all positions of a substring within a string (non-overlapping).',
          starterCode: `def find_all(text, sub):
    # TODO: Find all non-overlapping positions of sub in text
    # TODO: Return a list of indices
    pass

# Test
print(find_all("banana", "a"))    # [1, 3, 5]
print(find_all("aabaa", "aa"))    # [0, 3]`,
          solutionCode: `def find_all(text, sub):
    positions = []
    start = 0
    while True:
        idx = text.find(sub, start)
        if idx == -1:
            break
        positions.append(idx)
        start = idx + len(sub)
    return positions

# Test
print(find_all("banana", "a"))    # [1, 3, 5]
print(find_all("aabaa", "aa"))    # [0, 3]`,
          hints: [
            'Use a while loop with find() and a start position that advances.',
            'When find() returns -1, break out of the loop.',
            'Move the start position forward by the length of the substring after each find.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  format                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'str-format',
        title: 'format() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.format(*args, **kwargs) performs string formatting. Replacement fields are delimited by curly braces {}. You can reference arguments by position or name.',
            code: `str.format(*args, **kwargs)`,
          },
          {
            heading: 'Examples',
            content: 'Format strings with placeholders.',
            code: `print("Hello, {}!".format("Alice"))
print("{0} + {1} = {2}".format(2, 3, 5))
print("{name} is {age}".format(name="Bob", age=30))`,
            output: `Hello, Alice!
2 + 3 = 5
Bob is 30`,
            tip: 'In modern Python (3.6+), f-strings are usually preferred over .format() for readability: f"Hello, {name}!" instead of "Hello, {}!".format(name).',
            analogy: 'Think of it like a fill-in-the-blank form: the curly braces {} are empty blanks, and .format() fills them in with the values you provide, in order or by name.',
            codeHighlightLines: [2, 3],
          },
        ],
        quiz: [
          {
            question: 'What does "{0} and {0}".format("echo") return?',
            options: [
              '"echo and echo"',
              '"echo and {0}"',
              'It raises an IndexError',
              '"{0} and {0}"',
            ],
            correctIndex: 0,
            explanation:
              'Positional arguments can be referenced multiple times. {0} refers to the first argument each time, so both placeholders are replaced with "echo".',
          },
          {
            question: 'What happens if you mix positional and automatic numbering like "{0} and {}"?',
            options: [
              'It works fine',
              'It raises a ValueError',
              'The second placeholder gets index 1',
              'Both get the same argument',
            ],
            correctIndex: 1,
            explanation:
              'Python does not allow mixing explicit positional indices ({0}) with automatic numbering ({}) in the same format string. It raises a ValueError.',
          },
          {
            question: 'How do you include a literal curly brace in a format string?',
            options: [
              'Use \\{ and \\}',
              'Use {{ and }}',
              'Use [{ and }]',
              'It is not possible',
            ],
            correctIndex: 1,
            explanation:
              'To include literal curly braces in a format string, double them: {{ produces { and }} produces }.',
          },
        ],
        challenge: {
          prompt:
            'Write a function that formats a table row with fixed-width columns using the format() method.',
          starterCode: `def format_row(columns, widths):
    # TODO: Format each column to the given width
    # TODO: Join them with " | " separator
    # columns: list of strings, widths: list of ints
    pass

# Test
print(format_row(["Name", "Age", "City"], [15, 5, 10]))
# "Name            | Age   | City      "`,
          solutionCode: `def format_row(columns, widths):
    parts = ["{:<{}}".format(col, w) for col, w in zip(columns, widths)]
    return " | ".join(parts)

# Test
print(format_row(["Name", "Age", "City"], [15, 5, 10]))
# "Name            | Age   | City      "`,
          hints: [
            'Use format specification like {:<10} for left-aligned, 10-char width.',
            'You can pass the width dynamically: "{:<{}}".format(value, width).',
            'Use zip() to pair each column with its width.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  index                                                        */
      /* ------------------------------------------------------------ */
      {
        id: 'str-index',
        title: 'index() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.index(sub, start, end) is like find(), but raises a ValueError when the substring is not found instead of returning -1.',
            code: `str.index(sub, start, end)`,
          },
          {
            heading: 'Examples',
            content: 'Find substring index or raise an error.',
            code: `print("hello".index("ell"))
print("banana".index("a", 2))
# "hello".index("xyz")  # ValueError: substring not found`,
            output: `1
3`,
          },
        ],
        quiz: [
          {
            question: 'What does "hello".index("xyz") do?',
            options: [
              'Returns -1',
              'Returns None',
              'Raises a ValueError',
              'Raises an IndexError',
            ],
            correctIndex: 2,
            explanation:
              'Unlike find(), index() raises a ValueError when the substring is not found.',
          },
          {
            question: 'When should you use index() over find()?',
            options: [
              'When you want faster performance',
              'When you are certain the substring exists and want an error otherwise',
              'When searching from the right',
              'When the substring is a single character',
            ],
            correctIndex: 1,
            explanation:
              'Use index() when the substring should always be present -- a missing substring indicates a bug in your logic, and the ValueError helps you catch it early.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  isalnum                                                      */
      /* ------------------------------------------------------------ */
      {
        id: 'str-isalnum',
        title: 'isalnum() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.isalnum() returns True if all characters in the string are alphanumeric (letters or digits) and the string is not empty. Returns False otherwise.',
            code: `str.isalnum()`,
          },
          {
            heading: 'Examples',
            content: 'Check for alphanumeric strings.',
            code: `print("hello123".isalnum())
print("hello 123".isalnum())
print("".isalnum())`,
            output: `True
False
False`,
          },
        ],
        quiz: [
          {
            question: 'What does "hello 123".isalnum() return?',
            options: ['True', 'False', 'None', 'It raises a TypeError'],
            correctIndex: 1,
            explanation:
              'Spaces are not alphanumeric characters. Since "hello 123" contains a space, isalnum() returns False.',
          },
          {
            question: 'What does "".isalnum() return?',
            options: ['True', 'False', 'None', 'It raises a ValueError'],
            correctIndex: 1,
            explanation:
              'An empty string returns False because isalnum() requires at least one character and all characters must be alphanumeric.',
          },
          {
            question: 'Does "cafe\\u0301" (with a combining accent) return True for isalnum()?',
            options: [
              'True -- combining marks are considered alphanumeric',
              'False -- combining marks are not alphanumeric',
              'It depends on the Python version',
              'It raises a UnicodeError',
            ],
            correctIndex: 0,
            explanation:
              'Unicode combining characters (like the combining acute accent) are classified as alphabetic in Python, so isalnum() returns True.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  isalpha                                                      */
      /* ------------------------------------------------------------ */
      {
        id: 'str-isalpha',
        title: 'isalpha() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.isalpha() returns True if all characters in the string are alphabetic and the string is not empty. Unicode letters (accented characters, etc.) count as alphabetic.',
            code: `str.isalpha()`,
          },
          {
            heading: 'Examples',
            content: 'Check for alphabetic strings.',
            code: `print("hello".isalpha())
print("hello3".isalpha())
print("café".isalpha())`,
            output: `True
False
True`,
          },
        ],
        quiz: [
          {
            question: 'What does "cafe\\u0301".isalpha() return?',
            options: ['True', 'False', 'It raises a UnicodeError', 'None'],
            correctIndex: 0,
            explanation:
              'Unicode letters, including accented characters and combining marks, are considered alphabetic. "cafe\\u0301" contains only alphabetic characters.',
          },
          {
            question: 'What does "hello3".isalpha() return?',
            options: ['True', 'False', 'None', 'It raises a TypeError'],
            correctIndex: 1,
            explanation:
              'The digit "3" is not an alphabetic character, so isalpha() returns False even though the rest of the string is alphabetic.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  isdecimal                                                    */
      /* ------------------------------------------------------------ */
      {
        id: 'str-isdecimal',
        title: 'isdecimal() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.isdecimal() returns True if all characters in the string are decimal characters (0-9) and the string is not empty. This is stricter than isdigit() -- it excludes superscripts and fractions.',
            code: `str.isdecimal()`,
          },
          {
            heading: 'Examples',
            content: 'Check for decimal digit strings.',
            code: `print("12345".isdecimal())
print("12.5".isdecimal())
print("\\u00B2".isdecimal())  # superscript 2`,
            output: `True
False
False`,
          },
        ],
        quiz: [
          {
            question: 'What does "\\u00B2".isdecimal() return (superscript 2)?',
            options: ['True', 'False', 'It raises a ValueError', 'None'],
            correctIndex: 1,
            explanation:
              'isdecimal() is strict and only accepts Unicode decimal characters (0-9 and their equivalents in other scripts). Superscript digits are not decimal characters.',
          },
          {
            question: 'What is the relationship between isdecimal(), isdigit(), and isnumeric()?',
            options: [
              'They all do the same thing',
              'isdecimal() is the strictest, isnumeric() is the broadest',
              'isnumeric() is the strictest, isdecimal() is the broadest',
              'isdigit() is both the strictest and the broadest',
            ],
            correctIndex: 1,
            explanation:
              'isdecimal() only accepts 0-9 style characters. isdigit() also accepts superscripts. isnumeric() is the broadest, also accepting fractions and Roman numerals.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  isdigit                                                      */
      /* ------------------------------------------------------------ */
      {
        id: 'str-isdigit',
        title: 'isdigit() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.isdigit() returns True if all characters are digits. This includes decimal characters and digits that need special handling, such as superscript digits. It is broader than isdecimal() but narrower than isnumeric().',
            code: `str.isdigit()`,
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart LR
    subgraph isnumeric["isnumeric()"]
        direction LR
        subgraph isdigit["isdigit()"]
            direction LR
            subgraph isdecimal["isdecimal()"]
                D["0-9"]
            end
            E["Superscripts"]
        end
        F["Fractions, Roman numerals"]
    end
    style isdecimal fill:#dcfce7,stroke:#16a34a
    style isdigit fill:#e0f2fe,stroke:#0284c7
    style isnumeric fill:#fef3c7,stroke:#d97706`,
              caption: 'The three numeric-check methods form nested sets: isdecimal is the strictest, isnumeric is the broadest.',
            },
          },
          {
            heading: 'Examples',
            content: 'Check for digit strings.',
            code: `print("123".isdigit())
print("\\u00B2".isdigit())  # superscript 2
print("12.3".isdigit())`,
            output: `True
True
False`,
            tip: 'For validating user input of plain integers, isdecimal() is usually more appropriate than isdigit(), since you rarely want to accept superscript characters.',
            codeHighlightLines: [2],
          },
        ],
        quiz: [
          {
            question: 'What does "\\u00B2".isdigit() return (superscript 2)?',
            options: ['True', 'False', 'It raises a ValueError', 'None'],
            correctIndex: 0,
            explanation:
              'isdigit() accepts superscript digits like the Unicode superscript 2, unlike the stricter isdecimal().',
          },
          {
            question: 'Why is isdecimal() often better than isdigit() for validating user input?',
            options: [
              'isdecimal() is faster',
              'isdecimal() only accepts 0-9, avoiding unexpected superscript digits',
              'isdigit() does not work with strings',
              'isdecimal() also validates negative numbers',
            ],
            correctIndex: 1,
            explanation:
              'When validating user input like "42", you typically want only standard decimal digits. isdigit() would also accept superscript characters, which is usually not desired.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  isidentifier                                                 */
      /* ------------------------------------------------------------ */
      {
        id: 'str-isidentifier',
        title: 'isidentifier() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.isidentifier() returns True if the string is a valid Python identifier (variable name). Does not check if the string is a reserved keyword.',
            code: `str.isidentifier()`,
          },
          {
            heading: 'Examples',
            content: 'Check if a string is a valid identifier.',
            code: `print("my_var".isidentifier())
print("2fast".isidentifier())
print("class".isidentifier())  # keyword but still valid identifier`,
            output: `True
False
True`,
            tip: 'To also check that a string is not a reserved keyword, combine with keyword.iskeyword(): import keyword; keyword.iskeyword("class") returns True.',
          },
        ],
        quiz: [
          {
            question: 'What does "class".isidentifier() return?',
            options: ['True', 'False', 'It raises a SyntaxError', 'None'],
            correctIndex: 0,
            explanation:
              'isidentifier() only checks if the string follows identifier naming rules (starts with letter/underscore, contains only letters/digits/underscores). It does NOT check if the string is a reserved keyword, so "class" returns True.',
          },
          {
            question: 'What does "2fast".isidentifier() return?',
            options: ['True', 'False', 'It raises a ValueError', 'None'],
            correctIndex: 1,
            explanation:
              'Python identifiers cannot start with a digit. "2fast" starts with "2", so isidentifier() returns False.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  islower                                                      */
      /* ------------------------------------------------------------ */
      {
        id: 'str-islower',
        title: 'islower() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.islower() returns True if all cased characters in the string are lowercase and there is at least one cased character. Non-cased characters (digits, punctuation) are ignored.',
            code: `str.islower()`,
          },
          {
            heading: 'Examples',
            content: 'Check for lowercase strings.',
            code: `print("hello".islower())
print("hello123".islower())
print("Hello".islower())`,
            output: `True
True
False`,
          },
        ],
        quiz: [
          {
            question: 'What does "hello123".islower() return?',
            options: ['True', 'False', 'None', 'It raises a TypeError'],
            correctIndex: 0,
            explanation:
              'Digits are non-cased characters and are ignored by islower(). All cased characters ("hello") are lowercase, so it returns True.',
          },
          {
            question: 'What does "123".islower() return?',
            options: ['True', 'False', 'None', 'It raises a ValueError'],
            correctIndex: 1,
            explanation:
              'islower() requires at least one cased character. "123" has no cased characters, so it returns False.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  isnumeric                                                    */
      /* ------------------------------------------------------------ */
      {
        id: 'str-isnumeric',
        title: 'isnumeric() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.isnumeric() returns True if all characters are numeric. This is the broadest check -- it includes digits, superscripts, fractions, and Roman numerals from Unicode.',
            code: `str.isnumeric()`,
          },
          {
            heading: 'Examples',
            content: 'Check for numeric strings.',
            code: `print("123".isnumeric())
print("\\u00BD".isnumeric())  # fraction 1/2
print("12.3".isnumeric())`,
            output: `True
True
False`,
          },
        ],
        quiz: [
          {
            question: 'What does "\\u00BD".isnumeric() return (Unicode fraction 1/2)?',
            options: ['True', 'False', 'It raises a ValueError', 'None'],
            correctIndex: 0,
            explanation:
              'isnumeric() is the broadest numeric check. It accepts Unicode fractions like 1/2, Roman numerals, and other numeric characters.',
          },
          {
            question: 'Why does "12.3".isnumeric() return False?',
            options: [
              'Because it has more than 3 characters',
              'Because the decimal point "." is not a numeric character',
              'Because isnumeric() only works with integers',
              'Because it contains a mix of digits and punctuation',
            ],
            correctIndex: 1,
            explanation:
              'The decimal point "." is a punctuation character, not a numeric character. isnumeric() requires ALL characters to be numeric.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  isprintable                                                  */
      /* ------------------------------------------------------------ */
      {
        id: 'str-isprintable',
        title: 'isprintable() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.isprintable() returns True if all characters in the string are printable or the string is empty. Non-printable characters include control characters like newline and tab.',
            code: `str.isprintable()`,
          },
          {
            heading: 'Examples',
            content: 'Check for printable strings.',
            code: `print("Hello!".isprintable())
print("Hello\\n".isprintable())
print("".isprintable())`,
            output: `True
False
True`,
          },
        ],
        quiz: [
          {
            question: 'What does "".isprintable() return?',
            options: ['True', 'False', 'None', 'It raises a ValueError'],
            correctIndex: 0,
            explanation:
              'Unlike other is*() methods, isprintable() returns True for an empty string. An empty string has no non-printable characters, so it is considered printable.',
          },
          {
            question: 'Is a space character considered printable?',
            options: [
              'Yes, spaces are printable',
              'No, spaces are whitespace and not printable',
              'Only in Python 3.10+',
              'It depends on the locale',
            ],
            correctIndex: 0,
            explanation:
              'The space character (0x20) is considered printable. However, other whitespace like \\n, \\t, and \\r are not printable.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  isspace                                                      */
      /* ------------------------------------------------------------ */
      {
        id: 'str-isspace',
        title: 'isspace() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.isspace() returns True if all characters in the string are whitespace characters (spaces, tabs, newlines, etc.) and the string is not empty.',
            code: `str.isspace()`,
          },
          {
            heading: 'Examples',
            content: 'Check for whitespace-only strings.',
            code: `print("   ".isspace())
print("\\t\\n".isspace())
print("".isspace())`,
            output: `True
True
False`,
          },
        ],
        quiz: [
          {
            question: 'What does "".isspace() return?',
            options: ['True', 'False', 'None', 'It raises a ValueError'],
            correctIndex: 1,
            explanation:
              'An empty string returns False because isspace() requires at least one character, and that character must be whitespace.',
          },
          {
            question: 'What does "\\t\\n".isspace() return?',
            options: ['True', 'False', 'None', 'It depends on the platform'],
            correctIndex: 0,
            explanation:
              'Tab (\\t) and newline (\\n) are both whitespace characters. Since all characters are whitespace and the string is not empty, isspace() returns True.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  istitle                                                      */
      /* ------------------------------------------------------------ */
      {
        id: 'str-istitle',
        title: 'istitle() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.istitle() returns True if the string is titlecased -- each word starts with an uppercase letter followed by lowercase letters.',
            code: `str.istitle()`,
          },
          {
            heading: 'Examples',
            content: 'Check for title case.',
            code: `print("Hello World".istitle())
print("Hello world".istitle())
print("HELLO".istitle())`,
            output: `True
False
False`,
          },
        ],
        quiz: [
          {
            question: 'What does "Hello world".istitle() return?',
            options: ['True', 'False', 'None', 'It raises a TypeError'],
            correctIndex: 1,
            explanation:
              'In a title-cased string, every word must start with uppercase. "world" starts with lowercase "w", so istitle() returns False.',
          },
          {
            question: 'What does "HELLO".istitle() return?',
            options: ['True', 'False', 'None', 'It depends on the platform'],
            correctIndex: 1,
            explanation:
              'istitle() requires that characters after the first in each word are lowercase. "HELLO" has uppercase characters after the first, so it returns False.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  isupper                                                      */
      /* ------------------------------------------------------------ */
      {
        id: 'str-isupper',
        title: 'isupper() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.isupper() returns True if all cased characters in the string are uppercase and there is at least one cased character.',
            code: `str.isupper()`,
          },
          {
            heading: 'Examples',
            content: 'Check for uppercase strings.',
            code: `print("HELLO".isupper())
print("HELLO123".isupper())
print("Hello".isupper())`,
            output: `True
True
False`,
          },
        ],
        quiz: [
          {
            question: 'What does "HELLO123".isupper() return?',
            options: ['True', 'False', 'None', 'It raises a TypeError'],
            correctIndex: 0,
            explanation:
              'Digits are non-cased characters and are ignored by isupper(). All cased characters ("HELLO") are uppercase, so it returns True.',
          },
          {
            question: 'What does "123!@#".isupper() return?',
            options: ['True', 'False', 'None', 'It raises a ValueError'],
            correctIndex: 1,
            explanation:
              'isupper() requires at least one cased character. "123!@#" has no cased characters at all, so it returns False.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  join                                                         */
      /* ------------------------------------------------------------ */
      {
        id: 'str-join',
        title: 'join() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.join(iterable) concatenates the elements of an iterable (e.g., list, tuple) into a single string, using the calling string as a separator between each element.',
            code: `str.join(iterable)`,
            analogy: 'Think of it like stringing beads on a necklace: each bead is a string from the iterable, and the separator is the thread that appears between every pair of beads.',
          },
          {
            heading: 'Examples',
            content: 'Join iterable elements with a separator.',
            code: `print(", ".join(["apple", "banana", "cherry"]))
print("-".join("hello"))
print(" | ".join(("a", "b", "c")))`,
            output: `apple, banana, cherry
h-e-l-l-o
a | b | c`,
            tip: 'join() is much faster than concatenating strings with + in a loop. Always prefer "sep".join(list) for building strings from sequences.',
            codeHighlightLines: [1, 2],
          },
        ],
        quiz: [
          {
            question: 'What does "-".join("hello") return?',
            options: ['"hello"', '"h-e-l-l-o"', '"-hello-"', 'It raises a TypeError'],
            correctIndex: 1,
            explanation:
              'A string is iterable -- each character becomes a separate element. join() places "-" between each character, resulting in "h-e-l-l-o".',
          },
          {
            question: 'What happens if the iterable contains non-string elements?',
            options: [
              'They are automatically converted to strings',
              'It raises a TypeError',
              'Non-string elements are skipped',
              'They are replaced with empty strings',
            ],
            correctIndex: 1,
            explanation:
              'join() requires all elements to be strings. If the iterable contains non-string elements (like integers), it raises a TypeError. Use a generator expression to convert: ", ".join(str(x) for x in [1, 2, 3]).',
          },
          {
            question: 'What does "".join(["a", "b", "c"]) return?',
            options: ['"abc"', '"a b c"', '"a, b, c"', '""'],
            correctIndex: 0,
            explanation:
              'Using an empty string as the separator concatenates all elements with nothing between them, resulting in "abc".',
          },
        ],
        challenge: {
          prompt:
            'Write a function that joins a list of words into a sentence, converting all elements to strings first and filtering out empty strings.',
          starterCode: `def smart_join(items, sep=" "):
    # TODO: Convert all items to strings
    # TODO: Filter out empty strings
    # TODO: Join with the given separator
    pass

# Test
print(smart_join(["hello", "", "world", 42]))  # "hello world 42"
print(smart_join([1, 2, 3], "-"))               # "1-2-3"`,
          solutionCode: `def smart_join(items, sep=" "):
    str_items = [str(item) for item in items]
    filtered = [s for s in str_items if s]
    return sep.join(filtered)

# Test
print(smart_join(["hello", "", "world", 42]))  # "hello world 42"
print(smart_join([1, 2, 3], "-"))               # "1-2-3"`,
          hints: [
            'Use str() to convert each item in the list to a string.',
            'Use a list comprehension with a condition to filter out empty strings.',
            'Finally, use sep.join() on the filtered list.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  ljust                                                        */
      /* ------------------------------------------------------------ */
      {
        id: 'str-ljust',
        title: 'ljust() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.ljust(width, fillchar=" ") returns the string left-justified in a string of the given width, padded on the right with the fill character (default space).',
            code: `str.ljust(width, fillchar=" ")`,
          },
          {
            heading: 'Examples',
            content: 'Left-justify strings within a width.',
            code: `print("hi".ljust(10) + "|")
print("hi".ljust(10, ".") + "|")
print("Name".ljust(15, "-"))`,
            output: `hi        |
hi........|
Name-----------`,
          },
        ],
        quiz: [
          {
            question: 'What does "hi".ljust(10, ".") return?',
            options: ['"..........hi"', '"hi........"', '"....hi...."', '"hi"'],
            correctIndex: 1,
            explanation:
              'ljust() left-justifies the string and pads the RIGHT side with the fill character. "hi" has 2 chars, so 8 dots are added to the right: "hi........".',
          },
          {
            question: 'What does "hello".ljust(3) return?',
            options: ['"hel"', '"hello"', '"   hello"', '"hello   "'],
            correctIndex: 1,
            explanation:
              'When the width is less than the string length, ljust() returns the original string unchanged -- no truncation occurs.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  lower                                                        */
      /* ------------------------------------------------------------ */
      {
        id: 'str-lower',
        title: 'lower() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.lower() returns a copy of the string with all cased characters converted to lowercase.',
            code: `str.lower()`,
          },
          {
            heading: 'Examples',
            content: 'Convert strings to lowercase.',
            code: `print("HELLO".lower())
print("Python 3.12".lower())
print("already lower".lower())`,
            output: `hello
python 3.12
already lower`,
          },
        ],
        quiz: [
          {
            question: 'What does "Python 3.12".lower() return?',
            options: ['"python 3.12"', '"python 312"', '"PYTHON 3.12"', '"python3.12"'],
            correctIndex: 0,
            explanation:
              'lower() converts all cased characters to lowercase. Non-cased characters like digits, dots, and spaces remain unchanged.',
          },
          {
            question: 'Does lower() handle the German "ß" character?',
            options: [
              'Yes, it converts it to "ss"',
              'No, it leaves "ß" unchanged',
              'It raises a UnicodeError',
              'It converts "ß" to "s"',
            ],
            correctIndex: 1,
            explanation:
              'lower() only performs simple case mapping. It leaves "ß" as is. Use casefold() for aggressive Unicode case folding that converts "ß" to "ss".',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  lstrip                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'str-lstrip',
        title: 'lstrip() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.lstrip(chars=None) returns a copy of the string with leading characters removed. The chars argument is a set of characters to remove (not a prefix). If omitted, whitespace is removed.',
            code: `str.lstrip(chars)`,
          },
          {
            heading: 'Examples',
            content: 'Strip leading characters.',
            code: `print("   hello   ".lstrip())
print("xxxhello".lstrip("x"))
print("www.example.com".lstrip("wcom."))`,
            output: `hello
hello
example.com`,
            tip: 'The chars argument is treated as a set of characters, not as a prefix string. Use removeprefix() (Python 3.9+) if you want to remove an exact prefix.',
          },
        ],
        quiz: [
          {
            question: 'What does "www.example.com".lstrip("wcom.") return?',
            options: ['"example.com"', '"www.example.com"', '".example.com"', '"xample.com"'],
            correctIndex: 0,
            explanation:
              'lstrip() treats its argument as a SET of characters, not a prefix. It removes any leading character that is in the set {w, c, o, m, .}. The letters "www.e" are removed until "x" is encountered, which is not in the set, leaving "example.com". Note: "e" is also removed.',
          },
          {
            question: 'What is the difference between lstrip("ab") and removeprefix("ab")?',
            options: [
              'They do the same thing',
              'lstrip removes any leading a or b characters; removeprefix removes the exact prefix "ab"',
              'removeprefix is faster',
              'lstrip only removes one character',
            ],
            correctIndex: 1,
            explanation:
              'lstrip("ab") removes any combination of "a" and "b" from the left (like "abba" or "baab"). removeprefix("ab") only removes the exact substring "ab" from the start if present.',
          },
        ],
        challenge: {
          prompt:
            'Write a function that removes a specific prefix from a string, simulating removeprefix() for Python versions before 3.9.',
          starterCode: `def remove_prefix(text, prefix):
    # TODO: Check if text starts with prefix
    # TODO: If so, return text without the prefix
    # TODO: Otherwise return text unchanged
    pass

# Test
print(remove_prefix("hello_world", "hello_"))  # "world"
print(remove_prefix("hello_world", "xyz"))      # "hello_world"`,
          solutionCode: `def remove_prefix(text, prefix):
    if text.startswith(prefix):
        return text[len(prefix):]
    return text

# Test
print(remove_prefix("hello_world", "hello_"))  # "world"
print(remove_prefix("hello_world", "xyz"))      # "hello_world"`,
          hints: [
            'Use startswith() to check if the prefix is present.',
            'Slice the string starting from len(prefix) to remove the prefix.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  partition                                                    */
      /* ------------------------------------------------------------ */
      {
        id: 'str-partition',
        title: 'partition() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.partition(sep) splits the string at the first occurrence of sep and returns a 3-tuple: (before, sep, after). If sep is not found, returns (str, "", "").',
            code: `str.partition(sep)`,
            analogy: 'Think of it like cutting a rope at a specific knot: you get the piece before the knot, the knot itself, and the piece after -- always exactly three parts.',
          },
          {
            heading: 'Examples',
            content: 'Split at the first occurrence of a separator.',
            code: `print("hello=world".partition("="))
print("key:val:extra".partition(":"))
print("no sep here".partition("="))`,
            output: `('hello', '=', 'world')
('key', ':', 'val:extra')
('no sep here', '', '')`,
            codeHighlightLines: [2],
          },
        ],
        quiz: [
          {
            question: 'What does "key:val:extra".partition(":") return?',
            options: [
              '("key", ":", "val", ":", "extra")',
              '("key", ":", "val:extra")',
              '["key", "val", "extra"]',
              '("key:val", ":", "extra")',
            ],
            correctIndex: 1,
            explanation:
              'partition() splits at the FIRST occurrence of the separator and always returns exactly a 3-tuple: (before, sep, after).',
          },
          {
            question: 'What does "no sep here".partition("=") return?',
            options: [
              '("no sep here",)',
              '("no sep here", "", "")',
              '("", "", "no sep here")',
              'It raises a ValueError',
            ],
            correctIndex: 1,
            explanation:
              'When the separator is not found, partition() returns a 3-tuple with the original string as the first element and two empty strings.',
          },
        ],
        challenge: {
          prompt:
            'Write a function that parses a simple key=value string using partition(), returning a dictionary. Handle multiple key=value pairs separated by "&".',
          starterCode: `def parse_query(query_string):
    # TODO: Split on "&" to get pairs
    # TODO: Use partition("=") for each pair
    # TODO: Return a dictionary
    pass

# Test
print(parse_query("name=Alice&age=30&city=Paris"))
# {"name": "Alice", "age": "30", "city": "Paris"}`,
          solutionCode: `def parse_query(query_string):
    result = {}
    for pair in query_string.split("&"):
        key, sep, value = pair.partition("=")
        if sep:
            result[key] = value
    return result

# Test
print(parse_query("name=Alice&age=30&city=Paris"))
# {"name": "Alice", "age": "30", "city": "Paris"}`,
          hints: [
            'First split the entire string on "&" to get individual key=value pairs.',
            'Use partition("=") on each pair to separate the key and value.',
            'Check if sep is non-empty to ensure the "=" was actually found.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  replace                                                      */
      /* ------------------------------------------------------------ */
      {
        id: 'str-replace',
        title: 'replace() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.replace(old, new, count=-1) returns a copy with all occurrences of old replaced by new. The optional count limits the number of replacements.',
            code: `str.replace(old, new, count)`,
          },
          {
            heading: 'Examples',
            content: 'Replace substrings.',
            code: `print("hello world".replace("world", "Python"))
print("aaa".replace("a", "b", 2))
print("one-two-three".replace("-", " "))`,
            output: `hello Python
bba
one two three`,
            codeHighlightLines: [2],
          },
        ],
        quiz: [
          {
            question: 'What does "aaa".replace("a", "b", 2) return?',
            options: ['"bbb"', '"bba"', '"abb"', '"bab"'],
            correctIndex: 1,
            explanation:
              'The count parameter limits replacements to 2. The first two "a"s are replaced with "b", giving "bba". The third "a" remains unchanged.',
          },
          {
            question: 'What does "hello".replace("", "-") return?',
            options: ['"hello"', '"-h-e-l-l-o-"', '"hello-"', 'It raises a ValueError'],
            correctIndex: 1,
            explanation:
              'Replacing the empty string inserts the replacement between every character and at the start and end: "-h-e-l-l-o-".',
          },
          {
            question: 'Does replace() modify the original string?',
            options: [
              'Yes, strings are mutable',
              'No, it returns a new string',
              'Only when count is not specified',
              'It depends on the string length',
            ],
            correctIndex: 1,
            explanation:
              'Strings in Python are immutable. replace() always returns a new string, leaving the original unchanged.',
          },
        ],
        challenge: {
          prompt:
            'Write a function that censors specific words in a text by replacing them with asterisks of the same length.',
          starterCode: `def censor(text, bad_words):
    # TODO: Replace each bad word with asterisks of the same length
    # TODO: Make it case-insensitive
    pass

# Test
print(censor("Hello World, hello!", ["hello"]))
# "***** World, *****!"`,
          solutionCode: `def censor(text, bad_words):
    result = text
    for word in bad_words:
        lower_result = result.lower()
        lower_word = word.lower()
        start = 0
        new_result = ""
        while True:
            idx = lower_result.find(lower_word, start)
            if idx == -1:
                new_result += result[start:]
                break
            new_result += result[start:idx] + "*" * len(word)
            start = idx + len(word)
        result = new_result
    return result

# Test
print(censor("Hello World, hello!", ["hello"]))
# "***** World, *****!"`,
          hints: [
            'For each bad word, create a replacement string of asterisks with the same length.',
            'To handle case-insensitivity, use find() on a lowercased version to locate matches.',
            'Reconstruct the string piece by piece, replacing matched segments.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  rfind                                                        */
      /* ------------------------------------------------------------ */
      {
        id: 'str-rfind',
        title: 'rfind() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.rfind(sub, start, end) returns the highest index where substring sub is found. Returns -1 if not found. It searches from the right.',
            code: `str.rfind(sub, start, end)`,
          },
          {
            heading: 'Examples',
            content: 'Find the last occurrence of a substring.',
            code: `print("banana".rfind("a"))
print("banana".rfind("na"))
print("hello".rfind("xyz"))`,
            output: `5
4
-1`,
          },
        ],
        quiz: [
          {
            question: 'What does "banana".rfind("a") return?',
            options: ['1', '3', '5', '-1'],
            correctIndex: 2,
            explanation:
              'rfind() returns the HIGHEST (rightmost) index. The last "a" in "banana" is at index 5.',
          },
          {
            question: 'What is the difference between rfind() and find()?',
            options: [
              'rfind() is faster',
              'rfind() returns the last occurrence, find() returns the first',
              'rfind() raises an error when not found',
              'rfind() only works with single characters',
            ],
            correctIndex: 1,
            explanation:
              'find() returns the lowest (leftmost) index, while rfind() returns the highest (rightmost) index. Both return -1 when not found.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  rindex                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'str-rindex',
        title: 'rindex() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.rindex(sub, start, end) is like rfind() but raises ValueError when the substring is not found.',
            code: `str.rindex(sub, start, end)`,
          },
          {
            heading: 'Examples',
            content: 'Find last occurrence or raise error.',
            code: `print("banana".rindex("a"))
print("banana".rindex("na"))
# "hello".rindex("xyz")  # ValueError`,
            output: `5
4`,
          },
        ],
        quiz: [
          {
            question: 'What does "hello".rindex("xyz") do?',
            options: [
              'Returns -1',
              'Returns None',
              'Raises a ValueError',
              'Raises an IndexError',
            ],
            correctIndex: 2,
            explanation:
              'Like index(), rindex() raises a ValueError when the substring is not found, rather than returning -1 like rfind().',
          },
          {
            question: 'What does "banana".rindex("na") return?',
            options: ['2', '4', '0', '-1'],
            correctIndex: 1,
            explanation:
              'rindex() finds the last occurrence. "na" appears at index 2 and index 4. The rightmost match is at index 4.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  rjust                                                        */
      /* ------------------------------------------------------------ */
      {
        id: 'str-rjust',
        title: 'rjust() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.rjust(width, fillchar=" ") returns the string right-justified in a string of the given width, padded on the left with the fill character.',
            code: `str.rjust(width, fillchar=" ")`,
          },
          {
            heading: 'Examples',
            content: 'Right-justify strings within a width.',
            code: `print("|" + "hi".rjust(10))
print("42".rjust(6, "0"))
print("$99".rjust(10, "."))`,
            output: `|        hi
000042
.......$99`,
          },
        ],
        quiz: [
          {
            question: 'What does "42".rjust(6, "0") return?',
            options: ['"420000"', '"000042"', '"004200"', '"42    "'],
            correctIndex: 1,
            explanation:
              'rjust() right-justifies the string and pads the LEFT side with the fill character. "42" needs 4 more characters to reach width 6, so four "0"s are added on the left: "000042".',
          },
          {
            question: 'How does rjust() differ from zfill() for numeric padding?',
            options: [
              'They are identical',
              'rjust() does not handle sign characters; zfill() places zeros after the sign',
              'zfill() can only pad with spaces',
              'rjust() is slower than zfill()',
            ],
            correctIndex: 1,
            explanation:
              'zfill() is specifically designed for numeric strings and inserts zeros after the sign character (+ or -). rjust("0") would place zeros before the sign.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  rpartition                                                   */
      /* ------------------------------------------------------------ */
      {
        id: 'str-rpartition',
        title: 'rpartition() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.rpartition(sep) splits the string at the last occurrence of sep and returns a 3-tuple: (before, sep, after). If sep is not found, returns ("", "", str).',
            code: `str.rpartition(sep)`,
          },
          {
            heading: 'Examples',
            content: 'Split at the last occurrence of a separator.',
            code: `print("a/b/c".rpartition("/"))
print("key=val=extra".rpartition("="))
print("no sep".rpartition("/"))`,
            output: `('a/b', '/', 'c')
('key=val', '=', 'extra')
('', '', 'no sep')`,
          },
        ],
        quiz: [
          {
            question: 'What does "a/b/c".rpartition("/") return?',
            options: [
              '("a", "/", "b/c")',
              '("a/b", "/", "c")',
              '["a", "b", "c"]',
              '("a/b/c", "", "")',
            ],
            correctIndex: 1,
            explanation:
              'rpartition() splits at the LAST occurrence. The last "/" separates "a/b" from "c", giving ("a/b", "/", "c").',
          },
          {
            question: 'What does "no sep".rpartition("/") return?',
            options: [
              '("no sep", "", "")',
              '("", "", "no sep")',
              '("no sep",)',
              'It raises a ValueError',
            ],
            correctIndex: 1,
            explanation:
              'When the separator is not found, rpartition() returns ("", "", str). This differs from partition(), which returns (str, "", "").',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  rsplit                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'str-rsplit',
        title: 'rsplit() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.rsplit(sep=None, maxsplit=-1) splits the string from the right. If maxsplit is given, at most that many splits are done. Without maxsplit, rsplit() behaves identically to split().',
            code: `str.rsplit(sep, maxsplit)`,
          },
          {
            heading: 'Examples',
            content: 'Split from the right.',
            code: `print("a,b,c,d".rsplit(","))
print("a,b,c,d".rsplit(",", 2))
print("a.b.c".rsplit(".", 1))`,
            output: `['a', 'b', 'c', 'd']
['a,b', 'c', 'd']
['a.b', 'c']`,
            tip: 'rsplit() with maxsplit=1 is great for splitting off the last element, like getting the file extension: "archive.tar.gz".rsplit(".", 1) gives ["archive.tar", "gz"].',
            codeHighlightLines: [3],
          },
        ],
        quiz: [
          {
            question: 'What does "a,b,c,d".rsplit(",", 2) return?',
            options: [
              '["a", "b", "c,d"]',
              '["a,b", "c", "d"]',
              '["a", "b", "c", "d"]',
              '["a,b,c", "d"]',
            ],
            correctIndex: 1,
            explanation:
              'rsplit() splits from the right with at most 2 splits. The rightmost comma splits "d", the next comma splits "c", and the rest stays as "a,b".',
          },
          {
            question: 'How can you get the file extension from "archive.tar.gz"?',
            options: [
              '"archive.tar.gz".split(".", 1)',
              '"archive.tar.gz".rsplit(".", 1)',
              '"archive.tar.gz".split(".")',
              '"archive.tar.gz".partition(".")',
            ],
            correctIndex: 1,
            explanation:
              'rsplit(".", 1) splits from the right at the last dot, giving ["archive.tar", "gz"]. split(".", 1) would split at the first dot instead.',
          },
        ],
        challenge: {
          prompt:
            'Write a function that extracts the file extension from a filename, handling cases with no extension and multiple dots.',
          starterCode: `def get_extension(filename):
    # TODO: Return the file extension without the dot
    # TODO: Return "" if there is no extension
    # TODO: Handle filenames like "archive.tar.gz"
    pass

# Test
print(get_extension("script.py"))        # "py"
print(get_extension("archive.tar.gz"))   # "gz"
print(get_extension("README"))           # ""`,
          solutionCode: `def get_extension(filename):
    parts = filename.rsplit(".", 1)
    if len(parts) == 2:
        return parts[1]
    return ""

# Test
print(get_extension("script.py"))        # "py"
print(get_extension("archive.tar.gz"))   # "gz"
print(get_extension("README"))           # ""`,
          hints: [
            'Use rsplit(".", 1) to split at the last dot only.',
            'Check if the split produced two parts (meaning a dot was found).',
            'If no dot was found, return an empty string.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  rstrip                                                       */
      /* ------------------------------------------------------------ */
      {
        id: 'str-rstrip',
        title: 'rstrip() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.rstrip(chars=None) returns a copy of the string with trailing characters removed. The chars argument is a set of characters to strip. If omitted, whitespace is removed.',
            code: `str.rstrip(chars)`,
          },
          {
            heading: 'Examples',
            content: 'Strip trailing characters.',
            code: `print("   hello   ".rstrip())
print("hello!!!".rstrip("!"))
print("data\\n\\n".rstrip())`,
            output: `   hello
hello
data`,
          },
        ],
        quiz: [
          {
            question: 'What does "hello!!!".rstrip("!") return?',
            options: ['"hello"', '"hello!"', '"hello!!"', '"!!!hello"'],
            correctIndex: 0,
            explanation:
              'rstrip("!") removes all trailing "!" characters. All three exclamation marks are removed, leaving "hello".',
          },
          {
            question: 'What does "   hello   ".rstrip() return?',
            options: ['"hello"', '"   hello"', '"hello   "', '"   hello   "'],
            correctIndex: 1,
            explanation:
              'rstrip() without arguments removes trailing whitespace only. The leading spaces remain, giving "   hello".',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  split                                                        */
      /* ------------------------------------------------------------ */
      {
        id: 'str-split',
        title: 'split() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.split(sep=None, maxsplit=-1) splits the string at occurrences of sep and returns a list. Without sep, consecutive whitespace is treated as a single separator and leading/trailing whitespace is removed.',
            code: `str.split(sep, maxsplit)`,
            analogy: 'Think of it like slicing a loaf of bread: the separator is the knife, and each piece between cuts becomes an element of the resulting list.',
          },
          {
            heading: 'Examples',
            content: 'Split strings into lists.',
            code: `print("a,b,c".split(","))
print("  hello   world  ".split())
print("a:b:c:d".split(":", 2))`,
            output: `['a', 'b', 'c']
['hello', 'world']
['a', 'b', 'c:d']`,
            tip: 'Calling split() with no arguments is the best way to split on whitespace -- it handles multiple spaces, tabs, and newlines, and strips leading/trailing whitespace automatically.',
            codeHighlightLines: [2, 3],
          },
        ],
        quiz: [
          {
            question: 'What does "  hello   world  ".split() return?',
            options: [
              '["", "", "hello", "", "", "world", "", ""]',
              '["hello", "world"]',
              '["  hello", "world  "]',
              '["hello   world"]',
            ],
            correctIndex: 1,
            explanation:
              'When called without arguments, split() treats consecutive whitespace as a single separator and strips leading/trailing whitespace, giving a clean ["hello", "world"].',
          },
          {
            question: 'What does "a,,b".split(",") return?',
            options: [
              '["a", "b"]',
              '["a", "", "b"]',
              '["a", "b", ""]',
              '["a,,b"]',
            ],
            correctIndex: 1,
            explanation:
              'When an explicit separator is given, split() does NOT merge consecutive separators. The two commas produce an empty string between them: ["a", "", "b"].',
          },
          {
            question: 'What does "a:b:c:d".split(":", 2) return?',
            options: [
              '["a", "b", "c", "d"]',
              '["a", "b", "c:d"]',
              '["a:b", "c", "d"]',
              '["a", "b:c:d"]',
            ],
            correctIndex: 1,
            explanation:
              'maxsplit=2 means at most 2 splits are performed from the left. After splitting at the first two colons, the rest remains as one piece: ["a", "b", "c:d"].',
          },
        ],
        challenge: {
          prompt:
            'Write a function that splits a CSV line, handling the case where fields may contain commas inside quoted strings.',
          starterCode: `def split_csv(line):
    # TODO: Split on commas but respect quoted strings
    # TODO: A quoted field like '"hello, world"' should stay as one field
    # Hint: Track whether you are inside quotes
    pass

# Test
print(split_csv('name,age,"city, state",zip'))
# ['name', 'age', 'city, state', 'zip']`,
          solutionCode: `def split_csv(line):
    fields = []
    current = ""
    in_quotes = False
    for ch in line:
        if ch == '"':
            in_quotes = not in_quotes
        elif ch == ',' and not in_quotes:
            fields.append(current)
            current = ""
        else:
            current += ch
    fields.append(current)
    return fields

# Test
print(split_csv('name,age,"city, state",zip'))
# ['name', 'age', 'city, state', 'zip']`,
          hints: [
            'Use a boolean flag to track whether you are inside a quoted string.',
            'When inside quotes, commas should be treated as regular characters.',
            'Iterate character by character, building each field string.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  splitlines                                                   */
      /* ------------------------------------------------------------ */
      {
        id: 'str-splitlines',
        title: 'splitlines() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.splitlines(keepends=False) splits the string at line boundaries and returns a list of lines. If keepends is True, line break characters are included in the result.',
            code: `str.splitlines(keepends=False)`,
          },
          {
            heading: 'Examples',
            content: 'Split text into lines.',
            code: `text = "line1\\nline2\\nline3"
print(text.splitlines())
print(text.splitlines(True))
print("one\\r\\ntwo\\nthree".splitlines())`,
            output: `['line1', 'line2', 'line3']
['line1\\n', 'line2\\n', 'line3']
['one', 'two', 'three']`,
          },
        ],
        quiz: [
          {
            question: 'What does "one\\r\\ntwo\\nthree".splitlines() return?',
            options: [
              '["one\\r", "two", "three"]',
              '["one", "two", "three"]',
              '["one\\r\\ntwo\\nthree"]',
              '["one", "", "two", "three"]',
            ],
            correctIndex: 1,
            explanation:
              'splitlines() recognizes \\r\\n as a single line boundary (not two separate boundaries), so it splits cleanly into ["one", "two", "three"].',
          },
          {
            question: 'How does splitlines() differ from split("\\n")?',
            options: [
              'They are identical',
              'splitlines() handles \\r\\n and \\r; split("\\n") only splits on \\n',
              'split("\\n") is faster',
              'splitlines() returns a tuple, split() returns a list',
            ],
            correctIndex: 1,
            explanation:
              'splitlines() is line-boundary aware: it handles \\n, \\r\\n, \\r, and other Unicode line breaks. split("\\n") only splits on the \\n character, which can leave \\r characters in the results on Windows-style text.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  startswith                                                   */
      /* ------------------------------------------------------------ */
      {
        id: 'str-startswith',
        title: 'startswith() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.startswith(prefix, start, end) returns True if the string starts with the specified prefix. The prefix can also be a tuple of strings to check.',
            code: `str.startswith(prefix, start, end)`,
          },
          {
            heading: 'Examples',
            content: 'Check string beginnings.',
            code: `print("hello world".startswith("hello"))
print("python.py".startswith(("py", "js")))
print("hello".startswith("world"))`,
            output: `True
True
False`,
          },
        ],
        quiz: [
          {
            question: 'What does "python.py".startswith(("py", "js")) return?',
            options: ['True', 'False', '"py"', 'It raises a TypeError'],
            correctIndex: 0,
            explanation:
              'startswith() accepts a tuple and returns True if the string starts with any of the prefixes. "python.py" starts with "py", so it returns True.',
          },
          {
            question: 'What does "hello world".startswith("world", 6) return?',
            options: ['True', 'False', 'It raises an IndexError', 'None'],
            correctIndex: 0,
            explanation:
              'The start parameter makes startswith() check from index 6. The substring starting at index 6 is "world", which matches the prefix "world", so it returns True.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  strip                                                        */
      /* ------------------------------------------------------------ */
      {
        id: 'str-strip',
        title: 'strip() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.strip(chars=None) returns a copy of the string with leading and trailing characters removed. If chars is omitted, whitespace is removed from both ends.',
            code: `str.strip(chars)`,
            analogy: 'Think of it like trimming the crust off a sandwich: strip() removes unwanted material from both edges, leaving only the clean content in the middle.',
          },
          {
            heading: 'Examples',
            content: 'Strip whitespace or specific characters from both ends.',
            code: `print("  hello  ".strip())
print("***hello***".strip("*"))
print("  \\thello\\n  ".strip())`,
            output: `hello
hello
hello`,
          },
        ],
        quiz: [
          {
            question: 'What does "***hello***".strip("*") return?',
            options: ['"hello"', '"*hello*"', '"hello***"', '"***hello"'],
            correctIndex: 0,
            explanation:
              'strip("*") removes all leading and trailing asterisks. All three asterisks on each side are removed, leaving "hello".',
          },
          {
            question: 'What does "  \\thello\\n  ".strip() return?',
            options: ['"  \\thello\\n  "', '"hello"', '"\\thello\\n"', '"  hello  "'],
            correctIndex: 1,
            explanation:
              'strip() without arguments removes all leading and trailing whitespace characters, including spaces, tabs (\\t), and newlines (\\n).',
          },
          {
            question: 'What does "abcba".strip("ab") return?',
            options: ['"cba"', '"abc"', '"c"', '"bcb"'],
            correctIndex: 2,
            explanation:
              'strip("ab") treats the argument as a set of characters {a, b} and removes any leading or trailing character that is in this set. From the left: a, b are stripped. From the right: a, b are stripped. Only "c" remains.',
          },
        ],
        challenge: {
          prompt:
            'Write a function that cleans up user input by stripping whitespace and removing matching quotes around the string.',
          starterCode: `def clean_input(text):
    # TODO: Strip whitespace from both ends
    # TODO: If the result is wrapped in matching quotes (single or double), remove them
    # TODO: Return the cleaned string
    pass

# Test
print(clean_input('  "hello world"  '))  # "hello world"
print(clean_input("  'test'  "))         # "test"
print(clean_input("  no quotes  "))      # "no quotes"`,
          solutionCode: `def clean_input(text):
    stripped = text.strip()
    if len(stripped) >= 2:
        if (stripped[0] == '"' and stripped[-1] == '"') or \\
           (stripped[0] == "'" and stripped[-1] == "'"):
            return stripped[1:-1]
    return stripped

# Test
print(clean_input('  "hello world"  '))  # "hello world"
print(clean_input("  'test'  "))         # "test"
print(clean_input("  no quotes  "))      # "no quotes"`,
          hints: [
            'First use strip() to remove surrounding whitespace.',
            'Check if the first and last characters are matching quote characters.',
            'Use slicing [1:-1] to remove the first and last characters.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  swapcase                                                     */
      /* ------------------------------------------------------------ */
      {
        id: 'str-swapcase',
        title: 'swapcase() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.swapcase() returns a copy of the string with uppercase characters converted to lowercase and vice versa.',
            code: `str.swapcase()`,
          },
          {
            heading: 'Examples',
            content: 'Swap character cases.',
            code: `print("Hello World".swapcase())
print("PYTHON".swapcase())
print("PyThOn".swapcase())`,
            output: `hELLO wORLD
python
pYtHoN`,
          },
        ],
        quiz: [
          {
            question: 'What does "PyThOn".swapcase() return?',
            options: ['"python"', '"PYTHON"', '"pYtHoN"', '"pythOn"'],
            correctIndex: 2,
            explanation:
              'swapcase() inverts each character\'s case. P->p, y->Y, T->t, h->H, O->o, n->N, giving "pYtHoN".',
          },
          {
            question: 'Is s.swapcase().swapcase() always equal to s?',
            options: [
              'Yes, always',
              'No, some Unicode characters may not round-trip correctly',
              'Only for ASCII strings',
              'It depends on the Python version',
            ],
            correctIndex: 1,
            explanation:
              'For ASCII strings, double swapcase returns the original. But some Unicode characters (like the German "ß") may not round-trip: "ß".swapcase() gives "SS", and "SS".swapcase() gives "ss", not "ß".',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  title                                                        */
      /* ------------------------------------------------------------ */
      {
        id: 'str-title',
        title: 'title() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.title() returns a titlecased copy of the string -- every word starts with an uppercase letter and the remaining characters are lowercase.',
            code: `str.title()`,
          },
          {
            heading: 'Examples',
            content: 'Convert to title case.',
            code: `print("hello world".title())
print("PYTHON PROGRAMMING".title())
print("it's a test".title())`,
            output: `Hello World
Python Programming
It'S A Test`,
            tip: 'title() uses a simple word boundary rule (splits on non-alpha characters), so contractions like "it\'s" become "It\'S". For smarter title-casing, use the titlecase third-party library.',
          },
        ],
        quiz: [
          {
            question: 'What does "it\'s a test".title() return?',
            options: [
              '"It\'s A Test"',
              '"It\'S A Test"',
              '"It\'s a test"',
              '"IT\'S A TEST"',
            ],
            correctIndex: 1,
            explanation:
              'title() considers the apostrophe as a word boundary, so the character after it ("s") is treated as the start of a new word and is capitalized: "It\'S A Test".',
          },
          {
            question: 'What does "hello-world".title() return?',
            options: [
              '"Hello-world"',
              '"Hello-World"',
              '"Hello World"',
              '"HELLO-WORLD"',
            ],
            correctIndex: 1,
            explanation:
              'The hyphen is a non-alphabetic character, so title() treats it as a word boundary. Both "hello" and "world" get title-cased: "Hello-World".',
          },
        ],
        challenge: {
          prompt:
            'Write a smarter title case function that does not capitalize letters after apostrophes within words.',
          starterCode: `def smart_title(text):
    # TODO: Title-case each word
    # TODO: But don't capitalize after apostrophes mid-word
    # Hint: split into words, handle each word separately
    pass

# Test
print(smart_title("it's a test"))         # "It's A Test"
print(smart_title("they're here"))        # "They're Here"`,
          solutionCode: `def smart_title(text):
    words = text.split()
    result = []
    for word in words:
        if "'" in word:
            parts = word.split("'")
            titled = parts[0].capitalize() + "'" + "'".join(p.lower() for p in parts[1:])
            result.append(titled)
        else:
            result.append(word.capitalize())
    return " ".join(result)

# Test
print(smart_title("it's a test"))         # "It's A Test"
print(smart_title("they're here"))        # "They're Here"`,
          hints: [
            'Split the text into words using split().',
            'For words containing apostrophes, split on the apostrophe and only capitalize the first part.',
            'Use capitalize() on the first part and lower() on the rest.',
          ],
        },
      },

      /* ------------------------------------------------------------ */
      /*  upper                                                        */
      /* ------------------------------------------------------------ */
      {
        id: 'str-upper',
        title: 'upper() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.upper() returns a copy of the string with all cased characters converted to uppercase.',
            code: `str.upper()`,
          },
          {
            heading: 'Examples',
            content: 'Convert strings to uppercase.',
            code: `print("hello".upper())
print("Python 3.12".upper())
print("ALREADY UPPER".upper())`,
            output: `HELLO
PYTHON 3.12
ALREADY UPPER`,
          },
        ],
        quiz: [
          {
            question: 'What does "Python 3.12".upper() return?',
            options: ['"PYTHON 3.12"', '"PYTHON 312"', '"PYTHON3.12"', '"python 3.12"'],
            correctIndex: 0,
            explanation:
              'upper() converts all cased characters to uppercase. Non-cased characters like digits, dots, and spaces are left unchanged.',
          },
          {
            question: 'What does "ß".upper() return in Python 3?',
            options: ['"ß"', '"SS"', '"S"', 'It raises a UnicodeError'],
            correctIndex: 1,
            explanation:
              'In Python 3, "ß".upper() returns "SS". The German eszett uppercases to two characters. Note that the length of the string changes from 1 to 2.',
          },
        ],
      },

      /* ------------------------------------------------------------ */
      /*  zfill                                                        */
      /* ------------------------------------------------------------ */
      {
        id: 'str-zfill',
        title: 'zfill() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'str.zfill(width) returns a copy of the string left-padded with zeros to fill the given width. A leading sign prefix (+ or -) is handled correctly by inserting zeros after the sign.',
            code: `str.zfill(width)`,
          },
          {
            heading: 'Examples',
            content: 'Zero-pad strings.',
            code: `print("42".zfill(6))
print("-42".zfill(6))
print("hello".zfill(10))`,
            output: `000042
-00042
00000hello`,
            tip: 'zfill() is commonly used for formatting numeric strings like IDs or timestamps: "7".zfill(2) gives "07". For more control, consider f-strings: f"{7:02d}".',
            codeHighlightLines: [2],
          },
        ],
        quiz: [
          {
            question: 'What does "-42".zfill(6) return?',
            options: ['"-00042"', '"000-42"', '"00-042"', '"-42000"'],
            correctIndex: 0,
            explanation:
              'zfill() correctly handles sign characters by placing zeros after the sign. The result is "-00042" (total width 6, with the sign counting as one character).',
          },
          {
            question: 'What does "hello".zfill(10) return?',
            options: ['"hello00000"', '"00000hello"', '"hello     "', '"     hello"'],
            correctIndex: 1,
            explanation:
              'zfill() always pads with zeros on the LEFT, even for non-numeric strings. "hello" has 5 characters, so 5 zeros are prepended: "00000hello".',
          },
          {
            question: 'What does "42".zfill(2) return?',
            options: ['"42"', '"042"', '"0042"', '"4200"'],
            correctIndex: 0,
            explanation:
              'When the string length is already equal to or greater than the specified width, zfill() returns the original string unchanged. "42" is already 2 characters wide.',
          },
        ],
        challenge: {
          prompt:
            'Write a function that formats a time duration given in seconds as HH:MM:SS with zero-padded components.',
          starterCode: `def format_duration(total_seconds):
    # TODO: Calculate hours, minutes, seconds
    # TODO: Zero-pad each component to 2 digits
    # TODO: Return formatted string "HH:MM:SS"
    pass

# Test
print(format_duration(3661))   # "01:01:01"
print(format_duration(90))     # "00:01:30"
print(format_duration(0))      # "00:00:00"`,
          solutionCode: `def format_duration(total_seconds):
    hours = total_seconds // 3600
    minutes = (total_seconds % 3600) // 60
    seconds = total_seconds % 60
    h = str(hours).zfill(2)
    m = str(minutes).zfill(2)
    s = str(seconds).zfill(2)
    return f"{h}:{m}:{s}"

# Test
print(format_duration(3661))   # "01:01:01"
print(format_duration(90))     # "00:01:30"
print(format_duration(0))      # "00:00:00"`,
          hints: [
            'Use integer division (//) and modulo (%) to break total_seconds into hours, minutes, and seconds.',
            'Convert each component to a string with str(), then use zfill(2) to pad.',
            'Join the components with ":" separators.',
          ],
        },
      },
    ],
  },
];

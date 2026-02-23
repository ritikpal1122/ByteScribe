import type { DocCategory } from './types';

// Part 1A: Getting Started, Data Structures
export const PART1A_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Getting Started                                              */
  /* ------------------------------------------------------------ */
  {
    id: 'getting-started',
    label: 'Getting Started',
    icon: 'BookOpen',
    entries: [
      {
        id: 'introduction',
        title: 'Introduction',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'What is Python?',
            content:
              'Welcome to Python -- arguably the most beginner-friendly programming language ever created, and yet powerful enough to run Instagram, YouTube, and cutting-edge AI research. Python was created by Guido van Rossum and first released in 1991, and its guiding philosophy is simple: code should be easy to read. Where other languages drown you in curly braces and semicolons, Python uses clean indentation and an almost English-like syntax that lets you express ideas in remarkably few lines. Whether you want to build web apps, crunch data, automate boring tasks, or train machine learning models, Python has you covered. It supports procedural, object-oriented, and functional programming styles -- so as you grow as a developer, Python grows with you.',
            code: `# Your very first Python program
print("Hello, World!")

# Python can also do arithmetic right away
print(2 + 3)
print("Python version check:")

import sys
print(sys.version)`,
            output: `Hello, World!
5
Python version check:
3.12.0 (main, Oct  2 2023, 00:00:00) [GCC 13.2.1]`,
            tip: 'Python files use the .py extension. You can run a Python file from the terminal with: python3 filename.py',
            note: 'The name "Python" comes from Monty Python\'s Flying Circus, not the snake. Guido van Rossum was a big fan of the show -- which explains why the community has such a fun, welcoming culture.',
            analogy: 'Think of Python like a Swiss Army knife for programming -- it has a tool for nearly every job, yet each individual tool is simple and easy to understand on its own.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n  A[Write .py file] --> B[Python Interpreter] --> C[Output]\n  B --> D[Read line by line]\n  D --> E[Execute immediately]\n  E --> C',
              caption: 'How Python executes your code: the interpreter reads and runs each line top to bottom',
            },
            codeHighlightLines: [2, 5, 9],
          },
          {
            heading: 'Why Use Python?',

            content:
              'Here\'s the thing about Python: it\'s the rare language that works brilliantly as both your first language and your forever language. Its syntax reads almost like English, so you spend less time deciphering cryptic symbols and more time actually solving problems. But don\'t let the simplicity fool you -- Python\'s ecosystem is enormous. Need to build a web app? Django and Flask have you covered. Data analysis? pandas and NumPy are industry standards. Machine learning? TensorFlow and PyTorch power the AI revolution. And that swap-two-variables trick you\'ll see in the code below? In most languages that takes three lines and a temporary variable. In Python, it\'s one elegant line. That\'s the Python philosophy in a nutshell: there should be one obvious, beautiful way to do things. The community behind Python is massive and famously welcoming -- so when you get stuck (and everyone does!), there are thousands of tutorials, Stack Overflow answers, and open-source packages ready to help.',
            code: `# Python is concise — compare to other languages
# Swapping two variables (no temp variable needed!)
a = 10
b = 20
a, b = b, a
print(f"a = {a}, b = {b}")

# Reading and processing data is straightforward
names = ["Alice", "Bob", "Charlie"]
for name in names:
    print(f"Hello, {name}!")`,
            output: `a = 20, b = 10
Hello, Alice!
Hello, Bob!
Hello, Charlie!`,
            note: 'Python consistently ranks as the #1 or #2 most popular programming language in major surveys like the TIOBE Index and Stack Overflow Developer Survey. Learning it opens doors across almost every area of software development.',
            analogy: 'Think of Python like learning to ride a bicycle with training wheels that you never actually need to remove -- it starts simple, but it can take you just as far as a racing bike.',
            codeHighlightLines: [5, 10, 11],
          },
          {
            heading: 'The Python REPL',
            content:
              'One of Python\'s secret weapons for learning is the REPL -- that stands for Read-Eval-Print Loop, and it\'s basically a live playground for your code. Just type `python3` in your terminal and you\'re in. You type an expression, Python evaluates it, prints the result, and waits for more. It\'s like having a conversation with Python. This makes it incredible for experimenting: "What happens if I do this?" -- just try it and see, instantly. No need to create a file, no need to compile anything. When you see the `>>>` prompt, Python is ready for your input. If you start a multi-line statement (like an `if` block), you\'ll see `...` which means Python is waiting for you to finish. The REPL is where experienced developers go to test quick ideas, and it\'s where beginners should go to build intuition. You\'ll learn faster by playing in the REPL than by just reading about Python.',
            code: `# In the REPL, expressions are automatically printed
# >>> 5 + 3
# 8
# >>> "hello".upper()
# 'HELLO'
# >>> type(42)
# <class 'int'>

# You can also use the REPL for quick calculations
# >>> 2 ** 10
# 1024
# >>> 100 / 3
# 33.333333333333336

# Simulating REPL-style exploration
result = 2 ** 10
print(result)

text = "hello"
print(text.upper())
print(type(42))`,
            output: `1024
HELLO
<class 'int'>`,
            tip: 'Try IPython (install with `pip install ipython`) for a supercharged REPL with syntax highlighting, tab-completion, and magic commands like `%timeit` for benchmarking. Once you try it, you\'ll never go back to the basic REPL.',
            analogy: 'Think of the REPL like a scratch pad or whiteboard -- you jot down an idea, instantly see the result, erase it, and try something else. It is a conversation with your computer.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n  A[">>> You type code"] --> B[Read]\n  B --> C[Evaluate]\n  C --> D[Print result]\n  D --> E[Loop back]\n  E --> A',
              caption: 'The Read-Eval-Print Loop cycle',
            },
          },
        ],
        quiz: [
          {
            question: 'What does REPL stand for in Python?',
            options: ['Run-Execute-Print-Loop', 'Read-Eval-Print-Loop', 'Read-Execute-Parse-Loop', 'Run-Eval-Parse-Loop'],
            correctIndex: 1,
            explanation: 'REPL stands for Read-Eval-Print-Loop. Python reads your input, evaluates it, prints the result, and loops back for more input.',
          },
          {
            question: 'Who created Python and when was it first released?',
            options: ['James Gosling in 1995', 'Guido van Rossum in 1991', 'Brendan Eich in 1995', 'Dennis Ritchie in 1972'],
            correctIndex: 1,
            explanation: 'Python was created by Guido van Rossum and first released in 1991. The name comes from Monty Python\'s Flying Circus.',
          },
          {
            question: 'How does Python execute code?',
            options: ['It compiles to machine code first', 'It reads and runs each line top to bottom via an interpreter', 'It converts to Java bytecode', 'It requires a separate compilation step'],
            correctIndex: 1,
            explanation: 'Python uses an interpreter that reads and executes each line of code from top to bottom, making it an interpreted language.',
          },
        ],
        challenge: {
          prompt: 'Write a Python program that prints your name, your favorite programming language, and the result of multiplying 7 by 8.',
          starterCode: `# Print your name\n\n# Print your favorite programming language\n\n# Print the result of 7 * 8\n`,
          solutionCode: `# Print your name\nprint("Alice")\n\n# Print your favorite programming language\nprint("Python")\n\n# Print the result of 7 * 8\nprint(7 * 8)`,
          hints: [
            'Use the print() function to display text on the screen.',
            'Strings must be wrapped in quotes, but arithmetic expressions should not.',
            'You can use print() with a string argument like print("text") or with an expression like print(7 * 8).',
          ],
        },
      },
      {
        id: 'comments',
        title: 'Comments',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Single-Line Comments',
            content:
              'Comments are your way of leaving notes for your future self (and for other developers who read your code). In Python, a single-line comment starts with the `#` symbol -- everything after that `#` on the same line is completely ignored by the interpreter. Think of comments like sticky notes on your code. The golden rule? Good comments explain *why* you did something, not *what* you did. The code itself already shows the "what" -- if someone can read `x = x + 1`, they don\'t need a comment saying "increment x by 1." But a comment like "compensate for 0-based index in display" is genuinely helpful because it explains the reasoning. You can place a comment on its own line, or tack one onto the end of a line of code (called an inline comment).',
            code: `# This is a full-line comment
x = 10  # This is an inline comment

# Comments are ignored by Python
# print("This line will not execute")

# Use comments to explain complex logic
# Calculate compound interest: A = P(1 + r/n)^(nt)
principal = 1000
rate = 0.05
time = 10
n = 12  # compounded monthly
amount = principal * (1 + rate / n) ** (n * time)
print(f"Final amount: \${amount:.2f}")`,
            output: `Final amount: $1647.01`,
            tip: 'Avoid obvious comments like x = 5  # set x to 5. Instead, explain why: x = 5  # default retry limit per API guidelines.',
            warning: 'Outdated comments are worse than no comments at all. When you change your code, always update the comments too. A comment that says "sort by last name" above code that sorts by first name will confuse everyone -- including future you.',
          },
          {
            heading: 'Multi-Line Comments and Docstrings',
            content:
              'You might be wondering: "How do I write a comment that spans multiple lines?" Python doesn\'t have a dedicated multi-line comment syntax like `/* */` in C or Java. Instead, developers simply stack multiple `#` lines. But here\'s where it gets interesting: Python has something even better called *docstrings*. A docstring is a triple-quoted string (`"""..."""`) that appears as the very first statement in a module, function, class, or method. It documents what that thing does, and unlike regular comments, docstrings are actually stored in memory at runtime -- you can access them through the `__doc__` attribute. This is how Python\'s built-in `help()` function works. Write great docstrings and your code essentially documents itself. The standard format (shown below) is called Google-style, though you\'ll also see NumPy-style and Sphinx-style in the wild.',
            code: `# Multiple single-line comments
# are commonly used for
# multi-line explanations

def calculate_area(radius):
    """Calculate the area of a circle.

    This function takes the radius of a circle
    and returns its area using the formula pi * r^2.

    Args:
        radius: The radius of the circle (must be positive).

    Returns:
        The area of the circle as a float.
    """
    import math
    return math.pi * radius ** 2

# Access the docstring programmatically
print(calculate_area(5))
print(calculate_area.__doc__[:40])`,
            output: `78.53981633974483
Calculate the area of a circle.

    Th`,
            note: 'Docstrings are not just nice-to-have -- tools like Sphinx can auto-generate entire documentation websites from your docstrings. Many IDEs also display them in hover tooltips. Writing good docstrings is one of the highest-leverage habits you can build as a Python developer.',
            codeHighlightLines: [6, 7, 11, 12, 14, 15],
          },
          {
            heading: 'Comment Best Practices',
            content:
              'Let\'s talk about the art of commenting well, because this is genuinely one of the skills that separates junior from senior developers. The PEP 8 style guide (Python\'s official style bible) recommends writing comments as complete sentences, capitalizing the first word, and keeping inline comments at least two spaces from the code. But beyond formatting, the real skill is knowing *when* to comment. Comment complex algorithms, non-obvious business logic, workarounds for known bugs, and public APIs. Don\'t comment every line -- that makes code *harder* to read, not easier. A codebase where every line has a comment is like a book where every sentence is underlined: if everything is highlighted, nothing is. Also, learn the conventional comment markers: `TODO:` for planned improvements, `FIXME:` for known broken things, and `NOTE:` for important context. Most editors and IDEs highlight these specially, making them easy to find.',
            code: `# BAD: Restating the obvious
x = x + 1  # increment x by 1

# GOOD: Explaining why
x = x + 1  # compensate for 0-based index in display

# BAD: Outdated comment
# Sort users by last name
users.sort(key=lambda u: u.first_name)  # now sorts by first name!

# GOOD: Use TODO comments for future work
# TODO: Add input validation for negative radii
# FIXME: This breaks when the list is empty
# NOTE: Using bubble sort here because n < 10

# GOOD: Section separators for long files
# ---- Database Configuration ----
DB_HOST = "localhost"
DB_PORT = 5432

# ---- Application Settings ----
DEBUG = True
MAX_RETRIES = 3

print("Comments improve code quality!")`,
            output: `Comments improve code quality!`,
            tip: 'Most editors let you toggle comments with a keyboard shortcut (usually Cmd+/ on Mac or Ctrl+/ on Windows). This is incredibly handy for temporarily disabling code during debugging without deleting it.',
          },
        ],
        quiz: [
          {
            question: 'What symbol starts a single-line comment in Python?',
            options: ['//', '#', '/*', '--'],
            correctIndex: 1,
            explanation: 'In Python, single-line comments start with the # symbol. Everything after # on that line is ignored by the interpreter.',
          },
          {
            question: 'What is a docstring in Python?',
            options: ['A comment that starts with //', 'A triple-quoted string used to document modules, functions, or classes', 'A special variable that stores documentation', 'A comment that spans exactly two lines'],
            correctIndex: 1,
            explanation: 'A docstring is a triple-quoted string ("""...""") placed as the first statement in a module, function, class, or method. It documents what that code does and is accessible via the __doc__ attribute.',
          },
          {
            question: 'Which of the following is a BAD commenting practice?',
            options: ['Explaining why a workaround is needed', 'Using TODO: for planned improvements', 'Writing x = x + 1  # increment x by 1', 'Documenting complex algorithm logic'],
            correctIndex: 2,
            explanation: 'Commenting "increment x by 1" next to x = x + 1 is restating the obvious. Good comments explain WHY, not WHAT. The code itself already shows what is happening.',
          },
          {
            question: 'How can you access a function\'s docstring programmatically?',
            options: ['function.comment', 'function.__doc__', 'function.docs()', 'get_docs(function)'],
            correctIndex: 1,
            explanation: 'Docstrings are stored at runtime and can be accessed through the __doc__ attribute of the function, class, or module. This is how Python\'s built-in help() function works.',
          },
        ],
        challenge: {
          prompt: 'Write a function called `celsius_to_fahrenheit` that converts Celsius to Fahrenheit. Include a proper docstring with Args and Returns sections, and add a meaningful inline comment explaining the formula.',
          starterCode: `def celsius_to_fahrenheit(celsius):\n    # Add your docstring and code here\n    pass\n\n# Test the function\nprint(celsius_to_fahrenheit(100))\nprint(celsius_to_fahrenheit(0))`,
          solutionCode: `def celsius_to_fahrenheit(celsius):\n    """Convert a temperature from Celsius to Fahrenheit.\n\n    Args:\n        celsius: Temperature in degrees Celsius.\n\n    Returns:\n        Temperature in degrees Fahrenheit as a float.\n    """\n    # Formula: F = C * 9/5 + 32 (multiply by 9/5 then add 32)\n    return celsius * 9 / 5 + 32\n\n# Test the function\nprint(celsius_to_fahrenheit(100))\nprint(celsius_to_fahrenheit(0))`,
          hints: [
            'A docstring goes right after the def line, using triple quotes ("""...""").',
            'The Fahrenheit formula is: F = C * 9/5 + 32.',
            'Use an inline comment to explain why the formula works, not just restate it.',
          ],
        },
      },
      {
        id: 'operators',
        title: 'Operators',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Arithmetic Operators',
            content:
              'Python comes with all the math tools you\'d expect -- and a few delightful extras. The basics work exactly like your calculator: `+` adds, `-` subtracts, `*` multiplies, and `/` divides. But here\'s where Python gets interesting: it also gives you `//` for floor division (which always rounds *down* toward negative infinity), `%` for getting the remainder (incredibly useful for checking if numbers are even/odd or for cycling through values), and `**` for exponentiation. One thing that trips up beginners: regular division `/` ALWAYS returns a float in Python 3, even for `10 / 2` -- you\'ll get `5.0`, not `5`. If you want an integer result, use `//` instead. The practical example below shows a real-world use case: converting a raw number of seconds into hours, minutes, and seconds using `//` and `%` together. This pattern comes up all the time in real projects.',
            code: `# Basic arithmetic
print(10 + 3)   # Addition
print(10 - 3)   # Subtraction
print(10 * 3)   # Multiplication
print(10 / 3)   # Division (always float)

# Floor division, modulo, exponentiation
print(10 // 3)  # Floor division
print(10 % 3)   # Modulo (remainder)
print(2 ** 10)  # Exponentiation

# Practical example: converting seconds
total_seconds = 7385
hours = total_seconds // 3600
minutes = (total_seconds % 3600) // 60
seconds = total_seconds % 60
print(f"{hours}h {minutes}m {seconds}s")`,
            output: `13
7
30
3.3333333333333335
3
1
1024
2h 3m 5s`,
            tip: 'Use divmod(a, b) to get both the quotient and remainder in a single call: quotient, remainder = divmod(10, 3) returns (3, 1).',
            warning: 'Floor division `//` rounds toward negative infinity, not toward zero. So `-7 // 2` gives `-4`, not `-3`. This catches people off guard when working with negative numbers. If you want truncation toward zero, use `int(-7 / 2)` instead.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n  A["7385 seconds"] --> B["// 3600"]\n  B --> C["2 hours"]\n  A --> D["% 3600"]\n  D --> E["185 seconds left"]\n  E --> F["// 60"]\n  F --> G["3 minutes"]\n  E --> H["% 60"]\n  H --> I["5 seconds"]',
              caption: 'Converting total seconds to hours, minutes, seconds using // and %',
            },
            codeHighlightLines: [14, 15, 16],
          },
          {
            heading: 'Comparison Operators',
            content:
              'Comparison operators are the foundation of decision-making in your code -- they compare two values and return either `True` or `False`. Python has all the usual suspects: `==` (equal to), `!=` (not equal to), `<` (less than), `>` (greater than), `<=` (less than or equal to), and `>=` (greater than or equal to). But Python has a party trick that most other languages lack: *chained comparisons*. Instead of writing `x > 10 and x < 20`, you can write `10 < x < 20`, just like you would in math class. This isn\'t just syntactic sugar -- it\'s genuinely more readable and it only evaluates `x` once. You can even chain more than two: `0 < x < y < 100` works perfectly. Strings get compared in lexicographic (dictionary) order, character by character, based on their Unicode values -- so `"apple" < "banana"` is `True` because "a" comes before "b".',
            code: `# Basic comparisons
print(5 == 5)    # Equal to
print(5 != 3)    # Not equal to
print(5 > 3)     # Greater than
print(5 < 3)     # Less than
print(5 >= 5)    # Greater than or equal to
print(5 <= 3)    # Less than or equal to

# Chained comparisons (Python specialty!)
x = 15
print(10 < x < 20)    # True: x is between 10 and 20
print(1 < x < 10)     # False: x is not less than 10

# Comparing strings (lexicographic order)
print("apple" < "banana")
print("abc" == "abc")`,
            output: `True
True
True
False
True
False
True
False
True
True`,
            warning: 'Don\'t confuse `==` (comparison) with `=` (assignment). Writing `if x = 5:` is a syntax error in Python, which is actually a good thing -- in languages like C, this is a notorious source of bugs. Python protects you here.',
            note: 'Chained comparisons work with any comparison operators, even mixed ones. `1 < x <= 10 != 20` is perfectly valid and evaluates left to right: (1 < x) and (x <= 10) and (10 != 20).',
          },
          {
            heading: 'Logical Operators',
            content:
              'Where most programming languages use `&&`, `||`, and `!`, Python keeps things readable with plain English: `and`, `or`, and `not`. This is one of those small design choices that makes Python code feel almost like pseudocode. The `and` operator returns `True` only when *both* sides are truthy, `or` returns `True` when *at least one* side is truthy, and `not` flips a boolean value. But here\'s the key insight that separates Python beginners from intermediates: `and` and `or` don\'t always return `True` or `False` -- they return the *actual value* that determined the result. This is called short-circuit evaluation. Python stops evaluating as soon as it knows the answer: `and` stops at the first falsy value, `or` stops at the first truthy value. This makes `or` amazing for setting default values: `name = user_input or "Anonymous"` gives you "Anonymous" if `user_input` is empty. You\'ll see this pattern everywhere in production Python code.',
            code: `# Basic logical operations
print(True and False)   # False
print(True or False)    # True
print(not True)         # False

# Practical usage with conditions
age = 25
has_license = True
can_drive = age >= 18 and has_license
print(f"Can drive: {can_drive}")

# Short-circuit evaluation
name = "" or "Anonymous"
print(f"Name: {name}")

# Combining conditions
score = 85
grade = "A" if score >= 90 else "B" if score >= 80 else "C"
print(f"Grade: {grade}")

# not operator with membership
fruits = ["apple", "banana"]
print("cherry" not in fruits)`,
            output: `False
True
False
Can drive: True
Name: Anonymous
Grade: B
True`,
            tip: 'Python treats 0, None, empty strings "", empty lists [], and empty dicts {} as falsy. Everything else is truthy. Use this with or for default values: value = user_input or "default".',
            warning: 'Be careful with `or` for defaults when 0 or an empty string could be a valid value. `count = user_count or 10` will use 10 even when `user_count` is 0, which might not be what you want. In those cases, use `count = user_count if user_count is not None else 10` instead.',
            analogy: 'Think of short-circuit evaluation like a lazy security guard. With `and`, the guard checks the first ID -- if it is fake, they turn you away without even looking at the second one. With `or`, the guard lets you in as soon as ONE valid ID is shown, ignoring the rest.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n  A["and: evaluate left"] --> B{Left is truthy?}\n  B -- No --> C["Return left value\\n(short-circuit)"]\n  B -- Yes --> D["Evaluate right"]\n  D --> E["Return right value"]\n  F["or: evaluate left"] --> G{Left is truthy?}\n  G -- Yes --> H["Return left value\\n(short-circuit)"]\n  G -- No --> I["Evaluate right"]\n  I --> J["Return right value"]',
              caption: 'How Python short-circuits logical operators',
            },
          },
          {
            heading: 'Bitwise Operators',
            content:
              'Bitwise operators are where you get to peek under the hood of how computers actually think -- in binary. These operators manipulate individual bits (0s and 1s) of integer values. You probably won\'t use them in everyday Python code, but they\'re essential in specific domains like low-level systems programming, cryptography, networking (IP address manipulation), game development (flags and permissions), and competitive programming. `&` (AND) returns 1 only when both bits are 1, `|` (OR) returns 1 when at least one bit is 1, `^` (XOR) returns 1 when exactly one bit is 1, and `~` (NOT) flips all the bits. The shift operators `<<` and `>>` slide bits left or right -- shifting left by one is the same as multiplying by 2, and shifting right by one is the same as floor-dividing by 2. A clever trick shown below: checking if a number is even using `num & 1`. If the last bit is 0, the number is even. This is actually faster than `num % 2 == 0`, though in Python the speed difference is negligible.',
            code: `# Bitwise AND, OR, XOR
a = 12   # binary: 1100
b = 10   # binary: 1010

print(f"AND:  {a & b}")    # 1000 = 8
print(f"OR:   {a | b}")    # 1110 = 14
print(f"XOR:  {a ^ b}")    # 0110 = 6
print(f"NOT:  {~a}")       # -(12+1) = -13

# Shift operators
x = 5    # binary: 101
print(f"Left shift:  {x << 2}")   # 10100 = 20
print(f"Right shift: {x >> 1}")   # 10 = 2

# Practical: check if a number is even using bitwise AND
for num in [4, 7, 10, 13]:
    parity = "even" if num & 1 == 0 else "odd"
    print(f"{num} is {parity}")`,
            output: `AND:  8
OR:   14
XOR:  6
NOT:  -13
Left shift:  20
Right shift: 2
4 is even
7 is odd
10 is even
13 is odd`,
            note: 'Don\'t worry if bitwise operators feel abstract right now -- most Python developers go months or even years without needing them. But when you do need them (working with binary protocols, permission flags, or performance-critical code), they\'re incredibly powerful.',
            tip: 'XOR (`^`) has a fun property: `a ^ b ^ b` gives you back `a`. This is used in cryptography and in the classic interview problem "find the number that appears only once in an array." It also lets you swap two variables without a temp: `a ^= b; b ^= a; a ^= b`.',
            diagram: {
              kind: 'custom',
              type: 'array',
              data: {
                values: [
                  '  1  1  0  0  (12)',
                  '& 1  0  1  0  (10)',
                  '─────────────',
                  '  1  0  0  0  ( 8)',
                ],
                highlightIndices: [0, 1, 3],
              },
              caption: 'Bitwise AND: each column compares corresponding bits',
            },
          },
          {
            heading: 'Assignment Operators',
            content:
              'Assignment operators let you update a variable\'s value in a clean, concise way. You already know `=` for basic assignment, but Python also gives you compound (or augmented) assignment operators that combine an operation with assignment in one step. Instead of writing `x = x + 5`, you can write `x += 5`. This isn\'t just about saving keystrokes -- it\'s more readable, conveys intent more clearly ("I\'m adding to x" vs. "I\'m setting x to x plus something"), and can even be slightly more efficient since Python only evaluates the variable reference once. Every arithmetic and bitwise operator has a compound version: `+=`, `-=`, `*=`, `/=`, `//=`, `%=`, `**=`, `&=`, `|=`, `^=`, `<<=`, and `>>=`. Python also supports multiple assignment in a single line with `a, b, c = 1, 2, 3`, which is really tuple unpacking behind the scenes -- a concept we\'ll explore more when we cover tuples.',
            code: `# Basic assignment
x = 10
print(f"Initial: {x}")

# Compound assignment operators
x += 5    # x = x + 5
print(f"After += 5: {x}")

x -= 3    # x = x - 3
print(f"After -= 3: {x}")

x *= 2    # x = x * 2
print(f"After *= 2: {x}")

x //= 3   # x = x // 3
print(f"After //= 3: {x}")

x **= 2   # x = x ** 2
print(f"After **= 2: {x}")

x %= 5    # x = x % 5
print(f"After %%= 5: {x}")

# Multiple assignment
a, b, c = 1, 2, 3
print(f"a={a}, b={b}, c={c}")`,
            output: `Initial: 10
After += 5: 15
After -= 3: 12
After *= 2: 24
After //= 3: 8
After **= 2: 64
After %= 5: 4
a=1, b=2, c=3`,
            warning: 'Python does NOT have `++` or `--` operators like C or JavaScript. Writing `x++` is a syntax error. Always use `x += 1` and `x -= 1` instead. This is by design -- the Zen of Python says "there should be one obvious way to do it."',
            codeHighlightLines: [6, 9, 12, 15, 18, 21],
          },
          {
            heading: 'Identity and Membership Operators',
            content:
              'Python gives you two categories of operators that most other languages lack, and understanding them is crucial for writing correct code. Identity operators (`is` and `is not`) check whether two variables point to the *exact same object in memory*, not just whether they have the same value. Think of it like this: two people might both have a copy of "Harry Potter" (`==`), but they\'re not holding the *same physical book* (`is`). This distinction matters because you can have two lists with identical contents that are still different objects. Membership operators (`in` and `not in`) check whether a value exists within a collection -- a list, tuple, string, set, or dictionary. When used with dictionaries, `in` checks the *keys*, not the values. The most important rule to remember: always use `is` (not `==`) when checking for `None`. It\'s not just a style preference -- it\'s a PEP 8 guideline, it\'s faster, and it avoids subtle bugs with objects that override the `==` operator.',
            code: `# Identity operators: is vs ==
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)       # True  — same value
print(a is b)       # False — different objects
print(a is c)       # True  — same object

# Always use 'is' for None checks
value = None
print(value is None)
print(value is not None)

# Membership operators
fruits = ["apple", "banana", "cherry"]
print("banana" in fruits)
print("grape" not in fruits)

# Membership in strings
message = "Hello, World!"
print("World" in message)

# Membership in dictionaries (checks keys)
user = {"name": "Alice", "age": 30}
print("name" in user)
print("email" in user)`,
            output: `True
False
True
True
False
True
True
True
True
False`,
            tip: 'Always use "is None" and "is not None" instead of "== None". The is operator is faster for None checks and is the recommended Python convention (PEP 8).',
            warning: 'Never use `is` to compare integers or strings in general. Python caches small integers (-5 to 256) and some strings, so `a = 256; b = 256; a is b` might be `True`, but `a = 257; b = 257; a is b` might be `False`. This is an implementation detail you should never rely on. Use `==` for value comparison.',
            analogy: 'Think of `is` vs `==` like identical twins. Two twins may look exactly the same (`==` returns True), but they are still two separate people (`is` returns False). Only when two variables reference the exact same object in memory does `is` return True.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  { label: 'a', address: '0x1A', value: '[1, 2, 3]' },
                  { label: 'b', address: '0x2B', value: '[1, 2, 3]' },
                  { label: 'c', address: '0x1A', value: '(same as a)' },
                ],
              },
              caption: 'a and b have equal values but different memory addresses; c points to the same object as a',
            },
          },
        ],
        quiz: [
          {
            question: 'What does the // operator do in Python?',
            options: ['Regular division', 'Floor division (rounds down toward negative infinity)', 'Integer division (truncates toward zero)', 'Modulo operation'],
            correctIndex: 1,
            explanation: 'The // operator performs floor division, which always rounds down toward negative infinity. So 7 // 2 gives 3, and -7 // 2 gives -4.',
          },
          {
            question: 'What is the result of "10 < x < 20" when x = 15 in Python?',
            options: ['SyntaxError', 'True', 'False', 'TypeError'],
            correctIndex: 1,
            explanation: 'Python supports chained comparisons. "10 < x < 20" is equivalent to "10 < x and x < 20", which evaluates to True when x is 15.',
          },
          {
            question: 'What does the expression `name = "" or "Anonymous"` assign to name?',
            options: ['An empty string ""', '"Anonymous"', 'True', 'None'],
            correctIndex: 1,
            explanation: 'Python\'s or operator returns the first truthy value. Since an empty string is falsy, Python evaluates the second operand and returns "Anonymous".',
          },
          {
            question: 'When should you use "is" instead of "==" in Python?',
            options: ['Always for string comparisons', 'When checking if a value is None', 'When comparing integers', 'When comparing lists'],
            correctIndex: 1,
            explanation: 'The "is" operator checks identity (same object in memory), not equality. PEP 8 recommends always using "is" for None checks: "if x is None" rather than "if x == None".',
          },
        ],
        challenge: {
          prompt: 'Write a program that takes a total number of seconds (e.g., 90061) and converts it to days, hours, minutes, and seconds using floor division (//) and modulo (%) operators. Print the result in the format: "X days, Y hours, Z minutes, W seconds".',
          starterCode: `total_seconds = 90061\n\n# Convert to days, hours, minutes, seconds\n# Hint: there are 86400 seconds in a day, 3600 in an hour, 60 in a minute\n\ndays = # your code here\nhours = # your code here\nminutes = # your code here\nseconds = # your code here\n\nprint(f"{days} days, {hours} hours, {minutes} minutes, {seconds} seconds")`,
          solutionCode: `total_seconds = 90061\n\n# Convert to days, hours, minutes, seconds\ndays = total_seconds // 86400\nremaining = total_seconds % 86400\nhours = remaining // 3600\nremaining = remaining % 3600\nminutes = remaining // 60\nseconds = remaining % 60\n\nprint(f"{days} days, {hours} hours, {minutes} minutes, {seconds} seconds")`,
          hints: [
            'Start by dividing by the largest unit (86400 seconds in a day) and work your way down.',
            'Use % to get the remaining seconds after extracting each unit.',
            'The pattern is: extract the unit with //, get the remainder with %, then repeat for the next smaller unit.',
          ],
        },
      },
    ],
  },
  /* ------------------------------------------------------------ */
  /*  Data Structures                                              */
  /* ------------------------------------------------------------ */
  {
    id: 'data-structures',
    label: 'Data Structures',
    icon: 'Database',
    entries: [
      {
        id: 'numbers',
        title: 'Numbers',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Integer and Float Types',
            content:
              'Let\'s start with the foundation of almost every program: numbers. Python has three built-in numeric types, but the two you\'ll use constantly are `int` (integers, or whole numbers) and `float` (decimal numbers). Here\'s something that makes Python genuinely special: integers have *no size limit*. In languages like C or Java, an integer can overflow if it gets too big. In Python? You can calculate `10 ** 20` or even `10 ** 1000` and it just works. Python handles arbitrarily large numbers behind the scenes. Floats, on the other hand, use the standard 64-bit IEEE 754 format, giving you about 15-17 digits of precision -- more than enough for most applications. A nice readability feature: you can use underscores in numeric literals as visual separators, turning `7900000000` into `7_900_000_000`. Python ignores the underscores entirely, but your eyes will thank you.',
            code: `# Integers — unlimited precision
small = 42
big = 10 ** 20
print(f"Small: {small}")
print(f"Big:   {big}")
print(f"Type:  {type(small)}")

# Floats — decimal numbers
pi = 3.14159
temperature = -40.0
scientific = 2.5e6   # 2.5 * 10^6
print(f"Pi:    {pi}")
print(f"Temp:  {temperature}")
print(f"Sci:   {scientific}")
print(f"Type:  {type(pi)}")

# Readable large numbers with underscores
population = 7_900_000_000
budget = 1_250_000.50
print(f"Population: {population:,}")
print(f"Budget:     \${budget:,.2f}")`,
            output: `Small: 42
Big:   100000000000000000000
Type:  <class 'int'>
Pi:    3.14159
Temp:  -40.0
Sci:   2500000.0
Type:  <class 'float'>
Population: 7,900,000,000
Budget:     $1,250,000.50`,
            tip: 'Python integers have no maximum size! Unlike C or Java where integers overflow, Python automatically handles arbitrarily large numbers.',
            warning: 'Floats can\'t represent every decimal number perfectly. For example, `0.1 + 0.2` gives `0.30000000000000004`, not `0.3`. This isn\'t a Python bug -- it\'s how all floating-point math works on computers. For financial calculations where exact precision matters, use the `decimal` module.',
            analogy: 'Think of an int like a number line that stretches infinitely in both directions -- Python will never tell you a number is "too big." A float, on the other hand, is like a ruler with tiny tick marks: it can measure most things accurately, but some measurements fall between the ticks.',
          },
          {
            heading: 'Complex Numbers and Type Conversion',
            content:
              'Python has built-in support for complex numbers (numbers with a real and imaginary part), which you might recognize from math class. You create them using the `j` suffix for the imaginary part: `3 + 4j`. They have `.real` and `.imag` attributes for accessing each component, a `.conjugate()` method, and `abs()` gives you the magnitude. You\'ll encounter complex numbers in scientific computing, signal processing, and electrical engineering -- but most developers rarely need them. What you *will* use constantly is type conversion. Python makes it easy to switch between numeric types: `int()` converts to integer (and *truncates* -- it always rounds toward zero, not to the nearest number), `float()` converts to floating-point, and `complex()` creates a complex number. These same functions also parse strings into numbers, which is essential when you\'re reading user input, processing CSV files, or handling API responses.',
            code: `# Complex numbers
z = 3 + 4j
print(f"Complex: {z}")
print(f"Real part: {z.real}")
print(f"Imaginary part: {z.imag}")
print(f"Conjugate: {z.conjugate()}")
print(f"Magnitude: {abs(z)}")

# Type conversion
print(int(3.9))        # Truncates to 3
print(float(42))       # 42.0
print(complex(5, 3))   # (5+3j)

# String to number
age = int("25")
price = float("19.99")
print(f"Age: {age}, Price: {price}")

# Check numeric types
print(isinstance(42, int))
print(isinstance(3.14, float))`,
            output: `Complex: (3+4j)
Real part: 3.0
Imaginary part: 4.0
Conjugate: (3-4j)
Magnitude: 5.0
3
42.0
(5+3j)
Age: 25, Price: 19.99
True
True`,
            warning: '`int()` truncates toward zero, it does NOT round. So `int(3.9)` gives `3` and `int(-3.9)` gives `-3`. If you want actual rounding, use `round()` instead. And `int("3.9")` will raise a `ValueError` -- you need `int(float("3.9"))` to convert a decimal string to an integer.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n  A["str: \\"25\\""] -->|"int()"| B["int: 25"]\n  B -->|"float()"| C["float: 25.0"]\n  C -->|"int()"| B\n  A2["str: \\"3.14\\""] -->|"float()"| C2["float: 3.14"]\n  C2 -->|"int()\\ntruncates"| B2["int: 3"]',
              caption: 'Type conversion paths between str, int, and float',
            },
            codeHighlightLines: [10, 11, 12, 15, 16],
          },
          {
            heading: 'Math Operations',
            content:
              'Python gives you two layers of math power. First, there are built-in functions that are available everywhere without any imports: `abs()` for absolute value, `round()` for rounding (with optional decimal places), `pow()` for exponentiation, `min()` and `max()` for finding extremes in any collection, and `sum()` for adding up all elements of an iterable. Then there\'s the `math` module, which you unlock with `import math`, giving you square roots (`math.sqrt`), factorials (`math.factorial`), floor and ceiling operations (`math.floor` and `math.ceil`), logarithms, trigonometry functions, and essential constants like `math.pi` and `math.e`. For most everyday math, these built-in tools are all you need. When you graduate to heavy numerical work -- matrix operations, statistical analysis, or processing millions of data points -- that\'s when you\'ll reach for NumPy, which provides blazingly fast array operations built on optimized C code.',
            code: `import math

# Built-in math functions
print(abs(-15))           # 15
print(round(3.7))         # 4
print(round(3.14159, 2))  # 3.14
print(pow(2, 8))          # 256
print(min(4, 1, 7, 2))    # 1
print(max(4, 1, 7, 2))    # 7

# Math module functions
print(math.sqrt(144))     # 12.0
print(math.factorial(6))  # 720
print(math.floor(3.9))    # 3
print(math.ceil(3.1))     # 4
print(math.log2(1024))    # 10.0

# Constants
print(f"Pi: {math.pi:.6f}")
print(f"e:  {math.e:.6f}")`,
            output: `15
4
3.14
256
1
7
12.0
720
3
4
10.0
Pi: 3.141593
e:  2.718282`,
            tip: 'Be careful with floating-point comparisons! Due to precision limitations, 0.1 + 0.2 != 0.3 in Python. Use math.isclose(0.1 + 0.2, 0.3) for reliable float comparisons.',
            note: '`round()` uses "banker\'s rounding" (round half to even) by default. So `round(0.5)` gives `0`, not `1`, and `round(1.5)` gives `2`. This minimizes cumulative rounding bias in financial and statistical calculations, but it surprises many beginners who expect the "always round up on .5" rule from school.',
          },
        ],
        quiz: [
          {
            question: 'What is special about Python integers compared to most other languages?',
            options: ['They are always 32-bit', 'They have no size limit (unlimited precision)', 'They are always positive', 'They are stored as strings internally'],
            correctIndex: 1,
            explanation: 'Python integers have unlimited precision -- they can be arbitrarily large without overflowing, unlike languages like C or Java that have fixed-size integers.',
          },
          {
            question: 'What does int(3.9) return in Python?',
            options: ['4', '3', '3.0', 'Error'],
            correctIndex: 1,
            explanation: 'int() truncates toward zero, it does NOT round. So int(3.9) gives 3 and int(-3.9) gives -3. Use round() if you want actual rounding.',
          },
          {
            question: 'Why does 0.1 + 0.2 not equal 0.3 in Python?',
            options: ['It is a Python bug', 'Python uses integer math by default', 'Floating-point numbers cannot represent all decimals exactly (IEEE 754)', 'Python rounds all float operations'],
            correctIndex: 2,
            explanation: 'This is how all floating-point math works on computers using the IEEE 754 standard. Some decimal numbers cannot be represented exactly in binary, leading to tiny precision errors.',
          },
        ],
        challenge: {
          prompt: 'Write a program that acts as a simple unit converter. Given a distance in miles, convert it to kilometers, meters, and centimeters. Use appropriate numeric types and display results formatted to 2 decimal places. (1 mile = 1.60934 km)',
          starterCode: `miles = 26.2  # Marathon distance\n\n# Convert to different units\n# 1 mile = 1.60934 kilometers\n# 1 kilometer = 1000 meters\n# 1 meter = 100 centimeters\n\nkm = # your code\nmeters = # your code\ncm = # your code\n\nprint(f"Distance: {miles} miles")\nprint(f"  = {km:.2f} kilometers")\nprint(f"  = {meters:.2f} meters")\nprint(f"  = {cm:.2f} centimeters")`,
          solutionCode: `miles = 26.2  # Marathon distance\n\n# Convert to different units\nkm = miles * 1.60934\nmeters = km * 1000\ncm = meters * 100\n\nprint(f"Distance: {miles} miles")\nprint(f"  = {km:.2f} kilometers")\nprint(f"  = {meters:.2f} meters")\nprint(f"  = {cm:.2f} centimeters")`,
          hints: [
            'Multiply miles by 1.60934 to get kilometers.',
            'Each subsequent conversion multiplies by a power of 10: km * 1000 = meters, meters * 100 = cm.',
          ],
        },
      },
      {
        id: 'list',
        title: 'List',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Creating and Accessing Lists',
            content:
              'Think of a Python list like a playlist on Spotify -- you can add songs, remove them, rearrange the order, and even mix different genres together. A `list` is the most commonly used data structure in Python: an ordered, mutable collection that can hold elements of any type, including a mix of types in the same list. You create lists with square brackets `[]`, and access elements by their *index* (position number). Here\'s the catch that trips up every beginner: indexing starts at 0, not 1. So the first element is at index `0`, the second at index `1`, and so on. Python also supports negative indexing, which is genuinely brilliant: `[-1]` gives you the last element, `[-2]` the second-to-last, and so on. No more writing `my_list[len(my_list) - 1]` like you would in some other languages. Use `len()` to check how many elements a list contains, and the `in` operator to check if something exists in the list.',
            code: `# Creating lists
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [42, "hello", True, 3.14]
empty = []

# Accessing elements by index
print(fruits[0])     # First element
print(fruits[2])     # Third element
print(fruits[-1])    # Last element
print(fruits[-2])    # Second to last

# Length of a list
print(f"Fruits count: {len(fruits)}")
print(f"Empty list length: {len(empty)}")

# Check if element exists
print("banana" in fruits)
print("grape" in fruits)`,
            output: `apple
cherry
cherry
banana
Fruits count: 3
Empty list length: 0
True
False`,
            warning: 'Accessing an index that doesn\'t exist raises an `IndexError`. If your list has 3 items, valid indices are 0, 1, 2 (or -1, -2, -3). Using index 3 will crash your program. Always check `len()` when the list size is unknown, or use try/except.',
            note: 'Lists are stored as references, not copies. If you write `b = a` where `a` is a list, both `a` and `b` point to the exact same list in memory. Changing one changes the other! To make an independent copy, use `b = a.copy()` or `b = a[:]`.',
            analogy: 'Think of a list like a row of numbered lockers. Locker 0 is the first one, locker 1 is the second, and so on. You can open any locker by its number, swap what is inside, or even add more lockers to the end of the row.',
            diagram: {
              kind: 'custom',
              type: 'array',
              data: {
                values: ['"apple"', '"banana"', '"cherry"'],
                highlightIndices: [0, 2],
                labels: ['index 0', 'index 1', 'index 2'],
                negativeLabels: ['index -3', 'index -2', 'index -1'],
              },
              caption: 'List indexing: positive indices count from the start, negative indices count from the end',
            },
            codeHighlightLines: [8, 10],
          },
          {
            heading: 'Modifying Lists',
            content:
              'Since lists are mutable (changeable), Python gives you a rich set of tools for modifying them. You can update any element by assigning to its index. To add elements, you have three options: `append()` adds one item to the end (by far the most common), `insert()` puts an item at a specific position, and `extend()` adds multiple items from another iterable. For removing elements, you have `remove()` (finds and removes by value -- raises `ValueError` if not found), `pop()` (removes by index and *returns* the removed value -- defaults to the last element), and `del` (removes by index or slice without returning). You can also combine lists with `+` (concatenation) and repeat them with `*`. A practical mental model: `append()` is like adding a song to the end of your playlist, `insert()` is like putting a song at a specific position, and `pop()` is like removing a song and seeing what it was.',
            code: `# Modifying elements
colors = ["red", "green", "blue"]
colors[1] = "yellow"
print(colors)

# Adding elements
colors.append("purple")
print(colors)

colors.insert(0, "white")
print(colors)

# Removing elements
colors.remove("blue")
print(colors)

popped = colors.pop()
print(f"Popped: {popped}")
print(colors)

# List concatenation and repetition
a = [1, 2]
b = [3, 4]
print(a + b)
print(a * 3)`,
            output: `['red', 'yellow', 'blue']
['red', 'yellow', 'blue', 'purple']
['white', 'red', 'yellow', 'blue', 'purple']
['white', 'red', 'yellow', 'purple']
Popped: purple
['white', 'red', 'yellow']
[1, 2, 3, 4]
[1, 2, 1, 2, 1, 2]`,
            tip: 'Use `append()` to add a single item and `extend()` to add multiple items. A common mistake is using `append()` with a list: `a.append([3, 4])` gives `[1, 2, [3, 4]]` (a nested list), while `a.extend([3, 4])` gives `[1, 2, 3, 4]` (a flat list). Know the difference!',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n  subgraph "append(x)"\n    A1["[a, b, c]"] --> A2["[a, b, c, x]"]\n  end\n  subgraph "insert(1, x)"\n    B1["[a, b, c]"] --> B2["[a, x, b, c]"]\n  end\n  subgraph "pop()"\n    C1["[a, b, c]"] --> C2["[a, b]"]\n    C1 --> C3["returns c"]\n  end',
              caption: 'Common list mutation methods: append, insert, and pop',
            },
          },
        ],
        quiz: [
          {
            question: 'What is the result of fruits[-1] if fruits = ["apple", "banana", "cherry"]?',
            options: ['"apple"', '"banana"', '"cherry"', 'IndexError'],
            correctIndex: 2,
            explanation: 'Negative indexing counts from the end. -1 refers to the last element, so fruits[-1] returns "cherry".',
          },
          {
            question: 'What is the difference between append() and extend()?',
            options: ['They are identical', 'append() adds a single item; extend() adds multiple items from an iterable', 'extend() adds a single item; append() adds multiple items', 'append() creates a copy; extend() modifies in place'],
            correctIndex: 1,
            explanation: 'append() adds one item to the end of the list. extend() takes an iterable and adds each of its elements. a.append([3,4]) gives [1,2,[3,4]] while a.extend([3,4]) gives [1,2,3,4].',
          },
          {
            question: 'What does pop() do when called without arguments?',
            options: ['Removes the first element', 'Removes the last element and returns it', 'Removes all elements', 'Raises an error'],
            correctIndex: 1,
            explanation: 'pop() without arguments removes and returns the last element of the list. You can also pass an index to pop a specific element: list.pop(0) removes the first element.',
          },
        ],
        challenge: {
          prompt: 'Write a program that manages a todo list. Start with 3 initial tasks, then: (1) add two more tasks at the end, (2) insert an urgent task at the beginning, (3) remove a completed task by name, (4) pop the last task and print what it was, and (5) print the final list with the count of remaining tasks.',
          starterCode: `# Start with initial tasks\ntodos = ["Buy groceries", "Clean house", "Read book"]\nprint("Initial:", todos)\n\n# 1. Add two more tasks\n\n# 2. Insert an urgent task at the beginning\n\n# 3. Remove "Clean house" (it's done!)\n\n# 4. Pop the last task and print what it was\n\n# 5. Print final list with count\nprint(f"Final ({len(todos)} tasks): {todos}")`,
          solutionCode: `# Start with initial tasks\ntodos = ["Buy groceries", "Clean house", "Read book"]\nprint("Initial:", todos)\n\n# 1. Add two more tasks\ntodos.append("Exercise")\ntodos.append("Call mom")\n\n# 2. Insert an urgent task at the beginning\ntodos.insert(0, "URGENT: Fix bug")\n\n# 3. Remove "Clean house" (it's done!)\ntodos.remove("Clean house")\n\n# 4. Pop the last task and print what it was\nlast = todos.pop()\nprint(f"Popped: {last}")\n\n# 5. Print final list with count\nprint(f"Final ({len(todos)} tasks): {todos}")`,
          hints: [
            'Use append() to add items to the end and insert(0, item) to add at the beginning.',
            'Use remove() to delete by value and pop() to remove the last item and get its value.',
            'len() gives you the number of items currently in the list.',
          ],
        },
      },
      {
        id: 'nested-list',
        title: 'Nested List',
        difficulty: 'intermediate',
        sections: [
          {
            heading: 'Creating and Accessing Nested Lists',
            content:
              'A nested list is simply a list that contains other lists as elements -- think of it like a spreadsheet, where each inner list is a row of data. This lets you represent grids, matrices, game boards, tables, and any two-dimensional data structure. To access an element in a nested list, you chain two index operators: the first picks the row (the inner list), and the second picks the element within that row. So `matrix[1][2]` means "go to row 1, then grab element 2 within that row." The inner lists don\'t have to be the same length -- these are called jagged arrays, and they\'re useful for representing things like students with varying numbers of test scores. You can nest lists as deeply as you want (lists within lists within lists), but beyond two or three levels, your code can become hard to read. At that point, consider using classes or dictionaries to give structure to your data.',
            code: `# A 2D matrix (list of lists)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Access individual elements
print(matrix[0])       # First row
print(matrix[1][2])    # Row 1, Column 2
print(matrix[2][0])    # Row 2, Column 0

# Jagged list (inner lists of different lengths)
jagged = [
    [1, 2],
    [3, 4, 5, 6],
    [7]
]
for row in jagged:
    print(row)`,
            output: `[1, 2, 3]
6
7
[1, 2]
[3, 4, 5, 6]
[7]`,
            note: 'Nested lists are how Python represents matrices before you bring in libraries like NumPy. If you\'re doing serious mathematical operations (matrix multiplication, element-wise operations, etc.), NumPy arrays are dramatically faster and more convenient. But for small grids, game boards, or simple tables, nested lists work perfectly.',
            analogy: 'Think of a nested list like a bookshelf. The outer list is the shelf itself, each inner list is a row of books, and indexing with two brackets is like saying "go to row 2, then pick the 3rd book from the left."',
            diagram: {
              kind: 'custom',
              type: 'array',
              data: {
                values: [
                  '[1, 2, 3]  <- matrix[0]',
                  '[4, 5, 6]  <- matrix[1]',
                  '[7, 8, 9]  <- matrix[2]',
                ],
                highlightIndices: [1],
                detail: 'matrix[1][2] = 6',
              },
              caption: 'A 3x3 matrix as nested lists: matrix[row][col]',
            },
            codeHighlightLines: [10, 11],
          },
          {
            heading: 'Iterating and Modifying Nested Lists',
            content:
              'Working with nested lists usually means nested loops: the outer loop walks through the rows, and the inner loop walks through the elements in each row. Using `enumerate()` is especially helpful here because it gives you both the index and the value, letting you know exactly where you are in the grid. Modifying elements works just like you\'d expect -- chain the indices and assign. But here is the single most common bug that bites Python developers working with nested lists: creating a grid using `[[0] * cols] * rows`. This looks right, but it\'s a trap. The `*` operator creates multiple references to the *same* inner list, so changing one row changes ALL of them. Always use a list comprehension `[[0 for _ in range(cols)] for _ in range(rows)]` to create independent rows. This is such a common pitfall that it shows up in job interviews.',
            code: `# Iterating over a matrix
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Print all elements with position
for i, row in enumerate(matrix):
    for j, val in enumerate(row):
        print(f"matrix[{i}][{j}] = {val}")

# Modify a nested element
matrix[1][1] = 99
print(f"Modified center: {matrix[1]}")

# CORRECT way to create a 3x3 grid of zeros
grid = [[0 for _ in range(3)] for _ in range(3)]
grid[0][0] = 1
print("Row 0:", grid[0])
print("Row 1:", grid[1])`,
            output: `matrix[0][0] = 1
matrix[0][1] = 2
matrix[0][2] = 3
matrix[1][0] = 4
matrix[1][1] = 5
matrix[1][2] = 6
matrix[2][0] = 7
matrix[2][1] = 8
matrix[2][2] = 9
Modified center: [4, 99, 6]
Row 0: [1, 0, 0]
Row 1: [0, 0, 0]`,
            tip: 'Never use [[0] * n] * m to create a 2D list! All rows will be the same object. Use [[0] * n for _ in range(m)] instead to create independent rows.',
            warning: 'This bug is sneaky because `[[0] * 3] * 3` *looks* correct when you print it -- you see `[[0,0,0], [0,0,0], [0,0,0]]`. The problem only appears when you modify one row and discover all rows changed. Test it yourself: `grid = [[0]*3]*3; grid[0][0] = 1; print(grid)` -- you\'ll see the 1 appear in every row.',
          },
        ],
        quiz: [
          {
            question: 'How do you access the element at row 1, column 2 in a nested list called matrix?',
            options: ['matrix[2][1]', 'matrix[1, 2]', 'matrix[1][2]', 'matrix(1)(2)'],
            correctIndex: 2,
            explanation: 'You chain index operators: matrix[1] gets the second row (a list), then [2] gets the third element within that row.',
          },
          {
            question: 'What is wrong with creating a 3x3 grid using [[0] * 3] * 3?',
            options: ['It raises a SyntaxError', 'It creates a 1D list instead of 2D', 'All three rows reference the same list object, so changing one row changes all', 'It only works in Python 2'],
            correctIndex: 2,
            explanation: 'The * operator creates multiple references to the SAME inner list. Modifying one row will change all rows because they are the same object in memory.',
          },
          {
            question: 'What is the correct way to create independent rows in a 2D list?',
            options: ['[[0] * 3] * 3', '[[0 for _ in range(3)] for _ in range(3)]', 'list([0, 0, 0]) * 3', 'array(3, 3)'],
            correctIndex: 1,
            explanation: 'A list comprehension [[0 for _ in range(cols)] for _ in range(rows)] creates a new inner list for each row, ensuring they are independent objects.',
          },
        ],
        challenge: {
          prompt: 'Create a 4x4 identity matrix (a matrix with 1s on the diagonal and 0s everywhere else) using a nested list comprehension. Then print each row on its own line.',
          starterCode: `# Create a 4x4 identity matrix\n# Hint: element is 1 when row index equals column index, 0 otherwise\n\nidentity = # your code here\n\n# Print the matrix\nfor row in identity:\n    print(row)`,
          solutionCode: `# Create a 4x4 identity matrix\nidentity = [[1 if i == j else 0 for j in range(4)] for i in range(4)]\n\n# Print the matrix\nfor row in identity:\n    print(row)`,
          hints: [
            'Use a nested list comprehension: the outer loop iterates over rows (i), the inner loop over columns (j).',
            'An identity matrix has 1 where the row index equals the column index (i == j), and 0 everywhere else.',
            'Use a conditional expression: 1 if i == j else 0.',
          ],
        },
      },
      {
        id: 'list-slicing',
        title: 'List Slicing',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Slice Syntax',
            content:
              'Slicing is one of Python\'s superpowers -- it lets you grab a chunk of a list in a single, clean expression. The syntax is `list[start:stop:step]`. Here\'s how to think about it: `start` is where you begin (inclusive, defaults to 0), `stop` is where you end (exclusive -- this is the part that confuses everyone at first), and `step` is how many positions you jump between elements (defaults to 1). The "exclusive stop" design actually makes life easier once you\'re used to it: `numbers[:4]` gives you exactly 4 elements, and `numbers[4:]` gives you everything after those 4 -- no off-by-one errors when splitting lists. Slicing always returns a brand new list, leaving the original untouched. And here\'s a beautiful property: `numbers[:n] + numbers[n:]` always equals the original list, for any valid `n`. That\'s the elegance of exclusive stop bounds at work.',
            code: `numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Basic slicing [start:stop]
print(numbers[2:5])     # Elements at index 2, 3, 4
print(numbers[:4])      # First 4 elements
print(numbers[6:])      # From index 6 to end
print(numbers[:])       # Complete copy

# With step [start:stop:step]
print(numbers[0:10:2])  # Every other element
print(numbers[1:10:3])  # Every third, starting at 1

# Length of the original is unchanged
print(f"Original: {numbers}")`,
            output: `[2, 3, 4]
[0, 1, 2, 3]
[6, 7, 8, 9]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[0, 2, 4, 6, 8]
[1, 4, 7]
Original: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`,
            tip: 'The slice list[:] creates a shallow copy of the entire list. This is equivalent to list.copy() and useful for making a copy you can modify independently.',
            note: 'Unlike direct indexing (e.g., `numbers[10]` on a 10-element list), slicing never raises an `IndexError`. Out-of-range slice indices are silently clamped to the list boundaries. So `numbers[5:100]` just returns from index 5 to the end, even if 100 is way past the end. This makes slicing very forgiving.',
            analogy: 'Think of slicing like cutting a piece of ribbon. You mark where to start cutting (start) and where to stop (stop). The original ribbon stays intact, and you get a brand new piece. The stop mark itself is not included in your cut -- you cut just before it.',
            diagram: {
              kind: 'custom',
              type: 'array',
              data: {
                values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                highlightIndices: [2, 3, 4],
                sliceLabel: 'numbers[2:5]',
              },
              caption: 'Slice [2:5] selects indices 2, 3, 4 (start inclusive, stop exclusive)',
            },
            codeHighlightLines: [4, 5, 6],
          },
          {
            heading: 'Negative Indices and Reversing',
            content:
              'Negative indices in slicing are one of those features that feel magical once they click. Instead of counting from the front, negative indices count backward from the end: `-1` is the last element, `-2` is the second-to-last, and so on. This lets you write expressions like `letters[-3:]` to grab the last 3 elements, or `letters[:-2]` to get everything except the last 2 -- no need to know the exact length of the list. The most famous slice in Python is `[::-1]`, which reverses a list (or string) by stepping backward through the entire sequence. It\'s concise, readable, and Pythonic. You can also assign to a slice, which replaces that portion of the list -- and the replacement doesn\'t even need to be the same length, which effectively lets you insert, replace, or delete chunks of a list in a single operation.',
            code: `letters = ["a", "b", "c", "d", "e", "f", "g"]

# Negative indices
print(letters[-3:])       # Last 3 elements
print(letters[:-2])       # All except last 2
print(letters[-4:-1])     # From 4th-last to 2nd-last

# Reversing with negative step
print(letters[::-1])      # Reverse the entire list
print(letters[5:1:-1])    # Reverse from index 5 to 2

# Practical: check if a list is a palindrome
nums = [1, 2, 3, 2, 1]
is_palindrome = nums == nums[::-1]
print(f"{nums} is palindrome: {is_palindrome}")

# Slice assignment (modifying multiple elements)
colors = ["red", "green", "blue", "yellow"]
colors[1:3] = ["white", "black", "gray"]
print(colors)`,
            output: `['e', 'f', 'g']
['a', 'b', 'c', 'd', 'e']
['d', 'e', 'f']
['g', 'f', 'e', 'd', 'c', 'b', 'a']
['f', 'e', 'd', 'c']
[1, 2, 3, 2, 1] is palindrome: True
['red', 'white', 'black', 'gray', 'yellow']`,
            tip: 'Slice assignment is incredibly powerful. You can delete elements with `a[1:3] = []`, insert without replacing with `a[1:1] = ["new"]`, or replace a section with a different number of elements. It\'s like having `insert`, `delete`, and `replace` combined into one operation.',
          },
        ],
        quiz: [
          {
            question: 'What does numbers[2:5] return if numbers = [0, 1, 2, 3, 4, 5, 6]?',
            options: ['[2, 3, 4, 5]', '[2, 3, 4]', '[1, 2, 3, 4]', '[3, 4, 5]'],
            correctIndex: 1,
            explanation: 'Slicing uses inclusive start, exclusive stop. numbers[2:5] gives elements at indices 2, 3, and 4, which are [2, 3, 4].',
          },
          {
            question: 'What does the slice [::-1] do?',
            options: ['Returns the first element', 'Returns an empty list', 'Reverses the list/string', 'Removes the last element'],
            correctIndex: 2,
            explanation: '[::-1] steps backward through the entire sequence with a step of -1, effectively reversing it. This works on both lists and strings.',
          },
          {
            question: 'What happens if you use an out-of-range index in a slice like numbers[5:100]?',
            options: ['IndexError is raised', 'Returns None', 'The out-of-range index is silently clamped to the list boundary', 'Returns an empty list'],
            correctIndex: 2,
            explanation: 'Unlike direct indexing, slicing never raises IndexError. Out-of-range indices are silently clamped to the boundaries of the sequence.',
          },
          {
            question: 'What does numbers[-3:] return if numbers = [10, 20, 30, 40, 50]?',
            options: ['[10, 20, 30]', '[30, 40, 50]', '[40, 50]', '[30, 40]'],
            correctIndex: 1,
            explanation: 'Negative indices count from the end. -3 refers to the third element from the end (30), and the missing stop means "go to the end". So numbers[-3:] gives [30, 40, 50].',
          },
        ],
        challenge: {
          prompt: 'Given a list of numbers from 1 to 20, use slicing to: (1) get the first 5 elements, (2) get the last 3 elements, (3) get every third element, (4) get the elements in reverse order, and (5) check if the list [1,2,3,2,1] is a palindrome using slicing.',
          starterCode: `numbers = list(range(1, 21))\nprint("Full list:", numbers)\n\n# 1. First 5 elements\nfirst_five = # your code\nprint("First 5:", first_five)\n\n# 2. Last 3 elements\nlast_three = # your code\nprint("Last 3:", last_three)\n\n# 3. Every third element\nevery_third = # your code\nprint("Every 3rd:", every_third)\n\n# 4. Reversed\nreversed_list = # your code\nprint("Reversed:", reversed_list)\n\n# 5. Palindrome check\ntest = [1, 2, 3, 2, 1]\nis_palindrome = # your code\nprint(f"{test} is palindrome: {is_palindrome}")`,
          solutionCode: `numbers = list(range(1, 21))\nprint("Full list:", numbers)\n\n# 1. First 5 elements\nfirst_five = numbers[:5]\nprint("First 5:", first_five)\n\n# 2. Last 3 elements\nlast_three = numbers[-3:]\nprint("Last 3:", last_three)\n\n# 3. Every third element\nevery_third = numbers[::3]\nprint("Every 3rd:", every_third)\n\n# 4. Reversed\nreversed_list = numbers[::-1]\nprint("Reversed:", reversed_list)\n\n# 5. Palindrome check\ntest = [1, 2, 3, 2, 1]\nis_palindrome = test == test[::-1]\nprint(f"{test} is palindrome: {is_palindrome}")`,
          hints: [
            'Use [:n] for the first n elements and [-n:] for the last n elements.',
            'Use [::step] to get every nth element and [::-1] to reverse.',
            'A palindrome reads the same forwards and backwards, so compare the list to its reverse.',
          ],
        },
      },
      {
        id: 'list-comprehension',
        title: 'List Comprehension',
        difficulty: 'intermediate',
        sections: [
          {
            heading: 'Basic List Comprehension',
            content:
              'If there\'s one feature that makes experienced Python developers smile, it\'s list comprehensions. They let you create a new list by describing what you want, rather than writing out the step-by-step instructions for building it. The syntax `[expression for item in iterable]` reads almost like English: "give me `expression` for each `item` in `iterable`." For example, `[x ** 2 for x in range(1, 6)]` says "give me x squared for each x from 1 to 5." Compare that to the equivalent four-line for loop, and you\'ll see why comprehensions are beloved. But they\'re not just about saving lines of code -- they\'re actually *faster* than equivalent for loops because Python optimizes them internally. List comprehensions are one of the most iconic, most Pythonic features of the language. You\'ll see them everywhere in professional Python code, so getting comfortable with them is essential.',
            code: `# Basic list comprehension
squares = [x ** 2 for x in range(1, 6)]
print(squares)

# Equivalent for loop (for comparison)
squares_loop = []
for x in range(1, 6):
    squares_loop.append(x ** 2)
print(squares_loop)

# Transforming strings
names = ["alice", "bob", "charlie"]
capitalized = [name.capitalize() for name in names]
print(capitalized)

# Converting types
str_nums = ["1", "2", "3", "4", "5"]
int_nums = [int(n) for n in str_nums]
print(int_nums)`,
            output: `[1, 4, 9, 16, 25]
[1, 4, 9, 16, 25]
['Alice', 'Bob', 'Charlie']
[1, 2, 3, 4, 5]`,
            tip: 'List comprehensions should be kept simple and readable. If the expression becomes complex or spans multiple lines, use a regular for loop instead.',
            warning: 'Don\'t overdo comprehensions. A comprehension that takes 3 minutes to decipher saves nobody any time. The Zen of Python says "Readability counts." If you find yourself nesting three comprehensions or cramming complex logic into one line, break it out into a normal for loop.',
            analogy: 'Think of a list comprehension like an assembly line in a factory. Raw materials (the iterable) go in one end, each item gets transformed by the same machine (the expression), and finished products come out the other end into a new box (the list).',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n  A["range(1, 6)\\n1, 2, 3, 4, 5"] -->|"for x in"| B["x ** 2"]\n  B --> C["[1, 4, 9, 16, 25]"]\n  style A fill:#e0f0ff\n  style C fill:#e0ffe0',
              caption: 'List comprehension: iterable -> expression -> new list',
            },
            codeHighlightLines: [2],
          },
          {
            heading: 'Comprehensions with Conditions',
            content:
              'List comprehensions become even more powerful when you add filtering conditions. There are two patterns to learn, and understanding the difference is key. Pattern one: `[expr for item in iterable if condition]` -- the trailing `if` acts as a *filter*. Only items where the condition is `True` make it into the final list, so you get fewer elements than you started with. Pattern two: `[expr_if_true if condition else expr_if_false for item in iterable]` -- the `if-else` goes *before* the `for` and acts as a *mapper*. Every item produces a result, but the result depends on the condition, so you get the same number of elements. The placement of `if` is the key: after `for` = filter, before `for` = conditional transform. Once this clicks, you\'ll find yourself reaching for comprehensions with conditions all the time -- filtering data, categorizing elements, cleaning up values, and more.',
            code: `# Filter: keep only even numbers
numbers = range(1, 11)
evens = [n for n in numbers if n % 2 == 0]
print(f"Evens: {evens}")

# Filter: keep strings longer than 3 characters
words = ["hi", "hello", "hey", "world", "ok"]
long_words = [w for w in words if len(w) > 3]
print(f"Long words: {long_words}")

# Conditional expression (if-else in output)
labels = ["even" if n % 2 == 0 else "odd" for n in range(1, 6)]
print(f"Labels: {labels}")

# Multiple conditions
nums = range(1, 31)
fizzbuzz = [n for n in nums if n % 3 == 0 and n % 5 == 0]
print(f"Divisible by 3 and 5: {fizzbuzz}")`,
            output: `Evens: [2, 4, 6, 8, 10]
Long words: ['hello', 'world']
Labels: ['odd', 'even', 'odd', 'even', 'odd']
Divisible by 3 and 5: [15, 30]`,
            note: 'You can also chain multiple `if` filters: `[x for x in range(100) if x % 2 == 0 if x % 3 == 0]` keeps numbers divisible by both 2 and 3. Though in practice, combining conditions with `and` is more common and more readable.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n  A["for n in range(1, 11)"] --> B{if n % 2 == 0?}\n  B -- Yes --> C["Include n\\nin result"]\n  B -- No --> D["Skip n"]\n  C --> E["[2, 4, 6, 8, 10]"]',
              caption: 'Filter pattern: trailing if after for skips non-matching items',
            },
          },
          {
            heading: 'Nested Comprehensions',
            content:
              'Nested comprehensions let you iterate over multiple sequences in a single expression, and they\'re incredibly useful for working with multi-dimensional data. The trick to reading them is knowing that the `for` clauses run in the same order as equivalent nested for loops -- the leftmost `for` is the outermost loop. So `[num for row in matrix for num in row]` means "for each row in the matrix, for each num in that row, give me num" -- which flattens a 2D list into 1D. You can also put a comprehension *inside* a comprehension to create 2D structures: `[[i*j for j in range(1,4)] for i in range(1,4)]` creates a multiplication table. The outer comprehension builds the rows, and the inner one builds each row\'s elements. A word of caution: nested comprehensions beyond two levels become genuinely hard to read. If you find yourself going three levels deep, refactor into regular loops or helper functions. Your future self will thank you.',
            code: `# Flatten a 2D list
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in matrix for num in row]
print(f"Flattened: {flat}")

# Generate coordinate pairs
coords = [(x, y) for x in range(3) for y in range(3)]
print(f"Coords: {coords}")

# Create a multiplication table
table = [[i * j for j in range(1, 4)] for i in range(1, 4)]
for row in table:
    print(row)

# Nested with condition
pairs = [(x, y) for x in range(5) for y in range(5) if x != y]
print(f"First 6 pairs: {pairs[:6]}")`,
            output: `Flattened: [1, 2, 3, 4, 5, 6, 7, 8, 9]
Coords: [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)]
[1, 2, 3]
[2, 4, 6]
[3, 6, 9]
First 6 pairs: [(0, 1), (0, 2), (0, 3), (0, 4), (1, 0), (1, 2)]`,
            tip: 'Read nested comprehensions from left to right like nested for loops. [expr for x in xs for y in ys] is the same as: for x in xs: for y in ys: result.append(expr)',
            warning: 'The flattening pattern `[item for sublist in list2d for item in sublist]` is one of the most commonly needed patterns, but its word order feels unnatural to many people. If it confuses you, there\'s no shame in writing `sum(matrix, [])` for simple flattening, or using `itertools.chain.from_iterable(matrix)` for a more readable alternative.',
          },
        ],
        quiz: [
          {
            question: 'What does [x ** 2 for x in range(1, 6)] produce?',
            options: ['[1, 2, 3, 4, 5]', '[1, 4, 9, 16, 25]', '[2, 4, 6, 8, 10]', '[0, 1, 4, 9, 16]'],
            correctIndex: 1,
            explanation: 'The list comprehension squares each value from range(1, 6), which generates 1, 2, 3, 4, 5. The result is [1, 4, 9, 16, 25].',
          },
          {
            question: 'In [n for n in numbers if n % 2 == 0], where does the if clause go?',
            options: ['Before the for clause to transform values', 'After the for clause to filter values', 'Inside the expression before for', 'It does not matter'],
            correctIndex: 1,
            explanation: 'A trailing if after for acts as a filter -- only items where the condition is True are included. An if-else before for acts as a conditional transform.',
          },
          {
            question: 'How do you flatten a 2D list [[1,2],[3,4],[5,6]] using a comprehension?',
            options: ['[row for row in matrix]', '[num for num in matrix for row in num]', '[num for row in matrix for num in row]', '[matrix[i][j] for i, j in matrix]'],
            correctIndex: 2,
            explanation: 'The correct pattern is [num for row in matrix for num in row]. Read it like nested for loops: for each row, for each num in that row, include num.',
          },
        ],
        challenge: {
          prompt: 'Using list comprehensions, write a program that: (1) generates a list of all even numbers from 1 to 50, (2) creates a list of their squares, (3) filters to keep only squares greater than 100, and (4) creates a FizzBuzz list for numbers 1-20 where multiples of 3 are "Fizz", multiples of 5 are "Buzz", multiples of both are "FizzBuzz", and others are the number itself.',
          starterCode: `# 1. Even numbers from 1 to 50\nevens = # your code\nprint("Evens:", evens)\n\n# 2. Squares of even numbers\nsquares = # your code\nprint("Squares:", squares)\n\n# 3. Filter squares > 100\nbig_squares = # your code\nprint("Big squares:", big_squares)\n\n# 4. FizzBuzz with comprehension\nfizzbuzz = # your code\nprint("FizzBuzz:", fizzbuzz)`,
          solutionCode: `# 1. Even numbers from 1 to 50\nevens = [n for n in range(1, 51) if n % 2 == 0]\nprint("Evens:", evens)\n\n# 2. Squares of even numbers\nsquares = [n ** 2 for n in evens]\nprint("Squares:", squares)\n\n# 3. Filter squares > 100\nbig_squares = [s for s in squares if s > 100]\nprint("Big squares:", big_squares)\n\n# 4. FizzBuzz with comprehension\nfizzbuzz = ["FizzBuzz" if n % 15 == 0 else "Fizz" if n % 3 == 0 else "Buzz" if n % 5 == 0 else n for n in range(1, 21)]\nprint("FizzBuzz:", fizzbuzz)`,
          hints: [
            'Use [n for n in range(1, 51) if n % 2 == 0] to filter even numbers.',
            'You can chain comprehensions -- use the output of one as input to another.',
            'For FizzBuzz, use conditional expressions (if-else) before the for clause to transform each value.',
          ],
        },
      },
      {
        id: 'tuple',
        title: 'Tuple',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Creating Tuples and Immutability',
            content:
              'If a list is like a playlist you can edit, a tuple is like a published album -- the tracklist is set and can\'t be changed. Tuples are ordered collections, just like lists, but they\'re *immutable*: once created, you cannot add, remove, or modify their elements. You create them with parentheses `()` (or just commas, technically -- the commas make the tuple, not the parentheses). So why would you ever choose a tuple over a list? Three big reasons. First, they signal intent: when you see a tuple, you know this data isn\'t meant to change. Second, because they\'re immutable, tuples can be used as dictionary keys and set elements -- lists can\'t. Third, they\'re slightly faster and use less memory than lists, which matters when you\'re working with millions of records. Use tuples for things that naturally come as fixed groups: coordinates `(x, y)`, RGB colors `(255, 128, 0)`, database rows, and function return values.',
            code: `# Creating tuples
point = (3, 4)
rgb = (255, 128, 0)
single = (42,)          # Note the comma for single-element tuple
empty = ()
from_list = tuple([1, 2, 3])

print(f"Point: {point}")
print(f"RGB:   {rgb}")
print(f"Single: {single}, type: {type(single)}")
print(f"Empty:  {empty}")
print(f"From list: {from_list}")

# Tuples are immutable
try:
    point[0] = 10
except TypeError as e:
    print(f"Error: {e}")

# Accessing elements (same as lists)
print(f"X coordinate: {point[0]}")
print(f"Last color: {rgb[-1]}")`,
            output: `Point: (3, 4)
RGB:   (255, 128, 0)
Single: (42,), type: <class 'tuple'>
Empty:  ()
From list: (1, 2, 3)
Error: 'tuple' object does not support item assignment
X coordinate: 3
Last color: 0`,
            tip: 'A single-element tuple requires a trailing comma: (42,). Without the comma, (42) is just an integer in parentheses. This is a common Python gotcha.',
            warning: 'While tuples themselves are immutable, they can contain mutable objects. `t = ([1, 2], [3, 4])` is a valid tuple, and you CAN modify the lists inside it: `t[0].append(3)` works. The tuple just prevents you from replacing `t[0]` entirely with a new object.',
            analogy: 'Think of a tuple like a sealed envelope with multiple items inside. You can look at the items through the window (read access), but you cannot open the envelope to swap, add, or remove anything (no mutation). Lists, on the other hand, are open boxes.',
          },
          {
            heading: 'Tuple Unpacking and Use Cases',
            content:
              'Tuple unpacking is one of Python\'s most elegant features, and once you learn it, you\'ll use it constantly. It lets you assign each element of a tuple to a separate variable in a single line: `x, y, z = (10, 20, 30)`. The number of variables must match the number of elements -- unless you use the star `*` operator to capture "the rest" into a list. This is incredibly useful: `first, *rest = (1, 2, 3, 4, 5)` gives `first = 1` and `rest = [2, 3, 4, 5]`. You can put the star on any position: `*beginning, last` grabs everything except the last element. Functions can return tuples to effectively return multiple values, which you then unpack at the call site: `lo, hi = min_max(numbers)`. You\'ve already seen tuple unpacking in action without realizing it -- the variable swap `a, b = b, a` works because the right side creates a tuple and the left side unpacks it. And `enumerate()`, which you use in for loops, returns tuples of `(index, value)` that you unpack as `for i, item in enumerate(list)`.',
            code: `# Basic unpacking
coordinates = (10, 20, 30)
x, y, z = coordinates
print(f"x={x}, y={y}, z={z}")

# Star unpacking
first, *rest = (1, 2, 3, 4, 5)
print(f"First: {first}, Rest: {rest}")

*beginning, last = (1, 2, 3, 4, 5)
print(f"Beginning: {beginning}, Last: {last}")

# Functions returning tuples
def min_max(numbers):
    return min(numbers), max(numbers)

lo, hi = min_max([5, 1, 8, 3, 9, 2])
print(f"Min: {lo}, Max: {hi}")

# Using tuples as dictionary keys
locations = {}
locations[(40.7128, -74.0060)] = "New York"
locations[(51.5074, -0.1278)] = "London"
for coord, city in locations.items():
    print(f"{city}: {coord}")`,
            output: `x=10, y=20, z=30
First: 1, Rest: [2, 3, 4, 5]
Beginning: [1, 2, 3, 4], Last: 5
Min: 1, Max: 9
New York: (40.7128, -74.006)
London: (51.5074, -0.1278)`,
            note: 'For tuples where each position has a specific meaning (like coordinates or database records), consider using `collections.namedtuple` or `typing.NamedTuple`. Instead of accessing `point[0]`, you can write `point.x` -- much more readable. Python 3.10+ also offers `dataclasses` for similar use cases with more flexibility.',
            codeHighlightLines: [3, 7, 10, 15, 17],
          },
        ],
        quiz: [
          {
            question: 'What makes tuples different from lists?',
            options: ['Tuples are unordered', 'Tuples are immutable (cannot be changed after creation)', 'Tuples can only hold strings', 'Tuples are always shorter than lists'],
            correctIndex: 1,
            explanation: 'Tuples are immutable -- once created, you cannot add, remove, or modify their elements. This makes them suitable for fixed data like coordinates and dictionary keys.',
          },
          {
            question: 'How do you create a single-element tuple?',
            options: ['(42)', 'tuple(42)', '(42,)', '[42]'],
            correctIndex: 2,
            explanation: 'A single-element tuple requires a trailing comma: (42,). Without the comma, (42) is just an integer in parentheses, not a tuple.',
          },
          {
            question: 'What does first, *rest = (1, 2, 3, 4, 5) assign to rest?',
            options: ['(2, 3, 4, 5)', '[2, 3, 4, 5]', '2', 'Error'],
            correctIndex: 1,
            explanation: 'Star unpacking captures "the rest" into a list (not a tuple). So first gets 1, and rest gets [2, 3, 4, 5] as a list.',
          },
          {
            question: 'Why can tuples be used as dictionary keys but lists cannot?',
            options: ['Tuples are shorter', 'Tuples are immutable and therefore hashable', 'Lists are too slow', 'It is a Python design mistake'],
            correctIndex: 1,
            explanation: 'Dictionary keys must be hashable (immutable). Tuples are immutable and thus hashable, while lists are mutable and cannot be used as dictionary keys.',
          },
        ],
        challenge: {
          prompt: 'Write a function called `analyze_scores` that takes a tuple of student scores and returns a tuple of (min_score, max_score, average). Use tuple unpacking to capture the return values and print them.',
          starterCode: `def analyze_scores(scores):\n    """Return (min, max, average) from a tuple of scores."""\n    # Your code here\n    pass\n\n# Test with sample data\nscores = (85, 92, 78, 95, 88, 72, 90)\n\n# Unpack the result\nlowest, highest, avg = analyze_scores(scores)\nprint(f"Scores: {scores}")\nprint(f"Lowest: {lowest}")\nprint(f"Highest: {highest}")\nprint(f"Average: {avg:.1f}")`,
          solutionCode: `def analyze_scores(scores):\n    """Return (min, max, average) from a tuple of scores."""\n    return min(scores), max(scores), sum(scores) / len(scores)\n\n# Test with sample data\nscores = (85, 92, 78, 95, 88, 72, 90)\n\n# Unpack the result\nlowest, highest, avg = analyze_scores(scores)\nprint(f"Scores: {scores}")\nprint(f"Lowest: {lowest}")\nprint(f"Highest: {highest}")\nprint(f"Average: {avg:.1f}")`,
          hints: [
            'Use min(), max(), and sum()/len() to compute the statistics.',
            'Return multiple values separated by commas -- Python automatically packs them into a tuple.',
            'Use tuple unpacking on the caller side: a, b, c = function() to capture each returned value.',
          ],
        },
      },
      {
        id: 'set',
        title: 'Set',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Creating Sets and Uniqueness',
            content:
              'Picture a bowl where you can toss in marbles, but if you try to add a marble that\'s already in there, it just... doesn\'t count. That\'s a set. A Python `set` is an *unordered* collection of *unique* elements -- duplicates are automatically removed. You create sets with curly braces `{}` or the `set()` constructor. Sets are optimized for one thing above all else: checking whether an element exists. The `in` operator on a set is *dramatically* faster than on a list for large collections -- O(1) average time for sets vs. O(n) for lists. If you have a list of 10 million items, checking membership in a set is essentially instant, while checking a list requires scanning through potentially all 10 million items. This makes sets invaluable when you need to track "seen items," remove duplicates from a list, or quickly check membership. The elements must be hashable (immutable types like numbers, strings, and tuples), so you can\'t put a list inside a set.',
            code: `# Creating sets
fruits = {"apple", "banana", "cherry"}
numbers = {1, 2, 3, 2, 1, 4, 3}   # Duplicates removed
from_list = set([1, 2, 2, 3, 3, 3])
empty = set()   # NOT {} which creates a dict

print(f"Fruits: {fruits}")
print(f"Numbers: {numbers}")
print(f"From list: {from_list}")
print(f"Empty set: {empty}, type: {type(empty)}")

# Uniqueness demonstration
colors = ["red", "blue", "red", "green", "blue", "red"]
unique_colors = set(colors)
print(f"Original: {colors}")
print(f"Unique: {unique_colors}")
print(f"Count: {len(unique_colors)}")

# Fast membership testing
big_set = set(range(100000))
print(99999 in big_set)   # Very fast: O(1)`,
            output: `Fruits: {'cherry', 'banana', 'apple'}
Numbers: {1, 2, 3, 4}
From list: {1, 2, 3}
Empty set: set(), type: <class 'set'>
Original: ['red', 'blue', 'red', 'green', 'blue', 'red']
Unique: {'blue', 'green', 'red'}
Count: 3
True`,
            warning: 'To create an empty set, you MUST use `set()`. Writing `{}` creates an empty *dictionary*, not an empty set. This is one of the most common Python gotchas, and it trips up even experienced developers who are moving fast.',
            tip: 'The fastest way to remove duplicates from a list while preserving order (Python 3.7+): `list(dict.fromkeys(my_list))`. This works because dictionaries maintain insertion order and automatically deduplicate keys.',
            analogy: 'Think of a set like a guest list at an exclusive party. Each name can only appear once -- if you try to add "Alice" twice, the bouncer just says "already on the list." And unlike a line (list), there is no particular order to who is on the list.',
          },
          {
            heading: 'Set Operations',
            content:
              'Here\'s where sets truly shine -- they support all the mathematical set operations you might remember from school, and they make solving certain problems almost trivially easy. Union (`|`) combines all elements from both sets. Intersection (`&`) finds elements common to both. Difference (`-`) finds elements in the first set but not the second. Symmetric difference (`^`) finds elements in either set but not both. Think of a real-world example: you have a set of skills for a frontend developer and a set for a backend developer. Finding their intersection instantly tells you what skills they share. Finding the union gives you all the skills needed for a full-stack role. These operations aren\'t just elegant -- they\'re also very fast, typically O(min(len(a), len(b))) for intersection. For modifying sets, use `add()` for a single element, `discard()` to remove without error if missing, and `remove()` to remove but raise `KeyError` if missing. Pro tip: use `discard()` over `remove()` unless you specifically want the error.',
            code: `a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}

# Set operations
print(f"Union:       {a | b}")
print(f"Intersection: {a & b}")
print(f"Difference:  {a - b}")
print(f"Sym. Diff:   {a ^ b}")

# Subset and superset
small = {1, 2}
print(f"{small} subset of {a}: {small.issubset(a)}")
print(f"{a} superset of {small}: {a.issuperset(small)}")

# Modifying sets
s = {1, 2, 3}
s.add(4)
print(f"After add(4): {s}")
s.discard(2)
print(f"After discard(2): {s}")
s.discard(99)  # No error if missing
print(f"After discard(99): {s}")

# Practical: find common and unique skills
frontend = {"HTML", "CSS", "JavaScript", "React"}
backend = {"Python", "JavaScript", "SQL", "Django"}
print(f"Shared: {frontend & backend}")
print(f"All skills: {frontend | backend}")`,
            output: `Union:       {1, 2, 3, 4, 5, 6, 7, 8}
Intersection: {4, 5}
Difference:  {1, 2, 3}
Sym. Diff:   {1, 2, 3, 6, 7, 8}
{1, 2} subset of {1, 2, 3, 4, 5}: True
{1, 2, 3, 4, 5} superset of {1, 2}: True
After add(4): {1, 2, 3, 4}
After discard(2): {1, 3, 4}
After discard(99): {1, 3, 4}
Shared: {'JavaScript'}
All skills: {'HTML', 'CSS', 'JavaScript', 'React', 'Python', 'SQL', 'Django'}`,
            note: 'Sets also support set comprehensions: `{x**2 for x in range(10)}` creates `{0, 1, 4, 9, 16, 25, 36, 49, 64, 81}`. And if you need an immutable set (e.g., for use as a dictionary key), Python has `frozenset`, which supports all the same operations but cannot be modified after creation.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n  subgraph "A = {1,2,3,4,5}"\n    A1[1] \n    A2[2]\n    A3[3]\n    A4[4]\n    A5[5]\n  end\n  subgraph "B = {4,5,6,7,8}"\n    B4[4]\n    B5[5]\n    B6[6]\n    B7[7]\n    B8[8]\n  end\n  A4 -.- B4\n  A5 -.- B5',
              caption: 'Set intersection: elements 4 and 5 are shared between A and B',
            },
            codeHighlightLines: [5, 6, 7, 8],
          },
        ],
      },
      {
        id: 'dictionary',
        title: 'Dictionary',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Creating and Accessing Dictionaries',
            content:
              'Think of a Python dictionary like a real dictionary -- you look up a word (the *key*) to find its definition (the *value*). A `dict` is a collection of key-value pairs, and it\'s arguably the most important data structure in Python. Under the hood, it\'s a hash map, which means looking up a value by its key is blazingly fast -- O(1) on average, regardless of whether the dictionary has 10 entries or 10 million. Since Python 3.7, dictionaries maintain insertion order, so the pairs come back in the order you added them. Keys must be unique and hashable (strings and numbers are the most common), while values can be anything. You access values with square brackets `dict["key"]`, but be careful -- if the key doesn\'t exist, you get a `KeyError`. That\'s why many developers prefer `.get("key")`, which returns `None` (or a default you specify) for missing keys instead of crashing. You\'ll use dictionaries constantly in real projects: storing user profiles, configuration settings, API responses, counting occurrences, and much more.',
            code: `# Creating dictionaries
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

# Alternative creation methods
from_pairs = dict([("a", 1), ("b", 2)])
from_kwargs = dict(x=10, y=20)

print(person)
print(from_pairs)
print(from_kwargs)

# Accessing values
print(person["name"])
print(person.get("age"))
print(person.get("email", "not found"))

# Check if key exists
print("name" in person)
print("email" in person)
print(f"Length: {len(person)}")`,
            output: `{'name': 'Alice', 'age': 30, 'city': 'New York'}
{'a': 1, 'b': 2}
{'x': 10, 'y': 20}
Alice
30
not found
True
False
Length: 3`,
            tip: 'Always prefer `.get()` over `[]` when a key might not exist. `person["email"]` crashes with `KeyError`, but `person.get("email", "N/A")` gracefully returns "N/A". In production code, crashing on a missing key is the #1 dictionary-related bug.',
            warning: 'Dictionary keys must be hashable (immutable). You can use strings, numbers, tuples, and frozensets as keys, but NOT lists, sets, or other dictionaries. Trying `{[1, 2]: "value"}` raises `TypeError: unhashable type: \'list\'`.',
            analogy: 'Think of a dictionary like a phone contact list. You look up the person\'s name (the key) to get their phone number (the value). You do not scroll through every entry -- you jump straight to the name you need, which is why lookups are so fast.',
            diagram: {
              kind: 'custom',
              type: 'hash-map',
              data: {
                entries: [
                  { key: '"name"', value: '"Alice"' },
                  { key: '"age"', value: '30' },
                  { key: '"city"', value: '"New York"' },
                ],
                lookupKey: '"name"',
                lookupResult: '"Alice"',
              },
              caption: 'Dictionary: keys are hashed for O(1) lookup of their paired values',
            },
            codeHighlightLines: [17, 18, 19],
          },
          {
            heading: 'Modifying and Iterating Dictionaries',
            content:
              'Dictionaries are mutable, so you can freely add, update, and remove key-value pairs after creation. Assigning to a key either updates the value (if the key exists) or creates a new entry (if it doesn\'t). For removing entries, `del dict[key]` deletes by key (raises `KeyError` if missing), `dict.pop(key)` removes and returns the value (also raises `KeyError` unless you provide a default), and `dict.popitem()` removes and returns the last inserted pair. For merging dictionaries, `update()` is your friend -- it takes another dictionary and adds or overwrites all its key-value pairs. For iteration, Python gives you three views: `.keys()` for just the keys, `.values()` for just the values, and `.items()` for (key, value) pairs. You\'ll use `.items()` most often because you usually need both the key and the value. In a plain `for` loop over a dictionary, you iterate over the keys by default -- a design choice that trips up some beginners who expect to get both keys and values.',
            code: `student = {"name": "Bob", "grade": "A", "score": 95}

# Modifying values
student["score"] = 98
student["email"] = "bob@example.com"   # Add new key
print(student)

# Removing entries
del student["email"]
grade = student.pop("grade")
print(f"Removed grade: {grade}")
print(student)

# Iterating
print("\\nKeys:", list(student.keys()))
print("Values:", list(student.values()))

print("\\nAll items:")
for key, value in student.items():
    print(f"  {key}: {value}")

# Useful dict methods
config = {"debug": True, "verbose": False}
config.update({"verbose": True, "port": 8080})
print(f"\\nUpdated config: {config}")`,
            output: `{'name': 'Bob', 'grade': 'A', 'score': 98, 'email': 'bob@example.com'}
Removed grade: A
{'name': 'Bob', 'score': 98}

Keys: ['name', 'score']
Values: ['Bob', 98]

All items:
  name: Bob
  score: 98

Updated config: {'debug': True, 'verbose': True, 'port': 8080}`,
            note: 'Python 3.9+ introduced the `|` operator for merging dictionaries: `merged = dict1 | dict2`. And `|=` for updating in place: `dict1 |= dict2`. This is cleaner than `update()` and creates a new dict rather than modifying in place.',
          },
        ],
      },
      {
        id: 'nested-dictionary',
        title: 'Nested Dictionary',
        difficulty: 'intermediate',
        sections: [
          {
            heading: 'Creating and Accessing Nested Dictionaries',
            content:
              'Nested dictionaries are dictionaries that contain other dictionaries as values, and they\'re how Python naturally represents structured, hierarchical data -- think JSON from APIs, configuration files, or database records with related objects. If you\'ve ever worked with a REST API, you\'ve already seen nested dictionaries in action: an API response might have a `user` object containing an `address` object containing `city` and `zip` fields. You access nested values by chaining key lookups: `users["user1"]["address"]["city"]`. But here\'s the gotcha: if any intermediate key is missing, you get a `KeyError` that crashes your program. The safe approach is chaining `.get()` calls: `users.get("user1", {}).get("address", {}).get("city", "Unknown")`. This returns "Unknown" if any key in the chain is missing, instead of crashing. For deeply nested structures, consider using try/except or a helper function to keep the code clean.',
            code: `# Nested dictionary representing users
users = {
    "user1": {
        "name": "Alice",
        "age": 30,
        "address": {
            "city": "New York",
            "zip": "10001"
        }
    },
    "user2": {
        "name": "Bob",
        "age": 25,
        "address": {
            "city": "San Francisco",
            "zip": "94102"
        }
    }
}

# Accessing nested values
print(users["user1"]["name"])
print(users["user2"]["address"]["city"])

# Safe access with .get()
email = users["user1"].get("email", "N/A")
print(f"Email: {email}")

# Check structure
print(f"Total users: {len(users)}")
print(f"User1 keys: {list(users['user1'].keys())}")`,
            output: `Alice
San Francisco
Email: N/A
Total users: 2
User1 keys: ['name', 'age', 'address']`,
            warning: 'Chaining bracket access like `data["a"]["b"]["c"]` will crash with `KeyError` if ANY key in the chain is missing. For API responses and other external data where keys might be absent, always use `.get()` with defaults or wrap the access in try/except.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n  A["users"] --> B["user1"]\n  A --> C["user2"]\n  B --> D["name: Alice"]\n  B --> E["age: 30"]\n  B --> F["address"]\n  F --> G["city: New York"]\n  F --> H["zip: 10001"]\n  C --> I["name: Bob"]\n  C --> J["age: 25"]\n  C --> K["address"]\n  K --> L["city: San Francisco"]\n  K --> M["zip: 94102"]',
              caption: 'Nested dictionary structure: each level is a dict containing more dicts',
            },
            codeHighlightLines: [21, 22, 25],
          },
          {
            heading: 'Iterating and Modifying Nested Dictionaries',
            content:
              'Working with nested dictionaries in real projects usually involves iterating through the structure with nested loops, computing aggregates (averages, totals), and building new nested structures from flat data. The `setdefault()` method is your best friend when building nested dictionaries incrementally. It checks if a key exists -- if it does, it returns the existing value; if it doesn\'t, it inserts a default value and returns it. This lets you write `inventory.setdefault(category, {})[item] = qty` as a one-liner instead of a multi-line if/else check. The example below shows a common real-world pattern: computing averages from a nested grade book, modifying nested values, using `setdefault()` to add entries, and building a nested structure from a flat list of tuples. These patterns come up constantly when processing data from databases, CSV files, and API responses.',
            code: `# Iterating over nested dict
students = {
    "Alice": {"math": 95, "science": 88, "english": 92},
    "Bob":   {"math": 78, "science": 95, "english": 85},
    "Carol": {"math": 90, "science": 82, "english": 97}
}

# Print all grades
for student, grades in students.items():
    avg = sum(grades.values()) / len(grades)
    print(f"{student}: avg = {avg:.1f}")

# Modify nested values
students["Alice"]["math"] = 100
print(f"\\nAlice's updated math: {students['Alice']['math']}")

# Add new student with setdefault
students.setdefault("Dave", {})["math"] = 88
students["Dave"]["science"] = 91
print(f"Dave's grades: {students['Dave']}")

# Build a nested structure from data
inventory = {}
items = [("fruits", "apple", 10), ("fruits", "banana", 5),
         ("vegs", "carrot", 8)]
for category, item, qty in items:
    inventory.setdefault(category, {})[item] = qty
print(f"\\nInventory: {inventory}")`,
            output: `Alice: avg = 91.7
Bob: avg = 86.0
Carol: avg = 89.7

Alice's updated math: 100
Dave's grades: {'math': 88, 'science': 91}

Inventory: {'fruits': {'apple': 10, 'banana': 5}, 'vegs': {'carrot': 8}}`,
            tip: 'For deeply nested data with frequent access, consider using defaultdict from the collections module or a library like python-box that allows dot-notation access to nested dicts.',
            note: 'When you need a dictionary where every missing key automatically creates a nested dictionary, use `collections.defaultdict`: `from collections import defaultdict; tree = lambda: defaultdict(tree); data = tree()`. Now `data["a"]["b"]["c"] = 1` works without any intermediate setup. This pattern is sometimes called an "autovivifying" dictionary.',
          },
        ],
      },
      {
        id: 'dict-comprehension',
        title: 'Dict Comprehension',
        difficulty: 'intermediate',
        sections: [
          {
            heading: 'Basic Dict Comprehension',
            content:
              'Just as list comprehensions let you build lists in one clean expression, dict comprehensions let you build dictionaries the same way. The syntax is `{key_expr: value_expr for item in iterable}` -- notice the colon between key and value, which is what makes it a dict instead of a set comprehension. Dict comprehensions are perfect for transforming data: applying a function to every value, building lookup tables from lists, inverting a dictionary (swapping keys and values), and converting between data formats. The `zip()` function pairs naturally with dict comprehensions: if you have a list of keys and a list of values, `{k: v for k, v in zip(keys, values)}` merges them into a dictionary (though `dict(zip(keys, values))` is even simpler for this specific case). Like list comprehensions, dict comprehensions are faster than the equivalent for-loop-with-assignment approach because Python optimizes them internally.',
            code: `# Basic dict comprehension
squares = {x: x ** 2 for x in range(1, 6)}
print(squares)

# From two parallel lists
keys = ["name", "age", "city"]
values = ["Alice", 30, "NYC"]
person = {k: v for k, v in zip(keys, values)}
print(person)

# Transforming values
prices = {"apple": 1.20, "banana": 0.50, "cherry": 2.00}
discounted = {item: round(price * 0.9, 2) for item, price in prices.items()}
print(discounted)

# Inverting a dictionary
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)`,
            output: `{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
{'name': 'Alice', 'age': 30, 'city': 'NYC'}
{'apple': 1.08, 'banana': 0.45, 'cherry': 1.8}
{1: 'a', 2: 'b', 3: 'c'}`,
            tip: 'For the simple case of creating a dict from parallel lists, `dict(zip(keys, values))` is more concise than a comprehension. Save comprehensions for when you need to transform or filter the data during construction.',
            warning: 'When inverting a dictionary, make sure the values are unique. If two keys map to the same value, inverting will lose one of them (the last one wins). For example, inverting `{"a": 1, "b": 1}` gives `{1: "b"}` -- the `"a"` mapping is silently lost.',
            codeHighlightLines: [2, 8, 13, 18],
          },
          {
            heading: 'Dict Comprehension with Conditions',
            content:
              'Adding conditions to dict comprehensions follows the same patterns as list comprehensions. A trailing `if` clause acts as a filter, only including key-value pairs that meet the condition. An `if-else` in the value expression lets you conditionally transform values while keeping all keys. This is incredibly useful in practice: filtering a config dict to only include certain keys, categorizing data into "pass"/"fail" labels, creating subsets of large dictionaries, or cleaning up data by replacing invalid values. You can even nest dict comprehensions, where the outer comprehension produces keys and the inner one produces the nested dictionary values -- perfect for creating structured data like the multiplication table example below. As with list comprehensions, keep them readable: if a dict comprehension is hard to understand at a glance, use a regular for loop instead.',
            code: `# Filter: keep only passing grades
grades = {"Alice": 92, "Bob": 67, "Carol": 85, "Dave": 45, "Eve": 78}
passing = {name: grade for name, grade in grades.items() if grade >= 70}
print(f"Passing: {passing}")

# Conditional values
labels = {name: ("pass" if grade >= 70 else "fail")
          for name, grade in grades.items()}
print(f"Labels: {labels}")

# From a list with enumeration
fruits = ["apple", "banana", "cherry", "date"]
indexed = {i: fruit for i, fruit in enumerate(fruits)}
print(f"Indexed: {indexed}")

# Create frequency counter
text = "hello world"
freq = {char: text.count(char) for char in set(text) if char != " "}
print(f"Frequencies: {freq}")

# Nested dict comprehension
matrix_dict = {
    f"row{i}": {f"col{j}": i * j for j in range(1, 4)}
    for i in range(1, 4)
}
for row, cols in matrix_dict.items():
    print(f"  {row}: {cols}")`,
            output: `Passing: {'Alice': 92, 'Carol': 85, 'Eve': 78}
Labels: {'Alice': 'pass', 'Bob': 'fail', 'Carol': 'pass', 'Dave': 'fail', 'Eve': 'pass'}
Indexed: {0: 'apple', 1: 'banana', 2: 'cherry', 3: 'date'}
Frequencies: {'h': 1, 'r': 1, 'd': 1, 'o': 2, 'l': 3, 'w': 1, 'e': 1}
  row1: {'col1': 1, 'col2': 2, 'col3': 3}
  row2: {'col1': 2, 'col2': 4, 'col3': 6}
  row3: {'col1': 3, 'col2': 6, 'col3': 9}`,
            note: 'For frequency counting, Python has a purpose-built tool: `collections.Counter`. Instead of `{char: text.count(char) for char in set(text)}` (which is O(n^2)), use `Counter(text)` which is O(n) and also gives you handy methods like `.most_common(5)`. Always reach for the right tool when it exists.',
          },
        ],
      },
      {
        id: 'string',
        title: 'String',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Creating Strings',
            content:
              'Strings are everywhere in programming -- usernames, file paths, API responses, error messages -- and Python makes them a joy to work with. A string is an immutable sequence of Unicode characters, which means it can handle not just English text but emojis, Chinese characters, Arabic script, and anything else Unicode supports. You can create strings with single quotes (`\'hello\'`), double quotes (`"hello"`), or triple quotes for multi-line strings (`"""..."""`). Python treats single and double quotes identically, so use whichever lets you avoid escaping: if your string contains an apostrophe, wrap it in double quotes; if it contains double quotes, wrap it in single quotes. Triple-quoted strings preserve newlines and indentation, making them perfect for multi-line text and docstrings. For special characters, Python supports escape sequences: `\\n` for newline, `\\t` for tab, `\\\\` for a literal backslash. And when escape sequences get annoying (file paths on Windows, regular expressions), prefix your string with `r` for a raw string that treats backslashes as literal characters.',
            code: `# Single and double quotes
name = 'Alice'
greeting = "Hello, World!"
quote = "She said, 'Python is great!'"
alt_quote = 'He replied, "Indeed!"'
print(name)
print(greeting)
print(quote)
print(alt_quote)

# Multi-line strings with triple quotes
poem = """Roses are red,
Violets are blue,
Python is great,
And so are you."""
print(poem)

# Escape characters
path_escaped = "C:\\\\Users\\\\file.txt"
raw_path = r"C:\Users\file.txt"
print(path_escaped)
print(raw_path)
print("Line1\\nLine2\\tTabbed")`,
            output: `Alice
Hello, World!
She said, 'Python is great!'
He replied, "Indeed!"
Roses are red,
Violets are blue,
Python is great,
And so are you.
C:\\Users\\file.txt
C:\Users\file.txt
Line1
Line2	Tabbed`,
            tip: 'Strings in Python are immutable -- every operation that "changes" a string actually creates a new one. This means `s += "more"` in a loop creates a new string object every iteration. For building strings from many pieces, use `"".join(list_of_strings)` instead, which is dramatically faster for large numbers of concatenations.',
            analogy: 'Think of a Python string like a beaded necklace -- each bead is a character. You can look at any bead by its position, but you cannot replace a single bead without making an entirely new necklace (immutability).',
          },
          {
            heading: 'F-Strings and String Formatting',
            content:
              'F-strings (formatted string literals) are hands-down the best way to embed values and expressions inside strings in modern Python. Prefix any string with `f` and put expressions inside curly braces `{}` -- Python evaluates them and inserts the results. `f"Hello, {name}!"` is cleaner, more readable, and faster than both `"Hello, " + name + "!"` and `"Hello, {}!".format(name)`. But f-strings can do so much more than simple insertion. You can put *any* Python expression inside the braces: math (`{age + 5}`), method calls (`{name.upper()}`), ternary expressions, even function calls. And the format specifications after a colon are incredibly powerful: `{price:.2f}` formats to 2 decimal places, `{count:,}` adds thousand separators, `{name:>20}` right-aligns in a 20-character field, and `{name:^20}` centers it. For debugging, Python 3.8+ added a killer feature: `f"{variable=}"` prints both the variable name and its value, saving you from writing `f"variable={variable}"` over and over.',
            code: `name = "Alice"
age = 30
balance = 1234.5678

# Basic f-string
print(f"Name: {name}, Age: {age}")

# Expressions inside f-strings
print(f"In 5 years: {age + 5}")
print(f"Name upper: {name.upper()}")

# Format specifications
print(f"Balance: \${balance:.2f}")
print(f"Padded: {age:05d}")
print(f"Left aligned: |{name:<15}|")
print(f"Right aligned: |{name:>15}|")
print(f"Centered: |{name:^15}|")

# Large numbers with separators
population = 7900000000
print(f"Population: {population:,}")
print(f"Scientific: {population:.2e}")

# Multi-line f-string
info = (
    f"User: {name}\\n"
    f"Age:  {age}\\n"
    f"Balance: \${balance:,.2f}"
)
print(info)`,
            output: `Name: Alice, Age: 30
In 5 years: 35
Name upper: ALICE
Balance: $1234.57
Padded: 00030
Left aligned: |Alice          |
Right aligned: |          Alice|
Centered: |     Alice     |
Population: 7,900,000,000
Scientific: 7.90e+09
User: Alice
Age:  30
Balance: $1,234.57`,
            tip: 'F-strings can contain any expression, including ternary operators: f"Status: {\'active\' if is_active else \'inactive\'}". For debugging, use f"{variable=}" which prints both the name and value: f"{age=}" outputs "age=30".',
            warning: 'You might see older Python code using `%`-formatting (`"Hello %s" % name`) or `.format()` (`"Hello {}".format(name)`). These still work, but f-strings are the modern standard. If you\'re writing new code, always prefer f-strings -- they\'re faster, more readable, and less error-prone.',
            codeHighlightLines: [6, 13, 21],
          },
        ],
      },
      {
        id: 'string-slicing',
        title: 'String Slicing',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Basic String Slicing',
            content:
              'Since strings are sequences of characters, they support the exact same slicing syntax as lists: `string[start:stop:step]`. This means everything you learned about list slicing transfers directly -- inclusive start, exclusive stop, optional step. Need the first 5 characters? `text[:5]`. Everything from position 7 onward? `text[7:]`. Every other character? `text[::2]`. The key thing to remember is that since strings are immutable, slicing always creates a *new* string -- the original is never modified. String slicing is one of those fundamental skills you\'ll use constantly in Python: extracting substrings, parsing formatted data, validating patterns, trimming prefixes and suffixes, and more. And just like with lists, you never need to worry about `IndexError` with slices -- out-of-range indices are silently clamped to the string boundaries, making slicing very forgiving to work with.',
            code: `text = "Hello, World!"

# Basic slicing
print(text[0:5])       # First 5 characters
print(text[7:12])      # Characters 7 through 11
print(text[:5])        # From start to index 5
print(text[7:])        # From index 7 to end

# With step
print(text[::2])       # Every other character
print(text[0:10:3])    # Every third character in first 10

# Negative indices
print(text[-6:])       # Last 6 characters
print(text[-6:-1])     # Last 6 excluding last char
print(text[:-1])       # Everything except last char

# Get individual characters
print(f"First: {text[0]}, Last: {text[-1]}")`,
            output: `Hello
World
Hello
World!
Hlo ol!
HlWr
orld!
orld
Hello, World
First: H, Last: !`,
            note: 'String slicing is so fundamental that Python\'s standard library uses it extensively under the hood. When you call `str.startswith("prefix")`, Python is essentially doing a slice comparison. Understanding slicing helps you understand how many string methods work internally.',
          },
          {
            heading: 'Reversing and Practical Applications',
            content:
              'The most iconic string slice is `[::-1]`, which reverses a string by stepping backward through every character. It\'s concise, Pythonic, and a favorite in coding interviews. Beyond reversing, string slicing is a workhorse for real-world text processing. Need to extract a file extension? Slice from the last dot. Parsing a date string? Slice out the year, month, and day portions. Checking if a word is a palindrome? Compare it to its reverse with `[::-1]`. The palindrome checker in the example below also demonstrates a common pattern: normalizing the string first (lowering case, removing spaces) before doing the comparison. One important performance note: since strings are immutable, every slice creates a new string object. If you\'re doing heavy text processing with lots of concatenation, use `str.join()` or `io.StringIO` instead. But for extracting substrings, which is the most common use of slicing, the performance is excellent.',
            code: `# Reversing strings
word = "Python"
reversed_word = word[::-1]
print(f"Reversed: {reversed_word}")

# Palindrome check
def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]

print(is_palindrome("racecar"))
print(is_palindrome("hello"))
print(is_palindrome("A man a plan a canal Panama"))

# Practical: extract file extension
filename = "report_2024.final.pdf"
extension = filename[filename.rfind("."):]
name_only = filename[:filename.rfind(".")]
print(f"Extension: {extension}")
print(f"Name: {name_only}")

# Extract parts from formatted string
date = "2024-03-15"
year, month, day = date[:4], date[5:7], date[8:10]
print(f"Year: {year}, Month: {month}, Day: {day}")

# Every nth character
alphabet = "abcdefghijklmnopqrstuvwxyz"
print(f"Every 5th: {alphabet[::5]}")`,
            output: `Reversed: nohtyP
True
False
True
Extension: .pdf
Name: report_2024.final
Year: 2024, Month: 03, Day: 15
Every 5th: afkpuz`,
            tip: 'For splitting strings by delimiters, use str.split() instead of manual slicing. For example, "2024-03-15".split("-") returns ["2024", "03", "15"], which is cleaner and handles variable-length fields.',
            warning: 'While `[::-1]` is great for reversing in interviews and simple scripts, for production code that needs to handle Unicode properly (emojis, accented characters, etc.), be aware that some Unicode characters are made of multiple code points. Reversing those naively can produce garbled text. For robust Unicode reversal, consider using the `unicodedata` module.',
            codeHighlightLines: [3, 8, 9, 24],
          },
        ],
      },
    ],
  },
];

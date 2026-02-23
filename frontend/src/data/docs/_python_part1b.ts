import type { DocCategory } from './types';

// Part 1B: Control Flow, Functions
export const PART1B_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Control Flow                                                 */
  /* ------------------------------------------------------------ */
  {
    id: 'control-flow',
    label: 'Control Flow',
    icon: 'GitBranch',
    entries: [
      /* ======== if-elif-else ======== */
      {
        id: 'if-elif-else',
        title: 'If / Elif / Else',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'The if Statement',
            content:
              'Every interesting program needs to make decisions, and the `if` statement is how Python does it. Think of it like a bouncer at a club -- it checks a condition, and only lets the code inside run if the condition passes. Here\'s the key thing to remember: Python uses *indentation* to know which lines belong inside the `if` block. This isn\'t just a style choice -- it\'s part of the language itself. Forget a level of indentation, and Python will complain loudly. The condition after `if` can be any expression that Python can evaluate as truthy or falsy, and you don\'t need parentheses around it (though you can add them for clarity in complex expressions). Let\'s see it in action.',
            code: `age = 18

if age >= 18:
    print("You are an adult.")
    print("You can vote.")

temperature = 35

if temperature > 30:
    print(f"{temperature}C is hot outside!")

# Conditions can use any truthy/falsy value
name = "Alice"
if name:
    print(f"Hello, {name}!")

empty_list = []
if not empty_list:
    print("The list is empty.")`,
            output: `You are an adult.
You can vote.
35C is hot outside!
Hello, Alice!
The list is empty.`,
            tip: 'Python has a surprisingly elegant truthiness system. These values are falsy: `False`, `None`, `0`, `0.0`, `""` (empty string), `[]`, `{}`, `set()`, and `()`. Literally everything else is truthy. Once you internalize this, you can write beautifully clean conditions like `if my_list:` instead of the clunky `if len(my_list) > 0:`.',
            note: 'Coming from C, Java, or JavaScript? You might instinctively reach for parentheses around the condition: `if (age >= 18):`. This works in Python, but it\'s considered unpythonic. Drop the parentheses unless they genuinely improve readability for a complex multi-part condition.',
            analogy: 'Think of it like a traffic light: the if statement is the signal that checks conditions before letting your code "drive" through. Green (truthy) means go, red (falsy) means stop.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    A["Evaluate condition"] --> B{"Truthy?"}\n    B -- Yes --> C["Execute if-block"]\n    B -- No --> D["Skip if-block"]\n    C --> E["Continue program"]\n    D --> E',
              caption: 'How a simple if statement evaluates and branches',
            },
            codeHighlightLines: [3, 4, 9, 14, 18],
          },
          {
            heading: 'elif Chains and else',
            content:
              'What happens when you need to check more than one condition? That\'s where `elif` (short for "else if") comes in. Imagine you\'re sorting mail into different bins -- you check the first label, and if it doesn\'t match, you check the next, and the next. Python works the same way: it evaluates each condition from top to bottom and runs the *first* block that matches, then skips the rest entirely. The optional `else` at the bottom is your safety net -- it catches everything that didn\'t match any condition above it. Here\'s why this matters: using `elif` instead of separate `if` statements tells Python (and anyone reading your code) that these conditions are mutually exclusive. Only one block will ever run. That\'s a powerful guarantee that makes your logic easier to reason about.',
            code: `score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Score {score} => Grade {grade}")

# Multiple elif example: HTTP status codes
status = 404

if status == 200:
    message = "OK"
elif status == 301:
    message = "Moved Permanently"
elif status == 404:
    message = "Not Found"
elif status == 500:
    message = "Internal Server Error"
else:
    message = f"Unknown status: {status}"

print(f"HTTP {status}: {message}")`,
            output: `Score 85 => Grade B
HTTP 404: Not Found`,
            warning: 'A classic beginner mistake is using separate `if` statements when you mean `elif`. With separate `if` blocks, *every* condition gets evaluated (and potentially runs). With `elif`, Python stops at the first match. This difference can cause subtle bugs -- for instance, a score of 95 would match *both* `>= 90` and `>= 80` if you used separate `if` statements instead of `elif`.',
            tip: 'When you have a long chain of `elif` blocks checking the same variable against exact values (like the HTTP status example), Python 3.10+ offers `match`/`case` statements as a cleaner alternative. We\'ll cover that in a later section.',
            analogy: 'Think of it like a series of funnel gates at a water park: water flows downhill and enters the first gate whose condition is met. Once it enters one gate, all the gates below are bypassed.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    A["score = 85"] --> B{">= 90?"}\n    B -- Yes --> C["grade = A"]\n    B -- No --> D{">= 80?"}\n    D -- Yes --> E["grade = B ✓"]\n    D -- No --> F{">= 70?"}\n    F -- Yes --> G["grade = C"]\n    F -- No --> H{">= 60?"}\n    H -- Yes --> I["grade = D"]\n    H -- No --> J["grade = F"]\n    C --> K["print result"]\n    E --> K\n    G --> K\n    I --> K\n    J --> K',
              caption: 'elif chain evaluation: only the first matching branch executes',
            },
            codeHighlightLines: [3, 5, 7, 9, 11],
          },
          {
            heading: 'Nested Conditions and Ternary Expression',
            content:
              'You can place `if` statements inside other `if` blocks to build more complex decision trees -- like those "choose your own adventure" books where each choice leads to another set of choices. But here\'s the thing: deep nesting quickly turns your code into an unreadable pyramid of doom. If you find yourself going more than two or three levels deep, it\'s a sign you should refactor. For simple, one-line decisions, Python gives you a beautiful shortcut: the ternary expression. It follows the pattern `value_if_true if condition else value_if_false`. What makes it powerful is that it\'s an *expression*, not a statement -- meaning you can use it inside f-strings, function calls, list comprehensions, and anywhere else you\'d put a value. Just don\'t get carried away nesting them.',
            code: `# Nested conditions
age = 25
has_license = True

if age >= 18:
    if has_license:
        print("You can drive.")
    else:
        print("You are old enough but need a license.")
else:
    print("You are too young to drive.")

# Ternary (conditional) expression
x = 10
result = "even" if x % 2 == 0 else "odd"
print(f"{x} is {result}")

# Ternary in practical contexts
scores = [88, 42, 95, 67, 55, 73]
labels = [f"{s} ({'pass' if s >= 60 else 'fail'})" for s in scores]
print(labels)

# Nested ternary (use sparingly!)
value = 0
sign = "positive" if value > 0 else "negative" if value < 0 else "zero"
print(f"{value} is {sign}")`,
            output: `You can drive.
10 is even
['88 (pass)', '42 (fail)', '95 (pass)', '67 (pass)', '55 (fail)', '73 (pass)']
0 is zero`,
            tip: 'You can often flatten nested `if` statements by combining conditions with `and`. For example, `if age >= 18 and has_license:` is cleaner than nesting two `if` blocks. Reserve nesting for cases where the inner branches are truly different depending on the outer condition.',
            warning: 'Nested ternary expressions like `"a" if x else "b" if y else "c"` are a readability nightmare. If you or your teammates need more than a few seconds to parse it, switch to a regular `if`/`elif`/`else` block or a small helper function. Your future self will thank you.',
            codeHighlightLines: [15, 20, 25],
          },
        ],
        quiz: [
          {
            question: 'What does Python use to determine which lines belong inside an if block?',
            options: ['Curly braces {}', 'Parentheses ()', 'Indentation', 'The "end" keyword'],
            correctIndex: 2,
            explanation: 'Python uses indentation (whitespace at the beginning of a line) to define code blocks. This is not just a style choice — it is part of the language syntax.',
          },
          {
            question: 'In an if/elif/else chain, how many blocks can execute?',
            options: ['All blocks that match', 'Exactly one block', 'At most one block', 'At least one block'],
            correctIndex: 2,
            explanation: 'Python evaluates conditions top to bottom and runs only the first matching block. If no condition matches and there is no else, zero blocks execute. With else, exactly one block always executes.',
          },
          {
            question: 'What is the result of the ternary expression: "yes" if 0 else "no"?',
            options: ['"yes"', '"no"', 'True', 'A SyntaxError'],
            correctIndex: 1,
            explanation: '0 is falsy in Python, so the condition evaluates to False and the expression returns "no".',
          },
          {
            question: 'Which of the following values is truthy in Python?',
            options: ['0', '""', 'None', '[0]'],
            correctIndex: 3,
            explanation: 'A list containing an element — even if that element is 0 — is truthy. Only empty containers like [], {}, set(), and () are falsy.',
          },
        ],
        challenge: {
          prompt: 'Write a function called classify_temperature that takes a numeric temperature in Celsius and returns "freezing" if below 0, "cold" if 0-15, "comfortable" if 16-25, "warm" if 26-35, or "hot" if above 35.',
          starterCode: `def classify_temperature(temp):
    # Your code here
    pass

# Test cases
print(classify_temperature(-5))    # "freezing"
print(classify_temperature(10))    # "cold"
print(classify_temperature(22))    # "comfortable"
print(classify_temperature(30))    # "warm"
print(classify_temperature(40))    # "hot"`,
          solutionCode: `def classify_temperature(temp):
    if temp < 0:
        return "freezing"
    elif temp <= 15:
        return "cold"
    elif temp <= 25:
        return "comfortable"
    elif temp <= 35:
        return "warm"
    else:
        return "hot"

# Test cases
print(classify_temperature(-5))    # "freezing"
print(classify_temperature(10))    # "cold"
print(classify_temperature(22))    # "comfortable"
print(classify_temperature(30))    # "warm"
print(classify_temperature(40))    # "hot"`,
          hints: [
            'Use an if/elif/else chain to check ranges from lowest to highest.',
            'Since you check from lowest first, each elif only needs to check the upper bound — the lower bound is already guaranteed by the previous conditions failing.',
            'Remember that elif conditions are checked in order, so temp <= 15 in the second branch already implies temp >= 0.',
          ],
        },
      },

      /* ======== while-loop ======== */
      {
        id: 'while-loop',
        title: 'While Loop',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Basic while Syntax',
            content:
              'Imagine a factory assembly line that keeps running as long as there are parts to assemble. That\'s a `while` loop. It checks a condition before each iteration, runs the indented body if the condition is `True`, and then checks the condition again. This cycle repeats until the condition becomes `False` -- at which point Python moves on to the code after the loop. The critical responsibility on you is to make sure the condition *eventually* becomes `False`. If it doesn\'t, congratulations -- you\'ve written an infinite loop, and your program will hang until you force-quit it. Always ask yourself: "What changes inside this loop that will eventually make the condition false?"',
            code: `# Count from 1 to 5
count = 1
while count <= 5:
    print(f"Count: {count}")
    count += 1

print(f"Loop finished. count is now {count}")

# Summing numbers until a threshold
total = 0
n = 1
while total < 100:
    total += n
    n += 1

print(f"\\nSum reached {total} after adding numbers up to {n - 1}")`,
            output: `Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
Loop finished. count is now 6

Sum reached 105 after adding numbers up to 14`,
            tip: 'Here\'s a useful rule of thumb: if you know *how many times* you want to loop, use a `for` loop with `range()`. If you *don\'t know* the number of iterations and are looping until some condition changes, that\'s when `while` is the right tool. Picking the right loop type makes your intent immediately clear to anyone reading your code.',
            note: 'Notice that after the first loop finishes, `count` is 6, not 5. That\'s because the loop body runs when `count` is 5, then increments it to 6, and *then* the condition `count <= 5` fails. Understanding this "off by one at the end" behavior helps you avoid bugs when using the loop variable after the loop.',
            analogy: 'Think of it like a revolving door: each time you push through, the door checks if there are still people waiting. Once the line is empty (the condition is false), the door stops spinning.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    A["count = 1"] --> B{"count <= 5?"}\n    B -- Yes --> C["print count"]\n    C --> D["count += 1"]\n    D --> B\n    B -- No --> E["Loop finished\\ncount is now 6"]',
              caption: 'While loop cycle: condition is checked before every iteration',
            },
            codeHighlightLines: [3, 5],
          },
          {
            heading: 'break in while and Infinite Loops',
            content:
              'Sometimes the most natural way to write a loop is: "run forever, and stop when a specific thing happens." This is the `while True` + `break` pattern, and it\'s surprisingly common in real-world code. Think of it like a restaurant that stays open until the last customer leaves -- you don\'t know when that will be, so you just keep serving and check after each customer. The `break` statement immediately yanks you out of the loop, jumping straight to the first line after it. This pattern is the go-to for input validation (keep asking until the user gives valid input), menu systems ("press Q to quit"), and event loops. It\'s also cleaner than the alternative of duplicating your exit condition or using awkward flag variables.',
            code: `# Input validation loop pattern (simulated)
inputs = ["", "  ", "Alice"]  # simulate user inputs
idx = 0

while True:
    # Simulate getting input
    user_input = inputs[idx].strip()
    idx += 1
    if user_input:
        print(f"Got valid input: '{user_input}'")
        break
    print("Input is empty, try again...")

# Password attempt limiter
password = "secret123"
attempts = ["wrong", "nope", "secret123"]
max_attempts = 5
attempt = 0

while attempt < max_attempts:
    guess = attempts[attempt]
    attempt += 1
    if guess == password:
        print(f"\\nAccess granted on attempt {attempt}!")
        break
    print(f"Attempt {attempt}: wrong password")
else:
    # This only runs if we did NOT break
    print("Account locked: too many attempts")`,
            output: `Input is empty, try again...
Input is empty, try again...
Got valid input: 'Alice'

Attempt 1: wrong password
Attempt 2: wrong password
Access granted on attempt 3!`,
            warning: 'When using `while True`, always make sure there is a clear, reachable `break` inside the loop. A `while True` without a `break` (or a `return`/`raise` that exits the function) is a guaranteed infinite loop. If you\'re testing code with `while True`, keep your finger on Ctrl+C just in case!',
            tip: 'The password example shows a beautiful Python feature: the `else` clause on a loop. It only runs if the loop finished *without* a `break`. In this case, it means "all attempts exhausted, nobody guessed correctly." We\'ll explore this pattern more in the next section.',
          },
          {
            heading: 'while-else',
            content:
              'Here\'s one of Python\'s quirkiest features that even experienced developers get tripped up by: you can attach an `else` block to a `while` loop. The `else` runs only when the loop exits *normally* -- meaning the condition became `False` on its own, without a `break` interrupting it. If a `break` fires, the `else` is skipped entirely. The best way to think about it? Read `else` as *"no break."* This pattern eliminates the need for flag variables in search loops. Without `while-else`, you\'d typically set a `found = False` flag, flip it to `True` inside the loop, and check it after. The `while-else` construct bakes that logic right into the language. It\'s niche, but when you need it, it\'s remarkably clean.',
            code: `# Search for a value in a list
def find_first_negative(numbers: list[int]) -> int | None:
    """Return the first negative number, or None."""
    idx = 0
    while idx < len(numbers):
        if numbers[idx] < 0:
            print(f"Found negative: {numbers[idx]} at index {idx}")
            break
        idx += 1
    else:
        print("No negative numbers found")
        return None
    return numbers[idx]

# Test with a list containing negatives
result = find_first_negative([4, 7, 2, -3, 8, -1])
print(f"Result: {result}")

print()

# Test with all positives
result = find_first_negative([4, 7, 2, 3, 8, 1])
print(f"Result: {result}")`,
            output: `Found negative: -3 at index 3
Result: -3

No negative numbers found
Result: None`,
            tip: 'If `while-else` feels confusing, try mentally replacing `else` with `nobreak`. The block runs when the loop completed all iterations without encountering `break`. This mental model makes the behavior click instantly for most people.',
            note: 'The `for` loop also supports the `else` clause with the same semantics. This feature is somewhat controversial in the Python community -- some developers love it, others find it confusing. Guido van Rossum himself has said he might not include it if he were redesigning Python from scratch. Use it when it genuinely simplifies your code, but don\'t feel obligated to.',
            analogy: 'Think of it like searching your pockets for your keys: you check each pocket one by one (loop). If you find them, you stop searching (break). The else block is what happens when you have checked every pocket and come up empty -- you know the keys are not on you.',
          },
        ],
        quiz: [
          {
            question: 'What happens if the condition in a while loop never becomes False?',
            options: ['Python raises a SyntaxError', 'The loop runs once and stops', 'The loop runs forever (infinite loop)', 'Python automatically stops after 1000 iterations'],
            correctIndex: 2,
            explanation: 'If the condition never becomes False, the while loop runs indefinitely. You must ensure something inside the loop eventually makes the condition False, or use break to exit.',
          },
          {
            question: 'When does the else block of a while-else construct execute?',
            options: ['Every time the loop finishes', 'Only when the loop exits via break', 'Only when the loop exits normally (without break)', 'Only when the condition was never True'],
            correctIndex: 2,
            explanation: 'The else block on a while loop runs only when the loop condition becomes False naturally. If a break statement terminates the loop, the else block is skipped entirely.',
          },
          {
            question: 'After this code runs, what is the value of count?\n\ncount = 1\nwhile count <= 5:\n    count += 1',
            options: ['5', '6', '4', '1'],
            correctIndex: 1,
            explanation: 'When count is 5, the condition count <= 5 is True, so the body runs and increments count to 6. Then the condition 6 <= 5 is False, and the loop exits with count = 6.',
          },
        ],
        challenge: {
          prompt: 'Write a function called sum_until_negative that takes a list of numbers and returns the sum of elements from the start of the list up to (but not including) the first negative number. If there are no negative numbers, return the sum of the entire list. Use a while loop.',
          starterCode: `def sum_until_negative(numbers):
    # Your code here
    pass

# Test cases
print(sum_until_negative([4, 7, 2, -3, 8]))  # 13 (4+7+2)
print(sum_until_negative([1, 2, 3, 4, 5]))   # 15 (all positive)
print(sum_until_negative([-1, 5, 10]))         # 0 (first element is negative)
print(sum_until_negative([]))                   # 0 (empty list)`,
          solutionCode: `def sum_until_negative(numbers):
    total = 0
    idx = 0
    while idx < len(numbers):
        if numbers[idx] < 0:
            break
        total += numbers[idx]
        idx += 1
    return total

# Test cases
print(sum_until_negative([4, 7, 2, -3, 8]))  # 13 (4+7+2)
print(sum_until_negative([1, 2, 3, 4, 5]))   # 15 (all positive)
print(sum_until_negative([-1, 5, 10]))         # 0 (first element is negative)
print(sum_until_negative([]))                   # 0 (empty list)`,
          hints: [
            'Use an index variable and loop while the index is less than the length of the list.',
            'Inside the loop, check if the current element is negative. If it is, break out of the loop.',
            'Accumulate the sum by adding each non-negative element to a running total.',
          ],
        },
      },

      /* ======== for-loop ======== */
      {
        id: 'for-loop',
        title: 'For Loop',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'for with range()',
            content:
              'If you\'re coming from C or Java, forget everything you know about `for` loops. Python\'s `for` loop doesn\'t count -- it *iterates*. It walks through any sequence, one item at a time. When you *do* need to count, that\'s where `range()` comes in. Think of `range()` as a number generator: `range(5)` gives you 0, 1, 2, 3, 4. Notice the pattern: it starts at 0 and stops *before* 5. This "exclusive end" design might seem odd at first, but it\'s actually brilliant -- `range(n)` always gives you exactly `n` numbers, and it lines up perfectly with how Python indexes lists (also starting at 0). You can also give `range()` a start, stop, and step to get finer control, including counting backwards.',
            code: `# Basic range: 0 to 4
for i in range(5):
    print(i, end=" ")
print()

# range with start and stop
for i in range(2, 7):
    print(i, end=" ")
print()

# range with step
print("Even numbers 0-10:")
for i in range(0, 11, 2):
    print(i, end=" ")
print()

# Counting down
print("Countdown:")
for i in range(5, 0, -1):
    print(i, end=" ")
print("Go!")

# Practical: sum of first N natural numbers
n = 100
total = 0
for i in range(1, n + 1):
    total += i
print(f"\\nSum of 1 to {n}: {total}")`,
            output: `0 1 2 3 4
2 3 4 5 6
Even numbers 0-10:
0 2 4 6 8 10
Countdown:
5 4 3 2 1 Go!

Sum of 1 to 100: 5050`,
            tip: '`range()` is lazy -- it doesn\'t actually create a list of all those numbers in memory. So `range(1_000_000_000)` uses the same tiny amount of memory as `range(5)`. This makes it safe to use with enormous numbers without worrying about running out of RAM.',
            note: 'Fun fact: the sum of 1 to 100 can also be calculated with the formula `n * (n + 1) // 2`, which the mathematician Gauss famously figured out as a child. But loops are how we learn, and understanding iteration is foundational to everything else in programming.',
            diagram: {
              kind: 'custom',
              type: 'array',
              data: {
                values: ['0', '1', '2', '3', '4'],
                highlightIndices: [0, 1, 2, 3, 4],
                labels: { title: 'range(5)' },
              },
              caption: 'range(5) produces values 0 through 4 (exclusive end)',
            },
            codeHighlightLines: [2, 7, 13, 19],
          },
          {
            heading: 'Iterating Lists, Dicts, and Strings',
            content:
              'Here\'s where Python\'s `for` loop really shines compared to other languages: it works the same way with *everything*. Lists, tuples, strings, dictionaries, sets, files -- they\'re all iterable, and the syntax is always `for item in collection:`. You don\'t need to think about indexes or sizes or special methods. When you iterate over a dictionary, you get the keys by default. Want the values? Use `.values()`. Want both? Use `.items()` and Python will unpack each key-value pair right into your loop variables. Strings iterate character by character. This consistency is one of the things that makes Python feel so natural -- learn the pattern once, and it works everywhere.',
            code: `# Iterate over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(f"I like {fruit}")

print()

# Iterate over a dictionary
scores = {"Alice": 95, "Bob": 87, "Charlie": 92}
for name, score in scores.items():
    print(f"{name}: {score}")

print()

# Iterate over a string
word = "Python"
vowels = "aeiouAEIOU"
for char in word:
    label = "vowel" if char in vowels else "consonant"
    print(f"'{char}' is a {label}")

print()

# Iterate over a set (order is not guaranteed)
unique_nums = {3, 1, 4, 1, 5, 9}
print(f"Set: {unique_nums}")
for num in unique_nums:
    print(num, end=" ")
print()`,
            output: `I like apple
I like banana
I like cherry

Alice: 95
Bob: 87
Charlie: 92

'P' is a consonant
'y' is a consonant
't' is a consonant
'h' is a consonant
'o' is a vowel
'n' is a consonant

Set: {1, 3, 4, 5, 9}
1 3 4 5 9`,
            warning: 'Never modify a collection while you\'re iterating over it. Adding or removing items from a list or dictionary during a `for` loop leads to confusing bugs or outright crashes. If you need to filter items, iterate over a copy (`for item in my_list.copy():`) or build a new collection.',
            note: 'Sets are unordered, so the iteration order might differ from the order you wrote the elements in. If you need a guaranteed order, use a list. If you need both uniqueness and order, use `dict.fromkeys()` (since Python 3.7+ dictionaries maintain insertion order).',
            analogy: 'Think of it like a tour guide walking a group through rooms of a museum. Each room is a collection type (list, dict, string, set), and the guide uses the exact same "follow me, one at a time" protocol in every room. The rooms look different, but the walking pattern is always the same.',
            diagram: {
              kind: 'custom',
              type: 'hash-map',
              data: {
                buckets: [
                  { key: 'Alice', value: '95' },
                  { key: 'Bob', value: '87' },
                  { key: 'Charlie', value: '92' },
                ],
              },
              caption: 'Iterating a dict with .items() yields (key, value) pairs',
            },
          },
          {
            heading: 'enumerate() and zip()',
            content:
              'Two of the most useful tools in Python\'s toolbox are `enumerate()` and `zip()`, and once you learn them, you\'ll use them constantly. Have you ever needed both the index *and* the value while looping through a list? That\'s `enumerate()` -- it wraps any iterable and gives you `(index, value)` pairs, saving you from the ugly `range(len(x))` pattern. Need to walk through two (or more!) lists at the same time? That\'s `zip()` -- it pairs up elements from multiple iterables and lets you loop through them in lockstep. Both are lazy (memory-efficient), and both make your code dramatically more readable. You might be wondering what happens when the lists have different lengths: `zip()` stops at the shortest one by default, which is usually what you want.',
            code: `# enumerate: get index and value
languages = ["Python", "JavaScript", "Rust", "Go"]
for idx, lang in enumerate(languages):
    print(f"{idx}: {lang}")

print()

# enumerate with custom start index
for rank, lang in enumerate(languages, start=1):
    print(f"#{rank} {lang}")

print()

# zip: iterate in parallel
names = ["Alice", "Bob", "Charlie"]
ages = [30, 25, 35]
cities = ["NYC", "London", "Tokyo"]

for name, age, city in zip(names, ages, cities):
    print(f"{name}, age {age}, lives in {city}")

print()

# Practical: create a dict from two lists
keys = ["name", "role", "level"]
values = ["Alice", "Engineer", "Senior"]
profile = dict(zip(keys, values))
print(f"Profile: {profile}")`,
            output: `0: Python
1: JavaScript
2: Rust
3: Go

#1 Python
#2 JavaScript
#3 Rust
#4 Go

Alice, age 30, lives in NYC
Bob, age 25, lives in London
Charlie, age 35, lives in Tokyo

Profile: {'name': 'Alice', 'role': 'Engineer', 'level': 'Senior'}`,
            tip: 'This is one of the most important Pythonic patterns to learn: never write `for i in range(len(my_list)):` and then access `my_list[i]` inside the loop. Instead, use `for i, item in enumerate(my_list):`. It\'s cleaner, faster, and eliminates a whole category of off-by-one errors.',
            warning: 'When using `zip()` with iterables of different lengths, the extra elements from the longer iterable are silently dropped. If this matters, use `itertools.zip_longest(a, b, fillvalue=None)` to pad the shorter iterable with a default value. Silent data loss is one of the sneakiest bugs in Python.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n    subgraph "zip(names, ages, cities)"\n        direction TB\n        A1["Alice"] ~~~ A2["30"] ~~~ A3["NYC"]\n        B1["Bob"] ~~~ B2["25"] ~~~ B3["London"]\n        C1["Charlie"] ~~~ C2["35"] ~~~ C3["Tokyo"]\n    end',
              caption: 'zip() pairs up elements from multiple iterables in lockstep',
            },
            codeHighlightLines: [3, 9, 19, 27],
          },
        ],
        quiz: [
          {
            question: 'What does range(2, 10, 3) produce?',
            options: ['[2, 5, 8]', '[2, 5, 8, 11]', '[3, 6, 9]', '[2, 4, 6, 8]'],
            correctIndex: 0,
            explanation: 'range(2, 10, 3) starts at 2, steps by 3, and stops before 10. So it produces 2, 5, 8.',
          },
          {
            question: 'What does enumerate(["a", "b", "c"], start=1) yield?',
            options: ['[(0, "a"), (1, "b"), (2, "c")]', '[(1, "a"), (2, "b"), (3, "c")]', '["a", "b", "c"]', '[(1, "b"), (2, "c")]'],
            correctIndex: 1,
            explanation: 'enumerate with start=1 begins the counter at 1 instead of the default 0, yielding (1, "a"), (2, "b"), (3, "c").',
          },
          {
            question: 'What happens when zip() is called with iterables of different lengths?',
            options: ['It raises a ValueError', 'It pads the shorter iterable with None', 'It stops at the shortest iterable', 'It stops at the longest iterable'],
            correctIndex: 2,
            explanation: 'By default, zip() stops when the shortest iterable is exhausted. Extra elements from longer iterables are silently ignored. Use itertools.zip_longest() to include all elements.',
          },
          {
            question: 'Which is the Pythonic way to iterate over a list with both index and value?',
            options: ['for i in range(len(lst)): val = lst[i]', 'for i, val in enumerate(lst):', 'for val in lst: i = lst.index(val)', 'while i < len(lst): val = lst[i]; i += 1'],
            correctIndex: 1,
            explanation: 'enumerate() is the idiomatic Python way to get both the index and value. It is cleaner, more readable, and avoids off-by-one errors compared to range(len(...)).',
          },
        ],
        challenge: {
          prompt: 'Write a function called zip_to_dict that takes two lists (keys and values) and returns a dictionary. If the lists have different lengths, only pair up elements up to the length of the shorter list. Do NOT use the dict(zip(...)) shortcut — use a for loop with enumerate or zip manually.',
          starterCode: `def zip_to_dict(keys, values):
    # Your code here
    pass

# Test cases
print(zip_to_dict(["a", "b", "c"], [1, 2, 3]))
# {"a": 1, "b": 2, "c": 3}

print(zip_to_dict(["x", "y"], [10, 20, 30]))
# {"x": 10, "y": 20}

print(zip_to_dict([], [1, 2]))
# {}`,
          solutionCode: `def zip_to_dict(keys, values):
    result = {}
    for i in range(min(len(keys), len(values))):
        result[keys[i]] = values[i]
    return result

# Test cases
print(zip_to_dict(["a", "b", "c"], [1, 2, 3]))
# {"a": 1, "b": 2, "c": 3}

print(zip_to_dict(["x", "y"], [10, 20, 30]))
# {"x": 10, "y": 20}

print(zip_to_dict([], [1, 2]))
# {}`,
          hints: [
            'Use range() with the minimum of the two list lengths to avoid going out of bounds.',
            'Build an empty dictionary and add key-value pairs one at a time inside the loop.',
            'min(len(keys), len(values)) gives you the safe upper bound for iteration.',
          ],
        },
      },

      /* ======== break-statement ======== */
      {
        id: 'break-statement',
        title: 'Break Statement',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Breaking Out of Loops',
            content:
              'Sometimes you don\'t need to go through an entire sequence -- you just need to find the first thing that matches and get out. That\'s what `break` is for. It immediately terminates the innermost loop it\'s inside and jumps to the first statement after the loop. Think of it like hitting the emergency stop button on a conveyor belt. Why is this useful? Efficiency. If you\'re searching a million-item list for one specific value and you find it at position 3, there\'s no reason to check the remaining 999,997 items. `break` gives you that early exit. It works in both `for` and `while` loops, and it pairs beautifully with `for-else` to handle the "not found" case.',
            code: `# Find the first even number in a list
numbers = [7, 3, 11, 8, 5, 2, 9]

for num in numbers:
    if num % 2 == 0:
        print(f"First even number: {num}")
        break
else:
    print("No even numbers found")

# break in a while loop
print("\\nSearching for a prime > 50...")
candidate = 51
while True:
    # Simple primality check
    is_prime = candidate > 1
    for i in range(2, int(candidate ** 0.5) + 1):
        if candidate % i == 0:
            is_prime = False
            break
    if is_prime:
        print(f"Found prime: {candidate}")
        break
    candidate += 1`,
            output: `First even number: 8

Searching for a prime > 50...
Found prime: 53`,
            tip: 'The `for-else` construct is tailor-made for search patterns: the loop searches for something, `break` exits when it\'s found, and `else` handles the "not found" case. It\'s a Python-unique feature that eliminates the need for a `found = False` flag variable, resulting in cleaner, more expressive code.',
            note: 'In the prime search example, notice how `break` is used at two levels: the inner `for` loop uses `break` to stop checking divisors once a factor is found, and the outer `while True` loop uses `break` to stop searching once a prime is found. Each `break` only affects its own loop.',
            analogy: 'Think of it like scanning through a filing cabinet: you open each drawer and flip through folders until you find the document you need, then you slam the drawer shut and walk away. You do not keep opening the remaining drawers.',
            codeHighlightLines: [5, 6, 7, 20, 23],
          },
          {
            heading: 'break in Nested Loops',
            content:
              'Here\'s something that trips people up: `break` only exits the *innermost* loop. If you have a loop inside a loop and you `break` from the inner one, the outer loop keeps running. This is by design, but it means you can\'t directly "break out of two loops at once." So how do you handle it? The cleanest approach is to extract the nested loop into a separate function and use `return` instead of `break`. The `return` exits the entire function, effectively breaking out of all loop levels at once. Other options include flag variables (works but messy) or raising exceptions (technically works but overkill for control flow). The function extraction approach wins because it also gives your code better structure and a descriptive name for what the search is doing.',
            code: `# break only exits the inner loop
print("Inner break only:")
for i in range(3):
    for j in range(3):
        if j == 2:
            break  # only breaks inner loop
        print(f"  i={i}, j={j}")
    print(f"  (inner loop ended for i={i})")

print()

# Solution: extract to function + return
def find_in_matrix(matrix: list[list[int]], target: int):
    """Find target in a 2D list, return (row, col) or None."""
    for row_idx, row in enumerate(matrix):
        for col_idx, value in enumerate(row):
            if value == target:
                return (row_idx, col_idx)
    return None

matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]

pos = find_in_matrix(matrix, 5)
print(f"Found 5 at position: {pos}")

pos = find_in_matrix(matrix, 99)
print(f"Found 99 at position: {pos}")`,
            output: `Inner break only:
  i=0, j=0
  i=0, j=1
  (inner loop ended for i=0)
  i=1, j=0
  i=1, j=1
  (inner loop ended for i=1)
  i=2, j=0
  i=2, j=1
  (inner loop ended for i=2)

Found 5 at position: (1, 1)
Found 99 at position: None`,
            warning: 'A common mistake: trying to use `break` to exit an outer loop from inside an inner loop. It won\'t work -- `break` always targets the nearest enclosing loop. If you catch yourself adding `should_break` flag variables to coordinate between loop levels, that\'s a strong signal to refactor into a function.',
            tip: 'Some languages (like Java and JavaScript) support labeled `break` statements that can target outer loops. Python intentionally omits this feature because Guido van Rossum believed it encourages spaghetti code. The "extract to a function" approach is the Pythonic solution, and it usually results in better-organized code anyway.',
          },
          {
            heading: 'Practical break Patterns',
            content:
              'In real-world projects, you\'ll encounter `break` in a handful of recurring patterns, and recognizing them will make you a faster, more fluent programmer. The most common is *early termination*: once you\'ve found what you need, stop looking. This turns what would be an O(n) "always scan everything" operation into one that can finish in O(1) in the best case. You\'ll also see `break` in *quota patterns* (collect up to N items, then stop), *validation patterns* (check records until the first failure), and *sentinel patterns* (process input until a special "stop" value appears). Combined with `for-else`, `break` gives you an elegant vocabulary for expressing search-and-handle-not-found logic without auxiliary variables.',
            code: `# Pattern 1: First match with threshold
prices = [12.50, 8.99, 45.00, 3.25, 67.80, 15.00]
budget = 10.0

affordable = []
for price in prices:
    if len(affordable) >= 3:
        break  # we have enough options
    if price <= budget:
        affordable.append(price)

print(f"Affordable items (max 3): {affordable}")

# Pattern 2: Validate all items, stop on first failure
records = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": -5},
    {"name": "Charlie", "age": 25},
]

print("\\nValidation:")
all_valid = True
for record in records:
    if record["age"] < 0:
        print(f"  Invalid: {record['name']} has negative age")
        all_valid = False
        break
    print(f"  Valid: {record['name']}")

print(f"  All records valid: {all_valid}")`,
            output: `Affordable items (max 3): [8.99, 3.25]

Validation:
  Valid: Alice
  Invalid: Bob has negative age
  All records valid: False`,
            tip: 'When you find yourself reaching for `break` inside deeply nested or complex logic, take it as a refactoring signal. Extract the loop into its own function that `return`s early. Functions with clear names like `find_first_invalid_record()` are almost always easier to read, test, and maintain than inline loops with `break`.',
          },
        ],
        quiz: [
          {
            question: 'Which loop does a break statement exit?',
            options: ['All enclosing loops', 'The outermost loop', 'The innermost enclosing loop', 'Only while loops, not for loops'],
            correctIndex: 2,
            explanation: 'break only exits the innermost loop that contains it. Outer loops continue running normally. To exit multiple levels, extract to a function and use return.',
          },
          {
            question: 'What does the else block on a for loop do?',
            options: ['Runs if the loop body raised an exception', 'Runs every time the loop finishes', 'Runs only if the loop completed without hitting break', 'Runs only if the loop was empty'],
            correctIndex: 2,
            explanation: 'The else clause on a for (or while) loop executes only when the loop finishes normally without a break. If break fires, else is skipped.',
          },
          {
            question: 'What is the recommended way to break out of two nested loops in Python?',
            options: ['Use break twice', 'Use a labeled break statement', 'Extract the nested loop into a function and use return', 'Use goto'],
            correctIndex: 2,
            explanation: 'Python does not support labeled breaks or goto. The Pythonic approach is to move the nested loop into a function and use return to exit all loop levels at once.',
          },
        ],
        challenge: {
          prompt: 'Write a function called find_pair_with_sum that takes a list of integers and a target sum. Return the first pair of numbers (as a tuple) whose sum equals the target. Search by trying all pairs (i, j) where i comes before j in the list. Return None if no pair is found. Use break or return for early termination.',
          starterCode: `def find_pair_with_sum(numbers, target):
    # Your code here
    pass

# Test cases
print(find_pair_with_sum([1, 4, 7, 3, 9], 10))   # (1, 9) or (7, 3)
print(find_pair_with_sum([2, 5, 8, 1], 6))         # (5, 1)
print(find_pair_with_sum([1, 2, 3], 100))           # None`,
          solutionCode: `def find_pair_with_sum(numbers, target):
    for i in range(len(numbers)):
        for j in range(i + 1, len(numbers)):
            if numbers[i] + numbers[j] == target:
                return (numbers[i], numbers[j])
    return None

# Test cases
print(find_pair_with_sum([1, 4, 7, 3, 9], 10))   # (1, 9)
print(find_pair_with_sum([2, 5, 8, 1], 6))         # (5, 1)
print(find_pair_with_sum([1, 2, 3], 100))           # None`,
          hints: [
            'Use two nested for loops: the outer loop picks the first element, and the inner loop picks the second element from the remaining items.',
            'Use return to immediately exit both loops when a matching pair is found.',
            'If no pair is found after all iterations, return None at the end of the function.',
          ],
        },
      },

      /* ======== continue-statement ======== */
      {
        id: 'continue-statement',
        title: 'Continue Statement',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Skipping Iterations with continue',
            content:
              'If `break` is the emergency stop button, `continue` is the "skip" button on a music player. It says: "I\'m done with *this* iteration -- move on to the next one." The rest of the loop body below the `continue` is skipped, and the loop jumps straight to the next iteration (in a `for` loop) or back to the condition check (in a `while` loop). Why is this so useful? Because it helps you avoid the "pyramid of doom" -- that deeply nested code where the main logic is buried under layers of `if` blocks. Instead of wrapping your entire loop body in `if should_process:`, you can put `if should_skip: continue` right at the top. This pattern, sometimes called a *guard clause*, keeps your main logic at the shallowest indentation level, making it dramatically easier to read.',
            code: `# Skip odd numbers, print only evens
print("Even numbers from 1-10:")
for num in range(1, 11):
    if num % 2 != 0:
        continue
    print(num, end=" ")
print()

# Skip blank lines when processing text
lines = [
    "Hello, World!",
    "",
    "  ",
    "Python is great.",
    "",
    "Keep learning!",
]

print("\\nNon-empty lines:")
for line in lines:
    if not line.strip():
        continue
    print(f"  -> {line.strip()}")`,
            output: `Even numbers from 1-10:
2 4 6 8 10

Non-empty lines:
  -> Hello, World!
  -> Python is great.
  -> Keep learning!`,
            tip: 'Guard clauses with `continue` are the loop equivalent of early `return` in functions. Both exist to handle the "boring" cases first so the interesting logic stays at the top level of indentation. Seasoned Python developers use this pattern extensively -- it\'s a hallmark of clean, readable code.',
            note: 'In the even numbers example, you could also write `if num % 2 == 0: print(num)` and skip the `continue` entirely. Both approaches work. Use `continue` when the "skip" condition is simpler to express than the "process" condition, or when the processing logic is long enough that wrapping it all in an `if` would hurt readability.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    A["for num in range(1, 11)"] --> B{"num % 2 != 0?"}\n    B -- Yes --> C["continue\\n(skip to next)"]\n    C --> A\n    B -- No --> D["print(num)"]\n    D --> A',
              caption: 'continue skips the rest of the loop body and jumps to the next iteration',
            },
            codeHighlightLines: [4, 5, 21, 22],
          },
          {
            heading: 'continue with while Loops',
            content:
              'Using `continue` in `while` loops requires an extra dose of caution that `for` loops don\'t. Here\'s why: in a `for` loop, Python automatically advances to the next item, so `continue` always makes progress. But in a `while` loop, *you* are responsible for updating the loop variable. If your counter increment comes *after* the `continue`, it will never execute for skipped iterations, and you\'ll be stuck in an infinite loop. The golden rule is: put your counter update *before* any `continue` statement. Better yet, put it at the very first line of the loop body so it always runs no matter what. This one habit will save you from one of the most common `while` loop bugs.',
            code: `# Correct: increment BEFORE continue
print("Skip multiples of 3 (1-15):")
i = 0
while i < 15:
    i += 1  # increment FIRST, before any continue
    if i % 3 == 0:
        continue
    print(i, end=" ")
print()

# Practical: process items with error handling
items = [10, "bad", 20, None, 30, "oops", 40]
total = 0
skipped = 0

print("\\nProcessing items:")
idx = 0
while idx < len(items):
    item = items[idx]
    idx += 1  # always increment before continue
    if not isinstance(item, (int, float)):
        print(f"  Skipped non-numeric: {item!r}")
        skipped += 1
        continue
    total += item
    print(f"  Added {item}, running total: {total}")

print(f"\\nTotal: {total}, Skipped: {skipped}")`,
            output: `Skip multiples of 3 (1-15):
1 2 4 5 7 8 10 11 13 14

Processing items:
  Added 10, running total: 10
  Skipped non-numeric: 'bad'
  Added 20, running total: 30
  Skipped non-numeric: None
  Added 30, running total: 60
  Skipped non-numeric: 'oops'
  Added 40, running total: 100

Total: 100, Skipped: 3`,
            warning: 'This is a genuine beginner trap: if you write `while i < 10:` with `i += 1` at the *bottom* of the loop and a `continue` in the middle, any iteration that hits `continue` will skip the increment, and `i` will never change. Your loop will run forever, printing the same output endlessly. Always increment first.',
            codeHighlightLines: [5, 6, 7, 20, 21, 24],
          },
          {
            heading: 'Practical continue Examples',
            content:
              'In real-world code, `continue` is your best friend for data processing pipelines. Picture this: you\'re reading records from a database or API, and some records are incomplete, inactive, or invalid. Instead of wrapping your entire processing logic inside `if record_is_valid and record_is_active and record_has_data:`, you place small, focused guard checks at the top of the loop: `if not active: continue`, `if grade is None: continue`. Each guard handles one specific reason to skip. This approach is self-documenting -- anyone reading the code can immediately see all the skip conditions listed cleanly at the top, with the core logic below, uncluttered and easy to follow.',
            code: `# Process student records, skip incomplete ones
students = [
    {"name": "Alice", "grade": 92, "active": True},
    {"name": "Bob", "grade": None, "active": True},
    {"name": "Charlie", "grade": 85, "active": False},
    {"name": "Diana", "grade": 78, "active": True},
    {"name": "Eve", "grade": 95, "active": True},
]

print("Active students with grades:")
honor_roll = []
for student in students:
    # Guard clauses with continue
    if not student["active"]:
        continue
    if student["grade"] is None:
        continue

    name = student["name"]
    grade = student["grade"]
    print(f"  {name}: {grade}")

    if grade >= 90:
        honor_roll.append(name)

print(f"\\nHonor roll (>= 90): {honor_roll}")

# Combine continue with enumerate for indexed filtering
print("\\nWords with 5+ characters:")
words = ["hi", "python", "is", "absolutely", "great", "ok", "fantastic"]
for i, word in enumerate(words):
    if len(word) < 5:
        continue
    print(f"  [{i}] {word} ({len(word)} chars)")`,
            output: `Active students with grades:
  Alice: 92
  Diana: 78
  Eve: 95

Honor roll (>= 90): ['Alice', 'Eve']

Words with 5+ characters:
  [1] python (6 chars)
  [3] absolutely (10 chars)
  [4] great (5 chars)
  [6] fantastic (9 chars)`,
            tip: 'Think of `continue` as an "early reject" for loop iterations, just like `return` is an "early exit" for functions. Both follow the same philosophy: handle the edge cases and exceptions first, then let the main logic flow cleanly without extra indentation. This pattern scales beautifully -- even with 10 skip conditions, your core logic stays at one indent level.',
            note: 'For simple filtering, list comprehensions or generator expressions are often even cleaner than `continue`. For example, `[s for s in students if s["active"] and s["grade"] is not None]` achieves the same filtering in a single expression. Use `continue` when the loop body has complex processing logic beyond simple filtering.',
          },
        ],
        quiz: [
          {
            question: 'What does the continue statement do in a loop?',
            options: ['Exits the loop entirely', 'Skips the rest of the current iteration and moves to the next', 'Restarts the loop from the beginning', 'Pauses the loop for one second'],
            correctIndex: 1,
            explanation: 'continue skips the remaining code in the current iteration and jumps to the next iteration of the loop (or back to the condition check in a while loop).',
          },
          {
            question: 'What is the main danger of using continue in a while loop?',
            options: ['It can cause a SyntaxError', 'It might skip the counter update and cause an infinite loop', 'It exits the while loop prematurely', 'It converts the while loop into a for loop'],
            correctIndex: 1,
            explanation: 'If the counter increment is placed after the continue statement, it will be skipped for iterations that hit continue, potentially causing an infinite loop. Always increment before any continue.',
          },
          {
            question: 'What is a "guard clause" in the context of loops?',
            options: ['A try/except block inside a loop', 'A continue statement at the top of the loop body that skips unwanted iterations', 'A break statement that protects against infinite loops', 'An assert statement that validates loop variables'],
            correctIndex: 1,
            explanation: 'A guard clause uses continue at the top of a loop body to reject iterations that do not meet certain criteria, keeping the main logic at a shallow indentation level.',
          },
        ],
        challenge: {
          prompt: 'Write a function called process_scores that takes a list of dictionaries with "name" and "score" keys. Skip any entries where score is None or negative. For valid entries, collect them into a list of strings formatted as "Name: Score". Return the list. Use continue for the guard clauses.',
          starterCode: `def process_scores(entries):
    # Your code here
    pass

# Test cases
data = [
    {"name": "Alice", "score": 92},
    {"name": "Bob", "score": None},
    {"name": "Charlie", "score": -1},
    {"name": "Diana", "score": 78},
    {"name": "Eve", "score": 0},
]
print(process_scores(data))
# ["Alice: 92", "Diana: 78", "Eve: 0"]`,
          solutionCode: `def process_scores(entries):
    results = []
    for entry in entries:
        if entry["score"] is None:
            continue
        if entry["score"] < 0:
            continue
        results.append(f"{entry['name']}: {entry['score']}")
    return results

# Test cases
data = [
    {"name": "Alice", "score": 92},
    {"name": "Bob", "score": None},
    {"name": "Charlie", "score": -1},
    {"name": "Diana", "score": 78},
    {"name": "Eve", "score": 0},
]
print(process_scores(data))
# ["Alice: 92", "Diana: 78", "Eve: 0"]`,
          hints: [
            'Check for None first (before checking if the score is negative) to avoid a TypeError when comparing None < 0.',
            'Use separate guard clauses with continue for each invalid condition rather than combining them into one complex if statement.',
            'A score of 0 is valid (not negative), so make sure your condition uses < 0, not <= 0.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Functions                                                    */
  /* ------------------------------------------------------------ */
  {
    id: 'functions',
    label: 'Functions',
    icon: 'Zap',
    entries: [
      /* ======== functions ======== */
      {
        id: 'functions',
        title: 'Functions',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Defining Functions with def',
            content:
              'Think of a function like a recipe. It has a name (so you can find it again), a list of ingredients (parameters), a set of steps (the body), and it produces a dish (the return value). In Python, you define a function with the `def` keyword, give it a descriptive name in `snake_case`, list the parameters in parentheses, and end the line with a colon. Everything indented below is the function body. The beauty of functions is that you write the logic once and call it as many times as you want with different inputs. This is the single most important tool for organizing your code -- it turns a tangled mess of repeated logic into clean, named, reusable building blocks. One more thing: right after the `def` line, you can write a *docstring* -- a string that describes what the function does. Good developers always write docstrings.',
            code: `def greet(name: str) -> str:
    """Return a greeting message for the given name."""
    return f"Hello, {name}! Welcome aboard."

# Call the function
message = greet("Alice")
print(message)
print(greet("Bob"))

# A function that performs an action (no return value)
def print_separator(char: str = "-", width: int = 40):
    """Print a visual separator line."""
    print(char * width)

print_separator()
print("Section Title")
print_separator("=", 40)`,
            output: `Hello, Alice! Welcome aboard.
Hello, Bob! Welcome aboard.
----------------------------------------
Section Title
========================================`,
            tip: 'A function without an explicit `return` statement returns `None` automatically. This is fine for functions that *do* something (print, write to a file, update a database), but if your function is meant to *compute* something, always use `return` to send the result back. Relying on `None` as an accidental return value is a common source of confusing bugs.',
            note: 'Docstrings aren\'t just comments -- they\'re accessible at runtime via `help(greet)` or `greet.__doc__`. Tools like Sphinx can also auto-generate documentation from them. Writing good docstrings is an investment that pays off massively as your codebase grows.',
            analogy: 'Think of it like a vending machine: you put in your selection (arguments), the machine does its internal work (function body), and out comes your product (return value). You do not need to know how the machine works inside to use it.',
            codeHighlightLines: [1, 2, 3, 11],
          },
          {
            heading: 'Parameters and Default Values',
            content:
              'Python gives you a remarkably flexible system for passing data into functions. *Positional* parameters must be provided in order. *Default* parameters have a fallback value and become optional -- if the caller doesn\'t provide them, the default kicks in. You can also pass arguments by *keyword* name, in any order, which is a game-changer for readability when a function takes many parameters. Now, here\'s the most important warning in all of Python: **never use a mutable object (list, dict, set) as a default parameter value**. Python evaluates default values once, when the function is defined, not each time it\'s called. So every call that uses the default shares the *same* object. This leads to one of the most notorious bugs in the language. The fix is simple: use `None` as the default and create a fresh object inside the function.',
            code: `def create_profile(name: str, age: int, city: str = "Unknown",
                    active: bool = True) -> dict:
    """Create a user profile dictionary."""
    return {
        "name": name,
        "age": age,
        "city": city,
        "active": active,
    }

# Positional arguments
p1 = create_profile("Alice", 30, "NYC")
print(p1)

# Keyword arguments (any order)
p2 = create_profile(age=25, name="Bob", active=False)
print(p2)

# Mutable default gotcha -- WRONG way
def add_item_bad(item, items=[]):
    items.append(item)
    return items

print(add_item_bad("a"))  # ["a"]
print(add_item_bad("b"))  # ["a", "b"] -- oops! same list!

# Correct way: use None as default
def add_item_good(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items

print(add_item_good("a"))  # ["a"]
print(add_item_good("b"))  # ["b"] -- fresh list each time`,
            output: `{'name': 'Alice', 'age': 30, 'city': 'NYC', 'active': True}
{'name': 'Bob', 'age': 25, 'city': 'Unknown', 'active': False}
['a']
['a', 'b']
['a']
['b']`,
            warning: 'The mutable default argument trap is arguably the #1 Python gotcha. It has bitten every Python developer at least once. When you write `def f(items=[]):`, that empty list is created *once* at function definition time and shared across all calls. Always use `None` as a sentinel and create a new mutable object inside the function body. This pattern should become muscle memory.',
            tip: 'Keyword arguments shine when a function has boolean flags or multiple optional parameters. Compare `create_user("Alice", True, False, True)` (what do those booleans mean?) with `create_user("Alice", admin=True, active=False, verified=True)`. The keyword version is self-documenting.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  { label: 'Function defined', address: 'def add_item_bad(item, items=[])', content: 'items default -> list obj at 0xABC' },
                  { label: 'Call 1: add_item_bad("a")', address: 'uses default', content: 'items -> 0xABC -> ["a"]' },
                  { label: 'Call 2: add_item_bad("b")', address: 'uses SAME default', content: 'items -> 0xABC -> ["a", "b"]' },
                ],
              },
              caption: 'The mutable default trap: all calls share the same list object created at definition time',
            },
            codeHighlightLines: [20, 28, 29, 30],
          },
          {
            heading: '*args and **kwargs',
            content:
              'What if you don\'t know in advance how many arguments a function will receive? Enter `*args` and `**kwargs` -- Python\'s way of saying "accept anything." `*args` collects any extra positional arguments into a tuple, and `**kwargs` collects any extra keyword arguments into a dictionary. The names `args` and `kwargs` are just conventions -- it\'s the `*` and `**` that do the magic. You\'ll see this pattern everywhere: in decorator functions that need to transparently forward arguments, in functions that wrap other functions, and in APIs that need maximum flexibility. You can mix them with regular parameters too, but the order matters: regular parameters first, then `*args`, then `**kwargs`. Once you understand this, you\'ll be able to read and write some of the most powerful patterns in Python.',
            code: `# *args: variable positional arguments
def calculate_sum(*numbers):
    """Sum any number of arguments."""
    total = sum(numbers)
    print(f"Sum of {numbers} = {total}")
    return total

calculate_sum(1, 2, 3)
calculate_sum(10, 20, 30, 40, 50)

# **kwargs: variable keyword arguments
def build_query(**filters):
    """Build a query string from keyword arguments."""
    parts = [f"{key}={value}" for key, value in filters.items()]
    query = " AND ".join(parts)
    print(f"Query: {query}")
    return query

print()
build_query(status="active", role="admin")
build_query(age=25, city="NYC", department="Engineering")

# Combining regular params, *args, and **kwargs
def log_message(level: str, *messages, **metadata):
    """Log messages with metadata."""
    combined = " | ".join(messages)
    meta_str = ", ".join(f"{k}={v}" for k, v in metadata.items())
    print(f"[{level.upper()}] {combined}")
    if meta_str:
        print(f"  metadata: {meta_str}")

print()
log_message("info", "Server started", "Port 8080", host="localhost")
log_message("error", "Connection failed", retry=3, timeout=30)`,
            output: `Sum of (1, 2, 3) = 6
Sum of (10, 20, 30, 40, 50) = 150

Query: status=active AND role=admin
Query: age=25 AND city=NYC AND department=Engineering

[INFO] Server started | Port 8080
  metadata: host=localhost
[ERROR] Connection failed
  metadata: retry=3, timeout=30`,
            tip: 'You can also use `*` and `**` on the *calling* side to unpack sequences and dictionaries into arguments. For example: `args = [1, 2, 3]; calculate_sum(*args)` or `config = {"host": "localhost"}; log_message("info", "Starting", **config)`. This symmetry between packing and unpacking is one of Python\'s most elegant features.',
            warning: 'Don\'t overuse `*args` and `**kwargs`. When a function accepts anything, its signature tells you nothing about what it actually needs. Prefer explicit parameters with type hints for most functions. Reserve `*args`/`**kwargs` for genuine cases like decorators, wrappers, and callback systems where flexibility is the whole point.',
            analogy: 'Think of *args like a box that catches all the loose items thrown in (positional), and **kwargs like a labeled filing cabinet that catches all the named envelopes (keyword). Together, they let a function accept whatever you throw at it.',
          },
          {
            heading: 'Return Values and Type Hints',
            content:
              'Functions communicate their results back to the caller through `return`. And here\'s something lovely about Python: a function can return *multiple* values just by separating them with commas. Under the hood, Python packs them into a tuple, and you can unpack them on the receiving end with a matching number of variables. It feels magical, but it\'s just tuple packing and unpacking. Now let\'s talk about type hints. Python is dynamically typed, so it won\'t stop you from passing a string where an int is expected. Type hints are your way of documenting the contract: "this function expects these types and returns this type." Python doesn\'t enforce them at runtime, but tools like `mypy` can check them statically, and your IDE uses them for autocompletion and error detection. Think of type hints as guardrails -- they catch bugs before they become runtime errors and make your code self-documenting.',
            code: `# Returning multiple values (tuple unpacking)
def min_max(numbers: list[int]) -> tuple[int, int]:
    """Return the minimum and maximum of a list."""
    return min(numbers), max(numbers)

lo, hi = min_max([3, 7, 1, 9, 4])
print(f"Min: {lo}, Max: {hi}")

# Returning early for guard clauses
def divide(a: float, b: float) -> float | None:
    """Divide a by b, returning None if b is zero."""
    if b == 0:
        return None
    return a / b

result = divide(10, 3)
print(f"10 / 3 = {result:.2f}" if result is not None else "Cannot divide")
print(f"10 / 0 = {divide(10, 0)}")

# Type hints with complex types
def filter_by_length(
    words: list[str],
    min_len: int = 1,
    max_len: int = 100,
) -> list[str]:
    """Filter words by length range (inclusive)."""
    return [w for w in words if min_len <= len(w) <= max_len]

words = ["a", "hi", "cat", "python", "extraordinary"]
short = filter_by_length(words, max_len=3)
long = filter_by_length(words, min_len=5)
print(f"\\nShort words (<=3): {short}")
print(f"Long words (>=5): {long}")`,
            output: `Min: 1, Max: 9
10 / 3 = 3.33
10 / 0 = None

Short words (<=3): ['a', 'hi', 'cat']
Long words (>=5): ['python', 'extraordinary']`,
            tip: 'When a function might return `None` (like our `divide` example), use the `float | None` syntax (Python 3.10+) or `Optional[float]` from the `typing` module. This tells the caller explicitly: "Hey, this might give you `None` -- handle it!" This small annotation prevents entire categories of `AttributeError: NoneType has no attribute...` crashes.',
            note: 'Don\'t worry if type hints feel like extra work at first. Start by adding them to function signatures (parameters and return types) -- that\'s where they give the most value. You don\'t need to annotate every local variable. As your projects grow, you\'ll appreciate having a clear contract at every function boundary.',
          },
        ],
        quiz: [
          {
            question: 'What does a Python function return if it has no explicit return statement?',
            options: ['0', 'An empty string', 'None', 'It raises an error'],
            correctIndex: 2,
            explanation: 'A function without a return statement (or with a bare return) implicitly returns None. This is fine for functions that perform side effects, but functions that compute values should always use return explicitly.',
          },
          {
            question: 'What is the bug in this code?\n\ndef add_item(item, items=[]):\n    items.append(item)\n    return items',
            options: ['items should be a tuple, not a list', 'The default mutable argument [] is shared across calls', 'append() does not work on default parameters', 'The function is missing a return type hint'],
            correctIndex: 1,
            explanation: 'Python evaluates default parameter values once at function definition time. Using a mutable default like [] means all calls that use the default share the same list object. Use None as the default and create a new list inside the function.',
          },
          {
            question: 'What does *args collect in a function signature?',
            options: ['Extra keyword arguments as a dictionary', 'Extra positional arguments as a tuple', 'All arguments as a list', 'Only string arguments'],
            correctIndex: 1,
            explanation: '*args collects any additional positional arguments into a tuple. **kwargs collects additional keyword arguments into a dictionary.',
          },
          {
            question: 'How do you return multiple values from a Python function?',
            options: ['Use an array keyword', 'Separate values with commas in the return statement', 'You cannot return multiple values', 'Use the yield keyword'],
            correctIndex: 1,
            explanation: 'Python lets you return multiple values by separating them with commas: return a, b, c. Under the hood, this creates a tuple that the caller can unpack: x, y, z = my_function().',
          },
        ],
        challenge: {
          prompt: 'Write a function called safe_divide that takes two parameters: numerator and denominator (both floats). It should return the result of division. If the denominator is zero, return None. Add a third optional parameter called round_to (default None) that, if provided, rounds the result to that many decimal places.',
          starterCode: `def safe_divide(numerator, denominator, round_to=None):
    # Your code here
    pass

# Test cases
print(safe_divide(10, 3))            # 3.3333333333333335
print(safe_divide(10, 3, round_to=2))  # 3.33
print(safe_divide(10, 0))            # None
print(safe_divide(7, 2, round_to=0))   # 4.0`,
          solutionCode: `def safe_divide(numerator, denominator, round_to=None):
    if denominator == 0:
        return None
    result = numerator / denominator
    if round_to is not None:
        result = round(result, round_to)
    return result

# Test cases
print(safe_divide(10, 3))            # 3.3333333333333335
print(safe_divide(10, 3, round_to=2))  # 3.33
print(safe_divide(10, 0))            # None
print(safe_divide(7, 2, round_to=0))   # 4.0`,
          hints: [
            'Check if the denominator is zero first and return None immediately (guard clause pattern).',
            'Use the built-in round() function with the round_to parameter when it is not None.',
            'Check round_to with "is not None" rather than just "if round_to" because round_to=0 is a valid value that is falsy.',
          ],
        },
      },

      /* ======== lambda ======== */
      {
        id: 'lambda',
        title: 'Lambda',
        difficulty: 'intermediate',
        sections: [
          {
            heading: 'Lambda Syntax and Basics',
            content:
              'A `lambda` is a tiny, anonymous function that you define inline. Think of it like a Post-it note versus a full letter -- when you just need a quick, throwaway function for a single use, writing a whole `def` block feels like overkill. The syntax is: `lambda parameters: expression`. There\'s no name, no `def`, no `return` keyword -- just the expression itself, and its result is automatically returned. But here\'s the key limitation: a `lambda` can only contain a *single expression*. No `if` blocks, no loops, no multi-line logic, no assignments. If your function needs any of those things, use `def`. Lambdas are best for short transformations -- sorting keys, quick math, simple callbacks -- where the meaning is obvious at a glance.',
            code: `# Basic lambda syntax
square = lambda x: x ** 2
print(f"square(5) = {square(5)}")

# Lambda with multiple arguments
add = lambda a, b: a + b
print(f"add(3, 4) = {add(3, 4)}")

# Lambda with default argument
greet = lambda name, greeting="Hello": f"{greeting}, {name}!"
print(greet("Alice"))
print(greet("Bob", "Hi"))

# Comparison: lambda vs def
# Lambda version
double = lambda x: x * 2

# Equivalent def version
def double_func(x):
    return x * 2

print(f"Lambda: {double(5)}, Def: {double_func(5)}")`,
            output: `square(5) = 25
add(3, 4) = 7
Hello, Alice!
Hi, Bob!
Lambda: 10, Def: 10`,
            tip: 'PEP 8 (Python\'s official style guide) explicitly discourages assigning a lambda to a variable like `square = lambda x: x ** 2`. If you\'re giving it a name, just use `def square(x): return x ** 2`. Lambdas are designed to be anonymous and inline -- the moment you name one, you\'ve lost the only advantage it had over `def`.',
            note: 'The word "lambda" comes from lambda calculus, a mathematical system developed by Alonzo Church in the 1930s. It\'s the foundation of functional programming. Don\'t let the fancy name intimidate you -- in Python, it\'s just a shorthand for simple functions.',
            analogy: 'Think of it like a sticky note with a quick formula scribbled on it, versus a formal typed document. Both convey information, but the sticky note is for quick, one-off use -- you would not file it away or reference it by title.',
          },
          {
            heading: 'Lambda with map(), filter(), and sorted()',
            content:
              'Lambdas truly earn their keep when used as arguments to higher-order functions -- functions that take other functions as input. The three you\'ll encounter most are `sorted()` (custom sort orders), `map()` (transform every item), and `filter()` (keep items that pass a test). In each case, you need a small function that you\'ll use exactly once, and defining a whole `def` block for it would clutter your code. That\'s the lambda sweet spot. However, here\'s an important nuance: for `map()` and `filter()` specifically, Python developers often prefer list comprehensions instead. A comprehension like `[x**2 for x in nums]` is usually clearer than `list(map(lambda x: x**2, nums))`. Where lambdas remain unbeatable is as the `key` parameter to `sorted()`, `min()`, and `max()` -- there\'s no comprehension equivalent for that.',
            code: `# sorted() with lambda key
students = [
    {"name": "Charlie", "gpa": 3.5},
    {"name": "Alice", "gpa": 3.9},
    {"name": "Bob", "gpa": 3.7},
]

by_gpa = sorted(students, key=lambda s: s["gpa"], reverse=True)
for s in by_gpa:
    print(f"  {s['name']}: {s['gpa']}")

print()

# map(): transform each element
numbers = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x ** 2, numbers))
print(f"Squares: {squares}")

# filter(): keep elements matching condition
evens = list(filter(lambda x: x % 2 == 0, range(1, 11)))
print(f"Evens: {evens}")

# Chaining map and filter
words = ["hello", "world", "hi", "python", "go", "lambda"]
long_upper = list(map(lambda w: w.upper(), filter(lambda w: len(w) > 3, words)))
print(f"Long words uppercased: {long_upper}")

# Equivalent list comprehension (often clearer)
long_upper_lc = [w.upper() for w in words if len(w) > 3]
print(f"Same with comprehension: {long_upper_lc}")`,
            output: `  Alice: 3.9
  Bob: 3.7
  Charlie: 3.5

Squares: [1, 4, 9, 16, 25]
Evens: [2, 4, 6, 8, 10]
Long words uppercased: ['HELLO', 'WORLD', 'PYTHON', 'LAMBDA']
Same with comprehension: ['HELLO', 'WORLD', 'PYTHON', 'LAMBDA']`,
            tip: 'For simple transforms and filters, list comprehensions like `[x**2 for x in nums]` are almost always preferred over `map(lambda x: x**2, nums)` in idiomatic Python. They\'re more readable and slightly faster. Save lambdas for `sorted()`, `min()`, `max()`, and callback-based APIs where you truly need to pass a function object.',
            note: 'Both `map()` and `filter()` return lazy iterators, not lists. That\'s why you see `list()` wrapped around them. If you\'re only iterating (not storing the result), you can skip the `list()` call and iterate directly: `for x in map(...):`.',
            codeHighlightLines: [8, 16, 20, 25],
          },
          {
            heading: 'Lambda Limitations and When to Use Them',
            content:
              'Let\'s be honest about what lambdas *can\'t* do, because knowing when *not* to use something is just as important as knowing when to use it. Lambdas are limited to a single expression -- no multi-line logic, no statements (like `if`/`else` blocks or `for` loops), no variable assignments, and no docstrings. They also make debugging harder because in error tracebacks, every lambda shows up as `<lambda>` instead of a descriptive function name, making it tough to figure out which one crashed. The decision framework is simple: if your function is short enough that defining it inline makes the *surrounding code* clearer, use a lambda. If the lambda itself needs explanation, or if you\'ll use it more than once, or if it contains any conditional logic more complex than a simple ternary, use `def`. Clarity always wins over cleverness.',
            code: `# Good lambda use: simple sort key
pairs = [(1, "banana"), (3, "apple"), (2, "cherry")]
sorted_pairs = sorted(pairs, key=lambda p: p[1])
print(f"Sorted by name: {sorted_pairs}")

# Good lambda use: quick callback
def apply_operation(x: int, y: int, op):
    return op(x, y)

print(f"Multiply: {apply_operation(5, 3, lambda a, b: a * b)}")
print(f"Power:    {apply_operation(2, 8, lambda a, b: a ** b)}")

# BAD: overly complex lambda (use def instead)
# classify = lambda x: "pos" if x > 0 else "neg" if x < 0 else "zero"

# GOOD: use def for complex logic
def classify(x: int) -> str:
    """Classify a number as positive, negative, or zero."""
    if x > 0:
        return "positive"
    elif x < 0:
        return "negative"
    return "zero"

for val in [5, -3, 0]:
    print(f"  {val} is {classify(val)}")`,
            output: `Sorted by name: [(3, 'apple'), (1, 'banana'), (2, 'cherry')]
Multiply: 15
Power:    256
  5 is positive
  -3 is negative
  0 is zero`,
            warning: 'If you find yourself writing a lambda with a nested ternary expression or struggling to fit the logic into one line, that\'s your cue to use `def` instead. A named function with a docstring will always be more maintainable than a clever one-liner that takes 30 seconds to decipher.',
            tip: 'A good litmus test: if you need to add a comment to explain what a lambda does, it\'s too complex to be a lambda. Promote it to a `def` with a descriptive name, and the name itself becomes the documentation.',
          },
        ],
        quiz: [
          {
            question: 'What is the key limitation of a lambda function compared to a def function?',
            options: ['Lambdas cannot take arguments', 'Lambdas can only contain a single expression', 'Lambdas are slower than def functions', 'Lambdas cannot return values'],
            correctIndex: 1,
            explanation: 'A lambda is limited to a single expression. It cannot contain statements like if blocks, for loops, or variable assignments. For anything more complex, use def.',
          },
          {
            question: 'What does sorted(["banana", "apple", "cherry"], key=lambda x: len(x)) return?',
            options: ['["apple", "banana", "cherry"]', '["cherry", "banana", "apple"]', '["apple", "cherry", "banana"]', '["banana", "apple", "cherry"]'],
            correctIndex: 2,
            explanation: 'The key function extracts the length of each string: "banana"=6, "apple"=5, "cherry"=6. Sorting by length with stable sort gives ["apple"(5), "cherry"(6), "banana"(6)] — but since "banana" and "cherry" have the same length, their original order is preserved, giving ["apple", "cherry", "banana"].',
          },
          {
            question: 'According to PEP 8, which usage of lambda is discouraged?',
            options: ['Using lambda as a sort key', 'Assigning a lambda to a variable name', 'Passing a lambda to map()', 'Using lambda with filter()'],
            correctIndex: 1,
            explanation: 'PEP 8 discourages assigning a lambda to a variable (e.g., square = lambda x: x**2). If you are naming it, you should use def instead, which also allows a docstring.',
          },
        ],
        challenge: {
          prompt: 'Given a list of dictionaries representing products with "name" and "price" keys, write code that: (1) sorts them by price ascending using sorted() with a lambda key, (2) extracts just the product names using map() with a lambda, and (3) filters to only products under $20 using filter() with a lambda. Store results in variables sorted_products, product_names, and affordable.',
          starterCode: `products = [
    {"name": "Keyboard", "price": 49.99},
    {"name": "Mouse", "price": 12.99},
    {"name": "USB Cable", "price": 7.50},
    {"name": "Monitor", "price": 199.99},
    {"name": "Mousepad", "price": 9.99},
]

# 1. Sort by price ascending
sorted_products = None  # Your code here

# 2. Extract product names from sorted list
product_names = None  # Your code here

# 3. Filter products under $20
affordable = None  # Your code here

print(sorted_products)
print(product_names)
print(affordable)`,
          solutionCode: `products = [
    {"name": "Keyboard", "price": 49.99},
    {"name": "Mouse", "price": 12.99},
    {"name": "USB Cable", "price": 7.50},
    {"name": "Monitor", "price": 199.99},
    {"name": "Mousepad", "price": 9.99},
]

# 1. Sort by price ascending
sorted_products = sorted(products, key=lambda p: p["price"])

# 2. Extract product names from sorted list
product_names = list(map(lambda p: p["name"], sorted_products))

# 3. Filter products under $20
affordable = list(filter(lambda p: p["price"] < 20, products))

print(sorted_products)
print(product_names)
print(affordable)`,
          hints: [
            'For sorted(), the key parameter should be a lambda that extracts the "price" value from each dictionary.',
            'map() returns a lazy iterator, so wrap it in list() to see the results.',
            'filter() also returns a lazy iterator. The lambda should return True for items you want to keep (price < 20).',
          ],
        },
      },

      /* ======== variables-scope ======== */
      {
        id: 'variables-scope',
        title: 'Variables Scope',
        difficulty: 'intermediate',
        sections: [
          {
            heading: 'Local vs Global Scope',
            content:
              'Here\'s a concept that trips up almost every beginner: where a variable "lives" determines where it can be seen and used. This is called *scope*. Variables created inside a function are *local* -- they\'re born when the function is called and they die when the function returns. They\'re invisible to the outside world. Variables created at the module level (outside any function) are *global* -- they\'re visible everywhere in the file. Here\'s the key insight that causes confusion: if you assign to a variable inside a function, Python creates a *new local variable* even if a global variable with the same name already exists. It does not modify the global. This is actually a safety feature -- it means functions can\'t accidentally stomp on each other\'s data. Parameters work the same way: they\'re local variables that happen to get their initial values from the caller.',
            code: `x = "global x"

def show_scopes():
    x = "local x"  # creates a NEW local variable, does NOT modify global
    print(f"Inside function: {x}")

show_scopes()
print(f"Outside function: {x}")

# Variables created inside a function are local
def create_local():
    secret = 42
    print(f"Inside: secret = {secret}")

create_local()

# This would raise NameError:
# print(secret)  # 'secret' does not exist here
print("'secret' is not accessible outside the function")

# Parameters are also local variables
def double(n):
    n = n * 2  # modifies the LOCAL n, not the caller's variable
    return n

value = 5
result = double(value)
print(f"\\nvalue = {value} (unchanged)")
print(f"result = {result}")`,
            output: `Inside function: local x
Outside function: global x
Inside: secret = 42
'secret' is not accessible outside the function

value = 5 (unchanged)
result = 10`,
            tip: 'If you find yourself reaching for global variables to share data between functions, pause and reconsider. The far better pattern is to pass data *in* through parameters and get results *out* through return values. Functions that operate only on their inputs are easier to test, easier to debug, and easier to reuse in different contexts.',
            note: 'This "isolation by default" is a core design principle in Python. It\'s the reason you can confidently call any function knowing it won\'t secretly modify your variables. When you see a function signature, the parameters tell you exactly what data goes in, and the return type tells you what comes out. No surprises.',
            analogy: 'Think of it like rooms in a house: each function is a room with its own furniture (local variables). The hallway (global scope) has its own decorations. A lamp named "x" in the bedroom is a completely different lamp from an "x" in the hallway -- they just happen to share a name.',
          },
          {
            heading: 'The LEGB Rule',
            content:
              'When Python encounters a variable name, it needs to figure out what it refers to. It does this by searching through four scopes in a specific order, known as the **LEGB** rule: **L**ocal (the current function), **E**nclosing (any outer functions, for nested functions), **G**lobal (the module level), and **B**uilt-in (Python\'s built-in names like `print`, `len`, and `range`). Python stops at the first match it finds. If it searches all four scopes and finds nothing, you get a `NameError`. Understanding LEGB is like understanding how Python "thinks" when it reads your code. It\'s especially important when you start working with nested functions (closures) and decorators, where the Enclosing scope comes into play. Let\'s trace through an example to see each scope in action.',
            code: `# Built-in scope
# 'len', 'print', 'range' live here

# Global scope
level = "global"

def outer():
    # Enclosing scope (for inner())
    level = "enclosing"

    def inner():
        # Local scope
        level = "local"
        print(f"inner() sees: {level}")

    inner()
    print(f"outer() sees: {level}")

outer()
print(f"module sees: {level}")

# Demonstrating the lookup chain
name = "Global Name"

def outer_fn():
    # name = "Enclosing Name"  # uncomment to test enclosing

    def inner_fn():
        # name = "Local Name"  # uncomment to test local
        print(f"inner_fn sees: {name}")  # looks up LEGB chain

    inner_fn()

print("\\nLEGB lookup demo:")
outer_fn()`,
            output: `inner() sees: local
outer() sees: enclosing
module sees: global

LEGB lookup demo:
inner_fn sees: Global Name`,
            tip: 'A great way to test your understanding of LEGB: in the second example, try mentally uncommenting `name = "Enclosing Name"` in `outer_fn()`. Now `inner_fn` would print "Enclosing Name" instead of "Global Name", because the Enclosing scope is checked before Global. Uncomment `name = "Local Name"` too, and Local takes priority over everything.',
            warning: 'Be careful not to accidentally shadow built-in names. Writing `list = [1, 2, 3]` or `print = "hello"` creates a local/global variable that hides the built-in. Suddenly `list()` or `print()` stops working, and the error message can be very confusing. Avoid using built-in names as variable names.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TB\n    subgraph B["Built-in Scope"]\n        direction TB\n        B1["print, len, range, ..."]\n        subgraph G["Global Scope"]\n            direction TB\n            G1["level = \'global\'"]\n            subgraph E["Enclosing Scope (outer)"]\n                direction TB\n                E1["level = \'enclosing\'"]\n                subgraph L["Local Scope (inner)"]\n                    L1["level = \'local\'"]\n                end\n            end\n        end\n    end\n    style L fill:#4ade80,color:#000\n    style E fill:#60a5fa,color:#000\n    style G fill:#f59e0b,color:#000\n    style B fill:#f87171,color:#000',
              caption: 'LEGB lookup order: Python searches Local, then Enclosing, then Global, then Built-in',
            },
            codeHighlightLines: [5, 9, 13, 14],
          },
          {
            heading: 'The global and nonlocal Keywords',
            content:
              'By default, assigning to a variable inside a function always creates a local variable. But what if you genuinely need to modify a global variable from inside a function? That\'s what the `global` keyword does -- it tells Python "I\'m talking about the module-level variable, not creating a new local one." Similarly, `nonlocal` lets a nested function modify a variable in its enclosing function\'s scope. Now, here\'s the honest truth: you should use both of these *very sparingly*. Every time you use `global`, you\'re creating an invisible dependency between the function and the module state. The function becomes harder to test (you have to set up global state first), harder to reason about (the function\'s behavior depends on when it\'s called relative to other functions), and harder to reuse. The preferred pattern is always: pass data in through parameters, get results out through `return`. That said, `nonlocal` has a legitimate home in closures and decorators, where it\'s the natural way to maintain state.',
            code: `# global keyword
counter = 0

def increment():
    global counter  # without this, assignment would create a local
    counter += 1

increment()
increment()
increment()
print(f"Counter: {counter}")

# nonlocal keyword
def make_counter(start: int = 0):
    """Create a counter function using closure."""
    count = start

    def increment(step: int = 1) -> int:
        nonlocal count  # modify the enclosing variable
        count += step
        return count

    return increment

counter = make_counter(10)
print(f"\\n{counter()}")    # 11
print(counter())            # 12
print(counter(5))           # 17

# Without nonlocal, this would create a LOCAL 'count'
# and raise UnboundLocalError on 'count += step'

# Better alternative: avoid global, use return values
def pure_increment(counter: int) -> int:
    """Pure function: no side effects, easy to test."""
    return counter + 1

val = 0
val = pure_increment(val)
val = pure_increment(val)
print(f"\\nPure approach: {val}")`,
            output: `Counter: 3

11
12
17

Pure approach: 2`,
            tip: 'The `nonlocal` keyword is essential for closures (like the `make_counter` example) and decorators that need to maintain state between calls. If you find yourself using `global` frequently, take it as a code smell -- refactor to pass data through function parameters and return values instead. Your code will become more predictable and testable.',
            warning: 'Without the `global` or `nonlocal` declaration, trying to both read and modify an outer variable causes an `UnboundLocalError`. Python sees the assignment, decides the variable must be local, and then fails when you try to read it before the assignment. The error message can be cryptic -- now you know the fix.',
            codeHighlightLines: [5, 19],
          },
        ],
        quiz: [
          {
            question: 'What does LEGB stand for in Python scope resolution?',
            options: ['Local, External, Global, Built-in', 'Local, Enclosing, Global, Built-in', 'Lexical, Enclosing, General, Base', 'Local, Enclosing, General, Built-in'],
            correctIndex: 1,
            explanation: 'LEGB stands for Local, Enclosing, Global, Built-in. Python searches these scopes in order when looking up a variable name, stopping at the first match.',
          },
          {
            question: 'What happens if you assign to a variable inside a function that has the same name as a global variable?',
            options: ['The global variable is modified', 'Python raises a NameError', 'A new local variable is created, leaving the global unchanged', 'Python asks which one you mean'],
            correctIndex: 2,
            explanation: 'Assigning to a variable inside a function always creates a new local variable, even if a global variable with the same name exists. The global variable remains unchanged. Use the global keyword if you intentionally want to modify the global.',
          },
          {
            question: 'When is the nonlocal keyword needed?',
            options: ['To access any variable outside the current function', 'To modify a variable in an enclosing (but not global) function scope', 'To import variables from other modules', 'To create a global variable from inside a function'],
            correctIndex: 1,
            explanation: 'nonlocal is used inside a nested function to modify a variable defined in the enclosing function scope. Without it, assignment would create a new local variable instead.',
          },
          {
            question: 'Why is using global variables generally discouraged?',
            options: ['They use more memory than local variables', 'They create hidden dependencies that make functions harder to test and reason about', 'Python limits you to 10 global variables', 'They are slower to access than local variables'],
            correctIndex: 1,
            explanation: 'Global variables create invisible dependencies between functions and module state. Functions that rely on globals are harder to test (you must set up global state first), harder to debug, and harder to reuse. The preferred pattern is passing data through parameters and returning results.',
          },
        ],
        challenge: {
          prompt: 'Write a function called make_accumulator that takes an initial value and returns an inner function. Each time the inner function is called with a number, it should add that number to the running total and return the new total. Use nonlocal to modify the enclosing variable.',
          starterCode: `def make_accumulator(initial=0):
    # Your code here
    pass

# Test cases
acc = make_accumulator(10)
print(acc(5))    # 15
print(acc(3))    # 18
print(acc(12))   # 30

acc2 = make_accumulator()
print(acc2(1))   # 1
print(acc2(1))   # 2`,
          solutionCode: `def make_accumulator(initial=0):
    total = initial

    def add(n):
        nonlocal total
        total += n
        return total

    return add

# Test cases
acc = make_accumulator(10)
print(acc(5))    # 15
print(acc(3))    # 18
print(acc(12))   # 30

acc2 = make_accumulator()
print(acc2(1))   # 1
print(acc2(1))   # 2`,
          hints: [
            'Store the initial value in a local variable (e.g., total) in the outer function.',
            'Define an inner function that uses nonlocal to access and modify that total variable.',
            'Each call to make_accumulator creates an independent closure with its own total, so acc and acc2 do not share state.',
          ],
        },
      },

      /* ======== decorators ======== */
      {
        id: 'decorators',
        title: 'Decorators',
        difficulty: 'advanced',
        sections: [
          {
            heading: 'What Are Decorators?',
            content:
              'Decorators are one of Python\'s most elegant and powerful features, and once they "click," you\'ll see them everywhere. Here\'s the core idea: a decorator is a function that takes another function as input, adds some behavior around it, and returns the enhanced version. The `@decorator` syntax is just a beautiful shortcut that Python provides. Think of it like gift wrapping -- the present inside (your original function) stays the same, but it\'s now wrapped in something extra (logging, timing, access control, caching, you name it). What makes this so powerful is the *open/closed principle*: you can extend a function\'s behavior without changing its code. This is why every major Python framework leans heavily on decorators -- Flask uses `@app.route()`, pytest uses `@pytest.fixture`, Django uses `@login_required`, and FastAPI uses `@app.get()`. Understanding decorators isn\'t optional -- it\'s a gateway to understanding professional Python.',
            code: `import time

# A simple decorator
def timer(func):
    """Measure how long a function takes to run."""
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"  {func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

# Apply the decorator with @ syntax
@timer
def slow_add(a, b):
    time.sleep(0.1)  # simulate slow operation
    return a + b

# This is equivalent to: slow_add = timer(slow_add)
result = slow_add(3, 4)
print(f"  Result: {result}")

# Without @ syntax (explicit wrapping)
def fast_multiply(a, b):
    return a * b

timed_multiply = timer(fast_multiply)
result = timed_multiply(5, 6)
print(f"  Result: {result}")`,
            output: `  slow_add took 0.1003s
  Result: 7
  fast_multiply took 0.0000s
  Result: 30`,
            tip: 'The `@decorator` syntax can feel magical, but there\'s no magic here. Writing `@timer` above `def slow_add` is *exactly* the same as writing `slow_add = timer(slow_add)` after the function definition. Once you internalize this equivalence, decorators become completely demystified. The `@` is just syntactic sugar that reads more naturally.',
            note: 'Notice that the `wrapper` function uses `*args` and `**kwargs` to accept any arguments and forwards them to the original function. This makes the decorator universal -- it works with functions that take any number of positional or keyword arguments, regardless of their specific signatures.',
            analogy: 'Think of it like a security checkpoint at an airport: the decorator wraps around the function the same way the checkpoint wraps around the gate. Every passenger (function call) passes through the checkpoint (wrapper) on the way in and out, but the flight itself (original function) operates exactly the same.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n    A["slow_add(3, 4)"] --> B["wrapper(*args, **kwargs)"]\n    B --> C["start = time.time()"]\n    C --> D["result = func(3, 4)"]\n    D --> E["elapsed = time.time() - start"]\n    E --> F["print timing"]\n    F --> G["return result"]\n    style B fill:#fbbf24,color:#000\n    style D fill:#4ade80,color:#000',
              caption: 'The wrapper intercepts the call, runs the original function, and adds timing behavior',
            },
            codeHighlightLines: [4, 6, 8, 10, 12, 15],
          },
          {
            heading: 'functools.wraps and Preserving Metadata',
            content:
              'There\'s a subtle problem with the decorator we just wrote. When you wrap a function, the wrapper *replaces* the original. That means the function\'s name, docstring, and other metadata now reflect the wrapper, not the original. Try checking `slow_add.__name__` and you\'ll get `"wrapper"` instead of `"slow_add"`. This breaks `help()`, debugging tools, logging, and documentation generators. The fix is dead simple: add `@functools.wraps(func)` to your wrapper function. This one-line addition copies all the original function\'s metadata onto the wrapper. It\'s such an important practice that you should treat it as mandatory -- every decorator you write should use `@functools.wraps`. Think of it as the seat belt of decorator writing: you always wear it, even on short trips.',
            code: `import functools

# WITHOUT functools.wraps -- metadata is lost
def bad_decorator(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@bad_decorator
def say_hello():
    """Greet the user."""
    return "Hello!"

print(f"Name: {say_hello.__name__}")   # "wrapper" -- wrong!
print(f"Doc:  {say_hello.__doc__}")     # None -- lost!

# WITH functools.wraps -- metadata is preserved
def good_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@good_decorator
def say_goodbye():
    """Bid farewell to the user."""
    return "Goodbye!"

print(f"\\nName: {say_goodbye.__name__}")  # "say_goodbye" -- correct!
print(f"Doc:  {say_goodbye.__doc__}")      # preserved!`,
            output: `Name: wrapper
Doc:  None

Name: say_goodbye
Doc:  Bid farewell to the user.`,
            tip: 'Make `@functools.wraps(func)` muscle memory. Add it every single time you write a decorator wrapper. The one time you forget, you\'ll spend 20 minutes wondering why your logging shows "wrapper" instead of your function\'s actual name, or why `help()` shows no docstring.',
            warning: 'Without `@functools.wraps`, frameworks that rely on function introspection (like Flask, pytest, and FastAPI) may behave unexpectedly. For instance, Flask uses `__name__` to register route handlers, and pytest uses it to identify fixtures. Missing `wraps` can cause hard-to-trace bugs in these systems.',
          },
          {
            heading: 'Decorators with Arguments',
            content:
              'What if you want a decorator that you can *configure*? For example, a retry decorator where you specify how many times to retry, or a rate limiter where you set the maximum calls per second. This requires one more layer of nesting, and it\'s the part where decorators go from "I get it" to "wait, what?" So let\'s break it down carefully. You need three levels: the outermost function takes the configuration arguments and returns a decorator. The middle function *is* the decorator -- it takes the function being decorated. The innermost function is the wrapper that actually runs. Yes, it\'s a function that returns a function that returns a function. It sounds mind-bending, but the pattern is always identical. Once you\'ve written it twice, it becomes second nature.',
            code: `import functools
import time

def retry(max_attempts: int = 3, delay: float = 0.1):
    """Decorator that retries a function on failure."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_error = None
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_error = e
                    print(f"  Attempt {attempt} failed: {e}")
                    if attempt < max_attempts:
                        time.sleep(delay)
            raise last_error
        return wrapper
    return decorator

# Use the parameterized decorator
call_count = 0

@retry(max_attempts=3, delay=0.05)
def unreliable_api():
    """Simulate a flaky API call."""
    global call_count
    call_count += 1
    if call_count < 3:
        raise ConnectionError("Server unavailable")
    return {"status": "ok", "data": [1, 2, 3]}

try:
    result = unreliable_api()
    print(f"  Success: {result}")
except ConnectionError as e:
    print(f"  All retries failed: {e}")`,
            output: `  Attempt 1 failed: Server unavailable
  Attempt 2 failed: Server unavailable
  Success: {'status': 'ok', 'data': [1, 2, 3]}`,
            tip: 'If the three levels of nesting make your head spin, here\'s a mental model: `retry(max_attempts=3)` is a *decorator factory* -- it\'s not the decorator itself, it *produces* a decorator configured with your settings. The result is then applied to your function. Factory produces decorator, decorator produces wrapper.',
            note: 'In production, you\'d typically use a library like `tenacity` for retry logic, which handles exponential backoff, jitter, and more. But understanding how to build a retry decorator from scratch gives you the foundation to build and customize any decorator pattern you need.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    A["retry(max_attempts=3, delay=0.05)"] --> B["returns decorator(func)"]\n    B --> C["decorator(unreliable_api)"]\n    C --> D["returns wrapper(*args, **kwargs)"]\n    D --> E["wrapper is now bound to unreliable_api"]\n    E --> F["Call unreliable_api()"]\n    F --> G{"Attempt 1: success?"}\n    G -- No --> H["sleep, retry"]\n    H --> I{"Attempt 2: success?"}\n    I -- No --> J["sleep, retry"]\n    J --> K{"Attempt 3: success?"}\n    K -- Yes --> L["return result"]',
              caption: 'Three nesting levels: factory -> decorator -> wrapper, then retry logic during execution',
            },
            codeHighlightLines: [4, 6, 8, 12, 19, 20],
          },
          {
            heading: 'Practical Decorator Examples',
            content:
              'Let\'s look at the decorator patterns you\'ll encounter and write most often in real Python projects. A *logging decorator* records every function call with its arguments and return value -- invaluable for debugging production issues. A *memoization decorator* caches results so expensive computations only run once per unique input -- a huge performance win for recursive algorithms. You can even *stack* multiple decorators on a single function, and they apply bottom-up (the decorator closest to the function is applied first). The standard library and third-party ecosystem are packed with useful decorators: `@staticmethod`, `@classmethod`, `@property`, `@functools.lru_cache`, `@dataclasses.dataclass`, and many more. Understanding the underlying mechanism means you can both use and create these powerful tools with confidence.',
            code: `import functools

# 1. Logging decorator
def log_calls(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        args_str = ", ".join(repr(a) for a in args)
        kwargs_str = ", ".join(f"{k}={v!r}" for k, v in kwargs.items())
        all_args = ", ".join(filter(None, [args_str, kwargs_str]))
        print(f"  Calling {func.__name__}({all_args})")
        result = func(*args, **kwargs)
        print(f"  {func.__name__} returned {result!r}")
        return result
    return wrapper

@log_calls
def add(a, b):
    return a + b

add(3, 4)
print()

# 2. Memoization (caching) decorator
def memoize(func):
    @functools.wraps(func)
    def wrapper(*args):
        if args not in wrapper.cache:
            wrapper.cache[args] = func(*args)
        return wrapper.cache[args]
    wrapper.cache = {}
    return wrapper

@memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Without memoization, fib(35) would take seconds
# With memoization, it is instant
for i in [10, 20, 30, 35]:
    print(f"  fib({i}) = {fibonacci(i)}")

# 3. Stacking multiple decorators
@log_calls
@memoize
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print()
print(f"factorial(5) = {factorial(5)}")`,
            output: `  Calling add(3, 4)
  add returned 7

  fib(10) = 55
  fib(20) = 6765
  fib(30) = 832040
  fib(35) = 9227465

  Calling factorial(5)
  factorial returned 120
factorial(5) = 120`,
            tip: 'In production code, use `@functools.lru_cache(maxsize=128)` instead of writing your own memoization decorator. It\'s battle-tested, thread-safe, handles cache eviction automatically, and even provides a `.cache_info()` method to monitor hit/miss ratios. For unlimited cache, use `@functools.cache` (Python 3.9+).',
            warning: 'When stacking decorators, the order matters! `@log_calls @memoize def f` means `f = log_calls(memoize(f))`. The decorators are applied bottom-up (closest to the function first), but execute top-down when the function is called. Getting the order wrong can lead to logging cached calls (or not logging them), so think carefully about what each layer should see.',
            diagram: {
              kind: 'custom',
              type: 'stack',
              data: {
                type: 'stack',
                items: [
                  '@log_calls  (outer: applied second, executes first)',
                  '@memoize    (inner: applied first, executes second)',
                  'def factorial(n)  (original function)',
                ],
              },
              caption: 'Stacked decorators: applied bottom-up, executed top-down on each call',
            },
          },
        ],
        quiz: [
          {
            question: 'What is @decorator syntax equivalent to?',
            options: ['decorator.apply(func)', 'func = decorator(func)', 'func.decorate(decorator)', 'decorator = func(decorator)'],
            correctIndex: 1,
            explanation: 'Writing @decorator above def func is exactly equivalent to writing func = decorator(func) after the function definition. The @ syntax is syntactic sugar for this reassignment.',
          },
          {
            question: 'Why should you always use @functools.wraps(func) in your decorator wrappers?',
            options: ['It makes the decorator run faster', 'It prevents the decorator from modifying the original function', 'It preserves the original function name, docstring, and metadata', 'It is required by Python syntax'],
            correctIndex: 2,
            explanation: 'Without @functools.wraps, the wrapper replaces the original function metadata. help(), __name__, __doc__, and debugging tools would all show "wrapper" instead of the original function information.',
          },
          {
            question: 'When stacking decorators like @A then @B above a function, what is the execution order?',
            options: ['B is applied first, A is applied second; A executes first when called', 'A is applied first, B is applied second', 'Both are applied simultaneously', 'The order does not matter'],
            correctIndex: 0,
            explanation: 'Decorators are applied bottom-up: B (closest to the function) wraps the function first, then A wraps the result. When the function is called, A\'s wrapper executes first (outer layer), then B\'s wrapper (inner layer).',
          },
          {
            question: 'How many levels of function nesting are needed for a decorator that accepts arguments (like @retry(max_attempts=3))?',
            options: ['One', 'Two', 'Three', 'Four'],
            correctIndex: 2,
            explanation: 'A parameterized decorator needs three levels: (1) the outer function that takes the configuration arguments, (2) the decorator function that takes the function to wrap, and (3) the wrapper function that runs on each call.',
          },
        ],
        challenge: {
          prompt: 'Write a decorator called call_counter that tracks how many times a decorated function has been called. After each call, print "function_name has been called N times". The count should be stored as an attribute on the wrapper function (wrapper.call_count). Use functools.wraps.',
          starterCode: `import functools

def call_counter(func):
    # Your code here
    pass

@call_counter
def say_hello(name):
    return f"Hello, {name}!"

# Test cases
print(say_hello("Alice"))
print(say_hello("Bob"))
print(say_hello("Charlie"))
print(f"Total calls: {say_hello.call_count}")`,
          solutionCode: `import functools

def call_counter(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        wrapper.call_count += 1
        result = func(*args, **kwargs)
        print(f"{func.__name__} has been called {wrapper.call_count} times")
        return result
    wrapper.call_count = 0
    return wrapper

@call_counter
def say_hello(name):
    return f"Hello, {name}!"

# Test cases
print(say_hello("Alice"))
print(say_hello("Bob"))
print(say_hello("Charlie"))
print(f"Total calls: {say_hello.call_count}")`,
          hints: [
            'Initialize wrapper.call_count = 0 after defining the wrapper function but before returning it.',
            'Inside the wrapper, increment wrapper.call_count before or after calling the original function.',
            'Use *args and **kwargs in the wrapper to make it work with any function signature, and remember @functools.wraps(func) to preserve metadata.',
          ],
        },
      },
    ],
  },
];

import type { DocCategory } from './types';

// Part 7: Keywords
export const PART7_CATEGORIES: DocCategory[] = [
  {
    id: 'keywords',
    label: 'Keywords',
    icon: 'Cpu',
    entries: [
      /* -------------------------------------------------------------- */
      /*  continue                                                      */
      /* -------------------------------------------------------------- */
      {
        id: 'kw-continue',
        title: 'Continue Keyword',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Skipping an Iteration with continue',
            content:
              'The continue keyword is used inside a loop to skip the rest of the current iteration and jump straight to the next one. When Python encounters continue, it does not execute any remaining statements in the loop body for that pass; instead it re-evaluates the loop condition (for a while loop) or advances to the next item (for a for loop).\n\nThis is especially useful when you want to ignore certain values without restructuring your entire loop body inside an else branch. It keeps the "happy path" at the top indentation level and tucks the skip logic into a small guard clause.',
            code: `# Print only odd numbers from 1 to 10
numbers = range(1, 11)

for n in numbers:
    if n % 2 == 0:
        continue  # skip even numbers
    print(n)`,
            output: `1\n3\n5\n7\n9`,
            tip: 'Use continue to avoid deeply nested if/else blocks inside loops. A small guard clause with continue at the top of the loop body is often easier to read than wrapping the rest of the logic in an else.',
            analogy: 'Think of it like a bouncer at a door: when a loop iteration meets the skip condition, continue acts as the bouncer saying "you do not get in," and the loop immediately moves on to the next person in line.',
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart TD
    A["Start iteration"] --> B{"Condition met?"}
    B -->|Yes| C["continue -- skip rest"]
    C --> A
    B -->|No| D["Execute loop body"]
    D --> A
    style C fill:#fef3c7,stroke:#d97706
    style D fill:#dcfce7,stroke:#16a34a`,
              caption: 'When continue is hit, the remaining loop body is skipped and the next iteration begins.',
            },
            codeHighlightLines: [5, 6],
          },
          {
            heading: 'Using continue in a while Loop',
            content:
              'The continue keyword works in while loops just as it does in for loops. After continue executes, control returns to the while condition check. Be careful to update your loop variable before the continue statement, otherwise you may create an infinite loop because the variable never changes.\n\nA common pattern is input validation: keep asking the user for input and use continue to restart the prompt whenever the input is invalid, only proceeding with valid data.',
            code: `# Collect positive numbers from the user, stop on 0
collected = []
i = 0
values = [5, -3, 7, -1, 0]  # simulated input

while i < len(values):
    val = values[i]
    i += 1  # increment BEFORE continue to avoid infinite loop

    if val < 0:
        print(f"Skipping negative value: {val}")
        continue

    if val == 0:
        print("Zero entered, stopping.")
        break

    collected.append(val)
    print(f"Collected: {val}")

print(f"Result: {collected}")`,
            output: `Collected: 5\nSkipping negative value: -3\nCollected: 7\nSkipping negative value: -1\nZero entered, stopping.\nResult: [5, 7]`,
            tip: 'Always ensure your loop variable is updated before the continue statement in a while loop. Placing the increment after continue means it will be skipped, leading to an infinite loop.',
            codeHighlightLines: [8, 11, 12],
          },
          {
            heading: 'Practical Example: Cleaning Data',
            content:
              'A real-world use case for continue is data cleaning. When processing rows from a file or API response, some rows may be incomplete or malformed. Rather than wrapping all your processing logic inside a conditional, you can validate at the top of the loop and continue past bad records.\n\nThis pattern keeps your main processing code at a single indentation level and makes it immediately clear which records are being skipped and why. It is a staple in ETL pipelines, log parsers, and CSV processors.',
            code: `# Process user records, skip incomplete ones
records = [
    {"name": "Alice", "email": "alice@example.com"},
    {"name": "", "email": "bob@example.com"},
    {"name": "Charlie", "email": ""},
    {"name": "Diana", "email": "diana@example.com"},
]

valid_users = []
for record in records:
    if not record["name"] or not record["email"]:
        print(f"Skipping incomplete record: {record}")
        continue

    valid_users.append(record["name"])
    print(f"Processed: {record['name']}")

print(f"Valid users: {valid_users}")`,
            output: `Processed: Alice\nSkipping incomplete record: {'name': '', 'email': 'bob@example.com'}\nSkipping incomplete record: {'name': 'Charlie', 'email': ''}\nProcessed: Diana\nValid users: ['Alice', 'Diana']`,
            analogy: 'Think of it like a quality inspector on an assembly line: each item is checked as it passes by, and defective ones are tossed aside with continue so only good items reach the end of the line.',
            codeHighlightLines: [11, 12, 13],
          },
        ],
        quiz: [
          {
            question: 'What happens when Python encounters the continue keyword inside a for loop?',
            options: [
              'The loop terminates immediately and execution continues after the loop',
              'The rest of the current iteration is skipped and the loop advances to the next item',
              'The current iteration restarts from the beginning of the loop body',
              'A StopIteration exception is raised',
            ],
            correctIndex: 1,
            explanation:
              'The continue keyword skips the remaining statements in the current iteration and moves to the next iteration. It does not exit the loop (that is break) or restart the same iteration.',
          },
          {
            question: 'What is the most common risk when using continue inside a while loop?',
            options: [
              'It causes a SyntaxError if used without an if statement',
              'The loop variable update may be skipped, causing an infinite loop',
              'It automatically converts the while loop into a for loop',
              'It raises a RuntimeError if the condition is already False',
            ],
            correctIndex: 1,
            explanation:
              'If the loop variable increment is placed after the continue statement, it will be skipped whenever continue executes. This means the loop condition never changes and the loop runs forever. Always update the loop variable before the continue.',
          },
          {
            question: 'What will be printed by this code?\n\nfor i in range(5):\n    if i == 2:\n        continue\n    print(i, end=" ")',
            options: [
              '0 1 2 3 4',
              '0 1 3 4',
              '0 1',
              '3 4',
            ],
            correctIndex: 1,
            explanation:
              'The loop iterates through 0, 1, 2, 3, 4. When i equals 2, continue skips the print statement for that iteration only. All other values are printed normally, resulting in "0 1 3 4".',
          },
          {
            question: 'Which statement about continue is FALSE?',
            options: [
              'continue can be used in both for loops and while loops',
              'continue only skips the current iteration, not the entire loop',
              'continue can be used outside of a loop body at the module level',
              'continue is often used as a guard clause to skip invalid data',
            ],
            correctIndex: 2,
            explanation:
              'The continue keyword can only be used inside the body of a for or while loop. Using it outside a loop results in a SyntaxError: "continue" not properly in loop.',
          },
        ],
        challenge: {
          prompt:
            'Write a function called filter_positive that takes a list of integers and returns a new list containing only the positive numbers (greater than zero). Use a for loop with continue to skip non-positive numbers.',
          starterCode: `def filter_positive(numbers):
    """Return a list of only positive numbers from the input list.
    Use a for loop with continue to skip non-positive numbers.
    """
    result = []
    for num in numbers:
        # TODO: Use continue to skip numbers that are not positive (i.e., <= 0)
        pass
        # TODO: Append the positive number to result
        pass
    return result

# Test your function
print(filter_positive([3, -1, 0, 7, -5, 2, 0, 8]))  # Expected: [3, 7, 2, 8]
print(filter_positive([-1, -2, -3]))                  # Expected: []
print(filter_positive([10, 20, 30]))                  # Expected: [10, 20, 30]`,
          solutionCode: `def filter_positive(numbers):
    """Return a list of only positive numbers from the input list.
    Use a for loop with continue to skip non-positive numbers.
    """
    result = []
    for num in numbers:
        if num <= 0:
            continue
        result.append(num)
    return result

# Test your function
print(filter_positive([3, -1, 0, 7, -5, 2, 0, 8]))  # Expected: [3, 7, 2, 8]
print(filter_positive([-1, -2, -3]))                  # Expected: []
print(filter_positive([10, 20, 30]))                  # Expected: [10, 20, 30]`,
          hints: [
            'Check whether the current number is less than or equal to zero. If it is, use continue to skip it.',
            'After the continue guard clause, any number that reaches the next line must be positive, so append it to result.',
            'Remember that 0 is not positive, so your condition should skip both negative numbers and zero.',
          ],
        },
      },

      /* -------------------------------------------------------------- */
      /*  break                                                         */
      /* -------------------------------------------------------------- */
      {
        id: 'kw-break',
        title: 'Break Keyword',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Exiting a Loop Early with break',
            content:
              'The break keyword immediately terminates the innermost loop it appears in. Execution continues with the first statement after the loop. Unlike continue, which only skips one iteration, break stops the loop entirely -- no further iterations will run.\n\nbreak is most commonly used when you are searching for something: once you find it, there is no reason to keep iterating. It also pairs naturally with while True loops, where the termination condition is checked inside the body rather than in the loop header.',
            code: `# Find the first number divisible by 7 and 5
for num in range(1, 100):
    if num % 7 == 0 and num % 5 == 0:
        print(f"Found it: {num}")
        break
else:
    # This block runs only if the loop was NOT terminated by break
    print("No number found")`,
            output: `Found it: 35`,
            tip: 'Python\'s for/else and while/else syntax is unique: the else block runs only when the loop completes without hitting a break. This eliminates the need for a "found" flag variable.',
            analogy: 'Think of it like an emergency stop button on a conveyor belt: the moment you hit break, the entire loop machinery halts immediately, no matter how many items were still left to process.',
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart TD
    A["Start loop"] --> B["Next iteration"]
    B --> C{"break condition?"}
    C -->|Yes| D["break -- exit loop"]
    C -->|No| E["Execute body"]
    E --> B
    D --> F["Code after loop"]
    style D fill:#fee2e2,stroke:#dc2626
    style F fill:#e0f2fe,stroke:#0284c7`,
              caption: 'break exits the loop immediately and jumps to the first statement after the loop.',
            },
            codeHighlightLines: [3, 4, 5],
          },
          {
            heading: 'Breaking Out of a while True Loop',
            content:
              'A while True loop runs forever unless something inside it calls break. This pattern is ideal when you do not know the number of iterations in advance, such as reading user input, polling an API, or consuming from a queue. The loop body contains one or more conditions that trigger break when the task is done.\n\nKeep the break conditions clearly visible near the top or in well-named helper checks. Burying a break deep inside nested logic makes the loop harder to reason about and debug.',
            code: `# Simple menu system
options = ["a", "b", "q"]  # simulated user choices
index = 0

while True:
    choice = options[index]
    index += 1

    if choice == "q":
        print("Goodbye!")
        break
    elif choice == "a":
        print("You chose option A")
    elif choice == "b":
        print("You chose option B")
    else:
        print(f"Unknown option: {choice}")`,
            output: `You chose option A\nYou chose option B\nGoodbye!`,
            tip: 'If your while True loop body is getting long, extract the loop body into a function that returns a boolean indicating whether to keep going. This keeps the loop itself clean and testable.',
            codeHighlightLines: [5, 9, 10, 11],
          },
          {
            heading: 'break in Nested Loops',
            content:
              'The break keyword only exits the innermost loop. If you have nested for or while loops, a break in the inner loop will not affect the outer loop. This is important to remember when searching through multi-dimensional structures like matrices or nested lists.\n\nIf you need to break out of multiple loops at once, the cleanest approach is to extract the nested loops into a function and use return instead. Alternatively, you can use a flag variable, but that tends to be less readable.',
            code: `# Search for a target value in a 2D grid
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
target = 5

def find_in_grid(grid, target):
    for row_idx, row in enumerate(grid):
        for col_idx, val in enumerate(row):
            if val == target:
                return (row_idx, col_idx)
    return None

position = find_in_grid(grid, target)
print(f"Target {target} found at: row {position[0]}, col {position[1]}")

# Demonstrating break only exits inner loop
for i in range(3):
    for j in range(3):
        if j == 1:
            break  # only exits the inner loop
        print(f"i={i}, j={j}")`,
            output: `Target 5 found at: row 1, col 1\ni=0, j=0\ni=1, j=0\ni=2, j=0`,
            analogy: 'Think of it like exiting rooms in a building: break only lets you walk out of the room you are currently in (the inner loop). To leave the building entirely (the outer loop), you need a different strategy like using return from a function.',
          },
        ],
        quiz: [
          {
            question: 'What is the key difference between break and continue?',
            options: [
              'break skips the current iteration; continue exits the loop entirely',
              'break exits the innermost loop entirely; continue skips only the current iteration',
              'break works only in for loops; continue works only in while loops',
              'break and continue are interchangeable keywords with the same behavior',
            ],
            correctIndex: 1,
            explanation:
              'break terminates the entire innermost loop and execution continues after the loop. continue only skips the rest of the current iteration and proceeds to the next one. They have opposite scopes of effect.',
          },
          {
            question: 'In Python, when does the else block of a for/else construct execute?',
            options: [
              'It executes every time after the loop finishes, regardless of how it ended',
              'It executes only when the loop body raises an exception',
              'It executes only when the loop completes all iterations without encountering a break',
              'It executes only when the loop is terminated by a break statement',
            ],
            correctIndex: 2,
            explanation:
              'The else clause on a for or while loop in Python runs only when the loop terminates normally (i.e., it is not interrupted by break). If break is executed, the else block is skipped entirely.',
          },
          {
            question: 'What does break do when used inside nested loops?',
            options: [
              'It exits all nested loops at once and continues after the outermost loop',
              'It only exits the innermost loop that contains the break statement',
              'It raises a SyntaxError because break cannot be used in nested loops',
              'It pauses the inner loop and resumes the outer loop from where it left off',
            ],
            correctIndex: 1,
            explanation:
              'break only terminates the innermost loop it is placed in. The outer loop continues to iterate normally. To exit multiple levels, you can wrap the loops in a function and use return, or use a flag variable.',
          },
          {
            question: 'What is the output of this code?\n\nfor i in range(3):\n    for j in range(3):\n        if j == 2:\n            break\n        print(f"{i},{j}", end=" ")',
            options: [
              '0,0 0,1 1,0 1,1 2,0 2,1',
              '0,0 0,1 0,2',
              '0,0 1,0 2,0',
              '0,0 0,1 0,2 1,0 1,1 1,2 2,0 2,1 2,2',
            ],
            correctIndex: 0,
            explanation:
              'For each value of i (0, 1, 2), the inner loop starts with j=0 and j=1, then when j reaches 2, break exits the inner loop. The outer loop continues, so we get pairs (0,0), (0,1), (1,0), (1,1), (2,0), (2,1).',
          },
        ],
        challenge: {
          prompt:
            'Write a function called find_first_duplicate that takes a list and returns the first element that appears more than once. If no duplicate is found, return None. Use a set to track seen elements and break out of the loop as soon as you find the first duplicate.',
          starterCode: `def find_first_duplicate(items):
    """Return the first duplicate element in the list, or None if no duplicates exist.
    Use a set to track seen items and break when a duplicate is found.
    """
    seen = set()
    duplicate = None
    for item in items:
        # TODO: Check if item is already in seen
        # TODO: If so, set duplicate and break out of the loop
        # TODO: Otherwise, add item to seen
        pass
    return duplicate

# Test your function
print(find_first_duplicate([1, 2, 3, 4, 2, 5]))    # Expected: 2
print(find_first_duplicate(["a", "b", "c", "b"]))   # Expected: b
print(find_first_duplicate([1, 2, 3, 4, 5]))        # Expected: None
print(find_first_duplicate([]))                      # Expected: None`,
          solutionCode: `def find_first_duplicate(items):
    """Return the first duplicate element in the list, or None if no duplicates exist.
    Use a set to track seen items and break when a duplicate is found.
    """
    seen = set()
    duplicate = None
    for item in items:
        if item in seen:
            duplicate = item
            break
        seen.add(item)
    return duplicate

# Test your function
print(find_first_duplicate([1, 2, 3, 4, 2, 5]))    # Expected: 2
print(find_first_duplicate(["a", "b", "c", "b"]))   # Expected: b
print(find_first_duplicate([1, 2, 3, 4, 5]))        # Expected: None
print(find_first_duplicate([]))                      # Expected: None`,
          hints: [
            'Use the "in" operator to check if the current item already exists in the seen set.',
            'When you find a duplicate, assign it to the duplicate variable and immediately break to stop searching.',
            'If the item is not in seen, add it with seen.add(item) so future iterations can detect it as a duplicate.',
          ],
        },
      },

      /* -------------------------------------------------------------- */
      /*  global                                                        */
      /* -------------------------------------------------------------- */
      {
        id: 'kw-global',
        title: 'Global Keyword',
        difficulty: 'intermediate',
        sections: [
          {
            heading: 'Declaring Global Variables Inside a Function',
            content:
              'In Python, any variable assigned inside a function is local by default. If you want to modify a module-level (global) variable from within a function, you must declare it with the global keyword first. Without the declaration, Python creates a new local variable with the same name, leaving the original global untouched.\n\nThis distinction is one of the most common sources of confusion for newcomers. Reading a global variable works without any declaration -- it is only when you assign to it that Python needs the global hint to know you mean the outer variable.',
            code: `counter = 0  # module-level variable

def increment():
    global counter  # tell Python we mean the module-level 'counter'
    counter += 1
    print(f"Inside function: counter = {counter}")

increment()
increment()
increment()
print(f"Outside function: counter = {counter}")`,
            output: `Inside function: counter = 1\nInside function: counter = 2\nInside function: counter = 3\nOutside function: counter = 3`,
            tip: 'If you forget the global declaration and try to assign to the variable, Python will raise an UnboundLocalError because it sees the assignment and treats the name as local, but the local has not been defined yet at that point.',
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart TD
    A["Module scope: counter = 0"] --> B["increment() called"]
    B --> C{"global counter declared?"}
    C -->|Yes| D["Modifies module-level counter"]
    C -->|No| E["Creates NEW local variable"]
    D --> F["counter = 1, 2, 3..."]
    E --> G["Module counter unchanged"]
    style D fill:#dcfce7,stroke:#16a34a
    style E fill:#fee2e2,stroke:#dc2626`,
              caption: 'Without the global declaration, assignment inside a function creates a local variable instead of modifying the global one.',
            },
            codeHighlightLines: [1, 4, 5],
          },
          {
            heading: 'What Happens Without global',
            content:
              'When you assign to a variable inside a function without declaring it as global, Python creates a brand-new local variable. The global variable remains unchanged. This can cause subtle bugs where you think you are updating shared state but are actually working with a throwaway local copy.\n\nEven more confusingly, if you try to both read and write a variable without a global declaration, Python raises an UnboundLocalError. This is because Python decides at compile time (not runtime) whether a name is local or global based on whether there is any assignment to it anywhere in the function body.',
            code: `score = 100

def without_global():
    # This creates a NEW local variable named 'score'
    score = 50
    print(f"Local score: {score}")

def with_global():
    global score
    score = 50
    print(f"Global score modified: {score}")

without_global()
print(f"After without_global: score = {score}")  # still 100

with_global()
print(f"After with_global: score = {score}")  # now 50`,
            output: `Local score: 50\nAfter without_global: score = 100\nGlobal score modified: 50\nAfter with_global: score = 50`,
            tip: 'You can declare multiple globals in one statement: global x, y, z. However, if you find yourself using global frequently, consider refactoring to use a class, a dictionary, or function parameters and return values instead.',
            analogy: 'Think of it like two whiteboards with the same label: without global, the function gets its own private whiteboard and writes on that, leaving the shared whiteboard in the hallway untouched. With global, the function is told to go use the hallway whiteboard directly.',
            codeHighlightLines: [5, 9, 10],
          },
          {
            heading: 'When to Use global (and When Not To)',
            content:
              'The global keyword has legitimate uses in small scripts, configuration toggles, and caching patterns. For example, a simple script that tracks state across several functions might use a global dictionary. However, in larger applications, excessive use of global variables makes code hard to test, debug, and reason about because any function can change the state at any time.\n\nPrefer passing values as function arguments and returning results. If you need shared mutable state, encapsulate it in a class. For configuration, use module-level constants (UPPER_CASE names that are never reassigned). Reserve global for the rare cases where simplicity genuinely wins over architecture.',
            code: `# Acceptable use: simple caching in a utility script
_cache = {}

def get_user(user_id):
    global _cache
    if user_id in _cache:
        print(f"Cache hit for user {user_id}")
        return _cache[user_id]

    # Simulate a database lookup
    user = {"id": user_id, "name": f"User_{user_id}"}
    _cache[user_id] = user
    print(f"Cache miss, fetched user {user_id}")
    return user

print(get_user(1))
print(get_user(2))
print(get_user(1))  # cached
print(f"Cache contents: {_cache}")`,
            output: `Cache miss, fetched user 1\n{'id': 1, 'name': 'User_1'}\nCache miss, fetched user 2\n{'id': 2, 'name': 'User_2'}\nCache hit for user 1\n{'id': 1, 'name': 'User_1'}\nCache contents: {1: {'id': 1, 'name': 'User_1'}, 2: {'id': 2, 'name': 'User_2'}}`,
            tip: 'Note that mutating a global mutable object (like appending to a list or updating a dict) does not require the global keyword -- only reassignment does. The global declaration is needed only when you use the = operator on the variable name itself.',
          },
        ],
        quiz: [
          {
            question: 'When is the global keyword required inside a function?',
            options: [
              'Whenever you read the value of a module-level variable',
              'Whenever you call a method on a module-level mutable object like a list or dict',
              'Whenever you assign (use =) to a module-level variable name inside the function',
              'Whenever you pass a module-level variable as an argument to another function',
            ],
            correctIndex: 2,
            explanation:
              'The global keyword is only needed when you want to assign to (rebind) a module-level variable inside a function. Reading global variables or mutating mutable objects (like list.append or dict update) works fine without it because those operations do not rebind the name.',
          },
          {
            question: 'What error does Python raise if you try to assign to a global variable inside a function without the global declaration?',
            options: [
              'NameError: name is not defined',
              'UnboundLocalError: local variable referenced before assignment',
              'TypeError: cannot modify global variable',
              'SyntaxError: invalid use of global variable',
            ],
            correctIndex: 1,
            explanation:
              'Python determines at compile time that the variable is local (because there is an assignment to it in the function body). When the function tries to read the variable before the assignment line, it raises UnboundLocalError because the local variable has not been assigned yet.',
          },
          {
            question: 'Which of the following operations does NOT require the global keyword to work correctly on a module-level variable?',
            options: [
              'counter += 1 (incrementing an integer)',
              'my_list.append("item") (appending to a list)',
              'name = "new_value" (reassigning a string)',
              'flag = not flag (toggling a boolean)',
            ],
            correctIndex: 1,
            explanation:
              'Calling my_list.append() mutates the existing list object in place without rebinding the name my_list. Since there is no assignment to the variable name itself, Python does not treat it as local and no global declaration is needed. The other options all use the = operator, which requires global.',
          },
          {
            question: 'What will this code print?\n\nx = 10\ndef foo():\n    x = 20\nfoo()\nprint(x)',
            options: [
              '20',
              '10',
              'It raises an UnboundLocalError',
              'It raises a NameError',
            ],
            correctIndex: 1,
            explanation:
              'Inside foo(), the assignment x = 20 creates a local variable x that shadows the global one. The global x remains unchanged at 10. After foo() returns, printing x outputs 10. The global keyword would be needed to modify the module-level x.',
          },
        ],
        challenge: {
          prompt:
            'Write a simple configuration system using global variables. Create a module-level dictionary called config and two functions: set_config(key, value) that sets a configuration key-value pair, and get_config(key) that retrieves a value by key (returning None if the key does not exist). Then create a reset_config() function that replaces the entire config with an empty dictionary.',
          starterCode: `config = {"debug": False, "version": "1.0"}

def set_config(key, value):
    """Set a configuration key-value pair in the global config dict."""
    # TODO: Do you need the global keyword here? Think about whether
    # you are reassigning or mutating the dict.
    pass

def get_config(key):
    """Get a configuration value by key, returning None if not found."""
    # TODO: Return the value for key from config, or None if missing
    pass

def reset_config():
    """Reset the global config to an empty dictionary."""
    # TODO: You need the global keyword here because you are
    # reassigning the config variable to a new empty dict.
    pass

# Test your functions
set_config("debug", True)
set_config("log_level", "INFO")
print(get_config("debug"))      # Expected: True
print(get_config("log_level"))  # Expected: INFO
print(get_config("missing"))    # Expected: None

reset_config()
print(get_config("debug"))      # Expected: None (config was reset)`,
          solutionCode: `config = {"debug": False, "version": "1.0"}

def set_config(key, value):
    """Set a configuration key-value pair in the global config dict."""
    config[key] = value

def get_config(key):
    """Get a configuration value by key, returning None if not found."""
    return config.get(key, None)

def reset_config():
    """Reset the global config to an empty dictionary."""
    global config
    config = {}

# Test your functions
set_config("debug", True)
set_config("log_level", "INFO")
print(get_config("debug"))      # Expected: True
print(get_config("log_level"))  # Expected: INFO
print(get_config("missing"))    # Expected: None

reset_config()
print(get_config("debug"))      # Expected: None (config was reset)`,
          hints: [
            'set_config only mutates the existing dict (config[key] = value), so it does NOT need the global keyword.',
            'get_config only reads from the dict. Use dict.get(key, None) to safely return None for missing keys.',
            'reset_config reassigns config to a new empty dict (config = {}), which DOES require the global keyword because it rebinds the variable name.',
          ],
        },
      },

      /* -------------------------------------------------------------- */
      /*  nonlocal                                                      */
      /* -------------------------------------------------------------- */
      {
        id: 'kw-nonlocal',
        title: 'Nonlocal Keyword',
        difficulty: 'intermediate',
        sections: [
          {
            heading: 'Referencing Variables in an Enclosing Scope',
            content:
              'The nonlocal keyword lets a nested (inner) function assign to a variable defined in its enclosing (outer) function. Without nonlocal, assigning to that name inside the inner function would create a new local variable, just as it does with global variables at the module level.\n\nnonlocal was introduced in Python 3 specifically to solve this problem. It is most commonly seen in closures, decorators, and callback patterns where the inner function needs to maintain and update state that lives in the enclosing scope.',
            code: `def make_counter():
    count = 0  # variable in enclosing scope

    def increment():
        nonlocal count  # refer to the enclosing 'count'
        count += 1
        return count

    return increment

counter = make_counter()
print(counter())
print(counter())
print(counter())`,
            output: `1\n2\n3`,
            tip: 'nonlocal only works for the immediately enclosing function scope, not the global scope. If you need to modify a module-level variable, use global instead. Trying to use nonlocal for a global variable raises a SyntaxError.',
            analogy: 'Think of it like a child reaching into a parent\'s drawer: the nonlocal keyword gives the inner function permission to open the enclosing function\'s drawer and modify what is inside, rather than creating its own separate copy.',
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart TD
    subgraph outer["make_counter() scope"]
        A["count = 0"]
        subgraph inner["increment() scope"]
            B["nonlocal count"]
            C["count += 1"]
        end
    end
    B -->|"refers to"| A
    style outer fill:#e0f2fe,stroke:#0284c7
    style inner fill:#fef3c7,stroke:#d97706`,
              caption: 'nonlocal lets the inner function modify the variable living in the enclosing (outer) function scope.',
            },
            codeHighlightLines: [2, 5, 6],
          },
          {
            heading: 'Closures and State Management',
            content:
              'A closure is a function that remembers the variables from its enclosing scope even after that scope has finished executing. Combined with nonlocal, closures become a lightweight alternative to classes for managing small pieces of state. Each call to the factory function creates an independent closure with its own copy of the enclosed variables.\n\nThis pattern is powerful for creating specialized functions on the fly. For example, you can build accumulators, rate limiters, or retry handlers without defining a full class, which can be cleaner when only one or two methods are needed.',
            code: `def make_accumulator(initial=0):
    total = initial

    def add(value):
        nonlocal total
        total += value
        print(f"Added {value}, total is now {total}")
        return total

    def get_total():
        return total

    return add, get_total

add, get_total = make_accumulator(10)
add(5)
add(3)
add(12)
print(f"Final total: {get_total()}")

# Each accumulator is independent
add2, get_total2 = make_accumulator(0)
add2(100)
print(f"Second accumulator: {get_total2()}")`,
            output: `Added 5, total is now 15\nAdded 3, total is now 18\nAdded 12, total is now 30\nFinal total: 30\nAdded 100, total is now 100\nSecond accumulator: 100`,
            tip: 'If your closure starts needing more than two or three pieces of state, or you want to add methods over time, switch to a class. Closures are great for simple cases, but classes scale better and support inheritance, introspection, and pickling.',
            analogy: 'Think of it like a vending machine: make_accumulator builds and returns a vending machine with its own internal coin counter. Each machine tracks its own total independently, and the add function is the coin slot that updates the internal count.',
            codeHighlightLines: [2, 5, 6],
          },
          {
            heading: 'Using nonlocal in Decorators',
            content:
              'Decorators frequently use nonlocal to maintain state across calls to the decorated function. A common example is a call-counting decorator that tracks how many times a function has been invoked. The count variable lives in the decorator\'s enclosing scope, and the wrapper function uses nonlocal to update it on every call.\n\nThis technique is also the foundation for memoization decorators, retry decorators, and rate-limiting wrappers. Because each decorated function gets its own closure, the state is neatly isolated without any global variables or class instances.',
            code: `def call_counter(func):
    count = 0

    def wrapper(*args, **kwargs):
        nonlocal count
        count += 1
        print(f"[Call #{count}] {func.__name__}()")
        return func(*args, **kwargs)

    wrapper.get_count = lambda: count
    return wrapper

@call_counter
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))
print(greet("Bob"))
print(greet("Charlie"))
print(f"Total calls: {greet.get_count()}")`,
            output: `[Call #1] greet()\nHello, Alice!\n[Call #2] greet()\nHello, Bob!\n[Call #3] greet()\nHello, Charlie!\nTotal calls: 3`,
            tip: 'When writing decorators, use functools.wraps on the wrapper function to preserve the original function\'s __name__, __doc__, and other metadata. This makes debugging and introspection much easier.',
            codeHighlightLines: [2, 5, 6, 7],
          },
        ],
        quiz: [
          {
            question: 'What is the primary purpose of the nonlocal keyword in Python?',
            options: [
              'To declare a variable as globally accessible from any module',
              'To allow a nested function to assign to a variable in its enclosing function scope',
              'To prevent a variable from being garbage collected after the function returns',
              'To make a local variable accessible from outside the function',
            ],
            correctIndex: 1,
            explanation:
              'The nonlocal keyword tells Python that a variable assignment in a nested function should refer to the variable in the enclosing (outer) function scope, rather than creating a new local variable. It specifically targets the enclosing function scope, not the global scope.',
          },
          {
            question: 'What happens if you try to use nonlocal to refer to a module-level (global) variable?',
            options: [
              'It works the same as the global keyword',
              'It silently creates a new local variable instead',
              'Python raises a SyntaxError',
              'Python raises a NameError at runtime',
            ],
            correctIndex: 2,
            explanation:
              'nonlocal can only refer to variables in an enclosing function scope, not the module (global) scope. If there is no enclosing function scope containing that variable, Python raises a SyntaxError: no binding for nonlocal variable found.',
          },
          {
            question: 'What is a closure in Python?',
            options: [
              'A function that closes (terminates) another function when called',
              'A function that remembers variables from its enclosing scope even after that scope has finished executing',
              'A special syntax for defining private methods inside a class',
              'A function that can only be called once before being garbage collected',
            ],
            correctIndex: 1,
            explanation:
              'A closure is a nested function that captures and retains access to variables from its enclosing function scope. Even after the outer function has returned, the closure still has access to those variables. nonlocal allows the closure to also modify those captured variables.',
          },
          {
            question: 'What will this code print?\n\ndef outer():\n    x = 10\n    def inner():\n        nonlocal x\n        x += 5\n    inner()\n    inner()\n    return x\n\nprint(outer())',
            options: [
              '10',
              '15',
              '20',
              'It raises an UnboundLocalError',
            ],
            correctIndex: 2,
            explanation:
              'The inner function uses nonlocal to modify x in the enclosing scope. The first call to inner() changes x from 10 to 15. The second call changes x from 15 to 20. outer() then returns 20.',
          },
        ],
        challenge: {
          prompt:
            'Write a function called make_running_average that returns a function. Each time the returned function is called with a number, it should return the running average of all numbers passed so far. Use nonlocal to track the running total and count across calls.',
          starterCode: `def make_running_average():
    """Return a function that computes a running average.
    Each call with a new number returns the average of all numbers so far.
    Use nonlocal to maintain state in the enclosing scope.
    """
    total = 0.0
    count = 0

    def add_number(value):
        # TODO: Use nonlocal to access total and count from the enclosing scope
        # TODO: Update total and count
        # TODO: Return the running average (total / count)
        pass

    return add_number

# Test your function
avg = make_running_average()
print(avg(10))   # Expected: 10.0  (10 / 1)
print(avg(20))   # Expected: 15.0  (30 / 2)
print(avg(30))   # Expected: 20.0  (60 / 3)
print(avg(0))    # Expected: 15.0  (60 / 4)

# Each instance is independent
avg2 = make_running_average()
print(avg2(100)) # Expected: 100.0 (100 / 1)`,
          solutionCode: `def make_running_average():
    """Return a function that computes a running average.
    Each call with a new number returns the average of all numbers so far.
    Use nonlocal to maintain state in the enclosing scope.
    """
    total = 0.0
    count = 0

    def add_number(value):
        nonlocal total, count
        total += value
        count += 1
        return total / count

    return add_number

# Test your function
avg = make_running_average()
print(avg(10))   # Expected: 10.0  (10 / 1)
print(avg(20))   # Expected: 15.0  (30 / 2)
print(avg(30))   # Expected: 20.0  (60 / 3)
print(avg(0))    # Expected: 15.0  (60 / 4)

# Each instance is independent
avg2 = make_running_average()
print(avg2(100)) # Expected: 100.0 (100 / 1)`,
          hints: [
            'You need to declare both total and count as nonlocal inside add_number, since both will be reassigned with += operators.',
            'After updating total and count, the running average is simply total / count.',
            'Each call to make_running_average() creates a new independent closure with its own total and count, so separate instances do not share state.',
          ],
        },
      },
    ],
  },
];

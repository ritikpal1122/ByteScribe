import type { DocCategory } from './types';

// Part 2: Control Flow + Functions
export const RUST_PART2_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Control Flow                                                 */
  /* ------------------------------------------------------------ */
  {
    id: 'rust-control-flow',
    label: 'Control Flow',
    icon: 'GitBranch',
    entries: [
      {
        id: 'if-expressions',
        title: 'if Expressions',
        difficulty: 'beginner',
        tags: ['if', 'else', 'conditional', 'expression', 'branching'],
        cheatSheetSummary: 'let x = if cond { a } else { b }; — if is an expression that returns a value',
        crossLanguageId: 'if-else',
        sections: [
          {
            heading: 'if/else as Expressions',
            content:
              'In Rust, if/else is an expression that returns a value, not just a statement. This means you can use it on the right side of a let binding, similar to the ternary operator in other languages. Conditions must be explicitly bool — Rust does not implicitly convert integers, strings, or pointers to boolean.',
            code: `fn main() {
    let x = 42;

    // Standard if/else
    if x > 0 {
        println!("positive");
    } else if x == 0 {
        println!("zero");
    } else {
        println!("negative");
    }

    // if as an expression (replaces ternary operator)
    let label = if x % 2 == 0 { "even" } else { "odd" };
    println!("{} is {}", x, label);

    let abs_val = if x >= 0 { x } else { -x };
    println!("absolute value: {}", abs_val);
}`,
            output: `positive
42 is even
absolute value: 42`,
            warning: 'Both branches of an if expression must return the same type. let x = if true { 42 } else { "hello" }; will not compile.',
            analogy: 'Think of it like a fork in the road that always hands you a package. In most languages, if/else is just a signpost ("go left or right"). In Rust, it is a vending machine at the fork -- whichever path you take, you get a value back. This is why you can write `let x = if ... { a } else { b }` directly.',
            codeHighlightLines: [14, 17],
          },
          {
            heading: 'if let for Pattern Matching',
            content:
              'if let is syntactic sugar for a match where you only care about one pattern. It is commonly used with Option and Result to extract values concisely. You can chain else if let for multiple patterns.',
            code: `fn main() {
    let config: Option<i32> = Some(42);

    // Instead of verbose match
    if let Some(val) = config {
        println!("Config value: {}", val);
    } else {
        println!("No config");
    }

    // Chaining if let
    let result: Result<i32, String> = Ok(100);
    if let Ok(val) = result {
        println!("Success: {}", val);
    } else if let Err(e) = result {
        println!("Error: {}", e);
    }

    // if let with enums
    enum Command {
        Quit,
        Print(String),
    }

    let cmd = Command::Print("hello".to_string());
    if let Command::Print(msg) = cmd {
        println!("Printing: {}", msg);
    }
}`,
            output: `Config value: 42
Success: 100
Printing: hello`,
            tip: 'Use if let when you only care about one variant of an enum. Use match when you need exhaustive handling of all variants.',
            analogy: 'Think of it like opening a gift box. `if let Some(val) = config` is saying "if there is something in this box, take it out and call it val." You only unwrap when there is something inside -- otherwise you skip it gracefully instead of panicking.',
            codeHighlightLines: [5, 13, 26],
          },
          {
            heading: 'Nested Conditions and let-else',
            content:
              'Rust 1.65 introduced let-else, which combines let with a mandatory else block that must diverge (return, break, continue, or panic). This flattens nested if-let chains and reduces indentation.',
            code: `fn process_input(input: &str) -> Result<i32, String> {
    // let-else: bind or diverge
    let Ok(num) = input.parse::<i32>() else {
        return Err(format!("'{}' is not a valid number", input));
    };

    // num is now available in the outer scope
    let result = num * 2;
    Ok(result)
}

fn main() {
    match process_input("21") {
        Ok(val) => println!("Result: {}", val),
        Err(e) => println!("Error: {}", e),
    }

    match process_input("abc") {
        Ok(val) => println!("Result: {}", val),
        Err(e) => println!("Error: {}", e),
    }

    // Nested conditions
    let x = 15;
    let msg = if x > 20 {
        "large"
    } else if x > 10 {
        "medium"
    } else if x > 0 {
        "small"
    } else {
        "non-positive"
    };
    println!("{} is {}", x, msg);
}`,
            output: `Result: 42
Error: 'abc' is not a valid number
15 is medium`,
            note: 'let-else is invaluable for early returns. It keeps the "happy path" at the top level of indentation instead of nesting it inside if let blocks.',
            codeHighlightLines: [3, 4, 8],
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n  A["input.parse::<i32>()"]\n  A -->|"Ok(num)"| B["num available in scope"]\n  A -->|"Err(_)"| C["else block: return Err(...)"]\n  B --> D["Continue with num * 2"]\n  C --> E["Function exits early"]\n  style B fill:#bfb,stroke:#333\n  style C fill:#fbb,stroke:#333\n  style D fill:#dfd,stroke:#333\n  style E fill:#fdd,stroke:#333',
              caption: 'let-else: either the pattern matches and the variable binds, or the else block diverges (returns/panics)',
            },
          },
        ],
        quiz: [
          {
            question: 'What makes if/else different in Rust compared to most other languages?',
            options: [
              'It does not support else if chains',
              'It is an expression that returns a value',
              'It requires parentheses around the condition',
              'It supports implicit type conversion of the condition',
            ],
            correctIndex: 1,
            explanation: 'In Rust, if/else is an expression that returns a value, allowing you to write `let x = if cond { a } else { b };`. This replaces the ternary operator found in other languages.',
          },
          {
            question: 'What does `if let Some(val) = config` do?',
            options: [
              'Assigns Some(val) to config',
              'Checks if config is None and assigns a default',
              'Destructures config if it matches Some, binding the inner value to val',
              'Creates a new Option wrapping val',
            ],
            correctIndex: 2,
            explanation: 'if let is syntactic sugar for a match that only cares about one pattern. `if let Some(val) = config` checks if config is Some and, if so, binds the inner value to val.',
          },
          {
            question: 'What happens if the two branches of an if expression return different types?',
            options: [
              'Rust picks the more general type automatically',
              'The code compiles but panics at runtime',
              'The code will not compile',
              'The value is converted to a string',
            ],
            correctIndex: 2,
            explanation: 'Both branches of an if expression must return the same type. `let x = if true { 42 } else { "hello" };` will not compile because i32 and &str are different types.',
          },
          {
            question: 'What is the purpose of let-else introduced in Rust 1.65?',
            options: [
              'It replaces all match expressions',
              'It allows binding a value or diverging (return/break/panic) in the else block',
              'It creates optional values automatically',
              'It enables dynamic typing in Rust',
            ],
            correctIndex: 1,
            explanation: 'let-else combines let with a mandatory else block that must diverge. This flattens nested if-let chains: `let Ok(num) = input.parse::<i32>() else { return Err(...); };`.',
          },
        ],
        challenge: {
          prompt: 'Write a function `classify_number` that takes an i32 and returns a &str. Use if expressions to return "positive even", "positive odd", "zero", "negative even", or "negative odd". Then use if let to extract and print a value from an Option<i32>.',
          starterCode: `fn classify_number(n: i32) -> &'static str {
    // Use if/else expressions to classify the number
    // Return: "positive even", "positive odd", "zero", "negative even", or "negative odd"
    todo!()
}

fn main() {
    println!("{}: {}", 42, classify_number(42));
    println!("{}: {}", -3, classify_number(-3));
    println!("{}: {}", 0, classify_number(0));

    let maybe_value: Option<i32> = Some(100);
    // Use if let to extract and print the value
    // Print "Got: <value>" if Some, "Nothing" if None
}`,
          solutionCode: `fn classify_number(n: i32) -> &'static str {
    if n == 0 {
        "zero"
    } else if n > 0 {
        if n % 2 == 0 { "positive even" } else { "positive odd" }
    } else {
        if n % 2 == 0 { "negative even" } else { "negative odd" }
    }
}

fn main() {
    println!("{}: {}", 42, classify_number(42));
    println!("{}: {}", -3, classify_number(-3));
    println!("{}: {}", 0, classify_number(0));

    let maybe_value: Option<i32> = Some(100);
    if let Some(val) = maybe_value {
        println!("Got: {}", val);
    } else {
        println!("Nothing");
    }
}`,
          hints: [
            'Remember that if/else is an expression in Rust -- you can return values directly from the branches without using return.',
            'Use the modulo operator (%) to check even/odd. Check for zero first to avoid ambiguity.',
            'For if let, the pattern goes on the left side of the equals sign: `if let Some(val) = option_value`.',
          ],
        },
      },
      {
        id: 'loops',
        title: 'loop (Infinite Loops)',
        difficulty: 'beginner',
        tags: ['loop', 'infinite', 'break', 'continue', 'labels'],
        cheatSheetSummary: 'loop { break value; } — infinite loop that can return a value via break',
        crossLanguageId: 'loops',
        sections: [
          {
            heading: 'Basic loop',
            content:
              'The loop keyword creates an unconditional infinite loop. You exit it with break, optionally returning a value. This is useful when the termination condition is complex or when you need to retry an operation until it succeeds.',
            code: `fn main() {
    // Basic loop with break
    let mut count = 0;
    loop {
        count += 1;
        if count == 5 {
            break;
        }
    }
    println!("Counted to {}", count);

    // Loop returning a value
    let mut n = 1;
    let result = loop {
        n *= 2;
        if n > 100 {
            break n;  // loop evaluates to this value
        }
    };
    println!("First power of 2 > 100: {}", result);
}`,
            output: `Counted to 5
First power of 2 > 100: 128`,
            tip: 'Prefer loop over while true. It communicates intent more clearly and the compiler can reason better about the control flow.',
            analogy: 'Think of it like a merry-go-round with an ejection seat. The loop spins forever, and `break` is pulling the eject lever. The special trick in Rust is that you can grab a prize on your way out -- `break n` ejects you while handing you the value `n`.',
            codeHighlightLines: [14, 17],
          },
          {
            heading: 'continue and Loop Labels',
            content:
              'Use continue to skip the rest of the current iteration. Loop labels (prefixed with a single quote) let you break or continue an outer loop from inside a nested loop.',
            code: `fn main() {
    // continue skips to next iteration
    for i in 0..10 {
        if i % 3 == 0 {
            continue;  // skip multiples of 3
        }
        print!("{} ", i);
    }
    println!();

    // Loop labels for nested loops
    'outer: for i in 0..5 {
        for j in 0..5 {
            if i + j == 4 {
                println!("Breaking outer at ({}, {})", i, j);
                break 'outer;
            }
        }
    }

    // Continue with labels
    'rows: for row in 0..3 {
        for col in 0..3 {
            if col == 1 {
                continue 'rows;  // skip to next row
            }
            print!("({},{}) ", row, col);
        }
    }
    println!();
}`,
            output: `1 2 4 5 7 8
Breaking outer at (0, 4)
(0,0) (1,0) (2,0)`,
            note: 'Loop labels start with a single quote: \'outer. This syntax is intentionally different from lifetime annotations to make the code more readable.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n  A["\'outer: for i in 0..5"] --> B["for j in 0..5"]\n  B --> C{"i + j == 4?"}\n  C -->|"No"| D["Next j"]\n  D --> B\n  C -->|"Yes"| E["break \'outer"]\n  E --> F["Exit both loops"]\n  style A fill:#ffd,stroke:#333\n  style E fill:#fbb,stroke:#333\n  style F fill:#ddd,stroke:#333',
              caption: 'Loop labels let break and continue target a specific outer loop, not just the innermost one',
            },
          },
          {
            heading: 'Retry Patterns with loop',
            content:
              'The loop construct is ideal for retry logic, input validation, and state machines where you repeat until a condition is met.',
            code: `use std::collections::HashMap;

fn main() {
    // Retry pattern: keep trying until success
    let mut attempts = 0;
    let value = loop {
        attempts += 1;
        let simulated = attempts * 7 % 13;
        if simulated > 10 {
            break simulated;
        }
    };
    println!("Got {} after {} attempts", value, attempts);

    // State machine with loop
    let input = vec!['a', '1', 'b', '2', 'c'];
    let mut letters = Vec::new();
    let mut digits = Vec::new();
    let mut idx = 0;

    loop {
        if idx >= input.len() {
            break;
        }
        let ch = input[idx];
        if ch.is_alphabetic() {
            letters.push(ch);
        } else if ch.is_numeric() {
            digits.push(ch);
        }
        idx += 1;
    }
    println!("Letters: {:?}, Digits: {:?}", letters, digits);
}`,
            output: `Got 11 after 5 attempts
Letters: ['a', 'b', 'c'], Digits: ['1', '2']`,
          },
        ],
        quiz: [
          {
            question: 'How can a loop expression return a value in Rust?',
            options: [
              'By using the return keyword inside the loop',
              'By using break with a value: break value;',
              'By assigning to a variable on the last iteration',
              'Loops cannot return values in Rust',
            ],
            correctIndex: 1,
            explanation: 'In Rust, you can return a value from a loop by using `break value;`. The loop expression then evaluates to that value, e.g., `let result = loop { break 42; };`.',
          },
          {
            question: 'What does a loop label like \'outer allow you to do?',
            options: [
              'Name a loop for debugging purposes only',
              'Break or continue a specific outer loop from inside a nested loop',
              'Create a lifetime annotation for the loop variable',
              'Make the loop run in a separate thread',
            ],
            correctIndex: 1,
            explanation: 'Loop labels (e.g., \'outer) let you target a specific loop with break or continue from inside nested loops. `break \'outer` exits the outer loop, not just the innermost one.',
          },
          {
            question: 'Why is `loop` preferred over `while true` in Rust?',
            options: [
              'loop runs faster than while true',
              'while true is a syntax error in Rust',
              'loop communicates intent more clearly and allows the compiler to reason better about control flow',
              'loop automatically handles error cases',
            ],
            correctIndex: 2,
            explanation: 'While `while true` does compile in Rust, `loop` is preferred because it clearly communicates that the loop is intentionally infinite and helps the compiler reason about control flow (e.g., it knows the loop body always executes at least once).',
          },
        ],
        challenge: {
          prompt: 'Write a program that uses a loop to find the first number in the Fibonacci sequence that exceeds 1000. Use `break` to return the value from the loop. Also use loop labels to break out of a nested loop that searches for the first pair (i, j) where i * j > 50 with i and j each going from 1 to 10.',
          starterCode: `fn main() {
    // Part 1: Find first Fibonacci number > 1000 using loop with break value
    let mut a: u64 = 0;
    let mut b: u64 = 1;
    let fib = loop {
        // TODO: compute next Fibonacci number and break when > 1000
        todo!()
    };
    println!("First Fibonacci > 1000: {}", fib);

    // Part 2: Find first (i, j) where i * j > 50 using labeled loops
    // Use 'outer label to break from the nested loop
    // i and j go from 1 to 10
    todo!()
}`,
          solutionCode: `fn main() {
    let mut a: u64 = 0;
    let mut b: u64 = 1;
    let fib = loop {
        let next = a + b;
        a = b;
        b = next;
        if b > 1000 {
            break b;
        }
    };
    println!("First Fibonacci > 1000: {}", fib);

    'outer: for i in 1..=10 {
        for j in 1..=10 {
            if i * j > 50 {
                println!("First pair: ({}, {}) with product {}", i, j, i * j);
                break 'outer;
            }
        }
    }
}`,
          hints: [
            'For Fibonacci, keep two variables a and b. Each iteration computes next = a + b, then shifts: a = b, b = next.',
            'Use `break b;` to return the Fibonacci value from the loop when b > 1000.',
            'For the nested loop, prefix the outer loop with `\'outer:` and use `break \'outer;` to exit both loops at once.',
          ],
        },
      },
      {
        id: 'while-loops',
        title: 'while Loops',
        difficulty: 'beginner',
        tags: ['while', 'while-let', 'condition', 'loop'],
        cheatSheetSummary: 'while condition { } and while let Some(x) = iter.next() { }',
        crossLanguageId: 'while-loop',
        sections: [
          {
            heading: 'Basic while Loop',
            content:
              'The while loop repeats a block as long as a condition is true. The condition is checked before each iteration. Unlike loop, while cannot return a value directly.',
            code: `fn main() {
    // Countdown
    let mut n = 5;
    while n > 0 {
        print!("{} ", n);
        n -= 1;
    }
    println!("Liftoff!");

    // Sum digits of a number
    let mut num = 12345;
    let mut digit_sum = 0;
    while num > 0 {
        digit_sum += num % 10;
        num /= 10;
    }
    println!("Sum of digits of 12345: {}", digit_sum);

    // Collatz sequence
    let mut x = 27;
    let mut steps = 0;
    while x != 1 {
        x = if x % 2 == 0 { x / 2 } else { 3 * x + 1 };
        steps += 1;
    }
    println!("Collatz(27) reached 1 in {} steps", steps);
}`,
            output: `5 4 3 2 1 Liftoff!
Sum of digits of 12345: 15
Collatz(27) reached 1 in 111 steps`,
          },
          {
            heading: 'while let',
            content:
              'while let is the loop equivalent of if let. It continues looping as long as a pattern matches, which is perfect for consuming iterators, popping from stacks, or processing Option/Result values.',
            code: `fn main() {
    // Pop from a stack until empty
    let mut stack = vec![1, 2, 3, 4, 5];
    while let Some(top) = stack.pop() {
        print!("{} ", top);
    }
    println!(); // 5 4 3 2 1

    // Process an iterator
    let data = vec!["42", "abc", "17", "xyz", "99"];
    let mut iter = data.iter();
    let mut numbers = Vec::new();

    while let Some(item) = iter.next() {
        if let Ok(n) = item.parse::<i32>() {
            numbers.push(n);
        }
    }
    println!("Parsed numbers: {:?}", numbers);

    // Read lines from a channel-like pattern
    let mut messages = vec![
        Some("hello"),
        Some("world"),
        None,
        Some("ignored"),
    ].into_iter();

    while let Some(Some(msg)) = messages.next() {
        println!("Message: {}", msg);
    }
}`,
            output: `5 4 3 2 1
Parsed numbers: [42, 17, 99]
Message: hello
Message: world`,
            tip: 'while let Some(x) = stack.pop() is the idiomatic way to drain a Vec as a stack. It is cleaner than while !stack.is_empty() { let x = stack.pop().unwrap(); }.',
            analogy: 'Think of it like reaching into a bag of marbles. Each time you reach in (`while let Some(marble) = bag.pop()`), you grab one marble and do something with it. The loop naturally stops the moment the bag is empty and your hand comes out with nothing (`None`).',
            codeHighlightLines: [4, 14, 29],
          },
          {
            heading: 'Common while Patterns',
            content:
              'While loops are useful for algorithms where the number of iterations is not known in advance, such as convergence algorithms, input processing, and two-pointer techniques.',
            code: `fn main() {
    // Two-pointer technique: find pair that sums to target
    let sorted = vec![1, 3, 5, 7, 9, 11, 15];
    let target = 16;
    let mut left = 0;
    let mut right = sorted.len() - 1;

    while left < right {
        let sum = sorted[left] + sorted[right];
        if sum == target {
            println!("Found pair: {} + {} = {}", sorted[left], sorted[right], target);
            break;
        } else if sum < target {
            left += 1;
        } else {
            right -= 1;
        }
    }

    // Newton's method for square root
    let n: f64 = 2.0;
    let mut guess = n / 2.0;
    let epsilon = 1e-10;
    while (guess * guess - n).abs() > epsilon {
        guess = (guess + n / guess) / 2.0;
    }
    println!("sqrt(2) ≈ {:.10}", guess);
}`,
            output: `Found pair: 1 + 15 = 16
sqrt(2) ≈ 1.4142135624`,
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n  A["left=0"] --- B["1"] --- C["3"] --- D["5"] --- E["7"] --- F["9"] --- G["11"] --- H["15"]\n  I["right=6"] --- H\n  A -.->|"Move right"| C\n  I -.->|"Move left"| G\n  style A fill:#bfb,stroke:#333\n  style I fill:#fbb,stroke:#333\n  style B fill:#dfd,stroke:#333\n  style H fill:#fdd,stroke:#333',
              caption: 'Two-pointer technique: left pointer moves right, right pointer moves left, meeting when the pair is found',
            },
          },
        ],
        quiz: [
          {
            question: 'What is the key difference between while and loop in Rust?',
            options: [
              'while can return a value but loop cannot',
              'loop checks a condition before each iteration',
              'while checks a condition before each iteration, while loop runs unconditionally',
              'There is no difference; they are interchangeable',
            ],
            correctIndex: 2,
            explanation: 'A while loop checks its condition before each iteration and stops when it becomes false. A loop runs unconditionally and must be exited with break. Unlike loop, while cannot directly return a value.',
          },
          {
            question: 'What does `while let Some(top) = stack.pop()` do?',
            options: [
              'Pushes elements onto the stack until it is full',
              'Pops elements one at a time until the stack is empty',
              'Checks if the stack is a Some variant',
              'Creates a new stack from the top element',
            ],
            correctIndex: 1,
            explanation: 'while let continues looping as long as the pattern matches. Since Vec::pop() returns Some(value) when non-empty and None when empty, this idiomatically drains the stack one element at a time.',
          },
          {
            question: 'In the two-pointer technique, what determines whether the left pointer moves right or the right pointer moves left?',
            options: [
              'The left pointer always moves first',
              'Pointers alternate moving each iteration',
              'If the current sum is less than target, move left pointer right; if greater, move right pointer left',
              'Both pointers move toward the center simultaneously',
            ],
            correctIndex: 2,
            explanation: 'In the two-pointer technique on a sorted array, if the sum of elements at left and right is too small, move left right to increase it. If too large, move right left to decrease it. This converges on the target sum.',
          },
        ],
        challenge: {
          prompt: 'Write a function `sum_digits` that uses a while loop to sum all digits of a positive integer. Then write a `drain_stack` function that uses `while let` to pop all elements from a Vec<i32>, doubling each one, and returning a new Vec with the doubled values (they will be in reverse order).',
          starterCode: `fn sum_digits(mut n: u64) -> u64 {
    // Use a while loop to sum all digits of n
    // Hint: use % 10 to get last digit, / 10 to remove it
    todo!()
}

fn drain_stack(mut stack: Vec<i32>) -> Vec<i32> {
    // Use while let to pop elements, double them, and collect into a new Vec
    todo!()
}

fn main() {
    println!("sum_digits(12345) = {}", sum_digits(12345)); // 15
    println!("sum_digits(9999) = {}", sum_digits(9999));   // 36

    let stack = vec![1, 2, 3, 4, 5];
    let result = drain_stack(stack);
    println!("drain_stack: {:?}", result); // [10, 8, 6, 4, 2]
}`,
          solutionCode: `fn sum_digits(mut n: u64) -> u64 {
    let mut sum = 0;
    while n > 0 {
        sum += n % 10;
        n /= 10;
    }
    sum
}

fn drain_stack(mut stack: Vec<i32>) -> Vec<i32> {
    let mut result = Vec::new();
    while let Some(val) = stack.pop() {
        result.push(val * 2);
    }
    result
}

fn main() {
    println!("sum_digits(12345) = {}", sum_digits(12345));
    println!("sum_digits(9999) = {}", sum_digits(9999));

    let stack = vec![1, 2, 3, 4, 5];
    let result = drain_stack(stack);
    println!("drain_stack: {:?}", result);
}`,
          hints: [
            'For sum_digits, use `n % 10` to get the last digit and `n /= 10` to remove it. Loop while n > 0.',
            'For drain_stack, use `while let Some(val) = stack.pop()` to get each element. pop() returns from the end, so the result will be in reverse order.',
            'Remember that `while let` automatically stops when the pattern no longer matches (i.e., when pop() returns None).',
          ],
        },
      },
      {
        id: 'for-loops',
        title: 'for Loops',
        difficulty: 'beginner',
        tags: ['for', 'range', 'iterator', 'enumerate', 'iteration'],
        cheatSheetSummary: 'for x in collection { } — iterates over anything implementing IntoIterator',
        crossLanguageId: 'for-loop',
        sections: [
          {
            heading: 'Iterating with Ranges',
            content:
              'The for loop in Rust iterates over any type that implements the IntoIterator trait. Ranges are the most basic iterator. Use .. for exclusive ranges and ..= for inclusive ranges. Ranges can be reversed with .rev().',
            code: `fn main() {
    // Exclusive range: 0 to 4
    for i in 0..5 {
        print!("{} ", i);
    }
    println!(); // 0 1 2 3 4

    // Inclusive range: 1 to 5
    for i in 1..=5 {
        print!("{} ", i);
    }
    println!(); // 1 2 3 4 5

    // Reverse range
    for i in (0..5).rev() {
        print!("{} ", i);
    }
    println!(); // 4 3 2 1 0

    // Step by 2
    for i in (0..10).step_by(2) {
        print!("{} ", i);
    }
    println!(); // 0 2 4 6 8

    // Range in a condition
    let x = 42;
    if (1..=100).contains(&x) {
        println!("{} is in range 1..=100", x);
    }
}`,
            output: `0 1 2 3 4
1 2 3 4 5
4 3 2 1 0
0 2 4 6 8
42 is in range 1..=100`,
            tip: 'Use 0..n for exclusive ranges (array indexing style) and 1..=n for inclusive ranges (mathematical style). The inclusive range 0..=5 includes both 0 and 5.',
          },
          {
            heading: 'Iterating Over Collections',
            content:
              'For loops work with any iterable: vectors, arrays, strings, hash maps, and more. The three iteration methods are &collection (borrow), &mut collection (mutable borrow), and collection (consume/move).',
            code: `use std::collections::HashMap;

fn main() {
    let fruits = vec!["apple", "banana", "cherry"];

    // Borrow: &collection (most common)
    for fruit in &fruits {
        print!("{} ", fruit);
    }
    println!();
    // fruits still usable here

    // Enumerate: (index, value) pairs
    for (i, fruit) in fruits.iter().enumerate() {
        println!("{}: {}", i, fruit);
    }

    // Mutable borrow: &mut collection
    let mut nums = vec![1, 2, 3, 4, 5];
    for n in &mut nums {
        *n *= 2;
    }
    println!("doubled: {:?}", nums);

    // Consuming: moves the collection
    let names = vec!["Alice", "Bob"];
    for name in names {
        println!("Hello, {}!", name);
    }
    // names is no longer available here

    // Iterating over HashMap
    let mut scores = HashMap::new();
    scores.insert("Alice", 95);
    scores.insert("Bob", 87);
    for (name, score) in &scores {
        println!("{}: {}", name, score);
    }
}`,
            output: `apple banana cherry
0: apple
1: banana
2: cherry
doubled: [2, 4, 6, 8, 10]
Hello, Alice!
Hello, Bob!
Alice: 95
Bob: 87`,
            warning: 'Using for item in collection (without &) moves/consumes the collection. You cannot use it afterward. Use for item in &collection to borrow instead.',
            analogy: 'Think of it like three ways to browse a library. `&collection` is reading books on-site (the library keeps them). `&mut collection` is borrowing with permission to annotate (you can modify). `collection` without `&` is checking them out permanently -- the library no longer has them.',
            codeHighlightLines: [7, 20, 27],
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n  A["for x in ..."] --> B{"How?"}\n  B -->|"&collection"| C["Immutable borrow\\nCollection still usable"]\n  B -->|"&mut collection"| D["Mutable borrow\\nCan modify elements"]\n  B -->|"collection"| E["Move/consume\\nCollection gone after loop"]\n  style C fill:#bfb,stroke:#333\n  style D fill:#ffd,stroke:#333\n  style E fill:#fbb,stroke:#333',
              caption: 'Three iteration modes: borrow, mutable borrow, or consume',
            },
          },
          {
            heading: 'Advanced for Patterns',
            content:
              'For loops support destructuring, filtering with iterators, zipping multiple collections, and iterating over characters in strings.',
            code: `fn main() {
    // Destructuring in for loops
    let points = vec![(1, 2), (3, 4), (5, 6)];
    for (x, y) in &points {
        println!("({}, {})", x, y);
    }

    // Zip: iterate two collections in parallel
    let names = vec!["Alice", "Bob", "Charlie"];
    let ages = vec![25, 30, 35];
    for (name, age) in names.iter().zip(ages.iter()) {
        println!("{} is {}", name, age);
    }

    // Filter while iterating
    let nums = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let evens: Vec<_> = nums.iter().filter(|&&n| n % 2 == 0).collect();
    println!("evens: {:?}", evens);

    // Iterate over characters
    for ch in "Hello, 🌍!".chars() {
        print!("[{}]", ch);
    }
    println!();

    // Iterate with windows
    let data = [1, 2, 3, 4, 5];
    for window in data.windows(3) {
        println!("window: {:?}, sum: {}", window, window.iter().sum::<i32>());
    }
}`,
            output: `(1, 2)
(3, 4)
(5, 6)
Alice is 25
Bob is 30
Charlie is 35
evens: [2, 4, 6, 8, 10]
[H][e][l][l][o][,][ ][🌍][!]
window: [1, 2, 3], sum: 6
window: [2, 3, 4], sum: 9
window: [3, 4, 5], sum: 12`,
          },
        ],
        quiz: [
          {
            question: 'What is the difference between 0..5 and 0..=5 in a for loop?',
            options: [
              'There is no difference',
              '0..5 includes 5 but 0..=5 does not',
              '0..5 excludes 5 (yields 0-4) while 0..=5 includes 5 (yields 0-5)',
              '0..=5 is a syntax error',
            ],
            correctIndex: 2,
            explanation: '0..5 is an exclusive range that yields 0, 1, 2, 3, 4. 0..=5 is an inclusive range that yields 0, 1, 2, 3, 4, 5. The ..= operator includes the upper bound.',
          },
          {
            question: 'What happens when you use `for item in collection` (without &)?',
            options: [
              'The collection is borrowed immutably',
              'The collection is borrowed mutably',
              'The collection is moved/consumed and cannot be used afterward',
              'The collection is cloned automatically',
            ],
            correctIndex: 2,
            explanation: 'Using `for item in collection` without & moves the collection into the for loop. After the loop, the collection is consumed and no longer available. Use `&collection` to borrow instead.',
          },
          {
            question: 'How do you iterate over a vector with both the index and the value?',
            options: [
              'for (i, val) in &vec { }',
              'for (i, val) in vec.iter().enumerate() { }',
              'for i, val in vec.enumerate() { }',
              'for val in vec.indexed() { }',
            ],
            correctIndex: 1,
            explanation: 'Use `.iter().enumerate()` to get (index, value) pairs. The enumerate() adapter wraps each element with its index as a tuple: `for (i, val) in vec.iter().enumerate() { }`.',
          },
          {
            question: 'What does `.zip()` do when iterating?',
            options: [
              'Compresses the collection to save memory',
              'Combines two iterators into one that yields pairs of elements',
              'Sorts both collections simultaneously',
              'Filters out duplicate elements across two collections',
            ],
            correctIndex: 1,
            explanation: 'The .zip() method combines two iterators into one that yields pairs (tuples) of corresponding elements. It stops when either iterator is exhausted.',
          },
        ],
        challenge: {
          prompt: 'Write a function `moving_average` that takes a slice of f64 values and a window size, and returns a Vec<f64> of moving averages. Use a for loop with the `.windows()` method. Also write a function `pair_sums` that takes two slices and returns a Vec of their element-wise sums using `.zip()`.',
          starterCode: `fn moving_average(data: &[f64], window: usize) -> Vec<f64> {
    // Use data.windows(window) in a for loop
    // For each window, compute the average and push to result
    todo!()
}

fn pair_sums(a: &[i32], b: &[i32]) -> Vec<i32> {
    // Use a.iter().zip(b.iter()) to sum corresponding elements
    todo!()
}

fn main() {
    let data = vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0];
    let avgs = moving_average(&data, 3);
    println!("Moving averages (window=3): {:?}", avgs);
    // Expected: [2.0, 3.0, 4.0, 5.0]

    let a = vec![1, 2, 3, 4];
    let b = vec![10, 20, 30, 40];
    println!("Pair sums: {:?}", pair_sums(&a, &b));
    // Expected: [11, 22, 33, 44]
}`,
          solutionCode: `fn moving_average(data: &[f64], window: usize) -> Vec<f64> {
    let mut result = Vec::new();
    for w in data.windows(window) {
        let sum: f64 = w.iter().sum();
        result.push(sum / window as f64);
    }
    result
}

fn pair_sums(a: &[i32], b: &[i32]) -> Vec<i32> {
    let mut result = Vec::new();
    for (&x, &y) in a.iter().zip(b.iter()) {
        result.push(x + y);
    }
    result
}

fn main() {
    let data = vec![1.0, 2.0, 3.0, 4.0, 5.0, 6.0];
    let avgs = moving_average(&data, 3);
    println!("Moving averages (window=3): {:?}", avgs);

    let a = vec![1, 2, 3, 4];
    let b = vec![10, 20, 30, 40];
    println!("Pair sums: {:?}", pair_sums(&a, &b));
}`,
          hints: [
            'Use `data.windows(window)` to get overlapping slices. Each window is a &[f64] of the given size.',
            'To sum a window, use `w.iter().sum::<f64>()` and divide by `window as f64` for the average.',
            'For zip, destructure the tuple in the for pattern: `for (&x, &y) in a.iter().zip(b.iter())`.',
          ],
        },
      },
      {
        id: 'match-expressions',
        title: 'match Expressions',
        difficulty: 'intermediate',
        tags: ['match', 'pattern-matching', 'exhaustive', 'guards', 'destructuring'],
        cheatSheetSummary: 'match value { pattern => expr, _ => default } — exhaustive pattern matching',
        crossLanguageId: 'switch-match',
        sections: [
          {
            heading: 'Basic match',
            content:
              'match is Rust\'s most powerful control flow construct. It compares a value against a series of patterns and executes the code for the first matching pattern. Unlike switch in C/Java, match is exhaustive (you must handle every possible case) and arms do not fall through.',
            code: `fn main() {
    let x = 3;
    match x {
        1 => println!("one"),
        2 | 3 => println!("two or three"),  // multiple patterns
        4..=10 => println!("four to ten"),   // range pattern
        _ => println!("something else"),     // wildcard
    }

    // match as expression
    let msg = match x {
        1 => "one",
        2 => "two",
        3 => "three",
        _ => "other",
    };
    println!("{} is {}", x, msg);

    // Match on boolean
    let valid = true;
    match valid {
        true => println!("yes"),
        false => println!("no"),
    }
}`,
            output: `two or three
3 is three
yes`,
            note: 'match arms do not fall through like C switch cases. Each arm is independent and only the first matching arm executes.',
            analogy: 'Think of it like a mail sorting machine. Each arm is a slot with a label (pattern). The letter (value) slides through and drops into the first slot whose label matches. Unlike a C switch, there is a wall between slots -- the letter never slides into the next one. And the machine rejects any letter if there is no matching slot (exhaustiveness check).',
            codeHighlightLines: [5, 6, 7, 11],
          },
          {
            heading: 'Match Guards and Binding',
            content:
              'Match guards add extra conditions with if. The @ operator lets you bind a name to a value while testing it against a pattern. These features make match extremely expressive for complex conditional logic.',
            code: `fn main() {
    // Match guard with if
    let num = 42;
    match num {
        n if n < 0 => println!("{} is negative", n),
        n if n == 0 => println!("zero"),
        n if n % 2 == 0 => println!("{} is positive even", n),
        n => println!("{} is positive odd", n),
    }

    // @ binding: name a value while matching
    let age = 25;
    match age {
        0 => println!("newborn"),
        a @ 1..=12 => println!("child aged {}", a),
        a @ 13..=17 => println!("teen aged {}", a),
        a @ 18..=64 => println!("adult aged {}", a),
        a => println!("senior aged {}", a),
    }

    // Match on Option with guard
    let opt: Option<i32> = Some(-5);
    match opt {
        Some(x) if x > 0 => println!("positive: {}", x),
        Some(x) if x < 0 => println!("negative: {}", x),
        Some(0) => println!("zero"),
        Some(_) => unreachable!(),
        None => println!("none"),
    }
}`,
            output: `42 is positive even
adult aged 25
negative: -5`,
            tip: 'Match guards are evaluated after the pattern matches. The guard condition has access to the variables bound by the pattern.',
            codeHighlightLines: [5, 7, 15, 16, 17],
          },
          {
            heading: 'Destructuring in match',
            content:
              'match excels at destructuring complex types: tuples, structs, enums, and nested combinations. This makes it ideal for processing algebraic data types and complex state.',
            code: `#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

enum Command {
    Quit,
    Echo(String),
    Move { x: i32, y: i32 },
    Color(u8, u8, u8),
}

fn main() {
    // Destructure tuples
    let point = (3, -5);
    match point {
        (0, 0) => println!("origin"),
        (x, 0) => println!("on x-axis at {}", x),
        (0, y) => println!("on y-axis at {}", y),
        (x, y) => println!("at ({}, {})", x, y),
    }

    // Destructure structs
    let p = Point { x: 5, y: 0 };
    match p {
        Point { x, y: 0 } => println!("on x-axis at x={}", x),
        Point { x: 0, y } => println!("on y-axis at y={}", y),
        Point { x, y } => println!("({}, {})", x, y),
    }

    // Destructure enums
    let cmd = Command::Color(255, 128, 0);
    match cmd {
        Command::Quit => println!("quit"),
        Command::Echo(msg) => println!("echo: {}", msg),
        Command::Move { x, y } => println!("move to ({}, {})", x, y),
        Command::Color(r, g, b) => println!("color: rgb({}, {}, {})", r, g, b),
    }
}`,
            output: `at (3, -5)
on x-axis at x=5
color: rgb(255, 128, 0)`,
            note: 'Destructuring in match is one of Rust\'s most powerful features. It replaces chains of if/else and accessor calls with a single, readable expression.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n  A["match cmd"] --> B{"Which variant?"}\n  B -->|"Command::Quit"| C["Handle quit"]\n  B -->|"Command::Echo(msg)"| D["Use msg"]\n  B -->|"Command::Move \\{ x, y \\}"| E["Use x, y"]\n  B -->|"Command::Color(r,g,b)"| F["Use r, g, b"]\n  style A fill:#ffd,stroke:#333\n  style C fill:#dfd,stroke:#333\n  style D fill:#dfd,stroke:#333\n  style E fill:#dfd,stroke:#333\n  style F fill:#dfd,stroke:#333',
              caption: 'match destructures enums: each variant is handled with its inner data extracted automatically',
            },
          },
        ],
        quiz: [
          {
            question: 'What does "exhaustive" mean in the context of Rust\'s match expression?',
            options: [
              'Every match arm must contain at least one statement',
              'The match must handle every possible value of the matched type',
              'All patterns must be mutually exclusive',
              'The match expression must always have a default _ arm',
            ],
            correctIndex: 1,
            explanation: 'Exhaustiveness means every possible value of the matched type must be covered by at least one arm. The compiler enforces this at compile time. You do not necessarily need a _ wildcard arm -- for example, matching on a bool with true and false arms is exhaustive without _.',
          },
          {
            question: 'What does the `@` operator do in a match pattern?',
            options: [
              'It references the memory address of the matched value',
              'It binds a name to the matched value while simultaneously testing a pattern',
              'It creates a mutable reference to the matched value',
              'It marks a pattern as optional',
            ],
            correctIndex: 1,
            explanation: 'The @ operator lets you bind a name to a value while also testing it against a pattern. For example, `a @ 1..=12` matches values in the range 1 to 12 and binds the matched value to the name `a`, so you can use the actual value in the arm body.',
          },
          {
            question: 'How do match guards work in Rust?',
            options: [
              'They prevent certain arms from being compiled',
              'They add an extra boolean condition with `if` after the pattern',
              'They restrict which types can be matched',
              'They enforce that the pattern is checked at runtime only',
            ],
            correctIndex: 1,
            explanation: 'A match guard is an additional `if` condition written after the pattern: `pattern if condition => body`. The arm only matches if both the pattern matches AND the guard condition is true. The guard has access to variables bound by the pattern.',
          },
          {
            question: 'Do match arms in Rust fall through to the next arm like C switch cases?',
            options: [
              'Yes, unless you use break',
              'Yes, by default, but you can prevent it with a return',
              'No, each arm is independent and only the first matching arm executes',
              'No, but you can opt into fallthrough with the fallthrough keyword',
            ],
            correctIndex: 2,
            explanation: 'Unlike C/C++ switch statements, Rust match arms do not fall through. Only the first matching arm executes, and there is no fallthrough behavior. If you want multiple patterns to execute the same code, use the | operator: `1 | 2 | 3 => ...`.',
          },
        ],
        challenge: {
          prompt: 'Write a function `describe_point` that takes an (i32, i32) tuple and uses match with destructuring and guards to return a description: "origin" for (0,0), "on x-axis" for (_, 0), "on y-axis" for (0, _), "quadrant I/II/III/IV" based on signs.',
          starterCode: `fn describe_point(point: (i32, i32)) -> &'static str {
    // Use match with destructuring and guards
    // to classify the point
    todo!()
}

fn main() {
    let points = [(0, 0), (3, 0), (0, -2), (1, 1), (-1, 1), (-3, -4), (5, -2)];
    for p in &points {
        println!("{:?} -> {}", p, describe_point(*p));
    }
}`,
          solutionCode: `fn describe_point(point: (i32, i32)) -> &'static str {
    match point {
        (0, 0) => "origin",
        (_, 0) => "on x-axis",
        (0, _) => "on y-axis",
        (x, y) if x > 0 && y > 0 => "quadrant I",
        (x, y) if x < 0 && y > 0 => "quadrant II",
        (x, y) if x < 0 && y < 0 => "quadrant III",
        (_, _) => "quadrant IV",
    }
}

fn main() {
    let points = [(0, 0), (3, 0), (0, -2), (1, 1), (-1, 1), (-3, -4), (5, -2)];
    for p in &points {
        println!("{:?} -> {}", p, describe_point(*p));
    }
}`,
          hints: [
            'Start with the most specific pattern (0, 0) first, then axis patterns, then quadrant patterns with guards.',
            'Use match guards like `(x, y) if x > 0 && y > 0` for quadrant classification.',
            'The catch-all pattern at the end handles the remaining quadrant IV case.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Functions                                                    */
  /* ------------------------------------------------------------ */
  {
    id: 'rust-functions',
    label: 'Functions',
    icon: 'Code',
    entries: [
      {
        id: 'functions',
        title: 'Functions',
        difficulty: 'beginner',
        tags: ['fn', 'return', 'parameters', 'expression', 'implicit-return'],
        cheatSheetSummary: 'fn name(param: Type) -> ReturnType { expr }',
        crossLanguageId: 'functions',
        sections: [
          {
            heading: 'Function Syntax',
            content:
              'Functions in Rust are declared with fn and require explicit type annotations for all parameters and the return type. The last expression in the function body (without a semicolon) is the implicit return value. Adding a semicolon turns it into a statement that returns ().',
            code: `// Basic function with return type
fn add(a: i32, b: i32) -> i32 {
    a + b  // no semicolon = implicit return
}

// Explicit return for early exit
fn first_positive(nums: &[i32]) -> Option<i32> {
    for &n in nums {
        if n > 0 {
            return Some(n);  // explicit early return
        }
    }
    None  // implicit return
}

// Multiple return values via tuple
fn min_max(values: &[i32]) -> (i32, i32) {
    let mut min = values[0];
    let mut max = values[0];
    for &v in &values[1..] {
        if v < min { min = v; }
        if v > max { max = v; }
    }
    (min, max)
}

fn main() {
    println!("3 + 4 = {}", add(3, 4));
    println!("first positive: {:?}", first_positive(&[-1, -2, 3, 4]));

    let data = vec![5, 2, 8, 1, 9];
    let (lo, hi) = min_max(&data);
    println!("min: {}, max: {}", lo, hi);
}`,
            output: `3 + 4 = 7
first positive: Some(3)
min: 1, max: 9`,
            warning: 'A common beginner mistake: fn foo() -> i32 { 42; } will not compile because the semicolon makes 42 a statement returning (), not i32. Remove the semicolon: { 42 }.',
            codeHighlightLines: [3, 10, 13, 24],
          },
          {
            heading: 'Function Parameters and References',
            content:
              'Functions can take ownership of values, borrow them immutably, or borrow them mutably. The choice affects whether the caller can continue using the value after the call. Prefer borrowing (&T or &mut T) unless the function needs to own the data.',
            code: `// Takes ownership (caller loses access)
fn consume(s: String) {
    println!("Consumed: {}", s);
} // s dropped here

// Borrows immutably (caller retains access)
fn print_length(s: &str) {
    println!("Length of '{}': {}", s, s.len());
}

// Borrows mutably (caller retains access, value may change)
fn append_exclamation(s: &mut String) {
    s.push('!');
}

fn main() {
    let text = String::from("hello");

    // Immutable borrow: caller keeps ownership
    print_length(&text);
    println!("Still have: {}", text);

    // Mutable borrow: caller keeps ownership
    let mut greeting = String::from("hello");
    append_exclamation(&mut greeting);
    println!("Modified: {}", greeting);

    // Move: caller loses ownership
    consume(text);
    // println!("{}", text);  // ERROR: text was moved
}`,
            output: `Length of 'hello': 5
Still have: hello
Modified: hello!
Consumed: hello`,
            tip: 'Functions should accept &str instead of &String and &[T] instead of &Vec<T>. The slice types are more general and accept both owned and borrowed data.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Caller (main) stack',
                    type: 'stack',
                    values: [
                      { name: 'text', value: 'String {ptr, len, cap}', highlight: true },
                      { name: 'greeting', value: 'String {ptr, len, cap}', highlight: false },
                    ],
                  },
                  {
                    label: 'consume(s) -- ownership moved',
                    type: 'stack',
                    values: [
                      { name: 's', value: 'String {ptr, len, cap} (moved from text)', highlight: true },
                    ],
                  },
                  {
                    label: 'print_length(s) -- borrowed',
                    type: 'stack',
                    values: [
                      { name: 's', value: '&str (pointer to text data)', highlight: false },
                    ],
                  },
                ],
              },
              caption: 'Ownership vs borrowing: consume() takes ownership (text is gone), print_length() borrows (text survives)',
            },
          },
          {
            heading: 'Generic Functions',
            content:
              'Generic functions work with multiple types using type parameters. Trait bounds constrain what the types can do. Rust monomorphizes generics at compile time, so there is no runtime cost.',
            code: `use std::fmt::Display;

// Generic function with trait bound
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut max = &list[0];
    for item in &list[1..] {
        if item > max {
            max = item;
        }
    }
    max
}

// Multiple trait bounds
fn print_largest<T: PartialOrd + Display>(list: &[T]) {
    let max = largest(list);
    println!("The largest is: {}", max);
}

// Where clause for complex bounds
fn summarize<T, U>(item: &T, count: U) -> String
where
    T: Display,
    U: Display + Into<usize>,
{
    format!("{} (count: {})", item, count)
}

fn main() {
    let numbers = vec![34, 50, 25, 100, 65];
    print_largest(&numbers);

    let chars = vec!['y', 'm', 'a', 'q'];
    print_largest(&chars);

    println!("{}", summarize(&"hello", 3_u32));
}`,
            output: `The largest is: 100
The largest is: y
hello (count: 3)`,
            note: 'Generics have zero runtime cost in Rust. The compiler generates specialized code for each concrete type used, unlike Java which uses type erasure.',
            codeHighlightLines: [4, 15, 21, 22, 23, 24],
            analogy: 'Think of it like a cookie cutter. The generic function `largest<T>` is the cutter shape, and each concrete type (`i32`, `char`) is a different dough. The compiler stamps out a separate specialized function for each dough type at compile time, so you get tailor-made performance with write-once convenience.',
          },
        ],
        quiz: [
          {
            question: 'What happens when you add a semicolon to the last expression in a Rust function body?',
            options: [
              'Nothing; semicolons are optional in Rust',
              'It becomes a statement that returns () instead of the expression value',
              'It causes a runtime error',
              'It makes the function return the value explicitly',
            ],
            correctIndex: 1,
            explanation: 'In Rust, the last expression in a function body (without a semicolon) is the implicit return value. Adding a semicolon turns it into a statement, which means the function returns () (unit type) instead. This is a common source of compilation errors for beginners.',
          },
          {
            question: 'How does Rust handle multiple return values from a function?',
            options: [
              'Using out parameters like in C',
              'Returning a tuple, e.g., fn foo() -> (i32, i32)',
              'Using special multi-return syntax',
              'Functions can only return one value in Rust',
            ],
            correctIndex: 1,
            explanation: 'Rust uses tuples to return multiple values from a function. You declare the return type as a tuple (e.g., `-> (i32, i32)`) and return values with tuple syntax `(a, b)`. The caller can destructure the result: `let (x, y) = foo();`.',
          },
          {
            question: 'Why should functions accept `&str` instead of `&String` as a parameter type?',
            options: [
              '&str is faster than &String at runtime',
              '&str is more general and accepts both &String and string literals',
              '&String is deprecated in recent Rust versions',
              '&str uses less stack memory',
            ],
            correctIndex: 1,
            explanation: '&str is a more general type: it accepts &String (via automatic deref coercion), string literals (&"hello" which is &str), and substrings. Using &str makes your function more flexible without any performance cost. The same principle applies to &[T] vs &Vec<T>.',
          },
          {
            question: 'What does monomorphization of generic functions mean in Rust?',
            options: [
              'Generic functions are converted to dynamically dispatched calls at runtime',
              'The compiler generates specialized code for each concrete type used, with zero runtime cost',
              'Generic functions are restricted to a single type at compile time',
              'The compiler erases type information like in Java',
            ],
            correctIndex: 1,
            explanation: 'Monomorphization means the Rust compiler generates a separate, specialized version of a generic function for each concrete type it is called with. This is the opposite of Java\'s type erasure. The result is zero-cost abstractions: generic code runs as fast as hand-written specialized code.',
          },
        ],
        challenge: {
          prompt: 'Write a generic function `second_largest` that takes a slice of any type implementing PartialOrd and returns an Option containing a reference to the second largest element. Return None if the slice has fewer than 2 elements.',
          starterCode: `fn second_largest<T: PartialOrd>(items: &[T]) -> Option<&T> {
    // Find the second largest element in the slice
    // Return None if fewer than 2 elements
    todo!()
}

fn main() {
    let nums = vec![5, 2, 8, 1, 9, 3];
    println!("Second largest: {:?}", second_largest(&nums));

    let chars = vec!['z', 'a', 'm', 'b'];
    println!("Second largest char: {:?}", second_largest(&chars));

    let single = vec![42];
    println!("Single element: {:?}", second_largest(&single));
}`,
          solutionCode: `fn second_largest<T: PartialOrd>(items: &[T]) -> Option<&T> {
    if items.len() < 2 {
        return None;
    }
    let mut largest = &items[0];
    let mut second = &items[1];
    if second > largest {
        std::mem::swap(&mut largest, &mut second);
    }
    for item in &items[2..] {
        if item > largest {
            second = largest;
            largest = item;
        } else if item > second {
            second = item;
        }
    }
    Some(second)
}

fn main() {
    let nums = vec![5, 2, 8, 1, 9, 3];
    println!("Second largest: {:?}", second_largest(&nums));

    let chars = vec!['z', 'a', 'm', 'b'];
    println!("Second largest char: {:?}", second_largest(&chars));

    let single = vec![42];
    println!("Single element: {:?}", second_largest(&single));
}`,
          hints: [
            'Start by checking if the slice has fewer than 2 elements and return None if so.',
            'Track both the largest and second-largest references as you iterate.',
            'When you find a new largest, the old largest becomes the second largest.',
          ],
        },
      },
      {
        id: 'closures',
        title: 'Closures',
        difficulty: 'intermediate',
        tags: ['closures', 'lambda', 'Fn', 'FnMut', 'FnOnce', 'capture', 'move'],
        cheatSheetSummary: '|x, y| x + y — anonymous functions that capture their environment',
        crossLanguageId: 'closures-lambdas',
        sections: [
          {
            heading: 'Closure Syntax and Type Inference',
            content:
              'Closures are anonymous functions defined with |params| body syntax. Unlike regular functions, closures can capture variables from their enclosing scope and often have their types inferred. They are used extensively with iterators, callbacks, and higher-order functions.',
            code: `fn main() {
    // Basic closure
    let add = |a: i32, b: i32| -> i32 { a + b };
    println!("add: {}", add(3, 4));

    // Type inference (types omitted)
    let double = |x| x * 2;
    println!("double: {}", double(5));

    // Single-expression closures (no braces needed)
    let square = |x: i32| x * x;
    println!("square: {}", square(4));

    // Closures with iterators
    let nums = vec![1, 2, 3, 4, 5];
    let doubled: Vec<i32> = nums.iter().map(|&x| x * 2).collect();
    println!("doubled: {:?}", doubled);

    let evens: Vec<&i32> = nums.iter().filter(|&&x| x % 2 == 0).collect();
    println!("evens: {:?}", evens);

    let sum: i32 = nums.iter().fold(0, |acc, &x| acc + x);
    println!("sum: {}", sum);
}`,
            output: `add: 7
double: 10
square: 16
doubled: [2, 4, 6, 8, 10]
evens: [2, 4]
sum: 15`,
            analogy: 'Think of it like a sticky note with a formula written on it. A regular function is a formal recipe in a cookbook -- it stands alone and cannot see your kitchen counter. A closure is a sticky note that can reference the ingredients already on the counter (captured variables) because it was written right there.',
          },
          {
            heading: 'Capturing Variables: Fn, FnMut, FnOnce',
            content:
              'Closures capture variables from their environment in three ways, corresponding to three traits. Fn borrows immutably (can be called many times). FnMut borrows mutably (can be called many times but may change captured state). FnOnce takes ownership (can only be called once). The compiler infers which trait based on what the closure does with its captures.',
            code: `fn main() {
    // Fn: borrows immutably
    let name = String::from("Rust");
    let greet = || println!("Hello, {}!", name);
    greet();
    greet();  // can call multiple times
    println!("name still valid: {}", name);

    // FnMut: borrows mutably
    let mut count = 0;
    let mut increment = || {
        count += 1;
        println!("count: {}", count);
    };
    increment();
    increment();
    // Cannot use 'count' while 'increment' borrows it mutably

    // FnOnce: takes ownership
    let data = vec![1, 2, 3];
    let consume = || {
        let moved = data;  // takes ownership of data
        println!("consumed: {:?}", moved);
    };
    consume();
    // consume();  // ERROR: cannot call FnOnce closure twice
    // println!("{:?}", data);  // ERROR: data was moved

    // Explicit move keyword
    let text = String::from("hello");
    let moved_closure = move || {
        println!("moved: {}", text);
    };
    moved_closure();
    // println!("{}", text);  // ERROR: text was moved into closure
}`,
            output: `Hello, Rust!
Hello, Rust!
name still valid: Rust
count: 1
count: 2
consumed: [1, 2, 3]
moved: hello`,
            warning: 'The move keyword forces the closure to take ownership of all captured variables, even if it only reads them. This is essential when spawning threads, because the closure may outlive the scope where the variables were defined.',
            codeHighlightLines: [4, 11, 12, 21, 22, 30, 31],
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n  A["Closure captures variable"] --> B{"What does it do?"}\n  B -->|"Only reads"| C["Fn: borrows &T\\nCallable many times"]\n  B -->|"Modifies"| D["FnMut: borrows &mut T\\nCallable many times"]\n  B -->|"Moves/consumes"| E["FnOnce: takes T\\nCallable once"]\n  C --> F["Fn also satisfies FnMut, FnOnce"]\n  D --> G["FnMut also satisfies FnOnce"]\n  style C fill:#bfb,stroke:#333\n  style D fill:#ffd,stroke:#333\n  style E fill:#fbb,stroke:#333',
              caption: 'Closure trait hierarchy: Fn is the most restrictive (immutable), FnOnce is the most permissive (consumes). Fn implies FnMut implies FnOnce.',
            },
          },
          {
            heading: 'Closures as Function Parameters',
            content:
              'Functions can accept closures as parameters using the Fn, FnMut, or FnOnce trait bounds. Use impl Fn for static dispatch (most common) or dyn Fn for dynamic dispatch. Returning closures requires impl Fn or Box<dyn Fn>.',
            code: `// Accept closure as parameter
fn apply<F: Fn(i32) -> i32>(f: F, x: i32) -> i32 {
    f(x)
}

// Accept mutable closure
fn repeat<F: FnMut()>(mut f: F, times: usize) {
    for _ in 0..times {
        f();
    }
}

// Return a closure (impl Fn)
fn make_adder(n: i32) -> impl Fn(i32) -> i32 {
    move |x| x + n
}

// Return a closure (boxed, for dynamic dispatch)
fn make_multiplier(n: i32) -> Box<dyn Fn(i32) -> i32> {
    Box::new(move |x| x * n)
}

fn main() {
    // Passing closures
    println!("apply square: {}", apply(|x| x * x, 5));
    println!("apply negate: {}", apply(|x| -x, 42));

    // Mutable closure
    let mut total = 0;
    repeat(|| { total += 1; }, 5);
    println!("total after repeat: {}", total);

    // Returned closures
    let add5 = make_adder(5);
    println!("add5(10) = {}", add5(10));

    let triple = make_multiplier(3);
    println!("triple(7) = {}", triple(7));
}`,
            output: `apply square: 25
apply negate: -42
total after repeat: 5
add5(10) = 15
triple(7) = 21`,
            tip: 'Use impl Fn(...) for returning closures when you return only one type. Use Box<dyn Fn(...)> when you might return different closures depending on runtime conditions.',
          },
        ],
        quiz: [
          {
            question: 'What is the key difference between a closure and a regular function in Rust?',
            options: [
              'Closures are slower because they are interpreted at runtime',
              'Closures can capture variables from their enclosing scope',
              'Closures must always have explicit type annotations',
              'Closures cannot be passed as function arguments',
            ],
            correctIndex: 1,
            explanation: 'The defining feature of closures is that they can capture variables from the scope where they are defined. Regular functions declared with `fn` cannot reference local variables from an enclosing scope. Closures also benefit from type inference, so explicit annotations are usually optional.',
          },
          {
            question: 'When does the compiler infer a closure as `FnOnce` rather than `Fn` or `FnMut`?',
            options: [
              'When the closure takes more than one parameter',
              'When the closure uses the return keyword',
              'When the closure moves or consumes a captured variable',
              'When the closure is defined with the move keyword',
            ],
            correctIndex: 2,
            explanation: 'The compiler infers FnOnce when the closure moves or consumes a captured variable (e.g., moving it into another function or dropping it). Since the captured value is gone after the first call, the closure can only be called once. Note that `move` forces ownership transfer but does not automatically make it FnOnce -- it depends on what the closure does with the value.',
          },
          {
            question: 'What does the `move` keyword do when placed before a closure?',
            options: [
              'It makes the closure mutable',
              'It forces the closure to take ownership of all captured variables',
              'It converts the closure to a function pointer',
              'It enables the closure to be called multiple times',
            ],
            correctIndex: 1,
            explanation: 'The `move` keyword forces the closure to take ownership of all captured variables, even if the closure body only reads them. This is essential when the closure needs to outlive the scope where it was created, such as when spawning threads or returning closures from functions.',
          },
          {
            question: 'How do you return a closure from a function in Rust?',
            options: [
              'fn make() -> Fn(i32) -> i32 { |x| x + 1 }',
              'fn make() -> impl Fn(i32) -> i32 { move |x| x + 1 }',
              'fn make() -> closure { |x| x + 1 }',
              'You cannot return closures from functions in Rust',
            ],
            correctIndex: 1,
            explanation: 'You return a closure using `impl Fn(...)` (for a single concrete closure type) or `Box<dyn Fn(...)>` (for dynamic dispatch or multiple possible closure types). The `move` keyword is typically needed so the closure owns its captured data rather than borrowing from the function scope.',
          },
        ],
        challenge: {
          prompt: 'Write a function `make_counter` that returns a closure. Each time the closure is called, it should return the next integer starting from a given value. The closure should capture and mutate its own state.',
          starterCode: `fn make_counter(start: i32) -> impl FnMut() -> i32 {
    // Return a closure that captures \`start\` and increments
    // it each time it is called, returning the value before increment.
    todo!()
}

fn main() {
    let mut counter = make_counter(1);
    println!("{}", counter()); // 1
    println!("{}", counter()); // 2
    println!("{}", counter()); // 3

    let mut counter_from_10 = make_counter(10);
    println!("{}", counter_from_10()); // 10
    println!("{}", counter_from_10()); // 11
}`,
          solutionCode: `fn make_counter(start: i32) -> impl FnMut() -> i32 {
    let mut current = start;
    move || {
        let val = current;
        current += 1;
        val
    }
}

fn main() {
    let mut counter = make_counter(1);
    println!("{}", counter()); // 1
    println!("{}", counter()); // 2
    println!("{}", counter()); // 3

    let mut counter_from_10 = make_counter(10);
    println!("{}", counter_from_10()); // 10
    println!("{}", counter_from_10()); // 11
}`,
          hints: [
            'Create a mutable variable `current` initialized to `start` before the closure.',
            'Use `move` so the closure takes ownership of `current`.',
            'Inside the closure, save the current value, increment it, then return the saved value.',
          ],
        },
      },
      {
        id: 'function-pointers',
        title: 'Function Pointers',
        difficulty: 'intermediate',
        tags: ['fn-pointer', 'callback', 'higher-order', 'strategy-pattern'],
        cheatSheetSummary: 'fn(i32) -> i32 — pointer to a function, implements Fn/FnMut/FnOnce',
        signature: 'fn(T) -> U',
        sections: [
          {
            heading: 'Function Pointers vs Closures',
            content:
              'Function pointers (fn(T) -> U with a lowercase f) are pointers to existing functions. Unlike closures, they cannot capture environment variables. Function pointers implement all three closure traits (Fn, FnMut, FnOnce), so they can be passed anywhere a closure is expected.',
            code: `fn double(x: i32) -> i32 {
    x * 2
}

fn triple(x: i32) -> i32 {
    x * 3
}

// Accept a function pointer
fn apply(f: fn(i32) -> i32, x: i32) -> i32 {
    f(x)
}

// Accept either function pointer or closure (more flexible)
fn apply_generic<F: Fn(i32) -> i32>(f: F, x: i32) -> i32 {
    f(x)
}

fn main() {
    // Function pointer
    let f: fn(i32) -> i32 = double;
    println!("f(5) = {}", f(5));

    // Pass function by name
    println!("apply double: {}", apply(double, 5));
    println!("apply triple: {}", apply(triple, 5));

    // Store in a collection
    let operations: Vec<fn(i32) -> i32> = vec![double, triple];
    for op in &operations {
        println!("op(10) = {}", op(10));
    }

    // Works with generic too (functions implement Fn)
    println!("generic: {}", apply_generic(double, 5));
    println!("generic closure: {}", apply_generic(|x| x + 1, 5));
}`,
            output: `f(5) = 10
apply double: 10
apply triple: 15
op(10) = 20
op(10) = 30
generic: 10
generic closure: 6`,
            note: 'Use fn(T) -> U (lowercase) for function pointers when you know only named functions will be passed. Use impl Fn(T) -> U or generics when callers might pass closures too.',
            analogy: 'Think of it like business cards. A function pointer is a business card with a phone number -- it tells you where to call, but it cannot carry any context. A closure is a person with a phone -- they carry their own context (captured variables) and can respond differently based on it. Both can answer the phone (be called), but the closure remembers more.',
          },
          {
            heading: 'Higher-Order Functions',
            content:
              'Functions that take or return other functions are called higher-order functions. They enable powerful patterns like strategy, callback, and function composition.',
            code: `fn compose(f: fn(i32) -> i32, g: fn(i32) -> i32) -> impl Fn(i32) -> i32 {
    move |x| f(g(x))
}

fn add_one(x: i32) -> i32 { x + 1 }
fn square(x: i32) -> i32 { x * x }

fn main() {
    // Function composition
    let square_then_add = compose(add_one, square);
    println!("square(3) + 1 = {}", square_then_add(3)); // 10

    let add_then_square = compose(square, add_one);
    println!("(3 + 1)^2 = {}", add_then_square(3)); // 16

    // Strategy pattern with function pointers
    let strategies: Vec<(&str, fn(i32) -> i32)> = vec![
        ("add one", add_one),
        ("square", square),
    ];

    let value = 5;
    for (name, strategy) in &strategies {
        println!("{}: {} -> {}", name, value, strategy(value));
    }

    // Map with a named function
    let nums = vec![1, 2, 3, 4];
    let squared: Vec<i32> = nums.iter().map(|&x| square(x)).collect();
    println!("squared: {:?}", squared);
}`,
            output: `square(3) + 1 = 10
(3 + 1)^2 = 16
add one: 5 -> 6
square: 5 -> 25
squared: [1, 4, 9, 16]`,
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n  A["Input: 3"] -->|"g = square"| B["9"]\n  B -->|"f = add_one"| C["10"]\n  D["Input: 3"] -->|"g = add_one"| E["4"]\n  E -->|"f = square"| F["16"]\n  style A fill:#ffd,stroke:#333\n  style C fill:#bfb,stroke:#333\n  style D fill:#ffd,stroke:#333\n  style F fill:#bfb,stroke:#333',
              caption: 'Function composition: compose(f, g) applies g first, then f. Order matters!',
            },
          },
          {
            heading: 'Using Functions with Standard Library',
            content:
              'Many standard library functions accept function pointers or closures. Named functions can often replace closures for cleaner code, especially with parsing and conversion methods.',
            code: `fn main() {
    // str::parse as a function
    let numbers: Vec<i32> = vec!["1", "2", "3", "4"]
        .iter()
        .map(|s| s.parse::<i32>().unwrap())
        .collect();
    println!("parsed: {:?}", numbers);

    // String::from as a constructor
    let names: Vec<String> = vec!["alice", "bob"]
        .iter()
        .map(|s| String::from(*s))
        .collect();
    println!("names: {:?}", names);

    // Using ToString trait
    let strings: Vec<String> = vec![1, 2, 3]
        .iter()
        .map(ToString::to_string)
        .collect();
    println!("strings: {:?}", strings);

    // Enum variants as constructors
    let options: Vec<Option<i32>> = vec![1, 2, 3]
        .into_iter()
        .map(Some)
        .collect();
    println!("options: {:?}", options);
}`,
            output: `parsed: [1, 2, 3, 4]
names: ["alice", "bob"]
strings: ["1", "2", "3"]
options: [Some(1), Some(2), Some(3)]`,
            tip: 'Enum variants and tuple struct constructors are actually functions. Some is fn(T) -> Option<T> and Ok is fn(T) -> Result<T, E>. You can pass them directly to map().',
            codeHighlightLines: [19, 26],
          },
        ],
        quiz: [
          {
            question: 'What is the key difference between a function pointer `fn(i32) -> i32` and a closure trait `Fn(i32) -> i32`?',
            options: [
              'Function pointers are faster at runtime',
              'Function pointers cannot capture environment variables, closures can',
              'Closures cannot be stored in variables',
              'Function pointers can only point to unsafe functions',
            ],
            correctIndex: 1,
            explanation: 'Function pointers (fn with lowercase f) point to a specific named function and carry no environment. Closures can capture variables from their scope. Function pointers implement all closure traits (Fn, FnMut, FnOnce), so they can be used wherever closures are expected, but not vice versa.',
          },
          {
            question: 'Can function pointers be stored in a Vec in Rust?',
            options: [
              'No, because each function has a unique type',
              'Yes, as Vec<fn(T) -> U> since all function pointers of the same signature have the same type',
              'Only if wrapped in Box<dyn Fn>',
              'Only with unsafe code',
            ],
            correctIndex: 1,
            explanation: 'Function pointers of the same signature have the same concrete type `fn(T) -> U`, so they can be stored directly in a Vec. This is unlike closures, where each closure has a unique anonymous type even if the signatures match. For closures, you would need Box<dyn Fn(T) -> U>.',
          },
          {
            question: 'Why can enum variant constructors like `Some` be passed to `.map()` in Rust?',
            options: [
              'map() has special handling for enum variants',
              'Enum variants are automatically converted to closures',
              'Enum tuple variants are actually functions, e.g., Some is fn(T) -> Option<T>',
              'This is syntactic sugar that the compiler expands',
            ],
            correctIndex: 2,
            explanation: 'In Rust, tuple struct constructors and enum tuple variant constructors are actually functions. `Some` is a function of type `fn(T) -> Option<T>`, and `Ok` is `fn(T) -> Result<T, E>`. Since they are functions, they implement the Fn traits and can be passed directly to higher-order functions like map().',
          },
        ],
        challenge: {
          prompt: 'Write a function `apply_pipeline` that takes a value of type i32 and a slice of function pointers `&[fn(i32) -> i32]`, and applies each function in sequence, threading the result through. Return the final result.',
          starterCode: `fn double(x: i32) -> i32 { x * 2 }
fn add_ten(x: i32) -> i32 { x + 10 }
fn negate(x: i32) -> i32 { -x }

fn apply_pipeline(value: i32, pipeline: &[fn(i32) -> i32]) -> i32 {
    // Apply each function in the pipeline to the running result
    todo!()
}

fn main() {
    let pipeline: Vec<fn(i32) -> i32> = vec![double, add_ten, negate];
    let result = apply_pipeline(5, &pipeline);
    println!("Pipeline result: {}", result); // -(5*2 + 10) = -20
}`,
          solutionCode: `fn double(x: i32) -> i32 { x * 2 }
fn add_ten(x: i32) -> i32 { x + 10 }
fn negate(x: i32) -> i32 { -x }

fn apply_pipeline(value: i32, pipeline: &[fn(i32) -> i32]) -> i32 {
    let mut result = value;
    for f in pipeline {
        result = f(result);
    }
    result
}

fn main() {
    let pipeline: Vec<fn(i32) -> i32> = vec![double, add_ten, negate];
    let result = apply_pipeline(5, &pipeline);
    println!("Pipeline result: {}", result); // -(5*2 + 10) = -20
}`,
          hints: [
            'Initialize a mutable result variable with the input value.',
            'Iterate over the pipeline slice and apply each function to the current result.',
            'You can also solve this with `pipeline.iter().fold(value, |acc, f| f(acc))`.',
          ],
        },
      },
      {
        id: 'diverging-functions',
        title: 'Diverging Functions',
        difficulty: 'advanced',
        tags: ['never-type', 'diverging', 'panic', 'unreachable', 'process-exit'],
        cheatSheetSummary: 'fn func() -> ! { panic!("never returns") } — the never type',
        signature: 'fn() -> !',
        sections: [
          {
            heading: 'The Never Type (!)',
            content:
              'The ! type (called "never") indicates that a function never returns. This happens when a function always panics, loops forever, or exits the process. The never type can coerce to any other type, which is why panic! can be used in branches that expect a specific type.',
            code: `// Function that never returns (panics)
fn fail(msg: &str) -> ! {
    panic!("Fatal error: {}", msg);
}

// Function that loops forever
fn infinite_loop() -> ! {
    loop {
        // process events forever
        std::thread::sleep(std::time::Duration::from_secs(1));
    }
}

fn main() {
    // ! coerces to any type, so this compiles
    let x: i32 = if true {
        42
    } else {
        panic!("never reached")  // ! coerces to i32
    };
    println!("x = {}", x);

    // Useful with unwrap_or_else
    let config = std::env::var("MY_CONFIG")
        .unwrap_or_else(|_| String::from("default"));
    println!("config: {}", config);

    // match with unreachable!
    let val: Option<i32> = Some(42);
    let n = match val {
        Some(n) => n,
        None => unreachable!("we know it is Some"),
    };
    println!("n = {}", n);
}`,
            output: `x = 42
config: default
n = 42`,
            note: 'Functions returning ! include: panic!(), std::process::exit(), loop without break, todo!(), unimplemented!(), and unreachable!(). They all diverge, meaning they never produce a normal value.',
            analogy: 'Think of it like a black hole. A function returning `!` is a point of no return -- once execution enters, nothing ever comes back. The clever trick is that a black hole can "be" anything because it never actually produces a value. This is why `panic!()` works inside an `if` branch that expects `i32` -- since it never returns, the type checker says "sure, it could be an i32 in theory."',
            codeHighlightLines: [2, 7, 19, 32],
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n  A["fn fail() -> !"] --> B["panic!()"]\n  B --> C["Process terminates"]\n  D["fn infinite_loop() -> !"] --> E["loop \\{ ... \\}"]\n  E -->|"Never exits"| E\n  F["! coerces to any type"]\n  F --> G["i32, String, bool, ..."]\n  style B fill:#fbb,stroke:#333\n  style C fill:#f99,stroke:#333\n  style E fill:#ffd,stroke:#333\n  style G fill:#bfb,stroke:#333',
              caption: 'The never type (!) represents computations that never complete. It coerces to any type because no actual value is ever produced.',
            },
          },
          {
            heading: 'Practical Uses of Diverging Functions',
            content:
              'Diverging functions are used for error handlers, assertion helpers, and process termination. The todo!() macro is particularly useful during development as a type-safe placeholder that compiles but panics at runtime.',
            code: `fn setup_logging() {
    println!("Logging initialized");
}

// todo!() lets you sketch out code that compiles
fn calculate_score(_data: &[i32]) -> f64 {
    todo!("implement scoring algorithm")
}

fn validate_or_die(value: i32) -> i32 {
    if value < 0 {
        panic!("negative values not allowed: {}", value);
    }
    value
}

fn main() {
    setup_logging();

    let valid = validate_or_die(42);
    println!("valid: {}", valid);

    // todo!() in match arms lets you compile incomplete code
    let x = 5;
    let description = match x {
        1..=3 => "small",
        4..=6 => "medium",
        7..=9 => "large",
        _ => todo!("handle values outside 1-9"),
    };
    println!("description: {}", description);
}`,
            output: `Logging initialized
valid: 42
description: medium`,
            tip: 'Use todo!() instead of unimplemented!() for work in progress. It signals intent better and the panic message includes the file and line number where you need to add code.',
            analogy: 'Think of it like writing a draft with "[TBD]" placeholders. `todo!()` is a placeholder that the compiler accepts (the draft compiles) but that blows up at runtime if someone actually tries to read that section. This lets you sketch out the structure of your code before filling in every detail.',
          },
          {
            heading: 'Error Handling with Diverging Functions',
            content:
              'Diverging functions combine well with Result and Option to create expressive error handling that either succeeds or terminates clearly.',
            code: `use std::collections::HashMap;

fn get_required_config(key: &str) -> String {
    std::env::var(key).unwrap_or_else(|_| {
        eprintln!("ERROR: Required env var '{}' is not set", key);
        // In a real program, you might call std::process::exit(1)
        format!("default_{}", key)
    })
}

fn main() {
    // Unwrap with custom panic message
    let nums = vec![1, 2, 3];
    let first = nums.first().expect("vector should not be empty");
    println!("first: {}", first);

    // Pattern: try or provide default
    let mut cache: HashMap<&str, i32> = HashMap::new();
    cache.insert("a", 1);

    let val = cache.get("b").copied().unwrap_or_else(|| {
        println!("cache miss, computing...");
        42
    });
    println!("val: {}", val);

    let config = get_required_config("APP_MODE");
    println!("config: {}", config);
}`,
            output: `first: 1
cache miss, computing...
val: 42
ERROR: Required env var 'APP_MODE' is not set
config: default_APP_MODE`,
          },
        ],
        quiz: [
          {
            question: 'What does the `!` (never) type represent in Rust?',
            options: [
              'A boolean negation type',
              'A type for functions that never return normally',
              'An error type for failed operations',
              'A nullable type similar to Option<T>',
            ],
            correctIndex: 1,
            explanation: 'The `!` type (called "never") represents computations that never produce a value. This includes functions that always panic, loop forever, or exit the process. Since no value of type `!` can ever exist, it can coerce to any other type.',
          },
          {
            question: 'Why does `panic!()` compile when used in an if branch that expects i32?',
            options: [
              'panic! returns 0 by default as an i32',
              'The compiler ignores the types of branches that contain panic!',
              'The never type (!) coerces to any type since no value is ever produced',
              'panic! is a special macro that adapts its return type',
            ],
            correctIndex: 2,
            explanation: 'Since `!` (never type) represents a computation that never completes, it can safely coerce to any type. The compiler knows that if a branch panics, it will never actually need to produce a value of the expected type. This is why `let x: i32 = if true { 42 } else { panic!("!") };` compiles.',
          },
          {
            question: 'What is the difference between `todo!()` and `unimplemented!()`?',
            options: [
              'todo!() is for tests only, unimplemented!() is for production',
              'todo!() signals work in progress while unimplemented!() signals intentionally unsupported functionality',
              'todo!() compiles but unimplemented!() does not',
              'There is no difference; they are aliases',
            ],
            correctIndex: 1,
            explanation: 'Both macros panic at runtime, but they communicate different intent. `todo!()` signals "this will be implemented later" (work in progress), while `unimplemented!()` signals "this is intentionally not implemented" (e.g., an unsupported operation). Both return `!` and compile as type-safe placeholders.',
          },
          {
            question: 'Which of the following does NOT return the never type `!`?',
            options: [
              'panic!("error")',
              'std::process::exit(1)',
              'loop { break 42; }',
              'loop { }',
            ],
            correctIndex: 2,
            explanation: '`loop { break 42; }` returns i32 (the value 42), not `!`. The loop has a break with a value, so it does eventually produce a result. In contrast, `panic!()` and `std::process::exit()` never return, and `loop { }` without break runs forever. All three of those return `!`.',
          },
        ],
        challenge: {
          prompt: 'Write a function `parse_or_die` that takes a &str and tries to parse it as an i32. If parsing succeeds, return the value. If it fails, use a diverging expression (panic! with a descriptive message). Then write a `safe_divide` function that takes two i32 values and returns f64 -- if the divisor is 0, call a helper function that returns `!`.',
          starterCode: `fn parse_or_die(input: &str) -> i32 {
    // Parse the input as i32
    // If it fails, panic with a message including the input
    todo!()
}

fn division_error(a: i32, b: i32) -> ! {
    panic!("Cannot divide {} by {}", a, b);
}

fn safe_divide(a: i32, b: i32) -> f64 {
    // If b is 0, call division_error (which returns !)
    // Otherwise return a / b as f64
    todo!()
}

fn main() {
    println!("Parsed: {}", parse_or_die("42"));
    println!("Division: {}", safe_divide(10, 3));
    // Uncomment to test diverging behavior:
    // println!("{}", parse_or_die("not_a_number"));
    // println!("{}", safe_divide(5, 0));
}`,
          solutionCode: `fn parse_or_die(input: &str) -> i32 {
    match input.parse::<i32>() {
        Ok(n) => n,
        Err(_) => panic!("Failed to parse '{}' as i32", input),
    }
}

fn division_error(a: i32, b: i32) -> ! {
    panic!("Cannot divide {} by {}", a, b);
}

fn safe_divide(a: i32, b: i32) -> f64 {
    if b == 0 {
        division_error(a, b);
    }
    a as f64 / b as f64
}

fn main() {
    println!("Parsed: {}", parse_or_die("42"));
    println!("Division: {}", safe_divide(10, 3));
    // Uncomment to test diverging behavior:
    // println!("{}", parse_or_die("not_a_number"));
    // println!("{}", safe_divide(5, 0));
}`,
          hints: [
            'Use match on input.parse::<i32>() to handle Ok and Err variants.',
            'In the error case, panic!() returns ! which coerces to i32.',
            'For safe_divide, the compiler knows division_error() returns !, so the if-branch is satisfied and the function can continue to the division.',
          ],
        },
      },
    ],
  },
];

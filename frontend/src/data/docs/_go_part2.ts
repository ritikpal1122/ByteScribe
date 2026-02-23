import type { DocCategory } from './types';

// Part 2: Control Flow + Functions
export const GO_PART2_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Control Flow                                                 */
  /* ------------------------------------------------------------ */
  {
    id: 'control-flow',
    label: 'Control Flow',
    icon: 'GitBranch',
    entries: [
      {
        id: 'if-else',
        title: 'If / Else',
        difficulty: 'beginner',
        tags: ['if', 'else', 'conditional', 'init-statement'],
        cheatSheetSummary:
          'No parentheses required. Supports init statement: `if val := fn(); val > 0 { }`. Variables scoped to if/else block.',
        crossLanguageId: 'if-else',
        sections: [
          {
            heading: 'Basic If / Else',
            content:
              'Go\'s `if` statement does not require parentheses around the condition, but braces are mandatory. Go supports `if`, `else if`, and `else` chains. The condition must be a boolean expression -- Go does not implicitly convert integers or strings to booleans.',
            code: `package main

import "fmt"

func main() {
    x := 42

    if x > 0 {
        fmt.Println("positive")
    } else if x == 0 {
        fmt.Println("zero")
    } else {
        fmt.Println("negative")
    }

    // Boolean expressions only (no truthy/falsy)
    name := "Go"
    if len(name) > 0 {
        fmt.Println("Name is not empty:", name)
    }
}`,
            output: `positive
Name is not empty: Go`,
            tip: 'Go does not have a ternary operator (`?:`). Use a full if/else statement or a helper function instead.',
            analogy: 'Think of it like a bouncer at a club: Go demands an explicit yes/no answer (boolean). You cannot hand the bouncer a number and hope they figure out what you mean -- "is 42 true?" is not a valid question in Go.',
          },
          {
            heading: 'If with Init Statement',
            content:
              'A unique Go feature is the init statement in `if` -- you can declare a variable scoped to the if/else block by placing a short statement before the condition, separated by a semicolon. This is the idiomatic pattern for error handling.',
            code: `package main

import (
    "fmt"
    "os"
    "strconv"
)

func main() {
    // Init statement scopes variable to if/else block
    if n := len("hello"); n > 3 {
        fmt.Println("Long string, length:", n)
    } else {
        fmt.Println("Short string, length:", n)
    }
    // n is NOT accessible here

    // Idiomatic error handling
    if val, err := strconv.Atoi("123"); err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Parsed:", val)
    }

    // File existence check
    if _, err := os.Stat("main.go"); err == nil {
        fmt.Println("main.go exists")
    } else if os.IsNotExist(err) {
        fmt.Println("main.go does not exist")
    } else {
        fmt.Println("Error checking file:", err)
    }
}`,
            output: `Long string, length: 5
Parsed: 123
main.go does not exist`,
            tip: 'The init statement pattern keeps `err` scoped to where it is relevant, preventing accidental reuse of stale error values from earlier checks.',
            codeHighlightLines: [11, 19, 27],
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    A["if val, err := strconv.Atoi(\\"123\\")"] --> B{"err != nil?"}\n    B -->|Yes| C["fmt.Println(\\"Error:\\", err)"]\n    B -->|No| D["fmt.Println(\\"Parsed:\\", val)"]\n    E["// val and err do NOT exist here"] -.-> F["(scoped to if/else block)"]\n    style A fill:#42a5f5,color:#fff\n    style B fill:#ffa726,color:#fff\n    style C fill:#ef5350,color:#fff\n    style D fill:#66bb6a,color:#fff',
              caption: 'Variables declared in the init statement are scoped to the entire if/else chain and do not leak out',
            },
          },
          {
            heading: 'Common Conditional Patterns',
            content:
              'Go developers use specific conditional patterns frequently: nil checks, comma-ok idioms for maps and type assertions, and early returns to reduce nesting. The "guard clause" pattern returns early on error, keeping the happy path at the top indentation level.',
            code: `package main

import (
    "errors"
    "fmt"
)

func processOrder(id int) error {
    // Guard clause pattern: early return on error
    order, err := findOrder(id)
    if err != nil {
        return fmt.Errorf("finding order: %w", err)
    }

    if order.Amount <= 0 {
        return errors.New("invalid order amount")
    }

    // Happy path (not nested)
    fmt.Printf("Processing order %d for $%.2f\\n", id, order.Amount)
    return nil
}

type Order struct {
    ID     int
    Amount float64
}

func findOrder(id int) (*Order, error) {
    if id == 1 {
        return &Order{ID: 1, Amount: 49.99}, nil
    }
    return nil, fmt.Errorf("order %d not found", id)
}

func main() {
    if err := processOrder(1); err != nil {
        fmt.Println("Error:", err)
    }
    if err := processOrder(2); err != nil {
        fmt.Println("Error:", err)
    }
}`,
            output: `Processing order 1 for $49.99
Error: finding order: order 2 not found`,
            note: 'The guard clause pattern (early returns) is strongly preferred in Go. It avoids deep nesting and makes the main logic path clear.',
            analogy: 'Think of it like a security checkpoint: each guard clause is a checkpoint that rejects bad inputs early. Only requests that pass all checks reach the main hall (happy path). This keeps the important logic flat and readable, not buried inside nested if/else blocks.',
            codeHighlightLines: [10, 11, 12, 15, 16, 20],
          },
        ],
        quiz: [
          {
            question: 'What happens if you try to use a variable declared in an if-init statement outside the if/else block?',
            options: [
              'It works fine, the variable is accessible everywhere',
              'It causes a compile error because the variable is scoped to the if/else block',
              'It returns the zero value of the variable type',
              'It causes a runtime panic',
            ],
            correctIndex: 1,
            explanation: 'Variables declared in the init statement of an if block are scoped to the entire if/else chain and do not exist outside of it. Attempting to use them elsewhere causes a compile error.',
          },
          {
            question: 'Does Go support a ternary operator like `condition ? valueA : valueB`?',
            options: [
              'Yes, it works the same as in C and Java',
              'Yes, but the syntax is `if condition then valueA else valueB`',
              'No, Go does not have a ternary operator',
              'Only in Go 1.22 and later',
            ],
            correctIndex: 2,
            explanation: 'Go intentionally does not support the ternary operator. You must use a full if/else statement or a helper function instead.',
          },
          {
            question: 'What is the "guard clause" pattern in Go?',
            options: [
              'Wrapping all code in a try/catch block',
              'Using deeply nested if/else for all error checks',
              'Returning early on error conditions to keep the happy path at the top indentation level',
              'Using panic/recover for all error handling',
            ],
            correctIndex: 2,
            explanation: 'The guard clause pattern returns early when an error or invalid condition is detected, preventing deep nesting and keeping the main logic path clear and readable.',
          },
        ],
        challenge: {
          prompt: 'Write a function `classifyAge` that takes an `age int` and returns a string classification. Use an if-init statement to check if the age is valid (0-150), and then classify: "child" (0-12), "teenager" (13-19), "adult" (20-64), "senior" (65+). Return "invalid" for out-of-range ages.',
          starterCode: `package main

import "fmt"

func classifyAge(age int) string {
    // Use an if-init statement and guard clause pattern
    // to classify the age into categories
    // TODO: implement
    return ""
}

func main() {
    fmt.Println(classifyAge(5))    // child
    fmt.Println(classifyAge(16))   // teenager
    fmt.Println(classifyAge(30))   // adult
    fmt.Println(classifyAge(70))   // senior
    fmt.Println(classifyAge(-1))   // invalid
    fmt.Println(classifyAge(200))  // invalid
}`,
          solutionCode: `package main

import "fmt"

func classifyAge(age int) string {
    if valid := age >= 0 && age <= 150; !valid {
        return "invalid"
    }

    if age <= 12 {
        return "child"
    } else if age <= 19 {
        return "teenager"
    } else if age <= 64 {
        return "adult"
    }
    return "senior"
}

func main() {
    fmt.Println(classifyAge(5))    // child
    fmt.Println(classifyAge(16))   // teenager
    fmt.Println(classifyAge(30))   // adult
    fmt.Println(classifyAge(70))   // senior
    fmt.Println(classifyAge(-1))   // invalid
    fmt.Println(classifyAge(200))  // invalid
}`,
          hints: [
            'Use `if valid := age >= 0 && age <= 150; !valid { return "invalid" }` as your guard clause with an init statement.',
            'After the guard clause, use a chain of if/else if statements to classify the age into "child", "teenager", "adult", or "senior".',
            'Return "senior" as the default at the end since you have already validated the range.',
          ],
        },
      },
      {
        id: 'switch',
        title: 'Switch',
        difficulty: 'beginner',
        tags: ['switch', 'case', 'fallthrough', 'tagless-switch'],
        cheatSheetSummary:
          'No break needed (auto-break). Multiple values per case. Use `fallthrough` for explicit fall-through. Tagless switch replaces if/else chains.',
        crossLanguageId: 'switch',
        sections: [
          {
            heading: 'Switch Statement',
            content:
              'Go\'s switch does not fall through by default -- each case automatically breaks. This eliminates an entire class of bugs common in C and Java. Cases can have multiple values separated by commas. If you actually want fall-through, use the explicit `fallthrough` keyword.',
            code: `package main

import "fmt"

func main() {
    day := "Tuesday"

    switch day {
    case "Monday":
        fmt.Println("Start of work week")
    case "Tuesday", "Wednesday", "Thursday":
        fmt.Println("Midweek")
    case "Friday":
        fmt.Println("Almost weekend!")
    case "Saturday", "Sunday":
        fmt.Println("Weekend!")
    default:
        fmt.Println("Invalid day")
    }
}`,
            output: `Midweek`,
            tip: 'Unlike C/Java, Go switch cases break automatically. You never need to write `break` in a switch case.',
            analogy: 'Think of it like a train track switch: the train (execution) follows exactly one track (case) and stops at the station. In C/Java, the train would barrel through every station unless you manually pulled the brake (break).',
            codeHighlightLines: [8, 11, 17],
          },
          {
            heading: 'Switch with Init Statement and Tagless Switch',
            content:
              'Like `if`, switch supports an init statement. A tagless switch (no expression after `switch`) acts as a cleaner alternative to long if/else chains. Each case is a boolean expression evaluated top to bottom.',
            analogy: 'Think of it like a thermometer with labeled zones: a tagless switch checks each range top-to-bottom (below 0? below 15? below 25?) and stops at the first match, reading like a temperature chart rather than a chain of if/else statements.',
            code: `package main

import (
    "fmt"
    "math/rand"
    "time"
)

func main() {
    // Switch with init statement
    switch n := rand.Intn(10); {
    case n < 3:
        fmt.Printf("%d is small\\n", n)
    case n < 7:
        fmt.Printf("%d is medium\\n", n)
    default:
        fmt.Printf("%d is large\\n", n)
    }

    // Tagless switch (cleaner if/else chain)
    temp := 28
    switch {
    case temp < 0:
        fmt.Println("Freezing")
    case temp < 15:
        fmt.Println("Cold")
    case temp < 25:
        fmt.Println("Comfortable")
    case temp < 35:
        fmt.Println("Warm")
    default:
        fmt.Println("Hot")
    }
}`,
            output: `5 is medium
Warm`,
            tip: 'A tagless switch (`switch { ... }`) is the idiomatic Go way to replace long if/else chains. It reads more clearly when you have many conditions.',
            codeHighlightLines: [11, 22],
          },
          {
            heading: 'Fallthrough and Expressions',
            content:
              'The `fallthrough` keyword forces execution to continue into the next case. It is rarely used but can be handy for accumulating behavior. Cases can contain any expression, including function calls.',
            code: `package main

import "fmt"

func main() {
    // Explicit fallthrough
    n := 3
    switch {
    case n > 0:
        fmt.Println("positive")
        fallthrough
    case n > -5:
        fmt.Println("greater than -5")
        fallthrough
    case n > -10:
        fmt.Println("greater than -10")
    }

    fmt.Println("---")

    // Expression in cases
    x := 15
    switch {
    case x%15 == 0:
        fmt.Println("FizzBuzz")
    case x%3 == 0:
        fmt.Println("Fizz")
    case x%5 == 0:
        fmt.Println("Buzz")
    default:
        fmt.Println(x)
    }
}`,
            output: `positive
greater than -5
greater than -10
---
FizzBuzz`,
            warning: '`fallthrough` is unconditional -- it does not check the next case\'s condition. It simply transfers control. This makes it different from C fall-through behavior.',
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    A["case n > 0: true"] -->|"fallthrough"| B["case n > -5: (skipped check)"]\n    B -->|"fallthrough"| C["case n > -10: (skipped check)"]\n    C --> D["execution stops"]\n    style A fill:#66bb6a,color:#fff\n    style B fill:#ffa726,color:#fff\n    style C fill:#ffa726,color:#fff\n    style D fill:#ef5350,color:#fff',
              caption: 'fallthrough unconditionally enters the next case without evaluating its condition',
            },
          },
        ],
        quiz: [
          {
            question: 'What happens at the end of each case in a Go switch statement by default?',
            options: [
              'Execution falls through to the next case automatically',
              'Execution breaks automatically -- no explicit break needed',
              'The program panics if you do not add a break statement',
              'The compiler requires an explicit break or fallthrough keyword',
            ],
            correctIndex: 1,
            explanation: 'Unlike C and Java, Go switch cases break automatically at the end of each case. You never need to write an explicit `break` statement. If you want fall-through, you must use the `fallthrough` keyword explicitly.',
          },
          {
            question: 'What is a "tagless switch" in Go?',
            options: [
              'A switch statement that uses integers instead of strings',
              'A switch without any cases',
              'A switch with no expression after the `switch` keyword, where each case is a boolean expression',
              'A switch that uses type assertions',
            ],
            correctIndex: 2,
            explanation: 'A tagless switch (`switch { ... }`) has no expression after the `switch` keyword. Each case evaluates a boolean condition, making it a cleaner alternative to long if/else chains.',
          },
          {
            question: 'How does `fallthrough` behave in Go?',
            options: [
              'It checks the next case condition and falls through only if it matches',
              'It unconditionally transfers control to the next case without checking its condition',
              'It restarts the switch from the beginning',
              'It exits the switch statement entirely',
            ],
            correctIndex: 1,
            explanation: '`fallthrough` in Go is unconditional -- it transfers control to the next case without evaluating that case\'s condition. This is different from C-style fall-through where the condition would still be checked.',
          },
          {
            question: 'Can a single Go switch case match multiple values?',
            options: [
              'No, each case can only have one value',
              'Yes, by using the OR operator (||) between values',
              'Yes, by separating values with commas in the same case',
              'Yes, by using fallthrough between single-value cases',
            ],
            correctIndex: 2,
            explanation: 'Go allows multiple values in a single case by separating them with commas, e.g., `case "Saturday", "Sunday":`. This is cleaner than using fallthrough between cases.',
          },
        ],
        challenge: {
          prompt: 'Write a function `httpStatus` that uses a switch statement to return a human-readable string for HTTP status codes. Handle: 200 ("OK"), 201 ("Created"), 301/302 ("Redirect"), 400 ("Bad Request"), 404 ("Not Found"), 500 ("Internal Server Error"). Use a default case for unknown codes. Then write a `classifyStatus` function using a tagless switch that returns "success" for 200-299, "redirect" for 300-399, "client error" for 400-499, "server error" for 500-599, and "unknown" otherwise.',
          starterCode: `package main

import "fmt"

func httpStatus(code int) string {
    // Use a switch statement with multiple values per case
    // TODO: implement
    return ""
}

func classifyStatus(code int) string {
    // Use a tagless switch with range conditions
    // TODO: implement
    return ""
}

func main() {
    fmt.Println(httpStatus(200))  // OK
    fmt.Println(httpStatus(301))  // Redirect
    fmt.Println(httpStatus(404))  // Not Found
    fmt.Println(httpStatus(999))  // Unknown Status

    fmt.Println(classifyStatus(201))  // success
    fmt.Println(classifyStatus(302))  // redirect
    fmt.Println(classifyStatus(403))  // client error
    fmt.Println(classifyStatus(503))  // server error
}`,
          solutionCode: `package main

import "fmt"

func httpStatus(code int) string {
    switch code {
    case 200:
        return "OK"
    case 201:
        return "Created"
    case 301, 302:
        return "Redirect"
    case 400:
        return "Bad Request"
    case 404:
        return "Not Found"
    case 500:
        return "Internal Server Error"
    default:
        return "Unknown Status"
    }
}

func classifyStatus(code int) string {
    switch {
    case code >= 200 && code <= 299:
        return "success"
    case code >= 300 && code <= 399:
        return "redirect"
    case code >= 400 && code <= 499:
        return "client error"
    case code >= 500 && code <= 599:
        return "server error"
    default:
        return "unknown"
    }
}

func main() {
    fmt.Println(httpStatus(200))  // OK
    fmt.Println(httpStatus(301))  // Redirect
    fmt.Println(httpStatus(404))  // Not Found
    fmt.Println(httpStatus(999))  // Unknown Status

    fmt.Println(classifyStatus(201))  // success
    fmt.Println(classifyStatus(302))  // redirect
    fmt.Println(classifyStatus(403))  // client error
    fmt.Println(classifyStatus(503))  // server error
}`,
          hints: [
            'For `httpStatus`, use `switch code { ... }` and remember that Go allows multiple values per case with commas: `case 301, 302:`.',
            'For `classifyStatus`, use a tagless switch `switch { ... }` where each case is a boolean range check like `case code >= 200 && code <= 299:`.',
            'Do not forget the `default` case in both functions to handle unexpected inputs.',
          ],
        },
      },
      {
        id: 'for-loops',
        title: 'For Loops',
        difficulty: 'beginner',
        tags: ['for', 'loop', 'while', 'infinite', 'break', 'continue'],
        cheatSheetSummary:
          'Go has only `for` -- no while/do-while. Three forms: C-style, while-style (condition only), infinite (`for {}`). Use `break`/`continue`.',
        crossLanguageId: 'for-loops',
        sections: [
          {
            heading: 'Three Forms of For',
            content:
              'Go has only one looping construct: `for`. But it comes in three forms that cover every use case: C-style with init/condition/post, while-style with just a condition, and infinite loop with no condition. There is no `while` or `do-while` keyword.',
            code: `package main

import "fmt"

func main() {
    // Form 1: C-style for
    for i := 0; i < 5; i++ {
        fmt.Print(i, " ")
    }
    fmt.Println()

    // Form 2: while-style (condition only)
    n := 1
    for n < 100 {
        n *= 2
    }
    fmt.Println("Power of 2 >= 100:", n)

    // Form 3: infinite loop
    count := 0
    for {
        count++
        if count >= 3 {
            break
        }
    }
    fmt.Println("Count:", count)
}`,
            output: `0 1 2 3 4
Power of 2 >= 100: 128
Count: 3`,
            tip: 'The infinite `for {}` loop is commonly used in servers and event loops. Pair it with `select` for channel-based event handling.',
            analogy: 'Think of it like a Swiss Army knife: other languages give you separate tools (`for`, `while`, `do-while`), but Go gives you one tool (`for`) with three configurations that handle every situation.',
            codeHighlightLines: [7, 14, 21],
          },
          {
            heading: 'Break, Continue, and Labels',
            content:
              'Use `break` to exit a loop and `continue` to skip to the next iteration. For nested loops, use labeled break/continue to target a specific outer loop. Labels are placed before the loop statement.',
            code: `package main

import "fmt"

func main() {
    // break and continue
    for i := 0; i < 10; i++ {
        if i%2 == 0 {
            continue // skip even numbers
        }
        if i > 7 {
            break // stop after 7
        }
        fmt.Print(i, " ")
    }
    fmt.Println()

    // Labeled break (exit outer loop)
outer:
    for i := 0; i < 3; i++ {
        for j := 0; j < 3; j++ {
            if i == 1 && j == 1 {
                break outer
            }
            fmt.Printf("(%d,%d) ", i, j)
        }
    }
    fmt.Println()

    // Labeled continue (skip to next outer iteration)
loop:
    for i := 0; i < 3; i++ {
        for j := 0; j < 3; j++ {
            if j == 1 {
                continue loop
            }
            fmt.Printf("[%d,%d] ", i, j)
        }
    }
    fmt.Println()
}`,
            output: `1 3 5 7
(0,0) (0,1) (0,2) (1,0)
[0,0] [1,0] [2,0]`,
            tip: 'Labeled breaks are the correct Go idiom for escaping nested loops. Avoid using boolean flags or goto for this purpose.',
            codeHighlightLines: [19, 23, 31, 35],
          },
          {
            heading: 'Loop Patterns',
            content:
              'Common loop patterns in Go include iterating with an index, counting down, stepping by custom increments, and infinite retry loops with backoff.',
            analogy: 'Think of it like a toolbox of loop recipes: counting down is like a rocket countdown, stepping by 2 is like hopping over every other stepping stone, and the retry pattern is like redialing a phone -- try, wait a bit, try again, give up after N attempts.',
            codeHighlightLines: [10, 16, 22, 29, 30, 31],
            code: `package main

import (
    "fmt"
    "time"
)

func main() {
    // Count down
    for i := 5; i > 0; i-- {
        fmt.Print(i, " ")
    }
    fmt.Println("Go!")

    // Step by 2
    for i := 0; i < 10; i += 2 {
        fmt.Print(i, " ")
    }
    fmt.Println()

    // Multiple variables
    for i, j := 0, 10; i < j; i, j = i+1, j-1 {
        fmt.Printf("i=%d j=%d  ", i, j)
    }
    fmt.Println()

    // Retry pattern with backoff
    maxRetries := 3
    for attempt := 1; attempt <= maxRetries; attempt++ {
        err := doWork()
        if err == nil {
            fmt.Println("Success on attempt", attempt)
            break
        }
        fmt.Printf("Attempt %d failed: %v\\n", attempt, err)
        if attempt < maxRetries {
            time.Sleep(time.Duration(attempt) * 100 * time.Millisecond)
        }
    }
}

func doWork() error {
    return nil // simulate success
}`,
            output: `5 4 3 2 1 Go!
0 2 4 6 8
i=0 j=10  i=1 j=9  i=2 j=8  i=3 j=7  i=4 j=6
Success on attempt 1`,
            note: 'Go supports multiple loop variables with comma-separated assignments: `i, j = i+1, j-1`. Both updates happen simultaneously.',
          },
        ],
        quiz: [
          {
            question: 'How many looping constructs does Go have?',
            options: [
              'Three: for, while, and do-while',
              'Two: for and while',
              'One: only `for` (which covers all loop patterns)',
              'Four: for, while, do-while, and foreach',
            ],
            correctIndex: 2,
            explanation: 'Go has only one looping construct: `for`. It comes in three forms (C-style, while-style, and infinite) that cover every use case. There is no `while` or `do-while` keyword in Go.',
          },
          {
            question: 'What does a labeled `break` do in Go?',
            options: [
              'It exits the program entirely',
              'It breaks out of the labeled (typically outer) loop',
              'It creates a goto jump to the label',
              'It breaks only the innermost loop',
            ],
            correctIndex: 1,
            explanation: 'A labeled break exits the loop that the label is attached to. This is used to break out of an outer loop from within a nested inner loop, which is the idiomatic Go approach for this scenario.',
          },
          {
            question: 'Which of the following is a valid infinite loop in Go?',
            options: [
              'while (true) { }',
              'for (;;) { }',
              'for { }',
              'loop { }',
            ],
            correctIndex: 2,
            explanation: '`for { }` is the Go syntax for an infinite loop. There is no `while` keyword, and Go does not use parentheses or semicolons for the bare infinite loop form.',
          },
        ],
        challenge: {
          prompt: 'Write a function `fizzBuzz` that takes an integer `n` and prints numbers from 1 to n. For multiples of 3, print "Fizz". For multiples of 5, print "Buzz". For multiples of both, print "FizzBuzz". Use a labeled loop: if the number 13 is encountered, break out of the loop entirely using a labeled break.',
          starterCode: `package main

import "fmt"

func fizzBuzz(n int) {
    // Use a labeled loop and break out if i == 13
    // TODO: implement
}

func main() {
    fizzBuzz(20)
}`,
          solutionCode: `package main

import "fmt"

func fizzBuzz(n int) {
loop:
    for i := 1; i <= n; i++ {
        if i == 13 {
            fmt.Println("(stopping at 13)")
            break loop
        }
        switch {
        case i%15 == 0:
            fmt.Println("FizzBuzz")
        case i%3 == 0:
            fmt.Println("Fizz")
        case i%5 == 0:
            fmt.Println("Buzz")
        default:
            fmt.Println(i)
        }
    }
}

func main() {
    fizzBuzz(20)
}`,
          hints: [
            'Place a label like `loop:` before the for statement, and use `break loop` to exit when encountering 13.',
            'Use a tagless switch or if/else chain to determine Fizz, Buzz, or FizzBuzz. Check divisibility by 15 first for FizzBuzz.',
            'The loop should go from 1 to n inclusive: `for i := 1; i <= n; i++`.',
          ],
        },
      },
      {
        id: 'range',
        title: 'Range',
        difficulty: 'beginner',
        tags: ['range', 'iteration', 'slice', 'map', 'string', 'channel'],
        cheatSheetSummary:
          '`for i, v := range slice` iterates slices/arrays. `for k, v := range m` for maps. `for i, r := range str` decodes runes.',
        crossLanguageId: 'range',
        sections: [
          {
            heading: 'Range Over Slices and Arrays',
            content:
              'The `range` keyword iterates over data structures. For slices and arrays, it yields `(index, value)`. Use `_` to discard either. For index-only, omit the second variable. Range makes a copy of each value -- modifying `v` does not change the slice.',
            analogy: 'Think of it like a museum guide handing you a numbered pamphlet at each exhibit: range gives you both the exhibit number (index) and a photocopy of the artwork (value copy). You can scribble on the photocopy all you want -- it does not damage the original painting in the museum.',
            code: `package main

import "fmt"

func main() {
    nums := []int{10, 20, 30, 40, 50}

    // Index and value
    for i, v := range nums {
        fmt.Printf("index %d: %d\\n", i, v)
    }

    // Value only (discard index)
    fmt.Print("Values: ")
    for _, v := range nums {
        fmt.Print(v, " ")
    }
    fmt.Println()

    // Index only
    for i := range nums {
        nums[i] *= 2  // modify in place using index
    }
    fmt.Println("Doubled:", nums)
}`,
            output: `index 0: 10
index 1: 20
index 2: 30
index 3: 40
index 4: 50
Values: 10 20 30 40 50
Doubled: [20 40 60 80 100]`,
            warning: 'The loop variable `v` is a copy. Writing `v = 99` does not modify the slice. To modify in place, use the index: `nums[i] = 99`.',
            codeHighlightLines: [9, 15, 21, 22],
          },
          {
            heading: 'Range Over Maps, Strings, and Channels',
            content:
              'Range works on maps (yielding key, value), strings (yielding byte index, rune), and channels (yielding values until closed). Map iteration order is randomized. String range decodes UTF-8 automatically.',
            code: `package main

import "fmt"

func main() {
    // Range over map
    ages := map[string]int{"Alice": 30, "Bob": 25, "Eve": 28}
    for name, age := range ages {
        fmt.Printf("%s is %d\\n", name, age)
    }

    // Range over string (iterates runes)
    fmt.Println("\\nRunes in 'Hello, 世界':")
    for i, ch := range "Hello, 世界" {
        fmt.Printf("  byte %2d: %c (U+%04X)\\n", i, ch, ch)
    }

    // Range over channel
    ch := make(chan int, 3)
    ch <- 1
    ch <- 2
    ch <- 3
    close(ch)

    fmt.Print("\\nChannel: ")
    for v := range ch {
        fmt.Print(v, " ")
    }
    fmt.Println()
}`,
            output: `Alice is 30
Bob is 25
Eve is 28

Runes in 'Hello, 世界':
  byte  0: H (U+0048)
  byte  1: e (U+0065)
  byte  2: l (U+006C)
  byte  3: l (U+006C)
  byte  4: o (U+006F)
  byte  5: , (U+002C)
  byte  6:   (U+0020)
  byte  7: 世 (U+4E16)
  byte 10: 界 (U+754C)

Channel: 1 2 3`,
            tip: 'Ranging over a string yields runes, not bytes. The index is the byte offset, which may skip values for multi-byte characters (notice byte 7 jumps to 10).',
            diagram: {
              kind: 'mermaid',
              code: 'graph LR\n    subgraph "range over different types"\n        S["[]int slice"] -->|"index, value"| SV["0:10, 1:20, 2:30..."]\n        M["map[string]int"] -->|"key, value"| MV["Alice:30, Bob:25..."]\n        STR["string"] -->|"byte index, rune"| STRV["0:H, 7:世, 10:界"]\n        CH["chan int"] -->|"value"| CHV["1, 2, 3 (until closed)"]\n    end\n    style S fill:#42a5f5,color:#fff\n    style M fill:#66bb6a,color:#fff\n    style STR fill:#ffa726,color:#fff\n    style CH fill:#ab47bc,color:#fff',
              caption: 'range adapts to the data type: slices yield (index, value), maps yield (key, value), strings yield (byte-index, rune), channels yield values',
            },
          },
          {
            heading: 'Range Integer (Go 1.22+)',
            content:
              'Go 1.22 introduced ranging over integers, which simplifies counting loops. `for i := range n` iterates from 0 to n-1. This is a clean alternative to the C-style `for i := 0; i < n; i++`.',
            analogy: 'Think of it like asking "do this 5 times" instead of "start at 0, keep going while less than 5, add 1 each time." The integer range reads as naturally as plain English.',
            codeHighlightLines: [8, 15, 22, 25, 26],
            code: `package main

import "fmt"

func main() {
    // Range over integer (Go 1.22+)
    fmt.Print("Range 5: ")
    for i := range 5 {
        fmt.Print(i, " ")
    }
    fmt.Println()

    // Equivalent to:
    fmt.Print("C-style: ")
    for i := 0; i < 5; i++ {
        fmt.Print(i, " ")
    }
    fmt.Println()

    // Useful for repeat operations
    fmt.Print("Stars: ")
    for range 10 {
        fmt.Print("*")
    }
    fmt.Println()

    // Build a multiplication table
    n := 5
    for i := range n {
        for j := range n {
            fmt.Printf("%3d", (i+1)*(j+1))
        }
        fmt.Println()
    }
}`,
            output: `Range 5: 0 1 2 3 4
C-style: 0 1 2 3 4
Stars: **********
  1  2  3  4  5
  2  4  6  8 10
  3  6  9 12 15
  4  8 12 16 20
  5 10 15 20 25`,
            note: 'Integer range requires Go 1.22 or later. If you need to support older versions, use the C-style `for i := 0; i < n; i++` form.',
          },
        ],
        quiz: [
          {
            question: 'When using `for _, v := range slice`, what happens if you modify `v` inside the loop?',
            options: [
              'The original slice element is modified',
              'Nothing -- `v` is a copy, so the original slice is unchanged',
              'It causes a compile error',
              'It causes a runtime panic',
            ],
            correctIndex: 1,
            explanation: 'The loop variable `v` is a copy of the element. Modifying `v` does not affect the original slice. To modify in place, use the index: `slice[i] = newValue`.',
          },
          {
            question: 'What does `for i, ch := range "Hello"` iterate over?',
            options: [
              'Bytes of the string',
              'Runes (Unicode code points), with i being the byte offset',
              'Characters, with i being the character index',
              'Runes, with i being the rune index',
            ],
            correctIndex: 1,
            explanation: 'Ranging over a string yields (byte-index, rune). The index is the byte offset, not the character/rune index. For multi-byte characters, the index may skip values.',
          },
          {
            question: 'What is new about range in Go 1.22+?',
            options: [
              'Range can now iterate over maps in sorted order',
              'Range over integers is supported: `for i := range 5` iterates 0 to 4',
              'Range now returns three values for slices',
              'Range can iterate over struct fields',
            ],
            correctIndex: 1,
            explanation: 'Go 1.22 introduced ranging over integers. `for i := range n` iterates from 0 to n-1, providing a cleaner alternative to the C-style `for i := 0; i < n; i++`.',
          },
        ],
        challenge: {
          prompt: 'Write a function `wordFrequency` that takes a string slice of words and returns a `map[string]int` with the count of each word. Then write a function `topWords` that uses range over the map to find and return a slice of all words that appear more than once.',
          starterCode: `package main

import "fmt"

func wordFrequency(words []string) map[string]int {
    // Use range over a slice to count word frequencies
    // TODO: implement
    return nil
}

func topWords(freq map[string]int) []string {
    // Use range over the map to find words with count > 1
    // TODO: implement
    return nil
}

func main() {
    words := []string{"go", "is", "fun", "go", "is", "fast", "go"}
    freq := wordFrequency(words)
    fmt.Println("Frequencies:", freq)

    top := topWords(freq)
    fmt.Println("Repeated words:", top)
}`,
          solutionCode: `package main

import "fmt"

func wordFrequency(words []string) map[string]int {
    freq := make(map[string]int)
    for _, w := range words {
        freq[w]++
    }
    return freq
}

func topWords(freq map[string]int) []string {
    var result []string
    for word, count := range freq {
        if count > 1 {
            result = append(result, word)
        }
    }
    return result
}

func main() {
    words := []string{"go", "is", "fun", "go", "is", "fast", "go"}
    freq := wordFrequency(words)
    fmt.Println("Frequencies:", freq)

    top := topWords(freq)
    fmt.Println("Repeated words:", top)
}`,
          hints: [
            'Use `freq := make(map[string]int)` and then `freq[w]++` inside a range loop to count words.',
            'Range over a map yields `(key, value)` pairs. Check if `count > 1` to find repeated words.',
            'Use `append` to build the result slice of repeated words.',
          ],
        },
      },
      {
        id: 'defer-panic-recover',
        title: 'Defer, Panic & Recover',
        difficulty: 'intermediate',
        tags: ['defer', 'panic', 'recover', 'cleanup', 'error-handling'],
        cheatSheetSummary:
          '`defer` schedules cleanup for function return (LIFO). `panic` for unrecoverable errors. `recover` catches panics in deferred functions.',
        crossLanguageId: 'defer-panic-recover',
        sections: [
          {
            heading: 'Defer',
            content:
              '`defer` schedules a function call to run when the surrounding function returns. Deferred calls execute in LIFO (last-in, first-out) order. This is essential for cleanup: closing files, releasing locks, and recovering from panics. Arguments are evaluated immediately, but the call is delayed.',
            code: `package main

import "fmt"

func main() {
    fmt.Println("start")
    defer fmt.Println("deferred 1")
    defer fmt.Println("deferred 2")
    defer fmt.Println("deferred 3")
    fmt.Println("end")
}`,
            output: `start
end
deferred 3
deferred 2
deferred 1`,
            tip: 'Defer arguments are evaluated when the defer statement is executed, not when the deferred function runs. Be careful with loop variables.',
            analogy: 'Think of it like stacking plates: each `defer` places a plate on a stack. When the function returns, Go picks up plates from the top (LIFO) -- the last plate placed is the first one picked up.',
            codeHighlightLines: [7, 8, 9],
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    A["fmt.Println(\\"start\\")"] --> B["defer \\"deferred 1\\" → push to stack"]\n    B --> C["defer \\"deferred 2\\" → push to stack"]\n    C --> D["defer \\"deferred 3\\" → push to stack"]\n    D --> E["fmt.Println(\\"end\\")"]\n    E --> F["function returns"]\n    F --> G["pop: \\"deferred 3\\""]\n    G --> H["pop: \\"deferred 2\\""]\n    H --> I["pop: \\"deferred 1\\""]\n    style F fill:#ffa726,color:#fff\n    style G fill:#66bb6a,color:#fff\n    style H fill:#66bb6a,color:#fff\n    style I fill:#66bb6a,color:#fff',
              caption: 'Deferred calls execute in LIFO order when the function returns',
            },
          },
          {
            heading: 'Defer for Resource Cleanup',
            content:
              'The primary use of defer is ensuring resources are properly released. File handles, database connections, mutex locks, and HTTP response bodies should all be deferred for closing immediately after being opened or acquired.',
            analogy: 'Think of it like a hotel checkout policy: the moment you check in (open a resource), you schedule a checkout (defer Close). No matter what happens during your stay -- even if you panic and leave early -- checkout is guaranteed to happen when you leave the room (function).',
            code: `package main

import (
    "fmt"
    "os"
    "sync"
)

func readFile(path string) (string, error) {
    f, err := os.Open(path)
    if err != nil {
        return "", err
    }
    defer f.Close() // guaranteed cleanup

    buf := make([]byte, 1024)
    n, err := f.Read(buf)
    if err != nil {
        return "", err // f.Close() still runs
    }
    return string(buf[:n]), nil
}

// Mutex unlock with defer
var mu sync.Mutex
var count int

func increment() {
    mu.Lock()
    defer mu.Unlock() // runs even if panic occurs

    count++
}

func main() {
    increment()
    increment()
    fmt.Println("Count:", count)
}`,
            output: `Count: 2`,
            note: 'Always defer `Close()` immediately after checking the error from `Open()`. Place the defer before any code that might return early.',
            codeHighlightLines: [14, 30],
          },
          {
            heading: 'Panic and Recover',
            content:
              '`panic` stops normal execution and begins unwinding the stack, running deferred functions along the way. `recover` is a built-in that catches a panic, but only works inside a deferred function. Use panic for truly unrecoverable errors; prefer returning errors for expected failures.',
            code: `package main

import "fmt"

func safeDivide(a, b int) (result int, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("recovered from panic: %v", r)
        }
    }()

    return a / b, nil // panics if b == 0
}

func mustParse(s string) int {
    // panic for programmer errors (invalid arguments)
    if s == "" {
        panic("mustParse: empty string")
    }
    n := 0
    for _, ch := range s {
        if ch < '0' || ch > '9' {
            panic(fmt.Sprintf("mustParse: invalid char %c", ch))
        }
        n = n*10 + int(ch-'0')
    }
    return n
}

func main() {
    result, err := safeDivide(10, 0)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Result:", result)
    }

    result, err = safeDivide(10, 3)
    fmt.Println("10/3 =", result)

    // mustParse panics on bad input
    fmt.Println("Parsed:", mustParse("42"))
}`,
            output: `Error: recovered from panic: runtime error: integer divide by zero
10/3 = 3
Parsed: 42`,
            warning: 'Do not use panic/recover as a try/catch mechanism. In Go, errors should be returned, not thrown. Reserve panic for truly unrecoverable situations like programmer bugs or corrupted state.',
            diagram: {
              kind: 'mermaid',
              code: 'sequenceDiagram\n    participant main\n    participant safeDivide\n    participant deferred func\n    main->>safeDivide: safeDivide(10, 0)\n    safeDivide->>safeDivide: defer recover handler registered\n    safeDivide->>safeDivide: a / b → PANIC (divide by zero)\n    safeDivide->>deferred func: stack unwind triggers deferred func\n    deferred func->>deferred func: r := recover() catches panic\n    deferred func->>deferred func: err = "recovered from panic..."\n    deferred func-->>main: returns (0, error)\n    main->>main: fmt.Println("Error:", err)',
              caption: 'Panic unwinds the stack, running deferred functions. recover() inside a deferred function catches the panic and converts it to an error.',
            },
            codeHighlightLines: [6, 7, 8, 12],
          },
        ],
        quiz: [
          {
            question: 'In what order do deferred function calls execute?',
            options: [
              'FIFO (first-in, first-out) -- in the order they were deferred',
              'LIFO (last-in, first-out) -- in reverse order',
              'In random order',
              'Alphabetically by function name',
            ],
            correctIndex: 1,
            explanation: 'Deferred calls execute in LIFO (last-in, first-out) order. The last defer statement encountered is the first one executed when the function returns, like a stack of plates.',
          },
          {
            question: 'Where does `recover()` work to catch a panic?',
            options: [
              'Anywhere in the code, like a try/catch block',
              'Only inside a deferred function',
              'Only in the main function',
              'Only inside a goroutine',
            ],
            correctIndex: 1,
            explanation: '`recover()` only works when called directly inside a deferred function. If called outside a defer, or if there is no panic, it returns nil.',
          },
          {
            question: 'When are the arguments to a deferred function evaluated?',
            options: [
              'When the deferred function runs (at function return)',
              'When the defer statement is executed (immediately)',
              'At compile time',
              'When the garbage collector runs',
            ],
            correctIndex: 1,
            explanation: 'Defer arguments are evaluated immediately when the defer statement is executed, not when the deferred function actually runs. The function call itself is delayed, but its arguments are captured at the point of the defer.',
          },
          {
            question: 'Should panic/recover be used as a general error handling mechanism in Go?',
            options: [
              'Yes, it is the idiomatic way to handle errors',
              'Yes, but only in production code',
              'No, prefer returning errors. Reserve panic for truly unrecoverable situations.',
              'No, panic should never be used under any circumstances',
            ],
            correctIndex: 2,
            explanation: 'Go\'s error handling philosophy is to return errors explicitly. Panic/recover should be reserved for truly unrecoverable situations like programmer bugs or corrupted state, not as a general try/catch mechanism.',
          },
        ],
        challenge: {
          prompt: 'Write a function `safeExecute` that takes a function `fn func()` and returns an error. It should use defer/recover to catch any panics that `fn` might cause, converting the panic into an error. If no panic occurs, return nil. Test it with a function that panics and one that does not.',
          starterCode: `package main

import "fmt"

func safeExecute(fn func()) error {
    // Use defer and recover to catch panics from fn
    // Convert the panic to an error and return it
    // TODO: implement
    return nil
}

func main() {
    // Test with a panicking function
    err := safeExecute(func() {
        panic("something went wrong!")
    })
    fmt.Println("Panic result:", err)

    // Test with a safe function
    err = safeExecute(func() {
        fmt.Println("This runs safely")
    })
    fmt.Println("Safe result:", err)
}`,
          solutionCode: `package main

import "fmt"

func safeExecute(fn func()) (err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("caught panic: %v", r)
        }
    }()
    fn()
    return nil
}

func main() {
    // Test with a panicking function
    err := safeExecute(func() {
        panic("something went wrong!")
    })
    fmt.Println("Panic result:", err)

    // Test with a safe function
    err = safeExecute(func() {
        fmt.Println("This runs safely")
    })
    fmt.Println("Safe result:", err)
}`,
          hints: [
            'Use a named return value `(err error)` so the deferred function can set it.',
            'Inside the deferred function, call `recover()` and check if it is non-nil. If so, convert it to an error with `fmt.Errorf`.',
            'Call `fn()` after setting up the deferred recovery function.',
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
    icon: 'Box',
    entries: [
      {
        id: 'functions',
        title: 'Functions',
        difficulty: 'beginner',
        tags: ['func', 'parameters', 'return', 'named-return'],
        cheatSheetSummary:
          'Declare with `func name(params) returnType { }`. Parameters of the same type can share type: `func add(a, b int) int`.',
        crossLanguageId: 'functions',
        sections: [
          {
            heading: 'Function Declaration',
            content:
              'Functions in Go are declared with the `func` keyword. Parameters are typed, and if consecutive parameters share a type, you can write the type once. The return type comes after the parameter list. Go functions are first-class values.',
            code: `package main

import "fmt"

// Basic function
func greet(name string) string {
    return "Hello, " + name + "!"
}

// Shared parameter type
func add(a, b int) int {
    return a + b
}

// No return value
func logMessage(msg string) {
    fmt.Println("[LOG]", msg)
}

func main() {
    fmt.Println(greet("Go"))
    fmt.Println("Sum:", add(3, 4))
    logMessage("Server started")
}`,
            output: `Hello, Go!
Sum: 7
[LOG] Server started`,
            tip: 'Functions in Go are values. You can assign them to variables, pass them as arguments, and return them from other functions.',
            codeHighlightLines: [6, 11, 16],
          },
          {
            heading: 'Named Return Values',
            content:
              'Named return values act as documentation and allow "naked returns" -- a return statement without arguments that returns the named values. Named returns are pre-initialized to their zero values. Use them sparingly in short functions.',
            analogy: 'Think of it like a pre-labeled shipping form: named returns are blank boxes (area, perimeter) on the form that you fill in during the function. A naked `return` means "ship the form as-is with whatever is in the boxes."',
            code: `package main

import "fmt"

func rectangleProps(w, h float64) (area, perimeter float64) {
    area = w * h
    perimeter = 2 * (w + h)
    return // naked return (returns area and perimeter)
}

func divide(a, b float64) (result float64, err error) {
    if b == 0 {
        err = fmt.Errorf("division by zero")
        return // returns 0.0, error
    }
    result = a / b
    return
}

func main() {
    a, p := rectangleProps(5, 3)
    fmt.Printf("Area: %.1f, Perimeter: %.1f\\n", a, p)

    r, err := divide(10, 3)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Printf("Result: %.4f\\n", r)
    }
}`,
            output: `Area: 15.0, Perimeter: 16.0
Result: 3.3333`,
            warning: 'Naked returns hurt readability in long functions. Use them only in short functions (under 10 lines) where the named returns are clearly visible.',
            codeHighlightLines: [5, 8, 11, 14],
          },
          {
            heading: 'Functions as Values',
            content:
              'Functions are first-class values in Go. You can assign functions to variables, define anonymous functions inline, and pass functions as arguments to other functions. This enables patterns like callbacks, strategy pattern, and functional programming.',
            code: `package main

import "fmt"

// Function type
type MathOp func(int, int) int

func applyOp(a, b int, op MathOp) int {
    return op(a, b)
}

func main() {
    // Assign function to variable
    multiply := func(a, b int) int { return a * b }
    fmt.Println("Multiply:", multiply(3, 4))

    // Pass function as argument
    result := applyOp(10, 3, func(a, b int) int {
        return a + b
    })
    fmt.Println("Apply add:", result)

    // Function that returns a function
    adder := makeAdder(10)
    fmt.Println("Adder(5):", adder(5))
    fmt.Println("Adder(20):", adder(20))
}

func makeAdder(base int) func(int) int {
    return func(n int) int {
        return base + n
    }
}`,
            output: `Multiply: 12
Apply add: 13
Adder(5): 15
Adder(20): 30`,
            tip: 'Use named function types (like `type MathOp func(int, int) int`) to improve readability when the same function signature appears in multiple places.',
            analogy: 'Think of it like a vending machine factory: `makeAdder(10)` builds a custom vending machine that always adds 10 to whatever you feed it. Each call to the factory produces a new, independent machine with its own settings baked in.',
          },
        ],
        quiz: [
          {
            question: 'If consecutive parameters in a Go function share the same type, how can you declare them?',
            options: [
              'You must write the type for each parameter: `func add(a int, b int) int`',
              'You can write the type once: `func add(a, b int) int`',
              'You use a slice: `func add(params []int) int`',
              'You cannot have consecutive parameters of the same type',
            ],
            correctIndex: 1,
            explanation: 'In Go, if consecutive parameters have the same type, you can share the type declaration: `func add(a, b int) int` is equivalent to `func add(a int, b int) int`.',
          },
          {
            question: 'What does a "naked return" do in Go?',
            options: [
              'It returns nil for all values',
              'It returns the zero values of all return types',
              'It returns the current values of the named return variables',
              'It exits the function without returning anything',
            ],
            correctIndex: 2,
            explanation: 'A naked return (a `return` statement with no arguments) returns the current values of the named return variables. It only works when return values are named in the function signature.',
          },
          {
            question: 'Can functions be assigned to variables in Go?',
            options: [
              'No, functions are not first-class citizens',
              'Yes, functions are first-class values and can be assigned, passed, and returned',
              'Only anonymous functions can be assigned to variables',
              'Only if you use the `var` keyword',
            ],
            correctIndex: 1,
            explanation: 'Functions are first-class values in Go. You can assign them to variables, pass them as arguments, and return them from other functions. Both named and anonymous functions can be used this way.',
          },
        ],
        challenge: {
          prompt: 'Write a function `applyOperation` that takes two float64 numbers and a function `op func(float64, float64) float64`, and returns the result. Define a named function type `Operation` for the function parameter. Create `add`, `subtract`, and `multiply` operations, then test them.',
          starterCode: `package main

import "fmt"

// Define the Operation type
// TODO: define type

func applyOperation(a, b float64, op Operation) float64 {
    // TODO: implement
    return 0
}

func main() {
    // Define add, subtract, multiply operations
    // TODO: define operations

    fmt.Println("Add:", applyOperation(10, 3, add))
    fmt.Println("Sub:", applyOperation(10, 3, subtract))
    fmt.Println("Mul:", applyOperation(10, 3, multiply))
}`,
          solutionCode: `package main

import "fmt"

type Operation func(float64, float64) float64

func applyOperation(a, b float64, op Operation) float64 {
    return op(a, b)
}

func main() {
    add := func(a, b float64) float64 { return a + b }
    subtract := func(a, b float64) float64 { return a - b }
    multiply := func(a, b float64) float64 { return a * b }

    fmt.Println("Add:", applyOperation(10, 3, add))
    fmt.Println("Sub:", applyOperation(10, 3, subtract))
    fmt.Println("Mul:", applyOperation(10, 3, multiply))
}`,
          hints: [
            'Define the type as `type Operation func(float64, float64) float64`.',
            'The `applyOperation` function simply calls `op(a, b)` and returns the result.',
            'Define each operation as an anonymous function assigned to a variable: `add := func(a, b float64) float64 { return a + b }`.',
          ],
        },
      },
      {
        id: 'multiple-return-values',
        title: 'Multiple Return Values',
        difficulty: 'beginner',
        tags: ['return', 'error', 'multiple-returns', 'comma-ok'],
        cheatSheetSummary:
          'Functions can return multiple values: `func f() (int, error)`. Central to error handling. Use `_` to discard values.',
        crossLanguageId: 'multiple-return-values',
        sections: [
          {
            heading: 'The (result, error) Pattern',
            content:
              'Go functions can return multiple values, which is central to Go\'s error handling philosophy. Instead of exceptions, functions return `(result, error)`. This forces callers to explicitly handle errors. The convention is to always check the error before using the result.',
            code: `package main

import (
    "errors"
    "fmt"
    "strconv"
)

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

func main() {
    // Always check errors
    result, err := divide(10, 3)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Printf("10 / 3 = %.4f\\n", result)

    // Error case
    _, err = divide(5, 0)
    if err != nil {
        fmt.Println("Error:", err)
    }

    // Standard library example
    n, err := strconv.Atoi("not-a-number")
    if err != nil {
        fmt.Println("Parse error:", err)
    }
    fmt.Println("n:", n) // zero value on error
}`,
            output: `10 / 3 = 3.3333
Error: division by zero
Parse error: strconv.Atoi: parsing "not-a-number": invalid syntax
n: 0`,
            tip: 'Never ignore errors with `_` unless you are absolutely certain the function cannot fail in your context. Use a linter like `errcheck` to catch ignored errors.',
            analogy: 'Think of it like a mail-order service: every package (result) comes with a delivery receipt (error). You always check the receipt before opening the package. If the receipt says "damaged in transit," you handle the problem instead of blindly using what is inside.',
            codeHighlightLines: [9, 10, 11, 18, 19],
          },
          {
            heading: 'Returning Multiple Values',
            content:
              'Beyond errors, multiple return values are used for returning related data, implementing comma-ok patterns, and decomposing complex results. Standard library functions like `map` lookup and type assertions use this pattern.',
            codeHighlightLines: [6, 16, 20, 22, 37, 38],
            diagram: {
              kind: 'mermaid',
              code: 'graph LR\n    subgraph "Comma-ok pattern"\n        MAP["m[key]"] --> VAL["val"]\n        MAP --> OK{"ok?"}\n        OK -->|"true"| FOUND["key exists, use val"]\n        OK -->|"false"| MISS["key missing, val is zero"]\n    end\n    style MAP fill:#42a5f5,color:#fff\n    style FOUND fill:#66bb6a,color:#fff\n    style MISS fill:#ef5350,color:#fff',
              caption: 'The comma-ok pattern returns a value and a boolean indicating success, used with maps, type assertions, and channel receives',
            },
            code: `package main

import "fmt"

// Return min and max together
func minMax(nums []int) (int, int) {
    mn, mx := nums[0], nums[0]
    for _, n := range nums[1:] {
        if n < mn {
            mn = n
        }
        if n > mx {
            mx = n
        }
    }
    return mn, mx
}

// Return three values
func parseCoord(s string) (float64, float64, error) {
    var lat, lon float64
    _, err := fmt.Sscanf(s, "%f,%f", &lat, &lon)
    return lat, lon, err
}

func main() {
    mn, mx := minMax([]int{3, 1, 4, 1, 5, 9, 2, 6})
    fmt.Printf("Min: %d, Max: %d\\n", mn, mx)

    lat, lon, err := parseCoord("37.7749,-122.4194")
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Printf("Lat: %.4f, Lon: %.4f\\n", lat, lon)
    }

    // Comma-ok pattern with maps
    m := map[string]int{"a": 1, "b": 2}
    if val, ok := m["a"]; ok {
        fmt.Println("Found a:", val)
    }
}`,
            output: `Min: 1, Max: 9
Lat: 37.7749, Lon: -122.4194
Found a: 1`,
            note: 'The comma-ok idiom (`val, ok := ...`) is used with map lookups, type assertions, and channel receives to distinguish between success and failure.',
          },
          {
            heading: 'Discarding Return Values',
            content:
              'Use the blank identifier `_` to discard values you do not need. This is required because Go does not allow unused variables. You can also call functions and ignore all return values entirely if you do not need them.',
            codeHighlightLines: [14, 18, 22],
            code: `package main

import (
    "fmt"
    "os"
)

func threeValues() (int, string, bool) {
    return 42, "hello", true
}

func main() {
    // Discard specific values
    _, s, _ := threeValues()
    fmt.Println("String:", s)

    // Discard error (use with caution!)
    n, _ := fmt.Println("hello") // n = bytes written
    fmt.Println("Bytes written:", n)

    // Common: discard n when you only care about error
    _, err := os.Stat("/nonexistent")
    if err != nil {
        fmt.Println("Stat error:", err)
    }

    // Discard all return values
    fmt.Println("done")
}`,
            output: `String: hello
hello
Bytes written: 6
Stat error: stat /nonexistent: no such file or directory
done`,
            warning: 'Discarding errors is the most common source of bugs in Go. Only discard an error if you truly do not care whether the operation succeeded.',
          },
        ],
        quiz: [
          {
            question: 'What is the idiomatic pattern for error handling in Go?',
            options: [
              'Use try/catch/finally blocks',
              'Use panic/recover for all errors',
              'Return (result, error) and check the error before using the result',
              'Use global error variables',
            ],
            correctIndex: 2,
            explanation: 'Go\'s error handling pattern is to return `(result, error)` from functions and explicitly check the error before using the result. This forces callers to handle errors rather than ignoring them.',
          },
          {
            question: 'What is the "comma-ok" idiom used for?',
            options: [
              'Checking if a function call was successful',
              'Distinguishing between success and failure in map lookups, type assertions, and channel receives',
              'Validating function parameters',
              'Formatting output strings',
            ],
            correctIndex: 1,
            explanation: 'The comma-ok idiom (`val, ok := m[key]`) is used with map lookups, type assertions, and channel receives to distinguish between a valid result and a zero value from a missing key or failed assertion.',
          },
          {
            question: 'What does the blank identifier `_` do when receiving return values?',
            options: [
              'It stores the value in a temporary variable',
              'It discards the value, satisfying Go\'s requirement that all declared variables must be used',
              'It converts the value to nil',
              'It logs the value to stderr',
            ],
            correctIndex: 1,
            explanation: 'The blank identifier `_` discards a return value. Since Go requires all declared variables to be used, `_` allows you to explicitly ignore values you do not need without causing a compile error.',
          },
        ],
        challenge: {
          prompt: 'Write a function `safeDivide` that takes two float64 values and returns `(float64, error)`. It should return an error for division by zero. Then write a function `parseAndAdd` that takes two strings, parses them to integers using `strconv.Atoi`, and returns their sum. If either parse fails, return the error. Use the comma-ok pattern to check a map lookup in main.',
          starterCode: `package main

import (
    "fmt"
    "strconv"
)

func safeDivide(a, b float64) (float64, error) {
    // Return error if b is zero
    // TODO: implement
    return 0, nil
}

func parseAndAdd(s1, s2 string) (int, error) {
    // Parse both strings and return their sum
    // Handle errors from strconv.Atoi
    // TODO: implement
    return 0, nil
}

func main() {
    // Test safeDivide
    if result, err := safeDivide(10, 3); err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Printf("10 / 3 = %.4f\\n", result)
    }

    // Test parseAndAdd
    if sum, err := parseAndAdd("15", "27"); err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Sum:", sum)
    }

    // Test comma-ok with map
    scores := map[string]int{"Alice": 95, "Bob": 87}
    // TODO: use comma-ok to look up "Alice" and "Charlie"
}`,
          solutionCode: `package main

import (
    "errors"
    "fmt"
    "strconv"
)

func safeDivide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

func parseAndAdd(s1, s2 string) (int, error) {
    n1, err := strconv.Atoi(s1)
    if err != nil {
        return 0, fmt.Errorf("parsing %q: %w", s1, err)
    }
    n2, err := strconv.Atoi(s2)
    if err != nil {
        return 0, fmt.Errorf("parsing %q: %w", s2, err)
    }
    return n1 + n2, nil
}

func main() {
    if result, err := safeDivide(10, 3); err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Printf("10 / 3 = %.4f\\n", result)
    }

    if sum, err := parseAndAdd("15", "27"); err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Sum:", sum)
    }

    scores := map[string]int{"Alice": 95, "Bob": 87}
    if val, ok := scores["Alice"]; ok {
        fmt.Println("Alice's score:", val)
    }
    if val, ok := scores["Charlie"]; ok {
        fmt.Println("Charlie's score:", val)
    } else {
        fmt.Println("Charlie not found")
    }
}`,
          hints: [
            'For `safeDivide`, check if `b == 0` and return `errors.New("division by zero")` if so.',
            'For `parseAndAdd`, call `strconv.Atoi` for each string and check the error immediately after each call before proceeding.',
            'For the comma-ok map lookup, use `if val, ok := scores["key"]; ok { ... }` to safely check if a key exists.',
          ],
        },
      },
      {
        id: 'variadic-functions',
        title: 'Variadic Functions',
        difficulty: 'beginner',
        tags: ['variadic', 'spread', 'ellipsis', 'variable-args'],
        cheatSheetSummary:
          '`func f(nums ...int)` accepts variable arguments as a slice. Spread a slice with `f(slice...)`. Must be the last parameter.',
        crossLanguageId: 'variadic-functions',
        sections: [
          {
            heading: 'Variadic Function Basics',
            content:
              'Variadic functions accept a variable number of arguments using the `...` syntax. Inside the function, the variadic parameter is a slice. You can pass zero or more arguments. The variadic parameter must be the last parameter.',
            code: `package main

import "fmt"

func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

func printAll(sep string, values ...interface{}) {
    for i, v := range values {
        if i > 0 {
            fmt.Print(sep)
        }
        fmt.Print(v)
    }
    fmt.Println()
}

func main() {
    fmt.Println(sum())              // 0
    fmt.Println(sum(1))             // 1
    fmt.Println(sum(1, 2, 3))       // 6
    fmt.Println(sum(1, 2, 3, 4, 5)) // 15

    printAll(", ", "hello", 42, true, 3.14)
}`,
            output: `0
1
6
15
hello, 42, true, 3.14`,
            tip: 'The variadic parameter must always be the last parameter. You can have regular parameters before it: `func f(prefix string, nums ...int)`.',
            analogy: 'Think of it like a funnel: you can pour in as many items as you want (1 argument, 5 arguments, or none), and inside the function they all collect into a neat slice.',
            codeHighlightLines: [5, 13, 24, 25, 26, 27],
          },
          {
            heading: 'Spreading Slices into Variadic Functions',
            content:
              'To pass a slice to a variadic function, use the `...` spread operator after the slice. This unpacks the slice into individual arguments. This is how `append()` works when appending one slice to another.',
            analogy: 'Think of it like emptying a bag of marbles into a funnel: `nums...` opens the bag (slice) and drops each marble (element) in one by one, as if you had typed them out individually.',
            code: `package main

import "fmt"

func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

func main() {
    // Spread a slice
    nums := []int{10, 20, 30}
    fmt.Println("Sum:", sum(nums...))

    // append uses the same spread pattern
    a := []int{1, 2, 3}
    b := []int{4, 5, 6}
    a = append(a, b...) // spread b into append
    fmt.Println("Appended:", a)

    // Combine fixed and spread
    all := sum(1, 2, 3)
    fmt.Println("Fixed:", all)
}`,
            output: `Sum: 60
Appended: [1 2 3 4 5 6]
Fixed: 6`,
            note: 'When you spread a slice into a variadic function, no copy is made -- the function receives the same underlying array. Be aware of this if the function modifies the slice.',
            codeHighlightLines: [16, 21],
          },
          {
            heading: 'Practical Variadic Examples',
            content:
              'Variadic functions are used extensively in the standard library: `fmt.Println`, `append`, `fmt.Sprintf`, and more. They are great for building flexible APIs and utility functions.',
            codeHighlightLines: [9, 10, 15, 25, 26],
            code: `package main

import (
    "fmt"
    "strings"
)

// Flexible logger
func logf(format string, args ...interface{}) {
    msg := fmt.Sprintf(format, args...)
    fmt.Println("[LOG]", msg)
}

// Return first non-empty string
func coalesce(values ...string) string {
    for _, v := range values {
        if v != "" {
            return v
        }
    }
    return ""
}

// Max of multiple values
func max(first int, rest ...int) int {
    m := first
    for _, v := range rest {
        if v > m {
            m = v
        }
    }
    return m
}

func main() {
    logf("User %s logged in from %s", "alice", "192.168.1.1")

    name := coalesce("", "", "default_name")
    fmt.Println("Name:", name)

    fmt.Println("Max:", max(3, 7, 1, 9, 4))
}`,
            output: `[LOG] User alice logged in from 192.168.1.1
Name: default_name
Max: 9`,
            tip: 'Use a required first parameter (like `max(first int, rest ...int)`) when the function needs at least one argument. This provides compile-time safety instead of runtime panics.',
          },
        ],
        quiz: [
          {
            question: 'Where must the variadic parameter be placed in a function signature?',
            options: [
              'It can be placed anywhere in the parameter list',
              'It must be the first parameter',
              'It must be the last parameter',
              'It must be the only parameter',
            ],
            correctIndex: 2,
            explanation: 'The variadic parameter must always be the last parameter in the function signature. You can have regular parameters before it, but nothing can come after it.',
          },
          {
            question: 'How do you pass a slice to a variadic function?',
            options: [
              'Pass the slice directly: `sum(mySlice)`',
              'Use the spread operator: `sum(mySlice...)`',
              'Convert the slice to an array first',
              'Use a for loop to pass elements one by one',
            ],
            correctIndex: 1,
            explanation: 'To pass a slice to a variadic function, use the `...` spread operator after the slice: `sum(mySlice...)`. This unpacks the slice into individual arguments.',
          },
          {
            question: 'Inside a variadic function `func sum(nums ...int)`, what type is `nums`?',
            options: [
              'int',
              '[]int (a slice of int)',
              'array of int',
              'interface{}',
            ],
            correctIndex: 1,
            explanation: 'Inside the function, the variadic parameter `nums` is a slice (`[]int`). You can use all slice operations on it, including `len`, `range`, and indexing.',
          },
        ],
        challenge: {
          prompt: 'Write a variadic function `joinStrings` that takes a separator string and a variadic number of strings, then returns them joined with the separator. Also write a `filterInts` function that takes a filter function and variadic ints, returning a slice of ints that pass the filter. Test spreading a slice into `filterInts`.',
          starterCode: `package main

import "fmt"

func joinStrings(sep string, parts ...string) string {
    // Join all parts with the separator between them
    // TODO: implement
    return ""
}

func filterInts(fn func(int) bool, nums ...int) []int {
    // Return only the nums for which fn returns true
    // TODO: implement
    return nil
}

func main() {
    fmt.Println(joinStrings(", ", "Go", "is", "awesome"))
    fmt.Println(joinStrings("-", "2024", "01", "15"))

    evens := filterInts(func(n int) bool { return n%2 == 0 }, 1, 2, 3, 4, 5, 6)
    fmt.Println("Evens:", evens)

    // Spread a slice into filterInts
    nums := []int{10, 15, 20, 25, 30}
    bigNums := filterInts(func(n int) bool { return n > 18 }, nums...)
    fmt.Println("Big nums:", bigNums)
}`,
          solutionCode: `package main

import "fmt"

func joinStrings(sep string, parts ...string) string {
    result := ""
    for i, p := range parts {
        if i > 0 {
            result += sep
        }
        result += p
    }
    return result
}

func filterInts(fn func(int) bool, nums ...int) []int {
    var result []int
    for _, n := range nums {
        if fn(n) {
            result = append(result, n)
        }
    }
    return result
}

func main() {
    fmt.Println(joinStrings(", ", "Go", "is", "awesome"))
    fmt.Println(joinStrings("-", "2024", "01", "15"))

    evens := filterInts(func(n int) bool { return n%2 == 0 }, 1, 2, 3, 4, 5, 6)
    fmt.Println("Evens:", evens)

    nums := []int{10, 15, 20, 25, 30}
    bigNums := filterInts(func(n int) bool { return n > 18 }, nums...)
    fmt.Println("Big nums:", bigNums)
}`,
          hints: [
            'In `joinStrings`, iterate over `parts` with range. Add the separator before each element except the first (check `if i > 0`).',
            'In `filterInts`, iterate over `nums` and call `fn(n)`. If it returns true, append `n` to the result.',
            'To spread a slice, use `nums...` as the last argument to the variadic function.',
          ],
        },
      },
      {
        id: 'closures',
        title: 'Closures',
        difficulty: 'intermediate',
        tags: ['closure', 'anonymous-function', 'capture', 'first-class'],
        cheatSheetSummary:
          'Closures capture variables from their enclosing scope by reference. Used for callbacks, iterators, and stateful functions.',
        crossLanguageId: 'closures',
        sections: [
          {
            heading: 'Closures and Variable Capture',
            content:
              'A closure is a function that captures variables from its enclosing scope. The captured variables are shared by reference, not copied. This means the closure can read and modify the outer variable, and changes persist between calls.',
            code: `package main

import "fmt"

func counter() func() int {
    count := 0
    return func() int {
        count++ // captures and modifies outer variable
        return count
    }
}

func main() {
    c1 := counter()
    c2 := counter() // separate closure, separate count

    fmt.Println(c1()) // 1
    fmt.Println(c1()) // 2
    fmt.Println(c1()) // 3

    fmt.Println(c2()) // 1 (independent)
    fmt.Println(c2()) // 2
}`,
            output: `1
2
3
1
2`,
            tip: 'Each call to `counter()` creates a new closure with its own `count` variable. The closures are independent of each other.',
            analogy: 'Think of it like a backpack: the closure carries its captured variables around like items in a backpack. Each new closure from `counter()` gets its own backpack with its own `count` inside.',
            codeHighlightLines: [5, 6, 7, 8],
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    COUNTER["counter() called"] --> ENV1["Environment 1: count = 0"]\n    COUNTER --> ENV2["Environment 2: count = 0"]\n    ENV1 --> C1["c1 closure → count: 0→1→2→3"]\n    ENV2 --> C2["c2 closure → count: 0→1→2"]\n    C1 -.->|"independent"| C2\n    style ENV1 fill:#42a5f5,color:#fff\n    style ENV2 fill:#66bb6a,color:#fff\n    style C1 fill:#42a5f5,color:#fff\n    style C2 fill:#66bb6a,color:#fff',
              caption: 'Each call to counter() creates an independent closure with its own captured count variable',
            },
          },
          {
            heading: 'Closures in Loops',
            content:
              'A common gotcha is using closures in loops. Before Go 1.22, the loop variable was shared across iterations, causing closures to capture the final value. Go 1.22+ creates a new variable per iteration, fixing this. For older versions, create a local copy.',
            analogy: 'Think of it like group photos with a changing sign: before Go 1.22, all closures pointed to one shared sign that kept changing (they all saw the final value). Go 1.22+ gives each closure its own snapshot of the sign at the moment the photo was taken.',
            code: `package main

import "fmt"

func main() {
    // Go 1.22+: each iteration gets a new variable
    fns := make([]func(), 5)
    for i := 0; i < 5; i++ {
        fns[i] = func() {
            fmt.Print(i, " ")
        }
    }
    fmt.Print("Go 1.22+: ")
    for _, fn := range fns {
        fn()
    }
    fmt.Println()

    // Safe for all versions: capture via parameter
    fns2 := make([]func(), 5)
    for i := 0; i < 5; i++ {
        fns2[i] = func(n int) func() {
            return func() { fmt.Print(n, " ") }
        }(i)
    }
    fmt.Print("All versions: ")
    for _, fn := range fns2 {
        fn()
    }
    fmt.Println()
}`,
            output: `Go 1.22+: 0 1 2 3 4
All versions: 0 1 2 3 4`,
            warning: 'Before Go 1.22, loop variable capture was a major source of bugs, especially with goroutines. Always pass the variable as a parameter if targeting older Go versions.',
            codeHighlightLines: [8, 9, 10, 22, 23, 24],
          },
          {
            heading: 'Practical Closure Patterns',
            content:
              'Closures are used for middleware, decorators, memoization, and lazy initialization. They enable powerful patterns without complex class hierarchies.',
            code: `package main

import (
    "fmt"
    "time"
)

// Middleware/decorator pattern
func timed(name string, fn func()) func() {
    return func() {
        start := time.Now()
        fn()
        fmt.Printf("%s took %v\\n", name, time.Since(start))
    }
}

// Memoization
func memoize(fn func(int) int) func(int) int {
    cache := make(map[int]int)
    return func(n int) int {
        if v, ok := cache[n]; ok {
            return v
        }
        v := fn(n)
        cache[n] = v
        return v
    }
}

func fib(n int) int {
    if n <= 1 {
        return n
    }
    return fib(n-1) + fib(n-2)
}

func main() {
    // Timed decorator
    work := timed("computation", func() {
        sum := 0
        for i := 0; i < 1000000; i++ {
            sum += i
        }
        fmt.Println("Sum:", sum)
    })
    work()

    // Memoized Fibonacci
    fastFib := memoize(fib)
    fmt.Println("Fib(10):", fastFib(10))
    fmt.Println("Fib(10):", fastFib(10)) // from cache
}`,
            output: `Sum: 499999500000
computation took 1.234ms
Fib(10): 55
Fib(10): 55`,
            tip: 'The memoization pattern only works for the outer call since `fib` recursively calls itself, not `fastFib`. For full memoization, the recursive function must reference the memoized version.',
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    MEMO["memoize(fib)"] --> CACHE["cache: map[int]int (captured)"]\n    MEMO --> FN["returned closure"]\n    FN --> CHECK{"cache[n] exists?"}\n    CHECK -->|"Yes (hit)"| RET["return cached value"]\n    CHECK -->|"No (miss)"| CALC["v := fib(n)"]\n    CALC --> STORE["cache[n] = v"]\n    STORE --> RET2["return v"]\n    style CACHE fill:#ffa726,color:#fff\n    style RET fill:#66bb6a,color:#fff\n    style CALC fill:#42a5f5,color:#fff',
              caption: 'Memoization closure captures a cache map. Subsequent calls with the same argument return the cached result.',
            },
          },
        ],
        quiz: [
          {
            question: 'How do closures capture variables from their enclosing scope in Go?',
            options: [
              'By value -- a copy is made when the closure is created',
              'By reference -- the closure shares the original variable',
              'By deep copy -- all nested structures are duplicated',
              'Variables cannot be captured; they must be passed as parameters',
            ],
            correctIndex: 1,
            explanation: 'Closures in Go capture variables by reference. The closure shares the original variable with the enclosing scope, meaning it can both read and modify the outer variable, and changes persist between calls.',
          },
          {
            question: 'What was the common gotcha with closures in loops before Go 1.22?',
            options: [
              'Closures could not be created inside loops',
              'The loop variable was shared across all iterations, causing closures to all see the final value',
              'Closures in loops caused memory leaks',
              'Loop closures ran in parallel automatically',
            ],
            correctIndex: 1,
            explanation: 'Before Go 1.22, the loop variable was a single variable reused across iterations. All closures captured the same variable and ended up seeing its final value. Go 1.22+ creates a new variable per iteration, fixing this.',
          },
          {
            question: 'What does calling `counter()` twice produce in terms of closures?',
            options: [
              'Two closures sharing the same count variable',
              'Two independent closures, each with their own count variable',
              'One closure that counts twice as fast',
              'A compile error because functions cannot return functions',
            ],
            correctIndex: 1,
            explanation: 'Each call to `counter()` creates a new closure with its own independent `count` variable. The closures do not share state -- they each have their own environment.',
          },
        ],
        challenge: {
          prompt: 'Write a `rateLimiter` function that returns a closure. The closure should accept no arguments and return a bool. It should allow the first N calls to return true (allowed), and all subsequent calls return false (rate limited). N is passed to `rateLimiter`. Also write a `sequenceGenerator` that returns a closure producing the sequence: 1, 1, 2, 3, 5, 8... (Fibonacci).',
          starterCode: `package main

import "fmt"

func rateLimiter(maxCalls int) func() bool {
    // Return a closure that allows the first maxCalls calls
    // and rejects the rest
    // TODO: implement
    return nil
}

func sequenceGenerator() func() int {
    // Return a closure that generates Fibonacci numbers
    // Each call returns the next number: 1, 1, 2, 3, 5, 8...
    // TODO: implement
    return nil
}

func main() {
    limiter := rateLimiter(3)
    for i := 1; i <= 5; i++ {
        fmt.Printf("Call %d: allowed=%v\\n", i, limiter())
    }

    fmt.Println()
    fib := sequenceGenerator()
    for i := 0; i < 8; i++ {
        fmt.Print(fib(), " ")
    }
    fmt.Println()
}`,
          solutionCode: `package main

import "fmt"

func rateLimiter(maxCalls int) func() bool {
    calls := 0
    return func() bool {
        calls++
        return calls <= maxCalls
    }
}

func sequenceGenerator() func() int {
    a, b := 0, 1
    return func() int {
        a, b = b, a+b
        return a
    }
}

func main() {
    limiter := rateLimiter(3)
    for i := 1; i <= 5; i++ {
        fmt.Printf("Call %d: allowed=%v\\n", i, limiter())
    }

    fmt.Println()
    fib := sequenceGenerator()
    for i := 0; i < 8; i++ {
        fmt.Print(fib(), " ")
    }
    fmt.Println()
}`,
          hints: [
            'For `rateLimiter`, capture a `calls` counter. Each call increments it and checks `calls <= maxCalls`.',
            'For the Fibonacci generator, capture two variables `a, b` initialized to 0 and 1. Each call updates them with `a, b = b, a+b` and returns the new `a`.',
            'Both functions demonstrate closures capturing mutable state that persists between calls.',
          ],
        },
      },
      {
        id: 'methods',
        title: 'Methods',
        difficulty: 'intermediate',
        tags: ['method', 'receiver', 'value-receiver', 'pointer-receiver'],
        cheatSheetSummary:
          'Methods are functions with a receiver: `func (r Rect) Area() float64`. Pointer receivers `*T` can mutate. Value receivers get copies.',
        crossLanguageId: 'methods',
        sections: [
          {
            heading: 'Value vs Pointer Receivers',
            content:
              'Methods are functions attached to a type via a receiver. Value receivers get a copy and cannot modify the original. Pointer receivers get a reference and can mutate the struct. Use pointer receivers when the method needs to modify state or when the struct is large.',
            code: `package main

import (
    "fmt"
    "math"
)

type Circle struct {
    Radius float64
}

// Value receiver: gets a copy
func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

// Pointer receiver: can modify original
func (c *Circle) Scale(factor float64) {
    c.Radius *= factor
}

func main() {
    c := Circle{Radius: 5}
    fmt.Printf("Area: %.2f\\n", c.Area())

    c.Scale(2)
    fmt.Printf("After Scale(2), Radius: %.1f\\n", c.Radius)
    fmt.Printf("New Area: %.2f\\n", c.Area())

    // Go auto-dereferences: pointer methods work on values
    p := &Circle{Radius: 3}
    fmt.Printf("Pointer area: %.2f\\n", p.Area())
}`,
            output: `Area: 78.54
After Scale(2), Radius: 10.0
New Area: 314.16
Pointer area: 28.27`,
            tip: 'Consistency rule: if any method has a pointer receiver, all methods should use pointer receivers. Mixing confuses whether to use values or pointers.',
            analogy: 'Think of it like editing a document: a value receiver gets a photocopy (changes are lost when you are done), while a pointer receiver gets the original document (changes are permanent).',
            codeHighlightLines: [13, 18, 19],
          },
          {
            heading: 'Methods on Any Named Type',
            content:
              'Methods can be defined on any named type, not just structs. You can add methods to numeric types, string types, and slice types. The type must be defined in the same package as the methods.',
            analogy: 'Think of it like giving a nickname to a built-in type and then teaching the nickname new tricks: `type Name string` is the nickname, and now Name can have methods that plain `string` cannot. It is like promoting a generic worker to a specialized role.',
            codeHighlightLines: [8, 10, 14, 19, 21, 29],
            code: `package main

import (
    "fmt"
    "strings"
)

// Methods on a string type
type Name string

func (n Name) Greet() string {
    return "Hello, " + string(n) + "!"
}

func (n Name) Upper() Name {
    return Name(strings.ToUpper(string(n)))
}

// Methods on a slice type
type IntSlice []int

func (s IntSlice) Sum() int {
    total := 0
    for _, v := range s {
        total += v
    }
    return total
}

func (s IntSlice) Filter(fn func(int) bool) IntSlice {
    var result IntSlice
    for _, v := range s {
        if fn(v) {
            result = append(result, v)
        }
    }
    return result
}

func main() {
    name := Name("alice")
    fmt.Println(name.Greet())
    fmt.Println(name.Upper().Greet())

    nums := IntSlice{1, 2, 3, 4, 5, 6, 7, 8}
    fmt.Println("Sum:", nums.Sum())
    evens := nums.Filter(func(n int) bool { return n%2 == 0 })
    fmt.Println("Evens:", evens)
    fmt.Println("Evens sum:", evens.Sum())
}`,
            output: `Hello, alice!
Hello, ALICE!
Sum: 36
Evens: [2 4 6 8]
Evens sum: 20`,
            note: 'You cannot define methods on built-in types directly. Create a named type (`type Name string`) to add methods. This also provides type safety.',
          },
          {
            heading: 'Method Sets and Interface Satisfaction',
            content:
              'The method set of a type determines which interfaces it satisfies. A value of type T has access to methods with value receivers. A pointer *T has access to methods with both value and pointer receivers. This is important for interface satisfaction.',
            code: `package main

import "fmt"

type Stringer interface {
    String() string
}

type Dog struct {
    Name string
}

// Pointer receiver method
func (d *Dog) String() string {
    return "Dog: " + d.Name
}

type Cat struct {
    Name string
}

// Value receiver method
func (c Cat) String() string {
    return "Cat: " + c.Name
}

func printAnimal(s Stringer) {
    fmt.Println(s.String())
}

func main() {
    dog := Dog{Name: "Rex"}
    cat := Cat{Name: "Whiskers"}

    // *Dog satisfies Stringer (pointer receiver)
    printAnimal(&dog) // must pass pointer

    // Cat satisfies Stringer (value receiver)
    printAnimal(cat)   // can pass value
    printAnimal(&cat)  // can also pass pointer

    // dog (not &dog) does NOT satisfy Stringer
    // printAnimal(dog)  // COMPILE ERROR
}`,
            output: `Dog: Rex
Cat: Whiskers
Cat: Whiskers`,
            warning: 'A value of type T cannot satisfy interfaces requiring pointer receiver methods. Always pass `&t` (a pointer) when the methods use pointer receivers.',
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    subgraph "Method Sets"\n        T["Type T (value)"] --> VM["Value receiver methods only"]\n        PT["Type *T (pointer)"] --> AM["Value + Pointer receiver methods"]\n    end\n    subgraph "Interface Satisfaction"\n        CAT["Cat (value receiver)"] -->|"Cat and *Cat both satisfy"| IFACE["Stringer interface"]\n        DOG["*Dog (pointer receiver)"] -->|"only *Dog satisfies"| IFACE\n        DOGV["Dog value"] -.->|"DOES NOT satisfy"| IFACE\n    end\n    style T fill:#42a5f5,color:#fff\n    style PT fill:#66bb6a,color:#fff\n    style DOGV fill:#ef5350,color:#fff\n    style IFACE fill:#ffa726,color:#fff',
              caption: 'Value types only have value-receiver methods in their method set. Pointer types have both value and pointer receiver methods.',
            },
            codeHighlightLines: [14, 23, 36, 39, 40],
          },
        ],
        quiz: [
          {
            question: 'What is the difference between a value receiver and a pointer receiver?',
            options: [
              'There is no difference; they behave the same way',
              'A value receiver gets a copy and cannot modify the original; a pointer receiver can modify the original',
              'A value receiver is faster; a pointer receiver is slower',
              'Value receivers are for structs; pointer receivers are for interfaces',
            ],
            correctIndex: 1,
            explanation: 'A value receiver receives a copy of the struct, so modifications do not affect the original. A pointer receiver receives a reference, allowing the method to modify the struct\'s fields directly.',
          },
          {
            question: 'Can you define methods on built-in types like `string` or `int` directly?',
            options: [
              'Yes, you can add methods to any type',
              'No, but you can create a named type (e.g., `type Name string`) and add methods to that',
              'Only if you import the type\'s package',
              'Only pointer methods can be added to built-in types',
            ],
            correctIndex: 1,
            explanation: 'You cannot define methods on built-in types directly. You must create a named type (`type Name string`) in your package and define methods on that new type.',
          },
          {
            question: 'If a type has a method with a pointer receiver, which of the following can satisfy an interface requiring that method?',
            options: [
              'Both a value and a pointer of the type',
              'Only a pointer to the type (*T)',
              'Only a value of the type (T)',
              'Neither; pointer receiver methods cannot satisfy interfaces',
            ],
            correctIndex: 1,
            explanation: 'When a method has a pointer receiver, only a pointer to the type (*T) includes that method in its method set. A value of type T does not have pointer receiver methods in its method set and cannot satisfy the interface.',
          },
          {
            question: 'What is the consistency rule for receiver types?',
            options: [
              'All methods must use value receivers',
              'All methods must use pointer receivers',
              'If any method has a pointer receiver, all methods should use pointer receivers for consistency',
              'You must alternate between value and pointer receivers',
            ],
            correctIndex: 2,
            explanation: 'The consistency rule states that if any method of a type uses a pointer receiver, all methods should use pointer receivers. Mixing receiver types confuses whether to use values or pointers and makes interface satisfaction harder to reason about.',
          },
        ],
        challenge: {
          prompt: 'Create a `BankAccount` struct with `Owner string` and `balance float64` (unexported). Add methods: `Deposit(amount float64) error` (pointer receiver, reject negative amounts), `Withdraw(amount float64) error` (pointer receiver, reject overdrafts), `Balance() float64` (value receiver), and `String() string` (value receiver, format as "Owner: $balance"). Test that deposits and withdrawals modify the actual balance.',
          starterCode: `package main

import "fmt"

type BankAccount struct {
    Owner   string
    balance float64
}

// TODO: Add Deposit method (pointer receiver)

// TODO: Add Withdraw method (pointer receiver)

// TODO: Add Balance method (value receiver)

// TODO: Add String method (value receiver)

func main() {
    acc := &BankAccount{Owner: "Alice", balance: 100}
    fmt.Println(acc)

    acc.Deposit(50)
    fmt.Println("After deposit:", acc)

    err := acc.Withdraw(200)
    fmt.Println("Withdraw 200 error:", err)

    acc.Withdraw(30)
    fmt.Println("After withdraw:", acc)
    fmt.Println("Balance:", acc.Balance())
}`,
          solutionCode: `package main

import (
    "errors"
    "fmt"
)

type BankAccount struct {
    Owner   string
    balance float64
}

func (a *BankAccount) Deposit(amount float64) error {
    if amount < 0 {
        return errors.New("deposit amount must be positive")
    }
    a.balance += amount
    return nil
}

func (a *BankAccount) Withdraw(amount float64) error {
    if amount < 0 {
        return errors.New("withdrawal amount must be positive")
    }
    if amount > a.balance {
        return fmt.Errorf("insufficient funds: balance %.2f, requested %.2f", a.balance, amount)
    }
    a.balance -= amount
    return nil
}

func (a BankAccount) Balance() float64 {
    return a.balance
}

func (a BankAccount) String() string {
    return fmt.Sprintf("%s: $%.2f", a.Owner, a.balance)
}

func main() {
    acc := &BankAccount{Owner: "Alice", balance: 100}
    fmt.Println(acc)

    acc.Deposit(50)
    fmt.Println("After deposit:", acc)

    err := acc.Withdraw(200)
    fmt.Println("Withdraw 200 error:", err)

    acc.Withdraw(30)
    fmt.Println("After withdraw:", acc)
    fmt.Println("Balance:", acc.Balance())
}`,
          hints: [
            'Use pointer receivers `(a *BankAccount)` for `Deposit` and `Withdraw` since they modify the balance.',
            'Use value receivers `(a BankAccount)` for `Balance` and `String` since they only read data.',
            'In `Withdraw`, check both that the amount is positive and that it does not exceed the current balance before subtracting.',
          ],
        },
      },
    ],
  },
];

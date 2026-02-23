import type { DocCategory } from './types';

// Part 5: Standard Library: fmt + strings
export const GO_PART5_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Standard Library: fmt                                        */
  /* ------------------------------------------------------------ */
  {
    id: 'stdlib-fmt',
    label: 'Standard Library: fmt',
    icon: 'Printer',
    entries: [
      {
        id: 'fmt-println',
        title: 'fmt.Println',
        difficulty: 'beginner',
        tags: ['fmt', 'print', 'output', 'newline'],
        signature: 'func Println(a ...any) (n int, err error)',
        cheatSheetSummary:
          'Prints values separated by spaces, followed by a newline. Returns bytes written and error.',
        crossLanguageId: 'print',
        sections: [
          {
            heading: 'Basic Usage',
            content:
              '`fmt.Println` prints its arguments separated by spaces, then adds a newline. It uses the default format for each value. For structs, it prints field values in braces. Returns the number of bytes written and any write error.',
            code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    fmt.Println("Name:", "Alice", "Age:", 30)
    fmt.Println(1, 2.5, true, "mixed types")
    fmt.Println() // just a newline

    // Return values
    n, err := fmt.Println("bytes counted")
    fmt.Println("Wrote", n, "bytes, error:", err)
}`,
            output: `Hello, World!
Name: Alice Age: 30
1 2.5 true mixed types

bytes counted
Wrote 15 bytes, error: <nil>`,
            tip: 'Use `fmt.Println` for quick debugging. For production logging, use the `log` or `slog` package instead.',
            analogy: 'Think of it like a cashier calling out items at a register: each argument is announced with a space between them, and the cashier takes a breath (newline) at the end of each call.',
            codeHighlightLines: [6, 7, 12],
          },
          {
            heading: 'Println vs Print vs Printf',
            content:
              '`Println` adds spaces between arguments and a newline at the end. `Print` adds spaces only between non-string arguments and no trailing newline. `Printf` uses format verbs for precise control.',
            code: `package main

import "fmt"

func main() {
    // Println: spaces between args + newline
    fmt.Println("a", "b", "c")

    // Print: spaces only between non-strings, no newline
    fmt.Print("a", "b", "c")
    fmt.Print("\\n")
    fmt.Print(1, 2, 3)
    fmt.Print("\\n")

    // Printf: formatted output, no auto-newline
    fmt.Printf("Name: %s, Age: %d\\n", "Alice", 30)
}`,
            output: `a b c
abc
1 2 3
Name: Alice, Age: 30`,
            note: '`Print` only adds spaces between non-string operands. `Println` always adds spaces between all operands.',
            analogy: 'Think of it like three different announcers: Println speaks each word with pauses (spaces) and takes a breath at the end (newline), Print runs words together unless they are numbers, and Printf reads from a script (format string) with blanks to fill in.',
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart LR
    A[Arguments] --> B{Which function?}
    B -->|Println| C["spaces + newline"]
    B -->|Print| D["no spaces between strings\\nno newline"]
    B -->|Printf| E["format string controls\\neverything"]`,
              caption: 'Comparison of Print, Println, and Printf behavior',
            },
          },
          {
            heading: 'Printing Complex Types',
            content:
              '`Println` handles all types including structs, slices, maps, and pointers. For structs, `%+v` shows field names and `%#v` shows the Go syntax representation.',
            code: `package main

import "fmt"

type Point struct {
    X, Y float64
}

func main() {
    p := Point{3.0, 4.0}
    s := []int{1, 2, 3}
    m := map[string]int{"a": 1, "b": 2}

    fmt.Println("Struct:", p)
    fmt.Println("Slice:", s)
    fmt.Println("Map:", m)
    fmt.Println("Pointer:", &p)

    // More detail with Printf
    fmt.Printf("%%v:  %v\\n", p)
    fmt.Printf("%%+v: %+v\\n", p)
    fmt.Printf("%%#v: %#v\\n", p)
}`,
            output: `Struct: {3 4}
Slice: [1 2 3]
Map: map[a:1 b:2]
Pointer: &{3 4}
%v:  {3 4}
%+v: {X:3 Y:4}
%#v: main.Point{X:3, Y:4}`,
            tip: 'Use `%+v` to debug structs (shows field names). Use `%#v` to see the full Go syntax representation.',
            codeHighlightLines: [20, 21, 22],
          },
        ],
        quiz: [
          {
            question: 'What does fmt.Println add between its arguments?',
            options: [
              'Nothing -- arguments are concatenated directly',
              'A space between each argument',
              'A comma between each argument',
              'A newline between each argument',
            ],
            correctIndex: 1,
            explanation:
              'fmt.Println separates each argument with a space and adds a trailing newline at the end.',
          },
          {
            question: 'What is the difference between fmt.Print and fmt.Println regarding spaces?',
            options: [
              'Print always adds spaces; Println never does',
              'Print adds spaces only between non-string arguments; Println always adds spaces',
              'Both always add spaces between all arguments',
              'Neither adds spaces between arguments',
            ],
            correctIndex: 1,
            explanation:
              'fmt.Print only adds spaces between non-string operands, while fmt.Println always adds spaces between all operands.',
          },
          {
            question: 'What does fmt.Println return?',
            options: [
              'Nothing (void)',
              'Only an error',
              'The number of bytes written and an error',
              'The formatted string',
            ],
            correctIndex: 2,
            explanation:
              'fmt.Println returns (n int, err error) -- the number of bytes written and any write error encountered.',
          },
        ],
        challenge: {
          prompt:
            'Write a Go program that uses fmt.Println to print a greeting with a name and age, then print the number of bytes written by the Println call.',
          starterCode: `package main

import "fmt"

func main() {
    name := "Alice"
    age := 30
    // TODO: Use fmt.Println to print name and age
    // TODO: Capture and print the number of bytes written
}`,
          solutionCode: `package main

import "fmt"

func main() {
    name := "Alice"
    age := 30
    n, _ := fmt.Println("Name:", name, "Age:", age)
    fmt.Println("Bytes written:", n)
}`,
          hints: [
            'fmt.Println returns two values: the number of bytes written and an error.',
            'Use multiple return value assignment: n, err := fmt.Println(...)',
            'Remember that fmt.Println automatically adds spaces between arguments.',
          ],
        },
      },
      {
        id: 'fmt-printf',
        title: 'fmt.Printf',
        difficulty: 'beginner',
        tags: ['fmt', 'printf', 'format-verbs', 'formatted-output'],
        signature: 'func Printf(format string, a ...any) (n int, err error)',
        cheatSheetSummary:
          'Formatted output with verbs: %d (int), %s (string), %f (float), %v (any), %T (type), %t (bool), %q (quoted string).',
        crossLanguageId: 'printf',
        sections: [
          {
            heading: 'Common Format Verbs',
            content:
              '`fmt.Printf` uses format verbs (like C\'s printf) for precise output control. The most common verbs are `%d` (integer), `%s` (string), `%f` (float), `%v` (default format), `%T` (type), and `%t` (boolean).',
            code: `package main

import "fmt"

func main() {
    name := "Alice"
    age := 30
    score := 95.678
    active := true

    fmt.Printf("String:  %s\\n", name)
    fmt.Printf("Quoted:  %q\\n", name)
    fmt.Printf("Integer: %d\\n", age)
    fmt.Printf("Binary:  %b\\n", age)
    fmt.Printf("Hex:     %x\\n", age)
    fmt.Printf("Octal:   %o\\n", age)
    fmt.Printf("Float:   %f\\n", score)
    fmt.Printf("Sci:     %e\\n", score)
    fmt.Printf("Compact: %g\\n", score)
    fmt.Printf("Bool:    %t\\n", active)
    fmt.Printf("Type:    %T\\n", score)
    fmt.Printf("Any:     %v\\n", []int{1, 2, 3})
    fmt.Printf("Pointer: %p\\n", &age)
}`,
            output: `String:  Alice
Quoted:  "Alice"
Integer: 30
Binary:  11110
Hex:     1e
Octal:   36
Float:   95.678000
Sci:     9.567800e+01
Compact: 95.678
Bool:    true
Type:    float64
Any:     [1 2 3]
Pointer: 0xc0000b6008`,
            tip: '`%v` is the "catch-all" verb that works with any type. Use `%+v` for structs with field names, `%#v` for Go syntax representation.',
            analogy: 'Think of it like a fill-in-the-blank template: the format string is the template with blanks (%s, %d, %f), and the arguments are the values that fill those blanks in order.',
            codeHighlightLines: [11, 13, 17, 21],
            diagram: {
              kind: 'custom' as const,
              type: 'hash-map',
              data: {
                title: 'Common Format Verbs',
                entries: [
                  { key: '%s', value: 'string' },
                  { key: '%d', value: 'integer (decimal)' },
                  { key: '%f', value: 'float' },
                  { key: '%t', value: 'boolean' },
                  { key: '%v', value: 'any (default format)' },
                  { key: '%T', value: 'type name' },
                  { key: '%q', value: 'quoted string' },
                  { key: '%p', value: 'pointer address' },
                ],
              },
              caption: 'Map of format verbs to their purposes',
            },
          },
          {
            heading: 'Width, Precision, and Padding',
            content:
              'Format verbs support width (minimum characters), precision (decimal places), and alignment (left/right padding). Use `-` for left alignment, `0` for zero-padding, and `+` to always show the sign.',
            code: `package main

import "fmt"

func main() {
    // Width and alignment
    fmt.Printf("[%10s]\\n", "right")    // right-aligned, width 10
    fmt.Printf("[%-10s]\\n", "left")     // left-aligned, width 10
    fmt.Printf("[%10d]\\n", 42)          // right-aligned number
    fmt.Printf("[%-10d]\\n", 42)         // left-aligned number

    // Zero padding
    fmt.Printf("[%05d]\\n", 42)          // 00042
    fmt.Printf("[%08.2f]\\n", 3.14)      // 00003.14

    // Precision
    fmt.Printf("%.2f\\n", 3.14159)       // 3.14
    fmt.Printf("%.5f\\n", 3.14159)       // 3.14159
    fmt.Printf("%.3s\\n", "Hello")       // Hel (truncate string)

    // Sign
    fmt.Printf("%+d\\n", 42)             // +42
    fmt.Printf("%+d\\n", -42)            // -42

    // Table formatting
    fmt.Printf("%-15s %5s %10s\\n", "Name", "Age", "Score")
    fmt.Printf("%-15s %5d %10.2f\\n", "Alice", 30, 95.5)
    fmt.Printf("%-15s %5d %10.2f\\n", "Bob", 25, 87.3)
}`,
            output: `[     right]
[left      ]
[        42]
[42        ]
[00042]
[00003.14]
3.14
3.14159
Hel
+42
-42
Name              Age      Score
Alice              30      95.50
Bob                25      87.30`,
            tip: 'Use `*` in the format string to pass width or precision as arguments: `fmt.Printf("%*d", 10, 42)` is the same as `fmt.Printf("%10d", 42)`.',
            codeHighlightLines: [7, 8, 13, 17, 25, 26, 27],
          },
          {
            heading: 'Printf with Structs and Errors',
            content:
              'Printf is essential for debugging structs and formatting error messages. The `%v`, `%+v`, and `%#v` verbs show increasing levels of detail for complex types.',
            code: `package main

import "fmt"

type User struct {
    Name  string
    Email string
    Age   int
}

func (u User) String() string {
    return fmt.Sprintf("%s <%s>", u.Name, u.Email)
}

func main() {
    u := User{Name: "Alice", Email: "alice@example.com", Age: 30}

    // Different verbosity levels
    fmt.Printf("%%v:  %v\\n", u)  // calls String() if defined
    fmt.Printf("%%+v: %+v\\n", u) // shows field names
    fmt.Printf("%%#v: %#v\\n", u) // Go syntax

    // Formatting errors
    err := fmt.Errorf("failed to process user %q (age %d)", u.Name, u.Age)
    fmt.Println(err)

    // Printf returns bytes written
    n, _ := fmt.Printf("Hello %s\\n", u.Name)
    fmt.Printf("(wrote %d bytes)\\n", n)
}`,
            output: `%v:  Alice <alice@example.com>
%+v: {Name:Alice Email:alice@example.com Age:30}
%#v: main.User{Name:"Alice", Email:"alice@example.com", Age:30}
failed to process user "Alice" (age 30)
Hello Alice
(wrote 12 bytes)`,
            note: 'When a type implements `fmt.Stringer` (has a `String()` method), `%v` and `%s` use it. `%+v` and `%#v` bypass `String()` and show the raw struct.',
            analogy: 'Think of it like three zoom levels on a camera: %v is the normal view (uses the type\'s own label if available), %+v zooms in to show labeled parts, and %#v is a technical X-ray showing the full Go-syntax blueprint.',
          },
        ],
        quiz: [
          {
            question: 'Which format verb prints a value in its default format?',
            options: ['%s', '%d', '%v', '%T'],
            correctIndex: 2,
            explanation:
              '%v is the "catch-all" verb that prints any value in its default format. %s is for strings, %d for integers, and %T prints the type name.',
          },
          {
            question: 'What does the format specifier %+v do when applied to a struct?',
            options: [
              'Prints the struct as a JSON object',
              'Prints the struct with field names',
              'Prints only the positive fields',
              'Prints the struct in Go syntax with package name',
            ],
            correctIndex: 1,
            explanation:
              '%+v prints a struct with its field names included, e.g., {Name:Alice Age:30}. Use %#v for full Go syntax representation.',
          },
          {
            question: 'How do you left-align a string in a field of width 10?',
            options: [
              'fmt.Printf("%10s", val)',
              'fmt.Printf("%-10s", val)',
              'fmt.Printf("%<10s", val)',
              'fmt.Printf("%L10s", val)',
            ],
            correctIndex: 1,
            explanation:
              'The - flag causes left-alignment within the field width. Without -, values are right-aligned by default.',
          },
          {
            question: 'What happens when a type implements the String() method and you use %v?',
            options: [
              '%v always shows raw struct fields',
              '%v calls the String() method',
              '%v panics if String() is defined',
              '%v ignores the String() method',
            ],
            correctIndex: 1,
            explanation:
              'When a type implements fmt.Stringer (has a String() method), %v and %s use it. Only %+v and %#v bypass String() to show raw struct data.',
          },
        ],
        challenge: {
          prompt:
            'Write a Go program that defines a Rectangle struct with Width and Height fields, then uses fmt.Printf to print a formatted table showing the rectangle dimensions, area, and perimeter.',
          starterCode: `package main

import "fmt"

type Rectangle struct {
    Width, Height float64
}

func main() {
    rects := []Rectangle{
        {3.0, 4.0},
        {10.5, 2.0},
        {7.0, 7.0},
    }
    // TODO: Print a header line using Printf with left-aligned name, right-aligned width, height, area, perimeter
    // TODO: Loop through rects and print each row formatted with Printf
}`,
          solutionCode: `package main

import "fmt"

type Rectangle struct {
    Width, Height float64
}

func main() {
    rects := []Rectangle{
        {3.0, 4.0},
        {10.5, 2.0},
        {7.0, 7.0},
    }
    fmt.Printf("%-10s %8s %8s %8s %10s\\n", "Name", "Width", "Height", "Area", "Perimeter")
    for i, r := range rects {
        area := r.Width * r.Height
        perim := 2 * (r.Width + r.Height)
        fmt.Printf("%-10s %8.2f %8.2f %8.2f %10.2f\\n",
            fmt.Sprintf("Rect #%d", i+1), r.Width, r.Height, area, perim)
    }
}`,
          hints: [
            'Use %-10s for left-aligned strings and %8.2f for right-aligned floats with 2 decimal places.',
            'Calculate area as Width * Height and perimeter as 2 * (Width + Height).',
            'Use fmt.Sprintf to build the rectangle name string like "Rect #1".',
          ],
        },
      },
      {
        id: 'fmt-sprintf',
        title: 'fmt.Sprintf',
        difficulty: 'beginner',
        tags: ['fmt', 'sprintf', 'format', 'string-formatting'],
        signature: 'func Sprintf(format string, a ...any) string',
        cheatSheetSummary:
          'Returns a formatted string (does not print). Same verbs as Printf. Use for building strings, error messages, log entries.',
        crossLanguageId: 'sprintf',
        sections: [
          {
            heading: 'Building Strings with Sprintf',
            content:
              '`fmt.Sprintf` formats values into a string and returns it, without printing. It uses the same format verbs as `Printf`. Essential for building error messages, log entries, URLs, and any formatted string.',
            code: `package main

import "fmt"

func main() {
    // Build formatted strings
    name := fmt.Sprintf("Hello, %s!", "World")
    fmt.Println(name)

    coord := fmt.Sprintf("(%f, %f)", 37.7749, -122.4194)
    fmt.Println(coord)

    // Build URLs
    url := fmt.Sprintf("https://api.example.com/users/%d?page=%d", 42, 3)
    fmt.Println(url)

    // Format for display
    price := fmt.Sprintf("$%.2f", 19.99)
    fmt.Println(price)

    // Build SQL (for display only -- use prepared statements!)
    query := fmt.Sprintf("SELECT * FROM users WHERE age > %d", 18)
    fmt.Println(query)

    // Padding for alignment
    for i := 1; i <= 5; i++ {
        line := fmt.Sprintf("Item %02d: %s", i, "description")
        fmt.Println(line)
    }
}`,
            output: `Hello, World!
(37.774900, -122.419400)
https://api.example.com/users/42?page=3
$19.99
SELECT * FROM users WHERE age > 18
Item 01: description
Item 02: description
Item 03: description
Item 04: description
Item 05: description`,
            warning: 'Never use `Sprintf` to build SQL queries with user input -- use prepared statements instead to prevent SQL injection.',
            analogy: 'Think of it like a mail merge in a word processor: Sprintf takes a template with placeholder fields and fills them in with your data, giving you back the finished letter (string) without mailing it (printing it).',
            codeHighlightLines: [7, 14, 18],
          },
          {
            heading: 'Sprintf for Error Messages and Logging',
            content:
              '`Sprintf` is the go-to function for creating descriptive error messages and log entries. It is used internally by `fmt.Errorf` for creating errors with context.',
            code: `package main

import (
    "fmt"
    "time"
)

func formatError(op, resource string, id int, err error) string {
    return fmt.Sprintf("[%s] %s %s (id=%d): %v",
        time.Now().Format("15:04:05"), op, resource, id, err)
}

func formatBytes(bytes int64) string {
    switch {
    case bytes >= 1<<30:
        return fmt.Sprintf("%.2f GB", float64(bytes)/(1<<30))
    case bytes >= 1<<20:
        return fmt.Sprintf("%.2f MB", float64(bytes)/(1<<20))
    case bytes >= 1<<10:
        return fmt.Sprintf("%.2f KB", float64(bytes)/(1<<10))
    default:
        return fmt.Sprintf("%d B", bytes)
    }
}

func main() {
    msg := formatError("GET", "user", 42, fmt.Errorf("not found"))
    fmt.Println(msg)

    fmt.Println(formatBytes(1536))
    fmt.Println(formatBytes(2_500_000))
    fmt.Println(formatBytes(3_500_000_000))
}`,
            output: `[10:30:00] GET user (id=42): not found
1.50 KB
2.38 MB
3.26 GB`,
            tip: '`fmt.Sprintf` allocates a new string each time. For high-performance string building in loops, use `strings.Builder` instead.',
            codeHighlightLines: [9, 10, 16, 18, 20],
          },
          {
            heading: 'Sprintf vs Concatenation vs Builder',
            content:
              'Choose the right string construction method: `+` for simple cases, `Sprintf` for formatted output, and `strings.Builder` for loops. Each has different performance characteristics.',
            code: `package main

import (
    "fmt"
    "strings"
)

func main() {
    // Simple concatenation (fine for 2-3 parts)
    s1 := "Hello" + " " + "World"
    fmt.Println(s1)

    // Sprintf (best for formatted values)
    s2 := fmt.Sprintf("User %s (ID: %d, Score: %.1f)", "Alice", 42, 95.5)
    fmt.Println(s2)

    // strings.Builder (best for loops)
    var sb strings.Builder
    for i := 0; i < 5; i++ {
        sb.WriteString(fmt.Sprintf("item_%d", i))
        if i < 4 {
            sb.WriteString(", ")
        }
    }
    fmt.Println(sb.String())

    // strings.Join (best for joining slices)
    parts := []string{"one", "two", "three"}
    s3 := strings.Join(parts, " | ")
    fmt.Println(s3)
}`,
            output: `Hello World
User Alice (ID: 42, Score: 95.5)
item_0, item_1, item_2, item_3, item_4
one | two | three`,
            tip: 'Use `strings.Join` when you have a slice of strings. Use `Sprintf` when you need to format mixed types. Use `Builder` for building strings incrementally in loops.',
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart TD
    A["Need to build a string?"] --> B{"How many parts?"}
    B -->|"2-3 simple parts"| C["Use + concatenation"]
    B -->|"Mixed types / formatting"| D["Use fmt.Sprintf"]
    B -->|"Many parts in a loop"| E["Use strings.Builder"]
    B -->|"Slice of strings"| F["Use strings.Join"]`,
              caption: 'Decision tree for choosing a string construction method',
            },
          },
        ],
        quiz: [
          {
            question: 'What does fmt.Sprintf return?',
            options: [
              'It prints to stdout and returns nothing',
              'It returns a formatted string without printing',
              'It returns an error',
              'It returns the number of bytes written',
            ],
            correctIndex: 1,
            explanation:
              'fmt.Sprintf formats its arguments into a string and returns it, without printing anything to stdout. Use Printf to print, Sprintf to build strings.',
          },
          {
            question: 'Which approach is most efficient for building a string in a loop?',
            options: [
              'Repeated string concatenation with +',
              'fmt.Sprintf on each iteration',
              'strings.Builder with WriteString',
              'fmt.Println to a variable',
            ],
            correctIndex: 2,
            explanation:
              'strings.Builder is the most efficient way to build strings in a loop. It minimizes allocations by growing an internal buffer. + concatenation creates a new string on every iteration.',
          },
          {
            question: 'Why should you never use fmt.Sprintf to build SQL queries with user input?',
            options: [
              'It is too slow for database operations',
              'It does not support %s for strings',
              'It is vulnerable to SQL injection attacks',
              'It cannot handle special characters',
            ],
            correctIndex: 2,
            explanation:
              'Using Sprintf to embed user input in SQL queries creates SQL injection vulnerabilities. Always use prepared statements / parameterized queries instead.',
          },
        ],
        challenge: {
          prompt:
            'Write a function formatBytes that takes an int64 byte count and returns a human-readable string like "1.50 KB", "2.38 MB", or "3.26 GB" using fmt.Sprintf.',
          starterCode: `package main

import "fmt"

func formatBytes(bytes int64) string {
    // TODO: Return human-readable byte string
    // >= 1 GB (1<<30) -> "X.XX GB"
    // >= 1 MB (1<<20) -> "X.XX MB"
    // >= 1 KB (1<<10) -> "X.XX KB"
    // otherwise       -> "X B"
    return ""
}

func main() {
    fmt.Println(formatBytes(500))
    fmt.Println(formatBytes(1536))
    fmt.Println(formatBytes(2_500_000))
    fmt.Println(formatBytes(3_500_000_000))
}`,
          solutionCode: `package main

import "fmt"

func formatBytes(bytes int64) string {
    switch {
    case bytes >= 1<<30:
        return fmt.Sprintf("%.2f GB", float64(bytes)/(1<<30))
    case bytes >= 1<<20:
        return fmt.Sprintf("%.2f MB", float64(bytes)/(1<<20))
    case bytes >= 1<<10:
        return fmt.Sprintf("%.2f KB", float64(bytes)/(1<<10))
    default:
        return fmt.Sprintf("%d B", bytes)
    }
}

func main() {
    fmt.Println(formatBytes(500))
    fmt.Println(formatBytes(1536))
    fmt.Println(formatBytes(2_500_000))
    fmt.Println(formatBytes(3_500_000_000))
}`,
          hints: [
            'Use a switch statement with no condition (switch {}) to check from largest to smallest unit.',
            'Use bit shifts for powers of 2: 1<<10 = 1024 (KB), 1<<20 = 1MB, 1<<30 = 1GB.',
            'Convert bytes to float64 before dividing to get decimal precision.',
          ],
        },
      },
      {
        id: 'fmt-scanf',
        title: 'fmt.Scanf',
        difficulty: 'beginner',
        tags: ['fmt', 'scanf', 'input', 'scan', 'stdin'],
        signature: 'func Scanf(format string, a ...any) (n int, err error)',
        cheatSheetSummary:
          'Reads formatted input from stdin. `Scan` for whitespace-separated, `Scanf` for formatted, `Scanln` for line-based.',
        crossLanguageId: 'scanf',
        sections: [
          {
            heading: 'Reading Input',
            content:
              '`fmt.Scan` reads whitespace-separated values from stdin. `fmt.Scanf` reads formatted input matching a format string. `fmt.Scanln` stops at a newline. All store into pointers and return the number of items scanned.',
            code: `package main

import "fmt"

func main() {
    // fmt.Scan: reads whitespace-separated values
    var name string
    var age int
    fmt.Print("Enter name and age: ")
    // fmt.Scan(&name, &age)

    // fmt.Scanf: formatted input
    // fmt.Scanf("%s %d", &name, &age)

    // fmt.Scanln: reads until newline
    // fmt.Scanln(&name)

    // Simulated for demonstration
    name = "Alice"
    age = 30
    fmt.Printf("Name: %s, Age: %d\\n", name, age)

    // Sscan: scan from a string (useful for parsing)
    var x, y int
    n, err := fmt.Sscan("10 20", &x, &y)
    fmt.Printf("Scanned %d values: x=%d, y=%d (err: %v)\\n", n, x, y, err)

    // Sscanf: formatted scan from string
    var host string
    var port int
    fmt.Sscanf("localhost:8080", "%s", &host)
    fmt.Sscanf("port=8080", "port=%d", &port)
    fmt.Printf("Port: %d\\n", port)
}`,
            output: `Enter name and age: Name: Alice, Age: 30
Scanned 2 values: x=10, y=20 (err: <nil>)
Port: 8080`,
            tip: 'For real applications, prefer `bufio.Scanner` over `fmt.Scan` for reading input. It handles edge cases better and is more efficient for large inputs.',
            analogy: 'Think of it like filling out a form: Scan reads values you write in any blanks separated by spaces, Scanf matches a specific form layout, and Scanln reads everything you write on one line.',
          },
          {
            heading: 'Sscan and Sscanf for String Parsing',
            content:
              '`fmt.Sscan` and `fmt.Sscanf` read from strings instead of stdin. They are useful for parsing structured text data without external libraries.',
            code: `package main

import "fmt"

func main() {
    // Parse coordinates
    var lat, lon float64
    fmt.Sscanf("37.7749,-122.4194", "%f,%f", &lat, &lon)
    fmt.Printf("Location: (%.4f, %.4f)\\n", lat, lon)

    // Parse key=value pairs
    var key, value string
    fmt.Sscanf("name=Alice", "%[^=]=%s", &key, &value)
    fmt.Printf("Key: %s, Value: %s\\n", key, value)

    // Parse log line
    var level, msg string
    var code int
    line := "ERROR 500 Internal Server Error"
    fmt.Sscanf(line, "%s %d", &level, &code)
    fmt.Printf("Level: %s, Code: %d\\n", level, code)

    // Multiple values from formatted string
    var r, g, b int
    fmt.Sscanf("#FF8C00", "#%02X%02X%02X", &r, &g, &b)
    fmt.Printf("RGB: (%d, %d, %d)\\n", r, g, b)
}`,
            output: `Location: (37.7749, -122.4194)
Key: name, Value: Alice
Level: ERROR, Code: 500
RGB: (255, 140, 0)`,
            note: '`Sscanf` follows C scanf conventions. The `%[^=]` pattern reads until the `=` character. `%02X` reads a two-digit hexadecimal number.',
            codeHighlightLines: [8, 13, 20, 25],
          },
          {
            heading: 'Interactive Input with bufio',
            content:
              'For interactive programs and larger inputs, use `bufio.Scanner` which is more robust than `fmt.Scan`. It handles newlines correctly and supports custom split functions.',
            code: `package main

import (
    "bufio"
    "fmt"
    "os"
    "strings"
)

func main() {
    // bufio.Scanner for line-by-line input
    scanner := bufio.NewScanner(strings.NewReader(
        "Alice\\nBob\\nCharlie\\n"))

    var names []string
    for scanner.Scan() {
        line := scanner.Text()
        if line == "" {
            break
        }
        names = append(names, line)
    }
    fmt.Println("Names:", names)

    // bufio.Reader for prompted input
    reader := bufio.NewReader(os.Stdin)
    fmt.Print("Enter text: ")
    // text, _ := reader.ReadString('\\n')
    // text = strings.TrimSpace(text)
    _ = reader // suppress unused warning
    fmt.Println("(interactive input would go here)")
}`,
            output: `Names: [Alice Bob Charlie]
Enter text: (interactive input would go here)`,
            tip: '`bufio.Scanner` with `ScanWords` is the fastest way to read whitespace-separated tokens. Set `scanner.Buffer(buf, maxSize)` for large inputs.',
            codeHighlightLines: [12, 13, 16, 17],
          },
        ],
        quiz: [
          {
            question: 'What is the difference between fmt.Scan and fmt.Scanf?',
            options: [
              'Scan reads formatted input; Scanf reads raw bytes',
              'Scan reads whitespace-separated values; Scanf uses a format string to match input',
              'Scan reads from files; Scanf reads from stdin',
              'Scan returns a string; Scanf returns an int',
            ],
            correctIndex: 1,
            explanation:
              'fmt.Scan reads whitespace-separated values from stdin and infers their types. fmt.Scanf uses a format string with verbs (like %d, %s) to match and parse specific patterns in the input.',
          },
          {
            question: 'What does fmt.Sscanf do?',
            options: [
              'Writes formatted output to a string',
              'Reads formatted input from stdin',
              'Reads formatted input from a string (not stdin)',
              'Scans a file for a pattern',
            ],
            correctIndex: 2,
            explanation:
              'fmt.Sscanf reads from a string instead of stdin. It parses the string according to a format string and stores the results in the provided pointer arguments.',
          },
          {
            question: 'Why is bufio.Scanner preferred over fmt.Scan for real applications?',
            options: [
              'bufio.Scanner is faster and handles edge cases like newlines better',
              'fmt.Scan does not work on all operating systems',
              'bufio.Scanner supports format verbs',
              'fmt.Scan cannot read strings',
            ],
            correctIndex: 0,
            explanation:
              'bufio.Scanner is more robust for real applications because it handles newlines correctly, supports custom split functions, and is more efficient for large inputs.',
          },
        ],
        challenge: {
          prompt:
            'Write a Go program that uses fmt.Sscanf to parse a log line in the format "LEVEL CODE Message" (e.g., "ERROR 500 Internal Server Error") and extract the level and status code.',
          starterCode: `package main

import "fmt"

func parseLogLine(line string) (string, int) {
    // TODO: Use fmt.Sscanf to extract the level (string) and code (int) from the line
    return "", 0
}

func main() {
    lines := []string{
        "ERROR 500 Internal Server Error",
        "INFO 200 OK",
        "WARN 404 Not Found",
    }
    for _, line := range lines {
        level, code := parseLogLine(line)
        fmt.Printf("Level: %-5s Code: %d\\n", level, code)
    }
}`,
          solutionCode: `package main

import "fmt"

func parseLogLine(line string) (string, int) {
    var level string
    var code int
    fmt.Sscanf(line, "%s %d", &level, &code)
    return level, code
}

func main() {
    lines := []string{
        "ERROR 500 Internal Server Error",
        "INFO 200 OK",
        "WARN 404 Not Found",
    }
    for _, line := range lines {
        level, code := parseLogLine(line)
        fmt.Printf("Level: %-5s Code: %d\\n", level, code)
    }
}`,
          hints: [
            'fmt.Sscanf takes a source string, a format string, and pointers to variables to store the parsed values.',
            'Use %s to match a whitespace-delimited string and %d to match an integer.',
            'Remember that Sscanf arguments must be pointers (use & operator).',
          ],
        },
      },
      {
        id: 'fmt-errorf',
        title: 'fmt.Errorf',
        difficulty: 'beginner',
        tags: ['fmt', 'errorf', 'error', 'wrapping', '%w'],
        signature: 'func Errorf(format string, a ...any) error',
        cheatSheetSummary:
          'Creates formatted errors. Use `%w` to wrap errors (enables errors.Is/As). Use `%v` for non-wrapping context.',
        crossLanguageId: 'errorf',
        sections: [
          {
            heading: 'Creating Formatted Errors',
            content:
              '`fmt.Errorf` creates a new error with a formatted message. Use `%w` to wrap an existing error, preserving the chain for `errors.Is()` and `errors.As()`. Use `%v` to include an error\'s text without wrapping it.',
            code: `package main

import (
    "errors"
    "fmt"
    "os"
)

func readConfig(path string) error {
    _, err := os.ReadFile(path)
    if err != nil {
        return fmt.Errorf("reading config %q: %w", path, err)
    }
    return nil
}

func startApp() error {
    if err := readConfig("/etc/app.conf"); err != nil {
        return fmt.Errorf("starting app: %w", err)
    }
    return nil
}

func main() {
    err := startApp()
    if err != nil {
        fmt.Println("Error:", err)

        // %w preserves the chain
        if errors.Is(err, os.ErrNotExist) {
            fmt.Println("File does not exist")
        }
    }
}`,
            output: `Error: starting app: reading config "/etc/app.conf": open /etc/app.conf: no such file or directory
File does not exist`,
            tip: 'Use `%w` (not `%v`) when you want callers to inspect the underlying error with `errors.Is()` or `errors.As()`.',
            codeHighlightLines: [12, 19],
            analogy: 'Think of it like wrapping a gift box inside larger boxes: each layer of %w wrapping adds context, but you can always unwrap to find the original error inside.',
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart LR
    A["os.ErrNotExist"] -->|"wrapped by %w"| B["reading config: %w"]
    B -->|"wrapped by %w"| C["starting app: %w"]
    C -->|"errors.Is()"| A`,
              caption: 'Error wrapping chain with %w preserves the ability to unwrap',
            },
          },
          {
            heading: 'Errorf Patterns',
            content:
              'Common `Errorf` patterns include adding function/operation context, including relevant data, and creating structured error messages for debugging.',
            code: `package main

import (
    "errors"
    "fmt"
)

var ErrNotFound = errors.New("not found")

func getUser(id int) (string, error) {
    if id != 1 {
        return "", fmt.Errorf("getUser(id=%d): %w", id, ErrNotFound)
    }
    return "Alice", nil
}

func processRequest(userID int) error {
    user, err := getUser(userID)
    if err != nil {
        return fmt.Errorf("processRequest: %w", err)
    }
    fmt.Println("Processing for", user)
    return nil
}

func main() {
    // Error chain with context
    err := processRequest(42)
    fmt.Println(err)
    fmt.Println("Is NotFound:", errors.Is(err, ErrNotFound))

    // Multiple %w (Go 1.20+)
    err1 := errors.New("database error")
    err2 := errors.New("network error")
    combined := fmt.Errorf("multiple failures: %w and %w", err1, err2)
    fmt.Println(combined)
    fmt.Println("Has db error:", errors.Is(combined, err1))
    fmt.Println("Has net error:", errors.Is(combined, err2))
}`,
            output: `processRequest: getUser(id=42): not found
Is NotFound: true
multiple failures: database error and network error
Has db error: true
Has net error: true`,
            note: 'Go 1.20+ supports multiple `%w` verbs in a single `Errorf` call. Both wrapped errors are searchable with `errors.Is()`.',
            codeHighlightLines: [12, 20, 36],
          },
        ],
        quiz: [
          {
            question: 'What is the difference between using %w and %v when wrapping errors in fmt.Errorf?',
            options: [
              '%w and %v behave identically for errors',
              '%w preserves the error chain for errors.Is/As; %v only includes the text',
              '%v preserves the error chain; %w only includes the text',
              '%w is for warnings and %v is for verbose errors',
            ],
            correctIndex: 1,
            explanation:
              '%w wraps the error so that errors.Is() and errors.As() can inspect the underlying error. %v only includes the error message text without preserving the chain.',
          },
          {
            question: 'What does errors.Is(err, target) do?',
            options: [
              'Checks if err and target have the same message string',
              'Checks if err is exactly the same pointer as target',
              'Checks if err or any error in its chain matches target',
              'Checks if err was created by fmt.Errorf',
            ],
            correctIndex: 2,
            explanation:
              'errors.Is() unwraps the error chain and checks each error for a match with the target. This works because %w preserves the wrapping chain.',
          },
          {
            question: 'What feature was added in Go 1.20 for fmt.Errorf?',
            options: [
              'The %w verb was introduced',
              'Support for multiple %w verbs in a single Errorf call',
              'The ability to wrap non-error types',
              'Automatic stack traces in errors',
            ],
            correctIndex: 1,
            explanation:
              'Go 1.20 added support for multiple %w verbs in a single fmt.Errorf call, allowing an error to wrap multiple underlying errors simultaneously.',
          },
        ],
        challenge: {
          prompt:
            'Write a Go program that defines a sentinel error ErrInvalidAge, then writes a validateAge function that returns a wrapped error using fmt.Errorf with %w. In main, use errors.Is to check for the sentinel error.',
          starterCode: `package main

import (
    "errors"
    "fmt"
)

// TODO: Define a sentinel error ErrInvalidAge

func validateAge(age int) error {
    // TODO: If age < 0 or age > 150, return a wrapped error with context using fmt.Errorf and %w
    return nil
}

func main() {
    err := validateAge(-5)
    if err != nil {
        fmt.Println("Error:", err)
        // TODO: Use errors.Is to check if the error is ErrInvalidAge
    }
}`,
          solutionCode: `package main

import (
    "errors"
    "fmt"
)

var ErrInvalidAge = errors.New("invalid age")

func validateAge(age int) error {
    if age < 0 || age > 150 {
        return fmt.Errorf("validateAge(%d): %w", age, ErrInvalidAge)
    }
    return nil
}

func main() {
    err := validateAge(-5)
    if err != nil {
        fmt.Println("Error:", err)
        if errors.Is(err, ErrInvalidAge) {
            fmt.Println("Caught invalid age error!")
        }
    }
}`,
          hints: [
            'Use errors.New("invalid age") to create a sentinel error variable.',
            'Use fmt.Errorf("context: %w", sentinelError) to wrap the error with context.',
            'errors.Is(err, target) returns true if target appears anywhere in the error chain.',
          ],
        },
      },
      {
        id: 'fmt-stringer',
        title: 'fmt.Stringer Interface',
        difficulty: 'beginner',
        tags: ['fmt', 'stringer', 'string-method', 'interface'],
        signature: 'type Stringer interface { String() string }',
        cheatSheetSummary:
          'Implement `String() string` on your type. Used by Println, Printf(%v/%s), and Sprintf automatically.',
        crossLanguageId: 'tostring',
        sections: [
          {
            heading: 'The Stringer Interface',
            content:
              'The `fmt.Stringer` interface requires a single `String() string` method. When a type implements it, `fmt.Println`, `%v`, and `%s` automatically use it. This is Go\'s equivalent of `toString()` in other languages.',
            code: `package main

import "fmt"

type Color struct {
    R, G, B uint8
}

func (c Color) String() string {
    return fmt.Sprintf("rgb(%d, %d, %d)", c.R, c.G, c.B)
}

type IPAddr [4]byte

func (ip IPAddr) String() string {
    return fmt.Sprintf("%d.%d.%d.%d", ip[0], ip[1], ip[2], ip[3])
}

func main() {
    red := Color{255, 0, 0}
    fmt.Println(red)           // uses String()
    fmt.Printf("Color: %s\\n", red) // uses String()
    fmt.Printf("Raw:   %v\\n", red) // uses String()
    fmt.Printf("Go:    %#v\\n", red) // bypasses String()

    ip := IPAddr{192, 168, 1, 1}
    fmt.Println("IP:", ip)
}`,
            output: `rgb(255, 0, 0)
Color: rgb(255, 0, 0)
Raw:   rgb(255, 0, 0)
Go:    main.Color{R:0xff, G:0x0, B:0x0}
IP: 192.168.1.1`,
            tip: 'Implement `String()` on all domain types for better debugging and logging. It costs little effort and improves error messages dramatically.',
            analogy: 'Think of it like giving your type a name tag: whenever someone (fmt) asks "who are you?", the String() method is the answer. Without it, they just describe your appearance (raw field values).',
            codeHighlightLines: [9, 10, 15, 16],
            diagram: {
              kind: 'mermaid' as const,
              code: `classDiagram
    class Stringer {
        <<interface>>
        +String() string
    }
    class Color {
        +R uint8
        +G uint8
        +B uint8
        +String() string
    }
    class IPAddr {
        +String() string
    }
    Stringer <|.. Color
    Stringer <|.. IPAddr`,
              caption: 'The fmt.Stringer interface and types that implement it',
            },
          },
          {
            heading: 'Stringer for Enums',
            content:
              'The `String()` method is especially useful for enum-like constants. Combined with `iota`, it gives human-readable names to numeric constants.',
            code: `package main

import "fmt"

type Weekday int

const (
    Sunday Weekday = iota
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
)

func (d Weekday) String() string {
    names := [...]string{
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday",
    }
    if d < Sunday || d > Saturday {
        return fmt.Sprintf("Weekday(%d)", int(d))
    }
    return names[d]
}

type LogLevel int

const (
    DEBUG LogLevel = iota
    INFO
    WARN
    ERROR
)

func (l LogLevel) String() string {
    switch l {
    case DEBUG:
        return "DEBUG"
    case INFO:
        return "INFO"
    case WARN:
        return "WARN"
    case ERROR:
        return "ERROR"
    default:
        return fmt.Sprintf("LogLevel(%d)", int(l))
    }
}

func main() {
    day := Wednesday
    fmt.Println("Today is", day)
    fmt.Printf("Day number: %d\\n", day)

    level := WARN
    fmt.Printf("[%s] Something happened\\n", level)
}`,
            output: `Today is Wednesday
Day number: 3
[WARN] Something happened`,
            tip: 'Use `go generate` with the `stringer` tool to automatically generate `String()` methods for enum constants: `//go:generate stringer -type=Weekday`.',
            codeHighlightLines: [7, 8, 9, 10, 11, 17, 18],
            analogy: 'Think of it like a translator for codes: without String(), the Weekday type only knows its number (3), but the String() method translates it into the human-readable name (Wednesday).',
          },
        ],
        quiz: [
          {
            question: 'What interface must a type implement to customize how it is printed by fmt.Println?',
            options: [
              'fmt.Printer',
              'fmt.Stringer',
              'fmt.Formatter',
              'fmt.Writer',
            ],
            correctIndex: 1,
            explanation:
              'The fmt.Stringer interface requires a String() string method. When implemented, fmt.Println, %v, and %s automatically use it.',
          },
          {
            question: 'Which format verb bypasses the String() method and shows raw struct fields in Go syntax?',
            options: ['%v', '%s', '%+v', '%#v'],
            correctIndex: 3,
            explanation:
              '%#v shows the Go syntax representation of a value, bypassing the String() method. %v and %s use String() if available, and %+v also bypasses it to show field names.',
          },
          {
            question: 'How can you automatically generate String() methods for enum constants?',
            options: [
              'Use the reflect package at runtime',
              'Use go generate with the stringer tool',
              'Use a special comment syntax',
              'The compiler generates them automatically',
            ],
            correctIndex: 1,
            explanation:
              'The stringer tool (go generate stringer -type=TypeName) automatically generates String() methods for enum-like constants defined with iota.',
          },
        ],
        challenge: {
          prompt:
            'Define a Direction type using iota (North, South, East, West) and implement the fmt.Stringer interface so that printing a Direction value shows its name instead of its number.',
          starterCode: `package main

import "fmt"

type Direction int

const (
    // TODO: Define North, South, East, West using iota
    North Direction = iota
)

// TODO: Implement the String() method for Direction

func main() {
    dirs := []Direction{North, South, East, West}
    for _, d := range dirs {
        fmt.Printf("Direction: %v (value: %d)\\n", d, d)
    }
}`,
          solutionCode: `package main

import "fmt"

type Direction int

const (
    North Direction = iota
    South
    East
    West
)

func (d Direction) String() string {
    names := [...]string{"North", "South", "East", "West"}
    if d < North || d > West {
        return fmt.Sprintf("Direction(%d)", int(d))
    }
    return names[d]
}

func main() {
    dirs := []Direction{North, South, East, West}
    for _, d := range dirs {
        fmt.Printf("Direction: %v (value: %d)\\n", d, d)
    }
}`,
          hints: [
            'Use iota to define sequential constants: South, East, and West follow North automatically.',
            'The String() method should return the human-readable name for each Direction value.',
            'Use an array literal [...]string{...} indexed by the Direction value for efficient lookup.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Standard Library: strings                                    */
  /* ------------------------------------------------------------ */
  {
    id: 'stdlib-strings',
    label: 'Standard Library: strings',
    icon: 'Text',
    entries: [
      {
        id: 'strings-contains',
        title: 'strings.Contains',
        difficulty: 'beginner',
        tags: ['strings', 'contains', 'substring', 'search'],
        signature: 'func Contains(s, substr string) bool',
        cheatSheetSummary:
          'Returns true if `substr` is within `s`. Case-sensitive. Use `strings.EqualFold` for case-insensitive comparison.',
        sections: [
          {
            heading: 'Checking for Substrings',
            content:
              '`strings.Contains` checks if a string contains a substring. It is case-sensitive. For case-insensitive checks, convert both strings with `ToLower` or use `strings.EqualFold`.',
            code: `package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "Hello, World!"

    fmt.Println(strings.Contains(s, "World"))     // true
    fmt.Println(strings.Contains(s, "world"))     // false (case-sensitive)
    fmt.Println(strings.Contains(s, ""))          // true (empty is always contained)

    // Case-insensitive check
    fmt.Println(strings.Contains(
        strings.ToLower(s), strings.ToLower("WORLD"))) // true

    // ContainsAny: checks if any character in chars is in s
    fmt.Println(strings.ContainsAny(s, "xyz"))     // false
    fmt.Println(strings.ContainsAny(s, "aeiou"))   // true (e, o)

    // ContainsRune
    fmt.Println(strings.ContainsRune(s, 'W'))      // true
}`,
            output: `true
false
true
true
false
true
true`,
            tip: 'For repeated substring searches, consider `strings.Index` which returns the position, or compile a `regexp` for complex patterns.',
            analogy: 'Think of it like using Ctrl+F in a document: Contains checks if the search term appears anywhere in the text, returning a simple yes or no.',
            codeHighlightLines: [11, 12, 16, 17],
          },
        ],
        quiz: [
          {
            question: 'Is strings.Contains case-sensitive?',
            options: [
              'No, it is always case-insensitive',
              'Yes, it is case-sensitive',
              'It depends on the locale',
              'Only for ASCII characters',
            ],
            correctIndex: 1,
            explanation:
              'strings.Contains is case-sensitive. "World" and "world" are considered different. Use strings.ToLower on both strings or strings.EqualFold for case-insensitive comparison.',
          },
          {
            question: 'What does strings.Contains(s, "") return?',
            options: [
              'false',
              'true',
              'It panics',
              'It returns an error',
            ],
            correctIndex: 1,
            explanation:
              'An empty string is always considered to be contained within any string, so strings.Contains(s, "") always returns true.',
          },
          {
            question: 'What does strings.ContainsAny(s, chars) check?',
            options: [
              'If s contains the entire chars string as a substring',
              'If s contains any single character from the chars string',
              'If all characters in chars are in s',
              'If s and chars are equal',
            ],
            correctIndex: 1,
            explanation:
              'strings.ContainsAny checks whether any Unicode code point in the chars string is present in s. It treats chars as a set of individual characters, not as a substring.',
          },
        ],
        challenge: {
          prompt:
            'Write a function filterStrings that takes a slice of strings and a search term, and returns a new slice containing only the strings that contain the search term (case-insensitive).',
          starterCode: `package main

import (
    "fmt"
    "strings"
)

func filterStrings(items []string, search string) []string {
    // TODO: Return only items that contain the search term (case-insensitive)
    return nil
}

func main() {
    items := []string{"Hello World", "Goodbye", "hello there", "HELLO", "world peace"}
    result := filterStrings(items, "hello")
    fmt.Println(result)
}`,
          solutionCode: `package main

import (
    "fmt"
    "strings"
)

func filterStrings(items []string, search string) []string {
    var result []string
    lowerSearch := strings.ToLower(search)
    for _, item := range items {
        if strings.Contains(strings.ToLower(item), lowerSearch) {
            result = append(result, item)
        }
    }
    return result
}

func main() {
    items := []string{"Hello World", "Goodbye", "hello there", "HELLO", "world peace"}
    result := filterStrings(items, "hello")
    fmt.Println(result)
}`,
          hints: [
            'Use strings.ToLower on both the item and the search term before calling strings.Contains.',
            'Build a result slice using append to collect matching items.',
            'Convert the search term to lowercase once before the loop for efficiency.',
          ],
        },
      },
      {
        id: 'strings-hasprefix',
        title: 'strings.HasPrefix',
        difficulty: 'beginner',
        tags: ['strings', 'prefix', 'startswith'],
        signature: 'func HasPrefix(s, prefix string) bool',
        cheatSheetSummary:
          'Returns true if `s` starts with `prefix`. Commonly used for URL routing, file type checking, and command parsing.',
        sections: [
          {
            heading: 'Checking String Prefixes',
            content:
              '`strings.HasPrefix` tests whether a string starts with a given prefix. It is efficient (no allocation) and commonly used for URL routing, protocol detection, and command parsing.',
            code: `package main

import (
    "fmt"
    "strings"
)

func main() {
    // Basic usage
    fmt.Println(strings.HasPrefix("golang", "go"))   // true
    fmt.Println(strings.HasPrefix("golang", "Go"))   // false
    fmt.Println(strings.HasPrefix("", ""))            // true

    // Practical: URL protocol detection
    urls := []string{
        "https://example.com",
        "http://example.com",
        "ftp://files.example.com",
        "/local/path",
    }
    for _, url := range urls {
        switch {
        case strings.HasPrefix(url, "https://"):
            fmt.Printf("HTTPS: %s\\n", url)
        case strings.HasPrefix(url, "http://"):
            fmt.Printf("HTTP:  %s\\n", url)
        case strings.HasPrefix(url, "/"):
            fmt.Printf("Local: %s\\n", url)
        default:
            fmt.Printf("Other: %s\\n", url)
        }
    }

    // Trim prefix (Go 1.1+)
    path := "/api/v2/users"
    trimmed := strings.TrimPrefix(path, "/api/v2")
    fmt.Println("Trimmed:", trimmed)
}`,
            output: `true
false
true
HTTPS: https://example.com
HTTP:  http://example.com
Other: ftp://files.example.com
Local: /local/path
Trimmed: /users`,
            tip: 'Use `strings.TrimPrefix` to remove a known prefix. Unlike manual slicing, it does nothing if the prefix is not present, avoiding bounds errors.',
            codeHighlightLines: [23, 25, 27],
            analogy: 'Think of it like checking the area code of a phone number: HasPrefix looks at the beginning of the string to determine what category it belongs to.',
          },
        ],
        quiz: [
          {
            question: 'Is strings.HasPrefix case-sensitive?',
            options: [
              'No, it ignores case',
              'Yes, it is case-sensitive',
              'Only for the first character',
              'It depends on the platform',
            ],
            correctIndex: 1,
            explanation:
              'strings.HasPrefix is case-sensitive. "golang" has the prefix "go" but not "Go". Convert both to the same case first if you need case-insensitive matching.',
          },
          {
            question: 'What does strings.TrimPrefix do if the prefix is not present?',
            options: [
              'It panics',
              'It returns an empty string',
              'It returns the original string unchanged',
              'It returns an error',
            ],
            correctIndex: 2,
            explanation:
              'strings.TrimPrefix returns the string unchanged if it does not start with the given prefix. This makes it safe to use without checking HasPrefix first.',
          },
          {
            question: 'Which is the best way to detect the protocol of a URL string?',
            options: [
              'Use strings.Split on "://"',
              'Use strings.HasPrefix with protocol prefixes',
              'Use strings.Index to find ":"',
              'Use strings.Contains with "http"',
            ],
            correctIndex: 1,
            explanation:
              'strings.HasPrefix is efficient and readable for detecting URL protocols. It checks the beginning of the string without any allocation or splitting.',
          },
        ],
        challenge: {
          prompt:
            'Write a function classifyURL that takes a URL string and returns its protocol type: "https", "http", "ftp", or "unknown". Use strings.HasPrefix and strings.TrimPrefix.',
          starterCode: `package main

import (
    "fmt"
    "strings"
)

func classifyURL(url string) (protocol, rest string) {
    // TODO: Use strings.HasPrefix to detect the protocol
    // TODO: Use strings.TrimPrefix to extract the rest of the URL
    return "unknown", url
}

func main() {
    urls := []string{
        "https://example.com/path",
        "http://example.com",
        "ftp://files.example.com/file.txt",
        "example.com",
    }
    for _, url := range urls {
        proto, rest := classifyURL(url)
        fmt.Printf("Protocol: %-7s Rest: %s\\n", proto, rest)
    }
}`,
          solutionCode: `package main

import (
    "fmt"
    "strings"
)

func classifyURL(url string) (protocol, rest string) {
    switch {
    case strings.HasPrefix(url, "https://"):
        return "https", strings.TrimPrefix(url, "https://")
    case strings.HasPrefix(url, "http://"):
        return "http", strings.TrimPrefix(url, "http://")
    case strings.HasPrefix(url, "ftp://"):
        return "ftp", strings.TrimPrefix(url, "ftp://")
    default:
        return "unknown", url
    }
}

func main() {
    urls := []string{
        "https://example.com/path",
        "http://example.com",
        "ftp://files.example.com/file.txt",
        "example.com",
    }
    for _, url := range urls {
        proto, rest := classifyURL(url)
        fmt.Printf("Protocol: %-7s Rest: %s\\n", proto, rest)
    }
}`,
          hints: [
            'Use a switch statement with no condition to check multiple prefixes.',
            'strings.TrimPrefix removes the prefix and returns the rest of the string.',
            'Return "unknown" and the original URL if no known prefix matches.',
          ],
        },
      },
      {
        id: 'strings-hassuffix',
        title: 'strings.HasSuffix',
        difficulty: 'beginner',
        tags: ['strings', 'suffix', 'endswith', 'extension'],
        signature: 'func HasSuffix(s, suffix string) bool',
        cheatSheetSummary:
          'Returns true if `s` ends with `suffix`. Useful for file extension checking, URL path matching.',
        sections: [
          {
            heading: 'Checking String Suffixes',
            content:
              '`strings.HasSuffix` tests whether a string ends with a given suffix. Commonly used for file extension checking, URL path matching, and output formatting.',
            code: `package main

import (
    "fmt"
    "strings"
)

func main() {
    // Basic usage
    fmt.Println(strings.HasSuffix("image.png", ".png"))   // true
    fmt.Println(strings.HasSuffix("image.png", ".jpg"))   // false

    // File type detection
    files := []string{
        "report.pdf", "photo.jpg", "data.csv",
        "script.go", "style.css", "readme.md",
    }
    for _, f := range files {
        switch {
        case strings.HasSuffix(f, ".go"):
            fmt.Printf("Go source:  %s\\n", f)
        case strings.HasSuffix(f, ".pdf"):
            fmt.Printf("PDF doc:    %s\\n", f)
        case strings.HasSuffix(f, ".jpg"), strings.HasSuffix(f, ".png"):
            fmt.Printf("Image:      %s\\n", f)
        default:
            fmt.Printf("Other:      %s\\n", f)
        }
    }

    // TrimSuffix
    name := strings.TrimSuffix("report.pdf", ".pdf")
    fmt.Println("Name without ext:", name)
}`,
            output: `true
false
PDF doc:    report.pdf
Image:      photo.jpg
Other:      data.csv
Go source:  script.go
Other:      style.css
Other:      readme.md
Name without ext: report`,
            tip: 'For file extensions, prefer `path.Ext()` or `filepath.Ext()` from the standard library. They handle edge cases like multiple dots correctly.',
            codeHighlightLines: [10, 20, 22, 24],
          },
        ],
        quiz: [
          {
            question: 'What is the recommended way to check file extensions in Go?',
            options: [
              'Use strings.HasSuffix with the extension',
              'Use path.Ext() or filepath.Ext() from the standard library',
              'Use strings.Split and check the last element',
              'Use regular expressions',
            ],
            correctIndex: 1,
            explanation:
              'While strings.HasSuffix works for simple cases, path.Ext() and filepath.Ext() handle edge cases like multiple dots correctly and are the recommended approach for file extensions.',
          },
          {
            question: 'What does strings.TrimSuffix("hello.tar.gz", ".gz") return?',
            options: [
              '"hello"',
              '"hello.tar"',
              '"hello.tar.gz"',
              '".gz"',
            ],
            correctIndex: 1,
            explanation:
              'strings.TrimSuffix only removes the exact suffix provided. It removes ".gz" from the end, leaving "hello.tar".',
          },
        ],
        challenge: {
          prompt:
            'Write a function getFileType that takes a filename and returns its type: "image", "document", "code", or "other" based on the file extension using strings.HasSuffix.',
          starterCode: `package main

import (
    "fmt"
    "strings"
)

func getFileType(filename string) string {
    // TODO: Return "image" for .jpg, .png, .gif
    // TODO: Return "document" for .pdf, .doc, .txt
    // TODO: Return "code" for .go, .js, .py
    // TODO: Return "other" for anything else
    return "other"
}

func main() {
    files := []string{"photo.jpg", "main.go", "report.pdf", "data.csv", "icon.png", "app.js"}
    for _, f := range files {
        fmt.Printf("%-12s -> %s\\n", f, getFileType(f))
    }
}`,
          solutionCode: `package main

import (
    "fmt"
    "strings"
)

func getFileType(filename string) string {
    switch {
    case strings.HasSuffix(filename, ".jpg"),
        strings.HasSuffix(filename, ".png"),
        strings.HasSuffix(filename, ".gif"):
        return "image"
    case strings.HasSuffix(filename, ".pdf"),
        strings.HasSuffix(filename, ".doc"),
        strings.HasSuffix(filename, ".txt"):
        return "document"
    case strings.HasSuffix(filename, ".go"),
        strings.HasSuffix(filename, ".js"),
        strings.HasSuffix(filename, ".py"):
        return "code"
    default:
        return "other"
    }
}

func main() {
    files := []string{"photo.jpg", "main.go", "report.pdf", "data.csv", "icon.png", "app.js"}
    for _, f := range files {
        fmt.Printf("%-12s -> %s\\n", f, getFileType(f))
    }
}`,
          hints: [
            'Use a switch statement with multiple case conditions for each file type category.',
            'Multiple conditions in a single case are separated by commas in Go.',
            'strings.HasSuffix is case-sensitive, so ".jpg" will not match ".JPG".',
          ],
        },
      },
      {
        id: 'strings-join',
        title: 'strings.Join',
        difficulty: 'beginner',
        tags: ['strings', 'join', 'concatenate', 'separator'],
        signature: 'func Join(elems []string, sep string) string',
        cheatSheetSummary:
          'Joins a string slice with a separator: `strings.Join([]string{"a","b","c"}, ", ")` returns `"a, b, c"`.',
        sections: [
          {
            heading: 'Joining Strings',
            content:
              '`strings.Join` concatenates elements of a string slice with a separator between each element. It is efficient (single allocation) and the idiomatic way to build delimited strings.',
            code: `package main

import (
    "fmt"
    "strings"
)

func main() {
    words := []string{"Go", "is", "awesome"}
    fmt.Println(strings.Join(words, " "))

    csv := []string{"Alice", "30", "alice@example.com"}
    fmt.Println(strings.Join(csv, ","))

    // Empty separator
    chars := []string{"H", "e", "l", "l", "o"}
    fmt.Println(strings.Join(chars, ""))

    // Build a path
    parts := []string{"home", "user", "documents"}
    fmt.Println(strings.Join(parts, "/"))

    // SQL IN clause
    ids := []string{"1", "2", "3", "4"}
    clause := fmt.Sprintf("WHERE id IN (%s)", strings.Join(ids, ", "))
    fmt.Println(clause)
}`,
            output: `Go is awesome
Alice,30,alice@example.com
Hello
home/user/documents
WHERE id IN (1, 2, 3, 4)`,
            tip: '`strings.Join` is much more efficient than concatenating with `+` in a loop. It calculates the total length first and allocates once.',
            analogy: 'Think of it like stringing beads on a necklace: each string element is a bead, and the separator is the knot between them. Join threads them all together in one go.',
            codeHighlightLines: [10, 13, 21],
          },
        ],
        quiz: [
          {
            question: 'Why is strings.Join more efficient than concatenating strings with + in a loop?',
            options: [
              'Join uses a different character encoding',
              'Join calculates the total length first and allocates once',
              'Join runs in a separate goroutine',
              'Join uses unsafe pointers for speed',
            ],
            correctIndex: 1,
            explanation:
              'strings.Join pre-calculates the total length of the resulting string and makes a single allocation. Concatenation with + creates a new string on every iteration, leading to O(n^2) behavior.',
          },
          {
            question: 'What does strings.Join([]string{"a", "b", "c"}, "") produce?',
            options: [
              '"a, b, c"',
              '"abc"',
              '"a b c"',
              'An error because the separator is empty',
            ],
            correctIndex: 1,
            explanation:
              'When the separator is an empty string, strings.Join concatenates all elements directly with nothing between them, producing "abc".',
          },
        ],
        challenge: {
          prompt:
            'Write a function buildCSVLine that takes a map[string]string and a slice of column names, and returns a CSV line with values in the specified column order, joined by commas.',
          starterCode: `package main

import (
    "fmt"
    "strings"
)

func buildCSVLine(data map[string]string, columns []string) string {
    // TODO: Extract values from the map in the order specified by columns
    // TODO: Join them with commas using strings.Join
    return ""
}

func main() {
    data := map[string]string{
        "name": "Alice",
        "age":  "30",
        "city": "NYC",
    }
    columns := []string{"name", "age", "city"}
    fmt.Println(buildCSVLine(data, columns))
}`,
          solutionCode: `package main

import (
    "fmt"
    "strings"
)

func buildCSVLine(data map[string]string, columns []string) string {
    values := make([]string, len(columns))
    for i, col := range columns {
        values[i] = data[col]
    }
    return strings.Join(values, ",")
}

func main() {
    data := map[string]string{
        "name": "Alice",
        "age":  "30",
        "city": "NYC",
    }
    columns := []string{"name", "age", "city"}
    fmt.Println(buildCSVLine(data, columns))
}`,
          hints: [
            'Create a slice to hold the values in column order, then use strings.Join.',
            'Use make([]string, len(columns)) to pre-allocate the values slice.',
            'Access map values by key: data[col] gives the value for each column name.',
          ],
        },
      },
      {
        id: 'strings-split',
        title: 'strings.Split',
        difficulty: 'beginner',
        tags: ['strings', 'split', 'tokenize', 'parse'],
        signature: 'func Split(s, sep string) []string',
        cheatSheetSummary:
          'Splits string by separator into a slice. `SplitN` limits number of parts. `Fields` splits on whitespace.',
        sections: [
          {
            heading: 'Splitting Strings',
            content:
              '`strings.Split` divides a string into a slice of substrings separated by a delimiter. `SplitN` limits the number of splits. `Fields` splits on any whitespace and handles multiple consecutive spaces.',
            code: `package main

import (
    "fmt"
    "strings"
)

func main() {
    // Basic split
    csv := "alice,bob,charlie"
    names := strings.Split(csv, ",")
    fmt.Println(names)
    fmt.Println("Count:", len(names))

    // SplitN: limit number of splits
    data := "key=value=with=equals"
    parts := strings.SplitN(data, "=", 2) // split at first = only
    fmt.Println(parts) // [key value=with=equals]

    // Fields: split on whitespace (handles multiple spaces)
    text := "  hello   world   go  "
    words := strings.Fields(text)
    fmt.Println(words) // [hello world go]

    // SplitAfter: keeps the separator
    path := "/home/user/docs"
    segments := strings.SplitAfter(path, "/")
    fmt.Println(segments) // [/ home/ user/ docs]

    // Split with empty separator splits into characters
    chars := strings.Split("Hello", "")
    fmt.Println(chars) // [H e l l o]
}`,
            output: `[alice bob charlie]
Count: 3
[key value=with=equals]
[hello world go]
[/ home/ user/ docs]
[H e l l o]`,
            tip: 'Use `strings.Fields` instead of `strings.Split(s, " ")` when your data may have multiple spaces, tabs, or newlines between values.',
            codeHighlightLines: [11, 17, 22],
            analogy: 'Think of it like cutting a loaf of bread at each mark: Split cuts at every separator, SplitN stops after N cuts, and Fields cuts wherever there is any whitespace.',
          },
        ],
        quiz: [
          {
            question: 'What is the difference between strings.Split(s, " ") and strings.Fields(s)?',
            options: [
              'They behave identically',
              'Fields splits on any whitespace and handles multiple consecutive spaces; Split creates empty strings for consecutive delimiters',
              'Split handles multiple spaces; Fields only splits on single spaces',
              'Fields is deprecated in favor of Split',
            ],
            correctIndex: 1,
            explanation:
              'strings.Fields splits on any whitespace (spaces, tabs, newlines) and collapses consecutive whitespace. strings.Split(s, " ") creates empty string elements for each consecutive space.',
          },
          {
            question: 'What does strings.SplitN("a:b:c:d", ":", 2) return?',
            options: [
              '["a", "b", "c", "d"]',
              '["a", "b:c:d"]',
              '["a", "b"]',
              '["a:b", "c:d"]',
            ],
            correctIndex: 1,
            explanation:
              'SplitN with n=2 splits at the first separator only, returning at most 2 substrings: ["a", "b:c:d"].',
          },
          {
            question: 'What does strings.Split("Hello", "") return?',
            options: [
              '["Hello"]',
              '["H", "e", "l", "l", "o"]',
              '["", "H", "e", "l", "l", "o", ""]',
              'An error',
            ],
            correctIndex: 1,
            explanation:
              'Splitting with an empty separator splits the string into individual UTF-8 characters (runes), returning ["H", "e", "l", "l", "o"].',
          },
        ],
        challenge: {
          prompt:
            'Write a function parseKeyValue that takes a string like "key=value" and returns the key and value separately. If there are multiple = signs, only split on the first one. Also write a function parseCSV that splits a CSV line into fields.',
          starterCode: `package main

import (
    "fmt"
    "strings"
)

func parseKeyValue(s string) (key, value string) {
    // TODO: Split on the first "=" only, return key and value
    return "", ""
}

func parseCSV(line string) []string {
    // TODO: Split the line by commas and trim whitespace from each field
    return nil
}

func main() {
    k, v := parseKeyValue("database_url=postgres://localhost:5432/mydb")
    fmt.Printf("Key: %s\\nValue: %s\\n", k, v)

    fields := parseCSV("Alice, 30, NYC, Engineer")
    fmt.Println(fields)
}`,
          solutionCode: `package main

import (
    "fmt"
    "strings"
)

func parseKeyValue(s string) (key, value string) {
    parts := strings.SplitN(s, "=", 2)
    if len(parts) == 2 {
        return parts[0], parts[1]
    }
    return s, ""
}

func parseCSV(line string) []string {
    parts := strings.Split(line, ",")
    for i, p := range parts {
        parts[i] = strings.TrimSpace(p)
    }
    return parts
}

func main() {
    k, v := parseKeyValue("database_url=postgres://localhost:5432/mydb")
    fmt.Printf("Key: %s\\nValue: %s\\n", k, v)

    fields := parseCSV("Alice, 30, NYC, Engineer")
    fmt.Println(fields)
}`,
          hints: [
            'Use strings.SplitN with n=2 to split only at the first occurrence of "=".',
            'For CSV parsing, split by "," then trim whitespace from each field with strings.TrimSpace.',
            'Check len(parts) before accessing elements to handle edge cases.',
          ],
        },
      },
      {
        id: 'strings-replace',
        title: 'strings.Replace',
        difficulty: 'beginner',
        tags: ['strings', 'replace', 'substitute', 'replacer'],
        signature: 'func Replace(s, old, new string, n int) string',
        cheatSheetSummary:
          'Replaces occurrences of `old` with `new`. `n=-1` replaces all. `ReplaceAll` is shorthand for `n=-1`.',
        sections: [
          {
            heading: 'Replacing Substrings',
            content:
              '`strings.Replace` replaces occurrences of a substring. The `n` parameter controls how many replacements: -1 means all. `strings.ReplaceAll` is shorthand for replacing all occurrences. For multiple replacements, use `strings.Replacer`.',
            code: `package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "foo bar foo baz foo"

    // Replace all
    fmt.Println(strings.ReplaceAll(s, "foo", "qux"))

    // Replace first n occurrences
    fmt.Println(strings.Replace(s, "foo", "qux", 1)) // first only
    fmt.Println(strings.Replace(s, "foo", "qux", 2)) // first two

    // strings.Replacer for multiple replacements
    r := strings.NewReplacer(
        "&", "&amp;",
        "<", "&lt;",
        ">", "&gt;",
        "\"", "&quot;",
    )
    html := r.Replace("<div class=\"main\">Hello & World</div>")
    fmt.Println(html)

    // Practical: sanitize path
    path := strings.ReplaceAll("/api//v2///users/", "//", "/")
    fmt.Println(path)
}`,
            output: `qux bar qux baz qux
qux bar foo baz foo
qux bar qux baz foo
&lt;div class=&quot;main&quot;&gt;Hello &amp; World&lt;/div&gt;
/api/v2//users/`,
            tip: 'Use `strings.NewReplacer` for multiple find-and-replace operations. It is more efficient than chaining multiple `ReplaceAll` calls.',
            codeHighlightLines: [12, 15, 19, 20, 21, 22, 23],
          },
        ],
        quiz: [
          {
            question: 'What does the n parameter in strings.Replace(s, old, new, n) control?',
            options: [
              'The maximum length of the replacement string',
              'The number of occurrences to replace (-1 means all)',
              'The starting position for replacement',
              'The number of characters to replace at each occurrence',
            ],
            correctIndex: 1,
            explanation:
              'The n parameter controls how many occurrences of old are replaced with new. Use -1 to replace all occurrences. strings.ReplaceAll is shorthand for n=-1.',
          },
          {
            question: 'What is the advantage of strings.NewReplacer over multiple ReplaceAll calls?',
            options: [
              'It supports regular expressions',
              'It is more efficient for multiple replacements',
              'It modifies the string in place',
              'It supports Unicode normalization',
            ],
            correctIndex: 1,
            explanation:
              'strings.NewReplacer performs all replacements in a single pass over the string, making it more efficient than chaining multiple ReplaceAll calls which each create a new string.',
          },
          {
            question: 'What does strings.ReplaceAll("/api//v2///users/", "//", "/") return?',
            options: [
              '"/api/v2/users/"',
              '"/api/v2//users/"',
              '"/api/v2///users/"',
              '"/api/v2/users"',
            ],
            correctIndex: 1,
            explanation:
              'ReplaceAll replaces each non-overlapping occurrence of "//" with "/". After replacing "///" at the start, "//users" still contains "//", but the triple slash becomes "/" + "/" (the middle / was part of two overlapping pairs). The result is "/api/v2//users/".',
          },
        ],
        challenge: {
          prompt:
            'Write a function escapeHTML that uses strings.NewReplacer to escape HTML special characters (&, <, >, ") in a string. Test it with a string containing HTML tags.',
          starterCode: `package main

import (
    "fmt"
    "strings"
)

func escapeHTML(s string) string {
    // TODO: Create a strings.NewReplacer that replaces:
    // & -> &amp;
    // < -> &lt;
    // > -> &gt;
    // " -> &quot;
    return s
}

func main() {
    input := "<script>alert(\"XSS & more\")</script>"
    fmt.Println("Original:", input)
    fmt.Println("Escaped:", escapeHTML(input))
}`,
          solutionCode: `package main

import (
    "fmt"
    "strings"
)

func escapeHTML(s string) string {
    r := strings.NewReplacer(
        "&", "&amp;",
        "<", "&lt;",
        ">", "&gt;",
        "\"", "&quot;",
    )
    return r.Replace(s)
}

func main() {
    input := "<script>alert(\"XSS & more\")</script>"
    fmt.Println("Original:", input)
    fmt.Println("Escaped:", escapeHTML(input))
}`,
          hints: [
            'strings.NewReplacer takes pairs of old, new strings as arguments.',
            'Order matters: replace & first to avoid double-escaping &amp; into &amp;amp;.',
            'Use the Replacer.Replace method to apply all replacements at once.',
          ],
        },
      },
      {
        id: 'strings-tolower',
        title: 'strings.ToLower / ToUpper',
        difficulty: 'beginner',
        tags: ['strings', 'case', 'lower', 'upper', 'title'],
        signature: 'func ToLower(s string) string',
        cheatSheetSummary:
          '`ToLower`/`ToUpper` convert case. `EqualFold` for case-insensitive comparison. `Title` is deprecated; use `cases` package.',
        sections: [
          {
            heading: 'Case Conversion',
            content:
              '`strings.ToLower` and `strings.ToUpper` convert all characters in a string to lowercase or uppercase. `strings.EqualFold` compares two strings case-insensitively without allocating new strings.',
            code: `package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "Hello, World!"

    fmt.Println(strings.ToLower(s))   // hello, world!
    fmt.Println(strings.ToUpper(s))   // HELLO, WORLD!

    // Case-insensitive comparison (no allocation)
    fmt.Println(strings.EqualFold("Go", "go"))       // true
    fmt.Println(strings.EqualFold("Go", "GO"))       // true
    fmt.Println(strings.EqualFold("Go", "Rust"))     // false

    // Practical: case-insensitive search
    query := "HELLO"
    text := "Hello, World!"
    if strings.Contains(strings.ToLower(text), strings.ToLower(query)) {
        fmt.Println("Found (case-insensitive)")
    }

    // Map: apply a function to each rune
    shouting := strings.Map(func(r rune) rune {
        if r == ' ' {
            return '-'
        }
        return r
    }, strings.ToUpper("hello world"))
    fmt.Println(shouting)
}`,
            output: `hello, world!
HELLO, WORLD!
true
true
false
Found (case-insensitive)
HELLO-WORLD`,
            tip: 'Use `strings.EqualFold` for case-insensitive comparison instead of converting both strings with `ToLower`. It is faster and allocates no memory.',
            codeHighlightLines: [11, 12, 15],
          },
        ],
        quiz: [
          {
            question: 'Why is strings.EqualFold preferred over converting both strings with ToLower for comparison?',
            options: [
              'EqualFold supports more languages',
              'EqualFold is faster and allocates no memory',
              'EqualFold works with regular expressions',
              'ToLower does not work with Unicode',
            ],
            correctIndex: 1,
            explanation:
              'strings.EqualFold compares strings case-insensitively without creating new string allocations. Using ToLower on both strings allocates two new strings, which is slower and uses more memory.',
          },
          {
            question: 'What does strings.Map do?',
            options: [
              'Creates a map[string]string from a string',
              'Applies a function to each rune in the string and returns the result',
              'Maps one string to another using a lookup table',
              'Converts a string to a map of character frequencies',
            ],
            correctIndex: 1,
            explanation:
              'strings.Map applies a mapping function to each rune (Unicode character) in the string. It returns a new string with the transformed characters. Returning -1 from the function removes that rune.',
          },
          {
            question: 'What does strings.ToLower("Go 123 ABC") return?',
            options: [
              '"go 123 abc"',
              '"go abc"',
              '"GO 123 ABC"',
              '"go123abc"',
            ],
            correctIndex: 0,
            explanation:
              'strings.ToLower converts all Unicode letters to lowercase. Non-letter characters like spaces and digits are unchanged, so "Go 123 ABC" becomes "go 123 abc".',
          },
        ],
        challenge: {
          prompt:
            'Write a function normalizeEmail that takes an email string, trims whitespace, converts to lowercase, and validates it contains exactly one "@" symbol. Return the normalized email and a boolean indicating validity.',
          starterCode: `package main

import (
    "fmt"
    "strings"
)

func normalizeEmail(email string) (string, bool) {
    // TODO: Trim whitespace
    // TODO: Convert to lowercase
    // TODO: Check it contains exactly one "@"
    return "", false
}

func main() {
    emails := []string{
        "  Alice@Example.COM  ",
        "bob@test.org",
        "invalid-email",
        "too@many@ats",
    }
    for _, e := range emails {
        normalized, valid := normalizeEmail(e)
        fmt.Printf("%-25s -> %-25s valid: %t\\n", e, normalized, valid)
    }
}`,
          solutionCode: `package main

import (
    "fmt"
    "strings"
)

func normalizeEmail(email string) (string, bool) {
    cleaned := strings.ToLower(strings.TrimSpace(email))
    atCount := strings.Count(cleaned, "@")
    return cleaned, atCount == 1
}

func main() {
    emails := []string{
        "  Alice@Example.COM  ",
        "bob@test.org",
        "invalid-email",
        "too@many@ats",
    }
    for _, e := range emails {
        normalized, valid := normalizeEmail(e)
        fmt.Printf("%-25s -> %-25s valid: %t\\n", e, normalized, valid)
    }
}`,
          hints: [
            'Use strings.TrimSpace to remove leading/trailing whitespace, then strings.ToLower to normalize case.',
            'Use strings.Count(s, "@") to count the number of "@" symbols.',
            'A valid email should have exactly one "@" symbol.',
          ],
        },
      },
      {
        id: 'strings-trim',
        title: 'strings.Trim',
        difficulty: 'beginner',
        tags: ['strings', 'trim', 'strip', 'whitespace'],
        signature: 'func TrimSpace(s string) string',
        cheatSheetSummary:
          '`TrimSpace` removes leading/trailing whitespace. `Trim` removes specified characters. `TrimPrefix`/`TrimSuffix` remove exact strings.',
        sections: [
          {
            heading: 'Trimming Strings',
            content:
              '`strings.TrimSpace` removes leading and trailing whitespace. `Trim` removes specified characters from both ends. `TrimLeft`/`TrimRight` trim from one side. `TrimPrefix`/`TrimSuffix` remove exact string prefixes or suffixes.',
            code: `package main

import (
    "fmt"
    "strings"
)

func main() {
    // TrimSpace: remove whitespace from both ends
    s := "  \\t  Hello, World!  \\n  "
    fmt.Printf("[%s]\\n", strings.TrimSpace(s))

    // Trim: remove specified characters from both ends
    fmt.Println(strings.Trim("***hello***", "*"))
    fmt.Println(strings.Trim("...hello...", "."))

    // TrimLeft / TrimRight: one side only
    fmt.Println(strings.TrimLeft("000042", "0"))
    fmt.Println(strings.TrimRight("hello...", "."))

    // TrimPrefix / TrimSuffix: remove exact strings
    fmt.Println(strings.TrimPrefix("/api/users", "/api"))
    fmt.Println(strings.TrimSuffix("file.txt", ".txt"))

    // TrimFunc: custom trimming logic
    trimmed := strings.TrimFunc("123hello456", func(r rune) bool {
        return r >= '0' && r <= '9'
    })
    fmt.Println(trimmed)

    // Practical: clean user input
    input := "  alice@example.com  "
    email := strings.ToLower(strings.TrimSpace(input))
    fmt.Println("Email:", email)
}`,
            output: `[Hello, World!]
hello
hello
42
hello
/users
file
hello
Email: alice@example.com`,
            tip: '`Trim` removes individual characters from the cutset, not the string as a whole. `Trim("abcba", "ab")` removes a\'s and b\'s from both ends, giving "c".',
            analogy: 'Think of it like trimming the crust off a sandwich: TrimSpace removes the whitespace crust from both sides, Trim lets you specify which crusts to remove, and TrimPrefix/TrimSuffix only trim from one specific side.',
            codeHighlightLines: [11, 14, 18, 22, 23],
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart LR
    A["'  Hello  '"] -->|TrimSpace| B["'Hello'"]
    C["'***hi***'"] -->|"Trim('*')"| D["'hi'"]
    E["'/api/users'"] -->|"TrimPrefix('/api')"| F["'/users'"]
    G["'file.txt'"] -->|"TrimSuffix('.txt')"| H["'file'"]`,
              caption: 'Visual comparison of Trim variants and their effects',
            },
          },
        ],
      },
    ],
  },
];

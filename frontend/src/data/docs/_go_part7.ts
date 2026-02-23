import type { DocCategory } from './types';

// Part 7: Testing + Advanced
export const GO_PART7_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Testing                                                      */
  /* ------------------------------------------------------------ */
  {
    id: 'testing',
    label: 'Testing',
    icon: 'CheckCircle',
    entries: [
      {
        id: 'testing-basics',
        title: 'Testing Basics',
        difficulty: 'beginner',
        tags: ['testing', 'go-test', 'test-function', 'assert'],
        cheatSheetSummary:
          'Files end in `_test.go`. Functions: `func TestXxx(t *testing.T)`. Run with `go test`. Use `t.Error`, `t.Fatal`, `t.Run`.',
        crossLanguageId: 'testing-basics',
        sections: [
          {
            heading: 'Writing Your First Test',
            content:
              'Go has a built-in testing framework. Test files end in `_test.go` and are excluded from normal builds. Test functions start with `Test` and take `*testing.T`. Use `t.Error` for non-fatal failures and `t.Fatal` to stop the test immediately.',
            code: `// math.go
package math

func Add(a, b int) int {
    return a + b
}

func Abs(n int) int {
    if n < 0 {
        return -n
    }
    return n
}

// math_test.go
package math

import "testing"

func TestAdd(t *testing.T) {
    result := Add(2, 3)
    if result != 5 {
        t.Errorf("Add(2, 3) = %d; want 5", result)
    }
}

func TestAbs(t *testing.T) {
    if Abs(-5) != 5 {
        t.Error("Abs(-5) should be 5")
    }
    if Abs(5) != 5 {
        t.Error("Abs(5) should be 5")
    }
    if Abs(0) != 0 {
        t.Error("Abs(0) should be 0")
    }
}`,
            output: `$ go test -v
=== RUN   TestAdd
--- PASS: TestAdd (0.00s)
=== RUN   TestAbs
--- PASS: TestAbs (0.00s)
PASS
ok      mypackage   0.001s`,
            tip: 'Use `t.Errorf` (non-fatal) when you want to continue checking other conditions. Use `t.Fatalf` when the test cannot continue meaningfully.',
            analogy: 'Think of it like a quality inspector on a factory line: t.Error marks a defect but lets the product continue down the line for more checks, while t.Fatal pulls the emergency stop and halts inspection immediately.',
            codeHighlightLines: [20, 21, 22, 23, 27, 28],
          },
          {
            heading: 'Test Commands',
            content:
              'The `go test` command runs all tests in the current package. Use flags for verbosity, coverage, specific tests, timeouts, and race detection.',
            code: `// Common test commands:
// go test              # run tests in current package
// go test ./...        # run tests in all packages
// go test -v           # verbose output
// go test -run TestAdd # run specific test
// go test -count=1     # disable test caching
// go test -race        # enable race detector
// go test -timeout 30s # set timeout
// go test -short       # skip long tests
// go test -cover       # show coverage percentage

// In test code, check for -short flag:
// func TestLongOperation(t *testing.T) {
//     if testing.Short() {
//         t.Skip("skipping long test in short mode")
//     }
//     // ... long test
// }

package main

import "fmt"

func main() {
    fmt.Println("Run: go test -v ./...")
}`,
            output: `Run: go test -v ./...`,
            note: 'The `-race` flag is crucial for finding concurrency bugs. Always run your tests with `-race` in CI. It slows tests by 2-20x but catches real bugs.',
          },
          {
            heading: 'Subtests with t.Run',
            content:
              '`t.Run` creates subtests, allowing you to group related tests and run them individually. Subtests enable shared setup/teardown and selective test execution with `go test -run`.',
            code: `// calculator_test.go
package calculator

import "testing"

func TestCalculator(t *testing.T) {
    t.Run("Addition", func(t *testing.T) {
        if Add(2, 3) != 5 {
            t.Error("2+3 should be 5")
        }
    })

    t.Run("Subtraction", func(t *testing.T) {
        if Sub(5, 3) != 2 {
            t.Error("5-3 should be 2")
        }
    })

    t.Run("Division", func(t *testing.T) {
        t.Run("normal", func(t *testing.T) {
            result, err := Div(10, 2)
            if err != nil || result != 5 {
                t.Errorf("Div(10,2) = %f, %v; want 5, nil", result, err)
            }
        })

        t.Run("by zero", func(t *testing.T) {
            _, err := Div(10, 0)
            if err == nil {
                t.Error("Div(10,0) should return error")
            }
        })
    })
}

// Run specific subtest:
// go test -run TestCalculator/Division/by_zero`,
            output: `$ go test -v
=== RUN   TestCalculator
=== RUN   TestCalculator/Addition
=== RUN   TestCalculator/Subtraction
=== RUN   TestCalculator/Division
=== RUN   TestCalculator/Division/normal
=== RUN   TestCalculator/Division/by_zero
--- PASS: TestCalculator (0.00s)
    --- PASS: TestCalculator/Addition (0.00s)
    --- PASS: TestCalculator/Subtraction (0.00s)
    --- PASS: TestCalculator/Division (0.00s)
        --- PASS: TestCalculator/Division/normal (0.00s)
        --- PASS: TestCalculator/Division/by_zero (0.00s)
PASS`,
            tip: 'Subtests are the foundation for table-driven tests. Each table entry becomes a subtest with a descriptive name.',
            codeHighlightLines: [7, 13, 19, 20],
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart TD
    A["TestCalculator"] --> B["Addition"]
    A --> C["Subtraction"]
    A --> D["Division"]
    D --> E["normal"]
    D --> F["by zero"]`,
              caption: 'Subtests form a tree structure, each independently runnable',
            },
          },
        ],
        quiz: [
          {
            question: 'What suffix must Go test files have?',
            options: ['_test.go', '_spec.go', '.test.go', '_check.go'],
            correctIndex: 0,
            explanation: 'Go test files must end with _test.go. These files are automatically excluded from normal builds and only compiled when running go test.',
          },
          {
            question: 'What is the difference between t.Error and t.Fatal?',
            options: [
              't.Error logs but continues; t.Fatal logs and stops the test',
              't.Error stops the test; t.Fatal continues',
              't.Error is for warnings; t.Fatal is for errors',
              'There is no difference; they are aliases',
            ],
            correctIndex: 0,
            explanation: 't.Error (and t.Errorf) marks the test as failed but continues execution. t.Fatal (and t.Fatalf) marks the test as failed and stops the test function immediately.',
          },
          {
            question: 'What does t.Run do in Go tests?',
            options: [
              'Runs the entire test suite',
              'Creates a subtest with its own name that can be run independently',
              'Runs a test in a separate goroutine',
              'Restarts a failed test',
            ],
            correctIndex: 1,
            explanation: 't.Run creates a named subtest. Subtests can be selected with go test -run and form a hierarchy of tests, each independently runnable.',
          },
        ],
        challenge: {
          prompt: 'Write a test function TestMultiply that tests a Multiply(a, b int) int function. Include a subtest for multiplying by zero and a subtest for multiplying two negative numbers.',
          starterCode: `package math

func Multiply(a, b int) int {
    return a * b
}

// Write TestMultiply below
`,
          solutionCode: `package math

import "testing"

func Multiply(a, b int) int {
    return a * b
}

func TestMultiply(t *testing.T) {
    t.Run("multiply by zero", func(t *testing.T) {
        result := Multiply(5, 0)
        if result != 0 {
            t.Errorf("Multiply(5, 0) = %d; want 0", result)
        }
    })

    t.Run("two negatives", func(t *testing.T) {
        result := Multiply(-3, -4)
        if result != 12 {
            t.Errorf("Multiply(-3, -4) = %d; want 12", result)
        }
    })
}`,
          hints: [
            'Test functions must start with Test and accept *testing.T as the only parameter.',
            'Use t.Run("name", func(t *testing.T) { ... }) to create subtests.',
            'Use t.Errorf to report failures with a formatted message showing actual vs expected.',
          ],
        },
      },
      {
        id: 'table-driven-tests',
        title: 'Table-Driven Tests',
        difficulty: 'intermediate',
        tags: ['testing', 'table-driven', 'test-cases', 'parameterized'],
        cheatSheetSummary:
          'Define test cases as a slice of structs. Loop with `t.Run` for each. The most idiomatic Go testing pattern.',
        crossLanguageId: 'table-driven-tests',
        sections: [
          {
            heading: 'Table-Driven Test Pattern',
            content:
              'Table-driven tests are the most idiomatic testing pattern in Go. Define test cases as a slice of structs with inputs and expected outputs. Loop over them with `t.Run` to get clear, independent subtests. Easy to add new cases.',
            code: `package math

import "testing"

func TestAdd(t *testing.T) {
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"positive numbers", 2, 3, 5},
        {"negative numbers", -1, -2, -3},
        {"mixed signs", -1, 5, 4},
        {"zeros", 0, 0, 0},
        {"large numbers", 1000000, 2000000, 3000000},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result := Add(tt.a, tt.b)
            if result != tt.expected {
                t.Errorf("Add(%d, %d) = %d; want %d",
                    tt.a, tt.b, result, tt.expected)
            }
        })
    }
}`,
            output: `$ go test -v
=== RUN   TestAdd
=== RUN   TestAdd/positive_numbers
=== RUN   TestAdd/negative_numbers
=== RUN   TestAdd/mixed_signs
=== RUN   TestAdd/zeros
=== RUN   TestAdd/large_numbers
--- PASS: TestAdd (0.00s)
    --- PASS: TestAdd/positive_numbers (0.00s)
    --- PASS: TestAdd/negative_numbers (0.00s)
    --- PASS: TestAdd/mixed_signs (0.00s)
    --- PASS: TestAdd/zeros (0.00s)
    --- PASS: TestAdd/large_numbers (0.00s)
PASS`,
            tip: 'Name your test cases descriptively. The name appears in test output and can be used with `go test -run` to run specific cases.',
            analogy: 'Think of it like a spreadsheet of test scenarios: each row is a test case with inputs and expected outputs, and the framework runs through every row automatically.',
            codeHighlightLines: [6, 7, 8, 9, 14, 15, 16],
          },
          {
            heading: 'Table-Driven Tests with Errors',
            content:
              'Table-driven tests handle error cases elegantly. Add an `expectErr` or `errMsg` field to test both success and failure paths in the same table.',
            code: `package strutil

import (
    "testing"
)

func ParsePort(s string) (int, error) {
    // implementation
    return 0, nil
}

func TestParsePort(t *testing.T) {
    tests := []struct {
        name      string
        input     string
        want      int
        expectErr bool
    }{
        {"valid port", "8080", 8080, false},
        {"min port", "1", 1, false},
        {"max port", "65535", 65535, false},
        {"zero", "0", 0, true},
        {"too large", "65536", 0, true},
        {"negative", "-1", 0, true},
        {"not a number", "abc", 0, true},
        {"empty string", "", 0, true},
        {"with spaces", " 8080 ", 0, true},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := ParsePort(tt.input)

            if tt.expectErr {
                if err == nil {
                    t.Errorf("ParsePort(%q) error = nil; want error", tt.input)
                }
                return
            }

            if err != nil {
                t.Errorf("ParsePort(%q) unexpected error: %v", tt.input, err)
                return
            }

            if got != tt.want {
                t.Errorf("ParsePort(%q) = %d; want %d", tt.input, got, tt.want)
            }
        })
    }
}`,
            output: `$ go test -v -run TestParsePort
=== RUN   TestParsePort
=== RUN   TestParsePort/valid_port
=== RUN   TestParsePort/min_port
...
--- PASS: TestParsePort (0.00s)
PASS`,
            note: 'Testing error cases is just as important as testing success cases. A good table covers edge cases, boundary values, and invalid inputs.',
            codeHighlightLines: [12, 13, 14, 15, 16, 21, 22],
          },
          {
            heading: 'Parallel Table-Driven Tests',
            content:
              'Call `t.Parallel()` to run subtests concurrently. This speeds up test suites with slow tests (e.g., network calls). When using parallel tests, capture the loop variable to avoid closure issues.',
            code: `package api

import (
    "testing"
    "time"
)

func TestAPIEndpoints(t *testing.T) {
    tests := []struct {
        name     string
        endpoint string
        want     int
    }{
        {"health", "/health", 200},
        {"users", "/users", 200},
        {"admin", "/admin", 403},
        {"notfound", "/xyz", 404},
    }

    for _, tt := range tests {
        tt := tt // capture range variable (pre-Go 1.22)
        t.Run(tt.name, func(t *testing.T) {
            t.Parallel() // run subtests in parallel

            // Simulate slow API call
            time.Sleep(100 * time.Millisecond)

            status := callEndpoint(tt.endpoint)
            if status != tt.want {
                t.Errorf("%s returned %d; want %d",
                    tt.endpoint, status, tt.want)
            }
        })
    }
}

func callEndpoint(path string) int {
    // simulate
    switch path {
    case "/health", "/users":
        return 200
    case "/admin":
        return 403
    default:
        return 404
    }
}`,
            output: `$ go test -v
=== RUN   TestAPIEndpoints
=== RUN   TestAPIEndpoints/health
=== PAUSE TestAPIEndpoints/health
=== RUN   TestAPIEndpoints/users
=== PAUSE TestAPIEndpoints/users
=== CONT  TestAPIEndpoints/health
=== CONT  TestAPIEndpoints/users
--- PASS: TestAPIEndpoints (0.10s)
PASS`,
            tip: '`t.Parallel()` makes tests run concurrently. In Go 1.22+, you no longer need `tt := tt` because the loop variable is per-iteration.',
            codeHighlightLines: [8, 10, 11],
          },
        ],
        quiz: [
          {
            question: 'What is the idiomatic way to define test cases in a table-driven test?',
            options: [
              'A map of string to interface{}',
              'A slice of anonymous structs with inputs and expected outputs',
              'A JSON file loaded at runtime',
              'Separate test functions for each case',
            ],
            correctIndex: 1,
            explanation: 'The idiomatic Go pattern defines test cases as a slice of anonymous structs, each containing named fields for inputs and expected outputs. This makes it trivial to add new test cases.',
          },
          {
            question: 'Why is `tt := tt` used inside a parallel table-driven test loop (pre-Go 1.22)?',
            options: [
              'To create a deep copy of the struct',
              'To capture the loop variable so each goroutine gets its own copy',
              'To satisfy the compiler',
              'To improve performance by avoiding allocations',
            ],
            correctIndex: 1,
            explanation: 'Before Go 1.22, the loop variable was shared across iterations. Without `tt := tt`, all parallel subtests would reference the same variable, typically the last value in the slice. The reassignment captures a per-iteration copy.',
          },
          {
            question: 'How do you handle error-returning functions in table-driven tests?',
            options: [
              'Always use panic/recover',
              'Add an expectErr or errMsg field to the test case struct',
              'Write separate test functions for error cases',
              'Ignore errors in tests',
            ],
            correctIndex: 1,
            explanation: 'Adding an expectErr boolean or errMsg string field to the test case struct lets you test both success and error paths in the same table, keeping all cases together and easy to review.',
          },
        ],
        challenge: {
          prompt: 'Write a table-driven test for a function IsPalindrome(s string) bool that checks if a string reads the same forwards and backwards (case-insensitive). Include at least 4 test cases covering normal strings, single character, empty string, and mixed case.',
          starterCode: `package stringutil

import (
    "strings"
    "testing"
)

func IsPalindrome(s string) bool {
    s = strings.ToLower(s)
    for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
        if s[i] != s[j] {
            return false
        }
    }
    return true
}

// Write TestIsPalindrome below using table-driven pattern
`,
          solutionCode: `package stringutil

import (
    "strings"
    "testing"
)

func IsPalindrome(s string) bool {
    s = strings.ToLower(s)
    for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
        if s[i] != s[j] {
            return false
        }
    }
    return true
}

func TestIsPalindrome(t *testing.T) {
    tests := []struct {
        name  string
        input string
        want  bool
    }{
        {"palindrome word", "racecar", true},
        {"not palindrome", "hello", false},
        {"single char", "a", true},
        {"empty string", "", true},
        {"mixed case", "RaceCar", true},
        {"even length palindrome", "abba", true},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := IsPalindrome(tt.input)
            if got != tt.want {
                t.Errorf("IsPalindrome(%q) = %v; want %v", tt.input, got, tt.want)
            }
        })
    }
}`,
          hints: [
            'Define a slice of structs with name, input, and want (expected bool) fields.',
            'Loop over the slice and use t.Run(tt.name, ...) for each case.',
            'Use t.Errorf to report mismatches between the actual and expected result.',
          ],
        },
      },
      {
        id: 'benchmarks',
        title: 'Benchmarks',
        difficulty: 'intermediate',
        tags: ['testing', 'benchmark', 'performance', 'b.N'],
        cheatSheetSummary:
          'Functions: `func BenchmarkXxx(b *testing.B)`. Loop `b.N` times. Run: `go test -bench=.`. Use `b.ResetTimer()` for setup.',
        crossLanguageId: 'benchmarks',
        sections: [
          {
            heading: 'Writing Benchmarks',
            content:
              'Benchmark functions start with `Benchmark` and take `*testing.B`. The function must loop `b.N` times -- the framework adjusts N to get stable measurements. Run with `go test -bench=.`.',
            code: `package math

import (
    "fmt"
    "strings"
    "testing"
)

func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(42, 58)
    }
}

// Compare string concatenation methods
func BenchmarkConcatPlus(b *testing.B) {
    for i := 0; i < b.N; i++ {
        s := ""
        for j := 0; j < 100; j++ {
            s += "x"
        }
    }
}

func BenchmarkConcatBuilder(b *testing.B) {
    for i := 0; i < b.N; i++ {
        var sb strings.Builder
        for j := 0; j < 100; j++ {
            sb.WriteString("x")
        }
        _ = sb.String()
    }
}

func BenchmarkConcatSprintf(b *testing.B) {
    for i := 0; i < b.N; i++ {
        _ = fmt.Sprintf("%s%s%s", "hello", " ", "world")
    }
}`,
            output: `$ go test -bench=. -benchmem
BenchmarkAdd-8              1000000000   0.29 ns/op   0 B/op   0 allocs/op
BenchmarkConcatPlus-8          30000   42000 ns/op   5456 B/op   99 allocs/op
BenchmarkConcatBuilder-8     1000000    1200 ns/op    512 B/op    4 allocs/op
BenchmarkConcatSprintf-8     5000000     320 ns/op     32 B/op    1 allocs/op`,
            tip: 'Use `-benchmem` to show memory allocations. Reducing allocations often matters more than CPU time for Go performance.',
            analogy: 'Think of it like a stopwatch for your code: the benchmark framework runs your code faster and faster (increasing b.N) until it gets a stable, reliable timing measurement.',
            codeHighlightLines: [10, 11, 17, 18, 27, 28],
          },
          {
            heading: 'Benchmark Setup and Sub-Benchmarks',
            content:
              'Use `b.ResetTimer()` to exclude setup time from measurements. Sub-benchmarks with `b.Run` let you compare variations with different parameters.',
            code: `package cache

import (
    "fmt"
    "testing"
)

func BenchmarkMapLookup(b *testing.B) {
    sizes := []int{10, 100, 1000, 10000}

    for _, size := range sizes {
        b.Run(fmt.Sprintf("size=%d", size), func(b *testing.B) {
            // Setup (excluded from timing)
            m := make(map[int]int, size)
            for i := 0; i < size; i++ {
                m[i] = i * 2
            }
            key := size / 2

            b.ResetTimer() // start timing here

            for i := 0; i < b.N; i++ {
                _ = m[key]
            }
        })
    }
}

func BenchmarkSliceAppend(b *testing.B) {
    b.Run("no-prealloc", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            var s []int
            for j := 0; j < 1000; j++ {
                s = append(s, j)
            }
        }
    })

    b.Run("with-prealloc", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            s := make([]int, 0, 1000)
            for j := 0; j < 1000; j++ {
                s = append(s, j)
            }
        }
    })
}`,
            output: `$ go test -bench=BenchmarkMap -benchmem
BenchmarkMapLookup/size=10-8       200000000   5.2 ns/op    0 B/op  0 allocs
BenchmarkMapLookup/size=100-8      200000000   6.1 ns/op    0 B/op  0 allocs
BenchmarkMapLookup/size=1000-8     100000000   7.3 ns/op    0 B/op  0 allocs
BenchmarkMapLookup/size=10000-8    100000000   8.9 ns/op    0 B/op  0 allocs

$ go test -bench=BenchmarkSlice -benchmem
BenchmarkSliceAppend/no-prealloc-8     50000  26000 ns/op  25208 B/op  12 allocs
BenchmarkSliceAppend/with-prealloc-8  200000   4200 ns/op   8192 B/op   1 allocs`,
            note: '`b.ResetTimer()` zeros the timer and memory counters. Use it after expensive setup that should not be measured.',
            codeHighlightLines: [12, 13, 21, 41, 42, 52],
          },
        ],
        quiz: [
          {
            question: 'What parameter type does a Go benchmark function receive?',
            options: ['*testing.T', '*testing.B', '*testing.M', '*testing.F'],
            correctIndex: 1,
            explanation: 'Benchmark functions receive *testing.B which provides the b.N loop count, b.ResetTimer(), b.Run() for sub-benchmarks, and memory reporting functionality.',
          },
          {
            question: 'Why must you loop b.N times in a benchmark?',
            options: [
              'It is a Go syntax requirement',
              'To warm up the CPU cache',
              'The framework adjusts b.N to get stable, reliable timing measurements',
              'To test different input sizes',
            ],
            correctIndex: 2,
            explanation: 'The benchmark framework dynamically adjusts b.N (starting small and increasing) until the total time is long enough for a stable measurement. Looping b.N times lets the framework control measurement precision.',
          },
          {
            question: 'What does b.ResetTimer() do in a benchmark?',
            options: [
              'Restarts the benchmark from scratch',
              'Zeros the elapsed time and memory counters, excluding setup cost from results',
              'Sets b.N back to zero',
              'Resets the system clock',
            ],
            correctIndex: 1,
            explanation: 'b.ResetTimer() zeros the accumulated time and allocation counters. Call it after expensive setup code so that only the code you want to measure is timed.',
          },
          {
            question: 'What flag shows memory allocation statistics in benchmarks?',
            options: ['-memprofile', '-benchmem', '-alloc', '-mem'],
            correctIndex: 1,
            explanation: 'The -benchmem flag adds B/op (bytes per operation) and allocs/op (allocations per operation) columns to the benchmark output.',
          },
        ],
        challenge: {
          prompt: 'Write a benchmark comparing two approaches to reverse a string: one using a byte slice swap and one using rune conversion. Use sub-benchmarks with b.Run.',
          starterCode: `package stringutil

import "testing"

func ReverseBytes(s string) string {
    b := []byte(s)
    for i, j := 0, len(b)-1; i < j; i, j = i+1, j-1 {
        b[i], b[j] = b[j], b[i]
    }
    return string(b)
}

func ReverseRunes(s string) string {
    r := []rune(s)
    for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
        r[i], r[j] = r[j], r[i]
    }
    return string(r)
}

// Write BenchmarkReverse below with sub-benchmarks
`,
          solutionCode: `package stringutil

import "testing"

func ReverseBytes(s string) string {
    b := []byte(s)
    for i, j := 0, len(b)-1; i < j; i, j = i+1, j-1 {
        b[i], b[j] = b[j], b[i]
    }
    return string(b)
}

func ReverseRunes(s string) string {
    r := []rune(s)
    for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
        r[i], r[j] = r[j], r[i]
    }
    return string(r)
}

func BenchmarkReverse(b *testing.B) {
    input := "Hello, World! This is a benchmark test string."

    b.Run("bytes", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            ReverseBytes(input)
        }
    })

    b.Run("runes", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            ReverseRunes(input)
        }
    })
}`,
          hints: [
            'Benchmark functions start with Benchmark and take *testing.B.',
            'Use b.Run("name", func(b *testing.B) { ... }) for sub-benchmarks.',
            'Inside each sub-benchmark, loop from 0 to b.N calling the function under test.',
          ],
        },
      },
      {
        id: 'test-coverage',
        title: 'Test Coverage',
        difficulty: 'intermediate',
        tags: ['testing', 'coverage', 'cover-profile', 'html-report'],
        cheatSheetSummary:
          '`go test -cover` shows percentage. `-coverprofile=c.out` generates data. `go tool cover -html=c.out` for visual report.',
        crossLanguageId: 'test-coverage',
        sections: [
          {
            heading: 'Measuring Code Coverage',
            content:
              'Go\'s built-in coverage tool tracks which lines of code are executed during tests. Use `-cover` for a quick percentage, `-coverprofile` to generate data, and `go tool cover -html` for a visual HTML report.',
            code: `// Run coverage:
// go test -cover ./...
// ok  mypackage  0.005s  coverage: 87.5% of statements

// Generate coverage profile:
// go test -coverprofile=coverage.out ./...

// View HTML report (opens browser):
// go tool cover -html=coverage.out

// Coverage by function:
// go tool cover -func=coverage.out
// mypackage/math.go:3:    Add       100.0%
// mypackage/math.go:7:    Abs       80.0%
// mypackage/math.go:14:   Divide    66.7%
// total:                  (statements)  82.5%

// Coverage in CI:
// go test -coverprofile=coverage.out ./...
// go tool cover -func=coverage.out | tail -1

// Set minimum coverage threshold:
// COVERAGE=$(go test -coverprofile=c.out ./... | grep coverage | awk '{print $5}')
// if [ "$COVERAGE" < "80%" ]; then echo "Coverage too low"; exit 1; fi

package main

import "fmt"

func main() {
    fmt.Println("Run: go test -cover -v ./...")
}`,
            output: `Run: go test -cover -v ./...`,
            tip: 'Aim for 80%+ coverage on business logic. Do not chase 100% -- some code (error handling for impossible conditions) is not worth testing.',
          },
          {
            heading: 'Coverage Modes and Integration Tests',
            content:
              'Go supports three coverage modes: `set` (default, statement hit/miss), `count` (hit count), and `atomic` (thread-safe counting). Use `-coverpkg` to measure coverage across packages.',
            code: `// Coverage modes:
// go test -covermode=set ./...       # default: was line executed?
// go test -covermode=count ./...     # how many times?
// go test -covermode=atomic ./...    # safe for concurrent tests

// Cross-package coverage:
// go test -coverpkg=./... -coverprofile=c.out ./...

// Merge coverage from different test suites:
// go test -coverprofile=unit.out ./...
// go test -tags=integration -coverprofile=int.out ./...
// go tool covdata merge -i=unit.out,int.out -o=merged.out

// Build tags for integration tests:
// //go:build integration
// package mypackage
//
// func TestIntegration(t *testing.T) {
//     // only runs with: go test -tags=integration
// }

package main

import "fmt"

func main() {
    fmt.Println("Coverage modes: set, count, atomic")
}`,
            output: `Coverage modes: set, count, atomic`,
            note: 'Use `-covermode=atomic` when your tests use goroutines. The default `set` mode is not safe for concurrent access and may give inaccurate results.',
          },
          {
            heading: 'TestMain for Setup and Teardown',
            content:
              '`TestMain` gives you control over the entire test lifecycle. Use it for global setup (database connections, test servers) and teardown. It runs instead of individual tests unless you call `m.Run()`.',
            code: `package mypackage

import (
    "fmt"
    "os"
    "testing"
)

// TestMain controls the test lifecycle
func TestMain(m *testing.M) {
    // Global setup
    fmt.Println("Setting up test environment...")
    // db := setupTestDB()
    // defer db.Close()

    // Run all tests
    exitCode := m.Run()

    // Global teardown
    fmt.Println("Cleaning up test environment...")
    // cleanupTestData()

    os.Exit(exitCode)
}

func TestFeatureA(t *testing.T) {
    t.Log("Running feature A test")
    // test implementation
}

func TestFeatureB(t *testing.T) {
    t.Log("Running feature B test")
    // test implementation
}

// t.Cleanup for per-test cleanup (Go 1.14+)
func TestWithCleanup(t *testing.T) {
    // resource := createResource()
    t.Cleanup(func() {
        // resource.Destroy()
        t.Log("Cleanup called")
    })

    // test using resource...
}`,
            output: `Setting up test environment...
=== RUN   TestFeatureA
    TestFeatureA: test_test.go:25: Running feature A test
--- PASS: TestFeatureA (0.00s)
=== RUN   TestFeatureB
    TestFeatureB: test_test.go:30: Running feature B test
--- PASS: TestFeatureB (0.00s)
=== RUN   TestWithCleanup
    TestWithCleanup: test_test.go:38: Cleanup called
--- PASS: TestWithCleanup (0.00s)
PASS
Cleaning up test environment...`,
            tip: 'Use `t.Cleanup()` instead of `defer` for test cleanup. Cleanup functions run after the test and its subtests finish, in LIFO order.',
            codeHighlightLines: [10, 17, 23, 37, 38],
            diagram: {
              kind: 'mermaid' as const,
              code: `sequenceDiagram
    participant TM as TestMain
    participant T as Tests
    participant C as Cleanup

    TM->>TM: Global setup
    TM->>T: m.Run()
    T->>T: TestFeatureA
    T->>T: TestFeatureB
    T->>T: TestWithCleanup
    T->>C: t.Cleanup() runs
    T-->>TM: return exit code
    TM->>TM: Global teardown
    TM->>TM: os.Exit()`,
              caption: 'TestMain lifecycle: setup, run tests, per-test cleanup, then global teardown',
            },
          },
        ],
        quiz: [
          {
            question: 'Which command generates an HTML coverage report?',
            options: [
              'go test -cover -html',
              'go tool cover -html=coverage.out',
              'go test -coverhtml',
              'go cover -html ./...',
            ],
            correctIndex: 1,
            explanation: 'First generate a coverage profile with go test -coverprofile=coverage.out, then visualize it with go tool cover -html=coverage.out which opens an annotated HTML report in the browser.',
          },
          {
            question: 'What does TestMain allow you to do?',
            options: [
              'Run tests in alphabetical order',
              'Control the entire test lifecycle with global setup and teardown',
              'Skip all tests automatically',
              'Run only the main test function',
            ],
            correctIndex: 1,
            explanation: 'TestMain(m *testing.M) gives you control over the entire test lifecycle. You can set up global resources (databases, servers), call m.Run() to execute all tests, then clean up. You must call os.Exit with the code from m.Run().',
          },
          {
            question: 'What is the difference between t.Cleanup and defer in tests?',
            options: [
              'They are identical',
              't.Cleanup runs after the test and all its subtests finish; defer runs when the function returns',
              't.Cleanup is faster',
              'defer cannot be used in tests',
            ],
            correctIndex: 1,
            explanation: 't.Cleanup registers a function that runs after the test and all its subtests complete, in LIFO order. defer runs when the enclosing function returns, which may be before subtests finish if they are parallel.',
          },
        ],
        challenge: {
          prompt: 'Write a TestMain function that prints "SETUP" before tests and "TEARDOWN" after, then create two simple test functions TestAlpha and TestBeta that each log their name using t.Log.',
          starterCode: `package mypackage

import (
    "fmt"
    "os"
    "testing"
)

// Write TestMain, TestAlpha, and TestBeta below
`,
          solutionCode: `package mypackage

import (
    "fmt"
    "os"
    "testing"
)

func TestMain(m *testing.M) {
    fmt.Println("SETUP")
    exitCode := m.Run()
    fmt.Println("TEARDOWN")
    os.Exit(exitCode)
}

func TestAlpha(t *testing.T) {
    t.Log("Running TestAlpha")
}

func TestBeta(t *testing.T) {
    t.Log("Running TestBeta")
}`,
          hints: [
            'TestMain receives *testing.M and must call m.Run() to execute all tests.',
            'Always pass the return value of m.Run() to os.Exit() so the test runner knows the result.',
            'Use fmt.Println for setup/teardown messages and t.Log inside individual tests.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Advanced                                                     */
  /* ------------------------------------------------------------ */
  {
    id: 'advanced',
    label: 'Advanced',
    icon: 'Sparkles',
    entries: [
      {
        id: 'generics',
        title: 'Generics',
        difficulty: 'advanced',
        tags: ['generics', 'type-parameters', 'constraints', 'comparable'],
        cheatSheetSummary:
          'Type parameters in `[T constraint]`. Built-in: `any`, `comparable`. Custom constraints with interfaces. Available since Go 1.18.',
        crossLanguageId: 'generics',
        sections: [
          {
            heading: 'Generic Functions',
            content:
              'Generics (added in Go 1.18) let you write functions and types that work with multiple types while retaining type safety. Type parameters are declared in square brackets. Constraints specify what operations are allowed.',
            code: `package main

import (
    "cmp"
    "fmt"
)

// Generic function with comparable constraint
func Contains[T comparable](slice []T, target T) bool {
    for _, v := range slice {
        if v == target {
            return true
        }
    }
    return false
}

// Generic function with cmp.Ordered constraint (Go 1.21+)
func Min[T cmp.Ordered](a, b T) T {
    if a < b {
        return a
    }
    return b
}

func Max[T cmp.Ordered](vals ...T) T {
    m := vals[0]
    for _, v := range vals[1:] {
        if v > m {
            m = v
        }
    }
    return m
}

func main() {
    fmt.Println(Contains([]int{1, 2, 3}, 2))
    fmt.Println(Contains([]string{"a", "b"}, "c"))

    fmt.Println(Min(3, 7))
    fmt.Println(Min("apple", "banana"))

    fmt.Println(Max(3, 1, 4, 1, 5, 9))
}`,
            output: `true
false
3
apple
9`,
            tip: 'Use `cmp.Ordered` (Go 1.21+) instead of `constraints.Ordered` from the experimental package. It covers all ordered types (integers, floats, strings).',
            analogy: 'Think of it like a cookie cutter that works with any dough: the type parameter [T] is the shape, the constraint is the rule about which doughs are allowed, and the function works the same way regardless of the specific dough used.',
            codeHighlightLines: [9, 19, 26],
          },
          {
            heading: 'Generic Types and Constraints',
            content:
              'Generic types let you create data structures that work with any type. Custom constraints are defined as interfaces with type sets. Union constraints use `|` to allow multiple types.',
            code: `package main

import "fmt"

// Generic stack
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, bool) {
    if len(s.items) == 0 {
        var zero T
        return zero, false
    }
    item := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return item, true
}

func (s *Stack[T]) Len() int { return len(s.items) }

// Custom constraint with type union
type Number interface {
    ~int | ~int32 | ~int64 | ~float32 | ~float64
}

func Sum[T Number](nums []T) T {
    var total T
    for _, n := range nums {
        total += n
    }
    return total
}

// Generic map function
func Map[T any, U any](slice []T, fn func(T) U) []U {
    result := make([]U, len(slice))
    for i, v := range slice {
        result[i] = fn(v)
    }
    return result
}

func main() {
    // Stack of ints
    s := &Stack[int]{}
    s.Push(1)
    s.Push(2)
    s.Push(3)
    v, _ := s.Pop()
    fmt.Println("Popped:", v, "Len:", s.Len())

    // Sum with different types
    fmt.Println("Int sum:", Sum([]int{1, 2, 3, 4, 5}))
    fmt.Println("Float sum:", Sum([]float64{1.1, 2.2, 3.3}))

    // Generic Map
    words := []string{"hello", "world", "go"}
    lengths := Map(words, func(s string) int { return len(s) })
    fmt.Println("Lengths:", lengths)
}`,
            output: `Popped: 3 Len: 2
Int sum: 15
Float sum: 6.6
Lengths: [5 5 2]`,
            note: 'The `~` prefix in constraints means "underlying type". `~int` matches `int` and any type defined as `type MyInt int`.',
            codeHighlightLines: [6, 7, 10, 14, 15, 25, 26, 29, 38],
            diagram: {
              kind: 'custom' as const,
              type: 'stack',
              data: {
                title: 'Generic Stack[int] operations',
                items: [3, 2, 1],
                operations: ['Push(1)', 'Push(2)', 'Push(3)', 'Pop() -> 3'],
              },
              caption: 'A generic Stack[T] works with any type while maintaining type safety',
            },
          },
          {
            heading: 'When to Use Generics',
            content:
              'Use generics for: data structures (stacks, queues, trees), utility functions (map, filter, reduce), and eliminating code duplication across types. Avoid them when interfaces suffice or when they add complexity without clear benefit.',
            code: `package main

import (
    "cmp"
    "fmt"
)

// Good use: generic filter
func Filter[T any](slice []T, pred func(T) bool) []T {
    var result []T
    for _, v := range slice {
        if pred(v) {
            result = append(result, v)
        }
    }
    return result
}

// Good use: generic reduce
func Reduce[T any, U any](slice []T, init U, fn func(U, T) U) U {
    result := init
    for _, v := range slice {
        result = fn(result, v)
    }
    return result
}

// Good use: generic sorted keys
func SortedKeys[K cmp.Ordered, V any](m map[K]V) []K {
    keys := make([]K, 0, len(m))
    for k := range m {
        keys = append(keys, k)
    }
    // sort using cmp
    for i := 1; i < len(keys); i++ {
        for j := i; j > 0 && keys[j] < keys[j-1]; j-- {
            keys[j], keys[j-1] = keys[j-1], keys[j]
        }
    }
    return keys
}

func main() {
    nums := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

    evens := Filter(nums, func(n int) bool { return n%2 == 0 })
    fmt.Println("Evens:", evens)

    sum := Reduce(nums, 0, func(acc, n int) int { return acc + n })
    fmt.Println("Sum:", sum)

    product := Reduce(nums[:5], 1, func(acc, n int) int { return acc * n })
    fmt.Println("Product of first 5:", product)

    m := map[string]int{"c": 3, "a": 1, "b": 2}
    fmt.Println("Sorted keys:", SortedKeys(m))
}`,
            output: `Evens: [2 4 6 8 10]
Sum: 55
Product of first 5: 120
Sorted keys: [a b c]`,
            warning: 'Do not overuse generics. Go values simplicity. If an interface works well, prefer it. Generics should eliminate real code duplication, not add abstraction for its own sake.',
          },
        ],
        quiz: [
          {
            question: 'What syntax is used to declare type parameters in Go generics?',
            options: [
              'Angle brackets: <T>',
              'Square brackets: [T constraint]',
              'Parentheses: (T constraint)',
              'Curly braces: {T constraint}',
            ],
            correctIndex: 1,
            explanation: 'Go uses square brackets for type parameters, e.g., func Contains[T comparable](slice []T, target T) bool. This distinguishes them from regular parameters in parentheses.',
          },
          {
            question: 'What does the ~ prefix mean in a type constraint like ~int?',
            options: [
              'Approximately equal to int',
              'Not int',
              'Matches int and any type whose underlying type is int',
              'A pointer to int',
            ],
            correctIndex: 2,
            explanation: 'The tilde (~) prefix means "underlying type". ~int matches int itself and any named type defined as type MyInt int, type Age int, etc.',
          },
          {
            question: 'Which built-in constraint allows using == and != on a type parameter?',
            options: ['any', 'comparable', 'cmp.Ordered', 'interface{}'],
            correctIndex: 1,
            explanation: 'The comparable constraint allows equality comparison (== and !=). The any constraint (alias for interface{}) does not allow any operators. cmp.Ordered allows ordering operators (<, >, etc.) in addition to equality.',
          },
          {
            question: 'What is the zero value trick used for in generic functions?',
            options: [
              'Initializing slices',
              'Returning a default value when T is unknown, using var zero T',
              'Comparing performance',
              'Checking if a type is numeric',
            ],
            correctIndex: 1,
            explanation: 'Since you cannot write a literal zero value for an unknown type T, you declare var zero T which gives you the zero value for whatever T is (0 for int, "" for string, nil for pointers, etc.).',
          },
        ],
        challenge: {
          prompt: 'Write a generic function Keys[K comparable, V any](m map[K]V) []K that returns all keys from a map. Then write a generic function Values[K comparable, V any](m map[K]V) []V that returns all values.',
          starterCode: `package maputil

import "fmt"

// Write Keys and Values generic functions below

func main() {
    m := map[string]int{"a": 1, "b": 2, "c": 3}
    fmt.Println(Keys(m))
    fmt.Println(Values(m))
}
`,
          solutionCode: `package maputil

import "fmt"

func Keys[K comparable, V any](m map[K]V) []K {
    keys := make([]K, 0, len(m))
    for k := range m {
        keys = append(keys, k)
    }
    return keys
}

func Values[K comparable, V any](m map[K]V) []V {
    vals := make([]V, 0, len(m))
    for _, v := range m {
        vals = append(vals, v)
    }
    return vals
}

func main() {
    m := map[string]int{"a": 1, "b": 2, "c": 3}
    fmt.Println(Keys(m))
    fmt.Println(Values(m))
}`,
          hints: [
            'Map keys must satisfy the comparable constraint, while values can be any type.',
            'Use make([]K, 0, len(m)) to pre-allocate the result slice with the right capacity.',
            'Range over the map: for k := range m gives keys, for _, v := range m gives values.',
          ],
        },
      },
      {
        id: 'context',
        title: 'Context',
        difficulty: 'advanced',
        tags: ['context', 'cancellation', 'timeout', 'deadline', 'values'],
        cheatSheetSummary:
          'Pass `context.Context` as first param. `WithCancel` for manual cancel. `WithTimeout`/`WithDeadline` for time limits. Check `ctx.Done()` channel.',
        crossLanguageId: 'context',
        sections: [
          {
            heading: 'Context for Cancellation and Timeouts',
            content:
              'The `context` package provides cancellation propagation, deadlines, and request-scoped values across goroutines and API boundaries. Always pass context as the first parameter. Use `context.Background()` as the root and derive child contexts.',
            code: `package main

import (
    "context"
    "fmt"
    "time"
)

func slowOperation(ctx context.Context, id int) (string, error) {
    select {
    case <-time.After(500 * time.Millisecond):
        return fmt.Sprintf("result-%d", id), nil
    case <-ctx.Done():
        return "", ctx.Err()
    }
}

func main() {
    // WithTimeout: auto-cancels after duration
    ctx, cancel := context.WithTimeout(
        context.Background(), 200*time.Millisecond,
    )
    defer cancel() // always call cancel to release resources

    result, err := slowOperation(ctx, 1)
    if err != nil {
        fmt.Println("Error:", err) // context deadline exceeded
    } else {
        fmt.Println("Result:", result)
    }

    // WithCancel: manual cancellation
    ctx2, cancel2 := context.WithCancel(context.Background())
    go func() {
        time.Sleep(100 * time.Millisecond)
        cancel2() // cancel after 100ms
    }()

    result, err = slowOperation(ctx2, 2)
    if err != nil {
        fmt.Println("Error:", err) // context canceled
    }
}`,
            output: `Error: context deadline exceeded
Error: context canceled`,
            tip: 'Always defer `cancel()` even if the context will expire on its own. This releases resources immediately instead of waiting for the timeout.',
            analogy: 'Think of it like a manager sending a team on a task with a deadline: WithTimeout sets a timer that automatically cancels the work if it takes too long, and WithCancel gives you a walkie-talkie to call them back at any time.',
            codeHighlightLines: [11, 12, 13, 14, 21, 22, 24, 34, 37],
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart TD
    A["context.Background()"] -->|"WithTimeout(200ms)"| B["ctx with deadline"]
    A -->|"WithCancel()"| C["ctx with cancel func"]
    B --> D{"Operation completes?"}
    D -->|"Yes, before deadline"| E["Return result"]
    D -->|"No, deadline exceeded"| F["ctx.Done() fires"]
    C --> G["cancel() called manually"]
    G --> H["ctx.Done() fires"]`,
              caption: 'Context cancellation flow: timeout-based vs manual cancellation',
            },
          },
          {
            heading: 'Context in HTTP Servers',
            content:
              'HTTP servers receive a context from each request that is cancelled when the client disconnects. Pass this context to downstream calls (database queries, external APIs) so they stop when the request is no longer needed.',
            code: `package main

import (
    "context"
    "fmt"
    "time"
)

// Simulate a database query that respects context
func queryDB(ctx context.Context, query string) ([]string, error) {
    results := make(chan []string, 1)

    go func() {
        // Simulate slow query
        time.Sleep(100 * time.Millisecond)
        results <- []string{"row1", "row2", "row3"}
    }()

    select {
    case r := <-results:
        return r, nil
    case <-ctx.Done():
        return nil, fmt.Errorf("query cancelled: %w", ctx.Err())
    }
}

// Handler using context
func handleRequest(ctx context.Context) {
    // Add timeout for this specific operation
    ctx, cancel := context.WithTimeout(ctx, 200*time.Millisecond)
    defer cancel()

    rows, err := queryDB(ctx, "SELECT * FROM users")
    if err != nil {
        fmt.Println("DB error:", err)
        return
    }
    fmt.Println("Results:", rows)
}

func main() {
    // Simulate request with context
    ctx := context.Background()
    handleRequest(ctx)

    // Simulate cancelled request
    ctx, cancel := context.WithTimeout(ctx, 50*time.Millisecond)
    defer cancel()
    handleRequest(ctx)
}`,
            output: `Results: [row1 row2 row3]
DB error: query cancelled: context deadline exceeded`,
            warning: 'Never store contexts in structs. Always pass them explicitly as the first function parameter. Stored contexts can prevent garbage collection.',
            codeHighlightLines: [12, 21, 22, 24, 25, 32, 33],
            diagram: {
              kind: 'mermaid' as const,
              code: `sequenceDiagram
    participant H as handleRequest
    participant C as context
    participant DB as queryDB
    participant G as goroutine

    H->>C: WithTimeout(200ms)
    H->>DB: queryDB(ctx, ...)
    DB->>G: Start slow query
    alt Query completes in time
        G-->>DB: results
        DB-->>H: rows, nil
    else Timeout exceeded
        C-->>DB: ctx.Done()
        DB-->>H: nil, deadline exceeded
    end`,
              caption: 'Context propagation: timeout cancels downstream operations',
            },
          },
          {
            heading: 'Context Values',
            content:
              'Context can carry request-scoped values (trace IDs, auth tokens, request metadata). Use sparingly -- context values should be data that transits process boundaries, not function parameters.',
            code: `package main

import (
    "context"
    "fmt"
)

// Use custom types as keys to avoid collisions
type contextKey string

const (
    requestIDKey contextKey = "requestID"
    userIDKey    contextKey = "userID"
)

func withRequestID(ctx context.Context, id string) context.Context {
    return context.WithValue(ctx, requestIDKey, id)
}

func getRequestID(ctx context.Context) string {
    if id, ok := ctx.Value(requestIDKey).(string); ok {
        return id
    }
    return "unknown"
}

func processRequest(ctx context.Context) {
    reqID := getRequestID(ctx)
    fmt.Printf("[%s] Processing request\\n", reqID)
    saveToDatabase(ctx)
}

func saveToDatabase(ctx context.Context) {
    reqID := getRequestID(ctx)
    fmt.Printf("[%s] Saving to database\\n", reqID)
}

func main() {
    ctx := context.Background()
    ctx = withRequestID(ctx, "req-abc-123")
    processRequest(ctx)
}`,
            output: `[req-abc-123] Processing request
[req-abc-123] Saving to database`,
            tip: 'Context values are for request-scoped data (trace IDs, auth info). Do not use them to pass function parameters or optional configuration.',
            analogy: 'Think of it like a luggage tag on a suitcase traveling through an airport: the context carries request-scoped metadata (trace ID, auth token) alongside the request as it moves through different handlers, without each handler needing to know about every tag.',
            codeHighlightLines: [9, 16, 17, 20, 21, 38, 39],
          },
        ],
        quiz: [
          {
            question: 'What is the correct way to create a context with a 5-second timeout?',
            options: [
              'context.Timeout(5 * time.Second)',
              'context.WithTimeout(context.Background(), 5 * time.Second)',
              'context.Background().SetTimeout(5 * time.Second)',
              'context.New(5 * time.Second)',
            ],
            correctIndex: 1,
            explanation: 'context.WithTimeout takes a parent context and a duration, returning a new derived context and a cancel function. Always start with context.Background() as the root context.',
          },
          {
            question: 'Why should you always call the cancel function returned by WithTimeout or WithCancel?',
            options: [
              'To print cancellation logs',
              'It is required by the Go compiler',
              'To release resources immediately instead of waiting for the timeout to expire',
              'To restart the context',
            ],
            correctIndex: 2,
            explanation: 'Calling cancel() releases resources associated with the context (timers, goroutines). Even if the context will expire on its own, calling cancel promptly avoids resource leaks.',
          },
          {
            question: 'Where should context.Context appear in a function signature?',
            options: [
              'As the last parameter',
              'As the first parameter',
              'As a struct field',
              'As a global variable',
            ],
            correctIndex: 1,
            explanation: 'By convention, context.Context should always be the first parameter of a function. It should never be stored in a struct, as this can prevent garbage collection and lead to stale contexts.',
          },
        ],
        challenge: {
          prompt: 'Write a function fetchData(ctx context.Context) (string, error) that simulates a slow operation taking 2 seconds. In main, call it with a 1-second timeout so it times out, and print the error.',
          starterCode: `package main

import (
    "context"
    "fmt"
    "time"
)

// Write fetchData and main below
`,
          solutionCode: `package main

import (
    "context"
    "fmt"
    "time"
)

func fetchData(ctx context.Context) (string, error) {
    select {
    case <-time.After(2 * time.Second):
        return "data loaded", nil
    case <-ctx.Done():
        return "", ctx.Err()
    }
}

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
    defer cancel()

    result, err := fetchData(ctx)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Result:", result)
}`,
          hints: [
            'Use a select statement with two cases: one for the slow operation (time.After) and one for ctx.Done().',
            'context.WithTimeout returns both a context and a cancel function -- always defer cancel().',
            'ctx.Err() returns the reason for cancellation (deadline exceeded or canceled).',
          ],
        },
      },
      {
        id: 'reflection',
        title: 'Reflection',
        difficulty: 'advanced',
        tags: ['reflect', 'runtime', 'type-info', 'dynamic'],
        cheatSheetSummary:
          '`reflect.TypeOf` gets type info. `reflect.ValueOf` gets value. Use for serialization, ORM, validation. Avoid in hot paths.',
        crossLanguageId: 'reflection',
        sections: [
          {
            heading: 'Reflection Basics',
            content:
              'The `reflect` package provides runtime type inspection and manipulation. `reflect.TypeOf` returns the type, `reflect.ValueOf` returns the value. Reflection is used by JSON/XML encoders, ORMs, and validation libraries. It is powerful but slow -- avoid it in performance-critical code.',
            code: 'package main\n\nimport (\n    "fmt"\n    "reflect"\n)\n\ntype User struct {\n    Name  string `json:"name" validate:"required"`\n    Email string `json:"email" validate:"email"`\n    Age   int    `json:"age" validate:"min=0,max=150"`\n}\n\nfunc main() {\n    u := User{Name: "Alice", Email: "alice@example.com", Age: 30}\n\n    t := reflect.TypeOf(u)\n    v := reflect.ValueOf(u)\n\n    fmt.Println("Type:", t.Name())\n    fmt.Println("Kind:", t.Kind())\n    fmt.Println("Fields:", t.NumField())\n\n    for i := 0; i < t.NumField(); i++ {\n        field := t.Field(i)\n        value := v.Field(i)\n        tag := field.Tag.Get("json")\n        fmt.Printf("  %s (%s) = %v [json: %s]\\n",\n            field.Name, field.Type, value, tag)\n    }\n}',
            output: `Type: User
Kind: struct
Fields: 3
  Name (string) = Alice [json: name]
  Email (string) = alice@example.com [json: email]
  Age (int) = 30 [json: age]`,
            warning: 'Reflection is 10-100x slower than direct field access. Use it for initialization, configuration, and serialization -- not in hot loops.',
            analogy: 'Think of it like using an X-ray machine to examine a package: reflect.TypeOf tells you the shape and labels of what is inside, and reflect.ValueOf lets you read the actual contents -- powerful but slow compared to just opening the box directly.',
            codeHighlightLines: [17, 18, 24, 25, 26, 27],
          },
          {
            heading: 'Practical Reflection: Struct Validator',
            content:
              'A practical use of reflection: building a simple struct field validator that reads struct tags and validates field values at runtime.',
            code: 'package main\n\nimport (\n    "fmt"\n    "reflect"\n    "strings"\n)\n\nfunc validateRequired(v interface{}) []string {\n    var errors []string\n    val := reflect.ValueOf(v)\n    typ := reflect.TypeOf(v)\n\n    for i := 0; i < val.NumField(); i++ {\n        field := typ.Field(i)\n        tag := field.Tag.Get("validate")\n\n        if strings.Contains(tag, "required") {\n            fieldVal := val.Field(i)\n            if fieldVal.IsZero() {\n                errors = append(errors,\n                    fmt.Sprintf("%s is required", field.Name))\n            }\n        }\n    }\n    return errors\n}\n\ntype Registration struct {\n    Name     string `validate:"required"`\n    Email    string `validate:"required"`\n    Password string `validate:"required"`\n    Bio      string\n}\n\nfunc main() {\n    // Valid\n    r1 := Registration{\n        Name: "Alice", Email: "a@b.com", Password: "secret",\n    }\n    errs := validateRequired(r1)\n    fmt.Println("Valid:", len(errs) == 0)\n\n    // Invalid\n    r2 := Registration{Name: "Bob"}\n    errs = validateRequired(r2)\n    for _, e := range errs {\n        fmt.Println("Error:", e)\n    }\n}',
            output: `Valid: true
Error: Email is required
Error: Password is required`,
            tip: 'For production validation, use a library like `go-playground/validator` which handles complex rules. This example shows the reflection principles behind such libraries.',
            codeHighlightLines: [9, 11, 12, 15, 16, 18, 19, 20],
          },
        ],
        quiz: [
          {
            question: 'What does reflect.TypeOf return?',
            options: [
              'The value stored in the variable',
              'The runtime type information (reflect.Type) of the value',
              'A string representation of the type name',
              'A pointer to the variable',
            ],
            correctIndex: 1,
            explanation: 'reflect.TypeOf returns a reflect.Type which provides methods to inspect the type at runtime, including Name(), Kind(), NumField() for structs, and Field(i) to access struct field metadata.',
          },
          {
            question: 'How do you read a struct tag using reflection?',
            options: [
              'reflect.ValueOf(s).Tag("json")',
              'reflect.TypeOf(s).Field(i).Tag.Get("json")',
              'reflect.TagOf(s, "json")',
              's.GetTag("json")',
            ],
            correctIndex: 1,
            explanation: 'Struct tags are accessed through the reflect.Type: call TypeOf to get the type, Field(i) to get the i-th field descriptor, then Tag.Get("tagname") to read a specific tag value.',
          },
          {
            question: 'Why should you avoid reflection in performance-critical code?',
            options: [
              'It causes compilation errors',
              'It is 10-100x slower than direct field access due to runtime type checking',
              'It does not work with structs',
              'It requires unsafe imports',
            ],
            correctIndex: 1,
            explanation: 'Reflection bypasses compile-time optimizations and requires runtime type checking, boxing/unboxing, and method lookup. This makes it 10-100x slower than direct operations and should be avoided in hot loops.',
          },
        ],
        challenge: {
          prompt: 'Write a function FieldNames(v interface{}) []string that uses reflection to return the names of all exported fields of a struct. Test it with a struct that has at least 3 fields.',
          starterCode: `package main

import (
    "fmt"
    "reflect"
)

// Write FieldNames function below

type Book struct {
    Title  string
    Author string
    Pages  int
}

func main() {
    b := Book{Title: "Go in Action", Author: "W. Kennedy", Pages: 375}
    fmt.Println(FieldNames(b))
}
`,
          solutionCode: `package main

import (
    "fmt"
    "reflect"
)

func FieldNames(v interface{}) []string {
    t := reflect.TypeOf(v)
    names := make([]string, t.NumField())
    for i := 0; i < t.NumField(); i++ {
        names[i] = t.Field(i).Name
    }
    return names
}

type Book struct {
    Title  string
    Author string
    Pages  int
}

func main() {
    b := Book{Title: "Go in Action", Author: "W. Kennedy", Pages: 375}
    fmt.Println(FieldNames(b))
}`,
          hints: [
            'Use reflect.TypeOf(v) to get the type, then NumField() to count fields.',
            'Loop from 0 to NumField() and use t.Field(i).Name to get each field name.',
            'The function accepts interface{} so it can work with any struct type.',
          ],
        },
      },
      {
        id: 'build-tags',
        title: 'Build Tags',
        difficulty: 'advanced',
        tags: ['build-tags', 'conditional-compilation', 'go-build', 'platform'],
        cheatSheetSummary:
          '`//go:build linux` constrains files to specific OS/arch. Use for platform-specific code, integration tests, and feature flags.',
        crossLanguageId: 'build-tags',
        sections: [
          {
            heading: 'Conditional Compilation',
            content:
              'Build tags (build constraints) control which files are included in a build. Use them for platform-specific code, test categories, and feature flags. The `//go:build` directive (Go 1.17+) replaces the old `// +build` syntax.',
            code: `// file: server_linux.go
//go:build linux

package main

import "fmt"

func platformInfo() string {
    return "Running on Linux"
}

// file: server_darwin.go
//go:build darwin

package main

func platformInfo() string {
    return "Running on macOS"
}

// file: server_windows.go
//go:build windows

package main

func platformInfo() string {
    return "Running on Windows"
}

// file: integration_test.go
//go:build integration

package main

import "testing"

func TestDatabaseIntegration(t *testing.T) {
    // Only runs with: go test -tags=integration
    t.Log("Running integration test")
}

// Boolean expressions:
// //go:build linux && amd64
// //go:build !windows
// //go:build (linux || darwin) && !cgo

// file: main.go
package main

import "fmt"

func main() {
    fmt.Println(platformInfo())
}`,
            output: `Running on Linux`,
            tip: 'Use `//go:build integration` for integration tests. Run them separately: `go test -tags=integration ./...`. This keeps unit tests fast.',
            analogy: 'Think of it like different doors at an event venue: each build tag is a door label (linux, darwin, windows), and only the files that match the label of the door you enter through get included in the build.',
            codeHighlightLines: [2, 13, 22, 37],
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart TD
    A["go build"] --> B{"GOOS?"}
    B -->|"linux"| C["server_linux.go"]
    B -->|"darwin"| D["server_darwin.go"]
    B -->|"windows"| E["server_windows.go"]
    F["go test -tags=integration"] --> G["integration_test.go"]
    H["go test"] --> I["unit tests only"]`,
              caption: 'Build tags select which files are included based on OS, arch, or custom tags',
            },
          },
          {
            heading: 'Build Tags for Feature Flags',
            content:
              'Build tags can implement compile-time feature flags. This is useful for debug builds, enterprise vs community editions, and experimental features.',
            code: `// file: logging_debug.go
//go:build debug

package main

import "fmt"

func debugLog(msg string) {
    fmt.Println("[DEBUG]", msg)
}

// file: logging_release.go
//go:build !debug

package main

func debugLog(msg string) {
    // no-op in release builds
}

// Build with debug logging:
// go build -tags=debug -o app-debug .

// Build without:
// go build -o app-release .

// file: main.go
package main

import "fmt"

func main() {
    debugLog("starting application")
    fmt.Println("Application running")
    debugLog("processing complete")
}`,
            output: `$ go run -tags=debug .
[DEBUG] starting application
Application running
[DEBUG] processing complete

$ go run .
Application running`,
            note: 'Build tags are evaluated at compile time, not runtime. The unused code is not included in the binary at all, keeping it small.',
            codeHighlightLines: [2, 14, 30, 31, 32],
          },
        ],
        quiz: [
          {
            question: 'What is the correct syntax for a build tag in Go 1.17+?',
            options: [
              '// +build linux',
              '//go:build linux',
              '#ifdef LINUX',
              '//build:linux',
            ],
            correctIndex: 1,
            explanation: 'Go 1.17 introduced the //go:build directive with boolean expression syntax. The older // +build syntax is still supported but deprecated. The new syntax supports clear boolean logic like //go:build linux && amd64.',
          },
          {
            question: 'How do you run tests that have a build tag //go:build integration?',
            options: [
              'go test -integration ./...',
              'go test -tags=integration ./...',
              'go test -build integration ./...',
              'INTEGRATION=true go test ./...',
            ],
            correctIndex: 1,
            explanation: 'Use the -tags flag to include files with specific build tags: go test -tags=integration ./... This allows you to separate unit tests from integration tests that require external dependencies.',
          },
          {
            question: 'What happens to code in files excluded by build tags?',
            options: [
              'It is compiled but not linked',
              'It is included but disabled at runtime',
              'It is not included in the binary at all',
              'It causes a compilation warning',
            ],
            correctIndex: 2,
            explanation: 'Build tags are evaluated at compile time. Files that do not match the current build tags are completely excluded from compilation and do not appear in the final binary at all.',
          },
        ],
        challenge: {
          prompt: 'Write two files with build tags: one for a "verbose" build that implements a Log function printing messages with a [VERBOSE] prefix, and one for non-verbose builds where Log is a no-op. Write a main function that calls Log.',
          starterCode: `// Write the verbose and non-verbose implementations
// as if they were separate files with build tags

package main

import "fmt"

// Hint: In real code these would be separate files:
// log_verbose.go with //go:build verbose
// log_quiet.go with //go:build !verbose

func main() {
    Log("application started")
    fmt.Println("Running...")
    Log("application finished")
}
`,
          solutionCode: `// file: log_verbose.go
//go:build verbose

package main

import "fmt"

func Log(msg string) {
    fmt.Println("[VERBOSE]", msg)
}

// file: log_quiet.go
//go:build !verbose

package main

func Log(msg string) {
    // no-op in non-verbose builds
}

// file: main.go
package main

import "fmt"

func main() {
    Log("application started")
    fmt.Println("Running...")
    Log("application finished")
}`,
          hints: [
            'Use //go:build verbose for the verbose file and //go:build !verbose for the quiet file.',
            'Both files define the same function Log with the same signature but different implementations.',
            'The ! operator negates a build tag, so !verbose matches when the verbose tag is NOT set.',
          ],
        },
      },
      {
        id: 'go-generate',
        title: 'go generate',
        difficulty: 'advanced',
        tags: ['go-generate', 'code-generation', 'stringer', 'mock'],
        cheatSheetSummary:
          '`//go:generate command` directive runs tools before build. Used for stringer, mocks, protobuf, and embedded assets.',
        crossLanguageId: 'code-generation',
        sections: [
          {
            heading: 'Code Generation with go generate',
            content:
              '`go generate` scans source files for `//go:generate` directives and runs the specified commands. It is used for generating string methods for enums, mock implementations, protobuf code, and embedded SQL. Run `go generate ./...` before building.',
            code: `package main

import "fmt"

// Generate enum string methods
//go:generate stringer -type=Color

type Color int

const (
    Red Color = iota
    Green
    Blue
    Yellow
)

// Generate mocks
//go:generate mockgen -source=repository.go -destination=mock_repository.go

type Repository interface {
    FindByID(id string) (string, error)
    Save(name string) error
}

// Generate from protobuf
//go:generate protoc --go_out=. --go-grpc_out=. api.proto

// Commands:
// go generate ./...          # run all generators
// go generate -v ./...       # verbose
// go generate -run stringer  # run only stringer generators

func main() {
    c := Blue
    fmt.Println(c) // "Blue" (from generated String method)
    fmt.Printf("Color: %s (value: %d)\\n", c, c)
}`,
            output: `Blue
Color: Blue (value: 2)`,
            tip: 'Always commit generated files to version control. This ensures builds work without requiring generator tools to be installed.',
            analogy: 'Think of it like a pre-processing assembly line: go generate runs tools that manufacture boilerplate code before the actual build begins, saving you from writing repetitive code by hand.',
            codeHighlightLines: [6, 18, 26],
          },
          {
            heading: 'Custom Code Generators',
            content:
              'You can write custom code generators in Go using `text/template` or direct string building. The generator reads source files, processes them, and writes generated Go code.',
            code: '// generator/main.go -- A simple custom generator\npackage main\n\nimport (\n    "fmt"\n    "os"\n    "strings"\n    "text/template"\n)\n\n// enumTemplate is a Go template string (defined with backticks)\n// that generates String() and Parse methods for enum types.\n\ntype EnumData struct {\n    Package string\n    Type    string\n    Values  []string\n}\n\nfunc main() {\n    data := EnumData{\n        Package: "main",\n        Type:    "Status",\n        Values:  []string{"Active", "Inactive", "Deleted"},\n    }\n\n    // Template generates switch-based String() method\n    tmplStr := "// Code generated; DO NOT EDIT.\\n" +\n        "package {{.Package}}\\n\\n" +\n        "func (e {{.Type}}) String() string {\\n" +\n        "    switch e {\\n" +\n        "    {{range .Values}}case {{.}}:\\n" +\n        "        return \\"{{.}}\\"\\n" +\n        "    {{end}}default:\\n" +\n        "        return \\"unknown\\"\\n    }\\n}"\n\n    tmpl := template.Must(template.New("enum").Parse(tmplStr))\n    tmpl.Execute(os.Stdout, data)\n    _ = strings\n    _ = fmt.Sprintf\n}',
            output: `// Code generated by enumgen; DO NOT EDIT.
package main

import "fmt"

func (e Status) String() string {
    switch e {
    case Active:
        return "Active"
    case Inactive:
        return "Inactive"
    case Deleted:
        return "Deleted"
    default:
        return fmt.Sprintf("Status(%d)", int(e))
    }
}`,
            note: 'Generated files should start with `// Code generated ... DO NOT EDIT.` so tools and linters know not to modify them.',
          },
        ],
        quiz: [
          {
            question: 'What does the //go:generate directive do?',
            options: [
              'Generates Go code automatically at compile time',
              'Marks a directive that is executed when you run go generate, before building',
              'Creates test files automatically',
              'Generates documentation from comments',
            ],
            correctIndex: 1,
            explanation: '//go:generate directives specify commands to run when you explicitly execute go generate ./... These commands are not run during normal builds -- they must be run manually or in CI before building.',
          },
          {
            question: 'What is the stringer tool commonly used for with go generate?',
            options: [
              'Generating JSON serialization code',
              'Generating String() methods for enum (iota) types',
              'Converting structs to strings',
              'Generating string validation code',
            ],
            correctIndex: 1,
            explanation: 'The stringer tool generates a String() method for integer-based enum types (using iota). This provides human-readable names when printing enum values instead of raw integers.',
          },
          {
            question: 'Should generated files be committed to version control?',
            options: [
              'No, they should always be in .gitignore',
              'Yes, so builds work without requiring generator tools to be installed',
              'Only in production branches',
              'Only if they are test files',
            ],
            correctIndex: 1,
            explanation: 'Generated files should be committed to version control. This ensures that the project can be built without requiring all code generation tools to be installed, and it makes code review of generated changes possible.',
          },
        ],
        challenge: {
          prompt: 'Write an enum type called Direction with values North, South, East, West using iota. Then manually write a String() method using a switch statement that returns the direction name as a string (simulating what stringer would generate).',
          starterCode: `package main

import "fmt"

// Define the Direction type and constants with iota

// Write a String() method for Direction

func main() {
    d := North
    fmt.Println(d)
    fmt.Println(East)
}
`,
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
    switch d {
    case North:
        return "North"
    case South:
        return "South"
    case East:
        return "East"
    case West:
        return "West"
    default:
        return fmt.Sprintf("Direction(%d)", int(d))
    }
}

func main() {
    d := North
    fmt.Println(d)
    fmt.Println(East)
}`,
          hints: [
            'Define type Direction int, then use const with iota to create the enum values.',
            'The String() method should use a switch on the Direction value and return the matching name.',
            'Include a default case that formats unknown values as Direction(N) for safety.',
          ],
        },
      },
      {
        id: 'embedding',
        title: 'Embed Directive',
        difficulty: 'advanced',
        tags: ['embed', 'go-embed', 'static-files', 'binary'],
        cheatSheetSummary:
          '`//go:embed` embeds files into the binary at compile time. Supports single files (string/[]byte) and directories (embed.FS).',
        crossLanguageId: 'embed',
        sections: [
          {
            heading: 'Embedding Files with //go:embed',
            content:
              'The `embed` package (Go 1.16+) embeds files directly into the compiled binary using `//go:embed` directives. This eliminates the need to distribute files alongside your binary. Embed into `string`, `[]byte`, or `embed.FS` for multiple files.',
            code: `package main

import (
    "embed"
    "fmt"
)

// Embed a single file as string
//go:embed version.txt
var version string

// Embed a single file as bytes
//go:embed logo.png
var logo []byte

// Embed multiple files / directories
//go:embed templates/*
var templates embed.FS

// Embed with patterns
//go:embed static/*.css static/*.js
var staticFiles embed.FS

func main() {
    // Use embedded string
    fmt.Println("Version:", version)

    // Use embedded bytes
    fmt.Printf("Logo size: %d bytes\\n", len(logo))

    // Read from embedded filesystem
    data, err := templates.ReadFile("templates/index.html")
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Template:", string(data))

    // List embedded files
    entries, _ := templates.ReadDir("templates")
    for _, e := range entries {
        fmt.Println("File:", e.Name())
    }
}`,
            output: `Version: 1.0.0
Logo size: 4096 bytes
Template: <html><body>Hello!</body></html>
File: index.html
File: style.css`,
            tip: 'Use `embed.FS` for serving static files in web servers. It works directly with `http.FileServer`: `http.FileServer(http.FS(staticFiles))`.',
            analogy: 'Think of it like vacuum-sealing items into a package: go:embed bakes files directly into the compiled binary at build time, so you ship one self-contained executable with no external file dependencies.',
            codeHighlightLines: [9, 10, 13, 14, 17, 18, 21, 22],
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart LR
    A["version.txt"] -->|"//go:embed"| B["var version string"]
    C["logo.png"] -->|"//go:embed"| D["var logo []byte"]
    E["templates/*"] -->|"//go:embed"| F["var templates embed.FS"]
    B --> G["Compiled Binary"]
    D --> G
    F --> G`,
              caption: 'Files are embedded at compile time into the Go binary',
            },
          },
          {
            heading: 'Practical: Embedded Web Server',
            content:
              'Embedding static files is especially powerful for web applications. Ship a single binary with all HTML, CSS, JS, and templates included. No external file dependencies.',
            code: `package main

import (
    "embed"
    "fmt"
    "html/template"
    "io/fs"
    "net/http"
    "strings"
)

//go:embed static
var staticContent embed.FS

//go:embed templates
var templateContent embed.FS

func main() {
    // Parse embedded templates
    tmpl, err := template.ParseFS(templateContent, "templates/*.html")
    if err != nil {
        fmt.Println("Template error:", err)
        return
    }

    // Serve embedded static files
    staticFS, _ := fs.Sub(staticContent, "static")
    http.Handle("/static/", http.StripPrefix("/static/",
        http.FileServer(http.FS(staticFS))))

    // Template handler
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        tmpl.ExecuteTemplate(w, "index.html", map[string]string{
            "Title": "Embedded App",
        })
    })

    // Show what's embedded
    entries, _ := staticContent.ReadDir("static")
    for _, e := range entries {
        fmt.Println("Embedded:", e.Name())
    }

    fmt.Println("Server: http://localhost:8080")
    // http.ListenAndServe(":8080", nil)
    _ = strings.NewReader // suppress unused
}`,
            output: `Embedded: app.js
Embedded: style.css
Server: http://localhost:8080`,
            note: 'Embedded files are read-only and immutable at runtime. If you need to modify files, copy them from the embedded FS to disk first.',
          },
          {
            heading: 'Embed Patterns and Limitations',
            content:
              'The `//go:embed` directive supports glob patterns. Files starting with `.` or `_` are excluded by default unless explicitly named. The directive must be immediately before the variable declaration with no blank lines.',
            code: `package main

import (
    "embed"
    "fmt"
)

// Single file
//go:embed config.json
var config string

// Multiple patterns
//go:embed *.sql migrations/*.sql
var migrations embed.FS

// Include hidden files (must name explicitly)
//go:embed .env.example
var envExample string

// All files in directory (excluding hidden)
//go:embed data
var dataDir embed.FS

// RULES:
// 1. Directive must be immediately before var (no blank line)
// 2. Can only embed files in the module, not parent dirs
// 3. Patterns cannot contain .. or start with /
// 4. Files starting with . or _ need explicit names
// 5. Variable must be string, []byte, or embed.FS

func main() {
    fmt.Println("Config:", config)

    // Walk embedded filesystem
    fmt.Println("\\nMigrations:")
    entries, _ := migrations.ReadDir(".")
    for _, e := range entries {
        if e.IsDir() {
            sub, _ := migrations.ReadDir(e.Name())
            for _, s := range sub {
                fmt.Printf("  %s/%s\\n", e.Name(), s.Name())
            }
        } else {
            fmt.Printf("  %s\\n", e.Name())
        }
    }
}`,
            output: `Config: {"host": "localhost", "port": 8080}

Migrations:
  001_init.sql
  002_users.sql
  migrations/003_orders.sql`,
            tip: 'Use `embed.FS` with `fs.Sub` to create a sub-filesystem rooted at a specific directory. This is useful for serving nested static assets.',
          },
        ],
      },
    ],
  },
];

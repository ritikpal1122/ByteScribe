import type { DocCategory } from './types';

// Part 1: Getting Started + Basic Types
export const GO_PART1_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Getting Started                                              */
  /* ------------------------------------------------------------ */
  {
    id: 'getting-started',
    label: 'Getting Started',
    icon: 'Rocket',
    entries: [
      {
        id: 'hello-world',
        title: 'Hello World',
        difficulty: 'beginner',
        tags: ['basics', 'first-program', 'fmt', 'main'],
        cheatSheetSummary:
          'Every Go program starts with `package main` and a `func main()` entry point. Use `fmt.Println` for output.',
        crossLanguageId: 'hello-world',
        sections: [
          {
            heading: 'Your First Go Program',
            content:
              'Let\'s write your very first Go program, and in doing so, you\'ll immediately see what makes Go different from other languages. Every Go program begins with a `package` declaration. The `main` package is special -- it tells the Go compiler "this is an executable program, not a library." Inside that package, the `main()` function is your entry point -- it\'s where Go starts running your code, much like the front door of a house. To actually print something, you bring in the `fmt` package (short for "format"), which is part of Go\'s excellent standard library. The call to `fmt.Println` writes a line to the console. Notice how clean and minimal this is -- no semicolons, no class wrappers, no boilerplate. That simplicity is Go\'s entire philosophy: do more with less.',
            code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
            output: `Hello, World!`,
            tip: 'Go enforces clean code by design: unused imports and variables cause compile errors, not warnings. This might feel strict at first, but it prevents dead code from accumulating in your codebase. You\'ll learn to love it.',
            note: 'Go was created at Google in 2007 by Robert Griesemer, Rob Pike, and Ken Thompson -- the same Ken Thompson who co-created Unix and C. They designed Go because they were frustrated with the complexity of C++ and Java. The result is a language that compiles as fast as a scripting language runs, but produces binaries as efficient as C.',
            analogy: 'Think of it like a house: `package main` is the building itself, `import "fmt"` is the toolbox you bring in, and `func main()` is the front door where everything starts.',
            codeHighlightLines: [1, 3, 5, 6],
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    A["package main"] --> B["import \\"fmt\\""]\n    B --> C["func main()"]\n    C --> D["fmt.Println(...)"]\n    D --> E["Output to console"]\n    style A fill:#4db6ac,color:#fff\n    style C fill:#7986cb,color:#fff\n    style E fill:#81c784,color:#fff',
              caption: 'Anatomy of a Go program: package declaration, imports, then the main function entry point',
            },
          },
          {
            heading: 'Running Your Program',
            content:
              'Go gives you two ways to run your code, and understanding the difference is important. The `go run` command is your best friend during development -- it compiles your code to a temporary location and immediately executes it, all in one step. Think of it as "just run this thing." But when you\'re ready to ship, `go build` is where the magic happens: it compiles your program into a single, standalone binary with zero external dependencies. That binary is everything your program needs, rolled into one file. This is one of Go\'s killer features -- Docker, Kubernetes, and most cloud-native tools are written in Go precisely because deployment is as simple as copying a single file. No runtime to install, no dependency hell, no "works on my machine" problems.',
            code: `// Save this as main.go, then run it:

// Method 1: Compile and run in one step
// $ go run main.go
// Hello, World!

// Method 2: Build a binary, then run it
// $ go build -o hello main.go
// $ ./hello
// Hello, World!

// Method 3: Run all .go files in current directory
// $ go run .

package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    fmt.Println("Go is simple, fast, and concurrent.")
}`,
            output: `Hello, World!
Go is simple, fast, and concurrent.`,
            note: 'Go binaries are statically linked by default. You can compile a binary on your Mac, copy it to a Linux server, and it just works (as long as you cross-compiled for the right OS/architecture). No interpreter, no virtual machine, no shared libraries needed. This is why Go dominates in the container and microservices world.',
            analogy: 'Think of it like cooking: `go run` is tasting as you cook (quick feedback), while `go build` is plating the finished dish (ready to serve anywhere).',
          },
          {
            heading: 'Understanding package and import',
            content:
              'Go organizes all code into packages -- think of them as folders of related functionality. Every single `.go` file must start with a `package` declaration; there are no exceptions. The `import` statement is how you bring in code from other packages, and Go\'s convention is to group them inside parentheses when you have more than one (though single imports work fine without them). Here\'s a detail that trips up newcomers from Python or JavaScript: in Go, whether a name is exported (public) or unexported (private) is determined entirely by capitalization. If it starts with an uppercase letter like `Println`, it\'s exported and accessible from other packages. Lowercase means it\'s package-private. No `public`/`private` keywords needed -- the convention IS the mechanism. It\'s one of those design choices that seems odd at first but becomes second nature fast.',
            code: `package main

// Grouped imports (idiomatic style)
import (
    "fmt"
    "math"
    "strings"
)

func main() {
    // fmt.Println is exported (uppercase P)
    fmt.Println("Pi is approximately", math.Pi)
    fmt.Println(strings.ToUpper("hello go"))
}`,
            output: `Pi is approximately 3.141592653589793
HELLO GO`,
            tip: 'Use `goimports` or your editor\'s Go extension to automatically add and remove imports on save. Seriously, set this up before writing another line of Go. You should almost never manage imports manually -- let the tooling handle it.',
            codeHighlightLines: [4, 5, 6, 7, 12, 13],
          },
        ],
        quiz: [
          {
            question: 'What is the special package name that tells the Go compiler this is an executable program?',
            options: ['package app', 'package main', 'package exec', 'package program'],
            correctIndex: 1,
            explanation: 'The `main` package is special in Go -- it tells the compiler to produce an executable binary. The `main()` function inside this package is the entry point.',
          },
          {
            question: 'What happens if you import a package in Go but never use it?',
            options: ['Nothing, it is ignored', 'A warning is shown', 'A compile error occurs', 'It is automatically removed'],
            correctIndex: 2,
            explanation: 'Go enforces clean code: unused imports cause compile errors, not warnings. Use tools like `goimports` to manage imports automatically.',
          },
          {
            question: 'How does Go determine if a name is exported (public) from a package?',
            options: ['Using the `public` keyword', 'Using the `export` keyword', 'The name starts with an uppercase letter', 'By placing it in a special exports file'],
            correctIndex: 2,
            explanation: 'In Go, capitalization determines visibility. Names starting with an uppercase letter (like `Println`) are exported; lowercase names are package-private.',
          },
          {
            question: 'What is the difference between `go run` and `go build`?',
            options: [
              '`go run` only checks syntax, `go build` compiles',
              '`go run` compiles and executes immediately, `go build` produces a binary file',
              '`go run` is for testing, `go build` is for production',
              'There is no difference',
            ],
            correctIndex: 1,
            explanation: '`go run` compiles to a temporary location and runs immediately -- great for development. `go build` produces a standalone binary that you can distribute and deploy.',
          },
        ],
        challenge: {
          prompt: 'Write a Go program that imports the `fmt` and `strings` packages, then prints your name in uppercase using `strings.ToUpper` and `fmt.Println`.',
          starterCode: `package main

// Import the necessary packages here

func main() {
    name := "gopher"
    // Convert name to uppercase and print it
}`,
          solutionCode: `package main

import (
    "fmt"
    "strings"
)

func main() {
    name := "gopher"
    fmt.Println(strings.ToUpper(name))
}`,
          hints: [
            'Use grouped imports with parentheses: import ("fmt" "strings")',
            'strings.ToUpper() takes a string and returns the uppercase version',
            'Pass the result of strings.ToUpper(name) directly to fmt.Println()',
          ],
        },
      },
      {
        id: 'go-basics',
        title: 'Go Basics',
        difficulty: 'beginner',
        tags: ['module', 'workspace', 'project-setup', 'go-mod'],
        cheatSheetSummary:
          'Initialize projects with `go mod init <module>`. Use `go run .` to run, `go build` to compile, `go mod tidy` to clean deps.',
        sections: [
          {
            heading: 'Go Modules',
            content:
              'Go modules are how you manage dependencies in modern Go, and they solved one of the language\'s biggest early pain points. Before modules (pre-Go 1.11), dependency management was a mess involving `GOPATH` and various third-party tools. Now, every Go project starts with `go mod init`, which creates a `go.mod` file -- think of it as Go\'s equivalent of `package.json` or `requirements.txt`, but with built-in cryptographic verification of every dependency via `go.sum`. The module path is typically your repository URL (like `github.com/username/project`), which makes your code importable by anyone in the world. When you `go build` or `go run`, Go automatically downloads any missing dependencies. It\'s a beautifully integrated system.',
            code: `// Initialize a new module
// $ mkdir myproject && cd myproject
// $ go mod init github.com/username/myproject

// go.mod file created:
// module github.com/username/myproject
//
// go 1.22

// Add a dependency
// $ go get github.com/gin-gonic/gin@latest

// Remove unused dependencies
// $ go mod tidy

// Download all dependencies to local cache
// $ go mod download`,
            output: `go: creating new go.mod: module github.com/username/myproject`,
            tip: 'Run `go mod tidy` regularly -- it\'s like a cleanup crew for your dependencies. It removes unused ones, adds missing ones, and keeps your `go.mod` and `go.sum` files pristine. Many teams run it as part of CI to catch dependency drift.',
            analogy: 'Think of it like a recipe card: `go.mod` lists all the ingredients (dependencies) your project needs, and `go mod tidy` checks your pantry and removes anything you no longer use.',
          },
          {
            heading: 'Project Structure',
            content:
              'Go has strong opinions about project layout, and following the conventions will save you headaches. The `main` package (your entry point) typically lives at the root or inside `cmd/` if you have multiple executables. Here\'s where Go gets clever: the `internal/` directory is enforced by the compiler itself -- any package under `internal/` can only be imported by code in the parent directory tree. This isn\'t just a convention; the toolchain actually prevents outside code from reaching in. It\'s Go\'s way of letting you have private implementation details without relying on developer discipline alone. The `pkg/` directory holds reusable library code that you intend to be importable by external projects. Keep your packages small and focused -- a good Go package does one thing well.',
            code: `// Standard project layout:
// myproject/
// ├── go.mod
// ├── go.sum
// ├── main.go            // package main (entry point)
// ├── cmd/
// │   └── server/
// │       └── main.go    // another executable
// ├── internal/
// │   ├── handler/
// │   │   └── handler.go // package handler (private)
// │   └── model/
// │       └── user.go    // package model (private)
// └── pkg/
//     └── utils/
//         └── utils.go   // package utils (public)

package main

import "fmt"

func main() {
    fmt.Println("Project initialized!")
}`,
            output: `Project initialized!`,
            note: 'The `internal/` directory is enforced by the Go compiler itself, not just by convention. Packages under `internal/` can only be imported by code within the parent of the `internal/` directory. If someone tries to import your internal packages from outside your module, the build will fail with a clear error message. This is a powerful tool for API design.',
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    ROOT["myproject/"] --> GOMOD["go.mod"]\n    ROOT --> MAIN["main.go<br/>(entry point)"]\n    ROOT --> CMD["cmd/"]\n    ROOT --> INTERNAL["internal/<br/>(compiler-enforced private)"]\n    ROOT --> PKG["pkg/<br/>(public libraries)"]\n    CMD --> SERVER["server/main.go"]\n    INTERNAL --> HANDLER["handler/"]\n    INTERNAL --> MODEL["model/"]\n    PKG --> UTILS["utils/"]\n    style INTERNAL fill:#ef5350,color:#fff\n    style PKG fill:#66bb6a,color:#fff\n    style MAIN fill:#42a5f5,color:#fff',
              caption: 'Standard Go project layout: internal/ is private (enforced by compiler), pkg/ is public, cmd/ holds executables',
            },
          },
          {
            heading: 'Build and Cross-Compilation',
            content:
              'Here\'s one of Go\'s most delightful features: cross-compilation is trivially easy. Want to build a Linux binary from your Mac? Just set two environment variables and run `go build`. That\'s it. No cross-compiler toolchain to install, no Docker container to spin up, no fiddling with build configurations. Go supports every major operating system (Linux, macOS, Windows, FreeBSD) and architecture (amd64, arm64, wasm, and more). This is a huge reason why Go dominates in cloud infrastructure and DevOps tooling -- you can build binaries for every platform from a single CI pipeline. The `runtime` package lets your code introspect which platform it\'s running on, which is handy for platform-specific behavior.',
            code: `// Build for current platform
// $ go build -o myapp .

// Cross-compile for Linux
// $ GOOS=linux GOARCH=amd64 go build -o myapp-linux .

// Cross-compile for Windows
// $ GOOS=windows GOARCH=amd64 go build -o myapp.exe .

// Cross-compile for ARM (e.g., Raspberry Pi)
// $ GOOS=linux GOARCH=arm64 go build -o myapp-arm .

// List all supported platforms
// $ go tool dist list

package main

import (
    "fmt"
    "runtime"
)

func main() {
    fmt.Printf("OS: %s, Arch: %s\\n", runtime.GOOS, runtime.GOARCH)
    fmt.Printf("Go version: %s\\n", runtime.Version())
    fmt.Printf("Num CPUs: %d\\n", runtime.NumCPU())
}`,
            output: `OS: linux, Arch: amd64
Go version: go1.22.0
Num CPUs: 8`,
            tip: 'Go binaries are statically linked by default, meaning the compiled binary is completely self-contained. This is why Go is the language of choice for CLI tools and microservices -- deployment is literally "copy one file." Tools like Terraform, Docker, and kubectl are all single Go binaries.',
            codeHighlightLines: [5, 8, 11, 23, 24, 25],
          },
        ],
        quiz: [
          {
            question: 'What file does `go mod init` create?',
            options: ['package.json', 'go.sum', 'go.mod', 'Makefile'],
            correctIndex: 2,
            explanation: '`go mod init` creates a `go.mod` file that tracks your module path and dependencies, similar to `package.json` in Node.js or `requirements.txt` in Python.',
          },
          {
            question: 'What does the `internal/` directory enforce in a Go project?',
            options: [
              'Code inside it runs faster',
              'Packages can only be imported by code within the parent directory tree',
              'It is ignored by the compiler',
              'It contains test files only',
            ],
            correctIndex: 1,
            explanation: 'The `internal/` directory is enforced by the Go compiler. Packages under `internal/` can only be imported by code in the parent directory tree, providing true encapsulation.',
          },
          {
            question: 'How do you cross-compile a Go program for Linux on a Mac?',
            options: [
              'Install a Linux cross-compiler toolchain',
              'Use Docker to build inside a Linux container',
              'Set GOOS=linux GOARCH=amd64 before `go build`',
              'It is not possible without a VM',
            ],
            correctIndex: 2,
            explanation: 'Go makes cross-compilation trivial. Just set the `GOOS` and `GOARCH` environment variables and run `go build`. No extra tools needed.',
          },
        ],
        challenge: {
          prompt: 'Write a Go program that uses the `runtime` package to print the current operating system, architecture, and Go version on separate lines with descriptive labels.',
          starterCode: `package main

import (
    "fmt"
    // Import the runtime package
)

func main() {
    // Print OS, Architecture, and Go version using runtime package
}`,
          solutionCode: `package main

import (
    "fmt"
    "runtime"
)

func main() {
    fmt.Println("OS:", runtime.GOOS)
    fmt.Println("Arch:", runtime.GOARCH)
    fmt.Println("Go Version:", runtime.Version())
}`,
          hints: [
            'Import the "runtime" package from the standard library',
            'Use runtime.GOOS, runtime.GOARCH, and runtime.Version()',
            'runtime.GOOS and runtime.GOARCH are string constants, runtime.Version() is a function',
          ],
        },
      },
      {
        id: 'variables',
        title: 'Variables',
        difficulty: 'beginner',
        tags: ['var', 'short-declaration', 'zero-values', 'type-inference'],
        cheatSheetSummary:
          'Use `:=` for short declaration inside functions. Use `var` for package-level or explicit type. Zero values: 0, "", false, nil.',
        crossLanguageId: 'variables',
        sections: [
          {
            heading: 'Variable Declaration: var vs :=',
            content:
              'Go gives you two ways to declare variables, and knowing when to use each is key to writing idiomatic code. The `var` keyword is the explicit form -- it works everywhere, including at the package level (outside any function). The `:=` short declaration operator is Go\'s way of saying "figure out the type for me and assign this value," and it\'s what you\'ll use 90% of the time inside functions. The key insight: `:=` both declares AND assigns in one shot, while `var` can declare a variable without assigning anything (it gets the zero value). One gotcha for newcomers: `:=` only works inside functions. At the package level, you must use `var`. This is intentional -- Go wants package-level declarations to be explicit and obvious.',
            code: `package main

import "fmt"

// Package-level: must use var (no := outside functions)
var globalCount int = 100

func main() {
    // var with explicit type
    var name string = "Alice"

    // var with type inference
    var age = 30

    // Short declaration (preferred inside functions)
    score := 95.5

    // Multiple declarations
    var x, y int = 10, 20
    a, b := "hello", true

    fmt.Println(name, age, score)
    fmt.Println(x, y, a, b)
    fmt.Println("global:", globalCount)
}`,
            output: `Alice 30 95.5
10 20 hello true
global: 100`,
            tip: 'Use `:=` for most local variables -- it\'s cleaner and more idiomatic. Reserve `var` for cases where you need an explicit type (e.g., `var n int64 = 5` instead of `n := 5` which defaults to `int`), or when you want to declare a variable without initializing it.',
            codeHighlightLines: [6, 10, 13, 16, 19, 20],
          },
          {
            heading: 'Zero Values',
            content:
              'This is one of Go\'s most underappreciated design decisions: every type has a well-defined zero value. When you declare a variable without initializing it, Go doesn\'t leave it with random garbage in memory (like C) or throw an error (like some strict languages). Instead, it gives you a sensible default: `0` for numbers, `""` for strings, `false` for booleans, and `nil` for pointers, slices, maps, channels, interfaces, and functions. This completely eliminates the class of bugs caused by uninitialized variables. Many Go types are actually designed to be useful at their zero value -- for example, a zero-value `sync.Mutex` is an unlocked mutex, ready to use. The Go community calls this "make the zero value useful," and it\'s a core design principle.',
            code: `package main

import "fmt"

func main() {
    var zeroInt int
    var zeroFloat float64
    var zeroString string
    var zeroBool bool
    var zeroPtr *int
    var zeroSlice []int
    var zeroMap map[string]int

    fmt.Printf("int:     %d\\n", zeroInt)
    fmt.Printf("float64: %f\\n", zeroFloat)
    fmt.Printf("string:  %q\\n", zeroString)
    fmt.Printf("bool:    %t\\n", zeroBool)
    fmt.Printf("pointer: %v\\n", zeroPtr)
    fmt.Printf("slice:   %v (nil: %t)\\n", zeroSlice, zeroSlice == nil)
    fmt.Printf("map:     %v (nil: %t)\\n", zeroMap, zeroMap == nil)
}`,
            output: `int:     0
float64: 0.000000
string:  ""
bool:    false
pointer: <nil>
slice:   [] (nil: true)
map:     map[] (nil: true)`,
            warning: 'Here\'s a subtle but critical distinction: a nil slice is perfectly safe -- you can check its `len`, `cap`, and even `append` to it. But a nil map will panic the moment you try to write to it. Always initialize maps with `make()` or a literal before inserting keys. This is one of Go\'s most common beginner traps.',
            note: '"Make the zero value useful" is a core Go proverb. Types like `bytes.Buffer`, `sync.Mutex`, and `sync.WaitGroup` all work correctly at their zero value with no constructor needed. When designing your own types, strive for this same property.',
            analogy: 'Think of it like moving into a new apartment: Go gives every room default furniture (0 for numbers, "" for strings, false for bools). You never walk into a room and find random junk from the previous tenant.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Zero Values by Type',
                    type: 'stack',
                    values: [
                      { name: 'int', value: '0', highlight: false },
                      { name: 'float64', value: '0.0', highlight: false },
                      { name: 'string', value: '""', highlight: false },
                      { name: 'bool', value: 'false', highlight: false },
                      { name: '*int', value: 'nil', highlight: true },
                      { name: '[]int', value: 'nil', highlight: true },
                      { name: 'map[K]V', value: 'nil', highlight: true },
                    ],
                  },
                ],
              },
              caption: 'Every Go type has a well-defined zero value. Reference types (pointer, slice, map) zero to nil.',
            },
          },
          {
            heading: 'Var Blocks and Multiple Assignment',
            content:
              'Go supports grouping multiple `var` declarations in a block, just like you can group imports. This keeps related variables visually together and signals to readers that they belong to the same logical group. Multiple assignment is one of Go\'s most practical features -- you can swap values without a temporary variable, and you can capture multiple return values in one line (which you\'ll do constantly, since Go functions often return a value and an error). The blank identifier `_` is your way of telling Go "I know this function returns something here, but I don\'t need it." Without `_`, Go\'s strict unused-variable rule would force you to use every returned value.',
            code: `package main

import "fmt"

// Var block for related variables
var (
    width  = 100
    height = 200
    depth  = 50
)

func main() {
    // Multiple assignment
    x, y := 10, 20

    // Swap without temp variable
    x, y = y, x
    fmt.Println("After swap:", x, y)

    // Blank identifier to discard values
    _, remainder := divmod(17, 5)
    fmt.Println("Remainder:", remainder)

    // Redeclare with := if at least one var is new
    a := 1
    a, b := 2, 3 // OK: b is new
    fmt.Println(a, b)
}

func divmod(a, b int) (int, int) {
    return a / b, a % b
}`,
            output: `After swap: 20 10
Remainder: 2
2 3`,
            tip: 'With `:=`, at least one variable on the left must be new. This is incredibly useful for error handling: `val, err := fn1()` followed by `val2, err := fn2()` is valid because `val2` is new, even though `err` is being reused. You\'ll use this pattern hundreds of times in real Go code.',
          },
          {
            heading: 'Type Conversions',
            content:
              'Coming from Python or JavaScript, Go\'s approach to type conversions might feel rigid -- and that\'s entirely by design. Go has absolutely no implicit type conversions. You must explicitly convert using `T(value)` syntax, even between closely related types like `int` and `float64`. This prevents an entire category of subtle bugs where automatic type promotion silently changes your values (ever had JavaScript\'s `"1" + 2` give you `"12"` instead of `3`?). Go says: if you want a conversion, say so explicitly. The `strconv` package handles string-to-number conversions, and the type assertion syntax `val.(Type)` works for extracting concrete types from interfaces.',
            code: `package main

import (
    "fmt"
    "strconv"
)

func main() {
    // Numeric conversions (explicit only)
    var i int = 42
    var f float64 = float64(i)
    var u uint = uint(f)
    fmt.Println(i, f, u)

    // int <-> string (NOT direct cast!)
    n, _ := strconv.Atoi("123")    // string -> int
    s := strconv.Itoa(456)         // int -> string
    fmt.Println(n, s)

    // string(65) gives "A" (rune), NOT "65"
    fmt.Println(string(65))         // "A"
    fmt.Println(string(rune(9786))) // smiley

    // Type assertion (for interfaces)
    var val interface{} = "hello"
    str, ok := val.(string)
    fmt.Println(str, ok)
}`,
            output: `42 42 42
123 456
A
☺
hello true`,
            warning: 'This catches almost every Go beginner: `string(someInt)` does NOT convert a number to its string representation. It interprets the number as a Unicode code point and gives you the corresponding character. `string(65)` gives you `"A"`, not `"65"`. Always use `strconv.Itoa()` or `fmt.Sprintf("%d", n)` to convert numbers to strings.',
          },
        ],
        quiz: [
          {
            question: 'What is the difference between `var x = 10` and `x := 10`?',
            options: [
              '`var` is slower than `:=`',
              '`:=` can only be used inside functions, `var` works everywhere',
              '`var` creates a constant, `:=` creates a variable',
              'There is no difference',
            ],
            correctIndex: 1,
            explanation: 'The short declaration operator `:=` can only be used inside functions. At the package level, you must use `var`. Both support type inference, but `:=` is more concise.',
          },
          {
            question: 'What is the zero value of a `string` in Go?',
            options: ['nil', 'null', '"" (empty string)', 'undefined'],
            correctIndex: 2,
            explanation: 'Every type in Go has a well-defined zero value. For strings it is the empty string `""`, for numbers it is `0`, for booleans it is `false`, and for reference types it is `nil`.',
          },
          {
            question: 'What does `string(65)` produce in Go?',
            options: ['"65"', '"A"', 'A compile error', '"6" and "5" separately'],
            correctIndex: 1,
            explanation: '`string(someInt)` interprets the integer as a Unicode code point. 65 is the code point for "A". To get the string "65", use `strconv.Itoa(65)` or `fmt.Sprintf("%d", 65)`.',
          },
          {
            question: 'What happens when you declare a variable with `var m map[string]int` and then write `m["key"] = 1`?',
            options: [
              'It works fine and stores the value',
              'A compile error occurs',
              'A runtime panic occurs (nil map write)',
              'The value is silently discarded',
            ],
            correctIndex: 2,
            explanation: 'A nil map will panic on write. The zero value of a map is nil, and you must initialize it with `make(map[string]int)` or a literal before writing to it. Reading from a nil map is safe and returns the zero value.',
          },
        ],
        challenge: {
          prompt: 'Declare variables using both `var` and `:=` syntax. Create an integer, a float64, and a string. Then use `fmt.Printf` with format verbs to print each variable with its type (use `%T` for the type).',
          starterCode: `package main

import "fmt"

func main() {
    // Declare an integer using var

    // Declare a float64 using :=

    // Declare a string using :=

    // Print each with its type using fmt.Printf and %T
}`,
          solutionCode: `package main

import "fmt"

func main() {
    var age int = 25
    height := 5.9
    name := "Gopher"

    fmt.Printf("age: %v (type: %T)\\n", age, age)
    fmt.Printf("height: %v (type: %T)\\n", height, height)
    fmt.Printf("name: %v (type: %T)\\n", name, name)
}`,
          hints: [
            'Use `var variableName type = value` for explicit declaration',
            'Use `variableName := value` for short declaration with type inference',
            'The format verb %T prints the type of a value, e.g., fmt.Printf("%T", 42) prints "int"',
          ],
        },
      },
      {
        id: 'constants',
        title: 'Constants',
        difficulty: 'beginner',
        tags: ['const', 'iota', 'enum', 'compile-time'],
        cheatSheetSummary:
          'Constants use `const` and must be compile-time determinable. `iota` generates sequential integers for enum-like patterns.',
        crossLanguageId: 'constants',
        sections: [
          {
            heading: 'Declaring Constants',
            content:
              'Constants in Go are values that are fixed at compile time and can never change. Declare them with `const`, and the compiler will reject anything that can\'t be determined before the program runs (so no function calls or runtime values). But here\'s where Go constants get genuinely interesting: they can be "untyped." An untyped constant like `const Pi = 3.14159...` isn\'t locked to `float64` -- it\'s a high-precision abstract number that adapts to whatever context you use it in. You can assign it to a `float32`, `float64`, or use it in an expression with any compatible numeric type, all without explicit casting. This flexibility is unique to Go and gives you the best of both worlds: the safety of constants with the convenience of automatic type adaptation.',
            code: `package main

import "fmt"

const Pi = 3.14159265358979323846
const MaxRetries = 3
const AppName = "MyApp"

// Const block
const (
    StatusOK    = 200
    StatusNotFound = 404
    StatusError = 500
)

func main() {
    fmt.Println("Pi:", Pi)
    fmt.Println("App:", AppName)
    fmt.Println("Status:", StatusOK)

    // Untyped constants have high precision
    const big = 1e1000     // no overflow at compile time
    fmt.Println(big / 1e999) // 10

    // Untyped constants adapt to context
    const x = 42
    var f float64 = x  // works without cast
    var i int = x       // also works
    fmt.Println(f, i)
}`,
            output: `Pi: 3.141592653589793
App: MyApp
Status: 200
10
42 42`,
            tip: 'Untyped constants in Go have arbitrary precision -- they live in a mathematical world, not a machine word. The constant `1e1000` is perfectly valid even though no variable type on any computer can hold it. You can use it in compile-time expressions and only need it to fit in a real type when you actually assign it to a variable.',
            note: 'Go\'s untyped constants were inspired by the way mathematicians think about numbers. A mathematician doesn\'t say "42 is an int32" -- they just say "42." Go constants work the same way: they\'re ideal values that only get a concrete type when the context demands one.',
          },
          {
            heading: 'iota for Enumerations',
            content:
              'Go doesn\'t have a built-in `enum` keyword like Rust or Java, but it has something arguably more powerful: `iota`. Inside a `const` block, `iota` starts at 0 and automatically increments by 1 for each constant. The genius is that you can combine `iota` with expressions, and Go repeats the expression pattern for every subsequent line. This means you can create bitmasks (powers of 2) with `1 << iota`, size units with `1 << (10 * iota)`, or any other mathematical sequence -- all in a clean, declarative way. The `iota` identifier resets to 0 at the start of each new `const` block, so different sets of constants don\'t interfere with each other.',
            code: `package main

import "fmt"

// Basic enum
const (
    Sunday    = iota // 0
    Monday           // 1
    Tuesday          // 2
    Wednesday        // 3
    Thursday         // 4
    Friday           // 5
    Saturday         // 6
)

// Bitmask with iota
const (
    ReadPerm   = 1 << iota // 1 (001)
    WritePerm              // 2 (010)
    ExecPerm               // 4 (100)
)

// Size units
const (
    _  = iota             // skip 0
    KB = 1 << (10 * iota) // 1 << 10 = 1024
    MB                    // 1 << 20 = 1048576
    GB                    // 1 << 30
    TB                    // 1 << 40
)

func main() {
    fmt.Println("Wednesday:", Wednesday)
    fmt.Println("Permissions:", ReadPerm|WritePerm)
    fmt.Println("KB:", KB, "MB:", MB, "GB:", GB)
}`,
            output: `Wednesday: 3
Permissions: 3
KB: 1024 MB: 1048576 GB: 1073741824`,
            tip: 'Use the blank identifier `_` with `iota` to skip values. `_ = iota` at the start of a const block skips 0, which is useful when zero should mean "invalid" or "unset." The byte-size example above uses this to avoid defining a meaningless "bytes" constant.',
            warning: 'A common gotcha: if you add a new constant in the middle of an `iota` sequence, all subsequent values shift. This can silently break serialized data or database records that stored the old numeric values. For values that get persisted, consider using explicit numbers instead of `iota`.',
            analogy: 'Think of it like an automatic numbering machine: `iota` stamps 0 on the first line, 1 on the second, 2 on the third, and so on. You can feed it through a formula (like `1 << iota`) to get powers of 2 instead of sequential numbers.',
            codeHighlightLines: [7, 18, 19, 20, 25, 26],
          },
          {
            heading: 'Typed vs Untyped Constants',
            content:
              'Understanding the difference between typed and untyped constants unlocks a deeper level of Go fluency. An untyped constant like `const x = 42` is flexible -- Go will happily use it as an `int`, `int64`, `float64`, or any compatible numeric type depending on context. A typed constant like `const x int32 = 42` is locked to that specific type and requires explicit conversion to use with other types. The real power of typed constants shines when you create custom types for your enums. By declaring `type Weekday int` and using typed `iota` constants, you get a degree of type safety that prevents accidentally mixing up weekdays with, say, months -- something that plain `int` constants can\'t do. Add a `String()` method and Go\'s `fmt` package will automatically display the name instead of the number.',
            code: `package main

import "fmt"

// Typed constant
const typedMax int32 = 2147483647

// Untyped constant
const untypedMax = 2147483647

// Custom type with typed constants
type Weekday int

const (
    Sun Weekday = iota
    Mon
    Tue
    Wed
    Thu
    Fri
    Sat
)

func (d Weekday) String() string {
    names := [...]string{"Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday", "Saturday"}
    if d < Sun || d > Sat {
        return "Unknown"
    }
    return names[d]
}

func main() {
    // Untyped: works with any numeric type
    var a int64 = untypedMax
    var b float64 = untypedMax
    fmt.Println(a, b)

    // Typed: only works with matching type
    // var c int64 = typedMax  // ERROR: cannot use int32 as int64
    var c int32 = typedMax
    fmt.Println(c)

    // Custom type enum with String()
    day := Wed
    fmt.Println(day)
    fmt.Printf("Day number: %d\\n", day)
}`,
            output: `2147483647 2.147483647e+09
2147483647
Wednesday
Day number: 3`,
            note: 'Implementing the `String()` method on your custom enum type satisfies the `fmt.Stringer` interface. This means `fmt.Println`, `fmt.Sprintf`, and all the other formatting functions will automatically call your method to get a human-readable name. This pattern is so common in Go that the `stringer` tool can auto-generate these methods for you: `go generate` with `//go:generate stringer -type=Weekday`.',
          },
        ],
        quiz: [
          {
            question: 'What is `iota` in Go?',
            options: [
              'A mathematical constant like Pi',
              'An auto-incrementing integer generator in const blocks',
              'A built-in function for iteration',
              'A keyword for defining interfaces',
            ],
            correctIndex: 1,
            explanation: '`iota` is a special identifier in Go that starts at 0 and auto-increments by 1 for each constant in a `const` block. It resets to 0 at the start of each new const block.',
          },
          {
            question: 'What is an "untyped constant" in Go?',
            options: [
              'A constant whose type is unknown to the compiler',
              'A constant that adapts its type to the context where it is used',
              'A constant that cannot be assigned to any variable',
              'A constant declared without the `const` keyword',
            ],
            correctIndex: 1,
            explanation: 'Untyped constants in Go are high-precision abstract values that adapt to whatever type context they are used in. `const x = 42` can be used as int, int64, float64, etc. without explicit conversion.',
          },
          {
            question: 'How do you create a bitmask using `iota`?',
            options: [
              'Use `iota * 2`',
              'Use `1 << iota`',
              'Use `iota ** 2`',
              'Use `math.Pow(2, iota)`',
            ],
            correctIndex: 1,
            explanation: '`1 << iota` generates powers of 2 (1, 2, 4, 8, ...) which are perfect for bitmask/flag values. The expression pattern is repeated for each constant in the block.',
          },
        ],
        challenge: {
          prompt: 'Define a set of constants using `iota` to represent HTTP status code categories: Informational (starting at 100), Success (200), Redirection (300), ClientError (400), and ServerError (500). Then print each with its name.',
          starterCode: `package main

import "fmt"

// Define a custom type for status categories
// Use iota with a formula to generate 100, 200, 300, 400, 500

func main() {
    // Print each status category with its value
}`,
          solutionCode: `package main

import "fmt"

type StatusCategory int

const (
    Informational StatusCategory = (iota + 1) * 100 // 100
    Success                                          // 200
    Redirection                                      // 300
    ClientError                                      // 400
    ServerError                                      // 500
)

func main() {
    fmt.Println("Informational:", Informational)
    fmt.Println("Success:", Success)
    fmt.Println("Redirection:", Redirection)
    fmt.Println("ClientError:", ClientError)
    fmt.Println("ServerError:", ServerError)
}`,
          hints: [
            'iota starts at 0, so (iota + 1) gives you 1, 2, 3, 4, 5',
            'Multiply (iota + 1) by 100 to get the sequence 100, 200, 300, 400, 500',
            'Declare a custom type like `type StatusCategory int` and use it with the const block',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Basic Types                                                  */
  /* ------------------------------------------------------------ */
  {
    id: 'basic-types',
    label: 'Basic Types',
    icon: 'Type',
    entries: [
      {
        id: 'basic-types',
        title: 'Basic Types Overview',
        difficulty: 'beginner',
        tags: ['int', 'float', 'bool', 'byte', 'rune', 'numeric'],
        cheatSheetSummary:
          'Go types: int, int8-64, uint, uint8-64, float32/64, complex64/128, bool, string, byte (uint8), rune (int32).',
        crossLanguageId: 'basic-types',
        sections: [
          {
            heading: 'Numeric Types',
            content:
              'Go takes a refreshingly explicit approach to numeric types. Instead of a single "number" type (like JavaScript) or an automatically-resizing integer (like Python), Go gives you precise control over exactly how much memory each number uses. The plain `int` and `uint` types are platform-dependent -- they\'re 64 bits on modern 64-bit systems but 32 bits on 32-bit systems. When you need guaranteed sizes (for binary protocols, file formats, or interoperating with C), use the sized variants: `int8` through `int64` and their unsigned counterparts `uint8` through `uint64`. For decimal numbers, `float32` gives you about 7 digits of precision while `float64` gives you about 15 -- use `float64` by default unless memory is tight. Go even has built-in complex number support with `complex64` and `complex128`, which is rare among systems languages.',
            code: `package main

import (
    "fmt"
    "math"
    "unsafe"
)

func main() {
    var i int = 42
    var i8 int8 = 127          // -128 to 127
    var i64 int64 = 9223372036854775807
    var u uint = 42
    var f32 float32 = 3.14
    var f64 float64 = math.Pi

    fmt.Printf("int:     %d (size: %d bytes)\\n", i, unsafe.Sizeof(i))
    fmt.Printf("int8:    %d (size: %d byte)\\n", i8, unsafe.Sizeof(i8))
    fmt.Printf("int64:   %d\\n", i64)
    fmt.Printf("uint:    %d\\n", u)
    fmt.Printf("float32: %f\\n", f32)
    fmt.Printf("float64: %.15f\\n", f64)
}`,
            output: `int:     42 (size: 8 bytes)
int8:    127 (size: 1 byte)
int64:   9223372036854775807
uint:    42
float32: 3.140000
float64: 3.141592653589793`,
            tip: 'Use plain `int` for 95% of cases -- loop counters, indices, general-purpose numbers. Only reach for sized types like `int32` or `int64` when you\'re dealing with binary protocols, serialization formats, or performance-critical code where memory layout matters. The `int` type is optimized for your platform\'s word size.',
            note: 'Go\'s numeric types don\'t silently overflow like C -- but they don\'t panic either. Integer overflow wraps around (e.g., `int8(127) + 1` gives `-128`). If overflow matters in your code, you need to check for it explicitly.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Integer Sizes',
                    type: 'stack',
                    values: [
                      { name: 'int8', value: '1 byte (-128..127)', highlight: false },
                      { name: 'int16', value: '2 bytes (-32768..32767)', highlight: false },
                      { name: 'int32', value: '4 bytes (-2B..2B)', highlight: false },
                      { name: 'int64', value: '8 bytes (-9.2E..9.2E)', highlight: true },
                      { name: 'int', value: '8 bytes (platform)', highlight: true },
                    ],
                  },
                  {
                    label: 'Float Sizes',
                    type: 'stack',
                    values: [
                      { name: 'float32', value: '4 bytes (~7 digits)', highlight: false },
                      { name: 'float64', value: '8 bytes (~15 digits)', highlight: true },
                    ],
                  },
                ],
              },
              caption: 'Go numeric types mapped to their memory sizes and ranges',
            },
          },
          {
            heading: 'Boolean and Complex Types',
            content:
              'Go\'s `bool` type is straightforward: `true` or `false`, nothing else. But if you\'re coming from C, C++, or even JavaScript, here\'s an important difference: Go does not allow implicit conversion between integers and booleans. There\'s no "truthy" or "falsy" concept -- `if 1` is a compile error, not a true condition. You must write `if x != 0` explicitly. This might feel verbose at first, but it eliminates an enormous class of bugs where values are accidentally treated as boolean conditions. Go also includes built-in support for complex numbers, which is unusual for a systems programming language. They\'re first-class types with `complex64` (backed by two `float32` values) and `complex128` (backed by two `float64` values), complete with arithmetic operators and helper functions.',
            code: `package main

import "fmt"

func main() {
    // Boolean
    var b bool = true
    isReady := false
    fmt.Println("true && false:", b && isReady)
    fmt.Println("true || false:", b || isReady)
    fmt.Println("!true:", !b)

    // Complex numbers
    c1 := complex(3, 4)     // 3+4i
    c2 := 1 + 2i            // literal syntax
    fmt.Println("c1:", c1)
    fmt.Println("c2:", c2)
    fmt.Println("c1 + c2:", c1+c2)
    fmt.Println("Real part:", real(c1))
    fmt.Println("Imag part:", imag(c1))
}`,
            output: `true && false: false
true || false: true
!true: false
c1: (3+4i)
c2: (1+2i)
c1 + c2: (4+6i)
Real part: 3
Imag part: 4`,
            note: 'Unlike C/C++ where `0` is false and any non-zero value is true, Go requires explicit boolean expressions in all conditions. `if count` won\'t compile -- you must write `if count != 0`. This eliminates the classic `if (x = 5)` bug (which is an assignment, not a comparison) that has plagued C programmers for decades.',
          },
          {
            heading: 'Numeric Literals',
            content:
              'Go supports multiple number formats to make your code more readable and expressive. You can use underscores as visual separators anywhere in a numeric literal -- `1_000_000` is identical to `1000000` but far easier to read at a glance. For different bases, Go uses clear prefixes: `0x` for hexadecimal, `0o` for octal, and `0b` for binary. This is especially handy when working with bit manipulation, network protocols, or color values. Float literals support scientific notation with `e` for powers of ten, letting you express everything from Avogadro\'s number to Planck\'s constant naturally. All of these are compile-time features with zero runtime cost.',
            code: `package main

import "fmt"

func main() {
    // Underscore separators for readability
    billion := 1_000_000_000
    hex := 0xFF_FF
    fmt.Println("Billion:", billion)
    fmt.Println("Hex:", hex)

    // Different bases
    decimal := 42
    octal := 0o52        // octal prefix 0o
    hexVal := 0x2A       // hex prefix 0x
    binary := 0b101010   // binary prefix 0b
    fmt.Printf("dec=%d oct=%d hex=%d bin=%d\\n",
        decimal, octal, hexVal, binary)

    // Scientific notation
    avogadro := 6.022e23
    planck := 6.626e-34
    fmt.Printf("Avogadro: %e\\n", avogadro)
    fmt.Printf("Planck:   %e\\n", planck)
}`,
            output: `Billion: 1000000000
Hex: 65535
dec=42 oct=42 hex=42 bin=42
Avogadro: 6.022000e+23
Planck:   6.626000e-34`,
            tip: 'Use underscores liberally in large numbers for readability: `1_000_000` is much clearer than `1000000`, and `0xFF_FF_FF` is easier to parse than `0xFFFFFF`. The compiler strips them entirely -- they\'re purely for human eyes. This works for all numeric types including binary: `0b1111_0000`.',
          },
        ],
        quiz: [
          {
            question: 'What is the size of `int` on a 64-bit system in Go?',
            options: ['4 bytes', '8 bytes', 'It depends on the value', '2 bytes'],
            correctIndex: 1,
            explanation: 'The `int` type in Go is platform-dependent: 8 bytes (64 bits) on 64-bit systems and 4 bytes (32 bits) on 32-bit systems. Use sized types like `int32` or `int64` when you need a guaranteed size.',
          },
          {
            question: 'Does Go allow implicit conversion between integers and booleans?',
            options: [
              'Yes, 0 is false and non-zero is true like in C',
              'Yes, but only for the int type',
              'No, Go requires explicit boolean expressions',
              'Only in if statements',
            ],
            correctIndex: 2,
            explanation: 'Go does not have "truthy" or "falsy" values. `if 1` is a compile error. You must write explicit boolean expressions like `if x != 0`.',
          },
          {
            question: 'What happens when an `int8` variable with value 127 has 1 added to it?',
            options: [
              'It becomes 128',
              'A runtime panic occurs',
              'A compile error occurs',
              'It wraps around to -128',
            ],
            correctIndex: 3,
            explanation: 'Go integer overflow wraps around silently. `int8` has a range of -128 to 127, so `127 + 1` wraps to `-128`. Go does not panic on integer overflow -- you must check for it explicitly if it matters.',
          },
          {
            question: 'What format prefix is used for binary numeric literals in Go?',
            options: ['0d', '0b', '0x', '0o'],
            correctIndex: 1,
            explanation: 'Go uses `0b` for binary (e.g., `0b101010`), `0x` for hexadecimal, and `0o` for octal. Underscores can be used as separators in any numeric literal for readability.',
          },
        ],
        challenge: {
          prompt: 'Write a Go program that declares variables of types int, float64, and bool. Use `unsafe.Sizeof` to print the size in bytes of each variable, along with its value.',
          starterCode: `package main

import (
    "fmt"
    // Import the package needed for Sizeof
)

func main() {
    // Declare an int, float64, and bool variable
    // Print each value and its size in bytes using unsafe.Sizeof
}`,
          solutionCode: `package main

import (
    "fmt"
    "unsafe"
)

func main() {
    var i int = 42
    var f float64 = 3.14
    var b bool = true

    fmt.Printf("int:     %d (size: %d bytes)\\n", i, unsafe.Sizeof(i))
    fmt.Printf("float64: %f (size: %d bytes)\\n", f, unsafe.Sizeof(f))
    fmt.Printf("bool:    %t (size: %d bytes)\\n", b, unsafe.Sizeof(b))
}`,
          hints: [
            'Import "unsafe" to access the Sizeof function',
            'unsafe.Sizeof returns the size of a variable in bytes as a uintptr',
            'Use fmt.Printf with %d for integers, %f for floats, and %t for booleans',
          ],
        },
      },
      {
        id: 'strings',
        title: 'Strings',
        difficulty: 'beginner',
        tags: ['string', 'rune', 'byte', 'utf8', 'strings-package'],
        cheatSheetSummary:
          'Strings are immutable UTF-8 byte sequences. Use `rune` for characters. `strings` package for manipulation. Raw strings with backticks.',
        crossLanguageId: 'strings',
        sections: [
          {
            heading: 'String Basics',
            content:
              'Strings in Go are immutable sequences of bytes -- once created, you cannot change individual characters. They\'re typically UTF-8 encoded, which means Go handles international text natively without any special "Unicode string" type. There are two kinds of string literals: double-quoted strings (which process escape sequences like `\\n` and `\\t`) and raw strings using backticks (which preserve everything literally, including newlines and backslashes). Raw strings are a lifesaver for regex patterns, SQL queries, JSON templates, and file paths. One crucial detail that surprises many newcomers: `len()` on a string returns the number of bytes, not the number of characters. For ASCII text they\'re the same, but for Unicode text like Chinese or emoji, a single character can be 2-4 bytes.',
            code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    // Double-quoted (interpreted) strings\n    greeting := "Hello, World!\\n"\n    path := "C:\\\\Users\\\\Go"\n\n    // Raw strings use backticks for no escape processing\n    // Example: rawPath := `C:\\Users\\Go`\n    rawPath := "C:\\\\Users\\\\Go"\n\n    fmt.Print(greeting)\n    fmt.Println(path)\n    fmt.Println(rawPath)\n\n    // String length (bytes vs runes)\n    s := "Hello, 世界"\n    fmt.Println("Byte length:", len(s))           // 13\n    fmt.Println("Rune count:", len([]rune(s)))     // 9\n}',
            output: 'Hello, World!\nC:\\Users\\Go\nC:\\Users\\Go\nByte length: 13\nRune count: 9',
            tip: 'Use raw strings (backticks) for regex patterns, SQL queries, JSON templates, and file paths to avoid the backslash escape nightmare. Compare `"C:\\\\Users\\\\Go\\\\file.txt"` vs the backtick equivalent -- your future self will thank you.',
            note: 'Go\'s decision to make strings immutable byte sequences (rather than character arrays) was deliberate. It means string operations like slicing and passing to functions are cheap -- they just copy a small header (pointer + length), not the entire string data. The immutability guarantee also makes strings safe to share across goroutines without locks.',
          },
          {
            heading: 'Runes and UTF-8',
            content:
              'This is where Go\'s string model gets truly interesting, and understanding it deeply will save you from a whole class of bugs. A `rune` is Go\'s name for a Unicode code point -- it\'s an alias for `int32`, big enough to hold any character from any language on Earth (plus emoji). A `byte` is an alias for `uint8` -- a single byte. Here\'s the key insight: when you index into a string with `s[i]`, you get a byte, not a character. For ASCII text this works fine (one byte = one character), but the Chinese character "世" takes 3 bytes in UTF-8, so `s[7]` would give you the first byte of that character, not the character itself. The `range` loop is your best friend here -- it automatically decodes UTF-8 and gives you one rune at a time, along with the byte index where each rune starts.',
            code: `package main

import (
    "fmt"
    "unicode/utf8"
)

func main() {
    s := "Hello, 世界"

    // Indexing gives bytes, not runes
    fmt.Printf("Byte at 0: %c (%d)\\n", s[0], s[0])

    // range iterates runes (decodes UTF-8)
    for i, r := range s {
        fmt.Printf("Index %2d: %c (U+%04X)\\n", i, r, r)
    }

    // Convert to rune slice for random access
    runes := []rune(s)
    fmt.Printf("Rune at 7: %c\\n", runes[7])

    // Count runes properly
    fmt.Println("Rune count:", utf8.RuneCountInString(s))

    // Rune literals
    var r rune = '世'
    fmt.Printf("Rune: %c, Code: %d\\n", r, r)
}`,
            output: `Byte at 0: H (72)
Index  0: H (U+0048)
Index  1: e (U+0065)
Index  2: l (U+006C)
Index  3: l (U+006C)
Index  4: o (U+006F)
Index  5: , (U+002C)
Index  6:   (U+0020)
Index  7: 世 (U+4E16)
Index 10: 界 (U+754C)
Rune count: 9
Rune: 世, Code: 19990`,
            warning: 'Never use `len()` on strings to count characters -- it counts bytes, not runes. The string `"Hello, 世界"` has 9 characters but is 13 bytes long because each Chinese character takes 3 bytes in UTF-8. Use `utf8.RuneCountInString()` or `len([]rune(s))` for the true character count. This is the single most common string bug in Go code.',
            analogy: 'Think of it like a bookshelf: `len(s)` counts the total inches of shelf space (bytes), while `RuneCountInString(s)` counts the number of books (characters). A fat book (multi-byte rune like "世") takes more inches but is still one book.',
            diagram: {
              kind: 'custom',
              type: 'array',
              data: {
                values: ['H', 'e', 'l', 'l', 'o', ',', ' ', 'E4', 'B8', '96', 'E7', '95', '8C'],
                highlightIndices: [7, 8, 9, 10, 11, 12],
                title: 'Bytes of "Hello, 世界"',
              },
              caption: 'ASCII chars use 1 byte each, but "世" (bytes 7-9) and "界" (bytes 10-12) use 3 bytes each in UTF-8',
            },
          },
          {
            heading: 'String Operations',
            content:
              'For day-to-day string manipulation, Go\'s `strings` package is your toolbox. It provides everything you\'d expect: searching (`Contains`, `HasPrefix`, `HasSuffix`), transforming (`ToUpper`, `ToLower`, `Replace`), splitting and joining, and trimming whitespace. Concatenation with `+` works for simple cases, but here\'s a performance insight that separates beginners from experienced Go developers: since strings are immutable, every `+` creates a brand new string and copies all the data. Doing this in a loop is O(n^2) and can be painfully slow for large strings. The `strings.Builder` type solves this by accumulating bytes in a growable buffer and only creating the final string once, giving you O(n) performance. Use it whenever you\'re building strings incrementally.',
            code: `package main

import (
    "fmt"
    "strings"
)

func main() {
    // Concatenation
    full := "Hello" + ", " + "World"
    fmt.Println(full)

    // Comparison
    fmt.Println("abc" == "abc")  // true
    fmt.Println("abc" < "abd")   // true (lexicographic)

    // strings package
    fmt.Println(strings.Contains("seafood", "foo"))
    fmt.Println(strings.HasPrefix("golang", "go"))
    fmt.Println(strings.HasSuffix("image.png", ".png"))
    fmt.Println(strings.Replace("oink oink", "oink", "moo", -1))
    fmt.Println(strings.Split("a,b,c", ","))
    fmt.Println(strings.Join([]string{"a", "b", "c"}, "-"))
    fmt.Println(strings.TrimSpace("  hello  "))

    // Efficient concatenation with Builder
    var sb strings.Builder
    for i := 0; i < 5; i++ {
        fmt.Fprintf(&sb, "item%d ", i)
    }
    fmt.Println(sb.String())
}`,
            output: `Hello, World
true
true
true
true
true
moo moo
[a b c]
a-b-c
hello
item0 item1 item2 item3 item4`,
            tip: 'Never concatenate strings in a loop with `+` -- each iteration allocates a new string and copies everything. For 1000 iterations on a 1KB string, that\'s ~500MB of allocations! Use `strings.Builder` for O(n) performance. For joining a slice of strings, `strings.Join` is even cleaner.',
          },
        ],
        quiz: [
          {
            question: 'What does `len("Hello, 世界")` return in Go?',
            options: ['9 (number of characters)', '13 (number of bytes)', '11', 'It depends on the platform'],
            correctIndex: 1,
            explanation: '`len()` on a string returns the number of bytes, not characters. "Hello, " is 7 bytes, and each Chinese character takes 3 bytes in UTF-8, so the total is 7 + 3 + 3 = 13 bytes.',
          },
          {
            question: 'What is a `rune` in Go?',
            options: [
              'An alias for byte (uint8)',
              'An alias for int32, representing a Unicode code point',
              'A special string type',
              'An alias for int16',
            ],
            correctIndex: 1,
            explanation: 'A `rune` is an alias for `int32` and represents a single Unicode code point. It can hold any character from any language. A `byte` is an alias for `uint8`.',
          },
          {
            question: 'Why should you avoid concatenating strings with `+` in a loop?',
            options: [
              'It causes a compile error',
              'It produces incorrect results',
              'Each concatenation allocates a new string and copies all data, leading to O(n^2) performance',
              'The `+` operator is not defined for strings',
            ],
            correctIndex: 2,
            explanation: 'Since strings are immutable, every `+` creates a new string and copies all existing data. In a loop, this leads to O(n^2) allocations. Use `strings.Builder` for O(n) performance.',
          },
        ],
        challenge: {
          prompt: 'Write a Go program that takes the string "Hello, 世界!" and prints: (1) its byte length, (2) its rune count, and (3) each rune with its byte index using a `range` loop.',
          starterCode: `package main

import (
    "fmt"
    // Import the utf8 package
)

func main() {
    s := "Hello, 世界!"

    // Print byte length

    // Print rune count

    // Use range to iterate and print each rune with its index
}`,
          solutionCode: `package main

import (
    "fmt"
    "unicode/utf8"
)

func main() {
    s := "Hello, 世界!"

    fmt.Println("Byte length:", len(s))
    fmt.Println("Rune count:", utf8.RuneCountInString(s))

    for i, r := range s {
        fmt.Printf("Index %2d: %c (U+%04X)\\n", i, r, r)
    }
}`,
          hints: [
            'Use len(s) for byte length and utf8.RuneCountInString(s) for rune count',
            'The range loop on a string automatically decodes UTF-8 and yields (byte_index, rune) pairs',
            'Use %c to print the character and %04X to print its Unicode code point in hex',
          ],
        },
      },
      {
        id: 'arrays',
        title: 'Arrays',
        difficulty: 'beginner',
        tags: ['array', 'fixed-size', 'value-type'],
        cheatSheetSummary:
          'Arrays have fixed size as part of the type: `[5]int`. Value type (copies on assign). Use slices instead for most cases.',
        crossLanguageId: 'arrays',
        sections: [
          {
            heading: 'Array Declaration and Usage',
            content:
              'Arrays in Go work differently from almost every other language you might know, and understanding this is crucial before you move on to slices. The size of an array is part of its type: `[5]int` and `[10]int` are completely different types that cannot be assigned to each other. This means you can\'t write a function that accepts arrays of any size -- a function taking `[5]int` won\'t accept a `[3]int`. Because of this rigidity, arrays are rarely used directly in Go code. Slices (which we\'ll cover next) are far more common and flexible. So why do arrays exist? They\'re the building block that slices are built on top of, and they\'re useful in specific situations where you genuinely want a fixed-size, value-type collection -- think pixel buffers, SHA-256 hashes (`[32]byte`), or fixed-size lookup tables.',
            code: `package main

import "fmt"

func main() {
    // Declaration (zero-initialized)
    var a [5]int
    fmt.Println("Zero:", a)

    // Literal initialization
    b := [3]string{"go", "is", "fun"}
    fmt.Println("Literal:", b)

    // Size inferred from elements
    c := [...]int{1, 2, 3, 4, 5}
    fmt.Println("Inferred:", c)
    fmt.Println("Length:", len(c))

    // Indexed initialization
    d := [5]int{1: 10, 3: 30}
    fmt.Println("Indexed:", d) // [0 10 0 30 0]
}`,
            output: `Zero: [0 0 0 0 0]
Literal: [go is fun]
Inferred: [1 2 3 4 5]
Length: 5
Indexed: [0 10 0 30 0]`,
            tip: 'Use `[...]` with a literal to let the compiler count elements for you: `[...]int{1, 2, 3}` creates a `[3]int`. This avoids manually updating the size when you add or remove items, and it makes your intent clear: "I want exactly as many slots as I have values."',
            analogy: 'Think of it like a fixed-size egg carton: a `[12]int` carton always holds exactly 12 slots. You cannot cram a 13th egg in, and a `[6]int` carton is a completely different product even though both hold eggs.',
          },
          {
            heading: 'Arrays Are Value Types',
            content:
              'This is the single most important thing to know about Go arrays, and it surprises nearly everyone coming from other languages: arrays are value types. When you assign one array to another, Go copies every single element. When you pass an array to a function, the function gets its own complete copy. This is fundamentally different from Java, Python, JavaScript, and even C (where arrays decay to pointers). It means modifying a copy never affects the original, which is safe and predictable but can be expensive for large arrays. If you need to avoid the copy, pass a pointer with `&`. In practice, this value-type behavior is one of the reasons Go developers almost always use slices instead -- slices are reference types that share the underlying data.',
            code: `package main

import "fmt"

func modifyArray(arr [3]int) {
    arr[0] = 999
    fmt.Println("Inside function:", arr)
}

func modifyArrayPtr(arr *[3]int) {
    arr[0] = 999
}

func main() {
    // Arrays are values -- assignment copies
    original := [3]int{1, 2, 3}
    copy := original
    copy[0] = 99
    fmt.Println("Original:", original) // unchanged
    fmt.Println("Copy:", copy)

    // Passing to function copies
    modifyArray(original)
    fmt.Println("After func:", original) // unchanged

    // Use pointer to modify original
    modifyArrayPtr(&original)
    fmt.Println("After ptr func:", original) // changed

    // Comparison (same-size arrays can be compared)
    a := [3]int{1, 2, 3}
    b := [3]int{1, 2, 3}
    fmt.Println("Equal:", a == b)
}`,
            output: `Original: [1 2 3]
Copy: [99 2 3]
Inside function: [999 2 3]
After func: [1 2 3]
After ptr func: [999 2 3]
Equal: true`,
            note: 'A useful consequence of arrays being value types: arrays of the same type and size can be compared directly with `==`. This works element-by-element and returns true only if every element matches. Slices, by contrast, cannot be compared with `==` (except to `nil`) -- you need `slices.Equal()` from the standard library.',
            diagram: {
              kind: 'mermaid',
              code: 'graph LR\n    subgraph "original := [3]int{1, 2, 3}"\n        O1["1"] --- O2["2"] --- O3["3"]\n    end\n    subgraph "copy := original (full copy)"\n        C1["1"] --- C2["2"] --- C3["3"]\n    end\n    O1 -.->|"copies all elements"| C1\n    style O1 fill:#42a5f5,color:#fff\n    style O2 fill:#42a5f5,color:#fff\n    style O3 fill:#42a5f5,color:#fff\n    style C1 fill:#66bb6a,color:#fff\n    style C2 fill:#66bb6a,color:#fff\n    style C3 fill:#66bb6a,color:#fff',
              caption: 'Arrays are value types: assignment copies every element into independent memory',
            },
          },
          {
            heading: 'Multi-Dimensional Arrays',
            content:
              'Go supports multi-dimensional arrays as arrays of arrays, which is useful for fixed-size grids, matrices, game boards, and image buffers. A `[3][4]int` is an array of 3 elements, where each element is itself a `[4]int`. The memory layout is contiguous (row-major), which is great for cache performance. Access elements with multiple indices like `matrix[row][col]`. For most real-world use cases involving dynamic sizes, you\'ll want slices of slices instead, but fixed-size multi-dimensional arrays have their place in performance-sensitive code.',
            code: `package main

import "fmt"

func main() {
    // 2D array (3x4 matrix)
    var matrix [3][4]int
    matrix[0][0] = 1
    matrix[1][2] = 5
    matrix[2][3] = 9

    // Print matrix
    for i, row := range matrix {
        fmt.Printf("Row %d: %v\\n", i, row)
    }

    // Literal initialization
    grid := [2][3]int{
        {1, 2, 3},
        {4, 5, 6},
    }
    fmt.Println("\\nGrid:", grid)
    fmt.Println("Element [1][2]:", grid[1][2])
}`,
            output: `Row 0: [1 0 0 0]
Row 1: [0 0 5 0]
Row 2: [0 0 0 9]

Grid: [[1 2 3] [4 5 6]]
Element [1][2]: 6`,
            tip: 'For dynamic-sized 2D data, use slices of slices (`[][]int`) instead of arrays. But remember that slices of slices are not contiguous in memory -- each inner slice is a separate allocation. For performance-critical matrix math, consider using a single flat slice with manual index calculation: `matrix[row*cols + col]`.',
          },
        ],
        quiz: [
          {
            question: 'Are `[3]int` and `[5]int` the same type in Go?',
            options: [
              'Yes, they are both int arrays',
              'No, the size is part of the type so they are different types',
              'Yes, but only if they hold the same values',
              'It depends on the compiler',
            ],
            correctIndex: 1,
            explanation: 'In Go, the size of an array is part of its type. `[3]int` and `[5]int` are completely different types and cannot be assigned to each other or passed to the same function parameter.',
          },
          {
            question: 'What happens when you assign one array to another in Go?',
            options: [
              'Both variables point to the same data',
              'A shallow copy is made',
              'A complete copy of every element is made',
              'A compile error occurs',
            ],
            correctIndex: 2,
            explanation: 'Arrays in Go are value types. Assignment copies every element into independent memory. Modifying the copy does not affect the original. This is different from most other languages.',
          },
          {
            question: 'What does `[...]int{1, 2, 3}` do?',
            options: [
              'Creates a slice with 3 elements',
              'Creates an array whose size is inferred from the number of elements',
              'Creates a dynamic array that can grow',
              'Causes a compile error',
            ],
            correctIndex: 1,
            explanation: '`[...]` tells the compiler to count the elements and determine the array size. `[...]int{1, 2, 3}` creates a `[3]int`. The size is still fixed at compile time.',
          },
        ],
        challenge: {
          prompt: 'Write a Go program that creates a `[5]int` array, fills it with squares of its indices (0, 1, 4, 9, 16), copies it to another array, modifies the copy, and prints both to demonstrate that arrays are value types.',
          starterCode: `package main

import "fmt"

func main() {
    var squares [5]int

    // Fill with squares of indices (0*0, 1*1, 2*2, ...)

    // Copy the array to a new variable

    // Modify the copy (e.g., set first element to 999)

    // Print both arrays to show they are independent
}`,
          solutionCode: `package main

import "fmt"

func main() {
    var squares [5]int
    for i := 0; i < len(squares); i++ {
        squares[i] = i * i
    }
    fmt.Println("Original:", squares)

    copied := squares
    copied[0] = 999
    fmt.Println("Original after copy modified:", squares)
    fmt.Println("Copy:", copied)
}`,
          hints: [
            'Use a for loop with index i from 0 to len(squares)-1 and set squares[i] = i * i',
            'Simply assign copied := squares to create a full copy',
            'After modifying copied[0], the original should remain unchanged because arrays are value types',
          ],
        },
      },
      {
        id: 'slices',
        title: 'Slices',
        difficulty: 'beginner',
        tags: ['slice', 'make', 'append', 'copy', 'dynamic-array'],
        cheatSheetSummary:
          'Slices are dynamic arrays: `[]int`. Create with `make([]T, len, cap)` or literals. Grow with `append`. Reference type.',
        crossLanguageId: 'slices',
        sections: [
          {
            heading: 'Creating Slices',
            content:
              'Slices are the workhorse data structure of Go -- you\'ll use them far more than arrays, maps, or any other collection. A slice is a lightweight descriptor (just 24 bytes: a pointer, a length, and a capacity) that provides a dynamic, flexible view over an underlying array. Think of a slice as a window into an array that can grow and shrink. You can create slices with literals (like `[]int{1, 2, 3}`), with `make()` for when you know the size upfront, or by slicing an existing array or slice. The length is how many elements the slice currently contains; the capacity is how many elements the underlying array can hold before Go needs to allocate a new, larger one. Understanding the relationship between length and capacity is the key to writing efficient Go code.',
            code: `package main

import "fmt"

func main() {
    // Literal
    s1 := []int{1, 2, 3, 4, 5}

    // make(type, length, capacity)
    s2 := make([]int, 5)       // len=5, cap=5, all zeros
    s3 := make([]int, 0, 10)   // len=0, cap=10

    // From an array
    arr := [5]int{10, 20, 30, 40, 50}
    s4 := arr[1:4] // [20 30 40]

    fmt.Println("s1:", s1)
    fmt.Printf("s2: %v (len=%d, cap=%d)\\n", s2, len(s2), cap(s2))
    fmt.Printf("s3: %v (len=%d, cap=%d)\\n", s3, len(s3), cap(s3))
    fmt.Println("s4:", s4)
}`,
            output: `s1: [1 2 3 4 5]
s2: [0 0 0 0 0] (len=5, cap=5)
s3: [] (len=0, cap=10)
s4: [20 30 40]`,
            tip: 'When you know the approximate final size of a slice, pre-allocate with `make([]T, 0, n)`. This creates a slice with zero length but room for `n` elements, avoiding the repeated memory allocations and copies that happen when `append` outgrows the capacity. This is one of the easiest performance wins in Go.',
            analogy: 'Think of it like a window into a warehouse shelf: the slice header (pointer, length, capacity) is the window frame, the underlying array is the shelf. You can slide the window, widen it, or even move it to a bigger shelf -- but the frame itself is always just 24 bytes.',
            codeHighlightLines: [7, 10, 11, 15],
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Slice Header (24 bytes)',
                    type: 'stack',
                    values: [
                      { name: 'ptr', value: '→ underlying array', highlight: true },
                      { name: 'len', value: '3', highlight: false },
                      { name: 'cap', value: '5', highlight: false },
                    ],
                  },
                  {
                    label: 'Underlying Array',
                    type: 'heap',
                    values: [
                      { name: '[0]', value: '10', highlight: false },
                      { name: '[1]', value: '20', highlight: true },
                      { name: '[2]', value: '30', highlight: true },
                      { name: '[3]', value: '40', highlight: true },
                      { name: '[4]', value: '50', highlight: false },
                    ],
                  },
                ],
              },
              caption: 'Slice s4 = arr[1:4]: the header points into the underlying array, len=3, cap=4',
            },
          },
          {
            heading: 'append, copy, and Slicing',
            content:
              'The `append` function is how slices grow. It takes a slice and one or more values, and returns a new slice with those values added. The critical detail: `append` returns a new slice header, and you must capture it -- `append(s, 4)` without `s = append(s, 4)` is a bug because the original `s` might not point to the new data. Under the hood, if there\'s enough capacity, `append` reuses the existing array. If not, it allocates a new array (typically doubling the capacity), copies the old data, and returns a slice pointing to the new array. The `copy` function copies elements from one slice to another and returns the count of elements copied. Slicing with `[low:high]` creates a new slice header pointing to the same underlying array -- and this is where things get tricky, because modifications to the sub-slice will be visible through the original.',
            code: `package main

import "fmt"

func main() {
    // Append
    s := []int{1, 2, 3}
    s = append(s, 4, 5)            // append individual elements
    s = append(s, []int{6, 7}...)  // append another slice
    fmt.Println("Appended:", s)

    // Copy
    src := []int{1, 2, 3}
    dst := make([]int, len(src))
    copied := copy(dst, src)
    fmt.Printf("Copied %d elements: %v\\n", copied, dst)

    // Slicing (shares underlying array!)
    original := []int{10, 20, 30, 40, 50}
    sub := original[1:4]
    fmt.Println("Sub:", sub)

    sub[0] = 999
    fmt.Println("Original after sub mod:", original)

    // Delete element at index 2
    s2 := []int{1, 2, 3, 4, 5}
    s2 = append(s2[:2], s2[3:]...)
    fmt.Println("After delete:", s2)
}`,
            output: `Appended: [1 2 3 4 5 6 7]
Copied 3 elements: [1 2 3]
Sub: [20 30 40]
Original after sub mod: [10 999 30 40 50]
After delete: [1 2 4 5]`,
            warning: 'Sub-slices share the underlying array with the original. Modifying `sub[0]` also modifies `original[1]` -- they\'re looking at the same memory. This is one of Go\'s most common sources of subtle bugs, especially in concurrent code. If you need an independent copy, explicitly use `copy()` or the `slices.Clone()` function (Go 1.21+).',
            codeHighlightLines: [8, 9, 20, 23, 28],
          },
          {
            heading: 'Slice Patterns and Tricks',
            content:
              'Experienced Go developers have a toolkit of idiomatic slice patterns that you\'ll see throughout production codebases. In-place filtering avoids allocating a new slice by rewriting elements into the same backing array. The two-pointer swap technique reverses a slice without extra memory. Since Go 1.21, the `slices` package in the standard library provides battle-tested implementations of common operations like sorting, searching, and comparison -- always prefer these over hand-rolling your own. The `slices.Sort` function uses a hybrid sorting algorithm (pattern-defeating quicksort) that\'s faster than the older `sort.Slice` in most cases. These patterns and utilities are the building blocks of efficient Go programs.',
            code: `package main

import (
    "fmt"
    "slices"
)

func main() {
    // Filter (in-place, no allocation)
    nums := []int{1, 2, 3, 4, 5, 6, 7, 8}
    n := 0
    for _, v := range nums {
        if v%2 == 0 {
            nums[n] = v
            n++
        }
    }
    evens := nums[:n]
    fmt.Println("Evens:", evens)

    // Reverse
    s := []int{1, 2, 3, 4, 5}
    for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
        s[i], s[j] = s[j], s[i]
    }
    fmt.Println("Reversed:", s)

    // slices package (Go 1.21+)
    data := []int{3, 1, 4, 1, 5, 9, 2}
    slices.Sort(data)
    fmt.Println("Sorted:", data)
    fmt.Println("Contains 4:", slices.Contains(data, 4))

    idx, found := slices.BinarySearch(data, 4)
    fmt.Printf("BinarySearch(4): idx=%d found=%t\\n", idx, found)
}`,
            output: `Evens: [2 4 6 8]
Reversed: [5 4 3 2 1]
Sorted: [1 1 2 3 4 5 9]
Contains 4: true
BinarySearch(4): idx=4 found=true`,
            tip: 'The three-index slice expression `s[low:high:max]` controls the capacity of the resulting slice. Use `s[1:3:3]` to create a sub-slice where `append` is guaranteed to allocate new memory instead of overwriting elements in the original array. This is a critical technique for safe concurrent code and library APIs.',
          },
        ],
        quiz: [
          {
            question: 'What are the three components of a slice header in Go?',
            options: [
              'Type, length, and values',
              'Pointer, length, and capacity',
              'Start index, end index, and array reference',
              'Name, size, and data',
            ],
            correctIndex: 1,
            explanation: 'A slice header is 24 bytes containing a pointer to the underlying array, the length (number of elements currently in the slice), and the capacity (how many elements the array can hold before reallocation).',
          },
          {
            question: 'What happens when you modify a sub-slice created with `s[1:4]`?',
            options: [
              'Only the sub-slice is affected',
              'A new copy is created automatically',
              'The original slice is also affected because they share the underlying array',
              'A runtime panic occurs',
            ],
            correctIndex: 2,
            explanation: 'Sub-slices share the same underlying array. Modifying elements through the sub-slice also modifies them in the original. Use `copy()` or `slices.Clone()` for an independent copy.',
          },
          {
            question: 'Why must you capture the return value of `append`?',
            options: [
              'Because `append` can return an error',
              'Because `append` may allocate a new underlying array, and the old slice header would be stale',
              'Because Go requires all return values to be captured',
              'Because `append` returns the number of elements added',
            ],
            correctIndex: 1,
            explanation: 'When the slice capacity is exceeded, `append` allocates a new, larger array and returns a new slice header pointing to it. Without capturing the return value, your variable still points to the old (possibly stale) array.',
          },
          {
            question: 'What does `make([]int, 0, 10)` create?',
            options: [
              'A slice with 10 elements, all zeros',
              'A slice with 0 elements but room for 10 without reallocation',
              'An array of 10 integers',
              'A nil slice',
            ],
            correctIndex: 1,
            explanation: '`make([]int, 0, 10)` creates a slice with length 0 (no elements yet) but capacity 10 (the underlying array can hold 10 elements before needing to grow). This is a performance optimization to avoid repeated reallocations.',
          },
        ],
        challenge: {
          prompt: 'Write a Go program that creates a slice of integers, appends values to it, creates a sub-slice, and demonstrates that modifying the sub-slice affects the original. Then use `copy` to create an independent clone and show that modifying the clone does not affect the original.',
          starterCode: `package main

import "fmt"

func main() {
    // Create a slice with values 10, 20, 30, 40, 50

    // Create a sub-slice of elements at indices 1 through 3

    // Modify the sub-slice and show it affects the original

    // Create an independent copy using the copy function

    // Modify the independent copy and show the original is unaffected
}`,
          solutionCode: `package main

import "fmt"

func main() {
    original := []int{10, 20, 30, 40, 50}
    fmt.Println("Original:", original)

    sub := original[1:4]
    sub[0] = 999
    fmt.Println("After modifying sub-slice:")
    fmt.Println("  Original:", original)
    fmt.Println("  Sub-slice:", sub)

    independent := make([]int, len(original))
    copy(independent, original)
    independent[0] = 777
    fmt.Println("After modifying independent copy:")
    fmt.Println("  Original:", original)
    fmt.Println("  Independent:", independent)
}`,
          hints: [
            'Use original[1:4] to create a sub-slice sharing the same underlying array',
            'Use make([]int, len(original)) to create a destination slice, then copy(dst, src) to copy elements',
            'After copy, the two slices have separate underlying arrays so modifications are independent',
          ],
        },
      },
      {
        id: 'maps',
        title: 'Maps',
        difficulty: 'beginner',
        tags: ['map', 'hash-table', 'key-value', 'make'],
        cheatSheetSummary:
          'Maps are hash tables: `map[K]V`. Create with `make` or literal. Use comma-ok idiom to check existence. `delete()` removes keys.',
        crossLanguageId: 'maps',
        sections: [
          {
            heading: 'Creating and Using Maps',
            content:
              'Maps are Go\'s built-in hash table implementation, giving you O(1) average-case lookups, insertions, and deletions. If you\'re coming from Python, they\'re like dictionaries; from JavaScript, like objects (but type-safe). You create maps with `make(map[K]V)` or with a literal. The key type must be comparable (supports `==`), so you can use strings, numbers, booleans, structs, and arrays as keys -- but not slices, maps, or functions. One of Go\'s most elegant idioms is the "comma-ok" pattern: when you read from a map, you can optionally capture a second boolean that tells you whether the key existed. This is essential because reading a missing key doesn\'t error -- it silently returns the zero value. Without the comma-ok check, you can\'t tell the difference between "this key doesn\'t exist" and "this key exists with the value 0."',
            code: `package main

import "fmt"

func main() {
    // Create with make
    m1 := make(map[string]int)
    m1["alice"] = 90
    m1["bob"] = 85

    // Create with literal
    m2 := map[string]int{
        "alice": 90,
        "bob":   85,
    }

    // Read
    score := m2["alice"]
    fmt.Println("Alice:", score)

    // Missing key returns zero value
    missing := m2["charlie"]
    fmt.Println("Charlie:", missing) // 0

    // Comma-ok idiom
    val, ok := m2["charlie"]
    if !ok {
        fmt.Println("charlie not found, val:", val)
    }

    // Delete
    delete(m2, "bob")
    fmt.Println("After delete:", m2)
    fmt.Println("Length:", len(m2))
}`,
            output: `Alice: 90
Charlie: 0
charlie not found, val: 0
After delete: map[alice:90]
Length: 1`,
            warning: 'Writing to a nil map causes an immediate panic. This is the most common map-related crash in Go. Always initialize with `make(map[K]V)` or a literal before inserting. Reading from a nil map is safe (returns the zero value), which makes the bug extra sneaky -- your code works fine for reads and then blows up on the first write.',
            analogy: 'Think of it like a phone book: you look up a name (key) and get a phone number (value). The comma-ok pattern is like asking "is this person even in the phone book?" before reading the number -- because a missing entry gives you 0, not an error.',
            codeHighlightLines: [7, 26, 27, 33],
          },
          {
            heading: 'Iterating and Advanced Patterns',
            content:
              'You iterate over maps with `range`, which gives you key-value pairs on each iteration. But here\'s something that surprises many developers: Go intentionally randomizes map iteration order. Even if you insert keys in order, iterating will give them back in a different (random) order each time you run the program. This is by design -- the Go team wanted to prevent anyone from accidentally depending on insertion order, because hash table ordering is an implementation detail that could change. If you need sorted output, extract the keys into a slice, sort it, and iterate over the sorted keys. Maps are reference types in Go, meaning when you pass a map to a function or assign it to another variable, both names point to the same underlying data. Changes through one reference are visible through the other.',
            code: `package main

import (
    "fmt"
    "sort"
)

func main() {
    ages := map[string]int{
        "Alice": 30,
        "Bob":   25,
        "Eve":   28,
    }

    // Iterate (order not guaranteed)
    for name, age := range ages {
        fmt.Printf("%s: %d\\n", name, age)
    }

    // Sorted iteration
    keys := make([]string, 0, len(ages))
    for k := range ages {
        keys = append(keys, k)
    }
    sort.Strings(keys)
    fmt.Println("\\nSorted:")
    for _, k := range keys {
        fmt.Printf("%s: %d\\n", k, ages[k])
    }

    // Map as a set
    seen := make(map[string]bool)
    words := []string{"go", "rust", "go", "python", "rust"}
    for _, w := range words {
        seen[w] = true
    }
    fmt.Println("\\nUnique words:", len(seen))
}`,
            output: `Alice: 30
Bob: 25
Eve: 28

Sorted:
Alice: 30
Bob: 25
Eve: 28

Unique words: 3`,
            tip: 'For implementing sets, use `map[T]struct{}` instead of `map[T]bool`. The empty struct `struct{}` takes zero bytes of memory, while `bool` takes one byte per entry. For a map with millions of entries, this saves megabytes. Access is the same: `seen[key] = struct{}{}` to add, and `_, ok := seen[key]` to check.',
          },
          {
            heading: 'Maps with Complex Values',
            content:
              'Map values can be any type -- slices, structs, functions, and even other maps. This opens up a rich set of patterns that you\'ll use constantly in real applications. The "map of slices" pattern is perfect for grouping (like a SQL GROUP BY). The frequency counter (`map[string]int` with `freq[word]++`) is so concise it almost feels like cheating -- Go\'s zero value for `int` is `0`, so incrementing a missing key just works without any initialization. Nested maps (`map[string]map[string]int`) are great for representing graphs and adjacency lists, but they come with a gotcha: you must initialize each inner map before writing to it, or you\'ll hit the nil map panic we discussed earlier.',
            code: `package main

import "fmt"

func main() {
    // Map of slices (grouping)
    groups := make(map[string][]string)
    groups["fruits"] = append(groups["fruits"], "apple", "banana")
    groups["vegs"] = append(groups["vegs"], "carrot")
    groups["fruits"] = append(groups["fruits"], "cherry")
    fmt.Println("Groups:", groups)

    // Word frequency counter
    text := "the quick brown fox jumps over the lazy fox"
    freq := make(map[string]int)
    for _, word := range []string{"the", "quick", "brown", "fox",
        "jumps", "over", "the", "lazy", "fox"} {
        freq[word]++
    }
    fmt.Println("\\nFrequency:", freq)
    fmt.Println("'the' count:", freq["the"])

    // Nested map
    graph := map[string]map[string]int{
        "A": {"B": 1, "C": 4},
        "B": {"C": 2, "D": 5},
    }
    fmt.Println("\\nA->B weight:", graph["A"]["B"])
}`,
            output: `Groups: map[fruits:[apple banana cherry] vegs:[carrot]]

Frequency: map[brown:1 fox:2 jumps:1 lazy:1 over:1 quick:1 the:2]
'the' count: 2

A->B weight: 1`,
            note: 'When using nested maps, you must initialize each inner map before writing to it. If you access `graph["C"]` (a key that doesn\'t exist), you get a nil map, and `graph["C"]["D"] = 1` will panic. The safe pattern is: check if the inner map exists, create it if not, then write. Alternatively, consider using a struct key like `map[[2]string]int` with keys like `[2]string{"A", "B"}` to flatten the nesting.',
            warning: 'Maps are NOT safe for concurrent access. If multiple goroutines read and write to the same map simultaneously, your program will crash with a "concurrent map read and map write" fatal error. Use `sync.RWMutex` to protect map access, or use `sync.Map` for simple concurrent use cases.',
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    GRAPH["graph: map[string]map[string]int"] --> A["A"]\n    GRAPH --> B["B"]\n    A --> AB["B: 1"]\n    A --> AC["C: 4"]\n    B --> BC["C: 2"]\n    B --> BD["D: 5"]\n    style GRAPH fill:#7986cb,color:#fff\n    style A fill:#42a5f5,color:#fff\n    style B fill:#42a5f5,color:#fff\n    style AB fill:#81c784,color:#fff\n    style AC fill:#81c784,color:#fff\n    style BC fill:#81c784,color:#fff\n    style BD fill:#81c784,color:#fff',
              caption: 'Nested map as a weighted graph: outer keys are source nodes, inner maps hold destination-weight pairs',
            },
          },
        ],
        quiz: [
          {
            question: 'What happens when you read a key that does not exist in a Go map?',
            options: [
              'A runtime panic occurs',
              'An error is returned',
              'The zero value of the value type is returned',
              'nil is returned',
            ],
            correctIndex: 2,
            explanation: 'Reading a missing key returns the zero value of the value type (0 for int, "" for string, etc.) without any error. Use the comma-ok idiom `val, ok := m[key]` to distinguish between a missing key and a key with the zero value.',
          },
          {
            question: 'What happens when you write to a nil map in Go?',
            options: [
              'The map is automatically initialized',
              'The write is silently ignored',
              'A runtime panic occurs',
              'A compile error occurs',
            ],
            correctIndex: 2,
            explanation: 'Writing to a nil map causes an immediate runtime panic. You must always initialize a map with `make(map[K]V)` or a literal before inserting values. Reading from a nil map is safe and returns the zero value.',
          },
          {
            question: 'Is map iteration order guaranteed in Go?',
            options: [
              'Yes, maps iterate in insertion order',
              'Yes, maps iterate in sorted key order',
              'No, Go intentionally randomizes map iteration order',
              'It depends on the key type',
            ],
            correctIndex: 2,
            explanation: 'Go intentionally randomizes map iteration order to prevent developers from accidentally depending on it. If you need sorted output, extract keys into a slice, sort it, and iterate over the sorted keys.',
          },
          {
            question: 'Which of the following types CANNOT be used as a map key in Go?',
            options: ['string', 'int', '[]int (slice)', '[3]int (array)'],
            correctIndex: 2,
            explanation: 'Map keys must be comparable (support ==). Slices, maps, and functions are not comparable and cannot be used as map keys. Strings, numbers, booleans, structs, and arrays can all be keys.',
          },
        ],
        challenge: {
          prompt: 'Write a Go program that counts the frequency of each word in a sentence. Store the counts in a `map[string]int`, then print each word and its count in alphabetical order using `sort.Strings`.',
          starterCode: `package main

import (
    "fmt"
    "sort"
    "strings"
)

func main() {
    sentence := "go is great and go is fast and go is simple"

    // Split the sentence into words

    // Count frequency of each word using a map

    // Get sorted keys

    // Print each word and its frequency in alphabetical order
}`,
          solutionCode: `package main

import (
    "fmt"
    "sort"
    "strings"
)

func main() {
    sentence := "go is great and go is fast and go is simple"
    words := strings.Split(sentence, " ")

    freq := make(map[string]int)
    for _, w := range words {
        freq[w]++
    }

    keys := make([]string, 0, len(freq))
    for k := range freq {
        keys = append(keys, k)
    }
    sort.Strings(keys)

    for _, k := range keys {
        fmt.Printf("%s: %d\\n", k, freq[k])
    }
}`,
          hints: [
            'Use strings.Split(sentence, " ") to break the sentence into words',
            'The zero value of int is 0, so freq[word]++ works even for new keys without initialization',
            'Extract keys into a slice with a range loop, sort with sort.Strings, then iterate the sorted keys',
          ],
        },
      },
      {
        id: 'pointers',
        title: 'Pointers',
        difficulty: 'beginner',
        tags: ['pointer', 'reference', 'address', 'dereference', 'nil'],
        cheatSheetSummary:
          '`&` takes address, `*` dereferences. No pointer arithmetic. Used for mutation and avoiding copies. Zero value is nil.',
        crossLanguageId: 'pointers',
        sections: [
          {
            heading: 'Pointer Basics',
            content:
              'If you\'re coming from Python, JavaScript, or Java, the word "pointer" might sound intimidating -- but Go\'s pointers are much simpler than C\'s. There\'s no pointer arithmetic in Go (you can\'t do `p++` to walk through memory), which eliminates an entire category of memory corruption bugs. A pointer is simply a variable that holds the memory address of another variable. The `&` operator ("address of") gives you a pointer to a value, and the `*` operator ("dereference") follows the pointer back to the value. Think of it like this: if a variable is a house, a pointer is the address written on an envelope. `&house` gives you the address; `*envelope` takes you to the house. You need pointers in Go for two main reasons: to let a function modify the caller\'s data, and to avoid copying large structs.',
            code: `package main

import "fmt"

func main() {
    x := 42
    p := &x       // p is *int, points to x

    fmt.Println("Value:", x)
    fmt.Println("Address:", p)
    fmt.Println("Dereferenced:", *p)

    // Modify through pointer
    *p = 100
    fmt.Println("After *p = 100, x =", x)

    // new() allocates and returns a pointer
    q := new(int)  // *int, initialized to zero value
    *q = 55
    fmt.Println("new(int):", *q)

    // Nil pointer
    var np *int
    fmt.Println("Nil pointer:", np)
    // fmt.Println(*np) // PANIC: nil pointer dereference
}`,
            output: `Value: 42
Address: 0xc0000b6008
Dereferenced: 42
After *p = 100, x = 100
new(int): 55
Nil pointer: <nil>`,
            warning: 'Dereferencing a nil pointer causes an immediate runtime panic -- this is the Go equivalent of a null pointer exception. Always check for nil before dereferencing, especially with pointers returned from functions that might indicate "not found" with nil. The pattern `if p != nil { use(*p) }` will become second nature.',
            analogy: 'Think of it like a house and its mailing address: `x` is the house (holds the value 42), `p = &x` is the address written on an envelope, and `*p` is "go to that address and look inside." Two envelopes can point to the same house.',
            codeHighlightLines: [6, 7, 11, 14],
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Stack',
                    type: 'stack',
                    values: [
                      { name: 'x', value: '42', highlight: true },
                      { name: 'p (*int)', value: '→ x (0xc000...)', highlight: true },
                    ],
                  },
                ],
              },
              caption: 'Pointer p holds the memory address of x. Dereferencing *p reads or writes the value at that address.',
            },
          },
          {
            heading: 'Pointers in Functions',
            content:
              'Go is a pass-by-value language -- every function argument is a copy. For an `int`, that\'s 8 bytes copied, which is trivial. But for a large struct with many fields, copying everything on every function call adds up. Pointers solve both problems: they let functions modify the original data (instead of working on a copy), and they\'re always just 8 bytes regardless of how large the underlying data is. Here\'s something that makes Go safer than C: you can return a pointer to a local variable from a function, and it works perfectly. In C, this would create a dangling pointer (the variable gets destroyed when the function returns). In Go, the compiler detects that the pointer "escapes" the function and automatically allocates the variable on the heap instead of the stack. The garbage collector handles cleanup.',
            code: `package main

import "fmt"

// Pass by value: cannot modify original
func doubleVal(n int) {
    n *= 2
}

// Pass by pointer: modifies original
func doublePtr(n *int) {
    *n *= 2
}

// Return a pointer (safe in Go - no dangling pointers)
func newUser(name string) *User {
    u := User{Name: name}
    return &u // Go allocates on heap when needed
}

type User struct {
    Name string
    Age  int
}

func main() {
    n := 10
    doubleVal(n)
    fmt.Println("After doubleVal:", n) // unchanged

    doublePtr(&n)
    fmt.Println("After doublePtr:", n) // changed

    u := newUser("Alice")
    fmt.Println("User:", u.Name)

    // Go auto-dereferences struct pointers
    u.Age = 30  // same as (*u).Age = 30
    fmt.Println("Age:", u.Age)
}`,
            output: `After doubleVal: 10
After doublePtr: 20
User: Alice
Age: 30`,
            tip: 'Go automatically dereferences struct pointers when you access fields. `u.Age` and `(*u).Age` are identical when `u` is a `*User`. This syntactic sugar makes working with pointer-to-struct feel natural and clean -- you almost never need to write `(*p).field` explicitly.',
            note: 'Go\'s escape analysis (run with `go build -gcflags="-m"` to see it in action) determines whether a variable lives on the stack or the heap. If a pointer to a local variable escapes the function (returned, stored in a struct, sent to a goroutine), Go automatically heap-allocates it. This means you never have dangling pointers -- the garbage collector ensures memory stays alive as long as any pointer references it.',
            diagram: {
              kind: 'mermaid',
              code: 'sequenceDiagram\n    participant main\n    participant doubleVal\n    participant doublePtr\n    main->>main: n := 10\n    main->>doubleVal: copy of n (10)\n    doubleVal->>doubleVal: n *= 2 (local copy = 20)\n    doubleVal-->>main: returns (original n still 10)\n    main->>doublePtr: &n (address of n)\n    doublePtr->>doublePtr: *n *= 2 (modifies original)\n    doublePtr-->>main: returns (n is now 20)',
              caption: 'Pass-by-value copies the data; pass-by-pointer shares the address so modifications reach the original',
            },
          },
          {
            heading: 'When to Use Pointers',
            content:
              'Knowing when to use pointers versus values is one of the most important judgment calls in Go. Here\'s the practical framework: use pointers when (1) a function needs to modify the caller\'s data -- this is the most common reason, (2) the struct is large and copying it on every function call would be wasteful, or (3) you need to represent "no value" using nil, like a function that returns `*User` where nil means "not found." Avoid pointers for small, read-only data like `int`, `bool`, or small structs -- the overhead of indirection and garbage collection pressure can actually make pointer usage slower than just copying a few bytes. For method receivers, Go convention says: if any method on a type needs a pointer receiver, make all methods use pointer receivers for consistency.',
            code: `package main

import "fmt"

type Config struct {
    Host    string
    Port    int
    Debug   bool
}

// Pointer receiver: can modify the struct
func (c *Config) SetDebug(enabled bool) {
    c.Debug = enabled
}

// Value receiver: gets a copy, cannot modify
func (c Config) Address() string {
    return fmt.Sprintf("%s:%d", c.Host, c.Port)
}

// Use *T to indicate "optional" / nullable
func findUser(id int) *User {
    if id == 1 {
        return &User{Name: "Alice"}
    }
    return nil // not found
}

type User struct{ Name string }

func main() {
    cfg := Config{Host: "localhost", Port: 8080}
    cfg.SetDebug(true)
    fmt.Println("Debug:", cfg.Debug)
    fmt.Println("Address:", cfg.Address())

    if u := findUser(1); u != nil {
        fmt.Println("Found:", u.Name)
    }
    if u := findUser(2); u == nil {
        fmt.Println("User 2 not found")
    }
}`,
            output: `Debug: true
Address: localhost:8080
Found: Alice
User 2 not found`,
            tip: 'Consistency rule for method receivers: if any method on a type uses a pointer receiver, ALL methods on that type should use pointer receivers. Mixing value and pointer receivers creates confusion about whether a value or pointer is stored in an interface, and it can lead to subtle bugs where modifications are lost. The Go community is strict about this convention.',
            warning: 'Don\'t reach for pointers by default "just in case." For small types (under ~64 bytes), passing by value is often faster than passing a pointer because values can stay on the stack (no GC pressure) and benefit from CPU cache locality. Profile before optimizing -- the Go compiler is smarter than you might expect about inlining and escape analysis.',
          },
        ],
        quiz: [
          {
            question: 'What does the `&` operator do in Go?',
            options: [
              'Performs a bitwise AND operation',
              'Returns the memory address of a variable',
              'Dereferences a pointer',
              'Declares a reference variable',
            ],
            correctIndex: 1,
            explanation: 'The `&` operator returns the memory address of a variable, creating a pointer to it. For example, `p := &x` makes `p` a pointer to `x`. The `*` operator is used to dereference (follow) the pointer.',
          },
          {
            question: 'What happens when you pass a struct by value to a function in Go?',
            options: [
              'The function receives a reference to the original',
              'The function receives a complete copy of the struct',
              'A compile error occurs',
              'The struct is moved into the function',
            ],
            correctIndex: 1,
            explanation: 'Go is a pass-by-value language. When you pass a struct to a function, every field is copied. Modifications inside the function do not affect the original. Use a pointer (`*StructType`) to modify the original.',
          },
          {
            question: 'Is it safe to return a pointer to a local variable from a function in Go?',
            options: [
              'No, it creates a dangling pointer like in C',
              'Yes, Go performs escape analysis and heap-allocates the variable automatically',
              'Only if the variable is declared with `new()`',
              'Only if the variable is a primitive type',
            ],
            correctIndex: 1,
            explanation: 'Go\'s escape analysis detects when a pointer to a local variable escapes the function. It automatically allocates the variable on the heap instead of the stack, and the garbage collector handles cleanup. No dangling pointers.',
          },
          {
            question: 'When should you prefer passing by value instead of by pointer?',
            options: [
              'Never, always use pointers for safety',
              'When the type is small and the function does not need to modify it',
              'Only for string types',
              'When working with goroutines',
            ],
            correctIndex: 1,
            explanation: 'For small types (under ~64 bytes) that don\'t need modification, passing by value is often faster because values stay on the stack (no GC pressure) and benefit from CPU cache locality.',
          },
        ],
        challenge: {
          prompt: 'Write a Go program with a `Counter` struct that has a `Count` field. Create two methods: `Increment` (pointer receiver, adds 1 to Count) and `Value` (value receiver, returns current Count). In main, create a Counter, call Increment 3 times, and print the final value.',
          starterCode: `package main

import "fmt"

type Counter struct {
    Count int
}

// Define Increment method with pointer receiver

// Define Value method with value receiver

func main() {
    // Create a Counter and increment it 3 times
    // Print the final value
}`,
          solutionCode: `package main

import "fmt"

type Counter struct {
    Count int
}

func (c *Counter) Increment() {
    c.Count++
}

func (c Counter) Value() int {
    return c.Count
}

func main() {
    c := Counter{}
    c.Increment()
    c.Increment()
    c.Increment()
    fmt.Println("Final count:", c.Value())
}`,
          hints: [
            'Use a pointer receiver `func (c *Counter) Increment()` so modifications persist',
            'A value receiver `func (c Counter) Value() int` is fine for read-only methods',
            'Initialize with Counter{} which gives Count its zero value of 0',
          ],
        },
      },
    ],
  },
];

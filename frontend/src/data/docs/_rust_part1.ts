import type { DocCategory } from './types';

// Part 1: Getting Started + Basic Types
export const RUST_PART1_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Getting Started                                              */
  /* ------------------------------------------------------------ */
  {
    id: 'rust-getting-started',
    label: 'Getting Started',
    icon: 'Rocket',
    entries: [
      {
        id: 'hello-world',
        title: 'Hello World',
        difficulty: 'beginner',
        tags: ['basics', 'first-program', 'println', 'macro'],
        cheatSheetSummary: 'fn main() { println!("Hello, world!"); }',
        crossLanguageId: 'hello-world',
        sections: [
          {
            heading: 'Your First Rust Program',
            content:
              'Welcome to Rust! Let\'s write your very first program and break down every piece of it. Every Rust program starts with a `fn main()` function — this is the entry point, the place where execution begins, just like `main()` in C or `public static void main` in Java. Now, notice that exclamation mark in `println!` — that\'s not a typo! It tells you this is a *macro*, not a regular function. Why does Rust use a macro for printing? Because macros can accept a variable number of arguments and perform powerful compile-time code generation that ordinary functions simply cannot. Rust source files use the `.rs` extension, and while you *can* compile directly with `rustc`, in practice you\'ll almost always reach for Cargo — Rust\'s build system and package manager that handles everything from compilation to dependency management. Think of `rustc` as driving stick and Cargo as an automatic transmission: both get you there, but one makes the journey much smoother.',
            code: `// main.rs
fn main() {
    println!("Hello, world!");
}`,
            output: `Hello, world!`,
            tip: 'The exclamation mark in `println!` means it is a macro, not a function. Macros can accept a variable number of arguments and perform compile-time code generation, which regular functions cannot do. You\'ll encounter several built-in macros in Rust — `vec!`, `format!`, `assert!` — and that `!` is always the giveaway.',
            analogy: 'Think of it like a stage play: `fn main()` is the curtain going up — nothing happens until main starts, and the show ends when main finishes. The `println!` macro is the actor reading from a script that gets finalized (expanded) during rehearsal (compilation), not during the live performance (runtime).',
            codeHighlightLines: [2, 3],
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n  A["main.rs"] -->|"rustc / cargo build"| B["Binary"]\n  B -->|"./binary"| C["Output: Hello, world!"]\n  style A fill:#f9f,stroke:#333\n  style B fill:#bbf,stroke:#333\n  style C fill:#bfb,stroke:#333',
              caption: 'Rust compilation pipeline: source file to native binary to output',
            },
          },
          {
            heading: 'Formatted Output',
            content:
              'Rust gives you a remarkably powerful formatting system, and it\'s all checked at compile time — meaning if you get the placeholders wrong, the compiler catches it before your code ever runs. The `println!` macro prints with a newline, `print!` prints without one, and `eprintln!` prints to standard error (perfect for error messages that shouldn\'t mix with normal output). Use `{}` for human-readable Display formatting and `{:?}` for Debug formatting — the latter is invaluable during development because it works on almost any type. The key insight here is that Rust\'s format strings aren\'t just dumb templates — they support positional arguments, named arguments, alignment, padding, and precision controls. Once you learn this mini-language, you\'ll find yourself reaching for `format!` and `println!` with the confidence that the compiler has your back.',
            code: `fn main() {
    let name = "Rust";
    let version = 2021;

    // Basic interpolation
    println!("Hello, {}!", name);

    // Multiple values
    println!("{} edition {}", name, version);

    // Debug printing with {:?}
    let nums = vec![1, 2, 3];
    println!("Debug: {:?}", nums);

    // Pretty debug with {:#?}
    println!("Pretty: {:#?}", nums);

    // Positional arguments
    println!("{0} is {1} and {1} is {0}", "left", "right");

    // Named arguments
    println!("{lang} v{ver}", lang = "Rust", ver = "1.75");

    // Padding and alignment
    println!("{:>10}", "right");   // right-aligned
    println!("{:<10}", "left");    // left-aligned
    println!("{:^10}", "center");  // center-aligned
    println!("{:0>5}", 42);        // zero-padded
}`,
            output: `Hello, Rust!
Rust edition 2021
Debug: [1, 2, 3]
Pretty: [
    1,
    2,
    3,
]
left is right and right is left
Rust v1.75
     right
left
  center
00042`,
            note: 'The format string syntax is checked at compile time — this is a huge win over languages where format string bugs silently produce garbage at runtime. If you use `{}` but pass the wrong number of arguments, or try to format a type that doesn\'t implement `Display`, the compiler tells you immediately.',
            codeHighlightLines: [6, 12, 14, 18, 21],
          },
          {
            heading: 'Compiling and Running',
            content:
              'Here\'s where Rust differs fundamentally from interpreted languages like Python or JavaScript: Rust compiles down to a native binary with *no runtime dependency*. No virtual machine, no interpreter, no garbage collector running alongside your code. You can hand someone the compiled binary and they can run it directly. While `rustc` is the raw compiler, Cargo is what you\'ll actually use day-to-day. Think of Cargo as Rust\'s Swiss Army knife — it handles compilation, dependency management, testing, benchmarking, documentation generation, and even publishing your libraries. The `cargo new` command scaffolds a complete project with the right directory structure, a manifest file, and even initializes a Git repository. It\'s one command to go from zero to a working project.',
            code: `# Compile and run with rustc
rustc main.rs
./main

# Or use Cargo (preferred)
cargo new hello_project
cd hello_project
cargo run`,
            output: `Hello, world!`,
            tip: 'Use `cargo run` during development — it compiles and runs in a single step, and intelligently only recompiles files that have changed. It\'s the fastest feedback loop you\'ll get.',
            analogy: 'Think of it like building a house: `rustc` is hiring a contractor directly, while Cargo is hiring a general contractor who also handles permits, subcontractors, materials sourcing, and inspections. Both build the house, but Cargo manages the whole project for you.',
          },
        ],
        quiz: [
          {
            question: 'What does the exclamation mark in `println!` indicate?',
            options: [
              'It is a function that may fail',
              'It is a macro, not a regular function',
              'It prints to standard error instead of standard output',
              'It forces a newline at the end of the output',
            ],
            correctIndex: 1,
            explanation:
              'The `!` in `println!` indicates it is a macro invocation, not a regular function call. Macros can accept a variable number of arguments and perform compile-time code generation.',
          },
          {
            question: 'What is the entry point of every Rust program?',
            options: [
              'fn start()',
              'fn run()',
              'fn main()',
              'fn init()',
            ],
            correctIndex: 2,
            explanation:
              'Every Rust program begins execution at the `fn main()` function. This is similar to the `main` function in C or Java.',
          },
          {
            question: 'Which format specifier is used for Debug output in `println!`?',
            options: [
              '{}',
              '{:?}',
              '{:#}',
              '{:d}',
            ],
            correctIndex: 1,
            explanation:
              '`{:?}` invokes the Debug trait for formatting, which is useful during development and works on most types. `{}` uses the Display trait for human-readable output.',
          },
        ],
        challenge: {
          prompt:
            'Write a Rust program that prints your name and age using formatted output. Use both positional and named arguments in separate `println!` calls.',
          starterCode: `fn main() {
    // TODO: Print "My name is <name> and I am <age> years old"
    // using positional arguments (e.g., {0}, {1})

    // TODO: Print the same message using named arguments
    // (e.g., {name}, {age})
}`,
          solutionCode: `fn main() {
    // Using positional arguments
    println!("{0} is {1} years old. Yes, {0}!", "Alice", 30);

    // Using named arguments
    println!("{name} is {age} years old. Yes, {name}!",
        name = "Alice", age = 30);
}`,
          hints: [
            'Positional arguments use {0}, {1}, etc. to refer to arguments by index. You can reuse the same index multiple times.',
            'Named arguments use {name} syntax and are specified as `name = value` at the end of the println! call.',
            'Both approaches can be mixed in a single println! call if needed.',
          ],
        },
      },
      {
        id: 'cargo-basics',
        title: 'Cargo Basics',
        difficulty: 'beginner',
        tags: ['cargo', 'build-system', 'package-manager', 'project-setup'],
        cheatSheetSummary: 'cargo new/build/run/test/check — Rust build system and package manager',
        crossLanguageId: 'package-manager',
        sections: [
          {
            heading: 'Creating and Building Projects',
            content:
              'If Rust is the language, Cargo is the experience. It\'s Rust\'s official build system and package manager rolled into one, and it\'s honestly one of the best things about the Rust ecosystem. Coming from C/C++ where you wrestle with Makefiles, CMake, and manual dependency management? Cargo will feel like a breath of fresh air. Coming from npm or pip? Cargo is what those tools aspire to be — fast, reproducible, and deeply integrated with the language. The `cargo new` command scaffolds a project with a standard directory layout, a `Cargo.toml` manifest, and a Git repository — all in one step. There are two build profiles you should know: debug (the default) compiles fast but produces unoptimized code, while release takes longer to compile but produces code that runs significantly faster. During development, always use the debug profile; switch to release when benchmarking or shipping.',
            code: `# Create a new binary project
cargo new my_app
cd my_app

# Create a new library project
cargo new my_lib --lib

# Build the project
cargo build              # debug build (fast compile, no optimizations)
cargo build --release    # release build (slow compile, full optimizations)

# Run the project
cargo run                # build + run
cargo run --release      # optimized build + run

# Check without building (fastest feedback)
cargo check`,
            output: `Created binary (application) \`my_app\` package
   Compiling my_app v0.1.0 (/path/to/my_app)
    Finished dev [unoptimized + debuginfo] target(s)
     Running \`target/debug/my_app\`
Hello, world!`,
            tip: 'Use `cargo check` instead of `cargo build` during development. It skips code generation entirely and only performs type checking and borrow checking — making it significantly faster while still catching all the errors you care about.',
          },
          {
            heading: 'Cargo.toml Manifest',
            content:
              'Every Rust project has a `Cargo.toml` at its root — think of it as your project\'s ID card and shopping list combined. It uses the TOML format (Tom\'s Obvious Minimal Language) to declare your project\'s metadata, its dependencies, build profiles, and feature flags. Dependencies are fetched from crates.io, Rust\'s central package registry (think of it like npm for JavaScript or PyPI for Python). Semantic versioning controls compatibility: specifying `"1.0"` means "any version >= 1.0.0 and < 2.0.0". This gives you automatic patch and minor updates while protecting against breaking changes. The `[dev-dependencies]` section is for tools you only need during development and testing — they won\'t bloat your production binary. And those `[profile.release]` settings? That\'s where you can fine-tune the optimizer to squeeze every last drop of performance from your release builds.',
            code: `[package]
name = "my_app"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
rand = "0.8"
tokio = { version = "1", features = ["full"] }

[dev-dependencies]
criterion = "0.5"

[profile.release]
opt-level = 3
lto = true`,
            tip: 'Use `cargo add serde` to add dependencies from the command line instead of editing `Cargo.toml` by hand. It automatically picks the latest compatible version and formats the entry correctly.',
          },
          {
            heading: 'Project Structure',
            content:
              'Cargo enforces a conventional directory layout, and this is actually a feature, not a limitation. When every Rust project follows the same structure, you can jump into any open-source crate and immediately know where to find things. Source code lives in `src/`, with `main.rs` as the entry point for binaries and `lib.rs` as the root for libraries. Integration tests go in `tests/` (these test your public API as an external consumer would), benchmarks live in `benches/`, and example programs in `examples/`. The `Cargo.lock` file is automatically generated and records the *exact* versions of every dependency used — this is what makes builds reproducible. When you or your CI system runs `cargo build` six months from now, you\'ll get the exact same dependency versions.',
            code: `my_app/
├── Cargo.toml          # project manifest
├── Cargo.lock          # exact dependency versions (auto-generated)
├── src/
│   ├── main.rs         # binary entry point
│   ├── lib.rs          # library root (optional)
│   └── utils/
│       └── mod.rs      # submodule
├── tests/              # integration tests
│   └── integration.rs
├── benches/            # benchmarks
│   └── my_bench.rs
└── examples/           # example programs
    └── demo.rs`,
            note: 'Commit `Cargo.lock` for binary projects (it ensures reproducible builds across machines and CI). For library projects, leave it out of version control — let the consumers of your library resolve their own dependency versions.',
          },
          {
            heading: 'Essential Cargo Commands',
            content:
              'Here\'s your Cargo survival kit — the commands you\'ll use every single day as a Rust developer. Beyond `build` and `run`, Cargo provides a complete workflow: `cargo test` runs your test suite, `cargo fmt` formats your code to the community standard style (no more style debates!), and `cargo clippy` is your AI-powered linter that catches hundreds of common mistakes, unidiomatic patterns, and performance pitfalls. The `cargo doc --open` command is particularly delightful — it generates beautiful HTML documentation from your doc comments and opens it in your browser. And when you\'re ready to share your creation with the world, `cargo publish` sends it to crates.io. This integrated toolchain is one of the reasons Rust developers report such high satisfaction — everything just works together seamlessly.',
            code: `# Testing
cargo test                    # run all tests
cargo test -- --nocapture     # show println! output in tests
cargo test my_function        # run tests matching a name

# Code quality
cargo fmt                     # format code (requires rustfmt)
cargo clippy                  # run linter (requires clippy)

# Documentation
cargo doc --open              # generate and open HTML docs

# Dependency management
cargo add serde               # add a dependency
cargo update                  # update dependencies
cargo tree                    # show dependency tree

# Publishing
cargo publish                 # publish to crates.io`,
            tip: 'Run `cargo clippy` regularly — it catches hundreds of common mistakes, unidiomatic patterns, and subtle performance issues that even experienced Rustaceans miss. Many teams add it to their CI pipeline as a required check.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n  A["cargo check"] -->|"Types OK"| B["cargo build"]\n  B -->|"Compiles OK"| C["cargo test"]\n  C -->|"Tests pass"| D["cargo clippy"]\n  D -->|"No warnings"| E["cargo fmt"]\n  E -->|"Formatted"| F["cargo publish"]\n  style A fill:#ffd,stroke:#333\n  style C fill:#dfd,stroke:#333\n  style F fill:#ddf,stroke:#333',
              caption: 'Typical Cargo workflow from development to publication',
            },
          },
        ],
        quiz: [
          {
            question: 'What command is the fastest way to check for compilation errors without producing a binary?',
            options: [
              'cargo build',
              'cargo run',
              'cargo check',
              'cargo test',
            ],
            correctIndex: 2,
            explanation:
              '`cargo check` skips code generation and only performs type checking and borrow checking, making it significantly faster than `cargo build` while still catching all compile-time errors.',
          },
          {
            question: 'What is the difference between `cargo build` and `cargo build --release`?',
            options: [
              'Release mode disables the borrow checker for performance',
              'Release mode enables full optimizations but takes longer to compile',
              'Release mode only compiles the main binary without dependencies',
              'There is no difference; --release is a no-op flag',
            ],
            correctIndex: 1,
            explanation:
              'Debug builds compile fast but produce unoptimized code. Release builds enable full optimizations (opt-level 3, LTO, etc.) but take longer to compile. Use debug during development and release for benchmarking or shipping.',
          },
          {
            question: 'Which file records the exact dependency versions used in a Rust project?',
            options: [
              'Cargo.toml',
              'Cargo.lock',
              'rust-toolchain.toml',
              'build.rs',
            ],
            correctIndex: 1,
            explanation:
              '`Cargo.lock` is auto-generated and records the exact versions of every dependency, ensuring reproducible builds. `Cargo.toml` specifies version ranges, while `Cargo.lock` pins them to specific versions.',
          },
          {
            question: 'What does the `[dev-dependencies]` section in Cargo.toml specify?',
            options: [
              'Dependencies that are only used on development machines',
              'Dependencies needed only during development and testing, not in the final binary',
              'Optional dependencies the user can enable',
              'Dependencies that are always compiled in debug mode',
            ],
            correctIndex: 1,
            explanation:
              'Dev-dependencies are only used for tests, examples, and benchmarks. They are not included in the final binary when someone depends on your crate, keeping production builds lean.',
          },
        ],
        challenge: {
          prompt:
            'Create a `Cargo.toml` manifest for a project called "my_calculator" at version 0.1.0 using the 2021 edition. Add `rand` version 0.8 as a dependency and `criterion` version 0.5 as a dev-dependency. Set release profile to opt-level 3.',
          starterCode: `# Fill in the Cargo.toml for "my_calculator"
[package]
# TODO: Add name, version, and edition

# TODO: Add rand as a dependency

# TODO: Add criterion as a dev-dependency

# TODO: Set release profile opt-level to 3`,
          solutionCode: `[package]
name = "my_calculator"
version = "0.1.0"
edition = "2021"

[dependencies]
rand = "0.8"

[dev-dependencies]
criterion = "0.5"

[profile.release]
opt-level = 3`,
          hints: [
            'The [package] section requires name, version, and edition fields.',
            'Dependencies use the format: crate_name = "version" under the [dependencies] section.',
            'Profile settings go under [profile.release] with key = value syntax.',
          ],
        },
      },
      {
        id: 'variables',
        title: 'Variables & Mutability',
        difficulty: 'beginner',
        tags: ['variables', 'let', 'mut', 'const', 'shadowing', 'immutability'],
        cheatSheetSummary: 'let x = 5; let mut y = 10; const MAX: u32 = 100;',
        crossLanguageId: 'variables',
        sections: [
          {
            heading: 'Immutability by Default',
            content:
              'Here\'s where Rust starts showing its philosophy: variables are immutable by default. If you\'re coming from Python, JavaScript, or Java, this might feel backwards — but it\'s one of Rust\'s most powerful design choices. Why? Because immutability eliminates an entire category of bugs. When you see `let x = 5`, you know that `x` will *always* be 5 for the rest of its scope. No function can secretly change it, no thread can modify it behind your back. You have to explicitly opt into mutability with the `mut` keyword, which serves as a clear signal to anyone reading your code: "this value will change." And if you forget `mut` and try to reassign? The compiler catches it at compile time — not as a runtime exception that crashes your production server at 3 AM.',
            code: `fn main() {
    // Immutable by default
    let x = 5;
    // x = 6;  // ERROR: cannot assign twice to immutable variable

    // Opt into mutability
    let mut y = 10;
    println!("y before: {}", y);
    y = 20;
    println!("y after: {}", y);
}`,
            output: `y before: 10
y after: 20`,
            warning: 'Forgetting `mut` is the single most common beginner error. When the compiler says "cannot assign twice to immutable variable," the fix is simple: add `mut` to the `let` binding. Over time, you\'ll develop the habit of asking yourself: "Does this value actually need to change?"',
            analogy: 'Think of it like writing in pen vs. pencil. By default, Rust writes in pen — once a value is written, it is permanent. Adding `mut` is like switching to pencil — you are explicitly saying "I may need to erase and rewrite this." The compiler enforces which writing instrument you are using.',
            codeHighlightLines: [3, 7, 9],
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Stack Frame (main)',
                    type: 'stack',
                    values: [
                      { name: 'x', value: '5 (immutable)', highlight: true },
                      { name: 'y', value: '10 -> 20 (mut)', highlight: true },
                    ],
                  },
                ],
              },
              caption: 'Immutable x is fixed at 5; mutable y can be reassigned from 10 to 20',
            },
          },
          {
            heading: 'Shadowing',
            content:
              'Shadowing is one of Rust\'s most elegant features, and it\'s often misunderstood. When you write `let x = x + 1`, you\'re not mutating `x` — you\'re creating an entirely *new* variable that happens to reuse the same name. The old `x` is gone, replaced by a fresh binding. This is fundamentally different from `mut` because shadowing can change the type: you can start with a string `"   "` and shadow it with its length as a `usize`. Try that with `mut` and the compiler will reject it! Shadowing is incredibly useful for transforming a value through a pipeline of steps while keeping a meaningful name. It also keeps the final binding immutable, which is a nice bonus. Think of it like this: `mut` says "this box can hold different values," while shadowing says "I\'m getting a completely new box with the same label."',
            code: `fn main() {
    // Shadowing: creates a new binding
    let x = 5;
    let x = x + 1;       // x is now 6
    let x = x * 2;       // x is now 12
    println!("x = {}", x);

    // Shadowing can change the type
    let spaces = "   ";          // &str
    let spaces = spaces.len();   // usize — different type!
    println!("spaces = {}", spaces);

    // Shadowing inside a block
    let y = 10;
    {
        let y = y + 5; // shadows outer y inside this block
        println!("inner y = {}", y); // 15
    }
    println!("outer y = {}", y); // 10 — outer y unchanged
}`,
            output: `x = 12
spaces = 3
inner y = 15
outer y = 10`,
            note: 'Shadowing is not mutation — the compiler treats each `let` as a completely separate variable. This is why shadowed variables can have different types. The previous binding is simply no longer accessible by that name (though it still exists in memory until it goes out of scope).',
            analogy: 'Think of it like name tags at a conference. Shadowing is tearing off your old name tag and putting on a new one. The old tag still exists (in the trash), but everyone now sees the new name. With `mut`, you are erasing and rewriting the same tag — the tag itself persists but its content changes.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Stack Frame (main) - Shadowing x',
                    type: 'stack',
                    values: [
                      { name: 'x (1st)', value: '5', highlight: false },
                      { name: 'x (2nd)', value: '6', highlight: false },
                      { name: 'x (3rd)', value: '12', highlight: true },
                      { name: 'spaces (1st)', value: '"   " (&str)', highlight: false },
                      { name: 'spaces (2nd)', value: '3 (usize)', highlight: true },
                    ],
                  },
                ],
              },
              caption: 'Each let creates a new variable on the stack. Old bindings become inaccessible but remain until their scope ends.',
            },
          },
          {
            heading: 'Constants and Static Variables',
            content:
              'Rust gives you two ways to define values that live beyond a single function: `const` and `static`. Constants are computed at compile time and inlined wherever they appear in your code — the compiler literally copies the value into every place that uses it. They must have an explicit type annotation (no inference allowed), and by convention they use `SCREAMING_SNAKE_CASE`. Static variables, on the other hand, have a fixed memory address that persists for the entire program. They\'re like global variables, and Rust treats them with appropriate caution. A mutable `static` exists but requires `unsafe` blocks to access — and for good reason. If two threads read and write a mutable static simultaneously, you get a data race, which is exactly the kind of bug Rust was designed to prevent. In practice, reach for `const` first; use `static` only when you genuinely need a fixed address or interior mutability through `Mutex` or atomics.',
            code: `// Constants: always immutable, inlined at compile time
const MAX_POINTS: u32 = 100_000;
const PI: f64 = 3.141_592_653_589_793;
const GREETING: &str = "Hello, Rust!";

// Static: fixed memory address, lives for entire program
static LANGUAGE: &str = "Rust";
static mut COUNTER: u32 = 0; // mutable static (requires unsafe)

fn main() {
    println!("{}", MAX_POINTS);
    println!("{}", PI);
    println!("{}", GREETING);
    println!("{}", LANGUAGE);

    // Mutable statics require unsafe
    unsafe {
        COUNTER += 1;
        println!("Counter: {}", COUNTER);
    }
}`,
            output: `100000
3.141592653589793
Hello, Rust!
Rust
Counter: 1`,
            warning: 'Mutable statics are inherently unsafe because they can be accessed from multiple threads without synchronization, leading to data races. In real-world code, use `std::sync::Mutex`, `std::sync::atomic::AtomicU32`, or the `lazy_static`/`once_cell` crate instead.',
            tip: 'Use underscores in numeric literals for readability: `100_000` is the same as `100000`, and `3.141_592` is the same as `3.141592`. The compiler ignores underscores entirely — they\'re purely for human eyes.',
            analogy: 'Think of it like `const` is a recipe written on every page where it is needed (inlined copy), while `static` is a recipe pinned on the kitchen wall at a single location (fixed address). Everyone goes to the same wall to read it, which is why mutable statics are dangerous when multiple cooks (threads) are in the kitchen.',
            codeHighlightLines: [2, 3, 7, 8, 17, 18],
          },
        ],
        quiz: [
          {
            question: 'What happens if you try to reassign an immutable variable in Rust?',
            options: [
              'The program crashes at runtime',
              'The value is silently ignored',
              'The compiler produces an error at compile time',
              'The variable becomes mutable automatically',
            ],
            correctIndex: 2,
            explanation:
              'Rust enforces immutability at compile time. Attempting to reassign an immutable variable produces a compiler error: "cannot assign twice to immutable variable." You must use `let mut` to opt into mutability.',
          },
          {
            question: 'What is the key difference between shadowing and mutability?',
            options: [
              'Shadowing is slower because it allocates new memory',
              'Shadowing creates a new variable and can change the type; mut changes the value of the same variable',
              'Mut allows type changes while shadowing does not',
              'There is no difference; they are interchangeable',
            ],
            correctIndex: 1,
            explanation:
              'Shadowing creates an entirely new variable with `let`, which can have a different type. Mutability (`mut`) modifies the existing variable and cannot change its type.',
          },
          {
            question: 'What keyword is required to define a compile-time constant in Rust?',
            options: [
              'let',
              'static',
              'const',
              'final',
            ],
            correctIndex: 2,
            explanation:
              '`const` defines a compile-time constant that is inlined wherever it is used. It requires an explicit type annotation and uses SCREAMING_SNAKE_CASE by convention.',
          },
          {
            question: 'Why does accessing a mutable `static` variable require an `unsafe` block?',
            options: [
              'Because statics are stored on the heap',
              'Because mutable statics can cause data races in multithreaded code',
              'Because the compiler cannot infer the type of statics',
              'Because statics are always uninitialized',
            ],
            correctIndex: 1,
            explanation:
              'Mutable statics can be accessed from multiple threads simultaneously without synchronization, which can cause data races. Rust requires `unsafe` to acknowledge this risk explicitly.',
          },
        ],
        challenge: {
          prompt:
            'Write a program that demonstrates shadowing by starting with a string variable containing "42", shadowing it to parse it into an integer, and then shadowing it again to double the value. Print the final result.',
          starterCode: `fn main() {
    // TODO: Create a variable x with the string value "42"

    // TODO: Shadow x by parsing the string into an i32

    // TODO: Shadow x again by doubling it

    // TODO: Print the final value of x
}`,
          solutionCode: `fn main() {
    let x = "42";
    let x: i32 = x.parse().unwrap();
    let x = x * 2;
    println!("x = {}", x); // 84
}`,
          hints: [
            'Use `let x = "42";` to create a string slice, then `let x: i32 = x.parse().unwrap();` to shadow it with the parsed integer.',
            'Each `let x = ...` creates a brand new variable that shadows the previous one, even if the type changes.',
            'The `.parse()` method requires a type annotation (either on the variable or via turbofish) to know what type to parse into.',
          ],
        },
      },
      {
        id: 'data-types',
        title: 'Data Types Overview',
        difficulty: 'beginner',
        tags: ['types', 'scalar', 'compound', 'type-inference', 'casting'],
        cheatSheetSummary: 'Scalar: i32, f64, bool, char. Compound: tuple, array. Inference is automatic.',
        crossLanguageId: 'data-types',
        sections: [
          {
            heading: 'Scalar vs Compound Types',
            content:
              'Rust\'s type system is your first line of defense against bugs, and understanding it starts with two fundamental categories. Scalar types represent a single value — integers (`i32`, `u64`), floating-point numbers (`f64`), booleans (`bool`), and characters (`char`). Compound types group multiple values together — tuples bundle a fixed number of potentially different types, while arrays hold a fixed number of values that must all be the same type. Here\'s the mental model: scalars are individual atoms, compounds are molecules. Both tuples and arrays are stack-allocated with sizes known at compile time, making them extremely efficient. When you need something that can grow or shrink at runtime, Rust provides heap-allocated collections like `Vec` (a growable array) and `String` (a growable string) — but those come later. For now, notice how Rust makes you think about your data\'s shape up front. This intentional friction pays off in performance and correctness.',
            code: `fn main() {
    // Scalar types
    let integer: i32 = 42;
    let float: f64 = 3.14;
    let boolean: bool = true;
    let character: char = 'R';

    // Compound types
    let tuple: (i32, f64, char) = (500, 6.4, 'Z');
    let array: [i32; 5] = [1, 2, 3, 4, 5];

    println!("{} {} {} {}", integer, float, boolean, character);
    println!("{:?}", tuple);
    println!("{:?}", array);
}`,
            output: `42 3.14 true R
(500, 6.4, 'Z')
[1, 2, 3, 4, 5]`,
            note: 'Rust is statically typed — every variable has a definite type at compile time. But thanks to type inference, you rarely need to write types explicitly. The compiler figures it out from context, giving you the safety of static typing with the ergonomics of a dynamically typed language.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n  A["Rust Types"] --> B["Scalar (single value)"]\n  A --> C["Compound (grouped values)"]\n  B --> D["i8, i16, i32, i64, i128"]\n  B --> E["f32, f64"]\n  B --> F["bool"]\n  B --> G["char (4 bytes, Unicode)"]\n  C --> H["Tuple: (T1, T2, ...)"]\n  C --> I["Array: [T; N]"]\n  style A fill:#f9f,stroke:#333\n  style B fill:#ffd,stroke:#333\n  style C fill:#ddf,stroke:#333',
              caption: 'Rust type taxonomy: scalar types hold single values, compound types group multiple values',
            },
          },
          {
            heading: 'Type Inference',
            content:
              'Rust has one of the most powerful type inference engines of any systems language. The compiler doesn\'t just look at what you assign — it looks at how you *use* the variable later and works backwards. Create a `Vec::new()` and the compiler has no idea what it holds yet. Push a `u32` into it three lines later, and suddenly the compiler retroactively knows it\'s a `Vec<u32>`. This is called Hindley-Milner-style inference, and it\'s why Rust code can feel as light as Python while being as safe as Haskell. You only need explicit type annotations in two situations: when the compiler genuinely cannot determine the type (like when parsing a string — parse into what?), or when you want to be explicit for documentation purposes. The turbofish syntax `::<Type>` is your escape hatch for specifying types on method calls when inference falls short.',
            code: `fn main() {
    // Inference from value
    let x = 42;           // inferred as i32
    let y = 3.14;         // inferred as f64
    let active = true;    // inferred as bool

    // Inference from usage
    let mut scores = Vec::new(); // type unknown here
    scores.push(100_u32);        // now inferred as Vec<u32>

    // Explicit annotation needed when parsing
    let parsed: i64 = "42".parse().unwrap();

    // Turbofish syntax for specifying type on a call
    let parsed2 = "3.14".parse::<f64>().unwrap();

    println!("{} {} {} {:?} {} {}", x, y, active, scores, parsed, parsed2);
}`,
            output: `42 3.14 true [100] 42 3.14`,
            tip: 'When the compiler says "type annotations needed," it\'s telling you there\'s genuine ambiguity — not that you forgot something. Either add a type to the variable (`let x: i64 = ...`) or use turbofish on the method call (`.parse::<f64>()`). Both work; choose whichever reads more clearly in context.',
            codeHighlightLines: [8, 9, 12, 15],
            analogy: 'Think of it like a detective solving a case. The compiler gathers clues from how you use a variable: if you push a `u32` into a `Vec`, the compiler deduces the vector must be `Vec<u32>`. It works backwards from the evidence, only asking for help (type annotations) when the clues are genuinely ambiguous.',
          },
          {
            heading: 'Type Casting with as',
            content:
              'If you\'ve worked with C, you know implicit type coercion is a minefield of subtle bugs. Rust takes a firm stance: no implicit conversions, ever. If you want to convert an `i32` to an `f64`, you must write `as f64` explicitly. This makes every type boundary visible in your code. But here\'s the critical thing to understand about `as`: it\'s a blunt instrument. Casting `300_i32` to `u8` doesn\'t fail — it silently truncates to `44` (because 300 mod 256 = 44). Casting `3.99_f64` to `i32` gives you `3`, not `4` — it truncates toward zero. These behaviors are well-defined (no undefined behavior like C!), but they can still produce surprising results. For conversions where data loss is possible and you want to *know* about it, use the `TryFrom` trait instead. It returns a `Result` that you can handle gracefully, turning a potential silent bug into an explicit decision point.',
            code: `fn main() {
    // Numeric casting with as
    let x: i32 = 42;
    let y: f64 = x as f64;         // i32 -> f64 (lossless)
    let z: u8 = x as u8;           // i32 -> u8 (truncates if > 255)
    println!("{} -> f64: {}, u8: {}", x, y, z);

    let big: i32 = 300;
    let truncated: u8 = big as u8; // 300 % 256 = 44
    println!("300 as u8 = {}", truncated);

    let float_val: f64 = 3.99;
    let int_val: i32 = float_val as i32; // truncates toward zero
    println!("3.99 as i32 = {}", int_val);

    // Safe conversion with TryFrom
    use std::convert::TryFrom;
    let safe = u8::try_from(200_i32);    // Ok(200)
    let fail = u8::try_from(300_i32);    // Err(TryFromIntError)
    println!("200 -> u8: {:?}", safe);
    println!("300 -> u8: {:?}", fail);
}`,
            output: `42 -> f64: 42, u8: 42
300 as u8 = 44
3.99 as i32 = 3
200 -> u8: Ok(200)
300 -> u8: Err(TryFromIntError(()))`,
            warning: 'The `as` keyword silently truncates on overflow — it will never panic, but it may give you a completely wrong value. Use `TryFrom` whenever the conversion might lose data, and handle the `Err` case explicitly. Your future self will thank you.',
            codeHighlightLines: [9, 13, 18, 19],
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n  A["i32: 300"] -->|"as u8 (truncate)"| B["u8: 44"]\n  A -->|"TryFrom<i32>"| C{"Fits in u8?"}\n  C -->|"Yes (0..=255)"| D["Ok(value)"]\n  C -->|"No (>255)"| E["Err(TryFromIntError)"]\n  style A fill:#ffd,stroke:#333\n  style B fill:#fbb,stroke:#333\n  style D fill:#bfb,stroke:#333\n  style E fill:#fbb,stroke:#333',
              caption: 'as truncates silently; TryFrom returns a Result that lets you handle overflow gracefully',
            },
          },
        ],
        quiz: [
          {
            question: 'What is the default integer type in Rust when no type annotation is provided?',
            options: [
              'i64',
              'i32',
              'u32',
              'isize',
            ],
            correctIndex: 1,
            explanation:
              'Rust defaults to `i32` for integer literals and `f64` for floating-point literals when no explicit type annotation is given. These defaults offer a good balance of range and performance.',
          },
          {
            question: 'Which Rust feature allows the compiler to determine types from how variables are used later in the code?',
            options: [
              'Dynamic typing',
              'Type coercion',
              'Type inference',
              'Type erasure',
            ],
            correctIndex: 2,
            explanation:
              'Rust uses Hindley-Milner style type inference. The compiler examines how a variable is used throughout its scope to determine its type. For example, pushing a `u32` into a `Vec::new()` retroactively types it as `Vec<u32>`.',
          },
          {
            question: 'What does `as` do when casting `300_i32` to `u8`?',
            options: [
              'It panics at runtime',
              'It returns 300 as a u8',
              'It silently truncates to 44 (300 mod 256)',
              'It returns a compilation error',
            ],
            correctIndex: 2,
            explanation:
              'The `as` keyword performs truncating casts: 300 mod 256 = 44. It never panics but can silently produce unexpected values. Use `TryFrom` for safe conversions that return `Result`.',
          },
        ],
        challenge: {
          prompt:
            'Write a program that creates a tuple containing your name (&str), age (i32), and height in meters (f64). Destructure the tuple into named variables and print each value. Then demonstrate type casting by converting the age to f64 and the height to i32.',
          starterCode: `fn main() {
    // TODO: Create a tuple with (name, age, height)

    // TODO: Destructure into named variables

    // TODO: Print each value

    // TODO: Cast age to f64 and height to i32, then print both
}`,
          solutionCode: `fn main() {
    let person: (&str, i32, f64) = ("Alice", 30, 1.72);

    let (name, age, height) = person;
    println!("Name: {}", name);
    println!("Age: {}", age);
    println!("Height: {}", height);

    let age_as_float = age as f64;
    let height_as_int = height as i32;
    println!("Age as f64: {}", age_as_float);
    println!("Height as i32: {}", height_as_int);
}`,
          hints: [
            'Tuples are created with parentheses: `let t: (i32, f64, &str) = (1, 2.0, "hi");`',
            'Destructure with `let (a, b, c) = tuple;` to give each element a meaningful name.',
            'Use `value as TargetType` for type casting, e.g., `age as f64`.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Basic Types                                                  */
  /* ------------------------------------------------------------ */
  {
    id: 'rust-basic-types',
    label: 'Basic Types',
    icon: 'Hash',
    entries: [
      {
        id: 'integers',
        title: 'Integer Types',
        difficulty: 'beginner',
        tags: ['integers', 'i32', 'u32', 'i64', 'usize', 'overflow'],
        cheatSheetSummary: 'Signed: i8, i16, i32, i64, i128, isize. Unsigned: u8, u16, u32, u64, u128, usize.',
        signature: 'i8 | i16 | i32 | i64 | i128 | isize | u8 | u16 | u32 | u64 | u128 | usize',
        sections: [
          {
            heading: 'Integer Sizes and Signedness',
            content:
              'Rust gives you explicit, fine-grained control over integer types — and this is intentional. Unlike languages that give you one "integer" type and hope for the best, Rust makes you think about exactly how much space you need and whether negative values are possible. Signed integers (`i8` through `i128`) store both positive and negative values using two\'s complement. Unsigned integers (`u8` through `u128`) only store non-negative values, giving you double the positive range for the same number of bits. The default integer type is `i32`, which is a sweet spot of range and performance on modern hardware. Two special types deserve attention: `usize` and `isize` match the platform\'s pointer width (64 bits on a 64-bit system, 32 on 32-bit). You\'ll see `usize` everywhere in Rust because it\'s the type used for array indices and collection sizes — it\'s guaranteed to be large enough to address any location in memory.',
            code: `fn main() {
    // Signed integers
    let a: i8 = -128;           // -128 to 127
    let b: i16 = -32_768;       // -32,768 to 32,767
    let c: i32 = 42;            // default integer type
    let d: i64 = 1_000_000_000; // large range
    let e: i128 = 99;           // very large range

    // Unsigned integers
    let f: u8 = 255;            // 0 to 255
    let g: u16 = 65_535;
    let h: u32 = 4_294_967_295;
    let i: u64 = 1_000_000;

    // Platform-sized
    let j: usize = 42;          // used for indexing
    let k: isize = -1;          // signed platform size

    println!("i8: {}, i32: {}, u8: {}, usize: {}", a, c, f, j);
    println!("i64 max: {}", i64::MAX);
    println!("u64 max: {}", u64::MAX);
}`,
            output: `i8: -128, i32: 42, u8: 255, usize: 42
i64 max: 9223372036854775807
u64 max: 18446744073709551615`,
            tip: 'Use `i32` as your default for general-purpose integers — it\'s what the compiler assumes, and it\'s efficient on all modern hardware. Use `u8` for bytes and raw data, `usize` for array indices and collection sizes, and only reach for `i64`/`u64`/`i128`/`u128` when you genuinely need the range.',
            analogy: 'Think of it like choosing containers for liquids. A `u8` is a shot glass (0 to 255), an `i32` is a regular cup (about +/- 2 billion), and an `i128` is a swimming pool. Using a swimming pool to hold a shot of espresso wastes space; using a shot glass for a swimming pool overflows. Rust makes you pick the right container upfront.',
          },
          {
            heading: 'Integer Literals and Bases',
            content:
              'Rust makes it easy to express numbers in whatever base makes sense for your domain. Working with colors? Hex (`0xff`) is natural. Bitmasking? Binary (`0b1111_0000`) makes the bit pattern visible. File permissions? Octal (`0o77`) maps directly to Unix conventions. And here\'s a small but beloved feature: you can sprinkle underscores anywhere in numeric literals for readability. Writing `1_000_000` instead of `1000000` costs nothing at compile time but makes your code dramatically easier to scan. You can even attach a type suffix directly to the literal — `42_u64` creates a `u64` without needing a separate type annotation. This is particularly handy when passing literals to generic functions where the compiler needs a hint about which type you intend.',
            code: `fn main() {
    // Different bases
    let decimal = 98_222;
    let hex = 0xff;
    let octal = 0o77;
    let binary = 0b1111_0000;
    let byte = b'A';              // u8 only

    // Type suffixes
    let x = 42_u64;               // u64
    let y = 1_000_i16;            // i16

    println!("decimal: {}", decimal);
    println!("hex: {} (0xff)", hex);
    println!("octal: {} (0o77)", octal);
    println!("binary: {} (0b1111_0000)", binary);
    println!("byte 'A': {}", byte);
    println!("u64: {}, i16: {}", x, y);
}`,
            output: `decimal: 98222
hex: 255 (0xff)
octal: 63 (0o77)
binary: 240 (0b1111_0000)
byte 'A': 65
u64: 42, i16: 1000`,
            note: 'The `b\'A\'` syntax creates a `u8` byte literal from an ASCII character. This is different from `\'A\'` (which is a 4-byte `char`). Byte literals are essential when working with raw data, network protocols, or any context where you need actual bytes rather than Unicode code points.',
          },
          {
            heading: 'Overflow Behavior',
            content:
              'Integer overflow is a notorious source of security vulnerabilities in C and C++, where it causes undefined behavior — the compiler can literally do *anything*. Rust takes a completely different approach. In debug mode, overflow causes a panic: your program stops immediately with a clear error message. In release mode, overflow wraps around using two\'s complement (so `255_u8 + 1` becomes `0`). But here\'s what makes Rust truly special: it gives you four explicit strategies for handling overflow, so you never have to guess. `wrapping_add` always wraps. `checked_add` returns `None` on overflow, letting you handle it gracefully. `saturating_add` clamps at the maximum (like a volume knob that stops at 10). And `overflowing_add` gives you both the wrapped result and a boolean flag. This is the Rust way: instead of hoping overflow won\'t happen, you decide what *should* happen when it does.',
            code: `fn main() {
    let x: u8 = 250;

    // Wrapping: always wraps on overflow
    let wrapped = x.wrapping_add(10); // 250 + 10 = 4 (mod 256)
    println!("wrapping: {}", wrapped);

    // Checked: returns None on overflow
    let checked = x.checked_add(10);
    println!("checked: {:?}", checked); // None

    let checked_ok = x.checked_add(5);
    println!("checked ok: {:?}", checked_ok); // Some(255)

    // Saturating: clamps at max/min
    let saturated = x.saturating_add(10);
    println!("saturating: {}", saturated); // 255

    // Overflowing: returns value and overflow flag
    let (result, overflowed) = x.overflowing_add(10);
    println!("overflowing: {} (overflow: {})", result, overflowed);
}`,
            output: `wrapping: 4
checked: None
checked ok: Some(255)
saturating: 255
overflowing: 4 (overflow: true)`,
            warning: 'Integer overflow panics in debug mode but silently wraps in release mode — this means code that works in development can behave differently in production! If overflow is possible in your logic, always use `checked_`, `saturating_`, or `wrapping_` methods to make the behavior explicit and consistent across all build profiles.',
            codeHighlightLines: [5, 9, 16, 20],
            analogy: 'Think of it like a car odometer. `wrapping` is a mechanical odometer that rolls from 999999 back to 000000. `checked` is a digital odometer that flashes an error instead of rolling over. `saturating` is an odometer that just stays stuck at 999999. `overflowing` is an odometer that rolls over but also turns on a warning light.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n  A["u8: 250 + 10"] --> B{"Overflow Strategy"}\n  B -->|"wrapping_add"| C["4 (wraps around)"]\n  B -->|"checked_add"| D["None (signals failure)"]\n  B -->|"saturating_add"| E["255 (clamps at max)"]\n  B -->|"overflowing_add"| F["(4, true) (value + flag)"]\n  style A fill:#ffd,stroke:#333\n  style C fill:#fbb,stroke:#333\n  style D fill:#bbf,stroke:#333\n  style E fill:#bfb,stroke:#333\n  style F fill:#fbf,stroke:#333',
              caption: 'Four overflow strategies: wrapping, checked, saturating, and overflowing',
            },
          },
        ],
        quiz: [
          {
            question: 'Which integer type is used for array indexing and collection sizes in Rust?',
            options: [
              'i32',
              'u32',
              'usize',
              'u64',
            ],
            correctIndex: 2,
            explanation:
              '`usize` is the platform-sized unsigned integer type (64 bits on 64-bit systems). It is used for array indexing and collection sizes because it is guaranteed to be large enough to address any memory location.',
          },
          {
            question: 'What happens when integer overflow occurs in debug mode?',
            options: [
              'The value wraps around silently',
              'The program panics with an error message',
              'The value is clamped to the maximum',
              'Undefined behavior occurs',
            ],
            correctIndex: 1,
            explanation:
              'In debug mode, Rust panics on integer overflow to catch bugs early. In release mode, overflow wraps silently (two\'s complement). Use `checked_`, `wrapping_`, or `saturating_` methods for explicit control.',
          },
          {
            question: 'What does `250_u8.saturating_add(10)` return?',
            options: [
              '4 (wraps around)',
              '255 (clamped at maximum)',
              'None (overflow detected)',
              'It panics',
            ],
            correctIndex: 1,
            explanation:
              '`saturating_add` clamps the result at the maximum value of the type. Since 250 + 10 = 260 exceeds `u8::MAX` (255), the result is clamped to 255.',
          },
          {
            question: 'Which literal prefix indicates a binary number in Rust?',
            options: [
              '0x',
              '0o',
              '0b',
              '0d',
            ],
            correctIndex: 2,
            explanation:
              '`0b` is the prefix for binary literals (e.g., `0b1111_0000`). `0x` is for hexadecimal, `0o` is for octal. There is no `0d` prefix in Rust.',
          },
        ],
        challenge: {
          prompt:
            'Write a program that takes a `u8` value of 200 and demonstrates all four overflow strategies (wrapping, checked, saturating, overflowing) when adding 100 to it. Print the result of each operation.',
          starterCode: `fn main() {
    let x: u8 = 200;

    // TODO: Use wrapping_add to add 100 and print the result

    // TODO: Use checked_add to add 100 and print the result (should be None)

    // TODO: Use saturating_add to add 100 and print the result (should be 255)

    // TODO: Use overflowing_add to add 100 and print both the result and the overflow flag
}`,
          solutionCode: `fn main() {
    let x: u8 = 200;

    let wrapped = x.wrapping_add(100);
    println!("wrapping: {} + 100 = {}", x, wrapped); // 44

    let checked = x.checked_add(100);
    println!("checked: {} + 100 = {:?}", x, checked); // None

    let saturated = x.saturating_add(100);
    println!("saturating: {} + 100 = {}", x, saturated); // 255

    let (result, overflowed) = x.overflowing_add(100);
    println!("overflowing: {} + 100 = {} (overflow: {})", x, result, overflowed);
}`,
          hints: [
            'All four methods are called on the integer value itself: `x.wrapping_add(100)`, `x.checked_add(100)`, etc.',
            '`checked_add` returns `Option<u8>` -- use `{:?}` to print it and see `None` or `Some(value)`.',
            '`overflowing_add` returns a tuple `(u8, bool)` where the bool indicates whether overflow occurred.',
          ],
        },
      },
      {
        id: 'floats',
        title: 'Floating-Point Types',
        difficulty: 'beginner',
        tags: ['floats', 'f32', 'f64', 'NaN', 'infinity', 'comparison'],
        cheatSheetSummary: 'f32 (32-bit) and f64 (64-bit, default). Use partial_cmp for comparisons.',
        signature: 'f32 | f64',
        sections: [
          {
            heading: 'f32 and f64',
            content:
              'Rust provides two floating-point types: `f32` (single precision, 32 bits) and `f64` (double precision, 64 bits). The default is `f64`, and for good reason — on modern 64-bit hardware, `f64` operations are just as fast as `f32` but give you roughly 15 decimal digits of precision instead of 7. Both types follow the IEEE 754 standard, which means Rust floats behave identically to floats in C, Java, Python, and virtually every other language. Rust comes with a rich set of mathematical methods built right into the float types — no need to import a math library. Square roots, exponents, trigonometric functions, logarithms — they\'re all methods on `f64` itself. This is one of those small ergonomic wins that makes Rust pleasant to work with: instead of `Math.sqrt(x)`, you write `x.sqrt()`.',
            code: `fn main() {
    let x = 2.0;          // f64 (default)
    let y: f32 = 3.14;    // f32

    // Arithmetic
    let sum = 5.0 + 10.0;
    let diff = 95.5 - 4.3;
    let product = 4.0 * 30.0;
    let quotient = 56.7 / 32.2;
    let remainder = 43.0_f64 % 5.0;

    println!("sum: {}, diff: {}, product: {}", sum, diff, product);
    println!("quotient: {:.4}, remainder: {}", quotient, remainder);

    // Math functions
    let val: f64 = 2.0;
    println!("sqrt(2): {:.6}", val.sqrt());
    println!("2^10: {}", val.powi(10));
    println!("sin(pi/2): {}", (std::f64::consts::PI / 2.0).sin());
    println!("ln(e): {}", std::f64::consts::E.ln());
}`,
            output: `sum: 15, diff: 91.2, product: 120
quotient: 1.7609, remainder: 3
sqrt(2): 1.414214
2^10: 1024
sin(pi/2): 1
ln(e): 1`,
            tip: 'Use `f64` unless you have a specific reason for `f32` (such as GPU programming, SIMD operations, or reducing memory usage for large arrays of floats). The precision difference is enormous, and the performance is identical on modern CPUs.',
          },
          {
            heading: 'Special Float Values',
            content:
              'Here\'s where floating-point numbers get philosophically interesting. IEEE 754 defines three special values: `NaN` (Not a Number), positive infinity, and negative infinity. `NaN` is the result of mathematically undefined operations like `sqrt(-1)` or `0.0 / 0.0`. And here\'s the mind-bender: `NaN` is not equal to *anything*, including itself. `NaN == NaN` is `false`. This isn\'t a Rust quirk — it\'s the IEEE standard, and every language behaves this way. This has a profound consequence in Rust: floats cannot implement the `Eq` trait (full equality), only `PartialEq`. They also cannot implement `Ord` (total ordering), only `PartialOrd`. This is why you can\'t use floats as `HashMap` keys or call `.sort()` directly on a `Vec<f64>`. Another classic trap: `0.1 + 0.2 != 0.3` in every language that uses binary floating point. The solution is epsilon comparison — check if two floats are *close enough* rather than exactly equal.',
            code: `fn main() {
    // Special values
    let inf = f64::INFINITY;
    let neg_inf = f64::NEG_INFINITY;
    let nan = f64::NAN;

    println!("inf: {}", inf);
    println!("-inf: {}", neg_inf);
    println!("NaN: {}", nan);

    // NaN is not equal to itself!
    println!("NaN == NaN: {}", nan == nan);     // false
    println!("is_nan: {}", nan.is_nan());       // true
    println!("is_finite: {}", inf.is_finite()); // false

    // Common sources of NaN
    let sqrt_neg = (-1.0_f64).sqrt();
    println!("sqrt(-1): {} (is_nan: {})", sqrt_neg, sqrt_neg.is_nan());

    // Comparing floats
    let a: f64 = 0.1 + 0.2;
    let b: f64 = 0.3;
    println!("0.1 + 0.2 == 0.3: {}", a == b);          // false!
    println!("approx equal: {}", (a - b).abs() < 1e-10); // true
}`,
            output: `inf: inf
-inf: -inf
NaN: NaN
NaN == NaN: false
is_nan: true
is_finite: false
sqrt(-1): NaN (is_nan: true)
0.1 + 0.2 == 0.3: false
approx equal: true`,
            warning: 'Floats do not implement `Eq` or `Ord` because of `NaN`. This means you cannot use `==` reliably, cannot use floats as `HashMap` keys, and cannot call `.sort()` on `Vec<f64>`. Always use `is_nan()` checks, epsilon comparisons, or `total_cmp` for reliable float handling.',
            analogy: 'Think of it like NaN is a ghost. It looks like it is there, but you cannot catch it, compare it, or pin it down. Even two ghosts standing side by side are not "equal" to each other. This is why Rust refuses to let you use floats in places that require reliable equality (like HashMap keys) -- ghosts make unreliable keys.',
          },
          {
            heading: 'Sorting and Comparing Floats',
            content:
              'Since floats only implement `PartialOrd` (not `Ord`), calling `.sort()` on a `Vec<f64>` won\'t compile — the compiler rightfully points out that `NaN` breaks the total ordering requirement. You have two options. The classic approach is `sort_by` with `partial_cmp`, which works perfectly when you\'re certain there are no `NaN` values (but panics if one sneaks in). The modern, robust approach is `total_cmp`, introduced in Rust 1.62, which provides a *total* ordering where `NaN` sorts after infinity. This makes it safe to sort any float slice without worrying about `NaN`. The key insight: if your data might contain `NaN`, use `total_cmp`. If you\'ve already validated that `NaN` is impossible, `partial_cmp` is fine. For finding min/max, use `f64::min` and `f64::max` — they handle `NaN` by treating it as "missing" and returning the other value.',
            code: `fn main() {
    let mut values = vec![3.14, 1.0, 2.71, 0.5, 1.41];

    // sort_by with partial_cmp (panics if NaN is present)
    values.sort_by(|a, b| a.partial_cmp(b).unwrap());
    println!("sorted: {:?}", values);

    // total_cmp: total ordering (NaN sorts after infinity)
    values.sort_by(|a, b| a.total_cmp(b));
    println!("total_cmp sorted: {:?}", values);

    // Finding min/max
    let min = values.iter().cloned().reduce(f64::min).unwrap();
    let max = values.iter().cloned().reduce(f64::max).unwrap();
    println!("min: {}, max: {}", min, max);
}`,
            output: `sorted: [0.5, 1.0, 1.41, 2.71, 3.14]
total_cmp sorted: [0.5, 1.0, 1.41, 2.71, 3.14]
min: 0.5, max: 3.14`,
            tip: 'Use `total_cmp` for sorting floats — it provides a deterministic total order and handles `NaN` gracefully without panicking. It\'s the "just works" solution that should be your default choice.',
          },
        ],
        quiz: [
          {
            question: 'Why can\'t floats be used as `HashMap` keys in Rust?',
            options: [
              'Floats are too large to hash efficiently',
              'Floats do not implement `Eq` because NaN != NaN',
              'The Rust standard library does not support float hashing',
              'Floats are stored on the heap and cannot be compared',
            ],
            correctIndex: 1,
            explanation:
              'Because `NaN != NaN`, floats only implement `PartialEq` (not `Eq`) and `PartialOrd` (not `Ord`). `HashMap` keys require `Eq + Hash`, which floats cannot satisfy due to this NaN behavior.',
          },
          {
            question: 'What is the result of `0.1_f64 + 0.2_f64 == 0.3_f64`?',
            options: [
              'true',
              'false',
              'Compilation error',
              'Runtime panic',
            ],
            correctIndex: 1,
            explanation:
              'Due to IEEE 754 binary floating-point representation, 0.1 + 0.2 is not exactly 0.3. The result is `false`. Use epsilon comparison like `(a - b).abs() < 1e-10` for approximate equality.',
          },
          {
            question: 'Which method provides a total ordering for floats, including NaN?',
            options: [
              'partial_cmp',
              'cmp',
              'total_cmp',
              'float_cmp',
            ],
            correctIndex: 2,
            explanation:
              '`total_cmp` (introduced in Rust 1.62) provides a total ordering where NaN sorts after infinity. It is safe to use for sorting any float slice without worrying about NaN causing panics.',
          },
        ],
        challenge: {
          prompt:
            'Write a program that creates a vector of f64 values including at least one NaN. Filter out NaN values, sort the remaining values using `total_cmp`, and find the minimum and maximum. Print all results.',
          starterCode: `fn main() {
    let values = vec![3.14, f64::NAN, 1.0, 2.71, f64::NAN, 0.5];

    // TODO: Filter out NaN values into a new Vec<f64>

    // TODO: Sort the filtered values using total_cmp

    // TODO: Find and print the min and max

    // TODO: Print the sorted values
}`,
          solutionCode: `fn main() {
    let values = vec![3.14, f64::NAN, 1.0, 2.71, f64::NAN, 0.5];

    // Filter out NaN values
    let mut clean: Vec<f64> = values.into_iter().filter(|x| !x.is_nan()).collect();

    // Sort using total_cmp
    clean.sort_by(|a, b| a.total_cmp(b));

    // Find min and max
    let min = clean.first().unwrap();
    let max = clean.last().unwrap();

    println!("Sorted: {:?}", clean);
    println!("Min: {}, Max: {}", min, max);
}`,
          hints: [
            'Use `.filter(|x| !x.is_nan())` to remove NaN values from an iterator.',
            'Sort with `.sort_by(|a, b| a.total_cmp(b))` for a safe total ordering on floats.',
            'After sorting, the first element is the minimum and the last is the maximum.',
          ],
        },
      },
      {
        id: 'booleans',
        title: 'Booleans',
        difficulty: 'beginner',
        tags: ['bool', 'true', 'false', 'logical-operators', 'conditions'],
        cheatSheetSummary: 'let flag: bool = true; — no implicit conversion from integers',
        signature: 'bool',
        sections: [
          {
            heading: 'Boolean Basics',
            content:
              'The `bool` type in Rust is delightfully simple and unapologetically strict. It has exactly two values: `true` and `false`. That\'s it. No truthy/falsy values, no implicit conversions from integers, no surprises. If you\'ve ever been bitten by JavaScript\'s `if (0)` or Python\'s `if []:`, you\'ll appreciate Rust\'s stance: the condition in an `if` statement must be explicitly `bool`. Writing `if 1 { }` is a compile error, not a runtime behavior you have to memorize. This eliminates an entire class of subtle bugs where a non-boolean value accidentally becomes a condition. The `&&` (AND), `||` (OR), and `!` (NOT) operators work exactly as you\'d expect. Comparison operators like `>`, `<`, `==`, and `!=` return `bool`, forming the bridge between numeric computation and control flow.',
            code: `fn main() {
    let is_active: bool = true;
    let is_empty = false;  // type inferred as bool

    // Boolean operators
    println!("AND: {}", true && false);  // false
    println!("OR:  {}", true || false);  // true
    println!("NOT: {}", !true);          // false

    // Comparison operators return bool
    let x = 10;
    let y = 20;
    println!("{} > {}: {}", x, y, x > y);
    println!("{} == {}: {}", x, y, x == y);
    println!("{} != {}: {}", x, y, x != y);

    // No implicit conversion from integer
    // if 1 { }  // ERROR: expected bool, found integer
    if x != 0 {
        println!("{} is non-zero", x);
    }
}`,
            output: `AND: false
OR:  true
NOT: false
10 > 20: false
10 == 20: false
10 != 20: true
10 is non-zero`,
            note: 'Rust deliberately rejects truthy/falsy values — only `bool` can be used in conditions. This prevents the classic bugs from accidental type coercion that plague dynamically typed languages. It may feel verbose at first, but `x != 0` is clearer than `x` as a condition, and the compiler enforces this clarity everywhere.',
          },
          {
            heading: 'Short-Circuit Evaluation',
            content:
              'Like most languages, Rust\'s `&&` and `||` operators use short-circuit evaluation: the second operand is only evaluated if the first doesn\'t already determine the result. `false && anything` is always `false`, so the second operand is skipped. `true || anything` is always `true`, so again the second operand is skipped. This isn\'t just an optimization — it\'s a pattern you\'ll use constantly for safety. The classic example: `idx < vec.len() && vec[idx] > 0`. Without short-circuiting, the indexing on the right would panic when `idx` is out of bounds. With short-circuiting, the bounds check on the left acts as a guard, and the indexing only executes when it\'s safe. This pattern is so common in Rust that it becomes second nature.',
            code: `fn expensive_check() -> bool {
    println!("  (expensive_check called)");
    true
}

fn main() {
    // Short-circuit: second operand not evaluated
    let result = false && expensive_check();
    println!("false && ...: {}", result);
    // expensive_check was NOT called

    let result = true || expensive_check();
    println!("true || ...: {}", result);
    // expensive_check was NOT called

    // Useful for guard conditions
    let nums = vec![1, 2, 3];
    let idx = 5;
    if idx < nums.len() && nums[idx] > 0 {
        println!("positive");
    } else {
        println!("out of bounds or not positive");
    }
}`,
            output: `false && ...: false
true || ...: true
out of bounds or not positive`,
            tip: 'Short-circuit evaluation is your go-to pattern for safe access: `idx < vec.len() && vec[idx] > 0` prevents a panic because the indexing only happens when the bounds check passes. You\'ll use this pattern (or its cousin, `.get()` with `Option`) in virtually every Rust program.',
            analogy: 'Think of it like a bouncer at a club with two checkpoints. With `&&`, if you fail the first checkpoint (ID check), the bouncer does not bother with the second (dress code). With `||`, if you pass the first checkpoint (VIP list), you skip the second entirely. The second check only runs when the first one leaves the answer uncertain.',
          },
          {
            heading: 'Booleans in Control Flow',
            content:
              'Booleans in Rust integrate beautifully with the language\'s pattern matching and functional features. You can `match` on a `bool` for clear branching logic, but the real gem is the `.then()` method. Calling `(condition).then(|| value)` converts a `bool` into an `Option`: `Some(value)` if the condition is `true`, `None` if it\'s `false`. This is incredibly useful for building optional values without `if/else` blocks, especially in iterator chains and functional pipelines. Need to count how many items satisfy a condition? Filter booleans. Need to conditionally include a value in a result? Use `.then()`. These small patterns compose together to create code that reads like a description of what you want, rather than step-by-step instructions for how to get it.',
            code: `fn main() {
    let score = 85;
    let passed = score >= 60;

    // Match on bool
    match passed {
        true => println!("Passed!"),
        false => println!("Failed."),
    }

    // bool::then — converts bool to Option
    let bonus = (score > 80).then(|| "Gold star");
    println!("Bonus: {:?}", bonus); // Some("Gold star")

    let no_bonus = (score > 90).then(|| "Platinum");
    println!("No bonus: {:?}", no_bonus); // None

    // Counting trues
    let flags = vec![true, false, true, true, false];
    let count = flags.iter().filter(|&&b| b).count();
    println!("True count: {}", count);
}`,
            output: `Passed!
Bonus: Some("Gold star")
No bonus: None
True count: 3`,
            tip: 'The `.then()` method is a clean alternative to `if condition { Some(value) } else { None }`. It\'s especially powerful in iterator chains: `items.iter().filter_map(|x| (x > 0).then(|| x * 2))` combines filtering and mapping in one step.',
          },
        ],
        quiz: [
          {
            question: 'Can you use an integer as a condition in an `if` statement in Rust?',
            options: [
              'Yes, 0 is false and any non-zero value is true',
              'Yes, but only unsigned integers',
              'No, Rust requires an explicit `bool` type in conditions',
              'Yes, but only with the `as bool` cast',
            ],
            correctIndex: 2,
            explanation:
              'Rust deliberately rejects truthy/falsy values. Only `bool` can be used in conditions. Writing `if 1 { }` is a compile error. You must write `if x != 0 { }` to be explicit.',
          },
          {
            question: 'What does `(score > 80).then(|| "Gold star")` return when score is 75?',
            options: [
              '"Gold star"',
              'Some("Gold star")',
              'None',
              'false',
            ],
            correctIndex: 2,
            explanation:
              'The `.then()` method on `bool` converts `true` to `Some(value)` and `false` to `None`. Since `75 > 80` is `false`, the result is `None`.',
          },
          {
            question: 'In `false && expensive_function()`, is `expensive_function()` called?',
            options: [
              'Yes, both sides are always evaluated',
              'No, short-circuit evaluation skips the second operand',
              'It depends on the return type of the function',
              'Yes, but its return value is discarded',
            ],
            correctIndex: 1,
            explanation:
              'Rust uses short-circuit evaluation. `false && anything` is always `false`, so the right side is never evaluated. Similarly, `true || anything` is always `true`, skipping the right side.',
          },
        ],
        challenge: {
          prompt:
            'Write a program that takes a vector of integer scores and uses boolean methods to: (1) check if all scores are passing (>= 60), (2) check if any score is perfect (== 100), (3) use `.then()` to conditionally create a bonus message for each score above 90, and (4) count how many scores are above 80.',
          starterCode: `fn main() {
    let scores = vec![85, 92, 78, 100, 65, 88];

    // TODO: Check if ALL scores are passing (>= 60)

    // TODO: Check if ANY score is perfect (== 100)

    // TODO: Create a Vec of Option<&str> using .then() for scores > 90

    // TODO: Count how many scores are above 80
}`,
          solutionCode: `fn main() {
    let scores = vec![85, 92, 78, 100, 65, 88];

    let all_passing = scores.iter().all(|&s| s >= 60);
    println!("All passing: {}", all_passing);

    let has_perfect = scores.iter().any(|&s| s == 100);
    println!("Has perfect score: {}", has_perfect);

    let bonuses: Vec<Option<&str>> = scores
        .iter()
        .map(|&s| (s > 90).then(|| "Bonus!"))
        .collect();
    println!("Bonuses: {:?}", bonuses);

    let above_80 = scores.iter().filter(|&&s| s > 80).count();
    println!("Scores above 80: {}", above_80);
}`,
          hints: [
            'Use `.iter().all(|&s| condition)` to check if every element satisfies a predicate.',
            'Use `.then(|| value)` on a bool to convert it to `Some(value)` or `None`.',
            'Use `.iter().filter(|&&s| condition).count()` to count elements matching a predicate.',
          ],
        },
      },
      {
        id: 'characters',
        title: 'Characters',
        difficulty: 'beginner',
        tags: ['char', 'unicode', 'utf-8', 'ascii'],
        cheatSheetSummary: 'char is 4 bytes, represents a Unicode scalar value: let c: char = \'R\';',
        signature: 'char',
        sections: [
          {
            heading: 'Unicode Characters',
            content:
              'Rust\'s `char` type represents a Unicode scalar value — and at 4 bytes, it can hold any character from any writing system on Earth (plus emoji, mathematical symbols, and ancient scripts). This is a conscious design choice: Rust treats internationalization as a first-class concern, not an afterthought. Single quotes denote characters (`\'A\'`), while double quotes denote strings (`"A"`). Don\'t confuse them — they\'re fundamentally different types. A `char` holds exactly one Unicode scalar value; a string is a sequence of UTF-8 encoded bytes that can represent many characters. Rust provides a rich set of methods for character classification: `is_alphabetic()`, `is_numeric()`, `is_whitespace()`, `is_lowercase()`, `is_ascii()`, and many more. These are Unicode-aware, so `\'中\'.is_alphabetic()` returns `true` — it\'s not limited to just ASCII letters.',
            code: `fn main() {
    let letter: char = 'A';
    let emoji: char = '🦀';
    let chinese: char = '中';
    let heart: char = '❤';

    println!("{} {} {} {}", letter, emoji, chinese, heart);
    println!("Size of char: {} bytes", std::mem::size_of::<char>());

    // Unicode escape
    let omega = '\\u{03A9}';  // Ω
    println!("omega: {}", omega);

    // ASCII checks
    println!("'A' is alphabetic: {}", 'A'.is_alphabetic());
    println!("'3' is numeric: {}", '3'.is_numeric());
    println!("' ' is whitespace: {}", ' '.is_whitespace());
    println!("'a' is lowercase: {}", 'a'.is_lowercase());
    println!("'A' is ascii: {}", 'A'.is_ascii());
}`,
            output: `A 🦀 中 ❤
Size of char: 4 bytes
omega: Ω
'A' is alphabetic: true
'3' is numeric: true
' ' is whitespace: true
'a' is lowercase: true
'A' is ascii: true`,
            note: 'A `char` is NOT the same as a byte. In memory, a `char` is always 4 bytes (big enough for any Unicode scalar value). But inside a `String`, characters are encoded as UTF-8, where each character takes 1 to 4 bytes depending on its code point. The crab emoji `\'🦀\'` is one `char` but 4 bytes in a UTF-8 string.',
            analogy: 'Think of it like a universal mailbox. A `char` is a mailbox big enough to hold any letter from any alphabet in the world -- Chinese, Arabic, emoji, anything. It is always the same size (4 bytes) even if the letter inside is a simple ASCII "A". The mailbox is designed for the biggest possible letter so nothing ever gets rejected.',
          },
          {
            heading: 'Character Conversions',
            content:
              'Characters live at the intersection of text and numbers, and Rust gives you clean tools to move between the two worlds. Every `char` has a corresponding Unicode code point (a `u32` value), and you can cast between them. ASCII characters also fit in a `u8`, which is why the `b\'A\'` byte literal syntax exists. The `to_digit` method is particularly elegant: give it a radix, and it converts a character like `\'7\'` to the number `7`, or `\'f\'` to `15` in hexadecimal. It returns `Option<u32>`, so invalid digits safely give you `None` instead of garbage. Case conversion is more subtle than you might expect — `to_uppercase()` and `to_lowercase()` return iterators, not single characters. Why? Because some Unicode conversions produce multiple characters. The German sharp s `\'ß\'` uppercases to "SS" — two characters! Rust handles this correctly by design.',
            code: `fn main() {
    // char to u32 (Unicode code point)
    let c = 'A';
    let code = c as u32;
    println!("'A' as u32: {}", code); // 65

    // u32 to char (if valid Unicode)
    let ch = char::from_u32(128000).unwrap(); // 🐀
    println!("U+1F400: {}", ch);

    // ASCII: char to u8
    let ascii_val = b'Z'; // u8
    println!("'Z' as u8: {}", ascii_val);

    // Convert digit char to number
    let digit = '7';
    let num = digit.to_digit(10).unwrap();
    println!("'7' as number: {}", num);

    // Hex digit
    let hex_digit = 'f';
    let hex_val = hex_digit.to_digit(16).unwrap();
    println!("'f' in hex: {}", hex_val); // 15

    // Case conversion
    println!("'a' to upper: {}", 'a'.to_uppercase().next().unwrap());
    println!("'Z' to lower: {}", 'Z'.to_lowercase().next().unwrap());
}`,
            output: `'A' as u32: 65
U+1F400: 🐀
'Z' as u8: 90
'7' as number: 7
'f' in hex: 15
'a' to upper: A
'Z' to lower: z`,
            tip: '`to_uppercase()` and `to_lowercase()` return iterators, not single characters, because some Unicode conversions are one-to-many (e.g., German sharp s `\'ß\'` uppercases to "SS"). Always use `.next().unwrap()` for ASCII characters, or `.collect::<String>()` for the general case.',
          },
          {
            heading: 'Iterating Over Characters in Strings',
            content:
              'This is one of the most important things to understand about Rust strings: you cannot index into a `String` by position. Writing `s[0]` doesn\'t compile. Why? Because Rust strings are UTF-8 encoded, and characters have variable byte widths — an ASCII letter is 1 byte, an accented letter might be 2, a CJK character is 3, and an emoji is 4. Indexing by byte position could land you in the middle of a character, producing garbage. Rust refuses to let this happen. Instead, use `.chars()` to iterate over Unicode characters or `.bytes()` for raw bytes. Notice the difference between `.chars().count()` (the number of human-visible characters) and `.len()` (the number of bytes). For the string `"Hello, 🌍!"`, these are 9 and 12 respectively — the globe emoji alone takes 4 bytes. Getting the nth character requires `.chars().nth(n)`, which is an O(n) operation because it must walk through the string byte by byte. If you need frequent random access, collect into a `Vec<char>` first.',
            code: `fn main() {
    let text = "Hello, 🌍!";

    // Iterate over chars
    for c in text.chars() {
        print!("[{}] ", c);
    }
    println!();

    // Iterate over bytes
    println!("Bytes: {:?}", text.as_bytes());

    // Character count vs byte count
    println!("Chars: {}", text.chars().count()); // 9
    println!("Bytes: {}", text.len());            // 12

    // Get nth character (O(n) operation)
    let third = text.chars().nth(2);
    println!("3rd char: {:?}", third); // Some('l')

    // Collect chars into a String
    let reversed: String = text.chars().rev().collect();
    println!("Reversed: {}", reversed);
}`,
            output: `[H] [e] [l] [l] [o] [,] [ ] [🌍] [!]
Bytes: [72, 101, 108, 108, 111, 44, 32, 240, 159, 140, 141, 33]
Chars: 9
Bytes: 12
3rd char: Some('l')
Reversed: !🌍 ,olleH`,
            warning: 'String indexing like `s[0]` does not compile in Rust — and this is by design, not an oversight. UTF-8 characters have variable byte widths, so byte indexing could split a character in half. Use `.chars().nth(n)` for character access, but be aware it\'s O(n), not O(1). For frequent random access, collect into a `Vec<char>` first.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'UTF-8 bytes of "Hello, \u{1F30D}!"',
                    type: 'heap',
                    values: [
                      { name: 'H', value: '72 (1 byte)', highlight: false },
                      { name: 'e', value: '101 (1 byte)', highlight: false },
                      { name: 'l', value: '108 (1 byte)', highlight: false },
                      { name: 'l', value: '108 (1 byte)', highlight: false },
                      { name: 'o', value: '111 (1 byte)', highlight: false },
                      { name: ',', value: '44 (1 byte)', highlight: false },
                      { name: ' ', value: '32 (1 byte)', highlight: false },
                      { name: '\u{1F30D}', value: '240,159,140,141 (4 bytes)', highlight: true },
                      { name: '!', value: '33 (1 byte)', highlight: false },
                    ],
                  },
                ],
              },
              caption: 'UTF-8 encoding: ASCII characters take 1 byte each, but the globe emoji takes 4 bytes. Total: 9 chars, 12 bytes.',
            },
          },
        ],
        quiz: [
          {
            question: 'How many bytes does a Rust `char` occupy in memory?',
            options: [
              '1 byte',
              '2 bytes',
              '4 bytes',
              'Variable, depending on the character',
            ],
            correctIndex: 2,
            explanation:
              'A `char` in Rust is always 4 bytes, large enough to hold any Unicode scalar value. This is different from UTF-8 encoding in strings, where characters use 1-4 bytes depending on the code point.',
          },
          {
            question: 'Why does `my_string[0]` not compile in Rust?',
            options: [
              'Strings do not support the index operator at all',
              'UTF-8 characters have variable byte widths, so byte indexing could split a character',
              'Rust strings are stored as linked lists, not contiguous arrays',
              'You must use `my_string.at(0)` instead',
            ],
            correctIndex: 1,
            explanation:
              'Rust strings are UTF-8 encoded, where characters take 1-4 bytes. Indexing by byte position could land in the middle of a multi-byte character, producing invalid data. Use `.chars().nth(n)` for character access.',
          },
          {
            question: 'What does `\'7\'.to_digit(16)` return?',
            options: [
              'Some(7)',
              'Some(55)',
              'None',
              'Some(0x7)',
            ],
            correctIndex: 0,
            explanation:
              '`to_digit(16)` interprets the character as a hexadecimal digit. \'7\' is a valid hex digit with value 7, so it returns `Some(7)`. The radix parameter (16) determines the base, not the output format.',
          },
          {
            question: 'Why do `to_uppercase()` and `to_lowercase()` return iterators instead of a single `char`?',
            options: [
              'For performance reasons to avoid allocations',
              'Because some Unicode conversions produce multiple characters (e.g., sharp s to SS)',
              'Because the result may be empty for some characters',
              'To maintain compatibility with the Iterator trait',
            ],
            correctIndex: 1,
            explanation:
              'Some Unicode case conversions are one-to-many. For example, the German sharp s (\\u{00DF}) uppercases to "SS" (two characters). Returning an iterator handles all cases correctly.',
          },
        ],
        challenge: {
          prompt:
            'Write a program that takes a string containing mixed ASCII and emoji characters, counts the number of characters vs bytes, checks if each character is alphabetic or numeric, and reverses the string. Print all results.',
          starterCode: `fn main() {
    let text = "Rust2024🦀🚀";

    // TODO: Print the character count and byte count

    // TODO: Iterate over characters and print whether each is alphabetic, numeric, or other

    // TODO: Reverse the string and print it
}`,
          solutionCode: `fn main() {
    let text = "Rust2024🦀🚀";

    println!("Characters: {}", text.chars().count());
    println!("Bytes: {}", text.len());

    for c in text.chars() {
        if c.is_alphabetic() {
            println!("'{}' -> alphabetic", c);
        } else if c.is_numeric() {
            println!("'{}' -> numeric", c);
        } else {
            println!("'{}' -> other (emoji/symbol)", c);
        }
    }

    let reversed: String = text.chars().rev().collect();
    println!("Reversed: {}", reversed);
}`,
          hints: [
            'Use `.chars().count()` for the number of Unicode characters and `.len()` for the byte count.',
            'The `is_alphabetic()` and `is_numeric()` methods on `char` are Unicode-aware, not just ASCII.',
            'Reverse a string by collecting the reversed char iterator: `text.chars().rev().collect::<String>()`.',
          ],
        },
      },
      {
        id: 'tuples',
        title: 'Tuples',
        difficulty: 'beginner',
        tags: ['tuples', 'destructuring', 'unit', 'compound-type'],
        cheatSheetSummary: 'let t: (i32, f64, &str) = (1, 2.0, "hi"); — fixed-size, mixed-type',
        signature: '(T1, T2, ..., Tn)',
        sections: [
          {
            heading: 'Tuple Basics',
            content:
              'Tuples are Rust\'s lightweight way of bundling multiple values together — think of them as anonymous structs. They group a fixed number of values that can have different types, all without needing to define a new type name. This makes them perfect for quick, throwaway groupings: a 2D point `(10, 20)`, a database row `("Alice", 30, 5.7)`, or a key-value pair `("name", "Rust")`. Access elements by position using `.0`, `.1`, `.2` — or, more idiomatically, destructure them with pattern matching using `let (name, age, height) = person`. Destructuring is the preferred style because it gives each value a meaningful name, making your code self-documenting. You can even use `_` to ignore values you don\'t need. Tuples can also be nested, and destructuring handles that gracefully too.',
            code: `fn main() {
    // Creating tuples
    let point: (i32, i32) = (10, 20);
    let person: (&str, i32, f64) = ("Alice", 30, 5.7);

    // Access by index
    println!("x: {}, y: {}", point.0, point.1);
    println!("{} is {} years old", person.0, person.1);

    // Destructuring
    let (name, age, height) = person;
    println!("{}: age {}, height {}", name, age, height);

    // Partial destructuring with _
    let (x, _) = point;  // ignore y
    println!("x only: {}", x);

    // Nested tuples
    let nested = ((1, 2), (3, 4));
    let ((a, b), (c, d)) = nested;
    println!("{} {} {} {}", a, b, c, d);
}`,
            output: `x: 10, y: 20
Alice is 30 years old
Alice: age 30, height 5.7
x only: 10
1 2 3 4`,
            note: 'Tuples with different types or lengths are different types — `(i32, f64)` and `(f64, i32)` are not interchangeable, even though they contain the same kinds of values. The type system treats the order and count as part of the identity.',
          },
          {
            heading: 'Tuples as Function Returns',
            content:
              'One of the most practical uses of tuples is returning multiple values from a function. Languages like C force you to use output parameters or allocate a struct; languages like Python return multiple values implicitly. Rust strikes a balance: tuples make multiple returns explicit and type-safe. A function like `min_max` returns `(i32, i32)`, and the caller destructures it into `(lo, hi)` — clean, readable, zero-overhead. You\'ll also encounter tuples constantly with `.enumerate()`, which wraps each element with its index as an `(index, value)` tuple. This is the idiomatic way to loop with an index in Rust, replacing the C-style `for (int i = 0; i < len; i++)` pattern.',
            code: `fn min_max(values: &[i32]) -> (i32, i32) {
    let mut min = values[0];
    let mut max = values[0];
    for &v in &values[1..] {
        if v < min { min = v; }
        if v > max { max = v; }
    }
    (min, max)
}

fn divmod(a: i32, b: i32) -> (i32, i32) {
    (a / b, a % b)
}

fn main() {
    let data = vec![5, 2, 8, 1, 9, 3];
    let (lo, hi) = min_max(&data);
    println!("min: {}, max: {}", lo, hi);

    let (quotient, remainder) = divmod(17, 5);
    println!("17 / 5 = {} remainder {}", quotient, remainder);

    // Enumerate returns (index, value) tuples
    let fruits = vec!["apple", "banana", "cherry"];
    for (i, fruit) in fruits.iter().enumerate() {
        println!("{}: {}", i, fruit);
    }
}`,
            output: `min: 1, max: 9
17 / 5 = 3 remainder 2
0: apple
1: banana
2: cherry`,
            tip: 'When a function returns more than 2-3 values, consider defining a named struct instead. `let (min, max) = min_max(&data)` is clear, but `t.0, t.1, t.2, t.3` quickly becomes unreadable. Named fields are always better than positional access for complex returns.',
          },
          {
            heading: 'Unit Type',
            content:
              'The empty tuple `()` has a special name in Rust: the unit type. It has exactly one possible value — also written `()` — and it represents "nothing meaningful." If you\'ve used `void` in C/C++ or Java, the unit type is similar but more principled: it\'s an actual value you can store, return, and use in generics. Functions that don\'t explicitly return anything implicitly return `()`. This is why `fn greet()` and `fn greet_explicit() -> ()` are equivalent. Here\'s the clever part: the unit type has zero size. `std::mem::size_of::<()>()` returns `0`. This means `Vec<()>` takes no memory for its elements, and `HashMap<K, ()>` is effectively a `HashSet<K>`. The Rust compiler is smart enough to optimize these to their logical equivalents. The unit type is a beautiful example of Rust\'s "zero-cost abstractions" philosophy — it exists at the type level but vanishes at the machine level.',
            code: `// These two signatures are equivalent
fn greet() {
    println!("Hello!");
}

fn greet_explicit() -> () {
    println!("Hello!");
}

fn main() {
    let result = greet();
    println!("greet returned: {:?}", result); // ()

    // Unit in collections
    let units: Vec<()> = vec![(), (), ()];
    println!("units: {:?}", units);

    // Size of unit is zero
    println!("Size of (): {}", std::mem::size_of::<()>());
}`,
            output: `Hello!
Hello!
greet returned: ()
units: [(), (), ()]
Size of (): 0`,
            note: 'The unit type has zero size at runtime, making `Vec<()>` and `HashMap<K, ()>` surprisingly useful. A `HashMap<K, ()>` is essentially a `HashSet` — this pattern appears in real Rust codebases when you need set semantics with a map\'s API.',
            analogy: 'Think of it like an empty envelope. The envelope exists (it is a real value you can hold), but there is nothing inside. In Rust, `()` is that empty envelope. Functions that "return nothing" actually return this empty envelope -- the type system tracks it even though it carries no data.',
          },
        ],
        quiz: [
          {
            question: 'Are `(i32, f64)` and `(f64, i32)` the same type in Rust?',
            options: [
              'Yes, they contain the same value types',
              'No, tuple types include the order of elements',
              'Yes, Rust reorders tuple fields for optimization',
              'It depends on the compiler settings',
            ],
            correctIndex: 1,
            explanation:
              'Tuple types include both the types and the order of their elements. `(i32, f64)` and `(f64, i32)` are entirely different types and cannot be used interchangeably.',
          },
          {
            question: 'What is the unit type `()` in Rust?',
            options: [
              'A null pointer value',
              'An empty tuple that represents "no meaningful value" and has zero size',
              'An error type returned by failed functions',
              'A placeholder for generic type parameters',
            ],
            correctIndex: 1,
            explanation:
              'The unit type `()` is an empty tuple with exactly one possible value (also `()`). It has zero size at runtime and is the implicit return type of functions that do not return anything.',
          },
          {
            question: 'What does `.enumerate()` return when iterating?',
            options: [
              'Just the index as usize',
              'A tuple of (index, value)',
              'A struct with index and value fields',
              'A tuple of (value, index)',
            ],
            correctIndex: 1,
            explanation:
              '`.enumerate()` wraps each element with its index as an `(usize, T)` tuple. This is the idiomatic way to loop with an index in Rust.',
          },
        ],
        challenge: {
          prompt:
            'Write a function called `stats` that takes a slice of f64 values and returns a tuple of (min, max, average). Then call it from main with some sample data and destructure the result to print each statistic.',
          starterCode: `// TODO: Write a function stats that takes &[f64] and returns (f64, f64, f64)
// representing (min, max, average)

fn main() {
    let data = vec![4.0, 2.5, 8.1, 1.3, 6.7];

    // TODO: Call stats and destructure the result

    // TODO: Print min, max, and average
}`,
          solutionCode: `fn stats(values: &[f64]) -> (f64, f64, f64) {
    let mut min = values[0];
    let mut max = values[0];
    let mut sum = 0.0;

    for &v in values {
        if v < min { min = v; }
        if v > max { max = v; }
        sum += v;
    }

    let avg = sum / values.len() as f64;
    (min, max, avg)
}

fn main() {
    let data = vec![4.0, 2.5, 8.1, 1.3, 6.7];
    let (min, max, avg) = stats(&data);
    println!("Min: {}, Max: {}, Avg: {:.2}", min, max, avg);
}`,
          hints: [
            'Initialize min and max with the first element, then iterate over the rest comparing each value.',
            'Calculate the average by dividing the sum by the length. Cast `values.len()` to `f64` with `as f64`.',
            'Return the tuple with `(min, max, avg)` -- no semicolon needed for the last expression in a function.',
          ],
        },
      },
      {
        id: 'arrays',
        title: 'Arrays',
        difficulty: 'beginner',
        tags: ['arrays', 'fixed-size', 'stack-allocated', 'slices', 'indexing'],
        cheatSheetSummary: 'let a: [i32; 5] = [1, 2, 3, 4, 5]; — fixed-size, stack-allocated',
        signature: '[T; N]',
        sections: [
          {
            heading: 'Fixed-Size Arrays',
            content:
              'Arrays in Rust are fundamentally different from arrays in languages like Python or JavaScript. A Rust array has a fixed length that\'s known at compile time, baked right into its type: `[i32; 3]` and `[i32; 5]` are completely different types, just as `i32` and `i64` are different types. This means the compiler knows exactly how much stack space to allocate — no heap allocation, no overhead, no indirection. All elements must be the same type (unlike tuples). You can initialize arrays with explicit values or use the `[value; count]` syntax to fill every element with the same value. Array access is bounds-checked at runtime: trying to access `arr[10]` on a 5-element array will panic with a clear error message, not silently read garbage memory like in C. When you need a collection that can grow or shrink, reach for `Vec<T>` — but when your size is fixed, arrays give you unbeatable performance.',
            code: `fn main() {
    // Explicit type
    let nums: [i32; 5] = [1, 2, 3, 4, 5];

    // Type inferred
    let names = ["Alice", "Bob", "Charlie"];

    // Initialize all elements to the same value
    let zeros = [0_i32; 10];     // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let flags = [true; 3];       // [true, true, true]

    // Access by index
    println!("first: {}", nums[0]);
    println!("last: {}", nums[nums.len() - 1]);
    println!("length: {}", nums.len());

    // Iteration
    for val in &nums {
        print!("{} ", val);
    }
    println!();

    println!("{:?}", zeros);
    println!("{:?}", flags);
}`,
            output: `first: 1
last: 5
length: 5
1 2 3 4 5
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
[true, true, true]`,
            warning: 'Array access is bounds-checked at runtime. Accessing `nums[10]` on a 5-element array causes a panic — not undefined behavior like in C, but still a crash. Use `.get(index)` to get an `Option` that returns `None` for out-of-bounds access instead of panicking.',
          },
          {
            heading: 'Array Slices',
            content:
              'Slices are one of Rust\'s most important concepts, and they\'re the key to writing flexible, reusable functions. A slice `&[T]` is a "fat pointer" — it stores both a pointer to the data and the length. Think of it as a window into a contiguous sequence of elements. The beauty is that slices work with *both* arrays and vectors. A function that takes `&[i32]` can accept a slice of an array, a slice of a vector, or any contiguous chunk of `i32` values. This is why the Rust standard library overwhelmingly uses `&[T]` for parameters rather than specific container types. You create slices with range syntax: `&arr[1..4]` gives you elements at indices 1, 2, and 3. `&arr[..3]` gives you the first three. `&arr[3..]` gives you everything from index 3 onwards. And `.get()` provides safe access that returns `Option` instead of panicking on out-of-bounds access.',
            code: `fn sum(values: &[i32]) -> i32 {
    values.iter().sum()
}

fn print_slice(label: &str, s: &[i32]) {
    println!("{}: {:?}", label, s);
}

fn main() {
    let arr = [10, 20, 30, 40, 50];

    // Full slice
    print_slice("all", &arr[..]);

    // Partial slices
    print_slice("first 3", &arr[..3]);    // [10, 20, 30]
    print_slice("last 2", &arr[3..]);     // [40, 50]
    print_slice("middle", &arr[1..4]);    // [20, 30, 40]

    // Works with both arrays and vectors
    let vec = vec![1, 2, 3, 4, 5];
    println!("array sum: {}", sum(&arr));
    println!("vec sum: {}", sum(&vec));

    // Safe access with .get()
    let safe = arr.get(10); // None, no panic
    println!("safe access: {:?}", safe);
}`,
            output: `all: [10, 20, 30, 40, 50]
first 3: [10, 20, 30]
last 2: [40, 50]
middle: [20, 30, 40]
array sum: 150
vec sum: 15
safe access: None`,
            tip: 'Always prefer `&[T]` over `&Vec<T>` or `&[T; N]` in function parameters. This single change makes your functions work with arrays, vectors, and any other contiguous data source. It\'s the Rust equivalent of "program to an interface, not an implementation."',
            analogy: 'Think of it like a window frame placed over a bookshelf. The bookshelf (array or Vec) holds all the books, and the slice is a window that lets you see and reference a specific section. You can slide the window to see different sections (`&arr[1..4]` vs `&arr[3..]`), but the window never owns the books — it just provides a view into them.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Stack: slice &arr[1..4]',
                    type: 'stack',
                    values: [
                      { name: 'ptr', value: '-> arr[1]', highlight: true },
                      { name: 'len', value: '3', highlight: true },
                    ],
                  },
                  {
                    label: 'Stack: array arr',
                    type: 'stack',
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
              caption: 'A slice is a fat pointer (pointer + length) into contiguous data. &arr[1..4] points to elements 1, 2, 3.',
            },
          },
          {
            heading: 'Array Methods',
            content:
              'Arrays automatically dereference to slices, which means they inherit a wealth of powerful methods from the slice API. Sorting, searching, iterating, windowing — it\'s all available without importing anything. The `.sort()` method sorts in place. `.contains()` checks membership. `.binary_search()` finds elements in O(log n) time on sorted data. Iterator methods like `.all()`, `.any()`, `.sum()`, and `.map()` let you process elements functionally without writing explicit loops. Two methods deserve special attention: `.windows(n)` gives you a sliding window view — perfect for comparing adjacent elements or computing moving averages. `.chunks(n)` splits the data into fixed-size groups, useful for processing data in batches. Both return slices, so they\'re zero-copy and extremely efficient.',
            code: `fn main() {
    let mut nums = [5, 3, 1, 4, 2];

    // Sorting
    nums.sort();
    println!("sorted: {:?}", nums);

    // Searching
    println!("contains 3: {}", nums.contains(&3));
    println!("binary_search 4: {:?}", nums.binary_search(&4));

    // Iteration methods
    let all_positive = nums.iter().all(|&x| x > 0);
    let has_five = nums.iter().any(|&x| x == 5);
    let sum: i32 = nums.iter().sum();
    println!("all positive: {}", all_positive);
    println!("has five: {}", has_five);
    println!("sum: {}", sum);

    // Map to a new array (requires const generics)
    let doubled: Vec<i32> = nums.iter().map(|&x| x * 2).collect();
    println!("doubled: {:?}", doubled);

    // Windows and chunks
    for window in nums.windows(3) {
        println!("window: {:?}", window);
    }
}`,
            output: `sorted: [1, 2, 3, 4, 5]
contains 3: true
binary_search 4: Ok(3)
all positive: true
has five: true
sum: 15
doubled: [2, 4, 6, 8, 10]
window: [1, 2, 3]
window: [2, 3, 4]
window: [3, 4, 5]`,
            tip: 'Use `.windows(n)` for sliding window algorithms (moving averages, comparing adjacent pairs) and `.chunks(n)` for batch processing (processing data in groups of N). Both return slices without copying data, making them ideal for performance-sensitive code.',
          },
        ],
        quiz: [
          {
            question: 'Are `[i32; 3]` and `[i32; 5]` the same type in Rust?',
            options: [
              'Yes, they are both arrays of i32',
              'No, the length is part of the type so they are different types',
              'Yes, but only at runtime',
              'It depends on whether the arrays are mutable',
            ],
            correctIndex: 1,
            explanation:
              'In Rust, the length of an array is part of its type. `[i32; 3]` and `[i32; 5]` are completely different types, just as `i32` and `i64` are different types. This allows the compiler to allocate the exact right amount of stack space.',
          },
          {
            question: 'What does `.get(index)` return on an array when the index is out of bounds?',
            options: [
              'It panics with an error',
              'It returns 0 (the default value)',
              'It returns None',
              'It returns undefined',
            ],
            correctIndex: 2,
            explanation:
              '`.get(index)` returns `Option<&T>`: `Some(&value)` for valid indices and `None` for out-of-bounds access. This is the safe alternative to direct indexing, which panics on out-of-bounds access.',
          },
          {
            question: 'Why should you prefer `&[T]` over `&Vec<T>` in function parameters?',
            options: [
              'Slices are faster than Vec references',
              'Slices work with both arrays and vectors, making functions more flexible',
              'Vec references are deprecated in modern Rust',
              'Slices use less memory than Vec references',
            ],
            correctIndex: 1,
            explanation:
              'A function taking `&[T]` can accept slices of arrays, vectors, or any contiguous data. This makes your function usable with more types. `&Vec<T>` unnecessarily restricts callers to only pass vectors.',
          },
          {
            question: 'What does `.windows(3)` return on the array `[1, 2, 3, 4, 5]`?',
            options: [
              'Three separate arrays: [1,2], [3,4], [5]',
              'Overlapping slices: [1,2,3], [2,3,4], [3,4,5]',
              'Non-overlapping chunks: [1,2,3], [4,5]',
              'A single slice of the first 3 elements: [1,2,3]',
            ],
            correctIndex: 1,
            explanation:
              '`.windows(n)` returns a sliding window iterator that yields overlapping slices of length n. Each window shifts by one element. `.chunks(n)` is the non-overlapping alternative.',
          },
        ],
        challenge: {
          prompt:
            'Write a function called `moving_average` that takes a slice of f64 values and a window size, and returns a Vec<f64> containing the moving average for each window. Use the `.windows()` method. Then call it from main with sample data and print the results.',
          starterCode: `// TODO: Write a function moving_average that takes &[f64] and window size usize
// and returns Vec<f64> of moving averages

fn main() {
    let data = [2.0, 4.0, 6.0, 8.0, 10.0, 12.0];

    // TODO: Call moving_average with a window size of 3

    // TODO: Print the results
}`,
          solutionCode: `fn moving_average(values: &[f64], window_size: usize) -> Vec<f64> {
    values
        .windows(window_size)
        .map(|w| w.iter().sum::<f64>() / w.len() as f64)
        .collect()
}

fn main() {
    let data = [2.0, 4.0, 6.0, 8.0, 10.0, 12.0];
    let averages = moving_average(&data, 3);
    println!("Data: {:?}", data);
    println!("Moving averages (window=3): {:?}", averages);
    // [4.0, 6.0, 8.0, 10.0]
}`,
          hints: [
            'Use `.windows(window_size)` to get overlapping slices of the specified size.',
            'For each window, sum the elements with `.iter().sum::<f64>()` and divide by the window length.',
            'Collect the results into a Vec<f64> with `.collect()`.',
          ],
        },
      },
    ],
  },
];

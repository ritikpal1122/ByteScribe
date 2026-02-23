import type { DocCategory } from './types';

export const CPP_PART1_CATEGORIES: DocCategory[] = [
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
        tags: ['basics', 'first-program', 'cout', 'main'],
        cheatSheetSummary: 'Every C++ program starts with a main() function. Use std::cout to print to the console.',
        crossLanguageId: 'hello-world',
        sections: [
          {
            heading: 'Your First C++ Program',
            content:
              'Welcome to C++! Let\'s start with the classic first program that every programmer writes. Every C++ program needs exactly one `main()` function — think of it as the front door to your program. When you run your executable, the operating system walks up to `main()` and knocks. The `#include <iostream>` line at the top is like telling the compiler, "Hey, I\'m going to need the tools for printing to the screen and reading input." Without it, `std::cout` would be a mystery to the compiler. The `<<` operator is called the insertion operator — picture it as an arrow pushing your data into the output stream and onto the screen. Finally, `return 0` is your program\'s way of telling the operating system, "Everything went fine." It\'s a small program, but every concept here — includes, functions, streams, and return values — will follow you throughout your entire C++ journey.',
            code: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
            output: `Hello, World!`,
            tip: 'The `return 0` at the end of `main` is optional in C++11 and later — the compiler will implicitly return 0 if you omit it. But many developers include it anyway for clarity, especially in teaching code.',
            note: 'C++ was created by Bjarne Stroustrup in 1979, originally called "C with Classes." It has evolved through many standards (C++98, C++11, C++14, C++17, C++20, C++23), each adding powerful features while maintaining backward compatibility.',
            analogy: 'Think of it like a stage play: #include is setting the stage with props, main() is when the curtain rises, cout << pushes words to the audience, and return 0 is the final bow telling the director everything went well.',
            codeHighlightLines: [1, 3, 4, 5],
          },
          {
            heading: 'Using the std Namespace',
            content:
              'You\'ve probably already noticed that writing `std::` before every standard library name feels a bit repetitive. The `using namespace std;` directive is like telling the compiler, "Whenever I say `cout`, I mean `std::cout` — don\'t make me spell it out every time." This is perfectly fine for small programs, practice exercises, and learning. However, in professional codebases — especially in header files — it\'s considered a bad habit because it can cause name collisions. Imagine you define your own function called `count`, but `std::count` already exists. With `using namespace std;`, the compiler wouldn\'t know which one you mean. A nice middle ground is writing `using std::cout;` at the top, which imports only what you need. For learning though, go ahead and use it — we\'ll use it throughout these examples to keep things clean and readable.',
            code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello from C++!" << endl;
    cout << "You can print multiple lines." << endl;
    cout << "Numbers too: " << 42 << endl;
    return 0;
}`,
            output: `Hello from C++!
You can print multiple lines.
Numbers too: 42`,
            warning: 'Never put `using namespace std;` in header files (`.h` or `.hpp`). It pollutes the global namespace for every file that includes your header, potentially causing hard-to-debug name collisions that won\'t show up until months later when someone adds a new include.',
            analogy: 'Think of it like telling a librarian: "Whenever I say a book title, assume I mean from the Science Fiction section." It works fine if you only visit one section, but if two sections have a book with the same name, confusion ensues.',
          },
          {
            heading: 'Printing with Newlines',
            content:
              'Here\'s a detail that surprises many beginners: `std::endl` and `"\\n"` both produce a newline, but they are not the same thing. `endl` does two jobs — it inserts a newline AND flushes the output buffer (forces all pending output to actually appear on screen). The `"\\n"` character just inserts the newline. Why does this matter? Flushing is expensive. If you\'re printing thousands of lines in a loop, using `endl` every time is like flushing a toilet after every drop of water — enormously wasteful. In performance-critical code, the difference can be 10x or more. The general rule: use `"\\n"` by default, and only reach for `endl` when you specifically need to guarantee the output appears immediately (like before a crash-prone operation or when printing a progress indicator).',
            code: `#include <iostream>
using namespace std;

int main() {
    // Using endl (flushes buffer each time)
    cout << "Line 1" << endl;

    // Using \\n (faster, no flush)
    cout << "Line 2\\n";
    cout << "Line 3\\n";

    // Chaining multiple values
    string name = "C++";
    int version = 23;
    cout << "Language: " << name << ", Standard: C++" << version << "\\n";
    return 0;
}`,
            output: `Line 1
Line 2
Line 3
Language: C++, Standard: C++23`,
            tip: 'In competitive programming and performance-sensitive applications, always prefer `"\\n"` over `endl`. Benchmarks have shown that replacing `endl` with `"\\n"` in tight loops can speed up output by 10-20x. You can also add `ios_base::sync_with_stdio(false)` for an additional speed boost.',
            codeHighlightLines: [5, 8, 9],
          },
          {
            heading: 'Program Structure Overview',
            content:
              'Before we dive deeper, let\'s take a bird\'s-eye view of how a C++ source file is organized. Think of it as a recipe card with clear sections: first come the `#include` directives at the top (your ingredients list), then `using` declarations, then your helper functions, and finally `main()` where the cooking actually happens. This structure isn\'t enforced by the compiler — you could technically put things in any order — but following this convention makes your code immediately readable to any C++ developer. Two syntax essentials to internalize: every statement ends with a semicolon `;` (forget one and the compiler will remind you with a cryptic error), and blocks of code are grouped with curly braces `{}`. These braces define scope, which controls where variables exist and are accessible — a concept we\'ll explore thoroughly in the variables section.',
            code: `#include <iostream>   // Preprocessor directive
#include <string>

using namespace std;  // Namespace declaration

// Function declaration
void greet(const string& name) {
    cout << "Welcome, " << name << "!\\n";
}

// Entry point
int main() {
    string user = "Developer";
    greet(user);
    cout << "Program finished successfully.\\n";
    return 0;
}`,
            output: `Welcome, Developer!
Program finished successfully.`,
            note: 'Notice the `const string& name` parameter in the `greet` function. The `&` means we\'re passing by reference (avoiding a copy), and `const` promises we won\'t modify it. This is the idiomatic way to pass strings and other large objects in C++. We\'ll cover this in depth later.',
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    A["#include directives"] --> B["using declarations"]\n    B --> C["Function declarations / definitions"]\n    C --> D["main() entry point"]\n    D --> E["return 0 — exit"]',
              caption: 'Typical layout of a C++ source file from top to bottom',
            },
            codeHighlightLines: [1, 2, 5, 9, 10, 11],
          },
        ],
        quiz: [
          {
            question: 'What does #include <iostream> do in a C++ program?',
            options: [
              'It imports the entire C++ standard library',
              'It includes the header that provides input/output stream objects like cout and cin',
              'It creates a new iostream object',
              'It starts the program execution',
            ],
            correctIndex: 1,
            explanation: '#include <iostream> is a preprocessor directive that copies the contents of the iostream header into your file, giving you access to std::cout, std::cin, std::endl, and other I/O stream facilities.',
          },
          {
            question: 'What is the purpose of return 0 in the main function?',
            options: [
              'It prints 0 to the screen',
              'It restarts the program',
              'It signals to the operating system that the program finished successfully',
              'It is required or the program won\'t compile',
            ],
            correctIndex: 2,
            explanation: 'return 0 indicates successful program termination to the operating system. A non-zero return value typically indicates an error. In C++11 and later, main() implicitly returns 0 if you omit the return statement.',
          },
          {
            question: 'Why is using namespace std; discouraged in header files?',
            options: [
              'It makes the program slower',
              'It only works in .cpp files',
              'It pollutes the global namespace and can cause name collisions in every file that includes the header',
              'It is deprecated in modern C++',
            ],
            correctIndex: 2,
            explanation: 'Putting using namespace std; in a header file forces every file that includes it to have the entire std namespace in scope. This can cause unexpected name collisions that are very hard to debug.',
          },
          {
            question: 'What is the difference between std::endl and "\\n"?',
            options: [
              'There is no difference',
              'endl inserts a newline AND flushes the buffer; \\n only inserts a newline',
              'endl is faster than \\n',
              '\\n only works on Linux',
            ],
            correctIndex: 1,
            explanation: 'std::endl inserts a newline character and then flushes the output buffer, which can be significantly slower in loops. "\\n" just inserts the newline without flushing, making it the preferred choice for performance.',
          },
        ],
        challenge: {
          prompt: 'Write a program that prints your name, your favorite programming language, and the current C++ standard you are using. Use both std::endl and "\\n" to separate lines. Add a comment explaining when to use each.',
          starterCode: `#include <iostream>

int main() {
    // Print your name
    // Print your favorite programming language
    // Print "Using C++17" (or whichever standard)
    // Use both endl and \\n
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int main() {
    // Using endl (flushes buffer - good for interactive output)
    cout << "Name: Alex" << endl;

    // Using \\n (faster - good for bulk output)
    cout << "Favorite language: C++\\n";
    cout << "Standard: C++17\\n";

    // Chaining multiple outputs
    cout << "Learning " << "is " << "fun!" << endl;

    return 0;
}`,
          hints: [
            'Use std::cout << "text" << std::endl; for flushed output or cout << "text\\n"; for just a newline.',
            'You can chain multiple << operators: cout << "Hello " << "World" << endl;',
            'Remember to either use std:: prefix or add using namespace std; at the top.',
          ],
        },
      },
      {
        id: 'compilation-basics',
        title: 'Compilation Basics',
        difficulty: 'beginner',
        tags: ['compiler', 'g++', 'clang++', 'build', 'flags'],
        cheatSheetSummary: 'Compile with g++ -std=c++17 -o program file.cpp, then run with ./program.',
        sections: [
          {
            heading: 'Compiling and Running',
            content:
              'Here\'s something that sets C++ apart from languages like Python or JavaScript: your code doesn\'t run directly. Instead, it goes through a compiler that translates your human-readable source code into machine code — the raw binary instructions your CPU actually understands. Think of the compiler as a translator that converts a novel from English into the CPU\'s native tongue. The two most popular C++ compilers are `g++` (from the GNU project, standard on Linux) and `clang++` (from the LLVM project, default on macOS). The compilation command has a simple anatomy: `g++` invokes the compiler, `-std=c++17` tells it which version of C++ you\'re writing, `-o hello` names the output executable, and `hello.cpp` is your source file. This compilation step is why C++ programs are so fast — by the time you run them, all the hard translation work is already done.',
            code: `// Save this as hello.cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Compiled and running!\\n";
    return 0;
}

// Terminal commands:
// g++ -std=c++17 -o hello hello.cpp
// ./hello`,
            output: `Compiled and running!`,
            tip: 'Use `-std=c++17` or `-std=c++20` to unlock modern C++ features. If you\'re doing competitive programming, most online judges support C++17. If you\'re starting a new project, C++20 offers game-changing features like concepts, ranges, and coroutines.',
            note: 'The compilation process actually has four stages: preprocessing (expanding `#include` and `#define`), compilation (C++ to assembly), assembly (assembly to machine code), and linking (combining everything into an executable). You usually don\'t need to think about these stages, but understanding them helps when debugging build errors.',
            diagram: {
              kind: 'mermaid',
              code: 'graph LR\n    A["hello.cpp\n(source)"] -->|"Preprocessing"| B["hello.i\n(expanded)"]\n    B -->|"Compilation"| C["hello.s\n(assembly)"]\n    C -->|"Assembly"| D["hello.o\n(object)"]\n    D -->|"Linking"| E["hello\n(executable)"]',
              caption: 'The four stages of C++ compilation',
            },
            analogy: 'Think of it like translating a novel: preprocessing gathers all referenced chapters into one manuscript, compilation translates from English to shorthand notation, assembly converts shorthand to binary Morse code, and linking binds all the Morse-coded chapters into one book.',
          },
          {
            heading: 'Useful Compiler Flags',
            content:
              'Compiler flags are your secret weapon for writing safer C++ code. Think of them as adjusting the strictness level of your compiler. During development, you want the compiler to be your pickiest code reviewer: `-Wall` enables most warnings, `-Wextra` turns on even more, and together they catch dozens of common mistakes that would otherwise silently become bugs. The `-g` flag embeds debugging information so tools like `gdb` and `lldb` can show you source code instead of raw memory addresses. But here\'s the real superpower: `-fsanitize=address,undefined` instruments your program to detect memory errors (buffer overflows, use-after-free) and undefined behavior at runtime. These sanitizers have caught countless bugs in production codebases at companies like Google. When you\'re ready to ship or benchmark, switch to `-O2` for optimized builds — the compiler will restructure your code for maximum speed.',
            code: `// Development build (maximum warnings + debug)
// g++ -std=c++17 -Wall -Wextra -g -fsanitize=address,undefined -o prog prog.cpp

// Optimized build (for performance)
// g++ -std=c++17 -O2 -o prog prog.cpp

#include <iostream>
using namespace std;

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    // With -fsanitize=address, accessing arr[5] would be caught
    cout << "Array element: " << arr[4] << "\\n";
    return 0;
}`,
            output: `Array element: 5`,
            warning: 'Out-of-bounds array access is undefined behavior in C++ — one of the most dangerous categories of bugs. Your program might appear to work, silently corrupt data, produce wrong results, or crash unpredictably. The terrifying part? It might work perfectly in testing and only fail in production. Always compile with `-fsanitize=address` during development to catch these issues early.',
            tip: 'Create a shell alias for your development compilation command: `alias cppdev="g++ -std=c++17 -Wall -Wextra -g -fsanitize=address,undefined"`. Then you can just type `cppdev -o prog prog.cpp` every time.',
          },
          {
            heading: 'Multi-File Compilation',
            content:
              'As your programs grow beyond a single file, you\'ll need to split them across multiple source files — this is where C++ really differs from scripting languages. The pattern is straightforward: header files (`.h` or `.hpp`) contain declarations ("here\'s what exists"), while source files (`.cpp`) contain definitions ("here\'s how it works"). Think of headers like a restaurant menu — they list what\'s available — while the source files are the kitchen where the food is actually prepared. You compile all `.cpp` files together, or you can compile them separately into object files (`.o`) and then link them. The separate compilation approach is powerful for large projects: if you change one file, you only need to recompile that file and re-link, rather than recompiling everything. This is exactly what build systems like CMake and Make automate for you.',
            code: `// math_utils.h
// #ifndef MATH_UTILS_H
// #define MATH_UTILS_H
// int add(int a, int b);
// int multiply(int a, int b);
// #endif

// math_utils.cpp
// #include "math_utils.h"
// int add(int a, int b) { return a + b; }
// int multiply(int a, int b) { return a * b; }

// main.cpp
#include <iostream>
using namespace std;

// Simulating the header declarations
int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

int main() {
    cout << "3 + 4 = " << add(3, 4) << "\\n";
    cout << "3 * 4 = " << multiply(3, 4) << "\\n";
    return 0;
}

// Compile: g++ -std=c++17 -o prog main.cpp math_utils.cpp`,
            output: `3 + 4 = 7
3 * 4 = 12`,
            note: 'Header guards (`#ifndef`/`#define`/`#endif`) prevent a header from being included multiple times, which would cause "redefinition" errors. Most modern compilers also support `#pragma once` as a simpler alternative. Both are standard practice — pick whichever your team prefers.',
            tip: 'For anything beyond a handful of files, use a build system like CMake. Writing `CMakeLists.txt` might seem like overhead at first, but it handles dependency tracking, platform differences, and incremental builds automatically — saving you enormous time as your project grows.',
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    H["math_utils.h\n(declarations)"] -->|"#include"| S["math_utils.cpp\n(definitions)"]\n    H -->|"#include"| M["main.cpp\n(uses functions)"]\n    S -->|"compile"| SO["math_utils.o"]\n    M -->|"compile"| MO["main.o"]\n    SO --> L["Linker"]\n    MO --> L\n    L --> E["prog (executable)"]',
              caption: 'Header/source split and multi-file compilation flow',
            },
          },
        ],
        quiz: [
          {
            question: 'What is the purpose of the -std=c++17 flag in g++?',
            options: [
              'It enables standard optimization',
              'It specifies which C++ language standard to use during compilation',
              'It enables standard template library support',
              'It sets the standard output format',
            ],
            correctIndex: 1,
            explanation: 'The -std= flag tells the compiler which version of the C++ standard to target. Different standards (C++11, C++14, C++17, C++20) enable different language features.',
          },
          {
            question: 'What do the -Wall and -Wextra flags do?',
            options: [
              'They make the program run on all platforms',
              'They enable additional compiler warnings to catch potential bugs',
              'They add extra security features',
              'They enable all optimizations',
            ],
            correctIndex: 1,
            explanation: '-Wall enables most common warnings and -Wextra adds additional ones. These flags help catch bugs like unused variables, implicit conversions, and missing return statements at compile time.',
          },
          {
            question: 'What are the main stages of C++ compilation?',
            options: [
              'Write, compile, run',
              'Preprocessing, compilation, assembly, linking',
              'Parsing, optimizing, executing',
              'Interpreting, compiling, loading',
            ],
            correctIndex: 1,
            explanation: 'C++ compilation goes through four stages: preprocessing (#include expansion, macro substitution), compilation (C++ to assembly), assembly (assembly to object code), and linking (combining object files into an executable).',
          },
        ],
        challenge: {
          prompt: 'Write a simple multi-file program. Create a function called add(int, int) declared in a conceptual header. In your main program, call add() and print the result. Show the compilation command as a comment.',
          starterCode: `#include <iostream>
using namespace std;

// Imagine this is in "math_utils.h"
// int add(int a, int b);

// Imagine this is in "math_utils.cpp"
// Implementation of add

int main() {
    // Call add(3, 4) and print the result
    // Add a comment showing how to compile:
    // g++ -std=c++17 -Wall -o program main.cpp math_utils.cpp
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

// In a real project this would be in math_utils.h
int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(3, 4);
    cout << "3 + 4 = " << result << endl;

    // Compile with: g++ -std=c++17 -Wall -Wextra -o program main.cpp
    // For multi-file: g++ -std=c++17 -Wall -o program main.cpp math_utils.cpp
    return 0;
}`,
          hints: [
            'Define the add function above main or use a forward declaration.',
            'The function signature is: int add(int a, int b) { return a + b; }',
            'In a real multi-file setup, you would use a header file for the declaration and a .cpp file for the definition.',
          ],
        },
      },
      {
        id: 'variables',
        title: 'Variables',
        difficulty: 'beginner',
        tags: ['variables', 'declaration', 'initialization', 'scope'],
        cheatSheetSummary: 'C++ variables must be declared with a type: int x = 10; Variables have block scope by default.',
        crossLanguageId: 'variables',
        sections: [
          {
            heading: 'Declaring and Initializing Variables',
            content:
              'If you\'re coming from Python or JavaScript, this is one of the biggest mindset shifts in C++: every variable must declare its type upfront. There\'s no "just put stuff in a box" — you have to say exactly what kind of box you want. This might feel restrictive at first, but it\'s actually one of C++\'s superpowers. By knowing every type at compile time, the compiler can catch bugs before your code ever runs, and it can generate blazingly fast machine code. C++ gives you three ways to initialize variables, and this is worth understanding: copy initialization (`int x = 5`) is the familiar style, direct initialization (`int x(5)`) uses parentheses, and brace initialization (`int x{5}`) uses curly braces. Brace initialization, introduced in C++11, is the most modern and the safest because it prevents "narrowing conversions" — the compiler will refuse to silently lose data. For example, `int x{3.5}` is a compile error (you\'d lose the `.5`), while `int x = 3.5` silently truncates to `3`.',
            code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Copy initialization
    int age = 25;
    double pi = 3.14159;
    char grade = 'A';
    string name = "Alice";

    // Direct initialization
    int count(10);

    // Brace initialization (C++11, prevents narrowing)
    int score{95};
    double rate{4.5};

    cout << "Name: " << name << "\\n";
    cout << "Age: " << age << "\\n";
    cout << "Pi: " << pi << "\\n";
    cout << "Grade: " << grade << "\\n";
    cout << "Score: " << score << "\\n";
    return 0;
}`,
            output: `Name: Alice
Age: 25
Pi: 3.14159
Grade: A
Score: 95`,
            tip: 'Prefer brace initialization `{}` for safety — it prevents accidental narrowing conversions that silently lose data. For example, `int x{3.5};` produces a compiler error, while `int x = 3.5;` silently truncates to `3`. Many style guides (including Google\'s) recommend braces as the default.',
            warning: 'Uninitialized variables in C++ contain garbage values — whatever happened to be in that memory location. Reading an uninitialized variable is undefined behavior. Always initialize your variables, or the compiler might generate code that behaves differently in debug vs. release builds.',
            analogy: 'Think of it like labeling boxes in a warehouse: in Python, you just toss things in any box. In C++, every box must have a label saying exactly what kind of item goes inside. The label is the type, and brace initialization is like adding a seal that rejects items that do not fit.',
            codeHighlightLines: [7, 8, 9, 10, 12, 15, 16],
          },
          {
            heading: 'Variable Scope',
            content:
              'Scope is one of those concepts that seems simple but has deep implications. In C++, variables live inside the curly braces `{}` where they\'re declared — and the moment execution leaves those braces, the variable is destroyed. Think of curly braces as rooms in a house: a variable created in the kitchen (one block) can\'t be accessed from the bedroom (another block). Variables in `main()` are like furniture in the living room — accessible within `main` but not outside it. Global variables, declared outside all functions, are like the house\'s front porch — visible from everywhere. But here\'s the key insight: while global variables seem convenient, they make programs incredibly hard to reason about because any function anywhere can change them. Experienced C++ developers almost always prefer local variables and pass data explicitly through function parameters. This makes the flow of data visible and your code much easier to debug.',
            code: `#include <iostream>
using namespace std;

int globalVar = 100;  // Global variable

int main() {
    int x = 10;  // Local to main

    {
        int y = 20;  // Local to this block
        cout << "Inside block: x=" << x << ", y=" << y << "\\n";
    }
    // y is not accessible here

    for (int i = 0; i < 3; i++) {
        int temp = i * 10;  // Local to for loop
        cout << "Loop: i=" << i << ", temp=" << temp << "\\n";
    }
    // i and temp are not accessible here

    cout << "Global: " << globalVar << "\\n";
    cout << "Local x: " << x << "\\n";
    return 0;
}`,
            output: `Inside block: x=10, y=20
Loop: i=0, temp=0
Loop: i=1, temp=10
Loop: i=2, temp=20
Global: 100
Local x: 10`,
            warning: 'Global variables might seem convenient, but they are one of the biggest sources of hard-to-find bugs in large programs. Any function can modify them at any time, making it nearly impossible to track down where a value changed. Prefer local variables and pass data through function parameters instead.',
            note: 'In C++, variables are destroyed in the reverse order they were created. This "stack unwinding" behavior becomes critically important when you learn about RAII (Resource Acquisition Is Initialization) — one of C++\'s most powerful idioms for managing resources like files, memory, and locks.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  { label: 'Global Scope', type: 'heap', values: [{ name: 'globalVar', value: '100', highlight: false }] },
                  { label: 'main() Stack Frame', type: 'stack', values: [{ name: 'x', value: '10', highlight: true }] },
                  { label: 'Inner Block { }', type: 'stack', values: [{ name: 'y', value: '20', highlight: true }] },
                  { label: 'for Loop Block', type: 'stack', values: [{ name: 'i', value: '0..2', highlight: false }, { name: 'temp', value: 'i*10', highlight: false }] },
                ],
              },
              caption: 'Variable lifetimes: each nested block creates a new scope on the stack',
            },
          },
          {
            heading: 'Multiple Declarations and Assignment',
            content:
              'C++ lets you declare multiple variables of the same type on a single line, separated by commas. While this can save space, it often hurts readability — especially when some variables are initialized and others aren\'t, or when pointers are involved. Most style guides recommend one declaration per line for clarity. Assignment in C++ uses the `=` operator, and it can happen separately from declaration. The compound assignment operators (`+=`, `-=`, `*=`, `/=`, `%=`) are a concise way to update a variable based on its current value. They\'re not just syntactic sugar — they clearly communicate your intent: "I\'m modifying this value, not replacing it." You\'ll see them everywhere in loops, accumulators, and running totals.',
            code: `#include <iostream>
using namespace std;

int main() {
    // Multiple declarations
    int a = 1, b = 2, c = 3;
    cout << "a=" << a << " b=" << b << " c=" << c << "\\n";

    // Assignment after declaration
    int result;
    result = a + b + c;
    cout << "Sum: " << result << "\\n";

    // Compound assignment
    int score = 100;
    score += 10;   // score = score + 10
    score -= 5;    // score = score - 5
    score *= 2;    // score = score * 2
    score /= 3;    // score = score / 3
    score %= 7;    // score = score % 7
    cout << "Final score: " << score << "\\n";

    return 0;
}`,
            output: `a=1 b=2 c=3
Sum: 6
Final score: 0`,
            tip: 'Be careful with multiple declarations involving pointers. In `int* a, b;`, only `a` is a pointer — `b` is a plain `int`. The `*` binds to the variable name, not the type. This is a classic C++ gotcha that trips up even experienced developers.',
          },
        ],
        quiz: [
          {
            question: 'What is the difference between declaration and initialization in C++?',
            options: [
              'They mean the same thing',
              'Declaration creates a variable with a type; initialization gives it a starting value',
              'Initialization creates the variable; declaration assigns a value later',
              'Declaration is for functions, initialization is for variables',
            ],
            correctIndex: 1,
            explanation: 'Declaration tells the compiler the variable\'s name and type (e.g., int x;). Initialization provides an initial value (e.g., int x = 5;). An uninitialized variable in C++ has an indeterminate value.',
          },
          {
            question: 'What happens if you read an uninitialized local variable in C++?',
            options: [
              'It is always zero',
              'It causes a compilation error',
              'It is undefined behavior — the value is indeterminate',
              'It throws a runtime exception',
            ],
            correctIndex: 2,
            explanation: 'Reading an uninitialized local variable is undefined behavior in C++. The variable holds whatever garbage was in that memory location. Always initialize your variables.',
          },
          {
            question: 'What is variable scope in C++?',
            options: [
              'The amount of memory a variable uses',
              'The region of code where a variable is accessible',
              'The type of a variable',
              'How long the program runs',
            ],
            correctIndex: 1,
            explanation: 'Scope defines where a variable can be accessed. A local variable declared inside a block {} is only accessible within that block. Going out of scope destroys the variable.',
          },
          {
            question: 'Which of the following is the recommended way to initialize variables in modern C++?',
            options: [
              'int x = 5;',
              'int x(5);',
              'int x{5};',
              'All three are equally recommended',
            ],
            correctIndex: 2,
            explanation: 'Brace initialization (int x{5};) is recommended in modern C++ because it prevents narrowing conversions (e.g., int x{3.5}; would be a compile error), making your code safer.',
          },
        ],
        challenge: {
          prompt: 'Write a program that swaps two variables without using a temporary variable (use arithmetic or XOR). Then demonstrate variable scope by showing that a variable declared inside a block is not accessible outside it.',
          starterCode: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 25;
    cout << "Before swap: a=" << a << ", b=" << b << endl;

    // Swap a and b without a temp variable

    cout << "After swap: a=" << a << ", b=" << b << endl;

    // Demonstrate scope: declare a variable in a block and show it
    // doesn't exist outside

    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 25;
    cout << "Before swap: a=" << a << ", b=" << b << endl;

    a = a + b;
    b = a - b;
    a = a - b;

    cout << "After swap: a=" << a << ", b=" << b << endl;

    // Scope demonstration
    {
        int scoped = 42;
        cout << "Inside block: scoped = " << scoped << endl;
    }
    // scoped is no longer accessible here
    cout << "Outside block: scoped is not accessible" << endl;

    return 0;
}`,
          hints: [
            'To swap without a temp: a = a + b; b = a - b; a = a - b; works with arithmetic.',
            'You can also use XOR: a ^= b; b ^= a; a ^= b;',
            'Create a block with {} and declare a variable inside it to demonstrate scope.',
          ],
        },
      },
      {
        id: 'input-output',
        title: 'Input & Output',
        difficulty: 'beginner',
        tags: ['cin', 'cout', 'getline', 'io', 'formatting'],
        cheatSheetSummary: 'Use cin >> var for input, cout << var for output. Use getline(cin, str) for full-line string input.',
        crossLanguageId: 'input-output',
        sections: [
          {
            heading: 'Basic Console Input and Output',
            content:
              'C++ handles input and output through stream objects — think of them as data rivers flowing in and out of your program. `std::cout` (character output) is the river flowing out to your screen, and `std::cin` (character input) is the river flowing in from your keyboard. The `<<` operator pushes data into the output stream, while `>>` extracts data from the input stream. Notice how the arrows visually point in the direction data flows — that\'s a nice design touch. One important detail about `cin >>`: it automatically skips leading whitespace and stops reading at the next whitespace character. This means if you type "John Doe", `cin >> name` will only store "John". The space acts like a wall. This behavior is actually useful when reading structured data (like numbers separated by spaces), but you\'ll need a different approach for full lines.',
            code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Output with cout
    cout << "Enter your name: ";
    string name;
    cin >> name;  // Reads one word

    cout << "Enter your age: ";
    int age;
    cin >> age;

    cout << "Hello, " << name << "! You are " << age << " years old.\\n";
    return 0;
}`,
            output: `Enter your name: Alice
Enter your age: 25
Hello, Alice! You are 25 years old.`,
            tip: 'The `>>` operator reads whitespace-delimited tokens. If you type "John Doe", only "John" will be stored in the string. Use `getline()` when you need to capture an entire line including spaces.',
          },
          {
            heading: 'Reading Full Lines with getline',
            content:
              'When you need to read an entire line — names with spaces, full sentences, file paths — `getline()` is your tool. It reads everything up to the newline character, including spaces. But here\'s where one of the most infamous beginner traps lives: mixing `cin >>` with `getline()`. When you use `cin >> age` and the user types "30" and presses Enter, `cin` reads the "30" but leaves the newline character `\\n` sitting in the input buffer like a leftover crumb. When `getline()` runs next, it sees that leftover newline and immediately returns an empty string. The fix is simple: call `cin.ignore()` after `cin >>` to discard that leftover newline. This is such a common stumbling block that it\'s practically a rite of passage for C++ beginners. Once you know the pattern, you\'ll never be bitten by it again.',
            code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int age;
    string fullName;

    cout << "Enter age: ";
    cin >> age;
    cin.ignore();  // Discard leftover newline

    cout << "Enter full name: ";
    getline(cin, fullName);

    cout << "Name: " << fullName << ", Age: " << age << "\\n";

    // Reading multiple lines
    cout << "Enter a sentence: ";
    string sentence;
    getline(cin, sentence);
    cout << "You said: " << sentence << "\\n";

    return 0;
}`,
            output: `Enter age: 30
Enter full name: John Doe
Name: John Doe, Age: 30
Enter a sentence: C++ is powerful
You said: C++ is powerful`,
            warning: 'Always call `cin.ignore()` after `cin >>` and before `getline()`. Forgetting this is one of the most common bugs in beginner C++ programs — your `getline()` will appear to be "skipped" entirely, and the behavior seems baffling until you understand the leftover newline in the buffer.',
            analogy: 'Think of it like a straw in a drink: cin >> sips until it hits ice (whitespace) and stops, leaving the ice in the glass. getline() then tries to sip but immediately hits that leftover ice. cin.ignore() is like removing that piece of ice so the next sip goes smoothly.',
            codeHighlightLines: [8, 9, 12],
          },
          {
            heading: 'Formatted Output',
            content:
              'When you need your output to look polished — aligned tables, precise decimal places, scientific notation — the `<iomanip>` header is your formatting toolkit. Think of manipulators as knobs on a control panel: `setprecision()` controls how many digits appear, `setw()` sets the minimum width of the next output field, and `left`/`right` control alignment within that field. An important detail: `setw()` only affects the very next output operation, then resets. But `fixed`, `scientific`, and `setprecision()` are "sticky" — they stay in effect until you change them. This inconsistency trips people up, so keep it in mind. The `fixed` manipulator forces fixed-point notation (like `3.14`), while `scientific` forces scientific notation (like `3.14e+00`). To go back to the default, use `defaultfloat`.',
            code: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double pi = 3.14159265358979;

    // Precision control
    cout << "Default: " << pi << "\\n";
    cout << "Fixed 2: " << fixed << setprecision(2) << pi << "\\n";
    cout << "Fixed 6: " << setprecision(6) << pi << "\\n";
    cout << "Sci:     " << scientific << setprecision(3) << pi << "\\n";

    // Reset to default
    cout << defaultfloat;

    // Width and alignment
    cout << "\\nFormatted table:\\n";
    cout << left << setw(10) << "Name" << setw(8) << "Score" << "\\n";
    cout << setw(10) << "Alice" << setw(8) << 95 << "\\n";
    cout << setw(10) << "Bob" << setw(8) << 87 << "\\n";
    cout << setw(10) << "Charlie" << setw(8) << 92 << "\\n";

    // Fill character
    cout << "\\n" << setfill('*') << setw(20) << "END" << "\\n";

    return 0;
}`,
            output: `Default: 3.14159
Fixed 2: 3.14
Fixed 6: 3.141593
Sci:     3.142e+00

Formatted table:
Name      Score
Alice     95
Bob       87
Charlie   92

*****************END`,
            tip: 'C++20 introduced `std::format()`, which works like Python\'s f-strings and is much more readable than chained `iomanip` manipulators. If your compiler supports it, `std::format("{:.2f}", pi)` is the modern way to format output.',
          },
          {
            heading: 'Reading Multiple Values',
            content:
              'One of the elegant things about `cin >>` is that you can chain multiple extractions together. `cin >> a >> b >> c` will read three values separated by any whitespace (spaces, tabs, newlines). This is incredibly useful in competitive programming, where input is typically structured as numbers separated by spaces. For reading an unknown amount of input until the end of the stream, you can use `while (cin >> x)` — this reads values until input is exhausted (end-of-file) or the input fails to parse as the expected type. Speaking of failures: if `cin` encounters something it can\'t parse (like reading a letter when it expects a number), it enters a "fail state" and all subsequent reads silently do nothing. This is a common source of infinite loops in beginner programs that read input repeatedly.',
            code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Reading multiple values in one line
    int a, b, c;
    cout << "Enter three numbers: ";
    cin >> a >> b >> c;
    cout << "Sum: " << (a + b + c) << "\\n";

    // Reading a known number of values into a vector
    int n;
    cout << "How many values? ";
    cin >> n;
    vector<int> values(n);
    cout << "Enter " << n << " values: ";
    for (int i = 0; i < n; i++) {
        cin >> values[i];
    }

    cout << "You entered:";
    for (int v : values) {
        cout << " " << v;
    }
    cout << "\\n";

    return 0;
}`,
            output: `Enter three numbers: 10 20 30
Sum: 60
How many values? 4
Enter 4 values: 5 10 15 20
You entered: 5 10 15 20`,
            note: 'In competitive programming, you typically read all input with `cin >>` without any prompts. Input comes from redirected files, not the keyboard. Adding `ios_base::sync_with_stdio(false)` and `cin.tie(nullptr)` at the start of `main()` can dramatically speed up I/O — often the difference between "Accepted" and "Time Limit Exceeded."',
            warning: 'If `cin` fails to read the expected type (e.g., the user types "abc" when an `int` is expected), the stream enters a fail state. All subsequent `cin >>` operations silently fail. Use `cin.fail()` to check, `cin.clear()` to reset the state, and `cin.ignore()` to discard the bad input.',
          },
        ],
        quiz: [
          {
            question: 'What is the difference between cin >> and getline() in C++?',
            options: [
              'There is no difference',
              'cin >> reads until whitespace; getline() reads the entire line including spaces',
              'getline() is faster than cin >>',
              'cin >> can read multiple lines at once',
            ],
            correctIndex: 1,
            explanation: 'cin >> stops reading at the first whitespace character, making it unsuitable for reading strings with spaces. getline() reads the entire line up to the newline character.',
          },
          {
            question: 'Why do you sometimes need cin.ignore() before getline()?',
            options: [
              'To speed up input',
              'To clear the error state',
              'To discard the leftover newline character from a previous cin >> operation',
              'getline() always requires cin.ignore() before it',
            ],
            correctIndex: 2,
            explanation: 'When cin >> reads a value, it leaves the trailing newline in the buffer. If getline() follows, it reads that leftover newline as an empty line. cin.ignore() discards it.',
          },
          {
            question: 'What does ios_base::sync_with_stdio(false) do?',
            options: [
              'Disables all I/O operations',
              'Disables synchronization between C and C++ I/O streams, improving performance',
              'Makes cout synchronous with cerr',
              'Enables multi-threaded I/O',
            ],
            correctIndex: 1,
            explanation: 'By default, C++ syncs its I/O streams with C stdio. Disabling this sync can dramatically speed up cin/cout operations, which is why competitive programmers use it.',
          },
        ],
        challenge: {
          prompt: 'Write a program that reads a person\'s age (integer) and full name (which may contain spaces) from standard input, then prints a formatted greeting. Handle the cin/getline mixing issue correctly.',
          starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int age;
    string fullName;

    cout << "Enter your age: ";
    // Read age

    cout << "Enter your full name: ";
    // Read full name (may contain spaces)
    // Handle the cin/getline mixing issue!

    // Print: "Hello, [name]! You are [age] years old."
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int age;
    string fullName;

    cout << "Enter your age: ";
    cin >> age;

    cout << "Enter your full name: ";
    cin.ignore();
    getline(cin, fullName);

    cout << "Hello, " << fullName << "! You are " << age << " years old." << endl;
    return 0;
}`,
          hints: [
            'Use cin >> age; to read the integer, then cin.ignore(); to discard the leftover newline.',
            'Use getline(cin, fullName); to read the full name including spaces.',
            'Without cin.ignore(), getline will immediately read an empty string from the leftover newline.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Data Types                                                   */
  /* ------------------------------------------------------------ */
  {
    id: 'data-types',
    label: 'Data Types',
    icon: 'Database',
    entries: [
      {
        id: 'integers',
        title: 'Integers',
        difficulty: 'beginner',
        tags: ['int', 'long', 'short', 'unsigned', 'overflow'],
        cheatSheetSummary: 'int is 32-bit (~2.1 billion). Use long long for 64-bit values up to ~9.2 x 10^18.',
        crossLanguageId: 'integers',
        sections: [
          {
            heading: 'Integer Types and Sizes',
            content:
              'C++ gives you a family of integer types with different sizes, and understanding them is essential for writing correct code. The most commonly used is `int`, which is at least 16 bits but practically always 32 bits on modern systems, giving you a range of roughly -2.1 billion to +2.1 billion. When that\'s not enough — and it comes up more often than you\'d think — `long long` gives you at least 64 bits, handling values up to about 9.2 quintillion. Here\'s a subtle but important point: the C++ standard only guarantees *minimum* sizes. An `int` must be at least 16 bits, but on your machine it\'s almost certainly 32. This variability is a historical artifact from C++\'s heritage of running on everything from microcontrollers to supercomputers. If you need an exact, guaranteed size (for file formats, network protocols, or cross-platform code), use the fixed-width types from `<cstdint>`: `int32_t` is always exactly 32 bits, `int64_t` is always exactly 64 bits. No surprises.',
            code: `#include <iostream>
#include <climits>
#include <cstdint>
using namespace std;

int main() {
    short s = 32767;
    int i = 2147483647;
    long l = 2147483647L;
    long long ll = 9223372036854775807LL;

    cout << "short:     " << sizeof(short) << " bytes, max=" << SHRT_MAX << "\\n";
    cout << "int:       " << sizeof(int) << " bytes, max=" << INT_MAX << "\\n";
    cout << "long:      " << sizeof(long) << " bytes\\n";
    cout << "long long: " << sizeof(long long) << " bytes, max=" << LLONG_MAX << "\\n";

    // Fixed-width types from <cstdint>
    int32_t exact32 = 100;
    int64_t exact64 = 100;
    cout << "\\nint32_t: " << sizeof(exact32) << " bytes\\n";
    cout << "int64_t: " << sizeof(exact64) << " bytes\\n";

    return 0;
}`,
            output: `short:     2 bytes, max=32767
int:       4 bytes, max=2147483647
long:      8 bytes
long long: 8 bytes, max=9223372036854775807

int32_t: 4 bytes
int64_t: 8 bytes`,
            tip: 'In competitive programming, a common trick is to use `long long` for everything to avoid overflow headaches. Some contestants even `#define int long long` and rename `main` to `int32_t main()`. It\'s hacky, but it works under time pressure.',
            warning: 'Signed integer overflow is undefined behavior in C++. If you add 1 to `INT_MAX`, the compiler is free to do anything — it might wrap around, optimize away your check, or summon nasal demons. Unlike Java or Python, C++ does not guarantee wraparound for signed integers.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  { label: 'Integer Type Sizes', type: 'stack', values: [
                    { name: 'short', value: '2 bytes (16-bit)', highlight: false },
                    { name: 'int', value: '4 bytes (32-bit)', highlight: true },
                    { name: 'long', value: '8 bytes (64-bit)', highlight: false },
                    { name: 'long long', value: '8 bytes (64-bit)', highlight: true },
                    { name: 'int32_t', value: '4 bytes (exact)', highlight: false },
                    { name: 'int64_t', value: '8 bytes (exact)', highlight: false },
                  ] },
                ],
              },
              caption: 'C++ integer types and their typical sizes on a 64-bit system',
            },
          },
          {
            heading: 'Unsigned Integers',
            content:
              'Every integer type in C++ has an `unsigned` counterpart that trades away the ability to represent negative numbers in exchange for doubling the positive range. `unsigned int` goes from 0 to about 4.3 billion, compared to `int`\'s range of -2.1 to +2.1 billion. This sounds useful, but unsigned integers come with two major traps that even experienced developers fall into. First, subtracting from 0 doesn\'t give you -1 — it wraps around to the maximum value, like an odometer rolling backward. This makes seemingly innocent operations like `vector.size() - 1` dangerous when the vector is empty. Second, and this is the really insidious one: when you compare a signed and unsigned integer, C++ silently converts the signed value to unsigned. This turns -1 into 4,294,967,295, making `-1 < 1` evaluate to *false*. This has caused real bugs in production systems. Use unsigned types primarily for bit manipulation and when interfacing with APIs that require them (like `std::vector::size()`).',
            code: `#include <iostream>
#include <climits>
using namespace std;

int main() {
    unsigned int u = 4294967295U;  // Maximum unsigned int
    cout << "unsigned int max: " << u << "\\n";

    // Danger: unsigned underflow wraps around
    unsigned int x = 0;
    x = x - 1;  // Wraps to UINT_MAX
    cout << "0 - 1 (unsigned): " << x << "\\n";

    // Danger: signed/unsigned comparison
    int negative = -1;
    unsigned int positive = 1;
    if (negative < positive) {
        cout << "-1 < 1: as expected\\n";
    } else {
        cout << "-1 >= 1: surprise! (unsigned comparison)\\n";
    }

    return 0;
}`,
            output: `unsigned int max: 4294967295
0 - 1 (unsigned): 4294967295
-1 >= 1: surprise! (unsigned comparison)`,
            warning: 'Mixing signed and unsigned integers in comparisons is one of C++\'s most notorious foot-guns. The compiler silently converts the signed value to unsigned, turning -1 into a huge positive number. Enable `-Wall -Wextra` to get warnings about these dangerous comparisons. Some teams use `-Werror` to make this a hard error.',
            note: 'The C++ Core Guidelines (maintained by Bjarne Stroustrup and Herb Sutter) recommend avoiding unsigned types for quantities, using them only for bit patterns. The reasoning: the implicit conversion rules cause more bugs than the extra range is worth. Use `int` or `long long` for counts and sizes, and cast explicitly when interfacing with unsigned APIs.',
            analogy: 'Think of it like a car odometer that only shows positive numbers: driving forward adds miles, but trying to "subtract" miles rolls the display to 999999 instead of going negative. That rollover is exactly what happens when you subtract from an unsigned zero.',
            codeHighlightLines: [6, 7, 11, 12],
          },
          {
            heading: 'Integer Literals and Arithmetic',
            content:
              'C++ lets you write integer values in several bases, which is especially handy when working with hardware, binary protocols, or bit manipulation. Decimal is the default, `0x` prefix gives you hexadecimal (base 16, beloved by systems programmers), `0` prefix gives octal (base 8, rarely used intentionally but a common source of bugs), and `0b` prefix gives binary (base 2, added in C++14 — perfect for understanding bit operations). A wonderful readability feature from C++14 is the digit separator: the single quote `\'` can be placed anywhere in a number literal. Writing `1\'000\'000\'000` is so much easier to read than `1000000000`. For arithmetic, the key insight to internalize is that integer division in C++ truncates toward zero — `7 / 2` gives `3`, not `3.5`. The decimal part is simply thrown away. If you want decimal results, at least one operand must be a floating-point type.',
            code: `#include <iostream>
using namespace std;

int main() {
    // Different bases
    int decimal = 255;
    int hex = 0xFF;
    int octal = 0377;
    int binary = 0b11111111;

    cout << "All equal 255: " << decimal << " " << hex << " "
         << octal << " " << binary << "\\n";

    // Digit separator (C++14)
    long long billion = 1'000'000'000;
    cout << "Billion: " << billion << "\\n";

    // Integer division truncates
    cout << "7 / 2 = " << (7 / 2) << "\\n";     // 3, not 3.5
    cout << "-7 / 2 = " << (-7 / 2) << "\\n";   // -3
    cout << "7 % 2 = " << (7 % 2) << "\\n";     // 1

    return 0;
}`,
            output: `All equal 255: 255 255 255 255
Billion: 1000000000
7 / 2 = 3
-7 / 2 = -3
7 % 2 = 1`,
            tip: 'Use the digit separator liberally for large numeric literals: `1\'000\'000` is much easier to read than `1000000`. Your future self (and your teammates) will thank you when scanning code for magic numbers.',
            warning: 'Beware of octal literals! A leading zero makes a number octal: `int x = 010;` gives you `8`, not `10`. This trips people up when formatting numbers with leading zeros. If you meant decimal 10, just write `10`.',
          },
        ],
        quiz: [
          {
            question: 'What happens when an unsigned integer underflows (goes below zero) in C++?',
            options: [
              'It throws a runtime exception',
              'It becomes a large positive number (wraps around)',
              'The program crashes',
              'It becomes -1',
            ],
            correctIndex: 1,
            explanation: 'Unsigned integer arithmetic in C++ is defined as modular arithmetic. Subtracting 1 from 0u wraps around to the maximum value for that type (e.g., 4294967295 for uint32_t).',
          },
          {
            question: 'What is the typical size of an int on most modern 64-bit platforms?',
            options: [
              '2 bytes',
              '4 bytes',
              '8 bytes',
              'It varies with every compiler',
            ],
            correctIndex: 1,
            explanation: 'On most modern platforms, int is 4 bytes (32 bits), giving a range of approximately -2.1 billion to +2.1 billion. The C++ standard only guarantees it is at least 16 bits.',
          },
          {
            question: 'What does the digit separator (single quote) do in C++ numeric literals?',
            options: [
              'It makes the number a string',
              'It has no effect on the value, just improves readability',
              'It separates the integer part from the decimal part',
              'It converts the number to a different base',
            ],
            correctIndex: 1,
            explanation: 'The digit separator (introduced in C++14) is purely cosmetic: 1\'000\'000 is identical to 1000000. It makes large numbers more readable without affecting their value.',
          },
          {
            question: 'What is the result of integer division 7 / 2 in C++?',
            options: [
              '3.5',
              '3',
              '4',
              '3.0',
            ],
            correctIndex: 1,
            explanation: 'When both operands are integers, C++ performs integer division which truncates the result toward zero. 7 / 2 yields 3, not 3.5.',
          },
        ],
        challenge: {
          prompt: 'Write a program that demonstrates integer overflow. Start with INT_MAX, add 1 to it, and show the result. Also demonstrate the modulo operator by checking if numbers are even or odd.',
          starterCode: `#include <iostream>
#include <climits>
using namespace std;

int main() {
    // Show INT_MAX and what happens when you add 1
    // Write a loop that checks numbers 1-10 for even/odd using %
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <climits>
using namespace std;

int main() {
    int maxVal = INT_MAX;
    cout << "INT_MAX: " << maxVal << endl;
    cout << "INT_MAX + 1: " << maxVal + 1 << endl;

    cout << "\\nEven/Odd check:" << endl;
    for (int i = 1; i <= 10; ++i) {
        if (i % 2 == 0) {
            cout << i << " is even" << endl;
        } else {
            cout << i << " is odd" << endl;
        }
    }

    return 0;
}`,
          hints: [
            'Include <climits> for INT_MAX, or use <limits> with numeric_limits<int>::max().',
            'Integer overflow for signed integers is undefined behavior in C++, but on most systems it wraps to INT_MIN.',
            'The modulo operator % gives the remainder: n % 2 == 0 means the number is even.',
          ],
        },
      },
      {
        id: 'floating-point',
        title: 'Floating Point',
        difficulty: 'beginner',
        tags: ['float', 'double', 'precision', 'nan', 'infinity'],
        cheatSheetSummary: 'double has ~15 digits of precision. Use double for most purposes. Avoid comparing floats with ==.',
        crossLanguageId: 'floating-point',
        sections: [
          {
            heading: 'Float vs Double',
            content:
              'C++ gives you three floating-point types, and choosing the right one matters. `float` (32-bit) provides about 7 decimal digits of precision, `double` (64-bit) gives you about 15 digits, and `long double` (80 or 128 bits, platform-dependent) offers extended precision. Here\'s the practical advice: use `double` as your default. Always. The extra memory of `double` over `float` (8 bytes vs. 4) is negligible on modern hardware, and the precision difference is enormous. `float`\'s 7 digits of precision sounds like a lot, but it runs out faster than you\'d expect — for instance, a `float` can\'t even accurately represent a bank balance of $16,777,217 (try it!). The only times `float` makes sense are in GPU programming (where GPUs are optimized for 32-bit operations), or when you\'re storing millions of values and the memory savings actually matter. When writing floating-point literals, remember: `3.14` is a `double` by default. Add an `f` suffix (`3.14f`) to make it a `float`, or an `L` suffix for `long double`.',
            code: `#include <iostream>
#include <iomanip>
#include <cfloat>
using namespace std;

int main() {
    float f = 3.14159265358979f;   // f suffix for float literal
    double d = 3.14159265358979;
    long double ld = 3.14159265358979L;  // L suffix for long double

    cout << fixed << setprecision(15);
    cout << "float:       " << f << " (" << sizeof(f) << " bytes)\\n";
    cout << "double:      " << d << " (" << sizeof(d) << " bytes)\\n";
    cout << "long double: " << ld << " (" << sizeof(ld) << " bytes)\\n";

    cout << "\\nPrecision limits:\\n";
    cout << "float digits:  " << FLT_DIG << "\\n";
    cout << "double digits: " << DBL_DIG << "\\n";

    return 0;
}`,
            output: `float:       3.141592741012573 (4 bytes)
double:      3.141592653589790 (8 bytes)
long double: 3.141592653589790 (16 bytes)

Precision limits:
float digits:  6
double digits: 15`,
            tip: 'Always use `double` unless you have a specific reason to use `float` (GPU programming, SIMD operations, or memory-constrained scenarios with millions of values). The performance difference between `float` and `double` is negligible on modern CPUs — the precision gain is almost always worth it.',
          },
          {
            heading: 'Floating-Point Pitfalls',
            content:
              'If there\'s one thing you take away from this section, let it be this: floating-point numbers are approximations, not exact values. Computers use binary fractions internally, and just like 1/3 can\'t be written as a finite decimal (0.333...), many simple decimal values like 0.1 can\'t be represented exactly in binary. The classic demonstration is `0.1 + 0.2 == 0.3` evaluating to `false` — this isn\'t a C++ bug, it\'s a fundamental property of IEEE 754 floating-point arithmetic that affects every programming language. The lesson: never compare floating-point numbers with `==`. Instead, check if the absolute difference is smaller than a small tolerance (epsilon). A common choice is `1e-9` for `double`. Also be aware of special floating-point values: dividing by zero produces infinity (`inf`), and meaningless operations like `0.0 / 0.0` produce NaN (Not a Number). NaN has the bizarre property of not being equal to anything, including itself — `nan != nan` is `true`. This is actually useful: it\'s the standard way to check for NaN.',
            code: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    // The classic floating-point surprise
    double a = 0.1 + 0.2;
    double b = 0.3;
    cout << "0.1 + 0.2 == 0.3? " << (a == b ? "true" : "false") << "\\n";
    cout << "0.1 + 0.2 = " << a << "\\n";

    // Epsilon-based comparison
    double eps = 1e-9;
    bool equal = fabs(a - b) < eps;
    cout << "Nearly equal? " << (equal ? "true" : "false") << "\\n";

    // Special values
    double inf = 1.0 / 0.0;
    double neg_inf = -1.0 / 0.0;
    double nan_val = 0.0 / 0.0;

    cout << "\\nInfinity: " << inf << "\\n";
    cout << "Negative infinity: " << neg_inf << "\\n";
    cout << "NaN: " << nan_val << "\\n";
    cout << "NaN == NaN? " << (nan_val == nan_val ? "true" : "false") << "\\n";

    return 0;
}`,
            output: `0.1 + 0.2 == 0.3? false
0.1 + 0.2 = 0.3
Nearly equal? true

Infinity: inf
Negative infinity: -inf
NaN: nan
NaN == NaN? false`,
            warning: 'NaN (Not a Number) is not equal to anything, including itself — this is by design in the IEEE 754 standard. Use `std::isnan()` to check for NaN, never `==`. Similarly, use `std::isinf()` to check for infinity. These edge cases have caused real crashes in financial and scientific software.',
            note: 'The `0.1 + 0.2 != 0.3` surprise isn\'t a C++ bug — it affects every language that uses IEEE 754 floating-point (JavaScript, Python, Java, Rust, Go... virtually all of them). There\'s even a website dedicated to it: float.exposed. Understanding this is a rite of passage for every programmer.',
            analogy: 'Think of it like trying to write 1/3 in decimal: you get 0.333... and eventually must round. Computers face the same problem in binary -- 0.1 in decimal is a repeating fraction in binary, so it gets rounded, and those tiny rounding errors accumulate.',
            codeHighlightLines: [4, 5, 9, 10],
          },
          {
            heading: 'Math Functions for Floating Point',
            content:
              'The `<cmath>` header is C++\'s math toolbox, and it\'s impressively comprehensive. You\'ll find everything you need for scientific computing, game development, and algorithmic problem-solving. The functions are organized into natural categories: power and roots (`pow`, `sqrt`, `cbrt`), logarithms (`log` for natural log, `log2`, `log10`), trigonometry (`sin`, `cos`, `tan` and their inverses), rounding (`floor` rounds down, `ceil` rounds up, `round` rounds to nearest), and absolute value (`fabs` for floating-point, `abs` for integers). A handy trick: the mathematical constant pi isn\'t directly available as a standard constant until C++20 (`std::numbers::pi`), but you can compute it precisely with `acos(-1.0)` — since the arccosine of -1 is exactly pi radians. These functions all work with `double` by default, with `float` and `long double` overloads available.',
            code: `#include <iostream>
#include <cmath>
#include <iomanip>
using namespace std;

int main() {
    cout << fixed << setprecision(4);

    cout << "sqrt(144) = " << sqrt(144.0) << "\\n";
    cout << "pow(2, 10) = " << pow(2.0, 10.0) << "\\n";
    cout << "log2(1024) = " << log2(1024.0) << "\\n";
    cout << "abs(-5.3) = " << fabs(-5.3) << "\\n";

    cout << "\\nRounding:\\n";
    cout << "floor(3.7) = " << floor(3.7) << "\\n";
    cout << "ceil(3.2) = " << ceil(3.2) << "\\n";
    cout << "round(3.5) = " << round(3.5) << "\\n";

    cout << "\\nTrigonometry:\\n";
    double pi = acos(-1.0);
    cout << "pi = " << pi << "\\n";
    cout << "sin(pi/2) = " << sin(pi / 2) << "\\n";
    cout << "cos(0) = " << cos(0.0) << "\\n";

    return 0;
}`,
            output: `sqrt(144) = 12.0000
pow(2, 10) = 1024.0000
log2(1024) = 10.0000
abs(-5.3) = 5.3000

Rounding:
floor(3.7) = 3.0000
ceil(3.2) = 4.0000
round(3.5) = 4.0000

Trigonometry:
pi = 3.1416
sin(pi/2) = 1.0000
cos(0) = 1.0000`,
            tip: 'In C++20, you can use `std::numbers::pi`, `std::numbers::e`, and other mathematical constants directly from `<numbers>`. If you\'re on an older standard, `acos(-1.0)` for pi and `exp(1.0)` for e are the classic portable alternatives.',
          },
        ],
        quiz: [
          {
            question: 'Why does 0.1 + 0.2 not exactly equal 0.3 in C++?',
            options: [
              'C++ has a bug in its math library',
              'Floating-point numbers use binary representation that cannot exactly represent some decimal fractions',
              'The + operator is overloaded incorrectly for doubles',
              'You need to use long double for accurate results',
            ],
            correctIndex: 1,
            explanation: 'IEEE 754 floating-point uses binary fractions. Just as 1/3 cannot be exactly represented in decimal, values like 0.1 cannot be exactly represented in binary, leading to small rounding errors.',
          },
          {
            question: 'What is the difference between float and double in C++?',
            options: [
              'float is 4 bytes with ~7 digits of precision; double is 8 bytes with ~15 digits',
              'They have the same precision but different ranges',
              'float is faster and should always be preferred',
              'double is just an alias for float',
            ],
            correctIndex: 0,
            explanation: 'float uses 4 bytes (32 bits) with approximately 7 significant decimal digits of precision. double uses 8 bytes (64 bits) with approximately 15 significant digits. double is the default for floating-point literals.',
          },
          {
            question: 'How should you compare two floating-point numbers for equality?',
            options: [
              'Use == directly',
              'Use the abs of their difference and compare against a small epsilon',
              'Convert them to strings and compare',
              'Cast them to int first',
            ],
            correctIndex: 1,
            explanation: 'Due to rounding errors, direct == comparison of floats is unreliable. Instead, check if abs(a - b) < epsilon, where epsilon is a small tolerance value like 1e-9.',
          },
        ],
        challenge: {
          prompt: 'Write a program that calculates the area and circumference of a circle given its radius. Use a constexpr double for PI. Demonstrate the floating-point comparison issue by checking if 0.1 + 0.2 == 0.3, then fix it using an epsilon-based comparison.',
          starterCode: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    // Define PI as constexpr
    double radius = 5.0;
    // Calculate and print area and circumference
    // Show that 0.1 + 0.2 != 0.3 with ==
    // Fix it using epsilon comparison
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    constexpr double PI = 3.14159265358979323846;
    double radius = 5.0;

    double area = PI * radius * radius;
    double circumference = 2.0 * PI * radius;

    cout << "Radius: " << radius << endl;
    cout << "Area: " << area << endl;
    cout << "Circumference: " << circumference << endl;

    double a = 0.1 + 0.2;
    double b = 0.3;
    cout << "\\n0.1 + 0.2 == 0.3? " << (a == b ? "true" : "false") << endl;

    constexpr double epsilon = 1e-9;
    bool almostEqual = abs(a - b) < epsilon;
    cout << "With epsilon: " << (almostEqual ? "true" : "false") << endl;

    return 0;
}`,
          hints: [
            'Use constexpr double PI = 3.14159265358979323846; for a compile-time constant.',
            'Area = PI * r^2 and Circumference = 2 * PI * r.',
            'For epsilon comparison, use abs(a - b) < epsilon with a small epsilon like 1e-9.',
          ],
        },
      },
      {
        id: 'characters',
        title: 'Characters',
        difficulty: 'beginner',
        tags: ['char', 'ascii', 'character', 'wchar'],
        cheatSheetSummary: 'char stores a single ASCII character (1 byte). Characters are integers under the hood.',
        crossLanguageId: 'characters',
        sections: [
          {
            heading: 'Character Basics',
            content:
              'Here\'s a fundamental truth about `char` in C++ that changes how you think about characters: they are just small integers in disguise. A `char` occupies exactly 1 byte (8 bits) and stores the ASCII numeric code for a character. The letter `\'A\'` is stored as the number 65, `\'a\'` as 97, and `\'0\'` as 48. This dual nature — character and integer at the same time — is incredibly powerful. It means you can do arithmetic on characters: `\'A\' + 1` gives you `\'B\'`, `\'A\' + 25` gives you `\'Z\'`, and `\'a\' - \'A\'` gives you 32 (the offset between uppercase and lowercase in ASCII). The most useful trick: converting a digit character to its numeric value. Since `\'0\'` through `\'9\'` are consecutive in ASCII (codes 48-57), subtracting `\'0\'` from any digit character gives you its integer value. So `\'7\' - \'0\'` equals 7. You\'ll use this pattern constantly in string processing and parsing.',
            code: `#include <iostream>
using namespace std;

int main() {
    char letter = 'A';
    char digit = '7';
    char newline = '\\n';

    cout << "Letter: " << letter << "\\n";
    cout << "ASCII value of 'A': " << (int)letter << "\\n";
    cout << "ASCII value of '7': " << (int)digit << "\\n";

    // Character arithmetic
    cout << "'A' + 1 = " << (char)(letter + 1) << "\\n";  // B
    cout << "'A' + 25 = " << (char)(letter + 25) << "\\n"; // Z

    // Digit to integer
    int num = digit - '0';  // '7' - '0' = 55 - 48 = 7
    cout << "Digit as int: " << num << "\\n";

    // Case conversion manually
    char lower = 'a';
    char upper = lower - 32;  // 'a' - 32 = 'A' in ASCII
    cout << "Uppercase: " << upper << "\\n";

    return 0;
}`,
            output: `Letter: A
ASCII value of 'A': 65
ASCII value of '7': 55
'A' + 1 = B
'A' + 25 = Z
Digit as int: 7
Uppercase: A`,
            tip: 'The `ch - \'0\'` idiom for converting digit characters to integers is one of the most frequently used tricks in C++. It works because ASCII guarantees that `\'0\'` through `\'9\'` are consecutive. The reverse — `n + \'0\'` — converts an integer (0-9) back to its digit character.',
            note: 'The difference between uppercase and lowercase letters in ASCII is always 32. That\'s because the ASCII designers cleverly arranged it so that the case bit is a single bit flip: `\'A\'` is 0100 0001 and `\'a\'` is 0110 0001 — only bit 5 differs. This means you can toggle case with XOR: `ch ^ 32`.',
            codeHighlightLines: [7, 8, 11, 15],
          },
          {
            heading: 'Character Classification and Conversion',
            content:
              'While you can do character classification with ASCII arithmetic (checking if `ch >= \'A\' && ch <= \'Z\'`), the `<cctype>` header provides purpose-built functions that are cleaner and handle edge cases correctly. `isalpha()` checks for letters, `isdigit()` for digits, `isalnum()` for either, `isupper()` and `islower()` check case, and `isspace()` checks for whitespace (spaces, tabs, newlines). For case conversion, `toupper()` and `tolower()` are safer than manual arithmetic because they handle non-letter characters gracefully — calling `toupper(\'5\')` just returns `\'5\'`, whereas manual subtraction would give nonsense. These functions take and return `int` values (for historical compatibility with C), but they work seamlessly with `char`. You\'ll use these constantly when parsing input, validating strings, and implementing algorithms that work with text.',
            code: `#include <iostream>
#include <cctype>
using namespace std;

int main() {
    char chars[] = {'A', 'z', '5', ' ', '!', '\\n'};
    int n = sizeof(chars) / sizeof(chars[0]);

    for (int i = 0; i < n; i++) {
        char c = chars[i];
        cout << "'" << (isprint(c) ? c : '?') << "' -> ";
        cout << "alpha:" << (isalpha(c) ? 1 : 0) << " ";
        cout << "digit:" << (isdigit(c) ? 1 : 0) << " ";
        cout << "alnum:" << (isalnum(c) ? 1 : 0) << " ";
        cout << "space:" << (isspace(c) ? 1 : 0) << "\\n";
    }

    // Case conversion
    string text = "Hello World 123";
    cout << "\\nUpper: ";
    for (char c : text) cout << (char)toupper(c);
    cout << "\\nLower: ";
    for (char c : text) cout << (char)tolower(c);
    cout << "\\n";

    return 0;
}`,
            output: `'A' -> alpha:1 digit:0 alnum:1 space:0
'z' -> alpha:1 digit:0 alnum:1 space:0
'5' -> alpha:0 digit:1 alnum:1 space:0
' ' -> alpha:0 digit:0 alnum:0 space:1
'!' -> alpha:0 digit:0 alnum:0 space:0
'?' -> alpha:0 digit:0 alnum:0 space:1

Upper: HELLO WORLD 123
Lower: hello world 123`,
            tip: 'When using `<cctype>` functions with `char` values that might be negative (e.g., extended ASCII), cast to `unsigned char` first: `isalpha(static_cast<unsigned char>(ch))`. Passing a negative `char` directly is technically undefined behavior.',
          },
          {
            heading: 'Escape Sequences and Special Characters',
            content:
              'Some characters can\'t be typed directly into your source code — how do you put a newline inside a string, or a literal backslash, or a tab? That\'s where escape sequences come in. The backslash `\\` is the escape character, and what follows it determines the special character. You\'ve already been using `\\n` for newlines; `\\t` gives you a tab (great for aligning columns), `\\\\` produces a literal backslash (because `\\` alone would start another escape), `\\"` gives a double quote inside a string, and `\\\'` gives a single quote inside a character literal. The null character `\\0` (ASCII value 0) is special — it marks the end of C-style strings. You can also specify any character by its ASCII code: `\\x41` is hex for `\'A\'`, and `\\101` is octal for `\'A\'`. The carriage return `\\r` moves the cursor back to the beginning of the current line without advancing to the next line — it\'s used in progress bars and spinner animations to overwrite previous output.',
            code: `#include <iostream>
using namespace std;

int main() {
    cout << "Newline: Line1\\nLine2\\n";
    cout << "Tab: Col1\\tCol2\\tCol3\\n";
    cout << "Backslash: C:\\\\Users\\\\file.txt\\n";
    cout << "Quotes: \\"Hello\\" and \\'World\\'\\n";
    cout << "Null char value: " << (int)'\\0' << "\\n";

    // Hex and octal character codes
    char heart = '\\x03';  // ASCII 3 (heart in some charsets)
    cout << "Hex A: " << '\\x41' << "\\n";  // 'A'
    cout << "Octal A: " << '\\101' << "\\n"; // 'A'

    // Alert (beep) and backspace
    // cout << "\\a";  // Makes a beep sound on some terminals
    cout << "Carriage return overwrites: 12345\\rABC\\n";

    return 0;
}`,
            output: `Newline: Line1
Line2
Tab: Col1	Col2	Col3
Backslash: C:\\Users\\file.txt
Quotes: "Hello" and 'World'
Null char value: 0
Hex A: A
Octal A: A
Carriage return overwrites: ABC45`,
            note: 'C++11 introduced raw string literals that let you avoid escape sequences entirely. Write `R"(C:\\Users\\file.txt)"` instead of `"C:\\\\Users\\\\file.txt"`. This is incredibly useful for regular expressions, file paths, and JSON strings where backslashes would otherwise make the code unreadable.',
          },
        ],
        quiz: [
          {
            question: 'What is the underlying representation of a char in C++?',
            options: [
              'A Unicode code point',
              'A small integer (typically the ASCII value)',
              'A 2-byte wide character',
              'A string of length 1',
            ],
            correctIndex: 1,
            explanation: 'In C++, a char is a small integer type (typically 1 byte) that stores the numeric code of a character. On most systems, this is the ASCII value. You can perform arithmetic on chars because of this.',
          },
          {
            question: 'What does the expression \'A\' + 1 evaluate to in C++?',
            options: [
              'The character \'B\' (ASCII 66)',
              'The string "A1"',
              'A compilation error',
              'The integer 1',
            ],
            correctIndex: 0,
            explanation: 'Since chars are integers, \'A\' + 1 adds 1 to the ASCII value of \'A\' (65), yielding 66, which is the ASCII value of \'B\'. When assigned to a char, it becomes \'B\'.',
          },
          {
            question: 'How do you convert a lowercase character to uppercase in C++ without using library functions?',
            options: [
              'c = c - 32',
              'c = c + 32',
              'c = toupper(c)',
              'c = c ^ 32',
            ],
            correctIndex: 0,
            explanation: 'The ASCII values of lowercase letters are 32 greater than their uppercase counterparts. Subtracting 32 from a lowercase char gives the uppercase version. (Though toupper() is the safer, more readable option in practice.)',
          },
        ],
        challenge: {
          prompt: 'Write a program that takes a single character as input and determines if it is an uppercase letter, lowercase letter, digit, or other character. If it is a letter, convert it to the opposite case and print the result.',
          starterCode: `#include <iostream>
using namespace std;

int main() {
    char ch;
    cout << "Enter a character: ";
    cin >> ch;

    // Classify the character and convert case if it's a letter
    // Print the classification and converted character

    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int main() {
    char ch;
    cout << "Enter a character: ";
    cin >> ch;

    if (ch >= 'A' && ch <= 'Z') {
        cout << ch << " is uppercase." << endl;
        cout << "Lowercase: " << char(ch + 32) << endl;
    } else if (ch >= 'a' && ch <= 'z') {
        cout << ch << " is lowercase." << endl;
        cout << "Uppercase: " << char(ch - 32) << endl;
    } else if (ch >= '0' && ch <= '9') {
        cout << ch << " is a digit." << endl;
    } else {
        cout << ch << " is a special character." << endl;
    }

    return 0;
}`,
          hints: [
            'Uppercase letters have ASCII values from 65 (\'A\') to 90 (\'Z\'). Lowercase are from 97 (\'a\') to 122 (\'z\').',
            'To convert case, add or subtract 32 (the difference between lowercase and uppercase ASCII values).',
            'Use char() cast to print the result as a character rather than an integer.',
          ],
        },
      },
      {
        id: 'booleans',
        title: 'Booleans',
        difficulty: 'beginner',
        tags: ['bool', 'true', 'false', 'logical'],
        cheatSheetSummary: 'bool holds true or false (stored as 1 or 0). Non-zero values are truthy.',
        crossLanguageId: 'booleans',
        sections: [
          {
            heading: 'Boolean Values and Expressions',
            content:
              'The `bool` type is the simplest type in C++ — it holds exactly one of two values: `true` or `false`. Under the hood, `true` is stored as `1` and `false` as `0`, which is why `cout` prints them as numbers by default. Add `cout << boolalpha` to switch to the more readable "true"/"false" strings. Booleans are the result of every comparison and logical operation, and they\'re the gatekeepers of control flow — every `if`, `while`, and `for` ultimately evaluates a boolean. C++ provides the full set of comparison operators (`==`, `!=`, `<`, `>`, `<=`, `>=`) and logical operators (`&&` for AND, `||` for OR, `!` for NOT). The logical operators work exactly like their English counterparts: "is the user logged in AND is their subscription active?" translates directly to `isLoggedIn && isSubscribed`. Boolean logic is the foundation of all decision-making in programming, so spending time getting comfortable with these operators pays enormous dividends.',
            code: `#include <iostream>
using namespace std;

int main() {
    bool isReady = true;
    bool isDone = false;

    cout << "isReady: " << isReady << "\\n";  // 1
    cout << "isDone: " << isDone << "\\n";     // 0
    cout << boolalpha;  // Print as "true"/"false"
    cout << "isReady: " << isReady << "\\n";  // true
    cout << "isDone: " << isDone << "\\n";     // false

    // Comparison operators return bool
    int a = 10, b = 20;
    bool result = (a < b);
    cout << "10 < 20: " << result << "\\n";   // true

    // Logical operators
    cout << "true && false: " << (true && false) << "\\n";  // false
    cout << "true || false: " << (true || false) << "\\n";  // true
    cout << "!true: " << (!true) << "\\n";                  // false

    return 0;
}`,
            output: `isReady: 1
isDone: 0
isReady: true
isDone: false
10 < 20: true
true && false: false
true || false: true
!true: false`,
            tip: 'Use `cout << boolalpha` to print "true"/"false" instead of "1"/"0", and `cout << noboolalpha` to switch back. This small change makes debugging output much more readable when tracing boolean logic.',
          },
          {
            heading: 'Truthiness and Implicit Conversions',
            content:
              'C++ has a broad definition of "truthy" and "falsy" values, inherited from C. Any non-zero integer converts to `true`, and zero converts to `false`. Pointers follow the same pattern: a null pointer (`nullptr`) is `false`, and any non-null pointer is `true`. This enables the common idiom `if (ptr)` instead of the more verbose `if (ptr != nullptr)`. While convenient, this implicit conversion creates one of C++\'s most classic bugs: using `=` (assignment) instead of `==` (comparison) in a condition. Writing `if (x = 5)` doesn\'t check if x equals 5 — it assigns 5 to x, then evaluates 5 as true. Your condition always passes, and x is silently modified. This bug is so common it has a name: the "assignment in condition" bug. Modern compilers warn about it, but it still slips through. Some developers write `if (5 == x)` (called "Yoda conditions") to make this a compile error, since you can\'t assign to a literal.',
            code: `#include <iostream>
using namespace std;

int main() {
    cout << boolalpha;

    // Integer to bool
    cout << "bool(0): " << (bool)0 << "\\n";      // false
    cout << "bool(1): " << (bool)1 << "\\n";      // true
    cout << "bool(-5): " << (bool)(-5) << "\\n";  // true
    cout << "bool(42): " << (bool)42 << "\\n";    // true

    // Common idiom: using integers in conditions
    int count = 5;
    if (count) {
        cout << "count is truthy (" << count << ")\\n";
    }

    int zero = 0;
    if (!zero) {
        cout << "zero is falsy\\n";
    }

    // Pointer truthiness
    int* ptr = &count;
    int* null_ptr = nullptr;
    cout << "Non-null ptr: " << (bool)ptr << "\\n";
    cout << "Null ptr: " << (bool)null_ptr << "\\n";

    return 0;
}`,
            output: `bool(0): false
bool(1): true
bool(-5): true
bool(42): true
count is truthy (5)
zero is falsy
Non-null ptr: true
Null ptr: false`,
            warning: 'One of C++\'s most notorious bugs: writing `if (x = 5)` instead of `if (x == 5)`. The single `=` assigns 5 to `x` and the condition always evaluates to `true`. Enable `-Wall` to get compiler warnings about this. Some teams use the "Yoda condition" style `if (5 == x)` to make this mistake a compile error.',
          },
          {
            heading: 'Short-Circuit Evaluation',
            content:
              'Short-circuit evaluation is both a performance optimization and a safety mechanism that you\'ll rely on constantly. Here\'s how it works: for `&&` (AND), if the left side is `false`, the right side is never evaluated — the overall result is already guaranteed to be `false`. For `||` (OR), if the left side is `true`, the right side is skipped because the result is already `true`. This isn\'t just an optimization; it\'s a fundamental tool for writing safe code. The classic pattern is null-pointer guarding: `if (ptr != nullptr && *ptr > 0)`. Without short-circuit evaluation, the dereference `*ptr` would crash when `ptr` is null. With it, the null check on the left prevents the right side from ever executing. You\'ll see this pattern everywhere: bounds checking before array access, file validation before reading, and divisor checking before division. Think of `&&` as saying "only check the second thing IF the first thing passed."',
            code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    cout << boolalpha;

    // Short-circuit AND: second check is safe because of first
    int* ptr = nullptr;
    if (ptr != nullptr && *ptr > 0) {
        cout << "Value is positive\\n";
    } else {
        cout << "Pointer is null, second check skipped\\n";
    }

    // Short-circuit OR: stops at first true
    int x = 10;
    if (x > 5 || x / 0 > 0) {  // Division by zero never happens
        cout << "Short-circuit prevented division by zero\\n";
    }

    // Practical use: bounds checking before access
    vector<int> v = {1, 2, 3};
    int index = 5;
    if (index >= 0 && index < (int)v.size() && v[index] > 0) {
        cout << "Valid and positive\\n";
    } else {
        cout << "Index out of bounds, access skipped\\n";
    }

    return 0;
}`,
            output: `Pointer is null, second check skipped
Short-circuit prevented division by zero
Index out of bounds, access skipped`,
            tip: 'Short-circuit evaluation isn\'t just defensive coding — it\'s a standard pattern used by every C++ developer. Arrange your conditions so that the cheapest or most likely-to-fail check comes first. For example, in `if (index < size && expensive_check(data[index]))`, the bounds check prevents both a crash and an unnecessary expensive computation.',
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    A["Evaluate left side"] -->|"false"| B["&& short-circuits: STOP\nResult = false"]\n    A -->|"true"| C["Evaluate right side"]\n    C -->|"result"| D["Final bool result"]\n    E["Evaluate left side"] -->|"true"| F["|| short-circuits: STOP\nResult = true"]\n    E -->|"false"| G["Evaluate right side"]\n    G -->|"result"| H["Final bool result"]',
              caption: 'Short-circuit evaluation: && stops on first false, || stops on first true',
            },
          },
        ],
        quiz: [
          {
            question: 'What is the size of a bool in C++?',
            options: [
              '1 bit',
              '1 byte (at least)',
              '4 bytes',
              'Implementation-defined, could be any size',
            ],
            correctIndex: 1,
            explanation: 'Although a bool only needs 1 bit to represent true/false, C++ requires every object to be at least 1 byte so that it can have a unique address. Most implementations use exactly 1 byte.',
          },
          {
            question: 'What does the expression (5 && 0) evaluate to in C++?',
            options: [
              '5',
              '0',
              'true',
              'false',
            ],
            correctIndex: 3,
            explanation: 'In C++, && is logical AND. Any non-zero value is truthy and 0 is falsy. Since one operand is 0 (false), the result is false (which is 0 when used in integer context).',
          },
          {
            question: 'What is short-circuit evaluation?',
            options: [
              'The compiler optimizes boolean expressions to run faster',
              'The second operand is not evaluated if the first operand determines the result',
              'Boolean variables use less memory than integers',
              'Logical operators return integer values instead of booleans',
            ],
            correctIndex: 1,
            explanation: 'Short-circuit evaluation means that for &&, if the left operand is false, the right is never evaluated (result is already false). For ||, if the left is true, the right is skipped.',
          },
        ],
        challenge: {
          prompt: 'Write a program that checks whether a given integer is within a range [low, high] (inclusive) using boolean logic. Also demonstrate short-circuit evaluation by writing a safe division check (avoid dividing by zero).',
          starterCode: `#include <iostream>
using namespace std;

bool isInRange(int value, int low, int high) {
    // Return true if value is between low and high (inclusive)
}

bool safeDivide(int a, int b, int& result) {
    // Return true and set result if b != 0; return false otherwise
    // Use short-circuit evaluation
}

int main() {
    cout << boolalpha;
    cout << "5 in [1,10]: " << isInRange(5, 1, 10) << endl;
    cout << "15 in [1,10]: " << isInRange(15, 1, 10) << endl;

    int result;
    if (safeDivide(10, 3, result)) {
        cout << "10 / 3 = " << result << endl;
    }
    if (!safeDivide(10, 0, result)) {
        cout << "Division by zero avoided!" << endl;
    }
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

bool isInRange(int value, int low, int high) {
    return value >= low && value <= high;
}

bool safeDivide(int a, int b, int& result) {
    if (b != 0) {
        result = a / b;
        return true;
    }
    return false;
}

int main() {
    cout << boolalpha;
    cout << "5 in [1,10]: " << isInRange(5, 1, 10) << endl;
    cout << "15 in [1,10]: " << isInRange(15, 1, 10) << endl;

    int result;
    if (safeDivide(10, 3, result)) {
        cout << "10 / 3 = " << result << endl;
    }
    if (!safeDivide(10, 0, result)) {
        cout << "Division by zero avoided!" << endl;
    }
    return 0;
}`,
          hints: [
            'For range checking, use the logical AND operator: value >= low && value <= high.',
            'Short-circuit evaluation means you can safely check b != 0 before performing a / b.',
            'Use boolalpha stream manipulator to print "true"/"false" instead of "1"/"0".',
          ],
        },
      },
      {
        id: 'auto-keyword',
        title: 'Auto Keyword',
        difficulty: 'beginner',
        tags: ['auto', 'type-deduction', 'modern-cpp', 'c++11'],
        cheatSheetSummary: 'auto lets the compiler deduce the type from the initializer: auto x = 42; deduces int.',
        sections: [
          {
            heading: 'Type Deduction with auto',
            content:
              'The `auto` keyword, introduced in C++11, was a game-changer for C++ readability. Instead of writing out the full type of a variable, you let the compiler figure it out from the initializer. Think of it as telling the compiler, "You can see what I\'m assigning — you figure out the type." This is not dynamic typing! The type is still determined at compile time, set in stone, and never changes. It\'s just that you\'re letting the compiler do the bookkeeping. Where `auto` really shines is with complex types. Compare `map<string, vector<int>>::iterator it = myMap.begin()` with `auto it = myMap.begin()`. Same result, vastly different readability. The variable must always be initialized when using `auto` — without an initializer, the compiler has nothing to deduce from. Some teams use `auto` everywhere (the "almost always auto" style), while others use it only when the type is obvious from context. Either way, `auto` has become one of the most beloved features of modern C++.',
            code: `#include <iostream>
#include <vector>
#include <map>
using namespace std;

int main() {
    // Simple type deduction
    auto x = 42;        // int
    auto pi = 3.14;     // double
    auto name = string("C++");  // string
    auto flag = true;    // bool

    cout << "x: " << x << " (int)\\n";
    cout << "pi: " << pi << " (double)\\n";
    cout << "name: " << name << " (string)\\n";

    // auto with complex types
    vector<int> nums = {1, 2, 3, 4, 5};
    auto it = nums.begin();  // vector<int>::iterator
    cout << "First element: " << *it << "\\n";

    map<string, int> scores = {{"Alice", 95}, {"Bob", 87}};
    auto entry = scores.begin();  // map<string,int>::iterator
    cout << "First entry: " << entry->first << "=" << entry->second << "\\n";

    return 0;
}`,
            output: `x: 42 (int)
pi: 3.14 (double)
name: C++ (string)
First element: 1
First entry: Alice=95`,
            tip: '`auto` is especially valuable with iterators and template types where writing the full type name is tedious and error-prone. As a general rule: use `auto` when the type is obvious from the right-hand side, and write explicit types when clarity is needed.',
            note: 'Before C++11, `auto` actually existed as a storage class specifier (like `static`), but nobody used it because local variables were `auto` by default. The C++11 committee repurposed the keyword for type deduction — one of the most popular decisions in C++ history.',
            analogy: 'Think of it like a smart label maker: instead of you writing "box of 32-bit signed integers" on every container, auto reads what you put inside and prints the correct label automatically. The box is still strictly typed -- you just skipped the manual labeling.',
          },
          {
            heading: 'Auto in Range-Based For Loops',
            content:
              'Range-based for loops are where `auto` truly feels at home, and getting the reference qualifiers right here matters for both correctness and performance. You have three options: `auto` makes a copy of each element, `auto&` gives you a mutable reference (you can modify the original), and `const auto&` gives you a read-only reference. Here\'s the key insight: for anything larger than a primitive (strings, vectors, custom objects), copying on every iteration is wasteful. Use `const auto&` as your default for read-only access — it\'s both safe (you can\'t accidentally modify the original) and efficient (no copies). Use `auto&` only when you intentionally want to modify elements in place. And `auto` (by value) is appropriate only for cheap-to-copy types like `int` and `char`, or when you deliberately need a local copy. This is one of those patterns worth committing to muscle memory.',
            code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    vector<string> names = {"Alice", "Bob", "Charlie"};

    // const auto& - read-only, no copies
    cout << "Names: ";
    for (const auto& name : names) {
        cout << name << " ";
    }
    cout << "\\n";

    // auto& - mutable reference, modifies in place
    vector<int> nums = {1, 2, 3, 4, 5};
    for (auto& n : nums) {
        n *= 2;  // Double each element
    }
    cout << "Doubled: ";
    for (const auto& n : nums) {
        cout << n << " ";
    }
    cout << "\\n";

    // auto (by value) - creates copies
    for (auto n : nums) {
        n = 0;  // Modifies the copy only
    }
    cout << "After copy modification: ";
    for (const auto& n : nums) {
        cout << n << " ";  // Original unchanged
    }
    cout << "\\n";

    return 0;
}`,
            output: `Names: Alice Bob Charlie
Doubled: 2 4 6 8 10
After copy modification: 2 4 6 8 10`,
            note: 'Use `const auto&` as your default for range-based for loops — it\'s safe and efficient. Switch to `auto&` when you need to modify elements, and use plain `auto` only when you intentionally want copies. This pattern applies universally across all container types.',
            warning: 'A subtle mistake: using `auto` (by value) when you mean `auto&` (by reference) in a for loop. If you write `for (auto elem : bigVector)`, you\'re copying every element. For a vector of strings, this could mean millions of unnecessary memory allocations. Always ask yourself: "Do I need a copy, or just a view?"',
          },
          {
            heading: 'Auto with Return Types and Structured Bindings',
            content:
              'Modern C++ keeps extending `auto` into new contexts, and two features stand out as particularly transformative. First, C++14 allows `auto` as a function return type, letting the compiler deduce it from the `return` statement. This is convenient for simple functions and essential for some template metaprogramming patterns. Second, C++17 introduced structured bindings — arguably the biggest readability improvement in modern C++. Instead of accessing `pair.first` and `pair.second` (which tell you nothing about what those values represent), you can write `auto [name, age] = pair` and give each component a meaningful name. This works with `std::pair`, `std::tuple`, `std::map` entries, and even your own structs. If you\'ve ever written a loop like `for (const auto& p : myMap)` and then accessed `p.first` and `p.second` everywhere, structured bindings let you write `for (const auto& [key, value] : myMap)` instead. The readability improvement is dramatic.',
            code: `#include <iostream>
#include <map>
#include <tuple>
using namespace std;

// Auto return type (C++14)
auto add(int a, int b) {
    return a + b;  // Compiler deduces int
}

auto divide(double a, double b) {
    return a / b;  // Compiler deduces double
}

// Return a tuple
auto getMinMax(const vector<int>& v) {
    return make_pair(*min_element(v.begin(), v.end()),
                     *max_element(v.begin(), v.end()));
}

int main() {
    cout << "add(3,4) = " << add(3, 4) << "\\n";
    cout << "divide(10,3) = " << divide(10.0, 3.0) << "\\n";

    // Structured bindings (C++17)
    map<string, int> ages = {{"Alice", 30}, {"Bob", 25}};
    for (const auto& [name, age] : ages) {
        cout << name << " is " << age << "\\n";
    }

    vector<int> nums = {5, 1, 9, 3, 7};
    auto [minVal, maxVal] = getMinMax(nums);
    cout << "Min: " << minVal << ", Max: " << maxVal << "\\n";

    return 0;
}`,
            output: `add(3,4) = 7
divide(10,3) = 3.33333
Alice is 30
Bob is 25
Min: 1, Max: 9`,
            tip: 'Structured bindings work with any aggregate type — `std::pair`, `std::tuple`, `std::array`, and even plain structs with public members. They\'re one of the best reasons to use C++17 if you haven\'t already made the switch.',
          },
        ],
        quiz: [
          {
            question: 'What does the auto keyword do in C++11 and later?',
            options: [
              'Declares a variable with automatic storage duration',
              'Lets the compiler deduce the type from the initializer',
              'Creates a dynamic variable on the heap',
              'Makes a variable mutable',
            ],
            correctIndex: 1,
            explanation: 'In modern C++ (C++11+), auto instructs the compiler to automatically deduce the variable\'s type from the expression used to initialize it. It has nothing to do with storage duration.',
          },
          {
            question: 'What type does auto x = 3.14; deduce for x?',
            options: [
              'float',
              'int',
              'double',
              'long double',
            ],
            correctIndex: 2,
            explanation: 'Floating-point literals without a suffix default to double in C++. So auto x = 3.14; deduces x as double. Use 3.14f for float or 3.14L for long double.',
          },
          {
            question: 'What are structured bindings in C++17?',
            options: [
              'A way to bind references to struct members',
              'A syntax to decompose an aggregate into named variables using auto',
              'A method to create structs at compile time',
              'A way to bind functions to objects',
            ],
            correctIndex: 1,
            explanation: 'Structured bindings (auto [a, b] = pair;) let you decompose pairs, tuples, arrays, and structs into individually named variables in a single declaration.',
          },
          {
            question: 'When should you avoid using auto?',
            options: [
              'When the type is obvious from the right-hand side',
              'When iterating over containers',
              'When the deduced type might be surprising and readability suffers',
              'When working with standard library types',
            ],
            correctIndex: 2,
            explanation: 'Avoid auto when the deduced type is not obvious from context, as it can hurt readability. For example, auto result = compute(); does not tell the reader what type result is.',
          },
        ],
        challenge: {
          prompt: 'Write a program that uses auto with different initializers (int, double, string, vector) and uses a C++17 structured binding to decompose a std::pair. Print each variable along with its value.',
          starterCode: `#include <iostream>
#include <string>
#include <vector>
#include <utility>
using namespace std;

int main() {
    // Use auto to declare variables of different types
    // Create a pair and use structured binding to decompose it
    // Print all values
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <utility>
using namespace std;

int main() {
    auto count = 42;
    auto pi = 3.14159;
    auto name = string("C++17");
    auto nums = vector<int>{1, 2, 3, 4, 5};

    cout << "count: " << count << endl;
    cout << "pi: " << pi << endl;
    cout << "name: " << name << endl;
    cout << "nums size: " << nums.size() << endl;

    auto coords = make_pair(10.5, 20.3);
    auto [x, y] = coords;
    cout << "x: " << x << ", y: " << y << endl;

    return 0;
}`,
          hints: [
            'Remember that auto deduces "C++17" as const char*, not string. Use string("C++17") or string literal "C++17"s with the s suffix.',
            'Use auto [x, y] = pair; syntax for structured bindings in C++17.',
            'You can use make_pair() or brace initialization to create a std::pair.',
          ],
        },
      },
      {
        id: 'type-casting',
        title: 'Type Casting',
        difficulty: 'intermediate',
        tags: ['casting', 'static_cast', 'conversion', 'narrowing'],
        cheatSheetSummary: 'Use static_cast<Type>(expr) for safe explicit conversions. Avoid C-style casts.',
        sections: [
          {
            heading: 'Implicit and Explicit Conversions',
            content:
              'Type conversions in C++ are a critical concept to master because they happen both visibly and invisibly. Implicit (automatic) conversions follow a promotion hierarchy: smaller types are promoted to larger types when mixed in expressions (`bool` -> `char` -> `short` -> `int` -> `long` -> `long long` -> `float` -> `double`). These "widening" conversions are safe — no data is lost. The dangerous direction is "narrowing": converting from a larger type to a smaller one, like `double` to `int`. The decimal part is silently discarded without any warning (unless you use brace initialization). Explicit casts are your way of telling the compiler, "I know this conversion might lose data, and I\'m doing it intentionally." Modern C++ provides `static_cast<Type>(expr)` for this purpose. A classic gotcha: integer division. When you write `7 / 2`, both operands are `int`, so C++ performs integer division and gives you `3`. To get `3.5`, cast at least one operand to `double` first: `static_cast<double>(7) / 2`.',
            code: `#include <iostream>
using namespace std;

int main() {
    // Implicit widening (safe)
    int i = 42;
    double d = i;  // int -> double, no data loss
    cout << "int to double: " << d << "\\n";

    // Implicit narrowing (dangerous)
    double pi = 3.14159;
    int truncated = pi;  // double -> int, decimal lost
    cout << "double to int: " << truncated << "\\n";

    // Explicit cast with static_cast (preferred)
    double result = static_cast<double>(7) / 2;
    cout << "7/2 with cast: " << result << "\\n";

    // Without cast: integer division
    double wrong = 7 / 2;
    cout << "7/2 without cast: " << wrong << "\\n";

    // C-style cast (avoid in modern C++)
    int c_cast = (int)3.99;
    cout << "C-style cast: " << c_cast << "\\n";

    return 0;
}`,
            output: `int to double: 42
double to int: 3
7/2 with cast: 3.5
7/2 without cast: 3
C-style cast: 3`,
            tip: 'Always use `static_cast` instead of C-style casts like `(int)x`. `static_cast` is checked at compile time, clearly communicates your intent, and is searchable in your codebase. C-style casts can silently perform dangerous conversions that `static_cast` would refuse.',
            warning: 'The expression `double result = 7 / 2;` gives `3.0`, not `3.5`! The division happens first (as integer division yielding `3`), and only then is the result converted to `double`. You need at least one floating-point operand: `7.0 / 2` or `static_cast<double>(7) / 2`.',
            diagram: {
              kind: 'mermaid',
              code: 'graph LR\n    A["bool"] -->|"widening"| B["char"]\n    B --> C["short"]\n    C --> D["int"]\n    D --> E["long"]\n    E --> F["long long"]\n    F --> G["float"]\n    G --> H["double"]\n    H -.->|"narrowing\n(data loss!)"| D',
              caption: 'Implicit promotion hierarchy: widening is safe, narrowing risks data loss',
            },
            codeHighlightLines: [8, 9, 12, 13],
          },
          {
            heading: 'C++ Cast Operators',
            content:
              'C++ provides four distinct cast operators, each serving a specific purpose — think of them as different tools in a toolbox rather than interchangeable alternatives. `static_cast` handles well-defined conversions between compatible types (numeric conversions, enum to int, upcasting in class hierarchies) and covers about 95% of casting needs. `dynamic_cast` is for safe downcasting in polymorphic class hierarchies — it checks at runtime whether the cast is valid and returns `nullptr` if it\'s not. `const_cast` adds or removes `const` qualifiers, and should be used sparingly (usually only when interfacing with C code that forgot to use `const`). `reinterpret_cast` is the nuclear option — it reinterprets the raw bits as a different type. It\'s used in low-level code like memory-mapped I/O and serialization. For everyday programming, `static_cast` is your go-to. If you find yourself reaching for `reinterpret_cast`, stop and reconsider your design.',
            code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // static_cast: numeric conversions
    int a = 10, b = 3;
    double ratio = static_cast<double>(a) / b;
    cout << "Ratio: " << ratio << "\\n";

    // static_cast: enum to int
    enum Color { RED, GREEN, BLUE };
    Color c = GREEN;
    int colorVal = static_cast<int>(c);
    cout << "Color value: " << colorVal << "\\n";

    // const_cast: removing const (use carefully)
    const int x = 42;
    const int* cp = &x;
    // int* p = const_cast<int*>(cp);  // Legal but modifying *p is undefined

    // String conversions
    string numStr = to_string(42);
    int num = stoi("123");
    double dbl = stod("3.14");
    cout << "to_string: " << numStr << "\\n";
    cout << "stoi: " << num << "\\n";
    cout << "stod: " << dbl << "\\n";

    return 0;
}`,
            output: `Ratio: 3.33333
Color value: 1
to_string: 42
stoi: 123
stod: 3.14`,
            warning: 'Using `const_cast` to modify a variable that was originally declared `const` is undefined behavior — the compiler may have optimized based on the assumption it never changes. Only use `const_cast` to pass a `const` value to a function that you know won\'t actually modify it (typically when working with legacy C APIs).',
            note: 'The reason C++ has four different cast operators instead of one is intentional: it forces you to state your intent explicitly. Each cast appears in code reviews as a signal of what kind of conversion is happening, making dangerous operations visible and searchable. This is a design philosophy called "make the dangerous thing verbose."',
          },
          {
            heading: 'String-Number Conversions',
            content:
              'Converting between strings and numbers is something you\'ll do constantly — reading configuration values, parsing user input, formatting output, serializing data. C++11 introduced clean, standard-library functions for this: `std::to_string()` converts any number to a string, while the `sto*` family (`stoi`, `stol`, `stoll`, `stof`, `stod`) converts strings to various numeric types. These functions are smart: `stoi("42abc")` successfully parses 42 and ignores the trailing "abc". But they also throw exceptions when things go wrong — `std::invalid_argument` if the string doesn\'t start with a valid number, and `std::out_of_range` if the number is too large for the target type. Always wrap these in try/catch blocks when parsing untrusted input (user input, file data, network data). One quirk to be aware of: `to_string()` on a `double` always produces 6 decimal places, which may not be what you want. For more control over formatting, use `std::ostringstream` or C++20\'s `std::format()`.',
            code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Number to string
    int n = 42;
    double pi = 3.14159;
    string s1 = to_string(n);
    string s2 = to_string(pi);
    cout << "to_string(42): \\"" << s1 << "\\"\\n";
    cout << "to_string(pi): \\"" << s2 << "\\"\\n";

    // String to number
    string intStr = "12345";
    string dblStr = "2.718";
    int intVal = stoi(intStr);
    double dblVal = stod(dblStr);
    cout << "stoi: " << intVal << "\\n";
    cout << "stod: " << dblVal << "\\n";

    // Error handling
    try {
        int bad = stoi("not_a_number");
    } catch (const invalid_argument& e) {
        cout << "Error: " << e.what() << "\\n";
    }

    try {
        int overflow = stoi("99999999999999");
    } catch (const out_of_range& e) {
        cout << "Overflow: " << e.what() << "\\n";
    }

    return 0;
}`,
            output: `to_string(42): "42"
to_string(pi): "3.141590"
stoi: 12345
stod: 2.718
Error: stoi
Overflow: stoi`,
            tip: 'For performance-critical string-to-number conversion (like parsing millions of values), consider C++17\'s `std::from_chars()` which is significantly faster than `stoi`/`stod` because it avoids locale handling and doesn\'t throw exceptions. It\'s the fastest standard way to parse numbers in C++.',
          },
        ],
        quiz: [
          {
            question: 'What does static_cast<int>(3.7) evaluate to in C++?',
            options: [
              '4',
              '3.7',
              '3',
              'Compilation error',
            ],
            correctIndex: 2,
            explanation: 'static_cast<int>(3.7) truncates the decimal part and returns 3. It does not round — it simply discards everything after the decimal point.',
          },
          {
            question: 'Which cast should you use to safely convert between related types like int to double in C++?',
            options: [
              'reinterpret_cast',
              'const_cast',
              'dynamic_cast',
              'static_cast',
            ],
            correctIndex: 3,
            explanation: 'static_cast is the appropriate cast for well-defined conversions between related types. reinterpret_cast is for bit-level reinterpretation, const_cast removes const, and dynamic_cast is for polymorphic class hierarchies.',
          },
          {
            question: 'What is narrowing conversion in C++?',
            options: [
              'Converting a string to a number',
              'Converting a value to a type that cannot represent all values of the source type',
              'Converting a pointer to a reference',
              'Converting an enum to a class',
            ],
            correctIndex: 1,
            explanation: 'Narrowing conversion occurs when converting to a type that may lose information, such as double to int or int to short. C++11 brace initialization {} prevents narrowing conversions at compile time.',
          },
        ],
        challenge: {
          prompt: 'Write a program that demonstrates the difference between integer division and floating-point division. Take two integers, perform integer division, then use static_cast to get the floating-point result. Also demonstrate string-to-number conversion using stoi and stod.',
          starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int a = 7, b = 2;
    // Show integer division result
    // Show floating-point division using static_cast
    // Convert the string "42" to int and "3.14" to double
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int a = 7, b = 2;

    cout << "Integer division: " << a / b << endl;
    cout << "Float division: " << static_cast<double>(a) / b << endl;

    string numStr = "42";
    string piStr = "3.14";
    int num = stoi(numStr);
    double pi = stod(piStr);

    cout << "String to int: " << num << endl;
    cout << "String to double: " << pi << endl;

    return 0;
}`,
          hints: [
            'For floating-point division, cast at least one operand to double using static_cast<double>(a) before dividing.',
            'Use stoi() to convert a string to int and stod() to convert a string to double.',
          ],
        },
      },
      {
        id: 'constants',
        title: 'Constants',
        difficulty: 'beginner',
        tags: ['const', 'constexpr', 'define', 'immutable'],
        cheatSheetSummary: 'Use const for runtime constants and constexpr for compile-time constants. Avoid #define for constants.',
        sections: [
          {
            heading: 'const Variables',
            content:
              'The `const` qualifier is one of C++\'s most powerful tools for writing correct code, and it\'s much more than just "make a variable read-only." When you declare `const int MAX_SIZE = 100;`, you\'re making a promise to both the compiler and to every developer who reads your code: this value will never change. The compiler enforces this promise — any attempt to modify a `const` variable is a compilation error. This is invaluable in large codebases where you need to know that certain values are stable. But `const` really gets interesting with pointers, where the placement of the keyword matters. `const int*` means "pointer to a constant integer" (you can\'t change the value through this pointer, but you can point to something else). `int* const` means "constant pointer to an integer" (the pointer itself can\'t change, but you can modify the value). The trick for reading these: read from right to left. `const int* const` is a "constant pointer to a constant integer" — nothing can change. This level of precision about what can and can\'t be modified is what makes C++ suitable for building reliable systems.',
            code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    const int MAX_SIZE = 100;
    const double PI = 3.14159265358979;
    const string GREETING = "Hello, World!";

    cout << "MAX_SIZE: " << MAX_SIZE << "\\n";
    cout << "PI: " << PI << "\\n";
    cout << "GREETING: " << GREETING << "\\n";

    // Cannot modify const variables
    // MAX_SIZE = 200;  // Compilation error!

    // const with pointers
    int x = 10;
    const int* ptr1 = &x;  // Pointer to const: cannot modify *ptr1
    // *ptr1 = 20;  // Error!

    int* const ptr2 = &x;  // Const pointer: cannot change what ptr2 points to
    *ptr2 = 20;  // OK: modifying the value through a non-const path
    // ptr2 = nullptr;  // Error!

    cout << "x after modification: " << x << "\\n";

    return 0;
}`,
            output: `MAX_SIZE: 100
PI: 3.14159265358979
GREETING: Hello, World!
x after modification: 20`,
            tip: 'Read pointer-const declarations from right to left: `const int*` is "pointer to const int" (value is protected), `int* const` is "const pointer to int" (pointer is locked). Remembering this right-to-left rule makes even complex declarations like `const int* const` immediately clear.',
            note: 'The C++ philosophy of "const correctness" means marking everything `const` that shouldn\'t change. Function parameters, return types, member functions — if it shouldn\'t be modified, make it `const`. This discipline catches bugs at compile time and documents your intent. Many teams enforce const-correctness as a code review requirement.',
          },
          {
            heading: 'constexpr: Compile-Time Constants',
            content:
              'If `const` means "I promise not to change this," then `constexpr` means "I promise this can be computed before the program even runs." This distinction matters more than it might seem. A `const` variable gets its value at runtime (it just can\'t be modified after). A `constexpr` variable must be computable at compile time, which means the compiler can embed the value directly into the machine code — no runtime computation needed. But `constexpr` isn\'t just about variables. You can write `constexpr` functions that the compiler evaluates during compilation when given compile-time arguments. This is incredibly powerful: you can compute lookup tables, validate configuration, and perform complex calculations with zero runtime cost. The computed results are baked into your executable as if you\'d hand-coded them. Starting from C++14, `constexpr` functions can contain loops, conditionals, and local variables, making them surprisingly expressive. C++20 goes further with `consteval` (must be evaluated at compile time) and `constinit` (must be initialized at compile time but can be modified at runtime).',
            code: `#include <iostream>
using namespace std;

constexpr int square(int x) {
    return x * x;
}

constexpr double PI = 3.14159265358979;
constexpr int TABLE_SIZE = 1024;
constexpr int SQUARED = square(5);  // Computed at compile time

int main() {
    // constexpr values can be used as array sizes
    int arr[TABLE_SIZE];
    arr[0] = SQUARED;

    cout << "PI: " << PI << "\\n";
    cout << "TABLE_SIZE: " << TABLE_SIZE << "\\n";
    cout << "square(5): " << SQUARED << "\\n";

    // constexpr function called at runtime is also valid
    int runtime_val = 7;
    int result = square(runtime_val);  // Computed at runtime
    cout << "square(7): " << result << "\\n";

    return 0;
}`,
            output: `PI: 3.14159
TABLE_SIZE: 1024
square(5): 25
square(7): 49`,
            note: '`constexpr` functions are dual-mode: they run at compile time when all arguments are `constexpr`, and at runtime otherwise. This means a single function serves both purposes — you don\'t need separate compile-time and runtime versions. This elegant duality is one of C++\'s most thoughtful design choices.',
            tip: 'In performance-critical applications like game engines and embedded systems, `constexpr` lets you move computation from runtime to compile time. Lookup tables, hash values, mathematical constants — anything that can be precomputed should be. The result is faster startup, smaller runtime footprint, and no computation wasted on values that never change.',
            analogy: 'Think of it like pre-computing answers for a math exam cheat sheet: constexpr is the compiler solving the equations before your program even starts, baking the answers directly into the binary. The program runs faster because the hard work was already done at build time.',
            codeHighlightLines: [1, 2, 5, 6, 7],
          },
          {
            heading: '#define vs const/constexpr',
            content:
              'You\'ll encounter `#define` in older C++ codebases and C code, and understanding why modern C++ has moved away from it is important. `#define` is a preprocessor directive — it performs blind text substitution before the compiler ever sees your code. `#define MAX 100` literally replaces every occurrence of `MAX` with `100` in your source text. This has several problems: no type checking (the compiler doesn\'t know `MAX` is supposed to be an integer), no scope (it bleeds into every file that includes the header), and no debugging support (the debugger shows `100` instead of `MAX`). Macros with parameters are even more treacherous. `#define SQUARE(x) x*x` looks harmless, but `SQUARE(a+1)` expands to `a+1*a+1` (which is `a + a + 1` due to operator precedence, not `(a+1)*(a+1)`). You need extra parentheses everywhere: `#define SQUARE(x) ((x)*(x))`. Modern C++ provides better alternatives for every `#define` use case: `constexpr` for compile-time constants, `inline` functions for macro-like behavior, and `constexpr` functions for compile-time computation — all with full type safety, proper scoping, and debugger support.',
            code: `#include <iostream>
using namespace std;

// Preprocessor macro (avoid for constants)
#define MAX_MACRO 100
#define SQUARE_MACRO(x) ((x) * (x))

// Modern C++ constants (preferred)
constexpr int MAX_CONST = 100;
constexpr int square_func(int x) { return x * x; }

int main() {
    cout << "Macro: " << MAX_MACRO << "\\n";
    cout << "Const: " << MAX_CONST << "\\n";

    // Macro pitfall: unexpected behavior
    int a = 5;
    cout << "SQUARE_MACRO(a+1): " << SQUARE_MACRO(a + 1) << "\\n";
    // Expands to ((a+1) * (a+1)) = 36 (correct because of parentheses)
    // Without parens: #define SQUARE(x) x*x
    // SQUARE(a+1) would expand to a+1*a+1 = 5+5+1 = 11 (wrong!)

    cout << "square_func(a+1): " << square_func(a + 1) << "\\n";

    return 0;
}`,
            output: `Macro: 100
Const: 100
SQUARE_MACRO(a+1): 36
square_func(a+1): 36`,
            warning: '`#define` macros do not respect C++ scoping rules, have no type safety, and can\'t be inspected in a debugger. They also interact poorly with namespaces and templates. Use `constexpr` for compile-time constants and `constexpr` functions for compile-time computation. The only legitimate modern uses of `#define` are include guards and conditional compilation (`#ifdef`).',
          },
        ],
        quiz: [
          {
            question: 'What is the difference between const and constexpr in C++?',
            options: [
              'They are identical and interchangeable',
              'const means immutable at runtime; constexpr means the value must be known at compile time',
              'constexpr is slower than const',
              'const works only with integers while constexpr works with all types',
            ],
            correctIndex: 1,
            explanation: 'const makes a variable immutable after initialization (the value can be determined at runtime), while constexpr guarantees the value is computed at compile time, enabling use in template arguments and array sizes.',
          },
          {
            question: 'Which of the following is a valid constexpr function in C++?',
            options: [
              'constexpr int square(int x) { return x * x; }',
              'constexpr int readInput() { int x; cin >> x; return x; }',
              'constexpr int random() { return rand(); }',
              'constexpr void print(int x) { cout << x; }',
            ],
            correctIndex: 0,
            explanation: 'A constexpr function must be evaluable at compile time. It cannot perform I/O, call non-constexpr functions, or have side effects. A simple arithmetic computation like x * x is valid.',
          },
          {
            question: 'Why is #define for constants discouraged in modern C++?',
            options: [
              'It is not supported in C++11 and later',
              'It is slower than const variables',
              'It has no type safety, ignores scoping, and cannot be debugged easily',
              'It can only define string constants',
            ],
            correctIndex: 2,
            explanation: '#define performs textual substitution with no type checking, no respect for namespaces or scopes, and the substituted values cannot be inspected in a debugger. constexpr is the modern, type-safe alternative.',
          },
        ],
        challenge: {
          prompt: 'Create a constexpr function called factorial that computes n! at compile time. Use it to initialize a constexpr variable with factorial(10) and print the result.',
          starterCode: `#include <iostream>
using namespace std;

// Write a constexpr factorial function here

int main() {
    // Use constexpr to compute factorial(10) at compile time
    // Print the result
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

constexpr long long factorial(int n) {
    long long result = 1;
    for (int i = 2; i <= n; ++i) {
        result *= i;
    }
    return result;
}

int main() {
    constexpr long long fact10 = factorial(10);
    cout << "10! = " << fact10 << endl;
    return 0;
}`,
          hints: [
            'A constexpr function in C++14 and later can contain loops, so you can use a for loop inside it.',
            'Use long long as the return type since factorials grow very quickly.',
            'Declare the result variable as constexpr in main() to verify it is computed at compile time.',
          ],
        },
      },
      {
        id: 'enums',
        title: 'Enums',
        difficulty: 'intermediate',
        tags: ['enum', 'enum-class', 'scoped-enum', 'c++11'],
        cheatSheetSummary: 'Use enum class for type-safe enumerations: enum class Color { Red, Green, Blue };',
        sections: [
          {
            heading: 'Traditional Enums',
            content:
              'An enumeration (enum) lets you define a type that can only hold one of a fixed set of named values — like a variable that can be `NORTH`, `SOUTH`, `EAST`, or `WEST`, but nothing else. This is far better than using raw integers (`0` for north, `1` for south...) because the names document themselves and the compiler can catch mistakes. Under the hood, each enumerator is assigned an integer value starting from 0 by default, but you can assign custom values for cases like HTTP status codes. Traditional (unscoped) enums, inherited from C, have two significant drawbacks that you should know about. First, their enumerators are injected into the enclosing scope — if you have both `enum Color { RED }` and `enum Light { RED }`, you get a name collision. Second, they implicitly convert to integers, so you could accidentally pass a `Color` where a `Direction` is expected with no compiler warning. These problems are exactly why C++11 introduced `enum class`.',
            code: `#include <iostream>
using namespace std;

enum Direction { NORTH, SOUTH, EAST, WEST };
enum HttpStatus { OK = 200, NOT_FOUND = 404, SERVER_ERROR = 500 };

int main() {
    Direction dir = NORTH;
    cout << "NORTH = " << dir << "\\n";
    cout << "SOUTH = " << SOUTH << "\\n";
    cout << "EAST = " << EAST << "\\n";
    cout << "WEST = " << WEST << "\\n";

    // Custom values
    HttpStatus status = NOT_FOUND;
    cout << "\\nHTTP status: " << status << "\\n";

    // Implicit conversion to int
    int val = dir;  // Works with traditional enums
    cout << "Direction as int: " << val << "\\n";

    // Switch on enum
    switch (status) {
        case OK: cout << "Success\\n"; break;
        case NOT_FOUND: cout << "Not Found\\n"; break;
        case SERVER_ERROR: cout << "Server Error\\n"; break;
    }

    return 0;
}`,
            output: `NORTH = 0
SOUTH = 1
EAST = 2
WEST = 3

HTTP status: 404
Direction as int: 0
Not Found`,
            warning: 'Traditional enums leak their enumerators into the enclosing scope. If two enums in the same scope have an enumerator with the same name, you get a compilation error. This becomes a real problem in large codebases with many enums.',
          },
          {
            heading: 'Scoped Enums (enum class)',
            content:
              'C++11\'s `enum class` (also called scoped enumerations) fixes every problem with traditional enums, and there\'s really no reason to use the old style in new code. The three key improvements are transformative: enumerators are scoped within the enum name (you write `Color::Red`, not just `Red`), so name collisions disappear; there\'s no implicit conversion to integers (you can\'t accidentally mix different enum types); and you can specify the underlying integer type for memory control. That last feature is useful in embedded systems and network protocols where you need an enum to be exactly 1 byte (`enum class Flags : uint8_t { ... }`). The explicit scoping also makes code more readable — when you see `Color::Red` instead of just `RED`, you immediately know what type you\'re working with. The only downside is needing `static_cast<int>()` for the rare cases where you actually want the numeric value, but that small inconvenience buys you significant safety.',
            code: `#include <iostream>
using namespace std;

enum class Color { Red, Green, Blue };
enum class Size : uint8_t { Small = 1, Medium = 2, Large = 3 };

int main() {
    Color c = Color::Red;
    Size s = Size::Large;

    // Must use scope operator
    if (c == Color::Red) {
        cout << "Color is Red\\n";
    }

    // No implicit conversion to int
    // int val = c;  // Error!
    int val = static_cast<int>(c);  // Explicit cast required
    cout << "Color value: " << val << "\\n";

    cout << "Size value: " << static_cast<int>(s) << "\\n";
    cout << "Size of Size enum: " << sizeof(Size) << " byte\\n";

    // No name collisions: both can have the same enumerator names
    enum class Fruit { Red, Green, Yellow };
    Fruit f = Fruit::Red;   // Different from Color::Red
    cout << "No collision between Color::Red and Fruit::Red\\n";

    return 0;
}`,
            output: `Color is Red
Color value: 0
Size value: 3
Size of Size enum: 1 byte
No collision between Color::Red and Fruit::Red`,
            tip: 'Always prefer `enum class` over traditional `enum` in modern C++. The type safety prevents entire categories of bugs — you can\'t accidentally compare a `Color` to a `Size`, and enumerator names can\'t collide across different types. It\'s one of those easy wins that costs nothing.',
            note: 'C++20 introduced `using enum` declarations, which let you bring scoped enum values into the current scope: `using enum Color;` allows you to write `Red` instead of `Color::Red`. This is especially useful inside `switch` statements where the repetition of the enum name becomes tedious.',
            analogy: 'Think of it like namespaced filing cabinets: traditional enums dump all labels onto one shared table where "Red" from the Color drawer and "Red" from the Fruit drawer collide. enum class gives each drawer its own labeled namespace, so Color::Red and Fruit::Red coexist peacefully.',
          },
          {
            heading: 'Practical Enum Patterns',
            content:
              'Enums shine brightest when they replace magic numbers and give structure to configuration, state machines, and type hierarchies. Let\'s look at some patterns you\'ll use in real code. The "enum + switch + string conversion" pattern is foundational — enums define the states, switch statements handle them, and a conversion function provides human-readable names for logging and debugging. The "Count sentinel" pattern places a `COUNT` member at the end of the enum to automatically track how many enumerators exist — useful for sizing arrays and iterating. In larger applications, enums are the backbone of state machines (game states, network connection states, UI modes), command patterns, and type-safe configuration options. Whenever you find yourself using integers to represent distinct categories (log levels, directions, modes, states), that\'s a signal to reach for an `enum class`.',
            code: `#include <iostream>
#include <string>
using namespace std;

enum class LogLevel { Debug, Info, Warning, Error, COUNT };

string levelToString(LogLevel level) {
    switch (level) {
        case LogLevel::Debug:   return "DEBUG";
        case LogLevel::Info:    return "INFO";
        case LogLevel::Warning: return "WARNING";
        case LogLevel::Error:   return "ERROR";
        default:                return "UNKNOWN";
    }
}

void log(LogLevel level, const string& message) {
    cout << "[" << levelToString(level) << "] " << message << "\\n";
}

int main() {
    log(LogLevel::Info, "Application started");
    log(LogLevel::Warning, "Low memory");
    log(LogLevel::Error, "File not found");

    // Using COUNT for array sizing
    int counts[static_cast<int>(LogLevel::COUNT)] = {};
    counts[static_cast<int>(LogLevel::Info)] = 42;
    counts[static_cast<int>(LogLevel::Error)] = 3;

    cout << "\\nLog counts:\\n";
    cout << "Info: " << counts[static_cast<int>(LogLevel::Info)] << "\\n";
    cout << "Error: " << counts[static_cast<int>(LogLevel::Error)] << "\\n";

    return 0;
}`,
            output: `[INFO] Application started
[WARNING] Low memory
[ERROR] File not found

Log counts:
Info: 42
Error: 3`,
            tip: 'In production code, consider using `std::array` instead of C-style arrays for enum-indexed lookups: `std::array<int, static_cast<size_t>(LogLevel::COUNT)> counts{};`. This gives you bounds checking with `.at()` and works seamlessly with STL algorithms.',
            note: 'C++ doesn\'t have built-in enum-to-string conversion (unlike languages like Rust or Swift). Common solutions include switch statements, `std::map` lookups, or third-party libraries like magic_enum that use compiler intrinsics for zero-boilerplate enum reflection. The lack of built-in reflection is one of the most requested features for future C++ standards.',
          },
        ],
        quiz: [
          {
            question: 'What is the main advantage of enum class over a plain enum in C++?',
            options: [
              'enum class is faster at runtime',
              'enum class values are scoped and don\'t implicitly convert to int',
              'enum class allows floating-point values',
              'enum class can only have two values',
            ],
            correctIndex: 1,
            explanation: 'enum class (scoped enums) keep their values within their own scope and do not implicitly convert to integers, preventing accidental misuse and name collisions.',
          },
          {
            question: 'What is the default underlying type of an enum class in C++?',
            options: [
              'short',
              'unsigned int',
              'int',
              'long',
            ],
            correctIndex: 2,
            explanation: 'By default, enum class uses int as its underlying type, but you can specify a different type using the colon syntax, e.g., enum class Color : uint8_t { ... }.',
          },
          {
            question: 'How do you access a value from an enum class named Color with a member Red?',
            options: [
              'Red',
              'Color.Red',
              'Color::Red',
              'Color->Red',
            ],
            correctIndex: 2,
            explanation: 'Scoped enums require the scope resolution operator (::) to access their members, e.g., Color::Red.',
          },
        ],
        challenge: {
          prompt: 'Create an enum class called Direction with values North, South, East, West. Write a function that takes a Direction and returns a string description. Use a switch statement to handle all cases.',
          starterCode: `#include <iostream>
#include <string>
using namespace std;

// Define enum class Direction here

// Write a function string directionToString(Direction d)

int main() {
    Direction d = Direction::North;
    cout << directionToString(d) << endl;
    d = Direction::East;
    cout << directionToString(d) << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

enum class Direction { North, South, East, West };

string directionToString(Direction d) {
    switch (d) {
        case Direction::North: return "Heading North";
        case Direction::South: return "Heading South";
        case Direction::East:  return "Heading East";
        case Direction::West:  return "Heading West";
        default:               return "Unknown";
    }
}

int main() {
    Direction d = Direction::North;
    cout << directionToString(d) << endl;
    d = Direction::East;
    cout << directionToString(d) << endl;
    return 0;
}`,
          hints: [
            'Use enum class Direction { North, South, East, West }; to define the scoped enum.',
            'In the switch statement, each case must use Direction:: prefix, e.g., case Direction::North:',
            'The function should return a string, so use std::string as the return type.',
          ],
        },
      },
    ],
  },
];

import type { DocCategory } from './types';

export const CPP_PART2_CATEGORIES: DocCategory[] = [
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
        tags: ['if', 'else', 'conditional', 'ternary', 'branching'],
        cheatSheetSummary: 'if (condition) { ... } else if (cond2) { ... } else { ... }. Ternary: cond ? a : b.',
        crossLanguageId: 'if-else',
        sections: [
          {
            heading: 'Basic If / Else',
            content:
              'The if statement evaluates a condition and executes a block of code if the condition is true. You can chain multiple conditions using else if, and provide a fallback with else. The condition can be any expression that converts to bool. Curly braces define the block of code to execute; while they are optional for single statements, always using them prevents bugs when adding more statements later.',
            code: `#include <iostream>
using namespace std;

int main() {
    int score = 85;

    if (score >= 90) {
        cout << "Grade: A\\n";
    } else if (score >= 80) {
        cout << "Grade: B\\n";
    } else if (score >= 70) {
        cout << "Grade: C\\n";
    } else {
        cout << "Grade: F\\n";
    }

    // Nested if
    int age = 20;
    bool hasID = true;
    if (age >= 18) {
        if (hasID) {
            cout << "Access granted\\n";
        } else {
            cout << "Please show ID\\n";
        }
    } else {
        cout << "Too young\\n";
    }

    return 0;
}`,
            output: `Grade: B
Access granted`,
            tip: 'Always use curly braces even for single-statement if blocks. This prevents dangling-else bugs and makes the code easier to modify.',
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    A["score = 85"] --> B{"score >= 90?"}\n    B -->|"Yes"| C["Grade: A"]\n    B -->|"No"| D{"score >= 80?"}\n    D -->|"Yes"| E["Grade: B ✓"]\n    D -->|"No"| F{"score >= 70?"}\n    F -->|"Yes"| G["Grade: C"]\n    F -->|"No"| H["Grade: F"]',
              caption: 'If-else chain evaluated top to bottom; first matching branch executes',
            },
            analogy: 'Think of it like a bouncer checking a guest list from top to bottom: the first matching rule wins, and all remaining checks are skipped entirely.',
            codeHighlightLines: [4, 6, 8, 10],
          },
          {
            heading: 'Ternary Operator',
            content:
              'The ternary operator (condition ? expr1 : expr2) is a compact inline alternative to if-else for simple assignments and expressions. It evaluates and returns expr1 if the condition is true, or expr2 if false. While it makes simple choices more concise, nested ternary operators can be hard to read and should be avoided.',
            code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int x = 15;

    // Simple ternary
    string parity = (x % 2 == 0) ? "even" : "odd";
    cout << x << " is " << parity << "\\n";

    // Ternary for min/max
    int a = 10, b = 20;
    int smaller = (a < b) ? a : b;
    int larger = (a > b) ? a : b;
    cout << "Min: " << smaller << ", Max: " << larger << "\\n";

    // Ternary in output
    bool isLoggedIn = true;
    cout << "Status: " << (isLoggedIn ? "Online" : "Offline") << "\\n";

    // Ternary for absolute value
    int val = -42;
    int absVal = (val >= 0) ? val : -val;
    cout << "Absolute value: " << absVal << "\\n";

    return 0;
}`,
            output: `15 is odd
Min: 10, Max: 20
Status: Online
Absolute value: 42`,
          },
          {
            heading: 'If with Initializer (C++17)',
            content:
              'C++17 introduced if statements with an initializer, allowing you to declare a variable inside the if condition. The variable is scoped to the if-else block, keeping the enclosing scope clean. This pattern is commonly used with functions that return status codes or optional results.',
            code: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    map<string, int> scores = {{"Alice", 95}, {"Bob", 87}};

    // C++17: if with initializer
    if (auto it = scores.find("Alice"); it != scores.end()) {
        cout << "Found Alice: " << it->second << "\\n";
    } else {
        cout << "Alice not found\\n";
    }
    // 'it' is not accessible here - clean scope

    if (auto it = scores.find("Charlie"); it != scores.end()) {
        cout << "Found Charlie: " << it->second << "\\n";
    } else {
        cout << "Charlie not found\\n";
    }

    // Practical: error checking
    if (int result = 42 * 2; result > 50) {
        cout << "Result " << result << " exceeds threshold\\n";
    }

    return 0;
}`,
            output: `Found Alice: 95
Charlie not found
Result 84 exceeds threshold`,
            tip: 'If-with-initializer keeps temporary variables scoped to where they are needed, reducing the chance of accidentally reusing them later.',
            codeHighlightLines: [9, 16, 23],
          },
        ],
        quiz: [
          {
            question: 'What is the output of: int x = 5; cout << (x > 3 ? "yes" : "no");',
            options: ['yes', 'no', 'Compilation error', 'Undefined behavior'],
            correctIndex: 0,
            explanation: 'The ternary operator evaluates x > 3, which is true since 5 > 3, so "yes" is returned and printed.',
          },
          {
            question: 'In C++17, what is the scope of a variable declared in an if-with-initializer?',
            options: [
              'The entire function',
              'Only the if block',
              'The if and its associated else blocks',
              'The enclosing block',
            ],
            correctIndex: 2,
            explanation: 'A variable declared in an if-with-initializer (e.g., if (auto x = expr; cond)) is scoped to both the if block and any associated else-if/else blocks, but not beyond.',
          },
          {
            question: 'What happens when you omit curly braces in a single-statement if block and later add a second statement?',
            options: [
              'Both statements execute conditionally',
              'Only the first statement executes conditionally; the second always executes',
              'Compilation error',
              'Undefined behavior',
            ],
            correctIndex: 1,
            explanation: 'Without braces, only the immediately following statement belongs to the if. Any subsequent statements execute unconditionally, which is a common source of bugs.',
          },
        ],
        challenge: {
          prompt: 'Write a function `classifyTemperature` that takes an int temperature (Celsius) and returns a string: "freezing" if below 0, "cold" if 0-15, "warm" if 16-30, and "hot" if above 30. Use if-else chains.',
          starterCode: `#include <iostream>
#include <string>
using namespace std;

string classifyTemperature(int temp) {
    // TODO: implement using if-else
}

int main() {
    cout << classifyTemperature(-5) << "\\n";  // freezing
    cout << classifyTemperature(10) << "\\n";  // cold
    cout << classifyTemperature(25) << "\\n";  // warm
    cout << classifyTemperature(35) << "\\n";  // hot
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

string classifyTemperature(int temp) {
    if (temp < 0) {
        return "freezing";
    } else if (temp <= 15) {
        return "cold";
    } else if (temp <= 30) {
        return "warm";
    } else {
        return "hot";
    }
}

int main() {
    cout << classifyTemperature(-5) << "\\n";  // freezing
    cout << classifyTemperature(10) << "\\n";  // cold
    cout << classifyTemperature(25) << "\\n";  // warm
    cout << classifyTemperature(35) << "\\n";  // hot
    return 0;
}`,
          hints: [
            'Start by checking the lowest range (below 0) and work upward.',
            'Use else-if to chain conditions so only one branch executes.',
            'Remember that the boundary values (0, 15, 30) need to be in the correct range.',
          ],
        },
      },
      {
        id: 'switch',
        title: 'Switch',
        difficulty: 'beginner',
        tags: ['switch', 'case', 'break', 'fallthrough'],
        cheatSheetSummary: 'switch(expr) { case val: ...; break; default: ...; } -- always include break to avoid fallthrough.',
        crossLanguageId: 'switch',
        sections: [
          {
            heading: 'Switch Statement Basics',
            content:
              'The switch statement compares an integer or enum expression against multiple constant values. Each case label defines a branch. Unlike a chain of if-else, switch can be more efficient because the compiler may generate a jump table. Every case must end with break to prevent fallthrough to the next case. The default case handles any value not matched by the case labels.',
            code: `#include <iostream>
using namespace std;

int main() {
    int day = 3;

    switch (day) {
        case 1:
            cout << "Monday\\n";
            break;
        case 2:
            cout << "Tuesday\\n";
            break;
        case 3:
            cout << "Wednesday\\n";
            break;
        case 4:
            cout << "Thursday\\n";
            break;
        case 5:
            cout << "Friday\\n";
            break;
        case 6:
        case 7:
            cout << "Weekend\\n";
            break;
        default:
            cout << "Invalid day\\n";
            break;
    }

    return 0;
}`,
            output: `Wednesday`,
            warning: 'Forgetting a break statement causes fallthrough: execution continues into the next case. This is one of the most common switch bugs in C++.',
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    A["switch(day)"] --> B{"case 1?"}\n    B -->|"No"| C{"case 2?"}\n    C -->|"No"| D{"case 3?"}\n    D -->|"Yes"| E["cout Wednesday"]\n    E --> F["break — exit switch"]\n    D -->|"No"| G{"case 4?"}\n    G -->|"No"| H{"case 5?"}\n    H -->|"No"| I{"case 6 or 7?"}\n    I -->|"No"| J["default"]',
              caption: 'Switch uses jump-table lookup; break prevents fallthrough to the next case',
            },
            analogy: 'Think of it like an elevator with labeled floors: the switch expression picks a floor and jumps there directly. Without break, the elevator keeps descending through every floor below -- that is fallthrough.',
            codeHighlightLines: [4, 6, 8, 10, 12, 14, 15, 18],
          },
          {
            heading: 'Switch with Enums and Fallthrough',
            content:
              'Switch statements pair naturally with enums, providing a clean way to handle different enum values. Intentional fallthrough is sometimes useful when multiple cases share the same code. In C++17, you can use the [[fallthrough]] attribute to indicate intentional fallthrough and silence compiler warnings.',
            code: `#include <iostream>
using namespace std;

enum class Season { Spring, Summer, Autumn, Winter };

int main() {
    Season s = Season::Summer;

    switch (s) {
        case Season::Spring:
            cout << "Spring: flowers blooming\\n";
            break;
        case Season::Summer:
            cout << "Summer: sunny days\\n";
            break;
        case Season::Autumn:
            cout << "Autumn: leaves falling\\n";
            break;
        case Season::Winter:
            cout << "Winter: snow falling\\n";
            break;
    }

    // Intentional fallthrough example
    char grade = 'B';
    cout << "\\nEligible for: ";
    switch (grade) {
        case 'A':
            cout << "Scholarship, ";
            [[fallthrough]];  // C++17: explicit fallthrough
        case 'B':
            cout << "Dean's List, ";
            [[fallthrough]];
        case 'C':
            cout << "Graduation";
            break;
        default:
            cout << "Remedial courses";
    }
    cout << "\\n";

    return 0;
}`,
            output: `Summer: sunny days

Eligible for: Dean's List, Graduation`,
            note: 'Use [[fallthrough]] to document intentional fallthrough. Modern compilers like g++ and clang will warn about unmarked fallthrough with -Wimplicit-fallthrough.',
            codeHighlightLines: [17, 20],
          },
          {
            heading: 'Switch Limitations and Alternatives',
            content:
              'Switch statements only work with integral types (int, char, enum), not with strings or floating-point values. Case labels must be compile-time constants. For string-based dispatch, you can use an if-else chain or a map of strings to functions. C++23 may bring pattern matching as a more powerful alternative.',
            code: `#include <iostream>
#include <string>
#include <map>
#include <functional>
using namespace std;

int main() {
    // Cannot switch on strings, use if-else
    string command = "greet";

    if (command == "greet") {
        cout << "Hello!\\n";
    } else if (command == "quit") {
        cout << "Goodbye!\\n";
    } else {
        cout << "Unknown command\\n";
    }

    // Alternative: map-based dispatch
    map<string, function<void()>> commands = {
        {"hello", []() { cout << "Hi there!\\n"; }},
        {"count", []() { for (int i = 1; i <= 3; i++) cout << i << " "; cout << "\\n"; }},
        {"bye",   []() { cout << "See you later!\\n"; }},
    };

    string input = "count";
    if (commands.count(input)) {
        commands[input]();
    } else {
        cout << "Unknown: " << input << "\\n";
    }

    return 0;
}`,
            output: `Hello!
1 2 3`,
            analogy: 'Think of it like a vending machine: switch only accepts coins (integers), not paper bills (strings). For paper bills, you need a different machine -- that is the map-based dispatch approach.',
          },
        ],
        quiz: [
          {
            question: 'What happens if you forget the break statement at the end of a case in a switch?',
            options: [
              'Compilation error',
              'Only the matched case executes',
              'Execution falls through to the next case',
              'The default case executes',
            ],
            correctIndex: 2,
            explanation: 'Without break, execution falls through to the next case label and continues executing code until a break is encountered or the switch block ends. This is called fallthrough.',
          },
          {
            question: 'Can you use a std::string as the expression in a switch statement?',
            options: [
              'Yes, since C++11',
              'Yes, since C++17',
              'No, switch only works with integral types',
              'Yes, but only with constexpr strings',
            ],
            correctIndex: 2,
            explanation: 'Switch statements in C++ only work with integral types (int, char, enum, etc.). For string-based dispatch, use if-else chains or a map of strings to functions.',
          },
          {
            question: 'What does the [[fallthrough]] attribute do in C++17?',
            options: [
              'Makes the switch fall through all cases',
              'Prevents fallthrough behavior',
              'Indicates intentional fallthrough and silences compiler warnings',
              'Converts the switch to an if-else chain',
            ],
            correctIndex: 2,
            explanation: 'The [[fallthrough]] attribute is placed before a case label to tell the compiler that the fallthrough is intentional, suppressing warnings without changing behavior.',
          },
          {
            question: 'Which of the following is a valid case label in a switch statement?',
            options: [
              'case x + 1:',
              'case 42:',
              'case "hello":',
              'case 3.14:',
            ],
            correctIndex: 1,
            explanation: 'Case labels must be compile-time constant integral expressions. Variable expressions, strings, and floating-point values are not allowed.',
          },
        ],
        challenge: {
          prompt: 'Write a function `dayType` that takes an int (1-7, where 1=Monday) and returns "Weekday" for Monday through Friday and "Weekend" for Saturday and Sunday. Use a switch statement with intentional fallthrough for grouping.',
          starterCode: `#include <iostream>
#include <string>
using namespace std;

string dayType(int day) {
    // TODO: use switch with fallthrough to group weekdays and weekends
}

int main() {
    for (int d = 1; d <= 7; d++) {
        cout << "Day " << d << ": " << dayType(d) << "\\n";
    }
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

string dayType(int day) {
    switch (day) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            return "Weekday";
        case 6:
        case 7:
            return "Weekend";
        default:
            return "Invalid";
    }
}

int main() {
    for (int d = 1; d <= 7; d++) {
        cout << "Day " << d << ": " << dayType(d) << "\\n";
    }
    return 0;
}`,
          hints: [
            'Multiple case labels can share the same code by stacking them without break statements between them.',
            'Use a default case to handle invalid inputs.',
            'Since you return directly from each case, you do not need explicit break statements.',
          ],
        },
      },
      {
        id: 'for-loops',
        title: 'For Loops',
        difficulty: 'beginner',
        tags: ['for', 'loop', 'iteration', 'counter'],
        cheatSheetSummary: 'for (int i = 0; i < n; i++) { ... } -- classic C-style loop with init, condition, and increment.',
        crossLanguageId: 'for-loops',
        sections: [
          {
            heading: 'Classic For Loop',
            content:
              'The for loop consists of three parts: initialization (executed once), condition (checked before each iteration), and update (executed after each iteration). It is the most common loop for counting iterations. You can declare the loop variable in the initialization, scoping it to the loop. All three parts are optional but omitting the condition creates an infinite loop.',
            code: `#include <iostream>
using namespace std;

int main() {
    // Basic counting loop
    cout << "Count to 5: ";
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << "\\n";

    // Counting down
    cout << "Countdown: ";
    for (int i = 5; i > 0; i--) {
        cout << i << " ";
    }
    cout << "\\n";

    // Step by 2
    cout << "Even numbers: ";
    for (int i = 0; i <= 10; i += 2) {
        cout << i << " ";
    }
    cout << "\\n";

    // Nested loops: multiplication table
    cout << "\\n3x3 table:\\n";
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            cout << i * j << "\\t";
        }
        cout << "\\n";
    }

    return 0;
}`,
            output: `Count to 5: 1 2 3 4 5
Countdown: 5 4 3 2 1
Even numbers: 0 2 4 6 8 10

3x3 table:
1	2	3
2	4	6
3	6	9`,
            diagram: {
              kind: 'mermaid',
              code: 'graph LR\n    A["Init: i = 1"] --> B{"Condition:\ni <= 5?"}\n    B -->|"Yes"| C["Execute body:\ncout << i"]\n    C --> D["Update: i++"]\n    D --> B\n    B -->|"No"| E["Exit loop"]',
              caption: 'The three parts of a for loop: initialization, condition check, and update',
            },
          },
          {
            heading: 'Break and Continue',
            content:
              'The break statement immediately exits the innermost loop. The continue statement skips the rest of the current iteration and jumps to the next iteration. Both are useful for controlling loop flow without complex conditions, but overuse can make code harder to follow.',
            code: `#include <iostream>
using namespace std;

int main() {
    // break: find first even number > 10
    cout << "First even > 10: ";
    for (int i = 1; i < 100; i++) {
        if (i > 10 && i % 2 == 0) {
            cout << i << "\\n";
            break;
        }
    }

    // continue: skip odd numbers
    cout << "Even numbers 1-10: ";
    for (int i = 1; i <= 10; i++) {
        if (i % 2 != 0) continue;
        cout << i << " ";
    }
    cout << "\\n";

    // break in nested loops: only breaks inner loop
    cout << "Finding pair that sums to 5:\\n";
    for (int i = 1; i <= 5; i++) {
        bool found = false;
        for (int j = 1; j <= 5; j++) {
            if (i + j == 5) {
                cout << "  " << i << " + " << j << " = 5\\n";
                found = true;
                break;  // Only breaks inner loop
            }
        }
    }

    return 0;
}`,
            output: `First even > 10: 12
Even numbers 1-10: 2 4 6 8 10
Finding pair that sums to 5:
  1 + 4 = 5
  2 + 3 = 5
  3 + 2 = 5
  4 + 1 = 5`,
            analogy: 'Think of it like walking down a hallway of doors: break is an emergency exit that takes you out of the hallway entirely, while continue is skipping a door and moving on to the next one without entering.',
            codeHighlightLines: [8, 9, 15],
          },
          {
            heading: 'Iterating Over Collections',
            content:
              'While range-based for loops are preferred for iterating over collections, the classic for loop is still useful when you need the index, when iterating in reverse, or when you need more complex iteration patterns like skipping elements or accessing adjacent elements.',
            code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    vector<int> nums = {10, 20, 30, 40, 50};

    // Index-based iteration
    cout << "With indices: ";
    for (int i = 0; i < (int)nums.size(); i++) {
        cout << "[" << i << "]=" << nums[i] << " ";
    }
    cout << "\\n";

    // Reverse iteration
    cout << "Reversed: ";
    for (int i = (int)nums.size() - 1; i >= 0; i--) {
        cout << nums[i] << " ";
    }
    cout << "\\n";

    // Adjacent pair comparison
    vector<int> data = {1, 3, 2, 5, 4};
    cout << "Increasing pairs: ";
    for (int i = 0; i + 1 < (int)data.size(); i++) {
        if (data[i] < data[i + 1]) {
            cout << "(" << data[i] << "," << data[i + 1] << ") ";
        }
    }
    cout << "\\n";

    return 0;
}`,
            output: `With indices: [0]=10 [1]=20 [2]=30 [3]=40 [4]=50
Reversed: 50 40 30 20 10
Increasing pairs: (1,3) (2,5)`,
            warning: 'Be careful comparing int i with size(), which returns size_t (unsigned). If the vector is empty, size()-1 wraps to a very large number. Cast to int or use int i = 0; i < (int)v.size().',
          },
        ],
        quiz: [
          {
            question: 'What are the three parts of a C++ for loop header?',
            options: [
              'declaration, expression, assignment',
              'initialization, condition, update',
              'start, stop, step',
              'begin, end, increment',
            ],
            correctIndex: 1,
            explanation: 'A for loop has three parts separated by semicolons: initialization (runs once), condition (checked before each iteration), and update (runs after each iteration body).',
          },
          {
            question: 'What does the break statement do inside a nested for loop?',
            options: [
              'Exits all loops',
              'Exits only the innermost loop',
              'Skips to the next iteration of the outer loop',
              'Causes a compilation error in nested loops',
            ],
            correctIndex: 1,
            explanation: 'break only exits the innermost enclosing loop. To exit multiple nested loops, you need flags, goto, or restructuring with functions.',
          },
          {
            question: 'What does continue do in a for loop?',
            options: [
              'Exits the loop entirely',
              'Restarts the loop from the beginning',
              'Skips the rest of the current iteration and proceeds to the update expression',
              'Skips the update expression and goes to the condition check',
            ],
            correctIndex: 2,
            explanation: 'continue skips the remainder of the loop body for the current iteration, then executes the update expression before checking the condition again.',
          },
        ],
        challenge: {
          prompt: 'Write a function `printTriangle` that takes an int n and prints a right triangle of stars. Row 1 has 1 star, row 2 has 2 stars, up to row n. Use nested for loops.',
          starterCode: `#include <iostream>
using namespace std;

void printTriangle(int n) {
    // TODO: use nested for loops to print a right triangle
}

int main() {
    printTriangle(5);
    // Expected output:
    // *
    // **
    // ***
    // ****
    // *****
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

void printTriangle(int n) {
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) {
            cout << '*';
        }
        cout << '\\n';
    }
}

int main() {
    printTriangle(5);
    return 0;
}`,
          hints: [
            'The outer loop controls which row you are on (1 through n).',
            'The inner loop prints a number of stars equal to the current row number.',
            'Print a newline after each row using cout << \'\\n\'.',
          ],
        },
      },
      {
        id: 'while-loops',
        title: 'While Loops',
        difficulty: 'beginner',
        tags: ['while', 'do-while', 'loop', 'iteration'],
        cheatSheetSummary: 'while (condition) { ... } checks before each iteration. do { ... } while (condition); runs at least once.',
        crossLanguageId: 'while-loops',
        sections: [
          {
            heading: 'While Loop',
            content:
              'The while loop repeatedly executes a block of code as long as a condition is true. The condition is evaluated before each iteration, so if the condition is initially false, the loop body never executes. While loops are ideal when the number of iterations is not known in advance, such as reading input until a sentinel value, or processing data until a condition is met.',
            code: `#include <iostream>
using namespace std;

int main() {
    // Basic while loop
    int count = 5;
    cout << "Countdown: ";
    while (count > 0) {
        cout << count << " ";
        count--;
    }
    cout << "Go!\\n";

    // Sum digits of a number
    int number = 12345;
    int sum = 0;
    int temp = number;
    while (temp > 0) {
        sum += temp % 10;
        temp /= 10;
    }
    cout << "Digit sum of " << number << ": " << sum << "\\n";

    // Find first power of 2 >= 1000
    int power = 1;
    while (power < 1000) {
        power *= 2;
    }
    cout << "First power of 2 >= 1000: " << power << "\\n";

    return 0;
}`,
            output: `Countdown: 5 4 3 2 1 Go!
Digit sum of 12345: 15
First power of 2 >= 1000: 1024`,
            analogy: 'Think of it like a guard at a door who checks your ticket before each entry: if you never had a valid ticket to begin with, you never get in. That is why a while loop may execute zero times, unlike do-while.',
          },
          {
            heading: 'Do-While Loop',
            content:
              'The do-while loop is similar to while, but it checks the condition after executing the body. This guarantees the loop body runs at least once. It is useful for input validation, menu-driven programs, and any situation where you need to perform an action before deciding whether to repeat it.',
            code: `#include <iostream>
using namespace std;

int main() {
    // Do-while runs at least once
    int x = 0;
    do {
        cout << "This prints even though x is 0\\n";
    } while (x > 0);

    // Input validation pattern
    int number;
    do {
        cout << "Enter a positive number: ";
        number = 42;  // Simulated input
        cout << number << "\\n";
    } while (number <= 0);
    cout << "You entered: " << number << "\\n";

    // Reverse a number
    int original = 12345;
    int reversed = 0;
    int n = original;
    do {
        reversed = reversed * 10 + n % 10;
        n /= 10;
    } while (n > 0);
    cout << "Reversed " << original << " -> " << reversed << "\\n";

    return 0;
}`,
            output: `This prints even though x is 0
Enter a positive number: 42
You entered: 42
Reversed 12345 -> 54321`,
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    W["while loop"] --> WC{"Check condition\nBEFORE body"}\n    WC -->|"true"| WB["Execute body"]\n    WB --> WC\n    WC -->|"false"| WE["Exit"]\n    DW["do-while loop"] --> DB["Execute body\nAT LEAST ONCE"]\n    DB --> DC{"Check condition\nAFTER body"}\n    DC -->|"true"| DB\n    DC -->|"false"| DE["Exit"]',
              caption: 'while checks before executing; do-while executes first, then checks',
            },
          },
          {
            heading: 'Infinite Loops and Loop Patterns',
            content:
              'An infinite loop runs forever unless explicitly broken out of with break or return. The most common form is while(true). Infinite loops are used in server main loops, game loops, and interactive programs. They are also useful when the termination logic is complex and does not fit neatly into the while condition.',
            code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Infinite loop with break
    int total = 0;
    vector<int> inputs = {10, 20, 30, -1};  // -1 is sentinel
    int idx = 0;

    while (true) {
        int val = inputs[idx++];
        if (val == -1) break;
        total += val;
    }
    cout << "Total: " << total << "\\n";

    // Read until condition with while
    // Simulating: while (cin >> n && n != 0)
    vector<int> data = {5, 3, 7, 0};
    idx = 0;
    int sum = 0;
    while (idx < (int)data.size()) {
        int n = data[idx++];
        if (n == 0) break;
        sum += n;
    }
    cout << "Sum until zero: " << sum << "\\n";

    // Collatz sequence
    int n = 27;
    int steps = 0;
    cout << "Collatz(" << n << "): ";
    while (n != 1) {
        cout << n << " -> ";
        n = (n % 2 == 0) ? n / 2 : 3 * n + 1;
        steps++;
    }
    cout << "1 (steps: " << steps << ")\\n";

    return 0;
}`,
            output: `Total: 60
Sum until zero: 15
Collatz(27): 27 -> 82 -> 41 -> 124 -> 62 -> 31 -> 94 -> 47 -> 142 -> 71 -> 214 -> 107 -> 322 -> 161 -> 484 -> 242 -> 121 -> 364 -> 182 -> 91 -> 274 -> 137 -> 412 -> 206 -> 103 -> 310 -> 155 -> 466 -> 233 -> 700 -> 350 -> 175 -> 526 -> 263 -> 790 -> 395 -> 1186 -> 593 -> 1780 -> 890 -> 445 -> 1336 -> 668 -> 334 -> 167 -> 502 -> 251 -> 754 -> 377 -> 1132 -> 566 -> 283 -> 850 -> 425 -> 1276 -> 638 -> 319 -> 958 -> 479 -> 1438 -> 719 -> 2158 -> 1079 -> 3238 -> 1619 -> 4858 -> 2429 -> 7288 -> 3644 -> 1822 -> 911 -> 2734 -> 1367 -> 4102 -> 2051 -> 6154 -> 3077 -> 9232 -> 4616 -> 2308 -> 1154 -> 577 -> 1732 -> 866 -> 433 -> 1300 -> 650 -> 325 -> 976 -> 488 -> 244 -> 122 -> 61 -> 184 -> 92 -> 46 -> 23 -> 70 -> 35 -> 106 -> 53 -> 160 -> 80 -> 40 -> 20 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 (steps: 111)`,
          },
        ],
        quiz: [
          {
            question: 'What is the key difference between a while loop and a do-while loop?',
            options: [
              'while loops are faster',
              'do-while always executes the body at least once',
              'do-while does not need a condition',
              'while loops cannot use break',
            ],
            correctIndex: 1,
            explanation: 'A do-while loop checks its condition after the loop body executes, guaranteeing at least one execution. A while loop checks before, so it may never execute.',
          },
          {
            question: 'What happens if the condition of a while loop is initially false?',
            options: [
              'The loop body executes once',
              'The loop body never executes',
              'It becomes an infinite loop',
              'Compilation error',
            ],
            correctIndex: 1,
            explanation: 'A while loop evaluates its condition before the first iteration. If the condition is false from the start, the body is skipped entirely.',
          },
          {
            question: 'Which of the following creates an infinite loop?',
            options: [
              'while (0) { }',
              'while (false) { }',
              'while (true) { }',
              'while (nullptr) { }',
            ],
            correctIndex: 2,
            explanation: 'while (true) creates an infinite loop because the condition is always true. while (0), while (false), and while (nullptr) all evaluate to false, so the loop body never executes.',
          },
        ],
        challenge: {
          prompt: 'Write a function `sumDigits` that takes a positive integer and returns the sum of its digits using a while loop. For example, sumDigits(12345) should return 15.',
          starterCode: `#include <iostream>
using namespace std;

int sumDigits(int n) {
    // TODO: use a while loop to sum all digits of n
}

int main() {
    cout << sumDigits(12345) << "\\n";  // 15
    cout << sumDigits(999) << "\\n";    // 27
    cout << sumDigits(7) << "\\n";      // 7
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int sumDigits(int n) {
    int sum = 0;
    while (n > 0) {
        sum += n % 10;
        n /= 10;
    }
    return sum;
}

int main() {
    cout << sumDigits(12345) << "\\n";  // 15
    cout << sumDigits(999) << "\\n";    // 27
    cout << sumDigits(7) << "\\n";      // 7
    return 0;
}`,
          hints: [
            'Use n % 10 to extract the last digit of the number.',
            'Use n /= 10 (integer division) to remove the last digit.',
            'Continue the loop while n > 0.',
          ],
        },
      },
      {
        id: 'range-based-for',
        title: 'Range-Based For',
        difficulty: 'beginner',
        tags: ['range-for', 'foreach', 'iteration', 'c++11'],
        cheatSheetSummary: 'for (auto& x : container) { ... } iterates over every element. Use const auto& for read-only.',
        crossLanguageId: 'for-each',
        sections: [
          {
            heading: 'Range-Based For Basics',
            content:
              'The range-based for loop, introduced in C++11, provides a clean way to iterate over all elements of a container or array. It works with any type that has begin() and end() methods, including vectors, arrays, strings, maps, sets, and initializer lists. It eliminates the risk of off-by-one errors and is the preferred way to iterate when you do not need the index.',
            code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    // Iterate over a vector
    vector<int> nums = {10, 20, 30, 40, 50};
    cout << "Numbers: ";
    for (int n : nums) {
        cout << n << " ";
    }
    cout << "\\n";

    // Iterate over a string
    string word = "Hello";
    cout << "Characters: ";
    for (char c : word) {
        cout << c << " ";
    }
    cout << "\\n";

    // Iterate over an initializer list
    cout << "Fruits: ";
    for (const string& fruit : {"apple", "banana", "cherry"}) {
        cout << fruit << " ";
    }
    cout << "\\n";

    // Iterate over a C-style array
    int arr[] = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int x : arr) {
        sum += x;
    }
    cout << "Sum: " << sum << "\\n";

    return 0;
}`,
            output: `Numbers: 10 20 30 40 50
Characters: H e l l o
Fruits: apple banana cherry
Sum: 15`,
          },
          {
            heading: 'References in Range-Based For',
            content:
              'Choosing between by-value, by-reference, and by-const-reference is crucial for correctness and performance. Use auto (by value) when you want a copy. Use auto& when you want to modify elements in place. Use const auto& for read-only access without copying, which is important for strings and large objects.',
            code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    vector<int> nums = {1, 2, 3, 4, 5};

    // auto& to modify in place
    for (auto& n : nums) {
        n *= 10;
    }
    cout << "After multiply: ";
    for (const auto& n : nums) {
        cout << n << " ";
    }
    cout << "\\n";

    // const auto& for read-only (no copy)
    vector<string> names = {"Alice", "Bob", "Charlie"};
    cout << "Names: ";
    for (const auto& name : names) {
        cout << name << " ";
        // name = "X";  // Error: cannot modify through const ref
    }
    cout << "\\n";

    // By value creates copies (original unchanged)
    vector<int> original = {1, 2, 3};
    for (auto n : original) {
        n = 99;  // Modifies the copy, not the original
    }
    cout << "Original unchanged: ";
    for (const auto& n : original) {
        cout << n << " ";
    }
    cout << "\\n";

    return 0;
}`,
            output: `After multiply: 10 20 30 40 50
Names: Alice Bob Charlie
Original unchanged: 1 2 3`,
            tip: 'Default to const auto& for range-based for loops. Only use auto& when you need to modify elements, and plain auto when you intentionally want copies.',
            analogy: 'Think of it like looking at paintings in a gallery: const auto& is viewing through glass (you see the original but cannot touch), auto& is restoration access (you can modify the original), and auto is taking a photo home (you get a copy, the original stays untouched).',
            codeHighlightLines: [7, 8, 11, 12, 22, 23],
          },
          {
            heading: 'Range-Based For with Maps and Structured Bindings',
            content:
              'Range-based for loops work seamlessly with associative containers like map and unordered_map. Each iteration yields a std::pair of key and value. C++17 structured bindings make this even cleaner by decomposing the pair into named variables directly in the loop declaration.',
            code: `#include <iostream>
#include <map>
#include <set>
using namespace std;

int main() {
    map<string, int> scores = {
        {"Alice", 95}, {"Bob", 87}, {"Charlie", 92}
    };

    // Pre-C++17: access as pair
    cout << "Scores (pair):\\n";
    for (const auto& pair : scores) {
        cout << "  " << pair.first << ": " << pair.second << "\\n";
    }

    // C++17: structured bindings
    cout << "\\nScores (structured bindings):\\n";
    for (const auto& [name, score] : scores) {
        cout << "  " << name << ": " << score << "\\n";
    }

    // Modifying map values
    for (auto& [name, score] : scores) {
        score += 5;  // Bonus points for everyone
    }
    cout << "\\nAfter bonus:\\n";
    for (const auto& [name, score] : scores) {
        cout << "  " << name << ": " << score << "\\n";
    }

    // Set iteration
    set<int> unique_nums = {5, 3, 1, 4, 2};
    cout << "\\nSorted set: ";
    for (const auto& n : unique_nums) {
        cout << n << " ";
    }
    cout << "\\n";

    return 0;
}`,
            output: `Scores (pair):
  Alice: 95
  Bob: 87
  Charlie: 92

Scores (structured bindings):
  Alice: 95
  Bob: 87
  Charlie: 92

After bonus:
  Alice: 100
  Bob: 92
  Charlie: 97

Sorted set: 1 2 3 4 5`,
            codeHighlightLines: [13, 18, 23],
          },
        ],
        quiz: [
          {
            question: 'What does "const auto&" do in a range-based for loop?',
            options: [
              'Creates a mutable copy of each element',
              'Provides read-only reference access without copying',
              'Makes the container immutable',
              'Forces the compiler to deduce the type as const',
            ],
            correctIndex: 1,
            explanation: 'const auto& gives a read-only reference to each element, avoiding the cost of copying while preventing accidental modification.',
          },
          {
            question: 'What C++ feature allows you to write for (const auto& [key, val] : myMap)?',
            options: [
              'Destructuring assignment (C++11)',
              'Structured bindings (C++17)',
              'Pattern matching (C++20)',
              'Tuple unpacking (C++14)',
            ],
            correctIndex: 1,
            explanation: 'Structured bindings, introduced in C++17, allow you to decompose a pair or tuple into named variables directly in the loop declaration.',
          },
          {
            question: 'If you iterate over a vector<string> using "for (auto s : vec)", what happens?',
            options: [
              'Each string is accessed by reference',
              'Each string is copied into s',
              'The loop does not compile',
              'The strings are moved into s',
            ],
            correctIndex: 1,
            explanation: 'Using auto (without &) captures each element by value, creating a copy. For strings and other large objects, use const auto& to avoid unnecessary copies.',
          },
          {
            question: 'Which containers can be used with a range-based for loop?',
            options: [
              'Only std::vector and std::array',
              'Any container with begin() and end() methods',
              'Only STL containers',
              'Only containers that support random access',
            ],
            correctIndex: 1,
            explanation: 'A range-based for loop works with any type that provides begin() and end() methods (or free functions), including custom containers, C-style arrays, and initializer lists.',
          },
        ],
        challenge: {
          prompt: 'Write a function `countVowels` that takes a const string& and returns the number of vowels (a, e, i, o, u, case-insensitive) using a range-based for loop.',
          starterCode: `#include <iostream>
#include <string>
using namespace std;

int countVowels(const string& s) {
    // TODO: use range-based for to count vowels
}

int main() {
    cout << countVowels("Hello World") << "\\n";    // 3
    cout << countVowels("AEIOU aeiou") << "\\n";    // 10
    cout << countVowels("rhythm") << "\\n";          // 0
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

int countVowels(const string& s) {
    int count = 0;
    for (char c : s) {
        char lower = tolower(c);
        if (lower == 'a' || lower == 'e' || lower == 'i' || lower == 'o' || lower == 'u') {
            count++;
        }
    }
    return count;
}

int main() {
    cout << countVowels("Hello World") << "\\n";    // 3
    cout << countVowels("AEIOU aeiou") << "\\n";    // 10
    cout << countVowels("rhythm") << "\\n";          // 0
    return 0;
}`,
          hints: [
            'Use a range-based for loop to iterate over each character in the string.',
            'Convert each character to lowercase with tolower() before checking.',
            'Compare against each vowel character (a, e, i, o, u) using logical OR.',
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
    icon: 'Code',
    entries: [
      {
        id: 'functions',
        title: 'Functions',
        difficulty: 'beginner',
        tags: ['function', 'return', 'parameters', 'pass-by-value', 'pass-by-reference'],
        cheatSheetSummary: 'returnType name(params) { body }. Pass large objects by const&. Return 0 means success.',
        crossLanguageId: 'functions',
        sections: [
          {
            heading: 'Defining and Calling Functions',
            content:
              'A function in C++ is a named block of code that performs a specific task. Functions are defined with a return type, name, and parameter list. The function must be declared before it is called, either by defining it above the call site or by providing a forward declaration (prototype). Functions that do not return a value use the void return type.',
            code: `#include <iostream>
using namespace std;

// Function definition
int add(int a, int b) {
    return a + b;
}

// Void function (no return value)
void greet(const string& name) {
    cout << "Hello, " << name << "!\\n";
}

// Forward declaration (prototype)
double circleArea(double radius);

int main() {
    int sum = add(3, 4);
    cout << "3 + 4 = " << sum << "\\n";

    greet("World");

    double area = circleArea(5.0);
    cout << "Circle area (r=5): " << area << "\\n";

    return 0;
}

// Definition can come after main if declared above
double circleArea(double radius) {
    return 3.14159 * radius * radius;
}`,
            output: `3 + 4 = 7
Hello, World!
Circle area (r=5): 78.5397`,
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    A["Forward declaration\ncircleArea(double)"] -.->|"promise: defined later"| F["Definition of\ncircleArea()"]\n    M["main()"] -->|"calls"| B["add(3, 4)"]\n    M -->|"calls"| C["greet(World)"]\n    M -->|"calls"| D["circleArea(5.0)"]\n    D -->|"resolved by linker"| F',
              caption: 'Forward declarations let you call functions defined later in the file',
            },
            codeHighlightLines: [2, 3, 7, 8, 12],
          },
          {
            heading: 'Pass by Value vs Pass by Reference',
            content:
              'By default, C++ passes arguments by value, meaning the function receives a copy. Changes to the copy do not affect the original. Pass by reference (&) lets the function access and modify the original variable. Pass by const reference (const &) provides read-only access without copying, ideal for large objects like strings and vectors.',
            code: `#include <iostream>
#include <vector>
using namespace std;

// Pass by value: receives a copy
void doubleValue(int x) {
    x *= 2;  // Only modifies the local copy
}

// Pass by reference: modifies the original
void doubleRef(int& x) {
    x *= 2;
}

// Pass by const reference: efficient read-only
int sumVector(const vector<int>& v) {
    int total = 0;
    for (int n : v) total += n;
    return total;
}

// Returning multiple values via reference parameters
void minMax(const vector<int>& v, int& outMin, int& outMax) {
    outMin = outMax = v[0];
    for (int n : v) {
        if (n < outMin) outMin = n;
        if (n > outMax) outMax = n;
    }
}

int main() {
    int x = 10;
    doubleValue(x);
    cout << "After doubleValue: " << x << "\\n";  // Still 10

    doubleRef(x);
    cout << "After doubleRef: " << x << "\\n";    // Now 20

    vector<int> nums = {5, 1, 9, 3, 7};
    cout << "Sum: " << sumVector(nums) << "\\n";

    int mn, mx;
    minMax(nums, mn, mx);
    cout << "Min: " << mn << ", Max: " << mx << "\\n";

    return 0;
}`,
            output: `After doubleValue: 10
After doubleRef: 20
Sum: 25
Min: 1, Max: 9`,
            tip: 'Rule of thumb: pass primitive types by value, pass containers and strings by const reference, and pass by non-const reference only when you need to modify the argument.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  { label: 'main() Stack Frame', type: 'stack', values: [{ name: 'x', value: '10', highlight: true }] },
                  { label: 'doubleValue() Frame', type: 'stack', values: [{ name: 'x (copy)', value: '10 -> 20', highlight: false }] },
                  { label: 'doubleRef() Frame', type: 'stack', values: [{ name: '&x (reference)', value: 'points to main\'s x', highlight: true }] },
                ],
              },
              caption: 'Pass by value creates a copy; pass by reference shares the original variable',
            },
            analogy: 'Think of it like sharing a document: pass by value is like giving someone a photocopy (they can scribble on it, your original is safe). Pass by reference is giving them the original (changes affect your copy). Const reference is letting them read the original under glass.',
            codeHighlightLines: [3, 4, 8, 9, 13, 14],
          },
          {
            heading: 'Return Values and Multiple Returns',
            content:
              'Functions can return any type, including containers and custom objects. C++11 introduced std::pair and std::tuple for returning multiple values. C++17 structured bindings make it convenient to unpack them. You can also use output parameters (reference arguments) to return multiple values, though returning a struct or pair is generally cleaner.',
            code: `#include <iostream>
#include <tuple>
#include <string>
using namespace std;

// Return a pair
pair<int, int> divide(int dividend, int divisor) {
    return {dividend / divisor, dividend % divisor};
}

// Return a tuple
tuple<string, int, double> getStudentInfo() {
    return {"Alice", 20, 3.85};
}

// Return a struct (often the cleanest approach)
struct Result {
    bool success;
    string message;
    int value;
};

Result processData(int input) {
    if (input < 0) {
        return {false, "Negative input", 0};
    }
    return {true, "OK", input * 2};
}

int main() {
    // Structured binding with pair
    auto [quotient, remainder] = divide(17, 5);
    cout << "17 / 5 = " << quotient << " remainder " << remainder << "\\n";

    // Structured binding with tuple
    auto [name, age, gpa] = getStudentInfo();
    cout << name << ", age " << age << ", GPA " << gpa << "\\n";

    // Struct return
    auto result = processData(21);
    cout << "Success: " << result.success
         << ", Message: " << result.message
         << ", Value: " << result.value << "\\n";

    return 0;
}`,
            output: `17 / 5 = 3 remainder 2
Alice, age 20, GPA 3.85
Success: 1, Message: OK, Value: 42`,
            codeHighlightLines: [5, 10, 15, 16, 17, 18, 27, 31],
          },
        ],
        quiz: [
          {
            question: 'What is the difference between pass by value and pass by reference in C++?',
            options: [
              'There is no difference; both modify the original',
              'Pass by value creates a copy; pass by reference operates on the original variable',
              'Pass by reference creates a copy; pass by value operates on the original',
              'Pass by value is faster than pass by reference',
            ],
            correctIndex: 1,
            explanation: 'Pass by value copies the argument into the function parameter. Pass by reference (&) gives the function direct access to the original variable, so changes are reflected outside the function.',
          },
          {
            question: 'Why should you pass large objects like vectors by const reference (const vector<int>&) instead of by value?',
            options: [
              'To allow the function to modify the vector',
              'To avoid the overhead of copying the entire vector',
              'Because vectors cannot be passed by value',
              'To make the function compile faster',
            ],
            correctIndex: 1,
            explanation: 'Passing large objects by value creates a full copy, which is expensive. const reference avoids the copy while preventing modification, providing both efficiency and safety.',
          },
          {
            question: 'What does a forward declaration (function prototype) allow you to do?',
            options: [
              'Define a function with no body',
              'Call a function before its full definition appears in the file',
              'Override a function defined in another file',
              'Create a template function',
            ],
            correctIndex: 1,
            explanation: 'A forward declaration tells the compiler about a function\'s signature so it can be called before the actual definition appears later in the file or in another translation unit.',
          },
        ],
        challenge: {
          prompt: 'Write a function `clamp` that takes three int parameters (value, low, high) and returns value constrained to the range [low, high]. If value < low, return low. If value > high, return high. Otherwise return value.',
          starterCode: `#include <iostream>
using namespace std;

int clamp(int value, int low, int high) {
    // TODO: implement clamp
}

int main() {
    cout << clamp(5, 1, 10) << "\\n";   // 5
    cout << clamp(-3, 1, 10) << "\\n";  // 1
    cout << clamp(15, 1, 10) << "\\n";  // 10
    cout << clamp(1, 1, 10) << "\\n";   // 1
    cout << clamp(10, 1, 10) << "\\n";  // 10
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int clamp(int value, int low, int high) {
    if (value < low) return low;
    if (value > high) return high;
    return value;
}

int main() {
    cout << clamp(5, 1, 10) << "\\n";   // 5
    cout << clamp(-3, 1, 10) << "\\n";  // 1
    cout << clamp(15, 1, 10) << "\\n";  // 10
    cout << clamp(1, 1, 10) << "\\n";   // 1
    cout << clamp(10, 1, 10) << "\\n";  // 10
    return 0;
}`,
          hints: [
            'Check if value is below the low bound first.',
            'Then check if value is above the high bound.',
            'If neither condition is true, the value is already in range.',
          ],
        },
      },
      {
        id: 'function-overloading',
        title: 'Function Overloading',
        difficulty: 'intermediate',
        tags: ['overloading', 'polymorphism', 'function'],
        cheatSheetSummary: 'Multiple functions with the same name but different parameter types/counts. Compiler picks the best match.',
        sections: [
          {
            heading: 'Overloading Basics',
            content:
              'C++ allows multiple functions with the same name as long as they differ in the number or types of parameters. This is called function overloading. The compiler determines which version to call based on the arguments provided. Overloading makes APIs intuitive by letting you use a single name for conceptually similar operations on different types.',
            code: `#include <iostream>
#include <string>
using namespace std;

// Overloaded print functions
void print(int value) {
    cout << "Integer: " << value << "\\n";
}

void print(double value) {
    cout << "Double: " << value << "\\n";
}

void print(const string& value) {
    cout << "String: " << value << "\\n";
}

void print(int a, int b) {
    cout << "Two integers: " << a << ", " << b << "\\n";
}

int main() {
    print(42);
    print(3.14);
    print(string("Hello"));
    print(10, 20);

    return 0;
}`,
            output: `Integer: 42
Double: 3.14
String: Hello
Two integers: 10, 20`,
            analogy: 'Think of it like a restaurant with a chef named "Cook" who prepares different dishes depending on what ingredients you hand over. Giving Cook(flour, eggs) makes a cake; Cook(lettuce, tomato) makes a salad. Same name, different behavior based on what you provide.',
          },
          {
            heading: 'Overloading Rules and Ambiguity',
            content:
              'The compiler uses a set of rules to determine the best overload: exact match, promotion (e.g., char to int), standard conversion (e.g., int to double), and user-defined conversion. If the compiler cannot determine a single best match, it reports an ambiguity error. Return type alone does not distinguish overloads.',
            code: `#include <iostream>
using namespace std;

int absolute(int x) {
    return x < 0 ? -x : x;
}

double absolute(double x) {
    return x < 0.0 ? -x : x;
}

long absolute(long x) {
    return x < 0 ? -x : x;
}

// Overloaded area calculations
double area(double radius) {
    return 3.14159 * radius * radius;
}

double area(double length, double width) {
    return length * width;
}

double area(double a, double b, double c) {
    // Heron's formula for triangle
    double s = (a + b + c) / 2;
    return sqrt(s * (s - a) * (s - b) * (s - c));
}

int main() {
    cout << "abs(-5): " << absolute(-5) << "\\n";
    cout << "abs(-3.14): " << absolute(-3.14) << "\\n";
    cout << "abs(-100L): " << absolute(-100L) << "\\n";

    cout << "\\nCircle area: " << area(5.0) << "\\n";
    cout << "Rectangle area: " << area(4.0, 6.0) << "\\n";
    cout << "Triangle area: " << area(3.0, 4.0, 5.0) << "\\n";

    return 0;
}`,
            output: `abs(-5): 5
abs(-3.14): 3.14
abs(-100L): 100

Circle area: 78.5397
Rectangle area: 24
Triangle area: 6`,
            warning: 'Calling absolute(5.0f) with a float argument can be ambiguous between int and double overloads. Be explicit with types to avoid surprises.',
          },
          {
            heading: 'Practical Overloading Patterns',
            content:
              'Common real-world uses of overloading include constructors with different parameters, utility functions that handle different input types, and operator overloading (covered separately). Overloading also works well with const-qualified parameters and reference types.',
            code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Find function overloaded for different containers
int find(const vector<int>& v, int target) {
    for (int i = 0; i < (int)v.size(); i++) {
        if (v[i] == target) return i;
    }
    return -1;
}

int find(const string& s, char target) {
    for (int i = 0; i < (int)s.size(); i++) {
        if (s[i] == target) return i;
    }
    return -1;
}

// Overloaded max for different counts
int maxOf(int a, int b) {
    return (a > b) ? a : b;
}

int maxOf(int a, int b, int c) {
    return maxOf(maxOf(a, b), c);
}

int main() {
    vector<int> nums = {10, 20, 30, 40};
    cout << "find(nums, 30): index " << find(nums, 30) << "\\n";
    cout << "find(\\"hello\\", 'l'): index " << find("hello", 'l') << "\\n";

    cout << "max(3, 7): " << maxOf(3, 7) << "\\n";
    cout << "max(3, 7, 5): " << maxOf(3, 7, 5) << "\\n";

    return 0;
}`,
            output: `find(nums, 30): index 2
find("hello", 'l'): index 2
max(3, 7): 7
max(3, 7, 5): 7`,
          },
        ],
        quiz: [
          {
            question: 'What determines which overloaded function is called in C++?',
            options: [
              'The return type of the function',
              'The name of the function only',
              'The number and types of arguments passed',
              'The order in which functions are defined',
            ],
            correctIndex: 2,
            explanation: 'The compiler selects the best matching overload based on the number and types of arguments at the call site. Return type alone cannot distinguish overloads.',
          },
          {
            question: 'Can two overloaded functions differ only in their return type?',
            options: [
              'Yes, the compiler can distinguish them',
              'No, the parameter list must differ',
              'Yes, but only for template functions',
              'Yes, if the return types are unrelated',
            ],
            correctIndex: 1,
            explanation: 'C++ does not allow overloads that differ only in return type. The compiler cannot determine which to call based on the return type alone since the return value might be ignored.',
          },
          {
            question: 'What happens if the compiler cannot determine a single best overload match?',
            options: [
              'It picks the first one defined',
              'It picks the one with the most parameters',
              'It reports an ambiguity error',
              'It uses the default function',
            ],
            correctIndex: 2,
            explanation: 'When multiple overloads are equally good matches for the given arguments, the compiler reports an ambiguity error and refuses to compile.',
          },
        ],
        challenge: {
          prompt: 'Write three overloaded functions named `average`: one taking two ints, one taking three ints, and one taking a vector<int>. Each returns the average as a double.',
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

// TODO: write three overloaded average functions

int main() {
    cout << average(10, 20) << "\\n";            // 15
    cout << average(10, 20, 30) << "\\n";         // 20
    vector<int> nums = {10, 20, 30, 40, 50};
    cout << average(nums) << "\\n";               // 30
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

double average(int a, int b) {
    return (a + b) / 2.0;
}

double average(int a, int b, int c) {
    return (a + b + c) / 3.0;
}

double average(const vector<int>& v) {
    double sum = 0;
    for (int n : v) sum += n;
    return sum / v.size();
}

int main() {
    cout << average(10, 20) << "\\n";            // 15
    cout << average(10, 20, 30) << "\\n";         // 20
    vector<int> nums = {10, 20, 30, 40, 50};
    cout << average(nums) << "\\n";               // 30
    return 0;
}`,
          hints: [
            'Each overload has the same name but different parameter lists.',
            'Divide by 2.0, 3.0, or v.size() to get a double result instead of integer division.',
            'Pass the vector by const reference to avoid copying.',
          ],
        },
      },
      {
        id: 'default-parameters',
        title: 'Default Parameters',
        difficulty: 'beginner',
        tags: ['default', 'parameters', 'optional-args'],
        cheatSheetSummary: 'void func(int a, int b = 10) -- default params must be rightmost and specified once.',
        sections: [
          {
            heading: 'Default Parameter Values',
            content:
              'Default parameters allow you to specify default values for function parameters, making them optional when calling the function. If a caller omits an argument, the default value is used. Default parameters must be specified from right to left: once a parameter has a default value, all parameters to its right must also have defaults.',
            code: `#include <iostream>
#include <string>
using namespace std;

void greet(const string& name, const string& greeting = "Hello") {
    cout << greeting << ", " << name << "!\\n";
}

double power(double base, int exponent = 2) {
    double result = 1;
    for (int i = 0; i < exponent; i++) {
        result *= base;
    }
    return result;
}

void printLine(char ch = '-', int length = 40) {
    for (int i = 0; i < length; i++) cout << ch;
    cout << "\\n";
}

int main() {
    greet("Alice");              // Uses default greeting
    greet("Bob", "Hi");          // Custom greeting

    cout << "5^2 = " << power(5) << "\\n";      // Uses default exponent
    cout << "2^10 = " << power(2, 10) << "\\n";  // Custom exponent

    printLine();         // Default: 40 dashes
    printLine('*', 20); // Custom: 20 stars
    printLine('=');      // Default length, custom char

    return 0;
}`,
            output: `Hello, Alice!
Hi, Bob!
5^2 = 25
2^10 = 1024
----------------------------------------
********************
========================================`,
            tip: 'Default parameters reduce the need for function overloading when the difference is just missing arguments.',
          },
          {
            heading: 'Rules and Best Practices',
            content:
              'Default parameters must start from the rightmost parameter. If the function is declared in a header and defined in a source file, the default should appear only in the declaration (header), not in the definition. Redefining defaults in both places is a compile error. Default values are evaluated at the call site, not at function definition time.',
            code: `#include <iostream>
#include <vector>
using namespace std;

// Defaults must be rightmost
// void bad(int a = 1, int b);  // Error: b has no default

// Good: defaults from right to left
void display(int a, int b = 20, int c = 30) {
    cout << "a=" << a << " b=" << b << " c=" << c << "\\n";
}

// Combining with overloading
string repeat(const string& s, int count = 1) {
    string result;
    for (int i = 0; i < count; i++) {
        result += s;
    }
    return result;
}

int main() {
    display(10);         // b=20, c=30
    display(10, 50);     // c=30
    display(10, 50, 60); // All specified

    cout << repeat("ha") << "\\n";     // "ha" once
    cout << repeat("ha", 3) << "\\n";  // "hahaha"

    return 0;
}`,
            output: `a=10 b=20 c=30
a=10 b=50 c=30
a=10 b=50 c=60
ha
hahaha`,
            note: 'Default parameters are resolved at compile time. If you use a function pointer or pass through a template, the defaults may not apply.',
          },
        ],
      },
      {
        id: 'inline-functions',
        title: 'Inline Functions',
        difficulty: 'intermediate',
        tags: ['inline', 'optimization', 'header', 'performance'],
        cheatSheetSummary: 'inline suggests the compiler replace the function call with the body. Modern compilers decide automatically.',
        sections: [
          {
            heading: 'Inline Functions',
            content:
              'The inline keyword suggests to the compiler that it should replace a function call with the actual function body to avoid the overhead of a function call. However, modern compilers are very good at deciding when to inline functions, so the keyword is mostly useful for allowing function definitions in header files without causing multiple definition errors. Small functions (a few lines) are usually inlined automatically.',
            code: `#include <iostream>
using namespace std;

// Inline function suggestion
inline int square(int x) {
    return x * x;
}

inline int maxOf(int a, int b) {
    return (a > b) ? a : b;
}

// Functions defined inside class bodies are implicitly inline
struct Point {
    double x, y;

    // Implicitly inline
    double distanceFromOrigin() const {
        return sqrt(x * x + y * y);
    }
};

int main() {
    // The compiler may replace square(5) with (5 * 5)
    cout << "square(5) = " << square(5) << "\\n";
    cout << "max(3, 7) = " << maxOf(3, 7) << "\\n";

    Point p{3.0, 4.0};
    cout << "Distance: " << p.distanceFromOrigin() << "\\n";

    // Inline is especially useful in tight loops
    int sum = 0;
    for (int i = 0; i < 1000; i++) {
        sum += square(i);
    }
    cout << "Sum of squares 0..999: " << sum << "\\n";

    return 0;
}`,
            output: `square(5) = 25
max(3, 7) = 7
Distance: 5
Sum of squares 0..999: 332833500`,
            note: 'inline is a suggestion, not a command. The compiler may ignore it for large functions or recursive calls. Use -O2 optimization flag for the compiler to make its own inlining decisions.',
          },
          {
            heading: 'Inline vs Macros',
            content:
              'Before C++11, macros (#define) were sometimes used for "inline" behavior, but they are dangerous because they perform text substitution without type checking. Inline functions are type-safe, respect scope, can be debugged, and are evaluated correctly regardless of argument expressions. Always prefer inline functions over macros for simple computations.',
            code: `#include <iostream>
using namespace std;

// Dangerous macro
#define SQUARE_MACRO(x) ((x) * (x))

// Safe inline function
inline int squareFunc(int x) {
    return x * x;
}

int main() {
    int a = 3;

    // Both work for simple cases
    cout << "Macro: " << SQUARE_MACRO(a) << "\\n";
    cout << "Inline: " << squareFunc(a) << "\\n";

    // Macro problem with side effects
    int b = 3;
    // SQUARE_MACRO(b++) expands to ((b++) * (b++))
    // This modifies b twice - undefined behavior!
    // cout << SQUARE_MACRO(b++) << endl;  // Don't do this!

    // Inline function is safe with side effects
    int c = 3;
    cout << "squareFunc(c++) = " << squareFunc(c++) << "\\n";
    cout << "c is now " << c << "\\n";

    return 0;
}`,
            output: `Macro: 9
Inline: 9
squareFunc(c++) = 9
c is now 4`,
            warning: 'Macros with arguments can have subtle bugs. SQUARE_MACRO(x++) would increment x twice due to text substitution. Always use inline functions instead.',
          },
        ],
      },
      {
        id: 'lambdas',
        title: 'Lambdas',
        difficulty: 'intermediate',
        tags: ['lambda', 'closure', 'anonymous-function', 'c++11', 'functional'],
        cheatSheetSummary: '[capture](params) -> ret { body }. Use [&] to capture all by ref, [=] by value.',
        crossLanguageId: 'lambdas',
        sections: [
          {
            heading: 'Lambda Syntax',
            content:
              'Lambdas are anonymous inline functions introduced in C++11. They consist of a capture list [], parameter list (), optional return type ->, and body {}. Lambdas can be assigned to variables using auto or passed directly to functions. They are essential for STL algorithms, callbacks, and custom sort comparators.',
            code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // Basic lambda
    auto greet = []() {
        cout << "Hello from a lambda!\\n";
    };
    greet();

    // Lambda with parameters
    auto add = [](int a, int b) -> int {
        return a + b;
    };
    cout << "3 + 4 = " << add(3, 4) << "\\n";

    // Lambda as sort comparator
    vector<int> nums = {5, 3, 1, 4, 2};
    sort(nums.begin(), nums.end(), [](int a, int b) {
        return a > b;  // Descending order
    });
    cout << "Sorted desc: ";
    for (int n : nums) cout << n << " ";
    cout << "\\n";

    // Lambda with for_each
    vector<string> names = {"Alice", "Bob", "Charlie"};
    for_each(names.begin(), names.end(), [](const string& name) {
        cout << "Hi, " << name << "! ";
    });
    cout << "\\n";

    return 0;
}`,
            output: `Hello from a lambda!
3 + 4 = 7
Sorted desc: 5 4 3 2 1
Hi, Alice! Hi, Bob! Hi, Charlie!`,
          },
          {
            heading: 'Capture List',
            content:
              'The capture list [] controls which variables from the surrounding scope the lambda can access. [x] captures x by value (copy), [&x] captures x by reference, [=] captures all used variables by value, [&] captures all by reference, and you can mix them. Variables captured by value are const by default; use the mutable keyword to modify them.',
            code: `#include <iostream>
using namespace std;

int main() {
    int x = 10;
    int y = 20;

    // Capture by value (copy)
    auto byVal = [x, y]() {
        cout << "By value: x=" << x << " y=" << y << "\\n";
        // x = 100;  // Error: captured by value is const
    };

    // Capture by reference
    auto byRef = [&x, &y]() {
        x *= 2;
        y *= 2;
    };

    // Capture all by value
    auto allVal = [=]() {
        cout << "All by value: x=" << x << " y=" << y << "\\n";
    };

    // Capture all by reference
    auto allRef = [&]() {
        x += 100;
    };

    byVal();
    byRef();
    cout << "After byRef: x=" << x << " y=" << y << "\\n";

    allRef();
    cout << "After allRef: x=" << x << "\\n";

    // Mutable lambda: can modify captured copies
    int counter = 0;
    auto increment = [counter]() mutable {
        return ++counter;  // Modifies the lambda's copy
    };
    cout << "Call 1: " << increment() << "\\n";
    cout << "Call 2: " << increment() << "\\n";
    cout << "Original counter: " << counter << "\\n";  // Still 0

    return 0;
}`,
            output: `By value: x=10 y=20
After byRef: x=20 y=40
After allRef: x=120
Call 1: 1
Call 2: 2
Original counter: 0`,
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    A["[x, y] — capture x,y by value (copy)"] --> B["Lambda gets its own copies"]\n    C["[&x, &y] — capture by reference"] --> D["Lambda shares the originals"]\n    E["[=] — all by value"] --> F["Copies everything used"]\n    G["[&] — all by reference"] --> H["Shares everything used"]\n    I["[=, &x] — mix"] --> J["All by value except x by ref"]',
              caption: 'Lambda capture modes: controlling how surrounding variables are accessed',
            },
            analogy: 'Think of it like packing for a trip: capture by value [x] is packing a copy of your house key (losing it does not affect the original). Capture by reference [&x] is bringing the actual key on a chain still attached to your keyring -- changes affect the real thing.',
            codeHighlightLines: [5, 10, 16, 21],
          },
          {
            heading: 'Recursive and Generic Lambdas',
            content:
              'For recursive lambdas, you cannot use auto because the type is not yet known during the lambda definition. Instead, use std::function to give the lambda a concrete type. C++14 introduced generic lambdas with auto parameters, which work like template functions without the template syntax.',
            code: `#include <iostream>
#include <functional>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // Recursive lambda using std::function
    function<int(int)> factorial = [&](int n) -> int {
        return (n <= 1) ? 1 : n * factorial(n - 1);
    };
    cout << "5! = " << factorial(5) << "\\n";

    // Recursive Fibonacci
    function<int(int)> fib = [&](int n) -> int {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    };
    cout << "fib(10) = " << fib(10) << "\\n";

    // Generic lambda (C++14) - works with any type
    auto print = [](const auto& value) {
        cout << value << " ";
    };
    print(42);
    print(3.14);
    print(string("hello"));
    cout << "\\n";

    // Generic lambda for comparison
    auto less_than = [](const auto& a, const auto& b) {
        return a < b;
    };
    cout << "3 < 5: " << less_than(3, 5) << "\\n";
    cout << "a < b: " << less_than(string("a"), string("b")) << "\\n";

    return 0;
}`,
            output: `5! = 120
fib(10) = 55
42 3.14 hello
3 < 5: 1
a < b: 1`,
            tip: 'For recursive lambdas, std::function adds overhead due to type erasure. In performance-critical code, prefer a regular named function.',
          },
          {
            heading: 'Lambdas as Callbacks and with STL',
            content:
              'Lambdas are the preferred way to pass custom behavior to STL algorithms. They replace verbose function objects (functors) with concise inline definitions. Common uses include custom sort comparators, filtering with remove_if, transforming with transform, and counting with count_if.',
            code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> nums = {1, -2, 3, -4, 5, -6, 7, -8, 9, -10};

    // Count positives
    int positives = count_if(nums.begin(), nums.end(),
        [](int n) { return n > 0; });
    cout << "Positive count: " << positives << "\\n";

    // Filter: remove negatives
    auto it = remove_if(nums.begin(), nums.end(),
        [](int n) { return n < 0; });
    nums.erase(it, nums.end());
    cout << "After removing negatives: ";
    for (int n : nums) cout << n << " ";
    cout << "\\n";

    // Transform: square all elements
    vector<int> squared(nums.size());
    transform(nums.begin(), nums.end(), squared.begin(),
        [](int n) { return n * n; });
    cout << "Squared: ";
    for (int n : squared) cout << n << " ";
    cout << "\\n";

    // Sort pairs by second element
    vector<pair<string, int>> students = {
        {"Alice", 85}, {"Bob", 92}, {"Charlie", 78}
    };
    sort(students.begin(), students.end(),
        [](const auto& a, const auto& b) {
            return a.second > b.second;
        });
    cout << "By score (desc): ";
    for (const auto& [name, score] : students) {
        cout << name << "(" << score << ") ";
    }
    cout << "\\n";

    return 0;
}`,
            output: `Positive count: 5
After removing negatives: 1 3 5 7 9
Squared: 1 9 25 49 81
By score (desc): Bob(92) Alice(85) Charlie(78)`,
            codeHighlightLines: [7, 8, 12, 13, 20, 21, 22],
          },
        ],
      },
    ],
  },
];

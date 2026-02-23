import type { DocCategory } from './types';

// Part 2: Control Flow + Methods
export const JAVA_PART2_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Control Flow                                                 */
  /* ------------------------------------------------------------ */
  {
    id: 'java-control-flow',
    label: 'Control Flow',
    icon: 'GitBranch',
    entries: [
      {
        id: 'if-else',
        title: 'If / Else',
        difficulty: 'beginner',
        tags: ['if', 'else', 'conditional', 'ternary'],
        cheatSheetSummary: 'if (condition) { } else if (cond2) { } else { }. Condition must be boolean; no implicit int-to-bool conversion.',
        sections: [
          {
            heading: 'Basic If-Else Statements',
            content:
              'Java if-else statements work like most C-family languages. The condition must evaluate to a boolean -- Java does not allow integer or object values as conditions. Curly braces are optional for single statements but strongly recommended to avoid bugs.',
            code: `public class IfElse {
    public static void main(String[] args) {
        int score = 85;

        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else if (score >= 70) {
            System.out.println("Grade: C");
        } else {
            System.out.println("Grade: F");
        }

        // Single-line (braces still recommended)
        int x = 10;
        if (x > 0) System.out.println("Positive");

        // Nested if
        boolean hasTicket = true;
        int age = 15;
        if (hasTicket) {
            if (age >= 18) {
                System.out.println("Welcome to the movie!");
            } else {
                System.out.println("Need parental guidance.");
            }
        }
    }
}`,
            output: `Grade: B
Positive
Need parental guidance.`,
            warning: 'Omitting braces is a common source of bugs. The famous Apple goto fail bug was caused by a missing brace in C code. Always use braces.',
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    A["score = 85"] --> B{"score >= 90?"}
    B -->|Yes| C["Grade: A"]
    B -->|No| D{"score >= 80?"}
    D -->|Yes| E["Grade: B"]
    D -->|No| F{"score >= 70?"}
    F -->|Yes| G["Grade: C"]
    F -->|No| H["Grade: F"]`,
              caption: 'If-else chain evaluates conditions top to bottom, taking the first branch that matches',
            },
            codeHighlightLines: [5, 7, 9, 11],
            analogy: 'Think of it like a bouncer checking IDs at a series of doors: each condition is a checkpoint, and you enter the first door where you meet the requirement.',
          },
          {
            heading: 'Ternary Operator',
            content:
              'The ternary operator (condition ? valueIfTrue : valueIfFalse) provides a concise way to choose between two values based on a condition. It is an expression, not a statement, so it returns a value that can be assigned to a variable or passed to a method. Avoid nesting ternary operators because they become hard to read.',
            code: `public class TernaryDemo {
    public static void main(String[] args) {
        int age = 20;
        String status = (age >= 18) ? "Adult" : "Minor";
        System.out.println("Status: " + status);

        // Using ternary inline
        int a = 5, b = 8;
        int max = (a > b) ? a : b;
        System.out.println("Max: " + max);

        // Ternary in printf
        boolean loggedIn = true;
        System.out.printf("User is %s%n", loggedIn ? "online" : "offline");

        // Ternary with method calls
        String name = null;
        String display = (name != null) ? name : "Anonymous";
        System.out.println("Display: " + display);

        // Avoid nested ternary (hard to read)
        int score = 85;
        String grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";
        System.out.println("Grade: " + grade);
    }
}`,
            output: `Status: Adult
Max: 8
User is online
Display: Anonymous
Grade: B`,
            tip: 'The ternary operator is great for simple two-way choices. For anything more complex, use if-else for clarity.',
            codeHighlightLines: [4, 9, 18],
          },
          {
            heading: 'Common Condition Patterns',
            content:
              'Java conditions often involve null checks, string comparisons, range checks, and combining multiple boolean expressions. Understanding the evaluation order and short-circuit behavior is important for writing correct and safe conditions.',
            code: `public class ConditionPatterns {
    public static void main(String[] args) {
        // Null-safe string comparison
        String input = null;

        // BAD: throws NullPointerException if input is null
        // if (input.equals("yes")) { }

        // GOOD: put literal first, or check null first
        if ("yes".equals(input)) {
            System.out.println("Yes!");
        } else {
            System.out.println("Not yes (or null)");
        }

        // Range checking
        int value = 42;
        if (value >= 1 && value <= 100) {
            System.out.println(value + " is in range [1, 100]");
        }

        // Multiple conditions with short-circuit
        String name = "Alice";
        if (name != null && name.length() > 3 && name.startsWith("A")) {
            System.out.println(name + " matches all criteria");
        }

        // Objects.equals for null-safe comparison
        String a = null;
        String b = null;
        System.out.println("Both null: " + java.util.Objects.equals(a, b));
    }
}`,
            output: `Not yes (or null)
42 is in range [1, 100]
Alice matches all criteria
Both null: true`,
            tip: 'Use "literal".equals(variable) instead of variable.equals("literal") to avoid NullPointerException when variable might be null.',
            analogy: 'Think of it like reading a checklist from top to bottom: short-circuit evaluation lets you skip the rest of the checklist the moment one item fails (&&) or passes (||).',
            codeHighlightLines: [10, 18, 24],
          },
        ],
        quiz: [
          {
            question: 'What happens if you use an integer as a condition in a Java if statement?',
            options: [
              'It compiles and treats 0 as false, non-zero as true',
              'It causes a compile-time error',
              'It throws a RuntimeException',
              'It always evaluates to true',
            ],
            correctIndex: 1,
            explanation: 'Java requires boolean expressions in if conditions. Unlike C/C++, Java does not allow implicit conversion from int to boolean.',
          },
          {
            question: 'What is the result of the ternary expression: (5 > 3) ? "yes" : "no"?',
            options: [
              '"no"',
              'true',
              '"yes"',
              'Compile error',
            ],
            correctIndex: 2,
            explanation: 'The condition (5 > 3) evaluates to true, so the ternary operator returns the value after the ? which is "yes".',
          },
          {
            question: 'Why is "literal".equals(variable) preferred over variable.equals("literal")?',
            options: [
              'It is faster at runtime',
              'It avoids NullPointerException when variable is null',
              'It produces a different result for empty strings',
              'The compiler optimizes it better',
            ],
            correctIndex: 1,
            explanation: 'If variable is null, calling variable.equals("literal") throws a NullPointerException. Calling "literal".equals(variable) safely returns false because the literal is never null.',
          },
        ],
        challenge: {
          prompt: 'Write a method called classifyAge that takes an int age and returns a String: "child" for ages 0-12, "teenager" for 13-17, "adult" for 18-64, and "senior" for 65+. Return "invalid" for negative ages.',
          starterCode: `public class AgeClassifier {
    static String classifyAge(int age) {
        // TODO: implement using if-else
        return "";
    }

    public static void main(String[] args) {
        System.out.println(classifyAge(5));   // child
        System.out.println(classifyAge(15));  // teenager
        System.out.println(classifyAge(30));  // adult
        System.out.println(classifyAge(70));  // senior
        System.out.println(classifyAge(-1));  // invalid
    }
}`,
          solutionCode: `public class AgeClassifier {
    static String classifyAge(int age) {
        if (age < 0) {
            return "invalid";
        } else if (age <= 12) {
            return "child";
        } else if (age <= 17) {
            return "teenager";
        } else if (age <= 64) {
            return "adult";
        } else {
            return "senior";
        }
    }

    public static void main(String[] args) {
        System.out.println(classifyAge(5));   // child
        System.out.println(classifyAge(15));  // teenager
        System.out.println(classifyAge(30));  // adult
        System.out.println(classifyAge(70));  // senior
        System.out.println(classifyAge(-1));  // invalid
    }
}`,
          hints: [
            'Start by handling the invalid (negative) case first',
            'Use else-if chains to check ranges from smallest to largest',
            'Remember that each condition implicitly excludes values caught by previous conditions',
          ],
        },
      },
      {
        id: 'switch',
        title: 'Switch Statements',
        difficulty: 'beginner',
        tags: ['switch', 'case', 'pattern-matching', 'expression'],
        cheatSheetSummary: 'Traditional switch uses break; Modern switch (14+) uses -> arrows and can be an expression returning a value.',
        sections: [
          {
            heading: 'Traditional Switch',
            content:
              'The traditional switch statement compares a value against multiple cases. It supports byte, short, int, char, String (Java 7+), and enum types. Cases fall through by default, so you must use break to prevent executing subsequent cases. The default case handles unmatched values.',
            code: `public class TraditionalSwitch {
    public static void main(String[] args) {
        int day = 3;

        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            case 4:
                System.out.println("Thursday");
                break;
            case 5:
                System.out.println("Friday");
                break;
            default:
                System.out.println("Weekend");
                break;
        }

        // Switch with String (Java 7+)
        String command = "start";
        switch (command) {
            case "start":
                System.out.println("Starting...");
                break;
            case "stop":
                System.out.println("Stopping...");
                break;
            default:
                System.out.println("Unknown command");
        }

        // Fall-through (intentional grouping)
        int month = 2;
        switch (month) {
            case 12: case 1: case 2:
                System.out.println("Winter");
                break;
            case 3: case 4: case 5:
                System.out.println("Spring");
                break;
            default:
                System.out.println("Other season");
        }
    }
}`,
            output: `Wednesday
Starting...
Winter`,
            warning: 'Forgetting break in a switch case causes fall-through, executing all subsequent cases until a break is found. This is a very common bug.',
            analogy: 'Think of it like an elevator with floor buttons: the switch jumps directly to the matching floor (case), but without a break, it keeps sliding down through every floor below it.',
            codeHighlightLines: [12, 13, 14, 42, 43],
          },
          {
            heading: 'Enhanced Switch Expressions (Java 14+)',
            content:
              'Java 14 introduced switch expressions with arrow labels (->). These do not fall through, eliminating the need for break. Switch expressions can return values and support multiple labels per case. Use yield to return a value from a block within a switch expression.',
            code: `public class EnhancedSwitch {
    public static void main(String[] args) {
        int day = 3;

        // Arrow labels: no fall-through, no break needed
        String dayName = switch (day) {
            case 1 -> "Monday";
            case 2 -> "Tuesday";
            case 3 -> "Wednesday";
            case 4 -> "Thursday";
            case 5 -> "Friday";
            case 6, 7 -> "Weekend";  // multiple labels
            default -> "Invalid";
        };
        System.out.println("Day: " + dayName);

        // Switch expression with blocks (use yield)
        String type = switch (day) {
            case 1, 2, 3, 4, 5 -> {
                System.out.println("Processing weekday...");
                yield "Weekday";
            }
            case 6, 7 -> {
                System.out.println("Processing weekend...");
                yield "Weekend";
            }
            default -> "Unknown";
        };
        System.out.println("Type: " + type);

        // Using enum with switch
        enum Status { ACTIVE, INACTIVE, PENDING }
        Status s = Status.ACTIVE;
        String label = switch (s) {
            case ACTIVE   -> "Running";
            case INACTIVE -> "Stopped";
            case PENDING  -> "Waiting";
        };
        System.out.println("Status: " + label);
    }
}`,
            output: `Day: Wednesday
Processing weekday...
Type: Weekday
Status: Running`,
            note: 'Enhanced switch expressions require Java 14+. The yield keyword is used instead of return to produce a value from a switch block.',
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    A["day = 3"] --> S{"switch (day)"}
    S -->|"1"| M["Monday"]
    S -->|"2"| T["Tuesday"]
    S -->|"3"| W["Wednesday"]
    S -->|"4"| TH["Thursday"]
    S -->|"5"| F["Friday"]
    S -->|"6, 7"| WE["Weekend"]
    S -->|"default"| I["Invalid"]
    M --> R["return value"]
    T --> R
    W --> R
    TH --> R
    F --> R
    WE --> R
    I --> R`,
              caption: 'Enhanced switch expression: each arrow case directly produces a value with no fall-through',
            },
            codeHighlightLines: [6, 9, 12, 21],
          },
          {
            heading: 'Switch vs If-Else: When to Use Which',
            content:
              'Use switch when comparing a single variable against multiple constant values. Use if-else for range checks, complex conditions, or when conditions involve different variables. Switch is typically more readable for discrete value matching and can be more performant with many cases because the compiler may use a jump table.',
            code: `public class SwitchVsIf {
    public static void main(String[] args) {
        // Switch is better for discrete values
        char grade = 'B';
        String description = switch (grade) {
            case 'A' -> "Excellent";
            case 'B' -> "Good";
            case 'C' -> "Average";
            case 'D' -> "Below Average";
            case 'F' -> "Failing";
            default  -> "Invalid grade";
        };
        System.out.println(grade + ": " + description);

        // If-else is better for ranges and complex conditions
        int score = 85;
        String result;
        if (score >= 90 && score <= 100) {
            result = "A";
        } else if (score >= 80) {
            result = "B";
        } else if (score >= 70) {
            result = "C";
        } else {
            result = "F";
        }
        System.out.println("Score " + score + " -> " + result);

        // If-else for null checks and method calls
        String input = "hello";
        if (input != null && input.contains("ell")) {
            System.out.println("Contains 'ell'");
        }
    }
}`,
            output: `B: Good
Score 85 -> B
Contains 'ell'`,
            analogy: 'Think of it like choosing tools from a toolbox: switch is a labeled drawer organizer (grab the exact drawer you need), while if-else is like rummaging through an unsorted pile, checking each item to see if it fits your needs.',
            codeHighlightLines: [8, 21, 23, 34],
          },
        ],
        quiz: [
          {
            question: 'What happens if you forget the break statement in a traditional switch case?',
            options: [
              'The compiler inserts a break automatically',
              'A compile-time error occurs',
              'Execution falls through to the next case',
              'The switch statement exits immediately',
            ],
            correctIndex: 2,
            explanation: 'In traditional switch statements, omitting break causes fall-through: execution continues into the next case block regardless of whether its label matches.',
          },
          {
            question: 'In a Java 14+ enhanced switch expression, what keyword is used to return a value from a block?',
            options: [
              'return',
              'yield',
              'break',
              'output',
            ],
            correctIndex: 1,
            explanation: 'In enhanced switch expressions, the yield keyword is used to return a value from a block within a case. The return keyword exits the enclosing method, not the switch.',
          },
          {
            question: 'Which of the following types CANNOT be used in a switch statement?',
            options: [
              'String',
              'int',
              'boolean',
              'char',
            ],
            correctIndex: 2,
            explanation: 'Java switch statements support byte, short, int, char, String (Java 7+), and enum types, but NOT boolean or floating-point types.',
          },
          {
            question: 'What is an advantage of enhanced switch expressions (arrow syntax) over traditional switch?',
            options: [
              'They support more data types',
              'They execute faster at runtime',
              'They do not fall through and can return values directly',
              'They can replace all if-else statements',
            ],
            correctIndex: 2,
            explanation: 'Enhanced switch expressions using arrow labels (->) do not fall through, eliminating break bugs. They can also return values directly, making them usable as expressions.',
          },
        ],
        challenge: {
          prompt: 'Write a method called getDayType that takes a String day name (e.g., "Monday") and returns "Weekday" or "Weekend" using an enhanced switch expression. Return "Invalid" for unrecognized day names.',
          starterCode: `public class DayType {
    static String getDayType(String day) {
        // TODO: use enhanced switch expression (arrow syntax)
        return "";
    }

    public static void main(String[] args) {
        System.out.println(getDayType("Monday"));    // Weekday
        System.out.println(getDayType("Saturday"));  // Weekend
        System.out.println(getDayType("Holiday"));   // Invalid
    }
}`,
          solutionCode: `public class DayType {
    static String getDayType(String day) {
        return switch (day) {
            case "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" -> "Weekday";
            case "Saturday", "Sunday" -> "Weekend";
            default -> "Invalid";
        };
    }

    public static void main(String[] args) {
        System.out.println(getDayType("Monday"));    // Weekday
        System.out.println(getDayType("Saturday"));  // Weekend
        System.out.println(getDayType("Holiday"));   // Invalid
    }
}`,
          hints: [
            'Use the arrow (->) syntax for each case to avoid needing break statements',
            'Multiple labels can share one case using commas: case "A", "B" -> ...',
            'Remember to add a default case for unrecognized values',
          ],
        },
      },
      {
        id: 'for-loops',
        title: 'For Loops',
        difficulty: 'beginner',
        tags: ['for', 'loop', 'iteration', 'counter'],
        cheatSheetSummary: 'for (int i = 0; i < n; i++) { } — C-style counted loop. Use break to exit, continue to skip.',
        sections: [
          {
            heading: 'Standard For Loop',
            content:
              'The standard for loop in Java has three parts: initialization, condition, and update, separated by semicolons. The initialization runs once before the loop starts, the condition is checked before each iteration, and the update runs after each iteration. Any or all parts can be omitted to create different loop patterns.',
            code: `public class ForLoops {
    public static void main(String[] args) {
        // Basic counting loop
        for (int i = 0; i < 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();

        // Counting backwards
        for (int i = 5; i > 0; i--) {
            System.out.print(i + " ");
        }
        System.out.println();

        // Step by 2
        for (int i = 0; i <= 10; i += 2) {
            System.out.print(i + " ");
        }
        System.out.println();

        // Multiple variables
        for (int i = 0, j = 10; i < j; i++, j--) {
            System.out.print("(" + i + "," + j + ") ");
        }
        System.out.println();

        // Iterating over an array
        int[] nums = {10, 20, 30, 40, 50};
        for (int i = 0; i < nums.length; i++) {
            System.out.print(nums[i] + " ");
        }
        System.out.println();
    }
}`,
            output: `0 1 2 3 4
5 4 3 2 1
0 2 4 6 8 10
(0,10) (1,9) (2,8) (3,7) (4,6)
10 20 30 40 50`,
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    A["Init: int i = 0"] --> B{"Condition: i < 5?"}
    B -->|Yes| C["Loop body"]
    C --> D["Update: i++"]
    D --> B
    B -->|No| E["Exit loop"]`,
              caption: 'For loop lifecycle: initialize once, then repeat (check condition, execute body, update) until the condition is false',
            },
            codeHighlightLines: [4, 10, 16, 22],
            analogy: 'Think of it like a metronome with three settings: where to start (init), when to stop (condition), and how fast to tick (update). Each tick is one loop iteration.',
          },
          {
            heading: 'Break and Continue',
            content:
              'The break statement immediately exits the innermost loop. The continue statement skips the rest of the current iteration and proceeds to the next. Java also supports labeled break and continue for nested loops, where you can specify which loop to break from or continue.',
            code: `public class BreakContinue {
    public static void main(String[] args) {
        // Break: exit loop early
        for (int i = 0; i < 10; i++) {
            if (i == 5) break;
            System.out.print(i + " ");
        }
        System.out.println("(broke at 5)");

        // Continue: skip iteration
        for (int i = 0; i < 10; i++) {
            if (i % 2 != 0) continue;
            System.out.print(i + " ");
        }
        System.out.println("(even only)");

        // Labeled break for nested loops
        outer:
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (i == 1 && j == 1) break outer;
                System.out.print("(" + i + "," + j + ") ");
            }
        }
        System.out.println("(broke outer)");

        // Finding an element
        int[] data = {4, 7, 2, 9, 1, 5};
        int target = 9;
        int foundIndex = -1;
        for (int i = 0; i < data.length; i++) {
            if (data[i] == target) {
                foundIndex = i;
                break;
            }
        }
        System.out.println("Found " + target + " at index " + foundIndex);
    }
}`,
            output: `0 1 2 3 4 (broke at 5)
0 2 4 6 8 (even only)
(0,0) (0,1) (0,2) (1,0) (broke outer)
Found 9 at index 3`,
            tip: 'Labeled break (break label;) is the cleanest way to exit nested loops. The alternative is setting a boolean flag, which is less readable.',
            codeHighlightLines: [5, 12, 18, 21],
          },
          {
            heading: 'Nested For Loops',
            content:
              'Nested for loops are used for 2D array traversal, generating patterns, and combinatorial problems. The outer loop controls rows and the inner loop controls columns. Be mindful of the time complexity: nested loops multiply their iteration counts.',
            code: `public class NestedLoops {
    public static void main(String[] args) {
        // 2D array traversal
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.printf("%3d", matrix[i][j]);
            }
            System.out.println();
        }

        // Multiplication table
        System.out.println("\\nMultiplication Table:");
        for (int i = 1; i <= 4; i++) {
            for (int j = 1; j <= 4; j++) {
                System.out.printf("%4d", i * j);
            }
            System.out.println();
        }

        // Right triangle pattern
        System.out.println("\\nTriangle:");
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
            output: `  1  2  3
  4  5  6
  7  8  9

Multiplication Table:
   1   2   3   4
   2   4   6   8
   3   6   9  12
   4   8  12  16

Triangle:
*
* *
* * *
* * * *
* * * * *`,
            analogy: 'Think of it like reading a book page by page (outer loop) and word by word on each page (inner loop): you finish every word on a page before moving to the next page.',
          },
        ],
        quiz: [
          {
            question: 'What are the three parts of a standard for loop header in Java?',
            options: [
              'declaration, condition, increment',
              'initialization, condition, update',
              'start, end, step',
              'variable, range, direction',
            ],
            correctIndex: 1,
            explanation: 'A standard for loop has three parts separated by semicolons: initialization (runs once), condition (checked before each iteration), and update (runs after each iteration).',
          },
          {
            question: 'What does a labeled break (break outer;) do in nested loops?',
            options: [
              'Breaks out of the innermost loop only',
              'Breaks out of the loop labeled "outer"',
              'Throws an exception',
              'Skips the current iteration of the outer loop',
            ],
            correctIndex: 1,
            explanation: 'A labeled break exits the loop that has the matching label, regardless of how deeply nested the break is. This is useful for exiting multiple levels of nested loops at once.',
          },
          {
            question: 'What is the output of: for (int i = 0; i < 5; i++) { if (i == 3) continue; System.out.print(i); }',
            options: [
              '01234',
              '0124',
              '012',
              '01245',
            ],
            correctIndex: 1,
            explanation: 'The continue statement skips the rest of the current iteration when i == 3, so 3 is not printed. All other values (0, 1, 2, 4) are printed.',
          },
        ],
        challenge: {
          prompt: 'Write a method called printDiamond that takes an odd integer n and prints a diamond pattern of asterisks. For n=5, the output should be a diamond shape with maximum width 5.',
          starterCode: `public class Diamond {
    static void printDiamond(int n) {
        // TODO: use nested for loops to print a diamond
        // For n=5:
        //   *
        //  ***
        // *****
        //  ***
        //   *
    }

    public static void main(String[] args) {
        printDiamond(5);
    }
}`,
          solutionCode: `public class Diamond {
    static void printDiamond(int n) {
        int mid = n / 2;
        // Upper half including middle
        for (int i = 0; i <= mid; i++) {
            for (int j = 0; j < mid - i; j++) {
                System.out.print(" ");
            }
            for (int j = 0; j < 2 * i + 1; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
        // Lower half
        for (int i = mid - 1; i >= 0; i--) {
            for (int j = 0; j < mid - i; j++) {
                System.out.print(" ");
            }
            for (int j = 0; j < 2 * i + 1; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        printDiamond(5);
    }
}`,
          hints: [
            'Split the diamond into an upper half (including the middle row) and a lower half',
            'For each row, first print spaces for indentation, then print asterisks',
            'The number of asterisks per row follows the pattern: 1, 3, 5, ..., n, ..., 5, 3, 1',
          ],
        },
      },
      {
        id: 'while-loops',
        title: 'While Loops',
        difficulty: 'beginner',
        tags: ['while', 'do-while', 'loop', 'sentinel'],
        cheatSheetSummary: 'while (condition) { } checks before each iteration. do { } while (condition); executes at least once.',
        sections: [
          {
            heading: 'While and Do-While',
            content:
              'The while loop checks its condition before each iteration. If the condition is false initially, the body never executes. The do-while loop checks the condition after each iteration, guaranteeing the body executes at least once. Both loops need some mechanism to eventually make the condition false, or you get an infinite loop.',
            code: `public class WhileLoops {
    public static void main(String[] args) {
        // While loop
        int count = 5;
        while (count > 0) {
            System.out.print(count + " ");
            count--;
        }
        System.out.println("Go!");

        // Do-while: executes at least once
        int num = 0;
        do {
            System.out.println("Executed with num = " + num);
            num++;
        } while (num < 3);

        // While with unknown iterations
        int n = 12345;
        int digitCount = 0;
        int temp = n;
        while (temp > 0) {
            digitCount++;
            temp /= 10;
        }
        System.out.println(n + " has " + digitCount + " digits");

        // Collatz sequence
        n = 10;
        System.out.print("Collatz(" + n + "): ");
        while (n != 1) {
            System.out.print(n + " -> ");
            n = (n % 2 == 0) ? n / 2 : 3 * n + 1;
        }
        System.out.println(1);
    }
}`,
            output: `5 4 3 2 1 Go!
Executed with num = 0
Executed with num = 1
Executed with num = 2
12345 has 5 digits
Collatz(10): 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1`,
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    subgraph While["while loop"]
        WA{"Condition?"} -->|Yes| WB["Body"]
        WB --> WA
        WA -->|No| WC["Exit"]
    end
    subgraph DoWhile["do-while loop"]
        DA["Body"] --> DB{"Condition?"}
        DB -->|Yes| DA
        DB -->|No| DC["Exit"]
    end`,
              caption: 'while checks condition first (may skip body entirely); do-while executes body first (always runs at least once)',
            },
            analogy: 'Think of it like checking the weather before going outside (while) versus going outside and then checking the weather (do-while). With do-while, you always step out at least once.',
            codeHighlightLines: [5, 13, 16],
          },
          {
            heading: 'Common While Loop Patterns',
            content:
              'While loops are ideal when you do not know the number of iterations in advance. Common patterns include reading input until a sentinel value, processing data until a condition is met, and implementing algorithms with variable-length iterations like binary search or GCD computation.',
            code: `public class WhilePatterns {
    public static void main(String[] args) {
        // GCD using Euclidean algorithm
        int a = 48, b = 18;
        int origA = a, origB = b;
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        System.out.println("GCD(" + origA + ", " + origB + ") = " + a);

        // Binary search with while
        int[] sorted = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
        int target = 23;
        int lo = 0, hi = sorted.length - 1;
        int result = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (sorted[mid] == target) { result = mid; break; }
            else if (sorted[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        System.out.println("Found " + target + " at index " + result);

        // Reverse a number
        int number = 12345;
        int reversed = 0;
        int original = number;
        while (number > 0) {
            reversed = reversed * 10 + number % 10;
            number /= 10;
        }
        System.out.println("Reverse of " + original + " = " + reversed);
    }
}`,
            output: `GCD(48, 18) = 6
Found 23 at index 5
Reverse of 12345 = 54321`,
            tip: 'Use while loops when the exit condition depends on computation inside the loop. Use for loops when you know the iteration count beforehand.',
            codeHighlightLines: [6, 7, 8, 19, 20],
          },
          {
            heading: 'Infinite Loops and Loop Control',
            content:
              'An infinite loop runs forever unless explicitly broken out of with break, return, or System.exit(). Intentional infinite loops are common in game loops, servers, and event-driven programs. The pattern while(true) or for(;;) is idiomatic Java for an intentional infinite loop.',
            code: `public class InfiniteLoops {
    public static void main(String[] args) {
        // Intentional infinite loop with break
        int i = 0;
        while (true) {
            if (i >= 5) break;
            System.out.print(i + " ");
            i++;
        }
        System.out.println("(exited)");

        // for(;;) is equivalent
        int j = 0;
        for (;;) {
            if (j >= 3) break;
            System.out.print(j + " ");
            j++;
        }
        System.out.println("(exited)");

        // Simulated menu loop
        String[] commands = {"status", "help", "quit"};
        int cmdIndex = 0;
        while (true) {
            String cmd = commands[cmdIndex++];
            System.out.println("Command: " + cmd);
            if (cmd.equals("quit")) break;
        }
    }
}`,
            output: `0 1 2 3 4 (exited)
0 1 2 (exited)
Command: status
Command: help
Command: quit`,
            warning: 'An accidental infinite loop freezes your program. Always ensure loops have a reachable exit condition. Use IDE debugging features to detect stuck loops.',
            analogy: 'Think of it like a revolving door that never stops spinning: an infinite loop keeps going until someone (a break statement) physically steps in and jams it open to let you out.',
            codeHighlightLines: [5, 6, 13, 14, 22, 23],
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    A["while (true)"] --> B["Execute body"]
    B --> C{"break condition?"}
    C -->|No| A
    C -->|Yes| D["Exit loop"]`,
              caption: 'Infinite loop pattern: the loop itself has no exit condition; only an explicit break escapes it',
            },
          },
        ],
        quiz: [
          {
            question: 'What is the key difference between a while loop and a do-while loop?',
            options: [
              'while loops are faster than do-while loops',
              'do-while always executes the body at least once',
              'do-while does not require a condition',
              'while loops cannot use break statements',
            ],
            correctIndex: 1,
            explanation: 'A do-while loop checks the condition after executing the body, so the body always runs at least once. A while loop checks the condition first and may skip the body entirely.',
          },
          {
            question: 'What will this code print? int x = 10; while (x > 10) { System.out.print(x); x--; }',
            options: [
              '10',
              '10987654321',
              'Nothing (empty output)',
              'Infinite loop',
            ],
            correctIndex: 2,
            explanation: 'The condition x > 10 is false from the start (x is 10, not greater than 10), so the while loop body never executes and nothing is printed.',
          },
          {
            question: 'What is the risk of writing while(true) without a break or return inside?',
            options: [
              'Compile-time error',
              'The program runs in an infinite loop and never terminates',
              'The JVM automatically exits after 1000 iterations',
              'It throws a RuntimeException after the stack fills up',
            ],
            correctIndex: 1,
            explanation: 'An infinite loop with no break, return, or System.exit() will run forever, freezing the program. Always ensure there is a reachable exit condition.',
          },
          {
            question: 'In the Euclidean GCD algorithm, why is a while loop preferred over a for loop?',
            options: [
              'For loops cannot perform division',
              'The number of iterations is not known in advance',
              'While loops are always faster',
              'For loops do not support multiple variables',
            ],
            correctIndex: 1,
            explanation: 'The Euclidean algorithm runs until the remainder is zero, and the number of steps depends on the input values. Since we cannot predict the iteration count, a while loop is the natural choice.',
          },
        ],
        challenge: {
          prompt: 'Write a method called isPalindrome that takes an int and returns true if the number is a palindrome (reads the same forwards and backwards). Use a while loop to reverse the number and compare. Negative numbers should return false.',
          starterCode: `public class PalindromeNumber {
    static boolean isPalindrome(int num) {
        // TODO: use a while loop to reverse the number
        // then compare original with reversed
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome(121));   // true
        System.out.println(isPalindrome(12321)); // true
        System.out.println(isPalindrome(123));   // false
        System.out.println(isPalindrome(-121));  // false
    }
}`,
          solutionCode: `public class PalindromeNumber {
    static boolean isPalindrome(int num) {
        if (num < 0) return false;
        int original = num;
        int reversed = 0;
        while (num > 0) {
            reversed = reversed * 10 + num % 10;
            num /= 10;
        }
        return original == reversed;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome(121));   // true
        System.out.println(isPalindrome(12321)); // true
        System.out.println(isPalindrome(123));   // false
        System.out.println(isPalindrome(-121));  // false
    }
}`,
          hints: [
            'Save the original number before modifying it in the loop',
            'Extract the last digit with num % 10 and build the reversed number with reversed * 10 + digit',
            'After the loop, compare the original number with the reversed number',
          ],
        },
      },
      {
        id: 'enhanced-for',
        title: 'Enhanced For Loop',
        difficulty: 'beginner',
        tags: ['for-each', 'iterable', 'array', 'collection'],
        cheatSheetSummary: 'for (Type item : collection) { } — iterates over arrays and Iterables. Cannot modify the collection or track index.',
        sections: [
          {
            heading: 'For-Each Syntax and Usage',
            content:
              'The enhanced for loop (for-each) provides a clean syntax for iterating over arrays and collections. It eliminates index management and off-by-one errors. The syntax is for (Type element : source). It works with any object that implements the Iterable interface, including all Java collections.',
            code: `import java.util.List;
import java.util.Map;
import java.util.Set;

public class ForEach {
    public static void main(String[] args) {
        // Array iteration
        int[] numbers = {10, 20, 30, 40, 50};
        int sum = 0;
        for (int n : numbers) {
            sum += n;
        }
        System.out.println("Sum: " + sum);

        // List iteration
        List<String> names = List.of("Alice", "Bob", "Charlie");
        for (String name : names) {
            System.out.println("Hello, " + name);
        }

        // Set iteration (order may vary)
        Set<String> fruits = Set.of("apple", "banana", "cherry");
        for (String fruit : fruits) {
            System.out.print(fruit + " ");
        }
        System.out.println();

        // Map iteration with entrySet
        Map<String, Integer> scores = Map.of("Alice", 95, "Bob", 87);
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}`,
            output: `Sum: 150
Hello, Alice
Hello, Bob
Hello, Charlie
apple banana cherry
Alice: 95
Bob: 87`,
            analogy: 'Think of it like a conveyor belt at a sushi restaurant: each plate (element) comes to you one at a time, and you just pick it up and eat -- no need to count plates or reach for a specific position.',
            codeHighlightLines: [10, 17, 23, 30],
          },
          {
            heading: 'Limitations of For-Each',
            content:
              'The for-each loop has several limitations. You cannot access the current index, you cannot modify the collection during iteration (this throws ConcurrentModificationException), and you cannot iterate backwards or skip elements. When you need any of these capabilities, use a standard for loop or an Iterator.',
            code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ForEachLimits {
    public static void main(String[] args) {
        // Cannot get index with for-each
        String[] colors = {"red", "green", "blue"};

        // Use standard for when you need the index
        for (int i = 0; i < colors.length; i++) {
            System.out.println(i + ": " + colors[i]);
        }

        // Cannot modify collection in for-each
        List<Integer> nums = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6));

        // This would throw ConcurrentModificationException:
        // for (int n : nums) { if (n % 2 == 0) nums.remove(Integer.valueOf(n)); }

        // Use Iterator.remove() instead
        Iterator<Integer> it = nums.iterator();
        while (it.hasNext()) {
            if (it.next() % 2 == 0) {
                it.remove();
            }
        }
        System.out.println("Odds only: " + nums);

        // Or use removeIf (Java 8+)
        List<Integer> nums2 = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6));
        nums2.removeIf(n -> n % 2 == 0);
        System.out.println("Odds only: " + nums2);
    }
}`,
            output: `0: red
1: green
2: blue
Odds only: [1, 3, 5]
Odds only: [1, 3, 5]`,
            warning: 'Never modify a collection (add/remove elements) while iterating with for-each. It causes ConcurrentModificationException. Use Iterator.remove() or removeIf() instead.',
            codeHighlightLines: [22, 23, 24, 25, 32],
          },
          {
            heading: 'For-Each with 2D Arrays',
            content:
              'For-each loops can iterate over multidimensional arrays using nested loops. The outer loop iterates over the rows (which are themselves arrays), and the inner loop iterates over the elements within each row. This pattern is cleaner than using index-based nested for loops.',
            code: `public class ForEach2D {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        // For-each with 2D array
        System.out.println("Matrix:");
        for (int[] row : matrix) {
            for (int val : row) {
                System.out.printf("%3d", val);
            }
            System.out.println();
        }

        // Sum all elements
        int total = 0;
        for (int[] row : matrix) {
            for (int val : row) {
                total += val;
            }
        }
        System.out.println("Total: " + total);

        // Find max element
        int max = Integer.MIN_VALUE;
        for (int[] row : matrix) {
            for (int val : row) {
                max = Math.max(max, val);
            }
        }
        System.out.println("Max: " + max);
    }
}`,
            output: `Matrix:
  1  2  3
  4  5  6
  7  8  9
Total: 45
Max: 9`,
            analogy: 'Think of it like dealing cards at a table: the outer for-each hands you a row (a hand of cards), and the inner for-each lets you inspect each card in that hand one by one.',
            codeHighlightLines: [11, 12, 20, 21, 25, 26],
            diagram: {
              kind: 'custom',
              type: 'array',
              data: {
                label: '2D Array Traversal Order',
                items: [
                  { value: '1', label: '(0,0)', highlight: true },
                  { value: '2', label: '(0,1)', highlight: true },
                  { value: '3', label: '(0,2)', highlight: true },
                  { value: '4', label: '(1,0)' },
                  { value: '5', label: '(1,1)' },
                  { value: '6', label: '(1,2)' },
                  { value: '7', label: '(2,0)' },
                  { value: '8', label: '(2,1)' },
                  { value: '9', label: '(2,2)' },
                ],
              },
              caption: 'For-each with a 2D array visits elements row by row, left to right',
            },
          },
        ],
        quiz: [
          {
            question: 'Which of the following can you iterate over with a for-each loop in Java?',
            options: [
              'Only arrays',
              'Only collections that implement List',
              'Any object that implements Iterable, plus arrays',
              'Any object, including primitive types',
            ],
            correctIndex: 2,
            explanation: 'The enhanced for loop works with arrays and any object that implements the Iterable interface, which includes all Java collections (List, Set, Queue, etc.).',
          },
          {
            question: 'What happens if you modify a List by calling list.remove() inside a for-each loop?',
            options: [
              'The element is removed successfully',
              'A ConcurrentModificationException is thrown',
              'The loop skips the next element',
              'A compile-time error occurs',
            ],
            correctIndex: 1,
            explanation: 'Modifying a collection structurally (adding/removing elements) during for-each iteration throws a ConcurrentModificationException. Use Iterator.remove() or removeIf() instead.',
          },
          {
            question: 'What is a limitation of the enhanced for loop compared to a standard for loop?',
            options: [
              'It cannot iterate over arrays',
              'It cannot access the current index',
              'It is slower for all collection types',
              'It cannot iterate over Strings',
            ],
            correctIndex: 1,
            explanation: 'The enhanced for loop does not expose an index variable. If you need the index during iteration, you must use a standard for loop or maintain a separate counter.',
          },
        ],
        challenge: {
          prompt: 'Write a method called countOccurrences that takes a String array and a target String, then uses an enhanced for loop to count how many times the target appears in the array. Handle null values in the array safely.',
          starterCode: `public class Occurrences {
    static int countOccurrences(String[] arr, String target) {
        // TODO: use enhanced for loop to count matches
        return 0;
    }

    public static void main(String[] args) {
        String[] words = {"apple", "banana", "apple", null, "cherry", "apple"};
        System.out.println(countOccurrences(words, "apple"));  // 3
        System.out.println(countOccurrences(words, "grape"));  // 0
    }
}`,
          solutionCode: `public class Occurrences {
    static int countOccurrences(String[] arr, String target) {
        int count = 0;
        for (String item : arr) {
            if (target.equals(item)) {
                count++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        String[] words = {"apple", "banana", "apple", null, "cherry", "apple"};
        System.out.println(countOccurrences(words, "apple"));  // 3
        System.out.println(countOccurrences(words, "grape"));  // 0
    }
}`,
          hints: [
            'Use the for-each syntax: for (String item : arr)',
            'Use target.equals(item) instead of item.equals(target) to handle null items safely',
            'Increment a counter variable each time a match is found',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Methods                                                      */
  /* ------------------------------------------------------------ */
  {
    id: 'java-methods',
    label: 'Methods',
    icon: 'Code',
    entries: [
      {
        id: 'methods',
        title: 'Method Basics',
        difficulty: 'beginner',
        tags: ['method', 'function', 'return', 'parameters'],
        cheatSheetSummary: 'returnType methodName(params) { }. void means no return value. Must specify all parameter types.',
        signature: 'accessModifier returnType methodName(Type param1, Type param2)',
        sections: [
          {
            heading: 'Defining and Calling Methods',
            content:
              'A method in Java is a block of code that performs a specific task. Methods must be defined inside a class. Every method has a return type (or void if it returns nothing), a name, and zero or more parameters with explicit types. Unlike Python or JavaScript, Java does not support default parameter values or named arguments.',
            code: `public class MethodBasics {
    // Method with return value
    static int add(int a, int b) {
        return a + b;
    }

    // Method with no return value (void)
    static void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }

    // Method with multiple statements
    static double circleArea(double radius) {
        if (radius < 0) {
            throw new IllegalArgumentException("Radius cannot be negative");
        }
        return Math.PI * radius * radius;
    }

    // Method returning boolean
    static boolean isEven(int n) {
        return n % 2 == 0;
    }

    public static void main(String[] args) {
        int sum = add(5, 3);
        System.out.println("5 + 3 = " + sum);

        greet("Alice");

        double area = circleArea(5.0);
        System.out.printf("Circle area: %.2f%n", area);

        System.out.println("4 is even: " + isEven(4));
        System.out.println("7 is even: " + isEven(7));
    }
}`,
            output: `5 + 3 = 8
Hello, Alice!
Circle area: 78.54
4 is even: true
7 is even: false`,
            analogy: 'Think of it like a vending machine: you put in inputs (parameters), the machine does its work internally (method body), and out comes a result (return value). A void method is like a machine that just does work without dispensing anything.',
            codeHighlightLines: [3, 4, 8, 9, 13, 17],
          },
          {
            heading: 'Pass by Value Semantics',
            content:
              'Java is strictly pass-by-value. For primitives, a copy of the value is passed, so the original cannot be changed. For objects and arrays, a copy of the reference is passed, meaning the method can modify the object contents but cannot reassign the original reference.',
            code: `import java.util.ArrayList;
import java.util.List;

public class PassByValue {
    static void tryChange(int x) {
        x = 100;  // Only changes local copy
    }

    static void modifyArray(int[] arr) {
        arr[0] = 999;  // Modifies the actual array
    }

    static void addToList(List<String> list) {
        list.add("new item");  // Modifies the actual list
    }

    static void reassignList(List<String> list) {
        list = new ArrayList<>();  // Only reassigns local reference
        list.add("lost item");
    }

    public static void main(String[] args) {
        // Primitive: original unchanged
        int num = 42;
        tryChange(num);
        System.out.println("After tryChange: " + num);  // still 42

        // Array: contents modified
        int[] arr = {1, 2, 3};
        modifyArray(arr);
        System.out.println("After modifyArray: arr[0] = " + arr[0]);  // 999

        // List: contents modified
        List<String> names = new ArrayList<>();
        names.add("Alice");
        addToList(names);
        System.out.println("After addToList: " + names);

        // List: reassignment does not affect caller
        reassignList(names);
        System.out.println("After reassignList: " + names);  // unchanged
    }
}`,
            output: `After tryChange: 42
After modifyArray: arr[0] = 999
After addToList: [Alice, new item]
After reassignList: [Alice, new item]`,
            tip: 'You cannot write a swap(a, b) method for primitives in Java because both parameters are copies. Swap values inline or use arrays/wrappers.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'main() Stack Frame',
                    type: 'stack',
                    values: [
                      { name: 'num', value: '42' },
                      { name: 'arr', value: '→ 0x7F', highlight: true },
                      { name: 'names', value: '→ 0x8A', highlight: true },
                    ],
                  },
                  {
                    label: 'tryChange() Stack Frame',
                    type: 'stack',
                    values: [
                      { name: 'x', value: '100 (local copy)' },
                    ],
                  },
                  {
                    label: 'Heap',
                    type: 'heap',
                    values: [
                      { name: '0x7F', value: '[999, 2, 3]', highlight: true },
                      { name: '0x8A', value: '["Alice", "new item"]', highlight: true },
                    ],
                  },
                ],
              },
              caption: 'Pass-by-value: primitives are copied entirely, but references are copied as pointers to the same heap object',
            },
            codeHighlightLines: [6, 10, 14, 18, 19],
          },
          {
            heading: 'Returning Multiple Values',
            content:
              'Java methods can only return a single value. To return multiple values, you can use arrays, custom classes, records (Java 16+), or modify a mutable object passed as a parameter. Records are the cleanest modern approach for returning a small group of related values.',
            code: `public class MultipleReturns {
    // Using array to return multiple values
    static int[] minMax(int[] arr) {
        int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;
        for (int val : arr) {
            min = Math.min(min, val);
            max = Math.max(max, val);
        }
        return new int[]{min, max};
    }

    // Using a record (Java 16+)
    record Stats(double mean, double median, int count) {}

    static Stats computeStats(int[] data) {
        int sum = 0;
        for (int val : data) sum += val;
        double mean = (double) sum / data.length;
        java.util.Arrays.sort(data);
        double median = data[data.length / 2];
        return new Stats(mean, median, data.length);
    }

    public static void main(String[] args) {
        int[] data = {5, 2, 8, 1, 9, 3};

        int[] result = minMax(data);
        System.out.println("Min: " + result[0] + ", Max: " + result[1]);

        Stats stats = computeStats(new int[]{10, 20, 30, 40, 50});
        System.out.println("Mean: " + stats.mean());
        System.out.println("Median: " + stats.median());
        System.out.println("Count: " + stats.count());
    }
}`,
            output: `Min: 1, Max: 9
Mean: 30.0
Median: 30.0
Count: 5`,
            codeHighlightLines: [9, 13, 21],
            analogy: 'Think of it like a function that needs to hand you a gift basket instead of a single item: since Java only allows one return value, you bundle multiple results into a container (array, record, or object) and return the whole basket.',
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    A["Method Call"] --> B["computeStats(data)"]
    B --> C["Stats record"]
    C --> D["mean()"]
    C --> E["median()"]
    C --> F["count()"]`,
              caption: 'Records bundle multiple return values into a single, type-safe container',
            },
          },
        ],
        quiz: [
          {
            question: 'What is the return type of a method that does not return any value?',
            options: [
              'null',
              'void',
              'None',
              'undefined',
            ],
            correctIndex: 1,
            explanation: 'In Java, the void keyword is used as the return type for methods that do not return a value. Unlike Python (None) or JavaScript (undefined), Java uses a dedicated keyword.',
          },
          {
            question: 'What happens when a primitive variable is passed to a method in Java?',
            options: [
              'The method receives a reference to the original variable',
              'The method receives a copy of the value',
              'The variable becomes immutable inside the method',
              'The behavior depends on the primitive type',
            ],
            correctIndex: 1,
            explanation: 'Java is strictly pass-by-value for all types. For primitives, a copy of the value is passed, so modifying the parameter inside the method does not affect the original variable.',
          },
          {
            question: 'Can a method modify the contents of an array passed as a parameter?',
            options: [
              'No, arrays are always passed by value',
              'Yes, because a copy of the reference is passed, pointing to the same array',
              'Only if the array is declared as final',
              'Only if the method returns the modified array',
            ],
            correctIndex: 1,
            explanation: 'When an array is passed to a method, a copy of the reference is passed. Both the caller and the method reference the same array on the heap, so the method can modify array contents.',
          },
          {
            question: 'Which Java feature (16+) is the cleanest way to return multiple values from a method?',
            options: [
              'Returning an Object array',
              'Using out parameters',
              'Using records',
              'Using global variables',
            ],
            correctIndex: 2,
            explanation: 'Java 16+ records provide a concise, type-safe way to bundle multiple return values. They automatically generate constructor, getters, equals, hashCode, and toString.',
          },
        ],
        challenge: {
          prompt: 'Write a method called findSecondLargest that takes an int array and returns the second largest element. If the array has fewer than 2 distinct values, return Integer.MIN_VALUE.',
          starterCode: `public class SecondLargest {
    static int findSecondLargest(int[] arr) {
        // TODO: find and return the second largest distinct value
        return Integer.MIN_VALUE;
    }

    public static void main(String[] args) {
        System.out.println(findSecondLargest(new int[]{3, 1, 4, 1, 5, 9})); // 5
        System.out.println(findSecondLargest(new int[]{10, 10, 10}));        // MIN_VALUE
        System.out.println(findSecondLargest(new int[]{7, 3}));              // 3
    }
}`,
          solutionCode: `public class SecondLargest {
    static int findSecondLargest(int[] arr) {
        int first = Integer.MIN_VALUE;
        int second = Integer.MIN_VALUE;
        for (int val : arr) {
            if (val > first) {
                second = first;
                first = val;
            } else if (val > second && val != first) {
                second = val;
            }
        }
        return second;
    }

    public static void main(String[] args) {
        System.out.println(findSecondLargest(new int[]{3, 1, 4, 1, 5, 9})); // 5
        System.out.println(findSecondLargest(new int[]{10, 10, 10}));        // MIN_VALUE
        System.out.println(findSecondLargest(new int[]{7, 3}));              // 3
    }
}`,
          hints: [
            'Track two variables: first (largest) and second (second largest)',
            'When you find a new largest, move the old largest to second before updating first',
            'Make sure to skip duplicates of the largest value when updating second',
          ],
        },
      },
      {
        id: 'method-overloading',
        title: 'Method Overloading',
        difficulty: 'intermediate',
        tags: ['overloading', 'polymorphism', 'compile-time'],
        cheatSheetSummary: 'Multiple methods with the same name but different parameter lists. Resolved at compile time based on argument types.',
        sections: [
          {
            heading: 'Overloading Rules',
            content:
              'Method overloading allows multiple methods with the same name but different parameter lists (different number, type, or order of parameters). The compiler chooses the correct method based on the arguments at the call site. Overloading is resolved at compile time. The return type alone does not distinguish overloaded methods.',
            code: `public class Overloading {
    static int add(int a, int b) {
        return a + b;
    }

    static double add(double a, double b) {
        return a + b;
    }

    static int add(int a, int b, int c) {
        return a + b + c;
    }

    static String add(String a, String b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println("int: " + add(5, 3));
        System.out.println("double: " + add(2.5, 3.7));
        System.out.println("three ints: " + add(1, 2, 3));
        System.out.println("strings: " + add("Hello, ", "World"));

        // Widening: int arguments match double parameters
        System.out.println("int->double: " + add(5.0, 3.0));
    }
}`,
            output: `int: 8
double: 6.2
three ints: 6
strings: Hello, World
int->double: 8.0`,
            analogy: 'Think of it like a restaurant with multiple chefs named "Cook": one specializes in pasta (int), another in sushi (String), another in desserts (double). The host (compiler) sends you to the right Cook based on what you ordered.',
            codeHighlightLines: [2, 6, 10, 14],
          },
          {
            heading: 'Overloading Pitfalls',
            content:
              'Autoboxing and widening can cause ambiguous overloading situations. When the compiler cannot determine the best match, it reports an error. Also, overloading with related types (like int and Integer, or short and int) can lead to unexpected method selection.',
            code: `public class OverloadingPitfalls {
    static void print(int x) {
        System.out.println("int: " + x);
    }

    static void print(long x) {
        System.out.println("long: " + x);
    }

    static void print(Integer x) {
        System.out.println("Integer: " + x);
    }

    // This would cause ambiguity with print(int):
    // static void print(short x) { }

    static void show(Object obj) {
        System.out.println("Object: " + obj);
    }

    static void show(String str) {
        System.out.println("String: " + str);
    }

    public static void main(String[] args) {
        print(42);             // int version (exact match)
        print(42L);            // long version (exact match)
        print(Integer.valueOf(42)); // Integer version

        // String is more specific than Object
        show("hello");         // String version
        show(42);              // Object version (autoboxed)

        // null: picks most specific type
        show((String) null);   // String version
    }
}`,
            output: `int: 42
long: 42
Integer: 42
String: hello
Object: 42
String: null`,
            warning: 'Avoid overloading methods where autoboxing or widening could make the chosen method unclear. Prefer distinct method names for different behaviors.',
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    A["print(42)"] --> B{"Exact match?"}
    B -->|"Yes: int"| C["print(int)"]
    B -->|"No"| D{"Widening?"}
    D -->|"Yes: int→long"| E["print(long)"]
    D -->|"No"| F{"Autoboxing?"}
    F -->|"Yes: int→Integer"| G["print(Integer)"]
    F -->|"No"| H["Compile Error"]`,
              caption: 'Method resolution priority: exact match first, then widening, then autoboxing',
            },
            codeHighlightLines: [2, 6, 10, 26, 27, 28],
          },
          {
            heading: 'Practical Overloading: Factory Methods',
            content:
              'Overloading is commonly used for factory methods and utility classes that accept different input formats. This creates a convenient API where callers can provide data in whatever format they have.',
            code: `import java.time.LocalDate;

public class FactoryOverloading {
    // Different ways to create a greeting
    static String createGreeting(String name) {
        return "Hello, " + name + "!";
    }

    static String createGreeting(String firstName, String lastName) {
        return "Hello, " + firstName + " " + lastName + "!";
    }

    static String createGreeting(String name, String title, boolean formal) {
        if (formal) {
            return "Dear " + title + " " + name + ",";
        }
        return "Hey " + name + "!";
    }

    // Different ways to format a date
    static String formatDate(int year, int month, int day) {
        return String.format("%04d-%02d-%02d", year, month, day);
    }

    static String formatDate(LocalDate date) {
        return date.toString();
    }

    public static void main(String[] args) {
        System.out.println(createGreeting("Alice"));
        System.out.println(createGreeting("Alice", "Smith"));
        System.out.println(createGreeting("Smith", "Dr.", true));

        System.out.println(formatDate(2024, 3, 15));
        System.out.println(formatDate(LocalDate.of(2024, 3, 15)));
    }
}`,
            output: `Hello, Alice!
Hello, Alice Smith!
Dear Dr. Smith,
2024-03-15
2024-03-15`,
            analogy: 'Think of it like a universal remote with one "Power" button that works differently depending on which device (TV, stereo, fan) you point it at: the method name stays the same, but different parameter signatures tell the compiler which version to invoke.',
            codeHighlightLines: [5, 9, 13, 22, 26],
          },
        ],
        quiz: [
          {
            question: 'Which of the following is NOT a valid way to overload a method in Java?',
            options: [
              'Changing the number of parameters',
              'Changing the types of parameters',
              'Changing only the return type',
              'Changing the order of parameter types',
            ],
            correctIndex: 2,
            explanation: 'Methods cannot be overloaded by changing only the return type. The compiler distinguishes overloaded methods by their parameter lists (number, types, and order), not by return type.',
          },
          {
            question: 'When you call print(42) and both print(int) and print(long) exist, which is called?',
            options: [
              'print(long) because long is more general',
              'print(int) because it is an exact match',
              'Compile error due to ambiguity',
              'It depends on the JVM version',
            ],
            correctIndex: 1,
            explanation: 'The compiler prefers an exact match. Since 42 is an int literal, print(int) is an exact match and is chosen over print(long) which would require widening.',
          },
          {
            question: 'What is the method resolution priority order when overloading?',
            options: [
              'Autoboxing, then widening, then exact match',
              'Exact match, then widening, then autoboxing',
              'Widening, then exact match, then autoboxing',
              'Exact match, then autoboxing, then widening',
            ],
            correctIndex: 1,
            explanation: 'Java resolves overloaded methods in this priority order: exact match first, then widening (e.g., int to long), then autoboxing (e.g., int to Integer), and finally varargs.',
          },
        ],
        challenge: {
          prompt: 'Create an overloaded method called repeat that has three versions: (1) repeat(String s, int times) returns the string repeated N times, (2) repeat(char c, int times) returns a string of the character repeated N times, and (3) repeat(String s) returns the string repeated twice (default).',
          starterCode: `public class RepeatOverload {
    // TODO: implement three overloaded versions of repeat

    public static void main(String[] args) {
        System.out.println(repeat("Ha", 3));    // HaHaHa
        System.out.println(repeat('*', 5));     // *****
        System.out.println(repeat("Ole"));      // OleOle
    }
}`,
          solutionCode: `public class RepeatOverload {
    static String repeat(String s, int times) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < times; i++) {
            sb.append(s);
        }
        return sb.toString();
    }

    static String repeat(char c, int times) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < times; i++) {
            sb.append(c);
        }
        return sb.toString();
    }

    static String repeat(String s) {
        return repeat(s, 2);
    }

    public static void main(String[] args) {
        System.out.println(repeat("Ha", 3));    // HaHaHa
        System.out.println(repeat('*', 5));     // *****
        System.out.println(repeat("Ole"));      // OleOle
    }
}`,
          hints: [
            'Use StringBuilder for efficient string concatenation in a loop',
            'The single-parameter version can delegate to the two-parameter version with a default count of 2',
            'The char version and String version differ in parameter type, which is valid overloading',
          ],
        },
      },
      {
        id: 'recursion',
        title: 'Recursion',
        difficulty: 'intermediate',
        tags: ['recursion', 'base-case', 'stack', 'memoization'],
        cheatSheetSummary: 'A method that calls itself. Must have a base case to stop. Watch out for StackOverflowError.',
        sections: [
          {
            heading: 'Recursive Methods',
            content:
              'Recursion is when a method calls itself to solve smaller instances of the same problem. Every recursive method needs a base case (the stopping condition) and a recursive case that moves toward the base case. Without a base case, the method calls itself infinitely until a StackOverflowError occurs.',
            code: `public class Recursion {
    // Factorial: n! = n * (n-1) * ... * 1
    static long factorial(int n) {
        if (n <= 1) return 1;       // base case
        return n * factorial(n - 1); // recursive case
    }

    // Fibonacci: fib(n) = fib(n-1) + fib(n-2)
    static int fibonacci(int n) {
        if (n <= 1) return n;       // base cases: fib(0)=0, fib(1)=1
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    // Sum of digits
    static int digitSum(int n) {
        if (n < 10) return n;
        return n % 10 + digitSum(n / 10);
    }

    // Power: base^exp
    static long power(long base, int exp) {
        if (exp == 0) return 1;
        if (exp % 2 == 0) {
            long half = power(base, exp / 2);
            return half * half;
        }
        return base * power(base, exp - 1);
    }

    public static void main(String[] args) {
        System.out.println("5! = " + factorial(5));
        System.out.println("fib(10) = " + fibonacci(10));
        System.out.println("digitSum(12345) = " + digitSum(12345));
        System.out.println("2^10 = " + power(2, 10));
    }
}`,
            output: `5! = 120
fib(10) = 55
digitSum(12345) = 15
2^10 = 1024`,
            warning: 'The naive Fibonacci recursion has O(2^n) time complexity. Use memoization or iteration for efficiency.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Call Stack for factorial(4)',
                    type: 'stack',
                    values: [
                      { name: 'factorial(1)', value: 'returns 1 (base case)', highlight: true },
                      { name: 'factorial(2)', value: 'returns 2 * 1 = 2' },
                      { name: 'factorial(3)', value: 'returns 3 * 2 = 6' },
                      { name: 'factorial(4)', value: 'returns 4 * 6 = 24' },
                    ],
                  },
                ],
              },
              caption: 'Recursion builds up stack frames until the base case is hit, then unwinds with return values',
            },
            analogy: 'Think of it like Russian nesting dolls: to open the outermost doll (solve the big problem), you must first open all the smaller dolls inside (solve subproblems), until you reach the tiniest one (base case).',
            codeHighlightLines: [4, 5, 10, 11, 16, 17],
          },
          {
            heading: 'Memoization',
            content:
              'Memoization stores the results of expensive function calls so that repeated calls with the same arguments return the cached result instead of recomputing. In Java, you can use an array or HashMap as a cache. This transforms exponential recursive algorithms into polynomial ones.',
            code: `import java.util.HashMap;

public class Memoization {
    static HashMap<Integer, Long> memo = new HashMap<>();

    static long fibonacci(int n) {
        if (n <= 1) return n;
        if (memo.containsKey(n)) return memo.get(n);

        long result = fibonacci(n - 1) + fibonacci(n - 2);
        memo.put(n, result);
        return result;
    }

    // Array-based memoization (faster)
    static long[] cache = new long[51];
    static {
        java.util.Arrays.fill(cache, -1);
    }

    static long fibArray(int n) {
        if (n <= 1) return n;
        if (cache[n] != -1) return cache[n];
        return cache[n] = fibArray(n - 1) + fibArray(n - 2);
    }

    public static void main(String[] args) {
        // Without memoization: extremely slow for large n
        // With memoization: instant even for n=50
        System.out.println("fib(50) = " + fibonacci(50));
        System.out.println("fib(50) = " + fibArray(50));

        // Show cache hits
        memo.clear();
        fibonacci(10);
        System.out.println("Cache size after fib(10): " + memo.size());
    }
}`,
            output: `fib(50) = 12586269025
fib(50) = 12586269025
Cache size after fib(10): 9`,
            tip: 'For interview problems, memoization is a key technique. Start with the recursive solution, then add a cache to optimize.',
            analogy: 'Think of it like a student keeping a cheat sheet during an open-book exam: the first time you work out a problem, you write the answer on your sheet. The next time the same problem appears, you just look it up instead of recalculating.',
            codeHighlightLines: [8, 10, 11, 23, 24],
          },
          {
            heading: 'Stack Overflow and Tail Recursion',
            content:
              'Each recursive call adds a frame to the call stack. Deep recursion can cause StackOverflowError. Java does NOT optimize tail recursion, unlike some other languages. For deep recursion, convert to an iterative solution or increase the stack size with the -Xss JVM flag.',
            code: `public class StackOverflowDemo {
    // This will overflow for large n
    static int countDown(int n) {
        if (n == 0) return 0;
        return 1 + countDown(n - 1);
    }

    // Iterative version: no stack overflow risk
    static int countDownIterative(int n) {
        int count = 0;
        while (n > 0) {
            count++;
            n--;
        }
        return count;
    }

    // Convert recursive factorial to iterative
    static long factorialIterative(int n) {
        long result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    public static void main(String[] args) {
        // Safe depth
        System.out.println("countDown(1000): " + countDown(1000));
        System.out.println("countDown(10000): " + countDownIterative(10000));

        System.out.println("20! = " + factorialIterative(20));

        // This would throw StackOverflowError:
        try {
            countDown(100000);
        } catch (StackOverflowError e) {
            System.out.println("Stack overflow at deep recursion!");
        }
    }
}`,
            output: `countDown(1000): 1000
countDown(10000): 10000
20! = 2432902008176640000
Stack overflow at deep recursion!`,
            note: 'Java does NOT optimize tail recursion. If you need deep recursion (> ~5000 calls), convert to an iterative solution.',
            codeHighlightLines: [4, 5, 9, 10, 11, 36],
          },
        ],
        quiz: [
          {
            question: 'What are the two essential components of every recursive method?',
            options: [
              'A loop and a counter',
              'A base case and a recursive case',
              'An input and an output',
              'A try block and a catch block',
            ],
            correctIndex: 1,
            explanation: 'Every recursive method needs a base case (stopping condition that returns without recursing) and a recursive case (calls itself with a smaller/simpler input that moves toward the base case).',
          },
          {
            question: 'What error occurs when recursion goes too deep in Java?',
            options: [
              'OutOfMemoryError',
              'RecursionException',
              'StackOverflowError',
              'IllegalStateException',
            ],
            correctIndex: 2,
            explanation: 'Each recursive call adds a frame to the call stack. When the stack runs out of space, Java throws a StackOverflowError. This is a subclass of Error, not Exception.',
          },
          {
            question: 'What is the purpose of memoization in recursive algorithms?',
            options: [
              'To reduce the size of the call stack',
              'To cache results of previous calls and avoid redundant computation',
              'To convert recursion into iteration automatically',
              'To handle base cases more efficiently',
            ],
            correctIndex: 1,
            explanation: 'Memoization stores results of expensive function calls so that repeated calls with the same arguments return the cached result instead of recomputing. This can reduce exponential time complexity to polynomial.',
          },
          {
            question: 'Does Java optimize tail recursion?',
            options: [
              'Yes, always',
              'Yes, but only for static methods',
              'No, Java does not perform tail-call optimization',
              'Only in Java 17+',
            ],
            correctIndex: 2,
            explanation: 'Unlike languages like Scala or Haskell, the Java compiler and JVM do NOT optimize tail recursion. Deep recursion in Java requires converting to an iterative solution to avoid StackOverflowError.',
          },
        ],
        challenge: {
          prompt: 'Write a recursive method called flatten that takes a string containing nested parentheses and returns the depth of the deepest nesting. For example, "((()))" has depth 3, "(()())" has depth 2, and "" has depth 0.',
          starterCode: `public class NestingDepth {
    static int maxDepth(String s) {
        // TODO: find the maximum nesting depth of parentheses
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(maxDepth("((()))"));   // 3
        System.out.println(maxDepth("(()())"));   // 2
        System.out.println(maxDepth("()"));        // 1
        System.out.println(maxDepth(""));          // 0
    }
}`,
          solutionCode: `public class NestingDepth {
    static int maxDepth(String s) {
        return helper(s, 0, 0);
    }

    static int helper(String s, int index, int currentDepth) {
        if (index >= s.length()) {
            return currentDepth;
        }
        char c = s.charAt(index);
        if (c == '(') {
            return Math.max(currentDepth + 1, helper(s, index + 1, currentDepth + 1));
        } else if (c == ')') {
            return Math.max(currentDepth, helper(s, index + 1, currentDepth - 1));
        }
        return helper(s, index + 1, currentDepth);
    }

    public static void main(String[] args) {
        System.out.println(maxDepth("((()))"));   // 3
        System.out.println(maxDepth("(()())"));   // 2
        System.out.println(maxDepth("()"));        // 1
        System.out.println(maxDepth(""));          // 0
    }
}`,
          hints: [
            'Use a helper method that tracks the current index and current depth',
            'When you encounter "(", increase depth; when you encounter ")", decrease depth',
            'Track the maximum depth seen so far using Math.max at each recursive step',
          ],
        },
      },
      {
        id: 'static-methods',
        title: 'Static Methods',
        difficulty: 'intermediate',
        tags: ['static', 'class-method', 'utility'],
        cheatSheetSummary: 'static methods belong to the class, not instances. Called as ClassName.method(). Cannot access instance fields.',
        sections: [
          {
            heading: 'Static vs Instance Methods',
            content:
              'A static method belongs to the class itself and can be called without creating an instance. It cannot access instance variables or instance methods directly (since there is no instance). An instance method belongs to an object and can access both static and instance members. Use static for utility methods that do not depend on object state.',
            code: `public class StaticVsInstance {
    // Instance field
    String name;

    // Static field (shared by all instances)
    static int instanceCount = 0;

    // Constructor
    StaticVsInstance(String name) {
        this.name = name;
        instanceCount++;
    }

    // Instance method: can access name and instanceCount
    void introduce() {
        System.out.println("I'm " + name + " (one of " + instanceCount + ")");
    }

    // Static method: can only access static members
    static int getCount() {
        // System.out.println(name);  // COMPILE ERROR: no instance
        return instanceCount;
    }

    // Static utility method
    static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        // Static method called on class
        System.out.println("Count: " + StaticVsInstance.getCount());
        System.out.println("7 is prime: " + isPrime(7));

        // Instance method called on object
        StaticVsInstance a = new StaticVsInstance("Alice");
        StaticVsInstance b = new StaticVsInstance("Bob");
        a.introduce();
        b.introduce();
        System.out.println("Total: " + getCount());
    }
}`,
            output: `Count: 0
7 is prime: true
I'm Alice (one of 2)
I'm Bob (one of 2)
Total: 2`,
            diagram: {
              kind: 'mermaid',
              code: `classDiagram
    class StaticVsInstance {
        -String name
        +static int instanceCount$
        +StaticVsInstance(name)
        +introduce() void
        +static getCount()$ int
        +static isPrime(n)$ boolean
    }
    note for StaticVsInstance "Static members (marked $) belong\\nto the class. Instance members\\nbelong to each object."`,
              caption: 'Static members are shared across all instances; instance members are unique to each object',
            },
            analogy: 'Think of it like a school: the static field instanceCount is like the number of students enrolled (shared by the whole school), while the instance field name is like each student\'s personal name tag (unique to each student).',
            codeHighlightLines: [6, 15, 16, 20, 21],
          },
          {
            heading: 'Utility Classes',
            content:
              'A common Java pattern is a utility class containing only static methods. The Math class is a perfect example. Utility classes typically have a private constructor to prevent instantiation. This pattern keeps related functions organized without requiring object creation.',
            code: `public class MathUtils {
    // Private constructor prevents instantiation
    private MathUtils() {
        throw new AssertionError("Utility class");
    }

    static int gcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    static int lcm(int a, int b) {
        return a / gcd(a, b) * b;
    }

    static boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }
        return true;
    }

    static int[] fibonacci(int n) {
        int[] fib = new int[n];
        if (n > 0) fib[0] = 0;
        if (n > 1) fib[1] = 1;
        for (int i = 2; i < n; i++) {
            fib[i] = fib[i - 1] + fib[i - 2];
        }
        return fib;
    }

    public static void main(String[] args) {
        System.out.println("GCD(12, 8): " + gcd(12, 8));
        System.out.println("LCM(12, 8): " + lcm(12, 8));
        System.out.println("isPalindrome(\\"racecar\\"): " + isPalindrome("racecar"));
        System.out.println("Fibonacci: " + java.util.Arrays.toString(fibonacci(10)));
    }
}`,
            output: `GCD(12, 8): 4
LCM(12, 8): 24
isPalindrome("racecar"): true
Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,
            tip: 'Utility classes should have private constructors to prevent accidental instantiation. This is a widely followed Java convention.',
            codeHighlightLines: [3, 4],
          },
          {
            heading: 'Static Initializer Blocks',
            content:
              'Static initializer blocks run once when the class is first loaded by the JVM, before any static method or constructor is called. They are used to initialize static fields that require complex logic, load native libraries, or set up shared resources.',
            code: `import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class StaticInitializer {
    // Static field with complex initialization
    static final Map<String, Integer> MONTH_DAYS;

    static {
        Map<String, Integer> map = new HashMap<>();
        map.put("January", 31);
        map.put("February", 28);
        map.put("March", 31);
        map.put("April", 30);
        map.put("May", 31);
        map.put("June", 30);
        MONTH_DAYS = Collections.unmodifiableMap(map);
        System.out.println("Static initializer executed!");
    }

    static final int[] PRIMES;

    static {
        // Compute first 10 primes
        PRIMES = new int[10];
        int count = 0, num = 2;
        while (count < 10) {
            boolean isPrime = true;
            for (int i = 2; i * i <= num; i++) {
                if (num % i == 0) { isPrime = false; break; }
            }
            if (isPrime) PRIMES[count++] = num;
            num++;
        }
    }

    public static void main(String[] args) {
        System.out.println("Days in March: " + MONTH_DAYS.get("March"));
        System.out.println("First 10 primes: " + java.util.Arrays.toString(PRIMES));
    }
}`,
            output: `Static initializer executed!
Days in March: 31
First 10 primes: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]`,
            codeHighlightLines: [9, 17, 18, 23],
            analogy: 'Think of it like the setup crew that prepares a concert stage before any audience member arrives: the static initializer runs once when the class is first loaded, setting up shared resources before any constructor or method is ever called.',
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    A["Class first referenced"] --> B["JVM loads class"]
    B --> C["Static initializer block 1 runs"]
    C --> D["Static initializer block 2 runs"]
    D --> E["Class ready for use"]
    E --> F["Static methods / constructors available"]`,
              caption: 'Static initializer blocks execute in order when the class is first loaded, before any method or constructor',
            },
          },
        ],
        quiz: [
          {
            question: 'What is a key restriction of static methods compared to instance methods?',
            options: [
              'Static methods cannot have parameters',
              'Static methods cannot access instance variables or instance methods directly',
              'Static methods cannot return values',
              'Static methods cannot call other static methods',
            ],
            correctIndex: 1,
            explanation: 'Static methods belong to the class, not to any instance. They have no "this" reference, so they cannot access instance variables or call instance methods without an explicit object reference.',
          },
          {
            question: 'When does a static initializer block execute?',
            options: [
              'Every time a new instance is created',
              'When the main method starts',
              'Once, when the class is first loaded by the JVM',
              'When the static method is first called',
            ],
            correctIndex: 2,
            explanation: 'Static initializer blocks run exactly once when the class is first loaded by the JVM, before any static method or constructor is called. This happens at class loading time, not at instance creation time.',
          },
          {
            question: 'Why should utility classes have a private constructor?',
            options: [
              'To improve performance',
              'To prevent accidental instantiation since all methods are static',
              'Because Java requires it for classes with only static methods',
              'To allow subclassing',
            ],
            correctIndex: 1,
            explanation: 'Utility classes contain only static methods and should never be instantiated. A private constructor prevents other code from creating instances of the utility class, which would be meaningless.',
          },
        ],
        challenge: {
          prompt: 'Create a utility class called StringUtils with a private constructor and the following static methods: (1) capitalize(String s) that capitalizes the first letter, (2) countVowels(String s) that counts vowels (a, e, i, o, u, case-insensitive), and (3) reverse(String s) that reverses the string.',
          starterCode: `public class StringUtils {
    // TODO: private constructor

    // TODO: static String capitalize(String s)

    // TODO: static int countVowels(String s)

    // TODO: static String reverse(String s)

    public static void main(String[] args) {
        System.out.println(capitalize("hello"));      // Hello
        System.out.println(countVowels("Education")); // 5
        System.out.println(reverse("Java"));           // avaJ
    }
}`,
          solutionCode: `public class StringUtils {
    private StringUtils() {
        throw new AssertionError("Utility class");
    }

    static String capitalize(String s) {
        if (s == null || s.isEmpty()) return s;
        return Character.toUpperCase(s.charAt(0)) + s.substring(1);
    }

    static int countVowels(String s) {
        int count = 0;
        for (char c : s.toLowerCase().toCharArray()) {
            if ("aeiou".indexOf(c) >= 0) {
                count++;
            }
        }
        return count;
    }

    static String reverse(String s) {
        return new StringBuilder(s).reverse().toString();
    }

    public static void main(String[] args) {
        System.out.println(capitalize("hello"));      // Hello
        System.out.println(countVowels("Education")); // 5
        System.out.println(reverse("Java"));           // avaJ
    }
}`,
          hints: [
            'For capitalize, use Character.toUpperCase() on the first character and concatenate with substring(1)',
            'For countVowels, convert to lowercase and check each character against "aeiou"',
            'For reverse, StringBuilder has a built-in reverse() method',
          ],
        },
      },
      {
        id: 'varargs',
        title: 'Variable Arguments (Varargs)',
        difficulty: 'intermediate',
        tags: ['varargs', 'variable-arguments', 'ellipsis'],
        cheatSheetSummary: 'void method(int... nums) accepts zero or more arguments. Treated as an array inside the method. Must be the last parameter.',
        signature: 'returnType methodName(Type... args)',
        sections: [
          {
            heading: 'Varargs Syntax and Usage',
            content:
              'Varargs (variable arguments) let a method accept zero or more arguments of the same type. The syntax uses an ellipsis (...) after the type name. Inside the method, the varargs parameter is treated as an array. A method can have only one varargs parameter, and it must be the last parameter.',
            code: `public class VarargsDemo {
    static int sum(int... numbers) {
        int total = 0;
        for (int n : numbers) {
            total += n;
        }
        return total;
    }

    static String joinWords(String separator, String... words) {
        return String.join(separator, words);
    }

    static void printAll(Object... items) {
        for (Object item : items) {
            System.out.print(item + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        // Call with any number of arguments
        System.out.println("sum(): " + sum());
        System.out.println("sum(1): " + sum(1));
        System.out.println("sum(1,2,3): " + sum(1, 2, 3));
        System.out.println("sum(1,2,3,4,5): " + sum(1, 2, 3, 4, 5));

        // Can also pass an array
        int[] arr = {10, 20, 30};
        System.out.println("sum(array): " + sum(arr));

        // Varargs with other parameters
        System.out.println(joinWords(", ", "Alice", "Bob", "Charlie"));

        // Object varargs accepts anything
        printAll("Hello", 42, true, 3.14);
    }
}`,
            output: `sum(): 0
sum(1): 1
sum(1,2,3): 6
sum(1,2,3,4,5): 15
sum(array): 60
Alice, Bob, Charlie
Hello 42 true 3.14`,
            analogy: 'Think of it like a buffet plate: the varargs parameter is a plate that can hold zero, one, or many items of the same type, and inside the method you just iterate over whatever is on the plate.',
            codeHighlightLines: [2, 10, 14],
          },
          {
            heading: 'Varargs vs Arrays and Overloading',
            content:
              'Varargs and array parameters are very similar, but varargs provide a more convenient calling syntax. When combined with method overloading, varargs can cause ambiguity. The compiler prefers the most specific method, but if two varargs methods match equally, you get a compile error.',
            code: `public class VarargsOverloading {
    // This is basically equivalent to sum(int[] numbers)
    static int sum(int... numbers) {
        int total = 0;
        for (int n : numbers) total += n;
        return total;
    }

    // Overloading: specific versions are preferred
    static int sum(int a, int b) {
        System.out.print("(two-arg version) ");
        return a + b;
    }

    // printf-style formatting with varargs
    static String format(String template, Object... args) {
        return String.format(template, args);
    }

    // Safe min with at least one argument
    static int min(int first, int... rest) {
        int min = first;
        for (int val : rest) {
            min = Math.min(min, val);
        }
        return min;
    }

    public static void main(String[] args) {
        // Two-arg version is preferred over varargs
        System.out.println(sum(5, 3));

        // Three+ args uses varargs
        System.out.println("sum(1,2,3): " + sum(1, 2, 3));

        // Printf-style
        System.out.println(format("Name: %s, Age: %d", "Alice", 30));

        // min requires at least one argument
        System.out.println("min(5,2,8,1): " + min(5, 2, 8, 1));
    }
}`,
            output: `(two-arg version) 8
sum(1,2,3): 6
Name: Alice, Age: 30
min(5,2,8,1): 1`,
            tip: 'Use min(int first, int... rest) pattern to require at least one argument. Without it, min() with zero args has no meaningful behavior.',
            codeHighlightLines: [3, 10, 21],
          },
          {
            heading: 'Varargs in the Standard Library',
            content:
              'Many Java standard library methods use varargs. Notable examples include String.format(), Arrays.asList(), List.of(), Set.of(), and PrintStream.printf(). Understanding varargs helps you use these APIs effectively and design your own flexible methods.',
            code: `import java.util.Arrays;
import java.util.List;
import java.util.Set;

public class VarargsStdLib {
    public static void main(String[] args) {
        // String.format uses varargs
        String msg = String.format("(%d, %d) -> %s", 10, 20, "point");
        System.out.println(msg);

        // Arrays.asList uses varargs
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
        System.out.println("asList: " + names);

        // List.of uses varargs (Java 9+)
        List<Integer> nums = List.of(1, 2, 3, 4, 5);
        System.out.println("List.of: " + nums);

        // Set.of uses varargs (Java 9+)
        Set<String> colors = Set.of("red", "green", "blue");
        System.out.println("Set.of: " + colors);

        // System.out.printf uses varargs
        System.out.printf("Pi is approximately %.4f%n", Math.PI);
        System.out.printf("%-10s %-10s %-10s%n", "Name", "Age", "City");
        System.out.printf("%-10s %-10d %-10s%n", "Alice", 30, "NYC");
    }
}`,
            output: `(10, 20) -> point
asList: [Alice, Bob, Charlie]
List.of: [1, 2, 3, 4, 5]
Set.of: [red, green, blue]
Pi is approximately 3.1416
Name       Age        City
Alice      30         NYC`,
            analogy: 'Think of it like how everyday tools accept variable inputs: a blender (printf) can take any number of ingredients (arguments), and the recipe card (format string) tells it what to expect.',
            codeHighlightLines: [8, 13, 17, 21, 25],
          },
        ],
        quiz: [
          {
            question: 'Where must the varargs parameter be placed in a method signature?',
            options: [
              'It can be placed anywhere in the parameter list',
              'It must be the first parameter',
              'It must be the last parameter',
              'It must be the only parameter',
            ],
            correctIndex: 2,
            explanation: 'A varargs parameter must be the last parameter in the method signature. A method can have only one varargs parameter, and it must come after all other parameters.',
          },
          {
            question: 'How is a varargs parameter treated inside the method body?',
            options: [
              'As a List',
              'As an array',
              'As a Set',
              'As an Iterator',
            ],
            correctIndex: 1,
            explanation: 'Inside the method, a varargs parameter (Type... args) is treated as an array (Type[] args). You can use array indexing, .length, and enhanced for loops on it.',
          },
          {
            question: 'If both sum(int a, int b) and sum(int... numbers) exist, which is called for sum(3, 4)?',
            options: [
              'sum(int... numbers) because varargs matches everything',
              'sum(int a, int b) because specific signatures are preferred',
              'Compile error due to ambiguity',
              'It depends on the order of method declarations',
            ],
            correctIndex: 1,
            explanation: 'The compiler prefers the most specific match. A method with fixed parameters is more specific than a varargs method, so sum(int a, int b) is chosen over sum(int... numbers).',
          },
          {
            question: 'What is the benefit of using min(int first, int... rest) instead of min(int... numbers)?',
            options: [
              'It runs faster',
              'It guarantees at least one argument is provided at compile time',
              'It avoids autoboxing',
              'It uses less memory',
            ],
            correctIndex: 1,
            explanation: 'The pattern min(int first, int... rest) requires at least one argument at compile time. With min(int... numbers), calling min() with zero arguments is allowed, which makes no sense for a minimum function.',
          },
        ],
        challenge: {
          prompt: 'Write a method called average that uses varargs to accept one or more double values and returns their average. Use the pattern (double first, double... rest) to ensure at least one value is provided. Also write a method called joinWith that takes a String delimiter followed by varargs String values and returns them joined with the delimiter.',
          starterCode: `public class VarargsChallenge {
    // TODO: static double average(double first, double... rest)

    // TODO: static String joinWith(String delimiter, String... values)

    public static void main(String[] args) {
        System.out.println(average(10.0));                    // 10.0
        System.out.println(average(10.0, 20.0, 30.0));       // 20.0
        System.out.println(joinWith("-", "2024", "03", "15")); // 2024-03-15
        System.out.println(joinWith(", ", "a", "b", "c"));    // a, b, c
    }
}`,
          solutionCode: `public class VarargsChallenge {
    static double average(double first, double... rest) {
        double sum = first;
        for (double val : rest) {
            sum += val;
        }
        return sum / (1 + rest.length);
    }

    static String joinWith(String delimiter, String... values) {
        return String.join(delimiter, values);
    }

    public static void main(String[] args) {
        System.out.println(average(10.0));                    // 10.0
        System.out.println(average(10.0, 20.0, 30.0));       // 20.0
        System.out.println(joinWith("-", "2024", "03", "15")); // 2024-03-15
        System.out.println(joinWith(", ", "a", "b", "c"));    // a, b, c
    }
}`,
          hints: [
            'Use the (double first, double... rest) pattern to require at least one value',
            'The total count is 1 + rest.length since first is separate from the varargs array',
            'For joinWith, String.join(delimiter, values) works directly since varargs is treated as an array',
          ],
        },
      },
    ],
  },
];

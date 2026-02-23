import type { DocCategory } from './types';

// Part 1: Getting Started + Basic Types
export const JAVA_PART1_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Getting Started                                              */
  /* ------------------------------------------------------------ */
  {
    id: 'java-getting-started',
    label: 'Getting Started',
    icon: 'Rocket',
    entries: [
      {
        id: 'hello-world',
        title: 'Hello World',
        difficulty: 'beginner',
        tags: ['basics', 'intro', 'main-method'],
        cheatSheetSummary: 'Every Java program needs a class and a public static void main(String[] args) method as its entry point.',
        sections: [
          {
            heading: 'Your First Java Program',
            content:
              'Welcome to Java! Let\'s write your very first program and understand every piece of it. In Java, everything lives inside a class -- think of a class as a container that organizes your code. The entry point of any Java application is a special method with the exact signature `public static void main(String[] args)`. When you run your program, the JVM (Java Virtual Machine) looks for this exact method and starts executing from there. One important rule: your file name must match the public class name and end with `.java`. So if your class is called `HelloWorld`, the file must be `HelloWorld.java`. This might feel rigid at first, but it keeps your project organized as it grows to hundreds of files.',
            code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
            output: `Hello, World!`,
            tip: 'The file must be named HelloWorld.java to match the public class name. Java is case-sensitive, so helloworld.java will not work.',
            codeHighlightLines: [2, 3],
            analogy: 'Think of it like a building with a designated main entrance: the JVM always enters through the main() method, just like visitors enter a building through its front door.',
          },
          {
            heading: 'Compiling and Running',
            content:
              'Here\'s where Java\'s design philosophy really shines. Unlike Python or JavaScript, Java is a compiled language with a twist: it compiles to bytecode, not machine code. Think of it like a two-step process. First, `javac` (the Java compiler) translates your `.java` source code into `.class` bytecode files. Then, `java` (the JVM) runs that bytecode. Why the extra step? Because the JVM exists on every major operating system, your compiled bytecode runs everywhere without modification. This is the famous "write once, run anywhere" promise that made Java so popular for enterprise and cross-platform development. The JVM acts as a universal translator between your code and whatever operating system it lands on.',
            code: `// Save as HelloWorld.java, then in terminal:
// $ javac HelloWorld.java    <-- produces HelloWorld.class
// $ java HelloWorld           <-- runs the program

public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Java version: " + System.getProperty("java.version"));
    }
}`,
            output: `Hello, World!
Java version: 21.0.1`,
            note: 'Since Java 11, you can run single-file programs directly with java HelloWorld.java without a separate compile step.',
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    A["HelloWorld.java\\n(source code)"] -->|javac| B["HelloWorld.class\\n(bytecode)"]
    B -->|java| C["JVM"]
    C --> D["Windows"]
    C --> E["macOS"]
    C --> F["Linux"]`,
              caption: 'Java compilation pipeline: source code compiles to bytecode, which runs on any JVM',
            },
            codeHighlightLines: [2, 3],
          },
          {
            heading: 'Program Structure Explained',
            content:
              'Let\'s demystify every keyword in the Hello World program, because understanding these early will save you hours of confusion later. `public` means accessible from anywhere -- the JVM needs to see your `main` method from the outside. `class` declares a class (Java\'s fundamental building block). `static` means this method belongs to the class itself, not to any particular object -- this is essential because when the program starts, no objects exist yet! `void` means the method doesn\'t return a value. And `String[] args` captures any command-line arguments as an array of strings. For output, Java gives you three flavors: `System.out.println()` prints a line and moves to the next, `System.out.print()` prints without a newline (great for building output piece by piece), and `System.out.printf()` lets you format output with placeholders like `%s` for strings and `%d` for integers, similar to C\'s `printf`.',
            code: `public class ProgramStructure {
    // This is a single-line comment
    /* This is a multi-line comment */

    /**
     * This is a Javadoc comment.
     * It generates documentation automatically.
     */
    public static void main(String[] args) {
        // Print to standard output (with newline)
        System.out.println("With newline");

        // Print without newline
        System.out.print("No ");
        System.out.print("newline ");
        System.out.println("here");

        // Formatted output
        System.out.printf("Name: %s, Age: %d%n", "Alice", 30);
    }
}`,
            output: `With newline
No newline here
Name: Alice, Age: 30`,
            tip: 'Use System.out.println() for lines, System.out.print() for inline output, and System.out.printf() for formatted output similar to C.',
            codeHighlightLines: [9, 11, 14, 19],
          },
        ],
      },
      {
        id: 'jdk-setup',
        title: 'JDK Setup',
        difficulty: 'beginner',
        tags: ['setup', 'jdk', 'ide', 'environment'],
        cheatSheetSummary: 'Install JDK 17+ (LTS), set JAVA_HOME, and verify with java -version and javac -version.',
        sections: [
          {
            heading: 'Choosing a JDK Version',
            content:
              'Before you write a single line of Java, you need the Java Development Kit (JDK). Think of the JDK as your toolbox -- it includes the compiler (`javac`), the runtime (`java`), and the entire standard library. Here\'s the critical decision: which version? Java releases a new version every six months, but only some are Long-Term Support (LTS) versions. LTS releases (Java 17, 21, and 25) receive years of security updates, while non-LTS versions (like 18 or 19) are only supported for six months. For any serious project, always pick an LTS version. As for distributions, Oracle JDK, Eclipse Temurin (from Adoptium), and Amazon Corretto are all excellent choices -- they all compile the same OpenJDK source code, so the differences are mainly in licensing and support terms.',
            code: `// Check your Java installation from the terminal:
// $ java -version
// openjdk version "21.0.1" 2023-10-17
// OpenJDK Runtime Environment (build 21.0.1+12)

// $ javac -version
// javac 21.0.1

// Verify JAVA_HOME is set:
// $ echo $JAVA_HOME
// /usr/lib/jvm/java-21-openjdk

public class VersionCheck {
    public static void main(String[] args) {
        System.out.println("Java Version: " + System.getProperty("java.version"));
        System.out.println("JVM Name: " + System.getProperty("java.vm.name"));
        System.out.println("OS: " + System.getProperty("os.name"));
    }
}`,
            output: `Java Version: 21.0.1
JVM Name: OpenJDK 64-Bit Server VM
OS: Linux`,
            tip: 'If you are just starting out, go with Eclipse Temurin (Adoptium) JDK 21. It is free, open source, and has excellent cross-platform support.',
            analogy: 'Think of it like choosing a car engine: all JDK distributions (Oracle, Temurin, Corretto) are built from the same OpenJDK blueprints, just assembled and warranted by different companies.',
          },
          {
            heading: 'IDE and Build Tools',
            content:
              'Can you write Java in Notepad? Sure. Should you? Absolutely not. A good IDE is like having a co-pilot who catches your mistakes in real time, suggests fixes, and automates tedious tasks. IntelliJ IDEA is the gold standard for Java development -- its code completion, refactoring tools, and debugger are best in class. Eclipse and VS Code (with the Java Extension Pack) are excellent free alternatives. For build automation, you will encounter two tools in the wild: Maven and Gradle. Maven uses XML configuration (`pom.xml`) and follows strict conventions -- great for consistency. Gradle uses a Groovy or Kotlin DSL (`build.gradle`) and is more flexible and faster. In Android development, Gradle is the default. In enterprise Java, you will see both. Either way, learning one of these early pays enormous dividends as your projects grow beyond a single file.',
            code: `// Example Maven project structure:
// my-project/
// ├── pom.xml
// └── src/
//     ├── main/
//     │   └── java/
//     │       └── com/example/
//     │           └── App.java
//     └── test/
//         └── java/
//             └── com/example/
//                 └── AppTest.java

// Compile and run with Maven:
// $ mvn compile
// $ mvn exec:java -Dexec.mainClass="com.example.App"

// Or with Gradle:
// $ gradle build
// $ gradle run`,
            tip: 'IntelliJ IDEA Community Edition is free and covers all core Java development. The Ultimate edition adds web and enterprise framework support.',
          },
          {
            heading: 'Java Packages and Imports',
            content:
              'As your projects grow, you need a way to organize classes and avoid naming collisions. That is exactly what packages do -- think of them as folders for your code, but with superpowers. The `package` declaration must be the very first statement in any Java file. The convention is to use your reversed domain name (like `com.example.myapp`) to ensure global uniqueness. When you need a class from another package, you bring it into scope with an `import` statement. Here is a nice shortcut: Java automatically imports everything in `java.lang.*` (which includes `String`, `System`, `Math`, and other essentials), so you never need to import those manually. For everything else, explicit imports keep your code clear about its dependencies.',
            code: `// File: com/example/Calculator.java
package com.example;

import java.util.Scanner;    // Import a specific class
import java.util.ArrayList;  // Import another class
// import java.util.*;        // Import all classes from a package

public class Calculator {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(10);
        numbers.add(20);
        numbers.add(30);

        int sum = 0;
        for (int n : numbers) {
            sum += n;
        }
        System.out.println("Sum: " + sum);
    }
}`,
            output: `Sum: 60`,
            warning: 'Wildcard imports (import java.util.*) can cause ambiguity when two packages have classes with the same name, such as java.util.Date and java.sql.Date.',
            analogy: 'Think of it like a mailing address written backwards: com.example.myapp is like writing "country, state, city, street" -- it guarantees uniqueness by starting from the broadest scope and narrowing down.',
            codeHighlightLines: [2, 4, 5],
          },
        ],
      },
      {
        id: 'variables',
        title: 'Variables',
        difficulty: 'beginner',
        tags: ['variables', 'declaration', 'initialization', 'naming'],
        cheatSheetSummary: 'Java variables must be declared with a type: int x = 5; Use var for local type inference (Java 10+).',
        sections: [
          {
            heading: 'Declaring and Initializing Variables',
            content:
              'Java is a statically typed language, and this is one of its greatest strengths for building large, reliable systems. Every variable must declare its type upfront, which means the compiler catches type errors before your code ever runs. Think of it like labeling boxes before you pack them -- you always know what is inside. You can declare a variable and assign it a value in one step, or split it into two. One critical rule for beginners: local variables (those declared inside a method) must be initialized before you use them, or the compiler will refuse to compile your code. This is Java protecting you from using garbage values, which is a common source of bugs in languages like C.',
            code: `public class Variables {
    public static void main(String[] args) {
        // Declaration and initialization
        int age = 25;
        double salary = 50000.50;
        String name = "Alice";
        boolean isActive = true;
        char grade = 'A';

        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Salary: " + salary);
        System.out.println("Active: " + isActive);
        System.out.println("Grade: " + grade);

        // Declare first, initialize later
        int score;
        score = 95;
        System.out.println("Score: " + score);

        // Multiple declarations of the same type
        int x = 1, y = 2, z = 3;
        System.out.println("x=" + x + " y=" + y + " z=" + z);
    }
}`,
            output: `Name: Alice
Age: 25
Salary: 50000.5
Active: true
Grade: A
Score: 95
x=1 y=2 z=3`,
            warning: 'Using an uninitialized local variable causes a compile-time error in Java. Instance and class variables get default values (0, false, null), but local variables do not.',
          },
          {
            heading: 'Naming Conventions',
            content:
              'Java has a well-established set of naming conventions that the entire ecosystem follows. This is not just style preference -- it is a shared language that makes any Java codebase immediately readable to any Java developer. Variables and methods use `camelCase` (start lowercase, capitalize each new word). Classes use `PascalCase` (capitalize every word, including the first). Constants use `UPPER_SNAKE_CASE`. Package names are all lowercase. When you see `MAX_RETRIES`, you instantly know it is a constant. When you see `studentAge`, you know it is a variable. When you see `ArrayList`, you know it is a class. This consistency across millions of Java projects worldwide is genuinely powerful.',
            code: `public class NamingConventions {
    // Constants: UPPER_SNAKE_CASE
    static final int MAX_RETRIES = 3;
    static final double PI = 3.14159;

    public static void main(String[] args) {
        // Variables: camelCase
        int studentAge = 20;
        String firstName = "Bob";
        double accountBalance = 1500.75;
        boolean isLoggedIn = false;

        System.out.println("Student: " + firstName);
        System.out.println("Age: " + studentAge);
        System.out.println("Balance: " + accountBalance);
        System.out.println("Max retries: " + MAX_RETRIES);
    }
}`,
            output: `Student: Bob
Age: 20
Balance: 1500.75
Max retries: 3`,
            tip: 'Variable names cannot start with a digit, cannot be Java keywords (like int, class, return), and are case-sensitive (age and Age are different variables).',
          },
          {
            heading: 'Local Variable Type Inference (var)',
            content:
              'Starting with Java 10, you can use `var` to let the compiler figure out the type for you. Instead of writing `HashMap<String, List<Integer>> map = new HashMap<String, List<Integer>>()`, you can simply write `var map = new HashMap<String, List<Integer>>()`. The compiler infers the full type from the right-hand side of the assignment. This is purely a convenience feature -- the variable is still strongly typed, you just do not have to spell it out twice. However, `var` comes with rules: it only works for local variables with an initializer. You cannot use it for method parameters, return types, or class fields. Use `var` when the type is obvious from context (like `var list = new ArrayList<String>()`), but prefer explicit types when clarity matters (like `int count = 0` instead of `var count = 0`).',
            code: `public class VarExample {
    public static void main(String[] args) {
        // var infers the type from the initializer
        var message = "Hello";          // String
        var count = 42;                 // int
        var price = 19.99;              // double
        var names = new java.util.ArrayList<String>();  // ArrayList<String>

        names.add("Alice");
        names.add("Bob");

        System.out.println(message + " (" + message.getClass().getSimpleName() + ")");
        System.out.println(count);
        System.out.println(price);
        System.out.println(names);

        // Very useful with long generic types
        var map = new java.util.HashMap<String, java.util.List<Integer>>();
        map.put("primes", java.util.List.of(2, 3, 5, 7));
        System.out.println(map);
    }
}`,
            output: `Hello (String)
42
19.99
[Alice, Bob]
{primes=[2, 3, 5, 7]}`,
            note: 'var is available since Java 10. It is NOT a keyword -- it is a reserved type name, so you can still have a variable named var (though you should not).',
            analogy: 'Think of it like sending a package with a return address label that auto-fills: the compiler reads the right-hand side and stamps the type on the variable for you, but the package still only holds that one type.',
          },
        ],
      },
      {
        id: 'data-types',
        title: 'Data Types Overview',
        difficulty: 'beginner',
        tags: ['types', 'primitive', 'reference', 'memory'],
        cheatSheetSummary: 'Java has 8 primitive types (byte, short, int, long, float, double, char, boolean) and reference types (objects, arrays, strings).',
        sections: [
          {
            heading: 'Primitive vs Reference Types',
            content:
              'This is one of the most important concepts to internalize early in your Java journey. Java has two fundamentally different kinds of data types, and understanding the distinction will save you from countless bugs. Primitive types (`int`, `double`, `boolean`, etc.) store actual values directly -- when you copy a primitive, you get a completely independent copy. Reference types (objects, arrays, strings) store a memory address pointing to data on the heap -- when you copy a reference, both variables now point to the same object. It is like the difference between photocopying a document (primitive) versus sharing a Google Doc link (reference). Changes to the photocopy do not affect the original, but edits to the shared doc are visible to everyone who has the link.',
            code: `public class DataTypes {
    public static void main(String[] args) {
        // Primitive types - store values directly
        int a = 10;
        int b = a;     // copies the value
        b = 20;        // changing b does NOT affect a
        System.out.println("a = " + a);  // still 10
        System.out.println("b = " + b);  // 20

        // Reference types - store references to objects
        int[] arr1 = {1, 2, 3};
        int[] arr2 = arr1;    // copies the reference
        arr2[0] = 99;         // changing arr2 DOES affect arr1
        System.out.println("arr1[0] = " + arr1[0]);  // 99!
        System.out.println("arr2[0] = " + arr2[0]);  // 99

        // null is only valid for reference types
        String text = null;
        // int x = null;  // COMPILE ERROR: primitives cannot be null
        System.out.println("text is null: " + (text == null));
    }
}`,
            output: `a = 10
b = 20
arr1[0] = 99
arr2[0] = 99
text is null: true`,
            warning: 'Accessing a method or field on a null reference throws NullPointerException, the most common runtime error in Java. Always check for null before calling methods on objects you did not create yourself.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Stack',
                    type: 'stack',
                    values: [
                      { name: 'a', value: '10' },
                      { name: 'b', value: '20' },
                      { name: 'arr1', value: '→ 0x4A', highlight: true },
                      { name: 'arr2', value: '→ 0x4A', highlight: true },
                    ],
                  },
                  {
                    label: 'Heap',
                    type: 'heap',
                    values: [
                      { name: '0x4A', value: '[99, 2, 3]', highlight: true },
                    ],
                  },
                ],
              },
              caption: 'Primitives store values on the stack; reference variables point to objects on the heap',
            },
            analogy: 'Think of it like photocopying vs. sharing a Google Doc link: copying a primitive is like photocopying a document (independent copies), while copying a reference is like sharing a link (both point to the same original).',
            codeHighlightLines: [5, 6, 12, 13],
          },
          {
            heading: 'All Eight Primitive Types',
            content:
              'Java has exactly eight primitive types, and each one has a fixed size that never changes regardless of the platform. This is a deliberate design choice -- a Java `int` is always 32 bits whether you run on Windows, Mac, or a Raspberry Pi. The integer family goes from tiny to huge: `byte` (8-bit, great for raw data and saving memory), `short` (16-bit, rarely used in practice), `int` (32-bit, your default workhorse for integers), and `long` (64-bit, for when billions are not enough). For decimals, `float` gives you about 7 digits of precision and `double` gives you about 15. The `char` type holds a single 16-bit Unicode character. And `boolean` is simply `true` or `false`. A nice readability trick: you can use underscores in numeric literals like `1_000_000` -- the compiler ignores them, but your eyes will thank you.',
            code: `public class PrimitiveTypes {
    public static void main(String[] args) {
        byte b = 127;                     // -128 to 127
        short s = 32767;                  // -32,768 to 32,767
        int i = 2_147_483_647;            // ~2.1 billion
        long l = 9_223_372_036_854_775_807L; // append L for long

        float f = 3.14f;                  // append f for float
        double d = 3.141592653589793;     // default decimal type

        char c = 'A';                     // single character
        boolean flag = true;              // true or false

        System.out.println("byte:    " + b);
        System.out.println("short:   " + s);
        System.out.println("int:     " + i);
        System.out.println("long:    " + l);
        System.out.println("float:   " + f);
        System.out.println("double:  " + d);
        System.out.println("char:    " + c);
        System.out.println("boolean: " + flag);

        // Size in bytes
        System.out.println("\\nint size: " + Integer.BYTES + " bytes");
        System.out.println("long size: " + Long.BYTES + " bytes");
        System.out.println("double size: " + Double.BYTES + " bytes");
    }
}`,
            output: `byte:    127
short:   32767
int:     2147483647
long:    9223372036854775807
float:   3.14
double:  3.141592653589793
char:    A
boolean: true

int size: 4 bytes
long size: 8 bytes
double size: 8 bytes`,
            tip: 'Use int for most integer work, long when values exceed 2 billion, and double for all floating-point work. Avoid byte and short unless memory is critical.',
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    subgraph Integer["Integer Types"]
        B["byte\\n1 byte"] --> S["short\\n2 bytes"] --> I["int\\n4 bytes"] --> L["long\\n8 bytes"]
    end
    subgraph Decimal["Decimal Types"]
        F["float\\n4 bytes"] --> D["double\\n8 bytes"]
    end
    subgraph Other["Other"]
        CH["char\\n2 bytes"]
        BO["boolean\\n~1 bit"]
    end`,
              caption: 'The 8 primitive types grouped by category with their memory sizes',
            },
          },
          {
            heading: 'Default Values and Limits',
            content:
              'Here is something that trips up many beginners: Java has two different rules for initialization depending on where a variable is declared. Instance variables (fields declared in a class) automatically receive default values -- numeric types get `0`, booleans get `false`, and reference types get `null`. But local variables inside methods get nothing -- you must initialize them yourself, or the compiler will complain. Each numeric type also has built-in constants for its minimum and maximum values, which are invaluable for initializing search algorithms (`Integer.MAX_VALUE` as an initial minimum, for example). And here is a sneaky trap: integer overflow in Java is completely silent. If you add 1 to `Integer.MAX_VALUE`, it wraps around to `Integer.MIN_VALUE` without any error or warning. This silent overflow has caused real-world bugs in production systems.',
            code: `public class DefaultsAndLimits {
    // Instance fields get default values
    static int defaultInt;
    static double defaultDouble;
    static boolean defaultBoolean;
    static String defaultString;

    public static void main(String[] args) {
        System.out.println("Default int:     " + defaultInt);
        System.out.println("Default double:  " + defaultDouble);
        System.out.println("Default boolean: " + defaultBoolean);
        System.out.println("Default String:  " + defaultString);

        System.out.println("\\n--- Type Limits ---");
        System.out.println("int:   " + Integer.MIN_VALUE + " to " + Integer.MAX_VALUE);
        System.out.println("long:  " + Long.MIN_VALUE + " to " + Long.MAX_VALUE);
        System.out.println("float max: " + Float.MAX_VALUE);
        System.out.println("double max: " + Double.MAX_VALUE);

        // Overflow wraps around silently
        int maxInt = Integer.MAX_VALUE;
        System.out.println("\\nmax int:     " + maxInt);
        System.out.println("max int + 1: " + (maxInt + 1));  // wraps to MIN_VALUE!
    }
}`,
            output: `Default int:     0
Default double:  0.0
Default boolean: false
Default String:  null

--- Type Limits ---
int:   -2147483648 to 2147483647
long:  -9223372036854775808 to 9223372036854775807
float max: 3.4028235E38
double max: 1.7976931348623157E308

max int:     2147483647
max int + 1: -2147483648`,
            warning: 'Integer overflow in Java wraps around silently without any exception. Always use long if values might exceed 2.1 billion, or use Math.addExact() to detect overflow explicitly.',
            analogy: 'Think of it like an old car odometer that rolls from 999999 back to 000000: once you exceed the maximum value, it wraps around to the minimum without any warning light.',
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Basic Types                                                  */
  /* ------------------------------------------------------------ */
  {
    id: 'java-basic-types',
    label: 'Basic Types',
    icon: 'Database',
    entries: [
      {
        id: 'integers',
        title: 'Integers',
        difficulty: 'beginner',
        tags: ['int', 'long', 'byte', 'short', 'arithmetic'],
        cheatSheetSummary: 'int is the default integer type (32-bit). Use long for large values. Append L to long literals.',
        sections: [
          {
            heading: 'Integer Arithmetic',
            content:
              'Java gives you all the arithmetic operators you would expect: `+`, `-`, `*`, `/`, and `%` (modulus). But there is a crucial gotcha that catches almost every beginner: integer division truncates toward zero, discarding any fractional part. So `17 / 5` gives you `3`, not `3.4`. If you want the decimal result, at least one operand must be a `double` (more on that in the Type Casting section). The modulus operator `%` returns the remainder and is incredibly useful -- checking if a number is even (`n % 2 == 0`), wrapping values around a range, or distributing items into buckets. Also worth noting: Java\'s `%` preserves the sign of the dividend, so `-7 % 2` gives `-1`, which differs from Python\'s behavior. The `Math` class provides handy utilities like `Math.max()`, `Math.min()`, and `Math.abs()` that you will reach for constantly.',
            code: `public class IntegerArithmetic {
    public static void main(String[] args) {
        int a = 17, b = 5;

        System.out.println("a + b = " + (a + b));
        System.out.println("a - b = " + (a - b));
        System.out.println("a * b = " + (a * b));
        System.out.println("a / b = " + (a / b));   // integer division
        System.out.println("a % b = " + (a % b));   // remainder

        // Negative division truncates toward zero
        System.out.println("-7 / 2 = " + (-7 / 2));   // -3, not -4
        System.out.println("-7 % 2 = " + (-7 % 2));   // -1

        // Use Math methods
        System.out.println("max(a,b) = " + Math.max(a, b));
        System.out.println("min(a,b) = " + Math.min(a, b));
        System.out.println("abs(-42) = " + Math.abs(-42));

        // Underscores in numeric literals for readability
        int million = 1_000_000;
        long billion = 1_000_000_000L;
        System.out.println("million: " + million);
        System.out.println("billion: " + billion);
    }
}`,
            output: `a + b = 22
a - b = 12
a * b = 85
a / b = 3
a % b = 2
-7 / 2 = -3
-7 % 2 = -1
max(a,b) = 17
min(a,b) = 5
abs(-42) = 42
million: 1000000
billion: 1000000000`,
            tip: 'Use underscores in numeric literals to improve readability: 1_000_000 is the same as 1000000.',
            codeHighlightLines: [8, 9, 12, 13],
          },
          {
            heading: 'Number Bases and Bitwise Operations',
            content:
              'Sometimes you need to work with numbers at the binary level -- for performance-critical code, network protocols, cryptography, or embedded systems. Java supports four number literal formats: decimal (the default), hexadecimal (prefix `0x`), octal (prefix `0`), and binary (prefix `0b`). The bitwise operators manipulate individual bits: AND (`&`) turns off bits, OR (`|`) turns on bits, XOR (`^`) flips bits, and NOT (`~`) inverts all bits. Shift operators (`<<`, `>>`, `>>>`) multiply or divide by powers of 2 extremely efficiently. A classic trick: `n & 1` checks if a number is odd (it tests the least significant bit). The unsigned right shift `>>>` always fills with zeros, regardless of the sign bit -- useful when treating integers as unsigned values.',
            code: `public class BitwiseOps {
    public static void main(String[] args) {
        // Number bases
        int decimal = 42;
        int hex = 0x2A;       // hexadecimal
        int octal = 052;      // octal
        int binary = 0b101010; // binary

        System.out.println("All equal 42: " + decimal + " " + hex + " " + octal + " " + binary);

        // Bitwise operations
        int x = 0b1100;  // 12
        int y = 0b1010;  // 10

        System.out.println("x & y  = " + (x & y));   // AND: 1000 = 8
        System.out.println("x | y  = " + (x | y));   // OR:  1110 = 14
        System.out.println("x ^ y  = " + (x ^ y));   // XOR: 0110 = 6
        System.out.println("~x     = " + (~x));       // NOT: -13
        System.out.println("x << 2 = " + (x << 2));   // left shift: 48
        System.out.println("x >> 1 = " + (x >> 1));   // right shift: 6

        // Check if number is even
        int num = 7;
        System.out.println(num + " is even: " + ((num & 1) == 0));
    }
}`,
            output: `All equal 42: 42 42 42 42
x & y  = 8
x | y  = 14
x ^ y  = 6
~x     = -13
x << 2 = 48
x >> 1 = 6
7 is even: false`,
            warning: 'Be careful with the octal prefix `0`. Writing `int x = 010` gives you `8`, not `10`. This is a common source of subtle bugs when formatting numbers with leading zeros.',
          },
          {
            heading: 'Integer Overflow and Safe Math',
            content:
              'Integer overflow is one of Java\'s silent dangers. Because `int` and `long` have fixed sizes, exceeding their range does not throw an error -- the value simply wraps around like an odometer rolling past 999999 back to 000000. This means `Integer.MAX_VALUE + 1` quietly becomes `Integer.MIN_VALUE`, a negative number! This has caused real-world security vulnerabilities and financial calculation bugs. Fortunately, Java provides a safety net: the `Math.addExact()`, `Math.subtractExact()`, and `Math.multiplyExact()` methods throw an `ArithmeticException` if overflow occurs. For values that might exceed `long` range (which is over 9 quintillion), use `BigInteger` -- it handles arbitrarily large numbers with no overflow risk, though at the cost of performance.',
            code: `import java.math.BigInteger;

public class OverflowSafety {
    public static void main(String[] args) {
        // Silent overflow
        int max = Integer.MAX_VALUE;
        System.out.println("MAX_VALUE:     " + max);
        System.out.println("MAX_VALUE + 1: " + (max + 1)); // wraps!

        // Safe math with Math.xxxExact
        try {
            int result = Math.addExact(max, 1);
        } catch (ArithmeticException e) {
            System.out.println("Overflow detected: " + e.getMessage());
        }

        // Use long for larger values
        long bigResult = (long) max + 1;
        System.out.println("Using long: " + bigResult);

        // BigInteger for arbitrarily large values
        BigInteger huge = BigInteger.valueOf(Long.MAX_VALUE);
        huge = huge.multiply(BigInteger.valueOf(1000));
        System.out.println("BigInteger: " + huge);
    }
}`,
            output: `MAX_VALUE:     2147483647
MAX_VALUE + 1: -2147483648
Overflow detected: integer overflow
Using long: 2147483648
BigInteger: 9223372036854775807000`,
            warning: 'Always cast to long BEFORE the multiplication: (long) a * b. Writing (long)(a * b) overflows first and then casts the wrong result.',
            codeHighlightLines: [8, 12, 18],
          },
        ],
      },
      {
        id: 'floating-point',
        title: 'Floating Point',
        difficulty: 'beginner',
        tags: ['float', 'double', 'precision', 'BigDecimal'],
        cheatSheetSummary: 'Use double for most decimal math. Use BigDecimal for exact decimal arithmetic (money). Append f for float literals.',
        sections: [
          {
            heading: 'Float vs Double',
            content:
              'When you need decimal numbers, Java offers two choices: `float` (32-bit, roughly 7 digits of precision) and `double` (64-bit, roughly 15 digits). Here is the simple rule: always use `double` unless you have a very specific reason not to. The precision difference is enormous -- `float` can lose accuracy in just a few arithmetic operations, while `double` gives you plenty of headroom for almost all scientific and engineering calculations. Remember that decimal literals like `3.14` are `double` by default; you must append `f` to create a `float` literal (`3.14f`). Java also provides some fascinating special values: `Double.POSITIVE_INFINITY` (what you get from `1.0 / 0`), `Double.NEGATIVE_INFINITY`, and the mysterious `NaN` (Not a Number, the result of `0.0 / 0`). NaN is unique in all of mathematics -- it is the only value that is not equal to itself!',
            code: `public class FloatingPoint {
    public static void main(String[] args) {
        float f = 3.14f;          // must append f
        double d = 3.14159265358979;

        System.out.println("float:  " + f);
        System.out.println("double: " + d);

        // Scientific notation
        double avogadro = 6.022e23;
        double planck = 6.626e-34;
        System.out.println("Avogadro: " + avogadro);
        System.out.println("Planck:   " + planck);

        // Special values
        System.out.println("Infinity:  " + Double.POSITIVE_INFINITY);
        System.out.println("-Infinity: " + Double.NEGATIVE_INFINITY);
        System.out.println("NaN:       " + Double.NaN);
        System.out.println("1.0 / 0:   " + (1.0 / 0));
        System.out.println("0.0 / 0:   " + (0.0 / 0));

        // NaN comparisons
        System.out.println("NaN == NaN: " + (Double.NaN == Double.NaN)); // false!
        System.out.println("isNaN:      " + Double.isNaN(0.0 / 0));
    }
}`,
            output: `float:  3.14
double: 3.14159265358979
Avogadro: 6.022E23
Planck:   6.626E-34
Infinity:  Infinity
-Infinity: -Infinity
NaN:       NaN
1.0 / 0:   Infinity
0.0 / 0:   NaN
NaN == NaN: false
isNaN:      true`,
            warning: 'NaN is not equal to anything, including itself. Always use Double.isNaN() to check for NaN. Writing if (x == Double.NaN) will always be false.',
            codeHighlightLines: [3, 4, 22, 23],
          },
          {
            heading: 'Precision Pitfalls and BigDecimal',
            content:
              'Let\'s talk about a problem that has haunted every programmer since the dawn of computing: `0.1 + 0.2` does not equal `0.3` in floating-point arithmetic. This is not a Java bug -- it is a fundamental limitation of how computers represent fractions in binary. Just as 1/3 cannot be exactly represented in decimal (0.333...), values like 0.1 cannot be exactly represented in binary. For most applications, this tiny imprecision does not matter. But for financial calculations -- where being off by even a penny is unacceptable -- you need `BigDecimal`. The key insight with `BigDecimal` is that you must create it from a string: `new BigDecimal("0.1")`. If you pass a `double` to the constructor, you are locking in the imprecision before `BigDecimal` can help you. Think of it like photographing a blurry image at high resolution -- the blur is already there.',
            code: `import java.math.BigDecimal;
import java.math.RoundingMode;

public class PrecisionDemo {
    public static void main(String[] args) {
        // The classic precision problem
        System.out.println("0.1 + 0.2 = " + (0.1 + 0.2));
        System.out.println("0.1 + 0.2 == 0.3? " + (0.1 + 0.2 == 0.3));

        // Comparing doubles safely
        double a = 0.1 + 0.2;
        double b = 0.3;
        double epsilon = 1e-9;
        System.out.println("Close enough? " + (Math.abs(a - b) < epsilon));

        // BigDecimal for exact arithmetic
        BigDecimal price = new BigDecimal("19.99");
        BigDecimal tax = new BigDecimal("0.08");
        BigDecimal total = price.add(price.multiply(tax))
                                .setScale(2, RoundingMode.HALF_UP);
        System.out.println("Price: $" + price);
        System.out.println("Total with tax: $" + total);

        // BAD: creating from double loses precision
        BigDecimal bad = new BigDecimal(0.1);
        BigDecimal good = new BigDecimal("0.1");
        System.out.println("From double: " + bad);
        System.out.println("From string: " + good);
    }
}`,
            output: `0.1 + 0.2 = 0.30000000000000004
0.1 + 0.2 == 0.3? false
Close enough? true
Price: $19.99
Total with tax: $21.59
From double: 0.1000000000000000055511151231257827021181583404541015625
From string: 0.1`,
            warning: 'Never use new BigDecimal(0.1) -- it captures the imprecise double value. Always use new BigDecimal("0.1") with a string argument.',
            analogy: 'Think of it like a ruler that only has markings every 1/8 inch: you cannot precisely mark 1/10 inch, so you round to the nearest marking. Floating-point binary fractions have the same problem with decimal values like 0.1.',
            codeHighlightLines: [7, 8, 17, 18, 25, 26],
          },
          {
            heading: 'Math Functions for Doubles',
            content:
              'The `Math` class is your Swiss army knife for numerical computation. It provides a comprehensive set of static methods that cover rounding, exponentiation, trigonometry, logarithms, and more -- all working with `double` values. Three rounding methods deserve special attention because beginners often confuse them: `Math.round()` rounds to the nearest integer (standard rounding), `Math.ceil()` always rounds up (think "ceiling" -- it pushes up), and `Math.floor()` always rounds down (think "floor" -- it pushes down). For power and root calculations, `Math.pow(base, exponent)` handles any exponentiation, while `Math.sqrt()` and `Math.cbrt()` provide optimized square and cube roots. And if you need random numbers, `Math.random()` returns a `double` between 0.0 (inclusive) and 1.0 (exclusive) -- though for more control, the `Random` class or `ThreadLocalRandom` are better choices.',
            code: `public class MathFunctions {
    public static void main(String[] args) {
        // Rounding
        System.out.println("round(3.7):  " + Math.round(3.7));
        System.out.println("ceil(3.2):   " + Math.ceil(3.2));
        System.out.println("floor(3.9):  " + Math.floor(3.9));

        // Power and roots
        System.out.println("pow(2, 10):  " + Math.pow(2, 10));
        System.out.println("sqrt(144):   " + Math.sqrt(144));
        System.out.println("cbrt(27):    " + Math.cbrt(27));

        // Logarithms
        System.out.println("log(E):      " + Math.log(Math.E));
        System.out.println("log10(1000): " + Math.log10(1000));

        // Trigonometry
        System.out.println("sin(PI/2):   " + Math.sin(Math.PI / 2));
        System.out.println("cos(0):      " + Math.cos(0));

        // Random number between 0.0 (inclusive) and 1.0 (exclusive)
        System.out.println("random():    " + Math.random());

        // Constants
        System.out.println("PI: " + Math.PI);
        System.out.println("E:  " + Math.E);
    }
}`,
            output: `round(3.7):  4
ceil(3.2):   4.0
floor(3.9):  3.0
pow(2, 10):  1024.0
sqrt(144):   12.0
cbrt(27):    3.0
log(E):      1.0
log10(1000): 3.0
sin(PI/2):   1.0
cos(0):      1.0
random():    0.7231742029971469
PI: 3.141592653589793
E:  2.718281828459045`,
            tip: 'For generating random integers in a range, prefer ThreadLocalRandom.current().nextInt(min, max) over Math.random(). It is clearer, more efficient in multithreaded code, and avoids manual scaling math.',
          },
        ],
      },
      {
        id: 'characters',
        title: 'Characters',
        difficulty: 'beginner',
        tags: ['char', 'unicode', 'ASCII'],
        cheatSheetSummary: 'char is a 16-bit Unicode character enclosed in single quotes. Use Character class for utility methods.',
        sections: [
          {
            heading: 'Character Basics',
            content:
              'The `char` type in Java is a 16-bit unsigned integer that represents a single Unicode character. Character literals use single quotes (`\'A\'`), while strings use double quotes (`"A"`). Here is what makes `char` interesting: under the hood, it is just a number (ranging from 0 to 65535), so you can do arithmetic with characters. This opens up some elegant tricks. Want the next letter after `\'A\'`? Just add 1: `(char)(\'A\' + 1)` gives you `\'B\'`. Want to convert a digit character like `\'9\'` to its numeric value? Subtract `\'0\'`: `\'9\' - \'0\'` gives you `9`. These work because characters are arranged sequentially in Unicode (and ASCII before it). You can also specify characters using Unicode escape sequences like `\'\\u0041\'` for `\'A\'` -- this is essential when working with characters that are not on your keyboard.',
            code: `public class CharBasics {
    public static void main(String[] args) {
        char letter = 'A';
        char digit = '9';
        char unicode = '\\u0041';  // Unicode for 'A'
        char emoji = '\\u2764';    // Heart symbol

        System.out.println("letter: " + letter);
        System.out.println("digit: " + digit);
        System.out.println("unicode: " + unicode);
        System.out.println("emoji: " + emoji);

        // char is a number (0 to 65535)
        System.out.println("'A' as int: " + (int) letter);
        System.out.println("'9' as int: " + (int) digit);

        // Character arithmetic
        char next = (char) (letter + 1);
        System.out.println("Next after A: " + next);

        // Iterate through alphabet
        for (char c = 'a'; c <= 'f'; c++) {
            System.out.print(c + " ");
        }
        System.out.println();

        // Convert digit char to int value
        int digitValue = digit - '0';
        System.out.println("'9' value: " + digitValue);
    }
}`,
            output: `letter: A
digit: 9
unicode: A
emoji: ❤
'A' as int: 65
'9' as int: 57
Next after A: B
a b c d e f
'9' value: 9`,
            note: 'Java\'s `char` is 16 bits, which covers the Basic Multilingual Plane (BMP) of Unicode. Characters outside the BMP (like many emoji) require a surrogate pair -- two `char` values. The `String` and `Character` classes have methods to handle these supplementary characters correctly.',
            analogy: 'Think of it like a secret decoder ring: each character is just a number in disguise, and the Unicode table is the decoder key that maps numbers to symbols.',
            codeHighlightLines: [14, 15, 18, 28],
          },
          {
            heading: 'Character Utility Methods',
            content:
              'The `Character` wrapper class is packed with static utility methods that make text processing a breeze. Instead of memorizing ASCII ranges (is `\'A\'` code 65? is `\'z\'` code 122?), you can use readable methods like `Character.isLetter()`, `Character.isDigit()`, and `Character.isWhitespace()`. These methods are also Unicode-aware, so they work correctly with accented characters, Chinese characters, Arabic digits, and other scripts -- not just ASCII. For case conversion, `Character.toUpperCase()` and `Character.toLowerCase()` handle Unicode properly too. These methods are the building blocks for writing parsers, validators, and text processors. You will find yourself reaching for them whenever you process text character by character.',
            code: `public class CharMethods {
    public static void main(String[] args) {
        // Testing methods
        System.out.println("isLetter('A'): " + Character.isLetter('A'));
        System.out.println("isDigit('5'):  " + Character.isDigit('5'));
        System.out.println("isUpper('A'):  " + Character.isUpperCase('A'));
        System.out.println("isLower('a'):  " + Character.isLowerCase('a'));
        System.out.println("isSpace(' '):  " + Character.isWhitespace(' '));
        System.out.println("isAlphaNum:    " + Character.isLetterOrDigit('x'));

        // Conversion methods
        System.out.println("toUpper('a'):  " + Character.toUpperCase('a'));
        System.out.println("toLower('Z'):  " + Character.toLowerCase('Z'));

        // Practical: count character types in a string
        String text = "Hello World 123!";
        int letters = 0, digits = 0, spaces = 0, other = 0;
        for (char c : text.toCharArray()) {
            if (Character.isLetter(c)) letters++;
            else if (Character.isDigit(c)) digits++;
            else if (Character.isWhitespace(c)) spaces++;
            else other++;
        }
        System.out.printf("Letters: %d, Digits: %d, Spaces: %d, Other: %d%n",
                          letters, digits, spaces, other);
    }
}`,
            output: `isLetter('A'): true
isDigit('5'):  true
isUpper('A'):  true
isLower('a'):  true
isSpace(' '):  true
isAlphaNum:    true
toUpper('a'):  A
toLower('Z'):  z
Letters: 10, Digits: 3, Spaces: 2, Other: 1`,
            tip: 'To convert a digit character to its numeric value, subtract the char literal: int val = ch - \'0\'. This works because digit characters are contiguous in Unicode.',
          },
          {
            heading: 'Char vs String',
            content:
              'Beginners often confuse `char` and `String` because they can both represent a single character. But they are fundamentally different types. A `char` is a primitive that holds exactly one character and uses single quotes (`\'A\'`). A `String` is an object that holds a sequence of characters (even zero characters!) and uses double quotes (`"A"`). A `String` of length 1 is not the same type as a `char` -- you cannot assign one to the other without conversion. To go from `char` to `String`, use `String.valueOf(c)`. To go from `String` to `char`, use `s.charAt(0)`. The `toCharArray()` method is particularly useful when you need to process a string character by character, and `new String(chars)` converts back. Understanding this distinction is essential because many Java methods expect one type or the other specifically.',
            code: `public class CharVsString {
    public static void main(String[] args) {
        char c = 'A';           // single character (primitive)
        String s = "A";          // string with one character (object)

        // They are different types
        System.out.println("char: " + c);
        System.out.println("String: " + s);

        // Convert between them
        String fromChar = String.valueOf(c);
        char fromString = s.charAt(0);
        System.out.println("char -> String: " + fromChar);
        System.out.println("String -> char: " + fromString);

        // String to char array and back
        String word = "Hello";
        char[] chars = word.toCharArray();
        for (char ch : chars) {
            System.out.print(ch + " ");
        }
        System.out.println();

        String back = new String(chars);
        System.out.println("Back to string: " + back);
    }
}`,
            output: `char: A
String: A
char -> String: A
String -> char: A
H e l l o
Back to string: Hello`,
            warning: 'You cannot compare a char with a String using ==. Use Character.toString(c).equals(s) or compare c == s.charAt(0).',
          },
        ],
      },
      {
        id: 'booleans',
        title: 'Booleans',
        difficulty: 'beginner',
        tags: ['boolean', 'logic', 'conditions', 'short-circuit'],
        cheatSheetSummary: 'boolean holds true or false. Use && (short-circuit AND), || (short-circuit OR), ! (NOT). No implicit int-to-boolean conversion.',
        sections: [
          {
            heading: 'Boolean Basics',
            content:
              'Java\'s `boolean` type is refreshingly simple: it holds exactly two values, `true` and `false`. No ambiguity, no grey area. And here is something that makes Java safer than C/C++: there is absolutely no implicit conversion between integers and booleans. In C, you can write `if (1)` or `if (x)` where `x` is an `int`, and the compiler happily treats nonzero as true. Java says no. If you want to test whether `x` is nonzero, you must write `if (x != 0)` explicitly. This might feel verbose, but it eliminates an entire class of bugs. The classic C typo `if (x = 5)` (assignment instead of comparison) is a compile error in Java, not a silent bug. Comparison operators (`>`, `<`, `>=`, `<=`, `==`, `!=`) all produce `boolean` results, which flow naturally into `if` statements and loops.',
            code: `public class BooleanBasics {
    public static void main(String[] args) {
        boolean isActive = true;
        boolean isComplete = false;

        System.out.println("isActive: " + isActive);
        System.out.println("isComplete: " + isComplete);

        // Comparison operators produce booleans
        int x = 10;
        boolean isPositive = x > 0;
        boolean isEven = x % 2 == 0;
        System.out.println("isPositive: " + isPositive);
        System.out.println("isEven: " + isEven);

        // Boolean in conditions
        if (isActive && !isComplete) {
            System.out.println("Task is in progress");
        }

        // Cannot use int as boolean (unlike C/C++)
        // if (1) { }         // COMPILE ERROR
        // if (x) { }         // COMPILE ERROR
        if (x != 0) {         // Must be explicit
            System.out.println("x is non-zero");
        }
    }
}`,
            output: `isActive: true
isComplete: false
isPositive: true
isEven: true
Task is in progress
x is non-zero`,
            tip: 'Name your boolean variables as questions that read naturally in `if` statements: `isValid`, `hasPermission`, `canProceed`. This makes your code read like English: `if (hasPermission && isValid)`.',
          },
          {
            heading: 'Logical Operators and Short-Circuit Evaluation',
            content:
              'Java provides three logical operators: AND (`&&`), OR (`||`), and NOT (`!`). But the real magic is in short-circuit evaluation, which is both a performance optimization and a safety feature. When you write `a && b`, Java only evaluates `b` if `a` is true -- because if `a` is false, the result must be false regardless of `b`. Similarly, `a || b` only evaluates `b` if `a` is false. This is not just an optimization -- it is a pattern you will use daily for null safety: `if (name != null && !name.isEmpty())` is safe because if `name` is null, the second part is never evaluated, avoiding a `NullPointerException`. Java also has non-short-circuit versions (`&` and `|`) that always evaluate both sides, but these are primarily used for bitwise operations on integers, not boolean logic.',
            code: `public class LogicalOps {
    public static void main(String[] args) {
        boolean a = true, b = false;

        System.out.println("a && b: " + (a && b));   // false
        System.out.println("a || b: " + (a || b));   // true
        System.out.println("!a: " + (!a));            // false

        // Short-circuit demonstration
        String name = null;

        // Safe: && short-circuits, so .isEmpty() is never called on null
        if (name != null && !name.isEmpty()) {
            System.out.println("Name: " + name);
        } else {
            System.out.println("Name is null or empty");
        }

        // DANGEROUS: & does NOT short-circuit
        // if (name != null & !name.isEmpty()) { } // NullPointerException!

        // Practical: range checking
        int age = 25;
        boolean isAdult = age >= 18 && age < 65;
        System.out.println("Working age: " + isAdult);
    }
}`,
            output: `a && b: false
a || b: true
!a: false
Name is null or empty
Working age: true`,
            tip: 'Always use && and || (short-circuit) for boolean logic. Reserve & and | for bitwise operations on integers.',
            analogy: 'Think of it like a security checkpoint with two guards: the AND (&&) guard at the first gate turns you away immediately if you fail the first check, without bothering the second guard. This saves time and prevents errors.',
            codeHighlightLines: [13, 20, 24],
          },
          {
            heading: 'Boolean Parsing and Wrapper',
            content:
              'The `Boolean` wrapper class bridges the gap between the primitive `boolean` and the object world. When you need to parse a `boolean` from a string (common when reading configuration files, environment variables, or user input), `Boolean.parseBoolean()` is your go-to method. But beware of a subtle trap: it returns `true` only for the exact string `"true"` (case-insensitive). Every other string -- including `"yes"`, `"1"`, `"on"`, and even `"TRUE!"` -- returns `false`. This catches many developers off guard who expect more lenient parsing. The ternary operator (`condition ? valueIfTrue : valueIfFalse`) is a compact alternative to `if-else` for simple boolean-based assignments and is idiomatic in Java code.',
            code: `public class BooleanWrapper {
    public static void main(String[] args) {
        // Parsing strings to boolean
        boolean t = Boolean.parseBoolean("true");
        boolean f = Boolean.parseBoolean("false");
        boolean x = Boolean.parseBoolean("yes");     // false!
        boolean y = Boolean.parseBoolean("TRUE");     // true (case-insensitive)

        System.out.println("true:  " + t);
        System.out.println("false: " + f);
        System.out.println("yes:   " + x);
        System.out.println("TRUE:  " + y);

        // Boolean.valueOf returns Boolean objects
        Boolean b1 = Boolean.valueOf(true);
        Boolean b2 = Boolean.valueOf("true");
        System.out.println("b1 == b2: " + (b1 == b2));     // true (cached)
        System.out.println("equals:   " + b1.equals(b2));  // true

        // Ternary operator with booleans
        boolean loggedIn = true;
        String status = loggedIn ? "Welcome back!" : "Please log in";
        System.out.println(status);
    }
}`,
            output: `true:  true
false: false
yes:   false
TRUE:  true
b1 == b2: true
equals:   true
Welcome back!`,
            warning: 'Boolean.parseBoolean("yes") returns false, not true. Only the exact string "true" (case-insensitive) returns true. If you need to accept "yes", "1", or "on", you must write your own parsing logic.',
          },
        ],
        quiz: [
          {
            question: 'What does Java NOT allow that C/C++ does allow with booleans?',
            options: [
              'Using boolean in if statements',
              'Implicit conversion between integers and booleans',
              'Comparing booleans with ==',
              'Using boolean as a return type',
            ],
            correctIndex: 1,
            explanation: 'Java has no implicit conversion between integers and booleans. In C/C++, if (1) and if (x) where x is an int are valid, but Java requires explicit boolean expressions like if (x != 0).',
          },
          {
            question: 'What is the result of Boolean.parseBoolean("yes")?',
            options: [
              'true',
              'false',
              'A NumberFormatException is thrown',
              'null',
            ],
            correctIndex: 1,
            explanation: 'Boolean.parseBoolean() returns true only for the exact string "true" (case-insensitive). Any other string, including "yes", "1", "on", or "TRUE!", returns false.',
          },
          {
            question: 'Why is short-circuit evaluation (&&) important for null safety?',
            options: [
              'It automatically converts null to false',
              'It skips the second operand if the first is false, preventing NullPointerException',
              'It throws a more descriptive error message',
              'It replaces null values with default values',
            ],
            correctIndex: 1,
            explanation: 'In name != null && !name.isEmpty(), if name is null, the && operator short-circuits and never evaluates !name.isEmpty(), preventing a NullPointerException. The non-short-circuit & operator would evaluate both sides and crash.',
          },
        ],
        challenge: {
          prompt: 'Write a method called evaluateAccess that takes a user age (int), membership status (boolean), and account balance (double). Return true if the user is 18+, is a member, and has a balance over 0. Use short-circuit evaluation and proper boolean logic. Also handle edge cases where age might be negative.',
          starterCode: `public class AccessChecker {
    public static boolean evaluateAccess(int age, boolean isMember, double balance) {
        // TODO: Return true if:
        // - age is 18 or older (and not negative)
        // - isMember is true
        // - balance is greater than 0
        // Use short-circuit && for efficiency
        return false;
    }

    public static void main(String[] args) {
        System.out.println(evaluateAccess(25, true, 100.0));   // true
        System.out.println(evaluateAccess(17, true, 100.0));   // false (underage)
        System.out.println(evaluateAccess(25, false, 100.0));  // false (not member)
        System.out.println(evaluateAccess(25, true, 0.0));     // false (no balance)
        System.out.println(evaluateAccess(-1, true, 100.0));   // false (invalid age)
    }
}`,
          solutionCode: `public class AccessChecker {
    public static boolean evaluateAccess(int age, boolean isMember, double balance) {
        return age >= 18 && isMember && balance > 0;
    }

    public static void main(String[] args) {
        System.out.println(evaluateAccess(25, true, 100.0));   // true
        System.out.println(evaluateAccess(17, true, 100.0));   // false
        System.out.println(evaluateAccess(25, false, 100.0));  // false
        System.out.println(evaluateAccess(25, true, 0.0));     // false
        System.out.println(evaluateAccess(-1, true, 100.0));   // false
    }
}`,
          hints: [
            'Chain the conditions with && so that evaluation stops as soon as one condition is false.',
            'age >= 18 naturally handles negative ages since negative values are less than 18.',
            'For the balance check, use balance > 0 (strictly greater than, not >=).',
          ],
        },
      },
      {
        id: 'strings',
        title: 'Strings',
        difficulty: 'beginner',
        tags: ['String', 'immutable', 'concatenation', 'StringBuilder'],
        cheatSheetSummary: 'Strings are immutable objects. Use .equals() for comparison, not ==. Use StringBuilder for efficient concatenation in loops.',
        sections: [
          {
            heading: 'String Creation and Immutability',
            content:
              'Strings in Java are immutable objects -- once created, their content can never be changed. This is a deliberate design decision with profound consequences. Every method that "modifies" a string (like `toUpperCase()` or `replace()`) actually creates and returns a brand new string, leaving the original untouched. Why immutability? It makes strings inherently thread-safe (multiple threads can share them without synchronization), enables the string pool (a memory optimization where identical string literals share the same object), and allows strings to be used safely as keys in `HashMap`. But immutability also creates the single most common Java bug for beginners: using `==` instead of `.equals()` to compare strings. The `==` operator compares memory addresses (are these the same object?), while `.equals()` compares content (do these contain the same characters?). Literal strings may share an address via the string pool, making `==` appear to work -- until it suddenly does not with dynamically created strings.',
            code: `public class StringBasics {
    public static void main(String[] args) {
        // String creation
        String s1 = "Hello";              // string literal (pool)
        String s2 = "Hello";              // same reference from pool
        String s3 = new String("Hello");  // new object on heap

        System.out.println("s1 == s2: " + (s1 == s2));       // true (same pool ref)
        System.out.println("s1 == s3: " + (s1 == s3));       // false (different objects)
        System.out.println("s1.equals(s3): " + s1.equals(s3)); // true (same content)

        // Strings are immutable
        String original = "Hello";
        String modified = original.concat(" World");
        System.out.println("original: " + original);   // unchanged
        System.out.println("modified: " + modified);

        // Concatenation with +
        String name = "Alice";
        String greeting = "Hello, " + name + "!";
        System.out.println(greeting);

        // String length
        System.out.println("Length: " + greeting.length());
    }
}`,
            output: `s1 == s2: true
s1 == s3: false
s1.equals(s3): true
original: Hello
modified: Hello World
Hello, Alice!
Length: 13`,
            warning: 'ALWAYS use .equals() to compare string content. The == operator compares references, not content, and will give wrong results with dynamically created strings. This is the number one Java beginner mistake.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Stack',
                    type: 'stack',
                    values: [
                      { name: 's1', value: '→ 0xAA', highlight: true },
                      { name: 's2', value: '→ 0xAA', highlight: true },
                      { name: 's3', value: '→ 0xBB' },
                    ],
                  },
                  {
                    label: 'String Pool (Heap)',
                    type: 'heap',
                    values: [
                      { name: '0xAA', value: '"Hello"', highlight: true },
                    ],
                  },
                  {
                    label: 'Heap',
                    type: 'heap',
                    values: [
                      { name: '0xBB', value: '"Hello"' },
                    ],
                  },
                ],
              },
              caption: 'String pool: s1 and s2 share the same pooled object, while s3 is a separate heap object with identical content',
            },
            codeHighlightLines: [4, 5, 6, 8, 9, 10],
          },
          {
            heading: 'Common String Operations',
            content:
              'The `String` class is one of the richest in Java\'s standard library, packed with methods for every text manipulation you can imagine. Let\'s group them by purpose. For searching: `indexOf()` finds the position of a character or substring, `contains()` checks if a substring exists, and `startsWith()`/`endsWith()` check boundaries. For extracting: `charAt()` grabs a single character by index, and `substring()` slices out a portion. For transforming: `toUpperCase()`, `toLowerCase()`, and `replace()` create modified copies. For cleaning: `trim()` removes leading and trailing whitespace (ASCII spaces only), while `strip()` (added in Java 11) handles all Unicode whitespace. For testing: `isEmpty()` checks for zero length, and `isBlank()` (Java 11+) checks if the string contains only whitespace. Remember -- every single one of these returns a new string; the original is always unchanged.',
            code: `public class StringOps {
    public static void main(String[] args) {
        String text = "  Hello, World!  ";

        // Trimming whitespace
        System.out.println("trim: '" + text.trim() + "'");
        System.out.println("strip: '" + text.strip() + "'");  // Java 11+

        String s = "Hello, World!";

        // Searching
        System.out.println("indexOf('W'): " + s.indexOf('W'));
        System.out.println("contains(\\"World\\"): " + s.contains("World"));
        System.out.println("startsWith(\\"Hello\\"): " + s.startsWith("Hello"));
        System.out.println("endsWith(\\"!\\"): " + s.endsWith("!"));

        // Extracting
        System.out.println("charAt(0): " + s.charAt(0));
        System.out.println("substring(7): " + s.substring(7));
        System.out.println("substring(0,5): " + s.substring(0, 5));

        // Transforming
        System.out.println("upper: " + s.toUpperCase());
        System.out.println("lower: " + s.toLowerCase());
        System.out.println("replace: " + s.replace("World", "Java"));

        // Testing
        System.out.println("isEmpty: " + s.isEmpty());
        System.out.println("isBlank: " + "   ".isBlank());  // Java 11+
    }
}`,
            output: `trim: 'Hello, World!'
strip: 'Hello, World!'
indexOf('W'): 7
contains("World"): true
startsWith("Hello"): true
endsWith("!"): true
charAt(0): H
substring(7): World!
substring(0,5): Hello
upper: HELLO, WORLD!
lower: hello, world!
replace: Hello, Java!
isEmpty: false
isBlank: true`,
            tip: 'Prefer `strip()` over `trim()` in modern Java. While `trim()` only removes ASCII spaces (characters <= U+0020), `strip()` handles all Unicode whitespace characters including non-breaking spaces.',
          },
          {
            heading: 'StringBuilder for Efficient Concatenation',
            content:
              'Here is a performance trap that catches every Java beginner: concatenating strings with `+` inside a loop creates a new `String` object on every iteration. Since strings are immutable, each concatenation copies all the previous characters, resulting in O(n^2) time complexity. For 10 iterations nobody notices, but for 10,000 iterations your program grinds to a halt. The solution is `StringBuilder` -- a mutable character buffer that provides O(1) amortized appends. Think of `String` concatenation in a loop like rewriting an entire letter every time you want to add a sentence, while `StringBuilder` is like having an expanding notebook where you just keep writing on the next page. When you are done building, call `toString()` to get the final immutable `String`. Use `StringBuilder` whenever you are building strings in loops, combining many fragments, or doing multiple modifications.',
            code: `public class StringBuilderDemo {
    public static void main(String[] args) {
        // BAD: O(n^2) - creates n string objects
        // String result = "";
        // for (int i = 0; i < 1000; i++) result += i;

        // GOOD: O(n) - uses a resizable buffer
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 5; i++) {
            sb.append("Item ").append(i);
            if (i < 5) sb.append(", ");
        }
        String result = sb.toString();
        System.out.println(result);

        // StringBuilder methods
        StringBuilder builder = new StringBuilder("Hello");
        builder.append(" World");         // append at end
        builder.insert(5, ",");           // insert at index
        builder.replace(7, 12, "Java");   // replace range
        builder.delete(5, 6);             // delete range
        builder.reverse();                // reverse in place

        System.out.println(builder.toString());

        // Convert char array to string efficiently
        char[] chars = {'J', 'a', 'v', 'a'};
        String fromChars = new String(chars);
        System.out.println(fromChars);
    }
}`,
            output: `Item 1, Item 2, Item 3, Item 4, Item 5
avaJ olleH
Java`,
            tip: 'The compiler automatically converts simple concatenation like "a" + "b" + "c" to StringBuilder internally. But for loops, always use StringBuilder explicitly.',
            analogy: 'Think of it like building a wall: String concatenation is like tearing down the whole wall and rebuilding it with one more brick each time, while StringBuilder is like simply adding a new brick to the end.',
            codeHighlightLines: [8, 9, 10, 13],
          },
        ],
        quiz: [
          {
            question: 'Why does using == to compare two String objects sometimes return true and sometimes false?',
            options: [
              'Because == is unreliable in Java',
              'Because string literals are pooled (shared), but new String() creates separate objects',
              'Because Java randomly decides whether to pool strings',
              'Because == only works with strings shorter than 128 characters',
            ],
            correctIndex: 1,
            explanation: 'Java maintains a string pool where identical string literals share the same object. So "Hello" == "Hello" is true (same pooled reference). But new String("Hello") creates a separate object on the heap, so == returns false even though the content is identical.',
          },
          {
            question: 'What is the time complexity of concatenating strings with + inside a loop that runs n times?',
            options: [
              'O(n)',
              'O(n log n)',
              'O(n^2)',
              'O(1)',
            ],
            correctIndex: 2,
            explanation: 'Since strings are immutable, each concatenation creates a new string and copies all previous characters. After n iterations, you have copied approximately 1 + 2 + 3 + ... + n characters, which is O(n^2).',
          },
          {
            question: 'What is the difference between trim() and strip() in Java?',
            options: [
              'They are identical methods',
              'trim() removes ASCII whitespace only; strip() handles all Unicode whitespace',
              'strip() is faster but less accurate',
              'trim() is deprecated in favor of strip()',
            ],
            correctIndex: 1,
            explanation: 'trim() only removes characters with code points <= U+0020 (ASCII whitespace). strip() (added in Java 11) uses Character.isWhitespace() and handles all Unicode whitespace characters, including non-breaking spaces.',
          },
          {
            question: 'Which method should you use to check if a string contains only whitespace characters?',
            options: [
              'str.isEmpty()',
              'str.length() == 0',
              'str.isBlank()',
              'str.trim().equals("")',
            ],
            correctIndex: 2,
            explanation: 'isBlank() (Java 11+) returns true if the string is empty or contains only whitespace characters. isEmpty() only checks for zero length. While trim().equals("") would work, isBlank() is more readable and handles Unicode whitespace.',
          },
        ],
        challenge: {
          prompt: 'Write a method called reverseWords that takes a sentence string and returns a new string with the words in reverse order. Use StringBuilder for efficient string building. For example, "Hello World Java" becomes "Java World Hello".',
          starterCode: `public class WordReverser {
    public static String reverseWords(String sentence) {
        // TODO: Split the sentence into words, then use StringBuilder
        // to build the result with words in reverse order
        return "";
    }

    public static void main(String[] args) {
        System.out.println(reverseWords("Hello World Java"));
        // Expected: "Java World Hello"
        System.out.println(reverseWords("one"));
        // Expected: "one"
        System.out.println(reverseWords("the quick brown fox"));
        // Expected: "fox brown quick the"
    }
}`,
          solutionCode: `public class WordReverser {
    public static String reverseWords(String sentence) {
        String[] words = sentence.split(" ");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i > 0) {
                sb.append(" ");
            }
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        System.out.println(reverseWords("Hello World Java"));
        System.out.println(reverseWords("one"));
        System.out.println(reverseWords("the quick brown fox"));
    }
}`,
          hints: [
            'Use String.split(" ") to break the sentence into an array of words.',
            'Iterate the array in reverse order using a for loop starting from words.length - 1.',
            'Use StringBuilder to efficiently build the result, appending spaces between words but not after the last word.',
          ],
        },
      },
      {
        id: 'type-casting',
        title: 'Type Casting',
        difficulty: 'beginner',
        tags: ['casting', 'widening', 'narrowing', 'conversion'],
        cheatSheetSummary: 'Widening (int -> long) is automatic. Narrowing (long -> int) requires explicit cast: (int) longValue.',
        sections: [
          {
            heading: 'Widening and Narrowing Conversions',
            content:
              'Java\'s type system has a built-in safety net for numeric conversions. When you assign a smaller type to a larger type (like `int` to `long`), Java performs an automatic widening conversion because no data can be lost -- it is like pouring water from a small glass into a large pitcher. But when you go the other direction (like `double` to `int`), Java requires an explicit cast with parentheses because you might lose data -- the decimal part gets chopped off, not rounded. Think of it as Java saying "I need you to acknowledge that you might lose information here." The widening chain goes: `byte` -> `short` -> `int` -> `long` -> `float` -> `double`. One surprise in this chain: `long` to `float` is considered widening even though `float` has less precision than `long`. You can represent 64-bit `long` values in `float`, but you may lose precision on the least significant digits.',
            code: `public class TypeCasting {
    public static void main(String[] args) {
        // Widening (implicit) - no cast needed
        int intVal = 42;
        long longVal = intVal;        // int -> long
        float floatVal = longVal;     // long -> float
        double doubleVal = floatVal;  // float -> double

        System.out.println("int:    " + intVal);
        System.out.println("long:   " + longVal);
        System.out.println("float:  " + floatVal);
        System.out.println("double: " + doubleVal);

        // Narrowing (explicit) - cast required
        double pi = 3.14159;
        int truncated = (int) pi;     // loses decimal part
        System.out.println("\\n(int) 3.14159 = " + truncated);

        long big = 130;
        byte small = (byte) big;      // wraps around: 130 -> -126
        System.out.println("(byte) 130 = " + small);

        // Casting in expressions
        int a = 7, b = 2;
        System.out.println("7 / 2 = " + (a / b));           // 3 (int division)
        System.out.println("7.0 / 2 = " + ((double) a / b)); // 3.5
    }
}`,
            output: `int:    42
long:   42
float:  42.0
double: 42.0

(int) 3.14159 = 3
(byte) 130 = -126
7 / 2 = 3
7.0 / 2 = 3.5`,
            warning: 'Narrowing casts can silently produce wrong results. (byte) 130 wraps to -126, and (int) 3.99 truncates to 3, not 4. Use Math.round() if you need rounding behavior.',
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    byte -->|"auto"| short -->|"auto"| int -->|"auto"| long -->|"auto"| float -->|"auto"| double
    double -.->|"(int) cast"| int
    long -.->|"(byte) cast"| byte`,
              caption: 'Widening conversions (solid arrows) are automatic; narrowing conversions (dashed arrows) require explicit casts',
            },
            analogy: 'Think of it like pouring water between containers: pouring from a small cup into a large pitcher (widening) always works, but pouring from a pitcher into a cup (narrowing) might overflow and spill data.',
            codeHighlightLines: [5, 6, 7, 16, 20, 26],
          },
          {
            heading: 'String to Number Conversions',
            content:
              'Converting between strings and numbers is something you will do constantly -- reading user input, parsing configuration files, processing CSV data, or building API responses. Each primitive type has a corresponding parse method: `Integer.parseInt()`, `Long.parseLong()`, `Double.parseDouble()`, and `Boolean.parseBoolean()`. Going the other direction, `String.valueOf()` converts any primitive to a string (or you can concatenate with an empty string: `"" + 42`). The critical thing to remember is that parse methods throw `NumberFormatException` if the input is not valid. In production code, always wrap parsing in a try-catch block or validate the input first. A nice bonus: `Integer.parseInt()` accepts a second argument for the radix (base), so you can parse hexadecimal, binary, octal, or any base from 2 to 36.',
            code: `public class StringConversions {
    public static void main(String[] args) {
        // String to primitives
        int i = Integer.parseInt("42");
        long l = Long.parseLong("123456789012345");
        double d = Double.parseDouble("3.14");
        boolean b = Boolean.parseBoolean("true");

        System.out.println("int: " + i);
        System.out.println("long: " + l);
        System.out.println("double: " + d);
        System.out.println("boolean: " + b);

        // Primitives to String
        String fromInt = String.valueOf(42);
        String fromDouble = String.valueOf(3.14);
        String fromConcat = "" + 42;   // also works
        System.out.println("fromInt: " + fromInt);
        System.out.println("fromDouble: " + fromDouble);

        // Handle invalid input
        try {
            int bad = Integer.parseInt("abc");
        } catch (NumberFormatException e) {
            System.out.println("Parse error: " + e.getMessage());
        }

        // Different radix (base)
        int hex = Integer.parseInt("FF", 16);
        int bin = Integer.parseInt("1010", 2);
        System.out.println("0xFF = " + hex);
        System.out.println("0b1010 = " + bin);
    }
}`,
            output: `int: 42
long: 123456789012345
double: 3.14
boolean: true
fromInt: 42
fromDouble: 3.14
Parse error: For input string: "abc"
0xFF = 255
0b1010 = 10`,
            tip: 'In modern Java, consider using Optional for parsing: write a utility method that returns `Optional<Integer>` instead of throwing exceptions. This makes error handling more explicit and functional.',
          },
          {
            heading: 'Object Casting and instanceof',
            content:
              'Beyond primitive conversions, Java also supports casting between object types in an inheritance hierarchy. Upcasting (child to parent type) is always safe and happens implicitly -- every `String` is an `Object`, so `Object obj = "Hello"` needs no cast. Downcasting (parent to child type) is the opposite: it requires an explicit cast and can fail at runtime with a `ClassCastException` if the object is not actually an instance of the target type. The golden rule: always check with `instanceof` before downcasting. Java 16 introduced pattern matching for `instanceof`, which combines the type check and the cast into a single elegant expression: `if (value instanceof Integer intVal)` both checks the type and creates a typed variable. This eliminates the clunky cast-after-check pattern and makes your code cleaner and less error-prone.',
            code: `public class ObjectCasting {
    public static void main(String[] args) {
        // Upcasting: implicit (always safe)
        Object obj = "Hello";    // String -> Object
        Number num = 42;         // Integer -> Number

        // Downcasting: explicit (may fail)
        if (obj instanceof String) {
            String str = (String) obj;
            System.out.println("String: " + str.toUpperCase());
        }

        // Pattern matching instanceof (Java 16+)
        Object value = 42;
        if (value instanceof Integer intVal) {
            System.out.println("Integer value: " + (intVal * 2));
        }

        // ClassCastException example
        Object notAString = 42;
        try {
            String bad = (String) notAString;  // throws!
        } catch (ClassCastException e) {
            System.out.println("Cast failed: " + e.getMessage());
        }

        // Checking types
        System.out.println("obj is String: " + (obj instanceof String));
        System.out.println("num is Integer: " + (num instanceof Integer));
        System.out.println("null is String: " + (null instanceof String));
    }
}`,
            output: `String: HELLO
Integer value: 84
Cast failed: class java.lang.Integer cannot be cast to class java.lang.String
obj is String: true
num is Integer: true
null is String: false`,
            note: 'Pattern matching instanceof (if (obj instanceof String s)) was introduced in Java 16 and eliminates the need for a separate cast. It also plays beautifully with switch pattern matching in Java 21.',
            diagram: {
              kind: 'mermaid',
              code: `classDiagram
    Object <|-- Number
    Object <|-- String
    Number <|-- Integer
    Number <|-- Double
    Number <|-- Long
    class Object {
        +toString()
        +equals()
        +hashCode()
    }
    class Number {
        +intValue()
        +doubleValue()
    }`,
              caption: 'Object hierarchy: upcasting goes up toward Object (safe); downcasting goes down toward specific types (requires instanceof check)',
            },
            codeHighlightLines: [8, 9, 15, 22],
          },
        ],
        quiz: [
          {
            question: 'What is the result of casting (int) 3.99 in Java?',
            options: [
              '4 (rounds up)',
              '3 (truncates toward zero)',
              '3.0 (keeps the double type)',
              'A compile-time error',
            ],
            correctIndex: 1,
            explanation: 'Narrowing casts from double to int truncate the decimal part entirely without rounding. To round, use Math.round() instead.',
          },
          {
            question: 'Which conversion is a widening conversion that happens automatically?',
            options: [
              'double to int',
              'long to byte',
              'int to long',
              'float to int',
            ],
            correctIndex: 2,
            explanation: 'Widening conversions go from a smaller type to a larger type (byte -> short -> int -> long -> float -> double) and are performed automatically because no data is lost.',
          },
          {
            question: 'What does the pattern matching instanceof expression "if (obj instanceof String s)" do in Java 16+?',
            options: [
              'It checks the type and throws an exception if it does not match',
              'It checks the type and creates a typed variable in one step',
              'It converts obj to a String regardless of its actual type',
              'It checks if obj is null',
            ],
            correctIndex: 1,
            explanation: 'Pattern matching instanceof combines the type check and the cast into a single expression. If obj is a String, the variable s is created and can be used directly without a separate cast.',
          },
          {
            question: 'What happens when you cast (byte) 130?',
            options: [
              'It stores 130 in the byte',
              'It throws an ArithmeticException',
              'It wraps around to -126',
              'It clamps the value to 127',
            ],
            correctIndex: 2,
            explanation: 'Byte has a range of -128 to 127. Casting 130 causes overflow wrapping: 130 - 256 = -126. Java does not throw errors on narrowing casts.',
          },
        ],
        challenge: {
          prompt: 'Write a method called safeCast that takes an Object parameter and returns a descriptive String of what it contains. Use pattern matching instanceof (Java 16+) to check for Integer, Double, String, and Boolean types, returning a message like "Integer: 42 (doubled: 84)". For unknown types, return "Unknown type: " followed by the class name.',
          starterCode: `public class SafeCaster {
    public static String safeCast(Object value) {
        // TODO: Use pattern matching instanceof to handle:
        // Integer -> "Integer: N (doubled: N*2)"
        // Double -> "Double: D (rounded: Math.round(D))"
        // String -> "String: S (length: S.length())"
        // Boolean -> "Boolean: B (negated: !B)"
        // Other -> "Unknown type: className"
        return "";
    }

    public static void main(String[] args) {
        System.out.println(safeCast(42));
        System.out.println(safeCast(3.14));
        System.out.println(safeCast("Hello"));
        System.out.println(safeCast(true));
        System.out.println(safeCast(new int[]{1, 2}));
    }
}`,
          solutionCode: `public class SafeCaster {
    public static String safeCast(Object value) {
        if (value instanceof Integer i) {
            return "Integer: " + i + " (doubled: " + (i * 2) + ")";
        } else if (value instanceof Double d) {
            return "Double: " + d + " (rounded: " + Math.round(d) + ")";
        } else if (value instanceof String s) {
            return "String: " + s + " (length: " + s.length() + ")";
        } else if (value instanceof Boolean b) {
            return "Boolean: " + b + " (negated: " + !b + ")";
        } else {
            return "Unknown type: " + value.getClass().getSimpleName();
        }
    }

    public static void main(String[] args) {
        System.out.println(safeCast(42));
        System.out.println(safeCast(3.14));
        System.out.println(safeCast("Hello"));
        System.out.println(safeCast(true));
        System.out.println(safeCast(new int[]{1, 2}));
    }
}`,
          hints: [
            'Use the pattern matching form: if (value instanceof Integer i) which both checks the type and declares a typed variable.',
            'For the unknown case, use value.getClass().getSimpleName() to get a readable class name.',
            'Each instanceof branch creates a scoped variable that can be used directly without casting.',
          ],
        },
      },
      {
        id: 'constants',
        title: 'Constants',
        difficulty: 'beginner',
        tags: ['final', 'constants', 'static-final', 'enum'],
        cheatSheetSummary: 'Use static final for constants: static final int MAX = 100; Use enums for a fixed set of named constants.',
        sections: [
          {
            heading: 'Final Variables and Static Constants',
            content:
              'The `final` keyword is Java\'s way of saying "this value will never change." For class-level constants, combine `static` (shared across all instances) with `final` (cannot be reassigned) and use `UPPER_SNAKE_CASE` by convention. This trio -- `static final` plus naming convention -- is how Java developers immediately recognize constants in code. But here is a subtlety that trips up intermediate developers: `final` prevents reassigning the variable, not mutating the object it points to. A `final int[]` cannot be reassigned to a different array, but you can absolutely change the elements inside that array. If you need truly immutable collections, use `List.of()` or `Collections.unmodifiableList()`. Java also supports "blank finals" -- `final` variables that are declared without a value and assigned exactly once later, which is useful for conditional initialization.',
            code: `public class Constants {
    // Class-level constants (shared across all instances)
    static final int MAX_SIZE = 100;
    static final double PI = 3.14159265358979;
    static final String APP_NAME = "MyApp";

    public static void main(String[] args) {
        System.out.println("Max size: " + MAX_SIZE);
        System.out.println("PI: " + PI);
        System.out.println("App: " + APP_NAME);

        // Local final variable
        final int localConst = 42;
        // localConst = 50;  // COMPILE ERROR: cannot reassign

        // final reference: the reference cannot change,
        // but the object contents can!
        final int[] arr = {1, 2, 3};
        arr[0] = 99;    // OK: modifying contents
        // arr = new int[5];  // COMPILE ERROR: reassigning reference
        System.out.println("arr[0] = " + arr[0]);

        // Blank final: assigned once later
        final String message;
        if (MAX_SIZE > 50) {
            message = "Large";
        } else {
            message = "Small";
        }
        System.out.println("Message: " + message);
    }
}`,
            output: `Max size: 100
PI: 3.14159265358979
App: MyApp
arr[0] = 99
Message: Large`,
            warning: 'A final reference to a mutable object (like an array or list) does NOT make the contents immutable. Only the reference itself is fixed. Use List.of() for truly immutable collections.',
            analogy: 'Think of it like a house address written in permanent marker: the final keyword means you cannot change which house the address points to, but you can still rearrange the furniture inside.',
          },
          {
            heading: 'Enums as Type-Safe Constants',
            content:
              'If you find yourself defining a group of related `static final int` constants (like `int SPRING = 0, SUMMER = 1, FALL = 2, WINTER = 3`), stop and use an enum instead. Enums are one of Java\'s best features. They provide type safety -- a method that accepts `Season` can only receive `SPRING`, `SUMMER`, `FALL`, or `WINTER`, never an accidental `-1` or `42`. But here is what makes Java enums truly powerful compared to other languages: they are full-fledged classes. Each enum constant can have its own fields, constructors, and methods. The `Planet` enum below stores physical properties and computes surface gravity. Enums also work beautifully with `switch` statements (and since Java 21, with switch expressions and pattern matching). They come with built-in methods like `values()` (returns all constants), `ordinal()` (returns the position), and `name()` (returns the string name).',
            code: `public class EnumDemo {
    enum Season {
        SPRING, SUMMER, FALL, WINTER
    }

    enum Planet {
        MERCURY(3.303e+23, 2.4397e6),
        VENUS(4.869e+24, 6.0518e6),
        EARTH(5.976e+24, 6.37814e6);

        private final double mass;
        private final double radius;

        Planet(double mass, double radius) {
            this.mass = mass;
            this.radius = radius;
        }

        double surfaceGravity() {
            final double G = 6.67300E-11;
            return G * mass / (radius * radius);
        }
    }

    public static void main(String[] args) {
        Season current = Season.SUMMER;
        System.out.println("Season: " + current);
        System.out.println("Ordinal: " + current.ordinal());

        // Switch with enum
        switch (current) {
            case SPRING -> System.out.println("Flowers bloom");
            case SUMMER -> System.out.println("Sun shines");
            case FALL   -> System.out.println("Leaves fall");
            case WINTER -> System.out.println("Snow falls");
        }

        // Enum with fields and methods
        for (Planet p : Planet.values()) {
            System.out.printf("%s: gravity = %.2f m/s^2%n",
                              p, p.surfaceGravity());
        }
    }
}`,
            output: `Season: SUMMER
Ordinal: 1
Sun shines
MERCURY: gravity = 3.70 m/s^2
VENUS: gravity = 8.87 m/s^2
EARTH: gravity = 9.80 m/s^2`,
            tip: 'Enums are preferred over int or String constants because they provide type safety. A method that takes Season can never accidentally receive an invalid value.',
            diagram: {
              kind: 'mermaid',
              code: `classDiagram
    class Season {
        <<enum>>
        SPRING
        SUMMER
        FALL
        WINTER
        +name() String
        +ordinal() int
        +values() Season[]
    }
    class Planet {
        <<enum>>
        MERCURY
        VENUS
        EARTH
        -double mass
        -double radius
        +surfaceGravity() double
    }`,
              caption: 'Java enums are full-fledged classes with fields, constructors, and methods',
            },
          },
          {
            heading: 'Compile-Time Constants and Inlining',
            content:
              'There is a subtle but important distinction between two kinds of `static final` variables in Java. A compile-time constant is a `static final` variable initialized with a literal or a constant expression (like `static final int VERSION = 3` or `static final String PREFIX = "APP_" + "V3"`). The Java compiler inlines these values directly into the bytecode at every usage site, replacing the variable reference with the literal value. This is great for performance but has a surprising consequence: if you change the constant in one class, every other class that uses it must be recompiled to pick up the new value. If you only recompile the defining class, the old inlined values persist in the other classes! A `static final` initialized with a method call (like `System.currentTimeMillis()`) is not a compile-time constant and does not get inlined -- it is read at runtime like a normal field.',
            code: `public class CompileTimeConst {
    // Compile-time constants (inlined by compiler)
    static final int VERSION = 3;
    static final String PREFIX = "APP_";
    static final String FULL_PREFIX = PREFIX + "V" + VERSION; // constant expression

    // NOT a compile-time constant (method call)
    static final long START_TIME = System.currentTimeMillis();

    public static void main(String[] args) {
        System.out.println("Version: " + VERSION);
        System.out.println("Prefix: " + FULL_PREFIX);
        System.out.println("Start: " + START_TIME);

        // Constants in switch cases (must be compile-time constants)
        int code = 3;
        switch (code) {
            case VERSION:   // OK: compile-time constant
                System.out.println("Current version");
                break;
            default:
                System.out.println("Other version");
        }
    }
}`,
            output: `Version: 3
Prefix: APP_V3
Start: 1700000000000
Current version`,
            note: 'Switch case labels require compile-time constants. Variables declared as static final with literal values qualify, but values computed at runtime (like System.currentTimeMillis()) do not.',
          },
        ],
        quiz: [
          {
            question: 'What does the final keyword prevent when applied to a reference variable like final int[] arr?',
            options: [
              'It prevents modifying the array elements',
              'It prevents reassigning the variable to a different array',
              'It prevents both modifying elements and reassigning',
              'It makes the array immutable and thread-safe',
            ],
            correctIndex: 1,
            explanation: 'The final keyword only prevents reassigning the variable itself. A final int[] arr can still have its elements modified (arr[0] = 99 is valid). Only the reference is fixed, not the contents.',
          },
          {
            question: 'Why are enums preferred over static final int constants for a fixed set of values?',
            options: [
              'Enums use less memory than integers',
              'Enums are faster to compare at runtime',
              'Enums provide type safety, preventing invalid values from being passed',
              'Enums are automatically serialized to JSON',
            ],
            correctIndex: 2,
            explanation: 'Enums provide type safety: a method that accepts a Season parameter can only receive SPRING, SUMMER, FALL, or WINTER. With int constants, any integer value could be passed, including invalid ones.',
          },
          {
            question: 'What is a compile-time constant in Java?',
            options: [
              'Any variable declared with the final keyword',
              'A static final variable initialized with a literal or constant expression',
              'A variable whose value is computed by the compiler',
              'Any variable that does not change during program execution',
            ],
            correctIndex: 1,
            explanation: 'A compile-time constant is a static final variable initialized with a literal value or a constant expression (composed of other compile-time constants). The compiler inlines these values at every usage site.',
          },
        ],
        challenge: {
          prompt: 'Create an enum called Priority with values LOW, MEDIUM, HIGH, and CRITICAL. Each should have an integer level (1-4) and a String color. Add a method getLabel() that returns a formatted string like "HIGH (Level 3 - Red)".',
          starterCode: `public class PrioritySystem {
    enum Priority {
        // TODO: Define enum constants with level (int) and color (String)
        // LOW(1, "Green"), MEDIUM(2, "Yellow"), HIGH(3, "Red"), CRITICAL(4, "Purple")
        ;

        // TODO: Add fields, constructor, and getLabel() method

        String getLabel() {
            return ""; // TODO: return "NAME (Level N - Color)"
        }
    }

    public static void main(String[] args) {
        for (Priority p : Priority.values()) {
            System.out.println(p.getLabel());
        }
        // Expected output:
        // LOW (Level 1 - Green)
        // MEDIUM (Level 2 - Yellow)
        // HIGH (Level 3 - Red)
        // CRITICAL (Level 4 - Purple)
    }
}`,
          solutionCode: `public class PrioritySystem {
    enum Priority {
        LOW(1, "Green"),
        MEDIUM(2, "Yellow"),
        HIGH(3, "Red"),
        CRITICAL(4, "Purple");

        private final int level;
        private final String color;

        Priority(int level, String color) {
            this.level = level;
            this.color = color;
        }

        String getLabel() {
            return name() + " (Level " + level + " - " + color + ")";
        }
    }

    public static void main(String[] args) {
        for (Priority p : Priority.values()) {
            System.out.println(p.getLabel());
        }
    }
}`,
          hints: [
            'Each enum constant is declared with constructor arguments: LOW(1, "Green").',
            'Add private final fields and a constructor that takes the parameters.',
            'Use the name() method inherited from Enum to get the constant name as a String.',
          ],
        },
      },
      {
        id: 'wrapper-classes',
        title: 'Wrapper Classes',
        difficulty: 'intermediate',
        tags: ['autoboxing', 'Integer', 'Double', 'wrapper', 'null'],
        cheatSheetSummary: 'Wrapper classes (Integer, Double, etc.) box primitives for use in collections. Autoboxing converts automatically.',
        sections: [
          {
            heading: 'Autoboxing and Unboxing',
            content:
              'Java has a split personality: it has both primitive types (`int`, `double`, `boolean`) for performance and wrapper classes (`Integer`, `Double`, `Boolean`) for the object-oriented world. This matters because Java generics and collections only work with objects -- you cannot create an `ArrayList<int>`, only an `ArrayList<Integer>`. To bridge this gap, Java performs automatic conversion called autoboxing (primitive to wrapper: `Integer boxed = 42`) and unboxing (wrapper to primitive: `int unboxed = boxed`). This happens seamlessly behind the scenes, making it feel like primitives and wrappers are interchangeable. However, this convenience has a cost: every autoboxing creates an object on the heap, which can add up in tight loops. The wrapper classes also provide invaluable utility methods -- `Integer.parseInt()`, `Integer.toHexString()`, `Integer.MAX_VALUE`, and many more -- that you will use constantly.',
            code: `import java.util.ArrayList;

public class Autoboxing {
    public static void main(String[] args) {
        // Autoboxing: int -> Integer
        Integer boxed = 42;           // autoboxing
        int unboxed = boxed;          // unboxing

        System.out.println("boxed: " + boxed);
        System.out.println("unboxed: " + unboxed);

        // Required for collections
        ArrayList<Integer> list = new ArrayList<>();
        list.add(10);   // autoboxing: int -> Integer
        list.add(20);
        list.add(30);

        int sum = 0;
        for (int val : list) {  // unboxing: Integer -> int
            sum += val;
        }
        System.out.println("Sum: " + sum);

        // Wrapper utility methods
        System.out.println("Max int: " + Integer.MAX_VALUE);
        System.out.println("Parse: " + Integer.parseInt("123"));
        System.out.println("Hex: " + Integer.toHexString(255));
        System.out.println("Binary: " + Integer.toBinaryString(42));
    }
}`,
            output: `boxed: 42
unboxed: 42
Sum: 60
Max int: 2147483647
Parse: 123
Hex: ff
Binary: 101010`,
            note: 'Project Valhalla, an ongoing effort in the Java community, aims to introduce value types that would eliminate the overhead of boxing for generic collections. When it arrives, you will be able to use something like `ArrayList<int>` directly.',
            analogy: 'Think of it like gift wrapping: autoboxing wraps a primitive value in an object "box" so it can be placed in a collection (which only accepts wrapped gifts), and unboxing tears the wrapping off to get the raw value back.',
            codeHighlightLines: [6, 7, 14, 19],
          },
          {
            heading: 'Integer Cache and Equality Pitfalls',
            content:
              'This section covers what is arguably the most insidious trap in all of Java. The JVM caches `Integer` objects for values in the range -128 to 127. When you autobox a value in this range, you get a cached object, so `==` (which compares references) appears to work correctly. But the moment your values exceed 127, each autoboxing creates a new object, and `==` returns `false` even when the values are identical. This inconsistency has caused countless production bugs because developers test with small numbers (which work), then the code breaks in production with larger values. The fix is simple and absolute: always use `.equals()` to compare wrapper objects. And watch out for null -- if you unbox a null `Integer` to an `int`, Java throws a `NullPointerException`. This commonly happens when fetching values from collections or database results that might be null.',
            code: `public class IntegerCache {
    public static void main(String[] args) {
        // Within cache range (-128 to 127): == works
        Integer a = 100;
        Integer b = 100;
        System.out.println("100 == 100: " + (a == b));       // true (cached)
        System.out.println("100 equals 100: " + a.equals(b)); // true

        // Outside cache range: == fails!
        Integer c = 200;
        Integer d = 200;
        System.out.println("200 == 200: " + (c == d));        // FALSE!
        System.out.println("200 equals 200: " + c.equals(d)); // true

        // Comparing wrapper with primitive: auto-unboxes safely
        Integer e = 200;
        int f = 200;
        System.out.println("Integer == int: " + (e == f)); // true (unboxes)

        // Null danger with unboxing
        Integer nullable = null;
        try {
            int value = nullable;  // NullPointerException!
        } catch (NullPointerException ex) {
            System.out.println("NPE when unboxing null!");
        }
    }
}`,
            output: `100 == 100: true
100 equals 100: true
200 == 200: false
200 equals 200: true
Integer == int: true
NPE when unboxing null!`,
            warning: 'Never use == to compare Integer objects. It works for small values (-128 to 127) due to caching but fails silently for larger values. Always use .equals(). This is one of the most common sources of production bugs in Java.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Stack',
                    type: 'stack',
                    values: [
                      { name: 'a (100)', value: '→ 0xC1', highlight: true },
                      { name: 'b (100)', value: '→ 0xC1', highlight: true },
                      { name: 'c (200)', value: '→ 0xD2' },
                      { name: 'd (200)', value: '→ 0xD3' },
                    ],
                  },
                  {
                    label: 'Integer Cache [-128..127]',
                    type: 'heap',
                    values: [
                      { name: '0xC1', value: 'Integer(100)', highlight: true },
                    ],
                  },
                  {
                    label: 'Heap (not cached)',
                    type: 'heap',
                    values: [
                      { name: '0xD2', value: 'Integer(200)' },
                      { name: '0xD3', value: 'Integer(200)' },
                    ],
                  },
                ],
              },
              caption: 'Integer cache: values -128 to 127 share cached objects (a == b is true), but larger values create separate objects (c == d is false)',
            },
            codeHighlightLines: [6, 12, 23],
          },
          {
            heading: 'Useful Wrapper Methods',
            content:
              'Each wrapper class comes loaded with static utility methods that handle common operations you would otherwise have to write yourself. `Integer.compare(a, b)` returns a negative number, zero, or positive number -- perfect for sorting. `Integer.max()` and `Integer.sum()` are method references you can pass to streams and functional interfaces. The `toHexString()`, `toBinaryString()`, and `toOctalString()` methods are invaluable for debugging, logging, or working with low-level protocols. For `Double`, the `isNaN()`, `isInfinite()`, and `isFinite()` methods handle the special floating-point values correctly (remember, you cannot use `==` to check for `NaN`). And `Character` provides the full suite of Unicode-aware classification methods. These utility methods are the kind of thing that saves you from reinventing the wheel and introducing subtle bugs in the process.',
            code: `public class WrapperMethods {
    public static void main(String[] args) {
        // Integer methods
        System.out.println("parseInt: " + Integer.parseInt("42"));
        System.out.println("valueOf: " + Integer.valueOf("42"));
        System.out.println("compare: " + Integer.compare(5, 10));  // -1
        System.out.println("max: " + Integer.max(5, 10));
        System.out.println("sum: " + Integer.sum(5, 10));
        System.out.println("toHex: " + Integer.toHexString(255));
        System.out.println("toBin: " + Integer.toBinaryString(10));
        System.out.println("toOct: " + Integer.toOctalString(8));

        // Double methods
        System.out.println("\\nisNaN: " + Double.isNaN(0.0 / 0));
        System.out.println("isInfinite: " + Double.isInfinite(1.0 / 0));
        System.out.println("isFinite: " + Double.isFinite(3.14));

        // Character methods
        System.out.println("\\nisDigit: " + Character.isDigit('5'));
        System.out.println("isLetter: " + Character.isLetter('A'));
        System.out.println("getNumericValue: " + Character.getNumericValue('9'));

        // Boolean
        System.out.println("\\nlogicalAnd: " + Boolean.logicalAnd(true, false));
        System.out.println("logicalOr: " + Boolean.logicalOr(true, false));
    }
}`,
            output: `parseInt: 42
valueOf: 42
compare: -1
max: 10
sum: 15
toHex: ff
toBin: 1010
toOct: 10

isNaN: true
isInfinite: true
isFinite: true

isDigit: true
isLetter: true
getNumericValue: 9

logicalAnd: false
logicalOr: true`,
            tip: 'Use Integer.compare(a, b) in comparators instead of a - b. The subtraction approach can overflow for extreme values like Integer.MAX_VALUE - (-1), producing a wrong negative result.',
          },
        ],
        quiz: [
          {
            question: 'What happens when you autobox an int value of 100 into an Integer and compare two such Integer objects with ==?',
            options: [
              'It always returns false because they are different objects',
              'It returns true because values -128 to 127 are cached',
              'It throws a NullPointerException',
              'It returns true only if both variables are declared final',
            ],
            correctIndex: 1,
            explanation: 'Java caches Integer objects for values in the range -128 to 127. When autoboxing values in this range, the same cached object is returned, so == (reference comparison) returns true.',
          },
          {
            question: 'What happens when you unbox a null Integer to an int?',
            options: [
              'The int receives the default value 0',
              'A compile-time error occurs',
              'A NullPointerException is thrown at runtime',
              'The int receives Integer.MIN_VALUE',
            ],
            correctIndex: 2,
            explanation: 'Unboxing a null wrapper object to a primitive throws a NullPointerException at runtime. The compiler cannot catch this because the null value is only known at runtime.',
          },
          {
            question: 'Why can you not create an ArrayList<int> in Java?',
            options: [
              'Because int is too small to be stored in a list',
              'Because Java generics only work with reference types, not primitives',
              'Because ArrayList only supports String types',
              'Because int does not implement the Comparable interface',
            ],
            correctIndex: 1,
            explanation: 'Java generics use type erasure and only work with reference types (objects). Primitive types like int must be wrapped in their corresponding wrapper class (Integer) to be used with collections.',
          },
        ],
        challenge: {
          prompt: 'Write a method that takes an ArrayList<Integer> and returns the count of elements that would return true when compared with == to a new Integer of the same value. This tests understanding of the Integer cache.',
          starterCode: `import java.util.ArrayList;
import java.util.List;

public class CacheChecker {
    public static int countCachedMatches(ArrayList<Integer> numbers) {
        // Count how many elements satisfy: (Integer.valueOf(element) == Integer.valueOf(element))
        // Hint: Integer.valueOf caches values from -128 to 127
        // TODO: implement
        return 0;
    }

    public static void main(String[] args) {
        ArrayList<Integer> nums = new ArrayList<>(List.of(1, 50, 127, 128, 200, -100, -128, -129));
        System.out.println("Cached matches: " + countCachedMatches(nums));
        // Expected: 5 (values 1, 50, 127, -100, -128 are in cache range)
    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.List;

public class CacheChecker {
    public static int countCachedMatches(ArrayList<Integer> numbers) {
        int count = 0;
        for (int num : numbers) {
            if (Integer.valueOf(num) == Integer.valueOf(num)) {
                count++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        ArrayList<Integer> nums = new ArrayList<>(List.of(1, 50, 127, 128, 200, -100, -128, -129));
        System.out.println("Cached matches: " + countCachedMatches(nums));
        // Output: Cached matches: 5
    }
}`,
          hints: [
            'Integer.valueOf() caches Integer objects for values between -128 and 127 inclusive.',
            'When two Integer.valueOf() calls return cached objects for the same value, == returns true because they are the same object.',
            'Values outside the cache range create new Integer objects each time, so == returns false even for equal values.',
          ],
        },
      },
    ],
  },
];

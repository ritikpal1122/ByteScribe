import type { DocCategory } from './types';

// Part 6: Functional Java + Modern Java + I/O & Concurrency
export const JAVA_PART6_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Functional Java                                              */
  /* ------------------------------------------------------------ */
  {
    id: 'java-functional',
    label: 'Functional Java',
    icon: 'Zap',
    entries: [
      {
        id: 'lambdas',
        title: 'Lambda Expressions',
        difficulty: 'intermediate',
        tags: ['lambda', 'functional', 'anonymous', 'closure'],
        cheatSheetSummary: '(params) -> expression or (params) -> { statements }. Implements a functional interface. Captures effectively final variables.',
        sections: [
          {
            heading: 'Lambda Syntax',
            content:
              'Lambda expressions provide a concise way to implement functional interfaces (interfaces with exactly one abstract method). The syntax is (parameters) -> expression for a single expression or (parameters) -> { statements } for a block. Type annotations are optional when the compiler can infer them.',
            analogy: 'Think of it like a sticky note with instructions: instead of writing a full class with a name, constructor, and method just to say "do this one thing," a lambda is a quick anonymous note you hand to someone -- (input) -> what to do with it.',
            codeHighlightLines: [7, 11, 15, 18, 19, 20, 26, 29, 32, 35],
            code: `import java.util.*;
import java.util.function.*;

public class LambdaDemo {
    public static void main(String[] args) {
        // No parameters
        Runnable hello = () -> System.out.println("Hello!");
        hello.run();

        // One parameter (parentheses optional)
        Consumer<String> greet = name -> System.out.println("Hi, " + name);
        greet.accept("Alice");

        // Two parameters
        Comparator<String> byLength = (a, b) -> a.length() - b.length();

        // Block body with return
        Function<String, String> capitalize = s -> {
            if (s == null || s.isEmpty()) return s;
            return s.substring(0, 1).toUpperCase() + s.substring(1);
        };
        System.out.println(capitalize.apply("hello"));

        // Using lambdas with collections
        List<String> names = new ArrayList<>(List.of("Charlie", "Alice", "Bob"));
        names.sort(byLength);
        System.out.println("Sorted by length: " + names);

        names.forEach(n -> System.out.print(n + " "));
        System.out.println();

        names.removeIf(n -> n.length() < 4);
        System.out.println("After removeIf: " + names);

        names.replaceAll(String::toUpperCase);
        System.out.println("After replaceAll: " + names);
    }
}`,
            output: `Hello!
Hi, Alice
Hello
Sorted by length: [Bob, Alice, Charlie]
Bob Alice Charlie
After removeIf: [Alice, Charlie]
After replaceAll: [ALICE, CHARLIE]`,
          },
          {
            heading: 'Effectively Final Variables',
            content:
              'Lambdas can capture (use) variables from their enclosing scope, but those variables must be effectively final -- meaning they are assigned exactly once and never changed after initialization. This restriction prevents concurrency issues and confusing mutation semantics.',
            analogy: 'Think of it like taking a photo of a whiteboard: the lambda captures a snapshot of the variable at that moment. If someone were allowed to keep erasing and rewriting the whiteboard, the photo would not match reality -- so Java insists the whiteboard never changes (effectively final).',
            codeHighlightLines: [8, 9, 18, 20, 21, 33, 34],
            code: `import java.util.List;
import java.util.ArrayList;
import java.util.function.Predicate;

public class LambdaCapture {
    public static void main(String[] args) {
        // Capture effectively final variable
        String prefix = "Hello";  // effectively final (never reassigned)
        Runnable r = () -> System.out.println(prefix + ", World!");
        r.run();

        // This would NOT compile:
        // String greeting = "Hi";
        // greeting = "Hey";  // now NOT effectively final
        // Runnable bad = () -> System.out.println(greeting);  // COMPILE ERROR

        // Workaround: use a mutable container
        int[] counter = {0};  // array is effectively final, contents are mutable
        List<String> names = List.of("Alice", "Bob", "Charlie");
        names.forEach(name -> {
            counter[0]++;
            System.out.println(counter[0] + ". " + name);
        });

        // Factory for predicates (closure pattern)
        Predicate<String> longerThan = createLengthFilter(4);
        List<String> filtered = names.stream()
            .filter(longerThan)
            .toList();
        System.out.println("Longer than 4: " + filtered);
    }

    static Predicate<String> createLengthFilter(int minLength) {
        // minLength is effectively final in this scope
        return s -> s.length() > minLength;
    }
}`,
            output: `Hello, World!
1. Alice
2. Bob
3. Charlie
Longer than 4: [Alice, Charlie]`,
            warning: 'Lambdas capture variables, not values. If you use a mutable object (like an array or list), changes inside the lambda are visible outside and vice versa.',
          },
          {
            heading: 'Common Lambda Patterns',
            content:
              'Lambdas are used extensively with the Collections framework, Stream API, and many design patterns. Common patterns include event handlers, callbacks, strategy pattern, and deferred execution.',
            analogy: 'Think of it like hiring temporary contractors: the Strategy pattern (filter with Predicate) lets you swap in different decision logic on the fly, the Template method (measureTime) provides the scaffold while you fill in the work, and Composition (andThen/compose) is like chaining contractors so one\'s output feeds directly into the next.',
            codeHighlightLines: [6, 7, 13, 14, 20, 21, 27, 30, 40, 41, 42, 43],
            diagram: {
              kind: 'mermaid',
              code: 'graph LR\n    subgraph "andThen: doubleIt.andThen(addTen)"\n        A1["5"] -->|"x * 2"| B1["10"] -->|"x + 10"| C1["20"]\n    end\n    subgraph "compose: doubleIt.compose(addTen)"\n        A2["5"] -->|"x + 10"| B2["15"] -->|"x * 2"| C2["30"]\n    end\n    style A1 fill:#42a5f5,color:#fff\n    style C1 fill:#66bb6a,color:#fff\n    style A2 fill:#42a5f5,color:#fff\n    style C2 fill:#66bb6a,color:#fff',
              caption: 'andThen applies this function first, then the argument. compose applies the argument first, then this function.',
            },
            code: `import java.util.*;
import java.util.function.*;

public class LambdaPatterns {
    // Strategy pattern with lambda
    static <T> List<T> filter(List<T> list, Predicate<T> condition) {
        List<T> result = new ArrayList<>();
        for (T item : list) {
            if (condition.test(item)) result.add(item);
        }
        return result;
    }

    // Template method with lambda
    static long measureTime(Runnable task) {
        long start = System.nanoTime();
        task.run();
        return (System.nanoTime() - start) / 1_000_000;
    }

    // Lazy evaluation with Supplier
    static <T> T getOrDefault(T value, Supplier<T> defaultSupplier) {
        return value != null ? value : defaultSupplier.get();
    }

    public static void main(String[] args) {
        // Strategy pattern
        List<Integer> nums = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        System.out.println("Evens: " + filter(nums, n -> n % 2 == 0));
        System.out.println("> 5: " + filter(nums, n -> n > 5));

        // Deferred execution
        long time = measureTime(() -> {
            int sum = 0;
            for (int i = 0; i < 1_000_000; i++) sum += i;
            System.out.println("Sum computed");
        });
        System.out.println("Time: " + time + "ms");

        // Lazy default
        String name = null;
        String result = getOrDefault(name, () -> {
            System.out.println("Computing default...");
            return "Anonymous";
        });
        System.out.println("Name: " + result);

        // Composition
        Function<Integer, Integer> doubleIt = x -> x * 2;
        Function<Integer, Integer> addTen = x -> x + 10;

        Function<Integer, Integer> doubleThenAdd = doubleIt.andThen(addTen);
        Function<Integer, Integer> addThenDouble = doubleIt.compose(addTen);

        System.out.println("doubleThenAdd(5): " + doubleThenAdd.apply(5));  // 5*2+10=20
        System.out.println("addThenDouble(5): " + addThenDouble.apply(5));  // (5+10)*2=30
    }
}`,
            output: `Evens: [2, 4, 6, 8, 10]
> 5: [6, 7, 8, 9, 10]
Sum computed
Time: 3ms
Computing default...
Name: Anonymous
doubleThenAdd(5): 20
addThenDouble(5): 30`,
          },
        ],
        quiz: [
          {
            question: 'What is the correct syntax for a lambda expression with no parameters in Java?',
            options: [
              '-> System.out.println("Hello")',
              '() -> System.out.println("Hello")',
              'lambda() { System.out.println("Hello"); }',
              '() => System.out.println("Hello")',
            ],
            correctIndex: 1,
            explanation: 'A lambda with no parameters uses empty parentheses: () -> expression. The arrow operator is -> (not =>), and the lambda keyword is not used in Java.',
          },
          {
            question: 'What does "effectively final" mean for a variable captured by a lambda?',
            options: [
              'The variable must be declared with the final keyword',
              'The variable is assigned exactly once and never modified after initialization',
              'The variable must be a primitive type',
              'The variable must be declared inside the lambda',
            ],
            correctIndex: 1,
            explanation: 'An effectively final variable is one that is assigned exactly once and never reassigned, even if the final keyword is not used. Lambdas can only capture effectively final variables from their enclosing scope.',
          },
          {
            question: 'Which functional interface does a lambda with the signature (String, String) -> int implement?',
            options: [
              'BiFunction<String, String, Integer>',
              'Comparator<String>',
              'Both A and B, depending on context',
              'BinaryOperator<String>',
            ],
            correctIndex: 2,
            explanation: 'A lambda with signature (String, String) -> int can implement both BiFunction<String, String, Integer> and Comparator<String>, depending on the target type expected by the compiler. Java uses target-type inference to determine the functional interface.',
          },
          {
            question: 'What is the result of doubleIt.andThen(addTen).apply(5) where doubleIt = x -> x * 2 and addTen = x -> x + 10?',
            options: [
              '15',
              '30',
              '20',
              '25',
            ],
            correctIndex: 2,
            explanation: 'andThen applies the first function and then the second. So doubleIt is applied first: 5 * 2 = 10, then addTen: 10 + 10 = 20.',
          },
        ],
        challenge: {
          prompt: 'Write a method called applyAll that takes a List<Function<Integer, Integer>> and an initial integer value, and applies each function in sequence to produce a final result. For example, given functions [x -> x + 1, x -> x * 2, x -> x - 3] and initial value 5, the result should be (5+1)*2-3 = 9.',
          starterCode: `import java.util.*;
import java.util.function.Function;

public class LambdaChallenge {
    static int applyAll(List<Function<Integer, Integer>> functions, int initial) {
        // TODO: Apply each function in sequence to the initial value
        return 0;
    }

    public static void main(String[] args) {
        List<Function<Integer, Integer>> fns = List.of(
            x -> x + 1,
            x -> x * 2,
            x -> x - 3
        );
        System.out.println(applyAll(fns, 5));  // Expected: 9
        System.out.println(applyAll(fns, 0));  // Expected: -1
    }
}`,
          solutionCode: `import java.util.*;
import java.util.function.Function;

public class LambdaChallenge {
    static int applyAll(List<Function<Integer, Integer>> functions, int initial) {
        int result = initial;
        for (Function<Integer, Integer> fn : functions) {
            result = fn.apply(result);
        }
        return result;
    }

    public static void main(String[] args) {
        List<Function<Integer, Integer>> fns = List.of(
            x -> x + 1,
            x -> x * 2,
            x -> x - 3
        );
        System.out.println(applyAll(fns, 5));  // Expected: 9
        System.out.println(applyAll(fns, 0));  // Expected: -1
    }
}`,
          hints: [
            'You need to iterate through the list of functions and apply each one to the running result.',
            'Start with the initial value, then for each function call fn.apply(result) and update the result.',
            'You can also solve this using Stream.reduce or Function.andThen to compose all functions into one.',
          ],
        },
      },
      {
        id: 'method-references',
        title: 'Method References',
        difficulty: 'intermediate',
        tags: ['method-reference', 'double-colon', 'shorthand'],
        cheatSheetSummary: 'ClassName::methodName is shorthand for lambda. Four types: static, instance, arbitrary object, constructor.',
        sections: [
          {
            heading: 'Types of Method References',
            content:
              'Method references (::) provide a shorthand for lambdas that call a single existing method. There are four types: static method (Math::abs), instance method on a particular object (System.out::println), instance method on an arbitrary object of a type (String::length), and constructor (ArrayList::new).',
            analogy: 'Think of it like speed-dialing a phone contact: instead of typing out the full number every time (lambda), you just press the shortcut button (method reference). Integer::parseInt is speed-dial for s -> Integer.parseInt(s).',
            codeHighlightLines: [9, 14, 19, 27, 28, 34, 40, 41, 46, 47],
            diagram: {
              kind: 'mermaid',
              code: `flowchart TB
    A["Static Method\nInteger::parseInt"] --> E["Lambda equiv:\ns -> Integer.parseInt(s)"]
    B["Instance (specific)\nSystem.out::println"] --> F["Lambda equiv:\ns -> System.out.println(s)"]
    C["Instance (any object)\nString::toUpperCase"] --> G["Lambda equiv:\ns -> s.toUpperCase()"]
    D["Constructor\nArrayList::new"] --> H["Lambda equiv:\n() -> new ArrayList<>()"]
    style A fill:#dbeafe
    style B fill:#dbeafe
    style C fill:#dbeafe
    style D fill:#dbeafe`,
              caption: 'The four types of method references and their lambda equivalents',
            },
            code: `import java.util.*;
import java.util.function.*;
import java.util.stream.Collectors;

public class MethodReferences {
    public static void main(String[] args) {
        List<String> names = List.of("alice", "bob", "charlie");

        // 1. Static method reference: ClassName::staticMethod
        // Lambda: s -> Integer.parseInt(s)
        Function<String, Integer> parser = Integer::parseInt;
        System.out.println("Parse: " + parser.apply("42"));

        // 2. Instance method on specific object: object::method
        // Lambda: s -> System.out.println(s)
        Consumer<String> printer = System.out::println;
        names.forEach(printer);

        // 3. Instance method on arbitrary object: Type::instanceMethod
        // Lambda: s -> s.toUpperCase()
        Function<String, String> upper = String::toUpperCase;
        List<String> uppered = names.stream().map(upper).collect(Collectors.toList());
        System.out.println("Upper: " + uppered);

        // Lambda: (a, b) -> a.compareTo(b)
        Comparator<String> comp = String::compareTo;

        // 4. Constructor reference: ClassName::new
        // Lambda: () -> new ArrayList<>()
        Supplier<List<String>> listFactory = ArrayList::new;
        List<String> newList = listFactory.get();
        newList.add("test");
        System.out.println("New list: " + newList);

        // Function constructor reference
        Function<String, StringBuilder> sbFactory = StringBuilder::new;
        StringBuilder sb = sbFactory.apply("Hello");
        System.out.println("StringBuilder: " + sb);

        // Practical examples
        List<String> nums = List.of("3", "1", "4", "1", "5");
        List<Integer> parsed = nums.stream()
            .map(Integer::parseInt)
            .collect(Collectors.toList());
        System.out.println("Parsed: " + parsed);

        // Sort by natural order
        List<Integer> sorted = new ArrayList<>(parsed);
        sorted.sort(Integer::compareTo);
        System.out.println("Sorted: " + sorted);
    }
}`,
            output: `Parse: 42
alice
bob
charlie
Upper: [ALICE, BOB, CHARLIE]
New list: [test]
StringBuilder: Hello
Parsed: [3, 1, 4, 1, 5]
Sorted: [1, 1, 3, 4, 5]`,
            tip: 'Use method references when the lambda simply calls a single method with the same arguments. They are more readable: list.forEach(System.out::println) vs list.forEach(s -> System.out.println(s)).',
          },
        ],
        quiz: [
          {
            question: 'Which method reference type does String::toUpperCase represent?',
            options: [
              'Static method reference',
              'Instance method on a specific object',
              'Instance method on an arbitrary object of a type',
              'Constructor reference',
            ],
            correctIndex: 2,
            explanation: 'String::toUpperCase is an instance method reference on an arbitrary String object. The lambda equivalent is s -> s.toUpperCase(). The method is called on whichever String object is passed as the argument.',
          },
          {
            question: 'What is the lambda equivalent of Integer::parseInt?',
            options: [
              'n -> n.parseInt()',
              's -> Integer.parseInt(s)',
              '() -> Integer.parseInt()',
              'Integer i -> i.parse()',
            ],
            correctIndex: 1,
            explanation: 'Integer::parseInt is a static method reference. The lambda equivalent is s -> Integer.parseInt(s), where s is the String argument passed to the static method.',
          },
          {
            question: 'Which method reference creates a new object?',
            options: [
              'Math::abs',
              'System.out::println',
              'String::length',
              'ArrayList::new',
            ],
            correctIndex: 3,
            explanation: 'ArrayList::new is a constructor reference. It is equivalent to the lambda () -> new ArrayList<>(). Constructor references use the ::new syntax and create a new instance each time they are invoked.',
          },
        ],
        challenge: {
          prompt: 'Refactor the following code to use method references instead of lambda expressions wherever possible. The program sorts a list of strings by length, converts them to uppercase, and prints each one.',
          starterCode: `import java.util.*;
import java.util.stream.Collectors;

public class MethodRefChallenge {
    public static void main(String[] args) {
        List<String> words = new ArrayList<>(List.of("banana", "apple", "cherry", "date"));

        // Refactor these lambdas to method references
        words.sort((a, b) -> a.compareToIgnoreCase(b));

        List<String> upper = words.stream()
            .map(s -> s.toUpperCase())
            .collect(Collectors.toList());

        upper.forEach(s -> System.out.println(s));
    }
}`,
          solutionCode: `import java.util.*;
import java.util.stream.Collectors;

public class MethodRefChallenge {
    public static void main(String[] args) {
        List<String> words = new ArrayList<>(List.of("banana", "apple", "cherry", "date"));

        // Refactored to method references
        words.sort(String::compareToIgnoreCase);

        List<String> upper = words.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());

        upper.forEach(System.out::println);
    }
}`,
          hints: [
            'For (a, b) -> a.compareToIgnoreCase(b), the method is called on the first argument with the second as parameter -- this is the "arbitrary object" type.',
            'For s -> s.toUpperCase(), the method is called on the stream element -- use Type::instanceMethod form.',
            'For s -> System.out.println(s), System.out is a specific object -- use object::method form.',
          ],
        },
      },
      {
        id: 'functional-interfaces',
        title: 'Functional Interfaces',
        difficulty: 'intermediate',
        tags: ['Predicate', 'Function', 'Consumer', 'Supplier', 'BiFunction'],
        cheatSheetSummary: 'Predicate<T>: T -> boolean. Function<T,R>: T -> R. Consumer<T>: T -> void. Supplier<T>: () -> T.',
        sections: [
          {
            heading: 'Core Functional Interfaces',
            content:
              'Java 8 provides a rich set of functional interfaces in java.util.function. The core four are Predicate (test condition), Function (transform value), Consumer (perform action), and Supplier (provide value). Each has specializations for primitives (IntPredicate, LongFunction, etc.) and bi-versions for two arguments (BiFunction, BiConsumer, etc.).',
            analogy: 'Think of it like four kitchen workers: Predicate is the taste-tester (yes/no verdict), Function is the chef (transforms ingredients into a dish), Consumer is the server (takes the dish and does something with it, returns nothing), and Supplier is the pantry (provides ingredients on demand without needing any input).',
            codeHighlightLines: [9, 14, 19, 20, 21, 25, 29, 34, 38, 41, 43],
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    A["Predicate&lt;T&gt;\nT -> boolean"] --> E["test()"]
    B["Function&lt;T,R&gt;\nT -> R"] --> F["apply()"]
    C["Consumer&lt;T&gt;\nT -> void"] --> G["accept()"]
    D["Supplier&lt;T&gt;\n() -> T"] --> H["get()"]
    style A fill:#fef3c7
    style B fill:#dbeafe
    style C fill:#dcfce7
    style D fill:#fce7f3`,
              caption: 'The four core functional interfaces: each has one abstract method with a distinct signature',
            },
            code: `import java.util.function.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

public class FunctionalInterfacesDemo {
    public static void main(String[] args) {
        // Predicate: T -> boolean (test a condition)
        Predicate<String> isLong = s -> s.length() > 5;
        System.out.println("isLong(\"Hello\"): " + isLong.test("Hello"));
        System.out.println("isLong(\"Hi\"): " + isLong.test("Hi"));

        // Compose predicates
        Predicate<String> startsWithA = s -> s.startsWith("A");
        Predicate<String> longAndA = isLong.and(startsWithA);
        System.out.println("longAndA(\"Alexander\"): " + longAndA.test("Alexander"));

        // Function: T -> R (transform)
        Function<String, Integer> toLength = String::length;
        Function<Integer, String> toStars = n -> "*".repeat(n);
        Function<String, String> lenToStars = toLength.andThen(toStars);
        System.out.println("lenToStars(\"Hello\"): " + lenToStars.apply("Hello"));

        // Consumer: T -> void (side effect)
        Consumer<String> logger = msg -> System.out.println("[LOG] " + msg);
        logger.accept("Application started");

        // Supplier: () -> T (factory)
        Supplier<Map<String, List<String>>> mapFactory = HashMap::new;
        Map<String, List<String>> map = mapFactory.get();
        System.out.println("New map: " + map);

        // BiFunction: (T, U) -> R
        BiFunction<String, Integer, String> repeat = (s, n) -> s.repeat(n);
        System.out.println(repeat.apply("Ha", 3));

        // UnaryOperator: T -> T (same type in and out)
        UnaryOperator<String> shout = s -> s.toUpperCase() + "!!!";
        System.out.println(shout.apply("hello"));

        // BinaryOperator: (T, T) -> T
        BinaryOperator<Integer> max = Integer::max;
        System.out.println("Max: " + max.apply(5, 8));
    }
}`,
            output: `isLong("Hello"): false
isLong("Hi"): false
longAndA("Alexander"): true
lenToStars("Hello"): *****
[LOG] Application started
New map: {}
HaHaHa
HELLO!!!
Max: 8`,
          },
        ],
        quiz: [
          {
            question: 'Which functional interface represents a function that takes one argument and returns a boolean?',
            options: [
              'Function<T, Boolean>',
              'Predicate<T>',
              'Consumer<T>',
              'Supplier<Boolean>',
            ],
            correctIndex: 1,
            explanation: 'Predicate<T> is specifically designed for boolean-valued functions. Its abstract method is test(T t) which returns a primitive boolean. While Function<T, Boolean> would also work, Predicate<T> is the idiomatic choice and avoids boxing.',
          },
          {
            question: 'What does a Supplier<T> functional interface do?',
            options: [
              'Takes a T and returns void',
              'Takes a T and returns a boolean',
              'Takes no arguments and returns a T',
              'Takes two arguments and returns a T',
            ],
            correctIndex: 2,
            explanation: 'Supplier<T> represents a function that takes no arguments and produces a result of type T. Its abstract method is get(). It is commonly used for lazy evaluation and factory patterns.',
          },
          {
            question: 'What is the difference between UnaryOperator<T> and Function<T, T>?',
            options: [
              'UnaryOperator takes two arguments',
              'UnaryOperator is a specialization of Function where input and output types are the same',
              'Function cannot return the same type as its input',
              'UnaryOperator does not have an apply method',
            ],
            correctIndex: 1,
            explanation: 'UnaryOperator<T> extends Function<T, T> and is simply a specialization where the input and output types are identical. It inherits the apply() method and all default methods from Function.',
          },
          {
            question: 'How do you combine two Predicate instances to test if BOTH conditions are true?',
            options: [
              'predicate1.or(predicate2)',
              'predicate1.and(predicate2)',
              'predicate1.compose(predicate2)',
              'predicate1.negate(predicate2)',
            ],
            correctIndex: 1,
            explanation: 'The and() default method on Predicate creates a new Predicate that returns true only when both predicates return true. or() returns true when either is true, and negate() inverts the result.',
          },
        ],
        challenge: {
          prompt: 'Create a generic pipeline method that takes a value of type T and a varargs of Function<T, T> operations, and applies them in order. Then use it to build a string transformation pipeline that trims, lowercases, and replaces spaces with hyphens.',
          starterCode: `import java.util.function.Function;

public class FunctionalChallenge {
    @SafeVarargs
    static <T> T pipeline(T value, Function<T, T>... steps) {
        // TODO: Apply each function in order to the value
        return value;
    }

    public static void main(String[] args) {
        String result = pipeline(
            "  Hello World  ",
            String::trim,
            String::toLowerCase,
            s -> s.replace(' ', '-')
        );
        System.out.println(result);  // Expected: hello-world
    }
}`,
          solutionCode: `import java.util.function.Function;

public class FunctionalChallenge {
    @SafeVarargs
    static <T> T pipeline(T value, Function<T, T>... steps) {
        T result = value;
        for (Function<T, T> step : steps) {
            result = step.apply(result);
        }
        return result;
    }

    public static void main(String[] args) {
        String result = pipeline(
            "  Hello World  ",
            String::trim,
            String::toLowerCase,
            s -> s.replace(' ', '-')
        );
        System.out.println(result);  // Expected: hello-world
    }
}`,
          hints: [
            'Iterate through the varargs array of functions and apply each one to the running result.',
            'You can also use a stream: Arrays.stream(steps).reduce(Function.identity(), Function::andThen).apply(value).',
          ],
        },
      },
      {
        id: 'optional',
        title: 'Optional',
        difficulty: 'intermediate',
        tags: ['Optional', 'null-safety', 'monad', 'functional'],
        cheatSheetSummary: 'Optional<T> wraps a value that may be absent. Use orElse(), map(), flatMap() instead of null checks.',
        signature: 'Optional<T>',
        sections: [
          {
            heading: 'Working with Optional',
            content:
              'Optional<T> is a container that may or may not hold a value. It was introduced in Java 8 to explicitly represent the absence of a value and reduce NullPointerExceptions. Use Optional.of() for non-null values, Optional.ofNullable() when the value might be null, and Optional.empty() for no value.',
            analogy: 'Think of it like a gift box that might be empty: instead of handing someone a null and watching them unwrap nothing (NullPointerException), you hand them an Optional box and let them check isPresent() first or use orElse() to provide a backup gift.',
            codeHighlightLines: [8, 9, 10, 15, 16, 19, 20, 23, 24, 25, 28, 33, 34, 35, 36, 37, 38, 42, 43, 44],
            code: `import java.util.Optional;
import java.util.List;

public class OptionalDemo {
    static Optional<String> findUser(String id) {
        if ("123".equals(id)) return Optional.of("Alice");
        return Optional.empty();
    }

    public static void main(String[] args) {
        // Creating Optional
        Optional<String> present = Optional.of("Hello");
        Optional<String> absent = Optional.empty();
        Optional<String> nullable = Optional.ofNullable(null);

        // Checking and getting
        System.out.println("present: " + present.isPresent());  // true
        System.out.println("absent: " + absent.isPresent());    // false
        System.out.println("absent isEmpty: " + absent.isEmpty());  // true (Java 11+)

        // Getting values safely
        System.out.println("get: " + present.get());
        System.out.println("orElse: " + absent.orElse("default"));
        System.out.println("orElseGet: " + absent.orElseGet(() -> "computed"));

        // ifPresent: run action only if value exists
        present.ifPresent(val -> System.out.println("Value: " + val));
        absent.ifPresent(val -> System.out.println("This won't print"));

        // ifPresentOrElse (Java 9+)
        findUser("123").ifPresentOrElse(
            name -> System.out.println("Found: " + name),
            () -> System.out.println("User not found")
        );
        findUser("999").ifPresentOrElse(
            name -> System.out.println("Found: " + name),
            () -> System.out.println("User not found")
        );

        // map: transform the value if present
        Optional<Integer> length = present.map(String::length);
        System.out.println("Length: " + length.orElse(0));

        // Chaining with flatMap
        Optional<String> result = findUser("123")
            .map(String::toUpperCase)
            .filter(name -> name.startsWith("A"));
        System.out.println("Chain result: " + result.orElse("none"));

        // orElseThrow
        try {
            absent.orElseThrow(() -> new RuntimeException("Value required!"));
        } catch (RuntimeException e) {
            System.out.println("Thrown: " + e.getMessage());
        }
    }
}`,
            output: `present: true
absent: false
absent isEmpty: true
get: Hello
orElse: default
orElseGet: computed
Value: Hello
Found: Alice
User not found
Length: 5
Chain result: ALICE
Thrown: Value required!`,
            warning: 'Never call .get() without checking .isPresent() first. Use orElse(), orElseGet(), or orElseThrow() instead. Optional.of(null) throws NullPointerException -- use ofNullable() for potentially null values.',
          },
        ],
        quiz: [
          {
            question: 'What happens when you call Optional.of(null)?',
            options: [
              'It creates an empty Optional',
              'It creates an Optional containing null',
              'It throws a NullPointerException',
              'It returns Optional.empty()',
            ],
            correctIndex: 2,
            explanation: 'Optional.of(null) throws a NullPointerException immediately. If the value might be null, use Optional.ofNullable(value) instead, which returns Optional.empty() for null values.',
          },
          {
            question: 'What is the difference between orElse() and orElseGet()?',
            options: [
              'orElse() takes a Supplier, orElseGet() takes a value',
              'orElse() always evaluates its argument, orElseGet() evaluates lazily only when the Optional is empty',
              'They are identical in behavior',
              'orElseGet() throws an exception if the Optional is empty',
            ],
            correctIndex: 1,
            explanation: 'orElse(defaultValue) always evaluates defaultValue even if the Optional has a value. orElseGet(supplier) only calls the supplier when the Optional is empty. Use orElseGet() when the default is expensive to compute.',
          },
          {
            question: 'What does Optional.map() return when called on an empty Optional?',
            options: [
              'null',
              'An Optional containing null',
              'An empty Optional',
              'It throws NoSuchElementException',
            ],
            correctIndex: 2,
            explanation: 'When map() is called on an empty Optional, it returns Optional.empty() without executing the mapping function. This allows safe chaining of transformations without null checks.',
          },
        ],
        challenge: {
          prompt: 'Write a method findAndFormatUser that takes a Map<Integer, String> of users and an integer id. It should return an Optional<String> with the user name uppercased and prefixed with "USER: ". If the id is not found, return Optional.empty(). Use Optional.ofNullable and map -- do NOT use if/else or null checks.',
          starterCode: `import java.util.*;

public class OptionalChallenge {
    static Optional<String> findAndFormatUser(Map<Integer, String> users, int id) {
        // TODO: Use Optional.ofNullable and map to find and format the user
        return Optional.empty();
    }

    public static void main(String[] args) {
        Map<Integer, String> users = Map.of(1, "alice", 2, "bob", 3, "charlie");

        System.out.println(findAndFormatUser(users, 1));  // Optional[USER: ALICE]
        System.out.println(findAndFormatUser(users, 2));  // Optional[USER: BOB]
        System.out.println(findAndFormatUser(users, 99)); // Optional.empty
    }
}`,
          solutionCode: `import java.util.*;

public class OptionalChallenge {
    static Optional<String> findAndFormatUser(Map<Integer, String> users, int id) {
        return Optional.ofNullable(users.get(id))
            .map(String::toUpperCase)
            .map(name -> "USER: " + name);
    }

    public static void main(String[] args) {
        Map<Integer, String> users = Map.of(1, "alice", 2, "bob", 3, "charlie");

        System.out.println(findAndFormatUser(users, 1));  // Optional[USER: ALICE]
        System.out.println(findAndFormatUser(users, 2));  // Optional[USER: BOB]
        System.out.println(findAndFormatUser(users, 99)); // Optional.empty
    }
}`,
          hints: [
            'Map.get() returns null when the key is not found -- wrap it with Optional.ofNullable().',
            'Chain .map() calls to transform the value: first to uppercase, then to add the prefix.',
            'If the Optional is empty, map() will skip the transformation and return Optional.empty() automatically.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Modern Java                                                  */
  /* ------------------------------------------------------------ */
  {
    id: 'java-modern',
    label: 'Modern Java',
    icon: 'Sparkles',
    entries: [
      {
        id: 'records',
        title: 'Records',
        difficulty: 'intermediate',
        tags: ['record', 'immutable', 'data-class', 'boilerplate'],
        cheatSheetSummary: 'record Point(int x, int y) {} — immutable data class with auto-generated constructor, getters, equals, hashCode, toString.',
        sections: [
          {
            heading: 'Defining Records',
            content:
              'Records (Java 16+) are a concise way to create immutable data-carrying classes. A record automatically generates a constructor, accessor methods (named after the components, not getX()), equals(), hashCode(), and toString(). Records are final and cannot extend other classes, but they can implement interfaces.',
            analogy: 'Think of it like an ID card: a record is a fixed set of fields (name, photo, DOB) stamped together. You cannot change the data once issued (immutable), and two ID cards with identical information are considered equal -- no manual equals() implementation needed.',
            codeHighlightLines: [5, 8, 9, 17, 18, 19, 27, 28, 38, 39, 48, 49, 50, 52, 53],
            code: `import java.util.List;

public class RecordDemo {
    // Simple record
    record Point(int x, int y) {}

    // Record with custom methods
    record Circle(Point center, double radius) {
        double area() {
            return Math.PI * radius * radius;
        }

        double circumference() {
            return 2 * Math.PI * radius;
        }
    }

    // Record with compact constructor (validation)
    record Temperature(double value, String unit) {
        Temperature {  // compact constructor
            if (!unit.equals("C") && !unit.equals("F") && !unit.equals("K")) {
                throw new IllegalArgumentException("Invalid unit: " + unit);
            }
            if (unit.equals("K") && value < 0) {
                throw new IllegalArgumentException("Kelvin cannot be negative");
            }
        }

        Temperature toCelsius() {
            return switch (unit) {
                case "C" -> this;
                case "F" -> new Temperature((value - 32) * 5.0 / 9.0, "C");
                case "K" -> new Temperature(value - 273.15, "C");
                default -> throw new IllegalStateException();
            };
        }
    }

    // Record implementing interface
    record NamedValue<T>(String name, T value) implements Comparable<NamedValue<T>> {
        @Override
        public int compareTo(NamedValue<T> other) {
            return this.name.compareTo(other.name);
        }
    }

    public static void main(String[] args) {
        Point p = new Point(3, 4);
        System.out.println("Point: " + p);           // auto toString
        System.out.println("x: " + p.x());           // accessor (not getX!)
        System.out.println("y: " + p.y());

        Point p2 = new Point(3, 4);
        System.out.println("equals: " + p.equals(p2));  // auto equals

        Circle c = new Circle(p, 5);
        System.out.printf("Circle area: %.2f%n", c.area());

        Temperature t = new Temperature(212, "F");
        System.out.println(t + " = " + t.toCelsius());

        // Records in collections
        var items = List.of(
            new NamedValue<>("beta", 2),
            new NamedValue<>("alpha", 1)
        );
        items.stream().sorted().forEach(System.out::println);
    }
}`,
            output: `Point: Point[x=3, y=4]
x: 3
y: 4
equals: true
Circle area: 78.54
Temperature[value=212.0, unit=F] = Temperature[value=100.0, unit=C]
NamedValue[name=alpha, value=1]
NamedValue[name=beta, value=2]`,
            note: 'Records were finalized in Java 16. They dramatically reduce boilerplate for data classes that would otherwise need 50+ lines of manual code.',
          },
        ],
        quiz: [
          {
            question: 'What does a Java record automatically generate?',
            options: [
              'Only a constructor and toString()',
              'Constructor, accessor methods, equals(), hashCode(), and toString()',
              'Only getters and setters',
              'Constructor, setters, equals(), and hashCode()',
            ],
            correctIndex: 1,
            explanation: 'A record automatically generates a canonical constructor, accessor methods (named after the components, not getX()), equals(), hashCode(), and toString(). Records are immutable so they do not have setters.',
          },
          {
            question: 'How are accessor methods named in a Java record Point(int x, int y)?',
            options: [
              'getX() and getY()',
              'x() and y()',
              'getx() and gety()',
              'X() and Y()',
            ],
            correctIndex: 1,
            explanation: 'Record accessor methods are named after the component, not following the JavaBean getX() convention. For record Point(int x, int y), the accessors are p.x() and p.y().',
          },
          {
            question: 'What is a compact constructor in a record?',
            options: [
              'A constructor with fewer parameters than the record has components',
              'A constructor that does not repeat the parameter list and is used for validation',
              'A private constructor that cannot be called externally',
              'A constructor that only initializes some fields',
            ],
            correctIndex: 1,
            explanation: 'A compact constructor omits the parameter list (which is implicitly the same as the record components) and is typically used for validation or normalization. The fields are automatically assigned after the compact constructor body executes.',
          },
        ],
        challenge: {
          prompt: 'Create a record called Money with two components: double amount and String currency. Add a compact constructor that validates the amount is non-negative and the currency is a 3-letter uppercase string. Add a method add(Money other) that returns a new Money with the amounts summed (throw IllegalArgumentException if currencies differ).',
          starterCode: `public class RecordChallenge {
    // TODO: Define the Money record here
    // - Components: double amount, String currency
    // - Compact constructor: validate amount >= 0 and currency is 3 uppercase letters
    // - Method: Money add(Money other) that sums amounts (must be same currency)

    public static void main(String[] args) {
        // Money m1 = new Money(10.50, "USD");
        // Money m2 = new Money(5.25, "USD");
        // System.out.println(m1);          // Money[amount=10.5, currency=USD]
        // System.out.println(m1.add(m2));   // Money[amount=15.75, currency=USD]
        // Money bad = new Money(-5, "USD"); // Should throw IllegalArgumentException
    }
}`,
          solutionCode: `public class RecordChallenge {
    record Money(double amount, String currency) {
        Money {
            if (amount < 0) {
                throw new IllegalArgumentException("Amount cannot be negative: " + amount);
            }
            if (currency == null || !currency.matches("[A-Z]{3}")) {
                throw new IllegalArgumentException("Currency must be 3 uppercase letters: " + currency);
            }
        }

        Money add(Money other) {
            if (!this.currency.equals(other.currency)) {
                throw new IllegalArgumentException(
                    "Cannot add different currencies: " + this.currency + " and " + other.currency);
            }
            return new Money(this.amount + other.amount, this.currency);
        }
    }

    public static void main(String[] args) {
        Money m1 = new Money(10.50, "USD");
        Money m2 = new Money(5.25, "USD");
        System.out.println(m1);
        System.out.println(m1.add(m2));

        try {
            Money bad = new Money(-5, "USD");
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          hints: [
            'Use a compact constructor (no parameter list) to add validation logic before the implicit field assignments.',
            'For currency validation, you can use currency.matches("[A-Z]{3}") to check for exactly 3 uppercase letters.',
            'The add method should return a new Money instance since records are immutable.',
          ],
        },
      },
      {
        id: 'sealed-classes',
        title: 'Sealed Classes',
        difficulty: 'advanced',
        tags: ['sealed', 'permits', 'exhaustive', 'hierarchy'],
        cheatSheetSummary: 'sealed class Shape permits Circle, Rectangle {} — restricts which classes can extend. Enables exhaustive pattern matching.',
        sections: [
          {
            heading: 'Restricting Class Hierarchies',
            content:
              'Sealed classes (Java 17+) restrict which classes can extend or implement them using the permits clause. Permitted subclasses must be final, sealed, or non-sealed. This enables the compiler to verify exhaustive pattern matching in switch expressions, similar to algebraic data types in functional languages.',
            analogy: 'Think of it like a VIP guest list at a party: sealed classes declare exactly who is allowed in (the permits clause). No uninvited subclass can crash the party, and the bouncer (compiler) can verify that every permitted guest has been accounted for in a switch.',
            codeHighlightLines: [3, 5, 9, 13, 18, 19, 20, 21, 27, 28, 29],
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    A["sealed interface Shape\npermits Circle, Rectangle, Triangle"] --> B["record Circle"]
    A --> C["record Rectangle"]
    A --> D["record Triangle"]
    A -. "X No other classes\ncan implement Shape" .-> E["❌ Pentagon"]
    style A fill:#e0f2fe
    style E fill:#fee2e2,stroke-dasharray: 5 5`,
              caption: 'Sealed types restrict their hierarchy: only the explicitly permitted subclasses can extend or implement the sealed type',
            },
            code: `public class SealedDemo {
    // Sealed class with permitted subclasses
    sealed interface Shape permits Circle, Rectangle, Triangle {}

    record Circle(double radius) implements Shape {
        double area() { return Math.PI * radius * radius; }
    }

    record Rectangle(double width, double height) implements Shape {
        double area() { return width * height; }
    }

    record Triangle(double base, double height) implements Shape {
        double area() { return 0.5 * base * height; }
    }

    // Exhaustive switch (compiler verifies all cases covered)
    static double getArea(Shape shape) {
        return switch (shape) {
            case Circle c    -> c.area();
            case Rectangle r -> r.area();
            case Triangle t  -> t.area();
            // No default needed: compiler knows all cases are covered
        };
    }

    static String describe(Shape shape) {
        return switch (shape) {
            case Circle c    -> "Circle with radius " + c.radius();
            case Rectangle r -> "Rectangle " + r.width() + "x" + r.height();
            case Triangle t  -> "Triangle base=" + t.base() + " h=" + t.height();
        };
    }

    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle(5),
            new Rectangle(4, 6),
            new Triangle(3, 8)
        };

        for (Shape s : shapes) {
            System.out.printf("%s -> area = %.2f%n", describe(s), getArea(s));
        }
    }
}`,
            output: `Circle with radius 5.0 -> area = 78.54
Rectangle 4.0x6.0 -> area = 24.00
Triangle base=3.0 h=8.0 -> area = 12.00`,
            note: 'Sealed classes were finalized in Java 17. They combine well with records and pattern matching for type-safe domain modeling.',
          },
        ],
      },
      {
        id: 'pattern-matching',
        title: 'Pattern Matching',
        difficulty: 'advanced',
        tags: ['pattern-matching', 'instanceof', 'switch', 'deconstruction'],
        cheatSheetSummary: 'if (obj instanceof String s) uses s directly. Switch patterns (Java 21) enable rich type-based branching.',
        sections: [
          {
            heading: 'Pattern Matching for instanceof and switch',
            content:
              'Pattern matching reduces boilerplate by combining type checking and casting into a single expression. Pattern matching for instanceof (Java 16) and pattern matching for switch (Java 21) together provide powerful, type-safe branching without explicit casts.',
            analogy: 'Think of it like a mail sorting machine: old-style Java checks "is this a letter?" then opens it to read; pattern matching does both at once -- "is this a letter? If so, here is its content already extracted and ready to use."',
            codeHighlightLines: [7, 8, 9, 10, 17, 18, 19, 20, 32, 33, 34, 35, 36, 37],
            code: `public class PatternMatching {
    sealed interface Result permits Success, Failure {}
    record Success(String data) implements Result {}
    record Failure(String error, int code) implements Result {}

    static String formatResult(Result result) {
        return switch (result) {
            case Success s -> "OK: " + s.data();
            case Failure f when f.code() == 404 -> "Not Found: " + f.error();
            case Failure f when f.code() >= 500 -> "Server Error: " + f.error();
            case Failure f -> "Error " + f.code() + ": " + f.error();
        };
    }

    // Pattern matching instanceof
    static String describe(Object obj) {
        if (obj instanceof String s && s.length() > 5) {
            return "Long string: " + s;
        } else if (obj instanceof Integer i && i > 0) {
            return "Positive int: " + i;
        } else if (obj instanceof int[] arr) {
            return "Int array of length " + arr.length;
        } else if (obj == null) {
            return "null value";
        } else {
            return "Other: " + obj.getClass().getSimpleName();
        }
    }

    // Pattern matching in switch with null
    static String classify(Object obj) {
        return switch (obj) {
            case null         -> "null";
            case Integer i    -> "Integer: " + i;
            case String s     -> "String: " + s;
            case Double d     -> "Double: " + d;
            case int[] arr    -> "Array[" + arr.length + "]";
            default           -> "Unknown: " + obj.getClass().getSimpleName();
        };
    }

    public static void main(String[] args) {
        // Pattern matching with sealed types
        Result[] results = {
            new Success("Data loaded"),
            new Failure("Page not found", 404),
            new Failure("Internal error", 500),
            new Failure("Bad request", 400)
        };
        for (Result r : results) {
            System.out.println(formatResult(r));
        }

        // instanceof patterns
        System.out.println("\\n" + describe("Hello World"));
        System.out.println(describe(42));
        System.out.println(describe(new int[]{1, 2, 3}));
        System.out.println(describe(null));

        // switch patterns
        System.out.println("\\n" + classify("test"));
        System.out.println(classify(42));
        System.out.println(classify(null));
    }
}`,
            output: `OK: Data loaded
Not Found: Page not found
Server Error: Internal error
Error 400: Bad request

Long string: Hello World
Positive int: 42
Int array of length 3
null value

String: test
Integer: 42
null`,
            note: 'Pattern matching for instanceof was finalized in Java 16. Pattern matching for switch was finalized in Java 21. Guarded patterns (when clause) provide conditional matching.',
          },
        ],
      },
      {
        id: 'text-blocks',
        title: 'Text Blocks',
        difficulty: 'beginner',
        tags: ['text-block', 'multiline', 'string', 'heredoc'],
        cheatSheetSummary: 'Triple-quoted strings: """ text """. Preserves formatting. Useful for JSON, SQL, HTML. Auto-strips leading indentation.',
        sections: [
          {
            heading: 'Multi-line Strings',
            content:
              'Text blocks (Java 15+) provide a clean way to write multi-line strings without escape characters for newlines and quotes. They use triple double-quotes (""") as delimiters. The compiler automatically strips common leading whitespace (incidental indentation) while preserving relative indentation. Text blocks support the same escape sequences as regular strings plus \\s (preserve trailing space) and \\ (line continuation).',
            analogy: 'Think of it like pasting a document directly into your code: instead of manually adding \\n at every line break and escaping every quote, text blocks let you write the content naturally between triple-quote fences, just like embedding a real document.',
            codeHighlightLines: [4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 26, 27, 28, 29, 30, 31, 32],
            code: `public class TextBlocks {
    public static void main(String[] args) {
        // JSON without escape hell
        String json = """
                {
                    "name": "Alice",
                    "age": 30,
                    "languages": ["Java", "Python"]
                }
                """;
        System.out.println("JSON:");
        System.out.println(json);

        // SQL query
        String sql = """
                SELECT u.name, u.email
                FROM users u
                JOIN orders o ON u.id = o.user_id
                WHERE o.total > 100
                ORDER BY u.name
                """;
        System.out.println("SQL:");
        System.out.println(sql);

        // HTML
        String html = """
                <html>
                    <body>
                        <h1>Hello, %s!</h1>
                        <p>Welcome to Java.</p>
                    </body>
                </html>
                """.formatted("Alice");
        System.out.println("HTML:");
        System.out.println(html);

        // Text block is just a String
        String block = """
                Hello""";
        String regular = "Hello";
        System.out.println("Equal: " + block.equals(regular));
    }
}`,
            output: `JSON:
{
    "name": "Alice",
    "age": 30,
    "languages": ["Java", "Python"]
}

SQL:
SELECT u.name, u.email
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.total > 100
ORDER BY u.name

HTML:
<html>
    <body>
        <h1>Hello, Alice!</h1>
        <p>Welcome to Java.</p>
    </body>
</html>

Equal: true`,
            note: 'Text blocks were finalized in Java 15. They dramatically improve readability for embedded JSON, SQL, HTML, and other multi-line formats.',
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  I/O & Concurrency                                            */
  /* ------------------------------------------------------------ */
  {
    id: 'java-io-concurrency',
    label: 'I/O & Concurrency',
    icon: 'Cpu',
    entries: [
      {
        id: 'file-io',
        title: 'File I/O',
        difficulty: 'intermediate',
        tags: ['File', 'Path', 'Files', 'NIO', 'read', 'write'],
        cheatSheetSummary: 'Files.readString(path) reads entire file. Files.writeString(path, content) writes. Use Path.of() for paths.',
        sections: [
          {
            heading: 'Modern File I/O with NIO',
            content:
              'Java NIO.2 (java.nio.file) provides modern file I/O through the Path and Files classes. Files.readString() and Files.writeString() handle small files in one call. For larger files, use Files.readAllLines() or Files.lines() for streaming. Always use Path.of() (Java 11+) or Paths.get() to create path objects.',
            analogy: 'Think of it like the evolution of postal mail to email: old Java I/O (InputStream/OutputStream) is like mailing letters one byte at a time, while NIO.2 (Files/Path) is like sending a whole email in one click -- readString() reads everything at once, and writeString() sends it in one call.',
            codeHighlightLines: [7, 8, 9, 12, 16, 20, 21, 25, 28, 29, 30, 33, 34, 35],
            code: `import java.io.IOException;
import java.nio.file.*;
import java.util.List;

public class FileIODemo {
    public static void main(String[] args) throws IOException {
        Path dir = Path.of(System.getProperty("java.io.tmpdir"), "java-demo");
        Files.createDirectories(dir);
        Path file = dir.resolve("example.txt");

        // Write string to file
        Files.writeString(file, "Hello, Java!\\nLine 2\\nLine 3");
        System.out.println("Written to: " + file);

        // Read entire file as string
        String content = Files.readString(file);
        System.out.println("Content:\\n" + content);

        // Read as lines
        List<String> lines = Files.readAllLines(file);
        System.out.println("\\nLines: " + lines);
        System.out.println("Line count: " + lines.size());

        // Append to file
        Files.writeString(file, "\\nLine 4", StandardOpenOption.APPEND);

        // File metadata
        System.out.println("\\nExists: " + Files.exists(file));
        System.out.println("Size: " + Files.size(file) + " bytes");
        System.out.println("Is file: " + Files.isRegularFile(file));

        // Stream lines (lazy, memory-efficient for large files)
        long wordCount = Files.lines(file)
            .flatMap(line -> java.util.Arrays.stream(line.split("\\\\s+")))
            .count();
        System.out.println("Word count: " + wordCount);

        // Clean up
        Files.delete(file);
        Files.delete(dir);
        System.out.println("Cleaned up: " + !Files.exists(file));
    }
}`,
            output: `Written to: /tmp/java-demo/example.txt
Content:
Hello, Java!
Line 2
Line 3

Lines: [Hello, Java!, Line 2, Line 3]
Line count: 3

Exists: true
Size: 33 bytes
Is file: true
Word count: 6
Cleaned up: true`,
          },
          {
            heading: 'Path Operations',
            content:
              'The Path class represents file system paths and provides methods for manipulating path strings without touching the file system. Path operations include resolving child paths, getting parent directories, extracting file names, and converting between absolute and relative paths.',
            analogy: 'Think of it like a GPS navigation system: resolve() is "from here, go to this destination," relativize() is "give me directions from A to B," and normalize() is "simplify the route by removing pointless U-turns (/../..)."',
            codeHighlightLines: [5, 7, 8, 9, 10, 14, 19, 20, 23, 24],
            code: `import java.nio.file.Path;

public class PathOps {
    public static void main(String[] args) {
        Path p = Path.of("/home", "alice", "documents", "report.pdf");
        System.out.println("Full path: " + p);
        System.out.println("File name: " + p.getFileName());
        System.out.println("Parent: " + p.getParent());
        System.out.println("Root: " + p.getRoot());
        System.out.println("Name count: " + p.getNameCount());

        // Resolve (join paths)
        Path base = Path.of("/home/alice");
        Path resolved = base.resolve("projects/app.java");
        System.out.println("\\nResolved: " + resolved);

        // Relativize
        Path from = Path.of("/home/alice/docs");
        Path to = Path.of("/home/alice/projects/app.java");
        System.out.println("Relative: " + from.relativize(to));

        // Normalize (remove . and ..)
        Path messy = Path.of("/home/alice/../alice/./docs/../projects");
        System.out.println("Normalized: " + messy.normalize());

        // File extension helper
        String filename = "archive.tar.gz";
        String ext = filename.substring(filename.lastIndexOf('.') + 1);
        System.out.println("Extension: " + ext);
    }
}`,
            output: `Full path: /home/alice/documents/report.pdf
File name: report.pdf
Parent: /home/alice/documents
Root: /
Name count: 4

Resolved: /home/alice/projects/app.java
Relative: ../../projects/app.java
Normalized: /home/alice/projects
Extension: gz`,
          },
        ],
      },
      {
        id: 'buffered-io',
        title: 'Buffered I/O',
        difficulty: 'intermediate',
        tags: ['BufferedReader', 'BufferedWriter', 'streaming', 'performance'],
        cheatSheetSummary: 'BufferedReader/Writer wrap streams for efficient I/O. Use try-with-resources. Essential for large files and network I/O.',
        sections: [
          {
            heading: 'Buffered Reading and Writing',
            content:
              'For large files or performance-critical I/O, use BufferedReader and BufferedWriter. They buffer data in memory to reduce the number of system calls. BufferedReader.readLine() reads one line at a time. Always use try-with-resources to ensure streams are properly closed.',
            analogy: 'Think of it like loading a truck: without buffering, you carry one box at a time from the warehouse to the truck (slow, many trips). With buffering, you load many boxes onto a cart first, then move them all to the truck at once -- far fewer trips to the operating system.',
            codeHighlightLines: [8, 9, 10, 11, 17, 18, 19, 20, 33, 34, 35],
            code: `import java.io.*;
import java.nio.file.*;

public class BufferedIODemo {
    public static void main(String[] args) throws IOException {
        Path file = Path.of(System.getProperty("java.io.tmpdir"), "buffered-demo.txt");

        // Buffered writing
        try (BufferedWriter writer = Files.newBufferedWriter(file)) {
            for (int i = 1; i <= 5; i++) {
                writer.write("Line " + i + ": This is some content");
                writer.newLine();
            }
        }
        System.out.println("Written 5 lines");

        // Buffered reading
        try (BufferedReader reader = Files.newBufferedReader(file)) {
            String line;
            int lineNum = 0;
            while ((line = reader.readLine()) != null) {
                lineNum++;
                System.out.println(lineNum + ": " + line);
            }
        }

        // Reading from stdin (console)
        // try (BufferedReader stdin = new BufferedReader(new InputStreamReader(System.in))) {
        //     String input = stdin.readLine();
        // }

        // Efficient line processing with streams
        System.out.println("\\nWord count per line:");
        try (var lines = Files.lines(file)) {
            lines.forEach(line -> {
                int words = line.split("\\\\s+").length;
                System.out.println("  " + words + " words: " + line.substring(0, Math.min(30, line.length())));
            });
        }

        Files.delete(file);
    }
}`,
            output: `Written 5 lines
1: Line 1: This is some content
2: Line 2: This is some content
3: Line 3: This is some content
4: Line 4: This is some content
5: Line 5: This is some content

Word count per line:
  6 words: Line 1: This is some content
  6 words: Line 2: This is some content
  6 words: Line 3: This is some content
  6 words: Line 4: This is some content
  6 words: Line 5: This is some content`,
            tip: 'Files.lines() returns a Stream<String> that must be closed. Always use it in a try-with-resources block to avoid file handle leaks.',
          },
        ],
      },
      {
        id: 'threads',
        title: 'Threads',
        difficulty: 'advanced',
        tags: ['Thread', 'Runnable', 'synchronization', 'concurrency'],
        cheatSheetSummary: 'new Thread(runnable).start() creates a thread. Use synchronized for mutual exclusion. Prefer higher-level concurrency utilities.',
        sections: [
          {
            heading: 'Creating and Running Threads',
            content:
              'Java supports multithreading natively. You can create threads by implementing Runnable (preferred) or extending Thread. Call start() to begin execution in a new thread. Use join() to wait for a thread to finish. The synchronized keyword prevents data races on shared state.',
            analogy: 'Think of it like a restaurant kitchen: each thread is a cook working in parallel. Without synchronization (the lock on shared ingredients), two cooks might grab the same knife at the same time and cause a mess. synchronized is like a sign saying "one cook at a time" for shared resources.',
            codeHighlightLines: [8, 9, 16, 17, 19, 20, 23, 24, 28, 29, 30, 31],
            code: `public class ThreadDemo {
    // Shared mutable state
    static int counter = 0;
    static final Object lock = new Object();

    public static void main(String[] args) throws InterruptedException {
        // Create threads with Runnable
        Runnable task = () -> {
            String name = Thread.currentThread().getName();
            for (int i = 0; i < 3; i++) {
                System.out.println(name + ": step " + i);
                try { Thread.sleep(100); } catch (InterruptedException e) { break; }
            }
        };

        Thread t1 = new Thread(task, "Worker-1");
        Thread t2 = new Thread(task, "Worker-2");

        t1.start();
        t2.start();

        // Wait for both threads to finish
        t1.join();
        t2.join();
        System.out.println("Both threads completed\\n");

        // Synchronized counter
        Runnable increment = () -> {
            for (int i = 0; i < 10000; i++) {
                synchronized (lock) {
                    counter++;
                }
            }
        };

        Thread t3 = new Thread(increment);
        Thread t4 = new Thread(increment);
        t3.start(); t4.start();
        t3.join(); t4.join();
        System.out.println("Counter (synchronized): " + counter);

        // Without synchronization, counter would likely be less than 20000
        // due to race conditions
    }
}`,
            output: `Worker-1: step 0
Worker-2: step 0
Worker-1: step 1
Worker-2: step 1
Worker-1: step 2
Worker-2: step 2
Both threads completed

Counter (synchronized): 20000`,
            warning: 'Accessing shared mutable state from multiple threads without synchronization causes data races. Always protect shared state with synchronized, locks, or atomic variables.',
          },
          {
            heading: 'Thread Safety Tools',
            content:
              'Java provides several tools for thread-safe programming beyond synchronized blocks. AtomicInteger and other atomic classes provide lock-free thread-safe operations. volatile ensures visibility of changes across threads. Collections.synchronizedList() and ConcurrentHashMap provide thread-safe collections.',
            analogy: 'Think of it like different styles of traffic control: synchronized is a traffic light (only one car at a time), AtomicInteger is a roundabout (cars flow through without stopping, but coordinate via CAS), and ConcurrentHashMap is a multi-lane highway with lane-level locks so different lanes can move independently.',
            codeHighlightLines: [8, 12, 19, 20, 21, 29, 32],
            code: `import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

public class ThreadSafety {
    public static void main(String[] args) throws InterruptedException {
        // AtomicInteger: lock-free thread-safe counter
        AtomicInteger atomicCounter = new AtomicInteger(0);

        Runnable atomicTask = () -> {
            for (int i = 0; i < 10000; i++) {
                atomicCounter.incrementAndGet();
            }
        };

        Thread t1 = new Thread(atomicTask);
        Thread t2 = new Thread(atomicTask);
        t1.start(); t2.start();
        t1.join(); t2.join();
        System.out.println("Atomic counter: " + atomicCounter.get());

        // Atomic operations
        System.out.println("getAndAdd(5): " + atomicCounter.getAndAdd(5));
        System.out.println("After add: " + atomicCounter.get());
        System.out.println("compareAndSet: " + atomicCounter.compareAndSet(20005, 0));
        System.out.println("After CAS: " + atomicCounter.get());

        // ConcurrentHashMap: thread-safe map
        Map<String, Integer> concMap = new ConcurrentHashMap<>();
        Runnable mapTask = () -> {
            for (int i = 0; i < 1000; i++) {
                concMap.merge(Thread.currentThread().getName(), 1, Integer::sum);
            }
        };

        Thread t3 = new Thread(mapTask, "A");
        Thread t4 = new Thread(mapTask, "B");
        t3.start(); t4.start();
        t3.join(); t4.join();
        System.out.println("\\nConcurrent map: " + concMap);
    }
}`,
            output: `Atomic counter: 20000
getAndAdd(5): 20000
After add: 20005
compareAndSet: true
After CAS: 0

Concurrent map: {A=1000, B=1000}`,
            tip: 'Prefer AtomicInteger over synchronized for simple counters. Prefer ConcurrentHashMap over Collections.synchronizedMap() for concurrent map access.',
          },
        ],
      },
      {
        id: 'executors',
        title: 'Executors & Thread Pools',
        difficulty: 'advanced',
        tags: ['ExecutorService', 'thread-pool', 'Future', 'Callable'],
        cheatSheetSummary: 'Executors.newFixedThreadPool(n) creates a thread pool. submit() returns Future. Use shutdown() when done.',
        sections: [
          {
            heading: 'Thread Pools and ExecutorService',
            content:
              'Creating threads directly is expensive and hard to manage. ExecutorService provides a thread pool that reuses threads. Use Executors factory methods to create pools. Submit Callable<T> tasks to get Future<T> results. Always call shutdown() when the pool is no longer needed.',
            analogy: 'Think of it like a taxi dispatch service: instead of buying a new car for every passenger (creating a thread), you maintain a fleet of reusable taxis (thread pool). When a ride request comes in (task), an available taxi picks it up. When it finishes, the taxi returns to the fleet ready for the next rider.',
            codeHighlightLines: [8, 13, 14, 23, 24, 25, 36, 37, 38, 48, 49],
            diagram: {
              kind: 'custom',
              type: 'queue',
              data: {
                label: 'Thread Pool (fixedSize=3)',
                items: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'],
                front: 0,
                rear: 4,
                description: 'Tasks are submitted to a shared queue. 3 worker threads pull tasks off the queue. When a thread finishes, it picks up the next waiting task.',
              },
              caption: 'A fixed thread pool of 3 workers processes 5 tasks from a shared work queue, reusing threads as they complete',
            },
            code: `import java.util.concurrent.*;
import java.util.List;
import java.util.ArrayList;

public class ExecutorDemo {
    public static void main(String[] args) throws Exception {
        // Fixed thread pool
        ExecutorService pool = Executors.newFixedThreadPool(3);

        // Submit Runnable tasks
        for (int i = 1; i <= 5; i++) {
            int taskId = i;
            pool.submit(() -> {
                String name = Thread.currentThread().getName();
                System.out.println("Task " + taskId + " on " + name);
            });
        }

        // Submit Callable tasks (return values)
        List<Future<Integer>> futures = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            int n = i;
            futures.add(pool.submit(() -> {
                Thread.sleep(100);  // simulate work
                return n * n;
            }));
        }

        // Collect results
        System.out.println("\\nSquares:");
        for (int i = 0; i < futures.size(); i++) {
            System.out.println("  " + (i + 1) + "^2 = " + futures.get(i).get());
        }

        // invokeAll: submit all tasks, wait for all results
        List<Callable<String>> tasks = List.of(
            () -> "Task A done",
            () -> "Task B done",
            () -> "Task C done"
        );
        List<Future<String>> results = pool.invokeAll(tasks);
        System.out.println("\\nAll done:");
        for (Future<String> f : results) {
            System.out.println("  " + f.get());
        }

        // Shutdown the pool
        pool.shutdown();
        boolean terminated = pool.awaitTermination(5, TimeUnit.SECONDS);
        System.out.println("\\nPool terminated: " + terminated);
    }
}`,
            output: `Task 1 on pool-1-thread-1
Task 2 on pool-1-thread-2
Task 3 on pool-1-thread-3
Task 4 on pool-1-thread-1
Task 5 on pool-1-thread-2

Squares:
  1^2 = 1
  2^2 = 4
  3^2 = 9
  4^2 = 16
  5^2 = 25

All done:
  Task A done
  Task B done
  Task C done

Pool terminated: true`,
            warning: 'Always call shutdown() on ExecutorService when done. Without it, the JVM will not exit because the thread pool threads keep running.',
          },
        ],
      },
      {
        id: 'completable-future',
        title: 'CompletableFuture',
        difficulty: 'advanced',
        tags: ['CompletableFuture', 'async', 'non-blocking', 'composition'],
        cheatSheetSummary: 'CompletableFuture.supplyAsync(supplier) runs async. Chain with thenApply, thenAccept, thenCompose. combine with allOf/anyOf.',
        sections: [
          {
            heading: 'Asynchronous Programming',
            content:
              'CompletableFuture (Java 8+) provides a powerful API for asynchronous programming. It supports chaining operations (thenApply, thenAccept), composing futures (thenCompose), combining results (thenCombine, allOf), and handling errors (exceptionally, handle). It runs tasks on the ForkJoinPool.commonPool() by default.',
            analogy: 'Think of it like ordering food delivery from multiple restaurants: you place orders (supplyAsync), then describe what to do when each arrives (thenApply/thenAccept). thenCompose is like ordering dessert only after the main course arrives, while thenCombine waits for two orders to arrive and merges them on one plate.',
            codeHighlightLines: [7, 8, 14, 15, 24, 25, 26, 29, 30, 35, 36, 40, 41, 42, 43, 49, 50, 51, 52],
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    A["supplyAsync\n(start task)"] --> B["thenApply\n(transform)"]
    B --> C["thenApply\n(transform)"]
    C --> D["get()\n(block for result)"]
    A2["supplyAsync"] --> E["thenCompose\n(chain async)"]
    E --> F["get()"]
    A3["supplyAsync"] --> G["thenCombine"]
    A4["supplyAsync"] --> G
    G --> H["get()"]
    style A fill:#dbeafe
    style A2 fill:#dbeafe
    style A3 fill:#dbeafe
    style A4 fill:#dbeafe
    style D fill:#dcfce7
    style F fill:#dcfce7
    style H fill:#dcfce7`,
              caption: 'CompletableFuture chains: thenApply for sync transforms, thenCompose for sequential async, thenCombine for parallel merge',
            },
            code: `import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

public class CompletableFutureDemo {
    // Simulate async operations
    static CompletableFuture<String> fetchUser(int id) {
        return CompletableFuture.supplyAsync(() -> {
            sleep(100);
            return "User-" + id;
        });
    }

    static CompletableFuture<String> fetchOrders(String user) {
        return CompletableFuture.supplyAsync(() -> {
            sleep(100);
            return "Orders for " + user;
        });
    }

    static void sleep(long ms) {
        try { Thread.sleep(ms); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
    }

    public static void main(String[] args) throws Exception {
        // Basic async operation
        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
            sleep(100);
            return "Hello from async!";
        });
        System.out.println(future.get());

        // Chain transformations
        String result = CompletableFuture.supplyAsync(() -> 42)
            .thenApply(n -> n * 2)
            .thenApply(n -> "Result: " + n)
            .get();
        System.out.println(result);

        // Compose (sequential async)
        String orderInfo = fetchUser(123)
            .thenCompose(user -> fetchOrders(user))
            .get();
        System.out.println(orderInfo);

        // Combine (parallel async)
        CompletableFuture<String> combined = fetchUser(1)
            .thenCombine(fetchUser(2), (u1, u2) -> u1 + " & " + u2);
        System.out.println("Combined: " + combined.get());

        // Error handling
        String safe = CompletableFuture.supplyAsync(() -> {
                if (true) throw new RuntimeException("Oops!");
                return "OK";
            })
            .exceptionally(ex -> "Recovered: " + ex.getMessage())
            .get();
        System.out.println(safe);

        // Wait for all
        CompletableFuture<Void> all = CompletableFuture.allOf(
            fetchUser(1).thenAccept(u -> System.out.println("  Got: " + u)),
            fetchUser(2).thenAccept(u -> System.out.println("  Got: " + u)),
            fetchUser(3).thenAccept(u -> System.out.println("  Got: " + u))
        );
        System.out.println("Waiting for all...");
        all.get();
        System.out.println("All completed!");
    }
}`,
            output: `Hello from async!
Result: 84
Orders for User-123
Combined: User-1 & User-2
Recovered: java.lang.RuntimeException: Oops!
Waiting for all...
  Got: User-1
  Got: User-2
  Got: User-3
All completed!`,
            tip: 'Use thenApply for sync transformations, thenCompose for async transformations (returns CompletableFuture), and thenCombine to merge two independent futures.',
          },
          {
            heading: 'CompletableFuture Patterns',
            content:
              'CompletableFuture supports advanced patterns including timeouts, fallbacks, and parallel fan-out/fan-in. These are essential for building responsive applications that handle multiple concurrent operations.',
            analogy: 'Think of it like ordering from five food trucks at once: fan-out dispatches all five orders simultaneously, and fan-in waits at a table for all of them to arrive. The total wait time is just the slowest truck, not five waits back to back. anyOf is like saying "I will eat whichever arrives first."',
            codeHighlightLines: [14, 15, 16, 20, 21, 26, 27, 28, 32, 33, 34, 41, 42, 43, 44],
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    subgraph "Fan-out / Fan-in"\n        ITEMS["5 items"] --> FA["Future A"]\n        ITEMS --> FB["Future B"]\n        ITEMS --> FC["Future C"]\n        ITEMS --> FD["Future D"]\n        ITEMS --> FE["Future E"]\n        FA --> JOIN["join all ~100ms"]\n        FB --> JOIN\n        FC --> JOIN\n        FD --> JOIN\n        FE --> JOIN\n        JOIN --> RES["Results list"]\n    end\n    subgraph "anyOf (race)"\n        SLOW["slow 300ms"] --> RACE["anyOf"]\n        FAST["fast 50ms"] --> RACE\n        MED["medium 150ms"] --> RACE\n        RACE --> WINNER["fast wins!"]\n    end\n    style ITEMS fill:#42a5f5,color:#fff\n    style JOIN fill:#ffa726,color:#fff\n    style FAST fill:#66bb6a,color:#fff\n    style WINNER fill:#66bb6a,color:#fff',
              caption: 'Fan-out runs tasks in parallel; fan-in collects all results. anyOf returns the first completed future.',
            },
            code: `import java.util.concurrent.*;
import java.util.List;
import java.util.stream.Collectors;

public class CFPatterns {
    static CompletableFuture<String> fetchWithDelay(String item, long ms) {
        return CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(ms); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            return item + " (took " + ms + "ms)";
        });
    }

    public static void main(String[] args) throws Exception {
        // Timeout (Java 9+)
        CompletableFuture<String> withTimeout = fetchWithDelay("slow", 5000)
            .orTimeout(1, TimeUnit.SECONDS)
            .exceptionally(ex -> "Timed out!");
        System.out.println(withTimeout.get());

        // Default on timeout (Java 9+)
        CompletableFuture<String> withDefault = fetchWithDelay("slow", 5000)
            .completeOnTimeout("default value", 1, TimeUnit.SECONDS);
        System.out.println(withDefault.get());

        // Fan-out: run many tasks in parallel, collect results
        List<String> items = List.of("A", "B", "C", "D", "E");
        List<CompletableFuture<String>> futures = items.stream()
            .map(item -> fetchWithDelay(item, 100))
            .collect(Collectors.toList());

        // Fan-in: wait for all and collect
        long start = System.currentTimeMillis();
        List<String> results = futures.stream()
            .map(CompletableFuture::join)
            .collect(Collectors.toList());
        long elapsed = System.currentTimeMillis() - start;

        System.out.println("\\nResults: " + results);
        System.out.println("Total time: " + elapsed + "ms (ran in parallel!)");

        // anyOf: first to complete wins
        CompletableFuture<Object> fastest = CompletableFuture.anyOf(
            fetchWithDelay("slow", 300),
            fetchWithDelay("fast", 50),
            fetchWithDelay("medium", 150)
        );
        System.out.println("\\nFirst: " + fastest.get());
    }
}`,
            output: `Timed out!
default value

Results: [A (took 100ms), B (took 100ms), C (took 100ms), D (took 100ms), E (took 100ms)]
Total time: 105ms (ran in parallel!)

First: fast (took 50ms)`,
            note: 'orTimeout() and completeOnTimeout() were added in Java 9. They provide clean timeout handling without manual scheduling.',
          },
        ],
      },
    ],
  },
];

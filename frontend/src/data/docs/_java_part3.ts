import type { DocCategory } from './types';

// Part 3: OOP + Exception Handling
export const JAVA_PART3_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Object-Oriented Programming                                  */
  /* ------------------------------------------------------------ */
  {
    id: 'java-oop',
    label: 'OOP',
    icon: 'Box',
    entries: [
      {
        id: 'classes',
        title: 'Classes & Objects',
        difficulty: 'beginner',
        tags: ['class', 'object', 'fields', 'instance'],
        cheatSheetSummary: 'class MyClass { fields; constructors; methods; }. Create instances with new MyClass(). Access members with dot notation.',
        sections: [
          {
            heading: 'Defining a Class',
            content:
              'A class in Java is a blueprint for creating objects. It defines fields (data), constructors (initialization), and methods (behavior). Fields store the state of an object, and methods define what an object can do. By convention, class names use PascalCase, fields and methods use camelCase.',
            code: `public class Dog {
    // Fields (instance variables)
    String name;
    String breed;
    int age;

    // Constructor
    Dog(String name, String breed, int age) {
        this.name = name;
        this.breed = breed;
        this.age = age;
    }

    // Method
    void bark() {
        System.out.println(name + " says: Woof!");
    }

    String info() {
        return name + " (" + breed + ", " + age + " years old)";
    }

    public static void main(String[] args) {
        // Creating objects with new
        Dog dog1 = new Dog("Buddy", "Golden Retriever", 3);
        Dog dog2 = new Dog("Max", "German Shepherd", 5);

        dog1.bark();
        dog2.bark();

        System.out.println(dog1.info());
        System.out.println(dog2.info());

        // Accessing fields
        System.out.println(dog1.name + " is " + dog1.age);
    }
}`,
            output: `Buddy says: Woof!
Max says: Woof!
Buddy (Golden Retriever, 3 years old)
Max (German Shepherd, 5 years old)
Buddy is 3`,
            analogy: 'Think of it like a cookie cutter: the class is the cutter (the blueprint), and each object you create with "new" is a unique cookie stamped out from it -- same shape, but each can have its own decorations (field values).',
            codeHighlightLines: [8, 9, 10, 11, 26, 27],
          },
          {
            heading: 'The this Keyword',
            content:
              'The this keyword refers to the current instance of the class. It is used to distinguish between instance fields and constructor/method parameters with the same name, to call other constructors from within a constructor (this()), and to pass the current object as an argument to other methods.',
            code: `public class Rectangle {
    double width;
    double height;

    // this resolves ambiguity between field and parameter names
    Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    // Constructor chaining with this()
    Rectangle(double side) {
        this(side, side);  // calls the two-arg constructor
    }

    Rectangle() {
        this(1.0);  // calls the one-arg constructor
    }

    double area() {
        return this.width * this.height;
    }

    double perimeter() {
        return 2 * (width + height);  // this is optional here
    }

    // Method returning this for fluent API
    Rectangle scale(double factor) {
        this.width *= factor;
        this.height *= factor;
        return this;
    }

    public static void main(String[] args) {
        Rectangle r1 = new Rectangle(5, 3);
        Rectangle r2 = new Rectangle(4);     // square
        Rectangle r3 = new Rectangle();      // unit square

        System.out.printf("r1: %.1f x %.1f, area=%.1f%n", r1.width, r1.height, r1.area());
        System.out.printf("r2: %.1f x %.1f, area=%.1f%n", r2.width, r2.height, r2.area());
        System.out.printf("r3: %.1f x %.1f, area=%.1f%n", r3.width, r3.height, r3.area());

        // Fluent API with method chaining
        double area = new Rectangle(2, 3).scale(2).area();
        System.out.println("Scaled area: " + area);
    }
}`,
            output: `r1: 5.0 x 3.0, area=15.0
r2: 4.0 x 4.0, area=16.0
r3: 1.0 x 1.0, area=1.0
Scaled area: 24.0`,
            analogy: 'Think of it like a name tag at a conference: "this" is each person pointing to themselves. When someone says "this.name = name," they are saying "MY name is the name you gave me," resolving any ambiguity between the parameter and the field.',
            codeHighlightLines: [7, 8, 13, 17, 32],
          },
          {
            heading: 'toString, equals, and hashCode',
            content:
              'Every Java class inherits from Object and should override toString() for readable output, equals() for content comparison, and hashCode() for use in hash-based collections. If you override equals(), you must also override hashCode(). Objects that are equal must have the same hash code.',
            code: `import java.util.Objects;

public class Point {
    final int x, y;

    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public String toString() {
        return "Point(" + x + ", " + y + ")";
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Point other)) return false;
        return this.x == other.x && this.y == other.y;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y);
    }

    public static void main(String[] args) {
        Point p1 = new Point(3, 4);
        Point p2 = new Point(3, 4);
        Point p3 = new Point(5, 6);

        // toString
        System.out.println(p1);  // uses toString()

        // equals
        System.out.println("p1.equals(p2): " + p1.equals(p2));  // true
        System.out.println("p1.equals(p3): " + p1.equals(p3));  // false
        System.out.println("p1 == p2: " + (p1 == p2));          // false (different objects)

        // hashCode
        System.out.println("p1.hashCode(): " + p1.hashCode());
        System.out.println("p2.hashCode(): " + p2.hashCode());
    }
}`,
            output: `Point(3, 4)
p1.equals(p2): true
p1.equals(p3): false
p1 == p2: false
p1.hashCode(): 1058
p2.hashCode(): 1058`,
            warning: 'If you override equals() without overriding hashCode(), objects that are "equal" will not work correctly in HashMap, HashSet, or other hash-based collections.',
            analogy: 'Think of it like house addresses: equals() checks if two envelopes are addressed to the same house (same content), while == checks if two envelopes are literally the same piece of paper. hashCode() is the zip code -- equal addresses must share the same zip, but different addresses might share one too.',
          },
        ],
        quiz: [
          {
            question: 'What keyword is used to create a new instance of a class in Java?',
            options: ['create', 'new', 'init', 'make'],
            correctIndex: 1,
            explanation: 'The "new" keyword allocates memory for a new object and invokes the constructor to initialize it. For example: Dog d = new Dog("Buddy", "Lab", 3);',
          },
          {
            question: 'What does the "this" keyword refer to inside a constructor or instance method?',
            options: ['The class itself', 'The parent class', 'The current object instance', 'The main method'],
            correctIndex: 2,
            explanation: '"this" refers to the current object instance. It is used to disambiguate between field names and parameter names (this.name = name) and to chain constructors (this()).',
          },
          {
            question: 'Why must you override hashCode() when you override equals()?',
            options: [
              'The compiler requires it',
              'Objects that are equal must return the same hashCode for hash-based collections to work',
              'hashCode() is called automatically by equals()',
              'It improves performance of all method calls',
            ],
            correctIndex: 1,
            explanation: 'The contract states that equal objects must have the same hash code. If you override equals() without overriding hashCode(), objects that are "equal" will not be found correctly in HashMap, HashSet, etc.',
          },
          {
            question: 'What does this() do when used as the first statement in a constructor?',
            options: [
              'Calls the parent class constructor',
              'Calls another constructor in the same class',
              'Returns the current instance',
              'Creates a new object',
            ],
            correctIndex: 1,
            explanation: 'this() is used for constructor chaining -- it calls another constructor in the same class. For example, Rectangle(double side) { this(side, side); } calls the two-argument constructor.',
          },
        ],
        challenge: {
          prompt: 'Create a class called Book with fields for title (String), author (String), and pages (int). Include a constructor, a toString() method, and an equals() method that considers two books equal if they have the same title and author.',
          starterCode: `public class Book {
    // TODO: Add fields

    // TODO: Add constructor

    // TODO: Override toString()

    // TODO: Override equals()

    public static void main(String[] args) {
        Book b1 = new Book("Java Basics", "Alice", 300);
        Book b2 = new Book("Java Basics", "Alice", 350);
        Book b3 = new Book("Python 101", "Bob", 200);

        System.out.println(b1);
        System.out.println("b1 equals b2: " + b1.equals(b2));
        System.out.println("b1 equals b3: " + b1.equals(b3));
    }
}`,
          solutionCode: `import java.util.Objects;

public class Book {
    String title;
    String author;
    int pages;

    Book(String title, String author, int pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }

    @Override
    public String toString() {
        return title + " by " + author + " (" + pages + " pages)";
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Book other)) return false;
        return Objects.equals(title, other.title) && Objects.equals(author, other.author);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, author);
    }

    public static void main(String[] args) {
        Book b1 = new Book("Java Basics", "Alice", 300);
        Book b2 = new Book("Java Basics", "Alice", 350);
        Book b3 = new Book("Python 101", "Bob", 200);

        System.out.println(b1);
        System.out.println("b1 equals b2: " + b1.equals(b2));
        System.out.println("b1 equals b3: " + b1.equals(b3));
    }
}`,
          hints: [
            'Fields are declared at the top of the class. The constructor should use this.field = parameter to set each one.',
            'For equals(), check if the other object is an instance of Book, then compare title and author using Objects.equals().',
            'Remember to override hashCode() whenever you override equals() -- use Objects.hash(title, author).',
          ],
        },
      },
      {
        id: 'constructors',
        title: 'Constructors',
        difficulty: 'beginner',
        tags: ['constructor', 'initialization', 'this', 'chaining'],
        cheatSheetSummary: 'Constructors initialize objects. Same name as class, no return type. Use this() for chaining, super() for parent.',
        sections: [
          {
            heading: 'Constructor Basics',
            content:
              'A constructor is a special method that initializes a new object. It has the same name as the class and no return type (not even void). If you define no constructors, Java provides a default no-arg constructor. Once you define any constructor, the default is no longer provided. Constructors can be overloaded to accept different parameters.',
            code: `public class Student {
    String name;
    int age;
    double gpa;

    // Default-like constructor
    Student() {
        this.name = "Unknown";
        this.age = 0;
        this.gpa = 0.0;
    }

    // Parameterized constructor
    Student(String name, int age) {
        this.name = name;
        this.age = age;
        this.gpa = 0.0;
    }

    // Full constructor
    Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }

    @Override
    public String toString() {
        return String.format("%s (age %d, GPA %.1f)", name, age, gpa);
    }

    public static void main(String[] args) {
        Student s1 = new Student();
        Student s2 = new Student("Alice", 20);
        Student s3 = new Student("Bob", 21, 3.8);

        System.out.println(s1);
        System.out.println(s2);
        System.out.println(s3);
    }
}`,
            output: `Unknown (age 0, GPA 0.0)
Alice (age 20, GPA 0.0)
Bob (age 21, GPA 3.8)`,
            analogy: 'Think of it like a car factory assembly line: the constructor is the station where a new car gets its initial configuration -- color, engine, trim level. Different constructors are like different trim packages (base, sport, luxury), each setting up the car differently.',
          },
          {
            heading: 'Constructor Chaining and Validation',
            content:
              'Constructor chaining uses this() to call another constructor in the same class, reducing code duplication. The this() call must be the first statement in the constructor. Constructors are a great place to validate parameters and enforce invariants.',
            code: `public class BankAccount {
    private String owner;
    private double balance;
    private String accountId;
    private static int nextId = 1000;

    // Primary constructor with validation
    BankAccount(String owner, double initialBalance) {
        if (owner == null || owner.isBlank()) {
            throw new IllegalArgumentException("Owner name required");
        }
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Balance cannot be negative");
        }
        this.owner = owner;
        this.balance = initialBalance;
        this.accountId = "ACC-" + (nextId++);
    }

    // Chained constructor: default balance
    BankAccount(String owner) {
        this(owner, 0.0);  // chains to primary constructor
    }

    void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
        balance += amount;
    }

    @Override
    public String toString() {
        return String.format("[%s] %s: $%.2f", accountId, owner, balance);
    }

    public static void main(String[] args) {
        BankAccount acc1 = new BankAccount("Alice", 1000.0);
        BankAccount acc2 = new BankAccount("Bob");

        acc2.deposit(500);

        System.out.println(acc1);
        System.out.println(acc2);

        // Validation in action
        try {
            new BankAccount("", 100);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
            output: `[ACC-1000] Alice: $1000.00
[ACC-1001] Bob: $500.00
Error: Owner name required`,
            tip: 'Use constructor chaining to have a single "primary" constructor that validates and sets all fields, with simpler constructors delegating to it.',
            codeHighlightLines: [8, 9, 12, 22],
          },
          {
            heading: 'Copy Constructors and Static Factory Methods',
            content:
              'A copy constructor creates a new object by copying the fields of an existing object. Static factory methods provide named constructors with descriptive names and can return cached instances or subclass instances. They are a common alternative to constructors in modern Java.',
            code: `import java.util.ArrayList;
import java.util.List;

public class Color {
    private final int r, g, b;

    // Primary constructor
    private Color(int r, int g, int b) {
        this.r = Math.max(0, Math.min(255, r));
        this.g = Math.max(0, Math.min(255, g));
        this.b = Math.max(0, Math.min(255, b));
    }

    // Copy constructor
    Color(Color other) {
        this(other.r, other.g, other.b);
    }

    // Static factory methods (named constructors)
    static Color rgb(int r, int g, int b) {
        return new Color(r, g, b);
    }

    static Color hex(String hex) {
        int r = Integer.parseInt(hex.substring(1, 3), 16);
        int g = Integer.parseInt(hex.substring(3, 5), 16);
        int b = Integer.parseInt(hex.substring(5, 7), 16);
        return new Color(r, g, b);
    }

    // Predefined colors
    static final Color RED = new Color(255, 0, 0);
    static final Color GREEN = new Color(0, 255, 0);
    static final Color BLUE = new Color(0, 0, 255);

    @Override
    public String toString() {
        return String.format("rgb(%d, %d, %d)", r, g, b);
    }

    public static void main(String[] args) {
        Color c1 = Color.rgb(128, 64, 32);
        Color c2 = Color.hex("#FF8800");
        Color c3 = new Color(Color.RED);

        System.out.println("c1: " + c1);
        System.out.println("c2: " + c2);
        System.out.println("c3 (copy of RED): " + c3);
        System.out.println("BLUE: " + Color.BLUE);
    }
}`,
            output: `c1: rgb(128, 64, 32)
c2: rgb(255, 136, 0)
c3 (copy of RED): rgb(255, 0, 0)
BLUE: rgb(0, 0, 255)`,
            analogy: 'Think of it like ordering food: a constructor is "I want a burger," a copy constructor is "I want exactly what they are having," and a static factory method is a named menu item like Color.hex() -- a friendlier name for a specific way of building the same thing.',
            codeHighlightLines: [15, 16, 20, 21, 24, 25],
          },
        ],
        quiz: [
          {
            question: 'What happens if you do not define any constructor in a Java class?',
            options: [
              'The class cannot be compiled',
              'Java provides a default no-argument constructor',
              'All fields are set to null',
              'The class becomes abstract',
            ],
            correctIndex: 1,
            explanation: 'If no constructor is defined, the Java compiler automatically provides a default no-argument constructor. However, once you define any constructor, the default is no longer provided.',
          },
          {
            question: 'What must be the first statement in a constructor that uses this() for chaining?',
            options: [
              'A field assignment',
              'A super() call',
              'The this() call itself',
              'A validation check',
            ],
            correctIndex: 2,
            explanation: 'The this() call must be the very first statement in a constructor. You cannot have any other code before it, including field assignments or validation.',
          },
          {
            question: 'What is a static factory method?',
            options: [
              'A method that creates factories',
              'A named static method that returns a new instance of the class',
              'A constructor declared with the static keyword',
              'A method that only works in static classes',
            ],
            correctIndex: 1,
            explanation: 'A static factory method is a static method that returns a new instance of the class. It provides a descriptive name (like Color.hex("#FF0000")) and can return cached instances or subclass instances.',
          },
        ],
        challenge: {
          prompt: 'Create a Temperature class with a private double field for celsius. Provide a primary constructor Temperature(double celsius) with validation (reject values below -273.15). Add a static factory method fromFahrenheit(double f) that converts and returns a Temperature. Include a toString() method.',
          starterCode: `public class Temperature {
    // TODO: private field for celsius

    // TODO: Primary constructor with validation

    // TODO: Static factory method fromFahrenheit

    // TODO: Getter for celsius

    // TODO: toString

    public static void main(String[] args) {
        Temperature t1 = new Temperature(100);
        Temperature t2 = Temperature.fromFahrenheit(212);
        System.out.println(t1);
        System.out.println(t2);

        try {
            new Temperature(-300);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          solutionCode: `public class Temperature {
    private double celsius;

    Temperature(double celsius) {
        if (celsius < -273.15) {
            throw new IllegalArgumentException(
                "Temperature cannot be below absolute zero: " + celsius);
        }
        this.celsius = celsius;
    }

    static Temperature fromFahrenheit(double f) {
        return new Temperature((f - 32) * 5.0 / 9.0);
    }

    double getCelsius() {
        return celsius;
    }

    @Override
    public String toString() {
        return String.format("%.1f°C", celsius);
    }

    public static void main(String[] args) {
        Temperature t1 = new Temperature(100);
        Temperature t2 = Temperature.fromFahrenheit(212);
        System.out.println(t1);
        System.out.println(t2);

        try {
            new Temperature(-300);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          hints: [
            'The constructor should check if celsius < -273.15 and throw an IllegalArgumentException if so.',
            'The fromFahrenheit method uses the formula: celsius = (fahrenheit - 32) * 5.0 / 9.0, then creates a new Temperature with the result.',
          ],
        },
      },
      {
        id: 'inheritance',
        title: 'Inheritance',
        difficulty: 'intermediate',
        tags: ['extends', 'super', 'inheritance', 'is-a'],
        cheatSheetSummary: 'class Child extends Parent { }. Use super() to call parent constructor, super.method() to call parent method. Single inheritance only.',
        sections: [
          {
            heading: 'Extending a Class',
            content:
              'Inheritance allows a child class to inherit fields and methods from a parent class using the extends keyword. Java supports single class inheritance only (a class can extend exactly one parent). The child class inherits all public and protected members. Constructors are NOT inherited but can be invoked via super().',
            code: `public class InheritanceDemo {
    static class Animal {
        String name;
        int age;

        Animal(String name, int age) {
            this.name = name;
            this.age = age;
        }

        void eat() {
            System.out.println(name + " is eating.");
        }

        String info() {
            return name + " (age " + age + ")";
        }
    }

    static class Dog extends Animal {
        String breed;

        Dog(String name, int age, String breed) {
            super(name, age);  // MUST call parent constructor first
            this.breed = breed;
        }

        void bark() {
            System.out.println(name + " barks!");
        }

        @Override
        String info() {
            return super.info() + " [" + breed + "]";
        }
    }

    static class Puppy extends Dog {
        Puppy(String name, String breed) {
            super(name, 0, breed);
        }

        @Override
        void bark() {
            System.out.println(name + " yips!");
        }
    }

    public static void main(String[] args) {
        Dog dog = new Dog("Buddy", 5, "Labrador");
        dog.eat();     // inherited from Animal
        dog.bark();    // defined in Dog
        System.out.println(dog.info());

        Puppy puppy = new Puppy("Tiny", "Chihuahua");
        puppy.eat();   // inherited from Animal
        puppy.bark();  // overridden
        System.out.println(puppy.info());
    }
}`,
            output: `Buddy is eating.
Buddy barks!
Buddy (age 5) [Labrador]
Tiny is eating.
Tiny yips!
Tiny (age 0) [Chihuahua]`,
            analogy: 'Think of it like a family tree: a Dog IS an Animal and inherits all Animal traits (name, age, eating). A Puppy IS a Dog and further specializes behavior. Each generation inherits everything from its ancestors while adding or customizing its own features.',
            codeHighlightLines: [20, 24, 34],
          },
          {
            heading: 'Method Overriding and super',
            content:
              'A child class can override a parent method by defining a method with the same signature. Use the @Override annotation to get compile-time verification. Call super.method() to invoke the parent version. Override rules: the access modifier cannot be more restrictive, and the return type must be the same or a subtype (covariant return).',
            code: `public class OverrideDemo {
    static class Shape {
        String color;

        Shape(String color) {
            this.color = color;
        }

        double area() {
            return 0;
        }

        @Override
        public String toString() {
            return color + " Shape (area=" + String.format("%.2f", area()) + ")";
        }
    }

    static class Circle extends Shape {
        double radius;

        Circle(String color, double radius) {
            super(color);
            this.radius = radius;
        }

        @Override
        double area() {
            return Math.PI * radius * radius;
        }

        @Override
        public String toString() {
            return color + " Circle r=" + radius + " (area=" + String.format("%.2f", area()) + ")";
        }
    }

    static class Square extends Shape {
        double side;

        Square(String color, double side) {
            super(color);
            this.side = side;
        }

        @Override
        double area() {
            return side * side;
        }

        @Override
        public String toString() {
            return color + " Square s=" + side + " (area=" + String.format("%.2f", area()) + ")";
        }
    }

    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle("Red", 5),
            new Square("Blue", 4),
            new Circle("Green", 3)
        };

        for (Shape s : shapes) {
            System.out.println(s);
        }
    }
}`,
            output: `Red Circle r=5.0 (area=78.54)
Blue Square s=4.0 (area=16.00)
Green Circle r=3.0 (area=28.27)`,
            tip: 'Always use the @Override annotation when overriding methods. It catches typos and signature mismatches at compile time.',
            codeHighlightLines: [27, 28, 29, 46, 47, 48],
          },
          {
            heading: 'The final Keyword in Inheritance',
            content:
              'The final keyword prevents further extension or overriding. A final class cannot be subclassed, a final method cannot be overridden, and a final field cannot be reassigned. The String class itself is final, which is why you cannot extend it. Use final to enforce design constraints and improve security.',
            code: `public class FinalDemo {
    // A final class cannot be extended
    static final class ImmutablePoint {
        final int x, y;

        ImmutablePoint(int x, int y) {
            this.x = x;
            this.y = y;
        }

        @Override
        public String toString() {
            return "(" + x + ", " + y + ")";
        }
    }

    // class ExtendedPoint extends ImmutablePoint { }  // COMPILE ERROR

    static class Base {
        // A final method cannot be overridden
        final void criticalMethod() {
            System.out.println("This behavior is locked!");
        }

        void flexibleMethod() {
            System.out.println("Base behavior");
        }
    }

    static class Child extends Base {
        // void criticalMethod() { }  // COMPILE ERROR

        @Override
        void flexibleMethod() {
            System.out.println("Child behavior");
        }
    }

    public static void main(String[] args) {
        ImmutablePoint p = new ImmutablePoint(3, 4);
        System.out.println("Point: " + p);

        Child c = new Child();
        c.criticalMethod();
        c.flexibleMethod();
    }
}`,
            output: `Point: (3, 4)
This behavior is locked!
Child behavior`,
            analogy: 'Think of it like a museum exhibit behind glass: a final class is a sealed display case -- you can look but you cannot extend it. A final method is a rule carved in stone -- subclasses must follow it as-is. A final field is a label printed in permanent ink -- once set, it cannot be changed.',
          },
        ],
        quiz: [
          {
            question: 'Which keyword is used to inherit from a parent class in Java?',
            options: ['implements', 'inherits', 'extends', 'super'],
            correctIndex: 2,
            explanation: 'The "extends" keyword is used for class inheritance. For example: class Dog extends Animal { }. Java uses "implements" for interfaces, not class inheritance.',
          },
          {
            question: 'What does super(name, age) do in a child class constructor?',
            options: [
              'Creates a new parent object',
              'Calls the parent class constructor with those arguments',
              'Assigns values to the child fields',
              'Overrides the parent constructor',
            ],
            correctIndex: 1,
            explanation: 'super() calls the parent class constructor. It must be the first statement in the child constructor. This ensures the parent portion of the object is properly initialized before the child adds its own state.',
          },
          {
            question: 'How many classes can a Java class directly extend?',
            options: ['Unlimited', 'Two', 'One', 'Zero'],
            correctIndex: 2,
            explanation: 'Java supports single class inheritance only. A class can extend exactly one parent class. To achieve a form of multiple inheritance, Java uses interfaces, which a class can implement many of.',
          },
          {
            question: 'What does the final keyword do when applied to a class?',
            options: [
              'Makes the class immutable',
              'Prevents the class from being subclassed',
              'Makes all methods static',
              'Prevents instantiation',
            ],
            correctIndex: 1,
            explanation: 'A final class cannot be extended (subclassed). For example, the String class is final in Java. This is used to prevent modification of behavior through inheritance and to enforce design constraints.',
          },
        ],
        challenge: {
          prompt: 'Create a class hierarchy with a base class Employee (name, salary) and two subclasses: Manager (with a bonus field) and Developer (with a language field). Override a totalPay() method: for Manager it returns salary + bonus, for Developer it returns salary. Print info for both.',
          starterCode: `public class EmployeeDemo {
    static class Employee {
        // TODO: fields, constructor, totalPay(), toString()
    }

    static class Manager extends Employee {
        // TODO: bonus field, constructor, override totalPay()
    }

    static class Developer extends Employee {
        // TODO: language field, constructor, override toString()
    }

    public static void main(String[] args) {
        Employee[] team = {
            new Manager("Alice", 80000, 15000),
            new Developer("Bob", 75000, "Java"),
            new Manager("Carol", 90000, 20000)
        };

        for (Employee e : team) {
            System.out.println(e + " -> Total: $" + e.totalPay());
        }
    }
}`,
          solutionCode: `public class EmployeeDemo {
    static class Employee {
        String name;
        double salary;

        Employee(String name, double salary) {
            this.name = name;
            this.salary = salary;
        }

        double totalPay() {
            return salary;
        }

        @Override
        public String toString() {
            return name + " (salary=$" + salary + ")";
        }
    }

    static class Manager extends Employee {
        double bonus;

        Manager(String name, double salary, double bonus) {
            super(name, salary);
            this.bonus = bonus;
        }

        @Override
        double totalPay() {
            return salary + bonus;
        }

        @Override
        public String toString() {
            return name + " [Manager] (salary=$" + salary + ", bonus=$" + bonus + ")";
        }
    }

    static class Developer extends Employee {
        String language;

        Developer(String name, double salary, String language) {
            super(name, salary);
            this.language = language;
        }

        @Override
        public String toString() {
            return name + " [Developer/" + language + "] (salary=$" + salary + ")";
        }
    }

    public static void main(String[] args) {
        Employee[] team = {
            new Manager("Alice", 80000, 15000),
            new Developer("Bob", 75000, "Java"),
            new Manager("Carol", 90000, 20000)
        };

        for (Employee e : team) {
            System.out.println(e + " -> Total: $" + e.totalPay());
        }
    }
}`,
          hints: [
            'The Employee base class needs a constructor that takes name and salary, plus a totalPay() method returning salary.',
            'Manager extends Employee: call super(name, salary) in the constructor, then set this.bonus. Override totalPay() to return salary + bonus.',
            'Developer extends Employee: call super(name, salary) in the constructor, then set this.language. The default totalPay() from Employee already returns salary.',
          ],
        },
      },
      {
        id: 'polymorphism',
        title: 'Polymorphism',
        difficulty: 'intermediate',
        tags: ['polymorphism', 'dynamic-dispatch', 'runtime', 'upcasting'],
        cheatSheetSummary: 'Parent ref = new Child(). Method calls are resolved at runtime based on actual object type. This is dynamic dispatch.',
        sections: [
          {
            heading: 'Runtime Polymorphism',
            content:
              'Polymorphism means a parent-type reference can point to a child-type object. When you call a method through the parent reference, Java uses dynamic dispatch to call the child version of the method at runtime. This allows you to write code that works with the parent type but automatically handles different child behaviors.',
            code: `public class PolymorphismDemo {
    static abstract class Payment {
        double amount;

        Payment(double amount) {
            this.amount = amount;
        }

        abstract String process();

        @Override
        public String toString() {
            return process() + " - $" + String.format("%.2f", amount);
        }
    }

    static class CreditCard extends Payment {
        String cardNumber;

        CreditCard(double amount, String cardNumber) {
            super(amount);
            this.cardNumber = cardNumber;
        }

        @Override
        String process() {
            return "Credit card ****" + cardNumber.substring(cardNumber.length() - 4);
        }
    }

    static class PayPal extends Payment {
        String email;

        PayPal(double amount, String email) {
            super(amount);
            this.email = email;
        }

        @Override
        String process() {
            return "PayPal (" + email + ")";
        }
    }

    static class BankTransfer extends Payment {
        BankTransfer(double amount) {
            super(amount);
        }

        @Override
        String process() {
            return "Bank Transfer";
        }
    }

    public static void main(String[] args) {
        // Parent reference, child objects
        Payment[] payments = {
            new CreditCard(99.99, "4111222233334444"),
            new PayPal(49.50, "alice@example.com"),
            new BankTransfer(200.00)
        };

        double total = 0;
        for (Payment p : payments) {
            System.out.println(p);  // dynamic dispatch calls correct process()
            total += p.amount;
        }
        System.out.printf("Total: $%.2f%n", total);
    }
}`,
            output: `Credit card ****4444 - $99.99
PayPal (alice@example.com) - $49.50
Bank Transfer - $200.00
Total: $349.49`,
            analogy: 'Think of it like a universal remote control: the remote (parent reference) has a "play" button, but what happens when you press it depends on which device (child object) is connected -- a DVD player plays a disc, a streaming box plays a stream. The remote does not need to know the details; each device handles "play" in its own way.',
            codeHighlightLines: [9, 25, 26, 27, 39, 40, 41, 50, 51, 52],
          },
          {
            heading: 'instanceof and Type Checking',
            content:
              'The instanceof operator checks whether an object is an instance of a specific class or interface. It returns true for the object actual class and all its ancestors. Use instanceof before downcasting to avoid ClassCastException. Java 16+ supports pattern matching instanceof, which combines the check and cast into one expression.',
            code: `public class InstanceOfDemo {
    static class Vehicle {
        String brand;
        Vehicle(String brand) { this.brand = brand; }
    }

    static class Car extends Vehicle {
        int doors;
        Car(String brand, int doors) { super(brand); this.doors = doors; }
    }

    static class Truck extends Vehicle {
        double payload;
        Truck(String brand, double payload) { super(brand); this.payload = payload; }
    }

    static void describe(Vehicle v) {
        // Traditional instanceof + cast
        if (v instanceof Car) {
            Car c = (Car) v;
            System.out.println("Car: " + c.brand + ", " + c.doors + " doors");
        }

        // Pattern matching instanceof (Java 16+)
        if (v instanceof Truck t) {
            System.out.println("Truck: " + t.brand + ", payload " + t.payload + "t");
        }
    }

    public static void main(String[] args) {
        Vehicle[] fleet = {
            new Car("Toyota", 4),
            new Truck("Ford", 5.0),
            new Car("Honda", 2)
        };

        for (Vehicle v : fleet) {
            describe(v);

            // Check hierarchy
            System.out.println("  is Vehicle: " + (v instanceof Vehicle));
            System.out.println("  is Car: " + (v instanceof Car));
            System.out.println("  is Truck: " + (v instanceof Truck));
        }
    }
}`,
            output: `Car: Toyota, 4 doors
  is Vehicle: true
  is Car: true
  is Truck: false
Truck: Ford, payload 5.0t
  is Vehicle: true
  is Car: false
  is Truck: true
Car: Honda, 2 doors
  is Vehicle: true
  is Car: true
  is Truck: false`,
            note: 'Pattern matching instanceof (if (v instanceof Car c)) was finalized in Java 16. It combines the type check and cast into one clean expression.',
            codeHighlightLines: [18, 19, 20, 24, 25],
          },
          {
            heading: 'Polymorphism with Collections',
            content:
              'Polymorphism is most powerful when used with collections. You can store different subtypes in a collection typed to the parent, then iterate and call methods without knowing the specific types. This is the foundation of many design patterns like Strategy, Command, and Observer.',
            code: `import java.util.ArrayList;
import java.util.List;

public class PolyCollections {
    interface Drawable {
        void draw();
        double area();
    }

    static class CircleShape implements Drawable {
        double radius;
        CircleShape(double r) { this.radius = r; }

        @Override
        public void draw() { System.out.println("Drawing circle r=" + radius); }

        @Override
        public double area() { return Math.PI * radius * radius; }
    }

    static class RectShape implements Drawable {
        double w, h;
        RectShape(double w, double h) { this.w = w; this.h = h; }

        @Override
        public void draw() { System.out.println("Drawing rect " + w + "x" + h); }

        @Override
        public double area() { return w * h; }
    }

    public static void main(String[] args) {
        List<Drawable> shapes = new ArrayList<>();
        shapes.add(new CircleShape(5));
        shapes.add(new RectShape(4, 6));
        shapes.add(new CircleShape(3));
        shapes.add(new RectShape(2, 8));

        // Polymorphic iteration
        double totalArea = 0;
        for (Drawable d : shapes) {
            d.draw();
            totalArea += d.area();
        }
        System.out.printf("Total area: %.2f%n", totalArea);
    }
}`,
            output: `Drawing circle r=5.0
Drawing rect 4.0x6.0
Drawing circle r=3.0
Drawing rect 2.0x8.0
Total area: 150.81`,
          },
        ],
        quiz: [
          {
            question: 'What is runtime polymorphism in Java?',
            options: [
              'Using generics to handle multiple types',
              'Overloading methods with different parameter lists',
              'A parent-type reference calling the child version of a method based on the actual object type',
              'Using static methods to achieve different behavior',
            ],
            correctIndex: 2,
            explanation: 'Runtime polymorphism (dynamic dispatch) means when you call a method through a parent-type reference, Java determines the actual object type at runtime and calls the child version of the method.',
          },
          {
            question: 'What does instanceof do in Java?',
            options: [
              'Creates a new instance of a class',
              'Checks whether an object is an instance of a specific class or interface',
              'Converts an object to another type',
              'Checks if two objects are equal',
            ],
            correctIndex: 1,
            explanation: 'The instanceof operator checks whether an object is an instance of a specific class or interface. It returns true for the actual class and all its ancestors in the hierarchy.',
          },
          {
            question: 'What happens when you store different subtype objects in a List<ParentType> and call a method on each?',
            options: [
              'Only the parent version of the method is called',
              'A ClassCastException is thrown',
              'Each object calls its own overridden version of the method',
              'The compiler rejects the code',
            ],
            correctIndex: 2,
            explanation: 'Due to dynamic dispatch, each object calls its own overridden version of the method, even when accessed through a parent-type reference. This is the power of polymorphism with collections.',
          },
        ],
        challenge: {
          prompt: 'Create an interface Describable with a method describe(). Implement it in three classes: Planet (name, diameter), Star (name, temperature), and Moon (name, parentPlanet). Store mixed instances in a List<Describable> and print each description using polymorphism.',
          starterCode: `import java.util.List;
import java.util.ArrayList;

public class SpaceDemo {
    interface Describable {
        String describe();
    }

    // TODO: Implement Planet, Star, and Moon classes

    public static void main(String[] args) {
        List<Describable> objects = new ArrayList<>();
        // TODO: Add Planet, Star, and Moon objects

        for (Describable d : objects) {
            System.out.println(d.describe());
        }
    }
}`,
          solutionCode: `import java.util.List;
import java.util.ArrayList;

public class SpaceDemo {
    interface Describable {
        String describe();
    }

    static class Planet implements Describable {
        String name;
        double diameter;
        Planet(String name, double diameter) { this.name = name; this.diameter = diameter; }

        @Override
        public String describe() {
            return "Planet " + name + " (diameter: " + diameter + " km)";
        }
    }

    static class Star implements Describable {
        String name;
        int temperature;
        Star(String name, int temperature) { this.name = name; this.temperature = temperature; }

        @Override
        public String describe() {
            return "Star " + name + " (temp: " + temperature + " K)";
        }
    }

    static class Moon implements Describable {
        String name;
        String parentPlanet;
        Moon(String name, String parentPlanet) { this.name = name; this.parentPlanet = parentPlanet; }

        @Override
        public String describe() {
            return "Moon " + name + " orbits " + parentPlanet;
        }
    }

    public static void main(String[] args) {
        List<Describable> objects = new ArrayList<>();
        objects.add(new Planet("Earth", 12742));
        objects.add(new Star("Sun", 5778));
        objects.add(new Moon("Luna", "Earth"));

        for (Describable d : objects) {
            System.out.println(d.describe());
        }
    }
}`,
          hints: [
            'Each class should implement the Describable interface and provide its own version of describe().',
            'The List<Describable> can hold any object that implements Describable -- this is polymorphism in action.',
            'In the loop, calling d.describe() will invoke the correct implementation for each object type at runtime.',
          ],
        },
      },
      {
        id: 'abstract-classes',
        title: 'Abstract Classes',
        difficulty: 'intermediate',
        tags: ['abstract', 'template-method', 'partial-implementation'],
        cheatSheetSummary: 'abstract class cannot be instantiated. Can have abstract methods (no body) and concrete methods. Child must implement all abstract methods.',
        sections: [
          {
            heading: 'Abstract Classes and Methods',
            content:
              'An abstract class is a class that cannot be instantiated directly. It can contain abstract methods (declared without a body using the abstract keyword) that subclasses must implement, and concrete methods with full implementations that subclasses inherit. Abstract classes are ideal when you want to provide common functionality while forcing subclasses to implement specific behavior.',
            code: `public class AbstractDemo {
    static abstract class Shape {
        String color;

        Shape(String color) {
            this.color = color;
        }

        // Abstract: subclasses MUST implement
        abstract double area();
        abstract double perimeter();

        // Concrete: subclasses inherit this
        void printInfo() {
            System.out.printf("%s %s: area=%.2f, perimeter=%.2f%n",
                color, getClass().getSimpleName(), area(), perimeter());
        }
    }

    static class Circle extends Shape {
        double radius;

        Circle(String color, double radius) {
            super(color);
            this.radius = radius;
        }

        @Override
        double area() { return Math.PI * radius * radius; }

        @Override
        double perimeter() { return 2 * Math.PI * radius; }
    }

    static class Rectangle extends Shape {
        double width, height;

        Rectangle(String color, double width, double height) {
            super(color);
            this.width = width;
            this.height = height;
        }

        @Override
        double area() { return width * height; }

        @Override
        double perimeter() { return 2 * (width + height); }
    }

    public static void main(String[] args) {
        // Shape s = new Shape("Red");  // COMPILE ERROR: cannot instantiate abstract
        Shape c = new Circle("Red", 5);
        Shape r = new Rectangle("Blue", 4, 6);

        c.printInfo();
        r.printInfo();
    }
}`,
            output: `Red Circle: area=78.54, perimeter=31.42
Blue Rectangle: area=24.00, perimeter=20.00`,
            analogy: 'Think of it like a form template: the abstract class is a partially filled-out form with some common fields already completed (concrete methods), but it has blank fields marked "REQUIRED" (abstract methods) that each specific document type must fill in on its own.',
            codeHighlightLines: [2, 10, 11, 29, 32],
          },
          {
            heading: 'Template Method Pattern',
            content:
              'The template method pattern defines the skeleton of an algorithm in an abstract class, letting subclasses override specific steps. The abstract class controls the overall flow while allowing customization of individual steps. This is one of the most common uses of abstract classes.',
            code: `public class TemplateMethod {
    static abstract class DataProcessor {
        // Template method: defines the algorithm skeleton
        final void process() {
            readData();
            transformData();
            writeOutput();
            System.out.println("Processing complete!\\n");
        }

        abstract void readData();
        abstract void transformData();

        // Hook method: optional override
        void writeOutput() {
            System.out.println("  Writing to default output...");
        }
    }

    static class CsvProcessor extends DataProcessor {
        @Override
        void readData() { System.out.println("  Reading CSV file..."); }

        @Override
        void transformData() { System.out.println("  Parsing CSV columns..."); }
    }

    static class JsonProcessor extends DataProcessor {
        @Override
        void readData() { System.out.println("  Reading JSON file..."); }

        @Override
        void transformData() { System.out.println("  Parsing JSON nodes..."); }

        @Override
        void writeOutput() { System.out.println("  Writing to JSON output..."); }
    }

    public static void main(String[] args) {
        DataProcessor csv = new CsvProcessor();
        DataProcessor json = new JsonProcessor();

        System.out.println("CSV Processing:");
        csv.process();

        System.out.println("JSON Processing:");
        json.process();
    }
}`,
            output: `CSV Processing:
  Reading CSV file...
  Parsing CSV columns...
  Writing to default output...
Processing complete!

JSON Processing:
  Reading JSON file...
  Parsing JSON nodes...
  Writing to JSON output...
Processing complete!`,
            tip: 'Mark the template method as final to prevent subclasses from changing the algorithm structure. They should only override the individual steps.',
            codeHighlightLines: [4, 5, 6, 7, 11, 12, 15],
          },
          {
            heading: 'Abstract vs Interface',
            content:
              'Abstract classes and interfaces both define contracts, but they serve different purposes. Abstract classes provide partial implementation and represent an "is-a" relationship. Interfaces define capabilities and represent a "can-do" relationship. A class can implement multiple interfaces but extend only one abstract class.',
            code: `public class AbstractVsInterface {
    // Interface: defines capabilities
    interface Flyable {
        void fly();
        default String description() { return "Can fly"; }
    }

    interface Swimmable {
        void swim();
    }

    // Abstract class: provides shared implementation
    static abstract class Bird {
        String name;
        Bird(String name) { this.name = name; }
        abstract void makeSound();
        void breathe() { System.out.println(name + " breathes air"); }
    }

    // Can extend one class AND implement multiple interfaces
    static class Duck extends Bird implements Flyable, Swimmable {
        Duck(String name) { super(name); }

        @Override
        public void makeSound() { System.out.println(name + ": Quack!"); }

        @Override
        public void fly() { System.out.println(name + " flies (not very well)"); }

        @Override
        public void swim() { System.out.println(name + " swims gracefully"); }
    }

    public static void main(String[] args) {
        Duck duck = new Duck("Donald");
        duck.breathe();     // from abstract class
        duck.makeSound();   // implemented abstract method
        duck.fly();         // from Flyable
        duck.swim();        // from Swimmable
        System.out.println(duck.description()); // default method
    }
}`,
            output: `Donald breathes air
Donald: Quack!
Donald flies (not very well)
Donald swims gracefully
Can fly`,
            analogy: 'Think of it like job qualifications: an abstract class is your degree (you can only have one major -- single inheritance), while interfaces are certifications (you can earn many -- multiple implementation). A Duck "is a" Bird (degree) and "can do" Flyable and Swimmable (certifications).',
          },
        ],
        quiz: [
          {
            question: 'Can you create an instance of an abstract class directly?',
            options: [
              'Yes, with the new keyword',
              'Yes, but only if it has a constructor',
              'No, abstract classes cannot be instantiated directly',
              'Yes, but only within the same package',
            ],
            correctIndex: 2,
            explanation: 'Abstract classes cannot be instantiated directly. You must create a concrete subclass that implements all abstract methods, then instantiate that subclass.',
          },
          {
            question: 'What is the template method pattern?',
            options: [
              'A way to generate code from templates',
              'An abstract class that defines the algorithm skeleton, with subclasses overriding specific steps',
              'A method that creates template strings',
              'A pattern for creating generic classes',
            ],
            correctIndex: 1,
            explanation: 'The template method pattern defines the skeleton of an algorithm in an abstract class (often as a final method), letting subclasses override individual steps while the overall flow is controlled by the base class.',
          },
          {
            question: 'How does an abstract class differ from an interface?',
            options: [
              'Abstract classes cannot have methods with implementations',
              'Abstract classes can have constructors, state, and both abstract and concrete methods; interfaces primarily define contracts',
              'Interfaces can only have static methods',
              'There is no difference in modern Java',
            ],
            correctIndex: 1,
            explanation: 'Abstract classes can have constructors, instance fields, and both abstract and concrete methods. Interfaces primarily define method contracts, though Java 8+ added default and static methods. A class can extend one abstract class but implement many interfaces.',
          },
        ],
        challenge: {
          prompt: 'Create an abstract class Converter with an abstract method convert(double value) and a concrete method printConversion(double value) that prints the original and converted values. Create two subclasses: CelsiusToFahrenheit and KmToMiles, each implementing convert().',
          starterCode: `public class ConverterDemo {
    static abstract class Converter {
        // TODO: abstract convert method
        // TODO: concrete printConversion method
    }

    // TODO: CelsiusToFahrenheit subclass

    // TODO: KmToMiles subclass

    public static void main(String[] args) {
        Converter tempConv = new CelsiusToFahrenheit();
        Converter distConv = new KmToMiles();

        tempConv.printConversion(100);
        tempConv.printConversion(0);
        distConv.printConversion(42.195);
    }
}`,
          solutionCode: `public class ConverterDemo {
    static abstract class Converter {
        abstract double convert(double value);
        abstract String unitLabel();

        void printConversion(double value) {
            System.out.printf("%.2f -> %.2f %s%n", value, convert(value), unitLabel());
        }
    }

    static class CelsiusToFahrenheit extends Converter {
        @Override
        double convert(double value) {
            return value * 9.0 / 5.0 + 32;
        }

        @Override
        String unitLabel() { return "°F"; }
    }

    static class KmToMiles extends Converter {
        @Override
        double convert(double value) {
            return value * 0.621371;
        }

        @Override
        String unitLabel() { return "miles"; }
    }

    public static void main(String[] args) {
        Converter tempConv = new CelsiusToFahrenheit();
        Converter distConv = new KmToMiles();

        tempConv.printConversion(100);
        tempConv.printConversion(0);
        distConv.printConversion(42.195);
    }
}`,
          hints: [
            'The abstract Converter class should declare convert(double value) as abstract and provide a concrete printConversion() that calls convert().',
            'CelsiusToFahrenheit converts using: fahrenheit = celsius * 9/5 + 32.',
            'KmToMiles converts using: miles = km * 0.621371.',
          ],
        },
      },
      {
        id: 'interfaces',
        title: 'Interfaces',
        difficulty: 'intermediate',
        tags: ['interface', 'implements', 'default-methods', 'contract'],
        cheatSheetSummary: 'interface defines a contract. Methods are implicitly public abstract. Java 8+ supports default and static methods.',
        sections: [
          {
            heading: 'Defining and Implementing Interfaces',
            content:
              'An interface defines a contract that implementing classes must fulfill. Interface methods are implicitly public and abstract. A class implements an interface using the implements keyword and must provide bodies for all abstract methods. A class can implement multiple interfaces, enabling a form of multiple inheritance.',
            code: `public class InterfaceDemo {
    interface Printable {
        void print();
    }

    interface Saveable {
        void save(String path);
    }

    // Implementing multiple interfaces
    static class Document implements Printable, Saveable {
        String content;

        Document(String content) {
            this.content = content;
        }

        @Override
        public void print() {
            System.out.println("Printing: " + content);
        }

        @Override
        public void save(String path) {
            System.out.println("Saving to " + path + ": " + content);
        }
    }

    // Interface as parameter type
    static void printItem(Printable item) {
        item.print();
    }

    public static void main(String[] args) {
        Document doc = new Document("Hello World");
        doc.print();
        doc.save("/tmp/doc.txt");

        // Polymorphism through interfaces
        printItem(doc);

        // Anonymous implementation
        Printable quick = new Printable() {
            @Override
            public void print() {
                System.out.println("Quick print!");
            }
        };
        printItem(quick);
    }
}`,
            output: `Printing: Hello World
Saving to /tmp/doc.txt: Hello World
Printing: Hello World
Quick print!`,
            analogy: 'Think of it like a power outlet standard: the interface defines the shape and voltage of the plug (the contract), and any device (class) that matches that plug shape can be used. A Document fits both the Printable and Saveable outlets.',
            codeHighlightLines: [2, 3, 6, 7, 11],
          },
          {
            heading: 'Default and Static Methods',
            content:
              'Java 8 introduced default methods (with implementation) and static methods in interfaces. Default methods allow adding new functionality to interfaces without breaking existing implementations. Static methods provide utility functions related to the interface.',
            code: `public class DefaultMethods {
    interface Collection {
        int size();
        boolean isEmpty();

        // Default method: provides a default implementation
        default boolean isNotEmpty() {
            return !isEmpty();
        }

        // Static factory method
        static <T> void printAll(Iterable<T> items) {
            for (T item : items) {
                System.out.print(item + " ");
            }
            System.out.println();
        }
    }

    interface Loggable {
        default void log(String message) {
            System.out.println("[LOG] " + message);
        }
    }

    // Implementing both interfaces with defaults
    static class SmartList implements Collection, Loggable {
        private final java.util.List<String> items = new java.util.ArrayList<>();

        void add(String item) {
            items.add(item);
            log("Added: " + item);
        }

        @Override
        public int size() { return items.size(); }

        @Override
        public boolean isEmpty() { return items.isEmpty(); }

        @Override
        public String toString() { return items.toString(); }
    }

    public static void main(String[] args) {
        SmartList list = new SmartList();
        System.out.println("Empty: " + list.isEmpty());
        System.out.println("Not empty: " + list.isNotEmpty());

        list.add("Alice");
        list.add("Bob");

        System.out.println("Size: " + list.size());
        System.out.println("Not empty: " + list.isNotEmpty());

        // Static method on interface
        Collection.printAll(java.util.List.of("X", "Y", "Z"));
    }
}`,
            output: `Empty: true
Not empty: false
[LOG] Added: Alice
[LOG] Added: Bob
Size: 2
Not empty: true
X Y Z`,
            note: 'Default methods were introduced in Java 8. They allow evolving interfaces without breaking backward compatibility.',
          },
          {
            heading: 'Functional Interfaces',
            content:
              'A functional interface has exactly one abstract method and can be used with lambda expressions. Java provides many built-in functional interfaces in java.util.function (Predicate, Function, Consumer, Supplier). Mark your own with @FunctionalInterface to get compile-time verification.',
            code: `import java.util.function.*;
import java.util.List;
import java.util.ArrayList;

public class FunctionalInterfaces {
    // Custom functional interface
    @FunctionalInterface
    interface Transformer<T> {
        T transform(T input);
    }

    static <T> List<T> applyToAll(List<T> items, Transformer<T> t) {
        List<T> result = new ArrayList<>();
        for (T item : items) result.add(t.transform(item));
        return result;
    }

    public static void main(String[] args) {
        // Custom functional interface with lambda
        List<String> names = List.of("alice", "bob", "charlie");
        List<String> upper = applyToAll(names, s -> s.toUpperCase());
        System.out.println("Upper: " + upper);

        // Built-in functional interfaces
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Function<String, Integer> length = String::length;
        Consumer<String> printer = System.out::println;
        Supplier<Double> random = Math::random;

        System.out.println("4 is even: " + isEven.test(4));
        System.out.println("Length of 'hello': " + length.apply("hello"));
        printer.accept("Printed via Consumer!");
        System.out.println("Random: " + random.get());

        // Composing predicates
        Predicate<Integer> isPositive = n -> n > 0;
        Predicate<Integer> isPositiveAndEven = isPositive.and(isEven);
        System.out.println("-4 pos+even: " + isPositiveAndEven.test(-4));
        System.out.println("4 pos+even: " + isPositiveAndEven.test(4));
    }
}`,
            output: `Upper: [ALICE, BOB, CHARLIE]
4 is even: true
Length of 'hello': 5
Printed via Consumer!
Random: 0.7231742029971469
-4 pos+even: false
4 pos+even: true`,
            tip: 'The @FunctionalInterface annotation is optional but recommended. It causes a compile error if the interface has more than one abstract method.',
            codeHighlightLines: [7, 8, 9, 21, 25, 26, 27, 28],
          },
        ],
        quiz: [
          {
            question: 'What are interface methods implicitly in Java?',
            options: [
              'private and final',
              'protected and abstract',
              'public and abstract',
              'static and final',
            ],
            correctIndex: 2,
            explanation: 'Interface methods are implicitly public and abstract (unless they are default or static methods). Implementing classes must provide public implementations for all abstract methods.',
          },
          {
            question: 'What is a default method in an interface?',
            options: [
              'A method that uses default access modifier',
              'A method with a body that implementing classes inherit but can override',
              'The first method declared in the interface',
              'A method that cannot be overridden',
            ],
            correctIndex: 1,
            explanation: 'A default method (introduced in Java 8) has the "default" keyword and provides an implementation body. Implementing classes inherit it automatically but can override it if needed.',
          },
          {
            question: 'What is a functional interface?',
            options: [
              'An interface with only static methods',
              'An interface with exactly one abstract method, usable with lambda expressions',
              'An interface that extends Function',
              'An interface that cannot have default methods',
            ],
            correctIndex: 1,
            explanation: 'A functional interface has exactly one abstract method and can be used with lambda expressions. Examples include Predicate<T>, Function<T,R>, Consumer<T>, and Supplier<T>.',
          },
          {
            question: 'How many interfaces can a single Java class implement?',
            options: ['Only one', 'Two', 'Three', 'Unlimited'],
            correctIndex: 3,
            explanation: 'A Java class can implement an unlimited number of interfaces. This is Java\'s way of achieving a form of multiple inheritance, since a class can only extend one class.',
          },
        ],
        challenge: {
          prompt: 'Create an interface Sortable<T> with a method int compareTo(T other). Implement it in a Student class (compare by GPA descending). Write a static method that finds the "best" element from an array of Sortable items.',
          starterCode: `public class SortableDemo {
    interface Sortable<T> {
        int compareTo(T other);
    }

    // TODO: Implement Student class with name, gpa

    // TODO: Static method to find best (highest compareTo) element

    public static void main(String[] args) {
        Student[] students = {
            new Student("Alice", 3.8),
            new Student("Bob", 3.9),
            new Student("Carol", 3.5)
        };

        Student best = findBest(students);
        System.out.println("Best student: " + best);
    }
}`,
          solutionCode: `public class SortableDemo {
    interface Sortable<T> {
        int compareTo(T other);
    }

    static class Student implements Sortable<Student> {
        String name;
        double gpa;

        Student(String name, double gpa) {
            this.name = name;
            this.gpa = gpa;
        }

        @Override
        public int compareTo(Student other) {
            return Double.compare(this.gpa, other.gpa);
        }

        @Override
        public String toString() {
            return name + " (GPA: " + gpa + ")";
        }
    }

    static <T extends Sortable<T>> T findBest(T[] items) {
        T best = items[0];
        for (int i = 1; i < items.length; i++) {
            if (items[i].compareTo(best) > 0) {
                best = items[i];
            }
        }
        return best;
    }

    public static void main(String[] args) {
        Student[] students = {
            new Student("Alice", 3.8),
            new Student("Bob", 3.9),
            new Student("Carol", 3.5)
        };

        Student best = findBest(students);
        System.out.println("Best student: " + best);
    }
}`,
          hints: [
            'Student should implement Sortable<Student> and compare GPAs using Double.compare(this.gpa, other.gpa).',
            'The findBest method iterates through the array, keeping track of the element with the highest compareTo result.',
            'Use a bounded type parameter <T extends Sortable<T>> for the findBest method so it works with any Sortable type.',
          ],
        },
      },
      {
        id: 'encapsulation',
        title: 'Encapsulation',
        difficulty: 'intermediate',
        tags: ['private', 'getter', 'setter', 'access-modifiers'],
        cheatSheetSummary: 'Make fields private, expose via public getters/setters. Four access levels: private, default, protected, public.',
        sections: [
          {
            heading: 'Access Modifiers',
            content:
              'Java has four access levels that control visibility. private: accessible only within the same class. default (no modifier): accessible within the same package. protected: accessible within the same package and subclasses. public: accessible from anywhere. Proper encapsulation uses private fields with public getters and setters.',
            code: `public class AccessModifiers {
    static class Person {
        // private: only this class can access
        private String name;
        private int age;

        // public constructor
        public Person(String name, int age) {
            setName(name);
            setAge(age);
        }

        // Getter: read access
        public String getName() {
            return name;
        }

        // Setter: write access with validation
        public void setName(String name) {
            if (name == null || name.isBlank()) {
                throw new IllegalArgumentException("Name cannot be blank");
            }
            this.name = name;
        }

        public int getAge() {
            return age;
        }

        public void setAge(int age) {
            if (age < 0 || age > 150) {
                throw new IllegalArgumentException("Invalid age: " + age);
            }
            this.age = age;
        }

        @Override
        public String toString() {
            return name + " (age " + age + ")";
        }
    }

    public static void main(String[] args) {
        Person p = new Person("Alice", 30);
        System.out.println(p);

        p.setAge(31);
        System.out.println("After birthday: " + p);

        // Validation prevents invalid state
        try {
            p.setAge(-5);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Cannot access private field directly:
        // p.name = "Bob";  // COMPILE ERROR
    }
}`,
            output: `Alice (age 30)
After birthday: Alice (age 31)
Error: Invalid age: -5`,
            analogy: 'Think of it like a bank vault: the fields are valuables stored inside (private), and getters/setters are the teller window -- customers (other classes) interact through a controlled interface with built-in checks, rather than walking into the vault directly.',
            codeHighlightLines: [4, 5, 14, 15, 19, 20, 21],
          },
          {
            heading: 'Immutable Classes',
            content:
              'An immutable class creates objects whose state cannot change after construction. This is achieved by making all fields final and private, providing no setters, returning defensive copies of mutable fields, and making the class final to prevent subclassing. Immutable objects are thread-safe and can be freely shared.',
            code: `import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

public class ImmutableDemo {
    static final class ImmutableStudent {
        private final String name;
        private final int age;
        private final List<String> courses;

        ImmutableStudent(String name, int age, List<String> courses) {
            this.name = name;
            this.age = age;
            // Defensive copy: don't store the original mutable list
            this.courses = new ArrayList<>(courses);
        }

        public String getName() { return name; }
        public int getAge() { return age; }

        // Return unmodifiable view: caller cannot modify internal list
        public List<String> getCourses() {
            return Collections.unmodifiableList(courses);
        }

        // "Wither" method: returns a new object with one field changed
        public ImmutableStudent withAge(int newAge) {
            return new ImmutableStudent(name, newAge, courses);
        }

        @Override
        public String toString() {
            return name + " (age " + age + ") - " + courses;
        }
    }

    public static void main(String[] args) {
        List<String> courses = new ArrayList<>(List.of("Math", "CS"));
        ImmutableStudent s = new ImmutableStudent("Alice", 20, courses);

        // Original list changes do NOT affect the student
        courses.add("Physics");
        System.out.println("Student: " + s);
        System.out.println("Original list: " + courses);

        // Cannot modify returned courses
        try {
            s.getCourses().add("Chemistry");
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify courses!");
        }

        // Create modified copy
        ImmutableStudent older = s.withAge(21);
        System.out.println("Original: " + s);
        System.out.println("Modified: " + older);
    }
}`,
            output: `Student: Alice (age 20) - [Math, CS]
Original list: [Math, CS, Physics]
Cannot modify courses!
Original: Alice (age 20) - [Math, CS]
Modified: Alice (age 21) - [Math, CS]`,
            tip: 'Java records (Java 16+) provide a concise way to create immutable data classes. They auto-generate constructors, getters, equals, hashCode, and toString.',
            codeHighlightLines: [6, 7, 8, 15, 22, 23, 27, 28],
          },
          {
            heading: 'Access Modifier Summary',
            content:
              'Understanding the four access levels is essential for proper Java API design. Choose the most restrictive level that works for your use case. Start with private and widen only as needed.',
            code: `public class AccessSummary {
    // Access modifier visibility:
    //
    // Modifier    | Class | Package | Subclass | World
    // ------------|-------|---------|----------|------
    // private     |  Yes  |   No    |    No    |  No
    // (default)   |  Yes  |  Yes    |    No    |  No
    // protected   |  Yes  |  Yes    |   Yes    |  No
    // public      |  Yes  |  Yes    |   Yes    | Yes

    private int privateField = 1;
    int defaultField = 2;          // package-private
    protected int protectedField = 3;
    public int publicField = 4;

    public static void main(String[] args) {
        AccessSummary obj = new AccessSummary();

        // All accessible within same class
        System.out.println("private:   " + obj.privateField);
        System.out.println("default:   " + obj.defaultField);
        System.out.println("protected: " + obj.protectedField);
        System.out.println("public:    " + obj.publicField);

        // Best practice:
        // - Fields: always private (with getters/setters if needed)
        // - Methods: public for API, private for helpers
        // - Classes: public for API, package-private for internal
        // - Constructors: private for utility classes and singletons
        System.out.println("\\nBest practice: start private, widen as needed.");
    }
}`,
            output: `private:   1
default:   2
protected: 3
public:    4

Best practice: start private, widen as needed.`,
          },
        ],
        quiz: [
          {
            question: 'What is the purpose of making fields private in Java?',
            options: [
              'To improve performance',
              'To hide implementation details and control access through getters and setters',
              'To prevent the field from being used at all',
              'To make the field static',
            ],
            correctIndex: 1,
            explanation: 'Making fields private hides implementation details and forces access through controlled getters and setters. This allows validation in setters, computed values in getters, and the freedom to change internal representation without breaking external code.',
          },
          {
            question: 'Which access modifier allows access within the same package and by subclasses in other packages?',
            options: ['private', 'default (no modifier)', 'protected', 'public'],
            correctIndex: 2,
            explanation: 'The protected modifier allows access within the same class, the same package, and by subclasses even in different packages. It is more permissive than default (package-private) but less than public.',
          },
          {
            question: 'What makes a class immutable?',
            options: [
              'Using the static keyword on all methods',
              'Making all fields final and private, providing no setters, and returning defensive copies of mutable fields',
              'Declaring the class as abstract',
              'Using only primitive fields',
            ],
            correctIndex: 1,
            explanation: 'An immutable class has all fields final and private, no setter methods, defensive copies of mutable fields in constructor and getters, and is typically declared final to prevent subclassing.',
          },
        ],
        challenge: {
          prompt: 'Create an encapsulated BankAccount class with private fields for owner (String), balance (double), and a transaction history (List<String>). Provide getters, a deposit method with validation, a withdraw method with validation, and return an unmodifiable copy of the transaction history.',
          starterCode: `import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

public class BankAccountDemo {
    static class BankAccount {
        // TODO: private fields

        // TODO: constructor

        // TODO: getters (unmodifiable list for history)

        // TODO: deposit with validation

        // TODO: withdraw with validation
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount("Alice", 1000);
        acc.deposit(500);
        acc.withdraw(200);

        System.out.println("Owner: " + acc.getOwner());
        System.out.println("Balance: $" + acc.getBalance());
        System.out.println("History: " + acc.getHistory());

        try {
            acc.withdraw(5000);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          solutionCode: `import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

public class BankAccountDemo {
    static class BankAccount {
        private String owner;
        private double balance;
        private List<String> history;

        BankAccount(String owner, double initialBalance) {
            if (owner == null || owner.isBlank()) {
                throw new IllegalArgumentException("Owner is required");
            }
            if (initialBalance < 0) {
                throw new IllegalArgumentException("Initial balance cannot be negative");
            }
            this.owner = owner;
            this.balance = initialBalance;
            this.history = new ArrayList<>();
            this.history.add("Account opened with $" + initialBalance);
        }

        public String getOwner() { return owner; }
        public double getBalance() { return balance; }
        public List<String> getHistory() {
            return Collections.unmodifiableList(history);
        }

        public void deposit(double amount) {
            if (amount <= 0) {
                throw new IllegalArgumentException("Deposit must be positive");
            }
            balance += amount;
            history.add("Deposited $" + amount);
        }

        public void withdraw(double amount) {
            if (amount <= 0) {
                throw new IllegalArgumentException("Withdrawal must be positive");
            }
            if (amount > balance) {
                throw new IllegalArgumentException("Insufficient funds");
            }
            balance -= amount;
            history.add("Withdrew $" + amount);
        }
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount("Alice", 1000);
        acc.deposit(500);
        acc.withdraw(200);

        System.out.println("Owner: " + acc.getOwner());
        System.out.println("Balance: $" + acc.getBalance());
        System.out.println("History: " + acc.getHistory());

        try {
            acc.withdraw(5000);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          hints: [
            'Keep all fields private. The constructor should validate owner and initialBalance, then initialize the history list.',
            'The deposit and withdraw methods should validate the amount (positive, and for withdraw, not exceeding balance) before modifying the balance.',
            'Return Collections.unmodifiableList(history) from getHistory() to prevent external modification of the internal list.',
          ],
        },
      },
      {
        id: 'inner-classes',
        title: 'Inner Classes',
        difficulty: 'advanced',
        tags: ['inner-class', 'static-nested', 'anonymous', 'local'],
        cheatSheetSummary: 'Static nested: static class Inner { }. Inner: class Inner { } (holds ref to outer). Anonymous: new Interface() { }.',
        sections: [
          {
            heading: 'Types of Nested Classes',
            content:
              'Java supports four types of nested classes. A static nested class does not hold a reference to the enclosing instance. An inner class (non-static) holds an implicit reference to the outer object. A local class is defined inside a method. An anonymous class is an unnamed class defined and instantiated in one expression, commonly used before lambdas were available.',
            code: `public class NestedClasses {
    private String outerField = "outer";

    // 1. Static nested class: no reference to outer instance
    static class StaticNested {
        void show() {
            System.out.println("Static nested class");
            // Cannot access outerField (no outer instance)
        }
    }

    // 2. Inner class: holds reference to outer instance
    class Inner {
        void show() {
            System.out.println("Inner class, outerField = " + outerField);
        }
    }

    void demonstrateLocal() {
        // 3. Local class: defined inside a method
        class Local {
            void show() {
                System.out.println("Local class, outerField = " + outerField);
            }
        }
        new Local().show();
    }

    public static void main(String[] args) {
        // Static nested: no outer instance needed
        StaticNested sn = new StaticNested();
        sn.show();

        // Inner: requires outer instance
        NestedClasses outer = new NestedClasses();
        Inner inner = outer.new Inner();
        inner.show();

        // Local class
        outer.demonstrateLocal();

        // 4. Anonymous class
        Runnable anon = new Runnable() {
            @Override
            public void run() {
                System.out.println("Anonymous class running!");
            }
        };
        anon.run();

        // Lambda (replaces anonymous class for functional interfaces)
        Runnable lambda = () -> System.out.println("Lambda running!");
        lambda.run();
    }
}`,
            output: `Static nested class
Inner class, outerField = outer
Local class, outerField = outer
Anonymous class running!
Lambda running!`,
            analogy: 'Think of it like rooms in a house: a static nested class is like a detached garage -- it belongs to the property but does not need the main house to exist. An inner class is like a room inside the house -- it has direct access to everything in the house. A local class is like a pop-up tent set up temporarily in one room. An anonymous class is like a disposable paper plate -- created for one-time use and then discarded.',
          },
          {
            heading: 'Static Nested Classes as Helpers',
            content:
              'Static nested classes are commonly used for builder patterns, helper classes that logically belong to the outer class, and as node types in data structures. They are the most commonly used type of nested class in modern Java.',
            code: `import java.util.ArrayList;
import java.util.List;

public class BuilderPattern {
    // Builder as static nested class
    static class HttpRequest {
        private final String method;
        private final String url;
        private final String body;
        private final List<String> headers;

        private HttpRequest(Builder builder) {
            this.method = builder.method;
            this.url = builder.url;
            this.body = builder.body;
            this.headers = List.copyOf(builder.headers);
        }

        @Override
        public String toString() {
            return method + " " + url +
                   (body != null ? " body=" + body : "") +
                   " headers=" + headers;
        }

        // Static nested builder class
        static class Builder {
            private String method = "GET";
            private String url;
            private String body;
            private final List<String> headers = new ArrayList<>();

            Builder(String url) {
                this.url = url;
            }

            Builder method(String method) {
                this.method = method;
                return this;
            }

            Builder body(String body) {
                this.body = body;
                return this;
            }

            Builder header(String header) {
                this.headers.add(header);
                return this;
            }

            HttpRequest build() {
                if (url == null) throw new IllegalStateException("URL required");
                return new HttpRequest(this);
            }
        }
    }

    public static void main(String[] args) {
        HttpRequest get = new HttpRequest.Builder("https://api.example.com/users")
            .header("Accept: application/json")
            .build();

        HttpRequest post = new HttpRequest.Builder("https://api.example.com/users")
            .method("POST")
            .body("{\"name\":\"Alice\"}")
            .header("Content-Type: application/json")
            .header("Authorization: Bearer token123")
            .build();

        System.out.println(get);
        System.out.println(post);
    }
}`,
            output: `GET https://api.example.com/users headers=[Accept: application/json]
POST https://api.example.com/users body={"name":"Alice"} headers=[Content-Type: application/json, Authorization: Bearer token123]`,
            tip: 'The Builder pattern is the most common use of static nested classes. It provides a fluent API for constructing complex objects step by step.',
            codeHighlightLines: [27, 37, 38, 39, 42, 43, 44, 47, 48, 49, 52, 53, 54],
          },
          {
            heading: 'Anonymous Classes vs Lambdas',
            content:
              'Anonymous classes were widely used before Java 8 for implementing interfaces inline. Lambdas replaced them for functional interfaces (single abstract method). Use lambdas when possible for cleaner code. Use anonymous classes when you need to implement multiple methods or need to access the instance with this.',
            code: `import java.util.Arrays;
import java.util.Comparator;

public class AnonVsLambda {
    interface Greeting {
        String greet(String name);
    }

    public static void main(String[] args) {
        // Anonymous class (verbose)
        Greeting anon = new Greeting() {
            @Override
            public String greet(String name) {
                return "Hello, " + name + "!";
            }
        };
        System.out.println(anon.greet("Alice"));

        // Lambda (concise) — preferred for functional interfaces
        Greeting lambda = name -> "Hi, " + name + "!";
        System.out.println(lambda.greet("Bob"));

        // Sorting: anonymous class vs lambda
        String[] words = {"banana", "apple", "cherry"};

        // Anonymous class version
        Arrays.sort(words, new Comparator<String>() {
            @Override
            public int compare(String a, String b) {
                return a.length() - b.length();
            }
        });
        System.out.println("Anonymous: " + Arrays.toString(words));

        // Lambda version
        String[] words2 = {"banana", "apple", "cherry"};
        Arrays.sort(words2, (a, b) -> a.length() - b.length());
        System.out.println("Lambda: " + Arrays.toString(words2));

        // Method reference (even more concise)
        String[] words3 = {"banana", "apple", "cherry"};
        Arrays.sort(words3, Comparator.comparingInt(String::length));
        System.out.println("MethodRef: " + Arrays.toString(words3));
    }
}`,
            output: `Hello, Alice!
Hi, Bob!
Anonymous: [apple, banana, cherry]
Lambda: [apple, banana, cherry]
MethodRef: [apple, banana, cherry]`,
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Exception Handling                                            */
  /* ------------------------------------------------------------ */
  {
    id: 'java-exceptions',
    label: 'Exception Handling',
    icon: 'AlertTriangle',
    entries: [
      {
        id: 'try-catch',
        title: 'Try-Catch-Finally',
        difficulty: 'beginner',
        tags: ['try', 'catch', 'finally', 'exception'],
        cheatSheetSummary: 'try { risky code } catch (ExceptionType e) { handle } finally { cleanup }. Finally always runs.',
        sections: [
          {
            heading: 'Basic Exception Handling',
            content:
              'Exceptions are objects that represent errors or abnormal conditions. The try block contains code that might throw an exception. The catch block handles specific exception types. The finally block runs regardless of whether an exception occurred and is used for cleanup. Multiple catch blocks can handle different exception types.',
            code: `public class TryCatchDemo {
    public static void main(String[] args) {
        // Basic try-catch
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Multiple catch blocks
        try {
            String text = null;
            System.out.println(text.length());
        } catch (NullPointerException e) {
            System.out.println("Null pointer: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Other error: " + e.getMessage());
        }

        // Try-catch-finally
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[5]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Index out of bounds!");
        } finally {
            System.out.println("Finally block always runs");
        }

        // Multi-catch (Java 7+): same handler for multiple types
        try {
            String s = "abc";
            int num = Integer.parseInt(s);
        } catch (NumberFormatException | IllegalArgumentException e) {
            System.out.println("Parse error: " + e.getMessage());
        }

        System.out.println("Program continues after exception handling");
    }
}`,
            output: `Error: / by zero
Null pointer: Cannot invoke "String.length()" because "text" is null
Index out of bounds!
Finally block always runs
Parse error: For input string: "abc"
Program continues after exception handling`,
            analogy: 'Think of it like a safety net at a circus: the try block is the tightrope walk (risky code), the catch block is the net that catches the performer if they fall (specific error handling), and the finally block is the cleanup crew that comes out regardless of whether anyone fell.',
            codeHighlightLines: [4, 5, 6, 26, 27, 34],
          },
          {
            heading: 'Throwing Exceptions',
            content:
              'Use the throw keyword to throw an exception. The throws clause in a method signature declares that the method might throw checked exceptions. This is required by the compiler for checked exceptions but optional for unchecked exceptions. Use throw to signal error conditions to the caller.',
            code: `public class ThrowDemo {
    static int divide(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("Cannot divide by zero");
        }
        return a / b;
    }

    static int parseAge(String input) {
        int age = Integer.parseInt(input);  // may throw NumberFormatException
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("Age must be 0-150, got: " + age);
        }
        return age;
    }

    static String readRequired(String value, String fieldName) {
        if (value == null || value.isBlank()) {
            throw new NullPointerException(fieldName + " is required");
        }
        return value.trim();
    }

    public static void main(String[] args) {
        // Handling thrown exceptions
        try {
            System.out.println(divide(10, 3));
            System.out.println(divide(10, 0));
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        }

        try {
            System.out.println("Age: " + parseAge("25"));
            System.out.println("Age: " + parseAge("-5"));
        } catch (IllegalArgumentException e) {
            System.out.println("Invalid: " + e.getMessage());
        }

        try {
            readRequired(null, "email");
        } catch (NullPointerException e) {
            System.out.println("Missing: " + e.getMessage());
        }
    }
}`,
            output: `3
Error: Cannot divide by zero
Age: 25
Invalid: Age must be 0-150, got: -5
Missing: email is required`,
            codeHighlightLines: [3, 4, 11, 12, 18, 19],
          },
          {
            heading: 'Exception Best Practices',
            content:
              'Good exception handling follows several principles: catch specific exceptions (not just Exception), do not swallow exceptions silently, include useful messages, and use exceptions for exceptional conditions not for control flow. Log or rethrow exceptions rather than catching and ignoring them.',
            code: `public class ExceptionBestPractices {
    // BAD: catching Exception is too broad
    static void bad1() {
        try {
            // some code
        } catch (Exception e) {
            // swallowed! No one knows an error occurred
        }
    }

    // GOOD: catch specific, log/handle meaningfully
    static int safeDivide(int a, int b) {
        try {
            return a / b;
        } catch (ArithmeticException e) {
            System.err.println("Warning: division by zero, returning 0");
            return 0;
        }
    }

    // GOOD: wrap and rethrow with context
    static void processData(String data) {
        try {
            int value = Integer.parseInt(data);
            System.out.println("Processed: " + value);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException(
                "Invalid data format: '" + data + "'", e  // preserve cause
            );
        }
    }

    public static void main(String[] args) {
        System.out.println(safeDivide(10, 0));

        try {
            processData("abc");
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
            System.out.println("Caused by: " + e.getCause().getClass().getSimpleName());
        }

        // Use stack trace for debugging
        try {
            String s = null;
            s.length();
        } catch (NullPointerException e) {
            System.out.println("NPE at: " + e.getStackTrace()[0]);
        }
    }
}`,
            output: `Warning: division by zero, returning 0
0
Error: Invalid data format: 'abc'
Caused by: NumberFormatException
NPE at: ExceptionBestPractices.main(ExceptionBestPractices.java:44)`,
            warning: 'Never write catch (Exception e) { } with an empty body. This swallows ALL errors silently and makes debugging nearly impossible.',
          },
        ],
      },
      {
        id: 'checked-unchecked',
        title: 'Checked vs Unchecked Exceptions',
        difficulty: 'intermediate',
        tags: ['checked', 'unchecked', 'RuntimeException', 'IOException'],
        cheatSheetSummary: 'Checked: must catch or declare (IOException, SQLException). Unchecked: RuntimeException subclasses (NPE, IllegalArgument).',
        sections: [
          {
            heading: 'The Exception Hierarchy',
            content:
              'All exceptions extend Throwable. Errors (OutOfMemoryError, StackOverflowError) are serious JVM problems you should not catch. Checked exceptions (IOException, SQLException) extend Exception and MUST be caught or declared in throws. Unchecked exceptions extend RuntimeException and are optional to catch. The compiler enforces handling of checked exceptions.',
            code: `import java.io.*;

public class CheckedUnchecked {
    // Checked exception: MUST declare or catch
    static String readFile(String path) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(path));
        try {
            return reader.readLine();
        } finally {
            reader.close();
        }
    }

    // Unchecked exception: no declaration required
    static int safeDivide(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("Division by zero");
            // ArithmeticException is unchecked - no throws needed
        }
        return a / b;
    }

    public static void main(String[] args) {
        // Must handle checked exception
        try {
            String content = readFile("nonexistent.txt");
        } catch (IOException e) {
            System.out.println("Checked exception: " + e.getClass().getSimpleName());
        }

        // Unchecked exception: can handle or let propagate
        try {
            safeDivide(10, 0);
        } catch (ArithmeticException e) {
            System.out.println("Unchecked exception: " + e.getMessage());
        }

        // Common unchecked exceptions
        System.out.println("\\nCommon unchecked exceptions:");
        System.out.println("NullPointerException - accessing null reference");
        System.out.println("ArrayIndexOutOfBoundsException - bad array index");
        System.out.println("ClassCastException - invalid type cast");
        System.out.println("IllegalArgumentException - bad method argument");
        System.out.println("NumberFormatException - invalid number string");
    }
}`,
            output: `Checked exception: FileNotFoundException
Unchecked exception: Division by zero

Common unchecked exceptions:
NullPointerException - accessing null reference
ArrayIndexOutOfBoundsException - bad array index
ClassCastException - invalid type cast
IllegalArgumentException - bad method argument
NumberFormatException - invalid number string`,
            analogy: 'Think of it like traffic rules: checked exceptions are like mandatory stop signs -- the compiler (traffic cop) forces you to handle them or declare them. Unchecked exceptions are like potholes -- they can trip you up at runtime, but the compiler does not force you to plan for every one.',
            diagram: {
              kind: 'mermaid',
              code: `graph TD
    A[Throwable] --> B[Error]
    A --> C[Exception]
    B --> D[OutOfMemoryError]
    B --> E[StackOverflowError]
    C --> F[IOException - Checked]
    C --> G[SQLException - Checked]
    C --> H[RuntimeException]
    H --> I[NullPointerException - Unchecked]
    H --> J[IllegalArgumentException - Unchecked]
    H --> K[ArithmeticException - Unchecked]`,
              caption: 'Java Exception Hierarchy: Checked exceptions extend Exception directly; unchecked exceptions extend RuntimeException.',
            },
          },
          {
            heading: 'When to Use Each Type',
            content:
              'Use checked exceptions for recoverable conditions where the caller can reasonably handle the error (file not found, network timeout). Use unchecked exceptions for programming errors (null pointers, invalid arguments) that indicate bugs. This is a design decision with strong opinions in the Java community.',
            code: `public class ExceptionDesign {
    // Checked: caller should handle this (recoverable)
    static class InsufficientFundsException extends Exception {
        private final double deficit;

        InsufficientFundsException(double deficit) {
            super("Insufficient funds: need $" + String.format("%.2f", deficit) + " more");
            this.deficit = deficit;
        }

        double getDeficit() { return deficit; }
    }

    // Unchecked: programming error (not recoverable by caller)
    static class InvalidAccountException extends RuntimeException {
        InvalidAccountException(String id) {
            super("No account found with ID: " + id);
        }
    }

    static double withdraw(double balance, double amount) throws InsufficientFundsException {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");  // unchecked
        }
        if (amount > balance) {
            throw new InsufficientFundsException(amount - balance);  // checked
        }
        return balance - amount;
    }

    public static void main(String[] args) {
        double balance = 100.0;

        try {
            balance = withdraw(balance, 30);
            System.out.printf("After $30 withdrawal: $%.2f%n", balance);

            balance = withdraw(balance, 200);
        } catch (InsufficientFundsException e) {
            System.out.println(e.getMessage());
            System.out.printf("Deficit: $%.2f%n", e.getDeficit());
        }
    }
}`,
            output: `After $30 withdrawal: $70.00
Insufficient funds: need $130.00 more
Deficit: 130.00`,
            tip: 'Modern Java practice tends to favor unchecked exceptions. Many frameworks (Spring, Hibernate) wrap checked exceptions in unchecked ones for cleaner APIs.',
            codeHighlightLines: [3, 14, 20, 22, 25, 26],
          },
        ],
      },
      {
        id: 'custom-exceptions',
        title: 'Custom Exceptions',
        difficulty: 'intermediate',
        tags: ['custom', 'exception-class', 'domain', 'hierarchy'],
        cheatSheetSummary: 'Extend Exception (checked) or RuntimeException (unchecked). Add constructors, context fields, and factory methods.',
        sections: [
          {
            heading: 'Creating Custom Exception Classes',
            content:
              'Custom exceptions represent domain-specific error conditions. Extend Exception for checked exceptions that callers must handle. Extend RuntimeException for unchecked exceptions. Include constructors that accept a message, a cause, and any domain-specific data. Provide a descriptive class name that communicates the problem.',
            code: `public class CustomExceptions {
    // Domain-specific unchecked exception
    static class ValidationException extends RuntimeException {
        private final String field;
        private final Object rejectedValue;

        ValidationException(String field, Object rejectedValue, String message) {
            super(message);
            this.field = field;
            this.rejectedValue = rejectedValue;
        }

        String getField() { return field; }
        Object getRejectedValue() { return rejectedValue; }
    }

    // Domain-specific checked exception
    static class UserNotFoundException extends Exception {
        private final String userId;

        UserNotFoundException(String userId) {
            super("User not found: " + userId);
            this.userId = userId;
        }

        String getUserId() { return userId; }
    }

    static void validateAge(int age) {
        if (age < 0 || age > 150) {
            throw new ValidationException("age", age,
                "Age must be between 0 and 150");
        }
    }

    static String findUser(String id) throws UserNotFoundException {
        if (!"user-123".equals(id)) {
            throw new UserNotFoundException(id);
        }
        return "Alice";
    }

    public static void main(String[] args) {
        // Unchecked: optional catch
        try {
            validateAge(200);
        } catch (ValidationException e) {
            System.out.println("Validation failed:");
            System.out.println("  Field: " + e.getField());
            System.out.println("  Value: " + e.getRejectedValue());
            System.out.println("  Message: " + e.getMessage());
        }

        // Checked: must catch
        try {
            String name = findUser("user-456");
        } catch (UserNotFoundException e) {
            System.out.println("\\nUser error: " + e.getMessage());
            System.out.println("Tried ID: " + e.getUserId());
        }
    }
}`,
            output: `Validation failed:
  Field: age
  Value: 200
  Message: Age must be between 0 and 150

User error: User not found: user-456
Tried ID: user-456`,
            analogy: 'Think of it like custom error codes on a restaurant receipt: rather than a generic "problem with your order" (generic Exception), a custom exception like ValidationException tells you exactly what went wrong -- which field, what value was rejected, and why. It is like the receipt saying "Item: soup, Issue: out of stock" instead of just "Error."',
            codeHighlightLines: [3, 4, 5, 18, 19],
          },
          {
            heading: 'Exception Hierarchy for a Domain',
            content:
              'For larger applications, create an exception hierarchy with a common base exception. This allows callers to catch all domain exceptions with a single catch block or handle specific subtypes individually. This pattern is common in libraries and frameworks.',
            code: `public class ExceptionHierarchy {
    // Base exception for the entire application
    static class AppException extends RuntimeException {
        private final String errorCode;

        AppException(String errorCode, String message) {
            super(message);
            this.errorCode = errorCode;
        }

        AppException(String errorCode, String message, Throwable cause) {
            super(message, cause);
            this.errorCode = errorCode;
        }

        String getErrorCode() { return errorCode; }
    }

    // Specific exceptions
    static class AuthException extends AppException {
        AuthException(String message) {
            super("AUTH_ERROR", message);
        }
    }

    static class DataException extends AppException {
        DataException(String message, Throwable cause) {
            super("DATA_ERROR", message, cause);
        }
    }

    static void authenticate(String token) {
        if (!"valid-token".equals(token)) {
            throw new AuthException("Invalid authentication token");
        }
    }

    static int parseData(String data) {
        try {
            return Integer.parseInt(data);
        } catch (NumberFormatException e) {
            throw new DataException("Failed to parse: " + data, e);
        }
    }

    public static void main(String[] args) {
        // Catch specific type
        try {
            authenticate("bad-token");
        } catch (AuthException e) {
            System.out.println("[" + e.getErrorCode() + "] " + e.getMessage());
        }

        // Catch base type for all app exceptions
        try {
            parseData("not-a-number");
        } catch (AppException e) {
            System.out.println("[" + e.getErrorCode() + "] " + e.getMessage());
            System.out.println("Cause: " + e.getCause().getMessage());
        }
    }
}`,
            output: `[AUTH_ERROR] Invalid authentication token
[DATA_ERROR] Failed to parse: not-a-number
Cause: For input string: "not-a-number"`,
            codeHighlightLines: [3, 20, 21, 26, 27, 57],
          },
        ],
      },
      {
        id: 'try-with-resources',
        title: 'Try-With-Resources',
        difficulty: 'intermediate',
        tags: ['try-with-resources', 'AutoCloseable', 'resource-management'],
        cheatSheetSummary: 'try (Resource r = open()) { use r } — automatically calls r.close(). Resource must implement AutoCloseable.',
        sections: [
          {
            heading: 'Automatic Resource Management',
            content:
              'Try-with-resources (Java 7+) automatically closes resources when the try block exits, whether normally or via exception. Resources must implement AutoCloseable. This eliminates the need for explicit finally blocks for cleanup and prevents resource leaks. Multiple resources can be declared, separated by semicolons.',
            code: `import java.io.*;

public class TryWithResources {
    public static void main(String[] args) {
        // Traditional approach (verbose, error-prone)
        BufferedReader reader1 = null;
        try {
            reader1 = new BufferedReader(new StringReader("Line 1\\nLine 2"));
            System.out.println("Old style: " + reader1.readLine());
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader1 != null) {
                try { reader1.close(); } catch (IOException e) { /* ignored */ }
            }
        }

        // Try-with-resources (clean, safe)
        try (BufferedReader reader2 = new BufferedReader(new StringReader("Line 1\\nLine 2"))) {
            System.out.println("New style: " + reader2.readLine());
        } catch (IOException e) {
            e.printStackTrace();
        }
        // reader2.close() called automatically!

        // Multiple resources
        try (
            StringReader sr = new StringReader("Hello");
            BufferedReader br = new BufferedReader(sr)
        ) {
            System.out.println("Multi: " + br.readLine());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}`,
            output: `Old style: Line 1
New style: Line 1
Multi: Hello`,
            analogy: 'Think of it like a self-closing door: the try-with-resources syntax is a door that automatically closes behind you when you leave the room (the try block), whether you walk out normally or are carried out by an exception. No more forgetting to close the door in the finally block.',
          },
          {
            heading: 'Custom AutoCloseable Resources',
            content:
              'You can create your own resources that work with try-with-resources by implementing AutoCloseable. This is useful for database connections, network sockets, locks, and any resource that needs deterministic cleanup. The close() method is called in reverse order of declaration.',
            code: `public class CustomResource {
    static class DatabaseConnection implements AutoCloseable {
        private final String name;
        private boolean open;

        DatabaseConnection(String name) {
            this.name = name;
            this.open = true;
            System.out.println("  Opening connection: " + name);
        }

        void query(String sql) {
            if (!open) throw new IllegalStateException("Connection closed!");
            System.out.println("  Executing on " + name + ": " + sql);
        }

        @Override
        public void close() {
            if (open) {
                open = false;
                System.out.println("  Closing connection: " + name);
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("Normal flow:");
        try (DatabaseConnection db = new DatabaseConnection("primary")) {
            db.query("SELECT * FROM users");
            db.query("SELECT * FROM orders");
        }

        System.out.println("\\nException flow:");
        try (DatabaseConnection db = new DatabaseConnection("secondary")) {
            db.query("SELECT 1");
            throw new RuntimeException("Something went wrong!");
        } catch (RuntimeException e) {
            System.out.println("  Caught: " + e.getMessage());
        }
        // close() is still called even though exception occurred!

        System.out.println("\\nMultiple resources (closed in reverse order):");
        try (
            DatabaseConnection db1 = new DatabaseConnection("conn-1");
            DatabaseConnection db2 = new DatabaseConnection("conn-2")
        ) {
            db1.query("USE db1");
            db2.query("USE db2");
        }
    }
}`,
            output: `Normal flow:
  Opening connection: primary
  Executing on primary: SELECT * FROM users
  Executing on primary: SELECT * FROM orders
  Closing connection: primary

Exception flow:
  Opening connection: secondary
  Executing on secondary: SELECT 1
  Closing connection: secondary
  Caught: Something went wrong!

Multiple resources (closed in reverse order):
  Opening connection: conn-1
  Opening connection: conn-2
  Executing on conn-1: USE db1
  Executing on conn-2: USE db2
  Closing connection: conn-2
  Closing connection: conn-1`,
            tip: 'Try-with-resources handles "suppressed exceptions" -- if both the try block and close() throw, the close() exception is attached as a suppressed exception to the primary one.',
            codeHighlightLines: [2, 17, 18, 28, 43, 44, 45],
          },
          {
            heading: 'Suppressed Exceptions',
            content:
              'When both the try block and the close() method throw exceptions, the try block exception is the primary one, and the close() exception is added as a "suppressed" exception. This ensures no exceptions are silently lost, which was a problem with the traditional finally approach.',
            code: `public class SuppressedExceptions {
    static class FlakyResource implements AutoCloseable {
        void use() {
            throw new RuntimeException("Error in use()");
        }

        @Override
        public void close() {
            throw new RuntimeException("Error in close()");
        }
    }

    public static void main(String[] args) {
        try (FlakyResource r = new FlakyResource()) {
            r.use();
        } catch (RuntimeException e) {
            System.out.println("Primary: " + e.getMessage());

            // Access suppressed exceptions
            Throwable[] suppressed = e.getSuppressed();
            for (Throwable t : suppressed) {
                System.out.println("Suppressed: " + t.getMessage());
            }
        }

        System.out.println("\\nProgram continues normally");
    }
}`,
            output: `Primary: Error in use()
Suppressed: Error in close()

Program continues normally`,
            note: 'Suppressed exceptions were introduced alongside try-with-resources in Java 7. Access them with getSuppressed() on the primary exception.',
          },
        ],
      },
    ],
  },
];

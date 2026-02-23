import type { DocCategory } from './types';

// Part 4: Structs & Enums + Traits
export const RUST_PART4_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Structs & Enums                                              */
  /* ------------------------------------------------------------ */
  {
    id: 'rust-structs-enums',
    label: 'Structs & Enums',
    icon: 'Database',
    entries: [
      {
        id: 'structs',
        title: 'Structs',
        difficulty: 'beginner',
        tags: ['struct', 'named-fields', 'tuple-struct', 'unit-struct', 'update-syntax'],
        cheatSheetSummary: 'struct Point { x: f64, y: f64 } — named fields, stack or heap allocated',
        crossLanguageId: 'structs-classes',
        sections: [
          {
            heading: 'Defining and Creating Structs',
            content:
              'Structs are custom data types that group related values with named fields. Unlike classes in other languages, Rust structs have no inheritance. All fields are private by default (unless marked pub). You create instances using field initialization syntax, and Rust requires every field to be initialized.',
            code: `#[derive(Debug)]
struct User {
    username: String,
    email: String,
    active: bool,
    sign_in_count: u64,
}

// Tuple struct: named type with unnamed fields
#[derive(Debug)]
struct Color(u8, u8, u8);

// Unit struct: no fields (useful as marker types)
struct Marker;

fn main() {
    // Create with named fields
    let user = User {
        username: String::from("alice"),
        email: String::from("alice@example.com"),
        active: true,
        sign_in_count: 1,
    };
    println!("{:?}", user);
    println!("Username: {}", user.username);

    // Field init shorthand (variable name matches field name)
    let username = String::from("bob");
    let email = String::from("bob@example.com");
    let user2 = User {
        username,
        email,
        active: true,
        sign_in_count: 0,
    };
    println!("{}", user2.username);

    // Tuple struct
    let red = Color(255, 0, 0);
    println!("Red: ({}, {}, {})", red.0, red.1, red.2);

    // Unit struct
    let _m = Marker;
}`,
            output: `User { username: "alice", email: "alice@example.com", active: true, sign_in_count: 1 }
Username: alice
bob
Red: (255, 0, 0)`,
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'User struct (on stack)',
                    color: '#6366f1',
                    items: [
                      { name: 'username', value: 'String { ptr, len, cap }' },
                      { name: 'email', value: 'String { ptr, len, cap }' },
                      { name: 'active', value: 'true (1 byte)' },
                      { name: 'sign_in_count', value: '1 (8 bytes)' },
                    ],
                  },
                  {
                    label: 'Color tuple struct (on stack)',
                    color: '#10b981',
                    items: [
                      { name: '.0', value: '255 (u8)' },
                      { name: '.1', value: '0 (u8)' },
                      { name: '.2', value: '0 (u8)' },
                    ],
                  },
                  {
                    label: 'Marker unit struct',
                    color: '#f59e0b',
                    items: [
                      { name: 'size', value: '0 bytes (ZST)' },
                    ],
                  },
                ],
              },
              caption: 'The three struct variants: named-field structs hold labeled data, tuple structs hold positional data, and unit structs are zero-sized types used as markers.',
            },
          },
          {
            heading: 'Struct Update Syntax',
            content:
              'The struct update syntax (..other) creates a new struct instance using values from an existing instance for any fields you do not explicitly set. Note that this moves data for non-Copy fields, so the source struct may become partially invalid.',
            code: `#[derive(Debug, Clone)]
struct Config {
    host: String,
    port: u16,
    max_connections: u32,
    debug: bool,
}

fn default_config() -> Config {
    Config {
        host: String::from("localhost"),
        port: 8080,
        max_connections: 100,
        debug: false,
    }
}

fn main() {
    let defaults = default_config();

    // Override only specific fields
    let production = Config {
        host: String::from("0.0.0.0"),
        debug: false,
        ..defaults.clone()
    };
    println!("prod: {:?}", production);

    // The original is still valid because we cloned
    let staging = Config {
        port: 9090,
        debug: true,
        ..defaults
    };
    println!("staging: {:?}", staging);
    // defaults.host was moved into staging, so defaults is partially invalid
}`,
            output: `prod: Config { host: "0.0.0.0", port: 8080, max_connections: 100, debug: false }
staging: Config { host: "localhost", port: 9090, max_connections: 100, debug: true }`,
            warning: 'Struct update syntax moves non-Copy fields. After let b = Config { port: 9090, ..a }, the String fields of a are moved and a cannot be used as a whole anymore.',
            analogy: 'Think of it like filling out a form by copying from a template: you write in a few fields yourself and photocopy the rest from the original. But if the original had physical items stapled to it (heap data), those items get transferred, leaving the original incomplete.',
            codeHighlightLines: [14, 15, 16, 17, 22, 23, 24],
          },
          {
            heading: 'Destructuring Structs',
            content:
              'You can destructure structs in let bindings, function parameters, and match arms to extract individual fields. This is more readable than accessing fields one by one.',
            code: `#[derive(Debug)]
struct Point {
    x: f64,
    y: f64,
}

fn distance(p1: &Point, p2: &Point) -> f64 {
    let Point { x: x1, y: y1 } = p1;
    let Point { x: x2, y: y2 } = p2;
    ((x2 - x1).powi(2) + (y2 - y1).powi(2)).sqrt()
}

fn classify_point(p: &Point) {
    match p {
        Point { x: 0.0, y: 0.0 } => println!("origin"),
        Point { x, y: 0.0 } => println!("on x-axis at {}", x),
        Point { x: 0.0, y } => println!("on y-axis at {}", y),
        Point { x, y } => println!("at ({}, {})", x, y),
    }
}

fn main() {
    let p1 = Point { x: 0.0, y: 0.0 };
    let p2 = Point { x: 3.0, y: 4.0 };

    // Destructure in let
    let Point { x, y } = &p2;
    println!("x={}, y={}", x, y);

    println!("distance: {}", distance(&p1, &p2));

    classify_point(&p1);
    classify_point(&Point { x: 5.0, y: 0.0 });
    classify_point(&p2);
}`,
            output: `x=3, y=4
distance: 5
origin
on x-axis at 5
at (3, 4)`,
          },
        ],
        quiz: [
          {
            question: 'Which of the following correctly creates a tuple struct in Rust?',
            options: [
              'struct Color { u8, u8, u8 }',
              'struct Color(u8, u8, u8);',
              'tuple struct Color(u8, u8, u8);',
              'struct Color = (u8, u8, u8);',
            ],
            correctIndex: 1,
            explanation: 'Tuple structs use parentheses with positional fields instead of braces with named fields. The syntax is struct Name(Type1, Type2, ...);',
          },
          {
            question: 'What happens when you use struct update syntax (..other) with a non-Copy field?',
            options: [
              'The field is copied implicitly',
              'The field is cloned automatically',
              'The field is moved from the source struct',
              'The compiler raises an error',
            ],
            correctIndex: 2,
            explanation: 'Struct update syntax moves non-Copy fields from the source struct. After the move, those fields in the source are no longer accessible, making the source partially invalid.',
          },
          {
            question: 'What is a unit struct in Rust?',
            options: [
              'A struct with exactly one field',
              'A struct with no fields that has zero size',
              'A struct that implements the Unit trait',
              'A struct stored on the heap',
            ],
            correctIndex: 1,
            explanation: 'A unit struct (e.g., struct Marker;) has no fields and is a zero-sized type (ZST). They are useful as marker types or phantom types.',
          },
          {
            question: 'How do you destructure a struct in a match arm?',
            options: [
              'match p { (x, y) => ... }',
              'match p { Point(x, y) => ... }',
              'match p { Point { x, y } => ... }',
              'match p { x: Point.x, y: Point.y => ... }',
            ],
            correctIndex: 2,
            explanation: 'Named-field structs are destructured using the struct name with braces and field names: Point { x, y }. Tuple structs use parentheses: Color(r, g, b).',
          },
        ],
        challenge: {
          prompt: 'Create a struct called `Book` with fields `title` (String), `author` (String), and `pages` (u32). Implement a `new` constructor and a `summary` method that returns a formatted string. Then create two books, one using the constructor and one using struct update syntax from the first.',
          starterCode: `// Define the Book struct with Debug derive
// TODO: define struct

// TODO: implement Book with new() and summary()

fn main() {
    // TODO: create a book using Book::new
    // TODO: create a second book using struct update syntax, changing only the title
    // TODO: print summaries for both books
}`,
          solutionCode: `#[derive(Debug, Clone)]
struct Book {
    title: String,
    author: String,
    pages: u32,
}

impl Book {
    fn new(title: &str, author: &str, pages: u32) -> Self {
        Book {
            title: title.to_string(),
            author: author.to_string(),
            pages,
        }
    }

    fn summary(&self) -> String {
        format!("'{}' by {} ({} pages)", self.title, self.author, self.pages)
    }
}

fn main() {
    let book1 = Book::new("The Rust Book", "Steve Klabnik", 560);
    let book2 = Book {
        title: String::from("Rust in Action"),
        ..book1.clone()
    };
    println!("{}", book1.summary());
    println!("{}", book2.summary());
}`,
          hints: [
            'Use #[derive(Debug, Clone)] so you can clone the first book before using struct update syntax.',
            'The new() constructor should take &str parameters and convert them to String with .to_string().',
            'Remember that struct update syntax moves non-Copy fields, so clone the source first if you want to use it again.',
          ],
        },
      },
      {
        id: 'impl-blocks',
        title: 'impl Blocks',
        difficulty: 'beginner',
        tags: ['impl', 'methods', 'associated-functions', 'self', 'constructor'],
        cheatSheetSummary: 'impl Type { fn method(&self) { } fn new() -> Self { } }',
        sections: [
          {
            heading: 'Methods and Associated Functions',
            content:
              'impl blocks add methods (functions that take self) and associated functions (functions without self, like constructors) to a type. Methods take &self (read), &mut self (write), or self (consume). Associated functions are called with :: syntax. You can have multiple impl blocks for the same type.',
            code: `#[derive(Debug)]
struct Rectangle {
    width: f64,
    height: f64,
}

impl Rectangle {
    // Associated function (constructor, no self)
    fn new(width: f64, height: f64) -> Self {
        Rectangle { width, height }
    }

    fn square(size: f64) -> Self {
        Rectangle { width: size, height: size }
    }

    // Method: borrows self immutably
    fn area(&self) -> f64 {
        self.width * self.height
    }

    fn perimeter(&self) -> f64 {
        2.0 * (self.width + self.height)
    }

    fn is_square(&self) -> bool {
        (self.width - self.height).abs() < f64::EPSILON
    }

    // Method: borrows self mutably
    fn scale(&mut self, factor: f64) {
        self.width *= factor;
        self.height *= factor;
    }

    // Method: consumes self
    fn into_tuple(self) -> (f64, f64) {
        (self.width, self.height)
    }
}

fn main() {
    let mut rect = Rectangle::new(10.0, 5.0);
    println!("{:?}", rect);
    println!("area: {}", rect.area());
    println!("perimeter: {}", rect.perimeter());
    println!("is square: {}", rect.is_square());

    rect.scale(2.0);
    println!("scaled: {:?}", rect);

    let sq = Rectangle::square(4.0);
    println!("square area: {}", sq.area());

    // Consuming method
    let dims = rect.into_tuple();
    println!("dims: {:?}", dims);
    // rect is no longer available
}`,
            output: `Rectangle { width: 10.0, height: 5.0 }
area: 50
perimeter: 30
is square: false
scaled: Rectangle { width: 20.0, height: 10.0 }
square area: 16
dims: (20.0, 10.0)`,
            tip: 'Convention: use Self::new(...) as the main constructor and name alternative constructors descriptively (Self::square, Self::from_str, etc.).',
            analogy: 'Think of it like a Swiss Army knife: the struct is the knife body, and &self methods are the tools you pull out to inspect it, &mut self tools modify it, and self tools consume the entire knife to transform it into something else.',
            codeHighlightLines: [5, 6, 14, 15, 27, 28, 33, 34],
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    subgraph "impl Rectangle"\n        A["Rectangle::new(w, h)\\nRectangle::square(s)"] -->|"returns Self"| B["Rectangle instance"]\n        B -->|"&self"| C["area()\\nperimeter()\\nis_square()"]\n        B -->|"&mut self"| D["scale(factor)"]\n        B -->|"self (consumed)"| E["into_tuple()"]\n    end\n    C -->|"reads only"| B\n    D -->|"modifies"| B\n    E -->|"moves ownership"| F["(f64, f64)\\nRectangle gone"]\n    style A fill:#6366f1,color:#fff\n    style C fill:#10b981,color:#fff\n    style D fill:#f59e0b,color:#fff\n    style E fill:#ef4444,color:#fff\n    style F fill:#ef4444,color:#fff',
              caption: 'The three self receiver types: &self borrows immutably (read), &mut self borrows mutably (modify), and self takes ownership (consume/transform).',
            },
          },
          {
            heading: 'Method Chaining (Builder Pattern)',
            content:
              'Methods that return &mut self or Self enable fluent method chaining. The builder pattern is especially useful for constructing complex objects step by step.',
            code: `#[derive(Debug)]
struct QueryBuilder {
    table: String,
    columns: Vec<String>,
    conditions: Vec<String>,
    limit: Option<usize>,
}

impl QueryBuilder {
    fn new(table: &str) -> Self {
        QueryBuilder {
            table: table.to_string(),
            columns: Vec::new(),
            conditions: Vec::new(),
            limit: None,
        }
    }

    fn select(mut self, col: &str) -> Self {
        self.columns.push(col.to_string());
        self
    }

    fn where_clause(mut self, condition: &str) -> Self {
        self.conditions.push(condition.to_string());
        self
    }

    fn limit(mut self, n: usize) -> Self {
        self.limit = Some(n);
        self
    }

    fn build(&self) -> String {
        let cols = if self.columns.is_empty() {
            "*".to_string()
        } else {
            self.columns.join(", ")
        };
        let mut q = format!("SELECT {} FROM {}", cols, self.table);
        if !self.conditions.is_empty() {
            q.push_str(&format!(" WHERE {}", self.conditions.join(" AND ")));
        }
        if let Some(n) = self.limit {
            q.push_str(&format!(" LIMIT {}", n));
        }
        q
    }
}

fn main() {
    let query = QueryBuilder::new("users")
        .select("name")
        .select("email")
        .where_clause("age > 18")
        .where_clause("active = true")
        .limit(10)
        .build();

    println!("{}", query);
}`,
            output: `SELECT name, email FROM users WHERE age > 18 AND active = true LIMIT 10`,
            note: 'Builder methods that return self (by value) consume and return ownership. Methods returning &mut self borrow and return a mutable reference. Both enable chaining, but by-value is simpler.',
          },
          {
            heading: 'Multiple impl Blocks',
            content:
              'You can split methods across multiple impl blocks. This is useful for organizing code, conditionally implementing methods based on generic bounds, or implementing traits separately.',
            code: `struct Counter {
    value: i32,
    step: i32,
}

// Core functionality
impl Counter {
    fn new(step: i32) -> Self {
        Counter { value: 0, step }
    }

    fn increment(&mut self) {
        self.value += self.step;
    }

    fn get(&self) -> i32 {
        self.value
    }
}

// Display implementation in a separate block
impl std::fmt::Display for Counter {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "Counter(value={}, step={})", self.value, self.step)
    }
}

// Additional utilities in another block
impl Counter {
    fn reset(&mut self) {
        self.value = 0;
    }

    fn with_value(mut self, value: i32) -> Self {
        self.value = value;
        self
    }
}

fn main() {
    let mut c = Counter::new(5).with_value(10);
    println!("{}", c);

    c.increment();
    c.increment();
    println!("After 2 increments: {}", c.get());

    c.reset();
    println!("After reset: {}", c);
}`,
            output: `Counter(value=10, step=5)
After 2 increments: 20
After reset: Counter(value=0, step=5)`,
          },
        ],
        quiz: [
          {
            question: 'What is the difference between a method and an associated function in Rust?',
            options: [
              'Methods are public, associated functions are private',
              'Methods take a self parameter, associated functions do not',
              'Methods are defined in impl blocks, associated functions are not',
              'There is no difference; they are the same thing',
            ],
            correctIndex: 1,
            explanation: 'Methods take self, &self, or &mut self as their first parameter, while associated functions (like constructors) do not take self at all. Associated functions are called with :: syntax (e.g., Type::new()).',
          },
          {
            question: 'Which self receiver type allows a method to modify the struct\'s fields?',
            options: [
              '&self',
              'self',
              '&mut self',
              'Both self and &mut self',
            ],
            correctIndex: 3,
            explanation: 'Both &mut self (borrow mutably) and self (take ownership) allow modifying the struct. However, &mut self is used when you want to modify and keep the struct alive, while self consumes the struct.',
          },
          {
            question: 'How do you call an associated function (constructor) on a struct?',
            options: [
              'rect.new(10.0, 5.0)',
              'Rectangle::new(10.0, 5.0)',
              'new Rectangle(10.0, 5.0)',
              'Rectangle.new(10.0, 5.0)',
            ],
            correctIndex: 1,
            explanation: 'Associated functions without self are called using the :: syntax: Type::function(). This is different from method calls which use dot notation on an instance.',
          },
        ],
        challenge: {
          prompt: 'Create a `BankAccount` struct with `owner` (String) and `balance` (f64). Implement methods: `new` (constructor), `deposit` (&mut self), `withdraw` (&mut self, returns bool for success/failure), and `display` (&self). The withdraw method should fail if the amount exceeds the balance.',
          starterCode: `struct BankAccount {
    owner: String,
    balance: f64,
}

// TODO: implement BankAccount with new, deposit, withdraw, display

fn main() {
    // TODO: create an account, deposit, withdraw, and display the balance
}`,
          solutionCode: `struct BankAccount {
    owner: String,
    balance: f64,
}

impl BankAccount {
    fn new(owner: &str, initial_balance: f64) -> Self {
        BankAccount {
            owner: owner.to_string(),
            balance: initial_balance,
        }
    }

    fn deposit(&mut self, amount: f64) {
        self.balance += amount;
        println!("Deposited {:.2}. New balance: {:.2}", amount, self.balance);
    }

    fn withdraw(&mut self, amount: f64) -> bool {
        if amount > self.balance {
            println!("Insufficient funds! Balance: {:.2}, Requested: {:.2}", self.balance, amount);
            false
        } else {
            self.balance -= amount;
            println!("Withdrew {:.2}. New balance: {:.2}", amount, self.balance);
            true
        }
    }

    fn display(&self) {
        println!("Account: {} | Balance: \${:.2}", self.owner, self.balance);
    }
}

fn main() {
    let mut account = BankAccount::new("Alice", 100.0);
    account.display();
    account.deposit(50.0);
    account.withdraw(30.0);
    account.withdraw(200.0);
    account.display();
}`,
          hints: [
            'Use &mut self for deposit and withdraw since they modify the balance.',
            'The withdraw method should compare amount against self.balance and return false if insufficient funds.',
            'Use {:.2} in format strings for two decimal place display of currency.',
          ],
        },
      },
      {
        id: 'enums',
        title: 'Enums',
        difficulty: 'intermediate',
        tags: ['enum', 'algebraic-data-type', 'variant', 'data-enum'],
        cheatSheetSummary: 'enum Shape { Circle(f64), Rect { w: f64, h: f64 } } — variants can hold data',
        crossLanguageId: 'enums',
        sections: [
          {
            heading: 'Defining Enums',
            content:
              'Rust enums are algebraic data types (sum types). Each variant can hold different types and amounts of data: no data, tuple-like data, or struct-like named fields. This makes enums far more powerful than enums in C or Java.',
            code: `#[derive(Debug)]
enum Shape {
    Circle(f64),                        // tuple variant
    Rectangle { width: f64, height: f64 }, // struct variant
    Triangle(f64, f64, f64),            // tuple variant with 3 fields
    Point,                               // unit variant
}

#[derive(Debug)]
enum WebEvent {
    PageLoad,
    KeyPress(char),
    Click { x: i64, y: i64 },
    Paste(String),
}

fn main() {
    let shapes = vec![
        Shape::Circle(5.0),
        Shape::Rectangle { width: 4.0, height: 6.0 },
        Shape::Triangle(3.0, 4.0, 5.0),
        Shape::Point,
    ];

    for shape in &shapes {
        println!("{:?}", shape);
    }

    let events = vec![
        WebEvent::PageLoad,
        WebEvent::Click { x: 100, y: 200 },
        WebEvent::KeyPress('q'),
        WebEvent::Paste(String::from("hello")),
    ];

    for event in &events {
        println!("{:?}", event);
    }
}`,
            output: `Circle(5.0)
Rectangle { width: 4.0, height: 6.0 }
Triangle(3.0, 4.0, 5.0)
Point
PageLoad
Click { x: 100, y: 200 }
KeyPress('q')
Paste("hello")`,
            diagram: {
              kind: 'mermaid',
              code: 'classDiagram\n    class Shape {\n        <<enum>>\n    }\n    class Circle {\n        f64 radius\n    }\n    class Rectangle {\n        f64 width\n        f64 height\n    }\n    class Triangle {\n        f64 a\n        f64 b\n        f64 c\n    }\n    class Point {\n        (no data)\n    }\n    Shape <|-- Circle : variant\n    Shape <|-- Rectangle : variant\n    Shape <|-- Triangle : variant\n    Shape <|-- Point : variant\n    note for Shape "Each variant can hold\\ndifferent types and amounts\\nof data (sum type)"',
              caption: 'Rust enums are algebraic sum types: a Shape is exactly one of Circle, Rectangle, Triangle, or Point. Each variant can carry its own data.',
            },
          },
          {
            heading: 'Methods on Enums',
            content:
              'Enums can have methods and associated functions just like structs, defined in impl blocks. Match expressions inside methods handle the different variants.',
            code: `use std::f64::consts::PI;

#[derive(Debug)]
enum Shape {
    Circle(f64),
    Rectangle { width: f64, height: f64 },
    Triangle { base: f64, height: f64 },
}

impl Shape {
    fn area(&self) -> f64 {
        match self {
            Shape::Circle(r) => PI * r * r,
            Shape::Rectangle { width, height } => width * height,
            Shape::Triangle { base, height } => 0.5 * base * height,
        }
    }

    fn description(&self) -> String {
        match self {
            Shape::Circle(r) => format!("Circle with radius {}", r),
            Shape::Rectangle { width, height } =>
                format!("{}x{} Rectangle", width, height),
            Shape::Triangle { base, height } =>
                format!("Triangle (base={}, height={})", base, height),
        }
    }

    fn is_circle(&self) -> bool {
        matches!(self, Shape::Circle(_))
    }
}

fn main() {
    let shapes = vec![
        Shape::Circle(3.0),
        Shape::Rectangle { width: 4.0, height: 5.0 },
        Shape::Triangle { base: 6.0, height: 3.0 },
    ];

    for s in &shapes {
        println!("{}: area = {:.2}", s.description(), s.area());
    }

    println!("First is circle: {}", shapes[0].is_circle());
}`,
            output: `Circle with radius 3: area = 28.27
4x5 Rectangle: area = 20.00
Triangle (base=6, height=3): area = 9.00
First is circle: true`,
            tip: 'The matches! macro is a convenient shorthand for checking if a value matches a pattern. matches!(x, Pattern) returns true or false without destructuring.',
            codeHighlightLines: [8, 9, 10, 11, 12, 13, 26],
          },
          {
            heading: 'C-style Enums and Discriminants',
            content:
              'Enums with no data in any variant behave like C-style enums with integer discriminants. You can set explicit values and cast to integers. This is useful for FFI, protocols, and serialization.',
            code: `#[derive(Debug, Clone, Copy, PartialEq)]
enum Color {
    Red = 1,
    Green = 2,
    Blue = 4,
    Yellow = 8,
}

#[derive(Debug, Clone, Copy)]
#[repr(u8)]
enum HttpStatus {
    Ok = 200,
    NotFound = 404 - 256 + 52, // must fit in u8 if repr(u8) used
}

fn main() {
    // Cast to integer
    let c = Color::Blue;
    println!("{:?} = {}", c, c as i32);

    // Bitwise flags
    let flags = Color::Red as u32 | Color::Blue as u32;
    println!("flags: {}", flags); // 5

    // All variants
    let colors = [Color::Red, Color::Green, Color::Blue, Color::Yellow];
    for color in &colors {
        println!("{:?}: {}", color, *color as i32);
    }

    // Comparison
    println!("Red == Red: {}", Color::Red == Color::Red);
    println!("Red == Blue: {}", Color::Red == Color::Blue);
}`,
            output: `Blue = 4
flags: 5
Red: 1
Green: 2
Blue: 4
Yellow: 8
Red == Red: true
Red == Blue: false`,
          },
        ],
        quiz: [
          {
            question: 'What makes Rust enums more powerful than C-style enums?',
            options: [
              'Rust enums can have methods',
              'Each variant can hold different types and amounts of data',
              'Rust enums support pattern matching',
              'All of the above',
            ],
            correctIndex: 3,
            explanation: 'Rust enums are algebraic data types (sum types). Each variant can carry different data, they can have methods via impl blocks, and they work seamlessly with pattern matching. This makes them far more expressive than C enums.',
          },
          {
            question: 'Which variant kind uses named fields inside an enum?',
            options: [
              'Unit variant',
              'Tuple variant',
              'Struct variant',
              'Named variant',
            ],
            correctIndex: 2,
            explanation: 'Struct variants use named fields with braces, like Rectangle { width: f64, height: f64 }. Tuple variants use positional fields in parentheses, and unit variants have no data at all.',
          },
          {
            question: 'What does the matches! macro return?',
            options: [
              'The matched variant',
              'An Option containing the matched value',
              'A bool indicating whether the pattern matches',
              'A Result with the match outcome',
            ],
            correctIndex: 2,
            explanation: 'matches!(value, Pattern) is a convenient shorthand that returns true if the value matches the pattern, and false otherwise. It does not destructure or extract data.',
          },
          {
            question: 'How do you cast a C-style enum variant to its integer discriminant?',
            options: [
              'variant.to_int()',
              'variant as i32',
              'i32::from(variant)',
              'variant.discriminant()',
            ],
            correctIndex: 1,
            explanation: 'C-style enum variants (those with no data) can be cast to their integer discriminant using the `as` keyword, e.g., Color::Red as i32.',
          },
        ],
        challenge: {
          prompt: 'Create an enum `Command` with variants: `Quit` (no data), `Echo(String)`, `Move { x: i32, y: i32 }`, and `Color(u8, u8, u8)`. Implement a method `execute` that prints an appropriate message for each variant using match.',
          starterCode: `// TODO: define the Command enum with Debug derive

// TODO: implement Command with an execute() method

fn main() {
    let commands = vec![
        // TODO: create one of each variant
    ];

    for cmd in &commands {
        cmd.execute();
    }
}`,
          solutionCode: `#[derive(Debug)]
enum Command {
    Quit,
    Echo(String),
    Move { x: i32, y: i32 },
    Color(u8, u8, u8),
}

impl Command {
    fn execute(&self) {
        match self {
            Command::Quit => println!("Quitting..."),
            Command::Echo(msg) => println!("Echo: {}", msg),
            Command::Move { x, y } => println!("Moving to ({}, {})", x, y),
            Command::Color(r, g, b) => println!("Setting color to rgb({}, {}, {})", r, g, b),
        }
    }
}

fn main() {
    let commands = vec![
        Command::Echo(String::from("hello")),
        Command::Move { x: 10, y: 20 },
        Command::Color(255, 128, 0),
        Command::Quit,
    ];

    for cmd in &commands {
        cmd.execute();
    }
}`,
          hints: [
            'Each enum variant has a different shape: Quit has no data, Echo has a String, Move has named fields, and Color has three u8 values.',
            'In the match, destructure each variant to access its inner data. Use Command::Move { x, y } for the struct variant.',
            'Remember to use &self in the execute method since you only need to read the data.',
          ],
        },
      },
      {
        id: 'pattern-matching',
        title: 'Pattern Matching',
        difficulty: 'intermediate',
        tags: ['match', 'if-let', 'while-let', 'patterns', 'destructuring', 'guards'],
        cheatSheetSummary: 'match, if let, while let, let-else — exhaustive and powerful pattern matching',
        crossLanguageId: 'pattern-matching',
        sections: [
          {
            heading: 'Pattern Syntax Overview',
            content:
              'Rust has a rich pattern language that works across match, if let, while let, let, and for. Patterns can match literals, variables, wildcards, ranges, references, tuples, structs, enums, and nested combinations. Guards add runtime conditions.',
            code: `fn main() {
    let x = 42;

    // Literal, OR, range, wildcard patterns
    match x {
        0 => println!("zero"),
        1 | 2 => println!("one or two"),
        3..=9 => println!("three to nine"),
        10..=99 => println!("two digits"),
        _ => println!("large number"),
    }

    // Tuple destructuring
    let pair = (true, 42);
    match pair {
        (true, n) if n > 0 => println!("true and positive: {}", n),
        (true, _) => println!("true"),
        (false, _) => println!("false"),
    }

    // Reference patterns
    let reference = &42;
    match reference {
        &val => println!("dereferenced: {}", val),
    }

    // Or-patterns in let
    let (a, b) = (10, 20);
    println!("a={}, b={}", a, b);
}`,
            output: `two digits
true and positive: 42
dereferenced: 42
a=10, b=20`,
          },
          {
            heading: 'Nested Destructuring',
            content:
              'Patterns can be nested arbitrarily deep. You can destructure enums inside tuples inside structs, matching exactly the shape of your data. This eliminates the need for accessor chains and temporary variables.',
            code: `#[derive(Debug)]
enum Expr {
    Num(f64),
    Add(Box<Expr>, Box<Expr>),
    Mul(Box<Expr>, Box<Expr>),
}

fn eval(expr: &Expr) -> f64 {
    match expr {
        Expr::Num(n) => *n,
        Expr::Add(a, b) => eval(a) + eval(b),
        Expr::Mul(a, b) => eval(a) * eval(b),
    }
}

fn simplify(expr: &Expr) -> String {
    match expr {
        Expr::Num(n) => format!("{}", n),
        Expr::Add(a, b) => format!("({} + {})", simplify(a), simplify(b)),
        Expr::Mul(a, b) => format!("({} * {})", simplify(a), simplify(b)),
    }
}

fn main() {
    // (2 + 3) * 4
    let expr = Expr::Mul(
        Box::new(Expr::Add(
            Box::new(Expr::Num(2.0)),
            Box::new(Expr::Num(3.0)),
        )),
        Box::new(Expr::Num(4.0)),
    );

    println!("{}", simplify(&expr));
    println!("= {}", eval(&expr));

    // Nested tuple/struct destructuring
    let data = vec![
        ("Alice", Some(95)),
        ("Bob", None),
        ("Charlie", Some(87)),
    ];

    for (name, score) in &data {
        match score {
            Some(s) if *s >= 90 => println!("{}: A ({})", name, s),
            Some(s) => println!("{}: B ({})", name, s),
            None => println!("{}: absent", name),
        }
    }
}`,
            output: `((2 + 3) * 4)
= 20
Alice: A (95)
Bob: absent
Charlie: B (87)`,
            diagram: {
              kind: 'mermaid',
              code: 'graph TD\n    MUL["Mul (*)"] --> ADD["Add (+)"]\n    MUL --> N4["Num(4.0)"]\n    ADD --> N2["Num(2.0)"]\n    ADD --> N3["Num(3.0)"]\n    style MUL fill:#6366f1,color:#fff\n    style ADD fill:#10b981,color:#fff\n    style N4 fill:#f59e0b,color:#fff\n    style N2 fill:#f59e0b,color:#fff\n    style N3 fill:#f59e0b,color:#fff',
              caption: 'The expression (2 + 3) * 4 as a tree of Expr enum variants. Pattern matching with match recursively walks this tree to evaluate or simplify.',
            },
          },
          {
            heading: 'Irrefutable vs Refutable Patterns',
            content:
              'Irrefutable patterns always match (used in let, for, function parameters). Refutable patterns might not match (used in if let, while let, match arms). The compiler ensures you use the right kind in the right context.',
            code: `fn main() {
    // Irrefutable: always matches (used in let, for, fn params)
    let (x, y) = (1, 2);
    println!("{} {}", x, y);

    let [a, b, c] = [10, 20, 30];
    println!("{} {} {}", a, b, c);

    // Refutable: might not match (used in if let, while let)
    let maybe: Option<i32> = Some(42);

    if let Some(val) = maybe {
        println!("got: {}", val);
    }

    // while let: keep matching until failure
    let mut stack = vec![1, 2, 3];
    while let Some(top) = stack.pop() {
        println!("popped: {}", top);
    }

    // let-else: irrefutable with an escape hatch
    let input = "42";
    let Ok(num) = input.parse::<i32>() else {
        println!("not a number");
        return;
    };
    println!("parsed: {}", num);
}`,
            output: `1 2
10 20 30
got: 42
popped: 3
popped: 2
popped: 1
parsed: 42`,
            note: 'let x = value requires an irrefutable pattern (one that always matches). Using let Some(x) = maybe; will not compile because maybe could be None. Use if let or let-else for refutable patterns.',
            analogy: 'Think of it like a key and a lock: an irrefutable pattern is a master key that always opens the lock, so you can use it with let. A refutable pattern might not fit, so you need if let or match to handle the "key does not fit" case.',
          },
        ],
        quiz: [
          {
            question: 'What does the pattern 3..=9 match in a Rust match expression?',
            options: [
              'Only the values 3 and 9',
              'Values from 3 up to but not including 9',
              'Values from 3 to 9, inclusive on both ends',
              'A range object that can be iterated',
            ],
            correctIndex: 2,
            explanation: 'The ..= syntax creates an inclusive range pattern that matches all values from the start to the end, inclusive on both sides. So 3..=9 matches 3, 4, 5, 6, 7, 8, and 9.',
          },
          {
            question: 'What is a match guard in Rust?',
            options: [
              'A compile-time check that all patterns are covered',
              'An additional if condition on a match arm',
              'A guard clause that prevents fallthrough',
              'A macro that validates match completeness',
            ],
            correctIndex: 1,
            explanation: 'A match guard is an extra if condition added after a pattern: (true, n) if n > 0 => .... The arm only matches if both the pattern and the guard condition are true.',
          },
          {
            question: 'What is the difference between if let and let-else?',
            options: [
              'if let runs code on match; let-else runs code on failure and must diverge',
              'They are identical in behavior',
              'let-else is for enums only, if let is for any pattern',
              'if let is deprecated in favor of let-else',
            ],
            correctIndex: 0,
            explanation: 'if let Some(x) = expr { ... } runs the block when the pattern matches. let Ok(x) = expr else { return; } binds the variable on success and the else block must diverge (return, break, panic, etc.).',
          },
        ],
        challenge: {
          prompt: 'Write a function `describe_number` that takes an i32 and uses pattern matching to return a string description: "zero" for 0, "small positive" for 1-10, "small negative" for -10 to -1, "teen" for 11-19, and "other: <n>" for everything else. Also write a function that uses while let to pop and print elements from a Vec.',
          starterCode: `fn describe_number(n: i32) -> String {
    // TODO: use match with range patterns and wildcards
    todo!()
}

fn drain_stack(mut stack: Vec<i32>) {
    // TODO: use while let with stack.pop()
}

fn main() {
    for n in [0, 5, -3, 15, 100, -50] {
        println!("{}: {}", n, describe_number(n));
    }
    drain_stack(vec![1, 2, 3]);
}`,
          solutionCode: `fn describe_number(n: i32) -> String {
    match n {
        0 => "zero".to_string(),
        1..=10 => "small positive".to_string(),
        -10..=-1 => "small negative".to_string(),
        11..=19 => "teen".to_string(),
        other => format!("other: {}", other),
    }
}

fn drain_stack(mut stack: Vec<i32>) {
    while let Some(top) = stack.pop() {
        println!("popped: {}", top);
    }
    println!("stack is empty");
}

fn main() {
    for n in [0, 5, -3, 15, 100, -50] {
        println!("{}: {}", n, describe_number(n));
    }
    drain_stack(vec![1, 2, 3]);
}`,
          hints: [
            'Use inclusive range patterns like 1..=10 for matching ranges of integers.',
            'Negative ranges work too: -10..=-1 matches -10 through -1.',
            'while let Some(top) = stack.pop() will keep looping as long as pop() returns Some.',
          ],
        },
      },
      {
        id: 'option-type',
        title: 'Option Type',
        difficulty: 'intermediate',
        tags: ['Option', 'Some', 'None', 'null-safety', 'unwrap', 'map'],
        cheatSheetSummary: 'Option<T> = Some(T) | None — Rust\'s replacement for null',
        signature: 'enum Option<T> { Some(T), None }',
        sections: [
          {
            heading: 'Option Basics',
            content:
              'Option<T> is Rust\'s way of representing a value that might be absent. It replaces null/nil/None from other languages but is type-safe: the compiler forces you to handle the None case. Option is so common that it and its variants (Some, None) are available without importing.',
            code: `fn find_index(haystack: &[i32], needle: i32) -> Option<usize> {
    for (i, &val) in haystack.iter().enumerate() {
        if val == needle {
            return Some(i);
        }
    }
    None
}

fn divide(a: f64, b: f64) -> Option<f64> {
    if b == 0.0 {
        None
    } else {
        Some(a / b)
    }
}

fn main() {
    let nums = vec![10, 20, 30, 40, 50];

    // Pattern matching
    match find_index(&nums, 30) {
        Some(i) => println!("Found 30 at index {}", i),
        None => println!("30 not found"),
    }

    // if let for single-case matching
    if let Some(i) = find_index(&nums, 99) {
        println!("Found at {}", i);
    } else {
        println!("99 not found");
    }

    // unwrap_or: provide a default
    let result = divide(10.0, 3.0).unwrap_or(0.0);
    println!("10/3 = {:.2}", result);

    let result = divide(10.0, 0.0).unwrap_or(0.0);
    println!("10/0 = {}", result);
}`,
            output: `Found 30 at index 2
99 not found
10/3 = 3.33
10/0 = 0`,
          },
          {
            heading: 'Option Combinators',
            content:
              'Option provides many combinator methods for transforming and chaining optional values. These are more idiomatic and concise than explicit match statements. The most important are map, and_then (flatMap), unwrap_or, and unwrap_or_else.',
            code: `fn main() {
    let some_val: Option<i32> = Some(42);
    let none_val: Option<i32> = None;

    // map: transform the inner value
    let doubled = some_val.map(|x| x * 2);
    println!("doubled: {:?}", doubled);       // Some(84)
    println!("none map: {:?}", none_val.map(|x| x * 2)); // None

    // and_then (flatMap): chain operations that return Option
    let parsed = Some("42")
        .and_then(|s| s.parse::<i32>().ok())
        .and_then(|n| if n > 0 { Some(n) } else { None });
    println!("parsed chain: {:?}", parsed);   // Some(42)

    // unwrap_or / unwrap_or_else
    println!("with default: {}", none_val.unwrap_or(0));
    println!("with closure: {}", none_val.unwrap_or_else(|| {
        println!("  computing default...");
        99
    }));

    // filter: keep Some only if predicate passes
    let even = some_val.filter(|&x| x % 2 == 0);
    println!("filter even: {:?}", even);  // Some(42)

    // zip: combine two Options
    let a = Some(1);
    let b = Some("hello");
    println!("zip: {:?}", a.zip(b)); // Some((1, "hello"))

    // or / or_else: fallback to another Option
    let primary: Option<i32> = None;
    let fallback = Some(99);
    println!("or: {:?}", primary.or(fallback)); // Some(99)
}`,
            output: `doubled: Some(84)
none map: None
parsed chain: Some(42)
with default: 0
  computing default...
with closure: 99
filter even: Some(42)
zip: Some((1, "hello"))
or: Some(99)`,
            tip: 'Use .map() for transforming values, .and_then() for chaining fallible operations, and .unwrap_or_else() for lazy defaults. Avoid .unwrap() in production code — it panics on None.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n    subgraph "Option Combinator Pipeline"\n        A["Some(42)"] -->|".map(|x| x * 2)"| B["Some(84)"]\n        B -->|".filter(|x| x > 50)"| C["Some(84)"]\n        C -->|".and_then(|x| ...)"| D["Some(...) or None"]\n        D -->|".unwrap_or(0)"| E["84 or 0"]\n    end\n    subgraph "None flows through"\n        N1["None"] -->|".map()"| N2["None"]\n        N2 -->|".filter()"| N3["None"]\n        N3 -->|".and_then()"| N4["None"]\n        N4 -->|".unwrap_or(0)"| N5["0"]\n    end\n    style A fill:#10b981,color:#fff\n    style B fill:#10b981,color:#fff\n    style C fill:#10b981,color:#fff\n    style E fill:#6366f1,color:#fff\n    style N1 fill:#94a3b8,color:#fff\n    style N2 fill:#94a3b8,color:#fff\n    style N3 fill:#94a3b8,color:#fff\n    style N5 fill:#f59e0b,color:#fff',
              caption: 'Combinators form a pipeline: Some values are transformed at each step, while None passes through unchanged until unwrap_or provides a default.',
            },
          },
          {
            heading: 'Option in Practice',
            content:
              'Options appear throughout the Rust standard library: collection access (.get(), .first(), .last()), string parsing, hash map lookups, and more. Understanding idiomatic Option handling is essential for productive Rust development.',
            code: `use std::collections::HashMap;

fn main() {
    // Collection access returns Option
    let nums = vec![10, 20, 30];
    let first: Option<&i32> = nums.first();
    let tenth: Option<&i32> = nums.get(10);
    println!("first: {:?}, tenth: {:?}", first, tenth);

    // HashMap lookup
    let mut scores: HashMap<&str, i32> = HashMap::new();
    scores.insert("Alice", 95);

    let alice = scores.get("Alice").copied();
    let bob = scores.get("Bob").copied();
    println!("Alice: {:?}, Bob: {:?}", alice, bob);

    // Chaining with ? in functions that return Option
    fn get_middle_char(s: &str) -> Option<char> {
        let len = s.chars().count();
        if len == 0 {
            return None;
        }
        s.chars().nth(len / 2)
    }

    println!("middle of 'hello': {:?}", get_middle_char("hello"));
    println!("middle of '': {:?}", get_middle_char(""));

    // Converting between Option and Result
    let opt: Option<i32> = Some(42);
    let res: Result<i32, &str> = opt.ok_or("missing value");
    println!("to result: {:?}", res);

    let res2: Result<i32, &str> = Err("not found");
    let opt2: Option<i32> = res2.ok();
    println!("to option: {:?}", opt2);
}`,
            output: `first: Some(10), tenth: None
Alice: Some(95), Bob: None
middle of 'hello': Some('l')
middle of '': None
to result: Ok(42)
to option: None`,
            warning: 'Never use .unwrap() in production code. It panics on None with an unhelpful message. Use .expect("reason") for development, and .unwrap_or(), .unwrap_or_else(), or match/if let for production.',
          },
        ],
        quiz: [
          {
            question: 'What does Option<T> replace in Rust compared to other languages?',
            options: [
              'Exceptions and try/catch',
              'Null/nil/None values',
              'Default values',
              'Error codes',
            ],
            correctIndex: 1,
            explanation: 'Option<T> is Rust\'s type-safe replacement for null. Instead of a value potentially being null, the type system encodes the possibility of absence as Some(value) or None, forcing you to handle both cases.',
          },
          {
            question: 'What does .and_then() do on an Option?',
            options: [
              'Transforms the inner value like map',
              'Chains an operation that itself returns an Option (flatMap)',
              'Returns the inner value or a default',
              'Combines two Options into a tuple',
            ],
            correctIndex: 1,
            explanation: '.and_then() (also known as flatMap in other languages) chains operations that return Option<T>. If the original is Some, it applies the closure; if None, it returns None. This prevents nested Options like Some(Some(x)).',
          },
          {
            question: 'Why should you avoid .unwrap() in production code?',
            options: [
              'It is slower than pattern matching',
              'It panics on None with an unhelpful error message',
              'It is deprecated in recent Rust versions',
              'It does not work with generic types',
            ],
            correctIndex: 1,
            explanation: '.unwrap() panics at runtime if called on None, crashing the program with an unhelpful "called unwrap on a None value" message. Use .expect("reason"), .unwrap_or(), or pattern matching instead.',
          },
          {
            question: 'How do you convert an Option<T> to a Result<T, E>?',
            options: [
              'option.to_result()',
              'option.ok_or(err_value)',
              'Result::from(option)',
              'option.into_result(err_value)',
            ],
            correctIndex: 1,
            explanation: '.ok_or(err) converts Some(v) to Ok(v) and None to Err(err). There is also .ok_or_else(|| err) for lazy error construction. The reverse is result.ok() which converts Ok(v) to Some(v) and Err(_) to None.',
          },
        ],
        challenge: {
          prompt: 'Write a function `safe_divide` that returns Option<f64> (None for division by zero). Then write a function `process_chain` that takes a string, parses it to f64, divides it by 2.0, and returns the result as an Option using combinator chaining (map, and_then) instead of explicit match.',
          starterCode: `fn safe_divide(a: f64, b: f64) -> Option<f64> {
    // TODO: return None if b is zero, Some(a/b) otherwise
    todo!()
}

fn process_chain(input: &str) -> Option<f64> {
    // TODO: parse input to f64, then divide by 2.0, using combinators
    todo!()
}

fn main() {
    println!("{:?}", safe_divide(10.0, 3.0));
    println!("{:?}", safe_divide(10.0, 0.0));
    println!("{:?}", process_chain("42"));
    println!("{:?}", process_chain("abc"));
}`,
          solutionCode: `fn safe_divide(a: f64, b: f64) -> Option<f64> {
    if b == 0.0 {
        None
    } else {
        Some(a / b)
    }
}

fn process_chain(input: &str) -> Option<f64> {
    input.parse::<f64>().ok().and_then(|n| safe_divide(n, 2.0))
}

fn main() {
    println!("{:?}", safe_divide(10.0, 3.0));   // Some(3.333...)
    println!("{:?}", safe_divide(10.0, 0.0));   // None
    println!("{:?}", process_chain("42"));       // Some(21.0)
    println!("{:?}", process_chain("abc"));      // None
}`,
          hints: [
            'Use .parse::<f64>().ok() to convert a Result into an Option.',
            'Chain .and_then() to call safe_divide on the parsed value, since safe_divide itself returns Option.',
            'The entire process_chain function can be a single expression chain without any match or if statements.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Traits                                                       */
  /* ------------------------------------------------------------ */
  {
    id: 'rust-traits',
    label: 'Traits',
    icon: 'Puzzle',
    entries: [
      {
        id: 'traits',
        title: 'Traits',
        difficulty: 'intermediate',
        tags: ['traits', 'interface', 'shared-behavior', 'default-methods'],
        cheatSheetSummary: 'trait Name { fn method(&self); } — define shared behavior (like interfaces)',
        crossLanguageId: 'interfaces',
        sections: [
          {
            heading: 'Defining and Implementing Traits',
            content:
              'Traits define shared behavior that types can implement, similar to interfaces in other languages. A trait declares method signatures and can provide default implementations. Any type can implement any trait, subject to the orphan rule (either the trait or the type must be defined in your crate).',
            code: `trait Summary {
    // Required method (no body)
    fn summarize(&self) -> String;

    // Default method (can be overridden)
    fn preview(&self) -> String {
        let s = self.summarize();
        if s.len() > 20 {
            format!("{}...", &s[..20])
        } else {
            s
        }
    }
}

struct Article {
    title: String,
    content: String,
}

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("{}: {}", self.title, self.content)
    }
    // preview uses the default implementation
}

struct Tweet {
    user: String,
    text: String,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("@{}: {}", self.user, self.text)
    }

    // Override default
    fn preview(&self) -> String {
        format!("@{} tweeted", self.user)
    }
}

fn main() {
    let article = Article {
        title: "Rust Traits".to_string(),
        content: "Traits define shared behavior in Rust programs.".to_string(),
    };
    println!("{}", article.summarize());
    println!("{}", article.preview());

    let tweet = Tweet {
        user: "rustlang".to_string(),
        text: "Rust 1.75 released!".to_string(),
    };
    println!("{}", tweet.summarize());
    println!("{}", tweet.preview());
}`,
            output: `Rust Traits: Traits define shared behavior in Rust programs.
Rust Traits: Traits ...
@rustlang: Rust 1.75 released!
@rustlang tweeted`,
          },
          {
            heading: 'Traits as Parameters',
            content:
              'There are three ways to use traits in function signatures: impl Trait syntax (most concise), trait bounds (more explicit), and where clauses (best for complex bounds). All three generate the same monomorphized code.',
            code: `use std::fmt::Display;

trait Greet {
    fn greeting(&self) -> String;
}

struct Person { name: String }
struct Robot { id: u32 }

impl Greet for Person {
    fn greeting(&self) -> String {
        format!("Hi, I'm {}", self.name)
    }
}

impl Greet for Robot {
    fn greeting(&self) -> String {
        format!("UNIT-{} OPERATIONAL", self.id)
    }
}

// Syntax 1: impl Trait (sugar)
fn print_greeting(item: &impl Greet) {
    println!("{}", item.greeting());
}

// Syntax 2: trait bound
fn print_greeting_v2<T: Greet>(item: &T) {
    println!("{}", item.greeting());
}

// Syntax 3: where clause (best for complex bounds)
fn print_if_displayable<T>(item: &T)
where
    T: Greet + Display,
{
    println!("{} says: {}", item, item.greeting());
}

// Return type implementing trait
fn create_greeter(is_human: bool) -> Box<dyn Greet> {
    if is_human {
        Box::new(Person { name: "Alice".to_string() })
    } else {
        Box::new(Robot { id: 42 })
    }
}

fn main() {
    let person = Person { name: "Alice".to_string() };
    let robot = Robot { id: 42 };

    print_greeting(&person);
    print_greeting(&robot);
}`,
            output: `Hi, I'm Alice
UNIT-42 OPERATIONAL`,
            tip: 'Use impl Trait for simple cases, and where clauses when you have multiple bounds or multiple generic parameters. They produce identical compiled code.',
            analogy: 'Think of it like a job posting: the trait is the job description listing required skills. Any candidate (type) that has all the listed skills (implements the trait) can fill the role, regardless of their background.',
            codeHighlightLines: [20, 21, 25, 26, 29, 30, 31, 32, 37, 38],
          },
          {
            heading: 'Supertraits and Trait Inheritance',
            content:
              'A trait can require another trait as a prerequisite using supertrait syntax (trait B: A). This means any type implementing B must also implement A. This is useful for building trait hierarchies.',
            code: `use std::fmt;

// Display is a supertrait of PrintInfo
trait PrintInfo: fmt::Display {
    fn info(&self) -> String;

    fn print_info(&self) {
        // Can use Display methods because it's a supertrait
        println!("[{}] {}", self, self.info());
    }
}

#[derive(Debug)]
struct Server {
    name: String,
    port: u16,
}

impl fmt::Display for Server {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}:{}", self.name, self.port)
    }
}

impl PrintInfo for Server {
    fn info(&self) -> String {
        format!("Server '{}' listening on port {}", self.name, self.port)
    }
}

fn main() {
    let s = Server {
        name: "web".to_string(),
        port: 8080,
    };

    s.print_info();

    // Can use Display since PrintInfo requires it
    println!("Display: {}", s);
    println!("Debug: {:?}", s);
}`,
            output: `[web:8080] Server 'web' listening on port 8080
Display: web:8080
Debug: Server { name: "web", port: 8080 }`,
            diagram: {
              kind: 'mermaid',
              code: 'classDiagram\n    class Display {\n        <<trait>>\n        +fmt(&self, f) Result\n    }\n    class PrintInfo {\n        <<trait>>\n        +info(&self) String\n        +print_info(&self)\n    }\n    class Server {\n        +String name\n        +u16 port\n    }\n    Display <|-- PrintInfo : supertrait\n    Display <|.. Server : implements\n    PrintInfo <|.. Server : implements\n    note for PrintInfo "PrintInfo requires Display.\\nprint_info() can use self in\\nformat strings because\\nDisplay is guaranteed."',
              caption: 'Supertrait relationship: PrintInfo requires Display. Server must implement both traits. PrintInfo methods can rely on Display being available.',
            },
          },
        ],
        quiz: [
          {
            question: 'What is the purpose of a default method in a trait?',
            options: [
              'It provides a method body that implementing types can use without overriding',
              'It marks the method as mandatory for all implementors',
              'It makes the method private to the trait',
              'It provides a fallback when the method panics',
            ],
            correctIndex: 0,
            explanation: 'Default methods have a body in the trait definition. Types implementing the trait get this default behavior for free but can override it with their own implementation if needed.',
          },
          {
            question: 'What is the orphan rule in Rust?',
            options: [
              'Traits must have at least one required method',
              'You cannot implement a trait for a type if both are defined in external crates',
              'Trait methods cannot call other trait methods',
              'You must implement all required methods or none at all',
            ],
            correctIndex: 1,
            explanation: 'The orphan rule states that to implement a trait for a type, either the trait or the type (or both) must be defined in your crate. This prevents conflicting implementations from different crates.',
          },
          {
            question: 'What does the supertrait syntax trait B: A mean?',
            options: [
              'B inherits all of A\'s methods automatically',
              'Any type implementing B must also implement A',
              'B is a subset of A',
              'A is deprecated in favor of B',
            ],
            correctIndex: 1,
            explanation: 'Supertrait syntax means B requires A: any type that implements B must also implement A. This lets default methods in B call methods from A, knowing they are available.',
          },
          {
            question: 'Which syntax is NOT a valid way to use traits in function parameters?',
            options: [
              'fn foo(x: &impl Trait)',
              'fn foo<T: Trait>(x: &T)',
              'fn foo(x: &T) where T: Trait',
              'fn foo<T>(x: &T) where T: Trait',
            ],
            correctIndex: 2,
            explanation: 'Option C is invalid because T is used in the parameter list but not declared as a generic parameter. The generic parameter <T> must be declared after the function name and before the parameter list.',
          },
        ],
        challenge: {
          prompt: 'Define a trait `Describable` with a required method `describe(&self) -> String` and a default method `short_description(&self) -> String` that truncates describe() to 30 chars. Implement it for two structs: `Product` (name, price) and `Employee` (name, department). Test both.',
          starterCode: `// TODO: define the Describable trait with describe() and short_description()

struct Product {
    name: String,
    price: f64,
}

struct Employee {
    name: String,
    department: String,
}

// TODO: implement Describable for Product and Employee

fn main() {
    // TODO: create instances and print both describe and short_description
}`,
          solutionCode: `trait Describable {
    fn describe(&self) -> String;

    fn short_description(&self) -> String {
        let desc = self.describe();
        if desc.len() > 30 {
            format!("{}...", &desc[..30])
        } else {
            desc
        }
    }
}

struct Product {
    name: String,
    price: f64,
}

struct Employee {
    name: String,
    department: String,
}

impl Describable for Product {
    fn describe(&self) -> String {
        format!("Product '{}' priced at \${:.2}", self.name, self.price)
    }
}

impl Describable for Employee {
    fn describe(&self) -> String {
        format!("Employee '{}' in the {} department", self.name, self.department)
    }
}

fn print_info(item: &impl Describable) {
    println!("Full:  {}", item.describe());
    println!("Short: {}", item.short_description());
}

fn main() {
    let laptop = Product { name: "Gaming Laptop".to_string(), price: 1299.99 };
    let alice = Employee { name: "Alice".to_string(), department: "Engineering".to_string() };

    print_info(&laptop);
    println!();
    print_info(&alice);
}`,
          hints: [
            'The default method short_description should call self.describe() and truncate the result.',
            'Use &desc[..30] to slice the first 30 characters of the description string.',
            'You can write a helper function using &impl Describable to demonstrate trait-based polymorphism.',
          ],
        },
      },
      {
        id: 'trait-bounds',
        title: 'Trait Bounds',
        difficulty: 'intermediate',
        tags: ['trait-bounds', 'where', 'generics', 'constraints', 'multiple-bounds'],
        cheatSheetSummary: 'fn func<T: Clone + Debug>(x: T) or where T: Clone + Debug',
        sections: [
          {
            heading: 'Basic Trait Bounds',
            content:
              'Trait bounds constrain generic types to those that implement specific traits. Without bounds, generic code can only use operations available on all types (essentially nothing). Bounds unlock the methods and behavior defined by the trait.',
            code: `use std::fmt::{Debug, Display};

// Single bound
fn print_debug<T: Debug>(item: &T) {
    println!("{:?}", item);
}

// Multiple bounds with +
fn print_both<T: Debug + Display>(item: &T) {
    println!("Debug:   {:?}", item);
    println!("Display: {}", item);
}

// Bounds on return type
fn largest<T: PartialOrd + Clone>(list: &[T]) -> T {
    let mut max = list[0].clone();
    for item in &list[1..] {
        if *item > max {
            max = item.clone();
        }
    }
    max
}

fn main() {
    print_debug(&vec![1, 2, 3]);
    print_both(&42);
    print_both(&"hello");

    let nums = vec![5, 2, 8, 1, 9];
    println!("largest: {}", largest(&nums));

    let strs = vec!["banana", "apple", "cherry"];
    println!("largest: {}", largest(&strs));
}`,
            output: `[1, 2, 3]
Debug:   42
Display: 42
Debug:   "hello"
Display: hello
largest: 9
largest: cherry`,
          },
          {
            heading: 'Where Clauses',
            content:
              'Where clauses provide a cleaner syntax for complex trait bounds, especially when there are multiple generic parameters or the bounds are long. They are also required for some advanced patterns like bounds on associated types.',
            code: `use std::fmt::Display;
use std::ops::Add;

// Complex bounds are cleaner with where
fn add_and_print<T, U, R>(a: T, b: U) -> R
where
    T: Add<U, Output = R> + Display + Copy,
    U: Display + Copy,
    R: Display,
{
    let result = a + b;
    println!("{} + {} = {}", a, b, result);
    result
}

// Conditional method implementation
struct Pair<T> {
    first: T,
    second: T,
}

impl<T> Pair<T> {
    fn new(first: T, second: T) -> Self {
        Pair { first, second }
    }
}

// Only available when T implements Display + PartialOrd
impl<T: Display + PartialOrd> Pair<T> {
    fn show_larger(&self) {
        if self.first >= self.second {
            println!("Larger: {}", self.first);
        } else {
            println!("Larger: {}", self.second);
        }
    }
}

fn main() {
    let result: i32 = add_and_print(5, 3);
    let result_f: f64 = add_and_print(2.5, 3.5);

    let pair = Pair::new(10, 20);
    pair.show_larger();

    // This Pair cannot call show_larger() because Vec doesn't implement Display
    let _vec_pair = Pair::new(vec![1], vec![2]);
    // _vec_pair.show_larger();  // ERROR: Vec<i32> doesn't implement Display
}`,
            output: `5 + 3 = 8
2.5 + 3.5 = 6
Larger: 20`,
            note: 'Conditional implementations (impl<T: Trait> for Type<T>) let you add methods only when the generic parameter satisfies certain bounds. This is how the standard library adds Display to Vec<T> only when T: Display.',
          },
          {
            heading: 'Blanket Implementations',
            content:
              'A blanket implementation implements a trait for all types that satisfy certain bounds. The standard library uses this pattern extensively. For example, any type that implements Display automatically gets ToString.',
            code: `use std::fmt::Display;

// Blanket implementation: any type with Display gets Printable
trait Printable {
    fn print(&self);
    fn print_with_label(&self, label: &str);
}

impl<T: Display> Printable for T {
    fn print(&self) {
        println!("{}", self);
    }

    fn print_with_label(&self, label: &str) {
        println!("{}: {}", label, self);
    }
}

fn main() {
    // Works for any Display type
    42.print();
    "hello".print();
    3.14.print();

    42.print_with_label("answer");
    "world".print_with_label("greeting");

    // Standard library blanket: Display -> ToString
    let n: i32 = 42;
    let s: String = n.to_string(); // works because i32: Display
    println!("to_string: {}", s);
}`,
            output: `42
hello
3.14
answer: 42
greeting: world
to_string: 42`,
            tip: 'The standard library blanket impl<T: Display> ToString for T is why you can call .to_string() on any type that implements Display. Understanding blanket impls helps you see why methods "magically" appear on your types.',
          },
        ],
        quiz: [
          {
            question: 'What does the + syntax mean in a trait bound like T: Debug + Display?',
            options: [
              'T must implement either Debug or Display',
              'T must implement both Debug and Display',
              'T is the sum of Debug and Display traits',
              'Debug and Display are combined into a new trait',
            ],
            correctIndex: 1,
            explanation: 'The + syntax requires T to implement all listed traits. T: Debug + Display means the type must implement both Debug and Display to be accepted by the function.',
          },
          {
            question: 'What is a blanket implementation?',
            options: [
              'An implementation for a specific concrete type',
              'An implementation of a trait for all types satisfying certain bounds',
              'A default implementation inside a trait definition',
              'An implementation that covers all methods at once',
            ],
            correctIndex: 1,
            explanation: 'A blanket implementation (e.g., impl<T: Display> Printable for T) implements a trait for every type that satisfies the bound. The standard library uses this for things like impl<T: Display> ToString for T.',
          },
          {
            question: 'When should you prefer a where clause over inline trait bounds?',
            options: [
              'When the function has no generic parameters',
              'When there are complex bounds on multiple generic parameters',
              'When the trait is from an external crate',
              'Always; inline bounds are deprecated',
            ],
            correctIndex: 1,
            explanation: 'Where clauses are preferred when bounds are complex (multiple parameters, long bound lists, or bounds on associated types). They move the bounds after the return type, keeping the function signature readable.',
          },
        ],
        challenge: {
          prompt: 'Write a generic function `largest_by` that takes a slice and a comparison function, returning a reference to the largest element. Use trait bounds to require that T: PartialOrd. Then write a conditional impl for a Wrapper<T> struct that only provides a `show` method when T: Display.',
          starterCode: `use std::fmt::Display;

fn largest_by<T>(list: &[T]) -> &T
where
    // TODO: add appropriate bounds
{
    // TODO: find and return reference to largest element
    todo!()
}

struct Wrapper<T> {
    value: T,
}

// TODO: add a conditional impl that adds show() only when T: Display

fn main() {
    let nums = vec![5, 2, 8, 1, 9, 3];
    println!("largest: {}", largest_by(&nums));

    let strs = vec!["banana", "apple", "cherry"];
    println!("largest: {}", largest_by(&strs));

    let w = Wrapper { value: 42 };
    w.show();
}`,
          solutionCode: `use std::fmt::Display;

fn largest_by<T>(list: &[T]) -> &T
where
    T: PartialOrd,
{
    let mut max = &list[0];
    for item in &list[1..] {
        if item > max {
            max = item;
        }
    }
    max
}

struct Wrapper<T> {
    value: T,
}

impl<T: Display> Wrapper<T> {
    fn show(&self) {
        println!("Wrapped value: {}", self.value);
    }
}

fn main() {
    let nums = vec![5, 2, 8, 1, 9, 3];
    println!("largest: {}", largest_by(&nums));

    let strs = vec!["banana", "apple", "cherry"];
    println!("largest: {}", largest_by(&strs));

    let w = Wrapper { value: 42 };
    w.show();
}`,
          hints: [
            'Use T: PartialOrd as the where bound so you can compare elements with > operator.',
            'Return a reference &T instead of cloning, so you do not need Clone bound.',
            'For the conditional impl, write impl<T: Display> Wrapper<T> to only add methods when T implements Display.',
          ],
        },
      },
      {
        id: 'trait-objects',
        title: 'Trait Objects',
        difficulty: 'advanced',
        tags: ['dyn', 'trait-objects', 'dynamic-dispatch', 'vtable', 'object-safety'],
        cheatSheetSummary: 'Box<dyn Trait> or &dyn Trait — runtime polymorphism via vtable',
        signature: 'dyn Trait',
        sections: [
          {
            heading: 'Static vs Dynamic Dispatch',
            content:
              'By default, Rust uses static dispatch (monomorphization): the compiler generates specialized code for each concrete type. Trait objects (dyn Trait) use dynamic dispatch: a vtable lookup at runtime determines which method to call. Use trait objects when you need heterogeneous collections or the concrete type is not known at compile time.',
            code: `trait Shape {
    fn area(&self) -> f64;
    fn name(&self) -> &str;
}

struct Circle { radius: f64 }
struct Square { side: f64 }

impl Shape for Circle {
    fn area(&self) -> f64 { std::f64::consts::PI * self.radius * self.radius }
    fn name(&self) -> &str { "Circle" }
}

impl Shape for Square {
    fn area(&self) -> f64 { self.side * self.side }
    fn name(&self) -> &str { "Square" }
}

// Static dispatch: monomorphized for each type
fn print_area_static(shape: &impl Shape) {
    println!("[static] {}: {:.2}", shape.name(), shape.area());
}

// Dynamic dispatch: single function, vtable lookup
fn print_area_dynamic(shape: &dyn Shape) {
    println!("[dynamic] {}: {:.2}", shape.name(), shape.area());
}

fn main() {
    let c = Circle { radius: 5.0 };
    let s = Square { side: 4.0 };

    print_area_static(&c);
    print_area_static(&s);

    print_area_dynamic(&c);
    print_area_dynamic(&s);

    // Heterogeneous collection (only possible with dyn)
    let shapes: Vec<Box<dyn Shape>> = vec![
        Box::new(Circle { radius: 3.0 }),
        Box::new(Square { side: 4.0 }),
        Box::new(Circle { radius: 1.0 }),
    ];

    let total_area: f64 = shapes.iter().map(|s| s.area()).sum();
    println!("Total area: {:.2}", total_area);
}`,
            output: `[static] Circle: 78.54
[static] Square: 16.00
[dynamic] Circle: 78.54
[dynamic] Square: 16.00
Total area: 47.42`,
            tip: 'Prefer static dispatch (impl Trait or generics) for performance-critical code. Use dyn Trait only when you need heterogeneous collections or when the type is determined at runtime.',
            analogy: 'Think of it like calling a phone number: static dispatch is speed-dial where the number is hard-coded at compile time. Dynamic dispatch is looking up the number in a phone book (vtable) each time you call -- slightly slower, but you can call anyone listed.',
            codeHighlightLines: [19, 20, 24, 25, 30, 31, 32, 33],
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Box<dyn Shape> (fat pointer)',
                    color: '#6366f1',
                    items: [
                      { name: 'data_ptr', value: '-> Circle { radius: 3.0 }' },
                      { name: 'vtable_ptr', value: '-> Circle vtable' },
                    ],
                  },
                  {
                    label: 'Circle vtable',
                    color: '#10b981',
                    items: [
                      { name: 'area', value: '-> Circle::area()' },
                      { name: 'name', value: '-> Circle::name()' },
                      { name: 'drop', value: '-> Circle::drop()' },
                      { name: 'size', value: '8 bytes' },
                      { name: 'align', value: '8 bytes' },
                    ],
                  },
                  {
                    label: 'Square vtable',
                    color: '#f59e0b',
                    items: [
                      { name: 'area', value: '-> Square::area()' },
                      { name: 'name', value: '-> Square::name()' },
                      { name: 'drop', value: '-> Square::drop()' },
                      { name: 'size', value: '8 bytes' },
                      { name: 'align', value: '8 bytes' },
                    ],
                  },
                ],
              },
              caption: 'A trait object (dyn Shape) is a fat pointer: a data pointer to the concrete value and a vtable pointer containing function pointers for each trait method. Method calls go through the vtable at runtime.',
            },
          },
          {
            heading: 'Object Safety',
            content:
              'Not all traits can be used as trait objects. A trait is "object-safe" if its methods can work through a vtable pointer. The main restrictions are: methods cannot return Self (unknown size), and methods cannot use generic type parameters (would need infinite vtable entries).',
            code: `// Object-safe trait (can use as dyn)
trait Animal {
    fn sound(&self) -> String;
    fn name(&self) -> &str;
}

// NOT object-safe: returns Self
// trait Cloneable {
//     fn clone_self(&self) -> Self;
// }

// NOT object-safe: generic method
// trait Serializer {
//     fn serialize<T>(&self, value: &T);
// }

// Workaround: use associated types instead of generics
trait Processor {
    fn process(&self, input: &str) -> String;
}

struct Upper;
struct Lower;

impl Processor for Upper {
    fn process(&self, input: &str) -> String { input.to_uppercase() }
}

impl Processor for Lower {
    fn process(&self, input: &str) -> String { input.to_lowercase() }
}

fn main() {
    // Object-safe: works as dyn
    let processors: Vec<Box<dyn Processor>> = vec![
        Box::new(Upper),
        Box::new(Lower),
    ];

    for p in &processors {
        println!("{}", p.process("Hello World"));
    }
}`,
            output: `HELLO WORLD
hello world`,
            warning: 'If you see "the trait X cannot be made into an object," check for methods returning Self, generic methods, or Self-sized constraints. Consider using an enum dispatch pattern instead.',
          },
          {
            heading: 'Enum Dispatch Alternative',
            content:
              'When you have a known set of types, enum dispatch provides the performance of static dispatch with the flexibility of trait objects. Each enum variant holds a different type, and a match dispatches to the right implementation.',
            code: `trait Compute {
    fn compute(&self, x: f64) -> f64;
    fn name(&self) -> &str;
}

struct Doubler;
struct Squarer;
struct Adder(f64);

impl Compute for Doubler {
    fn compute(&self, x: f64) -> f64 { x * 2.0 }
    fn name(&self) -> &str { "double" }
}

impl Compute for Squarer {
    fn compute(&self, x: f64) -> f64 { x * x }
    fn name(&self) -> &str { "square" }
}

impl Compute for Adder {
    fn compute(&self, x: f64) -> f64 { x + self.0 }
    fn name(&self) -> &str { "add" }
}

// Enum dispatch: no heap allocation, no vtable
enum Operation {
    Double(Doubler),
    Square(Squarer),
    Add(Adder),
}

impl Compute for Operation {
    fn compute(&self, x: f64) -> f64 {
        match self {
            Operation::Double(d) => d.compute(x),
            Operation::Square(s) => s.compute(x),
            Operation::Add(a) => a.compute(x),
        }
    }

    fn name(&self) -> &str {
        match self {
            Operation::Double(d) => d.name(),
            Operation::Square(s) => s.name(),
            Operation::Add(a) => a.name(),
        }
    }
}

fn main() {
    let ops = vec![
        Operation::Double(Doubler),
        Operation::Square(Squarer),
        Operation::Add(Adder(10.0)),
    ];

    let x = 5.0;
    for op in &ops {
        println!("{}({}) = {}", op.name(), x, op.compute(x));
    }
}`,
            output: `double(5) = 10
square(5) = 25
add(5) = 15`,
            note: 'Enum dispatch avoids heap allocation (no Box) and vtable indirection. It is faster but requires knowing all variants at compile time. Use it when the set of types is closed and known.',
          },
        ],
        quiz: [
          {
            question: 'What is a trait object in Rust?',
            options: [
              'A struct that implements multiple traits',
              'A fat pointer (data + vtable) enabling dynamic dispatch via dyn Trait',
              'An object created by the trait\'s constructor',
              'A type alias for a generic trait bound',
            ],
            correctIndex: 1,
            explanation: 'A trait object (dyn Trait) is a fat pointer consisting of a data pointer to the concrete value and a vtable pointer containing function pointers for each trait method. This enables runtime polymorphism.',
          },
          {
            question: 'Which of the following makes a trait NOT object-safe?',
            options: [
              'Having default method implementations',
              'Having a method that returns Self',
              'Having multiple methods',
              'Requiring Debug as a supertrait',
            ],
            correctIndex: 1,
            explanation: 'A method returning Self makes a trait not object-safe because the size of Self is unknown through a trait object pointer. Similarly, generic methods are not object-safe because they would require infinite vtable entries.',
          },
          {
            question: 'When should you prefer enum dispatch over trait objects?',
            options: [
              'When the set of types is open and extensible',
              'When you need maximum runtime flexibility',
              'When the set of types is closed and known at compile time',
              'When working with FFI',
            ],
            correctIndex: 2,
            explanation: 'Enum dispatch is preferred when all variants are known at compile time. It avoids heap allocation (no Box) and vtable indirection, providing better performance. Trait objects are better when the set of types is open-ended.',
          },
          {
            question: 'What is the key difference between &impl Trait and &dyn Trait?',
            options: [
              '&impl Trait is for references, &dyn Trait is for owned values',
              '&impl Trait uses static dispatch (monomorphized), &dyn Trait uses dynamic dispatch (vtable)',
              '&impl Trait can only be used in return types',
              'There is no difference; they compile to the same code',
            ],
            correctIndex: 1,
            explanation: '&impl Trait uses static dispatch: the compiler generates specialized code for each concrete type at compile time. &dyn Trait uses dynamic dispatch: method calls go through a vtable at runtime, allowing heterogeneous collections.',
          },
        ],
        challenge: {
          prompt: 'Create a trait `Drawable` with methods `draw(&self) -> String` and `bounding_box(&self) -> (f64, f64)`. Implement it for `Circle` and `Rect`. Create a function that takes a Vec<Box<dyn Drawable>> and prints info about each shape. Also demonstrate the enum dispatch alternative.',
          starterCode: `trait Drawable {
    fn draw(&self) -> String;
    fn bounding_box(&self) -> (f64, f64);
}

struct Circle { radius: f64 }
struct Rect { width: f64, height: f64 }

// TODO: implement Drawable for Circle and Rect

// TODO: write a function that takes Vec<Box<dyn Drawable>> and prints each shape

fn main() {
    // TODO: create a heterogeneous collection and print all shapes
}`,
          solutionCode: `trait Drawable {
    fn draw(&self) -> String;
    fn bounding_box(&self) -> (f64, f64);
}

struct Circle { radius: f64 }
struct Rect { width: f64, height: f64 }

impl Drawable for Circle {
    fn draw(&self) -> String {
        format!("Drawing circle with radius {:.1}", self.radius)
    }
    fn bounding_box(&self) -> (f64, f64) {
        (self.radius * 2.0, self.radius * 2.0)
    }
}

impl Drawable for Rect {
    fn draw(&self) -> String {
        format!("Drawing rect {:.1}x{:.1}", self.width, self.height)
    }
    fn bounding_box(&self) -> (f64, f64) {
        (self.width, self.height)
    }
}

fn render_all(shapes: &[Box<dyn Drawable>]) {
    for shape in shapes {
        let (w, h) = shape.bounding_box();
        println!("{} [bbox: {:.1}x{:.1}]", shape.draw(), w, h);
    }
}

fn main() {
    let shapes: Vec<Box<dyn Drawable>> = vec![
        Box::new(Circle { radius: 5.0 }),
        Box::new(Rect { width: 10.0, height: 3.0 }),
        Box::new(Circle { radius: 2.5 }),
    ];
    render_all(&shapes);
}`,
          hints: [
            'Use Box<dyn Drawable> to store different concrete types in the same Vec.',
            'The bounding_box for a circle is a square with side length equal to the diameter (2 * radius).',
            'In the render_all function, you can call trait methods on &dyn Drawable just like on concrete types.',
          ],
        },
      },
      {
        id: 'derive-macros',
        title: 'Derive Macros',
        difficulty: 'beginner',
        tags: ['derive', 'Debug', 'Clone', 'PartialEq', 'Hash', 'Default', 'auto-derive'],
        cheatSheetSummary: '#[derive(Debug, Clone, PartialEq)] — auto-implement common traits',
        sections: [
          {
            heading: 'Standard Derive Macros',
            content:
              'Derive macros automatically generate trait implementations from annotations. They save you from writing boilerplate code. The standard library provides derives for Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, and Default.',
            code: `#[derive(Debug, Clone, PartialEq, Eq, Hash, Default)]
struct Student {
    name: String,
    grade: u32,
    active: bool,
}

fn main() {
    // Default: all fields get their default values
    let default_student = Student::default();
    println!("Default: {:?}", default_student);

    // Debug: {:?} formatting
    let alice = Student {
        name: "Alice".to_string(),
        grade: 95,
        active: true,
    };
    println!("Debug: {:?}", alice);
    println!("Pretty: {:#?}", alice);

    // Clone: deep copy
    let bob = alice.clone();
    println!("Clone equal: {}", alice == bob);

    // PartialEq: comparison
    let carol = Student {
        name: "Carol".to_string(),
        grade: 95,
        active: true,
    };
    println!("alice == carol: {}", alice == carol);

    // Hash: can be used in HashMap/HashSet
    use std::collections::HashSet;
    let mut students = HashSet::new();
    students.insert(alice);
    students.insert(bob);       // duplicate of alice
    students.insert(carol);
    println!("unique students: {}", students.len());
}`,
            output: `Default: Student { name: "", grade: 0, active: false }
Debug: Student { name: "Alice", grade: 95, active: true }
Pretty: Student {
    name: "Alice",
    grade: 95,
    active: true,
}
Clone equal: true
alice == carol: false
unique students: 2`,
            tip: 'Add #[derive(Debug)] to virtually every struct and enum you create. It costs nothing at runtime and is invaluable for debugging with println!("{:?}", value).',
          },
          {
            heading: 'Copy vs Clone',
            content:
              'Copy and Clone are related but distinct. Clone provides .clone() for explicit deep copies. Copy marks types that can be implicitly duplicated on assignment (no move semantics). A type can only be Copy if all its fields are Copy, and the type does not implement Drop.',
            code: `// Can be Copy: all fields are Copy types
#[derive(Debug, Clone, Copy, PartialEq)]
struct Point {
    x: f64,
    y: f64,
}

// Cannot be Copy: String is not Copy
#[derive(Debug, Clone, PartialEq)]
struct Named {
    name: String,  // heap-allocated, not Copy
    value: i32,
}

fn main() {
    // Copy type: implicit copy on assignment
    let p1 = Point { x: 1.0, y: 2.0 };
    let p2 = p1;       // copied, not moved
    println!("p1: {:?}", p1);  // still valid!
    println!("p2: {:?}", p2);

    // Copy in function calls
    fn print_point(p: Point) {
        println!("Point: {:?}", p);
    }
    print_point(p1);
    println!("Still valid: {:?}", p1);

    // Non-Copy: must clone explicitly
    let n1 = Named { name: "hello".to_string(), value: 42 };
    let n2 = n1.clone();  // explicit clone required
    // let n3 = n1;        // this would MOVE n1
    println!("n1: {:?}", n1);
    println!("n2: {:?}", n2);
}`,
            output: `p1: Point { x: 1.0, y: 2.0 }
p2: Point { x: 1.0, y: 2.0 }
Point: Point { x: 1.0, y: 2.0 }
Still valid: Point { x: 1.0, y: 2.0 }
n1: Named { name: "hello", value: 42 }
n2: Named { name: "hello", value: 42 }`,
            note: 'Rule of thumb: derive Copy for small, stack-only types (coordinates, colors, flags). Do not derive Copy for types managing heap memory or system resources.',
          },
          {
            heading: 'PartialOrd and Ord',

            content:
              'PartialOrd enables comparison operators (<, >, <=, >=). Ord provides total ordering (required for sorting and BTreeMap keys). PartialOrd is separate from Ord because some types (like f64) have values that are not comparable (NaN).',
            code: `#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord)]
struct Score {
    points: u32,
    name: String,  // secondary sort
}

fn main() {
    let mut scores = vec![
        Score { points: 90, name: "Alice".to_string() },
        Score { points: 85, name: "Bob".to_string() },
        Score { points: 90, name: "Charlie".to_string() },
        Score { points: 95, name: "Diana".to_string() },
    ];

    // Sort uses Ord (derived: compares fields in order)
    scores.sort();
    for s in &scores {
        println!("{}: {}", s.name, s.points);
    }

    println!();

    // Custom sort: by points descending
    scores.sort_by(|a, b| b.points.cmp(&a.points));
    for s in &scores {
        println!("{}: {}", s.name, s.points);
    }

    // Comparison operators from PartialOrd
    let a = Score { points: 90, name: "A".to_string() };
    let b = Score { points: 85, name: "B".to_string() };
    println!("a > b: {}", a > b);
}`,
            output: `Bob: 85
Alice: 90
Charlie: 90
Diana: 95

Diana: 95
Alice: 90
Charlie: 90
Bob: 85
a > b: true`,
          },
        ],
        quiz: [
          {
            question: 'Which derive macro is recommended to add to virtually every struct and enum?',
            options: [
              'Clone',
              'Debug',
              'Default',
              'PartialEq',
            ],
            correctIndex: 1,
            explanation: 'Debug should be derived on virtually every type. It costs nothing at runtime and enables {:?} formatting for debugging with println!, assert_eq!, and error messages.',
          },
          {
            question: 'What is the key requirement for a type to derive Copy?',
            options: [
              'The type must implement Display',
              'All fields must be Copy types and the type must not implement Drop',
              'The type must be stored on the stack',
              'The type must have fewer than 8 fields',
            ],
            correctIndex: 1,
            explanation: 'Copy requires all fields to be Copy types themselves (no heap-allocated data like String or Vec) and the type cannot implement Drop. Types with String fields cannot be Copy.',
          },
          {
            question: 'What is the difference between PartialOrd and Ord?',
            options: [
              'PartialOrd is for structs, Ord is for enums',
              'PartialOrd allows some values to be incomparable; Ord provides total ordering',
              'Ord is a superset of PartialOrd with more methods',
              'There is no difference; they are aliases',
            ],
            correctIndex: 1,
            explanation: 'PartialOrd allows comparisons that may not have an answer (like f64 NaN comparisons). Ord requires total ordering where every pair of values is comparable. Ord is required for sort() and BTreeMap keys.',
          },
        ],
        challenge: {
          prompt: 'Create a struct `Card` with fields `suit` (String) and `rank` (u8). Derive Debug, Clone, PartialEq, Eq, and Hash. Create a few cards, put them in a HashSet to demonstrate deduplication, and compare cards with ==. Also create a `Point` struct with Copy semantics and show that it can be used after assignment.',
          starterCode: `use std::collections::HashSet;

// TODO: define Card with appropriate derives

// TODO: define Point with Copy semantics

fn main() {
    // TODO: create cards, insert into HashSet, show deduplication
    // TODO: create Points, show Copy behavior (use after assignment)
}`,
          solutionCode: `use std::collections::HashSet;

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
struct Card {
    suit: String,
    rank: u8,
}

#[derive(Debug, Clone, Copy, PartialEq)]
struct Point {
    x: f64,
    y: f64,
}

fn main() {
    let ace_spades = Card { suit: "Spades".to_string(), rank: 1 };
    let king_hearts = Card { suit: "Hearts".to_string(), rank: 13 };
    let ace_spades_dup = ace_spades.clone();

    println!("Equal: {}", ace_spades == ace_spades_dup);
    println!("Different: {}", ace_spades == king_hearts);

    let mut hand = HashSet::new();
    hand.insert(ace_spades);
    hand.insert(king_hearts);
    hand.insert(ace_spades_dup); // duplicate, won't be added
    println!("Unique cards: {}", hand.len());

    // Point has Copy: no move on assignment
    let p1 = Point { x: 1.0, y: 2.0 };
    let p2 = p1; // copied, not moved
    println!("p1: {:?}", p1); // still valid!
    println!("p2: {:?}", p2);
}`,
          hints: [
            'Card has a String field, so it cannot derive Copy. Use Clone instead for explicit copies.',
            'Point has only f64 fields (which are Copy), so it can derive Copy.',
            'HashSet requires Hash + Eq, so derive both on Card.',
          ],
        },
      },
      {
        id: 'common-traits',
        title: 'Common Traits',
        difficulty: 'intermediate',
        tags: ['Display', 'From', 'Into', 'Iterator', 'FromStr', 'AsRef'],
        cheatSheetSummary: 'Display, From/Into, Iterator, FromStr, AsRef — the traits you use every day',
        sections: [
          {
            heading: 'Display and Debug',
            content:
              'Display is for user-facing output ({}), Debug is for developer output ({:?}). You can derive Debug but must implement Display manually. Display is required for types used with println!, format!, and .to_string().',
            code: `use std::fmt;

#[derive(Debug)]
struct Temperature {
    celsius: f64,
}

impl Temperature {
    fn new(celsius: f64) -> Self {
        Temperature { celsius }
    }

    fn fahrenheit(&self) -> f64 {
        self.celsius * 9.0 / 5.0 + 32.0
    }
}

impl fmt::Display for Temperature {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{:.1}\u{00B0}C ({:.1}\u{00B0}F)", self.celsius, self.fahrenheit())
    }
}

fn main() {
    let temp = Temperature::new(100.0);

    // Display: user-facing
    println!("Display: {}", temp);

    // Debug: developer-facing
    println!("Debug: {:?}", temp);

    // .to_string() uses Display
    let s: String = temp.to_string();
    println!("String: {}", s);
}`,
            output: `Display: 100.0\u{00B0}C (212.0\u{00B0}F)
Debug: Temperature { celsius: 100.0 }
String: 100.0\u{00B0}C (212.0\u{00B0}F)`,
          },
          {
            heading: 'From and Into',
            content:
              'From and Into are reciprocal conversion traits. Implementing From<T> for U automatically provides Into<U> for T. Use From for constructing types from other types, and Into in generic contexts. The standard library implements many From conversions.',
            code: `#[derive(Debug)]
struct Celsius(f64);

#[derive(Debug)]
struct Fahrenheit(f64);

// Implement From: Celsius -> Fahrenheit
impl From<Celsius> for Fahrenheit {
    fn from(c: Celsius) -> Self {
        Fahrenheit(c.0 * 9.0 / 5.0 + 32.0)
    }
}

// Implement From: Fahrenheit -> Celsius
impl From<Fahrenheit> for Celsius {
    fn from(f: Fahrenheit) -> Self {
        Celsius((f.0 - 32.0) * 5.0 / 9.0)
    }
}

// Generic function using Into
fn print_as_fahrenheit(temp: impl Into<Fahrenheit>) {
    let f: Fahrenheit = temp.into();
    println!("{:.1}\u{00B0}F", f.0);
}

fn main() {
    // From: explicit conversion
    let boiling = Celsius(100.0);
    let f = Fahrenheit::from(boiling);
    println!("{:?}", f);

    // Into: implicit conversion (from the From impl)
    let body_temp = Celsius(37.0);
    let f2: Fahrenheit = body_temp.into();
    println!("{:?}", f2);

    // Standard library From conversions
    let s: String = String::from("hello");
    let n: i64 = i64::from(42_i32);
    let v: Vec<u8> = Vec::from("hello");
    println!("{} {} {:?}", s, n, v);

    // Into in generic context
    print_as_fahrenheit(Celsius(0.0));
}`,
            output: `Fahrenheit(212.0)
Fahrenheit(98.60000000000001)
hello 42 [104, 101, 108, 108, 111]
32.0\u{00B0}F`,
            tip: 'Always implement From rather than Into. You get the Into implementation for free. Use Into<T> in function signatures to accept any type convertible to T.',
          },
          {
            heading: 'FromStr and Parse',
            content:
              'The FromStr trait enables parsing strings into types using .parse(). Implementing FromStr for your type lets users write "value".parse::<YourType>(). This is how all numeric types support string parsing.',
            code: `use std::str::FromStr;

#[derive(Debug)]
struct Color {
    r: u8,
    g: u8,
    b: u8,
}

impl FromStr for Color {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        // Parse "#RRGGBB" format
        let s = s.strip_prefix('#').unwrap_or(s);
        if s.len() != 6 {
            return Err(format!("expected 6 hex digits, got {}", s.len()));
        }
        let r = u8::from_str_radix(&s[0..2], 16)
            .map_err(|e| e.to_string())?;
        let g = u8::from_str_radix(&s[2..4], 16)
            .map_err(|e| e.to_string())?;
        let b = u8::from_str_radix(&s[4..6], 16)
            .map_err(|e| e.to_string())?;
        Ok(Color { r, g, b })
    }
}

fn main() {
    // Parse standard types
    let n: i32 = "42".parse().unwrap();
    let f: f64 = "3.14".parse().unwrap();
    let b: bool = "true".parse().unwrap();
    println!("{} {} {}", n, f, b);

    // Parse custom type
    let red: Color = "#FF0000".parse().unwrap();
    println!("red: {:?}", red);

    let teal: Color = "#008080".parse().unwrap();
    println!("teal: {:?}", teal);

    // Handle parse errors
    let result: Result<Color, _> = "invalid".parse::<Color>();
    println!("error: {:?}", result);
}`,
            output: `42 3.14 true
red: Color { r: 255, g: 0, b: 0 }
teal: Color { r: 0, g: 128, b: 128 }
error: Err("expected 6 hex digits, got 7")`,
            note: 'FromStr returns Result, so parsing always handles errors explicitly. Use .parse::<Type>() with turbofish or let x: Type = str.parse() with type annotation.',
          },
        ],
        quiz: [
          {
            question: 'What is the difference between Display and Debug formatting in Rust?',
            options: [
              'Display is for serialization, Debug is for deserialization',
              'Display ({}) is for user-facing output, Debug ({:?}) is for developer output',
              'Display can be derived, Debug must be implemented manually',
              'They produce identical output but use different syntax',
            ],
            correctIndex: 1,
            explanation: 'Display ({}) formats for end-user-facing output and must be implemented manually. Debug ({:?}) formats for developer debugging and can be auto-derived. Implementing Display also gives you .to_string() for free.',
          },
          {
            question: 'If you implement From<A> for B, what do you automatically get?',
            options: [
              'Into<A> for B',
              'Into<B> for A',
              'From<B> for A',
              'TryFrom<A> for B',
            ],
            correctIndex: 1,
            explanation: 'From and Into are reciprocal. Implementing From<A> for B automatically gives you Into<B> for A via a blanket implementation in the standard library. This is why you should always implement From rather than Into.',
          },
          {
            question: 'What trait must you implement to enable "value".parse::<YourType>()?',
            options: [
              'Display',
              'TryFrom<String>',
              'FromStr',
              'Parse',
            ],
            correctIndex: 2,
            explanation: 'The FromStr trait enables the .parse() method on strings. It has one required method: fn from_str(s: &str) -> Result<Self, Self::Err>. The associated type Err defines the error type returned on parse failure.',
          },
          {
            question: 'Why should you implement From rather than Into?',
            options: [
              'From is faster at runtime',
              'Implementing From gives you the Into implementation for free',
              'Into is deprecated',
              'From works with more types',
            ],
            correctIndex: 1,
            explanation: 'The standard library has a blanket implementation: impl<T, U> Into<U> for T where U: From<T>. This means implementing From<A> for B automatically gives you Into<B> for A, so you only need to write one implementation.',
          },
        ],
        challenge: {
          prompt: 'Create a `Meters` struct wrapping an f64. Implement Display (format as "X.Xm"), From<f64>, and FromStr (parse strings like "3.5" or "3.5m"). Then implement From<Meters> for a `Feet` struct to enable unit conversion (1 meter = 3.28084 feet).',
          starterCode: `use std::fmt;
use std::str::FromStr;

struct Meters(f64);
struct Feet(f64);

// TODO: implement Display for Meters
// TODO: implement From<f64> for Meters
// TODO: implement FromStr for Meters (handle optional "m" suffix)
// TODO: implement From<Meters> for Feet (1m = 3.28084ft)

fn main() {
    // TODO: demonstrate all conversions
}`,
          solutionCode: `use std::fmt;
use std::str::FromStr;

#[derive(Debug)]
struct Meters(f64);

#[derive(Debug)]
struct Feet(f64);

impl fmt::Display for Meters {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{:.1}m", self.0)
    }
}

impl From<f64> for Meters {
    fn from(val: f64) -> Self {
        Meters(val)
    }
}

impl FromStr for Meters {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let s = s.strip_suffix('m').unwrap_or(s);
        s.trim()
            .parse::<f64>()
            .map(Meters)
            .map_err(|e| format!("invalid meters: {}", e))
    }
}

impl From<Meters> for Feet {
    fn from(m: Meters) -> Self {
        Feet(m.0 * 3.28084)
    }
}

impl fmt::Display for Feet {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{:.1}ft", self.0)
    }
}

fn main() {
    // From<f64>
    let m1: Meters = Meters::from(5.0);
    println!("{}", m1);

    // FromStr via parse
    let m2: Meters = "3.5m".parse().unwrap();
    println!("{}", m2);

    let m3: Meters = "10".parse().unwrap();
    println!("{}", m3);

    // Into Feet
    let feet: Feet = Feet::from(m1);
    println!("{}", feet);

    // Error case
    let err: Result<Meters, _> = "abc".parse::<Meters>();
    println!("Error: {:?}", err);
}`,
          hints: [
            'Use strip_suffix("m").unwrap_or(s) to handle both "3.5" and "3.5m" input formats.',
            'FromStr must return Result<Self, Self::Err>, so define type Err = String for simple error messages.',
            'Implementing From<Meters> for Feet lets you write Feet::from(meters) and also meters.into() for the conversion.',
          ],
        },
      },
    ],
  },
];

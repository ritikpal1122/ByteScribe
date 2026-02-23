import type { DocCategory } from './types';

// Part 3: Ownership & Borrowing — THE key differentiator for Rust docs
export const RUST_PART3_CATEGORIES: DocCategory[] = [
  {
    id: 'rust-ownership-borrowing',
    label: 'Ownership & Borrowing',
    icon: 'Shield',
    entries: [
      {
        id: 'ownership',
        title: 'Ownership',
        difficulty: 'intermediate',
        tags: ['ownership', 'move', 'drop', 'copy', 'memory-safety', 'scope'],
        cheatSheetSummary: 'Each value has one owner. When the owner goes out of scope, the value is dropped.',
        crossLanguageId: 'memory-management',
        sections: [
          {
            heading: 'The Three Ownership Rules',
            content:
              'Ownership is Rust\'s most distinctive feature and the foundation of its memory safety guarantee without a garbage collector. The rules are deceptively simple: (1) each value in Rust has exactly one owner, (2) there can only be one owner at a time, and (3) when the owner goes out of scope, the value is dropped (its memory is freed). These rules are enforced entirely at compile time with zero runtime overhead.',
            code: `fn main() {
    // Rule 1 & 2: each value has exactly one owner
    let s1 = String::from("hello");
    let s2 = s1;  // ownership MOVES from s1 to s2
    // println!("{}", s1);  // ERROR: s1 is no longer valid
    println!("{}", s2);     // OK: s2 is the owner now

    // Rule 3: value dropped when owner goes out of scope
    {
        let s3 = String::from("temporary");
        println!("{}", s3);
    } // s3 goes out of scope here, memory is freed

    // Copy types: stack-only data is copied, not moved
    let a = 42;       // i32 implements Copy
    let b = a;         // a is COPIED, not moved
    println!("{} {}", a, b);  // both valid!

    let t = (1, 2.0, true);   // tuple of Copy types
    let u = t;                  // copied
    println!("{:?} {:?}", t, u); // both valid
}`,
            output: `hello
temporary
42 42
(1, 2.0, true) (1, 2.0, true)`,
            note: 'Types that live entirely on the stack (all integers, floats, booleans, chars, and tuples/arrays of Copy types) implement the Copy trait. They are duplicated on assignment, not moved. Heap-allocated types like String, Vec, and Box are moved.',
            analogy: 'Think of it like owning a physical book: you can give it to someone (move), but then you no longer have it. Photocopying it (clone) means you both have a copy, but that takes effort. Numbers on a whiteboard, however, can be trivially copied just by glancing at them (Copy types).',
            codeHighlightLines: [4, 5, 6],
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Stack (s1 - INVALID after move)',
                    color: '#ef4444',
                    items: [
                      { name: 'ptr', value: '---moved---' },
                      { name: 'len', value: '---moved---' },
                      { name: 'capacity', value: '---moved---' },
                    ],
                  },
                  {
                    label: 'Stack (s2 - new owner)',
                    color: '#10b981',
                    items: [
                      { name: 'ptr', value: '0x7fa2...' },
                      { name: 'len', value: '5' },
                      { name: 'capacity', value: '5' },
                    ],
                  },
                  {
                    label: 'Heap',
                    color: '#6366f1',
                    items: [
                      { name: '[0..4]', value: '"hello"' },
                    ],
                  },
                ],
              },
              caption: 'When s1 is moved to s2, the stack data (pointer, length, capacity) transfers to s2. The heap data stays put. s1 becomes invalid.',
            },
          },
          {
            heading: 'Move Semantics in Detail',
            content:
              'When you assign a heap-allocated value to another variable or pass it to a function, ownership moves. The original variable becomes invalid immediately. This is not a shallow copy followed by invalidation — the compiler simply transfers the notion of ownership. At the machine level, the pointer/length/capacity are copied on the stack, but the heap data is not duplicated.',
            code: `fn take_ownership(s: String) {
    println!("I own: '{}'", s);
} // s is dropped here, heap memory freed

fn take_and_return(s: String) -> String {
    println!("Borrowed temporarily: '{}'", s);
    s  // return ownership to caller
}

fn main() {
    // Move into function
    let msg = String::from("hello");
    take_ownership(msg);
    // println!("{}", msg);  // ERROR: msg was moved

    // Return ownership back
    let msg2 = String::from("world");
    let msg2 = take_and_return(msg2);
    println!("Got back: '{}'", msg2);  // OK: ownership returned

    // Move in collections
    let s = String::from("data");
    let mut v = Vec::new();
    v.push(s);
    // println!("{}", s);  // ERROR: s moved into the vector
    println!("Vector: {:?}", v);

    // Moves in match/if-let
    let opt = Some(String::from("value"));
    if let Some(inner) = opt {
        println!("Got: {}", inner);
    }
    // println!("{:?}", opt);  // ERROR: opt was moved
}`,
            output: `I own: 'hello'
Borrowed temporarily: 'world'
Got back: 'world'
Vector: ["data"]
Got: value`,
            warning: 'A common pitfall: using a value after passing it to a function. The compiler error "value used here after move" means you need to either borrow (&value), clone (.clone()), or restructure your code.',
            codeHighlightLines: [2, 3, 8, 9, 10],
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n    subgraph "main()"\n        A["msg = String::from(\\"hello\\")"] --> B["take_ownership(msg)"]\n        B --> C["msg is INVALID"]\n    end\n    subgraph "take_ownership(s)"\n        D["s owns \\"hello\\""] --> E["println! uses s"]\n        E --> F["s dropped, memory freed"]\n    end\n    B -.->|"ownership moves"| D\n    style A fill:#10b981,color:#fff\n    style C fill:#ef4444,color:#fff\n    style D fill:#10b981,color:#fff\n    style F fill:#f59e0b,color:#fff',
              caption: 'Ownership moves from main\'s msg into take_ownership\'s parameter s. When take_ownership ends, s is dropped and heap memory is freed. msg can no longer be used.',
            },
          },
          {
            heading: 'Clone: Explicit Deep Copy',
            content:
              'When you need a true copy of heap data, use .clone(). This performs a deep copy — it allocates new heap memory and copies all the data. Rust makes cloning explicit so you always know when an expensive copy happens, unlike C++ where implicit copies can silently degrade performance.',
            code: `fn process(s: String) -> usize {
    s.len()
}

fn main() {
    let original = String::from("hello, world");

    // Clone to keep using the original
    let cloned = original.clone();
    let len = process(cloned);
    println!("Original: '{}', Clone length: {}", original, len);

    // Clone in a loop
    let template = String::from("item");
    let items: Vec<String> = (0..5)
        .map(|i| format!("{}_{}", template.clone(), i))
        .collect();
    println!("{:?}", items);
    println!("Template still valid: {}", template);

    // Clone vs Copy
    let num = 42;       // Copy type: no .clone() needed
    let num2 = num;     // implicit copy
    println!("{} {}", num, num2);

    let text = String::from("hello");  // Move type
    let text2 = text.clone();          // explicit clone required
    println!("{} {}", text, text2);
}`,
            output: `Original: 'hello, world', Clone length: 12
["item_0", "item_1", "item_2", "item_3", "item_4"]
Template still valid: item
42 42
hello hello`,
            tip: 'Excessive cloning is a code smell. If you find yourself cloning everywhere, consider using references (&T) instead. Cloning should be a deliberate choice, not a way to silence the borrow checker.',
          },
          {
            heading: 'Drop and RAII',
            content:
              'Rust uses RAII (Resource Acquisition Is Initialization). When a value goes out of scope, its Drop trait is called automatically, freeing any resources. This works for memory, file handles, network connections, mutex locks, and any other resource. You can implement Drop for custom cleanup logic.',
            code: `struct DatabaseConnection {
    name: String,
}

impl DatabaseConnection {
    fn new(name: &str) -> Self {
        println!("[{}] Connection opened", name);
        DatabaseConnection { name: name.to_string() }
    }

    fn query(&self, sql: &str) {
        println!("[{}] Executing: {}", self.name, sql);
    }
}

impl Drop for DatabaseConnection {
    fn drop(&mut self) {
        println!("[{}] Connection closed (cleanup)", self.name);
    }
}

fn main() {
    let conn = DatabaseConnection::new("primary");
    conn.query("SELECT * FROM users");

    {
        let temp = DatabaseConnection::new("temp");
        temp.query("SELECT 1");
        println!("--- temp scope ends ---");
    } // temp dropped here

    println!("--- main continues ---");
    conn.query("SELECT * FROM orders");
    println!("--- main scope ends ---");
} // conn dropped here`,
            output: `[primary] Connection opened
[primary] Executing: SELECT * FROM users
[temp] Connection opened
[temp] Executing: SELECT 1
--- temp scope ends ---
[temp] Connection closed (cleanup)
--- main continues ---
[primary] Executing: SELECT * FROM orders
--- main scope ends ---
[primary] Connection closed (cleanup)`,
            note: 'You cannot call .drop() explicitly on a value. Use std::mem::drop(value) if you need to force early cleanup. This is a function that takes ownership, triggering the Drop implementation.',
            analogy: 'Think of it like a hotel room: when you check out (go out of scope), the cleaning crew (Drop) automatically cleans the room and frees it for the next guest. You do not have to manually call housekeeping -- it happens as part of the checkout process.',
            codeHighlightLines: [12, 13, 14, 15],
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    subgraph "main scope"\n        A["conn = open \\"primary\\""] --> B["conn.query()"]\n        B --> C["enter inner scope"]\n        subgraph "inner scope"\n            D["temp = open \\"temp\\""] --> E["temp.query()"]\n            E --> F["end of inner scope"]\n            F --> G["DROP: temp closed"]\n        end\n        C --> D\n        G --> H["conn.query()"]\n        H --> I["end of main scope"]\n        I --> J["DROP: conn closed"]\n    end\n    style A fill:#10b981,color:#fff\n    style D fill:#6366f1,color:#fff\n    style G fill:#ef4444,color:#fff\n    style J fill:#ef4444,color:#fff',
              caption: 'Drop runs in reverse order of creation within each scope. The inner scope\'s temp is dropped first, then main scope\'s conn is dropped when main ends.',
            },
          },
        ],
        quiz: [
          {
            question: 'What happens when you assign a String variable to another variable in Rust?',
            options: [
              'The data is deep-copied to the new variable',
              'Ownership moves to the new variable and the original becomes invalid',
              'Both variables share ownership of the data',
              'The compiler creates a reference from the new variable to the original',
            ],
            correctIndex: 1,
            explanation: 'Rust uses move semantics for heap-allocated types like String. When you assign s1 to s2, ownership moves and s1 becomes invalid. This prevents double-free errors without a garbage collector.',
          },
          {
            question: 'Which types in Rust implement the Copy trait?',
            options: [
              'String, Vec, and Box',
              'All types implement Copy by default',
              'Integers, floats, booleans, chars, and tuples/arrays of Copy types',
              'Only primitive numeric types (i32, f64, etc.)',
            ],
            correctIndex: 2,
            explanation: 'Types that live entirely on the stack implement Copy: all integer types, floating-point types, booleans, chars, and tuples/arrays composed entirely of Copy types. Heap-allocated types like String, Vec, and Box do not implement Copy.',
          },
          {
            question: 'What does the Drop trait do in Rust?',
            options: [
              'It explicitly deallocates memory when you call .drop() on a value',
              'It runs cleanup code automatically when a value goes out of scope',
              'It prevents a value from being moved to another variable',
              'It converts heap-allocated data to stack-allocated data',
            ],
            correctIndex: 1,
            explanation: 'The Drop trait provides a destructor that runs automatically when a value goes out of scope (RAII pattern). You cannot call .drop() directly; use std::mem::drop(value) for early cleanup.',
          },
          {
            question: 'What happens when you pass a String to a function in Rust?',
            options: [
              'The function receives a copy of the String',
              'The function receives a reference to the String',
              'Ownership moves into the function parameter and the caller can no longer use it',
              'The String is cloned automatically before being passed',
            ],
            correctIndex: 2,
            explanation: 'Passing a String to a function transfers ownership to the function parameter. The caller loses access to the original variable. To keep access, either pass a reference (&String) or explicitly clone the value.',
          },
        ],
        challenge: {
          prompt: 'Write a function `transfer_items` that takes ownership of two Vec<String> collections, merges them into one, and returns the merged vector. Then demonstrate that the original vectors cannot be used after the call.',
          starterCode: `fn transfer_items(/* params */) -> Vec<String> {
    // Merge both vectors into one and return it
    todo!()
}

fn main() {
    let basket_a = vec![String::from("apple"), String::from("banana")];
    let basket_b = vec![String::from("cherry"), String::from("date")];

    // Call transfer_items with both baskets
    // let merged = ...

    // Print the merged vector
    // println!("Merged: {:?}", merged);

    // Attempting to use basket_a or basket_b here should cause a compile error
}`,
          solutionCode: `fn transfer_items(mut a: Vec<String>, b: Vec<String>) -> Vec<String> {
    a.extend(b);
    a
}

fn main() {
    let basket_a = vec![String::from("apple"), String::from("banana")];
    let basket_b = vec![String::from("cherry"), String::from("date")];

    let merged = transfer_items(basket_a, basket_b);
    println!("Merged: {:?}", merged);

    // basket_a and basket_b have been moved and are no longer usable
    // Uncommenting the next line would cause: "value used here after move"
    // println!("{:?}", basket_a);
}`,
          hints: [
            'The function should take both vectors by value (not by reference) to take ownership of them.',
            'Use the .extend() method on Vec to append all elements from one vector into another.',
            'Mark the first parameter as `mut` so you can modify it inside the function.',
          ],
        },
      },
      {
        id: 'references-borrowing',
        title: 'References & Borrowing',
        difficulty: 'intermediate',
        tags: ['references', 'borrowing', 'immutable', 'mutable', 'borrow-checker'],
        cheatSheetSummary: '&T for shared read, &mut T for exclusive write. Cannot mix simultaneously.',
        sections: [
          {
            heading: 'Immutable References (&T)',
            content:
              'Instead of transferring ownership, you can create a reference to a value using &. An immutable reference (&T) lets you read the data without owning it. This is called "borrowing." You can have multiple immutable references to the same data at the same time, which is safe because no one is modifying the data.',
            code: `fn calculate_length(s: &String) -> usize {
    s.len()
} // s goes out of scope, but since it doesn't own the data,
  // nothing is dropped

fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &byte) in bytes.iter().enumerate() {
        if byte == b' ' {
            return &s[..i];
        }
    }
    s
}

fn main() {
    let s = String::from("hello world");

    // Immutable borrow: caller keeps ownership
    let len = calculate_length(&s);
    println!("'{}' has {} characters", s, len);

    // Multiple immutable borrows are OK
    let r1 = &s;
    let r2 = &s;
    let r3 = &s;
    println!("{} {} {}", r1, r2, r3);

    // Borrow a slice
    let word = first_word(&s);
    println!("First word: '{}'", word);
}`,
            output: `'hello world' has 11 characters
hello world hello world hello world
First word: 'hello'`,
            tip: 'Prefer &str over &String in function parameters. A &String auto-coerces to &str, but &str also accepts string literals and slices directly.',
          },
          {
            heading: 'Mutable References (&mut T)',
            content:
              'A mutable reference (&mut T) lets you modify borrowed data. The critical rule is: you can have only ONE mutable reference to a piece of data at a time, and you cannot have any immutable references while a mutable reference exists. This prevents data races at compile time.',
            code: `fn append_world(s: &mut String) {
    s.push_str(", world");
}

fn increment_all(nums: &mut Vec<i32>) {
    for n in nums.iter_mut() {
        *n += 1;
    }
}

fn main() {
    let mut greeting = String::from("hello");
    append_world(&mut greeting);
    println!("{}", greeting);

    let mut numbers = vec![1, 2, 3, 4, 5];
    increment_all(&mut numbers);
    println!("{:?}", numbers);

    // Only ONE mutable reference at a time
    let mut data = String::from("hello");
    let r1 = &mut data;
    // let r2 = &mut data;  // ERROR: cannot borrow as mutable more than once
    r1.push_str("!");
    println!("{}", r1);
}`,
            output: `hello, world
[2, 3, 4, 5, 6]
hello!`,
            warning: 'You cannot have a mutable reference and an immutable reference to the same data at the same time. The compiler will reject code that violates this rule, even if it looks safe.',
            analogy: 'Think of it like a shared document: many people can read it at once (immutable references), but if someone is editing it (mutable reference), no one else can read or edit until they are done.',
            codeHighlightLines: [1, 2, 10, 11, 12],
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    subgraph "Allowed: Multiple &T"\n        V1["value: String"] ---|"&T"| R1["r1 (read)"]\n        V1 ---|"&T"| R2["r2 (read)"]\n        V1 ---|"&T"| R3["r3 (read)"]\n    end\n    subgraph "Allowed: Single &mut T"\n        V2["value: String"] ---|"&mut T"| M1["r1 (write)"]\n    end\n    subgraph "FORBIDDEN: Mix"\n        V3["value: String"] ---|"&T"| RX["reader"]\n        V3 ---|"&mut T"| MX["writer"]\n        RX -.-x|"COMPILE ERROR"| MX\n    end\n    style V1 fill:#6366f1,color:#fff\n    style V2 fill:#10b981,color:#fff\n    style V3 fill:#ef4444,color:#fff\n    style RX fill:#ef4444,color:#fff\n    style MX fill:#ef4444,color:#fff',
              caption: 'The borrowing rules: many readers OR one writer, never both. This prevents data races at compile time.',
            },
          },
          {
            heading: 'The Borrowing Rules in Practice',
            content:
              'The two borrowing rules are: (1) you can have either multiple &T OR a single &mut T, but not both; (2) references must always be valid (no dangling references). The compiler uses Non-Lexical Lifetimes (NLL) to track exactly when references are "alive" — from creation to last use, not to end of scope.',
            code: `fn main() {
    let mut s = String::from("hello");

    // This WORKS thanks to NLL (Non-Lexical Lifetimes)
    let r1 = &s;
    let r2 = &s;
    println!("{} {}", r1, r2);
    // r1 and r2 are no longer used after this point

    let r3 = &mut s;  // OK! r1 and r2 are "dead"
    r3.push_str(", world");
    println!("{}", r3);

    // This would NOT work:
    // let r4 = &s;
    // let r5 = &mut s;
    // println!("{}", r4);  // ERROR: r4 still alive when r5 exists

    // No dangling references
    // fn dangle() -> &String {
    //     let s = String::from("hello");
    //     &s  // ERROR: s is dropped, reference would dangle
    // }

    // Instead, return the owned value
    fn no_dangle() -> String {
        let s = String::from("hello");
        s  // ownership moved out, no dangling reference
    }

    let safe = no_dangle();
    println!("{}", safe);
}`,
            output: `hello hello
hello, world
hello`,
            note: 'Non-Lexical Lifetimes (NLL) means the compiler is smarter than you might expect. A reference is considered "alive" only from its creation to its last use, not until the end of the enclosing scope. This allows more programs to compile without restructuring.',
          },
          {
            heading: 'Common Borrow Checker Patterns',
            content:
              'Several coding patterns frequently trigger borrow checker errors. Understanding these patterns and their solutions will make you much more productive with Rust. The key insight is to minimize the scope of borrows and avoid holding references across mutation points.',
            code: `fn main() {
    // Pattern 1: Borrowing from a collection while mutating it
    let mut v = vec![1, 2, 3, 4, 5];

    // WRONG: cannot borrow v as immutable (first) and mutable (push)
    // let first = &v[0];
    // v.push(6);  // might reallocate, invalidating first
    // println!("{}", first);

    // FIX: clone the value or restructure
    let first = v[0];  // copy the i32 value
    v.push(6);
    println!("first: {}, vec: {:?}", first, v);

    // Pattern 2: Modifying a map while iterating
    use std::collections::HashMap;
    let mut scores: HashMap<&str, i32> = HashMap::new();
    scores.insert("Alice", 90);
    scores.insert("Bob", 80);

    // Collect keys first, then modify
    let keys: Vec<&str> = scores.keys().cloned().collect();
    for key in keys {
        if let Some(score) = scores.get_mut(key) {
            *score += 10;
        }
    }
    println!("{:?}", scores);

    // Pattern 3: Splitting borrows on struct fields
    struct Player {
        name: String,
        health: i32,
    }

    let mut player = Player {
        name: String::from("Hero"),
        health: 100,
    };

    // Rust allows borrowing DIFFERENT fields simultaneously
    let name_ref = &player.name;
    player.health -= 10;  // OK: different field
    println!("{} has {} hp", name_ref, player.health);
}`,
            output: `first: 1, vec: [1, 2, 3, 4, 5, 6]
{"Bob": 90, "Alice": 100}
Hero has 90 hp`,
            tip: 'When the borrow checker rejects your code, first ask: "Is there a real safety issue here?" If yes, restructure. If no, try: (1) reducing the scope of borrows, (2) cloning the data, (3) using indices instead of references, or (4) splitting struct fields.',
          },
        ],
        quiz: [
          {
            question: 'How many immutable references (&T) can you have to the same data at the same time?',
            options: [
              'Only one',
              'Exactly two',
              'Any number, as long as there are no mutable references',
              'Any number, even if mutable references also exist',
            ],
            correctIndex: 2,
            explanation: 'You can have any number of immutable references (&T) simultaneously, as long as no mutable reference (&mut T) exists at the same time. Multiple readers are safe because no one is modifying the data.',
          },
          {
            question: 'What does Rust\'s Non-Lexical Lifetimes (NLL) mean in practice?',
            options: [
              'References last until the end of the enclosing function',
              'References are considered alive only from creation to their last use',
              'All references must be explicitly dropped with std::mem::drop',
              'References are garbage collected when no longer needed',
            ],
            correctIndex: 1,
            explanation: 'NLL means the compiler tracks references from creation to last use, not to the end of the enclosing scope. This allows more programs to compile, such as using an immutable reference and then a mutable reference in the same scope.',
          },
          {
            question: 'What happens if a function takes &String as a parameter?',
            options: [
              'The function takes ownership of the String',
              'The function borrows the String without owning it; the caller retains ownership',
              'The String is cloned before being passed',
              'The function can modify the String freely',
            ],
            correctIndex: 1,
            explanation: 'An immutable reference (&String) borrows the data without transferring ownership. The caller retains ownership and can continue using the value after the function call. The function cannot modify the borrowed data.',
          },
        ],
        challenge: {
          prompt: 'Write a function `longest_name` that takes two &str references and returns a reference to the longer one. Then write a function `append_greeting` that takes a &mut String and appends ", welcome!" to it. Demonstrate both in main.',
          starterCode: `fn longest_name(/* params */) -> &str {
    // Return the longer of the two string slices
    todo!()
}

fn append_greeting(/* params */) {
    // Append ", welcome!" to the mutable string reference
    todo!()
}

fn main() {
    let name1 = String::from("Alice");
    let name2 = String::from("Bob");

    // Use longest_name to find the longer name
    // let longer = ...
    // println!("Longer name: {}", longer);

    // Use append_greeting to modify a greeting
    // let mut greeting = String::from("Hello Alice");
    // ...
    // println!("{}", greeting);
}`,
          solutionCode: `fn longest_name<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() >= b.len() { a } else { b }
}

fn append_greeting(s: &mut String) {
    s.push_str(", welcome!");
}

fn main() {
    let name1 = String::from("Alice");
    let name2 = String::from("Bob");

    let longer = longest_name(&name1, &name2);
    println!("Longer name: {}", longer);

    let mut greeting = String::from("Hello Alice");
    append_greeting(&mut greeting);
    println!("{}", greeting);
}`,
          hints: [
            'The longest_name function returns a reference, so it needs lifetime annotations since it takes two reference parameters.',
            'Use .len() to compare the lengths of the two string slices.',
            'The append_greeting function needs a &mut String parameter and can use .push_str() to append text.',
          ],
        },
      },
      {
        id: 'slices',
        title: 'Slices',
        difficulty: 'intermediate',
        tags: ['slices', 'str', 'fat-pointer', 'borrowing', 'substring'],
        cheatSheetSummary: '&[T] and &str — references to contiguous sequences, a pointer + length',
        signature: '&[T] | &str',
        sections: [
          {
            heading: 'What Are Slices?',
            content:
              'A slice is a reference to a contiguous sequence of elements in a collection. It consists of a pointer to the first element and a length — a "fat pointer" that is two words wide. Slices do not own the data they reference. &[T] is a slice of any type, and &str is a string slice (a slice of UTF-8 bytes).',
            code: `fn sum(values: &[i32]) -> i32 {
    values.iter().sum()
}

fn first_word(s: &str) -> &str {
    match s.find(' ') {
        Some(pos) => &s[..pos],
        None => s,
    }
}

fn main() {
    // Slice from an array
    let arr = [10, 20, 30, 40, 50];
    let slice: &[i32] = &arr[1..4];
    println!("slice: {:?}", slice); // [20, 30, 40]

    // Slice from a vector (same syntax)
    let vec = vec![1, 2, 3, 4, 5];
    println!("sum of all: {}", sum(&vec));
    println!("sum of [1..3]: {}", sum(&vec[1..3]));

    // String slice
    let text = String::from("hello world");
    let word = first_word(&text);
    println!("first word: '{}'", word);

    // Slice the entire collection
    let all: &[i32] = &arr[..];
    let first_three: &[i32] = &arr[..3];
    let last_two: &[i32] = &arr[3..];
    println!("all: {:?}, first 3: {:?}, last 2: {:?}", all, first_three, last_two);
}`,
            output: `slice: [20, 30, 40]
sum of all: 15
sum of [1..3]: 5
first word: 'hello'
all: [10, 20, 30, 40, 50], first 3: [10, 20, 30], last 2: [40, 50]`,
            tip: 'Always prefer &[T] over &Vec<T> and &str over &String in function parameters. Slices accept both owned and borrowed data, making your functions more reusable.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Slice &arr[1..4] (fat pointer on stack)',
                    color: '#f59e0b',
                    items: [
                      { name: 'ptr', value: '-> arr[1]' },
                      { name: 'len', value: '3' },
                    ],
                  },
                  {
                    label: 'Array arr (contiguous in memory)',
                    color: '#6366f1',
                    items: [
                      { name: '[0]', value: '10' },
                      { name: '[1]', value: '20  <-- slice start' },
                      { name: '[2]', value: '30' },
                      { name: '[3]', value: '40  <-- slice end' },
                      { name: '[4]', value: '50' },
                    ],
                  },
                ],
              },
              caption: 'A slice is a fat pointer (pointer + length) that references a contiguous region of an existing array or vector. It does not own the data.',
            },
          },
          {
            heading: 'Mutable Slices',
            content:
              'Mutable slices (&mut [T]) let you modify elements in-place without taking ownership of the collection. You can sort, reverse, swap, and modify individual elements through a mutable slice.',
            code: `fn zero_out(slice: &mut [i32]) {
    for elem in slice.iter_mut() {
        *elem = 0;
    }
}

fn bubble_sort(slice: &mut [i32]) {
    let n = slice.len();
    for i in 0..n {
        for j in 0..n - 1 - i {
            if slice[j] > slice[j + 1] {
                slice.swap(j, j + 1);
            }
        }
    }
}

fn main() {
    let mut data = vec![5, 3, 8, 1, 9, 2, 7];

    // Sort a portion
    bubble_sort(&mut data[..4]);
    println!("partial sort: {:?}", data);

    // Zero out a portion
    zero_out(&mut data[2..5]);
    println!("zeroed middle: {:?}", data);

    // Swap elements
    data.swap(0, data.len() - 1);
    println!("swapped: {:?}", data);

    // Reverse a slice
    data[..3].reverse();
    println!("reversed first 3: {:?}", data);

    // Split a mutable slice into two non-overlapping parts
    let (left, right) = data.split_at_mut(3);
    left[0] = 99;
    right[0] = 88;
    println!("split mutation: {:?}", data);
}`,
            output: `partial sort: [1, 3, 5, 8, 9, 2, 7]
zeroed middle: [1, 3, 0, 0, 0, 2, 7]
swapped: [7, 3, 0, 0, 0, 2, 1]
reversed first 3: [0, 3, 7, 0, 0, 2, 1]
split mutation: [99, 3, 7, 88, 0, 2, 1]`,
            note: 'split_at_mut is essential when you need two mutable references into the same slice. The compiler cannot verify non-overlapping borrows with regular indexing, but split_at_mut guarantees the two halves do not overlap.',
          },
          {
            heading: 'String Slices (&str) in Depth',
            content:
              'String slices (&str) are the most common slice type in Rust. They reference UTF-8 encoded bytes. String literals are &str pointing to data in the binary. You must be careful when slicing strings because byte boundaries must align with character boundaries.',
            code: `fn main() {
    // String literal: &'static str
    let literal: &str = "hello, world";

    // Slice of a String
    let owned = String::from("hello, world");
    let hello: &str = &owned[..5];
    let world: &str = &owned[7..];
    println!("{} {}", hello, world);

    // String vs &str
    let s: String = String::from("owned");  // heap allocated, growable
    let r: &str = &s;                       // borrowed slice of s
    let l: &str = "literal";               // points to binary data

    println!("{} {} {}", s, r, l);

    // DANGER: slicing multi-byte characters
    let emoji = "Hello \u{1F980}!";
    // &emoji[0..5] is OK (ASCII)
    // &emoji[6..7] would PANIC: byte 6 is in the middle of \u{1F980}

    // Safe way: use char_indices
    for (i, ch) in emoji.char_indices() {
        println!("byte {}: '{}'", i, ch);
    }
}`,
            output: `hello world
owned owned literal
byte 0: 'H'
byte 1: 'e'
byte 2: 'l'
byte 3: 'l'
byte 4: 'o'
byte 5: ' '
byte 6: '\u{1F980}'
byte 10: '!'`,
            warning: 'Slicing a string at a non-character boundary panics at runtime. Use .char_indices() or .chars() when working with non-ASCII text. Never use byte indices blindly on strings with potential multi-byte characters.',
            analogy: 'Think of it like a bookshelf of varying-width books: you can point to any book by its position from the left edge (byte offset), but if you try to grab "half a book" (slicing in the middle of a multi-byte character), you end up tearing pages.',
          },
        ],
        quiz: [
          {
            question: 'What is a slice in Rust?',
            options: [
              'An owned copy of a portion of a collection',
              'A reference (pointer + length) to a contiguous sequence of elements',
              'A mutable view into any data structure',
              'A special collection type that grows dynamically',
            ],
            correctIndex: 1,
            explanation: 'A slice is a fat pointer consisting of a pointer to the first element and a length. It references a contiguous sequence of elements without owning them. &[T] is a general slice and &str is a string slice.',
          },
          {
            question: 'Why should you prefer &[T] over &Vec<T> in function parameters?',
            options: [
              '&[T] is faster than &Vec<T> at runtime',
              '&Vec<T> is deprecated in modern Rust',
              '&[T] accepts both Vec slices and array slices, making the function more reusable',
              '&[T] allows mutation while &Vec<T> does not',
            ],
            correctIndex: 2,
            explanation: '&[T] is more general than &Vec<T>. A &Vec<T> auto-coerces to &[T], but &[T] also accepts slices of arrays and other contiguous data. Using &[T] makes your functions work with a wider variety of inputs.',
          },
          {
            question: 'What happens if you slice a Rust string at a byte offset that falls in the middle of a multi-byte UTF-8 character?',
            options: [
              'The compiler rejects it at compile time',
              'The character is truncated silently',
              'The program panics at runtime',
              'An empty string is returned',
            ],
            correctIndex: 2,
            explanation: 'Slicing a string at a non-character boundary causes a runtime panic with a message like "byte index is not a char boundary." Use .char_indices() for safe slicing of multi-byte strings.',
          },
          {
            question: 'What does split_at_mut do on a mutable slice?',
            options: [
              'Splits the slice into two owned vectors',
              'Creates two non-overlapping mutable references to different parts of the slice',
              'Removes the element at the given index',
              'Sorts the slice and returns two halves',
            ],
            correctIndex: 1,
            explanation: 'split_at_mut divides a mutable slice into two non-overlapping mutable sub-slices at the given index. This is essential when you need two simultaneous mutable references into the same slice, which regular indexing would not allow.',
          },
        ],
        challenge: {
          prompt: 'Write a function `second_largest` that takes a &[i32] slice and returns an Option<i32> containing the second largest element (or None if there are fewer than 2 unique values). Do not modify the original data.',
          starterCode: `fn second_largest(values: &[i32]) -> Option<i32> {
    // Find the second largest unique value in the slice
    // Return None if fewer than 2 unique values exist
    todo!()
}

fn main() {
    let nums = [10, 5, 20, 15, 20, 5];
    // Should print: Some(15)
    // println!("Second largest: {:?}", second_largest(&nums));

    let single = [42];
    // Should print: None
    // println!("Second largest: {:?}", second_largest(&single));

    let empty: [i32; 0] = [];
    // Should print: None
    // println!("Second largest: {:?}", second_largest(&empty));
}`,
          solutionCode: `fn second_largest(values: &[i32]) -> Option<i32> {
    if values.len() < 2 {
        return None;
    }

    let mut largest = i32::MIN;
    let mut second = i32::MIN;

    for &val in values {
        if val > largest {
            second = largest;
            largest = val;
        } else if val > second && val != largest {
            second = val;
        }
    }

    if second == i32::MIN && values.iter().filter(|&&v| v != largest).count() == 0 {
        None
    } else {
        Some(second)
    }
}

fn main() {
    let nums = [10, 5, 20, 15, 20, 5];
    println!("Second largest: {:?}", second_largest(&nums));

    let single = [42];
    println!("Second largest: {:?}", second_largest(&single));

    let empty: [i32; 0] = [];
    println!("Second largest: {:?}", second_largest(&empty));
}`,
          hints: [
            'Iterate through the slice with `for &val in values` to get copies of each i32 element.',
            'Track the largest and second largest values using two variables, updating them as you iterate.',
            'Handle edge cases: empty slices, slices with one element, and slices where all values are the same.',
          ],
        },
      },
      {
        id: 'lifetime-basics',
        title: 'Lifetime Basics',
        difficulty: 'advanced',
        tags: ['lifetimes', 'annotations', 'generic-lifetime', 'dangling-reference'],
        cheatSheetSummary: "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str — explicit lifetime annotations",
        sections: [
          {
            heading: 'Why Lifetimes Exist',
            content:
              'Lifetimes are Rust\'s way of ensuring every reference is valid for as long as it is used. They prevent dangling references — pointers to freed memory. Most of the time, lifetimes are inferred automatically by the compiler. You only need explicit annotations when the compiler cannot determine how the lifetimes of function inputs relate to outputs.',
            code: `// This will NOT compile: dangling reference
// fn dangling() -> &str {
//     let s = String::from("hello");
//     &s  // ERROR: s is dropped at end of function
// }

// Fix: return the owned value instead
fn not_dangling() -> String {
    String::from("hello")
}

// Lifetimes are usually inferred
fn first_char(s: &str) -> &str {
    &s[..1]  // compiler infers: output lives as long as input
}

fn main() {
    let s = not_dangling();
    println!("{}", s);

    let text = String::from("hello");
    let ch = first_char(&text);
    println!("first char: {}", ch);

    // The reference ch is valid as long as text is valid
    // because the compiler inferred their lifetimes are linked
}`,
            output: `hello
first char: h`,
            note: 'Lifetime annotations do not change how long a value lives. They describe the relationships between the lifetimes of different references so the compiler can verify safety.',
          },
          {
            heading: 'Explicit Lifetime Annotations',
            content:
              'When a function takes multiple references and returns a reference, the compiler may not be able to determine which input the output borrows from. In these cases, you must annotate lifetimes explicitly using the \'a syntax (a tick followed by a name).',
            code: `// The returned reference lives as long as the shorter
// of the two input lifetimes
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let string1 = String::from("long string is long");

    {
        let string2 = String::from("xyz");
        let result = longest(string1.as_str(), string2.as_str());
        println!("Longest: {}", result);
        // result is valid here because both string1 and string2 are alive
    }
    // string2 is dropped here

    // This would NOT compile:
    // let result;
    // {
    //     let string2 = String::from("xyz");
    //     result = longest(string1.as_str(), string2.as_str());
    // }
    // println!("{}", result);  // ERROR: string2 dropped, result might dangle
}`,
            output: `Longest: long string is long`,
            warning: 'A common mistake is thinking lifetime annotations extend a value\'s lifetime. They do not. They tell the compiler about relationships between references so it can reject code where a reference might outlive its data.',
            analogy: 'Think of it like expiration dates on food: the lifetime annotation does not make the food last longer -- it labels how long it is valid so the system can warn you before you consume something expired.',
            codeHighlightLines: [3, 4],
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    subgraph "Outer scope"\n        S1["string1: \\"long string is long\\""] --> R["result = longest(s1, s2)"]\n        subgraph "Inner scope"\n            S2["string2: \\"xyz\\""] --> R\n            R --> P["println!(result) -- OK here"]\n            P --> DROP2["string2 dropped"]\n        end\n        DROP2 --> AFTER["result INVALID after inner scope"]\n    end\n    style S1 fill:#10b981,color:#fff\n    style S2 fill:#f59e0b,color:#fff\n    style R fill:#6366f1,color:#fff\n    style DROP2 fill:#ef4444,color:#fff\n    style AFTER fill:#ef4444,color:#fff',
              caption: 'The lifetime \'a is the overlap of both input lifetimes. result is valid only while both string1 AND string2 are alive (the inner scope). After string2 is dropped, result would dangle.',
            },
          },
          {
            heading: 'Lifetimes in Structs',
            content:
              'When a struct holds a reference, you must annotate the lifetime to tell the compiler that the struct cannot outlive the data it references. This ensures the struct never contains a dangling reference.',
            code: `// This struct borrows a string slice
#[derive(Debug)]
struct Excerpt<'a> {
    text: &'a str,
    line_number: usize,
}

impl<'a> Excerpt<'a> {
    fn new(text: &'a str, line_number: usize) -> Self {
        Excerpt { text, line_number }
    }

    fn display(&self) {
        println!("Line {}: {}", self.line_number, self.text);
    }
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");

    let excerpt = Excerpt::new(&novel[..16], 1);
    excerpt.display();
    println!("{:?}", excerpt);

    // excerpt cannot outlive novel
    // drop(novel);         // if uncommented:
    // excerpt.display();   // ERROR: novel dropped, excerpt dangles

    // You can have multiple excerpts from the same source
    let e1 = Excerpt::new(&novel[..16], 1);
    let e2 = Excerpt::new(&novel[17..], 2);
    println!("{:?}", e1);
    println!("{:?}", e2);
}`,
            output: `Line 1: Call me Ishmael.
Excerpt { text: "Call me Ishmael.", line_number: 1 }
Excerpt { text: "Call me Ishmael.", line_number: 1 }
Excerpt { text: "Some years ago...", line_number: 2 }`,
            tip: 'If your struct holds references, always ask: "What is this struct borrowing, and how long does that data live?" The lifetime annotation makes this relationship explicit and enforced.',
          },
        ],
        quiz: [
          {
            question: 'Why do lifetimes exist in Rust?',
            options: [
              'To allow manual memory allocation like C',
              'To ensure every reference is valid for as long as it is used, preventing dangling references',
              'To implement garbage collection at compile time',
              'To allow multiple ownership of the same data',
            ],
            correctIndex: 1,
            explanation: 'Lifetimes are Rust\'s mechanism for ensuring references never outlive the data they point to, preventing dangling references. They are checked entirely at compile time with zero runtime overhead.',
          },
          {
            question: 'What does a lifetime annotation like \'a in a function signature do?',
            options: [
              'It extends the life of the referenced data',
              'It allocates memory that lasts for the duration \'a',
              'It describes the relationship between input and output reference lifetimes so the compiler can verify safety',
              'It creates a garbage collector scope named \'a',
            ],
            correctIndex: 2,
            explanation: 'Lifetime annotations do not change how long values live. They describe relationships between lifetimes of different references so the compiler can verify that no reference outlives its data.',
          },
          {
            question: 'When a struct holds a reference field, what must you do?',
            options: [
              'Use Box to wrap the reference',
              'Annotate the struct with a lifetime parameter to ensure it cannot outlive the referenced data',
              'Use unsafe code to bypass the borrow checker',
              'Clone the data into the struct instead',
            ],
            correctIndex: 1,
            explanation: 'When a struct holds a reference, you must add a lifetime parameter (e.g., struct Foo<\'a> { field: &\'a str }) to express that the struct cannot outlive the data it borrows.',
          },
        ],
        challenge: {
          prompt: 'Create a struct `TextWindow<\'a>` that holds a &str reference to some text and a start/end range. Implement a method `content(&self) -> &str` that returns the slice of text in the window range, and a method `shift_right(&mut self, n: usize)` that moves the window forward by n positions (clamping to the text length).',
          starterCode: `struct TextWindow<'a> {
    // Add fields: text, start, end
}

impl<'a> TextWindow<'a> {
    fn new(text: &'a str, start: usize, end: usize) -> Self {
        todo!()
    }

    fn content(&self) -> &str {
        // Return the substring from start..end
        todo!()
    }

    fn shift_right(&mut self, n: usize) {
        // Move start and end forward by n, clamping to text length
        todo!()
    }
}

fn main() {
    let text = "The quick brown fox jumps over the lazy dog";
    // let mut window = TextWindow::new(text, 0, 9);
    // println!("Window: '{}'", window.content());
    // window.shift_right(4);
    // println!("After shift: '{}'", window.content());
}`,
          solutionCode: `struct TextWindow<'a> {
    text: &'a str,
    start: usize,
    end: usize,
}

impl<'a> TextWindow<'a> {
    fn new(text: &'a str, start: usize, end: usize) -> Self {
        let end = end.min(text.len());
        let start = start.min(end);
        TextWindow { text, start, end }
    }

    fn content(&self) -> &str {
        &self.text[self.start..self.end]
    }

    fn shift_right(&mut self, n: usize) {
        self.start = (self.start + n).min(self.text.len());
        self.end = (self.end + n).min(self.text.len());
    }
}

fn main() {
    let text = "The quick brown fox jumps over the lazy dog";
    let mut window = TextWindow::new(text, 0, 9);
    println!("Window: '{}'", window.content());
    window.shift_right(4);
    println!("After shift: '{}'", window.content());
    window.shift_right(100);
    println!("Clamped: '{}'", window.content());
}`,
          hints: [
            'The struct needs three fields: text (&\'a str), start (usize), and end (usize).',
            'Use .min() to clamp the start and end values to the text length to prevent panics.',
            'The content method simply returns &self.text[self.start..self.end].',
          ],
        },
      },
      {
        id: 'lifetime-elision',
        title: 'Lifetime Elision',
        difficulty: 'advanced',
        tags: ['lifetime-elision', 'implicit-lifetimes', 'compiler-rules'],
        cheatSheetSummary: 'The compiler applies 3 elision rules to infer lifetimes in function signatures',
        sections: [
          {
            heading: 'The Three Elision Rules',
            content:
              'Rust has three rules that allow the compiler to infer lifetimes in function signatures, so you do not need to annotate them in common cases. Rule 1: each reference parameter gets its own lifetime. Rule 2: if there is exactly one input lifetime, it is assigned to all output lifetimes. Rule 3: if one parameter is &self or &mut self, the lifetime of self is assigned to all output lifetimes.',
            code: `// Rule 1 + 2: one input reference -> output gets same lifetime
// fn first_word(s: &str) -> &str
// Compiler sees: fn first_word<'a>(s: &'a str) -> &'a str
fn first_word(s: &str) -> &str {
    &s[..s.find(' ').unwrap_or(s.len())]
}

// Rule 3: &self method -> output gets self's lifetime
struct Config {
    name: String,
}

impl Config {
    // fn name(&self) -> &str
    // Compiler sees: fn name<'a>(&'a self) -> &'a str
    fn name(&self) -> &str {
        &self.name
    }
}

// Multiple inputs: Rule 1 gives each its own lifetime
// but Rule 2 does not apply (two input lifetimes)
// This REQUIRES explicit annotation:
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let text = String::from("hello world");
    println!("{}", first_word(&text));

    let config = Config { name: String::from("prod") };
    println!("{}", config.name());

    println!("{}", longest("abc", "xy"));
}`,
            output: `hello
prod
abc`,
            note: 'Lifetime elision makes most Rust code free of explicit lifetime annotations. You only need them when the compiler cannot apply the three rules — typically when returning a reference that could come from multiple inputs.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    subgraph "Rule 1: Each param gets own lifetime"\n        A1["fn foo(x: &str, y: &str)"] --> A2["fn foo<\'a, \'b>(x: &\'a str, y: &\'b str)"]\n    end\n    subgraph "Rule 2: One input lifetime -> assign to output"\n        B1["fn first(s: &str) -> &str"] --> B2["fn first<\'a>(s: &\'a str) -> &\'a str"]\n    end\n    subgraph "Rule 3: &self lifetime -> assign to output"\n        C1["fn name(&self) -> &str"] --> C2["fn name<\'a>(&\'a self) -> &\'a str"]\n    end\n    subgraph "Elision FAILS"\n        D1["fn longest(x: &str, y: &str) -> &str"] --> D2["Two input lifetimes, one output\\nCompiler cannot decide!\\nYou must annotate manually."]\n    end\n    style A2 fill:#10b981,color:#fff\n    style B2 fill:#10b981,color:#fff\n    style C2 fill:#10b981,color:#fff\n    style D2 fill:#ef4444,color:#fff',
              caption: 'The three elision rules applied step by step. When all three fail to resolve output lifetimes, you must annotate explicitly.',
            },
          },
          {
            heading: 'When Elision Fails',
            content:
              'Elision fails when the compiler cannot determine which input lifetime the output borrows from. This happens with functions taking multiple reference parameters that return a reference. Understanding when elision fails helps you know when to add annotations.',
            code: `// ELISION FAILS: two &str inputs, one &str output
// The compiler does not know if the output borrows from x or y
// fn longest(x: &str, y: &str) -> &str  // ERROR without lifetime

// FIX: annotate to say "output lives as long as both inputs"
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

// Sometimes only one input matters
fn first_of_two<'a>(x: &'a str, _y: &str) -> &'a str {
    x  // output borrows only from x
}

// Elision works fine with &self (Rule 3)
struct Parser {
    input: String,
}

impl Parser {
    fn peek(&self) -> &str {
        &self.input[..1]  // borrows from self, elision handles it
    }

    // But if you return something NOT from self, annotate:
    fn pick<'a>(&self, alt: &'a str) -> &'a str {
        if self.input.is_empty() { alt } else { alt }
    }
}

fn main() {
    println!("{}", longest("hello", "hi"));
    println!("{}", first_of_two("first", "second"));

    let p = Parser { input: String::from("abc") };
    println!("{}", p.peek());
}`,
            output: `hello
first
a`,
            tip: 'If the compiler asks for lifetime annotations, think about which input the output actually borrows from. Often the output only borrows from one input, and you can give different lifetime parameters to express this precisely.',
          },
          {
            heading: 'Static Lifetime',
            content:
              'The \'static lifetime means the reference can live for the entire program duration. String literals have \'static lifetime because they are embedded in the binary. Be careful with \'static — it is a very strong requirement.',
            code: `// String literals are &'static str
let s: &'static str = "I live forever";

// Constants are always 'static
const GREETING: &str = "hello"; // implicitly &'static str

fn main() {
    println!("{}", s);
    println!("{}", GREETING);

    // Trait objects often need 'static
    fn make_message() -> Box<dyn std::fmt::Display> {
        Box::new("hello, world")
    }
    println!("{}", make_message());

    // 'static does NOT mean "lives forever" in trait bounds
    // It means "CAN live that long" (contains no non-'static refs)
    fn takes_static<T: 'static>(val: T) {
        println!("size: {}", std::mem::size_of_val(&val));
    }

    takes_static(42_i32);        // OK: i32 has no references
    takes_static(String::from("hi")); // OK: String owns its data

    // This would NOT work:
    // let local = String::from("hi");
    // let r: &str = &local;
    // takes_static(r);  // ERROR: r borrows local, not 'static
}`,
            output: `I live forever
hello
hello, world
size: 4
size: 24`,
            warning: 'T: \'static does NOT mean "T is a &\'static reference." It means "T contains no non-\'static references" — so String, i32, and Vec<u8> are all \'static. A common source of confusion.',
          },
        ],
        quiz: [
          {
            question: 'What is the first lifetime elision rule?',
            options: [
              'All output lifetimes are set to \'static',
              'Each reference parameter gets its own distinct lifetime parameter',
              'All parameters share the same lifetime',
              'The shortest lifetime is assigned to all parameters',
            ],
            correctIndex: 1,
            explanation: 'Rule 1: Each reference parameter gets its own lifetime parameter. So fn foo(x: &str, y: &str) becomes fn foo<\'a, \'b>(x: &\'a str, y: &\'b str) internally.',
          },
          {
            question: 'When does lifetime elision fail and require explicit annotations?',
            options: [
              'When a function takes any references as parameters',
              'When a function returns an owned type like String',
              'When a function takes multiple reference parameters and returns a reference',
              'When a function uses generic type parameters',
            ],
            correctIndex: 2,
            explanation: 'Elision fails when the compiler cannot determine which input lifetime the output borrows from. This typically happens when there are multiple input reference parameters and a reference return type, and the function is not a method on &self.',
          },
          {
            question: 'What does the \'static lifetime mean?',
            options: [
              'The value is allocated on the stack',
              'The reference can live for the entire program duration',
              'The value is immutable',
              'The value is stored in a static variable',
            ],
            correctIndex: 1,
            explanation: 'The \'static lifetime means the reference can live for the entire duration of the program. String literals have \'static lifetime because they are embedded in the binary. T: \'static means T contains no non-\'static references (not that T is a static reference).',
          },
          {
            question: 'Which elision rule applies to methods with &self?',
            options: [
              'Rule 1: each parameter gets its own lifetime',
              'Rule 2: single input lifetime assigned to output',
              'Rule 3: self\'s lifetime is assigned to all output lifetimes',
              'No rule applies; methods always need explicit annotations',
            ],
            correctIndex: 2,
            explanation: 'Rule 3 states that if one of the parameters is &self or &mut self, the lifetime of self is assigned to all output reference lifetimes. This is why most method return types do not need explicit lifetime annotations.',
          },
        ],
        challenge: {
          prompt: 'Write a struct `KeyValueStore` with a method `get_or_default` that takes a key (&str) and a default value (&str) and returns &str. Think about which elision rule applies (or if you need explicit annotations). Also write a free function `pick_longer` that takes two &str and returns the longer one.',
          starterCode: `struct KeyValueStore {
    data: Vec<(String, String)>,
}

impl KeyValueStore {
    fn new() -> Self {
        KeyValueStore { data: Vec::new() }
    }

    fn insert(&mut self, key: &str, value: &str) {
        self.data.push((key.to_string(), value.to_string()));
    }

    // Does elision work here? Or do you need explicit lifetimes?
    // The return could come from self.data or from the default parameter
    fn get_or_default(/* params */) -> &str {
        todo!()
    }
}

// Does elision work for this free function?
fn pick_longer(/* params */) -> &str {
    todo!()
}

fn main() {
    // let mut store = KeyValueStore::new();
    // store.insert("name", "Rust");
    // println!("{}", store.get_or_default("name", "unknown"));
    // println!("{}", store.get_or_default("missing", "fallback"));
    // println!("{}", pick_longer("hello", "hi"));
}`,
          solutionCode: `struct KeyValueStore {
    data: Vec<(String, String)>,
}

impl KeyValueStore {
    fn new() -> Self {
        KeyValueStore { data: Vec::new() }
    }

    fn insert(&mut self, key: &str, value: &str) {
        self.data.push((key.to_string(), value.to_string()));
    }

    // Elision rule 3 would assign self's lifetime to output,
    // but output might come from 'default' instead of self.
    // We need explicit annotations for the default parameter.
    fn get_or_default<'a>(&'a self, key: &str, default: &'a str) -> &'a str {
        for (k, v) in &self.data {
            if k == key {
                return v;
            }
        }
        default
    }
}

// Elision fails: two input lifetimes, one output
fn pick_longer<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() >= b.len() { a } else { b }
}

fn main() {
    let mut store = KeyValueStore::new();
    store.insert("name", "Rust");
    println!("{}", store.get_or_default("name", "unknown"));
    println!("{}", store.get_or_default("missing", "fallback"));
    println!("{}", pick_longer("hello", "hi"));
}`,
          hints: [
            'For get_or_default, the return value could come from either &self (the stored data) or the default parameter, so elision rule 3 alone is insufficient.',
            'Give &self and the default parameter the same lifetime \'a so the return type can borrow from either source.',
            'For pick_longer, elision fails because there are two input lifetimes. Use the same pattern as the longest function.',
          ],
        },
      },
      {
        id: 'lifetime-bounds',
        title: 'Lifetime Bounds',
        difficulty: 'advanced',
        tags: ['lifetime-bounds', 'HRTB', 'where-clause', 'advanced-lifetimes'],
        cheatSheetSummary: "T: 'a means T must outlive 'a. Used in generics and trait objects.",
        sections: [
          {
            heading: 'Lifetime Bounds on Generic Types',
            content:
              'Lifetime bounds constrain how long a generic type must live. T: \'a means "T must outlive the lifetime \'a" — that is, T does not contain any references shorter than \'a. This is essential for storing references in generic containers.',
            code: `use std::fmt::Display;

// T must outlive 'a
#[derive(Debug)]
struct Wrapper<'a, T: 'a> {
    value: &'a T,
}

impl<'a, T: Display + 'a> Wrapper<'a, T> {
    fn new(value: &'a T) -> Self {
        Wrapper { value }
    }

    fn display(&self) {
        println!("Wrapped: {}", self.value);
    }
}

// Multiple lifetime bounds
fn pick_first<'a, 'b: 'a>(x: &'a str, _y: &'b str) -> &'a str {
    x  // 'b outlives 'a, so this is safe
}

fn main() {
    let num = 42;
    let w = Wrapper::new(&num);
    w.display();
    println!("{:?}", w);

    let s1 = String::from("hello");
    let result;
    {
        let s2 = String::from("world");
        result = pick_first(&s1, &s2);
    }
    println!("{}", result); // OK: result borrows from s1 which is still alive
}`,
            output: `Wrapped: 42
Wrapper { value: 42 }
hello`,
            note: '\'b: \'a means "lifetime \'b outlives lifetime \'a." Think of it as "\'b is at least as long as \'a." This is used when you need to express that one reference outlives another.',
          },
          {
            heading: 'Lifetime Bounds with Trait Objects',
            content:
              'Trait objects (dyn Trait) have an implicit lifetime bound. By default, Box<dyn Trait> means Box<dyn Trait + \'static>. When you need a trait object that borrows data, you must specify the lifetime explicitly.',
            code: `trait Summarize {
    fn summary(&self) -> String;
}

struct Article<'a> {
    title: &'a str,
    content: &'a str,
}

impl<'a> Summarize for Article<'a> {
    fn summary(&self) -> String {
        format!("{}: {}", self.title, &self.content[..20.min(self.content.len())])
    }
}

// Trait object with explicit lifetime
fn get_summary<'a>(items: &'a [Box<dyn Summarize + 'a>]) -> Vec<String> {
    items.iter().map(|item| item.summary()).collect()
}

fn main() {
    let title = String::from("Rust Ownership");
    let content = String::from("Understanding ownership is key to Rust.");

    let article = Article {
        title: &title,
        content: &content,
    };

    println!("{}", article.summary());

    // Box with lifetime
    let boxed: Box<dyn Summarize + '_> = Box::new(article);
    println!("{}", boxed.summary());
}`,
            output: `Rust Ownership: Understanding ownersh
Rust Ownership: Understanding ownersh`,
            tip: 'When you see the error "lifetime may not live long enough" with trait objects, try adding + \'_ to the dyn Trait to let the compiler infer the correct lifetime instead of defaulting to \'static.',
          },
          {
            heading: 'Practical Lifetime Patterns',
            content:
              'Here are the most common lifetime patterns you will encounter in real Rust code. Understanding these patterns makes working with lifetimes much more intuitive.',
            code: `// Pattern 1: Iterator that borrows from a collection
struct Words<'a> {
    text: &'a str,
    position: usize,
}

impl<'a> Iterator for Words<'a> {
    type Item = &'a str;

    fn next(&mut self) -> Option<Self::Item> {
        let remaining = &self.text[self.position..];
        if remaining.is_empty() {
            return None;
        }
        let end = remaining.find(' ').unwrap_or(remaining.len());
        let word = &self.text[self.position..self.position + end];
        self.position += end;
        // Skip whitespace
        while self.position < self.text.len()
            && self.text.as_bytes()[self.position] == b' '
        {
            self.position += 1;
        }
        Some(word)
    }
}

// Pattern 2: Builder that borrows configuration
struct QueryBuilder<'a> {
    table: &'a str,
    conditions: Vec<String>,
}

impl<'a> QueryBuilder<'a> {
    fn new(table: &'a str) -> Self {
        QueryBuilder { table, conditions: Vec::new() }
    }

    fn where_clause(&mut self, cond: &str) -> &mut Self {
        self.conditions.push(cond.to_string());
        self
    }

    fn build(&self) -> String {
        let mut q = format!("SELECT * FROM {}", self.table);
        if !self.conditions.is_empty() {
            q.push_str(" WHERE ");
            q.push_str(&self.conditions.join(" AND "));
        }
        q
    }
}

fn main() {
    // Pattern 1
    let text = "hello world from rust";
    let words = Words { text, position: 0 };
    let collected: Vec<&str> = words.collect();
    println!("{:?}", collected);

    // Pattern 2
    let query = QueryBuilder::new("users")
        .where_clause("age > 18")
        .where_clause("active = true")
        .build();
    println!("{}", query);
}`,
            output: `["hello", "world", "from", "rust"]
SELECT * FROM users WHERE age > 18 AND active = true`,
          },
        ],
        quiz: [
          {
            question: 'What does T: \'a mean in Rust?',
            options: [
              'T must be allocated with lifetime \'a',
              'T must not contain any references shorter than \'a (T outlives \'a)',
              'T is a reference with lifetime \'a',
              'T must be a \'static type',
            ],
            correctIndex: 1,
            explanation: 'T: \'a means "T must outlive the lifetime \'a" -- that is, T does not contain any references shorter than \'a. This is essential when storing references in generic containers.',
          },
          {
            question: 'What is the default lifetime bound for Box<dyn Trait>?',
            options: [
              'There is no default; you must always specify it',
              'Box<dyn Trait + \'_> (inferred from context)',
              'Box<dyn Trait + \'static>',
              'Box<dyn Trait + \'a> where \'a is the enclosing scope',
            ],
            correctIndex: 2,
            explanation: 'By default, Box<dyn Trait> means Box<dyn Trait + \'static>. This means the trait object must not contain any non-\'static references. If you need a trait object that borrows data, you must specify the lifetime explicitly.',
          },
          {
            question: 'What does \'b: \'a mean in a function signature like fn foo<\'a, \'b: \'a>(...)?',
            options: [
              'Lifetime \'b is shorter than \'a',
              'Lifetime \'b outlives (is at least as long as) \'a',
              'Lifetimes \'a and \'b are the same',
              'Lifetime \'a is a sub-lifetime of \'b and cannot be used independently',
            ],
            correctIndex: 1,
            explanation: '\'b: \'a means "lifetime \'b outlives lifetime \'a" or equivalently "\'b is at least as long as \'a." This allows you to return a reference with lifetime \'a from data that lives for \'b, since \'b covers \'a entirely.',
          },
        ],
        challenge: {
          prompt: 'Create a generic struct `CacheEntry<\'a, T>` where T: Display + \'a, that stores a reference to a value and an expiry label (&str). Implement a method `display_with_expiry` that prints both. Then create a function that takes a slice of CacheEntry items and returns the entry with the longest expiry label.',
          starterCode: `use std::fmt::Display;

struct CacheEntry<'a, T: Display + 'a> {
    // Add fields: value (&'a T) and expiry (&'a str)
}

impl<'a, T: Display + 'a> CacheEntry<'a, T> {
    fn new(value: &'a T, expiry: &'a str) -> Self {
        todo!()
    }

    fn display_with_expiry(&self) {
        // Print "Value: {value}, Expiry: {expiry}"
        todo!()
    }
}

// Return the entry with the longest expiry label
fn longest_expiry<'a, T: Display + 'a>(
    entries: &[CacheEntry<'a, T>],
) -> Option<&CacheEntry<'a, T>> {
    todo!()
}

fn main() {
    // let num1 = 42;
    // let num2 = 99;
    // let entries = vec![
    //     CacheEntry::new(&num1, "2025-12-31"),
    //     CacheEntry::new(&num2, "2026-06-15T12:00"),
    // ];
    // for entry in &entries {
    //     entry.display_with_expiry();
    // }
    // if let Some(longest) = longest_expiry(&entries) {
    //     println!("Longest expiry entry:");
    //     longest.display_with_expiry();
    // }
}`,
          solutionCode: `use std::fmt::Display;

struct CacheEntry<'a, T: Display + 'a> {
    value: &'a T,
    expiry: &'a str,
}

impl<'a, T: Display + 'a> CacheEntry<'a, T> {
    fn new(value: &'a T, expiry: &'a str) -> Self {
        CacheEntry { value, expiry }
    }

    fn display_with_expiry(&self) {
        println!("Value: {}, Expiry: {}", self.value, self.expiry);
    }
}

fn longest_expiry<'a, T: Display + 'a>(
    entries: &[CacheEntry<'a, T>],
) -> Option<&CacheEntry<'a, T>> {
    entries.iter().max_by_key(|e| e.expiry.len())
}

fn main() {
    let num1 = 42;
    let num2 = 99;
    let entries = vec![
        CacheEntry::new(&num1, "2025-12-31"),
        CacheEntry::new(&num2, "2026-06-15T12:00"),
    ];
    for entry in &entries {
        entry.display_with_expiry();
    }
    if let Some(longest) = longest_expiry(&entries) {
        println!("Longest expiry entry:");
        longest.display_with_expiry();
    }
}`,
          hints: [
            'The struct needs two fields: value of type &\'a T and expiry of type &\'a str.',
            'For longest_expiry, use .iter().max_by_key(|e| e.expiry.len()) to find the entry with the longest expiry string.',
            'The return type of longest_expiry should be Option<&CacheEntry<\'a, T>> since the slice could be empty.',
          ],
        },
      },
    ],
  },
];

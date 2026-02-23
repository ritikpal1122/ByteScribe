import type { DocCategory } from './types';

// Part 8: Modules & Crates + Concurrency + Advanced
export const RUST_PART8_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Modules & Crates                                             */
  /* ------------------------------------------------------------ */
  {
    id: 'rust-modules-crates',
    label: 'Modules & Crates',
    icon: 'Package',
    entries: [
      {
        id: 'modules',
        title: 'Modules',
        difficulty: 'intermediate',
        tags: ['mod', 'modules', 'visibility', 'pub', 'organization'],
        cheatSheetSummary: 'mod name { } or mod name; (separate file) — organize code into namespaces',
        crossLanguageId: 'modules',
        sections: [
          {
            heading: 'Defining Modules',
            content:
              'Modules organize code into logical units with controlled visibility. Items inside a module are private by default. Use pub to make them accessible from outside. Modules can be defined inline with mod { } or in separate files.',
            code: `// Inline module definition
mod math {
    // Private by default
    fn helper() -> f64 {
        std::f64::consts::PI
    }

    // Public function
    pub fn circle_area(radius: f64) -> f64 {
        helper() * radius * radius
    }

    // Nested module
    pub mod geometry {
        pub fn distance(x1: f64, y1: f64, x2: f64, y2: f64) -> f64 {
            ((x2 - x1).powi(2) + (y2 - y1).powi(2)).sqrt()
        }
    }

    // Public struct with mixed visibility
    pub struct Point {
        pub x: f64,
        pub y: f64,
        accuracy: f64, // private field
    }

    impl Point {
        pub fn new(x: f64, y: f64) -> Self {
            Point { x, y, accuracy: 1.0 }
        }
    }
}

fn main() {
    // Access public items
    let area = math::circle_area(5.0);
    println!("area: {:.2}", area);

    let dist = math::geometry::distance(0.0, 0.0, 3.0, 4.0);
    println!("distance: {}", dist);

    let p = math::Point::new(1.0, 2.0);
    println!("point: ({}, {})", p.x, p.y);
    // println!("{}", p.accuracy);  // ERROR: private field
}`,
            output: `area: 78.54
distance: 5
point: (1, 2)`,
            note: 'Module privacy works at the module level, not the file level. A parent module cannot access private items in a child module, even if they are in the same file.',
            analogy: 'Think of it like office rooms with doors: items inside a module are behind a closed door (private) by default. Marking something pub is like putting it in a display window -- anyone walking by can see it, but internal things stay hidden.',
            diagram: {
              kind: 'mermaid',
              code: `graph TD
  R["crate root (main.rs)"] --> M["mod math"]
  M --> F1["fn helper() -- private"]
  M --> F2["pub fn circle_area()"]
  M --> G["pub mod geometry"]
  M --> S["pub struct Point"]
  G --> GF["pub fn distance()"]
  S --> PX["pub x: f64"]
  S --> PY["pub y: f64"]
  S --> PA["accuracy: f64 -- private"]
  style F1 fill:#ef4444,color:#fff
  style PA fill:#ef4444,color:#fff
  style F2 fill:#10b981,color:#fff
  style G fill:#10b981,color:#fff
  style GF fill:#10b981,color:#fff
  style S fill:#10b981,color:#fff
  style PX fill:#10b981,color:#fff
  style PY fill:#10b981,color:#fff`,
              caption: 'Module hierarchy with visibility: green items are pub (accessible from outside), red items are private (hidden within the module)',
            },
            codeHighlightLines: [3, 4, 8, 9, 13, 14, 20, 21, 22],
          },
          {
            heading: 'File-Based Modules',
            content:
              'For larger projects, modules are defined in separate files. Rust maps module names to file paths: mod foo; looks for foo.rs or foo/mod.rs. The 2018 edition also supports foo/mod.rs being replaced by foo.rs alongside a foo/ directory.',
            code: `// Project structure:
// src/
// ├── main.rs
// ├── config.rs        (mod config;)
// ├── models/
// │   ├── mod.rs       (mod models;)
// │   ├── user.rs      (pub mod user; in mod.rs)
// │   └── post.rs      (pub mod post; in mod.rs)
// └── utils.rs         (mod utils;)

// --- main.rs ---
// mod config;       // loads config.rs
// mod models;       // loads models/mod.rs
// mod utils;        // loads utils.rs
//
// use config::AppConfig;
// use models::user::User;
//
// fn main() {
//     let config = AppConfig::default();
//     let user = User::new("Alice");
// }

// --- models/mod.rs ---
// pub mod user;
// pub mod post;

// Simplified inline demo:
mod config {
    #[derive(Debug)]
    pub struct AppConfig {
        pub host: String,
        pub port: u16,
    }

    impl Default for AppConfig {
        fn default() -> Self {
            AppConfig {
                host: "localhost".to_string(),
                port: 8080,
            }
        }
    }
}

mod models {
    pub mod user {
        #[derive(Debug)]
        pub struct User {
            pub name: String,
        }

        impl User {
            pub fn new(name: &str) -> Self {
                User { name: name.to_string() }
            }
        }
    }
}

use config::AppConfig;
use models::user::User;

fn main() {
    let cfg = AppConfig::default();
    let user = User::new("Alice");
    println!("config: {:?}", cfg);
    println!("user: {:?}", user);
}`,
            output: `config: AppConfig { host: "localhost", port: 8080 }
user: User { name: "Alice" }`,
            tip: 'Prefer the flat file layout (models.rs + models/ directory) over models/mod.rs for the 2018 edition and later. It avoids having many files named mod.rs.',
          },
          {
            heading: 'Visibility Rules',
            content:
              'Rust has fine-grained visibility control. pub makes an item public. pub(crate) makes it visible within the crate but not externally. pub(super) makes it visible in the parent module. pub(in path) restricts visibility to a specific ancestor module.',
            code: `mod outer {
    pub mod inner {
        // Public to everyone
        pub fn public_fn() {
            println!("public");
        }

        // Visible within the crate only
        pub(crate) fn crate_fn() {
            println!("crate-only");
        }

        // Visible to parent module only
        pub(super) fn parent_fn() {
            println!("parent-only");
        }

        // Private (default)
        fn private_fn() {
            println!("private");
        }

        pub fn demo() {
            public_fn();
            crate_fn();
            parent_fn();
            private_fn();  // accessible within same module
        }
    }

    pub fn call_inner() {
        inner::public_fn();    // OK
        inner::crate_fn();     // OK (same crate)
        inner::parent_fn();    // OK (parent of inner)
        // inner::private_fn();  // ERROR: private
    }
}

fn main() {
    outer::inner::public_fn();    // OK
    outer::inner::crate_fn();     // OK (same crate)
    // outer::inner::parent_fn(); // ERROR: only visible to outer
    outer::call_inner();
    outer::inner::demo();
}`,
            output: `public
crate-only
public
crate-only
parent-only
public
crate-only
parent-only
private`,
          },
        ],
        quiz: [
          {
            question: 'What is the default visibility of items inside a Rust module?',
            options: ['Public', 'Private', 'Protected', 'Package-private'],
            correctIndex: 1,
            explanation: 'Items inside a Rust module are private by default. You must use the pub keyword to make them accessible from outside the module.',
          },
          {
            question: 'Which keyword makes an item visible only within the current crate?',
            options: ['pub', 'pub(super)', 'pub(crate)', 'pub(self)'],
            correctIndex: 2,
            explanation: 'pub(crate) restricts visibility to the current crate. The item will not be accessible from external crates that depend on this one.',
          },
          {
            question: 'In the 2018 edition, what is the preferred way to declare a module "models" with submodules?',
            options: [
              'models/mod.rs with submodule files in models/',
              'models.rs alongside a models/ directory for submodules',
              'models/index.rs with submodule files in models/',
              'models/__init__.rs with submodule files in models/',
            ],
            correctIndex: 1,
            explanation: 'The 2018 edition introduced the flat file layout: models.rs alongside a models/ directory. This avoids having many files named mod.rs and is the preferred convention.',
          },
          {
            question: 'What does pub(super) do?',
            options: [
              'Makes the item public to all modules',
              'Makes the item visible only within the same module',
              'Makes the item visible to the parent module',
              'Makes the item visible to child modules only',
            ],
            correctIndex: 2,
            explanation: 'pub(super) restricts visibility to the parent module. This is useful when a child module wants to expose helpers to its parent without making them globally public.',
          },
        ],
        challenge: {
          prompt: 'Create a module called "shapes" with a public function "rectangle_area" that takes width and height (both f64) and returns the area. Inside the module, create a private helper function "validate" that checks both values are positive (returns bool). The public function should use the helper and return 0.0 if validation fails.',
          starterCode: `// Define the shapes module with the required functions

fn main() {
    // These should work:
    println!("{}", shapes::rectangle_area(5.0, 3.0)); // 15.0
    println!("{}", shapes::rectangle_area(-1.0, 3.0)); // 0.0
    // shapes::validate(1.0, 1.0); // This should NOT compile (private)
}`,
          solutionCode: `mod shapes {
    fn validate(w: f64, h: f64) -> bool {
        w > 0.0 && h > 0.0
    }

    pub fn rectangle_area(width: f64, height: f64) -> f64 {
        if validate(width, height) {
            width * height
        } else {
            0.0
        }
    }
}

fn main() {
    println!("{}", shapes::rectangle_area(5.0, 3.0));
    println!("{}", shapes::rectangle_area(-1.0, 3.0));
}`,
          hints: [
            'Use mod shapes { } to define an inline module. Items are private by default, so only mark rectangle_area as pub.',
            'The validate function should stay without the pub keyword so it remains private to the module.',
            'Call validate inside rectangle_area and use an if/else to return the computed area or 0.0.',
          ],
        },
      },
      {
        id: 'crates',
        title: 'Crates',
        difficulty: 'intermediate',
        tags: ['crate', 'library', 'binary', 'cargo', 'dependencies'],
        cheatSheetSummary: 'Crate = compilation unit. Binary crate (main.rs) or library crate (lib.rs).',
        sections: [
          {
            heading: 'Binary vs Library Crates',
            content:
              'A crate is Rust\'s compilation unit — the smallest amount of code the compiler considers at a time. Binary crates have a main() function and produce executables. Library crates expose functionality for other crates to use. A package can contain both: one library crate and multiple binary crates.',
            code: `// Binary crate: src/main.rs
// fn main() {
//     println!("I'm a binary!");
// }

// Library crate: src/lib.rs
// pub fn add(a: i32, b: i32) -> i32 { a + b }

// A package can have both!
// src/main.rs imports from src/lib.rs

// In Cargo.toml:
// [package]
// name = "my_package"
// version = "0.1.0"
// edition = "2021"
//
// [[bin]]            # multiple binaries
// name = "server"
// path = "src/bin/server.rs"
//
// [[bin]]
// name = "client"
// path = "src/bin/client.rs"

// Demo: simulating library + binary
mod my_lib {
    pub fn add(a: i32, b: i32) -> i32 {
        a + b
    }

    pub fn greet(name: &str) -> String {
        format!("Hello, {}!", name)
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[test]
        fn test_add() {
            assert_eq!(add(2, 3), 5);
        }
    }
}

fn main() {
    println!("{}", my_lib::add(2, 3));
    println!("{}", my_lib::greet("Rust"));
}`,
            output: `5
Hello, Rust!`,
            note: 'When both src/main.rs and src/lib.rs exist, main.rs can import from the library using use my_package::some_function;. This is the recommended pattern for applications with testable logic.',
          },
          {
            heading: 'External Dependencies',
            content:
              'External crates (libraries) are added as dependencies in Cargo.toml. Cargo downloads them from crates.io. You access their public API using use statements. Popular crates include serde (serialization), tokio (async runtime), clap (CLI arguments), and rand (random numbers).',
            code: `// Cargo.toml:
// [dependencies]
// rand = "0.8"
// serde = { version = "1.0", features = ["derive"] }
// serde_json = "1.0"

// Usage in code:
// use rand::Rng;
// use serde::{Serialize, Deserialize};

// Simulating external crate patterns:
use std::collections::HashMap;

// Pattern: re-export for cleaner API
mod api {
    // Re-export so users don't need to know internal structure
    pub use self::handlers::*;

    mod handlers {
        pub fn handle_request(path: &str) -> String {
            format!("200 OK: {}", path)
        }
    }
}

fn main() {
    // Use the re-exported function directly
    let response = api::handle_request("/users");
    println!("{}", response);

    // Common dependency patterns
    let mut config = HashMap::new();
    config.insert("database_url", "postgres://localhost/mydb");
    config.insert("port", "8080");

    for (key, val) in &config {
        println!("{}={}", key, val);
    }
}`,
            output: `200 OK: /users
database_url=postgres://localhost/mydb
port=8080`,
            tip: 'Use cargo add <crate> to add dependencies from the command line. Use cargo doc --open to generate and browse documentation for all your dependencies.',
          },
        ],
        quiz: [
          {
            question: 'What is the difference between a binary crate and a library crate?',
            options: [
              'Binary crates are larger than library crates',
              'Binary crates have a main() function and produce executables; library crates expose functionality for others',
              'Library crates can only be used locally; binary crates can be published',
              'There is no difference; they are interchangeable terms',
            ],
            correctIndex: 1,
            explanation: 'Binary crates have a main() function and compile to executables. Library crates (lib.rs) expose a public API for other crates to consume. A package can contain both.',
          },
          {
            question: 'Where does Cargo download external dependencies from by default?',
            options: ['GitHub', 'npm registry', 'crates.io', 'Rust official mirror'],
            correctIndex: 2,
            explanation: 'Cargo downloads external crate dependencies from crates.io, Rust\'s official package registry. You can also configure alternative registries.',
          },
          {
            question: 'What does "pub use" accomplish in a module?',
            options: [
              'It imports an item for private use only',
              'It re-exports an item, making it accessible through the current module\'s path',
              'It makes all items in a module public',
              'It creates a type alias',
            ],
            correctIndex: 1,
            explanation: 'pub use re-exports an item so that consumers can access it through the current module\'s public path. This lets you hide internal module structure from users of your API.',
          },
        ],
        challenge: {
          prompt: 'Create a simulated library crate with a module called "my_math" containing two public functions: "add(a: i32, b: i32) -> i32" and "multiply(a: i32, b: i32) -> i32". Also create a private helper function "log_operation(op: &str, a: i32, b: i32)" that prints the operation. Both public functions should call the helper before returning their result. Demonstrate re-exporting the functions at the crate level.',
          starterCode: `// Create the my_math module with public and private functions
// Re-export at crate level

fn main() {
    // Should work via re-export:
    // let sum = add(3, 4);
    // let product = multiply(3, 4);
    // println!("sum: {}, product: {}", sum, product);
}`,
          solutionCode: `mod my_math {
    fn log_operation(op: &str, a: i32, b: i32) {
        println!("{}: {} and {}", op, a, b);
    }

    pub fn add(a: i32, b: i32) -> i32 {
        log_operation("add", a, b);
        a + b
    }

    pub fn multiply(a: i32, b: i32) -> i32 {
        log_operation("multiply", a, b);
        a * b
    }
}

// Re-export at crate level
use my_math::add;
use my_math::multiply;

fn main() {
    let sum = add(3, 4);
    let product = multiply(3, 4);
    println!("sum: {}, product: {}", sum, product);
}`,
          hints: [
            'Define the module with mod my_math { } and make add and multiply public with pub. Leave log_operation without pub.',
            'Use "use my_math::add;" and "use my_math::multiply;" at the crate level to re-export.',
            'Call log_operation inside both add and multiply before performing the computation.',
          ],
        },
      },
      {
        id: 'use-paths',
        title: 'use Paths',
        difficulty: 'intermediate',
        tags: ['use', 'import', 'path', 'alias', 'glob', 're-export'],
        cheatSheetSummary: 'use std::collections::HashMap; use crate::module::Type as Alias;',
        sections: [
          {
            heading: 'Importing with use',
            content:
              'The use keyword brings items into scope so you do not need to write the full path every time. You can import specific items, use aliases, group imports, and re-export items. Understanding use paths is key to clean, readable Rust code.',
            code: `// Specific imports
use std::collections::HashMap;
use std::collections::HashSet;

// Grouped imports
use std::io::{self, Read, Write};

// Alias with as
use std::collections::BTreeMap as OrderedMap;

// Nested groups
use std::collections::{BinaryHeap, VecDeque};

fn main() {
    let mut map = HashMap::new();
    map.insert("key", "value");

    let mut set = HashSet::new();
    set.insert(42);

    let ordered = OrderedMap::from([("a", 1), ("b", 2)]);
    println!("map: {:?}", map);
    println!("set: {:?}", set);
    println!("ordered: {:?}", ordered);

    // Using io::self allows both io::Error and Read/Write
    let _ = io::stdout();
}`,
            output: `map: {"key": "value"}
set: {42}
ordered: {"a": 1, "b": 2}`,
          },
          {
            heading: 'Path Types and Re-exports',
            content:
              'Rust has several path types: crate:: for the current crate root, self:: for the current module, super:: for the parent module. pub use re-exports items, making them accessible through the current module\'s path.',
            code: `mod database {
    pub mod models {
        #[derive(Debug)]
        pub struct User {
            pub name: String,
        }

        impl User {
            pub fn new(name: &str) -> Self {
                User { name: name.to_string() }
            }
        }
    }

    pub mod queries {
        // super:: refers to parent module (database)
        use super::models::User;

        pub fn find_user(name: &str) -> User {
            User::new(name)
        }
    }

    // Re-export: users of database:: don't need to know about models::
    pub use models::User;
    pub use queries::find_user;
}

// crate-level re-export
use database::User;
use database::find_user;

fn main() {
    // Clean API thanks to re-exports
    let user = User::new("Alice");
    println!("{:?}", user);

    let found = find_user("Bob");
    println!("{:?}", found);

    // Can still use the full path
    let user2 = database::models::User::new("Charlie");
    println!("{:?}", user2);
}`,
            output: `User { name: "Alice" }
User { name: "Bob" }
User { name: "Charlie" }`,
            tip: 'Use pub use to create a clean public API. Internal module structure can be reorganized without breaking external code if you re-export through a stable public path.',
          },
          {
            heading: 'Prelude and Glob Imports',
            content:
              'Rust automatically imports the prelude (Option, Result, Vec, String, common traits) into every module. You can create your own prelude module for commonly used items. Glob imports (use module::*) bring all public items into scope.',
            code: `// Custom prelude pattern
mod prelude {
    pub use std::collections::{HashMap, HashSet};
    pub use std::fmt::{self, Display};

    // Re-export your own commonly used types
    pub type Result<T> = std::result::Result<T, Box<dyn std::error::Error>>;
}

// Glob import the prelude
use prelude::*;

#[derive(Debug)]
struct Config {
    settings: HashMap<String, String>,
    tags: HashSet<String>,
}

impl Display for Config {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Config({} settings, {} tags)",
            self.settings.len(), self.tags.len())
    }
}

fn load_config() -> Result<Config> {
    let mut settings = HashMap::new();
    settings.insert("host".to_string(), "localhost".to_string());

    let mut tags = HashSet::new();
    tags.insert("production".to_string());

    Ok(Config { settings, tags })
}

fn main() {
    match load_config() {
        Ok(config) => println!("{}", config),
        Err(e) => eprintln!("Error: {}", e),
    }
}`,
            output: `Config(1 settings, 1 tags)`,
            warning: 'Glob imports (use module::*) can cause name conflicts and make it hard to tell where an item comes from. Only use them for preludes and test modules.',
          },
        ],
        quiz: [
          {
            question: 'What does "use std::io::{self, Read, Write};" import?',
            options: [
              'Only the Read and Write traits',
              'The io module itself plus the Read and Write traits',
              'Everything in std::io',
              'Only the self keyword',
            ],
            correctIndex: 1,
            explanation: 'The grouped import with self brings the io module itself into scope (so you can write io::Error, io::stdout(), etc.) along with the Read and Write traits directly.',
          },
          {
            question: 'What is the purpose of "pub use" in Rust?',
            options: [
              'It imports an item and makes it public in the current module',
              'It only works with external crates',
              'It creates a mutable reference to the item',
              'It imports the item only during compilation',
            ],
            correctIndex: 0,
            explanation: 'pub use re-exports an item: it imports the item and makes it publicly available through the current module\'s path. This is key for creating clean public APIs.',
          },
          {
            question: 'Which path prefix refers to the parent module?',
            options: ['crate::', 'self::', 'super::', 'parent::'],
            correctIndex: 2,
            explanation: 'super:: refers to the parent module, similar to ".." in a filesystem. crate:: refers to the crate root, and self:: refers to the current module.',
          },
          {
            question: 'Why are glob imports (use module::*) generally discouraged?',
            options: [
              'They are slower at runtime',
              'They can cause name conflicts and make it unclear where items come from',
              'They do not work with standard library modules',
              'They require unsafe blocks',
            ],
            correctIndex: 1,
            explanation: 'Glob imports bring all public items into scope, which can lead to name collisions and makes it difficult to determine where a particular item is defined. They are acceptable for preludes and test modules.',
          },
        ],
        challenge: {
          prompt: 'Create a module "utils" with a submodule "string_helpers" containing a public function "shout(s: &str) -> String" that converts a string to uppercase. Create a type alias in utils called "Result<T>" that wraps std::result::Result<T, String>. Re-export shout at the utils level using pub use, then import and use both items in main.',
          starterCode: `// Define the utils module with string_helpers submodule
// Add the Result type alias
// Re-export shout at the utils level

fn main() {
    // Should work:
    // let loud = utils::shout("hello");
    // let result: utils::Result<String> = Ok(loud);
    // println!("{:?}", result);
}`,
          solutionCode: `mod utils {
    pub mod string_helpers {
        pub fn shout(s: &str) -> String {
            s.to_uppercase()
        }
    }

    pub type Result<T> = std::result::Result<T, String>;

    // Re-export shout at the utils level
    pub use string_helpers::shout;
}

fn main() {
    let loud = utils::shout("hello");
    let result: utils::Result<String> = Ok(loud);
    println!("{:?}", result);
}`,
          hints: [
            'Define the submodule with pub mod string_helpers inside mod utils. Use pub fn shout to make it public.',
            'Add "pub use string_helpers::shout;" inside the utils module to re-export it.',
            'Define the type alias with "pub type Result<T> = std::result::Result<T, String>;".',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Concurrency                                                  */
  /* ------------------------------------------------------------ */
  {
    id: 'rust-concurrency',
    label: 'Concurrency',
    icon: 'Cpu',
    entries: [
      {
        id: 'threads',
        title: 'Threads',
        difficulty: 'intermediate',
        tags: ['threads', 'spawn', 'join', 'move', 'parallel', 'concurrency'],
        cheatSheetSummary: 'std::thread::spawn(move || { }) — OS threads with ownership transfer',
        crossLanguageId: 'threads',
        sections: [
          {
            heading: 'Spawning Threads',
            content:
              'Rust uses OS-level threads via std::thread::spawn. The move keyword transfers ownership of captured variables into the thread closure. The JoinHandle lets you wait for the thread to complete and retrieve its result.',
            code: `use std::thread;
use std::time::Duration;

fn main() {
    // Basic thread spawn
    let handle = thread::spawn(|| {
        for i in 1..=5 {
            println!("  spawned thread: {}", i);
            thread::sleep(Duration::from_millis(50));
        }
        42 // thread return value
    });

    for i in 1..=3 {
        println!("main thread: {}", i);
        thread::sleep(Duration::from_millis(50));
    }

    // Wait for thread and get result
    let result = handle.join().unwrap();
    println!("thread returned: {}", result);

    // move closure: transfer ownership
    let data = vec![1, 2, 3];
    let handle = thread::spawn(move || {
        let sum: i32 = data.iter().sum();
        println!("sum in thread: {}", sum);
    });
    // println!("{:?}", data);  // ERROR: data was moved
    handle.join().unwrap();

    // Spawn multiple threads
    let mut handles = vec![];
    for i in 0..5 {
        handles.push(thread::spawn(move || {
            thread::sleep(Duration::from_millis(10));
            i * i
        }));
    }

    let results: Vec<i32> = handles
        .into_iter()
        .map(|h| h.join().unwrap())
        .collect();
    println!("squares: {:?}", results);
}`,
            output: `main thread: 1
  spawned thread: 1
main thread: 2
  spawned thread: 2
main thread: 3
  spawned thread: 3
  spawned thread: 4
  spawned thread: 5
thread returned: 42
sum in thread: 6
squares: [0, 1, 4, 9, 16]`,
            warning: 'The move keyword is required when spawning threads because the thread may outlive the scope where variables are defined. Without move, the compiler rejects the code to prevent dangling references.',
            analogy: 'Think of it like sending a package to another city (thread): you must put items in the box (move) because you cannot just hand someone a note saying "look in my desk drawer" -- by the time they try, you might have cleaned out your desk.',
            diagram: {
              kind: 'mermaid',
              code: `sequenceDiagram
  participant M as Main Thread
  participant S as Spawned Thread
  M->>S: thread::spawn(move || { ... })
  par Running concurrently
    M->>M: main work (1..=3)
    S->>S: spawned work (1..=5)
  end
  M->>S: handle.join()
  S-->>M: returns 42
  M->>M: continues after join`,
              caption: 'Thread lifecycle: spawn creates a new OS thread that runs concurrently. join() blocks the main thread until the spawned thread completes and returns its value.',
            },
            codeHighlightLines: [3, 4, 16, 21, 22],
          },
          {
            heading: 'Scoped Threads',
            content:
              'Scoped threads (std::thread::scope, stable since Rust 1.63) let threads borrow from the parent scope without move. The scope guarantees all threads complete before the scope exits, so borrowed data is guaranteed valid.',
            code: `use std::thread;

fn main() {
    let mut data = vec![1, 2, 3, 4, 5, 6, 7, 8];

    // Scoped threads can borrow from the parent
    thread::scope(|s| {
        let (left, right) = data.split_at(data.len() / 2);

        let t1 = s.spawn(|| {
            let sum: i32 = left.iter().sum();
            println!("left sum: {}", sum);
            sum
        });

        let t2 = s.spawn(|| {
            let sum: i32 = right.iter().sum();
            println!("right sum: {}", sum);
            sum
        });

        let total = t1.join().unwrap() + t2.join().unwrap();
        println!("total: {}", total);
    });

    // data is still usable after the scope
    println!("data: {:?}", data);

    // Parallel map with scoped threads
    let items = vec![1, 2, 3, 4, 5];
    let mut results = vec![0; items.len()];

    thread::scope(|s| {
        for (result, &item) in results.iter_mut().zip(items.iter()) {
            s.spawn(move || {
                *result = item * item;
            });
        }
    });

    println!("parallel squares: {:?}", results);
}`,
            output: `left sum: 10
right sum: 26
total: 36
data: [1, 2, 3, 4, 5, 6, 7, 8]
parallel squares: [1, 4, 9, 16, 25]`,
            tip: 'Prefer scoped threads over move closures with spawn when the threads do not need to outlive the current scope. Scoped threads avoid cloning and are easier to reason about.',
          },
        ],
        quiz: [
          {
            question: 'Why is the "move" keyword required when spawning threads with std::thread::spawn?',
            options: [
              'It makes the thread run faster',
              'It transfers ownership of captured variables into the thread closure so they are not dangling references',
              'It allows the thread to return a value',
              'It is optional and only needed for mutable variables',
            ],
            correctIndex: 1,
            explanation: 'The spawned thread may outlive the scope where variables are defined. move transfers ownership into the closure, ensuring the thread owns the data it needs rather than holding references that might become invalid.',
          },
          {
            question: 'What does handle.join().unwrap() do?',
            options: [
              'It starts the thread',
              'It kills the thread immediately',
              'It blocks the current thread until the spawned thread finishes, returning its result',
              'It detaches the thread so it runs independently',
            ],
            correctIndex: 2,
            explanation: 'join() blocks the calling thread until the spawned thread completes, then returns a Result containing the thread\'s return value. unwrap() extracts the value or panics if the thread panicked.',
          },
          {
            question: 'What advantage do scoped threads (std::thread::scope) have over regular spawn?',
            options: [
              'They run faster than regular threads',
              'They can borrow from the parent scope without move, since the scope guarantees all threads complete before it exits',
              'They use green threads instead of OS threads',
              'They automatically parallelize sequential code',
            ],
            correctIndex: 1,
            explanation: 'Scoped threads guarantee that all spawned threads complete before the scope exits. This means threads can safely borrow data from the parent scope without requiring move or cloning.',
          },
        ],
        challenge: {
          prompt: 'Spawn 4 threads where each thread computes the sum of a slice of a vector. The main vector is [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]. Each thread handles 3 elements. Collect all partial sums and print the total. Use scoped threads so you can borrow slices without cloning.',
          starterCode: `use std::thread;

fn main() {
    let data = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let chunk_size = 3;

    // Use thread::scope to spawn 4 threads
    // Each thread sums a chunk of 3 elements
    // Collect results and print total (should be 78)
}`,
          solutionCode: `use std::thread;

fn main() {
    let data = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let chunk_size = 3;

    let total: i32 = thread::scope(|s| {
        let handles: Vec<_> = data
            .chunks(chunk_size)
            .map(|chunk| {
                s.spawn(|| {
                    let partial: i32 = chunk.iter().sum();
                    println!("chunk {:?} => {}", chunk, partial);
                    partial
                })
            })
            .collect();

        handles
            .into_iter()
            .map(|h| h.join().unwrap())
            .sum()
    });

    println!("total: {}", total);
}`,
          hints: [
            'Use data.chunks(chunk_size) to split the vector into slices of 3 elements each.',
            'Inside thread::scope, spawn a thread for each chunk using s.spawn(|| { ... }) and collect the JoinHandles.',
            'After spawning all threads, iterate over the handles, join each one, and sum the partial results.',
          ],
        },
      },
      {
        id: 'message-passing',
        title: 'Message Passing',
        difficulty: 'intermediate',
        tags: ['channel', 'mpsc', 'send', 'recv', 'producer-consumer'],
        cheatSheetSummary: 'mpsc::channel() — multiple producers, single consumer channel',
        sections: [
          {
            heading: 'Channels (mpsc)',
            content:
              'Rust\'s std::sync::mpsc module provides multi-producer, single-consumer channels. channel() creates an unbounded channel. sync_channel(n) creates a bounded channel with capacity n. Senders can be cloned for multiple producers.',
            code: `use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    // Basic channel
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let messages = vec!["hello", "from", "thread"];
        for msg in messages {
            tx.send(msg).unwrap();
            thread::sleep(Duration::from_millis(50));
        }
    });

    // Receive messages
    for received in rx {
        println!("got: {}", received);
    }

    // Multiple producers
    let (tx, rx) = mpsc::channel();

    for i in 0..3 {
        let tx_clone = tx.clone();
        thread::spawn(move || {
            tx_clone.send(format!("msg from thread {}", i)).unwrap();
        });
    }
    drop(tx); // drop original sender so rx knows when all senders are done

    for msg in rx {
        println!("{}", msg);
    }

    // try_recv: non-blocking receive
    let (tx, rx) = mpsc::channel();
    tx.send(42).unwrap();
    match rx.try_recv() {
        Ok(val) => println!("got: {}", val),
        Err(e) => println!("error: {:?}", e),
    }
}`,
            output: `got: hello
got: from
got: thread
msg from thread 0
msg from thread 1
msg from thread 2
got: 42`,
            note: 'Drop the sender (or let it go out of scope) to signal that no more messages will be sent. The receiver iterator will then terminate.',
            diagram: {
              kind: 'mermaid',
              code: `graph LR
  P1["Producer 1<br>tx.clone()"] -->|"send()"| CH["Channel<br>(mpsc buffer)"]
  P2["Producer 2<br>tx.clone()"] -->|"send()"| CH
  P3["Producer 3<br>tx"]-->|"send()"| CH
  CH -->|"recv() / for msg in rx"| C["Consumer<br>(single receiver)"]
  style P1 fill:#60a5fa,color:#fff
  style P2 fill:#60a5fa,color:#fff
  style P3 fill:#60a5fa,color:#fff
  style CH fill:#f59e0b,color:#000
  style C fill:#10b981,color:#fff`,
              caption: 'mpsc: Multiple Producer, Single Consumer. Clone the sender (tx) for multiple producers; there is only one receiver (rx).',
            },
          },
          {
            heading: 'Channel Patterns',
            content:
              'Channels enable powerful concurrent patterns: worker pools, fan-out/fan-in, pipelines, and request-response. The type system ensures messages are Send-safe.',
            code: `use std::sync::mpsc;
use std::thread;

fn main() {
    // Worker pool pattern
    let (tx, rx) = mpsc::channel::<(usize, i32)>();

    // Send work items
    let sender = thread::spawn(move || {
        for i in 0..8 {
            tx.send((i, i as i32 * 10)).unwrap();
        }
    });

    // Process results
    let mut results = Vec::new();
    sender.join().unwrap();

    while let Ok((id, value)) = rx.try_recv() {
        results.push((id, value * 2));
    }

    results.sort_by_key(|(id, _)| *id);
    println!("results: {:?}", results);

    // Pipeline: stage1 -> stage2 -> collector
    let (tx1, rx1) = mpsc::channel();
    let (tx2, rx2) = mpsc::channel();

    // Stage 1: generate numbers
    thread::spawn(move || {
        for i in 1..=5 {
            tx1.send(i).unwrap();
        }
    });

    // Stage 2: transform
    thread::spawn(move || {
        for val in rx1 {
            tx2.send(val * val).unwrap();
        }
    });

    // Collect results
    let collected: Vec<i32> = rx2.iter().collect();
    println!("pipeline: {:?}", collected);
}`,
            output: `results: [(0, 0), (1, 20), (2, 40), (3, 60), (4, 80), (5, 100), (6, 120), (7, 140)]
pipeline: [1, 4, 9, 16, 25]`,
          },
        ],
        quiz: [
          {
            question: 'What does "mpsc" stand for in Rust\'s std::sync::mpsc?',
            options: [
              'Multiple processes, single channel',
              'Multiple producers, single consumer',
              'Message passing synchronized channel',
              'Multi-purpose synchronization channel',
            ],
            correctIndex: 1,
            explanation: 'mpsc stands for Multiple Producer, Single Consumer. The sender (tx) can be cloned for multiple producers, but there is only one receiver (rx).',
          },
          {
            question: 'Why must you drop the original sender when using cloned senders with mpsc?',
            options: [
              'To free memory immediately',
              'The compiler requires it for type safety',
              'So the receiver knows all senders are done and the iterator terminates',
              'Cloned senders do not work unless the original is dropped',
            ],
            correctIndex: 2,
            explanation: 'The receiver iterator keeps waiting for messages as long as any sender exists. Dropping the original sender (after cloning it for each thread) ensures the receiver terminates when all cloned senders are dropped.',
          },
          {
            question: 'What is the difference between recv() and try_recv() on a channel receiver?',
            options: [
              'recv() is faster than try_recv()',
              'recv() blocks until a message is available; try_recv() returns immediately with Ok or Err',
              'try_recv() can receive from multiple channels; recv() cannot',
              'There is no difference; they are aliases',
            ],
            correctIndex: 1,
            explanation: 'recv() blocks the current thread until a message arrives or all senders are dropped. try_recv() is non-blocking and returns Err(TryRecvError::Empty) immediately if no message is available.',
          },
        ],
        challenge: {
          prompt: 'Create a two-stage pipeline using mpsc channels. Stage 1: a thread sends the numbers 1 through 10. Stage 2: a thread receives each number, doubles it, and sends the result through a second channel. The main thread collects all results from stage 2 and prints the vector.',
          starterCode: `use std::sync::mpsc;
use std::thread;

fn main() {
    // Create two channels: one for stage1->stage2, one for stage2->main
    // Stage 1: send numbers 1..=10
    // Stage 2: receive, double, and forward
    // Main: collect and print results
}`,
          solutionCode: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx1, rx1) = mpsc::channel();
    let (tx2, rx2) = mpsc::channel();

    // Stage 1: generate numbers
    thread::spawn(move || {
        for i in 1..=10 {
            tx1.send(i).unwrap();
        }
    });

    // Stage 2: double each number
    thread::spawn(move || {
        for val in rx1 {
            tx2.send(val * 2).unwrap();
        }
    });

    // Collect results
    let results: Vec<i32> = rx2.iter().collect();
    println!("results: {:?}", results);
}`,
          hints: [
            'Create two channels: (tx1, rx1) for stage 1 to stage 2, and (tx2, rx2) for stage 2 to main.',
            'Move tx1 into the first thread and both rx1 and tx2 into the second thread.',
            'Use rx2.iter().collect() in main to gather all doubled values into a Vec.',
          ],
        },
      },
      {
        id: 'shared-state',
        title: 'Shared State',
        difficulty: 'advanced',
        tags: ['Mutex', 'Arc', 'RwLock', 'atomic', 'shared-memory'],
        cheatSheetSummary: 'Arc<Mutex<T>> — thread-safe shared ownership with mutual exclusion',
        sections: [
          {
            heading: 'Mutex and Arc',
            content:
              'Mutex<T> provides mutual exclusion, allowing only one thread to access the data at a time. Arc<T> (Atomic Reference Counting) enables shared ownership across threads. Together, Arc<Mutex<T>> is the standard pattern for shared mutable state.',
            code: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    // Arc<Mutex<T>>: shared mutable state across threads
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("counter: {}", *counter.lock().unwrap());

    // Shared collection
    let data = Arc::new(Mutex::new(Vec::new()));
    let mut handles = vec![];

    for i in 0..5 {
        let data = Arc::clone(&data);
        handles.push(thread::spawn(move || {
            let mut vec = data.lock().unwrap();
            vec.push(i * i);
        }));
    }

    for h in handles {
        h.join().unwrap();
    }

    let result = data.lock().unwrap();
    println!("shared vec: {:?}", result);
}`,
            output: `counter: 10
shared vec: [0, 1, 4, 9, 16]`,
            warning: 'Mutex::lock() returns a Result because the lock can be "poisoned" if a thread panics while holding it. In most cases, .unwrap() or .expect() is acceptable.',
            analogy: 'Think of it like a bathroom with a lock: Arc is handing out copies of the key to each person (thread), and Mutex is the lock on the door -- only one person can be inside at a time. Everyone else waits in line until the lock is released.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Arc (shared pointer)',
                    color: '#6366f1',
                    items: [
                      { name: 'strong_count', value: '10 (one per thread clone)' },
                      { name: 'ptr', value: '-> heap allocation' },
                    ],
                  },
                  {
                    label: 'Heap: Mutex<i32>',
                    color: '#f59e0b',
                    items: [
                      { name: 'locked', value: 'false (or thread id)' },
                      { name: 'data', value: '0 -> 1 -> ... -> 10' },
                      { name: 'wait_queue', value: '(blocked threads)' },
                    ],
                  },
                  {
                    label: 'Thread access pattern',
                    color: '#10b981',
                    items: [
                      { name: 'Arc::clone()', value: 'Increment refcount (atomic)' },
                      { name: '.lock().unwrap()', value: 'Acquire exclusive access' },
                      { name: '*num += 1', value: 'Modify protected data' },
                      { name: '(drop guard)', value: 'Release lock automatically' },
                    ],
                  },
                ],
              },
              caption: 'Arc<Mutex<T>> layout: Arc manages shared ownership via atomic refcount, Mutex guards the inner data with a lock. Only one thread at a time can access the data.',
            },
            codeHighlightLines: [4, 5, 8, 9, 10, 11],
          },
          {
            heading: 'RwLock and Atomics',
            content:
              'RwLock<T> allows multiple concurrent readers OR one exclusive writer. It is better than Mutex when reads are much more frequent than writes. Atomic types (AtomicU32, AtomicBool, etc.) provide lock-free thread-safe operations for simple values.',
            code: `use std::sync::{Arc, RwLock};
use std::sync::atomic::{AtomicU64, Ordering};
use std::thread;

fn main() {
    // RwLock: multiple readers OR one writer
    let config = Arc::new(RwLock::new(vec!["initial".to_string()]));

    let mut handles = vec![];

    // Spawn readers
    for i in 0..3 {
        let config = Arc::clone(&config);
        handles.push(thread::spawn(move || {
            let data = config.read().unwrap();
            println!("reader {}: {:?}", i, *data);
        }));
    }

    // Spawn writer
    let config_w = Arc::clone(&config);
    handles.push(thread::spawn(move || {
        let mut data = config_w.write().unwrap();
        data.push("updated".to_string());
        println!("writer: added 'updated'");
    }));

    for h in handles {
        h.join().unwrap();
    }

    println!("final: {:?}", config.read().unwrap());

    // Atomic: lock-free operations
    let counter = Arc::new(AtomicU64::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            for _ in 0..1000 {
                counter.fetch_add(1, Ordering::Relaxed);
            }
        }));
    }

    for h in handles {
        h.join().unwrap();
    }

    println!("atomic counter: {}", counter.load(Ordering::Relaxed));
}`,
            output: `reader 0: ["initial"]
reader 1: ["initial"]
reader 2: ["initial"]
writer: added 'updated'
final: ["initial", "updated"]
atomic counter: 10000`,
            tip: 'Use AtomicU64/AtomicBool for simple counters and flags. Use RwLock when reads dominate writes. Use Mutex when reads and writes are roughly equal.',
          },
        ],
        quiz: [
          {
            question: 'What is the standard Rust pattern for shared mutable state across threads?',
            options: [
              'Rc<Mutex<T>>',
              'Arc<Mutex<T>>',
              'Box<Mutex<T>>',
              'RefCell<T>',
            ],
            correctIndex: 1,
            explanation: 'Arc<Mutex<T>> is the standard pattern. Arc provides thread-safe shared ownership (atomic reference counting), and Mutex provides mutual exclusion. Rc is not thread-safe and RefCell does not work across threads.',
          },
          {
            question: 'What happens if a thread panics while holding a Mutex lock?',
            options: [
              'The lock is automatically released and everything continues normally',
              'The program immediately terminates',
              'The Mutex becomes "poisoned" and subsequent lock() calls return Err',
              'Other threads can still acquire the lock without issues',
            ],
            correctIndex: 2,
            explanation: 'When a thread panics while holding a Mutex, the lock becomes "poisoned." Future calls to lock() will return Err(PoisonError), alerting other threads that the protected data may be in an inconsistent state.',
          },
          {
            question: 'When should you prefer RwLock over Mutex?',
            options: [
              'When you only have a single thread',
              'When reads are much more frequent than writes',
              'When you need to write data frequently',
              'When working with atomic types',
            ],
            correctIndex: 1,
            explanation: 'RwLock allows multiple concurrent readers OR one exclusive writer. When reads are much more frequent than writes, RwLock provides better concurrency since multiple readers can proceed simultaneously.',
          },
          {
            question: 'What does Arc::clone() do?',
            options: [
              'Deep copies the inner data',
              'Creates a new Arc pointing to new heap-allocated data',
              'Increments the atomic reference count and returns a new Arc pointing to the same data',
              'Moves the data into a new Arc',
            ],
            correctIndex: 2,
            explanation: 'Arc::clone() does not clone the inner data. It increments the atomic reference count and returns a new Arc that points to the same heap-allocated data. This is a cheap operation (just an atomic increment).',
          },
        ],
        challenge: {
          prompt: 'Create a shared counter using Arc<Mutex<HashMap<String, i32>>>. Spawn 3 threads: one increments "apples" 100 times, another increments "bananas" 100 times, and the third increments "apples" 50 times. After all threads complete, print the final HashMap showing the counts for each key.',
          starterCode: `use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    // Create shared HashMap
    // Spawn 3 threads to increment counts
    // Print final result
}`,
          solutionCode: `use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counts = Arc::new(Mutex::new(HashMap::new()));
    let mut handles = vec![];

    // Thread 1: increment "apples" 100 times
    let counts1 = Arc::clone(&counts);
    handles.push(thread::spawn(move || {
        for _ in 0..100 {
            let mut map = counts1.lock().unwrap();
            *map.entry("apples".to_string()).or_insert(0) += 1;
        }
    }));

    // Thread 2: increment "bananas" 100 times
    let counts2 = Arc::clone(&counts);
    handles.push(thread::spawn(move || {
        for _ in 0..100 {
            let mut map = counts2.lock().unwrap();
            *map.entry("bananas".to_string()).or_insert(0) += 1;
        }
    }));

    // Thread 3: increment "apples" 50 times
    let counts3 = Arc::clone(&counts);
    handles.push(thread::spawn(move || {
        for _ in 0..50 {
            let mut map = counts3.lock().unwrap();
            *map.entry("apples".to_string()).or_insert(0) += 1;
        }
    }));

    for h in handles {
        h.join().unwrap();
    }

    let result = counts.lock().unwrap();
    println!("{:?}", *result);
    // Output: {"apples": 150, "bananas": 100}
}`,
          hints: [
            'Wrap the HashMap with Arc::new(Mutex::new(HashMap::new())) and clone the Arc for each thread.',
            'Use map.entry("key".to_string()).or_insert(0) to get or create an entry, then use += 1 to increment.',
            'Remember to lock the mutex inside the loop for each increment, and the lock guard is automatically dropped at the end of each iteration.',
          ],
        },
      },
      {
        id: 'async-await',
        title: 'Async/Await',
        difficulty: 'advanced',
        tags: ['async', 'await', 'Future', 'tokio', 'concurrency', 'non-blocking'],
        cheatSheetSummary: 'async fn foo() -> T { bar().await } — non-blocking I/O with tokio runtime',
        crossLanguageId: 'async-await',
        sections: [
          {
            heading: 'Async Basics',
            content:
              'Async/await enables non-blocking concurrency. An async function returns a Future that does nothing until awaited. Rust\'s async is zero-cost — it compiles down to state machines without heap allocation. You need a runtime like tokio or async-std to actually execute futures.',
            code: `// NOTE: This requires tokio as a dependency
// [dependencies]
// tokio = { version = "1", features = ["full"] }

// async fn fetch_data(url: &str) -> Result<String, Box<dyn std::error::Error>> {
//     let response = reqwest::get(url).await?;
//     let body = response.text().await?;
//     Ok(body)
// }

// Simplified async demonstration using std::future
use std::time::Duration;

async fn compute(n: u64) -> u64 {
    // Simulate async work
    // In real code: tokio::time::sleep(Duration::from_millis(100)).await;
    n * n
}

async fn process_all() {
    let a = compute(5).await;
    let b = compute(10).await;
    println!("results: {} {}", a, b);
}

// To run: #[tokio::main]
// async fn main() {
//     // Concurrent tasks
//     let (a, b) = tokio::join!(
//         compute(5),
//         compute(10),
//     );
//     println!("concurrent: {} {}", a, b);
//
//     // Spawn a task
//     let handle = tokio::spawn(async {
//         compute(20).await
//     });
//     let result = handle.await.unwrap();
//     println!("spawned: {}", result);
// }

fn main() {
    // Without tokio, we can show the concept
    println!("Async requires a runtime (tokio, async-std)");
    println!("async fn returns a Future, .await consumes it");
    println!("tokio::join! runs futures concurrently");
    println!("tokio::spawn creates independent tasks");
}`,
            output: `Async requires a runtime (tokio, async-std)
async fn returns a Future, .await consumes it
tokio::join! runs futures concurrently
tokio::spawn creates independent tasks`,
            note: 'Rust does not include an async runtime in the standard library. You must add tokio or async-std as a dependency. tokio is the most widely used runtime in the ecosystem.',
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
  AF["async fn compute(n)"] -->|"called"| F["Future (lazy, does nothing)"]
  F -->|".await"| R["Runtime polls the Future"]
  R --> P{"Poll result?"}
  P -->|"Poll::Ready(val)"| D["Value returned"]
  P -->|"Poll::Pending"| W["Yield to runtime"]
  W -->|"Woken up later"| R
  style AF fill:#6366f1,color:#fff
  style F fill:#f59e0b,color:#000
  style R fill:#8b5cf6,color:#fff
  style D fill:#10b981,color:#fff
  style W fill:#fca5a5,color:#000`,
              caption: 'Async lifecycle: calling an async fn returns a Future. Only when .await is called does the runtime poll it. If not ready, the runtime parks the task and polls again later.',
            },
          },
          {
            heading: 'Async Patterns',
            content:
              'Common async patterns include concurrent execution with join!, racing with select!, streaming with async iterators, and error handling with ?. The Send and Sync traits determine which types can cross async boundaries.',
            code: `// Common async patterns (conceptual, requires tokio)

// Pattern 1: Concurrent execution
// let (users, posts) = tokio::join!(
//     fetch_users(),
//     fetch_posts(),
// );

// Pattern 2: First to complete
// tokio::select! {
//     result = fetch_fast() => println!("fast: {:?}", result),
//     result = fetch_slow() => println!("slow: {:?}", result),
// }

// Pattern 3: Timeout
// match tokio::time::timeout(
//     Duration::from_secs(5),
//     long_operation()
// ).await {
//     Ok(result) => println!("completed: {:?}", result),
//     Err(_) => println!("timed out"),
// }

// Pattern 4: Retry with backoff
async fn retry<F, Fut, T, E>(mut f: F, max_retries: usize) -> Result<T, E>
where
    F: FnMut() -> Fut,
    Fut: std::future::Future<Output = Result<T, E>>,
{
    let mut attempt = 0;
    loop {
        match f().await {
            Ok(val) => return Ok(val),
            Err(e) if attempt < max_retries => {
                attempt += 1;
                // tokio::time::sleep(Duration::from_millis(100 * 2u64.pow(attempt as u32))).await;
            }
            Err(e) => return Err(e),
        }
    }
}

fn main() {
    println!("Async patterns:");
    println!("  join!   - run multiple futures concurrently");
    println!("  select! - race futures, take first result");
    println!("  timeout - cancel if too slow");
    println!("  retry   - retry with exponential backoff");
    println!("  spawn   - fire-and-forget background task");
}`,
            output: `Async patterns:
  join!   - run multiple futures concurrently
  select! - race futures, take first result
  timeout - cancel if too slow
  retry   - retry with exponential backoff
  spawn   - fire-and-forget background task`,
            tip: 'Use tokio::join! for concurrent I/O (e.g., fetching multiple URLs). Use tokio::spawn for fire-and-forget background tasks. Use select! when you need the first result from multiple sources.',
          },
        ],
        quiz: [
          {
            question: 'What does calling an async function in Rust return?',
            options: [
              'The computed value immediately',
              'A thread handle',
              'A Future that does nothing until awaited',
              'A reference to the result',
            ],
            correctIndex: 2,
            explanation: 'Calling an async function returns a Future, which is lazy and does nothing until it is awaited. Only when .await is called does the runtime actually poll the Future and drive it to completion.',
          },
          {
            question: 'Why does Rust not include an async runtime in the standard library?',
            options: [
              'Because async is not stable yet',
              'To allow the ecosystem to provide different runtimes optimized for different use cases',
              'Because async is only for web servers',
              'Because the standard library does not support concurrency',
            ],
            correctIndex: 1,
            explanation: 'Rust deliberately leaves the async runtime out of std to allow different runtimes (tokio, async-std, smol) to optimize for different trade-offs. This gives developers flexibility to choose the best runtime for their use case.',
          },
          {
            question: 'What does tokio::join! do?',
            options: [
              'Runs futures sequentially one after another',
              'Spawns each future in a separate OS thread',
              'Runs multiple futures concurrently and waits for all of them to complete',
              'Cancels all futures except the first to complete',
            ],
            correctIndex: 2,
            explanation: 'tokio::join! runs multiple futures concurrently on the same task, waiting for all of them to complete. It returns a tuple of all results. This is different from select!, which returns the first result.',
          },
          {
            question: 'What does tokio::select! do?',
            options: [
              'Runs all futures and collects all results',
              'Selects the fastest runtime for your code',
              'Races multiple futures and returns the result of the first one to complete',
              'Selects which thread to run the future on',
            ],
            correctIndex: 2,
            explanation: 'tokio::select! races multiple futures concurrently and executes the branch corresponding to whichever future completes first. The other futures are cancelled.',
          },
        ],
        challenge: {
          prompt: 'Write an async function called "fetch_both" that takes two string slices (representing URLs) and returns a tuple of two Strings. Use async blocks to simulate fetching each URL (just return format!("Response from {}", url)). Use tokio::join! to fetch both concurrently. Include a #[tokio::main] async main that calls fetch_both and prints both results.',
          starterCode: `// Requires: tokio = { version = "1", features = ["full"] }

// Define async fn fetch_both that fetches two URLs concurrently

// #[tokio::main]
// async fn main() {
//     let (r1, r2) = fetch_both("/api/users", "/api/posts").await;
//     println!("{}", r1);
//     println!("{}", r2);
// }`,
          solutionCode: `// Requires: tokio = { version = "1", features = ["full"] }

async fn fetch_one(url: &str) -> String {
    // Simulate async I/O
    // tokio::time::sleep(std::time::Duration::from_millis(100)).await;
    format!("Response from {}", url)
}

async fn fetch_both(url1: &str, url2: &str) -> (String, String) {
    tokio::join!(fetch_one(url1), fetch_one(url2))
}

#[tokio::main]
async fn main() {
    let (r1, r2) = fetch_both("/api/users", "/api/posts").await;
    println!("{}", r1);
    println!("{}", r2);
}`,
          hints: [
            'Create a helper async fn fetch_one(url: &str) -> String that simulates a fetch by returning a formatted string.',
            'Inside fetch_both, use tokio::join!(fetch_one(url1), fetch_one(url2)) to run both fetches concurrently.',
            'Use #[tokio::main] on the main function to set up the async runtime.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Advanced                                                     */
  /* ------------------------------------------------------------ */
  {
    id: 'rust-advanced',
    label: 'Advanced',
    icon: 'Zap',
    entries: [
      {
        id: 'generics',
        title: 'Generics',
        difficulty: 'intermediate',
        tags: ['generics', 'type-parameters', 'monomorphization', 'zero-cost'],
        cheatSheetSummary: 'fn foo<T: Trait>(x: T) — compile-time polymorphism with zero runtime cost',
        crossLanguageId: 'generics',
        sections: [
          {
            heading: 'Generic Functions, Structs, and Enums',
            content:
              'Generics let you write code that works with many types without sacrificing performance. Rust monomorphizes generics at compile time, generating specialized machine code for each concrete type. This means generics are a zero-cost abstraction.',
            code: `#[derive(Debug)]
struct Stack<T> {
    elements: Vec<T>,
}

impl<T> Stack<T> {
    fn new() -> Self {
        Stack { elements: Vec::new() }
    }

    fn push(&mut self, item: T) {
        self.elements.push(item);
    }

    fn pop(&mut self) -> Option<T> {
        self.elements.pop()
    }

    fn peek(&self) -> Option<&T> {
        self.elements.last()
    }

    fn is_empty(&self) -> bool {
        self.elements.is_empty()
    }

    fn len(&self) -> usize {
        self.elements.len()
    }
}

// Add Display only when T: Display
impl<T: std::fmt::Display> Stack<T> {
    fn print_top(&self) {
        match self.peek() {
            Some(val) => println!("top: {}", val),
            None => println!("empty stack"),
        }
    }
}

fn main() {
    let mut int_stack = Stack::new();
    int_stack.push(1);
    int_stack.push(2);
    int_stack.push(3);
    int_stack.print_top();
    println!("popped: {:?}", int_stack.pop());

    let mut str_stack: Stack<String> = Stack::new();
    str_stack.push("hello".to_string());
    str_stack.push("world".to_string());
    str_stack.print_top();
    println!("len: {}", str_stack.len());
}`,
            output: `top: 3
popped: Some(3)
top: world
len: 2`,
            note: 'Monomorphization means Stack<i32> and Stack<String> are compiled as completely separate types with no runtime overhead. This is different from Java generics which use type erasure.',
            analogy: 'Think of it like a cookie cutter (the generic definition): you stamp out cookies of different doughs (types). Each resulting cookie is a real, solid, specialized cookie -- not a generic placeholder that figures out its shape at eating time.',
            codeHighlightLines: [1, 2, 3, 4, 13, 14, 15, 22, 23],
          },
          {
            heading: 'Const Generics',
            content:
              'Const generics (stable since Rust 1.51) let you parameterize types by constant values, not just types. This enables fixed-size arrays, matrices, and other structures where the size is part of the type.',
            code: `#[derive(Debug)]
struct Matrix<const ROWS: usize, const COLS: usize> {
    data: [[f64; COLS]; ROWS],
}

impl<const ROWS: usize, const COLS: usize> Matrix<ROWS, COLS> {
    fn new() -> Self {
        Matrix { data: [[0.0; COLS]; ROWS] }
    }

    fn get(&self, row: usize, col: usize) -> f64 {
        self.data[row][col]
    }

    fn set(&mut self, row: usize, col: usize, val: f64) {
        self.data[row][col] = val;
    }

    fn dimensions(&self) -> (usize, usize) {
        (ROWS, COLS)
    }
}

// Fixed-size buffer
fn sum_array<const N: usize>(arr: [i32; N]) -> i32 {
    arr.iter().sum()
}

fn main() {
    let mut m: Matrix<2, 3> = Matrix::new();
    m.set(0, 0, 1.0);
    m.set(0, 1, 2.0);
    m.set(1, 2, 3.0);
    println!("{:?}", m);
    println!("dimensions: {:?}", m.dimensions());

    // Different sizes are different types
    let a = sum_array([1, 2, 3]);
    let b = sum_array([1, 2, 3, 4, 5]);
    println!("sum3: {}, sum5: {}", a, b);
}`,
            output: `Matrix { data: [[1.0, 2.0, 0.0], [0.0, 0.0, 3.0]] }
dimensions: (2, 3)
sum3: 6, sum5: 15`,
          },
        ],
        quiz: [
          {
            question: 'What is monomorphization in Rust?',
            options: [
              'A runtime technique that dispatches generic calls dynamically',
              'The compiler generates specialized code for each concrete type used with a generic, resulting in zero runtime overhead',
              'A pattern for converting one type to another',
              'A way to erase type information at compile time like Java generics',
            ],
            correctIndex: 1,
            explanation: 'Monomorphization is Rust\'s approach to generics: the compiler generates a separate copy of the generic code for each concrete type used. This means Stack<i32> and Stack<String> become entirely separate types with no runtime dispatch overhead.',
          },
          {
            question: 'What do const generics allow you to parameterize by?',
            options: [
              'Lifetime parameters only',
              'Trait bounds',
              'Constant values (like numbers) in addition to types',
              'Mutable references',
            ],
            correctIndex: 2,
            explanation: 'Const generics let you parameterize types and functions by constant values such as usize, bool, or char. This enables types like Matrix<2, 3> where the dimensions are part of the type itself.',
          },
          {
            question: 'How can you add a method that only works when the generic type implements Display?',
            options: [
              'Use a where clause on the entire struct',
              'Add a separate impl block with the Display bound: impl<T: Display> MyStruct<T> { }',
              'Cast the type to Display at runtime',
              'You cannot conditionally add methods in Rust',
            ],
            correctIndex: 1,
            explanation: 'You can write a separate impl block with a trait bound, like impl<T: std::fmt::Display> Stack<T> { fn print_top(...) }. This method is only available when T implements Display.',
          },
        ],
        challenge: {
          prompt: 'Create a generic Pair<T, U> struct with two fields: first of type T and second of type U. Implement a method "swap" that returns a new Pair<U, T> with the fields swapped. Also implement a method "map_first" that takes a closure FnOnce(T) -> V and returns a new Pair<V, U>. Demonstrate with Pair<i32, String>.',
          starterCode: `// Define Pair<T, U> struct
// Implement swap and map_first methods

fn main() {
    // let p = Pair { first: 42, second: "hello".to_string() };
    // let swapped = p.swap();
    // println!("{:?}", swapped); // Pair { first: "hello", second: 42 }

    // let p2 = Pair { first: 10, second: "world".to_string() };
    // let mapped = p2.map_first(|x| x * 2);
    // println!("{:?}", mapped); // Pair { first: 20, second: "world" }
}`,
          solutionCode: `#[derive(Debug)]
struct Pair<T, U> {
    first: T,
    second: U,
}

impl<T, U> Pair<T, U> {
    fn swap(self) -> Pair<U, T> {
        Pair {
            first: self.second,
            second: self.first,
        }
    }

    fn map_first<V, F: FnOnce(T) -> V>(self, f: F) -> Pair<V, U> {
        Pair {
            first: f(self.first),
            second: self.second,
        }
    }
}

fn main() {
    let p = Pair { first: 42, second: "hello".to_string() };
    let swapped = p.swap();
    println!("{:?}", swapped);

    let p2 = Pair { first: 10, second: "world".to_string() };
    let mapped = p2.map_first(|x| x * 2);
    println!("{:?}", mapped);
}`,
          hints: [
            'Define the struct as struct Pair<T, U> { first: T, second: U } with #[derive(Debug)].',
            'The swap method consumes self and returns Pair<U, T> -- note the type parameters are reversed.',
            'For map_first, introduce a new type parameter V and a closure bound F: FnOnce(T) -> V. Apply the closure to self.first.',
          ],
        },
      },
      {
        id: 'smart-pointers',
        title: 'Smart Pointers',
        difficulty: 'advanced',
        tags: ['Box', 'Rc', 'RefCell', 'Cow', 'smart-pointer', 'heap'],
        cheatSheetSummary: 'Box<T>, Rc<T>, Arc<T>, RefCell<T>, Cow<T> — heap allocation and shared ownership',
        sections: [
          {
            heading: 'Box, Rc, and RefCell',
            content:
              'Smart pointers manage heap-allocated data with additional semantics. Box<T> provides single ownership on the heap. Rc<T> provides shared ownership with reference counting (single-threaded). RefCell<T> provides interior mutability, allowing mutation through an immutable reference at runtime.',
            code: `use std::rc::Rc;
use std::cell::RefCell;

// Box: heap allocation with single ownership
fn box_demo() {
    let boxed = Box::new(42);
    println!("boxed: {}", boxed);

    // Recursive types require Box
    #[derive(Debug)]
    enum List {
        Cons(i32, Box<List>),
        Nil,
    }

    let list = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));
    println!("list: {:?}", list);
}

// Rc: shared ownership (single-threaded)
fn rc_demo() {
    let data = Rc::new(vec![1, 2, 3]);
    let a = Rc::clone(&data);
    let b = Rc::clone(&data);

    println!("ref count: {}", Rc::strong_count(&data));
    println!("a: {:?}", a);
    println!("b: {:?}", b);
}

// RefCell: interior mutability
fn refcell_demo() {
    let data = RefCell::new(vec![1, 2, 3]);

    // Borrow mutably through an immutable reference
    data.borrow_mut().push(4);
    println!("refcell: {:?}", data.borrow());

    // Rc + RefCell: shared mutable data
    let shared = Rc::new(RefCell::new(0));
    let a = Rc::clone(&shared);
    let b = Rc::clone(&shared);

    *a.borrow_mut() += 10;
    *b.borrow_mut() += 20;
    println!("shared value: {}", shared.borrow());
}

fn main() {
    box_demo();
    rc_demo();
    refcell_demo();
}`,
            output: `boxed: 42
list: Cons(1, Cons(2, Nil))
ref count: 3
a: [1, 2, 3]
b: [1, 2, 3]
refcell: [1, 2, 3, 4]
shared value: 30`,
            warning: 'RefCell checks borrowing rules at runtime, not compile time. Violating the rules (e.g., two mutable borrows) will panic. Use RefCell only when you cannot satisfy the borrow checker statically.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Box<T> (single owner)',
                    color: '#6366f1',
                    items: [
                      { name: 'stack', value: 'ptr -> heap' },
                      { name: 'heap', value: '42' },
                      { name: 'ownership', value: 'exactly one owner' },
                    ],
                  },
                  {
                    label: 'Rc<T> (shared ownership)',
                    color: '#10b981',
                    items: [
                      { name: 'strong_count', value: '3 (data, a, b)' },
                      { name: 'weak_count', value: '0' },
                      { name: 'heap data', value: '[1, 2, 3]' },
                      { name: 'ownership', value: 'multiple readers, no mutation' },
                    ],
                  },
                  {
                    label: 'Rc<RefCell<T>> (shared + mutable)',
                    color: '#f59e0b',
                    items: [
                      { name: 'Rc layer', value: 'shared ownership (refcount)' },
                      { name: 'RefCell layer', value: 'runtime borrow checking' },
                      { name: 'inner data', value: '0 -> 10 -> 30' },
                      { name: 'borrow state', value: 'tracks active borrows at runtime' },
                    ],
                  },
                ],
              },
              caption: 'Three smart pointer strategies: Box for single ownership on the heap, Rc for shared read-only ownership, Rc<RefCell<T>> for shared mutable ownership with runtime borrow checks.',
            },
            codeHighlightLines: [6, 7, 15, 16, 17, 27, 28, 29, 33, 34],
          },
          {
            heading: 'Cow: Clone on Write',
            content:
              'Cow<T> (Clone on Write) is an enum that holds either a borrowed reference or an owned value. It clones only when mutation is needed. This is perfect for functions that usually return borrowed data but sometimes need to modify it.',
            code: `use std::borrow::Cow;

fn clean_input(input: &str) -> Cow<str> {
    if input.contains(' ') {
        // Need to modify: clone and own
        Cow::Owned(input.replace(' ', "_"))
    } else {
        // No modification needed: just borrow
        Cow::Borrowed(input)
    }
}

fn ensure_prefix<'a>(s: &'a str, prefix: &str) -> Cow<'a, str> {
    if s.starts_with(prefix) {
        Cow::Borrowed(s)
    } else {
        Cow::Owned(format!("{}{}", prefix, s))
    }
}

fn main() {
    let clean = clean_input("hello_world");
    println!("no spaces: {} (borrowed: {})", clean, matches!(clean, Cow::Borrowed(_)));

    let dirty = clean_input("hello world");
    println!("has spaces: {} (borrowed: {})", dirty, matches!(dirty, Cow::Borrowed(_)));

    let prefixed = ensure_prefix("/api/users", "/api/");
    println!("already prefixed: {}", prefixed);

    let needs_prefix = ensure_prefix("users", "/api/");
    println!("added prefix: {}", needs_prefix);
}`,
            output: `no spaces: hello_world (borrowed: true)
has spaces: hello_world (borrowed: false)
already prefixed: /api/users
added prefix: /api/users`,
            tip: 'Use Cow when a function usually returns borrowed data but occasionally needs to own it. It avoids unnecessary allocations in the common case while still handling the edge case.',
          },
        ],
      },
      {
        id: 'unsafe-rust',
        title: 'Unsafe Rust',
        difficulty: 'advanced',
        tags: ['unsafe', 'raw-pointers', 'FFI', 'undefined-behavior', 'invariants'],
        cheatSheetSummary: 'unsafe { } — opt out of compiler safety checks for raw pointers, FFI, etc.',
        sections: [
          {
            heading: 'What Unsafe Enables',
            content:
              'unsafe blocks unlock five additional capabilities: dereferencing raw pointers, calling unsafe functions, accessing mutable static variables, implementing unsafe traits, and accessing fields of unions. The rest of Rust\'s safety guarantees still apply inside unsafe blocks.',
            code: `fn main() {
    // 1. Raw pointers
    let mut x = 42;
    let ptr = &mut x as *mut i32;
    unsafe {
        *ptr = 100;
        println!("raw pointer: {}", *ptr);
    }

    // 2. Calling unsafe functions
    unsafe fn dangerous() -> i32 {
        // This function has preconditions the compiler can't check
        42
    }

    unsafe {
        println!("unsafe fn: {}", dangerous());
    }

    // 3. Safe abstraction over unsafe code
    fn split_at_mut(slice: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
        let len = slice.len();
        let ptr = slice.as_mut_ptr();
        assert!(mid <= len);
        unsafe {
            (
                std::slice::from_raw_parts_mut(ptr, mid),
                std::slice::from_raw_parts_mut(ptr.add(mid), len - mid),
            )
        }
    }

    let mut data = vec![1, 2, 3, 4, 5];
    let (left, right) = split_at_mut(&mut data, 3);
    left[0] = 99;
    right[0] = 88;
    println!("split_at_mut: {:?}", data);

    // 4. Mutable static
    static mut COUNTER: u32 = 0;
    unsafe {
        COUNTER += 1;
        println!("static counter: {}", COUNTER);
    }
}`,
            output: `raw pointer: 100
unsafe fn: 42
split_at_mut: [99, 2, 3, 88, 5]
static counter: 1`,
            warning: 'unsafe does not turn off the borrow checker or any other safety check. It only unlocks the five specific capabilities listed above. You are still responsible for upholding Rust\'s safety invariants manually.',
          },
          {
            heading: 'FFI: Calling C from Rust',
            content:
              'Rust\'s Foreign Function Interface (FFI) lets you call C libraries using extern blocks. This is always unsafe because the Rust compiler cannot verify the safety of external code. The #[repr(C)] attribute ensures struct layout matches C.',
            code: `// Calling C standard library functions
extern "C" {
    fn abs(input: i32) -> i32;
    fn sqrt(x: f64) -> f64;
}

// Rust function callable from C
#[no_mangle]
pub extern "C" fn rust_add(a: i32, b: i32) -> i32 {
    a + b
}

// C-compatible struct
#[repr(C)]
#[derive(Debug)]
struct Point {
    x: f64,
    y: f64,
}

fn main() {
    // Call C functions (always unsafe)
    unsafe {
        println!("abs(-42) = {}", abs(-42));
        println!("sqrt(2.0) = {:.6}", sqrt(2.0));
    }

    // C-compatible struct
    let p = Point { x: 3.0, y: 4.0 };
    println!("point: {:?}", p);
    println!("size: {} bytes", std::mem::size_of::<Point>());
}`,
            output: `abs(-42) = 42
sqrt(2.0) = 1.414214
point: Point { x: 3.0, y: 4.0 }
size: 16 bytes`,
            note: 'FFI is the primary reason most Rust developers encounter unsafe. In practice, FFI bindings are usually wrapped in a safe Rust API so downstream users never need to write unsafe themselves.',
          },
        ],
      },
      {
        id: 'macros',
        title: 'Macros',
        difficulty: 'advanced',
        tags: ['macro', 'macro_rules', 'declarative', 'procedural', 'metaprogramming'],
        cheatSheetSummary: 'macro_rules! name { (pattern) => { expansion }; } — compile-time code generation',
        sections: [
          {
            heading: 'Declarative Macros (macro_rules!)',
            content:
              'Declarative macros use pattern matching on token trees to generate code at compile time. They are invoked with name!(...). Common standard library macros include vec!, println!, assert!, and format!. You can define your own for reducing boilerplate.',
            code: `// Simple macro
macro_rules! say_hello {
    () => {
        println!("Hello from macro!");
    };
    ($name:expr) => {
        println!("Hello, {}!", $name);
    };
}

// Variadic macro
macro_rules! sum {
    ($($x:expr),+ $(,)?) => {
        {
            let mut total = 0;
            $(total += $x;)+
            total
        }
    };
}

// HashMap literal macro
macro_rules! hashmap {
    ($($key:expr => $val:expr),* $(,)?) => {
        {
            let mut map = std::collections::HashMap::new();
            $(map.insert($key, $val);)*
            map
        }
    };
}

// Debug logging macro
macro_rules! debug_log {
    ($($arg:tt)*) => {
        if cfg!(debug_assertions) {
            eprintln!("[DEBUG {}:{}] {}", file!(), line!(), format!($($arg)*));
        }
    };
}

fn main() {
    say_hello!();
    say_hello!("Rust");

    let total = sum!(1, 2, 3, 4, 5);
    println!("sum: {}", total);

    let scores = hashmap! {
        "Alice" => 95,
        "Bob" => 87,
        "Charlie" => 92,
    };
    println!("scores: {:?}", scores);

    debug_log!("processing {} items", 42);
}`,
            output: `Hello from macro!
Hello, Rust!
sum: 15
scores: {"Alice": 95, "Bob": 87, "Charlie": 92}
[DEBUG src/main.rs:52] processing 42 items`,
            tip: 'Use macros for reducing repetitive patterns, not for general abstraction. If a function or generic can do the job, prefer those over macros. Macros are harder to debug and understand.',
            analogy: 'Think of it like a rubber stamp: you define the stamp pattern once (macro_rules!), and each time you press it (invoke the macro), it prints the expanded code. The compiler then processes the stamped code as if you had written it by hand.',
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
  I["say_hello!(&quot;Rust&quot;)"] -->|"Pattern match"| P{"Which arm?"}
  P -->|"() =>"| A1["println!(&quot;Hello from macro!&quot;)"]
  P -->|"($name:expr) =>"| A2["println!(&quot;Hello, {}!&quot;, &quot;Rust&quot;)"]
  A2 -->|"Compile"| O["Hello, Rust!"]
  style I fill:#6366f1,color:#fff
  style P fill:#f59e0b,color:#000
  style A1 fill:#a78bfa,color:#fff
  style A2 fill:#10b981,color:#fff
  style O fill:#86efac,color:#000`,
              caption: 'macro_rules! pattern matching: the compiler matches the invocation tokens against each arm and expands the matching one at compile time',
            },
            codeHighlightLines: [2, 3, 4, 5, 12, 13, 14, 15, 23, 24, 25, 26],
          },
          {
            heading: 'Useful Macro Patterns',
            content:
              'Beyond custom macros, the standard library provides powerful macros for testing, configuration, and code generation. Understanding assert!, cfg!, include!, and attribute macros makes you more productive.',
            code: `// Assert macros for testing
fn main() {
    let x = 42;

    assert!(x > 0, "x should be positive");
    assert_eq!(x, 42, "x should be 42");
    assert_ne!(x, 0, "x should not be zero");

    // dbg! macro: prints expression and value, returns value
    let a = 5;
    let b = dbg!(a * 2) + 1;  // prints to stderr: [src/main.rs:8] a * 2 = 10
    println!("b = {}", b);

    // todo!, unimplemented!, unreachable!
    fn process(mode: &str) -> i32 {
        match mode {
            "fast" => 1,
            "slow" => 2,
            "turbo" => todo!("implement turbo mode"),
            _ => unreachable!("unknown mode"),
        }
    }
    println!("process fast: {}", process("fast"));

    // cfg! for conditional compilation
    if cfg!(debug_assertions) {
        println!("debug mode");
    } else {
        println!("release mode");
    }

    // concat!, stringify!
    let version = concat!("v", "1", ".", "0");
    println!("version: {}", version);

    // env! reads environment variable at compile time
    let pkg = env!("CARGO_PKG_NAME");
    println!("package: {}", pkg);
}`,
            output: `[src/main.rs:8] a * 2 = 10
b = 11
process fast: 1
debug mode
version: v1.0
package: my_package`,
            note: 'dbg! is invaluable for debugging. Unlike println!, it prints the file/line, the expression text, and the value. It also returns the value so you can insert it into any expression without restructuring.',
          },
        ],
      },
    ],
  },
];

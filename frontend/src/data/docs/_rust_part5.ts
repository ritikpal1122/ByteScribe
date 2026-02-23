import type { DocCategory } from './types';

// Part 5: Error Handling + Collections
export const RUST_PART5_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Error Handling                                               */
  /* ------------------------------------------------------------ */
  {
    id: 'rust-error-handling',
    label: 'Error Handling',
    icon: 'AlertTriangle',
    entries: [
      {
        id: 'result-type',
        title: 'Result Type',
        difficulty: 'intermediate',
        tags: ['Result', 'Ok', 'Err', 'error-handling', 'recoverable'],
        cheatSheetSummary: 'Result<T, E> = Ok(T) | Err(E) — the standard way to handle recoverable errors',
        signature: 'enum Result<T, E> { Ok(T), Err(E) }',
        crossLanguageId: 'error-handling',
        sections: [
          {
            heading: 'Result Basics',
            content:
              'Result<T, E> is Rust\'s primary mechanism for recoverable error handling. It is an enum with two variants: Ok(T) for success and Err(E) for failure. Unlike exceptions in other languages, Result forces you to handle errors explicitly — the compiler will not let you ignore them.',
            code: `use std::num::ParseIntError;

fn parse_number(s: &str) -> Result<i32, ParseIntError> {
    s.parse::<i32>()
}

fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("division by zero".to_string())
    } else {
        Ok(a / b)
    }
}

fn main() {
    // Pattern matching on Result
    match parse_number("42") {
        Ok(n) => println!("Parsed: {}", n),
        Err(e) => println!("Error: {}", e),
    }

    match parse_number("abc") {
        Ok(n) => println!("Parsed: {}", n),
        Err(e) => println!("Error: {}", e),
    }

    // Using match with divide
    match divide(10.0, 3.0) {
        Ok(val) => println!("10 / 3 = {:.2}", val),
        Err(e) => println!("Error: {}", e),
    }

    match divide(10.0, 0.0) {
        Ok(val) => println!("Result: {}", val),
        Err(e) => println!("Error: {}", e),
    }
}`,
            output: `Parsed: 42
Error: invalid digit found in string
10 / 3 = 3.33
Error: division by zero`,
          },
          {
            heading: 'Result Combinators',
            content:
              'Like Option, Result has many combinator methods for transforming and chaining operations. These methods let you write concise error-handling pipelines without nested match statements.',
            code: `fn main() {
    // map: transform Ok value
    let doubled = "21".parse::<i32>().map(|n| n * 2);
    println!("doubled: {:?}", doubled);

    // map_err: transform Err value
    let with_context = "abc".parse::<i32>()
        .map_err(|e| format!("parse failed: {}", e));
    println!("with context: {:?}", with_context);

    // and_then: chain fallible operations
    let result = "42"
        .parse::<i32>()
        .and_then(|n| {
            if n > 0 { Ok(n) } else { Err("not positive".parse().unwrap()) }
        });
    println!("chained: {:?}", result);

    // unwrap_or / unwrap_or_else
    let safe: i32 = "abc".parse().unwrap_or(0);
    println!("unwrap_or: {}", safe);

    let computed: i32 = "abc".parse().unwrap_or_else(|_| {
        println!("  (computing default)");
        -1
    });
    println!("unwrap_or_else: {}", computed);

    // ok() converts Result to Option (discards error)
    let opt: Option<i32> = "42".parse::<i32>().ok();
    println!("ok(): {:?}", opt);

    // is_ok() and is_err() for checking
    let r: Result<i32, _> = "42".parse();
    println!("is_ok: {}, is_err: {}", r.is_ok(), r.is_err());
}`,
            output: `doubled: Ok(42)
with context: Err("parse failed: invalid digit found in string")
chained: Ok(42)
unwrap_or: 0
  (computing default)
unwrap_or_else: -1
ok(): Some(42)
is_ok: true, is_err: false`,
            tip: 'Chain .map() and .and_then() for clean error handling pipelines. Use .map_err() to add context to errors before propagating them up.',
            analogy: 'Think of it like a package delivery: Ok is the package arriving safely, Err is a delivery failure notice. Combinators like map let you open and transform the package without worrying about the failure case -- it just passes through unchanged.',
            codeHighlightLines: [3, 4, 7, 8, 12, 13, 14, 15],
          },
          {
            heading: 'Collecting Results',
            content:
              'When processing a collection of items that each might fail, you can collect into a Result<Vec<T>, E>. This either gives you all successes or the first error. It is a powerful pattern for batch validation.',
            code: `fn main() {
    // Collect all-or-nothing
    let strings = vec!["1", "2", "3", "4", "5"];
    let numbers: Result<Vec<i32>, _> = strings
        .iter()
        .map(|s| s.parse::<i32>())
        .collect();
    println!("all valid: {:?}", numbers);

    // First error stops collection
    let mixed = vec!["1", "two", "3"];
    let result: Result<Vec<i32>, _> = mixed
        .iter()
        .map(|s| s.parse::<i32>())
        .collect();
    println!("with error: {:?}", result);

    // Partition: separate successes and failures
    let data = vec!["10", "abc", "20", "xyz", "30"];
    let (successes, failures): (Vec<_>, Vec<_>) = data
        .iter()
        .map(|s| s.parse::<i32>())
        .partition(Result::is_ok);

    let values: Vec<i32> = successes.into_iter().map(Result::unwrap).collect();
    let errors: Vec<_> = failures.into_iter().map(Result::unwrap_err).collect();

    println!("values: {:?}", values);
    println!("errors: {} failures", errors.len());

    // filter_map: keep only successes
    let only_valid: Vec<i32> = data
        .iter()
        .filter_map(|s| s.parse::<i32>().ok())
        .collect();
    println!("only valid: {:?}", only_valid);
}`,
            output: `all valid: Ok([1, 2, 3, 4, 5])
with error: Err(invalid digit found in string)
values: [10, 20, 30]
errors: 2 failures
only valid: [10, 20, 30]`,
          },
        ],
        quiz: [
          {
            question: 'What are the two variants of Result<T, E> in Rust?',
            options: [
              'Ok(T) and Err(E)',
              'Some(T) and None',
              'Success(T) and Failure(E)',
              'Value(T) and Error(E)',
            ],
            correctIndex: 0,
            explanation: 'Result<T, E> is an enum with exactly two variants: Ok(T) for success values and Err(E) for error values. Some(T) and None belong to the Option type.',
          },
          {
            question: 'What does the .map() combinator do on a Result?',
            options: [
              'Transforms both the Ok and Err values',
              'Transforms the Ok value, leaving Err unchanged',
              'Transforms the Err value, leaving Ok unchanged',
              'Converts the Result into an Option',
            ],
            correctIndex: 1,
            explanation: '.map() applies a function to the Ok value inside a Result, producing a new Result with the transformed value. If the Result is Err, the error passes through unchanged. Use .map_err() to transform the Err side.',
          },
          {
            question: 'What happens when you collect an iterator of Result<T, E> into Result<Vec<T>, E>?',
            options: [
              'All errors are collected into a Vec',
              'Only Ok values are collected, errors are ignored',
              'You get Ok(Vec<T>) if all succeed, or the first Err',
              'It panics if any item is an Err',
            ],
            correctIndex: 2,
            explanation: 'Collecting into Result<Vec<T>, E> is an all-or-nothing operation. If every item is Ok, you get Ok with a Vec of all values. If any item is Err, you immediately get that first Err.',
          },
          {
            question: 'Which method converts a Result<T, E> into an Option<T>, discarding the error?',
            options: [
              '.unwrap()',
              '.ok()',
              '.into()',
              '.some()',
            ],
            correctIndex: 1,
            explanation: '.ok() converts Ok(v) to Some(v) and Err(_) to None, effectively discarding the error information. This is useful when you only care about the success case.',
          },
        ],
        challenge: {
          prompt: 'Write a function `safe_average` that takes a slice of string slices, parses each as f64, and returns Result<f64, String>. It should return an error if any string fails to parse, or if the slice is empty (with message "empty input"). Otherwise return the average.',
          starterCode: `fn safe_average(inputs: &[&str]) -> Result<f64, String> {
    // TODO: Return Err("empty input".to_string()) if inputs is empty
    // TODO: Parse each string as f64, propagating errors with a descriptive message
    // TODO: Return the average of all parsed values
    todo!()
}

fn main() {
    println!("{:?}", safe_average(&["10.0", "20.0", "30.0"]));
    println!("{:?}", safe_average(&["10.0", "abc", "30.0"]));
    println!("{:?}", safe_average(&[]));
}`,
          solutionCode: `fn safe_average(inputs: &[&str]) -> Result<f64, String> {
    if inputs.is_empty() {
        return Err("empty input".to_string());
    }

    let mut sum = 0.0;
    for (i, s) in inputs.iter().enumerate() {
        let val: f64 = s.parse()
            .map_err(|e| format!("failed to parse item {}: {}", i, e))?;
        sum += val;
    }

    Ok(sum / inputs.len() as f64)
}

fn main() {
    println!("{:?}", safe_average(&["10.0", "20.0", "30.0"]));
    println!("{:?}", safe_average(&["10.0", "abc", "30.0"]));
    println!("{:?}", safe_average(&[]));
}`,
          hints: [
            'Check for empty input first and return Err early with the specified message.',
            'Use .parse::<f64>() on each string and .map_err() to convert the parse error into a descriptive String.',
            'Accumulate the sum, then divide by inputs.len() as f64 to get the average.',
          ],
        },
      },
      {
        id: 'question-mark-operator',
        title: 'The ? Operator',
        difficulty: 'intermediate',
        tags: ['question-mark', 'propagation', 'early-return', 'error-handling'],
        cheatSheetSummary: 'let val = fallible_call()?; — propagate errors, return early on Err',
        signature: 'expr?',
        sections: [
          {
            heading: 'Error Propagation with ?',
            content:
              'The ? operator is syntactic sugar for propagating errors. When applied to a Result, it returns the Ok value if successful, or immediately returns the Err from the enclosing function. This eliminates verbose match chains and makes error handling concise.',
            code: `use std::fs;
use std::num::ParseIntError;

fn read_and_double(path: &str) -> Result<i32, String> {
    // Without ?:
    // let content = match fs::read_to_string(path) {
    //     Ok(c) => c,
    //     Err(e) => return Err(e.to_string()),
    // };

    // With ?:
    let content = fs::read_to_string(path).map_err(|e| e.to_string())?;
    let number = content.trim().parse::<i32>().map_err(|e| e.to_string())?;
    Ok(number * 2)
}

fn parse_pair(s: &str) -> Result<(i32, i32), ParseIntError> {
    let parts: Vec<&str> = s.split(',').collect();
    let x = parts[0].trim().parse::<i32>()?;
    let y = parts[1].trim().parse::<i32>()?;
    Ok((x, y))
}

fn main() {
    // parse_pair uses ? to propagate errors
    match parse_pair("10, 20") {
        Ok((x, y)) => println!("Parsed: ({}, {})", x, y),
        Err(e) => println!("Error: {}", e),
    }

    match parse_pair("10, abc") {
        Ok((x, y)) => println!("Parsed: ({}, {})", x, y),
        Err(e) => println!("Error: {}", e),
    }
}`,
            output: `Parsed: (10, 20)
Error: invalid digit found in string`,
            note: 'The ? operator can only be used in functions that return Result (or Option). In main(), you can use fn main() -> Result<(), Box<dyn std::error::Error>> to enable ?.',
            analogy: 'Think of it like a factory assembly line: the ? operator is a quality inspector at each station. If a part is defective (Err), the inspector immediately sends it to the reject bin (returns early) instead of passing it to the next station.',
            codeHighlightLines: [10, 11, 17, 18],
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    A["read_to_string(path)?"] -->|"Ok(content)"| B["content.parse::<i32>()?"] \n    A -->|"Err(e)"| R1["return Err(e)"]\n    B -->|"Ok(number)"| C["Ok(number * 2)"]\n    B -->|"Err(e)"| R2["return Err(e)"]\n    C --> D["return Ok(result)"]\n    style A fill:#6366f1,color:#fff\n    style B fill:#6366f1,color:#fff\n    style C fill:#10b981,color:#fff\n    style D fill:#10b981,color:#fff\n    style R1 fill:#ef4444,color:#fff\n    style R2 fill:#ef4444,color:#fff',
              caption: 'The ? operator creates an implicit branch at each step: Ok values continue to the next operation, while Err values immediately return from the function.',
            },
          },
          {
            heading: '? with Option',
            content:
              'The ? operator also works with Option. Inside a function returning Option, ? returns the Some value or immediately returns None. This is perfect for chaining operations that might produce None.',
            code: `fn get_middle_name(full_name: &str) -> Option<&str> {
    let mut parts = full_name.split_whitespace();
    let _first = parts.next()?;    // None if empty
    let middle = parts.next()?;     // None if only one name
    let _last = parts.next()?;      // None if only two names
    Some(middle)
}

fn safe_divide(a: f64, b: f64) -> Option<f64> {
    if b == 0.0 { None } else { Some(a / b) }
}

fn calculate(a: f64, b: f64, c: f64) -> Option<f64> {
    let ab = safe_divide(a, b)?;
    let result = safe_divide(ab, c)?;
    Some(result)
}

fn main() {
    println!("{:?}", get_middle_name("John Michael Smith"));
    println!("{:?}", get_middle_name("John Smith"));
    println!("{:?}", get_middle_name("John"));

    println!("{:?}", calculate(100.0, 5.0, 2.0));
    println!("{:?}", calculate(100.0, 0.0, 2.0));
}`,
            output: `Some("Michael")
None
None
Some(10.0)
None`,
          },
          {
            heading: '? in main and Conversion',
            content:
              'To use ? in main(), declare it to return Result. The ? operator automatically converts error types using the From trait, so you can mix different error types as long as they can be converted to the return type.',
            code: `use std::num::ParseIntError;
use std::fmt;

// Custom error type
#[derive(Debug)]
enum AppError {
    Parse(ParseIntError),
    Validation(String),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            AppError::Parse(e) => write!(f, "Parse error: {}", e),
            AppError::Validation(msg) => write!(f, "Validation: {}", msg),
        }
    }
}

// From conversions enable ? to convert automatically
impl From<ParseIntError> for AppError {
    fn from(e: ParseIntError) -> Self {
        AppError::Parse(e)
    }
}

fn validate_age(input: &str) -> Result<u32, AppError> {
    let age: u32 = input.parse()?;  // ParseIntError -> AppError via From
    if age > 150 {
        Err(AppError::Validation("age too large".to_string()))
    } else {
        Ok(age)
    }
}

fn main() {
    match validate_age("25") {
        Ok(age) => println!("Valid age: {}", age),
        Err(e) => println!("Error: {}", e),
    }

    match validate_age("abc") {
        Ok(age) => println!("Valid age: {}", age),
        Err(e) => println!("Error: {}", e),
    }

    match validate_age("200") {
        Ok(age) => println!("Valid age: {}", age),
        Err(e) => println!("Error: {}", e),
    }
}`,
            output: `Valid age: 25
Error: Parse error: invalid digit found in string
Error: Validation: age too large`,
            tip: 'Implement From<SpecificError> for YourError for each error type you want to propagate with ?. The conversion happens automatically, making error handling seamless.',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart LR\n    subgraph "? operator auto-conversion"\n        A["input.parse::<u32>()"] -->|"Err(ParseIntError)"| B["From::from()"]\n        B --> C["AppError::Parse(e)"]\n        C --> D["return Err(AppError)"]\n    end\n    subgraph "Direct error"\n        E["age > 150"] --> F["AppError::Validation(...)"]\n        F --> G["return Err(AppError)"]\n    end\n    style A fill:#6366f1,color:#fff\n    style B fill:#f59e0b,color:#fff\n    style C fill:#ef4444,color:#fff\n    style D fill:#ef4444,color:#fff\n    style F fill:#ef4444,color:#fff\n    style G fill:#ef4444,color:#fff',
              caption: 'The ? operator uses the From trait to automatically convert ParseIntError into AppError. Both error paths produce the same AppError return type.',
            },
          },
        ],
        quiz: [
          {
            question: 'What does the ? operator do when applied to an Err value?',
            options: [
              'It panics with the error message',
              'It converts the Err to None',
              'It returns early from the function with the Err',
              'It logs the error and continues execution',
            ],
            correctIndex: 2,
            explanation: 'The ? operator unwraps Ok values and continues execution, but when it encounters an Err, it immediately returns from the enclosing function with that Err value (after applying any From conversions).',
          },
          {
            question: 'Can the ? operator be used in a function that returns Option?',
            options: [
              'No, ? only works with Result',
              'Yes, it returns None early when applied to None',
              'Yes, but it converts None to an Err',
              'Only if the Option is wrapped in a Result',
            ],
            correctIndex: 1,
            explanation: 'The ? operator works with both Result and Option. In a function returning Option, applying ? to a None value causes the function to return None immediately, while Some(v) is unwrapped to v.',
          },
          {
            question: 'How does the ? operator convert between different error types?',
            options: [
              'It uses the Display trait to convert errors to strings',
              'It uses the From trait to automatically convert error types',
              'It wraps errors in Box<dyn Error>',
              'It requires explicit conversion; no automatic conversion happens',
            ],
            correctIndex: 1,
            explanation: 'The ? operator uses the From trait for automatic error type conversion. If your function returns Result<T, MyError> and the expression returns Result<T, OtherError>, ? calls From::from() to convert OtherError into MyError.',
          },
        ],
        challenge: {
          prompt: 'Write a function `parse_coordinates` that takes a string like "12.5,34.7" and returns Result<(f64, f64), String>. It should split on comma, validate exactly 2 parts, parse each as f64, and return appropriate error messages for each failure case. Use the ? operator with .map_err().',
          starterCode: `fn parse_coordinates(s: &str) -> Result<(f64, f64), String> {
    // TODO: Split the string on ','
    // TODO: Validate there are exactly 2 parts
    // TODO: Parse each part as f64 using ? with .map_err()
    // TODO: Return the tuple
    todo!()
}

fn main() {
    println!("{:?}", parse_coordinates("12.5,34.7"));
    println!("{:?}", parse_coordinates("12.5"));
    println!("{:?}", parse_coordinates("abc,34.7"));
}`,
          solutionCode: `fn parse_coordinates(s: &str) -> Result<(f64, f64), String> {
    let parts: Vec<&str> = s.split(',').collect();
    if parts.len() != 2 {
        return Err(format!("expected 2 coordinates, got {}", parts.len()));
    }

    let x: f64 = parts[0].trim().parse()
        .map_err(|e| format!("invalid x coordinate '{}': {}", parts[0].trim(), e))?;
    let y: f64 = parts[1].trim().parse()
        .map_err(|e| format!("invalid y coordinate '{}': {}", parts[1].trim(), e))?;

    Ok((x, y))
}

fn main() {
    println!("{:?}", parse_coordinates("12.5,34.7"));
    println!("{:?}", parse_coordinates("12.5"));
    println!("{:?}", parse_coordinates("abc,34.7"));
}`,
          hints: [
            'Use .split(\',\').collect::<Vec<&str>>() to split the input, then check the length.',
            'Apply .map_err(|e| format!(...)) before ? to convert ParseFloatError into a descriptive String.',
          ],
        },
      },
      {
        id: 'custom-errors',
        title: 'Custom Errors',
        difficulty: 'advanced',
        tags: ['custom-error', 'Error-trait', 'thiserror', 'anyhow', 'error-design'],
        cheatSheetSummary: 'impl std::error::Error for MyError {} — define domain-specific error types',
        sections: [
          {
            heading: 'Implementing the Error Trait',
            content:
              'The std::error::Error trait is the standard interface for error types. It requires Display and Debug and optionally provides a source() method for error chaining. Implementing this trait lets your errors integrate with the broader Rust error ecosystem.',
            code: `use std::fmt;
use std::num::ParseIntError;

#[derive(Debug)]
enum ConfigError {
    MissingField(String),
    InvalidValue { field: String, value: String },
    ParseError { field: String, source: ParseIntError },
}

impl fmt::Display for ConfigError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            ConfigError::MissingField(name) =>
                write!(f, "missing required field: {}", name),
            ConfigError::InvalidValue { field, value } =>
                write!(f, "invalid value '{}' for field '{}'", value, field),
            ConfigError::ParseError { field, source } =>
                write!(f, "failed to parse '{}': {}", field, source),
        }
    }
}

impl std::error::Error for ConfigError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match self {
            ConfigError::ParseError { source, .. } => Some(source),
            _ => None,
        }
    }
}

impl From<ParseIntError> for ConfigError {
    fn from(e: ParseIntError) -> Self {
        ConfigError::ParseError {
            field: "unknown".to_string(),
            source: e,
        }
    }
}

fn parse_config(port_str: &str) -> Result<u16, ConfigError> {
    let port: u16 = port_str.parse().map_err(|e: ParseIntError| {
        ConfigError::ParseError {
            field: "port".to_string(),
            source: e,
        }
    })?;

    if port < 1024 {
        return Err(ConfigError::InvalidValue {
            field: "port".to_string(),
            value: port.to_string(),
        });
    }

    Ok(port)
}

fn main() {
    match parse_config("8080") {
        Ok(port) => println!("port: {}", port),
        Err(e) => println!("Error: {}", e),
    }

    match parse_config("abc") {
        Ok(port) => println!("port: {}", port),
        Err(e) => println!("Error: {}", e),
    }

    match parse_config("80") {
        Ok(port) => println!("port: {}", port),
        Err(e) => println!("Error: {}", e),
    }
}`,
            output: `port: 8080
Error: failed to parse 'port': invalid digit found in string
Error: invalid value '80' for field 'port'`,
            diagram: {
              kind: 'mermaid',
              code: 'classDiagram\n    class Error {\n        <<trait>>\n        +Display\n        +Debug\n        +source() Option~dyn Error~\n    }\n    class ConfigError {\n        <<enum>>\n    }\n    class MissingField {\n        String name\n    }\n    class InvalidValue {\n        String field\n        String value\n    }\n    class ParseError {\n        String field\n        ParseIntError source\n    }\n    Error <|.. ConfigError : implements\n    ConfigError <|-- MissingField : variant\n    ConfigError <|-- InvalidValue : variant\n    ConfigError <|-- ParseError : variant\n    note for ParseError "source() returns the\\ninner ParseIntError\\nfor error chaining"',
              caption: 'A custom error enum implementing std::error::Error. Each variant represents a different failure mode. ParseError chains to the underlying ParseIntError via source().',
            },
          },
          {
            heading: 'Type Aliases for Result',
            content:
              'A common pattern is to define a type alias for Result with your error type. This reduces boilerplate in function signatures throughout your module or crate.',
            code: `use std::fmt;

#[derive(Debug)]
enum DbError {
    ConnectionFailed(String),
    QueryFailed(String),
    NotFound(String),
}

impl fmt::Display for DbError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            DbError::ConnectionFailed(msg) => write!(f, "connection failed: {}", msg),
            DbError::QueryFailed(msg) => write!(f, "query failed: {}", msg),
            DbError::NotFound(id) => write!(f, "record not found: {}", id),
        }
    }
}

impl std::error::Error for DbError {}

// Type alias for convenience
type DbResult<T> = Result<T, DbError>;

fn connect() -> DbResult<String> {
    Ok("connection-123".to_string())
}

fn find_user(conn: &str, id: &str) -> DbResult<String> {
    if id == "1" {
        Ok(format!("[{}] User: Alice", conn))
    } else {
        Err(DbError::NotFound(id.to_string()))
    }
}

fn main() {
    let conn = connect().unwrap();
    match find_user(&conn, "1") {
        Ok(user) => println!("{}", user),
        Err(e) => println!("Error: {}", e),
    }

    match find_user(&conn, "99") {
        Ok(user) => println!("{}", user),
        Err(e) => println!("Error: {}", e),
    }
}`,
            output: `[connection-123] User: Alice
Error: record not found: 99`,
            tip: 'The standard library uses this pattern extensively: std::io::Result<T> is an alias for Result<T, std::io::Error>. Define your own for clean API signatures.',
          },
          {
            heading: 'Box<dyn Error> for Prototyping',
            content:
              'For quick prototyping or when you do not want to define a custom error type, use Box<dyn Error> as the error type. It accepts any error type and is convenient for scripts and examples. For production libraries, prefer concrete error types.',
            code: `use std::error::Error;

type BoxResult<T> = Result<T, Box<dyn Error>>;

fn parse_and_compute(a: &str, b: &str) -> BoxResult<f64> {
    let x: f64 = a.parse()?;    // ParseFloatError -> Box<dyn Error>
    let y: f64 = b.parse()?;
    if y == 0.0 {
        return Err("division by zero".into());  // &str -> Box<dyn Error>
    }
    Ok(x / y)
}

fn process_data(input: &str) -> BoxResult<Vec<i32>> {
    let numbers: Result<Vec<i32>, _> = input
        .split(',')
        .map(|s| s.trim().parse::<i32>())
        .collect();
    let nums = numbers?;

    if nums.is_empty() {
        return Err("empty input".into());
    }

    Ok(nums)
}

fn main() {
    match parse_and_compute("10.0", "3.0") {
        Ok(val) => println!("result: {:.2}", val),
        Err(e) => println!("error: {}", e),
    }

    match parse_and_compute("10.0", "0.0") {
        Ok(val) => println!("result: {:.2}", val),
        Err(e) => println!("error: {}", e),
    }

    match process_data("1, 2, 3, 4, 5") {
        Ok(nums) => println!("numbers: {:?}", nums),
        Err(e) => println!("error: {}", e),
    }

    match process_data("1, abc, 3") {
        Ok(nums) => println!("numbers: {:?}", nums),
        Err(e) => println!("error: {}", e),
    }
}`,
            output: `result: 3.33
error: division by zero
numbers: [1, 2, 3, 4, 5]
error: invalid digit found in string`,
            note: 'Box<dyn Error> erases the concrete error type, so you cannot match on specific error variants. For libraries, define enum error types. For applications, consider the anyhow or thiserror crates.',
          },
        ],
        quiz: [
          {
            question: 'Which traits must a custom error type implement at minimum to satisfy std::error::Error?',
            options: [
              'Debug only',
              'Display and Debug',
              'Display, Debug, and Clone',
              'Display, Debug, and PartialEq',
            ],
            correctIndex: 1,
            explanation: 'The std::error::Error trait has supertraits Display and Debug, so any type implementing Error must also implement both. Clone and PartialEq are not required.',
          },
          {
            question: 'What is the purpose of the source() method on the Error trait?',
            options: [
              'To return the source code location where the error occurred',
              'To return the underlying lower-level error that caused this error',
              'To convert the error into a string representation',
              'To create a new error from a source string',
            ],
            correctIndex: 1,
            explanation: 'The source() method returns an Option<&(dyn Error)> pointing to the lower-level error that caused the current error. This enables error chaining, allowing callers to traverse the chain of causes.',
          },
          {
            question: 'What is the advantage of defining a type alias like `type DbResult<T> = Result<T, DbError>;`?',
            options: [
              'It makes error handling faster at runtime',
              'It reduces boilerplate in function signatures throughout the module',
              'It enables automatic error conversion with the ? operator',
              'It allows using unwrap() without panicking',
            ],
            correctIndex: 1,
            explanation: 'A Result type alias reduces repetition in function signatures. Instead of writing Result<T, DbError> everywhere, you write DbResult<T>. This is a purely ergonomic benefit with no runtime impact.',
          },
          {
            question: 'When should you use Box<dyn Error> vs a custom error enum?',
            options: [
              'Box<dyn Error> for libraries, custom enums for applications',
              'Custom enums for libraries, Box<dyn Error> for prototyping and applications',
              'Box<dyn Error> always, custom enums are deprecated',
              'Custom enums always, Box<dyn Error> has too much overhead',
            ],
            correctIndex: 1,
            explanation: 'Libraries should define concrete error enums so callers can match on specific variants. Applications and prototypes can use Box<dyn Error> (or the anyhow crate) for convenience since they typically just display errors rather than match on them.',
          },
        ],
        challenge: {
          prompt: 'Define a custom error enum `MathError` with variants `DivisionByZero` and `NegativeSquareRoot(f64)`. Implement Display, Debug, and std::error::Error. Then write a function `safe_sqrt_div(a: f64, b: f64)` that divides a by b, then takes the square root, returning MathError for invalid operations.',
          starterCode: `use std::fmt;

#[derive(Debug)]
enum MathError {
    // TODO: Add DivisionByZero and NegativeSquareRoot(f64) variants
}

// TODO: Implement fmt::Display for MathError

// TODO: Implement std::error::Error for MathError

fn safe_sqrt_div(a: f64, b: f64) -> Result<f64, MathError> {
    // TODO: Return DivisionByZero if b is 0.0
    // TODO: Compute a / b, then check if result is negative
    // TODO: Return NegativeSquareRoot if negative, else return sqrt
    todo!()
}

fn main() {
    println!("{:?}", safe_sqrt_div(16.0, 4.0));
    println!("{:?}", safe_sqrt_div(16.0, 0.0));
    println!("{:?}", safe_sqrt_div(-16.0, 1.0));
}`,
          solutionCode: `use std::fmt;

#[derive(Debug)]
enum MathError {
    DivisionByZero,
    NegativeSquareRoot(f64),
}

impl fmt::Display for MathError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            MathError::DivisionByZero => write!(f, "division by zero"),
            MathError::NegativeSquareRoot(val) => {
                write!(f, "cannot take square root of negative number: {}", val)
            }
        }
    }
}

impl std::error::Error for MathError {}

fn safe_sqrt_div(a: f64, b: f64) -> Result<f64, MathError> {
    if b == 0.0 {
        return Err(MathError::DivisionByZero);
    }
    let quotient = a / b;
    if quotient < 0.0 {
        return Err(MathError::NegativeSquareRoot(quotient));
    }
    Ok(quotient.sqrt())
}

fn main() {
    println!("{:?}", safe_sqrt_div(16.0, 4.0));
    println!("{:?}", safe_sqrt_div(16.0, 0.0));
    println!("{:?}", safe_sqrt_div(-16.0, 1.0));
}`,
          hints: [
            'The enum needs two variants: DivisionByZero (unit variant) and NegativeSquareRoot(f64) (tuple variant).',
            'In Display, match on each variant and use write!() to format a human-readable message.',
            'Check b == 0.0 first, then compute the quotient and check if it is negative before calling .sqrt().',
          ],
        },
      },
      {
        id: 'panic-vs-result',
        title: 'panic! vs Result',
        difficulty: 'intermediate',
        tags: ['panic', 'unwrap', 'expect', 'unrecoverable', 'when-to-panic'],
        cheatSheetSummary: 'Use Result for recoverable errors, panic! for unrecoverable bugs',
        sections: [
          {
            heading: 'When to Use panic!',
            content:
              'panic! is for unrecoverable errors: bugs in your code, violated invariants, or situations where continuing would cause data corruption. Result is for expected, recoverable errors: file not found, invalid input, network failures. The key question is: can the caller meaningfully handle this error?',
            code: `fn main() {
    // panic! for programmer errors / invariant violations
    let v = vec![1, 2, 3];
    // v[99];  // panics: index out of bounds

    // unwrap/expect: OK in tests and prototypes
    let n: i32 = "42".parse().unwrap();
    let m: i32 = "42".parse().expect("should be a valid number");
    println!("{} {}", n, m);

    // Result for expected failures
    let result = std::fs::read_to_string("/nonexistent/file");
    match result {
        Ok(content) => println!("Content: {}", content),
        Err(e) => println!("Expected error: {}", e),
    }

    // Guidelines:
    // - Library code: almost always return Result
    // - Binary/app code: Result for I/O, panic for bugs
    // - Tests: unwrap/expect are fine
    // - Prototypes: unwrap is acceptable

    // Custom panic message
    let config = std::env::var("MY_APP_SECRET");
    let _secret = config.unwrap_or_else(|_| {
        // In production, you might panic if a required config is missing
        "default_secret".to_string()
    });
}`,
            output: `42 42
Expected error: No such file or directory (os error 2)`,
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    A["Error occurs"] --> B{"Can the caller\\nhandle this?"}\n    B -->|"Yes"| C["Use Result<T, E>"]\n    B -->|"No (bug/invariant)"| D["Use panic!"]\n    C --> C1["File not found"]\n    C --> C2["Invalid user input"]\n    C --> C3["Network timeout"]\n    C --> C4["Parse failure"]\n    D --> D1["Index out of bounds"]\n    D --> D2["Violated invariant"]\n    D --> D3["Unreachable code"]\n    D --> D4["Corrupted state"]\n    style C fill:#10b981,color:#fff\n    style D fill:#ef4444,color:#fff\n    style C1 fill:#10b981,color:#fff\n    style C2 fill:#10b981,color:#fff\n    style C3 fill:#10b981,color:#fff\n    style C4 fill:#10b981,color:#fff\n    style D1 fill:#ef4444,color:#fff\n    style D2 fill:#ef4444,color:#fff\n    style D3 fill:#ef4444,color:#fff\n    style D4 fill:#ef4444,color:#fff',
              caption: 'The decision tree: recoverable errors (expected failures from the outside world) use Result. Unrecoverable errors (bugs, invariant violations) use panic!.',
            },
          },
          {
            heading: 'Recoverable Error Patterns',
            content:
              'For recoverable errors, use Result with meaningful error messages, the ? operator for propagation, and default values when appropriate. Here is a comparison of approaches from least to most robust.',
            code: `fn main() {
    let input = "not_a_number";

    // Level 1: unwrap (crashes on error - BAD for production)
    // let n: i32 = input.parse().unwrap();

    // Level 2: expect (crashes with message - OK for must-succeed cases)
    // let n: i32 = input.parse().expect("config must be an integer");

    // Level 3: unwrap_or (silent default)
    let n: i32 = input.parse().unwrap_or(0);
    println!("unwrap_or: {}", n);

    // Level 4: unwrap_or_else (computed default with logging)
    let n: i32 = input.parse().unwrap_or_else(|e| {
        eprintln!("Warning: parse failed ({}), using default", e);
        0
    });
    println!("unwrap_or_else: {}", n);

    // Level 5: match (full control)
    let n: i32 = match input.parse() {
        Ok(val) => val,
        Err(e) => {
            eprintln!("Error parsing '{}': {}", input, e);
            return;
        }
    };
    println!("match: {}", n);
}`,
            output: `unwrap_or: 0
Warning: parse failed (invalid digit found in string), using default
unwrap_or_else: 0
Error parsing 'not_a_number': invalid digit found in string`,
            warning: 'Never use .unwrap() on user input or I/O operations in production code. These can always fail, and a panic will crash your entire program or service.',
          },
          {
            heading: 'Panic Hooks and Backtraces',
            content:
              'You can customize panic behavior with panic hooks and enable backtraces for debugging. In production, you might want to log the panic and gracefully shut down instead of printing to stderr.',
            code: `use std::panic;

fn main() {
    // Set a custom panic hook
    panic::set_hook(Box::new(|info| {
        if let Some(msg) = info.payload().downcast_ref::<&str>() {
            eprintln!("PANIC: {}", msg);
        } else if let Some(msg) = info.payload().downcast_ref::<String>() {
            eprintln!("PANIC: {}", msg);
        }
        if let Some(location) = info.location() {
            eprintln!("  at {}:{}", location.file(), location.line());
        }
    }));

    // catch_unwind: recover from a panic (use sparingly)
    let result = panic::catch_unwind(|| {
        let v = vec![1, 2, 3];
        v[99]  // panics
    });

    match result {
        Ok(val) => println!("Got: {}", val),
        Err(_) => println!("Caught a panic!"),
    }

    println!("Program continues after caught panic");

    // Enable backtrace with RUST_BACKTRACE=1
    // RUST_BACKTRACE=1 cargo run
}`,
            output: `PANIC: index out of bounds: the len is 3 but the index is 99
  at src/main.rs:17
Caught a panic!
Program continues after caught panic`,
            note: 'catch_unwind is NOT a general error handling mechanism. Use it only for preventing panics from crossing FFI boundaries or for isolating panics in thread pools. Normal error handling should use Result.',
          },
        ],
        quiz: [
          {
            question: 'When should you use panic! instead of returning a Result?',
            options: [
              'Whenever an error occurs in production code',
              'For unrecoverable errors like violated invariants or bugs',
              'For all I/O errors like file not found',
              'When you want to display an error message to the user',
            ],
            correctIndex: 1,
            explanation: 'panic! is for unrecoverable situations: bugs, violated invariants, or states where continuing would cause corruption. Recoverable errors (I/O, parsing, network) should use Result so callers can handle them.',
          },
          {
            question: 'What is the difference between .unwrap() and .expect() on a Result?',
            options: [
              '.unwrap() returns a default value, .expect() panics',
              'Both panic on Err, but .expect() includes a custom message',
              '.expect() converts the error to a String, .unwrap() does not',
              '.unwrap() is for tests only, .expect() is for production',
            ],
            correctIndex: 1,
            explanation: 'Both .unwrap() and .expect() panic when called on Err. The only difference is that .expect("msg") includes your custom message in the panic output, making it easier to debug. Neither should be used on user input in production.',
          },
          {
            question: 'What does std::panic::catch_unwind do?',
            options: [
              'It prevents all panics in the program',
              'It catches a panic from a closure and returns a Result',
              'It converts panics into compile-time errors',
              'It logs panics to a file instead of crashing',
            ],
            correctIndex: 1,
            explanation: 'catch_unwind runs a closure and catches any panic that occurs, returning Ok(value) on success or Err(payload) if a panic happened. It is primarily used at FFI boundaries or in thread pools, not for general error handling.',
          },
        ],
        challenge: {
          prompt: 'Write a function `parse_config_value` that takes a key name and a string value. It should return the parsed i32 on success. Use different error-handling strategies based on the key: for "port", use .expect() with a descriptive message. For "timeout", use .unwrap_or(30) as a default. For any other key, return a Result<i32, String> using match.',
          starterCode: `fn parse_port(value: &str) -> i32 {
    // TODO: Use .expect() with a message like "port must be a valid integer"
    todo!()
}

fn parse_timeout(value: &str) -> i32 {
    // TODO: Use .unwrap_or(30) to default to 30
    todo!()
}

fn parse_generic(key: &str, value: &str) -> Result<i32, String> {
    // TODO: Use match to handle Ok and Err, returning a descriptive error
    todo!()
}

fn main() {
    println!("port: {}", parse_port("8080"));
    println!("timeout: {}", parse_timeout("abc"));
    println!("timeout: {}", parse_timeout("60"));
    println!("generic: {:?}", parse_generic("retries", "5"));
    println!("generic: {:?}", parse_generic("retries", "abc"));
}`,
          solutionCode: `fn parse_port(value: &str) -> i32 {
    value.parse::<i32>().expect("port must be a valid integer")
}

fn parse_timeout(value: &str) -> i32 {
    value.parse::<i32>().unwrap_or(30)
}

fn parse_generic(key: &str, value: &str) -> Result<i32, String> {
    match value.parse::<i32>() {
        Ok(n) => Ok(n),
        Err(e) => Err(format!("failed to parse '{}' for key '{}': {}", value, key, e)),
    }
}

fn main() {
    println!("port: {}", parse_port("8080"));
    println!("timeout: {}", parse_timeout("abc"));
    println!("timeout: {}", parse_timeout("60"));
    println!("generic: {:?}", parse_generic("retries", "5"));
    println!("generic: {:?}", parse_generic("retries", "abc"));
}`,
          hints: [
            'For parse_port, call .parse::<i32>().expect("your message") directly.',
            'For parse_timeout, call .parse::<i32>().unwrap_or(30) to silently fall back to the default.',
            'For parse_generic, use match on .parse::<i32>() and format a descriptive error string in the Err arm.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Collections                                                  */
  /* ------------------------------------------------------------ */
  {
    id: 'rust-collections',
    label: 'Collections',
    icon: 'Layers',
    entries: [
      {
        id: 'vectors',
        title: 'Vec<T>',
        difficulty: 'beginner',
        tags: ['Vec', 'vector', 'dynamic-array', 'heap', 'growable'],
        cheatSheetSummary: 'let v = vec![1, 2, 3]; — growable, heap-allocated array',
        signature: 'Vec<T>',
        crossLanguageId: 'list-array',
        sections: [
          {
            heading: 'Creating and Accessing Vectors',
            content:
              'Vec<T> is Rust\'s growable array type. It stores elements contiguously on the heap with O(1) amortized push and O(1) random access. The vec! macro provides convenient initialization. Vec is the most commonly used collection in Rust.',
            code: `fn main() {
    // Creating vectors
    let v1: Vec<i32> = Vec::new();
    let v2 = vec![1, 2, 3, 4, 5];
    let v3 = vec![0; 10];            // 10 zeros
    let v4: Vec<i32> = (0..5).collect(); // from iterator

    println!("v1: {:?}", v1);
    println!("v2: {:?}", v2);
    println!("v3: {:?}", v3);
    println!("v4: {:?}", v4);

    // Accessing elements
    let third = v2[2];             // panics on out-of-bounds
    let safe = v2.get(10);         // returns Option<&T>
    println!("third: {}", third);
    println!("safe: {:?}", safe);

    // First and last
    println!("first: {:?}", v2.first());
    println!("last: {:?}", v2.last());

    // Length and capacity
    println!("len: {}, capacity: {}", v2.len(), v2.capacity());
    println!("is_empty: {}", v1.is_empty());
}`,
            output: `v1: []
v2: [1, 2, 3, 4, 5]
v3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
v4: [0, 1, 2, 3, 4]
third: 3
safe: None
first: Some(1)
last: Some(5)
len: 5, capacity: 5
is_empty: true`,
            tip: 'Use Vec::with_capacity(n) when you know the final size. It avoids reallocations and can significantly improve performance for large vectors.',
            analogy: 'Think of it like a stretchy backpack: it starts small but expands as you add more items. If you know ahead of time you need room for 100 items, you can pick a big backpack up front (with_capacity) and avoid repeatedly upgrading to larger ones.',
            codeHighlightLines: [4, 5, 6, 15, 16],
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Vec<i32> on Stack',
                    color: '#6366f1',
                    items: [
                      { name: 'ptr', value: '-> heap buffer' },
                      { name: 'len', value: '5' },
                      { name: 'capacity', value: '8 (may over-allocate)' },
                    ],
                  },
                  {
                    label: 'Heap Buffer (contiguous)',
                    color: '#10b981',
                    items: [
                      { name: '[0]', value: '1' },
                      { name: '[1]', value: '2' },
                      { name: '[2]', value: '3' },
                      { name: '[3]', value: '4' },
                      { name: '[4]', value: '5' },
                      { name: '[5..7]', value: '(unused capacity)' },
                    ],
                  },
                ],
              },
              caption: 'A Vec is three words on the stack: pointer, length, and capacity. The elements live in a contiguous heap buffer. When capacity is exceeded, Vec allocates a larger buffer and moves elements.',
            },
          },
          {
            heading: 'Modifying Vectors',
            content:
              'Vectors support push/pop at the end (O(1) amortized), insert/remove at any position (O(n)), sorting, deduplication, and filtering. The retain method removes elements that do not match a predicate.',
            code: `fn main() {
    let mut v = vec![3, 1, 4, 1, 5, 9, 2, 6];

    // Push and pop
    v.push(5);
    let popped = v.pop(); // Some(5)
    println!("popped: {:?}, v: {:?}", popped, v);

    // Insert and remove
    v.insert(0, 99);      // insert at beginning
    v.remove(0);           // remove at beginning
    println!("after insert/remove: {:?}", v);

    // Sort and dedup
    v.sort();
    println!("sorted: {:?}", v);
    v.dedup(); // remove consecutive duplicates
    println!("deduped: {:?}", v);

    // Retain: keep only elements matching predicate
    v.retain(|&x| x > 3);
    println!("retained > 3: {:?}", v);

    // Extend from another iterator
    v.extend([100, 200, 300]);
    println!("extended: {:?}", v);

    // Truncate and clear
    v.truncate(3);
    println!("truncated: {:?}", v);
    v.clear();
    println!("cleared: {:?}, len: {}", v, v.len());
}`,
            output: `popped: Some(5), v: [3, 1, 4, 1, 5, 9, 2, 6]
after insert/remove: [3, 1, 4, 1, 5, 9, 2, 6]
sorted: [1, 1, 2, 3, 4, 5, 6, 9]
deduped: [1, 2, 3, 4, 5, 6, 9]
retained > 3: [4, 5, 6, 9]
extended: [4, 5, 6, 9, 100, 200, 300]
truncated: [4, 5, 6]
cleared: [], len: 0`,
          },
          {
            heading: 'Iterating Over Vectors',
            content:
              'Vectors support three iteration modes: &v (immutable borrow), &mut v (mutable borrow), and v (consuming). Choose the right one based on whether you need to read, modify, or consume the elements.',
            code: `fn main() {
    let mut numbers = vec![1, 2, 3, 4, 5];

    // Immutable iteration
    for n in &numbers {
        print!("{} ", n);
    }
    println!();

    // Mutable iteration
    for n in &mut numbers {
        *n *= 10;
    }
    println!("mutated: {:?}", numbers);

    // Consuming iteration (v is moved)
    let names = vec!["Alice", "Bob", "Charlie"];
    for name in names {
        println!("Hello, {}!", name);
    }
    // names no longer available

    // Iterator methods
    let data = vec![10, 20, 30, 40, 50];

    let sum: i32 = data.iter().sum();
    let product: i32 = data.iter().product();
    let min = data.iter().min().unwrap();
    let max = data.iter().max().unwrap();

    println!("sum: {}, product: {}, min: {}, max: {}", sum, product, min, max);

    // Enumerate
    for (i, val) in data.iter().enumerate() {
        println!("  [{}] = {}", i, val);
    }
}`,
            output: `1 2 3 4 5
mutated: [10, 20, 30, 40, 50]
Hello, Alice!
Hello, Bob!
Hello, Charlie!
sum: 150, product: 15000000, min: 10, max: 50
  [0] = 10
  [1] = 20
  [2] = 30
  [3] = 40
  [4] = 50`,
          },
        ],
        quiz: [
          {
            question: 'What does vec![0; 10] create?',
            options: [
              'A vector containing the single element 10',
              'A vector with 10 zeros',
              'An empty vector with capacity 10',
              'A vector containing numbers 0 through 9',
            ],
            correctIndex: 1,
            explanation: 'The syntax vec![value; count] creates a vector with `count` copies of `value`. So vec![0; 10] creates a vector of ten zeros. Use Vec::with_capacity(10) for an empty vector with pre-allocated space.',
          },
          {
            question: 'What is the difference between v[2] and v.get(2) for accessing vector elements?',
            options: [
              'v[2] returns Option<&T>, v.get(2) returns &T',
              'v[2] panics on out-of-bounds, v.get(2) returns Option<&T>',
              'They are identical in behavior',
              'v[2] returns a copy, v.get(2) returns a reference',
            ],
            correctIndex: 1,
            explanation: 'Direct indexing with v[2] panics if the index is out of bounds. The .get(2) method returns Option<&T>, giving you None for out-of-bounds access instead of crashing. Use .get() when the index might be invalid.',
          },
          {
            question: 'What happens when you iterate with `for n in &mut numbers`?',
            options: [
              'Elements are moved out of the vector',
              'You get immutable references to each element',
              'You get mutable references, allowing in-place modification',
              'The vector is cloned before iteration',
            ],
            correctIndex: 2,
            explanation: 'Iterating with &mut gives mutable references to each element, allowing you to modify them in place using *n = new_value. The vector remains valid after iteration, unlike consuming iteration (for n in numbers) which moves elements out.',
          },
        ],
        challenge: {
          prompt: 'Write a function `running_average` that takes a Vec<f64> and returns a new Vec<f64> where each element is the average of all elements up to and including that index. For example, [2.0, 4.0, 6.0] becomes [2.0, 3.0, 4.0].',
          starterCode: `fn running_average(data: &[f64]) -> Vec<f64> {
    // TODO: Create a result vector
    // TODO: Track a running sum
    // TODO: For each element, add to sum and push sum/(index+1)
    todo!()
}

fn main() {
    let data = vec![2.0, 4.0, 6.0, 8.0, 10.0];
    let averages = running_average(&data);
    println!("{:?}", averages);
    // Expected: [2.0, 3.0, 4.0, 5.0, 6.0]
}`,
          solutionCode: `fn running_average(data: &[f64]) -> Vec<f64> {
    let mut result = Vec::with_capacity(data.len());
    let mut sum = 0.0;

    for (i, &val) in data.iter().enumerate() {
        sum += val;
        result.push(sum / (i + 1) as f64);
    }

    result
}

fn main() {
    let data = vec![2.0, 4.0, 6.0, 8.0, 10.0];
    let averages = running_average(&data);
    println!("{:?}", averages);
    // Expected: [2.0, 3.0, 4.0, 5.0, 6.0]
}`,
          hints: [
            'Use Vec::with_capacity(data.len()) to pre-allocate the exact size needed.',
            'Use .iter().enumerate() to get both the index and value, and keep a running sum.',
            'Divide the running sum by (i + 1) as f64 at each step to get the running average.',
          ],
        },
      },
      {
        id: 'strings',
        title: 'Strings',
        difficulty: 'intermediate',
        tags: ['String', 'str', 'UTF-8', 'string-manipulation', 'owned-vs-borrowed'],
        cheatSheetSummary: 'String (owned, heap) vs &str (borrowed slice). Both are UTF-8.',
        signature: 'String | &str',
        crossLanguageId: 'strings',
        sections: [
          {
            heading: 'String vs &str',
            content:
              'Rust has two main string types. String is a heap-allocated, growable, owned string. &str is a borrowed string slice, an immutable reference to UTF-8 data. String literals are &str. Understanding when to use each is key to productive Rust development.',
            code: `fn main() {
    // &str: borrowed, immutable, often a string literal
    let literal: &str = "hello, world";

    // String: owned, heap-allocated, growable
    let mut owned = String::from("hello");
    owned.push_str(", world");
    owned.push('!');

    // Converting between them
    let s1: String = literal.to_string();     // &str -> String
    let s2: String = String::from("hello");   // &str -> String
    let s3: &str = &owned;                    // String -> &str (deref coercion)

    println!("literal: {}", literal);
    println!("owned: {}", owned);
    println!("s1: {}, s3: {}", s1, s3);

    // Concatenation
    let greeting = String::from("Hello, ") + "world!"; // String + &str
    let formatted = format!("{} {} {}", "one", "two", "three");
    println!("{}", greeting);
    println!("{}", formatted);

    // Capacity and length
    println!("len: {}, capacity: {}", owned.len(), owned.capacity());
}`,
            output: `literal: hello, world
owned: hello, world!
s1: hello, world, s3: hello, world!
Hello, world!
one two three
len: 13, capacity: 13`,
            tip: 'Function parameters should generally accept &str rather than &String. A &String automatically coerces to &str via deref coercion, so &str is strictly more flexible.',
          },
          {
            heading: 'String Methods',
            content:
              'String and &str provide a rich set of methods for searching, splitting, trimming, replacing, and case conversion. Remember that .len() returns byte length, not character count, because strings are UTF-8.',
            code: `fn main() {
    let text = "  Hello, Rust World!  ";

    // Trimming
    println!("trimmed: '{}'", text.trim());
    println!("trim_start: '{}'", text.trim_start());
    println!("trim_end: '{}'", text.trim_end());

    // Searching
    let s = "hello world hello";
    println!("contains 'world': {}", s.contains("world"));
    println!("starts_with 'hello': {}", s.starts_with("hello"));
    println!("ends_with 'hello': {}", s.ends_with("hello"));
    println!("find 'world': {:?}", s.find("world"));

    // Splitting
    let csv = "one,two,three,four";
    let parts: Vec<&str> = csv.split(',').collect();
    println!("split: {:?}", parts);

    let words: Vec<&str> = "  hello   world  ".split_whitespace().collect();
    println!("words: {:?}", words);

    // Replacing
    println!("replace: {}", s.replace("hello", "hi"));
    println!("replacen: {}", s.replacen("hello", "hi", 1));

    // Case conversion
    println!("upper: {}", s.to_uppercase());
    println!("lower: {}", s.to_lowercase());

    // Repetition
    let dashes = "-".repeat(20);
    println!("{}", dashes);
}`,
            output: `trimmed: 'Hello, Rust World!'
trim_start: 'Hello, Rust World!  '
trim_end: '  Hello, Rust World!'
contains 'world': true
starts_with 'hello': true
ends_with 'hello': true
find 'world': Some(6)
split: ["one", "two", "three", "four"]
words: ["hello", "world"]
replace: hi world hi
replacen: hi world hello
upper: HELLO WORLD HELLO
lower: hello world hello
--------------------`,
          },
          {
            heading: 'UTF-8 and Characters',
            content:
              'Rust strings are guaranteed valid UTF-8. This means indexing by byte position can be dangerous with multi-byte characters. Use .chars() for character iteration and .char_indices() for position-aware iteration.',
            code: `fn main() {
    let text = "Hello, \u{1F30D}! Caf\u{00E9}";

    // len() is byte count, not char count
    println!("bytes: {}", text.len());
    println!("chars: {}", text.chars().count());

    // Cannot index directly: text[0] would be a compile error
    // Use chars() or bytes()
    for (i, ch) in text.char_indices() {
        if ch == '\u{1F30D}' || ch == '\u{00E9}' {
            println!("byte {}: '{}'", i, ch);
        }
    }

    // Get a substring safely
    fn safe_substring(s: &str, start: usize, len: usize) -> &str {
        let start_byte = s.char_indices().nth(start).map(|(i, _)| i).unwrap_or(s.len());
        let end_byte = s.char_indices().nth(start + len).map(|(i, _)| i).unwrap_or(s.len());
        &s[start_byte..end_byte]
    }

    println!("first 5 chars: '{}'", safe_substring(text, 0, 5));

    // Iterate over grapheme clusters for true "characters"
    // (requires the unicode-segmentation crate for full correctness)
    let chars: Vec<char> = text.chars().collect();
    println!("char vec: {:?}", chars);
}`,
            output: `bytes: 18
chars: 14
byte 7: '\u{1F30D}'
byte 15: '\u{00E9}'
first 5 chars: 'Hello'
char vec: ['H', 'e', 'l', 'l', 'o', ',', ' ', '\u{1F30D}', '!', ' ', 'C', 'a', 'f', '\u{00E9}']`,
            warning: 'Never assume 1 character = 1 byte in Rust strings. Multi-byte characters like emoji (4 bytes) or accented letters (2 bytes) will cause panics if you slice at the wrong byte boundary.',
          },
        ],
        quiz: [
          {
            question: 'What is the key difference between String and &str in Rust?',
            options: [
              'String is ASCII-only, &str supports UTF-8',
              'String is heap-allocated and owned, &str is a borrowed reference',
              'String is immutable, &str is mutable',
              'String is stack-allocated, &str is heap-allocated',
            ],
            correctIndex: 1,
            explanation: 'String is an owned, heap-allocated, growable string type. &str is a borrowed string slice -- an immutable reference to UTF-8 data that can point to string literals, a portion of a String, or any UTF-8 byte sequence.',
          },
          {
            question: 'What does .len() return for a Rust String or &str?',
            options: [
              'The number of characters',
              'The number of bytes in the UTF-8 encoding',
              'The number of grapheme clusters',
              'The allocated capacity in bytes',
            ],
            correctIndex: 1,
            explanation: '.len() returns the byte count of the UTF-8 string, not the character count. For ASCII strings these are the same, but multi-byte characters (emoji, accented characters) make the byte count larger. Use .chars().count() for the character count.',
          },
          {
            question: 'Why should function parameters generally accept &str rather than &String?',
            options: [
              '&str is faster to hash than &String',
              '&str allows passing both String references and string literals via deref coercion',
              '&str has more methods available than &String',
              '&str guarantees the string is valid ASCII',
            ],
            correctIndex: 1,
            explanation: 'A &String automatically coerces to &str via deref coercion, so accepting &str is strictly more flexible -- callers can pass &String, &str, string literals, or string slices. Accepting &String would unnecessarily restrict callers to only owned Strings.',
          },
          {
            question: 'Which method should you use to iterate over characters in a Rust string?',
            options: [
              'str[i] indexing in a for loop',
              '.bytes() for character iteration',
              '.chars() for Unicode scalar values',
              '.split("") for individual characters',
            ],
            correctIndex: 2,
            explanation: '.chars() returns an iterator over Unicode scalar values (char type), which is the correct way to iterate over characters. Direct indexing like str[i] is a compile error in Rust. .bytes() gives raw UTF-8 bytes, not characters.',
          },
        ],
        challenge: {
          prompt: 'Write a function `title_case` that takes a &str and returns a String with the first letter of each word capitalized and the rest lowercase. Words are separated by whitespace. For example, "hello WORLD rust" becomes "Hello World Rust".',
          starterCode: `fn title_case(s: &str) -> String {
    // TODO: Split the string into words by whitespace
    // TODO: For each word, capitalize the first char and lowercase the rest
    // TODO: Join the words back with spaces
    todo!()
}

fn main() {
    println!("{}", title_case("hello WORLD rust"));
    println!("{}", title_case("the quick brown fox"));
    println!("{}", title_case(""));
}`,
          solutionCode: `fn title_case(s: &str) -> String {
    s.split_whitespace()
        .map(|word| {
            let mut chars = word.chars();
            match chars.next() {
                None => String::new(),
                Some(first) => {
                    let upper: String = first.to_uppercase().collect();
                    let lower: String = chars.flat_map(|c| c.to_lowercase()).collect();
                    format!("{}{}", upper, lower)
                }
            }
        })
        .collect::<Vec<_>>()
        .join(" ")
}

fn main() {
    println!("{}", title_case("hello WORLD rust"));
    println!("{}", title_case("the quick brown fox"));
    println!("{}", title_case(""));
}`,
          hints: [
            'Use .split_whitespace() to break the string into words, handling multiple spaces correctly.',
            'For each word, use .chars() and process the first character separately with .to_uppercase().',
            'Remember that .to_uppercase() and .to_lowercase() on char return iterators (some chars map to multiple chars), so collect them into Strings.',
          ],
        },
      },
      {
        id: 'hashmaps',
        title: 'HashMap<K, V>',
        difficulty: 'intermediate',
        tags: ['HashMap', 'key-value', 'hashing', 'entry-api', 'lookup'],
        cheatSheetSummary: 'HashMap::new() + insert/get/entry — O(1) average key-value lookup',
        signature: 'HashMap<K, V>',
        crossLanguageId: 'dictionary-map',
        sections: [
          {
            heading: 'Creating and Using HashMaps',
            content:
              'HashMap<K, V> stores key-value pairs with O(1) average-case lookup, insertion, and deletion. Keys must implement Eq and Hash. The entry API provides a powerful pattern for conditional insertion and updates.',
            code: `use std::collections::HashMap;

fn main() {
    // Create and insert
    let mut scores: HashMap<String, i32> = HashMap::new();
    scores.insert("Alice".to_string(), 95);
    scores.insert("Bob".to_string(), 87);
    scores.insert("Charlie".to_string(), 92);

    // Access
    let alice = scores.get("Alice");
    println!("Alice: {:?}", alice);

    // get returns Option<&V>, use .copied() for Option<V>
    let bob_score = scores.get("Bob").copied().unwrap_or(0);
    println!("Bob: {}", bob_score);

    // Check existence
    println!("has Diana: {}", scores.contains_key("Diana"));

    // Iterate
    for (name, score) in &scores {
        println!("  {}: {}", name, score);
    }

    // Remove
    let removed = scores.remove("Bob");
    println!("removed Bob: {:?}", removed);

    // Create from tuples
    let map: HashMap<&str, i32> = vec![("x", 1), ("y", 2)].into_iter().collect();
    println!("{:?}", map);
}`,
            output: `Alice: Some(95)
Bob: 87
has Diana: false
  Alice: 95
  Bob: 87
  Charlie: 92
removed Bob: Some(87)
{"x": 1, "y": 2}`,
            diagram: {
              kind: 'custom',
              type: 'hash-map',
              data: {
                pairs: [
                  { key: '"Alice"', value: '95', hash: 'h(Alice) -> bucket 3' },
                  { key: '"Bob"', value: '87', hash: 'h(Bob) -> bucket 7' },
                  { key: '"Charlie"', value: '92', hash: 'h(Charlie) -> bucket 1' },
                ],
                bucketCount: 8,
                caption: 'Keys are hashed to determine bucket placement. Lookup: hash the key, jump to the bucket, compare for equality.',
              },
              caption: 'HashMap hashes keys to find their storage bucket. O(1) average case because you jump directly to the right bucket instead of searching.',
            },
          },
          {
            heading: 'The Entry API',
            content:
              'The entry API is one of HashMap\'s most powerful features. It provides a way to look up a key and conditionally insert or modify the value in a single operation, avoiding double lookups.',
            code: `use std::collections::HashMap;

fn main() {
    let mut scores: HashMap<&str, i32> = HashMap::new();

    // or_insert: insert if key missing
    scores.entry("Alice").or_insert(95);
    scores.entry("Alice").or_insert(100);  // no effect, already exists
    println!("Alice: {}", scores["Alice"]); // 95

    // or_insert_with: lazy default
    scores.entry("Bob").or_insert_with(|| {
        println!("  computing Bob's default score...");
        0
    });

    // or_default: insert Default::default()
    scores.entry("Charlie").or_default(); // inserts 0

    // Frequency counting (THE idiomatic pattern)
    let text = "hello world hello rust hello";
    let mut freq: HashMap<&str, i32> = HashMap::new();
    for word in text.split_whitespace() {
        *freq.entry(word).or_insert(0) += 1;
    }
    println!("frequencies: {:?}", freq);

    // and_modify: update existing or insert new
    let mut counts: HashMap<&str, i32> = HashMap::new();
    for word in text.split_whitespace() {
        counts.entry(word)
            .and_modify(|count| *count += 1)
            .or_insert(1);
    }
    println!("counts: {:?}", counts);
}`,
            output: `Alice: 95
  computing Bob's default score...
frequencies: {"hello": 3, "world": 1, "rust": 1}
counts: {"hello": 3, "world": 1, "rust": 1}`,
            tip: 'The pattern *map.entry(key).or_insert(0) += 1 is the idiomatic way to count frequencies. It performs one hash lookup instead of two (contains_key + insert).',
            analogy: 'Think of it like a hotel front desk: the entry API checks if a guest (key) already has a room. If not, it assigns one on the spot. This single trip to the desk is faster than first asking "do they have a room?" and then separately booking one.',
            codeHighlightLines: [16, 17, 25, 26, 27],
          },
          {
            heading: 'HashMap Patterns',
            content:
              'Common HashMap patterns include grouping, inversion, merging, and using custom types as keys. Understanding these patterns makes HashMap one of the most versatile tools in your Rust toolkit.',
            code: `use std::collections::HashMap;

fn main() {
    // Grouping
    let words = vec!["apple", "banana", "avocado", "blueberry", "cherry", "apricot"];
    let mut by_letter: HashMap<char, Vec<&str>> = HashMap::new();
    for word in &words {
        let first = word.chars().next().unwrap();
        by_letter.entry(first).or_default().push(word);
    }
    println!("by letter: {:?}", by_letter);

    // Inversion (swap keys and values)
    let original: HashMap<&str, i32> = vec![("a", 1), ("b", 2), ("c", 3)]
        .into_iter()
        .collect();
    let inverted: HashMap<i32, &str> = original
        .iter()
        .map(|(&k, &v)| (v, k))
        .collect();
    println!("inverted: {:?}", inverted);

    // Merging two maps
    let mut base: HashMap<&str, i32> = vec![("a", 1), ("b", 2)].into_iter().collect();
    let overrides: HashMap<&str, i32> = vec![("b", 20), ("c", 30)].into_iter().collect();
    base.extend(overrides);
    println!("merged: {:?}", base);

    // Counting with custom key
    let data = vec![(1, "a"), (2, "b"), (1, "c"), (2, "d"), (3, "e")];
    let mut groups: HashMap<i32, Vec<&str>> = HashMap::new();
    for (key, val) in &data {
        groups.entry(*key).or_default().push(val);
    }
    println!("groups: {:?}", groups);
}`,
            output: `by letter: {'a': ["apple", "avocado", "apricot"], 'b': ["banana", "blueberry"], 'c': ["cherry"]}
inverted: {1: "a", 2: "b", 3: "c"}
merged: {"a": 1, "b": 20, "c": 30}
groups: {1: ["a", "c"], 2: ["b", "d"], 3: ["e"]}`,
          },
        ],
        quiz: [
          {
            question: 'What does HashMap::get() return?',
            options: [
              'The value directly, or panics if the key is not found',
              'Option<V> -- a copy of the value',
              'Option<&V> -- a reference to the value',
              'Result<V, KeyError>',
            ],
            correctIndex: 2,
            explanation: '.get() returns Option<&V>, an optional reference to the value. It returns Some(&value) if the key exists, or None if it does not. Use .copied() or .cloned() to convert to Option<V> when needed.',
          },
          {
            question: 'What is the idiomatic Rust pattern for counting word frequencies with HashMap?',
            options: [
              'if map.contains_key(&word) { map[word] += 1 } else { map.insert(word, 1) }',
              '*map.entry(word).or_insert(0) += 1',
              'map.insert(word, map.get(&word).unwrap_or(&0) + 1)',
              'map.update(word, |v| v + 1, 0)',
            ],
            correctIndex: 1,
            explanation: 'The entry API pattern *map.entry(word).or_insert(0) += 1 is the idiomatic way. It performs a single hash lookup: .entry() finds or creates the slot, .or_insert(0) sets the default, and += 1 increments. The other approaches require double lookups or are not valid Rust.',
          },
          {
            question: 'What trait(s) must a type implement to be used as a HashMap key?',
            options: [
              'Display and Debug',
              'Eq and Hash',
              'Ord and PartialOrd',
              'Clone and Copy',
            ],
            correctIndex: 1,
            explanation: 'HashMap keys must implement Eq (for equality comparison after hash collision) and Hash (for computing the hash value that determines bucket placement). Most standard types implement both. Floating-point types like f64 do NOT implement Eq or Hash.',
          },
        ],
        challenge: {
          prompt: 'Write a function `group_anagrams` that takes a vector of strings and groups them by anagram. Two words are anagrams if they contain the same characters in any order. Return a Vec<Vec<String>> of the groups. Hint: sort the characters of each word to create a canonical key.',
          starterCode: `use std::collections::HashMap;

fn group_anagrams(words: Vec<&str>) -> Vec<Vec<String>> {
    // TODO: Create a HashMap where the key is the sorted characters of each word
    // TODO: Group words by their sorted key
    // TODO: Return the groups as a Vec<Vec<String>>
    todo!()
}

fn main() {
    let words = vec!["eat", "tea", "tan", "ate", "nat", "bat"];
    let groups = group_anagrams(words);
    for group in &groups {
        println!("{:?}", group);
    }
}`,
          solutionCode: `use std::collections::HashMap;

fn group_anagrams(words: Vec<&str>) -> Vec<Vec<String>> {
    let mut map: HashMap<String, Vec<String>> = HashMap::new();

    for word in words {
        let mut chars: Vec<char> = word.chars().collect();
        chars.sort();
        let key: String = chars.into_iter().collect();
        map.entry(key).or_default().push(word.to_string());
    }

    map.into_values().collect()
}

fn main() {
    let words = vec!["eat", "tea", "tan", "ate", "nat", "bat"];
    let groups = group_anagrams(words);
    for group in &groups {
        println!("{:?}", group);
    }
}`,
          hints: [
            'Sort the characters of each word to create a canonical key: "eat" and "tea" both become "aet".',
            'Use HashMap<String, Vec<String>> where the key is the sorted chars and the value is a list of original words.',
            'Use .entry(key).or_default().push(word) to build the groups, then .into_values().collect() to get the result.',
          ],
        },
      },
      {
        id: 'hashsets',
        title: 'HashSet<T>',
        difficulty: 'intermediate',
        tags: ['HashSet', 'set', 'unique', 'union', 'intersection', 'difference'],
        cheatSheetSummary: 'HashSet::new() + insert/contains — unique elements with set operations',
        signature: 'HashSet<T>',
        sections: [
          {
            heading: 'HashSet Operations',
            content:
              'HashSet<T> stores unique values with O(1) average insert, remove, and lookup. It supports mathematical set operations: union, intersection, difference, and symmetric difference. Elements must implement Eq and Hash.',
            code: `use std::collections::HashSet;

fn main() {
    let mut fruits: HashSet<&str> = HashSet::new();
    fruits.insert("apple");
    fruits.insert("banana");
    fruits.insert("cherry");
    fruits.insert("apple");  // duplicate ignored

    println!("fruits: {:?}", fruits);
    println!("contains apple: {}", fruits.contains("apple"));
    println!("len: {}", fruits.len());

    // Remove
    fruits.remove("banana");
    println!("after remove: {:?}", fruits);

    // Set operations
    let a: HashSet<i32> = vec![1, 2, 3, 4, 5].into_iter().collect();
    let b: HashSet<i32> = vec![3, 4, 5, 6, 7].into_iter().collect();

    let union: HashSet<_> = a.union(&b).collect();
    let intersection: HashSet<_> = a.intersection(&b).collect();
    let difference: HashSet<_> = a.difference(&b).collect();
    let sym_diff: HashSet<_> = a.symmetric_difference(&b).collect();

    println!("A: {:?}", a);
    println!("B: {:?}", b);
    println!("union: {:?}", union);
    println!("intersection: {:?}", intersection);
    println!("A - B: {:?}", difference);
    println!("symmetric diff: {:?}", sym_diff);

    // Subset/superset
    let subset: HashSet<i32> = vec![3, 4].into_iter().collect();
    println!("{{3,4}} subset of A: {}", subset.is_subset(&a));
}`,
            output: `fruits: {"apple", "cherry", "banana"}
contains apple: true
len: 3
after remove: {"apple", "cherry"}
A: {1, 2, 3, 4, 5}
B: {3, 4, 5, 6, 7}
union: {1, 2, 3, 4, 5, 6, 7}
intersection: {3, 4, 5}
A - B: {1, 2}
symmetric diff: {1, 2, 6, 7}
{3,4} subset of A: true`,
            tip: 'Use HashSet for deduplication: let unique: HashSet<_> = vec.into_iter().collect(); To get a deduplicated Vec, collect back: let deduped: Vec<_> = unique.into_iter().collect();',
            diagram: {
              kind: 'mermaid',
              code: 'flowchart TD\n    subgraph "A = {1, 2, 3, 4, 5}"\n        A1["1"] \n        A2["2"]\n        A3["3"]\n        A4["4"]\n        A5["5"]\n    end\n    subgraph "B = {3, 4, 5, 6, 7}"\n        B3["3"]\n        B4["4"]\n        B5["5"]\n        B6["6"]\n        B7["7"]\n    end\n    subgraph "Set Operations"\n        OP1["intersection: {3, 4, 5}"]\n        OP2["A - B: {1, 2}"]\n        OP3["B - A: {6, 7}"]\n        OP4["union: {1,2,3,4,5,6,7}"]\n    end\n    A3 --> OP1\n    A4 --> OP1\n    A5 --> OP1\n    A1 --> OP2\n    A2 --> OP2\n    B6 --> OP3\n    B7 --> OP3\n    style OP1 fill:#10b981,color:#fff\n    style OP2 fill:#6366f1,color:#fff\n    style OP3 fill:#f59e0b,color:#fff\n    style OP4 fill:#94a3b8,color:#fff',
              caption: 'Set operations visualized: intersection finds common elements, difference finds elements in one set but not the other, union combines all elements.',
            },
          },
          {
            heading: 'Practical HashSet Patterns',
            content:
              'HashSets are ideal for membership testing, deduplication, finding unique elements, and implementing algorithms that need O(1) lookup.',
            code: `use std::collections::HashSet;

fn main() {
    // Deduplication
    let data = vec![1, 3, 2, 1, 4, 3, 5, 2, 1];
    let unique: HashSet<_> = data.iter().collect();
    println!("unique: {:?}", unique);

    // Order-preserving dedup
    let mut seen = HashSet::new();
    let deduped: Vec<_> = data.iter()
        .filter(|&&x| seen.insert(x))
        .copied()
        .collect();
    println!("deduped (ordered): {:?}", deduped);

    // Two-sum problem using HashSet
    let nums = vec![2, 7, 11, 15];
    let target = 9;
    let mut seen_set = HashSet::new();
    for &n in &nums {
        let complement = target - n;
        if seen_set.contains(&complement) {
            println!("Found pair: {} + {} = {}", complement, n, target);
            break;
        }
        seen_set.insert(n);
    }

    // Find common elements between collections
    let list_a = vec!["rust", "python", "go", "java"];
    let list_b = vec!["python", "java", "c++", "rust"];
    let set_a: HashSet<_> = list_a.iter().collect();
    let set_b: HashSet<_> = list_b.iter().collect();
    let common: Vec<_> = set_a.intersection(&set_b).collect();
    println!("common languages: {:?}", common);
}`,
            output: `unique: {1, 2, 3, 4, 5}
deduped (ordered): [1, 3, 2, 4, 5]
Found pair: 2 + 7 = 9
common languages: ["rust", "python", "java"]`,
          },
        ],
        quiz: [
          {
            question: 'What happens when you insert a duplicate value into a HashSet?',
            options: [
              'It panics at runtime',
              'It replaces the existing value',
              'The duplicate is silently ignored',
              'It returns an error',
            ],
            correctIndex: 2,
            explanation: 'HashSet::insert() silently ignores duplicates. It returns true if the value was newly inserted and false if it was already present. The existing value is not modified.',
          },
          {
            question: 'What does the symmetric_difference of sets A and B contain?',
            options: [
              'All elements in both A and B',
              'Elements in A but not in B',
              'Elements in A or B but not in both',
              'Elements that appear in both A and B',
            ],
            correctIndex: 2,
            explanation: 'Symmetric difference returns elements that are in either A or B, but not in both. It is equivalent to (A union B) minus (A intersection B), or equivalently (A - B) union (B - A).',
          },
          {
            question: 'How can you perform order-preserving deduplication using a HashSet?',
            options: [
              'Collect into a HashSet and then back into a Vec',
              'Use .filter() with HashSet::insert(), which returns false for duplicates',
              'Sort the Vec first, then use .dedup()',
              'Use BTreeSet instead of HashSet',
            ],
            correctIndex: 1,
            explanation: 'The pattern uses .filter(|x| seen.insert(x)) where `seen` is a HashSet. Since .insert() returns true for newly added elements and false for duplicates, this filter keeps only the first occurrence of each element, preserving original order.',
          },
        ],
        challenge: {
          prompt: 'Write a function `find_missing` that takes two slices of i32: `complete` (containing all expected values) and `partial` (which may be missing some). Return a sorted Vec<i32> of values present in `complete` but missing from `partial`. Use HashSet for efficient lookup.',
          starterCode: `use std::collections::HashSet;

fn find_missing(complete: &[i32], partial: &[i32]) -> Vec<i32> {
    // TODO: Create a HashSet from the partial slice
    // TODO: Find elements in complete that are not in the partial set
    // TODO: Return them sorted
    todo!()
}

fn main() {
    let complete = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let partial = vec![2, 4, 6, 8, 10];
    let missing = find_missing(&complete, &partial);
    println!("Missing: {:?}", missing);
    // Expected: [1, 3, 5, 7, 9]
}`,
          solutionCode: `use std::collections::HashSet;

fn find_missing(complete: &[i32], partial: &[i32]) -> Vec<i32> {
    let partial_set: HashSet<&i32> = partial.iter().collect();
    let mut missing: Vec<i32> = complete
        .iter()
        .filter(|x| !partial_set.contains(x))
        .copied()
        .collect();
    missing.sort();
    missing
}

fn main() {
    let complete = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let partial = vec![2, 4, 6, 8, 10];
    let missing = find_missing(&complete, &partial);
    println!("Missing: {:?}", missing);
    // Expected: [1, 3, 5, 7, 9]
}`,
          hints: [
            'Build a HashSet from the partial slice using .iter().collect() for O(1) lookup.',
            'Filter elements from complete that are not in the partial_set using .filter(|x| !partial_set.contains(x)).',
            'Sort the result before returning since the difference operation does not guarantee order.',
          ],
        },
      },
      {
        id: 'btreemap',
        title: 'BTreeMap<K, V>',
        difficulty: 'intermediate',
        tags: ['BTreeMap', 'sorted-map', 'range-queries', 'ordered', 'B-tree'],
        cheatSheetSummary: 'BTreeMap: sorted keys, O(log n) ops, supports range queries',
        signature: 'BTreeMap<K, V>',
        sections: [
          {
            heading: 'Sorted Key-Value Store',
            content:
              'BTreeMap<K, V> keeps keys in sorted order, providing O(log n) operations. Unlike HashMap, it supports range queries and ordered iteration. Keys must implement Ord. Use BTreeMap when you need sorted output or range-based access.',
            code: `use std::collections::BTreeMap;

fn main() {
    let mut map = BTreeMap::new();
    map.insert(3, "three");
    map.insert(1, "one");
    map.insert(5, "five");
    map.insert(2, "two");
    map.insert(4, "four");

    // Iteration is always in sorted key order
    for (k, v) in &map {
        println!("{}: {}", k, v);
    }

    // Range queries
    println!("\\nRange [2, 4]:");
    for (k, v) in map.range(2..=4) {
        println!("  {}: {}", k, v);
    }

    // First and last
    println!("first: {:?}", map.iter().next());
    println!("last: {:?}", map.iter().next_back());

    // All HashMap methods work too
    println!("get 3: {:?}", map.get(&3));
    println!("contains 6: {}", map.contains_key(&6));

    map.remove(&3);
    println!("after removing 3: {:?}", map.keys().collect::<Vec<_>>());
}`,
            output: `1: one
2: two
3: three
4: four
5: five

Range [2, 4]:
  2: two
  3: three
  4: four
first: Some((1, "one"))
last: Some((5, "five"))
get 3: Some("three")
contains 6: false
after removing 3: [1, 2, 4, 5]`,
            note: 'BTreeMap uses a B-tree internally, which has better cache performance than a binary search tree for large datasets. It is also deterministic — iteration order does not depend on hash values.',
            analogy: 'Think of it like a filing cabinet with alphabetically labeled folders: you can quickly find any folder, flip through a range of consecutive folders, and everything is always in order. A HashMap is more like a pile of labeled boxes in a warehouse -- faster to find one specific box, but no inherent order.',
            codeHighlightLines: [8, 9, 14, 15],
          },
          {
            heading: 'BTreeMap vs HashMap',
            content:
              'Choose BTreeMap when you need sorted iteration, range queries, or deterministic ordering. Choose HashMap when you only need fast key-value access and do not care about order.',
            code: `use std::collections::{BTreeMap, HashMap};

fn main() {
    // Frequency count then display in sorted order
    let text = "the quick brown fox jumps over the lazy dog the fox";
    let mut freq = BTreeMap::new();
    for word in text.split_whitespace() {
        *freq.entry(word).or_insert(0) += 1;
    }

    println!("Word frequencies (alphabetical):");
    for (word, count) in &freq {
        println!("  {}: {}", word, count);
    }

    // Histogram: sorted by value then key
    let mut entries: Vec<_> = freq.iter().collect();
    entries.sort_by(|a, b| b.1.cmp(a.1).then(a.0.cmp(b.0)));
    println!("\\nTop words:");
    for (word, count) in entries.iter().take(3) {
        println!("  {} ({}x)", word, count);
    }

    // Use BTreeMap for ordered IDs
    let mut events = BTreeMap::new();
    events.insert(1000, "start");
    events.insert(1500, "process");
    events.insert(2000, "finish");
    events.insert(1200, "validate");

    println!("\\nEvents in order:");
    for (ts, event) in &events {
        println!("  t={}: {}", ts, event);
    }

    // Range: events between 1000 and 1500
    println!("\\nEvents [1000, 1500]:");
    for (ts, event) in events.range(1000..=1500) {
        println!("  t={}: {}", ts, event);
    }
}`,
            output: `Word frequencies (alphabetical):
  brown: 1
  dog: 1
  fox: 2
  jumps: 1
  lazy: 1
  over: 1
  quick: 1
  the: 3

Top words:
  the (3x)
  fox (2x)
  brown (1x)

Events in order:
  t=1000: start
  t=1200: validate
  t=1500: process
  t=2000: finish

Events [1000, 1500]:
  t=1000: start
  t=1200: validate
  t=1500: process`,
            tip: 'BTreeMap is also useful in tests where you want deterministic output ordering, since HashMap iteration order varies between runs.',
          },
        ],
        quiz: [
          {
            question: 'What is the key advantage of BTreeMap over HashMap?',
            options: [
              'BTreeMap has O(1) lookup instead of O(log n)',
              'BTreeMap keeps keys in sorted order and supports range queries',
              'BTreeMap does not require keys to implement any traits',
              'BTreeMap uses less memory than HashMap',
            ],
            correctIndex: 1,
            explanation: 'BTreeMap maintains keys in sorted order, enabling ordered iteration and range queries like map.range(2..=5). HashMap has O(1) average lookup (faster than BTreeMap O(log n)), but provides no ordering guarantees.',
          },
          {
            question: 'What trait must keys implement to be used in a BTreeMap?',
            options: [
              'Hash and Eq',
              'Ord',
              'Display',
              'Clone and Copy',
            ],
            correctIndex: 1,
            explanation: 'BTreeMap keys must implement Ord (total ordering) because the B-tree structure requires comparing keys to maintain sorted order. HashMap, by contrast, requires Hash and Eq. This means types like f64 (which has NaN) cannot be BTreeMap keys.',
          },
          {
            question: 'When should you choose BTreeMap over HashMap?',
            options: [
              'When you need the fastest possible key lookup',
              'When keys are floating-point numbers',
              'When you need sorted iteration or range-based queries',
              'When you have very few key-value pairs',
            ],
            correctIndex: 2,
            explanation: 'BTreeMap is the right choice when you need sorted iteration, range queries (map.range(start..end)), or deterministic ordering. For pure speed of individual lookups without ordering needs, HashMap is typically faster.',
          },
          {
            question: 'What does map.range(2..=5) return on a BTreeMap?',
            options: [
              'A Vec of values with keys between 2 and 5',
              'An iterator over (key, value) pairs where 2 <= key <= 5',
              'A new BTreeMap containing only keys 2 through 5',
              'The count of entries with keys between 2 and 5',
            ],
            correctIndex: 1,
            explanation: '.range(2..=5) returns an iterator over (&key, &value) pairs for all entries whose keys fall within the inclusive range [2, 5]. The ..= syntax indicates an inclusive upper bound.',
          },
        ],
        challenge: {
          prompt: 'Write a function `top_n_words` that takes a text string and a number n, and returns a Vec of the top n most frequent words in alphabetical order for ties. Use BTreeMap for alphabetical ordering. Return tuples of (word, count).',
          starterCode: `use std::collections::BTreeMap;

fn top_n_words(text: &str, n: usize) -> Vec<(String, usize)> {
    // TODO: Count word frequencies using BTreeMap
    // TODO: Collect into a Vec and sort by count (descending), then alphabetically for ties
    // TODO: Return the top n entries
    todo!()
}

fn main() {
    let text = "the cat sat on the mat the cat on the hat";
    let top = top_n_words(text, 3);
    for (word, count) in &top {
        println!("{}: {}", word, count);
    }
    // Expected: the: 4, cat: 2, on: 2
}`,
          solutionCode: `use std::collections::BTreeMap;

fn top_n_words(text: &str, n: usize) -> Vec<(String, usize)> {
    let mut freq = BTreeMap::new();
    for word in text.split_whitespace() {
        *freq.entry(word.to_lowercase()).or_insert(0usize) += 1;
    }

    let mut entries: Vec<(String, usize)> = freq
        .into_iter()
        .map(|(k, v)| (k, v))
        .collect();

    // Sort by count descending, then alphabetically for ties
    entries.sort_by(|a, b| b.1.cmp(&a.1).then(a.0.cmp(&b.0)));
    entries.truncate(n);
    entries
}

fn main() {
    let text = "the cat sat on the mat the cat on the hat";
    let top = top_n_words(text, 3);
    for (word, count) in &top {
        println!("{}: {}", word, count);
    }
    // Expected: the: 4, cat: 2, on: 2
}`,
          hints: [
            'Use BTreeMap to count frequencies with *freq.entry(word).or_insert(0) += 1.',
            'Collect into a Vec<(String, usize)> and sort with .sort_by() using count descending, then word ascending for ties.',
            'Use .truncate(n) to keep only the top n entries after sorting.',
          ],
        },
      },
    ],
  },
];

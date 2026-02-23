import type { DocCategory } from './types';

// Part 3: Structs & Interfaces + Error Handling
export const GO_PART3_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Structs & Interfaces                                        */
  /* ------------------------------------------------------------ */
  {
    id: 'structs-interfaces',
    label: 'Structs & Interfaces',
    icon: 'Layers',
    entries: [
      {
        id: 'structs',
        title: 'Structs',
        difficulty: 'beginner',
        tags: ['struct', 'composite', 'fields', 'constructor'],
        cheatSheetSummary:
          'Structs group related fields: `type User struct { Name string; Age int }`. Value type. Use `&User{}` for pointer. No constructors -- use factory functions.',
        crossLanguageId: 'structs',
        sections: [
          {
            heading: 'Defining and Creating Structs',
            content:
              'Structs are Go\'s way of grouping related data. They replace classes found in other languages. Fields are accessed with dot notation. Structs are value types -- assigning or passing a struct copies all fields. Use pointers to avoid copies and enable mutation.',
            code: `package main

import "fmt"

type User struct {
    Name  string
    Email string
    Age   int
}

func main() {
    // Named field initialization (preferred)
    u1 := User{Name: "Alice", Email: "alice@example.com", Age: 30}
    fmt.Println(u1)

    // Positional (fragile, avoid for exported types)
    u2 := User{"Bob", "bob@example.com", 25}
    fmt.Println(u2)

    // Pointer to struct
    u3 := &User{Name: "Charlie", Age: 28}
    u3.Age = 29 // auto-dereference: same as (*u3).Age
    fmt.Println(u3)

    // Zero value struct
    var u4 User
    fmt.Printf("Zero: Name=%q Age=%d\\n", u4.Name, u4.Age)

    // new() returns a pointer to zero-valued struct
    u5 := new(User)
    u5.Name = "Diana"
    fmt.Println(u5)
}`,
            output: `{Alice alice@example.com 30}
{Bob bob@example.com 25}
&{Charlie  29}
Zero: Name="" Age=0
&{Diana  0}`,
            tip: 'Always use named fields in struct literals. Positional initialization breaks when fields are added or reordered.',
            analogy: 'Think of it like a form you fill out: each field (Name, Email, Age) has a labeled blank you fill in. A struct is the blank form template, and each instance is a completed copy.',
            codeHighlightLines: [5, 6, 7, 8, 13],
          },
          {
            heading: 'Constructor Functions',
            content:
              'Go has no constructors. Instead, use factory functions (conventionally named `New` or `NewTypeName`) that return initialized structs. This gives you control over validation, default values, and whether to return a value or pointer.',
            code: `package main

import (
    "fmt"
    "errors"
)

type Server struct {
    Host string
    Port int
    TLS  bool
}

// Constructor with defaults
func NewServer(host string, port int) *Server {
    return &Server{
        Host: host,
        Port: port,
        TLS:  true, // default
    }
}

// Constructor with validation
func NewServerValidated(host string, port int) (*Server, error) {
    if host == "" {
        return nil, errors.New("host cannot be empty")
    }
    if port < 1 || port > 65535 {
        return nil, fmt.Errorf("invalid port: %d", port)
    }
    return &Server{Host: host, Port: port, TLS: true}, nil
}

func main() {
    s := NewServer("localhost", 8080)
    fmt.Printf("Server: %s:%d (TLS: %t)\\n", s.Host, s.Port, s.TLS)

    _, err := NewServerValidated("", 8080)
    if err != nil {
        fmt.Println("Error:", err)
    }

    s2, _ := NewServerValidated("example.com", 443)
    fmt.Printf("Server: %s:%d\\n", s2.Host, s2.Port)
}`,
            output: `Server: localhost:8080 (TLS: true)
Error: host cannot be empty
Server: example.com:443`,
            note: 'Return `*T` (pointer) from constructors when the struct is large or has methods with pointer receivers. Return `T` (value) for small, immutable structs.',
            analogy: 'Think of it like ordering from a restaurant: Go has no built-in chef (constructor), so you write your own recipe function (NewServer) that validates ingredients and assembles the dish exactly how you want.',
            codeHighlightLines: [15, 16, 17, 18, 19, 20],
          },
          {
            heading: 'Struct Tags and Anonymous Structs',
            content:
              'Struct tags are string annotations on fields used by packages like `encoding/json` and `encoding/xml` for serialization. Anonymous structs are declared inline without a name -- useful for one-off data structures, tests, and JSON responses.',
            code: 'package main\n\nimport (\n    "encoding/json"\n    "fmt"\n)\n\ntype Article struct {\n    Title   string `json:"title"`\n    Author  string `json:"author"`\n    Views   int    `json:"views,omitempty"`\n    Draft   bool   `json:"-"` // excluded from JSON\n}\n\nfunc main() {\n    a := Article{Title: "Go Structs", Author: "Alice", Draft: true}\n    data, _ := json.MarshalIndent(a, "", "  ")\n    fmt.Println(string(data))\n\n    // Unmarshal back\n    var a2 Article\n    json.Unmarshal(data, &a2)\n    fmt.Printf("Parsed: %+v\\n", a2)\n\n    // Anonymous struct\n    point := struct {\n        X, Y float64\n    }{3.0, 4.0}\n    fmt.Printf("Point: (%.1f, %.1f)\\n", point.X, point.Y)\n\n    // Anonymous struct for JSON response\n    resp := struct {\n        Status string `json:"status"`\n        Count  int    `json:"count"`\n    }{Status: "ok", Count: 42}\n    out, _ := json.Marshal(resp)\n    fmt.Println(string(out))\n}',
            output: `{
  "title": "Go Structs",
  "author": "Alice"
}
Parsed: {Title:Go Structs Author:Alice Views:0 Draft:false}
Point: (3.0, 4.0)
{"status":"ok","count":42}`,
            tip: 'Use `omitempty` in JSON tags to skip zero-value fields. Use `"-"` to exclude fields entirely from serialization.',
            codeHighlightLines: [9, 10, 11, 12],
          },
        ],
        quiz: [
          {
            question: 'What is the zero value of a string field in a Go struct?',
            options: [
              'null',
              'undefined',
              'An empty string ""',
              'It causes a compile error',
            ],
            correctIndex: 2,
            explanation:
              'In Go, the zero value for a string is the empty string "". All fields in a struct are initialized to their zero values when no explicit value is provided.',
          },
          {
            question: 'What does `new(User)` return in Go?',
            options: [
              'A User value with all fields set to zero values',
              'A pointer to a User with all fields set to zero values',
              'nil',
              'A User value with fields set to default values from a constructor',
            ],
            correctIndex: 1,
            explanation:
              '`new(T)` allocates memory for a zero-valued T and returns a pointer to it (*T). Go has no constructors, so all fields get their zero values.',
          },
          {
            question: 'Why is positional initialization of struct fields discouraged for exported types?',
            options: [
              'It is slower at runtime',
              'It does not compile for exported types',
              'It breaks when fields are added or reordered',
              'It uses more memory',
            ],
            correctIndex: 2,
            explanation:
              'Positional initialization depends on field order. If someone adds or reorders a field in the struct definition, all positional initializations break or silently produce wrong values.',
          },
          {
            question: 'What does the `json:"-"` struct tag do?',
            options: [
              'Renames the field to "-" in JSON output',
              'Makes the field required in JSON',
              'Excludes the field entirely from JSON serialization',
              'Sets the field to its zero value during deserialization',
            ],
            correctIndex: 2,
            explanation:
              'The `json:"-"` tag tells the encoding/json package to skip this field entirely during both marshaling and unmarshaling.',
          },
        ],
        challenge: {
          prompt:
            'Create a `Book` struct with fields Title (string), Author (string), Pages (int), and Price (float64). Write a factory function `NewBook` that validates the title is non-empty and pages > 0, returning an error if invalid. Add a JSON tag to exclude Price from JSON output.',
          starterCode: `package main

import (
    "encoding/json"
    "fmt"
)

// Define the Book struct with appropriate JSON tags
// Price should be excluded from JSON output

// NewBook creates a validated Book, returning an error if invalid

func main() {
    b, err := NewBook("Go Programming", "Alice", 350, 29.99)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    data, _ := json.MarshalIndent(b, "", "  ")
    fmt.Println(string(data))

    _, err = NewBook("", "Bob", 100, 19.99)
    if err != nil {
        fmt.Println("Error:", err)
    }
}`,
          solutionCode: `package main

import (
    "encoding/json"
    "errors"
    "fmt"
)

type Book struct {
    Title  string  \`json:"title"\`
    Author string  \`json:"author"\`
    Pages  int     \`json:"pages"\`
    Price  float64 \`json:"-"\`
}

func NewBook(title, author string, pages int, price float64) (*Book, error) {
    if title == "" {
        return nil, errors.New("title cannot be empty")
    }
    if pages <= 0 {
        return nil, fmt.Errorf("invalid page count: %d", pages)
    }
    return &Book{
        Title:  title,
        Author: author,
        Pages:  pages,
        Price:  price,
    }, nil
}

func main() {
    b, err := NewBook("Go Programming", "Alice", 350, 29.99)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    data, _ := json.MarshalIndent(b, "", "  ")
    fmt.Println(string(data))

    _, err = NewBook("", "Bob", 100, 19.99)
    if err != nil {
        fmt.Println("Error:", err)
    }
}`,
          hints: [
            'Use struct tags like `json:"fieldname"` for JSON naming and `json:"-"` to exclude a field.',
            'The factory function should return (*Book, error) and use errors.New() or fmt.Errorf() for validation errors.',
            'Remember to check each validation condition with a guard clause (early return on error).',
          ],
        },
      },
      {
        id: 'struct-embedding',
        title: 'Struct Embedding',
        difficulty: 'intermediate',
        tags: ['embedding', 'composition', 'promoted-fields', 'inheritance-alternative'],
        cheatSheetSummary:
          'Embed structs for composition: `type Employee struct { Person; Salary float64 }`. Promoted fields accessed directly.',
        crossLanguageId: 'struct-embedding',
        sections: [
          {
            heading: 'Embedding for Composition',
            content:
              'Go uses composition instead of inheritance. When you embed a struct, all its fields and methods are promoted -- you can access them directly on the outer struct. This achieves code reuse without class hierarchies.',
            code: `package main

import "fmt"

type Address struct {
    Street string
    City   string
    State  string
}

func (a Address) FullAddress() string {
    return fmt.Sprintf("%s, %s, %s", a.Street, a.City, a.State)
}

type Employee struct {
    Name    string
    Address // embedded (no field name)
    Salary  float64
}

func main() {
    e := Employee{
        Name: "Alice",
        Address: Address{
            Street: "123 Main St",
            City:   "Springfield",
            State:  "IL",
        },
        Salary: 75000,
    }

    // Promoted fields -- access directly
    fmt.Println("City:", e.City)
    fmt.Println("Full:", e.FullAddress()) // promoted method

    // Explicit access also works
    fmt.Println("Explicit:", e.Address.City)
}`,
            output: `City: Springfield
Full: 123 Main St, Springfield, IL
Explicit: Springfield`,
            tip: 'Embedding is not inheritance. The embedded type has no knowledge of the outer type. Think of it as automatic delegation.',
            analogy: 'Think of it like a Russian nesting doll: the outer doll (Employee) contains the inner doll (Address), and you can reach inside to access the inner doll\'s features directly without opening it explicitly.',
            diagram: {
              kind: 'mermaid',
              code: 'classDiagram\n    class Address {\n        +string Street\n        +string City\n        +string State\n        +FullAddress() string\n    }\n    class Employee {\n        +string Name\n        +float64 Salary\n        +string Street ~~promoted~~\n        +string City ~~promoted~~\n        +string State ~~promoted~~\n        +FullAddress() string ~~promoted~~\n    }\n    Employee *-- Address : embeds\n    note for Employee "e.City is shorthand for\\ne.Address.City\\nPromotion = automatic delegation"',
              caption: 'Employee embeds Address. All Address fields and methods are promoted to Employee, accessible directly without qualification.',
            },
            codeHighlightLines: [17, 33, 34],
          },
          {
            heading: 'Multiple Embedding and Shadowing',
            content:
              'You can embed multiple types. If embedded types have conflicting field or method names, you must use the explicit (qualified) access to resolve ambiguity. Outer struct fields shadow embedded fields of the same name.',
            code: `package main

import "fmt"

type Logger struct {
    Prefix string
}

func (l Logger) Log(msg string) {
    fmt.Printf("[%s] %s\\n", l.Prefix, msg)
}

type Metrics struct {
    Count int
}

func (m *Metrics) Increment() {
    m.Count++
}

type Service struct {
    Logger   // embed Logger
    Metrics  // embed Metrics
    Name string
}

func main() {
    s := Service{
        Logger:  Logger{Prefix: "SVC"},
        Name:    "OrderService",
    }

    // Promoted methods
    s.Log("Service started")
    s.Increment()
    s.Increment()
    fmt.Println("Request count:", s.Count)

    // Shadowing: outer field overrides embedded
    type Base struct {
        ID int
    }
    type Extended struct {
        Base
        ID string // shadows Base.ID
    }
    ext := Extended{Base: Base{ID: 1}, ID: "ext-001"}
    fmt.Println("Extended ID:", ext.ID)     // string
    fmt.Println("Base ID:", ext.Base.ID)     // int
}`,
            output: `[SVC] Service started
Request count: 2
Extended ID: ext-001
Base ID: 1`,
            warning: 'If two embedded types have the same method name, calling it on the outer struct causes a compile error. You must qualify the call explicitly.',
          },
          {
            heading: 'Embedding Interfaces in Structs',
            content:
              'You can embed interfaces inside structs. This is commonly used for partial implementation, testing with mocks, and wrapper patterns. The embedded interface becomes a field that must be set before calling its methods.',
            code: `package main

import "fmt"

type Notifier interface {
    Notify(message string) error
}

// Embed interface for wrapping/decorating
type LoggingNotifier struct {
    Notifier // embedded interface
    Logger   func(string)
}

func (ln LoggingNotifier) Notify(message string) error {
    ln.Logger("Sending: " + message)
    return ln.Notifier.Notify(message) // delegate
}

// Simple implementation
type EmailNotifier struct {
    To string
}

func (e EmailNotifier) Notify(message string) error {
    fmt.Printf("Email to %s: %s\\n", e.To, message)
    return nil
}

func main() {
    email := EmailNotifier{To: "alice@example.com"}

    logged := LoggingNotifier{
        Notifier: email,
        Logger:   func(msg string) { fmt.Println("[LOG]", msg) },
    }

    logged.Notify("Hello!")
}`,
            output: `[LOG] Sending: Hello!
Email to alice@example.com: Hello!`,
            tip: 'Embedding interfaces in structs is a powerful pattern for the decorator/wrapper design. It lets you override some methods while delegating others to the wrapped implementation.',
            analogy: 'Think of it like hiring an assistant who handles some calls themselves but forwards the rest to the original person. The LoggingNotifier intercepts the Notify call, adds logging, then passes it along.',
            diagram: {
              kind: 'mermaid',
              code: 'sequenceDiagram\n    participant Caller\n    participant LoggingNotifier\n    participant EmailNotifier\n    Caller->>LoggingNotifier: Notify("Hello!")\n    LoggingNotifier->>LoggingNotifier: Logger("[LOG] Sending: Hello!")\n    LoggingNotifier->>EmailNotifier: Notifier.Notify("Hello!")\n    EmailNotifier-->>LoggingNotifier: nil\n    LoggingNotifier-->>Caller: nil',
              caption: 'The decorator pattern via interface embedding: LoggingNotifier intercepts the call, adds logging, then delegates to the wrapped EmailNotifier.',
            },
            codeHighlightLines: [10, 11, 15, 16, 17],
          },
        ],
        quiz: [
          {
            question: 'What happens when you embed a struct in Go?',
            options: [
              'The outer struct inherits from the inner struct',
              'All fields and methods of the embedded struct are promoted to the outer struct',
              'The embedded struct becomes a private field',
              'The outer struct can only access embedded fields through a getter method',
            ],
            correctIndex: 1,
            explanation:
              'When you embed a struct, all its fields and methods are promoted -- meaning they can be accessed directly on the outer struct without qualification. This is composition, not inheritance.',
          },
          {
            question: 'What happens if the outer struct defines a field with the same name as an embedded struct field?',
            options: [
              'A compile error occurs',
              'The embedded field is deleted',
              'The outer field shadows the embedded field',
              'Both fields are accessible with the same name',
            ],
            correctIndex: 2,
            explanation:
              'The outer struct\'s field shadows the embedded one. You can still access the embedded field using the explicit qualified name (e.g., ext.Base.ID).',
          },
          {
            question: 'When you embed an interface inside a struct, what must you do before calling its methods?',
            options: [
              'Nothing -- methods are available automatically',
              'Set the embedded interface field to a concrete implementation',
              'Register the struct with the interface',
              'Call an Init() method first',
            ],
            correctIndex: 1,
            explanation:
              'An embedded interface in a struct is just a field. Its zero value is nil. You must assign a concrete implementation to it before calling any of its methods, otherwise you will get a nil pointer panic.',
          },
        ],
        challenge: {
          prompt:
            'Create a `Base` struct with a `Name` field and a `Describe()` method. Create a `Manager` struct that embeds `Base` and adds a `Team` field (string slice). Demonstrate that `Manager` can access `Name` directly and call `Describe()` via promotion.',
          starterCode: `package main

import "fmt"

// Define Base struct with Name string and Describe() string method

// Define Manager struct that embeds Base and adds Team []string

func main() {
    m := Manager{
        // Initialize Base and Team
    }
    // Access promoted field and method
    fmt.Println("Name:", m.Name)
    fmt.Println("Description:", m.Describe())
    fmt.Println("Team:", m.Team)
}`,
          solutionCode: `package main

import (
    "fmt"
    "strings"
)

type Base struct {
    Name string
}

func (b Base) Describe() string {
    return fmt.Sprintf("I am %s", b.Name)
}

type Manager struct {
    Base
    Team []string
}

func main() {
    m := Manager{
        Base: Base{Name: "Alice"},
        Team: []string{"Bob", "Charlie", "Diana"},
    }
    fmt.Println("Name:", m.Name)
    fmt.Println("Description:", m.Describe())
    fmt.Println("Team:", strings.Join(m.Team, ", "))
}`,
          hints: [
            'Embed Base in Manager by listing the type name without a field name: `Base` not `base Base`.',
            'Initialize the embedded struct using its type name: `Base: Base{Name: "Alice"}`.',
            'Promoted fields and methods can be called directly on the outer struct: `m.Name` and `m.Describe()`.',
          ],
        },
      },
      {
        id: 'interfaces',
        title: 'Interfaces',
        difficulty: 'intermediate',
        tags: ['interface', 'implicit', 'polymorphism', 'duck-typing'],
        cheatSheetSummary:
          'Interfaces are satisfied implicitly -- just implement the methods. Define interfaces at the consumer. Accept interfaces, return structs.',
        crossLanguageId: 'interfaces',
        sections: [
          {
            heading: 'Implicit Interface Satisfaction',
            content:
              'Interfaces in Go are satisfied implicitly -- a type implements an interface by having the right methods, with no `implements` keyword. This enables decoupling: define interfaces where they are consumed, not where implemented. Small interfaces (1-2 methods) are ideal.',
            code: `package main

import (
    "fmt"
    "math"
)

type Shape interface {
    Area() float64
    Perimeter() float64
}

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

func (c Circle) Perimeter() float64 {
    return 2 * math.Pi * c.Radius
}

type Rectangle struct {
    Width, Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
    return 2 * (r.Width + r.Height)
}

func printShape(s Shape) {
    fmt.Printf("Area: %.2f, Perimeter: %.2f\\n", s.Area(), s.Perimeter())
}

func main() {
    printShape(Circle{Radius: 5})
    printShape(Rectangle{Width: 4, Height: 6})
}`,
            output: `Area: 78.54, Perimeter: 31.42
Area: 24.00, Perimeter: 20.00`,
            tip: 'Accept interfaces, return concrete types. This is the opposite of Java/C#. Define small interfaces at the consumer side.',
            analogy: 'Think of it like a power outlet: any device with the right plug shape fits, without needing to register or declare compatibility. If your type has the right methods, it automatically fits the interface.',
            diagram: {
              kind: 'mermaid',
              code: 'classDiagram\n    class Shape {\n        <<interface>>\n        +Area() float64\n        +Perimeter() float64\n    }\n    class Circle {\n        +float64 Radius\n        +Area() float64\n        +Perimeter() float64\n    }\n    class Rectangle {\n        +float64 Width\n        +float64 Height\n        +Area() float64\n        +Perimeter() float64\n    }\n    Shape <|.. Circle : satisfies implicitly\n    Shape <|.. Rectangle : satisfies implicitly\n    note for Shape "No implements keyword needed.\\nJust have the right methods."',
              caption: 'Circle and Rectangle both satisfy the Shape interface implicitly -- no declaration required, just matching method signatures.',
            },
            codeHighlightLines: [8, 9, 10, 11, 17, 18, 29, 30],
          },
          {
            heading: 'Common Standard Library Interfaces',
            content:
              'Go\'s standard library defines many small interfaces that form the backbone of the ecosystem. The most important ones are `io.Reader`, `io.Writer`, `fmt.Stringer`, and the `error` interface. Understanding these is key to writing idiomatic Go.',
            code: `package main

import (
    "fmt"
    "strings"
    "io"
)

// fmt.Stringer interface: String() string
type Color struct {
    R, G, B uint8
}

func (c Color) String() string {
    return fmt.Sprintf("#%02X%02X%02X", c.R, c.G, c.B)
}

// io.Reader interface: Read([]byte) (int, error)
type InfiniteZeros struct{}

func (z InfiniteZeros) Read(p []byte) (int, error) {
    for i := range p {
        p[i] = 0
    }
    return len(p), nil
}

func main() {
    // Stringer: Println calls String() automatically
    red := Color{255, 0, 0}
    fmt.Println("Color:", red)

    // io.Reader: works with any reader
    r := strings.NewReader("Hello, Go!")
    buf := make([]byte, 5)
    n, _ := r.Read(buf)
    fmt.Printf("Read %d bytes: %s\\n", n, buf[:n])

    // Our custom Reader
    zeros := InfiniteZeros{}
    zbuf := make([]byte, 4)
    zeros.Read(zbuf)
    fmt.Println("Zeros:", zbuf)

    // io.Copy works with any Reader/Writer
    io.Copy(io.Discard, strings.NewReader("discarded"))
}`,
            output: `Color: #FF0000
Read 5 bytes: Hello
Zeros: [0 0 0 0]`,
            note: 'The `io.Reader` and `io.Writer` interfaces are the most composable in Go. Files, network connections, buffers, compressors, and encryptors all implement these interfaces.',
          },
          {
            heading: 'Interface Composition',
            content:
              'Interfaces can be composed by embedding other interfaces. This builds larger interfaces from smaller ones, following the same composition philosophy as struct embedding. The standard library uses this extensively.',
            code: `package main

import "fmt"

type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

type Closer interface {
    Close() error
}

// Composed interfaces
type ReadWriter interface {
    Reader
    Writer
}

type ReadWriteCloser interface {
    Reader
    Writer
    Closer
}

// Practical example: repository pattern
type UserFinder interface {
    FindByID(id string) (string, error)
}

type UserSaver interface {
    Save(name string) error
}

type UserRepository interface {
    UserFinder
    UserSaver
}

type memoryRepo struct {
    users map[string]string
}

func (m *memoryRepo) FindByID(id string) (string, error) {
    if name, ok := m.users[id]; ok {
        return name, nil
    }
    return "", fmt.Errorf("user %s not found", id)
}

func (m *memoryRepo) Save(name string) error {
    m.users[name] = name
    return nil
}

func main() {
    var repo UserRepository = &memoryRepo{
        users: map[string]string{"1": "Alice"},
    }
    name, _ := repo.FindByID("1")
    fmt.Println("Found:", name)
}`,
            output: `Found: Alice`,
            tip: 'Keep interfaces small (1-3 methods). It is easier for types to satisfy small interfaces. Compose them into larger ones as needed.',
            analogy: 'Think of it like building with LEGO bricks: Reader, Writer, and Closer are individual bricks. ReadWriteCloser snaps them together into a bigger piece, but each brick remains independently reusable.',
            codeHighlightLines: [18, 19, 20, 21, 38, 39, 40],
          },
        ],
        quiz: [
          {
            question: 'How does a Go type satisfy an interface?',
            options: [
              'By using an `implements` keyword',
              'By registering with the interface at runtime',
              'By having methods that match the interface method signatures',
              'By embedding the interface in the struct',
            ],
            correctIndex: 2,
            explanation:
              'Go interfaces are satisfied implicitly. A type satisfies an interface simply by implementing all the methods defined in the interface -- no explicit declaration is needed.',
          },
          {
            question: 'What is the idiomatic Go guideline for interfaces?',
            options: [
              'Define large interfaces with many methods for completeness',
              'Accept interfaces, return concrete types',
              'Accept concrete types, return interfaces',
              'Always embed interfaces in structs',
            ],
            correctIndex: 1,
            explanation:
              'The Go proverb is "accept interfaces, return concrete types." Define small interfaces at the consumer side. This maximizes decoupling and flexibility.',
          },
          {
            question: 'How do you compose interfaces in Go?',
            options: [
              'Using the extends keyword',
              'By embedding smaller interfaces inside a larger interface definition',
              'By implementing multiple interfaces on the same struct',
              'Using generics with type constraints',
            ],
            correctIndex: 1,
            explanation:
              'Interface composition in Go works by embedding interfaces inside other interfaces. For example, ReadWriter embeds both Reader and Writer. Types that satisfy the composed interface must implement all methods from all embedded interfaces.',
          },
          {
            question: 'Which standard library interface has the single method `String() string`?',
            options: [
              'io.Writer',
              'io.Reader',
              'fmt.Stringer',
              'error',
            ],
            correctIndex: 2,
            explanation:
              'The fmt.Stringer interface defines a single `String() string` method. Types implementing it are automatically used by fmt.Println and similar functions for formatted output.',
          },
        ],
        challenge: {
          prompt:
            'Define a `Speaker` interface with a `Speak() string` method. Create two types `Dog` and `Cat` that implement it. Write a function `greetAll` that takes a slice of Speakers and prints each one\'s speech.',
          starterCode: `package main

import "fmt"

// Define Speaker interface with Speak() string

// Define Dog struct (with Name field) that implements Speaker

// Define Cat struct (with Name field) that implements Speaker

// greetAll prints the speech of every Speaker in the slice
func greetAll(speakers []Speaker) {
    // TODO
}

func main() {
    animals := []Speaker{
        Dog{Name: "Rex"},
        Cat{Name: "Whiskers"},
        Dog{Name: "Buddy"},
    }
    greetAll(animals)
}`,
          solutionCode: `package main

import "fmt"

type Speaker interface {
    Speak() string
}

type Dog struct {
    Name string
}

func (d Dog) Speak() string {
    return d.Name + " says: Woof!"
}

type Cat struct {
    Name string
}

func (c Cat) Speak() string {
    return c.Name + " says: Meow!"
}

func greetAll(speakers []Speaker) {
    for _, s := range speakers {
        fmt.Println(s.Speak())
    }
}

func main() {
    animals := []Speaker{
        Dog{Name: "Rex"},
        Cat{Name: "Whiskers"},
        Dog{Name: "Buddy"},
    }
    greetAll(animals)
}`,
          hints: [
            'An interface in Go is defined with `type InterfaceName interface { MethodName() ReturnType }`.',
            'Both Dog and Cat just need a `Speak() string` method to satisfy Speaker -- no `implements` keyword needed.',
            'In greetAll, range over the slice and call Speak() on each element.',
          ],
        },
      },
      {
        id: 'type-assertions',
        title: 'Type Assertions',
        difficulty: 'intermediate',
        tags: ['type-assertion', 'interface', 'any', 'comma-ok'],
        cheatSheetSummary:
          'Extract concrete type from interface: `val := i.(string)`. Safe form: `val, ok := i.(string)`. Use `any` (alias for `interface{}`).',
        crossLanguageId: 'type-assertions',
        sections: [
          {
            heading: 'Type Assertion Basics',
            content:
              'A type assertion extracts the concrete value from an interface. The syntax `i.(T)` asserts that the interface value `i` holds type `T`. It panics if wrong. The comma-ok form `val, ok := i.(T)` is safe and returns a boolean.',
            code: `package main

import "fmt"

func main() {
    var i interface{} = "hello"

    // Direct assertion (panics if wrong type)
    s := i.(string)
    fmt.Println("String:", s)

    // Safe assertion with comma-ok
    s2, ok := i.(string)
    fmt.Printf("string: %q, ok: %t\\n", s2, ok)

    f, ok := i.(float64)
    fmt.Printf("float64: %f, ok: %t\\n", f, ok)

    // Using 'any' (alias for interface{})
    var val any = 42
    if n, ok := val.(int); ok {
        fmt.Println("It's an int:", n)
    }
}`,
            output: `String: hello
string: "hello", ok: true
float64: 0.000000, ok: false
It's an int: 42`,
            warning: 'A type assertion without comma-ok (`i.(string)`) panics at runtime if the type does not match. Always prefer the comma-ok form unless you are absolutely certain of the type.',
            analogy: 'Think of it like opening a mystery gift box: the direct assertion rips it open expecting a specific item (and blows up if wrong), while the comma-ok form peeks inside first and tells you whether you guessed correctly.',
            codeHighlightLines: [9, 13, 21],
          },
          {
            heading: 'Asserting Interfaces',
            content:
              'You can assert not just concrete types but also interfaces. This checks whether the value satisfies a specific interface. This is useful for optional interface detection, where you check if a value supports additional methods.',
            code: `package main

import (
    "fmt"
    "io"
    "strings"
)

type Sizer interface {
    Size() int64
}

func printInfo(r io.Reader) {
    // Check if the reader also implements Sizer
    if s, ok := r.(Sizer); ok {
        fmt.Printf("Reader with size: %d bytes\\n", s.Size())
    } else {
        fmt.Println("Reader without size info")
    }

    buf := make([]byte, 100)
    n, _ := r.Read(buf)
    fmt.Printf("Read: %s\\n", buf[:n])
}

// strings.Reader implements both io.Reader and Sizer (via Len)
type sizedReader struct {
    *strings.Reader
    size int64
}

func (s sizedReader) Size() int64 { return s.size }

func main() {
    // Regular reader (no Size method)
    r1 := strings.NewReader("hello")
    printInfo(r1)

    fmt.Println("---")

    // Reader with Size
    r2 := sizedReader{
        Reader: strings.NewReader("world"),
        size:   5,
    }
    printInfo(r2)
}`,
            output: `Reader without size info
Read: hello
---
Reader with size: 5 bytes
Read: world`,
            tip: 'Interface assertions are the Go way to implement optional features. Check for additional interfaces at runtime instead of requiring all methods upfront.',
          },
          {
            heading: 'Compile-Time Interface Checks',
            content:
              'You can verify at compile time that a type satisfies an interface by assigning a zero value to a blank interface variable. This catches mistakes early without waiting for runtime failures.',
            code: `package main

import "fmt"

type Animal interface {
    Name() string
    Sound() string
}

type Dog struct {
    breed string
}

func (d Dog) Name() string  { return "Dog (" + d.breed + ")" }
func (d Dog) Sound() string { return "Woof!" }

// Compile-time check: Dog must satisfy Animal
var _ Animal = Dog{}
var _ Animal = (*Dog)(nil)

// This would cause a COMPILE ERROR if Dog is missing a method:
// var _ Animal = Dog{}  // error: Dog does not implement Animal

func describeAnimal(a Animal) {
    fmt.Printf("%s says %s\\n", a.Name(), a.Sound())
}

func main() {
    d := Dog{breed: "Golden Retriever"}
    describeAnimal(d)
}`,
            output: `Dog (Golden Retriever) says Woof!`,
            tip: 'Add `var _ MyInterface = (*MyType)(nil)` near the type definition to catch missing methods at compile time. This is especially useful for large interfaces.',
            codeHighlightLines: [18, 19],
          },
        ],
        quiz: [
          {
            question: 'What happens if you use a type assertion `i.(string)` without the comma-ok form and the type does not match?',
            options: [
              'It returns the zero value of string',
              'It returns nil',
              'It panics at runtime',
              'It causes a compile error',
            ],
            correctIndex: 2,
            explanation:
              'A type assertion without the comma-ok form (`val := i.(T)`) panics at runtime if the interface does not hold a value of type T. Always prefer the safe `val, ok := i.(T)` form.',
          },
          {
            question: 'What is `any` in Go?',
            options: [
              'A special keyword for generic type parameters',
              'An alias for interface{}',
              'A built-in function',
              'A type that only accepts primitive values',
            ],
            correctIndex: 1,
            explanation:
              '`any` was introduced in Go 1.18 as an alias for `interface{}`. They are interchangeable. `any` is preferred in modern Go for readability.',
          },
          {
            question: 'What does `var _ Animal = (*Dog)(nil)` achieve?',
            options: [
              'Creates a nil Dog pointer at runtime',
              'Verifies at compile time that *Dog satisfies the Animal interface',
              'Registers Dog as implementing Animal',
              'Creates a global Animal variable',
            ],
            correctIndex: 1,
            explanation:
              'This is a compile-time interface check. It assigns a nil *Dog to a variable of type Animal. If *Dog does not satisfy Animal, the compiler will report an error. The blank identifier `_` discards the value.',
          },
        ],
        challenge: {
          prompt:
            'Write a function `extractString` that takes an `any` value and returns the string if it is a string, or returns "not a string" with ok=false. Use the comma-ok pattern. Also add a compile-time check that a custom `Printer` struct satisfies `fmt.Stringer`.',
          starterCode: `package main

import "fmt"

type Printer struct {
    Message string
}

// TODO: Implement String() on Printer so it satisfies fmt.Stringer

// TODO: Add compile-time interface check that Printer satisfies fmt.Stringer

// extractString safely extracts a string from an any value
func extractString(val any) (string, bool) {
    // TODO: Use comma-ok type assertion
    return "", false
}

func main() {
    fmt.Println(extractString("hello"))
    fmt.Println(extractString(42))
    fmt.Println(extractString(nil))
}`,
          solutionCode: `package main

import "fmt"

type Printer struct {
    Message string
}

func (p Printer) String() string {
    return "Printer: " + p.Message
}

// Compile-time check
var _ fmt.Stringer = Printer{}

func extractString(val any) (string, bool) {
    s, ok := val.(string)
    if ok {
        return s, true
    }
    return "not a string", false
}

func main() {
    fmt.Println(extractString("hello"))
    fmt.Println(extractString(42))
    fmt.Println(extractString(nil))
    fmt.Println(Printer{Message: "test"})
}`,
          hints: [
            'Use `s, ok := val.(string)` for the safe comma-ok type assertion.',
            'Implement `String() string` on Printer to satisfy the fmt.Stringer interface.',
            'Add `var _ fmt.Stringer = Printer{}` at package level for the compile-time check.',
          ],
        },
      },
      {
        id: 'type-switches',
        title: 'Type Switches',
        difficulty: 'intermediate',
        tags: ['type-switch', 'interface', 'polymorphism', 'pattern-matching'],
        cheatSheetSummary:
          '`switch v := i.(type) { case int: ... case string: ... }` branches on the dynamic type of an interface value.',
        crossLanguageId: 'type-switches',
        sections: [
          {
            heading: 'Type Switch Basics',
            content:
              'A type switch lets you branch based on the dynamic type stored in an interface. The syntax `v := i.(type)` is only valid inside a switch statement. Each case tests a type, and the variable `v` has that specific type within the case block.',
            code: `package main

import "fmt"

func describe(i interface{}) string {
    switch v := i.(type) {
    case int:
        return fmt.Sprintf("integer: %d (doubled: %d)", v, v*2)
    case string:
        return fmt.Sprintf("string: %q (length: %d)", v, len(v))
    case bool:
        return fmt.Sprintf("boolean: %t", v)
    case []int:
        return fmt.Sprintf("int slice: %v (length: %d)", v, len(v))
    case nil:
        return "nil value"
    default:
        return fmt.Sprintf("unknown type: %T = %v", v, v)
    }
}

func main() {
    fmt.Println(describe(42))
    fmt.Println(describe("hello"))
    fmt.Println(describe(true))
    fmt.Println(describe([]int{1, 2, 3}))
    fmt.Println(describe(nil))
    fmt.Println(describe(3.14))
}`,
            output: `integer: 42 (doubled: 84)
string: "hello" (length: 5)
boolean: true
int slice: [1 2 3] (length: 3)
nil value
unknown type: float64 = 3.14`,
            tip: 'Inside each case, the variable `v` has the matched concrete type. You can call type-specific methods without additional assertions.',
            analogy: 'Think of it like a customs officer inspecting luggage: the switch statement opens the interface box, checks the type of the item inside, and routes it to the appropriate handler lane.',
            codeHighlightLines: [6, 7, 9, 11, 13],
          },
          {
            heading: 'Multiple Types per Case',
            content:
              'A type switch case can list multiple types separated by commas. When multiple types are listed, the variable retains the interface type (not a specific concrete type) because the compiler cannot determine which type matched.',
            code: `package main

import "fmt"

func classify(i interface{}) {
    switch v := i.(type) {
    case int, int8, int16, int32, int64:
        // v is interface{} here (multiple types)
        fmt.Printf("Signed integer: %v (type: %T)\\n", v, v)
    case uint, uint8, uint16, uint32, uint64:
        fmt.Printf("Unsigned integer: %v (type: %T)\\n", v, v)
    case float32, float64:
        fmt.Printf("Float: %v (type: %T)\\n", v, v)
    case string:
        // v is string here (single type)
        fmt.Printf("String of length %d: %s\\n", len(v), v)
    case bool:
        fmt.Printf("Bool: %t\\n", v)
    default:
        fmt.Printf("Other: %T\\n", v)
    }
}

func main() {
    classify(42)
    classify(uint(10))
    classify(3.14)
    classify("hello")
    classify(true)
    classify([]int{1, 2})
}`,
            output: `Signed integer: 42 (type: int)
Unsigned integer: 10 (type: uint)
Float: 3.14 (type: float64)
String of length 5: hello
Bool: true
Other: []int`,
            note: 'When a case lists multiple types, the captured variable has type `interface{}`. For type-specific operations, use single-type cases.',
          },
          {
            heading: 'Practical Type Switch: JSON Processing',
            content:
              'Type switches are commonly used when processing dynamic data like parsed JSON, where values can be strings, numbers, booleans, arrays, or objects. The `encoding/json` package unmarshals into `interface{}` by default.',
            code: 'package main\n\nimport (\n    "encoding/json"\n    "fmt"\n)\n\nfunc processJSON(data interface{}) {\n    switch v := data.(type) {\n    case map[string]interface{}:\n        fmt.Println("Object with keys:")\n        for key, val := range v {\n            fmt.Printf("  %s: ", key)\n            processJSON(val) // recursive\n        }\n    case []interface{}:\n        fmt.Printf("Array of %d elements\\n", len(v))\n    case string:\n        fmt.Printf("string(%q)\\n", v)\n    case float64:\n        fmt.Printf("number(%.0f)\\n", v)\n    case bool:\n        fmt.Printf("bool(%t)\\n", v)\n    case nil:\n        fmt.Println("null")\n    }\n}\n\nfunc main() {\n    raw := `{"name":"Alice","age":30,"active":true,"scores":[95,87,92]}`\n\n    var data interface{}\n    json.Unmarshal([]byte(raw), &data)\n    processJSON(data)\n}',
            output: `Object with keys:
  name: string("Alice")
  age: number(30)
  active: bool(true)
  scores: Array of 3 elements`,
            tip: 'JSON numbers are always unmarshaled as `float64` when using `interface{}`. Use `json.Number` with a decoder if you need to distinguish integers from floats.',
            codeHighlightLines: [9, 10, 16, 18, 20],
          },
        ],
        quiz: [
          {
            question: 'What is the syntax for a type switch in Go?',
            options: [
              'switch i.(type) { case int: ... }',
              'switch v := i.(type) { case int: ... }',
              'switch type(i) { case int: ... }',
              'Both A and B are valid',
            ],
            correctIndex: 3,
            explanation:
              'Both forms are valid. `switch i.(type)` is used when you do not need the typed variable, and `switch v := i.(type)` captures the typed value in v for use within each case block.',
          },
          {
            question: 'When a type switch case lists multiple types (e.g., `case int, int64:`), what type does the captured variable have?',
            options: [
              'The first type listed (int)',
              'The actual matched type',
              'interface{} (the compiler cannot determine which type matched)',
              'It causes a compile error',
            ],
            correctIndex: 2,
            explanation:
              'When multiple types are listed in a single case, the captured variable retains the interface{} type because the compiler cannot know at compile time which specific type matched.',
          },
          {
            question: 'What type does `encoding/json` unmarshal JSON numbers into when using `interface{}`?',
            options: [
              'int',
              'int64',
              'float64',
              'json.Number',
            ],
            correctIndex: 2,
            explanation:
              'When unmarshaling into interface{}, JSON numbers are always decoded as float64. To distinguish integers from floats, use json.Number with a decoder.',
          },
        ],
        challenge: {
          prompt:
            'Write a function `summarize` that accepts an `interface{}` and uses a type switch to return a descriptive string. Handle int (show doubled value), string (show length), bool (show "yes"/"no"), []string (show count), and a default case.',
          starterCode: `package main

import "fmt"

func summarize(val interface{}) string {
    // TODO: Use a type switch to handle:
    // int -> "number: <val>, doubled: <val*2>"
    // string -> "text of length <len>"
    // bool -> "yes" or "no"
    // []string -> "string list with <len> items"
    // default -> "unknown type"
    return ""
}

func main() {
    fmt.Println(summarize(21))
    fmt.Println(summarize("hello"))
    fmt.Println(summarize(true))
    fmt.Println(summarize(false))
    fmt.Println(summarize([]string{"a", "b", "c"}))
    fmt.Println(summarize(3.14))
}`,
          solutionCode: `package main

import "fmt"

func summarize(val interface{}) string {
    switch v := val.(type) {
    case int:
        return fmt.Sprintf("number: %d, doubled: %d", v, v*2)
    case string:
        return fmt.Sprintf("text of length %d", len(v))
    case bool:
        if v {
            return "yes"
        }
        return "no"
    case []string:
        return fmt.Sprintf("string list with %d items", len(v))
    default:
        return fmt.Sprintf("unknown type: %T", v)
    }
}

func main() {
    fmt.Println(summarize(21))
    fmt.Println(summarize("hello"))
    fmt.Println(summarize(true))
    fmt.Println(summarize(false))
    fmt.Println(summarize([]string{"a", "b", "c"}))
    fmt.Println(summarize(3.14))
}`,
          hints: [
            'Use `switch v := val.(type) { case int: ... }` -- the variable v will have the matched concrete type inside each case.',
            'For bool, use an if statement inside the case to return "yes" or "no".',
            'The default case can use `%T` format verb to print the unexpected type name.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Error Handling                                               */
  /* ------------------------------------------------------------ */
  {
    id: 'error-handling',
    label: 'Error Handling',
    icon: 'AlertTriangle',
    entries: [
      {
        id: 'error-handling',
        title: 'Error Handling Basics',
        difficulty: 'beginner',
        tags: ['error', 'errors-new', 'fmt-errorf', 'nil'],
        cheatSheetSummary:
          'Errors are values implementing the `error` interface. Return `(result, error)`. Check with `if err != nil`. Create with `errors.New()` or `fmt.Errorf()`.',
        crossLanguageId: 'error-handling',
        sections: [
          {
            heading: 'The error Interface',
            content:
              'In Go, errors are values. The `error` interface has a single method: `Error() string`. Functions return errors as the last value. Callers must check the error before using the result. This explicit error handling is a core design principle.',
            code: `package main

import (
    "errors"
    "fmt"
    "strconv"
)

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

func main() {
    // Check error before using result
    result, err := divide(10, 3)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Printf("10 / 3 = %.4f\\n", result)

    // Error case
    _, err = divide(5, 0)
    if err != nil {
        fmt.Println("Error:", err)
    }

    // Standard library errors
    _, err = strconv.Atoi("not-a-number")
    if err != nil {
        fmt.Println("Parse error:", err)
    }
}`,
            output: `10 / 3 = 3.3333
Error: division by zero
Parse error: strconv.Atoi: parsing "not-a-number": invalid syntax`,
            tip: 'The Go convention: the error is always the last return value. Check `if err != nil` immediately after the function call.',
            analogy: 'Think of it like a delivery service: every package (return value) comes with a tracking slip (error). You always check the slip first -- if it says "problem," you handle it before opening the package.',
            codeHighlightLines: [9, 10, 11, 18, 19],
          },
          {
            heading: 'Creating Errors',
            content:
              'Create errors with `errors.New()` for simple messages, or `fmt.Errorf()` for formatted messages. Error messages should be lowercase, not end with punctuation, and describe the context clearly.',
            code: `package main

import (
    "errors"
    "fmt"
)

// Simple error
func validateAge(age int) error {
    if age < 0 {
        return errors.New("age cannot be negative")
    }
    if age > 150 {
        return fmt.Errorf("unrealistic age: %d", age)
    }
    return nil
}

// Adding context to errors
func processUser(name string, age int) error {
    if name == "" {
        return fmt.Errorf("processing user: name is required")
    }
    if err := validateAge(age); err != nil {
        return fmt.Errorf("processing user %s: %v", name, err)
    }
    return nil
}

func main() {
    if err := validateAge(-5); err != nil {
        fmt.Println(err)
    }

    if err := processUser("Alice", 200); err != nil {
        fmt.Println(err)
    }

    if err := processUser("Bob", 30); err != nil {
        fmt.Println(err)
    } else {
        fmt.Println("Bob processed successfully")
    }
}`,
            output: `age cannot be negative
processing user Alice: unrealistic age: 200
Bob processed successfully`,
            note: 'Error messages should be lowercase and should not end with punctuation. They often get wrapped with additional context, so proper formatting matters.',
          },
          {
            heading: 'Error Handling Patterns',
            content:
              'Go has several idiomatic patterns for error handling: guard clauses for early returns, error propagation with context, and centralized error handling. The guard clause pattern keeps the happy path at the lowest indentation level.',
            code: `package main

import (
    "errors"
    "fmt"
    "strings"
)

type Config struct {
    Host     string
    Port     int
    Database string
}

func parseConfig(input string) (*Config, error) {
    // Guard clauses
    if input == "" {
        return nil, errors.New("empty config input")
    }

    parts := strings.Split(input, ":")
    if len(parts) != 3 {
        return nil, fmt.Errorf("expected 3 parts, got %d", len(parts))
    }

    host := parts[0]
    if host == "" {
        return nil, errors.New("host cannot be empty")
    }

    var port int
    if _, err := fmt.Sscanf(parts[1], "%d", &port); err != nil {
        return nil, fmt.Errorf("invalid port %q: %v", parts[1], err)
    }

    // Happy path (not nested)
    return &Config{
        Host:     host,
        Port:     port,
        Database: parts[2],
    }, nil
}

func main() {
    configs := []string{
        "localhost:5432:mydb",
        "localhost:abc:mydb",
        "",
        "host:8080",
    }
    for _, c := range configs {
        cfg, err := parseConfig(c)
        if err != nil {
            fmt.Printf("Error parsing %q: %s\\n", c, err)
            continue
        }
        fmt.Printf("Config: %s:%d/%s\\n", cfg.Host, cfg.Port, cfg.Database)
    }
}`,
            output: `Config: localhost:5432/mydb
Error parsing "localhost:abc:mydb": invalid port "abc": expected integer
Error parsing "": empty config input
Error parsing "host:8080": expected 3 parts, got 2`,
            tip: 'Use guard clauses (early returns) to keep the happy path at the top indentation level. This makes code much more readable.',
            analogy: 'Think of it like a bouncer at a club: each guard clause checks one condition at the door and turns away anyone who does not meet it. Only guests who pass every check make it to the happy path inside.',
            codeHighlightLines: [17, 18, 22, 23, 27, 28],
          },
        ],
        quiz: [
          {
            question: 'What is the `error` interface in Go?',
            options: [
              'A struct with Code and Message fields',
              'An interface with a single method: Error() string',
              'A built-in function that stops program execution',
              'A keyword for exception handling',
            ],
            correctIndex: 1,
            explanation:
              'The error interface is defined as `type error interface { Error() string }`. Any type that implements this single method satisfies the error interface.',
          },
          {
            question: 'What is the Go convention for the position of error in return values?',
            options: [
              'Error is always the first return value',
              'Error is always the last return value',
              'Error must be the only return value',
              'Error position does not matter',
            ],
            correctIndex: 1,
            explanation:
              'By convention, Go functions return the error as the last return value: `func foo() (result, error)`. This is a universal convention in the Go ecosystem.',
          },
          {
            question: 'What should Go error messages look like?',
            options: [
              'Uppercase, ending with a period',
              'Lowercase, not ending with punctuation',
              'ALL_CAPS with underscores',
              'Any format is fine',
            ],
            correctIndex: 1,
            explanation:
              'Go error messages should be lowercase and not end with punctuation. This is because error messages are often wrapped with additional context, and proper formatting matters for readability.',
          },
          {
            question: 'What is the guard clause pattern in Go error handling?',
            options: [
              'Using try/catch blocks to guard against errors',
              'Wrapping all code in a single if err != nil block',
              'Using early returns for error cases to keep the happy path at the lowest indentation',
              'Defining all errors as global variables',
            ],
            correctIndex: 2,
            explanation:
              'Guard clauses check error conditions early and return immediately, keeping the happy path (successful execution) at the top indentation level. This makes code more readable.',
          },
        ],
        challenge: {
          prompt:
            'Write a `safeDivide` function that takes two integers and returns the result as a float64 and an error. Return an error if the divisor is zero. In main, call it with valid and invalid inputs, handling errors with the `if err != nil` pattern.',
          starterCode: `package main

import (
    "fmt"
)

// safeDivide returns the result of a/b or an error if b is zero
func safeDivide(a, b int) (float64, error) {
    // TODO
    return 0, nil
}

func main() {
    // TODO: Call safeDivide with (10, 3) and (5, 0)
    // Print the result or the error for each call
}`,
          solutionCode: `package main

import (
    "errors"
    "fmt"
)

func safeDivide(a, b int) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return float64(a) / float64(b), nil
}

func main() {
    result, err := safeDivide(10, 3)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Printf("10 / 3 = %.4f\\n", result)
    }

    result, err = safeDivide(5, 0)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Printf("5 / 0 = %.4f\\n", result)
    }
}`,
          hints: [
            'Check if b == 0 first and return an error using errors.New("division by zero").',
            'Convert integers to float64 before dividing: float64(a) / float64(b).',
            'Always check `if err != nil` before using the result value.',
          ],
        },
      },
      {
        id: 'custom-errors',
        title: 'Custom Errors',
        difficulty: 'intermediate',
        tags: ['custom-error', 'error-type', 'struct-error', 'error-interface'],
        cheatSheetSummary:
          'Implement the `error` interface on a struct for rich errors with fields. Use `errors.As()` to check and extract custom error types.',
        crossLanguageId: 'custom-errors',
        sections: [
          {
            heading: 'Custom Error Types',
            content:
              'Create custom error types by implementing the `error` interface (just the `Error() string` method). Custom errors can carry additional context: error codes, field names, HTTP status codes, and more.',
            code: `package main

import (
    "fmt"
    "errors"
)

// Custom error type
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation error on %s: %s", e.Field, e.Message)
}

// Another custom error
type NotFoundError struct {
    Resource string
    ID       string
}

func (e *NotFoundError) Error() string {
    return fmt.Sprintf("%s with ID %s not found", e.Resource, e.ID)
}

func findUser(id string) error {
    if id == "" {
        return &ValidationError{Field: "id", Message: "cannot be empty"}
    }
    if id != "123" {
        return &NotFoundError{Resource: "User", ID: id}
    }
    return nil
}

func main() {
    for _, id := range []string{"", "456", "123"} {
        err := findUser(id)
        if err != nil {
            // Check specific error type
            var ve *ValidationError
            var nfe *NotFoundError
            switch {
            case errors.As(err, &ve):
                fmt.Printf("Validation: field=%s msg=%s\\n", ve.Field, ve.Message)
            case errors.As(err, &nfe):
                fmt.Printf("Not found: %s %s\\n", nfe.Resource, nfe.ID)
            default:
                fmt.Println("Unknown error:", err)
            }
        } else {
            fmt.Printf("User %s found\\n", id)
        }
    }
}`,
            output: `Validation: field=id msg=cannot be empty
Not found: User 456
User 123 found`,
            tip: 'Use `errors.As()` instead of type assertions to check custom error types. It works through wrapped error chains.',
            analogy: 'Think of it like different colored envelopes for different types of mail: ValidationError is a red envelope, NotFoundError is a blue envelope. The receiver can check the envelope color to decide how to handle the message inside.',
            diagram: {
              kind: 'mermaid',
              code: 'classDiagram\n    class error {\n        <<interface>>\n        +Error() string\n    }\n    class ValidationError {\n        +string Field\n        +string Message\n        +Error() string\n    }\n    class NotFoundError {\n        +string Resource\n        +string ID\n        +Error() string\n    }\n    error <|.. ValidationError : satisfies\n    error <|.. NotFoundError : satisfies\n    note for error "Single-method interface.\\nAny type with Error() string\\nsatisfies it."',
              caption: 'Both ValidationError and NotFoundError implement the error interface. Use errors.As() to extract the concrete type from an error chain.',
            },
            codeHighlightLines: [9, 10, 11, 14, 15, 46, 48],
          },
          {
            heading: 'Error Types with Methods',
            content:
              'Custom error types can have additional methods beyond `Error()`. Add methods to check specific conditions, extract HTTP status codes, or determine if an error is retryable.',
            code: `package main

import (
    "errors"
    "fmt"
    "net/http"
)

type APIError struct {
    StatusCode int
    Message    string
    Retryable  bool
}

func (e *APIError) Error() string {
    return fmt.Sprintf("API error %d: %s", e.StatusCode, e.Message)
}

func (e *APIError) IsRetryable() bool {
    return e.Retryable
}

func (e *APIError) HTTPStatus() int {
    return e.StatusCode
}

func callAPI() error {
    return &APIError{
        StatusCode: http.StatusServiceUnavailable,
        Message:    "service temporarily unavailable",
        Retryable:  true,
    }
}

func main() {
    err := callAPI()
    if err != nil {
        var apiErr *APIError
        if errors.As(err, &apiErr) {
            fmt.Println("Status:", apiErr.HTTPStatus())
            fmt.Println("Message:", apiErr.Message)
            if apiErr.IsRetryable() {
                fmt.Println("This error is retryable")
            }
        }
    }
}`,
            output: `Status: 503
Message: service temporarily unavailable
This error is retryable`,
            note: 'Always use pointer receivers for error types and use pointer types in `errors.As()`: `var e *MyError` not `var e MyError`.',
            codeHighlightLines: [9, 10, 11, 12, 19, 20, 23, 24],
          },
          {
            heading: 'Error Behavior Interfaces',
            content:
              'Instead of checking concrete error types, check for behavior using interfaces. This follows the "accept interfaces" principle and makes your error handling more flexible.',
            code: `package main

import (
    "fmt"
    "errors"
)

// Behavior interface
type temporary interface {
    Temporary() bool
}

type timeout interface {
    Timeout() bool
}

// Network error implements both
type NetworkError struct {
    Op      string
    Addr    string
    timeout bool
}

func (e *NetworkError) Error() string {
    return fmt.Sprintf("%s %s: network error", e.Op, e.Addr)
}
func (e *NetworkError) Temporary() bool { return true }
func (e *NetworkError) Timeout() bool   { return e.timeout }

// Check behavior, not type
func isTemporary(err error) bool {
    var t temporary
    return errors.As(err, &t) && t.Temporary()
}

func isTimeout(err error) bool {
    var t timeout
    return errors.As(err, &t) && t.Timeout()
}

func main() {
    err := &NetworkError{Op: "dial", Addr: "example.com:80", timeout: true}

    fmt.Println("Error:", err)
    fmt.Println("Is temporary:", isTemporary(err))
    fmt.Println("Is timeout:", isTimeout(err))
}`,
            output: `Error: dial example.com:80: network error
Is temporary: true
Is timeout: true`,
            tip: 'Checking error behavior (interfaces) rather than concrete types makes your code more resilient to changes in error implementations.',
          },
        ],
        quiz: [
          {
            question: 'How do you create a custom error type in Go?',
            options: [
              'Extend the built-in error class',
              'Implement the Error() string method on a struct',
              'Use the `throw` keyword with a custom message',
              'Register the type with the errors package',
            ],
            correctIndex: 1,
            explanation:
              'Any type that has an `Error() string` method satisfies the error interface. You create a custom error by defining a struct and implementing this single method.',
          },
          {
            question: 'Which function should you use to check if an error is of a specific custom type?',
            options: [
              'errors.Is()',
              'errors.As()',
              'errors.Unwrap()',
              'A direct type assertion err.(*MyError)',
            ],
            correctIndex: 1,
            explanation:
              '`errors.As()` checks if any error in the chain can be extracted as a specific type. It is preferred over direct type assertions because it works through wrapped error chains.',
          },
          {
            question: 'Why should you use pointer receivers for custom error types?',
            options: [
              'It is required by the compiler',
              'It avoids copying the error struct and allows consistent use with errors.As()',
              'It makes the error immutable',
              'It allows the error to be nil',
            ],
            correctIndex: 1,
            explanation:
              'Using pointer receivers avoids unnecessary copying and is consistent with how errors.As() expects to work: `var e *MyError; errors.As(err, &e)`. Using value receivers can cause subtle bugs with errors.As().',
          },
          {
            question: 'What is the advantage of checking error behavior (interfaces) over checking concrete error types?',
            options: [
              'It is faster at runtime',
              'It uses less memory',
              'It is more resilient to changes in error implementations',
              'It catches errors at compile time',
            ],
            correctIndex: 2,
            explanation:
              'Checking behavior (e.g., "is this error temporary?") rather than concrete types means your code works with any error implementation that has the right behavior, making it more flexible and resilient to changes.',
          },
        ],
        challenge: {
          prompt:
            'Create a custom `HTTPError` struct with StatusCode (int) and Message (string) fields. Implement the error interface. Write a function `fetchData` that returns an HTTPError with status 404. In main, use errors.As to extract the HTTPError and print its status code.',
          starterCode: `package main

import (
    "errors"
    "fmt"
)

// Define HTTPError struct with StatusCode and Message

// Implement Error() string on *HTTPError

// fetchData simulates a failing HTTP request
func fetchData(url string) error {
    // TODO: Return an HTTPError with status 404
    return nil
}

func main() {
    err := fetchData("https://api.example.com/data")
    if err != nil {
        // TODO: Use errors.As to extract HTTPError and print the status code
        fmt.Println(err)
    }
}`,
          solutionCode: `package main

import (
    "errors"
    "fmt"
)

type HTTPError struct {
    StatusCode int
    Message    string
}

func (e *HTTPError) Error() string {
    return fmt.Sprintf("HTTP %d: %s", e.StatusCode, e.Message)
}

func fetchData(url string) error {
    return &HTTPError{
        StatusCode: 404,
        Message:    fmt.Sprintf("resource not found: %s", url),
    }
}

func main() {
    err := fetchData("https://api.example.com/data")
    if err != nil {
        var httpErr *HTTPError
        if errors.As(err, &httpErr) {
            fmt.Println("Status code:", httpErr.StatusCode)
            fmt.Println("Message:", httpErr.Message)
        } else {
            fmt.Println("Unknown error:", err)
        }
    }
}`,
          hints: [
            'Define a struct with StatusCode int and Message string, then add `func (e *HTTPError) Error() string`.',
            'Return `&HTTPError{...}` (a pointer) from fetchData since Error() uses a pointer receiver.',
            'Use `var httpErr *HTTPError` and `errors.As(err, &httpErr)` to extract the concrete error type.',
          ],
        },
      },
      {
        id: 'error-wrapping',
        title: 'Error Wrapping',
        difficulty: 'intermediate',
        tags: ['error-wrapping', 'fmt-errorf', 'errors-is', 'errors-as', 'unwrap'],
        cheatSheetSummary:
          'Wrap with `fmt.Errorf("context: %w", err)`. Check with `errors.Is(err, target)`. Extract with `errors.As(err, &target)`. Unwrap chain preserved.',
        crossLanguageId: 'error-wrapping',
        sections: [
          {
            heading: 'Wrapping Errors with %w',
            content:
              'Go 1.13 introduced error wrapping with `fmt.Errorf` and the `%w` verb. This preserves the original error while adding context. Use `errors.Is()` to check if any error in the chain matches a target, and `errors.As()` to extract a specific error type.',
            code: `package main

import (
    "errors"
    "fmt"
    "os"
)

func readConfig(path string) ([]byte, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        // Wrap with context using %w
        return nil, fmt.Errorf("reading config %s: %w", path, err)
    }
    return data, nil
}

func loadApp(configPath string) error {
    _, err := readConfig(configPath)
    if err != nil {
        // Wrap again with more context
        return fmt.Errorf("loading app: %w", err)
    }
    return nil
}

func main() {
    err := loadApp("/nonexistent/config.json")
    if err != nil {
        fmt.Println("Error:", err)

        // errors.Is checks the full chain
        if errors.Is(err, os.ErrNotExist) {
            fmt.Println("Config file does not exist")
        }

        // errors.As extracts a specific type from the chain
        var pathErr *os.PathError
        if errors.As(err, &pathErr) {
            fmt.Println("Path:", pathErr.Path)
            fmt.Println("Op:", pathErr.Op)
        }
    }
}`,
            output: `Error: loading app: reading config /nonexistent/config.json: open /nonexistent/config.json: no such file or directory
Config file does not exist
Path: /nonexistent/config.json
Op: open`,
            tip: 'Use `%w` (not `%v`) to wrap errors. Only `%w` preserves the error chain for `errors.Is()` and `errors.As()` to traverse.',
            analogy: 'Think of it like wrapping a gift in multiple layers of wrapping paper: each layer (fmt.Errorf with %w) adds context, but you can always unwrap to find the original gift (error) inside.',
            diagram: {
              kind: 'mermaid',
              code: 'graph LR\n    A["loadApp: loading app"] -->|"%w wraps"| B["readConfig: reading config /path"]\n    B -->|"%w wraps"| C["os: open /path: no such file"]\n    C -->|"is"| D["os.ErrNotExist"]\n    style A fill:#fca5a5,stroke:#dc2626\n    style B fill:#fdba74,stroke:#ea580c\n    style C fill:#fde68a,stroke:#ca8a04\n    style D fill:#86efac,stroke:#16a34a',
              caption: 'Error wrapping chain: each layer adds context with %w. errors.Is() and errors.As() traverse the full chain to find the root cause.',
            },
            codeHighlightLines: [13, 22, 33, 39],
          },
          {
            heading: 'errors.Is vs errors.As',
            content:
              '`errors.Is()` checks if any error in the chain equals a specific value (for sentinel errors). `errors.As()` checks if any error in the chain can be cast to a specific type (for custom error types). Both traverse the full wrapping chain.',
            code: `package main

import (
    "errors"
    "fmt"
)

var ErrNotFound = errors.New("not found")
var ErrForbidden = errors.New("forbidden")

type DetailedError struct {
    Code    int
    Message string
    Inner   error
}

func (e *DetailedError) Error() string {
    return fmt.Sprintf("[%d] %s", e.Code, e.Message)
}

func (e *DetailedError) Unwrap() error {
    return e.Inner
}

func getResource() error {
    return &DetailedError{
        Code:    404,
        Message: "resource not available",
        Inner:   ErrNotFound, // wrap sentinel
    }
}

func main() {
    err := fmt.Errorf("service call: %w", getResource())

    // errors.Is: check for sentinel value
    fmt.Println("Is NotFound:", errors.Is(err, ErrNotFound))
    fmt.Println("Is Forbidden:", errors.Is(err, ErrForbidden))

    // errors.As: extract custom type
    var de *DetailedError
    if errors.As(err, &de) {
        fmt.Printf("Code: %d, Message: %s\\n", de.Code, de.Message)
    }

    fmt.Println("\\nFull error:", err)
}`,
            output: `Is NotFound: true
Is Forbidden: false
Code: 404, Message: resource not available

Full error: service call: [404] resource not available`,
            note: 'Implement the `Unwrap() error` method on custom error types to enable `errors.Is()` and `errors.As()` to traverse through your error.',
            codeHighlightLines: [21, 22, 37, 42],
          },
          {
            heading: 'Multi-Error Wrapping (Go 1.20+)',
            content:
              'Go 1.20 introduced support for wrapping multiple errors with `errors.Join()` and `fmt.Errorf` with multiple `%w` verbs. This is useful for batch operations where multiple errors can occur.',
            code: `package main

import (
    "errors"
    "fmt"
)

var ErrValidation = errors.New("validation error")
var ErrRequired = errors.New("required field missing")

func validateForm(data map[string]string) error {
    var errs []error

    if data["name"] == "" {
        errs = append(errs, fmt.Errorf("name: %w", ErrRequired))
    }
    if data["email"] == "" {
        errs = append(errs, fmt.Errorf("email: %w", ErrRequired))
    }
    if len(data["password"]) < 8 {
        errs = append(errs, errors.New("password must be at least 8 characters"))
    }

    if len(errs) > 0 {
        // Join multiple errors (Go 1.20+)
        return fmt.Errorf("%w: %w", ErrValidation, errors.Join(errs...))
    }
    return nil
}

func main() {
    form := map[string]string{
        "name":     "",
        "email":    "",
        "password": "short",
    }

    err := validateForm(form)
    if err != nil {
        fmt.Println("Error:", err)
        fmt.Println()

        // errors.Is works through joined errors
        fmt.Println("Is validation:", errors.Is(err, ErrValidation))
        fmt.Println("Is required:", errors.Is(err, ErrRequired))
    }
}`,
            output: `Error: validation error: name: required field missing
email: required field missing
password must be at least 8 characters

Is validation: true
Is required: true`,
            tip: '`errors.Join()` combines multiple errors into one. Each error in the joined chain is searchable with `errors.Is()` and `errors.As()`.',
          },
        ],
        quiz: [
          {
            question: 'What is the difference between `%w` and `%v` in fmt.Errorf?',
            options: [
              'They are identical',
              '`%w` wraps the error preserving the chain; `%v` only includes the string representation',
              '`%v` wraps the error; `%w` does not',
              '`%w` is for warnings, `%v` is for verbose errors',
            ],
            correctIndex: 1,
            explanation:
              '`%w` wraps the error and preserves the error chain, enabling errors.Is() and errors.As() to traverse it. `%v` only includes the error message string and does not preserve the chain.',
          },
          {
            question: 'What method must a custom error type implement for errors.Is() and errors.As() to traverse through it?',
            options: [
              'Chain() error',
              'Inner() error',
              'Unwrap() error',
              'Cause() error',
            ],
            correctIndex: 2,
            explanation:
              'The `Unwrap() error` method tells the errors package how to traverse the error chain. errors.Is() and errors.As() call Unwrap() to find wrapped errors.',
          },
          {
            question: 'What does errors.Join() do in Go 1.20+?',
            options: [
              'Concatenates error message strings',
              'Combines multiple errors into a single error that preserves all of them',
              'Joins two error chains into one',
              'Creates a new sentinel error from existing ones',
            ],
            correctIndex: 1,
            explanation:
              'errors.Join() combines multiple error values into a single error. Each individual error remains searchable with errors.Is() and errors.As().',
          },
        ],
        challenge: {
          prompt:
            'Write a function `openAndRead` that wraps errors from os.Open using `%w`. In main, check the wrapped error using errors.Is(err, os.ErrNotExist) to determine if the file was not found. Also implement an Unwrap method on a custom WrappedError type.',
          starterCode: `package main

import (
    "errors"
    "fmt"
    "os"
)

type WrappedError struct {
    Context string
    Err     error
}

func (e *WrappedError) Error() string {
    return fmt.Sprintf("%s: %v", e.Context, e.Err)
}

// TODO: Implement Unwrap() on WrappedError

func openAndRead(path string) error {
    // TODO: Try to open the file and wrap any error with context
    return nil
}

func main() {
    err := openAndRead("/nonexistent/file.txt")
    if err != nil {
        fmt.Println("Error:", err)
        // TODO: Check if the underlying error is os.ErrNotExist
    }
}`,
          solutionCode: `package main

import (
    "errors"
    "fmt"
    "os"
)

type WrappedError struct {
    Context string
    Err     error
}

func (e *WrappedError) Error() string {
    return fmt.Sprintf("%s: %v", e.Context, e.Err)
}

func (e *WrappedError) Unwrap() error {
    return e.Err
}

func openAndRead(path string) error {
    _, err := os.Open(path)
    if err != nil {
        return &WrappedError{
            Context: fmt.Sprintf("opening file %s", path),
            Err:     err,
        }
    }
    return nil
}

func main() {
    err := openAndRead("/nonexistent/file.txt")
    if err != nil {
        fmt.Println("Error:", err)
        if errors.Is(err, os.ErrNotExist) {
            fmt.Println("The file does not exist")
        }
    }
}`,
          hints: [
            'Implement `func (e *WrappedError) Unwrap() error { return e.Err }` to enable error chain traversal.',
            'In openAndRead, use os.Open and wrap the error in a WrappedError with descriptive context.',
            'Use errors.Is(err, os.ErrNotExist) -- it will traverse through your WrappedError via Unwrap().',
          ],
        },
      },
      {
        id: 'sentinel-errors',
        title: 'Sentinel Errors',
        difficulty: 'intermediate',
        tags: ['sentinel', 'errors-is', 'package-errors', 'io-eof'],
        cheatSheetSummary:
          'Sentinel errors are package-level `var` values: `var ErrNotFound = errors.New("not found")`. Check with `errors.Is()`. Convention: `Err` prefix.',
        crossLanguageId: 'sentinel-errors',
        sections: [
          {
            heading: 'What Are Sentinel Errors',
            content:
              'Sentinel errors are pre-defined, package-level error values that callers can check for specific error conditions. They are created with `errors.New()` and conventionally named with the `Err` prefix. The standard library uses them extensively: `io.EOF`, `sql.ErrNoRows`, `os.ErrNotExist`.',
            code: `package main

import (
    "errors"
    "fmt"
)

// Define sentinel errors at package level
var (
    ErrNotFound     = errors.New("not found")
    ErrUnauthorized = errors.New("unauthorized")
    ErrForbidden    = errors.New("forbidden")
)

type UserStore struct {
    users map[string]string
}

func (s *UserStore) Get(id string) (string, error) {
    if name, ok := s.users[id]; ok {
        return name, nil
    }
    return "", ErrNotFound
}

func main() {
    store := &UserStore{
        users: map[string]string{"1": "Alice", "2": "Bob"},
    }

    name, err := store.Get("1")
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Found:", name)
    }

    // Check for specific sentinel error
    _, err = store.Get("999")
    if errors.Is(err, ErrNotFound) {
        fmt.Println("User not found (expected)")
    }
}`,
            output: `Found: Alice
User not found (expected)`,
            tip: 'Use `errors.Is()` instead of `==` for sentinel error comparison. `errors.Is()` works through wrapped error chains.',
            analogy: 'Think of it like traffic signs: ErrNotFound is a "Dead End" sign, ErrUnauthorized is a "No Entry" sign. They are well-known, pre-placed signals that every driver (caller) recognizes and can act on.',
            codeHighlightLines: [9, 10, 11, 12, 23, 40],
          },
          {
            heading: 'Standard Library Sentinel Errors',
            content:
              'The standard library defines many sentinel errors. Knowing these is essential for writing idiomatic Go. Common ones include `io.EOF` (end of input), `os.ErrNotExist` (file not found), `context.Canceled` (context cancelled), and `context.DeadlineExceeded` (timeout).',
            code: `package main

import (
    "context"
    "errors"
    "fmt"
    "io"
    "os"
    "strings"
    "time"
)

func main() {
    // io.EOF: end of reader
    reader := strings.NewReader("hello")
    buf := make([]byte, 10)
    for {
        n, err := reader.Read(buf)
        if errors.Is(err, io.EOF) {
            fmt.Println("Reached end of input")
            break
        }
        fmt.Printf("Read %d bytes: %s\\n", n, buf[:n])
    }

    // os.ErrNotExist: file not found
    _, err := os.Open("/nonexistent")
    if errors.Is(err, os.ErrNotExist) {
        fmt.Println("File does not exist")
    }

    // context.DeadlineExceeded: timeout
    ctx, cancel := context.WithTimeout(context.Background(), 1*time.Millisecond)
    defer cancel()
    time.Sleep(10 * time.Millisecond)
    if errors.Is(ctx.Err(), context.DeadlineExceeded) {
        fmt.Println("Context timed out")
    }
}`,
            output: `Read 5 bytes: hello
Reached end of input
File does not exist
Context timed out`,
            note: 'Always use `errors.Is()` for sentinel checks, not `==`. Wrapped errors (`fmt.Errorf("... %w", err)`) only match with `errors.Is()`, not with `==`.',
            codeHighlightLines: [19, 28, 36],
          },
          {
            heading: 'Designing Good Sentinel Errors',
            content:
              'Good sentinel errors are specific, documented, and stable. Export them from your package so callers can check for them. Group related errors together. Avoid creating sentinels for every possible failure -- use them for conditions that callers need to handle differently.',
            code: `package main

import (
    "errors"
    "fmt"
)

// Package-level sentinels (exported)
var (
    // ErrInvalidInput indicates the input failed validation.
    ErrInvalidInput = errors.New("invalid input")

    // ErrDuplicate indicates the resource already exists.
    ErrDuplicate = errors.New("duplicate resource")

    // ErrRateLimit indicates too many requests.
    ErrRateLimit = errors.New("rate limit exceeded")
)

func createUser(name string) error {
    if name == "" {
        return fmt.Errorf("create user: %w", ErrInvalidInput)
    }
    if name == "admin" {
        return fmt.Errorf("create user %q: %w", name, ErrDuplicate)
    }
    return nil
}

func main() {
    cases := []string{"Alice", "", "admin"}
    for _, name := range cases {
        err := createUser(name)
        switch {
        case err == nil:
            fmt.Printf("Created %q successfully\\n", name)
        case errors.Is(err, ErrInvalidInput):
            fmt.Printf("Bad input: %v\\n", err)
        case errors.Is(err, ErrDuplicate):
            fmt.Printf("Already exists: %v\\n", err)
        default:
            fmt.Printf("Unexpected error: %v\\n", err)
        }
    }
}`,
            output: `Created "Alice" successfully
Bad input: create user: invalid input
Already exists: create user "admin": duplicate resource`,
            tip: 'Only create sentinel errors for conditions that callers need to differentiate. If all errors are handled the same way, a simple `fmt.Errorf()` is sufficient.',
          },
        ],
        quiz: [
          {
            question: 'What is a sentinel error in Go?',
            options: [
              'An error that terminates the program immediately',
              'A pre-defined, package-level error value used to signal specific conditions',
              'An error that is automatically logged by the runtime',
              'An error that cannot be wrapped',
            ],
            correctIndex: 1,
            explanation:
              'Sentinel errors are package-level `var` values created with errors.New(). They represent specific, well-known error conditions that callers can check for. Examples: io.EOF, os.ErrNotExist.',
          },
          {
            question: 'What is the naming convention for sentinel errors in Go?',
            options: [
              'ERR_NOT_FOUND (screaming snake case)',
              'ErrNotFound (Err prefix with PascalCase)',
              'notFoundError (camelCase)',
              'Error_NotFound (mixed case with underscore)',
            ],
            correctIndex: 1,
            explanation:
              'Sentinel errors in Go follow the convention of using the `Err` prefix followed by PascalCase: ErrNotFound, ErrUnauthorized, ErrDuplicate. This makes them easily recognizable as exported sentinel errors.',
          },
          {
            question: 'Why should you use errors.Is() instead of == for sentinel error comparison?',
            options: [
              'errors.Is() is faster',
              'The == operator does not work with errors',
              'errors.Is() traverses wrapped error chains, while == only checks the outermost error',
              'errors.Is() provides a better error message',
            ],
            correctIndex: 2,
            explanation:
              'errors.Is() traverses the full wrapping chain created by fmt.Errorf with %w. Using == would only compare the outermost error and miss wrapped sentinels deeper in the chain.',
          },
          {
            question: 'Which of these is NOT a standard library sentinel error?',
            options: [
              'io.EOF',
              'os.ErrNotExist',
              'context.DeadlineExceeded',
              'errors.ErrInvalid',
            ],
            correctIndex: 3,
            explanation:
              'io.EOF, os.ErrNotExist, and context.DeadlineExceeded are all standard library sentinel errors. errors.ErrInvalid does not exist in Go -- the errors package only provides errors.New(), errors.Is(), errors.As(), errors.Join(), and errors.Unwrap().',
          },
        ],
        challenge: {
          prompt:
            'Define two sentinel errors ErrEmpty and ErrTooLong for a string validation package. Write a `validate` function that returns ErrEmpty if the string is empty and ErrTooLong if it exceeds 50 characters. Wrap the sentinels with context using %w. In main, use errors.Is to differentiate the error types.',
          starterCode: `package main

import (
    "errors"
    "fmt"
)

// TODO: Define sentinel errors ErrEmpty and ErrTooLong

// validate checks that a string is non-empty and at most 50 characters
func validate(field, value string) error {
    // TODO: Return wrapped sentinel errors with context
    return nil
}

func main() {
    inputs := []struct{ field, value string }{
        {"name", "Alice"},
        {"name", ""},
        {"bio", "This is an extremely long biography text that definitely exceeds the maximum allowed character limit for this field"},
    }
    for _, input := range inputs {
        err := validate(input.field, input.value)
        // TODO: Check with errors.Is and print appropriate messages
        if err != nil {
            fmt.Println(err)
        } else {
            fmt.Printf("%s: ok\\n", input.field)
        }
    }
}`,
          solutionCode: `package main

import (
    "errors"
    "fmt"
)

var (
    ErrEmpty   = errors.New("value is empty")
    ErrTooLong = errors.New("value is too long")
)

func validate(field, value string) error {
    if value == "" {
        return fmt.Errorf("validate %s: %w", field, ErrEmpty)
    }
    if len(value) > 50 {
        return fmt.Errorf("validate %s (%d chars): %w", field, len(value), ErrTooLong)
    }
    return nil
}

func main() {
    inputs := []struct{ field, value string }{
        {"name", "Alice"},
        {"name", ""},
        {"bio", "This is an extremely long biography text that definitely exceeds the maximum allowed character limit for this field"},
    }
    for _, input := range inputs {
        err := validate(input.field, input.value)
        switch {
        case err == nil:
            fmt.Printf("%s: ok\\n", input.field)
        case errors.Is(err, ErrEmpty):
            fmt.Printf("Empty field! %v\\n", err)
        case errors.Is(err, ErrTooLong):
            fmt.Printf("Too long! %v\\n", err)
        default:
            fmt.Printf("Unknown: %v\\n", err)
        }
    }
}`,
          hints: [
            'Define sentinels at package level: `var ErrEmpty = errors.New("value is empty")`.',
            'Wrap sentinels with context: `fmt.Errorf("validate %s: %w", field, ErrEmpty)`.',
            'Use a switch with errors.Is() cases to handle each sentinel differently in main.',
          ],
        },
      },
    ],
  },
];

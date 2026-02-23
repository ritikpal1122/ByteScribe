import type { DocCategory } from './types';

export const CPP_PART3_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Object-Oriented Programming                                  */
  /* ------------------------------------------------------------ */
  {
    id: 'oop',
    label: 'Object-Oriented Programming',
    icon: 'Box',
    entries: [
      {
        id: 'classes',
        title: 'Classes & Objects',
        difficulty: 'intermediate',
        tags: ['class', 'object', 'struct', 'encapsulation', 'access-specifiers'],
        cheatSheetSummary: 'class MyClass { public: ...; private: ...; }; Members are private by default. struct defaults to public.',
        crossLanguageId: 'classes',
        sections: [
          {
            heading: 'Defining a Class',
            content:
              'A class is a user-defined type that bundles data (member variables) and behavior (member functions) together. Members are private by default, meaning they can only be accessed from within the class. Public members can be accessed from anywhere. This encapsulation is a core OOP principle that protects internal state from unintended modification.',
            code: `#include <iostream>
#include <string>
using namespace std;

class Dog {
private:
    string name;
    int age;

public:
    // Setter methods
    void setName(const string& n) { name = n; }
    void setAge(int a) {
        if (a >= 0) age = a;
    }

    // Getter methods
    string getName() const { return name; }
    int getAge() const { return age; }

    // Other methods
    void bark() const {
        cout << name << " says: Woof!\\n";
    }

    void info() const {
        cout << name << " is " << age << " years old.\\n";
    }
};

int main() {
    Dog d;
    d.setName("Buddy");
    d.setAge(3);
    d.bark();
    d.info();

    // d.name = "Rex";  // Error: name is private

    return 0;
}`,
            output: `Buddy says: Woof!
Buddy is 3 years old.`,
            tip: 'Use const after member function declarations to indicate they do not modify the object. This allows calling them on const objects and references.',
            analogy: 'Think of it like a blueprint for a house: the class defines the layout (rooms, doors, walls), and each object is a house built from that blueprint. Private members are like internal plumbing -- hidden from visitors but essential to how the house works.',
            codeHighlightLines: [5, 6, 7, 10, 11, 12],
            diagram: {
              kind: 'mermaid' as const,
              code: `classDiagram
    class Dog {
        -string name
        -int age
        +setName(string n) void
        +setAge(int a) void
        +getName() string
        +getAge() int
        +bark() void
        +info() void
    }
    note for Dog "- means private\\n+ means public\\nPrivate members are\\naccessible only from\\nwithin the class"`,
              caption: 'Class diagram showing Dog with private data members and public interface methods',
            },
          },
          {
            heading: 'Struct vs Class',
            content:
              'In C++, struct and class are nearly identical. The only difference is the default access specifier: struct members are public by default, while class members are private by default. By convention, struct is used for simple data holders (plain old data) and class is used when encapsulation and behavior are important.',
            code: `#include <iostream>
#include <string>
using namespace std;

// Struct: public by default, good for simple data
struct Point {
    double x;
    double y;

    double distance(const Point& other) const {
        double dx = x - other.x;
        double dy = y - other.y;
        return sqrt(dx * dx + dy * dy);
    }
};

// Class: private by default, good for encapsulation
class Circle {
    double radius;  // private by default

public:
    Circle(double r) : radius(r) {}

    double area() const { return 3.14159 * radius * radius; }
    double perimeter() const { return 2 * 3.14159 * radius; }
    double getRadius() const { return radius; }
};

int main() {
    // Struct: direct member access
    Point p1{3.0, 4.0};
    Point p2{0.0, 0.0};
    cout << "Point: (" << p1.x << ", " << p1.y << ")\\n";
    cout << "Distance: " << p1.distance(p2) << "\\n";

    // Class: access through public interface
    Circle c(5.0);
    cout << "Radius: " << c.getRadius() << "\\n";
    cout << "Area: " << c.area() << "\\n";
    cout << "Perimeter: " << c.perimeter() << "\\n";

    return 0;
}`,
            output: `Point: (3, 4)
Distance: 5
Radius: 5
Area: 78.5397
Perimeter: 31.4159`,
          },
          {
            heading: 'Member Initializer List',
            content:
              'The member initializer list provides a way to initialize member variables before the constructor body executes. It is the preferred way to initialize members because it avoids default construction followed by assignment. It is required for const members, reference members, and members without default constructors.',
            code: `#include <iostream>
#include <string>
using namespace std;

class Student {
    const int id;        // Must be initialized in list
    string name;
    double gpa;

public:
    // Member initializer list
    Student(int id, const string& name, double gpa)
        : id(id), name(name), gpa(gpa) {}

    void print() const {
        cout << "Student #" << id << ": " << name
             << " (GPA: " << gpa << ")\\n";
    }
};

class Rectangle {
    double width, height;

public:
    Rectangle(double w, double h) : width(w), height(h) {}

    // In-class member initializers (C++11)
    // double area = 0;  // Can also provide defaults

    double area() const { return width * height; }
    void print() const {
        cout << width << " x " << height << " = " << area() << "\\n";
    }
};

int main() {
    Student s(101, "Alice", 3.85);
    s.print();

    Rectangle r(4.0, 6.0);
    r.print();

    return 0;
}`,
            output: `Student #101: Alice (GPA: 3.85)
4 x 6 = 24`,
            tip: 'Members are initialized in the order they are declared in the class, not the order they appear in the initializer list. Always match the declaration order to avoid confusion.',
            analogy: 'Think of it like filling out a form at the door before entering a room: the member initializer list sets all values before the constructor body even starts executing, rather than entering the room with blank fields and then filling them in.',
            codeHighlightLines: [14, 15],
          },
        ],
        quiz: [
          {
            question: 'What is the default access specifier for members of a C++ class?',
            options: ['public', 'private', 'protected', 'internal'],
            correctIndex: 1,
            explanation: 'In C++, class members are private by default. This means they can only be accessed from within the class itself unless explicitly declared as public or protected.',
          },
          {
            question: 'What is the key difference between a struct and a class in C++?',
            options: [
              'Structs cannot have methods, classes can',
              'Structs are allocated on the stack, classes on the heap',
              'Struct members are public by default, class members are private by default',
              'Structs cannot use inheritance, classes can',
            ],
            correctIndex: 2,
            explanation: 'The only technical difference between struct and class in C++ is the default access level: struct defaults to public, while class defaults to private. Both can have methods, constructors, inheritance, and everything else.',
          },
          {
            question: 'Why is the member initializer list preferred over assigning values in the constructor body?',
            options: [
              'It allows using more parameters',
              'It avoids default construction followed by assignment, and is required for const and reference members',
              'It runs at compile time instead of runtime',
              'It automatically generates getter and setter methods',
            ],
            correctIndex: 1,
            explanation: 'The member initializer list initializes members directly, avoiding a default construction followed by an assignment. It is required for const members, reference members, and members without default constructors.',
          },
        ],
        challenge: {
          prompt: 'Create a class called BankAccount with private members for the account holder name (string) and balance (double). Provide a constructor using member initializer list, getter methods, and a deposit/withdraw method that prevents negative balance.',
          starterCode: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
    // TODO: Add private members

public:
    // TODO: Constructor with initializer list

    // TODO: Getter methods

    // TODO: deposit() and withdraw() methods
};

int main() {
    BankAccount acc("Alice", 1000.0);
    acc.deposit(500.0);
    acc.withdraw(200.0);
    acc.withdraw(2000.0); // Should fail
    cout << acc.getName() << ": $" << acc.getBalance() << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
    string name;
    double balance;

public:
    BankAccount(const string& n, double b) : name(n), balance(b) {}

    string getName() const { return name; }
    double getBalance() const { return balance; }

    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    bool withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        cout << "Withdrawal failed: insufficient funds\\n";
        return false;
    }
};

int main() {
    BankAccount acc("Alice", 1000.0);
    acc.deposit(500.0);
    acc.withdraw(200.0);
    acc.withdraw(2000.0);
    cout << acc.getName() << ": $" << acc.getBalance() << endl;
    return 0;
}`,
          hints: [
            'Declare name as string and balance as double in the private section of the class.',
            'Use the member initializer list syntax: ClassName(params) : member1(val1), member2(val2) {}',
            'In withdraw(), check that the amount does not exceed the current balance before subtracting.',
          ],
        },
      },
      {
        id: 'constructors-destructors',
        title: 'Constructors & Destructors',
        difficulty: 'intermediate',
        tags: ['constructor', 'destructor', 'raii', 'copy', 'move'],
        cheatSheetSummary: 'Constructor: ClassName(params). Destructor: ~ClassName(). Follow RAII: acquire in ctor, release in dtor.',
        sections: [
          {
            heading: 'Constructor Types',
            content:
              'Constructors initialize objects when they are created. C++ supports default constructors (no parameters), parameterized constructors, and copy constructors (takes a const reference to the same class). If you define no constructors, the compiler generates a default one. If you define any constructor, the default is no longer generated unless you explicitly default it.',
            code: `#include <iostream>
#include <string>
using namespace std;

class Account {
    string owner;
    double balance;

public:
    // Default constructor
    Account() : owner("Unknown"), balance(0.0) {
        cout << "Default constructor called\\n";
    }

    // Parameterized constructor
    Account(const string& owner, double balance)
        : owner(owner), balance(balance) {
        cout << "Parameterized constructor: " << owner << "\\n";
    }

    // Copy constructor
    Account(const Account& other)
        : owner(other.owner), balance(other.balance) {
        cout << "Copy constructor: " << owner << "\\n";
    }

    void print() const {
        cout << owner << ": $" << balance << "\\n";
    }
};

int main() {
    Account a1;                       // Default constructor
    Account a2("Alice", 1000.0);      // Parameterized
    Account a3 = a2;                  // Copy constructor
    Account a4(a2);                   // Copy constructor (alternative syntax)

    cout << "\\n";
    a1.print();
    a2.print();
    a3.print();

    return 0;
}`,
            output: `Default constructor called
Parameterized constructor: Alice
Copy constructor: Alice
Copy constructor: Alice

Unknown: $0
Alice: $1000
Alice: $1000`,
          },
          {
            heading: 'Destructors and RAII',
            content:
              'A destructor is called automatically when an object goes out of scope or is deleted. It has no parameters and no return type. The RAII (Resource Acquisition Is Initialization) pattern ties resource management to object lifetime: acquire resources in the constructor, release them in the destructor. This ensures resources are always properly cleaned up, even when exceptions occur.',
            code: `#include <iostream>
#include <string>
using namespace std;

class FileHandler {
    string filename;
    bool isOpen;

public:
    FileHandler(const string& name) : filename(name), isOpen(true) {
        cout << "Opening file: " << filename << "\\n";
    }

    ~FileHandler() {
        if (isOpen) {
            cout << "Closing file: " << filename << "\\n";
            isOpen = false;
        }
    }

    void write(const string& data) const {
        if (isOpen) {
            cout << "Writing to " << filename << ": " << data << "\\n";
        }
    }
};

class ScopeLogger {
    string name;
public:
    ScopeLogger(const string& n) : name(n) {
        cout << ">> Entering " << name << "\\n";
    }
    ~ScopeLogger() {
        cout << "<< Leaving " << name << "\\n";
    }
};

int main() {
    ScopeLogger mainLog("main");

    {
        ScopeLogger innerLog("inner block");
        FileHandler fh("data.txt");
        fh.write("Hello, World!");
    }  // innerLog and fh destroyed here

    cout << "Back in main\\n";
    return 0;
}  // mainLog destroyed here`,
            output: `>> Entering main
>> Entering inner block
Opening file: data.txt
Writing to data.txt: Hello, World!
Closing file: data.txt
<< Leaving inner block
Back in main
<< Leaving main`,
            tip: 'RAII is one of the most important C++ idioms. It guarantees resource cleanup regardless of how a scope is exited: normal flow, break, return, or exception.',
            analogy: 'Think of it like a hotel room: when you check in (constructor), you get the room key and the lights turn on. When you check out (destructor), housekeeping automatically cleans up regardless of whether you left normally or in an emergency.',
            codeHighlightLines: [10, 11, 14, 15, 16, 17, 18],
            diagram: {
              kind: 'mermaid' as const,
              code: `sequenceDiagram
    participant Main as main()
    participant Scope as { inner block }
    participant FH as FileHandler
    participant SL as ScopeLogger

    Main->>SL: ScopeLogger("main") -- constructor
    Main->>Scope: Enter block
    Scope->>SL: ScopeLogger("inner") -- constructor
    Scope->>FH: FileHandler("data.txt") -- constructor
    FH-->>FH: Resource acquired (file opened)
    Scope->>FH: write("Hello, World!")
    Note over Scope: Block ends - stack unwinds
    Scope->>FH: ~FileHandler() -- destructor
    FH-->>FH: Resource released (file closed)
    Scope->>SL: ~ScopeLogger("inner") -- destructor
    Main->>Main: "Back in main"
    Main->>SL: ~ScopeLogger("main") -- destructor`,
              caption: 'RAII lifecycle: constructors acquire resources on scope entry, destructors release them on scope exit (in reverse order)',
            },
          },
          {
            heading: 'Rule of Three / Five / Zero',
            content:
              'If your class manages a resource, you likely need to define all three of: destructor, copy constructor, and copy assignment operator (Rule of Three). C++11 adds move constructor and move assignment operator (Rule of Five). If your class does not manage resources directly, rely on compiler-generated defaults (Rule of Zero) by using smart pointers and standard containers.',
            code: `#include <iostream>
#include <cstring>
using namespace std;

class MyString {
    char* data;
    int length;

public:
    // Constructor
    MyString(const char* str = "") {
        length = strlen(str);
        data = new char[length + 1];
        strcpy(data, str);
        cout << "Constructed: \\"" << data << "\\"\\n";
    }

    // Destructor
    ~MyString() {
        cout << "Destroyed: \\"" << data << "\\"\\n";
        delete[] data;
    }

    // Copy constructor
    MyString(const MyString& other) {
        length = other.length;
        data = new char[length + 1];
        strcpy(data, other.data);
        cout << "Copied: \\"" << data << "\\"\\n";
    }

    // Copy assignment operator
    MyString& operator=(const MyString& other) {
        if (this != &other) {
            delete[] data;
            length = other.length;
            data = new char[length + 1];
            strcpy(data, other.data);
        }
        cout << "Assigned: \\"" << data << "\\"\\n";
        return *this;
    }

    void print() const { cout << data << "\\n"; }
};

int main() {
    MyString s1("Hello");
    MyString s2 = s1;       // Copy constructor
    MyString s3("World");
    s3 = s1;                // Copy assignment

    s1.print();
    s2.print();
    s3.print();

    return 0;
}`,
            output: `Constructed: "Hello"
Copied: "Hello"
Constructed: "World"
Assigned: "Hello"
Hello
Hello
Hello
Destroyed: "Hello"
Destroyed: "Hello"
Destroyed: "Hello"`,
            warning: 'If you define a destructor but no copy constructor or assignment operator, the default copies will share the same pointer, leading to double-free bugs. Always follow the Rule of Three/Five.',
            codeHighlightLines: [11, 12, 13, 14, 19, 20, 21, 22, 27, 28, 29, 30, 31, 32],
          },
        ],
        quiz: [
          {
            question: 'What is the purpose of a copy constructor?',
            options: [
              'To create a new class from an existing class definition',
              'To initialize a new object as a copy of an existing object of the same type',
              'To convert an object from one type to another',
              'To deep copy only pointer members',
            ],
            correctIndex: 1,
            explanation: 'A copy constructor initializes a new object as a copy of an existing object of the same class. It takes a const reference to another object of the same type as its parameter.',
          },
          {
            question: 'What does RAII stand for and what does it guarantee?',
            options: [
              'Resource Allocation Is Immediate - resources are allocated at compile time',
              'Runtime Allocation Is Inherited - derived classes inherit resource management',
              'Resource Acquisition Is Initialization - resources are tied to object lifetime for automatic cleanup',
              'Reference And Interface Inheritance - references follow inheritance rules',
            ],
            correctIndex: 2,
            explanation: 'RAII (Resource Acquisition Is Initialization) ties resource management to object lifetime: acquire resources in the constructor, release them in the destructor. This ensures cleanup even when exceptions occur.',
          },
          {
            question: 'According to the Rule of Three, if your class defines a custom destructor, what else should it define?',
            options: [
              'A default constructor and a move constructor',
              'A copy constructor and a copy assignment operator',
              'A virtual destructor and a friend function',
              'A static factory method and a clone method',
            ],
            correctIndex: 1,
            explanation: 'The Rule of Three states that if you define any one of the destructor, copy constructor, or copy assignment operator, you should define all three, because they all deal with resource management that the compiler defaults cannot handle correctly.',
          },
          {
            question: 'What happens if you define a parameterized constructor but no default constructor?',
            options: [
              'The compiler automatically generates a default constructor',
              'The class cannot be compiled',
              'Objects of that class cannot be created without arguments',
              'The parameterized constructor is used as the default',
            ],
            correctIndex: 2,
            explanation: 'If you define any constructor, the compiler no longer generates a default constructor. To create objects without arguments, you must explicitly define or default a no-argument constructor.',
          },
        ],
        challenge: {
          prompt: 'Implement a class called DynamicArray that manages a dynamically allocated int array. Follow the Rule of Three by implementing a constructor, destructor, copy constructor, and copy assignment operator. Include a push_back method and a print method.',
          starterCode: `#include <iostream>
using namespace std;

class DynamicArray {
    int* data;
    int size;
    int capacity;

public:
    // TODO: Constructor
    DynamicArray(int cap = 4) { }

    // TODO: Destructor
    ~DynamicArray() { }

    // TODO: Copy constructor
    DynamicArray(const DynamicArray& other) { }

    // TODO: Copy assignment operator
    DynamicArray& operator=(const DynamicArray& other) { return *this; }

    // TODO: push_back
    void push_back(int val) { }

    void print() const {
        for (int i = 0; i < size; i++) cout << data[i] << " ";
        cout << "\\n";
    }
};

int main() {
    DynamicArray a;
    a.push_back(10);
    a.push_back(20);
    a.push_back(30);
    a.print();

    DynamicArray b = a; // Copy constructor
    b.push_back(40);
    b.print();
    a.print(); // Should be unchanged

    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

class DynamicArray {
    int* data;
    int size;
    int capacity;

public:
    DynamicArray(int cap = 4) : size(0), capacity(cap) {
        data = new int[capacity];
    }

    ~DynamicArray() {
        delete[] data;
    }

    DynamicArray(const DynamicArray& other)
        : size(other.size), capacity(other.capacity) {
        data = new int[capacity];
        for (int i = 0; i < size; i++) data[i] = other.data[i];
    }

    DynamicArray& operator=(const DynamicArray& other) {
        if (this != &other) {
            delete[] data;
            size = other.size;
            capacity = other.capacity;
            data = new int[capacity];
            for (int i = 0; i < size; i++) data[i] = other.data[i];
        }
        return *this;
    }

    void push_back(int val) {
        if (size >= capacity) {
            capacity *= 2;
            int* newData = new int[capacity];
            for (int i = 0; i < size; i++) newData[i] = data[i];
            delete[] data;
            data = newData;
        }
        data[size++] = val;
    }

    void print() const {
        for (int i = 0; i < size; i++) cout << data[i] << " ";
        cout << "\\n";
    }
};

int main() {
    DynamicArray a;
    a.push_back(10);
    a.push_back(20);
    a.push_back(30);
    a.print();

    DynamicArray b = a;
    b.push_back(40);
    b.print();
    a.print();

    return 0;
}`,
          hints: [
            'In the constructor, allocate data with new int[capacity] and set size to 0.',
            'In the copy constructor, allocate a new array and copy elements one by one from other.data to avoid sharing the same pointer.',
            'In the copy assignment operator, check for self-assignment (this != &other), then delete the old data before allocating and copying.',
          ],
        },
      },
      {
        id: 'inheritance',
        title: 'Inheritance',
        difficulty: 'intermediate',
        tags: ['inheritance', 'base', 'derived', 'protected', 'is-a'],
        cheatSheetSummary: 'class Derived : public Base { ... }; Derived inherits all public/protected members of Base.',
        crossLanguageId: 'inheritance',
        sections: [
          {
            heading: 'Basic Inheritance',
            content:
              'Inheritance allows a class (derived/child) to inherit members from another class (base/parent). The derived class automatically gets all public and protected members of the base class and can add its own members or override inherited behavior. Public inheritance models an "is-a" relationship: a Dog is an Animal.',
            code: `#include <iostream>
#include <string>
using namespace std;

class Animal {
protected:
    string name;
    int age;

public:
    Animal(const string& name, int age) : name(name), age(age) {}

    void eat() const {
        cout << name << " is eating.\\n";
    }

    void info() const {
        cout << name << " (age " << age << ")\\n";
    }
};

class Dog : public Animal {
    string breed;

public:
    Dog(const string& name, int age, const string& breed)
        : Animal(name, age), breed(breed) {}

    void bark() const {
        cout << name << " says: Woof!\\n";  // Can access protected 'name'
    }

    void details() const {
        info();  // Inherited from Animal
        cout << "Breed: " << breed << "\\n";
    }
};

int main() {
    Dog d("Buddy", 3, "Golden Retriever");
    d.eat();       // Inherited
    d.bark();      // Dog's own method
    d.details();

    return 0;
}`,
            output: `Buddy is eating.
Buddy says: Woof!
Buddy (age 3)
Breed: Golden Retriever`,
            analogy: 'Think of it like a family tree: a child inherits traits from a parent (eye color, height) but also develops their own unique traits. Similarly, the Dog class inherits eat() and info() from Animal but adds its own bark() method.',
            codeHighlightLines: [13, 17, 18],
            diagram: {
              kind: 'mermaid' as const,
              code: `classDiagram
    class Animal {
        #string name
        #int age
        +Animal(string, int)
        +eat() void
        +info() void
    }
    class Dog {
        -string breed
        +Dog(string, int, string)
        +bark() void
        +details() void
    }
    Animal <|-- Dog : public inheritance
    note for Dog "Inherits name, age,\\neat(), info() from Animal.\\nAdds breed and bark()."`,
              caption: 'Inheritance hierarchy: Dog extends Animal, inheriting protected members and public methods while adding its own',
            },
          },
          {
            heading: 'Access Specifiers in Inheritance',
            content:
              'The access specifier in the inheritance declaration (public, protected, or private) controls how base class members are accessible in the derived class. Public inheritance is the most common and preserves the original access levels. Protected inheritance makes public members protected. Private inheritance makes everything private.',
            code: `#include <iostream>
using namespace std;

class Base {
public:
    int pubVal = 1;
protected:
    int protVal = 2;
private:
    int privVal = 3;  // Never accessible in derived

public:
    void showAll() const {
        cout << "pub=" << pubVal << " prot=" << protVal
             << " priv=" << privVal << "\\n";
    }
};

// Public inheritance: pub->pub, prot->prot
class PubDerived : public Base {
public:
    void test() {
        cout << "pubVal: " << pubVal << "\\n";    // OK
        cout << "protVal: " << protVal << "\\n";   // OK
        // cout << privVal;  // Error: private
    }
};

int main() {
    PubDerived pd;
    pd.test();
    cout << "From outside: " << pd.pubVal << "\\n";  // OK
    // cout << pd.protVal;  // Error: protected

    pd.showAll();  // Inherited public method

    return 0;
}`,
            output: `pubVal: 1
protVal: 2
From outside: 1
pub=1 prot=2 priv=3`,
            note: 'Use public inheritance for "is-a" relationships. Protected and private inheritance are rare and model "is-implemented-in-terms-of" relationships, which composition usually handles better.',
          },
          {
            heading: 'Multiple Inheritance and the Diamond Problem',
            content:
              'C++ supports multiple inheritance, where a class inherits from more than one base class. While powerful, it can lead to the diamond problem: if two base classes share a common ancestor, the derived class gets two copies of that ancestor. Virtual inheritance solves this by ensuring only one copy of the shared base exists.',
            code: `#include <iostream>
using namespace std;

class Printable {
public:
    virtual void print() const = 0;
};

class Serializable {
public:
    virtual string serialize() const = 0;
};

// Multiple inheritance: both interfaces
class Document : public Printable, public Serializable {
    string title;
    string content;

public:
    Document(const string& t, const string& c) : title(t), content(c) {}

    void print() const override {
        cout << "[" << title << "]\\n" << content << "\\n";
    }

    string serialize() const override {
        return "{title:\\"" + title + "\\",content:\\"" + content + "\\"}";
    }
};

int main() {
    Document doc("Report", "Q4 results are positive.");
    doc.print();
    cout << "Serialized: " << doc.serialize() << "\\n";

    // Polymorphic access through either interface
    Printable* p = &doc;
    p->print();

    Serializable* s = &doc;
    cout << "Via Serializable: " << s->serialize() << "\\n";

    return 0;
}`,
            output: `[Report]
Q4 results are positive.
Serialized: {title:"Report",content:"Q4 results are positive."}
[Report]
Q4 results are positive.
Via Serializable: {title:"Report",content:"Q4 results are positive."}`,
            warning: 'Multiple inheritance with non-abstract classes can create complexity and ambiguity. Prefer single inheritance with abstract interfaces (pure virtual classes) for multiple inheritance.',
            diagram: {
              kind: 'mermaid' as const,
              code: `classDiagram
    class Printable {
        <<interface>>
        +print()* void
    }
    class Serializable {
        <<interface>>
        +serialize()* string
    }
    class Document {
        -string title
        -string content
        +print() void
        +serialize() string
    }
    Printable <|-- Document
    Serializable <|-- Document
    note for Document "Implements both interfaces\\nvia multiple inheritance.\\nCan be used through\\neither base pointer."`,
              caption: 'Multiple inheritance: Document implements both Printable and Serializable interfaces',
            },
          },
        ],
        quiz: [
          {
            question: 'What type of inheritance models an "is-a" relationship?',
            options: ['private inheritance', 'protected inheritance', 'public inheritance', 'friend inheritance'],
            correctIndex: 2,
            explanation: 'Public inheritance models an "is-a" relationship: a Dog is an Animal. Protected and private inheritance model "is-implemented-in-terms-of" relationships, which are less common.',
          },
          {
            question: 'Which access specifier allows members to be accessed by derived classes but not by outside code?',
            options: ['public', 'private', 'protected', 'friend'],
            correctIndex: 2,
            explanation: 'Protected members are accessible within the class itself and in derived classes, but not from outside code. This strikes a balance between encapsulation (private) and accessibility (public).',
          },
          {
            question: 'What is the diamond problem in multiple inheritance?',
            options: [
              'A class inherits from two unrelated classes that have methods with the same name',
              'A derived class gets two copies of a shared base class when inheriting from two classes that share that base',
              'A class cannot be instantiated because it has multiple constructors',
              'Two classes inherit from each other creating a circular dependency',
            ],
            correctIndex: 1,
            explanation: 'The diamond problem occurs when a class inherits from two classes that share a common ancestor, resulting in two copies of the ancestor. Virtual inheritance solves this by ensuring only one copy of the shared base exists.',
          },
        ],
        challenge: {
          prompt: 'Create a class hierarchy with a base class Vehicle (with protected members: make, year, and a public method info()) and two derived classes: Car (adds numDoors) and Truck (adds payload capacity). Each derived class should have its own details() method that calls the base info() and adds its own information.',
          starterCode: `#include <iostream>
#include <string>
using namespace std;

class Vehicle {
    // TODO: Add protected members and public constructor/methods
};

class Car : public Vehicle {
    // TODO: Add numDoors, constructor, and details()
};

class Truck : public Vehicle {
    // TODO: Add payloadTons, constructor, and details()
};

int main() {
    Car c("Toyota", 2023, 4);
    c.details();

    Truck t("Ford", 2022, 5.5);
    t.details();

    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

class Vehicle {
protected:
    string make;
    int year;

public:
    Vehicle(const string& m, int y) : make(m), year(y) {}

    void info() const {
        cout << make << " (" << year << ")\\n";
    }
};

class Car : public Vehicle {
    int numDoors;

public:
    Car(const string& m, int y, int doors)
        : Vehicle(m, y), numDoors(doors) {}

    void details() const {
        info();
        cout << "  Type: Car, Doors: " << numDoors << "\\n";
    }
};

class Truck : public Vehicle {
    double payloadTons;

public:
    Truck(const string& m, int y, double payload)
        : Vehicle(m, y), payloadTons(payload) {}

    void details() const {
        info();
        cout << "  Type: Truck, Payload: " << payloadTons << " tons\\n";
    }
};

int main() {
    Car c("Toyota", 2023, 4);
    c.details();

    Truck t("Ford", 2022, 5.5);
    t.details();

    return 0;
}`,
          hints: [
            'Use the protected access specifier for base class members that derived classes need to access.',
            'In the derived class constructor, call the base class constructor via the member initializer list: Car(...) : Vehicle(m, y), numDoors(doors) {}',
            'The details() method can call the inherited info() method and then print additional derived-class-specific data.',
          ],
        },
      },
      {
        id: 'polymorphism',
        title: 'Polymorphism',
        difficulty: 'intermediate',
        tags: ['virtual', 'override', 'polymorphism', 'vtable', 'dynamic-dispatch'],
        cheatSheetSummary: 'Use virtual methods + override for runtime polymorphism. Base* ptr = &derived; ptr->method() calls derived version.',
        crossLanguageId: 'polymorphism',
        sections: [
          {
            heading: 'Virtual Functions',
            content:
              'Polymorphism allows you to call methods on a base class pointer or reference and have the correct derived class method execute at runtime. This is achieved through virtual functions. When a function is declared virtual in the base class, the compiler uses a virtual table (vtable) to determine which implementation to call based on the actual object type, not the pointer type.',
            code: `#include <iostream>
#include <string>
#include <vector>
#include <memory>
using namespace std;

class Shape {
protected:
    string name;

public:
    Shape(const string& n) : name(n) {}

    // Virtual function: can be overridden
    virtual double area() const {
        return 0.0;
    }

    virtual void describe() const {
        cout << name << " with area " << area() << "\\n";
    }

    // Virtual destructor: essential for polymorphic base classes
    virtual ~Shape() = default;
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : Shape("Circle"), radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
};

class Rectangle : public Shape {
    double w, h;
public:
    Rectangle(double w, double h) : Shape("Rectangle"), w(w), h(h) {}
    double area() const override { return w * h; }
};

int main() {
    vector<unique_ptr<Shape>> shapes;
    shapes.push_back(make_unique<Circle>(5.0));
    shapes.push_back(make_unique<Rectangle>(4.0, 6.0));
    shapes.push_back(make_unique<Circle>(3.0));

    // Polymorphic calls: correct area() is called for each type
    double totalArea = 0;
    for (const auto& shape : shapes) {
        shape->describe();
        totalArea += shape->area();
    }
    cout << "Total area: " << totalArea << "\\n";

    return 0;
}`,
            output: `Circle with area 78.5397
Rectangle with area 24
Circle with area 28.2743
Total area: 130.814`,
            warning: 'Always declare a virtual destructor in polymorphic base classes. Without it, deleting a derived object through a base pointer is undefined behavior and causes memory leaks.',
            analogy: 'Think of it like a universal remote control: you press the "play" button (call area()), and the remote figures out which device (Circle, Rectangle) is connected and sends the right signal. The virtual table is the internal lookup that maps the button press to the correct device action.',
            codeHighlightLines: [12, 13, 28, 35],
            diagram: {
              kind: 'custom' as const,
              type: 'memory-layout' as const,
              data: {
                title: 'Virtual Table (vtable) Dispatch',
                sections: [
                  {
                    label: 'Shape* ptr = new Circle(5.0)',
                    entries: [
                      { offset: 'ptr', label: 'vptr', value: '-> Circle vtable', color: '#60a5fa' },
                      { offset: '+8', label: 'name', value: '"Circle"', color: '#a78bfa' },
                      { offset: '+40', label: 'radius', value: '5.0', color: '#34d399' },
                    ],
                  },
                  {
                    label: 'Circle vtable',
                    entries: [
                      { offset: '[0]', label: 'area()', value: '-> Circle::area', color: '#f97316' },
                      { offset: '[1]', label: 'describe()', value: '-> Shape::describe', color: '#f97316' },
                      { offset: '[2]', label: '~destructor', value: '-> Circle::~Circle', color: '#f97316' },
                    ],
                  },
                ],
              },
              caption: 'Each polymorphic object has a hidden vptr pointing to its class vtable, enabling dynamic dispatch of virtual function calls',
            },
          },
          {
            heading: 'Override and Final Keywords',
            content:
              'The override keyword (C++11) explicitly tells the compiler you intend to override a virtual function. If there is no matching virtual function in the base class, the compiler reports an error, catching typos and signature mismatches. The final keyword prevents further overriding in derived classes.',
            code: `#include <iostream>
using namespace std;

class Base {
public:
    virtual void greet() const {
        cout << "Hello from Base\\n";
    }
    virtual void info() const {
        cout << "Base info\\n";
    }
    virtual ~Base() = default;
};

class Middle : public Base {
public:
    void greet() const override {
        cout << "Hello from Middle\\n";
    }
    // final: cannot be overridden in further derived classes
    void info() const override final {
        cout << "Middle info (final)\\n";
    }
};

class Derived : public Middle {
public:
    void greet() const override {
        cout << "Hello from Derived\\n";
    }
    // void info() const override { ... }  // Error: info is final!
};

int main() {
    Base b;
    Middle m;
    Derived d;

    Base* ptr;

    ptr = &b;
    ptr->greet();
    ptr->info();

    ptr = &m;
    ptr->greet();
    ptr->info();

    ptr = &d;
    ptr->greet();
    ptr->info();  // Calls Middle::info (final)

    return 0;
}`,
            output: `Hello from Base
Base info
Hello from Middle
Middle info (final)
Hello from Derived
Middle info (final)`,
            tip: 'Always use override when overriding virtual functions. Without it, a typo in the function name or signature silently creates a new function instead of overriding.',
          },
          {
            heading: 'Runtime Type Information (RTTI)',
            content:
              'C++ provides runtime type identification through dynamic_cast and typeid. dynamic_cast safely converts base pointers to derived pointers, returning nullptr if the conversion is invalid. typeid returns type information at runtime. These features require virtual functions to be present in the class hierarchy.',
            code: `#include <iostream>
#include <typeinfo>
using namespace std;

class Animal {
public:
    virtual void speak() const { cout << "...\\n"; }
    virtual ~Animal() = default;
};

class Dog : public Animal {
public:
    void speak() const override { cout << "Woof!\\n"; }
    void fetch() const { cout << "Fetching ball!\\n"; }
};

class Cat : public Animal {
public:
    void speak() const override { cout << "Meow!\\n"; }
    void purr() const { cout << "Purrrr...\\n"; }
};

void interact(Animal* animal) {
    cout << "Type: " << typeid(*animal).name() << "\\n";
    animal->speak();

    // Safe downcast
    if (Dog* dog = dynamic_cast<Dog*>(animal)) {
        dog->fetch();
    } else if (Cat* cat = dynamic_cast<Cat*>(animal)) {
        cat->purr();
    }
}

int main() {
    Dog d;
    Cat c;

    cout << "--- Dog ---\\n";
    interact(&d);

    cout << "\\n--- Cat ---\\n";
    interact(&c);

    return 0;
}`,
            output: `--- Dog ---
Type: 3Dog
Woof!
Fetching ball!

--- Cat ---
Type: 3Cat
Meow!
Purrrr...`,
            note: 'dynamic_cast has runtime overhead. Prefer virtual function dispatch over dynamic_cast when possible. Use dynamic_cast only when you need to access derived-class-specific interfaces.',
          },
        ],
        quiz: [
          {
            question: 'What keyword is used in C++ to enable runtime polymorphism for a member function?',
            options: ['abstract', 'override', 'virtual', 'dynamic'],
            correctIndex: 2,
            explanation: 'The virtual keyword in the base class enables dynamic dispatch. When a function is declared virtual, the compiler uses a vtable to determine which implementation to call based on the actual object type at runtime.',
          },
          {
            question: 'What happens if you forget to declare a virtual destructor in a polymorphic base class?',
            options: [
              'The program will not compile',
              'Deleting a derived object through a base pointer is undefined behavior and may cause memory leaks',
              'The destructor will still work correctly due to automatic virtual dispatch',
              'Only the derived destructor will be called, skipping the base destructor',
            ],
            correctIndex: 1,
            explanation: 'Without a virtual destructor, deleting a derived object through a base class pointer only calls the base destructor, causing undefined behavior and potential memory leaks from unfreed derived class resources.',
          },
          {
            question: 'What does dynamic_cast return when a pointer downcast fails?',
            options: ['It throws an exception', 'nullptr', 'A pointer to the base class', 'Undefined behavior'],
            correctIndex: 1,
            explanation: 'When a dynamic_cast of a pointer fails (the object is not actually of the target derived type), it returns nullptr. For references, it throws std::bad_cast instead.',
          },
          {
            question: 'What is the purpose of the override keyword in C++11?',
            options: [
              'It makes a function virtual in the derived class',
              'It explicitly tells the compiler you intend to override a base class virtual function, catching errors if no match exists',
              'It prevents the function from being overridden further',
              'It forces the function to be called at compile time instead of runtime',
            ],
            correctIndex: 1,
            explanation: 'The override keyword is a compile-time check that verifies a function actually overrides a virtual function in the base class. If no matching virtual function exists (due to a typo or wrong signature), the compiler reports an error.',
          },
        ],
        challenge: {
          prompt: 'Create a base class Shape with a pure virtual method area() and a virtual describe() method. Create derived classes Triangle (base, height) and Circle (radius) that override area(). Store them in a vector of unique_ptr<Shape> and compute the total area polymorphically.',
          starterCode: `#include <iostream>
#include <vector>
#include <memory>
using namespace std;

class Shape {
public:
    // TODO: pure virtual area(), virtual describe(), virtual destructor
};

class Triangle : public Shape {
    // TODO: members and override area()
};

class Circle : public Shape {
    // TODO: members and override area()
};

int main() {
    vector<unique_ptr<Shape>> shapes;
    // TODO: Add Triangle(6, 4) and Circle(5), then print total area
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <memory>
using namespace std;

class Shape {
public:
    virtual double area() const = 0;
    virtual void describe() const {
        cout << "Shape with area " << area() << "\\n";
    }
    virtual ~Shape() = default;
};

class Triangle : public Shape {
    double base, height;
public:
    Triangle(double b, double h) : base(b), height(h) {}
    double area() const override { return 0.5 * base * height; }
    void describe() const override {
        cout << "Triangle (" << base << " x " << height << ") area = " << area() << "\\n";
    }
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
    void describe() const override {
        cout << "Circle (r=" << radius << ") area = " << area() << "\\n";
    }
};

int main() {
    vector<unique_ptr<Shape>> shapes;
    shapes.push_back(make_unique<Triangle>(6, 4));
    shapes.push_back(make_unique<Circle>(5));

    double total = 0;
    for (const auto& s : shapes) {
        s->describe();
        total += s->area();
    }
    cout << "Total area: " << total << "\\n";

    return 0;
}`,
          hints: [
            'Declare area() as pure virtual with = 0 in the Shape base class so it cannot be instantiated directly.',
            'Use override keyword in derived classes to ensure correct function signatures.',
            'Store shapes as vector<unique_ptr<Shape>> and use make_unique<Triangle>(...) to add elements.',
          ],
        },
      },
      {
        id: 'operator-overloading',
        title: 'Operator Overloading',
        difficulty: 'intermediate',
        tags: ['operator', 'overloading', 'custom-types'],
        cheatSheetSummary: 'Define operator+, operator<<, etc. as member or friend functions to make custom types work with built-in operators.',
        sections: [
          {
            heading: 'Arithmetic Operator Overloading',
            content:
              'C++ lets you define custom behavior for operators when used with your classes. Arithmetic operators can be overloaded as member functions (left operand is the object) or as free functions (often friends for access to private members). This makes user-defined types feel as natural as built-in types.',
            code: `#include <iostream>
using namespace std;

class Vector2D {
public:
    double x, y;

    Vector2D(double x = 0, double y = 0) : x(x), y(y) {}

    // Member operator: this + other
    Vector2D operator+(const Vector2D& other) const {
        return {x + other.x, y + other.y};
    }

    Vector2D operator-(const Vector2D& other) const {
        return {x - other.x, y - other.y};
    }

    // Scalar multiplication
    Vector2D operator*(double scalar) const {
        return {x * scalar, y * scalar};
    }

    bool operator==(const Vector2D& other) const {
        return x == other.x && y == other.y;
    }

    double magnitude() const {
        return sqrt(x * x + y * y);
    }
};

// Free function: scalar * vector (reverse order)
Vector2D operator*(double scalar, const Vector2D& v) {
    return v * scalar;
}

// Stream insertion operator
ostream& operator<<(ostream& os, const Vector2D& v) {
    return os << "(" << v.x << ", " << v.y << ")";
}

int main() {
    Vector2D a(3, 4);
    Vector2D b(1, 2);

    cout << "a = " << a << "\\n";
    cout << "b = " << b << "\\n";
    cout << "a + b = " << (a + b) << "\\n";
    cout << "a - b = " << (a - b) << "\\n";
    cout << "a * 2 = " << (a * 2) << "\\n";
    cout << "3 * b = " << (3 * b) << "\\n";
    cout << "|a| = " << a.magnitude() << "\\n";
    cout << "a == b: " << (a == b) << "\\n";

    return 0;
}`,
            output: `a = (3, 4)
b = (1, 2)
a + b = (4, 6)
a - b = (2, 2)
a * 2 = (6, 8)
3 * b = (3, 6)
|a| = 5
a == b: 0`,
          },
          {
            heading: 'Comparison and Stream Operators',
            content:
              'The comparison operator <=> (spaceship operator, C++20) can generate all six comparison operators from one definition. The stream operators << and >> are commonly overloaded as friend functions to enable printing and reading custom types with cout and cin.',
            code: `#include <iostream>
#include <string>
#include <algorithm>
#include <vector>
using namespace std;

class Student {
    string name;
    double gpa;

public:
    Student(const string& n, double g) : name(n), gpa(g) {}

    // Comparison for sorting
    bool operator<(const Student& other) const {
        return gpa > other.gpa;  // Higher GPA first
    }

    // Friend: stream insertion
    friend ostream& operator<<(ostream& os, const Student& s) {
        return os << s.name << " (GPA: " << s.gpa << ")";
    }

    // Friend: stream extraction
    friend istream& operator>>(istream& is, Student& s) {
        return is >> s.name >> s.gpa;
    }
};

int main() {
    vector<Student> students = {
        {"Alice", 3.85},
        {"Bob", 3.92},
        {"Charlie", 3.78}
    };

    sort(students.begin(), students.end());

    cout << "Students by GPA (highest first):\\n";
    for (const auto& s : students) {
        cout << "  " << s << "\\n";
    }

    return 0;
}`,
            output: `Students by GPA (highest first):
  Bob (GPA: 3.92)
  Alice (GPA: 3.85)
  Charlie (GPA: 3.78)`,
          },
          {
            heading: 'Subscript and Function Call Operators',
            content:
              'The subscript operator [] and function call operator () can be overloaded to make objects behave like arrays or functions. This is the basis for functor objects and custom container types. The [] operator should return a reference for assignment.',
            code: `#include <iostream>
#include <vector>
#include <stdexcept>
using namespace std;

// Safe array with bounds checking
class SafeArray {
    vector<int> data;

public:
    SafeArray(int size, int defaultVal = 0)
        : data(size, defaultVal) {}

    // Subscript with bounds check
    int& operator[](int index) {
        if (index < 0 || index >= (int)data.size()) {
            throw out_of_range("Index out of bounds: " + to_string(index));
        }
        return data[index];
    }

    int size() const { return data.size(); }
};

// Functor: function call operator
class Multiplier {
    int factor;
public:
    Multiplier(int f) : factor(f) {}

    int operator()(int x) const {
        return x * factor;
    }
};

int main() {
    SafeArray arr(5, 0);
    arr[0] = 10;
    arr[1] = 20;
    arr[2] = 30;

    cout << "arr[0] = " << arr[0] << "\\n";
    cout << "arr[2] = " << arr[2] << "\\n";

    try {
        arr[10] = 99;
    } catch (const out_of_range& e) {
        cout << "Error: " << e.what() << "\\n";
    }

    // Functor usage
    Multiplier triple(3);
    Multiplier double_it(2);
    cout << "triple(5) = " << triple(5) << "\\n";
    cout << "double(7) = " << double_it(7) << "\\n";

    return 0;
}`,
            output: `arr[0] = 10
arr[2] = 30
Error: Index out of bounds: 10
triple(5) = 15
double(7) = 14`,
          },
        ],
        quiz: [
          {
            question: 'When overloading the + operator as a member function, what does the left operand represent?',
            options: [
              'The first parameter passed to the function',
              'The implicit this object',
              'A static member of the class',
              'It must be explicitly specified as the first parameter',
            ],
            correctIndex: 1,
            explanation: 'When an operator is overloaded as a member function, the left operand is the implicit this object. For example, a + b calls a.operator+(b), where a is this and b is the parameter.',
          },
          {
            question: 'Why is operator<< for stream output typically defined as a friend function rather than a member function?',
            options: [
              'Member functions cannot return references',
              'The left operand is an ostream, not the class itself, so it cannot be a member of the class',
              'Friend functions are faster than member functions',
              'The << operator cannot be overloaded as a member',
            ],
            correctIndex: 1,
            explanation: 'For cout << obj, the left operand is ostream, not your class. Since you cannot add member functions to ostream, operator<< must be a free function. It is declared as a friend to access private members.',
          },
          {
            question: 'What is a functor (function object) in C++?',
            options: [
              'A function pointer stored in a variable',
              'An object that overloads the () operator and can be called like a function',
              'A lambda expression converted to a function pointer',
              'A template function that takes another function as a parameter',
            ],
            correctIndex: 1,
            explanation: 'A functor is a class that overloads operator(), allowing its instances to be called like functions. Unlike function pointers, functors can carry state in their member variables.',
          },
        ],
        challenge: {
          prompt: 'Create a Fraction class with numerator and denominator. Overload +, ==, and << operators. The + operator should add two fractions (you do not need to simplify), == should compare them, and << should print them as "num/den".',
          starterCode: `#include <iostream>
using namespace std;

class Fraction {
    int num, den;

public:
    Fraction(int n = 0, int d = 1) : num(n), den(d) {}

    // TODO: operator+
    // TODO: operator==
    // TODO: friend operator<<
};

int main() {
    Fraction a(1, 2);
    Fraction b(1, 3);
    Fraction c = a + b;
    cout << a << " + " << b << " = " << c << endl;
    cout << "a == b: " << (a == b) << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

class Fraction {
    int num, den;

public:
    Fraction(int n = 0, int d = 1) : num(n), den(d) {}

    Fraction operator+(const Fraction& other) const {
        return Fraction(num * other.den + other.num * den, den * other.den);
    }

    bool operator==(const Fraction& other) const {
        return num * other.den == other.num * den;
    }

    friend ostream& operator<<(ostream& os, const Fraction& f) {
        return os << f.num << "/" << f.den;
    }
};

int main() {
    Fraction a(1, 2);
    Fraction b(1, 3);
    Fraction c = a + b;
    cout << a << " + " << b << " = " << c << endl;
    cout << "a == b: " << (a == b) << endl;
    return 0;
}`,
          hints: [
            'To add fractions a/b + c/d, the result is (a*d + c*b) / (b*d).',
            'To compare fractions for equality without simplifying, check if a*d == c*b (cross multiplication).',
            'Declare operator<< as a friend function so it can access the private num and den members.',
          ],
        },
      },
      {
        id: 'abstract-classes',
        title: 'Abstract Classes',
        difficulty: 'intermediate',
        tags: ['abstract', 'pure-virtual', 'interface', 'base-class'],
        cheatSheetSummary: 'A class with at least one pure virtual function (= 0) is abstract and cannot be instantiated.',
        crossLanguageId: 'abstract-classes',
        sections: [
          {
            heading: 'Pure Virtual Functions',
            content:
              'A pure virtual function is declared with = 0 and has no implementation in the base class. Any class containing at least one pure virtual function becomes abstract and cannot be instantiated directly. Derived classes must override all pure virtual functions to become concrete (instantiable). Abstract classes define interfaces that derived classes must implement.',
            code: `#include <iostream>
#include <string>
#include <vector>
#include <memory>
using namespace std;

// Abstract class (interface)
class Drawable {
public:
    virtual void draw() const = 0;          // Pure virtual
    virtual string name() const = 0;        // Pure virtual
    virtual ~Drawable() = default;

    // Abstract classes can have non-pure methods
    void drawWithBorder() const {
        cout << "--- ";
        draw();
        cout << " ---\\n";
    }
};

class Circle : public Drawable {
    double radius;
public:
    Circle(double r) : radius(r) {}
    void draw() const override {
        cout << "Drawing circle (r=" << radius << ")";
    }
    string name() const override { return "Circle"; }
};

class Square : public Drawable {
    double side;
public:
    Square(double s) : side(s) {}
    void draw() const override {
        cout << "Drawing square (" << side << "x" << side << ")";
    }
    string name() const override { return "Square"; }
};

int main() {
    // Drawable d;  // Error: cannot instantiate abstract class

    vector<unique_ptr<Drawable>> shapes;
    shapes.push_back(make_unique<Circle>(5.0));
    shapes.push_back(make_unique<Square>(3.0));

    for (const auto& shape : shapes) {
        cout << shape->name() << ": ";
        shape->draw();
        cout << "\\n";
        shape->drawWithBorder();
    }

    return 0;
}`,
            output: `Circle: Drawing circle (r=5)
--- Drawing circle (r=5) ---
Square: Drawing square (3x3)
--- Drawing square (3x3) ---`,
          },
          {
            heading: 'Interface Pattern',
            content:
              'C++ does not have a dedicated interface keyword, but the convention is to create classes with only pure virtual functions and a virtual destructor. This is called an interface. Classes can implement multiple interfaces through multiple inheritance, achieving a flexible design similar to Java and C# interfaces.',
            code: `#include <iostream>
#include <string>
using namespace std;

// Interface: printable
class IPrintable {
public:
    virtual void print(ostream& os) const = 0;
    virtual ~IPrintable() = default;
};

// Interface: comparable
class IComparable {
public:
    virtual int compareTo(const IComparable& other) const = 0;
    virtual ~IComparable() = default;
};

class Employee : public IPrintable, public IComparable {
    string name;
    int id;

public:
    Employee(const string& n, int i) : name(n), id(i) {}

    void print(ostream& os) const override {
        os << "Employee(" << name << ", #" << id << ")";
    }

    int compareTo(const IComparable& other) const override {
        const Employee& e = dynamic_cast<const Employee&>(other);
        return id - e.id;
    }

    int getId() const { return id; }
};

// Free function using the interface
ostream& operator<<(ostream& os, const IPrintable& obj) {
    obj.print(os);
    return os;
}

int main() {
    Employee e1("Alice", 101);
    Employee e2("Bob", 102);

    cout << e1 << "\\n";
    cout << e2 << "\\n";

    int cmp = e1.compareTo(e2);
    if (cmp < 0) cout << "Alice comes before Bob\\n";
    else if (cmp > 0) cout << "Bob comes before Alice\\n";
    else cout << "Same position\\n";

    return 0;
}`,
            output: `Employee(Alice, #101)
Employee(Bob, #102)
Alice comes before Bob`,
            tip: 'Name interfaces with an I prefix (IPrintable, ISerializable) to distinguish them from concrete classes. This is a common convention in many C++ codebases.',
          },
        ],
        quiz: [
          {
            question: 'What makes a class abstract in C++?',
            options: [
              'Using the abstract keyword before the class name',
              'Declaring the class inside a namespace',
              'Having at least one pure virtual function (= 0)',
              'Making the constructor private',
            ],
            correctIndex: 2,
            explanation: 'A class becomes abstract when it has at least one pure virtual function, declared with = 0. Abstract classes cannot be instantiated directly; derived classes must override all pure virtual functions to become concrete.',
          },
          {
            question: 'Can an abstract class have non-pure (regular) virtual methods with implementations?',
            options: [
              'No, all methods in an abstract class must be pure virtual',
              'Yes, abstract classes can mix pure virtual and implemented methods',
              'Only if they are declared as static methods',
              'Only if they are declared as friend functions',
            ],
            correctIndex: 1,
            explanation: 'Abstract classes can have both pure virtual functions (= 0) and regular implemented methods. This allows the base class to provide common functionality while requiring derived classes to implement the pure virtual parts.',
          },
          {
            question: 'How is an interface typically implemented in C++ (since there is no interface keyword)?',
            options: [
              'Using a struct with all public members',
              'Using a class with only pure virtual functions and a virtual destructor',
              'Using a template class with no members',
              'Using a namespace with free functions',
            ],
            correctIndex: 1,
            explanation: 'In C++, an interface is conventionally a class with only pure virtual functions and a virtual destructor. Classes implement the interface by publicly inheriting from it and overriding all pure virtual functions.',
          },
        ],
        challenge: {
          prompt: 'Define an interface ILogger with pure virtual methods log(const string& message) and getLogCount(). Implement two concrete classes: ConsoleLogger (prints to cout) and CountingLogger (counts messages without printing). Both should track how many times log() is called.',
          starterCode: `#include <iostream>
#include <string>
using namespace std;

class ILogger {
public:
    // TODO: pure virtual log() and getLogCount()
    virtual ~ILogger() = default;
};

class ConsoleLogger : public ILogger {
    // TODO: implement
};

class CountingLogger : public ILogger {
    // TODO: implement
};

int main() {
    ConsoleLogger cl;
    cl.log("Hello");
    cl.log("World");
    cout << "Console logs: " << cl.getLogCount() << endl;

    CountingLogger cnt;
    cnt.log("msg1");
    cnt.log("msg2");
    cnt.log("msg3");
    cout << "Counting logs: " << cnt.getLogCount() << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

class ILogger {
public:
    virtual void log(const string& message) = 0;
    virtual int getLogCount() const = 0;
    virtual ~ILogger() = default;
};

class ConsoleLogger : public ILogger {
    int count = 0;
public:
    void log(const string& message) override {
        cout << "[LOG] " << message << "\\n";
        count++;
    }
    int getLogCount() const override { return count; }
};

class CountingLogger : public ILogger {
    int count = 0;
public:
    void log(const string& message) override {
        count++;
    }
    int getLogCount() const override { return count; }
};

int main() {
    ConsoleLogger cl;
    cl.log("Hello");
    cl.log("World");
    cout << "Console logs: " << cl.getLogCount() << endl;

    CountingLogger cnt;
    cnt.log("msg1");
    cnt.log("msg2");
    cnt.log("msg3");
    cout << "Counting logs: " << cnt.getLogCount() << endl;
    return 0;
}`,
          hints: [
            'Declare both log() and getLogCount() as pure virtual (= 0) in the ILogger interface.',
            'Each concrete class needs its own count member variable incremented in log().',
            'ConsoleLogger prints the message to cout, while CountingLogger simply increments the counter.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Memory Management                                            */
  /* ------------------------------------------------------------ */
  {
    id: 'memory-management',
    label: 'Memory Management',
    icon: 'HardDrive',
    entries: [
      {
        id: 'pointers',
        title: 'Pointers',
        difficulty: 'intermediate',
        tags: ['pointer', 'address', 'dereference', 'nullptr'],
        cheatSheetSummary: 'int* p = &x; stores the address of x. *p dereferences (gets the value). nullptr for null pointers.',
        crossLanguageId: 'pointers',
        sections: [
          {
            heading: 'Pointer Basics',
            content:
              'A pointer is a variable that stores the memory address of another variable. The address-of operator & gets the address of a variable, and the dereference operator * accesses the value at that address. Pointers are declared with the * symbol after the type. They are fundamental to C++ and used for dynamic memory, arrays, polymorphism, and interacting with hardware.',
            code: `#include <iostream>
using namespace std;

int main() {
    int x = 42;
    int* ptr = &x;  // ptr stores the address of x

    cout << "Value of x: " << x << "\\n";
    cout << "Address of x: " << &x << "\\n";
    cout << "Value of ptr: " << ptr << "\\n";
    cout << "Dereferenced ptr: " << *ptr << "\\n";

    // Modify through pointer
    *ptr = 100;
    cout << "After *ptr = 100, x = " << x << "\\n";

    // Null pointer
    int* null_ptr = nullptr;
    cout << "Null pointer: " << null_ptr << "\\n";

    if (null_ptr == nullptr) {
        cout << "Pointer is null - do not dereference!\\n";
    }

    // Pointer to pointer
    int** pp = &ptr;
    cout << "**pp = " << **pp << "\\n";

    return 0;
}`,
            output: `Value of x: 42
Address of x: 0x7ffd5e8a3c14
Value of ptr: 0x7ffd5e8a3c14
Dereferenced ptr: 42
After *ptr = 100, x = 100
Null pointer: 0
Pointer is null - do not dereference!
**pp = 100`,
            warning: 'Dereferencing a null pointer or a dangling pointer (pointing to freed memory) is undefined behavior. Always check pointers before dereferencing.',
            analogy: 'Think of it like a home address written on a sticky note: the pointer is the sticky note holding the address, &x gives you the address to write down, and *ptr is like driving to that address and looking at what is inside the house.',
            codeHighlightLines: [3, 4, 11],
            diagram: {
              kind: 'custom' as const,
              type: 'memory-layout' as const,
              data: {
                title: 'Pointer Memory Layout',
                sections: [
                  {
                    label: 'Stack Frame',
                    entries: [
                      { offset: '0x3c14', label: 'x', value: '42', color: '#34d399' },
                      { offset: '0x3c18', label: 'ptr', value: '0x3c14 (-> x)', color: '#60a5fa' },
                      { offset: '0x3c20', label: 'pp', value: '0x3c18 (-> ptr)', color: '#f97316' },
                    ],
                  },
                  {
                    label: 'After *ptr = 100',
                    entries: [
                      { offset: '0x3c14', label: 'x', value: '100 (modified via ptr)', color: '#f87171' },
                      { offset: '0x3c18', label: 'ptr', value: '0x3c14 (unchanged)', color: '#60a5fa' },
                    ],
                  },
                ],
              },
              caption: 'ptr holds the address of x. Dereferencing ptr (*ptr) reads or writes the value at that address. pp is a pointer-to-pointer, holding the address of ptr.',
            },
          },
          {
            heading: 'Pointers and Arrays',
            content:
              'Arrays and pointers are closely related in C++. An array name decays to a pointer to its first element. Pointer arithmetic lets you navigate through array elements: incrementing a pointer moves it to the next element. This relationship is the basis for much of C and C++ programming.',
            code: `#include <iostream>
using namespace std;

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int* ptr = arr;  // Points to first element

    cout << "Array via pointer:\\n";
    for (int i = 0; i < 5; i++) {
        cout << "  ptr[" << i << "] = " << ptr[i]
             << "  *(ptr+" << i << ") = " << *(ptr + i) << "\\n";
    }

    // Pointer arithmetic
    cout << "\\nPointer arithmetic:\\n";
    int* start = arr;
    int* end = arr + 5;
    cout << "Elements between start and end: " << (end - start) << "\\n";

    // Iterating with pointer
    cout << "Via pointer iteration: ";
    for (int* p = arr; p != arr + 5; p++) {
        cout << *p << " ";
    }
    cout << "\\n";

    // Passing array to function is passing a pointer
    auto sum = [](const int* arr, int n) {
        int total = 0;
        for (int i = 0; i < n; i++) total += arr[i];
        return total;
    };
    cout << "Sum: " << sum(arr, 5) << "\\n";

    return 0;
}`,
            output: `Array via pointer:
  ptr[0] = 10  *(ptr+0) = 10
  ptr[1] = 20  *(ptr+1) = 20
  ptr[2] = 30  *(ptr+2) = 30
  ptr[3] = 40  *(ptr+3) = 40
  ptr[4] = 50  *(ptr+4) = 50

Pointer arithmetic:
Elements between start and end: 5
Via pointer iteration: 10 20 30 40 50
Sum: 150`,
            diagram: {
              kind: 'custom' as const,
              type: 'array' as const,
              data: {
                title: 'Array-Pointer Relationship',
                elements: [
                  { value: '10', label: 'arr[0]', highlight: true },
                  { value: '20', label: 'arr[1]' },
                  { value: '30', label: 'arr[2]' },
                  { value: '40', label: 'arr[3]' },
                  { value: '50', label: 'arr[4]' },
                ],
                pointers: [
                  { label: 'ptr (= arr)', index: 0 },
                  { label: 'ptr + 2', index: 2 },
                  { label: 'arr + 5 (end)', index: 5 },
                ],
                caption: 'arr decays to a pointer to element [0]. Pointer arithmetic moves in units of sizeof(int).',
              },
              caption: 'Array name decays to a pointer to its first element. ptr[i] and *(ptr + i) are equivalent.',
            },
          },
          {
            heading: 'Function Pointers',
            content:
              'Function pointers store the address of a function and can be used to call functions dynamically, implement callbacks, and create dispatch tables. The syntax can be complex, but type aliases (using/typedef) simplify it. Lambdas without captures can be implicitly converted to function pointers.',
            code: `#include <iostream>
#include <string>
using namespace std;

int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }

// Type alias for clarity
using BinaryOp = int(*)(int, int);

void applyAndPrint(BinaryOp op, int a, int b, const string& name) {
    cout << name << "(" << a << ", " << b << ") = " << op(a, b) << "\\n";
}

int main() {
    // Function pointer
    int (*funcPtr)(int, int) = add;
    cout << "Via pointer: " << funcPtr(3, 4) << "\\n";

    // Using type alias
    BinaryOp ops[] = {add, subtract, multiply};
    string names[] = {"add", "subtract", "multiply"};

    for (int i = 0; i < 3; i++) {
        applyAndPrint(ops[i], 10, 3, names[i]);
    }

    // Lambda as function pointer (no captures)
    BinaryOp divide = [](int a, int b) -> int { return a / b; };
    applyAndPrint(divide, 10, 3, "divide");

    return 0;
}`,
            output: `Via pointer: 7
add(10, 3) = 13
subtract(10, 3) = 7
multiply(10, 3) = 30
divide(10, 3) = 3`,
          },
        ],
        quiz: [
          {
            question: 'What does the dereference operator (*) do when applied to a pointer?',
            options: [
              'Returns the memory address stored in the pointer',
              'Accesses the value at the memory address the pointer holds',
              'Multiplies the pointer by a value',
              'Creates a new pointer to the same address',
            ],
            correctIndex: 1,
            explanation: 'The dereference operator (*) accesses the value stored at the memory address held by the pointer. For example, if ptr points to an int with value 42, *ptr evaluates to 42.',
          },
          {
            question: 'What is the result of pointer arithmetic: if int* p points to arr[0], what does p + 3 point to?',
            options: [
              'The memory address 3 bytes after arr[0]',
              'arr[3] (the fourth element)',
              'The value of arr[0] plus 3',
              'A null pointer',
            ],
            correctIndex: 1,
            explanation: 'Pointer arithmetic works in units of the pointed-to type size. p + 3 advances the pointer by 3 * sizeof(int) bytes, pointing to arr[3], the fourth element of the array.',
          },
          {
            question: 'What value should an uninitialized or freed pointer be set to in modern C++?',
            options: ['NULL', '0', 'nullptr', 'void'],
            correctIndex: 2,
            explanation: 'In modern C++ (C++11 and later), nullptr is the preferred way to represent a null pointer. Unlike NULL (which is typically 0), nullptr has type std::nullptr_t and avoids ambiguity with integer 0 in overloaded functions.',
          },
          {
            question: 'Can a lambda with captures be implicitly converted to a function pointer?',
            options: [
              'Yes, all lambdas can be converted to function pointers',
              'No, only lambdas without captures can be converted to function pointers',
              'Yes, but only if the lambda captures by reference',
              'No, lambdas can never be used as function pointers',
            ],
            correctIndex: 1,
            explanation: 'Only capture-less lambdas can be implicitly converted to function pointers. Lambdas with captures have associated state that a plain function pointer cannot represent, so they require std::function or templates instead.',
          },
        ],
        challenge: {
          prompt: 'Write a function called reverseArray that takes an int pointer and a size, and reverses the array in place using pointer arithmetic (not array indexing). Demonstrate it in main by reversing and printing an array.',
          starterCode: `#include <iostream>
using namespace std;

void reverseArray(int* arr, int size) {
    // TODO: Use pointer arithmetic to reverse the array in place
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int size = 5;

    reverseArray(arr, size);

    cout << "Reversed: ";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

void reverseArray(int* arr, int size) {
    int* left = arr;
    int* right = arr + size - 1;
    while (left < right) {
        int temp = *left;
        *left = *right;
        *right = temp;
        left++;
        right--;
    }
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int size = 5;

    reverseArray(arr, size);

    cout << "Reversed: ";
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    return 0;
}`,
          hints: [
            'Create two pointers: one pointing to the first element (arr) and one pointing to the last element (arr + size - 1).',
            'Swap the values at the two pointers using dereference (*left, *right), then move them toward each other.',
            'Continue swapping while the left pointer is less than the right pointer.',
          ],
        },
      },
      {
        id: 'references',
        title: 'References',
        difficulty: 'intermediate',
        tags: ['reference', 'alias', 'const-ref', 'lvalue'],
        cheatSheetSummary: 'int& ref = x; creates an alias for x. Must be initialized and cannot be reseated. Prefer over pointers.',
        sections: [
          {
            heading: 'Reference Basics',
            content:
              'A reference is an alias for an existing variable. Once initialized, it cannot be changed to refer to a different variable (it cannot be "reseated"). Unlike pointers, references cannot be null, must be initialized at declaration, and do not require dereferencing. They are the preferred way to pass and return large objects in C++.',
            code: `#include <iostream>
using namespace std;

int main() {
    int x = 42;
    int& ref = x;  // ref is an alias for x

    cout << "x = " << x << "\\n";
    cout << "ref = " << ref << "\\n";
    cout << "Address of x: " << &x << "\\n";
    cout << "Address of ref: " << &ref << "\\n";  // Same address

    // Modifying through reference modifies the original
    ref = 100;
    cout << "After ref = 100, x = " << x << "\\n";

    // Reference must be initialized
    // int& bad;  // Error: reference must be initialized

    // Reference cannot be reseated
    int y = 200;
    ref = y;  // This assigns y's value to x, doesn't reseat ref
    cout << "After ref = y, x = " << x << "\\n";  // x is now 200
    cout << "y = " << y << "\\n";  // y is still 200

    return 0;
}`,
            output: `x = 42
ref = 42
Address of x: 0x7ffd5e8a3c14
Address of ref: 0x7ffd5e8a3c14
After ref = 100, x = 100
After ref = y, x = 200
y = 200`,
          },
          {
            heading: 'Const References',
            content:
              'A const reference (const T&) cannot be used to modify the referred-to value. Const references can bind to temporaries (rvalues), which regular references cannot. This is why function parameters for read-only access should always be const references, especially for strings and containers.',
            code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// By value: copies the string
int lengthByVal(string s) { return s.length(); }

// By const reference: no copy, no modification
int lengthByRef(const string& s) { return s.length(); }

// const ref can bind to temporaries
void print(const string& s) { cout << s << "\\n"; }

double average(const vector<double>& v) {
    double sum = 0;
    for (double x : v) sum += x;
    return sum / v.size();
}

int main() {
    string name = "Hello, World!";
    cout << "Length (val): " << lengthByVal(name) << "\\n";
    cout << "Length (ref): " << lengthByRef(name) << "\\n";

    // Const ref binds to temporary
    print("Temporary string");  // OK with const ref
    // string& bad = "temp";    // Error: non-const ref cannot bind to temp

    const int& ref = 42;  // OK: const ref extends temporary's lifetime
    cout << "Const ref to temp: " << ref << "\\n";

    vector<double> grades = {3.5, 3.8, 3.2, 3.9};
    cout << "Average: " << average(grades) << "\\n";

    return 0;
}`,
            output: `Length (val): 13
Length (ref): 13
Temporary string
Const ref to temp: 42
Average: 3.6`,
            tip: 'Always pass strings and containers as const& unless you need to modify them. This avoids unnecessary copies and is a key C++ best practice.',
          },
          {
            heading: 'Pointer vs Reference Comparison',
            content:
              'Both pointers and references provide indirect access to objects, but they have different characteristics. References are simpler and safer (no null, no reseating, no dereferencing syntax), while pointers offer more flexibility (can be null, can be reassigned, needed for dynamic memory). Choose references by default and use pointers only when you need their additional features.',
            code: `#include <iostream>
using namespace std;

void swapRef(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

void swapPtr(int* a, int* b) {
    if (!a || !b) return;  // Must check for null
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;

    // Reference version: cleaner syntax
    cout << "Before swap: x=" << x << " y=" << y << "\\n";
    swapRef(x, y);
    cout << "After swapRef: x=" << x << " y=" << y << "\\n";

    // Pointer version: need & at call site, * in function
    swapPtr(&x, &y);
    cout << "After swapPtr: x=" << x << " y=" << y << "\\n";

    /*
    Key differences:
    - References must be initialized, pointers can be null
    - References cannot be reseated, pointers can
    - References use . syntax, pointers use -> for members
    - References are safer (no null dereference risk)
    - Pointers are needed for dynamic memory (new/delete)
    */

    cout << "\\nPrefer references unless you need:\\n";
    cout << "  - Null semantics (optional argument)\\n";
    cout << "  - Reseating (pointing to different objects)\\n";
    cout << "  - Dynamic memory management\\n";

    return 0;
}`,
            output: `Before swap: x=10 y=20
After swapRef: x=20 y=10
After swapPtr: x=10 y=20

Prefer references unless you need:
  - Null semantics (optional argument)
  - Reseating (pointing to different objects)
  - Dynamic memory management`,
          },
        ],
        quiz: [
          {
            question: 'Which statement about C++ references is true?',
            options: [
              'References can be null',
              'References can be reassigned to refer to a different variable after initialization',
              'References must be initialized when declared and cannot be reseated',
              'References require the * operator to access the value they refer to',
            ],
            correctIndex: 2,
            explanation: 'References must be initialized at the point of declaration and cannot later be made to refer to a different variable. They are permanent aliases for the variable they are bound to.',
          },
          {
            question: 'Why should function parameters for read-only access use const references (const T&)?',
            options: [
              'It is required by the C++ standard for all function parameters',
              'It avoids copying the argument while preventing modification, and allows binding to temporaries',
              'It makes the function run faster by using register variables',
              'It allows the function to modify the original variable',
            ],
            correctIndex: 1,
            explanation: 'Const references avoid the cost of copying (especially for strings and containers), prevent accidental modification, and can bind to temporaries (rvalues) which non-const references cannot.',
          },
          {
            question: 'What happens when you write ref = y where ref is a reference to x?',
            options: [
              'ref now refers to y instead of x',
              'The value of y is assigned to x (through the reference)',
              'A compiler error occurs',
              'Both x and y become references to the same memory',
            ],
            correctIndex: 1,
            explanation: 'Since references cannot be reseated, ref = y does not make ref refer to y. Instead, it assigns the value of y to the variable ref refers to (which is x). After this, x holds the value of y.',
          },
        ],
        challenge: {
          prompt: 'Write a function called clamp that takes a reference to an int value, a min, and a max (all by const reference). The function should modify the value in place to be within [min, max]. Also write a printArray function that takes a const reference to a vector<int> and prints all elements.',
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

void clamp(int& value, const int& min, const int& max) {
    // TODO: Modify value to be within [min, max]
}

void printArray(const vector<int>& vec) {
    // TODO: Print all elements separated by spaces
}

int main() {
    vector<int> values = {-5, 3, 15, 7, 25, 0};
    for (int& v : values) {
        clamp(v, 0, 10);
    }
    printArray(values);
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

void clamp(int& value, const int& min, const int& max) {
    if (value < min) value = min;
    else if (value > max) value = max;
}

void printArray(const vector<int>& vec) {
    for (const int& v : vec) {
        cout << v << " ";
    }
    cout << "\\n";
}

int main() {
    vector<int> values = {-5, 3, 15, 7, 25, 0};
    for (int& v : values) {
        clamp(v, 0, 10);
    }
    printArray(values);
    return 0;
}`,
          hints: [
            'Use int& for the value parameter so modifications are reflected in the caller. Use const int& for min and max since they should not be modified.',
            'In clamp, compare value against min and max and reassign if out of bounds.',
            'In printArray, use const vector<int>& to avoid copying the vector, and iterate with a const reference loop variable.',
          ],
        },
      },
      {
        id: 'new-delete',
        title: 'New & Delete',
        difficulty: 'intermediate',
        tags: ['new', 'delete', 'heap', 'dynamic-memory', 'memory-leak'],
        cheatSheetSummary: 'int* p = new int(42); allocates on heap. delete p; frees it. Use delete[] for arrays. Prefer smart pointers.',
        sections: [
          {
            heading: 'Dynamic Memory Allocation',
            content:
              'The new operator allocates memory on the heap and returns a pointer to it. Unlike stack memory, heap memory persists until explicitly freed with delete. This allows objects to outlive the scope in which they were created. However, every new must be paired with a delete, or you get a memory leak. Use new[] for arrays and delete[] to free them.',
            code: `#include <iostream>
using namespace std;

int main() {
    // Allocate a single int
    int* p = new int(42);
    cout << "Value: " << *p << "\\n";
    delete p;  // Free the memory

    // Allocate an array
    int n = 5;
    int* arr = new int[n];
    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }
    cout << "Array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << "\\n";
    delete[] arr;  // Free array with delete[]

    // Allocate an object
    struct Point { double x, y; };
    Point* pt = new Point{3.0, 4.0};
    cout << "Point: (" << pt->x << ", " << pt->y << ")\\n";
    delete pt;

    return 0;
}`,
            output: `Value: 42
Array: 10 20 30 40 50
Point: (3, 4)`,
            warning: 'Using delete instead of delete[] for arrays, or vice versa, is undefined behavior. Always match new with delete and new[] with delete[].',
            diagram: {
              kind: 'custom' as const,
              type: 'memory-layout' as const,
              data: {
                title: 'Stack vs Heap Memory',
                sections: [
                  {
                    label: 'Stack (automatic)',
                    entries: [
                      { offset: 'local', label: 'p', value: '0x1A40 (heap addr)', color: '#60a5fa' },
                      { offset: 'local', label: 'n', value: '5', color: '#a78bfa' },
                      { offset: 'local', label: 'arr', value: '0x1B00 (heap addr)', color: '#60a5fa' },
                    ],
                  },
                  {
                    label: 'Heap (dynamic)',
                    entries: [
                      { offset: '0x1A40', label: '*p', value: '42', color: '#34d399' },
                      { offset: '0x1B00', label: 'arr[0]', value: '10', color: '#f97316' },
                      { offset: '0x1B04', label: 'arr[1]', value: '20', color: '#f97316' },
                      { offset: '0x1B08', label: 'arr[2]', value: '30', color: '#f97316' },
                      { offset: '0x1B0C', label: 'arr[3]', value: '40', color: '#f97316' },
                      { offset: '0x1B10', label: 'arr[4]', value: '50', color: '#f97316' },
                    ],
                  },
                ],
              },
              caption: 'Stack variables hold pointers to heap-allocated memory. Every new requires a matching delete to avoid memory leaks.',
            },
          },
          {
            heading: 'Common Memory Bugs',
            content:
              'Manual memory management is error-prone. The most common bugs are: memory leaks (forgetting to delete), double free (deleting the same memory twice), use-after-free (accessing memory after deleting it), and mismatched new/delete forms. These bugs cause crashes, corruption, and security vulnerabilities.',
            code: `#include <iostream>
using namespace std;

int main() {
    // Memory leak: forgot to delete
    // int* leak = new int(42);
    // ... function returns without delete leak

    // Double free: deleting twice
    // int* p = new int(42);
    // delete p;
    // delete p;  // Undefined behavior!

    // Use after free
    // int* p = new int(42);
    // delete p;
    // cout << *p;  // Undefined behavior!

    // Dangling pointer: set to nullptr after delete
    int* safe = new int(42);
    cout << "Before delete: " << *safe << "\\n";
    delete safe;
    safe = nullptr;  // Good practice

    if (safe != nullptr) {
        cout << *safe << "\\n";
    } else {
        cout << "Pointer is null, cannot dereference\\n";
    }

    // Exception safety problem
    // int* a = new int(1);
    // int* b = new int(2);  // If this throws, a leaks!
    // Solution: use smart pointers (see next entry)

    cout << "Use smart pointers to avoid these bugs!\\n";

    return 0;
}`,
            output: `Before delete: 42
Pointer is null, cannot dereference
Use smart pointers to avoid these bugs!`,
            warning: 'Every path through your code must call delete for every new. If an exception is thrown between new and delete, you get a memory leak. This is why smart pointers exist.',
          },
        ],
        quiz: [
          {
            question: 'What is the correct way to free memory allocated with new int[10]?',
            options: ['delete p;', 'delete[] p;', 'free(p);', 'delete[10] p;'],
            correctIndex: 1,
            explanation: 'Memory allocated with new[] must be freed with delete[]. Using plain delete on array memory is undefined behavior. The bracket form ensures all array elements are properly destructed.',
          },
          {
            question: 'What is a memory leak?',
            options: [
              'Accessing memory after it has been freed',
              'Freeing the same memory twice',
              'Allocated memory that is never freed because all pointers to it are lost',
              'Using more memory than the system has available',
            ],
            correctIndex: 2,
            explanation: 'A memory leak occurs when dynamically allocated memory (via new) is never freed (via delete) because the program loses all pointers to that memory. The memory remains allocated but inaccessible until the program terminates.',
          },
          {
            question: 'What is the recommended practice after deleting a raw pointer?',
            options: [
              'Immediately allocate new memory to the same pointer',
              'Set the pointer to nullptr to prevent dangling pointer usage',
              'Cast the pointer to void* for safety',
              'Nothing special is needed after delete',
            ],
            correctIndex: 1,
            explanation: 'After deleting a pointer, setting it to nullptr prevents accidental use-after-free bugs. Checking for nullptr before dereferencing can catch these errors instead of causing undefined behavior.',
          },
        ],
        challenge: {
          prompt: 'Write a function called createMatrix that dynamically allocates a 2D array (array of pointers to arrays) of given rows and cols, fills it with the product of row and column indices, prints it, and properly frees all memory. Demonstrate correct use of new[] and delete[].',
          starterCode: `#include <iostream>
using namespace std;

void createMatrix(int rows, int cols) {
    // TODO: Allocate a 2D array using new
    // TODO: Fill with row * col values
    // TODO: Print the matrix
    // TODO: Free all memory with delete[]
}

int main() {
    createMatrix(3, 4);
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

void createMatrix(int rows, int cols) {
    // Allocate array of row pointers
    int** matrix = new int*[rows];
    for (int i = 0; i < rows; i++) {
        matrix[i] = new int[cols];
    }

    // Fill with row * col
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = i * j;
        }
    }

    // Print
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            cout << matrix[i][j] << "\\t";
        }
        cout << "\\n";
    }

    // Free each row, then the row pointer array
    for (int i = 0; i < rows; i++) {
        delete[] matrix[i];
    }
    delete[] matrix;
}

int main() {
    createMatrix(3, 4);
    return 0;
}`,
          hints: [
            'First allocate an array of int* pointers with new int*[rows], then allocate each row with new int[cols].',
            'When freeing, you must delete[] each row first, then delete[] the array of row pointers -- reverse order of allocation.',
            'Use matrix[i][j] = i * j to fill each cell with the product of its row and column index.',
          ],
        },
      },
      {
        id: 'smart-pointers',
        title: 'Smart Pointers',
        difficulty: 'intermediate',
        tags: ['unique_ptr', 'shared_ptr', 'weak_ptr', 'raii', 'c++11'],
        cheatSheetSummary: 'unique_ptr: sole ownership, auto-deletes. shared_ptr: shared ownership with ref counting. Use make_unique/make_shared.',
        sections: [
          {
            heading: 'unique_ptr',
            content:
              'std::unique_ptr represents exclusive ownership of a dynamically allocated object. When the unique_ptr goes out of scope, it automatically deletes the managed object. It cannot be copied (only one owner at a time) but can be moved to transfer ownership. This is the default smart pointer you should reach for.',
            code: `#include <iostream>
#include <memory>
#include <string>
using namespace std;

class Resource {
    string name;
public:
    Resource(const string& n) : name(n) {
        cout << "Resource " << name << " created\\n";
    }
    ~Resource() {
        cout << "Resource " << name << " destroyed\\n";
    }
    void use() const { cout << "Using " << name << "\\n"; }
};

int main() {
    // Create with make_unique (preferred)
    auto r1 = make_unique<Resource>("Alpha");
    r1->use();

    // Transfer ownership with std::move
    auto r2 = move(r1);
    // r1 is now nullptr
    cout << "r1 is null: " << (r1 == nullptr) << "\\n";
    r2->use();

    // unique_ptr with custom deleter
    auto r3 = make_unique<Resource>("Beta");

    // Automatic cleanup when scope ends
    {
        auto temp = make_unique<Resource>("Temp");
        temp->use();
    }  // temp destroyed here
    cout << "After inner scope\\n";

    // unique_ptr for arrays
    auto arr = make_unique<int[]>(5);
    for (int i = 0; i < 5; i++) arr[i] = i * 10;
    cout << "Array: " << arr[0] << " " << arr[4] << "\\n";

    return 0;
}`,
            output: `Resource Alpha created
Using Alpha
r1 is null: 1
Using Alpha
Resource Beta created
Resource Temp created
Using Temp
Resource Temp destroyed
After inner scope
Array: 0 40
Resource Beta destroyed
Resource Alpha destroyed`,
            tip: 'Always use make_unique<T>() instead of unique_ptr<T>(new T()). It is exception-safe and more concise.',
            analogy: 'Think of it like a single-owner car title: only one person can hold the title at a time. You can transfer it (std::move), but you cannot photocopy it. When the title holder disposes of it, the car gets scrapped automatically.',
            codeHighlightLines: [15, 19, 20],
          },
          {
            heading: 'shared_ptr',
            content:
              'std::shared_ptr allows multiple pointers to share ownership of the same object. An internal reference count tracks how many shared_ptrs point to the object. When the last shared_ptr is destroyed, the object is deleted. Use shared_ptr when multiple parts of your code need to own the same resource.',
            code: `#include <iostream>
#include <memory>
using namespace std;

class Widget {
    int id;
public:
    Widget(int i) : id(i) { cout << "Widget " << id << " created\\n"; }
    ~Widget() { cout << "Widget " << id << " destroyed\\n"; }
    int getId() const { return id; }
};

int main() {
    auto w1 = make_shared<Widget>(1);
    cout << "Ref count: " << w1.use_count() << "\\n";

    {
        auto w2 = w1;  // Shared ownership
        cout << "Ref count: " << w1.use_count() << "\\n";

        auto w3 = w1;  // Third owner
        cout << "Ref count: " << w1.use_count() << "\\n";

        cout << "w2 id: " << w2->getId() << "\\n";
    }  // w2, w3 destroyed, but Widget survives

    cout << "Ref count after scope: " << w1.use_count() << "\\n";
    cout << "Widget still alive: " << w1->getId() << "\\n";

    w1.reset();  // Release ownership
    cout << "Ref count: " << w1.use_count() << "\\n";

    return 0;
}`,
            output: `Widget 1 created
Ref count: 1
Ref count: 2
Ref count: 3
w2 id: 1
Ref count after scope: 1
Widget still alive: 1
Widget 1 destroyed
Ref count: 0`,
            note: 'shared_ptr has overhead from the reference count (atomic operations). Use unique_ptr when exclusive ownership suffices.',
            analogy: 'Think of it like a shared Netflix account: multiple people (shared_ptrs) can use the same subscription (resource). A counter tracks how many users are active. When the last person cancels, the subscription is terminated automatically.',
            codeHighlightLines: [12, 16, 17, 19, 20],
            diagram: {
              kind: 'mermaid' as const,
              code: `graph LR
    subgraph "Scope 1"
        w1["shared_ptr w1"]
    end
    subgraph "Inner Scope (destroyed)"
        w2["shared_ptr w2"]
        w3["shared_ptr w3"]
    end
    CB["Control Block<br/>ref_count: 1→2→3→1<br/>weak_count: 0"]
    OBJ["Widget {id: 1}<br/>(heap)"]
    w1 --> CB
    w2 -.-> CB
    w3 -.-> CB
    CB --> OBJ
    style w2 stroke-dasharray: 5 5,opacity:0.5
    style w3 stroke-dasharray: 5 5,opacity:0.5
    style CB fill:#fef3c7,stroke:#f59e0b
    style OBJ fill:#d1fae5,stroke:#10b981`,
              caption: 'shared_ptr uses a control block with a reference count. When w2 and w3 are destroyed, the count drops but the Widget lives on. When w1.reset() drops the last reference, the Widget is deleted.',
            },
          },
          {
            heading: 'weak_ptr and Choosing the Right Smart Pointer',
            content:
              'std::weak_ptr is a non-owning reference to an object managed by shared_ptr. It does not increment the reference count and can detect if the object has been destroyed. It breaks circular references that would cause memory leaks with shared_ptr alone. Use the lock() method to obtain a temporary shared_ptr for access.',
            code: `#include <iostream>
#include <memory>
using namespace std;

int main() {
    weak_ptr<int> weak;

    {
        auto shared = make_shared<int>(42);
        weak = shared;  // Does not increment ref count

        // lock() creates a temporary shared_ptr
        if (auto temp = weak.lock()) {
            cout << "Value: " << *temp << "\\n";
            cout << "Ref count: " << temp.use_count() << "\\n";
        }
    }  // shared destroyed, object deleted

    // weak_ptr detects that the object is gone
    if (weak.expired()) {
        cout << "Object has been destroyed\\n";
    }

    if (auto temp = weak.lock()) {
        cout << "Still alive\\n";
    } else {
        cout << "Cannot lock: object is gone\\n";
    }

    /*
    Summary - which smart pointer to use:
    - unique_ptr: Default choice. Sole ownership.
    - shared_ptr: Multiple owners need the same object.
    - weak_ptr:   Observing without ownership (break cycles).
    - Raw pointer: Non-owning reference (borrowed, not managing lifetime).
    */

    cout << "\\nSmart Pointer Guide:\\n";
    cout << "  unique_ptr -> sole owner (default choice)\\n";
    cout << "  shared_ptr -> shared ownership\\n";
    cout << "  weak_ptr   -> break circular references\\n";

    return 0;
}`,
            output: `Value: 42
Ref count: 2
Object has been destroyed
Cannot lock: object is gone

Smart Pointer Guide:
  unique_ptr -> sole owner (default choice)
  shared_ptr -> shared ownership
  weak_ptr   -> break circular references`,
            warning: 'Circular shared_ptr references cause memory leaks because the reference count never reaches zero. Use weak_ptr for back-references or parent pointers to break cycles.',
          },
        ],
        quiz: [
          {
            question: 'What happens when a unique_ptr goes out of scope?',
            options: [
              'The pointer is set to null but the memory remains allocated',
              'The managed object is automatically deleted',
              'Ownership is transferred to a global pointer',
              'The program crashes with a segmentation fault',
            ],
            correctIndex: 1,
            explanation: 'unique_ptr automatically calls delete on the managed object when it goes out of scope. This is the core RAII behavior that prevents memory leaks without requiring manual delete calls.',
          },
          {
            question: 'How do you transfer ownership of a unique_ptr to another unique_ptr?',
            options: [
              'auto p2 = p1; (copy assignment)',
              'auto p2 = std::move(p1); (move semantics)',
              'auto p2 = p1.transfer();',
              'auto p2 = p1.release(); (raw pointer extraction)',
            ],
            correctIndex: 1,
            explanation: 'unique_ptr cannot be copied (it has deleted copy constructor/assignment). Ownership is transferred using std::move(), which leaves the original unique_ptr as nullptr.',
          },
          {
            question: 'What does weak_ptr::lock() return?',
            options: [
              'A raw pointer to the managed object',
              'A boolean indicating if the object is still alive',
              'A shared_ptr that shares ownership (or an empty shared_ptr if the object is gone)',
              'A unique_ptr with exclusive ownership of the object',
            ],
            correctIndex: 2,
            explanation: 'weak_ptr::lock() attempts to create a shared_ptr that shares ownership of the managed object. If the object has already been destroyed (all shared_ptrs are gone), it returns an empty shared_ptr.',
          },
          {
            question: 'When should you use shared_ptr instead of unique_ptr?',
            options: [
              'Always, because it is safer than unique_ptr',
              'When multiple parts of the code need to share ownership of the same dynamically allocated object',
              'When the object needs to be allocated on the stack instead of the heap',
              'When you want to avoid using the new operator',
            ],
            correctIndex: 1,
            explanation: 'shared_ptr should be used when multiple owners genuinely need to share the same resource. For exclusive ownership (which is the common case), unique_ptr is preferred because it has no reference counting overhead.',
          },
        ],
        challenge: {
          prompt: 'Create a simple object pool using smart pointers. Define a class called Connection with an id and a connect/disconnect method. Use a vector of shared_ptr<Connection> as the pool. Write a function getConnection that returns a shared_ptr from the pool and a function showPoolStatus that displays the reference count of each connection.',
          starterCode: `#include <iostream>
#include <memory>
#include <vector>
using namespace std;

class Connection {
    int id;
public:
    // TODO: constructor, destructor, connect(), disconnect(), getId()
};

// TODO: getConnection - return a shared_ptr from the pool
// TODO: showPoolStatus - print id and ref count for each connection

int main() {
    vector<shared_ptr<Connection>> pool;
    // TODO: Create 3 connections in the pool
    // TODO: Get some connections and show pool status
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <memory>
#include <vector>
using namespace std;

class Connection {
    int id;
public:
    Connection(int i) : id(i) {
        cout << "Connection " << id << " created\\n";
    }
    ~Connection() {
        cout << "Connection " << id << " destroyed\\n";
    }
    void connect() const { cout << "Connection " << id << " active\\n"; }
    void disconnect() const { cout << "Connection " << id << " closed\\n"; }
    int getId() const { return id; }
};

shared_ptr<Connection> getConnection(vector<shared_ptr<Connection>>& pool, int index) {
    if (index >= 0 && index < (int)pool.size()) {
        return pool[index]; // ref count increases
    }
    return nullptr;
}

void showPoolStatus(const vector<shared_ptr<Connection>>& pool) {
    cout << "--- Pool Status ---\\n";
    for (const auto& conn : pool) {
        cout << "  Connection " << conn->getId()
             << " ref_count: " << conn.use_count() << "\\n";
    }
}

int main() {
    vector<shared_ptr<Connection>> pool;
    for (int i = 1; i <= 3; i++) {
        pool.push_back(make_shared<Connection>(i));
    }

    showPoolStatus(pool);

    {
        auto c1 = getConnection(pool, 0);
        auto c2 = getConnection(pool, 0);
        c1->connect();
        cout << "\\nAfter getting connection 0 twice:\\n";
        showPoolStatus(pool);
    }

    cout << "\\nAfter inner scope ends:\\n";
    showPoolStatus(pool);

    return 0;
}`,
          hints: [
            'The pool is a vector<shared_ptr<Connection>>. Use make_shared<Connection>(id) to create connections.',
            'getConnection returns a copy of the shared_ptr from the pool, which increments the reference count.',
            'Use use_count() on each shared_ptr in the pool to display how many references currently exist.',
          ],
        },
      },
    ],
  },
];

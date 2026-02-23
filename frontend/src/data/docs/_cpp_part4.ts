import type { DocCategory } from './types';

export const CPP_PART4_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Templates & Modern C++                                       */
  /* ------------------------------------------------------------ */
  {
    id: 'templates-modern-cpp',
    label: 'Templates & Modern C++',
    icon: 'Layers',
    entries: [
      {
        id: 'function-templates',
        title: 'Function Templates',
        difficulty: 'intermediate',
        tags: ['template', 'generic', 'type-parameter', 'instantiation'],
        cheatSheetSummary: 'template<typename T> T max(T a, T b) { return a > b ? a : b; } -- compiler generates code for each type used.',
        sections: [
          {
            heading: 'Basic Function Templates',
            content:
              'Function templates allow you to write a single function definition that works with multiple types. The compiler generates the actual function code for each type you use it with (called template instantiation). This is the foundation of generic programming in C++, enabling type-safe code reuse without runtime overhead.',
            code: `#include <iostream>
#include <string>
using namespace std;

// Function template
template<typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

template<typename T>
void printArray(const T arr[], int size) {
    for (int i = 0; i < size; i++) {
        cout << arr[i];
        if (i < size - 1) cout << ", ";
    }
    cout << "\\n";
}

int main() {
    // Compiler deduces T from arguments
    cout << "max(3, 7) = " << maximum(3, 7) << "\\n";
    cout << "max(3.14, 2.71) = " << maximum(3.14, 2.71) << "\\n";
    cout << "max(A, Z) = " << maximum('A', 'Z') << "\\n";

    // Explicit type specification
    cout << "max<string> = " << maximum<string>("apple", "banana") << "\\n";

    int ints[] = {10, 20, 30, 40, 50};
    double dbls[] = {1.1, 2.2, 3.3};
    string strs[] = {"hello", "world"};

    printArray(ints, 5);
    printArray(dbls, 3);
    printArray(strs, 2);

    return 0;
}`,
            output: `max(3, 7) = 7
max(3.14, 2.71) = 3.14
max(A, Z) = Z
max<string> = banana
10, 20, 30, 40, 50
1.1, 2.2, 3.3
hello, world`,
            tip: 'The compiler only generates template code for the types you actually use. If you call maximum<int>, only the int version is compiled.',
            analogy: 'Think of it like a cookie cutter: the template is the cutter shape, and each type (int, double, string) is a different dough. The compiler stamps out a separate cookie for each dough type you use, but the shape logic is written only once.',
            codeHighlightLines: [5, 6, 7, 8],
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart LR
    Template["template&lt;typename T&gt;<br/>T maximum(T a, T b)"]
    Template -->|"maximum(3, 7)"| IntVer["maximum&lt;int&gt;<br/>int maximum(int, int)"]
    Template -->|"maximum(3.14, 2.71)"| DblVer["maximum&lt;double&gt;<br/>double maximum(double, double)"]
    Template -->|"maximum&lt;string&gt;(...)"| StrVer["maximum&lt;string&gt;<br/>string maximum(string, string)"]
    style Template fill:#dbeafe,stroke:#3b82f6
    style IntVer fill:#d1fae5,stroke:#10b981
    style DblVer fill:#fef3c7,stroke:#f59e0b
    style StrVer fill:#fce7f3,stroke:#ec4899`,
              caption: 'Template instantiation: the compiler generates a separate function for each type used at compile time',
            },
          },
          {
            heading: 'Templates with Multiple Type Parameters',
            content:
              'Templates can have multiple type parameters and can also mix type parameters with non-type parameters (like integers). Non-type template parameters must be compile-time constants. This enables powerful patterns like fixed-size arrays and compile-time computations.',
            code: `#include <iostream>
#include <string>
using namespace std;

// Multiple type parameters
template<typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {
    return a + b;
}

// Non-type template parameter
template<typename T, int Size>
class FixedArray {
    T data[Size];
    int count = 0;
public:
    void push(const T& val) {
        if (count < Size) data[count++] = val;
    }
    T get(int i) const { return data[i]; }
    int size() const { return count; }
    int capacity() const { return Size; }
};

template<typename T>
pair<T, T> minmax(const T& a, const T& b) {
    return (a < b) ? make_pair(a, b) : make_pair(b, a);
}

int main() {
    // Mixed types
    cout << "add(3, 4.5) = " << add(3, 4.5) << "\\n";
    cout << "add(string, char*) = " << add(string("Hello "), "World") << "\\n";

    // Fixed-size array
    FixedArray<int, 5> arr;
    arr.push(10);
    arr.push(20);
    arr.push(30);
    cout << "Capacity: " << arr.capacity() << ", Size: " << arr.size() << "\\n";
    cout << "Element 1: " << arr.get(1) << "\\n";

    // Minmax
    auto [lo, hi] = minmax(7, 3);
    cout << "min=" << lo << " max=" << hi << "\\n";

    return 0;
}`,
            output: `add(3, 4.5) = 7.5
add(string, char*) = Hello World
Capacity: 5, Size: 3
Element 1: 20
min=3 max=7`,
          },
          {
            heading: 'Template Argument Deduction',
            content:
              'In most cases, the compiler can deduce template arguments from the function arguments. However, sometimes you need to specify them explicitly, especially when the return type cannot be deduced, when there is ambiguity, or when you want a specific type. C++17 introduced class template argument deduction (CTAD) which also works for class templates.',
            code: `#include <iostream>
#include <vector>
using namespace std;

template<typename T>
T defaultValue() {
    return T{};  // Cannot deduce T - no function parameters
}

template<typename R, typename T>
R convert(T value) {
    return static_cast<R>(value);
}

int main() {
    // Must specify: no args to deduce from
    cout << "Default int: " << defaultValue<int>() << "\\n";
    cout << "Default double: " << defaultValue<double>() << "\\n";
    cout << "Default string: \\"" << defaultValue<string>() << "\\"\\n";

    // Must specify return type, input deduced
    cout << "Convert: " << convert<int>(3.14) << "\\n";
    cout << "Convert: " << convert<double>(42) << "\\n";

    // CTAD (C++17): class template argument deduction
    pair p(42, 3.14);              // deduces pair<int, double>
    vector v = {1, 2, 3, 4, 5};   // deduces vector<int>

    cout << "Pair: " << p.first << ", " << p.second << "\\n";
    cout << "Vector size: " << v.size() << "\\n";

    return 0;
}`,
            output: `Default int: 0
Default double: 0
Default string: ""
Convert: 3
Convert: 42
Pair: 42, 3.14
Vector size: 5`,
          },
        ],
        quiz: [
          {
            question: 'What does the compiler do when you call a function template with a specific type?',
            options: [
              'It interprets the template at runtime for that type',
              'It generates a separate function for that type at compile time',
              'It casts all arguments to void* internally',
              'It uses dynamic dispatch to select the right version',
            ],
            correctIndex: 1,
            explanation: 'Template instantiation happens at compile time. The compiler generates a completely separate function for each type used, which is why templates have zero runtime overhead.',
          },
          {
            question: 'What is CTAD in C++17?',
            options: [
              'Compile-Time Argument Deletion',
              'Class Template Argument Deduction',
              'Constant Template Auto Declaration',
              'Conditional Type Assignment Directive',
            ],
            correctIndex: 1,
            explanation: 'CTAD (Class Template Argument Deduction) allows the compiler to deduce template arguments for class templates from constructor arguments, e.g., pair p(42, 3.14) deduces pair<int, double>.',
          },
          {
            question: 'When must you explicitly specify template arguments?',
            options: [
              'Always, for every template call',
              'When the return type cannot be deduced from the function arguments',
              'Only when using class templates',
              'Only when using more than one type parameter',
            ],
            correctIndex: 1,
            explanation: 'You must explicitly specify template arguments when the compiler cannot deduce them from the function arguments, such as when the template parameter appears only in the return type (e.g., defaultValue<int>()).',
          },
        ],
        challenge: {
          prompt: 'Write a function template called "swapValues" that takes two references of the same type and swaps their values. Test it with int and string types.',
          starterCode: `#include <iostream>
#include <string>
using namespace std;

// Write your swapValues function template here

int main() {
    int a = 10, b = 20;
    // Call swapValues for ints
    cout << "After swap: a=" << a << " b=" << b << "\\n";

    string s1 = "hello", s2 = "world";
    // Call swapValues for strings
    cout << "After swap: s1=" << s1 << " s2=" << s2 << "\\n";

    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

template<typename T>
void swapValues(T& x, T& y) {
    T temp = x;
    x = y;
    y = temp;
}

int main() {
    int a = 10, b = 20;
    swapValues(a, b);
    cout << "After swap: a=" << a << " b=" << b << "\\n";

    string s1 = "hello", s2 = "world";
    swapValues(s1, s2);
    cout << "After swap: s1=" << s1 << " s2=" << s2 << "\\n";

    return 0;
}`,
          hints: [
            'Use template<typename T> before the function declaration',
            'Take both parameters by reference (T&) so the original values are modified',
            'Use a temporary variable of type T to perform the swap',
          ],
        },
      },
      {
        id: 'class-templates',
        title: 'Class Templates',
        difficulty: 'intermediate',
        tags: ['template', 'generic-class', 'container'],
        cheatSheetSummary: 'template<typename T> class Stack { ... }; Creates a generic class that works with any type.',
        sections: [
          {
            heading: 'Basic Class Template',
            content:
              'Class templates let you define a blueprint for a class where one or more types are parameters. The STL containers (vector, map, set) are all class templates. You define the template once and the compiler generates a separate class for each type combination you use.',
            code: `#include <iostream>
#include <stdexcept>
using namespace std;

template<typename T>
class Stack {
    static const int MAX_SIZE = 100;
    T data[MAX_SIZE];
    int topIndex = -1;

public:
    void push(const T& value) {
        if (topIndex >= MAX_SIZE - 1)
            throw overflow_error("Stack overflow");
        data[++topIndex] = value;
    }

    T pop() {
        if (isEmpty())
            throw underflow_error("Stack underflow");
        return data[topIndex--];
    }

    const T& top() const {
        if (isEmpty())
            throw underflow_error("Stack is empty");
        return data[topIndex];
    }

    bool isEmpty() const { return topIndex < 0; }
    int size() const { return topIndex + 1; }
};

int main() {
    // Stack of integers
    Stack<int> intStack;
    intStack.push(10);
    intStack.push(20);
    intStack.push(30);
    cout << "Int stack top: " << intStack.top() << "\\n";
    cout << "Popped: " << intStack.pop() << "\\n";
    cout << "Size: " << intStack.size() << "\\n";

    // Stack of strings
    Stack<string> strStack;
    strStack.push("hello");
    strStack.push("world");
    cout << "String stack top: " << strStack.top() << "\\n";

    return 0;
}`,
            output: `Int stack top: 30
Popped: 30
Size: 2
String stack top: world`,
            analogy: 'Think of it like a vending machine blueprint: you design it once, and then manufacture an integer vending machine, a string vending machine, or any other type. The internal mechanics are identical; only the product type changes.',
            codeHighlightLines: [3, 4, 5, 6],
            diagram: {
              kind: 'custom' as const,
              type: 'stack' as const,
              data: {
                title: 'Stack<int> after push(10), push(20), push(30)',
                elements: [
                  { value: '30', label: 'top (index 2)' },
                  { value: '20', label: 'index 1' },
                  { value: '10', label: 'index 0 (bottom)' },
                ],
                operations: [
                  { name: 'push(30)', description: 'Added to top' },
                  { name: 'pop()', description: 'Removes and returns 30' },
                  { name: 'top()', description: 'Returns 30 without removing' },
                ],
              },
              caption: 'Stack data structure: Last-In-First-Out (LIFO). push() adds to top, pop() removes from top, top() peeks at the top element.',
            },
          },
          {
            heading: 'Class Template with Multiple Parameters',
            content:
              'Class templates can have multiple type parameters and default template arguments. This allows creating versatile generic containers and utilities. Default template arguments work similarly to default function parameters and can simplify usage.',
            code: `#include <iostream>
#include <string>
using namespace std;

// Pair-like class with two types
template<typename K, typename V>
class KeyValue {
    K key;
    V value;

public:
    KeyValue(const K& k, const V& v) : key(k), value(v) {}
    K getKey() const { return key; }
    V getValue() const { return value; }

    friend ostream& operator<<(ostream& os, const KeyValue& kv) {
        return os << kv.key << " -> " << kv.value;
    }
};

// Template with default type
template<typename T = int, int Capacity = 10>
class Buffer {
    T data[Capacity];
    int count = 0;
public:
    bool add(const T& val) {
        if (count >= Capacity) return false;
        data[count++] = val;
        return true;
    }
    int size() const { return count; }
    int capacity() const { return Capacity; }
    const T& operator[](int i) const { return data[i]; }
};

int main() {
    KeyValue<string, int> grade("Alice", 95);
    KeyValue<int, string> lookup(404, "Not Found");
    cout << grade << "\\n";
    cout << lookup << "\\n";

    // Buffer with default type (int) and capacity (10)
    Buffer<> defaultBuf;
    defaultBuf.add(42);
    cout << "\\nDefault buffer: size=" << defaultBuf.size()
         << " cap=" << defaultBuf.capacity() << "\\n";

    // Buffer with custom type and capacity
    Buffer<string, 3> strBuf;
    strBuf.add("hello");
    strBuf.add("world");
    cout << "String buffer: size=" << strBuf.size()
         << " cap=" << strBuf.capacity() << "\\n";
    cout << "strBuf[0] = " << strBuf[0] << "\\n";

    return 0;
}`,
            output: `Alice -> 95
404 -> Not Found

Default buffer: size=1 cap=10
String buffer: size=2 cap=3
strBuf[0] = hello`,
          },
          {
            heading: 'Member Functions Outside the Class',
            content:
              'When defining member functions of a class template outside the class body, you must repeat the template parameter list. This is more verbose but keeps the class declaration clean and readable. Each member function definition is preceded by the template declaration.',
            code: `#include <iostream>
#include <vector>
using namespace std;

template<typename T>
class DynamicArray {
    vector<T> data;

public:
    void add(const T& value);
    T get(int index) const;
    int size() const;
    void print() const;
};

// Member function definitions outside the class
template<typename T>
void DynamicArray<T>::add(const T& value) {
    data.push_back(value);
}

template<typename T>
T DynamicArray<T>::get(int index) const {
    return data.at(index);
}

template<typename T>
int DynamicArray<T>::size() const {
    return data.size();
}

template<typename T>
void DynamicArray<T>::print() const {
    cout << "[";
    for (int i = 0; i < (int)data.size(); i++) {
        if (i > 0) cout << ", ";
        cout << data[i];
    }
    cout << "]\\n";
}

int main() {
    DynamicArray<int> nums;
    nums.add(10);
    nums.add(20);
    nums.add(30);
    cout << "Size: " << nums.size() << "\\n";
    nums.print();

    DynamicArray<string> words;
    words.add("hello");
    words.add("world");
    words.print();

    return 0;
}`,
            output: `Size: 3
[10, 20, 30]
[hello, world]`,
            note: 'Template definitions must be in header files (or the same translation unit) because the compiler needs to see the full template to instantiate it for each type.',
          },
        ],
        quiz: [
          {
            question: 'What is the primary advantage of using class templates?',
            options: [
              'They make code run faster at runtime',
              'They allow writing a single class definition that works with multiple types',
              'They automatically handle memory management',
              'They allow multiple inheritance',
            ],
            correctIndex: 1,
            explanation: 'Class templates let you define a blueprint for a class where one or more types are parameters. The compiler generates a separate class for each type combination used, enabling type-safe code reuse.',
          },
          {
            question: 'What does Buffer<> defaultBuf; mean when Buffer has default template parameters?',
            options: [
              'It creates an empty buffer with no type',
              'It is a syntax error',
              'It uses the default template arguments (e.g., int, 10)',
              'It creates a buffer that accepts any type',
            ],
            correctIndex: 2,
            explanation: 'The empty angle brackets <> tell the compiler to use all default template arguments. For template<typename T = int, int Capacity = 10>, Buffer<> creates a Buffer<int, 10>.',
          },
          {
            question: 'Why must template member function definitions outside the class repeat the template parameter list?',
            options: [
              'It is optional but considered best practice',
              'The compiler needs the template parameters to generate code for each type used',
              'It prevents name collisions with other classes',
              'It enables runtime polymorphism',
            ],
            correctIndex: 1,
            explanation: 'Each member function definition outside the class body must be preceded by the template declaration so the compiler knows it is a template and can generate the correct code for each instantiated type.',
          },
        ],
        challenge: {
          prompt: 'Create a class template called "MinStack" that supports push, pop, top, and getMin operations, all in O(1) time. Use two internal stacks: one for values and one to track minimums.',
          starterCode: `#include <iostream>
#include <stack>
using namespace std;

template<typename T>
class MinStack {
    // Add your member variables here
public:
    void push(const T& value) {
        // TODO
    }
    void pop() {
        // TODO
    }
    T top() const {
        // TODO
    }
    T getMin() const {
        // TODO
    }
    bool isEmpty() const {
        // TODO
    }
};

int main() {
    MinStack<int> ms;
    ms.push(5);
    ms.push(3);
    ms.push(7);
    ms.push(1);
    cout << "Min: " << ms.getMin() << "\\n"; // 1
    ms.pop();
    cout << "Min: " << ms.getMin() << "\\n"; // 3
    ms.pop();
    cout << "Min: " << ms.getMin() << "\\n"; // 3
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <stack>
using namespace std;

template<typename T>
class MinStack {
    stack<T> dataStack;
    stack<T> minStack;
public:
    void push(const T& value) {
        dataStack.push(value);
        if (minStack.empty() || value <= minStack.top()) {
            minStack.push(value);
        }
    }
    void pop() {
        if (dataStack.top() == minStack.top()) {
            minStack.pop();
        }
        dataStack.pop();
    }
    T top() const {
        return dataStack.top();
    }
    T getMin() const {
        return minStack.top();
    }
    bool isEmpty() const {
        return dataStack.empty();
    }
};

int main() {
    MinStack<int> ms;
    ms.push(5);
    ms.push(3);
    ms.push(7);
    ms.push(1);
    cout << "Min: " << ms.getMin() << "\\n"; // 1
    ms.pop();
    cout << "Min: " << ms.getMin() << "\\n"; // 3
    ms.pop();
    cout << "Min: " << ms.getMin() << "\\n"; // 3
    return 0;
}`,
          hints: [
            'Use two stacks: one for all values and one that only tracks the current minimum',
            'Push onto the min stack only when the new value is <= the current minimum',
            'When popping, also pop the min stack if the popped value equals the current minimum',
          ],
        },
      },
      {
        id: 'template-specialization',
        title: 'Template Specialization',
        difficulty: 'advanced',
        tags: ['specialization', 'partial-specialization', 'template'],
        cheatSheetSummary: 'template<> class MyClass<bool> { ... }; provides a custom implementation for a specific type.',
        sections: [
          {
            heading: 'Full Specialization',
            content:
              'Template specialization lets you provide a custom implementation for a specific type. Full specialization replaces the entire template for one particular type. This is useful when the generic algorithm does not work well for a specific type, or when a type-specific optimization is possible.',
            code: `#include <iostream>
#include <string>
#include <cstring>
using namespace std;

// Primary template
template<typename T>
class Printer {
public:
    static void print(const T& value) {
        cout << "Generic: " << value << "\\n";
    }
};

// Full specialization for bool
template<>
class Printer<bool> {
public:
    static void print(const bool& value) {
        cout << "Bool: " << (value ? "true" : "false") << "\\n";
    }
};

// Full specialization for const char*
template<>
class Printer<const char*> {
public:
    static void print(const char* const& value) {
        cout << "C-string (len " << strlen(value) << "): " << value << "\\n";
    }
};

// Function template specialization
template<typename T>
bool isEqual(const T& a, const T& b) {
    return a == b;
}

// Specialization for floating point (epsilon comparison)
template<>
bool isEqual<double>(const double& a, const double& b) {
    return fabs(a - b) < 1e-9;
}

int main() {
    Printer<int>::print(42);
    Printer<double>::print(3.14);
    Printer<bool>::print(true);
    Printer<const char*>::print("Hello");

    cout << "\\nisEqual(1, 1): " << isEqual(1, 1) << "\\n";
    cout << "isEqual(0.1+0.2, 0.3): " << isEqual(0.1 + 0.2, 0.3) << "\\n";

    return 0;
}`,
            output: `Generic: 42
Generic: 3.14
Bool: true
C-string (len 5): Hello

isEqual(1, 1): 1
isEqual(0.1+0.2, 0.3): 1`,
            analogy: 'Think of it like a restaurant with a standard recipe (the primary template) but a special preparation for customers with allergies (the specialization). The kitchen uses the default recipe for most orders, but switches to a custom one when it detects a specific dietary need.',
            codeHighlightLines: [10, 11, 12, 20, 21],
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart TD
    Call["Printer&lt;T&gt;::print(value)"]
    Call -->|"T = int"| Primary["Primary Template<br/>Generic: 42"]
    Call -->|"T = double"| Primary2["Primary Template<br/>Generic: 3.14"]
    Call -->|"T = bool"| SpecBool["Full Specialization<br/>Bool: true"]
    Call -->|"T = const char*"| SpecStr["Full Specialization<br/>C-string (len 5): Hello"]
    style Call fill:#dbeafe,stroke:#3b82f6
    style Primary fill:#d1fae5,stroke:#10b981
    style Primary2 fill:#d1fae5,stroke:#10b981
    style SpecBool fill:#fef3c7,stroke:#f59e0b
    style SpecStr fill:#fce7f3,stroke:#ec4899`,
              caption: 'The compiler selects the most specific specialization available. Full specializations override the primary template for exact type matches.',
            },
          },
          {
            heading: 'Partial Specialization',
            content:
              'Partial specialization allows you to specialize a class template for a subset of its type parameters. For example, you can specialize a template for all pointer types, or for a specific first parameter while keeping others generic. Only class templates support partial specialization; function templates cannot be partially specialized.',
            code: `#include <iostream>
#include <string>
using namespace std;

// Primary template
template<typename T>
class TypeInfo {
public:
    static string describe() { return "unknown type"; }
};

// Partial specialization for pointers
template<typename T>
class TypeInfo<T*> {
public:
    static string describe() {
        return "pointer to " + TypeInfo<T>::describe();
    }
};

// Full specializations for base types
template<> class TypeInfo<int> {
public: static string describe() { return "int"; }
};

template<> class TypeInfo<double> {
public: static string describe() { return "double"; }
};

template<> class TypeInfo<string> {
public: static string describe() { return "string"; }
};

int main() {
    cout << TypeInfo<int>::describe() << "\\n";
    cout << TypeInfo<double>::describe() << "\\n";
    cout << TypeInfo<string>::describe() << "\\n";
    cout << TypeInfo<int*>::describe() << "\\n";
    cout << TypeInfo<double**>::describe() << "\\n";
    cout << TypeInfo<char>::describe() << "\\n";

    return 0;
}`,
            output: `int
double
string
pointer to int
pointer to pointer to double
unknown type`,
            tip: 'Partial specialization is a powerful metaprogramming tool. It is the basis for type traits, SFINAE patterns, and much of the template machinery in the STL.',
          },
        ],
        quiz: [
          {
            question: 'What is the difference between full and partial template specialization?',
            options: [
              'Full specialization is for functions, partial is for classes only',
              'Full specialization replaces the template for one specific type; partial specialization specializes for a subset of type parameters',
              'Partial specialization is slower at runtime than full specialization',
              'There is no difference; they are synonyms',
            ],
            correctIndex: 1,
            explanation: 'Full specialization provides a complete custom implementation for one exact type (e.g., Printer<bool>). Partial specialization provides an implementation for a category of types (e.g., TypeInfo<T*> for all pointer types) while keeping some parameters generic.',
          },
          {
            question: 'Why was the isEqual function specialized for double?',
            options: [
              'Because doubles cannot use the == operator',
              'Because floating-point comparison with == can fail due to precision errors',
              'Because double is not a valid template parameter',
              'Because it makes the code run faster',
            ],
            correctIndex: 1,
            explanation: 'Floating-point arithmetic can introduce tiny rounding errors, so 0.1 + 0.2 does not exactly equal 0.3. The specialization uses an epsilon comparison (fabs(a - b) < 1e-9) to handle this correctly.',
          },
          {
            question: 'Can function templates be partially specialized in C++?',
            options: [
              'Yes, just like class templates',
              'No, only class templates support partial specialization',
              'Yes, but only in C++20 and later',
              'Yes, but only with constexpr functions',
            ],
            correctIndex: 1,
            explanation: 'C++ does not allow partial specialization of function templates. The workaround is to use function overloading or wrap the function in a class template that can be partially specialized.',
          },
        ],
        challenge: {
          prompt: 'Create a class template "Serializer<T>" with a static method "serialize" that converts a value to a string. Provide the primary template for generic types using to_string, and full specializations for bool (returns "true"/"false") and std::string (returns the string in quotes).',
          starterCode: `#include <iostream>
#include <string>
using namespace std;

// Primary template
template<typename T>
class Serializer {
public:
    static string serialize(const T& value) {
        // TODO: use to_string
    }
};

// Specialize for bool
// TODO

// Specialize for string
// TODO

int main() {
    cout << Serializer<int>::serialize(42) << "\\n";
    cout << Serializer<double>::serialize(3.14) << "\\n";
    cout << Serializer<bool>::serialize(true) << "\\n";
    cout << Serializer<string>::serialize("hello") << "\\n";
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

// Primary template
template<typename T>
class Serializer {
public:
    static string serialize(const T& value) {
        return to_string(value);
    }
};

// Full specialization for bool
template<>
class Serializer<bool> {
public:
    static string serialize(const bool& value) {
        return value ? "true" : "false";
    }
};

// Full specialization for string
template<>
class Serializer<string> {
public:
    static string serialize(const string& value) {
        return "\\"" + value + "\\"";
    }
};

int main() {
    cout << Serializer<int>::serialize(42) << "\\n";       // 42
    cout << Serializer<double>::serialize(3.14) << "\\n";  // 3.140000
    cout << Serializer<bool>::serialize(true) << "\\n";    // true
    cout << Serializer<string>::serialize("hello") << "\\n"; // "hello"
    return 0;
}`,
          hints: [
            'The primary template can use std::to_string() which works for numeric types',
            'For full specialization, use template<> before the class definition and specify the type in angle brackets',
          ],
        },
      },
      {
        id: 'auto-decltype',
        title: 'Auto & Decltype',
        difficulty: 'intermediate',
        tags: ['auto', 'decltype', 'type-deduction', 'c++11', 'c++14'],
        cheatSheetSummary: 'auto deduces from initializer. decltype(expr) gives the type of an expression without evaluating it.',
        sections: [
          {
            heading: 'Decltype Basics',
            content:
              'decltype inspects the declared type of an expression at compile time without evaluating it. It is useful when you need to declare a variable with the same type as another expression, or when defining return types that depend on template parameters. Combined with auto, it enables trailing return types.',
            code: `#include <iostream>
#include <vector>
#include <map>
using namespace std;

int main() {
    int x = 42;
    double y = 3.14;

    // decltype gives the type of an expression
    decltype(x) a = 100;        // int
    decltype(y) b = 2.71;       // double
    decltype(x + y) c = 45.14;  // double (int + double = double)

    cout << "a (int): " << a << "\\n";
    cout << "b (double): " << b << "\\n";
    cout << "c (double): " << c << "\\n";

    // Useful with complex types
    map<string, vector<int>> data;
    data["scores"] = {90, 85, 92};

    decltype(data)::iterator it = data.begin();
    cout << "Key: " << it->first << "\\n";

    // decltype with auto
    auto& ref = x;
    decltype(ref) ref2 = x;  // int& (preserves reference)

    ref2 = 999;
    cout << "x after ref2=999: " << x << "\\n";

    return 0;
}`,
            output: `a (int): 100
b (double): 2.71
c (double): 45.14
Key: scores
x after ref2=999: 999`,
          },
          {
            heading: 'Trailing Return Types',
            content:
              'Trailing return types (-> Type after the parameter list) allow the return type to depend on the parameter types. This is essential for template functions where the return type is not known until the parameter types are resolved. C++14 simplified this by allowing auto return type deduction.',
            code: `#include <iostream>
#include <string>
using namespace std;

// Trailing return type (C++11)
template<typename T, typename U>
auto multiply(T a, U b) -> decltype(a * b) {
    return a * b;
}

// C++14: auto return type deduction (no trailing needed)
template<typename T, typename U>
auto divide(T a, U b) {
    return a / b;
}

// decltype(auto) preserves references and cv-qualifiers
template<typename Container>
decltype(auto) front(Container& c) {
    return c.front();  // Returns reference if c.front() returns reference
}

int main() {
    cout << "multiply(3, 4.5) = " << multiply(3, 4.5) << "\\n";
    cout << "multiply(2, 3) = " << multiply(2, 3) << "\\n";
    cout << "divide(10, 3) = " << divide(10, 3) << "\\n";
    cout << "divide(10.0, 3) = " << divide(10.0, 3) << "\\n";

    vector<int> v = {10, 20, 30};
    front(v) = 99;  // Works because front returns a reference
    cout << "v[0] after modification: " << v[0] << "\\n";

    return 0;
}`,
            output: `multiply(3, 4.5) = 13.5
multiply(2, 3) = 6
divide(10, 3) = 3
divide(10.0, 3) = 3.33333
v[0] after modification: 99`,
            note: 'decltype(auto) is the most precise form of type deduction. It preserves whether the expression is a value, reference, or const reference.',
          },
        ],
        quiz: [
          {
            question: 'What does decltype(expr) do?',
            options: [
              'It evaluates the expression and returns its value',
              'It returns the type of the expression at compile time without evaluating it',
              'It converts the expression to a different type',
              'It declares a new type alias',
            ],
            correctIndex: 1,
            explanation: 'decltype inspects the declared type of an expression at compile time without evaluating it. This is useful for declaring variables with the same type as another expression or for defining return types in templates.',
          },
          {
            question: 'What is the advantage of decltype(auto) over plain auto?',
            options: [
              'It is faster at runtime',
              'It preserves references and cv-qualifiers, while auto strips them',
              'It works with older C++ standards',
              'It allows implicit type conversions',
            ],
            correctIndex: 1,
            explanation: 'decltype(auto) preserves the exact type including references and const/volatile qualifiers. Plain auto deduces the value type and strips references, which can cause unintended copies.',
          },
          {
            question: 'In C++14, what is the benefit of auto return type deduction over trailing return types?',
            options: [
              'It generates faster code',
              'It allows returning multiple types from a function',
              'It simplifies the syntax by letting the compiler deduce the return type from the return statement',
              'It enables runtime type checking',
            ],
            correctIndex: 2,
            explanation: 'C++14 allows functions to use auto as the return type, and the compiler deduces it from the return statement. This eliminates the need for the more verbose trailing return type syntax (-> decltype(...)) in many cases.',
          },
        ],
        challenge: {
          prompt: 'Write a function template "applyAndReturn" that takes a function and two arguments, applies the function to the arguments, and returns the result. Use a trailing return type with decltype to deduce the correct return type. Test it with addition (int + double) and string concatenation.',
          starterCode: `#include <iostream>
#include <string>
using namespace std;

// Write applyAndReturn with trailing return type
// TODO

int main() {
    auto sum = applyAndReturn([](int a, double b) { return a + b; }, 3, 4.5);
    cout << "Sum: " << sum << "\\n";

    auto concat = applyAndReturn([](string a, string b) { return a + " " + b; },
                                  string("Hello"), string("World"));
    cout << "Concat: " << concat << "\\n";

    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

template<typename Func, typename T, typename U>
auto applyAndReturn(Func f, T a, U b) -> decltype(f(a, b)) {
    return f(a, b);
}

int main() {
    auto sum = applyAndReturn([](int a, double b) { return a + b; }, 3, 4.5);
    cout << "Sum: " << sum << "\\n";

    auto concat = applyAndReturn([](string a, string b) { return a + " " + b; },
                                  string("Hello"), string("World"));
    cout << "Concat: " << concat << "\\n";

    return 0;
}`,
          hints: [
            'The function template needs three type parameters: Func, T, and U',
            'Use -> decltype(f(a, b)) as the trailing return type to deduce the result of calling f with a and b',
            'In C++14 you could also simply use auto without the trailing return type',
          ],
        },
      },
      {
        id: 'structured-bindings',
        title: 'Structured Bindings',
        difficulty: 'intermediate',
        tags: ['structured-bindings', 'c++17', 'destructuring', 'pair', 'tuple'],
        cheatSheetSummary: 'auto [x, y] = pair; decomposes aggregates into named variables. C++17 feature.',
        sections: [
          {
            heading: 'Decomposing Pairs and Tuples',
            content:
              'Structured bindings (C++17) let you decompose compound objects into individual named variables in a single declaration. They work with std::pair, std::tuple, arrays, and any struct with public members. This replaces verbose .first/.second or get<N>() calls with clean, readable variable names.',
            code: `#include <iostream>
#include <map>
#include <tuple>
using namespace std;

tuple<string, int, double> getStudent() {
    return {"Alice", 20, 3.85};
}

int main() {
    // Decomposing a pair
    pair<string, int> p = {"Bob", 25};
    auto [name, age] = p;
    cout << name << " is " << age << "\\n";

    // Decomposing a tuple
    auto [student, studentAge, gpa] = getStudent();
    cout << student << ", age " << studentAge << ", GPA " << gpa << "\\n";

    // With map iteration
    map<string, int> scores = {{"Alice", 95}, {"Bob", 87}, {"Charlie", 92}};

    cout << "\\nScores:\\n";
    for (const auto& [n, s] : scores) {
        cout << "  " << n << ": " << s << "\\n";
    }

    // Decomposing arrays
    int arr[] = {10, 20, 30};
    auto [x, y, z] = arr;
    cout << "\\nArray: " << x << " " << y << " " << z << "\\n";

    return 0;
}`,
            output: `Bob is 25
Alice, age 20, GPA 3.85

Scores:
  Alice: 95
  Bob: 87
  Charlie: 92

Array: 10 20 30`,
            analogy: 'Think of it like opening a gift box: instead of awkwardly reaching in and pulling items out one by one (.first, .second), you unpack everything at once and give each item its own labeled spot on the table.',
            codeHighlightLines: [7, 11, 18],
          },
          {
            heading: 'Structured Bindings with Structs and Modifications',
            content:
              'Structured bindings also work with structs that have public members. Using auto& creates references that modify the original, while auto creates copies. This pairs well with if-initializers and range-based for loops for clean, expressive code.',
            code: `#include <iostream>
#include <vector>
using namespace std;

struct Point3D {
    double x, y, z;
};

struct Result {
    bool success;
    string message;
    int code;
};

Result doWork(int input) {
    if (input > 0) return {true, "OK", 200};
    return {false, "Error: negative input", 400};
}

int main() {
    // Struct decomposition
    Point3D p{1.0, 2.0, 3.0};
    auto [x, y, z] = p;
    cout << "Point: " << x << " " << y << " " << z << "\\n";

    // Modify via reference binding
    auto& [rx, ry, rz] = p;
    rx = 10.0;
    cout << "Modified p.x: " << p.x << "\\n";

    // With function return
    auto [ok, msg, code] = doWork(42);
    cout << "Success: " << ok << ", " << msg << " (" << code << ")\\n";

    auto [ok2, msg2, code2] = doWork(-1);
    cout << "Success: " << ok2 << ", " << msg2 << " (" << code2 << ")\\n";

    // In if-initializer (C++17)
    if (auto [success, message, status] = doWork(10); success) {
        cout << "Operation succeeded: " << message << "\\n";
    }

    return 0;
}`,
            output: `Point: 1 2 3
Modified p.x: 10
Success: 1, OK (200)
Success: 0, Error: negative input (400)
Operation succeeded: OK`,
            tip: 'Structured bindings make code that works with pairs, tuples, and map entries dramatically more readable compared to .first/.second or get<>().',
          },
        ],
        quiz: [
          {
            question: 'What C++ standard introduced structured bindings?',
            options: [
              'C++11',
              'C++14',
              'C++17',
              'C++20',
            ],
            correctIndex: 2,
            explanation: 'Structured bindings were introduced in C++17. They allow decomposing compound objects like pairs, tuples, arrays, and structs into individual named variables.',
          },
          {
            question: 'What is the difference between auto [x, y] = p; and auto& [x, y] = p;?',
            options: [
              'There is no difference',
              'auto creates copies while auto& creates references that can modify the original',
              'auto& is a syntax error',
              'auto creates references while auto& creates copies',
            ],
            correctIndex: 1,
            explanation: 'Using auto [x, y] = p creates copies of the members, while auto& [x, y] = p creates references to the original members. Modifying x or y with auto& will modify the original object.',
          },
          {
            question: 'Which of the following types can be decomposed with structured bindings?',
            options: [
              'Only std::pair and std::tuple',
              'Only classes with public members',
              'std::pair, std::tuple, arrays, and any struct with public members',
              'Any type that has an iterator',
            ],
            correctIndex: 2,
            explanation: 'Structured bindings work with std::pair, std::tuple, C-style arrays, std::array, and any aggregate type (struct/class with all public non-static data members).',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes a vector of student records (as tuples of name, age, and GPA) and uses structured bindings to find and return the student with the highest GPA. Print all students using structured bindings in a range-based for loop.',
          starterCode: `#include <iostream>
#include <vector>
#include <tuple>
#include <string>
using namespace std;

using Student = tuple<string, int, double>;

Student findTopStudent(const vector<Student>& students) {
    // TODO: use structured bindings to iterate and find highest GPA
}

int main() {
    vector<Student> students = {
        {"Alice", 20, 3.8},
        {"Bob", 22, 3.9},
        {"Charlie", 21, 3.7},
        {"Diana", 20, 4.0}
    };

    // TODO: Print all students using structured bindings
    cout << "\\nAll students:\\n";

    // TODO: Find and print top student
    auto top = findTopStudent(students);
    cout << "\\nTop student: " << "\\n";

    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <tuple>
#include <string>
using namespace std;

using Student = tuple<string, int, double>;

Student findTopStudent(const vector<Student>& students) {
    Student best = students[0];
    for (const auto& [name, age, gpa] : students) {
        auto [bestName, bestAge, bestGpa] = best;
        if (gpa > bestGpa) {
            best = {name, age, gpa};
        }
    }
    return best;
}

int main() {
    vector<Student> students = {
        {"Alice", 20, 3.8},
        {"Bob", 22, 3.9},
        {"Charlie", 21, 3.7},
        {"Diana", 20, 4.0}
    };

    cout << "All students:\\n";
    for (const auto& [name, age, gpa] : students) {
        cout << "  " << name << " (age " << age << "), GPA: " << gpa << "\\n";
    }

    auto [topName, topAge, topGpa] = findTopStudent(students);
    cout << "\\nTop student: " << topName << " with GPA " << topGpa << "\\n";

    return 0;
}`,
          hints: [
            'Use const auto& [name, age, gpa] in the range-based for loop to decompose each tuple',
            'Track the best student so far and compare GPAs using the decomposed variables',
            'Use auto [name, age, gpa] = findTopStudent(...) to decompose the returned tuple',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  STL Containers                                               */
  /* ------------------------------------------------------------ */
  {
    id: 'stl-containers',
    label: 'STL Containers',
    icon: 'Package',
    entries: [
      {
        id: 'vector',
        title: 'std::vector',
        difficulty: 'beginner',
        tags: ['vector', 'dynamic-array', 'container', 'stl'],
        cheatSheetSummary: 'Dynamic array with O(1) amortized push_back and O(1) random access. The most-used STL container.',
        signature: 'template<class T, class Allocator = std::allocator<T>> class vector;',
        sections: [
          {
            heading: 'Creating and Modifying Vectors',
            content:
              'std::vector is a dynamic array that automatically manages its memory. It grows as needed when elements are added. Vectors provide O(1) random access, O(1) amortized insertion at the end (push_back), and O(n) insertion/removal in the middle. It is the most commonly used container in C++.',
            code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Creation
    vector<int> v1;                    // Empty
    vector<int> v2(5, 0);             // 5 zeros
    vector<int> v3 = {1, 2, 3, 4, 5}; // Initializer list
    vector<int> v4(v3);               // Copy

    // Adding elements
    v1.push_back(10);
    v1.push_back(20);
    v1.push_back(30);
    v1.emplace_back(40);  // Constructs in place (more efficient)

    // Access
    cout << "v1[0] = " << v1[0] << "\\n";
    cout << "v1.at(1) = " << v1.at(1) << "\\n";  // Bounds-checked
    cout << "Front: " << v1.front() << "\\n";
    cout << "Back: " << v1.back() << "\\n";

    // Size and capacity
    cout << "Size: " << v1.size() << "\\n";
    cout << "Capacity: " << v1.capacity() << "\\n";
    cout << "Empty: " << v1.empty() << "\\n";

    // Remove last element
    v1.pop_back();
    cout << "After pop_back, size: " << v1.size() << "\\n";

    return 0;
}`,
            output: `v1[0] = 10
v1.at(1) = 20
Front: 10
Back: 40
Size: 4
Capacity: 4
Empty: 0
After pop_back, size: 3`,
            tip: 'Use v.at(i) for bounds-checked access during debugging. It throws std::out_of_range on invalid indices, while v[i] has undefined behavior.',
            analogy: 'Think of it like a stretchy accordion folder: it starts small, and as you add more documents (push_back), it automatically expands. You can instantly flip to any tab by number (random access), but inserting in the middle means shifting everything after it.',
            codeHighlightLines: [7, 10, 11, 14],
            diagram: {
              kind: 'custom' as const,
              type: 'array' as const,
              data: {
                title: 'vector<int> v1 after push_back(10, 20, 30, 40)',
                elements: [
                  { value: '10', label: '[0] front()' },
                  { value: '20', label: '[1]' },
                  { value: '30', label: '[2]' },
                  { value: '40', label: '[3] back()' },
                ],
                metadata: [
                  { key: 'size()', value: '4' },
                  { key: 'capacity()', value: '4' },
                  { key: 'push_back', value: 'O(1) amortized' },
                  { key: 'operator[]', value: 'O(1) random access' },
                ],
              },
              caption: 'Vector stores elements contiguously in memory. Size tracks used elements, capacity tracks allocated space. When size exceeds capacity, the vector reallocates (typically doubles).',
            },
          },
          {
            heading: 'Iterating and Modifying',
            content:
              'Vectors support all standard iteration patterns: index-based, iterator-based, and range-based for. They also support insert and erase at arbitrary positions, though these are O(n) because elements must be shifted. The erase-remove idiom is the standard way to remove elements by value.',
            code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 3, 1, 4, 2, 3, 5, 1};

    // Erase-remove idiom: remove all 3s
    v.erase(remove(v.begin(), v.end(), 3), v.end());
    cout << "After removing 3s: ";
    for (int x : v) cout << x << " ";
    cout << "\\n";

    // Insert at position
    v.insert(v.begin() + 2, 99);
    cout << "After insert at [2]: ";
    for (int x : v) cout << x << " ";
    cout << "\\n";

    // Erase at position
    v.erase(v.begin());
    cout << "After erase first: ";
    for (int x : v) cout << x << " ";
    cout << "\\n";

    // Clear all elements
    v.clear();
    cout << "After clear, size: " << v.size() << "\\n";

    // Reserve capacity to avoid reallocations
    v.reserve(1000);
    cout << "Capacity after reserve: " << v.capacity() << "\\n";

    return 0;
}`,
            output: `After removing 3s: 5 1 4 2 5 1
After insert at [2]: 5 1 99 4 2 5 1
After erase first: 1 99 4 2 5 1
After clear, size: 0
Capacity after reserve: 1000`,
          },
          {
            heading: '2D Vectors',
            content:
              'Vectors of vectors (vector<vector<T>>) create dynamic 2D arrays. This is the standard way to represent matrices, grids, and adjacency lists in C++. You can create them with a specific size and default value, or build them dynamically.',
            code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Create a 3x4 matrix initialized to 0
    int rows = 3, cols = 4;
    vector<vector<int>> matrix(rows, vector<int>(cols, 0));

    // Fill with values
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            matrix[i][j] = i * cols + j + 1;
        }
    }

    // Print matrix
    cout << "Matrix:\\n";
    for (const auto& row : matrix) {
        for (int val : row) {
            cout << val << "\\t";
        }
        cout << "\\n";
    }

    // Dynamic 2D: adjacency list
    int n = 5;
    vector<vector<int>> adj(n);
    adj[0].push_back(1);
    adj[0].push_back(2);
    adj[1].push_back(3);

    cout << "\\nAdjacency list:\\n";
    for (int i = 0; i < n; i++) {
        cout << i << " -> ";
        for (int neighbor : adj[i]) cout << neighbor << " ";
        cout << "\\n";
    }

    return 0;
}`,
            output: `Matrix:
1	2	3	4
5	6	7	8
9	10	11	12

Adjacency list:
0 -> 1 2
1 -> 3
2 ->
3 ->
4 ->`,
          },
        ],
        quiz: [
          {
            question: 'What is the time complexity of push_back on a vector?',
            options: [
              'O(n) always',
              'O(1) always',
              'O(1) amortized',
              'O(log n)',
            ],
            correctIndex: 2,
            explanation: 'push_back is O(1) amortized. Most calls are O(1), but occasionally the vector must reallocate and copy all elements (O(n)). Since reallocations happen exponentially less often (capacity doubles), the average cost per insertion is constant.',
          },
          {
            question: 'What does the erase-remove idiom do?',
            options: [
              'It removes elements by index',
              'It moves matching elements to the end, then erases them in one call',
              'It deletes the entire vector and recreates it',
              'It sorts the vector and removes duplicates',
            ],
            correctIndex: 1,
            explanation: 'std::remove moves all non-matching elements to the front and returns an iterator to the new logical end. Then erase() removes everything from that iterator to the actual end. This is the standard way to remove elements by value from a vector.',
          },
          {
            question: 'What is the difference between v[i] and v.at(i)?',
            options: [
              'No difference, they are identical',
              'v[i] is faster because it does not check bounds; v.at(i) throws std::out_of_range on invalid index',
              'v.at(i) is faster because it uses direct memory access',
              'v[i] works only with integers, v.at(i) works with any type',
            ],
            correctIndex: 1,
            explanation: 'v[i] does not perform bounds checking (undefined behavior on invalid index), while v.at(i) checks bounds and throws std::out_of_range if the index is invalid. Use at() during debugging for safety.',
          },
          {
            question: 'How do you create a 2D vector with 3 rows and 4 columns initialized to zero?',
            options: [
              'vector<int> v(3, 4, 0);',
              'vector<vector<int>> v(3, vector<int>(4, 0));',
              'vector<int[4]> v(3);',
              'vector<vector<int>> v = {3, 4};',
            ],
            correctIndex: 1,
            explanation: 'vector<vector<int>> v(3, vector<int>(4, 0)) creates 3 rows, each being a vector<int> of size 4 filled with zeros. This is the standard way to create dynamic 2D arrays in C++.',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes a vector of integers and returns a new vector containing only the unique elements in the order they first appeared. Do not use std::set or std::unordered_set.',
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

vector<int> uniqueElements(const vector<int>& input) {
    // TODO: return unique elements in order of first appearance
}

int main() {
    vector<int> nums = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};
    vector<int> result = uniqueElements(nums);

    cout << "Unique: ";
    for (int x : result) cout << x << " ";
    cout << "\\n";
    // Expected: 3 1 4 5 9 2 6

    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> uniqueElements(const vector<int>& input) {
    vector<int> result;
    for (int x : input) {
        if (find(result.begin(), result.end(), x) == result.end()) {
            result.push_back(x);
        }
    }
    return result;
}

int main() {
    vector<int> nums = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};
    vector<int> result = uniqueElements(nums);

    cout << "Unique: ";
    for (int x : result) cout << x << " ";
    cout << "\\n";
    // Output: 3 1 4 5 9 2 6

    return 0;
}`,
          hints: [
            'Create a result vector and iterate through the input',
            'For each element, check if it already exists in the result vector using std::find',
            'Only push_back if the element is not already in the result',
          ],
        },
      },
      {
        id: 'array',
        title: 'std::array',
        difficulty: 'beginner',
        tags: ['array', 'fixed-size', 'container', 'stl'],
        cheatSheetSummary: 'Fixed-size array with bounds checking via .at(). Size known at compile time: array<int, 5> arr;',
        signature: 'template<class T, std::size_t N> struct array;',
        sections: [
          {
            heading: 'Fixed-Size Arrays',
            content:
              'std::array is a thin wrapper around a C-style array that provides the interface of an STL container (size(), begin(), end(), at()). Unlike C arrays, it does not decay to a pointer, knows its size, and can be passed to and returned from functions by value. The size must be a compile-time constant.',
            code: `#include <iostream>
#include <array>
#include <algorithm>
using namespace std;

int main() {
    // Declaration and initialization
    array<int, 5> arr = {10, 20, 30, 40, 50};

    // Access
    cout << "arr[0] = " << arr[0] << "\\n";
    cout << "arr.at(4) = " << arr.at(4) << "\\n";
    cout << "Front: " << arr.front() << "\\n";
    cout << "Back: " << arr.back() << "\\n";
    cout << "Size: " << arr.size() << "\\n";

    // Iterate
    cout << "Elements: ";
    for (const auto& x : arr) cout << x << " ";
    cout << "\\n";

    // Sort
    sort(arr.begin(), arr.end(), greater<int>());
    cout << "Sorted desc: ";
    for (int x : arr) cout << x << " ";
    cout << "\\n";

    // Fill
    array<int, 3> zeros;
    zeros.fill(0);
    cout << "Filled: ";
    for (int x : zeros) cout << x << " ";
    cout << "\\n";

    return 0;
}`,
            output: `arr[0] = 10
arr.at(4) = 50
Front: 10
Back: 50
Size: 5
Elements: 10 20 30 40 50
Sorted desc: 50 40 30 20 10
Filled: 0 0 0`,
            tip: 'Prefer std::array over C-style arrays. It has the same performance but provides size(), works with STL algorithms, and prevents array-to-pointer decay bugs.',
          },
        ],
        quiz: [
          {
            question: 'What must the size of a std::array be?',
            options: [
              'Determined at runtime',
              'A compile-time constant',
              'A variable passed to the constructor',
              'Any positive integer stored in a variable',
            ],
            correctIndex: 1,
            explanation: 'std::array requires its size to be a compile-time constant because it is a template parameter. This means the size is fixed at compile time and cannot change during program execution.',
          },
          {
            question: 'What advantage does std::array have over C-style arrays?',
            options: [
              'It can grow dynamically like std::vector',
              'It knows its own size, does not decay to a pointer, and works with STL algorithms',
              'It is faster than C-style arrays',
              'It can store different types in the same array',
            ],
            correctIndex: 1,
            explanation: 'std::array wraps a C-style array but adds size(), begin()/end() iterators, at() for bounds checking, and prevents array-to-pointer decay. Performance is identical to C-style arrays.',
          },
        ],
        challenge: {
          prompt: 'Write a program that uses std::array<int, 6> to store six dice rolls (hardcoded values). Compute and print the sum, average, minimum, and maximum of the rolls using STL algorithms.',
          starterCode: `#include <iostream>
#include <array>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    array<int, 6> dice = {3, 5, 2, 6, 1, 4};

    // TODO: Calculate sum using accumulate
    // TODO: Calculate average
    // TODO: Find min and max using min_element and max_element
    // TODO: Print all results

    return 0;
}`,
          solutionCode: `#include <iostream>
#include <array>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    array<int, 6> dice = {3, 5, 2, 6, 1, 4};

    int sum = accumulate(dice.begin(), dice.end(), 0);
    double average = static_cast<double>(sum) / dice.size();
    int minVal = *min_element(dice.begin(), dice.end());
    int maxVal = *max_element(dice.begin(), dice.end());

    cout << "Dice: ";
    for (int d : dice) cout << d << " ";
    cout << "\\n";
    cout << "Sum: " << sum << "\\n";
    cout << "Average: " << average << "\\n";
    cout << "Min: " << minVal << "\\n";
    cout << "Max: " << maxVal << "\\n";

    return 0;
}`,
          hints: [
            'Use std::accumulate from <numeric> to compute the sum',
            'Use std::min_element and std::max_element from <algorithm> - they return iterators so dereference with *',
          ],
        },
      },
      {
        id: 'list',
        title: 'std::list',
        difficulty: 'intermediate',
        tags: ['list', 'doubly-linked', 'container', 'stl'],
        cheatSheetSummary: 'Doubly-linked list: O(1) insert/erase anywhere given an iterator, but no random access.',
        signature: 'template<class T, class Allocator = std::allocator<T>> class list;',
        sections: [
          {
            heading: 'Linked List Operations',
            content:
              'std::list is a doubly-linked list that provides O(1) insertion and removal at any position given an iterator. However, it has no random access (no operator[]) and poor cache locality compared to vector. Use list only when you need frequent insertions/removals in the middle.',
            code: `#include <iostream>
#include <list>
using namespace std;

int main() {
    list<int> lst = {10, 20, 30, 40, 50};

    // Add elements
    lst.push_front(5);
    lst.push_back(60);

    // Iterate (no random access)
    cout << "List: ";
    for (int x : lst) cout << x << " ";
    cout << "\\n";

    // Insert after the third element
    auto it = lst.begin();
    advance(it, 3);  // Move iterator 3 positions
    lst.insert(it, 25);
    cout << "After insert: ";
    for (int x : lst) cout << x << " ";
    cout << "\\n";

    // Remove by value (removes all occurrences)
    lst.remove(30);
    cout << "After remove(30): ";
    for (int x : lst) cout << x << " ";
    cout << "\\n";

    // Splice: move elements from one list to another
    list<int> other = {100, 200};
    lst.splice(lst.end(), other);
    cout << "After splice: ";
    for (int x : lst) cout << x << " ";
    cout << "\\nOther size: " << other.size() << "\\n";

    // Sort (list has its own sort method)
    lst.sort();
    cout << "Sorted: ";
    for (int x : lst) cout << x << " ";
    cout << "\\n";

    return 0;
}`,
            output: `List: 5 10 20 30 40 50 60
After insert: 5 10 20 25 30 40 50 60
After remove(30): 5 10 20 25 40 50 60
After splice: 5 10 20 25 40 50 60 100 200
Other size: 0
Sorted: 5 10 20 25 40 50 60 100 200`,
            note: 'In practice, vector outperforms list for most use cases due to better cache locality. Only use list when you need guaranteed O(1) insert/erase with iterators that remain valid.',
            diagram: {
              kind: 'custom' as const,
              type: 'linked-list' as const,
              data: {
                title: 'std::list (doubly-linked)',
                nodes: [
                  { value: '5', id: 'n1' },
                  { value: '10', id: 'n2' },
                  { value: '20', id: 'n3' },
                  { value: '25', id: 'n4', highlight: true },
                  { value: '30', id: 'n5' },
                  { value: '40', id: 'n6' },
                ],
                links: [
                  { from: 'n1', to: 'n2', bidirectional: true },
                  { from: 'n2', to: 'n3', bidirectional: true },
                  { from: 'n3', to: 'n4', bidirectional: true },
                  { from: 'n4', to: 'n5', bidirectional: true },
                  { from: 'n5', to: 'n6', bidirectional: true },
                ],
                annotations: [
                  { nodeId: 'n4', text: 'Inserted with O(1)' },
                ],
              },
              caption: 'Each node holds prev/next pointers. Insert/erase at any iterator position is O(1), but finding that position is O(n) since there is no random access.',
            },
          },
        ],
        quiz: [
          {
            question: 'What is the time complexity of inserting an element in the middle of a std::list given an iterator?',
            options: [
              'O(n)',
              'O(log n)',
              'O(1)',
              'O(n log n)',
            ],
            correctIndex: 2,
            explanation: 'Given an iterator to the position, insertion in a doubly-linked list is O(1) because it only requires updating a few pointers. However, finding that position (without an iterator) is O(n) since there is no random access.',
          },
          {
            question: 'What does the splice() method do on a std::list?',
            options: [
              'It splits a list into two halves',
              'It moves elements from one list to another without copying',
              'It sorts the list',
              'It removes duplicate elements',
            ],
            correctIndex: 1,
            explanation: 'splice() transfers elements from one list to another by relinking pointers. No elements are copied or moved in memory. After splicing, the source list loses those elements (its size decreases).',
          },
          {
            question: 'Why does std::list have its own sort() method instead of using std::sort?',
            options: [
              'std::sort does not work with any container',
              'std::sort requires random access iterators, which list does not provide',
              'std::list::sort is faster than std::sort',
              'std::sort would destroy the list structure',
            ],
            correctIndex: 1,
            explanation: 'std::sort requires random access iterators (like those from vector or array) to efficiently perform comparisons and swaps. std::list only provides bidirectional iterators, so it has its own sort() method that uses a merge sort algorithm.',
          },
        ],
        challenge: {
          prompt: 'Write a program that simulates a simple text editor undo/redo using std::list. Maintain a list of operations (strings). Support adding an operation, undoing (moving the current position back), and redoing (moving forward). Print the current state after each action.',
          starterCode: `#include <iostream>
#include <list>
#include <string>
using namespace std;

class TextEditor {
    list<string> history;
    list<string>::iterator current;
public:
    TextEditor() {
        history.push_back("[initial]");
        current = history.begin();
    }

    void doAction(const string& action) {
        // TODO: erase everything after current, then add new action
    }

    void undo() {
        // TODO: move current back if possible
    }

    void redo() {
        // TODO: move current forward if possible
    }

    void printState() const {
        cout << "Current: " << *current << "\\n";
    }
};

int main() {
    TextEditor editor;
    editor.doAction("Type 'Hello'");
    editor.doAction("Type ' World'");
    editor.printState();

    editor.undo();
    editor.printState();

    editor.redo();
    editor.printState();

    return 0;
}`,
          solutionCode: `#include <iostream>
#include <list>
#include <string>
using namespace std;

class TextEditor {
    list<string> history;
    list<string>::iterator current;
public:
    TextEditor() {
        history.push_back("[initial]");
        current = history.begin();
    }

    void doAction(const string& action) {
        // Erase everything after current
        auto it = current;
        ++it;
        history.erase(it, history.end());
        // Add new action
        history.push_back(action);
        ++current;
    }

    void undo() {
        if (current != history.begin()) {
            --current;
        }
    }

    void redo() {
        auto next = current;
        ++next;
        if (next != history.end()) {
            current = next;
        }
    }

    void printState() const {
        cout << "Current: " << *current << "\\n";
    }
};

int main() {
    TextEditor editor;
    editor.doAction("Type 'Hello'");
    editor.doAction("Type ' World'");
    editor.printState();  // Current: Type ' World'

    editor.undo();
    editor.printState();  // Current: Type 'Hello'

    editor.redo();
    editor.printState();  // Current: Type ' World'

    return 0;
}`,
          hints: [
            'When performing a new action, erase all elements after the current position first (this discards the redo history)',
            'Use list iterators (++ and --) to navigate through the history for undo/redo',
            'Check boundary conditions: do not undo past the beginning or redo past the end',
          ],
        },
      },
      {
        id: 'deque',
        title: 'std::deque',
        difficulty: 'intermediate',
        tags: ['deque', 'double-ended', 'container', 'stl'],
        cheatSheetSummary: 'Double-ended queue: O(1) push/pop at both ends plus O(1) random access.',
        signature: 'template<class T, class Allocator = std::allocator<T>> class deque;',
        sections: [
          {
            heading: 'Double-Ended Queue',
            content:
              'std::deque (double-ended queue) supports efficient insertion and removal at both the front and back, plus random access via operator[]. It is implemented as a sequence of fixed-size arrays, giving it different performance characteristics from vector. Use deque when you need push_front in addition to push_back.',
            code: `#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq = {10, 20, 30};

    // Push/pop at both ends
    dq.push_front(5);
    dq.push_back(40);
    cout << "After pushes: ";
    for (int x : dq) cout << x << " ";
    cout << "\\n";

    dq.pop_front();
    dq.pop_back();
    cout << "After pops: ";
    for (int x : dq) cout << x << " ";
    cout << "\\n";

    // Random access
    cout << "dq[0] = " << dq[0] << "\\n";
    cout << "dq[2] = " << dq[2] << "\\n";
    cout << "Size: " << dq.size() << "\\n";

    // Practical: sliding window
    deque<int> window;
    vector<int> data = {1, 3, 5, 2, 8, 4};
    int k = 3;
    cout << "\\nSliding window max (k=" << k << "): ";
    for (int i = 0; i < (int)data.size(); i++) {
        while (!window.empty() && data[window.back()] <= data[i])
            window.pop_back();
        window.push_back(i);
        if (window.front() <= i - k) window.pop_front();
        if (i >= k - 1) cout << data[window.front()] << " ";
    }
    cout << "\\n";

    return 0;
}`,
            output: `After pushes: 5 10 20 30 40
After pops: 10 20 30
dq[0] = 10
dq[2] = 30
Size: 3

Sliding window max (k=3): 5 5 8 8`,
            tip: 'deque invalidates all iterators on push_front/push_back (unlike vector which only invalidates on reallocation). Be careful with stored iterators.',
          },
        ],
      },
      {
        id: 'set',
        title: 'std::set',
        difficulty: 'intermediate',
        tags: ['set', 'ordered', 'unique', 'binary-tree', 'stl'],
        cheatSheetSummary: 'Sorted unique elements. O(log n) insert, erase, find. Backed by a red-black tree.',
        signature: 'template<class Key, class Compare = std::less<Key>> class set;',
        sections: [
          {
            heading: 'Ordered Set Operations',
            content:
              'std::set stores unique elements in sorted order, backed by a balanced binary tree (red-black tree). All operations (insert, erase, find) are O(log n). It supports lower_bound and upper_bound for efficient range queries. Use set when you need a sorted collection with fast lookup and uniqueness.',
            code: `#include <iostream>
#include <set>
using namespace std;

int main() {
    set<int> s = {5, 3, 1, 4, 2, 3, 5};  // Duplicates removed
    cout << "Set: ";
    for (int x : s) cout << x << " ";
    cout << "(size: " << s.size() << ")\\n";

    // Insert and check
    auto [it, inserted] = s.insert(6);
    cout << "Insert 6: " << (inserted ? "new" : "exists") << "\\n";
    auto [it2, inserted2] = s.insert(3);
    cout << "Insert 3: " << (inserted2 ? "new" : "exists") << "\\n";

    // Find
    if (s.find(4) != s.end()) cout << "Found 4\\n";
    if (s.count(7) == 0) cout << "7 not found\\n";

    // Erase
    s.erase(2);
    cout << "After erase(2): ";
    for (int x : s) cout << x << " ";
    cout << "\\n";

    // Lower/upper bound
    auto lo = s.lower_bound(3);  // First >= 3
    auto hi = s.upper_bound(5);  // First > 5
    cout << "Range [3, 5]: ";
    for (auto it = lo; it != hi; it++) cout << *it << " ";
    cout << "\\n";

    return 0;
}`,
            output: `Set: 1 2 3 4 5 (size: 5)
Insert 6: new
Insert 3: exists
Found 4
7 not found
After erase(2): 1 3 4 5 6
Range [3, 5]: 3 4 5`,
            tip: 'Use the member function s.lower_bound(x) instead of the free function std::lower_bound. The member function is O(log n) while the free function is O(n) for non-random-access iterators.',
            diagram: {
              kind: 'custom' as const,
              type: 'binary-tree' as const,
              data: {
                title: 'std::set<int> Internal Structure (Red-Black Tree)',
                nodes: [
                  { value: '3', id: 'root' },
                  { value: '1', id: 'l1' },
                  { value: '5', id: 'r1' },
                  { value: '2', id: 'lr1' },
                  { value: '4', id: 'rl1' },
                  { value: '6', id: 'rr1', highlight: true },
                ],
                edges: [
                  { from: 'root', to: 'l1', label: 'L' },
                  { from: 'root', to: 'r1', label: 'R' },
                  { from: 'l1', to: 'lr1', label: 'R' },
                  { from: 'r1', to: 'rl1', label: 'L' },
                  { from: 'r1', to: 'rr1', label: 'R' },
                ],
              },
              caption: 'std::set uses a balanced BST (red-black tree). Elements are always sorted. Insert, find, and erase are all O(log n). Node 6 was just inserted.',
            },
          },
        ],
      },
      {
        id: 'map',
        title: 'std::map',
        difficulty: 'intermediate',
        tags: ['map', 'ordered', 'key-value', 'dictionary', 'stl'],
        cheatSheetSummary: 'Sorted key-value pairs. O(log n) operations. Keys must support operator<.',
        signature: 'template<class Key, class T, class Compare = std::less<Key>> class map;',
        sections: [
          {
            heading: 'Ordered Map Operations',
            content:
              'std::map stores key-value pairs sorted by key, backed by a red-black tree. Keys must be unique. The operator[] inserts a default-constructed value if the key does not exist, which is convenient for counting but can be surprising. Use at() for bounds-checked access that throws on missing keys.',
            code: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    map<string, int> ages;

    // Insert
    ages["Alice"] = 30;
    ages["Bob"] = 25;
    ages.insert({"Charlie", 35});
    ages.emplace("Diana", 28);

    // Iterate (sorted by key)
    cout << "People:\\n";
    for (const auto& [name, age] : ages) {
        cout << "  " << name << ": " << age << "\\n";
    }

    // Access
    cout << "Alice's age: " << ages["Alice"] << "\\n";
    cout << "Contains Bob: " << ages.count("Bob") << "\\n";

    // operator[] creates entry if missing!
    cout << "Unknown: " << ages["Unknown"] << "\\n";  // Creates with 0
    cout << "Size after access: " << ages.size() << "\\n";

    // Word frequency counter
    string text[] = {"the", "cat", "sat", "on", "the", "mat", "the"};
    map<string, int> freq;
    for (const auto& word : text) {
        freq[word]++;
    }
    cout << "\\nWord frequencies:\\n";
    for (const auto& [word, count] : freq) {
        cout << "  " << word << ": " << count << "\\n";
    }

    return 0;
}`,
            output: `People:
  Alice: 30
  Bob: 25
  Charlie: 35
  Diana: 28
Alice's age: 30
Contains Bob: 1
Unknown: 0
Size after access: 5

Word frequencies:
  cat: 1
  mat: 1
  on: 1
  sat: 1
  the: 3`,
            warning: 'Using operator[] on a map inserts a default value if the key is missing. In const contexts or when you do not want insertion, use find() or at() instead.',
          },
        ],
      },
      {
        id: 'unordered-map',
        title: 'std::unordered_map',
        difficulty: 'intermediate',
        tags: ['unordered-map', 'hash-map', 'hash-table', 'stl'],
        cheatSheetSummary: 'Hash-based key-value container. O(1) average operations but no ordering. Faster than map for lookups.',
        signature: 'template<class Key, class T, class Hash = std::hash<Key>> class unordered_map;',
        sections: [
          {
            heading: 'Hash Map Operations',
            content:
              'std::unordered_map is a hash table providing O(1) average-case insert, find, and erase. Unlike map, it does not maintain sorted order. It is generally faster than map for pure lookup operations. Keys must have a hash function defined (built-in types and std::string work out of the box).',
            code: `#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

int main() {
    unordered_map<string, int> scores;
    scores["Alice"] = 95;
    scores["Bob"] = 87;
    scores["Charlie"] = 92;
    scores.insert({"Diana", 88});

    // Iterate (unordered!)
    cout << "Scores:\\n";
    for (const auto& [name, score] : scores) {
        cout << "  " << name << ": " << score << "\\n";
    }

    // Lookup
    if (auto it = scores.find("Bob"); it != scores.end()) {
        cout << "\\nBob's score: " << it->second << "\\n";
    }

    // Count occurrences in an array
    vector<int> nums = {1, 2, 3, 2, 1, 3, 3, 4, 5, 1};
    unordered_map<int, int> freq;
    for (int n : nums) freq[n]++;

    cout << "\\nFrequencies:\\n";
    for (const auto& [num, count] : freq) {
        cout << "  " << num << " appears " << count << " times\\n";
    }

    // Hash table statistics
    cout << "\\nBuckets: " << scores.bucket_count() << "\\n";
    cout << "Load factor: " << scores.load_factor() << "\\n";

    return 0;
}`,
            output: `Scores:
  Diana: 88
  Charlie: 92
  Bob: 87
  Alice: 95

Bob's score: 87

Frequencies:
  5 appears 1 times
  4 appears 1 times
  3 appears 3 times
  2 appears 2 times
  1 appears 3 times

Buckets: 7
Load factor: 0.571429`,
            note: 'In the worst case (many hash collisions), unordered_map degrades to O(n). For competitive programming, adversarial inputs can exploit this. Consider using a custom hash or std::map if you suspect attacks.',
            analogy: 'Think of it like a coat check room: you hand over your coat (value) and get a numbered ticket (hash of the key). When you return with the ticket, the attendant goes straight to the right hook instead of searching every coat. Occasionally two coats land on the same hook (collision), slowing things down.',
            diagram: {
              kind: 'custom' as const,
              type: 'hash-map' as const,
              data: {
                title: 'unordered_map Internal Structure',
                buckets: [
                  { index: 0, entries: [] },
                  { index: 1, entries: [{ key: '"Alice"', value: '95' }] },
                  { index: 2, entries: [{ key: '"Bob"', value: '87' }] },
                  { index: 3, entries: [] },
                  { index: 4, entries: [{ key: '"Charlie"', value: '92' }, { key: '"Diana"', value: '88' }] },
                  { index: 5, entries: [] },
                  { index: 6, entries: [] },
                ],
                hashFunction: 'std::hash<string>',
                loadFactor: '4/7 = 0.57',
              },
              caption: 'Keys are hashed to bucket indices. Bucket 4 shows a collision where two keys map to the same bucket, forming a chain. Average lookup is O(1).',
            },
          },
        ],
      },
      {
        id: 'stack-queue',
        title: 'Stack & Queue',
        difficulty: 'beginner',
        tags: ['stack', 'queue', 'priority-queue', 'lifo', 'fifo', 'stl'],
        cheatSheetSummary: 'stack: LIFO (push/pop/top). queue: FIFO (push/pop/front). priority_queue: max-heap by default.',
        signature: 'template<class T, class Container = deque<T>> class stack;',
        sections: [
          {
            heading: 'Stack (LIFO)',
            content:
              'std::stack provides a Last-In-First-Out container with push, pop, and top operations. It is an adapter that wraps another container (deque by default). Common uses include expression evaluation, undo operations, DFS, and balanced parentheses checking.',
            code: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isBalanced(const string& expr) {
    stack<char> s;
    for (char c : expr) {
        if (c == '(' || c == '[' || c == '{') {
            s.push(c);
        } else if (c == ')' || c == ']' || c == '}') {
            if (s.empty()) return false;
            char top = s.top();
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{')) return false;
            s.pop();
        }
    }
    return s.empty();
}

int main() {
    stack<int> s;
    s.push(10);
    s.push(20);
    s.push(30);

    cout << "Top: " << s.top() << "\\n";
    cout << "Size: " << s.size() << "\\n";

    cout << "Popping: ";
    while (!s.empty()) {
        cout << s.top() << " ";
        s.pop();
    }
    cout << "\\n";

    // Balanced parentheses
    cout << "\\n{[()]} balanced: " << isBalanced("{[()]}") << "\\n";
    cout << "{[(])} balanced: " << isBalanced("{[(])}") << "\\n";
    cout << "((()) balanced: " << isBalanced("((())") << "\\n";

    return 0;
}`,
            output: `Top: 30
Size: 3
Popping: 30 20 10

{[()]} balanced: 1
{[(])} balanced: 0
((()) balanced: 0`,
            analogy: 'Think of it like a stack of plates in a cafeteria: you can only add a plate on top (push) or take the top plate off (pop). You cannot pull a plate from the middle without toppling the stack.',
            codeHighlightLines: [4, 5, 6, 7, 8, 9, 10],
          },
          {
            heading: 'Queue and Priority Queue',
            content:
              'std::queue provides First-In-First-Out access, essential for BFS. std::priority_queue is a max-heap by default: the largest element is always on top. For a min-heap, use greater<T> as the comparator. Priority queues are crucial for Dijkstra, Kruskal, and scheduling algorithms.',
            code: `#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
    // Queue (FIFO)
    queue<string> q;
    q.push("Alice");
    q.push("Bob");
    q.push("Charlie");

    cout << "Queue processing order: ";
    while (!q.empty()) {
        cout << q.front() << " ";
        q.pop();
    }
    cout << "\\n";

    // Priority Queue (max-heap by default)
    priority_queue<int> maxPQ;
    for (int x : {3, 1, 4, 1, 5, 9, 2, 6}) {
        maxPQ.push(x);
    }
    cout << "Max-heap order: ";
    while (!maxPQ.empty()) {
        cout << maxPQ.top() << " ";
        maxPQ.pop();
    }
    cout << "\\n";

    // Min-heap
    priority_queue<int, vector<int>, greater<int>> minPQ;
    for (int x : {3, 1, 4, 1, 5, 9, 2, 6}) {
        minPQ.push(x);
    }
    cout << "Min-heap order: ";
    while (!minPQ.empty()) {
        cout << minPQ.top() << " ";
        minPQ.pop();
    }
    cout << "\\n";

    // Priority queue with pairs (sort by first element)
    priority_queue<pair<int, string>,
                   vector<pair<int, string>>,
                   greater<pair<int, string>>> taskQueue;
    taskQueue.push({3, "Low priority"});
    taskQueue.push({1, "High priority"});
    taskQueue.push({2, "Medium priority"});

    cout << "\\nTasks by priority:\\n";
    while (!taskQueue.empty()) {
        auto [pri, task] = taskQueue.top();
        taskQueue.pop();
        cout << "  [" << pri << "] " << task << "\\n";
    }

    return 0;
}`,
            output: `Queue processing order: Alice Bob Charlie
Max-heap order: 9 6 5 4 3 2 1 1
Min-heap order: 1 1 2 3 4 5 6 9

Tasks by priority:
  [1] High priority
  [2] Medium priority
  [3] Low priority`,
            tip: 'For Dijkstra, use priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> so the smallest distance is always on top.',
            codeHighlightLines: [15, 16, 17, 26, 27],
            diagram: {
              kind: 'custom' as const,
              type: 'heap' as const,
              data: {
                title: 'priority_queue (Max-Heap) after inserting {3,1,4,1,5,9,2,6}',
                nodes: [
                  { value: '9', id: 'root' },
                  { value: '6', id: 'l1' },
                  { value: '5', id: 'r1' },
                  { value: '4', id: 'll2' },
                  { value: '3', id: 'lr2' },
                  { value: '2', id: 'rl2' },
                  { value: '1', id: 'rr2' },
                  { value: '1', id: 'lll3' },
                ],
                edges: [
                  { from: 'root', to: 'l1' },
                  { from: 'root', to: 'r1' },
                  { from: 'l1', to: 'll2' },
                  { from: 'l1', to: 'lr2' },
                  { from: 'r1', to: 'rl2' },
                  { from: 'r1', to: 'rr2' },
                  { from: 'll2', to: 'lll3' },
                ],
                extractOrder: '9, 6, 5, 4, 3, 2, 1, 1',
              },
              caption: 'Max-heap property: every parent is >= its children. top() always returns the maximum. Internally stored as a contiguous array.',
            },
          },
        ],
      },
    ],
  },
];

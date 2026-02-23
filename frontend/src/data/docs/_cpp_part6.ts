import type { DocCategory } from './types';

export const CPP_PART6_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Error Handling                                               */
  /* ------------------------------------------------------------ */
  {
    id: 'error-handling',
    label: 'Error Handling',
    icon: 'AlertTriangle',
    entries: [
      {
        id: 'exceptions',
        title: 'Exceptions',
        difficulty: 'intermediate',
        tags: ['exception', 'throw', 'error', 'runtime-error'],
        cheatSheetSummary: 'throw std::runtime_error("msg") throws an exception. The standard exception hierarchy starts at std::exception.',
        crossLanguageId: 'exceptions',
        sections: [
          {
            heading: 'Exception Basics',
            content:
              'Exceptions provide a way to handle errors by transferring control from the point where the error occurs to a handler that can deal with it. When an error is detected, you throw an exception object. The runtime unwinds the call stack until it finds a matching catch block. If no handler is found, the program terminates. C++ provides a hierarchy of standard exception classes rooted at std::exception.',
            code: `#include <iostream>
#include <stdexcept>
#include <string>
using namespace std;

double divide(double a, double b) {
    if (b == 0.0) {
        throw runtime_error("Division by zero");
    }
    return a / b;
}

int safeAccess(const int arr[], int size, int index) {
    if (index < 0 || index >= size) {
        throw out_of_range("Index " + to_string(index) +
                           " out of range [0, " + to_string(size - 1) + "]");
    }
    return arr[index];
}

int main() {
    // Catching exceptions
    try {
        cout << "10 / 3 = " << divide(10, 3) << "\\n";
        cout << "10 / 0 = " << divide(10, 0) << "\\n";
    } catch (const runtime_error& e) {
        cout << "Error: " << e.what() << "\\n";
    }

    // Out of range
    int arr[] = {10, 20, 30};
    try {
        cout << safeAccess(arr, 3, 1) << "\\n";
        cout << safeAccess(arr, 3, 5) << "\\n";
    } catch (const out_of_range& e) {
        cout << "Error: " << e.what() << "\\n";
    }

    cout << "Program continues after handling exceptions\\n";
    return 0;
}`,
            output: `10 / 3 = 3.33333
Error: Division by zero
20
Error: Index 5 out of range [0, 2]
Program continues after handling exceptions`,
            analogy: 'Think of it like a fire alarm system: when something goes wrong (throw), the alarm pulls control away from normal operations and routes it to the nearest fire station (catch block) that knows how to handle that type of emergency.',
            codeHighlightLines: [7, 8, 23, 24, 25, 26],
          },
          {
            heading: 'Standard Exception Hierarchy',

            content:
              'All standard exceptions inherit from std::exception, which provides the virtual what() method returning an error message. The main categories are logic_error (bugs in program logic, like invalid_argument) and runtime_error (errors that can only be detected at runtime, like overflow_error). Understanding this hierarchy helps you choose the right exception type and catch at the right level.',
            code: `#include <iostream>
#include <stdexcept>
#include <new>
using namespace std;

void demonstrateExceptions(int choice) {
    switch (choice) {
        case 1: throw logic_error("Logic error occurred");
        case 2: throw invalid_argument("Invalid argument provided");
        case 3: throw runtime_error("Runtime error occurred");
        case 4: throw overflow_error("Overflow detected");
        case 5: throw bad_alloc();
    }
}

int main() {
    for (int i = 1; i <= 5; i++) {
        try {
            demonstrateExceptions(i);
        } catch (const bad_alloc& e) {
            cout << "Memory: " << e.what() << "\\n";
        } catch (const overflow_error& e) {
            cout << "Overflow: " << e.what() << "\\n";
        } catch (const logic_error& e) {
            cout << "Logic: " << e.what() << "\\n";
        } catch (const runtime_error& e) {
            cout << "Runtime: " << e.what() << "\\n";
        } catch (const exception& e) {
            cout << "General: " << e.what() << "\\n";
        } catch (...) {
            cout << "Unknown exception\\n";
        }
    }

    /*
    Exception hierarchy:
    exception
    ├── logic_error
    │   ├── invalid_argument
    │   ├── domain_error
    │   ├── length_error
    │   └── out_of_range
    ├── runtime_error
    │   ├── overflow_error
    │   ├── underflow_error
    │   └── range_error
    └── bad_alloc, bad_cast, ...
    */

    return 0;
}`,
            output: `Logic: Logic error occurred
Logic: Invalid argument provided
Runtime: Runtime error occurred
Overflow: Overflow detected
Memory: std::bad_alloc`,
            tip: 'Order catch blocks from most specific to most general. A catch(const exception&) placed first would catch everything, preventing more specific handlers from running.',
            codeHighlightLines: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
            diagram: {
              kind: 'mermaid' as const,
              code: `classDiagram
  class exception {
    +what() const char*
  }
  class logic_error {
    +what() const char*
  }
  class runtime_error {
    +what() const char*
  }
  class invalid_argument
  class domain_error
  class length_error
  class out_of_range
  class overflow_error
  class underflow_error
  class range_error
  class bad_alloc
  class bad_cast

  exception <|-- logic_error
  exception <|-- runtime_error
  exception <|-- bad_alloc
  exception <|-- bad_cast
  logic_error <|-- invalid_argument
  logic_error <|-- domain_error
  logic_error <|-- length_error
  logic_error <|-- out_of_range
  runtime_error <|-- overflow_error
  runtime_error <|-- underflow_error
  runtime_error <|-- range_error`,
              caption: 'C++ standard exception hierarchy: logic_error for programmer mistakes, runtime_error for errors detectable only at runtime. Always catch from most specific to most general.',
            },
          },
        ],
        quiz: [
          {
            question: 'What happens if a thrown exception is not caught by any catch block?',
            options: [
              'The exception is silently ignored',
              'The program calls std::terminate and aborts',
              'The exception is automatically retried',
              'The program returns 0 from main',
            ],
            correctIndex: 1,
            explanation: 'If no matching catch block is found during stack unwinding, std::terminate is called, which by default aborts the program.',
          },
          {
            question: 'Which standard exception class should you throw for an invalid function argument?',
            options: [
              'std::runtime_error',
              'std::out_of_range',
              'std::invalid_argument',
              'std::bad_alloc',
            ],
            correctIndex: 2,
            explanation: 'std::invalid_argument (under std::logic_error) is the appropriate exception for invalid function arguments. out_of_range is for index errors, runtime_error for runtime failures, and bad_alloc for memory allocation failures.',
          },
          {
            question: 'What is the base class of all standard C++ exceptions?',
            options: [
              'std::runtime_error',
              'std::logic_error',
              'std::exception',
              'std::error',
            ],
            correctIndex: 2,
            explanation: 'std::exception is the root of the standard exception hierarchy. Both std::runtime_error and std::logic_error inherit from std::exception.',
          },
        ],
        challenge: {
          prompt: 'Write a function `safeDivide` that takes two doubles and returns their quotient. It should throw a std::invalid_argument if the denominator is zero. In main, call it with valid and invalid inputs, catching the exception and printing the error message.',
          starterCode: `#include <iostream>
#include <stdexcept>
using namespace std;

// TODO: Write safeDivide function

int main() {
    // TODO: Call safeDivide with (10.0, 3.0) and print result
    // TODO: Call safeDivide with (5.0, 0.0) and catch the exception
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <stdexcept>
using namespace std;

double safeDivide(double numerator, double denominator) {
    if (denominator == 0.0) {
        throw invalid_argument("Cannot divide by zero");
    }
    return numerator / denominator;
}

int main() {
    try {
        cout << "10 / 3 = " << safeDivide(10.0, 3.0) << "\\n";
    } catch (const invalid_argument& e) {
        cout << "Error: " << e.what() << "\\n";
    }

    try {
        cout << "5 / 0 = " << safeDivide(5.0, 0.0) << "\\n";
    } catch (const invalid_argument& e) {
        cout << "Error: " << e.what() << "\\n";
    }

    return 0;
}`,
          hints: [
            'Use throw std::invalid_argument("message") to throw the exception when denominator is zero.',
            'Wrap each call to safeDivide in its own try-catch block so the program can continue after an error.',
            'Catch by const reference: catch (const invalid_argument& e) and use e.what() to get the message.',
          ],
        },
      },
      {
        id: 'try-catch',
        title: 'Try-Catch Patterns',
        difficulty: 'intermediate',
        tags: ['try', 'catch', 'finally', 'rethrow', 'noexcept'],
        cheatSheetSummary: 'try { ... } catch (const T& e) { ... }. Use catch(...) for all. Rethrow with throw;.',
        sections: [
          {
            heading: 'Try-Catch Best Practices',
            content:
              'The try block encloses code that might throw exceptions, and catch blocks handle specific exception types. Always catch by const reference to avoid slicing. Multiple catch blocks can handle different exception types. The catch(...) syntax catches any exception. Use throw; (without an argument) to rethrow the current exception.',
            code: `#include <iostream>
#include <stdexcept>
#include <vector>
using namespace std;

void riskyOperation() {
    throw runtime_error("Something went wrong");
}

void wrapper() {
    try {
        riskyOperation();
    } catch (const exception& e) {
        cout << "Logging error: " << e.what() << "\\n";
        throw;  // Rethrow to caller
    }
}

int main() {
    // Multiple catch blocks
    try {
        vector<int> v = {1, 2, 3};
        cout << v.at(10) << "\\n";
    } catch (const out_of_range& e) {
        cout << "Out of range: " << e.what() << "\\n";
    } catch (const exception& e) {
        cout << "Other error: " << e.what() << "\\n";
    }

    // Rethrow pattern
    try {
        wrapper();
    } catch (const runtime_error& e) {
        cout << "Caught rethrown: " << e.what() << "\\n";
    }

    // Nested try-catch
    try {
        try {
            throw invalid_argument("bad input");
        } catch (const invalid_argument& e) {
            cout << "Inner catch: " << e.what() << "\\n";
            throw runtime_error("converted error");
        }
    } catch (const runtime_error& e) {
        cout << "Outer catch: " << e.what() << "\\n";
    }

    return 0;
}`,
            output: `Out of range: vector::_M_range_check: __n (which is 10) >= this->size() (which is 3)
Logging error: Something went wrong
Caught rethrown: Something went wrong
Inner catch: bad input
Outer catch: converted error`,
          },
          {
            heading: 'Noexcept and Exception Safety',
            content:
              'The noexcept specifier declares that a function will not throw exceptions. This allows the compiler to generate more optimized code and is required for move constructors in certain contexts (like vector reallocation). If a noexcept function does throw, the program calls std::terminate immediately.',
            code: `#include <iostream>
#include <vector>
using namespace std;

// noexcept: guarantees no exceptions
int safeAdd(int a, int b) noexcept {
    return a + b;
}

// Conditional noexcept
template<typename T>
void swap_values(T& a, T& b) noexcept(noexcept(T(move(a)))) {
    T temp = move(a);
    a = move(b);
    b = move(temp);
}

class Widget {
    int* data;
public:
    Widget(int val) : data(new int(val)) {}
    ~Widget() { delete data; }

    // Move constructor should be noexcept for vector efficiency
    Widget(Widget&& other) noexcept : data(other.data) {
        other.data = nullptr;
    }

    Widget& operator=(Widget&& other) noexcept {
        if (this != &other) {
            delete data;
            data = other.data;
            other.data = nullptr;
        }
        return *this;
    }

    int value() const { return data ? *data : 0; }
};

int main() {
    cout << "safeAdd is noexcept: "
         << noexcept(safeAdd(1, 2)) << "\\n";

    int a = 10, b = 20;
    swap_values(a, b);
    cout << "After swap: a=" << a << " b=" << b << "\\n";

    // noexcept move enables vector optimizations
    vector<Widget> widgets;
    widgets.push_back(Widget(42));
    widgets.push_back(Widget(99));
    cout << "Widget values: " << widgets[0].value()
         << " " << widgets[1].value() << "\\n";

    return 0;
}`,
            output: `safeAdd is noexcept: 1
After swap: a=20 b=10
Widget values: 42 99`,
            warning: 'If a noexcept function throws, std::terminate is called immediately with no stack unwinding. Only use noexcept when you are certain the function cannot throw.',
          },
        ],
        quiz: [
          {
            question: 'Why should you catch exceptions by const reference (const T&) rather than by value?',
            options: [
              'To avoid copying the exception object and prevent slicing',
              'Because catching by value is a syntax error',
              'Because const references are faster to throw',
              'To allow modification of the original exception',
            ],
            correctIndex: 0,
            explanation: 'Catching by const reference avoids unnecessary copies and prevents object slicing, which would lose derived class information if you catch a base class by value.',
          },
          {
            question: 'What does "throw;" (with no argument) do inside a catch block?',
            options: [
              'Throws a new default exception',
              'Rethrows the currently caught exception preserving its type',
              'Causes a compilation error',
              'Throws a std::runtime_error with an empty message',
            ],
            correctIndex: 1,
            explanation: 'throw; without an argument rethrows the current exception, preserving its original type and message. This is used to log or partially handle an exception before passing it up the call stack.',
          },
          {
            question: 'What is the effect of marking a function as noexcept?',
            options: [
              'The compiler prevents the function from throwing at compile time',
              'Exceptions thrown inside are automatically caught and ignored',
              'The compiler can optimize more aggressively, but if an exception is thrown, std::terminate is called',
              'The function returns an error code instead of throwing',
            ],
            correctIndex: 2,
            explanation: 'noexcept is a promise to the compiler that the function will not throw. The compiler uses this for optimizations (e.g., move semantics in containers). If the function does throw, std::terminate is called immediately.',
          },
          {
            question: 'In what order should multiple catch blocks be arranged?',
            options: [
              'From most general (base) to most specific (derived)',
              'From most specific (derived) to most general (base)',
              'Alphabetical order by exception name',
              'Order does not matter',
            ],
            correctIndex: 1,
            explanation: 'Catch blocks are tried in order from top to bottom. A base class catch will match all derived exceptions, so more specific catches must come first to have any effect.',
          },
        ],
        challenge: {
          prompt: 'Write a function `parseAge` that takes a string and returns an int. It should throw std::invalid_argument if the string is not a valid number, and std::out_of_range if the age is negative or above 150. Use a wrapper function that catches, logs, and rethrows the exception.',
          starterCode: `#include <iostream>
#include <stdexcept>
#include <string>
using namespace std;

// TODO: Write parseAge(const string& input) -> int
// TODO: Write logAndRethrow wrapper that calls parseAge

int main() {
    // TODO: Test with "25", "abc", and "200"
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <stdexcept>
#include <string>
using namespace std;

int parseAge(const string& input) {
    int age;
    try {
        age = stoi(input);
    } catch (...) {
        throw invalid_argument("Not a valid number: " + input);
    }
    if (age < 0 || age > 150) {
        throw out_of_range("Age out of valid range: " + to_string(age));
    }
    return age;
}

int logAndRethrow(const string& input) {
    try {
        return parseAge(input);
    } catch (const exception& e) {
        cout << "Logging error: " << e.what() << "\\n";
        throw;  // Rethrow
    }
}

int main() {
    for (const string& input : {"25", "abc", "200"}) {
        try {
            int age = logAndRethrow(input);
            cout << "Parsed age: " << age << "\\n";
        } catch (const invalid_argument& e) {
            cout << "Invalid: " << e.what() << "\\n";
        } catch (const out_of_range& e) {
            cout << "Out of range: " << e.what() << "\\n";
        }
    }
    return 0;
}`,
          hints: [
            'Use std::stoi to convert the string to an integer. It throws if the string is not a valid number.',
            'In the wrapper function, catch by const reference, print the message, then use throw; to rethrow.',
          ],
        },
      },
      {
        id: 'custom-exceptions',
        title: 'Custom Exceptions',
        difficulty: 'intermediate',
        tags: ['custom-exception', 'error-class', 'inheritance'],
        cheatSheetSummary: 'class MyError : public runtime_error { using runtime_error::runtime_error; }; for custom exceptions.',
        sections: [
          {
            heading: 'Creating Custom Exception Classes',
            content:
              'Custom exception classes let you create domain-specific error types that carry additional information beyond a message string. Inherit from std::exception or one of its subclasses (runtime_error, logic_error), override what() if needed, and add any extra data members relevant to the error.',
            code: `#include <iostream>
#include <stdexcept>
#include <string>
using namespace std;

// Simple custom exception
class FileNotFoundError : public runtime_error {
    string filepath;
public:
    FileNotFoundError(const string& path)
        : runtime_error("File not found: " + path), filepath(path) {}

    const string& getFilePath() const { return filepath; }
};

// Exception with error code
class HttpError : public runtime_error {
    int statusCode;
public:
    HttpError(int code, const string& msg)
        : runtime_error("HTTP " + to_string(code) + ": " + msg),
          statusCode(code) {}

    int getStatusCode() const { return statusCode; }
};

// Exception hierarchy for an application
class AppError : public runtime_error {
public:
    using runtime_error::runtime_error;
};

class DatabaseError : public AppError {
public:
    using AppError::AppError;
};

class ValidationError : public AppError {
public:
    using AppError::AppError;
};

void loadFile(const string& path) {
    throw FileNotFoundError(path);
}

void fetchData(const string& url) {
    throw HttpError(404, "Resource not found at " + url);
}

int main() {
    try {
        loadFile("/config/settings.json");
    } catch (const FileNotFoundError& e) {
        cout << e.what() << "\\n";
        cout << "Path: " << e.getFilePath() << "\\n";
    }

    try {
        fetchData("/api/users/999");
    } catch (const HttpError& e) {
        cout << e.what() << "\\n";
        cout << "Status: " << e.getStatusCode() << "\\n";
    }

    try {
        throw ValidationError("Email format invalid");
    } catch (const AppError& e) {
        cout << "App error: " << e.what() << "\\n";
    }

    return 0;
}`,
            output: `File not found: /config/settings.json
Path: /config/settings.json
HTTP 404: Resource not found at /api/users/999
Status: 404
App error: Email format invalid`,
            tip: 'Use the "using Base::Base;" syntax (inheriting constructors) for simple custom exceptions that only need a different type name without additional data.',
            analogy: 'Think of it like hospital triage tags: instead of one generic "patient injured" report, custom exceptions are color-coded tags (FileNotFoundError, HttpError) that carry specific details so the right specialist (catch block) can respond immediately.',
            codeHighlightLines: [4, 5, 6, 7, 8, 15, 16, 17, 18],
            diagram: {
              kind: 'mermaid' as const,
              code: `classDiagram
  class runtime_error {
    +what() const char*
  }
  class FileNotFoundError {
    -string filepath
    +getFilePath() string
  }
  class HttpError {
    -int statusCode
    +getStatusCode() int
  }
  class AppError
  class DatabaseError
  class ValidationError

  runtime_error <|-- FileNotFoundError
  runtime_error <|-- HttpError
  runtime_error <|-- AppError
  AppError <|-- DatabaseError
  AppError <|-- ValidationError`,
              caption: 'Custom exception hierarchy: domain-specific errors inherit from standard exceptions, carrying extra context (file path, HTTP status code) for precise error handling.',
            },
          },
        ],
        quiz: [
          {
            question: 'What is the recommended base class for a custom exception that represents a runtime failure?',
            options: [
              'std::exception',
              'std::logic_error',
              'std::runtime_error',
              'std::bad_exception',
            ],
            correctIndex: 2,
            explanation: 'std::runtime_error is the appropriate base class for errors detectable only at runtime (e.g., file not found, network errors). std::logic_error is for programmer mistakes detectable before runtime.',
          },
          {
            question: 'What does "using runtime_error::runtime_error;" inside a custom exception class do?',
            options: [
              'Creates a copy of the runtime_error class',
              'Inherits all constructors from runtime_error',
              'Overrides the what() method',
              'Makes the class a template specialization',
            ],
            correctIndex: 1,
            explanation: 'The using declaration inherits constructors from the base class, allowing the custom exception to be constructed the same way as runtime_error without writing explicit constructors.',
          },
          {
            question: 'Why would you add extra data members (like a file path or error code) to a custom exception?',
            options: [
              'It is required by the C++ standard',
              'To make the exception class larger for better performance',
              'To carry domain-specific context that helps the catch handler respond appropriately',
              'To prevent the exception from being caught by a base class handler',
            ],
            correctIndex: 2,
            explanation: 'Extra data members let catch handlers access specific context (e.g., which file was not found, which HTTP status code was returned) beyond the generic what() message, enabling more precise error recovery.',
          },
        ],
        challenge: {
          prompt: 'Create a custom exception class `TemperatureError` that inherits from std::out_of_range. It should store the invalid temperature value and provide a getTemperature() method. Write a function `validateTemp` that throws TemperatureError if the temperature is below -273.15 (absolute zero) or above 1000. Catch and display the invalid temperature.',
          starterCode: `#include <iostream>
#include <stdexcept>
#include <string>
using namespace std;

// TODO: Create TemperatureError class

// TODO: Write validateTemp(double temp)

int main() {
    // TODO: Test with 25.0, -300.0, and 1500.0
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <stdexcept>
#include <string>
using namespace std;

class TemperatureError : public out_of_range {
    double temp;
public:
    TemperatureError(double t)
        : out_of_range("Temperature out of range: " + to_string(t)),
          temp(t) {}
    double getTemperature() const { return temp; }
};

void validateTemp(double temp) {
    if (temp < -273.15) {
        throw TemperatureError(temp);
    }
    if (temp > 1000.0) {
        throw TemperatureError(temp);
    }
    cout << "Temperature " << temp << " C is valid\\n";
}

int main() {
    for (double t : {25.0, -300.0, 1500.0}) {
        try {
            validateTemp(t);
        } catch (const TemperatureError& e) {
            cout << e.what() << " (value: " << e.getTemperature() << ")\\n";
        }
    }
    return 0;
}`,
          hints: [
            'Inherit from std::out_of_range and pass the error message string to its constructor using the initializer list.',
            'Store the double temperature as a private member and expose it via a const getter method.',
            'In the catch block, use the custom getTemperature() method to access the stored value.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  File I/O                                                     */
  /* ------------------------------------------------------------ */
  {
    id: 'file-io',
    label: 'File I/O',
    icon: 'FileText',
    entries: [
      {
        id: 'file-reading',
        title: 'File Reading',
        difficulty: 'intermediate',
        tags: ['ifstream', 'file', 'read', 'input', 'fstream'],
        cheatSheetSummary: 'ifstream file("path"); reads files. getline(file, line) reads line by line. Check file.is_open().',
        sections: [
          {
            heading: 'Reading Files with ifstream',
            content:
              'std::ifstream (input file stream) from <fstream> reads data from files. It works like cin but reads from a file instead of the keyboard. Always check if the file opened successfully with is_open(). Read line by line with getline(), or use >> for formatted input. The file is automatically closed when the ifstream goes out of scope (RAII).',
            code: `#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;

int main() {
    // Writing a test file first
    {
        ofstream out("example.txt");
        out << "Alice 95\\n";
        out << "Bob 87\\n";
        out << "Charlie 92\\n";
    }

    // Reading line by line
    ifstream file("example.txt");
    if (!file.is_open()) {
        cerr << "Could not open file\\n";
        return 1;
    }

    cout << "Line by line:\\n";
    string line;
    while (getline(file, line)) {
        cout << "  " << line << "\\n";
    }

    // Reset to beginning
    file.clear();
    file.seekg(0);

    // Formatted reading with >>
    cout << "\\nFormatted:\\n";
    string name;
    int score;
    while (file >> name >> score) {
        cout << "  " << name << " scored " << score << "\\n";
    }
    file.close();

    // Read entire file into a string
    ifstream f2("example.txt");
    string content((istreambuf_iterator<char>(f2)),
                    istreambuf_iterator<char>());
    cout << "\\nEntire file:\\n" << content;

    return 0;
}`,
            output: `Line by line:
  Alice 95
  Bob 87
  Charlie 92

Formatted:
  Alice scored 95
  Bob scored 87
  Charlie scored 92

Entire file:
Alice 95
Bob 87
Charlie 92`,
            tip: 'Always check is_open() after creating an ifstream. Files may not exist, or you may lack read permissions.',
            analogy: 'Think of it like reading a book from a library: you first check if the book is available (is_open), then read it page by page (getline) or word by word (>>). When you are done, you return it (close), though RAII returns it automatically when you leave the library.',
            codeHighlightLines: [11, 12, 18, 19, 25, 26],
          },
          {
            heading: 'Reading CSV and Structured Data',
            content:
              'Reading structured data like CSV requires parsing each line. Use getline() to read complete lines, then use a stringstream to split each line by delimiters. This two-step approach handles whitespace and custom delimiters reliably.',
            code: `#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
using namespace std;

struct Record {
    string name;
    int age;
    double score;
};

int main() {
    // Create CSV test file
    {
        ofstream out("data.csv");
        out << "Name,Age,Score\\n";
        out << "Alice,20,95.5\\n";
        out << "Bob,22,87.3\\n";
        out << "Charlie,21,92.1\\n";
    }

    // Parse CSV
    ifstream file("data.csv");
    string header;
    getline(file, header);  // Skip header
    cout << "Header: " << header << "\\n\\n";

    vector<Record> records;
    string line;
    while (getline(file, line)) {
        stringstream ss(line);
        Record r;
        string token;

        getline(ss, r.name, ',');
        getline(ss, token, ',');
        r.age = stoi(token);
        getline(ss, token, ',');
        r.score = stod(token);

        records.push_back(r);
    }

    cout << "Records:\\n";
    for (const auto& r : records) {
        cout << "  " << r.name << " (age " << r.age
             << "): " << r.score << "\\n";
    }

    return 0;
}`,
            output: `Header: Name,Age,Score

Records:
  Alice (age 20): 95.5
  Bob (age 22): 87.3
  Charlie (age 21): 92.1`,
          },
        ],
        quiz: [
          {
            question: 'What does file.is_open() check?',
            options: [
              'Whether the file has been fully read',
              'Whether the file stream was successfully associated with a file',
              'Whether the file is locked by another process',
              'Whether the file is empty',
            ],
            correctIndex: 1,
            explanation: 'is_open() returns true if the stream is currently associated with a file, meaning the file was opened successfully. It does not check the file contents or locks.',
          },
          {
            question: 'What does file.clear() do before file.seekg(0)?',
            options: [
              'Deletes the file contents',
              'Clears the stream error/EOF flags so the stream can be used again',
              'Resets the file to an empty state',
              'Closes and reopens the file',
            ],
            correctIndex: 1,
            explanation: 'After reading to the end of a file, the EOF flag is set. clear() resets these internal flags so that subsequent read operations (after seekg to reposition) will work correctly.',
          },
          {
            question: 'How do you read an entire file into a single std::string?',
            options: [
              'Use file.read_all()',
              'Use string content(file)',
              'Use istreambuf_iterator<char> to construct a string from the stream',
              'Use file >> content with a large buffer',
            ],
            correctIndex: 2,
            explanation: 'Constructing a string from istreambuf_iterator<char>(file) to istreambuf_iterator<char>() reads all bytes from the stream into the string in one operation.',
          },
        ],
        challenge: {
          prompt: 'Write a program that creates a text file with 5 lines of "name score" data, then reads it back and finds the student with the highest score. Print the name and score of the top student.',
          starterCode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // TODO: Create a file "students.txt" with 5 students and scores
    // TODO: Read the file and find the student with the highest score
    // TODO: Print the top student's name and score
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // Create test file
    {
        ofstream out("students.txt");
        out << "Alice 85\\n";
        out << "Bob 92\\n";
        out << "Charlie 78\\n";
        out << "Diana 96\\n";
        out << "Eve 88\\n";
    }

    // Read and find highest score
    ifstream file("students.txt");
    if (!file.is_open()) {
        cerr << "Could not open file\\n";
        return 1;
    }

    string bestName;
    int bestScore = -1;
    string name;
    int score;

    while (file >> name >> score) {
        if (score > bestScore) {
            bestScore = score;
            bestName = name;
        }
    }

    cout << "Top student: " << bestName << " with score " << bestScore << "\\n";
    return 0;
}`,
          hints: [
            'Use ofstream to write the file and ifstream to read it back. The file is automatically closed when the stream goes out of scope.',
            'Use the >> operator in a while loop to read name-score pairs. Track the best name and score seen so far.',
          ],
        },
      },
      {
        id: 'file-writing',
        title: 'File Writing',
        difficulty: 'intermediate',
        tags: ['ofstream', 'file', 'write', 'output', 'fstream'],
        cheatSheetSummary: 'ofstream file("path"); writes files. Use << like cout. ios::app to append instead of overwrite.',
        sections: [
          {
            heading: 'Writing Files with ofstream',
            content:
              'std::ofstream (output file stream) writes data to files using the same << operator as cout. By default, it creates a new file or overwrites an existing one. Use ios::app to append instead of overwriting. You can also use ios::binary for binary output.',
            code: `#include <iostream>
#include <fstream>
#include <iomanip>
#include <vector>
using namespace std;

int main() {
    // Basic file writing
    ofstream file("output.txt");
    if (!file.is_open()) {
        cerr << "Cannot open file for writing\\n";
        return 1;
    }

    file << "Hello, File!\\n";
    file << "Number: " << 42 << "\\n";
    file << "Pi: " << fixed << setprecision(4) << 3.14159 << "\\n";
    file.close();

    // Verify by reading back
    ifstream in("output.txt");
    string line;
    cout << "Written content:\\n";
    while (getline(in, line)) cout << "  " << line << "\\n";
    in.close();

    // Append mode
    ofstream appender("output.txt", ios::app);
    appender << "Appended line\\n";
    appender.close();

    // Read again
    ifstream in2("output.txt");
    cout << "\\nAfter append:\\n";
    while (getline(in2, line)) cout << "  " << line << "\\n";

    // Write structured data
    ofstream csv("scores.csv");
    csv << "Name,Score\\n";
    vector<pair<string, int>> data = {
        {"Alice", 95}, {"Bob", 87}, {"Charlie", 92}
    };
    for (const auto& [name, score] : data) {
        csv << name << "," << score << "\\n";
    }
    csv.close();
    cout << "\\nCSV file written successfully\\n";

    return 0;
}`,
            output: `Written content:
  Hello, File!
  Number: 42
  Pi: 3.1416

After append:
  Hello, File!
  Number: 42
  Pi: 3.1416
  Appended line

CSV file written successfully`,
            tip: 'ofstream automatically flushes and closes the file when it goes out of scope. You do not need to call close() explicitly, but it is good practice for clarity.',
          },
        ],
        quiz: [
          {
            question: 'What is the difference between the default ofstream mode and ios::app?',
            options: [
              'Default mode appends; ios::app overwrites',
              'Default mode overwrites the file; ios::app appends to the end',
              'Default mode opens read-only; ios::app opens read-write',
              'There is no difference',
            ],
            correctIndex: 1,
            explanation: 'By default, ofstream truncates (overwrites) the file if it exists. ios::app opens the file for appending, so new data is written after existing content.',
          },
          {
            question: 'What happens if you write to an ofstream that failed to open?',
            options: [
              'The data is written to stdout instead',
              'A runtime exception is thrown',
              'The write operations silently fail (no data is written)',
              'The program crashes immediately',
            ],
            correctIndex: 2,
            explanation: 'If the file failed to open, the stream is in a fail state and all write operations are silently no-ops. Always check is_open() to detect this.',
          },
          {
            question: 'How do you write formatted floating-point numbers with a fixed number of decimal places to a file?',
            options: [
              'file << round(value, places)',
              'file << fixed << setprecision(n) << value',
              'file << value.toFixed(n)',
              'file.setPrecision(n) << value',
            ],
            correctIndex: 1,
            explanation: 'The combination of std::fixed and std::setprecision(n) from <iomanip> controls the number of decimal places when writing floating-point numbers to any output stream.',
          },
        ],
        challenge: {
          prompt: 'Write a program that takes a vector of Product structs (name, price, quantity) and writes them to a CSV file with a header row. Then append a "TOTAL" row with the sum of (price * quantity) for all products.',
          starterCode: `#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <iomanip>
using namespace std;

struct Product {
    string name;
    double price;
    int quantity;
};

int main() {
    vector<Product> products = {
        {"Widget", 9.99, 100},
        {"Gadget", 24.50, 50},
        {"Doohickey", 4.75, 200}
    };

    // TODO: Write products to "inventory.csv" with header
    // TODO: Append a TOTAL row with sum of price*quantity
    // TODO: Read back and print the file contents
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <iomanip>
using namespace std;

struct Product {
    string name;
    double price;
    int quantity;
};

int main() {
    vector<Product> products = {
        {"Widget", 9.99, 100},
        {"Gadget", 24.50, 50},
        {"Doohickey", 4.75, 200}
    };

    // Write CSV
    ofstream csv("inventory.csv");
    csv << "Name,Price,Quantity,Subtotal\\n";
    double total = 0.0;
    for (const auto& p : products) {
        double subtotal = p.price * p.quantity;
        total += subtotal;
        csv << p.name << "," << fixed << setprecision(2)
            << p.price << "," << p.quantity << "," << subtotal << "\\n";
    }
    csv.close();

    // Append total
    ofstream appender("inventory.csv", ios::app);
    appender << "TOTAL,,," << fixed << setprecision(2) << total << "\\n";
    appender.close();

    // Read back
    ifstream reader("inventory.csv");
    string line;
    while (getline(reader, line)) {
        cout << line << "\\n";
    }

    return 0;
}`,
          hints: [
            'Use ofstream to write the header and product rows. Close it, then reopen with ios::app to append the total.',
            'Calculate each subtotal as price * quantity and accumulate the grand total while writing rows.',
            'Use std::fixed and std::setprecision(2) for consistent decimal formatting of prices.',
          ],
        },
      },
      {
        id: 'stringstream',
        title: 'String Streams',
        difficulty: 'intermediate',
        tags: ['stringstream', 'parsing', 'formatting', 'sstream'],
        cheatSheetSummary: 'stringstream ss(str); treats a string as a stream for parsing. Use >> to extract tokens.',
        sections: [
          {
            heading: 'Parsing and Formatting with stringstream',
            content:
              'std::stringstream from <sstream> lets you treat a string as a stream, enabling the same << and >> operations used with cout and cin. This is invaluable for parsing space-separated tokens, converting between types, and building formatted strings. istringstream is input-only, ostringstream is output-only.',
            code: `#include <iostream>
#include <sstream>
#include <string>
#include <vector>
#include <iomanip>
using namespace std;

int main() {
    // Parse space-separated values
    string data = "42 3.14 hello world";
    istringstream iss(data);
    int n;
    double d;
    string s1, s2;
    iss >> n >> d >> s1 >> s2;
    cout << "Parsed: n=" << n << " d=" << d
         << " s1=" << s1 << " s2=" << s2 << "\\n";

    // Split string by spaces
    string sentence = "the quick brown fox jumps";
    istringstream splitter(sentence);
    vector<string> words;
    string word;
    while (splitter >> word) {
        words.push_back(word);
    }
    cout << "Words: " << words.size() << " -> ";
    for (const auto& w : words) cout << "[" << w << "] ";
    cout << "\\n";

    // Split by custom delimiter
    string csv = "Alice,95,A";
    istringstream csvStream(csv);
    string token;
    cout << "CSV tokens: ";
    while (getline(csvStream, token, ',')) {
        cout << token << " | ";
    }
    cout << "\\n";

    // Build formatted string
    ostringstream oss;
    oss << "Score: " << fixed << setprecision(1) << 95.678
        << " (" << setw(5) << setfill('0') << 42 << ")";
    string result = oss.str();
    cout << "Formatted: " << result << "\\n";

    // Type conversion via stringstream
    stringstream converter;
    converter << 255;
    string numStr;
    converter >> numStr;
    cout << "Int to string: " << numStr << "\\n";

    return 0;
}`,
            output: `Parsed: n=42 d=3.14 s1=hello s2=world
Words: 5 -> [the] [quick] [brown] [fox] [jumps]
CSV tokens: Alice | 95 | A |
Formatted: Score: 95.7 (00042)
Int to string: 255`,
            tip: 'For splitting a string by a delimiter, getline(stream, token, delimiter) is the standard approach. It works with any single character as a delimiter.',
          },
        ],
        quiz: [
          {
            question: 'What is the difference between istringstream and ostringstream?',
            options: [
              'istringstream is for integers; ostringstream is for other types',
              'istringstream reads from a string; ostringstream writes to a string',
              'istringstream is faster; ostringstream is safer',
              'They are identical and interchangeable',
            ],
            correctIndex: 1,
            explanation: 'istringstream is an input stream that reads/parses data from a string. ostringstream is an output stream that builds/formats a string. stringstream combines both capabilities.',
          },
          {
            question: 'How do you split a string by a comma using stringstream?',
            options: [
              'ss.split(",")',
              'getline(ss, token, \',\')',
              'ss >> token with comma',
              'ss.tokenize(\',\')',
            ],
            correctIndex: 1,
            explanation: 'getline(stream, string, delimiter) reads up to the delimiter character. When used with a stringstream, it effectively splits the string by that delimiter.',
          },
          {
            question: 'How do you get the resulting string from an ostringstream?',
            options: [
              'oss.toString()',
              'oss.get()',
              'oss.str()',
              'string(oss)',
            ],
            correctIndex: 2,
            explanation: 'The str() method returns the string that has been built up by the output operations on the ostringstream.',
          },
        ],
        challenge: {
          prompt: 'Write a function `parsePairs` that takes a string like "key1=val1;key2=val2;key3=val3" and returns a vector of pairs. Use stringstream with getline to split by ";" first, then by "=" for each pair. Print the resulting key-value pairs.',
          starterCode: `#include <iostream>
#include <sstream>
#include <string>
#include <vector>
#include <utility>
using namespace std;

// TODO: Write parsePairs function

int main() {
    string input = "name=Alice;age=25;city=Paris";
    // TODO: Parse and print key-value pairs
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <sstream>
#include <string>
#include <vector>
#include <utility>
using namespace std;

vector<pair<string, string>> parsePairs(const string& input) {
    vector<pair<string, string>> result;
    istringstream ss(input);
    string segment;
    while (getline(ss, segment, ';')) {
        istringstream pairStream(segment);
        string key, value;
        getline(pairStream, key, '=');
        getline(pairStream, value);
        result.emplace_back(key, value);
    }
    return result;
}

int main() {
    string input = "name=Alice;age=25;city=Paris";
    auto pairs = parsePairs(input);
    for (const auto& [key, value] : pairs) {
        cout << key << " -> " << value << "\\n";
    }
    return 0;
}`,
          hints: [
            'Use getline with ";" as a delimiter on the outer stringstream to get each key=value segment.',
            'For each segment, create a new istringstream and use getline with "=" to split into key and value.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Advanced C++                                                 */
  /* ------------------------------------------------------------ */
  {
    id: 'advanced-cpp',
    label: 'Advanced C++',
    icon: 'Zap',
    entries: [
      {
        id: 'move-semantics',
        title: 'Move Semantics',
        difficulty: 'advanced',
        tags: ['move', 'rvalue', 'std-move', 'c++11', 'performance'],
        cheatSheetSummary: 'std::move(obj) casts to rvalue reference, enabling transfer of resources instead of copying.',
        sections: [
          {
            heading: 'Understanding Move Semantics',
            content:
              'Move semantics, introduced in C++11, allow resources to be transferred from one object to another instead of being copied. This avoids expensive deep copies when the source object is temporary or no longer needed. A move "steals" the internal resources (like heap-allocated memory) from the source, leaving it in a valid but unspecified state.',
            code: `#include <iostream>
#include <string>
#include <vector>
#include <utility>
using namespace std;

class Buffer {
    int* data;
    int size;

public:
    Buffer(int n) : data(new int[n]), size(n) {
        for (int i = 0; i < n; i++) data[i] = i;
        cout << "Constructed (size=" << n << ")\\n";
    }

    // Copy constructor (expensive)
    Buffer(const Buffer& other) : data(new int[other.size]), size(other.size) {
        copy(other.data, other.data + size, data);
        cout << "Copied (size=" << size << ")\\n";
    }

    // Move constructor (cheap: just steal pointers)
    Buffer(Buffer&& other) noexcept : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
        cout << "Moved (size=" << size << ")\\n";
    }

    ~Buffer() {
        delete[] data;
    }

    int getSize() const { return size; }
};

int main() {
    Buffer b1(1000);           // Construct

    Buffer b2 = b1;            // Copy (expensive)
    Buffer b3 = move(b1);     // Move (cheap)

    cout << "b1 size after move: " << b1.getSize() << "\\n";
    cout << "b2 size (copy): " << b2.getSize() << "\\n";
    cout << "b3 size (move): " << b3.getSize() << "\\n";

    return 0;
}`,
            output: `Constructed (size=1000)
Copied (size=1000)
Moved (size=1000)
b1 size after move: 0
b2 size (copy): 1000
b3 size (move): 1000`,
            warning: 'After std::move(obj), the object is in a valid but unspecified state. Do not use its value; only assign to it or destroy it.',
            analogy: 'Think of it like moving house instead of building a duplicate: rather than buying all new furniture (copy), you load your existing furniture onto a truck and drive it to the new address (move). The old house is left empty but still standing.',
            codeHighlightLines: [14, 15, 16, 17, 18, 30, 31],
            diagram: {
              kind: 'custom' as const,
              type: 'memory-layout' as const,
              data: {
                title: 'Move vs Copy: Resource Transfer',
                sections: [
                  {
                    label: 'Before Copy (b2 = b1)',
                    items: [
                      { label: 'b1.data', value: '0x7A00', size: 8, color: '#3b82f6' },
                      { label: 'b1.size', value: '1000', size: 4, color: '#3b82f6' },
                      { label: 'Heap [0x7A00]', value: '[0, 1, 2, ... 999]', size: 16, color: '#93c5fd' },
                      { label: 'b2.data', value: '0x8B00 (new alloc)', size: 8, color: '#22c55e' },
                      { label: 'b2.size', value: '1000', size: 4, color: '#22c55e' },
                      { label: 'Heap [0x8B00]', value: '[0, 1, 2, ... 999] (deep copy)', size: 16, color: '#86efac' },
                    ],
                  },
                  {
                    label: 'After Move (b3 = move(b1))',
                    items: [
                      { label: 'b1.data', value: 'nullptr (stolen)', size: 8, color: '#ef4444' },
                      { label: 'b1.size', value: '0', size: 4, color: '#ef4444' },
                      { label: 'b3.data', value: '0x7A00 (transferred)', size: 8, color: '#a855f7' },
                      { label: 'b3.size', value: '1000', size: 4, color: '#a855f7' },
                      { label: 'Heap [0x7A00]', value: '[0, 1, 2, ... 999] (same memory)', size: 16, color: '#c4b5fd' },
                    ],
                  },
                ],
              },
              caption: 'Copy allocates new heap memory and duplicates data (expensive). Move transfers the pointer and nullifies the source (cheap O(1) operation).',
            },
          },
          {
            heading: 'Practical Move Usage',
            content:
              'Move semantics are automatically used for temporaries (rvalues) and when you explicitly use std::move. STL containers leverage move semantics extensively: push_back with move avoids copies, vector reallocation moves elements instead of copying them (if the move constructor is noexcept), and returning local variables from functions triggers move or copy elision.',
            code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

string createGreeting(const string& name) {
    string result = "Hello, " + name + "!";
    return result;  // Move (or copy elision - even better!)
}

int main() {
    // Automatic move for temporaries
    vector<string> names;
    names.push_back("Alice");           // Copies string literal to string, then moves
    names.push_back(string("Bob"));    // Temporary moved
    names.emplace_back("Charlie");     // Constructed in place (best)

    cout << "Names: ";
    for (const auto& n : names) cout << n << " ";
    cout << "\\n";

    // Explicit move for owned resources
    string s = "Transfer me";
    names.push_back(move(s));
    cout << "After move, s = \\"" << s << "\\"\\n";
    cout << "Last name: " << names.back() << "\\n";

    // Move from function return
    string greeting = createGreeting("World");
    cout << greeting << "\\n";

    // Move with unique_ptr
    auto p1 = make_unique<int>(42);
    auto p2 = move(p1);  // Transfer ownership
    cout << "p1 is null: " << (p1 == nullptr) << "\\n";
    cout << "p2 value: " << *p2 << "\\n";

    return 0;
}`,
            output: `Names: Alice Bob Charlie
After move, s = ""
Last name: Transfer me
Hello, World!
p1 is null: 1
p2 value: 42`,
            tip: 'Prefer emplace_back over push_back when constructing objects in-place. It avoids both copying and moving by constructing the object directly in the container.',
          },
        ],
        quiz: [
          {
            question: 'What state is an object left in after std::move is applied to it?',
            options: [
              'Deleted and inaccessible',
              'Unchanged; std::move has no effect',
              'Valid but unspecified state',
              'Null pointer state',
            ],
            correctIndex: 2,
            explanation: 'After being moved from, an object is in a "valid but unspecified" state. You should only assign to it or destroy it; do not rely on its value.',
          },
          {
            question: 'Why should a move constructor be marked noexcept?',
            options: [
              'It is a syntax requirement for move constructors',
              'Because STL containers use move only if it is noexcept (otherwise they fall back to copying for exception safety)',
              'To prevent the moved-from object from throwing',
              'To make the move constructor run at compile time',
            ],
            correctIndex: 1,
            explanation: 'STL containers like std::vector need strong exception guarantees during reallocation. They only use move if the move constructor is noexcept; otherwise, they copy to ensure that a failed move does not lose data.',
          },
          {
            question: 'What is the key performance difference between a copy and a move?',
            options: [
              'Move uses less stack memory',
              'Copy transfers ownership; move duplicates data',
              'Move transfers internal resources (like pointers) in O(1); copy duplicates all data',
              'They have identical performance in modern compilers',
            ],
            correctIndex: 2,
            explanation: 'A move constructor typically just copies a few pointers and sizes (O(1)), while a copy constructor duplicates all owned data (O(n)). This is a major performance improvement for resource-heavy objects.',
          },
          {
            question: 'What does std::move actually do?',
            options: [
              'It physically moves memory from one location to another',
              'It performs a static_cast to an rvalue reference, enabling move semantics',
              'It calls the object destructor and creates a new object',
              'It swaps two objects',
            ],
            correctIndex: 1,
            explanation: 'std::move is just a cast to T&& (rvalue reference). It does not move anything itself; it enables the move constructor or move assignment operator to be called instead of the copy version.',
          },
        ],
        challenge: {
          prompt: 'Create a class `DynamicArray` that manages a heap-allocated int array. Implement a move constructor and move assignment operator that transfer ownership of the array. Demonstrate that moving is used instead of copying by printing messages in each constructor.',
          starterCode: `#include <iostream>
#include <utility>
using namespace std;

class DynamicArray {
    int* data;
    int size;
public:
    // TODO: Constructor that allocates array of given size
    // TODO: Copy constructor
    // TODO: Move constructor (noexcept)
    // TODO: Destructor
    int getSize() const { return size; }
};

int main() {
    DynamicArray a(5);
    DynamicArray b = a;          // Should copy
    DynamicArray c = move(a);    // Should move
    cout << "a size: " << a.getSize() << "\\n";
    cout << "b size: " << b.getSize() << "\\n";
    cout << "c size: " << c.getSize() << "\\n";
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <utility>
#include <algorithm>
using namespace std;

class DynamicArray {
    int* data;
    int size;
public:
    DynamicArray(int n) : data(new int[n]), size(n) {
        fill(data, data + n, 0);
        cout << "Constructed (size=" << n << ")\\n";
    }

    DynamicArray(const DynamicArray& other) : data(new int[other.size]), size(other.size) {
        copy(other.data, other.data + size, data);
        cout << "Copied (size=" << size << ")\\n";
    }

    DynamicArray(DynamicArray&& other) noexcept : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
        cout << "Moved (size=" << size << ")\\n";
    }

    ~DynamicArray() { delete[] data; }

    int getSize() const { return size; }
};

int main() {
    DynamicArray a(5);
    DynamicArray b = a;          // Copy
    DynamicArray c = move(a);    // Move
    cout << "a size: " << a.getSize() << "\\n";
    cout << "b size: " << b.getSize() << "\\n";
    cout << "c size: " << c.getSize() << "\\n";
    return 0;
}`,
          hints: [
            'The move constructor should steal the pointer from the source object and set the source pointer to nullptr.',
            'Mark the move constructor noexcept so STL containers can use it during reallocation.',
            'After moving, set the source size to 0 and data to nullptr to leave it in a valid empty state.',
          ],
        },
      },
      {
        id: 'rvalue-references',
        title: 'Rvalue References',
        difficulty: 'advanced',
        tags: ['rvalue', 'lvalue', 'reference', 'c++11', 'forwarding'],
        cheatSheetSummary: 'T&& is an rvalue reference - binds to temporaries. Use for move constructors and perfect forwarding.',
        sections: [
          {
            heading: 'Lvalues vs Rvalues',
            content:
              'In C++, every expression is either an lvalue (has a persistent identity, you can take its address) or an rvalue (temporary, about to be destroyed). Lvalue references (T&) bind to lvalues, and rvalue references (T&&) bind to rvalues (temporaries). Understanding this distinction is essential for writing move constructors and perfect forwarding templates.',
            code: `#include <iostream>
#include <string>
using namespace std;

void process(const string& s) {
    cout << "Lvalue ref: " << s << "\\n";
}

void process(string&& s) {
    cout << "Rvalue ref: " << s << "\\n";
    // Can safely modify/steal from s since it is a temporary
}

// Overloading shows which version is called
void identify(int& x)       { cout << x << " is lvalue\\n"; }
void identify(int&& x)      { cout << x << " is rvalue\\n"; }
void identify(const int& x) { cout << x << " is const lvalue\\n"; }

int main() {
    string name = "Alice";

    process(name);              // Lvalue: name persists
    process(string("Bob"));    // Rvalue: temporary
    process(move(name));        // Rvalue: std::move casts to rvalue

    cout << "\\n";
    int x = 42;
    identify(x);       // lvalue
    identify(42);      // rvalue
    identify(x + 1);   // rvalue (expression result)

    const int y = 10;
    identify(y);       // const lvalue

    return 0;
}`,
            output: `Lvalue ref: Alice
Rvalue ref: Bob
Rvalue ref: Alice

42 is lvalue
42 is rvalue
43 is rvalue
10 is const lvalue`,
          },
          {
            heading: 'Perfect Forwarding',
            content:
              'Perfect forwarding preserves the value category (lvalue/rvalue) of arguments through template functions. It uses a forwarding reference (T&&) combined with std::forward<T>(). This is essential for writing generic wrapper functions, factory functions, and the emplace family of container methods.',
            code: `#include <iostream>
#include <string>
#include <utility>
using namespace std;

class Widget {
    string name;
public:
    Widget(const string& n) : name(n) {
        cout << "Constructed from lvalue: " << name << "\\n";
    }
    Widget(string&& n) : name(move(n)) {
        cout << "Constructed from rvalue: " << name << "\\n";
    }
};

// Perfect forwarding factory
template<typename T, typename... Args>
T create(Args&&... args) {
    return T(forward<Args>(args)...);
}

// Forwarding wrapper
template<typename F, typename... Args>
auto wrapper(F&& func, Args&&... args) {
    cout << "Before call\\n";
    auto result = forward<F>(func)(forward<Args>(args)...);
    cout << "After call\\n";
    return result;
}

int add(int a, int b) { return a + b; }

int main() {
    string name = "Alice";
    Widget w1 = create<Widget>(name);          // Forwards as lvalue
    Widget w2 = create<Widget>(string("Bob")); // Forwards as rvalue

    int result = wrapper(add, 3, 4);
    cout << "Result: " << result << "\\n";

    return 0;
}`,
            output: `Constructed from lvalue: Alice
Constructed from rvalue: Bob
Before call
After call
Result: 7`,
            note: 'T&& in a template context is a forwarding reference (not an rvalue reference). It deduces to T& for lvalues and T&& for rvalues. Always use std::forward, not std::move, with forwarding references.',
          },
        ],
        quiz: [
          {
            question: 'Which of the following is an rvalue?',
            options: [
              'A named variable: int x = 5;',
              'A function parameter: void f(int n)',
              'A temporary expression: x + 1',
              'A dereferenced pointer: *ptr',
            ],
            correctIndex: 2,
            explanation: 'Rvalues are temporary expressions without persistent identity. The result of x + 1 is a temporary that cannot have its address taken. Named variables, parameters, and dereferenced pointers are lvalues.',
          },
          {
            question: 'What is a forwarding reference (universal reference)?',
            options: [
              'Any reference declared with &&',
              'T&& where T is a deduced template parameter',
              'A const lvalue reference',
              'A reference that can only bind to rvalues',
            ],
            correctIndex: 1,
            explanation: 'A forwarding reference is T&& where T is a deduced template type parameter. It can bind to both lvalues and rvalues, deducing T& for lvalues and T for rvalues. A non-template T&& is just an rvalue reference.',
          },
          {
            question: 'Why should you use std::forward instead of std::move with forwarding references?',
            options: [
              'std::forward is faster than std::move',
              'std::move does not work with templates',
              'std::forward preserves the original value category (lvalue/rvalue), while std::move always converts to rvalue',
              'std::forward prevents exceptions',
            ],
            correctIndex: 2,
            explanation: 'std::forward conditionally casts to rvalue only if the original argument was an rvalue, preserving lvalue arguments as lvalues. std::move unconditionally casts to rvalue, which would incorrectly force a move on lvalue arguments.',
          },
        ],
        challenge: {
          prompt: 'Write a template factory function `make` that uses perfect forwarding to construct an object of any type. Demonstrate it with a class that has both lvalue and rvalue constructor overloads, showing that the correct overload is called for each case.',
          starterCode: `#include <iostream>
#include <string>
#include <utility>
using namespace std;

class Message {
public:
    Message(const string& s) { cout << "Lvalue ctor: " << s << "\\n"; }
    Message(string&& s) { cout << "Rvalue ctor: " << s << "\\n"; }
};

// TODO: Write template make function with perfect forwarding

int main() {
    string text = "Hello";
    // TODO: Call make<Message> with an lvalue and an rvalue
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
#include <utility>
using namespace std;

class Message {
public:
    Message(const string& s) { cout << "Lvalue ctor: " << s << "\\n"; }
    Message(string&& s) { cout << "Rvalue ctor: " << s << "\\n"; }
};

template<typename T, typename... Args>
T make(Args&&... args) {
    return T(forward<Args>(args)...);
}

int main() {
    string text = "Hello";
    auto m1 = make<Message>(text);              // Lvalue forwarded
    auto m2 = make<Message>(string("World"));   // Rvalue forwarded
    auto m3 = make<Message>(move(text));         // Rvalue via move
    return 0;
}`,
          hints: [
            'Use Args&&... as the parameter pack with std::forward<Args>(args)... in the function body.',
            'The key is that the factory function does not decide lvalue vs rvalue -- it preserves whatever the caller passed.',
          ],
        },
      },
      {
        id: 'constexpr',
        title: 'Constexpr',
        difficulty: 'advanced',
        tags: ['constexpr', 'compile-time', 'constant', 'c++11', 'c++17'],
        cheatSheetSummary: 'constexpr enables compile-time evaluation. constexpr functions, variables, and if statements.',
        sections: [
          {
            heading: 'Compile-Time Computation',
            content:
              'constexpr allows computations to happen at compile time, eliminating runtime overhead. C++11 introduced constexpr for simple functions. C++14 relaxed the restrictions, allowing loops and local variables. C++17 added constexpr if for compile-time branching. C++20 further extended it to support virtual functions and dynamic allocation.',
            code: `#include <iostream>
#include <array>
using namespace std;

// constexpr function: computed at compile time when possible
constexpr int factorial(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

constexpr int fibonacci(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

// constexpr if (C++17): compile-time branching
template<typename T>
string typeDescription() {
    if constexpr (is_integral_v<T>) {
        return "integer type";
    } else if constexpr (is_floating_point_v<T>) {
        return "floating-point type";
    } else {
        return "other type";
    }
}

int main() {
    // Compile-time evaluation
    constexpr int fact5 = factorial(5);
    constexpr int fib10 = fibonacci(10);

    cout << "5! = " << fact5 << "\\n";
    cout << "fib(10) = " << fib10 << "\\n";

    // Use in array sizes (requires compile-time constant)
    constexpr int SIZE = factorial(4);
    array<int, SIZE> arr{};
    cout << "Array size: " << arr.size() << "\\n";

    // Runtime evaluation also works
    int n = 7;
    cout << "7! = " << factorial(n) << "\\n";

    // constexpr if
    cout << "int: " << typeDescription<int>() << "\\n";
    cout << "double: " << typeDescription<double>() << "\\n";
    cout << "string: " << typeDescription<string>() << "\\n";

    return 0;
}`,
            output: `5! = 120
fib(10) = 55
Array size: 24
7! = 5040
int: integer type
double: floating-point type
string: other type`,
            tip: 'constexpr if eliminates branches at compile time, making template code cleaner and avoiding SFINAE for simple type dispatch.',
            analogy: 'Think of it like pre-computing an answer sheet before the exam: the compiler solves the math problems during compilation so the running program just looks up the answers instead of doing the calculations.',
            codeHighlightLines: [5, 6, 13, 14, 37, 38],
          },
        ],
        quiz: [
          {
            question: 'When is a constexpr function evaluated at compile time?',
            options: [
              'Always, regardless of how it is called',
              'Only when its result is assigned to a constexpr variable or used in a compile-time context',
              'Never; constexpr is only a hint to the compiler',
              'Only when called with literal arguments',
            ],
            correctIndex: 1,
            explanation: 'A constexpr function is evaluated at compile time when its result is required in a constant expression context (e.g., assigned to a constexpr variable, used as an array size). Otherwise, it may be evaluated at runtime.',
          },
          {
            question: 'What does "if constexpr" (C++17) do differently from a regular "if"?',
            options: [
              'It runs the condition check faster at runtime',
              'It evaluates the condition at compile time and discards the untaken branch entirely',
              'It makes the if statement thread-safe',
              'It requires the condition to use constexpr variables',
            ],
            correctIndex: 1,
            explanation: 'if constexpr evaluates the condition at compile time. The untaken branch is completely discarded and not compiled, which is essential for template code where the untaken branch might contain invalid code for certain type parameters.',
          },
          {
            question: 'Can a constexpr function contain loops and local variables in C++14 and later?',
            options: [
              'No, constexpr functions must be a single return statement',
              'Yes, C++14 relaxed the restrictions to allow loops, local variables, and multiple statements',
              'Only for loops, not while loops',
              'Only if the function is also inline',
            ],
            correctIndex: 1,
            explanation: 'C++11 constexpr functions were limited to a single return statement. C++14 removed most restrictions, allowing loops, local variables, multiple statements, and more within constexpr functions.',
          },
        ],
        challenge: {
          prompt: 'Write a constexpr function `isPrime` that checks if a number is prime at compile time. Use it to create a constexpr array of the first 5 primes by checking numbers at compile time. Print the results at runtime.',
          starterCode: `#include <iostream>
#include <array>
using namespace std;

// TODO: Write constexpr isPrime function

// TODO: Create constexpr array of first 5 primes

int main() {
    // TODO: Print the primes
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <array>
using namespace std;

constexpr bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

constexpr array<int, 5> findFirstPrimes() {
    array<int, 5> primes{};
    int count = 0;
    int num = 2;
    while (count < 5) {
        if (isPrime(num)) {
            primes[count] = num;
            count++;
        }
        num++;
    }
    return primes;
}

int main() {
    constexpr auto primes = findFirstPrimes();
    cout << "First 5 primes: ";
    for (int p : primes) {
        cout << p << " ";
    }
    cout << "\\n";

    // Verify compile-time evaluation
    static_assert(isPrime(7), "7 should be prime");
    static_assert(!isPrime(9), "9 should not be prime");
    cout << "static_assert checks passed\\n";
    return 0;
}`,
          hints: [
            'A constexpr function can use loops in C++14 and later. Check divisibility from 2 up to the square root of n.',
            'Create a constexpr helper function that loops through numbers, collecting primes into a std::array.',
            'Use static_assert to verify at compile time that your isPrime function works correctly.',
          ],
        },
      },
      {
        id: 'optional',
        title: 'std::optional',
        difficulty: 'advanced',
        tags: ['optional', 'nullable', 'c++17', 'maybe'],
        cheatSheetSummary: 'optional<T> holds either a value or nothing (nullopt). Check with has_value() or implicit bool conversion.',
        sections: [
          {
            heading: 'Optional Values',
            content:
              'std::optional (C++17) represents a value that may or may not be present, replacing the error-prone practice of using special sentinel values, out-parameters, or pointers to indicate missing values. It provides safe, expressive handling of "no value" scenarios without the overhead of dynamic allocation.',
            code: `#include <iostream>
#include <optional>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

optional<int> findIndex(const vector<int>& v, int target) {
    for (int i = 0; i < (int)v.size(); i++) {
        if (v[i] == target) return i;
    }
    return nullopt;  // No value
}

optional<string> getMiddleName(bool hasMiddle) {
    if (hasMiddle) return "Marie";
    return nullopt;
}

int main() {
    vector<int> nums = {10, 20, 30, 40, 50};

    // Check and use optional
    auto idx = findIndex(nums, 30);
    if (idx.has_value()) {
        cout << "Found 30 at index " << idx.value() << "\\n";
    }

    // Short form with implicit bool conversion
    if (auto idx2 = findIndex(nums, 99)) {
        cout << "Found at " << *idx2 << "\\n";
    } else {
        cout << "99 not found\\n";
    }

    // value_or: provide default
    auto idx3 = findIndex(nums, 99);
    cout << "Index or -1: " << idx3.value_or(-1) << "\\n";

    // Optional with strings
    auto middle = getMiddleName(true);
    cout << "Middle name: " << middle.value_or("(none)") << "\\n";

    auto noMiddle = getMiddleName(false);
    cout << "Middle name: " << noMiddle.value_or("(none)") << "\\n";

    // Creating optionals
    optional<int> empty;
    optional<int> full = 42;
    optional<int> made = make_optional(99);

    cout << "empty: " << empty.has_value() << "\\n";
    cout << "full: " << *full << "\\n";
    cout << "made: " << *made << "\\n";

    return 0;
}`,
            output: `Found 30 at index 2
99 not found
Index or -1: -1
Middle name: Marie
Middle name: (none)
empty: 0
full: 42
made: 99`,
            warning: 'Calling .value() on an empty optional throws std::bad_optional_access. Always check has_value() first, or use value_or() for a safe default.',
            analogy: 'Think of it like a gift box that might be empty: instead of peeking inside a raw pointer that could be null, optional gives you a safe box with has_value() to check before opening and value_or() to provide a backup gift if the box is empty.',
            codeHighlightLines: [8, 9, 12, 13, 18, 19],
          },
        ],
        quiz: [
          {
            question: 'What does std::optional::value_or(default) do?',
            options: [
              'Always returns the default value',
              'Returns the contained value if present, otherwise returns the provided default',
              'Sets the optional to the default value',
              'Throws if the optional is empty',
            ],
            correctIndex: 1,
            explanation: 'value_or() is a safe accessor that returns the stored value if the optional has one, or the provided default value if the optional is empty (nullopt). It never throws.',
          },
          {
            question: 'What happens when you call .value() on an empty std::optional?',
            options: [
              'It returns a default-constructed value',
              'It returns nullopt',
              'It throws std::bad_optional_access',
              'It causes undefined behavior',
            ],
            correctIndex: 2,
            explanation: 'Calling .value() on an empty optional throws std::bad_optional_access. To avoid this, check has_value() first or use value_or() for a safe fallback.',
          },
          {
            question: 'How do you create an empty std::optional?',
            options: [
              'optional<int> opt = nullptr;',
              'optional<int> opt = nullopt; or optional<int> opt;',
              'optional<int> opt = 0;',
              'optional<int> opt = void;',
            ],
            correctIndex: 1,
            explanation: 'An optional can be made empty by assigning std::nullopt or by default construction. Both create an optional with no value. Note that optional<int> opt = 0 creates an optional containing the value 0, not an empty optional.',
          },
          {
            question: 'What advantage does std::optional have over using a pointer to represent "no value"?',
            options: [
              'Optional is always faster than pointers',
              'Optional avoids dynamic allocation, dangling pointers, and null dereference issues while clearly expressing intent',
              'Optional uses less memory than pointers',
              'Optional supports polymorphism while pointers do not',
            ],
            correctIndex: 1,
            explanation: 'std::optional stores the value inline (no heap allocation), has clear semantics for "no value" via nullopt, and prevents common pointer pitfalls like dangling references and forgetting null checks.',
          },
        ],
        challenge: {
          prompt: 'Write a function `findUser` that searches a vector of User structs by name and returns std::optional<User>. If found, return the user; if not, return nullopt. Also write a `getDisplayName` function that takes an optional<string> nickname and returns the nickname if present, or "Anonymous" otherwise.',
          starterCode: `#include <iostream>
#include <optional>
#include <string>
#include <vector>
using namespace std;

struct User {
    string name;
    int age;
};

// TODO: Write findUser function
// TODO: Write getDisplayName function

int main() {
    vector<User> users = {{"Alice", 30}, {"Bob", 25}, {"Charlie", 35}};
    // TODO: Search for "Bob" and "Dave", printing results
    // TODO: Test getDisplayName with and without a nickname
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <optional>
#include <string>
#include <vector>
using namespace std;

struct User {
    string name;
    int age;
};

optional<User> findUser(const vector<User>& users, const string& name) {
    for (const auto& user : users) {
        if (user.name == name) return user;
    }
    return nullopt;
}

string getDisplayName(const optional<string>& nickname) {
    return nickname.value_or("Anonymous");
}

int main() {
    vector<User> users = {{"Alice", 30}, {"Bob", 25}, {"Charlie", 35}};

    if (auto user = findUser(users, "Bob")) {
        cout << "Found: " << user->name << " (age " << user->age << ")\\n";
    }

    if (auto user = findUser(users, "Dave")) {
        cout << "Found: " << user->name << "\\n";
    } else {
        cout << "Dave not found\\n";
    }

    cout << "Display: " << getDisplayName("CoolUser") << "\\n";
    cout << "Display: " << getDisplayName(nullopt) << "\\n";

    return 0;
}`,
          hints: [
            'Return nullopt from findUser when no matching user is found, and the User directly when found (it will be wrapped in optional automatically).',
            'Use value_or("Anonymous") in getDisplayName for a clean one-liner that handles both cases.',
          ],
        },
      },
      {
        id: 'variant',
        title: 'std::variant',
        difficulty: 'advanced',
        tags: ['variant', 'union', 'type-safe', 'c++17', 'visit'],
        cheatSheetSummary: 'variant<int, string, double> holds exactly one of the listed types. Use visit() for pattern matching.',
        sections: [
          {
            heading: 'Type-Safe Union',
            content:
              'std::variant (C++17) is a type-safe union that can hold a value of one of several specified types. Unlike raw C unions, variant tracks which type is currently stored and prevents accessing the wrong type. std::visit provides pattern-matching-like dispatch over the stored type.',
            code: `#include <iostream>
#include <variant>
#include <string>
#include <vector>
using namespace std;

using Value = variant<int, double, string>;

void printValue(const Value& v) {
    visit([](const auto& val) {
        cout << val;
    }, v);
}

string typeOf(const Value& v) {
    return visit([](const auto& val) -> string {
        using T = decay_t<decltype(val)>;
        if constexpr (is_same_v<T, int>) return "int";
        else if constexpr (is_same_v<T, double>) return "double";
        else if constexpr (is_same_v<T, string>) return "string";
        else return "unknown";
    }, v);
}

int main() {
    Value v1 = 42;
    Value v2 = 3.14;
    Value v3 = string("hello");

    // Check which type is held
    cout << "v1 holds index " << v1.index() << " (";
    printValue(v1);
    cout << ") type: " << typeOf(v1) << "\\n";

    cout << "v2 holds index " << v2.index() << " (";
    printValue(v2);
    cout << ") type: " << typeOf(v2) << "\\n";

    cout << "v3 holds index " << v3.index() << " (";
    printValue(v3);
    cout << ") type: " << typeOf(v3) << "\\n";

    // Get value (throws bad_variant_access if wrong type)
    cout << "\\nget<int>(v1) = " << get<int>(v1) << "\\n";
    cout << "get<string>(v3) = " << get<string>(v3) << "\\n";

    // get_if returns pointer (nullptr if wrong type)
    if (auto* p = get_if<int>(&v1)) {
        cout << "v1 as int: " << *p << "\\n";
    }
    if (auto* p = get_if<string>(&v1)) {
        cout << "v1 as string: " << *p << "\\n";
    } else {
        cout << "v1 is not a string\\n";
    }

    // Variant in a collection
    vector<Value> values = {42, 3.14, string("world"), 100};
    cout << "\\nAll values: ";
    for (const auto& val : values) {
        printValue(val);
        cout << " ";
    }
    cout << "\\n";

    return 0;
}`,
            output: `v1 holds index 0 (42) type: int
v2 holds index 1 (3.14) type: double
v3 holds index 2 (hello) type: string

get<int>(v1) = 42
get<string>(v3) = hello
v1 as int: 42
v1 is not a string

All values: 42 3.14 world 100`,
            tip: 'Use std::visit with a lambda overload set for clean pattern matching. The overloaded{} helper (a common idiom) lets you write visitor lambdas for each type.',
          },
        ],
        quiz: [
          {
            question: 'What does std::variant::index() return?',
            options: [
              'The value stored in the variant',
              'The zero-based index of the currently active type in the template parameter list',
              'The total number of types the variant can hold',
              'The memory size of the current value',
            ],
            correctIndex: 1,
            explanation: 'index() returns the zero-based index indicating which of the template parameter types is currently stored. For variant<int, double, string>, an int gives index 0, double gives 1, string gives 2.',
          },
          {
            question: 'What happens when you call std::get<T>(v) with the wrong type?',
            options: [
              'Returns a default-constructed T',
              'Returns nullopt',
              'Throws std::bad_variant_access',
              'Returns the value cast to T',
            ],
            correctIndex: 2,
            explanation: 'std::get<T> throws std::bad_variant_access if the variant does not currently hold a value of type T. Use get_if for a non-throwing alternative that returns a pointer (or nullptr).',
          },
          {
            question: 'What is std::visit used for with variants?',
            options: [
              'To check if the variant is empty',
              'To apply a callable (visitor) to the currently stored value, dispatching to the correct overload',
              'To convert between variant types',
              'To iterate over all possible types in the variant',
            ],
            correctIndex: 1,
            explanation: 'std::visit applies a visitor callable to the value stored in the variant, automatically dispatching to the correct overload based on the active type. This enables pattern-matching-like behavior.',
          },
        ],
        challenge: {
          prompt: 'Create a variant-based simple calculator. Define a variant type `Expr` that can hold an int, double, or string (for error messages). Write an `evaluate` function that takes two Expr values and a char operator (+, -, *, /) and returns an Expr result. Use std::visit to handle the computation. If either operand is a string (error), propagate it.',
          starterCode: `#include <iostream>
#include <variant>
#include <string>
using namespace std;

using Expr = variant<int, double, string>;

// TODO: Write evaluate function
// TODO: Write printExpr function

int main() {
    Expr a = 10;
    Expr b = 3.5;
    Expr err = string("Error: undefined");

    // TODO: Evaluate a + b, a / 0, and err + a
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <variant>
#include <string>
using namespace std;

using Expr = variant<int, double, string>;

void printExpr(const Expr& e) {
    visit([](const auto& val) {
        cout << val;
    }, e);
}

Expr evaluate(const Expr& lhs, const Expr& rhs, char op) {
    return visit([op](const auto& a, const auto& b) -> Expr {
        using A = decay_t<decltype(a)>;
        using B = decay_t<decltype(b)>;

        // Propagate errors
        if constexpr (is_same_v<A, string>) return a;
        else if constexpr (is_same_v<B, string>) return b;
        else {
            switch (op) {
                case '+': return Expr(double(a) + double(b));
                case '-': return Expr(double(a) - double(b));
                case '*': return Expr(double(a) * double(b));
                case '/':
                    if (b == 0) return Expr(string("Error: division by zero"));
                    return Expr(double(a) / double(b));
                default:  return Expr(string("Error: unknown operator"));
            }
        }
    }, lhs, rhs);
}

int main() {
    Expr a = 10;
    Expr b = 3.5;
    Expr err = string("Error: undefined");

    auto r1 = evaluate(a, b, '+');
    cout << "10 + 3.5 = "; printExpr(r1); cout << "\\n";

    auto r2 = evaluate(a, Expr(0), '/');
    cout << "10 / 0 = "; printExpr(r2); cout << "\\n";

    auto r3 = evaluate(err, a, '+');
    cout << "err + 10 = "; printExpr(r3); cout << "\\n";

    return 0;
}`,
          hints: [
            'Use std::visit with two variant arguments to get all combinations of types. Use if constexpr to check if either type is string.',
            'Cast numeric types to double before arithmetic to handle mixed int/double operations.',
            'Return Expr(string("error message")) for error cases like division by zero.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Concurrency                                                  */
  /* ------------------------------------------------------------ */
  {
    id: 'concurrency',
    label: 'Concurrency',
    icon: 'Layers',
    entries: [
      {
        id: 'threads',
        title: 'Threads',
        difficulty: 'advanced',
        tags: ['thread', 'concurrency', 'parallel', 'c++11'],
        cheatSheetSummary: 'std::thread t(func, args...); starts a new thread. Must call t.join() or t.detach() before destruction.',
        sections: [
          {
            heading: 'Creating and Managing Threads',
            content:
              'std::thread from <thread> creates a new thread of execution. You pass a callable (function, lambda, or functor) and its arguments. Every thread must be either joined (wait for completion) or detached (run independently) before the thread object is destroyed. Failing to do so calls std::terminate.',
            code: `#include <iostream>
#include <thread>
#include <string>
#include <vector>
using namespace std;

void printMessage(const string& msg, int count) {
    for (int i = 0; i < count; i++) {
        cout << msg << " (" << i + 1 << ")\\n";
    }
}

int main() {
    // Basic thread creation
    thread t1(printMessage, "Thread 1", 3);
    thread t2(printMessage, "Thread 2", 3);

    // Wait for both threads to finish
    t1.join();
    t2.join();

    cout << "\\nBoth threads completed\\n";

    // Lambda thread
    int result = 0;
    thread t3([&result]() {
        int sum = 0;
        for (int i = 1; i <= 100; i++) sum += i;
        result = sum;
    });
    t3.join();
    cout << "Sum 1..100 = " << result << "\\n";

    // Hardware concurrency
    cout << "Hardware threads: " << thread::hardware_concurrency() << "\\n";

    // Multiple threads in a vector
    vector<thread> threads;
    for (int i = 0; i < 4; i++) {
        threads.emplace_back([i]() {
            cout << "Worker " << i << " done\\n";
        });
    }
    for (auto& t : threads) t.join();

    return 0;
}`,
            output: `Thread 1 (1)
Thread 1 (2)
Thread 1 (3)
Thread 2 (1)
Thread 2 (2)
Thread 2 (3)

Both threads completed
Sum 1..100 = 5050
Hardware threads: 8
Worker 0 done
Worker 1 done
Worker 2 done
Worker 3 done`,
            warning: 'If a std::thread object is destroyed without join() or detach(), the program calls std::terminate. Always ensure threads are properly joined or detached.',
            note: 'Thread output may interleave differently on each run because threads execute concurrently.',
            analogy: 'Think of it like hiring workers at a construction site: each thread is a worker doing a task. join() means waiting at the gate until the worker finishes. detach() means letting the worker continue independently while you walk away.',
            codeHighlightLines: [8, 9, 12, 13],
            diagram: {
              kind: 'mermaid' as const,
              code: `sequenceDiagram
  participant M as main()
  participant T1 as thread t1
  participant T2 as thread t2

  M->>T1: thread t1(printMessage, "Thread 1", 3)
  M->>T2: thread t2(printMessage, "Thread 2", 3)
  Note over M: Main thread continues...

  par Concurrent Execution
    T1->>T1: "Thread 1 (1)"
    T2->>T2: "Thread 2 (1)"
    T1->>T1: "Thread 1 (2)"
    T2->>T2: "Thread 2 (2)"
    T1->>T1: "Thread 1 (3)"
    T2->>T2: "Thread 2 (3)"
  end

  M->>T1: t1.join() — wait for T1
  T1-->>M: completed
  M->>T2: t2.join() — wait for T2
  T2-->>M: completed
  Note over M: "Both threads completed"`,
              caption: 'Threads run concurrently. join() blocks the calling thread until the target thread finishes. Output from concurrent threads may interleave in any order.',
            },
          },
          {
            heading: 'Passing Data to Threads',
            content:
              'Thread arguments are copied by default. To pass by reference, wrap the argument in std::ref(). Be careful with references to local variables that might go out of scope before the thread finishes. For safe shared access, use mutexes or atomic variables.',
            code: `#include <iostream>
#include <thread>
#include <functional>
#include <vector>
using namespace std;

void increment(int& value, int amount) {
    value += amount;
}

void processVector(const vector<int>& data, int& result) {
    result = 0;
    for (int x : data) result += x;
}

int main() {
    // Pass by reference with std::ref
    int counter = 0;
    thread t1(increment, ref(counter), 10);
    t1.join();
    cout << "Counter after increment: " << counter << "\\n";

    // Multiple threads with shared reference
    vector<int> data = {1, 2, 3, 4, 5};
    int sum = 0;
    thread t2(processVector, cref(data), ref(sum));
    t2.join();
    cout << "Sum: " << sum << "\\n";

    // Move-only types (like unique_ptr)
    auto ptr = make_unique<int>(42);
    thread t3([p = move(ptr)]() {
        cout << "Moved value: " << *p << "\\n";
    });
    t3.join();

    return 0;
}`,
            output: `Counter after increment: 10
Sum: 15
Moved value: 42`,
            tip: 'Always use std::ref() when you need threads to modify shared variables. Without it, the thread receives a copy.',
          },
        ],
        quiz: [
          {
            question: 'What happens if a std::thread object is destroyed without calling join() or detach()?',
            options: [
              'The thread continues running in the background',
              'The thread is silently cancelled',
              'std::terminate is called and the program aborts',
              'The thread is automatically joined',
            ],
            correctIndex: 2,
            explanation: 'If a std::thread object with a running thread is destroyed without join() or detach(), the destructor calls std::terminate, which aborts the program. This is a safety measure to prevent accidentally ignoring thread completion.',
          },
          {
            question: 'What is the difference between join() and detach()?',
            options: [
              'join() runs the thread; detach() stops it',
              'join() blocks until the thread finishes; detach() lets the thread run independently',
              'join() is for lambdas; detach() is for functions',
              'join() is faster; detach() is safer',
            ],
            correctIndex: 1,
            explanation: 'join() blocks the calling thread until the target thread completes its execution. detach() separates the thread from the thread object, allowing it to run independently (the thread will clean up its own resources when done).',
          },
          {
            question: 'Why must you use std::ref() to pass a variable by reference to a thread?',
            options: [
              'std::thread copies all arguments by default; std::ref creates a reference wrapper',
              'References are not supported in C++',
              'std::ref is required for type safety',
              'Without std::ref, the thread cannot access the variable',
            ],
            correctIndex: 0,
            explanation: 'std::thread stores copies of all arguments passed to it (for safety, since the original may go out of scope). std::ref() creates a reference_wrapper that allows the thread to access the original variable by reference instead.',
          },
        ],
        challenge: {
          prompt: 'Write a program that creates 4 worker threads, each computing the sum of a portion of an array. The main thread should collect and add up the partial sums. Use std::ref to pass result variables to the threads.',
          starterCode: `#include <iostream>
#include <thread>
#include <vector>
#include <functional>
using namespace std;

// TODO: Write a function that sums a portion of a vector

int main() {
    vector<int> data(1000);
    for (int i = 0; i < 1000; i++) data[i] = i + 1;

    // TODO: Split the work among 4 threads
    // TODO: Collect partial sums and print the total
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <thread>
#include <vector>
#include <functional>
using namespace std;

void partialSum(const vector<int>& data, int start, int end, long long& result) {
    result = 0;
    for (int i = start; i < end; i++) {
        result += data[i];
    }
}

int main() {
    vector<int> data(1000);
    for (int i = 0; i < 1000; i++) data[i] = i + 1;

    int chunkSize = 250;
    long long results[4] = {};
    vector<thread> threads;

    for (int i = 0; i < 4; i++) {
        int start = i * chunkSize;
        int end = start + chunkSize;
        threads.emplace_back(partialSum, cref(data), start, end, ref(results[i]));
    }

    for (auto& t : threads) t.join();

    long long total = 0;
    for (int i = 0; i < 4; i++) {
        cout << "Thread " << i << " sum: " << results[i] << "\\n";
        total += results[i];
    }
    cout << "Total: " << total << "\\n";

    return 0;
}`,
          hints: [
            'Divide the 1000-element array into 4 chunks of 250 each. Pass the start and end indices to each thread.',
            'Use std::ref() for the result parameter so the thread writes back to the caller\'s variable.',
            'Use std::cref() for the const vector reference to avoid copying the entire vector.',
          ],
        },
      },
      {
        id: 'mutex',
        title: 'Mutex & Lock',
        difficulty: 'advanced',
        tags: ['mutex', 'lock', 'lock_guard', 'thread-safety', 'concurrency'],
        cheatSheetSummary: 'mutex m; lock_guard<mutex> lock(m); protects shared data from data races.',
        sections: [
          {
            heading: 'Protecting Shared Data',
            content:
              'When multiple threads access the same data, you must use synchronization to prevent data races (undefined behavior). A mutex (mutual exclusion) ensures only one thread can access the protected data at a time. std::lock_guard provides RAII-based locking that automatically releases the mutex when the guard goes out of scope.',
            code: `#include <iostream>
#include <thread>
#include <mutex>
#include <vector>
using namespace std;

int main() {
    int counter = 0;
    mutex mtx;

    // Without mutex: data race (undefined behavior)
    // With mutex: safe concurrent access

    auto increment = [&](int times) {
        for (int i = 0; i < times; i++) {
            lock_guard<mutex> lock(mtx);  // Lock
            counter++;
            // Mutex automatically released when lock goes out of scope
        }
    };

    vector<thread> threads;
    for (int i = 0; i < 10; i++) {
        threads.emplace_back(increment, 1000);
    }
    for (auto& t : threads) t.join();

    cout << "Counter (expected 10000): " << counter << "\\n";

    // scoped_lock (C++17): locks multiple mutexes without deadlock
    mutex m1, m2;
    auto worker = [&]() {
        scoped_lock lock(m1, m2);  // Locks both atomically
        cout << "Worker acquired both locks\\n";
    };

    thread t1(worker);
    thread t2(worker);
    t1.join();
    t2.join();

    // unique_lock: more flexible than lock_guard
    mutex m3;
    unique_lock<mutex> ulock(m3);
    cout << "Owns lock: " << ulock.owns_lock() << "\\n";
    ulock.unlock();
    cout << "Owns lock: " << ulock.owns_lock() << "\\n";
    ulock.lock();
    cout << "Owns lock: " << ulock.owns_lock() << "\\n";

    return 0;
}`,
            output: `Counter (expected 10000): 10000
Worker acquired both locks
Worker acquired both locks
Owns lock: 1
Owns lock: 0
Owns lock: 1`,
            warning: 'Accessing shared data without proper synchronization is a data race, which is undefined behavior in C++. Always protect shared mutable state with a mutex.',
            analogy: 'Think of it like a bathroom with a lock: only one person (thread) can enter at a time. lock_guard is like an automatic lock that engages when you enter and releases when you leave, even if you slip and fall (exception).',
            codeHighlightLines: [9, 10, 11, 26, 27],
            diagram: {
              kind: 'mermaid' as const,
              code: `sequenceDiagram
  participant T1 as Thread 1
  participant M as mutex mtx
  participant C as counter
  participant T2 as Thread 2

  T1->>M: lock_guard lock(mtx)
  M-->>T1: acquired
  Note over T1,C: Critical section
  T1->>C: counter++ (safe)
  T1->>M: ~lock_guard() → unlock

  T2->>M: lock_guard lock(mtx)
  M-->>T2: acquired
  Note over T2,C: Critical section
  T2->>C: counter++ (safe)
  T2->>M: ~lock_guard() → unlock

  Note over T1,T2: Without mutex: both read same value → data race!`,
              caption: 'Mutex ensures mutual exclusion: only one thread enters the critical section at a time. lock_guard provides RAII-based automatic unlock on scope exit.',
            },
          },
          {
            heading: 'Thread-Safe Data Structures',
            content:
              'A common pattern is to wrap a data structure with a mutex to make it thread-safe. The lock should be held for the minimum time necessary to avoid contention. Atomic variables (std::atomic) provide lock-free thread safety for simple types like integers and booleans.',
            code: `#include <iostream>
#include <thread>
#include <mutex>
#include <atomic>
#include <vector>
using namespace std;

// Thread-safe counter using atomic
atomic<int> atomicCounter{0};

// Thread-safe container using mutex
class ThreadSafeVector {
    vector<int> data;
    mutable mutex mtx;

public:
    void push(int value) {
        lock_guard<mutex> lock(mtx);
        data.push_back(value);
    }

    int size() const {
        lock_guard<mutex> lock(mtx);
        return data.size();
    }

    vector<int> snapshot() const {
        lock_guard<mutex> lock(mtx);
        return data;  // Return a copy
    }
};

int main() {
    // Atomic counter: no mutex needed
    vector<thread> threads;
    for (int i = 0; i < 10; i++) {
        threads.emplace_back([]() {
            for (int j = 0; j < 1000; j++) {
                atomicCounter++;
            }
        });
    }
    for (auto& t : threads) t.join();
    cout << "Atomic counter: " << atomicCounter << "\\n";

    // Thread-safe vector
    ThreadSafeVector tsv;
    vector<thread> workers;
    for (int i = 0; i < 5; i++) {
        workers.emplace_back([&tsv, i]() {
            for (int j = 0; j < 100; j++) {
                tsv.push(i * 100 + j);
            }
        });
    }
    for (auto& t : workers) t.join();
    cout << "Thread-safe vector size: " << tsv.size() << "\\n";

    // Atomic flag for simple synchronization
    atomic<bool> ready{false};
    thread producer([&]() {
        // ... prepare data ...
        ready.store(true);
    });
    // Spin wait (not ideal, just for demonstration)
    while (!ready.load()) { /* wait */ }
    cout << "Producer signaled ready\\n";
    producer.join();

    return 0;
}`,
            output: `Atomic counter: 10000
Thread-safe vector size: 500
Producer signaled ready`,
            tip: 'Use std::atomic for simple counters, flags, and pointers. For complex data structures, use a mutex. Never use volatile for thread synchronization - it does not provide the necessary memory ordering guarantees.',
          },
        ],
        quiz: [
          {
            question: 'What is a data race in C++?',
            options: [
              'When two threads run at different speeds',
              'When two or more threads access the same memory location concurrently and at least one is a write, without synchronization',
              'When a thread reads data too quickly',
              'When threads are created in the wrong order',
            ],
            correctIndex: 1,
            explanation: 'A data race occurs when two or more threads access the same memory location concurrently, at least one access is a write, and there is no synchronization. In C++, this is undefined behavior.',
          },
          {
            question: 'What advantage does lock_guard have over manually calling mutex.lock() and mutex.unlock()?',
            options: [
              'lock_guard is faster',
              'lock_guard automatically unlocks on scope exit, even if an exception is thrown (RAII)',
              'lock_guard allows recursive locking',
              'lock_guard can lock multiple mutexes',
            ],
            correctIndex: 1,
            explanation: 'lock_guard follows RAII: the mutex is locked in the constructor and automatically unlocked in the destructor when the lock_guard goes out of scope. This prevents forgetting to unlock, even when exceptions are thrown.',
          },
          {
            question: 'When should you use std::atomic instead of a mutex?',
            options: [
              'Always, because atomic is faster',
              'For simple types (integers, booleans, pointers) that need thread-safe read/write without protecting multi-step operations',
              'Only for string types',
              'When you need to lock multiple variables at once',
            ],
            correctIndex: 1,
            explanation: 'std::atomic provides lock-free, thread-safe operations on simple types. It is ideal for counters, flags, and single values. For complex operations involving multiple variables or multi-step logic, a mutex is more appropriate.',
          },
          {
            question: 'What does std::scoped_lock (C++17) do that lock_guard cannot?',
            options: [
              'It is faster than lock_guard',
              'It can lock multiple mutexes simultaneously without risk of deadlock',
              'It supports recursive locking',
              'It works with atomic variables',
            ],
            correctIndex: 1,
            explanation: 'scoped_lock can lock multiple mutexes at once using a deadlock-avoidance algorithm. lock_guard can only lock a single mutex. Use scoped_lock when you need to acquire multiple locks simultaneously.',
          },
        ],
        challenge: {
          prompt: 'Build a thread-safe BankAccount class with deposit and withdraw methods protected by a mutex. Write a transfer function that locks both accounts simultaneously using std::scoped_lock to avoid deadlock. Demonstrate with concurrent transfers between two accounts.',
          starterCode: `#include <iostream>
#include <thread>
#include <mutex>
#include <vector>
using namespace std;

class BankAccount {
    // TODO: Add balance and mutex members
public:
    // TODO: deposit, withdraw, getBalance methods
};

// TODO: Write transfer function

int main() {
    BankAccount a, b;
    // TODO: Initialize and perform concurrent transfers
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <thread>
#include <mutex>
#include <vector>
using namespace std;

class BankAccount {
    double balance;
    mutex mtx;
    friend void transfer(BankAccount&, BankAccount&, double);
public:
    BankAccount(double initial = 0) : balance(initial) {}

    void deposit(double amount) {
        lock_guard<mutex> lock(mtx);
        balance += amount;
    }

    bool withdraw(double amount) {
        lock_guard<mutex> lock(mtx);
        if (balance >= amount) {
            balance -= amount;
            return true;
        }
        return false;
    }

    double getBalance() {
        lock_guard<mutex> lock(mtx);
        return balance;
    }
};

void transfer(BankAccount& from, BankAccount& to, double amount) {
    scoped_lock lock(from.mtx, to.mtx);
    if (from.balance >= amount) {
        from.balance -= amount;
        to.balance += amount;
    }
}

int main() {
    BankAccount alice(1000.0);
    BankAccount bob(1000.0);

    vector<thread> threads;
    for (int i = 0; i < 100; i++) {
        threads.emplace_back(transfer, ref(alice), ref(bob), 5.0);
        threads.emplace_back(transfer, ref(bob), ref(alice), 3.0);
    }
    for (auto& t : threads) t.join();

    cout << "Alice: " << alice.getBalance() << "\\n";
    cout << "Bob: " << bob.getBalance() << "\\n";
    cout << "Total: " << alice.getBalance() + bob.getBalance() << "\\n";

    return 0;
}`,
          hints: [
            'Make the transfer function a friend of BankAccount so it can access the private mutex directly.',
            'Use std::scoped_lock(from.mtx, to.mtx) to lock both mutexes simultaneously and prevent deadlock.',
            'The total balance across both accounts should always remain constant (conservation of money).',
          ],
        },
      },
      {
        id: 'async-future',
        title: 'Async & Future',
        difficulty: 'advanced',
        tags: ['async', 'future', 'promise', 'concurrency', 'c++11'],
        cheatSheetSummary: 'auto f = async(func, args); launches async work. f.get() blocks until result is ready.',
        sections: [
          {
            heading: 'Async Tasks with Futures',
            content:
              'std::async launches a function asynchronously (potentially in a new thread) and returns a std::future that will hold the result. Calling future::get() blocks until the result is ready. This provides a high-level way to run tasks concurrently without manually managing threads.',
            code: `#include <iostream>
#include <future>
#include <vector>
#include <numeric>
#include <chrono>
using namespace std;

// Simulate a slow computation
long long computeSum(long long start, long long end) {
    long long sum = 0;
    for (long long i = start; i <= end; i++) {
        sum += i;
    }
    return sum;
}

string fetchData(const string& url) {
    // Simulate network delay
    this_thread::sleep_for(chrono::milliseconds(100));
    return "Data from " + url;
}

int main() {
    auto startTime = chrono::high_resolution_clock::now();

    // Launch async tasks
    auto f1 = async(launch::async, computeSum, 1LL, 500'000'000LL);
    auto f2 = async(launch::async, computeSum, 500'000'001LL, 1'000'000'000LL);

    // Do other work while tasks run...
    cout << "Tasks launched, doing other work...\\n";

    // Get results (blocks if not ready)
    long long sum1 = f1.get();
    long long sum2 = f2.get();
    long long total = sum1 + sum2;

    auto endTime = chrono::high_resolution_clock::now();
    auto duration = chrono::duration_cast<chrono::milliseconds>(endTime - startTime);

    cout << "Sum 1..1B = " << total << "\\n";
    cout << "Time: " << duration.count() << "ms\\n";

    // Async with different launch policies
    // launch::async: guaranteed new thread
    // launch::deferred: lazy evaluation on get()
    auto lazy = async(launch::deferred, []() {
        cout << "Deferred: computed on get()\\n";
        return 42;
    });
    cout << "Before get()...\\n";
    cout << "Result: " << lazy.get() << "\\n";

    // Multiple async fetches
    vector<future<string>> futures;
    for (int i = 0; i < 3; i++) {
        futures.push_back(async(launch::async, fetchData,
            "api.example.com/endpoint" + to_string(i)));
    }
    cout << "\\nFetched data:\\n";
    for (auto& f : futures) {
        cout << "  " << f.get() << "\\n";
    }

    return 0;
}`,
            output: `Tasks launched, doing other work...
Sum 1..1B = 500000000500000000
Time: 450ms
Before get()...
Deferred: computed on get()
Result: 42

Fetched data:
  Data from api.example.com/endpoint0
  Data from api.example.com/endpoint1
  Data from api.example.com/endpoint2`,
            tip: 'launch::async guarantees a new thread. The default policy (launch::async | launch::deferred) lets the runtime choose, which may defer execution until get() is called.',
            analogy: 'Think of it like ordering food delivery: async() places the order and gives you a tracking number (future). You can do other things while waiting, and when you call get(), you check the door -- if the food is there, great; if not, you wait until it arrives.',
            codeHighlightLines: [18, 19, 25, 26],
            diagram: {
              kind: 'mermaid' as const,
              code: `sequenceDiagram
  participant Main
  participant F1 as future f1
  participant F2 as future f2
  participant T1 as Thread 1
  participant T2 as Thread 2

  Main->>T1: async(computeSum, 1, 500M)
  Main->>T2: async(computeSum, 500M+1, 1B)
  Note over Main: Do other work while tasks run...

  T1-->>F1: sum1 ready
  T2-->>F2: sum2 ready

  Main->>F1: f1.get() → sum1
  F1-->>Main: 125000000250000000
  Main->>F2: f2.get() → sum2
  F2-->>Main: 375000000250000000

  Note over Main: total = sum1 + sum2 = 500000000500000000`,
              caption: 'std::async launches tasks in background threads and returns futures. get() blocks until the result is available. Parallel execution reduces wall-clock time.',
            },
          },
          {
            heading: 'Promise and Future Communication',
            content:
              'std::promise and std::future form a communication channel between threads. A promise is the "write" end that sets a value, and the associated future is the "read" end that retrieves it. This is useful when you need fine-grained control over when and how values are communicated between threads.',
            code: `#include <iostream>
#include <future>
#include <thread>
using namespace std;

int main() {
    // Promise-future pair for thread communication
    promise<int> prom;
    future<int> fut = prom.get_future();

    // Producer thread: compute and deliver result
    thread producer([&prom]() {
        int result = 0;
        for (int i = 1; i <= 100; i++) result += i;
        prom.set_value(result);  // Deliver the result
    });

    // Consumer: wait for result
    cout << "Waiting for result...\\n";
    int value = fut.get();  // Blocks until value is set
    cout << "Result: " << value << "\\n";
    producer.join();

    // Exception propagation through promise
    promise<int> errorProm;
    future<int> errorFut = errorProm.get_future();

    thread errorProducer([&errorProm]() {
        try {
            throw runtime_error("computation failed");
        } catch (...) {
            errorProm.set_exception(current_exception());
        }
    });

    try {
        errorFut.get();
    } catch (const runtime_error& e) {
        cout << "Caught from thread: " << e.what() << "\\n";
    }
    errorProducer.join();

    // shared_future: multiple consumers
    promise<string> sharedProm;
    shared_future<string> sf = sharedProm.get_future().share();

    vector<thread> consumers;
    for (int i = 0; i < 3; i++) {
        consumers.emplace_back([sf, i]() {
            string val = sf.get();  // All can call get()
            cout << "Consumer " << i << ": " << val << "\\n";
        });
    }

    sharedProm.set_value("shared data");
    for (auto& t : consumers) t.join();

    return 0;
}`,
            output: `Waiting for result...
Result: 5050
Caught from thread: computation failed
Consumer 0: shared data
Consumer 1: shared data
Consumer 2: shared data`,
            note: 'future::get() can only be called once (it moves the result). Use shared_future when multiple threads need to access the same result.',
          },
        ],
      },
    ],
  },
];

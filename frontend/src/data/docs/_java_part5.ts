import type { DocCategory } from './types';

// Part 5: String Methods + Stream API
export const JAVA_PART5_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  String Methods                                               */
  /* ------------------------------------------------------------ */
  {
    id: 'java-string-methods',
    label: 'String Methods',
    icon: 'Type',
    entries: [
      {
        id: 'str-length',
        title: 'length()',
        difficulty: 'beginner',
        tags: ['String', 'length', 'size'],
        cheatSheetSummary: 'str.length() returns the number of characters. Note: length() is a method (not a property like in JS).',
        signature: 'int length()',
        sections: [
          {
            heading: 'Getting String Length',
            content:
              'The length() method returns the number of characters (char values) in a string. Unlike arrays which use .length (a field), String uses .length() (a method). This distinction catches many beginners.',
            code: `public class StrLength {
    public static void main(String[] args) {
        String text = "Hello, World!";
        System.out.println("Length: " + text.length());  // 13

        String empty = "";
        System.out.println("Empty: " + empty.length());  // 0

        // Common pattern: check for empty string
        System.out.println("isEmpty: " + empty.isEmpty());
        System.out.println("isBlank: " + "   ".isBlank());  // Java 11+

        // Array vs String length
        int[] arr = {1, 2, 3};
        System.out.println("Array: " + arr.length);     // field (no parentheses)
        System.out.println("String: " + text.length());  // method (parentheses)
    }
}`,
            output: `Length: 13
Empty: 0
isEmpty: true
isBlank: true
Array: 3
String: 13`,
            tip: 'Array uses .length (field), String uses .length() (method), Collection uses .size() (method). A common source of errors.',
            analogy: 'Think of it like asking someone their height: for arrays you read it off their name tag (.length, a field), but for strings you have to ask them to measure themselves (.length(), a method call).',
            codeHighlightLines: [4, 7, 10, 11, 12],
          },
        ],
        quiz: [
          {
            question: 'What does "Hello".length() return?',
            options: ['4', '5', '6', 'Compile error'],
            correctIndex: 1,
            explanation: '"Hello" has 5 characters (H, e, l, l, o), so length() returns 5.',
          },
          {
            question: 'How do you get the length of an array in Java?',
            options: ['arr.length()', 'arr.length', 'arr.size()', 'arr.count()'],
            correctIndex: 1,
            explanation: 'Arrays use .length (a field, no parentheses), while Strings use .length() (a method) and Collections use .size().',
          },
          {
            question: 'What does "".isEmpty() return?',
            options: ['true', 'false', 'null', 'Throws NullPointerException'],
            correctIndex: 0,
            explanation: 'An empty string "" has length 0, so isEmpty() returns true.',
          },
        ],
        challenge: {
          prompt: 'Write a method that takes a String and returns true if its length is between 5 and 10 (inclusive), false otherwise.',
          starterCode: `public class LengthCheck {
    public static boolean isValidLength(String s) {
        // Your code here
    }

    public static void main(String[] args) {
        System.out.println(isValidLength("Hello"));     // true
        System.out.println(isValidLength("Hi"));         // false
        System.out.println(isValidLength("HelloWorld")); // true
        System.out.println(isValidLength("HelloWorld!")); // false
    }
}`,
          solutionCode: `public class LengthCheck {
    public static boolean isValidLength(String s) {
        return s.length() >= 5 && s.length() <= 10;
    }

    public static void main(String[] args) {
        System.out.println(isValidLength("Hello"));     // true
        System.out.println(isValidLength("Hi"));         // false
        System.out.println(isValidLength("HelloWorld")); // true
        System.out.println(isValidLength("HelloWorld!")); // false
    }
}`,
          hints: [
            'Use the length() method to get the number of characters.',
            'Use a logical AND (&&) to check both the lower and upper bounds.',
          ],
        },
      },
      {
        id: 'str-charAt',
        title: 'charAt()',
        difficulty: 'beginner',
        tags: ['String', 'charAt', 'character', 'index'],
        cheatSheetSummary: 'str.charAt(index) returns the char at the given position. Throws StringIndexOutOfBoundsException if out of range.',
        signature: 'char charAt(int index)',
        sections: [
          {
            heading: 'Accessing Characters by Index',
            content:
              'charAt(int index) returns the char at the specified zero-based index. Strings are not arrays in Java, so you cannot use bracket notation (str[i]). Accessing an index outside [0, length()-1] throws StringIndexOutOfBoundsException.',
            code: `public class StrCharAt {
    public static void main(String[] args) {
        String word = "Java";
        System.out.println("First: " + word.charAt(0));   // J
        System.out.println("Last: " + word.charAt(word.length() - 1));  // a

        // Iterate characters
        for (int i = 0; i < word.length(); i++) {
            System.out.print(word.charAt(i) + " ");
        }
        System.out.println();

        // Count vowels
        String text = "Hello World";
        int vowels = 0;
        for (int i = 0; i < text.length(); i++) {
            char c = Character.toLowerCase(text.charAt(i));
            if ("aeiou".indexOf(c) >= 0) vowels++;
        }
        System.out.println("Vowels in '" + text + "': " + vowels);

        // Out of bounds
        try {
            word.charAt(10);
        } catch (StringIndexOutOfBoundsException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
            output: `First: J
Last: a
J a v a
Vowels in 'Hello World': 3
Error: String index out of range: 10`,
            warning: 'Java strings do not support bracket indexing like str[i]. You must use str.charAt(i). This is different from C++ and Python.',
            analogy: 'Think of it like a locked display case: in Python you can reach directly into str[i], but in Java you must ask the attendant (charAt method) to hand you the item at position i.',
            codeHighlightLines: [4, 5, 8, 9, 16, 17],
            diagram: {
              kind: 'custom',
              type: 'array',
              data: {
                label: 'charAt() Index Mapping for "Java"',
                items: [
                  { value: 'J', label: '0', highlight: true },
                  { value: 'a', label: '1' },
                  { value: 'v', label: '2' },
                  { value: 'a', label: '3', highlight: true },
                ],
              },
              caption: 'charAt(0) returns the first character; charAt(length()-1) returns the last',
            },
          },
        ],
        quiz: [
          {
            question: 'What does "Java".charAt(2) return?',
            options: ['J', 'a', 'v', 'a'],
            correctIndex: 2,
            explanation: 'Indices are zero-based: charAt(0)=J, charAt(1)=a, charAt(2)=v, charAt(3)=a.',
          },
          {
            question: 'What happens when you call "Hi".charAt(5)?',
            options: ['Returns null', 'Returns an empty char', 'Throws StringIndexOutOfBoundsException', 'Returns 0'],
            correctIndex: 2,
            explanation: '"Hi" has indices 0 and 1. Accessing index 5 is out of range and throws StringIndexOutOfBoundsException.',
          },
          {
            question: 'Can you use bracket notation like str[0] to access a character in Java?',
            options: ['Yes, it works the same as charAt()', 'Yes, but only for String literals', 'No, Java strings do not support bracket indexing', 'Yes, but it returns an int instead of char'],
            correctIndex: 2,
            explanation: 'Java strings do not support bracket indexing. You must use the charAt() method to access individual characters.',
          },
        ],
        challenge: {
          prompt: 'Write a method that takes a String and returns the number of uppercase letters it contains.',
          starterCode: `public class CountUppercase {
    public static int countUpper(String s) {
        // Your code here
    }

    public static void main(String[] args) {
        System.out.println(countUpper("Hello World"));   // 2
        System.out.println(countUpper("JAVA"));           // 4
        System.out.println(countUpper("lowercase"));      // 0
    }
}`,
          solutionCode: `public class CountUppercase {
    public static int countUpper(String s) {
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            if (Character.isUpperCase(s.charAt(i))) {
                count++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        System.out.println(countUpper("Hello World"));   // 2
        System.out.println(countUpper("JAVA"));           // 4
        System.out.println(countUpper("lowercase"));      // 0
    }
}`,
          hints: [
            'Loop through each character using charAt(i) in a for loop.',
            'Use Character.isUpperCase() to check if a character is uppercase.',
            'Keep a counter variable and increment it for each uppercase character found.',
          ],
        },
      },
      {
        id: 'str-substring',
        title: 'substring()',
        difficulty: 'beginner',
        tags: ['String', 'substring', 'extract', 'slice'],
        cheatSheetSummary: 'str.substring(begin, end) returns chars from begin (inclusive) to end (exclusive). str.substring(begin) to end.',
        signature: 'String substring(int beginIndex, int endIndex)',
        sections: [
          {
            heading: 'Extracting Substrings',
            content:
              'substring() extracts a portion of a string. The two-argument form takes a begin index (inclusive) and end index (exclusive). The one-argument form takes everything from the begin index to the end. Both return a new String since strings are immutable.',
            code: `public class StrSubstring {
    public static void main(String[] args) {
        String text = "Hello, World!";

        System.out.println(text.substring(0, 5));    // Hello
        System.out.println(text.substring(7));        // World!
        System.out.println(text.substring(7, 12));    // World

        // Extract file extension
        String filename = "document.pdf";
        int dot = filename.lastIndexOf('.');
        String ext = filename.substring(dot + 1);
        String name = filename.substring(0, dot);
        System.out.println("Name: " + name + ", Extension: " + ext);

        // First N and last N characters
        String s = "Programming";
        String first3 = s.substring(0, 3);
        String last3 = s.substring(s.length() - 3);
        System.out.println("First 3: " + first3);
        System.out.println("Last 3: " + last3);

        // Safe substring with Math.min
        String safe = s.substring(0, Math.min(5, s.length()));
        System.out.println("Safe first 5: " + safe);
    }
}`,
            output: `Hello
World!
World
Name: document, Extension: pdf
First 3: Pro
Last 3: ing
Safe first 5: Progr`,
            tip: 'Remember: begin is inclusive, end is exclusive. substring(0, 5) returns 5 characters at indices 0, 1, 2, 3, 4.',
            analogy: 'Think of it like cutting a ribbon: the begin index is where you place the left scissors, and the end index is where you place the right scissors. You keep only the piece between the cuts.',
            codeHighlightLines: [5, 6, 7, 11, 12, 13],
            diagram: {
              kind: 'custom',
              type: 'array',
              data: {
                label: 'substring(7, 12) on "Hello, World!"',
                items: [
                  { value: 'H', label: '0' },
                  { value: 'e', label: '1' },
                  { value: 'l', label: '2' },
                  { value: 'l', label: '3' },
                  { value: 'o', label: '4' },
                  { value: ',', label: '5' },
                  { value: ' ', label: '6' },
                  { value: 'W', label: '7', highlight: true },
                  { value: 'o', label: '8', highlight: true },
                  { value: 'r', label: '9', highlight: true },
                  { value: 'l', label: '10', highlight: true },
                  { value: 'd', label: '11', highlight: true },
                  { value: '!', label: '12' },
                ],
              },
              caption: 'substring(7, 12) extracts indices 7-11 (inclusive-exclusive), yielding "World"',
            },
          },
        ],
        quiz: [
          {
            question: 'What does "Hello".substring(1, 4) return?',
            options: ['"Hel"', '"ell"', '"ello"', '"Hell"'],
            correctIndex: 1,
            explanation: 'substring(1, 4) extracts characters at indices 1, 2, 3 (begin inclusive, end exclusive), which are "ell".',
          },
          {
            question: 'What does "Programming".substring(3) return?',
            options: ['"Pro"', '"gramming"', '"rogramming"', '"gram"'],
            correctIndex: 1,
            explanation: 'substring(3) with one argument returns everything from index 3 to the end, which is "gramming".',
          },
          {
            question: 'What happens when you call "Hi".substring(0, 5)?',
            options: ['Returns "Hi"', 'Returns "Hi   "', 'Throws StringIndexOutOfBoundsException', 'Returns null'],
            correctIndex: 2,
            explanation: '"Hi" has length 2, so end index 5 is out of bounds and throws StringIndexOutOfBoundsException.',
          },
        ],
        challenge: {
          prompt: 'Write a method that extracts the domain name from an email address (e.g., "user@example.com" returns "example.com").',
          starterCode: `public class ExtractDomain {
    public static String getDomain(String email) {
        // Your code here
    }

    public static void main(String[] args) {
        System.out.println(getDomain("alice@gmail.com"));     // gmail.com
        System.out.println(getDomain("bob@company.org"));     // company.org
        System.out.println(getDomain("test@sub.domain.net")); // sub.domain.net
    }
}`,
          solutionCode: `public class ExtractDomain {
    public static String getDomain(String email) {
        int atIndex = email.indexOf('@');
        return email.substring(atIndex + 1);
    }

    public static void main(String[] args) {
        System.out.println(getDomain("alice@gmail.com"));     // gmail.com
        System.out.println(getDomain("bob@company.org"));     // company.org
        System.out.println(getDomain("test@sub.domain.net")); // sub.domain.net
    }
}`,
          hints: [
            'Use indexOf(\'@\') to find the position of the @ symbol.',
            'Use substring() starting from one position after the @ symbol to the end of the string.',
          ],
        },
      },
      {
        id: 'str-indexOf',
        title: 'indexOf()',
        difficulty: 'beginner',
        tags: ['String', 'indexOf', 'search', 'find'],
        cheatSheetSummary: 'str.indexOf(target) returns first occurrence index, or -1 if not found. lastIndexOf() searches from the end.',
        signature: 'int indexOf(String str)',
        sections: [
          {
            heading: 'Finding Substrings',
            content:
              'indexOf() searches for a character or substring and returns the index of the first occurrence, or -1 if not found. lastIndexOf() searches from the end. Both have overloads that accept a starting position for the search.',
            analogy: 'Think of it like searching for a word in a book: indexOf scans from page one forward and tells you the first page number where the word appears (or -1 if the book does not contain it), while lastIndexOf reads backwards from the last page.',
            codeHighlightLines: [6, 7, 8, 11, 14, 15, 21, 22],
            code: `public class StrIndexOf {
    public static void main(String[] args) {
        String text = "Hello World Hello Java";

        // Find first occurrence
        System.out.println("indexOf('o'): " + text.indexOf('o'));         // 4
        System.out.println("indexOf(\"Hello\"): " + text.indexOf("Hello")); // 0
        System.out.println("indexOf(\"Python\"): " + text.indexOf("Python")); // -1

        // Find from a starting position
        System.out.println("indexOf('o', 5): " + text.indexOf('o', 5));  // 7

        // Find last occurrence
        System.out.println("lastIndexOf('o'): " + text.lastIndexOf('o'));     // 7
        System.out.println("lastIndexOf(\"Hello\"): " + text.lastIndexOf("Hello")); // 12

        // Count occurrences of a substring
        String s = "banana";
        String target = "an";
        int count = 0, idx = 0;
        while ((idx = s.indexOf(target, idx)) != -1) {
            count++;
            idx += target.length();
        }
        System.out.println("'" + target + "' appears " + count + " times in '" + s + "'");

        // Check if NOT found pattern
        if (text.indexOf("Python") == -1) {
            System.out.println("Python not found in text");
        }
    }
}`,
            output: `indexOf('o'): 4
indexOf("Hello"): 0
indexOf("Python"): -1
indexOf('o', 5): 7
lastIndexOf('o'): 7
lastIndexOf("Hello"): 12
'an' appears 2 times in 'banana'
Python not found in text`,
          },
        ],
        quiz: [
          {
            question: 'What does "banana".indexOf("an") return?',
            options: ['1', '2', '3', '-1'],
            correctIndex: 0,
            explanation: 'indexOf returns the index of the first occurrence. "an" first appears at index 1 in "banana".',
          },
          {
            question: 'What does "Hello".indexOf("xyz") return?',
            options: ['0', '-1', 'null', 'Throws an exception'],
            correctIndex: 1,
            explanation: 'When the target is not found, indexOf returns -1.',
          },
          {
            question: 'What does "Hello Hello".lastIndexOf("Hello") return?',
            options: ['0', '5', '6', '11'],
            correctIndex: 2,
            explanation: 'lastIndexOf returns the index of the last occurrence. The second "Hello" starts at index 6.',
          },
        ],
        challenge: {
          prompt: 'Write a method that counts how many times a given substring appears in a string (non-overlapping).',
          starterCode: `public class CountOccurrences {
    public static int countSubstring(String text, String target) {
        // Your code here
    }

    public static void main(String[] args) {
        System.out.println(countSubstring("banana", "an"));       // 2
        System.out.println(countSubstring("hello world", "o"));   // 2
        System.out.println(countSubstring("aaa", "aa"));          // 1
        System.out.println(countSubstring("test", "xyz"));        // 0
    }
}`,
          solutionCode: `public class CountOccurrences {
    public static int countSubstring(String text, String target) {
        int count = 0;
        int idx = 0;
        while ((idx = text.indexOf(target, idx)) != -1) {
            count++;
            idx += target.length();
        }
        return count;
    }

    public static void main(String[] args) {
        System.out.println(countSubstring("banana", "an"));       // 2
        System.out.println(countSubstring("hello world", "o"));   // 2
        System.out.println(countSubstring("aaa", "aa"));          // 1
        System.out.println(countSubstring("test", "xyz"));        // 0
    }
}`,
          hints: [
            'Use indexOf(target, fromIndex) in a while loop to find each occurrence.',
            'After finding a match, advance the index by target.length() to avoid counting overlaps.',
            'The loop ends when indexOf returns -1 (no more matches).',
          ],
        },
      },
      {
        id: 'str-contains',
        title: 'contains()',
        difficulty: 'beginner',
        tags: ['String', 'contains', 'check', 'boolean'],
        cheatSheetSummary: 'str.contains(target) returns true if target is found. Case-sensitive. Use toLowerCase() for case-insensitive check.',
        signature: 'boolean contains(CharSequence s)',
        sections: [
          {
            heading: 'Checking for Substrings',
            content:
              'contains() returns true if the string contains the specified sequence of characters. It is case-sensitive. For case-insensitive checks, convert both strings to the same case first. contains() is simpler than indexOf() when you do not need the position.',
            analogy: 'Think of it like a metal detector at the beach: contains() just beeps yes or no (is the target buried somewhere in this string?), while indexOf() actually tells you exactly where the object is.',
            codeHighlightLines: [4, 5, 6, 9, 12, 13],
            code: `public class StrContains {
    public static void main(String[] args) {
        String text = "Hello, World!";

        System.out.println(text.contains("World"));    // true
        System.out.println(text.contains("world"));    // false (case-sensitive)
        System.out.println(text.contains("xyz"));      // false

        // Case-insensitive check
        System.out.println(text.toLowerCase().contains("world"));  // true

        // Other membership checks
        System.out.println(text.startsWith("Hello"));  // true
        System.out.println(text.endsWith("!"));        // true

        // Practical: filter strings containing a keyword
        String[] emails = {
            "alice@gmail.com", "bob@yahoo.com",
            "charlie@gmail.com", "diana@outlook.com"
        };
        System.out.println("\\nGmail users:");
        for (String email : emails) {
            if (email.contains("gmail")) {
                System.out.println("  " + email);
            }
        }

        // matches() with regex for pattern checking
        String phone = "123-456-7890";
        System.out.println("\\nIs phone format: " + phone.matches("\\\\d{3}-\\\\d{3}-\\\\d{4}"));
    }
}`,
            output: `true
false
false
true
true
true

Gmail users:
  alice@gmail.com
  charlie@gmail.com

Is phone format: true`,
          },
        ],
        quiz: [
          {
            question: 'What does "Hello World".contains("world") return?',
            options: ['true', 'false', 'Throws an exception', 'null'],
            correctIndex: 1,
            explanation: 'contains() is case-sensitive. "world" (lowercase w) does not match "World" (uppercase W).',
          },
          {
            question: 'How can you perform a case-insensitive contains check?',
            options: ['str.containsIgnoreCase(target)', 'str.contains(target, true)', 'str.toLowerCase().contains(target.toLowerCase())', 'str.contains(target.ignoreCase())'],
            correctIndex: 2,
            explanation: 'Java does not have containsIgnoreCase(). Convert both strings to the same case using toLowerCase() or toUpperCase() before calling contains().',
          },
          {
            question: 'What is the return type of contains()?',
            options: ['int', 'String', 'boolean', 'char'],
            correctIndex: 2,
            explanation: 'contains() returns a boolean: true if the sequence is found, false otherwise.',
          },
        ],
        challenge: {
          prompt: 'Write a method that filters an array of strings and returns only those that contain a given keyword (case-insensitive).',
          starterCode: `import java.util.ArrayList;
import java.util.List;

public class FilterByKeyword {
    public static List<String> filterContaining(String[] items, String keyword) {
        // Your code here
    }

    public static void main(String[] args) {
        String[] fruits = {"Apple", "Pineapple", "Banana", "Grape", "Grapefruit"};
        System.out.println(filterContaining(fruits, "apple"));
        // [Apple, Pineapple]
        System.out.println(filterContaining(fruits, "GRAPE"));
        // [Grape, Grapefruit]
    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.List;

public class FilterByKeyword {
    public static List<String> filterContaining(String[] items, String keyword) {
        List<String> result = new ArrayList<>();
        String lowerKeyword = keyword.toLowerCase();
        for (String item : items) {
            if (item.toLowerCase().contains(lowerKeyword)) {
                result.add(item);
            }
        }
        return result;
    }

    public static void main(String[] args) {
        String[] fruits = {"Apple", "Pineapple", "Banana", "Grape", "Grapefruit"};
        System.out.println(filterContaining(fruits, "apple"));
        // [Apple, Pineapple]
        System.out.println(filterContaining(fruits, "GRAPE"));
        // [Grape, Grapefruit]
    }
}`,
          hints: [
            'Convert both the item and keyword to lowercase before calling contains().',
            'Use an ArrayList to collect matching items, then return it.',
          ],
        },
      },
      {
        id: 'str-equals',
        title: 'equals() & equalsIgnoreCase()',
        difficulty: 'beginner',
        tags: ['String', 'equals', 'comparison', 'case-insensitive'],
        cheatSheetSummary: 'ALWAYS use .equals() for string comparison, NEVER ==. equalsIgnoreCase() ignores case differences.',
        signature: 'boolean equals(Object obj)',
        sections: [
          {
            heading: 'String Equality',
            content:
              'String comparison in Java MUST use .equals() or .equalsIgnoreCase(), never ==. The == operator compares object references, not content. Two strings with identical characters can be different objects. This is the number one Java gotcha.',
            code: `public class StrEquals {
    public static void main(String[] args) {
        String a = "Hello";
        String b = "Hello";
        String c = new String("Hello");
        String d = "hello";

        // == compares references (WRONG for content comparison)
        System.out.println("a == b: " + (a == b));       // true (string pool)
        System.out.println("a == c: " + (a == c));       // false (different object)

        // .equals() compares content (CORRECT)
        System.out.println("a.equals(b): " + a.equals(b));   // true
        System.out.println("a.equals(c): " + a.equals(c));   // true

        // Case-insensitive comparison
        System.out.println("a.equalsIgnoreCase(d): " + a.equalsIgnoreCase(d)); // true

        // Null-safe comparison
        String nullStr = null;
        // nullStr.equals("test")  // NullPointerException!
        System.out.println("\"test\".equals(null): " + "test".equals(nullStr));  // false

        // Objects.equals: null-safe
        System.out.println("Objects.equals: " + java.util.Objects.equals(nullStr, null)); // true

        // compareTo for ordering
        System.out.println("\\n\"apple\".compareTo(\"banana\"): " + "apple".compareTo("banana"));
        System.out.println("\"banana\".compareTo(\"apple\"): " + "banana".compareTo("apple"));
        System.out.println("\"apple\".compareTo(\"apple\"): " + "apple".compareTo("apple"));
    }
}`,
            output: `a == b: true
a == c: false
a.equals(b): true
a.equals(c): true
a.equalsIgnoreCase(d): true
"test".equals(null): false
Objects.equals: true

"apple".compareTo("banana"): -1
"banana".compareTo("apple"): 1
"apple".compareTo("apple"): 0`,
            warning: 'NEVER use == to compare strings. Use .equals() for content comparison. This is the most common Java bug for beginners.',
            analogy: 'Think of it like comparing houses: == checks if two addresses point to the exact same physical building (reference), while .equals() checks if the buildings look identical inside (content). Two identical houses at different addresses are equals() but not ==.',
            codeHighlightLines: [7, 8, 11, 12, 15, 18, 19],
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Stack',
                    type: 'stack',
                    values: [
                      { name: 'a', value: '-> 0xA1 (pool)', highlight: true },
                      { name: 'b', value: '-> 0xA1 (pool)', highlight: true },
                      { name: 'c', value: '-> 0xB2 (heap)' },
                    ],
                  },
                  {
                    label: 'String Pool',
                    type: 'heap',
                    values: [
                      { name: '0xA1', value: '"Hello"', highlight: true },
                    ],
                  },
                  {
                    label: 'Heap',
                    type: 'heap',
                    values: [
                      { name: '0xB2', value: '"Hello"' },
                    ],
                  },
                ],
              },
              caption: 'a and b share the same pool reference (a == b is true), but c is a separate heap object (a == c is false, though a.equals(c) is true)',
            },
          },
        ],
        quiz: [
          {
            question: 'What does "Hello" == new String("Hello") evaluate to?',
            options: ['true', 'false', 'Compile error', 'Throws an exception'],
            correctIndex: 1,
            explanation: '== compares object references. "Hello" from the string pool and new String("Hello") are different objects, so == returns false even though the content is identical.',
          },
          {
            question: 'Which method should you use for case-insensitive string comparison?',
            options: ['equals()', 'equalsIgnoreCase()', 'compareTo()', '=='],
            correctIndex: 1,
            explanation: 'equalsIgnoreCase() compares two strings ignoring case differences, returning true if the content is the same regardless of letter casing.',
          },
          {
            question: 'What happens when you call null.equals("test")?',
            options: ['Returns false', 'Returns true', 'Throws NullPointerException', 'Returns null'],
            correctIndex: 2,
            explanation: 'Calling any method on null throws NullPointerException. Use "test".equals(nullVar) instead to be null-safe.',
          },
          {
            question: 'Why does "Hello" == "Hello" return true?',
            options: ['Because == always compares content', 'Because both refer to the same object in the string pool', 'Because Java overrides == for strings', 'It does not; it returns false'],
            correctIndex: 1,
            explanation: 'String literals are interned in the string pool. Two identical literals share the same object, so == (reference comparison) returns true.',
          },
        ],
        challenge: {
          prompt: 'Write a null-safe method that checks if two strings are equal ignoring case. Return true if both are null.',
          starterCode: `public class SafeEquals {
    public static boolean safeEqualsIgnoreCase(String a, String b) {
        // Your code here
    }

    public static void main(String[] args) {
        System.out.println(safeEqualsIgnoreCase("Hello", "hello")); // true
        System.out.println(safeEqualsIgnoreCase("Hello", "World")); // false
        System.out.println(safeEqualsIgnoreCase(null, null));       // true
        System.out.println(safeEqualsIgnoreCase(null, "Hello"));    // false
        System.out.println(safeEqualsIgnoreCase("Hello", null));    // false
    }
}`,
          solutionCode: `public class SafeEquals {
    public static boolean safeEqualsIgnoreCase(String a, String b) {
        if (a == null && b == null) return true;
        if (a == null || b == null) return false;
        return a.equalsIgnoreCase(b);
    }

    public static void main(String[] args) {
        System.out.println(safeEqualsIgnoreCase("Hello", "hello")); // true
        System.out.println(safeEqualsIgnoreCase("Hello", "World")); // false
        System.out.println(safeEqualsIgnoreCase(null, null));       // true
        System.out.println(safeEqualsIgnoreCase(null, "Hello"));    // false
        System.out.println(safeEqualsIgnoreCase("Hello", null));    // false
    }
}`,
          hints: [
            'First handle the case where both strings are null (return true).',
            'Then handle the case where only one is null (return false).',
            'Finally, use equalsIgnoreCase() since both strings are guaranteed non-null.',
          ],
        },
      },
      {
        id: 'str-compareTo',
        title: 'compareTo()',
        difficulty: 'beginner',
        tags: ['String', 'compareTo', 'lexicographic', 'ordering'],
        cheatSheetSummary: 'str.compareTo(other) returns negative/zero/positive for lexicographic ordering. Used for sorting strings.',
        signature: 'int compareTo(String anotherString)',
        sections: [
          {
            heading: 'Lexicographic Comparison',
            content:
              'compareTo() compares two strings lexicographically (dictionary order). It returns a negative integer if the string comes before the argument, zero if equal, and a positive integer if after. This is used by sorting algorithms and TreeSet/TreeMap. compareToIgnoreCase() ignores case differences.',
            codeHighlightLines: [4, 5, 6, 9, 12, 16, 17],
            code: `import java.util.Arrays;

public class StrCompareTo {
    public static void main(String[] args) {
        System.out.println("\"apple\".compareTo(\"banana\"): " + "apple".compareTo("banana"));
        System.out.println("\"banana\".compareTo(\"apple\"): " + "banana".compareTo("apple"));
        System.out.println("\"apple\".compareTo(\"apple\"): " + "apple".compareTo("apple"));

        // Uppercase letters come before lowercase in Unicode
        System.out.println("\"Apple\".compareTo(\"apple\"): " + "Apple".compareTo("apple"));

        // Case-insensitive comparison
        System.out.println("compareToIgnoreCase: " + "Apple".compareToIgnoreCase("apple"));

        // Sorting uses compareTo
        String[] words = {"cherry", "apple", "banana", "date"};
        Arrays.sort(words);
        System.out.println("Sorted: " + Arrays.toString(words));

        // Custom sort: by length, then alphabetically
        String[] words2 = {"fig", "apple", "kiwi", "banana", "date"};
        Arrays.sort(words2, (a, b) -> {
            int lenDiff = a.length() - b.length();
            return lenDiff != 0 ? lenDiff : a.compareTo(b);
        });
        System.out.println("By length: " + Arrays.toString(words2));
    }
}`,
            output: `"apple".compareTo("banana"): -1
"banana".compareTo("apple"): 1
"apple".compareTo("apple"): 0
"Apple".compareTo("apple"): -32
compareToIgnoreCase: 0
Sorted: [apple, banana, cherry, date]
By length: [fig, date, kiwi, apple, banana]`,
          },
        ],
        quiz: [
          {
            question: 'What does "apple".compareTo("banana") return?',
            options: ['A positive number', 'Zero', 'A negative number', 'Throws an exception'],
            correctIndex: 2,
            explanation: '"apple" comes before "banana" lexicographically, so compareTo returns a negative number.',
          },
          {
            question: 'What does "Apple".compareTo("apple") return?',
            options: ['0', 'A positive number', 'A negative number', 'Throws ClassCastException'],
            correctIndex: 2,
            explanation: 'Uppercase letters have lower Unicode values than lowercase letters. "A" (65) < "a" (97), so the result is negative.',
          },
          {
            question: 'Which method compares strings lexicographically ignoring case?',
            options: ['compareTo()', 'compareToIgnoreCase()', 'equalsIgnoreCase()', 'compare()'],
            correctIndex: 1,
            explanation: 'compareToIgnoreCase() performs lexicographic comparison while ignoring case differences between the characters.',
          },
        ],
        challenge: {
          prompt: 'Write a method that takes an array of strings and returns the one that comes first alphabetically (case-insensitive). Return null for an empty array.',
          starterCode: `public class FirstAlphabetically {
    public static String findFirst(String[] words) {
        // Your code here
    }

    public static void main(String[] args) {
        System.out.println(findFirst(new String[]{"Banana", "apple", "Cherry"}));
        // apple
        System.out.println(findFirst(new String[]{"Zebra", "yak", "Ant"}));
        // Ant
        System.out.println(findFirst(new String[]{}));
        // null
    }
}`,
          solutionCode: `public class FirstAlphabetically {
    public static String findFirst(String[] words) {
        if (words.length == 0) return null;
        String first = words[0];
        for (int i = 1; i < words.length; i++) {
            if (words[i].compareToIgnoreCase(first) < 0) {
                first = words[i];
            }
        }
        return first;
    }

    public static void main(String[] args) {
        System.out.println(findFirst(new String[]{"Banana", "apple", "Cherry"}));
        // apple
        System.out.println(findFirst(new String[]{"Zebra", "yak", "Ant"}));
        // Ant
        System.out.println(findFirst(new String[]{}));
        // null
    }
}`,
          hints: [
            'Start by assuming the first element is the smallest.',
            'Use compareToIgnoreCase() to compare each element against the current smallest.',
            'If the comparison returns a negative value, the new element comes first alphabetically.',
          ],
        },
      },
      {
        id: 'str-replace',
        title: 'replace()',
        difficulty: 'beginner',
        tags: ['String', 'replace', 'replaceAll', 'regex'],
        cheatSheetSummary: 'str.replace(old, new) replaces all literal occurrences. replaceAll(regex, new) uses regex patterns.',
        signature: 'String replace(CharSequence target, CharSequence replacement)',
        sections: [
          {
            heading: 'Replacing Characters and Substrings',
            content:
              'replace() replaces all occurrences of a literal character or string. replaceAll() interprets the first argument as a regular expression. replaceFirst() replaces only the first match. All return a new string since strings are immutable.',
            code: `public class StrReplace {
    public static void main(String[] args) {
        String text = "Hello World Hello Java";

        // Replace all occurrences (literal)
        System.out.println(text.replace("Hello", "Hi"));
        System.out.println(text.replace('o', '0'));

        // Replace first occurrence only
        System.out.println(text.replaceFirst("Hello", "Hi"));

        // replaceAll uses regex
        String messy = "  Hello   World   ";
        System.out.println(messy.replaceAll("\\\\s+", " ").trim());

        // Remove all non-alphanumeric characters
        String dirty = "Hello! How are you? #fine";
        System.out.println(dirty.replaceAll("[^a-zA-Z0-9 ]", ""));

        // Practical: sanitize input
        String input = "  John   Doe  ";
        String clean = input.trim().replaceAll("\\\\s+", " ");
        System.out.println("Clean: '" + clean + "'");

        // Chaining replacements
        String template = "Hello {name}, welcome to {place}!";
        String result = template.replace("{name}", "Alice")
                                .replace("{place}", "Java Land");
        System.out.println(result);
    }
}`,
            output: `Hi World Hi Java
Hell0 W0rld Hell0 Java
Hi World Hello Java
Hello World
Hello How are you fine
Clean: 'John Doe'
Hello Alice, welcome to Java Land!`,
            warning: 'replaceAll() uses regex, so special regex characters like . and $ must be escaped: str.replaceAll("\\\\.", "-") to replace dots.',
            codeHighlightLines: [5, 6, 9, 13, 17, 20, 21],
          },
        ],
        quiz: [
          {
            question: 'What does "Hello World".replace("World", "Java") return?',
            options: ['"Hello Java"', '"Hello World"', '"Java Java"', 'Throws an exception'],
            correctIndex: 0,
            explanation: 'replace() finds "World" and replaces it with "Java", returning "Hello Java". The original string is unchanged since strings are immutable.',
          },
          {
            question: 'What is the difference between replace() and replaceAll()?',
            options: ['replace() replaces first occurrence only', 'replaceAll() takes a regex pattern as the first argument', 'replace() is faster but replaceAll() is safer', 'There is no difference'],
            correctIndex: 1,
            explanation: 'replace() treats the first argument as a literal string, while replaceAll() interprets it as a regular expression pattern.',
          },
          {
            question: 'What does "aabaa".replaceFirst("a", "X") return?',
            options: ['"XXbXX"', '"Xabaa"', '"aXbaa"', '"XabXX"'],
            correctIndex: 1,
            explanation: 'replaceFirst() only replaces the first matching occurrence. The first "a" at index 0 is replaced with "X".',
          },
        ],
        challenge: {
          prompt: 'Write a method that takes a template string with placeholders like {name} and {age}, and a map of key-value pairs, and returns the string with all placeholders replaced.',
          starterCode: `import java.util.Map;

public class TemplateReplacer {
    public static String fillTemplate(String template, Map<String, String> values) {
        // Your code here
    }

    public static void main(String[] args) {
        String template = "Hello {name}, you are {age} years old from {city}.";
        Map<String, String> values = Map.of(
            "name", "Alice",
            "age", "30",
            "city", "New York"
        );
        System.out.println(fillTemplate(template, values));
        // Hello Alice, you are 30 years old from New York.
    }
}`,
          solutionCode: `import java.util.Map;

public class TemplateReplacer {
    public static String fillTemplate(String template, Map<String, String> values) {
        String result = template;
        for (Map.Entry<String, String> entry : values.entrySet()) {
            result = result.replace("{" + entry.getKey() + "}", entry.getValue());
        }
        return result;
    }

    public static void main(String[] args) {
        String template = "Hello {name}, you are {age} years old from {city}.";
        Map<String, String> values = Map.of(
            "name", "Alice",
            "age", "30",
            "city", "New York"
        );
        System.out.println(fillTemplate(template, values));
        // Hello Alice, you are 30 years old from New York.
    }
}`,
          hints: [
            'Iterate over the Map entries using a for-each loop on entrySet().',
            'For each entry, use replace() to substitute "{key}" with the value.',
            'Remember that replace() returns a new String, so reassign the result variable.',
          ],
        },
      },
      {
        id: 'str-split',
        title: 'split()',
        difficulty: 'beginner',
        tags: ['String', 'split', 'tokenize', 'array'],
        cheatSheetSummary: 'str.split(regex) splits into a String array. Use split(regex, limit) to control maximum number of parts.',
        signature: 'String[] split(String regex)',
        sections: [
          {
            heading: 'Splitting Strings',
            content:
              'split() divides a string into an array based on a regular expression delimiter. Common delimiters include commas, spaces, pipes, and custom patterns. The optional limit parameter controls the maximum number of resulting parts. Remember that split() uses regex, so special characters need escaping.',
            code: `import java.util.Arrays;

public class StrSplit {
    public static void main(String[] args) {
        // Split by comma
        String csv = "Alice,30,New York";
        String[] parts = csv.split(",");
        System.out.println("CSV: " + Arrays.toString(parts));

        // Split by whitespace
        String sentence = "Hello   World   Java";
        String[] words = sentence.split("\\\\s+");  // one or more whitespace
        System.out.println("Words: " + Arrays.toString(words));

        // Split with limit
        String line = "key=value=extra";
        String[] kv = line.split("=", 2);  // max 2 parts
        System.out.println("Key: " + kv[0] + ", Value: " + kv[1]);

        // Split by dot (must escape because . is regex special char)
        String filename = "archive.tar.gz";
        String[] dotParts = filename.split("\\\\.");
        System.out.println("Dot split: " + Arrays.toString(dotParts));

        // Split by pipe
        String data = "A|B|C|D";
        String[] pipeParts = data.split("\\\\|");
        System.out.println("Pipe split: " + Arrays.toString(pipeParts));

        // Practical: parse key-value pairs
        String config = "host=localhost;port=8080;debug=true";
        for (String entry : config.split(";")) {
            String[] pair = entry.split("=");
            System.out.println("  " + pair[0] + " -> " + pair[1]);
        }
    }
}`,
            output: `CSV: [Alice, 30, New York]
Words: [Hello, World, Java]
Key: key, Value: value=extra
Dot split: [archive, tar, gz]
Pipe split: [A, B, C, D]
  host -> localhost
  port -> 8080
  debug -> true`,
            tip: 'To split by a literal string without regex, use Pattern.quote(): str.split(Pattern.quote(".")). This avoids escaping issues.',
            analogy: 'Think of it like cutting a long sausage link: the delimiter is where you cut, and each resulting piece becomes an element in the returned array. The limit parameter sets the maximum number of pieces you want.',
            codeHighlightLines: [7, 8, 12, 13, 17, 18, 22, 23, 27, 28],
          },
        ],
        quiz: [
          {
            question: 'What does "a,b,c".split(",") return?',
            options: ['["a,b,c"]', '["a", "b", "c"]', '["a", ",", "b", ",", "c"]', '["abc"]'],
            correctIndex: 1,
            explanation: 'split(",") divides the string at each comma, producing an array of three elements: "a", "b", and "c".',
          },
          {
            question: 'Why does "a.b.c".split(".") return an empty array instead of ["a", "b", "c"]?',
            options: ['Because split() does not work with dots', 'Because . is a regex wildcard that matches everything', 'Because the string is too short', 'It actually does return ["a", "b", "c"]'],
            correctIndex: 1,
            explanation: 'split() uses regex. The dot (.) is a regex wildcard that matches any character, so it splits at every position. Use split("\\\\.") or split(Pattern.quote(".")) to split on a literal dot.',
          },
          {
            question: 'What does "key=value=extra".split("=", 2) return?',
            options: ['["key", "value", "extra"]', '["key", "value=extra"]', '["key=value", "extra"]', '["key", "value"]'],
            correctIndex: 1,
            explanation: 'The limit parameter 2 means at most 2 parts. The string is split at the first "=" only, giving ["key", "value=extra"].',
          },
        ],
        challenge: {
          prompt: 'Write a method that parses a semicolon-separated config string like "host=localhost;port=8080;debug=true" into a Map<String, String>.',
          starterCode: `import java.util.Map;
import java.util.HashMap;

public class ParseConfig {
    public static Map<String, String> parse(String config) {
        // Your code here
    }

    public static void main(String[] args) {
        String config = "host=localhost;port=8080;debug=true";
        Map<String, String> result = parse(config);
        System.out.println(result);
        // {host=localhost, port=8080, debug=true}
        System.out.println(result.get("port")); // 8080
    }
}`,
          solutionCode: `import java.util.Map;
import java.util.HashMap;

public class ParseConfig {
    public static Map<String, String> parse(String config) {
        Map<String, String> map = new HashMap<>();
        for (String entry : config.split(";")) {
            String[] kv = entry.split("=", 2);
            map.put(kv[0], kv[1]);
        }
        return map;
    }

    public static void main(String[] args) {
        String config = "host=localhost;port=8080;debug=true";
        Map<String, String> result = parse(config);
        System.out.println(result);
        // {host=localhost, port=8080, debug=true}
        System.out.println(result.get("port")); // 8080
    }
}`,
          hints: [
            'First split on ";" to get individual key-value entries.',
            'Then split each entry on "=" with a limit of 2 to handle values that might contain "=".',
            'Put each key-value pair into a HashMap.',
          ],
        },
      },
      {
        id: 'str-trim',
        title: 'trim() & strip()',
        difficulty: 'beginner',
        tags: ['String', 'trim', 'strip', 'whitespace'],
        cheatSheetSummary: 'trim() removes ASCII whitespace (<= U+0020). strip() (Java 11+) removes all Unicode whitespace. Prefer strip().',
        signature: 'String trim() / String strip()',
        sections: [
          {
            heading: 'Removing Whitespace',
            content:
              'trim() removes leading and trailing ASCII whitespace characters (space, tab, newline, etc. with code points <= U+0020). strip() (Java 11+) is Unicode-aware and removes all Unicode whitespace characters. Use stripLeading() and stripTrailing() to remove whitespace from only one side.',
            code: `public class StrTrim {
    public static void main(String[] args) {
        String padded = "  Hello, World!  ";

        System.out.println("Original: '" + padded + "'");
        System.out.println("trim(): '" + padded.trim() + "'");
        System.out.println("strip(): '" + padded.strip() + "'");
        System.out.println("stripLeading(): '" + padded.stripLeading() + "'");
        System.out.println("stripTrailing(): '" + padded.stripTrailing() + "'");

        // Trim with tabs and newlines
        String messy = "\\t\\n  Hello  \\n\\t";
        System.out.println("\\nMessy trim: '" + messy.trim() + "'");

        // Check blank vs empty
        String blank = "   ";
        System.out.println("\\nisEmpty: " + blank.isEmpty());   // false (has spaces)
        System.out.println("isBlank: " + blank.isBlank());     // true (only whitespace)

        // Practical: clean user input
        String[] inputs = {"  Alice  ", "  Bob  ", "  ", "", "  Charlie "};
        System.out.println("\\nCleaned names:");
        for (String input : inputs) {
            String cleaned = input.strip();
            if (!cleaned.isEmpty()) {
                System.out.println("  '" + cleaned + "'");
            }
        }
    }
}`,
            output: `Original: '  Hello, World!  '
trim(): 'Hello, World!'
strip(): 'Hello, World!'
stripLeading(): 'Hello, World!  '
stripTrailing(): '  Hello, World!'

Messy trim: 'Hello'

isEmpty: false
isBlank: true

Cleaned names:
  'Alice'
  'Bob'
  'Charlie'`,
            note: 'strip(), stripLeading(), stripTrailing(), and isBlank() were added in Java 11. Use them over trim() for proper Unicode handling.',
            codeHighlightLines: [7, 8, 9, 10, 11, 19, 20],
          },
        ],
        quiz: [
          {
            question: 'What is the difference between trim() and strip()?',
            options: ['trim() is Unicode-aware while strip() is not', 'strip() is Unicode-aware while trim() only handles ASCII whitespace', 'There is no difference', 'strip() removes internal whitespace too'],
            correctIndex: 1,
            explanation: 'trim() only removes ASCII whitespace (code points <= U+0020). strip() (Java 11+) removes all Unicode whitespace characters.',
          },
          {
            question: 'What does "   ".isBlank() return?',
            options: ['true', 'false', 'Throws an exception', 'null'],
            correctIndex: 0,
            explanation: 'isBlank() returns true if the string is empty or contains only whitespace characters. "   " contains only spaces, so it returns true.',
          },
          {
            question: 'What does "  Hello  ".stripLeading() return?',
            options: ['"Hello"', '"Hello  "', '"  Hello"', '"Hello  "'],
            correctIndex: 1,
            explanation: 'stripLeading() removes whitespace only from the beginning (leading edge) of the string, leaving trailing whitespace intact.',
          },
        ],
        challenge: {
          prompt: 'Write a method that takes an array of user inputs and returns a list of cleaned, non-empty strings (trimmed, with no blank entries).',
          starterCode: `import java.util.List;
import java.util.ArrayList;

public class CleanInputs {
    public static List<String> cleanAndFilter(String[] inputs) {
        // Your code here
    }

    public static void main(String[] args) {
        String[] inputs = {"  Alice  ", "   ", "", "  Bob  ", " Charlie "};
        System.out.println(cleanAndFilter(inputs));
        // [Alice, Bob, Charlie]
    }
}`,
          solutionCode: `import java.util.List;
import java.util.ArrayList;

public class CleanInputs {
    public static List<String> cleanAndFilter(String[] inputs) {
        List<String> result = new ArrayList<>();
        for (String input : inputs) {
            String cleaned = input.strip();
            if (!cleaned.isEmpty()) {
                result.add(cleaned);
            }
        }
        return result;
    }

    public static void main(String[] args) {
        String[] inputs = {"  Alice  ", "   ", "", "  Bob  ", " Charlie "};
        System.out.println(cleanAndFilter(inputs));
        // [Alice, Bob, Charlie]
    }
}`,
          hints: [
            'Use strip() to remove leading and trailing whitespace from each string.',
            'After stripping, check if the result is not empty using isEmpty() before adding to the list.',
          ],
        },
      },
      {
        id: 'str-format',
        title: 'String.format()',
        difficulty: 'beginner',
        tags: ['String', 'format', 'printf', 'formatted'],
        cheatSheetSummary: 'String.format("Name: %s, Age: %d", name, age). Common: %s (string), %d (int), %f (float), %n (newline).',
        signature: 'static String format(String format, Object... args)',
        sections: [
          {
            heading: 'Formatting Strings',
            content:
              'String.format() creates formatted strings using format specifiers. Common specifiers: %s (string), %d (decimal integer), %f (floating point), %e (scientific), %b (boolean), %c (character), %n (platform-specific newline). Width and precision modifiers control alignment and decimal places.',
            code: `public class StrFormat {
    public static void main(String[] args) {
        // Basic format specifiers
        String s = String.format("Name: %s, Age: %d, GPA: %.2f", "Alice", 20, 3.856);
        System.out.println(s);

        // Width and alignment
        System.out.println(String.format("|%-15s|%10d|", "Item", 42));
        System.out.println(String.format("|%-15s|%10d|", "Long Item Name", 12345));

        // Zero-padding
        System.out.println(String.format("ID: %05d", 42));

        // Multiple formats
        System.out.printf("Hex: %x, Oct: %o, Bin: %s%n", 255, 255, Integer.toBinaryString(255));

        // Formatting table
        System.out.println("\\n--- Price List ---");
        System.out.printf("%-12s %8s %6s%n", "Product", "Price", "Qty");
        System.out.printf("%-12s %8.2f %6d%n", "Apple", 1.50, 100);
        System.out.printf("%-12s %8.2f %6d%n", "Banana", 0.75, 250);
        System.out.printf("%-12s %8.2f %6d%n", "Cherry", 3.25, 50);

        // formatted() method (Java 15+)
        String msg = "Hello %s, you are %d years old".formatted("Bob", 25);
        System.out.println("\\n" + msg);
    }
}`,
            output: `Name: Alice, Age: 20, GPA: 3.86
|Item           |        42|
|Long Item Name |     12345|
ID: 00042
Hex: ff, Oct: 377, Bin: 11111111

--- Price List ---
Product         Price    Qty
Apple            1.50    100
Banana           0.75    250
Cherry           3.25     50

Hello Bob, you are 25 years old`,
            note: 'The formatted() instance method was added in Java 15 as a more readable alternative to String.format().',
            codeHighlightLines: [3, 7, 8, 11, 14, 19, 20, 21, 24],
          },
        ],
        quiz: [
          {
            question: 'What does String.format("%.2f", 3.14159) return?',
            options: ['"3.14"', '"3.14159"', '"3.15"', '"3.1"'],
            correctIndex: 0,
            explanation: '%.2f formats a floating-point number with 2 decimal places. 3.14159 is rounded to "3.14".',
          },
          {
            question: 'What format specifier is used for integers?',
            options: ['%s', '%f', '%d', '%i'],
            correctIndex: 2,
            explanation: '%d is the format specifier for decimal integers. %s is for strings, %f is for floating-point numbers.',
          },
          {
            question: 'What does String.format("%05d", 42) return?',
            options: ['"00042"', '"42000"', '"   42"', '"42   "'],
            correctIndex: 0,
            explanation: '%05d formats an integer with a minimum width of 5 characters, padded with zeros on the left. 42 becomes "00042".',
          },
          {
            question: 'What does the - flag do in String.format("%-10s", "Hi")?',
            options: ['Right-aligns the string', 'Left-aligns the string', 'Removes the string', 'Adds a minus sign prefix'],
            correctIndex: 1,
            explanation: 'The - flag left-aligns the value within the specified width. Without it, values are right-aligned by default.',
          },
        ],
        challenge: {
          prompt: 'Write a method that formats a list of products into a neatly aligned table with columns: Name (left-aligned, 15 chars), Price (right-aligned, 8 chars with 2 decimals), and Quantity (right-aligned, 5 chars).',
          starterCode: `public class ProductTable {
    public static String formatTable(String[][] products) {
        // Each product is {name, price, quantity}
        // Your code here
    }

    public static void main(String[] args) {
        String[][] products = {
            {"Apple", "1.50", "100"},
            {"Banana", "0.75", "250"},
            {"Cherry Tomato", "3.25", "50"}
        };
        System.out.println(formatTable(products));
    }
}`,
          solutionCode: `public class ProductTable {
    public static String formatTable(String[][] products) {
        StringBuilder sb = new StringBuilder();
        sb.append(String.format("%-15s %8s %5s%n", "Name", "Price", "Qty"));
        sb.append(String.format("%-15s %8s %5s%n", "---", "-----", "---"));
        for (String[] p : products) {
            sb.append(String.format("%-15s %8.2f %5d%n",
                p[0], Double.parseDouble(p[1]), Integer.parseInt(p[2])));
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        String[][] products = {
            {"Apple", "1.50", "100"},
            {"Banana", "0.75", "250"},
            {"Cherry Tomato", "3.25", "50"}
        };
        System.out.println(formatTable(products));
    }
}`,
          hints: [
            'Use String.format() with %-15s for left-aligned strings and %8.2f for right-aligned decimals.',
            'Parse the price and quantity strings to double and int using Double.parseDouble() and Integer.parseInt().',
            'Use StringBuilder to efficiently build the multi-line output.',
          ],
        },
      },
      {
        id: 'str-join',
        title: 'String.join()',
        difficulty: 'beginner',
        tags: ['String', 'join', 'concatenate', 'delimiter'],
        cheatSheetSummary: 'String.join(delimiter, elements) joins strings with a separator. Works with arrays and Iterables.',
        signature: 'static String join(CharSequence delimiter, CharSequence... elements)',
        sections: [
          {
            heading: 'Joining Strings',
            content:
              'String.join() concatenates strings with a delimiter between them. It works with varargs and Iterables (like List). StringJoiner provides more control with prefix and suffix. Collectors.joining() is the Stream API equivalent.',
            code: `import java.util.List;
import java.util.StringJoiner;
import java.util.stream.Collectors;

public class StrJoin {
    public static void main(String[] args) {
        // Join with delimiter
        String csv = String.join(", ", "Alice", "Bob", "Charlie");
        System.out.println("CSV: " + csv);

        // Join a list
        List<String> fruits = List.of("apple", "banana", "cherry");
        String joined = String.join(" | ", fruits);
        System.out.println("Fruits: " + joined);

        // Join an array
        String[] words = {"Hello", "World"};
        System.out.println("Words: " + String.join(" ", words));

        // StringJoiner for prefix and suffix
        StringJoiner sj = new StringJoiner(", ", "[", "]");
        sj.add("1").add("2").add("3");
        System.out.println("Joiner: " + sj.toString());

        // Empty value handling
        StringJoiner empty = new StringJoiner(", ", "(", ")");
        empty.setEmptyValue("(none)");
        System.out.println("Empty: " + empty.toString());

        // Collectors.joining in streams
        String result = List.of("Java", "Python", "Go")
            .stream()
            .collect(Collectors.joining(", ", "Languages: [", "]"));
        System.out.println(result);

        // Practical: build SQL IN clause
        List<String> ids = List.of("101", "102", "103");
        String inClause = "WHERE id IN (" + String.join(", ", ids) + ")";
        System.out.println(inClause);
    }
}`,
            output: `CSV: Alice, Bob, Charlie
Fruits: apple | banana | cherry
Words: Hello World
Joiner: [1, 2, 3]
Empty: (none)
Languages: [Java, Python, Go]
WHERE id IN (101, 102, 103)`,
            tip: 'Use String.join() or Collectors.joining() instead of manually concatenating with a loop. It handles the delimiter correctly (no trailing separator).',
            analogy: 'Think of it like stringing beads on a necklace: String.join provides the thread (delimiter) between each bead (element), and StringJoiner adds a clasp at each end (prefix and suffix).',
            codeHighlightLines: [8, 13, 18, 21, 22, 31, 32, 33],
          },
        ],
        quiz: [
          {
            question: 'What does String.join(", ", "A", "B", "C") return?',
            options: ['"A,B,C"', '"A, B, C"', '", A, B, C"', '"A, B, C, "'],
            correctIndex: 1,
            explanation: 'String.join places the delimiter between each element, producing "A, B, C". No leading or trailing delimiter is added.',
          },
          {
            question: 'What class provides join with a prefix and suffix?',
            options: ['String', 'StringBuilder', 'StringJoiner', 'StringBuffer'],
            correctIndex: 2,
            explanation: 'StringJoiner accepts a delimiter, prefix, and suffix in its constructor, allowing output like "[1, 2, 3]".',
          },
          {
            question: 'What is the Stream API equivalent of String.join()?',
            options: ['Collectors.joining()', 'Collectors.toList()', 'Collectors.groupingBy()', 'Stream.concat()'],
            correctIndex: 0,
            explanation: 'Collectors.joining() works like String.join in a stream pipeline and also supports delimiter, prefix, and suffix.',
          },
        ],
        challenge: {
          prompt: 'Write a method that takes a list of strings and returns them joined in a SQL-style IN clause like "WHERE name IN (\'Alice\', \'Bob\', \'Charlie\')".',
          starterCode: `import java.util.List;
import java.util.stream.Collectors;

public class SqlInClause {
    public static String buildInClause(String column, List<String> values) {
        // Your code here
    }

    public static void main(String[] args) {
        List<String> names = List.of("Alice", "Bob", "Charlie");
        System.out.println(buildInClause("name", names));
        // WHERE name IN ('Alice', 'Bob', 'Charlie')
    }
}`,
          solutionCode: `import java.util.List;
import java.util.stream.Collectors;

public class SqlInClause {
    public static String buildInClause(String column, List<String> values) {
        String joined = values.stream()
            .map(v -> "'" + v + "'")
            .collect(Collectors.joining(", "));
        return "WHERE " + column + " IN (" + joined + ")";
    }

    public static void main(String[] args) {
        List<String> names = List.of("Alice", "Bob", "Charlie");
        System.out.println(buildInClause("name", names));
        // WHERE name IN ('Alice', 'Bob', 'Charlie')
    }
}`,
          hints: [
            'Wrap each value in single quotes using map(v -> "\'" + v + "\'").',
            'Use Collectors.joining(", ") to join the quoted values with commas.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Stream API                                                   */
  /* ------------------------------------------------------------ */
  {
    id: 'java-streams',
    label: 'Stream API',
    icon: 'Zap',
    entries: [
      {
        id: 'stream-basics',
        title: 'Stream Basics',
        difficulty: 'intermediate',
        tags: ['Stream', 'pipeline', 'lazy', 'functional'],
        cheatSheetSummary: 'collection.stream() creates a stream. Streams are lazy, single-use pipelines: source -> intermediate ops -> terminal op.',
        sections: [
          {
            heading: 'Creating and Using Streams',
            content:
              'A Stream is a sequence of elements that supports functional-style operations. Streams are lazy (operations are not executed until a terminal operation is called), single-use (cannot be reused after a terminal operation), and do not modify the source. The pipeline pattern is: source -> intermediate operations -> terminal operation.',
            code: `import java.util.List;
import java.util.Arrays;
import java.util.stream.Stream;
import java.util.stream.IntStream;

public class StreamBasics {
    public static void main(String[] args) {
        // Stream from collection
        List<String> names = List.of("Alice", "Bob", "Charlie", "Diana");
        names.stream()
             .filter(n -> n.length() > 3)
             .map(String::toUpperCase)
             .forEach(System.out::println);

        // Stream from array
        int[] arr = {1, 2, 3, 4, 5};
        int sum = Arrays.stream(arr).sum();
        System.out.println("\\nSum: " + sum);

        // Stream.of
        Stream.of("X", "Y", "Z").forEach(s -> System.out.print(s + " "));
        System.out.println();

        // IntStream range
        IntStream.range(1, 6).forEach(i -> System.out.print(i + " "));
        System.out.println();

        // Stream.generate and iterate
        Stream.iterate(1, n -> n * 2)
              .limit(8)
              .forEach(n -> System.out.print(n + " "));
        System.out.println();

        // Parallel stream for large datasets
        long count = IntStream.range(0, 1_000_000)
                              .parallel()
                              .filter(n -> n % 2 == 0)
                              .count();
        System.out.println("Even count: " + count);
    }
}`,
            output: `ALICE
CHARLIE
DIANA

Sum: 15
X Y Z
1 2 3 4 5
1 2 4 8 16 32 64 128
Even count: 500000`,
            note: 'Streams were introduced in Java 8. They are the foundation of functional-style programming in Java.',
            analogy: 'Think of it like a factory assembly line: data items enter at one end (source), pass through a series of stations (intermediate operations like filter and map), and a final inspector collects or counts the results (terminal operation).',
            codeHighlightLines: [10, 11, 12, 13, 17, 23, 24, 29, 30, 31, 32],
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    A["Source\n(Collection / Array)"] --> B["stream()"]
    B --> C["filter()"]
    C --> D["map()"]
    D --> E["sorted()"]
    E --> F["Terminal Op\n(collect / forEach / reduce)"]
    style A fill:#e0f2fe
    style F fill:#dcfce7`,
              caption: 'Stream pipeline: source creates the stream, intermediate operations transform it lazily, and a terminal operation triggers execution',
            },
          },
        ],
        quiz: [
          {
            question: 'Which of the following is a terminal operation in the Stream API?',
            options: ['filter()', 'map()', 'sorted()', 'forEach()'],
            correctIndex: 3,
            explanation: 'forEach() is a terminal operation that triggers the stream pipeline execution. filter(), map(), and sorted() are intermediate operations that are lazy.',
          },
          {
            question: 'Can a stream be reused after a terminal operation has been called?',
            options: ['Yes, streams can be reused any number of times', 'No, streams are single-use', 'Yes, but only if you call reset()', 'Yes, but only for parallel streams'],
            correctIndex: 1,
            explanation: 'Streams are single-use. After a terminal operation is invoked, the stream is consumed and cannot be reused. You must create a new stream from the source.',
          },
          {
            question: 'What does "lazy evaluation" mean in the context of streams?',
            options: ['Streams execute operations slowly', 'Intermediate operations are not executed until a terminal operation is called', 'Streams skip null elements automatically', 'Streams always run in parallel'],
            correctIndex: 1,
            explanation: 'Lazy evaluation means intermediate operations like filter() and map() are not executed immediately. They are deferred until a terminal operation (like collect or forEach) triggers the pipeline.',
          },
          {
            question: 'Which method creates a stream from a Collection?',
            options: ['toStream()', 'stream()', 'Stream.from()', 'createStream()'],
            correctIndex: 1,
            explanation: 'Any Collection can produce a sequential stream via the .stream() method, or a parallel stream via .parallelStream().',
          },
        ],
        challenge: {
          prompt: 'Write a method that takes a list of integers and returns the sum of all even numbers using the Stream API.',
          starterCode: `import java.util.List;

public class StreamSum {
    public static int sumOfEvens(List<Integer> numbers) {
        // Your code here - use streams
    }

    public static void main(String[] args) {
        List<Integer> nums = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        System.out.println(sumOfEvens(nums)); // 30
    }
}`,
          solutionCode: `import java.util.List;

public class StreamSum {
    public static int sumOfEvens(List<Integer> numbers) {
        return numbers.stream()
            .filter(n -> n % 2 == 0)
            .mapToInt(Integer::intValue)
            .sum();
    }

    public static void main(String[] args) {
        List<Integer> nums = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        System.out.println(sumOfEvens(nums)); // 30
    }
}`,
          hints: [
            'Use filter() with a predicate that checks if n % 2 == 0.',
            'Convert to IntStream with mapToInt() so you can call sum() directly.',
          ],
        },
      },
      {
        id: 'stream-filter',
        title: 'filter()',
        difficulty: 'intermediate',
        tags: ['Stream', 'filter', 'predicate', 'conditional'],
        cheatSheetSummary: 'stream.filter(predicate) keeps elements matching the condition. Returns a new stream with fewer elements.',
        signature: 'Stream<T> filter(Predicate<T> predicate)',
        sections: [
          {
            heading: 'Filtering Stream Elements',
            content:
              'filter() takes a Predicate (a function that returns boolean) and returns a stream containing only elements that match. Predicates can be combined with and(), or(), and negate(). Multiple filter() calls can be chained.',
            analogy: 'Think of it like a coffee filter: water (all elements) passes through, but the filter only lets through what meets the criteria (the predicate), holding back everything else.',
            codeHighlightLines: [18, 19, 25, 26, 29, 33, 34, 35],
            code: `import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class StreamFilter {
    record Person(String name, int age, String city) {}

    public static void main(String[] args) {
        List<Person> people = List.of(
            new Person("Alice", 30, "NYC"),
            new Person("Bob", 25, "LA"),
            new Person("Charlie", 35, "NYC"),
            new Person("Diana", 28, "Chicago"),
            new Person("Eve", 22, "LA")
        );

        // Simple filter
        List<String> nycPeople = people.stream()
            .filter(p -> p.city().equals("NYC"))
            .map(Person::name)
            .collect(Collectors.toList());
        System.out.println("NYC: " + nycPeople);

        // Combined predicates
        Predicate<Person> isYoung = p -> p.age() < 30;
        Predicate<Person> isFromLA = p -> p.city().equals("LA");

        List<String> youngLA = people.stream()
            .filter(isYoung.and(isFromLA))
            .map(Person::name)
            .collect(Collectors.toList());
        System.out.println("Young LA: " + youngLA);

        // Negate
        List<String> notNYC = people.stream()
            .filter(isFromLA.negate().and(p -> !p.city().equals("NYC")))
            .map(Person::name)
            .collect(Collectors.toList());
        System.out.println("Not NYC/LA: " + notNYC);

        // Filter with numbers
        List<Integer> nums = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        List<Integer> evenGt5 = nums.stream()
            .filter(n -> n % 2 == 0)
            .filter(n -> n > 5)
            .collect(Collectors.toList());
        System.out.println("Even > 5: " + evenGt5);
    }
}`,
            output: `NYC: [Alice, Charlie]
Young LA: [Bob, Eve]
Not NYC/LA: [Diana]
Even > 5: [6, 8, 10]`,
          },
        ],
        quiz: [
          {
            question: 'What does filter() accept as its argument?',
            options: ['A Function<T, R>', 'A Predicate<T>', 'A Consumer<T>', 'A Supplier<T>'],
            correctIndex: 1,
            explanation: 'filter() accepts a Predicate<T>, which is a functional interface that takes one argument and returns a boolean.',
          },
          {
            question: 'How do you combine two predicates with a logical AND?',
            options: ['predicate1 && predicate2', 'predicate1.and(predicate2)', 'Predicate.and(predicate1, predicate2)', 'predicate1.combine(predicate2)'],
            correctIndex: 1,
            explanation: 'Predicate has default methods and(), or(), and negate() for combining predicates. Use predicate1.and(predicate2) for logical AND.',
          },
          {
            question: 'What does filter() return?',
            options: ['A List of matching elements', 'A boolean', 'A new Stream with matching elements', 'The count of matching elements'],
            correctIndex: 2,
            explanation: 'filter() is an intermediate operation that returns a new Stream containing only elements that match the predicate. It does not produce a final result by itself.',
          },
        ],
        challenge: {
          prompt: 'Write a method that takes a list of Person records and returns the names of people who are older than 25 and live in "NYC", using streams with combined predicates.',
          starterCode: `import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class FilterPeople {
    record Person(String name, int age, String city) {}

    public static List<String> findNYCAdults(List<Person> people) {
        // Your code here - use Predicate.and()
    }

    public static void main(String[] args) {
        List<Person> people = List.of(
            new Person("Alice", 30, "NYC"),
            new Person("Bob", 22, "NYC"),
            new Person("Charlie", 35, "LA"),
            new Person("Diana", 28, "NYC")
        );
        System.out.println(findNYCAdults(people)); // [Alice, Diana]
    }
}`,
          solutionCode: `import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class FilterPeople {
    record Person(String name, int age, String city) {}

    public static List<String> findNYCAdults(List<Person> people) {
        Predicate<Person> olderThan25 = p -> p.age() > 25;
        Predicate<Person> livesInNYC = p -> p.city().equals("NYC");

        return people.stream()
            .filter(olderThan25.and(livesInNYC))
            .map(Person::name)
            .collect(Collectors.toList());
    }

    public static void main(String[] args) {
        List<Person> people = List.of(
            new Person("Alice", 30, "NYC"),
            new Person("Bob", 22, "NYC"),
            new Person("Charlie", 35, "LA"),
            new Person("Diana", 28, "NYC")
        );
        System.out.println(findNYCAdults(people)); // [Alice, Diana]
    }
}`,
          hints: [
            'Define two separate Predicate<Person> variables for the age and city conditions.',
            'Combine them using the .and() method and pass the result to filter().',
            'Use map(Person::name) to extract names and collect to a list.',
          ],
        },
      },
      {
        id: 'stream-map',
        title: 'map()',
        difficulty: 'intermediate',
        tags: ['Stream', 'map', 'transform', 'Function'],
        cheatSheetSummary: 'stream.map(function) transforms each element. Returns a stream of transformed elements. mapToInt/Long/Double for primitives.',
        signature: 'Stream<R> map(Function<T, R> mapper)',
        sections: [
          {
            heading: 'Transforming Elements',
            content:
              'map() applies a function to each element, producing a new stream of transformed results. The function can change both the value and the type of elements. Use mapToInt(), mapToLong(), and mapToDouble() to convert to primitive streams (IntStream, etc.) for better performance.',
            analogy: 'Think of it like a cookie cutter stamping shapes: each piece of dough (input element) goes through the cutter (mapping function) and comes out as a new shape (transformed element). The number of cookies stays the same, but their form changes.',
            codeHighlightLines: [9, 10, 14, 15, 20, 21, 22, 27, 28],
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    A["'alice'"] -->|"toUpperCase()"| B["'ALICE'"]
    C["'bob'"] -->|"toUpperCase()"| D["'BOB'"]
    E["'charlie'"] -->|"toUpperCase()"| F["'CHARLIE'"]`,
              caption: 'map() transforms each element independently: the stream size stays the same but element values (and possibly types) change',
            },
            code: `import java.util.List;
import java.util.stream.Collectors;

public class StreamMap {
    public static void main(String[] args) {
        List<String> names = List.of("alice", "bob", "charlie");

        // Transform strings
        List<String> upper = names.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        System.out.println("Upper: " + upper);

        // Transform to different type
        List<Integer> lengths = names.stream()
            .map(String::length)
            .collect(Collectors.toList());
        System.out.println("Lengths: " + lengths);

        // Chain map operations
        List<String> processed = names.stream()
            .map(s -> s.substring(0, 1).toUpperCase() + s.substring(1))
            .map(s -> "Dr. " + s)
            .collect(Collectors.toList());
        System.out.println("Titles: " + processed);

        // mapToInt for primitive operations
        int totalLength = names.stream()
            .mapToInt(String::length)
            .sum();
        System.out.println("Total length: " + totalLength);

        // Map with complex transformation
        List<String> data = List.of("1:Alice", "2:Bob", "3:Charlie");
        List<String> extracted = data.stream()
            .map(s -> s.split(":")[1])
            .collect(Collectors.toList());
        System.out.println("Extracted: " + extracted);

        // Statistics from mapToInt
        var stats = names.stream().mapToInt(String::length).summaryStatistics();
        System.out.println("Stats: min=" + stats.getMin() + " max=" + stats.getMax()
                         + " avg=" + stats.getAverage());
    }
}`,
            output: `Upper: [ALICE, BOB, CHARLIE]
Lengths: [5, 3, 7]
Titles: [Dr. Alice, Dr. Bob, Dr. Charlie]
Total length: 15
Extracted: [Alice, Bob, Charlie]
Stats: min=3 max=7 avg=5.0`,
          },
        ],
      },
      {
        id: 'stream-reduce',
        title: 'reduce()',
        difficulty: 'intermediate',
        tags: ['Stream', 'reduce', 'aggregate', 'fold'],
        cheatSheetSummary: 'stream.reduce(identity, accumulator) combines elements into a single value. Identity is the starting value.',
        signature: 'T reduce(T identity, BinaryOperator<T> accumulator)',
        sections: [
          {
            heading: 'Reducing to a Single Value',
            content:
              'reduce() combines all elements of a stream into a single result by repeatedly applying a binary operator. The identity is the initial value and the result when the stream is empty. The accumulator combines two elements into one. reduce() without an identity returns Optional<T>.',
            code: `import java.util.List;
import java.util.Optional;

public class StreamReduce {
    public static void main(String[] args) {
        List<Integer> nums = List.of(1, 2, 3, 4, 5);

        // Sum with reduce
        int sum = nums.stream().reduce(0, Integer::sum);
        System.out.println("Sum: " + sum);

        // Product
        int product = nums.stream().reduce(1, (a, b) -> a * b);
        System.out.println("Product: " + product);

        // Max with reduce
        int max = nums.stream().reduce(Integer.MIN_VALUE, Integer::max);
        System.out.println("Max: " + max);

        // Without identity: returns Optional
        Optional<Integer> optSum = nums.stream().reduce(Integer::sum);
        optSum.ifPresent(s -> System.out.println("Optional sum: " + s));

        // Empty stream with Optional
        Optional<Integer> empty = List.<Integer>of().stream().reduce(Integer::sum);
        System.out.println("Empty reduce: " + empty.orElse(0));

        // String concatenation with reduce
        List<String> words = List.of("Hello", " ", "World", "!");
        String sentence = words.stream().reduce("", String::concat);
        System.out.println("Sentence: " + sentence);

        // Practical: find longest string
        List<String> names = List.of("Alice", "Bob", "Charlotte", "Dan");
        String longest = names.stream()
            .reduce("", (a, b) -> a.length() >= b.length() ? a : b);
        System.out.println("Longest: " + longest);

        // Factorial using reduce
        int n = 6;
        long factorial = java.util.stream.LongStream.rangeClosed(1, n)
            .reduce(1, (a, b) -> a * b);
        System.out.println(n + "! = " + factorial);
    }
}`,
            output: `Sum: 15
Product: 120
Max: 5
Optional sum: 15
Empty reduce: 0
Sentence: Hello World!
Longest: Charlotte
6! = 720`,
            tip: 'For simple aggregations like sum, min, max, count, use the dedicated IntStream methods instead of reduce. They are more readable and can be optimized.',
            analogy: 'Think of it like a snowball rolling downhill: it starts as the identity value and picks up (accumulates) each element it passes over, growing into a single final result at the bottom.',
            codeHighlightLines: [9, 12, 15, 21, 30, 35, 36],
            diagram: {
              kind: 'custom',
              type: 'algorithm-steps',
              data: {
                title: 'reduce(0, Integer::sum) on [1, 2, 3, 4, 5]',
                steps: [
                  { label: 'Start', value: 'acc = 0 (identity)' },
                  { label: 'Step 1', value: 'acc = 0 + 1 = 1' },
                  { label: 'Step 2', value: 'acc = 1 + 2 = 3' },
                  { label: 'Step 3', value: 'acc = 3 + 3 = 6' },
                  { label: 'Step 4', value: 'acc = 6 + 4 = 10' },
                  { label: 'Step 5', value: 'acc = 10 + 5 = 15' },
                  { label: 'Result', value: '15' },
                ],
              },
              caption: 'reduce() accumulates values step by step, starting from the identity element',
            },
          },
        ],
      },
      {
        id: 'stream-collect',
        title: 'collect()',
        difficulty: 'intermediate',
        tags: ['Stream', 'collect', 'Collectors', 'toList', 'toMap'],
        cheatSheetSummary: 'stream.collect(Collectors.toList()) gathers results. Also toSet(), toMap(), joining(), groupingBy().',
        signature: 'R collect(Collector<T, A, R> collector)',
        sections: [
          {
            heading: 'Collecting Stream Results',
            content:
              'collect() is the most versatile terminal operation. The Collectors class provides factories for common collection operations: toList(), toSet(), toMap(), joining(), groupingBy(), partitioningBy(), and more. Since Java 16, you can also use .toList() directly on the stream.',
            codeHighlightLines: [17, 18, 19, 26, 27, 28, 32, 33, 37, 38, 39, 43, 44, 48, 49, 50],
            code: `import java.util.*;
import java.util.stream.Collectors;

public class StreamCollect {
    record Student(String name, String dept, double gpa) {}

    public static void main(String[] args) {
        List<Student> students = List.of(
            new Student("Alice", "CS", 3.8),
            new Student("Bob", "Math", 3.5),
            new Student("Charlie", "CS", 3.9),
            new Student("Diana", "Math", 3.7),
            new Student("Eve", "CS", 3.6)
        );

        // Collect to List
        List<String> names = students.stream()
            .map(Student::name)
            .collect(Collectors.toList());
        System.out.println("Names: " + names);

        // toList() shorthand (Java 16+)
        // List<String> names2 = students.stream().map(Student::name).toList();

        // Collect to Set
        Set<String> depts = students.stream()
            .map(Student::dept)
            .collect(Collectors.toSet());
        System.out.println("Departments: " + depts);

        // Collect to Map
        Map<String, Double> gpas = students.stream()
            .collect(Collectors.toMap(Student::name, Student::gpa));
        System.out.println("GPAs: " + gpas);

        // Joining strings
        String joined = students.stream()
            .map(Student::name)
            .collect(Collectors.joining(", ", "[", "]"));
        System.out.println("Joined: " + joined);

        // Averaging
        double avgGpa = students.stream()
            .collect(Collectors.averagingDouble(Student::gpa));
        System.out.printf("Average GPA: %.2f%n", avgGpa);

        // Counting
        long csCount = students.stream()
            .filter(s -> s.dept().equals("CS"))
            .collect(Collectors.counting());
        System.out.println("CS students: " + csCount);
    }
}`,
            output: `Names: [Alice, Bob, Charlie, Diana, Eve]
Departments: [CS, Math]
GPAs: {Diana=3.7, Bob=3.5, Alice=3.8, Charlie=3.9, Eve=3.6}
Joined: [Alice, Bob, Charlie, Diana, Eve]
Average GPA: 3.70
CS students: 3`,
          },
        ],
      },
      {
        id: 'stream-sorted',
        title: 'sorted()',
        difficulty: 'intermediate',
        tags: ['Stream', 'sorted', 'Comparator', 'ordering'],
        cheatSheetSummary: 'stream.sorted() sorts by natural order. sorted(Comparator) for custom order. Does not modify the source.',
        signature: 'Stream<T> sorted(Comparator<T> comparator)',
        sections: [
          {
            heading: 'Sorting Stream Elements',
            content:
              'sorted() is an intermediate operation that returns a new stream with elements in sorted order. Without arguments, it uses natural ordering (elements must implement Comparable). With a Comparator argument, you can define any ordering. Combined with other operations, sorted() enables complex data processing pipelines.',
            codeHighlightLines: [17, 23, 30, 37, 38],
            code: `import java.util.List;
import java.util.Comparator;
import java.util.stream.Collectors;

public class StreamSorted {
    record Product(String name, double price, int stock) {}

    public static void main(String[] args) {
        List<Product> products = List.of(
            new Product("Laptop", 999.99, 50),
            new Product("Mouse", 29.99, 200),
            new Product("Keyboard", 79.99, 150),
            new Product("Monitor", 399.99, 75),
            new Product("USB Cable", 9.99, 500)
        );

        // Sort by price (ascending)
        System.out.println("By price:");
        products.stream()
            .sorted(Comparator.comparingDouble(Product::price))
            .forEach(p -> System.out.printf("  %-12s $%.2f%n", p.name(), p.price()));

        // Sort by price descending
        System.out.println("\\nBy price (desc):");
        products.stream()
            .sorted(Comparator.comparingDouble(Product::price).reversed())
            .limit(3)
            .forEach(p -> System.out.printf("  %-12s $%.2f%n", p.name(), p.price()));

        // Sort by name
        List<String> sortedNames = products.stream()
            .map(Product::name)
            .sorted()
            .collect(Collectors.toList());
        System.out.println("\\nNames sorted: " + sortedNames);

        // Multi-key sort
        System.out.println("\\nBy stock desc, then price:");
        products.stream()
            .sorted(Comparator.comparingInt(Product::stock).reversed()
                              .thenComparingDouble(Product::price))
            .forEach(p -> System.out.printf("  %-12s stock=%d $%.2f%n",
                     p.name(), p.stock(), p.price()));
    }
}`,
            output: `By price:
  USB Cable    $9.99
  Mouse        $29.99
  Keyboard     $79.99
  Monitor      $399.99
  Laptop       $999.99

By price (desc):
  Laptop       $999.99
  Monitor      $399.99
  Keyboard     $79.99

Names sorted: [Keyboard, Laptop, Monitor, Mouse, USB Cable]

By stock desc, then price:
  USB Cable    stock=500 $9.99
  Mouse        stock=200 $29.99
  Keyboard     stock=150 $79.99
  Monitor      stock=75 $399.99
  Laptop       stock=50 $999.99`,
          },
        ],
      },
      {
        id: 'stream-flatMap',
        title: 'flatMap()',
        difficulty: 'advanced',
        tags: ['Stream', 'flatMap', 'flatten', 'nested'],
        cheatSheetSummary: 'stream.flatMap(fn) maps each element to a stream, then flattens all streams into one. Useful for nested collections.',
        signature: 'Stream<R> flatMap(Function<T, Stream<R>> mapper)',
        sections: [
          {
            heading: 'Flattening Nested Structures',
            content:
              'flatMap() maps each element to a stream and then concatenates all the resulting streams into a single stream. It is essential for processing nested collections, where map() would produce a Stream<Stream<T>> but flatMap() produces a flat Stream<T>. Think of it as "map then flatten".',
            code: `import java.util.List;
import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StreamFlatMap {
    public static void main(String[] args) {
        // Flatten nested lists
        List<List<Integer>> nested = List.of(
            List.of(1, 2, 3),
            List.of(4, 5),
            List.of(6, 7, 8, 9)
        );
        List<Integer> flat = nested.stream()
            .flatMap(List::stream)
            .collect(Collectors.toList());
        System.out.println("Flattened: " + flat);

        // Split sentences into words
        List<String> sentences = List.of(
            "Hello World",
            "Java Streams",
            "Are Powerful"
        );
        List<String> words = sentences.stream()
            .flatMap(s -> Arrays.stream(s.split(" ")))
            .map(String::toLowerCase)
            .collect(Collectors.toList());
        System.out.println("Words: " + words);

        // flatMap vs map
        // map: ["Hello World"] -> [Stream["Hello", "World"]] (nested!)
        // flatMap: ["Hello World"] -> ["Hello", "World"] (flat!)

        // Practical: get all unique characters from all words
        List<String> names = List.of("Alice", "Bob", "Charlie");
        List<Character> chars = names.stream()
            .flatMap(name -> name.chars().mapToObj(c -> (char) c))
            .distinct()
            .sorted()
            .collect(Collectors.toList());
        System.out.println("Unique chars: " + chars);

        // Generate combinations
        List<String> colors = List.of("red", "blue");
        List<String> sizes = List.of("S", "M", "L");
        List<String> combos = colors.stream()
            .flatMap(color -> sizes.stream().map(size -> color + "-" + size))
            .collect(Collectors.toList());
        System.out.println("Combos: " + combos);
    }
}`,
            output: `Flattened: [1, 2, 3, 4, 5, 6, 7, 8, 9]
Words: [hello, world, java, streams, are, powerful]
Unique chars: [A, B, C, a, b, c, e, h, i, l, o, r]
Combos: [red-S, red-M, red-L, blue-S, blue-M, blue-L]`,
            tip: 'Use map() when each element transforms to exactly one result. Use flatMap() when each element transforms to zero or more results (a stream).',
            analogy: 'Think of it like opening boxes of chocolates: map() peeks inside each box and describes it, giving you a list of descriptions-of-boxes. flatMap() opens every box and dumps all the chocolates into one big pile, flattening the nested structure.',
            codeHighlightLines: [12, 13, 23, 24, 35, 36, 45, 46],
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    A["[[1,2,3], [4,5], [6,7,8,9]]"] -->|"map(List::stream)"| B["[Stream(1,2,3), Stream(4,5), Stream(6,7,8,9)]"]
    A -->|"flatMap(List::stream)"| C["[1, 2, 3, 4, 5, 6, 7, 8, 9]"]
    style B fill:#fee2e2
    style C fill:#dcfce7`,
              caption: 'map produces a stream-of-streams (nested); flatMap flattens into a single stream',
            },
          },
        ],
      },
      {
        id: 'stream-groupingBy',
        title: 'groupingBy()',
        difficulty: 'advanced',
        tags: ['Stream', 'groupingBy', 'partitioningBy', 'aggregate'],
        cheatSheetSummary: 'Collectors.groupingBy(classifier) groups elements into a Map<K, List<V>>. Can chain with downstream collectors.',
        signature: 'Collector groupingBy(Function classifier, Collector downstream)',
        sections: [
          {
            heading: 'Grouping and Partitioning',
            content:
              'Collectors.groupingBy() groups stream elements into a Map based on a classification function. It is analogous to SQL GROUP BY. You can nest downstream collectors for counting, summing, averaging, or further grouping. partitioningBy() is a special case that splits into two groups (true/false).',
            code: `import java.util.*;
import java.util.stream.Collectors;

public class StreamGrouping {
    record Employee(String name, String dept, double salary) {}

    public static void main(String[] args) {
        List<Employee> employees = List.of(
            new Employee("Alice", "Engineering", 90000),
            new Employee("Bob", "Marketing", 70000),
            new Employee("Charlie", "Engineering", 85000),
            new Employee("Diana", "Marketing", 75000),
            new Employee("Eve", "Engineering", 95000),
            new Employee("Frank", "Sales", 65000)
        );

        // Group by department
        Map<String, List<Employee>> byDept = employees.stream()
            .collect(Collectors.groupingBy(Employee::dept));
        byDept.forEach((dept, emps) ->
            System.out.println(dept + ": " + emps.stream().map(Employee::name).toList()));

        // Count by department
        Map<String, Long> countByDept = employees.stream()
            .collect(Collectors.groupingBy(Employee::dept, Collectors.counting()));
        System.out.println("\\nCount: " + countByDept);

        // Average salary by department
        Map<String, Double> avgSalary = employees.stream()
            .collect(Collectors.groupingBy(Employee::dept,
                     Collectors.averagingDouble(Employee::salary)));
        System.out.println("Avg salary: " + avgSalary);

        // Max salary per department
        Map<String, Optional<Employee>> maxPerDept = employees.stream()
            .collect(Collectors.groupingBy(Employee::dept,
                     Collectors.maxBy(Comparator.comparingDouble(Employee::salary))));
        maxPerDept.forEach((dept, emp) ->
            System.out.println("  Top in " + dept + ": " + emp.map(Employee::name).orElse("none")));

        // Partition by salary > 80000
        Map<Boolean, List<String>> partitioned = employees.stream()
            .collect(Collectors.partitioningBy(
                e -> e.salary() > 80000,
                Collectors.mapping(Employee::name, Collectors.toList())
            ));
        System.out.println("\\nHigh earners: " + partitioned.get(true));
        System.out.println("Others: " + partitioned.get(false));

        // Group names by department
        Map<String, String> namesByDept = employees.stream()
            .collect(Collectors.groupingBy(Employee::dept,
                     Collectors.mapping(Employee::name,
                     Collectors.joining(", "))));
        System.out.println("\\nNames: " + namesByDept);
    }
}`,
            output: `Engineering: [Alice, Charlie, Eve]
Marketing: [Bob, Diana]
Sales: [Frank]

Count: {Engineering=3, Marketing=2, Sales=1}
Avg salary: {Engineering=90000.0, Marketing=72500.0, Sales=65000.0}
  Top in Engineering: Eve
  Top in Marketing: Diana
  Top in Sales: Frank

High earners: [Alice, Charlie, Eve]
Others: [Bob, Diana, Frank]

Names: {Engineering=Alice, Charlie, Eve, Marketing=Bob, Diana, Sales=Frank}`,
            tip: 'groupingBy can be nested: groupingBy(dept, groupingBy(level)) creates a Map<String, Map<String, List<T>>> for multi-level grouping.',
            analogy: 'Think of it like sorting mail at a post office: groupingBy puts each letter into the right department mailbox (key), and downstream collectors can further sort within each mailbox (e.g., count letters, find the heaviest, or list sender names).',
            codeHighlightLines: [17, 18, 23, 24, 28, 29, 30, 34, 35, 36, 41, 42, 43, 44, 50, 51, 52, 53],
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
    A["Stream of Employees"] --> B["groupingBy(dept)"]
    B --> C["Engineering"]
    B --> D["Marketing"]
    B --> E["Sales"]
    C --> C1["Alice, Charlie, Eve"]
    D --> D1["Bob, Diana"]
    E --> E1["Frank"]`,
              caption: 'groupingBy classifies elements into buckets by the key function, like SQL GROUP BY',
            },
          },
        ],
      },
    ],
  },
];

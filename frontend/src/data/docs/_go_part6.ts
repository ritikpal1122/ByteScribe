import type { DocCategory } from './types';

// Part 6: Standard Library: strconv + sort + os/io
export const GO_PART6_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Standard Library: strconv                                    */
  /* ------------------------------------------------------------ */
  {
    id: 'stdlib-strconv',
    label: 'Standard Library: strconv',
    icon: 'ArrowLeftRight',
    entries: [
      {
        id: 'strconv-itoa',
        title: 'strconv.Itoa',
        difficulty: 'beginner',
        tags: ['strconv', 'itoa', 'int-to-string', 'conversion'],
        signature: 'func Itoa(i int) string',
        cheatSheetSummary:
          'Converts int to decimal string. `Itoa(42)` returns `"42"`. Shorthand for `FormatInt(int64(i), 10)`.',
        sections: [
          {
            heading: 'Integer to String',
            content:
              '`strconv.Itoa` converts an integer to its decimal string representation. It is the most commonly used int-to-string conversion. For other bases, use `strconv.FormatInt`.',
            code: `package main

import (
    "fmt"
    "strconv"
)

func main() {
    // Basic conversion
    s := strconv.Itoa(42)
    fmt.Println(s)         // "42"
    fmt.Printf("Type: %T\\n", s) // string

    // Negative numbers
    fmt.Println(strconv.Itoa(-100)) // "-100"
    fmt.Println(strconv.Itoa(0))    // "0"

    // Common use: building strings with numbers
    for i := 1; i <= 5; i++ {
        id := "user_" + strconv.Itoa(i)
        fmt.Println(id)
    }

    // Itoa vs fmt.Sprintf
    s1 := strconv.Itoa(42)          // faster
    s2 := fmt.Sprintf("%d", 42)     // more flexible
    fmt.Println(s1 == s2)           // true
}`,
            output: `42
Type: string
-100
0
user_1
user_2
user_3
user_4
user_5
true`,
            tip: '`strconv.Itoa` is faster than `fmt.Sprintf("%d", n)` because it avoids format parsing. Use it for simple int-to-string conversions.',
            analogy: 'Think of it like reading a number aloud: Itoa takes the number 42 and spells it out as the text "42". It is the inverse of Atoi, which listens to the text and writes down the number.',
          },
        ],
        quiz: [
          {
            question: 'What does strconv.Itoa(42) return?',
            options: ['42', '"42"', '"forty-two"', 'An error'],
            correctIndex: 1,
            explanation: 'strconv.Itoa converts an integer to its decimal string representation, so Itoa(42) returns the string "42".',
          },
          {
            question: 'Which is faster for converting an int to a string?',
            options: ['fmt.Sprintf("%d", n)', 'strconv.Itoa(n)', 'string(n)', 'fmt.Println(n)'],
            correctIndex: 1,
            explanation: 'strconv.Itoa is faster than fmt.Sprintf because it avoids format string parsing overhead.',
          },
          {
            question: 'What is strconv.Itoa shorthand for?',
            options: ['FormatFloat(float64(i), 10)', 'FormatInt(int64(i), 10)', 'ParseInt(i, 10, 0)', 'AppendInt(nil, int64(i), 10)'],
            correctIndex: 1,
            explanation: 'Itoa is equivalent to FormatInt(int64(i), 10), converting the integer to its base-10 string representation.',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes a slice of integers and returns a single string with all the numbers joined by commas (e.g., [1, 2, 3] becomes "1,2,3").',
          starterCode: `package main

import (
    "fmt"
    "strconv"
)

func joinInts(nums []int) string {
    // TODO: Convert each int to string using strconv.Itoa
    // and join them with commas
    return ""
}

func main() {
    fmt.Println(joinInts([]int{1, 2, 3}))       // "1,2,3"
    fmt.Println(joinInts([]int{10, 20, 30, 40})) // "10,20,30,40"
    fmt.Println(joinInts([]int{}))                // ""
}`,
          solutionCode: `package main

import (
    "fmt"
    "strconv"
    "strings"
)

func joinInts(nums []int) string {
    parts := make([]string, len(nums))
    for i, n := range nums {
        parts[i] = strconv.Itoa(n)
    }
    return strings.Join(parts, ",")
}

func main() {
    fmt.Println(joinInts([]int{1, 2, 3}))       // "1,2,3"
    fmt.Println(joinInts([]int{10, 20, 30, 40})) // "10,20,30,40"
    fmt.Println(joinInts([]int{}))                // ""
}`,
          hints: [
            'Use strconv.Itoa to convert each integer to a string.',
            'Build a slice of strings and use strings.Join to combine them with a comma separator.',
            'Handle the empty slice case -- strings.Join on an empty slice returns an empty string naturally.',
          ],
        },
      },
      {
        id: 'strconv-atoi',
        title: 'strconv.Atoi',
        difficulty: 'beginner',
        tags: ['strconv', 'atoi', 'string-to-int', 'parse'],
        signature: 'func Atoi(s string) (int, error)',
        cheatSheetSummary:
          'Parses decimal string to int. Returns (0, error) on failure. Shorthand for `ParseInt(s, 10, 0)`.',
        sections: [
          {
            heading: 'String to Integer',
            content:
              '`strconv.Atoi` parses a decimal string into an `int`. It returns the integer and an error. Always check the error -- invalid strings return 0 and a non-nil error. For other bases or specific sizes, use `strconv.ParseInt`.',
            code: `package main

import (
    "fmt"
    "strconv"
)

func main() {
    // Basic conversion
    n, err := strconv.Atoi("42")
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("Parsed:", n)
    }

    // Error cases
    _, err = strconv.Atoi("not-a-number")
    fmt.Println("Error:", err)

    _, err = strconv.Atoi("3.14")
    fmt.Println("Error:", err)

    _, err = strconv.Atoi("")
    fmt.Println("Error:", err)

    // Leading/trailing spaces are NOT trimmed
    _, err = strconv.Atoi(" 42 ")
    fmt.Println("Spaces error:", err)

    // Practical: parse command line args
    args := []string{"10", "20", "30"}
    sum := 0
    for _, arg := range args {
        n, err := strconv.Atoi(arg)
        if err != nil {
            fmt.Printf("Skipping %q: %v\\n", arg, err)
            continue
        }
        sum += n
    }
    fmt.Println("Sum:", sum)
}`,
            output: `Parsed: 42
Error: strconv.Atoi: parsing "not-a-number": invalid syntax
Error: strconv.Atoi: parsing "3.14": invalid syntax
Error: strconv.Atoi: parsing "": invalid syntax
Spaces error: strconv.Atoi: parsing " 42 ": invalid syntax
Sum: 60`,
            tip: 'Always trim spaces before calling `Atoi`: `strconv.Atoi(strings.TrimSpace(s))`. Atoi does not handle whitespace.',
            analogy: 'Think of it like a strict ticket scanner: Atoi only accepts perfectly formatted number strings and rejects anything with extra characters, spaces, or decimals.',
            codeHighlightLines: [10, 11, 18, 28],
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart TD
    A["Input string"] --> B{"Valid integer?"}
    B -->|"'42'"| C["Returns 42, nil"]
    B -->|"'3.14'"| D["Returns 0, error"]
    B -->|"' 42 '"| E["Returns 0, error"]
    B -->|"'abc'"| F["Returns 0, error"]`,
              caption: 'Atoi only succeeds with pure decimal integer strings',
            },
          },
        ],
        quiz: [
          {
            question: 'What does strconv.Atoi return when given an invalid string like "abc"?',
            options: ['0 and nil', '0 and an error', '-1 and an error', 'It panics'],
            correctIndex: 1,
            explanation: 'strconv.Atoi returns 0 and a non-nil error for invalid input strings. Always check the error before using the result.',
          },
          {
            question: 'What happens when you call strconv.Atoi(" 42 ") with leading/trailing spaces?',
            options: ['Returns 42 and nil', 'Returns 42 and an error', 'Returns 0 and an error', 'Trims spaces automatically and returns 42'],
            correctIndex: 2,
            explanation: 'Atoi does NOT trim whitespace. The string " 42 " is considered invalid and returns 0 with an error. Use strings.TrimSpace first.',
          },
          {
            question: 'strconv.Atoi is shorthand for which function call?',
            options: ['strconv.FormatInt(s, 10)', 'strconv.ParseFloat(s, 64)', 'strconv.ParseInt(s, 10, 0)', 'strconv.ParseUint(s, 10, 0)'],
            correctIndex: 2,
            explanation: 'Atoi is equivalent to ParseInt(s, 10, 0), which parses a base-10 string into an integer.',
          },
          {
            question: 'Can strconv.Atoi parse the string "3.14"?',
            options: ['Yes, it returns 3', 'Yes, it returns 3.14', 'No, it returns an error', 'Yes, it truncates to 3'],
            correctIndex: 2,
            explanation: 'Atoi only accepts pure integer strings. A decimal point makes the string invalid, so it returns 0 and an error.',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes a slice of strings, attempts to parse each as an integer using strconv.Atoi, and returns the sum of all successfully parsed values along with a count of how many strings failed to parse.',
          starterCode: `package main

import (
    "fmt"
    "strconv"
)

func sumValid(inputs []string) (sum int, failures int) {
    // TODO: Loop through inputs, try Atoi on each.
    // Add valid ints to sum, count failures.
    return 0, 0
}

func main() {
    s, f := sumValid([]string{"10", "abc", "20", "3.14", "30"})
    fmt.Printf("Sum: %d, Failures: %d\\n", s, f) // Sum: 60, Failures: 2
}`,
          solutionCode: `package main

import (
    "fmt"
    "strconv"
)

func sumValid(inputs []string) (sum int, failures int) {
    for _, s := range inputs {
        n, err := strconv.Atoi(s)
        if err != nil {
            failures++
            continue
        }
        sum += n
    }
    return sum, failures
}

func main() {
    s, f := sumValid([]string{"10", "abc", "20", "3.14", "30"})
    fmt.Printf("Sum: %d, Failures: %d\\n", s, f) // Sum: 60, Failures: 2
}`,
          hints: [
            'Use strconv.Atoi to attempt parsing each string and check the returned error.',
            'If err != nil, increment the failures counter and use continue to skip to the next iteration.',
            'Valid integers ("10", "20", "30") should be added to the running sum.',
          ],
        },
      },
      {
        id: 'strconv-parseFloat',
        title: 'strconv.ParseFloat',
        difficulty: 'beginner',
        tags: ['strconv', 'float', 'parse', 'decimal'],
        signature: 'func ParseFloat(s string, bitSize int) (float64, error)',
        cheatSheetSummary:
          'Parses string to float64. `bitSize` 32 or 64 controls precision. Supports `"NaN"`, `"Inf"`, scientific notation.',
        sections: [
          {
            heading: 'Parsing Floating Point Numbers',
            content:
              '`strconv.ParseFloat` converts a string to a floating-point number. The `bitSize` parameter (32 or 64) specifies the precision -- 64 for float64, 32 for float32 (result is still returned as float64). It handles scientific notation, `NaN`, and `Inf`.',
            code: `package main

import (
    "fmt"
    "strconv"
)

func main() {
    // Basic parsing
    f, err := strconv.ParseFloat("3.14159", 64)
    if err != nil {
        fmt.Println("Error:", err)
    }
    fmt.Printf("Parsed: %f\\n", f)

    // Scientific notation
    f2, _ := strconv.ParseFloat("6.022e23", 64)
    fmt.Printf("Scientific: %e\\n", f2)

    // Special values
    nan, _ := strconv.ParseFloat("NaN", 64)
    inf, _ := strconv.ParseFloat("Inf", 64)
    fmt.Printf("NaN: %f, Inf: %f\\n", nan, inf)

    // FormatFloat: float to string
    s := strconv.FormatFloat(3.14159, 'f', 2, 64)
    fmt.Println("Formatted:", s) // "3.14"

    // Format options: 'f' (decimal), 'e' (scientific), 'g' (compact)
    fmt.Println(strconv.FormatFloat(1234.5678, 'f', 2, 64)) // 1234.57
    fmt.Println(strconv.FormatFloat(1234.5678, 'e', 2, 64)) // 1.23e+03
    fmt.Println(strconv.FormatFloat(1234.5678, 'g', 6, 64)) // 1234.57
}`,
            output: `Parsed: 3.141590
Scientific: 6.022000e+23
NaN: NaN, Inf: +Inf
Formatted: 3.14
1234.57
1.23e+03
1234.57`,
            tip: 'Use `bitSize` 64 unless you specifically need float32 precision. The result is always float64 -- cast to float32 if needed: `float32(f)`.',
            analogy: 'Think of it like a calculator display: ParseFloat reads the text "3.14" off the screen and converts it into the actual number you can do math with. The bitSize is like choosing between a basic calculator (32-bit) and a scientific one (64-bit).',
            codeHighlightLines: [10, 26],
          },
        ],
        quiz: [
          {
            question: 'What type does strconv.ParseFloat always return (regardless of bitSize)?',
            options: ['float32', 'float64', 'interface{}', 'It depends on bitSize'],
            correctIndex: 1,
            explanation: 'ParseFloat always returns float64. The bitSize parameter only affects the precision of rounding. If you need float32, cast the result.',
          },
          {
            question: 'Which of these strings can strconv.ParseFloat successfully parse?',
            options: ['"three"', '"3,14"', '"6.022e23"', '"$3.14"'],
            correctIndex: 2,
            explanation: 'ParseFloat supports standard decimal notation and scientific notation (e.g., "6.022e23"). It also handles "NaN" and "Inf".',
          },
          {
            question: 'What does the second argument (bitSize) control in ParseFloat?',
            options: ['The return type', 'The precision of rounding', 'The maximum value allowed', 'The number of decimal places'],
            correctIndex: 1,
            explanation: 'bitSize controls the precision: 32 rounds to float32 precision, 64 to float64 precision. The return type is always float64.',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes a slice of price strings (e.g., "19.99", "invalid", "5.50") and returns the total of all valid prices formatted to 2 decimal places as a string.',
          starterCode: `package main

import (
    "fmt"
    "strconv"
)

func totalPrices(prices []string) string {
    // TODO: Parse each price string with ParseFloat,
    // sum the valid ones, return formatted total.
    return ""
}

func main() {
    result := totalPrices([]string{"19.99", "invalid", "5.50", "3.00"})
    fmt.Println(result) // "28.49"
}`,
          solutionCode: `package main

import (
    "fmt"
    "strconv"
)

func totalPrices(prices []string) string {
    var total float64
    for _, p := range prices {
        f, err := strconv.ParseFloat(p, 64)
        if err != nil {
            continue
        }
        total += f
    }
    return strconv.FormatFloat(total, 'f', 2, 64)
}

func main() {
    result := totalPrices([]string{"19.99", "invalid", "5.50", "3.00"})
    fmt.Println(result) // "28.49"
}`,
          hints: [
            'Use strconv.ParseFloat(p, 64) to parse each price string and skip invalid ones.',
            'Accumulate the valid floats into a total variable.',
            'Use strconv.FormatFloat(total, \'f\', 2, 64) to format the result to 2 decimal places.',
          ],
        },
      },
      {
        id: 'strconv-parseBool',
        title: 'strconv.ParseBool',
        difficulty: 'beginner',
        tags: ['strconv', 'bool', 'parse', 'true-false'],
        signature: 'func ParseBool(str string) (bool, error)',
        cheatSheetSummary:
          'Accepts "1", "t", "T", "TRUE", "true", "True" as true. "0", "f", "F", "FALSE", "false", "False" as false.',
        sections: [
          {
            heading: 'Parsing Booleans',
            content:
              '`strconv.ParseBool` converts a string to a boolean. It accepts various representations: "1", "t", "T", "TRUE", "true", "True" for true, and "0", "f", "F", "FALSE", "false", "False" for false. Any other string returns an error.',
            code: `package main

import (
    "fmt"
    "strconv"
)

func main() {
    // True values
    trueValues := []string{"1", "t", "T", "TRUE", "true", "True"}
    for _, s := range trueValues {
        b, _ := strconv.ParseBool(s)
        fmt.Printf("%5s -> %t\\n", s, b)
    }

    // False values
    falseValues := []string{"0", "f", "F", "FALSE", "false", "False"}
    for _, s := range falseValues {
        b, _ := strconv.ParseBool(s)
        fmt.Printf("%5s -> %t\\n", s, b)
    }

    // Invalid
    _, err := strconv.ParseBool("yes")
    fmt.Println("\\nError for 'yes':", err)

    // FormatBool
    fmt.Println(strconv.FormatBool(true))  // "true"
    fmt.Println(strconv.FormatBool(false)) // "false"

    // Practical: parse environment variable
    envVal := "true"
    debug, err := strconv.ParseBool(envVal)
    if err != nil {
        debug = false
    }
    fmt.Println("Debug mode:", debug)
}`,
            output: `    1 -> true
    t -> true
    T -> true
 TRUE -> true
 true -> true
 True -> true
    0 -> false
    f -> false
    F -> false
FALSE -> false
false -> false
False -> false

Error for 'yes': strconv.ParseBool: parsing "yes": invalid syntax
true
false
Debug mode: true`,
            note: '`ParseBool` does NOT accept "yes", "no", "on", "off", or "y", "n". Only the specific values listed are valid.',
            analogy: 'Think of it like a very strict true/false bouncer at a door: it recognizes exactly 6 ways to say "true" and 6 ways to say "false", and turns away everyone else (like "yes" or "on") with an error.',
            codeHighlightLines: [10, 12, 17, 19, 24],
          },
        ],
        quiz: [
          {
            question: 'Which of these strings does strconv.ParseBool accept as true?',
            options: ['"yes"', '"on"', '"T"', '"y"'],
            correctIndex: 2,
            explanation: 'ParseBool accepts "1", "t", "T", "TRUE", "true", "True" as true. It does NOT accept "yes", "on", or "y".',
          },
          {
            question: 'What does strconv.ParseBool("yes") return?',
            options: ['true, nil', 'false, nil', 'false, error', 'true, error'],
            correctIndex: 2,
            explanation: 'ParseBool does not recognize "yes" as a valid boolean string. It returns false and an error.',
          },
          {
            question: 'How many distinct string values does ParseBool accept in total?',
            options: ['2', '6', '10', '12'],
            correctIndex: 3,
            explanation: 'ParseBool accepts 6 true values ("1", "t", "T", "TRUE", "true", "True") and 6 false values ("0", "f", "F", "FALSE", "false", "False"), totaling 12.',
          },
        ],
        challenge: {
          prompt: 'Write a function that parses a configuration map of string key-value pairs, converting values that are valid booleans (via strconv.ParseBool) to "enabled"/"disabled", and leaving invalid values as "unknown".',
          starterCode: `package main

import (
    "fmt"
    "strconv"
)

func parseConfig(config map[string]string) map[string]string {
    // TODO: For each key-value pair, try ParseBool.
    // If valid true -> "enabled", valid false -> "disabled", otherwise -> "unknown"
    result := make(map[string]string)
    return result
}

func main() {
    cfg := map[string]string{
        "debug":   "true",
        "verbose": "0",
        "mode":    "yes",
        "cache":   "T",
    }
    parsed := parseConfig(cfg)
    for k, v := range parsed {
        fmt.Printf("%s: %s\\n", k, v)
    }
}`,
          solutionCode: `package main

import (
    "fmt"
    "strconv"
)

func parseConfig(config map[string]string) map[string]string {
    result := make(map[string]string)
    for k, v := range config {
        b, err := strconv.ParseBool(v)
        if err != nil {
            result[k] = "unknown"
        } else if b {
            result[k] = "enabled"
        } else {
            result[k] = "disabled"
        }
    }
    return result
}

func main() {
    cfg := map[string]string{
        "debug":   "true",
        "verbose": "0",
        "mode":    "yes",
        "cache":   "T",
    }
    parsed := parseConfig(cfg)
    for k, v := range parsed {
        fmt.Printf("%s: %s\\n", k, v)
    }
}`,
          hints: [
            'Use strconv.ParseBool on each value and check the error to determine validity.',
            'If err != nil, the value is not a recognized boolean -- map it to "unknown".',
            'If the parsed bool is true, map to "enabled"; if false, map to "disabled".',
          ],
        },
      },
      {
        id: 'strconv-formatInt',
        title: 'strconv.FormatInt',
        difficulty: 'beginner',
        tags: ['strconv', 'format', 'base', 'binary', 'hex'],
        signature: 'func FormatInt(i int64, base int) string',
        cheatSheetSummary:
          'Converts int64 to string in given base (2-36). Base 2=binary, 8=octal, 10=decimal, 16=hex.',
        sections: [
          {
            heading: 'Formatting Integers in Different Bases',
            content:
              '`strconv.FormatInt` converts an int64 to a string in the specified base (2 to 36). `strconv.ParseInt` does the reverse. These are essential for working with binary data, hex values, and other base representations.',
            code: `package main

import (
    "fmt"
    "strconv"
)

func main() {
    n := int64(255)

    // Format in different bases
    fmt.Println("Decimal:", strconv.FormatInt(n, 10))  // 255
    fmt.Println("Binary:", strconv.FormatInt(n, 2))    // 11111111
    fmt.Println("Octal:", strconv.FormatInt(n, 8))     // 377
    fmt.Println("Hex:", strconv.FormatInt(n, 16))      // ff
    fmt.Println("Base36:", strconv.FormatInt(n, 36))   // 73

    // ParseInt: string in base to int64
    val, _ := strconv.ParseInt("ff", 16, 64)
    fmt.Println("\\nParsed hex ff:", val) // 255

    binVal, _ := strconv.ParseInt("11111111", 2, 64)
    fmt.Println("Parsed binary:", binVal) // 255

    // Auto-detect base with prefix (base 0)
    auto1, _ := strconv.ParseInt("0xFF", 0, 64)  // hex
    auto2, _ := strconv.ParseInt("0o377", 0, 64) // octal
    auto3, _ := strconv.ParseInt("0b11111111", 0, 64) // binary
    fmt.Println("Auto-detect:", auto1, auto2, auto3)

    // FormatUint for unsigned integers
    fmt.Println("Unsigned:", strconv.FormatUint(uint64(n), 16))
}`,
            output: `Decimal: 255
Binary: 11111111
Octal: 377
Hex: ff
Base36: 73

Parsed hex ff: 255
Parsed binary: 255
Auto-detect: 255 255 255
Unsigned: ff`,
            tip: 'Use `base=0` in `ParseInt` for auto-detection: strings starting with "0x" are hex, "0o" are octal, "0b" are binary, otherwise decimal.',
            analogy: 'Think of it like translating a number into different languages: FormatInt expresses the same value (255) in decimal (255), binary (11111111), hex (ff), or any base up to 36.',
            codeHighlightLines: [12, 13, 14, 15, 19, 25, 26, 27],
            diagram: {
              kind: 'custom' as const,
              type: 'hash-map',
              data: {
                title: 'The number 255 in different bases',
                entries: [
                  { key: 'Base 2 (binary)', value: '11111111' },
                  { key: 'Base 8 (octal)', value: '377' },
                  { key: 'Base 10 (decimal)', value: '255' },
                  { key: 'Base 16 (hex)', value: 'ff' },
                  { key: 'Base 36', value: '73' },
                ],
              },
              caption: 'Same integer value represented in different numeral systems',
            },
          },
        ],
        quiz: [
          {
            question: 'What does strconv.FormatInt(255, 16) return?',
            options: ['"255"', '"FF"', '"ff"', '"0xff"'],
            correctIndex: 2,
            explanation: 'FormatInt returns lowercase hex digits, so FormatInt(255, 16) returns "ff" (without the "0x" prefix).',
          },
          {
            question: 'What does base=0 mean in strconv.ParseInt?',
            options: ['Parse as base 0 (always returns 0)', 'Auto-detect base from prefix (0x, 0o, 0b)', 'Use decimal (base 10)', 'It causes an error'],
            correctIndex: 1,
            explanation: 'Base 0 enables auto-detection: "0x" prefix means hex, "0o" means octal, "0b" means binary, otherwise decimal.',
          },
          {
            question: 'What is the valid range for the base parameter in FormatInt?',
            options: ['2 to 10', '2 to 16', '2 to 36', '0 to 36'],
            correctIndex: 2,
            explanation: 'FormatInt supports bases from 2 to 36. Digits beyond 9 use lowercase letters a-z.',
          },
          {
            question: 'How would you parse the binary string "11111111" back to an integer?',
            options: ['strconv.Atoi("11111111")', 'strconv.ParseInt("11111111", 2, 64)', 'strconv.ParseInt("11111111", 10, 64)', 'strconv.FormatInt("11111111", 2)'],
            correctIndex: 1,
            explanation: 'ParseInt with base 2 interprets the string as a binary number. "11111111" in base 2 is 255.',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes an integer and returns a formatted string showing its representation in decimal, binary, octal, and hex (e.g., "dec:255 bin:11111111 oct:377 hex:ff").',
          starterCode: `package main

import (
    "fmt"
    "strconv"
)

func formatAllBases(n int64) string {
    // TODO: Use strconv.FormatInt to build a string showing
    // the number in decimal, binary, octal, and hex.
    return ""
}

func main() {
    fmt.Println(formatAllBases(255))
    // Output: dec:255 bin:11111111 oct:377 hex:ff
    fmt.Println(formatAllBases(42))
    // Output: dec:42 bin:101010 oct:52 hex:2a
}`,
          solutionCode: `package main

import (
    "fmt"
    "strconv"
)

func formatAllBases(n int64) string {
    return "dec:" + strconv.FormatInt(n, 10) +
        " bin:" + strconv.FormatInt(n, 2) +
        " oct:" + strconv.FormatInt(n, 8) +
        " hex:" + strconv.FormatInt(n, 16)
}

func main() {
    fmt.Println(formatAllBases(255))
    // Output: dec:255 bin:11111111 oct:377 hex:ff
    fmt.Println(formatAllBases(42))
    // Output: dec:42 bin:101010 oct:52 hex:2a
}`,
          hints: [
            'Use strconv.FormatInt(n, base) with bases 10, 2, 8, and 16.',
            'Concatenate the results with labels like "dec:", "bin:", "oct:", "hex:".',
            'FormatInt returns lowercase letters for hex digits (a-f).',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Standard Library: sort                                       */
  /* ------------------------------------------------------------ */
  {
    id: 'stdlib-sort',
    label: 'Standard Library: sort',
    icon: 'ArrowUpDown',
    entries: [
      {
        id: 'sort-ints',
        title: 'sort.Ints',
        difficulty: 'beginner',
        tags: ['sort', 'ints', 'ascending', 'in-place'],
        signature: 'func Ints(x []int)',
        cheatSheetSummary:
          'Sorts []int in ascending order, in place. Use `sort.Sort(sort.Reverse(sort.IntSlice(x)))` for descending.',
        sections: [
          {
            heading: 'Sorting Integers',
            content:
              '`sort.Ints` sorts a slice of integers in ascending order, in place. For descending order, use `sort.Sort(sort.Reverse(...))`. Since Go 1.21, the `slices` package provides generic `Sort` and `SortFunc`.',
            code: `package main

import (
    "fmt"
    "sort"
)

func main() {
    // Ascending sort
    nums := []int{5, 3, 1, 4, 2, 8, 6, 7}
    sort.Ints(nums)
    fmt.Println("Ascending:", nums)

    // Check if sorted
    fmt.Println("Sorted:", sort.IntsAreSorted(nums))

    // Descending sort
    sort.Sort(sort.Reverse(sort.IntSlice(nums)))
    fmt.Println("Descending:", nums)

    // sort.Slice (more flexible)
    data := []int{9, 1, 5, 3, 7}
    sort.Slice(data, func(i, j int) bool {
        return data[i] < data[j] // ascending
    })
    fmt.Println("Slice sort:", data)
}`,
            output: `Ascending: [1 2 3 4 5 6 7 8]
Sorted: true
Descending: [8 7 6 5 4 3 2 1]
Slice sort: [1 3 5 7 9]`,
            tip: 'Sort is in-place and not stable by default. Use `sort.Stable` or `slices.SortStableFunc` when you need to preserve the relative order of equal elements.',
            analogy: 'Think of it like shuffling a deck of numbered cards into order on a table: sort.Ints rearranges the slice items where they stand (in-place), without making a copy.',
            codeHighlightLines: [11, 18, 23, 24],
            diagram: {
              kind: 'custom' as const,
              type: 'array',
              data: {
                title: 'In-place sort transformation',
                before: [5, 3, 1, 4, 2, 8, 6, 7],
                after: [1, 2, 3, 4, 5, 6, 7, 8],
                label: 'sort.Ints()',
              },
              caption: 'sort.Ints rearranges the slice elements in ascending order',
            },
          },
        ],
        quiz: [
          {
            question: 'How does sort.Ints sort a slice?',
            options: ['Returns a new sorted slice', 'Sorts in-place in ascending order', 'Sorts in-place in descending order', 'Sorts and removes duplicates'],
            correctIndex: 1,
            explanation: 'sort.Ints sorts the slice in-place in ascending order. It modifies the original slice and does not return a new one.',
          },
          {
            question: 'How do you sort a slice of ints in descending order?',
            options: ['sort.Ints(nums, "desc")', 'sort.IntsReverse(nums)', 'sort.Sort(sort.Reverse(sort.IntSlice(nums)))', 'sort.Ints(-nums)'],
            correctIndex: 2,
            explanation: 'Use sort.Sort with sort.Reverse wrapping sort.IntSlice to sort integers in descending order.',
          },
          {
            question: 'Is sort.Ints a stable sort by default?',
            options: ['Yes, always stable', 'No, not stable by default', 'Only stable for small slices', 'Stability depends on the data'],
            correctIndex: 1,
            explanation: 'sort.Ints is not stable by default. Use sort.Stable or slices.SortStableFunc when you need to preserve the relative order of equal elements.',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes a slice of integers and returns a new slice with only the unique values, sorted in ascending order.',
          starterCode: `package main

import (
    "fmt"
    "sort"
)

func uniqueSorted(nums []int) []int {
    // TODO: Remove duplicates and return sorted unique values
    return nil
}

func main() {
    fmt.Println(uniqueSorted([]int{5, 3, 1, 3, 5, 2, 1})) // [1 2 3 5]
    fmt.Println(uniqueSorted([]int{9, 9, 9}))               // [9]
    fmt.Println(uniqueSorted([]int{}))                       // []
}`,
          solutionCode: `package main

import (
    "fmt"
    "sort"
)

func uniqueSorted(nums []int) []int {
    seen := make(map[int]bool)
    var result []int
    for _, n := range nums {
        if !seen[n] {
            seen[n] = true
            result = append(result, n)
        }
    }
    sort.Ints(result)
    return result
}

func main() {
    fmt.Println(uniqueSorted([]int{5, 3, 1, 3, 5, 2, 1})) // [1 2 3 5]
    fmt.Println(uniqueSorted([]int{9, 9, 9}))               // [9]
    fmt.Println(uniqueSorted([]int{}))                       // []
}`,
          hints: [
            'Use a map[int]bool to track which numbers you have already seen.',
            'Append only unseen numbers to a result slice.',
            'After collecting unique values, use sort.Ints to sort the result slice.',
          ],
        },
      },
      {
        id: 'sort-strings',
        title: 'sort.Strings',
        difficulty: 'beginner',
        tags: ['sort', 'strings', 'alphabetical', 'lexicographic'],
        signature: 'func Strings(x []string)',
        cheatSheetSummary:
          'Sorts []string in lexicographic (alphabetical) order, in place. Case-sensitive (uppercase before lowercase).',
        sections: [
          {
            heading: 'Sorting Strings',
            content:
              '`sort.Strings` sorts a slice of strings in lexicographic order (alphabetical for ASCII). The sort is case-sensitive: uppercase letters come before lowercase. For case-insensitive sort, use `sort.Slice` with a custom comparator.',
            code: `package main

import (
    "fmt"
    "sort"
    "strings"
)

func main() {
    // Basic string sort (lexicographic)
    words := []string{"banana", "apple", "cherry", "date"}
    sort.Strings(words)
    fmt.Println("Sorted:", words)

    // Case-sensitive: uppercase < lowercase
    mixed := []string{"banana", "Apple", "cherry", "Avocado"}
    sort.Strings(mixed)
    fmt.Println("Case-sensitive:", mixed)

    // Case-insensitive sort
    sort.Slice(mixed, func(i, j int) bool {
        return strings.ToLower(mixed[i]) < strings.ToLower(mixed[j])
    })
    fmt.Println("Case-insensitive:", mixed)

    // Check if sorted
    fmt.Println("Is sorted:", sort.StringsAreSorted(mixed))
}`,
            output: `Sorted: [apple banana cherry date]
Case-sensitive: [Apple Avocado banana cherry]
Case-insensitive: [Apple Avocado banana cherry]
Is sorted: true`,
            note: 'In Unicode/ASCII ordering, all uppercase letters (A-Z) come before all lowercase letters (a-z). "Zebra" sorts before "apple".',
            analogy: 'Think of it like alphabetizing books on a shelf: sort.Strings arranges them left-to-right by name. But beware -- it treats uppercase and lowercase as different shelves, with uppercase always filed first.',
          },
        ],
        quiz: [
          {
            question: 'In sort.Strings, how does "Zebra" compare to "apple"?',
            options: ['"apple" comes first', '"Zebra" comes first', 'They are equal', 'It depends on locale'],
            correctIndex: 1,
            explanation: 'sort.Strings uses lexicographic ordering where all uppercase letters (A-Z) come before lowercase (a-z), so "Zebra" sorts before "apple".',
          },
          {
            question: 'How can you achieve a case-insensitive string sort?',
            options: ['sort.Strings with a flag', 'sort.StringsInsensitive', 'sort.Slice with strings.ToLower comparator', 'sort.Strings automatically ignores case'],
            correctIndex: 2,
            explanation: 'Use sort.Slice with a custom comparator that compares strings.ToLower(a) < strings.ToLower(b) for case-insensitive sorting.',
          },
          {
            question: 'Which function checks if a string slice is already sorted?',
            options: ['sort.IsSorted(s)', 'sort.StringsSorted(s)', 'sort.StringsAreSorted(s)', 'sort.Check(s)'],
            correctIndex: 2,
            explanation: 'sort.StringsAreSorted returns true if the string slice is sorted in ascending lexicographic order.',
          },
        ],
        challenge: {
          prompt: 'Write a function that sorts a slice of strings case-insensitively and returns it. For example, ["banana", "Apple", "cherry", "avocado"] should become ["Apple", "avocado", "banana", "cherry"].',
          starterCode: `package main

import (
    "fmt"
    "sort"
    "strings"
)

func sortCaseInsensitive(words []string) []string {
    // TODO: Sort the slice case-insensitively using sort.Slice
    return words
}

func main() {
    words := []string{"banana", "Apple", "cherry", "avocado"}
    sorted := sortCaseInsensitive(words)
    fmt.Println(sorted) // [Apple avocado banana cherry]
}`,
          solutionCode: `package main

import (
    "fmt"
    "sort"
    "strings"
)

func sortCaseInsensitive(words []string) []string {
    sort.Slice(words, func(i, j int) bool {
        return strings.ToLower(words[i]) < strings.ToLower(words[j])
    })
    return words
}

func main() {
    words := []string{"banana", "Apple", "cherry", "avocado"}
    sorted := sortCaseInsensitive(words)
    fmt.Println(sorted) // [Apple avocado banana cherry]
}`,
          hints: [
            'Use sort.Slice with a custom less function instead of sort.Strings.',
            'In the comparator, convert both elements to lowercase with strings.ToLower before comparing.',
            'The sort is in-place, so you can return the same slice.',
          ],
        },
      },
      {
        id: 'sort-slice',
        title: 'sort.Slice',
        difficulty: 'beginner',
        tags: ['sort', 'custom', 'comparator', 'struct-sort'],
        signature: 'func Slice(x any, less func(i, j int) bool)',
        cheatSheetSummary:
          'Sorts any slice with a custom comparator function. `less(i, j)` returns true if element i should come before j.',
        sections: [
          {
            heading: 'Custom Sorting with sort.Slice',
            content:
              '`sort.Slice` sorts any slice using a custom comparator. The `less` function takes indices and returns true if the element at `i` should come before the element at `j`. This is the most versatile sorting function in Go.',
            code: `package main

import (
    "fmt"
    "sort"
)

type Person struct {
    Name string
    Age  int
}

func main() {
    people := []Person{
        {"Charlie", 30},
        {"Alice", 25},
        {"Bob", 30},
        {"Diana", 22},
    }

    // Sort by age ascending
    sort.Slice(people, func(i, j int) bool {
        return people[i].Age < people[j].Age
    })
    fmt.Println("By age:", people)

    // Sort by name
    sort.Slice(people, func(i, j int) bool {
        return people[i].Name < people[j].Name
    })
    fmt.Println("By name:", people)

    // Multi-field sort: by age, then name
    sort.Slice(people, func(i, j int) bool {
        if people[i].Age != people[j].Age {
            return people[i].Age < people[j].Age
        }
        return people[i].Name < people[j].Name
    })
    fmt.Println("By age+name:", people)

    // Stable sort preserves order of equal elements
    sort.SliceStable(people, func(i, j int) bool {
        return people[i].Age < people[j].Age
    })
    fmt.Println("Stable:", people)
}`,
            output: `By age: [{Diana 22} {Alice 25} {Charlie 30} {Bob 30}]
By name: [{Alice 25} {Bob 30} {Charlie 30} {Diana 22}]
By age+name: [{Diana 22} {Alice 25} {Bob 30} {Charlie 30}]
Stable: [{Diana 22} {Alice 25} {Bob 30} {Charlie 30}]`,
            tip: 'For multi-field sorting, compare the primary field first. Only compare the secondary field when the primary fields are equal.',
            codeHighlightLines: [22, 23, 34, 35, 36, 37, 38],
          },
          {
            heading: 'Sorting Maps by Value',
            content:
              'Maps cannot be sorted directly. Extract keys into a slice, sort the slice, then iterate in sorted order. This is the standard pattern for ordered map output.',
            code: `package main

import (
    "fmt"
    "sort"
)

func main() {
    scores := map[string]int{
        "Alice":   95,
        "Bob":     87,
        "Charlie": 92,
        "Diana":   98,
        "Eve":     87,
    }

    // Sort by value (descending), then by key
    type KV struct {
        Key   string
        Value int
    }

    var sorted []KV
    for k, v := range scores {
        sorted = append(sorted, KV{k, v})
    }

    sort.Slice(sorted, func(i, j int) bool {
        if sorted[i].Value != sorted[j].Value {
            return sorted[i].Value > sorted[j].Value // desc by value
        }
        return sorted[i].Key < sorted[j].Key // asc by key
    })

    fmt.Println("Leaderboard:")
    for rank, kv := range sorted {
        fmt.Printf("  %d. %s: %d\\n", rank+1, kv.Key, kv.Value)
    }
}`,
            output: `Leaderboard:
  1. Diana: 98
  2. Alice: 95
  3. Charlie: 92
  4. Bob: 87
  5. Eve: 87`,
            note: 'This pattern (extract to slice, sort, iterate) is the standard way to get ordered output from a map in Go.',
            analogy: 'Think of it like sorting playing cards that were scattered on a table: you first gather them into your hand (extract to slice), arrange them by suit and number (sort), then lay them out in order (iterate).',
            codeHighlightLines: [23, 24, 25, 28, 29, 30, 31],
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart TD
    A["map[string]int"] -->|"Extract to slice"| B["[]KV pairs"]
    B -->|"sort.Slice()"| C["Sorted []KV"]
    C -->|"range loop"| D["Ordered output"]`,
              caption: 'Standard pattern for sorting a map: extract, sort, iterate',
            },
          },
        ],
        quiz: [
          {
            question: 'What does the less function in sort.Slice return?',
            options: ['true if elements are equal', 'true if element i should come after j', 'true if element i should come before j', 'The comparison result as an int'],
            correctIndex: 2,
            explanation: 'The less function returns true if the element at index i should come before the element at index j in the sorted output.',
          },
          {
            question: 'How do you implement multi-field sorting (e.g., by age then name)?',
            options: ['Call sort.Slice twice', 'Compare primary field first, then secondary when primary fields are equal', 'Use sort.MultiSlice', 'Pass multiple less functions'],
            correctIndex: 1,
            explanation: 'In the less function, compare the primary field first. If the primary fields are equal, compare the secondary field.',
          },
          {
            question: 'What is the difference between sort.Slice and sort.SliceStable?',
            options: ['SliceStable is faster', 'SliceStable preserves relative order of equal elements', 'SliceStable sorts in descending order', 'There is no difference'],
            correctIndex: 1,
            explanation: 'sort.SliceStable is a stable sort that preserves the original relative order of elements that compare as equal. sort.Slice does not guarantee this.',
          },
          {
            question: 'Can you sort a map directly with sort.Slice?',
            options: ['Yes, pass the map directly', 'No, extract to a slice first', 'Yes, but only by keys', 'Yes, using sort.Map'],
            correctIndex: 1,
            explanation: 'Maps cannot be sorted directly. You must extract key-value pairs into a slice, sort the slice, then iterate in sorted order.',
          },
        ],
        challenge: {
          prompt: 'Write a function that sorts a slice of Person structs by age descending, and for people with the same age, by name ascending.',
          starterCode: `package main

import (
    "fmt"
    "sort"
)

type Person struct {
    Name string
    Age  int
}

func sortPeople(people []Person) {
    // TODO: Sort by age descending, then name ascending for equal ages
}

func main() {
    people := []Person{
        {"Charlie", 30},
        {"Alice", 25},
        {"Bob", 30},
        {"Diana", 22},
        {"Eve", 25},
    }
    sortPeople(people)
    for _, p := range people {
        fmt.Printf("%s (%d)\\n", p.Name, p.Age)
    }
    // Expected:
    // Bob (30)
    // Charlie (30)
    // Alice (25)
    // Eve (25)
    // Diana (22)
}`,
          solutionCode: `package main

import (
    "fmt"
    "sort"
)

type Person struct {
    Name string
    Age  int
}

func sortPeople(people []Person) {
    sort.Slice(people, func(i, j int) bool {
        if people[i].Age != people[j].Age {
            return people[i].Age > people[j].Age // descending by age
        }
        return people[i].Name < people[j].Name // ascending by name
    })
}

func main() {
    people := []Person{
        {"Charlie", 30},
        {"Alice", 25},
        {"Bob", 30},
        {"Diana", 22},
        {"Eve", 25},
    }
    sortPeople(people)
    for _, p := range people {
        fmt.Printf("%s (%d)\\n", p.Name, p.Age)
    }
}`,
          hints: [
            'Use sort.Slice with a custom less function that compares ages first.',
            'For descending age, return people[i].Age > people[j].Age.',
            'When ages are equal, compare names with people[i].Name < people[j].Name for ascending order.',
          ],
        },
      },
      {
        id: 'sort-search',
        title: 'sort.Search',
        difficulty: 'intermediate',
        tags: ['sort', 'search', 'binary-search', 'lower-bound'],
        signature: 'func Search(n int, f func(int) bool) int',
        cheatSheetSummary:
          'Binary search: finds smallest index i in [0,n) where f(i) is true. Data must be sorted. `SearchInts` for int slices.',
        sections: [
          {
            heading: 'Binary Search with sort.Search',
            content:
              '`sort.Search` uses binary search to find the smallest index i in [0, n) for which f(i) is true. The slice must be sorted. If no index satisfies f, it returns n. `SearchInts` and `SearchStrings` are convenience wrappers.',
            code: `package main

import (
    "fmt"
    "sort"
)

func main() {
    nums := []int{1, 3, 5, 7, 9, 11, 13, 15}

    // SearchInts: find index of value
    idx := sort.SearchInts(nums, 7)
    fmt.Printf("Index of 7: %d (value: %d)\\n", idx, nums[idx])

    // Value not present: returns insertion point
    idx = sort.SearchInts(nums, 6)
    fmt.Printf("Insert point for 6: %d\\n", idx) // 3

    // General Search: find first >= target
    target := 10
    pos := sort.Search(len(nums), func(i int) bool {
        return nums[i] >= target
    })
    if pos < len(nums) {
        fmt.Printf("First >= %d: nums[%d] = %d\\n", target, pos, nums[pos])
    }

    // Check if value exists
    val := 7
    idx = sort.SearchInts(nums, val)
    exists := idx < len(nums) && nums[idx] == val
    fmt.Printf("%d exists: %t\\n", val, exists)

    val = 6
    idx = sort.SearchInts(nums, val)
    exists = idx < len(nums) && nums[idx] == val
    fmt.Printf("%d exists: %t\\n", val, exists)
}`,
            output: `Index of 7: 3 (value: 7)
Insert point for 6: 3
First >= 10: nums[4] = 11
7 exists: true
6 exists: false`,
            tip: '`sort.Search` returns the insertion point, not whether the value exists. Always verify `nums[idx] == target` after searching.',
            analogy: 'Think of it like looking up a word in a dictionary: instead of reading every page, you jump to the middle, check if the word would be before or after, and keep halving the search range until you find the right spot.',
            codeHighlightLines: [12, 21, 22, 30, 31],
            diagram: {
              kind: 'custom' as const,
              type: 'algorithm-steps',
              data: {
                title: 'Binary search for 7 in [1, 3, 5, 7, 9, 11, 13, 15]',
                steps: [
                  { label: 'Step 1', description: 'Check mid=4 (value 9): 9 >= 7, search left half' },
                  { label: 'Step 2', description: 'Check mid=2 (value 5): 5 < 7, search right half' },
                  { label: 'Step 3', description: 'Check mid=3 (value 7): 7 >= 7, found at index 3' },
                ],
              },
              caption: 'Binary search narrows down to the answer in O(log n) steps',
            },
          },
        ],
        quiz: [
          {
            question: 'What does sort.SearchInts return when the value is NOT in the slice?',
            options: ['-1', 'The length of the slice', 'The insertion point where the value would be', 'An error'],
            correctIndex: 2,
            explanation: 'SearchInts returns the index at which the value would be inserted to keep the slice sorted. You must check if the value at that index matches to confirm existence.',
          },
          {
            question: 'What is the time complexity of sort.Search?',
            options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(1)'],
            correctIndex: 2,
            explanation: 'sort.Search uses binary search, which has O(log n) time complexity.',
          },
          {
            question: 'What must be true about the data before using sort.Search?',
            options: ['It must contain no duplicates', 'It must be sorted', 'It must be a slice of ints', 'It must have at least 2 elements'],
            correctIndex: 1,
            explanation: 'sort.Search requires the data to be sorted so that the binary search invariant holds: all false values come before all true values.',
          },
          {
            question: 'How do you check if a value exists in a sorted slice using SearchInts?',
            options: ['Check if the return value is >= 0', 'Check if return value < len(slice) AND slice[idx] == value', 'Check if the return value equals the value', 'SearchInts returns a bool'],
            correctIndex: 1,
            explanation: 'SearchInts returns the insertion point. To verify existence, check that the index is in bounds AND the element at that index equals the target value.',
          },
        ],
        challenge: {
          prompt: 'Write a function that uses sort.SearchInts to find the position to insert a value into a sorted slice, then inserts it while maintaining sorted order. Return the new slice.',
          starterCode: `package main

import (
    "fmt"
    "sort"
)

func insertSorted(nums []int, val int) []int {
    // TODO: Find the insertion point using sort.SearchInts,
    // then insert val at that position.
    return nil
}

func main() {
    nums := []int{1, 3, 5, 7, 9}
    nums = insertSorted(nums, 6)
    fmt.Println(nums) // [1 3 5 6 7 9]
    nums = insertSorted(nums, 0)
    fmt.Println(nums) // [0 1 3 5 6 7 9]
    nums = insertSorted(nums, 10)
    fmt.Println(nums) // [0 1 3 5 6 7 9 10]
}`,
          solutionCode: `package main

import (
    "fmt"
    "sort"
)

func insertSorted(nums []int, val int) []int {
    idx := sort.SearchInts(nums, val)
    // Make room by appending a zero, then shifting elements right
    nums = append(nums, 0)
    copy(nums[idx+1:], nums[idx:])
    nums[idx] = val
    return nums
}

func main() {
    nums := []int{1, 3, 5, 7, 9}
    nums = insertSorted(nums, 6)
    fmt.Println(nums) // [1 3 5 6 7 9]
    nums = insertSorted(nums, 0)
    fmt.Println(nums) // [0 1 3 5 6 7 9]
    nums = insertSorted(nums, 10)
    fmt.Println(nums) // [0 1 3 5 6 7 9 10]
}`,
          hints: [
            'Use sort.SearchInts(nums, val) to find the correct insertion index.',
            'To insert at a position: append a zero to grow the slice, use copy to shift elements right, then set the value.',
            'The pattern is: append, copy(nums[idx+1:], nums[idx:]), nums[idx] = val.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Standard Library: os/io                                      */
  /* ------------------------------------------------------------ */
  {
    id: 'stdlib-os-io',
    label: 'Standard Library: os/io',
    icon: 'FileText',
    entries: [
      {
        id: 'os-open',
        title: 'os.Open / os.Create',
        difficulty: 'intermediate',
        tags: ['os', 'file', 'open', 'create', 'close'],
        signature: 'func Open(name string) (*File, error)',
        cheatSheetSummary:
          '`os.Open` for reading (read-only). `os.Create` for writing (creates/truncates). Always `defer f.Close()`.',
        sections: [
          {
            heading: 'Opening and Creating Files',
            content:
              '`os.Open` opens a file for reading only. `os.Create` creates a file (or truncates an existing one) for writing. `os.OpenFile` gives full control over flags and permissions. Always defer `Close()` immediately after opening.',
            code: `package main

import (
    "fmt"
    "io"
    "os"
)

func main() {
    // Create a temporary file for demo
    f, err := os.Create("example.txt")
    if err != nil {
        fmt.Println("Create error:", err)
        return
    }
    defer f.Close()

    // Write to file
    f.WriteString("Hello, Go!\\n")
    f.WriteString("File operations are simple.\\n")
    f.Close() // close before reading

    // Open for reading
    f2, err := os.Open("example.txt")
    if err != nil {
        fmt.Println("Open error:", err)
        return
    }
    defer f2.Close()

    // Read contents
    data, _ := io.ReadAll(f2)
    fmt.Print(string(data))

    // OpenFile: full control
    f3, _ := os.OpenFile("example.txt",
        os.O_APPEND|os.O_WRONLY, 0644)
    defer f3.Close()
    f3.WriteString("Appended line.\\n")

    // Clean up
    os.Remove("example.txt")
    fmt.Println("File removed")
}`,
            output: `Hello, Go!
File operations are simple.
File removed`,
            tip: 'Always check the error from `os.Open` or `os.Create` before using the file. A common mistake is deferring Close on a nil file, which panics.',
            analogy: 'Think of it like opening and closing a book: os.Open opens a book for reading only, os.Create gives you a fresh blank notebook, and os.OpenFile lets you specify exactly what you want to do (read, write, append).',
            codeHighlightLines: [11, 16, 24, 29, 36, 37],
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart TD
    A["os.Open()"] -->|"read-only"| B["*os.File"]
    C["os.Create()"] -->|"write, create/truncate"| B
    D["os.OpenFile()"] -->|"custom flags + perms"| B
    B -->|"always"| E["defer f.Close()"]`,
              caption: 'Three ways to get an *os.File handle, all requiring Close()',
            },
          },
          {
            heading: 'File Information and Permissions',
            content:
              '`os.Stat` returns file information without opening the file. Check file existence, size, modification time, and permissions. Use `os.IsNotExist` to check if a file does not exist.',
            code: `package main

import (
    "fmt"
    "os"
)

func main() {
    // Create a file for demo
    os.WriteFile("test.txt", []byte("hello"), 0644)
    defer os.Remove("test.txt")

    // Get file info
    info, err := os.Stat("test.txt")
    if err != nil {
        if os.IsNotExist(err) {
            fmt.Println("File does not exist")
        }
        return
    }

    fmt.Println("Name:", info.Name())
    fmt.Println("Size:", info.Size(), "bytes")
    fmt.Println("Mode:", info.Mode())
    fmt.Println("ModTime:", info.ModTime().Format("2006-01-02 15:04:05"))
    fmt.Println("IsDir:", info.IsDir())

    // Check existence
    if _, err := os.Stat("nonexistent.txt"); os.IsNotExist(err) {
        fmt.Println("\\nnonexistent.txt does not exist")
    }
}`,
            output: `Name: test.txt
Size: 5 bytes
Mode: -rw-r--r--
ModTime: 2024-01-15 10:30:00
IsDir: false

nonexistent.txt does not exist`,
            note: 'File permission mode `0644` means read-write for owner, read-only for group and others. Use `0755` for executable files and directories.',
          },
        ],
        quiz: [
          {
            question: 'What is the difference between os.Open and os.Create?',
            options: ['os.Open is for writing, os.Create is for reading', 'os.Open is read-only, os.Create is for writing (creates/truncates)', 'They are identical', 'os.Create opens an existing file, os.Open creates a new one'],
            correctIndex: 1,
            explanation: 'os.Open opens a file for reading only. os.Create creates a new file (or truncates existing) for writing.',
          },
          {
            question: 'What should you always do immediately after successfully opening a file?',
            options: ['Read the file', 'Check the file size', 'defer f.Close()', 'Write to the file'],
            correctIndex: 2,
            explanation: 'Always defer f.Close() immediately after opening a file to ensure the file handle is released, even if an error occurs later.',
          },
          {
            question: 'How do you open a file for appending without truncating existing content?',
            options: ['os.Open with "append" flag', 'os.Create with os.O_APPEND', 'os.OpenFile with os.O_APPEND|os.O_WRONLY', 'os.Append(filename)'],
            correctIndex: 2,
            explanation: 'Use os.OpenFile with the os.O_APPEND|os.O_WRONLY flags to open a file for appending without truncating.',
          },
          {
            question: 'How do you check if a file exists using os.Stat?',
            options: ['os.Stat returns a bool', 'Check if os.IsNotExist(err) after os.Stat', 'os.Stat panics if file does not exist', 'Use os.Exists(path)'],
            correctIndex: 1,
            explanation: 'Call os.Stat and check the error with os.IsNotExist(err). If it returns true, the file does not exist.',
          },
        ],
        challenge: {
          prompt: 'Write a function that checks if a file exists, and if it does, reads and prints its content. If it does not exist, create the file with a default message and print that message instead.',
          starterCode: `package main

import (
    "fmt"
    "os"
)

func readOrCreate(filename, defaultContent string) (string, error) {
    // TODO: Check if file exists using os.Stat.
    // If it exists, read and return content.
    // If not, create it with defaultContent and return defaultContent.
    return "", nil
}

func main() {
    content, err := readOrCreate("greeting.txt", "Hello, World!")
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println(content)
    os.Remove("greeting.txt") // cleanup
}`,
          solutionCode: `package main

import (
    "fmt"
    "os"
)

func readOrCreate(filename, defaultContent string) (string, error) {
    if _, err := os.Stat(filename); os.IsNotExist(err) {
        // File does not exist, create it
        err := os.WriteFile(filename, []byte(defaultContent), 0644)
        if err != nil {
            return "", err
        }
        return defaultContent, nil
    }
    // File exists, read it
    data, err := os.ReadFile(filename)
    if err != nil {
        return "", err
    }
    return string(data), nil
}

func main() {
    content, err := readOrCreate("greeting.txt", "Hello, World!")
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println(content)
    os.Remove("greeting.txt") // cleanup
}`,
          hints: [
            'Use os.Stat(filename) and check the error with os.IsNotExist(err).',
            'If the file does not exist, use os.WriteFile to create it with the default content.',
            'If the file exists, use os.ReadFile to read and return its contents.',
          ],
        },
      },
      {
        id: 'os-readfile',
        title: 'os.ReadFile',
        difficulty: 'beginner',
        tags: ['os', 'readfile', 'read', 'bytes'],
        signature: 'func ReadFile(name string) ([]byte, error)',
        cheatSheetSummary:
          'Reads entire file into []byte in one call. Simple but loads whole file into memory. For large files, use buffered reading.',
        sections: [
          {
            heading: 'Reading Files Simply',
            content:
              '`os.ReadFile` reads an entire file into memory as `[]byte`. It is the simplest way to read a file. For large files, use buffered reading with `bufio.Scanner` or `io.Reader` to avoid memory issues.',
            code: `package main

import (
    "fmt"
    "os"
    "strings"
)

func main() {
    // Write a file first
    content := "line 1\\nline 2\\nline 3\\n"
    os.WriteFile("data.txt", []byte(content), 0644)
    defer os.Remove("data.txt")

    // Read entire file
    data, err := os.ReadFile("data.txt")
    if err != nil {
        fmt.Println("Error:", err)
        return
    }

    fmt.Println("Raw bytes:", len(data))
    fmt.Println("Content:")
    fmt.Print(string(data))

    // Process line by line
    lines := strings.Split(strings.TrimSpace(string(data)), "\\n")
    for i, line := range lines {
        fmt.Printf("Line %d: %s\\n", i+1, line)
    }
}`,
            output: `Raw bytes: 21
Content:
line 1
line 2
line 3
Line 1: line 1
Line 2: line 2
Line 3: line 3`,
            warning: '`os.ReadFile` loads the entire file into memory. Do not use it for files larger than a few hundred MB. Use `bufio.Scanner` or `io.Reader` instead.',
            analogy: 'Think of it like drinking from a glass vs a fire hose: ReadFile pours the entire file into memory at once (fine for small glasses), while buffered reading lets you sip from the stream bit by bit (necessary for the fire hose).',
          },
          {
            heading: 'Buffered Line-by-Line Reading',
            content:
              'For large files or streaming data, use `bufio.Scanner` to read line by line. This processes data incrementally without loading the entire file into memory.',
            code: `package main

import (
    "bufio"
    "fmt"
    "os"
    "strings"
)

func main() {
    // Write test file
    os.WriteFile("log.txt", []byte(
        "INFO: Server started\\n"+
        "ERROR: Connection failed\\n"+
        "INFO: Request received\\n"+
        "WARN: Slow query\\n"+
        "ERROR: Timeout\\n"), 0644)
    defer os.Remove("log.txt")

    // Read line by line with Scanner
    f, _ := os.Open("log.txt")
    defer f.Close()

    scanner := bufio.NewScanner(f)
    errors := 0
    for scanner.Scan() {
        line := scanner.Text()
        if strings.HasPrefix(line, "ERROR") {
            errors++
            fmt.Println("Found:", line)
        }
    }
    if err := scanner.Err(); err != nil {
        fmt.Println("Scan error:", err)
    }
    fmt.Printf("Total errors: %d\\n", errors)
}`,
            output: `Found: ERROR: Connection failed
Found: ERROR: Timeout
Total errors: 2`,
            tip: 'Always check `scanner.Err()` after the scan loop. The loop exits on both EOF (normal) and errors, and you need to distinguish between them.',
            codeHighlightLines: [24, 26, 27, 33],
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart LR
    A["File on disk"] -->|"os.Open"| B["*os.File"]
    B -->|"bufio.NewScanner"| C["Scanner"]
    C -->|"scanner.Scan()"| D["Read line"]
    D -->|"scanner.Text()"| E["Process line"]
    E -->|"loop"| C`,
              caption: 'Buffered reading pipeline: open, wrap in scanner, process lines one at a time',
            },
          },
        ],
        quiz: [
          {
            question: 'What is the main risk of using os.ReadFile for very large files?',
            options: ['It is too slow', 'It loads the entire file into memory', 'It truncates the file', 'It cannot read binary files'],
            correctIndex: 1,
            explanation: 'os.ReadFile loads the entire file content into memory as a []byte slice. For very large files (hundreds of MB+), this can exhaust available memory.',
          },
          {
            question: 'What should you check after a bufio.Scanner loop finishes?',
            options: ['scanner.Done()', 'scanner.Err()', 'scanner.EOF()', 'scanner.Status()'],
            correctIndex: 1,
            explanation: 'Always check scanner.Err() after the loop. The scan loop exits on both EOF (normal) and errors, and you need to check which one occurred.',
          },
          {
            question: 'What does bufio.Scanner.Text() return?',
            options: ['The entire file content', 'The current line as []byte', 'The current line as string (without newline)', 'The next line as string'],
            correctIndex: 2,
            explanation: 'scanner.Text() returns the current token (line by default) as a string, without the trailing newline character.',
          },
        ],
        challenge: {
          prompt: 'Write a function that reads a file line-by-line using bufio.Scanner and returns a map counting how many times each unique line appears.',
          starterCode: `package main

import (
    "bufio"
    "fmt"
    "os"
)

func countLines(filename string) (map[string]int, error) {
    // TODO: Open the file, scan it line by line,
    // count occurrences of each line.
    return nil, nil
}

func main() {
    // Create test file
    os.WriteFile("test.txt", []byte("apple\\nbanana\\napple\\ncherry\\nbanana\\napple\\n"), 0644)
    defer os.Remove("test.txt")

    counts, err := countLines("test.txt")
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    for line, count := range counts {
        fmt.Printf("%s: %d\\n", line, count)
    }
}`,
          solutionCode: `package main

import (
    "bufio"
    "fmt"
    "os"
)

func countLines(filename string) (map[string]int, error) {
    f, err := os.Open(filename)
    if err != nil {
        return nil, err
    }
    defer f.Close()

    counts := make(map[string]int)
    scanner := bufio.NewScanner(f)
    for scanner.Scan() {
        counts[scanner.Text()]++
    }
    if err := scanner.Err(); err != nil {
        return nil, err
    }
    return counts, nil
}

func main() {
    os.WriteFile("test.txt", []byte("apple\\nbanana\\napple\\ncherry\\nbanana\\napple\\n"), 0644)
    defer os.Remove("test.txt")

    counts, err := countLines("test.txt")
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    for line, count := range counts {
        fmt.Printf("%s: %d\\n", line, count)
    }
}`,
          hints: [
            'Open the file with os.Open, defer Close, and create a bufio.NewScanner.',
            'In the scanner.Scan() loop, use scanner.Text() as the map key and increment its count.',
            'Do not forget to check scanner.Err() after the loop for any read errors.',
          ],
        },
      },
      {
        id: 'os-writefile',
        title: 'os.WriteFile',
        difficulty: 'beginner',
        tags: ['os', 'writefile', 'write', 'create'],
        signature: 'func WriteFile(name string, data []byte, perm FileMode) error',
        cheatSheetSummary:
          'Writes []byte to a file in one call (creates or truncates). For appending or streaming, use os.OpenFile with os.O_APPEND.',
        sections: [
          {
            heading: 'Writing Files Simply',
            content:
              '`os.WriteFile` writes data to a file, creating it if it does not exist or truncating it if it does. It is the simplest way to write a file. For appending, use `os.OpenFile` with `os.O_APPEND`. For streaming writes, use `bufio.Writer`.',
            code: 'package main\n\nimport (\n    "encoding/json"\n    "fmt"\n    "os"\n)\n\nfunc main() {\n    // Write text\n    err := os.WriteFile("hello.txt", []byte("Hello, Go!\\n"), 0644)\n    if err != nil {\n        fmt.Println("Error:", err)\n        return\n    }\n    fmt.Println("Written: hello.txt")\n\n    // Write JSON\n    type Config struct {\n        Host string `json:"host"`\n        Port int    `json:"port"`\n    }\n    cfg := Config{Host: "localhost", Port: 8080}\n    data, _ := json.MarshalIndent(cfg, "", "  ")\n    os.WriteFile("config.json", data, 0644)\n\n    // Verify\n    content, _ := os.ReadFile("config.json")\n    fmt.Println(string(content))\n\n    // Clean up\n    os.Remove("hello.txt")\n    os.Remove("config.json")\n}',
            output: `Written: hello.txt
{
  "host": "localhost",
  "port": 8080
}`,
            tip: 'For atomic writes, write to a temporary file first, then rename. This prevents corrupt files if the process is interrupted mid-write.',
          },
          {
            heading: 'Appending and Buffered Writing',
            content:
              'To append to a file or write incrementally, open with `os.OpenFile` and use `bufio.Writer` for buffered output. Always flush the buffer before closing the file.',
            code: `package main

import (
    "bufio"
    "fmt"
    "os"
)

func main() {
    // Create initial file
    os.WriteFile("log.txt", []byte("First line\\n"), 0644)
    defer os.Remove("log.txt")

    // Append to file
    f, _ := os.OpenFile("log.txt", os.O_APPEND|os.O_WRONLY, 0644)
    f.WriteString("Second line\\n")
    f.WriteString("Third line\\n")
    f.Close()

    // Buffered writing (efficient for many small writes)
    f2, _ := os.Create("output.txt")
    defer os.Remove("output.txt")
    w := bufio.NewWriter(f2)

    for i := 1; i <= 1000; i++ {
        fmt.Fprintf(w, "Line %d: data\\n", i)
    }
    w.Flush() // IMPORTANT: flush buffer before close
    f2.Close()

    // Verify
    data, _ := os.ReadFile("log.txt")
    fmt.Print(string(data))

    info, _ := os.Stat("output.txt")
    fmt.Printf("\\noutput.txt: %d bytes\\n", info.Size())
}`,
            output: `First line
Second line
Third line

output.txt: 15890 bytes`,
            warning: 'Always call `w.Flush()` before closing the file when using `bufio.Writer`. Unflushed data in the buffer will be lost.',
            analogy: 'Think of it like writing letters: os.WriteFile sends a complete letter in one go, appending with O_APPEND adds a P.S. at the bottom, and bufio.Writer drafts on scrap paper first (buffering) then copies it all at once (flushing).',
            codeHighlightLines: [15, 23, 28],
          },
        ],
        quiz: [
          {
            question: 'What happens if a file already exists when you call os.WriteFile?',
            options: ['It appends to the file', 'It returns an error', 'It truncates and overwrites the file', 'It renames the old file'],
            correctIndex: 2,
            explanation: 'os.WriteFile creates the file if it does not exist, or truncates (empties) and overwrites it if it does.',
          },
          {
            question: 'What must you do before closing a file when using bufio.Writer?',
            options: ['Call w.Sync()', 'Call w.Flush()', 'Call w.Reset()', 'Nothing, Close handles it'],
            correctIndex: 1,
            explanation: 'You must call w.Flush() before closing the file to ensure all buffered data is written to disk. Unflushed data in the buffer will be lost.',
          },
          {
            question: 'What does the third argument (perm) to os.WriteFile control?',
            options: ['The encoding format', 'The maximum file size', 'The file permission mode (e.g., 0644)', 'The write buffer size'],
            correctIndex: 2,
            explanation: 'The perm argument sets the Unix file permission mode. 0644 means read-write for owner, read-only for group and others.',
          },
        ],
        challenge: {
          prompt: 'Write a function that appends a timestamped log entry to a file. Each call should add a new line without overwriting existing content. Use os.OpenFile with O_APPEND.',
          starterCode: `package main

import (
    "fmt"
    "os"
    "time"
)

func appendLog(filename, message string) error {
    // TODO: Open file in append mode (create if not exists),
    // write a timestamped log line, close the file.
    return nil
}

func main() {
    filename := "app.log"
    defer os.Remove(filename)

    appendLog(filename, "Server started")
    appendLog(filename, "Request received")
    appendLog(filename, "Server stopped")

    data, _ := os.ReadFile(filename)
    fmt.Print(string(data))
}`,
          solutionCode: `package main

import (
    "fmt"
    "os"
    "time"
)

func appendLog(filename, message string) error {
    f, err := os.OpenFile(filename, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
    if err != nil {
        return err
    }
    defer f.Close()

    timestamp := time.Now().Format("2006-01-02 15:04:05")
    _, err = fmt.Fprintf(f, "[%s] %s\n", timestamp, message)
    return err
}

func main() {
    filename := "app.log"
    defer os.Remove(filename)

    appendLog(filename, "Server started")
    appendLog(filename, "Request received")
    appendLog(filename, "Server stopped")

    data, _ := os.ReadFile(filename)
    fmt.Print(string(data))
}`,
          hints: [
            'Use os.OpenFile with flags os.O_APPEND|os.O_CREATE|os.O_WRONLY to open for appending.',
            'Use fmt.Fprintf to write formatted output to the file.',
            'Format the timestamp with time.Now().Format("2006-01-02 15:04:05") -- Go uses this specific reference time for formatting.',
          ],
        },
      },
      {
        id: 'io-reader',
        title: 'io.Reader',
        difficulty: 'intermediate',
        tags: ['io', 'reader', 'interface', 'streaming', 'composition'],
        signature: 'type Reader interface { Read(p []byte) (n int, err error) }',
        cheatSheetSummary:
          'The foundational interface: `Read(p []byte) (n int, err error)`. Implemented by files, network, buffers, strings. Compose with io.TeeReader, io.LimitReader.',
        sections: [
          {
            heading: 'The io.Reader Interface',
            content:
              '`io.Reader` is the most important interface in Go. It has a single method: `Read(p []byte) (n int, err error)`. Files, network connections, HTTP response bodies, compression readers, and string readers all implement this interface. Write code against `io.Reader` for maximum reusability.',
            code: `package main

import (
    "fmt"
    "io"
    "strings"
)

// Works with ANY Reader
func countBytes(r io.Reader) (int64, error) {
    var total int64
    buf := make([]byte, 1024)
    for {
        n, err := r.Read(buf)
        total += int64(n)
        if err == io.EOF {
            break
        }
        if err != nil {
            return total, err
        }
    }
    return total, nil
}

func main() {
    // strings.NewReader implements io.Reader
    r := strings.NewReader("Hello, Go readers!")
    count, _ := countBytes(r)
    fmt.Println("Bytes:", count)

    // io.ReadAll: reads everything into memory
    r2 := strings.NewReader("Read all at once")
    data, _ := io.ReadAll(r2)
    fmt.Println("Data:", string(data))

    // io.LimitReader: limits how much can be read
    r3 := strings.NewReader("Only read first 5 bytes")
    limited := io.LimitReader(r3, 5)
    data2, _ := io.ReadAll(limited)
    fmt.Println("Limited:", string(data2))
}`,
            output: `Bytes: 18
Data: Read all at once
Limited: Only`,
            tip: 'Always program against `io.Reader` in function parameters. This makes your code work with files, network, strings, compression, and any custom reader.',
            analogy: 'Think of it like a universal adapter for data streams: whether the data comes from a file, the network, a compressed archive, or a string in memory, io.Reader provides a single plug shape that fits them all.',
            codeHighlightLines: [10, 14, 38],
            diagram: {
              kind: 'mermaid' as const,
              code: `classDiagram
    class Reader {
        <<interface>>
        +Read(p []byte) (int, error)
    }
    class File
    class StringReader
    class HTTPBody
    class GzipReader
    class LimitedReader
    Reader <|.. File
    Reader <|.. StringReader
    Reader <|.. HTTPBody
    Reader <|.. GzipReader
    Reader <|.. LimitedReader`,
              caption: 'The io.Reader interface is implemented by many standard library types',
            },
          },
          {
            heading: 'Composing Readers',
            content:
              'Go\'s readers compose beautifully. Chain them to build processing pipelines: read from network, decompress, decode JSON. `io.TeeReader` copies data as it is read. `io.MultiReader` concatenates readers.',
            code: `package main

import (
    "bytes"
    "fmt"
    "io"
    "strings"
)

func main() {
    // TeeReader: copies data as it's read
    input := strings.NewReader("Hello, World!")
    var buf bytes.Buffer
    tee := io.TeeReader(input, &buf)

    // Reading from tee also writes to buf
    data, _ := io.ReadAll(tee)
    fmt.Println("Read:", string(data))
    fmt.Println("Copy:", buf.String())

    // MultiReader: concatenate readers
    r1 := strings.NewReader("Part 1. ")
    r2 := strings.NewReader("Part 2. ")
    r3 := strings.NewReader("Part 3.")
    combined := io.MultiReader(r1, r2, r3)

    all, _ := io.ReadAll(combined)
    fmt.Println("Combined:", string(all))

    // Pipe: connected reader/writer pair
    pr, pw := io.Pipe()
    go func() {
        fmt.Fprint(pw, "piped data")
        pw.Close()
    }()
    piped, _ := io.ReadAll(pr)
    fmt.Println("Piped:", string(piped))
}`,
            output: `Read: Hello, World!
Copy: Hello, World!
Combined: Part 1. Part 2. Part 3.
Piped: piped data`,
            note: 'Reader composition is one of Go\'s most powerful patterns. A gzip reader wrapping an HTTP response body is a single line: `gzip.NewReader(resp.Body)`.',
            codeHighlightLines: [14, 25, 31],
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart LR
    A["Reader A"] --> M["MultiReader"]
    B["Reader B"] --> M
    C["Reader C"] --> M
    M --> D["Combined stream"]

    E["Source Reader"] --> T["TeeReader"]
    T --> F["Consumer"]
    T --> G["Buffer copy"]`,
              caption: 'Reader composition: MultiReader concatenates, TeeReader duplicates',
            },
          },
        ],
        quiz: [
          {
            question: 'What is the single method defined by the io.Reader interface?',
            options: ['ReadAll(p []byte) (int, error)', 'Read(p []byte) (n int, err error)', 'ReadByte() (byte, error)', 'ReadString(delim byte) (string, error)'],
            correctIndex: 1,
            explanation: 'io.Reader defines exactly one method: Read(p []byte) (n int, err error). This simple interface is implemented by dozens of types.',
          },
          {
            question: 'What does io.LimitReader do?',
            options: ['Limits the number of concurrent readers', 'Limits how many bytes can be read from a reader', 'Limits the speed of reading', 'Limits the buffer size'],
            correctIndex: 1,
            explanation: 'io.LimitReader wraps a reader and stops returning data after n bytes have been read, even if the underlying reader has more data.',
          },
          {
            question: 'What does io.TeeReader do?',
            options: ['Reads from two sources simultaneously', 'Copies data to a writer as it is read from the reader', 'Splits a reader into two independent readers', 'Reads data twice for verification'],
            correctIndex: 1,
            explanation: 'io.TeeReader creates a reader that, as data is read from it, also writes that data to a specified writer. It is like a T-shaped pipe splitter.',
          },
          {
            question: 'Why should you program against io.Reader in function parameters?',
            options: ['It is faster than concrete types', 'It makes the function work with files, network, strings, and any reader', 'It uses less memory', 'It is required by the Go specification'],
            correctIndex: 1,
            explanation: 'Accepting io.Reader makes your code maximally flexible: it works with files, network streams, string readers, compressed data, and any custom implementation.',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes an io.Reader and returns the number of words in the data. A word is any whitespace-separated token. The function should work with any Reader (strings, files, etc.).',
          starterCode: `package main

import (
    "fmt"
    "io"
    "strings"
)

func countWords(r io.Reader) (int, error) {
    // TODO: Read all data from the reader,
    // split by whitespace, and count the words.
    return 0, nil
}

func main() {
    r := strings.NewReader("Hello World from Go io.Reader")
    count, err := countWords(r)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Word count:", count) // 5
}`,
          solutionCode: `package main

import (
    "fmt"
    "io"
    "strings"
)

func countWords(r io.Reader) (int, error) {
    data, err := io.ReadAll(r)
    if err != nil {
        return 0, err
    }
    text := strings.TrimSpace(string(data))
    if text == "" {
        return 0, nil
    }
    words := strings.Fields(text)
    return len(words), nil
}

func main() {
    r := strings.NewReader("Hello World from Go io.Reader")
    count, err := countWords(r)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Word count:", count) // 5
}`,
          hints: [
            'Use io.ReadAll(r) to read all data from the reader into a byte slice.',
            'Convert to string and use strings.Fields() to split by any whitespace (spaces, tabs, newlines).',
            'Handle the empty string case to avoid counting zero-length words.',
          ],
        },
      },
      {
        id: 'io-writer',
        title: 'io.Writer',
        difficulty: 'intermediate',
        tags: ['io', 'writer', 'interface', 'output', 'multiwriter'],
        signature: 'type Writer interface { Write(p []byte) (n int, err error) }',
        cheatSheetSummary:
          'The output interface: `Write(p []byte) (n int, err error)`. Files, network, buffers, stdout implement it. Compose with io.MultiWriter.',
        sections: [
          {
            heading: 'The io.Writer Interface',
            content:
              '`io.Writer` is the output counterpart to `io.Reader`. It has one method: `Write(p []byte) (n int, err error)`. Files, network connections, HTTP response writers, and buffers implement it. `fmt.Fprintf` writes to any `io.Writer`.',
            code: `package main

import (
    "bytes"
    "fmt"
    "io"
    "os"
    "strings"
)

// Works with ANY Writer
func writeGreeting(w io.Writer, name string) {
    fmt.Fprintf(w, "Hello, %s!\\n", name)
}

func main() {
    // Write to stdout
    writeGreeting(os.Stdout, "Stdout")

    // Write to a buffer
    var buf bytes.Buffer
    writeGreeting(&buf, "Buffer")
    fmt.Print("Captured: " + buf.String())

    // Write to a string builder
    var sb strings.Builder
    writeGreeting(&sb, "Builder")
    fmt.Print("Built: " + sb.String())

    // io.Copy: connect reader to writer
    src := strings.NewReader("Copy this data")
    n, _ := io.Copy(os.Stdout, src)
    fmt.Printf("\\nCopied %d bytes\\n", n)
}`,
            output: `Hello, Stdout!
Captured: Hello, Buffer!
Built: Hello, Builder!
Copy this data
Copied 14 bytes`,
            tip: 'Design functions to accept `io.Writer` for output. This makes them testable (write to a buffer in tests) and flexible (write to files, network, or anything).',
            analogy: 'Think of it like a pipe fitting that can connect to any drain: io.Writer is a universal output connection. Your function pours data into it without caring if the drain leads to the console, a file, the network, or a test buffer.',
            codeHighlightLines: [12, 13, 18, 22, 27],
          },
          {
            heading: 'Composing Writers',
            content:
              '`io.MultiWriter` writes to multiple destinations simultaneously. This is useful for logging to both a file and stdout, or writing to multiple outputs. `io.Discard` is a writer that throws away data.',
            code: `package main

import (
    "bytes"
    "fmt"
    "io"
    "os"
    "strings"
)

func main() {
    // MultiWriter: write to multiple destinations
    var buf1, buf2 bytes.Buffer
    multi := io.MultiWriter(&buf1, &buf2, os.Stdout)

    fmt.Fprintln(multi, "This goes everywhere!")

    fmt.Println("buf1:", buf1.String())
    fmt.Println("buf2:", buf2.String())

    // Discard: throw away output
    n, _ := io.Copy(io.Discard, strings.NewReader("discarded data"))
    fmt.Printf("Discarded %d bytes\\n", n)

    // Practical: log to file and stdout
    // logFile, _ := os.Create("app.log")
    // defer logFile.Close()
    // logger := io.MultiWriter(os.Stdout, logFile)
    // fmt.Fprintln(logger, "This is logged everywhere")
}`,
            output: `This goes everywhere!
buf1: This goes everywhere!

buf2: This goes everywhere!

Discarded 14 bytes`,
            note: '`io.Discard` is useful in benchmarks and when a function requires a writer but you do not care about the output.',
            analogy: 'Think of it like a TV broadcast splitter: MultiWriter takes one signal (write call) and duplicates it to multiple screens (destinations). Each screen gets the exact same picture simultaneously.',
            codeHighlightLines: [14, 22],
          },
        ],
        quiz: [
          {
            question: 'What is the single method defined by the io.Writer interface?',
            options: ['WriteAll(p []byte) error', 'Write(p []byte) (n int, err error)', 'WriteByte(b byte) error', 'WriteString(s string) error'],
            correctIndex: 1,
            explanation: 'io.Writer defines exactly one method: Write(p []byte) (n int, err error). Files, buffers, network connections, and many other types implement it.',
          },
          {
            question: 'What does io.MultiWriter do?',
            options: ['Writes to multiple files sequentially', 'Creates a writer that duplicates writes to all provided writers simultaneously', 'Merges data from multiple writers', 'Buffers writes across multiple destinations'],
            correctIndex: 1,
            explanation: 'io.MultiWriter creates a writer that, when written to, sends the same data to all the provided writers simultaneously.',
          },
          {
            question: 'What is io.Discard used for?',
            options: ['Deleting files', 'A writer that throws away all data written to it', 'Discarding errors', 'Resetting a reader'],
            correctIndex: 1,
            explanation: 'io.Discard is a writer that successfully consumes and discards all data. It is useful in benchmarks or when an API requires a writer but you do not need the output.',
          },
          {
            question: 'What does io.Copy(dst, src) do?',
            options: ['Copies a file from src path to dst path', 'Reads from src (Reader) and writes to dst (Writer) until EOF', 'Copies the internal buffer of src to dst', 'Creates a duplicate reader'],
            correctIndex: 1,
            explanation: 'io.Copy reads from the source Reader and writes to the destination Writer until EOF or an error. It returns the number of bytes copied.',
          },
        ],
        challenge: {
          prompt: 'Write a function that accepts an io.Writer and writes a formatted report of key-value pairs. The function should work with any writer (stdout, buffer, file, etc.).',
          starterCode: `package main

import (
    "bytes"
    "fmt"
    "io"
    "os"
)

func writeReport(w io.Writer, data map[string]int) error {
    // TODO: Write a formatted report to the writer.
    // Each line: "key: value"
    // End with a total line: "Total: <sum>"
    return nil
}

func main() {
    data := map[string]int{
        "Apples":  5,
        "Bananas": 3,
        "Cherries": 8,
    }

    // Write to stdout
    fmt.Println("--- Stdout ---")
    writeReport(os.Stdout, data)

    // Write to buffer
    var buf bytes.Buffer
    writeReport(&buf, data)
    fmt.Println("--- Buffer ---")
    fmt.Print(buf.String())
}`,
          solutionCode: `package main

import (
    "bytes"
    "fmt"
    "io"
    "os"
    "sort"
)

func writeReport(w io.Writer, data map[string]int) error {
    // Sort keys for consistent output
    keys := make([]string, 0, len(data))
    for k := range data {
        keys = append(keys, k)
    }
    sort.Strings(keys)

    total := 0
    for _, k := range keys {
        v := data[k]
        _, err := fmt.Fprintf(w, "%s: %d\n", k, v)
        if err != nil {
            return err
        }
        total += v
    }
    _, err := fmt.Fprintf(w, "Total: %d\n", total)
    return err
}

func main() {
    data := map[string]int{
        "Apples":  5,
        "Bananas": 3,
        "Cherries": 8,
    }

    fmt.Println("--- Stdout ---")
    writeReport(os.Stdout, data)

    var buf bytes.Buffer
    writeReport(&buf, data)
    fmt.Println("--- Buffer ---")
    fmt.Print(buf.String())
}`,
          hints: [
            'Use fmt.Fprintf(w, ...) to write formatted output to any io.Writer.',
            'Iterate over the map, write each key-value pair, and accumulate the total.',
            'Sort the map keys for consistent, predictable output order.',
          ],
        },
      },
    ],
  },
];

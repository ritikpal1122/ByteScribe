"""Batch 9: Math, Bit Manipulation, Design, Matrix, Intervals (~40 with company labels)."""

PROBLEMS_BATCH9 = [
    # ─── 1. Pow(x, n) ─────────────────────────────────────────────────────
    {
        "title": "Pow(x, n)",
        "difficulty": "medium",
        "tags": ["math"],
        "companies": ["meta", "google", "amazon", "linkedin"],
        "description": "Implement pow(x, n), which calculates `x` raised to the power `n` (i.e., `x^n`).\n\nExample 1:\nInput: x = 2.00000, n = 10\nOutput: 1024.00000\n\nExample 2:\nInput: x = 2.10000, n = 3\nOutput: 9.26100",
        "constraints": "-100.0 < x < 100.0\n-2^31 <= n <= 2^31 - 1\nn is an integer.\nEither x is not zero or n > 0.\n-10^4 <= x^n <= 10^4",
        "hints": "Use fast exponentiation (binary exponentiation). If n is even, x^n = (x^(n/2))^2. Handle negative exponents by inverting x.",
        "starter_code": {
            "python": "class Solution:\n    def myPow(self, x: float, n: int) -> float:\n        pass",
            "javascript": "var myPow = function(x, n) {\n    \n};",
            "java": "class Solution {\n    public double myPow(double x, int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    double myPow(double x, int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "2.00000\n10", "expected_output": "1024.00000", "is_sample": True},
            {"input": "2.10000\n3", "expected_output": "9.26100", "is_sample": True},
            {"input": "2.00000\n-2", "expected_output": "0.25000", "is_sample": False},
        ],
    },
    # ─── 2. Divide Two Integers ────────────────────────────────────────────
    {
        "title": "Divide Two Integers",
        "difficulty": "medium",
        "tags": ["math", "bit-manipulation"],
        "companies": ["meta", "microsoft", "amazon"],
        "description": "Given two integers `dividend` and `divisor`, divide two integers without using multiplication, division, and mod operator. The integer division should truncate toward zero.\n\nExample 1:\nInput: dividend = 10, divisor = 3\nOutput: 3\n\nExample 2:\nInput: dividend = 7, divisor = -3\nOutput: -2",
        "constraints": "-2^31 <= dividend, divisor <= 2^31 - 1\ndivisor != 0",
        "hints": "Use bit shifting to double the divisor repeatedly. Subtract the largest shifted value from the dividend at each step.",
        "starter_code": {
            "python": "class Solution:\n    def divide(self, dividend: int, divisor: int) -> int:\n        pass",
            "javascript": "var divide = function(dividend, divisor) {\n    \n};",
            "java": "class Solution {\n    public int divide(int dividend, int divisor) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int divide(int dividend, int divisor) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "10\n3", "expected_output": "3", "is_sample": True},
            {"input": "7\n-3", "expected_output": "-2", "is_sample": True},
            {"input": "-2147483648\n-1", "expected_output": "2147483647", "is_sample": False},
        ],
    },
    # ─── 3. Multiply Strings ──────────────────────────────────────────────
    {
        "title": "Multiply Strings",
        "difficulty": "medium",
        "tags": ["math", "string"],
        "companies": ["google", "meta", "microsoft", "apple"],
        "description": "Given two non-negative integers `num1` and `num2` represented as strings, return the product of `num1` and `num2`, also represented as a string. You must not use any built-in BigInteger library or convert the inputs to integer directly.\n\nExample 1:\nInput: num1 = \"2\", num2 = \"3\"\nOutput: \"6\"\n\nExample 2:\nInput: num1 = \"123\", num2 = \"456\"\nOutput: \"56088\"",
        "constraints": "1 <= num1.length, num2.length <= 200\nnum1 and num2 consist of digits only.\nBoth num1 and num2 do not contain any leading zero, except the number 0 itself.",
        "hints": "Use an array of length m+n to store intermediate results. Multiply digit by digit and accumulate at the correct positions.",
        "starter_code": {
            "python": "class Solution:\n    def multiply(self, num1: str, num2: str) -> str:\n        pass",
            "javascript": "var multiply = function(num1, num2) {\n    \n};",
            "java": "class Solution {\n    public String multiply(String num1, String num2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string multiply(string num1, string num2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"2\"\n\"3\"", "expected_output": "\"6\"", "is_sample": True},
            {"input": "\"123\"\n\"456\"", "expected_output": "\"56088\"", "is_sample": True},
            {"input": "\"0\"\n\"52\"", "expected_output": "\"0\"", "is_sample": False},
        ],
    },
    # ─── 4. Fraction to Recurring Decimal ──────────────────────────────────
    {
        "title": "Fraction to Recurring Decimal",
        "difficulty": "medium",
        "tags": ["math", "hash-table"],
        "companies": ["google", "meta", "uber"],
        "description": "Given two integers representing the `numerator` and `denominator` of a fraction, return the fraction in string format. If the fractional part is repeating, enclose the repeating part in parentheses.\n\nExample 1:\nInput: numerator = 1, denominator = 2\nOutput: \"0.5\"\n\nExample 2:\nInput: numerator = 4, denominator = 333\nOutput: \"0.(012)\"",
        "constraints": "-2^31 <= numerator, denominator <= 2^31 - 1\ndenominator != 0",
        "hints": "Perform long division. Use a hash map to record the position where each remainder first appeared to detect the repeating cycle.",
        "starter_code": {
            "python": "class Solution:\n    def fractionToDecimal(self, numerator: int, denominator: int) -> str:\n        pass",
            "javascript": "var fractionToDecimal = function(numerator, denominator) {\n    \n};",
            "java": "class Solution {\n    public String fractionToDecimal(int numerator, int denominator) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string fractionToDecimal(int numerator, int denominator) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "1\n2", "expected_output": "\"0.5\"", "is_sample": True},
            {"input": "4\n333", "expected_output": "\"0.(012)\"", "is_sample": True},
            {"input": "2\n1", "expected_output": "\"2\"", "is_sample": False},
        ],
    },
    # ─── 5. Excel Sheet Column Title ───────────────────────────────────────
    {
        "title": "Excel Sheet Column Title",
        "difficulty": "easy",
        "tags": ["math", "string"],
        "companies": ["microsoft", "meta", "google"],
        "description": "Given an integer `columnNumber`, return its corresponding column title as it appears in an Excel sheet (1 -> A, 2 -> B, ..., 26 -> Z, 27 -> AA, ...).\n\nExample 1:\nInput: columnNumber = 1\nOutput: \"A\"\n\nExample 2:\nInput: columnNumber = 701\nOutput: \"ZY\"",
        "constraints": "1 <= columnNumber <= 2^31 - 1",
        "hints": "Think of this as a base-26 number system, but with 1-indexing. Subtract 1 before taking modulo 26 at each step.",
        "starter_code": {
            "python": "class Solution:\n    def convertToTitle(self, columnNumber: int) -> str:\n        pass",
            "javascript": "var convertToTitle = function(columnNumber) {\n    \n};",
            "java": "class Solution {\n    public String convertToTitle(int columnNumber) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string convertToTitle(int columnNumber) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "1", "expected_output": "\"A\"", "is_sample": True},
            {"input": "701", "expected_output": "\"ZY\"", "is_sample": True},
            {"input": "28", "expected_output": "\"AB\"", "is_sample": False},
        ],
    },
    # ─── 6. Factorial Trailing Zeroes ──────────────────────────────────────
    {
        "title": "Factorial Trailing Zeroes",
        "difficulty": "medium",
        "tags": ["math"],
        "companies": ["microsoft", "amazon", "uber"],
        "description": "Given an integer `n`, return the number of trailing zeroes in `n!`. Follow up: Could you write a solution that works in logarithmic time complexity?\n\nExample 1:\nInput: n = 3\nOutput: 0\nExplanation: 3! = 6, no trailing zero.\n\nExample 2:\nInput: n = 5\nOutput: 1\nExplanation: 5! = 120, one trailing zero.",
        "constraints": "0 <= n <= 10^4",
        "hints": "Trailing zeroes come from factors of 10 = 2 * 5. Count the number of times 5 is a factor in numbers from 1 to n.",
        "starter_code": {
            "python": "class Solution:\n    def trailingZeroes(self, n: int) -> int:\n        pass",
            "javascript": "var trailingZeroes = function(n) {\n    \n};",
            "java": "class Solution {\n    public int trailingZeroes(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int trailingZeroes(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "3", "expected_output": "0", "is_sample": True},
            {"input": "5", "expected_output": "1", "is_sample": True},
            {"input": "30", "expected_output": "7", "is_sample": False},
        ],
    },
    # ─── 7. Maximum Points on a Line ───────────────────────────────────────
    {
        "title": "Max Points on a Line",
        "difficulty": "hard",
        "tags": ["math", "hash-table"],
        "companies": ["google", "meta", "apple", "linkedin"],
        "description": "Given an array of `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.\n\nExample 1:\nInput: points = [[1,1],[2,2],[3,3]]\nOutput: 3\n\nExample 2:\nInput: points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]\nOutput: 4",
        "constraints": "1 <= points.length <= 300\npoints[i].length == 2\n-10^4 <= xi, yi <= 10^4\nAll the points are unique.",
        "hints": "For each point, use a hash map to count how many other points share the same slope. Represent slopes as reduced fractions to avoid floating-point issues.",
        "starter_code": {
            "python": "class Solution:\n    def maxPoints(self, points: list[list[int]]) -> int:\n        pass",
            "javascript": "var maxPoints = function(points) {\n    \n};",
            "java": "class Solution {\n    public int maxPoints(int[][] points) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxPoints(vector<vector<int>>& points) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,1],[2,2],[3,3]]", "expected_output": "3", "is_sample": True},
            {"input": "[[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]", "expected_output": "4", "is_sample": True},
            {"input": "[[0,0]]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 8. Integer to English Words ───────────────────────────────────────
    {
        "title": "Integer to English Words",
        "difficulty": "hard",
        "tags": ["math", "string"],
        "companies": ["meta", "amazon", "microsoft", "oracle"],
        "description": "Convert a non-negative integer `num` to its English words representation.\n\nExample 1:\nInput: num = 123\nOutput: \"One Hundred Twenty Three\"\n\nExample 2:\nInput: num = 1234567\nOutput: \"One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven\"",
        "constraints": "0 <= num <= 2^31 - 1",
        "hints": "Break the number into groups of three digits (ones, thousands, millions, billions) and convert each group separately.",
        "starter_code": {
            "python": "class Solution:\n    def numberToWords(self, num: int) -> str:\n        pass",
            "javascript": "var numberToWords = function(num) {\n    \n};",
            "java": "class Solution {\n    public String numberToWords(int num) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string numberToWords(int num) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "123", "expected_output": "\"One Hundred Twenty Three\"", "is_sample": True},
            {"input": "1234567", "expected_output": "\"One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven\"", "is_sample": True},
            {"input": "0", "expected_output": "\"Zero\"", "is_sample": False},
        ],
    },
    # ─── 9. String to Integer (atoi) ───────────────────────────────────────
    {
        "title": "String to Integer (atoi)",
        "difficulty": "medium",
        "tags": ["string", "math"],
        "companies": ["amazon", "microsoft", "meta", "apple"],
        "description": "Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer. Read and ignore leading whitespace, determine sign, read digits until a non-digit or end of string, and clamp to the 32-bit signed integer range [-2^31, 2^31 - 1].\n\nExample 1:\nInput: s = \"42\"\nOutput: 42\n\nExample 2:\nInput: s = \"   -42\"\nOutput: -42",
        "constraints": "0 <= s.length <= 200\ns consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'.",
        "hints": "Handle edge cases carefully: leading whitespace, optional sign character, overflow/underflow clamping, and non-digit characters.",
        "starter_code": {
            "python": "class Solution:\n    def myAtoi(self, s: str) -> int:\n        pass",
            "javascript": "var myAtoi = function(s) {\n    \n};",
            "java": "class Solution {\n    public int myAtoi(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int myAtoi(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"42\"", "expected_output": "42", "is_sample": True},
            {"input": "\"   -42\"", "expected_output": "-42", "is_sample": True},
            {"input": "\"4193 with words\"", "expected_output": "4193", "is_sample": False},
        ],
    },
    # ─── 10. Power of Four ─────────────────────────────────────────────────
    {
        "title": "Power of Four",
        "difficulty": "easy",
        "tags": ["math", "bit-manipulation"],
        "companies": ["apple", "google"],
        "description": "Given an integer `n`, return `true` if it is a power of four. Otherwise, return `false`. An integer `n` is a power of four if there exists an integer `x` such that `n == 4^x`.\n\nExample 1:\nInput: n = 16\nOutput: true\n\nExample 2:\nInput: n = 5\nOutput: false",
        "constraints": "-2^31 <= n <= 2^31 - 1\nFollow up: Could you solve it without loops/recursion?",
        "hints": "A power of four is also a power of two where the single set bit is at an even position. Use n & (n-1) == 0 and n & 0x55555555 != 0.",
        "starter_code": {
            "python": "class Solution:\n    def isPowerOfFour(self, n: int) -> bool:\n        pass",
            "javascript": "var isPowerOfFour = function(n) {\n    \n};",
            "java": "class Solution {\n    public boolean isPowerOfFour(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isPowerOfFour(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "16", "expected_output": "true", "is_sample": True},
            {"input": "5", "expected_output": "false", "is_sample": True},
            {"input": "1", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 11. Bitwise AND of Numbers Range ──────────────────────────────────
    {
        "title": "Bitwise AND of Numbers Range",
        "difficulty": "medium",
        "tags": ["bit-manipulation"],
        "companies": ["microsoft", "amazon", "apple"],
        "description": "Given two integers `left` and `right` that represent the range `[left, right]`, return the bitwise AND of all numbers in this range, inclusive.\n\nExample 1:\nInput: left = 5, right = 7\nOutput: 4\n\nExample 2:\nInput: left = 1, right = 2147483647\nOutput: 0",
        "constraints": "0 <= left <= right <= 2^31 - 1",
        "hints": "Find the common prefix of left and right in binary. Shift both numbers right until they are equal, then shift the result back left.",
        "starter_code": {
            "python": "class Solution:\n    def rangeBitwiseAnd(self, left: int, right: int) -> int:\n        pass",
            "javascript": "var rangeBitwiseAnd = function(left, right) {\n    \n};",
            "java": "class Solution {\n    public int rangeBitwiseAnd(int left, int right) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int rangeBitwiseAnd(int left, int right) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "5\n7", "expected_output": "4", "is_sample": True},
            {"input": "1\n2147483647", "expected_output": "0", "is_sample": True},
            {"input": "0\n0", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 12. Single Number II ──────────────────────────────────────────────
    {
        "title": "Single Number II",
        "difficulty": "medium",
        "tags": ["bit-manipulation"],
        "companies": ["google", "amazon", "uber"],
        "description": "Given an integer array `nums` where every element appears exactly three times except for one element which appears exactly once, find the single element and return it. You must implement a solution with a linear runtime complexity and use only constant extra space.\n\nExample 1:\nInput: nums = [2,2,3,2]\nOutput: 3\n\nExample 2:\nInput: nums = [0,1,0,1,0,1,99]\nOutput: 99",
        "constraints": "1 <= nums.length <= 3 * 10^4\n-2^31 <= nums[i] <= 2^31 - 1\nEach element in nums appears exactly three times except for one element which appears exactly once.",
        "hints": "Use two bitmasks (ones and twos) to track bits appearing once and twice. When a bit appears three times, clear it from both masks.",
        "starter_code": {
            "python": "class Solution:\n    def singleNumber(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var singleNumber = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int singleNumber(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,2,3,2]", "expected_output": "3", "is_sample": True},
            {"input": "[0,1,0,1,0,1,99]", "expected_output": "99", "is_sample": True},
            {"input": "[30000,500,100,30000,100,30000,100]", "expected_output": "500", "is_sample": False},
        ],
    },
    # ─── 13. Single Number III ─────────────────────────────────────────────
    {
        "title": "Single Number III",
        "difficulty": "medium",
        "tags": ["bit-manipulation"],
        "companies": ["meta", "amazon", "bytedance"],
        "description": "Given an integer array `nums` in which exactly two elements appear only once and all the other elements appear exactly twice, find the two elements that appear only once. You can return the answer in any order. Your algorithm should run in linear time and use only constant extra space.\n\nExample 1:\nInput: nums = [1,2,1,3,2,5]\nOutput: [3,5]\n\nExample 2:\nInput: nums = [-1,0]\nOutput: [-1,0]",
        "constraints": "2 <= nums.length <= 3 * 10^4\n-2^31 <= nums[i] <= 2^31 - 1\nEach integer in nums will appear exactly twice, except for two integers which will appear exactly once.",
        "hints": "XOR all numbers to get xor of the two unique numbers. Use any set bit to partition the array into two groups, each containing one unique number.",
        "starter_code": {
            "python": "class Solution:\n    def singleNumber(self, nums: list[int]) -> list[int]:\n        pass",
            "javascript": "var singleNumber = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int[] singleNumber(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> singleNumber(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,1,3,2,5]", "expected_output": "[3,5]", "is_sample": True},
            {"input": "[-1,0]", "expected_output": "[-1,0]", "is_sample": True},
            {"input": "[1,1,2,3,3,4]", "expected_output": "[2,4]", "is_sample": False},
        ],
    },
    # ─── 14. Hamming Distance ──────────────────────────────────────────────
    {
        "title": "Hamming Distance",
        "difficulty": "easy",
        "tags": ["bit-manipulation"],
        "companies": ["meta", "adobe"],
        "description": "The Hamming distance between two integers is the number of positions at which the corresponding bits are different. Given two integers `x` and `y`, return the Hamming distance between them.\n\nExample 1:\nInput: x = 1, y = 4\nOutput: 2\nExplanation: 1 (0 0 0 1) and 4 (0 1 0 0) differ at positions 0 and 2.\n\nExample 2:\nInput: x = 3, y = 1\nOutput: 1",
        "constraints": "0 <= x, y <= 2^31 - 1",
        "hints": "XOR the two numbers and count the number of set bits in the result.",
        "starter_code": {
            "python": "class Solution:\n    def hammingDistance(self, x: int, y: int) -> int:\n        pass",
            "javascript": "var hammingDistance = function(x, y) {\n    \n};",
            "java": "class Solution {\n    public int hammingDistance(int x, int y) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int hammingDistance(int x, int y) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "1\n4", "expected_output": "2", "is_sample": True},
            {"input": "3\n1", "expected_output": "1", "is_sample": True},
            {"input": "0\n0", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 15. Total Hamming Distance ────────────────────────────────────────
    {
        "title": "Total Hamming Distance",
        "difficulty": "medium",
        "tags": ["bit-manipulation"],
        "companies": ["meta", "amazon", "google"],
        "description": "The Hamming distance between two integers is the number of positions at which the corresponding bits are different. Given an integer array `nums`, return the sum of Hamming distances between all pairs of the integers in `nums`.\n\nExample 1:\nInput: nums = [4,14,2]\nOutput: 6\nExplanation: The pairwise Hamming distances are HammingDistance(4,14) + HammingDistance(4,2) + HammingDistance(14,2) = 2 + 2 + 2 = 6.\n\nExample 2:\nInput: nums = [4,14,4]\nOutput: 4",
        "constraints": "1 <= nums.length <= 10^4\n0 <= nums[i] <= 10^9",
        "hints": "For each bit position, count how many numbers have that bit set (c) and how many do not (n - c). The contribution of that bit is c * (n - c).",
        "starter_code": {
            "python": "class Solution:\n    def totalHammingDistance(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var totalHammingDistance = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int totalHammingDistance(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int totalHammingDistance(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[4,14,2]", "expected_output": "6", "is_sample": True},
            {"input": "[4,14,4]", "expected_output": "4", "is_sample": True},
            {"input": "[1]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 16. Design HashMap ────────────────────────────────────────────────
    {
        "title": "Design HashMap",
        "difficulty": "easy",
        "tags": ["design", "hash-table"],
        "companies": ["amazon", "microsoft", "apple"],
        "description": "Design a HashMap without using any built-in hash table libraries. Implement `MyHashMap` with `put(key, value)`, `get(key)` (returns -1 if not found), and `remove(key)`.\n\nExample:\nInput: [\"MyHashMap\",\"put\",\"put\",\"get\",\"get\",\"put\",\"get\",\"remove\",\"get\"]\n[[],[1,1],[2,2],[1],[3],[2,1],[2],[2],[2]]\nOutput: [null,null,null,1,-1,null,1,null,-1]",
        "constraints": "0 <= key, value <= 10^6\nAt most 10^4 calls will be made to put, get, and remove.",
        "hints": "Use an array of buckets with chaining (linked list) to handle collisions. Choose a prime number as the bucket size.",
        "starter_code": {
            "python": "class MyHashMap:\n    def __init__(self):\n        pass\n\n    def put(self, key: int, value: int) -> None:\n        pass\n\n    def get(self, key: int) -> int:\n        pass\n\n    def remove(self, key: int) -> None:\n        pass",
            "javascript": "var MyHashMap = function() {\n    \n};\n\nMyHashMap.prototype.put = function(key, value) {\n    \n};\n\nMyHashMap.prototype.get = function(key) {\n    \n};\n\nMyHashMap.prototype.remove = function(key) {\n    \n};",
            "java": "class MyHashMap {\n    public MyHashMap() {\n        \n    }\n\n    public void put(int key, int value) {\n        \n    }\n\n    public int get(int key) {\n        \n    }\n\n    public void remove(int key) {\n        \n    }\n}",
            "cpp": "class MyHashMap {\npublic:\n    MyHashMap() {\n        \n    }\n\n    void put(int key, int value) {\n        \n    }\n\n    int get(int key) {\n        \n    }\n\n    void remove(int key) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"MyHashMap\",\"put\",\"put\",\"get\",\"get\",\"put\",\"get\",\"remove\",\"get\"]\n[[],[1,1],[2,2],[1],[3],[2,1],[2],[2],[2]]", "expected_output": "[null,null,null,1,-1,null,1,null,-1]", "is_sample": True},
            {"input": "[\"MyHashMap\",\"put\",\"get\"]\n[[],[100,100],[100]]", "expected_output": "[null,null,100]", "is_sample": True},
            {"input": "[\"MyHashMap\",\"put\",\"put\",\"get\",\"remove\",\"get\"]\n[[],[5,10],[5,20],[5],[5],[5]]", "expected_output": "[null,null,null,20,null,-1]", "is_sample": False},
        ],
    },
    # ─── 17. Design HashSet ────────────────────────────────────────────────
    {
        "title": "Design HashSet",
        "difficulty": "easy",
        "tags": ["design", "hash-table"],
        "companies": ["amazon", "microsoft"],
        "description": "Design a HashSet without using any built-in hash table libraries. Implement `MyHashSet` with `add(key)`, `remove(key)`, and `contains(key)`.\n\nExample:\nInput: [\"MyHashSet\",\"add\",\"add\",\"contains\",\"contains\",\"add\",\"contains\",\"remove\",\"contains\"]\n[[],[1],[2],[1],[3],[2],[2],[2],[2]]\nOutput: [null,null,null,true,false,null,true,null,false]",
        "constraints": "0 <= key <= 10^6\nAt most 10^4 calls will be made to add, remove, and contains.",
        "hints": "Use an array of buckets with chaining. Use a hash function (key % bucket_size) to distribute keys across buckets.",
        "starter_code": {
            "python": "class MyHashSet:\n    def __init__(self):\n        pass\n\n    def add(self, key: int) -> None:\n        pass\n\n    def remove(self, key: int) -> None:\n        pass\n\n    def contains(self, key: int) -> bool:\n        pass",
            "javascript": "var MyHashSet = function() {\n    \n};\n\nMyHashSet.prototype.add = function(key) {\n    \n};\n\nMyHashSet.prototype.remove = function(key) {\n    \n};\n\nMyHashSet.prototype.contains = function(key) {\n    \n};",
            "java": "class MyHashSet {\n    public MyHashSet() {\n        \n    }\n\n    public void add(int key) {\n        \n    }\n\n    public void remove(int key) {\n        \n    }\n\n    public boolean contains(int key) {\n        \n    }\n}",
            "cpp": "class MyHashSet {\npublic:\n    MyHashSet() {\n        \n    }\n\n    void add(int key) {\n        \n    }\n\n    void remove(int key) {\n        \n    }\n\n    bool contains(int key) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"MyHashSet\",\"add\",\"add\",\"contains\",\"contains\",\"add\",\"contains\",\"remove\",\"contains\"]\n[[],[1],[2],[1],[3],[2],[2],[2],[2]]", "expected_output": "[null,null,null,true,false,null,true,null,false]", "is_sample": True},
            {"input": "[\"MyHashSet\",\"add\",\"contains\",\"remove\",\"contains\"]\n[[],[10],[10],[10],[10]]", "expected_output": "[null,null,true,null,false]", "is_sample": True},
            {"input": "[\"MyHashSet\",\"add\",\"add\",\"add\",\"contains\",\"contains\"]\n[[],[1],[1],[2],[1],[3]]", "expected_output": "[null,null,null,null,true,false]", "is_sample": False},
        ],
    },
    # ─── 18. Design Circular Queue ─────────────────────────────────────────
    {
        "title": "Design Circular Queue",
        "difficulty": "medium",
        "tags": ["design", "queue"],
        "companies": ["amazon", "microsoft", "meta"],
        "description": "Design your implementation of the circular queue. The circular queue is a linear data structure where operations are performed based on FIFO principle, and the last position is connected back to the first position to make a circle.\n\nExample:\nInput: [\"MyCircularQueue\",\"enQueue\",\"enQueue\",\"enQueue\",\"enQueue\",\"Rear\",\"isFull\",\"deQueue\",\"enQueue\",\"Rear\"]\n[[3],[1],[2],[3],[4],[],[],[],[4],[]]\nOutput: [null,true,true,true,false,3,true,true,true,4]",
        "constraints": "1 <= k <= 1000\n0 <= value <= 1000\nAt most 3000 calls will be made to enQueue, deQueue, Front, Rear, isEmpty, and isFull.",
        "hints": "Use a fixed-size array with head and tail pointers. Track the current count to distinguish between empty and full states.",
        "starter_code": {
            "python": "class MyCircularQueue:\n    def __init__(self, k: int):\n        pass\n\n    def enQueue(self, value: int) -> bool:\n        pass\n\n    def deQueue(self) -> bool:\n        pass\n\n    def Front(self) -> int:\n        pass\n\n    def Rear(self) -> int:\n        pass\n\n    def isEmpty(self) -> bool:\n        pass\n\n    def isFull(self) -> bool:\n        pass",
            "javascript": "var MyCircularQueue = function(k) {\n    \n};\n\nMyCircularQueue.prototype.enQueue = function(value) {\n    \n};\n\nMyCircularQueue.prototype.deQueue = function() {\n    \n};\n\nMyCircularQueue.prototype.Front = function() {\n    \n};\n\nMyCircularQueue.prototype.Rear = function() {\n    \n};\n\nMyCircularQueue.prototype.isEmpty = function() {\n    \n};\n\nMyCircularQueue.prototype.isFull = function() {\n    \n};",
            "java": "class MyCircularQueue {\n    public MyCircularQueue(int k) {\n        \n    }\n\n    public boolean enQueue(int value) {\n        \n    }\n\n    public boolean deQueue() {\n        \n    }\n\n    public int Front() {\n        \n    }\n\n    public int Rear() {\n        \n    }\n\n    public boolean isEmpty() {\n        \n    }\n\n    public boolean isFull() {\n        \n    }\n}",
            "cpp": "class MyCircularQueue {\npublic:\n    MyCircularQueue(int k) {\n        \n    }\n\n    bool enQueue(int value) {\n        \n    }\n\n    bool deQueue() {\n        \n    }\n\n    int Front() {\n        \n    }\n\n    int Rear() {\n        \n    }\n\n    bool isEmpty() {\n        \n    }\n\n    bool isFull() {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"MyCircularQueue\",\"enQueue\",\"enQueue\",\"enQueue\",\"enQueue\",\"Rear\",\"isFull\",\"deQueue\",\"enQueue\",\"Rear\"]\n[[3],[1],[2],[3],[4],[],[],[],[4],[]]", "expected_output": "[null,true,true,true,false,3,true,true,true,4]", "is_sample": True},
            {"input": "[\"MyCircularQueue\",\"enQueue\",\"deQueue\",\"Front\"]\n[[1],[5],[],[]]", "expected_output": "[null,true,true,-1]", "is_sample": True},
            {"input": "[\"MyCircularQueue\",\"isEmpty\",\"enQueue\",\"isEmpty\",\"isFull\"]\n[[2],[],[1],[],[]]", "expected_output": "[null,true,true,false,false]", "is_sample": False},
        ],
    },
    # ─── 19. Design Twitter ────────────────────────────────────────────────
    {
        "title": "Design Twitter",
        "difficulty": "medium",
        "tags": ["design", "heap", "hash-table"],
        "companies": ["amazon", "uber", "bytedance"],
        "description": "Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and view the 10 most recent tweets in the user's news feed (from themselves and followed users).\n\nExample:\nInput: [\"Twitter\",\"postTweet\",\"getNewsFeed\",\"follow\",\"getNewsFeed\",\"unfollow\",\"getNewsFeed\"]\n[[],[1,5],[1],[1,2],[1],[1,2],[1]]\nOutput: [null,null,[5],null,[5],null,[5]]",
        "constraints": "1 <= userId, followerId, followeeId <= 500\n0 <= tweetId <= 10^4\nAll tweets have unique IDs.\nAt most 3 * 10^4 total calls to the functions.",
        "hints": "Use a hash map for user follow lists and a timestamped tweet list. For getNewsFeed, merge the latest tweets from the user and their followees using a max-heap.",
        "starter_code": {
            "python": "class Twitter:\n    def __init__(self):\n        pass\n\n    def postTweet(self, userId: int, tweetId: int) -> None:\n        pass\n\n    def getNewsFeed(self, userId: int) -> list[int]:\n        pass\n\n    def follow(self, followerId: int, followeeId: int) -> None:\n        pass\n\n    def unfollow(self, followerId: int, followeeId: int) -> None:\n        pass",
            "javascript": "var Twitter = function() {\n    \n};\n\nTwitter.prototype.postTweet = function(userId, tweetId) {\n    \n};\n\nTwitter.prototype.getNewsFeed = function(userId) {\n    \n};\n\nTwitter.prototype.follow = function(followerId, followeeId) {\n    \n};\n\nTwitter.prototype.unfollow = function(followerId, followeeId) {\n    \n};",
            "java": "class Twitter {\n    public Twitter() {\n        \n    }\n\n    public void postTweet(int userId, int tweetId) {\n        \n    }\n\n    public List<Integer> getNewsFeed(int userId) {\n        \n    }\n\n    public void follow(int followerId, int followeeId) {\n        \n    }\n\n    public void unfollow(int followerId, int followeeId) {\n        \n    }\n}",
            "cpp": "class Twitter {\npublic:\n    Twitter() {\n        \n    }\n\n    void postTweet(int userId, int tweetId) {\n        \n    }\n\n    vector<int> getNewsFeed(int userId) {\n        \n    }\n\n    void follow(int followerId, int followeeId) {\n        \n    }\n\n    void unfollow(int followerId, int followeeId) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"Twitter\",\"postTweet\",\"getNewsFeed\",\"follow\",\"getNewsFeed\",\"unfollow\",\"getNewsFeed\"]\n[[],[1,5],[1],[1,2],[1],[1,2],[1]]", "expected_output": "[null,null,[5],null,[5],null,[5]]", "is_sample": True},
            {"input": "[\"Twitter\",\"postTweet\",\"postTweet\",\"getNewsFeed\"]\n[[],[1,1],[1,2],[1]]", "expected_output": "[null,null,null,[2,1]]", "is_sample": True},
            {"input": "[\"Twitter\",\"postTweet\",\"postTweet\",\"follow\",\"getNewsFeed\"]\n[[],[1,10],[2,20],[1,2],[1]]", "expected_output": "[null,null,null,null,[20,10]]", "is_sample": False},
        ],
    },
    # ─── 20. Design Underground System ─────────────────────────────────────
    {
        "title": "Design Underground System",
        "difficulty": "medium",
        "tags": ["design", "hash-table"],
        "companies": ["amazon", "uber", "lyft", "bytedance"],
        "description": "An underground railway system tracks customer travel times between stations. Implement `checkIn(id, stationName, t)`, `checkOut(id, stationName, t)`, and `getAverageTime(startStation, endStation)` which returns the average travel time between two stations.\n\nExample:\nInput: [\"UndergroundSystem\",\"checkIn\",\"checkOut\",\"getAverageTime\"]\n[[],[1,\"A\",3],[1,\"B\",8],[\"A\",\"B\"]]\nOutput: [null,null,null,5.0]",
        "constraints": "1 <= id, t <= 10^6\n1 <= stationName.length <= 10\nAll calls to checkIn and checkOut are consistent.\nAt least one call to getAverageTime before it is called for a route.",
        "hints": "Use one hash map to store ongoing trips (id -> start info) and another to accumulate total time and count for each route pair.",
        "starter_code": {
            "python": "class UndergroundSystem:\n    def __init__(self):\n        pass\n\n    def checkIn(self, id: int, stationName: str, t: int) -> None:\n        pass\n\n    def checkOut(self, id: int, stationName: str, t: int) -> None:\n        pass\n\n    def getAverageTime(self, startStation: str, endStation: str) -> float:\n        pass",
            "javascript": "var UndergroundSystem = function() {\n    \n};\n\nUndergroundSystem.prototype.checkIn = function(id, stationName, t) {\n    \n};\n\nUndergroundSystem.prototype.checkOut = function(id, stationName, t) {\n    \n};\n\nUndergroundSystem.prototype.getAverageTime = function(startStation, endStation) {\n    \n};",
            "java": "class UndergroundSystem {\n    public UndergroundSystem() {\n        \n    }\n\n    public void checkIn(int id, String stationName, int t) {\n        \n    }\n\n    public void checkOut(int id, String stationName, int t) {\n        \n    }\n\n    public double getAverageTime(String startStation, String endStation) {\n        \n    }\n}",
            "cpp": "class UndergroundSystem {\npublic:\n    UndergroundSystem() {\n        \n    }\n\n    void checkIn(int id, string stationName, int t) {\n        \n    }\n\n    void checkOut(int id, string stationName, int t) {\n        \n    }\n\n    double getAverageTime(string startStation, string endStation) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"UndergroundSystem\",\"checkIn\",\"checkOut\",\"getAverageTime\"]\n[[],[1,\"A\",3],[1,\"B\",8],[\"A\",\"B\"]]", "expected_output": "[null,null,null,5.00000]", "is_sample": True},
            {"input": "[\"UndergroundSystem\",\"checkIn\",\"checkOut\",\"checkIn\",\"checkOut\",\"getAverageTime\"]\n[[],[1,\"A\",3],[1,\"B\",8],[2,\"A\",5],[2,\"B\",15],[\"A\",\"B\"]]", "expected_output": "[null,null,null,null,null,7.50000]", "is_sample": True},
            {"input": "[\"UndergroundSystem\",\"checkIn\",\"checkOut\",\"getAverageTime\",\"checkIn\",\"checkOut\",\"getAverageTime\"]\n[[],[1,\"X\",1],[1,\"Y\",4],[\"X\",\"Y\"],[2,\"X\",2],[2,\"Y\",8],[\"X\",\"Y\"]]", "expected_output": "[null,null,null,3.00000,null,null,4.50000]", "is_sample": False},
        ],
    },
    # ─── 21. Design Browser History ────────────────────────────────────────
    {
        "title": "Design Browser History",
        "difficulty": "medium",
        "tags": ["design", "stack"],
        "companies": ["amazon", "microsoft", "uber"],
        "description": "Design a browser history system that supports `visit(url)`, `back(steps)`, and `forward(steps)`. Visiting a new URL clears all forward history.\n\nExample:\nInput: [\"BrowserHistory\",\"visit\",\"visit\",\"visit\",\"back\",\"back\",\"forward\",\"visit\",\"forward\",\"back\",\"back\"]\n[[\"leetcode.com\"],[\"google.com\"],[\"facebook.com\"],[\"youtube.com\"],[1],[1],[1],[\"linkedin.com\"],[2],[2],[7]]\nOutput: [null,null,null,null,\"facebook.com\",\"google.com\",\"facebook.com\",null,\"linkedin.com\",\"google.com\",\"leetcode.com\"]",
        "constraints": "1 <= homepage.length <= 20\n1 <= url.length <= 20\n1 <= steps <= 100\nAt most 5000 calls will be made to visit, back, and forward.",
        "hints": "Use a list to store the history and a pointer for the current position. On visit, truncate any forward history. On back/forward, move the pointer but clamp to bounds.",
        "starter_code": {
            "python": "class BrowserHistory:\n    def __init__(self, homepage: str):\n        pass\n\n    def visit(self, url: str) -> None:\n        pass\n\n    def back(self, steps: int) -> str:\n        pass\n\n    def forward(self, steps: int) -> str:\n        pass",
            "javascript": "var BrowserHistory = function(homepage) {\n    \n};\n\nBrowserHistory.prototype.visit = function(url) {\n    \n};\n\nBrowserHistory.prototype.back = function(steps) {\n    \n};\n\nBrowserHistory.prototype.forward = function(steps) {\n    \n};",
            "java": "class BrowserHistory {\n    public BrowserHistory(String homepage) {\n        \n    }\n\n    public void visit(String url) {\n        \n    }\n\n    public String back(int steps) {\n        \n    }\n\n    public String forward(int steps) {\n        \n    }\n}",
            "cpp": "class BrowserHistory {\npublic:\n    BrowserHistory(string homepage) {\n        \n    }\n\n    void visit(string url) {\n        \n    }\n\n    string back(int steps) {\n        \n    }\n\n    string forward(int steps) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"BrowserHistory\",\"visit\",\"visit\",\"visit\",\"back\",\"back\",\"forward\",\"visit\",\"forward\",\"back\",\"back\"]\n[[\"leetcode.com\"],[\"google.com\"],[\"facebook.com\"],[\"youtube.com\"],[1],[1],[1],[\"linkedin.com\"],[2],[2],[7]]", "expected_output": "[null,null,null,null,\"facebook.com\",\"google.com\",\"facebook.com\",null,\"linkedin.com\",\"google.com\",\"leetcode.com\"]", "is_sample": True},
            {"input": "[\"BrowserHistory\",\"visit\",\"back\",\"forward\"]\n[[\"home.com\"],[\"a.com\"],[1],[1]]", "expected_output": "[null,null,\"home.com\",\"a.com\"]", "is_sample": True},
            {"input": "[\"BrowserHistory\",\"back\",\"forward\"]\n[[\"start.com\"],[5],[5]]", "expected_output": "[null,\"start.com\",\"start.com\"]", "is_sample": False},
        ],
    },
    # ─── 22. Snapshot Array ────────────────────────────────────────────────
    {
        "title": "Snapshot Array",
        "difficulty": "medium",
        "tags": ["design", "binary-search"],
        "companies": ["google", "meta", "uber", "bytedance"],
        "description": "Implement a SnapshotArray that supports `set(index, val)`, `snap()` (takes a snapshot and returns the snap_id), and `get(index, snap_id)` (returns the value at the given index for the given snapshot).\n\nExample:\nInput: [\"SnapshotArray\",\"set\",\"snap\",\"set\",\"get\"]\n[[3],[0,5],[],[0,6],[0,0]]\nOutput: [null,null,0,null,5]",
        "constraints": "1 <= length <= 5 * 10^4\n0 <= index < length\n0 <= val <= 10^9\n0 <= snap_id < (the total number of times we call snap())\nAt most 5 * 10^4 calls will be made to set, snap, and get.",
        "hints": "Store changes as a list of (snap_id, val) pairs for each index. Use binary search on get to find the value at or before the given snap_id.",
        "starter_code": {
            "python": "class SnapshotArray:\n    def __init__(self, length: int):\n        pass\n\n    def set(self, index: int, val: int) -> None:\n        pass\n\n    def snap(self) -> int:\n        pass\n\n    def get(self, index: int, snap_id: int) -> int:\n        pass",
            "javascript": "var SnapshotArray = function(length) {\n    \n};\n\nSnapshotArray.prototype.set = function(index, val) {\n    \n};\n\nSnapshotArray.prototype.snap = function() {\n    \n};\n\nSnapshotArray.prototype.get = function(index, snap_id) {\n    \n};",
            "java": "class SnapshotArray {\n    public SnapshotArray(int length) {\n        \n    }\n\n    public void set(int index, int val) {\n        \n    }\n\n    public int snap() {\n        \n    }\n\n    public int get(int index, int snap_id) {\n        \n    }\n}",
            "cpp": "class SnapshotArray {\npublic:\n    SnapshotArray(int length) {\n        \n    }\n\n    void set(int index, int val) {\n        \n    }\n\n    int snap() {\n        \n    }\n\n    int get(int index, int snap_id) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"SnapshotArray\",\"set\",\"snap\",\"set\",\"get\"]\n[[3],[0,5],[],[0,6],[0,0]]", "expected_output": "[null,null,0,null,5]", "is_sample": True},
            {"input": "[\"SnapshotArray\",\"set\",\"snap\",\"get\"]\n[[1],[0,15],[],[0,0]]", "expected_output": "[null,null,0,15]", "is_sample": True},
            {"input": "[\"SnapshotArray\",\"snap\",\"get\"]\n[[2],[],[1,0]]", "expected_output": "[null,0,0]", "is_sample": False},
        ],
    },
    # ─── 23. Time Based Key-Value Store ────────────────────────────────────
    {
        "title": "Time Based Key-Value Store",
        "difficulty": "medium",
        "tags": ["design", "binary-search", "hash-table"],
        "companies": ["google", "amazon", "lyft", "stripe"],
        "description": "Design a time-based key-value data structure that can store multiple values for the same key at different timestamps and retrieve the key's value at a certain timestamp. Implement `set(key, value, timestamp)` and `get(key, timestamp)` which returns the value with the largest timestamp <= given timestamp, or empty string if none.\n\nExample:\nInput: [\"TimeMap\",\"set\",\"get\",\"get\",\"set\",\"get\",\"get\"]\n[[],[\"foo\",\"bar\",1],[\"foo\",1],[\"foo\",3],[\"foo\",\"bar2\",4],[\"foo\",4],[\"foo\",5]]\nOutput: [null,null,\"bar\",\"bar\",null,\"bar2\",\"bar2\"]",
        "constraints": "1 <= key.length, value.length <= 100\nkey and value consist of lowercase English letters and digits.\n1 <= timestamp <= 10^7\nAll timestamps of set are strictly increasing.\nAt most 2 * 10^5 calls will be made to set and get.",
        "hints": "Store (timestamp, value) pairs in a list for each key. Since timestamps are strictly increasing, use binary search on get.",
        "starter_code": {
            "python": "class TimeMap:\n    def __init__(self):\n        pass\n\n    def set(self, key: str, value: str, timestamp: int) -> None:\n        pass\n\n    def get(self, key: str, timestamp: int) -> str:\n        pass",
            "javascript": "var TimeMap = function() {\n    \n};\n\nTimeMap.prototype.set = function(key, value, timestamp) {\n    \n};\n\nTimeMap.prototype.get = function(key, timestamp) {\n    \n};",
            "java": "class TimeMap {\n    public TimeMap() {\n        \n    }\n\n    public void set(String key, String value, int timestamp) {\n        \n    }\n\n    public String get(String key, int timestamp) {\n        \n    }\n}",
            "cpp": "class TimeMap {\npublic:\n    TimeMap() {\n        \n    }\n\n    void set(string key, string value, int timestamp) {\n        \n    }\n\n    string get(string key, int timestamp) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"TimeMap\",\"set\",\"get\",\"get\",\"set\",\"get\",\"get\"]\n[[],[\"foo\",\"bar\",1],[\"foo\",1],[\"foo\",3],[\"foo\",\"bar2\",4],[\"foo\",4],[\"foo\",5]]", "expected_output": "[null,null,\"bar\",\"bar\",null,\"bar2\",\"bar2\"]", "is_sample": True},
            {"input": "[\"TimeMap\",\"set\",\"get\"]\n[[],[\"k\",\"v\",10],[\"k\",5]]", "expected_output": "[null,null,\"\"]", "is_sample": True},
            {"input": "[\"TimeMap\",\"set\",\"set\",\"get\",\"get\"]\n[[],[\"a\",\"x\",1],[\"a\",\"y\",2],[\"a\",1],[\"a\",3]]", "expected_output": "[null,null,null,\"x\",\"y\"]", "is_sample": False},
        ],
    },
    # ─── 24. Random Pick with Weight ───────────────────────────────────────
    {
        "title": "Random Pick with Weight",
        "difficulty": "medium",
        "tags": ["design", "binary-search", "math"],
        "companies": ["meta", "google", "uber", "lyft"],
        "description": "You are given a 0-indexed array of positive integers `w` where `w[i]` describes the weight of the i-th index. Implement `pickIndex()` which randomly picks an index in the range `[0, w.length - 1]` (inclusive) proportional to its weight.\n\nExample:\nInput: [\"Solution\",\"pickIndex\",\"pickIndex\",\"pickIndex\"]\n[[[1,3]],[],[],[]]\nOutput: [null,1,1,1]\nExplanation: Index 1 has a 3/4 chance of being picked.",
        "constraints": "1 <= w.length <= 10^4\n1 <= w[i] <= 10^5\npickIndex will be called at most 10^4 times.",
        "hints": "Build a prefix sum array. Generate a random number in [1, totalSum] and use binary search to find the corresponding index.",
        "starter_code": {
            "python": "class Solution:\n    def __init__(self, w: list[int]):\n        pass\n\n    def pickIndex(self) -> int:\n        pass",
            "javascript": "var Solution = function(w) {\n    \n};\n\nSolution.prototype.pickIndex = function() {\n    \n};",
            "java": "class Solution {\n    public Solution(int[] w) {\n        \n    }\n\n    public int pickIndex() {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    Solution(vector<int>& w) {\n        \n    }\n\n    int pickIndex() {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"Solution\",\"pickIndex\"]\n[[[1]],[]]", "expected_output": "[null,0]", "is_sample": True},
            {"input": "[\"Solution\",\"pickIndex\",\"pickIndex\",\"pickIndex\"]\n[[[1,3]],[],[],[]]", "expected_output": "[null,1,1,1]", "is_sample": True},
            {"input": "[\"Solution\",\"pickIndex\",\"pickIndex\"]\n[[[3,1,2]],[],[]]", "expected_output": "[null,0,0]", "is_sample": False},
        ],
    },
    # ─── 25. Game of Life ──────────────────────────────────────────────────
    {
        "title": "Game of Life",
        "difficulty": "medium",
        "tags": ["matrix", "simulation"],
        "companies": ["google", "amazon", "snap", "dropbox"],
        "description": "The Board of Game of Life is an m x n grid of cells, where each cell has an initial state: live (1) or dead (0). Each cell interacts with its eight neighbors. Apply the four rules simultaneously to every cell and update the board in-place.\n\nExample 1:\nInput: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]\nOutput: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]\n\nExample 2:\nInput: board = [[1,1],[1,0]]\nOutput: [[1,1],[1,1]]",
        "constraints": "m == board.length\nn == board[i].length\n1 <= m, n <= 25\nboard[i][j] is 0 or 1.",
        "hints": "Use intermediate states to encode transitions in-place: 2 for live->dead, 3 for dead->live. Then do a final pass to convert to 0s and 1s.",
        "starter_code": {
            "python": "class Solution:\n    def gameOfLife(self, board: list[list[int]]) -> None:\n        pass",
            "javascript": "var gameOfLife = function(board) {\n    \n};",
            "java": "class Solution {\n    public void gameOfLife(int[][] board) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void gameOfLife(vector<vector<int>>& board) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[0,1,0],[0,0,1],[1,1,1],[0,0,0]]", "expected_output": "[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]", "is_sample": True},
            {"input": "[[1,1],[1,0]]", "expected_output": "[[1,1],[1,1]]", "is_sample": True},
            {"input": "[[0,0,0],[0,1,0],[0,0,0]]", "expected_output": "[[0,0,0],[0,0,0],[0,0,0]]", "is_sample": False},
        ],
    },
    # ─── 26. Spiral Matrix II ──────────────────────────────────────────────
    {
        "title": "Spiral Matrix II",
        "difficulty": "medium",
        "tags": ["matrix", "simulation"],
        "companies": ["amazon", "microsoft", "adobe"],
        "description": "Given a positive integer `n`, generate an `n x n` matrix filled with elements from 1 to n^2 in spiral order.\n\nExample 1:\nInput: n = 3\nOutput: [[1,2,3],[8,9,4],[7,6,5]]\n\nExample 2:\nInput: n = 1\nOutput: [[1]]",
        "constraints": "1 <= n <= 20",
        "hints": "Simulate the spiral traversal using four boundaries (top, bottom, left, right). Fill numbers sequentially while shrinking boundaries after each direction.",
        "starter_code": {
            "python": "class Solution:\n    def generateMatrix(self, n: int) -> list[list[int]]:\n        pass",
            "javascript": "var generateMatrix = function(n) {\n    \n};",
            "java": "class Solution {\n    public int[][] generateMatrix(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> generateMatrix(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "3", "expected_output": "[[1,2,3],[8,9,4],[7,6,5]]", "is_sample": True},
            {"input": "1", "expected_output": "[[1]]", "is_sample": True},
            {"input": "4", "expected_output": "[[1,2,3,4],[12,13,14,5],[11,16,15,6],[10,9,8,7]]", "is_sample": False},
        ],
    },
    # ─── 27. Reshape the Matrix ────────────────────────────────────────────
    {
        "title": "Reshape the Matrix",
        "difficulty": "easy",
        "tags": ["matrix"],
        "companies": ["amazon", "microsoft"],
        "description": "You are given an `m x n` matrix `mat` and two integers `r` and `c` representing the number of rows and columns of the wanted reshaped matrix. If the reshape operation is possible and legal, output the new reshaped matrix; otherwise, output the original matrix.\n\nExample 1:\nInput: mat = [[1,2],[3,4]], r = 1, c = 4\nOutput: [[1,2,3,4]]\n\nExample 2:\nInput: mat = [[1,2],[3,4]], r = 2, c = 4\nOutput: [[1,2],[3,4]]",
        "constraints": "m == mat.length\nn == mat[i].length\n1 <= m, n <= 100\n-1000 <= mat[i][j] <= 1000\n1 <= r, c <= 300",
        "hints": "Flatten the matrix into a 1D list and then reshape it into r rows and c columns. Check if m*n == r*c first.",
        "starter_code": {
            "python": "class Solution:\n    def matrixReshape(self, mat: list[list[int]], r: int, c: int) -> list[list[int]]:\n        pass",
            "javascript": "var matrixReshape = function(mat, r, c) {\n    \n};",
            "java": "class Solution {\n    public int[][] matrixReshape(int[][] mat, int r, int c) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> matrixReshape(vector<vector<int>>& mat, int r, int c) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2],[3,4]]\n1\n4", "expected_output": "[[1,2,3,4]]", "is_sample": True},
            {"input": "[[1,2],[3,4]]\n2\n4", "expected_output": "[[1,2],[3,4]]", "is_sample": True},
            {"input": "[[1,2,3,4]]\n2\n2", "expected_output": "[[1,2],[3,4]]", "is_sample": False},
        ],
    },
    # ─── 28. Toeplitz Matrix ───────────────────────────────────────────────
    {
        "title": "Toeplitz Matrix",
        "difficulty": "easy",
        "tags": ["matrix"],
        "companies": ["meta", "google"],
        "description": "Given an `m x n` matrix, return `true` if the matrix is Toeplitz. A matrix is Toeplitz if every diagonal from top-left to bottom-right has the same elements.\n\nExample 1:\nInput: matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]\nOutput: true\n\nExample 2:\nInput: matrix = [[1,2],[2,2]]\nOutput: false",
        "constraints": "m == matrix.length\nn == matrix[i].length\n1 <= m, n <= 20\n0 <= matrix[i][j] <= 99",
        "hints": "Compare each element with the element at the top-left diagonal position. For every cell (i, j) where i > 0 and j > 0, check matrix[i][j] == matrix[i-1][j-1].",
        "starter_code": {
            "python": "class Solution:\n    def isToeplitzMatrix(self, matrix: list[list[int]]) -> bool:\n        pass",
            "javascript": "var isToeplitzMatrix = function(matrix) {\n    \n};",
            "java": "class Solution {\n    public boolean isToeplitzMatrix(int[][] matrix) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isToeplitzMatrix(vector<vector<int>>& matrix) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2,3,4],[5,1,2,3],[9,5,1,2]]", "expected_output": "true", "is_sample": True},
            {"input": "[[1,2],[2,2]]", "expected_output": "false", "is_sample": True},
            {"input": "[[7]]", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 29. Diagonal Traverse ─────────────────────────────────────────────
    {
        "title": "Diagonal Traverse",
        "difficulty": "medium",
        "tags": ["matrix", "simulation"],
        "companies": ["meta", "google", "amazon"],
        "description": "Given an `m x n` matrix `mat`, return an array of all the elements of the matrix in a diagonal order.\n\nExample 1:\nInput: mat = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [1,2,4,7,5,3,6,8,9]\n\nExample 2:\nInput: mat = [[1,2],[3,4]]\nOutput: [1,2,3,4]",
        "constraints": "m == mat.length\nn == mat[i].length\n1 <= m, n <= 10^4\n1 <= m * n <= 10^4\n-10^5 <= mat[i][j] <= 10^5",
        "hints": "Track the direction (up-right or down-left). When you hit a boundary, change direction and adjust the starting position accordingly.",
        "starter_code": {
            "python": "class Solution:\n    def findDiagonalOrder(self, mat: list[list[int]]) -> list[int]:\n        pass",
            "javascript": "var findDiagonalOrder = function(mat) {\n    \n};",
            "java": "class Solution {\n    public int[] findDiagonalOrder(int[][] mat) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> findDiagonalOrder(vector<vector<int>>& mat) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2,3],[4,5,6],[7,8,9]]", "expected_output": "[1,2,4,7,5,3,6,8,9]", "is_sample": True},
            {"input": "[[1,2],[3,4]]", "expected_output": "[1,2,3,4]", "is_sample": True},
            {"input": "[[1]]", "expected_output": "[1]", "is_sample": False},
        ],
    },
    # ─── 30. Kth Smallest Element in a Sorted Matrix ───────────────────────
    {
        "title": "Kth Smallest Element in a Sorted Matrix",
        "difficulty": "medium",
        "tags": ["matrix", "binary-search", "heap"],
        "companies": ["amazon", "meta", "google", "microsoft"],
        "description": "Given an `n x n` matrix where each of the rows and columns is sorted in ascending order, return the kth smallest element in the matrix. Note that it is the kth smallest element in the sorted order, not the kth distinct element.\n\nExample 1:\nInput: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8\nOutput: 13\n\nExample 2:\nInput: matrix = [[-5]], k = 1\nOutput: -5",
        "constraints": "n == matrix.length == matrix[i].length\n1 <= n <= 300\n-10^9 <= matrix[i][j] <= 10^9\nAll rows and columns are sorted in non-decreasing order.\n1 <= k <= n^2",
        "hints": "Use binary search on the value range. For each mid value, count how many elements are <= mid by traversing from the bottom-left corner.",
        "starter_code": {
            "python": "class Solution:\n    def kthSmallest(self, matrix: list[list[int]], k: int) -> int:\n        pass",
            "javascript": "var kthSmallest = function(matrix, k) {\n    \n};",
            "java": "class Solution {\n    public int kthSmallest(int[][] matrix, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int kthSmallest(vector<vector<int>>& matrix, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,5,9],[10,11,13],[12,13,15]]\n8", "expected_output": "13", "is_sample": True},
            {"input": "[[-5]]\n1", "expected_output": "-5", "is_sample": True},
            {"input": "[[1,2],[1,3]]\n3", "expected_output": "2", "is_sample": False},
        ],
    },
    # ─── 31. Search a 2D Matrix II ─────────────────────────────────────────
    {
        "title": "Search a 2D Matrix II",
        "difficulty": "medium",
        "tags": ["matrix", "binary-search"],
        "companies": ["amazon", "microsoft", "apple", "google"],
        "description": "Write an efficient algorithm that searches for a value `target` in an `m x n` integer matrix. The matrix has the following properties: integers in each row are sorted in ascending from left to right, and integers in each column are sorted in ascending from top to bottom.\n\nExample 1:\nInput: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5\nOutput: true\n\nExample 2:\nInput: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20\nOutput: false",
        "constraints": "m == matrix.length\nn == matrix[i].length\n1 <= n, m <= 300\n-10^9 <= matrix[i][j] <= 10^9\nAll rows and columns are sorted in ascending order.\n-10^9 <= target <= 10^9",
        "hints": "Start from the top-right corner. If the current element is greater than target, move left. If smaller, move down. This gives O(m + n) time.",
        "starter_code": {
            "python": "class Solution:\n    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:\n        pass",
            "javascript": "var searchMatrix = function(matrix, target) {\n    \n};",
            "java": "class Solution {\n    public boolean searchMatrix(int[][] matrix, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]\n5", "expected_output": "true", "is_sample": True},
            {"input": "[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]\n20", "expected_output": "false", "is_sample": True},
            {"input": "[[-1,3]]\n3", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 32. Sort Colors ──────────────────────────────────────────────────
    {
        "title": "Sort Colors",
        "difficulty": "medium",
        "tags": ["array", "sorting"],
        "companies": ["microsoft", "amazon", "meta", "adobe"],
        "description": "Given an array `nums` with `n` objects colored red, white, or blue (represented as 0, 1, and 2), sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. You must solve this problem without using the library's sort function.\n\nExample 1:\nInput: nums = [2,0,2,1,1,0]\nOutput: [0,0,1,1,2,2]\n\nExample 2:\nInput: nums = [2,0,1]\nOutput: [0,1,2]",
        "constraints": "n == nums.length\n1 <= n <= 300\nnums[i] is either 0, 1, or 2.",
        "hints": "Use the Dutch National Flag algorithm with three pointers (low, mid, high). Swap elements to partition the array into three sections in one pass.",
        "starter_code": {
            "python": "class Solution:\n    def sortColors(self, nums: list[int]) -> None:\n        pass",
            "javascript": "var sortColors = function(nums) {\n    \n};",
            "java": "class Solution {\n    public void sortColors(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void sortColors(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,0,2,1,1,0]", "expected_output": "[0,0,1,1,2,2]", "is_sample": True},
            {"input": "[2,0,1]", "expected_output": "[0,1,2]", "is_sample": True},
            {"input": "[0]", "expected_output": "[0]", "is_sample": False},
        ],
    },
    # ─── 33. Sort Array By Parity ──────────────────────────────────────────
    {
        "title": "Sort Array By Parity",
        "difficulty": "easy",
        "tags": ["array", "sorting"],
        "companies": ["meta", "amazon"],
        "description": "Given an integer array `nums`, move all the even integers at the beginning of the array followed by all the odd integers. Return any array that satisfies this condition.\n\nExample 1:\nInput: nums = [3,1,2,4]\nOutput: [2,4,3,1]\nExplanation: [4,2,3,1], [2,4,1,3], [4,2,1,3] would also be accepted.\n\nExample 2:\nInput: nums = [0]\nOutput: [0]",
        "constraints": "1 <= nums.length <= 5000\n0 <= nums[i] <= 5000",
        "hints": "Use two pointers from both ends. Swap an odd number from the left with an even number from the right.",
        "starter_code": {
            "python": "class Solution:\n    def sortArrayByParity(self, nums: list[int]) -> list[int]:\n        pass",
            "javascript": "var sortArrayByParity = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int[] sortArrayByParity(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> sortArrayByParity(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,1,2,4]", "expected_output": "[2,4,3,1]", "is_sample": True},
            {"input": "[0]", "expected_output": "[0]", "is_sample": True},
            {"input": "[2,4,6]", "expected_output": "[2,4,6]", "is_sample": False},
        ],
    },
    # ─── 34. H-Index ──────────────────────────────────────────────────────
    {
        "title": "H-Index",
        "difficulty": "medium",
        "tags": ["array", "sorting"],
        "companies": ["google", "meta", "amazon"],
        "description": "Given an array of integers `citations` where `citations[i]` is the number of citations a researcher received for their ith paper, return the researcher's h-index. The h-index is the maximum value of `h` such that the researcher has published at least `h` papers that have each been cited at least `h` times.\n\nExample 1:\nInput: citations = [3,0,6,1,5]\nOutput: 3\n\nExample 2:\nInput: citations = [1,3,1]\nOutput: 1",
        "constraints": "n == citations.length\n1 <= n <= 5000\n0 <= citations[i] <= 1000",
        "hints": "Sort the citations in descending order. The h-index is the largest h where citations[h-1] >= h.",
        "starter_code": {
            "python": "class Solution:\n    def hIndex(self, citations: list[int]) -> int:\n        pass",
            "javascript": "var hIndex = function(citations) {\n    \n};",
            "java": "class Solution {\n    public int hIndex(int[] citations) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int hIndex(vector<int>& citations) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,0,6,1,5]", "expected_output": "3", "is_sample": True},
            {"input": "[1,3,1]", "expected_output": "1", "is_sample": True},
            {"input": "[100]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 35. Interval List Intersections ───────────────────────────────────
    {
        "title": "Interval List Intersections",
        "difficulty": "medium",
        "tags": ["intervals"],
        "companies": ["meta", "google", "uber", "amazon"],
        "description": "You are given two lists of closed intervals, `firstList` and `secondList`, where each list is pairwise disjoint and in sorted order. Return the intersection of these two interval lists.\n\nExample 1:\nInput: firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]\nOutput: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]\n\nExample 2:\nInput: firstList = [[1,3],[5,9]], secondList = []\nOutput: []",
        "constraints": "0 <= firstList.length, secondList.length <= 1000\nfirstList[i].length == 2\nsecondList[j].length == 2\n0 <= starti < endi <= 10^9\n0 <= startj < endj <= 10^9",
        "hints": "Use two pointers, one for each list. The intersection of two intervals is [max(start1, start2), min(end1, end2)] when max(start) <= min(end). Advance the pointer with the smaller endpoint.",
        "starter_code": {
            "python": "class Solution:\n    def intervalIntersection(self, firstList: list[list[int]], secondList: list[list[int]]) -> list[list[int]]:\n        pass",
            "javascript": "var intervalIntersection = function(firstList, secondList) {\n    \n};",
            "java": "class Solution {\n    public int[][] intervalIntersection(int[][] firstList, int[][] secondList) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> intervalIntersection(vector<vector<int>>& firstList, vector<vector<int>>& secondList) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[0,2],[5,10],[13,23],[24,25]]\n[[1,5],[8,12],[15,24],[25,26]]", "expected_output": "[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]", "is_sample": True},
            {"input": "[[1,3],[5,9]]\n[]", "expected_output": "[]", "is_sample": True},
            {"input": "[[1,7]]\n[[3,10]]", "expected_output": "[[3,7]]", "is_sample": False},
        ],
    },
    # ─── 36. Employee Free Time ────────────────────────────────────────────
    {
        "title": "Employee Free Time",
        "difficulty": "hard",
        "tags": ["intervals", "sorting", "heap"],
        "companies": ["google", "amazon", "uber", "airbnb"],
        "description": "We are given a list `schedule` of employees, which represents the working time for each employee. Each employee has a list of non-overlapping intervals, and these intervals are in sorted order. Return the list of finite intervals representing common, positive-length free time for all employees.\n\nExample 1:\nInput: schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]\nOutput: [[3,4]]\n\nExample 2:\nInput: schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]\nOutput: [[5,6],[7,9]]",
        "constraints": "1 <= schedule.length, schedule[i].length <= 50\n0 <= start_i < end_i <= 10^8",
        "hints": "Flatten all intervals into one list and sort by start time. Then find gaps between merged intervals.",
        "starter_code": {
            "python": "class Solution:\n    def employeeFreeTime(self, schedule: list[list[list[int]]]) -> list[list[int]]:\n        pass",
            "javascript": "var employeeFreeTime = function(schedule) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> employeeFreeTime(List<List<List<Integer>>> schedule) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> employeeFreeTime(vector<vector<vector<int>>>& schedule) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[[1,2],[5,6]],[[1,3]],[[4,10]]]", "expected_output": "[[3,4]]", "is_sample": True},
            {"input": "[[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]", "expected_output": "[[5,6],[7,9]]", "is_sample": True},
            {"input": "[[[0,5]],[[5,10]]]", "expected_output": "[]", "is_sample": False},
        ],
    },
    # ─── 37. Minimum Number of Arrows to Burst Balloons ────────────────────
    {
        "title": "Minimum Number of Arrows to Burst Balloons",
        "difficulty": "medium",
        "tags": ["intervals", "sorting"],
        "companies": ["meta", "amazon", "microsoft"],
        "description": "There are some spherical balloons taped onto a flat wall represented by the XY-plane. The balloons are represented as a 2D integer array `points` where `points[i] = [x_start, x_end]` denotes a balloon whose horizontal diameter stretches between x_start and x_end. Arrows shot vertically from x positions burst all balloons they pass through. Return the minimum number of arrows to burst all balloons.\n\nExample 1:\nInput: points = [[10,16],[2,8],[1,6],[7,12]]\nOutput: 2\n\nExample 2:\nInput: points = [[1,2],[3,4],[5,6],[7,8]]\nOutput: 4",
        "constraints": "1 <= points.length <= 10^5\npoints[i].length == 2\n-2^31 <= x_start < x_end <= 2^31 - 1",
        "hints": "Sort balloons by their end coordinate. Greedily shoot an arrow at the end of the first balloon, and skip all balloons that this arrow already bursts.",
        "starter_code": {
            "python": "class Solution:\n    def findMinArrowShots(self, points: list[list[int]]) -> int:\n        pass",
            "javascript": "var findMinArrowShots = function(points) {\n    \n};",
            "java": "class Solution {\n    public int findMinArrowShots(int[][] points) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findMinArrowShots(vector<vector<int>>& points) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[10,16],[2,8],[1,6],[7,12]]", "expected_output": "2", "is_sample": True},
            {"input": "[[1,2],[3,4],[5,6],[7,8]]", "expected_output": "4", "is_sample": True},
            {"input": "[[1,2],[2,3],[3,4],[4,5]]", "expected_output": "2", "is_sample": False},
        ],
    },
    # ─── 38. Robot Bounded In Circle ───────────────────────────────────────
    {
        "title": "Robot Bounded In Circle",
        "difficulty": "medium",
        "tags": ["math", "simulation"],
        "companies": ["google", "amazon", "uber", "lyft"],
        "description": "On an infinite plane, a robot initially stands at (0, 0) facing north. The robot receives instructions: 'G' (go straight 1 unit), 'L' (turn 90 degrees left), 'R' (turn 90 degrees right). The robot performs the instructions repeatedly forever. Return `true` if and only if there exists a circle such that the robot never leaves the circle.\n\nExample 1:\nInput: instructions = \"GGLLGG\"\nOutput: true\n\nExample 2:\nInput: instructions = \"GG\"\nOutput: false",
        "constraints": "1 <= instructions.length <= 100\ninstructions[i] is 'G', 'L', or 'R'.",
        "hints": "After one cycle of instructions, the robot is bounded in a circle if and only if it returns to the origin OR it is not facing north (it will return after 2 or 4 cycles).",
        "starter_code": {
            "python": "class Solution:\n    def isRobotBounded(self, instructions: str) -> bool:\n        pass",
            "javascript": "var isRobotBounded = function(instructions) {\n    \n};",
            "java": "class Solution {\n    public boolean isRobotBounded(String instructions) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isRobotBounded(string instructions) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"GGLLGG\"", "expected_output": "true", "is_sample": True},
            {"input": "\"GG\"", "expected_output": "false", "is_sample": True},
            {"input": "\"GL\"", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 39. Angle Between Hands of a Clock ────────────────────────────────
    {
        "title": "Angle Between Hands of a Clock",
        "difficulty": "medium",
        "tags": ["math"],
        "companies": ["amazon", "microsoft", "apple"],
        "description": "Given two numbers, `hour` and `minutes`, return the smaller angle (in degrees) formed between the hour and the minute hand of a clock.\n\nExample 1:\nInput: hour = 12, minutes = 30\nOutput: 165.0\n\nExample 2:\nInput: hour = 3, minutes = 15\nOutput: 7.5",
        "constraints": "1 <= hour <= 12\n0 <= minutes <= 59",
        "hints": "The minute hand moves 6 degrees per minute. The hour hand moves 0.5 degrees per minute. Calculate both absolute positions and find the smaller angle between them.",
        "starter_code": {
            "python": "class Solution:\n    def angleClock(self, hour: int, minutes: int) -> float:\n        pass",
            "javascript": "var angleClock = function(hour, minutes) {\n    \n};",
            "java": "class Solution {\n    public double angleClock(int hour, int minutes) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    double angleClock(int hour, int minutes) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "12\n30", "expected_output": "165.0", "is_sample": True},
            {"input": "3\n15", "expected_output": "7.5", "is_sample": True},
            {"input": "6\n0", "expected_output": "180.0", "is_sample": False},
        ],
    },
    # ─── 40. Count Primes ──────────────────────────────────────────────────
    {
        "title": "Count Primes",
        "difficulty": "medium",
        "tags": ["math"],
        "companies": ["amazon", "microsoft", "apple", "adobe"],
        "description": "Given an integer `n`, return the number of prime numbers that are strictly less than `n`.\n\nExample 1:\nInput: n = 10\nOutput: 4\nExplanation: There are 4 prime numbers less than 10: 2, 3, 5, 7.\n\nExample 2:\nInput: n = 0\nOutput: 0",
        "constraints": "0 <= n <= 5 * 10^6",
        "hints": "Use the Sieve of Eratosthenes. Create a boolean array and mark multiples of each prime starting from 2.",
        "starter_code": {
            "python": "class Solution:\n    def countPrimes(self, n: int) -> int:\n        pass",
            "javascript": "var countPrimes = function(n) {\n    \n};",
            "java": "class Solution {\n    public int countPrimes(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int countPrimes(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "10", "expected_output": "4", "is_sample": True},
            {"input": "0", "expected_output": "0", "is_sample": True},
            {"input": "1000000", "expected_output": "78498", "is_sample": False},
        ],
    },
]

"""Batch 10: String advanced, Array advanced, Two Pointers, Sorting (~40 with company labels)."""

PROBLEMS_BATCH10 = [
    # ─── 1. Zigzag Conversion ──────────────────────────────────────────
    {
        "title": "Zigzag Conversion",
        "difficulty": "medium",
        "tags": ["string"],
        "companies": ["amazon", "microsoft", "adobe", "palantir"],
        "description": "The string \"PAYPALISHIRING\" is written in a zigzag pattern on a given number of rows. Given a string `s` and a number of rows `numRows`, return the string read line by line.\n\nExample 1:\nInput: s = \"PAYPALISHIRING\", numRows = 3\nOutput: \"PAHNAPLSIIGYIR\"\n\nExample 2:\nInput: s = \"PAYPALISHIRING\", numRows = 4\nOutput: \"PINALSIGYAHRPI\"",
        "constraints": "1 <= s.length <= 1000\ns consists of English letters, ',' and '.'.\n1 <= numRows <= 1000",
        "hints": "Simulate the zigzag by maintaining a list of strings for each row and toggling direction at the top and bottom rows.",
        "starter_code": {
            "python": "class Solution:\n    def convert(self, s: str, numRows: int) -> str:\n        pass",
            "javascript": "var convert = function(s, numRows) {\n    \n};",
            "java": "class Solution {\n    public String convert(String s, int numRows) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string convert(string s, int numRows) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"PAYPALISHIRING\"\n3", "expected_output": "\"PAHNAPLSIIGYIR\"", "is_sample": True},
            {"input": "\"PAYPALISHIRING\"\n4", "expected_output": "\"PINALSIGYAHRPI\"", "is_sample": True},
            {"input": "\"A\"\n1", "expected_output": "\"A\"", "is_sample": False},
        ],
    },
    # ─── 2. String Compression ─────────────────────────────────────────
    {
        "title": "String Compression",
        "difficulty": "medium",
        "tags": ["string", "two-pointers"],
        "companies": ["microsoft", "apple", "google", "snap"],
        "description": "Given an array of characters `chars`, compress it in-place using the following algorithm: begin with an empty string, then for each group of consecutive repeating characters append the character followed by the group's length (if greater than 1). Return the new length of the array.\n\nExample 1:\nInput: chars = [\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"]\nOutput: 6, chars = [\"a\",\"2\",\"b\",\"2\",\"c\",\"3\"]\n\nExample 2:\nInput: chars = [\"a\"]\nOutput: 1, chars = [\"a\"]",
        "constraints": "1 <= chars.length <= 2000\nchars[i] is a lowercase English letter, uppercase English letter, digit, or symbol.",
        "hints": "Use a read pointer and a write pointer. When the character changes, write the character and its count to the write position.",
        "starter_code": {
            "python": "class Solution:\n    def compress(self, chars: list[str]) -> int:\n        pass",
            "javascript": "var compress = function(chars) {\n    \n};",
            "java": "class Solution {\n    public int compress(char[] chars) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int compress(vector<char>& chars) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"a\",\"a\",\"b\",\"b\",\"c\",\"c\",\"c\"]", "expected_output": "6", "is_sample": True},
            {"input": "[\"a\"]", "expected_output": "1", "is_sample": True},
            {"input": "[\"a\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\",\"b\"]", "expected_output": "4", "is_sample": False},
        ],
    },
    # ─── 3. Count and Say ──────────────────────────────────────────────
    {
        "title": "Count and Say",
        "difficulty": "easy",
        "tags": ["string"],
        "companies": ["meta", "amazon", "microsoft", "uber"],
        "description": "The count-and-say sequence is a sequence of digit strings defined by the recursive formula: countAndSay(1) = \"1\", and countAndSay(n) is the run-length encoding of countAndSay(n - 1). Given a positive integer `n`, return the nth element of the count-and-say sequence.\n\nExample 1:\nInput: n = 1\nOutput: \"1\"\n\nExample 2:\nInput: n = 4\nOutput: \"1211\"",
        "constraints": "1 <= n <= 30",
        "hints": "Build each term iteratively by scanning the previous term and counting consecutive identical digits.",
        "starter_code": {
            "python": "class Solution:\n    def countAndSay(self, n: int) -> str:\n        pass",
            "javascript": "var countAndSay = function(n) {\n    \n};",
            "java": "class Solution {\n    public String countAndSay(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string countAndSay(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "1", "expected_output": "\"1\"", "is_sample": True},
            {"input": "4", "expected_output": "\"1211\"", "is_sample": True},
            {"input": "5", "expected_output": "\"111221\"", "is_sample": False},
        ],
    },
    # ─── 4. Compare Version Numbers ────────────────────────────────────
    {
        "title": "Compare Version Numbers",
        "difficulty": "medium",
        "tags": ["string"],
        "companies": ["microsoft", "amazon", "oracle", "adobe"],
        "description": "Given two version strings `version1` and `version2`, compare them. Return -1 if version1 < version2, 1 if version1 > version2, otherwise 0. Versions are strings of revisions separated by dots, where each revision is an integer that may have leading zeros which should be ignored.\n\nExample 1:\nInput: version1 = \"1.2\", version2 = \"1.10\"\nOutput: -1\n\nExample 2:\nInput: version1 = \"1.01\", version2 = \"1.001\"\nOutput: 0",
        "constraints": "1 <= version1.length, version2.length <= 500\nversion1 and version2 only contain digits and '.'.\nversion1 and version2 are valid version numbers.",
        "hints": "Split by '.', convert each part to integer, then compare element by element. Treat missing parts as 0.",
        "starter_code": {
            "python": "class Solution:\n    def compareVersion(self, version1: str, version2: str) -> int:\n        pass",
            "javascript": "var compareVersion = function(version1, version2) {\n    \n};",
            "java": "class Solution {\n    public int compareVersion(String version1, String version2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int compareVersion(string version1, string version2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"1.2\"\n\"1.10\"", "expected_output": "-1", "is_sample": True},
            {"input": "\"1.01\"\n\"1.001\"", "expected_output": "0", "is_sample": True},
            {"input": "\"1.0\"\n\"1.0.0.0\"", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 5. Repeated DNA Sequences ─────────────────────────────────────
    {
        "title": "Repeated DNA Sequences",
        "difficulty": "medium",
        "tags": ["string", "hash-table"],
        "companies": ["google", "linkedin", "amazon", "bytedance"],
        "description": "Given a string `s` that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order.\n\nExample 1:\nInput: s = \"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"\nOutput: [\"AAAAACCCCC\",\"CCCCCAAAAA\"]\n\nExample 2:\nInput: s = \"AAAAAAAAAAAAA\"\nOutput: [\"AAAAAAAAAA\"]",
        "constraints": "1 <= s.length <= 10^5\ns[i] is either 'A', 'C', 'G', or 'T'.",
        "hints": "Use a hash set to track all 10-character substrings you have seen, and a second set for those seen more than once.",
        "starter_code": {
            "python": "class Solution:\n    def findRepeatedDnaSequences(self, s: str) -> list[str]:\n        pass",
            "javascript": "var findRepeatedDnaSequences = function(s) {\n    \n};",
            "java": "class Solution {\n    public List<String> findRepeatedDnaSequences(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<string> findRepeatedDnaSequences(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT\"", "expected_output": "[\"AAAAACCCCC\",\"CCCCCAAAAA\"]", "is_sample": True},
            {"input": "\"AAAAAAAAAAAAA\"", "expected_output": "[\"AAAAAAAAAA\"]", "is_sample": True},
            {"input": "\"AAAAAAAAAAA\"", "expected_output": "[\"AAAAAAAAAA\"]", "is_sample": False},
        ],
    },
    # ─── 6. Isomorphic Strings ─────────────────────────────────────────
    {
        "title": "Isomorphic Strings",
        "difficulty": "easy",
        "tags": ["string", "hash-table"],
        "companies": ["google", "amazon", "linkedin", "adobe"],
        "description": "Given two strings `s` and `t`, determine if they are isomorphic. Two strings are isomorphic if the characters in `s` can be replaced to get `t`, with a one-to-one mapping preserving character order.\n\nExample 1:\nInput: s = \"egg\", t = \"add\"\nOutput: true\n\nExample 2:\nInput: s = \"foo\", t = \"bar\"\nOutput: false",
        "constraints": "1 <= s.length <= 5 * 10^4\nt.length == s.length\ns and t consist of any valid ascii character.",
        "hints": "Use two hash maps to ensure a bidirectional mapping between characters of s and t.",
        "starter_code": {
            "python": "class Solution:\n    def isIsomorphic(self, s: str, t: str) -> bool:\n        pass",
            "javascript": "var isIsomorphic = function(s, t) {\n    \n};",
            "java": "class Solution {\n    public boolean isIsomorphic(String s, String t) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isIsomorphic(string s, string t) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"egg\"\n\"add\"", "expected_output": "true", "is_sample": True},
            {"input": "\"foo\"\n\"bar\"", "expected_output": "false", "is_sample": True},
            {"input": "\"paper\"\n\"title\"", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 7. Word Pattern ──────────────────────────────────────────────
    {
        "title": "Word Pattern",
        "difficulty": "easy",
        "tags": ["string", "hash-table"],
        "companies": ["meta", "amazon", "dropbox", "uber"],
        "description": "Given a `pattern` and a string `s`, find if `s` follows the same pattern. Here follow means a full match, such that there is a bijection between a letter in `pattern` and a non-empty word in `s`.\n\nExample 1:\nInput: pattern = \"abba\", s = \"dog cat cat dog\"\nOutput: true\n\nExample 2:\nInput: pattern = \"abba\", s = \"dog cat cat fish\"\nOutput: false",
        "constraints": "1 <= pattern.length <= 300\npattern contains only lower-case English letters.\n1 <= s.length <= 3000\ns contains only lowercase English letters and spaces.",
        "hints": "Split s by spaces and create a bijection map between pattern characters and words, checking both directions.",
        "starter_code": {
            "python": "class Solution:\n    def wordPattern(self, pattern: str, s: str) -> bool:\n        pass",
            "javascript": "var wordPattern = function(pattern, s) {\n    \n};",
            "java": "class Solution {\n    public boolean wordPattern(String pattern, String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool wordPattern(string pattern, string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"abba\"\n\"dog cat cat dog\"", "expected_output": "true", "is_sample": True},
            {"input": "\"abba\"\n\"dog cat cat fish\"", "expected_output": "false", "is_sample": True},
            {"input": "\"aaaa\"\n\"dog cat cat dog\"", "expected_output": "false", "is_sample": False},
        ],
    },
    # ─── 8. Integer to Roman ───────────────────────────────────────────
    {
        "title": "Integer to Roman",
        "difficulty": "medium",
        "tags": ["string", "math"],
        "companies": ["amazon", "microsoft", "oracle", "adobe"],
        "description": "Given an integer, convert it to a Roman numeral. Roman numerals use seven symbols: I(1), V(5), X(10), L(50), C(100), D(500), M(1000) with subtractive forms like IV(4), IX(9), XL(40), etc.\n\nExample 1:\nInput: num = 3749\nOutput: \"MMMDCCXLIX\"\n\nExample 2:\nInput: num = 58\nOutput: \"LVIII\"",
        "constraints": "1 <= num <= 3999",
        "hints": "Create a mapping of values to symbols in descending order (including subtractive forms), then greedily subtract the largest possible value.",
        "starter_code": {
            "python": "class Solution:\n    def intToRoman(self, num: int) -> str:\n        pass",
            "javascript": "var intToRoman = function(num) {\n    \n};",
            "java": "class Solution {\n    public String intToRoman(int num) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string intToRoman(int num) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "3749", "expected_output": "\"MMMDCCXLIX\"", "is_sample": True},
            {"input": "58", "expected_output": "\"LVIII\"", "is_sample": True},
            {"input": "1994", "expected_output": "\"MCMXCIV\"", "is_sample": False},
        ],
    },
    # ─── 9. Reverse Words in a String ──────────────────────────────────
    {
        "title": "Reverse Words in a String",
        "difficulty": "easy",
        "tags": ["string"],
        "companies": ["microsoft", "apple", "amazon", "meta"],
        "description": "Given an input string `s`, reverse the order of the words. A word is defined as a sequence of non-space characters. Return a string of the words in reverse order concatenated by a single space. Note that `s` may contain leading or trailing spaces or multiple spaces between words.\n\nExample 1:\nInput: s = \"the sky is blue\"\nOutput: \"blue is sky the\"\n\nExample 2:\nInput: s = \"  hello world  \"\nOutput: \"world hello\"",
        "constraints": "1 <= s.length <= 10^4\ns contains English letters (upper-case and lower-case), digits, and spaces ' '.\nThere is at least one word in s.",
        "hints": "Split the string by whitespace, filter out empty strings, then reverse the resulting list and join with a single space.",
        "starter_code": {
            "python": "class Solution:\n    def reverseWords(self, s: str) -> str:\n        pass",
            "javascript": "var reverseWords = function(s) {\n    \n};",
            "java": "class Solution {\n    public String reverseWords(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string reverseWords(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"the sky is blue\"", "expected_output": "\"blue is sky the\"", "is_sample": True},
            {"input": "\"  hello world  \"", "expected_output": "\"world hello\"", "is_sample": True},
            {"input": "\"a good   example\"", "expected_output": "\"example good a\"", "is_sample": False},
        ],
    },
    # ─── 10. Minimum Remove to Make Valid Parentheses ──────────────────
    {
        "title": "Minimum Remove to Make Valid Parentheses",
        "difficulty": "medium",
        "tags": ["string", "stack"],
        "companies": ["meta", "amazon", "bytedance", "uber"],
        "description": "Given a string `s` of '(', ')' and lowercase English characters, remove the minimum number of parentheses so that the resulting string is valid (every opening parenthesis has a matching closing one and vice versa). Return any valid result.\n\nExample 1:\nInput: s = \"lee(t(c)o)de)\"\nOutput: \"lee(t(c)o)de\"\n\nExample 2:\nInput: s = \"a)b(c)d\"\nOutput: \"ab(c)d\"",
        "constraints": "1 <= s.length <= 10^5\ns[i] is either '(', ')', or lowercase English letter.",
        "hints": "Use a stack to track indices of unmatched parentheses, then build the result string skipping those indices.",
        "starter_code": {
            "python": "class Solution:\n    def minRemoveToMakeValid(self, s: str) -> str:\n        pass",
            "javascript": "var minRemoveToMakeValid = function(s) {\n    \n};",
            "java": "class Solution {\n    public String minRemoveToMakeValid(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string minRemoveToMakeValid(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"lee(t(c)o)de)\"", "expected_output": "\"lee(t(c)o)de\"", "is_sample": True},
            {"input": "\"a)b(c)d\"", "expected_output": "\"ab(c)d\"", "is_sample": True},
            {"input": "\"))((\"", "expected_output": "\"\"", "is_sample": False},
        ],
    },
    # ─── 11. Longest Happy String ──────────────────────────────────────
    {
        "title": "Longest Happy String",
        "difficulty": "medium",
        "tags": ["string", "greedy"],
        "companies": ["google", "amazon", "uber", "bytedance"],
        "description": "A string `s` is called happy if it does not contain \"aaa\", \"bbb\", or \"ccc\" as a substring. Given three integers `a`, `b`, and `c`, return the longest possible happy string using at most `a` 'a's, `b` 'b's, and `c` 'c's. If multiple answers exist, return any of them.\n\nExample 1:\nInput: a = 1, b = 1, c = 7\nOutput: \"ccaccbcc\"\n\nExample 2:\nInput: a = 7, b = 1, c = 0\nOutput: \"aabaa\"",
        "constraints": "0 <= a, b, c <= 100\na + b + c > 0",
        "hints": "Greedily pick the character with the highest remaining count, but if the last two characters are the same, pick the next highest instead.",
        "starter_code": {
            "python": "class Solution:\n    def longestDiverseString(self, a: int, b: int, c: int) -> str:\n        pass",
            "javascript": "var longestDiverseString = function(a, b, c) {\n    \n};",
            "java": "class Solution {\n    public String longestDiverseString(int a, int b, int c) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string longestDiverseString(int a, int b, int c) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "1\n1\n7", "expected_output": "\"ccaccbcc\"", "is_sample": True},
            {"input": "7\n1\n0", "expected_output": "\"aabaa\"", "is_sample": True},
            {"input": "0\n0\n3", "expected_output": "\"cc\"", "is_sample": False},
        ],
    },
    # ─── 12. Text Justification ────────────────────────────────────────
    {
        "title": "Text Justification",
        "difficulty": "hard",
        "tags": ["string"],
        "companies": ["google", "linkedin", "airbnb", "pinterest"],
        "description": "Given an array of strings `words` and a width `maxWidth`, format the text such that each line has exactly `maxWidth` characters and is fully (left and right) justified. Pack as many words as you can per line. Extra spaces between words should be distributed as evenly as possible; the last line should be left-justified with no extra space between words.\n\nExample 1:\nInput: words = [\"This\",\"is\",\"an\",\"example\",\"of\",\"text\",\"justification.\"], maxWidth = 16\nOutput: [\"This    is    an\",\"example  of text\",\"justification.  \"]",
        "constraints": "1 <= words.length <= 300\n1 <= words[i].length <= 20\nwords[i] consists of only English letters and symbols.\n1 <= maxWidth <= 100\nwords[i].length <= maxWidth",
        "hints": "Greedily pack words into each line. Then distribute spaces evenly among gaps, giving extra spaces to the leftmost gaps.",
        "starter_code": {
            "python": "class Solution:\n    def fullJustify(self, words: list[str], maxWidth: int) -> list[str]:\n        pass",
            "javascript": "var fullJustify = function(words, maxWidth) {\n    \n};",
            "java": "class Solution {\n    public List<String> fullJustify(String[] words, int maxWidth) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<string> fullJustify(vector<string>& words, int maxWidth) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"This\",\"is\",\"an\",\"example\",\"of\",\"text\",\"justification.\"]\n16", "expected_output": "[\"This    is    an\",\"example  of text\",\"justification.  \"]", "is_sample": True},
            {"input": "[\"What\",\"must\",\"be\",\"acknowledgment\",\"shall\",\"be\"]\n16", "expected_output": "[\"What   must   be\",\"acknowledgment  \",\"shall be        \"]", "is_sample": True},
            {"input": "[\"Listen\"]\n6", "expected_output": "[\"Listen\"]", "is_sample": False},
        ],
    },
    # ─── 13. Shortest Palindrome ───────────────────────────────────────
    {
        "title": "Shortest Palindrome",
        "difficulty": "hard",
        "tags": ["string"],
        "companies": ["google", "amazon", "apple", "bytedance"],
        "description": "You are given a string `s`. You can convert it to a palindrome by adding characters in front of it. Return the shortest palindrome you can find by performing this transformation.\n\nExample 1:\nInput: s = \"aacecaaa\"\nOutput: \"aaacecaaa\"\n\nExample 2:\nInput: s = \"abcd\"\nOutput: \"dcbabcd\"",
        "constraints": "0 <= s.length <= 5 * 10^4\ns consists of lowercase English letters only.",
        "hints": "Find the longest palindromic prefix of s. Use KMP failure function on s + '#' + reverse(s) to find it efficiently.",
        "starter_code": {
            "python": "class Solution:\n    def shortestPalindrome(self, s: str) -> str:\n        pass",
            "javascript": "var shortestPalindrome = function(s) {\n    \n};",
            "java": "class Solution {\n    public String shortestPalindrome(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string shortestPalindrome(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"aacecaaa\"", "expected_output": "\"aaacecaaa\"", "is_sample": True},
            {"input": "\"abcd\"", "expected_output": "\"dcbabcd\"", "is_sample": True},
            {"input": "\"\"", "expected_output": "\"\"", "is_sample": False},
        ],
    },
    # ─── 14. Palindrome Pairs ──────────────────────────────────────────
    {
        "title": "Palindrome Pairs",
        "difficulty": "hard",
        "tags": ["string", "hash-table"],
        "companies": ["google", "airbnb", "amazon", "meta"],
        "description": "You are given a 0-indexed array of unique strings `words`. A palindrome pair is a pair of indices (i, j) where i != j and the concatenation of words[i] + words[j] is a palindrome. Return a list of all palindrome pairs.\n\nExample 1:\nInput: words = [\"abcd\",\"dcba\",\"lls\",\"s\",\"sssll\"]\nOutput: [[0,1],[1,0],[3,2],[2,4]]\n\nExample 2:\nInput: words = [\"bat\",\"tab\",\"cat\"]\nOutput: [[0,1],[1,0]]",
        "constraints": "1 <= words.length <= 5000\n0 <= words[i].length <= 300\nwords[i] consists of lowercase English letters.",
        "hints": "For each word, check if any prefix is a palindrome and the reverse of the suffix exists in the list, and vice versa. Use a hash map for O(1) lookups.",
        "starter_code": {
            "python": "class Solution:\n    def palindromePairs(self, words: list[str]) -> list[list[int]]:\n        pass",
            "javascript": "var palindromePairs = function(words) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> palindromePairs(String[] words) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> palindromePairs(vector<string>& words) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"abcd\",\"dcba\",\"lls\",\"s\",\"sssll\"]", "expected_output": "[[0,1],[1,0],[3,2],[2,4]]", "is_sample": True},
            {"input": "[\"bat\",\"tab\",\"cat\"]", "expected_output": "[[0,1],[1,0]]", "is_sample": True},
            {"input": "[\"a\",\"\"]", "expected_output": "[[0,1],[1,0]]", "is_sample": False},
        ],
    },
    # ─── 15. Four Sum ──────────────────────────────────────────────────
    {
        "title": "Four Sum",
        "difficulty": "medium",
        "tags": ["array", "two-pointers", "sorting"],
        "companies": ["amazon", "apple", "microsoft", "linkedin"],
        "description": "Given an array `nums` of `n` integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that a, b, c, d are distinct indices and nums[a] + nums[b] + nums[c] + nums[d] == target.\n\nExample 1:\nInput: nums = [1,0,-1,0,-2,2], target = 0\nOutput: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]\n\nExample 2:\nInput: nums = [2,2,2,2,2], target = 8\nOutput: [[2,2,2,2]]",
        "constraints": "1 <= nums.length <= 200\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
        "hints": "Sort the array, then use two nested loops for the first two elements and a two-pointer approach for the remaining two. Skip duplicates at each level.",
        "starter_code": {
            "python": "class Solution:\n    def fourSum(self, nums: list[int], target: int) -> list[list[int]]:\n        pass",
            "javascript": "var fourSum = function(nums, target) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> fourSum(int[] nums, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> fourSum(vector<int>& nums, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,0,-1,0,-2,2]\n0", "expected_output": "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]", "is_sample": True},
            {"input": "[2,2,2,2,2]\n8", "expected_output": "[[2,2,2,2]]", "is_sample": True},
            {"input": "[0,0,0,0]\n0", "expected_output": "[[0,0,0,0]]", "is_sample": False},
        ],
    },
    # ─── 16. Four Sum II ───────────────────────────────────────────────
    {
        "title": "Four Sum II",
        "difficulty": "medium",
        "tags": ["array", "hash-table"],
        "companies": ["amazon", "google", "uber", "lyft"],
        "description": "Given four integer arrays nums1, nums2, nums3, and nums4 all of length n, return the number of tuples (i, j, k, l) such that nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0.\n\nExample 1:\nInput: nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]\nOutput: 2\n\nExample 2:\nInput: nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]\nOutput: 1",
        "constraints": "n == nums1.length == nums2.length == nums3.length == nums4.length\n1 <= n <= 200\n-2^28 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 2^28",
        "hints": "Compute all pairwise sums of nums1 and nums2 into a hash map, then for each pair from nums3 and nums4 check if the negation exists in the map.",
        "starter_code": {
            "python": "class Solution:\n    def fourSumCount(self, nums1: list[int], nums2: list[int], nums3: list[int], nums4: list[int]) -> int:\n        pass",
            "javascript": "var fourSumCount = function(nums1, nums2, nums3, nums4) {\n    \n};",
            "java": "class Solution {\n    public int fourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int fourSumCount(vector<int>& nums1, vector<int>& nums2, vector<int>& nums3, vector<int>& nums4) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2]\n[-2,-1]\n[-1,2]\n[0,2]", "expected_output": "2", "is_sample": True},
            {"input": "[0]\n[0]\n[0]\n[0]", "expected_output": "1", "is_sample": True},
            {"input": "[-1,-1]\n[-1,1]\n[-1,1]\n[1,-1]", "expected_output": "6", "is_sample": False},
        ],
    },
    # ─── 17. 3Sum Closest ──────────────────────────────────────────────
    {
        "title": "3Sum Closest",
        "difficulty": "medium",
        "tags": ["array", "two-pointers", "sorting"],
        "companies": ["meta", "amazon", "microsoft", "google"],
        "description": "Given an integer array `nums` of length n and an integer `target`, find three integers in `nums` such that the sum is closest to `target`. Return the sum of the three integers. You may assume that each input would have exactly one solution.\n\nExample 1:\nInput: nums = [-1,2,1,-4], target = 1\nOutput: 2\nExplanation: The sum that is closest to the target is 2 = (-1 + 2 + 1).\n\nExample 2:\nInput: nums = [0,0,0], target = 1\nOutput: 0",
        "constraints": "3 <= nums.length <= 500\n-1000 <= nums[i] <= 1000\n-10^4 <= target <= 10^4",
        "hints": "Sort the array, then for each element use two pointers on the remaining portion. Track the closest sum seen so far.",
        "starter_code": {
            "python": "class Solution:\n    def threeSumClosest(self, nums: list[int], target: int) -> int:\n        pass",
            "javascript": "var threeSumClosest = function(nums, target) {\n    \n};",
            "java": "class Solution {\n    public int threeSumClosest(int[] nums, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int threeSumClosest(vector<int>& nums, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[-1,2,1,-4]\n1", "expected_output": "2", "is_sample": True},
            {"input": "[0,0,0]\n1", "expected_output": "0", "is_sample": True},
            {"input": "[1,1,1,0]\n-100", "expected_output": "2", "is_sample": False},
        ],
    },
    # ─── 18. Remove Duplicates from Sorted Array II ────────────────────
    {
        "title": "Remove Duplicates from Sorted Array II",
        "difficulty": "medium",
        "tags": ["array", "two-pointers"],
        "companies": ["meta", "microsoft", "amazon", "adobe"],
        "description": "Given an integer array `nums` sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. Return `k` after placing the final result in the first `k` slots of `nums`.\n\nExample 1:\nInput: nums = [1,1,1,2,2,3]\nOutput: 5, nums = [1,1,2,2,3,...]\n\nExample 2:\nInput: nums = [0,0,1,1,1,1,2,3,3]\nOutput: 7, nums = [0,0,1,1,2,3,3,...]",
        "constraints": "1 <= nums.length <= 3 * 10^4\n-10^4 <= nums[i] <= 10^4\nnums is sorted in non-decreasing order.",
        "hints": "Use a write pointer that only advances when the current element differs from the element two positions before the write pointer.",
        "starter_code": {
            "python": "class Solution:\n    def removeDuplicates(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var removeDuplicates = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int removeDuplicates(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int removeDuplicates(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,1,1,2,2,3]", "expected_output": "5", "is_sample": True},
            {"input": "[0,0,1,1,1,1,2,3,3]", "expected_output": "7", "is_sample": True},
            {"input": "[1,1]", "expected_output": "2", "is_sample": False},
        ],
    },
    # ─── 19. Next Permutation ──────────────────────────────────────────
    {
        "title": "Next Permutation",
        "difficulty": "medium",
        "tags": ["array"],
        "companies": ["google", "meta", "amazon", "microsoft"],
        "description": "Given an array of integers `nums`, find the next permutation of the array in lexicographic order. The replacement must be in place and use only constant extra memory. If the arrangement is the largest possible, rearrange it to the lowest (sorted in ascending order).\n\nExample 1:\nInput: nums = [1,2,3]\nOutput: [1,3,2]\n\nExample 2:\nInput: nums = [3,2,1]\nOutput: [1,2,3]",
        "constraints": "1 <= nums.length <= 100\n0 <= nums[i] <= 100",
        "hints": "Find the rightmost element that is smaller than its successor, swap it with the smallest element to its right that is larger, then reverse the suffix.",
        "starter_code": {
            "python": "class Solution:\n    def nextPermutation(self, nums: list[int]) -> None:\n        pass",
            "javascript": "var nextPermutation = function(nums) {\n    \n};",
            "java": "class Solution {\n    public void nextPermutation(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void nextPermutation(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3]", "expected_output": "[1,3,2]", "is_sample": True},
            {"input": "[3,2,1]", "expected_output": "[1,2,3]", "is_sample": True},
            {"input": "[1,1,5]", "expected_output": "[1,5,1]", "is_sample": False},
        ],
    },
    # ─── 20. Rotate Array ─────────────────────────────────────────────
    {
        "title": "Rotate Array",
        "difficulty": "easy",
        "tags": ["array"],
        "companies": ["microsoft", "amazon", "apple", "shopify"],
        "description": "Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative. Modify the array in-place with O(1) extra space.\n\nExample 1:\nInput: nums = [1,2,3,4,5,6,7], k = 3\nOutput: [5,6,7,1,2,3,4]\n\nExample 2:\nInput: nums = [-1,-100,3,99], k = 2\nOutput: [3,99,-1,-100]",
        "constraints": "1 <= nums.length <= 10^5\n-2^31 <= nums[i] <= 2^31 - 1\n0 <= k <= 10^5",
        "hints": "Reverse the entire array, then reverse the first k elements, then reverse the remaining elements. Remember to take k modulo the array length.",
        "starter_code": {
            "python": "class Solution:\n    def rotate(self, nums: list[int], k: int) -> None:\n        pass",
            "javascript": "var rotate = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public void rotate(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void rotate(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4,5,6,7]\n3", "expected_output": "[5,6,7,1,2,3,4]", "is_sample": True},
            {"input": "[-1,-100,3,99]\n2", "expected_output": "[3,99,-1,-100]", "is_sample": True},
            {"input": "[1,2]\n3", "expected_output": "[2,1]", "is_sample": False},
        ],
    },
    # ─── 21. Majority Element II ───────────────────────────────────────
    {
        "title": "Majority Element II",
        "difficulty": "medium",
        "tags": ["array"],
        "companies": ["google", "amazon", "adobe", "uber"],
        "description": "Given an integer array of size `n`, find all elements that appear more than n/3 times. The algorithm should run in linear time and use O(1) space.\n\nExample 1:\nInput: nums = [3,2,3]\nOutput: [3]\n\nExample 2:\nInput: nums = [1]\nOutput: [1]",
        "constraints": "1 <= nums.length <= 5 * 10^4\n-10^9 <= nums[i] <= 10^9",
        "hints": "Use Boyer-Moore Voting Algorithm extended to track two candidates, since at most two elements can appear more than n/3 times. Then verify the candidates in a second pass.",
        "starter_code": {
            "python": "class Solution:\n    def majorityElement(self, nums: list[int]) -> list[int]:\n        pass",
            "javascript": "var majorityElement = function(nums) {\n    \n};",
            "java": "class Solution {\n    public List<Integer> majorityElement(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> majorityElement(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,2,3]", "expected_output": "[3]", "is_sample": True},
            {"input": "[1]", "expected_output": "[1]", "is_sample": True},
            {"input": "[1,2]", "expected_output": "[1,2]", "is_sample": False},
        ],
    },
    # ─── 22. Shortest Unsorted Continuous Subarray ─────────────────────
    {
        "title": "Shortest Unsorted Continuous Subarray",
        "difficulty": "medium",
        "tags": ["array", "sorting"],
        "companies": ["meta", "amazon", "google", "uber"],
        "description": "Given an integer array `nums`, find one continuous subarray such that if you only sort this subarray in non-decreasing order, the whole array becomes sorted. Return the length of the shortest such subarray.\n\nExample 1:\nInput: nums = [2,6,4,8,10,9,15]\nOutput: 5\nExplanation: Sorting [6,4,8,10,9] makes the whole array sorted.\n\nExample 2:\nInput: nums = [1,2,3,4]\nOutput: 0",
        "constraints": "1 <= nums.length <= 10^4\n-10^5 <= nums[i] <= 10^5",
        "hints": "Find the leftmost and rightmost positions where the array deviates from the sorted order by scanning from both ends.",
        "starter_code": {
            "python": "class Solution:\n    def findUnsortedSubarray(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var findUnsortedSubarray = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int findUnsortedSubarray(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findUnsortedSubarray(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,6,4,8,10,9,15]", "expected_output": "5", "is_sample": True},
            {"input": "[1,2,3,4]", "expected_output": "0", "is_sample": True},
            {"input": "[1]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 23. Wiggle Sort II ────────────────────────────────────────────
    {
        "title": "Wiggle Sort II",
        "difficulty": "hard",
        "tags": ["array", "sorting"],
        "companies": ["google", "microsoft", "amazon", "nvidia"],
        "description": "Given an integer array `nums`, reorder it such that nums[0] < nums[1] > nums[2] < nums[3] > nums[4] .... You may assume the input always has a valid answer.\n\nExample 1:\nInput: nums = [1,5,1,1,6,4]\nOutput: [1,6,1,5,1,4]\n\nExample 2:\nInput: nums = [1,3,2,2,3,1]\nOutput: [2,3,1,3,1,2]",
        "constraints": "1 <= nums.length <= 5 * 10^4\n0 <= nums[i] <= 5000\nIt is guaranteed that there will be an answer for the given input nums.",
        "hints": "Sort the array, split into two halves, and interleave them by placing smaller half at even indices and larger half at odd indices (both in reverse order).",
        "starter_code": {
            "python": "class Solution:\n    def wiggleSort(self, nums: list[int]) -> None:\n        pass",
            "javascript": "var wiggleSort = function(nums) {\n    \n};",
            "java": "class Solution {\n    public void wiggleSort(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void wiggleSort(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,5,1,1,6,4]", "expected_output": "[1,6,1,5,1,4]", "is_sample": True},
            {"input": "[1,3,2,2,3,1]", "expected_output": "[2,3,1,3,1,2]", "is_sample": True},
            {"input": "[4,5,5,6]", "expected_output": "[5,6,4,5]", "is_sample": False},
        ],
    },
    # ─── 24. Push Dominoes ─────────────────────────────────────────────
    {
        "title": "Push Dominoes",
        "difficulty": "hard",
        "tags": ["array", "two-pointers"],
        "companies": ["google", "amazon", "palantir", "snap"],
        "description": "There are `n` dominoes in a line, each in one of three states: 'L' (pushed left), 'R' (pushed right), or '.' (standing). Simultaneously, every second a domino falling left pushes its left neighbor left, and one falling right pushes its right neighbor right. Return the final state.\n\nExample 1:\nInput: dominoes = \"RR.L\"\nOutput: \"RR.L\"\n\nExample 2:\nInput: dominoes = \".L.R...LR..L..\"\nOutput: \"LL.RR.LLRRLL..\"",
        "constraints": "n == dominoes.length\n1 <= n <= 10^5\ndominoes[i] is either 'L', 'R', or '.'.",
        "hints": "Use two-pointer or force simulation: compute the closest distance to the nearest 'L' from the right and nearest 'R' from the left for each position, then compare forces.",
        "starter_code": {
            "python": "class Solution:\n    def pushDominoes(self, dominoes: str) -> str:\n        pass",
            "javascript": "var pushDominoes = function(dominoes) {\n    \n};",
            "java": "class Solution {\n    public String pushDominoes(String dominoes) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string pushDominoes(string dominoes) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"RR.L\"", "expected_output": "\"RR.L\"", "is_sample": True},
            {"input": "\".L.R...LR..L..\"", "expected_output": "\"LL.RR.LLRRLL..\"", "is_sample": True},
            {"input": "\"R.\"", "expected_output": "\"RR\"", "is_sample": False},
        ],
    },
    # ─── 25. Minimum Moves to Equal Array Elements ─────────────────────
    {
        "title": "Minimum Moves to Equal Array Elements",
        "difficulty": "easy",
        "tags": ["array", "math"],
        "companies": ["amazon", "microsoft", "uber", "coinbase"],
        "description": "Given an integer array `nums` of size `n`, return the minimum number of moves required to make all array elements equal. In one move you can increment n - 1 elements by 1.\n\nExample 1:\nInput: nums = [1,2,3]\nOutput: 3\n\nExample 2:\nInput: nums = [1,1,1]\nOutput: 0",
        "constraints": "n == nums.length\n1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
        "hints": "Incrementing n-1 elements by 1 is equivalent to decrementing 1 element by 1. The answer is the sum of differences from the minimum element.",
        "starter_code": {
            "python": "class Solution:\n    def minMoves(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var minMoves = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int minMoves(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minMoves(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3]", "expected_output": "3", "is_sample": True},
            {"input": "[1,1,1]", "expected_output": "0", "is_sample": True},
            {"input": "[5,6,8,8,5]", "expected_output": "12", "is_sample": False},
        ],
    },
    # ─── 26. Maximum Gap ──────────────────────────────────────────────
    {
        "title": "Maximum Gap",
        "difficulty": "hard",
        "tags": ["array", "sorting"],
        "companies": ["amazon", "google", "stripe", "palantir"],
        "description": "Given an integer array `nums`, return the maximum difference between two successive elements in its sorted form. If the array contains less than two elements, return 0. You must solve it in O(n) time and O(n) space.\n\nExample 1:\nInput: nums = [3,6,9,1]\nOutput: 3\n\nExample 2:\nInput: nums = [10]\nOutput: 0",
        "constraints": "1 <= nums.length <= 10^5\n0 <= nums[i] <= 10^9",
        "hints": "Use bucket sort (or radix sort). Create n-1 buckets of equal range, distribute elements, then the maximum gap must be between consecutive non-empty buckets.",
        "starter_code": {
            "python": "class Solution:\n    def maximumGap(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var maximumGap = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int maximumGap(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maximumGap(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,6,9,1]", "expected_output": "3", "is_sample": True},
            {"input": "[10]", "expected_output": "0", "is_sample": True},
            {"input": "[1,10000000]", "expected_output": "9999999", "is_sample": False},
        ],
    },
    # ─── 27. Largest Number ────────────────────────────────────────────
    {
        "title": "Largest Number",
        "difficulty": "medium",
        "tags": ["array", "string", "sorting"],
        "companies": ["amazon", "microsoft", "adobe", "uber"],
        "description": "Given a list of non-negative integers `nums`, arrange them such that they form the largest number and return it as a string. Since the result may be very large, return a string instead of an integer.\n\nExample 1:\nInput: nums = [10,2]\nOutput: \"210\"\n\nExample 2:\nInput: nums = [3,30,34,5,9]\nOutput: \"9534330\"",
        "constraints": "1 <= nums.length <= 100\n0 <= nums[i] <= 10^9",
        "hints": "Define a custom comparator that compares two numbers a and b by checking if str(a)+str(b) > str(b)+str(a), then sort accordingly.",
        "starter_code": {
            "python": "class Solution:\n    def largestNumber(self, nums: list[int]) -> str:\n        pass",
            "javascript": "var largestNumber = function(nums) {\n    \n};",
            "java": "class Solution {\n    public String largestNumber(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string largestNumber(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[10,2]", "expected_output": "\"210\"", "is_sample": True},
            {"input": "[3,30,34,5,9]", "expected_output": "\"9534330\"", "is_sample": True},
            {"input": "[0,0]", "expected_output": "\"0\"", "is_sample": False},
        ],
    },
    # ─── 28. Find the Duplicate Number ─────────────────────────────────
    {
        "title": "Find the Duplicate Number",
        "difficulty": "hard",
        "tags": ["array", "two-pointers"],
        "companies": ["amazon", "google", "microsoft", "bytedance"],
        "description": "Given an array of integers `nums` containing n + 1 integers where each integer is in the range [1, n] inclusive, there is only one repeated number. Return this repeated number. You must solve it without modifying the array and using only constant extra space.\n\nExample 1:\nInput: nums = [1,3,4,2,2]\nOutput: 2\n\nExample 2:\nInput: nums = [3,1,3,4,2]\nOutput: 3",
        "constraints": "1 <= n <= 10^5\nnums.length == n + 1\n1 <= nums[i] <= n\nThere is only one repeated number, but it could be repeated more than once.",
        "hints": "Use Floyd's cycle detection (tortoise and hare) treating the array as a linked list where nums[i] points to index nums[i].",
        "starter_code": {
            "python": "class Solution:\n    def findDuplicate(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var findDuplicate = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int findDuplicate(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findDuplicate(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,3,4,2,2]", "expected_output": "2", "is_sample": True},
            {"input": "[3,1,3,4,2]", "expected_output": "3", "is_sample": True},
            {"input": "[2,2,2,2,2]", "expected_output": "2", "is_sample": False},
        ],
    },
    # ─── 29. Find All Duplicates in an Array ───────────────────────────
    {
        "title": "Find All Duplicates in an Array",
        "difficulty": "easy",
        "tags": ["array", "hash-table"],
        "companies": ["amazon", "microsoft", "apple", "adobe"],
        "description": "Given an integer array `nums` of length `n` where all integers are in the range [1, n] and each integer appears once or twice, return an array of all integers that appear twice. You must solve it without extra space and in O(n) time.\n\nExample 1:\nInput: nums = [4,3,2,7,8,2,3,1]\nOutput: [2,3]\n\nExample 2:\nInput: nums = [1,1,2]\nOutput: [1]",
        "constraints": "n == nums.length\n1 <= n <= 10^5\n1 <= nums[i] <= n\nEach element appears once or twice.",
        "hints": "For each number, negate the value at index (abs(num)-1). If the value at that index is already negative, then num is a duplicate.",
        "starter_code": {
            "python": "class Solution:\n    def findDuplicates(self, nums: list[int]) -> list[int]:\n        pass",
            "javascript": "var findDuplicates = function(nums) {\n    \n};",
            "java": "class Solution {\n    public List<Integer> findDuplicates(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> findDuplicates(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[4,3,2,7,8,2,3,1]", "expected_output": "[2,3]", "is_sample": True},
            {"input": "[1,1,2]", "expected_output": "[1]", "is_sample": True},
            {"input": "[1]", "expected_output": "[]", "is_sample": False},
        ],
    },
    # ─── 30. Set Mismatch ─────────────────────────────────────────────
    {
        "title": "Set Mismatch",
        "difficulty": "easy",
        "tags": ["array", "hash-table", "math"],
        "companies": ["amazon", "google", "apple", "shopify"],
        "description": "You have a set of integers s, which originally contains all numbers from 1 to n. Due to an error, one number got duplicated and another got lost. Given an array `nums` representing the data after the error, return the number that occurs twice and the number that is missing as [duplicate, missing].\n\nExample 1:\nInput: nums = [1,2,2,4]\nOutput: [2,3]\n\nExample 2:\nInput: nums = [1,1]\nOutput: [1,2]",
        "constraints": "2 <= nums.length <= 10^4\n1 <= nums[i] <= 10^4",
        "hints": "Use a hash set or the sign-flipping technique to find the duplicate, then use the expected sum formula to find the missing number.",
        "starter_code": {
            "python": "class Solution:\n    def findErrorNums(self, nums: list[int]) -> list[int]:\n        pass",
            "javascript": "var findErrorNums = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int[] findErrorNums(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> findErrorNums(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,2,4]", "expected_output": "[2,3]", "is_sample": True},
            {"input": "[1,1]", "expected_output": "[1,2]", "is_sample": True},
            {"input": "[3,2,3,4,6,5]", "expected_output": "[3,1]", "is_sample": False},
        ],
    },
    # ─── 31. Degree of an Array ────────────────────────────────────────
    {
        "title": "Degree of an Array",
        "difficulty": "easy",
        "tags": ["array", "hash-table"],
        "companies": ["google", "amazon", "uber", "lyft"],
        "description": "Given a non-empty array of non-negative integers `nums`, the degree is defined as the maximum frequency of any element. Find the smallest possible length of a contiguous subarray that has the same degree as the full array.\n\nExample 1:\nInput: nums = [1,2,2,3,1]\nOutput: 2\nExplanation: Element 2 has degree 2 and spans indices 1 to 2, giving length 2.\n\nExample 2:\nInput: nums = [1,2,2,3,1,4,2]\nOutput: 6",
        "constraints": "nums.length will be between 1 and 50,000.\nnums[i] will be an integer between 0 and 49,999.",
        "hints": "Track each element's first occurrence, last occurrence, and count. The answer is the minimum (last - first + 1) among elements with the maximum count.",
        "starter_code": {
            "python": "class Solution:\n    def findShortestSubArray(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var findShortestSubArray = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int findShortestSubArray(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findShortestSubArray(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,2,3,1]", "expected_output": "2", "is_sample": True},
            {"input": "[1,2,2,3,1,4,2]", "expected_output": "6", "is_sample": True},
            {"input": "[1]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 32. Subarray Product Less Than K ──────────────────────────────
    {
        "title": "Subarray Product Less Than K",
        "difficulty": "medium",
        "tags": ["array", "sliding-window"],
        "companies": ["google", "amazon", "meta", "bytedance"],
        "description": "Given an array of positive integers `nums` and an integer `k`, return the number of contiguous subarrays where the product of all elements is strictly less than `k`.\n\nExample 1:\nInput: nums = [10,5,2,6], k = 100\nOutput: 8\nExplanation: The 8 subarrays with product less than 100 are: [10], [5], [2], [6], [10,5], [5,2], [2,6], [5,2,6].\n\nExample 2:\nInput: nums = [1,2,3], k = 0\nOutput: 0",
        "constraints": "1 <= nums.length <= 3 * 10^4\n1 <= nums[i] <= 1000\n0 <= k <= 10^6",
        "hints": "Use a sliding window. Expand right and multiply the product; when product >= k, shrink from the left. The count of valid subarrays ending at right is (right - left + 1).",
        "starter_code": {
            "python": "class Solution:\n    def numSubarrayProductLessThanK(self, nums: list[int], k: int) -> int:\n        pass",
            "javascript": "var numSubarrayProductLessThanK = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public int numSubarrayProductLessThanK(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int numSubarrayProductLessThanK(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[10,5,2,6]\n100", "expected_output": "8", "is_sample": True},
            {"input": "[1,2,3]\n0", "expected_output": "0", "is_sample": True},
            {"input": "[1,1,1]\n2", "expected_output": "6", "is_sample": False},
        ],
    },
    # ─── 33. Maximum Sum of Two Non-Overlapping Subarrays ──────────────
    {
        "title": "Maximum Sum of Two Non-Overlapping Subarrays",
        "difficulty": "medium",
        "tags": ["array"],
        "companies": ["google", "amazon", "apple", "doordash"],
        "description": "Given an integer array `nums` and two integers `firstLen` and `secondLen`, return the maximum sum of elements in two non-overlapping subarrays with lengths `firstLen` and `secondLen`. The first subarray can appear before or after the second.\n\nExample 1:\nInput: nums = [0,6,5,2,2,5,1,9,4], firstLen = 1, secondLen = 2\nOutput: 20\nExplanation: Subarray [9] and [6,5] give the max sum.\n\nExample 2:\nInput: nums = [3,8,1,3,2,1,8,9,0], firstLen = 3, secondLen = 2\nOutput: 29",
        "constraints": "1 <= firstLen, secondLen <= 1000\n2 <= firstLen + secondLen <= 1000\nfirstLen + secondLen <= nums.length <= 1000\n0 <= nums[i] <= 1000",
        "hints": "Use prefix sums. Iterate through the array considering both orderings (firstLen before secondLen and vice versa), keeping track of the best subarray of the first length seen so far.",
        "starter_code": {
            "python": "class Solution:\n    def maxSumTwoNoOverlap(self, nums: list[int], firstLen: int, secondLen: int) -> int:\n        pass",
            "javascript": "var maxSumTwoNoOverlap = function(nums, firstLen, secondLen) {\n    \n};",
            "java": "class Solution {\n    public int maxSumTwoNoOverlap(int[] nums, int firstLen, int secondLen) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxSumTwoNoOverlap(vector<int>& nums, int firstLen, int secondLen) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[0,6,5,2,2,5,1,9,4]\n1\n2", "expected_output": "20", "is_sample": True},
            {"input": "[3,8,1,3,2,1,8,9,0]\n3\n2", "expected_output": "29", "is_sample": True},
            {"input": "[1,0,1]\n1\n1", "expected_output": "2", "is_sample": False},
        ],
    },
    # ─── 34. Minimum Window Subsequence ────────────────────────────────
    {
        "title": "Minimum Window Subsequence",
        "difficulty": "hard",
        "tags": ["string", "sliding-window"],
        "companies": ["google", "amazon", "meta", "uber"],
        "description": "Given strings `s1` and `s2`, return the minimum contiguous substring of `s1` such that `s2` is a subsequence of that substring. If there is no such window, return an empty string. If there are multiple minimum-length windows, return the one with the left-most starting index.\n\nExample 1:\nInput: s1 = \"abcdebdde\", s2 = \"bde\"\nOutput: \"bcde\"\n\nExample 2:\nInput: s1 = \"jmeqksfrsdcmsiwvaovztmzfwwcluibwefbmigyahooalddmrpkqfpxmeublleejslfsgoqfbkhculkoilsvcnid\", s2 = \"u\"\nOutput: \"u\"",
        "constraints": "1 <= s1.length <= 2 * 10^4\n1 <= s2.length <= 100\ns1 and s2 consist of lowercase English letters.",
        "hints": "Use a two-pointer approach: scan forward in s1 to find all characters of s2 as a subsequence, then scan backward from that point to minimize the window length.",
        "starter_code": {
            "python": "class Solution:\n    def minWindow(self, s1: str, s2: str) -> str:\n        pass",
            "javascript": "var minWindow = function(s1, s2) {\n    \n};",
            "java": "class Solution {\n    public String minWindow(String s1, String s2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string minWindow(string s1, string s2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"abcdebdde\"\n\"bde\"", "expected_output": "\"bcde\"", "is_sample": True},
            {"input": "\"cnhczmccqouqadqtmjjzl\"\n\"mm\"", "expected_output": "\"mccqouqadqtm\"", "is_sample": True},
            {"input": "\"abcde\"\n\"f\"", "expected_output": "\"\"", "is_sample": False},
        ],
    },
    # ─── 35. Subarrays with K Different Integers ──────────────────────
    {
        "title": "Subarrays with K Different Integers",
        "difficulty": "hard",
        "tags": ["array", "sliding-window", "hash-table"],
        "companies": ["google", "amazon", "uber", "airbnb"],
        "description": "Given an integer array `nums` and an integer `k`, return the number of good subarrays. A good subarray contains exactly `k` different integers.\n\nExample 1:\nInput: nums = [1,2,1,2,3], k = 2\nOutput: 7\nExplanation: Subarrays with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].\n\nExample 2:\nInput: nums = [1,2,1,3,4], k = 3\nOutput: 3",
        "constraints": "1 <= nums.length <= 2 * 10^4\n1 <= nums[i], k <= nums.length",
        "hints": "Use the technique: exactly(k) = atMost(k) - atMost(k-1). Implement a helper that counts subarrays with at most k distinct integers using a sliding window.",
        "starter_code": {
            "python": "class Solution:\n    def subarraysWithKDistinct(self, nums: list[int], k: int) -> int:\n        pass",
            "javascript": "var subarraysWithKDistinct = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public int subarraysWithKDistinct(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int subarraysWithKDistinct(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,1,2,3]\n2", "expected_output": "7", "is_sample": True},
            {"input": "[1,2,1,3,4]\n3", "expected_output": "3", "is_sample": True},
            {"input": "[1,1,1,1]\n1", "expected_output": "10", "is_sample": False},
        ],
    },
    # ─── 36. Count Number of Nice Subarrays ────────────────────────────
    {
        "title": "Count Number of Nice Subarrays",
        "difficulty": "medium",
        "tags": ["array", "sliding-window"],
        "companies": ["amazon", "google", "bytedance", "uber"],
        "description": "Given an array of integers `nums` and an integer `k`, a continuous subarray is called nice if there are `k` odd numbers in it. Return the number of nice subarrays.\n\nExample 1:\nInput: nums = [1,1,2,1,1], k = 3\nOutput: 2\nExplanation: The subarrays [1,1,2,1] and [1,2,1,1] contain exactly 3 odd numbers.\n\nExample 2:\nInput: nums = [2,4,6], k = 1\nOutput: 0",
        "constraints": "1 <= nums.length <= 50000\n1 <= nums[i] <= 10^5\n1 <= k <= nums.length",
        "hints": "Transform the problem: replace each element with 1 if odd, 0 if even. Then count subarrays with sum exactly k using atMost(k) - atMost(k-1) or prefix sums.",
        "starter_code": {
            "python": "class Solution:\n    def numberOfSubarrays(self, nums: list[int], k: int) -> int:\n        pass",
            "javascript": "var numberOfSubarrays = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public int numberOfSubarrays(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int numberOfSubarrays(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,1,2,1,1]\n3", "expected_output": "2", "is_sample": True},
            {"input": "[2,4,6]\n1", "expected_output": "0", "is_sample": True},
            {"input": "[2,2,2,1,2,2,1,2,2,2]\n2", "expected_output": "16", "is_sample": False},
        ],
    },
    # ─── 37. Max Consecutive Ones III ──────────────────────────────────
    {
        "title": "Max Consecutive Ones III",
        "difficulty": "easy",
        "tags": ["array", "sliding-window"],
        "companies": ["google", "meta", "microsoft", "amazon"],
        "description": "Given a binary array `nums` and an integer `k`, return the maximum number of consecutive 1's in the array if you can flip at most `k` 0's.\n\nExample 1:\nInput: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2\nOutput: 6\nExplanation: Flip the two 0's at indices 5 and 10 to get [1,1,1,0,0,1,1,1,1,1,1].\n\nExample 2:\nInput: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3\nOutput: 10",
        "constraints": "1 <= nums.length <= 10^5\nnums[i] is either 0 or 1.\n0 <= k <= nums.length",
        "hints": "Use a sliding window. Expand right; when the count of zeros in the window exceeds k, shrink from the left.",
        "starter_code": {
            "python": "class Solution:\n    def longestOnes(self, nums: list[int], k: int) -> int:\n        pass",
            "javascript": "var longestOnes = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public int longestOnes(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int longestOnes(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,1,1,0,0,0,1,1,1,1,0]\n2", "expected_output": "6", "is_sample": True},
            {"input": "[0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1]\n3", "expected_output": "10", "is_sample": True},
            {"input": "[1,1,1,1]\n0", "expected_output": "4", "is_sample": False},
        ],
    },
    # ─── 38. Longest Turbulent Subarray ────────────────────────────────
    {
        "title": "Longest Turbulent Subarray",
        "difficulty": "medium",
        "tags": ["array"],
        "companies": ["amazon", "google", "lyft", "snap"],
        "description": "Given an integer array `arr`, return the length of a maximum size turbulent subarray. A subarray is turbulent if the comparison sign flips between each adjacent pair of elements: arr[i] > arr[i+1] < arr[i+2] > ... or arr[i] < arr[i+1] > arr[i+2] < ....\n\nExample 1:\nInput: arr = [9,4,2,10,7,8,8,1,9]\nOutput: 5\nExplanation: arr[1] > arr[2] < arr[3] > arr[4] < arr[5] is a turbulent subarray of length 5.\n\nExample 2:\nInput: arr = [4,8,12,16]\nOutput: 2",
        "constraints": "1 <= arr.length <= 4 * 10^4\n0 <= arr[i] <= 10^9",
        "hints": "Track two running lengths: one for subarrays ending with an increase and one for those ending with a decrease. Reset when the comparison sign doesn't flip.",
        "starter_code": {
            "python": "class Solution:\n    def maxTurbulenceSize(self, arr: list[int]) -> int:\n        pass",
            "javascript": "var maxTurbulenceSize = function(arr) {\n    \n};",
            "java": "class Solution {\n    public int maxTurbulenceSize(int[] arr) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxTurbulenceSize(vector<int>& arr) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[9,4,2,10,7,8,8,1,9]", "expected_output": "5", "is_sample": True},
            {"input": "[4,8,12,16]", "expected_output": "2", "is_sample": True},
            {"input": "[100]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 39. Maximum Points You Can Obtain from Cards ──────────────────
    {
        "title": "Maximum Points You Can Obtain from Cards",
        "difficulty": "medium",
        "tags": ["array", "sliding-window"],
        "companies": ["google", "amazon", "adobe", "doordash"],
        "description": "There are several cards arranged in a row, each with a point value given by `cardPoints[i]`. In one step you can take one card from the beginning or end of the row. You must take exactly `k` cards. Return the maximum score you can obtain.\n\nExample 1:\nInput: cardPoints = [1,2,3,4,5,6,1], k = 3\nOutput: 12\nExplanation: Take the three cards on the right to get 1+6+5 = 12.\n\nExample 2:\nInput: cardPoints = [9,7,7,9,7,7,9], k = 7\nOutput: 55",
        "constraints": "1 <= cardPoints.length <= 10^5\n1 <= cardPoints[i] <= 10^4\n1 <= k <= cardPoints.length",
        "hints": "Taking k cards from the ends is equivalent to leaving a contiguous subarray of length n-k. Find the minimum sum subarray of length n-k using a sliding window, then subtract from the total.",
        "starter_code": {
            "python": "class Solution:\n    def maxScore(self, cardPoints: list[int], k: int) -> int:\n        pass",
            "javascript": "var maxScore = function(cardPoints, k) {\n    \n};",
            "java": "class Solution {\n    public int maxScore(int[] cardPoints, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxScore(vector<int>& cardPoints, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4,5,6,1]\n3", "expected_output": "12", "is_sample": True},
            {"input": "[9,7,7,9,7,7,9]\n7", "expected_output": "55", "is_sample": True},
            {"input": "[1,79,80,1,1,1,200,1]\n3", "expected_output": "202", "is_sample": False},
        ],
    },
    # ─── 40. Minimum Operations to Reduce X to Zero ────────────────────
    {
        "title": "Minimum Operations to Reduce X to Zero",
        "difficulty": "hard",
        "tags": ["array", "sliding-window"],
        "companies": ["microsoft", "amazon", "google", "bytedance"],
        "description": "Given an integer array `nums` and an integer `x`, return the minimum number of operations to reduce `x` to exactly 0. In one operation you can remove the leftmost or rightmost element and subtract its value from `x`. Return -1 if it is not possible.\n\nExample 1:\nInput: nums = [1,1,4,2,3], x = 5\nOutput: 2\nExplanation: Remove the last two elements (3 + 2 = 5).\n\nExample 2:\nInput: nums = [5,6,7,8,9], x = 4\nOutput: -1",
        "constraints": "1 <= nums.length <= 10^5\n1 <= nums[i] <= 10^4\n1 <= x <= 10^9",
        "hints": "Removing elements from both ends to sum to x is equivalent to finding the longest contiguous subarray with sum equal to total - x. Use a sliding window for this.",
        "starter_code": {
            "python": "class Solution:\n    def minOperations(self, nums: list[int], x: int) -> int:\n        pass",
            "javascript": "var minOperations = function(nums, x) {\n    \n};",
            "java": "class Solution {\n    public int minOperations(int[] nums, int x) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minOperations(vector<int>& nums, int x) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,1,4,2,3]\n5", "expected_output": "2", "is_sample": True},
            {"input": "[5,6,7,8,9]\n4", "expected_output": "-1", "is_sample": True},
            {"input": "[3,2,20,1,1,3]\n10", "expected_output": "5", "is_sample": False},
        ],
    },
]

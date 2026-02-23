"""Batch 12: Mixed topics — unique problems (~43 with company labels)."""

PROBLEMS_BATCH12 = [
    # ─── 1. Longest Substring with At Least K Repeating Characters ────
    {
        "title": "Longest Substring with At Least K Repeating Characters",
        "difficulty": "medium",
        "tags": ["string", "sliding-window"],
        "companies": ["google", "meta", "amazon"],
        "description": "Given a string `s` and an integer `k`, return the length of the longest substring of `s` such that the frequency of each character in this substring is greater than or equal to `k`.\n\nExample 1:\nInput: s = \"aaabb\", k = 3\nOutput: 3\nExplanation: The longest substring is \"aaa\", as 'a' is repeated 3 times.\n\nExample 2:\nInput: s = \"ababbc\", k = 2\nOutput: 5\nExplanation: The longest substring is \"ababb\", as 'a' is repeated 2 times and 'b' is repeated 3 times.",
        "constraints": "1 <= s.length <= 10^4\ns consists of only lowercase English letters.\n1 <= k <= 10^5",
        "hints": "Use divide and conquer: any character with frequency < k cannot be part of the result, so split on such characters and recurse. Alternatively, iterate over the number of unique characters allowed in the window.",
        "starter_code": {
            "python": "class Solution:\n    def longestSubstring(self, s: str, k: int) -> int:\n        pass",
            "javascript": "var longestSubstring = function(s, k) {\n    \n};",
            "java": "class Solution {\n    public int longestSubstring(String s, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int longestSubstring(string s, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "s = \"aaabb\", k = 3", "expected_output": "3", "is_sample": True},
            {"input": "s = \"ababbc\", k = 2", "expected_output": "5", "is_sample": True},
            {"input": "s = \"a\", k = 1", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 2. Minimum Deletions to Make Character Frequencies Unique ─────
    {
        "title": "Minimum Deletions to Make Character Frequencies Unique",
        "difficulty": "medium",
        "tags": ["string", "greedy", "sorting"],
        "companies": ["microsoft", "amazon", "adobe", "google"],
        "description": "A string `s` is called good if there are no two different characters in `s` that have the same frequency. Given a string `s`, return the minimum number of character deletions to make `s` good.\n\nExample 1:\nInput: s = \"aab\"\nOutput: 0\nExplanation: Each character already has a unique frequency.\n\nExample 2:\nInput: s = \"aaabbbcc\"\nOutput: 2\nExplanation: Delete two 'c's to get \"aaabbb\" where 'a' has freq 3 and 'b' has freq 3 — still not good. Better: delete one 'b' and one 'c' to get frequencies {a:3, b:2, c:1}.",
        "constraints": "1 <= s.length <= 10^5\ns contains only lowercase English letters.",
        "hints": "Count frequencies, sort descending, then greedily reduce any frequency that is not strictly less than the previous one.",
        "starter_code": {
            "python": "class Solution:\n    def minDeletions(self, s: str) -> int:\n        pass",
            "javascript": "var minDeletions = function(s) {\n    \n};",
            "java": "class Solution {\n    public int minDeletions(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minDeletions(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"aab\"", "expected_output": "0", "is_sample": True},
            {"input": "\"aaabbbcc\"", "expected_output": "2", "is_sample": True},
            {"input": "\"ceabaacb\"", "expected_output": "2", "is_sample": False},
        ],
    },
    # ─── 3. Minimum Number of Steps to Make Two Strings Anagram ────────
    {
        "title": "Minimum Number of Steps to Make Two Strings Anagram",
        "difficulty": "medium",
        "tags": ["string", "hash-table"],
        "companies": ["amazon", "google", "uber"],
        "description": "Given two strings `s` and `t` of the same length, return the minimum number of steps to make `t` an anagram of `s`. In one step you can replace any character in `t` with any other character.\n\nExample 1:\nInput: s = \"bab\", t = \"aba\"\nOutput: 1\nExplanation: Replace the first 'a' in t with 'b', t = \"bba\" which is an anagram of s.\n\nExample 2:\nInput: s = \"leetcode\", t = \"practice\"\nOutput: 5",
        "constraints": "1 <= s.length <= 5 * 10^4\ns.length == t.length\ns and t consist of lowercase English letters only.",
        "hints": "Count the frequency of each character in both strings. The answer is the sum of positive differences (count_s[c] - count_t[c]) for all characters where s has more.",
        "starter_code": {
            "python": "class Solution:\n    def minSteps(self, s: str, t: str) -> int:\n        pass",
            "javascript": "var minSteps = function(s, t) {\n    \n};",
            "java": "class Solution {\n    public int minSteps(String s, String t) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minSteps(string s, string t) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "s = \"bab\", t = \"aba\"", "expected_output": "1", "is_sample": True},
            {"input": "s = \"leetcode\", t = \"practice\"", "expected_output": "5", "is_sample": True},
            {"input": "s = \"anagram\", t = \"mangaar\"", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 4. Determine if Two Strings Are Close ─────────────────────────
    {
        "title": "Determine if Two Strings Are Close",
        "difficulty": "medium",
        "tags": ["string", "hash-table", "sorting"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "Two strings are considered close if you can attain one from the other using the following operations: swap any two existing characters, or transform every occurrence of one character into another and vice versa. Return `true` if the two strings are close, and `false` otherwise.\n\nExample 1:\nInput: word1 = \"abc\", word2 = \"bca\"\nOutput: true\nExplanation: Apply operation 1 twice: \"abc\" -> \"acb\" -> \"bca\".\n\nExample 2:\nInput: word1 = \"cabbba\", word2 = \"abbccc\"\nOutput: true",
        "constraints": "1 <= word1.length, word2.length <= 10^5\nword1 and word2 contain only lowercase English letters.",
        "hints": "Two strings are close iff they have the same set of characters and the sorted list of character frequencies is identical.",
        "starter_code": {
            "python": "class Solution:\n    def closeStrings(self, word1: str, word2: str) -> bool:\n        pass",
            "javascript": "var closeStrings = function(word1, word2) {\n    \n};",
            "java": "class Solution {\n    public boolean closeStrings(String word1, String word2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool closeStrings(string word1, string word2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "word1 = \"abc\", word2 = \"bca\"", "expected_output": "true", "is_sample": True},
            {"input": "word1 = \"cabbba\", word2 = \"abbccc\"", "expected_output": "true", "is_sample": True},
            {"input": "word1 = \"uau\", word2 = \"ssx\"", "expected_output": "false", "is_sample": False},
        ],
    },
    # ─── 5. Longest Palindrome ─────────────────────────────────────────
    {
        "title": "Longest Palindrome",
        "difficulty": "easy",
        "tags": ["string", "hash-table", "greedy"],
        "companies": ["google", "amazon", "uber", "apple"],
        "description": "Given a string `s` which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters. Letters are case sensitive.\n\nExample 1:\nInput: s = \"abccccdd\"\nOutput: 7\nExplanation: One longest palindrome that can be built is \"dccaccd\", whose length is 7.\n\nExample 2:\nInput: s = \"a\"\nOutput: 1",
        "constraints": "1 <= s.length <= 2000\ns consists of lowercase and/or uppercase English letters only.",
        "hints": "Count character frequencies. Each pair contributes 2 to the palindrome length. If any character has an odd count, we can place one in the center.",
        "starter_code": {
            "python": "class Solution:\n    def longestPalindrome(self, s: str) -> int:\n        pass",
            "javascript": "var longestPalindrome = function(s) {\n    \n};",
            "java": "class Solution {\n    public int longestPalindrome(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int longestPalindrome(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"abccccdd\"", "expected_output": "7", "is_sample": True},
            {"input": "\"a\"", "expected_output": "1", "is_sample": True},
            {"input": "\"Aa\"", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 6. Check If Two String Arrays are Equivalent ──────────────────
    {
        "title": "Check If Two String Arrays are Equivalent",
        "difficulty": "easy",
        "tags": ["string"],
        "companies": ["meta", "google", "microsoft"],
        "description": "Given two string arrays `word1` and `word2`, return `true` if the two arrays represent the same string, and `false` otherwise. A string is represented by an array if the array elements concatenated in order forms the string.\n\nExample 1:\nInput: word1 = [\"ab\", \"c\"], word2 = [\"a\", \"bc\"]\nOutput: true\n\nExample 2:\nInput: word1 = [\"a\", \"cb\"], word2 = [\"ab\", \"c\"]\nOutput: false",
        "constraints": "1 <= word1.length, word2.length <= 10^3\n1 <= word1[i].length, word2[i].length <= 10^3\n1 <= sum(word1[i].length), sum(word2[i].length) <= 10^3\nword1[i] and word2[i] consist of lowercase letters.",
        "hints": "Simply concatenate all strings in each array and compare the results. For O(1) extra space, use two pointers across both arrays.",
        "starter_code": {
            "python": "class Solution:\n    def arrayStringsAreEqual(self, word1: list[str], word2: list[str]) -> bool:\n        pass",
            "javascript": "var arrayStringsAreEqual = function(word1, word2) {\n    \n};",
            "java": "class Solution {\n    public boolean arrayStringsAreEqual(String[] word1, String[] word2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool arrayStringsAreEqual(vector<string>& word1, vector<string>& word2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "word1 = [\"ab\", \"c\"], word2 = [\"a\", \"bc\"]", "expected_output": "true", "is_sample": True},
            {"input": "word1 = [\"a\", \"cb\"], word2 = [\"ab\", \"c\"]", "expected_output": "false", "is_sample": True},
            {"input": "word1 = [\"abc\", \"d\", \"defg\"], word2 = [\"abcddefg\"]", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 7. Maximum Number of Vowels in a Substring of Given Length ────
    {
        "title": "Maximum Number of Vowels in a Substring of Given Length",
        "difficulty": "medium",
        "tags": ["string", "sliding-window"],
        "companies": ["amazon", "microsoft", "adobe"],
        "description": "Given a string `s` and an integer `k`, return the maximum number of vowel letters in any substring of `s` with length `k`. Vowel letters are 'a', 'e', 'i', 'o', and 'u'.\n\nExample 1:\nInput: s = \"abciiidef\", k = 3\nOutput: 3\nExplanation: The substring \"iii\" contains 3 vowel letters.\n\nExample 2:\nInput: s = \"aeiou\", k = 2\nOutput: 2",
        "constraints": "1 <= s.length <= 10^5\ns consists of lowercase English letters.\n1 <= k <= s.length",
        "hints": "Use a sliding window of size k. Count vowels in the initial window, then slide right: add the new character and subtract the outgoing character.",
        "starter_code": {
            "python": "class Solution:\n    def maxVowels(self, s: str, k: int) -> int:\n        pass",
            "javascript": "var maxVowels = function(s, k) {\n    \n};",
            "java": "class Solution {\n    public int maxVowels(String s, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxVowels(string s, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "s = \"abciiidef\", k = 3", "expected_output": "3", "is_sample": True},
            {"input": "s = \"aeiou\", k = 2", "expected_output": "2", "is_sample": True},
            {"input": "s = \"leetcode\", k = 3", "expected_output": "2", "is_sample": False},
        ],
    },
    # ─── 8. Longest Subarray of 1's After Deleting One Element ─────────
    {
        "title": "Longest Subarray of 1's After Deleting One Element",
        "difficulty": "medium",
        "tags": ["array", "sliding-window"],
        "companies": ["google", "meta", "uber"],
        "description": "Given a binary array `nums`, you should delete one element from it. Return the size of the longest non-empty subarray containing only 1's in the resulting array. Return 0 if there is no such subarray.\n\nExample 1:\nInput: nums = [1,1,0,1,1,1,0,1]\nOutput: 5\nExplanation: After deleting the element at index 2, the array is [1,1,1,1,1,0,1] and the longest subarray of 1's has length 5.\n\nExample 2:\nInput: nums = [0,1,1,1,0,1,1,0,1]\nOutput: 5",
        "constraints": "1 <= nums.length <= 10^5\nnums[i] is either 0 or 1.",
        "hints": "Use a sliding window that allows at most one 0 inside. The answer is window_size - 1 (since we must delete one element).",
        "starter_code": {
            "python": "class Solution:\n    def longestSubarray(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var longestSubarray = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int longestSubarray(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int longestSubarray(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,1,0,1,1,1,0,1]", "expected_output": "5", "is_sample": True},
            {"input": "[0,1,1,1,0,1,1,0,1]", "expected_output": "5", "is_sample": True},
            {"input": "[1,1,1]", "expected_output": "2", "is_sample": False},
        ],
    },
    # ─── 9. Number of Sub-arrays of Size K and Average >= Threshold ────
    {
        "title": "Number of Sub-arrays of Size K and Average Greater Than or Equal to Threshold",
        "difficulty": "medium",
        "tags": ["array", "sliding-window"],
        "companies": ["amazon", "google", "adobe"],
        "description": "Given an array of integers `arr` and two integers `k` and `threshold`, return the number of sub-arrays of size `k` and average greater than or equal to `threshold`.\n\nExample 1:\nInput: arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4\nOutput: 3\nExplanation: Sub-arrays [2,5,5], [5,5,5], [5,5,8] have averages 4, 5, and 6 respectively.\n\nExample 2:\nInput: arr = [11,13,17,23,29,31,7,5,2,3], k = 3, threshold = 5\nOutput: 6",
        "constraints": "1 <= arr.length <= 10^5\n1 <= arr[i] <= 10^4\n1 <= k <= arr.length\n0 <= threshold <= 10^4",
        "hints": "Use a sliding window of size k. Instead of computing averages, compare the window sum with k * threshold to avoid floating-point issues.",
        "starter_code": {
            "python": "class Solution:\n    def numOfSubarrays(self, arr: list[int], k: int, threshold: int) -> int:\n        pass",
            "javascript": "var numOfSubarrays = function(arr, k, threshold) {\n    \n};",
            "java": "class Solution {\n    public int numOfSubarrays(int[] arr, int k, int threshold) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int numOfSubarrays(vector<int>& arr, int k, int threshold) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4", "expected_output": "3", "is_sample": True},
            {"input": "arr = [11,13,17,23,29,31,7,5,2,3], k = 3, threshold = 5", "expected_output": "6", "is_sample": True},
            {"input": "arr = [1,1,1,1,1], k = 1, threshold = 0", "expected_output": "5", "is_sample": False},
        ],
    },
    # ─── 10. Minimum Swaps to Group All 1's Together ───────────────────
    {
        "title": "Minimum Swaps to Group All 1's Together",
        "difficulty": "medium",
        "tags": ["array", "sliding-window"],
        "companies": ["microsoft", "amazon", "uber", "google"],
        "description": "Given a binary array `data`, return the minimum number of swaps required to group all 1's present in the array together in any place in the array.\n\nExample 1:\nInput: data = [1,0,1,0,1]\nOutput: 1\nExplanation: Swap data[1] and data[3] to get [1,1,1,0,0].\n\nExample 2:\nInput: data = [0,0,0,1,0]\nOutput: 0",
        "constraints": "1 <= data.length <= 10^5\ndata[i] is either 0 or 1.",
        "hints": "Count total 1's (call it k). Use a sliding window of size k and find the window with the maximum number of 1's. The answer is k minus that maximum.",
        "starter_code": {
            "python": "class Solution:\n    def minSwaps(self, data: list[int]) -> int:\n        pass",
            "javascript": "var minSwaps = function(data) {\n    \n};",
            "java": "class Solution {\n    public int minSwaps(int[] data) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minSwaps(vector<int>& data) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,0,1,0,1]", "expected_output": "1", "is_sample": True},
            {"input": "[0,0,0,1,0]", "expected_output": "0", "is_sample": True},
            {"input": "[1,0,1,0,1,0,0,1,1,0,1]", "expected_output": "3", "is_sample": False},
        ],
    },
    # ─── 11. Word Subsets ──────────────────────────────────────────────
    {
        "title": "Word Subsets",
        "difficulty": "medium",
        "tags": ["string", "array"],
        "companies": ["google", "amazon", "bytedance"],
        "description": "You are given two string arrays `words1` and `words2`. A string `b` is a subset of string `a` if every letter in `b` occurs in `a` including multiplicity. A word `a` from `words1` is universal if for every `b` in `words2`, `b` is a subset of `a`. Return all universal words in `words1`.\n\nExample 1:\nInput: words1 = [\"amazon\",\"apple\",\"facebook\",\"google\",\"leetcode\"], words2 = [\"e\",\"o\"]\nOutput: [\"facebook\",\"google\",\"leetcode\"]\n\nExample 2:\nInput: words1 = [\"amazon\",\"apple\",\"facebook\",\"google\",\"leetcode\"], words2 = [\"lo\",\"eo\"]\nOutput: [\"google\",\"leetcode\"]",
        "constraints": "1 <= words1.length, words2.length <= 10^4\n1 <= words1[i].length, words2[i].length <= 10\nwords1[i] and words2[i] consist only of lowercase English letters.",
        "hints": "Compute the maximum frequency required for each character across all words in words2. Then check each word in words1 against this combined requirement.",
        "starter_code": {
            "python": "class Solution:\n    def wordSubsets(self, words1: list[str], words2: list[str]) -> list[str]:\n        pass",
            "javascript": "var wordSubsets = function(words1, words2) {\n    \n};",
            "java": "class Solution {\n    public List<String> wordSubsets(String[] words1, String[] words2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<string> wordSubsets(vector<string>& words1, vector<string>& words2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "words1 = [\"amazon\",\"apple\",\"facebook\",\"google\",\"leetcode\"], words2 = [\"e\",\"o\"]", "expected_output": "[\"facebook\",\"google\",\"leetcode\"]", "is_sample": True},
            {"input": "words1 = [\"amazon\",\"apple\",\"facebook\",\"google\",\"leetcode\"], words2 = [\"lo\",\"eo\"]", "expected_output": "[\"google\",\"leetcode\"]", "is_sample": True},
            {"input": "words1 = [\"acaac\",\"cccbb\",\"aacbb\",\"cccbb\",\"aacbb\"], words2 = [\"ab\",\"a\"]", "expected_output": "[\"aacbb\",\"aacbb\"]", "is_sample": False},
        ],
    },
    # ─── 12. Custom Sort String ────────────────────────────────────────
    {
        "title": "Custom Sort String",
        "difficulty": "medium",
        "tags": ["string", "sorting", "hash-table"],
        "companies": ["meta", "amazon", "google", "uber"],
        "description": "You are given two strings `order` and `s`. All characters of `order` are unique and were sorted in some custom order previously. Permute the characters of `s` so that they match the order that `order` was sorted. If a character in `s` does not appear in `order`, it can be placed at any position.\n\nExample 1:\nInput: order = \"cba\", s = \"abcd\"\nOutput: \"cbad\"\n\nExample 2:\nInput: order = \"bcafg\", s = \"abcd\"\nOutput: \"bcad\"",
        "constraints": "1 <= order.length <= 26\n1 <= s.length <= 200\norder and s consist of lowercase English letters.\nAll characters of order are unique.",
        "hints": "Count character frequencies in s. Iterate through order and append each character the required number of times, then append remaining characters.",
        "starter_code": {
            "python": "class Solution:\n    def customSortString(self, order: str, s: str) -> str:\n        pass",
            "javascript": "var customSortString = function(order, s) {\n    \n};",
            "java": "class Solution {\n    public String customSortString(String order, String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string customSortString(string order, string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "order = \"cba\", s = \"abcd\"", "expected_output": "\"cbad\"", "is_sample": True},
            {"input": "order = \"bcafg\", s = \"abcd\"", "expected_output": "\"bcad\"", "is_sample": True},
            {"input": "order = \"kqep\", s = \"pekeq\"", "expected_output": "\"kqeep\"", "is_sample": False},
        ],
    },
    # ─── 13. Group the People Given the Group Size They Belong To ──────
    {
        "title": "Group the People Given the Group Size They Belong To",
        "difficulty": "medium",
        "tags": ["hash-table", "greedy"],
        "companies": ["amazon", "uber", "oracle"],
        "description": "There are `n` people that are split into some unknown number of groups. Each person is labeled with a unique ID from 0 to n - 1. You are given an integer array `groupSizes` where `groupSizes[i]` is the size of the group that person `i` is in. Return a list of groups such that each person `i` is in a group of size `groupSizes[i]`.\n\nExample 1:\nInput: groupSizes = [3,3,3,3,3,1,3]\nOutput: [[5],[0,1,2],[3,4,6]]\n\nExample 2:\nInput: groupSizes = [2,1,3,3,3,2]\nOutput: [[1],[0,5],[2,3,4]]",
        "constraints": "groupSizes.length == n\n1 <= n <= 500\n1 <= groupSizes[i] <= n",
        "hints": "Use a hash map from group size to a list of person IDs. When a list reaches the required size, output it as a group and start a new list.",
        "starter_code": {
            "python": "class Solution:\n    def groupThePeople(self, groupSizes: list[int]) -> list[list[int]]:\n        pass",
            "javascript": "var groupThePeople = function(groupSizes) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> groupThePeople(int[] groupSizes) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> groupThePeople(vector<int>& groupSizes) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,3,3,3,3,1,3]", "expected_output": "[[5],[0,1,2],[3,4,6]]", "is_sample": True},
            {"input": "[2,1,3,3,3,2]", "expected_output": "[[1],[0,5],[2,3,4]]", "is_sample": True},
            {"input": "[1,1,1,1]", "expected_output": "[[0],[1],[2],[3]]", "is_sample": False},
        ],
    },
    # ─── 14. Reduce Array Size to The Half ─────────────────────────────
    {
        "title": "Reduce Array Size to The Half",
        "difficulty": "medium",
        "tags": ["array", "hash-table", "greedy", "sorting"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "You are given an integer array `arr`. You can choose a set of integers and remove all occurrences of these integers from the array. Return the minimum size of the set so that at least half of the integers of the array are removed.\n\nExample 1:\nInput: arr = [3,3,3,3,5,5,5,2,2,7]\nOutput: 2\nExplanation: Choosing {3,7} removes 5 elements (four 3's and one 7), which is >= 10/2 = 5.\n\nExample 2:\nInput: arr = [7,7,7,7,7,7]\nOutput: 1",
        "constraints": "2 <= arr.length <= 10^5\narr.length is even.\n1 <= arr[i] <= 10^5",
        "hints": "Count frequencies and sort them in descending order. Greedily remove the most frequent elements until you have removed at least half the array.",
        "starter_code": {
            "python": "class Solution:\n    def minSetSize(self, arr: list[int]) -> int:\n        pass",
            "javascript": "var minSetSize = function(arr) {\n    \n};",
            "java": "class Solution {\n    public int minSetSize(int[] arr) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minSetSize(vector<int>& arr) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,3,3,3,5,5,5,2,2,7]", "expected_output": "2", "is_sample": True},
            {"input": "[7,7,7,7,7,7]", "expected_output": "1", "is_sample": True},
            {"input": "[1,2,3,4,5,6,7,8,9,10]", "expected_output": "5", "is_sample": False},
        ],
    },
    # ─── 15. Top K Frequent Words ──────────────────────────────────────
    {
        "title": "Top K Frequent Words",
        "difficulty": "medium",
        "tags": ["hash-table", "heap", "sorting", "string"],
        "companies": ["amazon", "meta", "google", "uber"],
        "description": "Given an array of strings `words` and an integer `k`, return the `k` most frequent strings. Return the answer sorted by frequency from highest to lowest. If two words have the same frequency, sort them lexicographically.\n\nExample 1:\nInput: words = [\"i\",\"love\",\"leetcode\",\"i\",\"love\",\"coding\"], k = 2\nOutput: [\"i\",\"love\"]\n\nExample 2:\nInput: words = [\"the\",\"day\",\"is\",\"sunny\",\"the\",\"the\",\"the\",\"sunny\",\"is\",\"is\"], k = 4\nOutput: [\"the\",\"is\",\"sunny\",\"day\"]",
        "constraints": "1 <= words.length <= 500\n1 <= words[i].length <= 10\nwords[i] consists of lowercase English letters.\nk is in the range [1, The number of unique words[i]].",
        "hints": "Use a hash map to count frequencies. Then use a heap or sort by (-frequency, word) to get the top k.",
        "starter_code": {
            "python": "class Solution:\n    def topKFrequent(self, words: list[str], k: int) -> list[str]:\n        pass",
            "javascript": "var topKFrequent = function(words, k) {\n    \n};",
            "java": "class Solution {\n    public List<String> topKFrequent(String[] words, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<string> topKFrequent(vector<string>& words, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "words = [\"i\",\"love\",\"leetcode\",\"i\",\"love\",\"coding\"], k = 2", "expected_output": "[\"i\",\"love\"]", "is_sample": True},
            {"input": "words = [\"the\",\"day\",\"is\",\"sunny\",\"the\",\"the\",\"the\",\"sunny\",\"is\",\"is\"], k = 4", "expected_output": "[\"the\",\"is\",\"sunny\",\"day\"]", "is_sample": True},
            {"input": "words = [\"a\",\"b\",\"c\"], k = 3", "expected_output": "[\"a\",\"b\",\"c\"]", "is_sample": False},
        ],
    },
    # ─── 16. Verifying an Alien Dictionary ─────────────────────────────
    {
        "title": "Verifying an Alien Dictionary",
        "difficulty": "easy",
        "tags": ["string", "hash-table"],
        "companies": ["meta", "amazon", "apple"],
        "description": "In an alien language, they also use English lowercase letters, but in a different order. Given a sequence of `words` written in the alien language and the `order` of the alphabet, return `true` if the words are sorted lexicographically in this alien language.\n\nExample 1:\nInput: words = [\"hello\",\"leetcode\"], order = \"hlabcdefgijkmnopqrstuvwxyz\"\nOutput: true\n\nExample 2:\nInput: words = [\"word\",\"world\",\"row\"], order = \"worldabcefghijkmnpqstuvxyz\"\nOutput: false",
        "constraints": "1 <= words.length <= 100\n1 <= words[i].length <= 20\norder.length == 26\nAll characters in words[i] and order are lowercase English letters.",
        "hints": "Map each character to its position in the alien order. Then compare adjacent words pairwise using this mapping.",
        "starter_code": {
            "python": "class Solution:\n    def isAlienSorted(self, words: list[str], order: str) -> bool:\n        pass",
            "javascript": "var isAlienSorted = function(words, order) {\n    \n};",
            "java": "class Solution {\n    public boolean isAlienSorted(String[] words, String order) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isAlienSorted(vector<string>& words, string order) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "words = [\"hello\",\"leetcode\"], order = \"hlabcdefgijkmnopqrstuvwxyz\"", "expected_output": "true", "is_sample": True},
            {"input": "words = [\"word\",\"world\",\"row\"], order = \"worldabcefghijkmnpqstuvxyz\"", "expected_output": "false", "is_sample": True},
            {"input": "words = [\"apple\",\"app\"], order = \"abcdefghijklmnopqrstuvwxyz\"", "expected_output": "false", "is_sample": False},
        ],
    },
    # ─── 17. Can Place Flowers ─────────────────────────────────────────
    {
        "title": "Can Place Flowers",
        "difficulty": "easy",
        "tags": ["array", "greedy"],
        "companies": ["linkedin", "amazon", "meta"],
        "description": "You have a long flowerbed in which some of the plots are planted and some are not. Flowers cannot be planted in adjacent plots. Given an integer array `flowerbed` containing 0's and 1's (0 means empty, 1 means planted), and an integer `n`, return `true` if `n` new flowers can be planted without violating the no-adjacent-flowers rule.\n\nExample 1:\nInput: flowerbed = [1,0,0,0,1], n = 1\nOutput: true\n\nExample 2:\nInput: flowerbed = [1,0,0,0,1], n = 2\nOutput: false",
        "constraints": "1 <= flowerbed.length <= 2 * 10^4\nflowerbed[i] is 0 or 1.\nThere are no two adjacent flowers in flowerbed.\n0 <= n <= flowerbed.length",
        "hints": "Greedily plant flowers from left to right. If position i is 0 and both neighbors are 0 (or out of bounds), plant there and increment count.",
        "starter_code": {
            "python": "class Solution:\n    def canPlaceFlowers(self, flowerbed: list[int], n: int) -> bool:\n        pass",
            "javascript": "var canPlaceFlowers = function(flowerbed, n) {\n    \n};",
            "java": "class Solution {\n    public boolean canPlaceFlowers(int[] flowerbed, int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool canPlaceFlowers(vector<int>& flowerbed, int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "flowerbed = [1,0,0,0,1], n = 1", "expected_output": "true", "is_sample": True},
            {"input": "flowerbed = [1,0,0,0,1], n = 2", "expected_output": "false", "is_sample": True},
            {"input": "flowerbed = [0,0,0,0,0], n = 3", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 18. Kids With the Greatest Number of Candies ──────────────────
    {
        "title": "Kids With the Greatest Number of Candies",
        "difficulty": "easy",
        "tags": ["array"],
        "companies": ["amazon", "apple", "microsoft"],
        "description": "There are `n` kids with candies. You are given an integer array `candies` where each `candies[i]` represents the number of candies the i-th kid has, and an integer `extraCandies`. For each kid, check if there is a way to distribute the extra candies such that they have the greatest number of candies among all kids. Return a boolean array `result`.\n\nExample 1:\nInput: candies = [2,3,5,1,3], extraCandies = 3\nOutput: [true,true,true,false,true]\n\nExample 2:\nInput: candies = [4,2,1,1,2], extraCandies = 1\nOutput: [true,false,false,false,false]",
        "constraints": "n == candies.length\n2 <= n <= 100\n1 <= candies[i] <= 100\n1 <= extraCandies <= 50",
        "hints": "Find the maximum in the array. For each kid, check if candies[i] + extraCandies >= max.",
        "starter_code": {
            "python": "class Solution:\n    def kidsWithCandies(self, candies: list[int], extraCandies: int) -> list[bool]:\n        pass",
            "javascript": "var kidsWithCandies = function(candies, extraCandies) {\n    \n};",
            "java": "class Solution {\n    public List<Boolean> kidsWithCandies(int[] candies, int extraCandies) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<bool> kidsWithCandies(vector<int>& candies, int extraCandies) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "candies = [2,3,5,1,3], extraCandies = 3", "expected_output": "[true,true,true,false,true]", "is_sample": True},
            {"input": "candies = [4,2,1,1,2], extraCandies = 1", "expected_output": "[true,false,false,false,false]", "is_sample": True},
            {"input": "candies = [12,1,12], extraCandies = 10", "expected_output": "[true,false,true]", "is_sample": False},
        ],
    },
    # ─── 19. Maximum Average Subarray I ────────────────────────────────
    {
        "title": "Maximum Average Subarray I",
        "difficulty": "easy",
        "tags": ["array", "sliding-window"],
        "companies": ["google", "amazon", "meta"],
        "description": "You are given an integer array `nums` consisting of `n` elements, and an integer `k`. Find a contiguous subarray whose length is equal to `k` that has the maximum average value and return this value.\n\nExample 1:\nInput: nums = [1,12,-5,-6,50,3], k = 4\nOutput: 12.75\nExplanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75.\n\nExample 2:\nInput: nums = [5], k = 1\nOutput: 5.0",
        "constraints": "n == nums.length\n1 <= k <= n <= 10^5\n-10^4 <= nums[i] <= 10^4",
        "hints": "Use a sliding window of size k. Compute the sum of the first window, then slide and track the maximum sum. Divide by k at the end.",
        "starter_code": {
            "python": "class Solution:\n    def findMaxAverage(self, nums: list[int], k: int) -> float:\n        pass",
            "javascript": "var findMaxAverage = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public double findMaxAverage(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    double findMaxAverage(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "nums = [1,12,-5,-6,50,3], k = 4", "expected_output": "12.75", "is_sample": True},
            {"input": "nums = [5], k = 1", "expected_output": "5.0", "is_sample": True},
            {"input": "nums = [0,4,0,3,2], k = 1", "expected_output": "4.0", "is_sample": False},
        ],
    },
    # ─── 20. Running Sum of 1d Array ───────────────────────────────────
    {
        "title": "Running Sum of 1d Array",
        "difficulty": "easy",
        "tags": ["array"],
        "companies": ["amazon", "adobe", "apple"],
        "description": "Given an array `nums`, return the running sum of the array. The running sum is defined as `runningSum[i] = sum(nums[0]...nums[i])`.\n\nExample 1:\nInput: nums = [1,2,3,4]\nOutput: [1,3,6,10]\nExplanation: Running sum is [1, 1+2, 1+2+3, 1+2+3+4].\n\nExample 2:\nInput: nums = [3,1,2,10,1]\nOutput: [3,4,6,16,17]",
        "constraints": "1 <= nums.length <= 1000\n-10^6 <= nums[i] <= 10^6",
        "hints": "Iterate through the array and keep a running total. Replace each element with the current total or build a new array.",
        "starter_code": {
            "python": "class Solution:\n    def runningSum(self, nums: list[int]) -> list[int]:\n        pass",
            "javascript": "var runningSum = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int[] runningSum(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> runningSum(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4]", "expected_output": "[1,3,6,10]", "is_sample": True},
            {"input": "[3,1,2,10,1]", "expected_output": "[3,4,6,16,17]", "is_sample": True},
            {"input": "[1,1,1,1,1]", "expected_output": "[1,2,3,4,5]", "is_sample": False},
        ],
    },
    # ─── 21. Find Pivot Index ──────────────────────────────────────────
    {
        "title": "Find Pivot Index",
        "difficulty": "easy",
        "tags": ["array"],
        "companies": ["meta", "amazon", "google"],
        "description": "Given an array of integers `nums`, calculate the pivot index of this array. The pivot index is the index where the sum of all numbers strictly to the left equals the sum of all numbers strictly to the right. Return the leftmost pivot index. If no such index exists, return -1.\n\nExample 1:\nInput: nums = [1,7,3,6,5,6]\nOutput: 3\nExplanation: Left sum = 1+7+3 = 11, Right sum = 5+6 = 11.\n\nExample 2:\nInput: nums = [1,2,3]\nOutput: -1",
        "constraints": "1 <= nums.length <= 10^4\n-1000 <= nums[i] <= 1000",
        "hints": "Compute the total sum. Iterate through the array maintaining a left sum. At each index, right sum = total - left - nums[i]. Check if left == right.",
        "starter_code": {
            "python": "class Solution:\n    def pivotIndex(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var pivotIndex = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int pivotIndex(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int pivotIndex(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,7,3,6,5,6]", "expected_output": "3", "is_sample": True},
            {"input": "[1,2,3]", "expected_output": "-1", "is_sample": True},
            {"input": "[2,1,-1]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 22. Richest Customer Wealth ───────────────────────────────────
    {
        "title": "Richest Customer Wealth",
        "difficulty": "easy",
        "tags": ["array", "matrix"],
        "companies": ["google", "amazon", "apple"],
        "description": "You are given an `m x n` integer grid `accounts` where `accounts[i][j]` is the amount of money the i-th customer has in the j-th bank. Return the wealth that the richest customer has. A customer's wealth is the sum of money in all their bank accounts.\n\nExample 1:\nInput: accounts = [[1,2,3],[3,2,1]]\nOutput: 6\n\nExample 2:\nInput: accounts = [[1,5],[7,3],[3,5]]\nOutput: 10",
        "constraints": "m == accounts.length\nn == accounts[i].length\n1 <= m, n <= 50\n1 <= accounts[i][j] <= 100",
        "hints": "For each row, compute the sum. Return the maximum row sum.",
        "starter_code": {
            "python": "class Solution:\n    def maximumWealth(self, accounts: list[list[int]]) -> int:\n        pass",
            "javascript": "var maximumWealth = function(accounts) {\n    \n};",
            "java": "class Solution {\n    public int maximumWealth(int[][] accounts) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maximumWealth(vector<vector<int>>& accounts) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2,3],[3,2,1]]", "expected_output": "6", "is_sample": True},
            {"input": "[[1,5],[7,3],[3,5]]", "expected_output": "10", "is_sample": True},
            {"input": "[[2,8,7],[7,1,3],[1,9,5]]", "expected_output": "17", "is_sample": False},
        ],
    },
    # ─── 23. Matrix Diagonal Sum ───────────────────────────────────────
    {
        "title": "Matrix Diagonal Sum",
        "difficulty": "easy",
        "tags": ["array", "matrix"],
        "companies": ["amazon", "microsoft", "adobe"],
        "description": "Given a square matrix `mat`, return the sum of the matrix diagonals. Only include the sum of all the elements on the primary diagonal and all the elements on the secondary diagonal that are not part of the primary diagonal.\n\nExample 1:\nInput: mat = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: 25\nExplanation: Diagonals sum: 1 + 5 + 9 + 3 + 7 = 25. Element mat[1][1] = 5 is counted only once.\n\nExample 2:\nInput: mat = [[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1]]\nOutput: 8",
        "constraints": "n == mat.length == mat[i].length\n1 <= n <= 100\n1 <= mat[i][j] <= 100",
        "hints": "Iterate from 0 to n-1. Add mat[i][i] (primary) and mat[i][n-1-i] (secondary). If n is odd, subtract the center element once to avoid double counting.",
        "starter_code": {
            "python": "class Solution:\n    def diagonalSum(self, mat: list[list[int]]) -> int:\n        pass",
            "javascript": "var diagonalSum = function(mat) {\n    \n};",
            "java": "class Solution {\n    public int diagonalSum(int[][] mat) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int diagonalSum(vector<vector<int>>& mat) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2,3],[4,5,6],[7,8,9]]", "expected_output": "25", "is_sample": True},
            {"input": "[[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1]]", "expected_output": "8", "is_sample": True},
            {"input": "[[5]]", "expected_output": "5", "is_sample": False},
        ],
    },
    # ─── 24. Transpose Matrix ──────────────────────────────────────────
    {
        "title": "Transpose Matrix",
        "difficulty": "easy",
        "tags": ["matrix"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "Given a 2D integer array `matrix`, return the transpose of `matrix`. The transpose of a matrix is obtained by flipping it over its main diagonal, switching the row and column indices.\n\nExample 1:\nInput: matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [[1,4,7],[2,5,8],[3,6,9]]\n\nExample 2:\nInput: matrix = [[1,2,3],[4,5,6]]\nOutput: [[1,4],[2,5],[3,6]]",
        "constraints": "m == matrix.length\nn == matrix[i].length\n1 <= m, n <= 1000\n1 <= m * n <= 10^5\n-10^9 <= matrix[i][j] <= 10^9",
        "hints": "Create a new matrix of dimensions n x m. Set result[j][i] = matrix[i][j] for all i, j.",
        "starter_code": {
            "python": "class Solution:\n    def transpose(self, matrix: list[list[int]]) -> list[list[int]]:\n        pass",
            "javascript": "var transpose = function(matrix) {\n    \n};",
            "java": "class Solution {\n    public int[][] transpose(int[][] matrix) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> transpose(vector<vector<int>>& matrix) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2,3],[4,5,6],[7,8,9]]", "expected_output": "[[1,4,7],[2,5,8],[3,6,9]]", "is_sample": True},
            {"input": "[[1,2,3],[4,5,6]]", "expected_output": "[[1,4],[2,5],[3,6]]", "is_sample": True},
            {"input": "[[1],[2],[3]]", "expected_output": "[[1,2,3]]", "is_sample": False},
        ],
    },
    # ─── 25. Lucky Numbers in a Matrix ─────────────────────────────────
    {
        "title": "Lucky Numbers in a Matrix",
        "difficulty": "easy",
        "tags": ["matrix"],
        "companies": ["amazon", "oracle", "adobe"],
        "description": "Given an `m x n` matrix of distinct numbers, return all lucky numbers in the matrix in any order. A lucky number is an element of the matrix such that it is the minimum element in its row and maximum in its column.\n\nExample 1:\nInput: matrix = [[3,7,8],[9,11,13],[15,16,17]]\nOutput: [15]\nExplanation: 15 is the only lucky number since it is the minimum in its row and the maximum in its column.\n\nExample 2:\nInput: matrix = [[1,10,4,2],[9,3,8,7],[15,16,17,12]]\nOutput: [12]",
        "constraints": "m == mat.length\nn == mat[i].length\n1 <= n, m <= 50\n1 <= matrix[i][j] <= 10^5\nAll elements in the matrix are distinct.",
        "hints": "Find the minimum of each row and the maximum of each column. A lucky number is one that appears in both sets.",
        "starter_code": {
            "python": "class Solution:\n    def luckyNumbers(self, matrix: list[list[int]]) -> list[int]:\n        pass",
            "javascript": "var luckyNumbers = function(matrix) {\n    \n};",
            "java": "class Solution {\n    public List<Integer> luckyNumbers(int[][] matrix) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> luckyNumbers(vector<vector<int>>& matrix) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[3,7,8],[9,11,13],[15,16,17]]", "expected_output": "[15]", "is_sample": True},
            {"input": "[[1,10,4,2],[9,3,8,7],[15,16,17,12]]", "expected_output": "[12]", "is_sample": True},
            {"input": "[[7,8],[1,2]]", "expected_output": "[7]", "is_sample": False},
        ],
    },
    # ─── 26. Where Will the Ball Fall ──────────────────────────────────
    {
        "title": "Where Will the Ball Fall",
        "difficulty": "medium",
        "tags": ["matrix", "simulation"],
        "companies": ["google", "amazon", "adobe", "uber"],
        "description": "You have a 2D grid of size `m x n` representing a box. Each cell has a diagonal board spanning two corners: `1` represents a board from top-left to bottom-right, and `-1` represents a board from top-right to bottom-left. A ball is dropped from the top of each column. Return an array `answer` where `answer[i]` is the column the ball falls out of at the bottom, or `-1` if the ball gets stuck.\n\nExample 1:\nInput: grid = [[1,1,1,-1,-1],[1,1,1,-1,-1],[-1,-1,-1,1,1],[1,1,1,1,-1],[-1,-1,-1,-1,-1]]\nOutput: [1,-1,-1,-1,-1]\n\nExample 2:\nInput: grid = [[-1]]\nOutput: [-1]",
        "constraints": "m == grid.length\nn == grid[i].length\n1 <= m, n <= 100\ngrid[i][j] is 1 or -1.",
        "hints": "Simulate each ball. At each row, if grid[row][col] == 1, the ball moves right (check col+1 has same value). If -1, the ball moves left (check col-1). If the neighbor differs or is out of bounds, the ball is stuck.",
        "starter_code": {
            "python": "class Solution:\n    def findBall(self, grid: list[list[int]]) -> list[int]:\n        pass",
            "javascript": "var findBall = function(grid) {\n    \n};",
            "java": "class Solution {\n    public int[] findBall(int[][] grid) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> findBall(vector<vector<int>>& grid) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,1,1,-1,-1],[1,1,1,-1,-1],[-1,-1,-1,1,1],[1,1,1,1,-1],[-1,-1,-1,-1,-1]]", "expected_output": "[1,-1,-1,-1,-1]", "is_sample": True},
            {"input": "[[-1]]", "expected_output": "[-1]", "is_sample": True},
            {"input": "[[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1],[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1]]", "expected_output": "[0,1,2,3,4,-1]", "is_sample": False},
        ],
    },
    # ─── 27. Count Servers that Communicate ────────────────────────────
    {
        "title": "Count Servers that Communicate",
        "difficulty": "medium",
        "tags": ["matrix", "hash-table"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "You are given a map of a server center, represented as an `m x n` integer matrix `grid`, where 1 means that on that cell there is a server and 0 means that it is no server. Two servers communicate if they are on the same row or column. Return the number of servers that communicate with at least one other server.\n\nExample 1:\nInput: grid = [[1,0],[0,1]]\nOutput: 0\n\nExample 2:\nInput: grid = [[1,0],[1,1]]\nOutput: 3",
        "constraints": "m == grid.length\nn == grid[i].length\n1 <= m <= 250\n1 <= n <= 250\ngrid[i][j] == 0 or 1",
        "hints": "Count the number of servers in each row and each column. A server communicates if its row count > 1 or its column count > 1.",
        "starter_code": {
            "python": "class Solution:\n    def countServers(self, grid: list[list[int]]) -> int:\n        pass",
            "javascript": "var countServers = function(grid) {\n    \n};",
            "java": "class Solution {\n    public int countServers(int[][] grid) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int countServers(vector<vector<int>>& grid) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,0],[0,1]]", "expected_output": "0", "is_sample": True},
            {"input": "[[1,0],[1,1]]", "expected_output": "3", "is_sample": True},
            {"input": "[[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]]", "expected_output": "4", "is_sample": False},
        ],
    },
    # ─── 28. Minimum Falling Path Sum ──────────────────────────────────
    {
        "title": "Minimum Falling Path Sum",
        "difficulty": "medium",
        "tags": ["matrix", "dynamic-programming"],
        "companies": ["google", "amazon", "uber"],
        "description": "Given an `n x n` array of integers `matrix`, return the minimum sum of any falling path through `matrix`. A falling path starts at any element in the first row and chooses the element in the next row that is either directly below or diagonally left/right.\n\nExample 1:\nInput: matrix = [[2,1,3],[6,5,4],[7,8,9]]\nOutput: 13\nExplanation: Falling paths: 1 -> 5 -> 7 = 13 is the minimum.\n\nExample 2:\nInput: matrix = [[-19,57],[-40,-5]]\nOutput: -59",
        "constraints": "n == matrix.length == matrix[i].length\n1 <= n <= 100\n-100 <= matrix[i][j] <= 100",
        "hints": "Use DP bottom-up. For each cell (i, j), dp[i][j] = matrix[i][j] + min(dp[i-1][j-1], dp[i-1][j], dp[i-1][j+1]). Answer is min of last row.",
        "starter_code": {
            "python": "class Solution:\n    def minFallingPathSum(self, matrix: list[list[int]]) -> int:\n        pass",
            "javascript": "var minFallingPathSum = function(matrix) {\n    \n};",
            "java": "class Solution {\n    public int minFallingPathSum(int[][] matrix) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minFallingPathSum(vector<vector<int>>& matrix) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[2,1,3],[6,5,4],[7,8,9]]", "expected_output": "13", "is_sample": True},
            {"input": "[[-19,57],[-40,-5]]", "expected_output": "-59", "is_sample": True},
            {"input": "[[-48]]", "expected_output": "-48", "is_sample": False},
        ],
    },
    # ─── 29. Unique Paths II ───────────────────────────────────────────
    {
        "title": "Unique Paths II",
        "difficulty": "medium",
        "tags": ["matrix", "dynamic-programming"],
        "companies": ["google", "amazon", "microsoft", "meta"],
        "description": "You are given an `m x n` integer array `grid`. There is a robot initially located at the top-left corner. The robot tries to move to the bottom-right corner. The robot can only move either down or right at any point. An obstacle is marked as `1` and free space as `0`. Return the number of unique paths the robot can take.\n\nExample 1:\nInput: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]\nOutput: 2\n\nExample 2:\nInput: obstacleGrid = [[0,1],[0,0]]\nOutput: 1",
        "constraints": "m == obstacleGrid.length\nn == obstacleGrid[i].length\n1 <= m, n <= 100\nobstacleGrid[i][j] is 0 or 1.",
        "hints": "Use DP. dp[i][j] = dp[i-1][j] + dp[i][j-1] if no obstacle, else 0. Initialize first row/column carefully: once you hit an obstacle, all subsequent cells in that row/column are 0.",
        "starter_code": {
            "python": "class Solution:\n    def uniquePathsWithObstacles(self, obstacleGrid: list[list[int]]) -> int:\n        pass",
            "javascript": "var uniquePathsWithObstacles = function(obstacleGrid) {\n    \n};",
            "java": "class Solution {\n    public int uniquePathsWithObstacles(int[][] obstacleGrid) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[0,0,0],[0,1,0],[0,0,0]]", "expected_output": "2", "is_sample": True},
            {"input": "[[0,1],[0,0]]", "expected_output": "1", "is_sample": True},
            {"input": "[[1,0]]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 30. Minimum ASCII Delete Sum for Two Strings ──────────────────
    {
        "title": "Minimum ASCII Delete Sum for Two Strings",
        "difficulty": "medium",
        "tags": ["string", "dynamic-programming"],
        "companies": ["google", "amazon", "bytedance"],
        "description": "Given two strings `s1` and `s2`, return the lowest ASCII sum of deleted characters to make the two strings equal. You may delete characters from either string.\n\nExample 1:\nInput: s1 = \"sea\", s2 = \"eat\"\nOutput: 231\nExplanation: Deleting 's' from \"sea\" adds 115 to the cost. Deleting 't' from \"eat\" adds 116 to the cost. Total = 231.\n\nExample 2:\nInput: s1 = \"delete\", s2 = \"leet\"\nOutput: 403",
        "constraints": "1 <= s1.length, s2.length <= 1000\ns1 and s2 consist of lowercase English letters.",
        "hints": "Use 2D DP similar to LCS. dp[i][j] = minimum cost to make s1[:i] and s2[:j] equal. If characters match, no cost; otherwise take the minimum of deleting from either string.",
        "starter_code": {
            "python": "class Solution:\n    def minimumDeleteSum(self, s1: str, s2: str) -> int:\n        pass",
            "javascript": "var minimumDeleteSum = function(s1, s2) {\n    \n};",
            "java": "class Solution {\n    public int minimumDeleteSum(String s1, String s2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minimumDeleteSum(string s1, string s2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "s1 = \"sea\", s2 = \"eat\"", "expected_output": "231", "is_sample": True},
            {"input": "s1 = \"delete\", s2 = \"leet\"", "expected_output": "403", "is_sample": True},
            {"input": "s1 = \"a\", s2 = \"a\"", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 31. Best Sightseeing Pair ─────────────────────────────────────
    {
        "title": "Best Sightseeing Pair",
        "difficulty": "medium",
        "tags": ["array", "dynamic-programming"],
        "companies": ["amazon", "google", "uber", "bytedance"],
        "description": "You are given an integer array `values` where `values[i]` represents the value of the i-th sightseeing spot. The score of a pair (i, j) with i < j is `values[i] + values[j] + i - j`. Return the maximum score of a pair of sightseeing spots.\n\nExample 1:\nInput: values = [8,1,5,2,6]\nOutput: 11\nExplanation: i = 0, j = 2, score = 8 + 5 + 0 - 2 = 11.\n\nExample 2:\nInput: values = [1,2]\nOutput: 2",
        "constraints": "2 <= values.length <= 5 * 10^4\n1 <= values[i] <= 1000",
        "hints": "Rewrite the score as (values[i] + i) + (values[j] - j). Track the maximum of values[i] + i as you iterate j from left to right.",
        "starter_code": {
            "python": "class Solution:\n    def maxScoreSightseeingPair(self, values: list[int]) -> int:\n        pass",
            "javascript": "var maxScoreSightseeingPair = function(values) {\n    \n};",
            "java": "class Solution {\n    public int maxScoreSightseeingPair(int[] values) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxScoreSightseeingPair(vector<int>& values) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[8,1,5,2,6]", "expected_output": "11", "is_sample": True},
            {"input": "[1,2]", "expected_output": "2", "is_sample": True},
            {"input": "[1,3,5]", "expected_output": "7", "is_sample": False},
        ],
    },
    # ─── 32. Maximum Length of Subarray With Positive Product ──────────
    {
        "title": "Maximum Length of Subarray With Positive Product",
        "difficulty": "medium",
        "tags": ["array", "dynamic-programming", "greedy"],
        "companies": ["amazon", "google", "microsoft"],
        "description": "Given an array of integers `nums`, find the maximum length of a subarray where the product of all its elements is positive. A subarray is a contiguous subsequence of the array.\n\nExample 1:\nInput: nums = [1,-2,-3,4]\nOutput: 4\nExplanation: The product of the entire array is 24, which is positive.\n\nExample 2:\nInput: nums = [0,1,-2,-3,-4]\nOutput: 3\nExplanation: The subarray [1,-2,-3] has product 6.",
        "constraints": "1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
        "hints": "Track two DP values at each position: the length of the longest subarray ending here with a positive product, and with a negative product. Reset both when you encounter 0.",
        "starter_code": {
            "python": "class Solution:\n    def getMaxLen(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var getMaxLen = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int getMaxLen(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int getMaxLen(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,-2,-3,4]", "expected_output": "4", "is_sample": True},
            {"input": "[0,1,-2,-3,-4]", "expected_output": "3", "is_sample": True},
            {"input": "[-1,-2,-3,0,1]", "expected_output": "2", "is_sample": False},
        ],
    },
    # ─── 33. Count Sorted Vowel Strings ────────────────────────────────
    {
        "title": "Count Sorted Vowel Strings",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "math"],
        "companies": ["google", "amazon", "adobe"],
        "description": "Given an integer `n`, return the number of strings of length `n` that consist only of vowels (a, e, i, o, u) and are lexicographically sorted. A string is lexicographically sorted if for all valid `i`, `s[i]` is the same as or comes before `s[i+1]` in the alphabet.\n\nExample 1:\nInput: n = 1\nOutput: 5\nExplanation: The 5 sorted strings are [\"a\", \"e\", \"i\", \"o\", \"u\"].\n\nExample 2:\nInput: n = 2\nOutput: 15",
        "constraints": "1 <= n <= 50",
        "hints": "Use DP where dp[i][j] = number of sorted strings of length i ending with the j-th vowel. Alternatively, use the combinatorics formula C(n+4, 4).",
        "starter_code": {
            "python": "class Solution:\n    def countVowelStrings(self, n: int) -> int:\n        pass",
            "javascript": "var countVowelStrings = function(n) {\n    \n};",
            "java": "class Solution {\n    public int countVowelStrings(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int countVowelStrings(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "1", "expected_output": "5", "is_sample": True},
            {"input": "2", "expected_output": "15", "is_sample": True},
            {"input": "33", "expected_output": "66045", "is_sample": False},
        ],
    },
    # ─── 34. Champagne Tower ───────────────────────────────────────────
    {
        "title": "Champagne Tower",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "simulation"],
        "companies": ["google", "uber", "lyft"],
        "description": "We stack glasses in a pyramid where the first row has 1 glass, the second row has 2 glasses, and so on. Each glass holds one cup of champagne. When poured, excess liquid flows equally to the glass immediately to the left and right below. Given `poured` cups of champagne, return how full the glass at row `query_row` and position `query_glass` is (0-indexed). A full glass is 1.0.\n\nExample 1:\nInput: poured = 1, query_row = 1, query_glass = 1\nOutput: 0.0\n\nExample 2:\nInput: poured = 2, query_row = 1, query_glass = 1\nOutput: 0.5",
        "constraints": "0 <= poured <= 10^9\n0 <= query_glass <= query_row < 100",
        "hints": "Simulate row by row. Start with dp[0][0] = poured. For each glass with more than 1.0, the overflow splits evenly to the two glasses below. Clamp the result to [0, 1].",
        "starter_code": {
            "python": "class Solution:\n    def champagneTower(self, poured: int, query_row: int, query_glass: int) -> float:\n        pass",
            "javascript": "var champagneTower = function(poured, query_row, query_glass) {\n    \n};",
            "java": "class Solution {\n    public double champagneTower(int poured, int query_row, int query_glass) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    double champagneTower(int poured, int query_row, int query_glass) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "poured = 1, query_row = 1, query_glass = 1", "expected_output": "0.0", "is_sample": True},
            {"input": "poured = 2, query_row = 1, query_glass = 1", "expected_output": "0.5", "is_sample": True},
            {"input": "poured = 100000009, query_row = 33, query_glass = 17", "expected_output": "1.0", "is_sample": False},
        ],
    },
    # ─── 35. Uncrossed Lines ───────────────────────────────────────────
    {
        "title": "Uncrossed Lines",
        "difficulty": "medium",
        "tags": ["dynamic-programming"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "You are given two integer arrays `nums1` and `nums2`. A line connects `nums1[i]` and `nums2[j]` such that `nums1[i] == nums2[j]` and the lines do not intersect (i.e., each pair (i, j) is in strictly increasing order). Return the maximum number of connecting lines.\n\nExample 1:\nInput: nums1 = [1,4,2], nums2 = [1,2,4]\nOutput: 2\nExplanation: Draw a line from nums1[0]=1 to nums2[0]=1, and from nums1[1]=4 to nums2[2]=4. Cannot draw the line from nums1[2]=2 to nums2[1]=2 because it would cross.\n\nExample 2:\nInput: nums1 = [2,5,1,2,5], nums2 = [10,5,2,1,5,2]\nOutput: 3",
        "constraints": "1 <= nums1.length, nums2.length <= 500\n1 <= nums1[i], nums2[j] <= 2000",
        "hints": "This is equivalent to finding the Longest Common Subsequence (LCS) of nums1 and nums2. Use standard 2D DP.",
        "starter_code": {
            "python": "class Solution:\n    def maxUncrossedLines(self, nums1: list[int], nums2: list[int]) -> int:\n        pass",
            "javascript": "var maxUncrossedLines = function(nums1, nums2) {\n    \n};",
            "java": "class Solution {\n    public int maxUncrossedLines(int[] nums1, int[] nums2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxUncrossedLines(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "nums1 = [1,4,2], nums2 = [1,2,4]", "expected_output": "2", "is_sample": True},
            {"input": "nums1 = [2,5,1,2,5], nums2 = [10,5,2,1,5,2]", "expected_output": "3", "is_sample": True},
            {"input": "nums1 = [1,1,1], nums2 = [1,1,1]", "expected_output": "3", "is_sample": False},
        ],
    },
    # ─── 36. Last Stone Weight ─────────────────────────────────────────
    {
        "title": "Last Stone Weight",
        "difficulty": "easy",
        "tags": ["heap"],
        "companies": ["amazon", "google", "apple"],
        "description": "You are given an array of integers `stones` where `stones[i]` is the weight of the i-th stone. On each turn, choose the heaviest two stones and smash them together. If they are equal, both are destroyed. If not, the smaller is destroyed and the larger has its weight reduced by the smaller's weight. Return the weight of the last remaining stone, or 0 if none remain.\n\nExample 1:\nInput: stones = [2,7,4,1,8,1]\nOutput: 1\nExplanation: Smash 7 and 8 to get 1, then 2 and 4 to get 2, then 1 and 2 to get 1, then 1 and 1 to get 0. Result = 1.\n\nExample 2:\nInput: stones = [1]\nOutput: 1",
        "constraints": "1 <= stones.length <= 30\n1 <= stones[i] <= 1000",
        "hints": "Use a max-heap. Repeatedly extract the two largest elements, compute their difference, and push it back if non-zero.",
        "starter_code": {
            "python": "class Solution:\n    def lastStoneWeight(self, stones: list[int]) -> int:\n        pass",
            "javascript": "var lastStoneWeight = function(stones) {\n    \n};",
            "java": "class Solution {\n    public int lastStoneWeight(int[] stones) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int lastStoneWeight(vector<int>& stones) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,7,4,1,8,1]", "expected_output": "1", "is_sample": True},
            {"input": "[1]", "expected_output": "1", "is_sample": True},
            {"input": "[3,3]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 37. Find K-th Largest XOR Coordinate Value ────────────────────
    {
        "title": "Find K-th Largest XOR Coordinate Value",
        "difficulty": "medium",
        "tags": ["matrix", "bit-manipulation", "heap"],
        "companies": ["google", "amazon", "bytedance"],
        "description": "You are given a 2D matrix of size `m x n` consisting of non-negative integers. The value of coordinate `(a, b)` is defined as the XOR of all `matrix[i][j]` where `0 <= i <= a < m` and `0 <= j <= b < n`. Find the k-th largest value (1-indexed) of all the coordinates.\n\nExample 1:\nInput: matrix = [[5,2],[1,6]], k = 1\nOutput: 7\nExplanation: The coordinate values are [5, 5^2, 5^1, 5^2^1^6] = [5,7,4,0]. The largest is 7.\n\nExample 2:\nInput: matrix = [[5,2],[1,6]], k = 2\nOutput: 5",
        "constraints": "m == matrix.length\nn == matrix[i].length\n1 <= m, n <= 1000\n0 <= matrix[i][j] <= 10^6\n1 <= k <= m * n",
        "hints": "Build a 2D prefix XOR table: xor[i][j] = xor[i-1][j] ^ xor[i][j-1] ^ xor[i-1][j-1] ^ matrix[i][j]. Collect all values and find the k-th largest using sorting or a min-heap of size k.",
        "starter_code": {
            "python": "class Solution:\n    def kthLargestValue(self, matrix: list[list[int]], k: int) -> int:\n        pass",
            "javascript": "var kthLargestValue = function(matrix, k) {\n    \n};",
            "java": "class Solution {\n    public int kthLargestValue(int[][] matrix, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int kthLargestValue(vector<vector<int>>& matrix, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "matrix = [[5,2],[1,6]], k = 1", "expected_output": "7", "is_sample": True},
            {"input": "matrix = [[5,2],[1,6]], k = 2", "expected_output": "5", "is_sample": True},
            {"input": "matrix = [[5,2],[1,6]], k = 4", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 38. Path with Maximum Probability ─────────────────────────────
    {
        "title": "Path with Maximum Probability",
        "difficulty": "medium",
        "tags": ["graph", "heap"],
        "companies": ["google", "amazon", "uber", "lyft"],
        "description": "You are given an undirected weighted graph of `n` nodes (0-indexed) represented by an edge list where `edges[i] = [a, b]` is an edge with success probability `succProb[i]`. Given two nodes `start` and `end`, find the path with the maximum probability of success and return its probability. If there is no path, return 0.\n\nExample 1:\nInput: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2\nOutput: 0.25\n\nExample 2:\nInput: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2\nOutput: 0.3",
        "constraints": "2 <= n <= 10^4\n0 <= edges.length <= 2 * 10^4\nedges[i].length == 2\n0 <= a, b < n\na != b\n0 <= succProb.length == edges.length\n0 <= succProb[i] <= 1\n0 <= start, end < n",
        "hints": "Use a modified Dijkstra's algorithm with a max-heap. Instead of minimizing distance, maximize probability. Initialize probability of start as 1.0.",
        "starter_code": {
            "python": "class Solution:\n    def maxProbability(self, n: int, edges: list[list[int]], succProb: list[float], start_node: int, end_node: int) -> float:\n        pass",
            "javascript": "var maxProbability = function(n, edges, succProb, start_node, end_node) {\n    \n};",
            "java": "class Solution {\n    public double maxProbability(int n, int[][] edges, double[] succProb, int start_node, int end_node) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    double maxProbability(int n, vector<vector<int>>& edges, vector<double>& succProb, int start_node, int end_node) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2", "expected_output": "0.25", "is_sample": True},
            {"input": "n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2", "expected_output": "0.3", "is_sample": True},
            {"input": "n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2", "expected_output": "0.0", "is_sample": False},
        ],
    },
    # ─── 39. Minimum Cost to Reach Destination in Time ─────────────────
    {
        "title": "Minimum Cost to Reach Destination in Time",
        "difficulty": "hard",
        "tags": ["graph", "dynamic-programming"],
        "companies": ["google", "uber", "lyft", "amazon"],
        "description": "There is a country of `n` cities numbered from 0 to n-1 with `passingFees[i]` being the fee for visiting city `i`. You are given `edges` where `edges[j] = [x, y, time]` means there is a road between cities `x` and `y` that takes `time` minutes. You start at city 0 and want to reach city n-1 within `maxTime` minutes. Return the minimum passing fees you must pay, or -1 if impossible.\n\nExample 1:\nInput: maxTime = 30, edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], passingFees = [5,1,2,20,20,3]\nOutput: 11\n\nExample 2:\nInput: maxTime = 29, edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], passingFees = [5,1,2,20,20,3]\nOutput: 48",
        "constraints": "1 <= maxTime <= 1000\nn == passingFees.length\n2 <= n <= 1000\nn - 1 <= edges.length <= 1000\n0 <= x, y <= n - 1\n1 <= time <= 1000\n1 <= passingFees[j] <= 1000",
        "hints": "Use Dijkstra or DP with state (city, time_spent). dp[i][t] = min fee to reach city i with exactly t time. Use a priority queue ordered by fees.",
        "starter_code": {
            "python": "class Solution:\n    def minCost(self, maxTime: int, edges: list[list[int]], passingFees: list[int]) -> int:\n        pass",
            "javascript": "var minCost = function(maxTime, edges, passingFees) {\n    \n};",
            "java": "class Solution {\n    public int minCost(int maxTime, int[][] edges, int[] passingFees) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minCost(int maxTime, vector<vector<int>>& edges, vector<int>& passingFees) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "maxTime = 30, edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], passingFees = [5,1,2,20,20,3]", "expected_output": "11", "is_sample": True},
            {"input": "maxTime = 29, edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], passingFees = [5,1,2,20,20,3]", "expected_output": "48", "is_sample": True},
            {"input": "maxTime = 25, edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], passingFees = [5,1,2,20,20,3]", "expected_output": "-1", "is_sample": False},
        ],
    },
    # ─── 40. Number of Ways to Arrive at Destination ───────────────────
    {
        "title": "Number of Ways to Arrive at Destination",
        "difficulty": "medium",
        "tags": ["graph", "dynamic-programming"],
        "companies": ["google", "amazon", "meta"],
        "description": "You are in a city with `n` intersections numbered from 0 to n-1 with bi-directional roads between some intersections. Each road has a travel time. Find the number of ways you can arrive at intersection n-1 from intersection 0 in the shortest amount of time. Return the answer modulo 10^9 + 7.\n\nExample 1:\nInput: n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]\nOutput: 4\n\nExample 2:\nInput: n = 2, roads = [[1,0,10]]\nOutput: 1",
        "constraints": "1 <= n <= 200\nn - 1 <= roads.length <= n * (n - 1) / 2\nroads[i].length == 3\n0 <= u, v <= n - 1\n1 <= time <= 10^9\nu != v\nAt most one road between any two intersections.\nYou can reach any intersection from any other.",
        "hints": "Use Dijkstra's algorithm. Along with the shortest distance, maintain a count array. When you find an equally short path to a node, add the count; when you find a shorter path, reset the count.",
        "starter_code": {
            "python": "class Solution:\n    def countPaths(self, n: int, roads: list[list[int]]) -> int:\n        pass",
            "javascript": "var countPaths = function(n, roads) {\n    \n};",
            "java": "class Solution {\n    public int countPaths(int n, int[][] roads) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int countPaths(int n, vector<vector<int>>& roads) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]", "expected_output": "4", "is_sample": True},
            {"input": "n = 2, roads = [[1,0,10]]", "expected_output": "1", "is_sample": True},
            {"input": "n = 1, roads = []", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 41. Detonate the Maximum Bombs ────────────────────────────────
    {
        "title": "Detonate the Maximum Bombs",
        "difficulty": "medium",
        "tags": ["graph", "math"],
        "companies": ["google", "amazon", "uber", "snap"],
        "description": "You are given a list of bombs where `bombs[i] = [xi, yi, ri]` denotes a bomb at coordinate `(xi, yi)` with radius `ri`. Detonating a bomb triggers all bombs within its blast radius (Euclidean distance). This can cause a chain reaction. Return the maximum number of bombs that can be detonated by detonating a single bomb.\n\nExample 1:\nInput: bombs = [[2,1,3],[6,1,4]]\nOutput: 2\nExplanation: Detonating bomb 1 triggers bomb 0 (distance = 4, radius = 4).\n\nExample 2:\nInput: bombs = [[1,1,5],[10,10,5]]\nOutput: 1",
        "constraints": "1 <= bombs.length <= 100\nbombs[i].length == 3\n1 <= xi, yi, ri <= 10^5",
        "hints": "Build a directed graph: bomb i has an edge to bomb j if the distance between them <= ri. Then for each bomb, run BFS/DFS to count how many bombs are reachable. Return the maximum.",
        "starter_code": {
            "python": "class Solution:\n    def maximumDetonation(self, bombs: list[list[int]]) -> int:\n        pass",
            "javascript": "var maximumDetonation = function(bombs) {\n    \n};",
            "java": "class Solution {\n    public int maximumDetonation(int[][] bombs) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maximumDetonation(vector<vector<int>>& bombs) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[2,1,3],[6,1,4]]", "expected_output": "2", "is_sample": True},
            {"input": "[[1,1,5],[10,10,5]]", "expected_output": "1", "is_sample": True},
            {"input": "[[1,2,3],[2,3,1],[3,4,2],[4,5,3],[5,6,4]]", "expected_output": "5", "is_sample": False},
        ],
    },
    # ─── 42. Minimum Genetic Mutation ──────────────────────────────────
    {
        "title": "Minimum Genetic Mutation",
        "difficulty": "medium",
        "tags": ["graph", "string"],
        "companies": ["google", "amazon", "linkedin"],
        "description": "A gene string can be represented by an 8-character string, with a choice from 'A', 'C', 'G', and 'T'. A mutation changes a single character. Given `startGene`, `endGene`, and a `bank` of valid gene mutations, return the minimum number of mutations needed to mutate from start to end. If no such mutation exists, return -1.\n\nExample 1:\nInput: startGene = \"AACCGGTT\", endGene = \"AACCGGTA\", bank = [\"AACCGGTA\"]\nOutput: 1\n\nExample 2:\nInput: startGene = \"AACCGGTT\", endGene = \"AAACGGTA\", bank = [\"AACCGGTA\",\"AACCGCTA\",\"AAACGGTA\"]\nOutput: 2",
        "constraints": "0 <= bank.length <= 10\nstartGene.length == endGene.length == bank[i].length == 8\nstartGene, endGene, and bank[i] consist of only 'A', 'C', 'G', 'T'.",
        "hints": "Use BFS. From the current gene, try all single-character mutations (A, C, G, T at each position). If the resulting gene is in the bank and unvisited, add it to the queue.",
        "starter_code": {
            "python": "class Solution:\n    def minMutation(self, startGene: str, endGene: str, bank: list[str]) -> int:\n        pass",
            "javascript": "var minMutation = function(startGene, endGene, bank) {\n    \n};",
            "java": "class Solution {\n    public int minMutation(String startGene, String endGene, String[] bank) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minMutation(string startGene, string endGene, vector<string>& bank) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "startGene = \"AACCGGTT\", endGene = \"AACCGGTA\", bank = [\"AACCGGTA\"]", "expected_output": "1", "is_sample": True},
            {"input": "startGene = \"AACCGGTT\", endGene = \"AAACGGTA\", bank = [\"AACCGGTA\",\"AACCGCTA\",\"AAACGGTA\"]", "expected_output": "2", "is_sample": True},
            {"input": "startGene = \"AAAAACCC\", endGene = \"AACCCCCC\", bank = [\"AAAACCCC\",\"AAACCCCC\",\"AACCCCCC\"]", "expected_output": "3", "is_sample": False},
        ],
    },
    # ─── 43. Keys and Rooms ────────────────────────────────────────────
    {
        "title": "Keys and Rooms",
        "difficulty": "medium",
        "tags": ["graph"],
        "companies": ["google", "amazon", "meta", "apple"],
        "description": "There are `n` rooms labeled from 0 to n-1 and all the rooms are locked except for room 0. Your goal is to visit all the rooms. When you visit a room, you may find a set of distinct keys in it. Each key has a number on it denoting the room it unlocks. You can visit rooms in any order. Return `true` if you can visit all rooms.\n\nExample 1:\nInput: rooms = [[1],[2],[3],[]]\nOutput: true\nExplanation: Visit room 0 -> get key 1 -> visit room 1 -> get key 2 -> visit room 2 -> get key 3 -> visit room 3.\n\nExample 2:\nInput: rooms = [[1,3],[3,0,1],[2],[0]]\nOutput: false\nExplanation: We cannot enter room 2.",
        "constraints": "n == rooms.length\n2 <= n <= 1000\n0 <= rooms[i].length <= 1000\n1 <= sum(rooms[i].length) <= 3000\n0 <= rooms[i][j] < n\nAll the values of rooms[i] are unique.",
        "hints": "Use BFS or DFS starting from room 0. Each key found adds a new room to explore. Check if the number of visited rooms equals n.",
        "starter_code": {
            "python": "class Solution:\n    def canVisitAllRooms(self, rooms: list[list[int]]) -> bool:\n        pass",
            "javascript": "var canVisitAllRooms = function(rooms) {\n    \n};",
            "java": "class Solution {\n    public boolean canVisitAllRooms(List<List<Integer>> rooms) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool canVisitAllRooms(vector<vector<int>>& rooms) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1],[2],[3],[]]", "expected_output": "true", "is_sample": True},
            {"input": "[[1,3],[3,0,1],[2],[0]]", "expected_output": "false", "is_sample": True},
            {"input": "[[1,2,3],[],[],[]]", "expected_output": "true", "is_sample": False},
        ],
    },
]

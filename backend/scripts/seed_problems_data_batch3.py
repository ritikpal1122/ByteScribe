"""Batch 3: Array, String, Hash Table, Two Pointers, Sliding Window, Binary Search problems."""

PROBLEMS_BATCH3 = [
    # ─── 1. Trapping Rain Water ──────────────────────────────────────────
    {
        "title": "Trapping Rain Water",
        "difficulty": "hard",
        "tags": ["array", "two-pointers"],
        "companies": ["google", "amazon", "microsoft", "meta"],
        "description": "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\nExample 1:\nInput: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6\nExplanation: The elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.\n\nExample 2:\nInput: height = [4,2,0,3,2,5]\nOutput: 9",
        "constraints": "n == height.length\n1 <= n <= 2 * 10^4\n0 <= height[i] <= 10^5",
        "hints": "Use two pointers from both ends, tracking the max height seen from each side.",
        "starter_code": {
            "python": "class Solution:\n    def trap(self, height: list[int]) -> int:\n        pass",
            "javascript": "var trap = function(height) {\n    \n};",
            "java": "class Solution {\n    public int trap(int[] height) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int trap(vector<int>& height) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[0,1,0,2,1,0,1,3,2,1,2,1]", "expected_output": "6", "is_sample": True},
            {"input": "[4,2,0,3,2,5]", "expected_output": "9", "is_sample": True},
            {"input": "[1,0,1]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 2. First Missing Positive ───────────────────────────────────────
    {
        "title": "First Missing Positive",
        "difficulty": "hard",
        "tags": ["array", "hash-table"],
        "companies": ["amazon", "microsoft", "bloomberg"],
        "description": "Given an unsorted integer array `nums`, return the smallest missing positive integer.\n\nYou must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.\n\nExample 1:\nInput: nums = [1,2,0]\nOutput: 3\nExplanation: The numbers in the range [1,2] are all in the array.\n\nExample 2:\nInput: nums = [3,4,-1,1]\nOutput: 2\nExplanation: 1 is in the array but 2 is missing.\n\nExample 3:\nInput: nums = [7,8,9,11,12]\nOutput: 1\nExplanation: The smallest positive integer 1 is missing.",
        "constraints": "1 <= nums.length <= 10^5\n-2^31 <= nums[i] <= 2^31 - 1",
        "hints": "Place each number in its correct index position (nums[i] should be at index nums[i]-1). Then scan for the first mismatch.",
        "starter_code": {
            "python": "class Solution:\n    def firstMissingPositive(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var firstMissingPositive = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int firstMissingPositive(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int firstMissingPositive(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,0]", "expected_output": "3", "is_sample": True},
            {"input": "[3,4,-1,1]", "expected_output": "2", "is_sample": True},
            {"input": "[7,8,9,11,12]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 3. Minimum Window Substring ─────────────────────────────────────
    {
        "title": "Minimum Window Substring",
        "difficulty": "hard",
        "tags": ["string", "hash-table", "sliding-window"],
        "companies": ["meta", "google", "amazon", "uber"],
        "description": "Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string.\n\nExample 1:\nInput: s = \"ADOBECODEBANC\", t = \"ABC\"\nOutput: \"BANC\"\nExplanation: The minimum window substring \"BANC\" includes 'A', 'B', and 'C' from string t.\n\nExample 2:\nInput: s = \"a\", t = \"a\"\nOutput: \"a\"\n\nExample 3:\nInput: s = \"a\", t = \"aa\"\nOutput: \"\"",
        "constraints": "m == s.length\nn == t.length\n1 <= m, n <= 10^5\ns and t consist of uppercase and lowercase English letters.",
        "hints": "Use a sliding window with two pointers. Expand the right pointer to include characters, then shrink from the left to find the minimum window.",
        "starter_code": {
            "python": "class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        pass",
            "javascript": "var minWindow = function(s, t) {\n    \n};",
            "java": "class Solution {\n    public String minWindow(String s, String t) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string minWindow(string s, string t) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"ADOBECODEBANC\"\n\"ABC\"", "expected_output": "\"BANC\"", "is_sample": True},
            {"input": "\"a\"\n\"a\"", "expected_output": "\"a\"", "is_sample": True},
            {"input": "\"a\"\n\"aa\"", "expected_output": "\"\"", "is_sample": False},
        ],
    },
    # ─── 4. Longest Palindromic Substring ────────────────────────────────
    {
        "title": "Longest Palindromic Substring",
        "difficulty": "medium",
        "tags": ["string", "two-pointers"],
        "companies": ["amazon", "microsoft", "meta", "google"],
        "description": "Given a string `s`, return the longest palindromic substring in `s`.\n\nExample 1:\nInput: s = \"babad\"\nOutput: \"bab\"\nExplanation: \"aba\" is also a valid answer.\n\nExample 2:\nInput: s = \"cbbd\"\nOutput: \"bb\"",
        "constraints": "1 <= s.length <= 1000\ns consist of only digits and English letters.",
        "hints": "Expand around each center. There are 2n-1 centers (each character and each pair of adjacent characters).",
        "starter_code": {
            "python": "class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        pass",
            "javascript": "var longestPalindrome = function(s) {\n    \n};",
            "java": "class Solution {\n    public String longestPalindrome(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string longestPalindrome(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"babad\"", "expected_output": "\"bab\"", "is_sample": True},
            {"input": "\"cbbd\"", "expected_output": "\"bb\"", "is_sample": True},
            {"input": "\"a\"", "expected_output": "\"a\"", "is_sample": False},
        ],
    },
    # ─── 5. Group Anagrams ───────────────────────────────────────────────
    {
        "title": "Group Anagrams",
        "difficulty": "medium",
        "tags": ["string", "hash-table", "sorting"],
        "companies": ["amazon", "meta", "bloomberg", "uber"],
        "description": "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.\n\nExample 1:\nInput: strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]\nOutput: [[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]\n\nExample 2:\nInput: strs = [\"\"]\nOutput: [[\"\"]]\n\nExample 3:\nInput: strs = [\"a\"]\nOutput: [[\"a\"]]",
        "constraints": "1 <= strs.length <= 10^4\n0 <= strs[i].length <= 100\nstrs[i] consists of lowercase English letters.",
        "hints": "Use sorted characters as a hash key to group anagrams together.",
        "starter_code": {
            "python": "class Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        pass",
            "javascript": "var groupAnagrams = function(strs) {\n    \n};",
            "java": "class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", "expected_output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]", "is_sample": True},
            {"input": "[\"\"]", "expected_output": "[[\"\"]]", "is_sample": True},
            {"input": "[\"a\"]", "expected_output": "[[\"a\"]]", "is_sample": False},
        ],
    },
    # ─── 6. Subarray Sum Equals K ────────────────────────────────────────
    {
        "title": "Subarray Sum Equals K",
        "difficulty": "medium",
        "tags": ["array", "hash-table"],
        "companies": ["meta", "google", "amazon", "bloomberg"],
        "description": "Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.\n\nA subarray is a contiguous non-empty sequence of elements within an array.\n\nExample 1:\nInput: nums = [1,1,1], k = 2\nOutput: 2\n\nExample 2:\nInput: nums = [1,2,3], k = 3\nOutput: 2",
        "constraints": "1 <= nums.length <= 2 * 10^4\n-1000 <= nums[i] <= 1000\n-10^7 <= k <= 10^7",
        "hints": "Use a hash map to store prefix sums and their frequencies. At each index, check if (prefix_sum - k) exists in the map.",
        "starter_code": {
            "python": "class Solution:\n    def subarraySum(self, nums: list[int], k: int) -> int:\n        pass",
            "javascript": "var subarraySum = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public int subarraySum(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,1,1]\n2", "expected_output": "2", "is_sample": True},
            {"input": "[1,2,3]\n3", "expected_output": "2", "is_sample": True},
            {"input": "[1,-1,0]\n0", "expected_output": "3", "is_sample": False},
        ],
    },
    # ─── 7. Find All Anagrams in a String ────────────────────────────────
    {
        "title": "Find All Anagrams in a String",
        "difficulty": "medium",
        "tags": ["string", "hash-table", "sliding-window"],
        "companies": ["meta", "amazon", "microsoft"],
        "description": "Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`. You may return the answer in any order.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.\n\nExample 1:\nInput: s = \"cbaebabacd\", p = \"abc\"\nOutput: [0,6]\nExplanation: The substring starting at index 0 is \"cba\", which is an anagram of \"abc\". The substring starting at index 6 is \"bac\", which is an anagram of \"abc\".\n\nExample 2:\nInput: s = \"abab\", p = \"ab\"\nOutput: [0,1,2]",
        "constraints": "1 <= s.length, p.length <= 3 * 10^4\ns and p consist of lowercase English letters.",
        "hints": "Use a sliding window of size p.length and compare character counts.",
        "starter_code": {
            "python": "class Solution:\n    def findAnagrams(self, s: str, p: str) -> list[int]:\n        pass",
            "javascript": "var findAnagrams = function(s, p) {\n    \n};",
            "java": "class Solution {\n    public List<Integer> findAnagrams(String s, String p) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> findAnagrams(string s, string p) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"cbaebabacd\"\n\"abc\"", "expected_output": "[0,6]", "is_sample": True},
            {"input": "\"abab\"\n\"ab\"", "expected_output": "[0,1,2]", "is_sample": True},
            {"input": "\"aa\"\n\"bb\"", "expected_output": "[]", "is_sample": False},
        ],
    },
    # ─── 8. Minimum Size Subarray Sum ────────────────────────────────────
    {
        "title": "Minimum Size Subarray Sum",
        "difficulty": "medium",
        "tags": ["array", "sliding-window", "binary-search"],
        "companies": ["meta", "google", "goldman-sachs"],
        "description": "Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a subarray whose sum is greater than or equal to `target`. If there is no such subarray, return 0 instead.\n\nExample 1:\nInput: target = 7, nums = [2,3,1,2,4,3]\nOutput: 2\nExplanation: The subarray [4,3] has the minimal length under the problem constraint.\n\nExample 2:\nInput: target = 4, nums = [1,4,4]\nOutput: 1\n\nExample 3:\nInput: target = 11, nums = [1,1,1,1,1,1,1,1]\nOutput: 0",
        "constraints": "1 <= target <= 10^9\n1 <= nums.length <= 10^5\n1 <= nums[i] <= 10^4",
        "hints": "Use a sliding window approach. Expand the window until the sum >= target, then shrink from the left.",
        "starter_code": {
            "python": "class Solution:\n    def minSubArrayLen(self, target: int, nums: list[int]) -> int:\n        pass",
            "javascript": "var minSubArrayLen = function(target, nums) {\n    \n};",
            "java": "class Solution {\n    public int minSubArrayLen(int target, int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minSubArrayLen(int target, vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "7\n[2,3,1,2,4,3]", "expected_output": "2", "is_sample": True},
            {"input": "4\n[1,4,4]", "expected_output": "1", "is_sample": True},
            {"input": "11\n[1,1,1,1,1,1,1,1]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 9. Fruit Into Baskets ───────────────────────────────────────────
    {
        "title": "Fruit Into Baskets",
        "difficulty": "medium",
        "tags": ["array", "hash-table", "sliding-window"],
        "companies": ["google", "amazon"],
        "description": "You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array `fruits` where `fruits[i]` is the type of fruit the ith tree produces.\n\nYou want to collect as much fruit as possible. However, the owner has some strict rules:\n- You only have two baskets, and each basket can only hold a single type of fruit.\n- Starting from any tree of your choice, you must pick exactly one fruit from every tree while moving to the right. You must stop when you encounter a tree with fruit that cannot fit in your baskets.\n\nReturn the maximum number of fruits you can pick.\n\nExample 1:\nInput: fruits = [1,2,1]\nOutput: 3\n\nExample 2:\nInput: fruits = [0,1,2,2]\nOutput: 3\n\nExample 3:\nInput: fruits = [1,2,3,2,2]\nOutput: 4",
        "constraints": "1 <= fruits.length <= 10^5\n0 <= fruits[i] < fruits.length",
        "hints": "This is equivalent to finding the longest subarray with at most 2 distinct elements. Use a sliding window.",
        "starter_code": {
            "python": "class Solution:\n    def totalFruit(self, fruits: list[int]) -> int:\n        pass",
            "javascript": "var totalFruit = function(fruits) {\n    \n};",
            "java": "class Solution {\n    public int totalFruit(int[] fruits) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int totalFruit(vector<int>& fruits) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,1]", "expected_output": "3", "is_sample": True},
            {"input": "[0,1,2,2]", "expected_output": "3", "is_sample": True},
            {"input": "[1,2,3,2,2]", "expected_output": "4", "is_sample": False},
        ],
    },
    # ─── 10. Permutation in String ───────────────────────────────────────
    {
        "title": "Permutation in String",
        "difficulty": "medium",
        "tags": ["string", "hash-table", "sliding-window"],
        "companies": ["microsoft", "meta", "oracle"],
        "description": "Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise.\n\nIn other words, return `true` if one of `s1`'s permutations is the substring of `s2`.\n\nExample 1:\nInput: s1 = \"ab\", s2 = \"eidbaooo\"\nOutput: true\nExplanation: s2 contains one permutation of s1 (\"ba\").\n\nExample 2:\nInput: s1 = \"ab\", s2 = \"eidboaoo\"\nOutput: false",
        "constraints": "1 <= s1.length, s2.length <= 10^4\ns1 and s2 consist of lowercase English letters.",
        "hints": "Use a fixed-size sliding window equal to the length of s1 and compare character frequencies.",
        "starter_code": {
            "python": "class Solution:\n    def checkInclusion(self, s1: str, s2: str) -> bool:\n        pass",
            "javascript": "var checkInclusion = function(s1, s2) {\n    \n};",
            "java": "class Solution {\n    public boolean checkInclusion(String s1, String s2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool checkInclusion(string s1, string s2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"ab\"\n\"eidbaooo\"", "expected_output": "true", "is_sample": True},
            {"input": "\"ab\"\n\"eidboaoo\"", "expected_output": "false", "is_sample": True},
            {"input": "\"adc\"\n\"dcda\"", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 11. Search in Rotated Sorted Array ──────────────────────────────
    {
        "title": "Search in Rotated Sorted Array",
        "difficulty": "medium",
        "tags": ["array", "binary-search"],
        "companies": ["meta", "amazon", "microsoft", "google"],
        "description": "There is an integer array `nums` sorted in ascending order (with distinct values). Prior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k`.\n\nGiven the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.\n\nYou must write an algorithm with O(log n) runtime complexity.\n\nExample 1:\nInput: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4\n\nExample 2:\nInput: nums = [4,5,6,7,0,1,2], target = 3\nOutput: -1\n\nExample 3:\nInput: nums = [1], target = 0\nOutput: -1",
        "constraints": "1 <= nums.length <= 5000\n-10^4 <= nums[i] <= 10^4\nAll values of nums are unique.\nnums is an ascending array that is possibly rotated.\n-10^4 <= target <= 10^4",
        "hints": "Use binary search. Determine which half is sorted, then check if the target lies in that half.",
        "starter_code": {
            "python": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        pass",
            "javascript": "var search = function(nums, target) {\n    \n};",
            "java": "class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[4,5,6,7,0,1,2]\n0", "expected_output": "4", "is_sample": True},
            {"input": "[4,5,6,7,0,1,2]\n3", "expected_output": "-1", "is_sample": True},
            {"input": "[1]\n0", "expected_output": "-1", "is_sample": False},
        ],
    },
    # ─── 12. Find First and Last Position of Element ─────────────────────
    {
        "title": "Find First and Last Position of Element in Sorted Array",
        "difficulty": "medium",
        "tags": ["array", "binary-search"],
        "companies": ["meta", "google", "linkedin", "bloomberg"],
        "description": "Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value.\n\nIf `target` is not found in the array, return `[-1, -1]`.\n\nYou must write an algorithm with O(log n) runtime complexity.\n\nExample 1:\nInput: nums = [5,7,7,8,8,10], target = 8\nOutput: [3,4]\n\nExample 2:\nInput: nums = [5,7,7,8,8,10], target = 6\nOutput: [-1,-1]\n\nExample 3:\nInput: nums = [], target = 0\nOutput: [-1,-1]",
        "constraints": "0 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9\nnums is a non-decreasing array.\n-10^9 <= target <= 10^9",
        "hints": "Run binary search twice: once to find the leftmost position and once to find the rightmost position.",
        "starter_code": {
            "python": "class Solution:\n    def searchRange(self, nums: list[int], target: int) -> list[int]:\n        pass",
            "javascript": "var searchRange = function(nums, target) {\n    \n};",
            "java": "class Solution {\n    public int[] searchRange(int[] nums, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> searchRange(vector<int>& nums, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[5,7,7,8,8,10]\n8", "expected_output": "[3,4]", "is_sample": True},
            {"input": "[5,7,7,8,8,10]\n6", "expected_output": "[-1,-1]", "is_sample": True},
            {"input": "[]\n0", "expected_output": "[-1,-1]", "is_sample": False},
        ],
    },
    # ─── 13. Search a 2D Matrix ──────────────────────────────────────────
    {
        "title": "Search a 2D Matrix",
        "difficulty": "medium",
        "tags": ["array", "binary-search", "matrix"],
        "companies": ["amazon", "microsoft", "bloomberg"],
        "description": "You are given an `m x n` integer matrix `matrix` with the following two properties:\n- Each row is sorted in non-decreasing order.\n- The first integer of each row is greater than the last integer of the previous row.\n\nGiven an integer `target`, return `true` if `target` is in `matrix` or `false` otherwise.\n\nYou must write a solution in O(log(m * n)) time complexity.\n\nExample 1:\nInput: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3\nOutput: true\n\nExample 2:\nInput: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13\nOutput: false",
        "constraints": "m == matrix.length\nn == matrix[i].length\n1 <= m, n <= 100\n-10^4 <= matrix[i][j], target <= 10^4",
        "hints": "Treat the 2D matrix as a 1D sorted array and perform binary search using index mapping.",
        "starter_code": {
            "python": "class Solution:\n    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:\n        pass",
            "javascript": "var searchMatrix = function(matrix, target) {\n    \n};",
            "java": "class Solution {\n    public boolean searchMatrix(int[][] matrix, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n3", "expected_output": "true", "is_sample": True},
            {"input": "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n13", "expected_output": "false", "is_sample": True},
            {"input": "[[1]]\n1", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 14. Koko Eating Bananas ─────────────────────────────────────────
    {
        "title": "Koko Eating Bananas",
        "difficulty": "medium",
        "tags": ["array", "binary-search"],
        "companies": ["google", "amazon", "uber"],
        "description": "Koko loves to eat bananas. There are `n` piles of bananas, the ith pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.\n\nKoko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile and eats `k` bananas from that pile. If the pile has less than `k` bananas, she eats all of them and will not eat any more bananas during this hour.\n\nReturn the minimum integer `k` such that she can eat all the bananas within `h` hours.\n\nExample 1:\nInput: piles = [3,6,7,11], h = 8\nOutput: 4\n\nExample 2:\nInput: piles = [30,11,23,4,20], h = 5\nOutput: 30\n\nExample 3:\nInput: piles = [30,11,23,4,20], h = 6\nOutput: 23",
        "constraints": "1 <= piles.length <= 10^4\npiles.length <= h <= 10^9\n1 <= piles[i] <= 10^9",
        "hints": "Binary search on the eating speed k. For each candidate speed, check if Koko can finish all bananas within h hours.",
        "starter_code": {
            "python": "class Solution:\n    def minEatingSpeed(self, piles: list[int], h: int) -> int:\n        pass",
            "javascript": "var minEatingSpeed = function(piles, h) {\n    \n};",
            "java": "class Solution {\n    public int minEatingSpeed(int[] piles, int h) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minEatingSpeed(vector<int>& piles, int h) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,6,7,11]\n8", "expected_output": "4", "is_sample": True},
            {"input": "[30,11,23,4,20]\n5", "expected_output": "30", "is_sample": True},
            {"input": "[30,11,23,4,20]\n6", "expected_output": "23", "is_sample": False},
        ],
    },
    # ─── 15. Median of Two Sorted Arrays ─────────────────────────────────
    {
        "title": "Median of Two Sorted Arrays",
        "difficulty": "hard",
        "tags": ["array", "binary-search"],
        "companies": ["google", "amazon", "microsoft", "meta"],
        "description": "Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).\n\nExample 1:\nInput: nums1 = [1,3], nums2 = [2]\nOutput: 2.00000\nExplanation: merged array = [1,2,3] and median is 2.\n\nExample 2:\nInput: nums1 = [1,2], nums2 = [3,4]\nOutput: 2.50000\nExplanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.",
        "constraints": "nums1.length == m\nnums2.length == n\n0 <= m <= 1000\n0 <= n <= 1000\n1 <= m + n <= 2000\n-10^6 <= nums1[i], nums2[i] <= 10^6",
        "hints": "Binary search on the smaller array. Partition both arrays such that the left half contains exactly half of all elements.",
        "starter_code": {
            "python": "class Solution:\n    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:\n        pass",
            "javascript": "var findMedianSortedArrays = function(nums1, nums2) {\n    \n};",
            "java": "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,3]\n[2]", "expected_output": "2.00000", "is_sample": True},
            {"input": "[1,2]\n[3,4]", "expected_output": "2.50000", "is_sample": True},
            {"input": "[0,0]\n[0,0]", "expected_output": "0.00000", "is_sample": False},
        ],
    },
    # ─── 16. Container With Most Water ───────────────────────────────────
    {
        "title": "Container With Most Water",
        "difficulty": "medium",
        "tags": ["array", "two-pointers", "greedy"],
        "companies": ["amazon", "google", "meta", "bloomberg"],
        "description": "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the ith line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.\n\nExample 1:\nInput: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49\nExplanation: The max area is between indices 1 and 8 (8 and 7), giving 7 * min(8,7) = 49.\n\nExample 2:\nInput: height = [1,1]\nOutput: 1",
        "constraints": "n == height.length\n2 <= n <= 10^5\n0 <= height[i] <= 10^4",
        "hints": "Use two pointers starting from both ends. Move the pointer with the smaller height inward.",
        "starter_code": {
            "python": "class Solution:\n    def maxArea(self, height: list[int]) -> int:\n        pass",
            "javascript": "var maxArea = function(height) {\n    \n};",
            "java": "class Solution {\n    public int maxArea(int[] height) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,8,6,2,5,4,8,3,7]", "expected_output": "49", "is_sample": True},
            {"input": "[1,1]", "expected_output": "1", "is_sample": True},
            {"input": "[4,3,2,1,4]", "expected_output": "16", "is_sample": False},
        ],
    },
    # ─── 17. 3Sum ────────────────────────────────────────────────────────
    {
        "title": "3Sum",
        "difficulty": "medium",
        "tags": ["array", "two-pointers", "sorting"],
        "companies": ["meta", "amazon", "bloomberg", "apple"],
        "description": "Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.\n\nExample 1:\nInput: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]\n\nExample 2:\nInput: nums = [0,1,1]\nOutput: []\n\nExample 3:\nInput: nums = [0,0,0]\nOutput: [[0,0,0]]",
        "constraints": "3 <= nums.length <= 3000\n-10^5 <= nums[i] <= 10^5",
        "hints": "Sort the array. Fix one element and use two pointers for the remaining pair. Skip duplicates.",
        "starter_code": {
            "python": "class Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        pass",
            "javascript": "var threeSum = function(nums) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[-1,0,1,2,-1,-4]", "expected_output": "[[-1,-1,2],[-1,0,1]]", "is_sample": True},
            {"input": "[0,1,1]", "expected_output": "[]", "is_sample": True},
            {"input": "[0,0,0]", "expected_output": "[[0,0,0]]", "is_sample": False},
        ],
    },
    # ─── 18. Longest Substring Without Repeating Characters ──────────────
    {
        "title": "Longest Substring Without Repeating Characters",
        "difficulty": "medium",
        "tags": ["string", "hash-table", "sliding-window"],
        "companies": ["amazon", "meta", "bloomberg", "microsoft"],
        "description": "Given a string `s`, find the length of the longest substring without repeating characters.\n\nExample 1:\nInput: s = \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with the length of 3.\n\nExample 2:\nInput: s = \"bbbbb\"\nOutput: 1\n\nExample 3:\nInput: s = \"pwwkew\"\nOutput: 3",
        "constraints": "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
        "hints": "Use a sliding window with a set or hash map to track characters in the current window.",
        "starter_code": {
            "python": "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        pass",
            "javascript": "var lengthOfLongestSubstring = function(s) {\n    \n};",
            "java": "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"abcabcbb\"", "expected_output": "3", "is_sample": True},
            {"input": "\"bbbbb\"", "expected_output": "1", "is_sample": True},
            {"input": "\"pwwkew\"", "expected_output": "3", "is_sample": False},
        ],
    },
    # ─── 19. Valid Anagram ───────────────────────────────────────────────
    {
        "title": "Valid Anagram",
        "difficulty": "easy",
        "tags": ["string", "hash-table", "sorting"],
        "companies": ["amazon", "microsoft", "uber"],
        "description": "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.\n\nExample 1:\nInput: s = \"anagram\", t = \"nagaram\"\nOutput: true\n\nExample 2:\nInput: s = \"rat\", t = \"car\"\nOutput: false",
        "constraints": "1 <= s.length, t.length <= 5 * 10^4\ns and t consist of lowercase English letters.",
        "hints": "Count the frequency of each character in both strings and compare.",
        "starter_code": {
            "python": "class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        pass",
            "javascript": "var isAnagram = function(s, t) {\n    \n};",
            "java": "class Solution {\n    public boolean isAnagram(String s, String t) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"anagram\"\n\"nagaram\"", "expected_output": "true", "is_sample": True},
            {"input": "\"rat\"\n\"car\"", "expected_output": "false", "is_sample": True},
            {"input": "\"a\"\n\"ab\"", "expected_output": "false", "is_sample": False},
        ],
    },
    # ─── 20. Valid Palindrome ────────────────────────────────────────────
    {
        "title": "Valid Palindrome",
        "difficulty": "easy",
        "tags": ["string", "two-pointers"],
        "companies": ["meta", "microsoft", "apple"],
        "description": "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.\n\nExample 1:\nInput: s = \"A man, a plan, a canal: Panama\"\nOutput: true\nExplanation: \"amanaplanacanalpanama\" is a palindrome.\n\nExample 2:\nInput: s = \"race a car\"\nOutput: false\n\nExample 3:\nInput: s = \" \"\nOutput: true",
        "constraints": "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
        "hints": "Use two pointers from both ends, skipping non-alphanumeric characters.",
        "starter_code": {
            "python": "class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        pass",
            "javascript": "var isPalindrome = function(s) {\n    \n};",
            "java": "class Solution {\n    public boolean isPalindrome(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isPalindrome(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"A man, a plan, a canal: Panama\"", "expected_output": "true", "is_sample": True},
            {"input": "\"race a car\"", "expected_output": "false", "is_sample": True},
            {"input": "\" \"", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 21. Two Sum II - Input Array Is Sorted ──────────────────────────
    {
        "title": "Two Sum II - Input Array Is Sorted",
        "difficulty": "medium",
        "tags": ["array", "two-pointers", "binary-search"],
        "companies": ["amazon", "adobe", "bloomberg"],
        "description": "Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number.\n\nReturn the indices of the two numbers, `index1` and `index2`, added by one as an integer array `[index1, index2]` of length 2.\n\nYou may not use the same element twice. Your solution must use only constant extra space.\n\nExample 1:\nInput: numbers = [2,7,11,15], target = 9\nOutput: [1,2]\n\nExample 2:\nInput: numbers = [2,3,4], target = 6\nOutput: [1,3]\n\nExample 3:\nInput: numbers = [-1,0], target = -1\nOutput: [1,2]",
        "constraints": "2 <= numbers.length <= 3 * 10^4\n-1000 <= numbers[i] <= 1000\nnumbers is sorted in non-decreasing order.\n-1000 <= target <= 1000",
        "hints": "Use two pointers, one at the start and one at the end. If the sum is too large, move the right pointer left; if too small, move the left pointer right.",
        "starter_code": {
            "python": "class Solution:\n    def twoSum(self, numbers: list[int], target: int) -> list[int]:\n        pass",
            "javascript": "var twoSum = function(numbers, target) {\n    \n};",
            "java": "class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,7,11,15]\n9", "expected_output": "[1,2]", "is_sample": True},
            {"input": "[2,3,4]\n6", "expected_output": "[1,3]", "is_sample": True},
            {"input": "[-1,0]\n-1", "expected_output": "[1,2]", "is_sample": False},
        ],
    },
    # ─── 22. Remove Element ──────────────────────────────────────────────
    {
        "title": "Remove Element",
        "difficulty": "easy",
        "tags": ["array", "two-pointers"],
        "companies": ["adobe", "apple"],
        "description": "Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in `nums` in-place. The order of the elements may be changed. Then return the number of elements in `nums` which are not equal to `val`.\n\nExample 1:\nInput: nums = [3,2,2,3], val = 3\nOutput: 2, nums = [2,2,_,_]\n\nExample 2:\nInput: nums = [0,1,2,2,3,0,4,2], val = 2\nOutput: 5, nums = [0,1,4,0,3,_,_,_]",
        "constraints": "0 <= nums.length <= 100\n0 <= nums[i] <= 50\n0 <= val <= 100",
        "hints": "Use two pointers: a slow pointer for the position to write and a fast pointer to scan.",
        "starter_code": {
            "python": "class Solution:\n    def removeElement(self, nums: list[int], val: int) -> int:\n        pass",
            "javascript": "var removeElement = function(nums, val) {\n    \n};",
            "java": "class Solution {\n    public int removeElement(int[] nums, int val) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int removeElement(vector<int>& nums, int val) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,2,2,3]\n3", "expected_output": "2", "is_sample": True},
            {"input": "[0,1,2,2,3,0,4,2]\n2", "expected_output": "5", "is_sample": True},
            {"input": "[]\n0", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 23. Longest Common Prefix ───────────────────────────────────────
    {
        "title": "Longest Common Prefix",
        "difficulty": "easy",
        "tags": ["string"],
        "companies": ["google", "amazon", "adobe"],
        "description": "Write a function to find the longest common prefix string amongst an array of strings.\n\nIf there is no common prefix, return an empty string \"\".\n\nExample 1:\nInput: strs = [\"flower\",\"flow\",\"flight\"]\nOutput: \"fl\"\n\nExample 2:\nInput: strs = [\"dog\",\"racecar\",\"car\"]\nOutput: \"\"\nExplanation: There is no common prefix among the input strings.",
        "constraints": "1 <= strs.length <= 200\n0 <= strs[i].length <= 200\nstrs[i] consists of only lowercase English letters.",
        "hints": "Compare characters at the same position across all strings. Stop when a mismatch is found.",
        "starter_code": {
            "python": "class Solution:\n    def longestCommonPrefix(self, strs: list[str]) -> str:\n        pass",
            "javascript": "var longestCommonPrefix = function(strs) {\n    \n};",
            "java": "class Solution {\n    public String longestCommonPrefix(String[] strs) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"flower\",\"flow\",\"flight\"]", "expected_output": "\"fl\"", "is_sample": True},
            {"input": "[\"dog\",\"racecar\",\"car\"]", "expected_output": "\"\"", "is_sample": True},
            {"input": "[\"a\"]", "expected_output": "\"a\"", "is_sample": False},
        ],
    },
    # ─── 24. Reverse String ──────────────────────────────────────────────
    {
        "title": "Reverse String",
        "difficulty": "easy",
        "tags": ["string", "two-pointers"],
        "companies": ["microsoft", "apple"],
        "description": "Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.\n\nExample 1:\nInput: s = [\"h\",\"e\",\"l\",\"l\",\"o\"]\nOutput: [\"o\",\"l\",\"l\",\"e\",\"h\"]\n\nExample 2:\nInput: s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]\nOutput: [\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]",
        "constraints": "1 <= s.length <= 10^5\ns[i] is a printable ascii character.",
        "hints": "Use two pointers from both ends and swap characters.",
        "starter_code": {
            "python": "class Solution:\n    def reverseString(self, s: list[str]) -> None:\n        pass",
            "javascript": "var reverseString = function(s) {\n    \n};",
            "java": "class Solution {\n    public void reverseString(char[] s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"h\",\"e\",\"l\",\"l\",\"o\"]", "expected_output": "[\"o\",\"l\",\"l\",\"e\",\"h\"]", "is_sample": True},
            {"input": "[\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]", "expected_output": "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]", "is_sample": True},
            {"input": "[\"a\"]", "expected_output": "[\"a\"]", "is_sample": False},
        ],
    },
    # ─── 25. Binary Search ───────────────────────────────────────────────
    {
        "title": "Binary Search",
        "difficulty": "easy",
        "tags": ["array", "binary-search"],
        "companies": ["microsoft", "amazon"],
        "description": "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.\n\nExample 1:\nInput: nums = [-1,0,3,5,9,12], target = 9\nOutput: 4\nExplanation: 9 exists in nums and its index is 4.\n\nExample 2:\nInput: nums = [-1,0,3,5,9,12], target = 2\nOutput: -1\nExplanation: 2 does not exist in nums so return -1.",
        "constraints": "1 <= nums.length <= 10^4\n-10^4 < nums[i], target < 10^4\nAll the integers in nums are unique.\nnums is sorted in ascending order.",
        "hints": "Classic binary search: maintain left and right boundaries and check the middle element.",
        "starter_code": {
            "python": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        pass",
            "javascript": "var search = function(nums, target) {\n    \n};",
            "java": "class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[-1,0,3,5,9,12]\n9", "expected_output": "4", "is_sample": True},
            {"input": "[-1,0,3,5,9,12]\n2", "expected_output": "-1", "is_sample": True},
            {"input": "[5]\n5", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 26. Search Insert Position ──────────────────────────────────────
    {
        "title": "Search Insert Position",
        "difficulty": "easy",
        "tags": ["array", "binary-search"],
        "companies": ["apple", "google"],
        "description": "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.\n\nYou must write an algorithm with O(log n) runtime complexity.\n\nExample 1:\nInput: nums = [1,3,5,6], target = 5\nOutput: 2\n\nExample 2:\nInput: nums = [1,3,5,6], target = 2\nOutput: 1\n\nExample 3:\nInput: nums = [1,3,5,6], target = 7\nOutput: 4",
        "constraints": "1 <= nums.length <= 10^4\n-10^4 <= nums[i] <= 10^4\nnums contains distinct values sorted in ascending order.\n-10^4 <= target <= 10^4",
        "hints": "Use binary search. When the target is not found, the left pointer will be at the correct insertion position.",
        "starter_code": {
            "python": "class Solution:\n    def searchInsert(self, nums: list[int], target: int) -> int:\n        pass",
            "javascript": "var searchInsert = function(nums, target) {\n    \n};",
            "java": "class Solution {\n    public int searchInsert(int[] nums, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int searchInsert(vector<int>& nums, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,3,5,6]\n5", "expected_output": "2", "is_sample": True},
            {"input": "[1,3,5,6]\n2", "expected_output": "1", "is_sample": True},
            {"input": "[1,3,5,6]\n7", "expected_output": "4", "is_sample": False},
        ],
    },
    # ─── 27. Find Minimum in Rotated Sorted Array ────────────────────────
    {
        "title": "Find Minimum in Rotated Sorted Array",
        "difficulty": "medium",
        "tags": ["array", "binary-search"],
        "companies": ["meta", "amazon", "microsoft"],
        "description": "Suppose an array of length `n` sorted in ascending order is rotated between 1 and `n` times. Given the sorted rotated array `nums` of unique elements, return the minimum element of this array.\n\nYou must write an algorithm that runs in O(log n) time.\n\nExample 1:\nInput: nums = [3,4,5,1,2]\nOutput: 1\n\nExample 2:\nInput: nums = [4,5,6,7,0,1,2]\nOutput: 0\n\nExample 3:\nInput: nums = [11,13,15,17]\nOutput: 11",
        "constraints": "n == nums.length\n1 <= n <= 5000\n-5000 <= nums[i] <= 5000\nAll the integers of nums are unique.\nnums is sorted and rotated between 1 and n times.",
        "hints": "Use binary search. Compare the mid element with the rightmost element to decide which half contains the minimum.",
        "starter_code": {
            "python": "class Solution:\n    def findMin(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var findMin = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int findMin(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,4,5,1,2]", "expected_output": "1", "is_sample": True},
            {"input": "[4,5,6,7,0,1,2]", "expected_output": "0", "is_sample": True},
            {"input": "[11,13,15,17]", "expected_output": "11", "is_sample": False},
        ],
    },
    # ─── 28. Maximum Subarray ────────────────────────────────────────────
    {
        "title": "Maximum Subarray",
        "difficulty": "medium",
        "tags": ["array", "divide-and-conquer"],
        "companies": ["amazon", "microsoft", "linkedin", "apple"],
        "description": "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.\n\nExample 1:\nInput: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: The subarray [4,-1,2,1] has the largest sum 6.\n\nExample 2:\nInput: nums = [1]\nOutput: 1\n\nExample 3:\nInput: nums = [5,4,-1,7,8]\nOutput: 23",
        "constraints": "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
        "hints": "Use Kadane's algorithm: track the current sum and reset it to 0 whenever it becomes negative.",
        "starter_code": {
            "python": "class Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var maxSubArray = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[-2,1,-3,4,-1,2,1,-5,4]", "expected_output": "6", "is_sample": True},
            {"input": "[1]", "expected_output": "1", "is_sample": True},
            {"input": "[5,4,-1,7,8]", "expected_output": "23", "is_sample": False},
        ],
    },
    # ─── 29. Merge Sorted Array ──────────────────────────────────────────
    {
        "title": "Merge Sorted Array",
        "difficulty": "easy",
        "tags": ["array", "two-pointers", "sorting"],
        "companies": ["meta", "microsoft", "bloomberg"],
        "description": "You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.\n\nMerge `nums1` and `nums2` into a single array sorted in non-decreasing order.\n\nThe final sorted array should be stored inside the array `nums1`. To accommodate this, `nums1` has a length of `m + n`.\n\nExample 1:\nInput: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3\nOutput: [1,2,2,3,5,6]\n\nExample 2:\nInput: nums1 = [1], m = 1, nums2 = [], n = 0\nOutput: [1]",
        "constraints": "nums1.length == m + n\nnums2.length == n\n0 <= m, n <= 200\n1 <= m + n <= 200\n-10^9 <= nums1[i], nums2[j] <= 10^9",
        "hints": "Merge from the end of nums1. Use three pointers: one for the end of valid nums1, one for the end of nums2, and one for the write position.",
        "starter_code": {
            "python": "class Solution:\n    def merge(self, nums1: list[int], m: int, nums2: list[int], n: int) -> None:\n        pass",
            "javascript": "var merge = function(nums1, m, nums2, n) {\n    \n};",
            "java": "class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,0,0,0]\n3\n[2,5,6]\n3", "expected_output": "[1,2,2,3,5,6]", "is_sample": True},
            {"input": "[1]\n1\n[]\n0", "expected_output": "[1]", "is_sample": True},
            {"input": "[0]\n0\n[1]\n1", "expected_output": "[1]", "is_sample": False},
        ],
    },
    # ─── 30. Squares of a Sorted Array ───────────────────────────────────
    {
        "title": "Squares of a Sorted Array",
        "difficulty": "easy",
        "tags": ["array", "two-pointers", "sorting"],
        "companies": ["meta", "amazon", "google"],
        "description": "Given an integer array `nums` sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.\n\nExample 1:\nInput: nums = [-4,-1,0,3,10]\nOutput: [0,1,9,16,100]\nExplanation: After squaring, the array becomes [16,1,0,9,100]. After sorting, it becomes [0,1,9,16,100].\n\nExample 2:\nInput: nums = [-7,-3,2,3,11]\nOutput: [4,9,9,49,121]",
        "constraints": "1 <= nums.length <= 10^4\n-10^4 <= nums[i] <= 10^4\nnums is sorted in non-decreasing order.",
        "hints": "Use two pointers from both ends. Compare absolute values and fill the result from the back.",
        "starter_code": {
            "python": "class Solution:\n    def sortedSquares(self, nums: list[int]) -> list[int]:\n        pass",
            "javascript": "var sortedSquares = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int[] sortedSquares(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> sortedSquares(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[-4,-1,0,3,10]", "expected_output": "[0,1,9,16,100]", "is_sample": True},
            {"input": "[-7,-3,2,3,11]", "expected_output": "[4,9,9,49,121]", "is_sample": True},
            {"input": "[1]", "expected_output": "[1]", "is_sample": False},
        ],
    },
]

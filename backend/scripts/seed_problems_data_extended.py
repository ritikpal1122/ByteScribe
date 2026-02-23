"""Extended LeetCode problems (beyond Blind 75). ~150 additional popular problems."""

PROBLEMS_EXTENDED = [
    # ─── Arrays & Hashing ──────────────────────────────────────────────────
    {
        "title": "Move Zeroes",
        "difficulty": "easy",
        "tags": ["array", "two-pointers"],
        "companies": ["meta", "amazon", "apple"],
        "description": "Given an integer array `nums`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements.\n\nNote that you must do this in-place without making a copy of the array.",
        "constraints": "1 <= nums.length <= 10^4\n-2^31 <= nums[i] <= 2^31 - 1",
        "hints": "Use two pointers: one for the current position and one for the next non-zero position.",
        "starter_code": {
            "python": "class Solution:\n    def moveZeroes(self, nums: list[int]) -> None:\n        pass",
            "javascript": "var moveZeroes = function(nums) {\n    \n};",
            "java": "class Solution {\n    public void moveZeroes(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[0,1,0,3,12]", "expected_output": "[1,3,12,0,0]", "is_sample": True},
            {"input": "[0]", "expected_output": "[0]", "is_sample": True},
            {"input": "[1,2,3]", "expected_output": "[1,2,3]", "is_sample": False},
        ],
    },
    {
        "title": "Remove Duplicates from Sorted Array",
        "difficulty": "easy",
        "tags": ["array", "two-pointers"],
        "companies": ["microsoft", "amazon", "adobe"],
        "description": "Given an integer array `nums` sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.\n\nReturn the number of unique elements in `nums`.",
        "constraints": "1 <= nums.length <= 3 * 10^4\n-100 <= nums[i] <= 100\nnums is sorted in non-decreasing order.",
        "hints": "Use two pointers to overwrite duplicates.",
        "starter_code": {
            "python": "class Solution:\n    def removeDuplicates(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var removeDuplicates = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int removeDuplicates(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int removeDuplicates(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,1,2]", "expected_output": "2", "is_sample": True},
            {"input": "[0,0,1,1,1,2,2,3,3,4]", "expected_output": "5", "is_sample": True},
            {"input": "[1]", "expected_output": "1", "is_sample": False},
        ],
    },
    {
        "title": "Majority Element",
        "difficulty": "easy",
        "tags": ["array", "hash-table", "sorting"],
        "companies": ["amazon", "google", "microsoft"],
        "description": "Given an array `nums` of size `n`, return the majority element.\n\nThe majority element is the element that appears more than `n / 2` times. You may assume that the majority element always exists in the array.",
        "constraints": "n == nums.length\n1 <= n <= 5 * 10^4\n-10^9 <= nums[i] <= 10^9",
        "hints": "Try Boyer-Moore Voting Algorithm for O(1) space.",
        "starter_code": {
            "python": "class Solution:\n    def majorityElement(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var majorityElement = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int majorityElement(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int majorityElement(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,2,3]", "expected_output": "3", "is_sample": True},
            {"input": "[2,2,1,1,1,2,2]", "expected_output": "2", "is_sample": True},
            {"input": "[1]", "expected_output": "1", "is_sample": False},
        ],
    },
    {
        "title": "Roman to Integer",
        "difficulty": "easy",
        "tags": ["string", "hash-table", "math"],
        "companies": ["amazon", "apple", "microsoft", "adobe"],
        "description": "Given a roman numeral, convert it to an integer.\n\nRoman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.\n\nSymbol → Value: I=1, V=5, X=10, L=50, C=100, D=500, M=1000\n\nRoman numerals are usually written largest to smallest from left to right. However, the numeral for four is `IV` (not `IIII`). The same principle applies to IX, XL, XC, CD, CM.",
        "constraints": "1 <= s.length <= 15\ns contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M')\nIt is guaranteed that s is a valid roman numeral in the range [1, 3999].",
        "hints": "If a smaller value appears before a larger value, subtract it.",
        "starter_code": {
            "python": "class Solution:\n    def romanToInt(self, s: str) -> int:\n        pass",
            "javascript": "var romanToInt = function(s) {\n    \n};",
            "java": "class Solution {\n    public int romanToInt(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int romanToInt(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "III", "expected_output": "3", "is_sample": True},
            {"input": "LVIII", "expected_output": "58", "is_sample": True},
            {"input": "MCMXCIV", "expected_output": "1994", "is_sample": False},
        ],
    },
    {
        "title": "Longest Consecutive Sequence",
        "difficulty": "medium",
        "tags": ["array", "hash-table", "union-find"],
        "companies": ["google", "amazon", "meta", "spotify"],
        "description": "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in O(n) time.",
        "constraints": "0 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
        "hints": "Use a set. For each number, check if it's the start of a sequence (num-1 not in set).",
        "starter_code": {
            "python": "class Solution:\n    def longestConsecutive(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var longestConsecutive = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int longestConsecutive(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[100,4,200,1,3,2]", "expected_output": "4", "is_sample": True},
            {"input": "[0,3,7,2,5,8,4,6,0,1]", "expected_output": "9", "is_sample": True},
            {"input": "[]", "expected_output": "0", "is_sample": False},
        ],
    },
    {
        "title": "Sort Colors",
        "difficulty": "medium",
        "tags": ["array", "two-pointers", "sorting"],
        "companies": ["microsoft", "oracle", "adobe"],
        "description": "Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.\n\nWe will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively.\n\nYou must solve this problem without using the library's sort function.",
        "constraints": "n == nums.length\n1 <= n <= 300\nnums[i] is either 0, 1, or 2.",
        "hints": "Use the Dutch National Flag algorithm with three pointers.",
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
    {
        "title": "Next Permutation",
        "difficulty": "medium",
        "tags": ["array", "two-pointers"],
        "companies": ["google", "uber", "bytedance"],
        "description": "A permutation of an array of integers is an arrangement of its members into a sequence or linear order.\n\nThe next permutation of an array of integers is the next lexicographically greater permutation of its integer.\n\nIf such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).\n\nThe replacement must be in place and use only constant extra memory.",
        "constraints": "1 <= nums.length <= 100\n0 <= nums[i] <= 100",
        "hints": "Find the first decreasing element from the right, then swap it with the next larger element.",
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
    {
        "title": "First Missing Positive",
        "difficulty": "hard",
        "tags": ["array", "hash-table"],
        "companies": ["amazon", "google", "microsoft", "apple"],
        "description": "Given an unsorted integer array `nums`, return the smallest missing positive integer.\n\nYou must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.",
        "constraints": "1 <= nums.length <= 10^5\n-2^31 <= nums[i] <= 2^31 - 1",
        "hints": "Place each number in its correct index position (1 at index 0, 2 at index 1, etc.).",
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
    {
        "title": "Trapping Rain Water",
        "difficulty": "hard",
        "tags": ["array", "two-pointers", "stack", "dynamic-programming"],
        "companies": ["google", "amazon", "meta", "microsoft"],
        "description": "Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.",
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
            {"input": "[4,2,3]", "expected_output": "1", "is_sample": False},
        ],
    },
    {
        "title": "Subarray Sum Equals K",
        "difficulty": "medium",
        "tags": ["array", "hash-table"],
        "companies": ["meta", "google", "amazon", "bytedance"],
        "description": "Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.\n\nA subarray is a contiguous non-empty sequence of elements within an array.",
        "constraints": "1 <= nums.length <= 2 * 10^4\n-1000 <= nums[i] <= 1000\n-10^7 <= k <= 10^7",
        "hints": "Use prefix sums with a hash map to count occurrences.",
        "starter_code": {
            "python": "class Solution:\n    def subarraySum(self, nums: list[int], k: int) -> int:\n        pass",
            "javascript": "var subarraySum = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public int subarraySum(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,1,1]\n2", "expected_output": "2", "is_sample": True},
            {"input": "[1,2,3]\n3", "expected_output": "2", "is_sample": True},
            {"input": "[1]\n0", "expected_output": "0", "is_sample": False},
        ],
    },
    {
        "title": "Pascal's Triangle",
        "difficulty": "easy",
        "tags": ["array", "dynamic-programming"],
        "companies": ["amazon", "microsoft", "adobe"],
        "description": "Given an integer `numRows`, return the first numRows of Pascal's triangle.\n\nIn Pascal's triangle, each number is the sum of the two numbers directly above it.",
        "constraints": "1 <= numRows <= 30",
        "hints": "Build each row from the previous one.",
        "starter_code": {
            "python": "class Solution:\n    def generate(self, numRows: int) -> list[list[int]]:\n        pass",
            "javascript": "var generate = function(numRows) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> generate(int numRows) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> generate(int numRows) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "5", "expected_output": "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]", "is_sample": True},
            {"input": "1", "expected_output": "[[1]]", "is_sample": True},
        ],
    },
    {
        "title": "Single Number",
        "difficulty": "easy",
        "tags": ["array", "bit-manipulation"],
        "companies": ["google", "apple", "palantir"],
        "description": "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.\n\nYou must implement a solution with a linear runtime complexity and use only constant extra space.",
        "constraints": "1 <= nums.length <= 3 * 10^4\n-3 * 10^4 <= nums[i] <= 3 * 10^4\nEach element appears twice except for one.",
        "hints": "XOR all elements together. a ^ a = 0 and a ^ 0 = a.",
        "starter_code": {
            "python": "class Solution:\n    def singleNumber(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var singleNumber = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int singleNumber(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,2,1]", "expected_output": "1", "is_sample": True},
            {"input": "[4,1,2,1,2]", "expected_output": "4", "is_sample": True},
            {"input": "[1]", "expected_output": "1", "is_sample": False},
        ],
    },
    {
        "title": "Plus One",
        "difficulty": "easy",
        "tags": ["array", "math"],
        "companies": ["google", "meta", "adobe"],
        "description": "You are given a large integer represented as an integer array `digits`, where each `digits[i]` is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order.\n\nIncrement the large integer by one and return the resulting array of digits.",
        "constraints": "1 <= digits.length <= 100\n0 <= digits[i] <= 9",
        "hints": "Start from the last digit and handle carry.",
        "starter_code": {
            "python": "class Solution:\n    def plusOne(self, digits: list[int]) -> list[int]:\n        pass",
            "javascript": "var plusOne = function(digits) {\n    \n};",
            "java": "class Solution {\n    public int[] plusOne(int[] digits) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> plusOne(vector<int>& digits) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3]", "expected_output": "[1,2,4]", "is_sample": True},
            {"input": "[9,9,9]", "expected_output": "[1,0,0,0]", "is_sample": True},
            {"input": "[0]", "expected_output": "[1]", "is_sample": False},
        ],
    },
    {
        "title": "Merge Sorted Array",
        "difficulty": "easy",
        "tags": ["array", "two-pointers", "sorting"],
        "companies": ["meta", "microsoft", "linkedin"],
        "description": "You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.\n\nMerge `nums1` and `nums2` into a single array sorted in non-decreasing order.\n\nThe final sorted array should be stored inside the array `nums1`. To accommodate this, `nums1` has a length of `m + n`.",
        "constraints": "nums1.length == m + n\nnums2.length == n\n0 <= m, n <= 200",
        "hints": "Merge from the end to avoid overwriting elements.",
        "starter_code": {
            "python": "class Solution:\n    def merge(self, nums1: list[int], m: int, nums2: list[int], n: int) -> None:\n        pass",
            "javascript": "var merge = function(nums1, m, nums2, n) {\n    \n};",
            "java": "class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,0,0,0]\n3\n[2,5,6]\n3", "expected_output": "[1,2,2,3,5,6]", "is_sample": True},
            {"input": "[1]\n1\n[]\n0", "expected_output": "[1]", "is_sample": True},
        ],
    },
    {
        "title": "Remove Element",
        "difficulty": "easy",
        "tags": ["array", "two-pointers"],
        "companies": ["amazon", "adobe", "shopify"],
        "description": "Given an integer array `nums` and an integer `val`, remove all occurrences of `val` in `nums` in-place. The order of the elements may be changed. Then return the number of elements in `nums` which are not equal to `val`.",
        "constraints": "0 <= nums.length <= 100\n0 <= nums[i] <= 50\n0 <= val <= 100",
        "hints": "Use two pointers to overwrite matching elements.",
        "starter_code": {
            "python": "class Solution:\n    def removeElement(self, nums: list[int], val: int) -> int:\n        pass",
            "javascript": "var removeElement = function(nums, val) {\n    \n};",
            "java": "class Solution {\n    public int removeElement(int[] nums, int val) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int removeElement(vector<int>& nums, int val) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,2,2,3]\n3", "expected_output": "2", "is_sample": True},
            {"input": "[0,1,2,2,3,0,4,2]\n2", "expected_output": "5", "is_sample": True},
        ],
    },
    # ─── Two Pointers ──────────────────────────────────────────────────────
    {
        "title": "Valid Palindrome II",
        "difficulty": "easy",
        "tags": ["string", "two-pointers", "greedy"],
        "companies": ["meta", "uber", "linkedin"],
        "description": "Given a string `s`, return `true` if the `s` can be palindrome after deleting at most one character from it.",
        "constraints": "1 <= s.length <= 10^5\ns consists of lowercase English letters.",
        "hints": "When characters don't match, try skipping either the left or right character.",
        "starter_code": {
            "python": "class Solution:\n    def validPalindrome(self, s: str) -> bool:\n        pass",
            "javascript": "var validPalindrome = function(s) {\n    \n};",
            "java": "class Solution {\n    public boolean validPalindrome(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool validPalindrome(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "aba", "expected_output": "true", "is_sample": True},
            {"input": "abca", "expected_output": "true", "is_sample": True},
            {"input": "abc", "expected_output": "false", "is_sample": False},
        ],
    },
    {
        "title": "Boats to Save People",
        "difficulty": "medium",
        "tags": ["array", "two-pointers", "greedy", "sorting"],
        "companies": ["google", "amazon", "lyft"],
        "description": "You are given an array `people` where `people[i]` is the weight of the ith person, and an infinite number of boats where each boat can carry a maximum weight of `limit`. Each boat carries at most two people at the same time.\n\nReturn the minimum number of boats to carry every given person.",
        "constraints": "1 <= people.length <= 5 * 10^4\n1 <= people[i] <= limit <= 3 * 10^4",
        "hints": "Sort the array. Pair the lightest with the heaviest if possible.",
        "starter_code": {
            "python": "class Solution:\n    def numRescueBoats(self, people: list[int], limit: int) -> int:\n        pass",
            "javascript": "var numRescueBoats = function(people, limit) {\n    \n};",
            "java": "class Solution {\n    public int numRescueBoats(int[] people, int limit) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int numRescueBoats(vector<int>& people, int limit) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2]\n3", "expected_output": "1", "is_sample": True},
            {"input": "[3,2,2,1]\n3", "expected_output": "3", "is_sample": True},
            {"input": "[3,5,3,4]\n5", "expected_output": "4", "is_sample": False},
        ],
    },
    {
        "title": "Reverse String",
        "difficulty": "easy",
        "tags": ["string", "two-pointers"],
        "companies": ["apple", "amazon", "microsoft"],
        "description": "Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.",
        "constraints": "1 <= s.length <= 10^5\ns[i] is a printable ascii character.",
        "hints": "Swap characters from both ends moving inward.",
        "starter_code": {
            "python": "class Solution:\n    def reverseString(self, s: list[str]) -> None:\n        pass",
            "javascript": "var reverseString = function(s) {\n    \n};",
            "java": "class Solution {\n    public void reverseString(char[] s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"h\",\"e\",\"l\",\"l\",\"o\"]", "expected_output": "[\"o\",\"l\",\"l\",\"e\",\"h\"]", "is_sample": True},
            {"input": "[\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]", "expected_output": "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]", "is_sample": True},
        ],
    },
    {
        "title": "Backspace String Compare",
        "difficulty": "easy",
        "tags": ["string", "two-pointers", "stack"],
        "companies": ["google", "meta", "oracle"],
        "description": "Given two strings `s` and `t`, return `true` if they are equal when both are typed into empty text editors. `#` means a backspace character.\n\nNote that after backspacing an empty text, the text will continue empty.",
        "constraints": "1 <= s.length, t.length <= 200\ns and t only contain lowercase letters and '#' characters.",
        "hints": "Process from right to left, counting backspaces.",
        "starter_code": {
            "python": "class Solution:\n    def backspaceCompare(self, s: str, t: str) -> bool:\n        pass",
            "javascript": "var backspaceCompare = function(s, t) {\n    \n};",
            "java": "class Solution {\n    public boolean backspaceCompare(String s, String t) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool backspaceCompare(string s, string t) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "ab#c\nad#c", "expected_output": "true", "is_sample": True},
            {"input": "ab##\nc#d#", "expected_output": "true", "is_sample": True},
            {"input": "a#c\nb", "expected_output": "false", "is_sample": False},
        ],
    },
    # ─── Sliding Window ────────────────────────────────────────────────────
    {
        "title": "Permutation in String",
        "difficulty": "medium",
        "tags": ["string", "hash-table", "sliding-window"],
        "companies": ["microsoft", "oracle", "bytedance"],
        "description": "Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise.\n\nIn other words, return `true` if one of `s1`'s permutations is the substring of `s2`.",
        "constraints": "1 <= s1.length, s2.length <= 10^4\ns1 and s2 consist of lowercase English letters.",
        "hints": "Use a sliding window of size len(s1) and compare character frequencies.",
        "starter_code": {
            "python": "class Solution:\n    def checkInclusion(self, s1: str, s2: str) -> bool:\n        pass",
            "javascript": "var checkInclusion = function(s1, s2) {\n    \n};",
            "java": "class Solution {\n    public boolean checkInclusion(String s1, String s2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool checkInclusion(string s1, string s2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "ab\neidbaooo", "expected_output": "true", "is_sample": True},
            {"input": "ab\neidboaoo", "expected_output": "false", "is_sample": True},
        ],
    },
    {
        "title": "Minimum Size Subarray Sum",
        "difficulty": "medium",
        "tags": ["array", "binary-search", "sliding-window"],
        "companies": ["amazon", "google", "nvidia"],
        "description": "Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a subarray whose sum is greater than or equal to `target`. If there is no such subarray, return `0` instead.",
        "constraints": "1 <= target <= 10^9\n1 <= nums.length <= 10^5\n1 <= nums[i] <= 10^4",
        "hints": "Use a sliding window approach, expanding right and shrinking left.",
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
    # ─── Stack ─────────────────────────────────────────────────────────────
    {
        "title": "Min Stack",
        "difficulty": "medium",
        "tags": ["stack", "design"],
        "companies": ["amazon", "google", "uber", "microsoft"],
        "description": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the `MinStack` class:\n- `MinStack()` initializes the stack object.\n- `void push(int val)` pushes the element val onto the stack.\n- `void pop()` removes the element on the top of the stack.\n- `int top()` gets the top element of the stack.\n- `int getMin()` retrieves the minimum element in the stack.\n\nYou must implement a solution with O(1) time complexity for each function.",
        "constraints": "-2^31 <= val <= 2^31 - 1\nMethods pop, top and getMin operations will always be called on non-empty stacks.\nAt most 3 * 10^4 calls will be made to push, pop, top, and getMin.",
        "hints": "Store the current minimum alongside each element.",
        "starter_code": {
            "python": "class MinStack:\n    def __init__(self):\n        pass\n    def push(self, val: int) -> None:\n        pass\n    def pop(self) -> None:\n        pass\n    def top(self) -> int:\n        pass\n    def getMin(self) -> int:\n        pass",
            "javascript": "var MinStack = function() {\n    \n};\nMinStack.prototype.push = function(val) {\n    \n};\nMinStack.prototype.pop = function() {\n    \n};\nMinStack.prototype.top = function() {\n    \n};\nMinStack.prototype.getMin = function() {\n    \n};",
            "java": "class MinStack {\n    public MinStack() {\n        \n    }\n    public void push(int val) {\n        \n    }\n    public void pop() {\n        \n    }\n    public int top() {\n        \n    }\n    public int getMin() {\n        \n    }\n}",
            "cpp": "class MinStack {\npublic:\n    MinStack() {\n        \n    }\n    void push(int val) {\n        \n    }\n    void pop() {\n        \n    }\n    int top() {\n        \n    }\n    int getMin() {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]\n[[],[-2],[0],[-3],[],[],[],[]]", "expected_output": "[null,null,null,null,-3,null,0,-2]", "is_sample": True},
        ],
    },
    {
        "title": "Evaluate Reverse Polish Notation",
        "difficulty": "medium",
        "tags": ["array", "math", "stack"],
        "companies": ["linkedin", "amazon", "dropbox"],
        "description": "You are given an array of strings `tokens` that represents an arithmetic expression in a Reverse Polish Notation.\n\nEvaluate the expression. Return an integer that represents the value of the expression.\n\nThe valid operators are `+`, `-`, `*`, and `/`. Each operand may be an integer or another expression. The division between two integers always truncates toward zero.",
        "constraints": "1 <= tokens.length <= 10^4\ntokens[i] is either an operator: +, -, *, /, or an integer in the range [-200, 200].",
        "hints": "Use a stack. Push numbers, pop two operands when you see an operator.",
        "starter_code": {
            "python": "class Solution:\n    def evalRPN(self, tokens: list[str]) -> int:\n        pass",
            "javascript": "var evalRPN = function(tokens) {\n    \n};",
            "java": "class Solution {\n    public int evalRPN(String[] tokens) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int evalRPN(vector<string>& tokens) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"2\",\"1\",\"+\",\"3\",\"*\"]", "expected_output": "9", "is_sample": True},
            {"input": "[\"4\",\"13\",\"5\",\"/\",\"+\"]", "expected_output": "6", "is_sample": True},
            {"input": "[\"10\",\"6\",\"9\",\"3\",\"+\",\"-11\",\"*\",\"/\",\"*\",\"17\",\"+\",\"5\",\"+\"]", "expected_output": "22", "is_sample": False},
        ],
    },
    {
        "title": "Daily Temperatures",
        "difficulty": "medium",
        "tags": ["array", "stack", "monotonic-stack"],
        "companies": ["meta", "amazon", "uber", "lyft"],
        "description": "Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.",
        "constraints": "1 <= temperatures.length <= 10^5\n30 <= temperatures[i] <= 100",
        "hints": "Use a monotonic decreasing stack of indices.",
        "starter_code": {
            "python": "class Solution:\n    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:\n        pass",
            "javascript": "var dailyTemperatures = function(temperatures) {\n    \n};",
            "java": "class Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[73,74,75,71,69,72,76,73]", "expected_output": "[1,1,4,2,1,1,0,0]", "is_sample": True},
            {"input": "[30,40,50,60]", "expected_output": "[1,1,1,0]", "is_sample": True},
            {"input": "[30,60,90]", "expected_output": "[1,1,0]", "is_sample": False},
        ],
    },
    {
        "title": "Largest Rectangle in Histogram",
        "difficulty": "hard",
        "tags": ["array", "stack", "monotonic-stack"],
        "companies": ["google", "amazon", "microsoft", "stripe"],
        "description": "Given an array of integers `heights` representing the histogram's bar height where the width of each bar is `1`, return the area of the largest rectangle in the histogram.",
        "constraints": "1 <= heights.length <= 10^5\n0 <= heights[i] <= 10^4",
        "hints": "Use a monotonic stack to find the nearest smaller element on both sides.",
        "starter_code": {
            "python": "class Solution:\n    def largestRectangleArea(self, heights: list[int]) -> int:\n        pass",
            "javascript": "var largestRectangleArea = function(heights) {\n    \n};",
            "java": "class Solution {\n    public int largestRectangleArea(int[] heights) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int largestRectangleArea(vector<int>& heights) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,1,5,6,2,3]", "expected_output": "10", "is_sample": True},
            {"input": "[2,4]", "expected_output": "4", "is_sample": True},
        ],
    },
    {
        "title": "Asteroid Collision",
        "difficulty": "medium",
        "tags": ["array", "stack", "simulation"],
        "companies": ["doordash", "snap", "airbnb"],
        "description": "We are given an array `asteroids` of integers representing asteroids in a row.\n\nFor each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.\n\nFind out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.",
        "constraints": "2 <= asteroids.length <= 10^4\n-1000 <= asteroids[i] <= 1000\nasteroids[i] != 0",
        "hints": "Use a stack. Only collisions happen when stack top is positive and current is negative.",
        "starter_code": {
            "python": "class Solution:\n    def asteroidCollision(self, asteroids: list[int]) -> list[int]:\n        pass",
            "javascript": "var asteroidCollision = function(asteroids) {\n    \n};",
            "java": "class Solution {\n    public int[] asteroidCollision(int[] asteroids) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> asteroidCollision(vector<int>& asteroids) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[5,10,-5]", "expected_output": "[5,10]", "is_sample": True},
            {"input": "[8,-8]", "expected_output": "[]", "is_sample": True},
            {"input": "[10,2,-5]", "expected_output": "[10]", "is_sample": False},
        ],
    },
    # ─── Binary Search ─────────────────────────────────────────────────────
    {
        "title": "Binary Search",
        "difficulty": "easy",
        "tags": ["array", "binary-search"],
        "companies": ["microsoft", "apple", "shopify"],
        "description": "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.\n\nYou must write an algorithm with O(log n) runtime complexity.",
        "constraints": "1 <= nums.length <= 10^4\n-10^4 < nums[i], target < 10^4\nAll the integers in nums are unique.\nnums is sorted in ascending order.",
        "hints": "Classic binary search with left and right pointers.",
        "starter_code": {
            "python": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        pass",
            "javascript": "var search = function(nums, target) {\n    \n};",
            "java": "class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[-1,0,3,5,9,12]\n9", "expected_output": "4", "is_sample": True},
            {"input": "[-1,0,3,5,9,12]\n2", "expected_output": "-1", "is_sample": True},
        ],
    },
    {
        "title": "Search a 2D Matrix",
        "difficulty": "medium",
        "tags": ["array", "binary-search", "matrix"],
        "companies": ["amazon", "meta", "oracle"],
        "description": "You are given an `m x n` integer matrix `matrix` with the following two properties:\n\n- Each row is sorted in non-decreasing order.\n- The first integer of each row is greater than the last integer of the previous row.\n\nGiven an integer `target`, return `true` if `target` is in `matrix` or `false` otherwise.\n\nYou must write a solution in O(log(m * n)) time complexity.",
        "constraints": "m == matrix.length\nn == matrix[i].length\n1 <= m, n <= 100\n-10^4 <= matrix[i][j], target <= 10^4",
        "hints": "Treat the 2D matrix as a 1D sorted array and use binary search.",
        "starter_code": {
            "python": "class Solution:\n    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:\n        pass",
            "javascript": "var searchMatrix = function(matrix, target) {\n    \n};",
            "java": "class Solution {\n    public boolean searchMatrix(int[][] matrix, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n3", "expected_output": "true", "is_sample": True},
            {"input": "[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n13", "expected_output": "false", "is_sample": True},
        ],
    },
    {
        "title": "Koko Eating Bananas",
        "difficulty": "medium",
        "tags": ["array", "binary-search"],
        "companies": ["google", "airbnb", "pinterest"],
        "description": "Koko loves to eat bananas. There are `n` piles of bananas, the ith pile has `piles[i]` bananas.\n\nThe guards will come back in `h` hours. Koko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile and eats `k` bananas from that pile. If the pile has less than `k` bananas, she eats all of them and will not eat any more bananas during this hour.\n\nReturn the minimum integer `k` such that she can eat all the bananas within `h` hours.",
        "constraints": "1 <= piles.length <= 10^4\npiles.length <= h <= 10^9\n1 <= piles[i] <= 10^9",
        "hints": "Binary search on the eating speed k. For each k, check if total hours <= h.",
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
    {
        "title": "Find Peak Element",
        "difficulty": "medium",
        "tags": ["array", "binary-search"],
        "companies": ["meta", "google", "microsoft"],
        "description": "A peak element is an element that is strictly greater than its neighbors.\n\nGiven a 0-indexed integer array `nums`, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.\n\nYou may imagine that `nums[-1] = nums[n] = -infinity`.\n\nYou must write an algorithm that runs in O(log n) time.",
        "constraints": "1 <= nums.length <= 1000\n-2^31 <= nums[i] <= 2^31 - 1\nnums[i] != nums[i + 1] for all valid i.",
        "hints": "Use binary search. Move toward the side with the larger neighbor.",
        "starter_code": {
            "python": "class Solution:\n    def findPeakElement(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var findPeakElement = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int findPeakElement(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findPeakElement(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,1]", "expected_output": "2", "is_sample": True},
            {"input": "[1,2,1,3,5,6,4]", "expected_output": "5", "is_sample": True},
        ],
    },
    {
        "title": "Search Insert Position",
        "difficulty": "easy",
        "tags": ["array", "binary-search"],
        "companies": ["amazon", "apple", "dropbox"],
        "description": "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.\n\nYou must write an algorithm with O(log n) runtime complexity.",
        "constraints": "1 <= nums.length <= 10^4\n-10^4 <= nums[i] <= 10^4\nnums contains distinct values sorted in ascending order.\n-10^4 <= target <= 10^4",
        "hints": "Standard binary search returning the left bound.",
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
    # ─── Linked List ──────────────────────────────────────────────────────
    {
        "title": "Add Two Numbers",
        "difficulty": "medium",
        "tags": ["linked-list", "math", "recursion"],
        "companies": ["amazon", "meta", "microsoft", "adobe"],
        "description": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
        "constraints": "The number of nodes in each linked list is in the range [1, 100].\n0 <= Node.val <= 9\nIt is guaranteed that the list represents a number that does not have leading zeros.",
        "hints": "Iterate both lists simultaneously, tracking carry.",
        "starter_code": {
            "python": "class Solution:\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n        pass",
            "javascript": "var addTwoNumbers = function(l1, l2) {\n    \n};",
            "java": "class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,4,3]\n[5,6,4]", "expected_output": "[7,0,8]", "is_sample": True},
            {"input": "[0]\n[0]", "expected_output": "[0]", "is_sample": True},
            {"input": "[9,9,9,9,9,9,9]\n[9,9,9,9]", "expected_output": "[8,9,9,9,0,0,0,1]", "is_sample": False},
        ],
    },
    {
        "title": "LRU Cache",
        "difficulty": "medium",
        "tags": ["hash-table", "linked-list", "design"],
        "companies": ["amazon", "google", "meta", "microsoft"],
        "description": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the `LRUCache` class:\n- `LRUCache(int capacity)` Initialize the LRU cache with positive size capacity.\n- `int get(int key)` Return the value of the key if the key exists, otherwise return -1.\n- `void put(int key, int value)` Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity, evict the least recently used key.\n\nThe functions get and put must each run in O(1) average time complexity.",
        "constraints": "1 <= capacity <= 3000\n0 <= key <= 10^4\n0 <= value <= 10^5\nAt most 2 * 10^5 calls will be made to get and put.",
        "hints": "Use a hash map combined with a doubly-linked list.",
        "starter_code": {
            "python": "class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n    def get(self, key: int) -> int:\n        pass\n    def put(self, key: int, value: int) -> None:\n        pass",
            "javascript": "var LRUCache = function(capacity) {\n    \n};\nLRUCache.prototype.get = function(key) {\n    \n};\nLRUCache.prototype.put = function(key, value) {\n    \n};",
            "java": "class LRUCache {\n    public LRUCache(int capacity) {\n        \n    }\n    public int get(int key) {\n        \n    }\n    public void put(int key, int value) {\n        \n    }\n}",
            "cpp": "class LRUCache {\npublic:\n    LRUCache(int capacity) {\n        \n    }\n    int get(int key) {\n        \n    }\n    void put(int key, int value) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"LRUCache\",\"put\",\"put\",\"get\",\"put\",\"get\",\"put\",\"get\",\"get\",\"get\"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]", "expected_output": "[null,null,null,1,null,-1,null,-1,3,4]", "is_sample": True},
        ],
    },
    {
        "title": "Palindrome Linked List",
        "difficulty": "easy",
        "tags": ["linked-list", "two-pointers", "recursion"],
        "companies": ["meta", "amazon", "snap"],
        "description": "Given the `head` of a singly linked list, return `true` if it is a palindrome or `false` otherwise.",
        "constraints": "The number of nodes in the list is in the range [1, 10^5].\n0 <= Node.val <= 9",
        "hints": "Find the middle with slow/fast pointers, reverse the second half, then compare.",
        "starter_code": {
            "python": "class Solution:\n    def isPalindrome(self, head: Optional[ListNode]) -> bool:\n        pass",
            "javascript": "var isPalindrome = function(head) {\n    \n};",
            "java": "class Solution {\n    public boolean isPalindrome(ListNode head) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isPalindrome(ListNode* head) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,2,1]", "expected_output": "true", "is_sample": True},
            {"input": "[1,2]", "expected_output": "false", "is_sample": True},
        ],
    },
    {
        "title": "Swap Nodes in Pairs",
        "difficulty": "medium",
        "tags": ["linked-list", "recursion"],
        "companies": ["uber", "amazon", "microsoft"],
        "description": "Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)",
        "constraints": "The number of nodes in the list is in the range [0, 100].\n0 <= Node.val <= 100",
        "hints": "Use a dummy node and swap pairs iteratively or recursively.",
        "starter_code": {
            "python": "class Solution:\n    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        pass",
            "javascript": "var swapPairs = function(head) {\n    \n};",
            "java": "class Solution {\n    public ListNode swapPairs(ListNode head) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* swapPairs(ListNode* head) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4]", "expected_output": "[2,1,4,3]", "is_sample": True},
            {"input": "[]", "expected_output": "[]", "is_sample": True},
            {"input": "[1]", "expected_output": "[1]", "is_sample": False},
        ],
    },
    {
        "title": "Middle of the Linked List",
        "difficulty": "easy",
        "tags": ["linked-list", "two-pointers"],
        "companies": ["google", "apple", "spotify"],
        "description": "Given the `head` of a singly linked list, return the middle node of the linked list.\n\nIf there are two middle nodes, return the second middle node.",
        "constraints": "The number of nodes in the list is in the range [1, 100].\n1 <= Node.val <= 100",
        "hints": "Use slow and fast pointers.",
        "starter_code": {
            "python": "class Solution:\n    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        pass",
            "javascript": "var middleNode = function(head) {\n    \n};",
            "java": "class Solution {\n    public ListNode middleNode(ListNode head) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* middleNode(ListNode* head) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4,5]", "expected_output": "[3,4,5]", "is_sample": True},
            {"input": "[1,2,3,4,5,6]", "expected_output": "[4,5,6]", "is_sample": True},
        ],
    },
    {
        "title": "Sort List",
        "difficulty": "medium",
        "tags": ["linked-list", "two-pointers", "sorting", "divide-and-conquer"],
        "companies": ["meta", "microsoft", "bytedance"],
        "description": "Given the `head` of a linked list, return the list after sorting it in ascending order.",
        "constraints": "The number of nodes in the list is in the range [0, 5 * 10^4].\n-10^5 <= Node.val <= 10^5",
        "hints": "Use merge sort: split with slow/fast pointers, recursively sort, then merge.",
        "starter_code": {
            "python": "class Solution:\n    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        pass",
            "javascript": "var sortList = function(head) {\n    \n};",
            "java": "class Solution {\n    public ListNode sortList(ListNode head) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* sortList(ListNode* head) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[4,2,1,3]", "expected_output": "[1,2,3,4]", "is_sample": True},
            {"input": "[-1,5,3,4,0]", "expected_output": "[-1,0,3,4,5]", "is_sample": True},
            {"input": "[]", "expected_output": "[]", "is_sample": False},
        ],
    },
    # ─── Trees ─────────────────────────────────────────────────────────────
    {
        "title": "Balanced Binary Tree",
        "difficulty": "easy",
        "tags": ["binary-tree", "tree", "recursion"],
        "companies": ["amazon", "google", "coinbase"],
        "description": "Given a binary tree, determine if it is height-balanced.\n\nA height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.",
        "constraints": "The number of nodes in the tree is in the range [0, 5000].\n-10^4 <= Node.val <= 10^4",
        "hints": "Recursively compute height; return -1 if unbalanced.",
        "starter_code": {
            "python": "class Solution:\n    def isBalanced(self, root: Optional[TreeNode]) -> bool:\n        pass",
            "javascript": "var isBalanced = function(root) {\n    \n};",
            "java": "class Solution {\n    public boolean isBalanced(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isBalanced(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,9,20,null,null,15,7]", "expected_output": "true", "is_sample": True},
            {"input": "[1,2,2,3,3,null,null,4,4]", "expected_output": "false", "is_sample": True},
            {"input": "[]", "expected_output": "true", "is_sample": False},
        ],
    },
    {
        "title": "Diameter of Binary Tree",
        "difficulty": "easy",
        "tags": ["binary-tree", "tree", "recursion"],
        "companies": ["meta", "google", "amazon"],
        "description": "Given the `root` of a binary tree, return the length of the diameter of the tree.\n\nThe diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.\n\nThe length of a path between two nodes is represented by the number of edges between them.",
        "constraints": "The number of nodes in the tree is in the range [1, 10^4].\n-100 <= Node.val <= 100",
        "hints": "The diameter through any node is left_height + right_height.",
        "starter_code": {
            "python": "class Solution:\n    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:\n        pass",
            "javascript": "var diameterOfBinaryTree = function(root) {\n    \n};",
            "java": "class Solution {\n    public int diameterOfBinaryTree(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int diameterOfBinaryTree(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4,5]", "expected_output": "3", "is_sample": True},
            {"input": "[1,2]", "expected_output": "1", "is_sample": True},
        ],
    },
    {
        "title": "Binary Tree Right Side View",
        "difficulty": "medium",
        "tags": ["binary-tree", "tree", "queue"],
        "companies": ["meta", "amazon", "bytedance"],
        "description": "Given the `root` of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.",
        "constraints": "The number of nodes in the tree is in the range [0, 100].\n-100 <= Node.val <= 100",
        "hints": "Use BFS level order traversal, take the last node of each level.",
        "starter_code": {
            "python": "class Solution:\n    def rightSideView(self, root: Optional[TreeNode]) -> list[int]:\n        pass",
            "javascript": "var rightSideView = function(root) {\n    \n};",
            "java": "class Solution {\n    public List<Integer> rightSideView(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> rightSideView(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,null,5,null,4]", "expected_output": "[1,3,4]", "is_sample": True},
            {"input": "[1,null,3]", "expected_output": "[1,3]", "is_sample": True},
            {"input": "[]", "expected_output": "[]", "is_sample": False},
        ],
    },
    {
        "title": "Symmetric Tree",
        "difficulty": "easy",
        "tags": ["binary-tree", "tree", "recursion"],
        "companies": ["microsoft", "linkedin", "nvidia"],
        "description": "Given the `root` of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).",
        "constraints": "The number of nodes in the tree is in the range [1, 1000].\n-100 <= Node.val <= 100",
        "hints": "Compare left subtree with the mirror of right subtree recursively.",
        "starter_code": {
            "python": "class Solution:\n    def isSymmetric(self, root: Optional[TreeNode]) -> bool:\n        pass",
            "javascript": "var isSymmetric = function(root) {\n    \n};",
            "java": "class Solution {\n    public boolean isSymmetric(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isSymmetric(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,2,3,4,4,3]", "expected_output": "true", "is_sample": True},
            {"input": "[1,2,2,null,3,null,3]", "expected_output": "false", "is_sample": True},
        ],
    },
    {
        "title": "Path Sum",
        "difficulty": "easy",
        "tags": ["binary-tree", "tree", "recursion"],
        "companies": ["amazon", "oracle", "adobe"],
        "description": "Given the `root` of a binary tree and an integer `targetSum`, return `true` if the tree has a root-to-leaf path such that adding up all the values along the path equals `targetSum`.",
        "constraints": "The number of nodes in the tree is in the range [0, 5000].\n-1000 <= Node.val <= 1000\n-1000 <= targetSum <= 1000",
        "hints": "Subtract node values as you go, check if leaf value equals remaining sum.",
        "starter_code": {
            "python": "class Solution:\n    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:\n        pass",
            "javascript": "var hasPathSum = function(root, targetSum) {\n    \n};",
            "java": "class Solution {\n    public boolean hasPathSum(TreeNode root, int targetSum) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool hasPathSum(TreeNode* root, int targetSum) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[5,4,8,11,null,13,4,7,2,null,null,null,1]\n22", "expected_output": "true", "is_sample": True},
            {"input": "[1,2,3]\n5", "expected_output": "false", "is_sample": True},
            {"input": "[]\n0", "expected_output": "false", "is_sample": False},
        ],
    },
    # ─── Heap / Priority Queue ─────────────────────────────────────────────
    {
        "title": "Kth Largest Element in an Array",
        "difficulty": "medium",
        "tags": ["array", "heap", "sorting", "divide-and-conquer"],
        "companies": ["meta", "amazon", "google", "linkedin"],
        "description": "Given an integer array `nums` and an integer `k`, return the kth largest element in the array.\n\nNote that it is the kth largest element in the sorted order, not the kth distinct element.",
        "constraints": "1 <= k <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
        "hints": "Use a min-heap of size k, or quickselect for O(n) average.",
        "starter_code": {
            "python": "class Solution:\n    def findKthLargest(self, nums: list[int], k: int) -> int:\n        pass",
            "javascript": "var findKthLargest = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,2,1,5,6,4]\n2", "expected_output": "5", "is_sample": True},
            {"input": "[3,2,3,1,2,4,5,5,6]\n4", "expected_output": "4", "is_sample": True},
        ],
    },
    {
        "title": "Task Scheduler",
        "difficulty": "medium",
        "tags": ["array", "hash-table", "greedy", "heap", "sorting"],
        "companies": ["meta", "amazon", "uber", "pinterest"],
        "description": "Given a characters array `tasks`, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.\n\nHowever, there is a non-negative integer `n` that represents the cooldown period between two same tasks. There must be at least `n` units of time between any two same tasks.\n\nReturn the least number of units of times that the CPU will take to finish all the given tasks.",
        "constraints": "1 <= tasks.length <= 10^4\ntasks[i] is an upper-case English letter.\n0 <= n <= 100",
        "hints": "The answer depends on the most frequent task. Calculate idle slots.",
        "starter_code": {
            "python": "class Solution:\n    def leastInterval(self, tasks: list[str], n: int) -> int:\n        pass",
            "javascript": "var leastInterval = function(tasks, n) {\n    \n};",
            "java": "class Solution {\n    public int leastInterval(char[] tasks, int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int leastInterval(vector<char>& tasks, int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"]\n2", "expected_output": "8", "is_sample": True},
            {"input": "[\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"]\n0", "expected_output": "6", "is_sample": True},
            {"input": "[\"A\",\"A\",\"A\",\"A\",\"A\",\"A\",\"B\",\"C\",\"D\",\"E\",\"F\",\"G\"]\n2", "expected_output": "16", "is_sample": False},
        ],
    },
    {
        "title": "K Closest Points to Origin",
        "difficulty": "medium",
        "tags": ["array", "math", "heap", "sorting", "divide-and-conquer"],
        "companies": ["amazon", "meta", "uber", "lyft"],
        "description": "Given an array of `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane and an integer `k`, return the `k` closest points to the origin `(0, 0)`.\n\nThe distance between two points on the X-Y plane is the Euclidean distance (`sqrt(xi^2 + yi^2)`).\n\nYou may return the answer in any order.",
        "constraints": "1 <= k <= points.length <= 10^4\n-10^4 <= xi, yi <= 10^4",
        "hints": "Use a max-heap of size k based on distance.",
        "starter_code": {
            "python": "class Solution:\n    def kClosest(self, points: list[list[int]], k: int) -> list[list[int]]:\n        pass",
            "javascript": "var kClosest = function(points, k) {\n    \n};",
            "java": "class Solution {\n    public int[][] kClosest(int[][] points, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,3],[-2,2]]\n1", "expected_output": "[[-2,2]]", "is_sample": True},
            {"input": "[[3,3],[5,-1],[-2,4]]\n2", "expected_output": "[[3,3],[-2,4]]", "is_sample": True},
        ],
    },
    # ─── Backtracking ──────────────────────────────────────────────────────
    {
        "title": "Permutations",
        "difficulty": "medium",
        "tags": ["array", "backtracking"],
        "companies": ["microsoft", "amazon", "meta"],
        "description": "Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.",
        "constraints": "1 <= nums.length <= 6\n-10 <= nums[i] <= 10\nAll the integers of nums are unique.",
        "hints": "Use backtracking: at each position, try all unused elements.",
        "starter_code": {
            "python": "class Solution:\n    def permute(self, nums: list[int]) -> list[list[int]]:\n        pass",
            "javascript": "var permute = function(nums) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3]", "expected_output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]", "is_sample": True},
            {"input": "[0,1]", "expected_output": "[[0,1],[1,0]]", "is_sample": True},
            {"input": "[1]", "expected_output": "[[1]]", "is_sample": False},
        ],
    },
    {
        "title": "Subsets",
        "difficulty": "medium",
        "tags": ["array", "backtracking", "bit-manipulation"],
        "companies": ["amazon", "meta", "uber"],
        "description": "Given an integer array `nums` of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.",
        "constraints": "1 <= nums.length <= 10\n-10 <= nums[i] <= 10\nAll the numbers of nums are unique.",
        "hints": "For each element, choose to include or exclude it.",
        "starter_code": {
            "python": "class Solution:\n    def subsets(self, nums: list[int]) -> list[list[int]]:\n        pass",
            "javascript": "var subsets = function(nums) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3]", "expected_output": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]", "is_sample": True},
            {"input": "[0]", "expected_output": "[[],[0]]", "is_sample": True},
        ],
    },
    {
        "title": "Letter Combinations of a Phone Number",
        "difficulty": "medium",
        "tags": ["string", "hash-table", "backtracking"],
        "companies": ["google", "uber", "airbnb", "amazon"],
        "description": "Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.\n\nA mapping of digits to letters (just like on the telephone buttons) is given: 2=abc, 3=def, 4=ghi, 5=jkl, 6=mno, 7=pqrs, 8=tuv, 9=wxyz.",
        "constraints": "0 <= digits.length <= 4\ndigits[i] is a digit in the range ['2', '9'].",
        "hints": "Use backtracking: for each digit, try all corresponding letters.",
        "starter_code": {
            "python": "class Solution:\n    def letterCombinations(self, digits: str) -> list[str]:\n        pass",
            "javascript": "var letterCombinations = function(digits) {\n    \n};",
            "java": "class Solution {\n    public List<String> letterCombinations(String digits) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<string> letterCombinations(string digits) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "23", "expected_output": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]", "is_sample": True},
            {"input": "", "expected_output": "[]", "is_sample": True},
            {"input": "2", "expected_output": "[\"a\",\"b\",\"c\"]", "is_sample": False},
        ],
    },
    {
        "title": "Generate Parentheses",
        "difficulty": "medium",
        "tags": ["string", "backtracking", "dynamic-programming"],
        "companies": ["google", "amazon", "microsoft", "stripe"],
        "description": "Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
        "constraints": "1 <= n <= 8",
        "hints": "Use backtracking. Add '(' if open < n, add ')' if close < open.",
        "starter_code": {
            "python": "class Solution:\n    def generateParenthesis(self, n: int) -> list[str]:\n        pass",
            "javascript": "var generateParenthesis = function(n) {\n    \n};",
            "java": "class Solution {\n    public List<String> generateParenthesis(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<string> generateParenthesis(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "3", "expected_output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]", "is_sample": True},
            {"input": "1", "expected_output": "[\"()\"]", "is_sample": True},
        ],
    },
    {
        "title": "N-Queens",
        "difficulty": "hard",
        "tags": ["array", "backtracking"],
        "companies": ["google", "amazon", "palantir", "nvidia"],
        "description": "The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.\n\nGiven an integer `n`, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.\n\nEach solution contains a distinct board configuration of the n-queens' placement, where `Q` and `.` both indicate a queen and an empty space, respectively.",
        "constraints": "1 <= n <= 9",
        "hints": "Backtrack row by row. Track which columns and diagonals are occupied.",
        "starter_code": {
            "python": "class Solution:\n    def solveNQueens(self, n: int) -> list[list[str]]:\n        pass",
            "javascript": "var solveNQueens = function(n) {\n    \n};",
            "java": "class Solution {\n    public List<List<String>> solveNQueens(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "4", "expected_output": "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]", "is_sample": True},
            {"input": "1", "expected_output": "[[\"Q\"]]", "is_sample": True},
        ],
    },
    {
        "title": "Combination Sum II",
        "difficulty": "medium",
        "tags": ["array", "backtracking"],
        "companies": ["amazon", "meta", "snap", "coinbase"],
        "description": "Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`.\n\nEach number in `candidates` may only be used once in the combination.\n\nNote: The solution set must not contain duplicate combinations.",
        "constraints": "1 <= candidates.length <= 100\n1 <= candidates[i] <= 50\n1 <= target <= 30",
        "hints": "Sort first, skip duplicates at the same recursion level.",
        "starter_code": {
            "python": "class Solution:\n    def combinationSum2(self, candidates: list[int], target: int) -> list[list[int]]:\n        pass",
            "javascript": "var combinationSum2 = function(candidates, target) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> combinationSum2(int[] candidates, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[10,1,2,7,6,1,5]\n8", "expected_output": "[[1,1,6],[1,2,5],[1,7],[2,6]]", "is_sample": True},
            {"input": "[2,5,2,1,2]\n5", "expected_output": "[[1,2,2],[5]]", "is_sample": True},
        ],
    },
    # ─── Graphs ────────────────────────────────────────────────────────────
    {
        "title": "Course Schedule II",
        "difficulty": "medium",
        "tags": ["graph", "queue"],
        "companies": ["amazon", "meta", "doordash", "palantir"],
        "description": "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.\n\nReturn the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.",
        "constraints": "1 <= numCourses <= 2000\n0 <= prerequisites.length <= numCourses * (numCourses - 1)\nprerequisites[i].length == 2\nAll the pairs [ai, bi] are distinct.",
        "hints": "Use topological sort (Kahn's algorithm with BFS).",
        "starter_code": {
            "python": "class Solution:\n    def findOrder(self, numCourses: int, prerequisites: list[list[int]]) -> list[int]:\n        pass",
            "javascript": "var findOrder = function(numCourses, prerequisites) {\n    \n};",
            "java": "class Solution {\n    public int[] findOrder(int numCourses, int[][] prerequisites) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "2\n[[1,0]]", "expected_output": "[0,1]", "is_sample": True},
            {"input": "4\n[[1,0],[2,0],[3,1],[3,2]]", "expected_output": "[0,1,2,3]", "is_sample": True},
            {"input": "1\n[]", "expected_output": "[0]", "is_sample": False},
        ],
    },
    {
        "title": "Rotting Oranges",
        "difficulty": "medium",
        "tags": ["array", "matrix", "graph", "queue"],
        "companies": ["amazon", "google", "oracle"],
        "description": "You are given an `m x n` grid where each cell can have one of three values:\n- `0` representing an empty cell,\n- `1` representing a fresh orange, or\n- `2` representing a rotten orange.\n\nEvery minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.\n\nReturn the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return `-1`.",
        "constraints": "m == grid.length\nn == grid[i].length\n1 <= m, n <= 10\ngrid[i][j] is 0, 1, or 2.",
        "hints": "Use multi-source BFS starting from all rotten oranges simultaneously.",
        "starter_code": {
            "python": "class Solution:\n    def orangesRotting(self, grid: list[list[int]]) -> int:\n        pass",
            "javascript": "var orangesRotting = function(grid) {\n    \n};",
            "java": "class Solution {\n    public int orangesRotting(int[][] grid) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int orangesRotting(vector<vector<int>>& grid) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[2,1,1],[1,1,0],[0,1,1]]", "expected_output": "4", "is_sample": True},
            {"input": "[[2,1,1],[0,1,1],[1,0,1]]", "expected_output": "-1", "is_sample": True},
            {"input": "[[0,2]]", "expected_output": "0", "is_sample": False},
        ],
    },
    {
        "title": "Surrounded Regions",
        "difficulty": "medium",
        "tags": ["array", "matrix", "graph"],
        "companies": ["google", "uber", "pinterest"],
        "description": "Given an `m x n` matrix `board` containing `'X'` and `'O'`, capture all regions that are 4-directionally surrounded by `'X'`.\n\nA region is captured by flipping all `'O'`s into `'X'`s in that surrounded region.",
        "constraints": "m == board.length\nn == board[i].length\n1 <= m, n <= 200\nboard[i][j] is 'X' or 'O'.",
        "hints": "DFS/BFS from border 'O's to mark them safe, then flip remaining 'O's.",
        "starter_code": {
            "python": "class Solution:\n    def solve(self, board: list[list[str]]) -> None:\n        pass",
            "javascript": "var solve = function(board) {\n    \n};",
            "java": "class Solution {\n    public void solve(char[][] board) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void solve(vector<vector<char>>& board) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]", "expected_output": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]", "is_sample": True},
            {"input": "[[\"X\"]]", "expected_output": "[[\"X\"]]", "is_sample": True},
        ],
    },
    {
        "title": "Word Ladder",
        "difficulty": "hard",
        "tags": ["string", "graph", "hash-table"],
        "companies": ["amazon", "meta", "lyft", "snap"],
        "description": "A transformation sequence from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:\n- Every adjacent pair of words differs by a single letter.\n- Every `si` for `1 <= i <= k` is in `wordList`. Note that `beginWord` does not need to be in `wordList`.\n- `sk == endWord`\n\nGiven two words, `beginWord` and `endWord`, and a dictionary `wordList`, return the number of words in the shortest transformation sequence from `beginWord` to `endWord`, or `0` if no such sequence exists.",
        "constraints": "1 <= beginWord.length <= 10\nendWord.length == beginWord.length\n1 <= wordList.length <= 5000\nwordList[i].length == beginWord.length",
        "hints": "Use BFS. Build adjacency via wildcard patterns (e.g., h*t matches hot, hat).",
        "starter_code": {
            "python": "class Solution:\n    def ladderLength(self, beginWord: str, endWord: str, wordList: list[str]) -> int:\n        pass",
            "javascript": "var ladderLength = function(beginWord, endWord, wordList) {\n    \n};",
            "java": "class Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "hit\ncog\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]", "expected_output": "5", "is_sample": True},
            {"input": "hit\ncog\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]", "expected_output": "0", "is_sample": True},
        ],
    },
    {
        "title": "Redundant Connection",
        "difficulty": "medium",
        "tags": ["graph", "union-find"],
        "companies": ["google", "amazon", "stripe"],
        "description": "In this problem, a tree is an undirected graph that is connected and has no cycles.\n\nYou are given a graph that started as a tree with `n` nodes labeled from `1` to `n`, with one additional edge added. The added edge has two different vertices chosen from `1` to `n`, and was not an edge that already existed.\n\nReturn an edge that can be removed so that the resulting graph is a tree of `n` nodes. If there are multiple answers, return the answer that occurs last in the input.",
        "constraints": "n == edges.length\n3 <= n <= 1000\nedges[i].length == 2\n1 <= ai < bi <= edges.length\nThere are no repeated edges.",
        "hints": "Use Union-Find. The first edge that connects two already-connected nodes is redundant.",
        "starter_code": {
            "python": "class Solution:\n    def findRedundantConnection(self, edges: list[list[int]]) -> list[int]:\n        pass",
            "javascript": "var findRedundantConnection = function(edges) {\n    \n};",
            "java": "class Solution {\n    public int[] findRedundantConnection(int[][] edges) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> findRedundantConnection(vector<vector<int>>& edges) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2],[1,3],[2,3]]", "expected_output": "[2,3]", "is_sample": True},
            {"input": "[[1,2],[2,3],[3,4],[1,4],[1,5]]", "expected_output": "[1,4]", "is_sample": True},
        ],
    },
    # ─── Dynamic Programming ──────────────────────────────────────────────
    {
        "title": "Edit Distance",
        "difficulty": "hard",
        "tags": ["string", "dynamic-programming"],
        "companies": ["google", "amazon", "palantir", "shopify"],
        "description": "Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.\n\nYou have the following three operations permitted on a word: Insert a character, Delete a character, Replace a character.",
        "constraints": "0 <= word1.length, word2.length <= 500\nword1 and word2 consist of lowercase English letters.",
        "hints": "Use 2D DP where dp[i][j] is min ops to convert word1[:i] to word2[:j].",
        "starter_code": {
            "python": "class Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        pass",
            "javascript": "var minDistance = function(word1, word2) {\n    \n};",
            "java": "class Solution {\n    public int minDistance(String word1, String word2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "horse\nros", "expected_output": "3", "is_sample": True},
            {"input": "intention\nexecution", "expected_output": "5", "is_sample": True},
        ],
    },
    {
        "title": "Best Time to Buy and Sell Stock II",
        "difficulty": "medium",
        "tags": ["array", "dynamic-programming", "greedy"],
        "companies": ["amazon", "meta", "microsoft"],
        "description": "You are given an integer array `prices` where `prices[i]` is the price of a given stock on the ith day.\n\nOn each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.\n\nFind and return the maximum profit you can achieve.",
        "constraints": "1 <= prices.length <= 3 * 10^4\n0 <= prices[i] <= 10^4",
        "hints": "Add up all positive price differences between consecutive days.",
        "starter_code": {
            "python": "class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        pass",
            "javascript": "var maxProfit = function(prices) {\n    \n};",
            "java": "class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[7,1,5,3,6,4]", "expected_output": "7", "is_sample": True},
            {"input": "[1,2,3,4,5]", "expected_output": "4", "is_sample": True},
            {"input": "[7,6,4,3,1]", "expected_output": "0", "is_sample": False},
        ],
    },
    {
        "title": "Minimum Path Sum",
        "difficulty": "medium",
        "tags": ["array", "dynamic-programming", "matrix"],
        "companies": ["google", "amazon", "apple", "nvidia"],
        "description": "Given a `m x n` `grid` filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.\n\nNote: You can only move either down or right at any point in time.",
        "constraints": "m == grid.length\nn == grid[i].length\n1 <= m, n <= 200\n0 <= grid[i][j] <= 200",
        "hints": "dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]).",
        "starter_code": {
            "python": "class Solution:\n    def minPathSum(self, grid: list[list[int]]) -> int:\n        pass",
            "javascript": "var minPathSum = function(grid) {\n    \n};",
            "java": "class Solution {\n    public int minPathSum(int[][] grid) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minPathSum(vector<vector<int>>& grid) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,3,1],[1,5,1],[4,2,1]]", "expected_output": "7", "is_sample": True},
            {"input": "[[1,2,3],[4,5,6]]", "expected_output": "12", "is_sample": True},
        ],
    },
    {
        "title": "Partition Equal Subset Sum",
        "difficulty": "medium",
        "tags": ["array", "dynamic-programming"],
        "companies": ["meta", "amazon", "uber", "spotify"],
        "description": "Given an integer array `nums`, return `true` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or `false` otherwise.",
        "constraints": "1 <= nums.length <= 200\n1 <= nums[i] <= 100",
        "hints": "This reduces to 0/1 knapsack: can we find a subset summing to total/2?",
        "starter_code": {
            "python": "class Solution:\n    def canPartition(self, nums: list[int]) -> bool:\n        pass",
            "javascript": "var canPartition = function(nums) {\n    \n};",
            "java": "class Solution {\n    public boolean canPartition(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool canPartition(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,5,11,5]", "expected_output": "true", "is_sample": True},
            {"input": "[1,2,3,5]", "expected_output": "false", "is_sample": True},
        ],
    },
    {
        "title": "Target Sum",
        "difficulty": "medium",
        "tags": ["array", "dynamic-programming", "backtracking"],
        "companies": ["meta", "google", "bytedance"],
        "description": "You are given an integer array `nums` and an integer `target`.\n\nYou want to build an expression out of nums by adding one of the symbols `+` and `-` before each integer in nums and then concatenate all the integers.\n\nReturn the number of different expressions that you can build, which evaluates to `target`.",
        "constraints": "1 <= nums.length <= 20\n0 <= nums[i] <= 1000\n0 <= sum(nums[i]) <= 1000\n-1000 <= target <= 1000",
        "hints": "Convert to subset sum problem: find subset with sum = (target + total) / 2.",
        "starter_code": {
            "python": "class Solution:\n    def findTargetSumWays(self, nums: list[int], target: int) -> int:\n        pass",
            "javascript": "var findTargetSumWays = function(nums, target) {\n    \n};",
            "java": "class Solution {\n    public int findTargetSumWays(int[] nums, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findTargetSumWays(vector<int>& nums, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,1,1,1,1]\n3", "expected_output": "5", "is_sample": True},
            {"input": "[1]\n1", "expected_output": "1", "is_sample": True},
        ],
    },
    {
        "title": "Fibonacci Number",
        "difficulty": "easy",
        "tags": ["math", "dynamic-programming", "recursion"],
        "companies": ["amazon", "apple", "adobe"],
        "description": "The Fibonacci numbers, commonly denoted `F(n)` form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from `0` and `1`.\n\nGiven `n`, calculate `F(n)`.",
        "constraints": "0 <= n <= 30",
        "hints": "Use iterative DP or memoization.",
        "starter_code": {
            "python": "class Solution:\n    def fib(self, n: int) -> int:\n        pass",
            "javascript": "var fib = function(n) {\n    \n};",
            "java": "class Solution {\n    public int fib(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int fib(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "2", "expected_output": "1", "is_sample": True},
            {"input": "3", "expected_output": "2", "is_sample": True},
            {"input": "4", "expected_output": "3", "is_sample": False},
        ],
    },
    {
        "title": "Min Cost Climbing Stairs",
        "difficulty": "easy",
        "tags": ["array", "dynamic-programming"],
        "companies": ["amazon", "microsoft", "dropbox"],
        "description": "You are given an integer array `cost` where `cost[i]` is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps.\n\nYou can either start from the step with index `0`, or the step with index `1`.\n\nReturn the minimum cost to reach the top of the floor.",
        "constraints": "2 <= cost.length <= 1000\n0 <= cost[i] <= 999",
        "hints": "dp[i] = cost[i] + min(dp[i-1], dp[i-2]).",
        "starter_code": {
            "python": "class Solution:\n    def minCostClimbingStairs(self, cost: list[int]) -> int:\n        pass",
            "javascript": "var minCostClimbingStairs = function(cost) {\n    \n};",
            "java": "class Solution {\n    public int minCostClimbingStairs(int[] cost) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minCostClimbingStairs(vector<int>& cost) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[10,15,20]", "expected_output": "15", "is_sample": True},
            {"input": "[1,100,1,1,1,100,1,1,100,1]", "expected_output": "6", "is_sample": True},
        ],
    },
    {
        "title": "Perfect Squares",
        "difficulty": "medium",
        "tags": ["math", "dynamic-programming"],
        "companies": ["google", "microsoft", "shopify"],
        "description": "Given an integer `n`, return the least number of perfect square numbers that sum to `n`.\n\nA perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself.",
        "constraints": "1 <= n <= 10^4",
        "hints": "DP: dp[i] = min(dp[i - j*j] + 1) for all valid j.",
        "starter_code": {
            "python": "class Solution:\n    def numSquares(self, n: int) -> int:\n        pass",
            "javascript": "var numSquares = function(n) {\n    \n};",
            "java": "class Solution {\n    public int numSquares(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int numSquares(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "12", "expected_output": "3", "is_sample": True},
            {"input": "13", "expected_output": "2", "is_sample": True},
        ],
    },
    # ─── Greedy ────────────────────────────────────────────────────────────
    {
        "title": "Jump Game II",
        "difficulty": "medium",
        "tags": ["array", "dynamic-programming", "greedy"],
        "companies": ["amazon", "google", "uber", "doordash"],
        "description": "You are given a 0-indexed array of integers `nums` of length `n`. You are initially positioned at `nums[0]`.\n\nEach element `nums[i]` represents the maximum length of a forward jump from index `i`.\n\nReturn the minimum number of jumps to reach `nums[n - 1]`.",
        "constraints": "1 <= nums.length <= 10^4\n0 <= nums[i] <= 1000\nIt's guaranteed that you can reach nums[n - 1].",
        "hints": "Greedy BFS: track the farthest reachable point in each jump.",
        "starter_code": {
            "python": "class Solution:\n    def jump(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var jump = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int jump(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int jump(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,3,1,1,4]", "expected_output": "2", "is_sample": True},
            {"input": "[2,3,0,1,4]", "expected_output": "2", "is_sample": True},
        ],
    },
    {
        "title": "Gas Station",
        "difficulty": "medium",
        "tags": ["array", "greedy"],
        "companies": ["amazon", "google", "microsoft", "coinbase"],
        "description": "There are `n` gas stations along a circular route, where the amount of gas at the ith station is `gas[i]`.\n\nYou have a car with an unlimited gas tank and it costs `cost[i]` of gas to travel from the ith station to its next `(i + 1)th` station. You begin the journey with an empty tank at one of the gas stations.\n\nGiven two integer arrays `gas` and `cost`, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return `-1`.",
        "constraints": "n == gas.length == cost.length\n1 <= n <= 10^5\n0 <= gas[i], cost[i] <= 10^4",
        "hints": "If total gas >= total cost, a solution exists. Track running surplus to find start.",
        "starter_code": {
            "python": "class Solution:\n    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:\n        pass",
            "javascript": "var canCompleteCircuit = function(gas, cost) {\n    \n};",
            "java": "class Solution {\n    public int canCompleteCircuit(int[] gas, int[] cost) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4,5]\n[3,4,5,1,2]", "expected_output": "3", "is_sample": True},
            {"input": "[2,3,4]\n[3,4,3]", "expected_output": "-1", "is_sample": True},
        ],
    },
    {
        "title": "Partition Labels",
        "difficulty": "medium",
        "tags": ["string", "hash-table", "two-pointers", "greedy"],
        "companies": ["amazon", "meta", "spotify", "shopify"],
        "description": "You are given a string `s`. We want to partition the string into as many parts as possible so that each letter appears in at most one part.\n\nReturn a list of integers representing the size of these parts.",
        "constraints": "1 <= s.length <= 500\ns consists of lowercase English letters.",
        "hints": "Record last occurrence of each char. Extend partition end until current index meets it.",
        "starter_code": {
            "python": "class Solution:\n    def partitionLabels(self, s: str) -> list[int]:\n        pass",
            "javascript": "var partitionLabels = function(s) {\n    \n};",
            "java": "class Solution {\n    public List<Integer> partitionLabels(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> partitionLabels(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "ababcbacadefegdehijhklij", "expected_output": "[9,7,8]", "is_sample": True},
            {"input": "eccbbbbdec", "expected_output": "[10]", "is_sample": True},
        ],
    },
    {
        "title": "Valid Parenthesis String",
        "difficulty": "medium",
        "tags": ["string", "dynamic-programming", "greedy", "stack"],
        "companies": ["amazon", "oracle", "airbnb"],
        "description": "Given a string `s` containing only three types of characters: `(`, `)` and `*`, return `true` if `s` is valid.\n\nThe `*` could be treated as `(`, `)`, or an empty string.",
        "constraints": "1 <= s.length <= 100\ns[i] is '(', ')' or '*'.",
        "hints": "Track min and max possible open count.",
        "starter_code": {
            "python": "class Solution:\n    def checkValidString(self, s: str) -> bool:\n        pass",
            "javascript": "var checkValidString = function(s) {\n    \n};",
            "java": "class Solution {\n    public boolean checkValidString(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool checkValidString(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "()", "expected_output": "true", "is_sample": True},
            {"input": "(*)", "expected_output": "true", "is_sample": True},
            {"input": "(*()", "expected_output": "true", "is_sample": False},
        ],
    },
    {
        "title": "Lemonade Change",
        "difficulty": "easy",
        "tags": ["array", "greedy"],
        "companies": ["apple", "amazon", "lyft"],
        "description": "At a lemonade stand, each lemonade costs `$5`. Customers are standing in a queue to buy from you and order one at a time. Each customer will only buy one lemonade and pay with either a `$5`, `$10`, or `$20` bill.\n\nYou must provide the correct change to each customer so that the net transaction is that the customer pays `$5`.\n\nReturn `true` if you can provide every customer with the correct change, or `false` otherwise.",
        "constraints": "1 <= bills.length <= 10^5\nbills[i] is either 5, 10, or 20.",
        "hints": "Track counts of $5 and $10 bills. Greedily give larger bills as change.",
        "starter_code": {
            "python": "class Solution:\n    def lemonadeChange(self, bills: list[int]) -> bool:\n        pass",
            "javascript": "var lemonadeChange = function(bills) {\n    \n};",
            "java": "class Solution {\n    public boolean lemonadeChange(int[] bills) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool lemonadeChange(vector<int>& bills) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[5,5,5,10,20]", "expected_output": "true", "is_sample": True},
            {"input": "[5,5,10,10,20]", "expected_output": "false", "is_sample": True},
        ],
    },
    # ─── Math ──────────────────────────────────────────────────────────────
    {
        "title": "Happy Number",
        "difficulty": "easy",
        "tags": ["hash-table", "math", "two-pointers"],
        "companies": ["apple", "uber", "airbnb"],
        "description": "Write an algorithm to determine if a number `n` is happy.\n\nA happy number is a number defined by the following process:\n- Starting with any positive integer, replace the number by the sum of the squares of its digits.\n- Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.\n\nReturn `true` if `n` is a happy number, and `false` if not.",
        "constraints": "1 <= n <= 2^31 - 1",
        "hints": "Use a set to detect cycles, or use Floyd's cycle detection.",
        "starter_code": {
            "python": "class Solution:\n    def isHappy(self, n: int) -> bool:\n        pass",
            "javascript": "var isHappy = function(n) {\n    \n};",
            "java": "class Solution {\n    public boolean isHappy(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isHappy(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "19", "expected_output": "true", "is_sample": True},
            {"input": "2", "expected_output": "false", "is_sample": True},
        ],
    },
    {
        "title": "Pow(x, n)",
        "difficulty": "medium",
        "tags": ["math", "recursion"],
        "companies": ["meta", "google", "linkedin"],
        "description": "Implement `pow(x, n)`, which calculates `x` raised to the power `n` (i.e., `x^n`).",
        "constraints": "-100.0 < x < 100.0\n-2^31 <= n <= 2^31 - 1\nn is an integer.\nEither x is not zero or n > 0.\n-10^4 <= x^n <= 10^4",
        "hints": "Use fast exponentiation: x^n = (x^(n/2))^2.",
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
    {
        "title": "Reverse Integer",
        "difficulty": "medium",
        "tags": ["math"],
        "companies": ["amazon", "apple", "oracle"],
        "description": "Given a signed 32-bit integer `x`, return `x` with its digits reversed. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-2^31, 2^31 - 1]`, then return `0`.\n\nAssume the environment does not allow you to store 64-bit integers.",
        "constraints": "-2^31 <= x <= 2^31 - 1",
        "hints": "Build the reversed number digit by digit, checking overflow before each step.",
        "starter_code": {
            "python": "class Solution:\n    def reverse(self, x: int) -> int:\n        pass",
            "javascript": "var reverse = function(x) {\n    \n};",
            "java": "class Solution {\n    public int reverse(int x) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int reverse(int x) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "123", "expected_output": "321", "is_sample": True},
            {"input": "-123", "expected_output": "-321", "is_sample": True},
            {"input": "120", "expected_output": "21", "is_sample": False},
        ],
    },
    {
        "title": "Palindrome Number",
        "difficulty": "easy",
        "tags": ["math"],
        "companies": ["microsoft", "adobe", "shopify"],
        "description": "Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.\n\nAn integer is a palindrome when it reads the same forward and backward.",
        "constraints": "-2^31 <= x <= 2^31 - 1",
        "hints": "Reverse half the number and compare.",
        "starter_code": {
            "python": "class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        pass",
            "javascript": "var isPalindrome = function(x) {\n    \n};",
            "java": "class Solution {\n    public boolean isPalindrome(int x) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isPalindrome(int x) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "121", "expected_output": "true", "is_sample": True},
            {"input": "-121", "expected_output": "false", "is_sample": True},
            {"input": "10", "expected_output": "false", "is_sample": False},
        ],
    },
    # ─── Bit Manipulation ──────────────────────────────────────────────────
    {
        "title": "Power of Two",
        "difficulty": "easy",
        "tags": ["math", "bit-manipulation", "recursion"],
        "companies": ["google", "apple", "dropbox"],
        "description": "Given an integer `n`, return `true` if it is a power of two. Otherwise, return `false`.\n\nAn integer `n` is a power of two, if there exists an integer `x` such that `n == 2^x`.",
        "constraints": "-2^31 <= n <= 2^31 - 1",
        "hints": "A power of two has exactly one bit set: n > 0 and (n & (n-1)) == 0.",
        "starter_code": {
            "python": "class Solution:\n    def isPowerOfTwo(self, n: int) -> bool:\n        pass",
            "javascript": "var isPowerOfTwo = function(n) {\n    \n};",
            "java": "class Solution {\n    public boolean isPowerOfTwo(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isPowerOfTwo(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "1", "expected_output": "true", "is_sample": True},
            {"input": "16", "expected_output": "true", "is_sample": True},
            {"input": "3", "expected_output": "false", "is_sample": False},
        ],
    },
    {
        "title": "Hamming Distance",
        "difficulty": "easy",
        "tags": ["bit-manipulation"],
        "companies": ["meta", "adobe", "nvidia"],
        "description": "The Hamming distance between two integers is the number of positions at which the corresponding bits are different.\n\nGiven two integers `x` and `y`, return the Hamming distance between them.",
        "constraints": "0 <= x, y <= 2^31 - 1",
        "hints": "XOR x and y, then count set bits.",
        "starter_code": {
            "python": "class Solution:\n    def hammingDistance(self, x: int, y: int) -> int:\n        pass",
            "javascript": "var hammingDistance = function(x, y) {\n    \n};",
            "java": "class Solution {\n    public int hammingDistance(int x, int y) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int hammingDistance(int x, int y) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "1\n4", "expected_output": "2", "is_sample": True},
            {"input": "3\n1", "expected_output": "1", "is_sample": True},
        ],
    },
    # ─── Intervals ─────────────────────────────────────────────────────────
    {
        "title": "Meeting Rooms",
        "difficulty": "easy",
        "tags": ["array", "sorting", "intervals"],
        "companies": ["meta", "google", "amazon"],
        "description": "Given an array of meeting time intervals where `intervals[i] = [starti, endi]`, determine if a person could attend all meetings.\n\nReturn `true` if a person can attend all meetings without overlap.",
        "constraints": "0 <= intervals.length <= 10^4\nintervals[i].length == 2\n0 <= starti < endi <= 10^6",
        "hints": "Sort by start time and check for overlaps.",
        "starter_code": {
            "python": "class Solution:\n    def canAttendMeetings(self, intervals: list[list[int]]) -> bool:\n        pass",
            "javascript": "var canAttendMeetings = function(intervals) {\n    \n};",
            "java": "class Solution {\n    public boolean canAttendMeetings(int[][] intervals) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool canAttendMeetings(vector<vector<int>>& intervals) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[0,30],[5,10],[15,20]]", "expected_output": "false", "is_sample": True},
            {"input": "[[7,10],[2,4]]", "expected_output": "true", "is_sample": True},
        ],
    },
    {
        "title": "Meeting Rooms II",
        "difficulty": "medium",
        "tags": ["array", "sorting", "heap", "intervals"],
        "companies": ["meta", "google", "amazon", "uber"],
        "description": "Given an array of meeting time intervals `intervals` where `intervals[i] = [starti, endi]`, return the minimum number of conference rooms required.",
        "constraints": "1 <= intervals.length <= 10^4\n0 <= starti < endi <= 10^6",
        "hints": "Sort start and end times separately, use two pointers to count concurrent meetings.",
        "starter_code": {
            "python": "class Solution:\n    def minMeetingRooms(self, intervals: list[list[int]]) -> int:\n        pass",
            "javascript": "var minMeetingRooms = function(intervals) {\n    \n};",
            "java": "class Solution {\n    public int minMeetingRooms(int[][] intervals) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minMeetingRooms(vector<vector<int>>& intervals) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[0,30],[5,10],[15,20]]", "expected_output": "2", "is_sample": True},
            {"input": "[[7,10],[2,4]]", "expected_output": "1", "is_sample": True},
        ],
    },
    # ─── Design ────────────────────────────────────────────────────────────
    {
        "title": "Implement Queue using Stacks",
        "difficulty": "easy",
        "tags": ["stack", "design", "queue"],
        "companies": ["microsoft", "amazon", "apple", "spotify"],
        "description": "Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).",
        "constraints": "1 <= x <= 9\nAt most 100 calls will be made to push, pop, peek, and empty.\nAll the calls to pop and peek are valid.",
        "hints": "Use two stacks: one for input, one for output. Transfer when output is empty.",
        "starter_code": {
            "python": "class MyQueue:\n    def __init__(self):\n        pass\n    def push(self, x: int) -> None:\n        pass\n    def pop(self) -> int:\n        pass\n    def peek(self) -> int:\n        pass\n    def empty(self) -> bool:\n        pass",
            "javascript": "var MyQueue = function() {\n    \n};\nMyQueue.prototype.push = function(x) {\n    \n};\nMyQueue.prototype.pop = function() {\n    \n};\nMyQueue.prototype.peek = function() {\n    \n};\nMyQueue.prototype.empty = function() {\n    \n};",
            "java": "class MyQueue {\n    public MyQueue() {\n        \n    }\n    public void push(int x) {\n        \n    }\n    public int pop() {\n        \n    }\n    public int peek() {\n        \n    }\n    public boolean empty() {\n        \n    }\n}",
            "cpp": "class MyQueue {\npublic:\n    MyQueue() {\n        \n    }\n    void push(int x) {\n        \n    }\n    int pop() {\n        \n    }\n    int peek() {\n        \n    }\n    bool empty() {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"MyQueue\",\"push\",\"push\",\"peek\",\"pop\",\"empty\"]\n[[],[1],[2],[],[],[]]", "expected_output": "[null,null,null,1,1,false]", "is_sample": True},
        ],
    },
    {
        "title": "Design HashMap",
        "difficulty": "easy",
        "tags": ["array", "hash-table", "design"],
        "companies": ["oracle", "linkedin", "amazon", "dropbox"],
        "description": "Design a HashMap without using any built-in hash table libraries.\n\nImplement the `MyHashMap` class:\n- `MyHashMap()` initializes the object with an empty map.\n- `void put(int key, int value)` inserts a (key, value) pair into the HashMap.\n- `int get(int key)` returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key.\n- `void remove(key)` removes the key and its corresponding value.",
        "constraints": "0 <= key, value <= 10^6\nAt most 10^4 calls will be made to put, get, and remove.",
        "hints": "Use an array of buckets with chaining (linked lists) for collision handling.",
        "starter_code": {
            "python": "class MyHashMap:\n    def __init__(self):\n        pass\n    def put(self, key: int, value: int) -> None:\n        pass\n    def get(self, key: int) -> int:\n        pass\n    def remove(self, key: int) -> None:\n        pass",
            "javascript": "var MyHashMap = function() {\n    \n};\nMyHashMap.prototype.put = function(key, value) {\n    \n};\nMyHashMap.prototype.get = function(key) {\n    \n};\nMyHashMap.prototype.remove = function(key) {\n    \n};",
            "java": "class MyHashMap {\n    public MyHashMap() {\n        \n    }\n    public void put(int key, int value) {\n        \n    }\n    public int get(int key) {\n        \n    }\n    public void remove(int key) {\n        \n    }\n}",
            "cpp": "class MyHashMap {\npublic:\n    MyHashMap() {\n        \n    }\n    void put(int key, int value) {\n        \n    }\n    int get(int key) {\n        \n    }\n    void remove(int key) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"MyHashMap\",\"put\",\"put\",\"get\",\"get\",\"put\",\"get\",\"remove\",\"get\"]\n[[],[1,1],[2,2],[1],[3],[2,1],[2],[2],[2]]", "expected_output": "[null,null,null,1,-1,null,1,null,-1]", "is_sample": True},
        ],
    },
]

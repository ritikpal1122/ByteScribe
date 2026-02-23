"""
75 essential DSA problems (Blind 75 core set).

Each entry: {title, difficulty, description, constraints, hints, tags, starter_code, test_cases}
"""

PROBLEMS = [
    # ─── Array ────────────────────────────────────────────────────────────
    {
        "title": "Two Sum",
        "difficulty": "easy",
        "tags": ["array", "hash-table"],
        "companies": ["google", "amazon", "meta", "microsoft"],
        "description": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "constraints": "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
        "hints": "Try using a hash map to store complement values.",
        "starter_code": {
            "python": "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        pass",
            "javascript": "var twoSum = function(nums, target) {\n    \n};",
            "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,7,11,15]\n9", "expected_output": "[0,1]", "is_sample": True},
            {"input": "[3,2,4]\n6", "expected_output": "[1,2]", "is_sample": True},
            {"input": "[3,3]\n6", "expected_output": "[0,1]", "is_sample": False},
        ],
    },
    {
        "title": "Best Time to Buy and Sell Stock",
        "difficulty": "easy",
        "tags": ["array", "dynamic-programming"],
        "companies": ["amazon", "meta", "google", "microsoft"],
        "description": "You are given an array `prices` where `prices[i]` is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
        "constraints": "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4",
        "hints": "Track the minimum price seen so far and the maximum profit at each step.",
        "starter_code": {
            "python": "class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        pass",
            "javascript": "var maxProfit = function(prices) {\n    \n};",
            "java": "class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[7,1,5,3,6,4]", "expected_output": "5", "is_sample": True},
            {"input": "[7,6,4,3,1]", "expected_output": "0", "is_sample": True},
            {"input": "[2,4,1]", "expected_output": "2", "is_sample": False},
        ],
    },
    {
        "title": "Contains Duplicate",
        "difficulty": "easy",
        "tags": ["array", "hash-table", "sorting"],
        "companies": ["amazon", "apple", "adobe"],
        "description": "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
        "constraints": "1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
        "hints": "Use a set to track seen elements.",
        "starter_code": {
            "python": "class Solution:\n    def containsDuplicate(self, nums: list[int]) -> bool:\n        pass",
            "javascript": "var containsDuplicate = function(nums) {\n    \n};",
            "java": "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,1]", "expected_output": "true", "is_sample": True},
            {"input": "[1,2,3,4]", "expected_output": "false", "is_sample": True},
            {"input": "[1,1,1,3,3,4,3,2,4,2]", "expected_output": "true", "is_sample": False},
        ],
    },
    {
        "title": "Product of Array Except Self",
        "difficulty": "medium",
        "tags": ["array"],
        "companies": ["amazon", "meta", "apple", "microsoft"],
        "description": "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nThe product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in O(n) time and without using the division operation.",
        "constraints": "2 <= nums.length <= 10^5\n-30 <= nums[i] <= 30",
        "hints": "Use prefix and suffix products.",
        "starter_code": {
            "python": "class Solution:\n    def productExceptSelf(self, nums: list[int]) -> list[int]:\n        pass",
            "javascript": "var productExceptSelf = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4]", "expected_output": "[24,12,8,6]", "is_sample": True},
            {"input": "[-1,1,0,-3,3]", "expected_output": "[0,0,9,0,0]", "is_sample": True},
        ],
    },
    {
        "title": "Maximum Subarray",
        "difficulty": "medium",
        "tags": ["array", "dynamic-programming", "divide-and-conquer"],
        "companies": ["amazon", "microsoft", "google", "linkedin"],
        "description": "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
        "constraints": "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
        "hints": "Use Kadane's algorithm.",
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
    {
        "title": "Maximum Product Subarray",
        "difficulty": "medium",
        "tags": ["array", "dynamic-programming"],
        "companies": ["amazon", "google", "microsoft"],
        "description": "Given an integer array `nums`, find a subarray that has the largest product, and return the product.",
        "constraints": "1 <= nums.length <= 2 * 10^4\n-10 <= nums[i] <= 10",
        "hints": "Track both max and min products at each position because a negative times a negative can become the max.",
        "starter_code": {
            "python": "class Solution:\n    def maxProduct(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var maxProduct = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int maxProduct(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxProduct(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,3,-2,4]", "expected_output": "6", "is_sample": True},
            {"input": "[-2,0,-1]", "expected_output": "0", "is_sample": True},
        ],
    },
    {
        "title": "Find Minimum in Rotated Sorted Array",
        "difficulty": "medium",
        "tags": ["array", "binary-search"],
        "companies": ["amazon", "meta", "microsoft"],
        "description": "Suppose an array of length `n` sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array `nums` of unique elements, return the minimum element of this array.\n\nYou must write an algorithm that runs in O(log n) time.",
        "constraints": "n == nums.length\n1 <= n <= 5000\n-5000 <= nums[i] <= 5000\nAll values are unique.",
        "hints": "Use binary search. Compare mid with right to decide which half to search.",
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
    {
        "title": "Search in Rotated Sorted Array",
        "difficulty": "medium",
        "tags": ["array", "binary-search"],
        "companies": ["meta", "amazon", "microsoft", "uber"],
        "description": "There is an integer array `nums` sorted in ascending order (with distinct values). `nums` is possibly rotated at an unknown pivot. Given `target`, return its index, or -1 if not found. You must write an algorithm with O(log n) runtime.",
        "constraints": "1 <= nums.length <= 5000\n-10^4 <= nums[i] <= 10^4\nAll values are unique.\n-10^4 <= target <= 10^4",
        "hints": "Modified binary search: determine which half is sorted, then check if target lies in it.",
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
    {
        "title": "3Sum",
        "difficulty": "medium",
        "tags": ["array", "two-pointers", "sorting"],
        "companies": ["amazon", "meta", "google", "adobe"],
        "description": "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.",
        "constraints": "3 <= nums.length <= 3000\n-10^5 <= nums[i] <= 10^5",
        "hints": "Sort the array, then use two pointers for each element.",
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
    {
        "title": "Container With Most Water",
        "difficulty": "medium",
        "tags": ["array", "two-pointers", "greedy"],
        "companies": ["amazon", "google", "meta", "microsoft"],
        "description": "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn. Find two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.",
        "constraints": "n == height.length\n2 <= n <= 10^5\n0 <= height[i] <= 10^4",
        "hints": "Use two pointers starting from both ends. Move the pointer with the shorter height.",
        "starter_code": {
            "python": "class Solution:\n    def maxArea(self, height: list[int]) -> int:\n        pass",
            "javascript": "var maxArea = function(height) {\n    \n};",
            "java": "class Solution {\n    public int maxArea(int[] height) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,8,6,2,5,4,8,3,7]", "expected_output": "49", "is_sample": True},
            {"input": "[1,1]", "expected_output": "1", "is_sample": True},
        ],
    },
    # ─── String ───────────────────────────────────────────────────────────
    {
        "title": "Valid Anagram",
        "difficulty": "easy",
        "tags": ["string", "hash-table", "sorting"],
        "companies": ["amazon", "spotify", "uber"],
        "description": "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.",
        "constraints": "1 <= s.length, t.length <= 5 * 10^4\ns and t consist of lowercase English letters.",
        "hints": "Count character frequencies.",
        "starter_code": {
            "python": "class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        pass",
            "javascript": "var isAnagram = function(s, t) {\n    \n};",
            "java": "class Solution {\n    public boolean isAnagram(String s, String t) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "anagram\nnagaram", "expected_output": "true", "is_sample": True},
            {"input": "rat\ncar", "expected_output": "false", "is_sample": True},
        ],
    },
    {
        "title": "Valid Parentheses",
        "difficulty": "easy",
        "tags": ["string", "stack"],
        "companies": ["amazon", "meta", "google", "microsoft"],
        "description": "Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
        "constraints": "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'.",
        "hints": "Use a stack.",
        "starter_code": {
            "python": "class Solution:\n    def isValid(self, s: str) -> bool:\n        pass",
            "javascript": "var isValid = function(s) {\n    \n};",
            "java": "class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "()", "expected_output": "true", "is_sample": True},
            {"input": "()[]{}", "expected_output": "true", "is_sample": True},
            {"input": "(]", "expected_output": "false", "is_sample": False},
        ],
    },
    {
        "title": "Longest Substring Without Repeating Characters",
        "difficulty": "medium",
        "tags": ["string", "hash-table", "sliding-window"],
        "companies": ["amazon", "meta", "google", "microsoft"],
        "description": "Given a string `s`, find the length of the longest substring without repeating characters.",
        "constraints": "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
        "hints": "Use a sliding window with a set.",
        "starter_code": {
            "python": "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        pass",
            "javascript": "var lengthOfLongestSubstring = function(s) {\n    \n};",
            "java": "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "abcabcbb", "expected_output": "3", "is_sample": True},
            {"input": "bbbbb", "expected_output": "1", "is_sample": True},
            {"input": "pwwkew", "expected_output": "3", "is_sample": False},
        ],
    },
    {
        "title": "Longest Palindromic Substring",
        "difficulty": "medium",
        "tags": ["string", "dynamic-programming"],
        "companies": ["amazon", "microsoft", "oracle"],
        "description": "Given a string `s`, return the longest palindromic substring in `s`.",
        "constraints": "1 <= s.length <= 1000\ns consist of only digits and English letters.",
        "hints": "Expand around center for each character.",
        "starter_code": {
            "python": "class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        pass",
            "javascript": "var longestPalindrome = function(s) {\n    \n};",
            "java": "class Solution {\n    public String longestPalindrome(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string longestPalindrome(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "babad", "expected_output": "bab", "is_sample": True},
            {"input": "cbbd", "expected_output": "bb", "is_sample": True},
        ],
    },
    {
        "title": "Palindromic Substrings",
        "difficulty": "medium",
        "tags": ["string", "dynamic-programming"],
        "companies": ["meta", "google", "nvidia"],
        "description": "Given a string `s`, return the number of palindromic substrings in it.",
        "constraints": "1 <= s.length <= 1000\ns consists of lowercase English letters.",
        "hints": "Expand around each center (single char and between chars).",
        "starter_code": {
            "python": "class Solution:\n    def countSubstrings(self, s: str) -> int:\n        pass",
            "javascript": "var countSubstrings = function(s) {\n    \n};",
            "java": "class Solution {\n    public int countSubstrings(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int countSubstrings(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "abc", "expected_output": "3", "is_sample": True},
            {"input": "aaa", "expected_output": "6", "is_sample": True},
        ],
    },
    {
        "title": "Group Anagrams",
        "difficulty": "medium",
        "tags": ["string", "hash-table", "sorting"],
        "companies": ["amazon", "meta", "google", "uber"],
        "description": "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.",
        "constraints": "1 <= strs.length <= 10^4\n0 <= strs[i].length <= 100\nstrs[i] consists of lowercase English letters.",
        "hints": "Use sorted string as hash key.",
        "starter_code": {
            "python": "class Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        pass",
            "javascript": "var groupAnagrams = function(strs) {\n    \n};",
            "java": "class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", "expected_output": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]", "is_sample": True},
            {"input": "[\"\"]", "expected_output": "[[\"\"]]", "is_sample": True},
        ],
    },
    {
        "title": "Encode and Decode Strings",
        "difficulty": "medium",
        "tags": ["string", "design"],
        "companies": ["google", "meta", "snap"],
        "description": "Design an algorithm to encode a list of strings to a single string and decode it back.\n\nImplement `encode` and `decode` methods.",
        "constraints": "0 <= strs.length <= 200\n0 <= strs[i].length <= 200\nstrs[i] contains any possible characters including special characters.",
        "hints": "Prefix each string with its length and a delimiter.",
        "starter_code": {
            "python": "class Solution:\n    def encode(self, strs: list[str]) -> str:\n        pass\n\n    def decode(self, s: str) -> list[str]:\n        pass",
            "javascript": "var encode = function(strs) {\n    \n};\n\nvar decode = function(s) {\n    \n};",
            "java": "class Solution {\n    public String encode(List<String> strs) {\n        \n    }\n    public List<String> decode(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string encode(vector<string>& strs) {\n        \n    }\n    vector<string> decode(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"hello\",\"world\"]", "expected_output": "[\"hello\",\"world\"]", "is_sample": True},
            {"input": "[\"\"]", "expected_output": "[\"\"]", "is_sample": True},
        ],
    },
    # ─── Two Pointers ────────────────────────────────────────────────────
    {
        "title": "Valid Palindrome",
        "difficulty": "easy",
        "tags": ["string", "two-pointers"],
        "companies": ["meta", "microsoft", "apple"],
        "description": "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
        "constraints": "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
        "hints": "Use two pointers from both ends, skip non-alphanumeric characters.",
        "starter_code": {
            "python": "class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        pass",
            "javascript": "var isPalindrome = function(s) {\n    \n};",
            "java": "class Solution {\n    public boolean isPalindrome(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isPalindrome(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "A man, a plan, a canal: Panama", "expected_output": "true", "is_sample": True},
            {"input": "race a car", "expected_output": "false", "is_sample": True},
        ],
    },
    # ─── Sliding Window ──────────────────────────────────────────────────
    {
        "title": "Minimum Window Substring",
        "difficulty": "hard",
        "tags": ["string", "hash-table", "sliding-window"],
        "companies": ["meta", "google", "amazon", "airbnb"],
        "description": "Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window.\n\nIf there is no such substring, return the empty string \"\".",
        "constraints": "m == s.length\nn == t.length\n1 <= m, n <= 10^5\ns and t consist of uppercase and lowercase English letters.",
        "hints": "Use a sliding window with character counts.",
        "starter_code": {
            "python": "class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        pass",
            "javascript": "var minWindow = function(s, t) {\n    \n};",
            "java": "class Solution {\n    public String minWindow(String s, String t) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string minWindow(string s, string t) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "ADOBECODEBANC\nABC", "expected_output": "BANC", "is_sample": True},
            {"input": "a\na", "expected_output": "a", "is_sample": True},
            {"input": "a\naa", "expected_output": "", "is_sample": False},
        ],
    },
    # ─── Linked List ─────────────────────────────────────────────────────
    {
        "title": "Reverse Linked List",
        "difficulty": "easy",
        "tags": ["linked-list", "recursion"],
        "companies": ["amazon", "microsoft", "apple", "adobe"],
        "description": "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
        "constraints": "The number of nodes in the list is in the range [0, 5000].\n-5000 <= Node.val <= 5000",
        "hints": "Use three pointers: prev, curr, next.",
        "starter_code": {
            "python": "class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        pass",
            "javascript": "var reverseList = function(head) {\n    \n};",
            "java": "class Solution {\n    public ListNode reverseList(ListNode head) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4,5]", "expected_output": "[5,4,3,2,1]", "is_sample": True},
            {"input": "[1,2]", "expected_output": "[2,1]", "is_sample": True},
            {"input": "[]", "expected_output": "[]", "is_sample": False},
        ],
    },
    {
        "title": "Linked List Cycle",
        "difficulty": "easy",
        "tags": ["linked-list", "two-pointers"],
        "companies": ["amazon", "microsoft", "oracle"],
        "description": "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.\n\nReturn `true` if there is a cycle, otherwise return `false`.",
        "constraints": "The number of nodes is in the range [0, 10^4].\n-10^5 <= Node.val <= 10^5",
        "hints": "Use Floyd's cycle detection (slow and fast pointers).",
        "starter_code": {
            "python": "class Solution:\n    def hasCycle(self, head: Optional[ListNode]) -> bool:\n        pass",
            "javascript": "var hasCycle = function(head) {\n    \n};",
            "java": "public class Solution {\n    public boolean hasCycle(ListNode head) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,2,0,-4]\n1", "expected_output": "true", "is_sample": True},
            {"input": "[1,2]\n0", "expected_output": "true", "is_sample": True},
            {"input": "[1]\n-1", "expected_output": "false", "is_sample": False},
        ],
    },
    {
        "title": "Merge Two Sorted Lists",
        "difficulty": "easy",
        "tags": ["linked-list", "recursion"],
        "companies": ["amazon", "microsoft", "apple"],
        "description": "You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list. Return the head of the merged linked list.",
        "constraints": "The number of nodes in both lists is in the range [0, 50].\n-100 <= Node.val <= 100\nBoth lists are sorted in non-decreasing order.",
        "hints": "Compare heads, pick smaller, recurse or iterate.",
        "starter_code": {
            "python": "class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        pass",
            "javascript": "var mergeTwoLists = function(list1, list2) {\n    \n};",
            "java": "class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,4]\n[1,3,4]", "expected_output": "[1,1,2,3,4,4]", "is_sample": True},
            {"input": "[]\n[]", "expected_output": "[]", "is_sample": True},
            {"input": "[]\n[0]", "expected_output": "[0]", "is_sample": False},
        ],
    },
    {
        "title": "Merge K Sorted Lists",
        "difficulty": "hard",
        "tags": ["linked-list", "heap", "divide-and-conquer"],
        "companies": ["amazon", "meta", "google", "uber"],
        "description": "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
        "constraints": "k == lists.length\n0 <= k <= 10^4\n0 <= lists[i].length <= 500\n-10^4 <= lists[i][j] <= 10^4",
        "hints": "Use a min-heap or divide and conquer.",
        "starter_code": {
            "python": "class Solution:\n    def mergeKLists(self, lists: list[Optional[ListNode]]) -> Optional[ListNode]:\n        pass",
            "javascript": "var mergeKLists = function(lists) {\n    \n};",
            "java": "class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,4,5],[1,3,4],[2,6]]", "expected_output": "[1,1,2,3,4,4,5,6]", "is_sample": True},
            {"input": "[]", "expected_output": "[]", "is_sample": True},
            {"input": "[[]]", "expected_output": "[]", "is_sample": False},
        ],
    },
    {
        "title": "Remove Nth Node From End of List",
        "difficulty": "medium",
        "tags": ["linked-list", "two-pointers"],
        "companies": ["meta", "amazon", "oracle"],
        "description": "Given the `head` of a linked list, remove the `n`th node from the end of the list and return its head.",
        "constraints": "The number of nodes in the list is sz.\n1 <= sz <= 30\n0 <= Node.val <= 100\n1 <= n <= sz",
        "hints": "Use two pointers with a gap of n.",
        "starter_code": {
            "python": "class Solution:\n    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:\n        pass",
            "javascript": "var removeNthFromEnd = function(head, n) {\n    \n};",
            "java": "class Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4,5]\n2", "expected_output": "[1,2,3,5]", "is_sample": True},
            {"input": "[1]\n1", "expected_output": "[]", "is_sample": True},
            {"input": "[1,2]\n1", "expected_output": "[1]", "is_sample": False},
        ],
    },
    {
        "title": "Reorder List",
        "difficulty": "medium",
        "tags": ["linked-list", "two-pointers", "stack"],
        "companies": ["meta", "amazon", "linkedin"],
        "description": "You are given the head of a singly linked list. Reorder the list to be: L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ...\n\nYou may not modify the values in the list's nodes. Only nodes themselves may be changed.",
        "constraints": "The number of nodes is in the range [1, 5 * 10^4].\n1 <= Node.val <= 1000",
        "hints": "Find middle, reverse second half, merge alternating.",
        "starter_code": {
            "python": "class Solution:\n    def reorderList(self, head: Optional[ListNode]) -> None:\n        pass",
            "javascript": "var reorderList = function(head) {\n    \n};",
            "java": "class Solution {\n    public void reorderList(ListNode head) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void reorderList(ListNode* head) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4]", "expected_output": "[1,4,2,3]", "is_sample": True},
            {"input": "[1,2,3,4,5]", "expected_output": "[1,5,2,4,3]", "is_sample": True},
        ],
    },
    # ─── Tree ────────────────────────────────────────────────────────────
    {
        "title": "Invert Binary Tree",
        "difficulty": "easy",
        "tags": ["binary-tree", "recursion"],
        "companies": ["google", "amazon", "meta"],
        "description": "Given the `root` of a binary tree, invert the tree, and return its root.",
        "constraints": "The number of nodes is in the range [0, 100].\n-100 <= Node.val <= 100",
        "hints": "Swap left and right children recursively.",
        "starter_code": {
            "python": "class Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        pass",
            "javascript": "var invertTree = function(root) {\n    \n};",
            "java": "class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[4,2,7,1,3,6,9]", "expected_output": "[4,7,2,9,6,3,1]", "is_sample": True},
            {"input": "[2,1,3]", "expected_output": "[2,3,1]", "is_sample": True},
            {"input": "[]", "expected_output": "[]", "is_sample": False},
        ],
    },
    {
        "title": "Maximum Depth of Binary Tree",
        "difficulty": "easy",
        "tags": ["binary-tree", "recursion"],
        "companies": ["amazon", "google", "linkedin"],
        "description": "Given the `root` of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
        "constraints": "The number of nodes is in the range [0, 10^4].\n-100 <= Node.val <= 100",
        "hints": "Recursion: max(left_depth, right_depth) + 1",
        "starter_code": {
            "python": "class Solution:\n    def maxDepth(self, root: Optional[TreeNode]) -> int:\n        pass",
            "javascript": "var maxDepth = function(root) {\n    \n};",
            "java": "class Solution {\n    public int maxDepth(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,9,20,null,null,15,7]", "expected_output": "3", "is_sample": True},
            {"input": "[1,null,2]", "expected_output": "2", "is_sample": True},
        ],
    },
    {
        "title": "Same Tree",
        "difficulty": "easy",
        "tags": ["binary-tree", "recursion"],
        "companies": ["amazon", "linkedin", "microsoft"],
        "description": "Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.\n\nTwo binary trees are considered the same if they are structurally identical, and the nodes have the same value.",
        "constraints": "The number of nodes in both trees is in the range [0, 100].\n-10^4 <= Node.val <= 10^4",
        "hints": "Recursively compare corresponding nodes.",
        "starter_code": {
            "python": "class Solution:\n    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n        pass",
            "javascript": "var isSameTree = function(p, q) {\n    \n};",
            "java": "class Solution {\n    public boolean isSameTree(TreeNode p, TreeNode q) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isSameTree(TreeNode* p, TreeNode* q) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3]\n[1,2,3]", "expected_output": "true", "is_sample": True},
            {"input": "[1,2]\n[1,null,2]", "expected_output": "false", "is_sample": True},
        ],
    },
    {
        "title": "Subtree of Another Tree",
        "difficulty": "easy",
        "tags": ["binary-tree", "recursion"],
        "companies": ["amazon", "meta", "oracle"],
        "description": "Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot` and `false` otherwise.",
        "constraints": "The number of nodes in root is in [1, 2000].\nThe number of nodes in subRoot is in [1, 1000].\n-10^4 <= root.val, subRoot.val <= 10^4",
        "hints": "For each node in root, check if it matches subRoot using isSameTree.",
        "starter_code": {
            "python": "class Solution:\n    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:\n        pass",
            "javascript": "var isSubtree = function(root, subRoot) {\n    \n};",
            "java": "class Solution {\n    public boolean isSubtree(TreeNode root, TreeNode subRoot) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isSubtree(TreeNode* root, TreeNode* subRoot) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,4,5,1,2]\n[4,1,2]", "expected_output": "true", "is_sample": True},
            {"input": "[3,4,5,1,2,null,null,null,null,0]\n[4,1,2]", "expected_output": "false", "is_sample": True},
        ],
    },
    {
        "title": "Lowest Common Ancestor of a Binary Search Tree",
        "difficulty": "medium",
        "tags": ["binary-search-tree", "binary-tree", "recursion"],
        "companies": ["meta", "amazon", "linkedin", "microsoft"],
        "description": "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.",
        "constraints": "The number of nodes is in [2, 10^5].\n-10^9 <= Node.val <= 10^9\nAll Node.val are unique.\np != q\np and q will exist in the BST.",
        "hints": "If both p and q are smaller, go left; if both larger, go right; otherwise current is LCA.",
        "starter_code": {
            "python": "class Solution:\n    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:\n        pass",
            "javascript": "var lowestCommonAncestor = function(root, p, q) {\n    \n};",
            "java": "class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[6,2,8,0,4,7,9,null,null,3,5]\n2\n8", "expected_output": "6", "is_sample": True},
            {"input": "[6,2,8,0,4,7,9,null,null,3,5]\n2\n4", "expected_output": "2", "is_sample": True},
        ],
    },
    {
        "title": "Binary Tree Level Order Traversal",
        "difficulty": "medium",
        "tags": ["binary-tree", "queue"],
        "companies": ["amazon", "meta", "microsoft", "bytedance"],
        "description": "Given the `root` of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
        "constraints": "The number of nodes is in [0, 2000].\n-1000 <= Node.val <= 1000",
        "hints": "Use BFS with a queue.",
        "starter_code": {
            "python": "class Solution:\n    def levelOrder(self, root: Optional[TreeNode]) -> list[list[int]]:\n        pass",
            "javascript": "var levelOrder = function(root) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,9,20,null,null,15,7]", "expected_output": "[[3],[9,20],[15,7]]", "is_sample": True},
            {"input": "[1]", "expected_output": "[[1]]", "is_sample": True},
            {"input": "[]", "expected_output": "[]", "is_sample": False},
        ],
    },
    {
        "title": "Validate Binary Search Tree",
        "difficulty": "medium",
        "tags": ["binary-search-tree", "binary-tree", "recursion"],
        "companies": ["amazon", "meta", "microsoft", "google"],
        "description": "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).",
        "constraints": "The number of nodes is in [1, 10^4].\n-2^31 <= Node.val <= 2^31 - 1",
        "hints": "Use inorder traversal or pass min/max bounds recursively.",
        "starter_code": {
            "python": "class Solution:\n    def isValidBST(self, root: Optional[TreeNode]) -> bool:\n        pass",
            "javascript": "var isValidBST = function(root) {\n    \n};",
            "java": "class Solution {\n    public boolean isValidBST(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isValidBST(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,1,3]", "expected_output": "true", "is_sample": True},
            {"input": "[5,1,4,null,null,3,6]", "expected_output": "false", "is_sample": True},
        ],
    },
    {
        "title": "Kth Smallest Element in a BST",
        "difficulty": "medium",
        "tags": ["binary-search-tree", "binary-tree"],
        "companies": ["amazon", "meta", "uber"],
        "description": "Given the `root` of a binary search tree, and an integer `k`, return the `k`th smallest value (1-indexed) of all the values of the nodes in the tree.",
        "constraints": "The number of nodes is n.\n1 <= k <= n <= 10^4\n0 <= Node.val <= 10^4",
        "hints": "Inorder traversal of BST gives sorted order.",
        "starter_code": {
            "python": "class Solution:\n    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:\n        pass",
            "javascript": "var kthSmallest = function(root, k) {\n    \n};",
            "java": "class Solution {\n    public int kthSmallest(TreeNode root, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int kthSmallest(TreeNode* root, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,1,4,null,2]\n1", "expected_output": "1", "is_sample": True},
            {"input": "[5,3,6,2,4,null,null,1]\n3", "expected_output": "3", "is_sample": True},
        ],
    },
    {
        "title": "Construct Binary Tree from Preorder and Inorder Traversal",
        "difficulty": "medium",
        "tags": ["binary-tree", "recursion", "hash-table"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.",
        "constraints": "1 <= preorder.length <= 3000\ninorder.length == preorder.length\n-3000 <= preorder[i], inorder[i] <= 3000\nAll values are unique.",
        "hints": "First element of preorder is root. Find it in inorder to split left/right subtrees.",
        "starter_code": {
            "python": "class Solution:\n    def buildTree(self, preorder: list[int], inorder: list[int]) -> Optional[TreeNode]:\n        pass",
            "javascript": "var buildTree = function(preorder, inorder) {\n    \n};",
            "java": "class Solution {\n    public TreeNode buildTree(int[] preorder, int[] inorder) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,9,20,15,7]\n[9,3,15,20,7]", "expected_output": "[3,9,20,null,null,15,7]", "is_sample": True},
            {"input": "[-1]\n[-1]", "expected_output": "[-1]", "is_sample": True},
        ],
    },
    {
        "title": "Binary Tree Maximum Path Sum",
        "difficulty": "hard",
        "tags": ["binary-tree", "dynamic-programming", "recursion"],
        "companies": ["meta", "google", "amazon", "bytedance"],
        "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. The path sum is the sum of the node values in the path.\n\nGiven the `root` of a binary tree, return the maximum path sum of any non-empty path.",
        "constraints": "The number of nodes is in [1, 3 * 10^4].\n-1000 <= Node.val <= 1000",
        "hints": "At each node, consider the path that passes through it (left + node + right). Track global max.",
        "starter_code": {
            "python": "class Solution:\n    def maxPathSum(self, root: Optional[TreeNode]) -> int:\n        pass",
            "javascript": "var maxPathSum = function(root) {\n    \n};",
            "java": "class Solution {\n    public int maxPathSum(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxPathSum(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3]", "expected_output": "6", "is_sample": True},
            {"input": "[-10,9,20,null,null,15,7]", "expected_output": "42", "is_sample": True},
        ],
    },
    {
        "title": "Serialize and Deserialize Binary Tree",
        "difficulty": "hard",
        "tags": ["binary-tree", "design", "string"],
        "companies": ["meta", "amazon", "google", "linkedin"],
        "description": "Design an algorithm to serialize and deserialize a binary tree. Serialization is the process of converting a data structure into a sequence of bits. Deserialization is the reverse.",
        "constraints": "The number of nodes is in [0, 10^4].\n-1000 <= Node.val <= 1000",
        "hints": "Use preorder traversal with null markers.",
        "starter_code": {
            "python": "class Codec:\n    def serialize(self, root):\n        pass\n\n    def deserialize(self, data):\n        pass",
            "javascript": "var serialize = function(root) {\n    \n};\n\nvar deserialize = function(data) {\n    \n};",
            "java": "public class Codec {\n    public String serialize(TreeNode root) {\n        \n    }\n    public TreeNode deserialize(String data) {\n        \n    }\n}",
            "cpp": "class Codec {\npublic:\n    string serialize(TreeNode* root) {\n        \n    }\n    TreeNode* deserialize(string data) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,null,null,4,5]", "expected_output": "[1,2,3,null,null,4,5]", "is_sample": True},
            {"input": "[]", "expected_output": "[]", "is_sample": True},
        ],
    },
    # ─── Heap / Priority Queue ───────────────────────────────────────────
    {
        "title": "Top K Frequent Elements",
        "difficulty": "medium",
        "tags": ["array", "hash-table", "heap", "sorting"],
        "companies": ["amazon", "meta", "google", "oracle"],
        "description": "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.",
        "constraints": "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4\nk is in [1, number of unique elements].",
        "hints": "Count frequencies then use a heap or bucket sort.",
        "starter_code": {
            "python": "class Solution:\n    def topKFrequent(self, nums: list[int], k: int) -> list[int]:\n        pass",
            "javascript": "var topKFrequent = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,1,1,2,2,3]\n2", "expected_output": "[1,2]", "is_sample": True},
            {"input": "[1]\n1", "expected_output": "[1]", "is_sample": True},
        ],
    },
    {
        "title": "Find Median from Data Stream",
        "difficulty": "hard",
        "tags": ["heap", "design", "sorting"],
        "companies": ["amazon", "google", "meta", "microsoft"],
        "description": "The median is the middle value in an ordered integer list. Implement the MedianFinder class:\n\n- `MedianFinder()` initializes the MedianFinder object.\n- `void addNum(int num)` adds the integer num to the data structure.\n- `double findMedian()` returns the median of all elements so far.",
        "constraints": "-10^5 <= num <= 10^5\nThere will be at least one element before calling findMedian.\nAt most 5 * 10^4 calls total.",
        "hints": "Use two heaps: a max-heap for the lower half and a min-heap for the upper half.",
        "starter_code": {
            "python": "class MedianFinder:\n    def __init__(self):\n        pass\n\n    def addNum(self, num: int) -> None:\n        pass\n\n    def findMedian(self) -> float:\n        pass",
            "javascript": "var MedianFinder = function() {\n    \n};\n\nMedianFinder.prototype.addNum = function(num) {\n    \n};\n\nMedianFinder.prototype.findMedian = function() {\n    \n};",
            "java": "class MedianFinder {\n    public MedianFinder() {\n        \n    }\n    public void addNum(int num) {\n        \n    }\n    public double findMedian() {\n        \n    }\n}",
            "cpp": "class MedianFinder {\npublic:\n    MedianFinder() {\n        \n    }\n    void addNum(int num) {\n        \n    }\n    double findMedian() {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "addNum(1)\naddNum(2)\nfindMedian()\naddNum(3)\nfindMedian()", "expected_output": "1.5\n2.0", "is_sample": True},
        ],
    },
    # ─── Graph ───────────────────────────────────────────────────────────
    {
        "title": "Number of Islands",
        "difficulty": "medium",
        "tags": ["graph", "matrix", "recursion"],
        "companies": ["amazon", "meta", "google", "microsoft"],
        "description": "Given an `m x n` 2D binary grid `grid` which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
        "constraints": "m == grid.length\nn == grid[i].length\n1 <= m, n <= 300\ngrid[i][j] is '0' or '1'.",
        "hints": "Use DFS or BFS to mark visited land cells.",
        "starter_code": {
            "python": "class Solution:\n    def numIslands(self, grid: list[list[str]]) -> int:\n        pass",
            "javascript": "var numIslands = function(grid) {\n    \n};",
            "java": "class Solution {\n    public int numIslands(char[][] grid) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]", "expected_output": "1", "is_sample": True},
            {"input": "[[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]", "expected_output": "3", "is_sample": True},
        ],
    },
    {
        "title": "Clone Graph",
        "difficulty": "medium",
        "tags": ["graph", "hash-table", "recursion"],
        "companies": ["meta", "google", "amazon", "pinterest"],
        "description": "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node contains a value and a list of its neighbors.",
        "constraints": "The number of nodes is in [0, 100].\n1 <= Node.val <= 100\nAll Node.val are unique.\nNo self-loops or repeated edges.",
        "hints": "Use a hash map to track cloned nodes and DFS/BFS.",
        "starter_code": {
            "python": "class Solution:\n    def cloneGraph(self, node: Optional[Node]) -> Optional[Node]:\n        pass",
            "javascript": "var cloneGraph = function(node) {\n    \n};",
            "java": "class Solution {\n    public Node cloneGraph(Node node) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    Node* cloneGraph(Node* node) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[2,4],[1,3],[2,4],[1,3]]", "expected_output": "[[2,4],[1,3],[2,4],[1,3]]", "is_sample": True},
            {"input": "[[]]", "expected_output": "[[]]", "is_sample": True},
        ],
    },
    {
        "title": "Pacific Atlantic Water Flow",
        "difficulty": "medium",
        "tags": ["graph", "matrix", "recursion"],
        "companies": ["google", "amazon", "palantir"],
        "description": "Given an `m x n` matrix of non-negative integers representing the height of each unit cell, find all cells where water can flow to both the Pacific and Atlantic oceans.",
        "constraints": "m == heights.length\nn == heights[i].length\n1 <= m, n <= 200\n0 <= heights[i][j] <= 10^5",
        "hints": "Start BFS/DFS from ocean borders and find intersection.",
        "starter_code": {
            "python": "class Solution:\n    def pacificAtlantic(self, heights: list[list[int]]) -> list[list[int]]:\n        pass",
            "javascript": "var pacificAtlantic = function(heights) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> pacificAtlantic(int[][] heights) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", "expected_output": "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]", "is_sample": True},
            {"input": "[[1]]", "expected_output": "[[0,0]]", "is_sample": True},
        ],
    },
    {
        "title": "Course Schedule",
        "difficulty": "medium",
        "tags": ["graph"],
        "companies": ["amazon", "meta", "microsoft", "bytedance"],
        "description": "There are a total of `numCourses` courses you have to take, labeled from 0 to numCourses - 1. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.",
        "constraints": "1 <= numCourses <= 2000\n0 <= prerequisites.length <= 5000\nprerequisites[i].length == 2\n0 <= ai, bi < numCourses\nAll [ai, bi] are unique.",
        "hints": "Detect if a cycle exists in the directed graph using DFS or topological sort.",
        "starter_code": {
            "python": "class Solution:\n    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:\n        pass",
            "javascript": "var canFinish = function(numCourses, prerequisites) {\n    \n};",
            "java": "class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "2\n[[1,0]]", "expected_output": "true", "is_sample": True},
            {"input": "2\n[[1,0],[0,1]]", "expected_output": "false", "is_sample": True},
        ],
    },
    {
        "title": "Number of Connected Components in an Undirected Graph",
        "difficulty": "medium",
        "tags": ["graph", "union-find"],
        "companies": ["google", "amazon", "linkedin"],
        "description": "You have a graph of `n` nodes. You are given an integer `n` and an array `edges` where `edges[i] = [ai, bi]` indicates an undirected edge between nodes `ai` and `bi`.\n\nReturn the number of connected components in the graph.",
        "constraints": "1 <= n <= 2000\n1 <= edges.length <= 5000\nedges[i].length == 2\n0 <= ai, bi < n\nai != bi\nNo duplicate edges.",
        "hints": "Use Union-Find or DFS.",
        "starter_code": {
            "python": "class Solution:\n    def countComponents(self, n: int, edges: list[list[int]]) -> int:\n        pass",
            "javascript": "var countComponents = function(n, edges) {\n    \n};",
            "java": "class Solution {\n    public int countComponents(int n, int[][] edges) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int countComponents(int n, vector<vector<int>>& edges) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "5\n[[0,1],[1,2],[3,4]]", "expected_output": "2", "is_sample": True},
            {"input": "5\n[[0,1],[1,2],[2,3],[3,4]]", "expected_output": "1", "is_sample": True},
        ],
    },
    {
        "title": "Graph Valid Tree",
        "difficulty": "medium",
        "tags": ["graph", "union-find"],
        "companies": ["google", "meta", "linkedin"],
        "description": "You have a graph of `n` nodes labeled from 0 to n - 1. You are given `n` and a list of undirected `edges`. Write a function to check whether these edges make up a valid tree.",
        "constraints": "1 <= n <= 2000\n0 <= edges.length <= 5000\nedges[i].length == 2\n0 <= ai, bi < n\nai != bi\nNo duplicate edges.",
        "hints": "A valid tree has exactly n-1 edges and is fully connected with no cycles.",
        "starter_code": {
            "python": "class Solution:\n    def validTree(self, n: int, edges: list[list[int]]) -> bool:\n        pass",
            "javascript": "var validTree = function(n, edges) {\n    \n};",
            "java": "class Solution {\n    public boolean validTree(int n, int[][] edges) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool validTree(int n, vector<vector<int>>& edges) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "5\n[[0,1],[0,2],[0,3],[1,4]]", "expected_output": "true", "is_sample": True},
            {"input": "5\n[[0,1],[1,2],[2,3],[1,3],[1,4]]", "expected_output": "false", "is_sample": True},
        ],
    },
    # ─── Dynamic Programming ─────────────────────────────────────────────
    {
        "title": "Climbing Stairs",
        "difficulty": "easy",
        "tags": ["dynamic-programming", "math"],
        "companies": ["amazon", "apple", "adobe", "google"],
        "description": "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        "constraints": "1 <= n <= 45",
        "hints": "dp[i] = dp[i-1] + dp[i-2] (Fibonacci pattern)",
        "starter_code": {
            "python": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        pass",
            "javascript": "var climbStairs = function(n) {\n    \n};",
            "java": "class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "2", "expected_output": "2", "is_sample": True},
            {"input": "3", "expected_output": "3", "is_sample": True},
            {"input": "5", "expected_output": "8", "is_sample": False},
        ],
    },
    {
        "title": "Coin Change",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "array"],
        "companies": ["amazon", "google", "apple", "coinbase"],
        "description": "You are given an integer array `coins` representing coins of different denominations and an integer `amount`. Return the fewest number of coins needed to make up that amount. If it cannot be made up, return -1.",
        "constraints": "1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4",
        "hints": "Bottom-up DP: dp[i] = min coins to make amount i.",
        "starter_code": {
            "python": "class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        pass",
            "javascript": "var coinChange = function(coins, amount) {\n    \n};",
            "java": "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,5,10]\n11", "expected_output": "2", "is_sample": True},
            {"input": "[2]\n3", "expected_output": "-1", "is_sample": True},
            {"input": "[1]\n0", "expected_output": "0", "is_sample": False},
        ],
    },
    {
        "title": "Longest Increasing Subsequence",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "array", "binary-search"],
        "companies": ["google", "amazon", "microsoft", "palantir"],
        "description": "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.",
        "constraints": "1 <= nums.length <= 2500\n-10^4 <= nums[i] <= 10^4",
        "hints": "DP: dp[i] = LIS ending at index i. Binary search for O(n log n).",
        "starter_code": {
            "python": "class Solution:\n    def lengthOfLIS(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var lengthOfLIS = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int lengthOfLIS(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[10,9,2,5,3,7,101,18]", "expected_output": "4", "is_sample": True},
            {"input": "[0,1,0,3,2,3]", "expected_output": "4", "is_sample": True},
            {"input": "[7,7,7,7,7,7,7]", "expected_output": "1", "is_sample": False},
        ],
    },
    {
        "title": "Longest Common Subsequence",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "string"],
        "companies": ["amazon", "google", "spotify"],
        "description": "Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
        "constraints": "1 <= text1.length, text2.length <= 1000\ntext1 and text2 consist of only lowercase English characters.",
        "hints": "Classic 2D DP. If chars match, dp[i][j] = dp[i-1][j-1] + 1.",
        "starter_code": {
            "python": "class Solution:\n    def longestCommonSubsequence(self, text1: str, text2: str) -> int:\n        pass",
            "javascript": "var longestCommonSubsequence = function(text1, text2) {\n    \n};",
            "java": "class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "abcde\nace", "expected_output": "3", "is_sample": True},
            {"input": "abc\nabc", "expected_output": "3", "is_sample": True},
            {"input": "abc\ndef", "expected_output": "0", "is_sample": False},
        ],
    },
    {
        "title": "Word Break",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "string", "hash-table"],
        "companies": ["amazon", "meta", "google", "bytedance"],
        "description": "Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.",
        "constraints": "1 <= s.length <= 300\n1 <= wordDict.length <= 1000\n1 <= wordDict[i].length <= 20\nAll strings are lowercase English letters.\nAll values of wordDict are unique.",
        "hints": "dp[i] = can s[0:i] be segmented? Check all word endings at position i.",
        "starter_code": {
            "python": "class Solution:\n    def wordBreak(self, s: str, wordDict: list[str]) -> bool:\n        pass",
            "javascript": "var wordBreak = function(s, wordDict) {\n    \n};",
            "java": "class Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "leetcode\n[\"leet\",\"code\"]", "expected_output": "true", "is_sample": True},
            {"input": "applepenapple\n[\"apple\",\"pen\"]", "expected_output": "true", "is_sample": True},
            {"input": "catsandog\n[\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]", "expected_output": "false", "is_sample": False},
        ],
    },
    {
        "title": "Combination Sum IV",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "array"],
        "companies": ["google", "meta", "shopify"],
        "description": "Given an array of distinct integers `nums` and a target integer `target`, return the number of possible combinations that add up to `target`. The order of numbers matters (permutations counted).",
        "constraints": "1 <= nums.length <= 200\n1 <= nums[i] <= 1000\nAll elements are unique.\n1 <= target <= 1000",
        "hints": "dp[i] = sum of dp[i - num] for each num in nums.",
        "starter_code": {
            "python": "class Solution:\n    def combinationSum4(self, nums: list[int], target: int) -> int:\n        pass",
            "javascript": "var combinationSum4 = function(nums, target) {\n    \n};",
            "java": "class Solution {\n    public int combinationSum4(int[] nums, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int combinationSum4(vector<int>& nums, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3]\n4", "expected_output": "7", "is_sample": True},
            {"input": "[9]\n3", "expected_output": "0", "is_sample": True},
        ],
    },
    {
        "title": "House Robber",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "array"],
        "companies": ["amazon", "google", "microsoft", "doordash"],
        "description": "You are a professional robber. Each house has a certain amount of money stashed. Adjacent houses have security systems connected. Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police (no two adjacent houses).",
        "constraints": "1 <= nums.length <= 100\n0 <= nums[i] <= 400",
        "hints": "dp[i] = max(dp[i-1], dp[i-2] + nums[i])",
        "starter_code": {
            "python": "class Solution:\n    def rob(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var rob = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int rob(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,1]", "expected_output": "4", "is_sample": True},
            {"input": "[2,7,9,3,1]", "expected_output": "12", "is_sample": True},
        ],
    },
    {
        "title": "House Robber II",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "array"],
        "companies": ["amazon", "google", "adobe"],
        "description": "All houses are arranged in a circle. You cannot rob two adjacent houses. Given an integer array `nums`, return the maximum amount of money you can rob.",
        "constraints": "1 <= nums.length <= 100\n0 <= nums[i] <= 1000",
        "hints": "Run House Robber on nums[0:n-1] and nums[1:n], take max.",
        "starter_code": {
            "python": "class Solution:\n    def rob(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var rob = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int rob(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,3,2]", "expected_output": "3", "is_sample": True},
            {"input": "[1,2,3,1]", "expected_output": "4", "is_sample": True},
            {"input": "[1,2,3]", "expected_output": "3", "is_sample": False},
        ],
    },
    {
        "title": "Decode Ways",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "string"],
        "companies": ["meta", "google", "amazon", "uber"],
        "description": "A message containing letters from A-Z can be encoded with '1' -> 'A', '2' -> 'B', ..., '26' -> 'Z'. Given a string `s` containing only digits, return the number of ways to decode it.",
        "constraints": "1 <= s.length <= 100\ns contains only digits and may contain leading zeros.",
        "hints": "dp[i] depends on single-digit and two-digit decodings from position i.",
        "starter_code": {
            "python": "class Solution:\n    def numDecodings(self, s: str) -> int:\n        pass",
            "javascript": "var numDecodings = function(s) {\n    \n};",
            "java": "class Solution {\n    public int numDecodings(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int numDecodings(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "12", "expected_output": "2", "is_sample": True},
            {"input": "226", "expected_output": "3", "is_sample": True},
            {"input": "06", "expected_output": "0", "is_sample": False},
        ],
    },
    {
        "title": "Unique Paths",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "math"],
        "companies": ["amazon", "google", "meta", "dropbox"],
        "description": "A robot is located at the top-left corner of an `m x n` grid. The robot can only move either down or right at any point. How many possible unique paths are there to reach the bottom-right corner?",
        "constraints": "1 <= m, n <= 100",
        "hints": "dp[i][j] = dp[i-1][j] + dp[i][j-1]",
        "starter_code": {
            "python": "class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        pass",
            "javascript": "var uniquePaths = function(m, n) {\n    \n};",
            "java": "class Solution {\n    public int uniquePaths(int m, int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "3\n7", "expected_output": "28", "is_sample": True},
            {"input": "3\n2", "expected_output": "3", "is_sample": True},
        ],
    },
    {
        "title": "Jump Game",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "greedy", "array"],
        "companies": ["amazon", "microsoft", "google", "uber"],
        "description": "You are given an integer array `nums`. You are initially positioned at the array's first index, and each element represents your maximum jump length at that position.\n\nReturn `true` if you can reach the last index, or `false` otherwise.",
        "constraints": "1 <= nums.length <= 10^4\n0 <= nums[i] <= 10^5",
        "hints": "Track the farthest reachable index greedily.",
        "starter_code": {
            "python": "class Solution:\n    def canJump(self, nums: list[int]) -> bool:\n        pass",
            "javascript": "var canJump = function(nums) {\n    \n};",
            "java": "class Solution {\n    public boolean canJump(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,3,1,1,4]", "expected_output": "true", "is_sample": True},
            {"input": "[3,2,1,0,4]", "expected_output": "false", "is_sample": True},
        ],
    },
    # ─── Intervals ───────────────────────────────────────────────────────
    {
        "title": "Merge Intervals",
        "difficulty": "medium",
        "tags": ["array", "sorting", "intervals"],
        "companies": ["google", "meta", "amazon", "microsoft"],
        "description": "Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
        "constraints": "1 <= intervals.length <= 10^4\nintervals[i].length == 2\n0 <= starti <= endi <= 10^4",
        "hints": "Sort by start, then merge overlapping intervals.",
        "starter_code": {
            "python": "class Solution:\n    def merge(self, intervals: list[list[int]]) -> list[list[int]]:\n        pass",
            "javascript": "var merge = function(intervals) {\n    \n};",
            "java": "class Solution {\n    public int[][] merge(int[][] intervals) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,3],[2,6],[8,10],[15,18]]", "expected_output": "[[1,6],[8,10],[15,18]]", "is_sample": True},
            {"input": "[[1,4],[4,5]]", "expected_output": "[[1,5]]", "is_sample": True},
        ],
    },
    {
        "title": "Non-overlapping Intervals",
        "difficulty": "medium",
        "tags": ["array", "dynamic-programming", "greedy", "sorting", "intervals"],
        "companies": ["amazon", "google", "stripe"],
        "description": "Given an array of intervals `intervals` where `intervals[i] = [starti, endi]`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
        "constraints": "1 <= intervals.length <= 10^5\nintervals[i].length == 2\n-5 * 10^4 <= starti < endi <= 5 * 10^4",
        "hints": "Sort by end time, greedily keep intervals that don't overlap.",
        "starter_code": {
            "python": "class Solution:\n    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:\n        pass",
            "javascript": "var eraseOverlapIntervals = function(intervals) {\n    \n};",
            "java": "class Solution {\n    public int eraseOverlapIntervals(int[][] intervals) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int eraseOverlapIntervals(vector<vector<int>>& intervals) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2],[2,3],[3,4],[1,3]]", "expected_output": "1", "is_sample": True},
            {"input": "[[1,2],[1,2],[1,2]]", "expected_output": "2", "is_sample": True},
            {"input": "[[1,2],[2,3]]", "expected_output": "0", "is_sample": False},
        ],
    },
    {
        "title": "Insert Interval",
        "difficulty": "medium",
        "tags": ["array", "intervals"],
        "companies": ["google", "meta", "linkedin"],
        "description": "You are given an array of non-overlapping intervals `intervals` sorted by `starti` in ascending order. Insert `newInterval` into intervals such that the result is still sorted and non-overlapping (merge if necessary).",
        "constraints": "0 <= intervals.length <= 10^4\nintervals[i].length == 2\n0 <= starti <= endi <= 10^5\nnewInterval.length == 2\n0 <= start <= end <= 10^5",
        "hints": "Add all intervals before the new one, merge overlapping, add remaining.",
        "starter_code": {
            "python": "class Solution:\n    def insert(self, intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:\n        pass",
            "javascript": "var insert = function(intervals, newInterval) {\n    \n};",
            "java": "class Solution {\n    public int[][] insert(int[][] intervals, int[] newInterval) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,3],[6,9]]\n[2,5]", "expected_output": "[[1,5],[6,9]]", "is_sample": True},
            {"input": "[[1,2],[3,5],[6,7],[8,10],[12,16]]\n[4,8]", "expected_output": "[[1,2],[3,10],[12,16]]", "is_sample": True},
        ],
    },
    # ─── Matrix ──────────────────────────────────────────────────────────
    {
        "title": "Set Matrix Zeroes",
        "difficulty": "medium",
        "tags": ["array", "matrix", "hash-table"],
        "companies": ["amazon", "meta", "microsoft", "oracle"],
        "description": "Given an `m x n` integer matrix, if an element is 0, set its entire row and column to 0's. You must do it in place.",
        "constraints": "m == matrix.length\nn == matrix[0].length\n1 <= m, n <= 200\n-2^31 <= matrix[i][j] <= 2^31 - 1",
        "hints": "Use first row and first column as markers.",
        "starter_code": {
            "python": "class Solution:\n    def setZeroes(self, matrix: list[list[int]]) -> None:\n        pass",
            "javascript": "var setZeroes = function(matrix) {\n    \n};",
            "java": "class Solution {\n    public void setZeroes(int[][] matrix) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void setZeroes(vector<vector<int>>& matrix) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,1,1],[1,0,1],[1,1,1]]", "expected_output": "[[1,0,1],[0,0,0],[1,0,1]]", "is_sample": True},
            {"input": "[[0,1,2,0],[3,4,5,2],[1,3,1,5]]", "expected_output": "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]", "is_sample": True},
        ],
    },
    {
        "title": "Spiral Matrix",
        "difficulty": "medium",
        "tags": ["array", "matrix", "simulation"],
        "companies": ["amazon", "microsoft", "apple", "uber"],
        "description": "Given an `m x n` matrix, return all elements of the matrix in spiral order.",
        "constraints": "m == matrix.length\nn == matrix[i].length\n1 <= m, n <= 10\n-100 <= matrix[i][j] <= 100",
        "hints": "Use four boundaries: top, bottom, left, right. Shrink after each traversal.",
        "starter_code": {
            "python": "class Solution:\n    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:\n        pass",
            "javascript": "var spiralOrder = function(matrix) {\n    \n};",
            "java": "class Solution {\n    public List<Integer> spiralOrder(int[][] matrix) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2,3],[4,5,6],[7,8,9]]", "expected_output": "[1,2,3,6,9,8,7,4,5]", "is_sample": True},
            {"input": "[[1,2,3,4],[5,6,7,8],[9,10,11,12]]", "expected_output": "[1,2,3,4,8,12,11,10,9,5,6,7]", "is_sample": True},
        ],
    },
    {
        "title": "Rotate Image",
        "difficulty": "medium",
        "tags": ["array", "matrix", "math"],
        "companies": ["amazon", "microsoft", "apple", "google"],
        "description": "You are given an `n x n` 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place.",
        "constraints": "n == matrix.length == matrix[i].length\n1 <= n <= 20\n-1000 <= matrix[i][j] <= 1000",
        "hints": "Transpose the matrix, then reverse each row.",
        "starter_code": {
            "python": "class Solution:\n    def rotate(self, matrix: list[list[int]]) -> None:\n        pass",
            "javascript": "var rotate = function(matrix) {\n    \n};",
            "java": "class Solution {\n    public void rotate(int[][] matrix) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void rotate(vector<vector<int>>& matrix) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2,3],[4,5,6],[7,8,9]]", "expected_output": "[[7,4,1],[8,5,2],[9,6,3]]", "is_sample": True},
            {"input": "[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]", "expected_output": "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]", "is_sample": True},
        ],
    },
    {
        "title": "Word Search",
        "difficulty": "medium",
        "tags": ["array", "matrix", "backtracking"],
        "companies": ["amazon", "meta", "microsoft", "snap"],
        "description": "Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid. The word can be constructed from letters of sequentially adjacent cells (horizontally or vertically neighboring). The same letter cell may not be used more than once.",
        "constraints": "m == board.length\nn == board[i].length\n1 <= m, n <= 6\n1 <= word.length <= 15\nboard and word consists of only lowercase and uppercase English letters.",
        "hints": "DFS with backtracking from each cell.",
        "starter_code": {
            "python": "class Solution:\n    def exist(self, board: list[list[str]], word: str) -> bool:\n        pass",
            "javascript": "var exist = function(board, word) {\n    \n};",
            "java": "class Solution {\n    public boolean exist(char[][] board, String word) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\nABCCED", "expected_output": "true", "is_sample": True},
            {"input": "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\nSEE", "expected_output": "true", "is_sample": True},
            {"input": "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]\nABCB", "expected_output": "false", "is_sample": False},
        ],
    },
    # ─── Bit Manipulation ────────────────────────────────────────────────
    {
        "title": "Number of 1 Bits",
        "difficulty": "easy",
        "tags": ["bit-manipulation"],
        "companies": ["apple", "microsoft", "oracle"],
        "description": "Write a function that takes the binary representation of a positive integer and returns the number of set bits (1s) it has (also known as Hamming weight).",
        "constraints": "1 <= n <= 2^31 - 1",
        "hints": "Use n & (n-1) to clear lowest set bit, or check each bit.",
        "starter_code": {
            "python": "class Solution:\n    def hammingWeight(self, n: int) -> int:\n        pass",
            "javascript": "var hammingWeight = function(n) {\n    \n};",
            "java": "class Solution {\n    public int hammingWeight(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int hammingWeight(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "11", "expected_output": "3", "is_sample": True},
            {"input": "128", "expected_output": "1", "is_sample": True},
            {"input": "2147483645", "expected_output": "30", "is_sample": False},
        ],
    },
    {
        "title": "Counting Bits",
        "difficulty": "easy",
        "tags": ["dynamic-programming", "bit-manipulation"],
        "companies": ["amazon", "adobe", "nvidia"],
        "description": "Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (0 <= i <= n), `ans[i]` is the number of 1's in the binary representation of `i`.",
        "constraints": "0 <= n <= 10^5",
        "hints": "dp[i] = dp[i >> 1] + (i & 1)",
        "starter_code": {
            "python": "class Solution:\n    def countBits(self, n: int) -> list[int]:\n        pass",
            "javascript": "var countBits = function(n) {\n    \n};",
            "java": "class Solution {\n    public int[] countBits(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> countBits(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "2", "expected_output": "[0,1,1]", "is_sample": True},
            {"input": "5", "expected_output": "[0,1,1,2,1,2]", "is_sample": True},
        ],
    },
    {
        "title": "Missing Number",
        "difficulty": "easy",
        "tags": ["array", "math", "bit-manipulation"],
        "companies": ["amazon", "microsoft", "nvidia", "lyft"],
        "description": "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.",
        "constraints": "n == nums.length\n1 <= n <= 10^4\n0 <= nums[i] <= n\nAll numbers are unique.",
        "hints": "Use XOR: a ^ a = 0. XOR all indices and values.",
        "starter_code": {
            "python": "class Solution:\n    def missingNumber(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var missingNumber = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int missingNumber(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,0,1]", "expected_output": "2", "is_sample": True},
            {"input": "[0,1]", "expected_output": "2", "is_sample": True},
            {"input": "[9,6,4,2,3,5,7,0,1]", "expected_output": "8", "is_sample": False},
        ],
    },
    {
        "title": "Reverse Bits",
        "difficulty": "easy",
        "tags": ["bit-manipulation"],
        "companies": ["apple", "airbnb", "nvidia"],
        "description": "Reverse bits of a given 32 bits unsigned integer.",
        "constraints": "The input must be a binary string of length 32.",
        "hints": "Iterate through 32 bits, shift result left and add current bit.",
        "starter_code": {
            "python": "class Solution:\n    def reverseBits(self, n: int) -> int:\n        pass",
            "javascript": "var reverseBits = function(n) {\n    \n};",
            "java": "public class Solution {\n    public int reverseBits(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    uint32_t reverseBits(uint32_t n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "43261596", "expected_output": "964176192", "is_sample": True},
            {"input": "4294967293", "expected_output": "3221225471", "is_sample": True},
        ],
    },
    {
        "title": "Sum of Two Integers",
        "difficulty": "medium",
        "tags": ["math", "bit-manipulation"],
        "companies": ["meta", "amazon", "uber"],
        "description": "Given two integers `a` and `b`, return the sum of the two integers without using the operators `+` and `-`.",
        "constraints": "-1000 <= a, b <= 1000",
        "hints": "Use XOR for sum without carry, AND + shift for carry. Repeat until no carry.",
        "starter_code": {
            "python": "class Solution:\n    def getSum(self, a: int, b: int) -> int:\n        pass",
            "javascript": "var getSum = function(a, b) {\n    \n};",
            "java": "class Solution {\n    public int getSum(int a, int b) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int getSum(int a, int b) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "1\n2", "expected_output": "3", "is_sample": True},
            {"input": "2\n3", "expected_output": "5", "is_sample": True},
        ],
    },
    # ─── Trie ────────────────────────────────────────────────────────────
    {
        "title": "Implement Trie (Prefix Tree)",
        "difficulty": "medium",
        "tags": ["trie", "design", "string", "hash-table"],
        "companies": ["amazon", "google", "microsoft", "uber"],
        "description": "A trie (prefix tree) is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.\n\nImplement the Trie class:\n- `Trie()` initializes the object.\n- `void insert(String word)` inserts the string `word` into the trie.\n- `boolean search(String word)` returns `true` if the string `word` is in the trie.\n- `boolean startsWith(String prefix)` returns `true` if there is a previously inserted string that has the prefix `prefix`.",
        "constraints": "1 <= word.length, prefix.length <= 2000\nword and prefix consist only of lowercase English letters.\nAt most 3 * 10^4 calls total.",
        "hints": "Each node has up to 26 children. Mark end-of-word.",
        "starter_code": {
            "python": "class Trie:\n    def __init__(self):\n        pass\n\n    def insert(self, word: str) -> None:\n        pass\n\n    def search(self, word: str) -> bool:\n        pass\n\n    def startsWith(self, prefix: str) -> bool:\n        pass",
            "javascript": "var Trie = function() {\n    \n};\n\nTrie.prototype.insert = function(word) {\n    \n};\n\nTrie.prototype.search = function(word) {\n    \n};\n\nTrie.prototype.startsWith = function(prefix) {\n    \n};",
            "java": "class Trie {\n    public Trie() {\n        \n    }\n    public void insert(String word) {\n        \n    }\n    public boolean search(String word) {\n        \n    }\n    public boolean startsWith(String prefix) {\n        \n    }\n}",
            "cpp": "class Trie {\npublic:\n    Trie() {\n        \n    }\n    void insert(string word) {\n        \n    }\n    bool search(string word) {\n        \n    }\n    bool startsWith(string prefix) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "insert(apple)\nsearch(apple)\nsearch(app)\nstartsWith(app)\ninsert(app)\nsearch(app)", "expected_output": "true\nfalse\ntrue\ntrue", "is_sample": True},
        ],
    },
    {
        "title": "Design Add and Search Words Data Structure",
        "difficulty": "medium",
        "tags": ["trie", "design", "string", "backtracking"],
        "companies": ["meta", "google", "doordash"],
        "description": "Design a data structure that supports adding new words and finding if a string matches any previously added string.\n\n`addWord(word)` adds word.\n`search(word)` searches, where `.` can match any letter.",
        "constraints": "1 <= word.length <= 25\nword in addWord consists of lowercase English letters.\nword in search consists of '.' or lowercase English letters.\nAt most 10^4 calls total.",
        "hints": "Trie + DFS for wildcard '.' matching.",
        "starter_code": {
            "python": "class WordDictionary:\n    def __init__(self):\n        pass\n\n    def addWord(self, word: str) -> None:\n        pass\n\n    def search(self, word: str) -> bool:\n        pass",
            "javascript": "var WordDictionary = function() {\n    \n};\n\nWordDictionary.prototype.addWord = function(word) {\n    \n};\n\nWordDictionary.prototype.search = function(word) {\n    \n};",
            "java": "class WordDictionary {\n    public WordDictionary() {\n        \n    }\n    public void addWord(String word) {\n        \n    }\n    public boolean search(String word) {\n        \n    }\n}",
            "cpp": "class WordDictionary {\npublic:\n    WordDictionary() {\n        \n    }\n    void addWord(string word) {\n        \n    }\n    bool search(string word) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "addWord(bad)\naddWord(dad)\naddWord(mad)\nsearch(pad)\nsearch(bad)\nsearch(.ad)\nsearch(b..)", "expected_output": "false\ntrue\ntrue\ntrue", "is_sample": True},
        ],
    },
    {
        "title": "Word Search II",
        "difficulty": "hard",
        "tags": ["trie", "array", "matrix", "backtracking"],
        "companies": ["amazon", "meta", "uber", "snap"],
        "description": "Given an `m x n` board of characters and a list of strings `words`, return all words on the board.\n\nEach word must be constructed from letters of sequentially adjacent cells (horizontally or vertically neighboring). The same letter cell may not be used more than once in a word.",
        "constraints": "m == board.length\nn == board[i].length\n1 <= m, n <= 12\nboard[i][j] is a lowercase English letter.\n1 <= words.length <= 3 * 10^4\n1 <= words[i].length <= 10",
        "hints": "Build a trie from words, then DFS on the board using the trie for pruning.",
        "starter_code": {
            "python": "class Solution:\n    def findWords(self, board: list[list[str]], words: list[str]) -> list[str]:\n        pass",
            "javascript": "var findWords = function(board, words) {\n    \n};",
            "java": "class Solution {\n    public List<String> findWords(char[][] board, String[] words) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]]\n[\"oath\",\"pea\",\"eat\",\"rain\"]", "expected_output": "[\"eat\",\"oath\"]", "is_sample": True},
            {"input": "[[\"a\",\"b\"],[\"c\",\"d\"]]\n[\"abcb\"]", "expected_output": "[]", "is_sample": True},
        ],
    },
    # ─── Backtracking ────────────────────────────────────────────────────
    {
        "title": "Combination Sum",
        "difficulty": "medium",
        "tags": ["array", "backtracking"],
        "companies": ["amazon", "meta", "airbnb", "shopify"],
        "description": "Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`. You may return combinations in any order.\n\nThe same number may be chosen from `candidates` an unlimited number of times.",
        "constraints": "1 <= candidates.length <= 30\n2 <= candidates[i] <= 40\nAll elements are distinct.\n1 <= target <= 40",
        "hints": "DFS with backtracking. Allow reuse by not incrementing index.",
        "starter_code": {
            "python": "class Solution:\n    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:\n        pass",
            "javascript": "var combinationSum = function(candidates, target) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> combinationSum(int[] candidates, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,3,6,7]\n7", "expected_output": "[[2,2,3],[7]]", "is_sample": True},
            {"input": "[2,3,5]\n8", "expected_output": "[[2,2,2,2],[2,3,3],[3,5]]", "is_sample": True},
        ],
    },
    # ─── Additional Essential Problems ───────────────────────────────────
    {
        "title": "Longest Repeating Character Replacement",
        "difficulty": "medium",
        "tags": ["string", "hash-table", "sliding-window"],
        "companies": ["google", "amazon", "lyft", "pinterest"],
        "description": "You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English letter. You can perform this operation at most `k` times.\n\nReturn the length of the longest substring containing the same letter you can get after performing the above operations.",
        "constraints": "1 <= s.length <= 10^5\ns consists of only uppercase English letters.\n0 <= k <= s.length",
        "hints": "Sliding window: if window_size - max_freq > k, shrink the window.",
        "starter_code": {
            "python": "class Solution:\n    def characterReplacement(self, s: str, k: int) -> int:\n        pass",
            "javascript": "var characterReplacement = function(s, k) {\n    \n};",
            "java": "class Solution {\n    public int characterReplacement(String s, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int characterReplacement(string s, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "ABAB\n2", "expected_output": "4", "is_sample": True},
            {"input": "AABABBA\n1", "expected_output": "4", "is_sample": True},
        ],
    },
    {
        "title": "Alien Dictionary",
        "difficulty": "hard",
        "tags": ["graph", "string", "sorting"],
        "companies": ["meta", "google", "airbnb", "uber"],
        "description": "There is a new alien language that uses the English alphabet. The order among letters is unknown. You are given a list of strings `words` from the alien language's dictionary, sorted lexicographically by the rules of this new language.\n\nDerive the order of letters in this language. If the order is invalid, return \"\".",
        "constraints": "1 <= words.length <= 100\n1 <= words[i].length <= 100\nwords[i] consists of only lowercase English letters.",
        "hints": "Build a directed graph from adjacent word comparisons, then topological sort.",
        "starter_code": {
            "python": "class Solution:\n    def alienOrder(self, words: list[str]) -> str:\n        pass",
            "javascript": "var alienOrder = function(words) {\n    \n};",
            "java": "class Solution {\n    public String alienOrder(String[] words) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string alienOrder(vector<string>& words) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]", "expected_output": "wertf", "is_sample": True},
            {"input": "[\"z\",\"x\"]", "expected_output": "zx", "is_sample": True},
            {"input": "[\"z\",\"x\",\"z\"]", "expected_output": "", "is_sample": False},
        ],
    },
]

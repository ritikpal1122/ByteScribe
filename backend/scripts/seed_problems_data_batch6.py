"""Batch 6: Dynamic Programming problems (~38 with company labels)."""

PROBLEMS_BATCH6 = [
    # ─── 1. Edit Distance ──────────────────────────────────────────────────
    {
        "title": "Edit Distance",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "string"],
        "companies": ["google", "amazon", "microsoft", "meta"],
        "description": "Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`. You have three operations: insert a character, delete a character, or replace a character.\n\nExample 1:\nInput: word1 = \"horse\", word2 = \"ros\"\nOutput: 3\nExplanation: horse -> rorse (replace 'h' with 'r') -> rose (remove 'r') -> ros (remove 'e')\n\nExample 2:\nInput: word1 = \"intention\", word2 = \"execution\"\nOutput: 5",
        "constraints": "0 <= word1.length, word2.length <= 500\nword1 and word2 consist of lowercase English letters.",
        "hints": "Use a 2D DP table where dp[i][j] represents the edit distance between word1[:i] and word2[:j]. Consider the three operations at each cell.",
        "starter_code": {
            "python": "class Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        pass",
            "javascript": "var minDistance = function(word1, word2) {\n    \n};",
            "java": "class Solution {\n    public int minDistance(String word1, String word2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"horse\"\n\"ros\"", "expected_output": "3", "is_sample": True},
            {"input": "\"intention\"\n\"execution\"", "expected_output": "5", "is_sample": True},
            {"input": "\"\"\n\"abc\"", "expected_output": "3", "is_sample": False},
        ],
    },
    # ─── 2. Interleaving String ─────────────────────────────────────────────
    {
        "title": "Interleaving String",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "string"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "Given strings `s1`, `s2`, and `s3`, find whether `s3` is formed by an interleaving of `s1` and `s2`. An interleaving of two strings preserves the left-to-right ordering of characters from each source string.\n\nExample 1:\nInput: s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbcbcac\"\nOutput: true\n\nExample 2:\nInput: s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbbaccc\"\nOutput: false",
        "constraints": "0 <= s1.length, s2.length <= 100\n0 <= s3.length <= 200\ns1, s2, and s3 consist of lowercase English letters.",
        "hints": "Use a 2D DP table where dp[i][j] means s1[:i] and s2[:j] can form s3[:i+j].",
        "starter_code": {
            "python": "class Solution:\n    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:\n        pass",
            "javascript": "var isInterleave = function(s1, s2, s3) {\n    \n};",
            "java": "class Solution {\n    public boolean isInterleave(String s1, String s2, String s3) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isInterleave(string s1, string s2, string s3) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"aabcc\"\n\"dbbca\"\n\"aadbbcbcac\"", "expected_output": "true", "is_sample": True},
            {"input": "\"aabcc\"\n\"dbbca\"\n\"aadbbbaccc\"", "expected_output": "false", "is_sample": True},
            {"input": "\"\"\n\"\"\n\"\"", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 3. Distinct Subsequences ───────────────────────────────────────────
    {
        "title": "Distinct Subsequences",
        "difficulty": "hard",
        "tags": ["dynamic-programming", "string"],
        "companies": ["google", "meta", "amazon"],
        "description": "Given two strings `s` and `t`, return the number of distinct subsequences of `s` which equals `t`.\n\nExample 1:\nInput: s = \"rabbbit\", t = \"rabbit\"\nOutput: 3\nExplanation: There are 3 ways to choose 'b' from the three 'b's in s.\n\nExample 2:\nInput: s = \"babgbag\", t = \"bag\"\nOutput: 5",
        "constraints": "1 <= s.length, t.length <= 1000\ns and t consist of English letters.",
        "hints": "Use dp[i][j] to represent the number of ways to form t[:j] from s[:i]. If characters match, add both keep and skip options.",
        "starter_code": {
            "python": "class Solution:\n    def numDistinct(self, s: str, t: str) -> int:\n        pass",
            "javascript": "var numDistinct = function(s, t) {\n    \n};",
            "java": "class Solution {\n    public int numDistinct(String s, String t) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int numDistinct(string s, string t) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"rabbbit\"\n\"rabbit\"", "expected_output": "3", "is_sample": True},
            {"input": "\"babgbag\"\n\"bag\"", "expected_output": "5", "is_sample": True},
            {"input": "\"aaa\"\n\"a\"", "expected_output": "3", "is_sample": False},
        ],
    },
    # ─── 4. Burst Balloons ──────────────────────────────────────────────────
    {
        "title": "Burst Balloons",
        "difficulty": "hard",
        "tags": ["dynamic-programming", "array"],
        "companies": ["google", "microsoft", "amazon", "uber"],
        "description": "You are given `n` balloons indexed from `0` to `n - 1`. Each balloon is painted with a number on it represented by `nums`. You are asked to burst all the balloons. If you burst the `i`th balloon, you will get `nums[i - 1] * nums[i] * nums[i + 1]` coins. If `i - 1` or `i + 1` goes out of bounds, treat it as a balloon with number `1`. Return the maximum coins you can collect by bursting the balloons wisely.\n\nExample 1:\nInput: nums = [3,1,5,8]\nOutput: 167\nExplanation: nums = [3,1,5,8] -> [3,5,8] -> [3,8] -> [8] -> [] coins = 15+40+40+72 = 167\n\nExample 2:\nInput: nums = [1,5]\nOutput: 10",
        "constraints": "n == nums.length\n1 <= n <= 300\n0 <= nums[i] <= 100",
        "hints": "Think in reverse: instead of which balloon to burst first, think about which balloon to burst last in a range. Use interval DP.",
        "starter_code": {
            "python": "class Solution:\n    def maxCoins(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var maxCoins = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int maxCoins(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxCoins(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,1,5,8]", "expected_output": "167", "is_sample": True},
            {"input": "[1,5]", "expected_output": "10", "is_sample": True},
            {"input": "[5]", "expected_output": "5", "is_sample": False},
        ],
    },
    # ─── 5. Regular Expression Matching ─────────────────────────────────────
    {
        "title": "Regular Expression Matching",
        "difficulty": "hard",
        "tags": ["dynamic-programming", "string"],
        "companies": ["google", "meta", "amazon", "microsoft"],
        "description": "Given an input string `s` and a pattern `p`, implement regular expression matching with support for '.' (matches any single character) and '*' (matches zero or more of the preceding element). The matching should cover the entire input string.\n\nExample 1:\nInput: s = \"aa\", p = \"a\"\nOutput: false\n\nExample 2:\nInput: s = \"aa\", p = \"a*\"\nOutput: true",
        "constraints": "1 <= s.length <= 20\n1 <= p.length <= 20\ns contains only lowercase English letters.\np contains only lowercase English letters, '.', and '*'.\nIt is guaranteed for each '*', there is a valid previous character to match.",
        "hints": "Use 2D DP where dp[i][j] means s[:i] matches p[:j]. Handle '*' by considering zero occurrences or one+ occurrences of the preceding element.",
        "starter_code": {
            "python": "class Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        pass",
            "javascript": "var isMatch = function(s, p) {\n    \n};",
            "java": "class Solution {\n    public boolean isMatch(String s, String p) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isMatch(string s, string p) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"aa\"\n\"a\"", "expected_output": "false", "is_sample": True},
            {"input": "\"aa\"\n\"a*\"", "expected_output": "true", "is_sample": True},
            {"input": "\"ab\"\n\".*\"", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 6. Wildcard Matching ───────────────────────────────────────────────
    {
        "title": "Wildcard Matching",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "string", "greedy"],
        "companies": ["google", "meta", "amazon", "bytedance"],
        "description": "Given an input string `s` and a pattern `p`, implement wildcard pattern matching with support for '?' (matches any single character) and '*' (matches any sequence of characters, including empty). The matching should cover the entire input string.\n\nExample 1:\nInput: s = \"aa\", p = \"a\"\nOutput: false\n\nExample 2:\nInput: s = \"aa\", p = \"*\"\nOutput: true",
        "constraints": "0 <= s.length, p.length <= 2000\ns contains only lowercase English letters.\np contains only lowercase English letters, '?' or '*'.",
        "hints": "Use 2D DP where dp[i][j] means s[:i] matches p[:j]. '*' can match empty or extend to include one more character from s.",
        "starter_code": {
            "python": "class Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        pass",
            "javascript": "var isMatch = function(s, p) {\n    \n};",
            "java": "class Solution {\n    public boolean isMatch(String s, String p) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isMatch(string s, string p) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"aa\"\n\"a\"", "expected_output": "false", "is_sample": True},
            {"input": "\"aa\"\n\"*\"", "expected_output": "true", "is_sample": True},
            {"input": "\"cb\"\n\"?a\"", "expected_output": "false", "is_sample": False},
        ],
    },
    # ─── 7. Longest Valid Parentheses ───────────────────────────────────────
    {
        "title": "Longest Valid Parentheses",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "string"],
        "companies": ["amazon", "meta", "bytedance", "uber"],
        "description": "Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.\n\nExample 1:\nInput: s = \"(()\"\nOutput: 2\nExplanation: The longest valid parentheses substring is \"()\".\n\nExample 2:\nInput: s = \")()())\"\nOutput: 4\nExplanation: The longest valid parentheses substring is \"()()\".",
        "constraints": "0 <= s.length <= 3 * 10^4\ns[i] is '(' or ')'.",
        "hints": "Use DP where dp[i] stores the length of the longest valid parentheses ending at index i. Only update when s[i] == ')'.",
        "starter_code": {
            "python": "class Solution:\n    def longestValidParentheses(self, s: str) -> int:\n        pass",
            "javascript": "var longestValidParentheses = function(s) {\n    \n};",
            "java": "class Solution {\n    public int longestValidParentheses(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int longestValidParentheses(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"(()\"", "expected_output": "2", "is_sample": True},
            {"input": "\")()())\"", "expected_output": "4", "is_sample": True},
            {"input": "\"\"", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 8. Maximal Square ──────────────────────────────────────────────────
    {
        "title": "Maximal Square",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "matrix"],
        "companies": ["google", "apple", "amazon", "airbnb"],
        "description": "Given an `m x n` binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.\n\nExample 1:\nInput: matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]\nOutput: 4\n\nExample 2:\nInput: matrix = [[\"0\",\"1\"],[\"1\",\"0\"]]\nOutput: 1",
        "constraints": "m == matrix.length\nn == matrix[i].length\n1 <= m, n <= 300\nmatrix[i][j] is '0' or '1'.",
        "hints": "Use dp[i][j] to represent the side length of the largest square whose bottom-right corner is at (i, j). dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1 when matrix[i][j] == '1'.",
        "starter_code": {
            "python": "class Solution:\n    def maximalSquare(self, matrix: list[list[str]]) -> int:\n        pass",
            "javascript": "var maximalSquare = function(matrix) {\n    \n};",
            "java": "class Solution {\n    public int maximalSquare(char[][] matrix) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maximalSquare(vector<vector<char>>& matrix) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]", "expected_output": "4", "is_sample": True},
            {"input": "[[\"0\",\"1\"],[\"1\",\"0\"]]", "expected_output": "1", "is_sample": True},
            {"input": "[[\"0\"]]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 9. Minimum Path Sum ────────────────────────────────────────────────
    {
        "title": "Minimum Path Sum",
        "difficulty": "easy",
        "tags": ["dynamic-programming", "matrix"],
        "companies": ["google", "amazon", "microsoft", "apple"],
        "description": "Given a `m x n` grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path. You can only move either down or right at any point in time.\n\nExample 1:\nInput: grid = [[1,3,1],[1,5,1],[4,2,1]]\nOutput: 7\nExplanation: Path 1 -> 3 -> 1 -> 1 -> 1 minimizes the sum.\n\nExample 2:\nInput: grid = [[1,2,3],[4,5,6]]\nOutput: 12",
        "constraints": "m == grid.length\nn == grid[i].length\n1 <= m, n <= 200\n0 <= grid[i][j] <= 200",
        "hints": "Use DP where dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]). Initialize first row and column by accumulating.",
        "starter_code": {
            "python": "class Solution:\n    def minPathSum(self, grid: list[list[int]]) -> int:\n        pass",
            "javascript": "var minPathSum = function(grid) {\n    \n};",
            "java": "class Solution {\n    public int minPathSum(int[][] grid) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minPathSum(vector<vector<int>>& grid) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,3,1],[1,5,1],[4,2,1]]", "expected_output": "7", "is_sample": True},
            {"input": "[[1,2,3],[4,5,6]]", "expected_output": "12", "is_sample": True},
            {"input": "[[1]]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 10. Triangle ───────────────────────────────────────────────────────
    {
        "title": "Triangle",
        "difficulty": "easy",
        "tags": ["dynamic-programming", "array"],
        "companies": ["amazon", "apple", "microsoft"],
        "description": "Given a `triangle` array, return the minimum path sum from top to bottom. For each step, you may move to an adjacent number of the row below (i.e., index `i` or `i + 1` of the next row).\n\nExample 1:\nInput: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]\nOutput: 11\nExplanation: The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11.\n\nExample 2:\nInput: triangle = [[-10]]\nOutput: -10",
        "constraints": "1 <= triangle.length <= 200\ntriangle[0].length == 1\ntriangle[i].length == triangle[i - 1].length + 1\n-10^4 <= triangle[i][j] <= 10^4",
        "hints": "Work bottom-up: start from the last row and for each cell pick the minimum of two adjacent cells below, adding the current value.",
        "starter_code": {
            "python": "class Solution:\n    def minimumTotal(self, triangle: list[list[int]]) -> int:\n        pass",
            "javascript": "var minimumTotal = function(triangle) {\n    \n};",
            "java": "class Solution {\n    public int minimumTotal(List<List<Integer>> triangle) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minimumTotal(vector<vector<int>>& triangle) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[2],[3,4],[6,5,7],[4,1,8,3]]", "expected_output": "11", "is_sample": True},
            {"input": "[[-10]]", "expected_output": "-10", "is_sample": True},
            {"input": "[[1],[2,3]]", "expected_output": "3", "is_sample": False},
        ],
    },
    # ─── 11. Coin Change 2 ──────────────────────────────────────────────────
    {
        "title": "Coin Change 2",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "array"],
        "companies": ["amazon", "google", "uber", "lyft"],
        "description": "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the number of combinations that make up that amount. If that amount cannot be made up, return 0.\n\nExample 1:\nInput: amount = 5, coins = [1,2,5]\nOutput: 4\nExplanation: 5=5, 5=2+2+1, 5=2+1+1+1, 5=1+1+1+1+1.\n\nExample 2:\nInput: amount = 3, coins = [2]\nOutput: 0",
        "constraints": "1 <= coins.length <= 300\n1 <= coins[i] <= 5000\nAll values of coins are unique.\n0 <= amount <= 5000",
        "hints": "Use unbounded knapsack DP. Iterate over coins in the outer loop and amounts in the inner loop to avoid counting permutations.",
        "starter_code": {
            "python": "class Solution:\n    def change(self, amount: int, coins: list[int]) -> int:\n        pass",
            "javascript": "var change = function(amount, coins) {\n    \n};",
            "java": "class Solution {\n    public int change(int amount, int[] coins) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int change(int amount, vector<int>& coins) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "5\n[1,2,5]", "expected_output": "4", "is_sample": True},
            {"input": "3\n[2]", "expected_output": "0", "is_sample": True},
            {"input": "0\n[7]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 12. Perfect Squares ────────────────────────────────────────────────
    {
        "title": "Perfect Squares",
        "difficulty": "easy",
        "tags": ["dynamic-programming", "math"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "Given an integer `n`, return the least number of perfect square numbers that sum to `n`. A perfect square is an integer that is the square of another integer (e.g., 1, 4, 9, 16, ...).\n\nExample 1:\nInput: n = 12\nOutput: 3\nExplanation: 12 = 4 + 4 + 4.\n\nExample 2:\nInput: n = 13\nOutput: 2\nExplanation: 13 = 4 + 9.",
        "constraints": "1 <= n <= 10^4",
        "hints": "Use dp[i] = min(dp[i - j*j] + 1) for all j where j*j <= i. Initialize dp[0] = 0.",
        "starter_code": {
            "python": "class Solution:\n    def numSquares(self, n: int) -> int:\n        pass",
            "javascript": "var numSquares = function(n) {\n    \n};",
            "java": "class Solution {\n    public int numSquares(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int numSquares(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "12", "expected_output": "3", "is_sample": True},
            {"input": "13", "expected_output": "2", "is_sample": True},
            {"input": "1", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 13. Target Sum ─────────────────────────────────────────────────────
    {
        "title": "Target Sum",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "array"],
        "companies": ["meta", "google", "amazon", "bytedance"],
        "description": "You are given an integer array `nums` and an integer `target`. You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers. Return the number of different expressions that evaluate to `target`.\n\nExample 1:\nInput: nums = [1,1,1,1,1], target = 3\nOutput: 5\nExplanation: Five ways: -1+1+1+1+1, +1-1+1+1+1, +1+1-1+1+1, +1+1+1-1+1, +1+1+1+1-1.\n\nExample 2:\nInput: nums = [1], target = 1\nOutput: 1",
        "constraints": "1 <= nums.length <= 20\n0 <= nums[i] <= 1000\n0 <= sum(nums[i]) <= 1000\n-1000 <= target <= 1000",
        "hints": "Convert to a subset sum problem: find a subset P such that sum(P) = (target + totalSum) / 2. Use 1D knapsack DP.",
        "starter_code": {
            "python": "class Solution:\n    def findTargetSumWays(self, nums: list[int], target: int) -> int:\n        pass",
            "javascript": "var findTargetSumWays = function(nums, target) {\n    \n};",
            "java": "class Solution {\n    public int findTargetSumWays(int[] nums, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findTargetSumWays(vector<int>& nums, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,1,1,1,1]\n3", "expected_output": "5", "is_sample": True},
            {"input": "[1]\n1", "expected_output": "1", "is_sample": True},
            {"input": "[0,0,0,0,1]\n1", "expected_output": "16", "is_sample": False},
        ],
    },
    # ─── 14. Partition Equal Subset Sum ──────────────────────────────────────
    {
        "title": "Partition Equal Subset Sum",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "array"],
        "companies": ["amazon", "meta", "apple", "uber"],
        "description": "Given an integer array `nums`, return `true` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal.\n\nExample 1:\nInput: nums = [1,5,11,5]\nOutput: true\nExplanation: The array can be partitioned as [1, 5, 5] and [11].\n\nExample 2:\nInput: nums = [1,2,3,5]\nOutput: false",
        "constraints": "1 <= nums.length <= 200\n1 <= nums[i] <= 100",
        "hints": "This is a 0/1 knapsack problem. Check if a subset with sum equal to totalSum/2 exists. If totalSum is odd, return false immediately.",
        "starter_code": {
            "python": "class Solution:\n    def canPartition(self, nums: list[int]) -> bool:\n        pass",
            "javascript": "var canPartition = function(nums) {\n    \n};",
            "java": "class Solution {\n    public boolean canPartition(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool canPartition(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,5,11,5]", "expected_output": "true", "is_sample": True},
            {"input": "[1,2,3,5]", "expected_output": "false", "is_sample": True},
            {"input": "[1,1]", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 15. Ones and Zeroes ────────────────────────────────────────────────
    {
        "title": "Ones and Zeroes",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "array", "string"],
        "companies": ["google", "amazon", "adobe"],
        "description": "You are given an array of binary strings `strs` and two integers `m` and `n`. Return the size of the largest subset of `strs` such that there are at most `m` 0's and `n` 1's in the subset.\n\nExample 1:\nInput: strs = [\"10\",\"0001\",\"111001\",\"1\",\"0\"], m = 5, n = 3\nOutput: 4\nExplanation: The largest subset is {\"10\", \"0001\", \"1\", \"0\"} with 5 zeroes and 3 ones.\n\nExample 2:\nInput: strs = [\"10\",\"0\",\"1\"], m = 1, n = 1\nOutput: 2",
        "constraints": "1 <= strs.length <= 600\n1 <= strs[i].length <= 100\nstrs[i] consists only of digits '0' and '1'.\n1 <= m, n <= 100",
        "hints": "This is a 2D knapsack problem. Use dp[i][j] representing the max subset size using at most i zeros and j ones. Iterate strings and update in reverse.",
        "starter_code": {
            "python": "class Solution:\n    def findMaxForm(self, strs: list[str], m: int, n: int) -> int:\n        pass",
            "javascript": "var findMaxForm = function(strs, m, n) {\n    \n};",
            "java": "class Solution {\n    public int findMaxForm(String[] strs, int m, int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findMaxForm(vector<string>& strs, int m, int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"10\",\"0001\",\"111001\",\"1\",\"0\"]\n5\n3", "expected_output": "4", "is_sample": True},
            {"input": "[\"10\",\"0\",\"1\"]\n1\n1", "expected_output": "2", "is_sample": True},
            {"input": "[\"0\",\"0\",\"0\"]\n2\n0", "expected_output": "2", "is_sample": False},
        ],
    },
    # ─── 16. Minimum Cost For Tickets ───────────────────────────────────────
    {
        "title": "Minimum Cost For Tickets",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "array"],
        "companies": ["amazon", "google", "microsoft", "doordash"],
        "description": "You have planned some train traveling one year in advance. The days of the year in which you will travel are given as an integer array `days`. Train tickets are sold in three different ways: a 1-day pass for `costs[0]`, a 7-day pass for `costs[1]`, and a 30-day pass for `costs[2]`. Return the minimum number of dollars you need to travel every day in `days`.\n\nExample 1:\nInput: days = [1,4,6,7,8,20], costs = [2,7,15]\nOutput: 11\nExplanation: Buy a 7-day pass on day 1 (covers days 1-7) for 7, a 1-day pass on day 8 for 2, and a 1-day pass on day 20 for 2. Total = 11.\n\nExample 2:\nInput: days = [1,2,3,4,5,6,7,8,9,10,30,31], costs = [2,7,15]\nOutput: 17",
        "constraints": "1 <= days.length <= 365\n1 <= days[i] <= 365\ndays is in strictly increasing order.\ncosts.length == 3\n1 <= costs[i] <= 1000",
        "hints": "Use dp[i] as the minimum cost to cover all travel days up to day i. For each travel day, consider buying each of the three pass types.",
        "starter_code": {
            "python": "class Solution:\n    def mincostTickets(self, days: list[int], costs: list[int]) -> int:\n        pass",
            "javascript": "var mincostTickets = function(days, costs) {\n    \n};",
            "java": "class Solution {\n    public int mincostTickets(int[] days, int[] costs) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int mincostTickets(vector<int>& days, vector<int>& costs) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,4,6,7,8,20]\n[2,7,15]", "expected_output": "11", "is_sample": True},
            {"input": "[1,2,3,4,5,6,7,8,9,10,30,31]\n[2,7,15]", "expected_output": "17", "is_sample": True},
            {"input": "[1]\n[1,5,10]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 17. Integer Break ──────────────────────────────────────────────────
    {
        "title": "Integer Break",
        "difficulty": "easy",
        "tags": ["dynamic-programming", "math"],
        "companies": ["amazon", "microsoft", "uber"],
        "description": "Given an integer `n`, break it into the sum of `k` positive integers, where `k >= 2`, and maximize the product of those integers. Return the maximum product you can get.\n\nExample 1:\nInput: n = 2\nOutput: 1\nExplanation: 2 = 1 + 1, 1 * 1 = 1.\n\nExample 2:\nInput: n = 10\nOutput: 36\nExplanation: 10 = 3 + 3 + 4, 3 * 3 * 4 = 36.",
        "constraints": "2 <= n <= 58",
        "hints": "Use dp[i] = max(j * (i-j), j * dp[i-j]) for all valid j. Alternatively, observe that breaking into 3's is optimal for n > 4.",
        "starter_code": {
            "python": "class Solution:\n    def integerBreak(self, n: int) -> int:\n        pass",
            "javascript": "var integerBreak = function(n) {\n    \n};",
            "java": "class Solution {\n    public int integerBreak(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int integerBreak(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "2", "expected_output": "1", "is_sample": True},
            {"input": "10", "expected_output": "36", "is_sample": True},
            {"input": "4", "expected_output": "4", "is_sample": False},
        ],
    },
    # ─── 18. Arithmetic Slices ──────────────────────────────────────────────
    {
        "title": "Arithmetic Slices",
        "difficulty": "easy",
        "tags": ["dynamic-programming", "array"],
        "companies": ["google", "linkedin", "adobe"],
        "description": "An integer array is called arithmetic if it consists of at least three elements and if the difference between any two consecutive elements is the same. Given an integer array `nums`, return the number of arithmetic subarrays of `nums`.\n\nExample 1:\nInput: nums = [1,2,3,4]\nOutput: 3\nExplanation: [1,2,3], [2,3,4], and [1,2,3,4] are arithmetic slices.\n\nExample 2:\nInput: nums = [1]\nOutput: 0",
        "constraints": "1 <= nums.length <= 5000\n-1000 <= nums[i] <= 1000",
        "hints": "Use dp[i] to count arithmetic slices ending at index i. If nums[i] - nums[i-1] == nums[i-1] - nums[i-2], then dp[i] = dp[i-1] + 1.",
        "starter_code": {
            "python": "class Solution:\n    def numberOfArithmeticSlices(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var numberOfArithmeticSlices = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int numberOfArithmeticSlices(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int numberOfArithmeticSlices(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4]", "expected_output": "3", "is_sample": True},
            {"input": "[1]", "expected_output": "0", "is_sample": True},
            {"input": "[1,3,5,7,9]", "expected_output": "6", "is_sample": False},
        ],
    },
    # ─── 19. Longest String Chain ───────────────────────────────────────────
    {
        "title": "Longest String Chain",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "string", "hash-table"],
        "companies": ["google", "amazon", "meta", "bytedance"],
        "description": "You are given an array of `words` where each word consists of lowercase English letters. Word `wordA` is a predecessor of `wordB` if you can insert exactly one letter anywhere in `wordA` to make it equal to `wordB`. A word chain is a sequence where each word is a predecessor of the next. Return the length of the longest possible word chain.\n\nExample 1:\nInput: words = [\"a\",\"b\",\"ba\",\"bca\",\"bda\",\"bdca\"]\nOutput: 4\nExplanation: One chain is \"a\" -> \"ba\" -> \"bda\" -> \"bdca\".\n\nExample 2:\nInput: words = [\"xbc\",\"pcxbcf\",\"xb\",\"cxbc\",\"pcxbc\"]\nOutput: 5",
        "constraints": "1 <= words.length <= 1000\n1 <= words[i].length <= 16\nwords[i] only consists of lowercase English letters.",
        "hints": "Sort words by length. For each word, try removing each character and check if the resulting word has been seen. Use a hash map to store the longest chain ending at each word.",
        "starter_code": {
            "python": "class Solution:\n    def longestStrChain(self, words: list[str]) -> int:\n        pass",
            "javascript": "var longestStrChain = function(words) {\n    \n};",
            "java": "class Solution {\n    public int longestStrChain(String[] words) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int longestStrChain(vector<string>& words) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"a\",\"b\",\"ba\",\"bca\",\"bda\",\"bdca\"]", "expected_output": "4", "is_sample": True},
            {"input": "[\"xbc\",\"pcxbcf\",\"xb\",\"cxbc\",\"pcxbc\"]", "expected_output": "5", "is_sample": True},
            {"input": "[\"a\"]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 20. Delete and Earn ────────────────────────────────────────────────
    {
        "title": "Delete and Earn",
        "difficulty": "easy",
        "tags": ["dynamic-programming", "array"],
        "companies": ["google", "amazon", "uber"],
        "description": "You are given an integer array `nums`. You want to maximize the number of points you get by performing the following operation any number of times: Pick any `nums[i]` and delete it to earn `nums[i]` points. Afterwards, you must delete every element equal to `nums[i] - 1` and `nums[i] + 1`. Return the maximum number of points.\n\nExample 1:\nInput: nums = [3,4,2]\nOutput: 6\nExplanation: Delete 4 to earn 4 points. 3 is also deleted. Then delete 2 to earn 2 points. Total = 6.\n\nExample 2:\nInput: nums = [2,2,3,3,3,4]\nOutput: 9\nExplanation: Delete 3 three times to earn 9 points. 2 and 4 are deleted. Total = 9.",
        "constraints": "1 <= nums.length <= 2 * 10^4\n1 <= nums[i] <= 10^4",
        "hints": "This reduces to the House Robber problem. Sum up points for each value, then for consecutive values decide to take or skip (like robbing adjacent houses).",
        "starter_code": {
            "python": "class Solution:\n    def deleteAndEarn(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var deleteAndEarn = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int deleteAndEarn(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int deleteAndEarn(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,4,2]", "expected_output": "6", "is_sample": True},
            {"input": "[2,2,3,3,3,4]", "expected_output": "9", "is_sample": True},
            {"input": "[1,1,1,1]", "expected_output": "4", "is_sample": False},
        ],
    },
    # ─── 21. Maximum Length of Pair Chain ────────────────────────────────────
    {
        "title": "Maximum Length of Pair Chain",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "greedy", "array"],
        "companies": ["amazon", "google", "linkedin"],
        "description": "You are given an array of `n` pairs `pairs` where `pairs[i] = [left_i, right_i]` and `left_i < right_i`. A pair `(c, d)` can follow pair `(a, b)` if `b < c`. Find the longest chain which can be formed. You do not need to use up all the given intervals.\n\nExample 1:\nInput: pairs = [[1,2],[2,3],[3,4]]\nOutput: 2\nExplanation: The longest chain is [1,2] -> [3,4].\n\nExample 2:\nInput: pairs = [[1,2],[7,8],[4,5]]\nOutput: 3",
        "constraints": "n == pairs.length\n1 <= n <= 1000\n-1000 <= left_i < right_i <= 1000",
        "hints": "Sort pairs by end value. Use a greedy approach: always pick the pair with the smallest end that starts after the last picked pair ends.",
        "starter_code": {
            "python": "class Solution:\n    def findLongestChain(self, pairs: list[list[int]]) -> int:\n        pass",
            "javascript": "var findLongestChain = function(pairs) {\n    \n};",
            "java": "class Solution {\n    public int findLongestChain(int[][] pairs) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findLongestChain(vector<vector<int>>& pairs) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2],[2,3],[3,4]]", "expected_output": "2", "is_sample": True},
            {"input": "[[1,2],[7,8],[4,5]]", "expected_output": "3", "is_sample": True},
            {"input": "[[-1,0],[0,1],[1,2]]", "expected_output": "2", "is_sample": False},
        ],
    },
    # ─── 22. Number of Longest Increasing Subsequence ───────────────────────
    {
        "title": "Number of Longest Increasing Subsequence",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "array"],
        "companies": ["meta", "google", "amazon", "uber"],
        "description": "Given an integer array `nums`, return the number of longest increasing subsequences. Notice that the sequence has to be strictly increasing.\n\nExample 1:\nInput: nums = [1,3,5,4,7]\nOutput: 2\nExplanation: The two longest increasing subsequences are [1,3,4,7] and [1,3,5,7].\n\nExample 2:\nInput: nums = [2,2,2,2,2]\nOutput: 5",
        "constraints": "1 <= nums.length <= 2000\n-10^6 <= nums[i] <= 10^6",
        "hints": "Use two arrays: length[i] for the LIS length ending at i, and count[i] for the number of LIS ending at i. Combine them to find the total count.",
        "starter_code": {
            "python": "class Solution:\n    def findNumberOfLIS(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var findNumberOfLIS = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int findNumberOfLIS(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findNumberOfLIS(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,3,5,4,7]", "expected_output": "2", "is_sample": True},
            {"input": "[2,2,2,2,2]", "expected_output": "5", "is_sample": True},
            {"input": "[1,2,3]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 23. Russian Doll Envelopes ─────────────────────────────────────────
    {
        "title": "Russian Doll Envelopes",
        "difficulty": "hard",
        "tags": ["dynamic-programming", "binary-search", "array"],
        "companies": ["google", "microsoft", "amazon", "uber"],
        "description": "You are given a 2D array of integers `envelopes` where `envelopes[i] = [w_i, h_i]` represents the width and height of an envelope. One envelope can fit into another if and only if both the width and height of one envelope are greater than the other. Return the maximum number of envelopes you can Russian doll (put one inside the other).\n\nExample 1:\nInput: envelopes = [[5,4],[6,4],[6,7],[2,3]]\nOutput: 3\nExplanation: The maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7]).\n\nExample 2:\nInput: envelopes = [[1,1],[1,1],[1,1]]\nOutput: 1",
        "constraints": "1 <= envelopes.length <= 10^5\nenvelopes[i].length == 2\n1 <= w_i, h_i <= 10^5",
        "hints": "Sort by width ascending, then by height descending (for same width). Then find the Longest Increasing Subsequence on heights using binary search for O(n log n).",
        "starter_code": {
            "python": "class Solution:\n    def maxEnvelopes(self, envelopes: list[list[int]]) -> int:\n        pass",
            "javascript": "var maxEnvelopes = function(envelopes) {\n    \n};",
            "java": "class Solution {\n    public int maxEnvelopes(int[][] envelopes) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxEnvelopes(vector<vector<int>>& envelopes) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[5,4],[6,4],[6,7],[2,3]]", "expected_output": "3", "is_sample": True},
            {"input": "[[1,1],[1,1],[1,1]]", "expected_output": "1", "is_sample": True},
            {"input": "[[1,2],[2,3],[3,4]]", "expected_output": "3", "is_sample": False},
        ],
    },
    # ─── 24. Best Time to Buy and Sell Stock with Cooldown ──────────────────
    {
        "title": "Best Time to Buy and Sell Stock with Cooldown",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "array"],
        "companies": ["amazon", "google", "meta", "linkedin"],
        "description": "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day. Find the maximum profit you can achieve. You may complete as many transactions as you like with the following restriction: after you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).\n\nExample 1:\nInput: prices = [1,2,3,0,2]\nOutput: 3\nExplanation: transactions = [buy, sell, cooldown, buy, sell]\n\nExample 2:\nInput: prices = [1]\nOutput: 0",
        "constraints": "1 <= prices.length <= 5000\n0 <= prices[i] <= 1000",
        "hints": "Use state machine DP with three states: held (holding stock), sold (just sold), rest (cooldown/idle). Transition between states each day.",
        "starter_code": {
            "python": "class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        pass",
            "javascript": "var maxProfit = function(prices) {\n    \n};",
            "java": "class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,0,2]", "expected_output": "3", "is_sample": True},
            {"input": "[1]", "expected_output": "0", "is_sample": True},
            {"input": "[1,2,4]", "expected_output": "3", "is_sample": False},
        ],
    },
    # ─── 25. Best Time to Buy and Sell Stock III ────────────────────────────
    {
        "title": "Best Time to Buy and Sell Stock III",
        "difficulty": "hard",
        "tags": ["dynamic-programming", "array"],
        "companies": ["amazon", "google", "microsoft", "uber"],
        "description": "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day. Find the maximum profit you can achieve. You may complete at most two transactions. You may not engage in multiple transactions simultaneously (you must sell before you buy again).\n\nExample 1:\nInput: prices = [3,3,5,0,0,3,1,4]\nOutput: 6\nExplanation: Buy on day 4 (price=0) and sell on day 6 (price=3), profit=3. Then buy on day 7 (price=1) and sell on day 8 (price=4), profit=3.\n\nExample 2:\nInput: prices = [1,2,3,4,5]\nOutput: 4",
        "constraints": "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^5",
        "hints": "Track four states: buy1, sell1, buy2, sell2. Update them in order each day. buy1 = max(buy1, -price), sell1 = max(sell1, buy1 + price), etc.",
        "starter_code": {
            "python": "class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        pass",
            "javascript": "var maxProfit = function(prices) {\n    \n};",
            "java": "class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,3,5,0,0,3,1,4]", "expected_output": "6", "is_sample": True},
            {"input": "[1,2,3,4,5]", "expected_output": "4", "is_sample": True},
            {"input": "[7,6,4,3,1]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 26. Best Time to Buy and Sell Stock IV ─────────────────────────────
    {
        "title": "Best Time to Buy and Sell Stock IV",
        "difficulty": "hard",
        "tags": ["dynamic-programming", "array"],
        "companies": ["amazon", "google", "meta", "bytedance"],
        "description": "You are given an integer `k` and an array `prices` where `prices[i]` is the price of a given stock on the `i`th day. Find the maximum profit you can achieve. You may complete at most `k` transactions.\n\nExample 1:\nInput: k = 2, prices = [2,4,1]\nOutput: 2\nExplanation: Buy on day 1 (price=2) and sell on day 2 (price=4), profit = 2.\n\nExample 2:\nInput: k = 2, prices = [3,2,6,5,0,3]\nOutput: 7\nExplanation: Buy on day 2 (price=2), sell on day 3 (price=6). Buy on day 5 (price=0), sell on day 6 (price=3).",
        "constraints": "1 <= k <= 100\n1 <= prices.length <= 1000\n0 <= prices[i] <= 1000",
        "hints": "Generalize Stock III to k transactions. Use dp[t][d] for max profit using at most t transactions up to day d. When k >= n/2, it becomes the unlimited transactions case.",
        "starter_code": {
            "python": "class Solution:\n    def maxProfit(self, k: int, prices: list[int]) -> int:\n        pass",
            "javascript": "var maxProfit = function(k, prices) {\n    \n};",
            "java": "class Solution {\n    public int maxProfit(int k, int[] prices) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxProfit(int k, vector<int>& prices) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "2\n[2,4,1]", "expected_output": "2", "is_sample": True},
            {"input": "2\n[3,2,6,5,0,3]", "expected_output": "7", "is_sample": True},
            {"input": "1\n[1,2]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 27. Maximum Profit in Job Scheduling ───────────────────────────────
    {
        "title": "Maximum Profit in Job Scheduling",
        "difficulty": "hard",
        "tags": ["dynamic-programming", "binary-search", "array"],
        "companies": ["doordash", "amazon", "google", "airbnb"],
        "description": "We have `n` jobs, where every job is scheduled to be done from `startTime[i]` to `endTime[i]`, obtaining a profit of `profit[i]`. Return the maximum profit you can take such that there are no two jobs in the subset with overlapping time range.\n\nExample 1:\nInput: startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]\nOutput: 120\nExplanation: Take jobs 1 and 4 for a profit of 50 + 70 = 120.\n\nExample 2:\nInput: startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]\nOutput: 150",
        "constraints": "1 <= startTime.length == endTime.length == profit.length <= 5 * 10^4\n1 <= startTime[i] < endTime[i] <= 10^9\n1 <= profit[i] <= 10^4",
        "hints": "Sort jobs by end time. For each job, binary search for the latest non-overlapping job. dp[i] = max(dp[i-1], profit[i] + dp[last_non_overlapping]).",
        "starter_code": {
            "python": "class Solution:\n    def jobScheduling(self, startTime: list[int], endTime: list[int], profit: list[int]) -> int:\n        pass",
            "javascript": "var jobScheduling = function(startTime, endTime, profit) {\n    \n};",
            "java": "class Solution {\n    public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int jobScheduling(vector<int>& startTime, vector<int>& endTime, vector<int>& profit) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,3]\n[3,4,5,6]\n[50,10,40,70]", "expected_output": "120", "is_sample": True},
            {"input": "[1,2,3,4,6]\n[3,5,10,6,9]\n[20,20,100,70,60]", "expected_output": "150", "is_sample": True},
            {"input": "[1]\n[2]\n[5]", "expected_output": "5", "is_sample": False},
        ],
    },
    # ─── 28. Jump Game II ───────────────────────────────────────────────────
    {
        "title": "Jump Game II",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "greedy", "array"],
        "companies": ["amazon", "microsoft", "google", "apple"],
        "description": "You are given a 0-indexed array of integers `nums` of length `n`. You are initially positioned at `nums[0]`. Each element `nums[i]` represents the maximum length of a forward jump from index `i`. Return the minimum number of jumps to reach `nums[n - 1]`. It is guaranteed that you can reach `nums[n - 1]`.\n\nExample 1:\nInput: nums = [2,3,1,1,4]\nOutput: 2\nExplanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.\n\nExample 2:\nInput: nums = [2,3,0,1,4]\nOutput: 2",
        "constraints": "1 <= nums.length <= 10^4\n0 <= nums[i] <= 1000\nIt's guaranteed that you can reach nums[n - 1].",
        "hints": "Use a greedy BFS-like approach: track the farthest reachable position in the current jump range. When you reach the end of the current range, increment jumps.",
        "starter_code": {
            "python": "class Solution:\n    def jump(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var jump = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int jump(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int jump(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,3,1,1,4]", "expected_output": "2", "is_sample": True},
            {"input": "[2,3,0,1,4]", "expected_output": "2", "is_sample": True},
            {"input": "[1]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 29. Stone Game ─────────────────────────────────────────────────────
    {
        "title": "Stone Game",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "math", "array"],
        "companies": ["google", "adobe", "amazon"],
        "description": "Alice and Bob play a game with piles of stones. There are an even number of piles arranged in a row, and each pile has a positive number of stones `piles[i]`. The objective is to end with the most stones. Alice and Bob take turns, with Alice starting first. Each turn, a player takes the entire pile from either the beginning or the end of the row. Return true if Alice wins.\n\nExample 1:\nInput: piles = [5,3,4,5]\nOutput: true\nExplanation: Alice starts first and takes 5 from the end, then Bob takes 3, Alice takes 5, Bob takes 4. Alice wins 10 to 7.\n\nExample 2:\nInput: piles = [3,7,2,3]\nOutput: true",
        "constraints": "2 <= piles.length <= 500\npiles.length is even.\n1 <= piles[i] <= 500\nsum(piles[i]) is odd.",
        "hints": "Use interval DP where dp[i][j] represents the maximum score difference the current player can achieve from piles[i..j]. Alternatively, note that Alice can always win by choosing all even-indexed or all odd-indexed piles.",
        "starter_code": {
            "python": "class Solution:\n    def stoneGame(self, piles: list[int]) -> bool:\n        pass",
            "javascript": "var stoneGame = function(piles) {\n    \n};",
            "java": "class Solution {\n    public boolean stoneGame(int[] piles) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool stoneGame(vector<int>& piles) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[5,3,4,5]", "expected_output": "true", "is_sample": True},
            {"input": "[3,7,2,3]", "expected_output": "true", "is_sample": True},
            {"input": "[1,2]", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 30. Predict the Winner ─────────────────────────────────────────────
    {
        "title": "Predict the Winner",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "array"],
        "companies": ["google", "amazon", "linkedin"],
        "description": "You are given an integer array `nums`. Two players take turns picking a number from either end of the array. Player 1 picks first. Return true if Player 1 can win or draw (score >= Player 2's score).\n\nExample 1:\nInput: nums = [1,5,2]\nOutput: false\nExplanation: Player 1 picks 1 or 2. If 1: Player 2 picks 5, Player 1 picks 2. Scores: 3 vs 5. If 2: Player 2 picks 5, Player 1 picks 1. Scores: 3 vs 5.\n\nExample 2:\nInput: nums = [1,5,233,7]\nOutput: true",
        "constraints": "1 <= nums.length <= 20\n0 <= nums[i] <= 10^7",
        "hints": "Use interval DP where dp[i][j] is the max score difference the current player can achieve from nums[i..j]. dp[i][j] = max(nums[i] - dp[i+1][j], nums[j] - dp[i][j-1]).",
        "starter_code": {
            "python": "class Solution:\n    def predictTheWinner(self, nums: list[int]) -> bool:\n        pass",
            "javascript": "var predictTheWinner = function(nums) {\n    \n};",
            "java": "class Solution {\n    public boolean predictTheWinner(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool predictTheWinner(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,5,2]", "expected_output": "false", "is_sample": True},
            {"input": "[1,5,233,7]", "expected_output": "true", "is_sample": True},
            {"input": "[0]", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 31. Palindrome Partitioning II ─────────────────────────────────────
    {
        "title": "Palindrome Partitioning II",
        "difficulty": "hard",
        "tags": ["dynamic-programming", "string"],
        "companies": ["google", "amazon", "meta"],
        "description": "Given a string `s`, return the minimum cuts needed for a palindrome partitioning of `s`. A palindrome partitioning is a partitioning where every substring of the partition is a palindrome.\n\nExample 1:\nInput: s = \"aab\"\nOutput: 1\nExplanation: The palindrome partitioning [\"aa\",\"b\"] could be produced using 1 cut.\n\nExample 2:\nInput: s = \"a\"\nOutput: 0",
        "constraints": "1 <= s.length <= 2000\ns consists of lowercase English letters only.",
        "hints": "First precompute a 2D table of which substrings are palindromes. Then use dp[i] = min cuts needed for s[0..i]. For each palindrome ending at i, dp[i] = min(dp[j-1] + 1).",
        "starter_code": {
            "python": "class Solution:\n    def minCut(self, s: str) -> int:\n        pass",
            "javascript": "var minCut = function(s) {\n    \n};",
            "java": "class Solution {\n    public int minCut(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minCut(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"aab\"", "expected_output": "1", "is_sample": True},
            {"input": "\"a\"", "expected_output": "0", "is_sample": True},
            {"input": "\"aba\"", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 32. Longest Palindromic Subsequence ────────────────────────────────
    {
        "title": "Longest Palindromic Subsequence",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "string"],
        "companies": ["amazon", "linkedin", "uber", "spotify"],
        "description": "Given a string `s`, find the longest palindromic subsequence's length in `s`. A subsequence does not need to be contiguous.\n\nExample 1:\nInput: s = \"bbbab\"\nOutput: 4\nExplanation: One possible longest palindromic subsequence is \"bbbb\".\n\nExample 2:\nInput: s = \"cbbd\"\nOutput: 2\nExplanation: One possible longest palindromic subsequence is \"bb\".",
        "constraints": "1 <= s.length <= 1000\ns consists only of lowercase English letters.",
        "hints": "Use 2D DP where dp[i][j] is the LPS length of s[i..j]. If s[i]==s[j], dp[i][j] = dp[i+1][j-1] + 2, else max(dp[i+1][j], dp[i][j-1]). Alternatively, find LCS of s and reverse(s).",
        "starter_code": {
            "python": "class Solution:\n    def longestPalindromeSubseq(self, s: str) -> int:\n        pass",
            "javascript": "var longestPalindromeSubseq = function(s) {\n    \n};",
            "java": "class Solution {\n    public int longestPalindromeSubseq(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int longestPalindromeSubseq(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"bbbab\"", "expected_output": "4", "is_sample": True},
            {"input": "\"cbbd\"", "expected_output": "2", "is_sample": True},
            {"input": "\"a\"", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 33. Count Different Palindromic Subsequences ───────────────────────
    {
        "title": "Count Different Palindromic Subsequences",
        "difficulty": "hard",
        "tags": ["dynamic-programming", "string"],
        "companies": ["google", "meta", "amazon"],
        "description": "Given a string `s`, return the number of different non-empty palindromic subsequences in `s`. Since the answer may be very large, return it modulo 10^9 + 7. A subsequence of a string is obtained by deleting zero or more characters.\n\nExample 1:\nInput: s = \"bccb\"\nOutput: 6\nExplanation: The 6 different non-empty palindromic subsequences are: \"b\", \"c\", \"bb\", \"cc\", \"bcb\", \"bccb\".\n\nExample 2:\nInput: s = \"abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba\"\nOutput: 104860361",
        "constraints": "1 <= s.length <= 1000\ns[i] is either 'a', 'b', 'c', or 'd'.",
        "hints": "Use interval DP on dp[i][j]. For each character c in {a,b,c,d}, find the first and last occurrence of c in s[i..j] and use them to define sub-problems.",
        "starter_code": {
            "python": "class Solution:\n    def countPalindromicSubsequences(self, s: str) -> int:\n        pass",
            "javascript": "var countPalindromicSubsequences = function(s) {\n    \n};",
            "java": "class Solution {\n    public int countPalindromicSubsequences(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int countPalindromicSubsequences(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"bccb\"", "expected_output": "6", "is_sample": True},
            {"input": "\"abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba\"", "expected_output": "104860361", "is_sample": True},
            {"input": "\"a\"", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 34. Paint House ────────────────────────────────────────────────────
    {
        "title": "Paint House",
        "difficulty": "easy",
        "tags": ["dynamic-programming", "array"],
        "companies": ["linkedin", "google", "meta", "snap"],
        "description": "There are `n` houses in a row. Each house can be painted with one of three colors: red, blue, or green. The cost of painting each house with a certain color is represented by an `n x 3` cost matrix `costs`. No two adjacent houses can have the same color. Return the minimum cost to paint all houses.\n\nExample 1:\nInput: costs = [[17,2,17],[16,16,5],[14,3,19]]\nOutput: 10\nExplanation: Paint house 0 blue (2), house 1 green (5), house 2 blue (3). Total = 10.\n\nExample 2:\nInput: costs = [[7,6,2]]\nOutput: 2",
        "constraints": "costs.length == n\ncosts[i].length == 3\n1 <= n <= 100\n1 <= costs[i][j] <= 20",
        "hints": "Use DP where dp[i][c] = min cost to paint houses 0..i with house i colored c. dp[i][c] = costs[i][c] + min(dp[i-1][other colors]).",
        "starter_code": {
            "python": "class Solution:\n    def minCost(self, costs: list[list[int]]) -> int:\n        pass",
            "javascript": "var minCost = function(costs) {\n    \n};",
            "java": "class Solution {\n    public int minCost(int[][] costs) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minCost(vector<vector<int>>& costs) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[17,2,17],[16,16,5],[14,3,19]]", "expected_output": "10", "is_sample": True},
            {"input": "[[7,6,2]]", "expected_output": "2", "is_sample": True},
            {"input": "[[5,8,6],[19,14,13],[7,5,12],[14,15,17],[3,20,10]]", "expected_output": "43", "is_sample": False},
        ],
    },
    # ─── 35. Paint Fence ────────────────────────────────────────────────────
    {
        "title": "Paint Fence",
        "difficulty": "easy",
        "tags": ["dynamic-programming"],
        "companies": ["google", "meta", "shopify"],
        "description": "You are painting a fence of `n` posts with `k` different colors. You must ensure that no more than two adjacent fence posts have the same color. Return the total number of ways you can paint the fence.\n\nExample 1:\nInput: n = 3, k = 2\nOutput: 6\nExplanation: All possible ways: (1,1,2), (1,2,1), (1,2,2), (2,1,1), (2,1,2), (2,2,1).\n\nExample 2:\nInput: n = 1, k = 1\nOutput: 1",
        "constraints": "1 <= n <= 50\n1 <= k <= 10^5\nThe answer is guaranteed to be in the range [0, 2^31 - 1].",
        "hints": "Track two states: same (last two posts same color) and diff (last two posts different color). same = diff_prev, diff = (same_prev + diff_prev) * (k - 1).",
        "starter_code": {
            "python": "class Solution:\n    def numWays(self, n: int, k: int) -> int:\n        pass",
            "javascript": "var numWays = function(n, k) {\n    \n};",
            "java": "class Solution {\n    public int numWays(int n, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int numWays(int n, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "3\n2", "expected_output": "6", "is_sample": True},
            {"input": "1\n1", "expected_output": "1", "is_sample": True},
            {"input": "2\n3", "expected_output": "9", "is_sample": False},
        ],
    },
    # ─── 36. Frog Jump ──────────────────────────────────────────────────────
    {
        "title": "Frog Jump",
        "difficulty": "hard",
        "tags": ["dynamic-programming", "hash-table"],
        "companies": ["amazon", "microsoft", "apple", "snap"],
        "description": "A frog is crossing a river. The river is divided into some number of units, and at each unit, there may or may not exist a stone. The frog can jump on a stone, but it must not jump into the water. Given a list of `stones` positions in sorted ascending order, determine if the frog can cross the river by landing on the last stone. Initially, the frog is on the first stone and assumes the first jump must be 1 unit. If the frog's last jump was `k` units, its next jump must be either `k - 1`, `k`, or `k + 1` units.\n\nExample 1:\nInput: stones = [0,1,3,5,6,8,12,17]\nOutput: true\nExplanation: The frog can jump to the last stone by jumping 1 unit to the 2nd stone, then 2 units to the 3rd stone, then 2 units to the 4th stone, then 3 units to the 6th stone, 4 units to the 7th stone, and 5 units to the 8th stone.\n\nExample 2:\nInput: stones = [0,1,2,3,4,8,9,11]\nOutput: false",
        "constraints": "2 <= stones.length <= 2000\n0 <= stones[i] <= 2^31 - 1\nstones[0] == 0\nstones is sorted in a strictly increasing order.",
        "hints": "Use a hash map from stone position to the set of jump sizes that can reach it. For each stone and each valid jump size, try jumps of k-1, k, k+1 to the next stones.",
        "starter_code": {
            "python": "class Solution:\n    def canCross(self, stones: list[int]) -> bool:\n        pass",
            "javascript": "var canCross = function(stones) {\n    \n};",
            "java": "class Solution {\n    public boolean canCross(int[] stones) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool canCross(vector<int>& stones) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[0,1,3,5,6,8,12,17]", "expected_output": "true", "is_sample": True},
            {"input": "[0,1,2,3,4,8,9,11]", "expected_output": "false", "is_sample": True},
            {"input": "[0,1]", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 37. Maximal Rectangle ──────────────────────────────────────────────
    {
        "title": "Maximal Rectangle",
        "difficulty": "hard",
        "tags": ["dynamic-programming", "matrix", "array"],
        "companies": ["google", "amazon", "microsoft", "uber"],
        "description": "Given a `rows x cols` binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.\n\nExample 1:\nInput: matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]\nOutput: 6\nExplanation: The maximal rectangle is highlighted with area = 6.\n\nExample 2:\nInput: matrix = [[\"0\"]]\nOutput: 0",
        "constraints": "rows == matrix.length\ncols == matrix[i].length\n1 <= rows, cols <= 200\nmatrix[i][j] is '0' or '1'.",
        "hints": "Build a histogram of heights for each row and apply the largest rectangle in histogram algorithm on each row. Use a stack-based approach for O(n) per row.",
        "starter_code": {
            "python": "class Solution:\n    def maximalRectangle(self, matrix: list[list[str]]) -> int:\n        pass",
            "javascript": "var maximalRectangle = function(matrix) {\n    \n};",
            "java": "class Solution {\n    public int maximalRectangle(char[][] matrix) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maximalRectangle(vector<vector<char>>& matrix) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]", "expected_output": "6", "is_sample": True},
            {"input": "[[\"0\"]]", "expected_output": "0", "is_sample": True},
            {"input": "[[\"1\"]]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 38. Dungeon Game ───────────────────────────────────────────────────
    {
        "title": "Dungeon Game",
        "difficulty": "hard",
        "tags": ["dynamic-programming", "matrix"],
        "companies": ["google", "microsoft", "amazon", "palantir"],
        "description": "The demons had captured the princess and imprisoned her in the bottom-right corner of a `dungeon`. A knight starts at the top-left room and must fight through the dungeon to rescue the princess. Each room contains an integer: negative numbers deal damage, positive numbers give health. The knight has an initial health point. Find the minimum initial health so the knight can reach the princess, ensuring his health never drops to 0 or below at any point.\n\nExample 1:\nInput: dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]\nOutput: 7\nExplanation: The knight needs at least 7 HP: path -2 -> -3 -> 3 -> 1 -> -5 requires 7 to survive.\n\nExample 2:\nInput: dungeon = [[0]]\nOutput: 1",
        "constraints": "m == dungeon.length\nn == dungeon[i].length\n1 <= m, n <= 200\n-1000 <= dungeon[i][j] <= 1000",
        "hints": "Work backwards from the bottom-right corner. dp[i][j] = minimum health needed entering room (i,j). dp[i][j] = max(1, min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j]).",
        "starter_code": {
            "python": "class Solution:\n    def calculateMinimumHP(self, dungeon: list[list[int]]) -> int:\n        pass",
            "javascript": "var calculateMinimumHP = function(dungeon) {\n    \n};",
            "java": "class Solution {\n    public int calculateMinimumHP(int[][] dungeon) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int calculateMinimumHP(vector<vector<int>>& dungeon) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[-2,-3,3],[-5,-10,1],[10,30,-5]]", "expected_output": "7", "is_sample": True},
            {"input": "[[0]]", "expected_output": "1", "is_sample": True},
            {"input": "[[100]]", "expected_output": "1", "is_sample": False},
        ],
    },
]

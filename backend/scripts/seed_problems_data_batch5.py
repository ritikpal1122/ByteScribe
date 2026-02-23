"""Batch 5: Heap, Trie, Union Find, BFS/DFS advanced (~38 with company labels)."""

PROBLEMS_BATCH5 = [
    # ─── 1. Kth Largest Element in an Array ────────────────────────────────
    {
        "title": "Kth Largest Element in an Array",
        "difficulty": "easy",
        "tags": ["array", "heap"],
        "companies": ["meta", "amazon", "google", "microsoft"],
        "description": "Given an integer array `nums` and an integer `k`, return the kth largest element in the array. Note that it is the kth largest element in sorted order, not the kth distinct element.\n\nExample 1:\nInput: nums = [3,2,1,5,6,4], k = 2\nOutput: 5\n\nExample 2:\nInput: nums = [3,2,3,1,2,4,5,5,6], k = 4\nOutput: 4",
        "constraints": "1 <= k <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
        "hints": "Use a min-heap of size k. The top of the heap will be the kth largest element.",
        "starter_code": {
            "python": "class Solution:\n    def findKthLargest(self, nums: list[int], k: int) -> int:\n        pass",
            "javascript": "var findKthLargest = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,2,1,5,6,4]\n2", "expected_output": "5", "is_sample": True},
            {"input": "[3,2,3,1,2,4,5,5,6]\n4", "expected_output": "4", "is_sample": True},
            {"input": "[1]\n1", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 2. Find K Pairs with Smallest Sums ────────────────────────────────
    {
        "title": "Find K Pairs with Smallest Sums",
        "difficulty": "medium",
        "tags": ["array", "heap"],
        "companies": ["google", "amazon", "uber"],
        "description": "You are given two integer arrays `nums1` and `nums2` sorted in non-decreasing order and an integer `k`. Return the `k` pairs `(u, v)` with the smallest sums where `u` is from `nums1` and `v` is from `nums2`.\n\nExample 1:\nInput: nums1 = [1,7,11], nums2 = [2,4,6], k = 3\nOutput: [[1,2],[1,4],[1,6]]\n\nExample 2:\nInput: nums1 = [1,1,2], nums2 = [1,2,3], k = 2\nOutput: [[1,1],[1,1]]",
        "constraints": "1 <= nums1.length, nums2.length <= 10^5\n-10^9 <= nums1[i], nums2[i] <= 10^9\nnums1 and nums2 are sorted in non-decreasing order.\n1 <= k <= 10^4",
        "hints": "Use a min-heap. Start by pushing pairs (nums1[i], nums2[0]) for all i, then pop and push the next pair from nums2.",
        "starter_code": {
            "python": "class Solution:\n    def kSmallestPairs(self, nums1: list[int], nums2: list[int], k: int) -> list[list[int]]:\n        pass",
            "javascript": "var kSmallestPairs = function(nums1, nums2, k) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> kSmallestPairs(vector<int>& nums1, vector<int>& nums2, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,7,11]\n[2,4,6]\n3", "expected_output": "[[1,2],[1,4],[1,6]]", "is_sample": True},
            {"input": "[1,1,2]\n[1,2,3]\n2", "expected_output": "[[1,1],[1,1]]", "is_sample": True},
            {"input": "[1,2]\n[3]\n3", "expected_output": "[[1,3],[2,3]]", "is_sample": False},
        ],
    },
    # ─── 3. Task Scheduler ─────────────────────────────────────────────────
    {
        "title": "Task Scheduler",
        "difficulty": "medium",
        "tags": ["array", "heap", "greedy"],
        "companies": ["meta", "amazon", "microsoft", "google"],
        "description": "Given a characters array `tasks` representing CPU tasks and an integer `n` representing the cooldown interval between two same tasks, return the least number of units of times the CPU will take to finish all the given tasks.\n\nExample 1:\nInput: tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2\nOutput: 8\nExplanation: A -> B -> idle -> A -> B -> idle -> A -> B\n\nExample 2:\nInput: tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 0\nOutput: 6",
        "constraints": "1 <= tasks.length <= 10^4\ntasks[i] is an uppercase English letter.\n0 <= n <= 100",
        "hints": "The answer is max(tasks.length, (maxFreq - 1) * (n + 1) + countOfMaxFreq). Think about filling slots around the most frequent task.",
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
    # ─── 4. Reorganize String ──────────────────────────────────────────────
    {
        "title": "Reorganize String",
        "difficulty": "medium",
        "tags": ["string", "heap", "greedy"],
        "companies": ["amazon", "google", "meta"],
        "description": "Given a string `s`, rearrange the characters so that no two adjacent characters are the same. If not possible, return an empty string.\n\nExample 1:\nInput: s = \"aab\"\nOutput: \"aba\"\n\nExample 2:\nInput: s = \"aaab\"\nOutput: \"\"",
        "constraints": "1 <= s.length <= 500\ns consists of lowercase English letters.",
        "hints": "Use a max-heap to always place the most frequent character. After placing one, push the previous character back if it still has remaining count.",
        "starter_code": {
            "python": "class Solution:\n    def reorganizeString(self, s: str) -> str:\n        pass",
            "javascript": "var reorganizeString = function(s) {\n    \n};",
            "java": "class Solution {\n    public String reorganizeString(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string reorganizeString(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"aab\"", "expected_output": "\"aba\"", "is_sample": True},
            {"input": "\"aaab\"", "expected_output": "\"\"", "is_sample": True},
            {"input": "\"vvvlo\"", "expected_output": "\"vlvov\"", "is_sample": False},
        ],
    },
    # ─── 5. Sort Characters By Frequency ───────────────────────────────────
    {
        "title": "Sort Characters By Frequency",
        "difficulty": "easy",
        "tags": ["string", "hash-table", "heap"],
        "companies": ["amazon", "microsoft", "bloomberg"],
        "description": "Given a string `s`, sort it in decreasing order based on the frequency of the characters. If there are multiple answers, return any of them.\n\nExample 1:\nInput: s = \"tree\"\nOutput: \"eert\"\nExplanation: 'e' appears twice while 'r' and 't' both appear once. So 'e' must appear before both 'r' and 't'.\n\nExample 2:\nInput: s = \"cccaaa\"\nOutput: \"aaaccc\"",
        "constraints": "1 <= s.length <= 5 * 10^5\ns consists of uppercase and lowercase English letters and digits.",
        "hints": "Count character frequencies with a hash map, then use a max-heap or bucket sort to order by frequency.",
        "starter_code": {
            "python": "class Solution:\n    def frequencySort(self, s: str) -> str:\n        pass",
            "javascript": "var frequencySort = function(s) {\n    \n};",
            "java": "class Solution {\n    public String frequencySort(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string frequencySort(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"tree\"", "expected_output": "\"eert\"", "is_sample": True},
            {"input": "\"cccaaa\"", "expected_output": "\"aaaccc\"", "is_sample": True},
            {"input": "\"Aabb\"", "expected_output": "\"bbAa\"", "is_sample": False},
        ],
    },
    # ─── 6. K Closest Points to Origin ─────────────────────────────────────
    {
        "title": "K Closest Points to Origin",
        "difficulty": "easy",
        "tags": ["array", "heap", "sorting"],
        "companies": ["meta", "amazon", "google", "linkedin"],
        "description": "Given an array of `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane and an integer `k`, return the `k` closest points to the origin `(0, 0)`. The answer is guaranteed to be unique.\n\nExample 1:\nInput: points = [[1,3],[-2,2]], k = 1\nOutput: [[-2,2]]\n\nExample 2:\nInput: points = [[3,3],[5,-1],[-2,4]], k = 2\nOutput: [[3,3],[-2,4]]",
        "constraints": "1 <= k <= points.length <= 10^4\n-10^4 <= xi, yi <= 10^4",
        "hints": "Use a max-heap of size k based on distance. Alternatively, use quickselect for O(n) average time.",
        "starter_code": {
            "python": "class Solution:\n    def kClosest(self, points: list[list[int]], k: int) -> list[list[int]]:\n        pass",
            "javascript": "var kClosest = function(points, k) {\n    \n};",
            "java": "class Solution {\n    public int[][] kClosest(int[][] points, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,3],[-2,2]]\n1", "expected_output": "[[-2,2]]", "is_sample": True},
            {"input": "[[3,3],[5,-1],[-2,4]]\n2", "expected_output": "[[3,3],[-2,4]]", "is_sample": True},
            {"input": "[[0,1],[1,0]]\n2", "expected_output": "[[0,1],[1,0]]", "is_sample": False},
        ],
    },
    # ─── 7. Sliding Window Maximum ─────────────────────────────────────────
    {
        "title": "Sliding Window Maximum",
        "difficulty": "hard",
        "tags": ["array", "heap", "sliding-window", "monotonic-stack"],
        "companies": ["google", "amazon", "microsoft", "bytedance"],
        "description": "You are given an array of integers `nums` and a sliding window of size `k` which moves from the very left to the very right. Return the max value in each window position.\n\nExample 1:\nInput: nums = [1,3,-1,-3,5,3,6,7], k = 3\nOutput: [3,3,5,5,6,7]\n\nExample 2:\nInput: nums = [1], k = 1\nOutput: [1]",
        "constraints": "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4\n1 <= k <= nums.length",
        "hints": "Use a monotonic deque that stores indices in decreasing order of their values. Remove indices that fall outside the window.",
        "starter_code": {
            "python": "class Solution:\n    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:\n        pass",
            "javascript": "var maxSlidingWindow = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,3,-1,-3,5,3,6,7]\n3", "expected_output": "[3,3,5,5,6,7]", "is_sample": True},
            {"input": "[1]\n1", "expected_output": "[1]", "is_sample": True},
            {"input": "[1,-1]\n1", "expected_output": "[1,-1]", "is_sample": False},
        ],
    },
    # ─── 8. Ugly Number II ─────────────────────────────────────────────────
    {
        "title": "Ugly Number II",
        "difficulty": "easy",
        "tags": ["heap", "math", "dynamic-programming"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5. Given an integer `n`, return the nth ugly number.\n\nExample 1:\nInput: n = 10\nOutput: 12\nExplanation: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers.\n\nExample 2:\nInput: n = 1\nOutput: 1",
        "constraints": "1 <= n <= 1690",
        "hints": "Use three pointers for multiples of 2, 3, and 5. At each step, pick the minimum and advance the corresponding pointer(s).",
        "starter_code": {
            "python": "class Solution:\n    def nthUglyNumber(self, n: int) -> int:\n        pass",
            "javascript": "var nthUglyNumber = function(n) {\n    \n};",
            "java": "class Solution {\n    public int nthUglyNumber(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int nthUglyNumber(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "10", "expected_output": "12", "is_sample": True},
            {"input": "1", "expected_output": "1", "is_sample": True},
            {"input": "15", "expected_output": "24", "is_sample": False},
        ],
    },
    # ─── 9. Super Ugly Number ──────────────────────────────────────────────
    {
        "title": "Super Ugly Number",
        "difficulty": "medium",
        "tags": ["array", "heap", "math"],
        "companies": ["google", "amazon"],
        "description": "A super ugly number is a positive integer whose prime factors are in the array `primes`. Given an integer `n` and an array `primes`, return the nth super ugly number.\n\nExample 1:\nInput: n = 12, primes = [2,7,13,19]\nOutput: 32\nExplanation: [1,2,4,7,8,13,14,16,19,26,28,32] is the sequence of the first 12 super ugly numbers.\n\nExample 2:\nInput: n = 1, primes = [2,3,5]\nOutput: 1",
        "constraints": "1 <= n <= 10^5\n1 <= primes.length <= 100\n2 <= primes[i] <= 1000\nprimes[i] is guaranteed to be a prime number.\nAll values of primes are unique and sorted in ascending order.",
        "hints": "Extend the Ugly Number II approach: maintain one pointer per prime factor and pick the minimum product at each step.",
        "starter_code": {
            "python": "class Solution:\n    def nthSuperUglyNumber(self, n: int, primes: list[int]) -> int:\n        pass",
            "javascript": "var nthSuperUglyNumber = function(n, primes) {\n    \n};",
            "java": "class Solution {\n    public int nthSuperUglyNumber(int n, int[] primes) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int nthSuperUglyNumber(int n, vector<int>& primes) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "12\n[2,7,13,19]", "expected_output": "32", "is_sample": True},
            {"input": "1\n[2,3,5]", "expected_output": "1", "is_sample": True},
            {"input": "5\n[2,3]", "expected_output": "6", "is_sample": False},
        ],
    },
    # ─── 10. Find K-th Smallest Pair Distance ──────────────────────────────
    {
        "title": "Find K-th Smallest Pair Distance",
        "difficulty": "hard",
        "tags": ["array", "binary-search", "sorting"],
        "companies": ["google", "amazon", "uber"],
        "description": "The distance of a pair of integers `a` and `b` is defined as the absolute difference between `a` and `b`. Given an integer array `nums` and an integer `k`, return the kth smallest distance among all the pairs `nums[i]` and `nums[j]` where `0 <= i < j < nums.length`.\n\nExample 1:\nInput: nums = [1,3,1], k = 1\nOutput: 0\n\nExample 2:\nInput: nums = [1,1,1], k = 2\nOutput: 0",
        "constraints": "n == nums.length\n2 <= n <= 10^4\n0 <= nums[i] <= 10^6\n1 <= k <= n * (n - 1) / 2",
        "hints": "Binary search on the distance value. For a given distance mid, count how many pairs have distance <= mid using a two-pointer approach on the sorted array.",
        "starter_code": {
            "python": "class Solution:\n    def smallestDistancePair(self, nums: list[int], k: int) -> int:\n        pass",
            "javascript": "var smallestDistancePair = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public int smallestDistancePair(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int smallestDistancePair(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,3,1]\n1", "expected_output": "0", "is_sample": True},
            {"input": "[1,1,1]\n2", "expected_output": "0", "is_sample": True},
            {"input": "[1,6,1]\n3", "expected_output": "5", "is_sample": False},
        ],
    },
    # ─── 11. IPO ───────────────────────────────────────────────────────────
    {
        "title": "IPO",
        "difficulty": "hard",
        "tags": ["array", "heap", "greedy", "sorting"],
        "companies": ["google", "amazon", "bytedance"],
        "description": "You are given `n` projects where the ith project has a pure profit `profits[i]` and a minimum capital `capital[i]` is needed to start it. You have initial capital `w` and can finish at most `k` projects. Return the maximized final capital after finishing at most `k` projects.\n\nExample 1:\nInput: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]\nOutput: 4\nExplanation: Start with project 0 (capital=0, profit=1), then project 2 (capital=1, profit=3). Final capital = 0+1+3 = 4.\n\nExample 2:\nInput: k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]\nOutput: 6",
        "constraints": "1 <= k <= 10^5\n0 <= w <= 10^9\nn == profits.length == capital.length\n1 <= n <= 10^5\n0 <= profits[i] <= 10^4\n0 <= capital[i] <= 10^9",
        "hints": "Sort projects by capital. Use a max-heap for profits of projects you can afford. Greedily pick the most profitable available project each round.",
        "starter_code": {
            "python": "class Solution:\n    def findMaximizedCapital(self, k: int, w: int, profits: list[int], capital: list[int]) -> int:\n        pass",
            "javascript": "var findMaximizedCapital = function(k, w, profits, capital) {\n    \n};",
            "java": "class Solution {\n    public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "2\n0\n[1,2,3]\n[0,1,1]", "expected_output": "4", "is_sample": True},
            {"input": "3\n0\n[1,2,3]\n[0,1,2]", "expected_output": "6", "is_sample": True},
            {"input": "1\n0\n[1,2,3]\n[1,1,2]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 12. Smallest Range Covering Elements from K Lists ──────────────────
    {
        "title": "Smallest Range Covering Elements from K Lists",
        "difficulty": "hard",
        "tags": ["array", "heap", "sorting"],
        "companies": ["google", "amazon", "uber", "lyft"],
        "description": "You have `k` lists of sorted integers in non-decreasing order. Find the smallest range `[a, b]` that includes at least one number from each of the `k` lists.\n\nExample 1:\nInput: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]\nOutput: [20,24]\n\nExample 2:\nInput: nums = [[1,2,3],[1,2,3],[1,2,3]]\nOutput: [1,1]",
        "constraints": "nums.length == k\n1 <= k <= 3500\n1 <= nums[i].length <= 50\n-10^5 <= nums[i][j] <= 10^5\nnums[i] is sorted in non-decreasing order.",
        "hints": "Use a min-heap containing one element from each list. Track the current max. The range is [heap_min, current_max]. Advance the min element and update.",
        "starter_code": {
            "python": "class Solution:\n    def smallestRange(self, nums: list[list[int]]) -> list[int]:\n        pass",
            "javascript": "var smallestRange = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int[] smallestRange(List<List<Integer>> nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> smallestRange(vector<vector<int>>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]", "expected_output": "[20,24]", "is_sample": True},
            {"input": "[[1,2,3],[1,2,3],[1,2,3]]", "expected_output": "[1,1]", "is_sample": True},
            {"input": "[[10],[11]]", "expected_output": "[10,11]", "is_sample": False},
        ],
    },
    # ─── 13. Implement Trie II Prefix Count ────────────────────────────────
    {
        "title": "Implement Trie II Prefix Count",
        "difficulty": "medium",
        "tags": ["trie", "design", "string"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "Implement the `Trie` class with `insert(word)`, `countWordsEqualTo(word)`, `countWordsStartingWith(prefix)`, and `erase(word)` methods. Each method should work in O(n) time where n is the word length.\n\nExample 1:\nInput: [\"Trie\",\"insert\",\"insert\",\"countWordsEqualTo\",\"countWordsStartingWith\",\"erase\",\"countWordsEqualTo\",\"countWordsStartingWith\"]\n[[],[\"apple\"],[\"apple\"],[\"apple\"],[\"app\"],[\"apple\"],[\"apple\"],[\"app\"]]\nOutput: [null,null,null,2,2,null,1,1]",
        "constraints": "1 <= word.length, prefix.length <= 2000\nword and prefix consist only of lowercase English letters.\nAt most 3 * 10^4 calls in total will be made.\nFor erase, it is guaranteed that the word exists in the trie.",
        "hints": "Store two counters at each trie node: one for words passing through (prefix count) and one for words ending here (end count).",
        "starter_code": {
            "python": "class Trie:\n    def __init__(self):\n        pass\n\n    def insert(self, word: str) -> None:\n        pass\n\n    def countWordsEqualTo(self, word: str) -> int:\n        pass\n\n    def countWordsStartingWith(self, prefix: str) -> int:\n        pass\n\n    def erase(self, word: str) -> None:\n        pass",
            "javascript": "var Trie = function() {\n    \n};\n\nTrie.prototype.insert = function(word) {\n    \n};\n\nTrie.prototype.countWordsEqualTo = function(word) {\n    \n};\n\nTrie.prototype.countWordsStartingWith = function(prefix) {\n    \n};\n\nTrie.prototype.erase = function(word) {\n    \n};",
            "java": "class Trie {\n    public Trie() {\n        \n    }\n    public void insert(String word) {\n        \n    }\n    public int countWordsEqualTo(String word) {\n        \n    }\n    public int countWordsStartingWith(String prefix) {\n        \n    }\n    public void erase(String word) {\n        \n    }\n}",
            "cpp": "class Trie {\npublic:\n    Trie() {\n        \n    }\n    void insert(string word) {\n        \n    }\n    int countWordsEqualTo(string word) {\n        \n    }\n    int countWordsStartingWith(string prefix) {\n        \n    }\n    void erase(string word) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"Trie\",\"insert\",\"insert\",\"countWordsEqualTo\",\"countWordsStartingWith\"]\n[[],[\"apple\"],[\"apple\"],[\"apple\"],[\"app\"]]", "expected_output": "[null,null,null,2,2]", "is_sample": True},
            {"input": "[\"Trie\",\"insert\",\"countWordsEqualTo\",\"erase\",\"countWordsEqualTo\"]\n[[],[\"hello\"],[\"hello\"],[\"hello\"],[\"hello\"]]", "expected_output": "[null,null,1,null,0]", "is_sample": True},
            {"input": "[\"Trie\",\"insert\",\"insert\",\"countWordsStartingWith\",\"erase\",\"countWordsStartingWith\"]\n[[],[\"app\"],[\"apple\"],[\"app\"],[\"app\"],[\"app\"]]", "expected_output": "[null,null,null,2,null,1]", "is_sample": False},
        ],
    },
    # ─── 14. Replace Words ─────────────────────────────────────────────────
    {
        "title": "Replace Words",
        "difficulty": "medium",
        "tags": ["string", "trie", "hash-table"],
        "companies": ["uber", "amazon", "google"],
        "description": "Given a `dictionary` of root words and a `sentence`, replace all successors in the sentence with the root forming it. If a successor can be replaced by more than one root, replace it with the root that has the shortest length.\n\nExample 1:\nInput: dictionary = [\"cat\",\"bat\",\"rat\"], sentence = \"the cattle was rattled by the battery\"\nOutput: \"the cat was rat by the bat\"\n\nExample 2:\nInput: dictionary = [\"a\",\"b\",\"c\"], sentence = \"aadsfasf absbs bbab cadsfabd\"\nOutput: \"a]a b c\"",
        "constraints": "1 <= dictionary.length <= 1000\n1 <= dictionary[i].length <= 100\ndictionary[i] consists of only lowercase letters.\n1 <= sentence.length <= 10^6\nsentence consists of only lowercase letters and spaces.",
        "hints": "Build a trie from the dictionary. For each word in the sentence, walk the trie to find the shortest matching root.",
        "starter_code": {
            "python": "class Solution:\n    def replaceWords(self, dictionary: list[str], sentence: str) -> str:\n        pass",
            "javascript": "var replaceWords = function(dictionary, sentence) {\n    \n};",
            "java": "class Solution {\n    public String replaceWords(List<String> dictionary, String sentence) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string replaceWords(vector<string>& dictionary, string sentence) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"cat\",\"bat\",\"rat\"]\n\"the cattle was rattled by the battery\"", "expected_output": "\"the cat was rat by the bat\"", "is_sample": True},
            {"input": "[\"a\",\"b\",\"c\"]\n\"aadsfasf absbs bbab cadsfabd\"", "expected_output": "\"a a b c\"", "is_sample": True},
            {"input": "[\"ac\",\"ab\"]\n\"it is abnormal that this solution is accepted\"", "expected_output": "\"it is ab that this solution is ac\"", "is_sample": False},
        ],
    },
    # ─── 15. Map Sum Pairs ─────────────────────────────────────────────────
    {
        "title": "Map Sum Pairs",
        "difficulty": "medium",
        "tags": ["trie", "design", "hash-table"],
        "companies": ["google", "apple", "microsoft"],
        "description": "Design a map that receives a `(key, value)` pair and returns the sum of all values whose key starts with a given prefix via `sum(prefix)`. Implement `insert(key, val)` and `sum(prefix)`.\n\nExample 1:\nInput: [\"MapSum\",\"insert\",\"sum\",\"insert\",\"sum\"]\n[[],[\"apple\",3],[\"ap\"],[\"app\",2],[\"ap\"]]\nOutput: [null,null,3,null,5]",
        "constraints": "1 <= key.length, prefix.length <= 50\nkey and prefix consist only of lowercase English letters.\n1 <= val <= 1000\nAt most 50 calls will be made to insert and sum.",
        "hints": "Use a trie where each node stores the sum of values for all words passing through it. When inserting a key that already exists, update the delta.",
        "starter_code": {
            "python": "class MapSum:\n    def __init__(self):\n        pass\n\n    def insert(self, key: str, val: int) -> None:\n        pass\n\n    def sum(self, prefix: str) -> int:\n        pass",
            "javascript": "var MapSum = function() {\n    \n};\n\nMapSum.prototype.insert = function(key, val) {\n    \n};\n\nMapSum.prototype.sum = function(prefix) {\n    \n};",
            "java": "class MapSum {\n    public MapSum() {\n        \n    }\n    public void insert(String key, int val) {\n        \n    }\n    public int sum(String prefix) {\n        \n    }\n}",
            "cpp": "class MapSum {\npublic:\n    MapSum() {\n        \n    }\n    void insert(string key, int val) {\n        \n    }\n    int sum(string prefix) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"MapSum\",\"insert\",\"sum\",\"insert\",\"sum\"]\n[[],[\"apple\",3],[\"ap\"],[\"app\",2],[\"ap\"]]", "expected_output": "[null,null,3,null,5]", "is_sample": True},
            {"input": "[\"MapSum\",\"insert\",\"sum\"]\n[[],[\"a\",3],[\"ap\"]]", "expected_output": "[null,null,0]", "is_sample": True},
            {"input": "[\"MapSum\",\"insert\",\"insert\",\"sum\"]\n[[],[\"apple\",3],[\"apple\",5],[\"ap\"]]", "expected_output": "[null,null,null,5]", "is_sample": False},
        ],
    },
    # ─── 16. Design Search Autocomplete System ─────────────────────────────
    {
        "title": "Design Search Autocomplete System",
        "difficulty": "hard",
        "tags": ["trie", "design", "string", "heap"],
        "companies": ["google", "amazon", "microsoft", "lyft"],
        "description": "Design a search autocomplete system. Given historical sentences and their times, implement `AutocompleteSystem(sentences, times)` and `input(c)`. For each character input, return the top 3 hot sentences that have the same prefix. '#' means the sentence ends.\n\nExample 1:\nInput: [\"AutocompleteSystem\",\"input\",\"input\",\"input\",\"input\"]\n[[[\"i love you\",\"island\",\"iroman\",\"i love leetcode\"],[5,3,2,2]],[\"i\"],[\" \"],[\"a\"],[\"#\"]]\nOutput: [null,[\"i love you\",\"island\",\"i love leetcode\"],[\"i love you\",\"i love leetcode\"],[],[]]",
        "constraints": "n == sentences.length == times.length\n1 <= n <= 100\n1 <= sentences[i].length <= 100\n1 <= times[i] <= 50\nc is a lowercase English letter, a hash '#', or space ' '.\nAt most 5000 calls will be made to input.",
        "hints": "Build a trie storing sentence frequencies. On each input character, traverse the trie and collect all sentences below the current node, then return the top 3 by frequency (break ties alphabetically).",
        "starter_code": {
            "python": "class AutocompleteSystem:\n    def __init__(self, sentences: list[str], times: list[int]):\n        pass\n\n    def input(self, c: str) -> list[str]:\n        pass",
            "javascript": "var AutocompleteSystem = function(sentences, times) {\n    \n};\n\nAutocompleteSystem.prototype.input = function(c) {\n    \n};",
            "java": "class AutocompleteSystem {\n    public AutocompleteSystem(String[] sentences, int[] times) {\n        \n    }\n    public List<String> input(char c) {\n        \n    }\n}",
            "cpp": "class AutocompleteSystem {\npublic:\n    AutocompleteSystem(vector<string>& sentences, vector<int>& times) {\n        \n    }\n    vector<string> input(char c) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"AutocompleteSystem\",\"input\",\"input\",\"input\",\"input\"]\n[[[\"i love you\",\"island\",\"iroman\",\"i love leetcode\"],[5,3,2,2]],[\"i\"],[\" \"],[\"a\"],[\"#\"]]", "expected_output": "[null,[\"i love you\",\"island\",\"i love leetcode\"],[\"i love you\",\"i love leetcode\"],[],[]]", "is_sample": True},
            {"input": "[\"AutocompleteSystem\",\"input\",\"input\"]\n[[[\"abc\",\"abd\"],[3,3]],[\"a\"],[\"b\"]]", "expected_output": "[null,[\"abc\",\"abd\"],[\"abc\",\"abd\"]]", "is_sample": True},
            {"input": "[\"AutocompleteSystem\",\"input\",\"input\"]\n[[[\"hello\"],[1]],[\"z\"],[\"#\"]]", "expected_output": "[null,[],[]]", "is_sample": False},
        ],
    },
    # ─── 17. Longest Word in Dictionary ────────────────────────────────────
    {
        "title": "Longest Word in Dictionary",
        "difficulty": "easy",
        "tags": ["string", "trie", "sorting"],
        "companies": ["google", "amazon"],
        "description": "Given an array of strings `words` representing a dictionary, return the longest word that can be built one character at a time by other words in `words`. If multiple answers exist, return the one that is smallest in lexicographical order.\n\nExample 1:\nInput: words = [\"w\",\"wo\",\"wor\",\"worl\",\"world\"]\nOutput: \"world\"\n\nExample 2:\nInput: words = [\"a\",\"banana\",\"app\",\"appl\",\"ap\",\"apply\",\"apple\"]\nOutput: \"apple\"",
        "constraints": "1 <= words.length <= 1000\n1 <= words[i].length <= 30\nwords[i] consists of lowercase English letters.",
        "hints": "Sort words by length (and lexicographically for ties). Use a set to track valid words and only add a word if its prefix (word minus last char) is in the set.",
        "starter_code": {
            "python": "class Solution:\n    def longestWord(self, words: list[str]) -> str:\n        pass",
            "javascript": "var longestWord = function(words) {\n    \n};",
            "java": "class Solution {\n    public String longestWord(String[] words) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string longestWord(vector<string>& words) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"w\",\"wo\",\"wor\",\"worl\",\"world\"]", "expected_output": "\"world\"", "is_sample": True},
            {"input": "[\"a\",\"banana\",\"app\",\"appl\",\"ap\",\"apply\",\"apple\"]", "expected_output": "\"apple\"", "is_sample": True},
            {"input": "[\"b\",\"br\",\"bre\",\"brea\",\"break\",\"breakf\",\"breakfast\"]", "expected_output": "\"breakfast\"", "is_sample": False},
        ],
    },
    # ─── 18. Palindrome Pairs ──────────────────────────────────────────────
    {
        "title": "Palindrome Pairs",
        "difficulty": "hard",
        "tags": ["string", "trie", "hash-table"],
        "companies": ["airbnb", "google", "amazon"],
        "description": "You are given a list of unique words. Return all pairs of distinct indices `(i, j)` such that the concatenation of `words[i] + words[j]` is a palindrome.\n\nExample 1:\nInput: words = [\"abcd\",\"dcba\",\"lls\",\"s\",\"sssll\"]\nOutput: [[0,1],[1,0],[3,2],[2,4]]\n\nExample 2:\nInput: words = [\"bat\",\"tab\",\"cat\"]\nOutput: [[0,1],[1,0]]",
        "constraints": "1 <= words.length <= 5000\n0 <= words[i].length <= 300\nwords[i] consists of lowercase English letters.",
        "hints": "Build a trie of reversed words. For each word, traverse the trie and check for palindrome suffixes/prefixes at matching points.",
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
    # ─── 19. Maximum XOR of Two Numbers in Array ───────────────────────────
    {
        "title": "Maximum XOR of Two Numbers in Array",
        "difficulty": "medium",
        "tags": ["array", "trie", "bit-manipulation"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "Given an integer array `nums`, return the maximum result of `nums[i] XOR nums[j]`, where `0 <= i <= j < n`.\n\nExample 1:\nInput: nums = [3,10,5,25,2,8]\nOutput: 28\nExplanation: The maximum result is 5 XOR 25 = 28.\n\nExample 2:\nInput: nums = [14,70,53,83,49,91,36,80,92,51,66,70]\nOutput: 127",
        "constraints": "1 <= nums.length <= 2 * 10^5\n0 <= nums[i] <= 2^31 - 1",
        "hints": "Build a bitwise trie of all numbers. For each number, greedily traverse the trie choosing the opposite bit at each level to maximize XOR.",
        "starter_code": {
            "python": "class Solution:\n    def findMaximumXOR(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var findMaximumXOR = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int findMaximumXOR(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findMaximumXOR(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,10,5,25,2,8]", "expected_output": "28", "is_sample": True},
            {"input": "[14,70,53,83,49,91,36,80,92,51,66,70]", "expected_output": "127", "is_sample": True},
            {"input": "[0]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 20. Word Search II ────────────────────────────────────────────────
    {
        "title": "Word Search II",
        "difficulty": "hard",
        "tags": ["array", "trie", "backtracking", "matrix"],
        "companies": ["amazon", "microsoft", "google", "snap"],
        "description": "Given an `m x n` board of characters and a list of strings `words`, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells (horizontally or vertically neighboring), and the same cell may not be used more than once in a word.\n\nExample 1:\nInput: board = [[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]], words = [\"oath\",\"pea\",\"eat\",\"rain\"]\nOutput: [\"eat\",\"oath\"]\n\nExample 2:\nInput: board = [[\"a\",\"b\"],[\"c\",\"d\"]], words = [\"abcb\"]\nOutput: []",
        "constraints": "m == board.length\nn == board[i].length\n1 <= m, n <= 12\nboard[i][j] is a lowercase English letter.\n1 <= words.length <= 3 * 10^4\n1 <= words[i].length <= 10\nwords[i] consists of lowercase English letters.\nAll the strings of words are unique.",
        "hints": "Build a trie from the words list. DFS from each cell on the board, traversing the trie simultaneously. Prune branches once a trie node has no children left.",
        "starter_code": {
            "python": "class Solution:\n    def findWords(self, board: list[list[str]], words: list[str]) -> list[str]:\n        pass",
            "javascript": "var findWords = function(board, words) {\n    \n};",
            "java": "class Solution {\n    public List<String> findWords(char[][] board, String[] words) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[\"o\",\"a\",\"a\",\"n\"],[\"e\",\"t\",\"a\",\"e\"],[\"i\",\"h\",\"k\",\"r\"],[\"i\",\"f\",\"l\",\"v\"]]\n[\"oath\",\"pea\",\"eat\",\"rain\"]", "expected_output": "[\"eat\",\"oath\"]", "is_sample": True},
            {"input": "[[\"a\",\"b\"],[\"c\",\"d\"]]\n[\"abcb\"]", "expected_output": "[]", "is_sample": True},
            {"input": "[[\"a\"]]\n[\"a\"]", "expected_output": "[\"a\"]", "is_sample": False},
        ],
    },
    # ─── 21. Number of Provinces ───────────────────────────────────────────
    {
        "title": "Number of Provinces",
        "difficulty": "easy",
        "tags": ["graph", "union-find"],
        "companies": ["amazon", "microsoft", "meta", "bytedance"],
        "description": "There are `n` cities. Some of them are connected, while some are not. A province is a group of directly or indirectly connected cities. Given an `n x n` matrix `isConnected` where `isConnected[i][j] = 1` means city `i` and city `j` are directly connected, return the total number of provinces.\n\nExample 1:\nInput: isConnected = [[1,1,0],[1,1,0],[0,0,1]]\nOutput: 2\n\nExample 2:\nInput: isConnected = [[1,0,0],[0,1,0],[0,0,1]]\nOutput: 3",
        "constraints": "1 <= n <= 200\nn == isConnected.length\nn == isConnected[i].length\nisConnected[i][j] is 1 or 0.\nisConnected[i][i] == 1\nisConnected[i][j] == isConnected[j][i]",
        "hints": "Use Union-Find: for each connected pair (i, j), union them. The answer is the number of distinct roots. Alternatively, use DFS/BFS to count connected components.",
        "starter_code": {
            "python": "class Solution:\n    def findCircleNum(self, isConnected: list[list[int]]) -> int:\n        pass",
            "javascript": "var findCircleNum = function(isConnected) {\n    \n};",
            "java": "class Solution {\n    public int findCircleNum(int[][] isConnected) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findCircleNum(vector<vector<int>>& isConnected) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,1,0],[1,1,0],[0,0,1]]", "expected_output": "2", "is_sample": True},
            {"input": "[[1,0,0],[0,1,0],[0,0,1]]", "expected_output": "3", "is_sample": True},
            {"input": "[[1,1,1],[1,1,1],[1,1,1]]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 22. Redundant Connection ──────────────────────────────────────────
    {
        "title": "Redundant Connection",
        "difficulty": "easy",
        "tags": ["graph", "union-find"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "Given a graph that started as a tree with `n` nodes and has one additional edge added, return the edge that can be removed so the result is a tree. If there are multiple answers, return the edge that occurs last in the input.\n\nExample 1:\nInput: edges = [[1,2],[1,3],[2,3]]\nOutput: [2,3]\n\nExample 2:\nInput: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]\nOutput: [1,4]",
        "constraints": "n == edges.length\n3 <= n <= 1000\nedges[i].length == 2\n1 <= ai < bi <= edges.length\nai != bi\nThere are no repeated edges.\nThe given graph is connected.",
        "hints": "Process edges in order using Union-Find. The first edge that connects two already-connected nodes is the redundant connection.",
        "starter_code": {
            "python": "class Solution:\n    def findRedundantConnection(self, edges: list[list[int]]) -> list[int]:\n        pass",
            "javascript": "var findRedundantConnection = function(edges) {\n    \n};",
            "java": "class Solution {\n    public int[] findRedundantConnection(int[][] edges) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> findRedundantConnection(vector<vector<int>>& edges) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2],[1,3],[2,3]]", "expected_output": "[2,3]", "is_sample": True},
            {"input": "[[1,2],[2,3],[3,4],[1,4],[1,5]]", "expected_output": "[1,4]", "is_sample": True},
            {"input": "[[1,2],[2,3],[1,3]]", "expected_output": "[1,3]", "is_sample": False},
        ],
    },
    # ─── 23. Most Stones Removed ───────────────────────────────────────────
    {
        "title": "Most Stones Removed with Same Row or Column",
        "difficulty": "medium",
        "tags": ["graph", "union-find"],
        "companies": ["google", "amazon", "uber"],
        "description": "On a 2D plane, we place `n` stones at some integer coordinate points. A stone can be removed if it shares a row or column with another stone that has not been removed. Return the largest possible number of stones that can be removed.\n\nExample 1:\nInput: stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]\nOutput: 5\n\nExample 2:\nInput: stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]\nOutput: 3",
        "constraints": "1 <= stones.length <= 1000\n0 <= xi, yi <= 10^4\nNo two stones are at the same coordinate point.",
        "hints": "Stones that share a row or column belong to the same connected component. The answer is n - number_of_connected_components. Use Union-Find to group stones.",
        "starter_code": {
            "python": "class Solution:\n    def removeStones(self, stones: list[list[int]]) -> int:\n        pass",
            "javascript": "var removeStones = function(stones) {\n    \n};",
            "java": "class Solution {\n    public int removeStones(int[][] stones) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int removeStones(vector<vector<int>>& stones) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]", "expected_output": "5", "is_sample": True},
            {"input": "[[0,0],[0,2],[1,1],[2,0],[2,2]]", "expected_output": "3", "is_sample": True},
            {"input": "[[0,0]]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 24. Satisfiability of Equality Equations ──────────────────────────
    {
        "title": "Satisfiability of Equality Equations",
        "difficulty": "medium",
        "tags": ["string", "union-find", "graph"],
        "companies": ["microsoft", "google", "bytedance"],
        "description": "Given an array of strings `equations` where each equation `equations[i]` is of length 4 in the form `\"xi==yi\"` or `\"xi!=yi\"`, determine if it is possible to assign integers to variables to satisfy all the given equations.\n\nExample 1:\nInput: equations = [\"a==b\",\"b!=a\"]\nOutput: false\n\nExample 2:\nInput: equations = [\"b==a\",\"a==b\"]\nOutput: true",
        "constraints": "1 <= equations.length <= 500\nequations[i].length == 4\nequations[i][0] is a lowercase letter.\nequations[i][1] is either '=' or '!'.\nequations[i][2] is either '=' or '!'.\nequations[i][3] is a lowercase letter.",
        "hints": "First pass: union all variables connected by '=='. Second pass: check all '!=' equations; if both variables share the same root, return false.",
        "starter_code": {
            "python": "class Solution:\n    def equationsPossible(self, equations: list[str]) -> bool:\n        pass",
            "javascript": "var equationsPossible = function(equations) {\n    \n};",
            "java": "class Solution {\n    public boolean equationsPossible(String[] equations) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool equationsPossible(vector<string>& equations) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"a==b\",\"b!=a\"]", "expected_output": "false", "is_sample": True},
            {"input": "[\"b==a\",\"a==b\"]", "expected_output": "true", "is_sample": True},
            {"input": "[\"a==b\",\"b==c\",\"a==c\"]", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 25. Smallest String With Swaps ────────────────────────────────────
    {
        "title": "Smallest String With Swaps",
        "difficulty": "medium",
        "tags": ["string", "union-find", "sorting"],
        "companies": ["amazon", "google", "microsoft"],
        "description": "Given a string `s` and an array of pairs `pairs` where `pairs[i] = [a, b]` indicates you can swap characters at index `a` and `b` any number of times, return the lexicographically smallest string possible.\n\nExample 1:\nInput: s = \"dcab\", pairs = [[0,3],[1,2]]\nOutput: \"bacd\"\n\nExample 2:\nInput: s = \"dcab\", pairs = [[0,3],[1,2],[0,2]]\nOutput: \"abcd\"",
        "constraints": "1 <= s.length <= 10^5\n0 <= pairs.length <= 10^5\n0 <= pairs[i][0], pairs[i][1] < s.length\ns only contains lowercase English letters.",
        "hints": "Use Union-Find to group indices that can swap with each other. Within each group, sort the characters and assign them back to sorted indices.",
        "starter_code": {
            "python": "class Solution:\n    def smallestStringWithSwaps(self, s: str, pairs: list[list[int]]) -> str:\n        pass",
            "javascript": "var smallestStringWithSwaps = function(s, pairs) {\n    \n};",
            "java": "class Solution {\n    public String smallestStringWithSwaps(String s, List<List<Integer>> pairs) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string smallestStringWithSwaps(string s, vector<vector<int>>& pairs) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"dcab\"\n[[0,3],[1,2]]", "expected_output": "\"bacd\"", "is_sample": True},
            {"input": "\"dcab\"\n[[0,3],[1,2],[0,2]]", "expected_output": "\"abcd\"", "is_sample": True},
            {"input": "\"cba\"\n[[0,1],[1,2]]", "expected_output": "\"abc\"", "is_sample": False},
        ],
    },
    # ─── 26. Number of Operations to Make Network Connected ────────────────
    {
        "title": "Number of Operations to Make Network Connected",
        "difficulty": "medium",
        "tags": ["graph", "union-find"],
        "companies": ["microsoft", "amazon", "google"],
        "description": "There are `n` computers numbered from `0` to `n - 1` connected by ethernet cables forming a network. Given `connections` where `connections[i] = [ai, bi]` represents a cable between computers `ai` and `bi`, return the minimum number of times you need to remove a cable and place it between any pair of disconnected computers to make all computers connected. If it is not possible, return -1.\n\nExample 1:\nInput: n = 4, connections = [[0,1],[0,2],[1,2]]\nOutput: 1\n\nExample 2:\nInput: n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]\nOutput: 2",
        "constraints": "1 <= n <= 10^5\n1 <= connections.length <= min(n * (n - 1) / 2, 10^5)\nconnections[i].length == 2\n0 <= ai, bi < n\nai != bi\nThere are no repeated connections.",
        "hints": "You need at least n-1 cables total. Use Union-Find to count connected components. Extra cables (those forming cycles) can be reused. Answer is components - 1, or -1 if total cables < n-1.",
        "starter_code": {
            "python": "class Solution:\n    def makeConnected(self, n: int, connections: list[list[int]]) -> int:\n        pass",
            "javascript": "var makeConnected = function(n, connections) {\n    \n};",
            "java": "class Solution {\n    public int makeConnected(int n, int[][] connections) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int makeConnected(int n, vector<vector<int>>& connections) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "4\n[[0,1],[0,2],[1,2]]", "expected_output": "1", "is_sample": True},
            {"input": "6\n[[0,1],[0,2],[0,3],[1,2],[1,3]]", "expected_output": "2", "is_sample": True},
            {"input": "6\n[[0,1],[0,2],[0,3],[1,2]]", "expected_output": "-1", "is_sample": False},
        ],
    },
    # ─── 27. Walls and Gates ───────────────────────────────────────────────
    {
        "title": "Walls and Gates",
        "difficulty": "medium",
        "tags": ["graph", "matrix"],
        "companies": ["meta", "google", "amazon", "doordash"],
        "description": "You are given an `m x n` grid `rooms` initialized with three possible values: -1 (wall), 0 (gate), or INF (2147483647, empty room). Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, leave it as INF.\n\nExample 1:\nInput: rooms = [[INF,-1,0,INF],[INF,INF,INF,-1],[INF,-1,INF,-1],[0,-1,INF,INF]]\nOutput: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]",
        "constraints": "m == rooms.length\nn == rooms[i].length\n1 <= m, n <= 250\nrooms[i][j] is -1, 0, or 2147483647.",
        "hints": "Start BFS from all gates simultaneously. This multi-source BFS naturally fills each empty room with the shortest distance to any gate.",
        "starter_code": {
            "python": "class Solution:\n    def wallsAndGates(self, rooms: list[list[int]]) -> None:\n        pass",
            "javascript": "var wallsAndGates = function(rooms) {\n    \n};",
            "java": "class Solution {\n    public void wallsAndGates(int[][] rooms) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void wallsAndGates(vector<vector<int>>& rooms) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]", "expected_output": "[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]", "is_sample": True},
            {"input": "[[-1]]", "expected_output": "[[-1]]", "is_sample": True},
            {"input": "[[0]]", "expected_output": "[[0]]", "is_sample": False},
        ],
    },
    # ─── 28. Number of Distinct Islands ────────────────────────────────────
    {
        "title": "Number of Distinct Islands",
        "difficulty": "hard",
        "tags": ["graph", "matrix", "hash-table"],
        "companies": ["amazon", "google", "microsoft"],
        "description": "Given a non-empty 2D array `grid` of 0's and 1's, an island is a group of 1's connected 4-directionally. Count the number of distinct islands. Two islands are the same if one can be translated to match the other.\n\nExample 1:\nInput: grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]\nOutput: 1\n\nExample 2:\nInput: grid = [[1,1,0,1,1],[1,0,0,0,0],[0,0,0,0,1],[1,1,0,1,1]]\nOutput: 3",
        "constraints": "m == grid.length\nn == grid[i].length\n1 <= m, n <= 50\ngrid[i][j] is either 0 or 1.",
        "hints": "Use DFS to explore each island. Record the shape as a set of relative positions from the top-left cell. Store shapes in a set to count distinct ones.",
        "starter_code": {
            "python": "class Solution:\n    def numDistinctIslands(self, grid: list[list[int]]) -> int:\n        pass",
            "javascript": "var numDistinctIslands = function(grid) {\n    \n};",
            "java": "class Solution {\n    public int numDistinctIslands(int[][] grid) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int numDistinctIslands(vector<vector<int>>& grid) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]", "expected_output": "1", "is_sample": True},
            {"input": "[[1,1,0,1,1],[1,0,0,0,0],[0,0,0,0,1],[1,1,0,1,1]]", "expected_output": "3", "is_sample": True},
            {"input": "[[1,0],[0,1]]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 29. Count Sub Islands ─────────────────────────────────────────────
    {
        "title": "Count Sub Islands",
        "difficulty": "medium",
        "tags": ["graph", "matrix", "union-find"],
        "companies": ["amazon", "google", "uber"],
        "description": "You are given two `m x n` binary matrices `grid1` and `grid2`. An island in `grid2` is a sub-island if every cell of that island is also part of an island in `grid1`. Return the number of sub-islands in `grid2`.\n\nExample 1:\nInput: grid1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]], grid2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]\nOutput: 3\n\nExample 2:\nInput: grid1 = [[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[1,0,1,0,1]], grid2 = [[0,0,0,0,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0],[1,0,0,0,1]]\nOutput: 2",
        "constraints": "m == grid1.length == grid2.length\nn == grid1[i].length == grid2[i].length\n1 <= m, n <= 500\ngrid1[i][j] and grid2[i][j] are either 0 or 1.",
        "hints": "DFS each island in grid2. During DFS, if any cell is 0 in grid1, mark the island as not a sub-island. Count islands that are fully contained.",
        "starter_code": {
            "python": "class Solution:\n    def countSubIslands(self, grid1: list[list[int]], grid2: list[list[int]]) -> int:\n        pass",
            "javascript": "var countSubIslands = function(grid1, grid2) {\n    \n};",
            "java": "class Solution {\n    public int countSubIslands(int[][] grid1, int[][] grid2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int countSubIslands(vector<vector<int>>& grid1, vector<vector<int>>& grid2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]]\n[[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]", "expected_output": "3", "is_sample": True},
            {"input": "[[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[1,0,1,0,1]]\n[[0,0,0,0,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0],[1,0,0,0,1]]", "expected_output": "2", "is_sample": True},
            {"input": "[[1,1],[1,1]]\n[[1,1],[1,1]]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 30. Pacific Atlantic Water Flow ───────────────────────────────────
    {
        "title": "Pacific Atlantic Water Flow",
        "difficulty": "medium",
        "tags": ["graph", "matrix"],
        "companies": ["google", "amazon", "meta", "linkedin"],
        "description": "Given an `m x n` matrix of non-negative integers representing the height of each cell, water can flow to neighboring cells (up, down, left, right) if the neighbor's height is less than or equal to the current cell's height. Return a list of grid coordinates where water can flow to both the Pacific ocean (top and left edges) and the Atlantic ocean (bottom and right edges).\n\nExample 1:\nInput: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]\nOutput: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]\n\nExample 2:\nInput: heights = [[1]]\nOutput: [[0,0]]",
        "constraints": "m == heights.length\nn == heights[r].length\n1 <= m, n <= 200\n0 <= heights[r][c] <= 10^5",
        "hints": "Run BFS/DFS from all Pacific border cells and all Atlantic border cells separately (going uphill). The answer is the intersection of cells reachable from both.",
        "starter_code": {
            "python": "class Solution:\n    def pacificAtlantic(self, heights: list[list[int]]) -> list[list[int]]:\n        pass",
            "javascript": "var pacificAtlantic = function(heights) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> pacificAtlantic(int[][] heights) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", "expected_output": "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]", "is_sample": True},
            {"input": "[[1]]", "expected_output": "[[0,0]]", "is_sample": True},
            {"input": "[[10,10],[10,10]]", "expected_output": "[[0,0],[0,1],[1,0],[1,1]]", "is_sample": False},
        ],
    },
    # ─── 31. Snakes and Ladders ────────────────────────────────────────────
    {
        "title": "Snakes and Ladders",
        "difficulty": "medium",
        "tags": ["graph", "matrix"],
        "companies": ["amazon", "google", "uber"],
        "description": "You are given an `n x n` integer matrix `board` representing a Boustrophedon-style snakes and ladders board. Starting from square 1, return the minimum number of dice rolls to reach square n^2. If it is not possible, return -1. A value of -1 on the board means no snake or ladder at that square.\n\nExample 1:\nInput: board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]\nOutput: 4\n\nExample 2:\nInput: board = [[-1,-1],[-1,3]]\nOutput: 1",
        "constraints": "n == board.length == board[i].length\n2 <= n <= 20\n1 <= board[i][j] <= n^2 or board[i][j] == -1\nThe destination of at most one snake or ladder is square 1.",
        "hints": "Use BFS from square 1. For each position, try all 6 dice outcomes. Convert square numbers to board coordinates accounting for the Boustrophedon layout.",
        "starter_code": {
            "python": "class Solution:\n    def snakesAndLadders(self, board: list[list[int]]) -> int:\n        pass",
            "javascript": "var snakesAndLadders = function(board) {\n    \n};",
            "java": "class Solution {\n    public int snakesAndLadders(int[][] board) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int snakesAndLadders(vector<vector<int>>& board) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]", "expected_output": "4", "is_sample": True},
            {"input": "[[-1,-1],[-1,3]]", "expected_output": "1", "is_sample": True},
            {"input": "[[1,-1],[-1,-1]]", "expected_output": "-1", "is_sample": False},
        ],
    },
    # ─── 32. Minimum Knight Moves ──────────────────────────────────────────
    {
        "title": "Minimum Knight Moves",
        "difficulty": "medium",
        "tags": ["graph"],
        "companies": ["meta", "amazon", "google", "bytedance"],
        "description": "In an infinite chess board with coordinates from -infinity to +infinity, you have a knight at square `[0, 0]`. Return the minimum number of steps needed to move the knight to the square `[x, y]`. It is guaranteed the answer exists.\n\nExample 1:\nInput: x = 2, y = 1\nOutput: 1\n\nExample 2:\nInput: x = 5, y = 5\nOutput: 4",
        "constraints": "-300 <= x <= 300\n-300 <= y <= 300\n0 <= |x| + |y| <= 300",
        "hints": "Use BFS from (0, 0). By symmetry, you can work in the first quadrant (use absolute values of x and y). Consider bidirectional BFS for efficiency.",
        "starter_code": {
            "python": "class Solution:\n    def minKnightMoves(self, x: int, y: int) -> int:\n        pass",
            "javascript": "var minKnightMoves = function(x, y) {\n    \n};",
            "java": "class Solution {\n    public int minKnightMoves(int x, int y) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minKnightMoves(int x, int y) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "2\n1", "expected_output": "1", "is_sample": True},
            {"input": "5\n5", "expected_output": "4", "is_sample": True},
            {"input": "0\n0", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 33. Shortest Bridge ───────────────────────────────────────────────
    {
        "title": "Shortest Bridge",
        "difficulty": "medium",
        "tags": ["graph", "matrix"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "You are given an `n x n` binary matrix `grid` where 1 represents land and 0 represents water. There are exactly two islands. Return the smallest number of 0s you must flip to connect the two islands.\n\nExample 1:\nInput: grid = [[0,1],[1,0]]\nOutput: 1\n\nExample 2:\nInput: grid = [[0,1,0],[0,0,0],[0,0,1]]\nOutput: 2",
        "constraints": "n == grid.length == grid[i].length\n2 <= n <= 100\ngrid[i][j] is either 0 or 1.\nThere are exactly two islands in grid.",
        "hints": "Use DFS to find and mark one island. Then BFS from all cells of that island outward through water until you reach the other island. The BFS level is the answer.",
        "starter_code": {
            "python": "class Solution:\n    def shortestBridge(self, grid: list[list[int]]) -> int:\n        pass",
            "javascript": "var shortestBridge = function(grid) {\n    \n};",
            "java": "class Solution {\n    public int shortestBridge(int[][] grid) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int shortestBridge(vector<vector<int>>& grid) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[0,1],[1,0]]", "expected_output": "1", "is_sample": True},
            {"input": "[[0,1,0],[0,0,0],[0,0,1]]", "expected_output": "2", "is_sample": True},
            {"input": "[[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 34. Making A Large Island ─────────────────────────────────────────
    {
        "title": "Making A Large Island",
        "difficulty": "hard",
        "tags": ["graph", "matrix", "union-find"],
        "companies": ["google", "amazon", "meta", "uber"],
        "description": "You are given an `n x n` binary grid. You are allowed to change at most one 0 to a 1. Return the size of the largest island in `grid` after applying this operation. An island is a 4-directionally connected group of 1s.\n\nExample 1:\nInput: grid = [[1,0],[0,1]]\nOutput: 3\n\nExample 2:\nInput: grid = [[1,1],[1,0]]\nOutput: 4",
        "constraints": "n == grid.length\nn == grid[i].length\n1 <= n <= 500\ngrid[i][j] is either 0 or 1.",
        "hints": "Label each island with a unique id and record its size. For each 0-cell, check its 4 neighbors, sum up the sizes of distinct neighboring islands plus 1. Track the maximum.",
        "starter_code": {
            "python": "class Solution:\n    def largestIsland(self, grid: list[list[int]]) -> int:\n        pass",
            "javascript": "var largestIsland = function(grid) {\n    \n};",
            "java": "class Solution {\n    public int largestIsland(int[][] grid) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int largestIsland(vector<vector<int>>& grid) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,0],[0,1]]", "expected_output": "3", "is_sample": True},
            {"input": "[[1,1],[1,0]]", "expected_output": "4", "is_sample": True},
            {"input": "[[1,1],[1,1]]", "expected_output": "4", "is_sample": False},
        ],
    },
    # ─── 35. Minimum Obstacle Removal to Reach Corner ──────────────────────
    {
        "title": "Minimum Obstacle Removal to Reach Corner",
        "difficulty": "hard",
        "tags": ["graph", "matrix"],
        "companies": ["google", "amazon", "bytedance"],
        "description": "You are given a 0-indexed 2D integer array `grid` of size `m x n`. Each cell has a value: 0 (empty) or 1 (obstacle). You can move up, down, left, or right from and to an empty cell. Return the minimum number of obstacles to remove so you can move from the upper left corner `(0, 0)` to the lower right corner `(m - 1, n - 1)`.\n\nExample 1:\nInput: grid = [[0,1,1],[1,1,0],[1,1,0]]\nOutput: 2\n\nExample 2:\nInput: grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]]\nOutput: 0",
        "constraints": "m == grid.length\nn == grid[i].length\n1 <= m, n <= 10^5\n2 <= m * n <= 10^5\ngrid[i][j] is either 0 or 1.\ngrid[0][0] == grid[m - 1][n - 1] == 0",
        "hints": "Use a 0-1 BFS (deque-based). Moving to an empty cell has cost 0 (push front), removing an obstacle has cost 1 (push back).",
        "starter_code": {
            "python": "class Solution:\n    def minimumObstacles(self, grid: list[list[int]]) -> int:\n        pass",
            "javascript": "var minimumObstacles = function(grid) {\n    \n};",
            "java": "class Solution {\n    public int minimumObstacles(int[][] grid) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minimumObstacles(vector<vector<int>>& grid) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[0,1,1],[1,1,0],[1,1,0]]", "expected_output": "2", "is_sample": True},
            {"input": "[[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]]", "expected_output": "0", "is_sample": True},
            {"input": "[[0,0],[0,0]]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 36. Number of Enclaves ────────────────────────────────────────────
    {
        "title": "Number of Enclaves",
        "difficulty": "easy",
        "tags": ["graph", "matrix"],
        "companies": ["amazon", "google", "microsoft"],
        "description": "You are given an `m x n` binary matrix `grid`, where 0 represents sea and 1 represents land. A move consists of walking from one land cell to another adjacent (4-directional) land cell. Return the number of land cells in `grid` for which we cannot walk off the boundary of the grid in any number of moves.\n\nExample 1:\nInput: grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]\nOutput: 3\n\nExample 2:\nInput: grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]\nOutput: 0",
        "constraints": "m == grid.length\nn == grid[i].length\n1 <= m, n <= 500\ngrid[i][j] is either 0 or 1.",
        "hints": "DFS/BFS from all boundary land cells and mark them. Count the remaining unmarked land cells.",
        "starter_code": {
            "python": "class Solution:\n    def numEnclaves(self, grid: list[list[int]]) -> int:\n        pass",
            "javascript": "var numEnclaves = function(grid) {\n    \n};",
            "java": "class Solution {\n    public int numEnclaves(int[][] grid) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int numEnclaves(vector<vector<int>>& grid) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]", "expected_output": "3", "is_sample": True},
            {"input": "[[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]", "expected_output": "0", "is_sample": True},
            {"input": "[[0,0,0],[0,1,0],[0,0,0]]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 37. Max Area of Island ────────────────────────────────────────────
    {
        "title": "Max Area of Island",
        "difficulty": "easy",
        "tags": ["graph", "matrix"],
        "companies": ["amazon", "google", "meta", "linkedin"],
        "description": "You are given an `m x n` binary matrix `grid`. An island is a group of 1's connected 4-directionally. Return the maximum area of an island in `grid`. If there is no island, return 0.\n\nExample 1:\nInput: grid = [[0,0,1,0,0],[0,0,0,0,0],[0,1,1,0,0],[0,1,0,0,0]]\nOutput: 3\n\nExample 2:\nInput: grid = [[0,0,0,0,0]]\nOutput: 0",
        "constraints": "m == grid.length\nn == grid[i].length\n1 <= m, n <= 50\ngrid[i][j] is either 0 or 1.",
        "hints": "DFS or BFS from each unvisited land cell. Track the area of each island and return the maximum.",
        "starter_code": {
            "python": "class Solution:\n    def maxAreaOfIsland(self, grid: list[list[int]]) -> int:\n        pass",
            "javascript": "var maxAreaOfIsland = function(grid) {\n    \n};",
            "java": "class Solution {\n    public int maxAreaOfIsland(int[][] grid) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxAreaOfIsland(vector<vector<int>>& grid) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[0,0,1,0,0],[0,0,0,0,0],[0,1,1,0,0],[0,1,0,0,0]]", "expected_output": "3", "is_sample": True},
            {"input": "[[0,0,0,0,0]]", "expected_output": "0", "is_sample": True},
            {"input": "[[1,1],[1,1]]", "expected_output": "4", "is_sample": False},
        ],
    },
    # ─── 38. Flood Fill ────────────────────────────────────────────────────
    {
        "title": "Flood Fill",
        "difficulty": "easy",
        "tags": ["graph", "matrix"],
        "companies": ["amazon", "google", "microsoft"],
        "description": "An image is represented by an `m x n` integer grid `image` where `image[i][j]` represents the pixel value. Given a starting pixel `(sr, sc)` and a `color`, perform a flood fill: change the color of the starting pixel and all 4-directionally connected pixels of the same original color to the new color. Return the modified image.\n\nExample 1:\nInput: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2\nOutput: [[2,2,2],[2,2,0],[2,0,1]]\n\nExample 2:\nInput: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0\nOutput: [[0,0,0],[0,0,0]]",
        "constraints": "m == image.length\nn == image[i].length\n1 <= m, n <= 50\n0 <= image[i][j], color < 2^16\n0 <= sr < m\n0 <= sc < n",
        "hints": "Use DFS or BFS from (sr, sc). Only visit cells with the same original color. If the new color equals the original color, return immediately to avoid infinite loops.",
        "starter_code": {
            "python": "class Solution:\n    def floodFill(self, image: list[list[int]], sr: int, sc: int, color: int) -> list[list[int]]:\n        pass",
            "javascript": "var floodFill = function(image, sr, sc, color) {\n    \n};",
            "java": "class Solution {\n    public int[][] floodFill(int[][] image, int sr, int sc, int color) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,1,1],[1,1,0],[1,0,1]]\n1\n1\n2", "expected_output": "[[2,2,2],[2,2,0],[2,0,1]]", "is_sample": True},
            {"input": "[[0,0,0],[0,0,0]]\n0\n0\n0", "expected_output": "[[0,0,0],[0,0,0]]", "is_sample": True},
            {"input": "[[0,0,0],[0,1,1]]\n1\n1\n1", "expected_output": "[[0,0,0],[0,1,1]]", "is_sample": False},
        ],
    },
]

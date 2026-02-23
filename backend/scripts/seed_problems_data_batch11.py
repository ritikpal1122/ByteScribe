"""Batch 11: Binary Search, Sliding Window, Two Pointers, Sorting advanced (~40 with company labels)."""

PROBLEMS_BATCH11 = [
    # ─── 1. Find Peak Element ──────────────────────────────────────────
    {
        "title": "Find Peak Element",
        "difficulty": "medium",
        "tags": ["binary-search", "array"],
        "companies": ["google", "meta", "amazon"],
        "description": "A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array `nums`, find a peak element and return its index. If the array contains multiple peaks, return the index to any of the peaks. You may imagine that `nums[-1] = nums[n] = -infinity`.\n\nExample 1:\nInput: nums = [1,2,3,1]\nOutput: 2\nExplanation: 3 is a peak element and your function should return the index number 2.\n\nExample 2:\nInput: nums = [1,2,1,3,5,6,4]\nOutput: 5\nExplanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.",
        "constraints": "1 <= nums.length <= 1000\n-2^31 <= nums[i] <= 2^31 - 1\nnums[i] != nums[i + 1] for all valid i",
        "hints": "Use binary search. Compare mid with mid+1: if nums[mid] > nums[mid+1], a peak exists on the left half (including mid); otherwise on the right half.",
        "starter_code": {
            "python": "class Solution:\n    def findPeakElement(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var findPeakElement = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int findPeakElement(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findPeakElement(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,1]", "expected_output": "2", "is_sample": True},
            {"input": "[1,2,1,3,5,6,4]", "expected_output": "5", "is_sample": True},
            {"input": "[1]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 2. Peak Index in a Mountain Array ─────────────────────────────
    {
        "title": "Peak Index in a Mountain Array",
        "difficulty": "easy",
        "tags": ["binary-search", "array"],
        "companies": ["google", "amazon", "apple", "microsoft"],
        "description": "An array `arr` is a mountain array if `arr.length >= 3` and there exists some index `i` such that `arr[0] < arr[1] < ... < arr[i]` and `arr[i] > arr[i+1] > ... > arr[arr.length - 1]`. Given a mountain array, return the index `i`.\n\nExample 1:\nInput: arr = [0,1,0]\nOutput: 1\n\nExample 2:\nInput: arr = [0,10,5,2]\nOutput: 1",
        "constraints": "3 <= arr.length <= 10^5\n0 <= arr[i] <= 10^6\narr is guaranteed to be a mountain array.",
        "hints": "Use binary search. If arr[mid] < arr[mid+1], the peak is to the right; otherwise the peak is at mid or to the left.",
        "starter_code": {
            "python": "class Solution:\n    def peakIndexInMountainArray(self, arr: list[int]) -> int:\n        pass",
            "javascript": "var peakIndexInMountainArray = function(arr) {\n    \n};",
            "java": "class Solution {\n    public int peakIndexInMountainArray(int[] arr) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int peakIndexInMountainArray(vector<int>& arr) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[0,1,0]", "expected_output": "1", "is_sample": True},
            {"input": "[0,10,5,2]", "expected_output": "1", "is_sample": True},
            {"input": "[3,5,3,2,0]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 3. Longest Mountain in Array ──────────────────────────────────
    {
        "title": "Longest Mountain in Array",
        "difficulty": "medium",
        "tags": ["array", "two-pointers"],
        "companies": ["google", "amazon", "uber"],
        "description": "You may recall that an array `arr` is a mountain array if `arr.length >= 3` and there exists some index `i` such that `arr[0] < ... < arr[i] > ... > arr[arr.length - 1]`. Given an integer array `arr`, return the length of the longest subarray which is a mountain. Return 0 if there is no mountain subarray.\n\nExample 1:\nInput: arr = [2,1,4,7,3,2,5]\nOutput: 5\nExplanation: The largest mountain is [1,4,7,3,2] which has length 5.\n\nExample 2:\nInput: arr = [2,2,2]\nOutput: 0",
        "constraints": "1 <= arr.length <= 10^4\n0 <= arr[i] <= 10^4",
        "hints": "For each index, try to expand left (ascending) and right (descending). A valid mountain needs both sides to have length >= 1.",
        "starter_code": {
            "python": "class Solution:\n    def longestMountain(self, arr: list[int]) -> int:\n        pass",
            "javascript": "var longestMountain = function(arr) {\n    \n};",
            "java": "class Solution {\n    public int longestMountain(int[] arr) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int longestMountain(vector<int>& arr) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,1,4,7,3,2,5]", "expected_output": "5", "is_sample": True},
            {"input": "[2,2,2]", "expected_output": "0", "is_sample": True},
            {"input": "[0,1,2,3,4,5,4,3,2,1,0]", "expected_output": "11", "is_sample": False},
        ],
    },
    # ─── 4. First Bad Version ──────────────────────────────────────────
    {
        "title": "First Bad Version",
        "difficulty": "easy",
        "tags": ["binary-search"],
        "companies": ["meta", "google", "amazon"],
        "description": "You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad. You are given an API `bool isBadVersion(version)` which returns whether version is bad. Find the first bad version.\n\nExample 1:\nInput: n = 5, bad = 4\nOutput: 4\n\nExample 2:\nInput: n = 1, bad = 1\nOutput: 1",
        "constraints": "1 <= bad <= n <= 2^31 - 1",
        "hints": "Use binary search. If mid is bad, the first bad version is at mid or to the left. Otherwise it is to the right.",
        "starter_code": {
            "python": "class Solution:\n    def firstBadVersion(self, n: int) -> int:\n        pass",
            "javascript": "var solution = function(isBadVersion) {\n    return function(n) {\n        \n    };\n};",
            "java": "public class Solution extends VersionControl {\n    public int firstBadVersion(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int firstBadVersion(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "5\n4", "expected_output": "4", "is_sample": True},
            {"input": "1\n1", "expected_output": "1", "is_sample": True},
            {"input": "10\n3", "expected_output": "3", "is_sample": False},
        ],
    },
    # ─── 5. H-Index II ────────────────────────────────────────────────
    {
        "title": "H-Index II",
        "difficulty": "medium",
        "tags": ["binary-search", "array"],
        "companies": ["meta", "google", "amazon", "oracle"],
        "description": "Given an array of integers `citations` where `citations[i]` is the number of citations a researcher received for their `i`th paper and `citations` is sorted in ascending order, return the researcher's h-index. The h-index is the maximum value of `h` such that the researcher has published at least `h` papers that have each been cited at least `h` times.\n\nExample 1:\nInput: citations = [0,1,3,5,6]\nOutput: 3\n\nExample 2:\nInput: citations = [1,2,100]\nOutput: 2",
        "constraints": "n == citations.length\n1 <= n <= 10^5\n0 <= citations[i] <= 1000\ncitations is sorted in ascending order.",
        "hints": "Use binary search. For a given index mid, if citations[mid] >= n - mid, then h-index is at least n - mid.",
        "starter_code": {
            "python": "class Solution:\n    def hIndex(self, citations: list[int]) -> int:\n        pass",
            "javascript": "var hIndex = function(citations) {\n    \n};",
            "java": "class Solution {\n    public int hIndex(int[] citations) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int hIndex(vector<int>& citations) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[0,1,3,5,6]", "expected_output": "3", "is_sample": True},
            {"input": "[1,2,100]", "expected_output": "2", "is_sample": True},
            {"input": "[0]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 6. Find K Closest Elements ────────────────────────────────────
    {
        "title": "Find K Closest Elements",
        "difficulty": "medium",
        "tags": ["binary-search", "sorting", "two-pointers"],
        "companies": ["meta", "amazon", "google", "uber"],
        "description": "Given a sorted integer array `arr`, two integers `k` and `x`, return the `k` closest integers to `x` in the array. The result should also be sorted in ascending order. An integer `a` is closer to `x` than an integer `b` if `|a - x| < |b - x|`, or `|a - x| == |b - x|` and `a < b`.\n\nExample 1:\nInput: arr = [1,2,3,4,5], k = 4, x = 3\nOutput: [1,2,3,4]\n\nExample 2:\nInput: arr = [1,2,3,4,5], k = 4, x = -1\nOutput: [1,2,3,4]",
        "constraints": "1 <= k <= arr.length\n1 <= arr.length <= 10^4\narr is sorted in ascending order.\n-10^4 <= arr[i], x <= 10^4",
        "hints": "Binary search for the left boundary of the k-length window. Compare arr[mid] and arr[mid+k] distances to x.",
        "starter_code": {
            "python": "class Solution:\n    def findClosestElements(self, arr: list[int], k: int, x: int) -> list[int]:\n        pass",
            "javascript": "var findClosestElements = function(arr, k, x) {\n    \n};",
            "java": "class Solution {\n    public List<Integer> findClosestElements(int[] arr, int k, int x) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> findClosestElements(vector<int>& arr, int k, int x) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4,5]\n4\n3", "expected_output": "[1,2,3,4]", "is_sample": True},
            {"input": "[1,2,3,4,5]\n4\n-1", "expected_output": "[1,2,3,4]", "is_sample": True},
            {"input": "[1,1,1,10,10,10]\n1\n9", "expected_output": "[10]", "is_sample": False},
        ],
    },
    # ─── 7. Capacity To Ship Packages Within D Days ────────────────────
    {
        "title": "Capacity To Ship Packages Within D Days",
        "difficulty": "medium",
        "tags": ["binary-search", "array", "greedy"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "A conveyor belt has packages that must be shipped from one port to another within `days` days. The `i`th package has a weight of `weights[i]`. Each day, we load the ship with packages in the order given. We may not load more weight than the maximum weight capacity of the ship. Return the least weight capacity of the ship that will result in all the packages being shipped within `days` days.\n\nExample 1:\nInput: weights = [1,2,3,4,5,6,7,8,9,10], days = 5\nOutput: 15\n\nExample 2:\nInput: weights = [3,2,2,4,1,4], days = 3\nOutput: 6",
        "constraints": "1 <= days <= weights.length <= 5 * 10^4\n1 <= weights[i] <= 500",
        "hints": "Binary search on the answer. The minimum capacity is max(weights) and the maximum is sum(weights). For a given capacity, greedily check if all packages can be shipped in days days.",
        "starter_code": {
            "python": "class Solution:\n    def shipWithinDays(self, weights: list[int], days: int) -> int:\n        pass",
            "javascript": "var shipWithinDays = function(weights, days) {\n    \n};",
            "java": "class Solution {\n    public int shipWithinDays(int[] weights, int days) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int shipWithinDays(vector<int>& weights, int days) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4,5,6,7,8,9,10]\n5", "expected_output": "15", "is_sample": True},
            {"input": "[3,2,2,4,1,4]\n3", "expected_output": "6", "is_sample": True},
            {"input": "[1,2,3,1,1]\n4", "expected_output": "3", "is_sample": False},
        ],
    },
    # ─── 8. Split Array Largest Sum ────────────────────────────────────
    {
        "title": "Split Array Largest Sum",
        "difficulty": "hard",
        "tags": ["binary-search", "dynamic-programming", "array", "greedy"],
        "companies": ["google", "amazon", "meta", "bytedance"],
        "description": "Given an integer array `nums` and an integer `k`, split `nums` into `k` non-empty subarrays such that the largest sum of any subarray is minimized. Return the minimized largest sum of the split.\n\nExample 1:\nInput: nums = [7,2,5,10,8], k = 2\nOutput: 18\nExplanation: The best way is to split it into [7,2,5] and [10,8], where the largest sum is 18.\n\nExample 2:\nInput: nums = [1,2,3,4,5], k = 2\nOutput: 9",
        "constraints": "1 <= nums.length <= 1000\n0 <= nums[i] <= 10^6\n1 <= k <= min(50, nums.length)",
        "hints": "Binary search on the answer. For a given max sum, greedily check if you can split into at most k subarrays.",
        "starter_code": {
            "python": "class Solution:\n    def splitArray(self, nums: list[int], k: int) -> int:\n        pass",
            "javascript": "var splitArray = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public int splitArray(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int splitArray(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[7,2,5,10,8]\n2", "expected_output": "18", "is_sample": True},
            {"input": "[1,2,3,4,5]\n2", "expected_output": "9", "is_sample": True},
            {"input": "[1,4,4]\n3", "expected_output": "4", "is_sample": False},
        ],
    },
    # ─── 9. Magnetic Force Between Two Balls ───────────────────────────
    {
        "title": "Magnetic Force Between Two Balls",
        "difficulty": "medium",
        "tags": ["binary-search", "sorting", "array"],
        "companies": ["google", "uber", "bytedance"],
        "description": "In the universe Earth C-137, there are `n` unique positions on a number line. You are given a 2D integer array `position` and an integer `m`. You need to place `m` balls in some of these positions such that the minimum magnetic force between any two balls is maximized. Return the maximum minimum magnetic force.\n\nExample 1:\nInput: position = [1,2,3,4,7], m = 3\nOutput: 3\nExplanation: Distributing the 3 balls into baskets 1, 4, and 7 gives a minimum magnetic force of 3.\n\nExample 2:\nInput: position = [5,4,3,2,1,1000000000], m = 2\nOutput: 999999999",
        "constraints": "n == position.length\n2 <= n <= 10^5\n1 <= position[i] <= 10^9\nAll integers in position are distinct.\n2 <= m <= n",
        "hints": "Sort positions then binary search on the minimum distance. For a given distance, greedily place balls to verify feasibility.",
        "starter_code": {
            "python": "class Solution:\n    def maxDistance(self, position: list[int], m: int) -> int:\n        pass",
            "javascript": "var maxDistance = function(position, m) {\n    \n};",
            "java": "class Solution {\n    public int maxDistance(int[] position, int m) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxDistance(vector<int>& position, int m) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4,7]\n3", "expected_output": "3", "is_sample": True},
            {"input": "[5,4,3,2,1,1000000000]\n2", "expected_output": "999999999", "is_sample": True},
            {"input": "[1,2,3,4,5,6,7,8,9,10]\n4", "expected_output": "3", "is_sample": False},
        ],
    },
    # ─── 10. Minimize Maximum of Array ─────────────────────────────────
    {
        "title": "Minimize Maximum of Array",
        "difficulty": "hard",
        "tags": ["binary-search", "greedy", "array"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "You are given a 0-indexed array `nums` comprising of `n` non-negative integers. In one operation, you must decrease `nums[i]` by 1 and increase `nums[i - 1]` by 1 (for `i` in range `[1, n - 1]`). Return the minimum possible value of the maximum integer of `nums` after performing any number of operations.\n\nExample 1:\nInput: nums = [3,7,1,6]\nOutput: 5\nExplanation: One set of optimal operations makes the array equal to [4,5,2,5].\n\nExample 2:\nInput: nums = [10,1]\nOutput: 10",
        "constraints": "n == nums.length\n2 <= n <= 10^5\n0 <= nums[i] <= 10^9",
        "hints": "Binary search on the answer. For a given maximum value, check from left to right whether excess from later elements can be absorbed by earlier ones using prefix sums.",
        "starter_code": {
            "python": "class Solution:\n    def minimizeArrayValue(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var minimizeArrayValue = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int minimizeArrayValue(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minimizeArrayValue(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,7,1,6]", "expected_output": "5", "is_sample": True},
            {"input": "[10,1]", "expected_output": "10", "is_sample": True},
            {"input": "[1,1,1,1,1,100]", "expected_output": "18", "is_sample": False},
        ],
    },
    # ─── 11. Minimum Limit of Balls in a Bag ──────────────────────────
    {
        "title": "Minimum Limit of Balls in a Bag",
        "difficulty": "medium",
        "tags": ["binary-search", "array"],
        "companies": ["google", "amazon", "uber", "bytedance"],
        "description": "You are given an integer array `nums` where the `i`th bag contains `nums[i]` balls. You are also given an integer `maxOperations`. You can perform at most `maxOperations` times: take any bag and split it into two new bags with a positive number of balls each. Your penalty is the maximum number of balls in a bag. Minimize your penalty after the operations.\n\nExample 1:\nInput: nums = [9], maxOperations = 2\nOutput: 3\n\nExample 2:\nInput: nums = [2,4,8,2], maxOperations = 4\nOutput: 2",
        "constraints": "1 <= nums.length <= 10^5\n1 <= maxOperations, nums[i] <= 10^9",
        "hints": "Binary search on the penalty. For a given penalty p, each bag of size x requires ceil(x/p) - 1 operations to achieve.",
        "starter_code": {
            "python": "class Solution:\n    def minimumSize(self, nums: list[int], maxOperations: int) -> int:\n        pass",
            "javascript": "var minimumSize = function(nums, maxOperations) {\n    \n};",
            "java": "class Solution {\n    public int minimumSize(int[] nums, int maxOperations) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minimumSize(vector<int>& nums, int maxOperations) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[9]\n2", "expected_output": "3", "is_sample": True},
            {"input": "[2,4,8,2]\n4", "expected_output": "2", "is_sample": True},
            {"input": "[7,17]\n2", "expected_output": "7", "is_sample": False},
        ],
    },
    # ─── 12. Maximum Number of Removable Characters ────────────────────
    {
        "title": "Maximum Number of Removable Characters",
        "difficulty": "medium",
        "tags": ["binary-search", "string", "array"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "You are given two strings `s` and `p` where `p` is a subsequence of `s`. You are also given a distinct 0-indexed integer array `removable` containing indices of `s`. You want to find the maximum number `k` such that `p` is still a subsequence of `s` after removing the first `k` characters indicated by `removable`.\n\nExample 1:\nInput: s = \"abcacb\", p = \"ab\", removable = [3,1,0]\nOutput: 2\n\nExample 2:\nInput: s = \"abcbddddd\", p = \"abcd\", removable = [3,2,1,4,5,6]\nOutput: 1",
        "constraints": "1 <= p.length <= s.length <= 10^5\n0 <= removable[i] < s.length\nremovable.length == s.length - p.length\nIt is guaranteed that p is a subsequence of s.",
        "hints": "Binary search on k. For a given k, mark the first k indices as removed and check if p is still a subsequence of the remaining string.",
        "starter_code": {
            "python": "class Solution:\n    def maximumRemovals(self, s: str, p: str, removable: list[int]) -> int:\n        pass",
            "javascript": "var maximumRemovals = function(s, p, removable) {\n    \n};",
            "java": "class Solution {\n    public int maximumRemovals(String s, String p, int[] removable) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maximumRemovals(string s, string p, vector<int>& removable) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"abcacb\"\n\"ab\"\n[3,1,0]", "expected_output": "2", "is_sample": True},
            {"input": "\"abcbddddd\"\n\"abcd\"\n[3,2,1,4,5,6]", "expected_output": "1", "is_sample": True},
            {"input": "\"abcab\"\n\"abc\"\n[0,1]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 13. Frequency of the Most Frequent Element ────────────────────
    {
        "title": "Frequency of the Most Frequent Element",
        "difficulty": "medium",
        "tags": ["binary-search", "sliding-window", "sorting", "array"],
        "companies": ["google", "amazon", "microsoft", "uber"],
        "description": "The frequency of an element is the number of times it occurs in an array. You are given an integer array `nums` and an integer `k`. In one operation, you can choose an index and increment the element at that index by 1. Return the maximum possible frequency of an element after performing at most `k` operations.\n\nExample 1:\nInput: nums = [1,2,4], k = 5\nOutput: 3\nExplanation: Increment the first element three times and the second element two times to make nums = [4,4,4].\n\nExample 2:\nInput: nums = [1,4,8,13], k = 5\nOutput: 2",
        "constraints": "1 <= nums.length <= 10^5\n1 <= nums[i] <= 10^5\n1 <= k <= 10^5",
        "hints": "Sort the array. Use a sliding window: the cost to make all elements in the window equal to the rightmost element is (right_val * window_size) - window_sum. Shrink when cost exceeds k.",
        "starter_code": {
            "python": "class Solution:\n    def maxFrequency(self, nums: list[int], k: int) -> int:\n        pass",
            "javascript": "var maxFrequency = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public int maxFrequency(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxFrequency(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,4]\n5", "expected_output": "3", "is_sample": True},
            {"input": "[1,4,8,13]\n5", "expected_output": "2", "is_sample": True},
            {"input": "[3,9,6]\n2", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 14. Maximum Erasure Value ─────────────────────────────────────
    {
        "title": "Maximum Erasure Value",
        "difficulty": "medium",
        "tags": ["sliding-window", "hash-table", "array"],
        "companies": ["amazon", "meta", "uber", "bytedance"],
        "description": "You are given an array of positive integers `nums` and want to erase a subarray containing unique elements. The score you get by erasing the subarray is equal to the sum of its elements. Return the maximum score you can get by erasing exactly one subarray.\n\nExample 1:\nInput: nums = [4,2,4,5,6]\nOutput: 17\nExplanation: The optimal subarray is [2,4,5,6].\n\nExample 2:\nInput: nums = [5,2,1,2,5,2,1,2,5]\nOutput: 8",
        "constraints": "1 <= nums.length <= 10^5\n1 <= nums[i] <= 10^4",
        "hints": "Use a sliding window with a hash set. Expand the window while elements are unique, shrink from the left when a duplicate is found. Track the maximum sum.",
        "starter_code": {
            "python": "class Solution:\n    def maximumUniqueSubarray(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var maximumUniqueSubarray = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int maximumUniqueSubarray(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maximumUniqueSubarray(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[4,2,4,5,6]", "expected_output": "17", "is_sample": True},
            {"input": "[5,2,1,2,5,2,1,2,5]", "expected_output": "8", "is_sample": True},
            {"input": "[1,2,3,4,5]", "expected_output": "15", "is_sample": False},
        ],
    },
    # ─── 15. Sliding Window Maximum ────────────────────────────────────
    {
        "title": "Sliding Window Maximum",
        "difficulty": "hard",
        "tags": ["sliding-window", "heap", "array"],
        "companies": ["google", "amazon", "meta", "microsoft"],
        "description": "You are given an array of integers `nums`, and there is a sliding window of size `k` which moves from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position, return the max of each window.\n\nExample 1:\nInput: nums = [1,3,-1,-3,5,3,6,7], k = 3\nOutput: [3,3,5,5,6,7]\n\nExample 2:\nInput: nums = [1], k = 1\nOutput: [1]",
        "constraints": "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4\n1 <= k <= nums.length",
        "hints": "Use a monotonic decreasing deque. The front of the deque always holds the index of the current window maximum. Remove indices that fall out of the window.",
        "starter_code": {
            "python": "class Solution:\n    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:\n        pass",
            "javascript": "var maxSlidingWindow = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,3,-1,-3,5,3,6,7]\n3", "expected_output": "[3,3,5,5,6,7]", "is_sample": True},
            {"input": "[1]\n1", "expected_output": "[1]", "is_sample": True},
            {"input": "[7,2,4]\n2", "expected_output": "[7,4]", "is_sample": False},
        ],
    },
    # ─── 16. Longest Substring with At Most K Distinct Characters ──────
    {
        "title": "Longest Substring with At Most K Distinct Characters",
        "difficulty": "medium",
        "tags": ["sliding-window", "hash-table", "string"],
        "companies": ["google", "meta", "amazon", "uber"],
        "description": "Given a string `s` and an integer `k`, return the length of the longest substring of `s` that contains at most `k` distinct characters.\n\nExample 1:\nInput: s = \"eceba\", k = 2\nOutput: 3\nExplanation: The substring is \"ece\" which has length 3.\n\nExample 2:\nInput: s = \"aa\", k = 1\nOutput: 2",
        "constraints": "1 <= s.length <= 5 * 10^4\n0 <= k <= 50\ns consists of lowercase English letters.",
        "hints": "Use a sliding window with a hash map tracking character counts. Shrink the window from the left when distinct characters exceed k.",
        "starter_code": {
            "python": "class Solution:\n    def lengthOfLongestSubstringKDistinct(self, s: str, k: int) -> int:\n        pass",
            "javascript": "var lengthOfLongestSubstringKDistinct = function(s, k) {\n    \n};",
            "java": "class Solution {\n    public int lengthOfLongestSubstringKDistinct(String s, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int lengthOfLongestSubstringKDistinct(string s, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"eceba\"\n2", "expected_output": "3", "is_sample": True},
            {"input": "\"aa\"\n1", "expected_output": "2", "is_sample": True},
            {"input": "\"abcdef\"\n3", "expected_output": "3", "is_sample": False},
        ],
    },
    # ─── 17. Get Equal Substrings Within Budget ────────────────────────
    {
        "title": "Get Equal Substrings Within Budget",
        "difficulty": "easy",
        "tags": ["sliding-window", "string"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "You are given two strings `s` and `t` of the same length and an integer `maxCost`. You want to change `s` to `t`. Changing the `i`th character of `s` to `i`th character of `t` costs `|s[i] - t[i]|`. Return the maximum length of a substring of `s` that can be changed to the corresponding substring of `t` with a cost less than or equal to `maxCost`.\n\nExample 1:\nInput: s = \"abcd\", t = \"bcdf\", maxCost = 3\nOutput: 3\n\nExample 2:\nInput: s = \"abcd\", t = \"cdef\", maxCost = 3\nOutput: 1",
        "constraints": "1 <= s.length <= 10^5\nt.length == s.length\n0 <= maxCost <= 10^6\ns and t consist of only lowercase English letters.",
        "hints": "Compute the cost array where cost[i] = |s[i] - t[i]|. Then use a sliding window to find the longest subarray with sum <= maxCost.",
        "starter_code": {
            "python": "class Solution:\n    def equalSubstring(self, s: str, t: str, maxCost: int) -> int:\n        pass",
            "javascript": "var equalSubstring = function(s, t, maxCost) {\n    \n};",
            "java": "class Solution {\n    public int equalSubstring(String s, String t, int maxCost) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int equalSubstring(string s, string t, int maxCost) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"abcd\"\n\"bcdf\"\n3", "expected_output": "3", "is_sample": True},
            {"input": "\"abcd\"\n\"cdef\"\n3", "expected_output": "1", "is_sample": True},
            {"input": "\"abcd\"\n\"abcd\"\n0", "expected_output": "4", "is_sample": False},
        ],
    },
    # ─── 18. Grumpy Bookstore Owner ────────────────────────────────────
    {
        "title": "Grumpy Bookstore Owner",
        "difficulty": "easy",
        "tags": ["sliding-window", "array"],
        "companies": ["amazon", "google", "uber"],
        "description": "There is a bookstore owner that has a store open for `n` minutes. Every minute, some number of customers enter the store given by `customers[i]`. The owner is grumpy at minute `i` if `grumpy[i] == 1`, and not grumpy if `grumpy[i] == 0`. When grumpy, customers are unsatisfied. The owner can use a secret technique to not be grumpy for `minutes` consecutive minutes, but can only use it once. Return the maximum number of satisfied customers.\n\nExample 1:\nInput: customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], minutes = 3\nOutput: 16\n\nExample 2:\nInput: customers = [1], grumpy = [0], minutes = 1\nOutput: 1",
        "constraints": "n == customers.length == grumpy.length\n1 <= minutes <= n <= 2 * 10^4\n0 <= customers[i] <= 1000\ngrumpy[i] is 0 or 1.",
        "hints": "First sum all customers where grumpy[i] == 0 (always satisfied). Then use a sliding window of size minutes to find the maximum additional customers you can recover from grumpy minutes.",
        "starter_code": {
            "python": "class Solution:\n    def maxSatisfied(self, customers: list[int], grumpy: list[int], minutes: int) -> int:\n        pass",
            "javascript": "var maxSatisfied = function(customers, grumpy, minutes) {\n    \n};",
            "java": "class Solution {\n    public int maxSatisfied(int[] customers, int[] grumpy, int minutes) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxSatisfied(vector<int>& customers, vector<int>& grumpy, int minutes) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,0,1,2,1,1,7,5]\n[0,1,0,1,0,1,0,1]\n3", "expected_output": "16", "is_sample": True},
            {"input": "[1]\n[0]\n1", "expected_output": "1", "is_sample": True},
            {"input": "[4,2,1,5]\n[1,0,1,1]\n2", "expected_output": "11", "is_sample": False},
        ],
    },
    # ─── 19. Number of Substrings Containing All Three Characters ──────
    {
        "title": "Number of Substrings Containing All Three Characters",
        "difficulty": "medium",
        "tags": ["sliding-window", "string", "hash-table"],
        "companies": ["amazon", "google", "meta"],
        "description": "Given a string `s` consisting only of characters 'a', 'b' and 'c', return the number of substrings containing at least one occurrence of all these characters.\n\nExample 1:\nInput: s = \"abcabc\"\nOutput: 10\nExplanation: The substrings containing at least one occurrence of each character are listed in the problem.\n\nExample 2:\nInput: s = \"aaacb\"\nOutput: 3",
        "constraints": "3 <= s.length <= 5 * 10^4\ns only consists of 'a', 'b' or 'c' characters.",
        "hints": "Use a sliding window. Once you find a valid window [left, right], all substrings extending to the right from left (i.e., [left, right], [left, right+1], ...) are also valid. Count n - right for each valid left.",
        "starter_code": {
            "python": "class Solution:\n    def numberOfSubstrings(self, s: str) -> int:\n        pass",
            "javascript": "var numberOfSubstrings = function(s) {\n    \n};",
            "java": "class Solution {\n    public int numberOfSubstrings(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int numberOfSubstrings(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"abcabc\"", "expected_output": "10", "is_sample": True},
            {"input": "\"aaacb\"", "expected_output": "3", "is_sample": True},
            {"input": "\"abc\"", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 20. Replace the Substring for Balanced String ─────────────────
    {
        "title": "Replace the Substring for Balanced String",
        "difficulty": "hard",
        "tags": ["sliding-window", "string"],
        "companies": ["google", "amazon", "bytedance"],
        "description": "You are given a string `s` of length `n` containing only four kinds of characters: 'Q', 'W', 'E', and 'R'. A string is balanced if each character occurs `n / 4` times. Return the minimum length of the substring that can be replaced with any other string of the same length to make `s` balanced.\n\nExample 1:\nInput: s = \"QWER\"\nOutput: 0\n\nExample 2:\nInput: s = \"QQWE\"\nOutput: 1\nExplanation: Replace the first 'Q' with 'R' so that \"RQWE\" is balanced.",
        "constraints": "1 <= s.length <= 10^5\ns.length is a multiple of 4.\ns contains only 'Q', 'W', 'E', and 'R'.",
        "hints": "Use a sliding window. The characters outside the window must each have count <= n/4. Minimize the window length that satisfies this condition.",
        "starter_code": {
            "python": "class Solution:\n    def balancedString(self, s: str) -> int:\n        pass",
            "javascript": "var balancedString = function(s) {\n    \n};",
            "java": "class Solution {\n    public int balancedString(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int balancedString(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"QWER\"", "expected_output": "0", "is_sample": True},
            {"input": "\"QQWE\"", "expected_output": "1", "is_sample": True},
            {"input": "\"QQQQ\"", "expected_output": "3", "is_sample": False},
        ],
    },
    # ─── 21. Contains Duplicate III ────────────────────────────────────
    {
        "title": "Contains Duplicate III",
        "difficulty": "hard",
        "tags": ["sliding-window", "sorting", "array"],
        "companies": ["google", "amazon", "palantir", "airbnb"],
        "description": "You are given an integer array `nums` and two integers `indexDiff` and `valueDiff`. Find a pair of indices `(i, j)` such that `i != j`, `abs(i - j) <= indexDiff`, and `abs(nums[i] - nums[j]) <= valueDiff`. Return `true` if such pair exists, `false` otherwise.\n\nExample 1:\nInput: nums = [1,2,3,1], indexDiff = 3, valueDiff = 0\nOutput: true\n\nExample 2:\nInput: nums = [1,5,9,1,5,9], indexDiff = 2, valueDiff = 3\nOutput: false",
        "constraints": "2 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9\n1 <= indexDiff <= nums.length\n0 <= valueDiff <= 10^9",
        "hints": "Use bucket sort with bucket size valueDiff+1. Maintain a sliding window of size indexDiff. Check the current bucket and adjacent buckets for a valid pair.",
        "starter_code": {
            "python": "class Solution:\n    def containsNearbyAlmostDuplicate(self, nums: list[int], indexDiff: int, valueDiff: int) -> bool:\n        pass",
            "javascript": "var containsNearbyAlmostDuplicate = function(nums, indexDiff, valueDiff) {\n    \n};",
            "java": "class Solution {\n    public boolean containsNearbyAlmostDuplicate(int[] nums, int indexDiff, int valueDiff) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool containsNearbyAlmostDuplicate(vector<int>& nums, int indexDiff, int valueDiff) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,1]\n3\n0", "expected_output": "true", "is_sample": True},
            {"input": "[1,5,9,1,5,9]\n2\n3", "expected_output": "false", "is_sample": True},
            {"input": "[1,2,1,1]\n1\n0", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 22. Minimum Difference Between Largest and Smallest Value in Three Moves ─
    {
        "title": "Minimum Difference Between Largest and Smallest Value in Three Moves",
        "difficulty": "medium",
        "tags": ["array", "sorting", "greedy"],
        "companies": ["google", "amazon", "microsoft", "adobe"],
        "description": "You are given an integer array `nums`. In one move, you can choose one element of `nums` and change it to any value. Return the minimum difference between the largest and smallest value of `nums` after performing at most three moves.\n\nExample 1:\nInput: nums = [5,3,2,4]\nOutput: 0\nExplanation: We can make at most 3 moves: change 2 to 3, 5 to 3, 4 to 3. The difference is 3 - 3 = 0.\n\nExample 2:\nInput: nums = [1,5,0,10,14]\nOutput: 1",
        "constraints": "1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
        "hints": "Sort the array. You can remove up to 3 elements from the extremes (left or right). Try all 4 combinations: remove 0 left + 3 right, 1 left + 2 right, 2 left + 1 right, 3 left + 0 right.",
        "starter_code": {
            "python": "class Solution:\n    def minDifference(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var minDifference = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int minDifference(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minDifference(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[5,3,2,4]", "expected_output": "0", "is_sample": True},
            {"input": "[1,5,0,10,14]", "expected_output": "1", "is_sample": True},
            {"input": "[3,100,20]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 23. Two Sum Less Than K ───────────────────────────────────────
    {
        "title": "Two Sum Less Than K",
        "difficulty": "easy",
        "tags": ["array", "sorting", "two-pointers"],
        "companies": ["amazon", "google", "adobe"],
        "description": "Given an array `nums` of integers and integer `k`, return the maximum sum `nums[i] + nums[j]` such that `nums[i] + nums[j] < k` and `i != j`. If no such pair exists, return `-1`.\n\nExample 1:\nInput: nums = [34,23,1,24,75,33,54,8], k = 60\nOutput: 58\nExplanation: We can use 34 and 24 to get sum 58 which is less than 60.\n\nExample 2:\nInput: nums = [10,20,30], k = 15\nOutput: -1",
        "constraints": "1 <= nums.length <= 100\n1 <= nums[i] <= 1000\n1 <= k <= 2000",
        "hints": "Sort the array and use two pointers from both ends. If sum < k, update the answer and move the left pointer right; otherwise move the right pointer left.",
        "starter_code": {
            "python": "class Solution:\n    def twoSumLessThanK(self, nums: list[int], k: int) -> int:\n        pass",
            "javascript": "var twoSumLessThanK = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public int twoSumLessThanK(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int twoSumLessThanK(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[34,23,1,24,75,33,54,8]\n60", "expected_output": "58", "is_sample": True},
            {"input": "[10,20,30]\n15", "expected_output": "-1", "is_sample": True},
            {"input": "[1,2,3,4,5]\n10", "expected_output": "9", "is_sample": False},
        ],
    },
    # ─── 24. K-diff Pairs in an Array ──────────────────────────────────
    {
        "title": "K-diff Pairs in an Array",
        "difficulty": "easy",
        "tags": ["array", "hash-table", "two-pointers"],
        "companies": ["amazon", "meta", "uber"],
        "description": "Given an array of integers `nums` and an integer `k`, return the number of unique k-diff pairs in the array. A k-diff pair is an integer pair `(nums[i], nums[j])`, where `i != j` and `|nums[i] - nums[j]| == k`.\n\nExample 1:\nInput: nums = [3,1,4,1,5], k = 2\nOutput: 2\nExplanation: There are two 2-diff pairs: (1,3) and (3,5).\n\nExample 2:\nInput: nums = [1,2,3,4,5], k = 1\nOutput: 4",
        "constraints": "1 <= nums.length <= 10^4\n-10^7 <= nums[i] <= 10^7\n0 <= k <= 10^7",
        "hints": "Use a hash map to count occurrences. For k > 0, check if num + k exists. For k == 0, check if any number appears more than once.",
        "starter_code": {
            "python": "class Solution:\n    def findPairs(self, nums: list[int], k: int) -> int:\n        pass",
            "javascript": "var findPairs = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public int findPairs(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findPairs(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,1,4,1,5]\n2", "expected_output": "2", "is_sample": True},
            {"input": "[1,2,3,4,5]\n1", "expected_output": "4", "is_sample": True},
            {"input": "[1,1,1,1,1]\n0", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 25. Boats to Save People ──────────────────────────────────────
    {
        "title": "Boats to Save People",
        "difficulty": "easy",
        "tags": ["greedy", "two-pointers", "sorting"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "You are given an array `people` where `people[i]` is the weight of the `i`th person, and an infinite number of boats where each boat can carry a maximum weight of `limit`. Each boat carries at most two people at the same time, provided the sum of their weights is at most `limit`. Return the minimum number of boats to carry every person.\n\nExample 1:\nInput: people = [1,2], limit = 3\nOutput: 1\n\nExample 2:\nInput: people = [3,2,2,1], limit = 3\nOutput: 3",
        "constraints": "1 <= people.length <= 5 * 10^4\n1 <= people[i] <= limit <= 3 * 10^4",
        "hints": "Sort the array. Use two pointers: try to pair the lightest person with the heaviest. If they fit, move both pointers; otherwise, the heaviest rides alone.",
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
    # ─── 26. Bag of Tokens ────────────────────────────────────────────
    {
        "title": "Bag of Tokens",
        "difficulty": "medium",
        "tags": ["greedy", "sorting", "two-pointers"],
        "companies": ["google", "amazon", "uber", "lyft"],
        "description": "You start with an initial power of `power`, an initial score of 0, and a bag of tokens given as an integer array `tokens`. You can play a token face-up (lose `tokens[i]` power, gain 1 score) if your power >= tokens[i], or face-down (gain `tokens[i]` power, lose 1 score) if your score >= 1. Return the maximum score you can achieve after playing any number of tokens.\n\nExample 1:\nInput: tokens = [100], power = 50\nOutput: 0\n\nExample 2:\nInput: tokens = [200,100], power = 150\nOutput: 1",
        "constraints": "0 <= tokens.length <= 1000\n0 <= tokens[i], power < 10^4",
        "hints": "Sort tokens. Use two pointers: play the smallest token face-up for score, and the largest face-down for power when needed. Greedily maximize score.",
        "starter_code": {
            "python": "class Solution:\n    def bagOfTokensScore(self, tokens: list[int], power: int) -> int:\n        pass",
            "javascript": "var bagOfTokensScore = function(tokens, power) {\n    \n};",
            "java": "class Solution {\n    public int bagOfTokensScore(int[] tokens, int power) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int bagOfTokensScore(vector<int>& tokens, int power) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[100]\n50", "expected_output": "0", "is_sample": True},
            {"input": "[200,100]\n150", "expected_output": "1", "is_sample": True},
            {"input": "[100,200,300,400]\n200", "expected_output": "2", "is_sample": False},
        ],
    },
    # ─── 27. Number of Subsequences That Satisfy the Given Sum Condition ─
    {
        "title": "Number of Subsequences That Satisfy the Given Sum Condition",
        "difficulty": "hard",
        "tags": ["two-pointers", "binary-search", "sorting", "array"],
        "companies": ["google", "amazon", "bytedance"],
        "description": "You are given an array of integers `nums` and an integer `target`. Return the number of non-empty subsequences of `nums` such that the sum of the minimum and maximum element on it is less or equal to `target`. The answer may be large so return it modulo 10^9 + 7.\n\nExample 1:\nInput: nums = [3,5,6,7], target = 9\nOutput: 4\nExplanation: There are 4 subsequences that satisfy the condition: [3], [3,5], [3,5,6], [3,6].\n\nExample 2:\nInput: nums = [3,3,6,8], target = 10\nOutput: 6",
        "constraints": "1 <= nums.length <= 10^5\n1 <= nums[i] <= 10^6\n1 <= target <= 10^6",
        "hints": "Sort the array. Use two pointers: for each left, find the rightmost index where nums[left] + nums[right] <= target. The number of valid subsequences starting at left is 2^(right-left).",
        "starter_code": {
            "python": "class Solution:\n    def numSubseq(self, nums: list[int], target: int) -> int:\n        pass",
            "javascript": "var numSubseq = function(nums, target) {\n    \n};",
            "java": "class Solution {\n    public int numSubseq(int[] nums, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int numSubseq(vector<int>& nums, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,5,6,7]\n9", "expected_output": "4", "is_sample": True},
            {"input": "[3,3,6,8]\n10", "expected_output": "6", "is_sample": True},
            {"input": "[2,3,3,4,6,7]\n12", "expected_output": "61", "is_sample": False},
        ],
    },
    # ─── 28. Minimum Length of String After Deleting Similar Ends ──────
    {
        "title": "Minimum Length of String After Deleting Similar Ends",
        "difficulty": "easy",
        "tags": ["two-pointers", "string"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "Given a string `s` consisting only of characters 'a', 'b', and 'c', you can apply the following operation any number of times: pick a non-empty prefix where all characters are equal and a non-empty suffix where all characters are equal and the prefix and suffix do not overlap, such that the character of the prefix equals the character of the suffix, then delete both. Return the minimum length of `s` after performing the above operation any number of times.\n\nExample 1:\nInput: s = \"ca\"\nOutput: 2\n\nExample 2:\nInput: s = \"cabaabac\"\nOutput: 0",
        "constraints": "1 <= s.length <= 10^5\ns only consists of characters 'a', 'b', and 'c'.",
        "hints": "Use two pointers from both ends. While the characters at both pointers match, skip all consecutive equal characters from both ends inward.",
        "starter_code": {
            "python": "class Solution:\n    def minimumLength(self, s: str) -> int:\n        pass",
            "javascript": "var minimumLength = function(s) {\n    \n};",
            "java": "class Solution {\n    public int minimumLength(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minimumLength(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"ca\"", "expected_output": "2", "is_sample": True},
            {"input": "\"cabaabac\"", "expected_output": "0", "is_sample": True},
            {"input": "\"aabccabba\"", "expected_output": "3", "is_sample": False},
        ],
    },
    # ─── 29. Sentence Similarity III ───────────────────────────────────
    {
        "title": "Sentence Similarity III",
        "difficulty": "medium",
        "tags": ["two-pointers", "string", "array"],
        "companies": ["google", "amazon", "uber"],
        "description": "A sentence is a list of words separated by a single space with no leading or trailing spaces. Two sentences `sentence1` and `sentence2` are similar if it is possible to insert an arbitrary sentence (possibly empty) inside one of these sentences such that the two sentences become equal. Return `true` if they are similar, `false` otherwise.\n\nExample 1:\nInput: sentence1 = \"My name is Haley\", sentence2 = \"My Haley\"\nOutput: true\nExplanation: sentence2 can be turned to sentence1 by inserting \"name is\" between \"My\" and \"Haley\".\n\nExample 2:\nInput: sentence1 = \"of\", sentence2 = \"A lot of words\"\nOutput: false",
        "constraints": "1 <= sentence1.length, sentence2.length <= 100\nsentence1 and sentence2 consist of lowercase and uppercase English letters and spaces.\nThe words in sentence1 and sentence2 are separated by a single space.",
        "hints": "Split both sentences into word arrays. Use two pointers: match words from the front and from the back. If the matched words cover the shorter sentence entirely, they are similar.",
        "starter_code": {
            "python": "class Solution:\n    def areSentencesSimilar(self, sentence1: str, sentence2: str) -> bool:\n        pass",
            "javascript": "var areSentencesSimilar = function(sentence1, sentence2) {\n    \n};",
            "java": "class Solution {\n    public boolean areSentencesSimilar(String sentence1, String sentence2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool areSentencesSimilar(string sentence1, string sentence2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"My name is Haley\"\n\"My Haley\"", "expected_output": "true", "is_sample": True},
            {"input": "\"of\"\n\"A lot of words\"", "expected_output": "false", "is_sample": True},
            {"input": "\"A\"\n\"a\"", "expected_output": "false", "is_sample": False},
        ],
    },
    # ─── 30. Valid Triangle Number ─────────────────────────────────────
    {
        "title": "Valid Triangle Number",
        "difficulty": "medium",
        "tags": ["two-pointers", "binary-search", "sorting", "array"],
        "companies": ["amazon", "google", "linkedin", "uber"],
        "description": "Given an integer array `nums`, return the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle. Three sides can form a triangle if and only if the sum of any two sides is greater than the third side.\n\nExample 1:\nInput: nums = [2,2,3,4]\nOutput: 3\nExplanation: Valid combinations are: 2,3,4 (using the first 2), 2,3,4 (using the second 2), 2,2,3.\n\nExample 2:\nInput: nums = [4,2,3,4]\nOutput: 4",
        "constraints": "1 <= nums.length <= 1000\n0 <= nums[i] <= 1000",
        "hints": "Sort the array. Fix the largest side and use two pointers to count valid pairs for the other two sides. If nums[lo] + nums[hi] > nums[k], there are (hi - lo) valid pairs.",
        "starter_code": {
            "python": "class Solution:\n    def triangleNumber(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var triangleNumber = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int triangleNumber(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int triangleNumber(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,2,3,4]", "expected_output": "3", "is_sample": True},
            {"input": "[4,2,3,4]", "expected_output": "4", "is_sample": True},
            {"input": "[0,1,0,1]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 31. Minimize the Difference Between Target and Chosen Elements ─
    {
        "title": "Minimize the Difference Between Target and Chosen Elements",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "matrix", "array"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "You are given an `m x n` integer matrix `mat` and an integer `target`. Choose one integer from each row in the matrix such that the absolute difference between `target` and the sum of the chosen elements is minimized. Return the minimum absolute difference.\n\nExample 1:\nInput: mat = [[1,2,3],[4,5,6],[7,8,9]], target = 13\nOutput: 0\nExplanation: Choose 1 from row 0, 5 from row 1, and 7 from row 2. Sum = 13.\n\nExample 2:\nInput: mat = [[1],[2],[3]], target = 100\nOutput: 94",
        "constraints": "m == mat.length\nn == mat[i].length\n1 <= m, n <= 70\n1 <= mat[i][j] <= 70\n1 <= target <= 800",
        "hints": "Use DP with a set of reachable sums. For each row, expand the set by adding each element in that row to every existing sum. Track the minimum absolute difference with target.",
        "starter_code": {
            "python": "class Solution:\n    def minimizeTheDifference(self, mat: list[list[int]], target: int) -> int:\n        pass",
            "javascript": "var minimizeTheDifference = function(mat, target) {\n    \n};",
            "java": "class Solution {\n    public int minimizeTheDifference(int[][] mat, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minimizeTheDifference(vector<vector<int>>& mat, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2,3],[4,5,6],[7,8,9]]\n13", "expected_output": "0", "is_sample": True},
            {"input": "[[1],[2],[3]]\n100", "expected_output": "94", "is_sample": True},
            {"input": "[[1,2,9,8,7]]\n6", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 32. Maximum Ice Cream Bars ────────────────────────────────────
    {
        "title": "Maximum Ice Cream Bars",
        "difficulty": "easy",
        "tags": ["greedy", "sorting", "array"],
        "companies": ["amazon", "meta", "google"],
        "description": "It is a sweltering summer day, and a boy wants to buy some number of ice cream bars. At the store, there are `n` ice cream bars. You are given an array `costs` of length `n` where `costs[i]` is the price of the `i`th ice cream bar. The boy initially has `coins` coins to spend. Return the maximum number of ice cream bars he can buy.\n\nExample 1:\nInput: costs = [1,3,2,4,1], coins = 7\nOutput: 4\n\nExample 2:\nInput: costs = [10,6,8,7,7,8], coins = 5\nOutput: 0",
        "constraints": "costs.length == n\n1 <= n <= 10^5\n1 <= costs[i] <= 10^5\n1 <= coins <= 10^8",
        "hints": "Sort costs in ascending order. Greedily buy the cheapest bars first until you run out of coins.",
        "starter_code": {
            "python": "class Solution:\n    def maxIceCream(self, costs: list[int], coins: int) -> int:\n        pass",
            "javascript": "var maxIceCream = function(costs, coins) {\n    \n};",
            "java": "class Solution {\n    public int maxIceCream(int[] costs, int coins) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxIceCream(vector<int>& costs, int coins) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,3,2,4,1]\n7", "expected_output": "4", "is_sample": True},
            {"input": "[10,6,8,7,7,8]\n5", "expected_output": "0", "is_sample": True},
            {"input": "[1,1,1,1,1]\n3", "expected_output": "3", "is_sample": False},
        ],
    },
    # ─── 33. Minimum Cost to Hire K Workers ────────────────────────────
    {
        "title": "Minimum Cost to Hire K Workers",
        "difficulty": "hard",
        "tags": ["greedy", "heap", "sorting"],
        "companies": ["google", "amazon", "meta", "uber"],
        "description": "There are `n` workers. You are given two arrays: `quality` and `wage`, where `quality[i]` is the quality and `wage[i]` is the minimum wage expectation of the `i`th worker. We want to hire exactly `k` workers to form a paid group. The payment follows two rules: every worker in the paid group is paid in the ratio of their quality compared to other workers, and every worker must be paid at least their minimum wage expectation. Return the least amount of money to form a paid group.\n\nExample 1:\nInput: quality = [10,20,5], wage = [70,50,30], k = 2\nOutput: 105.00000\n\nExample 2:\nInput: quality = [3,1,10,10,1], wage = [4,8,2,2,7], k = 3\nOutput: 30.66667",
        "constraints": "n == quality.length == wage.length\n1 <= k <= n <= 10^4\n1 <= quality[i], wage[i] <= 10^4",
        "hints": "Sort workers by wage/quality ratio. Use a max-heap to maintain the k smallest quality workers seen so far. For each worker as the ratio captain, the cost is ratio * total_quality.",
        "starter_code": {
            "python": "class Solution:\n    def mincostToHireWorkers(self, quality: list[int], wage: list[int], k: int) -> float:\n        pass",
            "javascript": "var mincostToHireWorkers = function(quality, wage, k) {\n    \n};",
            "java": "class Solution {\n    public double mincostToHireWorkers(int[] quality, int[] wage, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    double mincostToHireWorkers(vector<int>& quality, vector<int>& wage, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[10,20,5]\n[70,50,30]\n2", "expected_output": "105.00000", "is_sample": True},
            {"input": "[3,1,10,10,1]\n[4,8,2,2,7]\n3", "expected_output": "30.66667", "is_sample": True},
            {"input": "[4,4]\n[4,4]\n2", "expected_output": "8.00000", "is_sample": False},
        ],
    },
    # ─── 34. Meeting Scheduler ────────────────────────────────────────
    {
        "title": "Meeting Scheduler",
        "difficulty": "medium",
        "tags": ["sorting", "two-pointers", "array"],
        "companies": ["amazon", "google", "microsoft", "uber"],
        "description": "Given the availability time slots `slots1` and `slots2` of two people and a meeting duration `duration`, return the earliest time slot that works for both of them and is of duration `duration`. If there is no common time slot that satisfies the requirements, return an empty array. A time slot is represented as `[start, end]`.\n\nExample 1:\nInput: slots1 = [[10,50],[60,120],[140,210]], slots2 = [[0,15],[60,70]], duration = 8\nOutput: [60,68]\n\nExample 2:\nInput: slots1 = [[10,50],[60,120],[140,210]], slots2 = [[0,15],[60,70]], duration = 12\nOutput: []",
        "constraints": "1 <= slots1.length, slots2.length <= 10^4\nslots1[i].length, slots2[i].length == 2\nslots1[i][0] < slots1[i][1]\nslots2[i][0] < slots2[i][1]\n0 <= slots1[i][j], slots2[i][j] <= 10^9\n1 <= duration <= 10^6",
        "hints": "Sort both slot arrays by start time. Use two pointers to find overlapping intervals. If the overlap length >= duration, return the result.",
        "starter_code": {
            "python": "class Solution:\n    def minAvailableDuration(self, slots1: list[list[int]], slots2: list[list[int]], duration: int) -> list[int]:\n        pass",
            "javascript": "var minAvailableDuration = function(slots1, slots2, duration) {\n    \n};",
            "java": "class Solution {\n    public List<Integer> minAvailableDuration(int[][] slots1, int[][] slots2, int duration) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> minAvailableDuration(vector<vector<int>>& slots1, vector<vector<int>>& slots2, int duration) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[10,50],[60,120],[140,210]]\n[[0,15],[60,70]]\n8", "expected_output": "[60,68]", "is_sample": True},
            {"input": "[[10,50],[60,120],[140,210]]\n[[0,15],[60,70]]\n12", "expected_output": "[]", "is_sample": True},
            {"input": "[[0,2]]\n[[1,3]]\n1", "expected_output": "[1,2]", "is_sample": False},
        ],
    },
    # ─── 35. Car Fleet ────────────────────────────────────────────────
    {
        "title": "Car Fleet",
        "difficulty": "hard",
        "tags": ["sorting", "array", "math"],
        "companies": ["google", "amazon", "uber", "lyft"],
        "description": "There are `n` cars going to the same destination along a one-lane road. The destination is `target` miles away. You are given two arrays: `position` and `speed`, both of length `n`, where `position[i]` is the position and `speed[i]` is the speed (mph) of the `i`th car. A car can never pass another car ahead of it but can catch up and then travel at the same speed. A car fleet is some non-empty set of cars driving at the same position and same speed. Return the number of car fleets that will arrive at the destination.\n\nExample 1:\nInput: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]\nOutput: 3\n\nExample 2:\nInput: target = 10, position = [3], speed = [3]\nOutput: 1",
        "constraints": "n == position.length == speed.length\n1 <= n <= 10^5\n0 < target <= 10^6\n0 <= position[i] < target\n0 < speed[i] <= 10^6\nAll the values of position are unique.",
        "hints": "Sort cars by position in descending order. Calculate the time for each car to reach the target. A new fleet forms whenever a car takes longer than the car in front of it.",
        "starter_code": {
            "python": "class Solution:\n    def carFleet(self, target: int, position: list[int], speed: list[int]) -> int:\n        pass",
            "javascript": "var carFleet = function(target, position, speed) {\n    \n};",
            "java": "class Solution {\n    public int carFleet(int target, int[] position, int[] speed) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int carFleet(int target, vector<int>& position, vector<int>& speed) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "12\n[10,8,0,5,3]\n[2,4,1,1,3]", "expected_output": "3", "is_sample": True},
            {"input": "10\n[3]\n[3]", "expected_output": "1", "is_sample": True},
            {"input": "100\n[0,2,4]\n[4,2,1]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 36. Car Fleet II ────────────────────────────────────────────
    {
        "title": "Car Fleet II",
        "difficulty": "hard",
        "tags": ["array", "math", "sorting"],
        "companies": ["google", "amazon", "uber", "lyft"],
        "description": "There are `n` cars traveling at different speeds in the same direction along a one-lane road. You are given an array `cars` of length `n`, where `cars[i] = [position_i, speed_i]` represents the position and speed of the `i`th car. When a faster car catches up to a slower car, they collide and form a fleet at the position of the slower car, traveling at the slower car's speed. Return an array `answer` where `answer[i]` is the time in seconds it takes for the `i`th car to collide with the next car, or -1 if it never collides.\n\nExample 1:\nInput: cars = [[1,2],[2,1],[4,3],[7,2]]\nOutput: [1.00000,-1.00000,3.00000,-1.00000]\n\nExample 2:\nInput: cars = [[3,4],[5,4],[6,3],[9,1]]\nOutput: [2.00000,1.00000,1.50000,-1.00000]",
        "constraints": "1 <= cars.length <= 10^5\n1 <= position_i, speed_i <= 10^6\nAll the values of position are unique.\ncars is sorted by position in non-decreasing order.",
        "hints": "Process cars from right to left using a stack. For each car, pop stack entries that the current car cannot catch (either because they are faster or because they would have already merged into a fleet before the current car catches them).",
        "starter_code": {
            "python": "class Solution:\n    def getCollisionTimes(self, cars: list[list[int]]) -> list[float]:\n        pass",
            "javascript": "var getCollisionTimes = function(cars) {\n    \n};",
            "java": "class Solution {\n    public double[] getCollisionTimes(int[][] cars) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<double> getCollisionTimes(vector<vector<int>>& cars) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2],[2,1],[4,3],[7,2]]", "expected_output": "[1.00000,-1.00000,3.00000,-1.00000]", "is_sample": True},
            {"input": "[[3,4],[5,4],[6,3],[9,1]]", "expected_output": "[2.00000,1.00000,1.50000,-1.00000]", "is_sample": True},
            {"input": "[[1,4],[4,5],[7,1]]", "expected_output": "[3.00000,-1.00000,-1.00000]", "is_sample": False},
        ],
    },
    # ─── 37. Reveal Cards In Increasing Order ──────────────────────────
    {
        "title": "Reveal Cards In Increasing Order",
        "difficulty": "hard",
        "tags": ["sorting", "array"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "You are given an integer array `deck`. There is a deck of cards where every card has a unique integer. The order is such that if you repeatedly reveal the top card and move the next top card to the bottom, the revealed cards appear in increasing order. Return an ordering of the deck that would produce this result.\n\nExample 1:\nInput: deck = [17,13,11,2,3,5,7]\nOutput: [2,13,3,11,5,17,7]\n\nExample 2:\nInput: deck = [1,1000]\nOutput: [1,1000]",
        "constraints": "1 <= deck.length <= 1000\n1 <= deck[i] <= 10^6\nAll the values of deck are unique.",
        "hints": "Sort the deck. Simulate the process in reverse: maintain a deque, and for each card from largest to smallest, move the bottom card to the top then place the current card on top.",
        "starter_code": {
            "python": "class Solution:\n    def deckRevealedIncreasing(self, deck: list[int]) -> list[int]:\n        pass",
            "javascript": "var deckRevealedIncreasing = function(deck) {\n    \n};",
            "java": "class Solution {\n    public int[] deckRevealedIncreasing(int[] deck) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> deckRevealedIncreasing(vector<int>& deck) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[17,13,11,2,3,5,7]", "expected_output": "[2,13,3,11,5,17,7]", "is_sample": True},
            {"input": "[1,1000]", "expected_output": "[1,1000]", "is_sample": True},
            {"input": "[1,2,3,4,5]", "expected_output": "[1,5,2,4,3]", "is_sample": False},
        ],
    },
    # ─── 38. Pancake Sorting ──────────────────────────────────────────
    {
        "title": "Pancake Sorting",
        "difficulty": "medium",
        "tags": ["sorting", "greedy", "array"],
        "companies": ["google", "microsoft", "meta"],
        "description": "Given an array of integers `arr`, sort the array by performing a series of pancake flips. In one pancake flip we choose some positive integer `k <= arr.length` and reverse the subarray `arr[0...k-1]`. Return an array of the k-values corresponding to a sequence of pancake flips that sort `arr`. Any valid answer that sorts the array within `10 * arr.length` flips will be accepted.\n\nExample 1:\nInput: arr = [3,2,4,1]\nOutput: [4,2,4,3]\n\nExample 2:\nInput: arr = [1,2,3]\nOutput: []",
        "constraints": "1 <= arr.length <= 100\n1 <= arr[i] <= arr.length\nAll integers in arr are unique.",
        "hints": "Find the largest unsorted element, flip it to the front, then flip it to its correct position. Repeat for the next largest element.",
        "starter_code": {
            "python": "class Solution:\n    def pancakeSort(self, arr: list[int]) -> list[int]:\n        pass",
            "javascript": "var pancakeSort = function(arr) {\n    \n};",
            "java": "class Solution {\n    public List<Integer> pancakeSort(int[] arr) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> pancakeSort(vector<int>& arr) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,2,4,1]", "expected_output": "[4,2,4,3]", "is_sample": True},
            {"input": "[1,2,3]", "expected_output": "[]", "is_sample": True},
            {"input": "[2,1]", "expected_output": "[2]", "is_sample": False},
        ],
    },
    # ─── 39. Minimum Number of Swaps to Make the String Balanced ──────
    {
        "title": "Minimum Number of Swaps to Make the String Balanced",
        "difficulty": "medium",
        "tags": ["greedy", "string", "two-pointers"],
        "companies": ["amazon", "google", "meta", "microsoft"],
        "description": "You are given a 0-indexed string `s` of even length `n`. The string consists of exactly `n / 2` opening brackets '[' and `n / 2` closing brackets ']'. A string is balanced if and only if it is the empty string, or it can be written as `AB` where both `A` and `B` are balanced, or `[C]` where `C` is balanced. You may swap the brackets at any two indices any number of times. Return the minimum number of swaps to make `s` balanced.\n\nExample 1:\nInput: s = \"][][\"\nOutput: 1\nExplanation: Swap index 0 with index 3 to get \"[[]]\".\n\nExample 2:\nInput: s = \"]]][[[\"\nOutput: 2",
        "constraints": "n == s.length\n2 <= n <= 10^6\nn is even.\ns[i] is either '[' or ']'.\nThe number of opening brackets equals the number of closing brackets.",
        "hints": "Track the number of unmatched closing brackets as you scan left to right. The answer is ceil(unmatched / 2), since each swap fixes two unmatched brackets.",
        "starter_code": {
            "python": "class Solution:\n    def minSwaps(self, s: str) -> int:\n        pass",
            "javascript": "var minSwaps = function(s) {\n    \n};",
            "java": "class Solution {\n    public int minSwaps(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minSwaps(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"][][\"", "expected_output": "1", "is_sample": True},
            {"input": "\"]]][[[\"\n", "expected_output": "2", "is_sample": True},
            {"input": "\"[]\"", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 40. Hand of Straights ────────────────────────────────────────
    {
        "title": "Hand of Straights",
        "difficulty": "easy",
        "tags": ["greedy", "sorting", "hash-table", "array"],
        "companies": ["google", "amazon", "microsoft", "uber"],
        "description": "Alice has some number of cards in her hand. She wants to rearrange the cards into groups so that each group is of size `groupSize`, and consists of `groupSize` consecutive cards. Given an integer array `hand` where `hand[i]` is the value written on the `i`th card and an integer `groupSize`, return `true` if she can rearrange them, or `false` otherwise.\n\nExample 1:\nInput: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3\nOutput: true\nExplanation: Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8].\n\nExample 2:\nInput: hand = [1,2,3,4,5], groupSize = 4\nOutput: false",
        "constraints": "1 <= hand.length <= 10^4\n0 <= hand[i] <= 10^9\n1 <= groupSize <= hand.length",
        "hints": "Sort the hand. Use a hash map to count occurrences. For each smallest available card, try to form a group of consecutive cards of size groupSize.",
        "starter_code": {
            "python": "class Solution:\n    def isNStraightHand(self, hand: list[int], groupSize: int) -> bool:\n        pass",
            "javascript": "var isNStraightHand = function(hand, groupSize) {\n    \n};",
            "java": "class Solution {\n    public boolean isNStraightHand(int[] hand, int groupSize) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isNStraightHand(vector<int>& hand, int groupSize) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,6,2,3,4,7,8]\n3", "expected_output": "true", "is_sample": True},
            {"input": "[1,2,3,4,5]\n4", "expected_output": "false", "is_sample": True},
            {"input": "[1,1,2,2,3,3]\n3", "expected_output": "true", "is_sample": False},
        ],
    },
]

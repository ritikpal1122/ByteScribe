"""Batch 14: Missing NeetCode 150 problems (6 problems with company labels)."""

PROBLEMS_BATCH14 = [
    # ─── 1. Valid Sudoku ─────────────────────────────────────────────────
    {
        "title": "Valid Sudoku",
        "difficulty": "medium",
        "tags": ["array", "hash-table", "matrix"],
        "companies": ["amazon", "apple", "uber"],
        "description": "Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules: each row must contain the digits 1-9 without repetition, each column must contain the digits 1-9 without repetition, and each of the nine 3x3 sub-boxes must contain the digits 1-9 without repetition. Empty cells are represented by the character `'.'`.\n\nExample 1:\nInput: board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]\nOutput: true\n\nExample 2:\nInput: board = [[\"8\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]\nOutput: false\nExplanation: The digit '8' appears twice in the first column, so the board is invalid.",
        "constraints": "board.length == 9\nboard[i].length == 9\nboard[i][j] is a digit 1-9 or '.'.",
        "hints": "Use three sets (or hash maps) to track seen digits: one for each row, one for each column, and one for each 3x3 sub-box. The sub-box index can be computed as (row // 3) * 3 + (col // 3).",
        "starter_code": {
            "python": "class Solution:\n    def isValidSudoku(self, board: list[list[str]]) -> bool:\n        pass",
            "javascript": "var isValidSudoku = function(board) {\n    \n};",
            "java": "class Solution {\n    public boolean isValidSudoku(char[][] board) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isValidSudoku(vector<vector<char>>& board) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]", "expected_output": "true", "is_sample": True},
            {"input": "board = [[\"8\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]", "expected_output": "false", "is_sample": True},
            {"input": "board = [[\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\"],[\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\"],[\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\"],[\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\"],[\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\"],[\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\"],[\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\"],[\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\"],[\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\"]]", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 2. Count Good Nodes in Binary Tree ──────────────────────────────
    {
        "title": "Count Good Nodes in Binary Tree",
        "difficulty": "medium",
        "tags": ["tree", "binary-tree", "recursion"],
        "companies": ["amazon", "microsoft", "google"],
        "description": "Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X. Return the number of good nodes in the binary tree.\n\nExample 1:\nInput: root = [3,1,4,3,null,1,5]\nOutput: 4\nExplanation: The root node (3) is always good. Node 4 -> (3,4) is good because 4 is the max. Node 5 -> (3,4,5) is good because 5 is the max. Node 3 -> (3,1,3) is good because 3 equals the max.\n\nExample 2:\nInput: root = [3,3,null,4,2]\nOutput: 3\nExplanation: Root (3), left child (3), and left-left grandchild (4) are good nodes.",
        "constraints": "The number of nodes in the binary tree is in the range [1, 10^5].\nEach node's value is between [-10^4, 10^4].",
        "hints": "Use DFS (preorder traversal) keeping track of the maximum value seen so far along the path from the root. A node is good if its value is >= the current maximum.",
        "starter_code": {
            "python": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def goodNodes(self, root: TreeNode) -> int:\n        pass",
            "javascript": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\nvar goodNodes = function(root) {\n    \n};",
            "java": "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode() {}\n *     TreeNode(int val) { this.val = val; }\n *     TreeNode(int val, TreeNode left, TreeNode right) {\n *         this.val = val;\n *         this.left = left;\n *         this.right = right;\n *     }\n * }\n */\nclass Solution {\n    public int goodNodes(TreeNode root) {\n        \n    }\n}",
            "cpp": "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int goodNodes(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "root = [3,1,4,3,null,1,5]", "expected_output": "4", "is_sample": True},
            {"input": "root = [3,3,null,4,2]", "expected_output": "3", "is_sample": True},
            {"input": "root = [1]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 3. Kth Largest Element in a Stream ──────────────────────────────
    {
        "title": "Kth Largest Element in a Stream",
        "difficulty": "easy",
        "tags": ["heap", "design"],
        "companies": ["amazon", "meta", "spotify"],
        "description": "Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element. Implement the `KthLargest` class: the constructor accepts an integer `k` and an integer array `nums`, and the `add` method appends `val` to the stream and returns the element representing the kth largest element.\n\nExample 1:\nInput: [\"KthLargest\", \"add\", \"add\", \"add\", \"add\", \"add\"], [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]\nOutput: [null, 4, 5, 5, 8, 8]\nExplanation: KthLargest(3, [4,5,8,2]); add(3)->4; add(5)->5; add(10)->5; add(9)->8; add(4)->8.\n\nExample 2:\nInput: [\"KthLargest\", \"add\", \"add\"], [[1, []], [-3], [-2]]\nOutput: [null, -3, -2]",
        "constraints": "1 <= k <= 10^4\n0 <= nums.length <= 10^4\n-10^4 <= nums[i] <= 10^4\n-10^4 <= val <= 10^4\nAt most 10^4 calls will be made to add.\nIt is guaranteed that there will be at least k elements in the array when you search for the kth element.",
        "hints": "Maintain a min-heap of size k. The root of the heap is always the kth largest element. When adding a new value, push it onto the heap and pop if the heap size exceeds k.",
        "starter_code": {
            "python": "class KthLargest:\n\n    def __init__(self, k: int, nums: list[int]):\n        pass\n\n    def add(self, val: int) -> int:\n        pass",
            "javascript": "/**\n * @param {number} k\n * @param {number[]} nums\n */\nvar KthLargest = function(k, nums) {\n    \n};\n\n/**\n * @param {number} val\n * @return {number}\n */\nKthLargest.prototype.add = function(val) {\n    \n};",
            "java": "class KthLargest {\n\n    public KthLargest(int k, int[] nums) {\n        \n    }\n\n    public int add(int val) {\n        \n    }\n}",
            "cpp": "class KthLargest {\npublic:\n    KthLargest(int k, vector<int>& nums) {\n        \n    }\n\n    int add(int val) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"KthLargest\", \"add\", \"add\", \"add\", \"add\", \"add\"], [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]", "expected_output": "[null, 4, 5, 5, 8, 8]", "is_sample": True},
            {"input": "[\"KthLargest\", \"add\", \"add\"], [[1, []], [-3], [-2]]", "expected_output": "[null, -3, -2]", "is_sample": True},
            {"input": "[\"KthLargest\", \"add\", \"add\", \"add\"], [[2, [0]], [-1], [1], [-2]]", "expected_output": "[null, -1, 0, 0]", "is_sample": False},
        ],
    },
    # ─── 4. Merge Triplets to Form Target Triplet ────────────────────────
    {
        "title": "Merge Triplets to Form Target Triplet",
        "difficulty": "medium",
        "tags": ["array", "greedy"],
        "companies": ["google", "amazon", "meta"],
        "description": "A triplet is an array of three integers. You are given a 2D integer array `triplets` where `triplets[i] = [ai, bi, ci]` and an integer array `target = [x, y, z]`. To obtain the target, you may select some triplets and update the target by taking the maximum value at each position. Return `true` if it is possible to obtain the target triplet as the element-wise maximum of some subset of the given triplets.\n\nExample 1:\nInput: triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]\nOutput: true\nExplanation: Select triplets [2,5,3] and [1,7,5]. max(2,1)=2, max(5,7)=7, max(3,5)=5.\n\nExample 2:\nInput: triplets = [[3,4,5],[4,5,6]], target = [3,2,5]\nOutput: false\nExplanation: No triplet has value 2 at index 1 or less, and combining yields max >= 3 at index 1.",
        "constraints": "1 <= triplets.length <= 10^5\ntriplets[i].length == target.length == 3\n1 <= ai, bi, ci, x, y, z <= 1000",
        "hints": "A triplet is usable only if none of its values exceed the corresponding target value. Among all usable triplets, check if we can match each position of the target at least once.",
        "starter_code": {
            "python": "class Solution:\n    def mergeTriplets(self, triplets: list[list[int]], target: list[int]) -> bool:\n        pass",
            "javascript": "var mergeTriplets = function(triplets, target) {\n    \n};",
            "java": "class Solution {\n    public boolean mergeTriplets(int[][] triplets, int[] target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]", "expected_output": "true", "is_sample": True},
            {"input": "triplets = [[3,4,5],[4,5,6]], target = [3,2,5]", "expected_output": "false", "is_sample": True},
            {"input": "triplets = [[2,5,3],[2,3,4],[1,2,5],[5,2,3]], target = [5,5,5]", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 5. Minimum Interval to Include Each Query ───────────────────────
    {
        "title": "Minimum Interval to Include Each Query",
        "difficulty": "hard",
        "tags": ["array", "binary-search", "sorting", "heap"],
        "companies": ["google", "amazon", "uber", "lyft"],
        "description": "You are given a 2D integer array `intervals` where `intervals[i] = [lefti, righti]` represents the inclusive interval `[lefti, righti]`, and an integer array `queries`. For each query `queries[j]`, find the size of the smallest interval `[lefti, righti]` such that `lefti <= queries[j] <= righti`. The size of an interval is defined as `righti - lefti + 1`. Return an array `answer` where `answer[j]` is the answer to the jth query. If no interval contains the query, the answer is `-1`.\n\nExample 1:\nInput: intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]\nOutput: [3,3,1,4]\nExplanation: Query 2 -> [2,4] size 3; Query 3 -> [2,4] size 3; Query 4 -> [4,4] size 1; Query 5 -> [3,6] size 4.\n\nExample 2:\nInput: intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]\nOutput: [2,-1,4,6]",
        "constraints": "1 <= intervals.length <= 10^5\n1 <= queries.length <= 10^5\nintervals[i].length == 2\n1 <= lefti <= righti <= 10^7\n1 <= queries[j] <= 10^7",
        "hints": "Sort both intervals and queries. Use a min-heap keyed by interval size. For each query (in sorted order), push all intervals whose left endpoint <= query, then pop intervals whose right endpoint < query. The heap top gives the smallest valid interval.",
        "starter_code": {
            "python": "class Solution:\n    def minInterval(self, intervals: list[list[int]], queries: list[int]) -> list[int]:\n        pass",
            "javascript": "var minInterval = function(intervals, queries) {\n    \n};",
            "java": "class Solution {\n    public int[] minInterval(int[][] intervals, int[] queries) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]", "expected_output": "[3,3,1,4]", "is_sample": True},
            {"input": "intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]", "expected_output": "[2,-1,4,6]", "is_sample": True},
            {"input": "intervals = [[4,5],[5,8],[1,9],[8,10],[1,6]], queries = [7,9,3,9,3]", "expected_output": "[4,3,6,3,6]", "is_sample": False},
        ],
    },
    # ─── 6. Detect Squares ───────────────────────────────────────────────
    {
        "title": "Detect Squares",
        "difficulty": "medium",
        "tags": ["array", "hash-table", "design", "math"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "You are given a stream of points on the X-Y plane. Design a data structure that supports adding new points and counting the number of ways to form axis-aligned squares with a given query point. An axis-aligned square has all sides parallel to the X and Y axes. Implement the `DetectSquares` class with `add(point)` to add a point and `count(point)` to count squares.\n\nExample 1:\nInput: [\"DetectSquares\", \"add\", \"add\", \"add\", \"count\", \"count\", \"add\", \"count\"], [[], [[3,10]], [[11,1]], [[3,1]], [[11,10]], [[14,8]], [[11,10]], [[11,10]]]\nOutput: [null, null, null, null, 1, 0, null, 2]\nExplanation: After adding [3,10],[11,1],[3,1], count([11,10]) finds one square with corners (3,10),(11,10),(11,1),(3,1). count([14,8]) finds no square. After adding [11,10], count([11,10]) finds two squares.\n\nExample 2:\nInput: [\"DetectSquares\", \"add\", \"add\", \"add\", \"count\"], [[], [[5,5]], [[5,10]], [[10,5]], [[10,10]]]\nOutput: [null, null, null, null, 1]",
        "constraints": "point.length == 2\n0 <= x, y <= 1000\nAt most 3000 calls in total will be made to add and count.",
        "hints": "Store points with their counts in a hash map. For count(query), iterate over all points that share the same x-coordinate as the query. Use the y-distance as the side length and check if the other two corners of the square exist.",
        "starter_code": {
            "python": "class DetectSquares:\n\n    def __init__(self):\n        pass\n\n    def add(self, point: list[int]) -> None:\n        pass\n\n    def count(self, point: list[int]) -> int:\n        pass",
            "javascript": "var DetectSquares = function() {\n    \n};\n\n/**\n * @param {number[]} point\n * @return {void}\n */\nDetectSquares.prototype.add = function(point) {\n    \n};\n\n/**\n * @param {number[]} point\n * @return {number}\n */\nDetectSquares.prototype.count = function(point) {\n    \n};",
            "java": "class DetectSquares {\n\n    public DetectSquares() {\n        \n    }\n\n    public void add(int[] point) {\n        \n    }\n\n    public int count(int[] point) {\n        \n    }\n}",
            "cpp": "class DetectSquares {\npublic:\n    DetectSquares() {\n        \n    }\n\n    void add(vector<int> point) {\n        \n    }\n\n    int count(vector<int> point) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"DetectSquares\", \"add\", \"add\", \"add\", \"count\", \"count\", \"add\", \"count\"], [[], [[3,10]], [[11,1]], [[3,1]], [[11,10]], [[14,8]], [[11,10]], [[11,10]]]", "expected_output": "[null, null, null, null, 1, 0, null, 2]", "is_sample": True},
            {"input": "[\"DetectSquares\", \"add\", \"add\", \"add\", \"count\"], [[], [[5,5]], [[5,10]], [[10,5]], [[10,10]]]", "expected_output": "[null, null, null, null, 1]", "is_sample": True},
            {"input": "[\"DetectSquares\", \"add\", \"add\", \"add\", \"add\", \"count\"], [[], [[0,0]], [[0,1]], [[1,0]], [[1,1]], [[0,0]]]", "expected_output": "[null, null, null, null, null, 1]", "is_sample": False},
        ],
    },
]

"""Batch 4: Tree, Binary Tree, BST, Graph problems (~38 with company labels)."""

PROBLEMS_BATCH4 = [
    # ─── 1. Course Schedule II ──────────────────────────────────────────
    {
        "title": "Course Schedule II",
        "difficulty": "medium",
        "tags": ["graph"],
        "companies": ["amazon", "meta", "google", "microsoft"],
        "description": "There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`. Return the ordering of courses you should take to finish all courses. If it is impossible, return an empty array.\n\nExample 1:\nInput: numCourses = 2, prerequisites = [[1,0]]\nOutput: [0,1]\n\nExample 2:\nInput: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]\nOutput: [0,1,2,3]",
        "constraints": "1 <= numCourses <= 2000\n0 <= prerequisites.length <= numCourses * (numCourses - 1)\nprerequisites[i].length == 2\n0 <= ai, bi < numCourses\nai != bi\nAll pairs [ai, bi] are distinct.",
        "hints": "Use topological sort with BFS (Kahn's algorithm). Track in-degrees and process nodes with in-degree 0.",
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
    # ─── 2. Redundant Connection ────────────────────────────────────────
    {
        "title": "Redundant Connection",
        "difficulty": "medium",
        "tags": ["graph", "union-find"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "You are given a graph that started as a tree with `n` nodes labeled from `1` to `n`, with one additional edge added. The graph is represented as an array of edges. Return an edge that can be removed so that the resulting graph is a tree. If there are multiple answers, return the answer that occurs last in the input.\n\nExample 1:\nInput: edges = [[1,2],[1,3],[2,3]]\nOutput: [2,3]\n\nExample 2:\nInput: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]\nOutput: [1,4]",
        "constraints": "n == edges.length\n3 <= n <= 1000\nedges[i].length == 2\n1 <= ai < bi <= edges.length\nai != bi\nThere are no repeated edges.\nThe given graph is connected.",
        "hints": "Use Union-Find. The first edge that connects two already-connected components is the redundant one.",
        "starter_code": {
            "python": "class Solution:\n    def findRedundantConnection(self, edges: list[list[int]]) -> list[int]:\n        pass",
            "javascript": "var findRedundantConnection = function(edges) {\n    \n};",
            "java": "class Solution {\n    public int[] findRedundantConnection(int[][] edges) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> findRedundantConnection(vector<vector<int>>& edges) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2],[1,3],[2,3]]", "expected_output": "[2,3]", "is_sample": True},
            {"input": "[[1,2],[2,3],[3,4],[1,4],[1,5]]", "expected_output": "[1,4]", "is_sample": True},
            {"input": "[[1,2],[1,3],[3,4],[2,4]]", "expected_output": "[2,4]", "is_sample": False},
        ],
    },
    # ─── 3. Accounts Merge ──────────────────────────────────────────────
    {
        "title": "Accounts Merge",
        "difficulty": "hard",
        "tags": ["graph", "union-find"],
        "companies": ["meta", "google", "amazon", "microsoft"],
        "description": "Given a list of `accounts` where each element `accounts[i]` is a list of strings, where the first element is a name and the rest are emails. Merge accounts belonging to the same person (two accounts belong to the same person if there is some common email). Return the accounts in the format: name followed by sorted emails.\n\nExample 1:\nInput: accounts = [[\"John\",\"johnsmith@mail.com\",\"john_newyork@mail.com\"],[\"John\",\"johnsmith@mail.com\",\"john00@mail.com\"],[\"Mary\",\"mary@mail.com\"],[\"John\",\"johnnybravo@mail.com\"]]\nOutput: [[\"John\",\"john00@mail.com\",\"john_newyork@mail.com\",\"johnsmith@mail.com\"],[\"Mary\",\"mary@mail.com\"],[\"John\",\"johnnybravo@mail.com\"]]",
        "constraints": "1 <= accounts.length <= 1000\n2 <= accounts[i].length <= 10\n1 <= accounts[i][j].length <= 30\naccounts[i][0] consists of English letters.\naccounts[i][j] (for j > 0) is a valid email.",
        "hints": "Use Union-Find on email addresses. Map each email to an account index, then group connected emails together.",
        "starter_code": {
            "python": "class Solution:\n    def accountsMerge(self, accounts: list[list[str]]) -> list[list[str]]:\n        pass",
            "javascript": "var accountsMerge = function(accounts) {\n    \n};",
            "java": "class Solution {\n    public List<List<String>> accountsMerge(List<List<String>> accounts) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[\"John\",\"johnsmith@mail.com\",\"john_newyork@mail.com\"],[\"John\",\"johnsmith@mail.com\",\"john00@mail.com\"],[\"Mary\",\"mary@mail.com\"],[\"John\",\"johnnybravo@mail.com\"]]", "expected_output": "[[\"John\",\"john00@mail.com\",\"john_newyork@mail.com\",\"johnsmith@mail.com\"],[\"Mary\",\"mary@mail.com\"],[\"John\",\"johnnybravo@mail.com\"]]", "is_sample": True},
            {"input": "[[\"Alex\",\"a@mail.com\",\"b@mail.com\"],[\"Alex\",\"b@mail.com\",\"c@mail.com\"]]", "expected_output": "[[\"Alex\",\"a@mail.com\",\"b@mail.com\",\"c@mail.com\"]]", "is_sample": True},
            {"input": "[[\"David\",\"d@mail.com\"],[\"David\",\"e@mail.com\"]]", "expected_output": "[[\"David\",\"d@mail.com\"],[\"David\",\"e@mail.com\"]]", "is_sample": False},
        ],
    },
    # ─── 4. Network Delay Time ──────────────────────────────────────────
    {
        "title": "Network Delay Time",
        "difficulty": "medium",
        "tags": ["graph"],
        "companies": ["google", "amazon", "uber", "bloomberg"],
        "description": "You are given a network of `n` nodes labeled from `1` to `n`. You are given `times`, a list of travel times as directed edges `times[i] = (ui, vi, wi)` where `ui` is the source, `vi` is the target, and `wi` is the time. Send a signal from node `k`. Return the minimum time for all `n` nodes to receive the signal, or `-1` if not all nodes can be reached.\n\nExample 1:\nInput: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2\nOutput: 2\n\nExample 2:\nInput: times = [[1,2,1]], n = 2, k = 2\nOutput: -1",
        "constraints": "1 <= k <= n <= 100\n1 <= times.length <= 6000\ntimes[i].length == 3\n1 <= ui, vi <= n\nui != vi\n0 <= wi <= 100\nAll pairs (ui, vi) are unique.",
        "hints": "Use Dijkstra's algorithm. The answer is the maximum shortest-path distance to any node.",
        "starter_code": {
            "python": "class Solution:\n    def networkDelayTime(self, times: list[list[int]], n: int, k: int) -> int:\n        pass",
            "javascript": "var networkDelayTime = function(times, n, k) {\n    \n};",
            "java": "class Solution {\n    public int networkDelayTime(int[][] times, int n, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int networkDelayTime(vector<vector<int>>& times, int n, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[2,1,1],[2,3,1],[3,4,1]]\n4\n2", "expected_output": "2", "is_sample": True},
            {"input": "[[1,2,1]]\n2\n2", "expected_output": "-1", "is_sample": True},
            {"input": "[[1,2,1]]\n2\n1", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 5. Cheapest Flights Within K Stops ─────────────────────────────
    {
        "title": "Cheapest Flights Within K Stops",
        "difficulty": "hard",
        "tags": ["graph", "dynamic-programming"],
        "companies": ["amazon", "meta", "google", "airbnb"],
        "description": "There are `n` cities connected by some flights. You are given an array `flights` where `flights[i] = [fromi, toi, pricei]`. You are also given `src`, `dst`, and `k`. Return the cheapest price from `src` to `dst` with at most `k` stops. If there is no such route, return `-1`.\n\nExample 1:\nInput: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1\nOutput: 700\n\nExample 2:\nInput: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1\nOutput: 200",
        "constraints": "1 <= n <= 100\n0 <= flights.length <= n * (n - 1) / 2\nflights[i].length == 3\n0 <= fromi, toi < n\nfromi != toi\n1 <= pricei <= 10^4\n0 <= src, dst, k < n\nsrc != dst",
        "hints": "Use Bellman-Ford with at most k+1 relaxation rounds or BFS with pruning.",
        "starter_code": {
            "python": "class Solution:\n    def findCheapestPrice(self, n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:\n        pass",
            "javascript": "var findCheapestPrice = function(n, flights, src, dst, k) {\n    \n};",
            "java": "class Solution {\n    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "4\n[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]\n0\n3\n1", "expected_output": "700", "is_sample": True},
            {"input": "3\n[[0,1,100],[1,2,100],[0,2,500]]\n0\n2\n1", "expected_output": "200", "is_sample": True},
            {"input": "3\n[[0,1,100],[1,2,100],[0,2,500]]\n0\n2\n0", "expected_output": "500", "is_sample": False},
        ],
    },
    # ─── 6. Binary Tree Zigzag Level Order Traversal ────────────────────
    {
        "title": "Binary Tree Zigzag Level Order Traversal",
        "difficulty": "medium",
        "tags": ["tree", "binary-tree"],
        "companies": ["amazon", "meta", "microsoft", "bloomberg"],
        "description": "Given the `root` of a binary tree, return the zigzag level order traversal of its nodes' values (i.e., from left to right, then right to left for the next level and alternate between).\n\nExample 1:\nInput: root = [3,9,20,null,null,15,7]\nOutput: [[3],[20,9],[15,7]]\n\nExample 2:\nInput: root = [1]\nOutput: [[1]]",
        "constraints": "The number of nodes in the tree is in the range [0, 2000].\n-100 <= Node.val <= 100",
        "hints": "Use BFS level-order traversal. Reverse the order of nodes at every other level.",
        "starter_code": {
            "python": "# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val; self.left = left; self.right = right\nclass Solution:\n    def zigzagLevelOrder(self, root: TreeNode) -> list[list[int]]:\n        pass",
            "javascript": "var zigzagLevelOrder = function(root) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,9,20,null,null,15,7]", "expected_output": "[[3],[20,9],[15,7]]", "is_sample": True},
            {"input": "[1]", "expected_output": "[[1]]", "is_sample": True},
            {"input": "[]", "expected_output": "[]", "is_sample": False},
        ],
    },
    # ─── 7. Populating Next Right Pointers ──────────────────────────────
    {
        "title": "Populating Next Right Pointers in Each Node",
        "difficulty": "medium",
        "tags": ["tree", "binary-tree"],
        "companies": ["meta", "microsoft", "amazon", "bloomberg"],
        "description": "You are given a perfect binary tree where all leaves are on the same level and every parent has two children. Populate each `next` pointer to point to its next right node. If there is no next right node, set `next` to `NULL`. Initially, all next pointers are set to `NULL`.\n\nExample 1:\nInput: root = [1,2,3,4,5,6,7]\nOutput: [1,#,2,3,#,4,5,6,7,#]\nExplanation: '#' denotes the end of each level.\n\nExample 2:\nInput: root = []\nOutput: []",
        "constraints": "The number of nodes in the tree is in the range [0, 2^12 - 1].\n-1000 <= Node.val <= 1000",
        "hints": "Use the already-established next pointers to traverse each level. Connect children of adjacent nodes using parent's next pointer.",
        "starter_code": {
            "python": "# class Node:\n#     def __init__(self, val=0, left=None, right=None, next=None):\n#         self.val = val; self.left = left; self.right = right; self.next = next\nclass Solution:\n    def connect(self, root: 'Node') -> 'Node':\n        pass",
            "javascript": "var connect = function(root) {\n    \n};",
            "java": "class Solution {\n    public Node connect(Node root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    Node* connect(Node* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4,5,6,7]", "expected_output": "[1,#,2,3,#,4,5,6,7,#]", "is_sample": True},
            {"input": "[]", "expected_output": "[]", "is_sample": True},
            {"input": "[1,2,3]", "expected_output": "[1,#,2,3,#]", "is_sample": False},
        ],
    },
    # ─── 8. Flatten Binary Tree to Linked List ──────────────────────────
    {
        "title": "Flatten Binary Tree to Linked List",
        "difficulty": "medium",
        "tags": ["tree", "binary-tree", "linked-list"],
        "companies": ["meta", "microsoft", "amazon"],
        "description": "Given the `root` of a binary tree, flatten the tree into a \"linked list\". The linked list should use the same `TreeNode` class where the `right` child pointer points to the next node and the `left` child pointer is always `null`. The list should be in the same order as a pre-order traversal.\n\nExample 1:\nInput: root = [1,2,5,3,4,null,6]\nOutput: [1,null,2,null,3,null,4,null,5,null,6]\n\nExample 2:\nInput: root = []\nOutput: []",
        "constraints": "The number of nodes in the tree is in the range [0, 2000].\n-100 <= Node.val <= 100",
        "hints": "Use Morris traversal or reverse postorder (right, left, root) to flatten in-place.",
        "starter_code": {
            "python": "# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val; self.left = left; self.right = right\nclass Solution:\n    def flatten(self, root: TreeNode) -> None:\n        pass",
            "javascript": "var flatten = function(root) {\n    \n};",
            "java": "class Solution {\n    public void flatten(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void flatten(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,5,3,4,null,6]", "expected_output": "[1,null,2,null,3,null,4,null,5,null,6]", "is_sample": True},
            {"input": "[]", "expected_output": "[]", "is_sample": True},
            {"input": "[0]", "expected_output": "[0]", "is_sample": False},
        ],
    },
    # ─── 9. Path Sum II ─────────────────────────────────────────────────
    {
        "title": "Path Sum II",
        "difficulty": "medium",
        "tags": ["tree", "binary-tree", "backtracking"],
        "companies": ["meta", "amazon", "microsoft"],
        "description": "Given the `root` of a binary tree and an integer `targetSum`, return all root-to-leaf paths where the sum of the node values in the path equals `targetSum`. Each path should be returned as a list of the node values.\n\nExample 1:\nInput: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22\nOutput: [[5,4,11,2],[5,8,4,5]]\n\nExample 2:\nInput: root = [1,2,3], targetSum = 5\nOutput: []",
        "constraints": "The number of nodes in the tree is in the range [0, 5000].\n-1000 <= Node.val <= 1000\n-1000 <= targetSum <= 1000",
        "hints": "Use DFS with backtracking. Maintain a running path and check the sum at each leaf node.",
        "starter_code": {
            "python": "# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val; self.left = left; self.right = right\nclass Solution:\n    def pathSum(self, root: TreeNode, targetSum: int) -> list[list[int]]:\n        pass",
            "javascript": "var pathSum = function(root, targetSum) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[5,4,8,11,null,13,4,7,2,null,null,5,1]\n22", "expected_output": "[[5,4,11,2],[5,8,4,5]]", "is_sample": True},
            {"input": "[1,2,3]\n5", "expected_output": "[]", "is_sample": True},
            {"input": "[1,2]\n1", "expected_output": "[]", "is_sample": False},
        ],
    },
    # ─── 10. Path Sum III ────────────────────────────────────────────────
    {
        "title": "Path Sum III",
        "difficulty": "medium",
        "tags": ["tree", "binary-tree", "hash-table"],
        "companies": ["meta", "amazon", "google"],
        "description": "Given the `root` of a binary tree and an integer `targetSum`, return the number of paths where the sum of the values along the path equals `targetSum`. The path does not need to start or end at the root or a leaf, but it must go downwards (from parent to child).\n\nExample 1:\nInput: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8\nOutput: 3\nExplanation: The paths that sum to 8 are: [5,3], [5,2,1], [-3,11].\n\nExample 2:\nInput: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22\nOutput: 3",
        "constraints": "The number of nodes in the tree is in the range [0, 1000].\n-10^9 <= Node.val <= 10^9\n-1000 <= targetSum <= 1000",
        "hints": "Use prefix sum with a hash map. Track cumulative sums from root and check if (currentSum - targetSum) exists in the map.",
        "starter_code": {
            "python": "# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val; self.left = left; self.right = right\nclass Solution:\n    def pathSum(self, root: TreeNode, targetSum: int) -> int:\n        pass",
            "javascript": "var pathSum = function(root, targetSum) {\n    \n};",
            "java": "class Solution {\n    public int pathSum(TreeNode root, int targetSum) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int pathSum(TreeNode* root, int targetSum) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[10,5,-3,3,2,null,11,3,-2,null,1]\n8", "expected_output": "3", "is_sample": True},
            {"input": "[5,4,8,11,null,13,4,7,2,null,null,5,1]\n22", "expected_output": "3", "is_sample": True},
            {"input": "[1]\n1", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 11. Binary Tree Cameras ─────────────────────────────────────────
    {
        "title": "Binary Tree Cameras",
        "difficulty": "hard",
        "tags": ["tree", "binary-tree", "greedy"],
        "companies": ["amazon", "google", "microsoft"],
        "description": "You are given the `root` of a binary tree. We install cameras on the tree nodes where each camera at a node can monitor its parent, itself, and its immediate children. Return the minimum number of cameras needed to monitor all nodes of the tree.\n\nExample 1:\nInput: root = [0,0,null,0,0]\nOutput: 1\nExplanation: One camera at node 1 (0-indexed from root) is enough to monitor all nodes.\n\nExample 2:\nInput: root = [0,0,null,0,null,0,null,null,0]\nOutput: 2",
        "constraints": "The number of nodes in the tree is in the range [1, 1000].\nNode.val == 0",
        "hints": "Use a greedy DFS approach. Each node can be in one of three states: needs coverage, has a camera, or is covered. Place cameras at parents of uncovered leaves.",
        "starter_code": {
            "python": "# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val; self.left = left; self.right = right\nclass Solution:\n    def minCameraCover(self, root: TreeNode) -> int:\n        pass",
            "javascript": "var minCameraCover = function(root) {\n    \n};",
            "java": "class Solution {\n    public int minCameraCover(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minCameraCover(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[0,0,null,0,0]", "expected_output": "1", "is_sample": True},
            {"input": "[0,0,null,0,null,0,null,null,0]", "expected_output": "2", "is_sample": True},
            {"input": "[0]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 12. House Robber III ────────────────────────────────────────────
    {
        "title": "House Robber III",
        "difficulty": "medium",
        "tags": ["tree", "binary-tree", "dynamic-programming"],
        "companies": ["uber", "google", "amazon"],
        "description": "All houses in a neighborhood are arranged in the shape of a binary tree. Each house has a certain amount of money stashed. The thief cannot rob two directly-linked houses (parent and child). Given the `root`, return the maximum amount of money the thief can rob.\n\nExample 1:\nInput: root = [3,2,3,null,3,null,1]\nOutput: 7\nExplanation: 3 + 3 + 1 = 7.\n\nExample 2:\nInput: root = [3,4,5,1,3,null,1]\nOutput: 9\nExplanation: 4 + 5 = 9.",
        "constraints": "The number of nodes in the tree is in the range [1, 10^4].\n0 <= Node.val <= 10^4",
        "hints": "Use DFS returning two values per node: max money if robbing this node, and max money if not robbing this node.",
        "starter_code": {
            "python": "# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val; self.left = left; self.right = right\nclass Solution:\n    def rob(self, root: TreeNode) -> int:\n        pass",
            "javascript": "var rob = function(root) {\n    \n};",
            "java": "class Solution {\n    public int rob(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int rob(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,2,3,null,3,null,1]", "expected_output": "7", "is_sample": True},
            {"input": "[3,4,5,1,3,null,1]", "expected_output": "9", "is_sample": True},
            {"input": "[2,1,3,null,4]", "expected_output": "7", "is_sample": False},
        ],
    },
    # ─── 13. Recover Binary Search Tree ──────────────────────────────────
    {
        "title": "Recover Binary Search Tree",
        "difficulty": "medium",
        "tags": ["tree", "binary-search-tree"],
        "companies": ["amazon", "microsoft", "bloomberg"],
        "description": "You are given the `root` of a BST where the values of exactly two nodes were swapped by mistake. Recover the tree without changing its structure.\n\nExample 1:\nInput: root = [1,3,null,null,2]\nOutput: [3,1,null,null,2]\nExplanation: 3 and 1 are swapped.\n\nExample 2:\nInput: root = [3,1,4,null,null,2]\nOutput: [2,1,4,null,null,3]\nExplanation: 2 and 3 are swapped.",
        "constraints": "The number of nodes in the tree is in the range [2, 1000].\n-2^31 <= Node.val <= 2^31 - 1",
        "hints": "Do an in-order traversal and find the two nodes that are out of order. Swap their values.",
        "starter_code": {
            "python": "# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val; self.left = left; self.right = right\nclass Solution:\n    def recoverTree(self, root: TreeNode) -> None:\n        pass",
            "javascript": "var recoverTree = function(root) {\n    \n};",
            "java": "class Solution {\n    public void recoverTree(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void recoverTree(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,3,null,null,2]", "expected_output": "[3,1,null,null,2]", "is_sample": True},
            {"input": "[3,1,4,null,null,2]", "expected_output": "[2,1,4,null,null,3]", "is_sample": True},
            {"input": "[2,3,1]", "expected_output": "[2,1,3]", "is_sample": False},
        ],
    },
    # ─── 14. Trim a Binary Search Tree ──────────────────────────────────
    {
        "title": "Trim a Binary Search Tree",
        "difficulty": "easy",
        "tags": ["tree", "binary-search-tree", "recursion"],
        "companies": ["amazon", "microsoft", "bloomberg"],
        "description": "Given the `root` of a BST and the lowest and highest boundaries as `low` and `high`, trim the tree so that all its elements lie in `[low, high]`. Return the root of the trimmed BST. The resulting tree should still be a valid BST.\n\nExample 1:\nInput: root = [1,0,2], low = 1, high = 2\nOutput: [1,null,2]\n\nExample 2:\nInput: root = [3,0,4,null,2,null,null,1], low = 1, high = 3\nOutput: [3,2,null,1]",
        "constraints": "The number of nodes in the tree is in the range [1, 10^4].\n0 <= Node.val <= 10^4\nThe value of each node is unique.\nroot is guaranteed to be a valid BST.\n0 <= low <= high <= 10^4",
        "hints": "Use recursion. If node.val < low, the answer is in the right subtree. If node.val > high, the answer is in the left subtree.",
        "starter_code": {
            "python": "# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val; self.left = left; self.right = right\nclass Solution:\n    def trimBST(self, root: TreeNode, low: int, high: int) -> TreeNode:\n        pass",
            "javascript": "var trimBST = function(root, low, high) {\n    \n};",
            "java": "class Solution {\n    public TreeNode trimBST(TreeNode root, int low, int high) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    TreeNode* trimBST(TreeNode* root, int low, int high) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,0,2]\n1\n2", "expected_output": "[1,null,2]", "is_sample": True},
            {"input": "[3,0,4,null,2,null,null,1]\n1\n3", "expected_output": "[3,2,null,1]", "is_sample": True},
            {"input": "[1,null,2]\n2\n4", "expected_output": "[2]", "is_sample": False},
        ],
    },
    # ─── 15. Delete Node in a BST ───────────────────────────────────────
    {
        "title": "Delete Node in a BST",
        "difficulty": "medium",
        "tags": ["tree", "binary-search-tree"],
        "companies": ["amazon", "microsoft", "linkedin"],
        "description": "Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST. The deletion can be broken down into two stages: search for the node, then delete it.\n\nExample 1:\nInput: root = [5,3,6,2,4,null,7], key = 3\nOutput: [5,4,6,2,null,null,7]\n\nExample 2:\nInput: root = [5,3,6,2,4,null,7], key = 0\nOutput: [5,3,6,2,4,null,7]",
        "constraints": "The number of nodes in the tree is in the range [0, 10^4].\n-10^5 <= Node.val <= 10^5\nEach node has a unique value.\nroot is a valid BST.\n-10^5 <= key <= 10^5",
        "hints": "When deleting a node with two children, replace it with its in-order successor (smallest node in the right subtree).",
        "starter_code": {
            "python": "# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val; self.left = left; self.right = right\nclass Solution:\n    def deleteNode(self, root: TreeNode, key: int) -> TreeNode:\n        pass",
            "javascript": "var deleteNode = function(root, key) {\n    \n};",
            "java": "class Solution {\n    public TreeNode deleteNode(TreeNode root, int key) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    TreeNode* deleteNode(TreeNode* root, int key) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[5,3,6,2,4,null,7]\n3", "expected_output": "[5,4,6,2,null,null,7]", "is_sample": True},
            {"input": "[5,3,6,2,4,null,7]\n0", "expected_output": "[5,3,6,2,4,null,7]", "is_sample": True},
            {"input": "[]\n0", "expected_output": "[]", "is_sample": False},
        ],
    },
    # ─── 16. Insert into a Binary Search Tree ───────────────────────────
    {
        "title": "Insert into a Binary Search Tree",
        "difficulty": "easy",
        "tags": ["tree", "binary-search-tree"],
        "companies": ["amazon", "microsoft", "google"],
        "description": "You are given the `root` node of a BST and a `val` to insert into the tree. Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.\n\nExample 1:\nInput: root = [4,2,7,1,3], val = 5\nOutput: [4,2,7,1,3,5]\n\nExample 2:\nInput: root = [40,20,60,10,30,50,70], val = 25\nOutput: [40,20,60,10,30,50,70,null,null,25]",
        "constraints": "The number of nodes in the tree is in the range [0, 10^4].\n-10^8 <= Node.val <= 10^8\nAll values in the BST are unique.\n-10^8 <= val <= 10^8\nIt's guaranteed that val does not exist in the original BST.",
        "hints": "Traverse the BST comparing val with the current node. Insert at the first null position you find.",
        "starter_code": {
            "python": "# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val; self.left = left; self.right = right\nclass Solution:\n    def insertIntoBST(self, root: TreeNode, val: int) -> TreeNode:\n        pass",
            "javascript": "var insertIntoBST = function(root, val) {\n    \n};",
            "java": "class Solution {\n    public TreeNode insertIntoBST(TreeNode root, int val) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    TreeNode* insertIntoBST(TreeNode* root, int val) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[4,2,7,1,3]\n5", "expected_output": "[4,2,7,1,3,5]", "is_sample": True},
            {"input": "[40,20,60,10,30,50,70]\n25", "expected_output": "[40,20,60,10,30,50,70,null,null,25]", "is_sample": True},
            {"input": "[]\n5", "expected_output": "[5]", "is_sample": False},
        ],
    },
    # ─── 17. Surrounded Regions ─────────────────────────────────────────
    {
        "title": "Surrounded Regions",
        "difficulty": "medium",
        "tags": ["graph", "matrix"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "Given an `m x n` matrix `board` containing `'X'` and `'O'`, capture all regions that are 4-directionally surrounded by `'X'`. A region is captured by flipping all `'O'`s into `'X'`s in that surrounded region.\n\nExample 1:\nInput: board = [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]\nOutput: [[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]\n\nExample 2:\nInput: board = [[\"X\"]]\nOutput: [[\"X\"]]",
        "constraints": "m == board.length\nn == board[i].length\n1 <= m, n <= 200\nboard[i][j] is 'X' or 'O'.",
        "hints": "Start DFS/BFS from border 'O' cells to mark all 'O's connected to the border. Then flip all remaining 'O's to 'X'.",
        "starter_code": {
            "python": "class Solution:\n    def solve(self, board: list[list[str]]) -> None:\n        pass",
            "javascript": "var solve = function(board) {\n    \n};",
            "java": "class Solution {\n    public void solve(char[][] board) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void solve(vector<vector<char>>& board) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"O\",\"X\"],[\"X\",\"X\",\"O\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]", "expected_output": "[[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"X\",\"X\",\"X\"],[\"X\",\"O\",\"X\",\"X\"]]", "is_sample": True},
            {"input": "[[\"X\"]]", "expected_output": "[[\"X\"]]", "is_sample": True},
            {"input": "[[\"O\",\"O\"],[\"O\",\"O\"]]", "expected_output": "[[\"O\",\"O\"],[\"O\",\"O\"]]", "is_sample": False},
        ],
    },
    # ─── 18. 01 Matrix ──────────────────────────────────────────────────
    {
        "title": "01 Matrix",
        "difficulty": "medium",
        "tags": ["graph", "matrix"],
        "companies": ["google", "amazon", "microsoft", "uber"],
        "description": "Given an `m x n` binary matrix `mat`, return the distance of the nearest `0` for each cell. The distance between two adjacent cells is `1`.\n\nExample 1:\nInput: mat = [[0,0,0],[0,1,0],[0,0,0]]\nOutput: [[0,0,0],[0,1,0],[0,0,0]]\n\nExample 2:\nInput: mat = [[0,0,0],[0,1,0],[1,1,1]]\nOutput: [[0,0,0],[0,1,0],[1,2,1]]",
        "constraints": "m == mat.length\nn == mat[i].length\n1 <= m, n <= 10^4\n1 <= m * n <= 10^4\nmat[i][j] is either 0 or 1.\nThere is at least one 0 in mat.",
        "hints": "Use multi-source BFS starting from all 0 cells simultaneously.",
        "starter_code": {
            "python": "class Solution:\n    def updateMatrix(self, mat: list[list[int]]) -> list[list[int]]:\n        pass",
            "javascript": "var updateMatrix = function(mat) {\n    \n};",
            "java": "class Solution {\n    public int[][] updateMatrix(int[][] mat) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[0,0,0],[0,1,0],[0,0,0]]", "expected_output": "[[0,0,0],[0,1,0],[0,0,0]]", "is_sample": True},
            {"input": "[[0,0,0],[0,1,0],[1,1,1]]", "expected_output": "[[0,0,0],[0,1,0],[1,2,1]]", "is_sample": True},
            {"input": "[[0],[1]]", "expected_output": "[[0],[1]]", "is_sample": False},
        ],
    },
    # ─── 19. Rotting Oranges ────────────────────────────────────────────
    {
        "title": "Rotting Oranges",
        "difficulty": "easy",
        "tags": ["graph", "matrix"],
        "companies": ["amazon", "microsoft", "google", "uber"],
        "description": "You are given an `m x n` grid where each cell can have one of three values: `0` (empty), `1` (fresh orange), or `2` (rotten orange). Every minute, any fresh orange adjacent (4-directionally) to a rotten orange becomes rotten. Return the minimum number of minutes until no fresh orange remains. If this is impossible, return `-1`.\n\nExample 1:\nInput: grid = [[2,1,1],[1,1,0],[0,1,1]]\nOutput: 4\n\nExample 2:\nInput: grid = [[2,1,1],[0,1,1],[1,0,1]]\nOutput: -1",
        "constraints": "m == grid.length\nn == grid[i].length\n1 <= m, n <= 10\ngrid[i][j] is 0, 1, or 2.",
        "hints": "Use multi-source BFS from all initially rotten oranges. Track the number of minutes as BFS levels.",
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
    # ─── 20. Open the Lock ──────────────────────────────────────────────
    {
        "title": "Open the Lock",
        "difficulty": "medium",
        "tags": ["graph"],
        "companies": ["google", "amazon", "meta"],
        "description": "You have a lock with 4 circular wheels. Each wheel has digits `0-9`. You can turn each wheel one slot up or down. The lock initially starts at `'0000'`. You are given a list of `deadends` and a `target`. Return the minimum total number of turns to reach the target, or `-1` if it is impossible.\n\nExample 1:\nInput: deadends = [\"0201\",\"0101\",\"0102\",\"1212\",\"2002\"], target = \"0202\"\nOutput: 6\n\nExample 2:\nInput: deadends = [\"8888\"], target = \"0009\"\nOutput: 1",
        "constraints": "1 <= deadends.length <= 500\ndeadends[i].length == 4\ntarget.length == 4\ntarget will not be in the list deadends.\ntarget and deadends[i] consist of digits only.",
        "hints": "Use BFS from '0000'. Each state has 8 neighbors (4 wheels x 2 directions). Skip deadends.",
        "starter_code": {
            "python": "class Solution:\n    def openLock(self, deadends: list[str], target: str) -> int:\n        pass",
            "javascript": "var openLock = function(deadends, target) {\n    \n};",
            "java": "class Solution {\n    public int openLock(String[] deadends, String target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int openLock(vector<string>& deadends, string target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"0201\",\"0101\",\"0102\",\"1212\",\"2002\"]\n\"0202\"", "expected_output": "6", "is_sample": True},
            {"input": "[\"8888\"]\n\"0009\"", "expected_output": "1", "is_sample": True},
            {"input": "[\"0000\"]\n\"8888\"", "expected_output": "-1", "is_sample": False},
        ],
    },
    # ─── 21. Shortest Path in Binary Matrix ─────────────────────────────
    {
        "title": "Shortest Path in Binary Matrix",
        "difficulty": "medium",
        "tags": ["graph", "matrix"],
        "companies": ["meta", "amazon", "google"],
        "description": "Given an `n x n` binary matrix `grid`, return the length of the shortest clear path from top-left to bottom-right. A clear path connects cells of value `0` and allows 8-directional movement. The length is the number of visited cells. If there is no clear path, return `-1`.\n\nExample 1:\nInput: grid = [[0,1],[1,0]]\nOutput: 2\n\nExample 2:\nInput: grid = [[0,0,0],[1,1,0],[1,1,0]]\nOutput: 4",
        "constraints": "n == grid.length\nn == grid[i].length\n1 <= n <= 100\ngrid[i][j] is 0 or 1.",
        "hints": "Use BFS starting from (0,0). Explore all 8 directions. Return distance when you reach (n-1, n-1).",
        "starter_code": {
            "python": "class Solution:\n    def shortestPathBinaryMatrix(self, grid: list[list[int]]) -> int:\n        pass",
            "javascript": "var shortestPathBinaryMatrix = function(grid) {\n    \n};",
            "java": "class Solution {\n    public int shortestPathBinaryMatrix(int[][] grid) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[0,1],[1,0]]", "expected_output": "2", "is_sample": True},
            {"input": "[[0,0,0],[1,1,0],[1,1,0]]", "expected_output": "4", "is_sample": True},
            {"input": "[[1,0,0],[1,1,0],[1,1,0]]", "expected_output": "-1", "is_sample": False},
        ],
    },
    # ─── 22. Is Graph Bipartite ─────────────────────────────────────────
    {
        "title": "Is Graph Bipartite?",
        "difficulty": "easy",
        "tags": ["graph"],
        "companies": ["meta", "amazon", "linkedin", "bytedance"],
        "description": "There is an undirected graph with `n` nodes where each node is labeled from `0` to `n - 1`. You are given a 2D array `graph` where `graph[u]` is an array of nodes adjacent to `u`. Return `true` if the graph is bipartite (can be 2-colored so no adjacent nodes share the same color).\n\nExample 1:\nInput: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]\nOutput: false\n\nExample 2:\nInput: graph = [[1,3],[0,2],[1,3],[0,2]]\nOutput: true",
        "constraints": "graph.length == n\n1 <= n <= 100\n0 <= graph[u].length < n\n0 <= graph[u][i] <= n - 1\ngraph[u] does not contain u.\nAll values in graph[u] are unique.\nIf graph[u] contains v, then graph[v] contains u.",
        "hints": "Use BFS or DFS to try 2-coloring the graph. If you find a conflict, it is not bipartite.",
        "starter_code": {
            "python": "class Solution:\n    def isBipartite(self, graph: list[list[int]]) -> bool:\n        pass",
            "javascript": "var isBipartite = function(graph) {\n    \n};",
            "java": "class Solution {\n    public boolean isBipartite(int[][] graph) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isBipartite(vector<vector<int>>& graph) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2,3],[0,2],[0,1,3],[0,2]]", "expected_output": "false", "is_sample": True},
            {"input": "[[1,3],[0,2],[1,3],[0,2]]", "expected_output": "true", "is_sample": True},
            {"input": "[[],[]]", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 23. Evaluate Division ──────────────────────────────────────────
    {
        "title": "Evaluate Division",
        "difficulty": "medium",
        "tags": ["graph"],
        "companies": ["google", "meta", "amazon", "uber"],
        "description": "You are given `equations` like `A / B = k` and `queries` to evaluate. Each equation `equations[i] = [Ai, Bi]` with `values[i]` means `Ai / Bi = values[i]`. For each query `[Cj, Dj]`, return `Cj / Dj` or `-1.0` if the answer cannot be determined.\n\nExample 1:\nInput: equations = [[\"a\",\"b\"],[\"b\",\"c\"]], values = [2.0,3.0], queries = [[\"a\",\"c\"],[\"b\",\"a\"],[\"a\",\"e\"],[\"a\",\"a\"],[\"x\",\"x\"]]\nOutput: [6.0,0.5,-1.0,1.0,-1.0]\n\nExample 2:\nInput: equations = [[\"a\",\"b\"]], values = [0.5], queries = [[\"a\",\"b\"],[\"b\",\"a\"],[\"a\",\"c\"],[\"x\",\"y\"]]\nOutput: [0.5,2.0,-1.0,-1.0]",
        "constraints": "1 <= equations.length <= 20\nequations[i].length == 2\n1 <= Ai.length, Bi.length <= 5\nvalues.length == equations.length\n0.0 < values[i] <= 20.0\n1 <= queries.length <= 20\nqueries[i].length == 2\n1 <= Cj.length, Dj.length <= 5\nAi, Bi, Cj, Dj consist of lower case English letters and digits.",
        "hints": "Build a weighted graph where edge A->B has weight k and B->A has weight 1/k. For each query, find a path using BFS/DFS and multiply the weights.",
        "starter_code": {
            "python": "class Solution:\n    def calcEquation(self, equations: list[list[str]], values: list[float], queries: list[list[str]]) -> list[float]:\n        pass",
            "javascript": "var calcEquation = function(equations, values, queries) {\n    \n};",
            "java": "class Solution {\n    public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[\"a\",\"b\"],[\"b\",\"c\"]]\n[2.0,3.0]\n[[\"a\",\"c\"],[\"b\",\"a\"],[\"a\",\"e\"],[\"a\",\"a\"],[\"x\",\"x\"]]", "expected_output": "[6.0,0.5,-1.0,1.0,-1.0]", "is_sample": True},
            {"input": "[[\"a\",\"b\"]]\n[0.5]\n[[\"a\",\"b\"],[\"b\",\"a\"],[\"a\",\"c\"],[\"x\",\"y\"]]", "expected_output": "[0.5,2.0,-1.0,-1.0]", "is_sample": True},
            {"input": "[[\"a\",\"b\"],[\"b\",\"c\"],[\"a\",\"c\"]]\n[2.0,3.0,6.0]\n[[\"a\",\"c\"]]", "expected_output": "[6.0]", "is_sample": False},
        ],
    },
    # ─── 24. Reconstruct Itinerary ──────────────────────────────────────
    {
        "title": "Reconstruct Itinerary",
        "difficulty": "hard",
        "tags": ["graph"],
        "companies": ["google", "meta", "amazon", "uber"],
        "description": "You are given a list of airline `tickets` where `tickets[i] = [fromi, toi]` represent departure and arrival airports. Reconstruct the itinerary starting from `\"JFK\"` and return it. If there are multiple valid itineraries, return the lexicographically smallest one. You must use all tickets exactly once.\n\nExample 1:\nInput: tickets = [[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]\nOutput: [\"JFK\",\"MUC\",\"LHR\",\"SFO\",\"SJC\"]\n\nExample 2:\nInput: tickets = [[\"JFK\",\"SFO\"],[\"JFK\",\"ATL\"],[\"SFO\",\"ATL\"],[\"ATL\",\"JFK\"],[\"ATL\",\"SFO\"]]\nOutput: [\"JFK\",\"ATL\",\"JFK\",\"SFO\",\"ATL\",\"SFO\"]",
        "constraints": "1 <= tickets.length <= 300\ntickets[i].length == 2\nfromi.length == 3\ntoi.length == 3\nfromi and toi consist of uppercase English letters.\nfromi != toi",
        "hints": "Use Hierholzer's algorithm to find an Eulerian path. Sort neighbors lexicographically and use a stack-based DFS.",
        "starter_code": {
            "python": "class Solution:\n    def findItinerary(self, tickets: list[list[str]]) -> list[str]:\n        pass",
            "javascript": "var findItinerary = function(tickets) {\n    \n};",
            "java": "class Solution {\n    public List<String> findItinerary(List<List<String>> tickets) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<string> findItinerary(vector<vector<string>>& tickets) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]]", "expected_output": "[\"JFK\",\"MUC\",\"LHR\",\"SFO\",\"SJC\"]", "is_sample": True},
            {"input": "[[\"JFK\",\"SFO\"],[\"JFK\",\"ATL\"],[\"SFO\",\"ATL\"],[\"ATL\",\"JFK\"],[\"ATL\",\"SFO\"]]", "expected_output": "[\"JFK\",\"ATL\",\"JFK\",\"SFO\",\"ATL\",\"SFO\"]", "is_sample": True},
            {"input": "[[\"JFK\",\"KUL\"],[\"JFK\",\"NRT\"],[\"NRT\",\"JFK\"]]", "expected_output": "[\"JFK\",\"NRT\",\"JFK\",\"KUL\"]", "is_sample": False},
        ],
    },
    # ─── 25. Min Cost to Connect All Points ─────────────────────────────
    {
        "title": "Min Cost to Connect All Points",
        "difficulty": "medium",
        "tags": ["graph"],
        "companies": ["amazon", "microsoft", "google"],
        "description": "You are given an array `points` where `points[i] = [xi, yi]` represents a point on the 2D plane. The cost of connecting two points is the Manhattan distance `|xi - xj| + |yi - yj|`. Return the minimum cost to make all points connected (every pair of points has a path between them).\n\nExample 1:\nInput: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]\nOutput: 20\n\nExample 2:\nInput: points = [[3,12],[-2,5],[-4,1]]\nOutput: 18",
        "constraints": "1 <= points.length <= 1000\n-10^6 <= xi, yi <= 10^6\nAll pairs (xi, yi) are distinct.",
        "hints": "Use Prim's or Kruskal's algorithm for Minimum Spanning Tree (MST). With Prim's, use a min-heap.",
        "starter_code": {
            "python": "class Solution:\n    def minCostConnectPoints(self, points: list[list[int]]) -> int:\n        pass",
            "javascript": "var minCostConnectPoints = function(points) {\n    \n};",
            "java": "class Solution {\n    public int minCostConnectPoints(int[][] points) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minCostConnectPoints(vector<vector<int>>& points) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[0,0],[2,2],[3,10],[5,2],[7,0]]", "expected_output": "20", "is_sample": True},
            {"input": "[[3,12],[-2,5],[-4,1]]", "expected_output": "18", "is_sample": True},
            {"input": "[[0,0]]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 26. Longest Increasing Path in a Matrix ────────────────────────
    {
        "title": "Longest Increasing Path in a Matrix",
        "difficulty": "hard",
        "tags": ["matrix", "graph", "dynamic-programming"],
        "companies": ["google", "meta", "amazon", "microsoft"],
        "description": "Given an `m x n` integers matrix, return the length of the longest increasing path. From each cell, you can move in four directions (up, down, left, right). You may not move diagonally or outside the boundary.\n\nExample 1:\nInput: matrix = [[9,9,4],[6,6,8],[2,1,1]]\nOutput: 4\nExplanation: The longest increasing path is [1, 2, 6, 9].\n\nExample 2:\nInput: matrix = [[3,4,5],[3,2,6],[2,2,1]]\nOutput: 4\nExplanation: The longest increasing path is [3, 4, 5, 6].",
        "constraints": "m == matrix.length\nn == matrix[i].length\n1 <= m, n <= 200\n0 <= matrix[i][j] <= 2^31 - 1",
        "hints": "Use DFS with memoization. The longest path from each cell depends only on cells with strictly greater values.",
        "starter_code": {
            "python": "class Solution:\n    def longestIncreasingPath(self, matrix: list[list[int]]) -> int:\n        pass",
            "javascript": "var longestIncreasingPath = function(matrix) {\n    \n};",
            "java": "class Solution {\n    public int longestIncreasingPath(int[][] matrix) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int longestIncreasingPath(vector<vector<int>>& matrix) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[9,9,4],[6,6,8],[2,1,1]]", "expected_output": "4", "is_sample": True},
            {"input": "[[3,4,5],[3,2,6],[2,2,1]]", "expected_output": "4", "is_sample": True},
            {"input": "[[1]]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 27. Island Perimeter ───────────────────────────────────────────
    {
        "title": "Island Perimeter",
        "difficulty": "easy",
        "tags": ["matrix"],
        "companies": ["google", "meta", "amazon"],
        "description": "You are given a `row x col` grid representing a map where `grid[i][j] = 1` represents land and `grid[i][j] = 0` represents water. The grid is completely surrounded by water. There is exactly one island. Determine the perimeter of the island.\n\nExample 1:\nInput: grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]\nOutput: 16\n\nExample 2:\nInput: grid = [[1]]\nOutput: 4",
        "constraints": "row == grid.length\ncol == grid[i].length\n1 <= row, col <= 100\ngrid[i][j] is 0 or 1.\nThere is exactly one island.",
        "hints": "For each land cell, add 4 to the perimeter and subtract 2 for each adjacent land cell (shared edge counted twice).",
        "starter_code": {
            "python": "class Solution:\n    def islandPerimeter(self, grid: list[list[int]]) -> int:\n        pass",
            "javascript": "var islandPerimeter = function(grid) {\n    \n};",
            "java": "class Solution {\n    public int islandPerimeter(int[][] grid) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int islandPerimeter(vector<vector<int>>& grid) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]", "expected_output": "16", "is_sample": True},
            {"input": "[[1]]", "expected_output": "4", "is_sample": True},
            {"input": "[[1,0]]", "expected_output": "4", "is_sample": False},
        ],
    },
    # ─── 28. Leaf-Similar Trees ─────────────────────────────────────────
    {
        "title": "Leaf-Similar Trees",
        "difficulty": "easy",
        "tags": ["tree", "binary-tree"],
        "companies": ["amazon", "google", "adobe"],
        "description": "Two binary trees are leaf-similar if their leaf value sequences (from left to right) are the same. Given the roots of two binary trees `root1` and `root2`, return `true` if and only if they are leaf-similar.\n\nExample 1:\nInput: root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]\nOutput: true\n\nExample 2:\nInput: root1 = [1,2,3], root2 = [1,3,2]\nOutput: false",
        "constraints": "The number of nodes in each tree will be in the range [1, 200].\nBoth trees will have values in the range [0, 200].",
        "hints": "Collect the leaf sequences of both trees using DFS and compare them.",
        "starter_code": {
            "python": "# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val; self.left = left; self.right = right\nclass Solution:\n    def leafSimilar(self, root1: TreeNode, root2: TreeNode) -> bool:\n        pass",
            "javascript": "var leafSimilar = function(root1, root2) {\n    \n};",
            "java": "class Solution {\n    public boolean leafSimilar(TreeNode root1, TreeNode root2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool leafSimilar(TreeNode* root1, TreeNode* root2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,5,1,6,2,9,8,null,null,7,4]\n[3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]", "expected_output": "true", "is_sample": True},
            {"input": "[1,2,3]\n[1,3,2]", "expected_output": "false", "is_sample": True},
            {"input": "[1]\n[1]", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 29. Sum of Left Leaves ─────────────────────────────────────────
    {
        "title": "Sum of Left Leaves",
        "difficulty": "easy",
        "tags": ["tree", "binary-tree"],
        "companies": ["meta", "amazon", "adobe"],
        "description": "Given the `root` of a binary tree, return the sum of all left leaves. A leaf is a node with no children. A left leaf is a leaf that is the left child of its parent.\n\nExample 1:\nInput: root = [3,9,20,null,null,15,7]\nOutput: 24\nExplanation: 9 and 15 are the left leaves, 9 + 15 = 24.\n\nExample 2:\nInput: root = [1]\nOutput: 0",
        "constraints": "The number of nodes in the tree is in the range [1, 1000].\n-1000 <= Node.val <= 1000",
        "hints": "Use DFS and pass a flag indicating if the current node is a left child. Sum values only at leaf nodes that are left children.",
        "starter_code": {
            "python": "# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val; self.left = left; self.right = right\nclass Solution:\n    def sumOfLeftLeaves(self, root: TreeNode) -> int:\n        pass",
            "javascript": "var sumOfLeftLeaves = function(root) {\n    \n};",
            "java": "class Solution {\n    public int sumOfLeftLeaves(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int sumOfLeftLeaves(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,9,20,null,null,15,7]", "expected_output": "24", "is_sample": True},
            {"input": "[1]", "expected_output": "0", "is_sample": True},
            {"input": "[1,2,3,4,5]", "expected_output": "4", "is_sample": False},
        ],
    },
    # ─── 30. Find Bottom Left Tree Value ────────────────────────────────
    {
        "title": "Find Bottom Left Tree Value",
        "difficulty": "easy",
        "tags": ["tree", "binary-tree"],
        "companies": ["amazon", "microsoft", "bloomberg"],
        "description": "Given the `root` of a binary tree, return the leftmost value in the last row of the tree.\n\nExample 1:\nInput: root = [2,1,3]\nOutput: 1\n\nExample 2:\nInput: root = [1,2,3,4,null,5,6,null,null,7]\nOutput: 7",
        "constraints": "The number of nodes in the tree is in the range [1, 10^4].\n-2^31 <= Node.val <= 2^31 - 1",
        "hints": "Use BFS level-order traversal. The first node in the last level is the answer, or use right-to-left BFS where the last node processed is the answer.",
        "starter_code": {
            "python": "# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val; self.left = left; self.right = right\nclass Solution:\n    def findBottomLeftValue(self, root: TreeNode) -> int:\n        pass",
            "javascript": "var findBottomLeftValue = function(root) {\n    \n};",
            "java": "class Solution {\n    public int findBottomLeftValue(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findBottomLeftValue(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,1,3]", "expected_output": "1", "is_sample": True},
            {"input": "[1,2,3,4,null,5,6,null,null,7]", "expected_output": "7", "is_sample": True},
            {"input": "[1]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 31. Find Largest Value in Each Tree Row ────────────────────────
    {
        "title": "Find Largest Value in Each Tree Row",
        "difficulty": "easy",
        "tags": ["tree", "binary-tree"],
        "companies": ["amazon", "microsoft", "linkedin"],
        "description": "Given the `root` of a binary tree, return an array of the largest value in each row of the tree (0-indexed).\n\nExample 1:\nInput: root = [1,3,2,5,3,null,9]\nOutput: [1,3,9]\n\nExample 2:\nInput: root = [1,2,3]\nOutput: [1,3]",
        "constraints": "The number of nodes in the tree will be in the range [0, 10^4].\n-2^31 <= Node.val <= 2^31 - 1",
        "hints": "Use BFS level-order traversal and track the maximum value at each level.",
        "starter_code": {
            "python": "# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val; self.left = left; self.right = right\nclass Solution:\n    def largestValues(self, root: TreeNode) -> list[int]:\n        pass",
            "javascript": "var largestValues = function(root) {\n    \n};",
            "java": "class Solution {\n    public List<Integer> largestValues(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> largestValues(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,3,2,5,3,null,9]", "expected_output": "[1,3,9]", "is_sample": True},
            {"input": "[1,2,3]", "expected_output": "[1,3]", "is_sample": True},
            {"input": "[]", "expected_output": "[]", "is_sample": False},
        ],
    },
    # ─── 32. Maximum Width of Binary Tree ───────────────────────────────
    {
        "title": "Maximum Width of Binary Tree",
        "difficulty": "medium",
        "tags": ["tree", "binary-tree"],
        "companies": ["amazon", "google", "bloomberg", "microsoft"],
        "description": "Given the `root` of a binary tree, return the maximum width of the given tree. The width of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where null nodes between the end-nodes that would be present in a complete binary tree are also counted.\n\nExample 1:\nInput: root = [1,3,2,5,3,null,9]\nOutput: 4\nExplanation: The maximum width exists in the third level with length 4 (5,3,null,9).\n\nExample 2:\nInput: root = [1,3,2,5,null,null,9,6,null,7]\nOutput: 7",
        "constraints": "The number of nodes in the tree is in the range [1, 3000].\n-100 <= Node.val <= 100",
        "hints": "Use BFS with position indices. For node at position i, left child is at 2*i and right child at 2*i+1. Width = rightmost - leftmost + 1.",
        "starter_code": {
            "python": "# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val; self.left = left; self.right = right\nclass Solution:\n    def widthOfBinaryTree(self, root: TreeNode) -> int:\n        pass",
            "javascript": "var widthOfBinaryTree = function(root) {\n    \n};",
            "java": "class Solution {\n    public int widthOfBinaryTree(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int widthOfBinaryTree(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,3,2,5,3,null,9]", "expected_output": "4", "is_sample": True},
            {"input": "[1,3,2,5,null,null,9,6,null,7]", "expected_output": "7", "is_sample": True},
            {"input": "[1]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 33. Vertical Order Traversal of a Binary Tree ──────────────────
    {
        "title": "Vertical Order Traversal of a Binary Tree",
        "difficulty": "hard",
        "tags": ["tree", "binary-tree", "sorting"],
        "companies": ["meta", "amazon", "bloomberg", "microsoft"],
        "description": "Given the `root` of a binary tree, calculate the vertical order traversal. For each node at position `(row, col)`, its left child is at `(row+1, col-1)` and right child at `(row+1, col+1)`. The root is at `(0, 0)`. Return a list of lists of node values ordered by column (left to right), then by row (top to bottom), then by value (ascending).\n\nExample 1:\nInput: root = [3,9,20,null,null,15,7]\nOutput: [[9],[3,15],[20],[7]]\n\nExample 2:\nInput: root = [1,2,3,4,5,6,7]\nOutput: [[4],[2],[1,5,6],[3],[7]]",
        "constraints": "The number of nodes in the tree is in the range [1, 1000].\n0 <= Node.val <= 1000",
        "hints": "Use DFS or BFS to collect (col, row, val) for each node. Sort by col, then row, then val, and group by col.",
        "starter_code": {
            "python": "# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val; self.left = left; self.right = right\nclass Solution:\n    def verticalTraversal(self, root: TreeNode) -> list[list[int]]:\n        pass",
            "javascript": "var verticalTraversal = function(root) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> verticalTraversal(TreeNode root) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> verticalTraversal(TreeNode* root) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,9,20,null,null,15,7]", "expected_output": "[[9],[3,15],[20],[7]]", "is_sample": True},
            {"input": "[1,2,3,4,5,6,7]", "expected_output": "[[4],[2],[1,5,6],[3],[7]]", "is_sample": True},
            {"input": "[1]", "expected_output": "[[1]]", "is_sample": False},
        ],
    },
    # ─── 34. Lowest Common Ancestor of a Binary Tree ────────────────────
    {
        "title": "Lowest Common Ancestor of a Binary Tree",
        "difficulty": "easy",
        "tags": ["tree", "binary-tree", "recursion"],
        "companies": ["meta", "amazon", "google", "microsoft"],
        "description": "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes `p` and `q`. The LCA is the lowest node that has both `p` and `q` as descendants (a node can be a descendant of itself).\n\nExample 1:\nInput: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1\nOutput: 3\n\nExample 2:\nInput: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4\nOutput: 5",
        "constraints": "The number of nodes in the tree is in the range [2, 10^5].\n-10^9 <= Node.val <= 10^9\nAll Node.val are unique.\np != q\np and q will exist in the tree.",
        "hints": "Use recursive DFS. If the current node is p or q, return it. Otherwise, recurse on both subtrees. If both return non-null, the current node is the LCA.",
        "starter_code": {
            "python": "# class TreeNode:\n#     def __init__(self, x):\n#         self.val = x; self.left = None; self.right = None\nclass Solution:\n    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:\n        pass",
            "javascript": "var lowestCommonAncestor = function(root, p, q) {\n    \n};",
            "java": "class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,5,1,6,2,0,8,null,null,7,4]\n5\n1", "expected_output": "3", "is_sample": True},
            {"input": "[3,5,1,6,2,0,8,null,null,7,4]\n5\n4", "expected_output": "5", "is_sample": True},
            {"input": "[1,2]\n1\n2", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 35. All Nodes Distance K in Binary Tree ────────────────────────
    {
        "title": "All Nodes Distance K in Binary Tree",
        "difficulty": "hard",
        "tags": ["tree", "binary-tree", "graph"],
        "companies": ["amazon", "meta", "google"],
        "description": "Given the `root` of a binary tree, the value of a target node `target`, and an integer `k`, return an array of the values of all nodes that have a distance `k` from the target node. You can return the answer in any order.\n\nExample 1:\nInput: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2\nOutput: [7,4,1]\nExplanation: Nodes at distance 2 from target node 5 are 7, 4, and 1.\n\nExample 2:\nInput: root = [1], target = 1, k = 3\nOutput: []",
        "constraints": "The number of nodes in the tree is in the range [1, 500].\n0 <= Node.val <= 500\nAll Node.val are unique.\ntarget is the value of one of the nodes in the tree.\n0 <= k <= 1000",
        "hints": "Build a parent map using DFS, then BFS from the target node to find all nodes at distance k.",
        "starter_code": {
            "python": "# class TreeNode:\n#     def __init__(self, x):\n#         self.val = x; self.left = None; self.right = None\nclass Solution:\n    def distanceK(self, root: TreeNode, target: TreeNode, k: int) -> list[int]:\n        pass",
            "javascript": "var distanceK = function(root, target, k) {\n    \n};",
            "java": "class Solution {\n    public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,5,1,6,2,0,8,null,null,7,4]\n5\n2", "expected_output": "[7,4,1]", "is_sample": True},
            {"input": "[1]\n1\n3", "expected_output": "[]", "is_sample": True},
            {"input": "[0,1,null,3,2]\n2\n1", "expected_output": "[1]", "is_sample": False},
        ],
    },
    # ─── 36. Word Ladder ────────────────────────────────────────────────
    {
        "title": "Word Ladder",
        "difficulty": "hard",
        "tags": ["graph", "string"],
        "companies": ["amazon", "meta", "google", "microsoft"],
        "description": "Given two words `beginWord` and `endWord`, and a dictionary `wordList`, return the number of words in the shortest transformation sequence from `beginWord` to `endWord` (or `0` if no such sequence exists). Each adjacent pair of words differs by a single letter, and every intermediate word must be in `wordList`.\n\nExample 1:\nInput: beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]\nOutput: 5\nExplanation: hit -> hot -> dot -> dog -> cog\n\nExample 2:\nInput: beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]\nOutput: 0",
        "constraints": "1 <= beginWord.length <= 10\nendWord.length == beginWord.length\n1 <= wordList.length <= 5000\nwordList[i].length == beginWord.length\nbeginWord, endWord, and wordList[i] consist of lowercase English letters.\nbeginWord != endWord\nAll words in wordList are unique.",
        "hints": "Use BFS. For each word, try changing each character to a-z. Use wildcard patterns like *ot to group words that differ by one letter.",
        "starter_code": {
            "python": "class Solution:\n    def ladderLength(self, beginWord: str, endWord: str, wordList: list[str]) -> int:\n        pass",
            "javascript": "var ladderLength = function(beginWord, endWord, wordList) {\n    \n};",
            "java": "class Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"hit\"\n\"cog\"\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]", "expected_output": "5", "is_sample": True},
            {"input": "\"hit\"\n\"cog\"\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]", "expected_output": "0", "is_sample": True},
            {"input": "\"a\"\n\"c\"\n[\"a\",\"b\",\"c\"]", "expected_output": "2", "is_sample": False},
        ],
    },
    # ─── 37. Swim in Rising Water ───────────────────────────────────────
    {
        "title": "Swim in Rising Water",
        "difficulty": "hard",
        "tags": ["graph", "binary-search", "matrix"],
        "companies": ["google", "amazon", "meta"],
        "description": "You are given an `n x n` grid where `grid[i][j]` represents the elevation at point `(i, j)`. At time `t`, the water depth everywhere is `t`. You can swim from a cell to an adjacent cell if both cells have elevation at most `t`. Starting from `(0, 0)`, return the least time until you can reach `(n-1, n-1)`.\n\nExample 1:\nInput: grid = [[0,2],[1,3]]\nOutput: 3\n\nExample 2:\nInput: grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]\nOutput: 16",
        "constraints": "n == grid.length\nn == grid[i].length\n1 <= n <= 50\n0 <= grid[i][j] < n^2\nEach value in grid is unique.",
        "hints": "Use Dijkstra's or binary search + BFS. The cost of a path is the maximum elevation along it. Find the path that minimizes this maximum.",
        "starter_code": {
            "python": "class Solution:\n    def swimInWater(self, grid: list[list[int]]) -> int:\n        pass",
            "javascript": "var swimInWater = function(grid) {\n    \n};",
            "java": "class Solution {\n    public int swimInWater(int[][] grid) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int swimInWater(vector<vector<int>>& grid) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[0,2],[1,3]]", "expected_output": "3", "is_sample": True},
            {"input": "[[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]", "expected_output": "16", "is_sample": True},
            {"input": "[[0]]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 38. Critical Connections in a Network ──────────────────────────
    {
        "title": "Critical Connections in a Network",
        "difficulty": "hard",
        "tags": ["graph"],
        "companies": ["amazon", "google", "microsoft", "meta"],
        "description": "There are `n` servers numbered from `0` to `n - 1` connected by undirected server-to-server `connections` forming a network. A critical connection is a connection that, if removed, will make some servers unable to reach some other server. Return all critical connections in any order.\n\nExample 1:\nInput: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]\nOutput: [[1,3]]\nExplanation: [1,3] is a bridge. Removing it disconnects node 3.\n\nExample 2:\nInput: n = 2, connections = [[0,1]]\nOutput: [[0,1]]",
        "constraints": "2 <= n <= 10^5\nn - 1 <= connections.length <= 10^5\n0 <= ai, bi <= n - 1\nai != bi\nThere are no repeated connections.",
        "hints": "Use Tarjan's bridge-finding algorithm. Track discovery times and low-link values. An edge (u,v) is a bridge if low[v] > disc[u].",
        "starter_code": {
            "python": "class Solution:\n    def criticalConnections(self, n: int, connections: list[list[int]]) -> list[list[int]]:\n        pass",
            "javascript": "var criticalConnections = function(n, connections) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "4\n[[0,1],[1,2],[2,0],[1,3]]", "expected_output": "[[1,3]]", "is_sample": True},
            {"input": "2\n[[0,1]]", "expected_output": "[[0,1]]", "is_sample": True},
            {"input": "5\n[[0,1],[1,2],[2,3],[3,0],[3,4]]", "expected_output": "[[3,4]]", "is_sample": False},
        ],
    },
]

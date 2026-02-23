"""Batch 15: Missing Grind 75 problems (3 problems with company labels)."""

PROBLEMS_BATCH15 = [
    # ─── 1. Ransom Note ────────────────────────────────────────────────────
    {
        "title": "Ransom Note",
        "difficulty": "easy",
        "tags": ["hash-table", "string"],
        "companies": ["google", "amazon", "microsoft", "apple"],
        "description": (
            "<p>Given two strings <code>ransomNote</code> and <code>magazine</code>, "
            "return <code>true</code> if <code>ransomNote</code> can be constructed by "
            "using the letters from <code>magazine</code> and <code>false</code> otherwise.</p>"
            "<p>Each letter in <code>magazine</code> can only be used once in "
            "<code>ransomNote</code>.</p>"

            "<p><strong>Example 1:</strong></p>"
            "<pre><code>"
            "Input: ransomNote = \"a\", magazine = \"b\"\n"
            "Output: false"
            "</code></pre>"

            "<p><strong>Example 2:</strong></p>"
            "<pre><code>"
            "Input: ransomNote = \"aa\", magazine = \"ab\"\n"
            "Output: false"
            "</code></pre>"

            "<p><strong>Example 3:</strong></p>"
            "<pre><code>"
            "Input: ransomNote = \"aa\", magazine = \"aab\"\n"
            "Output: true"
            "</code></pre>"

            "<p><strong>Approach:</strong></p>"
            "<p>Count the frequency of each character in <code>magazine</code> using a "
            "hash map (or a fixed-size array of 26 for lowercase English letters). Then "
            "iterate through each character in <code>ransomNote</code> and decrement its "
            "count in the map. If at any point the count drops below zero, the letter is "
            "not available and we return <code>false</code>. If we finish the entire "
            "<code>ransomNote</code> without issues, return <code>true</code>.</p>"
            "<ul>"
            "<li>Build a frequency map from <code>magazine</code>.</li>"
            "<li>For each character in <code>ransomNote</code>, check and decrement.</li>"
            "<li>Return <code>false</code> immediately if a count goes negative.</li>"
            "</ul>"

            "<p><strong>Time Complexity:</strong> <code>O(m + n)</code> where "
            "<code>m</code> is the length of <code>ransomNote</code> and <code>n</code> "
            "is the length of <code>magazine</code>.</p>"
            "<p><strong>Space Complexity:</strong> <code>O(1)</code> since the character "
            "set is bounded (26 lowercase English letters).</p>"
        ),
        "constraints": "1 <= ransomNote.length, magazine.length <= 10^5\nransomNote and magazine consist of lowercase English letters.",
        "hints": "Count the frequency of each letter in magazine using a hash map or array of size 26.\nIterate through ransomNote and for each character, check if it is still available in your frequency map. If not, return false.",
        "starter_code": {
            "python": "class Solution:\n    def canConstruct(self, ransomNote: str, magazine: str) -> bool:\n        pass",
            "javascript": "var canConstruct = function(ransomNote, magazine) {\n    \n};",
            "java": "class Solution {\n    public boolean canConstruct(String ransomNote, String magazine) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool canConstruct(string ransomNote, string magazine) {\n        \n    }\n};",
        },
        "test_cases": [
            {"input": "ransomNote = \"a\", magazine = \"b\"", "expected_output": "false", "is_sample": True},
            {"input": "ransomNote = \"aa\", magazine = \"ab\"", "expected_output": "false", "is_sample": True},
            {"input": "ransomNote = \"aa\", magazine = \"aab\"", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 2. Add Binary ─────────────────────────────────────────────────────
    {
        "title": "Add Binary",
        "difficulty": "easy",
        "tags": ["math", "string", "bit-manipulation"],
        "companies": ["meta", "amazon", "microsoft", "apple"],
        "description": (
            "<p>Given two binary strings <code>a</code> and <code>b</code>, return "
            "their sum as a binary string.</p>"

            "<p><strong>Example 1:</strong></p>"
            "<pre><code>"
            "Input: a = \"11\", b = \"1\"\n"
            "Output: \"100\""
            "</code></pre>"

            "<p><strong>Example 2:</strong></p>"
            "<pre><code>"
            "Input: a = \"1010\", b = \"1011\"\n"
            "Output: \"10101\""
            "</code></pre>"

            "<p><strong>Example 3:</strong></p>"
            "<pre><code>"
            "Input: a = \"0\", b = \"0\"\n"
            "Output: \"0\""
            "</code></pre>"

            "<p><strong>Approach:</strong></p>"
            "<p>Simulate binary addition from right to left, just like how you would add "
            "two numbers by hand. Use a carry variable to keep track of overflow from "
            "each bit position.</p>"
            "<ul>"
            "<li>Start two pointers at the end of both strings.</li>"
            "<li>At each step, add the corresponding digits from <code>a</code> and "
            "<code>b</code> (treating missing digits as 0) along with the carry.</li>"
            "<li>The current bit is <code>sum % 2</code> and the new carry is "
            "<code>sum / 2</code> (integer division).</li>"
            "<li>Prepend the current bit to the result.</li>"
            "<li>After processing all bits, if carry is still 1, prepend it.</li>"
            "</ul>"

            "<p><strong>Time Complexity:</strong> <code>O(max(m, n))</code> where "
            "<code>m</code> and <code>n</code> are the lengths of <code>a</code> "
            "and <code>b</code>.</p>"
            "<p><strong>Space Complexity:</strong> <code>O(max(m, n))</code> for the "
            "result string.</p>"
        ),
        "constraints": "1 <= a.length, b.length <= 10^4\na and b consist only of '0' or '1' characters.\nEach string does not contain leading zeros except for the zero itself.",
        "hints": "Traverse both strings from the end to the beginning, simulating the addition bit by bit with a carry variable.\nUse modulo 2 to get the current bit and integer division by 2 to update the carry.",
        "starter_code": {
            "python": "class Solution:\n    def addBinary(self, a: str, b: str) -> str:\n        pass",
            "javascript": "var addBinary = function(a, b) {\n    \n};",
            "java": "class Solution {\n    public String addBinary(String a, String b) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string addBinary(string a, string b) {\n        \n    }\n};",
        },
        "test_cases": [
            {"input": "a = \"11\", b = \"1\"", "expected_output": "100", "is_sample": True},
            {"input": "a = \"1010\", b = \"1011\"", "expected_output": "10101", "is_sample": True},
            {"input": "a = \"0\", b = \"0\"", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 3. Minimum Height Trees ───────────────────────────────────────────
    {
        "title": "Minimum Height Trees",
        "difficulty": "medium",
        "tags": ["graph", "tree"],
        "companies": ["google", "amazon", "meta", "microsoft"],
        "description": (
            "<p>A tree is an undirected graph in which any two vertices are connected by "
            "exactly one path. In other words, any connected graph without simple cycles "
            "is a tree.</p>"
            "<p>Given a tree of <code>n</code> nodes labelled from <code>0</code> to "
            "<code>n - 1</code>, and an array of <code>n - 1</code> <code>edges</code> "
            "where <code>edges[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that "
            "there is an undirected edge between the two nodes <code>a<sub>i</sub></code> "
            "and <code>b<sub>i</sub></code> in the tree, you can choose any node of the "
            "tree as the root. When you select a node <code>x</code> as the root, the "
            "resulting tree has height <code>h</code>. Among all possible rooted trees, "
            "those with minimum height (i.e., <code>min(h)</code>) are called "
            "<strong>minimum height trees</strong> (MHTs).</p>"
            "<p>Return <em>a list of all MHT root labels</em>. You can return the answer "
            "in any order.</p>"

            "<p><strong>Example 1:</strong></p>"
            "<pre><code>"
            "Input: n = 4, edges = [[1,0],[1,2],[1,3]]\n"
            "Output: [1]\n"
            "Explanation: When the root is node 1, the tree height is 1 which is the minimum."
            "</code></pre>"

            "<p><strong>Example 2:</strong></p>"
            "<pre><code>"
            "Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]\n"
            "Output: [3, 4]\n"
            "Explanation: When the root is node 3 or 4, the tree height is 2 which is the minimum."
            "</code></pre>"

            "<p><strong>Example 3:</strong></p>"
            "<pre><code>"
            "Input: n = 1, edges = []\n"
            "Output: [0]"
            "</code></pre>"

            "<p><strong>Approach:</strong></p>"
            "<p>The key insight is that the roots of minimum height trees are always the "
            "centroids of the tree &mdash; the nodes that are at the center. There can be "
            "at most 2 such nodes. We can find them by repeatedly trimming leaf nodes "
            "(nodes with degree 1) from the outside inward, similar to a topological sort "
            "approach:</p>"
            "<ul>"
            "<li>Build an adjacency list and compute the degree of each node.</li>"
            "<li>Initialize a queue with all leaf nodes (degree == 1).</li>"
            "<li>Repeatedly remove the current set of leaves and update the degrees of "
            "their neighbors. Any neighbor that becomes a leaf is added to the next round.</li>"
            "<li>Continue until the remaining nodes number 1 or 2. These remaining nodes "
            "are the roots of the MHTs.</li>"
            "</ul>"

            "<p><strong>Time Complexity:</strong> <code>O(n)</code> since each node and "
            "edge is processed at most once.</p>"
            "<p><strong>Space Complexity:</strong> <code>O(n)</code> for the adjacency "
            "list and the queue.</p>"
        ),
        "constraints": "1 <= n <= 2 * 10^4\nedges.length == n - 1\n0 <= a_i, b_i < n\na_i != b_i\nAll the pairs (a_i, b_i) are distinct.\nThe given input is guaranteed to be a tree and there will be no repeated edges.",
        "hints": "Think of the problem as finding the center (centroid) of the tree. The centroid minimizes the maximum distance to all other nodes.\nUse a topological-sort-like approach: repeatedly remove leaf nodes (degree 1) layer by layer until only 1 or 2 nodes remain.",
        "starter_code": {
            "python": "class Solution:\n    def findMinHeightTrees(self, n: int, edges: list[list[int]]) -> list[int]:\n        pass",
            "javascript": "var findMinHeightTrees = function(n, edges) {\n    \n};",
            "java": "class Solution {\n    public List<Integer> findMinHeightTrees(int n, int[][] edges) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {\n        \n    }\n};",
        },
        "test_cases": [
            {"input": "n = 4, edges = [[1,0],[1,2],[1,3]]", "expected_output": "[1]", "is_sample": True},
            {"input": "n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]", "expected_output": "[3, 4]", "is_sample": True},
            {"input": "n = 1, edges = []", "expected_output": "[0]", "is_sample": False},
        ],
    },
]

"""Batch 8: Stack, Queue, Linked List problems (~40 with company labels)."""

PROBLEMS_BATCH8 = [
    # ─── 1. Daily Temperatures ─────────────────────────────────────────
    {
        "title": "Daily Temperatures",
        "difficulty": "medium",
        "tags": ["stack", "monotonic-stack"],
        "companies": ["google", "meta", "amazon", "uber"],
        "description": "Given an array of integers `temperatures` representing daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`-th day to get a warmer temperature. If there is no future day with a warmer temperature, set `answer[i]` to `0`.\n\nExample 1:\nInput: temperatures = [73,74,75,71,69,72,76,73]\nOutput: [1,1,4,2,1,1,0,0]\n\nExample 2:\nInput: temperatures = [30,40,50,60]\nOutput: [1,1,1,0]",
        "constraints": "1 <= temperatures.length <= 10^5\n30 <= temperatures[i] <= 100",
        "hints": "Use a monotonic decreasing stack storing indices. Pop when you find a warmer temperature.",
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
    # ─── 2. Next Greater Element I ─────────────────────────────────────
    {
        "title": "Next Greater Element I",
        "difficulty": "easy",
        "tags": ["stack"],
        "companies": ["amazon", "meta", "uber"],
        "description": "You are given two distinct 0-indexed integer arrays `nums1` and `nums2`, where `nums1` is a subset of `nums2`. For each `nums1[i]`, find the next greater element in `nums2`. The next greater element of `nums1[i]` is the first element to the right of `nums1[i]` in `nums2` that is greater. Return -1 if it does not exist.\n\nExample 1:\nInput: nums1 = [4,1,2], nums2 = [1,3,4,2]\nOutput: [-1,3,-1]\n\nExample 2:\nInput: nums1 = [2,4], nums2 = [1,2,3,4]\nOutput: [3,-1]",
        "constraints": "1 <= nums1.length <= nums2.length <= 1000\n0 <= nums1[i], nums2[i] <= 10^4\nAll integers in nums1 and nums2 are unique.",
        "hints": "Use a stack to find the next greater element for every number in nums2, store results in a hash map, then look up each element of nums1.",
        "starter_code": {
            "python": "class Solution:\n    def nextGreaterElement(self, nums1: list[int], nums2: list[int]) -> list[int]:\n        pass",
            "javascript": "var nextGreaterElement = function(nums1, nums2) {\n    \n};",
            "java": "class Solution {\n    public int[] nextGreaterElement(int[] nums1, int[] nums2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[4,1,2]\n[1,3,4,2]", "expected_output": "[-1,3,-1]", "is_sample": True},
            {"input": "[2,4]\n[1,2,3,4]", "expected_output": "[3,-1]", "is_sample": True},
            {"input": "[1,3,5]\n[6,5,4,3,2,1,7]", "expected_output": "[7,7,7]", "is_sample": False},
        ],
    },
    # ─── 3. Next Greater Element II ────────────────────────────────────
    {
        "title": "Next Greater Element II",
        "difficulty": "medium",
        "tags": ["stack", "monotonic-stack"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "Given a circular integer array `nums`, return the next greater number for every element in `nums`. The next greater number of `nums[i]` is the first greater number traversing circularly. If it doesn't exist, return -1.\n\nExample 1:\nInput: nums = [1,2,1]\nOutput: [2,-1,2]\n\nExample 2:\nInput: nums = [1,2,3,4,3]\nOutput: [2,3,4,-1,4]",
        "constraints": "1 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9",
        "hints": "Iterate through the array twice (simulate circular) using a monotonic stack of indices.",
        "starter_code": {
            "python": "class Solution:\n    def nextGreaterElements(self, nums: list[int]) -> list[int]:\n        pass",
            "javascript": "var nextGreaterElements = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int[] nextGreaterElements(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> nextGreaterElements(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,1]", "expected_output": "[2,-1,2]", "is_sample": True},
            {"input": "[1,2,3,4,3]", "expected_output": "[2,3,4,-1,4]", "is_sample": True},
            {"input": "[5,4,3,2,1]", "expected_output": "[-1,5,5,5,5]", "is_sample": False},
        ],
    },
    # ─── 4. Asteroid Collision ─────────────────────────────────────────
    {
        "title": "Asteroid Collision",
        "difficulty": "medium",
        "tags": ["stack"],
        "companies": ["amazon", "uber", "lyft", "doordash"],
        "description": "We are given an array `asteroids` of integers representing asteroids in a row. The absolute value represents size; the sign represents direction (positive = right, negative = left). Asteroids moving the same direction never collide. When two asteroids collide, the smaller one explodes; if equal, both explode. Return the state of the asteroids after all collisions.\n\nExample 1:\nInput: asteroids = [5,10,-5]\nOutput: [5,10]\n\nExample 2:\nInput: asteroids = [10,2,-5]\nOutput: [10]",
        "constraints": "2 <= asteroids.length <= 10^4\n-1000 <= asteroids[i] <= 1000\nasteroids[i] != 0",
        "hints": "Use a stack. Push positive asteroids. For negative ones, pop smaller positive asteroids until collision is resolved.",
        "starter_code": {
            "python": "class Solution:\n    def asteroidCollision(self, asteroids: list[int]) -> list[int]:\n        pass",
            "javascript": "var asteroidCollision = function(asteroids) {\n    \n};",
            "java": "class Solution {\n    public int[] asteroidCollision(int[] asteroids) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> asteroidCollision(vector<int>& asteroids) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[5,10,-5]", "expected_output": "[5,10]", "is_sample": True},
            {"input": "[10,2,-5]", "expected_output": "[10]", "is_sample": True},
            {"input": "[-2,-1,1,2]", "expected_output": "[-2,-1,1,2]", "is_sample": False},
        ],
    },
    # ─── 5. Online Stock Span ──────────────────────────────────────────
    {
        "title": "Online Stock Span",
        "difficulty": "medium",
        "tags": ["stack", "monotonic-stack"],
        "companies": ["amazon", "microsoft", "bloomberg", "uber"],
        "description": "Design an algorithm that collects daily price quotes for a stock and returns the span of that stock's price for the current day. The span is the maximum number of consecutive days (starting from today going backward) for which the stock price was less than or equal to today's price.\n\nExample 1:\nInput: [\"StockSpanner\",\"next\",\"next\",\"next\",\"next\",\"next\",\"next\",\"next\"] [[],[100],[80],[60],[70],[60],[75],[85]]\nOutput: [null,1,1,1,2,1,4,6]",
        "constraints": "1 <= price <= 10^5\nAt most 10^4 calls will be made to next.",
        "hints": "Use a monotonic decreasing stack of (price, span) pairs. When a new price comes, pop all smaller prices and accumulate their spans.",
        "starter_code": {
            "python": "class StockSpanner:\n    def __init__(self):\n        pass\n\n    def next(self, price: int) -> int:\n        pass",
            "javascript": "var StockSpanner = function() {\n    \n};\n\nStockSpanner.prototype.next = function(price) {\n    \n};",
            "java": "class StockSpanner {\n    public StockSpanner() {\n        \n    }\n\n    public int next(int price) {\n        \n    }\n}",
            "cpp": "class StockSpanner {\npublic:\n    StockSpanner() {\n        \n    }\n\n    int next(int price) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[100,80,60,70,60,75,85]", "expected_output": "[1,1,1,2,1,4,6]", "is_sample": True},
            {"input": "[31,41,48,59,79]", "expected_output": "[1,2,3,4,5]", "is_sample": True},
            {"input": "[10,10,10,10]", "expected_output": "[1,2,3,4]", "is_sample": False},
        ],
    },
    # ─── 6. Largest Rectangle in Histogram ─────────────────────────────
    {
        "title": "Largest Rectangle in Histogram",
        "difficulty": "hard",
        "tags": ["stack", "monotonic-stack"],
        "companies": ["google", "amazon", "microsoft", "meta"],
        "description": "Given an array of integers `heights` representing the histogram's bar heights where the width of each bar is 1, return the area of the largest rectangle in the histogram.\n\nExample 1:\nInput: heights = [2,1,5,6,2,3]\nOutput: 10\nExplanation: The largest rectangle has area = 5 * 2 = 10.\n\nExample 2:\nInput: heights = [2,4]\nOutput: 4",
        "constraints": "1 <= heights.length <= 10^5\n0 <= heights[i] <= 10^4",
        "hints": "Use a monotonic increasing stack of indices. When a shorter bar is found, pop and calculate rectangle areas using the popped bar's height.",
        "starter_code": {
            "python": "class Solution:\n    def largestRectangleArea(self, heights: list[int]) -> int:\n        pass",
            "javascript": "var largestRectangleArea = function(heights) {\n    \n};",
            "java": "class Solution {\n    public int largestRectangleArea(int[] heights) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int largestRectangleArea(vector<int>& heights) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,1,5,6,2,3]", "expected_output": "10", "is_sample": True},
            {"input": "[2,4]", "expected_output": "4", "is_sample": True},
            {"input": "[1]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 7. Evaluate Reverse Polish Notation ───────────────────────────
    {
        "title": "Evaluate Reverse Polish Notation",
        "difficulty": "medium",
        "tags": ["stack", "math"],
        "companies": ["amazon", "linkedin", "microsoft"],
        "description": "You are given an array of strings `tokens` that represents an arithmetic expression in Reverse Polish Notation. Evaluate the expression and return the result. Valid operators are +, -, *, and /. Division truncates toward zero.\n\nExample 1:\nInput: tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]\nOutput: 9\nExplanation: ((2 + 1) * 3) = 9\n\nExample 2:\nInput: tokens = [\"4\",\"13\",\"5\",\"/\",\"+\"]\nOutput: 6\nExplanation: (4 + (13 / 5)) = 6",
        "constraints": "1 <= tokens.length <= 10^4\ntokens[i] is either an operator or an integer in the range [-200, 200].",
        "hints": "Push numbers onto the stack. When you encounter an operator, pop two operands, apply the operator, and push the result.",
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
    # ─── 8. Min Stack ──────────────────────────────────────────────────
    {
        "title": "Min Stack",
        "difficulty": "medium",
        "tags": ["stack", "design"],
        "companies": ["amazon", "microsoft", "apple", "uber"],
        "description": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Implement the `MinStack` class with `push(val)`, `pop()`, `top()`, and `getMin()` methods.\n\nExample 1:\nInput: [\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"] [[],[-2],[0],[-3],[],[],[],[]]\nOutput: [null,null,null,null,-3,null,0,-2]",
        "constraints": "-2^31 <= val <= 2^31 - 1\nMethods pop, top, and getMin will always be called on non-empty stacks.\nAt most 3 * 10^4 calls will be made.",
        "hints": "Maintain a second stack that tracks the current minimum at each level.",
        "starter_code": {
            "python": "class MinStack:\n    def __init__(self):\n        pass\n\n    def push(self, val: int) -> None:\n        pass\n\n    def pop(self) -> None:\n        pass\n\n    def top(self) -> int:\n        pass\n\n    def getMin(self) -> int:\n        pass",
            "javascript": "var MinStack = function() {\n    \n};\n\nMinStack.prototype.push = function(val) {\n    \n};\n\nMinStack.prototype.pop = function() {\n    \n};\n\nMinStack.prototype.top = function() {\n    \n};\n\nMinStack.prototype.getMin = function() {\n    \n};",
            "java": "class MinStack {\n    public MinStack() {\n        \n    }\n\n    public void push(int val) {\n        \n    }\n\n    public void pop() {\n        \n    }\n\n    public int top() {\n        \n    }\n\n    public int getMin() {\n        \n    }\n}",
            "cpp": "class MinStack {\npublic:\n    MinStack() {\n        \n    }\n\n    void push(int val) {\n        \n    }\n\n    void pop() {\n        \n    }\n\n    int top() {\n        \n    }\n\n    int getMin() {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]\n[[-2],[0],[-3],[],[],[],[]]", "expected_output": "[null,null,null,-3,null,0,-2]", "is_sample": True},
            {"input": "[\"push\",\"push\",\"getMin\",\"pop\",\"getMin\"]\n[[1],[-1],[],[],[]]", "expected_output": "[null,null,-1,null,1]", "is_sample": True},
            {"input": "[\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"getMin\"]\n[[0],[1],[0],[],[],[]]", "expected_output": "[null,null,null,0,null,0]", "is_sample": False},
        ],
    },
    # ─── 9. Implement Queue using Stacks ───────────────────────────────
    {
        "title": "Implement Queue using Stacks",
        "difficulty": "easy",
        "tags": ["stack", "queue", "design"],
        "companies": ["amazon", "microsoft", "apple"],
        "description": "Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support `push`, `pop`, `peek`, and `empty` operations.\n\nExample 1:\nInput: [\"MyQueue\",\"push\",\"push\",\"peek\",\"pop\",\"empty\"] [[],[1],[2],[],[],[]]\nOutput: [null,null,null,1,1,false]",
        "constraints": "1 <= x <= 9\nAt most 100 calls will be made to push, pop, peek, and empty.\nAll calls to pop and peek are valid.",
        "hints": "Use two stacks: one for input and one for output. Transfer elements from input to output stack when output is empty.",
        "starter_code": {
            "python": "class MyQueue:\n    def __init__(self):\n        pass\n\n    def push(self, x: int) -> None:\n        pass\n\n    def pop(self) -> int:\n        pass\n\n    def peek(self) -> int:\n        pass\n\n    def empty(self) -> bool:\n        pass",
            "javascript": "var MyQueue = function() {\n    \n};\n\nMyQueue.prototype.push = function(x) {\n    \n};\n\nMyQueue.prototype.pop = function() {\n    \n};\n\nMyQueue.prototype.peek = function() {\n    \n};\n\nMyQueue.prototype.empty = function() {\n    \n};",
            "java": "class MyQueue {\n    public MyQueue() {\n        \n    }\n\n    public void push(int x) {\n        \n    }\n\n    public int pop() {\n        \n    }\n\n    public int peek() {\n        \n    }\n\n    public boolean empty() {\n        \n    }\n}",
            "cpp": "class MyQueue {\npublic:\n    MyQueue() {\n        \n    }\n\n    void push(int x) {\n        \n    }\n\n    int pop() {\n        \n    }\n\n    int peek() {\n        \n    }\n\n    bool empty() {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"push\",\"push\",\"peek\",\"pop\",\"empty\"]\n[[1],[2],[],[],[]]", "expected_output": "[null,null,1,1,false]", "is_sample": True},
            {"input": "[\"push\",\"push\",\"push\",\"pop\",\"pop\",\"pop\",\"empty\"]\n[[1],[2],[3],[],[],[],[]]", "expected_output": "[null,null,null,1,2,3,true]", "is_sample": True},
            {"input": "[\"push\",\"peek\",\"push\",\"pop\",\"pop\",\"empty\"]\n[[5],[],[7],[],[],[]]", "expected_output": "[null,5,null,5,7,true]", "is_sample": False},
        ],
    },
    # ─── 10. Implement Stack using Queues ──────────────────────────────
    {
        "title": "Implement Stack using Queues",
        "difficulty": "easy",
        "tags": ["stack", "queue", "design"],
        "companies": ["amazon", "microsoft", "uber"],
        "description": "Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support `push`, `top`, `pop`, and `empty` operations.\n\nExample 1:\nInput: [\"MyStack\",\"push\",\"push\",\"top\",\"pop\",\"empty\"] [[],[1],[2],[],[],[]]\nOutput: [null,null,null,2,2,false]",
        "constraints": "1 <= x <= 9\nAt most 100 calls will be made to push, pop, top, and empty.\nAll calls to pop and top are valid.",
        "hints": "After pushing a new element to the queue, rotate all previous elements behind it so the newest element is at the front.",
        "starter_code": {
            "python": "class MyStack:\n    def __init__(self):\n        pass\n\n    def push(self, x: int) -> None:\n        pass\n\n    def pop(self) -> int:\n        pass\n\n    def top(self) -> int:\n        pass\n\n    def empty(self) -> bool:\n        pass",
            "javascript": "var MyStack = function() {\n    \n};\n\nMyStack.prototype.push = function(x) {\n    \n};\n\nMyStack.prototype.pop = function() {\n    \n};\n\nMyStack.prototype.top = function() {\n    \n};\n\nMyStack.prototype.empty = function() {\n    \n};",
            "java": "class MyStack {\n    public MyStack() {\n        \n    }\n\n    public void push(int x) {\n        \n    }\n\n    public int pop() {\n        \n    }\n\n    public int top() {\n        \n    }\n\n    public boolean empty() {\n        \n    }\n}",
            "cpp": "class MyStack {\npublic:\n    MyStack() {\n        \n    }\n\n    void push(int x) {\n        \n    }\n\n    int pop() {\n        \n    }\n\n    int top() {\n        \n    }\n\n    bool empty() {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"push\",\"push\",\"top\",\"pop\",\"empty\"]\n[[1],[2],[],[],[]]", "expected_output": "[null,null,2,2,false]", "is_sample": True},
            {"input": "[\"push\",\"push\",\"push\",\"pop\",\"top\"]\n[[1],[2],[3],[],[]]", "expected_output": "[null,null,null,3,2]", "is_sample": True},
            {"input": "[\"push\",\"pop\",\"empty\"]\n[[1],[],[]]", "expected_output": "[null,1,true]", "is_sample": False},
        ],
    },
    # ─── 11. Simplify Path ─────────────────────────────────────────────
    {
        "title": "Simplify Path",
        "difficulty": "medium",
        "tags": ["stack", "string"],
        "companies": ["meta", "amazon", "microsoft"],
        "description": "Given an absolute Unix-style file path starting with a slash '/', convert it to the simplified canonical path. In a canonical path, directories are separated by a single '/', it does not end with '/', '..' means parent directory, and '.' means current directory.\n\nExample 1:\nInput: path = \"/home/\"\nOutput: \"/home\"\n\nExample 2:\nInput: path = \"/../\"\nOutput: \"/\"",
        "constraints": "1 <= path.length <= 3000\npath consists of English letters, digits, period '.', slash '/', or underscore '_'.",
        "hints": "Split the path by '/', use a stack to track directories. Pop for '..' and skip for '.'.",
        "starter_code": {
            "python": "class Solution:\n    def simplifyPath(self, path: str) -> str:\n        pass",
            "javascript": "var simplifyPath = function(path) {\n    \n};",
            "java": "class Solution {\n    public String simplifyPath(String path) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string simplifyPath(string path) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"/home/\"", "expected_output": "\"/home\"", "is_sample": True},
            {"input": "\"/../\"", "expected_output": "\"/\"", "is_sample": True},
            {"input": "\"/a/./b/../../c/\"", "expected_output": "\"/c\"", "is_sample": False},
        ],
    },
    # ─── 12. Decode String ─────────────────────────────────────────────
    {
        "title": "Decode String",
        "difficulty": "medium",
        "tags": ["stack", "string", "recursion"],
        "companies": ["google", "amazon", "uber", "bytedance"],
        "description": "Given an encoded string, return its decoded string. The encoding rule is: `k[encoded_string]`, where the `encoded_string` inside the brackets is repeated exactly `k` times.\n\nExample 1:\nInput: s = \"3[a]2[bc]\"\nOutput: \"aaabcbc\"\n\nExample 2:\nInput: s = \"3[a2[c]]\"\nOutput: \"accaccacc\"",
        "constraints": "1 <= s.length <= 30\ns consists of lowercase English letters, digits, and square brackets '[]'.\nAll integers in s are in the range [1, 300].",
        "hints": "Use a stack to store the current string and repeat count when encountering '['. Pop and build the result when encountering ']'.",
        "starter_code": {
            "python": "class Solution:\n    def decodeString(self, s: str) -> str:\n        pass",
            "javascript": "var decodeString = function(s) {\n    \n};",
            "java": "class Solution {\n    public String decodeString(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string decodeString(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"3[a]2[bc]\"", "expected_output": "\"aaabcbc\"", "is_sample": True},
            {"input": "\"3[a2[c]]\"", "expected_output": "\"accaccacc\"", "is_sample": True},
            {"input": "\"2[abc]3[cd]ef\"", "expected_output": "\"abcabccdcdcdef\"", "is_sample": False},
        ],
    },
    # ─── 13. Remove All Adjacent Duplicates in String ──────────────────
    {
        "title": "Remove All Adjacent Duplicates in String",
        "difficulty": "easy",
        "tags": ["stack", "string"],
        "companies": ["amazon", "meta", "adobe"],
        "description": "You are given a string `s` consisting of lowercase English letters. A duplicate removal consists of choosing two adjacent and equal letters and removing them. We repeatedly make duplicate removals until we no longer can. Return the final string.\n\nExample 1:\nInput: s = \"abbaca\"\nOutput: \"ca\"\nExplanation: Remove \"bb\", then \"aa\", result is \"ca\".\n\nExample 2:\nInput: s = \"azxxzy\"\nOutput: \"ay\"",
        "constraints": "1 <= s.length <= 10^5\ns consists of lowercase English letters.",
        "hints": "Use a stack. Push characters and pop when the top matches the current character.",
        "starter_code": {
            "python": "class Solution:\n    def removeDuplicates(self, s: str) -> str:\n        pass",
            "javascript": "var removeDuplicates = function(s) {\n    \n};",
            "java": "class Solution {\n    public String removeDuplicates(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string removeDuplicates(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"abbaca\"", "expected_output": "\"ca\"", "is_sample": True},
            {"input": "\"azxxzy\"", "expected_output": "\"ay\"", "is_sample": True},
            {"input": "\"aababaab\"", "expected_output": "\"ba\"", "is_sample": False},
        ],
    },
    # ─── 14. Remove All Adjacent Duplicates in String II ───────────────
    {
        "title": "Remove All Adjacent Duplicates in String II",
        "difficulty": "medium",
        "tags": ["stack", "string"],
        "companies": ["meta", "amazon", "bytedance"],
        "description": "You are given a string `s` and an integer `k`. A k-duplicate removal consists of choosing `k` adjacent and equal letters from `s` and removing them. Repeatedly make k-duplicate removals until no more can be made. Return the final string.\n\nExample 1:\nInput: s = \"deeedbbcccbdaa\", k = 3\nOutput: \"aa\"\n\nExample 2:\nInput: s = \"pbbcggttciiippooaais\", k = 2\nOutput: \"ps\"",
        "constraints": "1 <= s.length <= 10^5\n2 <= k <= 10^4\ns only contains lowercase English letters.",
        "hints": "Use a stack of (character, count) pairs. Increment count for adjacent matches and remove when count reaches k.",
        "starter_code": {
            "python": "class Solution:\n    def removeDuplicates(self, s: str, k: int) -> str:\n        pass",
            "javascript": "var removeDuplicates = function(s, k) {\n    \n};",
            "java": "class Solution {\n    public String removeDuplicates(String s, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string removeDuplicates(string s, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"deeedbbcccbdaa\"\n3", "expected_output": "\"aa\"", "is_sample": True},
            {"input": "\"pbbcggttciiippooaais\"\n2", "expected_output": "\"ps\"", "is_sample": True},
            {"input": "\"abcd\"\n2", "expected_output": "\"abcd\"", "is_sample": False},
        ],
    },
    # ─── 15. Basic Calculator ──────────────────────────────────────────
    {
        "title": "Basic Calculator",
        "difficulty": "hard",
        "tags": ["stack", "math", "string"],
        "companies": ["google", "amazon", "meta", "microsoft"],
        "description": "Given a string `s` representing a valid expression, implement a basic calculator to evaluate it. The expression may contain '+', '-', '(', ')', digits, and spaces.\n\nExample 1:\nInput: s = \"1 + 1\"\nOutput: 2\n\nExample 2:\nInput: s = \"(1+(4+5+2)-3)+(6+8)\"\nOutput: 23",
        "constraints": "1 <= s.length <= 3 * 10^5\ns consists of digits, '+', '-', '(', ')', and ' '.\ns represents a valid expression.",
        "hints": "Use a stack to handle parentheses. Track the current number, result, and sign. Push result and sign onto the stack when encountering '('.",
        "starter_code": {
            "python": "class Solution:\n    def calculate(self, s: str) -> int:\n        pass",
            "javascript": "var calculate = function(s) {\n    \n};",
            "java": "class Solution {\n    public int calculate(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int calculate(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"1 + 1\"", "expected_output": "2", "is_sample": True},
            {"input": "\"(1+(4+5+2)-3)+(6+8)\"", "expected_output": "23", "is_sample": True},
            {"input": "\"-(3+(4+5))\"", "expected_output": "-12", "is_sample": False},
        ],
    },
    # ─── 16. Basic Calculator II ───────────────────────────────────────
    {
        "title": "Basic Calculator II",
        "difficulty": "medium",
        "tags": ["stack", "math", "string"],
        "companies": ["amazon", "meta", "microsoft", "uber"],
        "description": "Given a string `s` representing an expression, evaluate it and return its value. The expression contains non-negative integers and operators '+', '-', '*', '/' with optional spaces. Integer division truncates toward zero.\n\nExample 1:\nInput: s = \"3+2*2\"\nOutput: 7\n\nExample 2:\nInput: s = \" 3/2 \"\nOutput: 1",
        "constraints": "1 <= s.length <= 3 * 10^5\ns consists of integers and operators ('+', '-', '*', '/') separated by optional spaces.\ns represents a valid expression.",
        "hints": "Process multiplication and division immediately while pushing results of addition and subtraction onto a stack. Sum the stack at the end.",
        "starter_code": {
            "python": "class Solution:\n    def calculate(self, s: str) -> int:\n        pass",
            "javascript": "var calculate = function(s) {\n    \n};",
            "java": "class Solution {\n    public int calculate(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int calculate(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"3+2*2\"", "expected_output": "7", "is_sample": True},
            {"input": "\" 3/2 \"", "expected_output": "1", "is_sample": True},
            {"input": "\" 3+5 / 2 \"", "expected_output": "5", "is_sample": False},
        ],
    },
    # ─── 17. Valid Parenthesis String ──────────────────────────────────
    {
        "title": "Valid Parenthesis String",
        "difficulty": "medium",
        "tags": ["stack", "greedy", "string"],
        "companies": ["amazon", "meta", "uber", "bytedance"],
        "description": "Given a string `s` containing only '(', ')' and '*', return `true` if `s` is valid. '*' can be treated as '(', ')', or an empty string.\n\nExample 1:\nInput: s = \"()\"\nOutput: true\n\nExample 2:\nInput: s = \"(*)\"\nOutput: true",
        "constraints": "1 <= s.length <= 100\ns consists of '(', ')' and '*'.",
        "hints": "Track the range of possible open parenthesis counts (low, high). '*' can increase or decrease the count.",
        "starter_code": {
            "python": "class Solution:\n    def checkValidString(self, s: str) -> bool:\n        pass",
            "javascript": "var checkValidString = function(s) {\n    \n};",
            "java": "class Solution {\n    public boolean checkValidString(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool checkValidString(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"()\"", "expected_output": "true", "is_sample": True},
            {"input": "\"(*)\"", "expected_output": "true", "is_sample": True},
            {"input": "\"(*(\"", "expected_output": "false", "is_sample": False},
        ],
    },
    # ─── 18. Score of Parentheses ──────────────────────────────────────
    {
        "title": "Score of Parentheses",
        "difficulty": "medium",
        "tags": ["stack"],
        "companies": ["amazon", "google", "uber"],
        "description": "Given a balanced parentheses string `s`, return the score of the string. '()' has score 1, 'AB' has score A+B, and '(A)' has score 2*A.\n\nExample 1:\nInput: s = \"()\"\nOutput: 1\n\nExample 2:\nInput: s = \"(()(()))\"\nOutput: 6",
        "constraints": "2 <= s.length <= 50\ns consists of only '(' and ')'.\ns is a balanced parentheses string.",
        "hints": "Use a stack to track scores at each depth level. When encountering ')', pop and compute the score.",
        "starter_code": {
            "python": "class Solution:\n    def scoreOfParentheses(self, s: str) -> int:\n        pass",
            "javascript": "var scoreOfParentheses = function(s) {\n    \n};",
            "java": "class Solution {\n    public int scoreOfParentheses(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int scoreOfParentheses(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"()\"", "expected_output": "1", "is_sample": True},
            {"input": "\"(()(()))\"", "expected_output": "6", "is_sample": True},
            {"input": "\"(()())\"", "expected_output": "4", "is_sample": False},
        ],
    },
    # ─── 19. Flatten Nested List Iterator ──────────────────────────────
    {
        "title": "Flatten Nested List Iterator",
        "difficulty": "medium",
        "tags": ["stack", "design"],
        "companies": ["google", "meta", "linkedin", "uber"],
        "description": "You are given a nested list of integers. Each element is either an integer or a list whose elements may also be integers or other lists. Implement an iterator to flatten it. Implement `NestedIterator` with `next()` and `hasNext()` methods.\n\nExample 1:\nInput: nestedList = [[1,1],2,[1,1]]\nOutput: [1,1,2,1,1]\n\nExample 2:\nInput: nestedList = [1,[4,[6]]]\nOutput: [1,4,6]",
        "constraints": "1 <= nestedList.length <= 500\nThe values of the integers in the nested list are in the range [-10^6, 10^6].",
        "hints": "Use a stack initialized with the reversed nested list. In hasNext(), keep flattening the top element until it is an integer.",
        "starter_code": {
            "python": "class NestedIterator:\n    def __init__(self, nestedList):\n        pass\n\n    def next(self) -> int:\n        pass\n\n    def hasNext(self) -> bool:\n        pass",
            "javascript": "var NestedIterator = function(nestedList) {\n    \n};\n\nNestedIterator.prototype.hasNext = function() {\n    \n};\n\nNestedIterator.prototype.next = function() {\n    \n};",
            "java": "public class NestedIterator implements Iterator<Integer> {\n    public NestedIterator(List<NestedInteger> nestedList) {\n        \n    }\n\n    @Override\n    public Integer next() {\n        \n    }\n\n    @Override\n    public boolean hasNext() {\n        \n    }\n}",
            "cpp": "class NestedIterator {\npublic:\n    NestedIterator(vector<NestedInteger> &nestedList) {\n        \n    }\n\n    int next() {\n        \n    }\n\n    bool hasNext() {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,1],2,[1,1]]", "expected_output": "[1,1,2,1,1]", "is_sample": True},
            {"input": "[1,[4,[6]]]", "expected_output": "[1,4,6]", "is_sample": True},
            {"input": "[[],[3]]", "expected_output": "[3]", "is_sample": False},
        ],
    },
    # ─── 20. Maximum Frequency Stack ───────────────────────────────────
    {
        "title": "Maximum Frequency Stack",
        "difficulty": "hard",
        "tags": ["stack", "design", "hash-table"],
        "companies": ["amazon", "google", "uber", "lyft"],
        "description": "Design a stack-like data structure that pushes elements and pops the most frequent element. Implement `FreqStack` with `push(val)` which pushes val onto the stack, and `pop()` which removes and returns the most frequent element. If there is a tie, the element closest to the top is removed.\n\nExample 1:\nInput: [\"FreqStack\",\"push\",\"push\",\"push\",\"push\",\"push\",\"push\",\"pop\",\"pop\",\"pop\",\"pop\"] [[],[5],[7],[5],[7],[4],[5],[],[],[],[]]\nOutput: [null,null,null,null,null,null,null,5,7,5,4]",
        "constraints": "0 <= val <= 10^9\nAt most 2 * 10^4 calls will be made to push and pop.\nIt is guaranteed there will be at least one element in the stack before calling pop.",
        "hints": "Maintain a frequency map and a map from frequency to stack of values. Track the maximum frequency and pop from the highest frequency stack.",
        "starter_code": {
            "python": "class FreqStack:\n    def __init__(self):\n        pass\n\n    def push(self, val: int) -> None:\n        pass\n\n    def pop(self) -> int:\n        pass",
            "javascript": "var FreqStack = function() {\n    \n};\n\nFreqStack.prototype.push = function(val) {\n    \n};\n\nFreqStack.prototype.pop = function() {\n    \n};",
            "java": "class FreqStack {\n    public FreqStack() {\n        \n    }\n\n    public void push(int val) {\n        \n    }\n\n    public int pop() {\n        \n    }\n}",
            "cpp": "class FreqStack {\npublic:\n    FreqStack() {\n        \n    }\n\n    void push(int val) {\n        \n    }\n\n    int pop() {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"push\",\"push\",\"push\",\"push\",\"push\",\"push\",\"pop\",\"pop\",\"pop\",\"pop\"]\n[[5],[7],[5],[7],[4],[5],[],[],[],[]]", "expected_output": "[null,null,null,null,null,null,5,7,5,4]", "is_sample": True},
            {"input": "[\"push\",\"push\",\"push\",\"pop\",\"pop\"]\n[[1],[1],[2],[],[]]", "expected_output": "[null,null,null,1,2]", "is_sample": True},
            {"input": "[\"push\",\"push\",\"push\",\"push\",\"pop\",\"pop\"]\n[[3],[3],[3],[5],[],[]]", "expected_output": "[null,null,null,null,3,3]", "is_sample": False},
        ],
    },
    # ─── 21. Add Two Numbers ───────────────────────────────────────────
    {
        "title": "Add Two Numbers",
        "difficulty": "medium",
        "tags": ["linked-list", "math"],
        "companies": ["amazon", "google", "meta", "microsoft"],
        "description": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each node contains a single digit. Add the two numbers and return the sum as a linked list.\n\nExample 1:\nInput: l1 = [2,4,3], l2 = [5,6,4]\nOutput: [7,0,8]\nExplanation: 342 + 465 = 807.\n\nExample 2:\nInput: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]\nOutput: [8,9,9,9,0,0,0,1]",
        "constraints": "The number of nodes in each linked list is in the range [1, 100].\n0 <= Node.val <= 9\nThe numbers do not contain leading zeros except the number 0 itself.",
        "hints": "Traverse both lists simultaneously, keeping track of the carry. Create new nodes for each digit of the result.",
        "starter_code": {
            "python": "class Solution:\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n        pass",
            "javascript": "var addTwoNumbers = function(l1, l2) {\n    \n};",
            "java": "class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,4,3]\n[5,6,4]", "expected_output": "[7,0,8]", "is_sample": True},
            {"input": "[9,9,9,9,9,9,9]\n[9,9,9,9]", "expected_output": "[8,9,9,9,0,0,0,1]", "is_sample": True},
            {"input": "[0]\n[0]", "expected_output": "[0]", "is_sample": False},
        ],
    },
    # ─── 22. Add Two Numbers II ────────────────────────────────────────
    {
        "title": "Add Two Numbers II",
        "difficulty": "medium",
        "tags": ["linked-list", "stack"],
        "companies": ["amazon", "microsoft", "bloomberg", "uber"],
        "description": "You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each node contains a single digit. Add the two numbers and return the sum as a linked list. You may not reverse the input lists.\n\nExample 1:\nInput: l1 = [7,2,4,3], l2 = [5,6,4]\nOutput: [7,8,0,7]\n\nExample 2:\nInput: l1 = [2,4,3], l2 = [5,6,4]\nOutput: [8,0,7]",
        "constraints": "The number of nodes in each linked list is in the range [1, 100].\n0 <= Node.val <= 9\nThe numbers do not contain leading zeros.",
        "hints": "Use two stacks to reverse the order of digits, then add from least significant digit to most significant.",
        "starter_code": {
            "python": "class Solution:\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n        pass",
            "javascript": "var addTwoNumbers = function(l1, l2) {\n    \n};",
            "java": "class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[7,2,4,3]\n[5,6,4]", "expected_output": "[7,8,0,7]", "is_sample": True},
            {"input": "[2,4,3]\n[5,6,4]", "expected_output": "[8,0,7]", "is_sample": True},
            {"input": "[5]\n[5]", "expected_output": "[1,0]", "is_sample": False},
        ],
    },
    # ─── 23. Odd Even Linked List ──────────────────────────────────────
    {
        "title": "Odd Even Linked List",
        "difficulty": "medium",
        "tags": ["linked-list"],
        "companies": ["amazon", "meta", "microsoft"],
        "description": "Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list. The first node is considered odd, the second even, and so on. Solve in O(1) extra space and O(n) time.\n\nExample 1:\nInput: head = [1,2,3,4,5]\nOutput: [1,3,5,2,4]\n\nExample 2:\nInput: head = [2,1,3,5,6,4,7]\nOutput: [2,3,6,7,1,5,4]",
        "constraints": "The number of nodes in the linked list is in the range [0, 10^4].\n-10^6 <= Node.val <= 10^6",
        "hints": "Use two pointers to build odd and even lists separately, then connect them.",
        "starter_code": {
            "python": "class Solution:\n    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        pass",
            "javascript": "var oddEvenList = function(head) {\n    \n};",
            "java": "class Solution {\n    public ListNode oddEvenList(ListNode head) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* oddEvenList(ListNode* head) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4,5]", "expected_output": "[1,3,5,2,4]", "is_sample": True},
            {"input": "[2,1,3,5,6,4,7]", "expected_output": "[2,3,6,7,1,5,4]", "is_sample": True},
            {"input": "[1,2]", "expected_output": "[1,2]", "is_sample": False},
        ],
    },
    # ─── 24. Partition List ────────────────────────────────────────────
    {
        "title": "Partition List",
        "difficulty": "medium",
        "tags": ["linked-list"],
        "companies": ["amazon", "adobe", "microsoft"],
        "description": "Given the head of a linked list and a value `x`, partition it such that all nodes less than `x` come before nodes greater than or equal to `x`. Preserve the original relative order of the nodes in each partition.\n\nExample 1:\nInput: head = [1,4,3,2,5,2], x = 3\nOutput: [1,2,2,4,3,5]\n\nExample 2:\nInput: head = [2,1], x = 2\nOutput: [1,2]",
        "constraints": "The number of nodes in the list is in the range [0, 200].\n-100 <= Node.val <= 100\n-200 <= x <= 200",
        "hints": "Create two separate lists: one for nodes less than x and one for nodes >= x. Then connect them.",
        "starter_code": {
            "python": "class Solution:\n    def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:\n        pass",
            "javascript": "var partition = function(head, x) {\n    \n};",
            "java": "class Solution {\n    public ListNode partition(ListNode head, int x) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* partition(ListNode* head, int x) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,4,3,2,5,2]\n3", "expected_output": "[1,2,2,4,3,5]", "is_sample": True},
            {"input": "[2,1]\n2", "expected_output": "[1,2]", "is_sample": True},
            {"input": "[1]\n0", "expected_output": "[1]", "is_sample": False},
        ],
    },
    # ─── 25. Swap Nodes in Pairs ───────────────────────────────────────
    {
        "title": "Swap Nodes in Pairs",
        "difficulty": "medium",
        "tags": ["linked-list", "recursion"],
        "companies": ["amazon", "meta", "microsoft", "uber"],
        "description": "Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed).\n\nExample 1:\nInput: head = [1,2,3,4]\nOutput: [2,1,4,3]\n\nExample 2:\nInput: head = [1]\nOutput: [1]",
        "constraints": "The number of nodes in the list is in the range [0, 100].\n0 <= Node.val <= 100",
        "hints": "Use recursion or iteration with a dummy node. For each pair, swap the two nodes by adjusting pointers.",
        "starter_code": {
            "python": "class Solution:\n    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        pass",
            "javascript": "var swapPairs = function(head) {\n    \n};",
            "java": "class Solution {\n    public ListNode swapPairs(ListNode head) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* swapPairs(ListNode* head) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4]", "expected_output": "[2,1,4,3]", "is_sample": True},
            {"input": "[1]", "expected_output": "[1]", "is_sample": True},
            {"input": "[1,2,3]", "expected_output": "[2,1,3]", "is_sample": False},
        ],
    },
    # ─── 26. Reverse Nodes in k-Group ──────────────────────────────────
    {
        "title": "Reverse Nodes in k-Group",
        "difficulty": "hard",
        "tags": ["linked-list", "recursion"],
        "companies": ["amazon", "google", "meta", "microsoft"],
        "description": "Given the head of a linked list, reverse the nodes of the list `k` at a time and return the modified list. If the number of remaining nodes is less than `k`, leave them as-is. You may not alter values in the nodes, only the nodes themselves.\n\nExample 1:\nInput: head = [1,2,3,4,5], k = 2\nOutput: [2,1,4,3,5]\n\nExample 2:\nInput: head = [1,2,3,4,5], k = 3\nOutput: [3,2,1,4,5]",
        "constraints": "The number of nodes in the list is n.\n1 <= k <= n <= 5000\n0 <= Node.val <= 1000",
        "hints": "Count k nodes ahead. If enough exist, reverse them and recursively process the rest. Connect reversed segments properly.",
        "starter_code": {
            "python": "class Solution:\n    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:\n        pass",
            "javascript": "var reverseKGroup = function(head, k) {\n    \n};",
            "java": "class Solution {\n    public ListNode reverseKGroup(ListNode head, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* reverseKGroup(ListNode* head, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4,5]\n2", "expected_output": "[2,1,4,3,5]", "is_sample": True},
            {"input": "[1,2,3,4,5]\n3", "expected_output": "[3,2,1,4,5]", "is_sample": True},
            {"input": "[1,2,3,4]\n4", "expected_output": "[4,3,2,1]", "is_sample": False},
        ],
    },
    # ─── 27. Rotate List ───────────────────────────────────────────────
    {
        "title": "Rotate List",
        "difficulty": "medium",
        "tags": ["linked-list"],
        "companies": ["amazon", "linkedin", "microsoft"],
        "description": "Given the head of a linked list, rotate the list to the right by `k` places.\n\nExample 1:\nInput: head = [1,2,3,4,5], k = 2\nOutput: [4,5,1,2,3]\n\nExample 2:\nInput: head = [0,1,2], k = 4\nOutput: [2,0,1]",
        "constraints": "The number of nodes in the list is in the range [0, 500].\n-100 <= Node.val <= 100\n0 <= k <= 2 * 10^9",
        "hints": "Find the length, compute k % length, then break the list at the appropriate point and reconnect.",
        "starter_code": {
            "python": "class Solution:\n    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:\n        pass",
            "javascript": "var rotateRight = function(head, k) {\n    \n};",
            "java": "class Solution {\n    public ListNode rotateRight(ListNode head, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* rotateRight(ListNode* head, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4,5]\n2", "expected_output": "[4,5,1,2,3]", "is_sample": True},
            {"input": "[0,1,2]\n4", "expected_output": "[2,0,1]", "is_sample": True},
            {"input": "[1]\n99", "expected_output": "[1]", "is_sample": False},
        ],
    },
    # ─── 28. Sort List ─────────────────────────────────────────────────
    {
        "title": "Sort List",
        "difficulty": "medium",
        "tags": ["linked-list", "sorting"],
        "companies": ["amazon", "meta", "microsoft", "uber"],
        "description": "Given the head of a linked list, return the list after sorting it in ascending order. Solve in O(n log n) time and O(1) space (i.e., constant extra space).\n\nExample 1:\nInput: head = [4,2,1,3]\nOutput: [1,2,3,4]\n\nExample 2:\nInput: head = [-1,5,3,4,0]\nOutput: [-1,0,3,4,5]",
        "constraints": "The number of nodes in the list is in the range [0, 5 * 10^4].\n-10^5 <= Node.val <= 10^5",
        "hints": "Use merge sort: find the middle with slow/fast pointers, recursively sort both halves, then merge them.",
        "starter_code": {
            "python": "class Solution:\n    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        pass",
            "javascript": "var sortList = function(head) {\n    \n};",
            "java": "class Solution {\n    public ListNode sortList(ListNode head) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* sortList(ListNode* head) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[4,2,1,3]", "expected_output": "[1,2,3,4]", "is_sample": True},
            {"input": "[-1,5,3,4,0]", "expected_output": "[-1,0,3,4,5]", "is_sample": True},
            {"input": "[1]", "expected_output": "[1]", "is_sample": False},
        ],
    },
    # ─── 29. Reorder List ──────────────────────────────────────────────
    {
        "title": "Reorder List",
        "difficulty": "medium",
        "tags": ["linked-list"],
        "companies": ["amazon", "meta", "microsoft", "uber"],
        "description": "Given the head of a singly linked list L0 -> L1 -> ... -> Ln-1 -> Ln, reorder it to L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ... You may not modify the values in the nodes, only the nodes themselves.\n\nExample 1:\nInput: head = [1,2,3,4]\nOutput: [1,4,2,3]\n\nExample 2:\nInput: head = [1,2,3,4,5]\nOutput: [1,5,2,4,3]",
        "constraints": "The number of nodes in the list is in the range [1, 5 * 10^4].\n1 <= Node.val <= 1000",
        "hints": "Find the middle, reverse the second half, then merge the two halves by alternating nodes.",
        "starter_code": {
            "python": "class Solution:\n    def reorderList(self, head: Optional[ListNode]) -> None:\n        pass",
            "javascript": "var reorderList = function(head) {\n    \n};",
            "java": "class Solution {\n    public void reorderList(ListNode head) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void reorderList(ListNode* head) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4]", "expected_output": "[1,4,2,3]", "is_sample": True},
            {"input": "[1,2,3,4,5]", "expected_output": "[1,5,2,4,3]", "is_sample": True},
            {"input": "[1]", "expected_output": "[1]", "is_sample": False},
        ],
    },
    # ─── 30. Remove Duplicates from Sorted List ────────────────────────
    {
        "title": "Remove Duplicates from Sorted List",
        "difficulty": "easy",
        "tags": ["linked-list"],
        "companies": ["amazon", "adobe", "apple"],
        "description": "Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.\n\nExample 1:\nInput: head = [1,1,2]\nOutput: [1,2]\n\nExample 2:\nInput: head = [1,1,2,3,3]\nOutput: [1,2,3]",
        "constraints": "The number of nodes in the list is in the range [0, 300].\n-100 <= Node.val <= 100\nThe list is guaranteed to be sorted in ascending order.",
        "hints": "Traverse the list and skip nodes that have the same value as the current node.",
        "starter_code": {
            "python": "class Solution:\n    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        pass",
            "javascript": "var deleteDuplicates = function(head) {\n    \n};",
            "java": "class Solution {\n    public ListNode deleteDuplicates(ListNode head) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* deleteDuplicates(ListNode* head) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,1,2]", "expected_output": "[1,2]", "is_sample": True},
            {"input": "[1,1,2,3,3]", "expected_output": "[1,2,3]", "is_sample": True},
            {"input": "[1,1,1]", "expected_output": "[1]", "is_sample": False},
        ],
    },
    # ─── 31. Remove Duplicates from Sorted List II ─────────────────────
    {
        "title": "Remove Duplicates from Sorted List II",
        "difficulty": "medium",
        "tags": ["linked-list"],
        "companies": ["amazon", "meta", "microsoft"],
        "description": "Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.\n\nExample 1:\nInput: head = [1,2,3,3,4,4,5]\nOutput: [1,2,5]\n\nExample 2:\nInput: head = [1,1,1,2,3]\nOutput: [2,3]",
        "constraints": "The number of nodes in the list is in the range [0, 300].\n-100 <= Node.val <= 100\nThe list is guaranteed to be sorted in ascending order.",
        "hints": "Use a dummy head and a predecessor pointer. Skip all nodes with duplicate values by advancing until a different value is found.",
        "starter_code": {
            "python": "class Solution:\n    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        pass",
            "javascript": "var deleteDuplicates = function(head) {\n    \n};",
            "java": "class Solution {\n    public ListNode deleteDuplicates(ListNode head) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* deleteDuplicates(ListNode* head) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,3,4,4,5]", "expected_output": "[1,2,5]", "is_sample": True},
            {"input": "[1,1,1,2,3]", "expected_output": "[2,3]", "is_sample": True},
            {"input": "[1,1]", "expected_output": "[]", "is_sample": False},
        ],
    },
    # ─── 32. Intersection of Two Linked Lists ──────────────────────────
    {
        "title": "Intersection of Two Linked Lists",
        "difficulty": "easy",
        "tags": ["linked-list"],
        "companies": ["amazon", "meta", "linkedin", "microsoft"],
        "description": "Given the heads of two singly linked lists `headA` and `headB`, return the node at which the two lists intersect. If the two linked lists have no intersection, return null. The lists are guaranteed to have no cycles.\n\nExample 1:\nInput: listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3\nOutput: Intersected at '8'\n\nExample 2:\nInput: listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2\nOutput: No intersection",
        "constraints": "The number of nodes of listA is in the m.\nThe number of nodes of listB is in the n.\n1 <= m, n <= 3 * 10^4\n1 <= Node.val <= 10^5",
        "hints": "Use two pointers starting at each head. When one reaches the end, redirect it to the other list's head. They will meet at the intersection or both reach null.",
        "starter_code": {
            "python": "class Solution:\n    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:\n        pass",
            "javascript": "var getIntersectionNode = function(headA, headB) {\n    \n};",
            "java": "public class Solution {\n    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[4,1,8,4,5]\n[5,6,1,8,4,5]\n2\n3", "expected_output": "8", "is_sample": True},
            {"input": "[1,9,1,2,4]\n[3,2,4]\n3\n1", "expected_output": "2", "is_sample": True},
            {"input": "[2,6,4]\n[1,5]\n3\n2", "expected_output": "null", "is_sample": False},
        ],
    },
    # ─── 33. Copy List with Random Pointer ─────────────────────────────
    {
        "title": "Copy List with Random Pointer",
        "difficulty": "medium",
        "tags": ["linked-list", "hash-table"],
        "companies": ["amazon", "meta", "microsoft", "uber"],
        "description": "A linked list of length `n` is given where each node contains an additional random pointer that could point to any node in the list or null. Construct a deep copy of the list and return the head of the copied list.\n\nExample 1:\nInput: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]\nOutput: [[7,null],[13,0],[11,4],[10,2],[1,0]]\n\nExample 2:\nInput: head = [[1,1],[2,1]]\nOutput: [[1,1],[2,1]]",
        "constraints": "0 <= n <= 1000\n-10^4 <= Node.val <= 10^4\nNode.random is null or is pointing to some node in the linked list.",
        "hints": "Use a hash map to map original nodes to their copies. Two passes: first create all copies, then assign next and random pointers.",
        "starter_code": {
            "python": "class Solution:\n    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':\n        pass",
            "javascript": "var copyRandomList = function(head) {\n    \n};",
            "java": "class Solution {\n    public Node copyRandomList(Node head) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    Node* copyRandomList(Node* head) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[7,null],[13,0],[11,4],[10,2],[1,0]]", "expected_output": "[[7,null],[13,0],[11,4],[10,2],[1,0]]", "is_sample": True},
            {"input": "[[1,1],[2,1]]", "expected_output": "[[1,1],[2,1]]", "is_sample": True},
            {"input": "[[3,null],[3,0],[3,null]]", "expected_output": "[[3,null],[3,0],[3,null]]", "is_sample": False},
        ],
    },
    # ─── 34. Palindrome Linked List ────────────────────────────────────
    {
        "title": "Palindrome Linked List",
        "difficulty": "easy",
        "tags": ["linked-list", "two-pointers"],
        "companies": ["amazon", "meta", "apple", "uber"],
        "description": "Given the head of a singly linked list, return `true` if it is a palindrome or `false` otherwise. Can you solve it in O(n) time and O(1) space?\n\nExample 1:\nInput: head = [1,2,2,1]\nOutput: true\n\nExample 2:\nInput: head = [1,2]\nOutput: false",
        "constraints": "The number of nodes in the list is in the range [1, 10^5].\n0 <= Node.val <= 9",
        "hints": "Find the middle using slow/fast pointers, reverse the second half, then compare both halves node by node.",
        "starter_code": {
            "python": "class Solution:\n    def isPalindrome(self, head: Optional[ListNode]) -> bool:\n        pass",
            "javascript": "var isPalindrome = function(head) {\n    \n};",
            "java": "class Solution {\n    public boolean isPalindrome(ListNode head) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isPalindrome(ListNode* head) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,2,1]", "expected_output": "true", "is_sample": True},
            {"input": "[1,2]", "expected_output": "false", "is_sample": True},
            {"input": "[1]", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 35. Flatten a Multilevel Doubly Linked List ───────────────────
    {
        "title": "Flatten a Multilevel Doubly Linked List",
        "difficulty": "medium",
        "tags": ["linked-list"],
        "companies": ["meta", "amazon", "microsoft", "uber"],
        "description": "You are given a doubly linked list where each node may have a child pointer to a separate doubly linked list. Flatten the list so that all nodes appear in a single-level doubly linked list. The child lists should be inserted after the parent node.\n\nExample 1:\nInput: head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]\nOutput: [1,2,3,7,8,11,12,9,10,4,5,6]\n\nExample 2:\nInput: head = [1,2,null,3]\nOutput: [1,3,2]",
        "constraints": "The number of nodes will not exceed 1000.\n1 <= Node.val <= 10^5",
        "hints": "Use a stack or recursion. When a child is found, save the next node, process the child chain, then reconnect.",
        "starter_code": {
            "python": "class Solution:\n    def flatten(self, head: 'Optional[Node]') -> 'Optional[Node]':\n        pass",
            "javascript": "var flatten = function(head) {\n    \n};",
            "java": "class Solution {\n    public Node flatten(Node head) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    Node* flatten(Node* head) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]", "expected_output": "[1,2,3,7,8,11,12,9,10,4,5,6]", "is_sample": True},
            {"input": "[1,2,null,3]", "expected_output": "[1,3,2]", "is_sample": True},
            {"input": "[]", "expected_output": "[]", "is_sample": False},
        ],
    },
    # ─── 36. Design Linked List ────────────────────────────────────────
    {
        "title": "Design Linked List",
        "difficulty": "medium",
        "tags": ["linked-list", "design"],
        "companies": ["amazon", "microsoft", "apple"],
        "description": "Design your implementation of a linked list. You can choose a singly or doubly linked list. Implement `get(index)`, `addAtHead(val)`, `addAtTail(val)`, `addAtIndex(index, val)`, and `deleteAtIndex(index)`.\n\nExample 1:\nInput: [\"MyLinkedList\",\"addAtHead\",\"addAtTail\",\"addAtIndex\",\"get\",\"deleteAtIndex\",\"get\"] [[],[1],[3],[1,2],[1],[1],[1]]\nOutput: [null,null,null,null,2,null,3]",
        "constraints": "0 <= index, val <= 1000\nAt most 2000 calls will be made to get, addAtHead, addAtTail, addAtIndex, and deleteAtIndex.",
        "hints": "Use a sentinel/dummy head node to simplify edge cases. Track the size of the list for index validation.",
        "starter_code": {
            "python": "class MyLinkedList:\n    def __init__(self):\n        pass\n\n    def get(self, index: int) -> int:\n        pass\n\n    def addAtHead(self, val: int) -> None:\n        pass\n\n    def addAtTail(self, val: int) -> None:\n        pass\n\n    def addAtIndex(self, index: int, val: int) -> None:\n        pass\n\n    def deleteAtIndex(self, index: int) -> None:\n        pass",
            "javascript": "var MyLinkedList = function() {\n    \n};\n\nMyLinkedList.prototype.get = function(index) {\n    \n};\n\nMyLinkedList.prototype.addAtHead = function(val) {\n    \n};\n\nMyLinkedList.prototype.addAtTail = function(val) {\n    \n};\n\nMyLinkedList.prototype.addAtIndex = function(index, val) {\n    \n};\n\nMyLinkedList.prototype.deleteAtIndex = function(index) {\n    \n};",
            "java": "class MyLinkedList {\n    public MyLinkedList() {\n        \n    }\n\n    public int get(int index) {\n        \n    }\n\n    public void addAtHead(int val) {\n        \n    }\n\n    public void addAtTail(int val) {\n        \n    }\n\n    public void addAtIndex(int index, int val) {\n        \n    }\n\n    public void deleteAtIndex(int index) {\n        \n    }\n}",
            "cpp": "class MyLinkedList {\npublic:\n    MyLinkedList() {\n        \n    }\n\n    int get(int index) {\n        \n    }\n\n    void addAtHead(int val) {\n        \n    }\n\n    void addAtTail(int val) {\n        \n    }\n\n    void addAtIndex(int index, int val) {\n        \n    }\n\n    void deleteAtIndex(int index) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"addAtHead\",\"addAtTail\",\"addAtIndex\",\"get\",\"deleteAtIndex\",\"get\"]\n[[1],[3],[1,2],[1],[1],[1]]", "expected_output": "[null,null,null,2,null,3]", "is_sample": True},
            {"input": "[\"addAtHead\",\"addAtHead\",\"get\",\"get\"]\n[[2],[1],[0],[1]]", "expected_output": "[null,null,1,2]", "is_sample": True},
            {"input": "[\"addAtHead\",\"deleteAtIndex\",\"addAtTail\",\"get\"]\n[[1],[0],[2],[0]]", "expected_output": "[null,null,null,2]", "is_sample": False},
        ],
    },
    # ─── 37. LRU Cache ─────────────────────────────────────────────────
    {
        "title": "LRU Cache",
        "difficulty": "medium",
        "tags": ["linked-list", "hash-table", "design"],
        "companies": ["amazon", "google", "meta", "microsoft"],
        "description": "Design a data structure that follows the Least Recently Used (LRU) cache constraints. Implement `LRUCache(int capacity)`, `get(key)` which returns the value or -1, and `put(key, value)` which updates or inserts. When the cache exceeds capacity, evict the least recently used key. Both operations must run in O(1) time.\n\nExample 1:\nInput: [\"LRUCache\",\"put\",\"put\",\"get\",\"put\",\"get\",\"put\",\"get\",\"get\",\"get\"] [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]\nOutput: [null,null,null,1,null,-1,null,-1,3,4]",
        "constraints": "1 <= capacity <= 3000\n0 <= key <= 10^4\n0 <= value <= 10^5\nAt most 2 * 10^5 calls will be made to get and put.",
        "hints": "Use a hash map combined with a doubly linked list. The map provides O(1) lookup, and the linked list maintains usage order.",
        "starter_code": {
            "python": "class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n\n    def get(self, key: int) -> int:\n        pass\n\n    def put(self, key: int, value: int) -> None:\n        pass",
            "javascript": "var LRUCache = function(capacity) {\n    \n};\n\nLRUCache.prototype.get = function(key) {\n    \n};\n\nLRUCache.prototype.put = function(key, value) {\n    \n};",
            "java": "class LRUCache {\n    public LRUCache(int capacity) {\n        \n    }\n\n    public int get(int key) {\n        \n    }\n\n    public void put(int key, int value) {\n        \n    }\n}",
            "cpp": "class LRUCache {\npublic:\n    LRUCache(int capacity) {\n        \n    }\n\n    int get(int key) {\n        \n    }\n\n    void put(int key, int value) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "2\n[\"put\",\"put\",\"get\",\"put\",\"get\",\"put\",\"get\",\"get\",\"get\"]\n[[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]", "expected_output": "[null,null,1,null,-1,null,-1,3,4]", "is_sample": True},
            {"input": "1\n[\"put\",\"put\",\"get\"]\n[[1,1],[2,2],[1]]", "expected_output": "[null,null,-1]", "is_sample": True},
            {"input": "2\n[\"put\",\"get\",\"put\",\"get\",\"get\"]\n[[2,1],[2],[3,2],[2],[3]]", "expected_output": "[null,1,null,1,2]", "is_sample": False},
        ],
    },
    # ─── 38. LFU Cache ─────────────────────────────────────────────────
    {
        "title": "LFU Cache",
        "difficulty": "hard",
        "tags": ["linked-list", "hash-table", "design"],
        "companies": ["amazon", "google", "microsoft", "uber"],
        "description": "Design and implement a data structure for a Least Frequently Used (LFU) cache. Implement `LFUCache(int capacity)`, `get(key)`, and `put(key, value)`. When the cache reaches capacity, invalidate and remove the least frequently used key. If there is a tie, remove the least recently used key among them. Both operations must run in O(1) time.\n\nExample 1:\nInput: [\"LFUCache\",\"put\",\"put\",\"get\",\"put\",\"get\",\"get\",\"put\",\"get\",\"get\",\"get\"] [[2],[1,1],[2,2],[1],[3,3],[2],[3],[4,4],[1],[3],[4]]\nOutput: [null,null,null,1,null,-1,3,null,1,3,4]",
        "constraints": "1 <= capacity <= 10^4\n0 <= key <= 10^5\n0 <= value <= 10^9\nAt most 2 * 10^5 calls will be made to get and put.",
        "hints": "Use a hash map for key lookups, a frequency map from frequency to a doubly linked list (or OrderedDict), and track the minimum frequency.",
        "starter_code": {
            "python": "class LFUCache:\n    def __init__(self, capacity: int):\n        pass\n\n    def get(self, key: int) -> int:\n        pass\n\n    def put(self, key: int, value: int) -> None:\n        pass",
            "javascript": "var LFUCache = function(capacity) {\n    \n};\n\nLFUCache.prototype.get = function(key) {\n    \n};\n\nLFUCache.prototype.put = function(key, value) {\n    \n};",
            "java": "class LFUCache {\n    public LFUCache(int capacity) {\n        \n    }\n\n    public int get(int key) {\n        \n    }\n\n    public void put(int key, int value) {\n        \n    }\n}",
            "cpp": "class LFUCache {\npublic:\n    LFUCache(int capacity) {\n        \n    }\n\n    int get(int key) {\n        \n    }\n\n    void put(int key, int value) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "2\n[\"put\",\"put\",\"get\",\"put\",\"get\",\"get\",\"put\",\"get\",\"get\",\"get\"]\n[[1,1],[2,2],[1],[3,3],[2],[3],[4,4],[1],[3],[4]]", "expected_output": "[null,null,1,null,-1,3,null,1,3,4]", "is_sample": True},
            {"input": "1\n[\"put\",\"get\",\"put\",\"get\",\"get\"]\n[[1,1],[1],[2,2],[1],[2]]", "expected_output": "[null,1,null,-1,2]", "is_sample": True},
            {"input": "2\n[\"put\",\"put\",\"get\",\"get\",\"put\",\"get\"]\n[[1,1],[2,2],[1],[2],[3,3],[1]]", "expected_output": "[null,null,1,2,null,1]", "is_sample": False},
        ],
    },
    # ─── 39. Reverse Linked List II ────────────────────────────────────
    {
        "title": "Reverse Linked List II",
        "difficulty": "medium",
        "tags": ["linked-list"],
        "companies": ["amazon", "meta", "microsoft", "uber"],
        "description": "Given the head of a singly linked list and two integers `left` and `right` where `left <= right`, reverse the nodes of the list from position `left` to position `right`, and return the reversed list.\n\nExample 1:\nInput: head = [1,2,3,4,5], left = 2, right = 4\nOutput: [1,4,3,2,5]\n\nExample 2:\nInput: head = [5], left = 1, right = 1\nOutput: [5]",
        "constraints": "The number of nodes in the list is n.\n1 <= n <= 500\n-500 <= Node.val <= 500\n1 <= left <= right <= n",
        "hints": "Traverse to the node before position left. Then reverse the sub-list from left to right and reconnect the pointers.",
        "starter_code": {
            "python": "class Solution:\n    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:\n        pass",
            "javascript": "var reverseBetween = function(head, left, right) {\n    \n};",
            "java": "class Solution {\n    public ListNode reverseBetween(ListNode head, int left, int right) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* reverseBetween(ListNode* head, int left, int right) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4,5]\n2\n4", "expected_output": "[1,4,3,2,5]", "is_sample": True},
            {"input": "[5]\n1\n1", "expected_output": "[5]", "is_sample": True},
            {"input": "[1,2,3]\n1\n3", "expected_output": "[3,2,1]", "is_sample": False},
        ],
    },
    # ─── 40. Insert into a Sorted Circular Linked List ─────────────────
    {
        "title": "Insert into a Sorted Circular Linked List",
        "difficulty": "medium",
        "tags": ["linked-list"],
        "companies": ["meta", "google", "microsoft", "uber"],
        "description": "Given a circular linked list sorted in non-decreasing order, insert a new value `insertVal` into the list such that it remains sorted. You may be given a reference to any single node in the list (not necessarily the smallest). If the list is empty, create a single-node circular list.\n\nExample 1:\nInput: head = [3,4,1], insertVal = 2\nOutput: [3,4,1,2]\n\nExample 2:\nInput: head = [], insertVal = 1\nOutput: [1]",
        "constraints": "The number of nodes in the list is in the range [0, 5 * 10^4].\n-10^6 <= Node.val, insertVal <= 10^6",
        "hints": "Find the correct insertion point by traversing the circular list. Handle three cases: normal insertion, insertion at the max/min boundary, and uniform-value lists.",
        "starter_code": {
            "python": "class Solution:\n    def insert(self, head: 'Optional[Node]', insertVal: int) -> 'Node':\n        pass",
            "javascript": "var insert = function(head, insertVal) {\n    \n};",
            "java": "class Solution {\n    public Node insert(Node head, int insertVal) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    Node* insert(Node* head, int insertVal) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,4,1]\n2", "expected_output": "[3,4,1,2]", "is_sample": True},
            {"input": "[]\n1", "expected_output": "[1]", "is_sample": True},
            {"input": "[1,1,1]\n0", "expected_output": "[1,1,1,0]", "is_sample": False},
        ],
    },
]

"""Batch 13: Mixed topics — more unique problems (~43 with company labels)."""

PROBLEMS_BATCH13 = [
    # ─── 1. Removing Stars From a String ─────────────────────────────────
    {
        "title": "Removing Stars From a String",
        "difficulty": "medium",
        "tags": ["stack", "string"],
        "companies": ["google", "amazon", "meta"],
        "description": "You are given a string `s`, which contains stars `*`. In one operation, you can choose a star, remove the closest non-star character to its left, and remove the star itself. Return the string after all stars have been removed.\n\nExample 1:\nInput: s = \"leet**cod*e\"\nOutput: \"lecoe\"\n\nExample 2:\nInput: s = \"erase*****\"\nOutput: \"\"",
        "constraints": "1 <= s.length <= 10^5\ns consists of lowercase English letters and stars *.\nThe operation above can always be applied.",
        "hints": "Use a stack: push characters and pop when you encounter a star.",
        "starter_code": {
            "python": "class Solution:\n    def removeStars(self, s: str) -> str:\n        pass",
            "javascript": "var removeStars = function(s) {\n    \n};",
            "java": "class Solution {\n    public String removeStars(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string removeStars(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"leet**cod*e\"", "expected_output": "\"lecoe\"", "is_sample": True},
            {"input": "\"erase*****\"", "expected_output": "\"\"", "is_sample": True},
            {"input": "\"a*b*c*d\"", "expected_output": "\"d\"", "is_sample": False},
        ],
    },
    # ─── 2. Remove K Digits ──────────────────────────────────────────────
    {
        "title": "Remove K Digits",
        "difficulty": "medium",
        "tags": ["stack", "greedy", "string"],
        "companies": ["amazon", "microsoft", "uber", "bytedance"],
        "description": "Given string `num` representing a non-negative integer and an integer `k`, return the smallest possible integer after removing `k` digits from `num`. The result should not have leading zeros.\n\nExample 1:\nInput: num = \"1432219\", k = 3\nOutput: \"1219\"\n\nExample 2:\nInput: num = \"10200\", k = 1\nOutput: \"200\"",
        "constraints": "1 <= k <= num.length <= 10^5\nnum consists of only digits.\nnum does not have any leading zeros except for the zero itself.",
        "hints": "Use a monotonic stack. Greedily remove digits that are larger than the next digit.",
        "starter_code": {
            "python": "class Solution:\n    def removeKdigits(self, num: str, k: int) -> str:\n        pass",
            "javascript": "var removeKdigits = function(num, k) {\n    \n};",
            "java": "class Solution {\n    public String removeKdigits(String num, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string removeKdigits(string num, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"1432219\"\n3", "expected_output": "\"1219\"", "is_sample": True},
            {"input": "\"10200\"\n1", "expected_output": "\"200\"", "is_sample": True},
            {"input": "\"10\"\n2", "expected_output": "\"0\"", "is_sample": False},
        ],
    },
    # ─── 3. Car Pooling ──────────────────────────────────────────────────
    {
        "title": "Car Pooling",
        "difficulty": "medium",
        "tags": ["array", "sorting", "simulation"],
        "companies": ["google", "lyft", "uber", "amazon"],
        "description": "A car with `capacity` empty seats drives east. You are given an array `trips` where `trips[i] = [numPassengers_i, from_i, to_i]` indicates that `numPassengers_i` passengers must be picked up at `from_i` and dropped off at `to_i`. Return `true` if it is possible to pick up and drop off all passengers for all trips, otherwise return `false`.\n\nExample 1:\nInput: trips = [[2,1,5],[3,3,7]], capacity = 4\nOutput: false\n\nExample 2:\nInput: trips = [[2,1,5],[3,3,7]], capacity = 5\nOutput: true",
        "constraints": "1 <= trips.length <= 1000\ntrips[i].length == 3\n1 <= numPassengers_i <= 100\n0 <= from_i < to_i <= 1000\n1 <= capacity <= 10^5",
        "hints": "Use a difference array or sweep line. Add passengers at from and remove at to, then check if the running sum ever exceeds capacity.",
        "starter_code": {
            "python": "class Solution:\n    def carPooling(self, trips: list[list[int]], capacity: int) -> bool:\n        pass",
            "javascript": "var carPooling = function(trips, capacity) {\n    \n};",
            "java": "class Solution {\n    public boolean carPooling(int[][] trips, int capacity) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool carPooling(vector<vector<int>>& trips, int capacity) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[2,1,5],[3,3,7]]\n4", "expected_output": "false", "is_sample": True},
            {"input": "[[2,1,5],[3,3,7]]\n5", "expected_output": "true", "is_sample": True},
            {"input": "[[3,2,7],[3,7,9],[8,3,9]]\n11", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 4. My Calendar I ────────────────────────────────────────────────
    {
        "title": "My Calendar I",
        "difficulty": "medium",
        "tags": ["design", "intervals"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "Implement a `MyCalendar` class to store events. A new event can be added if it does not cause a double booking. A double booking happens when two events have some non-empty intersection. The event `[start, end)` is a half-open interval.\n\nExample:\nInput: [\"MyCalendar\",\"book\",\"book\",\"book\"] [[],[10,20],[15,25],[20,30]]\nOutput: [null,true,false,true]",
        "constraints": "0 <= start < end <= 10^9\nAt most 1000 calls will be made to book.",
        "hints": "Keep a sorted list of intervals. For each booking, check if it overlaps with any existing interval.",
        "starter_code": {
            "python": "class MyCalendar:\n    def __init__(self):\n        pass\n\n    def book(self, start: int, end: int) -> bool:\n        pass",
            "javascript": "var MyCalendar = function() {\n    \n};\n\nMyCalendar.prototype.book = function(start, end) {\n    \n};",
            "java": "class MyCalendar {\n    public MyCalendar() {\n        \n    }\n    public boolean book(int start, int end) {\n        \n    }\n}",
            "cpp": "class MyCalendar {\npublic:\n    MyCalendar() {\n        \n    }\n    bool book(int start, int end) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"MyCalendar\",\"book\",\"book\",\"book\"]\n[[],[10,20],[15,25],[20,30]]", "expected_output": "[null,true,false,true]", "is_sample": True},
            {"input": "[\"MyCalendar\",\"book\",\"book\",\"book\"]\n[[],[5,10],[10,15],[5,15]]", "expected_output": "[null,true,true,false]", "is_sample": True},
            {"input": "[\"MyCalendar\",\"book\",\"book\",\"book\",\"book\"]\n[[],[1,3],[3,5],[2,4],[6,8]]", "expected_output": "[null,true,true,false,true]", "is_sample": False},
        ],
    },
    # ─── 5. My Calendar II ───────────────────────────────────────────────
    {
        "title": "My Calendar II",
        "difficulty": "medium",
        "tags": ["design", "intervals"],
        "companies": ["google", "amazon", "uber"],
        "description": "Implement a `MyCalendarTwo` class to store events. A new event can be added if adding it does not cause a triple booking. A triple booking happens when three events have some non-empty intersection.\n\nExample:\nInput: [\"MyCalendarTwo\",\"book\",\"book\",\"book\",\"book\",\"book\",\"book\"]\n[[],[10,20],[50,60],[10,40],[5,15],[5,10],[25,55]]\nOutput: [null,true,true,true,false,true,true]",
        "constraints": "0 <= start < end <= 10^9\nAt most 1000 calls will be made to book.",
        "hints": "Maintain two lists: one for all bookings and one for double bookings. A new event causes a triple booking only if it overlaps with any double booking.",
        "starter_code": {
            "python": "class MyCalendarTwo:\n    def __init__(self):\n        pass\n\n    def book(self, start: int, end: int) -> bool:\n        pass",
            "javascript": "var MyCalendarTwo = function() {\n    \n};\n\nMyCalendarTwo.prototype.book = function(start, end) {\n    \n};",
            "java": "class MyCalendarTwo {\n    public MyCalendarTwo() {\n        \n    }\n    public boolean book(int start, int end) {\n        \n    }\n}",
            "cpp": "class MyCalendarTwo {\npublic:\n    MyCalendarTwo() {\n        \n    }\n    bool book(int start, int end) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"MyCalendarTwo\",\"book\",\"book\",\"book\",\"book\",\"book\",\"book\"]\n[[],[10,20],[50,60],[10,40],[5,15],[5,10],[25,55]]", "expected_output": "[null,true,true,true,false,true,true]", "is_sample": True},
            {"input": "[\"MyCalendarTwo\",\"book\",\"book\",\"book\"]\n[[],[1,5],[1,5],[1,5]]", "expected_output": "[null,true,true,false]", "is_sample": True},
            {"input": "[\"MyCalendarTwo\",\"book\",\"book\",\"book\",\"book\"]\n[[],[1,10],[10,20],[5,15],[5,8]]", "expected_output": "[null,true,true,true,false]", "is_sample": False},
        ],
    },
    # ─── 6. Range Sum Query - Immutable ──────────────────────────────────
    {
        "title": "Range Sum Query - Immutable",
        "difficulty": "easy",
        "tags": ["array", "design"],
        "companies": ["meta", "google", "palantir"],
        "description": "Given an integer array `nums`, handle multiple queries of the following type: calculate the sum of elements between indices `left` and `right` inclusive.\n\nExample:\nInput: [\"NumArray\",\"sumRange\",\"sumRange\",\"sumRange\"]\n[[[-2,0,3,-5,2,-1]],[0,2],[2,5],[0,5]]\nOutput: [null,1,-1,-3]",
        "constraints": "1 <= nums.length <= 10^4\n-10^5 <= nums[i] <= 10^5\n0 <= left <= right < nums.length\nAt most 10^4 calls will be made to sumRange.",
        "hints": "Precompute a prefix sum array so that each query is answered in O(1).",
        "starter_code": {
            "python": "class NumArray:\n    def __init__(self, nums: list[int]):\n        pass\n\n    def sumRange(self, left: int, right: int) -> int:\n        pass",
            "javascript": "var NumArray = function(nums) {\n    \n};\n\nNumArray.prototype.sumRange = function(left, right) {\n    \n};",
            "java": "class NumArray {\n    public NumArray(int[] nums) {\n        \n    }\n    public int sumRange(int left, int right) {\n        \n    }\n}",
            "cpp": "class NumArray {\npublic:\n    NumArray(vector<int>& nums) {\n        \n    }\n    int sumRange(int left, int right) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"NumArray\",\"sumRange\",\"sumRange\",\"sumRange\"]\n[[[-2,0,3,-5,2,-1]],[0,2],[2,5],[0,5]]", "expected_output": "[null,1,-1,-3]", "is_sample": True},
            {"input": "[\"NumArray\",\"sumRange\",\"sumRange\"]\n[[[1,2,3,4,5]],[0,4],[1,3]]", "expected_output": "[null,15,9]", "is_sample": True},
            {"input": "[\"NumArray\",\"sumRange\"]\n[[[10]],[0,0]]", "expected_output": "[null,10]", "is_sample": False},
        ],
    },
    # ─── 7. Range Sum Query 2D - Immutable ───────────────────────────────
    {
        "title": "Range Sum Query 2D - Immutable",
        "difficulty": "medium",
        "tags": ["array", "matrix", "design"],
        "companies": ["google", "meta", "amazon", "microsoft"],
        "description": "Given a 2D matrix, handle multiple queries of the following type: calculate the sum of elements inside the rectangle defined by its upper left corner `(row1, col1)` and lower right corner `(row2, col2)`.\n\nExample:\nInput: [\"NumMatrix\",\"sumRegion\",\"sumRegion\"]\n[[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]],[2,1,4,3],[1,1,2,2]]\nOutput: [null,8,11]",
        "constraints": "m == matrix.length\nn == matrix[i].length\n1 <= m, n <= 200\n-10^4 <= matrix[i][j] <= 10^4\nAt most 10^4 calls will be made to sumRegion.",
        "hints": "Build a 2D prefix sum matrix. The sum of a subrectangle can be computed using inclusion-exclusion on four corners.",
        "starter_code": {
            "python": "class NumMatrix:\n    def __init__(self, matrix: list[list[int]]):\n        pass\n\n    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:\n        pass",
            "javascript": "var NumMatrix = function(matrix) {\n    \n};\n\nNumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {\n    \n};",
            "java": "class NumMatrix {\n    public NumMatrix(int[][] matrix) {\n        \n    }\n    public int sumRegion(int row1, int col1, int row2, int col2) {\n        \n    }\n}",
            "cpp": "class NumMatrix {\npublic:\n    NumMatrix(vector<vector<int>>& matrix) {\n        \n    }\n    int sumRegion(int row1, int col1, int row2, int col2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"NumMatrix\",\"sumRegion\",\"sumRegion\"]\n[[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]],[2,1,4,3],[1,1,2,2]]", "expected_output": "[null,8,11]", "is_sample": True},
            {"input": "[\"NumMatrix\",\"sumRegion\"]\n[[[[1,2],[3,4]]],[0,0,1,1]]", "expected_output": "[null,10]", "is_sample": True},
            {"input": "[\"NumMatrix\",\"sumRegion\"]\n[[[[5]]],[0,0,0,0]]", "expected_output": "[null,5]", "is_sample": False},
        ],
    },
    # ─── 8. Number of Recent Calls ───────────────────────────────────────
    {
        "title": "Number of Recent Calls",
        "difficulty": "easy",
        "tags": ["queue", "design"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "Write a class `RecentCounter` that counts the number of recent requests within a time frame of 3000 milliseconds. Implement `ping(t)` which adds a new request at time `t` and returns the number of requests in the range `[t - 3000, t]`.\n\nExample:\nInput: [\"RecentCounter\",\"ping\",\"ping\",\"ping\",\"ping\"]\n[[],[1],[100],[3001],[3002]]\nOutput: [null,1,2,3,3]",
        "constraints": "1 <= t <= 10^9\nEach test case will call ping with strictly increasing values of t.\nAt most 10^4 calls will be made to ping.",
        "hints": "Use a queue. Add each request and remove requests older than t - 3000. The queue size is the answer.",
        "starter_code": {
            "python": "class RecentCounter:\n    def __init__(self):\n        pass\n\n    def ping(self, t: int) -> int:\n        pass",
            "javascript": "var RecentCounter = function() {\n    \n};\n\nRecentCounter.prototype.ping = function(t) {\n    \n};",
            "java": "class RecentCounter {\n    public RecentCounter() {\n        \n    }\n    public int ping(int t) {\n        \n    }\n}",
            "cpp": "class RecentCounter {\npublic:\n    RecentCounter() {\n        \n    }\n    int ping(int t) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[\"RecentCounter\",\"ping\",\"ping\",\"ping\",\"ping\"]\n[[],[1],[100],[3001],[3002]]", "expected_output": "[null,1,2,3,3]", "is_sample": True},
            {"input": "[\"RecentCounter\",\"ping\",\"ping\"]\n[[],[1],[3001]]", "expected_output": "[null,1,2]", "is_sample": True},
            {"input": "[\"RecentCounter\",\"ping\",\"ping\",\"ping\"]\n[[],[1],[3002],[6003]]", "expected_output": "[null,1,1,1]", "is_sample": False},
        ],
    },
    # ─── 9. Dota2 Senate ─────────────────────────────────────────────────
    {
        "title": "Dota2 Senate",
        "difficulty": "medium",
        "tags": ["queue", "greedy", "string"],
        "companies": ["amazon", "google", "adobe"],
        "description": "In the world of Dota2, there are two parties: Radiant (`R`) and Dire (`D`). The senate consists of senators from both parties who vote in rounds. Each senator can ban one senator from the opposing party. The party that still has senators able to vote wins. Given a string `senate` representing each senator's party, predict which party wins assuming optimal play.\n\nExample 1:\nInput: senate = \"RD\"\nOutput: \"Radiant\"\n\nExample 2:\nInput: senate = \"RDD\"\nOutput: \"Dire\"",
        "constraints": "1 <= senate.length <= 10^4\nsenate[i] is either 'R' or 'D'.",
        "hints": "Use two queues, one for R indices and one for D indices. In each round, the senator with the smaller index bans the other and re-enters the queue with index + n.",
        "starter_code": {
            "python": "class Solution:\n    def predictPartyVictory(self, senate: str) -> str:\n        pass",
            "javascript": "var predictPartyVictory = function(senate) {\n    \n};",
            "java": "class Solution {\n    public String predictPartyVictory(String senate) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string predictPartyVictory(string senate) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"RD\"", "expected_output": "\"Radiant\"", "is_sample": True},
            {"input": "\"RDD\"", "expected_output": "\"Dire\"", "is_sample": True},
            {"input": "\"RRDDD\"", "expected_output": "\"Radiant\"", "is_sample": False},
        ],
    },
    # ─── 10. Design Circular Deque ───────────────────────────────────────
    {
        "title": "Design Circular Deque",
        "difficulty": "medium",
        "tags": ["design", "queue"],
        "companies": ["amazon", "google", "microsoft", "apple"],
        "description": "Design your implementation of the circular double-ended queue (deque). Implement the `MyCircularDeque` class supporting: `insertFront`, `insertLast`, `deleteFront`, `deleteLast`, `getFront`, `getRear`, `isEmpty`, and `isFull`.\n\nExample:\nInput: [\"MyCircularDeque\",\"insertLast\",\"insertLast\",\"insertFront\",\"insertFront\",\"getRear\",\"isFull\",\"deleteLast\",\"insertFront\",\"getFront\"]\n[[3],[1],[2],[3],[4],[],[],[],[4],[]]\nOutput: [null,true,true,true,false,2,true,true,true,4]",
        "constraints": "1 <= k <= 1000\n0 <= value <= 1000\nAt most 2000 calls will be made to the deque operations.",
        "hints": "Use a fixed-size array with front and rear pointers. Use modular arithmetic to wrap around.",
        "starter_code": {
            "python": "class MyCircularDeque:\n    def __init__(self, k: int):\n        pass\n\n    def insertFront(self, value: int) -> bool:\n        pass\n\n    def insertLast(self, value: int) -> bool:\n        pass\n\n    def deleteFront(self) -> bool:\n        pass\n\n    def deleteLast(self) -> bool:\n        pass\n\n    def getFront(self) -> int:\n        pass\n\n    def getRear(self) -> int:\n        pass\n\n    def isEmpty(self) -> bool:\n        pass\n\n    def isFull(self) -> bool:\n        pass",
            "javascript": "var MyCircularDeque = function(k) {\n    \n};\nMyCircularDeque.prototype.insertFront = function(value) {};\nMyCircularDeque.prototype.insertLast = function(value) {};\nMyCircularDeque.prototype.deleteFront = function() {};\nMyCircularDeque.prototype.deleteLast = function() {};\nMyCircularDeque.prototype.getFront = function() {};\nMyCircularDeque.prototype.getRear = function() {};\nMyCircularDeque.prototype.isEmpty = function() {};\nMyCircularDeque.prototype.isFull = function() {};",
            "java": "class MyCircularDeque {\n    public MyCircularDeque(int k) {}\n    public boolean insertFront(int value) { return false; }\n    public boolean insertLast(int value) { return false; }\n    public boolean deleteFront() { return false; }\n    public boolean deleteLast() { return false; }\n    public int getFront() { return -1; }\n    public int getRear() { return -1; }\n    public boolean isEmpty() { return false; }\n    public boolean isFull() { return false; }\n}",
            "cpp": "class MyCircularDeque {\npublic:\n    MyCircularDeque(int k) {}\n    bool insertFront(int value) { return false; }\n    bool insertLast(int value) { return false; }\n    bool deleteFront() { return false; }\n    bool deleteLast() { return false; }\n    int getFront() { return -1; }\n    int getRear() { return -1; }\n    bool isEmpty() { return false; }\n    bool isFull() { return false; }\n};"
        },
        "test_cases": [
            {"input": "[\"MyCircularDeque\",\"insertLast\",\"insertLast\",\"insertFront\",\"insertFront\",\"getRear\",\"isFull\",\"deleteLast\",\"insertFront\",\"getFront\"]\n[[3],[1],[2],[3],[4],[],[],[],[4],[]]", "expected_output": "[null,true,true,true,false,2,true,true,true,4]", "is_sample": True},
            {"input": "[\"MyCircularDeque\",\"insertFront\",\"getRear\",\"insertLast\",\"getFront\"]\n[[2],[5],[],[7],[]]", "expected_output": "[null,true,5,true,5]", "is_sample": True},
            {"input": "[\"MyCircularDeque\",\"isEmpty\",\"insertFront\",\"isEmpty\",\"deleteFront\",\"isEmpty\"]\n[[1],[],[1],[],[],[]]", "expected_output": "[null,true,true,false,true,true]", "is_sample": False},
        ],
    },
    # ─── 11. Jump Game III ───────────────────────────────────────────────
    {
        "title": "Jump Game III",
        "difficulty": "medium",
        "tags": ["array", "graph"],
        "companies": ["amazon", "google", "uber"],
        "description": "Given an array of non-negative integers `arr` and a start index, check if you can reach any index with value 0. From index `i`, you can jump to `i + arr[i]` or `i - arr[i]`.\n\nExample 1:\nInput: arr = [4,2,3,0,3,1,2], start = 5\nOutput: true\nExplanation: Reach index 3 with value 0: 5->4->1->3.\n\nExample 2:\nInput: arr = [3,0,2,1,2], start = 2\nOutput: false",
        "constraints": "1 <= arr.length <= 5 * 10^4\n0 <= arr[i] < arr.length\n0 <= start < arr.length",
        "hints": "Use BFS or DFS from the start index. Mark visited indices to avoid cycles.",
        "starter_code": {
            "python": "class Solution:\n    def canReach(self, arr: list[int], start: int) -> bool:\n        pass",
            "javascript": "var canReach = function(arr, start) {\n    \n};",
            "java": "class Solution {\n    public boolean canReach(int[] arr, int start) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool canReach(vector<int>& arr, int start) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[4,2,3,0,3,1,2]\n5", "expected_output": "true", "is_sample": True},
            {"input": "[3,0,2,1,2]\n2", "expected_output": "false", "is_sample": True},
            {"input": "[0,1]\n0", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 12. Jump Game IV ────────────────────────────────────────────────
    {
        "title": "Jump Game IV",
        "difficulty": "hard",
        "tags": ["array", "graph", "hash-table"],
        "companies": ["google", "amazon", "bytedance", "microsoft"],
        "description": "Given an array of integers `arr`, you are initially at index 0. In one step you can jump from index `i` to `i+1`, `i-1`, or any index `j` where `arr[i] == arr[j]`. Return the minimum number of steps to reach the last index.\n\nExample 1:\nInput: arr = [100,-23,-23,404,100,23,23,23,3,404]\nOutput: 3\nExplanation: 0 -> 4 -> 3 -> 9.\n\nExample 2:\nInput: arr = [7]\nOutput: 0",
        "constraints": "1 <= arr.length <= 5 * 10^4\n-10^8 <= arr[i] <= 10^8",
        "hints": "Use BFS. Build a graph mapping each value to all its indices. After visiting all indices of a value, clear the list to avoid re-processing.",
        "starter_code": {
            "python": "class Solution:\n    def minJumps(self, arr: list[int]) -> int:\n        pass",
            "javascript": "var minJumps = function(arr) {\n    \n};",
            "java": "class Solution {\n    public int minJumps(int[] arr) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minJumps(vector<int>& arr) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[100,-23,-23,404,100,23,23,23,3,404]", "expected_output": "3", "is_sample": True},
            {"input": "[7]", "expected_output": "0", "is_sample": True},
            {"input": "[7,6,9,6,9,6,9,7]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 13. Jump Game VI ────────────────────────────────────────────────
    {
        "title": "Jump Game VI",
        "difficulty": "medium",
        "tags": ["array", "dynamic-programming", "heap"],
        "companies": ["amazon", "google", "microsoft"],
        "description": "You are given a 0-indexed integer array `nums` and an integer `k`. You start at index 0 and want to reach index `n-1`. In each step you can jump at most `k` steps forward. Your score is the sum of values at all visited indices. Return the maximum score.\n\nExample 1:\nInput: nums = [1,-1,-2,4,-7,3], k = 2\nOutput: 7\nExplanation: Choose indices 0, 1, 3, 5 for total 1+(-1)+4+3 = 7.\n\nExample 2:\nInput: nums = [10,-5,-2,4,0,3], k = 3\nOutput: 17",
        "constraints": "1 <= nums.length, k <= 10^5\n-10^4 <= nums[i] <= 10^4",
        "hints": "Use DP with a sliding window maximum. A monotonic deque can maintain the max of the last k DP values in O(1).",
        "starter_code": {
            "python": "class Solution:\n    def maxResult(self, nums: list[int], k: int) -> int:\n        pass",
            "javascript": "var maxResult = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public int maxResult(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxResult(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,-1,-2,4,-7,3]\n2", "expected_output": "7", "is_sample": True},
            {"input": "[10,-5,-2,4,0,3]\n3", "expected_output": "17", "is_sample": True},
            {"input": "[1,-5,-20,4,-1,3,-6,-3]\n2", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 14. Stone Game II ───────────────────────────────────────────────
    {
        "title": "Stone Game II",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "math"],
        "companies": ["google", "amazon", "adobe"],
        "description": "Alice and Bob play a game with piles of stones arranged in a row. On each turn, a player takes stones from the first `X` remaining piles where `1 <= X <= 2M`, then `M = max(M, X)`. Initially `M = 1`. Alice goes first and both play optimally. Return the maximum number of stones Alice can get.\n\nExample 1:\nInput: piles = [2,7,9,4,4]\nOutput: 10\n\nExample 2:\nInput: piles = [1,2,3,4,5,100]\nOutput: 104",
        "constraints": "1 <= piles.length <= 100\n1 <= piles[i] <= 10^4",
        "hints": "Use suffix sums and memoized recursion with state (index, M). The current player picks X piles and the opponent gets the best of the remainder.",
        "starter_code": {
            "python": "class Solution:\n    def stoneGameII(self, piles: list[int]) -> int:\n        pass",
            "javascript": "var stoneGameII = function(piles) {\n    \n};",
            "java": "class Solution {\n    public int stoneGameII(int[] piles) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int stoneGameII(vector<int>& piles) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,7,9,4,4]", "expected_output": "10", "is_sample": True},
            {"input": "[1,2,3,4,5,100]", "expected_output": "104", "is_sample": True},
            {"input": "[1]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 15. Stone Game III ──────────────────────────────────────────────
    {
        "title": "Stone Game III",
        "difficulty": "hard",
        "tags": ["dynamic-programming"],
        "companies": ["google", "amazon", "bytedance"],
        "description": "Alice and Bob take turns picking 1, 2, or 3 stones from the front of a row of stone piles. Each player tries to maximize their own score. Return \"Alice\" if Alice scores more, \"Bob\" if Bob scores more, or \"Tie\" if equal. Alice goes first.\n\nExample 1:\nInput: stoneValue = [1,2,3,7]\nOutput: \"Bob\"\n\nExample 2:\nInput: stoneValue = [1,2,3,-9]\nOutput: \"Alice\"",
        "constraints": "1 <= stoneValue.length <= 5 * 10^4\n-1000 <= stoneValue[i] <= 1000",
        "hints": "Use DP from the end. dp[i] = max score difference the current player can achieve from index i. Pick 1, 2, or 3 stones and subtract the opponent's best.",
        "starter_code": {
            "python": "class Solution:\n    def stoneGameIII(self, stoneValue: list[int]) -> str:\n        pass",
            "javascript": "var stoneGameIII = function(stoneValue) {\n    \n};",
            "java": "class Solution {\n    public String stoneGameIII(int[] stoneValue) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string stoneGameIII(vector<int>& stoneValue) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,7]", "expected_output": "\"Bob\"", "is_sample": True},
            {"input": "[1,2,3,-9]", "expected_output": "\"Alice\"", "is_sample": True},
            {"input": "[0]", "expected_output": "\"Tie\"", "is_sample": False},
        ],
    },
    # ─── 16. Stone Game IV ───────────────────────────────────────────────
    {
        "title": "Stone Game IV",
        "difficulty": "hard",
        "tags": ["dynamic-programming", "math"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "Alice and Bob take turns. On each turn, a player removes a positive square number of stones. The player who cannot make a move loses. Given `n` stones, return `true` if Alice wins (she goes first), assuming optimal play.\n\nExample 1:\nInput: n = 1\nOutput: true\nExplanation: Alice removes 1 stone and wins.\n\nExample 2:\nInput: n = 2\nOutput: false",
        "constraints": "1 <= n <= 10^5",
        "hints": "Use bottom-up DP. dp[i] = true if the current player can win with i stones. For each perfect square j*j <= i, if dp[i - j*j] is false the current player wins.",
        "starter_code": {
            "python": "class Solution:\n    def winnerSquareGame(self, n: int) -> bool:\n        pass",
            "javascript": "var winnerSquareGame = function(n) {\n    \n};",
            "java": "class Solution {\n    public boolean winnerSquareGame(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool winnerSquareGame(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "1", "expected_output": "true", "is_sample": True},
            {"input": "2", "expected_output": "false", "is_sample": True},
            {"input": "4", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 17. Minimum Cost Tree From Leaf Values ─────────────────────────
    {
        "title": "Minimum Cost Tree From Leaf Values",
        "difficulty": "medium",
        "tags": ["dynamic-programming", "greedy", "stack", "monotonic-stack"],
        "companies": ["amazon", "google", "uber", "bytedance"],
        "description": "Given an array `arr` of positive integers, consider all binary trees such that each leaf value is an element of `arr` (in order) and each non-leaf node's value is the product of the largest leaf in its left and right subtrees. Return the smallest possible sum of non-leaf node values.\n\nExample 1:\nInput: arr = [6,2,4]\nOutput: 32\nExplanation: Two possible trees: cost 6*4+2*4=32 or 6*2+6*4=36. Minimum is 32.\n\nExample 2:\nInput: arr = [4,11]\nOutput: 44",
        "constraints": "2 <= arr.length <= 40\n1 <= arr[i] <= 15",
        "hints": "Use a greedy approach with a monotonic stack. Always combine the two smallest adjacent values first to minimize the cost.",
        "starter_code": {
            "python": "class Solution:\n    def mctFromLeafValues(self, arr: list[int]) -> int:\n        pass",
            "javascript": "var mctFromLeafValues = function(arr) {\n    \n};",
            "java": "class Solution {\n    public int mctFromLeafValues(int[] arr) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int mctFromLeafValues(vector<int>& arr) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[6,2,4]", "expected_output": "32", "is_sample": True},
            {"input": "[4,11]", "expected_output": "44", "is_sample": True},
            {"input": "[6,2,4,8]", "expected_output": "80", "is_sample": False},
        ],
    },
    # ─── 18. 132 Pattern ─────────────────────────────────────────────────
    {
        "title": "132 Pattern",
        "difficulty": "medium",
        "tags": ["stack", "monotonic-stack"],
        "companies": ["amazon", "google", "adobe", "uber"],
        "description": "Given an array of `n` integers `nums`, a 132 pattern is a subsequence `nums[i], nums[j], nums[k]` such that `i < j < k` and `nums[i] < nums[k] < nums[j]`. Return `true` if there is a 132 pattern, otherwise return `false`.\n\nExample 1:\nInput: nums = [1,2,3,4]\nOutput: false\n\nExample 2:\nInput: nums = [3,1,4,2]\nOutput: true\nExplanation: The subsequence [1,4,2] is a 132 pattern.",
        "constraints": "n == nums.length\n1 <= n <= 2 * 10^5\n-10^9 <= nums[i] <= 10^9",
        "hints": "Iterate from right to left using a stack. Track the maximum value popped (this is the '2' in 132). If any element is less than this value, we found a 132 pattern.",
        "starter_code": {
            "python": "class Solution:\n    def find132pattern(self, nums: list[int]) -> bool:\n        pass",
            "javascript": "var find132pattern = function(nums) {\n    \n};",
            "java": "class Solution {\n    public boolean find132pattern(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool find132pattern(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4]", "expected_output": "false", "is_sample": True},
            {"input": "[3,1,4,2]", "expected_output": "true", "is_sample": True},
            {"input": "[-1,3,2,0]", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 19. Sum of Subarray Minimums ────────────────────────────────────
    {
        "title": "Sum of Subarray Minimums",
        "difficulty": "medium",
        "tags": ["array", "stack", "monotonic-stack", "dynamic-programming"],
        "companies": ["amazon", "google", "meta", "bytedance"],
        "description": "Given an array of integers `arr`, find the sum of `min(b)` for every (contiguous) subarray `b` of `arr`. Return the answer modulo 10^9 + 7.\n\nExample 1:\nInput: arr = [3,1,2,4]\nOutput: 17\nExplanation: Subarrays are [3],[1],[2],[4],[3,1],[1,2],[2,4],[3,1,2],[1,2,4],[3,1,2,4]. Minimums are 3,1,2,4,1,1,2,1,1,1. Sum = 17.\n\nExample 2:\nInput: arr = [11,81,94,43,3]\nOutput: 444",
        "constraints": "1 <= arr.length <= 3 * 10^4\n1 <= arr[i] <= 3 * 10^4",
        "hints": "Use a monotonic stack to find for each element the number of subarrays where it is the minimum (left and right boundaries).",
        "starter_code": {
            "python": "class Solution:\n    def sumSubarrayMins(self, arr: list[int]) -> int:\n        pass",
            "javascript": "var sumSubarrayMins = function(arr) {\n    \n};",
            "java": "class Solution {\n    public int sumSubarrayMins(int[] arr) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int sumSubarrayMins(vector<int>& arr) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,1,2,4]", "expected_output": "17", "is_sample": True},
            {"input": "[11,81,94,43,3]", "expected_output": "444", "is_sample": True},
            {"input": "[1,1,1]", "expected_output": "6", "is_sample": False},
        ],
    },
    # ─── 20. Sum of Subarray Ranges ──────────────────────────────────────
    {
        "title": "Sum of Subarray Ranges",
        "difficulty": "medium",
        "tags": ["array", "stack", "monotonic-stack"],
        "companies": ["google", "amazon", "meta"],
        "description": "You are given an integer array `nums`. The range of a subarray is the difference between the largest and smallest element. Return the sum of all subarray ranges.\n\nExample 1:\nInput: nums = [1,2,3]\nOutput: 4\nExplanation: Subarrays: [1]=0, [2]=0, [3]=0, [1,2]=1, [2,3]=1, [1,2,3]=2. Sum = 4.\n\nExample 2:\nInput: nums = [1,3,3]\nOutput: 4",
        "constraints": "1 <= nums.length <= 1000\n-10^9 <= nums[i] <= 10^9",
        "hints": "The answer equals (sum of subarray maximums) - (sum of subarray minimums). Use monotonic stacks to compute each part efficiently.",
        "starter_code": {
            "python": "class Solution:\n    def subArrayRanges(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var subArrayRanges = function(nums) {\n    \n};",
            "java": "class Solution {\n    public long subArrayRanges(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    long long subArrayRanges(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3]", "expected_output": "4", "is_sample": True},
            {"input": "[1,3,3]", "expected_output": "4", "is_sample": True},
            {"input": "[4,-2,-3,4,1]", "expected_output": "59", "is_sample": False},
        ],
    },
    # ─── 21. Split Linked List in Parts ──────────────────────────────────
    {
        "title": "Split Linked List in Parts",
        "difficulty": "medium",
        "tags": ["linked-list"],
        "companies": ["amazon", "google", "meta"],
        "description": "Given the `head` of a singly linked list and an integer `k`, split the linked list into `k` consecutive parts. The length of each part should be as equal as possible. Earlier parts should be no more than one node longer than later parts. Parts should be in order of occurrence and parts occurring earlier should always have a size >= later parts. Return an array of the `k` parts.\n\nExample 1:\nInput: head = [1,2,3], k = 5\nOutput: [[1],[2],[3],[],[]]\n\nExample 2:\nInput: head = [1,2,3,4,5,6,7,8,9,10], k = 3\nOutput: [[1,2,3,4],[5,6,7],[8,9,10]]",
        "constraints": "The number of nodes is in the range [0, 1000].\n0 <= Node.val <= 1000\n1 <= k <= 50",
        "hints": "Find the length of the list. Divide by k to get base size and use modulo for the remainder to distribute extra nodes to earlier parts.",
        "starter_code": {
            "python": "class Solution:\n    def splitListToParts(self, head: Optional[ListNode], k: int) -> list[Optional[ListNode]]:\n        pass",
            "javascript": "var splitListToParts = function(head, k) {\n    \n};",
            "java": "class Solution {\n    public ListNode[] splitListToParts(ListNode head, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<ListNode*> splitListToParts(ListNode* head, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3]\n5", "expected_output": "[[1],[2],[3],[],[]]", "is_sample": True},
            {"input": "[1,2,3,4,5,6,7,8,9,10]\n3", "expected_output": "[[1,2,3,4],[5,6,7],[8,9,10]]", "is_sample": True},
            {"input": "[1,2,3,4]\n2", "expected_output": "[[1,2],[3,4]]", "is_sample": False},
        ],
    },
    # ─── 22. Linked List Components ──────────────────────────────────────
    {
        "title": "Linked List Components",
        "difficulty": "medium",
        "tags": ["linked-list", "hash-table"],
        "companies": ["amazon", "google", "microsoft"],
        "description": "You are given the `head` of a linked list containing unique integer values and an integer array `nums` that is a subset of the linked list values. Return the number of connected components in `nums` where two values are connected if they appear consecutively in the linked list.\n\nExample 1:\nInput: head = [0,1,2,3], nums = [0,1,3]\nOutput: 2\nExplanation: Two components: {0,1} and {3}.\n\nExample 2:\nInput: head = [0,1,2,3,4], nums = [0,3,1,4]\nOutput: 2",
        "constraints": "The number of nodes is n.\n1 <= n <= 10^4\n0 <= Node.val < n\nAll Node.val are unique.\n1 <= nums.length <= n",
        "hints": "Put nums into a set. Traverse the linked list and count the number of times a node in the set is followed by a node not in the set (or is the tail).",
        "starter_code": {
            "python": "class Solution:\n    def numComponents(self, head: Optional[ListNode], nums: list[int]) -> int:\n        pass",
            "javascript": "var numComponents = function(head, nums) {\n    \n};",
            "java": "class Solution {\n    public int numComponents(ListNode head, int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int numComponents(ListNode* head, vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[0,1,2,3]\n[0,1,3]", "expected_output": "2", "is_sample": True},
            {"input": "[0,1,2,3,4]\n[0,3,1,4]", "expected_output": "2", "is_sample": True},
            {"input": "[0,1,2]\n[0,1,2]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 23. Next Greater Node In Linked List ────────────────────────────
    {
        "title": "Next Greater Node In Linked List",
        "difficulty": "medium",
        "tags": ["linked-list", "stack", "monotonic-stack"],
        "companies": ["amazon", "google", "adobe", "uber"],
        "description": "Given the head of a linked list, return an array where `answer[i]` is the value of the next node with a strictly larger value for each node `i`. If there is no such node, `answer[i] = 0`.\n\nExample 1:\nInput: head = [2,1,5]\nOutput: [5,5,0]\n\nExample 2:\nInput: head = [2,7,4,3,5]\nOutput: [7,0,5,5,0]",
        "constraints": "The number of nodes is in the range [1, 10^4].\n1 <= Node.val <= 10^9",
        "hints": "Convert the linked list to an array, then use a monotonic decreasing stack to find the next greater element for each position.",
        "starter_code": {
            "python": "class Solution:\n    def nextLargerNodes(self, head: Optional[ListNode]) -> list[int]:\n        pass",
            "javascript": "var nextLargerNodes = function(head) {\n    \n};",
            "java": "class Solution {\n    public int[] nextLargerNodes(ListNode head) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> nextLargerNodes(ListNode* head) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[2,1,5]", "expected_output": "[5,5,0]", "is_sample": True},
            {"input": "[2,7,4,3,5]", "expected_output": "[7,0,5,5,0]", "is_sample": True},
            {"input": "[1,7,5,1,9,2,5,1]", "expected_output": "[7,9,9,9,0,5,0,0]", "is_sample": False},
        ],
    },
    # ─── 24. Design Front Middle Back Queue ──────────────────────────────
    {
        "title": "Design Front Middle Back Queue",
        "difficulty": "medium",
        "tags": ["design", "linked-list"],
        "companies": ["google", "amazon", "apple"],
        "description": "Design a queue that supports push and pop operations at the front, middle, and back. If there are two middle positions, choose the front-middle position for `pushMiddle` and back-middle for `popMiddle`.\n\nExample:\nInput: [\"FrontMiddleBackQueue\",\"pushFront\",\"pushBack\",\"pushMiddle\",\"pushMiddle\",\"popFront\",\"popMiddle\",\"popMiddle\",\"popBack\",\"popFront\"]\n[[],[1],[2],[3],[4],[],[],[],[],[]]\nOutput: [null,null,null,null,null,1,3,4,2,-1]",
        "constraints": "1 <= val <= 10^9\nAt most 1000 calls will be made to push and pop operations.\nPop operations return -1 if the queue is empty.",
        "hints": "Use two deques (front half and back half) and keep them balanced so the middle is always at the junction.",
        "starter_code": {
            "python": "class FrontMiddleBackQueue:\n    def __init__(self):\n        pass\n\n    def pushFront(self, val: int) -> None:\n        pass\n\n    def pushMiddle(self, val: int) -> None:\n        pass\n\n    def pushBack(self, val: int) -> None:\n        pass\n\n    def popFront(self) -> int:\n        pass\n\n    def popMiddle(self) -> int:\n        pass\n\n    def popBack(self) -> int:\n        pass",
            "javascript": "var FrontMiddleBackQueue = function() {};\nFrontMiddleBackQueue.prototype.pushFront = function(val) {};\nFrontMiddleBackQueue.prototype.pushMiddle = function(val) {};\nFrontMiddleBackQueue.prototype.pushBack = function(val) {};\nFrontMiddleBackQueue.prototype.popFront = function() {};\nFrontMiddleBackQueue.prototype.popMiddle = function() {};\nFrontMiddleBackQueue.prototype.popBack = function() {};",
            "java": "class FrontMiddleBackQueue {\n    public FrontMiddleBackQueue() {}\n    public void pushFront(int val) {}\n    public void pushMiddle(int val) {}\n    public void pushBack(int val) {}\n    public int popFront() { return -1; }\n    public int popMiddle() { return -1; }\n    public int popBack() { return -1; }\n}",
            "cpp": "class FrontMiddleBackQueue {\npublic:\n    FrontMiddleBackQueue() {}\n    void pushFront(int val) {}\n    void pushMiddle(int val) {}\n    void pushBack(int val) {}\n    int popFront() { return -1; }\n    int popMiddle() { return -1; }\n    int popBack() { return -1; }\n};"
        },
        "test_cases": [
            {"input": "[\"FrontMiddleBackQueue\",\"pushFront\",\"pushBack\",\"pushMiddle\",\"pushMiddle\",\"popFront\",\"popMiddle\",\"popMiddle\",\"popBack\",\"popFront\"]\n[[],[1],[2],[3],[4],[],[],[],[],[]]", "expected_output": "[null,null,null,null,null,1,3,4,2,-1]", "is_sample": True},
            {"input": "[\"FrontMiddleBackQueue\",\"pushFront\",\"pushFront\",\"popBack\"]\n[[],[1],[2],[]]", "expected_output": "[null,null,null,1]", "is_sample": True},
            {"input": "[\"FrontMiddleBackQueue\",\"popFront\",\"pushMiddle\",\"popMiddle\"]\n[[],[],[5],[]]", "expected_output": "[null,-1,null,5]", "is_sample": False},
        ],
    },
    # ─── 25. Swapping Nodes in a Linked List ─────────────────────────────
    {
        "title": "Swapping Nodes in a Linked List",
        "difficulty": "medium",
        "tags": ["linked-list", "two-pointers"],
        "companies": ["amazon", "microsoft", "meta"],
        "description": "Given the `head` of a linked list and an integer `k`, return the head after swapping the values of the `k`-th node from the beginning and the `k`-th node from the end (1-indexed).\n\nExample 1:\nInput: head = [1,2,3,4,5], k = 2\nOutput: [1,4,3,2,5]\n\nExample 2:\nInput: head = [7,9,6,6,7,8,3,0,9,5], k = 5\nOutput: [7,9,6,6,8,7,3,0,9,5]",
        "constraints": "The number of nodes is n.\n1 <= k <= n <= 10^5\n0 <= Node.val <= 100",
        "hints": "Use two pointers. Move the first pointer k steps, then start a second pointer from head. When the first reaches the end, the second is at the k-th from end. Swap values.",
        "starter_code": {
            "python": "class Solution:\n    def swapNodes(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:\n        pass",
            "javascript": "var swapNodes = function(head, k) {\n    \n};",
            "java": "class Solution {\n    public ListNode swapNodes(ListNode head, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* swapNodes(ListNode* head, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4,5]\n2", "expected_output": "[1,4,3,2,5]", "is_sample": True},
            {"input": "[7,9,6,6,7,8,3,0,9,5]\n5", "expected_output": "[7,9,6,6,8,7,3,0,9,5]", "is_sample": True},
            {"input": "[1]\n1", "expected_output": "[1]", "is_sample": False},
        ],
    },
    # ─── 26. Merge In Between Linked Lists ───────────────────────────────
    {
        "title": "Merge In Between Linked Lists",
        "difficulty": "medium",
        "tags": ["linked-list"],
        "companies": ["amazon", "microsoft", "adobe"],
        "description": "You are given two linked lists `list1` and `list2`. Remove `list1`'s nodes from the `a`-th node to the `b`-th node, and put `list2` in their place. Return the head of the resulting list.\n\nExample 1:\nInput: list1 = [0,1,2,3,4,5], a = 3, b = 4, list2 = [1000000,1000001,1000002]\nOutput: [0,1,2,1000000,1000001,1000002,5]\n\nExample 2:\nInput: list1 = [0,1,2,3,4,5,6], a = 2, b = 5, list2 = [1000000,1000001,1000002,1000003,1000004]\nOutput: [0,1,1000000,1000001,1000002,1000003,1000004,6]",
        "constraints": "3 <= list1.length <= 10^4\n1 <= a <= b < list1.length - 1\n1 <= list2.length <= 10^4",
        "hints": "Traverse list1 to find the node before position a and the node after position b. Connect them to the head and tail of list2.",
        "starter_code": {
            "python": "class Solution:\n    def mergeInBetween(self, list1: ListNode, a: int, b: int, list2: ListNode) -> ListNode:\n        pass",
            "javascript": "var mergeInBetween = function(list1, a, b, list2) {\n    \n};",
            "java": "class Solution {\n    public ListNode mergeInBetween(ListNode list1, int a, int b, ListNode list2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    ListNode* mergeInBetween(ListNode* list1, int a, int b, ListNode* list2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[0,1,2,3,4,5]\n3\n4\n[1000000,1000001,1000002]", "expected_output": "[0,1,2,1000000,1000001,1000002,5]", "is_sample": True},
            {"input": "[0,1,2,3,4,5,6]\n2\n5\n[1000000,1000001,1000002,1000003,1000004]", "expected_output": "[0,1,1000000,1000001,1000002,1000003,1000004,6]", "is_sample": True},
            {"input": "[0,1,2,3]\n1\n2\n[99]", "expected_output": "[0,99,3]", "is_sample": False},
        ],
    },
    # ─── 27. Minimum Number of Vertices to Reach All Nodes ───────────────
    {
        "title": "Minimum Number of Vertices to Reach All Nodes",
        "difficulty": "medium",
        "tags": ["graph"],
        "companies": ["google", "amazon", "uber"],
        "description": "Given a directed acyclic graph with `n` vertices labeled from 0 to `n-1` and an array of directed edges, find the smallest set of vertices from which all nodes are reachable. It's guaranteed that a unique solution exists.\n\nExample 1:\nInput: n = 6, edges = [[0,1],[0,2],[2,5],[3,4],[4,2]]\nOutput: [0,3]\n\nExample 2:\nInput: n = 5, edges = [[0,1],[2,1],[3,1],[1,4],[2,4]]\nOutput: [0,2,3]",
        "constraints": "2 <= n <= 10^5\n1 <= edges.length <= min(10^5, n*(n-1)/2)\nedges[i].length == 2\nAll pairs (from_i, to_i) are distinct.",
        "hints": "A node must be in the result if and only if it has no incoming edges (in-degree = 0).",
        "starter_code": {
            "python": "class Solution:\n    def findSmallestSetOfVertices(self, n: int, edges: list[list[int]]) -> list[int]:\n        pass",
            "javascript": "var findSmallestSetOfVertices = function(n, edges) {\n    \n};",
            "java": "class Solution {\n    public List<Integer> findSmallestSetOfVertices(int n, List<List<Integer>> edges) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> findSmallestSetOfVertices(int n, vector<vector<int>>& edges) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "6\n[[0,1],[0,2],[2,5],[3,4],[4,2]]", "expected_output": "[0,3]", "is_sample": True},
            {"input": "5\n[[0,1],[2,1],[3,1],[1,4],[2,4]]", "expected_output": "[0,2,3]", "is_sample": True},
            {"input": "3\n[[0,1],[1,2]]", "expected_output": "[0]", "is_sample": False},
        ],
    },
    # ─── 28. Find if Path Exists in Graph ────────────────────────────────
    {
        "title": "Find if Path Exists in Graph",
        "difficulty": "easy",
        "tags": ["graph", "union-find"],
        "companies": ["amazon", "google", "linkedin"],
        "description": "Given a bi-directional graph with `n` vertices labeled 0 to `n-1` and an array of edges, determine if there is a valid path from `source` to `destination`.\n\nExample 1:\nInput: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2\nOutput: true\n\nExample 2:\nInput: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5\nOutput: false",
        "constraints": "1 <= n <= 2 * 10^5\n0 <= edges.length <= 2 * 10^5\n0 <= source, destination <= n - 1",
        "hints": "Use BFS, DFS, or Union-Find. BFS/DFS from source and check if destination is reachable.",
        "starter_code": {
            "python": "class Solution:\n    def validPath(self, n: int, edges: list[list[int]], source: int, destination: int) -> bool:\n        pass",
            "javascript": "var validPath = function(n, edges, source, destination) {\n    \n};",
            "java": "class Solution {\n    public boolean validPath(int n, int[][] edges, int source, int destination) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool validPath(int n, vector<vector<int>>& edges, int source, int destination) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "3\n[[0,1],[1,2],[2,0]]\n0\n2", "expected_output": "true", "is_sample": True},
            {"input": "6\n[[0,1],[0,2],[3,5],[5,4],[4,3]]\n0\n5", "expected_output": "false", "is_sample": True},
            {"input": "1\n[]\n0\n0", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 29. Find Center of Star Graph ───────────────────────────────────
    {
        "title": "Find Center of Star Graph",
        "difficulty": "easy",
        "tags": ["graph"],
        "companies": ["amazon", "microsoft", "apple"],
        "description": "A star graph is an undirected graph where one center node is connected to every other node and there are no other edges. Given the edges of a star graph, return the center node.\n\nExample 1:\nInput: edges = [[1,2],[2,3],[4,2]]\nOutput: 2\n\nExample 2:\nInput: edges = [[1,2],[5,1],[1,3],[1,4]]\nOutput: 1",
        "constraints": "3 <= n <= 10^5\nedges.length == n - 1\nedges[i].length == 2\nThe input represents a valid star graph.",
        "hints": "The center node appears in every edge. Just check the first two edges; the common node is the center.",
        "starter_code": {
            "python": "class Solution:\n    def findCenter(self, edges: list[list[int]]) -> int:\n        pass",
            "javascript": "var findCenter = function(edges) {\n    \n};",
            "java": "class Solution {\n    public int findCenter(int[][] edges) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findCenter(vector<vector<int>>& edges) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,2],[2,3],[4,2]]", "expected_output": "2", "is_sample": True},
            {"input": "[[1,2],[5,1],[1,3],[1,4]]", "expected_output": "1", "is_sample": True},
            {"input": "[[3,1],[3,2],[3,4],[3,5]]", "expected_output": "3", "is_sample": False},
        ],
    },
    # ─── 30. Maximum Total Importance of Roads ───────────────────────────
    {
        "title": "Maximum Total Importance of Roads",
        "difficulty": "medium",
        "tags": ["graph", "greedy", "sorting"],
        "companies": ["google", "amazon", "uber", "lyft"],
        "description": "You are given an integer `n` denoting the number of cities and a 2D array `roads`. Assign values 1 to n to cities. The importance of a road is the sum of the values of the two cities it connects. Return the maximum total importance of all roads.\n\nExample 1:\nInput: n = 5, roads = [[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]]\nOutput: 43\n\nExample 2:\nInput: n = 5, roads = [[0,3],[2,4],[1,3]]\nOutput: 20",
        "constraints": "2 <= n <= 5 * 10^4\n1 <= roads.length <= 5 * 10^4\nroads[i].length == 2\n0 <= a_i, b_i <= n - 1",
        "hints": "Assign higher values to nodes with higher degree. Sort nodes by degree and assign values greedily.",
        "starter_code": {
            "python": "class Solution:\n    def maximumImportance(self, n: int, roads: list[list[int]]) -> int:\n        pass",
            "javascript": "var maximumImportance = function(n, roads) {\n    \n};",
            "java": "class Solution {\n    public long maximumImportance(int n, int[][] roads) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    long long maximumImportance(int n, vector<vector<int>>& roads) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "5\n[[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]]", "expected_output": "43", "is_sample": True},
            {"input": "5\n[[0,3],[2,4],[1,3]]", "expected_output": "20", "is_sample": True},
            {"input": "3\n[[0,1]]", "expected_output": "5", "is_sample": False},
        ],
    },
    # ─── 31. Reachable Nodes With Restrictions ───────────────────────────
    {
        "title": "Reachable Nodes With Restrictions",
        "difficulty": "medium",
        "tags": ["graph"],
        "companies": ["google", "meta", "amazon"],
        "description": "There is an undirected tree with `n` nodes labeled 0 to `n-1` and `n-1` edges. You are also given an array `restricted` containing restricted nodes. Return the maximum number of nodes you can reach from node 0 without visiting any restricted node.\n\nExample 1:\nInput: n = 7, edges = [[0,1],[1,2],[3,1],[4,0],[0,5],[5,6]], restricted = [4,5]\nOutput: 4\nExplanation: Reachable nodes are 0, 1, 2, 3.\n\nExample 2:\nInput: n = 7, edges = [[0,1],[0,2],[0,5],[0,4],[3,2],[6,5]], restricted = [4,2,1]\nOutput: 3",
        "constraints": "2 <= n <= 10^5\nedges.length == n - 1\nrestricted.length < n\nAll values in restricted are unique.",
        "hints": "Build the tree as an adjacency list. BFS/DFS from node 0, skipping restricted nodes.",
        "starter_code": {
            "python": "class Solution:\n    def reachableNodes(self, n: int, edges: list[list[int]], restricted: list[int]) -> int:\n        pass",
            "javascript": "var reachableNodes = function(n, edges, restricted) {\n    \n};",
            "java": "class Solution {\n    public int reachableNodes(int n, int[][] edges, int[] restricted) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int reachableNodes(int n, vector<vector<int>>& edges, vector<int>& restricted) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "7\n[[0,1],[1,2],[3,1],[4,0],[0,5],[5,6]]\n[4,5]", "expected_output": "4", "is_sample": True},
            {"input": "7\n[[0,1],[0,2],[0,5],[0,4],[3,2],[6,5]]\n[4,2,1]", "expected_output": "3", "is_sample": True},
            {"input": "2\n[[0,1]]\n[1]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 32. Maximal Network Rank ────────────────────────────────────────
    {
        "title": "Maximal Network Rank",
        "difficulty": "medium",
        "tags": ["graph"],
        "companies": ["google", "amazon", "microsoft", "meta"],
        "description": "The network rank of two different cities is the total number of directly connected roads to either city. If two cities are directly connected, that road is only counted once. Given `n` cities and an array of `roads`, return the maximal network rank of any pair of different cities.\n\nExample 1:\nInput: n = 4, roads = [[0,1],[0,3],[1,2],[1,3]]\nOutput: 4\n\nExample 2:\nInput: n = 5, roads = [[0,1],[0,3],[1,2],[1,3],[2,3],[2,4]]\nOutput: 5",
        "constraints": "2 <= n <= 100\n0 <= roads.length <= n * (n - 1) / 2\nroads[i].length == 2\nAll pairs of cities are unique.",
        "hints": "Compute the degree of each node and use a set for quick edge lookup. For each pair (i, j), the rank is degree[i] + degree[j] - (1 if connected else 0).",
        "starter_code": {
            "python": "class Solution:\n    def maximalNetworkRank(self, n: int, roads: list[list[int]]) -> int:\n        pass",
            "javascript": "var maximalNetworkRank = function(n, roads) {\n    \n};",
            "java": "class Solution {\n    public int maximalNetworkRank(int n, int[][] roads) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maximalNetworkRank(int n, vector<vector<int>>& roads) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "4\n[[0,1],[0,3],[1,2],[1,3]]", "expected_output": "4", "is_sample": True},
            {"input": "5\n[[0,1],[0,3],[1,2],[1,3],[2,3],[2,4]]", "expected_output": "5", "is_sample": True},
            {"input": "2\n[]", "expected_output": "0", "is_sample": False},
        ],
    },
    # ─── 33. Count Unreachable Pairs of Nodes ────────────────────────────
    {
        "title": "Count Unreachable Pairs of Nodes",
        "difficulty": "medium",
        "tags": ["graph", "union-find"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "Given an integer `n` for the number of nodes in an undirected graph and an array of edges, return the number of pairs of different nodes that are unreachable from each other.\n\nExample 1:\nInput: n = 3, edges = [[0,1],[0,2],[1,2]]\nOutput: 0\n\nExample 2:\nInput: n = 7, edges = [[0,2],[0,5],[2,4],[1,6],[5,4]]\nOutput: 14",
        "constraints": "1 <= n <= 10^5\n0 <= edges.length <= 2 * 10^5",
        "hints": "Find connected component sizes using Union-Find or DFS. For component sizes s1, s2, ..., the answer is total pairs minus pairs within each component.",
        "starter_code": {
            "python": "class Solution:\n    def countPairs(self, n: int, edges: list[list[int]]) -> int:\n        pass",
            "javascript": "var countPairs = function(n, edges) {\n    \n};",
            "java": "class Solution {\n    public long countPairs(int n, int[][] edges) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    long long countPairs(int n, vector<vector<int>>& edges) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "3\n[[0,1],[0,2],[1,2]]", "expected_output": "0", "is_sample": True},
            {"input": "7\n[[0,2],[0,5],[2,4],[1,6],[5,4]]", "expected_output": "14", "is_sample": True},
            {"input": "5\n[]", "expected_output": "10", "is_sample": False},
        ],
    },
    # ─── 34. Longest Cycle in a Graph ────────────────────────────────────
    {
        "title": "Longest Cycle in a Graph",
        "difficulty": "hard",
        "tags": ["graph"],
        "companies": ["google", "amazon", "bytedance", "meta"],
        "description": "You are given a directed graph of `n` nodes where each node has at most one outgoing edge. The graph is represented by a 0-indexed array `edges` where `edges[i]` is the node that node `i` has an edge to, or -1 if there is no outgoing edge. Return the length of the longest cycle in the graph, or -1 if no cycle exists.\n\nExample 1:\nInput: edges = [3,3,4,2,3]\nOutput: 3\nExplanation: The longest cycle is 2 -> 4 -> 3 -> 2 (length 3).\n\nExample 2:\nInput: edges = [2,-1,3,1]\nOutput: -1",
        "constraints": "n == edges.length\n2 <= n <= 10^5\n-1 <= edges[i] < n\nedges[i] != i",
        "hints": "Use a visited array with timestamps. For each unvisited node, follow the chain and record visit times. If you revisit a node from the current traversal, the cycle length is the difference in timestamps.",
        "starter_code": {
            "python": "class Solution:\n    def longestCycle(self, edges: list[int]) -> int:\n        pass",
            "javascript": "var longestCycle = function(edges) {\n    \n};",
            "java": "class Solution {\n    public int longestCycle(int[] edges) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int longestCycle(vector<int>& edges) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[3,3,4,2,3]", "expected_output": "3", "is_sample": True},
            {"input": "[2,-1,3,1]", "expected_output": "-1", "is_sample": True},
            {"input": "[1,2,0,4,5,6,3]", "expected_output": "4", "is_sample": False},
        ],
    },
    # ─── 35. Shortest Path with Alternating Colors ───────────────────────
    {
        "title": "Shortest Path with Alternating Colors",
        "difficulty": "medium",
        "tags": ["graph"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "You are given a directed graph with `n` nodes. Some edges are colored red and others blue. Find the shortest path from node 0 to each node such that the edge colors alternate along the path. Return an array `answer` where `answer[x]` is the shortest such path to node `x`, or -1 if no such path exists.\n\nExample 1:\nInput: n = 3, redEdges = [[0,1],[1,2]], blueEdges = []\nOutput: [0,1,-1]\n\nExample 2:\nInput: n = 3, redEdges = [[0,1]], blueEdges = [[2,1]]\nOutput: [0,1,-1]",
        "constraints": "1 <= n <= 100\n0 <= redEdges.length, blueEdges.length <= 400\nredEdges[i].length == blueEdges[j].length == 2",
        "hints": "Use BFS with state (node, last_color). Start with both colors from node 0. Track the shortest distance to each (node, color) pair.",
        "starter_code": {
            "python": "class Solution:\n    def shortestAlternatingPaths(self, n: int, redEdges: list[list[int]], blueEdges: list[list[int]]) -> list[int]:\n        pass",
            "javascript": "var shortestAlternatingPaths = function(n, redEdges, blueEdges) {\n    \n};",
            "java": "class Solution {\n    public int[] shortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> shortestAlternatingPaths(int n, vector<vector<int>>& redEdges, vector<vector<int>>& blueEdges) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "3\n[[0,1],[1,2]]\n[]", "expected_output": "[0,1,-1]", "is_sample": True},
            {"input": "3\n[[0,1]]\n[[2,1]]", "expected_output": "[0,1,-1]", "is_sample": True},
            {"input": "3\n[[0,1]]\n[[1,2]]", "expected_output": "[0,1,2]", "is_sample": False},
        ],
    },
    # ─── 36. All Ancestors of a Node in a Directed Acyclic Graph ─────────
    {
        "title": "All Ancestors of a Node in a Directed Acyclic Graph",
        "difficulty": "medium",
        "tags": ["graph"],
        "companies": ["google", "amazon", "microsoft", "meta"],
        "description": "Given a DAG with `n` nodes labeled 0 to `n-1` and a list of directed edges, return a list where the i-th element is the sorted list of all ancestors of node `i`.\n\nExample 1:\nInput: n = 8, edgeList = [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]\nOutput: [[],[],[],[0,1],[0,2],[0,1,3],[0,1,2,3,4],[0,1,2,3]]\n\nExample 2:\nInput: n = 5, edgeList = [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]\nOutput: [[],[0],[0,1],[0,1,2],[0,1,2,3]]",
        "constraints": "1 <= n <= 1000\n0 <= edges.length <= min(2000, n*(n-1)/2)\nedges[i].length == 2\nThe graph is a DAG.",
        "hints": "For each node, do a DFS/BFS to find all nodes that can reach it. Alternatively, process nodes in topological order and propagate ancestor sets.",
        "starter_code": {
            "python": "class Solution:\n    def getAncestors(self, n: int, edges: list[list[int]]) -> list[list[int]]:\n        pass",
            "javascript": "var getAncestors = function(n, edges) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> getAncestors(int n, int[][] edges) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> getAncestors(int n, vector<vector<int>>& edges) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "8\n[[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]", "expected_output": "[[],[],[],[0,1],[0,2],[0,1,3],[0,1,2,3,4],[0,1,2,3]]", "is_sample": True},
            {"input": "5\n[[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]", "expected_output": "[[],[0],[0,1],[0,1,2],[0,1,2,3]]", "is_sample": True},
            {"input": "3\n[[0,1],[1,2]]", "expected_output": "[[],[0],[0,1]]", "is_sample": False},
        ],
    },
    # ─── 37. Loud and Rich ───────────────────────────────────────────────
    {
        "title": "Loud and Rich",
        "difficulty": "medium",
        "tags": ["graph"],
        "companies": ["amazon", "google", "palantir"],
        "description": "There are `n` people. `richer[i] = [a, b]` means person `a` has more money than person `b`. `quiet[i]` is the quietness of person `i`. For each person, find the person among all people who are richer or equally rich (including themselves) who is the quietest. Return an array `answer` where `answer[x] = y` means `y` is the quietest person among all who have >= money as person `x`.\n\nExample 1:\nInput: richer = [[1,0],[2,1],[3,1],[3,7],[4,3],[5,3],[6,3]], quiet = [3,2,5,4,6,1,7,0]\nOutput: [5,5,2,5,4,5,6,7]\n\nExample 2:\nInput: richer = [], quiet = [0]\nOutput: [0]",
        "constraints": "n == quiet.length\n1 <= n <= 500\n0 <= quiet[i] < n\nAll values of quiet are unique.\n0 <= richer.length <= n * (n - 1) / 2",
        "hints": "Build a graph where edges go from richer to poorer. DFS from each node and propagate the quietest person found among all richer ancestors.",
        "starter_code": {
            "python": "class Solution:\n    def loudAndRich(self, richer: list[list[int]], quiet: list[int]) -> list[int]:\n        pass",
            "javascript": "var loudAndRich = function(richer, quiet) {\n    \n};",
            "java": "class Solution {\n    public int[] loudAndRich(int[][] richer, int[] quiet) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> loudAndRich(vector<vector<int>>& richer, vector<int>& quiet) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[1,0],[2,1],[3,1],[3,7],[4,3],[5,3],[6,3]]\n[3,2,5,4,6,1,7,0]", "expected_output": "[5,5,2,5,4,5,6,7]", "is_sample": True},
            {"input": "[]\n[0]", "expected_output": "[0]", "is_sample": True},
            {"input": "[[0,1]]\n[1,0]", "expected_output": "[0,1]", "is_sample": False},
        ],
    },
    # ─── 38. Minimum Score of a Path Between Two Cities ──────────────────
    {
        "title": "Minimum Score of a Path Between Two Cities",
        "difficulty": "medium",
        "tags": ["graph", "union-find"],
        "companies": ["google", "amazon", "uber", "lyft"],
        "description": "You are given a positive integer `n` representing `n` cities numbered 1 to `n`, and a 2D array `roads` where `roads[i] = [a, b, distance]`. Find the minimum score of a path between city 1 and city `n`. The score of a path is the minimum distance of any edge in the path. You can visit cities and edges multiple times.\n\nExample 1:\nInput: n = 4, roads = [[1,2,9],[2,3,6],[2,4,5],[1,4,7]]\nOutput: 5\n\nExample 2:\nInput: n = 4, roads = [[1,2,2],[1,3,4],[3,4,7]]\nOutput: 2",
        "constraints": "2 <= n <= 10^5\n1 <= roads.length <= 10^5\nroads[i].length == 3\n1 <= distance <= 10^4\nThere is at least one path between 1 and n.",
        "hints": "Since you can revisit edges, the answer is the minimum edge weight in the entire connected component containing nodes 1 and n. Use BFS/DFS or Union-Find.",
        "starter_code": {
            "python": "class Solution:\n    def minScore(self, n: int, roads: list[list[int]]) -> int:\n        pass",
            "javascript": "var minScore = function(n, roads) {\n    \n};",
            "java": "class Solution {\n    public int minScore(int n, int[][] roads) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minScore(int n, vector<vector<int>>& roads) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "4\n[[1,2,9],[2,3,6],[2,4,5],[1,4,7]]", "expected_output": "5", "is_sample": True},
            {"input": "4\n[[1,2,2],[1,3,4],[3,4,7]]", "expected_output": "2", "is_sample": True},
            {"input": "3\n[[1,2,3],[2,3,1]]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 39. String Without AAA or BBB ───────────────────────────────────
    {
        "title": "String Without AAA or BBB",
        "difficulty": "medium",
        "tags": ["string", "greedy"],
        "companies": ["google", "amazon", "adobe"],
        "description": "Given two integers `a` and `b`, return any string `s` of length `a + b` such that it contains exactly `a` 'a' letters and exactly `b` 'b' letters, and does not contain \"aaa\" or \"bbb\" as a substring.\n\nExample 1:\nInput: a = 1, b = 2\nOutput: \"abb\"\n\nExample 2:\nInput: a = 4, b = 1\nOutput: \"aabaa\"",
        "constraints": "0 <= a, b <= 100\nIt is guaranteed a valid answer exists for the given a and b.",
        "hints": "Greedily append two of the more frequent character, then one of the less frequent, until both are exhausted.",
        "starter_code": {
            "python": "class Solution:\n    def strWithout3a3b(self, a: int, b: int) -> str:\n        pass",
            "javascript": "var strWithout3a3b = function(a, b) {\n    \n};",
            "java": "class Solution {\n    public String strWithout3a3b(int a, int b) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string strWithout3a3b(int a, int b) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "1\n2", "expected_output": "\"bba\"", "is_sample": True},
            {"input": "4\n1", "expected_output": "\"aabaa\"", "is_sample": True},
            {"input": "2\n2", "expected_output": "\"abab\"", "is_sample": False},
        ],
    },
    # ─── 40. Remove Colored Pieces if Both Neighbors are the Same Color ──
    {
        "title": "Remove Colored Pieces if Both Neighbors are the Same Color",
        "difficulty": "medium",
        "tags": ["string", "greedy"],
        "companies": ["google", "meta", "amazon"],
        "description": "There are `n` pieces arranged in a line colored 'A' or 'B'. Alice can remove an 'A' piece if both its neighbors are also 'A'. Bob can remove a 'B' piece if both its neighbors are also 'B'. Alice goes first and they alternate. The player who cannot make a move loses. Return `true` if Alice wins.\n\nExample 1:\nInput: colors = \"AAABABB\"\nOutput: true\nExplanation: Alice removes the middle 'A' from \"AAA\", then Bob cannot move.\n\nExample 2:\nInput: colors = \"AA\"\nOutput: false",
        "constraints": "1 <= colors.length <= 10^5\ncolors consists of only 'A' and 'B'.",
        "hints": "Count the number of moves for Alice and Bob. Alice's moves = number of 'A' triplets (consecutive A's of length k contribute k-2 moves). Alice wins if she has more moves.",
        "starter_code": {
            "python": "class Solution:\n    def winnerOfGame(self, colors: str) -> bool:\n        pass",
            "javascript": "var winnerOfGame = function(colors) {\n    \n};",
            "java": "class Solution {\n    public boolean winnerOfGame(String colors) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool winnerOfGame(string colors) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"AAABABB\"", "expected_output": "true", "is_sample": True},
            {"input": "\"AA\"", "expected_output": "false", "is_sample": True},
            {"input": "\"ABBBBBBBAAA\"", "expected_output": "false", "is_sample": False},
        ],
    },
    # ─── 41. Largest Odd Number in String ────────────────────────────────
    {
        "title": "Largest Odd Number in String",
        "difficulty": "easy",
        "tags": ["string", "greedy", "math"],
        "companies": ["amazon", "google", "adobe", "shopify"],
        "description": "Given a string `num` representing a large integer, return the largest-valued odd integer (as a string) that is a non-empty substring of `num`, or an empty string if no odd integer exists.\n\nExample 1:\nInput: num = \"52\"\nOutput: \"5\"\n\nExample 2:\nInput: num = \"4206\"\nOutput: \"\"",
        "constraints": "1 <= num.length <= 10^5\nnum only consists of digits and does not contain any leading zeros.",
        "hints": "An odd number ends with an odd digit. Find the rightmost odd digit; the answer is the substring from the beginning to that digit (inclusive).",
        "starter_code": {
            "python": "class Solution:\n    def largestOddNumber(self, num: str) -> str:\n        pass",
            "javascript": "var largestOddNumber = function(num) {\n    \n};",
            "java": "class Solution {\n    public String largestOddNumber(String num) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string largestOddNumber(string num) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"52\"", "expected_output": "\"5\"", "is_sample": True},
            {"input": "\"4206\"", "expected_output": "\"\"", "is_sample": True},
            {"input": "\"35427\"", "expected_output": "\"35427\"", "is_sample": False},
        ],
    },
    # ─── 42. Minimum Penalty for a Shop ──────────────────────────────────
    {
        "title": "Minimum Penalty for a Shop",
        "difficulty": "medium",
        "tags": ["string", "greedy"],
        "companies": ["google", "amazon", "meta", "stripe"],
        "description": "You are given the customer visit log of a shop as a string `customers`. The `i`-th character is 'Y' if customers come at the `i`-th hour, or 'N' otherwise. If the shop closes at hour `j`, the penalty is: number of 'Y' at or after hour `j` (missed customers) plus number of 'N' before hour `j` (open with no customers). Return the earliest hour at which the shop must close to incur the minimum penalty.\n\nExample 1:\nInput: customers = \"YYNY\"\nOutput: 2\n\nExample 2:\nInput: customers = \"NNNNN\"\nOutput: 0",
        "constraints": "1 <= customers.length <= 10^5\ncustomers consists only of 'Y' and 'N'.",
        "hints": "Compute penalty for closing at hour 0 (count of all Y's). Then slide from left: if customers[i] == 'Y' penalty decreases by 1, if 'N' it increases by 1. Track the minimum.",
        "starter_code": {
            "python": "class Solution:\n    def bestClosingTime(self, customers: str) -> int:\n        pass",
            "javascript": "var bestClosingTime = function(customers) {\n    \n};",
            "java": "class Solution {\n    public int bestClosingTime(String customers) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int bestClosingTime(string customers) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"YYNY\"", "expected_output": "2", "is_sample": True},
            {"input": "\"NNNNN\"", "expected_output": "0", "is_sample": True},
            {"input": "\"YYYY\"", "expected_output": "4", "is_sample": False},
        ],
    },
    # ─── 43. Break a Palindrome ──────────────────────────────────────────
    {
        "title": "Break a Palindrome",
        "difficulty": "medium",
        "tags": ["string", "greedy"],
        "companies": ["amazon", "google", "meta", "microsoft"],
        "description": "Given a palindromic string of lowercase English letters, replace exactly one character with any lowercase letter so that the resulting string is not a palindrome and is the lexicographically smallest one possible. If there is no way to do so, return an empty string.\n\nExample 1:\nInput: palindrome = \"abccba\"\nOutput: \"aaccba\"\n\nExample 2:\nInput: palindrome = \"a\"\nOutput: \"\"",
        "constraints": "1 <= palindrome.length <= 1000\npalindrome consists of only lowercase English letters.",
        "hints": "For the first half of the string, change the first non-'a' character to 'a'. If all characters in the first half are 'a', change the last character to 'b'.",
        "starter_code": {
            "python": "class Solution:\n    def breakPalindrome(self, palindrome: str) -> str:\n        pass",
            "javascript": "var breakPalindrome = function(palindrome) {\n    \n};",
            "java": "class Solution {\n    public String breakPalindrome(String palindrome) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    string breakPalindrome(string palindrome) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"abccba\"", "expected_output": "\"aaccba\"", "is_sample": True},
            {"input": "\"a\"", "expected_output": "\"\"", "is_sample": True},
            {"input": "\"aba\"", "expected_output": "\"abb\"", "is_sample": False},
        ],
    },
]

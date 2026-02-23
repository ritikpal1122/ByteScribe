"""Batch 7: Greedy, Backtracking, Recursion, Divide and Conquer (~38 with company labels)."""

PROBLEMS_BATCH7 = [
    # ─── 1. Gas Station ────────────────────────────────────────────────────
    {
        "title": "Gas Station",
        "difficulty": "medium",
        "tags": ["greedy"],
        "companies": ["amazon", "microsoft", "google", "uber"],
        "description": "There are `n` gas stations along a circular route, where the amount of gas at the ith station is `gas[i]`. You have a car with an unlimited gas tank and it costs `cost[i]` of gas to travel from the ith station to the next. Return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If a solution exists, it is guaranteed to be unique.\n\nExample 1:\nInput: gas = [1,2,3,4,5], cost = [3,4,5,1,2]\nOutput: 3\n\nExample 2:\nInput: gas = [2,3,4], cost = [3,4,3]\nOutput: -1",
        "constraints": "n == gas.length == cost.length\n1 <= n <= 10^5\n0 <= gas[i], cost[i] <= 10^4",
        "hints": "If total gas >= total cost, a solution exists. Track the current tank; if it drops below 0, restart from the next station.",
        "starter_code": {
            "python": "class Solution:\n    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:\n        pass",
            "javascript": "var canCompleteCircuit = function(gas, cost) {\n    \n};",
            "java": "class Solution {\n    public int canCompleteCircuit(int[] gas, int[] cost) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3,4,5]\n[3,4,5,1,2]", "expected_output": "3", "is_sample": True},
            {"input": "[2,3,4]\n[3,4,3]", "expected_output": "-1", "is_sample": True},
            {"input": "[5,1,2,3,4]\n[4,4,1,5,1]", "expected_output": "4", "is_sample": False},
        ],
    },
    # ─── 2. Assign Cookies ─────────────────────────────────────────────────
    {
        "title": "Assign Cookies",
        "difficulty": "easy",
        "tags": ["greedy", "sorting"],
        "companies": ["amazon", "microsoft"],
        "description": "You are an awesome parent and want to give cookies to your children. Each child `i` has a greed factor `g[i]`, and each cookie `j` has a size `s[j]`. Child `i` is content if `s[j] >= g[i]`. Maximize the number of content children.\n\nExample 1:\nInput: g = [1,2,3], s = [1,1]\nOutput: 1\n\nExample 2:\nInput: g = [1,2], s = [1,2,3]\nOutput: 2",
        "constraints": "1 <= g.length <= 3 * 10^4\n0 <= s.length <= 3 * 10^4\n1 <= g[i], s[j] <= 2^31 - 1",
        "hints": "Sort both arrays. Use two pointers to greedily assign the smallest sufficient cookie to each child.",
        "starter_code": {
            "python": "class Solution:\n    def findContentChildren(self, g: list[int], s: list[int]) -> int:\n        pass",
            "javascript": "var findContentChildren = function(g, s) {\n    \n};",
            "java": "class Solution {\n    public int findContentChildren(int[] g, int[] s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findContentChildren(vector<int>& g, vector<int>& s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3]\n[1,1]", "expected_output": "1", "is_sample": True},
            {"input": "[1,2]\n[1,2,3]", "expected_output": "2", "is_sample": True},
            {"input": "[10,9,8,7]\n[5,6,7,8]", "expected_output": "2", "is_sample": False},
        ],
    },
    # ─── 3. Lemonade Change ────────────────────────────────────────────────
    {
        "title": "Lemonade Change",
        "difficulty": "easy",
        "tags": ["greedy"],
        "companies": ["google", "amazon", "uber"],
        "description": "At a lemonade stand, each lemonade costs $5. Customers queue to buy one and pay with a $5, $10, or $20 bill. You must provide the correct change. Return true if you can provide change to every customer.\n\nExample 1:\nInput: bills = [5,5,5,10,20]\nOutput: true\n\nExample 2:\nInput: bills = [5,5,10,10,20]\nOutput: false",
        "constraints": "1 <= bills.length <= 10^5\nbills[i] is either 5, 10, or 20.",
        "hints": "Track the count of $5 and $10 bills. For $20, prefer giving one $10 + one $5 over three $5 bills.",
        "starter_code": {
            "python": "class Solution:\n    def lemonadeChange(self, bills: list[int]) -> bool:\n        pass",
            "javascript": "var lemonadeChange = function(bills) {\n    \n};",
            "java": "class Solution {\n    public boolean lemonadeChange(int[] bills) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool lemonadeChange(vector<int>& bills) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[5,5,5,10,20]", "expected_output": "true", "is_sample": True},
            {"input": "[5,5,10,10,20]", "expected_output": "false", "is_sample": True},
            {"input": "[5,5,10,20,5,5,5,5,10,5,10,20]", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 4. Queue Reconstruction by Height ─────────────────────────────────
    {
        "title": "Queue Reconstruction by Height",
        "difficulty": "medium",
        "tags": ["greedy", "sorting"],
        "companies": ["google", "meta", "amazon"],
        "description": "You are given an array of people where `people[i] = [hi, ki]` represents the ith person of height `hi` with exactly `ki` other people in front who have a height >= `hi`. Reconstruct and return the queue.\n\nExample 1:\nInput: people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]\nOutput: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]\n\nExample 2:\nInput: people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]\nOutput: [[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]",
        "constraints": "1 <= people.length <= 2000\n0 <= hi <= 10^6\n0 <= ki < people.length",
        "hints": "Sort by height descending (ties broken by k ascending). Then insert each person at index k.",
        "starter_code": {
            "python": "class Solution:\n    def reconstructQueue(self, people: list[list[int]]) -> list[list[int]]:\n        pass",
            "javascript": "var reconstructQueue = function(people) {\n    \n};",
            "java": "class Solution {\n    public int[][] reconstructQueue(int[][] people) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> reconstructQueue(vector<vector<int>>& people) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]", "expected_output": "[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]", "is_sample": True},
            {"input": "[[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]", "expected_output": "[[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]", "is_sample": True},
            {"input": "[[9,0],[7,0],[1,9],[3,0],[2,7],[5,3],[6,0],[3,4],[6,2],[5,2]]", "expected_output": "[[3,0],[6,0],[7,0],[5,2],[3,4],[5,3],[6,2],[2,7],[9,0],[1,9]]", "is_sample": False},
        ],
    },
    # ─── 5. Minimum Number of Arrows to Burst Balloons ─────────────────────
    {
        "title": "Minimum Number of Arrows to Burst Balloons",
        "difficulty": "medium",
        "tags": ["greedy", "intervals"],
        "companies": ["meta", "microsoft", "amazon"],
        "description": "There are spherical balloons taped on a flat wall represented by a 2D array `points` where `points[i] = [xstart, xend]`. An arrow shot vertically at x bursts a balloon if `xstart <= x <= xend`. Return the minimum number of arrows to burst all balloons.\n\nExample 1:\nInput: points = [[10,16],[2,8],[1,6],[7,12]]\nOutput: 2\n\nExample 2:\nInput: points = [[1,2],[3,4],[5,6],[7,8]]\nOutput: 4",
        "constraints": "1 <= points.length <= 10^5\npoints[i].length == 2\n-2^31 <= xstart < xend <= 2^31 - 1",
        "hints": "Sort balloons by end coordinate. Greedily shoot at the end of the first balloon, skipping all overlapping ones.",
        "starter_code": {
            "python": "class Solution:\n    def findMinArrowShots(self, points: list[list[int]]) -> int:\n        pass",
            "javascript": "var findMinArrowShots = function(points) {\n    \n};",
            "java": "class Solution {\n    public int findMinArrowShots(int[][] points) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int findMinArrowShots(vector<vector<int>>& points) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[10,16],[2,8],[1,6],[7,12]]", "expected_output": "2", "is_sample": True},
            {"input": "[[1,2],[3,4],[5,6],[7,8]]", "expected_output": "4", "is_sample": True},
            {"input": "[[1,2],[2,3],[3,4],[4,5]]", "expected_output": "2", "is_sample": False},
        ],
    },
    # ─── 6. Partition Labels ───────────────────────────────────────────────
    {
        "title": "Partition Labels",
        "difficulty": "medium",
        "tags": ["greedy", "string"],
        "companies": ["amazon", "google", "meta"],
        "description": "You are given a string `s`. Partition the string into as many parts as possible so that each letter appears in at most one part. Return a list of integers representing the size of these parts.\n\nExample 1:\nInput: s = \"ababcbacadefegdehijhklij\"\nOutput: [9,7,8]\n\nExample 2:\nInput: s = \"eccbbbbdec\"\nOutput: [10]",
        "constraints": "1 <= s.length <= 500\ns consists of lowercase English letters.",
        "hints": "Record the last occurrence of each character. Iterate and extend the current partition end to the farthest last occurrence seen so far.",
        "starter_code": {
            "python": "class Solution:\n    def partitionLabels(self, s: str) -> list[int]:\n        pass",
            "javascript": "var partitionLabels = function(s) {\n    \n};",
            "java": "class Solution {\n    public List<Integer> partitionLabels(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> partitionLabels(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"ababcbacadefegdehijhklij\"", "expected_output": "[9,7,8]", "is_sample": True},
            {"input": "\"eccbbbbdec\"", "expected_output": "[10]", "is_sample": True},
            {"input": "\"abcabc\"", "expected_output": "[6]", "is_sample": False},
        ],
    },
    # ─── 7. Non-decreasing Array ───────────────────────────────────────────
    {
        "title": "Non-decreasing Array",
        "difficulty": "medium",
        "tags": ["greedy"],
        "companies": ["google", "amazon", "uber"],
        "description": "Given an array `nums` with `n` integers, check if it could become non-decreasing by modifying at most one element.\n\nExample 1:\nInput: nums = [4,2,3]\nOutput: true\nExplanation: You could modify the first 4 to 1 to get a non-decreasing array.\n\nExample 2:\nInput: nums = [4,2,1]\nOutput: false",
        "constraints": "n == nums.length\n1 <= n <= 10^4\n-10^5 <= nums[i] <= 10^5",
        "hints": "When you find nums[i] > nums[i+1], decide whether to lower nums[i] or raise nums[i+1] based on nums[i-1].",
        "starter_code": {
            "python": "class Solution:\n    def checkPossibility(self, nums: list[int]) -> bool:\n        pass",
            "javascript": "var checkPossibility = function(nums) {\n    \n};",
            "java": "class Solution {\n    public boolean checkPossibility(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool checkPossibility(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[4,2,3]", "expected_output": "true", "is_sample": True},
            {"input": "[4,2,1]", "expected_output": "false", "is_sample": True},
            {"input": "[3,4,2,3]", "expected_output": "false", "is_sample": False},
        ],
    },
    # ─── 8. Candy ──────────────────────────────────────────────────────────
    {
        "title": "Candy",
        "difficulty": "hard",
        "tags": ["greedy"],
        "companies": ["google", "amazon", "microsoft", "uber"],
        "description": "There are `n` children standing in a line. Each child has a rating value given in `ratings`. You are giving candies with these rules: each child must have at least one candy, and children with a higher rating than a neighbor must get more candies. Return the minimum number of candies needed.\n\nExample 1:\nInput: ratings = [1,0,2]\nOutput: 5\nExplanation: Give [2,1,2] candies respectively.\n\nExample 2:\nInput: ratings = [1,2,2]\nOutput: 4\nExplanation: Give [1,2,1] candies. The third child gets 1 because it satisfies both conditions.",
        "constraints": "n == ratings.length\n1 <= n <= 2 * 10^4\n0 <= ratings[i] <= 2 * 10^4",
        "hints": "Do two passes: left-to-right ensuring right neighbor > left neighbor gets more candy, then right-to-left for the opposite. Take the max at each position.",
        "starter_code": {
            "python": "class Solution:\n    def candy(self, ratings: list[int]) -> int:\n        pass",
            "javascript": "var candy = function(ratings) {\n    \n};",
            "java": "class Solution {\n    public int candy(int[] ratings) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int candy(vector<int>& ratings) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,0,2]", "expected_output": "5", "is_sample": True},
            {"input": "[1,2,2]", "expected_output": "4", "is_sample": True},
            {"input": "[1,3,2,2,1]", "expected_output": "7", "is_sample": False},
        ],
    },
    # ─── 9. Minimum Number of Refueling Stops ──────────────────────────────
    {
        "title": "Minimum Number of Refueling Stops",
        "difficulty": "hard",
        "tags": ["greedy", "heap"],
        "companies": ["google", "amazon", "uber", "lyft"],
        "description": "A car starts at position 0 with `startFuel` liters. It drives to `target` miles away. Along the way there are gas stations at `stations[i] = [position_i, fuel_i]`. The car uses one liter per mile. Return the minimum number of refueling stops to reach the target, or -1 if impossible.\n\nExample 1:\nInput: target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]\nOutput: 2\n\nExample 2:\nInput: target = 1, startFuel = 1, stations = []\nOutput: 0",
        "constraints": "1 <= target, startFuel <= 10^9\n0 <= stations.length <= 500\n1 <= position_i < target\n1 <= fuel_i < 10^9",
        "hints": "Use a max-heap. As you pass stations, add their fuel to the heap. When you run out, pop the largest fuel from the heap.",
        "starter_code": {
            "python": "class Solution:\n    def minRefuelStops(self, target: int, startFuel: int, stations: list[list[int]]) -> int:\n        pass",
            "javascript": "var minRefuelStops = function(target, startFuel, stations) {\n    \n};",
            "java": "class Solution {\n    public int minRefuelStops(int target, int startFuel, int[][] stations) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int minRefuelStops(int target, int startFuel, vector<vector<int>>& stations) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "100\n10\n[[10,60],[20,30],[30,30],[60,40]]", "expected_output": "2", "is_sample": True},
            {"input": "1\n1\n[]", "expected_output": "0", "is_sample": True},
            {"input": "100\n50\n[[25,25],[50,50]]", "expected_output": "1", "is_sample": False},
        ],
    },
    # ─── 10. Wiggle Subsequence ────────────────────────────────────────────
    {
        "title": "Wiggle Subsequence",
        "difficulty": "medium",
        "tags": ["greedy", "dynamic-programming"],
        "companies": ["amazon", "google"],
        "description": "A wiggle sequence is one where the differences between successive numbers alternate between positive and negative. A sequence with one element or two non-equal elements is trivially a wiggle sequence. Given an integer array `nums`, return the length of the longest wiggle subsequence.\n\nExample 1:\nInput: nums = [1,7,4,9,2,5]\nOutput: 6\n\nExample 2:\nInput: nums = [1,17,5,10,13,15,10,5,16,8]\nOutput: 7",
        "constraints": "1 <= nums.length <= 1000\n0 <= nums[i] <= 1000",
        "hints": "Track the count of peaks and valleys. When the direction changes, increment the length.",
        "starter_code": {
            "python": "class Solution:\n    def wiggleMaxLength(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var wiggleMaxLength = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int wiggleMaxLength(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int wiggleMaxLength(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,7,4,9,2,5]", "expected_output": "6", "is_sample": True},
            {"input": "[1,17,5,10,13,15,10,5,16,8]", "expected_output": "7", "is_sample": True},
            {"input": "[1,2,3,4,5]", "expected_output": "2", "is_sample": False},
        ],
    },
    # ─── 11. Boats to Save People ──────────────────────────────────────────
    {
        "title": "Boats to Save People",
        "difficulty": "medium",
        "tags": ["greedy"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "You are given an array `people` where `people[i]` is the weight of the ith person, and a `limit` which is the max weight a boat can carry. Each boat carries at most two people at the same time. Return the minimum number of boats to carry every person.\n\nExample 1:\nInput: people = [1,2], limit = 3\nOutput: 1\n\nExample 2:\nInput: people = [3,2,2,1], limit = 3\nOutput: 3",
        "constraints": "1 <= people.length <= 5 * 10^4\n1 <= people[i] <= limit <= 3 * 10^4",
        "hints": "Sort the array. Use two pointers from both ends. Pair the lightest with the heaviest if they fit.",
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
    # ─── 12. Bag of Tokens ─────────────────────────────────────────────────
    {
        "title": "Bag of Tokens",
        "difficulty": "medium",
        "tags": ["greedy", "sorting"],
        "companies": ["amazon", "adobe", "google"],
        "description": "You start with an initial power `power` and score of 0, and a bag of tokens where `tokens[i]` is the value of the ith token. You can play face-up (lose `tokens[i]` power, gain 1 score) or face-down (gain `tokens[i]` power, lose 1 score) in any order any number of times. Return the maximum score achievable.\n\nExample 1:\nInput: tokens = [100], power = 50\nOutput: 0\n\nExample 2:\nInput: tokens = [200,100], power = 150\nOutput: 1",
        "constraints": "0 <= tokens.length <= 1000\n0 <= tokens[i], power < 10^4",
        "hints": "Sort tokens. Use cheapest tokens to gain score (face-up) and most expensive tokens to gain power (face-down).",
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
    # ─── 13. N-Queens ──────────────────────────────────────────────────────
    {
        "title": "N-Queens",
        "difficulty": "hard",
        "tags": ["backtracking"],
        "companies": ["google", "amazon", "meta", "microsoft"],
        "description": "The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other. Given an integer `n`, return all distinct solutions. Each solution is a board configuration represented as a list of strings, where 'Q' indicates a queen and '.' an empty space.\n\nExample 1:\nInput: n = 4\nOutput: [[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]\n\nExample 2:\nInput: n = 1\nOutput: [[\"Q\"]]",
        "constraints": "1 <= n <= 9",
        "hints": "Use backtracking row by row. Track columns and diagonals (row-col, row+col) that are already occupied.",
        "starter_code": {
            "python": "class Solution:\n    def solveNQueens(self, n: int) -> list[list[str]]:\n        pass",
            "javascript": "var solveNQueens = function(n) {\n    \n};",
            "java": "class Solution {\n    public List<List<String>> solveNQueens(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "4", "expected_output": "[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]", "is_sample": True},
            {"input": "1", "expected_output": "[[\"Q\"]]", "is_sample": True},
            {"input": "5", "expected_output": "10", "is_sample": False},
        ],
    },
    # ─── 14. N-Queens II ───────────────────────────────────────────────────
    {
        "title": "N-Queens II",
        "difficulty": "hard",
        "tags": ["backtracking"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other. Given an integer `n`, return the number of distinct solutions.\n\nExample 1:\nInput: n = 4\nOutput: 2\n\nExample 2:\nInput: n = 1\nOutput: 1",
        "constraints": "1 <= n <= 9",
        "hints": "Same backtracking as N-Queens but only count solutions instead of building board strings.",
        "starter_code": {
            "python": "class Solution:\n    def totalNQueens(self, n: int) -> int:\n        pass",
            "javascript": "var totalNQueens = function(n) {\n    \n};",
            "java": "class Solution {\n    public int totalNQueens(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int totalNQueens(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "4", "expected_output": "2", "is_sample": True},
            {"input": "1", "expected_output": "1", "is_sample": True},
            {"input": "8", "expected_output": "92", "is_sample": False},
        ],
    },
    # ─── 15. Sudoku Solver ─────────────────────────────────────────────────
    {
        "title": "Sudoku Solver",
        "difficulty": "hard",
        "tags": ["backtracking"],
        "companies": ["google", "amazon", "microsoft", "apple"],
        "description": "Write a program to solve a Sudoku puzzle by filling the empty cells (represented by '.'). A valid sudoku solution must satisfy: each digit 1-9 appears exactly once in each row, column, and 3x3 sub-box.\n\nExample:\nInput: board with some cells filled and '.' for empty\nOutput: the completed board (modify in-place)",
        "constraints": "board.length == 9\nboard[i].length == 9\nboard[i][j] is a digit or '.'\nThe input board has exactly one solution.",
        "hints": "Backtrack cell by cell. For each empty cell, try digits 1-9 and check row, column, and box constraints.",
        "starter_code": {
            "python": "class Solution:\n    def solveSudoku(self, board: list[list[str]]) -> None:\n        pass",
            "javascript": "var solveSudoku = function(board) {\n    \n};",
            "java": "class Solution {\n    public void solveSudoku(char[][] board) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    void solveSudoku(vector<vector<char>>& board) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]", "expected_output": "[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"],[\"6\",\"7\",\"2\",\"1\",\"9\",\"5\",\"3\",\"4\",\"8\"],[\"1\",\"9\",\"8\",\"3\",\"4\",\"2\",\"5\",\"6\",\"7\"],[\"8\",\"5\",\"9\",\"7\",\"6\",\"1\",\"4\",\"2\",\"3\"],[\"4\",\"2\",\"6\",\"8\",\"5\",\"3\",\"7\",\"9\",\"1\"],[\"7\",\"1\",\"3\",\"9\",\"2\",\"4\",\"8\",\"5\",\"6\"],[\"9\",\"6\",\"1\",\"5\",\"3\",\"7\",\"2\",\"8\",\"4\"],[\"2\",\"8\",\"7\",\"4\",\"1\",\"9\",\"6\",\"3\",\"5\"],[\"3\",\"4\",\"5\",\"2\",\"8\",\"6\",\"1\",\"7\",\"9\"]]", "is_sample": True},
            {"input": "[[\".\",\".\",\"9\",\"7\",\"4\",\"8\",\".\",\".\",\".\"],[\"7\",\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\"],[\".\",\"2\",\".\",\"1\",\".\",\"9\",\".\",\".\",\".\"],[\".\",\".\",\"7\",\".\",\".\",\".\",\"2\",\"4\",\".\"],[\".\",\"6\",\"4\",\".\",\"1\",\".\",\"5\",\"9\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\"3\",\".\",\".\"],[\".\",\".\",\".\",\"8\",\".\",\"3\",\".\",\"2\",\".\"],[\".\",\".\",\".\",\".\",\".\",\".\",\".\",\".\",\"6\"],[\".\",\".\",\".\",\"2\",\"7\",\"5\",\"9\",\".\",\".\"]]", "expected_output": "[[\"5\",\"1\",\"9\",\"7\",\"4\",\"8\",\"6\",\"3\",\"2\"],[\"7\",\"8\",\"3\",\"6\",\"5\",\"2\",\"4\",\"1\",\"9\"],[\"4\",\"2\",\"6\",\"1\",\"3\",\"9\",\"8\",\"7\",\"5\"],[\"3\",\"5\",\"7\",\"9\",\"8\",\"6\",\"2\",\"4\",\"1\"],[\"2\",\"6\",\"4\",\"3\",\"1\",\"7\",\"5\",\"9\",\"8\"],[\"1\",\"9\",\"8\",\"5\",\"2\",\"4\",\"3\",\"6\",\"7\"],[\"9\",\"7\",\"5\",\"8\",\"6\",\"3\",\"1\",\"2\",\"4\"],[\"8\",\"3\",\"2\",\"4\",\"9\",\"1\",\"7\",\"5\",\"6\"],[\"6\",\"4\",\"1\",\"2\",\"7\",\"5\",\"9\",\"8\",\"3\"]]", "is_sample": True},
            {"input": "[[\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\",\"3\"],[\"3\",\".\",\".\",\".\",\".\",\"5\",\"4\",\".\",\"1\"],[\".\",\".\",\"1\",\".\",\".\",\"3\",\"9\",\"8\",\".\"],[\".\",\".\",\".\",\".\",\".\",\".\",\".\",\"9\",\".\"],[\".\",\".\",\".\",\"5\",\"3\",\"8\",\".\",\".\",\".\"],[\".\",\"3\",\".\",\".\",\".\",\".\",\".\",\".\",\".\"],[\".\",\"2\",\"6\",\"3\",\".\",\".\",\"5\",\".\",\".\"],[\"5\",\".\",\"3\",\"7\",\".\",\".\",\".\",\".\",\"8\"],[\"4\",\"7\",\".\",\".\",\".\",\"1\",\".\",\".\",\".\"]]", "expected_output": "[[\"8\",\"5\",\"4\",\"2\",\"1\",\"9\",\"7\",\"6\",\"3\"],[\"3\",\"9\",\"7\",\"8\",\"6\",\"5\",\"4\",\"2\",\"1\"],[\"2\",\"6\",\"1\",\"4\",\"7\",\"3\",\"9\",\"8\",\"5\"],[\"7\",\"8\",\"5\",\"1\",\"2\",\"6\",\"3\",\"9\",\"4\"],[\"6\",\"4\",\"9\",\"5\",\"3\",\"8\",\"1\",\"7\",\"2\"],[\"1\",\"3\",\"2\",\"9\",\"4\",\"7\",\"8\",\"5\",\"6\"],[\"9\",\"2\",\"6\",\"3\",\"8\",\"4\",\"5\",\"1\",\"7\"],[\"5\",\"1\",\"3\",\"7\",\"9\",\"2\",\"6\",\"4\",\"8\"],[\"4\",\"7\",\"8\",\"6\",\"5\",\"1\",\"2\",\"3\",\"9\"]]", "is_sample": False},
        ],
    },
    # ─── 16. Palindrome Partitioning ───────────────────────────────────────
    {
        "title": "Palindrome Partitioning",
        "difficulty": "medium",
        "tags": ["backtracking", "string"],
        "companies": ["amazon", "google", "meta"],
        "description": "Given a string `s`, partition `s` such that every substring of the partition is a palindrome. Return all possible palindrome partitionings of `s`.\n\nExample 1:\nInput: s = \"aab\"\nOutput: [[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]\n\nExample 2:\nInput: s = \"a\"\nOutput: [[\"a\"]]",
        "constraints": "1 <= s.length <= 16\ns contains only lowercase English letters.",
        "hints": "Backtrack by trying every prefix that is a palindrome, then recursing on the remaining suffix.",
        "starter_code": {
            "python": "class Solution:\n    def partition(self, s: str) -> list[list[str]]:\n        pass",
            "javascript": "var partition = function(s) {\n    \n};",
            "java": "class Solution {\n    public List<List<String>> partition(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<string>> partition(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"aab\"", "expected_output": "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]", "is_sample": True},
            {"input": "\"a\"", "expected_output": "[[\"a\"]]", "is_sample": True},
            {"input": "\"aba\"", "expected_output": "[[\"a\",\"b\",\"a\"],[\"aba\"]]", "is_sample": False},
        ],
    },
    # ─── 17. Combination Sum II ────────────────────────────────────────────
    {
        "title": "Combination Sum II",
        "difficulty": "medium",
        "tags": ["backtracking"],
        "companies": ["amazon", "microsoft", "adobe"],
        "description": "Given a collection of candidate numbers `candidates` and a target number `target`, find all unique combinations where the candidate numbers sum to `target`. Each number may only be used once. The solution set must not contain duplicate combinations.\n\nExample 1:\nInput: candidates = [10,1,2,7,6,1,5], target = 8\nOutput: [[1,1,6],[1,2,5],[1,7],[2,6]]\n\nExample 2:\nInput: candidates = [2,5,2,1,2], target = 5\nOutput: [[1,2,2],[5]]",
        "constraints": "1 <= candidates.length <= 100\n1 <= candidates[i] <= 50\n1 <= target <= 30",
        "hints": "Sort candidates. Skip duplicates at the same recursion level to avoid duplicate combinations.",
        "starter_code": {
            "python": "class Solution:\n    def combinationSum2(self, candidates: list[int], target: int) -> list[list[int]]:\n        pass",
            "javascript": "var combinationSum2 = function(candidates, target) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> combinationSum2(int[] candidates, int target) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[10,1,2,7,6,1,5]\n8", "expected_output": "[[1,1,6],[1,2,5],[1,7],[2,6]]", "is_sample": True},
            {"input": "[2,5,2,1,2]\n5", "expected_output": "[[1,2,2],[5]]", "is_sample": True},
            {"input": "[1,1,1,1,1]\n3", "expected_output": "[[1,1,1]]", "is_sample": False},
        ],
    },
    # ─── 18. Combination Sum III ───────────────────────────────────────────
    {
        "title": "Combination Sum III",
        "difficulty": "medium",
        "tags": ["backtracking"],
        "companies": ["microsoft", "amazon", "apple"],
        "description": "Find all valid combinations of `k` numbers that sum up to `n` such that: only numbers 1 through 9 are used, and each number is used at most once. Return a list of all possible valid combinations.\n\nExample 1:\nInput: k = 3, n = 7\nOutput: [[1,2,4]]\n\nExample 2:\nInput: k = 3, n = 9\nOutput: [[1,2,6],[1,3,5],[2,3,4]]",
        "constraints": "2 <= k <= 9\n1 <= n <= 60",
        "hints": "Backtrack choosing numbers 1-9 in increasing order. Prune when remaining sum is negative or not enough numbers left.",
        "starter_code": {
            "python": "class Solution:\n    def combinationSum3(self, k: int, n: int) -> list[list[int]]:\n        pass",
            "javascript": "var combinationSum3 = function(k, n) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> combinationSum3(int k, int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> combinationSum3(int k, int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "3\n7", "expected_output": "[[1,2,4]]", "is_sample": True},
            {"input": "3\n9", "expected_output": "[[1,2,6],[1,3,5],[2,3,4]]", "is_sample": True},
            {"input": "2\n18", "expected_output": "[]", "is_sample": False},
        ],
    },
    # ─── 19. Subsets ───────────────────────────────────────────────────────
    {
        "title": "Subsets",
        "difficulty": "medium",
        "tags": ["backtracking"],
        "companies": ["meta", "amazon", "google", "microsoft"],
        "description": "Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.\n\nExample 1:\nInput: nums = [1,2,3]\nOutput: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]\n\nExample 2:\nInput: nums = [0]\nOutput: [[],[0]]",
        "constraints": "1 <= nums.length <= 10\n-10 <= nums[i] <= 10\nAll the numbers of nums are unique.",
        "hints": "For each element, decide to include it or not. Backtrack through all possibilities.",
        "starter_code": {
            "python": "class Solution:\n    def subsets(self, nums: list[int]) -> list[list[int]]:\n        pass",
            "javascript": "var subsets = function(nums) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,3]", "expected_output": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]", "is_sample": True},
            {"input": "[0]", "expected_output": "[[],[0]]", "is_sample": True},
            {"input": "[1,2]", "expected_output": "[[],[1],[2],[1,2]]", "is_sample": False},
        ],
    },
    # ─── 20. Subsets II ────────────────────────────────────────────────────
    {
        "title": "Subsets II",
        "difficulty": "medium",
        "tags": ["backtracking"],
        "companies": ["meta", "amazon", "shopify"],
        "description": "Given an integer array `nums` that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.\n\nExample 1:\nInput: nums = [1,2,2]\nOutput: [[],[1],[1,2],[1,2,2],[2],[2,2]]\n\nExample 2:\nInput: nums = [0]\nOutput: [[],[0]]",
        "constraints": "1 <= nums.length <= 10\n-10 <= nums[i] <= 10",
        "hints": "Sort the array first. During backtracking, skip duplicates at the same level to avoid duplicate subsets.",
        "starter_code": {
            "python": "class Solution:\n    def subsetsWithDup(self, nums: list[int]) -> list[list[int]]:\n        pass",
            "javascript": "var subsetsWithDup = function(nums) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> subsetsWithDup(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> subsetsWithDup(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,2,2]", "expected_output": "[[],[1],[1,2],[1,2,2],[2],[2,2]]", "is_sample": True},
            {"input": "[0]", "expected_output": "[[],[0]]", "is_sample": True},
            {"input": "[4,4,4,1,4]", "expected_output": "[[],[1],[1,4],[1,4,4],[1,4,4,4],[1,4,4,4,4],[4],[4,4],[4,4,4],[4,4,4,4]]", "is_sample": False},
        ],
    },
    # ─── 21. Permutations ──────────────────────────────────────────────────
    {
        "title": "Permutations",
        "difficulty": "medium",
        "tags": ["backtracking"],
        "companies": ["meta", "amazon", "microsoft", "google"],
        "description": "Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.\n\nExample 1:\nInput: nums = [1,2,3]\nOutput: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\n\nExample 2:\nInput: nums = [0,1]\nOutput: [[0,1],[1,0]]",
        "constraints": "1 <= nums.length <= 6\n-10 <= nums[i] <= 10\nAll the integers of nums are unique.",
        "hints": "Backtrack by swapping elements into the current position, or use a visited set to build permutations incrementally.",
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
    # ─── 22. Permutations II ───────────────────────────────────────────────
    {
        "title": "Permutations II",
        "difficulty": "medium",
        "tags": ["backtracking"],
        "companies": ["meta", "amazon", "linkedin"],
        "description": "Given a collection of numbers `nums` that might contain duplicates, return all possible unique permutations in any order.\n\nExample 1:\nInput: nums = [1,1,2]\nOutput: [[1,1,2],[1,2,1],[2,1,1]]\n\nExample 2:\nInput: nums = [1,2,3]\nOutput: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
        "constraints": "1 <= nums.length <= 8\n-10 <= nums[i] <= 10",
        "hints": "Sort the array. Use a counter or visited array. Skip a number if the same number was used and backtracked at this level.",
        "starter_code": {
            "python": "class Solution:\n    def permuteUnique(self, nums: list[int]) -> list[list[int]]:\n        pass",
            "javascript": "var permuteUnique = function(nums) {\n    \n};",
            "java": "class Solution {\n    public List<List<Integer>> permuteUnique(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<vector<int>> permuteUnique(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,1,2]", "expected_output": "[[1,1,2],[1,2,1],[2,1,1]]", "is_sample": True},
            {"input": "[1,2,3]", "expected_output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]", "is_sample": True},
            {"input": "[2,2,1,1]", "expected_output": "[[1,1,2,2],[1,2,1,2],[1,2,2,1],[2,1,1,2],[2,1,2,1],[2,2,1,1]]", "is_sample": False},
        ],
    },
    # ─── 23. Letter Combinations of a Phone Number ─────────────────────────
    {
        "title": "Letter Combinations of a Phone Number",
        "difficulty": "medium",
        "tags": ["backtracking", "string"],
        "companies": ["amazon", "meta", "google", "uber"],
        "description": "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent (like on a telephone keypad). Return the answer in any order.\n\nExample 1:\nInput: digits = \"23\"\nOutput: [\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]\n\nExample 2:\nInput: digits = \"\"\nOutput: []",
        "constraints": "0 <= digits.length <= 4\ndigits[i] is a digit in the range ['2', '9'].",
        "hints": "Map each digit to its letters. Backtrack through each digit, appending one letter at a time.",
        "starter_code": {
            "python": "class Solution:\n    def letterCombinations(self, digits: str) -> list[str]:\n        pass",
            "javascript": "var letterCombinations = function(digits) {\n    \n};",
            "java": "class Solution {\n    public List<String> letterCombinations(String digits) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<string> letterCombinations(string digits) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"23\"", "expected_output": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]", "is_sample": True},
            {"input": "\"\"", "expected_output": "[]", "is_sample": True},
            {"input": "\"2\"", "expected_output": "[\"a\",\"b\",\"c\"]", "is_sample": False},
        ],
    },
    # ─── 24. Generate Parentheses ──────────────────────────────────────────
    {
        "title": "Generate Parentheses",
        "difficulty": "medium",
        "tags": ["backtracking", "string"],
        "companies": ["google", "amazon", "meta", "microsoft"],
        "description": "Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n\nExample 1:\nInput: n = 3\nOutput: [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]\n\nExample 2:\nInput: n = 1\nOutput: [\"()\"]",
        "constraints": "1 <= n <= 8",
        "hints": "Backtrack keeping counts of open and close parens used. Add '(' if open < n, add ')' if close < open.",
        "starter_code": {
            "python": "class Solution:\n    def generateParenthesis(self, n: int) -> list[str]:\n        pass",
            "javascript": "var generateParenthesis = function(n) {\n    \n};",
            "java": "class Solution {\n    public List<String> generateParenthesis(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<string> generateParenthesis(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "3", "expected_output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]", "is_sample": True},
            {"input": "1", "expected_output": "[\"()\"]", "is_sample": True},
            {"input": "2", "expected_output": "[\"(())\",\"()()\"]", "is_sample": False},
        ],
    },
    # ─── 25. Restore IP Addresses ──────────────────────────────────────────
    {
        "title": "Restore IP Addresses",
        "difficulty": "medium",
        "tags": ["backtracking", "string"],
        "companies": ["amazon", "microsoft", "uber", "snap"],
        "description": "Given a string `s` containing only digits, return all possible valid IP addresses that can be formed by inserting dots into `s`. A valid IP address consists of exactly four integers (0-255) separated by dots, with no leading zeros.\n\nExample 1:\nInput: s = \"25525511135\"\nOutput: [\"255.255.11.135\",\"255.255.111.35\"]\n\nExample 2:\nInput: s = \"0000\"\nOutput: [\"0.0.0.0\"]",
        "constraints": "1 <= s.length <= 20\ns consists of digits only.",
        "hints": "Backtrack by choosing 1-3 digits for each part. Validate each part is 0-255 with no leading zeros.",
        "starter_code": {
            "python": "class Solution:\n    def restoreIpAddresses(self, s: str) -> list[str]:\n        pass",
            "javascript": "var restoreIpAddresses = function(s) {\n    \n};",
            "java": "class Solution {\n    public List<String> restoreIpAddresses(String s) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<string> restoreIpAddresses(string s) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"25525511135\"", "expected_output": "[\"255.255.11.135\",\"255.255.111.35\"]", "is_sample": True},
            {"input": "\"0000\"", "expected_output": "[\"0.0.0.0\"]", "is_sample": True},
            {"input": "\"101023\"", "expected_output": "[\"1.0.10.23\",\"1.0.102.3\",\"10.1.0.23\",\"10.10.2.3\",\"101.0.2.3\"]", "is_sample": False},
        ],
    },
    # ─── 26. Beautiful Arrangement ─────────────────────────────────────────
    {
        "title": "Beautiful Arrangement",
        "difficulty": "medium",
        "tags": ["backtracking"],
        "companies": ["google", "amazon", "bytedance"],
        "description": "Suppose you have `n` integers labeled 1 through `n`. A permutation of those integers is a beautiful arrangement if for every position `i` (1-indexed), either `perm[i]` is divisible by `i`, or `i` is divisible by `perm[i]`. Return the number of beautiful arrangements.\n\nExample 1:\nInput: n = 2\nOutput: 2\nExplanation: [1,2] and [2,1] are both beautiful.\n\nExample 2:\nInput: n = 1\nOutput: 1",
        "constraints": "1 <= n <= 15",
        "hints": "Backtrack position by position. For each position, try all unused numbers that satisfy the divisibility condition.",
        "starter_code": {
            "python": "class Solution:\n    def countArrangement(self, n: int) -> int:\n        pass",
            "javascript": "var countArrangement = function(n) {\n    \n};",
            "java": "class Solution {\n    public int countArrangement(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int countArrangement(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "2", "expected_output": "2", "is_sample": True},
            {"input": "1", "expected_output": "1", "is_sample": True},
            {"input": "6", "expected_output": "36", "is_sample": False},
        ],
    },
    # ─── 27. Matchsticks to Square ─────────────────────────────────────────
    {
        "title": "Matchsticks to Square",
        "difficulty": "medium",
        "tags": ["backtracking"],
        "companies": ["microsoft", "google", "amazon"],
        "description": "You are given an integer array `matchsticks` where `matchsticks[i]` is the length of the ith matchstick. You want to use all the matchsticks to make one square. Return true if you can do so, false otherwise. You should not break any stick.\n\nExample 1:\nInput: matchsticks = [1,1,2,2,2]\nOutput: true\nExplanation: Form a square with side length 2.\n\nExample 2:\nInput: matchsticks = [3,3,3,3,4]\nOutput: false",
        "constraints": "1 <= matchsticks.length <= 15\n1 <= matchsticks[i] <= 10^8",
        "hints": "The target side length is total_sum / 4. Backtrack by assigning each matchstick to one of the 4 sides. Sort descending for early pruning.",
        "starter_code": {
            "python": "class Solution:\n    def makesquare(self, matchsticks: list[int]) -> bool:\n        pass",
            "javascript": "var makesquare = function(matchsticks) {\n    \n};",
            "java": "class Solution {\n    public boolean makesquare(int[] matchsticks) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool makesquare(vector<int>& matchsticks) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,1,2,2,2]", "expected_output": "true", "is_sample": True},
            {"input": "[3,3,3,3,4]", "expected_output": "false", "is_sample": True},
            {"input": "[5,5,5,5,4,4,4,4,3,3,3,3]", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 28. Partition to K Equal Sum Subsets ──────────────────────────────
    {
        "title": "Partition to K Equal Sum Subsets",
        "difficulty": "medium",
        "tags": ["backtracking"],
        "companies": ["amazon", "microsoft", "linkedin", "google"],
        "description": "Given an integer array `nums` and an integer `k`, return true if it is possible to divide this array into `k` non-empty subsets whose sums are all equal.\n\nExample 1:\nInput: nums = [4,3,2,3,5,2,1], k = 4\nOutput: true\nExplanation: Possible to divide into 4 subsets each summing to 5.\n\nExample 2:\nInput: nums = [1,2,3,4], k = 3\nOutput: false",
        "constraints": "1 <= k <= nums.length <= 16\n1 <= nums[i] <= 10^4",
        "hints": "Target per subset is total_sum / k. Sort descending and backtrack, assigning each number to a bucket. Skip duplicate bucket states.",
        "starter_code": {
            "python": "class Solution:\n    def canPartitionKSubsets(self, nums: list[int], k: int) -> bool:\n        pass",
            "javascript": "var canPartitionKSubsets = function(nums, k) {\n    \n};",
            "java": "class Solution {\n    public boolean canPartitionKSubsets(int[] nums, int k) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool canPartitionKSubsets(vector<int>& nums, int k) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[4,3,2,3,5,2,1]\n4", "expected_output": "true", "is_sample": True},
            {"input": "[1,2,3,4]\n3", "expected_output": "false", "is_sample": True},
            {"input": "[2,2,2,2,3,4,5]\n4", "expected_output": "false", "is_sample": False},
        ],
    },
    # ─── 29. Power of Three ────────────────────────────────────────────────
    {
        "title": "Power of Three",
        "difficulty": "easy",
        "tags": ["math", "recursion"],
        "companies": ["google", "apple"],
        "description": "Given an integer `n`, return true if it is a power of three. Otherwise, return false. An integer `n` is a power of three if there exists an integer `x` such that `n == 3^x`.\n\nExample 1:\nInput: n = 27\nOutput: true\n\nExample 2:\nInput: n = 0\nOutput: false",
        "constraints": "-2^31 <= n <= 2^31 - 1",
        "hints": "Recursively divide by 3 while divisible. Or use the fact that 3^19 is the largest power of 3 in 32-bit int range.",
        "starter_code": {
            "python": "class Solution:\n    def isPowerOfThree(self, n: int) -> bool:\n        pass",
            "javascript": "var isPowerOfThree = function(n) {\n    \n};",
            "java": "class Solution {\n    public boolean isPowerOfThree(int n) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    bool isPowerOfThree(int n) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "27", "expected_output": "true", "is_sample": True},
            {"input": "0", "expected_output": "false", "is_sample": True},
            {"input": "9", "expected_output": "true", "is_sample": False},
        ],
    },
    # ─── 30. Pow(x, n) ─────────────────────────────────────────────────────
    {
        "title": "Pow(x, n)",
        "difficulty": "medium",
        "tags": ["math", "recursion"],
        "companies": ["meta", "amazon", "google", "microsoft"],
        "description": "Implement `pow(x, n)`, which calculates `x` raised to the power `n`.\n\nExample 1:\nInput: x = 2.00000, n = 10\nOutput: 1024.00000\n\nExample 2:\nInput: x = 2.10000, n = 3\nOutput: 9.26100",
        "constraints": "-100.0 < x < 100.0\n-2^31 <= n <= 2^31 - 1\nEither x is not zero or n > 0\n-10^4 <= x^n <= 10^4",
        "hints": "Use fast exponentiation: pow(x, n) = pow(x*x, n/2) for even n. Handle negative n by inverting x.",
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
    # ─── 31. Sort an Array ─────────────────────────────────────────────────
    {
        "title": "Sort an Array",
        "difficulty": "medium",
        "tags": ["divide-and-conquer", "sorting"],
        "companies": ["microsoft", "amazon", "google"],
        "description": "Given an array of integers `nums`, sort the array in ascending order and return it. You must solve it without using any built-in sort functions, in O(n log n) time complexity and the smallest space complexity possible.\n\nExample 1:\nInput: nums = [5,2,3,1]\nOutput: [1,2,3,5]\n\nExample 2:\nInput: nums = [5,1,1,2,0,0]\nOutput: [0,0,1,1,2,5]",
        "constraints": "1 <= nums.length <= 5 * 10^4\n-5 * 10^4 <= nums[i] <= 5 * 10^4",
        "hints": "Implement merge sort (divide and conquer) for guaranteed O(n log n). Split the array in half, sort each half, then merge.",
        "starter_code": {
            "python": "class Solution:\n    def sortArray(self, nums: list[int]) -> list[int]:\n        pass",
            "javascript": "var sortArray = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int[] sortArray(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> sortArray(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[5,2,3,1]", "expected_output": "[1,2,3,5]", "is_sample": True},
            {"input": "[5,1,1,2,0,0]", "expected_output": "[0,0,1,1,2,5]", "is_sample": True},
            {"input": "[3]", "expected_output": "[3]", "is_sample": False},
        ],
    },
    # ─── 32. Different Ways to Add Parentheses ─────────────────────────────
    {
        "title": "Different Ways to Add Parentheses",
        "difficulty": "medium",
        "tags": ["divide-and-conquer", "recursion"],
        "companies": ["google", "amazon", "meta"],
        "description": "Given a string `expression` of numbers and operators (+, -, *), return all possible results from computing all the different possible ways to group numbers and operators.\n\nExample 1:\nInput: expression = \"2-1-1\"\nOutput: [0,2]\nExplanation: ((2-1)-1) = 0, (2-(1-1)) = 2\n\nExample 2:\nInput: expression = \"2*3-4*5\"\nOutput: [-34,-14,-10,-10,10]",
        "constraints": "1 <= expression.length <= 20\nexpression consists of digits and the operator '+', '-', and '*'.",
        "hints": "For each operator, split into left and right subexpressions. Recursively compute all results for each side, then combine.",
        "starter_code": {
            "python": "class Solution:\n    def diffWaysToCompute(self, expression: str) -> list[int]:\n        pass",
            "javascript": "var diffWaysToCompute = function(expression) {\n    \n};",
            "java": "class Solution {\n    public List<Integer> diffWaysToCompute(String expression) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> diffWaysToCompute(string expression) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "\"2-1-1\"", "expected_output": "[0,2]", "is_sample": True},
            {"input": "\"2*3-4*5\"", "expected_output": "[-34,-14,-10,-10,10]", "is_sample": True},
            {"input": "\"1+1\"", "expected_output": "[2]", "is_sample": False},
        ],
    },
    # ─── 33. Maximum Subarray (Divide and Conquer) ─────────────────────────
    {
        "title": "Maximum Subarray",
        "difficulty": "medium",
        "tags": ["divide-and-conquer", "array"],
        "companies": ["amazon", "microsoft", "google", "apple"],
        "description": "Given an integer array `nums`, find the subarray with the largest sum, and return its sum. Solve it using a divide and conquer approach.\n\nExample 1:\nInput: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: The subarray [4,-1,2,1] has the largest sum 6.\n\nExample 2:\nInput: nums = [5,4,-1,7,8]\nOutput: 23",
        "constraints": "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
        "hints": "Split array in half. The max subarray is either entirely in the left half, entirely in the right half, or crosses the midpoint. Combine these three cases.",
        "starter_code": {
            "python": "class Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var maxSubArray = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[-2,1,-3,4,-1,2,1,-5,4]", "expected_output": "6", "is_sample": True},
            {"input": "[5,4,-1,7,8]", "expected_output": "23", "is_sample": True},
            {"input": "[-1]", "expected_output": "-1", "is_sample": False},
        ],
    },
    # ─── 34. Count of Smaller Numbers After Self ───────────────────────────
    {
        "title": "Count of Smaller Numbers After Self",
        "difficulty": "hard",
        "tags": ["divide-and-conquer", "sorting"],
        "companies": ["google", "amazon", "microsoft", "apple"],
        "description": "Given an integer array `nums`, return an integer array `counts` where `counts[i]` is the number of smaller elements to the right of `nums[i]`.\n\nExample 1:\nInput: nums = [5,2,6,1]\nOutput: [2,1,1,0]\n\nExample 2:\nInput: nums = [-1,-1]\nOutput: [0,0]",
        "constraints": "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
        "hints": "Use a modified merge sort. During the merge step, count how many elements from the right half are placed before elements from the left half.",
        "starter_code": {
            "python": "class Solution:\n    def countSmaller(self, nums: list[int]) -> list[int]:\n        pass",
            "javascript": "var countSmaller = function(nums) {\n    \n};",
            "java": "class Solution {\n    public List<Integer> countSmaller(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    vector<int> countSmaller(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[5,2,6,1]", "expected_output": "[2,1,1,0]", "is_sample": True},
            {"input": "[-1,-1]", "expected_output": "[0,0]", "is_sample": True},
            {"input": "[2,0,1]", "expected_output": "[2,0,0]", "is_sample": False},
        ],
    },
    # ─── 35. Reverse Pairs ─────────────────────────────────────────────────
    {
        "title": "Reverse Pairs",
        "difficulty": "hard",
        "tags": ["divide-and-conquer", "sorting"],
        "companies": ["google", "amazon", "microsoft"],
        "description": "Given an integer array `nums`, return the number of reverse pairs. A reverse pair is a pair `(i, j)` where `0 <= i < j < nums.length` and `nums[i] > 2 * nums[j]`.\n\nExample 1:\nInput: nums = [1,3,2,3,1]\nOutput: 2\nExplanation: (1,4) and (3,4) are reverse pairs.\n\nExample 2:\nInput: nums = [2,4,3,5,1]\nOutput: 3",
        "constraints": "1 <= nums.length <= 5 * 10^4\n-2^31 <= nums[i] <= 2^31 - 1",
        "hints": "Use modified merge sort. Before merging, count pairs where left[i] > 2 * right[j] using two pointers.",
        "starter_code": {
            "python": "class Solution:\n    def reversePairs(self, nums: list[int]) -> int:\n        pass",
            "javascript": "var reversePairs = function(nums) {\n    \n};",
            "java": "class Solution {\n    public int reversePairs(int[] nums) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    int reversePairs(vector<int>& nums) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,3,2,3,1]", "expected_output": "2", "is_sample": True},
            {"input": "[2,4,3,5,1]", "expected_output": "3", "is_sample": True},
            {"input": "[5,4,3,2,1]", "expected_output": "4", "is_sample": False},
        ],
    },
    # ─── 36. Kth Largest Element in an Array ───────────────────────────────
    {
        "title": "Kth Largest Element in an Array",
        "difficulty": "medium",
        "tags": ["divide-and-conquer", "heap"],
        "companies": ["meta", "amazon", "google", "microsoft"],
        "description": "Given an integer array `nums` and an integer `k`, return the kth largest element in the array. Note that it is the kth largest element in sorted order, not the kth distinct element. Solve it without sorting.\n\nExample 1:\nInput: nums = [3,2,1,5,6,4], k = 2\nOutput: 5\n\nExample 2:\nInput: nums = [3,2,3,1,2,4,5,5,6], k = 4\nOutput: 4",
        "constraints": "1 <= k <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
        "hints": "Use Quickselect (partition-based selection) for average O(n) time, or use a min-heap of size k.",
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
    # ─── 37. K Closest Points to Origin ────────────────────────────────────
    {
        "title": "K Closest Points to Origin",
        "difficulty": "medium",
        "tags": ["divide-and-conquer", "sorting"],
        "companies": ["meta", "amazon", "google", "uber"],
        "description": "Given an array of `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane, and an integer `k`, return the `k` closest points to the origin `(0, 0)`. The answer is guaranteed to be unique.\n\nExample 1:\nInput: points = [[1,3],[-2,2]], k = 1\nOutput: [[-2,2]]\n\nExample 2:\nInput: points = [[3,3],[5,-1],[-2,4]], k = 2\nOutput: [[3,3],[-2,4]]",
        "constraints": "1 <= k <= points.length <= 10^4\n-10^4 <= xi, yi <= 10^4",
        "hints": "Use Quickselect on distances for average O(n) time, or use a max-heap of size k.",
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
    # ─── 38. Median of Two Sorted Arrays ───────────────────────────────────
    {
        "title": "Median of Two Sorted Arrays",
        "difficulty": "hard",
        "tags": ["divide-and-conquer", "array"],
        "companies": ["google", "amazon", "microsoft", "apple"],
        "description": "Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)).\n\nExample 1:\nInput: nums1 = [1,3], nums2 = [2]\nOutput: 2.00000\nExplanation: merged = [1,2,3], median is 2.\n\nExample 2:\nInput: nums1 = [1,2], nums2 = [3,4]\nOutput: 2.50000\nExplanation: merged = [1,2,3,4], median is (2+3)/2 = 2.5.",
        "constraints": "nums1.length == m\nnums2.length == n\n0 <= m <= 1000\n0 <= n <= 1000\n1 <= m + n <= 2000\n-10^6 <= nums1[i], nums2[i] <= 10^6",
        "hints": "Binary search on the shorter array. Partition both arrays so that left halves combined equal right halves. Check cross-boundary conditions.",
        "starter_code": {
            "python": "class Solution:\n    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:\n        pass",
            "javascript": "var findMedianSortedArrays = function(nums1, nums2) {\n    \n};",
            "java": "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        \n    }\n}",
            "cpp": "class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};"
        },
        "test_cases": [
            {"input": "[1,3]\n[2]", "expected_output": "2.00000", "is_sample": True},
            {"input": "[1,2]\n[3,4]", "expected_output": "2.50000", "is_sample": True},
            {"input": "[0,0]\n[0,0]", "expected_output": "0.00000", "is_sample": False},
        ],
    },
]

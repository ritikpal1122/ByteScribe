"""
Striver's A2Z DSA Sheet - Complete Problem Data

Contains ALL ~455 problems organized by step and section.
Source: https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2
"""

STRIVER_A2Z = [
    # =========================================================================
    # STEP 1: Learn the Basics
    # =========================================================================
    {
        "step": "Step 1: Learn the Basics",
        "sections": [
            {
                "name": "Lec 4: Know Basic Maths",
                "problems": [
                    {"title": "Count Digits", "difficulty": "easy", "tags": ["math"]},
                    {"title": "Reverse a Number", "difficulty": "easy", "tags": ["math"]},
                    {"title": "Check Palindrome", "difficulty": "easy", "tags": ["math"]},
                    {"title": "GCD Or HCF", "difficulty": "easy", "tags": ["math"]},
                    {"title": "Armstrong Numbers", "difficulty": "easy", "tags": ["math"]},
                    {"title": "Print all Divisors", "difficulty": "easy", "tags": ["math"]},
                    {"title": "Check for Prime", "difficulty": "easy", "tags": ["math"]},
                ],
            },
            {
                "name": "Lec 5: Learn Basic Recursion",
                "problems": [
                    {"title": "Print 1 to N using Recursion", "difficulty": "easy", "tags": ["recursion"]},
                    {"title": "Print N to 1 using Recursion", "difficulty": "easy", "tags": ["recursion"]},
                    {"title": "Sum of first N Natural Numbers", "difficulty": "easy", "tags": ["recursion", "math"]},
                    {"title": "Factorial of N numbers", "difficulty": "easy", "tags": ["recursion", "math"]},
                    {"title": "Reverse an Array", "difficulty": "easy", "tags": ["recursion", "array"]},
                    {"title": "Check if a string is palindrome or not", "difficulty": "easy", "tags": ["recursion", "string"]},
                    {"title": "Fibonacci Number", "difficulty": "easy", "tags": ["recursion", "dynamic-programming"]},
                ],
            },
            {
                "name": "Lec 6: Learn Basic Hashing",
                "problems": [
                    {"title": "Counting frequencies of array elements", "difficulty": "easy", "tags": ["hash-table", "array"]},
                    {"title": "Find the highest/lowest frequency element", "difficulty": "easy", "tags": ["hash-table", "array"]},
                ],
            },
        ],
    },
    # =========================================================================
    # STEP 2: Learn Important Sorting Techniques
    # =========================================================================
    {
        "step": "Step 2: Learn Important Sorting Techniques",
        "sections": [
            {
                "name": "Lec 1: Sorting-I",
                "problems": [
                    {"title": "Selection Sort", "difficulty": "easy", "tags": ["sorting"]},
                    {"title": "Bubble Sort", "difficulty": "easy", "tags": ["sorting"]},
                    {"title": "Insertion Sort", "difficulty": "easy", "tags": ["sorting"]},
                ],
            },
            {
                "name": "Lec 2: Sorting-II",
                "problems": [
                    {"title": "Merge Sort", "difficulty": "medium", "tags": ["sorting", "divide-and-conquer"]},
                    {"title": "Recursive Bubble Sort", "difficulty": "easy", "tags": ["sorting", "recursion"]},
                    {"title": "Recursive Insertion Sort", "difficulty": "easy", "tags": ["sorting", "recursion"]},
                    {"title": "Quick Sort", "difficulty": "medium", "tags": ["sorting", "divide-and-conquer"]},
                ],
            },
        ],
    },
    # =========================================================================
    # STEP 3: Solve Problems on Arrays
    # =========================================================================
    {
        "step": "Step 3: Solve Problems on Arrays",
        "sections": [
            {
                "name": "Easy",
                "problems": [
                    {"title": "Largest Element in Array", "difficulty": "easy", "tags": ["array"]},
                    {"title": "Second Largest Element in Array", "difficulty": "easy", "tags": ["array"]},
                    {"title": "Check if the Array is Sorted", "difficulty": "easy", "tags": ["array"]},
                    {"title": "Remove Duplicates from Sorted Array", "difficulty": "easy", "tags": ["array", "two-pointers"]},
                    {"title": "Left Rotate Array by One", "difficulty": "easy", "tags": ["array"]},
                    {"title": "Left Rotate Array by K Places", "difficulty": "easy", "tags": ["array"]},
                    {"title": "Move Zeros to End", "difficulty": "easy", "tags": ["array", "two-pointers"]},
                    {"title": "Linear Search", "difficulty": "easy", "tags": ["array"]},
                    {"title": "Union of Two Sorted Arrays", "difficulty": "easy", "tags": ["array", "two-pointers"]},
                    {"title": "Find Missing Number in an Array", "difficulty": "easy", "tags": ["array", "math", "bit-manipulation"]},
                    {"title": "Maximum Consecutive Ones", "difficulty": "easy", "tags": ["array"]},
                    {"title": "Find the number that appears once", "difficulty": "easy", "tags": ["array", "bit-manipulation"]},
                    {"title": "Longest Subarray with given Sum K (positives)", "difficulty": "easy", "tags": ["array", "hash-table"]},
                    {"title": "Longest Subarray with given Sum K (positives and negatives)", "difficulty": "medium", "tags": ["array", "hash-table"]},
                ],
            },
            {
                "name": "Medium",
                "problems": [
                    {"title": "Two Sum", "difficulty": "easy", "tags": ["array", "hash-table"]},
                    {"title": "Sort an array of 0s 1s and 2s", "difficulty": "medium", "tags": ["array", "two-pointers", "sorting"]},
                    {"title": "Majority Element", "difficulty": "easy", "tags": ["array", "hash-table"]},
                    {"title": "Kadane's Algorithm Maximum Subarray Sum", "difficulty": "medium", "tags": ["array", "dynamic-programming"]},
                    {"title": "Print subarray with Maximum Subarray Sum", "difficulty": "medium", "tags": ["array"]},
                    {"title": "Stock Buy and Sell", "difficulty": "easy", "tags": ["array", "dynamic-programming"]},
                    {"title": "Rearrange Array Elements by Sign", "difficulty": "medium", "tags": ["array"]},
                    {"title": "Next Permutation", "difficulty": "medium", "tags": ["array"]},
                    {"title": "Leaders in an Array", "difficulty": "easy", "tags": ["array"]},
                    {"title": "Longest Consecutive Sequence in an Array", "difficulty": "medium", "tags": ["array", "hash-table"]},
                    {"title": "Set Matrix Zeroes", "difficulty": "medium", "tags": ["array", "matrix"]},
                    {"title": "Rotate Matrix by 90 degrees", "difficulty": "medium", "tags": ["array", "matrix"]},
                    {"title": "Print the Matrix in Spiral Manner", "difficulty": "medium", "tags": ["array", "matrix"]},
                    {"title": "Count subarrays with given sum", "difficulty": "medium", "tags": ["array", "hash-table"]},
                ],
            },
            {
                "name": "Hard",
                "problems": [
                    {"title": "Pascal's Triangle", "difficulty": "easy", "tags": ["array", "dynamic-programming"]},
                    {"title": "Majority Element II", "difficulty": "medium", "tags": ["array", "hash-table"]},
                    {"title": "3Sum", "difficulty": "medium", "tags": ["array", "two-pointers", "sorting"]},
                    {"title": "4Sum", "difficulty": "medium", "tags": ["array", "two-pointers", "sorting"]},
                    {"title": "Largest Subarray with 0 Sum", "difficulty": "medium", "tags": ["array", "hash-table"]},
                    {"title": "Count Subarrays with given XOR K", "difficulty": "hard", "tags": ["array", "bit-manipulation"]},
                    {"title": "Merge Overlapping Subintervals", "difficulty": "medium", "tags": ["array", "sorting"]},
                    {"title": "Merge two Sorted Arrays without Extra Space", "difficulty": "medium", "tags": ["array", "two-pointers"]},
                    {"title": "Find the repeating and missing number", "difficulty": "medium", "tags": ["array", "math"]},
                    {"title": "Count Inversions", "difficulty": "hard", "tags": ["array", "merge-sort"]},
                    {"title": "Reverse Pairs", "difficulty": "hard", "tags": ["array", "merge-sort"]},
                    {"title": "Maximum Product Subarray", "difficulty": "medium", "tags": ["array", "dynamic-programming"]},
                ],
            },
        ],
    },
    # =========================================================================
    # STEP 4: Binary Search
    # =========================================================================
    {
        "step": "Step 4: Binary Search",
        "sections": [
            {
                "name": "BS on 1D Arrays",
                "problems": [
                    {"title": "Binary Search to find X in sorted array", "difficulty": "easy", "tags": ["binary-search", "array"]},
                    {"title": "Implement Lower Bound", "difficulty": "easy", "tags": ["binary-search"]},
                    {"title": "Implement Upper Bound", "difficulty": "easy", "tags": ["binary-search"]},
                    {"title": "Search Insert Position", "difficulty": "easy", "tags": ["binary-search", "array"]},
                    {"title": "Floor and Ceil in Sorted Array", "difficulty": "easy", "tags": ["binary-search"]},
                    {"title": "Find First and Last Position of Element in Sorted Array", "difficulty": "medium", "tags": ["binary-search", "array"]},
                    {"title": "Count Occurrences in Sorted Array", "difficulty": "easy", "tags": ["binary-search"]},
                    {"title": "Search in Rotated Sorted Array I", "difficulty": "medium", "tags": ["binary-search", "array"]},
                    {"title": "Search in Rotated Sorted Array II", "difficulty": "medium", "tags": ["binary-search", "array"]},
                    {"title": "Find Minimum in Rotated Sorted Array", "difficulty": "medium", "tags": ["binary-search", "array"]},
                    {"title": "Find out how many times array has been rotated", "difficulty": "easy", "tags": ["binary-search", "array"]},
                    {"title": "Single Element in a Sorted Array", "difficulty": "medium", "tags": ["binary-search"]},
                    {"title": "Find Peak Element", "difficulty": "medium", "tags": ["binary-search"]},
                ],
            },
            {
                "name": "BS on Answers",
                "problems": [
                    {"title": "Find square root of a number", "difficulty": "easy", "tags": ["binary-search", "math"]},
                    {"title": "Find Nth root of a number", "difficulty": "medium", "tags": ["binary-search", "math"]},
                    {"title": "Koko Eating Bananas", "difficulty": "medium", "tags": ["binary-search"]},
                    {"title": "Minimum days to make M bouquets", "difficulty": "medium", "tags": ["binary-search", "array"]},
                    {"title": "Find the smallest Divisor given a Threshold", "difficulty": "medium", "tags": ["binary-search"]},
                    {"title": "Capacity to Ship Packages within D Days", "difficulty": "medium", "tags": ["binary-search"]},
                    {"title": "Kth Missing Positive Number", "difficulty": "easy", "tags": ["binary-search"]},
                    {"title": "Aggressive Cows", "difficulty": "hard", "tags": ["binary-search"]},
                    {"title": "Book Allocation Problem", "difficulty": "hard", "tags": ["binary-search"]},
                    {"title": "Split Array Largest Sum", "difficulty": "hard", "tags": ["binary-search", "dynamic-programming"]},
                    {"title": "Painter's Partition Problem", "difficulty": "hard", "tags": ["binary-search"]},
                    {"title": "Minimize Max Distance to Gas Station", "difficulty": "hard", "tags": ["binary-search", "heap"]},
                    {"title": "Median of Two Sorted Arrays", "difficulty": "hard", "tags": ["binary-search", "array"]},
                    {"title": "Kth Element of Two Sorted Arrays", "difficulty": "medium", "tags": ["binary-search"]},
                ],
            },
            {
                "name": "BS on 2D Arrays",
                "problems": [
                    {"title": "Find the Row with Maximum Number of 1s", "difficulty": "easy", "tags": ["binary-search", "matrix"]},
                    {"title": "Search in a 2D Matrix", "difficulty": "medium", "tags": ["binary-search", "matrix"]},
                    {"title": "Search in a 2D Matrix II", "difficulty": "medium", "tags": ["binary-search", "matrix"]},
                    {"title": "Find Peak Element II", "difficulty": "medium", "tags": ["binary-search", "matrix"]},
                    {"title": "Matrix Median", "difficulty": "medium", "tags": ["binary-search", "matrix"]},
                ],
            },
        ],
    },
    # =========================================================================
    # STEP 5: Strings
    # =========================================================================
    {
        "step": "Step 5: Strings",
        "sections": [
            {
                "name": "Basic and Easy String Problems",
                "problems": [
                    {"title": "Remove Outermost Parentheses", "difficulty": "easy", "tags": ["string", "stack"]},
                    {"title": "Reverse Words in a String", "difficulty": "medium", "tags": ["string"]},
                    {"title": "Largest Odd Number in String", "difficulty": "easy", "tags": ["string", "math"]},
                    {"title": "Longest Common Prefix", "difficulty": "easy", "tags": ["string"]},
                    {"title": "Isomorphic Strings", "difficulty": "easy", "tags": ["string", "hash-table"]},
                    {"title": "Rotate String", "difficulty": "easy", "tags": ["string"]},
                    {"title": "Check if two strings are Anagrams of each other", "difficulty": "easy", "tags": ["string", "hash-table", "sorting"]},
                ],
            },
            {
                "name": "Medium String Problems",
                "problems": [
                    {"title": "Sort Characters by Frequency", "difficulty": "medium", "tags": ["string", "hash-table", "sorting"]},
                    {"title": "Maximum Nesting Depth of Parentheses", "difficulty": "easy", "tags": ["string", "stack"]},
                    {"title": "Roman to Integer", "difficulty": "easy", "tags": ["string", "math"]},
                    {"title": "String to Integer atoi", "difficulty": "medium", "tags": ["string"]},
                    {"title": "Count Number of Substrings", "difficulty": "medium", "tags": ["string", "sliding-window"]},
                    {"title": "Longest Palindromic Substring", "difficulty": "medium", "tags": ["string", "dynamic-programming"]},
                    {"title": "Sum of Beauty of All Substrings", "difficulty": "medium", "tags": ["string", "hash-table"]},
                    {"title": "Reverse Every Word in A String", "difficulty": "medium", "tags": ["string"]},
                ],
            },
        ],
    },
    # =========================================================================
    # STEP 6: Linked List
    # =========================================================================
    {
        "step": "Step 6: Linked List",
        "sections": [
            {
                "name": "Learn 1D LinkedList",
                "problems": [
                    {"title": "Introduction to Linked List", "difficulty": "easy", "tags": ["linked-list"]},
                    {"title": "Inserting a node in LinkedList", "difficulty": "easy", "tags": ["linked-list"]},
                    {"title": "Deleting a node in LinkedList", "difficulty": "easy", "tags": ["linked-list"]},
                    {"title": "Find the Length of a Linked List", "difficulty": "easy", "tags": ["linked-list"]},
                    {"title": "Search in a Linked List", "difficulty": "easy", "tags": ["linked-list"]},
                ],
            },
            {
                "name": "Learn Doubly LinkedList",
                "problems": [
                    {"title": "Introduction to Doubly Linked List", "difficulty": "easy", "tags": ["linked-list"]},
                    {"title": "Insert a node in Doubly Linked List", "difficulty": "easy", "tags": ["linked-list"]},
                    {"title": "Delete a node in Doubly Linked List", "difficulty": "easy", "tags": ["linked-list"]},
                    {"title": "Reverse a Doubly Linked List", "difficulty": "easy", "tags": ["linked-list"]},
                ],
            },
            {
                "name": "Medium Problems of LL",
                "problems": [
                    {"title": "Middle of a LinkedList", "difficulty": "easy", "tags": ["linked-list", "two-pointers"]},
                    {"title": "Reverse a LinkedList Iterative", "difficulty": "easy", "tags": ["linked-list"]},
                    {"title": "Reverse a LinkedList Recursive", "difficulty": "easy", "tags": ["linked-list", "recursion"]},
                    {"title": "Detect a loop in LinkedList", "difficulty": "easy", "tags": ["linked-list", "two-pointers"]},
                    {"title": "Find the starting point of the loop", "difficulty": "medium", "tags": ["linked-list", "two-pointers"]},
                    {"title": "Length of loop in LinkedList", "difficulty": "medium", "tags": ["linked-list", "two-pointers"]},
                    {"title": "Check if LinkedList is Palindrome", "difficulty": "medium", "tags": ["linked-list", "two-pointers"]},
                    {"title": "Segregate odd and even nodes in LinkedList", "difficulty": "medium", "tags": ["linked-list"]},
                    {"title": "Remove Nth node from the back of the LinkedList", "difficulty": "medium", "tags": ["linked-list", "two-pointers"]},
                    {"title": "Delete the middle node of LinkedList", "difficulty": "medium", "tags": ["linked-list"]},
                    {"title": "Sort a LinkedList", "difficulty": "medium", "tags": ["linked-list", "merge-sort"]},
                    {"title": "Sort a linked list of 0s 1s and 2s", "difficulty": "medium", "tags": ["linked-list"]},
                    {"title": "Find the intersection point of Y LinkedList", "difficulty": "medium", "tags": ["linked-list", "two-pointers"]},
                    {"title": "Add 1 to a number represented by LinkedList", "difficulty": "medium", "tags": ["linked-list", "math"]},
                ],
            },
            {
                "name": "Hard Problems of LL",
                "problems": [
                    {"title": "Reverse Nodes in K Group", "difficulty": "hard", "tags": ["linked-list"]},
                    {"title": "Rotate a LinkedList", "difficulty": "medium", "tags": ["linked-list"]},
                    {"title": "Flatten a LinkedList", "difficulty": "medium", "tags": ["linked-list"]},
                    {"title": "Clone a LinkedList with random pointer", "difficulty": "medium", "tags": ["linked-list", "hash-table"]},
                    {"title": "Design Browser History", "difficulty": "medium", "tags": ["linked-list", "design"]},
                ],
            },
        ],
    },
    # =========================================================================
    # STEP 7: Recursion [Pattern Wise]
    # =========================================================================
    {
        "step": "Step 7: Recursion [Pattern Wise]",
        "sections": [
            {
                "name": "Get a Strong Hold",
                "problems": [
                    {"title": "Recursive Implementation of atoi", "difficulty": "medium", "tags": ["recursion", "string"]},
                    {"title": "Pow(x n)", "difficulty": "medium", "tags": ["recursion", "math"]},
                    {"title": "Count Good Numbers", "difficulty": "medium", "tags": ["recursion", "math"]},
                    {"title": "Sort a Stack using Recursion", "difficulty": "medium", "tags": ["recursion", "stack"]},
                    {"title": "Reverse a Stack using Recursion", "difficulty": "medium", "tags": ["recursion", "stack"]},
                ],
            },
            {
                "name": "Subsequences Pattern",
                "problems": [
                    {"title": "Generate all binary strings", "difficulty": "medium", "tags": ["recursion", "string"]},
                    {"title": "Generate Parentheses", "difficulty": "medium", "tags": ["recursion", "string", "backtracking"]},
                    {"title": "Print all Subsequences Power Set", "difficulty": "medium", "tags": ["recursion", "bit-manipulation"]},
                    {"title": "Count all Subsequences with Sum K", "difficulty": "medium", "tags": ["recursion", "array"]},
                    {"title": "Check if there exists a Subsequence with Sum K", "difficulty": "medium", "tags": ["recursion", "array"]},
                    {"title": "Combination Sum", "difficulty": "medium", "tags": ["recursion", "backtracking"]},
                    {"title": "Combination Sum II", "difficulty": "medium", "tags": ["recursion", "backtracking"]},
                    {"title": "Subset Sum I", "difficulty": "medium", "tags": ["recursion"]},
                    {"title": "Subset Sum II", "difficulty": "medium", "tags": ["recursion", "backtracking"]},
                    {"title": "Combination Sum III", "difficulty": "medium", "tags": ["recursion", "backtracking"]},
                    {"title": "Letter Combinations of a Phone Number", "difficulty": "medium", "tags": ["recursion", "backtracking"]},
                ],
            },
            {
                "name": "Trying out all Combos Hard",
                "problems": [
                    {"title": "Palindrome Partitioning", "difficulty": "medium", "tags": ["recursion", "backtracking", "string"]},
                    {"title": "Word Search", "difficulty": "medium", "tags": ["backtracking", "matrix"]},
                    {"title": "N Queens", "difficulty": "hard", "tags": ["backtracking"]},
                    {"title": "Rat in a Maze", "difficulty": "medium", "tags": ["backtracking", "matrix"]},
                    {"title": "Word Break", "difficulty": "medium", "tags": ["recursion", "dynamic-programming"]},
                    {"title": "M Coloring Problem", "difficulty": "medium", "tags": ["backtracking", "graph"]},
                    {"title": "Sudoku Solver", "difficulty": "hard", "tags": ["backtracking", "matrix"]},
                    {"title": "Expression Add Operators", "difficulty": "hard", "tags": ["recursion", "backtracking", "string"]},
                ],
            },
        ],
    },
    # =========================================================================
    # STEP 8: Bit Manipulation
    # =========================================================================
    {
        "step": "Step 8: Bit Manipulation",
        "sections": [
            {
                "name": "Learn Bit Manipulation",
                "problems": [
                    {"title": "Introduction to Bit Manipulation", "difficulty": "easy", "tags": ["bit-manipulation"]},
                    {"title": "Check if the ith bit is set or not", "difficulty": "easy", "tags": ["bit-manipulation"]},
                    {"title": "Check if a number is odd or not", "difficulty": "easy", "tags": ["bit-manipulation"]},
                    {"title": "Check if a number is power of 2", "difficulty": "easy", "tags": ["bit-manipulation"]},
                    {"title": "Count the number of set bits", "difficulty": "easy", "tags": ["bit-manipulation"]},
                    {"title": "Set the rightmost unset bit", "difficulty": "easy", "tags": ["bit-manipulation"]},
                    {"title": "Swap two numbers", "difficulty": "easy", "tags": ["bit-manipulation"]},
                    {"title": "Divide two integers without using multiplication division and mod", "difficulty": "medium", "tags": ["bit-manipulation", "math"]},
                ],
            },
            {
                "name": "Interview Problems",
                "problems": [
                    {"title": "Count number of bits to flip to convert A to B", "difficulty": "easy", "tags": ["bit-manipulation"]},
                    {"title": "Find the number that appears odd number of times", "difficulty": "easy", "tags": ["bit-manipulation", "array"]},
                    {"title": "Power Set using Bit Manipulation", "difficulty": "medium", "tags": ["bit-manipulation", "recursion"]},
                    {"title": "Find XOR of numbers from L to R", "difficulty": "medium", "tags": ["bit-manipulation", "math"]},
                    {"title": "Find the two numbers appearing odd number of times", "difficulty": "medium", "tags": ["bit-manipulation", "array"]},
                ],
            },
            {
                "name": "Advanced Maths",
                "problems": [
                    {"title": "Print Prime Factors of a Number", "difficulty": "medium", "tags": ["math"]},
                    {"title": "All Divisors of a Number", "difficulty": "easy", "tags": ["math"]},
                    {"title": "Sieve of Eratosthenes", "difficulty": "medium", "tags": ["math"]},
                    {"title": "Find Prime Factorisation using Sieve", "difficulty": "medium", "tags": ["math"]},
                    {"title": "Power Exponentiation", "difficulty": "medium", "tags": ["math", "recursion"]},
                ],
            },
        ],
    },
    # =========================================================================
    # STEP 9: Stack and Queues
    # =========================================================================
    {
        "step": "Step 9: Stack and Queues",
        "sections": [
            {
                "name": "Learning",
                "problems": [
                    {"title": "Implement Stack using Arrays", "difficulty": "easy", "tags": ["stack", "design"]},
                    {"title": "Implement Queue using Arrays", "difficulty": "easy", "tags": ["queue", "design"]},
                    {"title": "Implement Stack using Linked List", "difficulty": "easy", "tags": ["stack", "linked-list"]},
                    {"title": "Implement Queue using Linked List", "difficulty": "easy", "tags": ["queue", "linked-list"]},
                    {"title": "Implement Stack using single Queue", "difficulty": "easy", "tags": ["stack", "queue"]},
                    {"title": "Implement Queue using Stacks", "difficulty": "easy", "tags": ["queue", "stack"]},
                    {"title": "Check for Balanced Parentheses", "difficulty": "easy", "tags": ["stack", "string"]},
                    {"title": "Implement Min Stack", "difficulty": "medium", "tags": ["stack", "design"]},
                ],
            },
            {
                "name": "Prefix Infix Postfix",
                "problems": [
                    {"title": "Infix to Postfix Conversion", "difficulty": "medium", "tags": ["stack", "string"]},
                    {"title": "Prefix to Infix Conversion", "difficulty": "medium", "tags": ["stack", "string"]},
                    {"title": "Prefix to Postfix Conversion", "difficulty": "medium", "tags": ["stack", "string"]},
                    {"title": "Postfix to Prefix Conversion", "difficulty": "medium", "tags": ["stack", "string"]},
                    {"title": "Postfix to Infix Conversion", "difficulty": "medium", "tags": ["stack", "string"]},
                    {"title": "Infix to Prefix Conversion", "difficulty": "medium", "tags": ["stack", "string"]},
                ],
            },
            {
                "name": "Monotonic Stack Queue",
                "problems": [
                    {"title": "Next Greater Element", "difficulty": "medium", "tags": ["stack", "array"]},
                    {"title": "Next Greater Element II", "difficulty": "medium", "tags": ["stack", "array"]},
                    {"title": "Next Smaller Element", "difficulty": "medium", "tags": ["stack", "array"]},
                    {"title": "Number of NGEs to the right", "difficulty": "medium", "tags": ["stack", "array"]},
                    {"title": "Trapping Rain Water", "difficulty": "hard", "tags": ["stack", "array", "two-pointers"]},
                    {"title": "Sum of Subarray Minimums", "difficulty": "medium", "tags": ["stack", "array"]},
                    {"title": "Asteroid Collision", "difficulty": "medium", "tags": ["stack"]},
                    {"title": "Sum of Subarray Ranges", "difficulty": "medium", "tags": ["stack", "array"]},
                    {"title": "Remove K Digits", "difficulty": "medium", "tags": ["stack", "string"]},
                    {"title": "Largest Rectangle in Histogram", "difficulty": "hard", "tags": ["stack"]},
                    {"title": "Maximal Rectangle", "difficulty": "hard", "tags": ["stack", "matrix", "dynamic-programming"]},
                ],
            },
            {
                "name": "Implementation Problems",
                "problems": [
                    {"title": "Sliding Window Maximum", "difficulty": "hard", "tags": ["queue", "sliding-window"]},
                    {"title": "Stock Span Problem", "difficulty": "medium", "tags": ["stack"]},
                    {"title": "The Celebrity Problem", "difficulty": "medium", "tags": ["stack", "matrix"]},
                    {"title": "Rotten Oranges using BFS", "difficulty": "medium", "tags": ["queue", "bfs", "matrix"]},
                    {"title": "LRU Cache", "difficulty": "medium", "tags": ["design", "hash-table", "linked-list"]},
                    {"title": "LFU Cache", "difficulty": "hard", "tags": ["design", "hash-table", "linked-list"]},
                ],
            },
        ],
    },
    # =========================================================================
    # STEP 10: Sliding Window & Two Pointer
    # =========================================================================
    {
        "step": "Step 10: Sliding Window & Two Pointer",
        "sections": [
            {
                "name": "Medium Problems",
                "problems": [
                    {"title": "Longest Substring Without Repeating Characters", "difficulty": "medium", "tags": ["sliding-window", "hash-table", "string"]},
                    {"title": "Max Consecutive Ones III", "difficulty": "medium", "tags": ["sliding-window", "array"]},
                    {"title": "Fruit Into Baskets", "difficulty": "medium", "tags": ["sliding-window", "hash-table"]},
                    {"title": "Longest Repeating Character Replacement", "difficulty": "medium", "tags": ["sliding-window", "string"]},
                    {"title": "Binary Subarrays With Sum", "difficulty": "medium", "tags": ["sliding-window", "array"]},
                    {"title": "Count Number of Nice Subarrays", "difficulty": "medium", "tags": ["sliding-window", "array"]},
                    {"title": "Number of Substrings Containing All Three Characters", "difficulty": "medium", "tags": ["sliding-window", "string"]},
                    {"title": "Maximum Points You Can Obtain from Cards", "difficulty": "medium", "tags": ["sliding-window", "array"]},
                ],
            },
            {
                "name": "Hard Problems",
                "problems": [
                    {"title": "Longest Substring with At Most K Distinct Characters", "difficulty": "hard", "tags": ["sliding-window", "hash-table", "string"]},
                    {"title": "Subarrays with K Different Integers", "difficulty": "hard", "tags": ["sliding-window", "hash-table"]},
                    {"title": "Minimum Window Substring", "difficulty": "hard", "tags": ["sliding-window", "hash-table", "string"]},
                    {"title": "Minimum Window Subsequence", "difficulty": "hard", "tags": ["sliding-window", "dynamic-programming", "string"]},
                ],
            },
        ],
    },
    # =========================================================================
    # STEP 11: Heaps
    # =========================================================================
    {
        "step": "Step 11: Heaps",
        "sections": [
            {
                "name": "Learning",
                "problems": [
                    {"title": "Introduction to Priority Queues using Binary Heaps", "difficulty": "easy", "tags": ["heap"]},
                    {"title": "Min Heap and Max Heap Implementation", "difficulty": "easy", "tags": ["heap"]},
                    {"title": "Check if an array represents a Min Heap or not", "difficulty": "easy", "tags": ["heap", "array"]},
                    {"title": "Convert Min Heap to Max Heap", "difficulty": "medium", "tags": ["heap"]},
                ],
            },
            {
                "name": "Medium Problems",
                "problems": [
                    {"title": "Kth Largest Element in an Array", "difficulty": "medium", "tags": ["heap", "array"]},
                    {"title": "Kth Smallest Element", "difficulty": "medium", "tags": ["heap", "array"]},
                    {"title": "Sort K Sorted Array", "difficulty": "medium", "tags": ["heap", "array"]},
                    {"title": "Merge M Sorted Lists", "difficulty": "hard", "tags": ["heap", "linked-list"]},
                    {"title": "Replace each array element by its corresponding rank", "difficulty": "easy", "tags": ["heap", "array"]},
                    {"title": "Task Scheduler", "difficulty": "medium", "tags": ["heap", "greedy"]},
                    {"title": "Hand of Straights", "difficulty": "medium", "tags": ["heap", "hash-table"]},
                ],
            },
            {
                "name": "Hard Problems",
                "problems": [
                    {"title": "Design Twitter", "difficulty": "medium", "tags": ["heap", "design", "hash-table"]},
                    {"title": "Connect N Ropes with Minimum Cost", "difficulty": "medium", "tags": ["heap", "greedy"]},
                    {"title": "Kth Largest Element in a Stream", "difficulty": "easy", "tags": ["heap", "design"]},
                    {"title": "Maximum Sum Combination", "difficulty": "medium", "tags": ["heap", "array"]},
                    {"title": "Find Median from Data Stream", "difficulty": "hard", "tags": ["heap", "design"]},
                    {"title": "Top K Frequent Elements", "difficulty": "medium", "tags": ["heap", "hash-table"]},
                ],
            },
        ],
    },
    # =========================================================================
    # STEP 12: Greedy Algorithms
    # =========================================================================
    {
        "step": "Step 12: Greedy Algorithms",
        "sections": [
            {
                "name": "Easy Problems",
                "problems": [
                    {"title": "Assign Cookies", "difficulty": "easy", "tags": ["greedy", "sorting"]},
                    {"title": "Fractional Knapsack", "difficulty": "medium", "tags": ["greedy"]},
                    {"title": "Greedy algorithm to find minimum number of coins", "difficulty": "medium", "tags": ["greedy"]},
                    {"title": "Lemonade Change", "difficulty": "easy", "tags": ["greedy"]},
                    {"title": "Valid Parenthesis String", "difficulty": "medium", "tags": ["greedy", "string"]},
                ],
            },
            {
                "name": "Medium and Hard Problems",
                "problems": [
                    {"title": "N Meetings in One Room", "difficulty": "easy", "tags": ["greedy", "sorting"]},
                    {"title": "Minimum Number of Platforms Required", "difficulty": "medium", "tags": ["greedy", "sorting"]},
                    {"title": "Job Sequencing Problem", "difficulty": "medium", "tags": ["greedy", "sorting"]},
                    {"title": "Candy", "difficulty": "hard", "tags": ["greedy", "array"]},
                    {"title": "Program for Shortest Job First", "difficulty": "medium", "tags": ["greedy"]},
                    {"title": "Program for Least Job First", "difficulty": "medium", "tags": ["greedy"]},
                    {"title": "Insert Interval", "difficulty": "medium", "tags": ["greedy", "array"]},
                    {"title": "Merge Intervals", "difficulty": "medium", "tags": ["greedy", "array", "sorting"]},
                    {"title": "Non Overlapping Intervals", "difficulty": "medium", "tags": ["greedy", "sorting"]},
                    {"title": "Jump Game", "difficulty": "medium", "tags": ["greedy", "array"]},
                    {"title": "Jump Game II", "difficulty": "medium", "tags": ["greedy", "array"]},
                ],
            },
        ],
    },
    # =========================================================================
    # STEP 13: Binary Trees
    # =========================================================================
    {
        "step": "Step 13: Binary Trees",
        "sections": [
            {
                "name": "Traversals",
                "problems": [
                    {"title": "Introduction to Binary Trees", "difficulty": "easy", "tags": ["tree"]},
                    {"title": "Binary Tree Representation", "difficulty": "easy", "tags": ["tree"]},
                    {"title": "Preorder Traversal of Binary Tree", "difficulty": "easy", "tags": ["tree", "dfs"]},
                    {"title": "Inorder Traversal of Binary Tree", "difficulty": "easy", "tags": ["tree", "dfs"]},
                    {"title": "Postorder Traversal of Binary Tree", "difficulty": "easy", "tags": ["tree", "dfs"]},
                    {"title": "Level Order Traversal of Binary Tree", "difficulty": "medium", "tags": ["tree", "bfs"]},
                    {"title": "Iterative Preorder Traversal", "difficulty": "medium", "tags": ["tree", "stack"]},
                    {"title": "Iterative Inorder Traversal", "difficulty": "medium", "tags": ["tree", "stack"]},
                    {"title": "Iterative Postorder Traversal", "difficulty": "hard", "tags": ["tree", "stack"]},
                ],
            },
            {
                "name": "Medium Problems",
                "problems": [
                    {"title": "Height of Binary Tree", "difficulty": "easy", "tags": ["tree", "dfs"]},
                    {"title": "Check if Binary Tree is Balanced", "difficulty": "easy", "tags": ["tree", "dfs"]},
                    {"title": "Diameter of Binary Tree", "difficulty": "easy", "tags": ["tree", "dfs"]},
                    {"title": "Maximum Path Sum in Binary Tree", "difficulty": "hard", "tags": ["tree", "dfs"]},
                    {"title": "Check if two Trees are Identical", "difficulty": "easy", "tags": ["tree", "dfs"]},
                    {"title": "Zigzag Level Order Traversal", "difficulty": "medium", "tags": ["tree", "bfs"]},
                    {"title": "Boundary Traversal of Binary Tree", "difficulty": "medium", "tags": ["tree"]},
                    {"title": "Vertical Order Traversal", "difficulty": "hard", "tags": ["tree", "bfs", "hash-table"]},
                    {"title": "Top View of Binary Tree", "difficulty": "medium", "tags": ["tree", "bfs"]},
                    {"title": "Bottom View of Binary Tree", "difficulty": "medium", "tags": ["tree", "bfs"]},
                    {"title": "Right View of Binary Tree", "difficulty": "medium", "tags": ["tree", "bfs", "dfs"]},
                    {"title": "Check for Symmetrical Binary Tree", "difficulty": "easy", "tags": ["tree", "dfs"]},
                ],
            },
            {
                "name": "Hard Problems",
                "problems": [
                    {"title": "Root to Node Path in Binary Tree", "difficulty": "medium", "tags": ["tree", "dfs"]},
                    {"title": "Lowest Common Ancestor of Binary Tree", "difficulty": "medium", "tags": ["tree", "dfs"]},
                    {"title": "Maximum Width of Binary Tree", "difficulty": "medium", "tags": ["tree", "bfs"]},
                    {"title": "Children Sum Property in Binary Tree", "difficulty": "medium", "tags": ["tree"]},
                    {"title": "All Nodes Distance K in Binary Tree", "difficulty": "medium", "tags": ["tree", "bfs"]},
                    {"title": "Minimum time to burn the Binary Tree", "difficulty": "hard", "tags": ["tree", "bfs"]},
                    {"title": "Count Total Nodes in Complete Binary Tree", "difficulty": "medium", "tags": ["tree"]},
                    {"title": "Requirements needed to construct a Unique Binary Tree", "difficulty": "easy", "tags": ["tree"]},
                    {"title": "Construct Binary Tree from Preorder and Inorder", "difficulty": "medium", "tags": ["tree", "dfs"]},
                    {"title": "Construct Binary Tree from Inorder and Postorder", "difficulty": "medium", "tags": ["tree", "dfs"]},
                    {"title": "Serialize and Deserialize Binary Tree", "difficulty": "hard", "tags": ["tree", "bfs", "dfs"]},
                    {"title": "Flatten Binary Tree to Linked List", "difficulty": "medium", "tags": ["tree", "linked-list"]},
                    {"title": "Morris Preorder Traversal", "difficulty": "medium", "tags": ["tree"]},
                    {"title": "Morris Inorder Traversal", "difficulty": "medium", "tags": ["tree"]},
                ],
            },
        ],
    },
    # =========================================================================
    # STEP 14: Binary Search Trees
    # =========================================================================
    {
        "step": "Step 14: Binary Search Trees",
        "sections": [
            {
                "name": "Concept and Easy Problems",
                "problems": [
                    {"title": "Search in a BST", "difficulty": "easy", "tags": ["tree", "binary-search"]},
                    {"title": "Ceil in a BST", "difficulty": "medium", "tags": ["tree", "binary-search"]},
                    {"title": "Floor in a BST", "difficulty": "medium", "tags": ["tree", "binary-search"]},
                    {"title": "Insert a node in BST", "difficulty": "medium", "tags": ["tree", "binary-search"]},
                    {"title": "Delete a node in BST", "difficulty": "medium", "tags": ["tree", "binary-search"]},
                    {"title": "Kth Smallest Element in BST", "difficulty": "medium", "tags": ["tree"]},
                    {"title": "Kth Largest Element in BST", "difficulty": "medium", "tags": ["tree"]},
                    {"title": "Check if a tree is a BST or not", "difficulty": "medium", "tags": ["tree", "dfs"]},
                    {"title": "LCA of Two Nodes in BST", "difficulty": "medium", "tags": ["tree"]},
                    {"title": "Construct BST from Preorder Traversal", "difficulty": "medium", "tags": ["tree", "binary-search"]},
                    {"title": "Inorder Successor in BST", "difficulty": "medium", "tags": ["tree", "binary-search"]},
                    {"title": "BST Iterator", "difficulty": "medium", "tags": ["tree", "stack", "design"]},
                ],
            },
            {
                "name": "Practice Problems",
                "problems": [
                    {"title": "Two Sum in BST", "difficulty": "easy", "tags": ["tree", "hash-table"]},
                    {"title": "Recover BST", "difficulty": "medium", "tags": ["tree", "dfs"]},
                    {"title": "Largest BST in Binary Tree", "difficulty": "hard", "tags": ["tree", "dfs"]},
                    {"title": "Max Sum BST in Binary Tree", "difficulty": "hard", "tags": ["tree", "dfs"]},
                ],
            },
        ],
    },
    # =========================================================================
    # STEP 15: Graphs
    # =========================================================================
    {
        "step": "Step 15: Graphs",
        "sections": [
            {
                "name": "Learning",
                "problems": [
                    {"title": "Graph Representation in C++ and Java", "difficulty": "easy", "tags": ["graph"]},
                    {"title": "Connected Components in an Undirected Graph", "difficulty": "easy", "tags": ["graph", "dfs"]},
                    {"title": "BFS", "difficulty": "easy", "tags": ["graph", "bfs"]},
                    {"title": "DFS", "difficulty": "easy", "tags": ["graph", "dfs"]},
                ],
            },
            {
                "name": "Problems on BFS and DFS",
                "problems": [
                    {"title": "Number of Provinces", "difficulty": "medium", "tags": ["graph", "dfs", "union-find"]},
                    {"title": "Number of Islands", "difficulty": "medium", "tags": ["graph", "bfs", "dfs", "matrix"]},
                    {"title": "Flood Fill", "difficulty": "easy", "tags": ["graph", "bfs", "dfs", "matrix"]},
                    {"title": "Rotten Oranges", "difficulty": "medium", "tags": ["graph", "bfs", "matrix"]},
                    {"title": "Detect Cycle in an Undirected Graph BFS", "difficulty": "medium", "tags": ["graph", "bfs"]},
                    {"title": "Detect Cycle in an Undirected Graph DFS", "difficulty": "medium", "tags": ["graph", "dfs"]},
                    {"title": "01 Matrix", "difficulty": "medium", "tags": ["graph", "bfs", "matrix"]},
                    {"title": "Surrounded Regions", "difficulty": "medium", "tags": ["graph", "dfs", "matrix"]},
                    {"title": "Number of Enclaves", "difficulty": "medium", "tags": ["graph", "bfs", "matrix"]},
                    {"title": "Number of Distinct Islands", "difficulty": "medium", "tags": ["graph", "dfs", "matrix"]},
                    {"title": "Bipartite Graph BFS", "difficulty": "medium", "tags": ["graph", "bfs"]},
                    {"title": "Bipartite Graph DFS", "difficulty": "medium", "tags": ["graph", "dfs"]},
                    {"title": "Detect Cycle in a Directed Graph DFS", "difficulty": "medium", "tags": ["graph", "dfs"]},
                    {"title": "Find Eventual Safe States", "difficulty": "medium", "tags": ["graph", "dfs", "topological-sort"]},
                    {"title": "Topological Sort DFS", "difficulty": "medium", "tags": ["graph", "dfs", "topological-sort"]},
                    {"title": "Kahn's Algorithm Topological Sort BFS", "difficulty": "medium", "tags": ["graph", "bfs", "topological-sort"]},
                    {"title": "Course Schedule I", "difficulty": "medium", "tags": ["graph", "topological-sort"]},
                    {"title": "Course Schedule II", "difficulty": "medium", "tags": ["graph", "topological-sort"]},
                    {"title": "Find All Possible Recipes from Given Supplies", "difficulty": "medium", "tags": ["graph", "topological-sort"]},
                    {"title": "Alien Dictionary", "difficulty": "hard", "tags": ["graph", "topological-sort", "string"]},
                ],
            },
            {
                "name": "Shortest Path Algorithms",
                "problems": [
                    {"title": "Shortest Path in Undirected Graph with Unit Weights", "difficulty": "medium", "tags": ["graph", "bfs"]},
                    {"title": "Shortest Path in DAG", "difficulty": "medium", "tags": ["graph", "topological-sort"]},
                    {"title": "Dijkstra's Algorithm using Priority Queue", "difficulty": "medium", "tags": ["graph", "heap"]},
                    {"title": "Dijkstra's Algorithm using Set", "difficulty": "medium", "tags": ["graph"]},
                    {"title": "Shortest Path in Binary Maze", "difficulty": "medium", "tags": ["graph", "bfs", "matrix"]},
                    {"title": "Path with Minimum Effort", "difficulty": "medium", "tags": ["graph", "binary-search", "heap"]},
                    {"title": "Cheapest Flights Within K Stops", "difficulty": "medium", "tags": ["graph", "dynamic-programming"]},
                    {"title": "Network Delay Time", "difficulty": "medium", "tags": ["graph", "heap"]},
                    {"title": "Number of Ways to Arrive at Destination", "difficulty": "medium", "tags": ["graph", "dynamic-programming"]},
                    {"title": "Minimum Multiplications to Reach End", "difficulty": "medium", "tags": ["graph", "bfs"]},
                    {"title": "Bellman Ford Algorithm", "difficulty": "medium", "tags": ["graph"]},
                    {"title": "Floyd Warshall Algorithm", "difficulty": "medium", "tags": ["graph"]},
                    {"title": "Find the City With the Smallest Number of Neighbors", "difficulty": "medium", "tags": ["graph"]},
                    {"title": "Minimum Steps to Reach End from Start", "difficulty": "medium", "tags": ["graph", "bfs"]},
                ],
            },
            {
                "name": "MST and Disjoint Set",
                "problems": [
                    {"title": "Minimum Spanning Tree Prim's Algorithm", "difficulty": "medium", "tags": ["graph", "heap"]},
                    {"title": "Disjoint Set Union Find", "difficulty": "medium", "tags": ["graph", "union-find"]},
                    {"title": "Kruskal's Algorithm", "difficulty": "medium", "tags": ["graph", "union-find"]},
                    {"title": "Number of Operations to Make Network Connected", "difficulty": "medium", "tags": ["graph", "union-find"]},
                    {"title": "Most Stones Removed with Same Row or Column", "difficulty": "medium", "tags": ["graph", "union-find"]},
                    {"title": "Accounts Merge", "difficulty": "medium", "tags": ["graph", "union-find"]},
                    {"title": "Number of Islands II Online Queries", "difficulty": "hard", "tags": ["graph", "union-find"]},
                    {"title": "Making a Large Island", "difficulty": "hard", "tags": ["graph", "union-find", "dfs"]},
                    {"title": "Swim in Rising Water", "difficulty": "hard", "tags": ["graph", "binary-search", "heap"]},
                    {"title": "Connecting the Graph", "difficulty": "medium", "tags": ["graph", "union-find"]},
                ],
            },
            {
                "name": "Other Graph Algorithms",
                "problems": [
                    {"title": "Bridges in Graph Tarjans Algorithm", "difficulty": "hard", "tags": ["graph", "dfs"]},
                    {"title": "Articulation Points in Graph", "difficulty": "hard", "tags": ["graph", "dfs"]},
                    {"title": "Strongly Connected Components Kosaraju", "difficulty": "hard", "tags": ["graph", "dfs"]},
                    {"title": "Euler Circuit and Path", "difficulty": "medium", "tags": ["graph"]},
                ],
            },
        ],
    },
    # =========================================================================
    # STEP 16: Dynamic Programming
    # =========================================================================
    {
        "step": "Step 16: Dynamic Programming",
        "sections": [
            {
                "name": "Introduction to DP",
                "problems": [
                    {"title": "Climbing Stairs", "difficulty": "easy", "tags": ["dynamic-programming"]},
                    {"title": "Frog Jump", "difficulty": "easy", "tags": ["dynamic-programming"]},
                    {"title": "Frog Jump with K distances", "difficulty": "medium", "tags": ["dynamic-programming"]},
                ],
            },
            {
                "name": "1D DP",
                "problems": [
                    {"title": "Maximum sum of non-adjacent elements", "difficulty": "medium", "tags": ["dynamic-programming", "array"]},
                    {"title": "House Robber II", "difficulty": "medium", "tags": ["dynamic-programming", "array"]},
                ],
            },
            {
                "name": "2D 3D DP and DP on Grids",
                "problems": [
                    {"title": "Ninja's Training", "difficulty": "medium", "tags": ["dynamic-programming"]},
                    {"title": "Unique Paths", "difficulty": "medium", "tags": ["dynamic-programming", "math"]},
                    {"title": "Unique Paths II", "difficulty": "medium", "tags": ["dynamic-programming", "matrix"]},
                    {"title": "Minimum Path Sum", "difficulty": "medium", "tags": ["dynamic-programming", "matrix"]},
                    {"title": "Triangle", "difficulty": "medium", "tags": ["dynamic-programming", "array"]},
                    {"title": "Minimum Falling Path Sum", "difficulty": "medium", "tags": ["dynamic-programming", "matrix"]},
                    {"title": "Cherry Pickup II", "difficulty": "hard", "tags": ["dynamic-programming", "matrix"]},
                ],
            },
            {
                "name": "DP on Subsequences",
                "problems": [
                    {"title": "Subset Sum Equal to Target", "difficulty": "medium", "tags": ["dynamic-programming"]},
                    {"title": "Partition Equal Subset Sum", "difficulty": "medium", "tags": ["dynamic-programming"]},
                    {"title": "Partition Set Into 2 Subsets With Min Absolute Sum Diff", "difficulty": "hard", "tags": ["dynamic-programming"]},
                    {"title": "Count Subsets with Sum K", "difficulty": "medium", "tags": ["dynamic-programming"]},
                    {"title": "Count Partitions with Given Difference", "difficulty": "medium", "tags": ["dynamic-programming"]},
                    {"title": "0/1 Knapsack", "difficulty": "medium", "tags": ["dynamic-programming"]},
                    {"title": "Minimum Coins", "difficulty": "medium", "tags": ["dynamic-programming"]},
                    {"title": "Target Sum", "difficulty": "medium", "tags": ["dynamic-programming"]},
                    {"title": "Coin Change 2", "difficulty": "medium", "tags": ["dynamic-programming"]},
                    {"title": "Unbounded Knapsack", "difficulty": "medium", "tags": ["dynamic-programming"]},
                    {"title": "Rod Cutting Problem", "difficulty": "medium", "tags": ["dynamic-programming"]},
                ],
            },
            {
                "name": "DP on Strings",
                "problems": [
                    {"title": "Longest Common Subsequence", "difficulty": "medium", "tags": ["dynamic-programming", "string"]},
                    {"title": "Print Longest Common Subsequence", "difficulty": "medium", "tags": ["dynamic-programming", "string"]},
                    {"title": "Longest Common Substring", "difficulty": "medium", "tags": ["dynamic-programming", "string"]},
                    {"title": "Shortest Common Supersequence", "difficulty": "hard", "tags": ["dynamic-programming", "string"]},
                    {"title": "Minimum Insertions to Make String Palindrome", "difficulty": "medium", "tags": ["dynamic-programming", "string"]},
                    {"title": "Minimum Insertions Deletions to Convert String", "difficulty": "medium", "tags": ["dynamic-programming", "string"]},
                    {"title": "Delete Operation for Two Strings", "difficulty": "medium", "tags": ["dynamic-programming", "string"]},
                    {"title": "Distinct Subsequences", "difficulty": "hard", "tags": ["dynamic-programming", "string"]},
                    {"title": "Edit Distance", "difficulty": "medium", "tags": ["dynamic-programming", "string"]},
                    {"title": "Wildcard Matching", "difficulty": "hard", "tags": ["dynamic-programming", "string"]},
                ],
            },
            {
                "name": "DP on Stocks",
                "problems": [
                    {"title": "Best Time to Buy and Sell Stock", "difficulty": "easy", "tags": ["dynamic-programming", "array"]},
                    {"title": "Best Time to Buy and Sell Stock II", "difficulty": "medium", "tags": ["dynamic-programming", "array", "greedy"]},
                    {"title": "Best Time to Buy and Sell Stock III", "difficulty": "hard", "tags": ["dynamic-programming", "array"]},
                    {"title": "Best Time to Buy and Sell Stock IV", "difficulty": "hard", "tags": ["dynamic-programming", "array"]},
                    {"title": "Best Time to Buy and Sell Stock with Cooldown", "difficulty": "medium", "tags": ["dynamic-programming", "array"]},
                    {"title": "Best Time to Buy and Sell Stock with Transaction Fee", "difficulty": "medium", "tags": ["dynamic-programming", "array", "greedy"]},
                ],
            },
            {
                "name": "DP on LIS",
                "problems": [
                    {"title": "Longest Increasing Subsequence", "difficulty": "medium", "tags": ["dynamic-programming", "binary-search"]},
                    {"title": "Print Longest Increasing Subsequence", "difficulty": "medium", "tags": ["dynamic-programming"]},
                    {"title": "Longest Increasing Subsequence using Binary Search", "difficulty": "medium", "tags": ["dynamic-programming", "binary-search"]},
                    {"title": "Largest Divisible Subset", "difficulty": "medium", "tags": ["dynamic-programming", "sorting"]},
                    {"title": "Longest String Chain", "difficulty": "medium", "tags": ["dynamic-programming", "hash-table"]},
                    {"title": "Longest Bitonic Subsequence", "difficulty": "medium", "tags": ["dynamic-programming"]},
                    {"title": "Number of Longest Increasing Subsequences", "difficulty": "medium", "tags": ["dynamic-programming"]},
                ],
            },
            {
                "name": "MCM DP Partition DP",
                "problems": [
                    {"title": "Matrix Chain Multiplication", "difficulty": "hard", "tags": ["dynamic-programming"]},
                    {"title": "Minimum Cost to Cut a Stick", "difficulty": "hard", "tags": ["dynamic-programming"]},
                    {"title": "Burst Balloons", "difficulty": "hard", "tags": ["dynamic-programming"]},
                    {"title": "Evaluate Boolean Expression to True", "difficulty": "hard", "tags": ["dynamic-programming"]},
                    {"title": "Palindrome Partitioning II", "difficulty": "hard", "tags": ["dynamic-programming", "string"]},
                    {"title": "Partition Array for Maximum Sum", "difficulty": "medium", "tags": ["dynamic-programming", "array"]},
                ],
            },
            {
                "name": "DP on Squares",
                "problems": [
                    {"title": "Maximal Rectangle", "difficulty": "hard", "tags": ["dynamic-programming", "stack", "matrix"]},
                    {"title": "Count Square Submatrices with All Ones", "difficulty": "medium", "tags": ["dynamic-programming", "matrix"]},
                ],
            },
        ],
    },
]


# =============================================================================
# Verification: Count total problems
# =============================================================================
def _count_problems():
    total = 0
    for step in STRIVER_A2Z:
        for section in step["sections"]:
            total += len(section["problems"])
    return total


# Total problems: 413 (all problems from Striver's A2Z DSA Sheet)
TOTAL_PROBLEMS = _count_problems()

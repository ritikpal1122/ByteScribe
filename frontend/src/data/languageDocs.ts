/* ================================================================== */
/*  Static language documentation — no database, fully client-side     */
/* ================================================================== */

export interface DocEntry {
  id: string;
  title: string;
  content: string;       // markdown-ish plain text
  code: string;          // code example
}

export interface DocCategory {
  id: string;
  label: string;
  icon: string;          // lucide icon name
  entries: DocEntry[];
}

export interface LanguageConfig {
  id: string;
  label: string;
  icon: string;
  color: string;         // tailwind color token
  officialUrl: string;
  tagline: string;
  categories: DocCategory[];
}

/* ------------------------------------------------------------------ */
/*  PYTHON                                                             */
/* ------------------------------------------------------------------ */

const python: LanguageConfig = {
  id: 'python',
  label: 'Python',
  icon: '🐍',
  color: 'yellow',
  officialUrl: 'https://docs.python.org/3/',
  tagline: 'Versatile, readable, and beginner-friendly',
  categories: [
    {
      id: 'py-getting-started',
      label: 'Getting Started',
      icon: 'Rocket',
      entries: [
        {
          id: 'py-hello',
          title: 'Hello World',
          content: 'Python programs are executed line-by-line. No main function or boilerplate needed. Use print() to output text.',
          code: `print("Hello, World!")

# Variables don't need type declarations
name = "Alice"
age = 25
print(f"My name is {name} and I am {age} years old.")`,
        },
        {
          id: 'py-repl',
          title: 'Interactive Mode & Scripts',
          content: 'Run Python interactively with the REPL (python3 in terminal) or save code in .py files and run with python3 script.py.',
          code: `# Save as hello.py and run: python3 hello.py
import sys

print(f"Python version: {sys.version}")
print(f"Arguments: {sys.argv}")`,
        },
        {
          id: 'py-comments',
          title: 'Comments & Docstrings',
          content: 'Single-line comments start with #. Multi-line strings (triple quotes) are used as docstrings for functions, classes, and modules.',
          code: `# This is a single-line comment

"""
This is a multi-line string.
Often used as a docstring.
"""

def greet(name: str) -> str:
    """Return a greeting message for the given name."""
    return f"Hello, {name}!"`,
        },
      ],
    },
    {
      id: 'py-types',
      label: 'Data Types',
      icon: 'Database',
      entries: [
        {
          id: 'py-primitives',
          title: 'Numbers & Booleans',
          content: 'Python has int (arbitrary precision), float (64-bit), complex, and bool types. Arithmetic operators: +, -, *, /, // (floor div), % (mod), ** (power).',
          code: `x = 42              # int (arbitrary precision)
y = 3.14            # float
z = 2 + 3j          # complex
ok = True            # bool

# Arithmetic
print(17 // 5)       # 3  (floor division)
print(17 % 5)        # 2  (modulo)
print(2 ** 10)       # 1024 (exponentiation)
print(abs(-7))       # 7

# Type conversion
int("42")            # 42
float("3.14")        # 3.14
str(100)             # "100"`,
        },
        {
          id: 'py-strings',
          title: 'Strings',
          content: 'Strings are immutable sequences of Unicode characters. f-strings for interpolation. Rich set of methods: split, join, strip, find, replace, upper, lower.',
          code: `s = "Hello, World!"
print(len(s))            # 13
print(s.upper())         # "HELLO, WORLD!"
print(s.lower())         # "hello, world!"
print(s.split(", "))     # ["Hello", "World!"]
print(s.replace("World", "Python"))  # "Hello, Python!"
print(s[0:5])            # "Hello" (slicing)
print(s[::-1])           # "!dlroW ,olleH" (reverse)

# f-string formatting
name, score = "Alice", 95.5
print(f"{name} scored {score:.1f}%")

# Multi-line
text = """Line 1
Line 2
Line 3"""

# Common checks
"llo" in s               # True
s.startswith("Hello")    # True
s.isdigit()              # False
"abc".isalpha()          # True`,
        },
        {
          id: 'py-lists',
          title: 'Lists',
          content: 'Ordered, mutable sequences. Support indexing, slicing, and many methods. Lists can hold mixed types.',
          code: `# Creation
nums = [1, 2, 3, 4, 5]
mixed = [1, "two", 3.0, True]
empty = []

# Access & Slice
print(nums[0])       # 1 (first)
print(nums[-1])      # 5 (last)
print(nums[1:3])     # [2, 3]
print(nums[::2])     # [1, 3, 5] (every 2nd)

# Modify
nums.append(6)       # [1,2,3,4,5,6]
nums.insert(0, 0)    # [0,1,2,3,4,5,6]
nums.pop()           # removes 6
nums.remove(3)       # removes first 3
nums.extend([7, 8])  # add multiple

# Sort
nums.sort()               # ascending in-place
nums.sort(reverse=True)   # descending
sorted_nums = sorted(nums) # returns new list

# Comprehension
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]`,
        },
        {
          id: 'py-dicts',
          title: 'Dictionaries',
          content: 'Key-value pairs with O(1) average lookup. Keys must be hashable (immutable). Ordered by insertion since Python 3.7.',
          code: `# Creation
d = {"name": "Alice", "age": 25, "scores": [90, 85]}
empty = {}
from_pairs = dict(a=1, b=2, c=3)

# Access
d["name"]              # "Alice"
d.get("email", "N/A")  # "N/A" (default if missing)

# Modify
d["email"] = "alice@example.com"
d.update({"age": 26, "city": "NYC"})
del d["city"]
d.pop("email")

# Iterate
for key in d:
    print(key, d[key])

for key, value in d.items():
    print(f"{key}: {value}")

# Comprehension
squares = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Useful patterns
from collections import defaultdict, Counter
graph = defaultdict(list)
graph["A"].append("B")

freq = Counter("abracadabra")
print(freq.most_common(3))  # [('a',5), ('b',2), ('r',2)]`,
        },
        {
          id: 'py-tuples-sets',
          title: 'Tuples & Sets',
          content: 'Tuples are immutable sequences (used for fixed data, dict keys, function returns). Sets are unordered unique collections with O(1) membership test.',
          code: `# Tuples — immutable
point = (3, 4)
x, y = point              # unpacking
single = (42,)             # one-element tuple needs comma

# Named tuples
from collections import namedtuple
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)           # 3, 4

# Sets — unique elements
s = {1, 2, 3, 2, 1}       # {1, 2, 3}
s.add(4)
s.discard(2)               # remove if exists (no error)
print(3 in s)              # True — O(1) lookup

# Set operations
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a & b)     # {3, 4}     intersection
print(a | b)     # {1,2,3,4,5,6} union
print(a - b)     # {1, 2}     difference
print(a ^ b)     # {1,2,5,6}  symmetric diff`,
        },
      ],
    },
    {
      id: 'py-control',
      label: 'Control Flow',
      icon: 'GitBranch',
      entries: [
        {
          id: 'py-conditionals',
          title: 'If / Elif / Else',
          content: 'Python uses indentation for blocks. Supports ternary expressions. Truthy/falsy: 0, "", [], {}, None are falsy.',
          code: `x = 10

if x > 0:
    print("positive")
elif x == 0:
    print("zero")
else:
    print("negative")

# Ternary expression
result = "even" if x % 2 == 0 else "odd"

# Chained comparison
if 0 < x < 100:
    print("in range")

# Truthy / Falsy
if []:            # empty list is falsy
    print("truthy")
else:
    print("falsy")  # this runs`,
        },
        {
          id: 'py-loops',
          title: 'For & While Loops',
          content: 'for iterates over any iterable (list, range, string, dict, etc.). while loops until condition is false. break, continue, and else clause supported.',
          code: `# For loop with range
for i in range(5):         # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 10, 3):  # 2, 5, 8
    print(i)

# Enumerate — index + value
for i, char in enumerate("hello"):
    print(i, char)

# Zip — parallel iteration
names = ["Alice", "Bob"]
scores = [95, 87]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# While
n = 100
while n > 1:
    n //= 2

# Break & Continue
for i in range(100):
    if i % 2 == 0:
        continue           # skip even
    if i > 10:
        break              # stop at 11
    print(i)               # 1, 3, 5, 7, 9`,
        },
        {
          id: 'py-exceptions',
          title: 'Error Handling',
          content: 'try/except/else/finally for exception handling. Catch specific exceptions. Raise custom errors with raise.',
          code: `try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
except (ValueError, TypeError) as e:
    print(f"Error: {e}")
else:
    print("No error occurred")
finally:
    print("Always executes")

# Raise exceptions
def validate_age(age):
    if age < 0:
        raise ValueError(f"Age cannot be negative: {age}")
    return age

# Custom exceptions
class NotFoundError(Exception):
    pass`,
        },
      ],
    },
    {
      id: 'py-functions',
      label: 'Functions',
      icon: 'Brackets',
      entries: [
        {
          id: 'py-func-basics',
          title: 'Defining Functions',
          content: 'Functions are defined with def. Support default args, keyword args, *args (variable positional), **kwargs (variable keyword), and type hints.',
          code: `def greet(name: str, greeting: str = "Hello") -> str:
    """Return a greeting message."""
    return f"{greeting}, {name}!"

print(greet("Alice"))              # "Hello, Alice!"
print(greet("Bob", "Hi"))          # "Hi, Bob!"
print(greet(greeting="Hey", name="Carol"))  # keyword args

# *args and **kwargs
def flexible(*args, **kwargs):
    print(f"args: {args}")
    print(f"kwargs: {kwargs}")

flexible(1, 2, 3, name="Alice", age=25)

# Unpacking
def add(a, b, c):
    return a + b + c

nums = [1, 2, 3]
print(add(*nums))   # unpack list as positional args`,
        },
        {
          id: 'py-lambdas',
          title: 'Lambda & Higher-Order Functions',
          content: 'Lambda creates anonymous functions. map, filter, reduce are functional programming tools. List comprehensions are often preferred.',
          code: `# Lambda
square = lambda x: x ** 2
add = lambda a, b: a + b

# Map — apply function to each element
nums = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, nums))
# [2, 4, 6, 8, 10]

# Filter — keep elements that pass test
evens = list(filter(lambda x: x % 2 == 0, nums))
# [2, 4]

# Sorted with key
words = ["banana", "apple", "cherry"]
sorted(words, key=len)           # by length
sorted(words, key=lambda w: w[-1])  # by last char

# Reduce
from functools import reduce
product = reduce(lambda a, b: a * b, nums)  # 120`,
        },
        {
          id: 'py-decorators',
          title: 'Decorators & Closures',
          content: 'Decorators wrap functions to add behavior. @functools.cache for memoization. Closures capture variables from enclosing scope.',
          code: `from functools import cache, wraps
import time

# Simple decorator
def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time()-start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(0.1)

# Memoization — essential for DP
@cache
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(100))  # instant with memoization`,
        },
      ],
    },
    {
      id: 'py-ds',
      label: 'Data Structures',
      icon: 'Layers',
      entries: [
        {
          id: 'py-heap',
          title: 'Heaps (Priority Queue)',
          content: 'heapq module implements a min-heap. Use negative values for max-heap. O(log n) push/pop, O(1) peek.',
          code: `import heapq

# Min-heap
h = []
heapq.heappush(h, 5)
heapq.heappush(h, 1)
heapq.heappush(h, 3)
print(h[0])              # 1 (peek min)
print(heapq.heappop(h))  # 1 (pop min)

# Max-heap (negate values)
max_h = []
heapq.heappush(max_h, -5)
heapq.heappush(max_h, -1)
print(-heapq.heappop(max_h))  # 5 (max)

# Heapify existing list
arr = [5, 3, 8, 1, 2]
heapq.heapify(arr)       # O(n)

# N largest / smallest
heapq.nlargest(3, arr)   # [8, 5, 3]
heapq.nsmallest(2, arr)  # [1, 2]

# With tuples (priority, value)
tasks = []
heapq.heappush(tasks, (1, "urgent"))
heapq.heappush(tasks, (3, "low"))
heapq.heappush(tasks, (2, "medium"))
print(heapq.heappop(tasks))  # (1, "urgent")`,
        },
        {
          id: 'py-deque',
          title: 'Deque (Double-Ended Queue)',
          content: 'collections.deque provides O(1) append and pop from both ends. Perfect for BFS queues, sliding windows, and stacks.',
          code: `from collections import deque

dq = deque([1, 2, 3])

# Both ends — O(1)
dq.append(4)         # right: [1,2,3,4]
dq.appendleft(0)     # left:  [0,1,2,3,4]
dq.pop()             # 4 (from right)
dq.popleft()         # 0 (from left)

# Rotate
dq = deque([1, 2, 3, 4, 5])
dq.rotate(2)         # [4, 5, 1, 2, 3]
dq.rotate(-1)        # [5, 1, 2, 3, 4]

# BFS pattern
def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return visited

# Fixed-size window
window = deque(maxlen=3)
for x in [1, 2, 3, 4, 5]:
    window.append(x)
    print(list(window))
# [1], [1,2], [1,2,3], [2,3,4], [3,4,5]`,
        },
        {
          id: 'py-bisect',
          title: 'Sorted Collections (bisect)',
          content: 'bisect module provides binary search on sorted lists. insort maintains sort order during insertion.',
          code: `import bisect

arr = [1, 3, 5, 7, 9, 11]

# Find insertion point
bisect.bisect_left(arr, 5)     # 2 (first pos >= 5)
bisect.bisect_right(arr, 5)    # 3 (first pos > 5)
bisect.bisect_left(arr, 6)     # 3 (first pos >= 6)

# Insert while maintaining order
bisect.insort(arr, 4)          # [1, 3, 4, 5, 7, 9, 11]
bisect.insort(arr, 5)          # [1, 3, 4, 5, 5, 7, 9, 11]

# Binary search using bisect
def binary_search(arr, target):
    i = bisect.bisect_left(arr, target)
    if i < len(arr) and arr[i] == target:
        return i
    return -1

# Count occurrences in sorted array
def count(arr, val):
    return bisect.bisect_right(arr, val) - bisect.bisect_left(arr, val)`,
        },
      ],
    },
    {
      id: 'py-algo',
      label: 'Algorithms',
      icon: 'Cpu',
      entries: [
        {
          id: 'py-sorting',
          title: 'Sorting',
          content: 'Built-in sort() and sorted() use Timsort (O(n log n), stable). key= parameter for custom sorting. reverse=True for descending.',
          code: `# Basic sorting
arr = [3, 1, 4, 1, 5, 9, 2, 6]
arr.sort()                        # in-place ascending
sorted_arr = sorted(arr)          # returns new list
arr.sort(reverse=True)            # descending

# Custom key
words = ["banana", "apple", "cherry", "date"]
words.sort(key=len)               # by length
words.sort(key=str.lower)         # case-insensitive

# Sort by multiple criteria
students = [("Alice", 90), ("Bob", 85), ("Charlie", 90)]
students.sort(key=lambda s: (-s[1], s[0]))
# Sort by score DESC, then name ASC

# Sort dict by value
d = {"a": 3, "b": 1, "c": 2}
sorted(d.items(), key=lambda x: x[1])
# [("b", 1), ("c", 2), ("a", 3)]`,
        },
        {
          id: 'py-binary-search',
          title: 'Binary Search',
          content: 'O(log n) search on sorted arrays. Use bisect module or write manually. Template: lo/hi pointers narrowing the search space.',
          code: `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

# Find first True (lower bound template)
def first_true(lo, hi, condition):
    """Find smallest x in [lo, hi] where condition(x) is True."""
    while lo < hi:
        mid = (lo + hi) // 2
        if condition(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo

# Example: first element >= target
arr = [1, 3, 5, 7, 9]
idx = first_true(0, len(arr), lambda i: arr[i] >= 6)
# idx = 3 (arr[3] = 7)`,
        },
        {
          id: 'py-graph',
          title: 'BFS & DFS',
          content: 'BFS uses a queue (deque) for shortest path in unweighted graphs. DFS uses recursion or explicit stack for exploration.',
          code: `from collections import deque

def bfs(graph, start):
    """BFS — shortest path in unweighted graph."""
    dist = {start: 0}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph.get(node, []):
            if neighbor not in dist:
                dist[neighbor] = dist[node] + 1
                queue.append(neighbor)
    return dist

def dfs(graph, start, visited=None):
    """DFS — recursive."""
    if visited is None:
        visited = set()
    visited.add(start)
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited

# Graph as adjacency list
graph = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 3],
    3: [1, 2],
}

print(bfs(graph, 0))   # {0: 0, 1: 1, 2: 1, 3: 2}
print(dfs(graph, 0))   # {0, 1, 2, 3}`,
        },
        {
          id: 'py-dp',
          title: 'Dynamic Programming',
          content: 'Break problems into overlapping subproblems. Two approaches: top-down (memoization with @cache) and bottom-up (tabulation with arrays).',
          code: `from functools import cache

# ── Top-down (Memoization) ──
@cache
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

# ── Bottom-up (Tabulation) ──
def fib_tab(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# ── Space-optimized ──
def fib_opt(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

# ── Classic: 0/1 Knapsack ──
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [0] * (capacity + 1)
    for i in range(n):
        for w in range(capacity, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    return dp[capacity]`,
        },
        {
          id: 'py-two-pointer',
          title: 'Two Pointers & Sliding Window',
          content: 'Two pointers technique uses two indices moving through an array. Sliding window maintains a window that expands/contracts.',
          code: `# Two Sum on sorted array
def two_sum_sorted(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo < hi:
        s = arr[lo] + arr[hi]
        if s == target:
            return [lo, hi]
        elif s < target:
            lo += 1
        else:
            hi -= 1
    return []

# Sliding window — max sum of k consecutive elements
def max_sum_k(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum

# Longest substring without repeating characters
def longest_unique_substr(s):
    seen = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        if char in seen and seen[char] >= left:
            left = seen[char] + 1
        seen[char] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
        },
      ],
    },
    {
      id: 'py-stdlib',
      label: 'Standard Library',
      icon: 'Package',
      entries: [
        {
          id: 'py-math',
          title: 'Math & Numbers',
          content: 'math module for mathematical functions. Use pow(base, exp, mod) for modular exponentiation. Python int has arbitrary precision.',
          code: `import math

math.gcd(12, 8)           # 4
math.lcm(4, 6)            # 12
math.isqrt(17)            # 4 (integer sqrt)
math.ceil(3.2)            # 4
math.floor(3.8)           # 3
math.log2(1024)           # 10.0
math.factorial(10)        # 3628800
math.comb(10, 3)          # 120 (combinations)
math.perm(10, 3)          # 720 (permutations)

# Modular exponentiation — O(log exp)
pow(2, 1000000, 10**9 + 7)  # fast!

# Infinity
float('inf')              # positive infinity
float('-inf')             # negative infinity

# Sum with start value
sum([1, 2, 3], 10)        # 16`,
        },
        {
          id: 'py-itertools',
          title: 'itertools',
          content: 'Combinatorial iterators for permutations, combinations, products. Also accumulate (prefix sums), chain, groupby.',
          code: `from itertools import (
    permutations, combinations, combinations_with_replacement,
    product, accumulate, chain, groupby, count, cycle
)

# Combinatorics
list(permutations([1,2,3], 2))
# [(1,2),(1,3),(2,1),(2,3),(3,1),(3,2)]

list(combinations([1,2,3,4], 2))
# [(1,2),(1,3),(1,4),(2,3),(2,4),(3,4)]

list(product("AB", "12"))
# [('A','1'),('A','2'),('B','1'),('B','2')]

# Prefix sums
list(accumulate([1, 2, 3, 4, 5]))
# [1, 3, 6, 10, 15]

# Flatten nested lists
list(chain([1,2], [3,4], [5,6]))
# [1, 2, 3, 4, 5, 6]

# Group consecutive equal elements
data = "AAABBCCDDDA"
for key, group in groupby(data):
    print(key, list(group))
# A ['A','A','A'], B ['B','B'], ...`,
        },
        {
          id: 'py-io',
          title: 'Fast I/O',
          content: 'sys.stdin for fast input in competitive programming. input().split() for space-separated values.',
          code: `import sys
input = sys.stdin.readline  # faster than built-in

# Read single integer
n = int(input())

# Read array of integers
arr = list(map(int, input().split()))

# Read multiple values
a, b, c = map(int, input().split())

# Read n lines
lines = [input().strip() for _ in range(n)]

# Read entire input at once
data = sys.stdin.read().split()

# Fast output
print(*arr, sep='\\n')  # one per line
sys.stdout.write(f"{result}\\n")  # fastest`,
        },
      ],
    },
    {
      id: 'py-tips',
      label: 'Tips & Tricks',
      icon: 'Sparkles',
      entries: [
        {
          id: 'py-oneliners',
          title: 'Useful One-Liners',
          content: 'Python idioms and patterns frequently used in competitive programming and interviews.',
          code: `# Swap
a, b = b, a

# Min/Max with key
max(arr, key=abs)                  # element with largest abs
min(words, key=len)                # shortest word

# Flatten 2D → 1D
flat = [x for row in matrix for x in row]

# Transpose matrix
transposed = list(zip(*matrix))

# All / Any
all(x > 0 for x in arr)           # True if all positive
any(x < 0 for x in arr)           # True if any negative

# Unzip
pairs = [(1,'a'), (2,'b'), (3,'c')]
nums, chars = zip(*pairs)

# Dictionary from two lists
d = dict(zip(keys, values))

# Remove duplicates preserving order
seen = set()
unique = [x for x in arr if x not in seen and not seen.add(x)]

# Initialize 2D array
grid = [[0] * cols for _ in range(rows)]
# NEVER: [[0] * cols] * rows  (shared reference bug!)`,
        },
        {
          id: 'py-performance',
          title: 'Performance Tips',
          content: 'Common optimizations to speed up Python code in competitive programming and data processing.',
          code: `# Use set for O(1) membership test
lookup = set(large_list)      # O(n) build
x in lookup                    # O(1) check

# String concatenation — use join
parts = []
for item in data:
    parts.append(str(item))
result = "".join(parts)        # O(n) total

# Use local variables in tight loops
def process(data):
    _len = len               # local reference
    _append = result.append  # avoid attribute lookup
    for item in data:
        _append(item)

# Avoid repeated dict/list creation
# Bad:
for i in range(n):
    temp = []  # re-created every iteration

# Good:
temp = []
for i in range(n):
    temp.clear()  # reuse

# Use collections.Counter instead of manual counting
from collections import Counter
freq = Counter(arr)  # one line!`,
        },
        {
          id: 'py-cp-template',
          title: 'Competitive Programming Template',
          content: 'A minimal template for competitive programming contests in Python.',
          code: `import sys
from collections import defaultdict, deque, Counter
from functools import cache
from itertools import accumulate
from math import gcd, lcm, isqrt, ceil, comb
from bisect import bisect_left, bisect_right, insort
import heapq

input = sys.stdin.readline
INF = float('inf')
MOD = 10**9 + 7

def solve():
    n = int(input())
    arr = list(map(int, input().split()))

    # Your solution here

    print(result)

T = int(input())
for _ in range(T):
    solve()`,
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  JAVASCRIPT                                                         */
/* ------------------------------------------------------------------ */

const javascript: LanguageConfig = {
  id: 'javascript',
  label: 'JavaScript',
  icon: '⚡',
  color: 'amber',
  officialUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  tagline: 'The language of the web',
  categories: [
    {
      id: 'js-getting-started',
      label: 'Getting Started',
      icon: 'Rocket',
      entries: [
        {
          id: 'js-hello',
          title: 'Hello World',
          content: 'JavaScript runs in browsers and Node.js. Use console.log() for output. Variables declared with const (immutable binding), let (mutable), avoid var.',
          code: `console.log("Hello, World!");

// Variables
const PI = 3.14159;          // immutable binding
let count = 0;                // mutable
const arr = [1, 2, 3];       // const binding, mutable content

// Template literals
const name = "Alice";
console.log(\`Hello, \${name}!\`);

// typeof checks
typeof 42;          // "number"
typeof "hello";     // "string"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof null;        // "object" (historical bug)
typeof [];          // "object"`,
        },
      ],
    },
    {
      id: 'js-types',
      label: 'Data Types',
      icon: 'Database',
      entries: [
        {
          id: 'js-primitives',
          title: 'Numbers, Strings & Booleans',
          content: 'JavaScript has one number type (64-bit float). BigInt for large integers. Strings are immutable. Use === for strict equality.',
          code: `// Numbers (all are 64-bit float)
const x = 42;
const y = 3.14;
Number.MAX_SAFE_INTEGER;    // 2^53 - 1
Infinity;                   // special value
NaN;                        // Not a Number

// BigInt for large numbers
const big = 9007199254740993n;
2n ** 100n;                 // very large

// Strings
const s = "hello";
s.length;                   // 5
s.toUpperCase();            // "HELLO"
s.split("");                // ["h","e","l","l","o"]
s.includes("ell");          // true
s.slice(1, 3);              // "el"
"5".padStart(3, "0");       // "005"

// Equality
42 === 42;       // true (strict — use this!)
42 == "42";      // true (loose — avoid!)`,
        },
        {
          id: 'js-arrays',
          title: 'Arrays',
          content: 'Dynamic arrays with rich methods. push/pop O(1), shift/unshift O(n). Supports destructuring, spread, and functional methods.',
          code: `const arr = [3, 1, 4, 1, 5];

// Mutating methods
arr.push(9);                 // append
arr.pop();                   // remove last
arr.unshift(0);              // prepend (O(n))
arr.shift();                 // remove first (O(n))
arr.splice(1, 2);            // remove 2 items at index 1

// Non-mutating methods
arr.slice(1, 3);             // [1, 4]
arr.concat([6, 7]);          // new array
[...arr, 8, 9];              // spread

// Functional methods
arr.map(x => x * 2);        // [6, 2, 8, 2, 10]
arr.filter(x => x > 2);     // [3, 4, 5]
arr.reduce((sum, x) => sum + x, 0);  // 14
arr.find(x => x > 3);       // 4
arr.findIndex(x => x > 3);  // 2
arr.every(x => x > 0);      // true
arr.some(x => x > 4);       // true

// Destructuring
const [first, second, ...rest] = arr;

// Create array of size n
Array.from({length: 5}, (_, i) => i);  // [0,1,2,3,4]
new Array(5).fill(0);                   // [0,0,0,0,0]`,
        },
        {
          id: 'js-objects-maps',
          title: 'Objects, Maps & Sets',
          content: 'Objects for structured data. Map for key-value with any key type. Set for unique values. All have O(1) average operations.',
          code: `// Object
const obj = { name: "Alice", age: 25 };
obj.email = "alice@example.com";
const { name, age } = obj;          // destructuring

// Map — any key type, preserves order
const map = new Map();
map.set("a", 1);
map.set(42, "hello");
map.get("a");                        // 1
map.has(42);                         // true
map.delete("a");
map.size;                            // 1

// Frequency counter
const freq = new Map();
for (const c of "abracadabra") {
  freq.set(c, (freq.get(c) ?? 0) + 1);
}

// Set — unique values
const set = new Set([1, 2, 3, 2, 1]);
set.add(4);
set.has(3);             // true
set.delete(2);
set.size;               // 3
[...new Set(arr)];      // deduplicate array

// WeakMap / WeakSet — for garbage-collectible keys`,
        },
      ],
    },
    {
      id: 'js-control',
      label: 'Control Flow',
      icon: 'GitBranch',
      entries: [
        {
          id: 'js-conditionals-loops',
          title: 'Conditionals & Loops',
          content: 'if/else, switch, ternary, for, for...of, for...in, while. Use for...of for arrays/strings, for...in for object keys.',
          code: `// Conditionals
if (x > 0) {
  console.log("positive");
} else if (x === 0) {
  console.log("zero");
} else {
  console.log("negative");
}

// Ternary
const label = x > 0 ? "positive" : "non-positive";

// Nullish coalescing & optional chaining
const val = obj?.nested?.value ?? "default";

// Loops
for (let i = 0; i < n; i++) { }

for (const item of array) { }     // values
for (const char of "hello") { }   // string chars
for (const [key, val] of map) { } // Map entries

for (const key in object) { }     // object keys

// While
let n = 100;
while (n > 1) { n = Math.floor(n / 2); }`,
        },
        {
          id: 'js-functions',
          title: 'Functions & Closures',
          content: 'Arrow functions for concise syntax. Supports default params, rest params, destructuring. Functions are first-class values.',
          code: `// Arrow function
const add = (a, b) => a + b;
const square = x => x * x;

// Default & rest params
function greet(name = "World") {
  return \`Hello, \${name}!\`;
}

function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}

// Destructuring params
function process({ name, age, scores = [] }) {
  console.log(name, age, scores);
}

// Closure
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count,
  };
}

// IIFE (Immediately Invoked)
const result = (() => {
  const temp = compute();
  return transform(temp);
})();`,
        },
      ],
    },
    {
      id: 'js-async',
      label: 'Async Programming',
      icon: 'Clock',
      entries: [
        {
          id: 'js-promises-async',
          title: 'Promises & Async/Await',
          content: 'Promises represent future values. async/await provides synchronous-looking syntax for async code. Use Promise.all for parallel execution.',
          code: `// Promise basics
const fetchData = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("data"), 1000);
  });

// Async/Await
async function getData() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// Parallel execution
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
]);

// Promise.allSettled — doesn't reject
const results = await Promise.allSettled([
  fetchA(),
  fetchB(),
]);
// [{status: "fulfilled", value: ...}, {status: "rejected", reason: ...}]`,
        },
      ],
    },
    {
      id: 'js-algo',
      label: 'Algorithms',
      icon: 'Cpu',
      entries: [
        {
          id: 'js-sorting',
          title: 'Sorting',
          content: 'Array.sort() is lexicographic by default! Always pass a comparator for numbers. Returns the mutated array.',
          code: `const arr = [3, 1, 4, 1, 5, 9];

// WRONG — lexicographic!
[10, 2, 1].sort();            // [1, 10, 2] !!

// Correct — numeric
arr.sort((a, b) => a - b);    // ascending
arr.sort((a, b) => b - a);    // descending

// Custom sort
const items = [{name: "B", val: 2}, {name: "A", val: 1}];
items.sort((a, b) => a.val - b.val);       // by value
items.sort((a, b) => a.name.localeCompare(b.name)); // by name

// Stable sort (guaranteed in modern JS)
arr.sort((a, b) => {
  if (a.priority !== b.priority) return a.priority - b.priority;
  return a.name.localeCompare(b.name);
});`,
        },
        {
          id: 'js-bfs-dfs',
          title: 'BFS & DFS',
          content: 'BFS with array queue (simple but shift is O(n)). DFS with recursion or stack.',
          code: `// BFS — shortest path
function bfs(graph, start) {
  const dist = new Map([[start, 0]]);
  const queue = [start];
  while (queue.length) {
    const node = queue.shift();
    for (const nei of graph.get(node) ?? []) {
      if (!dist.has(nei)) {
        dist.set(nei, dist.get(node) + 1);
        queue.push(nei);
      }
    }
  }
  return dist;
}

// DFS — recursive
function dfs(graph, node, visited = new Set()) {
  visited.add(node);
  for (const nei of graph.get(node) ?? []) {
    if (!visited.has(nei)) {
      dfs(graph, nei, visited);
    }
  }
  return visited;
}

// DFS — iterative with stack
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  while (stack.length) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    for (const nei of graph.get(node) ?? []) {
      stack.push(nei);
    }
  }
  return visited;
}`,
        },
        {
          id: 'js-dp',
          title: 'Dynamic Programming',
          content: 'Bottom-up tabulation or top-down with memoization using Map or plain object.',
          code: `// Bottom-up Fibonacci
function fib(n) {
  if (n <= 1) return n;
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// Top-down with memoization
function fibMemo(n, memo = new Map()) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);
  const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, result);
  return result;
}

// Generic memoize helper
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}`,
        },
      ],
    },
    {
      id: 'js-tips',
      label: 'Tips & Tricks',
      icon: 'Sparkles',
      entries: [
        {
          id: 'js-patterns',
          title: 'Useful Patterns',
          content: 'Common JavaScript patterns for competitive programming and interviews.',
          code: `// Swap
[a, b] = [b, a];

// Clone
const copy = [...arr];
const objCopy = { ...obj };
const deepCopy = structuredClone(obj);

// Remove duplicates
const unique = [...new Set(arr)];

// Group by
const grouped = arr.reduce((acc, item) => {
  const key = item.category;
  (acc[key] ??= []).push(item);
  return acc;
}, {});

// Chunk array
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) },
    (_, i) => arr.slice(i * size, (i + 1) * size));

// Bit manipulation
const isPow2 = n => n > 0 && (n & (n - 1)) === 0;
const mid = (lo + hi) >> 1;       // floor division
const single = arr.reduce((a, b) => a ^ b, 0); // XOR trick

// 2D array init
const grid = Array.from({ length: rows },
  () => new Array(cols).fill(0));`,
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  C++                                                                */
/* ------------------------------------------------------------------ */

const cpp: LanguageConfig = {
  id: 'cpp',
  label: 'C++',
  icon: '⚙️',
  color: 'blue',
  officialUrl: 'https://en.cppreference.com/',
  tagline: 'High-performance systems programming',
  categories: [
    {
      id: 'cpp-getting-started',
      label: 'Getting Started',
      icon: 'Rocket',
      entries: [
        {
          id: 'cpp-template',
          title: 'CP Template & Fast I/O',
          content: 'Most competitive programmers use bits/stdc++.h (includes everything) with fast I/O setup. Compile with: g++ -O2 -std=c++17 solution.cpp',
          code: `#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<int,int> pii;
typedef vector<int> vi;

#define all(x) (x).begin(), (x).end()
#define sz(x) (int)(x).size()

const int INF = 1e9;
const ll LINF = 1e18;
const int MOD = 1e9 + 7;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    int t;
    cin >> t;
    while (t--) {
        // solve
    }
    return 0;
}`,
        },
      ],
    },
    {
      id: 'cpp-types',
      label: 'Data Types',
      icon: 'Database',
      entries: [
        {
          id: 'cpp-primitives',
          title: 'Primitives & Strings',
          content: 'int (32-bit), long long (64-bit), double (64-bit float), char, bool, string. Use auto for type inference.',
          code: `int x = 42;                // 32-bit (-2^31 to 2^31-1)
long long big = 1e18;      // 64-bit
double pi = 3.14159;
char c = 'A';
bool ok = true;
string s = "hello";
auto val = 42;             // int inferred

// String operations
s.length();                // or s.size()
s.substr(0, 3);            // "hel"
s.find("llo");             // 2
s += " world";             // concatenate
to_string(42);             // "42"
stoi("42");                // 42
stoll("9999999999");       // long long

// Parsing with stringstream
stringstream ss("hello world 42");
string word;
int num;
ss >> word >> word >> num;  // "hello", "world", 42`,
        },
        {
          id: 'cpp-containers',
          title: 'STL Containers',
          content: 'vector (dynamic array), map/unordered_map (sorted/hash map), set/unordered_set, priority_queue, stack, queue, deque.',
          code: `// vector — dynamic array
vector<int> v = {3, 1, 4, 1, 5};
v.push_back(9);
v.pop_back();
v.size();
v.empty();
sort(all(v));

// 2D vector
vector<vector<int>> grid(n, vector<int>(m, 0));

// map — sorted, O(log n)
map<string, int> m;
m["hello"] = 1;
m.count("hello");          // 1 (exists)

// unordered_map — hash, O(1) avg
unordered_map<int, int> freq;
for (int x : arr) freq[x]++;

// set — sorted unique
set<int> s = {3, 1, 4};
s.insert(2);
auto it = s.lower_bound(2);  // iterator to >= 2

// priority_queue
priority_queue<int> maxh;                    // max-heap
priority_queue<int, vi, greater<int>> minh;  // min-heap
maxh.push(3); maxh.push(1);
maxh.top();   // 3
maxh.pop();

// stack, queue, deque
stack<int> st;
st.push(1); st.top(); st.pop();
queue<int> q;
q.push(1); q.front(); q.pop();`,
        },
      ],
    },
    {
      id: 'cpp-algo',
      label: 'Algorithms',
      icon: 'Cpu',
      entries: [
        {
          id: 'cpp-sort-search',
          title: 'Sorting & Binary Search',
          content: 'std::sort is introsort O(n log n). lower_bound/upper_bound for binary search on sorted containers.',
          code: `vector<int> v = {3, 1, 4, 1, 5};

// Sort
sort(all(v));                      // ascending
sort(all(v), greater<int>());      // descending
sort(all(v), [](int a, int b) {    // custom
    return abs(a) < abs(b);
});

// Binary search
auto it = lower_bound(all(v), 3);  // first >= 3
auto it2 = upper_bound(all(v), 3); // first > 3
bool found = binary_search(all(v), 3);

// Count in range
int cnt = upper_bound(all(v), 3) - lower_bound(all(v), 3);

// STL algorithms
reverse(all(v));
int sum = accumulate(all(v), 0);
auto [mn, mx] = minmax_element(all(v));
int g = __gcd(12, 8);  // 4
next_permutation(all(v));
int uniq = unique(all(v)) - v.begin(); // after sort`,
        },
        {
          id: 'cpp-graph',
          title: 'Graph: BFS & DFS',
          content: 'BFS with queue for shortest path. DFS with recursion. Use vector<vector<int>> for adjacency list.',
          code: `// BFS — shortest path
vector<int> bfs(vector<vector<int>>& adj, int start) {
    int n = adj.size();
    vector<int> dist(n, -1);
    queue<int> q;
    dist[start] = 0;
    q.push(start);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return dist;
}

// DFS — recursive
void dfs(vector<vector<int>>& adj, int u, vector<bool>& vis) {
    vis[u] = true;
    for (int v : adj[u]) {
        if (!vis[v]) dfs(adj, v, vis);
    }
}

// Build adjacency list
int n, m;
cin >> n >> m;
vector<vector<int>> adj(n);
for (int i = 0; i < m; i++) {
    int u, v;
    cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);  // undirected
}`,
        },
        {
          id: 'cpp-dp',
          title: 'Dynamic Programming',
          content: 'Bottom-up with arrays/vectors. memset for fast initialization. 1D optimization when possible.',
          code: `// Fibonacci
vector<ll> dp(n + 1);
dp[0] = 0; dp[1] = 1;
for (int i = 2; i <= n; i++)
    dp[i] = dp[i-1] + dp[i-2];

// 0/1 Knapsack — 1D optimization
vector<int> dp(W + 1, 0);
for (int i = 0; i < n; i++)
    for (int w = W; w >= wt[i]; w--)
        dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);

// LCS (Longest Common Subsequence)
int lcs(string& a, string& b) {
    int n = a.size(), m = b.size();
    vector<vector<int>> dp(n+1, vector<int>(m+1, 0));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            dp[i][j] = (a[i-1] == b[j-1])
                ? dp[i-1][j-1] + 1
                : max(dp[i-1][j], dp[i][j-1]);
    return dp[n][m];
}

// Common initialization
memset(dp, -1, sizeof dp);  // fill with -1
memset(dp, 0, sizeof dp);   // fill with 0
memset(dp, 0x3f, sizeof dp); // fill with ~1e9`,
        },
      ],
    },
    {
      id: 'cpp-tips',
      label: 'Tips & Tricks',
      icon: 'Sparkles',
      entries: [
        {
          id: 'cpp-pitfalls',
          title: 'Common Pitfalls & Tricks',
          content: 'Integer overflow, bit manipulation, useful macros, and common patterns for competitive programming.',
          code: `// Integer overflow — cast BEFORE multiply
ll result = (ll)a * b;

// Modular arithmetic
ll mod_add(ll a, ll b, ll m) { return ((a%m) + (b%m)) % m; }
ll mod_mul(ll a, ll b, ll m) { return ((a%m) * (b%m)) % m; }

// Bit manipulation
int popcount = __builtin_popcount(n);     // count 1-bits
int popcount64 = __builtin_popcountll(n); // for long long
int lsb = n & (-n);                       // lowest set bit
bool isPow2 = n > 0 && (n & (n-1)) == 0;

// Direction arrays for grids
int dx[] = {-1, 1, 0, 0};
int dy[] = {0, 0, -1, 1};
// With diagonals:
int dx[] = {-1,-1,-1,0,0,1,1,1};
int dy[] = {-1,0,1,-1,1,-1,0,1};

// Bounds check
auto valid = [&](int i, int j) {
    return i >= 0 && i < n && j >= 0 && j < m;
};

// Read until EOF
while (cin >> x) { }

// Lambda comparator
auto cmp = [](pii a, pii b) { return a.second > b.second; };
priority_queue<pii, vector<pii>, decltype(cmp)> pq(cmp);`,
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  JAVA                                                               */
/* ------------------------------------------------------------------ */

const java: LanguageConfig = {
  id: 'java',
  label: 'Java',
  icon: '☕',
  color: 'red',
  officialUrl: 'https://docs.oracle.com/en/java/',
  tagline: 'Enterprise-grade, strongly typed',
  categories: [
    {
      id: 'java-getting-started',
      label: 'Getting Started',
      icon: 'Rocket',
      entries: [
        {
          id: 'java-template',
          title: 'CP Template & Fast I/O',
          content: 'Use BufferedReader + StringTokenizer for fast input. PrintWriter for fast output. Scanner is too slow for competitive programming.',
          code: `import java.util.*;
import java.io.*;

public class Main {
    static BufferedReader br = new BufferedReader(
        new InputStreamReader(System.in));
    static StringBuilder out = new StringBuilder();

    static int readInt() throws Exception {
        return Integer.parseInt(br.readLine().trim());
    }

    static int[] readArr() throws Exception {
        StringTokenizer st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int[] arr = new int[n];
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++)
            arr[i] = Integer.parseInt(st.nextToken());
        return arr;
    }

    public static void main(String[] args) throws Exception {
        int t = readInt();
        while (t-- > 0) {
            // solve
        }
        System.out.print(out);
    }
}`,
        },
      ],
    },
    {
      id: 'java-types',
      label: 'Data Types',
      icon: 'Database',
      entries: [
        {
          id: 'java-collections',
          title: 'Collections Framework',
          content: 'ArrayList, HashMap, HashSet, TreeMap, TreeSet, PriorityQueue, ArrayDeque. Use wrapper types (Integer, Long) for generics.',
          code: `// ArrayList — dynamic array
List<Integer> list = new ArrayList<>(Arrays.asList(3, 1, 4));
list.add(5);
list.get(0);              // 3
list.set(0, 10);
list.remove(list.size()-1); // remove last
Collections.sort(list);

// HashMap — O(1) avg
Map<String, Integer> map = new HashMap<>();
map.put("a", 1);
map.getOrDefault("b", 0);
map.merge("a", 1, Integer::sum);  // increment
for (var entry : map.entrySet()) { }

// HashSet — unique, O(1) avg
Set<Integer> set = new HashSet<>(Arrays.asList(1,2,3));
set.contains(2);          // true

// TreeMap / TreeSet — sorted, O(log n)
TreeMap<Integer, Integer> tm = new TreeMap<>();
tm.firstKey();
tm.floorKey(5);           // largest <= 5
tm.ceilingKey(5);         // smallest >= 5

// PriorityQueue — min-heap
PriorityQueue<Integer> pq = new PriorityQueue<>();
PriorityQueue<Integer> maxPQ =
    new PriorityQueue<>(Comparator.reverseOrder());

// ArrayDeque — stack + queue
Deque<Integer> stack = new ArrayDeque<>();
stack.push(1); stack.peek(); stack.pop();
Deque<Integer> queue = new ArrayDeque<>();
queue.offer(1); queue.poll();`,
        },
      ],
    },
    {
      id: 'java-algo',
      label: 'Algorithms',
      icon: 'Cpu',
      entries: [
        {
          id: 'java-sort-search',
          title: 'Sorting & Searching',
          content: 'Arrays.sort for primitives, Collections.sort for lists. Custom Comparators with lambdas.',
          code: `int[] arr = {3, 1, 4, 1, 5};
Arrays.sort(arr);                    // ascending

// Sort with comparator (needs Integer[])
Integer[] boxed = {3, 1, 4};
Arrays.sort(boxed, (a, b) -> b - a); // descending

// Sort list of arrays
List<int[]> intervals = new ArrayList<>();
intervals.sort((a, b) -> a[0] != b[0] ? a[0]-b[0] : a[1]-b[1]);

// Binary search
int idx = Arrays.binarySearch(arr, 4);
// returns index if found, or -(insertionPoint)-1

// Collections utility
Collections.sort(list);
Collections.reverse(list);
Collections.min(list);
Collections.max(list);
Collections.frequency(list, 42);`,
        },
        {
          id: 'java-graph-dp',
          title: 'Graph & DP Patterns',
          content: 'BFS with ArrayDeque. DP with arrays. Use long to avoid overflow.',
          code: `// BFS
int[] bfs(List<List<Integer>> adj, int start) {
    int n = adj.size();
    int[] dist = new int[n];
    Arrays.fill(dist, -1);
    dist[start] = 0;
    Deque<Integer> q = new ArrayDeque<>();
    q.offer(start);
    while (!q.isEmpty()) {
        int u = q.poll();
        for (int v : adj.get(u)) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.offer(v);
            }
        }
    }
    return dist;
}

// DP — Fibonacci
long[] dp = new long[n + 1];
dp[0] = 0; dp[1] = 1;
for (int i = 2; i <= n; i++)
    dp[i] = dp[i-1] + dp[i-2];

// Memoization with array
int[] memo;
int solve(int n) {
    if (n <= 1) return n;
    if (memo[n] != -1) return memo[n];
    return memo[n] = solve(n-1) + solve(n-2);
}`,
        },
      ],
    },
    {
      id: 'java-tips',
      label: 'Tips & Tricks',
      icon: 'Sparkles',
      entries: [
        {
          id: 'java-pitfalls',
          title: 'Common Pitfalls',
          content: 'Integer overflow, String comparison, autoboxing, and modular arithmetic.',
          code: `// OVERFLOW: cast to long BEFORE multiply
long result = (long) a * b;

// STRING COMPARISON: NEVER use ==
if (s1.equals(s2)) { }       // correct!
if (s1 == s2) { }            // WRONG! compares references

// Null-safe
Objects.equals(a, b);

// Modular arithmetic
static final int MOD = 1_000_000_007;
long add = ((long)a + b) % MOD;
long mul = ((long)a * b) % MOD;

// Array to String for debugging
System.out.println(Arrays.toString(arr));
System.out.println(Arrays.deepToString(grid)); // 2D

// Streams (Java 8+)
int sum = Arrays.stream(arr).sum();
int max = Arrays.stream(arr).max().orElse(0);
List<Integer> sorted = Arrays.stream(arr)
    .boxed().sorted().collect(Collectors.toList());`,
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  GO                                                                 */
/* ------------------------------------------------------------------ */

const go: LanguageConfig = {
  id: 'go',
  label: 'Go',
  icon: '🔵',
  color: 'cyan',
  officialUrl: 'https://go.dev/doc/',
  tagline: 'Simple, fast, concurrent',
  categories: [
    {
      id: 'go-getting-started',
      label: 'Getting Started',
      icon: 'Rocket',
      entries: [
        {
          id: 'go-basics',
          title: 'Basics & Fast I/O',
          content: 'Go is statically typed with type inference (:=). No classes — use structs. Only for loops. Error handling via return values, not exceptions.',
          code: `package main

import (
    "bufio"
    "fmt"
    "os"
)

var reader *bufio.Reader

func readInt() int {
    var n int
    fmt.Fscan(reader, &n)
    return n
}

func main() {
    reader = bufio.NewReader(os.Stdin)

    n := readInt()
    arr := make([]int, n)
    for i := range arr {
        arr[i] = readInt()
    }

    fmt.Println(n)
}`,
        },
      ],
    },
    {
      id: 'go-types',
      label: 'Data Structures',
      icon: 'Database',
      entries: [
        {
          id: 'go-slices-maps',
          title: 'Slices, Maps & Custom Types',
          content: 'Slices are dynamic arrays. Maps are hash maps. No built-in set — use map[T]bool. Implement heap.Interface for priority queue.',
          code: `// Slices
arr := []int{3, 1, 4, 1, 5}
arr = append(arr, 9)
arr = arr[:len(arr)-1]        // pop
copy := make([]int, len(arr))
copy(copy, arr)

// 2D slice
grid := make([][]int, n)
for i := range grid {
    grid[i] = make([]int, m)
}

// Maps
freq := make(map[int]int)
for _, x := range arr {
    freq[x]++
}
if val, ok := freq[42]; ok {
    fmt.Println(val)
}
delete(freq, 42)

// Set pattern
seen := make(map[int]bool)
seen[42] = true
if seen[42] { }

// Sort
import "sort"
sort.Ints(arr)
sort.Slice(arr, func(i, j int) bool {
    return arr[i] > arr[j]  // descending
})`,
        },
      ],
    },
    {
      id: 'go-algo',
      label: 'Algorithms',
      icon: 'Cpu',
      entries: [
        {
          id: 'go-bfs-dfs',
          title: 'BFS, DFS & DP',
          content: 'BFS with slice queue. DFS with recursion. DP with slices. Go has no generics for min/max before 1.21.',
          code: `// BFS
func bfs(adj [][]int, start int) []int {
    n := len(adj)
    dist := make([]int, n)
    for i := range dist { dist[i] = -1 }
    dist[start] = 0
    queue := []int{start}
    for len(queue) > 0 {
        u := queue[0]
        queue = queue[1:]
        for _, v := range adj[u] {
            if dist[v] == -1 {
                dist[v] = dist[u] + 1
                queue = append(queue, v)
            }
        }
    }
    return dist
}

// DP — Fibonacci
func fib(n int) int {
    dp := make([]int, n+1)
    dp[1] = 1
    for i := 2; i <= n; i++ {
        dp[i] = dp[i-1] + dp[i-2]
    }
    return dp[n]
}

// Min/Max helper (before Go 1.21)
func min(a, b int) int {
    if a < b { return a }
    return b
}`,
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  RUST                                                               */
/* ------------------------------------------------------------------ */

const rust: LanguageConfig = {
  id: 'rust',
  label: 'Rust',
  icon: '🦀',
  color: 'orange',
  officialUrl: 'https://doc.rust-lang.org/std/',
  tagline: 'Safe, fast, fearless concurrency',
  categories: [
    {
      id: 'rust-getting-started',
      label: 'Getting Started',
      icon: 'Rocket',
      entries: [
        {
          id: 'rust-template',
          title: 'CP Template & Fast I/O',
          content: 'Read all input at once with read_to_string, then parse with split_whitespace iterator. Use BufWriter for fast output.',
          code: `use std::io::{self, Read, Write, BufWriter};

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let mut it = input.split_whitespace();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());

    macro_rules! next {
        (\$t:ty) => { it.next().unwrap().parse::<\$t>().unwrap() }
    }

    let t = next!(usize);
    for _ in 0..t {
        let n = next!(usize);
        let a: Vec<i64> = (0..n).map(|_| next!(i64)).collect();
        writeln!(out, "{}", a.iter().sum::<i64>()).unwrap();
    }
}`,
        },
      ],
    },
    {
      id: 'rust-types',
      label: 'Data Structures',
      icon: 'Database',
      entries: [
        {
          id: 'rust-collections',
          title: 'Vec, HashMap, BinaryHeap & More',
          content: 'Vec (dynamic array), HashMap/HashSet (hash-based), BTreeMap/BTreeSet (sorted), BinaryHeap (max-heap), VecDeque (double-ended queue).',
          code: `use std::collections::*;

// Vec
let mut v = vec![3, 1, 4, 1, 5];
v.push(9);
v.pop();           // Some(9)
v.sort();
v.sort_by(|a, b| b.cmp(a));  // descending

// HashMap
let mut freq = HashMap::new();
for &x in &v {
    *freq.entry(x).or_insert(0) += 1;
}

// HashSet
let mut set = HashSet::new();
set.insert(42);
set.contains(&42);  // true

// BinaryHeap (max-heap)
use std::cmp::Reverse;
let mut heap = BinaryHeap::new();
heap.push(3); heap.push(1); heap.push(5);
heap.pop();  // Some(5) — max

// Min-heap
let mut min_heap = BinaryHeap::new();
min_heap.push(Reverse(3));
min_heap.push(Reverse(1));
min_heap.pop();  // Some(Reverse(1)) — min

// VecDeque
let mut dq = VecDeque::new();
dq.push_back(1);
dq.push_front(0);
dq.pop_front();    // Some(0)`,
        },
      ],
    },
    {
      id: 'rust-algo',
      label: 'Algorithms',
      icon: 'Cpu',
      entries: [
        {
          id: 'rust-sort-search',
          title: 'Sorting & Binary Search',
          content: 'Vec::sort (stable Timsort), sort_unstable (faster). binary_search returns Ok or Err. partition_point for lower_bound.',
          code: `let mut v = vec![3, 1, 4, 1, 5];
v.sort();                           // ascending
v.sort_by(|a, b| b.cmp(a));        // descending
v.sort_by_key(|x| x.abs());        // by key

// Binary search
match v.binary_search(&4) {
    Ok(idx) => println!("Found at {}", idx),
    Err(idx) => println!("Insert at {}", idx),
}

// Lower bound equivalent
let pos = v.partition_point(|&x| x < 4);

// BFS
use std::collections::VecDeque;
fn bfs(adj: &[Vec<usize>], start: usize) -> Vec<i32> {
    let n = adj.len();
    let mut dist = vec![-1i32; n];
    let mut q = VecDeque::new();
    dist[start] = 0;
    q.push_back(start);
    while let Some(u) = q.pop_front() {
        for &v in &adj[u] {
            if dist[v] == -1 {
                dist[v] = dist[u] + 1;
                q.push_back(v);
            }
        }
    }
    dist
}`,
        },
      ],
    },
    {
      id: 'rust-tips',
      label: 'Tips & Tricks',
      icon: 'Sparkles',
      entries: [
        {
          id: 'rust-idioms',
          title: 'Rust Idioms & Iterator Magic',
          content: 'Rust iterators are zero-cost abstractions. Chain map, filter, fold for functional-style code. Ownership rules prevent common bugs.',
          code: `let v = vec![1, 2, 3, 4, 5];

// Iterator methods
let sum: i64 = v.iter().map(|&x| x as i64).sum();
let max = v.iter().max().unwrap();
let evens: Vec<_> = v.iter().filter(|&&x| x % 2 == 0).collect();
let product: i32 = v.iter().fold(1, |acc, &x| acc * x);

// Swap
let (a, b) = (b, a);
// or: std::mem::swap(&mut a, &mut b);

// 2D grid init
let grid = vec![vec![0i32; m]; n];

// Direction arrays
let dx = [-1i32, 1, 0, 0];
let dy = [0i32, 0, -1, 1];

// Enumerate
for (i, &val) in v.iter().enumerate() {
    println!("{}: {}", i, val);
}

// Windows & chunks
for window in v.windows(3) { }  // sliding window of size 3
for chunk in v.chunks(2) { }    // groups of 2`,
        },
      ],
    },
  ],
};

/* ================================================================== */
/*  Export                                                             */
/* ================================================================== */

export const ALL_LANGUAGES: LanguageConfig[] = [
  python,
  javascript,
  cpp,
  java,
  go,
  rust,
];

export function getLanguage(id: string): LanguageConfig | undefined {
  return ALL_LANGUAGES.find((l) => l.id === id);
}

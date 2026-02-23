"""
Seed the language_docs table with quick-reference documentation for 6 languages.

Idempotent — deletes existing docs for each language before re-inserting.

Usage:
    cd backend
    python scripts/seed_language_docs.py
"""

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy import delete
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.config import get_settings
from app.models.language_doc import LanguageDoc

# ── Data: (language, category, order, title, content, code_example) ────────

DOCS: list[tuple[str, str, int, str, str, str | None]] = [
    # ═══════════════════════════════════════════════════════════════
    # PYTHON
    # ═══════════════════════════════════════════════════════════════

    # Syntax Basics
    ("python", "Syntax Basics", 1, "Variables & Types",
     "Python is dynamically typed. Common types: int, float, str, bool, list, dict, set, tuple. Use type() to check.",
     "x = 42          # int\ny = 3.14        # float\ns = 'hello'     # str\nok = True       # bool\nprint(type(x))  # <class 'int'>"),

    ("python", "Syntax Basics", 2, "Control Flow",
     "Use if/elif/else for branching. Python uses indentation (not braces). Supports ternary: val = a if cond else b.",
     "x = 10\nif x > 0:\n    print('positive')\nelif x == 0:\n    print('zero')\nelse:\n    print('negative')\n\n# Ternary\nresult = 'even' if x % 2 == 0 else 'odd'"),

    ("python", "Syntax Basics", 3, "Loops",
     "for iterates over any iterable. while loops until condition is false. Use range() for index-based loops. break/continue supported.",
     "# For loop\nfor i in range(5):\n    print(i)  # 0,1,2,3,4\n\n# While loop\nn = 10\nwhile n > 0:\n    n //= 2\n\n# Enumerate\nfor i, val in enumerate(['a','b','c']):\n    print(i, val)"),

    ("python", "Syntax Basics", 4, "Functions",
     "Defined with def. Supports default args, *args, **kwargs, type hints, and lambda expressions.",
     "def gcd(a: int, b: int) -> int:\n    while b:\n        a, b = b, a % b\n    return a\n\n# Lambda\nsquare = lambda x: x * x\n\n# *args / **kwargs\ndef f(*args, **kwargs):\n    print(args, kwargs)"),

    ("python", "Syntax Basics", 5, "Error Handling",
     "Use try/except/else/finally. Catch specific exceptions. Raise with raise keyword.",
     "try:\n    val = int('abc')\nexcept ValueError as e:\n    print(f'Error: {e}')\nexcept Exception:\n    print('Unknown error')\nelse:\n    print('No error')\nfinally:\n    print('Always runs')"),

    ("python", "Syntax Basics", 6, "String Operations",
     "Strings are immutable. Use f-strings for formatting. Common: split, join, strip, find, replace, startswith.",
     "s = 'hello world'\nprint(s.split())        # ['hello', 'world']\nprint('-'.join(['a','b']))  # 'a-b'\nprint(s.upper())        # 'HELLO WORLD'\nprint(f'{len(s)} chars')  # '11 chars'\nprint(s[::-1])          # 'dlrow olleh'"),

    # Data Structures
    ("python", "Data Structures", 1, "Lists",
     "Dynamic arrays. O(1) append/pop from end, O(n) insert/remove from middle. Supports slicing.",
     "arr = [3, 1, 4, 1, 5]\narr.append(9)           # [3,1,4,1,5,9]\narr.sort()              # [1,1,3,4,5,9]\narr.pop()               # removes 9\nprint(arr[1:3])         # [1,3] (slicing)\nprint(arr[-1])          # last element"),

    ("python", "Data Structures", 2, "Dictionaries & Counter",
     "Hash maps with O(1) avg lookup. Counter counts elements. defaultdict provides default values.",
     "from collections import Counter, defaultdict\n\nd = {'a': 1, 'b': 2}\nd['c'] = 3\nprint(d.get('x', 0))   # 0 (default)\n\ncnt = Counter('abracadabra')\nprint(cnt.most_common(2))  # [('a',5),('b',2)]\n\ngraph = defaultdict(list)\ngraph[0].append(1)"),

    ("python", "Data Structures", 3, "Sets",
     "Unordered unique elements. O(1) add/remove/lookup. Supports union, intersection, difference.",
     "s = {1, 2, 3}\ns.add(4)\ns.discard(2)  # remove if exists\n\na = {1, 2, 3}\nb = {2, 3, 4}\nprint(a & b)  # {2, 3} intersection\nprint(a | b)  # {1,2,3,4} union\nprint(a - b)  # {1} difference"),

    ("python", "Data Structures", 4, "Heaps (Priority Queue)",
     "heapq provides min-heap. Use negative values for max-heap. heappush/heappop are O(log n).",
     "import heapq\n\nh = []\nheapq.heappush(h, 3)\nheapq.heappush(h, 1)\nheapq.heappush(h, 2)\nprint(heapq.heappop(h))  # 1 (smallest)\n\n# Max-heap trick\nheapq.heappush(h, -5)\nprint(-heapq.heappop(h))  # 5 (largest)"),

    ("python", "Data Structures", 5, "Deque (Stack & Queue)",
     "collections.deque is O(1) for append/pop from both ends. Use as stack (append/pop) or queue (append/popleft).",
     "from collections import deque\n\ndq = deque([1, 2, 3])\ndq.appendleft(0)    # [0,1,2,3]\ndq.append(4)        # [0,1,2,3,4]\ndq.popleft()        # 0\ndq.pop()            # 4\n\n# BFS queue pattern\nqueue = deque([start])\nwhile queue:\n    node = queue.popleft()"),

    ("python", "Data Structures", 6, "Sorted Containers",
     "Use bisect for binary search on sorted lists. SortedList from sortedcontainers for auto-sorted collections.",
     "import bisect\n\narr = [1, 3, 5, 7, 9]\nbisect.insort(arr, 4)  # [1,3,4,5,7,9]\nidx = bisect.bisect_left(arr, 5)  # 3\n\n# bisect_left: first position >= val\n# bisect_right: first position > val"),

    # Algorithms
    ("python", "Algorithms", 1, "Sorting",
     "Built-in sort() is Timsort O(n log n). Use key= for custom sorting. sorted() returns new list.",
     "arr = [3, 1, 4, 1, 5]\narr.sort()                    # in-place\narr.sort(reverse=True)        # descending\narr.sort(key=lambda x: -x)   # custom key\n\n# Sort by multiple criteria\nintervals = [(1,3),(2,1),(1,2)]\nintervals.sort(key=lambda x: (x[0], x[1]))"),

    ("python", "Algorithms", 2, "Binary Search",
     "Use bisect module or write manually. bisect_left finds insertion point for sorted list.",
     "def binary_search(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1"),

    ("python", "Algorithms", 3, "BFS / DFS",
     "BFS uses deque (queue), finds shortest path in unweighted graph. DFS uses stack or recursion.",
     "from collections import deque\n\ndef bfs(graph, start):\n    visited = {start}\n    queue = deque([start])\n    while queue:\n        node = queue.popleft()\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)"),

    ("python", "Algorithms", 4, "Two Pointers",
     "Use two indices moving towards each other or in same direction. Great for sorted arrays and sliding window.",
     "def two_sum_sorted(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo < hi:\n        s = arr[lo] + arr[hi]\n        if s == target:\n            return [lo, hi]\n        elif s < target:\n            lo += 1\n        else:\n            hi -= 1\n    return []"),

    ("python", "Algorithms", 5, "Dynamic Programming",
     "Break problems into overlapping subproblems. Use memoization (@cache) or bottom-up tabulation.",
     "from functools import cache\n\n@cache\ndef fib(n):\n    if n <= 1: return n\n    return fib(n-1) + fib(n-2)\n\n# Bottom-up\ndef fib_tab(n):\n    dp = [0] * (n + 1)\n    dp[1] = 1\n    for i in range(2, n + 1):\n        dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]"),

    # Standard Library
    ("python", "Standard Library", 1, "Math Utilities",
     "math module: gcd, lcm, sqrt, log, inf, ceil, floor. Use pow(base, exp, mod) for modular exponentiation.",
     "import math\n\nprint(math.gcd(12, 8))     # 4\nprint(math.lcm(4, 6))     # 12\nprint(math.ceil(3.2))     # 4\nprint(math.floor(3.8))    # 3\nprint(math.isqrt(17))     # 4\nprint(pow(2, 10, 1000))   # 24 (2^10 % 1000)"),

    ("python", "Standard Library", 2, "itertools",
     "Combinatorial iterators: permutations, combinations, product, accumulate, chain, groupby.",
     "from itertools import permutations, combinations, product, accumulate\n\nprint(list(permutations([1,2,3], 2)))  # all 2-perms\nprint(list(combinations([1,2,3], 2)))  # all 2-combos\nprint(list(product('ab', '12')))       # cartesian\nprint(list(accumulate([1,2,3,4])))     # prefix sums [1,3,6,10]"),

    ("python", "Standard Library", 3, "String Utilities",
     "str methods: isdigit, isalpha, isalnum, lower, upper, ord/chr for ASCII, string module for constants.",
     "print('abc123'.isalnum())  # True\nprint('abc'.isalpha())     # True\nprint(ord('a'))            # 97\nprint(chr(65))             # 'A'\n\nimport string\nprint(string.ascii_lowercase)  # 'abcdefghijklmnopqrstuvwxyz'"),

    ("python", "Standard Library", 4, "I/O for Competitive Programming",
     "Use sys.stdin for fast input. input().split() for space-separated values. map() for type conversion.",
     "import sys\ninput = sys.stdin.readline  # faster input\n\nn = int(input())\narr = list(map(int, input().split()))\n\n# Multiple values\na, b = map(int, input().split())\n\n# Print with separator\nprint(*arr, sep=' ')"),

    # Tips & Tricks
    ("python", "Tips & Tricks", 1, "List Comprehensions",
     "Concise way to create lists. Supports conditions and nested loops. Also works for sets and dicts.",
     "# Filter + transform\nevens = [x*x for x in range(10) if x % 2 == 0]\n\n# Flatten 2D\nmatrix = [[1,2],[3,4],[5,6]]\nflat = [x for row in matrix for x in row]\n\n# Dict comprehension\nd = {k: v for k, v in zip('abc', [1,2,3])}"),

    ("python", "Tips & Tricks", 2, "Common Competitive Patterns",
     "Useful one-liners and patterns for competitive programming: infinity, matrix init, zip tricks.",
     "INF = float('inf')\n\n# 2D array init\ngrid = [[0]*cols for _ in range(rows)]\n\n# Swap\na, b = b, a\n\n# Unzip\npairs = [(1,'a'), (2,'b'), (3,'c')]\nnums, chars = zip(*pairs)\n\n# All/any\nall_pos = all(x > 0 for x in arr)"),

    ("python", "Tips & Tricks", 3, "Performance Tips",
     "Use set for O(1) lookup instead of list. Avoid string concatenation in loops (use join). Use local variables in tight loops.",
     "# Bad: O(n) lookup in list\nif x in my_list: ...  # slow\n\n# Good: O(1) lookup in set\nmy_set = set(my_list)\nif x in my_set: ...   # fast\n\n# Bad: string concat in loop\ns = ''\nfor c in chars: s += c  # O(n^2)\n\n# Good: join\ns = ''.join(chars)  # O(n)"),

    # ═══════════════════════════════════════════════════════════════
    # JAVASCRIPT
    # ═══════════════════════════════════════════════════════════════

    # Syntax Basics
    ("javascript", "Syntax Basics", 1, "Variables & Types",
     "Use const (immutable binding), let (block-scoped mutable), avoid var. Types: number, string, boolean, null, undefined, object, symbol, bigint.",
     "const PI = 3.14;        // immutable binding\nlet count = 0;          // mutable\nconst arr = [1, 2, 3]; // const binding, mutable content\n\ntypeof 42;          // 'number'\ntypeof 'hello';     // 'string'\ntypeof true;        // 'boolean'"),

    ("javascript", "Syntax Basics", 2, "Control Flow",
     "if/else, switch/case, ternary operator. Use === for strict equality (no type coercion).",
     "if (x > 0) {\n  console.log('positive');\n} else if (x === 0) {\n  console.log('zero');\n} else {\n  console.log('negative');\n}\n\n// Ternary\nconst result = x % 2 === 0 ? 'even' : 'odd';"),

    ("javascript", "Syntax Basics", 3, "Loops",
     "for, for...of (values), for...in (keys). while/do-while. Array methods: forEach, map, filter, reduce.",
     "// Classic for\nfor (let i = 0; i < n; i++) { ... }\n\n// for...of (iterate values)\nfor (const val of [1, 2, 3]) { ... }\n\n// Array methods\nconst doubled = arr.map(x => x * 2);\nconst evens = arr.filter(x => x % 2 === 0);\nconst sum = arr.reduce((a, b) => a + b, 0);"),

    ("javascript", "Syntax Basics", 4, "Functions",
     "Arrow functions for concise syntax. Default params, rest params, destructuring supported.",
     "// Arrow function\nconst add = (a, b) => a + b;\n\n// Default params\nfunction greet(name = 'World') {\n  return `Hello, ${name}!`;\n}\n\n// Destructuring\nfunction solve({ nums, target }) {\n  // ...\n}"),

    ("javascript", "Syntax Basics", 5, "Error Handling",
     "try/catch/finally. Throw Error objects. Async errors caught with try/catch in async functions.",
     "try {\n  const val = JSON.parse(input);\n} catch (e) {\n  console.error(`Parse error: ${e.message}`);\n} finally {\n  console.log('done');\n}"),

    ("javascript", "Syntax Basics", 6, "String Operations",
     "Template literals with backticks. Common: split, join, trim, includes, startsWith, repeat, padStart.",
     "const s = 'hello world';\ns.split(' ');          // ['hello', 'world']\n['a','b'].join('-');   // 'a-b'\ns.includes('world');   // true\ns.slice(0, 5);         // 'hello'\n`${s.length} chars`;   // '11 chars'\n'5'.padStart(3, '0');  // '005'"),

    # Data Structures
    ("javascript", "Data Structures", 1, "Arrays",
     "Dynamic arrays. push/pop O(1), shift/unshift O(n). Supports spread, destructuring, and many methods.",
     "const arr = [3, 1, 4, 1, 5];\narr.push(9);              // append\narr.pop();                // remove last\narr.sort((a, b) => a - b); // numeric sort!\n\n// Spread\nconst copy = [...arr];\n\n// Destructuring\nconst [first, ...rest] = arr;"),

    ("javascript", "Data Structures", 2, "Map & Object",
     "Map preserves insertion order, allows any key type. O(1) get/set/delete. Use for frequency counting.",
     "const map = new Map();\nmap.set('a', 1);\nmap.set('b', 2);\nconsole.log(map.get('a'));   // 1\nconsole.log(map.has('c'));   // false\nmap.delete('b');\n\n// Frequency count\nconst freq = new Map();\nfor (const c of str) {\n  freq.set(c, (freq.get(c) || 0) + 1);\n}"),

    ("javascript", "Data Structures", 3, "Set",
     "Unique values. O(1) add/has/delete. Useful for deduplication and membership testing.",
     "const s = new Set([1, 2, 3, 2]);\ns.add(4);\ns.delete(2);\nconsole.log(s.has(3));   // true\nconsole.log(s.size);     // 3\n\n// Deduplicate array\nconst unique = [...new Set(arr)];"),

    ("javascript", "Data Structures", 4, "Stack & Queue",
     "Array as stack: push/pop. No built-in efficient queue — use array (shift is O(n)) or implement with linked list.",
     "// Stack (LIFO)\nconst stack = [];\nstack.push(1); stack.push(2);\nstack.pop();  // 2\n\n// Queue (FIFO) - simple but O(n) shift\nconst queue = [];\nqueue.push(1); queue.push(2);\nqueue.shift();  // 1"),

    ("javascript", "Data Structures", 5, "Priority Queue (Manual)",
     "No built-in heap. For competitive programming, implement a min-heap or use sorted insertion.",
     "class MinHeap {\n  constructor() { this.h = []; }\n  push(v) { this.h.push(v); this._up(this.h.length-1); }\n  pop() {\n    const top = this.h[0];\n    const last = this.h.pop();\n    if (this.h.length) { this.h[0] = last; this._down(0); }\n    return top;\n  }\n  _up(i) { /* bubble up */ }\n  _down(i) { /* sift down */ }\n}"),

    # Algorithms
    ("javascript", "Algorithms", 1, "Sorting",
     "Array.sort() is lexicographic by default! Always pass comparator for numbers. Returns mutated array.",
     "const arr = [3, 1, 4, 1, 5];\narr.sort((a, b) => a - b);      // ascending\narr.sort((a, b) => b - a);      // descending\n\n// Sort objects\nconst items = [{v:3},{v:1},{v:2}];\nitems.sort((a, b) => a.v - b.v);"),

    ("javascript", "Algorithms", 2, "Binary Search",
     "Write manually. Template: lo/hi with while(lo <= hi), adjust based on comparison.",
     "function binarySearch(arr, target) {\n  let lo = 0, hi = arr.length - 1;\n  while (lo <= hi) {\n    const mid = (lo + hi) >> 1;\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n  }\n  return -1;\n}"),

    ("javascript", "Algorithms", 3, "BFS / DFS",
     "BFS with array queue (shift — O(n) but simple). DFS with recursion or explicit stack.",
     "function bfs(graph, start) {\n  const visited = new Set([start]);\n  const queue = [start];\n  while (queue.length) {\n    const node = queue.shift();\n    for (const nei of graph[node] || []) {\n      if (!visited.has(nei)) {\n        visited.add(nei);\n        queue.push(nei);\n      }\n    }\n  }\n}"),

    ("javascript", "Algorithms", 4, "Dynamic Programming",
     "Bottom-up tabulation or top-down with memoization using Map or object cache.",
     "// Bottom-up\nfunction fib(n) {\n  const dp = [0, 1];\n  for (let i = 2; i <= n; i++)\n    dp[i] = dp[i-1] + dp[i-2];\n  return dp[n];\n}\n\n// Top-down with memo\nfunction fibMemo(n, memo = {}) {\n  if (n <= 1) return n;\n  if (memo[n]) return memo[n];\n  return memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo);\n}"),

    # Standard Library
    ("javascript", "Standard Library", 1, "Math Utilities",
     "Math object: max, min, floor, ceil, round, abs, pow, sqrt, log2, trunc. Infinity is a global.",
     "Math.max(1, 2, 3);         // 3\nMath.max(...arr);           // max of array\nMath.min(...arr);           // min of array\nMath.floor(3.7);            // 3\nMath.ceil(3.2);             // 4\nMath.abs(-5);               // 5\nNumber.MAX_SAFE_INTEGER;    // 2^53 - 1"),

    ("javascript", "Standard Library", 2, "String Utilities",
     "charCodeAt for ASCII, String.fromCharCode to convert back. repeat, padStart, padEnd for formatting.",
     "'a'.charCodeAt(0);           // 97\nString.fromCharCode(65);     // 'A'\n'abc'.repeat(3);             // 'abcabcabc'\n'42'.padStart(5, '0');       // '00042'\n'hello'.startsWith('he');    // true"),

    ("javascript", "Standard Library", 3, "Array Utilities",
     "Array.from for creating arrays. fill, flat, flatMap, findIndex, includes, indexOf.",
     "// Create array of size n\nconst arr = Array.from({length: n}, (_, i) => i);\n\n// 2D array init\nconst grid = Array.from({length: rows}, () => Array(cols).fill(0));\n\n// Flatten\n[[1,2],[3,4]].flat();  // [1,2,3,4]\n\n// Find index\narr.findIndex(x => x > 3);"),

    # Tips & Tricks
    ("javascript", "Tips & Tricks", 1, "Useful Patterns",
     "Destructuring, spread, nullish coalescing (??), optional chaining (?.), and common competitive patterns.",
     "// Swap\n[a, b] = [b, a];\n\n// Default value\nconst val = map.get(key) ?? 0;\n\n// Clone object\nconst copy = { ...obj };\n\n// Infinity\nconst INF = Infinity;\nlet min = Infinity;\n\n// Parse int from string\nconst n = Number(s);  // or parseInt(s, 10)"),

    ("javascript", "Tips & Tricks", 2, "Bit Manipulation",
     "Bitwise: &, |, ^, ~, <<, >>. Useful for flags, powers of 2, and XOR tricks.",
     "// Check if power of 2\nconst isPow2 = (n) => n > 0 && (n & (n-1)) === 0;\n\n// Integer division (floor)\nconst mid = (lo + hi) >> 1;\n\n// XOR: a^a=0, a^0=a\n// Find single number\nconst single = arr.reduce((a, b) => a ^ b, 0);"),

    ("javascript", "Tips & Tricks", 3, "BigInt for Large Numbers",
     "Use BigInt for numbers exceeding 2^53. Suffix with n or use BigInt() constructor. Cannot mix with Number.",
     "const big = 123456789012345678901234567890n;\nconst also = BigInt('999999999999999999');\n\nconsole.log(big + 1n);     // BigInt arithmetic\nconsole.log(2n ** 100n);   // very large power\n\n// Convert back\nNumber(42n);  // 42"),

    # ═══════════════════════════════════════════════════════════════
    # C++
    # ═══════════════════════════════════════════════════════════════

    # Syntax Basics
    ("cpp", "Syntax Basics", 1, "Variables & Types",
     "Statically typed. Common: int, long long, double, char, string, bool. Use auto for type inference.",
     "int x = 42;\nlong long big = 1e18;\ndouble pi = 3.14159;\nchar c = 'A';\nstring s = \"hello\";\nbool ok = true;\nauto val = 42;  // int inferred"),

    ("cpp", "Syntax Basics", 2, "Control Flow",
     "if/else, switch/case. Supports ternary. Use == for comparison.",
     "if (x > 0) {\n    cout << \"positive\" << endl;\n} else if (x == 0) {\n    cout << \"zero\" << endl;\n} else {\n    cout << \"negative\" << endl;\n}\n\n// Ternary\nint result = (x % 2 == 0) ? 1 : 0;"),

    ("cpp", "Syntax Basics", 3, "Loops",
     "for, while, do-while, range-based for. Use auto& for references in range-based loops.",
     "// Classic for\nfor (int i = 0; i < n; i++) { }\n\n// Range-based for\nvector<int> v = {1, 2, 3};\nfor (auto& x : v) { x *= 2; }  // modifies\n\n// While\nwhile (n > 0) { n /= 2; }"),

    ("cpp", "Syntax Basics", 4, "Functions",
     "Pass by value, reference (&), or const reference (const &). Templates for generic functions.",
     "int gcd(int a, int b) {\n    return b == 0 ? a : gcd(b, a % b);\n}\n\n// Pass by reference\nvoid swap(int& a, int& b) {\n    int tmp = a; a = b; b = tmp;\n}\n\n// Lambda\nauto cmp = [](int a, int b) { return a > b; };"),

    ("cpp", "Syntax Basics", 5, "Error Handling",
     "try/catch with exceptions. Competitive programming rarely uses exceptions — prefer return codes or assertions.",
     "try {\n    throw runtime_error(\"something failed\");\n} catch (const exception& e) {\n    cerr << e.what() << endl;\n}\n\n// Assert for debugging\n#include <cassert>\nassert(n > 0);  // aborts if false"),

    ("cpp", "Syntax Basics", 6, "I/O Optimization",
     "Use ios_base::sync_with_stdio(false) and cin.tie(nullptr) for fast I/O in competitive programming.",
     "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(nullptr);\n    \n    int n;\n    cin >> n;\n    vector<int> a(n);\n    for (auto& x : a) cin >> x;\n    return 0;\n}"),

    # Data Structures
    ("cpp", "Data Structures", 1, "vector",
     "Dynamic array. push_back O(1) amortized. Random access O(1). Most used container in CP.",
     "vector<int> v = {3, 1, 4};\nv.push_back(5);           // append\nv.pop_back();             // remove last\nv.size();                 // 3\nv.empty();                // false\nsort(v.begin(), v.end()); // sort ascending\n\n// 2D vector\nvector<vector<int>> grid(n, vector<int>(m, 0));"),

    ("cpp", "Data Structures", 2, "map & unordered_map",
     "map: sorted, O(log n). unordered_map: hash-based, O(1) avg. Both support [] operator for access.",
     "unordered_map<string, int> freq;\nfor (char c : s) freq[string(1,c)]++;\n\nmap<int, int> sorted_map;\nsorted_map[3] = 1;\nsorted_map[1] = 2;\n// Iterates in sorted key order\nfor (auto& [k, v] : sorted_map) {\n    cout << k << \" \" << v << endl;\n}"),

    ("cpp", "Data Structures", 3, "set & unordered_set",
     "set: sorted unique, O(log n). unordered_set: hash, O(1) avg. insert, erase, count, find.",
     "set<int> s = {3, 1, 4, 1, 5}; // {1,3,4,5}\ns.insert(2);         // {1,2,3,4,5}\ns.erase(3);          // {1,2,4,5}\ns.count(4);          // 1\nauto it = s.lower_bound(3); // iterator to >= 3"),

    ("cpp", "Data Structures", 4, "priority_queue",
     "Max-heap by default. Use greater<int> for min-heap. push/pop O(log n), top O(1).",
     "// Max-heap (default)\npriority_queue<int> maxh;\nmaxh.push(3); maxh.push(1); maxh.push(5);\nmaxh.top();  // 5\n\n// Min-heap\npriority_queue<int, vector<int>, greater<int>> minh;\nminh.push(3); minh.push(1); minh.push(5);\nminh.top();  // 1"),

    ("cpp", "Data Structures", 5, "stack & queue & deque",
     "stack: LIFO. queue: FIFO. deque: double-ended. All support push, pop, front/back/top.",
     "stack<int> st;\nst.push(1); st.push(2);\nst.top();   // 2\nst.pop();   // removes 2\n\nqueue<int> q;\nq.push(1); q.push(2);\nq.front();  // 1\nq.pop();    // removes 1\n\ndeque<int> dq;\ndq.push_back(1); dq.push_front(0);"),

    # Algorithms
    ("cpp", "Algorithms", 1, "Sorting",
     "std::sort is introsort O(n log n). Custom comparators with lambdas. stable_sort preserves order.",
     "vector<int> v = {3, 1, 4, 1, 5};\nsort(v.begin(), v.end());              // ascending\nsort(v.begin(), v.end(), greater<>());  // descending\n\n// Custom comparator\nsort(v.begin(), v.end(), [](int a, int b) {\n    return abs(a) < abs(b);\n});"),

    ("cpp", "Algorithms", 2, "Binary Search",
     "lower_bound returns iterator to first >= val. upper_bound to first > val. Both on sorted range.",
     "vector<int> v = {1, 2, 4, 4, 5, 7};\nauto it = lower_bound(v.begin(), v.end(), 4);\n// *it = 4, position = 2\n\nauto it2 = upper_bound(v.begin(), v.end(), 4);\n// *it2 = 5, position = 4\n\n// Count of 4s\nint cnt = upper_bound(...,4) - lower_bound(...,4);"),

    ("cpp", "Algorithms", 3, "BFS / DFS",
     "BFS with queue for shortest path. DFS with recursion. Use visited array to avoid cycles.",
     "void bfs(vector<vector<int>>& adj, int start) {\n    vector<bool> vis(adj.size(), false);\n    queue<int> q;\n    q.push(start); vis[start] = true;\n    while (!q.empty()) {\n        int u = q.front(); q.pop();\n        for (int v : adj[u]) {\n            if (!vis[v]) {\n                vis[v] = true;\n                q.push(v);\n            }\n        }\n    }\n}"),

    ("cpp", "Algorithms", 4, "Dynamic Programming",
     "Bottom-up with arrays/vectors. memset for initialization. Use 1D DP when possible to save space.",
     "// Fibonacci bottom-up\nvector<long long> dp(n + 1);\ndp[0] = 0; dp[1] = 1;\nfor (int i = 2; i <= n; i++)\n    dp[i] = dp[i-1] + dp[i-2];\n\n// 0/1 Knapsack\nfor (int i = 0; i < n; i++)\n    for (int w = W; w >= wt[i]; w--)\n        dp[w] = max(dp[w], dp[w-wt[i]] + val[i]);"),

    # Standard Library
    ("cpp", "Standard Library", 1, "Algorithm Header",
     "STL algorithms: min, max, swap, reverse, accumulate, unique, next_permutation, __gcd.",
     "#include <algorithm>\n#include <numeric>\n\nreverse(v.begin(), v.end());\nint sum = accumulate(v.begin(), v.end(), 0);\nauto [mn, mx] = minmax_element(v.begin(), v.end());\nint g = __gcd(12, 8);  // 4\nnext_permutation(v.begin(), v.end());"),

    ("cpp", "Standard Library", 2, "String Operations",
     "std::string: substr, find, replace, to_string, stoi, stoll. Use stringstream for parsing.",
     "string s = \"hello world\";\ns.substr(0, 5);        // \"hello\"\ns.find(\"world\");       // 6 (position)\nto_string(42);         // \"42\"\nstoi(\"123\");           // 123\nstoll(\"9999999999\");   // long long\n\n// Split by delimiter\nstringstream ss(s);\nstring word;\nwhile (ss >> word) { /* each word */ }"),

    ("cpp", "Standard Library", 3, "Useful Macros & Shortcuts",
     "Common competitive programming shortcuts and type aliases.",
     "typedef long long ll;\ntypedef pair<int,int> pii;\ntypedef vector<int> vi;\n\n#define pb push_back\n#define all(x) (x).begin(), (x).end()\n#define sz(x) (int)(x).size()\n\nconst int INF = 1e9;\nconst ll LINF = 1e18;"),

    # Tips & Tricks
    ("cpp", "Tips & Tricks", 1, "Competitive Programming Template",
     "Standard includes and fast I/O setup used by most competitive programmers.",
     "#include <bits/stdc++.h>\nusing namespace std;\ntypedef long long ll;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(nullptr);\n    \n    int t; cin >> t;\n    while (t--) {\n        // solve\n    }\n    return 0;\n}"),

    ("cpp", "Tips & Tricks", 2, "Bit Manipulation",
     "Bitwise operations for efficient computation. __builtin_popcount counts set bits.",
     "// Check if power of 2\nbool isPow2 = n > 0 && (n & (n-1)) == 0;\n\n// Count set bits\nint bits = __builtin_popcount(n);  // int\nint bits64 = __builtin_popcountll(n);  // long long\n\n// Lowest set bit\nint lsb = n & (-n);"),

    ("cpp", "Tips & Tricks", 3, "Common Pitfalls",
     "Integer overflow, uninitialized variables, and off-by-one errors are the most common bugs.",
     "// Overflow: use long long for large products\nll result = (ll)a * b;  // cast before multiply\n\n// Array bounds: always check\nif (i >= 0 && i < n && j >= 0 && j < m)\n    grid[i][j];\n\n// Modular arithmetic\nconst int MOD = 1e9 + 7;\nll ans = ((a % MOD) + (b % MOD)) % MOD;"),

    # ═══════════════════════════════════════════════════════════════
    # JAVA
    # ═══════════════════════════════════════════════════════════════

    # Syntax Basics
    ("java", "Syntax Basics", 1, "Variables & Types",
     "Strongly typed. Primitives: int, long, double, char, boolean. Wrappers: Integer, Long, etc. String is a class.",
     "int x = 42;\nlong big = 1_000_000_000L;\ndouble pi = 3.14;\nchar c = 'A';\nboolean ok = true;\nString s = \"hello\";\n\n// Auto-boxing\nInteger boxed = x;"),

    ("java", "Syntax Basics", 2, "Control Flow",
     "if/else, switch (supports strings since Java 7), ternary. Use .equals() for String comparison.",
     "if (x > 0) {\n    System.out.println(\"positive\");\n} else {\n    System.out.println(\"non-positive\");\n}\n\n// String comparison: use .equals(), NOT ==\nif (s.equals(\"hello\")) { ... }\n\n// Ternary\nint result = x > 0 ? 1 : -1;"),

    ("java", "Syntax Basics", 3, "Loops",
     "for, enhanced for-each, while, do-while. Use for-each for collections.",
     "for (int i = 0; i < n; i++) { }\n\n// Enhanced for-each\nfor (int val : arr) {\n    System.out.println(val);\n}\n\n// While\nwhile (n > 0) { n /= 2; }\n\n// Iterate map\nfor (var entry : map.entrySet()) {\n    System.out.println(entry.getKey());\n}"),

    ("java", "Syntax Basics", 4, "Functions (Methods)",
     "Methods belong to classes. Static methods can be called without an instance. Supports overloading.",
     "public static int gcd(int a, int b) {\n    return b == 0 ? a : gcd(b, a % b);\n}\n\n// Lambda (Java 8+)\nComparator<Integer> cmp = (a, b) -> a - b;\n\n// Varargs\npublic static int sum(int... nums) {\n    return Arrays.stream(nums).sum();\n}"),

    ("java", "Syntax Basics", 5, "Error Handling",
     "try/catch/finally. Checked vs unchecked exceptions. Most competitive problems don't need error handling.",
     "try {\n    int val = Integer.parseInt(\"abc\");\n} catch (NumberFormatException e) {\n    System.out.println(\"Invalid: \" + e.getMessage());\n} finally {\n    System.out.println(\"done\");\n}"),

    ("java", "Syntax Basics", 6, "I/O for Competitive Programming",
     "Use BufferedReader + StringTokenizer for fast input. PrintWriter for fast output.",
     "import java.io.*;\nimport java.util.*;\n\nBufferedReader br = new BufferedReader(\n    new InputStreamReader(System.in));\nStringTokenizer st = new StringTokenizer(br.readLine());\nint n = Integer.parseInt(st.nextToken());\nint[] a = new int[n];\nst = new StringTokenizer(br.readLine());\nfor (int i = 0; i < n; i++)\n    a[i] = Integer.parseInt(st.nextToken());"),

    # Data Structures
    ("java", "Data Structures", 1, "ArrayList",
     "Dynamic array. add O(1) amortized, get O(1), remove O(n). Most used collection.",
     "List<Integer> list = new ArrayList<>();\nlist.add(3); list.add(1); list.add(4);\nlist.get(0);           // 3\nlist.set(0, 5);        // replace\nlist.remove(list.size() - 1);  // remove last\nCollections.sort(list);"),

    ("java", "Data Structures", 2, "HashMap & TreeMap",
     "HashMap: O(1) avg. TreeMap: sorted O(log n). Both store key-value pairs.",
     "Map<String, Integer> freq = new HashMap<>();\nfor (char c : s.toCharArray())\n    freq.merge(String.valueOf(c), 1, Integer::sum);\n\nTreeMap<Integer, Integer> sorted = new TreeMap<>();\nsorted.put(3, 1);\nsorted.firstKey();       // smallest key\nsorted.floorKey(5);      // largest key <= 5"),

    ("java", "Data Structures", 3, "HashSet & TreeSet",
     "HashSet: O(1) avg. TreeSet: sorted O(log n). Both store unique values.",
     "Set<Integer> s = new HashSet<>();\ns.add(3); s.add(1); s.add(3);\ns.size();        // 2\ns.contains(3);   // true\n\nTreeSet<Integer> ts = new TreeSet<>();\nts.add(3); ts.add(1); ts.add(5);\nts.first();      // 1\nts.ceiling(2);   // 3 (smallest >= 2)"),

    ("java", "Data Structures", 4, "PriorityQueue",
     "Min-heap by default. Use Comparator.reverseOrder() for max-heap. offer/poll O(log n).",
     "// Min-heap\nPriorityQueue<Integer> minH = new PriorityQueue<>();\nminH.offer(3); minH.offer(1); minH.offer(5);\nminH.poll();  // 1\n\n// Max-heap\nPriorityQueue<Integer> maxH = new PriorityQueue<>(\n    Comparator.reverseOrder());\nmaxH.offer(3); maxH.offer(1); maxH.offer(5);\nmaxH.poll();  // 5"),

    ("java", "Data Structures", 5, "Stack & Queue & Deque",
     "Use ArrayDeque for both stack and queue (faster than Stack/LinkedList). Deque supports both ends.",
     "Deque<Integer> stack = new ArrayDeque<>();\nstack.push(1); stack.push(2);\nstack.peek();  // 2\nstack.pop();   // 2\n\nDeque<Integer> queue = new ArrayDeque<>();\nqueue.offer(1); queue.offer(2);\nqueue.poll();   // 1"),

    # Algorithms
    ("java", "Algorithms", 1, "Sorting",
     "Arrays.sort for primitives (dual-pivot quicksort). Collections.sort for lists (Timsort). Custom comparators.",
     "int[] arr = {3, 1, 4, 1, 5};\nArrays.sort(arr);  // ascending\n\n// Sort with comparator (need Integer[])\nInteger[] boxed = {3, 1, 4};\nArrays.sort(boxed, (a, b) -> b - a);  // descending\n\n// Sort list\nList<int[]> intervals = ...;\nintervals.sort((a, b) -> a[0] - b[0]);"),

    ("java", "Algorithms", 2, "Binary Search",
     "Arrays.binarySearch for sorted arrays. Returns index or -(insertion point) - 1 if not found.",
     "int[] arr = {1, 3, 5, 7, 9};\nint idx = Arrays.binarySearch(arr, 5);  // 2\n\n// Manual binary search\nint lo = 0, hi = arr.length - 1;\nwhile (lo <= hi) {\n    int mid = lo + (hi - lo) / 2;\n    if (arr[mid] == target) return mid;\n    else if (arr[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n}"),

    ("java", "Algorithms", 3, "BFS / DFS",
     "BFS with ArrayDeque queue. DFS with recursion. Use boolean[] visited.",
     "void bfs(List<List<Integer>> adj, int start) {\n    boolean[] vis = new boolean[adj.size()];\n    Deque<Integer> q = new ArrayDeque<>();\n    q.offer(start); vis[start] = true;\n    while (!q.isEmpty()) {\n        int u = q.poll();\n        for (int v : adj.get(u)) {\n            if (!vis[v]) {\n                vis[v] = true;\n                q.offer(v);\n            }\n        }\n    }\n}"),

    ("java", "Algorithms", 4, "Dynamic Programming",
     "Bottom-up with arrays. Use long for large values. Arrays.fill for initialization.",
     "// Fibonacci\nlong[] dp = new long[n + 1];\ndp[0] = 0; dp[1] = 1;\nfor (int i = 2; i <= n; i++)\n    dp[i] = dp[i-1] + dp[i-2];\n\n// Initialize with value\nint[] memo = new int[n];\nArrays.fill(memo, -1);"),

    # Standard Library
    ("java", "Standard Library", 1, "Collections Utilities",
     "Collections class: sort, reverse, min, max, frequency, binarySearch, swap, shuffle.",
     "Collections.sort(list);\nCollections.reverse(list);\nCollections.min(list);       // smallest\nCollections.max(list);       // largest\nCollections.frequency(list, 42);  // count of 42\nCollections.swap(list, 0, 1);"),

    ("java", "Standard Library", 2, "Arrays Utilities",
     "Arrays class: sort, binarySearch, fill, copyOf, asList, stream, toString.",
     "int[] arr = {3, 1, 4};\nArrays.sort(arr);\nArrays.fill(arr, 0);\nint[] copy = Arrays.copyOf(arr, arr.length);\nSystem.out.println(Arrays.toString(arr));\n\n// Array to List\nList<Integer> list = Arrays.stream(arr).boxed()\n    .collect(Collectors.toList());"),

    ("java", "Standard Library", 3, "String Operations",
     "String: charAt, substring, split, indexOf, contains, toCharArray. StringBuilder for mutation.",
     "String s = \"hello world\";\ns.charAt(0);            // 'h'\ns.substring(0, 5);      // \"hello\"\ns.split(\" \");           // [\"hello\", \"world\"]\ns.indexOf(\"world\");     // 6\ns.contains(\"llo\");      // true\n\nStringBuilder sb = new StringBuilder();\nsb.append(\"hello\").append(' ').append(\"world\");\nString result = sb.toString();"),

    # Tips & Tricks
    ("java", "Tips & Tricks", 1, "Competitive Template",
     "Standard imports and fast I/O setup for competitive programming in Java.",
     "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(\n            new InputStreamReader(System.in));\n        int t = Integer.parseInt(br.readLine().trim());\n        StringBuilder out = new StringBuilder();\n        while (t-- > 0) {\n            // solve, append to out\n        }\n        System.out.print(out);\n    }\n}"),

    ("java", "Tips & Tricks", 2, "Common Pitfalls",
     "Integer overflow (use long), String comparison (use .equals), autoboxing null checks.",
     "// Overflow: cast to long BEFORE multiply\nlong result = (long) a * b;\n\n// String comparison: NEVER use ==\nif (s1.equals(s2)) { ... }  // correct\n\n// Null-safe comparison\nif (Objects.equals(a, b)) { ... }\n\n// Modular arithmetic\nfinal int MOD = 1_000_000_007;\nlong ans = ((a % MOD) + (b % MOD)) % MOD;"),

    ("java", "Tips & Tricks", 3, "Lambda & Stream Shortcuts",
     "Java Streams for functional-style operations. Useful for quick transformations.",
     "int[] arr = {3, 1, 4, 1, 5};\nint sum = Arrays.stream(arr).sum();\nint max = Arrays.stream(arr).max().orElse(0);\nlong count = Arrays.stream(arr).filter(x -> x > 2).count();\n\n// Collect to list\nList<Integer> sorted = Arrays.stream(arr)\n    .boxed().sorted().collect(Collectors.toList());"),

    # ═══════════════════════════════════════════════════════════════
    # GO
    # ═══════════════════════════════════════════════════════════════

    # Syntax Basics
    ("go", "Syntax Basics", 1, "Variables & Types",
     "Statically typed with type inference via :=. Basic types: int, float64, string, bool, byte, rune.",
     "var x int = 42\ny := 3.14          // short declaration\ns := \"hello\"\nok := true\n\n// Multiple declaration\na, b, c := 1, 2, 3\n\n// Constants\nconst MOD = 1_000_000_007"),

    ("go", "Syntax Basics", 2, "Control Flow",
     "if/else (no parentheses needed). switch without break (falls through with fallthrough keyword). No ternary operator.",
     "if x > 0 {\n    fmt.Println(\"positive\")\n} else if x == 0 {\n    fmt.Println(\"zero\")\n} else {\n    fmt.Println(\"negative\")\n}\n\n// If with init statement\nif v := compute(); v > 10 {\n    fmt.Println(v)\n}"),

    ("go", "Syntax Basics", 3, "Loops",
     "Only for loops (no while). Three forms: classic, while-style, infinite. range for iterating slices/maps.",
     "// Classic\nfor i := 0; i < n; i++ { }\n\n// While-style\nfor n > 0 { n /= 2 }\n\n// Range over slice\nfor i, val := range arr {\n    fmt.Println(i, val)\n}\n\n// Range over map\nfor k, v := range m {\n    fmt.Println(k, v)\n}"),

    ("go", "Syntax Basics", 4, "Functions",
     "Multiple return values. Named returns. First-class functions (closures). Defer for cleanup.",
     "func gcd(a, b int) int {\n    for b != 0 {\n        a, b = b, a%b\n    }\n    return a\n}\n\n// Multiple returns\nfunc divmod(a, b int) (int, int) {\n    return a / b, a % b\n}\nq, r := divmod(10, 3)"),

    ("go", "Syntax Basics", 5, "Error Handling",
     "Go uses explicit error returns instead of exceptions. Check errors with if err != nil.",
     "import (\n    \"fmt\"\n    \"strconv\"\n)\n\nval, err := strconv.Atoi(\"42\")\nif err != nil {\n    fmt.Println(\"Error:\", err)\n    return\n}\nfmt.Println(val)"),

    # Data Structures
    ("go", "Data Structures", 1, "Slices",
     "Dynamic arrays built on top of arrays. append grows automatically. Make with make() for pre-allocation.",
     "// Create\narr := []int{3, 1, 4, 1, 5}\narr = append(arr, 9)       // append\narr = arr[:len(arr)-1]     // pop last\n\n// Pre-allocate\narr2 := make([]int, 0, 100)\n\n// Copy\ncopy := make([]int, len(arr))\ncopy(copy, arr)"),

    ("go", "Data Structures", 2, "Maps",
     "Hash maps with make(). O(1) avg operations. Check existence with comma-ok idiom.",
     "m := make(map[string]int)\nm[\"a\"] = 1\nm[\"b\"] = 2\n\n// Check existence\nif val, ok := m[\"a\"]; ok {\n    fmt.Println(val)  // 1\n}\n\n// Delete\ndelete(m, \"a\")\n\n// Frequency count\nfreq := make(map[byte]int)\nfor i := 0; i < len(s); i++ {\n    freq[s[i]]++\n}"),

    ("go", "Data Structures", 3, "Sets (via maps)",
     "No built-in set. Use map[T]bool or map[T]struct{} as a set.",
     "// Set using map[int]bool\nseen := make(map[int]bool)\nseen[42] = true\nif seen[42] {\n    fmt.Println(\"exists\")\n}\ndelete(seen, 42)\n\n// Memory-efficient: map[int]struct{}\nset := make(map[int]struct{})\nset[42] = struct{}{}\n_, exists := set[42]"),

    ("go", "Data Structures", 4, "Heap (container/heap)",
     "Implement heap.Interface (Len, Less, Swap, Push, Pop) for priority queue.",
     "import \"container/heap\"\n\ntype MinHeap []int\nfunc (h MinHeap) Len() int           { return len(h) }\nfunc (h MinHeap) Less(i, j int) bool { return h[i] < h[j] }\nfunc (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }\nfunc (h *MinHeap) Push(x any)        { *h = append(*h, x.(int)) }\nfunc (h *MinHeap) Pop() any {\n    old := *h; n := len(old)\n    x := old[n-1]; *h = old[:n-1]\n    return x\n}"),

    ("go", "Data Structures", 5, "Stack & Queue",
     "Use slices as stack (append/slice). For queue, use slice with index pointer for O(1) dequeue.",
     "// Stack\nstack := []int{}\nstack = append(stack, 1) // push\ntop := stack[len(stack)-1] // peek\nstack = stack[:len(stack)-1] // pop\n\n// Queue (simple, not O(1))\nqueue := []int{}\nqueue = append(queue, 1) // enqueue\nfront := queue[0]        // peek\nqueue = queue[1:]        // dequeue"),

    # Algorithms
    ("go", "Algorithms", 1, "Sorting",
     "sort package: sort.Ints, sort.Strings, sort.Slice with custom less function.",
     "import \"sort\"\n\narr := []int{3, 1, 4, 1, 5}\nsort.Ints(arr)  // ascending\n\n// Custom sort\nsort.Slice(arr, func(i, j int) bool {\n    return arr[i] > arr[j]  // descending\n})\n\n// Sort structs\nsort.Slice(intervals, func(i, j int) bool {\n    return intervals[i][0] < intervals[j][0]\n})"),

    ("go", "Algorithms", 2, "Binary Search",
     "sort.Search returns smallest index where f(i) is true. Manual binary search also common.",
     "import \"sort\"\n\n// sort.Search: first index where f(i) is true\narr := []int{1, 3, 5, 7, 9}\nidx := sort.SearchInts(arr, 5) // 2\n\n// Manual\nlo, hi := 0, len(arr)-1\nfor lo <= hi {\n    mid := (lo + hi) / 2\n    if arr[mid] == target { return mid }\n    if arr[mid] < target { lo = mid+1 } else { hi = mid-1 }\n}"),

    ("go", "Algorithms", 3, "BFS / DFS",
     "BFS with slice queue. DFS with recursion. Use visited slice or map.",
     "func bfs(adj [][]int, start int) {\n    n := len(adj)\n    vis := make([]bool, n)\n    queue := []int{start}\n    vis[start] = true\n    for len(queue) > 0 {\n        u := queue[0]\n        queue = queue[1:]\n        for _, v := range adj[u] {\n            if !vis[v] {\n                vis[v] = true\n                queue = append(queue, v)\n            }\n        }\n    }\n}"),

    ("go", "Algorithms", 4, "Dynamic Programming",
     "Bottom-up with slices. Use make() for initialization. Go doesn't have built-in memoization decorator.",
     "// Fibonacci\nfunc fib(n int) int {\n    dp := make([]int, n+1)\n    dp[0], dp[1] = 0, 1\n    for i := 2; i <= n; i++ {\n        dp[i] = dp[i-1] + dp[i-2]\n    }\n    return dp[n]\n}"),

    # Standard Library
    ("go", "Standard Library", 1, "fmt & strconv",
     "fmt for formatted I/O. strconv for string-number conversions. Sprintf for string formatting.",
     "import (\n    \"fmt\"\n    \"strconv\"\n)\n\nfmt.Println(\"hello\")         // print with newline\nfmt.Sprintf(\"%d-%s\", 1, \"a\") // format to string\n\nn, _ := strconv.Atoi(\"42\")   // string to int\ns := strconv.Itoa(42)        // int to string"),

    ("go", "Standard Library", 2, "strings Package",
     "String manipulation: Split, Join, Contains, HasPrefix, Repeat, ToLower, Replace, TrimSpace.",
     "import \"strings\"\n\nstrings.Split(\"a-b-c\", \"-\")    // [\"a\",\"b\",\"c\"]\nstrings.Join([]string{\"a\",\"b\"}, \"-\")  // \"a-b\"\nstrings.Contains(\"hello\", \"ell\")  // true\nstrings.HasPrefix(\"hello\", \"he\")  // true\nstrings.Repeat(\"ab\", 3)           // \"ababab\"\nstrings.ToLower(\"HELLO\")          // \"hello\""),

    ("go", "Standard Library", 3, "math Package",
     "Math functions: Max, Min (for float64), Abs, Sqrt, Pow, Inf. For int max/min, write your own.",
     "import \"math\"\n\nmath.Max(1.0, 2.0)      // 2.0 (float64 only!)\nmath.Abs(-5.0)          // 5.0\nmath.Sqrt(16.0)         // 4.0\nmath.Inf(1)             // +Infinity\n\n// Int max (no built-in before Go 1.21)\nfunc max(a, b int) int {\n    if a > b { return a }\n    return b\n}"),

    # Tips & Tricks
    ("go", "Tips & Tricks", 1, "Competitive Template",
     "Standard template with fast I/O using bufio.Scanner for competitive programming.",
     "package main\n\nimport (\n    \"bufio\"\n    \"fmt\"\n    \"os\"\n)\n\nvar reader *bufio.Reader\n\nfunc readInt() int {\n    var n int\n    fmt.Fscan(reader, &n)\n    return n\n}\n\nfunc main() {\n    reader = bufio.NewReader(os.Stdin)\n    t := readInt()\n    for ; t > 0; t-- {\n        // solve\n    }\n}"),

    ("go", "Tips & Tricks", 2, "Useful Patterns",
     "Go-specific patterns: swap, min/max for ints, 2D slice creation, direction arrays for grid problems.",
     "// Swap\na, b = b, a\n\n// Direction arrays for grid\ndx := []int{-1, 1, 0, 0}\ndy := []int{0, 0, -1, 1}\n\n// 2D slice\ngrid := make([][]int, n)\nfor i := range grid {\n    grid[i] = make([]int, m)\n}"),

    # ═══════════════════════════════════════════════════════════════
    # RUST
    # ═══════════════════════════════════════════════════════════════

    # Syntax Basics
    ("rust", "Syntax Basics", 1, "Variables & Types",
     "Immutable by default (let). Use mut for mutable. Types: i32, i64, f64, bool, char, String, &str.",
     "let x: i32 = 42;          // immutable\nlet mut count = 0;         // mutable\nlet pi: f64 = 3.14;\nlet c: char = 'A';\nlet s: String = String::from(\"hello\");\nlet slice: &str = \"world\";"),

    ("rust", "Syntax Basics", 2, "Control Flow",
     "if/else (no parentheses, must be blocks). match for pattern matching. if is an expression.",
     "let result = if x > 0 { \"positive\" } else { \"non-positive\" };\n\nmatch x {\n    1 => println!(\"one\"),\n    2..=5 => println!(\"2 to 5\"),\n    _ => println!(\"other\"),\n}"),

    ("rust", "Syntax Basics", 3, "Loops",
     "for with iterators, loop (infinite), while. Use .iter(), .iter_mut(), .into_iter().",
     "// Range-based for\nfor i in 0..n { }       // 0 to n-1\nfor i in 0..=n { }      // 0 to n (inclusive)\n\n// Iterate vector\nfor val in &arr { }     // borrow\nfor val in arr.iter().enumerate() {\n    let (i, v) = val;\n}"),

    ("rust", "Syntax Basics", 4, "Functions",
     "fn keyword. Explicit return type with ->. Last expression is implicit return. Closures with |args|.",
     "fn gcd(a: i64, b: i64) -> i64 {\n    if b == 0 { a } else { gcd(b, a % b) }\n}\n\n// Closure\nlet square = |x: i32| x * x;\nlet add = |a: i32, b: i32| -> i32 { a + b };"),

    ("rust", "Syntax Basics", 5, "Error Handling",
     "Result<T, E> and Option<T>. Use ? operator for propagation. unwrap() panics on error.",
     "fn parse(s: &str) -> Result<i32, std::num::ParseIntError> {\n    let n = s.parse::<i32>()?;\n    Ok(n * 2)\n}\n\n// Option\nlet v = vec![1, 2, 3];\nlet first: Option<&i32> = v.first();\nif let Some(val) = first {\n    println!(\"{}\", val);\n}"),

    ("rust", "Syntax Basics", 6, "String Operations",
     "String (owned, growable) vs &str (borrowed slice). push_str to append. format! for formatting.",
     "let mut s = String::from(\"hello\");\ns.push_str(\" world\");\nlet len = s.len();\nlet upper = s.to_uppercase();\nlet parts: Vec<&str> = s.split(' ').collect();\n\nlet formatted = format!(\"{} has {} chars\", s, len);"),

    # Data Structures
    ("rust", "Data Structures", 1, "Vec (Vector)",
     "Dynamic array. push O(1) amortized, pop O(1). Use vec! macro for creation.",
     "let mut v = vec![3, 1, 4, 1, 5];\nv.push(9);                  // append\nv.pop();                    // remove last -> Some(9)\nv.sort();                   // ascending\nv.sort_by(|a, b| b.cmp(a)); // descending\nv.len();                    // 5\nv.is_empty();               // false"),

    ("rust", "Data Structures", 2, "HashMap",
     "Hash map from std::collections. O(1) avg operations. entry() API for frequency counting.",
     "use std::collections::HashMap;\n\nlet mut freq = HashMap::new();\nfor c in s.chars() {\n    *freq.entry(c).or_insert(0) += 1;\n}\n\nif let Some(&val) = freq.get(&'a') {\n    println!(\"count of a: {}\", val);\n}"),

    ("rust", "Data Structures", 3, "HashSet",
     "Unique values with O(1) avg operations. Supports intersection, union, difference.",
     "use std::collections::HashSet;\n\nlet mut s: HashSet<i32> = HashSet::new();\ns.insert(1); s.insert(2); s.insert(3);\ns.contains(&2);  // true\ns.remove(&2);\n\n// Set operations\nlet a: HashSet<_> = [1,2,3].into();\nlet b: HashSet<_> = [2,3,4].into();\nlet inter: Vec<_> = a.intersection(&b).collect();"),

    ("rust", "Data Structures", 4, "BinaryHeap",
     "Max-heap by default. Use Reverse wrapper for min-heap. push/pop O(log n).",
     "use std::collections::BinaryHeap;\nuse std::cmp::Reverse;\n\n// Max-heap\nlet mut maxh = BinaryHeap::new();\nmaxh.push(3); maxh.push(1); maxh.push(5);\nassert_eq!(maxh.pop(), Some(5));\n\n// Min-heap\nlet mut minh = BinaryHeap::new();\nminh.push(Reverse(3)); minh.push(Reverse(1));\nassert_eq!(minh.pop(), Some(Reverse(1)));"),

    ("rust", "Data Structures", 5, "VecDeque",
     "Double-ended queue. O(1) push/pop from both ends. Use as stack or queue.",
     "use std::collections::VecDeque;\n\nlet mut dq = VecDeque::new();\ndq.push_back(1);     // [1]\ndq.push_front(0);    // [0, 1]\ndq.push_back(2);     // [0, 1, 2]\ndq.pop_front();      // Some(0)\ndq.pop_back();       // Some(2)"),

    # Algorithms
    ("rust", "Algorithms", 1, "Sorting",
     "Vec::sort (stable), sort_unstable (faster). sort_by for custom comparators. sort_by_key for key extraction.",
     "let mut v = vec![3, 1, 4, 1, 5];\nv.sort();                        // ascending\nv.sort_by(|a, b| b.cmp(a));     // descending\nv.sort_by_key(|x| x.abs());     // by absolute value\n\n// Sort tuples\nlet mut pairs = vec![(1,3),(2,1),(1,2)];\npairs.sort();  // sorts by first, then second"),

    ("rust", "Algorithms", 2, "Binary Search",
     "binary_search returns Ok(index) or Err(insert_pos). partition_point for lower_bound equivalent.",
     "let v = vec![1, 3, 5, 7, 9];\nlet result = v.binary_search(&5);  // Ok(2)\nlet result = v.binary_search(&4);  // Err(2) insert pos\n\n// Lower bound equivalent\nlet pos = v.partition_point(|&x| x < 4);  // 2"),

    ("rust", "Algorithms", 3, "BFS / DFS",
     "BFS with VecDeque. DFS with recursion. Use Vec<bool> for visited tracking.",
     "use std::collections::VecDeque;\n\nfn bfs(adj: &Vec<Vec<usize>>, start: usize) {\n    let n = adj.len();\n    let mut vis = vec![false; n];\n    let mut queue = VecDeque::new();\n    queue.push_back(start);\n    vis[start] = true;\n    while let Some(u) = queue.pop_front() {\n        for &v in &adj[u] {\n            if !vis[v] {\n                vis[v] = true;\n                queue.push_back(v);\n            }\n        }\n    }\n}"),

    ("rust", "Algorithms", 4, "Dynamic Programming",
     "Bottom-up with Vec. Use vec! macro for initialization.",
     "fn fib(n: usize) -> u64 {\n    let mut dp = vec![0u64; n + 1];\n    dp[1] = 1;\n    for i in 2..=n {\n        dp[i] = dp[i-1] + dp[i-2];\n    }\n    dp[n]\n}"),

    # Standard Library
    ("rust", "Standard Library", 1, "Iterator Methods",
     "Rust iterators: map, filter, fold, sum, collect, enumerate, zip, take, skip, chain, any, all.",
     "let v = vec![1, 2, 3, 4, 5];\nlet sum: i32 = v.iter().sum();\nlet max = v.iter().max().unwrap();\nlet evens: Vec<_> = v.iter().filter(|&&x| x%2==0).collect();\nlet doubled: Vec<i32> = v.iter().map(|&x| x*2).collect();\nlet product: i32 = v.iter().fold(1, |acc, &x| acc * x);"),

    ("rust", "Standard Library", 2, "String & Parse",
     "String parsing with parse(). split, trim, chars methods. format! macro for string formatting.",
     "let n: i32 = \"42\".parse().unwrap();\nlet s = \"hello world\";\nlet words: Vec<&str> = s.split_whitespace().collect();\nlet trimmed = \"  hello  \".trim();\nlet chars: Vec<char> = s.chars().collect();\n\nlet formatted = format!(\"{:05}\", 42);  // \"00042\""),

    ("rust", "Standard Library", 3, "I/O for Competitive Programming",
     "Use BufReader and BufWriter for fast I/O. read_line for input, writeln! for output.",
     "use std::io::{self, Read, Write, BufWriter};\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut iter = input.split_whitespace();\n    let stdout = io::stdout();\n    let mut out = BufWriter::new(stdout.lock());\n    \n    let n: usize = iter.next().unwrap().parse().unwrap();\n    writeln!(out, \"{}\", n).unwrap();\n}"),

    # Tips & Tricks
    ("rust", "Tips & Tricks", 1, "Useful Patterns",
     "Swap, infinity representation, direction arrays, and common competitive patterns.",
     "// Swap\nlet (a, b) = (b, a);\n// or\nstd::mem::swap(&mut a, &mut b);\n\n// Infinity\nlet inf = i64::MAX;\n\n// Direction arrays\nlet dx = [-1i32, 1, 0, 0];\nlet dy = [0i32, 0, -1, 1];\n\n// 2D vec init\nlet grid = vec![vec![0; m]; n];"),

    ("rust", "Tips & Tricks", 2, "Ownership Quick Rules",
     "Ownership: each value has one owner. Move semantics by default. Use & for borrowing, clone() for copying.",
     "let s = String::from(\"hello\");\nlet s2 = s.clone();     // deep copy\n// let s3 = s;           // s is moved, can't use after\n\n// Borrow\nfn len(s: &String) -> usize { s.len() }\nlet n = len(&s2);       // borrow, s2 still valid\n\n// Mutable borrow\nfn push(v: &mut Vec<i32>) { v.push(42); }"),

    ("rust", "Tips & Tricks", 3, "Competitive Template",
     "Minimal competitive programming template with fast I/O.",
     "use std::io::{self, Read};\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    let mut it = input.split_whitespace();\n    macro_rules! next {\n        ($t:ty) => { it.next().unwrap().parse::<$t>().unwrap() }\n    }\n    let n = next!(usize);\n    let a: Vec<i64> = (0..n).map(|_| next!(i64)).collect();\n    println!(\"{}\", a.iter().sum::<i64>());\n}"),
]


async def main() -> None:
    settings = get_settings()
    engine = create_async_engine(settings.DATABASE_URL, echo=False)
    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    # Group docs by language for summary
    lang_counts: dict[str, int] = {}
    for lang, *_ in DOCS:
        lang_counts[lang] = lang_counts.get(lang, 0) + 1

    total = len(DOCS)
    languages = sorted(lang_counts.keys())
    print(f"Seeding {total} language doc entries for {len(languages)} languages ...\n")
    for lang in languages:
        print(f"  {lang}: {lang_counts[lang]} entries")
    print()

    async with session_factory() as session:
        # Delete existing docs for idempotency
        for lang in languages:
            await session.execute(
                delete(LanguageDoc).where(LanguageDoc.language == lang)
            )
            print(f"  Cleared existing {lang} docs")

        # Insert all entries
        for i, (language, category, order, title, content, code_example) in enumerate(DOCS, 1):
            doc = LanguageDoc(
                language=language,
                category=category,
                order=order,
                title=title,
                content=content,
                code_example=code_example,
            )
            session.add(doc)

        await session.commit()
        print(f"\nSeeded {total} language doc entries successfully!")

    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(main())

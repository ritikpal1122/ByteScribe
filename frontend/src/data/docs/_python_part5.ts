// Part 5: Dictionary Methods + Set Methods

import type { DocCategory } from './types';

export const PART5_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Dictionary Methods                                          */
  /* ------------------------------------------------------------ */
  {
    id: 'dict-methods',
    label: 'Dictionary Methods',
    icon: 'Database',
    entries: [
      {
        id: 'dict-clear',
        title: 'clear() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'dict.clear() removes all key-value pairs from the dictionary in-place. It takes no parameters and returns None. After calling clear(), the dictionary becomes an empty dict {}. This is different from reassigning the variable to {} because clear() mutates the original object, so all references to that dictionary see the change.',
            code: `# Signature
dict.clear()
# Returns: None`,
          },
          {
            heading: 'Examples',
            content:
              'Clearing a dictionary removes every item while keeping the same object identity.',
            code: `config = {"host": "localhost", "port": 8080, "debug": True}
print(config)

config.clear()
print(config)

# Difference from reassignment
a = {"x": 1}
b = a        # b references the same dict
a.clear()
print(b)     # b is also empty`,
            output: `{'host': 'localhost', 'port': 8080, 'debug': True}
{}
{}`,
            analogy: 'Think of it like emptying every drawer in a filing cabinet -- the cabinet (object) stays, but all the files (key-value pairs) are removed.',
          },
        ],
        quiz: [
          {
            question: 'What does dict.clear() return?',
            options: ['An empty dictionary {}', 'The original dictionary', 'None', 'True'],
            correctIndex: 2,
            explanation: 'clear() modifies the dictionary in-place and always returns None, just like other in-place mutation methods such as list.sort().',
          },
          {
            question: 'If a = {"x": 1} and b = a, what happens to b after a.clear()?',
            options: [
              'b is still {"x": 1} because it is a separate copy',
              'b becomes {} because a and b reference the same object',
              'b becomes None',
              'A TypeError is raised',
            ],
            correctIndex: 1,
            explanation: 'Since b = a creates a reference (not a copy), both a and b point to the same dictionary object. clear() mutates that object, so b also sees the empty dictionary.',
          },
          {
            question: 'How is a.clear() different from a = {}?',
            options: [
              'There is no difference; they are identical',
              'a.clear() is slower because it deletes items one by one',
              'a = {} creates a new empty dict, while a.clear() mutates the existing object in-place',
              'a = {} also clears all references to the dictionary',
            ],
            correctIndex: 2,
            explanation: 'a = {} rebinds the variable a to a brand-new empty dictionary, leaving the original object (and any other references to it) unchanged. a.clear() empties the original object itself, so all references see the change.',
          },
        ],
        challenge: {
          prompt: 'Write a function reset_config that takes a dictionary and a list of other variables referencing the same dictionary. The function should clear the dictionary so that ALL references see the empty result. Return the number of items that were removed.',
          starterCode: `def reset_config(config: dict) -> int:
    # TODO: Count how many items are in the dictionary
    # TODO: Clear the dictionary in-place (not reassignment!)
    # TODO: Return the count of removed items
    pass

# Test
settings = {"host": "localhost", "port": 8080, "debug": True}
backup_ref = settings
removed = reset_config(settings)
print(f"Removed {removed} items")
print(f"settings: {settings}")
print(f"backup_ref: {backup_ref}")`,
          solutionCode: `def reset_config(config: dict) -> int:
    count = len(config)
    config.clear()
    return count

# Test
settings = {"host": "localhost", "port": 8080, "debug": True}
backup_ref = settings
removed = reset_config(settings)
print(f"Removed {removed} items")   # Removed 3 items
print(f"settings: {settings}")       # settings: {}
print(f"backup_ref: {backup_ref}")   # backup_ref: {}`,
          hints: [
            'Use len() to count the items before clearing.',
            'Remember: clear() mutates in-place, so all references (including backup_ref) will see the empty dict.',
            'Do NOT reassign config = {} inside the function -- that only rebinds the local variable.',
          ],
        },
      },
      {
        id: 'dict-copy',
        title: 'copy() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'dict.copy() returns a shallow copy of the dictionary. It takes no parameters. The new dictionary contains the same key-value pairs, but it is a separate object. Modifying the copy does not affect the original at the top level, but nested mutable objects are still shared between both.',
            code: `# Signature
new_dict = dict.copy()
# Returns: a new dict with the same key-value pairs`,
          },
          {
            heading: 'Examples',
            content:
              'Use copy() when you need an independent top-level duplicate of a dictionary.',
            code: `original = {"name": "Alice", "scores": [90, 85]}
clone = original.copy()

clone["name"] = "Bob"
print(original["name"])

# Nested objects are shared (shallow copy)
clone["scores"].append(77)
print(original["scores"])`,
            output: `Alice
[90, 85, 77]`,
            tip: 'For a fully independent copy including nested objects, use copy.deepcopy() from the copy module.',
            codeHighlightLines: [2, 4, 8],
          },
        ],
        quiz: [
          {
            question: 'What kind of copy does dict.copy() create?',
            options: ['Deep copy', 'Shallow copy', 'Reference copy (alias)', 'Frozen copy'],
            correctIndex: 1,
            explanation: 'dict.copy() creates a shallow copy -- the top-level keys and values are duplicated, but nested mutable objects (like lists) are still shared references.',
          },
          {
            question: 'Given original = {"scores": [90, 85]} and clone = original.copy(), what happens if you do clone["scores"].append(77)?',
            options: [
              'Only clone is affected',
              'Both original and clone see [90, 85, 77] because the list is shared',
              'A TypeError is raised',
              'original["scores"] becomes None',
            ],
            correctIndex: 1,
            explanation: 'Because copy() is shallow, both dictionaries reference the same list object. Mutating the list through one reference is visible through the other.',
          },
          {
            question: 'After clone = original.copy(), is clone is original True or False?',
            options: [
              'True -- they are the same object',
              'False -- they are different objects with the same content',
              'It raises an error',
              'It depends on the dictionary contents',
            ],
            correctIndex: 1,
            explanation: 'copy() creates a new dictionary object, so the identity check (is) returns False, even though the contents are equal (clone == original is True).',
          },
        ],
        challenge: {
          prompt: 'Write a function safe_copy that takes a dictionary and returns a truly independent deep copy using only dict.copy() and list slicing (no import allowed). Assume the dictionary has only string keys and values that are either strings or lists of strings.',
          starterCode: `def safe_copy(d: dict) -> dict:
    # TODO: Create a shallow copy first
    # TODO: For each value that is a list, replace it with a new list copy
    # TODO: Return the independent copy
    pass

# Test
original = {"name": "Alice", "tags": ["admin", "user"], "role": "manager"}
clone = safe_copy(original)
clone["tags"].append("super")
clone["name"] = "Bob"
print(f"original: {original}")
print(f"clone: {clone}")`,
          solutionCode: `def safe_copy(d: dict) -> dict:
    result = d.copy()
    for key, value in result.items():
        if isinstance(value, list):
            result[key] = value[:]
    return result

# Test
original = {"name": "Alice", "tags": ["admin", "user"], "role": "manager"}
clone = safe_copy(original)
clone["tags"].append("super")
clone["name"] = "Bob"
print(f"original: {original}")   # original: {'name': 'Alice', 'tags': ['admin', 'user'], 'role': 'manager'}
print(f"clone: {clone}")         # clone: {'name': 'Bob', 'tags': ['admin', 'user', 'super'], 'role': 'manager'}`,
          hints: [
            'Start with d.copy() to get a shallow copy of the dictionary.',
            'Iterate over the shallow copy and replace any list values with value[:] to create independent list copies.',
            'String values are immutable, so they do not need special handling.',
          ],
        },
      },
      {
        id: 'dict-fromkeys',
        title: 'fromkeys() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'dict.fromkeys(iterable, value=None) is a class method that creates a new dictionary with keys from the given iterable, all set to the same value. If value is omitted, every key maps to None. This is handy for initializing a dictionary with a known set of keys.',
            code: `# Signature
dict.fromkeys(iterable, value=None)
# Returns: a new dict`,
            diagram: {
              kind: 'custom',
              type: 'hash-map',
              data: {
                buckets: [
                  { key: '"a"', value: '0' },
                  { key: '"b"', value: '0' },
                  { key: '"c"', value: '0' },
                ],
                capacity: 3,
              },
              caption: 'dict.fromkeys(["a", "b", "c"], 0) creates a dict where every key maps to the same initial value',
            },
          },
          {
            heading: 'Examples',
            content:
              'Use fromkeys() to quickly build a dictionary from a sequence of keys.',
            code: `keys = ["a", "b", "c"]
d = dict.fromkeys(keys, 0)
print(d)

defaults = dict.fromkeys(range(3))
print(defaults)

# Caution: mutable default value is shared
d2 = dict.fromkeys(["x", "y"], [])
d2["x"].append(1)
print(d2)`,
            output: `{'a': 0, 'b': 0, 'c': 0}
{0: None, 1: None, 2: None}
{'x': [1], 'y': [1]}`,
            tip: 'Avoid using a mutable object (like a list) as the value argument because all keys will share the same reference.',
            codeHighlightLines: [2, 9, 10],
          },
        ],
        quiz: [
          {
            question: 'What is the default value used by dict.fromkeys() if the value parameter is omitted?',
            options: ['0', 'An empty string ""', 'None', 'An empty list []'],
            correctIndex: 2,
            explanation: 'When the value parameter is omitted, dict.fromkeys() assigns None to every key by default.',
          },
          {
            question: 'What happens with dict.fromkeys(["a", "b"], []) when you mutate one of the values?',
            options: [
              'Only the mutated key is affected',
              'All keys share the same list object, so all are affected',
              'A TypeError is raised because lists are not valid values',
              'The fromkeys method creates independent list copies for each key',
            ],
            correctIndex: 1,
            explanation: 'fromkeys() assigns the exact same object reference to every key. It does NOT create copies. So mutating the list through one key affects all keys.',
          },
          {
            question: 'Is dict.fromkeys() an instance method or a class method?',
            options: [
              'Instance method -- must be called on an existing dict object',
              'Class method -- can be called as dict.fromkeys() without an instance',
              'Static method',
              'A standalone function, not a method',
            ],
            correctIndex: 1,
            explanation: 'fromkeys() is a class method. You typically call it as dict.fromkeys(keys, value) without needing an existing dictionary instance.',
          },
        ],
        challenge: {
          prompt: 'Write a function safe_fromkeys that works like dict.fromkeys but creates independent copies of the default value for each key (avoiding the shared mutable reference problem). Use a dict comprehension.',
          starterCode: `def safe_fromkeys(keys, default=None):
    # TODO: If default is a list, each key should get its own copy
    # TODO: If default is a dict, each key should get its own copy
    # TODO: For immutable defaults (int, str, None, tuple), sharing is fine
    # TODO: Return the new dictionary
    pass

# Test
d = safe_fromkeys(["a", "b", "c"], [])
d["a"].append(1)
print(d)  # Should be {'a': [1], 'b': [], 'c': []}`,
          solutionCode: `def safe_fromkeys(keys, default=None):
    if isinstance(default, (list, dict, set)):
        return {k: type(default)(default) for k in keys}
    return {k: default for k in keys}

# Test
d = safe_fromkeys(["a", "b", "c"], [])
d["a"].append(1)
print(d)  # {'a': [1], 'b': [], 'c': []}`,
          hints: [
            'Use a dict comprehension: {k: ... for k in keys} to build the dictionary.',
            'For mutable types like list, dict, and set, create a copy using type(default)(default) or default.copy().',
            'Immutable types (int, str, None, tuple) are safe to share since they cannot be mutated.',
          ],
        },
      },
      {
        id: 'dict-get',
        title: 'get() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'dict.get(key, default=None) returns the value for key if key is in the dictionary, otherwise it returns default. Unlike bracket access (dict[key]), get() never raises a KeyError. The default parameter is optional and defaults to None.',
            code: `# Signature
dict.get(key, default=None)
# Returns: value for key, or default`,
            analogy: 'Think of it like a polite receptionist -- if the person you are looking for is in, they connect you. If not, instead of slamming the door (KeyError), they give you a courteous default answer.',
          },
          {
            heading: 'Examples',
            content:
              'get() is the safe way to read from a dictionary when the key might not exist.',
            code: `user = {"name": "Alice", "age": 30}

print(user.get("name"))
print(user.get("email"))
print(user.get("email", "not provided"))

# Useful in conditionals
theme = {"mode": "dark"}
font_size = theme.get("font_size", 14)
print(f"Font size: {font_size}")`,
            output: `Alice
None
not provided
Font size: 14`,
            codeHighlightLines: [3, 4, 5, 9],
          },
        ],
        quiz: [
          {
            question: 'What does dict.get(key) return when key is not present and no default is specified?',
            options: ['Raises a KeyError', 'Returns 0', 'Returns None', 'Returns False'],
            correctIndex: 2,
            explanation: 'When no default is provided, get() returns None for missing keys. This is the key difference from bracket access (dict[key]), which raises a KeyError.',
          },
          {
            question: 'Does dict.get(key, default) modify the dictionary when the key is missing?',
            options: [
              'Yes, it inserts the key with the default value',
              'No, it only returns the default without modifying the dictionary',
              'Yes, but only if the default is not None',
              'It depends on the type of the default value',
            ],
            correctIndex: 1,
            explanation: 'get() never modifies the dictionary. It simply returns the default value. If you want to insert the key when missing, use setdefault() instead.',
          },
          {
            question: 'What is the output of {"a": 0}.get("a", 99)?',
            options: ['99 because 0 is falsy', '0 because the key "a" exists', 'None', 'Raises KeyError'],
            correctIndex: 1,
            explanation: 'get() checks for key existence, not truthiness of the value. Since "a" is a valid key in the dictionary, it returns the actual value 0, regardless of the default.',
          },
        ],
        challenge: {
          prompt: 'Write a function deep_get that retrieves a value from a nested dictionary using a list of keys (key path). If any key along the path is missing, return the provided default instead of raising an error. Use dict.get() internally.',
          starterCode: `def deep_get(data: dict, keys: list, default=None):
    # TODO: Start with the full data dictionary
    # TODO: For each key in keys, use .get() to go one level deeper
    # TODO: If any intermediate value is not a dict, return default
    # TODO: Return the final value or default
    pass

# Test
config = {
    "database": {
        "primary": {"host": "localhost", "port": 5432},
        "replica": {"host": "replica.local", "port": 5433}
    }
}
print(deep_get(config, ["database", "primary", "host"]))
print(deep_get(config, ["database", "cache", "host"], "N/A"))`,
          solutionCode: `def deep_get(data: dict, keys: list, default=None):
    current = data
    for key in keys:
        if isinstance(current, dict):
            current = current.get(key, default)
        else:
            return default
    return current

# Test
config = {
    "database": {
        "primary": {"host": "localhost", "port": 5432},
        "replica": {"host": "replica.local", "port": 5433}
    }
}
print(deep_get(config, ["database", "primary", "host"]))        # localhost
print(deep_get(config, ["database", "cache", "host"], "N/A"))   # N/A`,
          hints: [
            'Use a loop to traverse the keys one at a time, updating a "current" variable.',
            'At each step, check if current is a dict before calling .get() on it.',
            'If current is not a dict (e.g., you hit a string or int midway), return the default immediately.',
          ],
        },
      },
      {
        id: 'dict-items',
        title: 'items() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'dict.items() returns a view object that displays a list of (key, value) tuple pairs. The view is dynamic -- it reflects changes made to the dictionary after the view is created. It takes no parameters.',
            code: `# Signature
dict.items()
# Returns: dict_items view of (key, value) pairs`,
          },
          {
            heading: 'Examples',
            content:
              'items() is most commonly used to iterate over key-value pairs in a for loop.',
            code: `prices = {"apple": 1.20, "banana": 0.50, "cherry": 2.00}

for fruit, price in prices.items():
    print(f"{fruit}: \${price:.2f}")

# Convert to list of tuples
pairs = list(prices.items())
print(pairs)`,
            output: `apple: $1.20
banana: $0.50
cherry: $2.00
[('apple', 1.2), ('banana', 0.5), ('cherry', 2.0)]`,
            codeHighlightLines: [3],
          },
        ],
        quiz: [
          {
            question: 'What type of object does dict.items() return?',
            options: [
              'A list of tuples',
              'A generator of tuples',
              'A dict_items view object',
              'A dict object',
            ],
            correctIndex: 2,
            explanation: 'dict.items() returns a dict_items view object, which is a dynamic view of the dictionary\'s (key, value) pairs. It is not a list, though you can convert it to one with list().',
          },
          {
            question: 'If you modify the dictionary after creating an items() view, what happens to the view?',
            options: [
              'The view reflects the changes because it is dynamic',
              'The view is frozen at the time of creation',
              'The view becomes invalid and raises an error',
              'The view only shows additions, not deletions',
            ],
            correctIndex: 0,
            explanation: 'dict.items() returns a dynamic view that reflects any subsequent changes to the dictionary. However, modifying the dictionary during iteration over the view will raise a RuntimeError.',
          },
          {
            question: 'How do you unpack key-value pairs when iterating with items()?',
            options: [
              'for (key: value) in d.items()',
              'for key, value in d.items()',
              'for [key, value] in d.items()',
              'for key => value in d.items()',
            ],
            correctIndex: 1,
            explanation: 'Python uses tuple unpacking in for loops: for key, value in d.items() destructures each (key, value) tuple into two separate variables.',
          },
        ],
        challenge: {
          prompt: 'Write a function invert_dict that takes a dictionary and returns a new dictionary with keys and values swapped. If multiple keys have the same value, collect all original keys into a list. Use dict.items() to iterate.',
          starterCode: `def invert_dict(d: dict) -> dict:
    # TODO: Create an empty result dictionary
    # TODO: Iterate over d.items() to get each (key, value) pair
    # TODO: For each pair, use the value as the new key
    # TODO: If the new key already exists, collect values into a list
    # TODO: Return the inverted dictionary
    pass

# Test
print(invert_dict({"a": 1, "b": 2, "c": 1}))
# Expected: {1: ['a', 'c'], 2: ['b']}`,
          solutionCode: `def invert_dict(d: dict) -> dict:
    result = {}
    for key, value in d.items():
        if value in result:
            result[value].append(key)
        else:
            result[value] = [key]
    return result

# Test
print(invert_dict({"a": 1, "b": 2, "c": 1}))
# {1: ['a', 'c'], 2: ['b']}`,
          hints: [
            'Use for key, value in d.items() to iterate over the pairs.',
            'For each value, check if it already exists as a key in the result dictionary.',
            'If it does, append the original key to the existing list. If not, create a new list with the key.',
          ],
        },
      },
      {
        id: 'dict-keys',
        title: 'keys() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'dict.keys() returns a view object containing all the keys of the dictionary. The view is dynamic and reflects subsequent changes to the dictionary. It takes no parameters.',
            code: `# Signature
dict.keys()
# Returns: dict_keys view`,
          },
          {
            heading: 'Examples',
            content:
              'keys() is useful for iteration, membership tests, and set-like operations.',
            code: `settings = {"volume": 75, "brightness": 50, "wifi": True}

print(list(settings.keys()))

# Membership test
print("wifi" in settings.keys())

# Set operations on keys views
a = {"x": 1, "y": 2}
b = {"y": 3, "z": 4}
print(a.keys() & b.keys())
print(a.keys() | b.keys())`,
            output: `['volume', 'brightness', 'wifi']
True
{'y'}
{'x', 'y', 'z'}`,
            analogy: 'Think of it like looking at the labels on a row of file folders -- you see all the names (keys) without opening any folder to see the contents (values).',
          },
        ],
        quiz: [
          {
            question: 'Which set-like operations are supported by dict.keys() views?',
            options: [
              'None -- keys views do not support set operations',
              'Only union (|)',
              'Intersection (&), union (|), difference (-), and symmetric difference (^)',
              'Only intersection (&) and union (|)',
            ],
            correctIndex: 2,
            explanation: 'dict.keys() views support all the standard set operations: & (intersection), | (union), - (difference), and ^ (symmetric difference) because keys are guaranteed to be unique.',
          },
          {
            question: 'Is "wifi" in settings equivalent to "wifi" in settings.keys()?',
            options: [
              'No, "in settings" checks values, not keys',
              'Yes, both check for key membership and are equivalent',
              'No, "in settings" raises a TypeError',
              'Yes, but "in settings.keys()" is significantly faster',
            ],
            correctIndex: 1,
            explanation: 'The "in" operator on a dictionary checks for key membership by default, which is equivalent to checking "in settings.keys()". Both are O(1) operations.',
          },
          {
            question: 'What does a.keys() & b.keys() return for a = {"x": 1, "y": 2} and b = {"y": 3, "z": 4}?',
            options: ["{'x', 'y', 'z'}", "{'y'}", "{'x'}", "{'y': 2}"],
            correctIndex: 1,
            explanation: 'The & operator on keys views returns the intersection -- the set of keys present in both dictionaries. Only "y" appears in both a and b.',
          },
        ],
        challenge: {
          prompt: 'Write a function find_common_keys that takes any number of dictionaries and returns a set of keys that are present in ALL of them. Use dict.keys() and set intersection.',
          starterCode: `def find_common_keys(*dicts) -> set:
    # TODO: Handle edge case of no dictionaries
    # TODO: Start with the keys of the first dictionary
    # TODO: Intersect with keys of each subsequent dictionary
    # TODO: Return the common keys as a set
    pass

# Test
d1 = {"a": 1, "b": 2, "c": 3}
d2 = {"b": 4, "c": 5, "d": 6}
d3 = {"c": 7, "b": 8, "e": 9}
print(find_common_keys(d1, d2, d3))  # {'b', 'c'}`,
          solutionCode: `def find_common_keys(*dicts) -> set:
    if not dicts:
        return set()
    common = set(dicts[0].keys())
    for d in dicts[1:]:
        common &= d.keys()
    return common

# Test
d1 = {"a": 1, "b": 2, "c": 3}
d2 = {"b": 4, "c": 5, "d": 6}
d3 = {"c": 7, "b": 8, "e": 9}
print(find_common_keys(d1, d2, d3))  # {'b', 'c'}`,
          hints: [
            'Use *dicts to accept variable number of arguments.',
            'Start by converting the first dict\'s keys to a set, then use &= to intersect with each subsequent dict\'s keys.',
            'Handle the edge case where no dictionaries are passed by returning an empty set.',
          ],
        },
      },
      {
        id: 'dict-pop',
        title: 'pop() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'dict.pop(key, default) removes the specified key and returns its value. If the key is not found and a default is given, that default is returned. If the key is not found and no default is provided, a KeyError is raised.',
            code: `# Signature
dict.pop(key[, default])
# Returns: value for key, or default`,
          },
          {
            heading: 'Examples',
            content:
              'pop() is the standard way to remove a key and use its value at the same time.',
            code: `cart = {"apple": 3, "banana": 2, "milk": 1}

removed = cart.pop("banana")
print(removed)
print(cart)

# With a default to avoid KeyError
val = cart.pop("orange", 0)
print(val)`,
            output: `2
{'apple': 3, 'milk': 1}
0`,
            codeHighlightLines: [3, 8],
          },
        ],
        quiz: [
          {
            question: 'What happens when you call dict.pop(key) without a default on a missing key?',
            options: ['Returns None', 'Returns 0', 'Raises KeyError', 'Raises ValueError'],
            correctIndex: 2,
            explanation: 'Without a default argument, dict.pop() raises a KeyError if the key is not found. Providing a default (e.g., dict.pop(key, None)) prevents the error.',
          },
          {
            question: 'What does dict.pop() return?',
            options: [
              'None always',
              'The (key, value) tuple',
              'The value associated with the removed key (or the default)',
              'True if the key was found, False otherwise',
            ],
            correctIndex: 2,
            explanation: 'dict.pop() returns the value that was associated with the removed key. If the key was not found and a default was provided, it returns that default instead.',
          },
          {
            question: 'How does dict.pop() differ from the del statement for removing dictionary keys?',
            options: [
              'There is no difference',
              'pop() returns the removed value; del does not return anything',
              'del is faster because it does not return a value',
              'pop() can only remove one key at a time',
            ],
            correctIndex: 1,
            explanation: 'The key difference is that pop() returns the value being removed, while del dict[key] removes the entry without returning anything. pop() also supports a default argument, while del raises KeyError for missing keys.',
          },
        ],
        challenge: {
          prompt: 'Write a function extract_keys that takes a dictionary and a list of keys to extract. It should return a new dictionary with only the specified keys (removed from the original) and leave the original dictionary with the remaining keys. Use dict.pop().',
          starterCode: `def extract_keys(d: dict, keys: list) -> dict:
    # TODO: Create an empty dictionary for extracted key-value pairs
    # TODO: For each key in keys, pop it from d and add to extracted
    # TODO: If a key does not exist, skip it silently
    # TODO: Return the extracted dictionary
    pass

# Test
data = {"name": "Alice", "age": 30, "email": "alice@example.com", "role": "admin"}
extracted = extract_keys(data, ["email", "role", "phone"])
print(f"extracted: {extracted}")
print(f"remaining: {data}")`,
          solutionCode: `def extract_keys(d: dict, keys: list) -> dict:
    extracted = {}
    for key in keys:
        value = d.pop(key, None)
        if value is not None:
            extracted[key] = value
    return extracted

# Test
data = {"name": "Alice", "age": 30, "email": "alice@example.com", "role": "admin"}
extracted = extract_keys(data, ["email", "role", "phone"])
print(f"extracted: {extracted}")   # extracted: {'email': 'alice@example.com', 'role': 'admin'}
print(f"remaining: {data}")        # remaining: {'name': 'Alice', 'age': 30}`,
          hints: [
            'Use dict.pop(key, None) to safely attempt removal without raising KeyError.',
            'Only add the key to the extracted dict if the pop returned a non-None value (or use a sentinel for dicts that might contain None values).',
            'The original dictionary d is mutated in-place, which is the desired behavior.',
          ],
        },
      },
      {
        id: 'dict-popitem',
        title: 'popitem() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'dict.popitem() removes and returns the last inserted (key, value) pair as a tuple. It takes no parameters. Raises KeyError if the dictionary is empty. Since Python 3.7, dictionaries maintain insertion order, so popitem() always removes the most recently added item.',
            code: `# Signature
dict.popitem()
# Returns: (key, value) tuple`,
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    A["{'wash': 'done', 'cook': 'pending', 'clean': 'pending'}"] --> B["popitem()"]
    B --> C["Returns: ('clean', 'pending')"]
    B --> D["Dict becomes: {'wash': 'done', 'cook': 'pending'}"]`,
              caption: 'popitem() removes and returns the last-inserted key-value pair (LIFO order)',
            },
          },
          {
            heading: 'Examples',
            content:
              'popitem() is useful for destructively consuming dictionary items in LIFO order.',
            code: `tasks = {"wash": "done", "cook": "pending", "clean": "pending"}

last = tasks.popitem()
print(last)
print(tasks)

# Consume all items
d = {"a": 1, "b": 2}
while d:
    print(d.popitem())`,
            output: `('clean', 'pending')
{'wash': 'done', 'cook': 'pending'}
('b', 2)
('a', 1)`,
          },
        ],
        quiz: [
          {
            question: 'What does dict.popitem() return?',
            options: [
              'Just the key of the last item',
              'Just the value of the last item',
              'A (key, value) tuple of the last-inserted item',
              'A random (key, value) tuple',
            ],
            correctIndex: 2,
            explanation: 'Since Python 3.7, popitem() follows LIFO (last-in, first-out) order and returns the last-inserted (key, value) pair as a tuple.',
          },
          {
            question: 'What happens if you call popitem() on an empty dictionary?',
            options: ['Returns None', 'Returns an empty tuple', 'Raises KeyError', 'Raises IndexError'],
            correctIndex: 2,
            explanation: 'Calling popitem() on an empty dictionary raises a KeyError, because there are no items to remove.',
          },
          {
            question: 'In Python 3.7+, which item does popitem() remove?',
            options: [
              'The first inserted item (FIFO order)',
              'The last inserted item (LIFO order)',
              'A random item',
              'The item with the smallest key',
            ],
            correctIndex: 1,
            explanation: 'Since Python 3.7 guarantees insertion order for dicts, popitem() always removes the most recently inserted key-value pair (LIFO order).',
          },
        ],
        challenge: {
          prompt: 'Write a function undo_additions that takes a dictionary and a number n, and "undoes" the last n additions by removing items in LIFO order. Return the removed items as a list of (key, value) tuples. Handle the case where n is larger than the dictionary size.',
          starterCode: `def undo_additions(d: dict, n: int) -> list:
    # TODO: Create a list to hold removed items
    # TODO: Pop items from the end, up to n times
    # TODO: Stop early if the dictionary becomes empty
    # TODO: Return the list of removed (key, value) tuples
    pass

# Test
history = {"step1": "init", "step2": "load", "step3": "process", "step4": "save"}
removed = undo_additions(history, 2)
print(f"removed: {removed}")
print(f"remaining: {history}")`,
          solutionCode: `def undo_additions(d: dict, n: int) -> list:
    removed = []
    for _ in range(n):
        if not d:
            break
        removed.append(d.popitem())
    return removed

# Test
history = {"step1": "init", "step2": "load", "step3": "process", "step4": "save"}
removed = undo_additions(history, 2)
print(f"removed: {removed}")     # removed: [('step4', 'save'), ('step3', 'process')]
print(f"remaining: {history}")   # remaining: {'step1': 'init', 'step2': 'load'}`,
          hints: [
            'Use a for loop with range(n) to pop up to n items.',
            'Check if the dictionary is empty before calling popitem() to avoid KeyError.',
            'Append each popitem() result to a list to collect the removed items.',
          ],
        },
      },
      {
        id: 'dict-setdefault',
        title: 'setdefault() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'dict.setdefault(key, default=None) returns the value for key if it exists. If the key is not present, it inserts the key with the given default value and returns that default. This combines a lookup and a conditional insert into one call.',
            code: `# Signature
dict.setdefault(key, default=None)
# Returns: value for key (existing or newly set)`,
            analogy: 'Think of it like checking into a hotel -- if your reservation (key) already exists, you get your assigned room (value). If not, they create a reservation with a default room and hand you the key.',
          },
          {
            heading: 'Examples',
            content:
              'setdefault() is especially handy for building up dicts of lists without checking for key existence.',
            code: `# Basic usage
config = {"theme": "dark"}
val = config.setdefault("theme", "light")
print(val)

lang = config.setdefault("lang", "en")
print(lang)
print(config)

# Grouping items into lists
words = ["apple", "ant", "banana", "avocado", "bat"]
by_letter = {}
for w in words:
    by_letter.setdefault(w[0], []).append(w)
print(by_letter)`,
            output: `dark
en
{'theme': 'dark', 'lang': 'en'}
{'a': ['apple', 'ant', 'avocado'], 'b': ['banana', 'bat']}`,
            tip: 'For complex default-value logic, consider collections.defaultdict which calls a factory function automatically.',
            codeHighlightLines: [3, 6, 14],
          },
        ],
        quiz: [
          {
            question: 'What does setdefault() return when the key already exists?',
            options: [
              'The default value provided',
              'The existing value for that key',
              'None',
              'A tuple of (existing_value, default)',
            ],
            correctIndex: 1,
            explanation: 'If the key already exists, setdefault() returns the existing value and does NOT modify the dictionary. The default parameter is ignored in this case.',
          },
          {
            question: 'How does setdefault() differ from get()?',
            options: [
              'They are identical in behavior',
              'setdefault() inserts the key with the default if missing; get() does not modify the dict',
              'get() inserts the key; setdefault() does not',
              'setdefault() raises KeyError for missing keys',
            ],
            correctIndex: 1,
            explanation: 'The key difference: setdefault() inserts the key into the dictionary when it is missing, while get() only returns the default without modifying the dictionary.',
          },
          {
            question: 'What is the output of config.setdefault("theme", "light") if config = {"theme": "dark"}?',
            options: ['"light"', '"dark"', 'None', '{"theme": "dark"}'],
            correctIndex: 1,
            explanation: 'Since "theme" already exists in config with value "dark", setdefault() returns the existing value "dark" and does not change anything.',
          },
        ],
        challenge: {
          prompt: 'Write a function group_by that takes a list of dictionaries and a key name, and groups them into a dictionary where each key is the value of that field, and the value is a list of matching items. Use setdefault() to build the groups.',
          starterCode: `def group_by(items: list, key: str) -> dict:
    # TODO: Create an empty result dictionary
    # TODO: Iterate over each item in items
    # TODO: Use setdefault to create/get the list for the group key
    # TODO: Append the item to its group
    # TODO: Return the grouped dictionary
    pass

# Test
people = [
    {"name": "Alice", "dept": "Engineering"},
    {"name": "Bob", "dept": "Marketing"},
    {"name": "Carol", "dept": "Engineering"},
    {"name": "Dave", "dept": "Marketing"},
    {"name": "Eve", "dept": "Engineering"},
]
result = group_by(people, "dept")
for dept, members in result.items():
    print(f"{dept}: {[m['name'] for m in members]}")`,
          solutionCode: `def group_by(items: list, key: str) -> dict:
    groups = {}
    for item in items:
        group_key = item[key]
        groups.setdefault(group_key, []).append(item)
    return groups

# Test
people = [
    {"name": "Alice", "dept": "Engineering"},
    {"name": "Bob", "dept": "Marketing"},
    {"name": "Carol", "dept": "Engineering"},
    {"name": "Dave", "dept": "Marketing"},
    {"name": "Eve", "dept": "Engineering"},
]
result = group_by(people, "dept")
for dept, members in result.items():
    print(f"{dept}: {[m['name'] for m in members]}")
# Engineering: ['Alice', 'Carol', 'Eve']
# Marketing: ['Bob', 'Dave']`,
          hints: [
            'Extract the group key value from each item using item[key].',
            'Use groups.setdefault(group_key, []) to get or create the list for that group.',
            'Chain .append(item) directly onto the setdefault() call for concise code.',
          ],
        },
      },
      {
        id: 'dict-update',
        title: 'update() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'dict.update(other) merges key-value pairs from other into the dictionary. other can be another dictionary, an iterable of (key, value) pairs, or keyword arguments. Existing keys are overwritten with values from other. Returns None.',
            code: `# Signature
dict.update([other])
# Also: dict.update(**kwargs)
# Returns: None`,
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    A["defaults: {color: blue, size: M, qty: 1}"] --> M["update()"]
    B["overrides: {size: L, qty: 5}"] --> M
    M --> C["Result: {color: blue, size: L, qty: 5}"]`,
              caption: 'update() merges in-place: existing keys are overwritten, new keys are added',
            },
          },
          {
            heading: 'Examples',
            content:
              'update() is the classic way to merge dictionaries in-place.',
            code: `defaults = {"color": "blue", "size": "M", "qty": 1}
overrides = {"size": "L", "qty": 5}

defaults.update(overrides)
print(defaults)

# From keyword arguments
d = {}
d.update(x=10, y=20)
print(d)

# From a list of tuples
d.update([("z", 30), ("x", 99)])
print(d)`,
            output: `{'color': 'blue', 'size': 'L', 'qty': 5}
{'x': 10, 'y': 20}
{'x': 99, 'y': 20, 'z': 30}`,
            codeHighlightLines: [4, 9, 13],
          },
        ],
        quiz: [
          {
            question: 'What does dict.update() return?',
            options: ['The updated dictionary', 'A new merged dictionary', 'None', 'The number of keys updated'],
            correctIndex: 2,
            explanation: 'update() modifies the dictionary in-place and returns None, following the Python convention for in-place mutation methods.',
          },
          {
            question: 'When update() encounters a key that already exists, what happens?',
            options: [
              'It raises a KeyError',
              'It skips the key and keeps the original value',
              'It overwrites the original value with the new one',
              'It creates a list of both values',
            ],
            correctIndex: 2,
            explanation: 'update() overwrites existing keys with the values from the argument. The last value wins, similar to how the {**a, **b} merge syntax works.',
          },
          {
            question: 'Which of the following is NOT a valid argument to dict.update()?',
            options: [
              'Another dictionary',
              'A list of (key, value) tuples',
              'Keyword arguments like x=10, y=20',
              'A single string',
            ],
            correctIndex: 3,
            explanation: 'update() accepts a dictionary, an iterable of (key, value) pairs, or keyword arguments. A single string would be treated as an iterable of characters, which would cause a ValueError since each character is not a (key, value) pair.',
          },
        ],
        challenge: {
          prompt: 'Write a function merge_configs that takes a base config dictionary and any number of override dictionaries. Apply overrides in order (later overrides win). Return a new merged dictionary without modifying any inputs. Use dict.copy() and dict.update().',
          starterCode: `def merge_configs(base: dict, *overrides) -> dict:
    # TODO: Create a copy of the base dictionary
    # TODO: Apply each override dictionary in order
    # TODO: Return the merged result (base should be unmodified)
    pass

# Test
base = {"host": "localhost", "port": 8080, "debug": False}
dev = {"debug": True, "log_level": "verbose"}
local = {"port": 3000}
result = merge_configs(base, dev, local)
print(f"result: {result}")
print(f"base unchanged: {base}")`,
          solutionCode: `def merge_configs(base: dict, *overrides) -> dict:
    result = base.copy()
    for override in overrides:
        result.update(override)
    return result

# Test
base = {"host": "localhost", "port": 8080, "debug": False}
dev = {"debug": True, "log_level": "verbose"}
local = {"port": 3000}
result = merge_configs(base, dev, local)
print(f"result: {result}")          # {'host': 'localhost', 'port': 3000, 'debug': True, 'log_level': 'verbose'}
print(f"base unchanged: {base}")    # {'host': 'localhost', 'port': 8080, 'debug': False}`,
          hints: [
            'Start with base.copy() to avoid mutating the original base dictionary.',
            'Loop through the overrides tuple and call result.update(override) for each one.',
            'Order matters: later overrides take precedence over earlier ones.',
          ],
        },
      },
      {
        id: 'dict-values',
        title: 'values() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'dict.values() returns a view object containing all the values of the dictionary. The view is dynamic and reflects changes to the dictionary. It takes no parameters. Unlike keys(), the values view does not support set operations because values can contain duplicates.',
            code: `# Signature
dict.values()
# Returns: dict_values view`,
          },
          {
            heading: 'Examples',
            content:
              'values() is useful for aggregation, searching, and iteration over just the values.',
            code: `scores = {"alice": 92, "bob": 85, "carol": 97}

print(list(scores.values()))

# Aggregation
print(f"Average: {sum(scores.values()) / len(scores):.1f}")

# Check if a value exists
print(85 in scores.values())`,
            output: `[92, 85, 97]
Average: 91.3
True`,
          },
        ],
        quiz: [
          {
            question: 'Why does dict.values() NOT support set operations like & and |?',
            options: [
              'It is a bug in Python',
              'Because values can contain duplicates and unhashable types',
              'Because values are always strings',
              'Because set operations only work on integers',
            ],
            correctIndex: 1,
            explanation: 'Set operations require unique, hashable elements. Dictionary values can contain duplicates and unhashable types (like lists), so the values view cannot support set operations.',
          },
          {
            question: 'What is the result of sum({"a": 10, "b": 20, "c": 30}.values())?',
            options: ['60', '"abc"', 'TypeError', '["a", "b", "c"]'],
            correctIndex: 0,
            explanation: 'dict.values() returns a view of [10, 20, 30], and sum() adds them up to 60. This works because all values are numeric.',
          },
          {
            question: 'Is the values() view dynamic or static?',
            options: [
              'Static -- it is a snapshot at creation time',
              'Dynamic -- it reflects changes to the dictionary after creation',
              'Static for reads, dynamic for writes',
              'It depends on the Python version',
            ],
            correctIndex: 1,
            explanation: 'Like keys() and items(), the values() view is dynamic and reflects any changes made to the dictionary after the view is created.',
          },
        ],
        challenge: {
          prompt: 'Write a function value_frequencies that takes a dictionary and returns a new dictionary mapping each unique value to the count of how many keys have that value. Use dict.values() to access the values.',
          starterCode: `def value_frequencies(d: dict) -> dict:
    # TODO: Iterate over the values of the dictionary
    # TODO: Count how many times each value appears
    # TODO: Return a dict mapping value -> count
    pass

# Test
grades = {"alice": "A", "bob": "B", "carol": "A", "dave": "C", "eve": "A", "frank": "B"}
print(value_frequencies(grades))
# Expected: {'A': 3, 'B': 2, 'C': 1}`,
          solutionCode: `def value_frequencies(d: dict) -> dict:
    freq = {}
    for val in d.values():
        freq[val] = freq.get(val, 0) + 1
    return freq

# Test
grades = {"alice": "A", "bob": "B", "carol": "A", "dave": "C", "eve": "A", "frank": "B"}
print(value_frequencies(grades))
# {'A': 3, 'B': 2, 'C': 1}`,
          hints: [
            'Use a for loop over d.values() to iterate through the values.',
            'Use dict.get(val, 0) to safely get the current count (defaulting to 0) before incrementing.',
            'Alternatively, you could use collections.Counter(d.values()), but the manual approach practices dict methods.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Set Methods                                                 */
  /* ------------------------------------------------------------ */
  {
    id: 'set-methods',
    label: 'Set Methods',
    icon: 'Sparkles',
    entries: [
      {
        id: 'set-add',
        title: 'add() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'set.add(elem) adds element elem to the set. If the element is already present, the set is unchanged. It takes exactly one argument and returns None. The element must be hashable.',
            code: `# Signature
set.add(elem)
# Returns: None`,
          },
          {
            heading: 'Examples',
            content:
              'add() is the primary way to insert a single element into a set.',
            code: `colors = {"red", "green"}
colors.add("blue")
print(colors)

# Adding a duplicate has no effect
colors.add("red")
print(len(colors))

# Adding a tuple (hashable) works
coords = set()
coords.add((1, 2))
coords.add((3, 4))
print(coords)`,
            output: `{'red', 'green', 'blue'}
3
{(1, 2), (3, 4)}`,
            analogy: 'Think of it like a guest list at a club -- if the name is already on the list, nothing changes. If it is new, it gets added.',
          },
        ],
        quiz: [
          {
            question: 'What does set.add() return?',
            options: ['The set with the new element', 'True if added, False if duplicate', 'None', 'The element that was added'],
            correctIndex: 2,
            explanation: 'add() modifies the set in-place and always returns None, following Python\'s convention for in-place mutation methods.',
          },
          {
            question: 'What happens if you try to add a list to a set?',
            options: [
              'The list is added as a single element',
              'Each item in the list is added separately',
              'A TypeError is raised because lists are not hashable',
              'The list is automatically converted to a tuple',
            ],
            correctIndex: 2,
            explanation: 'Set elements must be hashable. Lists are mutable and therefore not hashable, so attempting to add a list raises a TypeError. Use a tuple instead.',
          },
          {
            question: 'After s = {1, 2, 3} and s.add(2), what is len(s)?',
            options: ['3', '4', '2', 'Raises an error'],
            correctIndex: 0,
            explanation: 'Adding a duplicate element has no effect on the set. Since 2 is already present, the set remains {1, 2, 3} with length 3.',
          },
        ],
        challenge: {
          prompt: 'Write a function unique_chars that takes a string and returns a set of all unique characters in it, excluding spaces. Use set.add() in a loop rather than the set() constructor.',
          starterCode: `def unique_chars(text: str) -> set:
    # TODO: Create an empty set
    # TODO: Loop through each character in the string
    # TODO: If the character is not a space, add it to the set
    # TODO: Return the set of unique characters
    pass

# Test
result = unique_chars("hello world")
print(sorted(result))  # ['d', 'e', 'h', 'l', 'o', 'r', 'w']`,
          solutionCode: `def unique_chars(text: str) -> set:
    chars = set()
    for ch in text:
        if ch != ' ':
            chars.add(ch)
    return chars

# Test
result = unique_chars("hello world")
print(sorted(result))  # ['d', 'e', 'h', 'l', 'o', 'r', 'w']`,
          hints: [
            'Start with an empty set: chars = set().',
            'Iterate over each character in the string with a for loop.',
            'Use an if condition to skip space characters before calling add().',
          ],
        },
      },
      {
        id: 'set-clear',
        title: 'clear() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'set.clear() removes all elements from the set in-place. It takes no parameters and returns None. After calling clear(), the set becomes an empty set.',
            code: `# Signature
set.clear()
# Returns: None`,
          },
          {
            heading: 'Examples',
            content:
              'clear() empties the set while keeping the same object reference.',
            code: `tags = {"python", "coding", "tutorial"}
print(tags)

tags.clear()
print(tags)
print(type(tags))`,
            output: `{'python', 'coding', 'tutorial'}
set()
<class 'set'>`,
          },
        ],
        quiz: [
          {
            question: 'What does set.clear() return?',
            options: ['An empty set', 'The original set', 'None', 'The number of removed elements'],
            correctIndex: 2,
            explanation: 'Like all in-place mutation methods in Python, set.clear() returns None. The set itself is modified in-place.',
          },
          {
            question: 'After calling clear(), what is the type of the result?',
            options: ['NoneType', 'set (it remains a set, just empty)', 'list', 'frozenset'],
            correctIndex: 1,
            explanation: 'clear() empties the set but does not change its type. The object remains a set -- specifically an empty set, displayed as set().',
          },
          {
            question: 'How does set.clear() differ from reassigning the variable to set()?',
            options: [
              'No difference at all',
              'clear() mutates the existing object; reassignment creates a new object',
              'Reassignment is faster',
              'clear() can only be called once',
            ],
            correctIndex: 1,
            explanation: 'clear() modifies the existing set object in-place, so all references to it see the empty set. Reassignment (s = set()) creates a new empty set and rebinds the variable, leaving other references unchanged.',
          },
        ],
      },
      {
        id: 'set-copy',
        title: 'copy() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'set.copy() returns a shallow copy of the set. It takes no parameters. Since set elements must be hashable (and therefore usually immutable), a shallow copy is effectively a full independent copy in most cases.',
            code: `# Signature
set.copy()
# Returns: a new set with the same elements`,
          },
          {
            heading: 'Examples',
            content:
              'copy() creates a new set so modifications to one do not affect the other.',
            code: `original = {1, 2, 3}
clone = original.copy()

clone.add(4)
print(original)
print(clone)`,
            output: `{1, 2, 3}
{1, 2, 3, 4}`,
            tip: 'You can also copy a set with set(original) or {*original} -- all three are equivalent.',
          },
        ],
        quiz: [
          {
            question: 'Why is a shallow copy of a set effectively a full copy?',
            options: [
              'Because Python secretly does a deep copy for sets',
              'Because set elements must be hashable (typically immutable), so there are no nested mutable objects to share',
              'Because sets do not support nested objects',
              'Because copy() always performs a deep copy',
            ],
            correctIndex: 1,
            explanation: 'Set elements must be hashable, which generally means they are immutable (ints, strings, tuples). Since immutable objects cannot be changed, sharing references is safe and a shallow copy is functionally equivalent to a deep copy.',
          },
          {
            question: 'Which of the following is NOT equivalent to s.copy()?',
            options: ['set(s)', '{*s}', 's[:]', 'All are equivalent'],
            correctIndex: 2,
            explanation: 'Sets do not support slicing (s[:]), so that would raise a TypeError. Both set(s) and {*s} (unpacking) create a new set with the same elements, just like copy().',
          },
        ],
      },
      {
        id: 'set-difference',
        title: 'difference() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'set.difference(*others) returns a new set with elements that are in the set but not in any of the other iterables. You can pass one or more iterables. The original set is not modified. The - operator is an equivalent shorthand when both operands are sets.',
            code: `# Signature
set.difference(*others)
# Also: set - other_set
# Returns: a new set`,
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    A["A = {1, 2, 3, 4, 5}"] --> D["A - B"]
    B["B = {3, 4, 5, 6, 7}"] --> D
    D --> R["Result: {1, 2}"]`,
              caption: 'difference() keeps only elements that are in A but not in B',
            },
          },
          {
            heading: 'Examples',
            content:
              'difference() is useful for finding elements exclusive to one set.',
            code: `a = {1, 2, 3, 4, 5}
b = {3, 4, 5, 6, 7}

print(a.difference(b))
print(a - b)

# Multiple arguments
c = {1}
print(a.difference(b, c))`,
            output: `{1, 2}
{1, 2}
{2}`,
          },
        ],
        quiz: [
          {
            question: 'What does a.difference(b) return for a = {1, 2, 3} and b = {2, 3, 4}?',
            options: ['{1}', '{4}', '{1, 4}', '{2, 3}'],
            correctIndex: 0,
            explanation: 'difference() returns elements in a that are NOT in b. The element 1 is the only one in a but not in b, so the result is {1}.',
          },
          {
            question: 'Does the - operator work if one operand is a list instead of a set?',
            options: [
              'Yes, it works identically to difference()',
              'No, the - operator requires both operands to be sets; use difference() for other iterables',
              'It converts the list to a set automatically',
              'It raises a SyntaxError',
            ],
            correctIndex: 1,
            explanation: 'The - operator requires both operands to be sets (or frozensets). The difference() method is more flexible and accepts any iterable as arguments.',
          },
          {
            question: 'Is a.difference(b) the same as b.difference(a)?',
            options: [
              'Yes, order does not matter',
              'No, they can return different results because difference is not commutative',
              'They are the same only if the sets are equal',
              'It depends on the element types',
            ],
            correctIndex: 1,
            explanation: 'Set difference is NOT commutative. a - b returns elements in a not in b, while b - a returns elements in b not in a. These are generally different sets.',
          },
        ],
        challenge: {
          prompt: 'Write a function find_missing that takes two lists -- required_items and available_items -- and returns a sorted list of items that are required but not available. Use set difference.',
          starterCode: `def find_missing(required: list, available: list) -> list:
    # TODO: Convert both lists to sets
    # TODO: Find the difference (required but not available)
    # TODO: Return the result as a sorted list
    pass

# Test
required = ["eggs", "milk", "bread", "butter", "cheese"]
available = ["milk", "cheese", "juice", "eggs"]
print(find_missing(required, available))  # ['bread', 'butter']`,
          solutionCode: `def find_missing(required: list, available: list) -> list:
    required_set = set(required)
    available_set = set(available)
    missing = required_set - available_set
    return sorted(missing)

# Test
required = ["eggs", "milk", "bread", "butter", "cheese"]
available = ["milk", "cheese", "juice", "eggs"]
print(find_missing(required, available))  # ['bread', 'butter']`,
          hints: [
            'Convert both lists to sets using set().',
            'Use the - operator or .difference() to find elements in required but not in available.',
            'Convert the result back to a sorted list with sorted().',
          ],
        },
      },
      {
        id: 'set-difference-update',
        title: 'difference_update() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'set.difference_update(*others) removes all elements found in the other iterables from the set in-place. It returns None. The -= operator is equivalent when both operands are sets.',
            code: `# Signature
set.difference_update(*others)
# Also: set -= other_set
# Returns: None`,
          },
          {
            heading: 'Examples',
            content:
              'difference_update() modifies the set directly instead of creating a new one.',
            code: `permissions = {"read", "write", "execute", "admin"}
revoked = {"admin", "execute"}

permissions.difference_update(revoked)
print(permissions)

# Using -= operator
nums = {1, 2, 3, 4, 5}
nums -= {2, 4}
print(nums)`,
            output: `{'read', 'write'}
{1, 3, 5}`,
            codeHighlightLines: [4, 9],
          },
        ],
        quiz: [
          {
            question: 'What does difference_update() return?',
            options: ['A new set with the difference', 'The modified set', 'None', 'The number of removed elements'],
            correctIndex: 2,
            explanation: 'Like all in-place mutation methods, difference_update() returns None. The set is modified directly.',
          },
          {
            question: 'How does difference_update() differ from difference()?',
            options: [
              'difference_update() modifies the set in-place; difference() returns a new set',
              'They are identical',
              'difference() modifies in-place; difference_update() returns a new set',
              'difference_update() is slower',
            ],
            correctIndex: 0,
            explanation: 'difference_update() removes elements in-place and returns None, while difference() creates and returns a new set, leaving the original unchanged.',
          },
          {
            question: 'What does the -= operator do for sets?',
            options: [
              'Subtracts numeric values from set elements',
              'It is equivalent to difference_update() -- removes elements of the right set from the left set in-place',
              'It is not supported for sets',
              'It creates a new set with the difference',
            ],
            correctIndex: 1,
            explanation: 'For sets, the -= operator is syntactic sugar for difference_update(). It modifies the left operand in-place by removing all elements found in the right operand.',
          },
        ],
      },
      {
        id: 'set-discard',
        title: 'discard() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'set.discard(elem) removes element elem from the set if it is present. If the element is not in the set, it does nothing (no error). It returns None. This is the safe alternative to remove(), which raises KeyError for missing elements.',
            code: `# Signature
set.discard(elem)
# Returns: None`,
          },
          {
            heading: 'Examples',
            content:
              'discard() is ideal when you want to remove an element without caring whether it exists.',
            code: `fruits = {"apple", "banana", "cherry"}

fruits.discard("banana")
print(fruits)

# No error if element is missing
fruits.discard("mango")
print(fruits)`,
            output: `{'apple', 'cherry'}
{'apple', 'cherry'}`,
            tip: 'Use discard() over remove() when you do not need a KeyError for missing elements -- it keeps your code cleaner.',
            analogy: 'Think of it like crossing a name off a list -- if the name is there, you cross it out. If it is not there, you simply move on without complaint.',
          },
        ],
        quiz: [
          {
            question: 'What happens when you call discard() with an element that is NOT in the set?',
            options: ['Raises KeyError', 'Raises ValueError', 'Nothing happens (no error)', 'Returns False'],
            correctIndex: 2,
            explanation: 'discard() silently does nothing if the element is not found. This is the key difference from remove(), which raises a KeyError for missing elements.',
          },
          {
            question: 'How does discard() differ from remove()?',
            options: [
              'discard() raises KeyError for missing elements; remove() does not',
              'remove() raises KeyError for missing elements; discard() does not',
              'They are identical in behavior',
              'discard() can remove multiple elements at once',
            ],
            correctIndex: 1,
            explanation: 'remove() raises KeyError when the element is not found, while discard() silently does nothing. Choose based on whether a missing element is an error in your logic.',
          },
          {
            question: 'What does discard() return?',
            options: ['The removed element', 'True if removed, False if not found', 'None', 'The updated set'],
            correctIndex: 2,
            explanation: 'discard() always returns None, regardless of whether the element was found and removed or not.',
          },
        ],
      },
      {
        id: 'set-intersection',
        title: 'intersection() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'set.intersection(*others) returns a new set containing only elements common to the set and all provided iterables. You can pass one or more iterables. The & operator is equivalent when both operands are sets.',
            code: `# Signature
set.intersection(*others)
# Also: set & other_set
# Returns: a new set`,
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    A["A = {1, 2, 3, 4}"] --> I["A & B"]
    B["B = {3, 4, 5, 6}"] --> I
    I --> R["Result: {3, 4}"]`,
              caption: 'intersection() keeps only elements that appear in both sets',
            },
          },
          {
            heading: 'Examples',
            content:
              'intersection() finds the overlap between two or more collections.',
            code: `a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a.intersection(b))
print(a & b)

# Multiple sets
c = {4, 5, 6, 7}
print(a.intersection(b, c))`,
            output: `{3, 4}
{3, 4}
{4}`,
            analogy: 'Think of it like finding mutual friends -- the intersection is the group of people that both you and your friend know.',
          },
        ],
        quiz: [
          {
            question: 'What does a.intersection(b) return for a = {1, 2, 3} and b = {3, 4, 5}?',
            options: ['{1, 2, 3, 4, 5}', '{3}', '{1, 2}', '{4, 5}'],
            correctIndex: 1,
            explanation: 'intersection() returns only elements present in BOTH sets. The only element common to both a and b is 3.',
          },
          {
            question: 'Can you pass more than two sets to intersection()?',
            options: [
              'No, it only works with exactly one argument',
              'Yes, it returns elements common to ALL provided sets',
              'Yes, but only up to 3 sets',
              'No, you need to chain multiple intersection calls',
            ],
            correctIndex: 1,
            explanation: 'intersection() accepts any number of iterables with *others. The result contains only elements present in the original set AND all provided iterables.',
          },
          {
            question: 'Does the & operator work with a list on the right side?',
            options: [
              'Yes, it auto-converts the list to a set',
              'No, the & operator requires both operands to be sets; use intersection() for other iterables',
              'Yes, but only for lists of hashable elements',
              'It raises a SyntaxError',
            ],
            correctIndex: 1,
            explanation: 'The & operator requires both operands to be sets (or frozensets). The intersection() method is more flexible and accepts any iterable.',
          },
        ],
        challenge: {
          prompt: 'Write a function common_elements that takes any number of lists and returns a sorted list of elements common to ALL of them. Use set intersection.',
          starterCode: `def common_elements(*lists) -> list:
    # TODO: Handle edge case of no lists
    # TODO: Convert the first list to a set
    # TODO: Intersect with each subsequent list (converted to set)
    # TODO: Return the common elements as a sorted list
    pass

# Test
print(common_elements([1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]))  # [3, 4]
print(common_elements(["a", "b", "c"], ["b", "c", "d"], ["c", "d", "e"]))  # ['c']`,
          solutionCode: `def common_elements(*lists) -> list:
    if not lists:
        return []
    common = set(lists[0])
    for lst in lists[1:]:
        common &= set(lst)
    return sorted(common)

# Test
print(common_elements([1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]))  # [3, 4]
print(common_elements(["a", "b", "c"], ["b", "c", "d"], ["c", "d", "e"]))  # ['c']`,
          hints: [
            'Start with set(lists[0]) to convert the first list to a set.',
            'Use &= to intersect with each subsequent list (also converted to a set).',
            'Return sorted(common) to produce a sorted list from the final set.',
          ],
        },
      },
      {
        id: 'set-intersection-update',
        title: 'intersection_update() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'set.intersection_update(*others) updates the set in-place, keeping only elements found in the set and all given iterables. It returns None. The &= operator is equivalent when both operands are sets.',
            code: `# Signature
set.intersection_update(*others)
# Also: set &= other_set
# Returns: None`,
          },
          {
            heading: 'Examples',
            content:
              'intersection_update() narrows the set down to shared elements without creating a new set.',
            code: `allowed = {"read", "write", "execute", "admin"}
requested = {"read", "write", "delete"}

allowed.intersection_update(requested)
print(allowed)

# Using &= operator
nums = {1, 2, 3, 4, 5}
nums &= {2, 3, 4}
print(nums)`,
            output: `{'read', 'write'}
{2, 3, 4}`,
            codeHighlightLines: [4, 9],
          },
        ],
        quiz: [
          {
            question: 'What does intersection_update() return?',
            options: ['A new set with common elements', 'The updated set', 'None', 'True if any elements were removed'],
            correctIndex: 2,
            explanation: 'intersection_update() modifies the set in-place and returns None, consistent with other in-place mutation methods.',
          },
          {
            question: 'How does intersection_update() differ from intersection()?',
            options: [
              'intersection_update() creates a new set; intersection() modifies in-place',
              'intersection_update() modifies the set in-place; intersection() returns a new set',
              'They are identical',
              'intersection_update() only works with one argument',
            ],
            correctIndex: 1,
            explanation: 'intersection_update() modifies the existing set in-place (and returns None), while intersection() leaves the original set unchanged and returns a new set.',
          },
          {
            question: 'After s = {1, 2, 3, 4, 5} and s &= {2, 4, 6}, what is s?',
            options: ['{1, 2, 3, 4, 5, 6}', '{2, 4}', '{1, 3, 5}', '{6}'],
            correctIndex: 1,
            explanation: '&= performs intersection_update. The only elements common to {1, 2, 3, 4, 5} and {2, 4, 6} are 2 and 4, so s becomes {2, 4}.',
          },
        ],
      },
      {
        id: 'set-isdisjoint',
        title: 'isdisjoint() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'set.isdisjoint(other) returns True if the set has no elements in common with other. The other argument can be any iterable. Two sets are disjoint if their intersection is the empty set.',
            code: `# Signature
set.isdisjoint(other)
# Returns: bool`,
          },
          {
            heading: 'Examples',
            content:
              'isdisjoint() is a quick check for whether two collections share any elements.',
            code: `evens = {2, 4, 6}
odds = {1, 3, 5}
primes = {2, 3, 5, 7}

print(evens.isdisjoint(odds))
print(evens.isdisjoint(primes))

# Works with any iterable
print({1, 2}.isdisjoint([3, 4, 5]))`,
            output: `True
False
True`,
            tip: 'isdisjoint() is often faster than computing the full intersection when you only need a boolean answer.',
          },
        ],
        quiz: [
          {
            question: 'What does isdisjoint() return when the two sets share at least one element?',
            options: ['True', 'False', 'The shared elements', 'Raises ValueError'],
            correctIndex: 1,
            explanation: 'isdisjoint() returns False when the sets have any elements in common. It returns True only when the intersection is completely empty.',
          },
          {
            question: 'Is a.isdisjoint(b) always the same as b.isdisjoint(a)?',
            options: [
              'No, it depends on which set is larger',
              'Yes, disjointness is symmetric',
              'No, it depends on the element types',
              'Only if both are sets (not other iterables)',
            ],
            correctIndex: 1,
            explanation: 'Disjointness is a symmetric property: if A and B share no elements, then B and A also share no elements. The result is always the same regardless of order.',
          },
          {
            question: 'What is {1, 2}.isdisjoint(set())?',
            options: ['True', 'False', 'Raises TypeError', 'None'],
            correctIndex: 0,
            explanation: 'Any set is disjoint with the empty set because there are no elements to share. An empty set has no elements in common with anything.',
          },
        ],
      },
      {
        id: 'set-issubset',
        title: 'issubset() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'set.issubset(other) returns True if every element of the set is also in other. The <= operator is equivalent when both operands are sets. A set is always a subset of itself.',
            code: `# Signature
set.issubset(other)
# Also: set <= other_set
# Returns: bool`,
          },
          {
            heading: 'Examples',
            content:
              'issubset() checks whether one set is entirely contained within another.',
            code: `required = {"python", "git"}
skills = {"python", "git", "docker", "sql"}

print(required.issubset(skills))
print(required <= skills)

# A set is a subset of itself
print(required.issubset(required))`,
            output: `True
True
True`,
            analogy: 'Think of it like checking if all ingredients you need are in your pantry -- issubset returns True only if every required item is available.',
          },
        ],
        quiz: [
          {
            question: 'Is an empty set a subset of every set?',
            options: [
              'Yes, the empty set is a subset of every set',
              'No, the empty set is not a subset of any set',
              'Only if the other set is also empty',
              'It depends on the element types',
            ],
            correctIndex: 0,
            explanation: 'The empty set is a subset of every set because the condition "every element of the empty set is in other" is vacuously true (there are no elements to check).',
          },
          {
            question: 'What is the difference between <= and < for sets?',
            options: [
              'There is no difference',
              '<= checks for subset (including equal); < checks for proper subset (strictly smaller)',
              '<= is for numbers; < is for sets',
              '< checks for subset; <= checks for superset',
            ],
            correctIndex: 1,
            explanation: '<= returns True if the set is a subset (including when both are equal). < returns True only for proper subsets, meaning the set must be strictly smaller than the other.',
          },
          {
            question: 'What does {"a", "b"}.issubset(["a", "b", "c"]) return?',
            options: ['True', 'False', 'TypeError because the argument is a list', 'None'],
            correctIndex: 0,
            explanation: 'issubset() accepts any iterable, not just sets. It checks if every element of the set is in the iterable. Since "a" and "b" are both in the list, it returns True.',
          },
        ],
      },
      {
        id: 'set-issuperset',
        title: 'issuperset() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'set.issuperset(other) returns True if every element of other is also in the set. The >= operator is equivalent when both operands are sets. This is the inverse of issubset().',
            code: `# Signature
set.issuperset(other)
# Also: set >= other_set
# Returns: bool`,
          },
          {
            heading: 'Examples',
            content:
              'issuperset() verifies that a set contains all elements from another collection.',
            code: `all_perms = {"read", "write", "execute", "admin"}
needed = {"read", "write"}

print(all_perms.issuperset(needed))
print(all_perms >= needed)

# Works with any iterable
print({1, 2, 3}.issuperset([1, 2]))`,
            output: `True
True
True`,
          },
        ],
        quiz: [
          {
            question: 'If a.issubset(b) is True, what can you say about b.issuperset(a)?',
            options: [
              'It is also True',
              'It is False',
              'It depends on the set sizes',
              'Cannot be determined',
            ],
            correctIndex: 0,
            explanation: 'issubset and issuperset are inverse operations. If every element of a is in b (a is a subset of b), then b contains every element of a (b is a superset of a).',
          },
          {
            question: 'Is every set a superset of the empty set?',
            options: [
              'Yes, because the empty set has no elements to check',
              'No, only non-empty sets are supersets of the empty set',
              'Only the empty set itself is a superset of the empty set',
              'It depends on the type of elements',
            ],
            correctIndex: 0,
            explanation: 'Every set is a superset of the empty set because the empty set has no elements, so the condition "every element of other is in the set" is vacuously true.',
          },
          {
            question: 'What does {1, 2, 3}.issuperset({1, 2, 3}) return?',
            options: ['True', 'False', 'True only with >= but not issuperset()', 'Raises an error'],
            correctIndex: 0,
            explanation: 'A set is always a superset of itself (and also a subset of itself). Every element of the set is contained within itself.',
          },
        ],
      },
      {
        id: 'set-pop',
        title: 'pop() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'set.pop() removes and returns an arbitrary element from the set. It takes no parameters. Raises KeyError if the set is empty. Because sets are unordered, you cannot predict which element will be removed.',
            code: `# Signature
set.pop()
# Returns: an arbitrary element
# Raises: KeyError if set is empty`,
          },
          {
            heading: 'Examples',
            content:
              'pop() is useful when you need to consume elements one at a time regardless of order.',
            code: `items = {"a", "b", "c"}

elem = items.pop()
print(f"Removed: {elem}")
print(f"Remaining: {items}")

# Consume all elements
nums = {10, 20, 30}
while nums:
    print(nums.pop(), end=" ")
print()`,
            output: `Removed: a
Remaining: {'b', 'c'}
10 20 30`,
          },
        ],
        quiz: [
          {
            question: 'Can you control which element set.pop() removes?',
            options: [
              'Yes, by passing an index',
              'Yes, by passing the element value',
              'No, it removes an arbitrary element because sets are unordered',
              'Yes, it always removes the smallest element',
            ],
            correctIndex: 2,
            explanation: 'set.pop() takes no arguments and removes an arbitrary element. Since sets are unordered, there is no way to specify which element to remove. Use discard() or remove() for targeted removal.',
          },
          {
            question: 'What error does set.pop() raise on an empty set?',
            options: ['IndexError', 'ValueError', 'KeyError', 'StopIteration'],
            correctIndex: 2,
            explanation: 'set.pop() raises KeyError when called on an empty set, not IndexError (which is for sequences like lists).',
          },
          {
            question: 'How does set.pop() differ from list.pop()?',
            options: [
              'set.pop() takes no arguments and removes an arbitrary element; list.pop() can take an index and removes by position',
              'They are identical in behavior',
              'set.pop() returns None; list.pop() returns the element',
              'list.pop() removes an arbitrary element too',
            ],
            correctIndex: 0,
            explanation: 'list.pop() optionally takes an index (default -1, the last element) and removes by position. set.pop() takes no arguments and removes an arbitrary element because sets have no concept of position.',
          },
        ],
      },
      {
        id: 'set-remove',
        title: 'remove() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'set.remove(elem) removes element elem from the set. If the element is not present, it raises a KeyError. It returns None. Use remove() when the absence of the element should be treated as an error.',
            code: `# Signature
set.remove(elem)
# Returns: None
# Raises: KeyError if elem not in set`,
          },
          {
            heading: 'Examples',
            content:
              'remove() ensures you catch unexpected missing elements early.',
            code: `languages = {"python", "java", "rust"}

languages.remove("java")
print(languages)

# Raises KeyError for missing element
try:
    languages.remove("go")
except KeyError as e:
    print(f"KeyError: {e}")`,
            output: `{'python', 'rust'}
KeyError: 'go'`,
            codeHighlightLines: [3, 8],
          },
        ],
        quiz: [
          {
            question: 'When should you prefer remove() over discard()?',
            options: [
              'When performance matters',
              'When a missing element indicates a bug and should raise an error',
              'When removing multiple elements at once',
              'When the set contains integers',
            ],
            correctIndex: 1,
            explanation: 'Use remove() when the element should definitely exist, and its absence is unexpected (a bug). The KeyError acts as an early warning. Use discard() when missing elements are acceptable.',
          },
          {
            question: 'What exception does remove() raise for missing elements?',
            options: ['ValueError', 'IndexError', 'KeyError', 'LookupError'],
            correctIndex: 2,
            explanation: 'set.remove() raises KeyError (not ValueError like list.remove()) when the element is not found in the set.',
          },
          {
            question: 'What does set.remove() return on success?',
            options: ['The removed element', 'True', 'None', 'The updated set'],
            correctIndex: 2,
            explanation: 'remove() modifies the set in-place and returns None, consistent with other Python mutation methods.',
          },
        ],
      },
      {
        id: 'set-symmetric-difference',
        title: 'symmetric_difference() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'set.symmetric_difference(other) returns a new set with elements that are in either set, but not in both. This is sometimes called the XOR of two sets. The ^ operator is equivalent when both operands are sets.',
            code: `# Signature
set.symmetric_difference(other)
# Also: set ^ other_set
# Returns: a new set`,
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    A["A = {1, 2, 3, 4}"] --> S["A ^ B"]
    B["B = {3, 4, 5, 6}"] --> S
    S --> R["Result: {1, 2, 5, 6}"]
    S -. "Excludes overlap: {3, 4}" .-> X["(removed)"]`,
              caption: 'symmetric_difference() keeps elements unique to each set, excluding the shared overlap',
            },
          },
          {
            heading: 'Examples',
            content:
              'symmetric_difference() finds elements unique to each set, excluding the overlap.',
            code: `a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a.symmetric_difference(b))
print(a ^ b)

# Practical: find changes between two versions
old_features = {"search", "auth", "export"}
new_features = {"search", "auth", "import", "dashboard"}
changed = old_features ^ new_features
print(changed)`,
            output: `{1, 2, 5, 6}
{1, 2, 5, 6}
{'export', 'import', 'dashboard'}`,
            tip: 'Symmetric difference is equivalent to (a | b) - (a & b), or the union minus the intersection.',
            analogy: 'Think of it like comparing two playlists and finding the songs that are exclusive to each -- the ones only you have and only your friend has, but not the ones you both share.',
            codeHighlightLines: [4, 10],
          },
        ],
        quiz: [
          {
            question: 'What does symmetric_difference return for a = {1, 2, 3} and b = {2, 3, 4}?',
            options: ['{2, 3}', '{1, 4}', '{1, 2, 3, 4}', '{1}'],
            correctIndex: 1,
            explanation: 'Symmetric difference returns elements in either set but not both. 1 is only in a, 4 is only in b. Elements 2 and 3 are in both, so they are excluded. Result: {1, 4}.',
          },
          {
            question: 'Is symmetric_difference commutative (does order matter)?',
            options: [
              'No, a ^ b is different from b ^ a',
              'Yes, a ^ b is always equal to b ^ a',
              'Only if both sets are the same size',
              'Only for numeric elements',
            ],
            correctIndex: 1,
            explanation: 'Symmetric difference is commutative: a ^ b == b ^ a. The "exclusive to each" elements are the same regardless of which set you start with.',
          },
          {
            question: 'Which expression is equivalent to a.symmetric_difference(b)?',
            options: ['a & b', 'a | b', '(a | b) - (a & b)', 'a - b'],
            correctIndex: 2,
            explanation: 'Symmetric difference equals the union minus the intersection. It takes all elements from both sets, then removes the ones they share.',
          },
        ],
        challenge: {
          prompt: 'Write a function find_changes that takes two sets (old_state and new_state) and returns a dictionary with keys "added", "removed", and "unchanged", each mapping to a set of elements. Use symmetric_difference along with other set operations.',
          starterCode: `def find_changes(old_state: set, new_state: set) -> dict:
    # TODO: Find elements that were added (in new but not old)
    # TODO: Find elements that were removed (in old but not new)
    # TODO: Find elements that are unchanged (in both)
    # TODO: Return a dictionary with "added", "removed", "unchanged" keys
    pass

# Test
old = {"search", "auth", "export", "settings"}
new = {"search", "auth", "import", "dashboard"}
result = find_changes(old, new)
print(f"Added: {result['added']}")
print(f"Removed: {result['removed']}")
print(f"Unchanged: {result['unchanged']}")`,
          solutionCode: `def find_changes(old_state: set, new_state: set) -> dict:
    added = new_state - old_state
    removed = old_state - new_state
    unchanged = old_state & new_state
    return {"added": added, "removed": removed, "unchanged": unchanged}

# Test
old = {"search", "auth", "export", "settings"}
new = {"search", "auth", "import", "dashboard"}
result = find_changes(old, new)
print(f"Added: {result['added']}")       # Added: {'import', 'dashboard'}
print(f"Removed: {result['removed']}")   # Removed: {'export', 'settings'}
print(f"Unchanged: {result['unchanged']}")  # Unchanged: {'search', 'auth'}`,
          hints: [
            'Use new_state - old_state for added elements.',
            'Use old_state - new_state for removed elements.',
            'Use old_state & new_state for unchanged elements.',
          ],
        },
      },
      {
        id: 'set-symmetric-difference-update',
        title: 'symmetric_difference_update() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'set.symmetric_difference_update(other) updates the set in-place, keeping only elements found in either the set or other, but not in both. It returns None. The ^= operator is equivalent when both operands are sets.',
            code: `# Signature
set.symmetric_difference_update(other)
# Also: set ^= other_set
# Returns: None`,
          },
          {
            heading: 'Examples',
            content:
              'symmetric_difference_update() modifies the set to contain only the non-overlapping elements.',
            code: `a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a.symmetric_difference_update(b)
print(a)

# Using ^= operator
x = {"red", "green", "blue"}
x ^= {"green", "yellow"}
print(x)`,
            output: `{1, 2, 5, 6}
{'red', 'blue', 'yellow'}`,
          },
        ],
        quiz: [
          {
            question: 'What does symmetric_difference_update() return?',
            options: ['A new set', 'The updated set', 'None', 'The count of changed elements'],
            correctIndex: 2,
            explanation: 'Like all in-place set mutation methods, symmetric_difference_update() returns None. The set is modified directly.',
          },
          {
            question: 'After a = {1, 2, 3} and a ^= {2, 3, 4}, what is a?',
            options: ['{1, 2, 3, 4}', '{2, 3}', '{1, 4}', '{4}'],
            correctIndex: 2,
            explanation: '^= performs symmetric_difference_update. Elements in both sets (2, 3) are removed. Elements unique to each (1 from original, 4 from other) are kept. Result: {1, 4}.',
          },
          {
            question: 'How does symmetric_difference_update() differ from symmetric_difference()?',
            options: [
              'symmetric_difference_update() modifies the set in-place; symmetric_difference() returns a new set',
              'They are identical',
              'symmetric_difference() modifies in-place; symmetric_difference_update() returns a new set',
              'symmetric_difference_update() is slower',
            ],
            correctIndex: 0,
            explanation: 'symmetric_difference_update() modifies the existing set in-place and returns None, while symmetric_difference() creates and returns a new set, leaving the original unchanged.',
          },
        ],
      },
      {
        id: 'set-union',
        title: 'union() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'set.union(*others) returns a new set containing all elements from the set and all provided iterables, with duplicates removed. You can pass one or more iterables. The | operator is equivalent when both operands are sets.',
            code: `# Signature
set.union(*others)
# Also: set | other_set
# Returns: a new set`,
            diagram: {
              kind: 'mermaid',
              code: `flowchart LR
    A["frontend: {html, css, js}"] --> U["union()"]
    B["backend: {python, sql, js}"] --> U
    U --> R["Result: {html, css, js, python, sql}"]`,
              caption: 'union() combines all elements from both sets, deduplicating automatically',
            },
          },
          {
            heading: 'Examples',
            content:
              'union() combines multiple collections into one set of unique elements.',
            code: `frontend = {"html", "css", "javascript"}
backend = {"python", "sql", "javascript"}

print(frontend.union(backend))
print(frontend | backend)

# Multiple arguments
devops = {"docker", "git"}
print(frontend.union(backend, devops))`,
            output: `{'html', 'css', 'javascript', 'python', 'sql'}
{'html', 'css', 'javascript', 'python', 'sql'}
{'html', 'css', 'javascript', 'python', 'sql', 'docker', 'git'}`,
          },
        ],
        quiz: [
          {
            question: 'Does union() modify the original set?',
            options: [
              'Yes, it adds elements to the original set',
              'No, it returns a new set and leaves the originals unchanged',
              'It depends on whether the | operator or method is used',
              'Only when called with multiple arguments',
            ],
            correctIndex: 1,
            explanation: 'union() always returns a new set. Neither the original set nor any of the argument sets are modified. Use update() for in-place modification.',
          },
          {
            question: 'What happens to duplicate elements in a union?',
            options: [
              'They appear twice in the result',
              'They are automatically deduplicated (appear once)',
              'A ValueError is raised',
              'The most recently added duplicate wins',
            ],
            correctIndex: 1,
            explanation: 'Sets cannot contain duplicates. union() combines all elements and automatically deduplicates, so each element appears exactly once in the result.',
          },
          {
            question: 'Can union() accept a list as an argument?',
            options: [
              'No, it only works with other sets',
              'Yes, it accepts any iterable (lists, tuples, generators, etc.)',
              'Only if the list contains hashable elements',
              'Only the | operator works with lists',
            ],
            correctIndex: 1,
            explanation: 'The union() method accepts any iterable. Note: the | operator requires both operands to be sets, but the method is more flexible.',
          },
        ],
        challenge: {
          prompt: 'Write a function merge_unique that takes any number of lists and returns a single sorted list with all duplicates removed. Use set.union() to combine them.',
          starterCode: `def merge_unique(*lists) -> list:
    # TODO: Handle edge case of no lists
    # TODO: Combine all lists into one set using union
    # TODO: Return the result as a sorted list
    pass

# Test
print(merge_unique([3, 1, 2], [2, 4, 3], [5, 1, 6]))  # [1, 2, 3, 4, 5, 6]
print(merge_unique(["banana", "apple"], ["cherry", "apple"]))  # ['apple', 'banana', 'cherry']`,
          solutionCode: `def merge_unique(*lists) -> list:
    if not lists:
        return []
    combined = set(lists[0])
    for lst in lists[1:]:
        combined = combined.union(lst)
    return sorted(combined)

# Test
print(merge_unique([3, 1, 2], [2, 4, 3], [5, 1, 6]))  # [1, 2, 3, 4, 5, 6]
print(merge_unique(["banana", "apple"], ["cherry", "apple"]))  # ['apple', 'banana', 'cherry']`,
          hints: [
            'Start by converting the first list to a set.',
            'Use .union() in a loop to combine with each subsequent list.',
            'Return sorted() of the final set to produce a sorted list.',
          ],
        },
      },
      {
        id: 'set-update',
        title: 'update() Method',
        difficulty: 'beginner',
        sections: [
          {
            heading: 'Syntax & Description',
            content:
              'set.update(*others) adds all elements from the given iterables to the set in-place. It returns None. The |= operator is equivalent when both operands are sets. Unlike add(), update() can insert multiple elements at once from any iterable.',
            code: `# Signature
set.update(*others)
# Also: set |= other_set
# Returns: None`,
          },
          {
            heading: 'Examples',
            content:
              'update() is the in-place version of union, adding elements from any iterable.',
            code: `basket = {"apple", "banana"}

basket.update(["cherry", "date"])
print(basket)

# Multiple iterables
basket.update({"elderberry"}, ["fig", "grape"])
print(basket)

# Using |= operator
s = {1, 2}
s |= {3, 4}
print(s)`,
            output: `{'apple', 'banana', 'cherry', 'date'}
{'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape'}
{1, 2, 3, 4}`,
            codeHighlightLines: [3, 7, 12],
          },
        ],
        quiz: [
          {
            question: 'What does set.update() return?',
            options: ['The updated set', 'A new set', 'None', 'The number of elements added'],
            correctIndex: 2,
            explanation: 'update() modifies the set in-place and returns None, consistent with other Python in-place mutation methods.',
          },
          {
            question: 'How does update() differ from add()?',
            options: [
              'update() takes an iterable and adds all its elements; add() takes a single element',
              'add() takes an iterable; update() takes a single element',
              'They are identical',
              'update() creates a new set; add() modifies in-place',
            ],
            correctIndex: 0,
            explanation: 'add() accepts a single hashable element, while update() accepts one or more iterables and adds all their elements to the set.',
          },
          {
            question: 'What happens with s.update("hello") if s is a set?',
            options: [
              'The string "hello" is added as one element',
              'Each character is added individually: {"h", "e", "l", "o"}',
              'A TypeError is raised',
              'Nothing happens',
            ],
            correctIndex: 1,
            explanation: 'Strings are iterables in Python. update() iterates over the argument, so each character becomes a separate set element. To add the whole string, use add("hello") instead.',
          },
        ],
        challenge: {
          prompt: 'Write a function collect_tags that takes a list of blog post dictionaries (each with a "tags" key containing a list of strings) and returns a sorted list of all unique tags across all posts. Use set.update() to collect tags incrementally.',
          starterCode: `def collect_tags(posts: list) -> list:
    # TODO: Create an empty set for all tags
    # TODO: For each post, update the set with the post's tags
    # TODO: Return the unique tags as a sorted list
    pass

# Test
posts = [
    {"title": "Python Basics", "tags": ["python", "beginner", "tutorial"]},
    {"title": "Set Operations", "tags": ["python", "sets", "data-structures"]},
    {"title": "Web Dev", "tags": ["javascript", "tutorial", "web"]},
]
print(collect_tags(posts))
# ['beginner', 'data-structures', 'javascript', 'python', 'sets', 'tutorial', 'web']`,
          solutionCode: `def collect_tags(posts: list) -> list:
    all_tags = set()
    for post in posts:
        all_tags.update(post["tags"])
    return sorted(all_tags)

# Test
posts = [
    {"title": "Python Basics", "tags": ["python", "beginner", "tutorial"]},
    {"title": "Set Operations", "tags": ["python", "sets", "data-structures"]},
    {"title": "Web Dev", "tags": ["javascript", "tutorial", "web"]},
]
print(collect_tags(posts))
# ['beginner', 'data-structures', 'javascript', 'python', 'sets', 'tutorial', 'web']`,
          hints: [
            'Start with an empty set: all_tags = set().',
            'In each loop iteration, call all_tags.update(post["tags"]) to add all tags from that post.',
            'Return sorted(all_tags) to get an alphabetically sorted list.',
          ],
        },
      },
    ],
  },
];

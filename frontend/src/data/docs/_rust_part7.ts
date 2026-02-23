import type { DocCategory } from './types';

// Part 7: Iterator Methods + HashMap Methods
export const RUST_PART7_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Iterator Methods                                             */
  /* ------------------------------------------------------------ */
  {
    id: 'rust-iterator-methods',
    label: 'Iterator Methods',
    icon: 'Repeat',
    entries: [
      {
        id: 'iter-map',
        title: 'Iterator::map',
        difficulty: 'beginner',
        tags: ['iterator', 'map', 'transform', 'lazy'],
        cheatSheetSummary: 'iter.map(|x| x * 2).collect() — transform each element lazily',
        signature: 'fn map<B, F: FnMut(Self::Item) -> B>(self, f: F) -> Map<Self, F>',
        sections: [
          {
            heading: 'Transforming Elements',
            content: 'map applies a function to each element, producing a new iterator of transformed values. It is lazy — no work happens until you consume the iterator with collect, for, sum, etc. This makes chains of map and filter zero-cost abstractions.',
            code: `fn main() {
    let nums = vec![1, 2, 3, 4, 5];

    // Basic map
    let doubled: Vec<i32> = nums.iter().map(|&x| x * 2).collect();
    println!("doubled: {:?}", doubled);

    // Map with type change
    let strings: Vec<String> = nums.iter().map(|x| x.to_string()).collect();
    println!("strings: {:?}", strings);

    // Chain multiple maps
    let result: Vec<i32> = nums.iter()
        .map(|&x| x + 1)
        .map(|x| x * x)
        .collect();
    println!("(x+1)^2: {:?}", result);

    // Map is lazy — nothing happens until consumed
    let lazy = nums.iter().map(|x| {
        println!("  processing {}", x);
        x * 2
    });
    println!("map created (nothing printed yet)");
    let _: Vec<_> = lazy.collect(); // NOW it runs
}`,
            output: `doubled: [2, 4, 6, 8, 10]
strings: ["1", "2", "3", "4", "5"]
(x+1)^2: [4, 9, 16, 25, 36]
map created (nothing printed yet)
  processing 1
  processing 2
  processing 3
  processing 4
  processing 5`,
            note: 'Iterators are lazy. Creating a .map() chain does no work. The computation only runs when you consume the iterator with .collect(), .sum(), .for_each(), a for loop, etc.',
            analogy: 'Think of it like writing a recipe: .map() adds a step to the recipe card but does not cook anything. Only when you actually start cooking (collect, sum, for loop) do the steps get executed one by one.',
            diagram: {
              kind: 'mermaid',
              code: `graph LR
  A["[1, 2, 3, 4, 5]"] -->|".iter()"| B["Iterator"]
  B -->|".map(|x| x * 2)"| C["Lazy adapter"]
  C -->|".collect()"| D["[2, 4, 6, 8, 10]"]
  style A fill:#6366f1,color:#fff
  style B fill:#8b5cf6,color:#fff
  style C fill:#a78bfa,color:#fff
  style D fill:#10b981,color:#fff`,
              caption: 'Iterator pipeline: source -> lazy adapter(s) -> consumer. No work happens until the consumer (.collect()) pulls values through the chain.',
            },
            codeHighlightLines: [5, 9, 13, 14, 15],
          },
        ],
        quiz: [
          {
            question: 'What happens when you create a .map() chain on an iterator without calling .collect()?',
            options: [
              'The map function is applied immediately to all elements',
              'Nothing happens — map is lazy and no work is done until consumed',
              'It creates a new Vec with the transformed elements',
              'It panics at runtime because the result is unused',
            ],
            correctIndex: 1,
            explanation: 'Iterator adaptors like .map() are lazy in Rust. They create a new iterator adapter but do no actual work. The transformation only runs when a consumer like .collect(), .sum(), or a for loop pulls values through the chain.',
          },
          {
            question: 'What is the type of the expression nums.iter().map(|x| x.to_string()) before calling .collect()?',
            options: [
              'Vec<String>',
              'String',
              'Map<Iter<i32>, closure>',
              'Iterator<String>',
            ],
            correctIndex: 2,
            explanation: 'Before .collect() is called, the expression is a Map adapter struct that wraps the source iterator and the closure. It implements Iterator but has not produced any values yet.',
          },
          {
            question: 'Given let v = vec![1, 2, 3]; what does v.iter().map(|&x| x * 2).collect::<Vec<i32>>() return?',
            options: [
              'vec![1, 2, 3]',
              'vec![2, 4, 6]',
              'vec![1, 4, 9]',
              'A compilation error because of the &x pattern',
            ],
            correctIndex: 1,
            explanation: 'The closure |&x| x * 2 destructures the reference from .iter() (which yields &i32), then multiplies each value by 2, producing vec![2, 4, 6].',
          },
        ],
        challenge: {
          prompt: 'Use .map() and .collect() to transform a vector of integers into a vector of strings where each string is the number followed by its square in the format "N->N^2" (e.g., "3->9").',
          starterCode: `fn format_squares(nums: &[i32]) -> Vec<String> {
    // Use .iter(), .map(), and .collect() to transform each number
    // into a String like "3->9"
    todo!()
}

fn main() {
    let nums = vec![1, 2, 3, 4, 5];
    let result = format_squares(&nums);
    println!("{:?}", result);
    // Expected: ["1->1", "2->4", "3->9", "4->16", "5->25"]
}`,
          solutionCode: `fn format_squares(nums: &[i32]) -> Vec<String> {
    nums.iter()
        .map(|&x| format!("{}->{}",  x, x * x))
        .collect()
}

fn main() {
    let nums = vec![1, 2, 3, 4, 5];
    let result = format_squares(&nums);
    println!("{:?}", result);
    // Output: ["1->1", "2->4", "3->9", "4->16", "5->25"]
}`,
          hints: [
            'Use .iter() to get references, then .map() with a closure to transform each element.',
            'Inside the closure, use format!("{}->{}",  x, x * x) to build each string.',
            'Call .collect::<Vec<String>>() or let the return type annotation infer the collection type.',
          ],
        },
      },
      {
        id: 'iter-filter',
        title: 'Iterator::filter',
        difficulty: 'beginner',
        tags: ['iterator', 'filter', 'predicate', 'select', 'where'],
        cheatSheetSummary: 'iter.filter(|x| predicate).collect() — keep elements matching a condition',
        signature: 'fn filter<P: FnMut(&Self::Item) -> bool>(self, predicate: P) -> Filter<Self, P>',
        sections: [
          {
            heading: 'Filtering Elements',
            content: 'filter keeps only elements for which the predicate returns true. The predicate receives a reference to each element. filter_map combines filter and map in one step, returning Some(value) to keep and None to discard.',
            code: `fn main() {
    let nums = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Basic filter
    let evens: Vec<&i32> = nums.iter().filter(|&&x| x % 2 == 0).collect();
    println!("evens: {:?}", evens);

    // filter + map
    let even_squares: Vec<i32> = nums.iter()
        .filter(|&&x| x % 2 == 0)
        .map(|&x| x * x)
        .collect();
    println!("even squares: {:?}", even_squares);

    // filter_map: combined filter and map
    let parsed: Vec<i32> = vec!["1", "abc", "3", "xyz", "5"]
        .iter()
        .filter_map(|s| s.parse::<i32>().ok())
        .collect();
    println!("parsed: {:?}", parsed);

    // Count filtered elements
    let positive_count = nums.iter().filter(|&&x| x > 5).count();
    println!("count > 5: {}", positive_count);
}`,
            output: `evens: [2, 4, 6, 8, 10]
even squares: [4, 16, 36, 64, 100]
parsed: [1, 3, 5]
count > 5: 5`,
            tip: 'Use filter_map when you want to filter and transform in one step. It is cleaner than .filter().map() and avoids double references.',
            codeHighlightLines: [5, 9, 10, 11, 15, 16, 17],
          },
        ],
        quiz: [
          {
            question: 'What does the closure in .filter() receive as its argument?',
            options: [
              'An owned copy of each element',
              'A mutable reference to each element',
              'A reference to each element (&&T when iterating with .iter())',
              'The index of each element',
            ],
            correctIndex: 2,
            explanation: 'filter passes a reference to each element to the predicate. Since .iter() already yields references (&T), the closure receives &&T (a reference to a reference). This is why you often see |&&x| in filter closures.',
          },
          {
            question: 'What is the advantage of filter_map over using .filter().map() separately?',
            options: [
              'filter_map is always faster because it uses SIMD instructions',
              'filter_map combines filtering and mapping in one step, avoiding double references',
              'filter_map can only be used with Option types',
              'There is no advantage; they are identical',
            ],
            correctIndex: 1,
            explanation: 'filter_map combines filter and map into a single step. The closure returns Option<B>: Some(value) to keep and transform, None to discard. This avoids the double-reference issue and is more concise.',
          },
          {
            question: 'What does vec!["1", "abc", "3"].iter().filter_map(|s| s.parse::<i32>().ok()).collect::<Vec<_>>() produce?',
            options: [
              'vec![1, 0, 3]',
              'vec![1, 3]',
              'It panics because "abc" cannot be parsed',
              'vec!["1", "3"]',
            ],
            correctIndex: 1,
            explanation: 'parse::<i32>() returns Result. .ok() converts it to Option — Some(n) for successful parses, None for failures. filter_map keeps only Some values, so "abc" is silently discarded, producing vec![1, 3].',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes a slice of strings and returns a Vec<i32> containing only the successfully parsed integers, doubled. Use filter_map to combine parsing and transformation.',
          starterCode: `fn parse_and_double(inputs: &[&str]) -> Vec<i32> {
    // Use .iter() and .filter_map() to parse strings into i32,
    // double them, and collect the results.
    // Strings that fail to parse should be silently skipped.
    todo!()
}

fn main() {
    let data = vec!["10", "abc", "20", "", "30", "xyz"];
    let result = parse_and_double(&data);
    println!("{:?}", result);
    // Expected: [20, 40, 60]
}`,
          solutionCode: `fn parse_and_double(inputs: &[&str]) -> Vec<i32> {
    inputs.iter()
        .filter_map(|s| s.parse::<i32>().ok())
        .map(|n| n * 2)
        .collect()
}

fn main() {
    let data = vec!["10", "abc", "20", "", "30", "xyz"];
    let result = parse_and_double(&data);
    println!("{:?}", result);
    // Output: [20, 40, 60]
}`,
          hints: [
            'Use .filter_map(|s| s.parse::<i32>().ok()) to parse and discard failures in one step.',
            'Chain a .map(|n| n * 2) after filter_map to double the successfully parsed values.',
            'Alternatively, do everything inside filter_map: .filter_map(|s| s.parse::<i32>().ok().map(|n| n * 2)).',
          ],
        },
      },
      {
        id: 'iter-collect',
        title: 'Iterator::collect',
        difficulty: 'intermediate',
        tags: ['iterator', 'collect', 'Vec', 'HashMap', 'String', 'conversion'],
        cheatSheetSummary: 'iter.collect::<Vec<_>>() — consume an iterator into a collection',
        signature: 'fn collect<B: FromIterator<Self::Item>>(self) -> B',
        sections: [
          {
            heading: 'Collecting Into Collections',
            content: 'collect consumes an iterator and builds a collection. The target type is inferred from context or specified with turbofish. collect can build Vec, HashMap, HashSet, String, BTreeMap, and any type implementing FromIterator.',
            code: `use std::collections::{HashMap, HashSet, BTreeMap};

fn main() {
    let nums = vec![1, 2, 3, 4, 5];

    // Collect into Vec
    let doubled: Vec<i32> = nums.iter().map(|&x| x * 2).collect();
    println!("vec: {:?}", doubled);

    // Collect into HashSet
    let unique: HashSet<i32> = vec![1, 2, 2, 3, 3, 3].into_iter().collect();
    println!("set: {:?}", unique);

    // Collect into HashMap
    let pairs: HashMap<&str, i32> = vec![("a", 1), ("b", 2), ("c", 3)]
        .into_iter()
        .collect();
    println!("map: {:?}", pairs);

    // Collect into String
    let chars: String = vec!['H', 'e', 'l', 'l', 'o'].into_iter().collect();
    println!("string: {}", chars);

    // Collect into BTreeMap (sorted)
    let sorted: BTreeMap<i32, &str> = vec![(3, "c"), (1, "a"), (2, "b")]
        .into_iter()
        .collect();
    println!("btree: {:?}", sorted);

    // Collect Result<Vec<T>, E>: fails on first error
    let results: Result<Vec<i32>, _> = vec!["1", "2", "3"]
        .iter()
        .map(|s| s.parse::<i32>())
        .collect();
    println!("results: {:?}", results);
}`,
            output: `vec: [2, 4, 6, 8, 10]
set: {1, 2, 3}
map: {"a": 1, "b": 2, "c": 3}
string: Hello
btree: {1: "a", 2: "b", 3: "c"}
results: Ok([1, 2, 3])`,
            note: 'collect is one of the most flexible methods in Rust. The return type drives what it builds. Use turbofish (::<Vec<_>>) or type annotations to guide inference.',
            analogy: 'Think of it like pouring liquid into different molds: the same stream of elements can be collected into a Vec (list mold), a HashSet (unique-items mold), a HashMap (key-value mold), or even a String (text mold). The mold you choose determines the shape of the result.',
            diagram: {
              kind: 'mermaid',
              code: `graph TD
  S["Iterator of elements"] --> V["collect::&lt;Vec&lt;T&gt;&gt;()"]
  S --> H["collect::&lt;HashSet&lt;T&gt;&gt;()"]
  S --> M["collect::&lt;HashMap&lt;K,V&gt;&gt;()"]
  S --> ST["collect::&lt;String&gt;()"]
  S --> R["collect::&lt;Result&lt;Vec&lt;T&gt;,E&gt;&gt;()"]
  V --> VR["[2, 4, 6, 8]"]
  H --> HR["{1, 2, 3}"]
  M --> MR["{a: 1, b: 2}"]
  ST --> STR["Hello"]
  R --> RR["Ok([1, 2, 3])"]
  style S fill:#6366f1,color:#fff
  style V fill:#10b981,color:#fff
  style H fill:#f59e0b,color:#fff
  style M fill:#ef4444,color:#fff
  style ST fill:#8b5cf6,color:#fff
  style R fill:#06b6d4,color:#fff`,
              caption: 'collect() is polymorphic: the same iterator can be collected into Vec, HashSet, HashMap, String, or Result depending on the target type',
            },
            codeHighlightLines: [7, 11, 15, 18, 21, 22, 28, 29, 30],
          },
        ],
        quiz: [
          {
            question: 'What determines which collection type .collect() builds?',
            options: [
              'The type of the source iterator',
              'The number of elements in the iterator',
              'The target type annotation or turbofish syntax',
              'A runtime configuration parameter',
            ],
            correctIndex: 2,
            explanation: 'collect() is generic over its return type. The target collection is determined by type inference from a variable annotation (let v: Vec<_> = ...) or turbofish syntax (.collect::<Vec<_>>()). Any type implementing FromIterator can be collected into.',
          },
          {
            question: 'What happens when you collect an iterator of Result<T, E> values into Result<Vec<T>, E>?',
            options: [
              'All errors are collected into a separate Vec',
              'It succeeds with all Ok values, discarding errors',
              'It short-circuits on the first Err and returns that error',
              'It panics if any element is an Err',
            ],
            correctIndex: 2,
            explanation: 'When collecting into Result<Vec<T>, E>, the operation short-circuits: if any element is Err, the entire result is that Err. If all elements are Ok, you get Ok(vec_of_values). This is extremely useful for error propagation.',
          },
          {
            question: 'Which of these is NOT a valid target for .collect()?',
            options: [
              'Vec<T>',
              'HashMap<K, V> (from iterator of tuples)',
              'String (from iterator of char)',
              'i32 (from iterator of i32)',
            ],
            correctIndex: 3,
            explanation: 'i32 does not implement FromIterator. To reduce an iterator of i32 to a single i32, use .sum(), .product(), or .fold(). collect builds collections, not scalar values.',
          },
          {
            question: 'What does vec![1, 2, 2, 3, 3, 3].into_iter().collect::<HashSet<i32>>() contain?',
            options: [
              '{1, 2, 2, 3, 3, 3}',
              '{1, 2, 3}',
              '{3, 2, 1}',
              'It fails to compile because of duplicate elements',
            ],
            correctIndex: 1,
            explanation: 'HashSet automatically deduplicates elements. Collecting duplicates into a HashSet keeps only unique values. The set will contain {1, 2, 3} (order is not guaranteed).',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes a list of (name, score) pairs and collects them into a HashMap. Then collect the keys into a sorted Vec<String>.',
          starterCode: `use std::collections::HashMap;

fn build_scoreboard(pairs: Vec<(&str, i32)>) -> (HashMap<String, i32>, Vec<String>) {
    // 1. Collect pairs into a HashMap<String, i32>
    // 2. Collect the keys into a Vec<String> and sort it
    // Return both
    todo!()
}

fn main() {
    let data = vec![("Charlie", 92), ("Alice", 95), ("Bob", 87)];
    let (map, sorted_names) = build_scoreboard(data);
    println!("map: {:?}", map);
    println!("sorted names: {:?}", sorted_names);
    // Expected sorted_names: ["Alice", "Bob", "Charlie"]
}`,
          solutionCode: `use std::collections::HashMap;

fn build_scoreboard(pairs: Vec<(&str, i32)>) -> (HashMap<String, i32>, Vec<String>) {
    let map: HashMap<String, i32> = pairs.into_iter()
        .map(|(name, score)| (name.to_string(), score))
        .collect();
    let mut sorted_names: Vec<String> = map.keys().cloned().collect();
    sorted_names.sort();
    (map, sorted_names)
}

fn main() {
    let data = vec![("Charlie", 92), ("Alice", 95), ("Bob", 87)];
    let (map, sorted_names) = build_scoreboard(data);
    println!("map: {:?}", map);
    println!("sorted names: {:?}", sorted_names);
    // Output sorted_names: ["Alice", "Bob", "Charlie"]
}`,
          hints: [
            'Use .into_iter().map(|(name, score)| (name.to_string(), score)).collect() to build the HashMap.',
            'Use map.keys().cloned().collect::<Vec<String>>() to get owned keys, then sort the vector.',
          ],
        },
      },
      {
        id: 'iter-fold',
        title: 'Iterator::fold',
        difficulty: 'intermediate',
        tags: ['iterator', 'fold', 'reduce', 'accumulate', 'aggregate'],
        cheatSheetSummary: 'iter.fold(init, |acc, x| acc + x) — reduce to a single value with initial state',
        signature: 'fn fold<B, F: FnMut(B, Self::Item) -> B>(self, init: B, f: F) -> B',
        sections: [
          {
            heading: 'Reducing to a Single Value',
            content: 'fold accumulates all elements into a single value starting from an initial accumulator. It is the most general aggregation method. reduce is similar but uses the first element as the initial value. Specialized methods like sum, product, min, max are optimized variants of fold.',
            code: `fn main() {
    let nums = vec![1, 2, 3, 4, 5];

    // Sum with fold
    let sum = nums.iter().fold(0, |acc, &x| acc + x);
    println!("fold sum: {}", sum);

    // Product
    let product = nums.iter().fold(1, |acc, &x| acc * x);
    println!("fold product: {}", product);

    // Build a string
    let csv = nums.iter().fold(String::new(), |mut acc, &x| {
        if !acc.is_empty() { acc.push_str(", "); }
        acc.push_str(&x.to_string());
        acc
    });
    println!("csv: {}", csv);

    // reduce: no initial value, uses first element
    let max = nums.iter().copied().reduce(i32::max);
    println!("reduce max: {:?}", max);

    // Specialized methods (preferred when available)
    let sum2: i32 = nums.iter().sum();
    let product2: i32 = nums.iter().product();
    let min = nums.iter().min();
    let max = nums.iter().max();
    println!("sum: {}, product: {}, min: {:?}, max: {:?}", sum2, product2, min, max);
}`,
            output: `fold sum: 15
fold product: 120
csv: 1, 2, 3, 4, 5
reduce max: Some(5)
sum: 15, product: 120, min: Some(1), max: Some(5)`,
            tip: 'Use .sum() and .product() instead of .fold() for simple aggregation. They are more readable and the compiler can optimize them better.',
            analogy: 'Think of it like a snowball rolling downhill: the accumulator starts as a small snowball (initial value), and as it rolls past each element, it picks up more snow (the folding function combines them). By the bottom, you have one big result.',
            diagram: {
              kind: 'custom',
              type: 'algorithm-steps',
              data: {
                title: 'fold(0, |acc, x| acc + x) over [1, 2, 3, 4, 5]',
                steps: [
                  { label: 'Step 0', description: 'acc = 0 (initial value)' },
                  { label: 'Step 1', description: 'acc = 0 + 1 = 1' },
                  { label: 'Step 2', description: 'acc = 1 + 2 = 3' },
                  { label: 'Step 3', description: 'acc = 3 + 3 = 6' },
                  { label: 'Step 4', description: 'acc = 6 + 4 = 10' },
                  { label: 'Step 5', description: 'acc = 10 + 5 = 15 (final result)' },
                ],
              },
              caption: 'fold processes elements left to right, threading the accumulator through each step',
            },
          },
        ],
        quiz: [
          {
            question: 'What is the key difference between fold and reduce?',
            options: [
              'fold is lazy but reduce is eager',
              'fold requires an initial accumulator value; reduce uses the first element as the initial value',
              'reduce can change the output type but fold cannot',
              'They are identical — reduce is just an alias for fold',
            ],
            correctIndex: 1,
            explanation: 'fold takes an explicit initial value (init) and a closure. reduce uses the first element of the iterator as the initial accumulator. Because of this, reduce returns Option<T> (None for empty iterators) while fold always returns the type of init.',
          },
          {
            question: 'What does vec![1, 2, 3, 4, 5].iter().fold(0, |acc, &x| acc + x) return?',
            options: [
              '0',
              '5',
              '15',
              '120',
            ],
            correctIndex: 2,
            explanation: 'fold starts with 0 and adds each element: 0+1=1, 1+2=3, 3+3=6, 6+4=10, 10+5=15. The result is 15, the sum of all elements.',
          },
          {
            question: 'Why is .sum() preferred over .fold(0, |acc, x| acc + x) for summing?',
            options: [
              '.sum() is faster because it uses hardware acceleration',
              '.sum() is more readable and the compiler can optimize it better',
              '.sum() works with more types than fold',
              '.sum() returns a different type than fold',
            ],
            correctIndex: 1,
            explanation: 'While both produce the same result, .sum() clearly communicates intent, is less error-prone (no manual accumulator), and the compiler may apply specialized optimizations for known aggregation patterns.',
          },
        ],
        challenge: {
          prompt: 'Use fold to implement a function that takes a slice of words and returns a single comma-separated string. Do NOT use the .join() method — build the string manually with fold.',
          starterCode: `fn join_with_commas(words: &[&str]) -> String {
    // Use .iter().fold() to build a comma-separated string
    // Example: ["hello", "world", "rust"] -> "hello, world, rust"
    // Do NOT use .join()
    todo!()
}

fn main() {
    let words = vec!["hello", "world", "rust"];
    println!("{}", join_with_commas(&words));
    // Expected: "hello, world, rust"

    println!("empty: '{}'", join_with_commas(&[]));
    // Expected: ""
}`,
          solutionCode: `fn join_with_commas(words: &[&str]) -> String {
    words.iter().fold(String::new(), |mut acc, &word| {
        if !acc.is_empty() {
            acc.push_str(", ");
        }
        acc.push_str(word);
        acc
    })
}

fn main() {
    let words = vec!["hello", "world", "rust"];
    println!("{}", join_with_commas(&words));
    // Output: "hello, world, rust"

    println!("empty: '{}'", join_with_commas(&[]));
    // Output: ""
}`,
          hints: [
            'Start with String::new() as the initial accumulator.',
            'Inside the closure, check if acc is empty before adding the comma separator.',
            'Use acc.push_str(", ") for the separator and acc.push_str(word) for the word, then return acc.',
          ],
        },
      },
      {
        id: 'iter-enumerate',
        title: 'Iterator::enumerate',
        difficulty: 'beginner',
        tags: ['iterator', 'enumerate', 'index', 'position', 'numbered'],
        cheatSheetSummary: 'iter.enumerate() -> (usize, T) — pair each element with its index',
        signature: 'fn enumerate(self) -> Enumerate<Self>',
        sections: [
          {
            heading: 'Indexed Iteration',
            content: 'enumerate wraps each element with its index, producing (index, element) tuples. The index starts at 0. This is the idiomatic way to track position during iteration, replacing manual counter variables.',
            code: `fn main() {
    let fruits = vec!["apple", "banana", "cherry", "date"];

    // Basic enumerate
    for (i, fruit) in fruits.iter().enumerate() {
        println!("{}: {}", i, fruit);
    }

    // Find index of an element
    let pos = fruits.iter()
        .enumerate()
        .find(|(_, &f)| f == "cherry")
        .map(|(i, _)| i);
    println!("cherry at: {:?}", pos);

    // Enumerate with filter
    let nums = vec![10, 20, 30, 40, 50];
    let big_indices: Vec<usize> = nums.iter()
        .enumerate()
        .filter(|(_, &&val)| val > 25)
        .map(|(i, _)| i)
        .collect();
    println!("indices > 25: {:?}", big_indices);

    // Enumerate + map for numbered list
    let numbered: Vec<String> = fruits.iter()
        .enumerate()
        .map(|(i, f)| format!("{}. {}", i + 1, f))
        .collect();
    println!("{:?}", numbered);
}`,
            output: `0: apple
1: banana
2: cherry
3: date
cherry at: Some(2)
indices > 25: [2, 3, 4]
["1. apple", "2. banana", "3. cherry", "4. date"]`,
          },
        ],
        quiz: [
          {
            question: 'What type does .enumerate() yield for each element?',
            options: [
              '(i32, T)',
              '(usize, T)',
              '(u32, T)',
              '(isize, T)',
            ],
            correctIndex: 1,
            explanation: 'enumerate() wraps each element as (usize, Self::Item). The index is always usize (unsigned pointer-sized integer), starting from 0.',
          },
          {
            question: 'What does the index start at when using .enumerate()?',
            options: [
              '1',
              '-1',
              '0',
              'It depends on the collection type',
            ],
            correctIndex: 2,
            explanation: 'enumerate() always starts the index at 0, matching Rust\'s zero-based indexing convention. If you need 1-based numbering, add 1 inside the closure (e.g., i + 1).',
          },
          {
            question: 'How would you find the index of the first element greater than 10 in a Vec<i32>?',
            options: [
              'nums.iter().enumerate().find(|(_, &x)| x > 10).map(|(i, _)| i)',
              'nums.iter().index_of(|x| x > 10)',
              'nums.enumerate().filter(|x| x > 10).first()',
              'nums.find_index(|x| x > 10)',
            ],
            correctIndex: 0,
            explanation: 'Chain .enumerate() to pair elements with indices, then .find() to locate the first match, then .map(|(i, _)| i) to extract just the index. Rust does not have a direct index_of method on iterators.',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes a slice of strings and returns a Vec of formatted strings like "1. item" (1-indexed). Skip any empty strings and do not number them.',
          starterCode: `fn numbered_list(items: &[&str]) -> Vec<String> {
    // Filter out empty strings, then enumerate to create
    // a 1-indexed numbered list like "1. apple", "2. banana"
    todo!()
}

fn main() {
    let items = vec!["apple", "", "banana", "", "cherry"];
    let result = numbered_list(&items);
    for line in &result {
        println!("{}", line);
    }
    // Expected:
    // 1. apple
    // 2. banana
    // 3. cherry
}`,
          solutionCode: `fn numbered_list(items: &[&str]) -> Vec<String> {
    items.iter()
        .filter(|s| !s.is_empty())
        .enumerate()
        .map(|(i, s)| format!("{}. {}", i + 1, s))
        .collect()
}

fn main() {
    let items = vec!["apple", "", "banana", "", "cherry"];
    let result = numbered_list(&items);
    for line in &result {
        println!("{}", line);
    }
    // Output:
    // 1. apple
    // 2. banana
    // 3. cherry
}`,
          hints: [
            'Filter out empty strings first with .filter(|s| !s.is_empty()), then call .enumerate().',
            'Placing .enumerate() after .filter() ensures the numbering is sequential with no gaps.',
            'Use format!("{}. {}", i + 1, s) to create 1-indexed numbering.',
          ],
        },
      },
      {
        id: 'iter-zip',
        title: 'Iterator::zip',
        difficulty: 'intermediate',
        tags: ['iterator', 'zip', 'pair', 'parallel-iteration', 'combine'],
        cheatSheetSummary: 'a.iter().zip(b.iter()) — combine two iterators element-wise',
        signature: 'fn zip<U: IntoIterator>(self, other: U) -> Zip<Self, U::IntoIter>',
        sections: [
          {
            heading: 'Combining Two Iterators',
            content: 'zip combines two iterators into one that yields pairs. It stops at the shorter iterator. unzip does the reverse, splitting an iterator of pairs into two collections.',
            code: `fn main() {
    let names = vec!["Alice", "Bob", "Charlie"];
    let scores = vec![95, 87, 92];

    // Basic zip
    let pairs: Vec<_> = names.iter().zip(scores.iter()).collect();
    println!("pairs: {:?}", pairs);

    // Zip in a for loop
    for (name, score) in names.iter().zip(scores.iter()) {
        println!("{}: {}", name, score);
    }

    // Zip with map to compute
    let v1 = vec![1, 2, 3, 4];
    let v2 = vec![10, 20, 30, 40];
    let sums: Vec<i32> = v1.iter().zip(v2.iter())
        .map(|(&a, &b)| a + b)
        .collect();
    println!("element-wise sum: {:?}", sums);

    // Dot product
    let dot: i32 = v1.iter().zip(v2.iter())
        .map(|(&a, &b)| a * b)
        .sum();
    println!("dot product: {}", dot);

    // unzip: split pairs into two collections
    let data = vec![(1, 'a'), (2, 'b'), (3, 'c')];
    let (numbers, letters): (Vec<i32>, Vec<char>) = data.into_iter().unzip();
    println!("numbers: {:?}, letters: {:?}", numbers, letters);

    // Zip stops at shorter iterator
    let short = vec![1, 2];
    let long = vec![10, 20, 30, 40];
    let zipped: Vec<_> = short.iter().zip(long.iter()).collect();
    println!("mismatched: {:?}", zipped); // only 2 pairs
}`,
            output: `pairs: [("Alice", 95), ("Bob", 87), ("Charlie", 92)]
Alice: 95
Bob: 87
Charlie: 92
element-wise sum: [11, 22, 33, 44]
dot product: 300
numbers: [1, 2, 3], letters: ['a', 'b', 'c']
mismatched: [(1, 10), (2, 20)]`,
            diagram: {
              kind: 'mermaid',
              code: `graph LR
  A["[A, B, C]"] --> Z["zip"]
  B["[1, 2, 3]"] --> Z
  Z --> R["[(A,1), (B,2), (C,3)]"]
  R -->|"unzip()"| A2["[A, B, C]"]
  R -->|"unzip()"| B2["[1, 2, 3]"]
  style A fill:#60a5fa,color:#fff
  style B fill:#f59e0b,color:#fff
  style Z fill:#8b5cf6,color:#fff
  style R fill:#10b981,color:#fff
  style A2 fill:#60a5fa,color:#fff
  style B2 fill:#f59e0b,color:#fff`,
              caption: 'zip combines two iterators element-wise into pairs; unzip reverses the operation',
            },
          },
        ],
        quiz: [
          {
            question: 'What happens when you zip two iterators of different lengths?',
            options: [
              'It panics at runtime',
              'The shorter iterator is padded with default values',
              'It stops when the shorter iterator is exhausted',
              'It stops when the longer iterator is exhausted',
            ],
            correctIndex: 2,
            explanation: 'zip stops producing pairs as soon as either iterator is exhausted. If you zip [1, 2] with [10, 20, 30], you get only [(1, 10), (2, 20)]. The extra element 30 is never yielded.',
          },
          {
            question: 'What does .unzip() do?',
            options: [
              'It reverses the order of a zipped iterator',
              'It splits an iterator of pairs into two separate collections',
              'It decompresses a compressed iterator',
              'It undoes a previous zip operation and restores the original iterators',
            ],
            correctIndex: 1,
            explanation: 'unzip() takes an iterator of (A, B) pairs and collects them into two separate collections: one of all the A values and one of all the B values. You must provide type annotations for both collections.',
          },
          {
            question: 'How would you compute the dot product of two vectors using zip?',
            options: [
              'a.iter().zip(b.iter()).sum()',
              'a.iter().zip(b.iter()).map(|(&a, &b)| a * b).sum()',
              'a.iter().zip(b.iter()).fold(0, |acc, (a, b)| a * b)',
              'a.iter().zip(b.iter()).product()',
            ],
            correctIndex: 1,
            explanation: 'The dot product is the sum of element-wise products. Zip pairs corresponding elements, map multiplies each pair, and sum adds the products: a[0]*b[0] + a[1]*b[1] + ...',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes two slices of equal length and returns a Vec of tuples where each tuple contains the element from the first slice and the element from the second slice, but only include pairs where the sum of the two elements is even.',
          starterCode: `fn even_sum_pairs(a: &[i32], b: &[i32]) -> Vec<(i32, i32)> {
    // Zip the two slices, filter to keep only pairs where
    // a + b is even, and collect into a Vec of tuples
    todo!()
}

fn main() {
    let a = vec![1, 2, 3, 4, 5];
    let b = vec![3, 4, 5, 6, 7];
    let result = even_sum_pairs(&a, &b);
    println!("{:?}", result);
    // Expected: [(1, 3), (2, 4), (3, 5), (4, 6), (5, 7)]
    // 1+3=4(even), 2+4=6(even), 3+5=8(even), 4+6=10(even), 5+7=12(even)
}`,
          solutionCode: `fn even_sum_pairs(a: &[i32], b: &[i32]) -> Vec<(i32, i32)> {
    a.iter()
        .zip(b.iter())
        .filter(|(&x, &y)| (x + y) % 2 == 0)
        .map(|(&x, &y)| (x, y))
        .collect()
}

fn main() {
    let a = vec![1, 2, 3, 4, 5];
    let b = vec![3, 4, 5, 6, 7];
    let result = even_sum_pairs(&a, &b);
    println!("{:?}", result);
    // Output: [(1, 3), (2, 4), (3, 5), (4, 6), (5, 7)]
}`,
          hints: [
            'Use a.iter().zip(b.iter()) to pair corresponding elements from both slices.',
            'Use .filter(|(&x, &y)| (x + y) % 2 == 0) to keep only pairs with an even sum.',
            'Use .map(|(&x, &y)| (x, y)) to convert from references to owned values before collecting.',
          ],
        },
      },
      {
        id: 'iter-take',
        title: 'Iterator::take',
        difficulty: 'beginner',
        tags: ['iterator', 'take', 'limit', 'first-n', 'truncate'],
        cheatSheetSummary: 'iter.take(n) — yield only the first n elements',
        signature: 'fn take(self, n: usize) -> Take<Self>',
        sections: [
          {
            heading: 'Limiting Elements',
            content: 'take yields at most n elements from the iterator, then stops. take_while yields elements as long as a predicate is true, stopping at the first false. Both are lazy adapters.',
            code: `fn main() {
    let nums = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // take first 3
    let first3: Vec<_> = nums.iter().take(3).collect();
    println!("first 3: {:?}", first3);

    // take_while: stop at first false
    let ascending: Vec<_> = vec![1, 2, 3, 5, 4, 6]
        .iter()
        .take_while(|&&x| x <= 3)
        .collect();
    println!("take_while <= 3: {:?}", ascending);

    // Combine with skip for pagination
    let page_size = 3;
    let page_2: Vec<_> = nums.iter().skip(page_size).take(page_size).collect();
    println!("page 2 (size 3): {:?}", page_2);

    // take from infinite iterator
    let first_10_squares: Vec<u64> = (1..)
        .map(|x: u64| x * x)
        .take(10)
        .collect();
    println!("first 10 squares: {:?}", first_10_squares);

    // Top N pattern
    let mut scores = vec![85, 92, 78, 95, 88, 91, 73, 99];
    scores.sort_unstable_by(|a, b| b.cmp(a));
    let top3: Vec<_> = scores.iter().take(3).collect();
    println!("top 3 scores: {:?}", top3);
}`,
            output: `first 3: [1, 2, 3]
take_while <= 3: [1, 2, 3]
page 2 (size 3): [4, 5, 6]
first 10 squares: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
top 3 scores: [99, 95, 92]`,
          },
        ],
        quiz: [
          {
            question: 'What happens if you call .take(10) on an iterator with only 3 elements?',
            options: [
              'It panics because there are not enough elements',
              'It pads the result with default values to reach 10',
              'It yields all 3 elements without error',
              'It returns an empty iterator',
            ],
            correctIndex: 2,
            explanation: 'take(n) yields up to n elements. If the source has fewer than n elements, it simply yields all available elements and stops. No error or padding occurs.',
          },
          {
            question: 'What is the difference between .take(n) and .take_while(predicate)?',
            options: [
              'take limits by count; take_while limits by a condition',
              'take is eager; take_while is lazy',
              'take_while can only be used after filter',
              'They are identical in behavior',
            ],
            correctIndex: 0,
            explanation: 'take(n) yields exactly the first n elements (or fewer if the iterator is shorter). take_while(predicate) yields elements as long as the predicate returns true, stopping at the first false regardless of how many elements remain.',
          },
          {
            question: 'How can you use take with an infinite iterator safely?',
            options: [
              'You cannot — infinite iterators always cause infinite loops',
              'Call .take(n) before .collect() to limit the number of elements consumed',
              'Use .take() only with .for_each(), not .collect()',
              'Wrap the infinite iterator in an Option first',
            ],
            correctIndex: 1,
            explanation: 'take(n) is essential for working with infinite iterators like (1..). It limits consumption to n elements, making .collect() and other consumers safe to use. Without take, consuming an infinite iterator would loop forever.',
          },
        ],
        challenge: {
          prompt: 'Write a function that generates the first N Fibonacci numbers using an infinite iterator with take. Use std::iter::successors or a custom approach.',
          starterCode: `fn fibonacci(n: usize) -> Vec<u64> {
    // Generate the first n Fibonacci numbers
    // Hint: Use std::iter::successors or a state-based approach
    // with .take(n).collect()
    todo!()
}

fn main() {
    let fibs = fibonacci(10);
    println!("{:?}", fibs);
    // Expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
}`,
          solutionCode: `fn fibonacci(n: usize) -> Vec<u64> {
    std::iter::successors(Some((0u64, 1u64)), |&(a, b)| Some((b, a + b)))
        .map(|(a, _)| a)
        .take(n)
        .collect()
}

fn main() {
    let fibs = fibonacci(10);
    println!("{:?}", fibs);
    // Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
}`,
          hints: [
            'std::iter::successors(Some(seed), |prev| Some(next)) creates an infinite iterator from a seed and a function.',
            'Store both the current and next Fibonacci number as a tuple (a, b), and produce (b, a + b) each step.',
            'Use .map(|(a, _)| a) to extract just the Fibonacci number, then .take(n).collect().',
          ],
        },
      },
      {
        id: 'iter-skip',
        title: 'Iterator::skip',
        difficulty: 'beginner',
        tags: ['iterator', 'skip', 'offset', 'drop-first', 'pagination'],
        cheatSheetSummary: 'iter.skip(n) — skip the first n elements, yield the rest',
        signature: 'fn skip(self, n: usize) -> Skip<Self>',
        sections: [
          {
            heading: 'Skipping Elements',
            content: 'skip discards the first n elements and yields the rest. skip_while skips elements while a predicate is true, then yields all remaining elements. Combine skip and take for pagination.',
            code: `fn main() {
    let nums = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // skip first 3
    let rest: Vec<_> = nums.iter().skip(3).collect();
    println!("skip 3: {:?}", rest);

    // skip_while: skip while predicate true
    let after: Vec<_> = nums.iter()
        .skip_while(|&&x| x < 5)
        .collect();
    println!("skip_while < 5: {:?}", after);

    // Pagination
    fn paginate<T>(items: &[T], page: usize, per_page: usize) -> &[T] {
        let start = page * per_page;
        let end = (start + per_page).min(items.len());
        if start >= items.len() { &[] } else { &items[start..end] }
    }

    let data: Vec<i32> = (1..=20).collect();
    println!("page 0: {:?}", paginate(&data, 0, 5));
    println!("page 1: {:?}", paginate(&data, 1, 5));
    println!("page 3: {:?}", paginate(&data, 3, 5));

    // Skip header line
    let csv = "name,age\nAlice,30\nBob,25";
    for line in csv.lines().skip(1) {
        println!("  data: {}", line);
    }
}`,
            output: `skip 3: [4, 5, 6, 7, 8, 9, 10]
skip_while < 5: [5, 6, 7, 8, 9, 10]
page 0: [1, 2, 3, 4, 5]
page 1: [6, 7, 8, 9, 10]
page 3: [16, 17, 18, 19, 20]
  data: Alice,30
  data: Bob,25`,
          },
        ],
        quiz: [
          {
            question: 'What does .skip(3) do to an iterator with 10 elements?',
            options: [
              'Returns the first 3 elements',
              'Removes every 3rd element',
              'Discards the first 3 elements and yields the remaining 7',
              'Returns elements at indices 0, 3, 6, 9',
            ],
            correctIndex: 2,
            explanation: 'skip(n) discards the first n elements and yields everything after. For an iterator of [1..=10], skip(3) yields [4, 5, 6, 7, 8, 9, 10].',
          },
          {
            question: 'How do you implement pagination using skip and take?',
            options: [
              '.take(page_size).skip(page * page_size)',
              '.skip(page * page_size).take(page_size)',
              '.skip(page_size).take(page)',
              '.take(page).skip(page_size)',
            ],
            correctIndex: 1,
            explanation: 'To get page N (0-indexed) with a given page_size: first skip to the start of the page with .skip(page * page_size), then take page_size elements. The order matters — skip first, then take.',
          },
          {
            question: 'What is the difference between skip_while and skip?',
            options: [
              'skip_while takes a count; skip takes a predicate',
              'skip discards a fixed count; skip_while discards while a predicate is true',
              'skip_while skips elements throughout the iterator; skip only at the start',
              'They behave identically',
            ],
            correctIndex: 1,
            explanation: 'skip(n) discards exactly n elements from the front. skip_while(predicate) discards elements as long as the predicate returns true, then yields ALL remaining elements (even if later elements would match the predicate again).',
          },
        ],
        challenge: {
          prompt: 'Write a function that parses a simple CSV string (first line is header) and returns a Vec of (name, age) tuples, skipping the header line using .skip().',
          starterCode: `fn parse_csv(csv: &str) -> Vec<(String, u32)> {
    // Skip the header line, then parse each remaining line
    // as "name,age" and collect into Vec<(String, u32)>
    // Skip any lines that fail to parse
    todo!()
}

fn main() {
    let csv = "name,age\\nAlice,30\\nBob,25\\nCharlie,35";
    let result = parse_csv(csv);
    println!("{:?}", result);
    // Expected: [("Alice", 30), ("Bob", 25), ("Charlie", 35)]
}`,
          solutionCode: `fn parse_csv(csv: &str) -> Vec<(String, u32)> {
    csv.lines()
        .skip(1) // skip header
        .filter_map(|line| {
            let mut parts = line.splitn(2, ',');
            let name = parts.next()?.to_string();
            let age = parts.next()?.parse::<u32>().ok()?;
            Some((name, age))
        })
        .collect()
}

fn main() {
    let csv = "name,age\\nAlice,30\\nBob,25\\nCharlie,35";
    let result = parse_csv(csv);
    println!("{:?}", result);
    // Output: [("Alice", 30), ("Bob", 25), ("Charlie", 35)]
}`,
          hints: [
            'Use csv.lines().skip(1) to skip the header row.',
            'For each data line, use .splitn(2, \',\') to split into name and age parts.',
            'Use filter_map with the ? operator inside a closure to gracefully handle parse failures.',
          ],
        },
      },
      {
        id: 'iter-chain',
        title: 'Iterator::chain',
        difficulty: 'intermediate',
        tags: ['iterator', 'chain', 'concatenate', 'append', 'merge'],
        cheatSheetSummary: 'a.iter().chain(b.iter()) — concatenate two iterators sequentially',
        signature: 'fn chain<U: IntoIterator>(self, other: U) -> Chain<Self, U::IntoIter>',
        sections: [
          {
            heading: 'Concatenating Iterators',
            content: 'chain connects two iterators end-to-end. The resulting iterator yields all elements from the first, followed by all elements from the second. This is useful for combining multiple sources without allocating.',
            code: `fn main() {
    let a = vec![1, 2, 3];
    let b = vec![4, 5, 6];

    // Chain two iterators
    let combined: Vec<_> = a.iter().chain(b.iter()).collect();
    println!("chained: {:?}", combined);

    // Chain multiple sources
    let c = vec![7, 8, 9];
    let all: Vec<_> = a.iter()
        .chain(b.iter())
        .chain(c.iter())
        .collect();
    println!("triple chain: {:?}", all);

    // Chain with a single element
    let with_zero: Vec<_> = std::iter::once(&0)
        .chain(a.iter())
        .collect();
    println!("with zero prefix: {:?}", with_zero);

    // Practical: merge sorted arrays (interleave)
    let evens = vec![2, 4, 6, 8];
    let odds = vec![1, 3, 5, 7];
    let mut merged: Vec<_> = evens.iter().chain(odds.iter()).copied().collect();
    merged.sort();
    println!("merged sorted: {:?}", merged);

    // Chain with empty for conditional extension
    let extra: Vec<i32> = if true { vec![99, 100] } else { vec![] };
    let extended: Vec<_> = a.iter().chain(extra.iter()).collect();
    println!("conditionally extended: {:?}", extended);
}`,
            output: `chained: [1, 2, 3, 4, 5, 6]
triple chain: [1, 2, 3, 4, 5, 6, 7, 8, 9]
with zero prefix: [0, 1, 2, 3]
merged sorted: [1, 2, 3, 4, 5, 6, 7, 8]
conditionally extended: [1, 2, 3, 99, 100]`,
          },
        ],
        quiz: [
          {
            question: 'Does .chain() allocate a new collection to hold both iterators?',
            options: [
              'Yes, it creates a new Vec with all elements',
              'No, it is a lazy adapter that yields from the first then the second iterator',
              'It allocates only if the iterators have different types',
              'It depends on whether you call .collect() afterwards',
            ],
            correctIndex: 1,
            explanation: 'chain() is a lazy iterator adapter. It yields all elements from the first iterator, then all elements from the second, without allocating any intermediate collection. Allocation only happens when you consume it (e.g., with .collect()).',
          },
          {
            question: 'How can you prepend a single element to an iterator using chain?',
            options: [
              'iter.chain(element)',
              'std::iter::once(element).chain(iter)',
              'iter.prepend(element)',
              'vec![element].chain(iter)',
            ],
            correctIndex: 1,
            explanation: 'std::iter::once(element) creates a single-element iterator. Chaining it before the main iterator effectively prepends the element: once(0).chain(nums.iter()) yields 0 followed by all elements of nums.',
          },
          {
            question: 'What is the result of chaining three iterators: [1,2].chain([3,4]).chain([5,6])?',
            options: [
              '[[1,2], [3,4], [5,6]]',
              '[1, 2, 3, 4, 5, 6]',
              '[(1,3,5), (2,4,6)]',
              'It fails to compile because chain only works with two iterators',
            ],
            correctIndex: 1,
            explanation: 'chain() concatenates iterators sequentially. Multiple chain calls produce a flat sequence: first all elements of the first, then the second, then the third. The result is [1, 2, 3, 4, 5, 6].',
          },
        ],
        challenge: {
          prompt: 'Write a function that merges two sorted slices into a single sorted Vec using chain and sort. Then write a second version that merges them in O(n) without sorting (manual merge of two sorted sequences).',
          starterCode: `fn merge_sorted_simple(a: &[i32], b: &[i32]) -> Vec<i32> {
    // Version 1: Use chain + sort
    todo!()
}

fn merge_sorted_linear(a: &[i32], b: &[i32]) -> Vec<i32> {
    // Version 2: Manual merge in O(n) using two indices
    todo!()
}

fn main() {
    let a = vec![1, 3, 5, 7];
    let b = vec![2, 4, 6, 8];
    println!("simple: {:?}", merge_sorted_simple(&a, &b));
    println!("linear: {:?}", merge_sorted_linear(&a, &b));
    // Both expected: [1, 2, 3, 4, 5, 6, 7, 8]
}`,
          solutionCode: `fn merge_sorted_simple(a: &[i32], b: &[i32]) -> Vec<i32> {
    let mut result: Vec<i32> = a.iter().chain(b.iter()).copied().collect();
    result.sort();
    result
}

fn merge_sorted_linear(a: &[i32], b: &[i32]) -> Vec<i32> {
    let mut result = Vec::with_capacity(a.len() + b.len());
    let (mut i, mut j) = (0, 0);
    while i < a.len() && j < b.len() {
        if a[i] <= b[j] {
            result.push(a[i]);
            i += 1;
        } else {
            result.push(b[j]);
            j += 1;
        }
    }
    result.extend_from_slice(&a[i..]);
    result.extend_from_slice(&b[j..]);
    result
}

fn main() {
    let a = vec![1, 3, 5, 7];
    let b = vec![2, 4, 6, 8];
    println!("simple: {:?}", merge_sorted_simple(&a, &b));
    println!("linear: {:?}", merge_sorted_linear(&a, &b));
    // Output: [1, 2, 3, 4, 5, 6, 7, 8]
}`,
          hints: [
            'For the simple version: chain both iterators, .copied().collect() into a Vec, then call .sort().',
            'For the linear version: use two index variables and compare elements, pushing the smaller one each time.',
            'After one slice is exhausted, use .extend_from_slice() to append the remaining elements of the other.',
          ],
        },
      },
      {
        id: 'iter-any-all',
        title: 'Iterator::any & all',
        difficulty: 'beginner',
        tags: ['iterator', 'any', 'all', 'predicate', 'check', 'boolean'],
        cheatSheetSummary: 'iter.any(|x| pred) / iter.all(|x| pred) — check if any/all match',
        signature: 'fn any<F: FnMut(Self::Item) -> bool>(&mut self, f: F) -> bool',
        sections: [
          {
            heading: 'Testing Predicates',
            content: 'any returns true if at least one element satisfies the predicate. all returns true if every element satisfies it (or the iterator is empty). Both are short-circuiting — they stop as soon as the answer is determined.',
            code: `fn main() {
    let nums = vec![1, 2, 3, 4, 5];

    // any: at least one matches
    println!("any > 3: {}", nums.iter().any(|&x| x > 3));
    println!("any > 10: {}", nums.iter().any(|&x| x > 10));
    println!("any negative: {}", nums.iter().any(|&x| x < 0));

    // all: every element matches
    println!("all > 0: {}", nums.iter().all(|&x| x > 0));
    println!("all > 3: {}", nums.iter().all(|&x| x > 3));
    println!("all even: {}", nums.iter().all(|&x| x % 2 == 0));

    // Short-circuit: stops early
    let data = vec![1, 2, 3, 4, 5];
    let found = data.iter().any(|&x| {
        println!("  checking {}", x);
        x == 3
    });
    println!("found 3: {} (stopped after 3 checks)", found);

    // Empty iterator edge cases
    let empty: Vec<i32> = vec![];
    println!("empty any: {}", empty.iter().any(|&x| x > 0));  // false
    println!("empty all: {}", empty.iter().all(|&x| x > 0));  // true (vacuously)

    // Practical: validation
    let passwords = vec!["abc", "p@ssw0rd!", "12345"];
    let all_strong = passwords.iter().all(|p| p.len() >= 8);
    let any_short = passwords.iter().any(|p| p.len() < 6);
    println!("all strong: {}, any short: {}", all_strong, any_short);
}`,
            output: `any > 3: true
any > 10: false
any negative: false
all > 0: true
all > 3: false
all even: false
  checking 1
  checking 2
  checking 3
found 3: true (stopped after 3 checks)
empty any: false
empty all: true
all strong: false, any short: true`,
            note: 'all on an empty iterator returns true (vacuous truth). any on an empty iterator returns false. These are the standard mathematical conventions.',
          },
        ],
        quiz: [
          {
            question: 'What does .all() return on an empty iterator?',
            options: [
              'false',
              'true (vacuous truth)',
              'None',
              'It panics because there are no elements to test',
            ],
            correctIndex: 1,
            explanation: 'all() on an empty iterator returns true. This is called "vacuous truth" in logic: the statement "all elements satisfy P" is trivially true when there are no elements. Conversely, any() on an empty iterator returns false.',
          },
          {
            question: 'What does "short-circuiting" mean for .any() and .all()?',
            options: [
              'They process all elements before returning',
              'They stop early once the result is determined',
              'They return immediately without checking any elements',
              'They process elements in parallel',
            ],
            correctIndex: 1,
            explanation: 'Short-circuiting means the iterator stops as soon as the answer is known. any() stops at the first true (one match is enough). all() stops at the first false (one failure disproves "all"). This can be a significant performance optimization.',
          },
          {
            question: 'Which expression checks if NO elements in a Vec<i32> are negative?',
            options: [
              'nums.iter().any(|&x| x >= 0)',
              'nums.iter().all(|&x| x >= 0)',
              '!nums.iter().all(|&x| x < 0)',
              'nums.iter().filter(|&&x| x < 0).count() == nums.len()',
            ],
            correctIndex: 1,
            explanation: 'nums.iter().all(|&x| x >= 0) returns true if every element is non-negative, which means no elements are negative. Alternatively, !nums.iter().any(|&x| x < 0) also works, but .all() is more direct and readable.',
          },
          {
            question: 'What does vec![1, 2, 3].iter().any(|&x| x > 5) return?',
            options: [
              'true',
              'false',
              'Some(false)',
              'None',
            ],
            correctIndex: 1,
            explanation: 'No element in [1, 2, 3] is greater than 5, so .any(|&x| x > 5) returns false. any() checks all elements and since none match, the result is false.',
          },
        ],
        challenge: {
          prompt: 'Write a password validator function that checks multiple conditions using any() and all(). A valid password must: be at least 8 characters, contain at least one uppercase letter, at least one digit, and at least one special character (!@#$%^&*).',
          starterCode: `fn is_valid_password(password: &str) -> bool {
    // Check all conditions:
    // 1. At least 8 characters long
    // 2. Contains at least one uppercase letter
    // 3. Contains at least one digit
    // 4. Contains at least one special character from "!@#$%^&*"
    // Use .any() and/or .all() on the password characters
    todo!()
}

fn main() {
    let tests = vec![
        ("Passw0rd!", true),
        ("short1!", false),        // too short
        ("alllowercase1!", false), // no uppercase
        ("NOLOWER1!", true),       // has uppercase, digit, special (no lowercase req)
        ("NoSpecial1", false),     // no special char
        ("NoDigits!Ab", false),    // no digit
    ];
    for (pw, expected) in tests {
        let result = is_valid_password(pw);
        println!("{:16} => {} (expected {})", pw, result, expected);
    }
}`,
          solutionCode: `fn is_valid_password(password: &str) -> bool {
    let has_length = password.len() >= 8;
    let has_upper = password.chars().any(|c| c.is_uppercase());
    let has_digit = password.chars().any(|c| c.is_ascii_digit());
    let specials = "!@#$%^&*";
    let has_special = password.chars().any(|c| specials.contains(c));
    has_length && has_upper && has_digit && has_special
}

fn main() {
    let tests = vec![
        ("Passw0rd!", true),
        ("short1!", false),
        ("alllowercase1!", false),
        ("NOLOWER1!", true),
        ("NoSpecial1", false),
        ("NoDigits!Ab", false),
    ];
    for (pw, expected) in tests {
        let result = is_valid_password(pw);
        println!("{:16} => {} (expected {})", pw, result, expected);
    }
}`,
          hints: [
            'Use password.chars().any(|c| c.is_uppercase()) to check for uppercase letters.',
            'Use password.chars().any(|c| c.is_ascii_digit()) for digits and "!@#$%^&*".contains(c) for specials.',
            'Combine all conditions with && to require all of them to be true.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  HashMap Methods                                              */
  /* ------------------------------------------------------------ */
  {
    id: 'rust-hashmap-methods',
    label: 'HashMap Methods',
    icon: 'Key',
    entries: [
      {
        id: 'hm-insert',
        title: 'HashMap::insert',
        difficulty: 'beginner',
        tags: ['hashmap', 'insert', 'upsert', 'add', 'put'],
        cheatSheetSummary: 'map.insert(key, value) -> Option<V> — insert or overwrite, returns old value',
        signature: 'fn insert(&mut self, k: K, v: V) -> Option<V>',
        sections: [
          {
            heading: 'Inserting Key-Value Pairs',
            content: 'insert adds a key-value pair. If the key already exists, the value is replaced and the old value is returned as Some(old). If the key is new, None is returned. This is an "upsert" operation.',
            code: `use std::collections::HashMap;

fn main() {
    let mut scores: HashMap<&str, i32> = HashMap::new();

    // Insert new key
    let old = scores.insert("Alice", 95);
    println!("first insert: {:?}", old); // None

    // Update existing key
    let old = scores.insert("Alice", 100);
    println!("update: {:?}", old); // Some(95)

    println!("Alice: {}", scores["Alice"]); // 100

    // Batch insert
    let data = vec![("Bob", 87), ("Charlie", 92), ("Diana", 88)];
    for (name, score) in data {
        scores.insert(name, score);
    }
    println!("{:?}", scores);

    // Check if insert was an update
    if let Some(prev) = scores.insert("Bob", 90) {
        println!("Updated Bob: {} -> 90", prev);
    }
}`,
            output: `first insert: None
update: Some(95)
Alice: 100
{"Diana": 88, "Bob": 87, "Charlie": 92, "Alice": 100}
Updated Bob: 87 -> 90`,
            diagram: {
              kind: 'custom',
              type: 'hash-map',
              data: {
                entries: [
                  { key: '"Alice"', value: '100', color: '#10b981' },
                  { key: '"Bob"', value: '90', color: '#f59e0b' },
                  { key: '"Charlie"', value: '92', color: '#6366f1' },
                  { key: '"Diana"', value: '88', color: '#ef4444' },
                ],
                operations: [
                  { name: 'insert("Alice", 95)', result: 'None (new key)' },
                  { name: 'insert("Alice", 100)', result: 'Some(95) (replaced)' },
                ],
              },
              caption: 'HashMap::insert returns None for new keys or Some(old_value) when replacing an existing entry',
            },
          },
        ],
        quiz: [
          {
            question: 'What does HashMap::insert return when inserting a key that already exists?',
            options: [
              'None',
              'Some(old_value) — the previous value associated with that key',
              'true if the insert succeeded',
              'A reference to the newly inserted value',
            ],
            correctIndex: 1,
            explanation: 'insert returns Some(old_value) when the key already existed, replacing the old value with the new one. If the key was not present, it returns None. This lets you detect and react to overwrites.',
          },
          {
            question: 'What does HashMap::insert return when inserting a brand new key?',
            options: [
              'Some(value) — the value just inserted',
              'true',
              'None — because there was no previous value',
              'A Result indicating success',
            ],
            correctIndex: 2,
            explanation: 'When inserting a new key that did not exist before, insert returns None because there is no previous value to return.',
          },
          {
            question: 'Which method should you use instead of insert when you only want to insert if the key does NOT already exist?',
            options: [
              'map.insert_if_absent(key, value)',
              'map.entry(key).or_insert(value)',
              'map.try_insert(key, value)',
              'if !map.contains_key(&key) { map.insert(key, value); }',
            ],
            correctIndex: 1,
            explanation: 'The entry API with .or_insert(value) is the idiomatic way to insert only if the key is missing. It performs a single hash lookup, unlike the contains_key + insert pattern which does two lookups.',
          },
        ],
        challenge: {
          prompt: 'Write a function that inserts key-value pairs into a HashMap and returns a Vec of all the values that were replaced (overwritten). Use the return value of .insert() to detect overwrites.',
          starterCode: `use std::collections::HashMap;

fn insert_and_track_overwrites(
    pairs: &[(&str, i32)],
) -> (HashMap<String, i32>, Vec<i32>) {
    // Insert all pairs into a HashMap.
    // Collect any overwritten values into a Vec.
    // Return both the final map and the overwritten values.
    todo!()
}

fn main() {
    let pairs = vec![
        ("Alice", 90), ("Bob", 85), ("Alice", 95), ("Bob", 88), ("Charlie", 92),
    ];
    let (map, overwrites) = insert_and_track_overwrites(&pairs);
    println!("map: {:?}", map);
    println!("overwrites: {:?}", overwrites);
    // Expected overwrites: [90, 85] (Alice's 90 and Bob's 85 were replaced)
}`,
          solutionCode: `use std::collections::HashMap;

fn insert_and_track_overwrites(
    pairs: &[(&str, i32)],
) -> (HashMap<String, i32>, Vec<i32>) {
    let mut map = HashMap::new();
    let mut overwrites = Vec::new();
    for &(key, value) in pairs {
        if let Some(old) = map.insert(key.to_string(), value) {
            overwrites.push(old);
        }
    }
    (map, overwrites)
}

fn main() {
    let pairs = vec![
        ("Alice", 90), ("Bob", 85), ("Alice", 95), ("Bob", 88), ("Charlie", 92),
    ];
    let (map, overwrites) = insert_and_track_overwrites(&pairs);
    println!("map: {:?}", map);
    println!("overwrites: {:?}", overwrites);
    // Output overwrites: [90, 85]
}`,
          hints: [
            'HashMap::insert returns Option<V> — Some(old) if the key existed, None if it was new.',
            'Use if let Some(old) = map.insert(key, value) to capture overwritten values.',
            'Push each overwritten value into a separate Vec to track all replacements.',
          ],
        },
      },
      {
        id: 'hm-get',
        title: 'HashMap::get',
        difficulty: 'beginner',
        tags: ['hashmap', 'get', 'lookup', 'access', 'retrieve'],
        cheatSheetSummary: 'map.get(&key) -> Option<&V> — look up a value by key',
        signature: 'fn get<Q: ?Sized>(&self, k: &Q) -> Option<&V> where K: Borrow<Q>, Q: Hash + Eq',
        sections: [
          {
            heading: 'Looking Up Values',
            content: 'get returns Option<&V> — Some(&value) if the key exists, None otherwise. get_mut returns Option<&mut V> for in-place modification. The indexing operator map[&key] panics if the key is missing.',
            code: `use std::collections::HashMap;

fn main() {
    let mut scores: HashMap<String, i32> = HashMap::new();
    scores.insert("Alice".to_string(), 95);
    scores.insert("Bob".to_string(), 87);

    // get: safe lookup
    let alice = scores.get("Alice");
    println!("Alice: {:?}", alice);

    let unknown = scores.get("Unknown");
    println!("Unknown: {:?}", unknown);

    // .copied() to get Option<V> instead of Option<&V>
    let score: Option<i32> = scores.get("Alice").copied();
    println!("copied: {:?}", score);

    // get_mut: modify in place
    if let Some(score) = scores.get_mut("Bob") {
        *score += 10;
    }
    println!("Bob after bonus: {}", scores["Bob"]);

    // Index operator: panics if key missing
    println!("Alice via []: {}", scores["Alice"]);
    // println!("{}", scores["Unknown"]); // PANIC!

    // get_key_value: returns both key and value
    if let Some((key, val)) = scores.get_key_value("Alice") {
        println!("key: {}, val: {}", key, val);
    }
}`,
            output: `Alice: Some(95)
Unknown: None
copied: Some(95)
Bob after bonus: 97
Alice via []: 95
key: Alice, val: 95`,
            warning: 'map[&key] panics if the key does not exist. Always use .get() for safe lookups, or .get().unwrap_or(&default) for a default value.',
            codeHighlightLines: [8, 9, 12, 13, 16, 17],
          },
        ],
        quiz: [
          {
            question: 'What does HashMap::get return when the key does not exist?',
            options: [
              'A default value',
              'It panics',
              'None',
              'An empty reference',
            ],
            correctIndex: 2,
            explanation: 'get() returns Option<&V>. When the key is not found, it returns None. This is safe, unlike the index operator map[&key] which panics on missing keys.',
          },
          {
            question: 'What is the difference between map.get("key") and map["key"]?',
            options: [
              'They are identical',
              'get returns Option<&V> (safe); indexing panics if the key is missing',
              'get returns an owned value; indexing returns a reference',
              'Indexing is faster because it skips the Option wrapper',
            ],
            correctIndex: 1,
            explanation: 'map.get(&key) safely returns Option<&V>, returning None for missing keys. map[&key] panics at runtime if the key does not exist. Always prefer .get() unless you are absolutely certain the key exists.',
          },
          {
            question: 'How do you modify a value in-place in a HashMap?',
            options: [
              'map.get("key").unwrap() += 1',
              'map.set("key", new_value)',
              'if let Some(v) = map.get_mut("key") { *v += 1; }',
              'map.modify("key", |v| v + 1)',
            ],
            correctIndex: 2,
            explanation: 'get_mut returns Option<&mut V>, giving you a mutable reference to the value. You can then dereference and modify it with *v += 1. get() only returns an immutable reference.',
          },
          {
            question: 'What does .get("key").copied() do?',
            options: [
              'Creates a deep clone of the value',
              'Converts Option<&V> to Option<V> by copying the value',
              'Copies the key into the map',
              'Returns a duplicate of the entire HashMap',
            ],
            correctIndex: 1,
            explanation: '.get() returns Option<&V> (a reference wrapped in Option). .copied() converts it to Option<V> by copying the value out of the reference. This works for types that implement Copy (like i32, f64, bool).',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes a HashMap of student scores and returns the name and score of the student with the highest score. Use .get() or iteration to find the maximum. Return None if the map is empty.',
          starterCode: `use std::collections::HashMap;

fn top_student(scores: &HashMap<String, i32>) -> Option<(String, i32)> {
    // Find the student with the highest score
    // Return Some((name, score)) or None if the map is empty
    todo!()
}

fn main() {
    let mut scores = HashMap::new();
    scores.insert("Alice".to_string(), 95);
    scores.insert("Bob".to_string(), 87);
    scores.insert("Charlie".to_string(), 99);
    scores.insert("Diana".to_string(), 92);

    match top_student(&scores) {
        Some((name, score)) => println!("Top student: {} ({})", name, score),
        None => println!("No students"),
    }
    // Expected: Top student: Charlie (99)
}`,
          solutionCode: `use std::collections::HashMap;

fn top_student(scores: &HashMap<String, i32>) -> Option<(String, i32)> {
    scores.iter()
        .max_by_key(|(_, &score)| score)
        .map(|(name, &score)| (name.clone(), score))
}

fn main() {
    let mut scores = HashMap::new();
    scores.insert("Alice".to_string(), 95);
    scores.insert("Bob".to_string(), 87);
    scores.insert("Charlie".to_string(), 99);
    scores.insert("Diana".to_string(), 92);

    match top_student(&scores) {
        Some((name, score)) => println!("Top student: {} ({})", name, score),
        None => println!("No students"),
    }
    // Output: Top student: Charlie (99)
}`,
          hints: [
            'Use scores.iter().max_by_key(|(_, &score)| score) to find the entry with the highest score.',
            'max_by_key returns Option<(&String, &i32)> — map it to Option<(String, i32)> with .map().',
            'Clone the name and dereference the score to get owned values.',
          ],
        },
      },
      {
        id: 'hm-contains-key',
        title: 'HashMap::contains_key',
        difficulty: 'beginner',
        tags: ['hashmap', 'contains_key', 'exists', 'has-key', 'membership'],
        cheatSheetSummary: 'map.contains_key(&key) -> bool — check if a key exists',
        signature: 'fn contains_key<Q: ?Sized>(&self, k: &Q) -> bool',
        sections: [
          {
            heading: 'Checking Key Existence',
            content: 'contains_key checks if a key exists in the map. For conditional insert-or-update, prefer the entry API which performs only one lookup instead of two (contains_key + insert).',
            code: `use std::collections::HashMap;

fn main() {
    let mut config: HashMap<&str, &str> = HashMap::new();
    config.insert("host", "localhost");
    config.insert("port", "8080");

    println!("has 'host': {}", config.contains_key("host"));
    println!("has 'timeout': {}", config.contains_key("timeout"));

    // Pattern: insert if missing (AVOID this pattern)
    if !config.contains_key("timeout") {
        config.insert("timeout", "30");
    }

    // BETTER: use entry API (single lookup)
    config.entry("database").or_insert("postgres");

    println!("{:?}", config);

    // Counting: contains_key vs entry
    let words = vec!["hello", "world", "hello", "rust"];
    let mut freq: HashMap<&str, i32> = HashMap::new();

    // BAD: two lookups per word
    // for w in &words {
    //     if freq.contains_key(w) { *freq.get_mut(w).unwrap() += 1; }
    //     else { freq.insert(w, 1); }
    // }

    // GOOD: one lookup per word
    for w in &words {
        *freq.entry(w).or_insert(0) += 1;
    }
    println!("freq: {:?}", freq);
}`,
            output: `has 'host': true
has 'timeout': false
{"host": "localhost", "database": "postgres", "timeout": "30", "port": "8080"}
freq: {"hello": 2, "world": 1, "rust": 1}`,
            tip: 'If you are calling contains_key followed by insert or get, use the entry API instead. It performs a single hash lookup instead of two.',
          },
        ],
        quiz: [
          {
            question: 'Why is using contains_key followed by insert considered an anti-pattern?',
            options: [
              'contains_key is deprecated in newer Rust versions',
              'It performs two hash lookups instead of one (entry API does it in one)',
              'contains_key does not work with String keys',
              'It causes a borrow checker error',
            ],
            correctIndex: 1,
            explanation: 'contains_key + insert performs two hash lookups for the same key: one to check existence, another to insert. The entry API (map.entry(key).or_insert(value)) does both in a single lookup, which is more efficient and more idiomatic.',
          },
          {
            question: 'What does map.contains_key("unknown") return for a key not in the map?',
            options: [
              'None',
              'false',
              'An error',
              'It panics',
            ],
            correctIndex: 1,
            explanation: 'contains_key returns a simple bool: true if the key exists, false if it does not. Unlike .get(), it does not return an Option.',
          },
          {
            question: 'Which is the most idiomatic way to implement "insert if absent" in Rust?',
            options: [
              'if !map.contains_key(&key) { map.insert(key, value); }',
              'map.insert_if_missing(key, value)',
              'map.entry(key).or_insert(value)',
              'map.get_or_insert(key, value)',
            ],
            correctIndex: 2,
            explanation: 'map.entry(key).or_insert(value) is the idiomatic pattern. It performs a single hash lookup and inserts the default value only if the key is absent. It also returns a mutable reference to the value for immediate use.',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes two HashMaps and returns a Vec of keys that exist in both maps (intersection of keys). Use contains_key for the lookup.',
          starterCode: `use std::collections::HashMap;

fn common_keys(
    a: &HashMap<String, i32>,
    b: &HashMap<String, i32>,
) -> Vec<String> {
    // Return a sorted Vec of keys that exist in both maps
    todo!()
}

fn main() {
    let mut a = HashMap::new();
    a.insert("Alice".to_string(), 1);
    a.insert("Bob".to_string(), 2);
    a.insert("Charlie".to_string(), 3);

    let mut b = HashMap::new();
    b.insert("Bob".to_string(), 10);
    b.insert("Charlie".to_string(), 20);
    b.insert("Diana".to_string(), 30);

    let common = common_keys(&a, &b);
    println!("{:?}", common);
    // Expected: ["Bob", "Charlie"]
}`,
          solutionCode: `use std::collections::HashMap;

fn common_keys(
    a: &HashMap<String, i32>,
    b: &HashMap<String, i32>,
) -> Vec<String> {
    let mut result: Vec<String> = a.keys()
        .filter(|key| b.contains_key(key.as_str()))
        .cloned()
        .collect();
    result.sort();
    result
}

fn main() {
    let mut a = HashMap::new();
    a.insert("Alice".to_string(), 1);
    a.insert("Bob".to_string(), 2);
    a.insert("Charlie".to_string(), 3);

    let mut b = HashMap::new();
    b.insert("Bob".to_string(), 10);
    b.insert("Charlie".to_string(), 20);
    b.insert("Diana".to_string(), 30);

    let common = common_keys(&a, &b);
    println!("{:?}", common);
    // Output: ["Bob", "Charlie"]
}`,
          hints: [
            'Iterate over a.keys() and use .filter(|key| b.contains_key(key.as_str())) to keep only common keys.',
            'Use .cloned() to convert &String references to owned Strings before collecting.',
            'Sort the result for deterministic output since HashMap iteration order is not guaranteed.',
          ],
        },
      },
      {
        id: 'hm-remove',
        title: 'HashMap::remove',
        difficulty: 'beginner',
        tags: ['hashmap', 'remove', 'delete', 'drop-key'],
        cheatSheetSummary: 'map.remove(&key) -> Option<V> — remove a key and return its value',
        signature: 'fn remove<Q: ?Sized>(&mut self, k: &Q) -> Option<V>',
        sections: [
          {
            heading: 'Removing Entries',
            content: 'remove deletes a key-value pair and returns the value. remove_entry returns both the key and value. retain removes entries that do not match a predicate, similar to Vec::retain.',
            code: `use std::collections::HashMap;

fn main() {
    let mut scores: HashMap<&str, i32> = HashMap::new();
    scores.insert("Alice", 95);
    scores.insert("Bob", 87);
    scores.insert("Charlie", 92);
    scores.insert("Diana", 60);

    // Remove and get the value
    let removed = scores.remove("Bob");
    println!("removed Bob: {:?}", removed);
    println!("remove missing: {:?}", scores.remove("Unknown"));

    // remove_entry: get both key and value
    if let Some((key, val)) = scores.remove_entry("Charlie") {
        println!("removed entry: {} = {}", key, val);
    }

    // retain: keep only matching entries
    scores.insert("Eve", 45);
    scores.insert("Frank", 72);
    scores.retain(|_name, &mut score| score >= 60);
    println!("passing students: {:?}", scores);

    // Clear all entries
    scores.clear();
    println!("after clear: {:?}, len: {}", scores, scores.len());
}`,
            output: `removed Bob: Some(87)
remove missing: None
removed entry: Charlie = 92
passing students: {"Alice": 95, "Diana": 60, "Frank": 72}
after clear: {}, len: 0`,
          },
        ],
        quiz: [
          {
            question: 'What does HashMap::remove return?',
            options: [
              'bool — whether the key was found',
              'Option<V> — Some(value) if the key existed, None otherwise',
              'The key that was removed',
              'A reference to the removed value',
            ],
            correctIndex: 1,
            explanation: 'remove returns Option<V>. If the key existed, it returns Some(value) with the removed value. If the key was not in the map, it returns None. This lets you both remove and use the old value in one step.',
          },
          {
            question: 'What does .retain(|k, v| predicate) do?',
            options: [
              'Inserts new entries that match the predicate',
              'Keeps only entries where the predicate returns true, removing the rest',
              'Returns a new HashMap with matching entries',
              'Marks entries for lazy deletion',
            ],
            correctIndex: 1,
            explanation: 'retain keeps only the key-value pairs for which the predicate returns true, removing all others in-place. It is similar to Vec::retain and is useful for bulk conditional removal.',
          },
          {
            question: 'What is the difference between remove and remove_entry?',
            options: [
              'remove returns Option<V>; remove_entry returns Option<(K, V)>',
              'remove_entry is faster because it skips hashing',
              'remove deletes the key; remove_entry only marks it as deleted',
              'They are identical',
            ],
            correctIndex: 0,
            explanation: 'remove returns only the value (Option<V>), while remove_entry returns both the key and value as Option<(K, V)>. Use remove_entry when you need the owned key back (e.g., if the key is a String you want to reuse).',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes a HashMap of student scores and removes all students who scored below a threshold. Return a Vec of the removed (name, score) pairs using remove_entry.',
          starterCode: `use std::collections::HashMap;

fn remove_below_threshold(
    scores: &mut HashMap<String, i32>,
    threshold: i32,
) -> Vec<(String, i32)> {
    // Remove all entries with score < threshold
    // Return the removed (name, score) pairs
    // Hint: collect keys to remove first, then remove them
    todo!()
}

fn main() {
    let mut scores = HashMap::new();
    scores.insert("Alice".to_string(), 95);
    scores.insert("Bob".to_string(), 55);
    scores.insert("Charlie".to_string(), 72);
    scores.insert("Diana".to_string(), 48);
    scores.insert("Eve".to_string(), 88);

    let removed = remove_below_threshold(&mut scores, 60);
    println!("removed: {:?}", removed);
    println!("remaining: {:?}", scores);
    // removed should contain Bob(55) and Diana(48)
}`,
          solutionCode: `use std::collections::HashMap;

fn remove_below_threshold(
    scores: &mut HashMap<String, i32>,
    threshold: i32,
) -> Vec<(String, i32)> {
    let keys_to_remove: Vec<String> = scores.iter()
        .filter(|(_, &score)| score < threshold)
        .map(|(name, _)| name.clone())
        .collect();

    keys_to_remove.into_iter()
        .filter_map(|key| scores.remove_entry(&key))
        .collect()
}

fn main() {
    let mut scores = HashMap::new();
    scores.insert("Alice".to_string(), 95);
    scores.insert("Bob".to_string(), 55);
    scores.insert("Charlie".to_string(), 72);
    scores.insert("Diana".to_string(), 48);
    scores.insert("Eve".to_string(), 88);

    let removed = remove_below_threshold(&mut scores, 60);
    println!("removed: {:?}", removed);
    println!("remaining: {:?}", scores);
    // removed: [("Bob", 55), ("Diana", 48)]
}`,
          hints: [
            'You cannot remove entries while iterating over the map. Collect the keys to remove first.',
            'Use scores.iter().filter(...).map(|(k, _)| k.clone()).collect() to get keys below threshold.',
            'Then iterate over the collected keys and call scores.remove_entry(&key) for each one.',
          ],
        },
      },
      {
        id: 'hm-entry',
        title: 'HashMap::entry',
        difficulty: 'intermediate',
        tags: ['hashmap', 'entry', 'or_insert', 'and_modify', 'or_default', 'upsert'],
        cheatSheetSummary: 'map.entry(key).or_insert(default) — conditional insert/modify in one lookup',
        signature: 'fn entry(&mut self, key: K) -> Entry<K, V>',
        sections: [
          {
            heading: 'The Entry API',
            content: 'The entry API is HashMap\'s most powerful feature. It returns an Entry enum that lets you conditionally insert, modify, or access a value with a single hash lookup. This is more efficient and more expressive than separate contains_key/get/insert calls.',
            code: `use std::collections::HashMap;

fn main() {
    let mut map: HashMap<&str, Vec<i32>> = HashMap::new();

    // or_insert: insert default if missing
    map.entry("scores").or_insert(Vec::new()).push(95);
    map.entry("scores").or_insert(Vec::new()).push(87);
    println!("scores: {:?}", map);

    // or_default: use Default::default()
    map.entry("grades").or_default().push(1);
    println!("grades: {:?}", map["grades"]);

    // or_insert_with: lazy computation
    let mut cache: HashMap<&str, String> = HashMap::new();
    let val = cache.entry("computed").or_insert_with(|| {
        println!("  (expensive computation)");
        "result".to_string()
    });
    println!("first access: {}", val);

    let val = cache.entry("computed").or_insert_with(|| {
        println!("  (this won't run)");
        "other".to_string()
    });
    println!("cached access: {}", val);

    // and_modify + or_insert: update existing or insert new
    let mut counts: HashMap<&str, i32> = HashMap::new();
    let words = vec!["hello", "world", "hello", "rust", "hello"];
    for word in words {
        counts.entry(word)
            .and_modify(|c| *c += 1)
            .or_insert(1);
    }
    println!("counts: {:?}", counts);

    // Frequency counting (most idiomatic)
    let text = "the quick brown fox jumps over the lazy fox";
    let mut freq: HashMap<&str, usize> = HashMap::new();
    for word in text.split_whitespace() {
        *freq.entry(word).or_insert(0) += 1;
    }
    let mut sorted: Vec<_> = freq.iter().collect();
    sorted.sort_by(|a, b| b.1.cmp(a.1));
    for (word, count) in sorted.iter().take(3) {
        println!("  {}: {}", word, count);
    }
}`,
            output: `scores: {"scores": [95, 87]}
grades: [1]
  (expensive computation)
first access: result
cached access: result
counts: {"hello": 3, "world": 1, "rust": 1}
  the: 2
  fox: 2
  quick: 1`,
            tip: 'The entry API pattern *map.entry(key).or_insert(0) += 1 is the gold standard for frequency counting in Rust. Memorize this pattern — you will use it constantly.',
            analogy: 'Think of it like a coat check: you hand over your coat (key). If the attendant has your ticket already (existing entry), they update your coat. If not, they create a new ticket and hang the coat. One interaction handles both cases.',
            diagram: {
              kind: 'mermaid',
              code: `flowchart TD
  E["map.entry(key)"] --> C{"Key exists?"}
  C -->|"Yes: OccupiedEntry"| M[".and_modify(|v| *v += 1)"]
  C -->|"No: VacantEntry"| I[".or_insert(default)"]
  M --> D["Return &mut V"]
  I --> D
  D --> U["Use the value"]
  style E fill:#6366f1,color:#fff
  style C fill:#f59e0b,color:#000
  style M fill:#10b981,color:#fff
  style I fill:#ef4444,color:#fff
  style D fill:#8b5cf6,color:#fff`,
              caption: 'The entry API: a single hash lookup branches into OccupiedEntry or VacantEntry, then returns a mutable reference to the value',
            },
            codeHighlightLines: [6, 7, 11, 26, 27, 28, 29, 33, 34],
          },
        ],
        quiz: [
          {
            question: 'What does the entry API return?',
            options: [
              'Option<&V> — a reference to the value if it exists',
              'An Entry enum that is either Occupied or Vacant',
              'bool — whether the key exists',
              'A mutable reference to the map itself',
            ],
            correctIndex: 1,
            explanation: 'entry() returns an Entry enum with two variants: OccupiedEntry (key exists, holds a mutable reference to the value) and VacantEntry (key is absent, ready to insert). This enables conditional operations in a single hash lookup.',
          },
          {
            question: 'What is the idiomatic pattern for frequency counting in Rust?',
            options: [
              'if map.contains_key(&word) { *map.get_mut(&word).unwrap() += 1 } else { map.insert(word, 1) }',
              '*map.entry(word).or_insert(0) += 1',
              'map.insert(word, map.get(&word).unwrap_or(&0) + 1)',
              'map.update(word, |v| v + 1, 1)',
            ],
            correctIndex: 1,
            explanation: 'The entry API pattern *map.entry(word).or_insert(0) += 1 is the gold standard. or_insert(0) inserts 0 if the key is missing (first occurrence), and the leading * dereferences the returned &mut V to increment it. One lookup handles both cases.',
          },
          {
            question: 'What is the difference between .or_insert(value) and .or_insert_with(|| value)?',
            options: [
              'They are identical in behavior',
              'or_insert always evaluates the value; or_insert_with only evaluates the closure if the key is absent',
              'or_insert_with is deprecated',
              'or_insert works only with Copy types',
            ],
            correctIndex: 1,
            explanation: 'or_insert(value) evaluates the default value eagerly (even if the key exists and the default is not needed). or_insert_with(|| expensive_computation()) is lazy — the closure only runs when the key is actually absent. Use or_insert_with for expensive defaults.',
          },
          {
            question: 'What does .and_modify(|v| *v += 1).or_insert(1) do?',
            options: [
              'Always inserts 1',
              'Increments the value if the key exists, inserts 1 if it does not',
              'Inserts 1, then increments it to 2',
              'Panics if the key already exists',
            ],
            correctIndex: 1,
            explanation: 'and_modify runs the closure only if the entry is occupied (key exists), modifying the existing value. or_insert runs only if the entry is vacant (key absent), inserting the default. Together they handle both cases: increment existing or insert new.',
          },
        ],
        challenge: {
          prompt: 'Write a function that groups words by their first letter using the entry API. Given a list of words, return a HashMap<char, Vec<String>> where each key is a lowercase first letter and the value is a sorted Vec of words starting with that letter.',
          starterCode: `use std::collections::HashMap;

fn group_by_first_letter(words: &[&str]) -> HashMap<char, Vec<String>> {
    // Use the entry API to group words by their first letter
    // Each key should be the lowercase first character
    // Each value should be a sorted Vec of words
    todo!()
}

fn main() {
    let words = vec![
        "apple", "banana", "avocado", "blueberry",
        "cherry", "apricot", "cantaloupe", "blackberry",
    ];
    let groups = group_by_first_letter(&words);
    for (letter, words) in &groups {
        println!("'{}': {:?}", letter, words);
    }
    // Expected:
    // 'a': ["apple", "apricot", "avocado"]
    // 'b': ["banana", "blackberry", "blueberry"]
    // 'c': ["cantaloupe", "cherry"]
}`,
          solutionCode: `use std::collections::HashMap;

fn group_by_first_letter(words: &[&str]) -> HashMap<char, Vec<String>> {
    let mut groups: HashMap<char, Vec<String>> = HashMap::new();
    for &word in words {
        if let Some(first_char) = word.chars().next() {
            groups.entry(first_char.to_ascii_lowercase())
                .or_default()
                .push(word.to_string());
        }
    }
    for values in groups.values_mut() {
        values.sort();
    }
    groups
}

fn main() {
    let words = vec![
        "apple", "banana", "avocado", "blueberry",
        "cherry", "apricot", "cantaloupe", "blackberry",
    ];
    let groups = group_by_first_letter(&words);
    let mut sorted_keys: Vec<&char> = groups.keys().collect();
    sorted_keys.sort();
    for letter in sorted_keys {
        println!("'{}': {:?}", letter, groups[letter]);
    }
}`,
          hints: [
            'Use word.chars().next() to get the first character, then .to_ascii_lowercase() to normalize it.',
            'Use groups.entry(first_char).or_default() to get or create the Vec for that letter, then .push() the word.',
            'After building the map, iterate over groups.values_mut() and sort each Vec.',
          ],
        },
      },
    ],
  },
];

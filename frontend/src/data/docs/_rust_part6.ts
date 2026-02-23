import type { DocCategory } from './types';

// Part 6: Vec Methods + String Methods
export const RUST_PART6_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Vec Methods                                                  */
  /* ------------------------------------------------------------ */
  {
    id: 'rust-vec-methods',
    label: 'Vec Methods',
    icon: 'List',
    entries: [
      {
        id: 'vec-push',
        title: 'Vec::push',
        difficulty: 'beginner',
        tags: ['vec', 'push', 'append', 'add-element'],
        cheatSheetSummary: 'v.push(value) — append element to end, O(1) amortized',
        signature: 'fn push(&mut self, value: T)',
        sections: [
          {
            heading: 'Appending Elements',
            content: 'push adds a single element to the end of a vector. It is O(1) amortized — occasionally it needs to reallocate and copy when the vector outgrows its capacity, but on average each push is constant time.',
            code: `fn main() {
    let mut v: Vec<i32> = Vec::new();
    v.push(1);
    v.push(2);
    v.push(3);
    println!("{:?}", v);

    // push moves ownership for non-Copy types
    let mut names: Vec<String> = Vec::new();
    let name = String::from("Alice");
    names.push(name);
    // println!("{}", name);  // ERROR: name was moved
    println!("{:?}", names);

    // Capacity grows automatically
    let mut data = Vec::with_capacity(2);
    println!("cap before: {}", data.capacity());
    data.push(1);
    data.push(2);
    data.push(3);  // triggers reallocation
    println!("cap after: {}", data.capacity());
}`,
            output: `[1, 2, 3]
["Alice"]
cap before: 2
cap after: 4`,
            tip: 'Use Vec::with_capacity(n) before pushing n elements to avoid reallocations.',
            analogy: 'Think of it like adding books to a shelf: push places the next book at the end. If the shelf is full, you have to get a bigger shelf (reallocate) and move everything over before placing the new book.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: 'Vec (stack)',
                    color: '#6366f1',
                    items: [
                      { name: 'ptr', value: '-> heap data' },
                      { name: 'len', value: '3' },
                      { name: 'capacity', value: '4' },
                    ],
                  },
                  {
                    label: 'Heap buffer',
                    color: '#10b981',
                    items: [
                      { name: '[0]', value: '1' },
                      { name: '[1]', value: '2' },
                      { name: '[2]', value: '3' },
                      { name: '[3]', value: '(unused)' },
                    ],
                  },
                ],
              },
              caption: 'Vec stores a pointer, length, and capacity on the stack. The actual elements live on the heap. When len exceeds capacity, a new larger heap buffer is allocated.',
            },
            codeHighlightLines: [3, 4, 5, 10, 11],
          },
        ],
        quiz: [
          {
            question: 'What does Vec::push return?',
            options: ['The new length of the vector', 'A reference to the pushed element', 'Nothing (unit type ())', 'An Option indicating success'],
            correctIndex: 2,
            explanation: 'Vec::push returns () (unit). It always succeeds (assuming sufficient memory) and modifies the vector in-place.',
          },
          {
            question: 'What happens when you push to a Vec that is at full capacity?',
            options: ['It panics with an overflow error', 'It silently drops the element', 'It reallocates a larger buffer on the heap and copies existing elements', 'It returns an Err result'],
            correctIndex: 2,
            explanation: 'When the vector exceeds its capacity, it allocates a new, larger buffer (typically doubling), copies all existing elements, and then adds the new element. This is why push is O(1) amortized.',
          },
          {
            question: 'What happens to a non-Copy value after it is pushed into a Vec?',
            options: ['It is cloned into the Vec', 'It is moved into the Vec and the original is no longer usable', 'It is borrowed by the Vec', 'It remains usable because push takes a reference'],
            correctIndex: 1,
            explanation: 'push takes ownership of the value. For non-Copy types like String, the value is moved into the vector and the original binding can no longer be used.',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes a Vec<i32> and an i32 value, pushes the value only if it is not already present in the vector, and returns the final vector.',
          starterCode: `fn push_unique(mut v: Vec<i32>, value: i32) -> Vec<i32> {
    // TODO: push value only if not already in v
    v
}

fn main() {
    let v = vec![1, 2, 3];
    let v = push_unique(v, 2);
    println!("{:?}", v); // [1, 2, 3]
    let v = push_unique(v, 4);
    println!("{:?}", v); // [1, 2, 3, 4]
}`,
          solutionCode: `fn push_unique(mut v: Vec<i32>, value: i32) -> Vec<i32> {
    if !v.contains(&value) {
        v.push(value);
    }
    v
}

fn main() {
    let v = vec![1, 2, 3];
    let v = push_unique(v, 2);
    println!("{:?}", v); // [1, 2, 3]
    let v = push_unique(v, 4);
    println!("{:?}", v); // [1, 2, 3, 4]
}`,
          hints: [
            'Use Vec::contains(&value) to check if the element already exists.',
            'Remember that contains takes a reference (&i32), not the value itself.',
            'Only call push when the value is not found in the vector.',
          ],
        },
      },
      {
        id: 'vec-pop',
        title: 'Vec::pop',
        difficulty: 'beginner',
        tags: ['vec', 'pop', 'remove-last', 'stack'],
        cheatSheetSummary: 'v.pop() -> Option<T> — remove and return last element',
        signature: 'fn pop(&mut self) -> Option<T>',
        sections: [
          {
            heading: 'Removing the Last Element',
            content: 'pop removes and returns the last element as Option<T>. Returns None if the vector is empty. Combined with push, this gives Vec stack (LIFO) semantics with O(1) operations.',
            code: `fn main() {
    let mut stack = vec![1, 2, 3, 4, 5];

    let last = stack.pop();
    println!("popped: {:?}, remaining: {:?}", last, stack);

    // Pop until empty
    while let Some(val) = stack.pop() {
        print!("{} ", val);
    }
    println!();

    // Pop from empty returns None
    let empty_pop = stack.pop();
    println!("empty pop: {:?}", empty_pop);
}`,
            output: `popped: Some(5), remaining: [1, 2, 3, 4]
4 3 2 1
empty pop: None`,
            diagram: {
              kind: 'custom',
              type: 'stack',
              data: {
                items: [
                  { value: '1', label: 'bottom' },
                  { value: '2', label: '' },
                  { value: '3', label: '' },
                  { value: '4', label: '' },
                  { value: '5', label: 'top (popped first)' },
                ],
                operations: [
                  { name: 'push(6)', description: 'Add to top: O(1)' },
                  { name: 'pop()', description: 'Remove from top: O(1), returns Some(5)' },
                ],
              },
              caption: 'Vec as a stack: push adds to the top, pop removes from the top. Both are O(1) operations.',
            },
          },
        ],
        quiz: [
          {
            question: 'What does Vec::pop return when the vector is empty?',
            options: ['It panics', 'It returns 0', 'It returns None', 'It returns an empty element'],
            correctIndex: 2,
            explanation: 'Vec::pop returns Option<T>. When the vector is empty, it returns None. When non-empty, it returns Some(last_element).',
          },
          {
            question: 'Which data structure behavior do push and pop together give a Vec?',
            options: ['Queue (FIFO)', 'Stack (LIFO)', 'Deque (double-ended)', 'Priority queue'],
            correctIndex: 1,
            explanation: 'push adds to the end and pop removes from the end, giving Last In First Out (LIFO) stack behavior with O(1) for both operations.',
          },
          {
            question: 'What is the time complexity of Vec::pop?',
            options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
            correctIndex: 2,
            explanation: 'pop simply decrements the length and returns the last element. No shifting of elements is needed, so it is O(1).',
          },
        ],
        challenge: {
          prompt: 'Implement a function that uses a Vec as a stack to reverse a vector of integers. Push all elements onto a stack, then pop them all off into a new vector.',
          starterCode: `fn reverse_with_stack(input: Vec<i32>) -> Vec<i32> {
    let mut stack: Vec<i32> = Vec::new();
    let mut result: Vec<i32> = Vec::new();
    // TODO: push all input elements onto stack, then pop into result
    result
}

fn main() {
    let v = vec![1, 2, 3, 4, 5];
    let reversed = reverse_with_stack(v);
    println!("{:?}", reversed); // [5, 4, 3, 2, 1]
}`,
          solutionCode: `fn reverse_with_stack(input: Vec<i32>) -> Vec<i32> {
    let mut stack: Vec<i32> = Vec::new();
    let mut result: Vec<i32> = Vec::new();
    for val in input {
        stack.push(val);
    }
    while let Some(val) = stack.pop() {
        result.push(val);
    }
    result
}

fn main() {
    let v = vec![1, 2, 3, 4, 5];
    let reversed = reverse_with_stack(v);
    println!("{:?}", reversed); // [5, 4, 3, 2, 1]
}`,
          hints: [
            'First loop through input and push each element onto the stack.',
            'Use while let Some(val) = stack.pop() to keep popping until the stack is empty.',
          ],
        },
      },
      {
        id: 'vec-len',
        title: 'Vec::len & is_empty',
        difficulty: 'beginner',
        tags: ['vec', 'len', 'length', 'size', 'is_empty'],
        cheatSheetSummary: 'v.len() -> usize, v.is_empty() -> bool',
        signature: 'fn len(&self) -> usize',
        sections: [
          {
            heading: 'Checking Size',
            content: 'len returns the number of elements, capacity returns how many elements can be stored without reallocating. is_empty is equivalent to len() == 0 but more readable.',
            code: `fn main() {
    let v = vec![10, 20, 30];
    println!("len: {}", v.len());
    println!("is_empty: {}", v.is_empty());
    println!("capacity: {}", v.capacity());

    let empty: Vec<i32> = Vec::new();
    println!("empty len: {}, is_empty: {}", empty.len(), empty.is_empty());

    // Common pattern: guard clause
    fn average(nums: &[f64]) -> Option<f64> {
        if nums.is_empty() {
            return None;
        }
        Some(nums.iter().sum::<f64>() / nums.len() as f64)
    }

    println!("avg: {:?}", average(&[1.0, 2.0, 3.0]));
    println!("avg empty: {:?}", average(&[]));
}`,
            output: `len: 3
is_empty: false
capacity: 3
empty len: 0, is_empty: true
avg: Some(2.0)
avg empty: None`,
          },
        ],
        quiz: [
          {
            question: 'What is the difference between len() and capacity() on a Vec?',
            options: ['They always return the same value', 'len() returns the number of elements, capacity() returns how many can fit without reallocating', 'len() returns bytes, capacity() returns elements', 'capacity() is always double len()'],
            correctIndex: 1,
            explanation: 'len() counts the actual elements stored. capacity() counts the total allocated space. capacity() >= len() always holds.',
          },
          {
            question: 'What does is_empty() check?',
            options: ['Whether the Vec has been deallocated', 'Whether len() == 0', 'Whether capacity() == 0', 'Whether all elements are zero'],
            correctIndex: 1,
            explanation: 'is_empty() is equivalent to self.len() == 0. It does not check capacity; a Vec can have capacity but no elements.',
          },
        ],
        challenge: {
          prompt: 'Write a function safe_average that takes a slice of f64 and returns Option<f64>. Return None if the slice is empty, otherwise return Some(average).',
          starterCode: `fn safe_average(nums: &[f64]) -> Option<f64> {
    // TODO: return None for empty, Some(average) otherwise
    todo!()
}

fn main() {
    println!("{:?}", safe_average(&[10.0, 20.0, 30.0])); // Some(20.0)
    println!("{:?}", safe_average(&[]));                   // None
}`,
          solutionCode: `fn safe_average(nums: &[f64]) -> Option<f64> {
    if nums.is_empty() {
        return None;
    }
    Some(nums.iter().sum::<f64>() / nums.len() as f64)
}

fn main() {
    println!("{:?}", safe_average(&[10.0, 20.0, 30.0])); // Some(20.0)
    println!("{:?}", safe_average(&[]));                   // None
}`,
          hints: [
            'Use is_empty() as a guard clause to return None early.',
            'Sum the slice with nums.iter().sum::<f64>() and divide by nums.len() cast to f64.',
            'Remember to cast len() (usize) to f64 for division.',
          ],
        },
      },
      {
        id: 'vec-iter',
        title: 'Vec::iter',
        difficulty: 'beginner',
        tags: ['vec', 'iter', 'into_iter', 'iter_mut', 'iteration'],
        cheatSheetSummary: '.iter() borrows, .iter_mut() borrows mutably, .into_iter() consumes',
        signature: 'fn iter(&self) -> Iter<T>',
        sections: [
          {
            heading: 'Three Ways to Iterate',
            content: 'Vectors provide three iteration methods. .iter() yields &T (borrows), .iter_mut() yields &mut T (mutable borrow), and .into_iter() yields T (consumes the vector). Choosing the right one avoids unnecessary clones.',
            code: `fn main() {
    let v = vec![1, 2, 3, 4, 5];

    // .iter(): borrow (&T)
    let sum: i32 = v.iter().sum();
    println!("sum: {} (v still usable: {:?})", sum, v);

    // .iter_mut(): mutable borrow (&mut T)
    let mut v2 = vec![1, 2, 3];
    for x in v2.iter_mut() {
        *x *= 10;
    }
    println!("mutated: {:?}", v2);

    // .into_iter(): consuming (T)
    let v3 = vec![String::from("a"), String::from("b")];
    let upper: Vec<String> = v3.into_iter()
        .map(|s| s.to_uppercase())
        .collect();
    println!("upper: {:?}", upper);
    // v3 is no longer available

    // for loop sugar
    let v4 = vec![10, 20, 30];
    for &x in &v4 { print!("{} ", x); }  // same as .iter()
    println!();
}`,
            output: `sum: 15 (v still usable: [1, 2, 3, 4, 5])
mutated: [10, 20, 30]
upper: ["A", "B"]
10 20 30`,
            tip: 'Use .iter() for read-only access, .iter_mut() for in-place modification, and .into_iter() when you need owned values (e.g., transforming String elements).',
            analogy: 'Think of it like browsing a museum: .iter() is looking at paintings through glass (borrow), .iter_mut() is restoring paintings in place (mutable borrow), and .into_iter() is buying and taking paintings home (consuming ownership).',
            diagram: {
              kind: 'mermaid',
              code: `graph TD
  V["Vec&lt;T&gt; data: [a, b, c]"]
  V -->|".iter()"| I1["yields &T"]
  V -->|".iter_mut()"| I2["yields &mut T"]
  V -->|".into_iter()"| I3["yields T"]
  I1 --> R1["Vec still usable after"]
  I2 --> R2["Vec still usable (mutated)"]
  I3 --> R3["Vec consumed / moved"]
  style I1 fill:#60a5fa,color:#fff
  style I2 fill:#f59e0b,color:#fff
  style I3 fill:#ef4444,color:#fff
  style R1 fill:#86efac,color:#000
  style R2 fill:#fde68a,color:#000
  style R3 fill:#fca5a5,color:#000`,
              caption: 'Three iteration modes: .iter() borrows, .iter_mut() borrows mutably, .into_iter() takes ownership',
            },
            codeHighlightLines: [5, 10, 11, 16, 17, 18],
          },
        ],
        quiz: [
          {
            question: 'What does .iter() yield?',
            options: ['Owned values (T)', 'Mutable references (&mut T)', 'Immutable references (&T)', 'Copies of the elements'],
            correctIndex: 2,
            explanation: '.iter() borrows the vector and yields immutable references (&T). The vector remains usable after iteration.',
          },
          {
            question: 'What happens to a Vec after calling .into_iter() and consuming the iterator?',
            options: ['The Vec is still usable', 'The Vec is emptied but still usable', 'The Vec is consumed and no longer usable', 'The Vec is cloned first'],
            correctIndex: 2,
            explanation: '.into_iter() takes ownership of the Vec. After it is consumed, the original Vec is moved and no longer accessible.',
          },
          {
            question: 'Which iterator method should you use to modify elements in-place?',
            options: ['.iter()', '.into_iter()', '.iter_mut()', '.iter().map()'],
            correctIndex: 2,
            explanation: '.iter_mut() yields &mut T, allowing you to dereference and modify each element in place without creating a new collection.',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes a Vec<i32>, doubles every element in-place using iter_mut, and returns the modified vector.',
          starterCode: `fn double_in_place(mut v: Vec<i32>) -> Vec<i32> {
    // TODO: use iter_mut to double each element
    v
}

fn main() {
    let v = vec![1, 2, 3, 4, 5];
    let doubled = double_in_place(v);
    println!("{:?}", doubled); // [2, 4, 6, 8, 10]
}`,
          solutionCode: `fn double_in_place(mut v: Vec<i32>) -> Vec<i32> {
    for x in v.iter_mut() {
        *x *= 2;
    }
    v
}

fn main() {
    let v = vec![1, 2, 3, 4, 5];
    let doubled = double_in_place(v);
    println!("{:?}", doubled); // [2, 4, 6, 8, 10]
}`,
          hints: [
            'Use v.iter_mut() to get mutable references to each element.',
            'Dereference each element with *x to modify the value behind the mutable reference.',
          ],
        },
      },
      {
        id: 'vec-contains',
        title: 'Vec::contains',
        difficulty: 'beginner',
        tags: ['vec', 'contains', 'search', 'membership'],
        cheatSheetSummary: 'v.contains(&val) -> bool — O(n) linear search',
        signature: 'fn contains(&self, x: &T) -> bool where T: PartialEq',
        sections: [
          {
            heading: 'Checking Membership',
            content: 'contains performs a linear O(n) search through the vector. For frequent lookups, consider using a HashSet instead. For sorted vectors, binary_search is O(log n).',
            code: `fn main() {
    let fruits = vec!["apple", "banana", "cherry"];
    println!("has banana: {}", fruits.contains(&"banana"));
    println!("has grape: {}", fruits.contains(&"grape"));

    // For numbers
    let nums = vec![10, 20, 30, 40, 50];
    println!("has 30: {}", nums.contains(&30));

    // binary_search on sorted vec: O(log n)
    let sorted = vec![1, 3, 5, 7, 9];
    println!("binary search 5: {:?}", sorted.binary_search(&5));
    println!("binary search 4: {:?}", sorted.binary_search(&4));

    // position: find index of first match
    let idx = fruits.iter().position(|&f| f == "cherry");
    println!("cherry at: {:?}", idx);
}`,
            output: `has banana: true
has grape: false
has 30: true
binary search 5: Ok(2)
binary search 4: Err(2)
cherry at: Some(2)`,
            note: 'For large collections with frequent lookups, use HashSet instead of Vec::contains. HashSet provides O(1) average lookup vs O(n) for Vec.',
          },
        ],
        quiz: [
          {
            question: 'What is the time complexity of Vec::contains?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
            correctIndex: 2,
            explanation: 'Vec::contains performs a linear scan through the vector, checking each element for equality. This is O(n) in the worst case.',
          },
          {
            question: 'What does binary_search return when the element is NOT found?',
            options: ['None', 'Err(index) where index is the insertion point', 'false', 'It panics'],
            correctIndex: 1,
            explanation: 'binary_search returns Result<usize, usize>. Ok(index) when found, Err(index) where index is the position where the element could be inserted to maintain sorted order.',
          },
          {
            question: 'What trait must T implement for Vec<T>::contains to work?',
            options: ['Eq', 'PartialEq', 'Ord', 'Hash'],
            correctIndex: 1,
            explanation: 'contains requires T: PartialEq so it can compare elements with ==. It does not require full Eq or Ord.',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes a sorted Vec<i32> and a target i32, and returns the index of the target using binary_search. If not found, return the index where it would be inserted.',
          starterCode: `fn find_or_insert_index(sorted: &Vec<i32>, target: i32) -> usize {
    // TODO: use binary_search, return the index whether found or not
    todo!()
}

fn main() {
    let v = vec![1, 3, 5, 7, 9];
    println!("find 5: {}", find_or_insert_index(&v, 5));  // 2
    println!("find 4: {}", find_or_insert_index(&v, 4));  // 2
    println!("find 10: {}", find_or_insert_index(&v, 10)); // 5
}`,
          solutionCode: `fn find_or_insert_index(sorted: &Vec<i32>, target: i32) -> usize {
    match sorted.binary_search(&target) {
        Ok(index) => index,
        Err(index) => index,
    }
}

fn main() {
    let v = vec![1, 3, 5, 7, 9];
    println!("find 5: {}", find_or_insert_index(&v, 5));  // 2
    println!("find 4: {}", find_or_insert_index(&v, 4));  // 2
    println!("find 10: {}", find_or_insert_index(&v, 10)); // 5
}`,
          hints: [
            'binary_search returns Result<usize, usize> - Ok for found, Err for not found.',
            'Both Ok and Err variants contain a usize index; use match or unwrap_or_else to extract it.',
          ],
        },
      },
      {
        id: 'vec-sort',
        title: 'Vec::sort',
        difficulty: 'beginner',
        tags: ['vec', 'sort', 'sort_by', 'sort_by_key', 'ordering'],
        cheatSheetSummary: 'v.sort(), v.sort_by(|a, b| cmp), v.sort_unstable() — in-place sorting',
        signature: 'fn sort(&mut self) where T: Ord',
        sections: [
          {
            heading: 'Sorting Vectors',
            content: 'sort() performs a stable sort (preserves order of equal elements). sort_unstable() is faster but does not preserve order of equals. sort_by() accepts a custom comparator, and sort_by_key() sorts by a derived key.',
            code: `fn main() {
    let mut nums = vec![5, 3, 8, 1, 9, 2, 7];
    nums.sort();
    println!("ascending: {:?}", nums);

    nums.sort_by(|a, b| b.cmp(a));
    println!("descending: {:?}", nums);

    // Sort by key
    let mut words = vec!["banana", "fig", "apple", "kiwi"];
    words.sort_by_key(|w| w.len());
    println!("by length: {:?}", words);

    // Sort structs
    let mut people = vec![
        ("Alice", 30),
        ("Bob", 25),
        ("Charlie", 35),
        ("Diana", 25),
    ];
    people.sort_by(|a, b| a.1.cmp(&b.1).then(a.0.cmp(&b.0)));
    println!("by age then name: {:?}", people);

    // Sort floats (no Ord, use partial_cmp)
    let mut floats = vec![3.14, 1.0, 2.71, 0.5];
    floats.sort_by(|a, b| a.partial_cmp(b).unwrap());
    println!("floats: {:?}", floats);
}`,
            output: `ascending: [1, 2, 3, 5, 7, 8, 9]
descending: [9, 8, 7, 5, 3, 2, 1]
by length: ["fig", "kiwi", "apple", "banana"]
by age then name: [("Bob", 25), ("Diana", 25), ("Alice", 30), ("Charlie", 35)]
floats: [0.5, 1.0, 2.71, 3.14]`,
            tip: 'Use sort_unstable() in performance-critical code and competitive programming. It is typically 10-20% faster than stable sort.',
            diagram: {
              kind: 'custom',
              type: 'algorithm-steps',
              data: {
                title: 'Vec sorting methods comparison',
                steps: [
                  { label: 'sort()', description: 'Stable, O(n log n), preserves equal-element order' },
                  { label: 'sort_unstable()', description: 'Unstable, O(n log n), 10-20% faster, may reorder equals' },
                  { label: 'sort_by(|a,b| ...)', description: 'Custom comparator, stable' },
                  { label: 'sort_by_key(|x| ...)', description: 'Sort by derived key, stable' },
                ],
              },
              caption: 'Four in-place sorting methods: choose based on stability needs and whether you need custom ordering',
            },
          },
        ],
        quiz: [
          {
            question: 'What is the difference between sort() and sort_unstable()?',
            options: ['sort() is O(n), sort_unstable() is O(n log n)', 'sort() preserves order of equal elements, sort_unstable() does not', 'sort_unstable() can panic on certain inputs', 'sort() works on any type, sort_unstable() requires Ord'],
            correctIndex: 1,
            explanation: 'A stable sort preserves the relative order of elements that compare as equal. sort_unstable() may reorder equal elements, but is typically 10-20% faster.',
          },
          {
            question: 'Why can you not sort a Vec<f64> using sort() directly?',
            options: ['f64 is not Copy', 'f64 does not implement Ord because NaN breaks total ordering', 'f64 is too large to compare', 'sort() only works with integers'],
            correctIndex: 1,
            explanation: 'Floating point types implement PartialOrd but not Ord, because NaN is not comparable. Use sort_by(|a, b| a.partial_cmp(b).unwrap()) instead.',
          },
          {
            question: 'What does sort_by_key(|w| w.len()) do on a Vec<&str>?',
            options: ['Sorts strings alphabetically', 'Sorts strings by their byte length', 'Reverses the vector', 'Sorts strings by first character'],
            correctIndex: 1,
            explanation: 'sort_by_key extracts a key from each element for comparison. Here w.len() returns the string length, so strings are sorted from shortest to longest.',
          },
        ],
        challenge: {
          prompt: 'Write a function that sorts a Vec of (name, score) tuples by score descending, breaking ties alphabetically by name ascending.',
          starterCode: `fn sort_leaderboard(mut entries: Vec<(&str, i32)>) -> Vec<(&str, i32)> {
    // TODO: sort by score descending, then by name ascending for ties
    entries
}

fn main() {
    let data = vec![("Alice", 90), ("Bob", 85), ("Charlie", 90), ("Diana", 85)];
    let sorted = sort_leaderboard(data);
    println!("{:?}", sorted);
    // [("Alice", 90), ("Charlie", 90), ("Bob", 85), ("Diana", 85)]
}`,
          solutionCode: `fn sort_leaderboard(mut entries: Vec<(&str, i32)>) -> Vec<(&str, i32)> {
    entries.sort_by(|a, b| b.1.cmp(&a.1).then(a.0.cmp(&b.0)));
    entries
}

fn main() {
    let data = vec![("Alice", 90), ("Bob", 85), ("Charlie", 90), ("Diana", 85)];
    let sorted = sort_leaderboard(data);
    println!("{:?}", sorted);
    // [("Alice", 90), ("Charlie", 90), ("Bob", 85), ("Diana", 85)]
}`,
          hints: [
            'Use sort_by with a custom comparator closure.',
            'For descending score, compare b.1.cmp(&a.1) (reversed order).',
            'Use .then() to chain a secondary comparison for tie-breaking: a.0.cmp(&b.0) for ascending name.',
          ],
        },
      },
      {
        id: 'vec-retain',
        title: 'Vec::retain',
        difficulty: 'intermediate',
        tags: ['vec', 'retain', 'filter', 'remove', 'in-place'],
        cheatSheetSummary: 'v.retain(|x| predicate) — remove elements that do not match, in-place',
        signature: 'fn retain<F: FnMut(&T) -> bool>(&mut self, f: F)',
        sections: [
          {
            heading: 'In-Place Filtering',
            content: 'retain removes all elements for which the predicate returns false. It modifies the vector in-place, preserving order. This is more efficient than creating a new filtered vector when you own the data.',
            code: `fn main() {
    // Keep only even numbers
    let mut nums = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    nums.retain(|&x| x % 2 == 0);
    println!("evens: {:?}", nums);

    // Remove specific values
    let mut names = vec!["Alice", "Bob", "Charlie", "Bob", "Diana"];
    names.retain(|&name| name != "Bob");
    println!("without Bob: {:?}", names);

    // retain_mut: modify while filtering (Rust 1.61+)
    let mut scores = vec![85, 42, 93, 55, 78, 31, 99];
    scores.retain(|&x| x >= 50);
    println!("passing scores: {:?}", scores);

    // Compared to filter+collect (creates new vec)
    let data = vec![1, 2, 3, 4, 5];
    let filtered: Vec<_> = data.iter().filter(|&&x| x > 3).collect();
    println!("filtered (new vec): {:?}", filtered);
    println!("original unchanged: {:?}", data);
}`,
            output: `evens: [2, 4, 6, 8, 10]
without Bob: ["Alice", "Charlie", "Diana"]
passing scores: [85, 93, 78, 99]
filtered (new vec): [4, 5]
original unchanged: [1, 2, 3, 4, 5]`,
          },
        ],
        quiz: [
          {
            question: 'What does retain do to elements where the predicate returns false?',
            options: ['Moves them to a new vector', 'Drops (removes) them from the vector', 'Sets them to default values', 'Marks them for later removal'],
            correctIndex: 1,
            explanation: 'retain removes and drops all elements for which the predicate returns false, modifying the vector in-place.',
          },
          {
            question: 'Does retain preserve the order of the remaining elements?',
            options: ['No, it sorts them', 'Yes, the relative order is preserved', 'Only if the elements implement Ord', 'It reverses them'],
            correctIndex: 1,
            explanation: 'retain preserves the original ordering of the elements that satisfy the predicate. It shifts remaining elements to close gaps left by removed elements.',
          },
          {
            question: 'How does retain differ from .iter().filter().collect()?',
            options: ['retain is slower', 'retain modifies in-place; filter+collect creates a new Vec', 'They are identical', 'filter does not preserve order'],
            correctIndex: 1,
            explanation: 'retain modifies the vector in-place without allocating a new one, while filter().collect() creates a new Vec, leaving the original unchanged.',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes a mutable Vec<String> and removes all strings that are shorter than a given minimum length. Modify the vector in-place using retain.',
          starterCode: `fn remove_short_strings(words: &mut Vec<String>, min_len: usize) {
    // TODO: use retain to keep only strings with length >= min_len
}

fn main() {
    let mut words = vec![
        "hi".to_string(),
        "hello".to_string(),
        "a".to_string(),
        "world".to_string(),
        "ok".to_string(),
    ];
    remove_short_strings(&mut words, 3);
    println!("{:?}", words); // ["hello", "world"]
}`,
          solutionCode: `fn remove_short_strings(words: &mut Vec<String>, min_len: usize) {
    words.retain(|w| w.len() >= min_len);
}

fn main() {
    let mut words = vec![
        "hi".to_string(),
        "hello".to_string(),
        "a".to_string(),
        "world".to_string(),
        "ok".to_string(),
    ];
    remove_short_strings(&mut words, 3);
    println!("{:?}", words); // ["hello", "world"]
}`,
          hints: [
            'retain takes a closure that receives a reference to each element.',
            'Use w.len() >= min_len as the predicate to keep strings of sufficient length.',
          ],
        },
      },
      {
        id: 'vec-extend',
        title: 'Vec::extend',
        difficulty: 'beginner',
        tags: ['vec', 'extend', 'append', 'concatenate', 'merge'],
        cheatSheetSummary: 'v.extend(iter) — append all elements from an iterator',
        signature: 'fn extend<I: IntoIterator<Item = T>>(&mut self, iter: I)',
        sections: [
          {
            heading: 'Extending Vectors',
            content: 'extend appends all elements from any iterator to the vector. It is more efficient than repeated push calls because it can pre-allocate. Use append to move all elements from another Vec.',
            code: `fn main() {
    let mut v = vec![1, 2, 3];

    // Extend from a slice
    v.extend([4, 5, 6]);
    println!("after extend: {:?}", v);

    // Extend from another vector (borrows)
    let more = vec![7, 8, 9];
    v.extend(&more);
    println!("after extend ref: {:?}", v);
    println!("more still valid: {:?}", more);

    // Extend from an iterator
    v.extend((10..=12).map(|x| x * 10));
    println!("after extend iter: {:?}", v);

    // append: move all from another Vec (leaves it empty)
    let mut a = vec![1, 2, 3];
    let mut b = vec![4, 5, 6];
    a.append(&mut b);
    println!("a: {:?}", a);
    println!("b (emptied): {:?}", b);

    // Concatenating with iterators
    let combined: Vec<i32> = vec![1, 2]
        .into_iter()
        .chain(vec![3, 4].into_iter())
        .chain(vec![5, 6].into_iter())
        .collect();
    println!("combined: {:?}", combined);
}`,
            output: `after extend: [1, 2, 3, 4, 5, 6]
after extend ref: [1, 2, 3, 4, 5, 6, 7, 8, 9]
after extend iter: [1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 110, 120]
a: [1, 2, 3, 4, 5, 6]
b (emptied): []
combined: [1, 2, 3, 4, 5, 6]`,
          },
        ],
        quiz: [
          {
            question: 'What is the difference between extend() and append()?',
            options: ['They are identical', 'extend takes any iterator; append takes &mut Vec and empties it', 'append is faster than extend', 'extend consumes the source; append borrows it'],
            correctIndex: 1,
            explanation: 'extend works with any IntoIterator. append specifically takes a &mut Vec<T>, moves all elements out, and leaves the source vector empty.',
          },
          {
            question: 'Does extend(&other_vec) consume (move) the other vector?',
            options: ['Yes, the other vector is consumed', 'No, it borrows the elements (clones for non-Copy types)', 'It depends on the element type', 'It always panics for non-Copy types'],
            correctIndex: 1,
            explanation: 'When you pass a reference (&other_vec), extend iterates over references. For Copy types it copies; for non-Copy types it requires Clone. The source vector remains usable.',
          },
          {
            question: 'What happens to the source Vec after calling a.append(&mut b)?',
            options: ['b is unchanged', 'b is emptied (len becomes 0)', 'b is dropped/deallocated', 'b contains a copy of a\'s elements'],
            correctIndex: 1,
            explanation: 'append moves all elements from b into a. After the call, b is empty (len 0) but still allocated and usable for future operations.',
          },
        ],
        challenge: {
          prompt: 'Write a function that merges multiple Vec<i32> into a single Vec<i32> using extend. The function takes a Vec of Vecs and returns one flattened Vec.',
          starterCode: `fn flatten(vecs: Vec<Vec<i32>>) -> Vec<i32> {
    let mut result = Vec::new();
    // TODO: extend result with each inner vec
    result
}

fn main() {
    let data = vec![vec![1, 2], vec![3, 4, 5], vec![6]];
    println!("{:?}", flatten(data)); // [1, 2, 3, 4, 5, 6]
}`,
          solutionCode: `fn flatten(vecs: Vec<Vec<i32>>) -> Vec<i32> {
    let mut result = Vec::new();
    for v in vecs {
        result.extend(v);
    }
    result
}

fn main() {
    let data = vec![vec![1, 2], vec![3, 4, 5], vec![6]];
    println!("{:?}", flatten(data)); // [1, 2, 3, 4, 5, 6]
}`,
          hints: [
            'Iterate over each inner Vec and call result.extend(v) to append its elements.',
            'Since the for loop consumes vecs by value, each inner Vec v is also owned and can be passed directly to extend.',
          ],
        },
      },
      {
        id: 'vec-drain',
        title: 'Vec::drain',
        difficulty: 'intermediate',
        tags: ['vec', 'drain', 'remove-range', 'splice', 'extract'],
        cheatSheetSummary: 'v.drain(range) -> Drain<T> — remove and yield elements from a range',
        signature: 'fn drain<R: RangeBounds<usize>>(&mut self, range: R) -> Drain<T>',
        sections: [
          {
            heading: 'Draining Ranges',
            content: 'drain removes a range of elements from the vector and returns them as an iterator. The remaining elements shift to fill the gap. drain(..) removes all elements (like clear but yields them).',
            code: `fn main() {
    // Drain a range
    let mut v = vec![0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let middle: Vec<i32> = v.drain(3..7).collect();
    println!("drained: {:?}", middle);
    println!("remaining: {:?}", v);

    // Drain all
    let mut data = vec![10, 20, 30];
    let all: Vec<i32> = data.drain(..).collect();
    println!("all: {:?}, data: {:?}", all, data);

    // Drain as processing pattern: take first N
    let mut queue = vec![1, 2, 3, 4, 5, 6, 7, 8];
    let batch: Vec<i32> = queue.drain(..3).collect();
    println!("batch: {:?}", batch);
    println!("queue: {:?}", queue);

    // Split a vec at a position
    let mut original = vec!['a', 'b', 'c', 'd', 'e'];
    let second_half: Vec<char> = original.drain(2..).collect();
    println!("first: {:?}, second: {:?}", original, second_half);
}`,
            output: `drained: [3, 4, 5, 6]
remaining: [0, 1, 2, 7, 8, 9]
all: [10, 20, 30], data: []
batch: [1, 2, 3]
queue: [4, 5, 6, 7, 8]
first: ['a', 'b'], second: ['c', 'd', 'e']`,
            tip: 'drain is useful for batch processing: take N items from the front of a queue without cloning. If you only need to clear, use .clear() instead.',
            diagram: {
              kind: 'custom',
              type: 'array',
              data: {
                before: {
                  label: 'Before drain(3..7)',
                  items: [
                    { value: '0', color: '#86efac' },
                    { value: '1', color: '#86efac' },
                    { value: '2', color: '#86efac' },
                    { value: '3', color: '#fca5a5' },
                    { value: '4', color: '#fca5a5' },
                    { value: '5', color: '#fca5a5' },
                    { value: '6', color: '#fca5a5' },
                    { value: '7', color: '#86efac' },
                    { value: '8', color: '#86efac' },
                    { value: '9', color: '#86efac' },
                  ],
                },
                after: {
                  label: 'After drain(3..7)',
                  items: [
                    { value: '0', color: '#86efac' },
                    { value: '1', color: '#86efac' },
                    { value: '2', color: '#86efac' },
                    { value: '7', color: '#86efac' },
                    { value: '8', color: '#86efac' },
                    { value: '9', color: '#86efac' },
                  ],
                },
                drained: {
                  label: 'Drained elements (returned)',
                  items: [
                    { value: '3', color: '#fca5a5' },
                    { value: '4', color: '#fca5a5' },
                    { value: '5', color: '#fca5a5' },
                    { value: '6', color: '#fca5a5' },
                  ],
                },
              },
              caption: 'drain(3..7) removes indices 3-6 and returns them; remaining elements shift left to close the gap',
            },
          },
        ],
        quiz: [
          {
            question: 'What does drain(..) (with full range) do?',
            options: ['It is a syntax error', 'It removes and returns all elements, leaving the Vec empty', 'It clears the Vec without returning elements', 'It clones all elements'],
            correctIndex: 1,
            explanation: 'drain(..) uses the RangeFull range, which covers all indices. It removes every element and returns them as a Drain iterator, leaving the vector empty.',
          },
          {
            question: 'What happens to the remaining elements in the Vec after drain(2..5)?',
            options: ['They stay at their original indices with gaps', 'Elements after index 5 shift left to fill the gap', 'The Vec is truncated at index 2', 'The Vec panics if there are remaining elements'],
            correctIndex: 1,
            explanation: 'After draining a range, the elements after the drained range shift left to close the gap. The Vec length decreases by the number of drained elements.',
          },
          {
            question: 'What does drain return?',
            options: ['A Vec<T>', 'An Option<T>', 'A Drain<T> iterator', 'Nothing (unit)'],
            correctIndex: 2,
            explanation: 'drain returns a Drain<T> iterator that yields the removed elements. You can collect it into a Vec, loop over it, or drop it (which still removes the elements).',
          },
        ],
        challenge: {
          prompt: 'Write a function that processes a work queue in batches. It takes a mutable Vec<String> queue and a batch_size, drains up to batch_size items from the front, and returns them as a Vec<String>.',
          starterCode: `fn take_batch(queue: &mut Vec<String>, batch_size: usize) -> Vec<String> {
    // TODO: drain up to batch_size elements from the front
    todo!()
}

fn main() {
    let mut queue: Vec<String> = (1..=8).map(|i| format!("task_{}", i)).collect();
    let batch1 = take_batch(&mut queue, 3);
    println!("batch 1: {:?}", batch1); // ["task_1", "task_2", "task_3"]
    println!("remaining: {:?}", queue); // ["task_4", ..., "task_8"]
    let batch2 = take_batch(&mut queue, 3);
    println!("batch 2: {:?}", batch2); // ["task_4", "task_5", "task_6"]
}`,
          solutionCode: `fn take_batch(queue: &mut Vec<String>, batch_size: usize) -> Vec<String> {
    let end = batch_size.min(queue.len());
    queue.drain(..end).collect()
}

fn main() {
    let mut queue: Vec<String> = (1..=8).map(|i| format!("task_{}", i)).collect();
    let batch1 = take_batch(&mut queue, 3);
    println!("batch 1: {:?}", batch1); // ["task_1", "task_2", "task_3"]
    println!("remaining: {:?}", queue); // ["task_4", ..., "task_8"]
    let batch2 = take_batch(&mut queue, 3);
    println!("batch 2: {:?}", batch2); // ["task_4", "task_5", "task_6"]
}`,
          hints: [
            'Use drain(..n) to take the first n elements from the front of the queue.',
            'Clamp the batch size to the queue length with batch_size.min(queue.len()) to avoid panicking on short queues.',
            'Collect the Drain iterator into a Vec<String> to get the batch.',
          ],
        },
      },
      {
        id: 'vec-dedup',
        title: 'Vec::dedup',
        difficulty: 'intermediate',
        tags: ['vec', 'dedup', 'deduplicate', 'unique', 'consecutive'],
        cheatSheetSummary: 'v.dedup() — remove consecutive duplicate elements in-place',
        signature: 'fn dedup(&mut self) where T: PartialEq',
        sections: [
          {
            heading: 'Removing Duplicates',
            content: 'dedup removes consecutive duplicate elements. To remove all duplicates, sort first then dedup. dedup_by and dedup_by_key provide custom comparison logic.',
            code: `fn main() {
    // dedup: removes consecutive duplicates only
    let mut v = vec![1, 1, 2, 3, 3, 3, 2, 2, 1];
    v.dedup();
    println!("dedup: {:?}", v); // [1, 2, 3, 2, 1]

    // Sort + dedup: remove ALL duplicates
    let mut v2 = vec![3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    v2.sort();
    v2.dedup();
    println!("sort+dedup: {:?}", v2);

    // dedup_by_key: compare by derived value
    let mut words = vec!["Hello", "hello", "WORLD", "world", "Rust"];
    words.dedup_by_key(|w| w.to_lowercase());
    println!("dedup by lowercase: {:?}", words);

    // dedup_by: custom equality
    let mut nums = vec![1.0, 1.1, 1.2, 2.0, 2.1, 3.0];
    nums.dedup_by(|a, b| (*a - *b).abs() < 0.5);
    println!("dedup by proximity: {:?}", nums);
}`,
            output: `dedup: [1, 2, 3, 2, 1]
sort+dedup: [1, 2, 3, 4, 5, 6, 9]
dedup by lowercase: ["Hello", "WORLD", "Rust"]
dedup by proximity: [1.0, 2.0, 3.0]`,
            warning: 'dedup only removes CONSECUTIVE duplicates. vec![1, 2, 1].dedup() produces [1, 2, 1] — the second 1 is not removed because it is not consecutive. Sort first for full deduplication.',
            analogy: 'Think of it like removing stutters from speech: "I I I want want food" becomes "I want food," but "I want I want" stays the same because the repeated "I want" blocks are not adjacent.',
            codeHighlightLines: [3, 4, 7, 8, 9],
          },
        ],
        quiz: [
          {
            question: 'What does dedup() do on vec![1, 2, 1, 2]?',
            options: ['Produces [1, 2]', 'Produces [1, 2, 1, 2] (unchanged)', 'Produces [1, 2, 1]', 'It panics'],
            correctIndex: 1,
            explanation: 'dedup only removes CONSECUTIVE duplicates. Since no adjacent elements are equal in [1, 2, 1, 2], the vector is unchanged.',
          },
          {
            question: 'How do you remove ALL duplicates from a Vec (not just consecutive)?',
            options: ['Call dedup() twice', 'Sort the Vec first, then call dedup()', 'Use dedup_by with a custom comparator', 'It is not possible with dedup'],
            correctIndex: 1,
            explanation: 'Sorting groups all identical elements together, making them consecutive. Then dedup() removes the consecutive duplicates, leaving only unique values.',
          },
          {
            question: 'What does dedup_by_key(|w| w.to_lowercase()) do?',
            options: ['Removes elements that are lowercase', 'Removes consecutive elements with the same lowercase form', 'Converts all elements to lowercase', 'Sorts elements by lowercase'],
            correctIndex: 1,
            explanation: 'dedup_by_key compares consecutive elements by a derived key. If two adjacent elements produce the same key (same lowercase form), the second one is removed.',
          },
          {
            question: 'What trait does T need for plain dedup() to work?',
            options: ['Ord', 'Hash', 'PartialEq', 'Clone'],
            correctIndex: 2,
            explanation: 'dedup compares consecutive elements using ==, which requires the PartialEq trait. It does not need Ord or Hash.',
          },
        ],
        challenge: {
          prompt: 'Write a function that removes all duplicate integers from a Vec<i32>, preserving the sorted unique values. Use sort and dedup.',
          starterCode: `fn unique_sorted(mut v: Vec<i32>) -> Vec<i32> {
    // TODO: sort and dedup to get unique sorted values
    v
}

fn main() {
    let data = vec![3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    let result = unique_sorted(data);
    println!("{:?}", result); // [1, 2, 3, 4, 5, 6, 9]
}`,
          solutionCode: `fn unique_sorted(mut v: Vec<i32>) -> Vec<i32> {
    v.sort();
    v.dedup();
    v
}

fn main() {
    let data = vec![3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    let result = unique_sorted(data);
    println!("{:?}", result); // [1, 2, 3, 4, 5, 6, 9]
}`,
          hints: [
            'First call v.sort() to group duplicates together.',
            'Then call v.dedup() to remove consecutive duplicates.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  String Methods                                               */
  /* ------------------------------------------------------------ */
  {
    id: 'rust-string-methods',
    label: 'String Methods',
    icon: 'Type',
    entries: [
      {
        id: 'str-len',
        title: 'str::len',
        difficulty: 'beginner',
        tags: ['string', 'len', 'length', 'bytes', 'chars', 'count'],
        cheatSheetSummary: 's.len() returns byte count, s.chars().count() returns character count',
        signature: 'fn len(&self) -> usize',
        sections: [
          {
            heading: 'String Length: Bytes vs Characters',
            content: 'len() returns the byte length of the string, not the number of characters. For ASCII strings they are the same, but for multi-byte UTF-8 characters (accented letters, CJK, emoji) they differ. Use .chars().count() for character count.',
            code: `fn main() {
    let ascii = "Hello";
    println!("'{}': bytes={}, chars={}", ascii, ascii.len(), ascii.chars().count());

    let emoji = "Hello 🦀!";
    println!("'{}': bytes={}, chars={}", emoji, emoji.len(), emoji.chars().count());

    let chinese = "你好世界";
    println!("'{}': bytes={}, chars={}", chinese, chinese.len(), chinese.chars().count());

    // is_empty
    println!("empty: {}", "".is_empty());
    println!("space: {}", " ".is_empty());
}`,
            output: `'Hello': bytes=5, chars=5
'Hello 🦀!': bytes=12, chars=9
'你好世界': bytes=12, chars=4
empty: true
space: false`,
            warning: 'len() returns bytes, not characters. "🦀".len() is 4, not 1. Always use .chars().count() when you need the true character count.',
            diagram: {
              kind: 'custom',
              type: 'memory-layout',
              data: {
                regions: [
                  {
                    label: '"Cafe\\u0301 🦀" in UTF-8 bytes',
                    color: '#6366f1',
                    items: [
                      { name: 'byte 0', value: '43 (C)' },
                      { name: 'byte 1', value: '61 (a)' },
                      { name: 'byte 2', value: '66 (f)' },
                      { name: 'byte 3-4', value: 'C3 A9 (e\\u0301)' },
                      { name: 'byte 5', value: '20 (space)' },
                      { name: 'byte 6-9', value: 'F0 9F A6 80 (🦀)' },
                    ],
                  },
                  {
                    label: 'Measurement comparison',
                    color: '#f59e0b',
                    items: [
                      { name: '.len()', value: '10 bytes' },
                      { name: '.chars().count()', value: '6 characters' },
                    ],
                  },
                ],
              },
              caption: 'UTF-8 uses variable-width encoding: ASCII = 1 byte, accented = 2 bytes, emoji = 4 bytes. len() counts bytes, chars().count() counts characters.',
            },
            codeHighlightLines: [2, 3, 5, 6, 8, 9],
          },
        ],
        quiz: [
          {
            question: 'What does "Hello".len() return?',
            options: ['5 (character count)', '5 (byte count, same for ASCII)', '10 (Unicode code points)', 'It depends on the platform'],
            correctIndex: 1,
            explanation: 'len() returns the byte length. For ASCII strings, each character is 1 byte, so the byte count equals the character count. "Hello" is 5 bytes.',
          },
          {
            question: 'What does "🦀".len() return?',
            options: ['1', '2', '4', '8'],
            correctIndex: 2,
            explanation: 'The crab emoji 🦀 is encoded as 4 bytes in UTF-8. len() returns bytes, not characters, so it returns 4.',
          },
          {
            question: 'How do you get the true character count of a string?',
            options: ['s.len()', 's.size()', 's.chars().count()', 's.char_count()'],
            correctIndex: 2,
            explanation: 'chars() returns an iterator over Unicode characters, and count() consumes it to count them. This gives the actual character count regardless of byte encoding.',
          },
        ],
        challenge: {
          prompt: 'Write a function that returns a tuple of (byte_count, char_count, is_ascii) for a given string slice.',
          starterCode: `fn string_stats(s: &str) -> (usize, usize, bool) {
    // TODO: return (byte count, character count, whether all ASCII)
    todo!()
}

fn main() {
    println!("{:?}", string_stats("Hello"));       // (5, 5, true)
    println!("{:?}", string_stats("Hello 🦀"));    // (10, 7, false)
    println!("{:?}", string_stats("你好"));          // (6, 2, false)
}`,
          solutionCode: `fn string_stats(s: &str) -> (usize, usize, bool) {
    (s.len(), s.chars().count(), s.is_ascii())
}

fn main() {
    println!("{:?}", string_stats("Hello"));       // (5, 5, true)
    println!("{:?}", string_stats("Hello 🦀"));    // (10, 7, false)
    println!("{:?}", string_stats("你好"));          // (6, 2, false)
}`,
          hints: [
            'Use s.len() for byte count and s.chars().count() for character count.',
            'Use s.is_ascii() to check if all characters are in the ASCII range.',
          ],
        },
      },
      {
        id: 'str-contains',
        title: 'str::contains',
        difficulty: 'beginner',
        tags: ['string', 'contains', 'search', 'find', 'substring'],
        cheatSheetSummary: 's.contains("sub") -> bool, s.find("sub") -> Option<usize>',
        signature: 'fn contains<P: Pattern>(&self, pat: P) -> bool',
        sections: [
          {
            heading: 'Searching in Strings',
            content: 'contains checks if a substring or character exists. find returns the byte position of the first match. rfind searches from the end. matches returns an iterator of all matches.',
            code: `fn main() {
    let text = "Hello, Rust World! Hello again!";

    // contains
    println!("has 'Rust': {}", text.contains("Rust"));
    println!("has 'Python': {}", text.contains("Python"));
    println!("has '!': {}", text.contains('!'));

    // find: first byte position
    println!("find 'World': {:?}", text.find("World"));
    println!("find 'xyz': {:?}", text.find("xyz"));

    // rfind: last occurrence
    println!("rfind 'Hello': {:?}", text.rfind("Hello"));

    // matches: all occurrences
    let count = text.matches("Hello").count();
    println!("'Hello' appears {} times", count);

    // match_indices: positions + matches
    for (pos, matched) in text.match_indices("Hello") {
        println!("  found '{}' at byte {}", matched, pos);
    }
}`,
            output: `has 'Rust': true
has 'Python': false
has '!': true
find 'World': Some(12)
find 'xyz': None
rfind 'Hello': Some(19)
'Hello' appears 2 times
  found 'Hello' at byte 0
  found 'Hello' at byte 19`,
          },
        ],
        quiz: [
          {
            question: 'What does find() return when the substring is found?',
            options: ['true', 'The character index', 'The byte position wrapped in Some', 'The matching substring'],
            correctIndex: 2,
            explanation: 'find() returns Option<usize> where the usize is the byte position (not character position) of the first match. Returns None if not found.',
          },
          {
            question: 'What is the difference between find() and rfind()?',
            options: ['find is case-sensitive, rfind is not', 'find searches from the start, rfind searches from the end', 'rfind returns all matches', 'There is no difference'],
            correctIndex: 1,
            explanation: 'find() returns the byte position of the first occurrence (searching left to right). rfind() returns the byte position of the last occurrence (searching right to left).',
          },
          {
            question: 'How do you count the number of times a substring appears in a string?',
            options: ['s.count("sub")', 's.find_all("sub").len()', 's.matches("sub").count()', 's.contains_count("sub")'],
            correctIndex: 2,
            explanation: 'matches() returns an iterator of all non-overlapping occurrences of the pattern. Calling count() on it gives the total number of matches.',
          },
        ],
        challenge: {
          prompt: 'Write a function that finds all positions (byte indices) where a given pattern occurs in a string, and returns them as a Vec<usize>.',
          starterCode: `fn find_all_positions(text: &str, pattern: &str) -> Vec<usize> {
    // TODO: return byte indices of all occurrences of pattern in text
    todo!()
}

fn main() {
    let text = "abcabcabc";
    println!("{:?}", find_all_positions(text, "abc")); // [0, 3, 6]
    println!("{:?}", find_all_positions(text, "xyz")); // []
}`,
          solutionCode: `fn find_all_positions(text: &str, pattern: &str) -> Vec<usize> {
    text.match_indices(pattern).map(|(pos, _)| pos).collect()
}

fn main() {
    let text = "abcabcabc";
    println!("{:?}", find_all_positions(text, "abc")); // [0, 3, 6]
    println!("{:?}", find_all_positions(text, "xyz")); // []
}`,
          hints: [
            'Use match_indices() which returns an iterator of (byte_position, matched_str) tuples.',
            'Map over the tuples to extract just the positions, then collect into a Vec.',
          ],
        },
      },
      {
        id: 'str-replace',
        title: 'str::replace',
        difficulty: 'beginner',
        tags: ['string', 'replace', 'replacen', 'substitution'],
        cheatSheetSummary: 's.replace("old", "new") -> String — returns a new string with replacements',
        signature: 'fn replace<P: Pattern>(&self, from: P, to: &str) -> String',
        sections: [
          {
            heading: 'Replacing Substrings',
            content: 'replace creates a new String with all occurrences of a pattern replaced. replacen limits the number of replacements. These methods return new strings; they do not modify in place.',
            code: `fn main() {
    let text = "hello world hello rust";

    // Replace all occurrences
    let replaced = text.replace("hello", "hi");
    println!("{}", replaced);

    // Replace only first N occurrences
    let first_only = text.replacen("hello", "HI", 1);
    println!("{}", first_only);

    // Replace characters
    let cleaned = "a.b.c.d".replace('.', "/");
    println!("{}", cleaned);

    // Chain replacements
    let result = "foo-bar_baz"
        .replace('-', " ")
        .replace('_', " ");
    println!("{}", result);

    // Original is unchanged (returns new String)
    println!("original: {}", text);
}`,
            output: `hi world hi rust
HI world hello rust
a/b/c/d
foo bar baz
original: hello world hello rust`,
          },
        ],
        quiz: [
          {
            question: 'Does replace() modify the original string?',
            options: ['Yes, it modifies in-place', 'No, it returns a new String', 'Only if the string is mut', 'It modifies &str but not String'],
            correctIndex: 1,
            explanation: 'replace() always returns a new String with the replacements applied. The original string is not modified because strings in Rust are immutable slices (&str) or owned values that replace creates anew.',
          },
          {
            question: 'What does replacen("hello", "HI", 1) do?',
            options: ['Replaces the last occurrence only', 'Replaces only the first occurrence', 'Replaces all occurrences', 'It is a syntax error'],
            correctIndex: 1,
            explanation: 'replacen takes a count parameter that limits the number of replacements. With count=1, only the first occurrence is replaced.',
          },
          {
            question: 'Can replace() take a char as the pattern?',
            options: ['No, only &str patterns', 'Yes, char implements the Pattern trait', 'Only if you cast it to &str first', 'Only with replace_char()'],
            correctIndex: 1,
            explanation: 'replace accepts any type that implements the Pattern trait, which includes &str, char, and &[char]. So "a.b".replace(\'.\', "/") is perfectly valid.',
          },
        ],
        challenge: {
          prompt: 'Write a function that normalizes whitespace in a string: replace all runs of whitespace (spaces, tabs, newlines) with a single space, and trim leading/trailing whitespace.',
          starterCode: `fn normalize_whitespace(s: &str) -> String {
    // TODO: normalize all whitespace to single spaces
    todo!()
}

fn main() {
    let messy = "  hello   world\t\tfoo\n\nbar  ";
    println!("'{}'", normalize_whitespace(messy));
    // 'hello world foo bar'
}`,
          solutionCode: `fn normalize_whitespace(s: &str) -> String {
    s.split_whitespace().collect::<Vec<&str>>().join(" ")
}

fn main() {
    let messy = "  hello   world\t\tfoo\n\nbar  ";
    println!("'{}'", normalize_whitespace(messy));
    // 'hello world foo bar'
}`,
          hints: [
            'split_whitespace() handles all types of whitespace and skips leading/trailing whitespace.',
            'Collect the words and join them with a single space using .join(" ").',
            'You can also collect into Vec<&str> first, then call .join(" ").',
          ],
        },
      },
      {
        id: 'str-split',
        title: 'str::split',
        difficulty: 'beginner',
        tags: ['string', 'split', 'split_whitespace', 'splitn', 'tokenize'],
        cheatSheetSummary: 's.split(\',\').collect::<Vec<&str>>() — split string by delimiter',
        signature: 'fn split<P: Pattern>(&self, pat: P) -> Split<P>',
        sections: [
          {
            heading: 'Splitting Strings',
            content: 'split returns an iterator of substrings separated by a pattern. split_whitespace handles any amount of whitespace. splitn limits the number of splits. The pattern can be a char, &str, or closure.',
            code: `fn main() {
    // Split by character
    let csv = "one,two,three,four";
    let parts: Vec<&str> = csv.split(',').collect();
    println!("{:?}", parts);

    // Split by string
    let data = "a::b::c";
    let parts: Vec<&str> = data.split("::").collect();
    println!("{:?}", parts);

    // split_whitespace: handles multiple spaces, tabs, newlines
    let text = "  hello   world\tfoo  ";
    let words: Vec<&str> = text.split_whitespace().collect();
    println!("{:?}", words);

    // splitn: limit number of splits
    let line = "key=value=with=equals";
    let parts: Vec<&str> = line.splitn(2, '=').collect();
    println!("{:?}", parts); // ["key", "value=with=equals"]

    // Split by closure
    let mixed = "abc123def456";
    let alpha: Vec<&str> = mixed.split(|c: char| c.is_numeric()).collect();
    println!("alpha parts: {:?}", alpha);

    // lines: split by newline
    let multiline = "line 1\nline 2\nline 3";
    for line in multiline.lines() {
        println!("  > {}", line);
    }
}`,
            output: `["one", "two", "three", "four"]
["a", "b", "c"]
["hello", "world", "foo"]
["key", "value=with=equals"]
alpha parts: ["abc", "def", ""]
  > line 1
  > line 2
  > line 3`,
            tip: 'Use split_whitespace() instead of split(\' \') for robust whitespace handling. It handles tabs, multiple spaces, and leading/trailing whitespace correctly.',
            codeHighlightLines: [3, 4, 13, 14],
          },
        ],
        quiz: [
          {
            question: 'What does "a,,b".split(\',\').collect::<Vec<&str>>() return?',
            options: ['["a", "b"]', '["a", "", "b"]', '["a,", ",b"]', 'It panics'],
            correctIndex: 1,
            explanation: 'split includes empty strings between consecutive delimiters. "a,,b" splits into ["a", "", "b"] because there is an empty segment between the two commas.',
          },
          {
            question: 'What is the difference between split(\' \') and split_whitespace()?',
            options: ['They are identical', 'split_whitespace handles tabs, multiple spaces, and trims; split(\' \') only splits on single spaces', 'split_whitespace is slower', 'split(\' \') handles all whitespace types'],
            correctIndex: 1,
            explanation: 'split(\' \') splits on each individual space character and produces empty strings for multiple spaces. split_whitespace handles any whitespace (spaces, tabs, newlines) and skips empty results.',
          },
          {
            question: 'What does splitn(2, \'=\') do on "key=value=extra"?',
            options: ['["key", "value", "extra"]', '["key", "value=extra"]', '["key=value", "extra"]', '["key", "value"]'],
            correctIndex: 1,
            explanation: 'splitn(2, \'=\') splits into at most 2 parts. It splits on the first \'=\' and puts everything else in the second part: ["key", "value=extra"].',
          },
        ],
        challenge: {
          prompt: 'Write a function that parses a "key=value" string and returns an Option<(&str, &str)> tuple. Split only on the first "=" so values can contain "=" characters. Return None if there is no "=".',
          starterCode: `fn parse_key_value(s: &str) -> Option<(&str, &str)> {
    // TODO: split on first '=' only, return None if no '='
    todo!()
}

fn main() {
    println!("{:?}", parse_key_value("name=Alice"));          // Some(("name", "Alice"))
    println!("{:?}", parse_key_value("data=a=b=c"));          // Some(("data", "a=b=c"))
    println!("{:?}", parse_key_value("no_equals_here"));      // None
}`,
          solutionCode: `fn parse_key_value(s: &str) -> Option<(&str, &str)> {
    let mut parts = s.splitn(2, '=');
    let key = parts.next()?;
    let value = parts.next()?;
    Some((key, value))
}

fn main() {
    println!("{:?}", parse_key_value("name=Alice"));          // Some(("name", "Alice"))
    println!("{:?}", parse_key_value("data=a=b=c"));          // Some(("data", "a=b=c"))
    println!("{:?}", parse_key_value("no_equals_here"));      // None
}`,
          hints: [
            'Use splitn(2, \'=\') to split into at most 2 parts at the first "=".',
            'Use the ? operator on parts.next() to return None if there is no second part.',
          ],
        },
      },
      {
        id: 'str-trim',
        title: 'str::trim',
        difficulty: 'beginner',
        tags: ['string', 'trim', 'strip', 'whitespace', 'trim_matches'],
        cheatSheetSummary: 's.trim() removes leading/trailing whitespace. trim_start/trim_end for one side.',
        signature: 'fn trim(&self) -> &str',
        sections: [
          {
            heading: 'Trimming Strings',
            content: 'trim removes leading and trailing whitespace. trim_start and trim_end remove from one side. trim_matches removes specific characters. All return a &str slice of the original without allocating.',
            code: `fn main() {
    let padded = "  hello, world  ";
    println!("trim: '{}'", padded.trim());
    println!("trim_start: '{}'", padded.trim_start());
    println!("trim_end: '{}'", padded.trim_end());

    // trim specific characters
    let wrapped = "---hello---";
    println!("trim '-': '{}'", wrapped.trim_matches('-'));
    println!("trim_start '-': '{}'", wrapped.trim_start_matches('-'));

    // trim with closure
    let data = "000042";
    let trimmed = data.trim_start_matches('0');
    println!("trim leading zeros: '{}'", trimmed);

    // strip_prefix / strip_suffix return Option
    let path = "/api/users/123";
    if let Some(rest) = path.strip_prefix("/api/") {
        println!("API path: {}", rest);
    }

    let filename = "document.txt";
    if let Some(name) = filename.strip_suffix(".txt") {
        println!("name without extension: {}", name);
    }
}`,
            output: `trim: 'hello, world'
trim_start: 'hello, world  '
trim_end: '  hello, world'
trim '-': 'hello'
trim_start '-': 'hello---'
trim leading zeros: '42'
API path: users/123
name without extension: document`,
          },
        ],
        quiz: [
          {
            question: 'Does trim() allocate a new String?',
            options: ['Yes, it always creates a new String', 'No, it returns a &str slice of the original', 'Only if whitespace was found', 'It depends on the string type'],
            correctIndex: 1,
            explanation: 'trim() returns a &str that is a sub-slice of the original string. No new allocation is needed because it simply adjusts the start and end pointers.',
          },
          {
            question: 'What does strip_prefix return?',
            options: ['A &str with the prefix removed', 'An Option<&str> - Some if prefix found, None otherwise', 'A new String', 'A bool'],
            correctIndex: 1,
            explanation: 'strip_prefix returns Option<&str>. It returns Some(rest) if the string starts with the prefix, or None if it does not. This is safer than manually checking and slicing.',
          },
          {
            question: 'What does "000042".trim_start_matches(\'0\') return?',
            options: ['"000042"', '"42"', '"00042"', '""'],
            correctIndex: 1,
            explanation: 'trim_start_matches removes all leading occurrences of the character. It strips all four leading zeros, leaving "42".',
          },
        ],
        challenge: {
          prompt: 'Write a function that cleans a file path by trimming whitespace, removing a trailing slash (if present), and stripping a leading "./" prefix (if present).',
          starterCode: `fn clean_path(path: &str) -> &str {
    // TODO: trim whitespace, strip trailing '/', strip leading "./"
    todo!()
}

fn main() {
    println!("'{}'", clean_path("  ./src/main.rs/  ")); // 'src/main.rs'
    println!("'{}'", clean_path("./test/"));              // 'test'
    println!("'{}'", clean_path("plain.txt"));            // 'plain.txt'
}`,
          solutionCode: `fn clean_path(path: &str) -> &str {
    let trimmed = path.trim();
    let trimmed = trimmed.strip_suffix('/').unwrap_or(trimmed);
    let trimmed = trimmed.strip_prefix("./").unwrap_or(trimmed);
    trimmed
}

fn main() {
    println!("'{}'", clean_path("  ./src/main.rs/  ")); // 'src/main.rs'
    println!("'{}'", clean_path("./test/"));              // 'test'
    println!("'{}'", clean_path("plain.txt"));            // 'plain.txt'
}`,
          hints: [
            'Start by calling .trim() to remove surrounding whitespace.',
            'Use strip_suffix(\'/\') and strip_prefix("./"), both return Option<&str> so use unwrap_or to fall back.',
            'Chain the transformations: trim first, then strip suffix, then strip prefix.',
          ],
        },
      },
      {
        id: 'str-to-uppercase',
        title: 'str::to_uppercase & to_lowercase',
        difficulty: 'beginner',
        tags: ['string', 'uppercase', 'lowercase', 'case-conversion'],
        cheatSheetSummary: 's.to_uppercase() / s.to_lowercase() -> String',
        signature: 'fn to_uppercase(&self) -> String',
        sections: [
          {
            heading: 'Case Conversion',
            content: 'to_uppercase and to_lowercase return new Strings with all characters converted. These methods are Unicode-aware, handling special cases like the German sharp s (ss -> SS). For ASCII-only, use make_ascii_uppercase for in-place mutation.',
            code: `fn main() {
    let text = "Hello, World!";
    println!("upper: {}", text.to_uppercase());
    println!("lower: {}", text.to_lowercase());

    // Unicode-aware
    let german = "straße";
    println!("upper: {}", german.to_uppercase()); // STRASSE

    // Case-insensitive comparison
    let a = "Hello";
    let b = "hello";
    println!("eq ignore case: {}", a.to_lowercase() == b.to_lowercase());

    // ASCII-only in-place mutation
    let mut s = String::from("hello");
    s.make_ascii_uppercase();
    println!("in-place: {}", s);

    // eq_ignore_ascii_case
    println!("ascii eq: {}", "Hello".eq_ignore_ascii_case("hello"));
}`,
            output: `upper: HELLO, WORLD!
lower: hello, world!
upper: STRASSE
eq ignore case: true
in-place: HELLO
ascii eq: true`,
            note: 'to_uppercase/to_lowercase return new Strings because case conversion can change the byte length (e.g., German sharp s). They cannot modify in-place.',
          },
        ],
        quiz: [
          {
            question: 'Why do to_uppercase() and to_lowercase() return String instead of &str?',
            options: ['Because they are methods on String, not &str', 'Because case conversion can change the byte length (e.g., sharp s)', 'Because Rust always allocates for method calls', 'They actually return &str'],
            correctIndex: 1,
            explanation: 'Case conversion can change the number of bytes. For example, the German "ß" (2 bytes) uppercases to "SS" (2 bytes, different length semantically). Since the result can differ in byte length, a new String must be allocated.',
          },
          {
            question: 'What does "straße".to_uppercase() produce?',
            options: ['"STRASSE"', '"STRAßE"', '"STRAẞE"', 'It panics on non-ASCII'],
            correctIndex: 0,
            explanation: 'Rust\'s to_uppercase is fully Unicode-aware. The German sharp s (ß) uppercases to "SS" per Unicode rules, so "straße" becomes "STRASSE".',
          },
          {
            question: 'How can you compare two strings case-insensitively for ASCII strings?',
            options: ['a == b', 'a.eq_ignore_ascii_case(b)', 'a.to_lower() == b.to_lower()', 'a.casecmp(b)'],
            correctIndex: 1,
            explanation: 'eq_ignore_ascii_case compares two strings treating ASCII letters as case-insensitive. It is efficient because it does not allocate new strings.',
          },
        ],
        challenge: {
          prompt: 'Write a function that checks if two strings are equal ignoring case, handling full Unicode (not just ASCII). Return true if they are equal when both are lowercased.',
          starterCode: `fn unicode_case_eq(a: &str, b: &str) -> bool {
    // TODO: compare case-insensitively using Unicode-aware lowercasing
    todo!()
}

fn main() {
    println!("{}", unicode_case_eq("Hello", "hello"));     // true
    println!("{}", unicode_case_eq("STRASSE", "straße"));  // true
    println!("{}", unicode_case_eq("Rust", "Python"));     // false
}`,
          solutionCode: `fn unicode_case_eq(a: &str, b: &str) -> bool {
    a.to_lowercase() == b.to_lowercase()
}

fn main() {
    println!("{}", unicode_case_eq("Hello", "hello"));     // true
    println!("{}", unicode_case_eq("STRASSE", "straße"));  // true
    println!("{}", unicode_case_eq("Rust", "Python"));     // false
}`,
          hints: [
            'Convert both strings to lowercase with to_lowercase() and compare.',
            'to_lowercase is Unicode-aware, so "STRASSE" and "straße" both lowercase to the same value.',
          ],
        },
      },
      {
        id: 'str-starts-with',
        title: 'str::starts_with & ends_with',
        difficulty: 'beginner',
        tags: ['string', 'starts_with', 'ends_with', 'prefix', 'suffix'],
        cheatSheetSummary: 's.starts_with("pre") / s.ends_with("suf") -> bool',
        signature: 'fn starts_with<P: Pattern>(&self, pat: P) -> bool',
        sections: [
          {
            heading: 'Prefix and Suffix Checks',
            content: 'starts_with and ends_with check if a string begins or ends with a pattern. The pattern can be a &str, char, or slice of chars. Combined with strip_prefix/strip_suffix, they enable clean prefix/suffix handling.',
            code: `fn main() {
    let url = "https://www.example.com/path";
    println!("is https: {}", url.starts_with("https://"));
    println!("is http: {}", url.starts_with("http://"));
    println!("ends .com: {}", url.ends_with(".com/path"));

    // Check file extensions
    let files = vec!["photo.jpg", "doc.pdf", "image.png", "data.jpg"];
    let jpgs: Vec<_> = files.iter().filter(|f| f.ends_with(".jpg")).collect();
    println!("JPGs: {:?}", jpgs);

    // With characters
    let text = "#hashtag";
    println!("starts with #: {}", text.starts_with('#'));

    // strip_prefix/strip_suffix: remove and return rest
    let tagged = "#rust";
    if let Some(tag) = tagged.strip_prefix('#') {
        println!("tag: {}", tag);
    }

    // Check multiple prefixes
    let line = "// this is a comment";
    let is_comment = line.starts_with("//") || line.starts_with('#');
    println!("is comment: {}", is_comment);
}`,
            output: `is https: true
is http: false
ends .com: false
JPGs: ["photo.jpg", "data.jpg"]
starts with #: true
tag: rust
is comment: true`,
          },
        ],
        quiz: [
          {
            question: 'What type of pattern can starts_with accept?',
            options: ['Only &str', 'Only char', '&str, char, or &[char] — anything implementing Pattern', 'Only regex'],
            correctIndex: 2,
            explanation: 'starts_with accepts any type implementing the Pattern trait, which includes &str for substring matching, char for single character matching, and &[char] for matching any of several characters.',
          },
          {
            question: 'What does strip_prefix return when the prefix is NOT found?',
            options: ['An empty string', 'The original string unchanged', 'None', 'It panics'],
            correctIndex: 2,
            explanation: 'strip_prefix returns Option<&str>. It returns Some(rest) when the prefix is found, or None when it is not. This makes it safe to use with if let or unwrap_or.',
          },
          {
            question: 'How do you check if a filename ends with ".rs" or ".toml"?',
            options: ['f.ends_with(".rs" || ".toml")', 'f.ends_with(".rs") || f.ends_with(".toml")', 'f.ends_with([".rs", ".toml"])', 'f.ends_with_any(".rs", ".toml")'],
            correctIndex: 1,
            explanation: 'You need to call ends_with separately for each pattern and combine with ||. The Pattern trait does not support arrays of string patterns directly.',
          },
        ],
        challenge: {
          prompt: 'Write a function that categorizes a URL by its protocol prefix. Return "secure" for "https://", "insecure" for "http://", "file" for "file://", and "unknown" for anything else. Use starts_with.',
          starterCode: `fn categorize_url(url: &str) -> &str {
    // TODO: categorize based on protocol prefix
    todo!()
}

fn main() {
    println!("{}", categorize_url("https://example.com"));  // secure
    println!("{}", categorize_url("http://example.com"));   // insecure
    println!("{}", categorize_url("file:///home/user"));    // file
    println!("{}", categorize_url("ftp://server.com"));     // unknown
}`,
          solutionCode: `fn categorize_url(url: &str) -> &str {
    if url.starts_with("https://") {
        "secure"
    } else if url.starts_with("http://") {
        "insecure"
    } else if url.starts_with("file://") {
        "file"
    } else {
        "unknown"
    }
}

fn main() {
    println!("{}", categorize_url("https://example.com"));  // secure
    println!("{}", categorize_url("http://example.com"));   // insecure
    println!("{}", categorize_url("file:///home/user"));    // file
    println!("{}", categorize_url("ftp://server.com"));     // unknown
}`,
          hints: [
            'Use if/else if chains with starts_with for each protocol prefix.',
            'Check "https://" before "http://" since "https" also starts with "http".',
          ],
        },
      },
      {
        id: 'str-chars',
        title: 'str::chars',
        difficulty: 'intermediate',
        tags: ['string', 'chars', 'char_indices', 'bytes', 'unicode', 'iteration'],
        cheatSheetSummary: 's.chars() -> iterator of char, s.bytes() -> iterator of u8',
        signature: 'fn chars(&self) -> Chars',
        sections: [
          {
            heading: 'Character and Byte Iteration',
            content: 'chars() iterates over Unicode characters. bytes() iterates over raw bytes. char_indices() gives (byte_offset, char) pairs. These are essential for safe string processing in a UTF-8 world.',
            code: `fn main() {
    let text = "Café 🦀";

    // chars: iterate characters
    let chars: Vec<char> = text.chars().collect();
    println!("chars: {:?}", chars);
    println!("count: {}", text.chars().count());

    // bytes: iterate raw bytes
    let bytes: Vec<u8> = text.bytes().collect();
    println!("bytes: {:?}", bytes);
    println!("byte count: {}", text.bytes().count());

    // char_indices: (byte_offset, char)
    for (i, ch) in text.char_indices() {
        println!("  byte {}: '{}' ({} bytes)", i, ch, ch.len_utf8());
    }

    // Practical: reverse a string
    let reversed: String = text.chars().rev().collect();
    println!("reversed: {}", reversed);

    // Practical: nth character (O(n) operation)
    let third = text.chars().nth(2);
    println!("3rd char: {:?}", third);

    // Practical: is all ASCII?
    println!("is ascii: {}", text.is_ascii());
    println!("'hello' is ascii: {}", "hello".is_ascii());
}`,
            output: `chars: ['C', 'a', 'f', 'é', ' ', '🦀']
count: 6
bytes: [67, 97, 102, 195, 169, 32, 240, 159, 166, 128]
byte count: 10
  byte 0: 'C' (1 bytes)
  byte 1: 'a' (1 bytes)
  byte 2: 'f' (1 bytes)
  byte 3: 'é' (2 bytes)
  byte 5: ' ' (1 bytes)
  byte 6: '🦀' (4 bytes)
reversed: 🦀 éfaC
3rd char: Some('f')
is ascii: false
'hello' is ascii: true`,
            warning: 'chars().nth(n) is O(n) because UTF-8 characters have variable width. If you need frequent random character access, collect into a Vec<char> first.',
          },
        ],
        quiz: [
          {
            question: 'What does chars() iterate over?',
            options: ['Raw bytes (u8)', 'Unicode scalar values (char)', 'Grapheme clusters', 'UTF-8 code units'],
            correctIndex: 1,
            explanation: 'chars() yields Rust char values, which are Unicode scalar values (each is a valid Unicode code point). For raw bytes, use bytes().',
          },
          {
            question: 'Why is chars().nth(n) O(n) and not O(1)?',
            options: ['Because chars() is lazy', 'Because UTF-8 characters have variable byte widths, so you must scan from the start', 'Because Rust strings are linked lists', 'It is actually O(1)'],
            correctIndex: 1,
            explanation: 'UTF-8 is a variable-width encoding (1-4 bytes per character). To find the nth character, you must walk through each preceding character to count byte boundaries. There is no way to jump directly to the nth character.',
          },
          {
            question: 'What does char_indices() yield?',
            options: ['(character_index, char) pairs', '(byte_offset, char) pairs', '(char, byte_count) pairs', 'Only byte offsets'],
            correctIndex: 1,
            explanation: 'char_indices() yields tuples of (byte_offset, char). The first element is the byte position in the string where that character starts, not the character index.',
          },
          {
            question: 'How do you reverse a Rust string correctly?',
            options: ['s.reverse()', 's.chars().rev().collect::<String>()', 's.bytes().rev().collect()', 's[..].reverse()'],
            correctIndex: 1,
            explanation: 'You must iterate over chars (not bytes) to preserve valid UTF-8 encoding, reverse the iterator, and collect back into a String.',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes a string and returns a new string with only the alphabetic characters preserved, maintaining their original order. Use chars() and filtering.',
          starterCode: `fn only_alpha(s: &str) -> String {
    // TODO: keep only alphabetic characters
    todo!()
}

fn main() {
    println!("'{}'", only_alpha("H3ll0, W0rld!"));  // 'HllWrld'
    println!("'{}'", only_alpha("Rust 2024 🦀"));    // 'Rust'
    println!("'{}'", only_alpha("123!!!"));           // ''
}`,
          solutionCode: `fn only_alpha(s: &str) -> String {
    s.chars().filter(|c| c.is_alphabetic()).collect()
}

fn main() {
    println!("'{}'", only_alpha("H3ll0, W0rld!"));  // 'HllWrld'
    println!("'{}'", only_alpha("Rust 2024 🦀"));    // 'Rust'
    println!("'{}'", only_alpha("123!!!"));           // ''
}`,
          hints: [
            'Use s.chars() to iterate over Unicode characters.',
            'Use .filter(|c| c.is_alphabetic()) to keep only letters.',
            'Collect the filtered iterator back into a String.',
          ],
        },
      },
    ],
  },
];

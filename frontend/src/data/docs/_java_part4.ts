import type { DocCategory } from './types';

// Part 4: Collections + Generics
export const JAVA_PART4_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  Collections                                                  */
  /* ------------------------------------------------------------ */
  {
    id: 'java-collections',
    label: 'Collections',
    icon: 'Layers',
    entries: [
      {
        id: 'arraylist',
        title: 'ArrayList',
        difficulty: 'beginner',
        tags: ['ArrayList', 'List', 'dynamic-array', 'random-access'],
        cheatSheetSummary: 'Dynamic array with O(1) random access and O(1) amortized add. Use List<E> interface. Cannot store primitives directly.',
        signature: 'ArrayList<E>()',
        sections: [
          {
            heading: 'Creating and Using ArrayList',
            content:
              'ArrayList is the most commonly used collection in Java. It is a resizable array implementation of the List interface. It provides O(1) random access by index, O(1) amortized appends, and O(n) inserts/removes at arbitrary positions. Always declare the variable type as List<E> for flexibility.',
            code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class ArrayListDemo {
    public static void main(String[] args) {
        // Creating an ArrayList
        List<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");
        System.out.println("Names: " + names);

        // Create from existing data
        List<Integer> nums = new ArrayList<>(Arrays.asList(5, 3, 1, 4, 2));
        System.out.println("Nums: " + nums);

        // Immutable list (Java 9+)
        List<String> fixed = List.of("X", "Y", "Z");
        System.out.println("Fixed: " + fixed);

        // Access and modify
        System.out.println("First: " + names.get(0));
        System.out.println("Size: " + names.size());
        names.set(1, "Barbara");
        System.out.println("After set: " + names);

        // Add and remove
        names.add(1, "Beth");       // insert at index 1
        names.remove("Charlie");     // remove by value
        names.remove(0);             // remove by index
        System.out.println("Modified: " + names);

        // Sort
        Collections.sort(nums);
        System.out.println("Sorted: " + nums);
        nums.sort(Collections.reverseOrder());
        System.out.println("Reversed: " + nums);
    }
}`,
            output: `Names: [Alice, Bob, Charlie]
Nums: [5, 3, 1, 4, 2]
Fixed: [X, Y, Z]
First: Alice
Size: 3
After set: [Alice, Barbara, Charlie]
Modified: [Beth, Barbara]
Sorted: [1, 2, 3, 4, 5]
Reversed: [5, 4, 3, 2, 1]`,
            tip: 'Declare variables as List<E> rather than ArrayList<E>. This lets you swap the implementation (e.g., to LinkedList) without changing client code.',
            analogy: 'Think of it like a stretchy bookshelf: it starts with some room, and when you add more books (elements) than it can hold, it automatically gets a bigger shelf and moves everything over. Getting a book by its position number is instant, but inserting a book in the middle means shifting everything after it.',
            codeHighlightLines: [9, 19, 35, 36],
          },
          {
            heading: 'Common ArrayList Operations',
            content:
              'ArrayList provides methods for searching, checking, converting, and bulk operations. Understanding these methods helps write cleaner code with fewer manual loops.',
            code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ArrayListOps {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(3, 1, 4, 1, 5, 9, 2, 6));

        // Searching
        System.out.println("contains(4): " + nums.contains(4));
        System.out.println("indexOf(1): " + nums.indexOf(1));
        System.out.println("lastIndexOf(1): " + nums.lastIndexOf(1));

        // Sublist (view, not a copy)
        List<Integer> sub = nums.subList(2, 5);
        System.out.println("subList(2,5): " + sub);

        // Bulk operations
        List<Integer> other = List.of(1, 5, 9);
        System.out.println("containsAll: " + nums.containsAll(other));

        // Remove by condition (Java 8+)
        List<Integer> mutable = new ArrayList<>(nums);
        mutable.removeIf(n -> n < 3);
        System.out.println("After removeIf(< 3): " + mutable);

        // Convert to array
        Integer[] arr = nums.toArray(new Integer[0]);
        System.out.println("Array length: " + arr.length);

        // Frequency and min/max
        System.out.println("frequency(1): " + Collections.frequency(nums, 1));
        System.out.println("min: " + Collections.min(nums));
        System.out.println("max: " + Collections.max(nums));

        // Fill and copy
        List<Integer> filled = new ArrayList<>(Collections.nCopies(5, 0));
        System.out.println("Filled: " + filled);
    }
}`,
            output: `contains(4): true
indexOf(1): 1
lastIndexOf(1): 3
subList(2,5): [4, 1, 5]
containsAll: true
After removeIf(< 3): [4, 5, 9, 6]
Array length: 8
frequency(1): 2
min: 1
max: 9
Filled: [0, 0, 0, 0, 0]`,
          },
          {
            heading: 'ArrayList vs Arrays',
            content:
              'Arrays are fixed-size, can hold primitives, and have slightly better performance. ArrayList is dynamic, only holds objects, and provides richer API. Use arrays for performance-critical code with fixed sizes, ArrayList for dynamic collections.',
            code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class ArrayVsList {
    public static void main(String[] args) {
        // Array: fixed size, holds primitives
        int[] arr = new int[5];
        arr[0] = 10;
        System.out.println("Array: " + Arrays.toString(arr));

        // ArrayList: dynamic size, holds objects
        List<Integer> list = new ArrayList<>();
        list.add(10);
        System.out.println("List: " + list);

        // Convert array to list
        int[] primitiveArr = {1, 2, 3, 4, 5};
        List<Integer> fromArr = Arrays.stream(primitiveArr)
                                       .boxed()
                                       .collect(Collectors.toList());
        System.out.println("Array -> List: " + fromArr);

        // Convert list to array
        List<Integer> source = List.of(10, 20, 30);
        int[] toArr = source.stream().mapToInt(Integer::intValue).toArray();
        System.out.println("List -> Array: " + Arrays.toString(toArr));

        // Arrays.asList returns fixed-size list (cannot add/remove)
        List<String> fixedSize = Arrays.asList("a", "b", "c");
        fixedSize.set(0, "x");      // OK: modification allowed
        // fixedSize.add("d");       // throws UnsupportedOperationException
        System.out.println("Fixed-size: " + fixedSize);

        // Writable copy
        List<String> mutable = new ArrayList<>(Arrays.asList("a", "b", "c"));
        mutable.add("d");
        System.out.println("Mutable: " + mutable);
    }
}`,
            output: `Array: [10, 0, 0, 0, 0]
List: [10]
Array -> List: [1, 2, 3, 4, 5]
List -> Array: [10, 20, 30]
Fixed-size: [x, b, c]
Mutable: [a, b, c, d]`,
            warning: 'Arrays.asList() returns a fixed-size list. You can modify elements but cannot add or remove. Wrap in new ArrayList<>() for a fully mutable list.',
            codeHighlightLines: [9, 14, 20, 21, 22, 37],
          },
        ],
        quiz: [
          {
            question: 'What is the time complexity of accessing an element by index in an ArrayList?',
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n log n)'],
            correctIndex: 1,
            explanation: 'ArrayList is backed by an array, so accessing an element by index is a direct memory offset calculation, which takes O(1) constant time.',
          },
          {
            question: 'What happens when you call Arrays.asList("a", "b", "c") and try to add an element to the result?',
            options: [
              'The element is added successfully',
              'It returns null',
              'It throws UnsupportedOperationException',
              'It creates a new larger list automatically',
            ],
            correctIndex: 2,
            explanation: 'Arrays.asList() returns a fixed-size list backed by the original array. You can modify existing elements via set(), but add() and remove() throw UnsupportedOperationException.',
          },
          {
            question: 'Which interface should you use to declare an ArrayList variable for maximum flexibility?',
            options: ['ArrayList<E>', 'Collection<E>', 'List<E>', 'Iterable<E>'],
            correctIndex: 2,
            explanation: 'Declaring the variable as List<E> allows you to swap the implementation (e.g., to LinkedList) without changing any client code. It provides the right balance of abstraction and functionality.',
          },
        ],
        challenge: {
          prompt: 'Write a method that takes a List<Integer> and returns a new ArrayList containing only the even numbers, sorted in ascending order.',
          starterCode: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Challenge {
    public static List<Integer> filterAndSortEvens(List<Integer> nums) {
        // TODO: Filter even numbers into a new list and sort it
    }

    public static void main(String[] args) {
        List<Integer> input = List.of(9, 4, 7, 2, 8, 1, 6, 3);
        System.out.println(filterAndSortEvens(input));
        // Expected: [2, 4, 6, 8]
    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Challenge {
    public static List<Integer> filterAndSortEvens(List<Integer> nums) {
        List<Integer> evens = new ArrayList<>();
        for (int n : nums) {
            if (n % 2 == 0) {
                evens.add(n);
            }
        }
        Collections.sort(evens);
        return evens;
    }

    public static void main(String[] args) {
        List<Integer> input = List.of(9, 4, 7, 2, 8, 1, 6, 3);
        System.out.println(filterAndSortEvens(input));
        // Expected: [2, 4, 6, 8]
    }
}`,
          hints: [
            'Create a new ArrayList and iterate through the input list, adding only elements where n % 2 == 0.',
            'After filtering, use Collections.sort() to sort the result in ascending order.',
            'Remember to return the new list, not modify the input.',
          ],
        },
      },
      {
        id: 'linkedlist',
        title: 'LinkedList',
        difficulty: 'intermediate',
        tags: ['LinkedList', 'Deque', 'doubly-linked', 'queue'],
        cheatSheetSummary: 'Doubly-linked list with O(1) add/remove at ends. Implements both List and Deque. O(n) random access.',
        signature: 'LinkedList<E>()',
        sections: [
          {
            heading: 'LinkedList as List and Deque',
            content:
              'LinkedList implements both List and Deque interfaces. It provides O(1) insertion and removal at both ends, but O(n) random access. Use it when you frequently add/remove at the beginning or need both queue and stack behavior. For most other cases, ArrayList is faster.',
            code: `import java.util.LinkedList;
import java.util.Deque;
import java.util.Queue;

public class LinkedListDemo {
    public static void main(String[] args) {
        // As a List
        LinkedList<String> list = new LinkedList<>();
        list.add("B");
        list.addFirst("A");    // O(1) at front
        list.addLast("C");     // O(1) at end
        System.out.println("List: " + list);
        System.out.println("First: " + list.getFirst());
        System.out.println("Last: " + list.getLast());

        // As a Queue (FIFO)
        Queue<String> queue = new LinkedList<>();
        queue.offer("first");
        queue.offer("second");
        queue.offer("third");
        System.out.println("\\nQueue peek: " + queue.peek());
        System.out.println("Queue poll: " + queue.poll());
        System.out.println("Queue after poll: " + queue);

        // As a Stack (LIFO)
        Deque<String> stack = new LinkedList<>();
        stack.push("bottom");
        stack.push("middle");
        stack.push("top");
        System.out.println("\\nStack peek: " + stack.peek());
        System.out.println("Stack pop: " + stack.pop());
        System.out.println("Stack after pop: " + stack);

        // Remove from both ends
        LinkedList<Integer> deque = new LinkedList<>();
        for (int i = 1; i <= 5; i++) deque.add(i);
        System.out.println("\\nDeque: " + deque);
        deque.removeFirst();
        deque.removeLast();
        System.out.println("After removing ends: " + deque);
    }
}`,
            output: `List: [A, B, C]
First: A
Last: C

Queue peek: first
Queue poll: first
Queue after poll: [second, third]

Stack peek: top
Stack pop: top
Stack after pop: [middle, bottom]

Deque: [1, 2, 3, 4, 5]
After removing ends: [2, 3, 4]`,
            tip: 'Prefer ArrayDeque over LinkedList for queue and stack usage. ArrayDeque is faster due to better cache locality and lower memory overhead.',
            analogy: 'Think of it like a chain of paper clips: each clip (node) is linked to the next and previous clip. Adding or removing clips at either end is instant, but finding the 50th clip means counting from one end -- you cannot jump directly to a position.',
            diagram: {
              kind: 'custom',
              type: 'linked-list',
              data: { nodes: ['A', 'B', 'C'], doubly: true },
              caption: 'A doubly-linked list: each node points to both its predecessor and successor, enabling O(1) insertion/removal at both ends.',
            },
          },
        ],
        quiz: [
          {
            question: 'What is the time complexity of accessing an element by index in a LinkedList?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
            correctIndex: 2,
            explanation: 'LinkedList requires traversal from one end to reach an element at a given index, making random access O(n). Unlike ArrayList, it does not support direct index-based access.',
          },
          {
            question: 'Which interfaces does Java LinkedList implement?',
            options: [
              'Only List',
              'List and Deque',
              'List and Set',
              'Deque and Map',
            ],
            correctIndex: 1,
            explanation: 'Java LinkedList implements both the List interface (indexed access) and the Deque interface (double-ended queue operations like addFirst, addLast, push, pop).',
          },
          {
            question: 'When should you prefer LinkedList over ArrayList?',
            options: [
              'When you need fast random access by index',
              'When you frequently add or remove elements at the beginning of the list',
              'When you need to sort the list often',
              'When memory efficiency is critical',
            ],
            correctIndex: 1,
            explanation: 'LinkedList provides O(1) insertion and removal at both ends, making it better than ArrayList (which is O(n) for head insertion) when you frequently modify the front of the list.',
          },
        ],
        challenge: {
          prompt: 'Implement a simple browser history using LinkedList as a Deque. Support visiting new pages (push), going back (pop), and peeking at the current page.',
          starterCode: `import java.util.Deque;
import java.util.LinkedList;

public class Challenge {
    private Deque<String> history = new LinkedList<>();

    public void visit(String url) {
        // TODO: Add the url to the history
    }

    public String back() {
        // TODO: Go back and return the previous page, or "empty" if no history
    }

    public String current() {
        // TODO: Return the current page, or "empty" if no history
    }

    public static void main(String[] args) {
        Challenge browser = new Challenge();
        browser.visit("google.com");
        browser.visit("github.com");
        browser.visit("stackoverflow.com");
        System.out.println(browser.current());  // stackoverflow.com
        System.out.println(browser.back());     // stackoverflow.com (removed)
        System.out.println(browser.current());  // github.com
    }
}`,
          solutionCode: `import java.util.Deque;
import java.util.LinkedList;

public class Challenge {
    private Deque<String> history = new LinkedList<>();

    public void visit(String url) {
        history.push(url);
    }

    public String back() {
        if (history.isEmpty()) return "empty";
        return history.pop();
    }

    public String current() {
        if (history.isEmpty()) return "empty";
        return history.peek();
    }

    public static void main(String[] args) {
        Challenge browser = new Challenge();
        browser.visit("google.com");
        browser.visit("github.com");
        browser.visit("stackoverflow.com");
        System.out.println(browser.current());  // stackoverflow.com
        System.out.println(browser.back());     // stackoverflow.com (removed)
        System.out.println(browser.current());  // github.com
    }
}`,
          hints: [
            'Use push() to add pages to the top of the stack (most recent page).',
            'Use pop() to remove and return the most recent page, and peek() to view it without removing.',
            'Check isEmpty() before popping or peeking to handle edge cases.',
          ],
        },
      },
      {
        id: 'hashmap',
        title: 'HashMap',
        difficulty: 'beginner',
        tags: ['HashMap', 'Map', 'key-value', 'hashing'],
        cheatSheetSummary: 'O(1) average get/put/containsKey. Keys must implement hashCode() and equals(). Allows one null key.',
        signature: 'HashMap<K, V>()',
        sections: [
          {
            heading: 'HashMap Basics',
            content:
              'HashMap stores key-value pairs with O(1) average time for get, put, and containsKey operations. Keys must properly implement hashCode() and equals(). HashMap allows one null key and multiple null values. It does not maintain insertion order.',
            code: `import java.util.HashMap;
import java.util.Map;

public class HashMapDemo {
    public static void main(String[] args) {
        Map<String, Integer> ages = new HashMap<>();

        // Adding entries
        ages.put("Alice", 30);
        ages.put("Bob", 25);
        ages.put("Charlie", 35);
        System.out.println("Map: " + ages);

        // Accessing
        System.out.println("Alice: " + ages.get("Alice"));
        System.out.println("Unknown: " + ages.get("Unknown"));   // null
        System.out.println("getOrDefault: " + ages.getOrDefault("Unknown", -1));

        // Checking
        System.out.println("containsKey: " + ages.containsKey("Bob"));
        System.out.println("containsValue: " + ages.containsValue(25));
        System.out.println("size: " + ages.size());

        // Updating
        ages.put("Alice", 31);   // overwrite
        ages.putIfAbsent("Dave", 28);   // only if key is missing
        System.out.println("Updated: " + ages);

        // Removing
        ages.remove("Charlie");
        System.out.println("After remove: " + ages);

        // Iterating
        System.out.println("\\nEntries:");
        for (Map.Entry<String, Integer> entry : ages.entrySet()) {
            System.out.println("  " + entry.getKey() + " -> " + entry.getValue());
        }
    }
}`,
            output: `Map: {Bob=25, Alice=30, Charlie=35}
Alice: 30
Unknown: null
getOrDefault: -1
containsKey: true
containsValue: true
size: 3
Updated: {Bob=25, Alice=31, Dave=28, Charlie=35}
After remove: {Bob=25, Alice=31, Dave=28}

Entries:
  Bob -> 25
  Alice -> 31
  Dave -> 28`,
            analogy: 'Think of it like a coat check room: you hand over your coat (value) and get a numbered ticket (key). When you come back with the ticket, they find your coat instantly -- no need to search through every coat on the rack. The ticket number (hash code) tells them exactly which hook to check.',
            codeHighlightLines: [6, 9, 10, 11, 15, 17],
          },
          {
            heading: 'Advanced HashMap Operations',
            content:
              'Java 8 added powerful methods to Map: merge(), compute(), computeIfAbsent(), and forEach(). These simplify common patterns like counting frequencies, building multi-maps, and conditional updates.',
            code: `import java.util.*;

public class HashMapAdvanced {
    public static void main(String[] args) {
        // Frequency counting
        String text = "the cat sat on the mat the cat";
        Map<String, Integer> freq = new HashMap<>();
        for (String word : text.split(" ")) {
            freq.merge(word, 1, Integer::sum);
        }
        System.out.println("Frequencies: " + freq);

        // computeIfAbsent: multi-map pattern
        Map<String, List<String>> groups = new HashMap<>();
        String[] names = {"Alice", "Bob", "Anna", "Brian", "Charlie", "Carol"};
        for (String name : names) {
            String key = String.valueOf(name.charAt(0));
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(name);
        }
        System.out.println("\\nGrouped: " + groups);

        // replaceAll: modify all values
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 80);
        scores.put("Bob", 90);
        scores.replaceAll((name, score) -> score + 5);  // add 5 to all
        System.out.println("\\nBoosted: " + scores);

        // Map.of for small immutable maps (Java 9+)
        Map<String, Integer> constants = Map.of(
            "PI", 3,
            "E", 2,
            "PHI", 1
        );
        System.out.println("Constants: " + constants);

        // forEach
        System.out.println("\\nForEach:");
        freq.forEach((word, count) ->
            System.out.println("  " + word + ": " + count));
    }
}`,
            output: `Frequencies: {mat=1, cat=2, the=3, sat=1, on=1}

Grouped: {A=[Alice, Anna], B=[Bob, Brian], C=[Charlie, Carol]}

Boosted: {Alice=85, Bob=95}
Constants: {E=2, PI=3, PHI=1}

ForEach:
  mat: 1
  cat: 2
  the: 3
  sat: 1
  on: 1`,
            tip: 'Use merge(key, 1, Integer::sum) for counting. It is cleaner than getOrDefault + put and handles the missing-key case automatically.',
            codeHighlightLines: [9, 18, 26],
          },
        ],
        quiz: [
          {
            question: 'What does HashMap.get() return when the key is not present in the map?',
            options: ['Throws NoSuchElementException', 'Returns 0', 'Returns null', 'Returns an empty Optional'],
            correctIndex: 2,
            explanation: 'HashMap.get() returns null when the key is not found. Use getOrDefault() to provide a fallback value, or containsKey() to distinguish a missing key from a null value.',
          },
          {
            question: 'Which method is best for counting word frequencies in a HashMap?',
            options: [
              'put(key, get(key) + 1)',
              'merge(key, 1, Integer::sum)',
              'computeIfPresent(key, (k, v) -> v)',
              'replace(key, 1)',
            ],
            correctIndex: 1,
            explanation: 'merge(key, 1, Integer::sum) handles both cases: if the key is absent it inserts the value 1, and if present it adds 1 to the existing value using Integer::sum.',
          },
          {
            question: 'What happens when you put a duplicate key into a HashMap?',
            options: [
              'It throws an exception',
              'The old value is silently replaced with the new value',
              'The duplicate is ignored',
              'Both values are stored in a list',
            ],
            correctIndex: 1,
            explanation: 'HashMap.put() replaces the previous value associated with the key and returns the old value (or null if there was none). Use putIfAbsent() to only insert if the key is missing.',
          },
          {
            question: 'What is the purpose of computeIfAbsent() in HashMap?',
            options: [
              'It removes the key if the value is null',
              'It computes and inserts a value only when the key is not already present',
              'It always recomputes the value for the key',
              'It checks if the map contains the key',
            ],
            correctIndex: 1,
            explanation: 'computeIfAbsent(key, mappingFunction) only invokes the mapping function and inserts the result if the key is not already present (or is mapped to null). This is perfect for building multi-maps.',
          },
        ],
        challenge: {
          prompt: 'Write a method that takes an array of strings and returns a HashMap where each key is a string and the value is the number of times it appears in the array.',
          starterCode: `import java.util.HashMap;
import java.util.Map;

public class Challenge {
    public static Map<String, Integer> countFrequencies(String[] words) {
        // TODO: Count the frequency of each word
    }

    public static void main(String[] args) {
        String[] words = {"apple", "banana", "apple", "cherry", "banana", "apple"};
        System.out.println(countFrequencies(words));
        // Expected: {apple=3, banana=2, cherry=1}
    }
}`,
          solutionCode: `import java.util.HashMap;
import java.util.Map;

public class Challenge {
    public static Map<String, Integer> countFrequencies(String[] words) {
        Map<String, Integer> freq = new HashMap<>();
        for (String word : words) {
            freq.merge(word, 1, Integer::sum);
        }
        return freq;
    }

    public static void main(String[] args) {
        String[] words = {"apple", "banana", "apple", "cherry", "banana", "apple"};
        System.out.println(countFrequencies(words));
        // Expected: {apple=3, banana=2, cherry=1}
    }
}`,
          hints: [
            'Use a HashMap<String, Integer> to store each word and its count.',
            'The merge() method with Integer::sum is the cleanest approach for counting.',
            'Alternatively, use getOrDefault(word, 0) + 1 with put() to increment the count.',
          ],
        },
      },
      {
        id: 'treemap',
        title: 'TreeMap',
        difficulty: 'intermediate',
        tags: ['TreeMap', 'SortedMap', 'NavigableMap', 'red-black-tree'],
        cheatSheetSummary: 'Sorted map with O(log n) operations. Keys are sorted by natural order or custom Comparator. Supports range queries.',
        signature: 'TreeMap<K, V>()',
        sections: [
          {
            heading: 'TreeMap: Sorted Key-Value Pairs',
            content:
              'TreeMap is a sorted map implementation backed by a red-black tree. All keys are kept in sorted order (natural ordering or custom Comparator). It provides O(log n) for get, put, and remove, plus navigation methods like floorKey, ceilingKey, firstKey, and lastKey. Use TreeMap when you need sorted keys or range queries.',
            code: `import java.util.TreeMap;
import java.util.NavigableMap;

public class TreeMapDemo {
    public static void main(String[] args) {
        TreeMap<Integer, String> map = new TreeMap<>();
        map.put(5, "five");
        map.put(1, "one");
        map.put(8, "eight");
        map.put(3, "three");
        map.put(10, "ten");

        // Keys are automatically sorted
        System.out.println("TreeMap: " + map);

        // Navigation methods
        System.out.println("firstKey: " + map.firstKey());     // 1
        System.out.println("lastKey: " + map.lastKey());       // 10
        System.out.println("floorKey(4): " + map.floorKey(4));     // 3 (<=4)
        System.out.println("ceilingKey(4): " + map.ceilingKey(4)); // 5 (>=4)
        System.out.println("lowerKey(5): " + map.lowerKey(5));     // 3 (<5)
        System.out.println("higherKey(5): " + map.higherKey(5));   // 8 (>5)

        // Range views
        NavigableMap<Integer, String> sub = map.subMap(3, true, 8, true);
        System.out.println("subMap[3..8]: " + sub);

        NavigableMap<Integer, String> head = map.headMap(5, false);
        System.out.println("headMap(<5): " + head);

        NavigableMap<Integer, String> tail = map.tailMap(5, true);
        System.out.println("tailMap(>=5): " + tail);

        // Descending order
        System.out.println("Descending: " + map.descendingMap());

        // Poll (remove) first and last
        System.out.println("pollFirst: " + map.pollFirstEntry());
        System.out.println("pollLast: " + map.pollLastEntry());
        System.out.println("After polls: " + map);
    }
}`,
            output: `TreeMap: {1=one, 3=three, 5=five, 8=eight, 10=ten}
firstKey: 1
lastKey: 10
floorKey(4): 3
ceilingKey(4): 5
lowerKey(5): 3
higherKey(5): 8
subMap[3..8]: {3=three, 5=five, 8=eight}
headMap(<5): {1=one, 3=three}
tailMap(>=5): {5=five, 8=eight, 10=ten}
Descending: {10=ten, 8=eight, 5=five, 3=three, 1=one}
pollFirst: 1=one
pollLast: 10=ten
After polls: {3=three, 5=five, 8=eight}`,
            tip: 'TreeMap navigation methods (floor, ceiling, lower, higher) are equivalent to C++ lower_bound and upper_bound. They are invaluable for range queries.',
            analogy: 'Think of it like a dictionary (the book kind): entries are always in alphabetical order, so you can quickly flip to "M" and find everything from "Ma" to "Mz." The floor/ceiling methods are like finding the nearest word before or after a given one.',
          },
        ],
        quiz: [
          {
            question: 'What data structure backs a TreeMap internally?',
            options: ['Hash table', 'Array', 'Red-black tree', 'B-tree'],
            correctIndex: 2,
            explanation: 'TreeMap is backed by a red-black tree, a self-balancing binary search tree that guarantees O(log n) time for get, put, and remove operations while maintaining sorted order.',
          },
          {
            question: 'What does floorKey(4) return for a TreeMap containing keys {1, 3, 5, 8, 10}?',
            options: ['5', '3', '4', 'null'],
            correctIndex: 1,
            explanation: 'floorKey(4) returns the greatest key less than or equal to 4. Since 4 is not in the map, the greatest key <= 4 is 3.',
          },
          {
            question: 'What is the time complexity of TreeMap.get()?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
            correctIndex: 1,
            explanation: 'TreeMap operations (get, put, remove) are O(log n) because they traverse a balanced binary search tree from root to the target node.',
          },
        ],
        challenge: {
          prompt: 'Write a method that uses a TreeMap to find the closest key less than or equal to a target value, and the closest key greater than or equal to a target value.',
          starterCode: `import java.util.TreeMap;

public class Challenge {
    public static void findClosestKeys(TreeMap<Integer, String> map, int target) {
        // TODO: Print the floor key (<=target) and ceiling key (>=target)
        // Print "No floor key" or "No ceiling key" if not found
    }

    public static void main(String[] args) {
        TreeMap<Integer, String> map = new TreeMap<>();
        map.put(10, "ten");
        map.put(20, "twenty");
        map.put(30, "thirty");
        map.put(40, "forty");

        findClosestKeys(map, 25);
        // Expected: Floor: 20, Ceiling: 30
        findClosestKeys(map, 5);
        // Expected: No floor key, Ceiling: 10
    }
}`,
          solutionCode: `import java.util.TreeMap;

public class Challenge {
    public static void findClosestKeys(TreeMap<Integer, String> map, int target) {
        Integer floor = map.floorKey(target);
        Integer ceiling = map.ceilingKey(target);
        String floorStr = (floor != null) ? "Floor: " + floor : "No floor key";
        String ceilingStr = (ceiling != null) ? "Ceiling: " + ceiling : "No ceiling key";
        System.out.println(floorStr + ", " + ceilingStr);
    }

    public static void main(String[] args) {
        TreeMap<Integer, String> map = new TreeMap<>();
        map.put(10, "ten");
        map.put(20, "twenty");
        map.put(30, "thirty");
        map.put(40, "forty");

        findClosestKeys(map, 25);
        // Expected: Floor: 20, Ceiling: 30
        findClosestKeys(map, 5);
        // Expected: No floor key, Ceiling: 10
    }
}`,
          hints: [
            'Use TreeMap.floorKey(target) to find the greatest key <= target.',
            'Use TreeMap.ceilingKey(target) to find the smallest key >= target.',
            'Both methods return null if no such key exists, so check for null before printing.',
          ],
        },
      },
      {
        id: 'hashset',
        title: 'HashSet',
        difficulty: 'beginner',
        tags: ['HashSet', 'Set', 'unique', 'hashing'],
        cheatSheetSummary: 'Unordered collection of unique elements. O(1) average add/remove/contains. Uses hashCode() and equals().',
        signature: 'HashSet<E>()',
        sections: [
          {
            heading: 'HashSet Basics and Set Operations',
            content:
              'HashSet stores unique elements with O(1) average time for add, remove, and contains. It does not maintain insertion order. HashSet is backed by a HashMap internally. Use it when you need fast membership testing and uniqueness.',
            code: `import java.util.HashSet;
import java.util.Set;
import java.util.Arrays;

public class HashSetDemo {
    public static void main(String[] args) {
        // Creating a HashSet
        Set<String> fruits = new HashSet<>();
        fruits.add("apple");
        fruits.add("banana");
        fruits.add("cherry");
        fruits.add("apple");    // duplicate ignored
        System.out.println("Fruits: " + fruits);
        System.out.println("Size: " + fruits.size());

        // Membership testing
        System.out.println("has apple: " + fruits.contains("apple"));
        System.out.println("has grape: " + fruits.contains("grape"));

        // Set from collection (removes duplicates)
        int[] arr = {1, 2, 3, 2, 1, 4, 3, 5};
        Set<Integer> unique = new HashSet<>();
        for (int n : arr) unique.add(n);
        System.out.println("Unique: " + unique);

        // Immutable set (Java 9+)
        Set<String> fixed = Set.of("X", "Y", "Z");
        System.out.println("Fixed: " + fixed);

        // Mathematical set operations
        Set<Integer> a = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
        Set<Integer> b = new HashSet<>(Arrays.asList(4, 5, 6, 7, 8));

        // Union
        Set<Integer> union = new HashSet<>(a);
        union.addAll(b);
        System.out.println("\\nA union B: " + union);

        // Intersection
        Set<Integer> intersection = new HashSet<>(a);
        intersection.retainAll(b);
        System.out.println("A intersect B: " + intersection);

        // Difference
        Set<Integer> difference = new HashSet<>(a);
        difference.removeAll(b);
        System.out.println("A - B: " + difference);
    }
}`,
            output: `Fruits: [banana, cherry, apple]
Size: 3
has apple: true
has grape: false
Unique: [1, 2, 3, 4, 5]
Fixed: [Z, Y, X]

A union B: [1, 2, 3, 4, 5, 6, 7, 8]
A intersect B: [4, 5]
A - B: [1, 2, 3]`,
            warning: 'If you use mutable objects as set elements and modify their fields after adding, the hashCode changes and the set cannot find them. Use immutable objects as set elements.',
            analogy: 'Think of it like a guest list at a party: each name can appear only once (uniqueness). Checking if someone is on the list is instant (O(1) contains), and duplicates are silently ignored when you try to add them again.',
            codeHighlightLines: [12, 17, 36, 41, 45],
          },
        ],
        quiz: [
          {
            question: 'What is the return value of HashSet.add() when the element already exists?',
            options: ['true', 'false', 'null', 'It throws an exception'],
            correctIndex: 1,
            explanation: 'HashSet.add() returns false if the element is already present in the set. The set is not modified and no exception is thrown.',
          },
          {
            question: 'Which methods must a class properly implement for its objects to work correctly in a HashSet?',
            options: [
              'toString() and clone()',
              'hashCode() and equals()',
              'compareTo() and equals()',
              'hashCode() and compareTo()',
            ],
            correctIndex: 1,
            explanation: 'HashSet uses hashCode() to determine the bucket and equals() to check for duplicates. Both must be consistent: if two objects are equal, they must have the same hash code.',
          },
          {
            question: 'How do you compute the intersection of two HashSets in Java?',
            options: [
              'a.addAll(b)',
              'a.retainAll(b)',
              'a.removeAll(b)',
              'a.containsAll(b)',
            ],
            correctIndex: 1,
            explanation: 'retainAll(b) modifies set a to keep only elements that are also in b, effectively computing the intersection. addAll computes union, removeAll computes difference.',
          },
        ],
        challenge: {
          prompt: 'Write a method that takes two integer arrays and returns a sorted array of their common elements (intersection) using HashSet.',
          starterCode: `import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class Challenge {
    public static int[] intersection(int[] a, int[] b) {
        // TODO: Return sorted array of elements common to both arrays
    }

    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4, 5};
        int[] b = {4, 5, 6, 7, 8};
        System.out.println(Arrays.toString(intersection(a, b)));
        // Expected: [4, 5]
    }
}`,
          solutionCode: `import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

public class Challenge {
    public static int[] intersection(int[] a, int[] b) {
        Set<Integer> setA = new HashSet<>();
        for (int n : a) setA.add(n);

        Set<Integer> result = new TreeSet<>();
        for (int n : b) {
            if (setA.contains(n)) {
                result.add(n);
            }
        }
        return result.stream().mapToInt(Integer::intValue).toArray();
    }

    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4, 5};
        int[] b = {4, 5, 6, 7, 8};
        System.out.println(Arrays.toString(intersection(a, b)));
        // Expected: [4, 5]
    }
}`,
          hints: [
            'Add all elements of the first array into a HashSet for O(1) lookups.',
            'Iterate through the second array and check if each element exists in the set.',
            'Use a TreeSet for the result to get automatic sorting, then convert to int[].',
          ],
        },
      },
      {
        id: 'treeset',
        title: 'TreeSet',
        difficulty: 'intermediate',
        tags: ['TreeSet', 'SortedSet', 'NavigableSet', 'sorted'],
        cheatSheetSummary: 'Sorted set with O(log n) operations. Elements in natural order. Supports floor(), ceiling(), subSet().',
        signature: 'TreeSet<E>()',
        sections: [
          {
            heading: 'TreeSet: Sorted Unique Elements',
            content:
              'TreeSet maintains elements in sorted order with O(log n) add, remove, and contains. Like TreeMap, it supports navigation methods and range views. Elements must be Comparable or a Comparator must be provided. TreeSet is backed by a TreeMap.',
            code: `import java.util.TreeSet;

public class TreeSetDemo {
    public static void main(String[] args) {
        TreeSet<Integer> set = new TreeSet<>();
        set.add(5); set.add(1); set.add(8); set.add(3); set.add(10);

        // Automatically sorted
        System.out.println("Sorted: " + set);

        // Navigation
        System.out.println("first: " + set.first());         // 1
        System.out.println("last: " + set.last());           // 10
        System.out.println("floor(4): " + set.floor(4));     // 3
        System.out.println("ceiling(4): " + set.ceiling(4)); // 5
        System.out.println("lower(5): " + set.lower(5));     // 3
        System.out.println("higher(5): " + set.higher(5));   // 8

        // Range views
        System.out.println("subSet(3,8): " + set.subSet(3, true, 8, true));
        System.out.println("headSet(5): " + set.headSet(5, false));
        System.out.println("tailSet(5): " + set.tailSet(5, true));

        // Descending
        System.out.println("Descending: " + set.descendingSet());

        // Custom Comparator: reverse order
        TreeSet<String> words = new TreeSet<>((a, b) -> b.compareTo(a));
        words.add("banana");
        words.add("apple");
        words.add("cherry");
        System.out.println("\\nReverse sorted: " + words);

        // Poll first/last (remove and return)
        System.out.println("pollFirst: " + set.pollFirst());
        System.out.println("pollLast: " + set.pollLast());
        System.out.println("After polls: " + set);
    }
}`,
            output: `Sorted: [1, 3, 5, 8, 10]
first: 1
last: 10
floor(4): 3
ceiling(4): 5
lower(5): 3
higher(5): 8
subSet(3,8): [3, 5, 8]
headSet(5): [1, 3]
tailSet(5): [5, 8, 10]
Descending: [10, 8, 5, 3, 1]

Reverse sorted: [cherry, banana, apple]
pollFirst: 1
pollLast: 10
After polls: [3, 5, 8]`,
            codeHighlightLines: [14, 15, 19, 20, 21, 27],
          },
        ],
        quiz: [
          {
            question: 'What is the time complexity of TreeSet.contains()?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
            correctIndex: 1,
            explanation: 'TreeSet is backed by a red-black tree (via TreeMap), so contains() traverses the tree in O(log n) time. This is slower than HashSet O(1) but maintains sorted order.',
          },
          {
            question: 'What does TreeSet.floor(4) return for a set containing {1, 3, 5, 8}?',
            options: ['5', '3', '4', 'null'],
            correctIndex: 1,
            explanation: 'floor(4) returns the greatest element less than or equal to 4. Since 4 is not in the set, the greatest element <= 4 is 3.',
          },
          {
            question: 'What happens if you add objects to a TreeSet whose class does not implement Comparable and no Comparator is provided?',
            options: [
              'Elements are stored in insertion order',
              'ClassCastException is thrown at runtime',
              'Elements are stored in hash order',
              'Compilation error',
            ],
            correctIndex: 1,
            explanation: 'TreeSet requires elements to be comparable. If the class does not implement Comparable and no Comparator is given to the constructor, a ClassCastException is thrown when adding the first element that needs comparison.',
          },
        ],
        challenge: {
          prompt: 'Write a method that uses a TreeSet to find all elements in a sorted set that fall within a given range [low, high] inclusive.',
          starterCode: `import java.util.TreeSet;
import java.util.Set;
import java.util.SortedSet;

public class Challenge {
    public static Set<Integer> range(TreeSet<Integer> set, int low, int high) {
        // TODO: Return all elements in [low, high] inclusive
    }

    public static void main(String[] args) {
        TreeSet<Integer> set = new TreeSet<>();
        set.add(2); set.add(5); set.add(8); set.add(12); set.add(15); set.add(20);

        System.out.println(range(set, 5, 15));
        // Expected: [5, 8, 12, 15]
        System.out.println(range(set, 6, 14));
        // Expected: [8, 12]
    }
}`,
          solutionCode: `import java.util.TreeSet;
import java.util.Set;
import java.util.SortedSet;

public class Challenge {
    public static Set<Integer> range(TreeSet<Integer> set, int low, int high) {
        return set.subSet(low, true, high, true);
    }

    public static void main(String[] args) {
        TreeSet<Integer> set = new TreeSet<>();
        set.add(2); set.add(5); set.add(8); set.add(12); set.add(15); set.add(20);

        System.out.println(range(set, 5, 15));
        // Expected: [5, 8, 12, 15]
        System.out.println(range(set, 6, 14));
        // Expected: [8, 12]
    }
}`,
          hints: [
            'TreeSet has a subSet() method that takes lower and upper bounds with inclusive flags.',
            'Use subSet(low, true, high, true) for an inclusive range on both ends.',
            'The returned view is backed by the original set -- changes to one reflect in the other.',
          ],
        },
      },
      {
        id: 'queue-deque',
        title: 'Queue & Deque',
        difficulty: 'intermediate',
        tags: ['Queue', 'Deque', 'ArrayDeque', 'FIFO', 'LIFO'],
        cheatSheetSummary: 'ArrayDeque: preferred stack/queue implementation. offer()/poll() for queue. push()/pop() for stack. Avoids LinkedList overhead.',
        signature: 'ArrayDeque<E>()',
        sections: [
          {
            heading: 'ArrayDeque as Queue and Stack',
            content:
              'ArrayDeque is the recommended implementation for both Queue (FIFO) and Stack (LIFO) in Java. It is faster than LinkedList due to better cache locality and lower memory overhead. Never use the legacy Stack class. For Queue: use offer() and poll(). For Stack: use push() and pop().',
            code: `import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Queue;

public class QueueDequeDemo {
    public static void main(String[] args) {
        // Queue (FIFO): First In, First Out
        Queue<String> queue = new ArrayDeque<>();
        queue.offer("first");
        queue.offer("second");
        queue.offer("third");
        System.out.println("Queue: " + queue);
        System.out.println("peek: " + queue.peek());     // view front
        System.out.println("poll: " + queue.poll());      // remove front
        System.out.println("after poll: " + queue);

        // Stack (LIFO): Last In, First Out
        Deque<String> stack = new ArrayDeque<>();
        stack.push("bottom");
        stack.push("middle");
        stack.push("top");
        System.out.println("\\nStack: " + stack);
        System.out.println("peek: " + stack.peek());     // view top
        System.out.println("pop: " + stack.pop());       // remove top
        System.out.println("after pop: " + stack);

        // Deque: double-ended queue
        Deque<Integer> deque = new ArrayDeque<>();
        deque.offerFirst(2);
        deque.offerFirst(1);
        deque.offerLast(3);
        deque.offerLast(4);
        System.out.println("\\nDeque: " + deque);
        System.out.println("peekFirst: " + deque.peekFirst());
        System.out.println("peekLast: " + deque.peekLast());
        System.out.println("pollFirst: " + deque.pollFirst());
        System.out.println("pollLast: " + deque.pollLast());
        System.out.println("after polls: " + deque);

        // BFS pattern with queue
        System.out.println("\\nBFS traversal:");
        Queue<Integer> bfs = new ArrayDeque<>();
        bfs.offer(1);
        while (!bfs.isEmpty()) {
            int node = bfs.poll();
            System.out.print(node + " ");
            if (node * 2 <= 7) { bfs.offer(node * 2); bfs.offer(node * 2 + 1); }
        }
        System.out.println();
    }
}`,
            output: `Queue: [first, second, third]
peek: first
poll: first
after poll: [second, third]

Stack: [top, middle, bottom]
peek: top
pop: top
after pop: [middle, bottom]

Deque: [1, 2, 3, 4]
peekFirst: 1
peekLast: 4
pollFirst: 1
pollLast: 4
after polls: [2, 3]

BFS traversal:
1 2 3 4 5 6 7`,
            warning: 'Never use java.util.Stack. It extends Vector (legacy, synchronized) and is slower. Always use ArrayDeque for stack operations.',
            analogy: 'Think of it like a line at a cafeteria (Queue/FIFO) vs a stack of plates (Stack/LIFO): in the cafeteria line, the first person who arrives gets served first. With plates, you always take the one on top -- the last plate placed is the first one removed.',
          },
        ],
        quiz: [
          {
            question: 'Which class is the recommended implementation for a stack in modern Java?',
            options: ['java.util.Stack', 'LinkedList', 'ArrayDeque', 'Vector'],
            correctIndex: 2,
            explanation: 'ArrayDeque is the recommended stack and queue implementation. The legacy Stack class extends Vector (synchronized, slow) and should be avoided.',
          },
          {
            question: 'What does queue.poll() return when the queue is empty?',
            options: ['Throws NoSuchElementException', 'Returns null', 'Returns 0', 'Returns an empty string'],
            correctIndex: 1,
            explanation: 'poll() returns null if the queue is empty, while remove() throws NoSuchElementException. Similarly, peek() returns null vs element() which throws an exception.',
          },
          {
            question: 'What is the difference between offer() and add() in a Queue?',
            options: [
              'offer() is faster',
              'add() throws an exception on failure, offer() returns false',
              'They are completely identical',
              'offer() adds to the front, add() adds to the back',
            ],
            correctIndex: 1,
            explanation: 'For capacity-bounded queues, add() throws IllegalStateException when full, while offer() returns false. For unbounded queues like ArrayDeque, they behave the same, but offer() is preferred for clarity.',
          },
        ],
        challenge: {
          prompt: 'Implement a simple task scheduler using ArrayDeque as a queue. Tasks are added to the back and processed from the front. Add a method to process the next N tasks.',
          starterCode: `import java.util.ArrayDeque;
import java.util.Queue;
import java.util.ArrayList;
import java.util.List;

public class Challenge {
    private Queue<String> tasks = new ArrayDeque<>();

    public void addTask(String task) {
        // TODO: Add task to the queue
    }

    public List<String> processNext(int n) {
        // TODO: Process (remove) up to n tasks from the front
        // Return the list of processed task names
    }

    public static void main(String[] args) {
        Challenge scheduler = new Challenge();
        scheduler.addTask("Email");
        scheduler.addTask("Code Review");
        scheduler.addTask("Deploy");
        scheduler.addTask("Meeting");

        System.out.println(scheduler.processNext(2));
        // Expected: [Email, Code Review]
        System.out.println(scheduler.processNext(5));
        // Expected: [Deploy, Meeting]
    }
}`,
          solutionCode: `import java.util.ArrayDeque;
import java.util.Queue;
import java.util.ArrayList;
import java.util.List;

public class Challenge {
    private Queue<String> tasks = new ArrayDeque<>();

    public void addTask(String task) {
        tasks.offer(task);
    }

    public List<String> processNext(int n) {
        List<String> processed = new ArrayList<>();
        for (int i = 0; i < n && !tasks.isEmpty(); i++) {
            processed.add(tasks.poll());
        }
        return processed;
    }

    public static void main(String[] args) {
        Challenge scheduler = new Challenge();
        scheduler.addTask("Email");
        scheduler.addTask("Code Review");
        scheduler.addTask("Deploy");
        scheduler.addTask("Meeting");

        System.out.println(scheduler.processNext(2));
        // Expected: [Email, Code Review]
        System.out.println(scheduler.processNext(5));
        // Expected: [Deploy, Meeting]
    }
}`,
          hints: [
            'Use offer() to enqueue tasks at the back of the queue.',
            'Use poll() in a loop to dequeue tasks, checking both the counter and isEmpty().',
            'The loop should stop when either n tasks have been processed or the queue is empty.',
          ],
        },
      },
      {
        id: 'priority-queue',
        title: 'PriorityQueue',
        difficulty: 'intermediate',
        tags: ['PriorityQueue', 'heap', 'min-heap', 'max-heap'],
        cheatSheetSummary: 'Min-heap by default (smallest first). O(log n) add/poll. Use Collections.reverseOrder() for max-heap.',
        signature: 'PriorityQueue<E>()',
        sections: [
          {
            heading: 'Min-Heap and Max-Heap',
            content:
              'PriorityQueue is a min-heap by default: poll() returns the smallest element. For a max-heap, use Collections.reverseOrder() or Comparator.reverseOrder(). Custom comparators define any priority ordering. Note that PriorityQueue is NOT sorted -- only the head (minimum/maximum) is guaranteed to be in the right position.',
            code: `import java.util.PriorityQueue;
import java.util.Collections;
import java.util.Comparator;

public class PriorityQueueDemo {
    public static void main(String[] args) {
        // Min-heap (default)
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.add(5); minHeap.add(1); minHeap.add(8); minHeap.add(3);
        System.out.print("Min-heap order: ");
        while (!minHeap.isEmpty()) {
            System.out.print(minHeap.poll() + " ");
        }
        System.out.println();

        // Max-heap
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        maxHeap.add(5); maxHeap.add(1); maxHeap.add(8); maxHeap.add(3);
        System.out.print("Max-heap order: ");
        while (!maxHeap.isEmpty()) {
            System.out.print(maxHeap.poll() + " ");
        }
        System.out.println();

        // Custom comparator: sort by string length
        PriorityQueue<String> byLength = new PriorityQueue<>(
            Comparator.comparingInt(String::length)
        );
        byLength.add("banana"); byLength.add("fig"); byLength.add("apple");
        System.out.print("By length: ");
        while (!byLength.isEmpty()) {
            System.out.print(byLength.poll() + " ");
        }
        System.out.println();

        // Priority queue with pairs (sort by value)
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
        pq.add(new int[]{1, 30});
        pq.add(new int[]{2, 10});
        pq.add(new int[]{3, 20});
        System.out.print("By second element: ");
        while (!pq.isEmpty()) {
            int[] pair = pq.poll();
            System.out.print("[" + pair[0] + "," + pair[1] + "] ");
        }
        System.out.println();
    }
}`,
            output: `Min-heap order: 1 3 5 8
Max-heap order: 8 5 3 1
By length: fig apple banana
By second element: [2,10] [3,20] [1,30]`,
            warning: 'Java PriorityQueue is a MIN-heap (smallest first). C++ priority_queue is a MAX-heap (largest first). This is a common source of confusion.',
            analogy: 'Think of it like an emergency room: patients are not treated in arrival order, but by severity. The PriorityQueue always gives you the most urgent (smallest/highest-priority) element first, regardless of when it was added.',
            codeHighlightLines: [8, 17, 26, 27, 37],
          },
        ],
        quiz: [
          {
            question: 'By default, Java PriorityQueue is a:',
            options: ['Max-heap (largest first)', 'Min-heap (smallest first)', 'FIFO queue', 'Sorted list'],
            correctIndex: 1,
            explanation: 'Java PriorityQueue is a min-heap by default -- poll() returns the smallest element. To create a max-heap, use Collections.reverseOrder() as the comparator.',
          },
          {
            question: 'What is the time complexity of PriorityQueue.add()?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
            correctIndex: 1,
            explanation: 'Adding an element to a PriorityQueue (binary heap) requires O(log n) time to maintain the heap property by sifting up.',
          },
          {
            question: 'Is the iterator of a PriorityQueue guaranteed to traverse elements in priority order?',
            options: [
              'Yes, always in sorted order',
              'No, only poll() guarantees priority order',
              'Yes, but only for min-heaps',
              'It depends on the comparator',
            ],
            correctIndex: 1,
            explanation: 'PriorityQueue iterator does NOT guarantee any particular order. Only poll() and peek() guarantee access to the minimum (or maximum) element. To drain in order, use a while loop with poll().',
          },
        ],
        challenge: {
          prompt: 'Write a method that finds the K largest elements in an array using a PriorityQueue (min-heap). Return them sorted in descending order.',
          starterCode: `import java.util.PriorityQueue;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Challenge {
    public static List<Integer> kLargest(int[] nums, int k) {
        // TODO: Use a min-heap of size k to find the k largest elements
        // Return them in descending order
    }

    public static void main(String[] args) {
        int[] nums = {3, 1, 5, 12, 2, 11, 7, 9};
        System.out.println(kLargest(nums, 3));
        // Expected: [12, 11, 9]
    }
}`,
          solutionCode: `import java.util.PriorityQueue;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Challenge {
    public static List<Integer> kLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int n : nums) {
            minHeap.add(n);
            if (minHeap.size() > k) {
                minHeap.poll(); // remove smallest
            }
        }
        List<Integer> result = new ArrayList<>();
        while (!minHeap.isEmpty()) {
            result.add(minHeap.poll());
        }
        Collections.reverse(result); // descending order
        return result;
    }

    public static void main(String[] args) {
        int[] nums = {3, 1, 5, 12, 2, 11, 7, 9};
        System.out.println(kLargest(nums, 3));
        // Expected: [12, 11, 9]
    }
}`,
          hints: [
            'Use a min-heap of size k. As you iterate, add each number and if the heap exceeds size k, poll the smallest.',
            'After processing all numbers, the heap contains the k largest elements.',
            'Drain the heap into a list (ascending order) then reverse it for descending order.',
          ],
        },
      },
      {
        id: 'collections-utility',
        title: 'Collections Utility',
        difficulty: 'intermediate',
        tags: ['Collections', 'sort', 'shuffle', 'unmodifiable', 'utility'],
        cheatSheetSummary: 'Collections class provides sort, shuffle, reverse, binarySearch, unmodifiableList, singleton, and frequency utilities.',
        signature: 'Collections.sort(list)',
        sections: [
          {
            heading: 'Collections Class Utilities',
            content:
              'The Collections class provides static utility methods for operating on collections. These include sorting, searching, shuffling, reversing, creating unmodifiable wrappers, and creating synchronized collections. Many of these methods accept Comparator parameters for custom ordering.',
            code: `import java.util.*;

public class CollectionsUtil {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(Arrays.asList(5, 3, 1, 4, 2));

        // Sorting and reversing
        Collections.sort(nums);
        System.out.println("Sorted: " + nums);
        Collections.reverse(nums);
        System.out.println("Reversed: " + nums);

        // Shuffle
        Collections.shuffle(nums);
        System.out.println("Shuffled: " + nums);

        // Min, max, frequency
        nums = Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6);
        System.out.println("\\nMin: " + Collections.min(nums));
        System.out.println("Max: " + Collections.max(nums));
        System.out.println("Freq of 1: " + Collections.frequency(nums, 1));

        // Binary search (list must be sorted first)
        List<Integer> sorted = new ArrayList<>(nums);
        Collections.sort(sorted);
        int idx = Collections.binarySearch(sorted, 5);
        System.out.println("Sorted: " + sorted);
        System.out.println("Index of 5: " + idx);

        // Unmodifiable wrappers
        List<String> modifiable = new ArrayList<>(List.of("a", "b", "c"));
        List<String> readOnly = Collections.unmodifiableList(modifiable);
        try {
            readOnly.add("d");
        } catch (UnsupportedOperationException e) {
            System.out.println("\\nCannot modify unmodifiable list");
        }

        // Singleton and empty collections
        List<String> single = Collections.singletonList("only");
        List<String> empty = Collections.emptyList();
        System.out.println("Singleton: " + single);
        System.out.println("Empty: " + empty);

        // Fill and nCopies
        List<Integer> filled = new ArrayList<>(Collections.nCopies(5, 42));
        System.out.println("nCopies: " + filled);
    }
}`,
            output: `Sorted: [1, 2, 3, 4, 5]
Reversed: [5, 4, 3, 2, 1]
Shuffled: [3, 5, 1, 2, 4]

Min: 1
Max: 9
Freq of 1: 2
Sorted: [1, 1, 2, 3, 4, 5, 6, 9]
Index of 5: 5

Cannot modify unmodifiable list
Singleton: [only]
Empty: []
nCopies: [42, 42, 42, 42, 42]`,
            codeHighlightLines: [8, 10, 14, 26, 32],
          },
        ],
        quiz: [
          {
            question: 'What does Collections.binarySearch() require before being called?',
            options: [
              'The list must be in reverse order',
              'The list must be sorted in ascending order',
              'The list must contain unique elements',
              'The list must be an ArrayList',
            ],
            correctIndex: 1,
            explanation: 'Collections.binarySearch() requires the list to be sorted in ascending natural order (or the order of the provided Comparator). If the list is unsorted, the result is undefined.',
          },
          {
            question: 'What does Collections.unmodifiableList() return?',
            options: [
              'A deep copy of the list',
              'A read-only view of the original list',
              'A new ArrayList with the same elements',
              'A synchronized list',
            ],
            correctIndex: 1,
            explanation: 'unmodifiableList() returns a read-only view backed by the original list. You cannot add, remove, or set elements through the view, but changes to the original list are still visible through it.',
          },
          {
            question: 'What does Collections.nCopies(5, "hello") return?',
            options: [
              'A mutable list with 5 copies of "hello"',
              'An immutable list with 5 references to the same "hello" object',
              'An array of 5 strings',
              'A set with one "hello" element',
            ],
            correctIndex: 1,
            explanation: 'nCopies() returns an immutable list containing n references to the same object. To get a mutable list, wrap it: new ArrayList<>(Collections.nCopies(5, "hello")).',
          },
        ],
        challenge: {
          prompt: 'Write a method that takes a list of integers, sorts it, uses binary search to check if a target exists, and returns the index (or -1 if not found).',
          starterCode: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Challenge {
    public static int sortAndSearch(List<Integer> nums, int target) {
        // TODO: Sort the list, then use Collections.binarySearch to find target
        // Return the index if found, or -1 if not found
    }

    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(8, 3, 5, 1, 9, 2, 7));
        System.out.println(sortAndSearch(nums, 5));  // index after sorting
        System.out.println(sortAndSearch(nums, 6));  // -1
    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Challenge {
    public static int sortAndSearch(List<Integer> nums, int target) {
        Collections.sort(nums);
        int idx = Collections.binarySearch(nums, target);
        return idx >= 0 ? idx : -1;
    }

    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(8, 3, 5, 1, 9, 2, 7));
        System.out.println(sortAndSearch(nums, 5));  // 3 (after sorting: [1,2,3,5,7,8,9])
        System.out.println(sortAndSearch(nums, 6));  // -1
    }
}`,
          hints: [
            'First sort the list using Collections.sort(), which sorts in-place.',
            'Then use Collections.binarySearch(list, target) to find the element.',
            'binarySearch returns a negative value if the element is not found -- convert any negative result to -1.',
          ],
        },
      },
      {
        id: 'comparable-comparator',
        title: 'Comparable & Comparator',
        difficulty: 'intermediate',
        tags: ['Comparable', 'Comparator', 'sorting', 'ordering'],
        cheatSheetSummary: 'Comparable: natural ordering (class implements compareTo). Comparator: external ordering (lambda or separate class).',
        signature: 'int compareTo(T other) / int compare(T a, T b)',
        sections: [
          {
            heading: 'Comparable for Natural Ordering',
            content:
              'A class implements Comparable<T> to define its natural ordering. The compareTo method returns a negative number if this < other, zero if equal, and positive if this > other. This enables the class to be used with Collections.sort(), TreeSet, and TreeMap without an explicit Comparator.',
            code: `import java.util.*;

public class ComparableDemo {
    static class Student implements Comparable<Student> {
        String name;
        double gpa;

        Student(String name, double gpa) {
            this.name = name;
            this.gpa = gpa;
        }

        // Natural ordering: by GPA descending (higher is "less")
        @Override
        public int compareTo(Student other) {
            return Double.compare(other.gpa, this.gpa);  // descending
        }

        @Override
        public String toString() {
            return name + " (" + gpa + ")";
        }
    }

    public static void main(String[] args) {
        List<Student> students = new ArrayList<>(List.of(
            new Student("Alice", 3.8),
            new Student("Bob", 3.5),
            new Student("Charlie", 3.9),
            new Student("Diana", 3.7)
        ));

        Collections.sort(students);  // uses compareTo
        System.out.println("By GPA (desc):");
        students.forEach(s -> System.out.println("  " + s));

        // Works with TreeSet too
        TreeSet<Student> tree = new TreeSet<>(students);
        System.out.println("\\nTreeSet: " + tree);
    }
}`,
            output: `By GPA (desc):
  Charlie (3.9)
  Alice (3.8)
  Diana (3.7)
  Bob (3.5)

TreeSet: [Charlie (3.9), Alice (3.8), Diana (3.7), Bob (3.5)]`,
            analogy: 'Think of it like defining how your class "naturally" lines up: implementing Comparable is like giving each object an intrinsic rank. Students know how to compare themselves by GPA, just like numbers know 3 is less than 5. Once defined, any sorting method can use that natural ordering.',
            codeHighlightLines: [4, 15, 16, 33],
          },
          {
            heading: 'Comparator for Custom Ordering',
            content:
              'Comparator provides external comparison without modifying the class. Java 8 added powerful factory methods: Comparator.comparing(), naturalOrder(), reverseOrder(), and thenComparing() for multi-key sorting. Lambda expressions make comparators concise.',
            code: `import java.util.*;

public class ComparatorDemo {
    record Employee(String name, String dept, double salary) {}

    public static void main(String[] args) {
        List<Employee> emps = new ArrayList<>(List.of(
            new Employee("Alice", "Engineering", 90000),
            new Employee("Bob", "Marketing", 70000),
            new Employee("Charlie", "Engineering", 85000),
            new Employee("Diana", "Marketing", 75000),
            new Employee("Eve", "Engineering", 95000)
        ));

        // Sort by salary (ascending)
        emps.sort(Comparator.comparingDouble(Employee::salary));
        System.out.println("By salary:");
        emps.forEach(e -> System.out.println("  " + e));

        // Sort by department, then by salary descending
        emps.sort(Comparator.comparing(Employee::dept)
                            .thenComparing(Comparator.comparingDouble(Employee::salary).reversed()));
        System.out.println("\\nBy dept, then salary desc:");
        emps.forEach(e -> System.out.println("  " + e));

        // Lambda comparator
        emps.sort((a, b) -> a.name().compareTo(b.name()));
        System.out.println("\\nBy name:");
        emps.forEach(e -> System.out.println("  " + e));

        // Null-safe comparator
        List<String> names = new ArrayList<>(Arrays.asList("Bob", null, "Alice", null, "Charlie"));
        names.sort(Comparator.nullsLast(Comparator.naturalOrder()));
        System.out.println("\\nNull-safe sort: " + names);
    }
}`,
            output: `By salary:
  Employee[name=Bob, dept=Marketing, salary=70000.0]
  Employee[name=Diana, dept=Marketing, salary=75000.0]
  Employee[name=Charlie, dept=Engineering, salary=85000.0]
  Employee[name=Alice, dept=Engineering, salary=90000.0]
  Employee[name=Eve, dept=Engineering, salary=95000.0]

By dept, then salary desc:
  Employee[name=Eve, dept=Engineering, salary=95000.0]
  Employee[name=Alice, dept=Engineering, salary=90000.0]
  Employee[name=Charlie, dept=Engineering, salary=85000.0]
  Employee[name=Diana, dept=Marketing, salary=75000.0]
  Employee[name=Bob, dept=Marketing, salary=70000.0]

By name:
  Employee[name=Alice, dept=Engineering, salary=90000.0]
  Employee[name=Bob, dept=Marketing, salary=70000.0]
  Employee[name=Charlie, dept=Engineering, salary=85000.0]
  Employee[name=Diana, dept=Marketing, salary=75000.0]
  Employee[name=Eve, dept=Engineering, salary=95000.0]

Null-safe sort: [Alice, Bob, Charlie, null, null]`,
            tip: 'Use Comparator.comparing() with method references for clean, readable sort code. Chain with thenComparing() for multi-key sorts.',
            codeHighlightLines: [16, 21, 22, 27, 33],
          },
        ],
        quiz: [
          {
            question: 'What is the key difference between Comparable and Comparator?',
            options: [
              'Comparable is faster than Comparator',
              'Comparable defines natural ordering inside the class; Comparator defines external ordering outside the class',
              'Comparator can only sort strings',
              'Comparable only works with primitive types',
            ],
            correctIndex: 1,
            explanation: 'Comparable is implemented by the class itself (natural ordering via compareTo). Comparator is a separate object that defines an external ordering (via compare), allowing multiple sort strategies without modifying the class.',
          },
          {
            question: 'What does compareTo() return when the current object is less than the argument?',
            options: ['A positive number', 'Zero', 'A negative number', 'It depends on the type'],
            correctIndex: 2,
            explanation: 'compareTo() returns a negative integer when this < other, zero when this == other, and a positive integer when this > other. This contract is used by sort algorithms and sorted collections.',
          },
          {
            question: 'How do you sort a list of Employee objects by department, then by salary descending?',
            options: [
              'Comparator.comparing(Employee::dept).thenComparing(Employee::salary)',
              'Comparator.comparing(Employee::dept).thenComparing(Comparator.comparingDouble(Employee::salary).reversed())',
              'Collections.sort(list, Employee::compareTo)',
              'Comparator.reverseOrder()',
            ],
            correctIndex: 1,
            explanation: 'Chain Comparator.comparing() for the primary key with thenComparing() for the secondary key. Use .reversed() on the secondary comparator to get descending salary order.',
          },
          {
            question: 'What does Comparator.nullsLast(Comparator.naturalOrder()) do?',
            options: [
              'Removes null elements from the list',
              'Sorts elements naturally but places null values at the end',
              'Throws NullPointerException for any null values',
              'Converts null values to empty strings',
            ],
            correctIndex: 1,
            explanation: 'nullsLast() wraps another comparator and treats null values as greater than all non-null values, placing them at the end. nullsFirst() does the opposite.',
          },
        ],
        challenge: {
          prompt: 'Create a Student record with name and grade fields. Write a Comparator that sorts by grade descending, then by name alphabetically for ties.',
          starterCode: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Challenge {
    record Student(String name, int grade) {}

    public static Comparator<Student> getComparator() {
        // TODO: Return a comparator that sorts by grade descending,
        //       then by name ascending for ties
    }

    public static void main(String[] args) {
        List<Student> students = new ArrayList<>(List.of(
            new Student("Charlie", 90),
            new Student("Alice", 95),
            new Student("Bob", 90),
            new Student("Diana", 95)
        ));
        students.sort(getComparator());
        students.forEach(System.out::println);
        // Expected order: Alice(95), Diana(95), Bob(90), Charlie(90)
    }
}`,
          solutionCode: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Challenge {
    record Student(String name, int grade) {}

    public static Comparator<Student> getComparator() {
        return Comparator.comparingInt(Student::grade).reversed()
                         .thenComparing(Student::name);
    }

    public static void main(String[] args) {
        List<Student> students = new ArrayList<>(List.of(
            new Student("Charlie", 90),
            new Student("Alice", 95),
            new Student("Bob", 90),
            new Student("Diana", 95)
        ));
        students.sort(getComparator());
        students.forEach(System.out::println);
        // Expected order: Alice(95), Diana(95), Bob(90), Charlie(90)
    }
}`,
          hints: [
            'Use Comparator.comparingInt(Student::grade).reversed() for descending grade order.',
            'Chain with .thenComparing(Student::name) for alphabetical tie-breaking.',
            'reversed() only reverses the comparator it is called on, not subsequent thenComparing calls.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  Generics                                                     */
  /* ------------------------------------------------------------ */
  {
    id: 'java-generics',
    label: 'Generics',
    icon: 'Layers',
    entries: [
      {
        id: 'generic-classes',
        title: 'Generic Classes',
        difficulty: 'intermediate',
        tags: ['generics', 'type-parameter', 'type-safety', 'reusable'],
        cheatSheetSummary: 'class Box<T> { T value; } — type parameter T replaced at compile time. Provides compile-time type safety.',
        sections: [
          {
            heading: 'Defining Generic Classes',
            content:
              'Generics allow you to write classes and methods that work with any type while providing compile-time type safety. A type parameter (like T) is specified in angle brackets after the class name. Common conventions: T for type, E for element, K for key, V for value, N for number.',
            code: `public class GenericClasses {
    // Simple generic class
    static class Box<T> {
        private T value;

        Box(T value) { this.value = value; }

        T getValue() { return value; }
        void setValue(T value) { this.value = value; }

        @Override
        public String toString() {
            return "Box[" + value + "]";
        }
    }

    // Generic class with multiple type parameters
    static class Pair<A, B> {
        final A first;
        final B second;

        Pair(A first, B second) {
            this.first = first;
            this.second = second;
        }

        @Override
        public String toString() {
            return "(" + first + ", " + second + ")";
        }
    }

    public static void main(String[] args) {
        // Type safety: compiler checks types
        Box<String> stringBox = new Box<>("Hello");
        Box<Integer> intBox = new Box<>(42);

        System.out.println(stringBox);
        System.out.println(intBox);

        String s = stringBox.getValue();  // no cast needed
        int n = intBox.getValue();        // auto-unboxing
        System.out.println("String: " + s + ", Int: " + n);

        // Pair with different types
        Pair<String, Integer> nameAge = new Pair<>("Alice", 30);
        Pair<Integer, Integer> coords = new Pair<>(10, 20);

        System.out.println("Name-Age: " + nameAge);
        System.out.println("Coords: " + coords);

        // Diamond operator: compiler infers type
        Box<Double> autoBox = new Box<>(3.14);  // infers Box<Double>
        System.out.println("Auto: " + autoBox);
    }
}`,
            output: `Box[Hello]
Box[42]
String: Hello, Int: 42
Name-Age: (Alice, 30)
Coords: (10, 20)
Auto: Box[3.14]`,
            analogy: 'Think of it like a shipping container with a label: Box<T> is a container that can hold anything, but once you label it Box<String>, the shipping company (compiler) ensures only strings go in and come out. You get the flexibility of reusable containers with the safety of labeled ones.',
            codeHighlightLines: [3, 4, 7, 8, 18, 35, 36],
          },
          {
            heading: 'Generic Data Structures',
            content:
              'Generics are most powerful when building reusable data structures. Here is a generic stack implementation that works with any reference type while maintaining full type safety.',
            code: `import java.util.Arrays;

public class GenericStack<T> {
    private Object[] elements;
    private int size;

    @SuppressWarnings("unchecked")
    GenericStack(int capacity) {
        elements = new Object[capacity];
        size = 0;
    }

    void push(T item) {
        if (size == elements.length) {
            elements = Arrays.copyOf(elements, size * 2);
        }
        elements[size++] = item;
    }

    @SuppressWarnings("unchecked")
    T pop() {
        if (size == 0) throw new java.util.NoSuchElementException("Stack is empty");
        T item = (T) elements[--size];
        elements[size] = null;  // help garbage collector
        return item;
    }

    @SuppressWarnings("unchecked")
    T peek() {
        if (size == 0) throw new java.util.NoSuchElementException("Stack is empty");
        return (T) elements[size - 1];
    }

    int size() { return size; }
    boolean isEmpty() { return size == 0; }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < size; i++) {
            if (i > 0) sb.append(", ");
            sb.append(elements[i]);
        }
        return sb.append("]").toString();
    }

    public static void main(String[] args) {
        GenericStack<String> stringStack = new GenericStack<>(4);
        stringStack.push("Hello");
        stringStack.push("World");
        System.out.println("String stack: " + stringStack);
        System.out.println("Pop: " + stringStack.pop());

        GenericStack<Integer> intStack = new GenericStack<>(4);
        intStack.push(1); intStack.push(2); intStack.push(3);
        System.out.println("Int stack: " + intStack);
        System.out.println("Peek: " + intStack.peek());
    }
}`,
            output: `String stack: [Hello, World]
Pop: World
Int stack: [1, 2, 3]
Peek: 3`,
            tip: 'Java generics use type erasure -- the type parameter is replaced with Object at runtime. This means you cannot create generic arrays directly (new T[]) and must use Object[] with casts.',
            codeHighlightLines: [3, 4, 13, 14, 15, 16, 17, 23],
          },
        ],
        quiz: [
          {
            question: 'What are the common type parameter naming conventions in Java generics?',
            options: [
              'A for any, B for base, C for class',
              'T for type, E for element, K for key, V for value',
              'X for unknown, Y for yield, Z for zero',
              'Type names must be lowercase single letters',
            ],
            correctIndex: 1,
            explanation: 'By convention, T is used for general type, E for element (collections), K for key, V for value, and N for number. These are conventions, not requirements, but following them improves readability.',
          },
          {
            question: 'What is the diamond operator (<>) used for in generics?',
            options: [
              'Defining a new generic type',
              'Allowing the compiler to infer the type arguments from context',
              'Creating a raw type',
              'Specifying multiple type bounds',
            ],
            correctIndex: 1,
            explanation: 'The diamond operator (<>) lets you omit the type arguments on the right side of an assignment when the compiler can infer them from the left side. For example: Box<String> box = new Box<>() instead of new Box<String>().',
          },
          {
            question: 'Why can you NOT create a generic array like new T[10] in Java?',
            options: [
              'Arrays do not support generics',
              'Due to type erasure, the runtime type of T is unknown',
              'Generic arrays would be too slow',
              'Java does not support arrays',
            ],
            correctIndex: 1,
            explanation: 'Due to type erasure, T is erased to Object at runtime. Java arrays need to know their component type at runtime for type checking (ArrayStoreException), so new T[] is not allowed. Use Object[] with casts or ArrayList<T> instead.',
          },
        ],
        challenge: {
          prompt: 'Create a generic Pair<A, B> class with first and second fields, a swap() method that returns a new Pair<B, A>, and a toString() method.',
          starterCode: `public class Challenge {
    // TODO: Define a generic Pair<A, B> class with:
    // - Constructor Pair(A first, B second)
    // - Methods: getFirst(), getSecond(), swap() -> Pair<B, A>
    // - toString() returning "(first, second)"

    public static void main(String[] args) {
        // Should work like:
        // Pair<String, Integer> p = new Pair<>("Alice", 30);
        // System.out.println(p);            // (Alice, 30)
        // Pair<Integer, String> swapped = p.swap();
        // System.out.println(swapped);      // (30, Alice)
    }
}`,
          solutionCode: `public class Challenge {
    static class Pair<A, B> {
        private final A first;
        private final B second;

        Pair(A first, B second) {
            this.first = first;
            this.second = second;
        }

        A getFirst() { return first; }
        B getSecond() { return second; }

        Pair<B, A> swap() {
            return new Pair<>(second, first);
        }

        @Override
        public String toString() {
            return "(" + first + ", " + second + ")";
        }
    }

    public static void main(String[] args) {
        Pair<String, Integer> p = new Pair<>("Alice", 30);
        System.out.println(p);            // (Alice, 30)
        Pair<Integer, String> swapped = p.swap();
        System.out.println(swapped);      // (30, Alice)
    }
}`,
          hints: [
            'Declare the class as static class Pair<A, B> with two type parameters.',
            'The swap() method returns new Pair<>(second, first) -- note the type parameters are reversed in the return type Pair<B, A>.',
            'Make the fields final for immutability, since you return a new Pair from swap().',
          ],
        },
      },
      {
        id: 'generic-methods',
        title: 'Generic Methods',
        difficulty: 'intermediate',
        tags: ['generic-method', 'type-inference', 'utility'],
        cheatSheetSummary: 'static <T> T method(T arg) — type parameter declared before return type. Compiler infers T from arguments.',
        signature: '<T> ReturnType methodName(T param)',
        sections: [
          {
            heading: 'Defining Generic Methods',
            content:
              'Generic methods declare their own type parameters before the return type. The compiler infers the type from the arguments, so you rarely need to specify it explicitly. Generic methods can be static or instance methods, and their type parameters are independent of any class-level type parameters.',
            code: `import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

public class GenericMethods {
    // Generic method: <T> before return type
    static <T> void printArray(T[] array) {
        System.out.print("[");
        for (int i = 0; i < array.length; i++) {
            if (i > 0) System.out.print(", ");
            System.out.print(array[i]);
        }
        System.out.println("]");
    }

    // Generic method returning a value
    static <T> T getFirst(List<T> list) {
        if (list.isEmpty()) return null;
        return list.get(0);
    }

    // Generic method with multiple type parameters
    static <K, V> String formatEntry(K key, V value) {
        return key + " => " + value;
    }

    // Generic swap
    static <T> void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    // Generic method to create a list from array
    @SafeVarargs
    static <T> List<T> listOf(T... items) {
        return new ArrayList<>(Arrays.asList(items));
    }

    public static void main(String[] args) {
        // Type is inferred from arguments
        Integer[] ints = {1, 2, 3};
        String[] strs = {"a", "b", "c"};
        printArray(ints);
        printArray(strs);

        List<String> names = List.of("Alice", "Bob", "Charlie");
        System.out.println("First: " + getFirst(names));

        System.out.println(formatEntry("name", "Alice"));
        System.out.println(formatEntry(42, true));

        String[] arr = {"X", "Y", "Z"};
        swap(arr, 0, 2);
        printArray(arr);

        List<Double> doubles = listOf(1.1, 2.2, 3.3);
        System.out.println("Doubles: " + doubles);
    }
}`,
            output: `[1, 2, 3]
[a, b, c]
First: Alice
name => Alice
42 => true
[Z, Y, X]
Doubles: [1.1, 2.2, 3.3]`,
            analogy: 'Think of it like a universal tool adapter: the <T> before the return type says "this method works with ANY type." The compiler figures out what T is from the arguments you pass, just like a universal adapter figures out what plug shape to use from the device you connect.',
            codeHighlightLines: [7, 17, 23, 28],
          },
        ],
      },
      {
        id: 'bounded-types',
        title: 'Bounded Type Parameters',
        difficulty: 'advanced',
        tags: ['bounds', 'extends', 'super', 'wildcard', 'PECS'],
        cheatSheetSummary: '<T extends Number> — upper bound. <? super Integer> — lower bound. PECS: Producer Extends, Consumer Super.',
        sections: [
          {
            heading: 'Upper and Lower Bounds',
            content:
              'Bounded type parameters restrict the types that can be used as type arguments. Upper bounds (<T extends Number>) require T to be Number or a subclass. Lower bounds (<? super Integer>) require the type to be Integer or a superclass. The PECS principle (Producer Extends, Consumer Super) guides when to use each.',
            code: `import java.util.List;
import java.util.ArrayList;

public class BoundedTypes {
    // Upper bound: T must be Number or subclass
    static <T extends Number> double sum(List<T> list) {
        double total = 0;
        for (T n : list) {
            total += n.doubleValue();
        }
        return total;
    }

    // Upper bound with multiple constraints
    static <T extends Comparable<T>> T max(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }

    // Wildcard: unknown type
    static void printList(List<?> list) {
        for (Object item : list) {
            System.out.print(item + " ");
        }
        System.out.println();
    }

    // Upper-bounded wildcard (producer: reads from list)
    static double sumWildcard(List<? extends Number> list) {
        double total = 0;
        for (Number n : list) total += n.doubleValue();
        return total;
    }

    // Lower-bounded wildcard (consumer: writes to list)
    static void addIntegers(List<? super Integer> list) {
        list.add(1);
        list.add(2);
        list.add(3);
    }

    public static void main(String[] args) {
        List<Integer> ints = List.of(1, 2, 3);
        List<Double> doubles = List.of(1.5, 2.5, 3.5);

        System.out.println("Sum ints: " + sum(ints));
        System.out.println("Sum doubles: " + sum(doubles));

        System.out.println("Max: " + max(5, 3));
        System.out.println("Max: " + max("apple", "banana"));

        printList(ints);
        printList(doubles);
        printList(List.of("a", "b", "c"));

        // PECS: Producer Extends, Consumer Super
        // Reading from list: use extends (producer)
        System.out.println("Sum wildcard: " + sumWildcard(ints));

        // Writing to list: use super (consumer)
        List<Number> numbers = new ArrayList<>();
        addIntegers(numbers);
        System.out.println("After addIntegers: " + numbers);
    }
}`,
            output: `Sum ints: 6.0
Sum doubles: 7.5
Max: 5
Max: banana
1 2 3
1.5 2.5 3.5
a b c
Sum wildcard: 6.0
After addIntegers: [1, 2, 3]`,
            tip: 'Remember PECS: if you only read from a structure, use <? extends T> (producer). If you only write to it, use <? super T> (consumer). If both, use exact type <T>.',
            analogy: 'Think of it like a vending machine vs a recycling bin: a List<? extends Number> is a vending machine -- it produces Numbers (you can only take out, not put in). A List<? super Integer> is a recycling bin labeled "Integers and broader" -- you can put Integers in, but what you take out might be any supertype.',
            codeHighlightLines: [6, 15, 28, 35],
          },
          {
            heading: 'Type Erasure and Limitations',
            content:
              'Java generics are implemented via type erasure: the compiler removes all type parameters at compile time, replacing them with Object (or the bound type). This means you cannot use instanceof with generic types, create generic arrays, or get the type parameter at runtime. Understanding erasure helps avoid common pitfalls.',
            code: `import java.util.List;
import java.util.ArrayList;

public class TypeErasure {
    // After erasure, this becomes: static Object identity(Object x)
    static <T> T identity(T x) {
        return x;
    }

    public static void main(String[] args) {
        // Type erasure means this works at runtime:
        List<String> strings = new ArrayList<>();
        List<Integer> integers = new ArrayList<>();

        // Both are just ArrayList at runtime!
        System.out.println(strings.getClass() == integers.getClass());  // true

        // Cannot do:
        // if (strings instanceof List<String>) { }   // COMPILE ERROR
        // T[] arr = new T[10];                        // COMPILE ERROR

        // Can do:
        if (strings instanceof List<?>) {
            System.out.println("It is a List of something");
        }

        // @SuppressWarnings("unchecked") for unavoidable casts
        @SuppressWarnings("unchecked")
        List<String> raw = (List<String>) (List<?>) integers;  // unsafe!

        // Workaround: pass Class<T> for runtime type info
        String[] arr = createArray(String.class, 3);
        arr[0] = "Hello";
        System.out.println("Generic array: " + java.util.Arrays.toString(arr));
    }

    @SuppressWarnings("unchecked")
    static <T> T[] createArray(Class<T> type, int size) {
        return (T[]) java.lang.reflect.Array.newInstance(type, size);
    }
}`,
            output: `true
It is a List of something
Generic array: [Hello, null, null]`,
            note: 'Type erasure is a design decision from Java 5. It maintains backward compatibility with pre-generics code but limits what generics can do at runtime.',
            codeHighlightLines: [6, 16, 23, 38, 39],
          },
        ],
      },
    ],
  },
];

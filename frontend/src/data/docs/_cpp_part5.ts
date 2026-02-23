import type { DocCategory } from './types';

export const CPP_PART5_CATEGORIES: DocCategory[] = [
  /* ------------------------------------------------------------ */
  /*  STL Algorithms                                               */
  /* ------------------------------------------------------------ */
  {
    id: 'stl-algorithms',
    label: 'STL Algorithms',
    icon: 'Cpu',
    entries: [
      {
        id: 'sort',
        title: 'std::sort',
        difficulty: 'beginner',
        tags: ['sort', 'algorithm', 'comparator', 'introsort'],
        cheatSheetSummary: 'sort(begin, end) sorts ascending. sort(begin, end, comp) with custom comparator. O(n log n).',
        signature: 'void sort(RandomIt first, RandomIt last, Compare comp = {});',
        sections: [
          {
            heading: 'Basic Sorting',
            content:
              'std::sort from <algorithm> sorts elements in ascending order by default using IntroSort (a hybrid of quicksort, heapsort, and insertion sort). It runs in O(n log n) time. For descending order, pass greater<T>() or use reverse iterators.',
            code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {5, 3, 1, 4, 2};

    sort(v.begin(), v.end());
    cout << "Ascending: ";
    for (int x : v) cout << x << " ";
    cout << "\\n";

    sort(v.begin(), v.end(), greater<int>());
    cout << "Descending: ";
    for (int x : v) cout << x << " ";
    cout << "\\n";

    // Sort strings
    vector<string> words = {"banana", "apple", "cherry", "date"};
    sort(words.begin(), words.end());
    cout << "Strings: ";
    for (const auto& w : words) cout << w << " ";
    cout << "\\n";

    // Partial sort: only sort first 3 elements
    vector<int> nums = {9, 7, 5, 3, 1, 8, 6, 4, 2};
    partial_sort(nums.begin(), nums.begin() + 3, nums.end());
    cout << "Partial sort (first 3): ";
    for (int x : nums) cout << x << " ";
    cout << "\\n";

    return 0;
}`,
            output: `Ascending: 1 2 3 4 5
Descending: 5 4 3 2 1
Strings: apple banana cherry date
Partial sort (first 3): 1 2 3 9 7 8 6 5 4`,
            tip: 'sort() is not stable (equal elements may be reordered). Use stable_sort() when you need to preserve the relative order of equal elements.',
            analogy: 'Think of it like organizing a bookshelf: sort() rearranges the books alphabetically by title, and greater<>() flips the order so Z comes first. partial_sort is like only sorting the first shelf and leaving the rest in any order.',
            codeHighlightLines: [8, 13, 27],
            diagram: {
              kind: 'custom' as const,
              type: 'algorithm-steps' as const,
              data: {
                title: 'IntroSort: Hybrid Sorting Algorithm',
                steps: [
                  {
                    label: 'Start',
                    description: 'Input array: [5, 3, 1, 4, 2]',
                    state: ['5', '3', '1', '4', '2'],
                    highlights: [0, 1, 2, 3, 4],
                  },
                  {
                    label: 'Quicksort Partition',
                    description: 'Choose pivot (2), partition around it',
                    state: ['1', '2', '3', '4', '5'],
                    highlights: [4],
                  },
                  {
                    label: 'Recurse Left',
                    description: 'Sort left partition [1] - already sorted',
                    state: ['1', '2', '3', '4', '5'],
                    highlights: [0],
                  },
                  {
                    label: 'Recurse Right',
                    description: 'Sort right partition [3, 4, 5] - already sorted',
                    state: ['1', '2', '3', '4', '5'],
                    highlights: [2, 3, 4],
                  },
                  {
                    label: 'Result',
                    description: 'Sorted array: O(n log n) average',
                    state: ['1', '2', '3', '4', '5'],
                    highlights: [],
                  },
                ],
              },
              caption: 'std::sort uses IntroSort: quicksort that falls back to heapsort if recursion depth exceeds O(log n), and insertion sort for small partitions',
            },
          },
          {
            heading: 'Custom Comparators',
            content:
              'A comparator function returns true if the first argument should come before the second. You can use lambdas, function pointers, or the standard functors (less<>, greater<>). Custom comparators are essential for sorting structs, sorting by multiple criteria, and non-standard orderings.',
            code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // Sort by absolute value
    vector<int> v = {-5, 3, -1, 4, -2};
    sort(v.begin(), v.end(), [](int a, int b) {
        return abs(a) < abs(b);
    });
    cout << "By abs value: ";
    for (int x : v) cout << x << " ";
    cout << "\\n";

    // Sort structs by multiple criteria
    struct Student {
        string name;
        int grade;
    };
    vector<Student> students = {
        {"Alice", 85}, {"Bob", 92}, {"Charlie", 85}, {"Diana", 92}
    };
    sort(students.begin(), students.end(), [](const Student& a, const Student& b) {
        if (a.grade != b.grade) return a.grade > b.grade;  // Higher grade first
        return a.name < b.name;  // Alphabetical for ties
    });
    cout << "Students:\\n";
    for (const auto& s : students) {
        cout << "  " << s.name << ": " << s.grade << "\\n";
    }

    return 0;
}`,
            output: `By abs value: -1 -2 3 4 -5
Students:
  Bob: 92
  Diana: 92
  Alice: 85
  Charlie: 85`,
            codeHighlightLines: [5, 6, 7, 18, 19, 20],
          },
        ],
        quiz: [
          {
            question: 'What is the time complexity of std::sort?',
            options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
            correctIndex: 1,
            explanation: 'std::sort uses IntroSort which guarantees O(n log n) worst-case time complexity by combining quicksort, heapsort, and insertion sort.',
          },
          {
            question: 'Which function should you use if you need equal elements to maintain their relative order after sorting?',
            options: ['std::sort', 'std::partial_sort', 'std::stable_sort', 'std::nth_element'],
            correctIndex: 2,
            explanation: 'std::stable_sort preserves the relative order of equal elements, while std::sort does not guarantee this.',
          },
          {
            question: 'What does a custom comparator function passed to std::sort return?',
            options: ['An integer (-1, 0, or 1)', 'true if the first argument should come before the second', 'true if the arguments are equal', 'The smaller of the two arguments'],
            correctIndex: 1,
            explanation: 'A comparator for std::sort returns true (bool) if the first argument should be placed before the second in the sorted order.',
          },
          {
            question: 'Which header must you include to use std::sort?',
            options: ['<sort>', '<numeric>', '<algorithm>', '<functional>'],
            correctIndex: 2,
            explanation: 'std::sort is defined in the <algorithm> header along with most other STL algorithms.',
          },
        ],
        challenge: {
          prompt: 'Write a function that sorts a vector of pairs by the second element in descending order. If the second elements are equal, sort by the first element in ascending order.',
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void sortPairs(vector<pair<int,int>>& v) {
    // TODO: Sort v by second element descending, then first element ascending
}

int main() {
    vector<pair<int,int>> v = {{1,3},{2,1},{3,3},{4,2},{5,1}};
    sortPairs(v);
    for (auto& [a, b] : v) cout << "(" << a << "," << b << ") ";
    // Expected: (1,3) (3,3) (4,2) (2,1) (5,1)
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void sortPairs(vector<pair<int,int>>& v) {
    sort(v.begin(), v.end(), [](const pair<int,int>& a, const pair<int,int>& b) {
        if (a.second != b.second) return a.second > b.second;
        return a.first < b.first;
    });
}

int main() {
    vector<pair<int,int>> v = {{1,3},{2,1},{3,3},{4,2},{5,1}};
    sortPairs(v);
    for (auto& [a, b] : v) cout << "(" << a << "," << b << ") ";
    // Expected: (1,3) (3,3) (4,2) (2,1) (5,1)
    return 0;
}`,
          hints: [
            'Use std::sort with a custom lambda comparator that takes two pairs.',
            'Compare the second elements first for descending order (use >), then compare first elements for ascending order (use <).',
            'The comparator should return true when the first argument should come before the second in the desired order.',
          ],
        },
      },
      {
        id: 'find',
        title: 'std::find',
        difficulty: 'beginner',
        tags: ['find', 'find_if', 'search', 'algorithm'],
        cheatSheetSummary: 'find(begin, end, val) returns iterator to first match or end. find_if uses a predicate.',
        signature: 'InputIt find(InputIt first, InputIt last, const T& value);',
        sections: [
          {
            heading: 'Finding Elements',
            content:
              'std::find performs a linear search for a value and returns an iterator to the first match, or end() if not found. std::find_if uses a predicate function instead of a value, allowing complex search criteria. Both are O(n) for unsorted data.',
            code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {10, 20, 30, 40, 50};

    // Find a value
    auto it = find(v.begin(), v.end(), 30);
    if (it != v.end()) {
        cout << "Found 30 at index " << (it - v.begin()) << "\\n";
    }

    auto it2 = find(v.begin(), v.end(), 99);
    if (it2 == v.end()) {
        cout << "99 not found\\n";
    }

    // find_if with predicate
    auto it3 = find_if(v.begin(), v.end(), [](int x) {
        return x > 25;
    });
    if (it3 != v.end()) {
        cout << "First > 25: " << *it3 << "\\n";
    }

    // find_if_not
    auto it4 = find_if_not(v.begin(), v.end(), [](int x) {
        return x < 35;
    });
    if (it4 != v.end()) {
        cout << "First not < 35: " << *it4 << "\\n";
    }

    // Find in strings
    vector<string> names = {"Alice", "Bob", "Charlie", "Diana"};
    auto nameIt = find_if(names.begin(), names.end(), [](const string& s) {
        return s.length() > 5;
    });
    if (nameIt != names.end()) {
        cout << "First long name: " << *nameIt << "\\n";
    }

    return 0;
}`,
            output: `Found 30 at index 2
99 not found
First > 25: 30
First not < 35: 40
First long name: Charlie`,
            tip: 'For sorted containers, use binary_search or lower_bound (O(log n)) instead of find (O(n)). For sets and maps, use the .find() member function.',
            analogy: 'Think of it like scanning a crowd for a friend: find() checks every person one by one from left to right, while find_if() checks every person but with a custom description ("tall, wearing red hat") instead of looking for a specific name.',
            codeHighlightLines: [8, 9, 10, 19, 20, 21],
          },
        ],
        quiz: [
          {
            question: 'What does std::find return when the element is not found?',
            options: ['nullptr', '-1', 'An iterator to end()', 'An exception is thrown'],
            correctIndex: 2,
            explanation: 'std::find returns an iterator equal to the end iterator (the second argument) when the element is not found in the range.',
          },
          {
            question: 'What is the time complexity of std::find on an unsorted vector?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
            correctIndex: 2,
            explanation: 'std::find performs a linear scan, checking each element one by one, so its time complexity is O(n).',
          },
          {
            question: 'What is the difference between find_if and find_if_not?',
            options: [
              'find_if searches forward, find_if_not searches backward',
              'find_if returns the first element where the predicate is true, find_if_not returns the first where it is false',
              'find_if works on sorted data, find_if_not works on unsorted data',
              'There is no difference; they are aliases',
            ],
            correctIndex: 1,
            explanation: 'find_if returns an iterator to the first element for which the predicate returns true, while find_if_not returns the first element for which the predicate returns false.',
          },
        ],
        challenge: {
          prompt: 'Write a function that finds the first negative number in a vector. If found, return its index; otherwise return -1.',
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int findFirstNegative(const vector<int>& v) {
    // TODO: Use std::find_if to find the first negative number
    // Return its index, or -1 if none found
    return -1;
}

int main() {
    vector<int> v1 = {5, 3, -2, 8, -1};
    vector<int> v2 = {1, 2, 3, 4, 5};
    cout << "First negative index: " << findFirstNegative(v1) << "\\n"; // 2
    cout << "First negative index: " << findFirstNegative(v2) << "\\n"; // -1
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int findFirstNegative(const vector<int>& v) {
    auto it = find_if(v.begin(), v.end(), [](int x) {
        return x < 0;
    });
    if (it != v.end()) {
        return static_cast<int>(it - v.begin());
    }
    return -1;
}

int main() {
    vector<int> v1 = {5, 3, -2, 8, -1};
    vector<int> v2 = {1, 2, 3, 4, 5};
    cout << "First negative index: " << findFirstNegative(v1) << "\\n"; // 2
    cout << "First negative index: " << findFirstNegative(v2) << "\\n"; // -1
    return 0;
}`,
          hints: [
            'Use std::find_if with a lambda that checks if the element is less than 0.',
            'Compare the returned iterator against v.end() to determine if a match was found.',
            'Calculate the index by subtracting v.begin() from the returned iterator.',
          ],
        },
      },
      {
        id: 'binary-search',
        title: 'Binary Search',
        difficulty: 'intermediate',
        tags: ['binary-search', 'lower-bound', 'upper-bound', 'algorithm'],
        cheatSheetSummary: 'lower_bound: first >= val. upper_bound: first > val. binary_search: bool exists. All O(log n) on sorted data.',
        signature: 'ForwardIt lower_bound(ForwardIt first, ForwardIt last, const T& value);',
        sections: [
          {
            heading: 'Binary Search Functions',
            content:
              'The STL provides three binary search functions that work on sorted ranges: binary_search (returns bool), lower_bound (iterator to first element >= value), and upper_bound (iterator to first element > value). The difference between lower_bound and upper_bound gives the count of elements equal to the value.',
            code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 2, 2, 3, 5, 7, 9};

    // binary_search: does value exist?
    cout << "Contains 5: " << binary_search(v.begin(), v.end(), 5) << "\\n";
    cout << "Contains 6: " << binary_search(v.begin(), v.end(), 6) << "\\n";

    // lower_bound: first >= value
    auto lo = lower_bound(v.begin(), v.end(), 2);
    cout << "lower_bound(2): index " << (lo - v.begin()) << ", value " << *lo << "\\n";

    // upper_bound: first > value
    auto hi = upper_bound(v.begin(), v.end(), 2);
    cout << "upper_bound(2): index " << (hi - v.begin()) << ", value " << *hi << "\\n";

    // Count of value 2
    int count = upper_bound(v.begin(), v.end(), 2) - lower_bound(v.begin(), v.end(), 2);
    cout << "Count of 2: " << count << "\\n";

    // equal_range: returns both at once
    auto [first, last] = equal_range(v.begin(), v.end(), 2);
    cout << "equal_range(2): [" << (first - v.begin()) << ", "
         << (last - v.begin()) << ")\\n";

    // Insertion point for maintaining sorted order
    int newVal = 4;
    auto pos = lower_bound(v.begin(), v.end(), newVal);
    cout << "Insert " << newVal << " at index " << (pos - v.begin()) << "\\n";

    return 0;
}`,
            output: `Contains 5: 1
Contains 6: 0
lower_bound(2): index 1, value 2
upper_bound(2): index 4, value 3
Count of 2: 3
equal_range(2): [1, 4)
Insert 4 at index 5`,
            warning: 'Binary search functions require the range to be sorted. Using them on unsorted data produces undefined results.',
            analogy: 'Think of it like looking up a word in a physical dictionary: you open to the middle, see if your word comes before or after, then repeat on the correct half. lower_bound finds the page where the word first appears; upper_bound finds the page just after the last occurrence.',
            codeHighlightLines: [9, 10, 13, 14, 21, 22],
            diagram: {
              kind: 'custom' as const,
              type: 'algorithm-steps' as const,
              data: {
                title: 'Binary Search for value 5 in [1, 2, 2, 2, 3, 5, 7, 9]',
                steps: [
                  {
                    label: 'Step 1',
                    description: 'Search range [0..7], mid = 3 → arr[3]=2 < 5, go right',
                    state: ['1', '2', '2', '2̲', '3', '5', '7', '9'],
                    highlights: [3],
                  },
                  {
                    label: 'Step 2',
                    description: 'Search range [4..7], mid = 5 → arr[5]=5 = target, found!',
                    state: ['1', '2', '2', '2', '3', '5̲', '7', '9'],
                    highlights: [5],
                  },
                  {
                    label: 'lower_bound(2)',
                    description: 'Returns iterator to index 1 (first element >= 2)',
                    state: ['1', '→2', '2', '2', '3', '5', '7', '9'],
                    highlights: [1],
                  },
                  {
                    label: 'upper_bound(2)',
                    description: 'Returns iterator to index 4 (first element > 2)',
                    state: ['1', '2', '2', '2', '→3', '5', '7', '9'],
                    highlights: [4],
                  },
                  {
                    label: 'equal_range(2)',
                    description: 'Range [1, 4): 3 elements equal to 2',
                    state: ['1', '[2', '2', '2]', '3', '5', '7', '9'],
                    highlights: [1, 2, 3],
                  },
                ],
              },
              caption: 'Binary search halves the search space each step: O(log n). lower_bound and upper_bound bracket the range of equal elements.',
            },
          },
        ],
        quiz: [
          {
            question: 'What is the prerequisite for using binary_search, lower_bound, and upper_bound?',
            options: ['The range must be a vector', 'The range must be sorted', 'The range must contain unique elements', 'The range must use random access iterators'],
            correctIndex: 1,
            explanation: 'All binary search functions require the range to be sorted. Using them on unsorted data produces undefined behavior.',
          },
          {
            question: 'What does lower_bound return?',
            options: [
              'An iterator to the first element less than the value',
              'An iterator to the first element greater than the value',
              'An iterator to the first element greater than or equal to the value',
              'An iterator to the last element equal to the value',
            ],
            correctIndex: 2,
            explanation: 'lower_bound returns an iterator to the first element that is not less than (i.e., greater than or equal to) the given value.',
          },
          {
            question: 'How can you count the number of elements equal to a value in a sorted range using lower_bound and upper_bound?',
            options: [
              'lower_bound(begin, end, val) - upper_bound(begin, end, val)',
              'upper_bound(begin, end, val) - lower_bound(begin, end, val)',
              'lower_bound(begin, end, val) + upper_bound(begin, end, val)',
              'end - lower_bound(begin, end, val)',
            ],
            correctIndex: 1,
            explanation: 'upper_bound gives the iterator just past the last equal element, lower_bound gives the iterator to the first equal element. Their difference is the count.',
          },
          {
            question: 'What does binary_search return?',
            options: ['An iterator to the found element', 'The index of the element', 'A boolean (true if found)', 'A pair of iterators'],
            correctIndex: 2,
            explanation: 'binary_search returns a bool: true if the value exists in the sorted range, false otherwise. Use lower_bound if you need the iterator.',
          },
        ],
        challenge: {
          prompt: 'Write a function that uses lower_bound to insert elements into a vector while keeping it sorted at all times.',
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void sortedInsert(vector<int>& v, int val) {
    // TODO: Insert val into v while maintaining sorted order
    // Use lower_bound to find the correct position
}

int main() {
    vector<int> v;
    for (int x : {5, 1, 3, 2, 4}) {
        sortedInsert(v, x);
    }
    for (int x : v) cout << x << " ";
    // Expected: 1 2 3 4 5
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void sortedInsert(vector<int>& v, int val) {
    auto pos = lower_bound(v.begin(), v.end(), val);
    v.insert(pos, val);
}

int main() {
    vector<int> v;
    for (int x : {5, 1, 3, 2, 4}) {
        sortedInsert(v, x);
    }
    for (int x : v) cout << x << " ";
    // Expected: 1 2 3 4 5
    return 0;
}`,
          hints: [
            'lower_bound returns an iterator to the position where the value should be inserted to maintain sorted order.',
            'Use vector::insert(iterator, value) to insert at the position found by lower_bound.',
          ],
        },
      },
      {
        id: 'count',
        title: 'std::count',
        difficulty: 'beginner',
        tags: ['count', 'count_if', 'algorithm'],
        cheatSheetSummary: 'count(begin, end, val) counts exact matches. count_if(begin, end, pred) counts elements satisfying a predicate.',
        signature: 'typename iterator_traits<InputIt>::difference_type count(InputIt first, InputIt last, const T& value);',
        sections: [
          {
            heading: 'Counting Elements',
            content:
              'std::count returns the number of elements equal to a given value. std::count_if returns the number of elements for which a predicate returns true. Both perform a linear scan of the range.',
            code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 2, 1, 2, 3, 4, 5, 2};

    // Count exact value
    cout << "Count of 2: " << count(v.begin(), v.end(), 2) << "\\n";
    cout << "Count of 9: " << count(v.begin(), v.end(), 9) << "\\n";

    // Count with predicate
    int evens = count_if(v.begin(), v.end(), [](int x) {
        return x % 2 == 0;
    });
    cout << "Even count: " << evens << "\\n";

    int greaterThan3 = count_if(v.begin(), v.end(), [](int x) {
        return x > 3;
    });
    cout << "Count > 3: " << greaterThan3 << "\\n";

    // Count characters in a string
    string text = "hello world";
    cout << "Count of 'l': " << count(text.begin(), text.end(), 'l') << "\\n";

    // Count words starting with a vowel
    vector<string> words = {"apple", "banana", "orange", "grape", "avocado"};
    int vowelWords = count_if(words.begin(), words.end(), [](const string& w) {
        return !w.empty() && string("aeiou").find(w[0]) != string::npos;
    });
    cout << "Words starting with vowel: " << vowelWords << "\\n";

    return 0;
}`,
            output: `Count of 2: 4
Count of 9: 0
Even count: 5
Count > 3: 2
Count of 'l': 3
Words starting with vowel: 3`,
          },
        ],
        quiz: [
          {
            question: 'What is the return type of std::count?',
            options: ['int', 'size_t', 'iterator_traits<InputIt>::difference_type', 'bool'],
            correctIndex: 2,
            explanation: 'std::count returns a value of type iterator_traits<InputIt>::difference_type, which is typically ptrdiff_t (a signed integer type).',
          },
          {
            question: 'What is the time complexity of std::count?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
            correctIndex: 2,
            explanation: 'std::count performs a linear scan through all elements, checking each one, so it runs in O(n) time.',
          },
          {
            question: 'Which of the following correctly counts elements greater than 10 in a vector v?',
            options: [
              'count(v.begin(), v.end(), > 10)',
              'count_if(v.begin(), v.end(), [](int x) { return x > 10; })',
              'count(v.begin(), v.end(), [](int x) { return x > 10; })',
              'count_greater(v.begin(), v.end(), 10)',
            ],
            correctIndex: 1,
            explanation: 'count_if takes a predicate (lambda or function) that defines the condition. count only matches exact values, not conditions.',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes a string and returns a map of each character to its count using std::count.',
          starterCode: `#include <iostream>
#include <string>
#include <map>
#include <algorithm>
using namespace std;

map<char, int> charFrequency(const string& s) {
    map<char, int> freq;
    // TODO: For each unique character in s, count its occurrences using std::count
    return freq;
}

int main() {
    string text = "hello world";
    auto freq = charFrequency(text);
    for (auto& [ch, cnt] : freq) {
        cout << "'" << ch << "': " << cnt << "\\n";
    }
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
#include <map>
#include <algorithm>
using namespace std;

map<char, int> charFrequency(const string& s) {
    map<char, int> freq;
    for (char c : s) {
        if (freq.find(c) == freq.end()) {
            freq[c] = count(s.begin(), s.end(), c);
        }
    }
    return freq;
}

int main() {
    string text = "hello world";
    auto freq = charFrequency(text);
    for (auto& [ch, cnt] : freq) {
        cout << "'" << ch << "': " << cnt << "\\n";
    }
    return 0;
}`,
          hints: [
            'Iterate over each character in the string and check if it has already been counted.',
            'Use std::count(s.begin(), s.end(), c) to count occurrences of character c.',
            'Use a map to store counts only for characters not yet processed.',
          ],
        },
      },
      {
        id: 'accumulate',
        title: 'std::accumulate',
        difficulty: 'beginner',
        tags: ['accumulate', 'reduce', 'sum', 'fold', 'numeric'],
        cheatSheetSummary: 'accumulate(begin, end, init) computes a sum (or any fold). Include <numeric>.',
        signature: 'T accumulate(InputIt first, InputIt last, T init, BinaryOp op = std::plus<>());',
        sections: [
          {
            heading: 'Summing and Folding',
            content:
              'std::accumulate from <numeric> computes the sum of a range starting from an initial value. With a custom binary operation, it can compute products, string concatenation, or any fold operation. The initial value also determines the return type.',
            code: `#include <iostream>
#include <vector>
#include <numeric>
#include <string>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};

    // Basic sum
    int sum = accumulate(v.begin(), v.end(), 0);
    cout << "Sum: " << sum << "\\n";

    // Use 0LL for long long result
    long long bigSum = accumulate(v.begin(), v.end(), 0LL);
    cout << "Big sum: " << bigSum << "\\n";

    // Product
    int product = accumulate(v.begin(), v.end(), 1, multiplies<int>());
    cout << "Product: " << product << "\\n";

    // Custom operation: sum of squares
    int sumSq = accumulate(v.begin(), v.end(), 0, [](int acc, int x) {
        return acc + x * x;
    });
    cout << "Sum of squares: " << sumSq << "\\n";

    // String concatenation
    vector<string> words = {"Hello", " ", "World", "!"};
    string sentence = accumulate(words.begin(), words.end(), string(""));
    cout << "Sentence: " << sentence << "\\n";

    // Average
    double avg = static_cast<double>(accumulate(v.begin(), v.end(), 0)) / v.size();
    cout << "Average: " << avg << "\\n";

    return 0;
}`,
            output: `Sum: 15
Big sum: 15
Product: 120
Sum of squares: 55
Sentence: Hello World!
Average: 3`,
            warning: 'When summing large numbers, use 0LL as the initial value to prevent integer overflow: accumulate(v.begin(), v.end(), 0LL).',
            analogy: 'Think of it like a snowball rolling downhill: it starts as the initial value (the seed) and grows as it picks up each element along the way. The custom operation controls how each new element merges into the growing snowball.',
            codeHighlightLines: [7, 12, 16, 17, 18],
            diagram: {
              kind: 'custom' as const,
              type: 'algorithm-steps' as const,
              data: {
                title: 'accumulate({1,2,3,4,5}, init=0) — Left Fold',
                steps: [
                  {
                    label: 'Init',
                    description: 'Start with accumulator = 0',
                    state: ['acc=0', '→1', '2', '3', '4', '5'],
                    highlights: [0],
                  },
                  {
                    label: 'Step 1',
                    description: '0 + 1 = 1',
                    state: ['acc=1', '1✓', '→2', '3', '4', '5'],
                    highlights: [0, 2],
                  },
                  {
                    label: 'Step 2',
                    description: '1 + 2 = 3',
                    state: ['acc=3', '1✓', '2✓', '→3', '4', '5'],
                    highlights: [0, 3],
                  },
                  {
                    label: 'Step 3',
                    description: '3 + 3 = 6',
                    state: ['acc=6', '1✓', '2✓', '3✓', '→4', '5'],
                    highlights: [0, 4],
                  },
                  {
                    label: 'Step 4',
                    description: '6 + 4 = 10',
                    state: ['acc=10', '1✓', '2✓', '3✓', '4✓', '→5'],
                    highlights: [0, 5],
                  },
                  {
                    label: 'Result',
                    description: '10 + 5 = 15. Final sum: 15',
                    state: ['acc=15', '1✓', '2✓', '3✓', '4✓', '5✓'],
                    highlights: [0],
                  },
                ],
              },
              caption: 'accumulate performs a left fold: starting from init, it applies the binary operation (default: +) to the accumulator and each element in sequence',
            },
          },
        ],
        quiz: [
          {
            question: 'Which header is required for std::accumulate?',
            options: ['<algorithm>', '<numeric>', '<functional>', '<cmath>'],
            correctIndex: 1,
            explanation: 'std::accumulate is defined in the <numeric> header, not <algorithm> like most other STL algorithms.',
          },
          {
            question: 'What determines the return type of std::accumulate?',
            options: ['The type of elements in the range', 'The return type of the binary operation', 'The type of the initial value', 'It always returns int'],
            correctIndex: 2,
            explanation: 'The return type of accumulate is the same as the type of the initial value (the third parameter). This is why using 0 vs 0LL matters.',
          },
          {
            question: 'What happens if you accumulate a vector of large ints with an initial value of 0 (int)?',
            options: [
              'It automatically promotes to long long',
              'It may overflow because the result type is int',
              'It throws an exception',
              'It returns the correct result regardless',
            ],
            correctIndex: 1,
            explanation: 'Since the initial value 0 is an int, the accumulator is also int. If the sum exceeds INT_MAX, integer overflow occurs. Use 0LL to get a long long result.',
          },
          {
            question: 'How do you compute the product of all elements using std::accumulate?',
            options: [
              'accumulate(v.begin(), v.end(), 0)',
              'accumulate(v.begin(), v.end(), 1, multiplies<int>())',
              'accumulate(v.begin(), v.end(), 1, plus<int>())',
              'product(v.begin(), v.end())',
            ],
            correctIndex: 1,
            explanation: 'Pass 1 as the initial value (identity for multiplication) and multiplies<int>() as the binary operation to compute the product.',
          },
        ],
        challenge: {
          prompt: 'Write a function that uses std::accumulate to compute the running average of a vector of doubles.',
          starterCode: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

double computeAverage(const vector<double>& v) {
    // TODO: Use std::accumulate to sum all elements, then divide by the size
    // Handle the empty vector case (return 0.0)
    return 0.0;
}

int main() {
    vector<double> grades = {85.5, 92.0, 78.3, 95.1, 88.7};
    cout << "Average: " << computeAverage(grades) << "\\n"; // ~87.92
    cout << "Empty: " << computeAverage({}) << "\\n";       // 0
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

double computeAverage(const vector<double>& v) {
    if (v.empty()) return 0.0;
    double sum = accumulate(v.begin(), v.end(), 0.0);
    return sum / static_cast<double>(v.size());
}

int main() {
    vector<double> grades = {85.5, 92.0, 78.3, 95.1, 88.7};
    cout << "Average: " << computeAverage(grades) << "\\n"; // ~87.92
    cout << "Empty: " << computeAverage({}) << "\\n";       // 0
    return 0;
}`,
          hints: [
            'Use 0.0 (double) as the initial value to avoid integer truncation.',
            'Check for an empty vector before dividing to avoid division by zero.',
          ],
        },
      },
      {
        id: 'transform',
        title: 'std::transform',
        difficulty: 'intermediate',
        tags: ['transform', 'map', 'algorithm'],
        cheatSheetSummary: 'transform(begin, end, dest, func) applies func to each element and stores the result.',
        signature: 'OutputIt transform(InputIt first, InputIt last, OutputIt d_first, UnaryOp op);',
        sections: [
          {
            heading: 'Transforming Elements',
            content:
              'std::transform applies a function to each element in a range and stores the results in a destination range. It is the C++ equivalent of "map" in functional programming. It can also combine two ranges element-wise with a binary operation.',
            code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <cctype>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};

    // Transform to squares
    vector<int> squares(v.size());
    transform(v.begin(), v.end(), squares.begin(), [](int x) {
        return x * x;
    });
    cout << "Squares: ";
    for (int x : squares) cout << x << " ";
    cout << "\\n";

    // In-place transform
    transform(v.begin(), v.end(), v.begin(), [](int x) {
        return x * 10;
    });
    cout << "Times 10: ";
    for (int x : v) cout << x << " ";
    cout << "\\n";

    // Binary transform: element-wise sum of two vectors
    vector<int> a = {1, 2, 3};
    vector<int> b = {10, 20, 30};
    vector<int> sums(3);
    transform(a.begin(), a.end(), b.begin(), sums.begin(), plus<int>());
    cout << "Element-wise sum: ";
    for (int x : sums) cout << x << " ";
    cout << "\\n";

    // String transformation: to uppercase
    string text = "hello world";
    transform(text.begin(), text.end(), text.begin(), ::toupper);
    cout << "Uppercase: " << text << "\\n";

    return 0;
}`,
            output: `Squares: 1 4 9 16 25
Times 10: 10 20 30 40 50
Element-wise sum: 11 22 33
Uppercase: HELLO WORLD`,
            codeHighlightLines: [8, 9, 10, 14, 15, 16],
            diagram: {
              kind: 'mermaid' as const,
              code: `flowchart LR
  subgraph Input["Source: v"]
    A1["1"] --> A2["2"] --> A3["3"] --> A4["4"] --> A5["5"]
  end
  subgraph Lambda["x * x"]
    F["transform()"]
  end
  subgraph Output["Dest: squares"]
    B1["1"] --> B2["4"] --> B3["9"] --> B4["16"] --> B5["25"]
  end
  Input --> F --> Output

  style Input fill:#dbeafe,stroke:#3b82f6
  style Lambda fill:#fef3c7,stroke:#f59e0b
  style Output fill:#dcfce7,stroke:#22c55e`,
              caption: 'std::transform applies a function to each element of the source range and writes results to the destination range, like a functional "map" operation',
            },
          },
        ],
        quiz: [
          {
            question: 'Can std::transform modify elements in-place?',
            options: [
              'No, the destination must be a different container',
              'Yes, by setting the destination iterator to the same container\'s begin()',
              'Only with the binary version',
              'Only for numeric types',
            ],
            correctIndex: 1,
            explanation: 'std::transform can modify elements in-place by using the same container\'s begin() as both the source and destination iterator.',
          },
          {
            question: 'What is the binary version of std::transform used for?',
            options: [
              'Sorting two ranges simultaneously',
              'Combining two ranges element-wise using a binary operation',
              'Splitting one range into two',
              'Converting between binary and decimal',
            ],
            correctIndex: 1,
            explanation: 'The binary version takes two input ranges and applies a binary operation to corresponding elements, storing the results in the destination.',
          },
          {
            question: 'What must be true about the destination range when using std::transform?',
            options: [
              'It must be the same size as the source',
              'It must be empty',
              'It must have enough space to store the results (pre-allocated or using back_inserter)',
              'It must be a different type than the source',
            ],
            correctIndex: 2,
            explanation: 'The destination must have enough space allocated, either by pre-sizing the container or by using a back_inserter to grow it dynamically.',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes two vectors of equal length and returns a new vector containing the element-wise maximum of the two using std::transform.',
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> elementWiseMax(const vector<int>& a, const vector<int>& b) {
    // TODO: Use the binary form of std::transform to compute element-wise max
    vector<int> result;
    return result;
}

int main() {
    vector<int> a = {3, 7, 2, 9, 1};
    vector<int> b = {5, 4, 8, 1, 6};
    auto result = elementWiseMax(a, b);
    for (int x : result) cout << x << " ";
    // Expected: 5 7 8 9 6
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<int> elementWiseMax(const vector<int>& a, const vector<int>& b) {
    vector<int> result(a.size());
    transform(a.begin(), a.end(), b.begin(), result.begin(),
        [](int x, int y) { return max(x, y); });
    return result;
}

int main() {
    vector<int> a = {3, 7, 2, 9, 1};
    vector<int> b = {5, 4, 8, 1, 6};
    auto result = elementWiseMax(a, b);
    for (int x : result) cout << x << " ";
    // Expected: 5 7 8 9 6
    return 0;
}`,
          hints: [
            'Use the binary form of transform that takes two input ranges.',
            'The lambda should take two int parameters and return std::max(x, y).',
            'Pre-allocate the result vector with the correct size before calling transform.',
          ],
        },
      },
      {
        id: 'remove-erase',
        title: 'Remove-Erase Idiom',
        difficulty: 'intermediate',
        tags: ['remove', 'erase', 'delete', 'algorithm'],
        cheatSheetSummary: 'v.erase(remove(v.begin(), v.end(), val), v.end()) removes all occurrences. C++20 has std::erase.',
        signature: 'ForwardIt remove(ForwardIt first, ForwardIt last, const T& value);',
        sections: [
          {
            heading: 'Removing Elements from Containers',
            content:
              'std::remove does not actually remove elements from a container. It moves the "kept" elements to the front and returns an iterator to the new logical end. You must call erase() with this iterator to actually shrink the container. This two-step process is called the erase-remove idiom. C++20 introduced std::erase which combines both steps.',
            code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 2, 4, 2, 5};

    // Erase-remove idiom: remove all 2s
    v.erase(remove(v.begin(), v.end(), 2), v.end());
    cout << "After removing 2s: ";
    for (int x : v) cout << x << " ";
    cout << "\\n";

    // remove_if: remove based on condition
    vector<int> nums = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    nums.erase(
        remove_if(nums.begin(), nums.end(), [](int x) { return x % 2 == 0; }),
        nums.end()
    );
    cout << "Odd numbers: ";
    for (int x : nums) cout << x << " ";
    cout << "\\n";

    // C++20: std::erase and std::erase_if (simpler)
    // erase(v, 2);  // Remove all 2s
    // erase_if(v, [](int x) { return x > 5; });  // Remove if condition

    // Remove from string
    string text = "Hello, World!";
    text.erase(remove(text.begin(), text.end(), ','), text.end());
    cout << "Without commas: " << text << "\\n";

    return 0;
}`,
            output: `After removing 2s: 1 3 4 5
Odd numbers: 1 3 5 7 9
Without commas: Hello World!`,
            tip: 'In C++20, use std::erase(container, value) and std::erase_if(container, predicate) for a cleaner one-liner that replaces the erase-remove idiom.',
            analogy: 'Think of it like rearranging seats in a theater: remove() slides all the "keepers" to the front and tells you where the empty seats start, but the old seats are still there. You then call erase() to actually tear out the empty rows.',
            codeHighlightLines: [5, 12, 13, 14],
            diagram: {
              kind: 'custom' as const,
              type: 'algorithm-steps' as const,
              data: {
                title: 'Erase-Remove Idiom: remove all 2s from [1, 2, 3, 2, 4, 2, 5]',
                steps: [
                  {
                    label: 'Original',
                    description: 'Vector contains 7 elements, three are 2s',
                    state: ['1', '2', '3', '2', '4', '2', '5'],
                    highlights: [1, 3, 5],
                  },
                  {
                    label: 'remove() pass 1',
                    description: 'Shift keepers left: 1 stays, skip 2, move 3 left',
                    state: ['1', '3', '3', '2', '4', '2', '5'],
                    highlights: [0, 1],
                  },
                  {
                    label: 'remove() pass 2',
                    description: 'Continue: move 4 and 5 left, return new logical end',
                    state: ['1', '3', '4', '5', '?', '?', '?'],
                    highlights: [0, 1, 2, 3],
                  },
                  {
                    label: 'After remove()',
                    description: 'Logical end at index 4. Elements past it are unspecified garbage.',
                    state: ['1', '3', '4', '5', '|', '?', '?'],
                    highlights: [4],
                  },
                  {
                    label: 'After erase()',
                    description: 'erase() removes from logical end to physical end. Size is now 4.',
                    state: ['1', '3', '4', '5'],
                    highlights: [],
                  },
                ],
              },
              caption: 'remove() shifts kept elements left and returns new logical end. erase() truncates the vector to the new logical end. C++20 std::erase() combines both steps.',
            },
          },
        ],
        quiz: [
          {
            question: 'Does std::remove actually delete elements from a container?',
            options: [
              'Yes, it removes and deallocates them',
              'No, it moves kept elements to the front and returns a new logical end',
              'Yes, but only for vectors',
              'No, it only marks elements as deleted',
            ],
            correctIndex: 1,
            explanation: 'std::remove does not change the container size. It shifts kept elements to the front and returns an iterator to the new logical end. You must call erase() to actually shrink the container.',
          },
          {
            question: 'What is the correct erase-remove idiom to remove all zeros from vector v?',
            options: [
              'v.remove(0)',
              'remove(v.begin(), v.end(), 0)',
              'v.erase(remove(v.begin(), v.end(), 0), v.end())',
              'erase(v, 0) (pre-C++20 only)',
            ],
            correctIndex: 2,
            explanation: 'The erase-remove idiom combines remove() (which returns the new logical end) with erase() (which actually removes the elements from the container).',
          },
          {
            question: 'In C++20, how can you remove all even numbers from a vector v?',
            options: [
              'v.erase_if([](int x) { return x % 2 == 0; })',
              'std::erase_if(v, [](int x) { return x % 2 == 0; })',
              'std::remove_if(v, [](int x) { return x % 2 == 0; })',
              'v.remove_if([](int x) { return x % 2 == 0; })',
            ],
            correctIndex: 1,
            explanation: 'C++20 introduced std::erase_if as a free function that combines the erase-remove idiom into a single call.',
          },
        ],
        challenge: {
          prompt: 'Write a function that removes all duplicate characters from a string while preserving the order of first occurrences (e.g., "abracadabra" becomes "abrcd").',
          starterCode: `#include <iostream>
#include <string>
#include <algorithm>
#include <set>
using namespace std;

string removeDuplicateChars(string s) {
    // TODO: Remove duplicate characters, keeping only the first occurrence
    // Hint: Use remove_if with a set to track seen characters
    return s;
}

int main() {
    cout << removeDuplicateChars("abracadabra") << "\\n"; // "abrcd"
    cout << removeDuplicateChars("hello world") << "\\n"; // "helo wrd"
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
#include <algorithm>
#include <set>
using namespace std;

string removeDuplicateChars(string s) {
    set<char> seen;
    auto newEnd = remove_if(s.begin(), s.end(), [&seen](char c) {
        if (seen.count(c)) return true;
        seen.insert(c);
        return false;
    });
    s.erase(newEnd, s.end());
    return s;
}

int main() {
    cout << removeDuplicateChars("abracadabra") << "\\n"; // "abrcd"
    cout << removeDuplicateChars("hello world") << "\\n"; // "helo wrd"
    return 0;
}`,
          hints: [
            'Use a std::set<char> to keep track of characters you have already seen.',
            'Use remove_if with a lambda that captures the set by reference and returns true for already-seen characters.',
            'Do not forget to call erase() after remove_if to actually shrink the string.',
          ],
        },
      },
      {
        id: 'unique',
        title: 'std::unique',
        difficulty: 'intermediate',
        tags: ['unique', 'deduplicate', 'algorithm'],
        cheatSheetSummary: 'unique(begin, end) removes consecutive duplicates. Sort first, then erase-unique to deduplicate fully.',
        signature: 'ForwardIt unique(ForwardIt first, ForwardIt last);',
        sections: [
          {
            heading: 'Removing Duplicates',
            content:
              'std::unique removes consecutive duplicate elements, returning an iterator to the new logical end. To remove all duplicates (not just consecutive ones), sort the range first, then apply unique, then erase. This is the standard approach to deduplicate a vector.',
            code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // Remove consecutive duplicates only
    vector<int> v1 = {1, 1, 2, 2, 2, 3, 1, 1};
    auto newEnd = unique(v1.begin(), v1.end());
    v1.erase(newEnd, v1.end());
    cout << "Consecutive unique: ";
    for (int x : v1) cout << x << " ";
    cout << "\\n";

    // Full deduplication: sort + unique + erase
    vector<int> v2 = {5, 3, 1, 4, 2, 3, 5, 1};
    sort(v2.begin(), v2.end());
    v2.erase(unique(v2.begin(), v2.end()), v2.end());
    cout << "Fully deduplicated: ";
    for (int x : v2) cout << x << " ";
    cout << "\\n";

    // unique with custom predicate
    vector<int> v3 = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    // Remove consecutive elements where both are even
    v3.erase(
        unique(v3.begin(), v3.end(), [](int a, int b) {
            return a % 2 == 0 && b % 2 == 0;
        }),
        v3.end()
    );
    cout << "Custom unique: ";
    for (int x : v3) cout << x << " ";
    cout << "\\n";

    return 0;
}`,
            output: `Consecutive unique: 1 2 3 1
Fully deduplicated: 1 2 3 4 5
Custom unique: 1 2 3 4 5 6 7 8 9`,
          },
        ],
        quiz: [
          {
            question: 'What does std::unique remove?',
            options: [
              'All duplicate elements in the range',
              'Only consecutive duplicate elements',
              'The first occurrence of each element',
              'Elements that appear exactly once',
            ],
            correctIndex: 1,
            explanation: 'std::unique only removes consecutive duplicates. To remove all duplicates, you must sort the range first, then apply unique.',
          },
          {
            question: 'What is the standard idiom for fully deduplicating a vector?',
            options: [
              'unique(v.begin(), v.end())',
              'sort + unique + erase',
              'remove_duplicates(v.begin(), v.end())',
              'v.deduplicate()',
            ],
            correctIndex: 1,
            explanation: 'The standard idiom is: sort the vector, then use unique to shift duplicates to the end, then erase the duplicates. This is sort + unique + erase.',
          },
          {
            question: 'What does std::unique return?',
            options: [
              'The number of unique elements',
              'A new container with unique elements',
              'An iterator to the new logical end (past the last unique element)',
              'A boolean indicating if duplicates were found',
            ],
            correctIndex: 2,
            explanation: 'Like std::remove, std::unique returns an iterator to the new logical end. Elements past this point are unspecified and should be erased.',
          },
        ],
        challenge: {
          prompt: 'Write a function that takes a vector of strings and returns only the unique strings while preserving their original order (without sorting).',
          starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <set>
#include <algorithm>
using namespace std;

vector<string> uniquePreserveOrder(const vector<string>& input) {
    // TODO: Return unique strings in their original order of first appearance
    vector<string> result;
    return result;
}

int main() {
    vector<string> words = {"apple", "banana", "apple", "cherry", "banana", "date"};
    auto unique_words = uniquePreserveOrder(words);
    for (const auto& w : unique_words) cout << w << " ";
    // Expected: apple banana cherry date
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <string>
#include <set>
#include <algorithm>
using namespace std;

vector<string> uniquePreserveOrder(const vector<string>& input) {
    vector<string> result;
    set<string> seen;
    for (const auto& s : input) {
        if (seen.find(s) == seen.end()) {
            seen.insert(s);
            result.push_back(s);
        }
    }
    return result;
}

int main() {
    vector<string> words = {"apple", "banana", "apple", "cherry", "banana", "date"};
    auto unique_words = uniquePreserveOrder(words);
    for (const auto& w : unique_words) cout << w << " ";
    // Expected: apple banana cherry date
    return 0;
}`,
          hints: [
            'You cannot use sort + unique here because it would change the order.',
            'Use a std::set to track which strings you have already seen.',
            'Iterate through the input and only add strings to the result if they are not in the set.',
          ],
        },
      },
      {
        id: 'reverse',
        title: 'std::reverse',
        difficulty: 'beginner',
        tags: ['reverse', 'algorithm'],
        cheatSheetSummary: 'reverse(begin, end) reverses elements in-place. O(n) time, O(1) space.',
        signature: 'void reverse(BidirIt first, BidirIt last);',
        sections: [
          {
            heading: 'Reversing Ranges',
            content:
              'std::reverse reverses the order of elements in a range in-place. It works with any bidirectional iterator, including vectors, strings, arrays, and lists. For a non-modifying version, use reverse iterators (rbegin/rend) or std::reverse_copy.',
            code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    // Reverse a vector
    vector<int> v = {1, 2, 3, 4, 5};
    reverse(v.begin(), v.end());
    cout << "Reversed: ";
    for (int x : v) cout << x << " ";
    cout << "\\n";

    // Reverse part of a vector
    vector<int> v2 = {1, 2, 3, 4, 5, 6, 7};
    reverse(v2.begin() + 2, v2.begin() + 5);  // Reverse elements 2-4
    cout << "Partial reverse: ";
    for (int x : v2) cout << x << " ";
    cout << "\\n";

    // Reverse a string
    string s = "Hello, World!";
    reverse(s.begin(), s.end());
    cout << "Reversed string: " << s << "\\n";

    // reverse_copy: non-modifying
    vector<int> src = {1, 2, 3, 4, 5};
    vector<int> dst(src.size());
    reverse_copy(src.begin(), src.end(), dst.begin());
    cout << "Original: ";
    for (int x : src) cout << x << " ";
    cout << "\\nCopy reversed: ";
    for (int x : dst) cout << x << " ";
    cout << "\\n";

    // Palindrome check
    string word = "racecar";
    string rev = word;
    reverse(rev.begin(), rev.end());
    cout << word << " is palindrome: " << (word == rev) << "\\n";

    return 0;
}`,
            output: `Reversed: 5 4 3 2 1
Partial reverse: 1 2 5 4 3 6 7
Reversed string: !dlroW ,olleH
Original: 1 2 3 4 5
Copy reversed: 5 4 3 2 1
racecar is palindrome: 1`,
          },
        ],
        quiz: [
          {
            question: 'What type of iterator does std::reverse require?',
            options: ['Input iterator', 'Forward iterator', 'Bidirectional iterator', 'Random access iterator'],
            correctIndex: 2,
            explanation: 'std::reverse requires bidirectional iterators because it needs to traverse from both ends toward the middle, swapping elements.',
          },
          {
            question: 'What is the space complexity of std::reverse?',
            options: ['O(n)', 'O(log n)', 'O(1)', 'O(n/2)'],
            correctIndex: 2,
            explanation: 'std::reverse works in-place by swapping elements from the two ends, using only O(1) extra space.',
          },
          {
            question: 'How do you reverse only elements from index 2 to index 5 (inclusive) in a vector v?',
            options: [
              'reverse(v[2], v[5])',
              'reverse(v.begin() + 2, v.begin() + 6)',
              'reverse(v.begin() + 2, v.begin() + 5)',
              'reverse(&v[2], &v[5])',
            ],
            correctIndex: 1,
            explanation: 'The end iterator is exclusive, so to include index 5, you need v.begin() + 6. The range [begin+2, begin+6) covers indices 2, 3, 4, 5.',
          },
        ],
        challenge: {
          prompt: 'Write a function that reverses each word in a sentence while keeping the word order intact. For example, "Hello World" becomes "olleH dlroW".',
          starterCode: `#include <iostream>
#include <string>
#include <algorithm>
#include <sstream>
using namespace std;

string reverseWords(const string& sentence) {
    // TODO: Reverse each individual word but keep word order the same
    return "";
}

int main() {
    cout << reverseWords("Hello World") << "\\n";       // "olleH dlroW"
    cout << reverseWords("C++ is awesome") << "\\n";    // "++C si emosewa"
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
#include <algorithm>
#include <sstream>
using namespace std;

string reverseWords(const string& sentence) {
    istringstream iss(sentence);
    string word, result;
    bool first = true;
    while (iss >> word) {
        reverse(word.begin(), word.end());
        if (!first) result += " ";
        result += word;
        first = false;
    }
    return result;
}

int main() {
    cout << reverseWords("Hello World") << "\\n";       // "olleH dlroW"
    cout << reverseWords("C++ is awesome") << "\\n";    // "++C si emosewa"
    return 0;
}`,
          hints: [
            'Use a stringstream to extract individual words from the sentence.',
            'Apply std::reverse to each word independently.',
            'Reconstruct the sentence by joining the reversed words with spaces.',
          ],
        },
      },
      {
        id: 'min-max',
        title: 'Min & Max',
        difficulty: 'beginner',
        tags: ['min', 'max', 'min_element', 'max_element', 'minmax', 'algorithm'],
        cheatSheetSummary: 'min(a,b), max(a,b) for pairs. min_element/max_element for ranges. minmax_element for both.',
        signature: 'ForwardIt min_element(ForwardIt first, ForwardIt last);',
        sections: [
          {
            heading: 'Min and Max Operations',
            content:
              'C++ provides several ways to find minimum and maximum values: std::min and std::max for pairs of values, std::min_element and std::max_element for ranges, and std::minmax_element to find both in a single pass (which is more efficient than calling both separately).',
            code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    // Min/max of two values
    cout << "min(3, 7) = " << min(3, 7) << "\\n";
    cout << "max(3, 7) = " << max(3, 7) << "\\n";

    // Min/max of initializer list
    cout << "min({5,3,1,4,2}) = " << min({5, 3, 1, 4, 2}) << "\\n";
    cout << "max({5,3,1,4,2}) = " << max({5, 3, 1, 4, 2}) << "\\n";

    // Min/max element in a range
    vector<int> v = {30, 10, 50, 20, 40};
    auto minIt = min_element(v.begin(), v.end());
    auto maxIt = max_element(v.begin(), v.end());
    cout << "Min: " << *minIt << " at index " << (minIt - v.begin()) << "\\n";
    cout << "Max: " << *maxIt << " at index " << (maxIt - v.begin()) << "\\n";

    // minmax_element: both in one pass
    auto [lo, hi] = minmax_element(v.begin(), v.end());
    cout << "Min=" << *lo << ", Max=" << *hi << "\\n";

    // With custom comparator
    vector<string> words = {"banana", "fig", "apple", "kiwi"};
    auto shortest = min_element(words.begin(), words.end(),
        [](const string& a, const string& b) {
            return a.length() < b.length();
        });
    cout << "Shortest word: " << *shortest << "\\n";

    // Clamp (C++17): restrict value to a range
    cout << "clamp(15, 0, 10) = " << clamp(15, 0, 10) << "\\n";
    cout << "clamp(-5, 0, 10) = " << clamp(-5, 0, 10) << "\\n";
    cout << "clamp(5, 0, 10) = " << clamp(5, 0, 10) << "\\n";

    return 0;
}`,
            output: `min(3, 7) = 3
max(3, 7) = 7
min({5,3,1,4,2}) = 1
max({5,3,1,4,2}) = 5
Min: 10 at index 1
Max: 50 at index 2
Min=10, Max=50
Shortest word: fig
clamp(15, 0, 10) = 10
clamp(-5, 0, 10) = 0
clamp(5, 0, 10) = 5`,
          },
        ],
        quiz: [
          {
            question: 'What does std::minmax_element return?',
            options: [
              'A pair of values (min, max)',
              'A pair of iterators (min_iterator, max_iterator)',
              'A struct with min and max fields',
              'Two separate values via output parameters',
            ],
            correctIndex: 1,
            explanation: 'std::minmax_element returns a std::pair of iterators: first points to the minimum element, second points to the maximum element.',
          },
          {
            question: 'What does std::clamp(15, 0, 10) return? (C++17)',
            options: ['15', '0', '10', 'An exception'],
            correctIndex: 2,
            explanation: 'std::clamp restricts a value to a range. Since 15 > 10 (the high bound), it returns 10.',
          },
          {
            question: 'Why is minmax_element preferred over calling min_element and max_element separately?',
            options: [
              'It returns different types',
              'It makes only one pass through the data instead of two',
              'It works on unsorted data while the others do not',
              'It uses less memory',
            ],
            correctIndex: 1,
            explanation: 'minmax_element finds both the minimum and maximum in a single pass (roughly 1.5n comparisons), while calling min_element and max_element separately requires two passes (2n comparisons).',
          },
        ],
        challenge: {
          prompt: 'Write a function that finds the second largest element in a vector. Return it by value. Assume the vector has at least 2 elements.',
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int secondLargest(const vector<int>& v) {
    // TODO: Find the second largest element
    // Do not modify the input vector
    return 0;
}

int main() {
    cout << secondLargest({3, 1, 4, 1, 5, 9, 2, 6}) << "\\n"; // 6
    cout << secondLargest({10, 10, 10, 5}) << "\\n";           // 5
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int secondLargest(const vector<int>& v) {
    auto maxIt = max_element(v.begin(), v.end());
    int maxVal = *maxIt;
    int secondMax = *min_element(v.begin(), v.end()); // start with smallest
    for (int x : v) {
        if (x < maxVal && x > secondMax) {
            secondMax = x;
        }
    }
    // Handle case where all elements might be the same except some
    // Alternative: sort a copy and pick second distinct
    return secondMax;
}

int main() {
    cout << secondLargest({3, 1, 4, 1, 5, 9, 2, 6}) << "\\n"; // 6
    cout << secondLargest({10, 10, 10, 5}) << "\\n";           // 5
    return 0;
}`,
          hints: [
            'First find the maximum value using max_element.',
            'Then iterate through the vector to find the largest value that is strictly less than the maximum.',
            'Initialize your second-max candidate to the smallest element in the vector.',
          ],
        },
      },
      {
        id: 'for-each',
        title: 'std::for_each',
        difficulty: 'beginner',
        tags: ['for_each', 'iteration', 'algorithm'],
        cheatSheetSummary: 'for_each(begin, end, func) applies func to each element. Often replaced by range-based for.',
        signature: 'UnaryFunc for_each(InputIt first, InputIt last, UnaryFunc f);',
        sections: [
          {
            heading: 'Applying Functions to Ranges',
            content:
              'std::for_each applies a function to each element in a range. While range-based for loops have largely replaced it for simple iteration, for_each is still useful with algorithm pipelines and when you need the function object returned (it can accumulate state).',
            code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};

    // Basic for_each
    cout << "Elements: ";
    for_each(v.begin(), v.end(), [](int x) {
        cout << x << " ";
    });
    cout << "\\n";

    // Modify elements
    for_each(v.begin(), v.end(), [](int& x) {
        x *= 2;
    });
    cout << "Doubled: ";
    for_each(v.begin(), v.end(), [](int x) { cout << x << " "; });
    cout << "\\n";

    // for_each returns the function object (can carry state)
    struct Sum {
        int total = 0;
        void operator()(int x) { total += x; }
    };
    Sum result = for_each(v.begin(), v.end(), Sum());
    cout << "Sum: " << result.total << "\\n";

    // for_each on part of a range
    cout << "First 3: ";
    for_each(v.begin(), v.begin() + 3, [](int x) { cout << x << " "; });
    cout << "\\n";

    return 0;
}`,
            output: `Elements: 1 2 3 4 5
Doubled: 2 4 6 8 10
Sum: 30
First 3: 2 4 6`,
            note: 'In most cases, a range-based for loop is simpler and more readable than for_each. Use for_each when working with algorithm chains or when you need the returned function object.',
          },
        ],
        quiz: [
          {
            question: 'What does std::for_each return?',
            options: [
              'void',
              'The number of elements processed',
              'The function object (which may carry accumulated state)',
              'An iterator to the last element processed',
            ],
            correctIndex: 2,
            explanation: 'std::for_each returns the (possibly modified) function object. This is useful when the function object accumulates state, like a sum or count.',
          },
          {
            question: 'How do you modify elements in-place using std::for_each?',
            options: [
              'It is not possible; for_each is read-only',
              'Pass a lambda that takes the element by reference (int& x)',
              'Use for_each_mut instead',
              'Pass a pointer to the element',
            ],
            correctIndex: 1,
            explanation: 'By taking the element by reference in the lambda (e.g., [](int& x) { x *= 2; }), for_each can modify the elements in-place.',
          },
          {
            question: 'When should you prefer std::for_each over a range-based for loop?',
            options: [
              'Always, as it is more efficient',
              'When you need the function object returned with accumulated state',
              'When iterating over arrays',
              'When you need break or continue',
            ],
            correctIndex: 1,
            explanation: 'for_each is useful when the function object carries state (like a running sum) and you need that state returned. Range-based for loops cannot return state and are generally preferred for readability.',
          },
        ],
        challenge: {
          prompt: 'Write a function using std::for_each that counts how many elements are positive, negative, and zero in a vector, returning the counts as a struct.',
          starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Counts {
    int positive = 0;
    int negative = 0;
    int zero = 0;
};

Counts countSigns(const vector<int>& v) {
    // TODO: Use std::for_each to count positive, negative, and zero elements
    Counts c;
    return c;
}

int main() {
    vector<int> v = {-3, 0, 5, -1, 0, 7, -2, 8};
    auto c = countSigns(v);
    cout << "Positive: " << c.positive << "\\n"; // 3
    cout << "Negative: " << c.negative << "\\n"; // 3
    cout << "Zero: " << c.zero << "\\n";         // 2
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Counts {
    int positive = 0;
    int negative = 0;
    int zero = 0;
};

Counts countSigns(const vector<int>& v) {
    Counts c;
    for_each(v.begin(), v.end(), [&c](int x) {
        if (x > 0) c.positive++;
        else if (x < 0) c.negative++;
        else c.zero++;
    });
    return c;
}

int main() {
    vector<int> v = {-3, 0, 5, -1, 0, 7, -2, 8};
    auto c = countSigns(v);
    cout << "Positive: " << c.positive << "\\n"; // 3
    cout << "Negative: " << c.negative << "\\n"; // 3
    cout << "Zero: " << c.zero << "\\n";         // 2
    return 0;
}`,
          hints: [
            'Capture the Counts struct by reference in the lambda using [&c].',
            'Inside the lambda, check if x > 0, x < 0, or x == 0 and increment the appropriate counter.',
            'Alternatively, use a stateful function object whose operator() updates internal counters.',
          ],
        },
      },
      {
        id: 'copy',
        title: 'std::copy',
        difficulty: 'beginner',
        tags: ['copy', 'copy_if', 'copy_n', 'algorithm'],
        cheatSheetSummary: 'copy(begin, end, dest) copies a range. copy_if adds filtering. copy_n copies exactly n elements.',
        signature: 'OutputIt copy(InputIt first, InputIt last, OutputIt d_first);',
        sections: [
          {
            heading: 'Copying Elements',
            content:
              'std::copy copies elements from a source range to a destination. std::copy_if copies only elements satisfying a predicate. std::copy_n copies exactly n elements. These are useful for filtering data into new containers or for outputting to streams with ostream_iterator.',
            code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>
using namespace std;

int main() {
    vector<int> src = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    // Copy to another vector
    vector<int> dest(src.size());
    copy(src.begin(), src.end(), dest.begin());
    cout << "Copied: ";
    for (int x : dest) cout << x << " ";
    cout << "\\n";

    // copy_if: filter to new container
    vector<int> evens;
    copy_if(src.begin(), src.end(), back_inserter(evens),
        [](int x) { return x % 2 == 0; });
    cout << "Evens: ";
    for (int x : evens) cout << x << " ";
    cout << "\\n";

    // copy_n: copy first n elements
    vector<int> first5(5);
    copy_n(src.begin(), 5, first5.begin());
    cout << "First 5: ";
    for (int x : first5) cout << x << " ";
    cout << "\\n";

    // Copy to output stream
    cout << "Stream copy: ";
    copy(src.begin(), src.end(), ostream_iterator<int>(cout, " "));
    cout << "\\n";

    // copy_backward: copy in reverse order to handle overlapping ranges
    vector<int> v = {1, 2, 3, 4, 5, 0, 0, 0, 0, 0};
    copy_backward(v.begin(), v.begin() + 5, v.begin() + 7);
    cout << "Shifted right: ";
    for (int x : v) cout << x << " ";
    cout << "\\n";

    return 0;
}`,
            output: `Copied: 1 2 3 4 5 6 7 8 9 10
Evens: 2 4 6 8 10
First 5: 1 2 3 4 5
Stream copy: 1 2 3 4 5 6 7 8 9 10
Shifted right: 1 2 1 2 3 4 5 0 0 0`,
            tip: 'Use back_inserter(container) as the destination when the target container needs to grow. It calls push_back for each copied element.',
          },
        ],
        quiz: [
          {
            question: 'What does back_inserter do when used as the destination for std::copy?',
            options: [
              'It overwrites elements from the back',
              'It calls push_back for each copied element, growing the container',
              'It reverses the order of copied elements',
              'It inserts elements at the front of the container',
            ],
            correctIndex: 1,
            explanation: 'back_inserter creates an output iterator that calls push_back on the container for each assigned element, automatically growing the container.',
          },
          {
            question: 'What is the difference between std::copy and std::copy_if?',
            options: [
              'copy works on vectors, copy_if works on arrays',
              'copy copies all elements, copy_if only copies elements satisfying a predicate',
              'copy_if is faster than copy',
              'copy_if copies elements in reverse order',
            ],
            correctIndex: 1,
            explanation: 'std::copy copies all elements from the source range, while std::copy_if only copies elements for which the predicate function returns true.',
          },
          {
            question: 'When should you use copy_backward instead of copy?',
            options: [
              'When you want to copy elements in reverse order',
              'When copying from a larger container to a smaller one',
              'When the source and destination ranges overlap and the destination starts after the source',
              'When the container does not support forward iterators',
            ],
            correctIndex: 2,
            explanation: 'copy_backward copies elements from the end toward the beginning, which is necessary when source and destination overlap and the destination starts after the source to avoid overwriting unread elements.',
          },
        ],
        challenge: {
          prompt: 'Write a function that copies only the strings from a vector that have a length greater than a given threshold into a new vector, using std::copy_if.',
          starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <iterator>
using namespace std;

vector<string> filterByLength(const vector<string>& words, size_t minLen) {
    // TODO: Use copy_if to copy strings longer than minLen into a new vector
    vector<string> result;
    return result;
}

int main() {
    vector<string> words = {"hi", "hello", "hey", "greetings", "yo", "welcome"};
    auto long_words = filterByLength(words, 3);
    for (const auto& w : long_words) cout << w << " ";
    // Expected: hello greetings welcome
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <iterator>
using namespace std;

vector<string> filterByLength(const vector<string>& words, size_t minLen) {
    vector<string> result;
    copy_if(words.begin(), words.end(), back_inserter(result),
        [minLen](const string& s) { return s.length() > minLen; });
    return result;
}

int main() {
    vector<string> words = {"hi", "hello", "hey", "greetings", "yo", "welcome"};
    auto long_words = filterByLength(words, 3);
    for (const auto& w : long_words) cout << w << " ";
    // Expected: hello greetings welcome
    return 0;
}`,
          hints: [
            'Use std::copy_if with a lambda that checks s.length() > minLen.',
            'Use back_inserter(result) as the destination to grow the result vector automatically.',
            'Capture minLen in the lambda by value.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------ */
  /*  String Methods                                               */
  /* ------------------------------------------------------------ */
  {
    id: 'string-methods',
    label: 'String Methods',
    icon: 'Type',
    entries: [
      {
        id: 'str-length',
        title: 'String Length & Size',
        difficulty: 'beginner',
        tags: ['string', 'length', 'size', 'empty'],
        cheatSheetSummary: 's.length() and s.size() both return the number of characters. s.empty() checks if empty.',
        signature: 'size_type length() const noexcept;',
        sections: [
          {
            heading: 'String Size Operations',
            content:
              'std::string provides length() and size() which are identical - both return the number of characters. empty() returns true if the string has no characters. These are O(1) operations since the string stores its length internally.',
            code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello, World!";

    cout << "length(): " << s.length() << "\\n";
    cout << "size(): " << s.size() << "\\n";
    cout << "empty(): " << s.empty() << "\\n";

    string empty_str = "";
    cout << "Empty string empty(): " << empty_str.empty() << "\\n";

    // Max size (theoretical maximum)
    cout << "max_size(): " << s.max_size() << "\\n";

    // Capacity (allocated memory)
    cout << "capacity(): " << s.capacity() << "\\n";

    // Resize
    string padded = "Hello";
    padded.resize(10, '.');
    cout << "Resized: \\"" << padded << "\\" (len=" << padded.length() << ")\\n";

    padded.resize(3);
    cout << "Truncated: \\"" << padded << "\\"\\n";

    return 0;
}`,
            output: `length(): 13
size(): 13
empty(): 0
Empty string empty(): 1
max_size(): 9223372036854775807
capacity(): 22
Resized: "Hello....." (len=10)
Truncated: "Hel"`,
          },
        ],
        quiz: [
          {
            question: 'What is the difference between length() and size() for std::string?',
            options: [
              'length() returns characters, size() returns bytes',
              'They are identical - both return the number of characters',
              'length() includes the null terminator, size() does not',
              'size() is faster than length()',
            ],
            correctIndex: 1,
            explanation: 'length() and size() are identical for std::string. Both return the number of characters. size() exists for consistency with other STL containers.',
          },
          {
            question: 'What is the time complexity of calling empty() on a std::string?',
            options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
            correctIndex: 2,
            explanation: 'empty() is O(1) because std::string stores its length internally. It simply checks if the stored length is zero.',
          },
          {
            question: 'What happens when you call s.resize(10, \'.\') on a string with 5 characters?',
            options: [
              'It truncates to 10 characters',
              'It pads the string with 5 dots at the end',
              'It replaces all characters with dots',
              'It throws an exception because the string is too short',
            ],
            correctIndex: 1,
            explanation: 'resize(10, \'.\') extends the string to length 10, filling the new positions with the specified character (dot). The original 5 characters remain unchanged.',
          },
        ],
        challenge: {
          prompt: 'Write a function that pads a string to a given width. If the string is shorter, pad with a given character on the right. If longer or equal, return unchanged.',
          starterCode: `#include <iostream>
#include <string>
using namespace std;

string padRight(const string& s, size_t width, char padChar = ' ') {
    // TODO: Return a string padded on the right to the given width
    return s;
}

int main() {
    cout << "[" << padRight("hello", 10, '.') << "]\\n";  // [hello.....]
    cout << "[" << padRight("hello world", 5) << "]\\n";   // [hello world]
    cout << "[" << padRight("hi", 6) << "]\\n";            // [hi    ]
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

string padRight(const string& s, size_t width, char padChar = ' ') {
    if (s.length() >= width) return s;
    string result = s;
    result.resize(width, padChar);
    return result;
}

int main() {
    cout << "[" << padRight("hello", 10, '.') << "]\\n";  // [hello.....]
    cout << "[" << padRight("hello world", 5) << "]\\n";   // [hello world]
    cout << "[" << padRight("hi", 6) << "]\\n";            // [hi    ]
    return 0;
}`,
          hints: [
            'Check if the string is already at or above the desired width.',
            'Use string::resize(width, padChar) to extend the string with the pad character.',
          ],
        },
      },
      {
        id: 'str-find',
        title: 'String Find & Search',
        difficulty: 'beginner',
        tags: ['string', 'find', 'search', 'rfind', 'npos'],
        cheatSheetSummary: 's.find("sub") returns position or string::npos. rfind() searches from the end.',
        signature: 'size_type find(const string& str, size_type pos = 0) const;',
        sections: [
          {
            heading: 'Searching in Strings',
            content:
              'The find() method searches for a substring or character and returns the position of the first match. It returns string::npos (a large constant) if not found. rfind() searches backward from the end. find_first_of() and find_last_of() search for any character from a set.',
            code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello, World! Hello, C++!";

    // Find first occurrence
    size_t pos = s.find("Hello");
    cout << "First 'Hello' at: " << pos << "\\n";

    // Find from position
    pos = s.find("Hello", 1);
    cout << "Second 'Hello' at: " << pos << "\\n";

    // Find not found
    pos = s.find("Python");
    if (pos == string::npos) {
        cout << "'Python' not found\\n";
    }

    // rfind: search backward
    pos = s.rfind("Hello");
    cout << "Last 'Hello' at: " << pos << "\\n";

    // Find a character
    pos = s.find('!');
    cout << "First '!' at: " << pos << "\\n";

    // find_first_of: any character from set
    pos = s.find_first_of("aeiou");
    cout << "First vowel at: " << pos << " ('" << s[pos] << "')\\n";

    // find_last_of
    pos = s.find_last_of("aeiou");
    cout << "Last vowel at: " << pos << " ('" << s[pos] << "')\\n";

    // find_first_not_of
    string num = "   42   ";
    pos = num.find_first_not_of(' ');
    cout << "First non-space in \\"" << num << "\\": " << pos << "\\n";

    return 0;
}`,
            output: `First 'Hello' at: 0
Second 'Hello' at: 14
'Python' not found
Last 'Hello' at: 14
First '!' at: 12
First vowel at: 1 ('e')
Last vowel at: 22 ('+')
First non-space in "   42   ": 3`,
            note: 'The + character is not a vowel. The find_last_of output for vowels would be the last actual vowel in the string depending on content.',
            codeHighlightLines: [5, 9, 19, 24],
            diagram: {
              kind: 'custom' as const,
              type: 'array' as const,
              data: {
                title: 'String Search Positions',
                array: ['H','e','l','l','o',',',' ','W','o','r','l','d','!',' ','H','e','l','l','o',',',' ','C','+','+','!'],
                labels: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
                highlights: [
                  { index: 0, color: '#3b82f6', label: 'find("Hello") → 0' },
                  { index: 14, color: '#22c55e', label: 'find("Hello",1) → 14' },
                  { index: 12, color: '#f59e0b', label: 'find(\'!\') → 12' },
                  { index: 1, color: '#a855f7', label: 'find_first_of("aeiou") → 1' },
                ],
                pointers: [
                  { index: 0, label: 'first match', color: '#3b82f6' },
                  { index: 14, label: 'rfind()', color: '#22c55e' },
                ],
              },
              caption: 'find() scans left-to-right and returns the first match position; rfind() scans right-to-left. string::npos indicates "not found".',
            },
          },
        ],
        quiz: [
          {
            question: 'What does string::npos represent?',
            options: [
              'The position 0 (beginning of string)',
              'The last valid index',
              'A special constant indicating "not found"',
              'The null terminator position',
            ],
            correctIndex: 2,
            explanation: 'string::npos is a special constant (typically the maximum value of size_t) used to indicate that a search did not find a match.',
          },
          {
            question: 'What does find_first_of("aeiou") search for?',
            options: [
              'The substring "aeiou"',
              'The first occurrence of any single character from the set {a, e, i, o, u}',
              'All vowels in the string',
              'The first non-vowel character',
            ],
            correctIndex: 1,
            explanation: 'find_first_of searches for the first occurrence of any character in the given set. It checks each character in the string against every character in the argument.',
          },
          {
            question: 'How does rfind() differ from find()?',
            options: [
              'rfind() searches for the pattern in reverse (reversed pattern)',
              'rfind() searches backward from the end, returning the last occurrence',
              'rfind() is case-insensitive',
              'rfind() returns the count of matches',
            ],
            correctIndex: 1,
            explanation: 'rfind() searches the string from right to left, returning the position of the last occurrence of the substring. The pattern itself is not reversed.',
          },
          {
            question: 'What does s.find("Hello", 1) do?',
            options: [
              'Finds the first "Hello" and returns position 1',
              'Finds "Hello" starting the search from position 1',
              'Finds exactly 1 occurrence of "Hello"',
              'Finds "Hello" and offsets the result by 1',
            ],
            correctIndex: 1,
            explanation: 'The second parameter of find() specifies the starting position for the search. s.find("Hello", 1) starts searching from index 1, skipping any match at index 0.',
          },
        ],
        challenge: {
          prompt: 'Write a function that counts how many times a substring appears in a string (including overlapping occurrences). For example, "aa" appears 2 times in "aaa".',
          starterCode: `#include <iostream>
#include <string>
using namespace std;

int countOccurrences(const string& text, const string& pattern) {
    // TODO: Count all occurrences of pattern in text (including overlapping)
    return 0;
}

int main() {
    cout << countOccurrences("hello world hello", "hello") << "\\n"; // 2
    cout << countOccurrences("aaa", "aa") << "\\n";                  // 2
    cout << countOccurrences("abcdef", "xyz") << "\\n";              // 0
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

int countOccurrences(const string& text, const string& pattern) {
    int count = 0;
    size_t pos = 0;
    while ((pos = text.find(pattern, pos)) != string::npos) {
        count++;
        pos++; // Move by 1 (not pattern length) to allow overlapping matches
    }
    return count;
}

int main() {
    cout << countOccurrences("hello world hello", "hello") << "\\n"; // 2
    cout << countOccurrences("aaa", "aa") << "\\n";                  // 2
    cout << countOccurrences("abcdef", "xyz") << "\\n";              // 0
    return 0;
}`,
          hints: [
            'Use a while loop with find() starting from a position that advances each iteration.',
            'To allow overlapping matches, increment the position by 1 after each match (not by the pattern length).',
            'Stop when find() returns string::npos.',
          ],
        },
      },
      {
        id: 'str-substr',
        title: 'String Substr',
        difficulty: 'beginner',
        tags: ['string', 'substr', 'substring', 'slice'],
        cheatSheetSummary: 's.substr(pos, len) extracts a substring starting at pos with length len.',
        signature: 'string substr(size_type pos = 0, size_type count = npos) const;',
        sections: [
          {
            heading: 'Extracting Substrings',
            content:
              'The substr() method returns a new string that is a copy of a portion of the original. It takes a starting position and an optional length (defaults to the rest of the string). If pos exceeds the string length, it throws std::out_of_range.',
            code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "Hello, World!";

    // Basic substr
    cout << s.substr(0, 5) << "\\n";   // "Hello"
    cout << s.substr(7) << "\\n";       // "World!"
    cout << s.substr(7, 5) << "\\n";    // "World"

    // Extract file extension
    string filename = "document.report.pdf";
    size_t dotPos = filename.rfind('.');
    if (dotPos != string::npos) {
        string ext = filename.substr(dotPos + 1);
        string name = filename.substr(0, dotPos);
        cout << "Name: " << name << ", Extension: " << ext << "\\n";
    }

    // Split a path
    string path = "/home/user/documents/file.txt";
    size_t lastSlash = path.rfind('/');
    string dir = path.substr(0, lastSlash);
    string file = path.substr(lastSlash + 1);
    cout << "Dir: " << dir << "\\n";
    cout << "File: " << file << "\\n";

    // Extract between delimiters
    string data = "[important data]";
    size_t start = data.find('[') + 1;
    size_t end = data.find(']');
    cout << "Extracted: " << data.substr(start, end - start) << "\\n";

    return 0;
}`,
            output: `Hello
World!
World
Name: document.report, Extension: pdf
Dir: /home/user/documents
File: file.txt
Extracted: important data`,
          },
        ],
        quiz: [
          {
            question: 'What happens if you call s.substr(pos) where pos equals s.length()?',
            options: [
              'It throws std::out_of_range',
              'It returns an empty string',
              'It returns the last character',
              'Undefined behavior',
            ],
            correctIndex: 1,
            explanation: 'When pos equals the string length, substr returns an empty string. It only throws std::out_of_range when pos is strictly greater than the string length.',
          },
          {
            question: 'What does s.substr(3, 100) return when s has only 8 characters?',
            options: [
              'It throws an exception because 100 > length',
              'It returns characters from index 3 to the end (5 characters)',
              'It returns 100 characters with padding',
              'Undefined behavior',
            ],
            correctIndex: 1,
            explanation: 'If the requested count exceeds the remaining characters, substr simply returns all characters from pos to the end. No exception is thrown for excessive count.',
          },
          {
            question: 'What does substr return?',
            options: [
              'A reference to a portion of the original string',
              'A new string that is a copy of the specified portion',
              'A string_view of the portion',
              'A char pointer to the start of the substring',
            ],
            correctIndex: 1,
            explanation: 'substr() returns a new std::string object that is a copy of the specified portion. It does not return a reference or view into the original string.',
          },
        ],
        challenge: {
          prompt: 'Write a function that splits a string by a delimiter and returns a vector of substrings. For example, splitting "a,b,c" by "," returns {"a", "b", "c"}.',
          starterCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<string> split(const string& s, const string& delimiter) {
    // TODO: Split string s by delimiter and return the parts
    vector<string> parts;
    return parts;
}

int main() {
    auto parts = split("one,two,three", ",");
    for (const auto& p : parts) cout << "[" << p << "] ";
    cout << "\\n"; // [one] [two] [three]

    auto words = split("hello  world", "  ");
    for (const auto& w : words) cout << "[" << w << "] ";
    cout << "\\n"; // [hello] [world]
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<string> split(const string& s, const string& delimiter) {
    vector<string> parts;
    size_t start = 0;
    size_t end;
    while ((end = s.find(delimiter, start)) != string::npos) {
        parts.push_back(s.substr(start, end - start));
        start = end + delimiter.length();
    }
    parts.push_back(s.substr(start));
    return parts;
}

int main() {
    auto parts = split("one,two,three", ",");
    for (const auto& p : parts) cout << "[" << p << "] ";
    cout << "\\n"; // [one] [two] [three]

    auto words = split("hello  world", "  ");
    for (const auto& w : words) cout << "[" << w << "] ";
    cout << "\\n"; // [hello] [world]
    return 0;
}`,
          hints: [
            'Use find() in a loop to locate each delimiter occurrence.',
            'Use substr(start, end - start) to extract the portion between delimiters.',
            'Do not forget to add the remaining part after the last delimiter.',
          ],
        },
      },
      {
        id: 'str-append',
        title: 'String Append & Concatenation',
        difficulty: 'beginner',
        tags: ['string', 'append', 'concatenation', 'operator+'],
        cheatSheetSummary: 's += "text" or s.append("text") to concatenate. s + t creates a new string.',
        signature: 'string& append(const string& str);',
        sections: [
          {
            heading: 'Building Strings',
            content:
              'Strings can be concatenated using the + operator (creates a new string), += operator (appends in-place), or the append() method. For building strings from many parts, += is more efficient than + because it avoids creating temporary strings. For maximum efficiency with many small appends, reserve capacity first.',
            code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Concatenation with +
    string a = "Hello";
    string b = "World";
    string c = a + ", " + b + "!";
    cout << c << "\\n";

    // Append with +=
    string result;
    result += "Hello";
    result += ' ';
    result += "World";
    cout << result << "\\n";

    // append() method
    string s;
    s.append("Hello");
    s.append(3, '!');     // Append 3 exclamation marks
    s.append(" World", 0, 6);  // Append substring
    cout << s << "\\n";

    // push_back for single characters
    string chars;
    for (char c = 'A'; c <= 'E'; c++) {
        chars.push_back(c);
    }
    cout << "Chars: " << chars << "\\n";

    // Efficient building with reserve
    string big;
    big.reserve(100);  // Pre-allocate to avoid reallocations
    for (int i = 0; i < 10; i++) {
        big += to_string(i) + " ";
    }
    cout << "Numbers: " << big << "\\n";

    return 0;
}`,
            output: `Hello, World!
Hello World
Hello!!! World
Chars: ABCDE
Numbers: 0 1 2 3 4 5 6 7 8 9`,
            tip: 'For joining many strings, use a stringstream or pre-reserve capacity to avoid repeated reallocations.',
          },
        ],
      },
      {
        id: 'str-replace',
        title: 'String Replace',
        difficulty: 'intermediate',
        tags: ['string', 'replace', 'modify'],
        cheatSheetSummary: 's.replace(pos, len, "new") replaces len chars at pos. For replace-all, loop with find().',
        signature: 'string& replace(size_type pos, size_type count, const string& str);',
        sections: [
          {
            heading: 'Replacing Substrings',
            content:
              'The replace() method replaces a portion of the string specified by position and length. Unlike some languages, there is no built-in "replace all" method, so you need to loop using find() and replace(). The replacement string can be a different length than the portion being replaced.',
            code: `#include <iostream>
#include <string>
using namespace std;

// Replace all occurrences
string replaceAll(string s, const string& from, const string& to) {
    size_t pos = 0;
    while ((pos = s.find(from, pos)) != string::npos) {
        s.replace(pos, from.length(), to);
        pos += to.length();
    }
    return s;
}

int main() {
    string s = "Hello, World!";

    // Replace at position
    s.replace(7, 5, "C++");
    cout << "After replace: " << s << "\\n";

    // Replace all occurrences
    string text = "the cat sat on the mat near the cat";
    text = replaceAll(text, "cat", "dog");
    cout << "Replace all: " << text << "\\n";

    // Replace with different length
    string msg = "I love C";
    msg.replace(7, 1, "C++");
    cout << "Extended: " << msg << "\\n";

    // Erase characters (replace with empty string)
    string noSpaces = replaceAll("hello world foo bar", " ", "");
    cout << "No spaces: " << noSpaces << "\\n";

    return 0;
}`,
            output: `After replace: Hello, C++!
Replace all: the dog sat on the mat near the dog
Extended: I love C++
No spaces: helloworldfoobar`,
          },
        ],
      },
      {
        id: 'str-compare',
        title: 'String Compare',
        difficulty: 'beginner',
        tags: ['string', 'compare', 'equality', 'lexicographic'],
        cheatSheetSummary: 'Use == for equality, < > for lexicographic order. compare() returns 0, negative, or positive.',
        signature: 'int compare(const string& str) const;',
        sections: [
          {
            heading: 'Comparing Strings',
            content:
              'Strings can be compared using relational operators (==, !=, <, >, <=, >=) for lexicographic comparison. The compare() method provides more control, allowing comparison of substrings. It returns 0 for equal, negative if less, and positive if greater.',
            code: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string a = "apple";
    string b = "banana";
    string c = "apple";

    // Equality
    cout << "a == c: " << (a == c) << "\\n";
    cout << "a == b: " << (a == b) << "\\n";
    cout << "a != b: " << (a != b) << "\\n";

    // Lexicographic comparison
    cout << "apple < banana: " << (a < b) << "\\n";
    cout << "banana > apple: " << (b > a) << "\\n";

    // compare() method
    cout << "a.compare(b): " << a.compare(b) << "\\n";  // Negative
    cout << "a.compare(c): " << a.compare(c) << "\\n";  // 0

    // Case-insensitive comparison
    string s1 = "Hello";
    string s2 = "hello";
    string lower1 = s1, lower2 = s2;
    transform(lower1.begin(), lower1.end(), lower1.begin(), ::tolower);
    transform(lower2.begin(), lower2.end(), lower2.begin(), ::tolower);
    cout << "Case-insensitive equal: " << (lower1 == lower2) << "\\n";

    // Starts with / ends with (C++20, or manual)
    string path = "/home/user/file.txt";
    bool startsWithSlash = path.compare(0, 1, "/") == 0;
    bool endsWithTxt = path.length() >= 4 &&
                       path.compare(path.length() - 4, 4, ".txt") == 0;
    cout << "Starts with /: " << startsWithSlash << "\\n";
    cout << "Ends with .txt: " << endsWithTxt << "\\n";

    return 0;
}`,
            output: `a == c: 1
a == b: 0
a != b: 1
apple < banana: 1
banana > apple: 1
a.compare(b): -1
a.compare(c): 0
Case-insensitive equal: 1
Starts with /: 1
Ends with .txt: 1`,
            tip: 'C++20 introduced s.starts_with("prefix") and s.ends_with("suffix") for clean prefix/suffix checking.',
          },
        ],
      },
      {
        id: 'str-c-str',
        title: 'String C-String Conversion',
        difficulty: 'intermediate',
        tags: ['string', 'c_str', 'data', 'c-style', 'interop'],
        cheatSheetSummary: 's.c_str() returns a null-terminated const char*. Needed for C APIs and printf.',
        signature: 'const char* c_str() const noexcept;',
        sections: [
          {
            heading: 'C-String Interoperability',
            content:
              'The c_str() method returns a const char* pointing to a null-terminated character array compatible with C functions. The data() method is similar but since C++11 also guarantees null-termination. These are essential when interfacing with C libraries, file operations, and system calls.',
            code: `#include <iostream>
#include <string>
#include <cstring>
#include <cstdio>
using namespace std;

int main() {
    string cpp_str = "Hello, World!";

    // c_str() returns const char*
    const char* c_str = cpp_str.c_str();
    cout << "c_str(): " << c_str << "\\n";
    cout << "strlen: " << strlen(c_str) << "\\n";

    // Passing to C functions
    printf("printf: %s\\n", cpp_str.c_str());

    // Creating string from C-string
    const char* raw = "From C";
    string from_c(raw);
    cout << "From C: " << from_c << "\\n";

    // Copy to char array
    char buffer[100];
    strcpy(buffer, cpp_str.c_str());
    cout << "Buffer: " << buffer << "\\n";

    // data() method (since C++17, non-const version available)
    cout << "data(): " << cpp_str.data() << "\\n";

    // Converting numbers to C-strings
    int num = 42;
    string numStr = to_string(num);
    cout << "Number as c_str: " << numStr.c_str() << "\\n";

    return 0;
}`,
            output: `c_str(): Hello, World!
strlen: 13
printf: Hello, World!
From C: From C
Buffer: Hello, World!
data(): Hello, World!
Number as c_str: 42`,
            warning: 'The pointer returned by c_str() becomes invalid if the string is modified or destroyed. Do not store it for later use across modifications.',
          },
        ],
      },
      {
        id: 'str-to-string',
        title: 'String Conversions',
        difficulty: 'beginner',
        tags: ['string', 'to_string', 'stoi', 'stod', 'conversion'],
        cheatSheetSummary: 'to_string(42) -> "42". stoi("42") -> 42. stod("3.14") -> 3.14.',
        signature: 'string to_string(int value);',
        sections: [
          {
            heading: 'Number-String Conversions',
            content:
              'C++11 introduced to_string() for converting numbers to strings and a family of sto* functions for the reverse. These are the modern, idiomatic way to convert between numbers and strings, replacing older C-style sprintf and sscanf.',
            code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Number to string
    cout << "to_string(42): \\"" << to_string(42) << "\\"\\n";
    cout << "to_string(3.14): \\"" << to_string(3.14) << "\\"\\n";
    cout << "to_string(-100): \\"" << to_string(-100) << "\\"\\n";

    // String to number
    cout << "stoi(\\"123\\"): " << stoi("123") << "\\n";
    cout << "stol(\\"99999999\\"): " << stol("999999999") << "\\n";
    cout << "stoll(\\"123456789012\\"): " << stoll("123456789012") << "\\n";
    cout << "stod(\\"3.14159\\"): " << stod("3.14159") << "\\n";
    cout << "stof(\\"2.71\\"): " << stof("2.71") << "\\n";

    // stoi with base
    cout << "stoi(\\"FF\\", 0, 16): " << stoi("FF", nullptr, 16) << "\\n";
    cout << "stoi(\\"1010\\", 0, 2): " << stoi("1010", nullptr, 2) << "\\n";

    // Error handling
    try {
        int bad = stoi("not_a_number");
        cout << bad << "\\n";
    } catch (const invalid_argument& e) {
        cout << "Invalid: " << e.what() << "\\n";
    }

    try {
        int overflow = stoi("99999999999999999");
        cout << overflow << "\\n";
    } catch (const out_of_range& e) {
        cout << "Out of range: " << e.what() << "\\n";
    }

    // Building formatted strings
    int score = 95;
    string name = "Alice";
    string msg = name + " scored " + to_string(score) + " points";
    cout << msg << "\\n";

    return 0;
}`,
            output: `to_string(42): "42"
to_string(3.14): "3.140000"
to_string(-100): "-100"
stoi("123"): 123
stol("99999999"): 999999999
stoll("123456789012"): 123456789012
stod("3.14159"): 3.14159
stof("2.71"): 2.71
stoi("FF", 0, 16): 255
stoi("1010", 0, 2): 10
Invalid: stoi
Out of range: stoi
Alice scored 95 points`,
            tip: 'to_string() for floats/doubles may produce trailing zeros (e.g., "3.140000"). For formatted output, use stringstream with setprecision() instead.',
            analogy: 'Think of it like a bilingual translator: to_string() translates numbers into human-readable text, while stoi/stod translate text back into numbers the computer can do math with.',
            codeHighlightLines: [4, 5, 6, 9, 10, 11, 12, 13],
          },
        ],
      },
    ],
  },
];

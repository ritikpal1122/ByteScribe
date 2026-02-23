"""
Seed 6 DSA sheets and link them to existing problems.

Idempotent — skips sheets whose slug already exists.

Usage:
    cd backend
    python scripts/seed_dsa_sheets.py
"""

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from slugify import slugify as _slugify
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.config import get_settings
from app.models.dsa_sheet import DSASheet, DSASheetProblem
from app.models.problem import Problem

# Sheet definitions: (name, icon, description, sections)
# Each section: (section_name, [problem_slug, ...])
SHEETS = [
    {
        "name": "Blind 75",
        "icon": "🎯",
        "description": "The classic 75 problems curated by a Blind user. Covers every essential pattern for FAANG interviews.",
        "sections": {
            "Array & Hashing": [
                "two-sum", "best-time-to-buy-and-sell-stock", "contains-duplicate",
                "product-of-array-except-self", "maximum-subarray", "maximum-product-subarray",
                "top-k-frequent-elements", "encode-and-decode-strings", "group-anagrams",
                "valid-anagram", "longest-consecutive-sequence",
            ],
            "Two Pointers": [
                "valid-palindrome", "3sum", "container-with-most-water",
            ],
            "Sliding Window": [
                "longest-substring-without-repeating-characters",
                "longest-repeating-character-replacement",
                "minimum-window-substring",
            ],
            "String": [
                "longest-palindromic-substring", "palindromic-substrings",
                "valid-parentheses",
            ],
            "Binary Search": [
                "find-minimum-in-rotated-sorted-array",
                "search-in-rotated-sorted-array",
            ],
            "Linked List": [
                "reverse-linked-list", "merge-two-sorted-lists", "linked-list-cycle",
                "reorder-list", "remove-nth-node-from-end-of-list", "merge-k-sorted-lists",
            ],
            "Trees": [
                "invert-binary-tree", "maximum-depth-of-binary-tree", "same-tree",
                "subtree-of-another-tree", "lowest-common-ancestor-of-a-binary-search-tree",
                "binary-tree-level-order-traversal", "validate-binary-search-tree",
                "kth-smallest-element-in-a-bst",
                "construct-binary-tree-from-preorder-and-inorder-traversal",
                "binary-tree-maximum-path-sum",
                "serialize-and-deserialize-binary-tree",
            ],
            "Heap / Priority Queue": [
                "find-median-from-data-stream",
            ],
            "Graphs": [
                "number-of-islands", "clone-graph", "pacific-atlantic-water-flow",
                "course-schedule",
                "number-of-connected-components-in-an-undirected-graph",
                "graph-valid-tree", "alien-dictionary",
            ],
            "Dynamic Programming": [
                "climbing-stairs", "coin-change", "longest-increasing-subsequence",
                "longest-common-subsequence", "word-break", "combination-sum-iv",
                "house-robber", "house-robber-ii", "decode-ways", "unique-paths",
                "jump-game",
            ],
            "Intervals": [
                "merge-intervals", "non-overlapping-intervals", "insert-interval",
                "meeting-rooms", "meeting-rooms-ii",
            ],
            "Math & Geometry": [
                "set-matrix-zeroes", "spiral-matrix", "rotate-image", "word-search",
            ],
            "Bit Manipulation": [
                "number-of-1-bits", "counting-bits", "missing-number",
                "reverse-bits", "sum-of-two-integers",
            ],
            "Tries": [
                "implement-trie-prefix-tree",
                "design-add-and-search-words-data-structure",
                "word-search-ii",
            ],
        },
    },
    {
        "name": "NeetCode 150",
        "icon": "🚀",
        "description": "An expanded version of the Blind 75 with 150 problems covering all essential patterns. Curated by NeetCode.",
        "sections": {
            "Arrays & Hashing": [
                "contains-duplicate", "valid-anagram", "two-sum",
                "group-anagrams", "top-k-frequent-elements",
                "encode-and-decode-strings", "product-of-array-except-self",
                "valid-sudoku", "longest-consecutive-sequence",
            ],
            "Two Pointers": [
                "valid-palindrome", "two-sum-ii-input-array-is-sorted",
                "3sum", "container-with-most-water", "trapping-rain-water",
            ],
            "Sliding Window": [
                "best-time-to-buy-and-sell-stock",
                "longest-substring-without-repeating-characters",
                "longest-repeating-character-replacement",
                "permutation-in-string", "minimum-window-substring",
                "sliding-window-maximum",
            ],
            "Stack": [
                "valid-parentheses", "min-stack",
                "evaluate-reverse-polish-notation", "generate-parentheses",
                "daily-temperatures", "car-fleet",
                "largest-rectangle-in-histogram",
            ],
            "Binary Search": [
                "binary-search", "search-a-2d-matrix", "koko-eating-bananas",
                "find-minimum-in-rotated-sorted-array",
                "search-in-rotated-sorted-array",
                "time-based-key-value-store", "median-of-two-sorted-arrays",
            ],
            "Linked List": [
                "reverse-linked-list", "merge-two-sorted-lists",
                "linked-list-cycle", "reorder-list",
                "remove-nth-node-from-end-of-list",
                "copy-list-with-random-pointer", "add-two-numbers",
                "find-the-duplicate-number", "lru-cache",
                "merge-k-sorted-lists", "reverse-nodes-in-k-group",
            ],
            "Trees": [
                "invert-binary-tree", "maximum-depth-of-binary-tree",
                "diameter-of-binary-tree", "balanced-binary-tree",
                "same-tree", "subtree-of-another-tree",
                "lowest-common-ancestor-of-a-binary-search-tree",
                "binary-tree-level-order-traversal",
                "binary-tree-right-side-view",
                "count-good-nodes-in-binary-tree",
                "validate-binary-search-tree",
                "kth-smallest-element-in-a-bst",
                "construct-binary-tree-from-preorder-and-inorder-traversal",
                "binary-tree-maximum-path-sum",
                "serialize-and-deserialize-binary-tree",
            ],
            "Tries": [
                "implement-trie-prefix-tree",
                "design-add-and-search-words-data-structure",
                "word-search-ii",
            ],
            "Heap / Priority Queue": [
                "kth-largest-element-in-a-stream", "last-stone-weight",
                "k-closest-points-to-origin",
                "kth-largest-element-in-an-array",
                "task-scheduler", "design-twitter",
                "find-median-from-data-stream",
            ],
            "Backtracking": [
                "subsets", "combination-sum", "permutations",
                "subsets-ii", "combination-sum-ii", "word-search",
                "palindrome-partitioning",
                "letter-combinations-of-a-phone-number", "n-queens",
            ],
            "Graphs": [
                "number-of-islands", "max-area-of-island", "clone-graph",
                "walls-and-gates", "rotting-oranges",
                "pacific-atlantic-water-flow", "surrounded-regions",
                "course-schedule", "course-schedule-ii",
                "graph-valid-tree",
                "number-of-connected-components-in-an-undirected-graph",
                "redundant-connection", "word-ladder",
            ],
            "Advanced Graphs": [
                "reconstruct-itinerary",
                "min-cost-to-connect-all-points",
                "network-delay-time", "swim-in-rising-water",
                "alien-dictionary",
                "cheapest-flights-within-k-stops",
            ],
            "1-D Dynamic Programming": [
                "climbing-stairs", "min-cost-climbing-stairs",
                "house-robber", "house-robber-ii",
                "longest-palindromic-substring", "palindromic-substrings",
                "decode-ways", "coin-change",
                "maximum-product-subarray", "word-break",
                "longest-increasing-subsequence",
                "partition-equal-subset-sum",
            ],
            "2-D Dynamic Programming": [
                "unique-paths", "longest-common-subsequence",
                "best-time-to-buy-and-sell-stock-with-cooldown",
                "coin-change-2", "target-sum",
                "interleaving-string",
                "longest-increasing-path-in-a-matrix",
                "distinct-subsequences", "edit-distance",
                "burst-balloons", "regular-expression-matching",
            ],
            "Greedy": [
                "maximum-subarray", "jump-game", "jump-game-ii",
                "gas-station", "hand-of-straights",
                "merge-triplets-to-form-target-triplet",
                "partition-labels", "valid-parenthesis-string",
            ],
            "Intervals": [
                "insert-interval", "merge-intervals",
                "non-overlapping-intervals", "meeting-rooms",
                "meeting-rooms-ii",
                "minimum-interval-to-include-each-query",
            ],
            "Math & Geometry": [
                "rotate-image", "spiral-matrix", "set-matrix-zeroes",
                "happy-number", "plus-one", "pow-x-n",
                "multiply-strings", "detect-squares",
            ],
            "Bit Manipulation": [
                "single-number", "number-of-1-bits", "counting-bits",
                "reverse-bits", "missing-number",
                "sum-of-two-integers", "reverse-integer",
            ],
        },
    },
    {
        "name": "Grind 75",
        "icon": "💪",
        "description": "A modern, customizable alternative to the Blind 75 by the creator of the Tech Interview Handbook.",
        "sections": {
            "Week 1": [
                "two-sum", "valid-parentheses", "merge-two-sorted-lists",
                "best-time-to-buy-and-sell-stock", "valid-palindrome",
                "invert-binary-tree", "valid-anagram", "binary-search",
                "flood-fill", "lowest-common-ancestor-of-a-binary-search-tree",
                "balanced-binary-tree", "linked-list-cycle",
                "implement-queue-using-stacks",
            ],
            "Week 2": [
                "first-bad-version", "ransom-note", "climbing-stairs",
                "longest-palindrome", "reverse-linked-list",
                "majority-element", "add-binary",
                "diameter-of-binary-tree", "middle-of-the-linked-list",
                "maximum-depth-of-binary-tree", "contains-duplicate",
                "maximum-subarray", "insert-interval",
            ],
            "Week 3": [
                "01-matrix", "k-closest-points-to-origin",
                "longest-substring-without-repeating-characters",
                "3sum", "binary-tree-level-order-traversal",
                "clone-graph", "evaluate-reverse-polish-notation",
                "course-schedule", "implement-trie-prefix-tree",
                "coin-change", "product-of-array-except-self",
            ],
            "Week 4": [
                "min-stack", "validate-binary-search-tree",
                "number-of-islands", "rotting-oranges",
                "search-in-rotated-sorted-array", "combination-sum",
                "permutations", "merge-intervals",
                "lowest-common-ancestor-of-a-binary-tree",
            ],
            "Week 5": [
                "time-based-key-value-store", "accounts-merge",
                "sort-colors", "word-break",
                "partition-equal-subset-sum",
                "string-to-integer-atoi", "spiral-matrix",
            ],
            "Week 6": [
                "subsets", "binary-tree-right-side-view",
                "longest-palindromic-substring", "unique-paths",
                "construct-binary-tree-from-preorder-and-inorder-traversal",
                "container-with-most-water",
                "letter-combinations-of-a-phone-number",
            ],
            "Week 7": [
                "word-search", "find-all-anagrams-in-a-string",
                "minimum-height-trees", "task-scheduler",
                "lru-cache", "kth-smallest-element-in-a-bst",
            ],
            "Week 8": [
                "minimum-window-substring",
                "serialize-and-deserialize-binary-tree",
                "trapping-rain-water", "find-median-from-data-stream",
                "word-ladder", "basic-calculator",
                "maximum-profit-in-job-scheduling",
                "merge-k-sorted-lists",
                "largest-rectangle-in-histogram",
            ],
        },
    },
    # NOTE: Full "Striver SDE Sheet" (180 problems) is seeded by seed_striver_sde_180.py
    # NOTE: Full "Love Babbar 450 DSA Sheet" is seeded by seed_love_babbar_450.py
    {
        "name": "Top Interview Questions",
        "icon": "🏆",
        "description": "A curated list of the most frequently asked coding interview questions across top tech companies.",
        "sections": {
            "Easy": [
                "two-sum", "valid-parentheses", "merge-two-sorted-lists",
                "best-time-to-buy-and-sell-stock", "valid-palindrome",
                "contains-duplicate", "maximum-subarray", "valid-anagram",
                "reverse-linked-list", "climbing-stairs",
                "invert-binary-tree", "maximum-depth-of-binary-tree",
                "linked-list-cycle", "missing-number",
            ],
            "Medium": [
                "3sum", "product-of-array-except-self", "group-anagrams",
                "longest-substring-without-repeating-characters",
                "longest-palindromic-substring", "container-with-most-water",
                "coin-change", "number-of-islands", "course-schedule",
                "validate-binary-search-tree", "merge-intervals",
                "word-break", "top-k-frequent-elements",
                "house-robber", "search-in-rotated-sorted-array",
                "rotate-image", "spiral-matrix",
                "implement-trie-prefix-tree",
            ],
            "Hard": [
                "merge-k-sorted-lists", "minimum-window-substring",
                "binary-tree-maximum-path-sum",
                "serialize-and-deserialize-binary-tree",
                "find-median-from-data-stream",
                "word-search-ii", "alien-dictionary",
            ],
        },
    },
]


async def main() -> None:
    settings = get_settings()
    engine = create_async_engine(settings.DATABASE_URL, echo=False)
    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    added = skipped = 0
    total = len(SHEETS)

    print(f"Seeding {total} DSA sheets ...\n")

    async with session_factory() as session:
        # Build slug->problem map
        result = await session.execute(select(Problem))
        problem_map = {p.slug: p for p in result.scalars().all()}

        for i, sheet_def in enumerate(SHEETS, 1):
            slug = _slugify(sheet_def["name"])

            existing = await session.execute(select(DSASheet).where(DSASheet.slug == slug))
            if existing.scalar_one_or_none() is not None:
                skipped += 1
                print(f"  [{i}/{total}] ~ {sheet_def['name']} (exists)")
                continue

            # Count total problems in this sheet (unique)
            all_slugs = set()
            for section_problems in sheet_def["sections"].values():
                all_slugs.update(section_problems)

            sheet = DSASheet(
                name=sheet_def["name"],
                slug=slug,
                description=sheet_def["description"],
                icon=sheet_def["icon"],
                problem_count=len(all_slugs),
            )
            session.add(sheet)
            await session.flush()

            # Add problems by section
            order = 0
            seen = set()
            for section_name, problem_slugs in sheet_def["sections"].items():
                for p_slug in problem_slugs:
                    if p_slug in seen:
                        continue
                    seen.add(p_slug)
                    problem = problem_map.get(p_slug)
                    if problem is None:
                        print(f"    WARN: problem '{p_slug}' not found, skipping")
                        continue
                    sp = DSASheetProblem(
                        sheet_id=sheet.id,
                        problem_id=problem.id,
                        section=section_name,
                        order=order,
                    )
                    session.add(sp)
                    order += 1

            await session.flush()
            added += 1
            print(f"  [{i}/{total}] + {sheet_def['name']} ({order} problems linked)")

        await session.commit()

    await engine.dispose()
    print(f"\nSeeded {added} DSA sheets ({skipped} skipped)")


if __name__ == "__main__":
    asyncio.run(main())

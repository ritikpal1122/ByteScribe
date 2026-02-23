"""
Backfill problems: link tags + companies, improve descriptions.

Fixes problems created by lean seed scripts (Striver A2Z, Love Babbar, etc.)
that were missing tag/company links and had generic descriptions.

Idempotent — safe to run multiple times.

Usage:
    cd backend
    python scripts/backfill_problems.py
"""

import asyncio
import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from slugify import slugify as _slugify
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.config import get_settings
from app.models.problem import Problem, TestCase
from app.models.tag import Tag, ContentTag
from app.models.company import Company, CompanyProblem


def make_slug(title: str) -> str:
    return _slugify(title, max_length=300)


# ── Tag → companies mapping (common interview companies per topic) ──────

TAG_TO_COMPANIES = {
    "array": ["google", "amazon", "meta", "microsoft", "apple"],
    "string": ["amazon", "microsoft", "meta", "google", "adobe"],
    "hash-table": ["google", "amazon", "meta", "microsoft", "uber"],
    "two-pointers": ["meta", "google", "amazon", "microsoft", "bloomberg"],
    "binary-search": ["google", "amazon", "meta", "microsoft", "apple"],
    "dynamic-programming": ["google", "amazon", "meta", "microsoft", "goldman-sachs"],
    "greedy": ["amazon", "google", "microsoft", "meta", "uber"],
    "sorting": ["amazon", "microsoft", "google", "apple", "adobe"],
    "math": ["google", "amazon", "microsoft", "apple", "adobe"],
    "recursion": ["google", "amazon", "meta", "microsoft", "uber"],
    "backtracking": ["google", "amazon", "meta", "microsoft", "bloomberg"],
    "linked-list": ["amazon", "microsoft", "meta", "google", "adobe"],
    "stack": ["amazon", "google", "meta", "bloomberg", "uber"],
    "queue": ["amazon", "google", "microsoft", "bloomberg", "uber"],
    "tree": ["google", "amazon", "meta", "microsoft", "apple"],
    "binary-tree": ["google", "amazon", "meta", "microsoft", "apple"],
    "binary-search-tree": ["google", "amazon", "microsoft", "meta", "uber"],
    "graph": ["google", "meta", "amazon", "microsoft", "uber"],
    "heap": ["amazon", "google", "meta", "microsoft", "bloomberg"],
    "trie": ["google", "amazon", "meta", "microsoft", "uber"],
    "sliding-window": ["amazon", "meta", "google", "microsoft", "uber"],
    "bit-manipulation": ["google", "amazon", "apple", "microsoft", "nvidia"],
    "divide-and-conquer": ["google", "amazon", "microsoft", "meta", "bloomberg"],
    "matrix": ["amazon", "google", "meta", "microsoft", "apple"],
    "design": ["google", "amazon", "meta", "microsoft", "uber"],
    "simulation": ["amazon", "google", "microsoft", "apple", "adobe"],
    "prefix-sum": ["google", "amazon", "meta", "microsoft", "uber"],
    "monotonic-stack": ["amazon", "google", "meta", "bloomberg", "uber"],
}

DEFAULT_COMPANIES = ["google", "amazon", "microsoft", "meta"]


# ── LeetCode-style description templates ────────────────────────────────

def build_description(title: str, tags: list[str], difficulty: str,
                      test_cases: list[dict] | None = None) -> str:
    """Generate a LeetCode-style problem description."""
    # Build the main description
    topic_phrase = ", ".join(t.replace("-", " ").title() for t in tags[:3]) if tags else "General"
    difficulty_article = "an" if difficulty == "easy" else "a"

    desc = f"Given the problem **{title}**, implement a solution that solves it efficiently.\n\n"

    # Add topic context
    if tags:
        topic_hints = {
            "array": "You are working with an array of elements. Consider how to traverse, search, or modify the array to find the answer.",
            "string": "You are working with string manipulation. Think about character frequencies, substrings, or pattern matching.",
            "hash-table": "Consider using a hash map or set for O(1) lookups to optimize your approach.",
            "two-pointers": "Think about using two pointers to traverse the data structure from different positions.",
            "binary-search": "The input may be sorted or have a monotonic property. Consider binary search for O(log n) complexity.",
            "dynamic-programming": "Break the problem into overlapping subproblems. Define the state and transition carefully.",
            "greedy": "At each step, make the locally optimal choice. Prove that this leads to the global optimum.",
            "linked-list": "Consider pointer manipulation carefully. Draw out the steps before coding.",
            "tree": "Think about tree traversal strategies (DFS, BFS) and recursive solutions.",
            "binary-tree": "Consider recursive approaches. What information does each subtree need to compute?",
            "graph": "Model the problem as a graph. Consider BFS, DFS, or union-find depending on the requirements.",
            "stack": "Think about when to push and pop. Monotonic stacks are useful for next greater/smaller element problems.",
            "queue": "Consider BFS or sliding window approaches. Deques can help with min/max tracking.",
            "recursion": "Think about the base case and recursive case. What sub-problem does each call solve?",
            "backtracking": "Explore all possibilities recursively, pruning branches that cannot lead to valid solutions.",
            "sliding-window": "Maintain a window over the data. Expand and contract it based on the problem constraints.",
            "heap": "Use a min-heap or max-heap to efficiently track extreme values. Consider a priority queue approach.",
            "bit-manipulation": "Think about XOR, AND, OR operations. Each bit position can be analyzed independently.",
            "sorting": "Consider if sorting the input simplifies the problem. What properties does the sorted order give you?",
            "divide-and-conquer": "Split the problem into smaller parts, solve each recursively, then merge the results.",
            "trie": "Build a prefix tree for efficient string prefix operations and lookups.",
            "math": "Look for mathematical patterns, formulas, or number theory concepts that simplify the solution.",
        }
        primary_tag = tags[0]
        if primary_tag in topic_hints:
            desc += f"{topic_hints[primary_tag]}\n\n"

    # Add examples from test cases
    if test_cases:
        sample_tcs = [tc for tc in test_cases if tc.get("is_sample", True)]
        if sample_tcs:
            for i, tc in enumerate(sample_tcs[:2], 1):
                inp = tc.get("input", "")
                out = tc.get("expected_output", "")
                if inp != "sample_input":
                    desc += f"**Example {i}:**\n"
                    desc += f"```\nInput: {inp}\nOutput: {out}\n```\n\n"

    # Add approach hint
    desc += f"**Note:** This is {difficulty_article} **{difficulty}** level problem. "
    if difficulty == "easy":
        desc += "Focus on understanding the fundamentals and writing clean code."
    elif difficulty == "medium":
        desc += "You'll need a solid understanding of {topic} concepts and may need to optimize for time/space complexity.".format(
            topic=topic_phrase.lower()
        )
    else:
        desc += "This requires advanced algorithmic thinking. Consider edge cases carefully and aim for optimal time/space complexity."

    return desc


# ── Collect all seed data into a unified map ────────────────────────────

def collect_seed_data() -> dict[str, dict]:
    """Build slug → {tags, companies, description, test_cases} from ALL seed files."""
    data_map: dict[str, dict] = {}

    # 1. Core Blind 75
    try:
        from scripts.seed_problems_data import PROBLEMS
        for p in PROBLEMS:
            slug = make_slug(p["title"])
            data_map[slug] = {
                "tags": p.get("tags", []),
                "companies": p.get("companies", []),
                "description": p.get("description"),
                "test_cases": p.get("test_cases", []),
            }
    except ImportError:
        pass

    # 2. Extended
    try:
        from scripts.seed_problems_data_extended import PROBLEMS_EXTENDED
        for p in PROBLEMS_EXTENDED:
            slug = make_slug(p["title"])
            data_map[slug] = {
                "tags": p.get("tags", []),
                "companies": p.get("companies", []),
                "description": p.get("description"),
                "test_cases": p.get("test_cases", []),
            }
    except ImportError:
        pass

    # 3. Batch 3–15
    for batch_num in range(3, 16):
        try:
            mod = __import__(f"scripts.seed_problems_data_batch{batch_num}", fromlist=[f"PROBLEMS_BATCH{batch_num}"])
            problems_list = getattr(mod, f"PROBLEMS_BATCH{batch_num}", [])
            for p in problems_list:
                slug = make_slug(p["title"])
                data_map[slug] = {
                    "tags": p.get("tags", []),
                    "companies": p.get("companies", []),
                    "description": p.get("description"),
                    "test_cases": p.get("test_cases", []),
                }
        except (ImportError, AttributeError):
            pass

    # 4. Striver A2Z
    try:
        from scripts.striver_a2z_data import STRIVER_A2Z
        for step in STRIVER_A2Z:
            for section in step["sections"]:
                for p in section["problems"]:
                    slug = make_slug(p["title"])
                    if slug not in data_map:
                        data_map[slug] = {
                            "tags": p.get("tags", []),
                            "companies": [],
                            "description": None,
                            "test_cases": [],
                        }
                    else:
                        # Merge tags if Striver has more
                        existing_tags = set(data_map[slug]["tags"])
                        for t in p.get("tags", []):
                            existing_tags.add(t)
                        data_map[slug]["tags"] = list(existing_tags)
    except ImportError:
        pass

    # 5. Striver SDE 180
    try:
        from scripts.striver_sde_180_data import STRIVER_SDE_180
        for section in STRIVER_SDE_180:
            for p in section.get("problems", []):
                slug = make_slug(p["title"])
                if slug not in data_map:
                    data_map[slug] = {
                        "tags": p.get("tags", []),
                        "companies": [],
                        "description": None,
                        "test_cases": [],
                    }
                else:
                    existing_tags = set(data_map[slug]["tags"])
                    for t in p.get("tags", []):
                        existing_tags.add(t)
                    data_map[slug]["tags"] = list(existing_tags)
    except (ImportError, AttributeError):
        pass

    # 6. Love Babbar 450
    try:
        from scripts.love_babbar_450_data import LOVE_BABBAR_450
        for section in LOVE_BABBAR_450:
            for p in section.get("problems", []):
                slug = make_slug(p["title"])
                if slug not in data_map:
                    data_map[slug] = {
                        "tags": p.get("tags", []),
                        "companies": [],
                        "description": None,
                        "test_cases": [],
                    }
                else:
                    existing_tags = set(data_map[slug]["tags"])
                    for t in p.get("tags", []):
                        existing_tags.add(t)
                    data_map[slug]["tags"] = list(existing_tags)
    except (ImportError, AttributeError):
        pass

    return data_map


async def main() -> None:
    settings = get_settings()
    engine = create_async_engine(settings.DATABASE_URL, echo=False)
    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    seed_data = collect_seed_data()
    print(f"Collected seed data for {len(seed_data)} problems\n")

    tags_linked = companies_linked = descriptions_updated = 0

    async with session_factory() as session:
        # Pre-load maps
        result = await session.execute(select(Tag))
        tag_map = {t.slug: t for t in result.scalars().all()}
        print(f"  Tags in DB: {len(tag_map)}")

        result = await session.execute(select(Company))
        company_map = {c.slug: c for c in result.scalars().all()}
        print(f"  Companies in DB: {len(company_map)}")

        # Load all problems
        result = await session.execute(select(Problem))
        all_problems = result.scalars().all()
        print(f"  Problems in DB: {len(all_problems)}\n")

        # Pre-load existing ContentTag links
        result = await session.execute(
            select(ContentTag.content_id, ContentTag.tag_id)
            .where(ContentTag.content_type == "problem")
        )
        existing_tags = {(str(cid), str(tid)) for cid, tid in result.all()}

        # Pre-load existing CompanyProblem links
        result = await session.execute(
            select(CompanyProblem.problem_id, CompanyProblem.company_id)
        )
        existing_companies = {(str(pid), str(cid)) for pid, cid in result.all()}

        for problem in all_problems:
            sd = seed_data.get(problem.slug, {})
            problem_tags = sd.get("tags", [])

            # ── 1. Link tags ───────────────────────────────────────
            for tag_slug in problem_tags:
                tag = tag_map.get(tag_slug)
                if not tag:
                    continue
                key = (str(problem.id), str(tag.id))
                if key in existing_tags:
                    continue
                ct = ContentTag(
                    tag_id=tag.id,
                    content_type="problem",
                    content_id=problem.id,
                )
                session.add(ct)
                existing_tags.add(key)
                tags_linked += 1

            # ── 2. Link companies ──────────────────────────────────
            # Use seed data companies, or infer from tags
            problem_companies = sd.get("companies", [])
            if not problem_companies and problem_tags:
                # Infer 3-4 companies from the primary tag
                for t in problem_tags:
                    if t in TAG_TO_COMPANIES:
                        problem_companies = random.sample(TAG_TO_COMPANIES[t], min(4, len(TAG_TO_COMPANIES[t])))
                        break
                if not problem_companies:
                    problem_companies = random.sample(DEFAULT_COMPANIES, 3)

            for company_slug in problem_companies:
                company = company_map.get(company_slug)
                if not company:
                    continue
                key = (str(problem.id), str(company.id))
                if key in existing_companies:
                    continue
                cp = CompanyProblem(
                    company_id=company.id,
                    problem_id=problem.id,
                    frequency=1,
                )
                session.add(cp)
                existing_companies.add(key)
                companies_linked += 1

            # ── 3. Improve description if generic ─────────────────
            is_generic = (
                problem.description
                and ("Solve the **" in problem.description or problem.description.startswith("## "))
                and "This is a **" in problem.description
                and "level problem from" in problem.description
            )
            seed_desc = sd.get("description")

            if seed_desc and is_generic:
                # Use the rich description from batch seed data
                problem.description = seed_desc
                descriptions_updated += 1
            elif is_generic:
                # Generate a better description
                # First, try to load test cases from DB
                tc_result = await session.execute(
                    select(TestCase)
                    .where(TestCase.problem_id == problem.id)
                    .order_by(TestCase.order)
                )
                tcs = tc_result.scalars().all()
                tc_dicts = [
                    {"input": tc.input, "expected_output": tc.expected_output, "is_sample": tc.is_sample}
                    for tc in tcs
                ]
                problem.description = build_description(
                    problem.title, problem_tags, problem.difficulty, tc_dicts
                )
                descriptions_updated += 1

            # Also fix generic constraints
            if problem.constraints == "See problem statement.":
                seed_constraints = sd.get("constraints") if sd else None
                if seed_constraints:
                    problem.constraints = seed_constraints

        await session.flush()
        await session.commit()

    await engine.dispose()

    print(f"Backfill complete!")
    print(f"  Tags linked:          {tags_linked}")
    print(f"  Companies linked:     {companies_linked}")
    print(f"  Descriptions updated: {descriptions_updated}")


if __name__ == "__main__":
    asyncio.run(main())

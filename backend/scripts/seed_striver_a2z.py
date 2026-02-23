"""
Seed the complete Striver A2Z DSA Sheet (~455 problems).

1. Creates lean problem entries for any problem not already in the DB.
2. Creates (or updates) the "Striver A2Z DSA Sheet" DSA sheet.
3. Links all problems to the sheet organized by section.

Idempotent — safe to run multiple times.

Usage:
    cd backend
    python scripts/seed_striver_a2z.py
"""

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from slugify import slugify as _slugify
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.config import get_settings
from app.models.problem import Problem, TestCase
from app.models.dsa_sheet import DSASheet, DSASheetProblem
from app.models.tag import Tag, ContentTag
from scripts.striver_a2z_data import STRIVER_A2Z


SHEET_NAME = "Striver A2Z DSA Sheet"
SHEET_ICON = "🔥"
SHEET_DESCRIPTION = (
    "The complete Striver A2Z DSA Course/Sheet with 455+ problems covering "
    "every topic from basics to advanced — arrays, binary search, strings, "
    "linked lists, recursion, bit manipulation, stacks & queues, sliding window, "
    "heaps, greedy, binary trees, BSTs, graphs, and dynamic programming. "
    "Curated by Raj Vikramaditya (Striver)."
)


def make_slug(title: str) -> str:
    return _slugify(title, max_length=300)


def generate_description(title: str, step: str, section: str, difficulty: str) -> str:
    """Generate a lean problem description for new entries."""
    return (
        f"## {title}\n\n"
        f"Solve the **{title}** problem.\n\n"
        f"This is a **{difficulty}** level problem from **{step}** — _{section}_.\n\n"
        f"### Approach\n\n"
        f"Think about the optimal approach for this problem. "
        f"Consider the time and space complexity of your solution."
    )


def generate_starter_code(title: str) -> dict:
    """Generate generic starter code templates."""
    func_name = _slugify(title, separator="_", max_length=60)
    return {
        "python": f"class Solution:\n    def {func_name}(self, *args):\n        # Write your solution here\n        pass",
        "javascript": f"var {func_name} = function(...args) {{\n    // Write your solution here\n}};",
        "java": f"class Solution {{\n    public void {func_name}() {{\n        // Write your solution here\n    }}\n}}",
        "cpp": f"class Solution {{\npublic:\n    void {func_name}() {{\n        // Write your solution here\n    }}\n}};",
    }


async def main() -> None:
    settings = get_settings()
    engine = create_async_engine(settings.DATABASE_URL, echo=False)
    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    problems_created = problems_skipped = 0
    total_problems = sum(
        len(sec["problems"])
        for step in STRIVER_A2Z
        for sec in step["sections"]
    )

    print(f"Striver A2Z DSA Sheet — {total_problems} problems across {len(STRIVER_A2Z)} steps\n")

    async with session_factory() as session:
        # ── Phase 1: Ensure all problems exist ──────────────────────────
        print("Phase 1: Creating missing problems ...\n")

        # Build slug → Problem map
        result = await session.execute(select(Problem))
        problem_map = {p.slug: p for p in result.scalars().all()}

        # Build tag map for linking
        result = await session.execute(select(Tag))
        tag_map = {t.slug: t for t in result.scalars().all()}
        tags_linked = 0

        idx = 0
        for step in STRIVER_A2Z:
            step_name = step["step"]
            for section in step["sections"]:
                section_name = section["name"]
                for p in section["problems"]:
                    idx += 1
                    slug = make_slug(p["title"])

                    if slug in problem_map:
                        problems_skipped += 1
                        continue

                    # Create a lean problem entry
                    problem = Problem(
                        title=p["title"],
                        slug=slug,
                        description=generate_description(
                            p["title"], step_name, section_name, p["difficulty"]
                        ),
                        difficulty=p["difficulty"],
                        constraints="See problem statement.",
                        hints=f"Think about the key concepts in {section_name}.",
                        starter_code=generate_starter_code(p["title"]),
                        is_published=True,
                        author_id=None,
                    )
                    session.add(problem)
                    await session.flush()
                    await session.refresh(problem)

                    # Add one placeholder test case
                    tc = TestCase(
                        problem_id=problem.id,
                        input="sample_input",
                        expected_output="sample_output",
                        is_sample=True,
                        order=0,
                    )
                    session.add(tc)
                    await session.flush()

                    # Link tags
                    for tag_slug in p.get("tags", []):
                        tag = tag_map.get(tag_slug)
                        if tag:
                            session.add(ContentTag(
                                tag_id=tag.id,
                                content_type="problem",
                                content_id=problem.id,
                            ))
                            tags_linked += 1

                    problem_map[slug] = problem
                    problems_created += 1
                    if problems_created % 25 == 0:
                        print(f"  ... created {problems_created} new problems so far")

        print(f"\n  Created {problems_created} new problems ({problems_skipped} already existed)")
        print(f"  Linked {tags_linked} tags\n")

        # ── Phase 2: Create/update the DSA Sheet ────────────────────────
        print("Phase 2: Creating DSA Sheet ...\n")

        slug = make_slug(SHEET_NAME)
        result = await session.execute(select(DSASheet).where(DSASheet.slug == slug))
        sheet = result.scalar_one_or_none()

        if sheet is not None:
            # Delete existing problem links to recreate them
            await session.execute(
                DSASheetProblem.__table__.delete().where(
                    DSASheetProblem.sheet_id == sheet.id
                )
            )
            await session.flush()
            print(f"  Sheet '{SHEET_NAME}' exists — refreshing problem links ...")
        else:
            sheet = DSASheet(
                name=SHEET_NAME,
                slug=slug,
                description=SHEET_DESCRIPTION,
                icon=SHEET_ICON,
                problem_count=0,
            )
            session.add(sheet)
            await session.flush()
            await session.refresh(sheet)
            print(f"  Created sheet '{SHEET_NAME}'")

        # ── Phase 3: Link problems to sheet by section ──────────────────
        print("\nPhase 3: Linking problems to sheet ...\n")

        order = 0
        linked = 0
        missing = 0
        seen_problem_ids = set()  # track to avoid duplicate (sheet_id, problem_id)

        for step in STRIVER_A2Z:
            for section in step["sections"]:
                # Section label: "Step N > Section Name"
                section_label = f"{step['step']} > {section['name']}"

                for p in section["problems"]:
                    slug = make_slug(p["title"])
                    problem = problem_map.get(slug)

                    if problem is None:
                        missing += 1
                        print(f"  WARN: '{p['title']}' (slug: {slug}) not found, skipping")
                        continue

                    # Skip if this problem is already linked (unique constraint)
                    if problem.id in seen_problem_ids:
                        continue
                    seen_problem_ids.add(problem.id)

                    sp = DSASheetProblem(
                        sheet_id=sheet.id,
                        problem_id=problem.id,
                        section=section_label,
                        order=order,
                    )
                    session.add(sp)
                    order += 1
                    linked += 1

        # Update problem count
        sheet.problem_count = linked
        await session.flush()
        await session.commit()

        print(f"\n  Linked {linked} problems to sheet ({missing} not found)")

    await engine.dispose()
    print(f"\nDone! Striver A2Z DSA Sheet: {linked} problems across {len(STRIVER_A2Z)} steps")


if __name__ == "__main__":
    asyncio.run(main())

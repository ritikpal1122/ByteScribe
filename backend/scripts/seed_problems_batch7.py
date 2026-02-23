"""
Seed the problems table with batch 7 problems (with company links).

Idempotent — skips problems whose slug already exists.

Usage:
    cd backend
    python scripts/seed_problems_batch7.py
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
from app.models.tag import Tag, ContentTag
from app.models.company import Company, CompanyProblem
from scripts.seed_problems_data_batch7 import PROBLEMS_BATCH7


def make_slug(title: str) -> str:
    return _slugify(title, max_length=300)


async def main() -> None:
    settings = get_settings()
    engine = create_async_engine(settings.DATABASE_URL, echo=False)
    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    added = skipped = 0
    total = len(PROBLEMS_BATCH7)

    print(f"Seeding {total} batch 7 problems ...\n")

    async with session_factory() as session:
        # Pre-load tag map: slug -> Tag
        result = await session.execute(select(Tag))
        tag_map = {t.slug: t for t in result.scalars().all()}

        # Pre-load company map: slug -> Company
        result = await session.execute(select(Company))
        company_map = {c.slug: c for c in result.scalars().all()}

        for i, p in enumerate(PROBLEMS_BATCH7, 1):
            slug = make_slug(p["title"])

            existing = await session.execute(select(Problem).where(Problem.slug == slug))
            if existing.scalar_one_or_none() is not None:
                skipped += 1
                print(f"  [{i}/{total}] ~ {p['title']} (exists)")
                continue

            problem = Problem(
                title=p["title"],
                slug=slug,
                description=p["description"],
                difficulty=p["difficulty"],
                constraints=p.get("constraints"),
                hints=p.get("hints"),
                starter_code=p.get("starter_code"),
                is_published=True,
                author_id=None,
            )
            session.add(problem)
            await session.flush()

            # Test cases
            for idx, tc in enumerate(p.get("test_cases", [])):
                test_case = TestCase(
                    problem_id=problem.id,
                    input=tc["input"],
                    expected_output=tc["expected_output"],
                    is_sample=tc.get("is_sample", False),
                    order=idx,
                )
                session.add(test_case)

            # Link tags via ContentTag
            for tag_slug in p.get("tags", []):
                tag = tag_map.get(tag_slug)
                if tag:
                    ct = ContentTag(
                        tag_id=tag.id,
                        content_type="problem",
                        content_id=problem.id,
                    )
                    session.add(ct)
                    tag.usage_count += 1

            # Link companies via CompanyProblem
            for company_slug in p.get("companies", []):
                company = company_map.get(company_slug)
                if company:
                    cp = CompanyProblem(
                        company_id=company.id,
                        problem_id=problem.id,
                        frequency=1,
                    )
                    session.add(cp)
                    company.problem_count += 1

            await session.flush()
            added += 1
            print(f"  [{i}/{total}] + {p['title']}")

        await session.commit()

    await engine.dispose()
    print(f"\nSeeded {added} problems ({skipped} skipped)")


if __name__ == "__main__":
    asyncio.run(main())

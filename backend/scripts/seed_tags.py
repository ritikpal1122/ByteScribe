"""
Seed the tags table with ~30 common DSA tags.

Idempotent — skips tags whose slug already exists.

Usage:
    cd backend
    python scripts/seed_tags.py
"""

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from slugify import slugify as _slugify
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.config import get_settings
from app.models.tag import Tag

# (name, color)
TAGS: list[tuple[str, str]] = [
    ("Array", "#3b82f6"),
    ("String", "#8b5cf6"),
    ("Hash Table", "#f59e0b"),
    ("Linked List", "#10b981"),
    ("Stack", "#ef4444"),
    ("Queue", "#06b6d4"),
    ("Tree", "#22c55e"),
    ("Binary Tree", "#16a34a"),
    ("Binary Search Tree", "#15803d"),
    ("Graph", "#6366f1"),
    ("Heap", "#ec4899"),
    ("Priority Queue", "#d946ef"),
    ("Trie", "#0ea5e9"),
    ("Dynamic Programming", "#f97316"),
    ("Greedy", "#84cc16"),
    ("Backtracking", "#a855f7"),
    ("Binary Search", "#14b8a6"),
    ("Two Pointers", "#e11d48"),
    ("Sliding Window", "#0891b2"),
    ("Sorting", "#64748b"),
    ("Math", "#7c3aed"),
    ("Bit Manipulation", "#475569"),
    ("Recursion", "#db2777"),
    ("Divide and Conquer", "#9333ea"),
    ("Union Find", "#059669"),
    ("Design", "#2563eb"),
    ("Simulation", "#ca8a04"),
    ("Matrix", "#0d9488"),
    ("Intervals", "#be185d"),
    ("Monotonic Stack", "#dc2626"),
]


async def main() -> None:
    settings = get_settings()
    engine = create_async_engine(settings.DATABASE_URL, echo=False)
    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    added = skipped = 0
    total = len(TAGS)

    print(f"Seeding {total} tags ...\n")

    async with session_factory() as session:
        for i, (name, color) in enumerate(TAGS, 1):
            slug = _slugify(name)
            existing = await session.execute(select(Tag).where(Tag.slug == slug))
            if existing.scalar_one_or_none() is not None:
                skipped += 1
                print(f"  [{i}/{total}] ~ {name} (exists)")
                continue

            tag = Tag(name=name, slug=slug, color=color, description=f"Problems involving {name.lower()}")
            session.add(tag)
            await session.flush()
            added += 1
            print(f"  [{i}/{total}] + {name}")

        await session.commit()

    await engine.dispose()
    print(f"\nSeeded {added} tags ({skipped} skipped)")


if __name__ == "__main__":
    asyncio.run(main())

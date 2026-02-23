"""
Seed the badges table with 25 badges across 4 tiers.

Idempotent — skips badges whose slug already exists.

Usage:
    cd backend
    python scripts/seed_badges.py
"""

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from slugify import slugify as _slugify
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.config import get_settings
from app.models.gamification import Badge

# (name, icon, description, criteria_type, criteria_value, xp_reward, tier)
BADGES = [
    # ── Bronze ────────────────────────────────────────────────
    ("First Blood", "🩸", "Solve your first problem", "problems_solved", 1, 10, "bronze"),
    ("Getting Started", "🌱", "Solve 5 problems", "problems_solved", 5, 25, "bronze"),
    ("Warm Up", "🔥", "Maintain a 3-day streak", "streak_days", 3, 15, "bronze"),
    ("Scribe", "✍️", "Write your first article", "articles_written", 1, 10, "bronze"),
    ("Helper", "🤝", "Answer your first question", "answers_given", 1, 10, "bronze"),
    ("Newcomer", "👋", "Earn 100 XP", "xp", 100, 20, "bronze"),

    # ── Silver ────────────────────────────────────────────────
    ("Problem Solver", "🧩", "Solve 25 problems", "problems_solved", 25, 50, "silver"),
    ("Dedicated", "📅", "Maintain a 7-day streak", "streak_days", 7, 40, "silver"),
    ("Wordsmith", "📝", "Write 5 articles", "articles_written", 5, 40, "silver"),
    ("Mentor", "🎓", "Give 10 answers", "answers_given", 10, 40, "silver"),
    ("Rising Star", "⭐", "Earn 500 XP", "xp", 500, 50, "silver"),
    ("Respected", "👍", "Earn 50 reputation", "reputation", 50, 40, "silver"),

    # ── Gold ──────────────────────────────────────────────────
    ("Centurion", "💯", "Solve 100 problems", "problems_solved", 100, 100, "gold"),
    ("Unstoppable", "⚡", "Maintain a 30-day streak", "streak_days", 30, 100, "gold"),
    ("Author", "📖", "Write 15 articles", "articles_written", 15, 80, "gold"),
    ("Oracle", "🔮", "Give 50 answers", "answers_given", 50, 80, "gold"),
    ("Veteran", "🏅", "Earn 2000 XP", "xp", 2000, 100, "gold"),
    ("Influencer", "🌟", "Earn 200 reputation", "reputation", 200, 80, "gold"),
    ("Polyglot", "🗣️", "Solve problems in 3 different languages", "languages_used", 3, 75, "gold"),

    # ── Platinum ──────────────────────────────────────────────
    ("Grandmaster", "👑", "Solve 250 problems", "problems_solved", 250, 200, "platinum"),
    ("Iron Will", "🏔️", "Maintain a 100-day streak", "streak_days", 100, 250, "platinum"),
    ("Prolific Writer", "🖊️", "Write 50 articles", "articles_written", 50, 200, "platinum"),
    ("Sage", "🧙", "Give 200 answers", "answers_given", 200, 200, "platinum"),
    ("Legend", "🏆", "Earn 10000 XP", "xp", 10000, 300, "platinum"),
    ("Community Pillar", "🏛️", "Earn 1000 reputation", "reputation", 1000, 250, "platinum"),
]


async def main() -> None:
    settings = get_settings()
    engine = create_async_engine(settings.DATABASE_URL, echo=False)
    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    added = skipped = 0
    total = len(BADGES)

    print(f"Seeding {total} badges ...\n")

    async with session_factory() as session:
        for i, (name, icon, description, criteria_type, criteria_value, xp_reward, tier) in enumerate(BADGES, 1):
            slug = _slugify(name)

            existing = await session.execute(select(Badge).where(Badge.slug == slug))
            if existing.scalar_one_or_none() is not None:
                skipped += 1
                print(f"  [{i}/{total}] ~ {name} (exists)")
                continue

            badge = Badge(
                name=name,
                slug=slug,
                description=description,
                icon=icon,
                criteria_type=criteria_type,
                criteria_value=criteria_value,
                xp_reward=xp_reward,
                tier=tier,
            )
            session.add(badge)
            await session.flush()
            added += 1
            print(f"  [{i}/{total}] + {name} ({tier})")

        await session.commit()

    await engine.dispose()
    print(f"\nSeeded {added} badges ({skipped} skipped)")


if __name__ == "__main__":
    asyncio.run(main())

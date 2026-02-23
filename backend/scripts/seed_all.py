"""
Master seed script — runs all seed scripts in correct order.

Usage:
    cd backend
    python scripts/seed_all.py
"""

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))


async def main() -> None:
    print("=" * 60)
    print("  LearnText — Master Seed Script")
    print("=" * 60)

    step = 0

    # 1. Tags (must come first — problems reference them)
    step += 1
    print(f"\n[{step}/25] Seeding Tags ...")
    print("-" * 40)
    from scripts.seed_tags import main as seed_tags
    await seed_tags()

    # 2. Companies (must come before problem batches that link companies)
    step += 1
    print(f"\n[{step}/25] Seeding Companies ...")
    print("-" * 40)
    from scripts.seed_companies import main as seed_companies
    await seed_companies()

    # 3. Problems — core set
    step += 1
    print(f"\n[{step}/25] Seeding Problems (core) ...")
    print("-" * 40)
    from scripts.seed_problems import main as seed_problems
    await seed_problems()

    # 4. Problems — extended set
    step += 1
    print(f"\n[{step}/25] Seeding Problems (extended) ...")
    print("-" * 40)
    from scripts.seed_problems_extended import main as seed_problems_ext
    await seed_problems_ext()

    # 5-17. Problems — batches 3-15 (with company links)
    for batch_num in range(3, 16):
        step += 1
        print(f"\n[{step}/25] Seeding Problems (batch {batch_num}) ...")
        print("-" * 40)
        mod = __import__(f"scripts.seed_problems_batch{batch_num}", fromlist=["main"])
        await mod.main()

    # 17. DSA Sheets (depends on problems)
    step += 1
    print(f"\n[{step}/25] Seeding DSA Sheets ...")
    print("-" * 40)
    from scripts.seed_dsa_sheets import main as seed_dsa_sheets
    await seed_dsa_sheets()

    # 18. Striver A2Z DSA Sheet (creates missing problems + full sheet)
    step += 1
    print(f"\n[{step}/25] Seeding Striver A2Z DSA Sheet (413 problems) ...")
    print("-" * 40)
    from scripts.seed_striver_a2z import main as seed_striver_a2z
    await seed_striver_a2z()

    # 19. Love Babbar 450 DSA Sheet (creates missing problems + full sheet)
    step += 1
    print(f"\n[{step}/25] Seeding Love Babbar 450 DSA Sheet ...")
    print("-" * 40)
    from scripts.seed_love_babbar_450 import main as seed_love_babbar
    await seed_love_babbar()

    # 20. Striver SDE Sheet 180 (creates missing problems + full sheet)
    step += 1
    print(f"\n[{step}/25] Seeding Striver SDE Sheet (180 problems) ...")
    print("-" * 40)
    from scripts.seed_striver_sde_180 import main as seed_striver_sde
    await seed_striver_sde()

    # 21. Badges (independent)
    step += 1
    print(f"\n[{step}/25] Seeding Badges ...")
    print("-" * 40)
    from scripts.seed_badges import main as seed_badges
    await seed_badges()

    # 23. Roadmaps (independent)
    step += 1
    print(f"\n[{step}/25] Seeding Roadmaps (12 learning paths) ...")
    print("-" * 40)
    from scripts.seed_roadmaps import main as seed_roadmaps
    await seed_roadmaps()

    # 24. Language Docs (independent)
    step += 1
    print(f"\n[{step}/25] Seeding Language Docs ...")
    print("-" * 40)
    from scripts.seed_language_docs import main as seed_language_docs
    await seed_language_docs()

    print("\n" + "=" * 60)
    print("  All seeds completed!")
    print("=" * 60)


if __name__ == "__main__":
    asyncio.run(main())

"""Contest service."""
from __future__ import annotations
import uuid
from datetime import datetime, timezone
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.exceptions import BadRequestException, NotFoundException
from app.models.contest import Contest, ContestParticipant
from app.utils.pagination import PaginatedResult, PaginationParams, paginate


async def list_contests(db: AsyncSession, *, page: int = 1, per_page: int = 20) -> PaginatedResult:
    stmt = select(Contest).order_by(Contest.start_time.desc())
    return await paginate(stmt, db, PaginationParams(page=page, per_page=per_page))


async def get_contest(db: AsyncSession, slug: str) -> Contest:
    result = await db.execute(select(Contest).where(Contest.slug == slug))
    contest = result.scalar_one_or_none()
    if contest is None:
        raise NotFoundException("Contest not found")
    return contest


async def register_for_contest(db: AsyncSession, contest_slug: str, user_id: uuid.UUID) -> ContestParticipant:
    contest = await get_contest(db, contest_slug)
    existing = await db.execute(
        select(ContestParticipant).where(ContestParticipant.contest_id == contest.id, ContestParticipant.user_id == user_id)
    )
    if existing.scalar_one_or_none():
        raise BadRequestException("Already registered")
    p = ContestParticipant(contest_id=contest.id, user_id=user_id)
    db.add(p)
    contest.participant_count += 1
    await db.flush()
    return p


async def get_contest_leaderboard(db: AsyncSession, slug: str) -> list[dict]:
    contest = await get_contest(db, slug)
    result = await db.execute(
        select(ContestParticipant).where(ContestParticipant.contest_id == contest.id).order_by(ContestParticipant.score.desc(), ContestParticipant.finish_time.asc())
    )
    participants = result.scalars().all()
    from app.models.user import User
    leaderboard = []
    for idx, p in enumerate(participants):
        user_result = await db.execute(select(User).where(User.id == p.user_id))
        user = user_result.scalar_one_or_none()
        leaderboard.append({
            "rank": idx + 1,
            "user_id": str(p.user_id),
            "username": user.username if user else "Unknown",
            "display_name": user.display_name if user else "Unknown",
            "score": p.score,
            "problems_solved": p.problems_solved,
            "finish_time": p.finish_time.isoformat() if p.finish_time else None,
        })
    return leaderboard

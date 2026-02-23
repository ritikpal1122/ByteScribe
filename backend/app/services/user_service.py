"""User service — profile CRUD, XP awards, leaderboard."""

from __future__ import annotations

import uuid
from datetime import date, datetime, timezone
from typing import Optional

from sqlalchemy import select, func, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.exceptions import NotFoundException
from app.models.gamification import DailyActivity
from app.models.user import User
from app.schemas.user import UserUpdate


# ---------------------------------------------------------------------------
# Lookups
# ---------------------------------------------------------------------------


async def get_user_by_id(db: AsyncSession, user_id: uuid.UUID) -> User:
    """Return a user by primary key or raise 404."""
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if user is None:
        raise NotFoundException("User not found")
    return user


async def get_user_by_username(db: AsyncSession, username: str) -> User:
    """Return a user by username or raise 404."""
    result = await db.execute(select(User).where(User.username == username))
    user = result.scalar_one_or_none()
    if user is None:
        raise NotFoundException("User not found")
    return user


# ---------------------------------------------------------------------------
# Profile update
# ---------------------------------------------------------------------------


async def update_user(
    db: AsyncSession,
    user_id: uuid.UUID,
    schema: UserUpdate,
) -> User:
    """Update editable profile fields for *user_id*."""
    user = await get_user_by_id(db, user_id)
    update_data = schema.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(user, field, value)

    await db.flush()
    return user


# ---------------------------------------------------------------------------
# XP & daily activity
# ---------------------------------------------------------------------------


async def award_xp(
    db: AsyncSession,
    user_id: uuid.UUID,
    amount: int,
    activity_type: str,
) -> User:
    """Add *amount* XP to the user and update today's :class:`DailyActivity`.

    Parameters
    ----------
    activity_type
        One of ``"problems_solved"``, ``"articles_written"``,
        ``"articles_read"``, ``"answers_given"``.
    """

    user = await get_user_by_id(db, user_id)
    user.xp += amount

    today = date.today()

    # Upsert daily activity row
    result = await db.execute(
        select(DailyActivity).where(
            DailyActivity.user_id == user_id,
            DailyActivity.activity_date == today,
        )
    )
    daily = result.scalar_one_or_none()

    if daily is None:
        daily = DailyActivity(
            user_id=user_id,
            activity_date=today,
            xp_earned=amount,
        )
        db.add(daily)
    else:
        daily.xp_earned += amount

    # Increment the specific counter if it exists on the model
    if hasattr(daily, activity_type):
        setattr(daily, activity_type, getattr(daily, activity_type) + 1)

    await db.flush()
    return user


# ---------------------------------------------------------------------------
# Leaderboard
# ---------------------------------------------------------------------------


async def get_leaderboard(
    db: AsyncSession,
    *,
    limit: int = 50,
    sort_by: str = "xp",
) -> list[dict]:
    """Return a ranked list of users sorted by *sort_by* (``xp`` or ``reputation``).

    Each entry is a dict with ``rank``, user fields, etc.
    """

    order_col = User.xp if sort_by == "xp" else User.reputation

    stmt = (
        select(User)
        .where(User.is_active.is_(True))
        .order_by(order_col.desc())
        .limit(limit)
    )

    result = await db.execute(stmt)
    users = result.scalars().all()

    return [
        {
            "rank": idx + 1,
            "user_id": user.id,
            "username": user.username,
            "display_name": user.display_name,
            "avatar_url": user.avatar_url,
            "xp": user.xp,
            "reputation": user.reputation,
            "problems_solved": user.problems_solved,
        }
        for idx, user in enumerate(users)
    ]

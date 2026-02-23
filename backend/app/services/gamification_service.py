"""Gamification service — daily activity logging, streaks, badges, leaderboard."""

from __future__ import annotations

import uuid
from datetime import date, timedelta
from typing import Optional

from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.exceptions import NotFoundException
from app.models.gamification import Badge, DailyActivity, UserBadge, UserStreak
from app.models.user import User


# ---------------------------------------------------------------------------
# Daily activity & streaks
# ---------------------------------------------------------------------------


async def log_activity(
    db: AsyncSession,
    user_id: uuid.UUID,
    activity_type: str,
) -> DailyActivity:
    """Create or update today's :class:`DailyActivity` and refresh the user streak.

    Parameters
    ----------
    activity_type
        Column name on :class:`DailyActivity` to increment, e.g.
        ``"problems_solved"``, ``"articles_written"``, ``"answers_given"``.
    """

    today = date.today()

    # ---- Upsert daily activity ------------------------------------------
    result = await db.execute(
        select(DailyActivity).where(
            and_(
                DailyActivity.user_id == user_id,
                DailyActivity.activity_date == today,
            )
        )
    )
    daily = result.scalar_one_or_none()

    if daily is None:
        daily = DailyActivity(
            user_id=user_id,
            activity_date=today,
        )
        db.add(daily)

    if hasattr(daily, activity_type):
        setattr(daily, activity_type, getattr(daily, activity_type) + 1)

    await db.flush()

    # ---- Update streak ---------------------------------------------------
    await _update_streak(db, user_id, today)

    return daily


async def _update_streak(
    db: AsyncSession,
    user_id: uuid.UUID,
    today: date,
) -> UserStreak:
    """Refresh the user's streak record based on today's date."""

    result = await db.execute(
        select(UserStreak).where(UserStreak.user_id == user_id)
    )
    streak = result.scalar_one_or_none()

    if streak is None:
        streak = UserStreak(
            user_id=user_id,
            current_streak=1,
            longest_streak=1,
            last_activity_date=today,
        )
        db.add(streak)
        await db.flush()
        return streak

    if streak.last_activity_date == today:
        # Already logged today — no change
        return streak

    if streak.last_activity_date == today - timedelta(days=1):
        # Consecutive day
        streak.current_streak += 1
    else:
        # Streak broken
        streak.current_streak = 1

    if streak.current_streak > streak.longest_streak:
        streak.longest_streak = streak.current_streak

    streak.last_activity_date = today
    await db.flush()
    return streak


# ---------------------------------------------------------------------------
# Badges
# ---------------------------------------------------------------------------


async def check_badges(
    db: AsyncSession,
    user_id: uuid.UUID,
) -> list[Badge]:
    """Check all badge criteria and award any newly earned badges.

    Returns the list of *newly* awarded badges.
    """

    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if user is None:
        raise NotFoundException("User not found")

    # Fetch streak info
    streak_result = await db.execute(
        select(UserStreak).where(UserStreak.user_id == user_id)
    )
    streak = streak_result.scalar_one_or_none()

    # Build a stats dict for criteria checking
    stats = {
        "problems_solved": user.problems_solved,
        "articles_written": user.articles_written,
        "answers_given": user.answers_given,
        "xp": user.xp,
        "reputation": user.reputation,
        "streak_days": streak.current_streak if streak else 0,
        "longest_streak": streak.longest_streak if streak else 0,
    }

    # Get all badges
    all_badges_result = await db.execute(select(Badge))
    all_badges = all_badges_result.scalars().all()

    # Get already-earned badge IDs
    earned_result = await db.execute(
        select(UserBadge.badge_id).where(UserBadge.user_id == user_id)
    )
    earned_ids = {row for row in earned_result.scalars().all()}

    newly_awarded: list[Badge] = []

    for badge in all_badges:
        if badge.id in earned_ids:
            continue

        stat_value = stats.get(badge.criteria_type, 0)
        if stat_value >= badge.criteria_value:
            user_badge = UserBadge(user_id=user_id, badge_id=badge.id)
            db.add(user_badge)

            # Award bonus XP
            if badge.xp_reward > 0:
                user.xp += badge.xp_reward

            newly_awarded.append(badge)

    if newly_awarded:
        await db.flush()

    return newly_awarded


async def get_streak(
    db: AsyncSession,
    user_id: uuid.UUID,
) -> Optional[UserStreak]:
    """Return the user's current streak record, or ``None``."""

    result = await db.execute(
        select(UserStreak).where(UserStreak.user_id == user_id)
    )
    return result.scalar_one_or_none()


async def get_badges(
    db: AsyncSession,
    user_id: uuid.UUID,
) -> list[UserBadge]:
    """Return all badges earned by a user."""

    result = await db.execute(
        select(UserBadge)
        .where(UserBadge.user_id == user_id)
        .order_by(UserBadge.created_at.desc())
    )
    return list(result.scalars().all())


async def get_leaderboard(
    db: AsyncSession,
    *,
    limit: int = 50,
    sort_by: str = "xp",
) -> list[dict]:
    """Return a ranked leaderboard.  Delegates to :func:`user_service.get_leaderboard`."""

    from app.services.user_service import get_leaderboard as _get_leaderboard

    return await _get_leaderboard(db, limit=limit, sort_by=sort_by)

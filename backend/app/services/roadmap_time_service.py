"""Roadmap time tracking — log study time per step + analytics."""

from __future__ import annotations

import uuid
from collections import defaultdict
from datetime import date, timedelta

from sqlalchemy import select, and_, func, cast, Date
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.roadmap_features import RoadmapTimeLog
from app.models.roadmap import RoadmapStep, RoadmapProgress


async def log_time(
    db: AsyncSession,
    user_id: uuid.UUID,
    roadmap_id: uuid.UUID,
    step_id: uuid.UUID,
    duration_seconds: int,
) -> RoadmapTimeLog:
    """Log a time entry for a roadmap step."""
    entry = RoadmapTimeLog(
        user_id=user_id,
        roadmap_id=roadmap_id,
        step_id=step_id,
        duration_seconds=duration_seconds,
    )
    db.add(entry)
    await db.flush()
    return entry


async def get_step_analytics(
    db: AsyncSession,
    user_id: uuid.UUID,
    roadmap_id: uuid.UUID,
) -> dict:
    """Return analytics data for a roadmap.

    Returns:
        time_per_step: list of {step_id, title, total_seconds}
        total_time_seconds: int
        daily_activity: list of {date, seconds} for last 30 days
        average_pace: float (seconds per step)
        estimated_remaining: float (seconds)
    """
    # Time per step
    time_q = await db.execute(
        select(
            RoadmapTimeLog.step_id,
            func.sum(RoadmapTimeLog.duration_seconds).label("total_seconds"),
        )
        .where(
            and_(
                RoadmapTimeLog.user_id == user_id,
                RoadmapTimeLog.roadmap_id == roadmap_id,
            )
        )
        .group_by(RoadmapTimeLog.step_id)
    )
    time_rows = time_q.all()

    # Get step titles
    step_ids = [row[0] for row in time_rows]
    titles: dict[uuid.UUID, str] = {}
    if step_ids:
        steps_q = await db.execute(
            select(RoadmapStep.id, RoadmapStep.title).where(
                RoadmapStep.id.in_(step_ids)
            )
        )
        titles = {row[0]: row[1] for row in steps_q.all()}

    time_per_step = [
        {
            "step_id": str(row[0]),
            "title": titles.get(row[0], "Unknown"),
            "total_seconds": row[1] or 0,
        }
        for row in time_rows
    ]

    total_time = sum(t["total_seconds"] for t in time_per_step)

    # Daily activity (last 30 days)
    thirty_days_ago = date.today() - timedelta(days=30)
    daily_q = await db.execute(
        select(
            cast(RoadmapTimeLog.logged_at, Date).label("day"),
            func.sum(RoadmapTimeLog.duration_seconds).label("seconds"),
        )
        .where(
            and_(
                RoadmapTimeLog.user_id == user_id,
                RoadmapTimeLog.roadmap_id == roadmap_id,
                cast(RoadmapTimeLog.logged_at, Date) >= thirty_days_ago,
            )
        )
        .group_by("day")
        .order_by("day")
    )
    daily_rows = daily_q.all()
    daily_activity = [
        {"date": row[0].isoformat(), "seconds": row[1] or 0}
        for row in daily_rows
    ]

    # Average pace and estimated remaining
    total_steps_q = await db.execute(
        select(func.count(RoadmapStep.id)).where(
            RoadmapStep.roadmap_id == roadmap_id
        )
    )
    total_steps = total_steps_q.scalar() or 0

    completed_q = await db.execute(
        select(func.count(RoadmapProgress.id)).where(
            and_(
                RoadmapProgress.roadmap_id == roadmap_id,
                RoadmapProgress.user_id == user_id,
                RoadmapProgress.is_completed.is_(True),
            )
        )
    )
    completed_steps = completed_q.scalar() or 0

    completed_with_time = len(time_per_step)
    average_pace = (total_time / completed_with_time) if completed_with_time > 0 else 0
    remaining_steps = max(0, total_steps - completed_steps)
    estimated_remaining = round(average_pace * remaining_steps)

    return {
        "time_per_step": time_per_step,
        "total_time_seconds": total_time,
        "daily_activity": daily_activity,
        "average_pace": round(average_pace),
        "estimated_remaining": estimated_remaining,
        "total_steps": total_steps,
        "completed_steps": completed_steps,
    }

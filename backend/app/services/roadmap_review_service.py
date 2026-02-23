"""Roadmap step review — SM-2 spaced repetition for roadmap steps."""

from __future__ import annotations

import uuid
from datetime import date, datetime, timedelta, timezone

from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.roadmap_features import RoadmapStepReview


async def auto_create_review(
    db: AsyncSession,
    user_id: uuid.UUID,
    roadmap_id: uuid.UUID,
    step_id: uuid.UUID,
) -> RoadmapStepReview | None:
    """Idempotently create a review card when a step is completed."""
    existing = await db.execute(
        select(RoadmapStepReview).where(
            and_(
                RoadmapStepReview.user_id == user_id,
                RoadmapStepReview.step_id == step_id,
            )
        )
    )
    if existing.scalar_one_or_none() is not None:
        return None

    review = RoadmapStepReview(
        user_id=user_id,
        roadmap_id=roadmap_id,
        step_id=step_id,
        ease_factor=2.5,
        interval_days=1,
        repetitions=0,
        next_review_date=date.today() + timedelta(days=1),
    )
    db.add(review)
    await db.flush()
    return review


async def get_due_reviews(
    db: AsyncSession,
    user_id: uuid.UUID,
    roadmap_id: uuid.UUID,
) -> list[RoadmapStepReview]:
    """Return reviews due today or earlier for a roadmap."""
    result = await db.execute(
        select(RoadmapStepReview).where(
            and_(
                RoadmapStepReview.user_id == user_id,
                RoadmapStepReview.roadmap_id == roadmap_id,
                RoadmapStepReview.next_review_date <= date.today(),
            )
        ).order_by(RoadmapStepReview.next_review_date)
    )
    return list(result.scalars().all())


async def get_due_step_ids(
    db: AsyncSession,
    user_id: uuid.UUID,
    roadmap_id: uuid.UUID,
) -> set[uuid.UUID]:
    """Return set of step IDs due for review (lightweight, for canvas glow)."""
    result = await db.execute(
        select(RoadmapStepReview.step_id).where(
            and_(
                RoadmapStepReview.user_id == user_id,
                RoadmapStepReview.roadmap_id == roadmap_id,
                RoadmapStepReview.next_review_date <= date.today(),
            )
        )
    )
    return {row[0] for row in result.all()}


async def review_step(
    db: AsyncSession,
    user_id: uuid.UUID,
    step_id: uuid.UUID,
    quality: int,
) -> RoadmapStepReview:
    """Apply SM-2 algorithm to update a review card after review.

    quality: 0-5 self-rating (0=complete blackout, 5=perfect recall)
    """
    result = await db.execute(
        select(RoadmapStepReview).where(
            and_(
                RoadmapStepReview.user_id == user_id,
                RoadmapStepReview.step_id == step_id,
            )
        )
    )
    card = result.scalar_one_or_none()
    if card is None:
        raise ValueError("Review card not found")

    quality = max(0, min(5, quality))

    if quality < 3:
        # Failed — reset
        card.repetitions = 0
        card.interval_days = 1
    else:
        if card.repetitions == 0:
            card.interval_days = 1
        elif card.repetitions == 1:
            card.interval_days = 6
        else:
            card.interval_days = round(card.interval_days * card.ease_factor)
        card.repetitions += 1

    # Update ease factor (SM-2 formula)
    card.ease_factor = max(
        1.3,
        card.ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
    )

    card.quality = quality
    card.last_reviewed_at = datetime.now(timezone.utc)
    card.next_review_date = date.today() + timedelta(days=card.interval_days)

    await db.flush()
    return card


async def get_review_for_step(
    db: AsyncSession,
    user_id: uuid.UUID,
    step_id: uuid.UUID,
) -> RoadmapStepReview | None:
    """Get the review card for a specific step."""
    result = await db.execute(
        select(RoadmapStepReview).where(
            and_(
                RoadmapStepReview.user_id == user_id,
                RoadmapStepReview.step_id == step_id,
            )
        )
    )
    return result.scalar_one_or_none()

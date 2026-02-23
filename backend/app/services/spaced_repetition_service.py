"""Spaced repetition service — SM-2 algorithm implementation."""

from __future__ import annotations

import uuid
from datetime import date, datetime, timedelta, timezone

from sqlalchemy import select, and_, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.spaced_repetition import SpacedRepetitionCard
from app.models.problem import Problem


async def auto_create_card(
    db: AsyncSession,
    user_id: uuid.UUID,
    problem_id: uuid.UUID,
) -> SpacedRepetitionCard | None:
    """Create a SR card after first accepted submission (idempotent)."""
    existing = await db.execute(
        select(SpacedRepetitionCard).where(
            and_(
                SpacedRepetitionCard.user_id == user_id,
                SpacedRepetitionCard.problem_id == problem_id,
            )
        )
    )
    if existing.scalar_one_or_none() is not None:
        return None

    card = SpacedRepetitionCard(
        user_id=user_id,
        problem_id=problem_id,
        ease_factor=2.5,
        interval_days=1,
        repetitions=0,
        next_review_date=date.today() + timedelta(days=1),
    )
    db.add(card)
    await db.flush()
    return card


async def get_due_cards(
    db: AsyncSession,
    user_id: uuid.UUID,
    limit: int = 20,
) -> list[SpacedRepetitionCard]:
    """Return cards due for review today or earlier."""
    result = await db.execute(
        select(SpacedRepetitionCard)
        .where(
            and_(
                SpacedRepetitionCard.user_id == user_id,
                SpacedRepetitionCard.next_review_date <= date.today(),
            )
        )
        .order_by(SpacedRepetitionCard.next_review_date)
        .limit(limit)
    )
    return list(result.scalars().all())


async def review_card(
    db: AsyncSession,
    user_id: uuid.UUID,
    card_id: uuid.UUID,
    quality: int,
) -> SpacedRepetitionCard:
    """Apply SM-2 algorithm to update a card after review.

    quality: 0-5 self-rating (0=complete blackout, 5=perfect recall)
    """
    result = await db.execute(
        select(SpacedRepetitionCard).where(
            and_(
                SpacedRepetitionCard.id == card_id,
                SpacedRepetitionCard.user_id == user_id,
            )
        )
    )
    card = result.scalar_one_or_none()
    if card is None:
        raise ValueError("Card not found")

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


async def get_review_stats(
    db: AsyncSession,
    user_id: uuid.UUID,
) -> dict:
    """Return summary stats for the user's SR deck."""
    today = date.today()
    week_ahead = today + timedelta(days=7)

    # Total cards
    total_q = await db.execute(
        select(func.count(SpacedRepetitionCard.id)).where(
            SpacedRepetitionCard.user_id == user_id
        )
    )
    total_cards = total_q.scalar() or 0

    # Due today
    due_q = await db.execute(
        select(func.count(SpacedRepetitionCard.id)).where(
            and_(
                SpacedRepetitionCard.user_id == user_id,
                SpacedRepetitionCard.next_review_date <= today,
            )
        )
    )
    due_today = due_q.scalar() or 0

    # Mastered (interval > 21 days)
    mastered_q = await db.execute(
        select(func.count(SpacedRepetitionCard.id)).where(
            and_(
                SpacedRepetitionCard.user_id == user_id,
                SpacedRepetitionCard.interval_days > 21,
            )
        )
    )
    mastered = mastered_q.scalar() or 0

    # Upcoming this week
    upcoming_q = await db.execute(
        select(func.count(SpacedRepetitionCard.id)).where(
            and_(
                SpacedRepetitionCard.user_id == user_id,
                SpacedRepetitionCard.next_review_date > today,
                SpacedRepetitionCard.next_review_date <= week_ahead,
            )
        )
    )
    upcoming_week = upcoming_q.scalar() or 0

    return {
        "due_today": due_today,
        "total_cards": total_cards,
        "mastered": mastered,
        "upcoming_week": upcoming_week,
    }

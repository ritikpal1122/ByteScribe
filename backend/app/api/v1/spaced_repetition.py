from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.base import APIResponse
from app.services import spaced_repetition_service

router = APIRouter()


class ReviewRequest(BaseModel):
    quality: int = Field(..., ge=0, le=5)


@router.get("/due", response_model=APIResponse)
async def get_due_cards(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get cards due for review today."""
    cards = await spaced_repetition_service.get_due_cards(db, current_user.id)
    data = [
        {
            "id": str(c.id),
            "problem_id": str(c.problem_id),
            "problem_title": c.problem.title if c.problem else "Unknown",
            "problem_slug": c.problem.slug if c.problem else "",
            "problem_difficulty": c.problem.difficulty if c.problem else "easy",
            "ease_factor": c.ease_factor,
            "interval_days": c.interval_days,
            "repetitions": c.repetitions,
            "next_review_date": c.next_review_date.isoformat(),
            "last_reviewed_at": c.last_reviewed_at.isoformat() if c.last_reviewed_at else None,
        }
        for c in cards
    ]
    return APIResponse(success=True, data=data, message="Due cards retrieved")


@router.post("/{card_id}/review", response_model=APIResponse)
async def review_card(
    card_id: str,
    body: ReviewRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Submit a review rating for a card (SM-2 algorithm)."""
    try:
        card = await spaced_repetition_service.review_card(
            db, current_user.id, card_id, body.quality
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    return APIResponse(
        success=True,
        data={
            "id": str(card.id),
            "ease_factor": card.ease_factor,
            "interval_days": card.interval_days,
            "repetitions": card.repetitions,
            "next_review_date": card.next_review_date.isoformat(),
        },
        message="Card reviewed",
    )


@router.get("/stats", response_model=APIResponse)
async def get_review_stats(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get spaced repetition statistics."""
    stats = await spaced_repetition_service.get_review_stats(db, current_user.id)
    return APIResponse(success=True, data=stats, message="Review stats retrieved")

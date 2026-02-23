from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.base import APIResponse
from app.services import code_review_service

router = APIRouter()


@router.post("/{submission_id}", response_model=APIResponse)
async def request_review(
    submission_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Trigger an AI code review for a submission."""
    try:
        review = await code_review_service.request_review(
            db, submission_id, current_user.id
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    return APIResponse(
        success=True,
        data={
            "id": str(review.id),
            "submission_id": str(review.submission_id),
            "time_complexity": review.time_complexity,
            "space_complexity": review.space_complexity,
            "overall_rating": review.overall_rating,
            "summary": review.summary,
            "strengths": review.strengths,
            "improvements": review.improvements,
        },
        message="Code review generated",
    )


@router.get("/{submission_id}", response_model=APIResponse)
async def get_review(
    submission_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get an existing code review for a submission."""
    review = await code_review_service.get_review(db, submission_id)
    if review is None:
        return APIResponse(success=True, data=None, message="No review found")
    return APIResponse(
        success=True,
        data={
            "id": str(review.id),
            "submission_id": str(review.submission_id),
            "time_complexity": review.time_complexity,
            "space_complexity": review.space_complexity,
            "overall_rating": review.overall_rating,
            "summary": review.summary,
            "strengths": review.strengths,
            "improvements": review.improvements,
        },
        message="Code review retrieved",
    )

from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user
from app.models.problem import Submission
from app.models.user import User
from app.schemas.base import APIResponse
from app.schemas.user import UserUpdate
from app.services import user_service
from app.utils.pagination import PaginatedResult, PaginationParams, paginate

router = APIRouter()


@router.put("/me", response_model=APIResponse)
async def update_profile(
    data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update the authenticated user's profile."""
    result = await user_service.update_user(db, current_user.id, data)
    return APIResponse(success=True, data={
        "id": str(result.id),
        "username": result.username,
        "email": result.email,
        "display_name": result.display_name,
        "avatar_url": result.avatar_url,
        "bio": result.bio,
        "role": result.role,
        "xp": result.xp,
        "reputation": result.reputation,
        "created_at": result.created_at.isoformat() if result.created_at else None,
    }, message="Profile updated")


@router.get("/me/submissions", response_model=APIResponse)
async def list_my_submissions(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List the authenticated user's code submissions."""
    stmt = (
        select(Submission)
        .where(Submission.user_id == current_user.id)
        .order_by(Submission.created_at.desc())
    )
    result = await paginate(stmt, db, PaginationParams(page=page, per_page=per_page))
    items = [
        {
            "id": str(s.id),
            "problem_id": str(s.problem_id),
            "language": s.language,
            "verdict": s.verdict,
            "runtime_ms": s.runtime_ms,
            "memory_kb": s.memory_kb,
            "test_cases_passed": s.test_cases_passed,
            "total_test_cases": s.total_test_cases,
            "created_at": s.created_at.isoformat() if s.created_at else None,
        }
        for s in result.items
    ]
    return APIResponse(
        success=True,
        data={
            "items": items,
            "total": result.total,
            "page": result.page,
            "per_page": result.per_page,
            "total_pages": result.total_pages,
            "has_next": result.has_next,
            "has_prev": result.has_prev,
        },
        message="Submissions retrieved",
    )


@router.get("/{username}", response_model=APIResponse)
async def get_public_profile(
    username: str,
    db: AsyncSession = Depends(get_db),
):
    """Get a user's public profile by username."""
    from app.services.gamification_service import get_streak, get_badges
    from app.models.gamification import DailyActivity, Badge
    from app.services import dsa_sheet_service
    user = await user_service.get_user_by_username(db, username)
    streak = await get_streak(db, user.id)
    user_badges = await get_badges(db, user.id)
    sheet_progress = await dsa_sheet_service.get_user_progress_summary(db, user.id)

    # Get activity heatmap for last 12 weeks
    from datetime import date, timedelta
    start_date = date.today() - timedelta(weeks=12)
    activity_result = await db.execute(
        select(DailyActivity).where(
            DailyActivity.user_id == user.id,
            DailyActivity.activity_date >= start_date,
        ).order_by(DailyActivity.activity_date)
    )
    activities = activity_result.scalars().all()
    activity_dates = {a.activity_date for a in activities}

    # Build badges list
    badges_data = []
    for ub in user_badges:
        badge_result = await db.execute(select(Badge).where(Badge.id == ub.badge_id))
        badge = badge_result.scalar_one_or_none()
        if badge:
            badges_data.append({
                "id": str(badge.id),
                "name": badge.name,
                "icon": badge.icon,
                "tier": badge.tier,
                "earned_at": ub.created_at.isoformat() if ub.created_at else None,
            })

    return APIResponse(success=True, data={
        "id": str(user.id),
        "username": user.username,
        "display_name": user.display_name,
        "avatar_url": user.avatar_url,
        "bio": user.bio,
        "role": user.role,
        "xp": user.xp,
        "reputation": user.reputation,
        "problems_solved": user.problems_solved,
        "articles_written": user.articles_written,
        "answers_given": user.answers_given,
        "github_username": user.github_username,
        "streak": {
            "current_streak": streak.current_streak if streak else 0,
            "longest_streak": streak.longest_streak if streak else 0,
        },
        "badges": badges_data,
        "activity_dates": [d.isoformat() for d in sorted(activity_dates)],
        "sheet_progress": sheet_progress,
        "created_at": user.created_at.isoformat() if user.created_at else None,
    }, message="Profile retrieved")

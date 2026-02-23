from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.base import APIResponse
from app.services import gamification_service

router = APIRouter()


@router.get("/streak", response_model=APIResponse)
async def get_streak(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get the authenticated user's current streak information."""
    result = await gamification_service.get_streak(db, current_user.id)
    return APIResponse(success=True, data=result, message="Streak retrieved")


@router.get("/badges", response_model=APIResponse)
async def get_badges(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get the authenticated user's earned badges."""
    result = await gamification_service.get_badges(db, current_user.id)
    return APIResponse(success=True, data=result, message="Badges retrieved")


@router.get("/leaderboard", response_model=APIResponse)
async def get_leaderboard(
    period: str = Query("weekly", regex="^(daily|weekly|monthly|all_time)$"),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    """Get the leaderboard rankings."""
    result = await gamification_service.get_leaderboard(db, limit=per_page, sort_by="xp")
    return APIResponse(success=True, data=result, message="Leaderboard retrieved")


@router.get("/activity-heatmap", response_model=APIResponse)
async def activity_heatmap(
    weeks: int = Query(52, ge=1, le=104),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get activity heatmap data for the last N weeks."""
    from datetime import date, timedelta
    from app.models.gamification import DailyActivity
    start_date = date.today() - timedelta(weeks=weeks)
    result = await db.execute(
        select(DailyActivity).where(
            DailyActivity.user_id == current_user.id,
            DailyActivity.activity_date >= start_date,
        ).order_by(DailyActivity.activity_date)
    )
    activities = result.scalars().all()
    data = [
        {
            "date": a.activity_date.isoformat(),
            "problems_solved": a.problems_solved,
            "articles_read": a.articles_read,
            "xp_earned": a.xp_earned,
            "count": a.problems_solved + a.articles_read + a.answers_given,
        }
        for a in activities
    ]
    return APIResponse(success=True, data=data, message="Activity heatmap retrieved")


@router.get("/stats", response_model=APIResponse)
async def user_stats(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get comprehensive user stats for the analytics dashboard."""
    from app.models.gamification import DailyActivity
    from app.models.problem import Submission, Problem
    from sqlalchemy import func

    # Total submissions
    sub_count = await db.execute(
        select(func.count(Submission.id)).where(Submission.user_id == current_user.id)
    )
    total_submissions = sub_count.scalar() or 0

    # Accepted submissions
    acc_count = await db.execute(
        select(func.count(Submission.id)).where(Submission.user_id == current_user.id, Submission.verdict == "accepted")
    )
    total_accepted = acc_count.scalar() or 0

    # Submissions by language
    lang_result = await db.execute(
        select(Submission.language, func.count(Submission.id)).where(Submission.user_id == current_user.id).group_by(Submission.language)
    )
    by_language = {lang: count for lang, count in lang_result.all()}

    # Submissions by difficulty (join with problems)
    diff_result = await db.execute(
        select(Problem.difficulty, func.count(Submission.id))
        .join(Problem, Problem.id == Submission.problem_id)
        .where(Submission.user_id == current_user.id, Submission.verdict == "accepted")
        .group_by(Problem.difficulty)
    )
    by_difficulty = {diff: count for diff, count in diff_result.all()}

    streak = await gamification_service.get_streak(db, current_user.id)

    return APIResponse(success=True, data={
        "problems_solved": current_user.problems_solved,
        "total_submissions": total_submissions,
        "total_accepted": total_accepted,
        "acceptance_rate": round(total_accepted / total_submissions * 100, 1) if total_submissions > 0 else 0,
        "xp": current_user.xp,
        "reputation": current_user.reputation,
        "articles_written": current_user.articles_written,
        "answers_given": current_user.answers_given,
        "current_streak": streak.current_streak if streak else 0,
        "longest_streak": streak.longest_streak if streak else 0,
        "by_language": by_language,
        "by_difficulty": by_difficulty,
    }, message="User stats retrieved")

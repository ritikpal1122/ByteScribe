from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.base import APIResponse
from app.services import contest_service

router = APIRouter()


@router.get("/", response_model=APIResponse)
async def list_contests(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    result = await contest_service.list_contests(db, page=page, per_page=per_page)
    items = [
        {
            "id": str(c.id),
            "title": c.title,
            "slug": c.slug,
            "description": c.description,
            "start_time": c.start_time.isoformat() if c.start_time else None,
            "end_time": c.end_time.isoformat() if c.end_time else None,
            "duration_minutes": c.duration_minutes,
            "is_active": c.is_active,
            "participant_count": c.participant_count,
        }
        for c in result.items
    ]
    return APIResponse(success=True, data={"items": items, "total": result.total, "page": result.page, "per_page": result.per_page, "total_pages": result.total_pages, "has_next": result.has_next, "has_prev": result.has_prev}, message="Contests retrieved")


@router.get("/{slug}", response_model=APIResponse)
async def get_contest(slug: str, db: AsyncSession = Depends(get_db)):
    c = await contest_service.get_contest(db, slug)
    return APIResponse(success=True, data={
        "id": str(c.id),
        "title": c.title,
        "slug": c.slug,
        "description": c.description,
        "start_time": c.start_time.isoformat() if c.start_time else None,
        "end_time": c.end_time.isoformat() if c.end_time else None,
        "duration_minutes": c.duration_minutes,
        "is_active": c.is_active,
        "problem_ids": c.problem_ids,
        "participant_count": c.participant_count,
    }, message="Contest retrieved")


@router.post("/{slug}/register", response_model=APIResponse, status_code=201)
async def register_contest(
    slug: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await contest_service.register_for_contest(db, slug, current_user.id)
    return APIResponse(success=True, data=None, message="Registered for contest")


@router.get("/{slug}/leaderboard", response_model=APIResponse)
async def contest_leaderboard(slug: str, db: AsyncSession = Depends(get_db)):
    lb = await contest_service.get_contest_leaderboard(db, slug)
    return APIResponse(success=True, data=lb, message="Contest leaderboard retrieved")

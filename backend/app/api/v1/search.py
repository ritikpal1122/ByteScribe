from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user_optional
from app.models.user import User
from app.schemas.base import APIResponse
from app.services import search_service

router = APIRouter()


@router.get("/", response_model=APIResponse)
async def search(
    q: str = Query(..., min_length=1, description="Search query string"),
    content_types: str | None = Query(
        None,
        description="Comma-separated content types to search (articles,questions,problems)",
    ),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    current_user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """Search across articles, questions, and problems."""
    types_list = [t.strip() for t in content_types.split(",")] if content_types else None
    result = await search_service.search(q, types_list, page, per_page, current_user, db)
    return APIResponse(success=True, data=result, message="Search results retrieved")

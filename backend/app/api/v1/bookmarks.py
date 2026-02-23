from uuid import UUID

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.base import APIResponse
from app.schemas.bookmark import BookmarkCreate
from app.services import bookmark_service

router = APIRouter()


def _bookmark_to_dict(b) -> dict:
    return {
        "id": str(b.id),
        "user_id": str(b.user_id),
        "content_type": b.content_type,
        "content_id": str(b.content_id),
        "created_at": b.created_at.isoformat() if b.created_at else None,
    }


@router.get("/", response_model=APIResponse)
async def list_bookmarks(
    content_type: str | None = Query(None, description="Filter by content type"),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List the authenticated user's bookmarks with optional content type filter."""
    result = await bookmark_service.get_bookmarks(
        db, current_user.id, content_type=content_type, page=page, per_page=per_page
    )
    items = [_bookmark_to_dict(b) for b in result.items]
    return APIResponse(success=True, data={
        "items": items,
        "total": result.total,
        "page": result.page,
        "per_page": result.per_page,
        "total_pages": result.total_pages,
        "has_next": result.has_next,
        "has_prev": result.has_prev,
    }, message="Bookmarks retrieved")


@router.post("/", response_model=APIResponse, status_code=201)
async def create_bookmark(
    data: BookmarkCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Bookmark a piece of content."""
    result = await bookmark_service.create_bookmark(db, data, current_user.id)
    return APIResponse(success=True, data=_bookmark_to_dict(result), message="Bookmark created")


@router.delete("/{id}", response_model=APIResponse)
async def delete_bookmark(
    id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Remove a bookmark."""
    await bookmark_service.delete_bookmark(db, id, current_user.id)
    return APIResponse(success=True, data=None, message="Bookmark deleted")

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.base import APIResponse
from app.schemas.tag import TagCreate
from app.services import tag_service

router = APIRouter()


def _tag_to_dict(tag) -> dict:
    return {
        "id": str(tag.id),
        "name": tag.name,
        "slug": tag.slug,
        "description": tag.description,
        "color": tag.color,
        "usage_count": tag.usage_count,
        "created_at": tag.created_at.isoformat() if tag.created_at else None,
    }


@router.get("/", response_model=APIResponse)
async def list_tags(
    page: int = Query(1, ge=1),
    per_page: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_db),
):
    """List all tags."""
    result = await tag_service.get_tags(db, page=page, per_page=per_page)
    items = [_tag_to_dict(t) for t in result.items]
    return APIResponse(success=True, data={
        "items": items,
        "total": result.total,
        "page": result.page,
        "per_page": result.per_page,
        "total_pages": result.total_pages,
        "has_next": result.has_next,
        "has_prev": result.has_prev,
    }, message="Tags retrieved")


@router.post("/", response_model=APIResponse, status_code=201)
async def create_tag(
    data: TagCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a new tag. Admin only."""
    result = await tag_service.create_tag(db, data)
    return APIResponse(success=True, data=_tag_to_dict(result), message="Tag created")


@router.get("/{slug}", response_model=APIResponse)
async def get_tag(
    slug: str,
    db: AsyncSession = Depends(get_db),
):
    """Get tag detail by slug, including associated content counts."""
    result = await tag_service.get_tag_by_slug(db, slug)
    return APIResponse(success=True, data=_tag_to_dict(result), message="Tag retrieved")

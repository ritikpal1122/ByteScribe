from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user, get_current_user_optional
from app.models.user import User
from app.schemas.base import APIResponse
from app.schemas.roadmap import RoadmapCreate
from app.services import roadmap_service

router = APIRouter()


class ProgressUpdateRequest(BaseModel):
    """Request body for updating progress on a roadmap step."""
    step_id: str
    is_completed: bool = True


@router.get("/", response_model=APIResponse)
async def list_roadmaps(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    search: str | None = Query(None),
    difficulty: str | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    """List available roadmaps."""
    result = await roadmap_service.get_roadmaps(
        db, page=page, per_page=per_page, search=search, difficulty=difficulty,
    )
    return APIResponse(success=True, data=result, message="Roadmaps retrieved")


@router.post("/", response_model=APIResponse, status_code=201)
async def create_roadmap(
    data: RoadmapCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a new roadmap."""
    steps = [step.model_dump() for step in data.steps] if data.steps else None
    result = await roadmap_service.create_roadmap(
        db,
        title=data.title,
        description=data.description or "",
        author_id=current_user.id,
        steps=steps,
    )
    return APIResponse(success=True, data=result, message="Roadmap created")


@router.get("/{slug}", response_model=APIResponse)
async def get_roadmap(
    slug: str,
    current_user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """Get roadmap detail by slug."""
    user_id = current_user.id if current_user else None
    result = await roadmap_service.get_roadmap(db, slug, user_id=user_id)
    return APIResponse(success=True, data=result, message="Roadmap retrieved")


@router.post("/{slug}/progress", response_model=APIResponse)
async def update_progress(
    slug: str,
    data: ProgressUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update progress on a roadmap item."""
    roadmap = await roadmap_service.get_roadmap(db, slug)
    result = await roadmap_service.update_progress(
        db,
        roadmap_id=roadmap["id"],
        step_id=data.step_id,
        user_id=current_user.id,
        is_completed=data.is_completed,
    )
    return APIResponse(success=True, data=result, message="Progress updated")

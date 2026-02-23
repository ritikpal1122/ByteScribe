from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user, get_current_user_optional
from app.models.user import User
from app.schemas.base import APIResponse
from app.services import dsa_sheet_service

router = APIRouter()


@router.get("/", response_model=APIResponse)
async def list_sheets(db: AsyncSession = Depends(get_db)):
    """List all available DSA sheets."""
    result = await dsa_sheet_service.list_sheets(db)
    return APIResponse(success=True, data=result, message="DSA sheets retrieved")


@router.get("/my-progress", response_model=APIResponse)
async def my_progress(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get the authenticated user's progress across all DSA sheets."""
    result = await dsa_sheet_service.get_user_progress_summary(db, current_user.id)
    return APIResponse(success=True, data=result, message="Sheet progress retrieved")


@router.get("/{slug}", response_model=APIResponse)
async def get_sheet(
    slug: str,
    current_user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """Get sheet detail with problems grouped by section."""
    user_id = current_user.id if current_user else None
    result = await dsa_sheet_service.get_sheet_detail(db, slug, user_id)
    return APIResponse(success=True, data=result, message="Sheet detail retrieved")


@router.put("/{slug}/problems/{problem_id}/progress", response_model=APIResponse)
async def toggle_progress(
    slug: str,
    problem_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Toggle completion status of a problem in a sheet."""
    import uuid as _uuid
    result = await dsa_sheet_service.toggle_progress(
        db, slug, _uuid.UUID(problem_id), current_user.id
    )
    return APIResponse(success=True, data=result, message="Progress updated")

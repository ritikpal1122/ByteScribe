from uuid import UUID

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.base import APIResponse
from app.schemas.study_plan import (
    AddItemsRequest,
    GenerateStudyPlanRequest,
    ReorderRequest,
    StudyPlanCreate,
    StudyPlanUpdate,
)
from app.services import study_plan_service

router = APIRouter()


@router.get("/", response_model=APIResponse)
async def list_study_plans(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List the authenticated user's study plans."""
    result = await study_plan_service.get_plans(db, current_user.id, page=page, per_page=per_page)
    return APIResponse(success=True, data=result, message="Study plans retrieved")


@router.post("/", response_model=APIResponse, status_code=201)
async def create_study_plan(
    data: StudyPlanCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a new study plan manually."""
    items = [item.model_dump() for item in data.items] if data.items else None
    result = await study_plan_service.create_plan(
        db,
        current_user.id,
        title=data.title,
        description=data.description,
        target_role=data.target_role,
        target_company=data.target_company,
        duration_weeks=data.duration_weeks,
        items=items,
    )
    return APIResponse(success=True, data=result, message="Study plan created")


@router.get("/{plan_id}", response_model=APIResponse)
async def get_study_plan(
    plan_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get a single study plan with items."""
    result = await study_plan_service.get_plan_detail(db, plan_id, current_user.id)
    return APIResponse(success=True, data=result, message="Study plan retrieved")


@router.put("/{plan_id}", response_model=APIResponse)
async def update_study_plan(
    plan_id: UUID,
    data: StudyPlanUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update study plan metadata."""
    result = await study_plan_service.update_plan(
        db,
        plan_id,
        current_user.id,
        **data.model_dump(exclude_unset=True),
    )
    return APIResponse(success=True, data=result, message="Study plan updated")


@router.delete("/{plan_id}", response_model=APIResponse)
async def delete_study_plan(
    plan_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Delete a study plan."""
    await study_plan_service.delete_plan(db, plan_id, current_user.id)
    return APIResponse(success=True, data=None, message="Study plan deleted")


@router.post("/{plan_id}/items", response_model=APIResponse, status_code=201)
async def add_plan_items(
    plan_id: UUID,
    data: AddItemsRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Add items (problems or custom) to a study plan."""
    items = [item.model_dump() for item in data.items]
    result = await study_plan_service.add_items(db, plan_id, current_user.id, items)
    return APIResponse(success=True, data=result, message="Items added")


@router.delete("/{plan_id}/items/{item_id}", response_model=APIResponse)
async def remove_plan_item(
    plan_id: UUID,
    item_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Remove a single item from a study plan."""
    result = await study_plan_service.remove_item(db, plan_id, item_id, current_user.id)
    return APIResponse(success=True, data=result, message="Item removed")


@router.put("/{plan_id}/items/reorder", response_model=APIResponse)
async def reorder_plan_items(
    plan_id: UUID,
    data: ReorderRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Reorder study plan items."""
    result = await study_plan_service.reorder_items(db, plan_id, current_user.id, data.item_ids)
    return APIResponse(success=True, data=result, message="Items reordered")


@router.put("/{plan_id}/items/{item_id}/toggle", response_model=APIResponse)
async def toggle_item(
    plan_id: UUID,
    item_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Toggle a study plan item's completion status."""
    result = await study_plan_service.toggle_item_complete(db, plan_id, item_id, current_user.id)
    return APIResponse(success=True, data=result, message="Item toggled")


@router.post("/generate", response_model=APIResponse, status_code=201)
async def generate_study_plan(
    data: GenerateStudyPlanRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Generate a study plan using AI based on user preferences."""
    result = await study_plan_service.generate_ai_plan(
        db,
        current_user.id,
        target_role=data.target_role,
        target_company=data.target_company,
        duration_weeks=data.duration_weeks,
        topics=data.topics,
    )
    return APIResponse(success=True, data=result, message="Study plan generated")

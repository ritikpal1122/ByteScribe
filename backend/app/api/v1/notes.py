from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.base import APIResponse
from app.schemas.note import NoteCreate, NoteUpdate
from app.services import note_service

router = APIRouter()


@router.get("/", response_model=APIResponse)
async def list_notes(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List the authenticated user's notes."""
    result = await note_service.get_notes(db, current_user.id, page=page, per_page=per_page)
    return APIResponse(success=True, data=result, message="Notes retrieved")


@router.post("/", response_model=APIResponse, status_code=201)
async def create_note(
    data: NoteCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a new note."""
    result = await note_service.create_note(
        db,
        title=data.title,
        content=data.content or "",
        owner_id=current_user.id,
        visibility=data.visibility or "private",
    )
    return APIResponse(success=True, data=result, message="Note created")


@router.get("/{id}", response_model=APIResponse)
async def get_note(
    id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get a note by ID."""
    result = await note_service.get_note(db, id, current_user.id)
    return APIResponse(success=True, data=result, message="Note retrieved")


@router.put("/{id}", response_model=APIResponse)
async def update_note(
    id: int,
    data: NoteUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update a note by ID."""
    result = await note_service.update_note(
        db,
        id,
        current_user.id,
        title=data.title,
        content=data.content,
        visibility=data.visibility,
    )
    return APIResponse(success=True, data=result, message="Note updated")


@router.delete("/{id}", response_model=APIResponse)
async def delete_note(
    id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Delete a note by ID."""
    await note_service.delete_note(db, id, current_user.id)
    return APIResponse(success=True, data=None, message="Note deleted")

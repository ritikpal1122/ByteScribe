"""Note service — collaborative notes CRUD (stub)."""

from __future__ import annotations

import uuid
from typing import Optional

from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.constants import NotePermission, NoteVisibility
from app.exceptions import ForbiddenException, NotFoundException
from app.models.note import Note, NoteCollaborator
from app.utils.pagination import PaginatedResult, PaginationParams, paginate


# ---------------------------------------------------------------------------
# CRUD
# ---------------------------------------------------------------------------


async def create_note(
    db: AsyncSession,
    title: str,
    content: str,
    owner_id: uuid.UUID,
    visibility: str = NoteVisibility.PRIVATE,
) -> Note:
    """Create a new note."""

    note = Note(
        title=title,
        content=content,
        owner_id=owner_id,
        visibility=visibility,
    )
    db.add(note)
    await db.flush()
    return note


async def get_notes(
    db: AsyncSession,
    owner_id: uuid.UUID,
    *,
    page: int = 1,
    per_page: int = 20,
) -> PaginatedResult:
    """Return paginated notes owned by or shared with *owner_id*."""

    stmt = (
        select(Note)
        .where(Note.owner_id == owner_id)
        .order_by(Note.updated_at.desc())
    )
    return await paginate(stmt, db, PaginationParams(page=page, per_page=per_page))


async def get_note(
    db: AsyncSession,
    note_id: uuid.UUID,
    user_id: uuid.UUID,
) -> Note:
    """Return a note by ID.  The user must be the owner or a collaborator."""

    result = await db.execute(select(Note).where(Note.id == note_id))
    note = result.scalar_one_or_none()
    if note is None:
        raise NotFoundException("Note not found")

    if note.owner_id != user_id and note.visibility == NoteVisibility.PRIVATE:
        # Check if user is a collaborator
        collab = await db.execute(
            select(NoteCollaborator).where(
                and_(
                    NoteCollaborator.note_id == note_id,
                    NoteCollaborator.user_id == user_id,
                )
            )
        )
        if collab.scalar_one_or_none() is None:
            raise ForbiddenException("You do not have access to this note")

    return note


async def update_note(
    db: AsyncSession,
    note_id: uuid.UUID,
    user_id: uuid.UUID,
    *,
    title: Optional[str] = None,
    content: Optional[str] = None,
    visibility: Optional[str] = None,
) -> Note:
    """Update a note.  Only the owner (or write-collaborators) may update."""

    note = await get_note(db, note_id, user_id)

    if note.owner_id != user_id:
        # Check write permission
        collab = await db.execute(
            select(NoteCollaborator).where(
                and_(
                    NoteCollaborator.note_id == note_id,
                    NoteCollaborator.user_id == user_id,
                    NoteCollaborator.permission == NotePermission.WRITE,
                )
            )
        )
        if collab.scalar_one_or_none() is None:
            raise ForbiddenException("You do not have write access to this note")

    if title is not None:
        note.title = title
    if content is not None:
        note.content = content
    if visibility is not None:
        note.visibility = visibility

    await db.flush()
    return note


async def delete_note(
    db: AsyncSession,
    note_id: uuid.UUID,
    user_id: uuid.UUID,
) -> None:
    """Delete a note.  Only the owner may delete."""

    note = await get_note(db, note_id, user_id)

    if note.owner_id != user_id:
        raise ForbiddenException("Only the owner can delete a note")

    await db.delete(note)
    await db.flush()


async def add_collaborator(
    db: AsyncSession,
    note_id: uuid.UUID,
    owner_id: uuid.UUID,
    collaborator_id: uuid.UUID,
    permission: str = NotePermission.READ,
) -> NoteCollaborator:
    """Add a collaborator to a note.  Only the owner may add collaborators."""

    result = await db.execute(select(Note).where(Note.id == note_id))
    note = result.scalar_one_or_none()
    if note is None:
        raise NotFoundException("Note not found")

    if note.owner_id != owner_id:
        raise ForbiddenException("Only the owner can add collaborators")

    # Check if already a collaborator
    existing = await db.execute(
        select(NoteCollaborator).where(
            and_(
                NoteCollaborator.note_id == note_id,
                NoteCollaborator.user_id == collaborator_id,
            )
        )
    )
    collab = existing.scalar_one_or_none()
    if collab:
        collab.permission = permission
    else:
        collab = NoteCollaborator(
            note_id=note_id,
            user_id=collaborator_id,
            permission=permission,
        )
        db.add(collab)

    await db.flush()
    return collab

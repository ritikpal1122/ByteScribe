"""Roadmap step notes — per-user markdown notes with optional code snippets."""

from __future__ import annotations

import uuid
from typing import Optional

from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.roadmap_features import RoadmapStepNote


async def upsert_note(
    db: AsyncSession,
    user_id: uuid.UUID,
    roadmap_id: uuid.UUID,
    step_id: uuid.UUID,
    content: str,
    code_snippet: Optional[str] = None,
    language: Optional[str] = None,
) -> RoadmapStepNote:
    """Create or update a note for a roadmap step."""
    result = await db.execute(
        select(RoadmapStepNote).where(
            and_(
                RoadmapStepNote.user_id == user_id,
                RoadmapStepNote.step_id == step_id,
            )
        )
    )
    note = result.scalar_one_or_none()

    if note is None:
        note = RoadmapStepNote(
            user_id=user_id,
            roadmap_id=roadmap_id,
            step_id=step_id,
            content=content,
            code_snippet=code_snippet,
            language=language,
        )
        db.add(note)
    else:
        note.content = content
        note.code_snippet = code_snippet
        note.language = language

    await db.flush()
    return note


async def get_note(
    db: AsyncSession,
    user_id: uuid.UUID,
    step_id: uuid.UUID,
) -> Optional[RoadmapStepNote]:
    """Retrieve a user's note for a step."""
    result = await db.execute(
        select(RoadmapStepNote).where(
            and_(
                RoadmapStepNote.user_id == user_id,
                RoadmapStepNote.step_id == step_id,
            )
        )
    )
    return result.scalar_one_or_none()


async def delete_note(
    db: AsyncSession,
    user_id: uuid.UUID,
    step_id: uuid.UUID,
) -> bool:
    """Delete a user's note for a step. Returns True if deleted."""
    result = await db.execute(
        select(RoadmapStepNote).where(
            and_(
                RoadmapStepNote.user_id == user_id,
                RoadmapStepNote.step_id == step_id,
            )
        )
    )
    note = result.scalar_one_or_none()
    if note is None:
        return False
    await db.delete(note)
    await db.flush()
    return True

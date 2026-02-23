"""API routes for roadmap step features — notes, AI chat, review, analytics."""

from __future__ import annotations

import uuid as uuid_mod
from typing import Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.base import APIResponse
from app.services import roadmap_step_note_service, roadmap_review_service, roadmap_time_service
from app.services.claude_service import get_claude

router = APIRouter()


# ---------------------------------------------------------------------------
# Pydantic models
# ---------------------------------------------------------------------------

class NoteUpsertRequest(BaseModel):
    content: str
    code_snippet: Optional[str] = None
    language: Optional[str] = None


class AIChatMessage(BaseModel):
    role: str
    content: str


class AIChatRequest(BaseModel):
    messages: list[AIChatMessage]
    step_title: str = ""
    step_description: str = ""
    roadmap_title: str = ""


class ReviewRequest(BaseModel):
    quality: int = Field(ge=0, le=5)


class TimeLogRequest(BaseModel):
    duration_seconds: int = Field(gt=0)


# ---------------------------------------------------------------------------
# Notes
# ---------------------------------------------------------------------------

@router.get("/{roadmap_id}/steps/{step_id}/notes", response_model=APIResponse)
async def get_note(
    roadmap_id: str,
    step_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get user's note for a roadmap step."""
    note = await roadmap_step_note_service.get_note(db, current_user.id, step_id)
    data = None
    if note:
        data = {
            "id": str(note.id),
            "content": note.content,
            "code_snippet": note.code_snippet,
            "language": note.language,
            "updated_at": note.updated_at.isoformat() if note.updated_at else None,
        }
    return APIResponse(success=True, data=data, message="Note retrieved")


@router.put("/{roadmap_id}/steps/{step_id}/notes", response_model=APIResponse)
async def upsert_note(
    roadmap_id: str,
    step_id: str,
    body: NoteUpsertRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create or update a note for a roadmap step."""
    note = await roadmap_step_note_service.upsert_note(
        db,
        user_id=current_user.id,
        roadmap_id=uuid_mod.UUID(roadmap_id),
        step_id=uuid_mod.UUID(step_id),
        content=body.content,
        code_snippet=body.code_snippet,
        language=body.language,
    )
    data = {
        "id": str(note.id),
        "content": note.content,
        "code_snippet": note.code_snippet,
        "language": note.language,
        "updated_at": note.updated_at.isoformat() if note.updated_at else None,
    }
    return APIResponse(success=True, data=data, message="Note saved")


@router.delete("/{roadmap_id}/steps/{step_id}/notes", response_model=APIResponse)
async def delete_note(
    roadmap_id: str,
    step_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Delete a user's note for a roadmap step."""
    await roadmap_step_note_service.delete_note(db, current_user.id, step_id)
    return APIResponse(success=True, data=None, message="Note deleted")


# ---------------------------------------------------------------------------
# AI Chat
# ---------------------------------------------------------------------------

@router.post("/{roadmap_id}/steps/{step_id}/ai-chat", response_model=APIResponse)
async def step_ai_chat(
    roadmap_id: str,
    step_id: str,
    body: AIChatRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Chat with AI study buddy about a roadmap step."""
    claude = get_claude()
    messages = [{"role": m.role, "content": m.content} for m in body.messages]
    reply = await claude.roadmap_step_chat(
        messages=messages,
        step_title=body.step_title,
        step_description=body.step_description,
        roadmap_title=body.roadmap_title,
    )
    return APIResponse(success=True, data={"reply": reply}, message="AI response generated")


# ---------------------------------------------------------------------------
# Reviews (spaced repetition)
# ---------------------------------------------------------------------------

@router.get("/{roadmap_id}/reviews/due", response_model=APIResponse)
async def get_due_reviews(
    roadmap_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get all due reviews for a roadmap."""
    reviews = await roadmap_review_service.get_due_reviews(db, current_user.id, roadmap_id)
    data = [
        {
            "id": str(r.id),
            "step_id": str(r.step_id),
            "ease_factor": r.ease_factor,
            "interval_days": r.interval_days,
            "repetitions": r.repetitions,
            "next_review_date": r.next_review_date.isoformat(),
            "last_reviewed_at": r.last_reviewed_at.isoformat() if r.last_reviewed_at else None,
            "quality": r.quality,
        }
        for r in reviews
    ]
    return APIResponse(success=True, data=data, message="Due reviews retrieved")


@router.get("/{roadmap_id}/steps/{step_id}/review", response_model=APIResponse)
async def get_step_review(
    roadmap_id: str,
    step_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get review card for a specific step."""
    review = await roadmap_review_service.get_review_for_step(db, current_user.id, step_id)
    data = None
    if review:
        data = {
            "id": str(review.id),
            "step_id": str(review.step_id),
            "ease_factor": review.ease_factor,
            "interval_days": review.interval_days,
            "repetitions": review.repetitions,
            "next_review_date": review.next_review_date.isoformat(),
            "last_reviewed_at": review.last_reviewed_at.isoformat() if review.last_reviewed_at else None,
            "quality": review.quality,
        }
    return APIResponse(success=True, data=data, message="Review retrieved")


@router.post("/{roadmap_id}/steps/{step_id}/review", response_model=APIResponse)
async def review_step(
    roadmap_id: str,
    step_id: str,
    body: ReviewRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Submit a review quality rating for a step (SM-2)."""
    card = await roadmap_review_service.review_step(db, current_user.id, step_id, body.quality)
    data = {
        "id": str(card.id),
        "step_id": str(card.step_id),
        "ease_factor": card.ease_factor,
        "interval_days": card.interval_days,
        "repetitions": card.repetitions,
        "next_review_date": card.next_review_date.isoformat(),
        "last_reviewed_at": card.last_reviewed_at.isoformat() if card.last_reviewed_at else None,
        "quality": card.quality,
    }
    return APIResponse(success=True, data=data, message="Review recorded")


# ---------------------------------------------------------------------------
# Time logging + analytics
# ---------------------------------------------------------------------------

@router.post("/{roadmap_id}/steps/{step_id}/time-log", response_model=APIResponse)
async def log_time(
    roadmap_id: str,
    step_id: str,
    body: TimeLogRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Log study time for a roadmap step."""
    entry = await roadmap_time_service.log_time(
        db, current_user.id, roadmap_id, step_id, body.duration_seconds,
    )
    data = {
        "id": str(entry.id),
        "step_id": str(entry.step_id),
        "duration_seconds": entry.duration_seconds,
        "logged_at": entry.logged_at.isoformat() if entry.logged_at else None,
    }
    return APIResponse(success=True, data=data, message="Time logged")


@router.get("/{roadmap_id}/analytics", response_model=APIResponse)
async def get_analytics(
    roadmap_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get analytics for a roadmap."""
    data = await roadmap_time_service.get_step_analytics(db, current_user.id, roadmap_id)
    return APIResponse(success=True, data=data, message="Analytics retrieved")

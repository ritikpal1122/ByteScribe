from uuid import UUID

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.base import APIResponse
from app.schemas.interview import MockInterviewCreate, PeerRoomCreate
from app.services import interview_service

router = APIRouter()


class SendMessageBody(BaseModel):
    content: str = Field(..., min_length=1)


# ---- Mock Interviews ----


@router.post("/mock", response_model=APIResponse, status_code=201)
async def create_mock_interview(
    data: MockInterviewCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Start a new AI mock interview session."""
    result = await interview_service.create_mock_session(db, current_user.id, data.topic, data.difficulty)
    return APIResponse(success=True, data=result, message="Mock interview created")


@router.get("/mock", response_model=APIResponse)
async def list_mock_interviews(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List the authenticated user's mock interviews."""
    result = await interview_service.get_sessions(db, current_user.id)
    return APIResponse(success=True, data=result, message="Mock interviews retrieved")


@router.get("/mock/{id}", response_model=APIResponse)
async def get_mock_interview(
    id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get a mock interview session by ID."""
    # Reuse send_message logic to get session — or query directly
    from sqlalchemy import select
    from app.models.interview import MockInterviewSession
    result = await db.execute(select(MockInterviewSession).where(MockInterviewSession.id == id))
    session = result.scalar_one_or_none()
    if session is None:
        from app.exceptions import NotFoundException
        raise NotFoundException("Interview session not found")
    return APIResponse(success=True, data=session, message="Mock interview retrieved")


@router.post("/mock/{id}/messages", response_model=APIResponse)
async def send_mock_message(
    id: UUID,
    data: SendMessageBody,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Send a message in a mock interview and receive an AI response."""
    result = await interview_service.send_message(db, id, current_user.id, data.content)
    return APIResponse(success=True, data=result, message="Message sent")


# ---- Peer Interviews ----


@router.post("/peer", response_model=APIResponse, status_code=201)
async def create_peer_session(
    data: PeerRoomCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a peer interview room and receive a join code."""
    result = await interview_service.create_peer_room(db, current_user.id, topic=data.topic)
    return APIResponse(success=True, data=result, message="Peer session created")


@router.post("/peer/{code}/join", response_model=APIResponse)
async def join_peer_session(
    code: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Join a peer interview session using its invite code."""
    result = await interview_service.join_peer_room(db, code, current_user.id)
    return APIResponse(success=True, data=result, message="Joined peer session")

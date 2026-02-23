"""Interview service — mock AI interviews and peer interview rooms (stub)."""

from __future__ import annotations

import uuid
import secrets
from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.constants import InterviewStatus, PeerRoomStatus
from app.exceptions import BadRequestException, NotFoundException
from app.models.interview import MockInterviewSession, PeerInterviewRoom


# ---------------------------------------------------------------------------
# Mock interview (AI-driven)
# ---------------------------------------------------------------------------


async def create_mock_session(
    db: AsyncSession,
    user_id: uuid.UUID,
    topic: str,
    difficulty: str,
) -> MockInterviewSession:
    """Create a new AI mock-interview session."""

    session = MockInterviewSession(
        user_id=user_id,
        topic=topic,
        difficulty=difficulty,
        status=InterviewStatus.ACTIVE,
        messages=[],
    )
    db.add(session)
    await db.flush()
    return session


async def send_message(
    db: AsyncSession,
    session_id: uuid.UUID,
    user_id: uuid.UUID,
    message: str,
) -> MockInterviewSession:
    """Append a user message to the session.

    In the full implementation this would also call
    :func:`claude_service.mock_interview_message` to generate a reply.
    """

    result = await db.execute(
        select(MockInterviewSession).where(MockInterviewSession.id == session_id)
    )
    session = result.scalar_one_or_none()
    if session is None:
        raise NotFoundException("Interview session not found")

    if session.user_id != user_id:
        raise BadRequestException("Not your session")

    if session.status != InterviewStatus.ACTIVE:
        raise BadRequestException("Session is no longer active")

    # Append user message
    messages = list(session.messages or [])
    messages.append({"role": "user", "content": message})

    # Call Claude service to generate interviewer reply
    from app.services.claude_service import get_claude
    claude = get_claude()
    reply = await claude.mock_interview_message(messages, session.topic)
    messages.append({"role": "assistant", "content": reply})

    session.messages = messages
    await db.flush()
    return session


async def get_sessions(
    db: AsyncSession,
    user_id: uuid.UUID,
) -> list[MockInterviewSession]:
    """Return all mock-interview sessions for a user."""

    result = await db.execute(
        select(MockInterviewSession)
        .where(MockInterviewSession.user_id == user_id)
        .order_by(MockInterviewSession.created_at.desc())
    )
    return list(result.scalars().all())


# ---------------------------------------------------------------------------
# Peer interview rooms
# ---------------------------------------------------------------------------


async def create_peer_room(
    db: AsyncSession,
    host_id: uuid.UUID,
    *,
    topic: Optional[str] = None,
    problem_id: Optional[uuid.UUID] = None,
) -> PeerInterviewRoom:
    """Create a new peer-interview room with a unique room code."""

    room = PeerInterviewRoom(
        room_code=secrets.token_urlsafe(8),
        host_id=host_id,
        topic=topic,
        problem_id=problem_id,
        status=PeerRoomStatus.WAITING,
    )
    db.add(room)
    await db.flush()
    return room


async def join_peer_room(
    db: AsyncSession,
    room_code: str,
    guest_id: uuid.UUID,
) -> PeerInterviewRoom:
    """Join an existing peer-interview room as the guest."""

    result = await db.execute(
        select(PeerInterviewRoom).where(PeerInterviewRoom.room_code == room_code)
    )
    room = result.scalar_one_or_none()
    if room is None:
        raise NotFoundException("Room not found")

    if room.status != PeerRoomStatus.WAITING:
        raise BadRequestException("Room is no longer available")

    if room.host_id == guest_id:
        raise BadRequestException("Cannot join your own room")

    room.guest_id = guest_id
    room.status = PeerRoomStatus.MATCHED
    await db.flush()
    return room

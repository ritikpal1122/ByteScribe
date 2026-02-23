import uuid
from typing import Optional
from sqlalchemy import String, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin
from app.constants import InterviewStatus, PeerRoomStatus


class MockInterviewSession(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "mock_interview_sessions"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )
    topic: Mapped[str] = mapped_column(String(100))
    difficulty: Mapped[str] = mapped_column(String(10))
    status: Mapped[str] = mapped_column(String(20), default=InterviewStatus.ACTIVE)
    messages: Mapped[Optional[list]] = mapped_column(JSONB, default=[])
    feedback: Mapped[Optional[str]] = mapped_column(Text)
    score: Mapped[Optional[int]] = mapped_column()


class PeerInterviewRoom(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "peer_interview_rooms"

    room_code: Mapped[str] = mapped_column(String(20), unique=True, index=True)
    host_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )
    guest_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL")
    )
    topic: Mapped[Optional[str]] = mapped_column(String(100))
    problem_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("problems.id", ondelete="SET NULL")
    )
    status: Mapped[str] = mapped_column(String(20), default=PeerRoomStatus.WAITING)
    shared_code: Mapped[Optional[str]] = mapped_column(Text)
    notes: Mapped[Optional[str]] = mapped_column(Text)

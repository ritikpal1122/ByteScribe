import uuid
from datetime import datetime
from typing import Optional
from sqlalchemy import String, Integer, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin


class Contest(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "contests"
    title: Mapped[str] = mapped_column(String(300))
    slug: Mapped[str] = mapped_column(String(350), unique=True, index=True)
    description: Mapped[Optional[str]] = mapped_column(Text)
    start_time: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    end_time: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    duration_minutes: Mapped[int] = mapped_column(Integer, default=90)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    problem_ids: Mapped[Optional[list]] = mapped_column(JSONB, default=[])
    participant_count: Mapped[int] = mapped_column(Integer, default=0)


class ContestParticipant(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "contest_participants"
    contest_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("contests.id", ondelete="CASCADE"), index=True)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    score: Mapped[int] = mapped_column(Integer, default=0)
    problems_solved: Mapped[int] = mapped_column(Integer, default=0)
    finish_time: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    rank: Mapped[Optional[int]] = mapped_column(Integer)

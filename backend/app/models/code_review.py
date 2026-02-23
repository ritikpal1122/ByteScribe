import uuid
from typing import Optional
from sqlalchemy import String, Integer, Text, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin


class CodeReview(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "code_reviews"

    submission_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("submissions.id", ondelete="CASCADE"), unique=True, index=True
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )
    problem_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("problems.id", ondelete="CASCADE"), index=True
    )
    time_complexity: Mapped[str] = mapped_column(String(50))
    space_complexity: Mapped[str] = mapped_column(String(50))
    overall_rating: Mapped[int] = mapped_column(Integer)
    summary: Mapped[str] = mapped_column(Text)
    strengths: Mapped[list] = mapped_column(JSONB, default=list)
    improvements: Mapped[list] = mapped_column(JSONB, default=list)

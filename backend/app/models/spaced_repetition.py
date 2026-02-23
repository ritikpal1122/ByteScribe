import uuid
from datetime import date, datetime
from typing import Optional
from sqlalchemy import String, Integer, Float, Date, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin


class SpacedRepetitionCard(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "spaced_repetition_cards"
    __table_args__ = (
        UniqueConstraint("user_id", "problem_id", name="uq_sr_user_problem"),
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )
    problem_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("problems.id", ondelete="CASCADE"), index=True
    )
    ease_factor: Mapped[float] = mapped_column(Float, default=2.5)
    interval_days: Mapped[int] = mapped_column(Integer, default=1)
    repetitions: Mapped[int] = mapped_column(Integer, default=0)
    next_review_date: Mapped[date] = mapped_column(Date)
    last_reviewed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    quality: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)

    problem: Mapped["Problem"] = relationship(lazy="selectin")

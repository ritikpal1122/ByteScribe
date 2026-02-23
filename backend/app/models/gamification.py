import uuid
from datetime import date
from typing import Optional
from sqlalchemy import String, Integer, Text, Boolean, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin


class DailyActivity(Base, UUIDPrimaryKeyMixin):
    __tablename__ = "daily_activity"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )
    activity_date: Mapped[date] = mapped_column(Date, index=True)
    problems_solved: Mapped[int] = mapped_column(Integer, default=0)
    articles_read: Mapped[int] = mapped_column(Integer, default=0)
    articles_written: Mapped[int] = mapped_column(Integer, default=0)
    answers_given: Mapped[int] = mapped_column(Integer, default=0)
    xp_earned: Mapped[int] = mapped_column(Integer, default=0)


class Badge(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "badges"

    name: Mapped[str] = mapped_column(String(100), unique=True)
    slug: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    description: Mapped[str] = mapped_column(String(500))
    icon: Mapped[str] = mapped_column(String(50))
    criteria_type: Mapped[str] = mapped_column(String(50))  # problems_solved, streak_days, etc.
    criteria_value: Mapped[int] = mapped_column(Integer)
    xp_reward: Mapped[int] = mapped_column(Integer, default=0)
    tier: Mapped[str] = mapped_column(String(20), default="bronze")  # bronze, silver, gold, platinum


class UserBadge(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "user_badges"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )
    badge_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("badges.id", ondelete="CASCADE"), index=True
    )

    user: Mapped["User"] = relationship(back_populates="badges", lazy="selectin")


class UserStreak(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "user_streaks"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, index=True
    )
    current_streak: Mapped[int] = mapped_column(Integer, default=0)
    longest_streak: Mapped[int] = mapped_column(Integer, default=0)
    last_activity_date: Mapped[Optional[date]] = mapped_column(Date)

    user: Mapped["User"] = relationship(back_populates="streak", lazy="selectin")

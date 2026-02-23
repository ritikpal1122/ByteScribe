import uuid
from datetime import datetime
from typing import Optional, List
from sqlalchemy import String, Boolean, Integer, DateTime, func, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin
from app.constants import UserRole


class User(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    display_name: Mapped[str] = mapped_column(String(100))
    hashed_password: Mapped[Optional[str]] = mapped_column(String(255))
    avatar_url: Mapped[Optional[str]] = mapped_column(String(500))
    bio: Mapped[Optional[str]] = mapped_column(Text)
    role: Mapped[str] = mapped_column(String(20), default=UserRole.USER)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_email_verified: Mapped[bool] = mapped_column(Boolean, default=False)

    # GitHub OAuth
    github_id: Mapped[Optional[str]] = mapped_column(String(50), unique=True)
    github_username: Mapped[Optional[str]] = mapped_column(String(100))

    # Gamification
    xp: Mapped[int] = mapped_column(Integer, default=0)
    reputation: Mapped[int] = mapped_column(Integer, default=0)
    problems_solved: Mapped[int] = mapped_column(Integer, default=0)
    articles_written: Mapped[int] = mapped_column(Integer, default=0)
    answers_given: Mapped[int] = mapped_column(Integer, default=0)

    last_seen: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))

    # Relationships
    articles: Mapped[List["Article"]] = relationship(back_populates="author", lazy="selectin")
    questions: Mapped[List["Question"]] = relationship(back_populates="author", lazy="selectin")
    answers: Mapped[List["Answer"]] = relationship(back_populates="author", lazy="selectin")
    submissions: Mapped[List["Submission"]] = relationship(back_populates="user", lazy="selectin")
    badges: Mapped[List["UserBadge"]] = relationship(back_populates="user", lazy="selectin")
    streak: Mapped[Optional["UserStreak"]] = relationship(back_populates="user", lazy="selectin", uselist=False)

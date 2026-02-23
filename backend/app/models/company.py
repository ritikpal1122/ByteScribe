import uuid
from typing import Optional
from sqlalchemy import String, Integer, Text, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin


class Company(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "companies"

    name: Mapped[str] = mapped_column(String(200))
    slug: Mapped[str] = mapped_column(String(250), unique=True, index=True)
    logo_url: Mapped[Optional[str]] = mapped_column(String(500))
    website: Mapped[Optional[str]] = mapped_column(String(500))
    description: Mapped[Optional[str]] = mapped_column(Text)
    experience_count: Mapped[int] = mapped_column(Integer, default=0)
    problem_count: Mapped[int] = mapped_column(Integer, default=0)


class InterviewExperience(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "interview_experiences"

    company_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("companies.id", ondelete="CASCADE"), index=True
    )
    author_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )
    title: Mapped[str] = mapped_column(String(300))
    role: Mapped[str] = mapped_column(String(200))
    experience_type: Mapped[str] = mapped_column(String(50))  # onsite, phone, online
    difficulty: Mapped[str] = mapped_column(String(10))  # easy, medium, hard
    result: Mapped[str] = mapped_column(String(20))  # offered, rejected, pending
    body: Mapped[str] = mapped_column(Text)
    upvote_count: Mapped[int] = mapped_column(Integer, default=0)
    year: Mapped[Optional[int]] = mapped_column(Integer)


class CompanyProblem(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "company_problems"

    company_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("companies.id", ondelete="CASCADE"), index=True
    )
    problem_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("problems.id", ondelete="CASCADE"), index=True
    )
    frequency: Mapped[int] = mapped_column(Integer, default=1)
    last_reported_year: Mapped[Optional[int]] = mapped_column(Integer)

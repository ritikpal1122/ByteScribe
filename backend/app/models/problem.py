import uuid
from typing import Optional
from sqlalchemy import String, Integer, Text, Boolean, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin


class Problem(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "problems"

    title: Mapped[str] = mapped_column(String(300))
    slug: Mapped[str] = mapped_column(String(350), unique=True, index=True)
    description: Mapped[str] = mapped_column(Text)
    difficulty: Mapped[str] = mapped_column(String(10), index=True)  # easy, medium, hard
    constraints: Mapped[Optional[str]] = mapped_column(Text)
    input_format: Mapped[Optional[str]] = mapped_column(Text)
    output_format: Mapped[Optional[str]] = mapped_column(Text)
    sample_input: Mapped[Optional[str]] = mapped_column(Text)
    sample_output: Mapped[Optional[str]] = mapped_column(Text)
    hints: Mapped[Optional[str]] = mapped_column(Text)
    editorial: Mapped[Optional[str]] = mapped_column(Text)
    starter_code: Mapped[Optional[dict]] = mapped_column(JSONB)  # {python: "...", cpp: "...", ...}

    is_published: Mapped[bool] = mapped_column(Boolean, default=True)
    submission_count: Mapped[int] = mapped_column(Integer, default=0)
    accepted_count: Mapped[int] = mapped_column(Integer, default=0)
    time_limit_ms: Mapped[int] = mapped_column(Integer, default=2000)
    memory_limit_mb: Mapped[int] = mapped_column(Integer, default=256)

    author_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True
    )

    test_cases: Mapped[list["TestCase"]] = relationship(back_populates="problem", lazy="selectin")


class TestCase(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "test_cases"

    problem_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("problems.id", ondelete="CASCADE"), index=True
    )
    input: Mapped[str] = mapped_column(Text)
    expected_output: Mapped[str] = mapped_column(Text)
    is_sample: Mapped[bool] = mapped_column(Boolean, default=False)
    order: Mapped[int] = mapped_column(Integer, default=0)

    problem: Mapped["Problem"] = relationship(back_populates="test_cases", lazy="selectin")


class Submission(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "submissions"

    problem_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("problems.id", ondelete="CASCADE"), index=True
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )
    language: Mapped[str] = mapped_column(String(20))
    code: Mapped[str] = mapped_column(Text)
    verdict: Mapped[str] = mapped_column(String(30))
    runtime_ms: Mapped[Optional[int]] = mapped_column(Integer)
    memory_kb: Mapped[Optional[int]] = mapped_column(Integer)
    test_cases_passed: Mapped[int] = mapped_column(Integer, default=0)
    total_test_cases: Mapped[int] = mapped_column(Integer, default=0)
    error_output: Mapped[Optional[str]] = mapped_column(Text)

    user: Mapped["User"] = relationship(back_populates="submissions", lazy="selectin")

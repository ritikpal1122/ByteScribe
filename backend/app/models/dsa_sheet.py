import uuid
from typing import Optional
from sqlalchemy import String, Integer, Text, Boolean, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin


class DSASheet(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "dsa_sheets"

    name: Mapped[str] = mapped_column(String(200), unique=True)
    slug: Mapped[str] = mapped_column(String(220), unique=True, index=True)
    description: Mapped[Optional[str]] = mapped_column(Text)
    icon: Mapped[str] = mapped_column(String(50), default="📋")
    problem_count: Mapped[int] = mapped_column(Integer, default=0)

    problems: Mapped[list["DSASheetProblem"]] = relationship(
        back_populates="sheet", lazy="selectin", order_by="DSASheetProblem.order"
    )


class DSASheetProblem(Base, UUIDPrimaryKeyMixin):
    __tablename__ = "dsa_sheet_problems"
    __table_args__ = (
        UniqueConstraint("sheet_id", "problem_id", name="uq_sheet_problem"),
    )

    sheet_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("dsa_sheets.id", ondelete="CASCADE"), index=True
    )
    problem_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("problems.id", ondelete="CASCADE"), index=True
    )
    section: Mapped[str] = mapped_column(String(100), default="General")
    order: Mapped[int] = mapped_column(Integer, default=0)

    sheet: Mapped["DSASheet"] = relationship(back_populates="problems", lazy="selectin")
    problem: Mapped["Problem"] = relationship(lazy="selectin")


class DSASheetProgress(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "dsa_sheet_progress"
    __table_args__ = (
        UniqueConstraint("user_id", "sheet_id", "problem_id", name="uq_user_sheet_problem"),
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )
    sheet_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("dsa_sheets.id", ondelete="CASCADE"), index=True
    )
    problem_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("problems.id", ondelete="CASCADE"), index=True
    )
    is_completed: Mapped[bool] = mapped_column(Boolean, default=False)

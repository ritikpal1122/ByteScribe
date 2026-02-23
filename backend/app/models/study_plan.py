import uuid
from typing import Optional
from sqlalchemy import String, Integer, Text, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin


class StudyPlan(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "study_plans"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )
    title: Mapped[str] = mapped_column(String(300))
    description: Mapped[Optional[str]] = mapped_column(Text)
    target_role: Mapped[Optional[str]] = mapped_column(String(200))
    target_company: Mapped[Optional[str]] = mapped_column(String(200))
    duration_weeks: Mapped[int] = mapped_column(Integer, default=4)
    is_ai_generated: Mapped[bool] = mapped_column(Boolean, default=False)
    is_public: Mapped[bool] = mapped_column(Boolean, default=False)
    item_count: Mapped[int] = mapped_column(Integer, default=0)
    completed_count: Mapped[int] = mapped_column(Integer, default=0)

    items: Mapped[list["StudyPlanItem"]] = relationship(
        back_populates="plan", lazy="selectin", order_by="StudyPlanItem.order",
        cascade="all, delete-orphan",
    )


class StudyPlanItem(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "study_plan_items"

    plan_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("study_plans.id", ondelete="CASCADE"), index=True
    )
    title: Mapped[str] = mapped_column(String(300))
    description: Mapped[Optional[str]] = mapped_column(Text)
    section: Mapped[str] = mapped_column(String(100), default="General")
    content_type: Mapped[Optional[str]] = mapped_column(String(50))
    content_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True))
    problem_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("problems.id", ondelete="SET NULL"), nullable=True
    )
    difficulty: Mapped[Optional[str]] = mapped_column(String(10))
    estimated_minutes: Mapped[Optional[int]] = mapped_column(Integer)
    resource_url: Mapped[Optional[str]] = mapped_column(String(500))
    day_number: Mapped[int] = mapped_column(Integer)
    order: Mapped[int] = mapped_column(Integer, default=0)
    is_completed: Mapped[bool] = mapped_column(Boolean, default=False)

    plan: Mapped["StudyPlan"] = relationship(back_populates="items", lazy="selectin")
    problem: Mapped[Optional["Problem"]] = relationship(lazy="selectin")

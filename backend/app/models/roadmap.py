import uuid
from typing import Optional
from sqlalchemy import String, Integer, Text, Boolean, ForeignKey, Float
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin


class Roadmap(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "roadmaps"

    title: Mapped[str] = mapped_column(String(300))
    slug: Mapped[str] = mapped_column(String(350), unique=True, index=True)
    description: Mapped[str] = mapped_column(Text, default="")
    difficulty: Mapped[str] = mapped_column(String(20), default="beginner")
    estimated_hours: Mapped[int] = mapped_column(Integer, default=0)
    is_published: Mapped[bool] = mapped_column(Boolean, default=True)
    step_count: Mapped[int] = mapped_column(Integer, default=0)
    follower_count: Mapped[int] = mapped_column(Integer, default=0)

    author_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), index=True, nullable=True
    )


class RoadmapStep(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "roadmap_steps"

    roadmap_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("roadmaps.id", ondelete="CASCADE"), index=True
    )
    title: Mapped[str] = mapped_column(String(300))
    description: Mapped[str] = mapped_column(Text, default="")
    order: Mapped[int] = mapped_column(Integer)
    resource_url: Mapped[Optional[str]] = mapped_column(String(500))
    resource_type: Mapped[Optional[str]] = mapped_column(String(50))  # article, problem, video, etc.
    content_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True))  # link to internal content


class RoadmapProgress(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "roadmap_progress"

    roadmap_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("roadmaps.id", ondelete="CASCADE"), index=True
    )
    step_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("roadmap_steps.id", ondelete="CASCADE"), index=True
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )
    is_completed: Mapped[bool] = mapped_column(Boolean, default=False)

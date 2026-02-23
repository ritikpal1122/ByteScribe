import uuid
from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin


class Tag(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "tags"

    name: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    slug: Mapped[str] = mapped_column(String(60), unique=True, index=True)
    description: Mapped[str] = mapped_column(String(500), default="")
    color: Mapped[str] = mapped_column(String(7), default="#6366f1")
    usage_count: Mapped[int] = mapped_column(Integer, default=0)


class ContentTag(Base, UUIDPrimaryKeyMixin):
    __tablename__ = "content_tags"

    tag_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("tags.id", ondelete="CASCADE"), index=True
    )
    content_type: Mapped[str] = mapped_column(String(50), index=True)
    content_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), index=True)

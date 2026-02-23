from sqlalchemy import String, Text, Integer, Index
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin


class LanguageDoc(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    """Quick-reference documentation entries for programming languages."""

    __tablename__ = "language_docs"

    language: Mapped[str] = mapped_column(String(30), nullable=False, index=True)
    category: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    code_example: Mapped[str | None] = mapped_column(Text, nullable=True)
    order: Mapped[int] = mapped_column(Integer, default=0)

    __table_args__ = (
        Index("ix_language_docs_lang_cat", "language", "category"),
    )

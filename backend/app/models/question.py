import uuid
from typing import Optional, List
from sqlalchemy import String, Integer, Text, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base, UUIDPrimaryKeyMixin, TimestampMixin


class Question(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "questions"

    title: Mapped[str] = mapped_column(String(300))
    slug: Mapped[str] = mapped_column(String(350), unique=True, index=True)
    body: Mapped[str] = mapped_column(Text)
    is_closed: Mapped[bool] = mapped_column(Boolean, default=False)
    view_count: Mapped[int] = mapped_column(Integer, default=0)
    upvote_count: Mapped[int] = mapped_column(Integer, default=0)
    downvote_count: Mapped[int] = mapped_column(Integer, default=0)
    answer_count: Mapped[int] = mapped_column(Integer, default=0)
    comment_count: Mapped[int] = mapped_column(Integer, default=0)
    accepted_answer_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True))

    author_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )

    author: Mapped["User"] = relationship(back_populates="questions", lazy="selectin")
    answers: Mapped[List["Answer"]] = relationship(back_populates="question", lazy="selectin")


class Answer(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "answers"

    body: Mapped[str] = mapped_column(Text)
    is_accepted: Mapped[bool] = mapped_column(Boolean, default=False)
    upvote_count: Mapped[int] = mapped_column(Integer, default=0)
    downvote_count: Mapped[int] = mapped_column(Integer, default=0)
    comment_count: Mapped[int] = mapped_column(Integer, default=0)

    question_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("questions.id", ondelete="CASCADE"), index=True
    )
    author_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )

    question: Mapped["Question"] = relationship(back_populates="answers", lazy="selectin")
    author: Mapped["User"] = relationship(back_populates="answers", lazy="selectin")


class QAVote(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "qa_votes"

    content_type: Mapped[str] = mapped_column(String(20))  # "question" or "answer"
    content_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), index=True)
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True
    )
    vote_type: Mapped[str] = mapped_column(String(10))

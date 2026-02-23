"""Question & Answer service — CRUD, voting, answer acceptance."""

from __future__ import annotations

import uuid
from typing import Optional

from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.constants import VoteType
from app.exceptions import (
    BadRequestException,
    ForbiddenException,
    NotFoundException,
)
from app.models.question import Answer, QAVote, Question
from app.models.user import User
from app.schemas.question import AnswerCreate, QuestionCreate
from app.utils.pagination import PaginatedResult, PaginationParams, paginate
from app.utils.slugify import generate_slug


# ---------------------------------------------------------------------------
# Questions
# ---------------------------------------------------------------------------


async def create_question(
    db: AsyncSession,
    schema: QuestionCreate,
    author_id: uuid.UUID,
) -> Question:
    """Create a new question."""

    question = Question(
        title=schema.title,
        slug=generate_slug(schema.title),
        body=schema.body,
        author_id=author_id,
    )
    db.add(question)
    await db.flush()
    return question


async def get_questions(
    db: AsyncSession,
    *,
    page: int = 1,
    per_page: int = 20,
    author_id: Optional[uuid.UUID] = None,
) -> PaginatedResult:
    """Return a paginated list of questions, newest first."""

    stmt = select(Question).order_by(Question.created_at.desc())

    if author_id is not None:
        stmt = stmt.where(Question.author_id == author_id)

    return await paginate(stmt, db, PaginationParams(page=page, per_page=per_page))


async def get_question_by_slug(db: AsyncSession, slug: str) -> Question:
    """Return a question by its slug or raise 404."""

    result = await db.execute(select(Question).where(Question.slug == slug))
    question = result.scalar_one_or_none()
    if question is None:
        raise NotFoundException("Question not found")
    return question


async def update_question(
    db: AsyncSession,
    slug: str,
    title: Optional[str] = None,
    body: Optional[str] = None,
    *,
    user_id: uuid.UUID,
) -> Question:
    """Update a question.  Only the author may update."""

    question = await get_question_by_slug(db, slug)

    if question.author_id != user_id:
        raise ForbiddenException("You can only edit your own questions")

    if title is not None:
        question.title = title
    if body is not None:
        question.body = body

    await db.flush()
    await db.refresh(question)
    return question


# ---------------------------------------------------------------------------
# Answers
# ---------------------------------------------------------------------------


async def create_answer(
    db: AsyncSession,
    question_id: uuid.UUID,
    schema: AnswerCreate,
    author_id: uuid.UUID,
) -> Answer:
    """Post an answer to a question."""

    # Verify the question exists
    result = await db.execute(select(Question).where(Question.id == question_id))
    question = result.scalar_one_or_none()
    if question is None:
        raise NotFoundException("Question not found")

    answer = Answer(
        body=schema.body,
        question_id=question_id,
        author_id=author_id,
    )
    db.add(answer)

    # Update denormalized count
    question.answer_count += 1

    # Update author stats
    result = await db.execute(select(User).where(User.id == author_id))
    user = result.scalar_one_or_none()
    if user:
        user.answers_given += 1

    await db.flush()
    return answer


async def get_answers(
    db: AsyncSession,
    question_id: uuid.UUID,
    *,
    page: int = 1,
    per_page: int = 50,
) -> PaginatedResult:
    """Return paginated answers for a question, highest-voted first."""

    stmt = (
        select(Answer)
        .where(Answer.question_id == question_id)
        .order_by(Answer.is_accepted.desc(), Answer.upvote_count.desc())
    )

    return await paginate(stmt, db, PaginationParams(page=page, per_page=per_page))


async def accept_answer(
    db: AsyncSession,
    question_slug: str,
    answer_id: uuid.UUID,
    user_id: uuid.UUID,
) -> Answer:
    """Mark an answer as accepted.  Only the question author may accept."""

    question = await get_question_by_slug(db, question_slug)

    if question.author_id != user_id:
        raise ForbiddenException("Only the question author can accept an answer")

    result = await db.execute(select(Answer).where(Answer.id == answer_id))
    answer = result.scalar_one_or_none()
    if answer is None:
        raise NotFoundException("Answer not found")

    if answer.question_id != question.id:
        raise BadRequestException("Answer does not belong to this question")

    # Un-accept previously accepted answer (if any)
    if question.accepted_answer_id is not None:
        prev = await db.execute(
            select(Answer).where(Answer.id == question.accepted_answer_id)
        )
        prev_answer = prev.scalar_one_or_none()
        if prev_answer:
            prev_answer.is_accepted = False

    answer.is_accepted = True
    question.accepted_answer_id = answer.id

    await db.flush()
    return answer


# ---------------------------------------------------------------------------
# Polymorphic voting (questions and answers)
# ---------------------------------------------------------------------------


async def vote(
    db: AsyncSession,
    content_type: str,
    content_id: uuid.UUID,
    user_id: uuid.UUID,
    vote_type: str,
) -> dict:
    """Vote on a question or answer with toggle / switch behaviour.

    Parameters
    ----------
    content_type : str
        ``"question"`` or ``"answer"``.
    """

    # Load the target entity
    if content_type == "question":
        result = await db.execute(select(Question).where(Question.id == content_id))
    elif content_type == "answer":
        result = await db.execute(select(Answer).where(Answer.id == content_id))
    else:
        raise BadRequestException("content_type must be 'question' or 'answer'")

    entity = result.scalar_one_or_none()
    if entity is None:
        raise NotFoundException(f"{content_type.title()} not found")

    # Check for existing vote
    result = await db.execute(
        select(QAVote).where(
            and_(
                QAVote.content_type == content_type,
                QAVote.content_id == content_id,
                QAVote.user_id == user_id,
            )
        )
    )
    existing = result.scalar_one_or_none()

    if existing is None:
        # New vote
        db.add(
            QAVote(
                content_type=content_type,
                content_id=content_id,
                user_id=user_id,
                vote_type=vote_type,
            )
        )
        if vote_type == VoteType.UPVOTE:
            entity.upvote_count += 1
        else:
            entity.downvote_count += 1

    elif existing.vote_type == vote_type:
        # Toggle off
        if vote_type == VoteType.UPVOTE:
            entity.upvote_count = max(0, entity.upvote_count - 1)
        else:
            entity.downvote_count = max(0, entity.downvote_count - 1)
        await db.delete(existing)

    else:
        # Switch direction
        if vote_type == VoteType.UPVOTE:
            entity.upvote_count += 1
            entity.downvote_count = max(0, entity.downvote_count - 1)
        else:
            entity.downvote_count += 1
            entity.upvote_count = max(0, entity.upvote_count - 1)
        existing.vote_type = vote_type

    await db.flush()

    return {
        "upvote_count": entity.upvote_count,
        "downvote_count": entity.downvote_count,
    }

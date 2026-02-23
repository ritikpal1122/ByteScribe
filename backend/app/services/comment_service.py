"""Comment service — comment CRUD, voting, enriched queries."""

from __future__ import annotations

import uuid
from typing import Optional

from sqlalchemy import select, and_, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from app.constants import VoteType
from app.exceptions import ForbiddenException, NotFoundException
from app.models.comment import Comment, CommentVote
from app.schemas.comment import CommentCreate, CommentResponse
from app.schemas.user import PublicUserResponse
from app.utils.pagination import PaginatedResult, PaginationParams, paginate


async def create_comment(
    db: AsyncSession,
    content_type: str,
    content_id: uuid.UUID,
    schema: CommentCreate,
    author_id: uuid.UUID,
) -> Comment:
    """Create a comment on a piece of content."""

    comment = Comment(
        body=schema.body,
        content_type=content_type,
        content_id=content_id,
        author_id=author_id,
        parent_id=schema.parent_id,
    )
    db.add(comment)
    await db.flush()
    # Eagerly load author for the response
    await db.refresh(comment, attribute_names=["author"])
    return comment


def _serialize_comment(
    comment: Comment,
    replies_count: int = 0,
    user_vote: Optional[str] = None,
) -> dict:
    """Convert a Comment ORM object to a dict matching CommentResponse."""
    author = comment.author
    return CommentResponse(
        id=comment.id,
        body=comment.body,
        content_type=comment.content_type,
        content_id=comment.content_id,
        author_id=comment.author_id,
        author=PublicUserResponse.model_validate(author),
        parent_id=comment.parent_id,
        upvotes=comment.upvote_count,
        downvotes=comment.downvote_count,
        user_vote=user_vote,
        replies_count=replies_count,
        created_at=comment.created_at,
        updated_at=comment.updated_at,
    ).model_dump(mode="json")


async def get_comments(
    db: AsyncSession,
    content_type: str,
    content_id: uuid.UUID,
    *,
    page: int = 1,
    per_page: int = 20,
    sort_by: str = "newest",
    user_id: Optional[uuid.UUID] = None,
) -> PaginatedResult:
    """Return paginated comments for a piece of content with enriched data."""

    # Base query — only top-level comments (parent_id IS NULL)
    stmt = (
        select(Comment)
        .options(joinedload(Comment.author))
        .where(
            and_(
                Comment.content_type == content_type,
                Comment.content_id == content_id,
                Comment.parent_id.is_(None),
            )
        )
    )

    # Sorting
    if sort_by == "oldest":
        stmt = stmt.order_by(Comment.created_at.asc())
    elif sort_by == "votes":
        stmt = stmt.order_by(
            (Comment.upvote_count - Comment.downvote_count).desc(),
            Comment.created_at.desc(),
        )
    else:  # newest (default)
        stmt = stmt.order_by(Comment.created_at.desc())

    result = await paginate(stmt, db, PaginationParams(page=page, per_page=per_page))

    # Build replies count map for top-level comments
    comment_ids = [c.id for c in result.items]
    replies_map: dict[uuid.UUID, int] = {}
    if comment_ids:
        replies_stmt = (
            select(Comment.parent_id, func.count(Comment.id))
            .where(Comment.parent_id.in_(comment_ids))
            .group_by(Comment.parent_id)
        )
        rows = (await db.execute(replies_stmt)).all()
        replies_map = {row[0]: row[1] for row in rows}

    # Build user_vote map
    votes_map: dict[uuid.UUID, str] = {}
    if user_id and comment_ids:
        votes_stmt = (
            select(CommentVote.comment_id, CommentVote.vote_type)
            .where(
                and_(
                    CommentVote.comment_id.in_(comment_ids),
                    CommentVote.user_id == user_id,
                )
            )
        )
        rows = (await db.execute(votes_stmt)).all()
        votes_map = {row[0]: row[1] for row in rows}

    # Serialize
    enriched = [
        _serialize_comment(
            c,
            replies_count=replies_map.get(c.id, 0),
            user_vote=votes_map.get(c.id),
        )
        for c in result.items
    ]

    return PaginatedResult(
        items=enriched,
        total=result.total,
        page=result.page,
        per_page=result.per_page,
    )


async def get_replies(
    db: AsyncSession,
    parent_id: uuid.UUID,
    *,
    user_id: Optional[uuid.UUID] = None,
) -> list[dict]:
    """Return all replies to a given comment."""

    stmt = (
        select(Comment)
        .options(joinedload(Comment.author))
        .where(Comment.parent_id == parent_id)
        .order_by(Comment.created_at.asc())
    )
    result = await db.execute(stmt)
    comments = result.scalars().unique().all()

    comment_ids = [c.id for c in comments]
    votes_map: dict[uuid.UUID, str] = {}
    if user_id and comment_ids:
        votes_stmt = (
            select(CommentVote.comment_id, CommentVote.vote_type)
            .where(
                and_(
                    CommentVote.comment_id.in_(comment_ids),
                    CommentVote.user_id == user_id,
                )
            )
        )
        rows = (await db.execute(votes_stmt)).all()
        votes_map = {row[0]: row[1] for row in rows}

    return [
        _serialize_comment(c, replies_count=0, user_vote=votes_map.get(c.id))
        for c in comments
    ]


async def delete_comment(
    db: AsyncSession,
    comment_id: uuid.UUID,
    user_id: uuid.UUID,
) -> None:
    """Delete a comment.  Only the author may delete."""

    result = await db.execute(select(Comment).where(Comment.id == comment_id))
    comment = result.scalar_one_or_none()
    if comment is None:
        raise NotFoundException("Comment not found")

    if comment.author_id != user_id:
        raise ForbiddenException("You can only delete your own comments")

    await db.delete(comment)
    await db.flush()


async def vote_comment(
    db: AsyncSession,
    comment_id: uuid.UUID,
    user_id: uuid.UUID,
    vote_type: str,
) -> dict:
    """Handle upvote / downvote toggle on a comment.

    * First vote  -> create, increment counter.
    * Same vote   -> remove (un-vote), decrement counter.
    * Opposite    -> switch vote, adjust both counters.
    """

    from app.models.user import User
    from sqlalchemy.orm import noload
    from sqlalchemy import text

    # Load comment without triggering any relationship loading
    result = await db.execute(
        select(Comment).options(noload("*")).where(Comment.id == comment_id)
    )
    comment = result.scalar_one_or_none()
    if comment is None:
        raise NotFoundException("Comment not found")

    # Load author as raw row to completely avoid ORM relationship issues
    author_row = (await db.execute(
        text("""
            SELECT id, username, display_name, avatar_url, bio, role,
                   xp, reputation, problems_solved, articles_written,
                   answers_given, created_at
            FROM users WHERE id = :uid
        """),
        {"uid": comment.author_id},
    )).mappings().one()
    author_data = PublicUserResponse(**author_row)

    result = await db.execute(
        select(CommentVote).where(
            and_(
                CommentVote.comment_id == comment_id,
                CommentVote.user_id == user_id,
            )
        )
    )
    existing = result.scalar_one_or_none()

    current_user_vote: Optional[str] = None

    if existing is None:
        # First vote
        vote = CommentVote(
            comment_id=comment_id,
            user_id=user_id,
            vote_type=vote_type,
        )
        db.add(vote)
        if vote_type == VoteType.UPVOTE:
            comment.upvote_count += 1
        else:
            comment.downvote_count += 1
        current_user_vote = vote_type

    elif existing.vote_type == vote_type:
        # Toggle off (un-vote)
        if vote_type == VoteType.UPVOTE:
            comment.upvote_count = max(0, comment.upvote_count - 1)
        else:
            comment.downvote_count = max(0, comment.downvote_count - 1)
        await db.delete(existing)
        current_user_vote = None

    else:
        # Switch vote direction
        if vote_type == VoteType.UPVOTE:
            comment.upvote_count += 1
            comment.downvote_count = max(0, comment.downvote_count - 1)
        else:
            comment.downvote_count += 1
            comment.upvote_count = max(0, comment.upvote_count - 1)
        existing.vote_type = vote_type
        current_user_vote = vote_type

    await db.flush()
    # Refresh scalar fields that may have been expired by the flush (e.g. updated_at)
    await db.refresh(comment)

    # Build response directly using pre-captured author data
    return CommentResponse(
        id=comment.id,
        body=comment.body,
        content_type=comment.content_type,
        content_id=comment.content_id,
        author_id=comment.author_id,
        author=author_data,
        parent_id=comment.parent_id,
        upvotes=comment.upvote_count,
        downvotes=comment.downvote_count,
        user_vote=current_user_vote,
        replies_count=0,
        created_at=comment.created_at,
        updated_at=comment.updated_at,
    ).model_dump(mode="json")

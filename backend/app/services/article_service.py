"""Article service — CRUD, voting, view-count buffering via Redis."""

from __future__ import annotations

import uuid
from typing import Optional

from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import get_settings
from app.constants import VoteType
from app.exceptions import (
    BadRequestException,
    ForbiddenException,
    NotFoundException,
)
from app.models.article import Article, ArticleVote
from app.models.user import User
from app.schemas.article import ArticleCreate, ArticleUpdate
from app.services.redis_service import get_redis
from app.utils.pagination import PaginatedResult, PaginationParams, paginate
from app.utils.slugify import generate_slug

settings = get_settings()

# Redis key for buffered view counts
_VIEW_KEY = "article:views:{article_id}"


# ---------------------------------------------------------------------------
# CRUD
# ---------------------------------------------------------------------------


async def create_article(
    db: AsyncSession,
    schema: ArticleCreate,
    author_id: uuid.UUID,
) -> Article:
    """Create a new article."""

    article = Article(
        title=schema.title,
        slug=generate_slug(schema.title),
        content=schema.content,
        summary=schema.summary,
        cover_image_url=schema.cover_image_url,
        author_id=author_id,
    )
    db.add(article)
    await db.flush()

    # Update author stats
    result = await db.execute(select(User).where(User.id == author_id))
    user = result.scalar_one_or_none()
    if user:
        user.articles_written += 1

    return article


async def get_articles(
    db: AsyncSession,
    *,
    page: int = 1,
    per_page: int = 20,
    author_id: Optional[uuid.UUID] = None,
) -> PaginatedResult:
    """Return a paginated list of published articles."""

    stmt = (
        select(Article)
        .where(Article.is_published.is_(True))
        .order_by(Article.created_at.desc())
    )
    if author_id is not None:
        stmt = stmt.where(Article.author_id == author_id)

    return await paginate(stmt, db, PaginationParams(page=page, per_page=per_page))


async def get_article_by_slug(db: AsyncSession, slug: str) -> Article:
    """Return a single article by slug or raise 404."""

    result = await db.execute(select(Article).where(Article.slug == slug))
    article = result.scalar_one_or_none()
    if article is None:
        raise NotFoundException("Article not found")
    return article


async def update_article(
    db: AsyncSession,
    slug: str,
    schema: ArticleUpdate,
    user_id: uuid.UUID,
) -> Article:
    """Update an existing article.  Only the author may update."""

    article = await get_article_by_slug(db, slug)

    if article.author_id != user_id:
        raise ForbiddenException("You can only edit your own articles")

    update_data = schema.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(article, field, value)

    await db.flush()
    await db.refresh(article)
    return article


async def delete_article(
    db: AsyncSession,
    slug: str,
    user_id: uuid.UUID,
) -> None:
    """Soft-delete (unpublish) an article.  Only the author may delete."""

    article = await get_article_by_slug(db, slug)

    if article.author_id != user_id:
        raise ForbiddenException("You can only delete your own articles")

    await db.delete(article)
    await db.flush()


# ---------------------------------------------------------------------------
# Voting
# ---------------------------------------------------------------------------


async def vote_article(
    db: AsyncSession,
    article_id: uuid.UUID,
    user_id: uuid.UUID,
    vote_type: str,
) -> Article:
    """Handle upvote / downvote toggle on an article.

    * First vote  -> create, increment counter.
    * Same vote   -> remove (un-vote), decrement counter.
    * Opposite    -> switch vote, adjust both counters.
    """

    result = await db.execute(select(Article).where(Article.id == article_id))
    article = result.scalar_one_or_none()
    if article is None:
        raise NotFoundException("Article not found")

    result = await db.execute(
        select(ArticleVote).where(
            and_(
                ArticleVote.article_id == article_id,
                ArticleVote.user_id == user_id,
            )
        )
    )
    existing = result.scalar_one_or_none()

    if existing is None:
        # First vote
        vote = ArticleVote(
            article_id=article_id,
            user_id=user_id,
            vote_type=vote_type,
        )
        db.add(vote)
        if vote_type == VoteType.UPVOTE:
            article.upvote_count += 1
        else:
            article.downvote_count += 1

    elif existing.vote_type == vote_type:
        # Toggle off (un-vote)
        if vote_type == VoteType.UPVOTE:
            article.upvote_count = max(0, article.upvote_count - 1)
        else:
            article.downvote_count = max(0, article.downvote_count - 1)
        await db.delete(existing)

    else:
        # Switch vote direction
        if vote_type == VoteType.UPVOTE:
            article.upvote_count += 1
            article.downvote_count = max(0, article.downvote_count - 1)
        else:
            article.downvote_count += 1
            article.upvote_count = max(0, article.upvote_count - 1)
        existing.vote_type = vote_type

    await db.flush()
    return article


# ---------------------------------------------------------------------------
# View-count buffering
# ---------------------------------------------------------------------------


async def increment_view_count(
    db: AsyncSession,
    article_id: uuid.UUID,
) -> None:
    """Buffer a view in Redis; flush to the database when the buffer is large enough.

    Each view increments a Redis counter.  Every 10 views the accumulated
    count is written back to the ``Article.view_count`` column and the
    Redis key is reset.
    """

    redis = get_redis()
    key = _VIEW_KEY.format(article_id=str(article_id))

    count = await redis.incr(key)
    # Set a TTL on first increment so stale keys don't linger forever
    if count == 1:
        await redis.expire(key, 3600)

    # Flush to DB every 10 views
    if count >= 10:
        result = await db.execute(select(Article).where(Article.id == article_id))
        article = result.scalar_one_or_none()
        if article:
            article.view_count += count
            await db.flush()
        await redis.delete(key)

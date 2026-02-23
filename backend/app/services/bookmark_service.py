"""Bookmark service — bookmark CRUD."""

from __future__ import annotations

import uuid
from typing import Optional

from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.exceptions import ConflictException, ForbiddenException, NotFoundException
from app.models.bookmark import Bookmark
from app.schemas.bookmark import BookmarkCreate
from app.utils.pagination import PaginatedResult, PaginationParams, paginate


async def create_bookmark(
    db: AsyncSession,
    schema: BookmarkCreate,
    user_id: uuid.UUID,
) -> Bookmark:
    """Create a bookmark for a piece of content."""

    result = await db.execute(
        select(Bookmark).where(
            and_(
                Bookmark.user_id == user_id,
                Bookmark.content_type == schema.content_type,
                Bookmark.content_id == schema.content_id,
            )
        )
    )
    if result.scalar_one_or_none():
        raise ConflictException("Bookmark already exists")

    bookmark = Bookmark(
        user_id=user_id,
        content_type=schema.content_type,
        content_id=schema.content_id,
    )
    db.add(bookmark)
    await db.flush()
    return bookmark


async def get_bookmarks(
    db: AsyncSession,
    user_id: uuid.UUID,
    *,
    content_type: Optional[str] = None,
    page: int = 1,
    per_page: int = 20,
) -> PaginatedResult:
    """Return paginated bookmarks for a user, optionally filtered by content type."""

    stmt = (
        select(Bookmark)
        .where(Bookmark.user_id == user_id)
        .order_by(Bookmark.created_at.desc())
    )
    if content_type:
        stmt = stmt.where(Bookmark.content_type == content_type)

    return await paginate(stmt, db, PaginationParams(page=page, per_page=per_page))


async def delete_bookmark(
    db: AsyncSession,
    bookmark_id: uuid.UUID,
    user_id: uuid.UUID,
) -> None:
    """Delete a bookmark.  Only the owner may delete."""

    result = await db.execute(select(Bookmark).where(Bookmark.id == bookmark_id))
    bookmark = result.scalar_one_or_none()
    if bookmark is None:
        raise NotFoundException("Bookmark not found")

    if bookmark.user_id != user_id:
        raise ForbiddenException("You can only delete your own bookmarks")

    await db.delete(bookmark)
    await db.flush()

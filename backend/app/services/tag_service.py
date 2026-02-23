"""Tag service — tag CRUD and lookups."""

from __future__ import annotations

import uuid
from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.exceptions import ConflictException, NotFoundException
from app.models.tag import Tag
from app.schemas.tag import TagCreate
from app.utils.pagination import PaginatedResult, PaginationParams, paginate
from app.utils.slugify import generate_slug


async def create_tag(
    db: AsyncSession,
    schema: TagCreate,
) -> Tag:
    """Create a new tag."""

    slug = generate_slug(schema.name)
    result = await db.execute(select(Tag).where(Tag.slug == slug))
    if result.scalar_one_or_none():
        raise ConflictException("A tag with this name already exists")

    tag = Tag(
        name=schema.name,
        slug=slug,
        description=schema.description,
        color=schema.color,
    )
    db.add(tag)
    await db.flush()
    return tag


async def get_tags(
    db: AsyncSession,
    *,
    page: int = 1,
    per_page: int = 50,
) -> PaginatedResult:
    """Return a paginated list of tags."""

    stmt = select(Tag).order_by(Tag.name)
    return await paginate(stmt, db, PaginationParams(page=page, per_page=per_page))


async def get_tag_by_slug(db: AsyncSession, slug: str) -> Tag:
    """Return a tag by slug or raise 404."""

    result = await db.execute(select(Tag).where(Tag.slug == slug))
    tag = result.scalar_one_or_none()
    if tag is None:
        raise NotFoundException("Tag not found")
    return tag

"""Notification service."""
from __future__ import annotations
import uuid
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.notification import Notification
from app.utils.pagination import PaginatedResult, PaginationParams, paginate


async def get_notifications(
    db: AsyncSession, user_id: uuid.UUID, *, page: int = 1, per_page: int = 20, unread_only: bool = False,
) -> PaginatedResult:
    stmt = select(Notification).where(Notification.user_id == user_id)
    if unread_only:
        stmt = stmt.where(Notification.is_read.is_(False))
    stmt = stmt.order_by(Notification.created_at.desc())
    return await paginate(stmt, db, PaginationParams(page=page, per_page=per_page))


async def get_unread_count(db: AsyncSession, user_id: uuid.UUID) -> int:
    from sqlalchemy import func
    result = await db.execute(
        select(func.count(Notification.id)).where(Notification.user_id == user_id, Notification.is_read.is_(False))
    )
    return result.scalar() or 0


async def mark_as_read(db: AsyncSession, notification_id: uuid.UUID, user_id: uuid.UUID) -> None:
    await db.execute(
        update(Notification).where(Notification.id == notification_id, Notification.user_id == user_id).values(is_read=True)
    )
    await db.flush()


async def mark_all_read(db: AsyncSession, user_id: uuid.UUID) -> int:
    result = await db.execute(
        update(Notification).where(Notification.user_id == user_id, Notification.is_read.is_(False)).values(is_read=True)
    )
    await db.flush()
    return result.rowcount


async def create_notification(
    db: AsyncSession, *, user_id: uuid.UUID, type: str, title: str, message: str, link: str | None = None, sender_id: uuid.UUID | None = None,
) -> Notification:
    n = Notification(user_id=user_id, type=type, title=title, message=message, link=link, sender_id=sender_id)
    db.add(n)
    await db.flush()
    return n

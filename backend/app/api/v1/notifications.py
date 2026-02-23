from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.base import APIResponse
from app.services import notification_service

router = APIRouter()


@router.get("/", response_model=APIResponse)
async def list_notifications(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    unread_only: bool = Query(False),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await notification_service.get_notifications(db, current_user.id, page=page, per_page=per_page, unread_only=unread_only)
    items = [
        {
            "id": str(n.id),
            "type": n.type,
            "title": n.title,
            "message": n.message,
            "is_read": n.is_read,
            "link": n.link,
            "created_at": n.created_at.isoformat() if n.created_at else None,
        }
        for n in result.items
    ]
    return APIResponse(success=True, data={"items": items, "total": result.total, "page": result.page, "per_page": result.per_page, "total_pages": result.total_pages, "has_next": result.has_next, "has_prev": result.has_prev}, message="Notifications retrieved")


@router.get("/unread-count", response_model=APIResponse)
async def unread_count(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    count = await notification_service.get_unread_count(db, current_user.id)
    return APIResponse(success=True, data={"count": count}, message="Unread count retrieved")


@router.put("/{notification_id}/read", response_model=APIResponse)
async def mark_read(
    notification_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    import uuid
    await notification_service.mark_as_read(db, uuid.UUID(notification_id), current_user.id)
    return APIResponse(success=True, data=None, message="Notification marked as read")


@router.put("/read-all", response_model=APIResponse)
async def mark_all_read(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    count = await notification_service.mark_all_read(db, current_user.id)
    return APIResponse(success=True, data={"count": count}, message=f"{count} notifications marked as read")

from uuid import UUID

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user, get_current_user_optional
from app.models.user import User
from app.schemas.base import APIResponse
from app.schemas.comment import CommentCreate, CommentVoteRequest
from app.services import comment_service

router = APIRouter()


@router.get("/", response_model=APIResponse)
async def list_comments(
    content_type: str = Query(..., description="Type of content (article, question, answer, problem)"),
    content_id: UUID = Query(..., description="ID of the content to list comments for"),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    sort_by: str = Query("newest", regex="^(newest|oldest|votes)$"),
    current_user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """List top-level comments for a specific piece of content."""
    user_id = current_user.id if current_user else None
    result = await comment_service.get_comments(
        db, content_type, content_id,
        page=page, per_page=per_page, sort_by=sort_by, user_id=user_id,
    )
    return APIResponse(success=True, data=result, message="Comments retrieved")


@router.get("/{comment_id}/replies", response_model=APIResponse)
async def list_replies(
    comment_id: UUID,
    current_user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """List replies to a specific comment."""
    user_id = current_user.id if current_user else None
    replies = await comment_service.get_replies(db, comment_id, user_id=user_id)
    return APIResponse(success=True, data=replies, message="Replies retrieved")


@router.post("/", response_model=APIResponse, status_code=201)
async def create_comment(
    data: CommentCreate,
    content_type: str = Query(..., description="Type of content (article, question, answer, problem)"),
    content_id: UUID = Query(..., description="ID of the content to comment on"),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a comment on a piece of content."""
    comment = await comment_service.create_comment(db, content_type, content_id, data, current_user.id)
    from app.schemas.comment import CommentResponse
    from app.schemas.user import PublicUserResponse
    serialized = CommentResponse(
        id=comment.id,
        body=comment.body,
        content_type=comment.content_type,
        content_id=comment.content_id,
        author_id=comment.author_id,
        author=PublicUserResponse.model_validate(comment.author),
        parent_id=comment.parent_id,
        upvotes=comment.upvote_count,
        downvotes=comment.downvote_count,
        user_vote=None,
        replies_count=0,
        created_at=comment.created_at,
        updated_at=comment.updated_at,
    ).model_dump(mode="json")
    return APIResponse(success=True, data=serialized, message="Comment created")


@router.post("/{comment_id}/vote", response_model=APIResponse)
async def vote_comment(
    comment_id: UUID,
    data: CommentVoteRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Vote on a comment (upvote/downvote)."""
    result = await comment_service.vote_comment(db, comment_id, current_user.id, data.vote_type)
    return APIResponse(success=True, data=result, message="Vote recorded")


@router.delete("/{id}", response_model=APIResponse)
async def delete_comment(
    id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Delete a comment. Must be the author or an admin."""
    await comment_service.delete_comment(db, id, current_user.id)
    return APIResponse(success=True, data=None, message="Comment deleted")

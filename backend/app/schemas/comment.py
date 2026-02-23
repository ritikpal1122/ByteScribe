import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.user import PublicUserResponse


class CommentCreate(BaseModel):
    """Request body for creating a comment."""

    body: str = Field(..., min_length=1)
    parent_id: Optional[uuid.UUID] = None

    model_config = ConfigDict(from_attributes=True)


class CommentResponse(BaseModel):
    """Comment representation in API responses."""

    id: uuid.UUID
    body: str
    content_type: str
    content_id: uuid.UUID
    author_id: uuid.UUID
    author: PublicUserResponse
    parent_id: Optional[uuid.UUID] = None
    upvotes: int = 0
    downvotes: int = 0
    user_vote: Optional[str] = None
    replies_count: int = 0
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CommentVoteRequest(BaseModel):
    """Request body for voting on a comment."""

    vote_type: str = Field(..., pattern=r"^(upvote|downvote)$")

    model_config = ConfigDict(from_attributes=True)

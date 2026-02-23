import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.tag import TagResponse
from app.schemas.user import UserResponse


class ArticleCreate(BaseModel):
    """Request body for creating an article."""

    title: str = Field(..., min_length=1, max_length=255)
    content: str = Field(..., min_length=1)
    summary: Optional[str] = None
    cover_image_url: Optional[str] = None
    tag_ids: Optional[list[uuid.UUID]] = None

    model_config = ConfigDict(from_attributes=True)


class ArticleUpdate(BaseModel):
    """Request body for updating an article."""

    title: Optional[str] = Field(None, min_length=1, max_length=255)
    content: Optional[str] = Field(None, min_length=1)
    summary: Optional[str] = None
    cover_image_url: Optional[str] = None
    is_published: Optional[bool] = None

    model_config = ConfigDict(from_attributes=True)


class ArticleResponse(BaseModel):
    """Full article representation including content."""

    id: uuid.UUID
    title: str
    slug: str
    content: str
    summary: Optional[str] = None
    cover_image_url: Optional[str] = None
    is_published: bool
    view_count: int
    upvote_count: int
    downvote_count: int
    comment_count: int
    tags: list[TagResponse] = []
    author: UserResponse
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ArticleListResponse(BaseModel):
    """Article summary for list views (no content field)."""

    id: uuid.UUID
    title: str
    slug: str
    summary: Optional[str] = None
    cover_image_url: Optional[str] = None
    is_published: bool
    view_count: int
    upvote_count: int
    downvote_count: int
    comment_count: int
    tags: list[TagResponse] = []
    author: UserResponse
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

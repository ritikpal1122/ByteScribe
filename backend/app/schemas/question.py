import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.tag import TagResponse
from app.schemas.user import UserResponse


class QuestionCreate(BaseModel):
    """Request body for creating a question."""

    title: str = Field(..., min_length=1, max_length=255)
    body: str = Field(..., min_length=1)
    tag_ids: Optional[list[uuid.UUID]] = None

    model_config = ConfigDict(from_attributes=True)


class QuestionResponse(BaseModel):
    """Full question representation."""

    id: uuid.UUID
    title: str
    slug: str
    body: str
    is_closed: bool
    view_count: int
    upvote_count: int
    downvote_count: int
    answer_count: int
    comment_count: int
    accepted_answer_id: Optional[uuid.UUID] = None
    tags: list[TagResponse] = []
    author: UserResponse
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class QuestionListResponse(BaseModel):
    """Question summary for list views (no body)."""

    id: uuid.UUID
    title: str
    slug: str
    is_closed: bool
    view_count: int
    upvote_count: int
    downvote_count: int
    answer_count: int
    comment_count: int
    accepted_answer_id: Optional[uuid.UUID] = None
    tags: list[TagResponse] = []
    author: UserResponse
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AnswerCreate(BaseModel):
    """Request body for posting an answer."""

    body: str = Field(..., min_length=1)

    model_config = ConfigDict(from_attributes=True)


class AnswerResponse(BaseModel):
    """Full answer representation."""

    id: uuid.UUID
    body: str
    is_accepted: bool
    upvote_count: int
    downvote_count: int
    comment_count: int
    author: UserResponse
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class VoteRequest(BaseModel):
    """Request body for voting on a question or answer."""

    vote_type: str = Field(..., pattern=r"^(upvote|downvote)$")

    model_config = ConfigDict(from_attributes=True)

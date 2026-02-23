import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class BookmarkCreate(BaseModel):
    """Request body for creating a bookmark."""

    content_type: str = Field(..., pattern=r"^(article|question|problem|note)$")
    content_id: uuid.UUID

    model_config = ConfigDict(from_attributes=True)


class BookmarkResponse(BaseModel):
    """Bookmark representation in API responses."""

    id: uuid.UUID
    user_id: uuid.UUID
    content_type: str
    content_id: uuid.UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

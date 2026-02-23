import uuid
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class TagCreate(BaseModel):
    """Request body for creating a tag."""

    name: str = Field(..., min_length=1, max_length=50)
    description: Optional[str] = None
    color: Optional[str] = Field(None, pattern=r"^#[0-9a-fA-F]{6}$")

    model_config = ConfigDict(from_attributes=True)


class TagResponse(BaseModel):
    """Tag representation in API responses."""

    id: uuid.UUID
    name: str
    slug: str
    description: Optional[str] = None
    color: Optional[str] = None
    usage_count: int

    model_config = ConfigDict(from_attributes=True)

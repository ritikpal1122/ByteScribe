import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class NoteCreate(BaseModel):
    """Request body for creating a note."""

    title: str = Field(..., min_length=1, max_length=255)
    content: Optional[str] = None
    visibility: Optional[str] = Field("private", pattern=r"^(private|public|shared)$")

    model_config = ConfigDict(from_attributes=True)


class NoteUpdate(BaseModel):
    """Request body for updating a note."""

    title: Optional[str] = Field(None, min_length=1, max_length=255)
    content: Optional[str] = None
    visibility: Optional[str] = Field(None, pattern=r"^(private|public|shared)$")

    model_config = ConfigDict(from_attributes=True)


class NoteResponse(BaseModel):
    """Note representation in API responses."""

    id: uuid.UUID
    title: str
    content: Optional[str] = None
    visibility: str
    owner_id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

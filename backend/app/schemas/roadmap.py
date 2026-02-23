import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class RoadmapStepCreate(BaseModel):
    """Request body for creating a step within a roadmap."""

    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    order: int = Field(..., ge=0)
    resource_url: Optional[str] = None
    duration_minutes: Optional[int] = Field(None, ge=1)

    model_config = ConfigDict(from_attributes=True)


class RoadmapStepResponse(BaseModel):
    """Roadmap step representation in API responses."""

    id: uuid.UUID
    roadmap_id: uuid.UUID
    title: str
    description: Optional[str] = None
    order: int
    resource_url: Optional[str] = None
    duration_minutes: Optional[int] = None
    is_completed: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class RoadmapCreate(BaseModel):
    """Request body for creating a roadmap."""

    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    is_public: bool = False
    steps: list[RoadmapStepCreate] = []

    model_config = ConfigDict(from_attributes=True)


class RoadmapResponse(BaseModel):
    """Roadmap representation in API responses."""

    id: uuid.UUID
    title: str
    description: Optional[str] = None
    is_public: bool
    owner_id: uuid.UUID
    steps: list[RoadmapStepResponse] = []
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


# ---------------------------------------------------------------------------
# Item schemas
# ---------------------------------------------------------------------------

class StudyPlanItemCreate(BaseModel):
    """Request body for creating a study plan item."""

    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    resource_url: Optional[str] = None
    day_number: int = Field(..., ge=1)
    order: int = Field(..., ge=0)
    section: str = Field("General", max_length=100)
    problem_id: Optional[uuid.UUID] = None
    difficulty: Optional[str] = None
    estimated_minutes: Optional[int] = Field(None, ge=1)

    model_config = ConfigDict(from_attributes=True)


class StudyPlanItemResponse(BaseModel):
    """Study plan item representation in API responses."""

    id: uuid.UUID
    plan_id: uuid.UUID
    title: str
    description: Optional[str] = None
    section: str = "General"
    problem_id: Optional[uuid.UUID] = None
    difficulty: Optional[str] = None
    estimated_minutes: Optional[int] = None
    resource_url: Optional[str] = None
    day_number: int
    order: int
    is_completed: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ---------------------------------------------------------------------------
# Plan schemas
# ---------------------------------------------------------------------------

class StudyPlanCreate(BaseModel):
    """Request body for creating a study plan."""

    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    target_role: Optional[str] = None
    target_company: Optional[str] = None
    duration_weeks: int = Field(4, ge=1, le=52)
    items: list[StudyPlanItemCreate] = []

    model_config = ConfigDict(from_attributes=True)


class StudyPlanUpdate(BaseModel):
    """Request body for updating a study plan."""

    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    target_role: Optional[str] = None
    target_company: Optional[str] = None
    duration_weeks: Optional[int] = Field(None, ge=1, le=52)
    is_public: Optional[bool] = None

    model_config = ConfigDict(from_attributes=True)


class StudyPlanResponse(BaseModel):
    """Study plan representation in API responses."""

    id: uuid.UUID
    title: str
    description: Optional[str] = None
    target_role: Optional[str] = None
    target_company: Optional[str] = None
    duration_weeks: int
    user_id: uuid.UUID
    is_ai_generated: bool
    is_public: bool = False
    item_count: int = 0
    completed_count: int = 0
    items: list[StudyPlanItemResponse] = []
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ---------------------------------------------------------------------------
# Add / reorder items
# ---------------------------------------------------------------------------

class AddItemEntry(BaseModel):
    """Single item to add to a plan."""

    problem_id: Optional[uuid.UUID] = None
    title: Optional[str] = Field(None, max_length=255)
    section: str = Field("General", max_length=100)
    difficulty: Optional[str] = None
    estimated_minutes: Optional[int] = Field(None, ge=1)

    model_config = ConfigDict(from_attributes=True)


class AddItemsRequest(BaseModel):
    """Request body for adding items to a study plan."""

    items: list[AddItemEntry] = Field(..., min_length=1)

    model_config = ConfigDict(from_attributes=True)


class ReorderRequest(BaseModel):
    """Request body for reordering study plan items."""

    item_ids: list[uuid.UUID] = Field(..., min_length=1)

    model_config = ConfigDict(from_attributes=True)


# ---------------------------------------------------------------------------
# AI generation
# ---------------------------------------------------------------------------

class GenerateStudyPlanRequest(BaseModel):
    """Request body for AI-generated study plan."""

    target_role: str = Field(..., min_length=1, max_length=255)
    target_company: Optional[str] = Field(None, max_length=255)
    duration_weeks: int = Field(4, ge=1, le=52)
    topics: list[str] = Field(..., min_length=1)

    model_config = ConfigDict(from_attributes=True)

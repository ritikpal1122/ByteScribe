import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.user import UserResponse


class CompanyCreate(BaseModel):
    """Request body for creating a company profile."""

    name: str = Field(..., min_length=1, max_length=255)
    logo_url: Optional[str] = None
    website: Optional[str] = None
    description: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class CompanyResponse(BaseModel):
    """Company representation in API responses."""

    id: uuid.UUID
    name: str
    slug: str
    logo_url: Optional[str] = None
    website: Optional[str] = None
    description: Optional[str] = None
    interview_count: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class InterviewExperienceCreate(BaseModel):
    """Request body for sharing an interview experience."""

    company_id: uuid.UUID
    role: str = Field(..., min_length=1, max_length=255)
    difficulty: str = Field(..., pattern=r"^(easy|medium|hard)$")
    result: str = Field(..., pattern=r"^(accepted|rejected|pending|no_response)$")
    experience_date: Optional[datetime] = None
    rounds: Optional[int] = Field(None, ge=1)
    title: str = Field(..., min_length=1, max_length=255)
    body: str = Field(..., min_length=1)
    is_anonymous: bool = False

    model_config = ConfigDict(from_attributes=True)


class InterviewExperienceResponse(BaseModel):
    """Interview experience representation in API responses."""

    id: uuid.UUID
    company_id: uuid.UUID
    company: CompanyResponse
    role: str
    difficulty: str
    result: str
    experience_date: Optional[datetime] = None
    rounds: Optional[int] = None
    title: str
    body: str
    is_anonymous: bool
    upvote_count: int
    downvote_count: int
    author: Optional[UserResponse] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

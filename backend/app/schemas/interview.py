import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.user import UserResponse


class MockInterviewCreate(BaseModel):
    """Request body for starting a mock interview session."""

    topic: str = Field(..., min_length=1, max_length=100)
    difficulty: str = Field(..., pattern=r"^(easy|medium|hard)$")

    model_config = ConfigDict(from_attributes=True)


class MockInterviewMessage(BaseModel):
    """A single message in a mock interview conversation."""

    role: str = Field(..., pattern=r"^(user|assistant|system)$")
    content: str

    model_config = ConfigDict(from_attributes=True)


class MockInterviewResponse(BaseModel):
    """Mock interview session representation."""

    id: uuid.UUID
    user_id: uuid.UUID
    topic: str
    difficulty: str
    status: str
    messages: list[MockInterviewMessage] = []
    feedback: Optional[str] = None
    score: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PeerRoomCreate(BaseModel):
    """Request body for creating a peer interview room."""

    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    topic: Optional[str] = None
    max_participants: int = Field(2, ge=2, le=10)

    model_config = ConfigDict(from_attributes=True)


class PeerRoomResponse(BaseModel):
    """Peer interview room representation."""

    id: uuid.UUID
    title: str
    description: Optional[str] = None
    topic: Optional[str] = None
    max_participants: int
    status: str
    host: UserResponse
    participants: list[UserResponse] = []
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

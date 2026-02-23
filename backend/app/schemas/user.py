import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr


class UserResponse(BaseModel):
    """Full user profile (visible to the user themselves and admins)."""

    id: uuid.UUID
    email: EmailStr
    username: str
    display_name: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    role: str
    xp: int
    reputation: int
    problems_solved: int
    articles_written: int
    answers_given: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserUpdate(BaseModel):
    """Editable user profile fields."""

    display_name: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class PublicUserResponse(BaseModel):
    """Public-facing user profile (no email)."""

    id: uuid.UUID
    username: str
    display_name: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    role: str
    xp: int
    reputation: int
    problems_solved: int
    articles_written: int
    answers_given: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

import uuid
from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class DailyActivityResponse(BaseModel):
    """Daily activity heatmap entry."""

    date: date
    activity_count: int
    xp_earned: int

    model_config = ConfigDict(from_attributes=True)


class BadgeResponse(BaseModel):
    """Badge definition representation."""

    id: uuid.UUID
    name: str
    slug: str
    description: str
    icon_url: Optional[str] = None
    category: str
    criteria: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class UserBadgeResponse(BaseModel):
    """A badge earned by a user."""

    id: uuid.UUID
    user_id: uuid.UUID
    badge: BadgeResponse
    earned_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserStreakResponse(BaseModel):
    """User streak information."""

    user_id: uuid.UUID
    current_streak: int
    longest_streak: int
    last_activity_date: Optional[date] = None

    model_config = ConfigDict(from_attributes=True)


class LeaderboardEntry(BaseModel):
    """Single entry in the leaderboard."""

    rank: int
    user_id: uuid.UUID
    username: str
    display_name: str
    avatar_url: Optional[str] = None
    xp: int
    reputation: int
    problems_solved: int

    model_config = ConfigDict(from_attributes=True)

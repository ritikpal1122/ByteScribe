from typing import Generic, TypeVar, Optional
from pydantic import BaseModel, ConfigDict

T = TypeVar("T")


class APIResponse(BaseModel, Generic[T]):
    """Standard envelope for all API responses."""

    success: bool
    data: Optional[T] = None
    message: str = ""

    model_config = ConfigDict(from_attributes=True)


class PaginatedResponse(BaseModel, Generic[T]):
    """Paginated list response with metadata."""

    items: list[T]
    total: int
    page: int
    per_page: int
    total_pages: int
    has_next: bool
    has_prev: bool

    model_config = ConfigDict(from_attributes=True)


class ErrorResponse(BaseModel):
    """Error response body."""

    success: bool = False
    data: None = None
    message: str

    model_config = ConfigDict(from_attributes=True)

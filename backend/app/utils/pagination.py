from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Sequence, TypeVar

from sqlalchemy import Select, func, select
from sqlalchemy.ext.asyncio import AsyncSession

T = TypeVar("T")


@dataclass
class PaginationParams:
    """Query-parameter container for pagination."""

    page: int = 1
    per_page: int = 20

    def __post_init__(self) -> None:
        if self.page < 1:
            self.page = 1
        if self.per_page < 1:
            self.per_page = 1
        if self.per_page > 100:
            self.per_page = 100

    @property
    def offset(self) -> int:
        return (self.page - 1) * self.per_page


@dataclass
class PaginatedResult:
    """Wrapper returned by :func:`paginate`."""

    items: Sequence[Any]
    total: int
    page: int
    per_page: int

    @property
    def total_pages(self) -> int:
        if self.total == 0:
            return 0
        return (self.total + self.per_page - 1) // self.per_page

    @property
    def has_next(self) -> bool:
        return self.page < self.total_pages

    @property
    def has_prev(self) -> bool:
        return self.page > 1


async def paginate(
    stmt: Select,
    session: AsyncSession,
    params: PaginationParams | None = None,
) -> PaginatedResult:
    """Execute *stmt* with pagination and return items + metadata.

    Parameters
    ----------
    stmt:
        A SQLAlchemy ``select()`` statement (not yet executed).
    session:
        An async database session.
    params:
        Pagination parameters; defaults to page 1 / 20 per page.

    Returns
    -------
    PaginatedResult
        Contains ``items``, ``total``, ``page``, ``per_page``, and
        convenience properties ``total_pages``, ``has_next``, ``has_prev``.
    """
    if params is None:
        params = PaginationParams()

    # Total count (wraps the original query as a subquery)
    count_stmt = select(func.count()).select_from(stmt.subquery())
    total = (await session.execute(count_stmt)).scalar_one()

    # Fetch the page
    paginated_stmt = stmt.offset(params.offset).limit(params.per_page)
    result = await session.execute(paginated_stmt)
    items = result.scalars().all()

    return PaginatedResult(
        items=items,
        total=total,
        page=params.page,
        per_page=params.per_page,
    )

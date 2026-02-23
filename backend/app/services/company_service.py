"""Company service — company profiles and interview experiences (stub)."""

from __future__ import annotations

import uuid
from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.exceptions import NotFoundException
from app.models.company import Company, InterviewExperience
from app.utils.pagination import PaginatedResult, PaginationParams, paginate
from app.utils.slugify import generate_slug


# ---------------------------------------------------------------------------
# Companies
# ---------------------------------------------------------------------------


async def create_company(
    db: AsyncSession,
    name: str,
    *,
    logo_url: Optional[str] = None,
    website: Optional[str] = None,
    description: Optional[str] = None,
) -> Company:
    """Create a new company entry."""

    company = Company(
        name=name,
        slug=generate_slug(name),
        logo_url=logo_url,
        website=website,
        description=description,
    )
    db.add(company)
    await db.flush()
    return company


async def get_companies(
    db: AsyncSession,
    *,
    page: int = 1,
    per_page: int = 20,
) -> PaginatedResult:
    """Return a paginated list of companies."""

    stmt = select(Company).order_by(Company.name)
    return await paginate(stmt, db, PaginationParams(page=page, per_page=per_page))


async def get_company_by_slug(db: AsyncSession, slug: str) -> Company:
    """Return a company by slug or raise 404."""

    result = await db.execute(select(Company).where(Company.slug == slug))
    company = result.scalar_one_or_none()
    if company is None:
        raise NotFoundException("Company not found")
    return company


# ---------------------------------------------------------------------------
# Interview Experiences
# ---------------------------------------------------------------------------


async def create_experience(
    db: AsyncSession,
    company_id: uuid.UUID,
    author_id: uuid.UUID,
    *,
    title: str,
    role: str,
    experience_type: str,
    difficulty: str,
    result: str,
    body: str,
    year: Optional[int] = None,
) -> InterviewExperience:
    """Create a new interview experience for a company."""

    # Verify company exists
    comp_result = await db.execute(select(Company).where(Company.id == company_id))
    company = comp_result.scalar_one_or_none()
    if company is None:
        raise NotFoundException("Company not found")

    experience = InterviewExperience(
        company_id=company_id,
        author_id=author_id,
        title=title,
        role=role,
        experience_type=experience_type,
        difficulty=difficulty,
        result=result,
        body=body,
        year=year,
    )
    db.add(experience)

    # Update denormalized count
    company.experience_count += 1

    await db.flush()
    return experience


async def get_experiences(
    db: AsyncSession,
    company_slug: str,
    *,
    page: int = 1,
    per_page: int = 20,
) -> PaginatedResult:
    """Return paginated interview experiences for a company."""

    company = await get_company_by_slug(db, company_slug)

    stmt = (
        select(InterviewExperience)
        .where(InterviewExperience.company_id == company.id)
        .order_by(InterviewExperience.created_at.desc())
    )
    return await paginate(stmt, db, PaginationParams(page=page, per_page=per_page))

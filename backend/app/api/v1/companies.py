from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.base import APIResponse
from app.schemas.company import CompanyCreate, InterviewExperienceCreate
from app.services import company_service

router = APIRouter()


def _company_to_dict(c) -> dict:
    return {
        "id": str(c.id),
        "name": c.name,
        "slug": c.slug,
        "logo_url": c.logo_url,
        "website": c.website,
        "description": c.description,
        "experience_count": c.experience_count,
        "problem_count": c.problem_count,
        "created_at": c.created_at.isoformat() if c.created_at else None,
    }


def _experience_to_dict(e) -> dict:
    return {
        "id": str(e.id),
        "company_id": str(e.company_id),
        "author_id": str(e.author_id),
        "title": e.title,
        "role": e.role,
        "experience_type": e.experience_type,
        "difficulty": e.difficulty,
        "result": e.result,
        "body": e.body,
        "upvote_count": e.upvote_count,
        "year": e.year,
        "created_at": e.created_at.isoformat() if e.created_at else None,
    }


@router.get("/", response_model=APIResponse)
async def list_companies(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    """List companies."""
    result = await company_service.get_companies(db, page=page, per_page=per_page)
    items = [_company_to_dict(c) for c in result.items]
    return APIResponse(success=True, data={
        "items": items,
        "total": result.total,
        "page": result.page,
        "per_page": result.per_page,
        "total_pages": result.total_pages,
        "has_next": result.has_next,
        "has_prev": result.has_prev,
    }, message="Companies retrieved")


@router.post("/", response_model=APIResponse, status_code=201)
async def create_company(
    data: CompanyCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a new company entry."""
    result = await company_service.create_company(
        db, data.name, logo_url=data.logo_url, website=data.website, description=data.description
    )
    return APIResponse(success=True, data=_company_to_dict(result), message="Company created")


@router.get("/{slug}", response_model=APIResponse)
async def get_company(
    slug: str,
    db: AsyncSession = Depends(get_db),
):
    """Get company detail by slug."""
    result = await company_service.get_company_by_slug(db, slug)
    return APIResponse(success=True, data=_company_to_dict(result), message="Company retrieved")


@router.post("/{slug}/experiences", response_model=APIResponse, status_code=201)
async def create_experience(
    slug: str,
    data: InterviewExperienceCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Add an interview experience for a company."""
    result = await company_service.create_experience(
        db,
        data.company_id,
        current_user.id,
        title=data.title,
        role=data.role,
        experience_type="interview",
        difficulty=data.difficulty,
        result=data.result,
        body=data.body,
    )
    return APIResponse(success=True, data=_experience_to_dict(result), message="Experience created")


@router.get("/{slug}/experiences", response_model=APIResponse)
async def list_experiences(
    slug: str,
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    """List interview experiences for a company."""
    result = await company_service.get_experiences(db, slug, page=page, per_page=per_page)
    items = [_experience_to_dict(e) for e in result.items]
    return APIResponse(success=True, data={
        "items": items,
        "total": result.total,
        "page": result.page,
        "per_page": result.per_page,
        "total_pages": result.total_pages,
        "has_next": result.has_next,
        "has_prev": result.has_prev,
    }, message="Experiences retrieved")

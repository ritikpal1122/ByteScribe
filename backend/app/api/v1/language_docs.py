from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.base import APIResponse
from app.services import language_doc_service

router = APIRouter()


@router.get("/", response_model=APIResponse)
async def list_supported_languages(
    db: AsyncSession = Depends(get_db),
):
    """List languages that have documentation entries."""
    langs = await language_doc_service.get_supported_languages(db)
    return APIResponse(success=True, data=langs, message="Languages retrieved")


@router.get("/{language}", response_model=APIResponse)
async def get_language_docs(
    language: str,
    category: str | None = Query(None),
    search: str | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    """Get documentation entries for a programming language."""
    docs = await language_doc_service.get_docs_by_language(
        db, language=language, category=category, search=search,
    )
    items = [
        {
            "id": str(d.id),
            "language": d.language,
            "category": d.category,
            "title": d.title,
            "content": d.content,
            "code_example": d.code_example,
            "order": d.order,
        }
        for d in docs
    ]
    return APIResponse(success=True, data=items, message="Docs retrieved")


@router.get("/{language}/categories", response_model=APIResponse)
async def get_language_categories(
    language: str,
    db: AsyncSession = Depends(get_db),
):
    """Get available categories for a language."""
    cats = await language_doc_service.get_categories(db, language)
    return APIResponse(success=True, data=cats, message="Categories retrieved")

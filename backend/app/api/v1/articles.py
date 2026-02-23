from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user, get_current_user_optional
from app.models.user import User
from app.schemas.article import ArticleCreate, ArticleUpdate
from app.schemas.base import APIResponse
from app.schemas.question import VoteRequest
from app.services import article_service

router = APIRouter()


def _article_to_dict(article) -> dict:
    return {
        "id": str(article.id),
        "title": article.title,
        "slug": article.slug,
        "content": article.content,
        "summary": article.summary,
        "cover_image_url": article.cover_image_url,
        "is_published": article.is_published,
        "view_count": article.view_count,
        "upvote_count": article.upvote_count,
        "downvote_count": article.downvote_count,
        "comment_count": article.comment_count,
        "author_id": str(article.author_id),
        "author": {
            "id": str(article.author.id),
            "username": article.author.username,
            "display_name": article.author.display_name,
            "avatar_url": article.author.avatar_url,
        } if article.author else None,
        "created_at": article.created_at.isoformat() if article.created_at else None,
        "updated_at": article.updated_at.isoformat() if article.updated_at else None,
    }


@router.get("/", response_model=APIResponse)
async def list_articles(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    tag: str | None = Query(None),
    current_user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """List articles with pagination and optional tag filter."""
    result = await article_service.get_articles(db, page=page, per_page=per_page)
    items = [_article_to_dict(a) for a in result.items]
    return APIResponse(success=True, data={
        "items": items,
        "total": result.total,
        "page": result.page,
        "per_page": result.per_page,
        "total_pages": result.total_pages,
        "has_next": result.has_next,
        "has_prev": result.has_prev,
    }, message="Articles retrieved")


@router.post("/", response_model=APIResponse, status_code=201)
async def create_article(
    data: ArticleCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a new article."""
    result = await article_service.create_article(db, data, current_user.id)
    return APIResponse(success=True, data=_article_to_dict(result), message="Article created")


@router.get("/{slug}", response_model=APIResponse)
async def get_article(
    slug: str,
    current_user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """Get article detail by slug. Increments view count."""
    result = await article_service.get_article_by_slug(db, slug)
    await article_service.increment_view_count(db, result.id)
    return APIResponse(success=True, data=_article_to_dict(result), message="Article retrieved")


@router.put("/{slug}", response_model=APIResponse)
async def update_article(
    slug: str,
    data: ArticleUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update an article. Must be the author."""
    result = await article_service.update_article(db, slug, data, current_user.id)
    result_data = {
        "id": str(result.id),
        "title": result.title,
        "slug": result.slug,
        "content": result.content,
        "summary": result.summary,
        "cover_image_url": result.cover_image_url,
        "is_published": result.is_published,
        "view_count": result.view_count,
        "upvote_count": result.upvote_count,
        "downvote_count": result.downvote_count,
        "comment_count": result.comment_count,
        "author_id": str(result.author_id),
        "author": {
            "id": str(current_user.id),
            "username": current_user.username,
            "display_name": current_user.display_name,
            "avatar_url": current_user.avatar_url,
        },
        "created_at": result.created_at.isoformat() if result.created_at else None,
        "updated_at": result.updated_at.isoformat() if result.updated_at else None,
    }
    return APIResponse(success=True, data=result_data, message="Article updated")


@router.delete("/{slug}", response_model=APIResponse)
async def delete_article(
    slug: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Delete an article. Must be the author."""
    await article_service.delete_article(db, slug, current_user.id)
    return APIResponse(success=True, data=None, message="Article deleted")


@router.post("/{slug}/vote", response_model=APIResponse)
async def vote_article(
    slug: str,
    data: VoteRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Vote on an article (upvote/downvote)."""
    article = await article_service.get_article_by_slug(db, slug)
    result = await article_service.vote_article(db, article.id, current_user.id, data.vote_type)
    return APIResponse(success=True, data=result, message="Vote recorded")

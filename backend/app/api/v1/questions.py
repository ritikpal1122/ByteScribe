from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user, get_current_user_optional
from app.models.user import User
from app.schemas.base import APIResponse
from app.schemas.question import AnswerCreate, QuestionCreate, VoteRequest
from app.services import question_service

router = APIRouter()


def _question_to_dict(q) -> dict:
    return {
        "id": str(q.id),
        "title": q.title,
        "slug": q.slug,
        "body": q.body,
        "is_closed": q.is_closed,
        "view_count": q.view_count,
        "upvote_count": q.upvote_count,
        "downvote_count": q.downvote_count,
        "answer_count": q.answer_count,
        "comment_count": q.comment_count,
        "accepted_answer_id": str(q.accepted_answer_id) if q.accepted_answer_id else None,
        "author_id": str(q.author_id),
        "author": {
            "id": str(q.author.id),
            "username": q.author.username,
            "display_name": q.author.display_name,
            "avatar_url": q.author.avatar_url,
        } if q.author else None,
        "created_at": q.created_at.isoformat() if q.created_at else None,
        "updated_at": q.updated_at.isoformat() if q.updated_at else None,
    }


def _answer_to_dict(a) -> dict:
    return {
        "id": str(a.id),
        "body": a.body,
        "is_accepted": a.is_accepted,
        "upvote_count": a.upvote_count,
        "downvote_count": a.downvote_count,
        "comment_count": a.comment_count,
        "question_id": str(a.question_id),
        "author_id": str(a.author_id),
        "author": {
            "id": str(a.author.id),
            "username": a.author.username,
            "display_name": a.author.display_name,
            "avatar_url": a.author.avatar_url,
        } if a.author else None,
        "created_at": a.created_at.isoformat() if a.created_at else None,
    }


@router.get("/", response_model=APIResponse)
async def list_questions(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    tag: str | None = Query(None),
    current_user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """List questions with pagination."""
    result = await question_service.get_questions(db, page=page, per_page=per_page)
    items = [_question_to_dict(q) for q in result.items]
    return APIResponse(success=True, data={
        "items": items,
        "total": result.total,
        "page": result.page,
        "per_page": result.per_page,
        "total_pages": result.total_pages,
        "has_next": result.has_next,
        "has_prev": result.has_prev,
    }, message="Questions retrieved")


@router.post("/", response_model=APIResponse, status_code=201)
async def create_question(
    data: QuestionCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a new question."""
    result = await question_service.create_question(db, data, current_user.id)
    return APIResponse(success=True, data=_question_to_dict(result), message="Question created")


@router.get("/{slug}", response_model=APIResponse)
async def get_question(
    slug: str,
    current_user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """Get question detail by slug."""
    result = await question_service.get_question_by_slug(db, slug)
    return APIResponse(success=True, data=_question_to_dict(result), message="Question retrieved")


@router.put("/{slug}", response_model=APIResponse)
async def update_question(
    slug: str,
    data: QuestionCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update a question. Must be the author."""
    result = await question_service.update_question(
        db, slug, title=data.title, body=data.body, user_id=current_user.id
    )
    result_data = {
        "id": str(result.id),
        "title": result.title,
        "slug": result.slug,
        "body": result.body,
        "is_closed": result.is_closed,
        "view_count": result.view_count,
        "upvote_count": result.upvote_count,
        "downvote_count": result.downvote_count,
        "answer_count": result.answer_count,
        "comment_count": result.comment_count,
        "accepted_answer_id": str(result.accepted_answer_id) if result.accepted_answer_id else None,
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
    return APIResponse(success=True, data=result_data, message="Question updated")


@router.post("/{slug}/answers", response_model=APIResponse, status_code=201)
async def create_answer(
    slug: str,
    data: AnswerCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Post an answer to a question."""
    question = await question_service.get_question_by_slug(db, slug)
    result = await question_service.create_answer(db, question.id, data, current_user.id)
    return APIResponse(success=True, data=_answer_to_dict(result), message="Answer created")


@router.get("/{slug}/answers", response_model=APIResponse)
async def list_answers(
    slug: str,
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    """List answers for a question."""
    question = await question_service.get_question_by_slug(db, slug)
    result = await question_service.get_answers(db, question.id, page=page, per_page=per_page)
    items = [_answer_to_dict(a) for a in result.items]
    return APIResponse(success=True, data={
        "items": items,
        "total": result.total,
        "page": result.page,
        "per_page": result.per_page,
        "total_pages": result.total_pages,
        "has_next": result.has_next,
        "has_prev": result.has_prev,
    }, message="Answers retrieved")


@router.post("/{slug}/answers/{answer_id}/accept", response_model=APIResponse)
async def accept_answer(
    slug: str,
    answer_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Accept an answer. Must be the question author."""
    result = await question_service.accept_answer(db, slug, answer_id, current_user.id)
    return APIResponse(success=True, data=_answer_to_dict(result), message="Answer accepted")


@router.post("/vote", response_model=APIResponse)
async def vote(
    data: VoteRequest,
    content_type: str = Query(..., description="Type of content (question, answer)"),
    content_id: int = Query(..., description="ID of the content to vote on"),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Vote on a question or answer. Body: vote_type. Query: content_type, content_id."""
    result = await question_service.vote(db, content_type, content_id, current_user.id, data.vote_type)
    return APIResponse(success=True, data=result, message="Vote recorded")

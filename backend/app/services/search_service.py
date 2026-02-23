"""Search service — cross-content-type search using ILIKE (stub)."""

from __future__ import annotations

from typing import Optional

from sqlalchemy import select, or_, func, literal_column
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.article import Article
from app.models.problem import Problem
from app.models.question import Question


async def search(
    db: AsyncSession,
    query: str,
    *,
    content_types: Optional[list[str]] = None,
    page: int = 1,
    per_page: int = 20,
) -> dict:
    """Search across articles, questions, and problems using ILIKE.

    Parameters
    ----------
    query
        The search term (partial match via ``%query%``).
    content_types
        Optional filter, e.g. ``["article", "question", "problem"]``.
        If ``None``, searches all types.

    Returns
    -------
    dict
        ``{"results": [...], "total": int, "page": int, "per_page": int}``
    """

    if not query or not query.strip():
        return {"results": [], "total": 0, "page": page, "per_page": per_page}

    pattern = f"%{query.strip()}%"
    types = content_types or ["article", "question", "problem"]

    results: list[dict] = []
    total = 0
    offset = (page - 1) * per_page

    # ---- Articles --------------------------------------------------------
    if "article" in types:
        stmt = (
            select(Article)
            .where(
                Article.is_published.is_(True),
                or_(
                    Article.title.ilike(pattern),
                    Article.content.ilike(pattern),
                    Article.summary.ilike(pattern),
                ),
            )
            .order_by(Article.created_at.desc())
        )
        count_stmt = select(func.count()).select_from(stmt.subquery())
        article_total = (await db.execute(count_stmt)).scalar_one()
        total += article_total

        article_rows = await db.execute(stmt.offset(offset).limit(per_page))
        for article in article_rows.scalars().all():
            results.append(
                {
                    "type": "article",
                    "id": str(article.id),
                    "title": article.title,
                    "slug": article.slug,
                    "summary": article.summary,
                }
            )

    # ---- Questions -------------------------------------------------------
    if "question" in types:
        stmt = (
            select(Question)
            .where(
                or_(
                    Question.title.ilike(pattern),
                    Question.body.ilike(pattern),
                ),
            )
            .order_by(Question.created_at.desc())
        )
        count_stmt = select(func.count()).select_from(stmt.subquery())
        question_total = (await db.execute(count_stmt)).scalar_one()
        total += question_total

        question_rows = await db.execute(stmt.offset(offset).limit(per_page))
        for question in question_rows.scalars().all():
            results.append(
                {
                    "type": "question",
                    "id": str(question.id),
                    "title": question.title,
                    "slug": question.slug,
                    "summary": question.body[:200] if question.body else None,
                }
            )

    # ---- Problems --------------------------------------------------------
    if "problem" in types:
        stmt = (
            select(Problem)
            .where(
                Problem.is_published.is_(True),
                or_(
                    Problem.title.ilike(pattern),
                    Problem.description.ilike(pattern),
                ),
            )
            .order_by(Problem.created_at.desc())
        )
        count_stmt = select(func.count()).select_from(stmt.subquery())
        problem_total = (await db.execute(count_stmt)).scalar_one()
        total += problem_total

        problem_rows = await db.execute(stmt.offset(offset).limit(per_page))
        for problem in problem_rows.scalars().all():
            results.append(
                {
                    "type": "problem",
                    "id": str(problem.id),
                    "title": problem.title,
                    "slug": problem.slug,
                    "summary": problem.description[:200] if problem.description else None,
                    "difficulty": problem.difficulty,
                }
            )

    return {
        "results": results,
        "total": total,
        "page": page,
        "per_page": per_page,
    }

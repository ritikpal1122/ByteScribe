"""Code review service — AI-powered analysis of submissions."""

from __future__ import annotations

import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.code_review import CodeReview
from app.models.problem import Problem, Submission
from app.services.claude_service import get_claude


async def request_review(
    db: AsyncSession,
    submission_id: uuid.UUID,
    user_id: uuid.UUID,
) -> CodeReview:
    """Generate an AI code review for a submission."""
    # Check for existing review
    existing = await db.execute(
        select(CodeReview).where(CodeReview.submission_id == submission_id)
    )
    review = existing.scalar_one_or_none()
    if review is not None:
        return review

    # Fetch submission + problem
    sub_result = await db.execute(
        select(Submission).where(Submission.id == submission_id)
    )
    submission = sub_result.scalar_one_or_none()
    if submission is None:
        raise ValueError("Submission not found")

    prob_result = await db.execute(
        select(Problem).where(Problem.id == submission.problem_id)
    )
    problem = prob_result.scalar_one_or_none()
    if problem is None:
        raise ValueError("Problem not found")

    # Call Claude
    claude = get_claude()
    review_data = await claude.review_code(
        problem={
            "title": problem.title,
            "difficulty": problem.difficulty,
            "description": problem.description,
        },
        code=submission.code,
        language=submission.language,
        verdict=submission.verdict,
    )

    # Persist
    review = CodeReview(
        submission_id=submission_id,
        user_id=user_id,
        problem_id=submission.problem_id,
        time_complexity=review_data.get("time_complexity", "Unknown"),
        space_complexity=review_data.get("space_complexity", "Unknown"),
        overall_rating=max(1, min(10, review_data.get("overall_rating", 5))),
        summary=review_data.get("summary", ""),
        strengths=review_data.get("strengths", []),
        improvements=review_data.get("improvements", []),
    )
    db.add(review)
    await db.flush()
    return review


async def get_review(
    db: AsyncSession,
    submission_id: uuid.UUID,
) -> CodeReview | None:
    """Return an existing review or None."""
    result = await db.execute(
        select(CodeReview).where(CodeReview.submission_id == submission_id)
    )
    return result.scalar_one_or_none()

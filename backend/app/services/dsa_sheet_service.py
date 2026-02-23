"""DSA Sheet service — list sheets, get detail, toggle progress."""

from __future__ import annotations

import uuid

from sqlalchemy import select, and_, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.exceptions import NotFoundException
from app.models.dsa_sheet import DSASheet, DSASheetProblem, DSASheetProgress


async def list_sheets(db: AsyncSession) -> list[dict]:
    """Return all DSA sheets with basic info."""
    result = await db.execute(
        select(DSASheet).order_by(DSASheet.created_at)
    )
    sheets = result.scalars().all()
    return [
        {
            "id": str(s.id),
            "name": s.name,
            "slug": s.slug,
            "description": s.description,
            "icon": s.icon,
            "problem_count": s.problem_count,
        }
        for s in sheets
    ]


async def get_sheet_detail(
    db: AsyncSession,
    slug: str,
    user_id: uuid.UUID | None = None,
) -> dict:
    """Return a sheet with all its problems grouped by section."""
    result = await db.execute(
        select(DSASheet)
        .where(DSASheet.slug == slug)
        .options(selectinload(DSASheet.problems).selectinload(DSASheetProblem.problem))
    )
    sheet = result.scalar_one_or_none()
    if sheet is None:
        raise NotFoundException("DSA Sheet not found")

    # Get user progress if authenticated
    progress_set: set[uuid.UUID] = set()
    if user_id:
        prog_result = await db.execute(
            select(DSASheetProgress.problem_id).where(
                and_(
                    DSASheetProgress.sheet_id == sheet.id,
                    DSASheetProgress.user_id == user_id,
                    DSASheetProgress.is_completed.is_(True),
                )
            )
        )
        progress_set = {row[0] for row in prog_result.all()}

    # Group problems by section
    sections: dict[str, list] = {}
    for sp in sheet.problems:
        section = sp.section
        if section not in sections:
            sections[section] = []
        p = sp.problem
        sections[section].append({
            "id": str(p.id),
            "title": p.title,
            "slug": p.slug,
            "difficulty": p.difficulty,
            "is_completed": p.id in progress_set,
            "order": sp.order,
        })

    return {
        "id": str(sheet.id),
        "name": sheet.name,
        "slug": sheet.slug,
        "description": sheet.description,
        "icon": sheet.icon,
        "problem_count": sheet.problem_count,
        "completed_count": len(progress_set),
        "sections": sections,
    }


async def get_user_progress_summary(
    db: AsyncSession,
    user_id: uuid.UUID,
) -> list[dict]:
    """Return a summary of the user's progress across all DSA sheets."""
    # Get all sheets
    sheets_result = await db.execute(
        select(DSASheet).order_by(DSASheet.created_at)
    )
    sheets = sheets_result.scalars().all()

    if not sheets:
        return []

    # Count completed problems per sheet for this user
    progress_result = await db.execute(
        select(
            DSASheetProgress.sheet_id,
            func.count(DSASheetProgress.id),
        )
        .where(
            and_(
                DSASheetProgress.user_id == user_id,
                DSASheetProgress.is_completed.is_(True),
            )
        )
        .group_by(DSASheetProgress.sheet_id)
    )
    completed_map = {row[0]: row[1] for row in progress_result.all()}

    return [
        {
            "id": str(s.id),
            "name": s.name,
            "slug": s.slug,
            "icon": s.icon,
            "problem_count": s.problem_count,
            "completed_count": completed_map.get(s.id, 0),
        }
        for s in sheets
    ]


async def toggle_progress(
    db: AsyncSession,
    sheet_slug: str,
    problem_id: uuid.UUID,
    user_id: uuid.UUID,
) -> dict:
    """Toggle the completion status of a problem in a sheet for a user."""
    # Find sheet
    result = await db.execute(select(DSASheet).where(DSASheet.slug == sheet_slug))
    sheet = result.scalar_one_or_none()
    if sheet is None:
        raise NotFoundException("DSA Sheet not found")

    # Find existing progress
    result = await db.execute(
        select(DSASheetProgress).where(
            and_(
                DSASheetProgress.user_id == user_id,
                DSASheetProgress.sheet_id == sheet.id,
                DSASheetProgress.problem_id == problem_id,
            )
        )
    )
    progress = result.scalar_one_or_none()

    if progress is None:
        progress = DSASheetProgress(
            user_id=user_id,
            sheet_id=sheet.id,
            problem_id=problem_id,
            is_completed=True,
        )
        db.add(progress)
    else:
        progress.is_completed = not progress.is_completed

    await db.flush()
    return {"is_completed": progress.is_completed}

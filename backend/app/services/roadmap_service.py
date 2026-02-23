"""Roadmap service — learning roadmaps with progress tracking."""

from __future__ import annotations

import uuid
from typing import Optional

from sqlalchemy import select, and_, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.exceptions import ForbiddenException, NotFoundException
from app.models.roadmap import Roadmap, RoadmapProgress, RoadmapStep
from app.services import roadmap_review_service
from app.utils.pagination import PaginatedResult, PaginationParams, paginate
from app.utils.slugify import generate_slug


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _roadmap_to_dict(roadmap: Roadmap, *, total_nodes: int = 0) -> dict:
    """Convert a Roadmap ORM object to a frontend-friendly dict."""
    return {
        "id": str(roadmap.id),
        "title": roadmap.title,
        "slug": roadmap.slug,
        "description": roadmap.description or "",
        "difficulty": roadmap.difficulty or "beginner",
        "estimated_hours": roadmap.estimated_hours or 0,
        "total_nodes": total_nodes or roadmap.step_count,
        "completed_nodes": 0,
        "progress_percentage": 0,
        "created_at": roadmap.created_at.isoformat() if roadmap.created_at else None,
        "updated_at": roadmap.updated_at.isoformat() if roadmap.updated_at else None,
    }


def _step_to_node(step: RoadmapStep, *, is_completed: bool = False, is_due_for_review: bool = False) -> dict:
    """Convert a RoadmapStep to a frontend-friendly node dict."""
    return {
        "id": str(step.id),
        "title": step.title,
        "description": step.description or "",
        "resource_url": step.resource_url,
        "order": step.order,
        "is_completed": is_completed,
        "is_due_for_review": is_due_for_review,
        "children": [],
    }


# ---------------------------------------------------------------------------
# CRUD
# ---------------------------------------------------------------------------


async def create_roadmap(
    db: AsyncSession,
    title: str,
    description: str,
    author_id: uuid.UUID | None = None,
    steps: Optional[list[dict]] = None,
    *,
    difficulty: str = "beginner",
    estimated_hours: int = 0,
) -> Roadmap:
    """Create a new roadmap with optional steps."""

    roadmap = Roadmap(
        title=title,
        slug=generate_slug(title),
        description=description,
        difficulty=difficulty,
        estimated_hours=estimated_hours,
        author_id=author_id,
    )
    db.add(roadmap)
    await db.flush()

    if steps:
        for idx, step_data in enumerate(steps):
            step = RoadmapStep(
                roadmap_id=roadmap.id,
                title=step_data.get("title", f"Step {idx + 1}"),
                description=step_data.get("description", ""),
                order=idx,
                resource_url=step_data.get("resource_url"),
                resource_type=step_data.get("resource_type"),
                content_id=step_data.get("content_id"),
            )
            db.add(step)
        roadmap.step_count = len(steps)
        await db.flush()

    return roadmap


async def get_roadmaps(
    db: AsyncSession,
    *,
    page: int = 1,
    per_page: int = 20,
    search: str | None = None,
    difficulty: str | None = None,
) -> PaginatedResult:
    """Return a paginated list of published roadmaps with enriched data."""

    stmt = (
        select(Roadmap)
        .where(Roadmap.is_published.is_(True))
        .order_by(Roadmap.created_at.desc())
    )

    if search:
        stmt = stmt.where(Roadmap.title.ilike(f"%{search}%"))

    if difficulty:
        stmt = stmt.where(Roadmap.difficulty == difficulty)

    result = await paginate(stmt, db, PaginationParams(page=page, per_page=per_page))

    # Enrich each roadmap with step counts
    enriched_items = []
    for roadmap in result.items:
        count_stmt = select(func.count()).where(RoadmapStep.roadmap_id == roadmap.id)
        total_nodes = (await db.execute(count_stmt)).scalar_one()
        enriched_items.append(_roadmap_to_dict(roadmap, total_nodes=total_nodes))

    return PaginatedResult(
        items=enriched_items,
        total=result.total,
        page=result.page,
        per_page=result.per_page,
    )


async def get_roadmap(
    db: AsyncSession,
    slug: str,
    user_id: uuid.UUID | None = None,
) -> dict:
    """Return a roadmap by slug with steps and progress, or raise 404."""

    result = await db.execute(select(Roadmap).where(Roadmap.slug == slug))
    roadmap = result.scalar_one_or_none()
    if roadmap is None:
        raise NotFoundException("Roadmap not found")

    # Fetch all steps
    steps_result = await db.execute(
        select(RoadmapStep)
        .where(RoadmapStep.roadmap_id == roadmap.id)
        .order_by(RoadmapStep.order)
    )
    steps = steps_result.scalars().all()

    # Fetch user progress if authenticated
    completed_ids: set[uuid.UUID] = set()
    due_review_ids: set[uuid.UUID] = set()
    if user_id:
        progress_result = await db.execute(
            select(RoadmapProgress.step_id).where(
                and_(
                    RoadmapProgress.roadmap_id == roadmap.id,
                    RoadmapProgress.user_id == user_id,
                    RoadmapProgress.is_completed.is_(True),
                )
            )
        )
        completed_ids = {row[0] for row in progress_result.all()}
        due_review_ids = await roadmap_review_service.get_due_step_ids(db, user_id, roadmap.id)

    # Build nodes — group by section (resource_type == 'section') or flat list
    nodes: list[dict] = []
    current_section: dict | None = None

    for step in steps:
        is_done = step.id in completed_ids
        is_due = step.id in due_review_ids
        node = _step_to_node(step, is_completed=is_done, is_due_for_review=is_due)

        if step.resource_type == "section":
            current_section = node
            nodes.append(current_section)
        elif current_section is not None:
            current_section["children"].append(node)
        else:
            nodes.append(node)

    total_nodes = sum(
        len(n["children"]) if n["children"] else 1 for n in nodes
    )
    completed_nodes = len(completed_ids)
    pct = round((completed_nodes / total_nodes) * 100) if total_nodes > 0 else 0

    data = _roadmap_to_dict(roadmap, total_nodes=total_nodes)
    data["nodes"] = nodes
    data["completed_nodes"] = completed_nodes
    data["progress_percentage"] = pct
    data["due_review_count"] = len(due_review_ids)

    return data


async def update_progress(
    db: AsyncSession,
    roadmap_id: uuid.UUID,
    step_id: uuid.UUID,
    user_id: uuid.UUID,
    *,
    is_completed: bool = True,
) -> RoadmapProgress:
    """Toggle the completion status of a roadmap step for a user."""

    # Verify roadmap and step exist
    result = await db.execute(select(Roadmap).where(Roadmap.id == roadmap_id))
    if result.scalar_one_or_none() is None:
        raise NotFoundException("Roadmap not found")

    result = await db.execute(select(RoadmapStep).where(RoadmapStep.id == step_id))
    if result.scalar_one_or_none() is None:
        raise NotFoundException("Step not found")

    # Upsert progress row
    result = await db.execute(
        select(RoadmapProgress).where(
            and_(
                RoadmapProgress.roadmap_id == roadmap_id,
                RoadmapProgress.step_id == step_id,
                RoadmapProgress.user_id == user_id,
            )
        )
    )
    progress = result.scalar_one_or_none()

    if progress is None:
        progress = RoadmapProgress(
            roadmap_id=roadmap_id,
            step_id=step_id,
            user_id=user_id,
            is_completed=is_completed,
        )
        db.add(progress)
    else:
        progress.is_completed = is_completed

    await db.flush()

    # Auto-create spaced repetition review card when step is completed
    if is_completed:
        await roadmap_review_service.auto_create_review(db, user_id, roadmap_id, step_id)

    return progress

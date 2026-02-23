"""Study plan service — personalised study plans."""

from __future__ import annotations

import uuid
from typing import Optional

from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.exceptions import BadRequestException, ForbiddenException, NotFoundException
from app.models.study_plan import StudyPlan, StudyPlanItem
from app.models.problem import Problem
from app.utils.pagination import PaginatedResult, PaginationParams, paginate


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

async def _get_owned_plan(db: AsyncSession, plan_id: uuid.UUID, user_id: uuid.UUID) -> StudyPlan:
    """Fetch a plan and verify ownership."""
    result = await db.execute(
        select(StudyPlan).options(selectinload(StudyPlan.items)).where(StudyPlan.id == plan_id)
    )
    plan = result.scalar_one_or_none()
    if plan is None:
        raise NotFoundException("Study plan not found")
    if plan.user_id != user_id:
        raise ForbiddenException("Not your study plan")
    return plan


# ---------------------------------------------------------------------------
# CRUD
# ---------------------------------------------------------------------------

async def create_plan(
    db: AsyncSession,
    user_id: uuid.UUID,
    *,
    title: str,
    description: Optional[str] = None,
    target_role: Optional[str] = None,
    target_company: Optional[str] = None,
    duration_weeks: int = 4,
    items: Optional[list[dict]] = None,
) -> StudyPlan:
    """Create a study plan with optional items."""

    plan = StudyPlan(
        user_id=user_id,
        title=title,
        description=description,
        target_role=target_role,
        target_company=target_company,
        duration_weeks=duration_weeks,
    )
    db.add(plan)
    await db.flush()

    if items:
        for idx, item_data in enumerate(items):
            item = StudyPlanItem(
                plan_id=plan.id,
                title=item_data.get("title", f"Item {idx + 1}"),
                description=item_data.get("description"),
                section=item_data.get("section", "General"),
                content_type=item_data.get("content_type"),
                content_id=item_data.get("content_id"),
                problem_id=item_data.get("problem_id"),
                difficulty=item_data.get("difficulty"),
                estimated_minutes=item_data.get("estimated_minutes"),
                resource_url=item_data.get("resource_url"),
                day_number=item_data.get("day_number", 1),
                order=idx,
            )
            db.add(item)
        plan.item_count = len(items)
        await db.flush()

    return plan


async def get_plans(
    db: AsyncSession,
    user_id: uuid.UUID,
    *,
    page: int = 1,
    per_page: int = 20,
) -> PaginatedResult:
    """Return paginated study plans for the user."""

    stmt = (
        select(StudyPlan)
        .where(StudyPlan.user_id == user_id)
        .order_by(StudyPlan.created_at.desc())
    )
    return await paginate(stmt, db, PaginationParams(page=page, per_page=per_page))


async def get_plan_detail(
    db: AsyncSession,
    plan_id: uuid.UUID,
    user_id: uuid.UUID,
) -> StudyPlan:
    """Get a single plan with items (grouped by section on the client side)."""
    return await _get_owned_plan(db, plan_id, user_id)


async def update_plan(
    db: AsyncSession,
    plan_id: uuid.UUID,
    user_id: uuid.UUID,
    **fields: object,
) -> StudyPlan:
    """Update plan metadata fields."""
    plan = await _get_owned_plan(db, plan_id, user_id)
    allowed = {"title", "description", "target_role", "target_company", "duration_weeks", "is_public"}
    for key, value in fields.items():
        if key in allowed and value is not None:
            setattr(plan, key, value)
    await db.flush()
    return plan


async def delete_plan(
    db: AsyncSession,
    plan_id: uuid.UUID,
    user_id: uuid.UUID,
) -> None:
    """Delete a study plan."""
    plan = await _get_owned_plan(db, plan_id, user_id)
    await db.delete(plan)
    await db.flush()


async def add_items(
    db: AsyncSession,
    plan_id: uuid.UUID,
    user_id: uuid.UUID,
    items: list[dict],
) -> StudyPlan:
    """Add problems/custom items to a plan."""
    plan = await _get_owned_plan(db, plan_id, user_id)

    current_max_order = max((i.order for i in plan.items), default=-1)

    for idx, item_data in enumerate(items):
        problem_id = item_data.get("problem_id")
        title = item_data.get("title")
        difficulty = item_data.get("difficulty")

        # If problem_id provided, fetch problem details
        if problem_id:
            result = await db.execute(select(Problem).where(Problem.id == problem_id))
            problem = result.scalar_one_or_none()
            if problem is None:
                raise NotFoundException(f"Problem {problem_id} not found")
            if not title:
                title = problem.title
            if not difficulty:
                difficulty = problem.difficulty

        if not title:
            title = f"Item {plan.item_count + idx + 1}"

        item = StudyPlanItem(
            plan_id=plan.id,
            title=title,
            section=item_data.get("section", "General"),
            problem_id=problem_id,
            difficulty=difficulty,
            estimated_minutes=item_data.get("estimated_minutes"),
            day_number=1,
            order=current_max_order + idx + 1,
        )
        db.add(item)

    plan.item_count += len(items)
    await db.flush()
    # Refresh to get newly added items
    await db.refresh(plan)
    return plan


async def remove_item(
    db: AsyncSession,
    plan_id: uuid.UUID,
    item_id: uuid.UUID,
    user_id: uuid.UUID,
) -> StudyPlan:
    """Remove a single item from a plan."""
    plan = await _get_owned_plan(db, plan_id, user_id)

    result = await db.execute(
        select(StudyPlanItem).where(
            and_(StudyPlanItem.id == item_id, StudyPlanItem.plan_id == plan_id)
        )
    )
    item = result.scalar_one_or_none()
    if item is None:
        raise NotFoundException("Study plan item not found")

    if item.is_completed:
        plan.completed_count = max(0, plan.completed_count - 1)
    plan.item_count = max(0, plan.item_count - 1)

    await db.delete(item)
    await db.flush()
    await db.refresh(plan)
    return plan


async def reorder_items(
    db: AsyncSession,
    plan_id: uuid.UUID,
    user_id: uuid.UUID,
    item_ids: list[uuid.UUID],
) -> StudyPlan:
    """Bulk reorder items by setting order from the provided list."""
    plan = await _get_owned_plan(db, plan_id, user_id)

    items_by_id = {item.id: item for item in plan.items}
    for new_order, item_id in enumerate(item_ids):
        if item_id in items_by_id:
            items_by_id[item_id].order = new_order

    await db.flush()
    await db.refresh(plan)
    return plan


# ---------------------------------------------------------------------------
# AI generation
# ---------------------------------------------------------------------------

async def generate_ai_plan(
    db: AsyncSession,
    user_id: uuid.UUID,
    *,
    target_role: str,
    target_company: Optional[str] = None,
    duration_weeks: int = 4,
    topics: Optional[list[str]] = None,
) -> StudyPlan:
    """Generate a study plan via AI."""

    from app.services.claude_service import get_claude
    claude = get_claude()
    generated = await claude.generate_study_plan({
        "target_role": target_role,
        "target_company": target_company,
        "duration_weeks": duration_weeks,
        "topics": topics,
    })

    plan = StudyPlan(
        user_id=user_id,
        title=f"AI Plan: {target_role}",
        description=f"AI-generated study plan for {target_role}"
        + (f" at {target_company}" if target_company else ""),
        target_role=target_role,
        target_company=target_company,
        duration_weeks=duration_weeks,
        is_ai_generated=True,
    )
    db.add(plan)
    await db.flush()

    for idx, item_data in enumerate(generated):
        item = StudyPlanItem(
            plan_id=plan.id,
            title=item_data.get("title", f"Item {idx + 1}"),
            description=item_data.get("description"),
            section=item_data.get("section", "General"),
            content_type=item_data.get("content_type"),
            day_number=item_data.get("day_number", 1),
            order=idx,
        )
        db.add(item)
    plan.item_count = len(generated)
    await db.flush()

    return plan


# ---------------------------------------------------------------------------
# Toggle completion
# ---------------------------------------------------------------------------

async def toggle_item_complete(
    db: AsyncSession,
    plan_id: uuid.UUID,
    item_id: uuid.UUID,
    user_id: uuid.UUID,
) -> StudyPlanItem:
    """Toggle the completion status of a study-plan item."""

    plan = await _get_owned_plan(db, plan_id, user_id)

    result = await db.execute(
        select(StudyPlanItem).where(
            and_(StudyPlanItem.id == item_id, StudyPlanItem.plan_id == plan_id)
        )
    )
    item = result.scalar_one_or_none()
    if item is None:
        raise NotFoundException("Study plan item not found")

    item.is_completed = not item.is_completed

    if item.is_completed:
        plan.completed_count += 1
    else:
        plan.completed_count = max(0, plan.completed_count - 1)

    await db.flush()
    return item

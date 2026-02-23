from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user, get_current_user_optional
from app.exceptions import NotFoundException
from app.models.problem import Problem, Submission
from app.models.company import Company, CompanyProblem
from app.models.tag import Tag, ContentTag
from app.models.user import User
from app.schemas.base import APIResponse
from app.schemas.problem import ProblemCreate, RunCodeRequest, SubmissionCreate
from app.services import problem_service
from app.utils.pagination import PaginatedResult, PaginationParams, paginate

router = APIRouter()


@router.get("/", response_model=APIResponse)
async def list_problems(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    difficulty: str | None = Query(None),
    tag: str | None = Query(None),
    search: str | None = Query(None),
    sort_by: str | None = Query(None),
    current_user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """List problems with pagination and optional difficulty filter."""
    result = await problem_service.get_problems(
        db, page=page, per_page=per_page, difficulty=difficulty, tag=tag,
        search=search, sort_by=sort_by,
    )

    # Batch query tags for all problems
    problem_ids = [p.id for p in result.items]
    tags_by_problem: dict = {}
    if problem_ids:
        tag_query = await db.execute(
            select(ContentTag.content_id, Tag.name, Tag.slug)
            .join(Tag, Tag.id == ContentTag.tag_id)
            .where(ContentTag.content_type == "problem", ContentTag.content_id.in_(problem_ids))
        )
        tag_rows = tag_query.all()
        for content_id, name, slug in tag_rows:
            tags_by_problem.setdefault(content_id, []).append(name)

    # Batch query companies for all problems
    companies_by_problem: dict = {}
    if problem_ids:
        company_query = await db.execute(
            select(CompanyProblem.problem_id, Company.name, Company.slug)
            .join(Company, Company.id == CompanyProblem.company_id)
            .where(CompanyProblem.problem_id.in_(problem_ids))
        )
        for pid, cname, cslug in company_query.all():
            companies_by_problem.setdefault(pid, []).append(cname)

    # Batch query user_solved status
    solved_problem_ids: set = set()
    if current_user is not None and problem_ids:
        solved_query = await db.execute(
            select(Submission.problem_id)
            .where(
                Submission.user_id == current_user.id,
                Submission.verdict == "accepted",
                Submission.problem_id.in_(problem_ids),
            )
            .distinct()
        )
        solved_problem_ids = {row[0] for row in solved_query.all()}

    items = [
        {
            "id": str(p.id),
            "title": p.title,
            "slug": p.slug,
            "difficulty": p.difficulty,
            "submission_count": p.submission_count,
            "accepted_count": p.accepted_count,
            "acceptance_rate": (p.accepted_count / p.submission_count * 100) if p.submission_count > 0 else 0,
            "tags": tags_by_problem.get(p.id, []),
            "companies": companies_by_problem.get(p.id, []),
            "user_solved": p.id in solved_problem_ids,
            "created_at": p.created_at.isoformat() if p.created_at else None,
        }
        for p in result.items
    ]
    return APIResponse(
        success=True,
        data={
            "items": items,
            "total": result.total,
            "page": result.page,
            "per_page": result.per_page,
            "total_pages": result.total_pages,
            "has_next": result.has_next,
            "has_prev": result.has_prev,
        },
        message="Problems retrieved",
    )


@router.post("/", response_model=APIResponse, status_code=201)
async def create_problem(
    data: ProblemCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create a new problem with test cases. Admin/moderator only."""
    result = await problem_service.create_problem(db, data, current_user.id)
    return APIResponse(success=True, data={
        "id": str(result.id),
        "title": result.title,
        "slug": result.slug,
        "difficulty": result.difficulty,
        "is_published": result.is_published,
        "created_at": result.created_at.isoformat() if result.created_at else None,
    }, message="Problem created")


@router.get("/daily-challenge", response_model=APIResponse)
async def daily_challenge(
    db: AsyncSession = Depends(get_db),
):
    """Get today's daily challenge problem."""
    import hashlib
    from datetime import date
    today = date.today()
    # Deterministic pick based on date
    result = await db.execute(
        select(Problem).where(Problem.is_published.is_(True)).order_by(Problem.created_at)
    )
    all_problems = result.scalars().all()
    if not all_problems:
        raise NotFoundException("No problems available")
    seed = int(hashlib.md5(today.isoformat().encode()).hexdigest(), 16)
    idx = seed % len(all_problems)
    p = all_problems[idx]
    return APIResponse(success=True, data={
        "id": str(p.id),
        "title": p.title,
        "slug": p.slug,
        "difficulty": p.difficulty,
        "date": today.isoformat(),
    }, message="Daily challenge retrieved")


@router.get("/{slug}", response_model=APIResponse)
async def get_problem(
    slug: str,
    current_user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
):
    """Get problem detail by slug."""
    p = await problem_service.get_problem_by_slug(db, slug)

    # Query tags for this problem
    tag_query = await db.execute(
        select(ContentTag.content_id, Tag.name, Tag.slug)
        .join(Tag, Tag.id == ContentTag.tag_id)
        .where(ContentTag.content_type == "problem", ContentTag.content_id == p.id)
    )
    tag_rows = tag_query.all()
    problem_tags = [name for _, name, _ in tag_rows]

    # Query companies for this problem
    company_query = await db.execute(
        select(Company.name, Company.slug)
        .join(CompanyProblem, Company.id == CompanyProblem.company_id)
        .where(CompanyProblem.problem_id == p.id)
    )
    problem_companies = [name for name, _ in company_query.all()]

    # Check user_solved status
    user_solved = False
    if current_user is not None:
        solved_query = await db.execute(
            select(Submission.id)
            .where(
                Submission.user_id == current_user.id,
                Submission.verdict == "accepted",
                Submission.problem_id == p.id,
            )
            .limit(1)
        )
        user_solved = solved_query.scalar_one_or_none() is not None

    data = {
        "id": str(p.id),
        "title": p.title,
        "slug": p.slug,
        "description": p.description,
        "difficulty": p.difficulty,
        "constraints": p.constraints,
        "input_format": p.input_format,
        "output_format": p.output_format,
        "sample_input": p.sample_input,
        "sample_output": p.sample_output,
        "hints": p.hints,
        "editorial": p.editorial,
        "starter_code": p.starter_code,
        "time_limit_ms": p.time_limit_ms,
        "memory_limit_mb": p.memory_limit_mb,
        "submission_count": p.submission_count,
        "accepted_count": p.accepted_count,
        "acceptance_rate": (p.accepted_count / p.submission_count * 100) if p.submission_count > 0 else 0,
        "tags": problem_tags,
        "author": None,
        "companies": problem_companies,
        "user_solved": user_solved,
        "sample_test_cases": [
            {
                "id": str(tc.id),
                "input": tc.input,
                "expected_output": tc.expected_output,
                "is_sample": tc.is_sample,
            }
            for tc in (p.test_cases or []) if tc.is_sample
        ],
        "created_at": p.created_at.isoformat() if p.created_at else None,
        "updated_at": p.updated_at.isoformat() if p.updated_at else None,
    }
    return APIResponse(success=True, data=data, message="Problem retrieved")


@router.post("/{slug}/run", response_model=APIResponse)
async def run_code(
    slug: str,
    data: RunCodeRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Run code against sample test cases without persisting the result."""
    result = await problem_service.run_code_against_samples(db, slug, data.language, data.code)
    return APIResponse(success=True, data=result, message="Code executed")


@router.post("/{slug}/submit", response_model=APIResponse, status_code=201)
async def submit_solution(
    slug: str,
    data: SubmissionCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Submit a solution. Rate limited. Creates a submission record."""
    sub = await problem_service.submit_solution(db, current_user.id, slug, data.language, data.code)
    return APIResponse(success=True, data={
        "id": str(sub.id),
        "problem_id": str(sub.problem_id),
        "language": sub.language,
        "code": sub.code,
        "verdict": sub.verdict,
        "runtime_ms": sub.runtime_ms,
        "memory_kb": sub.memory_kb,
        "test_cases_passed": sub.test_cases_passed,
        "total_test_cases": sub.total_test_cases,
        "error_message": sub.error_output,
        "created_at": sub.created_at.isoformat() if sub.created_at else None,
    }, message="Solution submitted")


@router.get("/{slug}/submissions", response_model=APIResponse)
async def list_submissions(
    slug: str,
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List submissions for a problem by the authenticated user."""
    p = await problem_service.get_problem_by_slug(db, slug)
    stmt = (
        select(Submission)
        .where(Submission.problem_id == p.id, Submission.user_id == current_user.id)
        .order_by(Submission.created_at.desc())
    )
    result = await paginate(stmt, db, PaginationParams(page=page, per_page=per_page))
    items = [
        {
            "id": str(s.id),
            "language": s.language,
            "verdict": s.verdict,
            "runtime_ms": s.runtime_ms,
            "memory_kb": s.memory_kb,
            "test_cases_passed": s.test_cases_passed,
            "total_test_cases": s.total_test_cases,
            "created_at": s.created_at.isoformat() if s.created_at else None,
        }
        for s in result.items
    ]
    return APIResponse(
        success=True,
        data={
            "items": items,
            "total": result.total,
            "page": result.page,
            "per_page": result.per_page,
            "total_pages": result.total_pages,
            "has_next": result.has_next,
            "has_prev": result.has_prev,
        },
        message="Submissions retrieved",
    )




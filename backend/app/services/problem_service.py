"""Problem service — coding problems, test cases, code execution, submissions."""

from __future__ import annotations

import uuid
import time
from typing import Optional

from sqlalchemy import select, and_, case, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import get_settings
from app.constants import Verdict
from app.exceptions import (
    BadRequestException,
    NotFoundException,
    RateLimitException,
)
from app.models.problem import Problem, Submission, TestCase
from app.models.user import User
from app.schemas.problem import ProblemCreate
from app.services.piston_service import get_piston
from app.services.redis_service import get_redis
from app.utils.pagination import PaginatedResult, PaginationParams, paginate
from app.utils.slugify import generate_slug

settings = get_settings()

# Redis keys
_RATE_KEY = "ratelimit:submit:{user_id}"


# ---------------------------------------------------------------------------
# CRUD
# ---------------------------------------------------------------------------


async def create_problem(
    db: AsyncSession,
    schema: ProblemCreate,
    author_id: uuid.UUID,
) -> Problem:
    """Create a problem with its test cases."""

    problem = Problem(
        title=schema.title,
        slug=generate_slug(schema.title),
        description=schema.description,
        difficulty=schema.difficulty,
        constraints=schema.constraints,
        input_format=schema.input_format,
        output_format=schema.output_format,
        sample_input=schema.sample_input,
        sample_output=schema.sample_output,
        hints=schema.hints,
        editorial=schema.editorial,
        starter_code=schema.starter_code,
        time_limit_ms=schema.time_limit_ms or 2000,
        memory_limit_mb=schema.memory_limit_mb or 256,
        author_id=author_id,
    )
    db.add(problem)
    await db.flush()

    for idx, tc in enumerate(schema.test_cases):
        test_case = TestCase(
            problem_id=problem.id,
            input=tc.input,
            expected_output=tc.expected_output,
            is_sample=tc.is_sample or False,
            order=tc.order if tc.order is not None else idx,
        )
        db.add(test_case)

    await db.flush()
    return problem


async def get_problems(
    db: AsyncSession,
    *,
    page: int = 1,
    per_page: int = 20,
    difficulty: Optional[str] = None,
    tag: Optional[str] = None,
    search: Optional[str] = None,
    sort_by: Optional[str] = None,
) -> PaginatedResult:
    """Return a paginated, filterable list of published problems."""

    stmt = (
        select(Problem)
        .where(Problem.is_published.is_(True))
    )

    if difficulty:
        stmt = stmt.where(Problem.difficulty == difficulty)

    if search:
        stmt = stmt.where(Problem.title.ilike(f"%{search}%"))

    if tag:
        from app.models.tag import Tag, ContentTag
        stmt = stmt.join(
            ContentTag,
            and_(ContentTag.content_id == Problem.id, ContentTag.content_type == "problem")
        ).join(Tag, Tag.id == ContentTag.tag_id).where(Tag.slug == tag)

    if sort_by == "acceptance":
        stmt = stmt.order_by((Problem.accepted_count * 1.0 / func.nullif(Problem.submission_count, 0)).desc().nullslast())
    elif sort_by == "difficulty":
        stmt = stmt.order_by(case(
            (Problem.difficulty == "easy", 1),
            (Problem.difficulty == "medium", 2),
            (Problem.difficulty == "hard", 3),
        ))
    elif sort_by == "title":
        stmt = stmt.order_by(Problem.title.asc())
    else:
        # Default: show problems with most submissions first (well-described problems
        # that users actually attempt), then alphabetical for zero-submission ties.
        stmt = stmt.order_by(
            Problem.submission_count.desc(),
            Problem.title.asc(),
        )

    return await paginate(stmt, db, PaginationParams(page=page, per_page=per_page))


async def get_problem_by_slug(db: AsyncSession, slug: str) -> Problem:
    """Return a problem by slug or raise 404."""

    result = await db.execute(select(Problem).where(Problem.slug == slug))
    problem = result.scalar_one_or_none()
    if problem is None:
        raise NotFoundException("Problem not found")
    return problem


# ---------------------------------------------------------------------------
# Code execution (run — no submission record)
# ---------------------------------------------------------------------------


async def run_code(
    language: str,
    code: str,
    stdin: str = "",
) -> dict:
    """Execute code using the Piston engine without creating a submission.

    Returns ``{"stdout": ..., "stderr": ..., "exit_code": ...}``.
    """

    piston = get_piston()
    return await piston.execute(language, code, stdin)


async def run_code_against_samples(
    db: AsyncSession,
    problem_slug: str,
    language: str,
    code: str,
) -> dict:
    """Run code against sample test cases and return structured results.

    Returns a dict matching the frontend ``RunResult`` type.
    """

    problem = await get_problem_by_slug(db, problem_slug)

    result = await db.execute(
        select(TestCase)
        .where(TestCase.problem_id == problem.id, TestCase.is_sample.is_(True))
        .order_by(TestCase.order)
    )
    sample_cases = result.scalars().all()

    piston = get_piston()
    test_results = []
    stderr_output = ""

    for tc in sample_cases:
        exec_result = await piston.execute(language, code, tc.input)

        if exec_result["exit_code"] != 0:
            stderr_output = exec_result["stderr"] or exec_result["stdout"]
            test_results.append({
                "input": tc.input,
                "expected_output": tc.expected_output,
                "actual_output": exec_result["stdout"].rstrip(),
                "passed": False,
            })
            break

        actual = exec_result["stdout"].rstrip()
        expected = tc.expected_output.rstrip()
        test_results.append({
            "input": tc.input,
            "expected_output": expected,
            "actual_output": actual,
            "passed": actual == expected,
        })

    return {
        "stdout": "",
        "stderr": stderr_output,
        "exit_code": 0,
        "runtime_ms": 0,
        "memory_kb": 0,
        "test_results": test_results,
    }


# ---------------------------------------------------------------------------
# Submission (run against all test cases)
# ---------------------------------------------------------------------------


async def submit_solution(
    db: AsyncSession,
    user_id: uuid.UUID,
    problem_slug: str,
    language: str,
    code: str,
) -> Submission:
    """Run code against every test case, determine verdict, and persist.

    Rate limited to :pyattr:`Settings.SUBMISSION_RATE_LIMIT` per minute.
    """

    # ---- Rate-limit check ------------------------------------------------
    redis = get_redis()
    rate_key = _RATE_KEY.format(user_id=str(user_id))
    current = await redis.get(rate_key)

    if current is not None and int(current) >= settings.SUBMISSION_RATE_LIMIT:
        raise RateLimitException(
            f"Maximum {settings.SUBMISSION_RATE_LIMIT} submissions per minute"
        )

    count = await redis.incr(rate_key)
    if count == 1:
        await redis.expire(rate_key, 60)

    # ---- Fetch problem + test cases --------------------------------------
    problem = await get_problem_by_slug(db, problem_slug)

    result = await db.execute(
        select(TestCase)
        .where(TestCase.problem_id == problem.id)
        .order_by(TestCase.order)
    )
    test_cases = result.scalars().all()

    if not test_cases:
        raise BadRequestException("Problem has no test cases configured")

    piston = get_piston()

    # ---- Execute against each test case ----------------------------------
    passed = 0
    total = len(test_cases)
    verdict = Verdict.ACCEPTED
    error_output: Optional[str] = None
    total_runtime = 0

    for tc in test_cases:
        exec_result = await piston.execute(language, code, tc.input)

        if exec_result["exit_code"] != 0:
            # Runtime or compilation error
            if "compile" in exec_result.get("stderr", "").lower():
                verdict = Verdict.COMPILATION_ERROR
            else:
                verdict = Verdict.RUNTIME_ERROR
            error_output = exec_result["stderr"] or exec_result["stdout"]
            break

        actual = exec_result["stdout"].rstrip()
        expected = tc.expected_output.rstrip()

        if actual == expected:
            passed += 1
        else:
            verdict = Verdict.WRONG_ANSWER
            error_output = (
                f"Expected:\n{expected}\n\nGot:\n{actual}"
            )
            break

    if passed == total:
        verdict = Verdict.ACCEPTED

    # ---- Persist submission ----------------------------------------------
    submission = Submission(
        problem_id=problem.id,
        user_id=user_id,
        language=language,
        code=code,
        verdict=verdict,
        test_cases_passed=passed,
        total_test_cases=total,
        error_output=error_output,
    )
    db.add(submission)

    # Update denormalized counts on the problem
    problem.submission_count += 1
    if verdict == Verdict.ACCEPTED:
        problem.accepted_count += 1

        # Update user stats (only on first accepted for this problem)
        prev_accepted = await db.execute(
            select(Submission).where(
                and_(
                    Submission.problem_id == problem.id,
                    Submission.user_id == user_id,
                    Submission.verdict == Verdict.ACCEPTED,
                )
            )
        )
        if prev_accepted.scalar_one_or_none() is None:
            user_result = await db.execute(select(User).where(User.id == user_id))
            user = user_result.scalar_one_or_none()
            if user:
                user.problems_solved += 1

            # Create spaced repetition card on first accept
            from app.services import spaced_repetition_service
            await spaced_repetition_service.auto_create_card(db, user_id, problem.id)

    await db.flush()
    return submission

import uuid
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.tag import TagResponse
from app.schemas.user import UserResponse


class TestCaseCreate(BaseModel):
    """Request body for creating a test case attached to a problem."""

    input: str
    expected_output: str
    is_sample: Optional[bool] = False
    order: Optional[int] = None

    model_config = ConfigDict(from_attributes=True)


class ProblemCreate(BaseModel):
    """Request body for creating a coding problem."""

    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1)
    difficulty: str = Field(..., pattern=r"^(easy|medium|hard)$")
    constraints: Optional[str] = None
    input_format: Optional[str] = None
    output_format: Optional[str] = None
    sample_input: Optional[str] = None
    sample_output: Optional[str] = None
    hints: Optional[str] = None
    editorial: Optional[str] = None
    starter_code: Optional[str] = None
    time_limit_ms: Optional[int] = Field(None, ge=100, le=30000)
    memory_limit_mb: Optional[int] = Field(None, ge=16, le=1024)
    tag_ids: Optional[list[uuid.UUID]] = None
    test_cases: list[TestCaseCreate]

    model_config = ConfigDict(from_attributes=True)


class ProblemResponse(BaseModel):
    """Full problem representation including all fields."""

    id: uuid.UUID
    title: str
    slug: str
    description: str
    difficulty: str
    constraints: Optional[str] = None
    input_format: Optional[str] = None
    output_format: Optional[str] = None
    sample_input: Optional[str] = None
    sample_output: Optional[str] = None
    hints: Optional[str] = None
    editorial: Optional[str] = None
    starter_code: Optional[str] = None
    time_limit_ms: int
    memory_limit_mb: int
    submission_count: int
    accepted_count: int
    acceptance_rate: float
    tags: list[TagResponse] = []
    author: Optional[UserResponse] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ProblemListResponse(BaseModel):
    """Problem summary for list views."""

    id: uuid.UUID
    title: str
    slug: str
    difficulty: str
    submission_count: int
    accepted_count: int
    tags: list[TagResponse] = []

    model_config = ConfigDict(from_attributes=True)


class SubmissionCreate(BaseModel):
    """Request body for submitting code to a problem."""

    language: str = Field(..., min_length=1, max_length=30)
    code: str = Field(..., min_length=1)

    model_config = ConfigDict(from_attributes=True)


class SubmissionResponse(BaseModel):
    """Submission result representation."""

    id: uuid.UUID
    problem_id: uuid.UUID
    user_id: uuid.UUID
    language: str
    code: str
    verdict: str
    runtime_ms: Optional[int] = None
    memory_kb: Optional[int] = None
    test_cases_passed: int
    total_test_cases: int
    error_output: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class RunCodeRequest(BaseModel):
    """Request body for running code without submitting."""

    language: str = Field(..., min_length=1, max_length=30)
    code: str = Field(..., min_length=1)

    model_config = ConfigDict(from_attributes=True)


class RunResult(BaseModel):
    """Result of running code."""

    stdout: str
    stderr: str
    exit_code: int

    model_config = ConfigDict(from_attributes=True)

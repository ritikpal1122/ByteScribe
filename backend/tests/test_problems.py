import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_create_problem(client: AsyncClient, auth_headers):
    response = await client.post("/api/v1/problems", json={
        "title": "Two Sum",
        "description": "Given an array of integers, return indices of the two numbers that add up to a target.",
        "difficulty": "easy",
        "sample_input": "[2,7,11,15]\n9",
        "sample_output": "[0,1]",
        "test_cases": [
            {"input": "[2,7,11,15]\n9", "expected_output": "[0,1]", "is_sample": True, "order": 0},
            {"input": "[3,2,4]\n6", "expected_output": "[1,2]", "is_sample": False, "order": 1},
        ]
    }, headers=auth_headers)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["data"]["title"] == "Two Sum"
    assert data["data"]["difficulty"] == "easy"


@pytest.mark.asyncio
async def test_create_problem_unauthenticated(client: AsyncClient):
    response = await client.post("/api/v1/problems", json={
        "title": "No Auth Problem",
        "description": "Should fail.",
        "difficulty": "easy",
        "test_cases": [
            {"input": "1", "expected_output": "1", "is_sample": True, "order": 0},
        ]
    })
    assert response.status_code in [401, 403]


@pytest.mark.asyncio
async def test_create_problem_invalid_difficulty(client: AsyncClient, auth_headers):
    response = await client.post("/api/v1/problems", json={
        "title": "Bad Difficulty",
        "description": "Invalid.",
        "difficulty": "impossible",
        "test_cases": [
            {"input": "1", "expected_output": "1", "is_sample": True, "order": 0},
        ]
    }, headers=auth_headers)
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_create_problem_missing_test_cases(client: AsyncClient, auth_headers):
    response = await client.post("/api/v1/problems", json={
        "title": "No Tests",
        "description": "Missing test_cases field.",
        "difficulty": "easy",
    }, headers=auth_headers)
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_list_problems(client: AsyncClient, auth_headers):
    await client.post("/api/v1/problems", json={
        "title": "Add Two Numbers",
        "description": "Add two numbers represented as linked lists.",
        "difficulty": "medium",
        "test_cases": [
            {"input": "2->4->3\n5->6->4", "expected_output": "7->0->8", "is_sample": True, "order": 0},
        ]
    }, headers=auth_headers)

    response = await client.get("/api/v1/problems")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True


@pytest.mark.asyncio
async def test_list_problems_pagination(client: AsyncClient, auth_headers):
    for i in range(3):
        await client.post("/api/v1/problems", json={
            "title": f"Paginated Problem {i}",
            "description": f"Problem {i} for pagination test.",
            "difficulty": "easy",
            "test_cases": [
                {"input": str(i), "expected_output": str(i), "is_sample": True, "order": 0},
            ]
        }, headers=auth_headers)

    response = await client.get("/api/v1/problems", params={"page": 1, "per_page": 2})
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert len(data["data"]["items"]) <= 2


@pytest.mark.asyncio
async def test_list_problems_filter_difficulty(client: AsyncClient, auth_headers):
    await client.post("/api/v1/problems", json={
        "title": "Hard Problem",
        "description": "A hard one.",
        "difficulty": "hard",
        "test_cases": [
            {"input": "1", "expected_output": "1", "is_sample": True, "order": 0},
        ]
    }, headers=auth_headers)

    response = await client.get("/api/v1/problems", params={"difficulty": "hard"})
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    for item in data["data"]["items"]:
        assert item["difficulty"] == "hard"


@pytest.mark.asyncio
async def test_get_problem_by_slug(client: AsyncClient, auth_headers):
    create_resp = await client.post("/api/v1/problems", json={
        "title": "Reverse String",
        "description": "Reverse a string.",
        "difficulty": "easy",
        "test_cases": [
            {"input": "hello", "expected_output": "olleh", "is_sample": True, "order": 0},
        ]
    }, headers=auth_headers)
    slug = create_resp.json()["data"]["slug"]

    response = await client.get(f"/api/v1/problems/{slug}")
    assert response.status_code == 200
    assert response.json()["data"]["title"] == "Reverse String"


@pytest.mark.asyncio
async def test_get_problem_not_found(client: AsyncClient):
    response = await client.get("/api/v1/problems/nonexistent-problem-slug")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_get_daily_challenge(client: AsyncClient):
    response = await client.get("/api/v1/problems/daily-challenge")
    # May return 200 with a challenge or 404 if none seeded
    assert response.status_code in [200, 404]

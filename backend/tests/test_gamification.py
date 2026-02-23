import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_get_streak_unauthenticated(client: AsyncClient):
    response = await client.get("/api/v1/gamification/streak")
    assert response.status_code in [401, 403]


@pytest.mark.asyncio
async def test_get_streak(client: AsyncClient, auth_headers):
    response = await client.get("/api/v1/gamification/streak", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True


@pytest.mark.asyncio
async def test_get_badges(client: AsyncClient, auth_headers):
    response = await client.get("/api/v1/gamification/badges", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True


@pytest.mark.asyncio
async def test_get_leaderboard(client: AsyncClient):
    response = await client.get("/api/v1/gamification/leaderboard")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True


@pytest.mark.asyncio
async def test_get_stats(client: AsyncClient, auth_headers):
    response = await client.get("/api/v1/gamification/stats", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True


@pytest.mark.asyncio
async def test_get_stats_unauthenticated(client: AsyncClient):
    response = await client.get("/api/v1/gamification/stats")
    assert response.status_code in [401, 403]

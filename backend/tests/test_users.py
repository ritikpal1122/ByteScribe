import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_update_profile(client: AsyncClient, auth_headers):
    response = await client.put("/api/v1/users/me", json={
        "display_name": "New Name",
        "bio": "Updated bio."
    }, headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["display_name"] == "New Name"
    assert data["data"]["bio"] == "Updated bio."


@pytest.mark.asyncio
async def test_update_profile_unauthenticated(client: AsyncClient):
    response = await client.put("/api/v1/users/me", json={
        "display_name": "Fail"
    })
    assert response.status_code in [401, 403]


@pytest.mark.asyncio
async def test_get_public_profile(client: AsyncClient, auth_headers):
    response = await client.get("/api/v1/users/testuser")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["username"] == "testuser"


@pytest.mark.asyncio
async def test_get_public_profile_not_found(client: AsyncClient):
    response = await client.get("/api/v1/users/nonexistent_user_xyz")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_get_my_submissions(client: AsyncClient, auth_headers):
    response = await client.get("/api/v1/users/me/submissions", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "items" in data["data"]


@pytest.mark.asyncio
async def test_get_my_submissions_unauthenticated(client: AsyncClient):
    response = await client.get("/api/v1/users/me/submissions")
    assert response.status_code in [401, 403]

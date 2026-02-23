import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_list_dsa_sheets(client: AsyncClient):
    response = await client.get("/api/v1/dsa-sheets")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert isinstance(data["data"], list)


@pytest.mark.asyncio
async def test_get_dsa_sheet_not_found(client: AsyncClient):
    response = await client.get("/api/v1/dsa-sheets/nonexistent-sheet-slug")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_get_my_progress_unauthenticated(client: AsyncClient):
    response = await client.get("/api/v1/dsa-sheets/my-progress")
    assert response.status_code in [401, 403]


@pytest.mark.asyncio
async def test_get_my_progress(client: AsyncClient, auth_headers):
    response = await client.get("/api/v1/dsa-sheets/my-progress", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True


@pytest.mark.asyncio
async def test_toggle_progress_unauthenticated(client: AsyncClient):
    # Use a fake slug and problem_id — should fail auth before validation
    response = await client.put(
        "/api/v1/dsa-sheets/some-sheet/problems/00000000-0000-0000-0000-000000000001/progress"
    )
    assert response.status_code in [401, 403]


@pytest.mark.asyncio
async def test_toggle_progress_not_found(client: AsyncClient, auth_headers):
    response = await client.put(
        "/api/v1/dsa-sheets/nonexistent/problems/00000000-0000-0000-0000-000000000001/progress",
        headers=auth_headers
    )
    assert response.status_code == 404

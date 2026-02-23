import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_create_tag(client: AsyncClient, auth_headers):
    response = await client.post("/api/v1/tags", json={
        "name": "python",
        "description": "Python programming language",
        "color": "#3776AB"
    }, headers=auth_headers)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["data"]["name"] == "python"


@pytest.mark.asyncio
async def test_create_tag_unauthenticated(client: AsyncClient):
    response = await client.post("/api/v1/tags", json={
        "name": "noauth",
    })
    assert response.status_code in [401, 403]


@pytest.mark.asyncio
async def test_create_tag_invalid_color(client: AsyncClient, auth_headers):
    response = await client.post("/api/v1/tags", json={
        "name": "badcolor",
        "color": "not-a-hex"
    }, headers=auth_headers)
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_list_tags(client: AsyncClient, auth_headers):
    await client.post("/api/v1/tags", json={"name": "javascript"}, headers=auth_headers)
    await client.post("/api/v1/tags", json={"name": "rust"}, headers=auth_headers)

    response = await client.get("/api/v1/tags")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert len(data["data"]["items"]) >= 2


@pytest.mark.asyncio
async def test_get_tag_by_slug(client: AsyncClient, auth_headers):
    create_resp = await client.post("/api/v1/tags", json={
        "name": "golang",
    }, headers=auth_headers)
    slug = create_resp.json()["data"]["slug"]

    response = await client.get(f"/api/v1/tags/{slug}")
    assert response.status_code == 200
    assert response.json()["data"]["name"] == "golang"


@pytest.mark.asyncio
async def test_get_tag_not_found(client: AsyncClient):
    response = await client.get("/api/v1/tags/nonexistent-tag-slug")
    assert response.status_code == 404

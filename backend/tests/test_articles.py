import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_create_article(client: AsyncClient, auth_headers):
    response = await client.post("/api/v1/articles", json={
        "title": "My First Article",
        "content": "This is the content of my first article.",
        "summary": "A summary"
    }, headers=auth_headers)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["data"]["title"] == "My First Article"
    assert "slug" in data["data"]


@pytest.mark.asyncio
async def test_create_article_unauthenticated(client: AsyncClient):
    response = await client.post("/api/v1/articles", json={
        "title": "Should Fail",
        "content": "No auth",
    })
    assert response.status_code in [401, 403]


@pytest.mark.asyncio
async def test_create_article_missing_content(client: AsyncClient, auth_headers):
    response = await client.post("/api/v1/articles", json={
        "title": "No Content"
    }, headers=auth_headers)
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_list_articles(client: AsyncClient, auth_headers):
    await client.post("/api/v1/articles", json={
        "title": "Article One",
        "content": "Content one",
    }, headers=auth_headers)
    await client.post("/api/v1/articles", json={
        "title": "Article Two",
        "content": "Content two",
    }, headers=auth_headers)

    response = await client.get("/api/v1/articles")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert len(data["data"]["items"]) >= 2


@pytest.mark.asyncio
async def test_list_articles_pagination(client: AsyncClient, auth_headers):
    for i in range(3):
        await client.post("/api/v1/articles", json={
            "title": f"Paged Article {i}",
            "content": f"Content {i}",
        }, headers=auth_headers)

    response = await client.get("/api/v1/articles", params={"page": 1, "per_page": 2})
    assert response.status_code == 200
    data = response.json()
    assert len(data["data"]["items"]) <= 2


@pytest.mark.asyncio
async def test_get_article_by_slug(client: AsyncClient, auth_headers):
    create_resp = await client.post("/api/v1/articles", json={
        "title": "Slug Article",
        "content": "Get by slug test.",
    }, headers=auth_headers)
    slug = create_resp.json()["data"]["slug"]

    response = await client.get(f"/api/v1/articles/{slug}")
    assert response.status_code == 200
    assert response.json()["data"]["title"] == "Slug Article"


@pytest.mark.asyncio
async def test_update_article(client: AsyncClient, auth_headers):
    create_resp = await client.post("/api/v1/articles", json={
        "title": "Update Me",
        "content": "Original content.",
    }, headers=auth_headers)
    slug = create_resp.json()["data"]["slug"]

    response = await client.put(f"/api/v1/articles/{slug}", json={
        "title": "Updated Title",
        "content": "Updated content.",
    }, headers=auth_headers)
    assert response.status_code == 200
    assert response.json()["data"]["title"] == "Updated Title"


@pytest.mark.asyncio
async def test_delete_article(client: AsyncClient, auth_headers):
    create_resp = await client.post("/api/v1/articles", json={
        "title": "Delete Me",
        "content": "To be deleted.",
    }, headers=auth_headers)
    slug = create_resp.json()["data"]["slug"]

    response = await client.delete(f"/api/v1/articles/{slug}", headers=auth_headers)
    assert response.status_code == 200

    get_resp = await client.get(f"/api/v1/articles/{slug}")
    assert get_resp.status_code == 404

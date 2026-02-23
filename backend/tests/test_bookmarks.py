import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_list_bookmarks_unauthenticated(client: AsyncClient):
    response = await client.get("/api/v1/bookmarks")
    assert response.status_code in [401, 403]


@pytest.mark.asyncio
async def test_list_bookmarks_empty(client: AsyncClient, auth_headers):
    response = await client.get("/api/v1/bookmarks", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["items"] == []


@pytest.mark.asyncio
async def test_create_bookmark(client: AsyncClient, auth_headers):
    # First create an article to bookmark
    article_resp = await client.post("/api/v1/articles", json={
        "title": "Bookmarkable Article",
        "content": "Content for bookmarking."
    }, headers=auth_headers)
    article_id = article_resp.json()["data"]["id"]

    response = await client.post("/api/v1/bookmarks", json={
        "content_type": "article",
        "content_id": article_id
    }, headers=auth_headers)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True


@pytest.mark.asyncio
async def test_create_bookmark_unauthenticated(client: AsyncClient):
    response = await client.post("/api/v1/bookmarks", json={
        "content_type": "article",
        "content_id": "00000000-0000-0000-0000-000000000001"
    })
    assert response.status_code in [401, 403]


@pytest.mark.asyncio
async def test_delete_bookmark(client: AsyncClient, auth_headers):
    # Create an article, bookmark it, then delete the bookmark
    article_resp = await client.post("/api/v1/articles", json={
        "title": "Delete Bookmark Article",
        "content": "Content."
    }, headers=auth_headers)
    article_id = article_resp.json()["data"]["id"]

    create_resp = await client.post("/api/v1/bookmarks", json={
        "content_type": "article",
        "content_id": article_id
    }, headers=auth_headers)
    bookmark_id = create_resp.json()["data"]["id"]

    response = await client.delete(f"/api/v1/bookmarks/{bookmark_id}", headers=auth_headers)
    assert response.status_code == 200


@pytest.mark.asyncio
async def test_create_bookmark_invalid_content_type(client: AsyncClient, auth_headers):
    response = await client.post("/api/v1/bookmarks", json={
        "content_type": "invalid_type",
        "content_id": "00000000-0000-0000-0000-000000000001"
    }, headers=auth_headers)
    assert response.status_code == 422

import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_create_question(client: AsyncClient, auth_headers):
    response = await client.post("/api/v1/questions", json={
        "title": "How do I reverse a linked list?",
        "body": "I need to reverse a singly linked list in O(n) time."
    }, headers=auth_headers)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["data"]["title"] == "How do I reverse a linked list?"


@pytest.mark.asyncio
async def test_create_question_unauthenticated(client: AsyncClient):
    response = await client.post("/api/v1/questions", json={
        "title": "No Auth Question",
        "body": "Should fail."
    })
    assert response.status_code in [401, 403]


@pytest.mark.asyncio
async def test_create_question_missing_body(client: AsyncClient, auth_headers):
    response = await client.post("/api/v1/questions", json={
        "title": "No Body"
    }, headers=auth_headers)
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_list_questions(client: AsyncClient, auth_headers):
    await client.post("/api/v1/questions", json={
        "title": "Question One",
        "body": "Body one"
    }, headers=auth_headers)
    await client.post("/api/v1/questions", json={
        "title": "Question Two",
        "body": "Body two"
    }, headers=auth_headers)

    response = await client.get("/api/v1/questions")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert len(data["data"]["items"]) >= 2


@pytest.mark.asyncio
async def test_get_question_by_slug(client: AsyncClient, auth_headers):
    create_resp = await client.post("/api/v1/questions", json={
        "title": "Specific Question",
        "body": "Get this by slug."
    }, headers=auth_headers)
    slug = create_resp.json()["data"]["slug"]

    response = await client.get(f"/api/v1/questions/{slug}")
    assert response.status_code == 200
    assert response.json()["data"]["title"] == "Specific Question"


@pytest.mark.asyncio
async def test_get_question_not_found(client: AsyncClient):
    response = await client.get("/api/v1/questions/nonexistent-slug")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_update_question(client: AsyncClient, auth_headers):
    create_resp = await client.post("/api/v1/questions", json={
        "title": "Update This",
        "body": "Original body."
    }, headers=auth_headers)
    slug = create_resp.json()["data"]["slug"]

    response = await client.put(f"/api/v1/questions/{slug}", json={
        "title": "Updated Question",
        "body": "Updated body."
    }, headers=auth_headers)
    assert response.status_code == 200
    assert response.json()["data"]["title"] == "Updated Question"


@pytest.mark.asyncio
async def test_create_answer(client: AsyncClient, auth_headers):
    create_resp = await client.post("/api/v1/questions", json={
        "title": "Question For Answer",
        "body": "Answerable question."
    }, headers=auth_headers)
    slug = create_resp.json()["data"]["slug"]

    response = await client.post(f"/api/v1/questions/{slug}/answers", json={
        "body": "This is my answer."
    }, headers=auth_headers)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True


@pytest.mark.asyncio
async def test_create_answer_unauthenticated(client: AsyncClient, auth_headers):
    create_resp = await client.post("/api/v1/questions", json={
        "title": "Question For No Auth Answer",
        "body": "Try answering without auth."
    }, headers=auth_headers)
    slug = create_resp.json()["data"]["slug"]

    response = await client.post(f"/api/v1/questions/{slug}/answers", json={
        "body": "Should fail."
    })
    assert response.status_code in [401, 403]


@pytest.mark.asyncio
async def test_list_answers(client: AsyncClient, auth_headers):
    create_resp = await client.post("/api/v1/questions", json={
        "title": "Question With Answers",
        "body": "List answers test."
    }, headers=auth_headers)
    slug = create_resp.json()["data"]["slug"]

    await client.post(f"/api/v1/questions/{slug}/answers", json={
        "body": "Answer one."
    }, headers=auth_headers)
    await client.post(f"/api/v1/questions/{slug}/answers", json={
        "body": "Answer two."
    }, headers=auth_headers)

    response = await client.get(f"/api/v1/questions/{slug}/answers")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert len(data["data"]["items"]) >= 2

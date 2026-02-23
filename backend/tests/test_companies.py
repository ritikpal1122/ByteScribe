import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_create_company(client: AsyncClient, auth_headers):
    response = await client.post("/api/v1/companies", json={
        "name": "Google",
        "website": "https://google.com",
        "description": "A tech company."
    }, headers=auth_headers)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["data"]["name"] == "Google"


@pytest.mark.asyncio
async def test_create_company_unauthenticated(client: AsyncClient):
    response = await client.post("/api/v1/companies", json={
        "name": "NoAuth Inc",
    })
    assert response.status_code in [401, 403]


@pytest.mark.asyncio
async def test_list_companies(client: AsyncClient, auth_headers):
    await client.post("/api/v1/companies", json={"name": "Meta"}, headers=auth_headers)
    await client.post("/api/v1/companies", json={"name": "Apple"}, headers=auth_headers)

    response = await client.get("/api/v1/companies")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert len(data["data"]["items"]) >= 2


@pytest.mark.asyncio
async def test_get_company_by_slug(client: AsyncClient, auth_headers):
    create_resp = await client.post("/api/v1/companies", json={
        "name": "Amazon",
        "description": "Cloud and e-commerce."
    }, headers=auth_headers)
    slug = create_resp.json()["data"]["slug"]

    response = await client.get(f"/api/v1/companies/{slug}")
    assert response.status_code == 200
    assert response.json()["data"]["name"] == "Amazon"


@pytest.mark.asyncio
async def test_get_company_not_found(client: AsyncClient):
    response = await client.get("/api/v1/companies/nonexistent-company-slug")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_create_experience(client: AsyncClient, auth_headers):
    create_resp = await client.post("/api/v1/companies", json={
        "name": "Microsoft",
    }, headers=auth_headers)
    company_data = create_resp.json()["data"]
    slug = company_data["slug"]
    company_id = company_data["id"]

    response = await client.post(f"/api/v1/companies/{slug}/experiences", json={
        "company_id": company_id,
        "title": "SDE Interview Experience",
        "role": "Software Engineer",
        "difficulty": "medium",
        "result": "accepted",
        "body": "Had 3 rounds of interviews, all went well."
    }, headers=auth_headers)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True

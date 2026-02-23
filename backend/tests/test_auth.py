import pytest
from httpx import AsyncClient
from urllib.parse import urlparse, parse_qs


async def _verify_user(client: AsyncClient, register_response):
    """Extract verify token from register response and verify the email."""
    verify_link = register_response.json()["data"].get("verify_link")
    if verify_link:
        token = parse_qs(urlparse(verify_link).query)["token"][0]
        await client.post("/api/v1/auth/verify-email", json={"token": token})


@pytest.mark.asyncio
async def test_register(client: AsyncClient):
    response = await client.post("/api/v1/auth/register", json={
        "email": "test@example.com",
        "username": "testuser",
        "display_name": "Test User",
        "password": "TestPass123!"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["email"] == "test@example.com"
    assert data["data"]["username"] == "testuser"


@pytest.mark.asyncio
async def test_register_duplicate_email(client: AsyncClient):
    await client.post("/api/v1/auth/register", json={
        "email": "dupe@example.com",
        "username": "user1",
        "display_name": "User 1",
        "password": "TestPass123!"
    })
    response = await client.post("/api/v1/auth/register", json={
        "email": "dupe@example.com",
        "username": "user2",
        "display_name": "User 2",
        "password": "TestPass123!"
    })
    assert response.status_code == 409


@pytest.mark.asyncio
async def test_register_duplicate_username(client: AsyncClient):
    await client.post("/api/v1/auth/register", json={
        "email": "first@example.com",
        "username": "sameuser",
        "display_name": "First",
        "password": "TestPass123!"
    })
    response = await client.post("/api/v1/auth/register", json={
        "email": "second@example.com",
        "username": "sameuser",
        "display_name": "Second",
        "password": "TestPass123!"
    })
    assert response.status_code == 409


@pytest.mark.asyncio
async def test_register_invalid_email(client: AsyncClient):
    response = await client.post("/api/v1/auth/register", json={
        "email": "not-an-email",
        "username": "baduser",
        "display_name": "Bad",
        "password": "TestPass123!"
    })
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_register_short_password(client: AsyncClient):
    response = await client.post("/api/v1/auth/register", json={
        "email": "short@example.com",
        "username": "shortpw",
        "display_name": "Short",
        "password": "Ab1!"
    })
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_login(client: AsyncClient):
    reg_resp = await client.post("/api/v1/auth/register", json={
        "email": "login@example.com",
        "username": "loginuser",
        "display_name": "Login User",
        "password": "TestPass123!"
    })
    await _verify_user(client, reg_resp)

    response = await client.post("/api/v1/auth/login", json={
        "email": "login@example.com",
        "password": "TestPass123!"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "access_token" in data["data"]
    assert "refresh_token" in data["data"]


@pytest.mark.asyncio
async def test_login_wrong_password(client: AsyncClient):
    reg_resp = await client.post("/api/v1/auth/register", json={
        "email": "wrong@example.com",
        "username": "wronguser",
        "display_name": "Wrong User",
        "password": "TestPass123!"
    })
    await _verify_user(client, reg_resp)

    response = await client.post("/api/v1/auth/login", json={
        "email": "wrong@example.com",
        "password": "WrongPass!"
    })
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_login_nonexistent_user(client: AsyncClient):
    response = await client.post("/api/v1/auth/login", json={
        "email": "ghost@example.com",
        "password": "TestPass123!"
    })
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_login_unverified_email(client: AsyncClient):
    """Login should fail if email is not verified."""
    await client.post("/api/v1/auth/register", json={
        "email": "unverified@example.com",
        "username": "unverified",
        "display_name": "Unverified",
        "password": "TestPass123!"
    })
    response = await client.post("/api/v1/auth/login", json={
        "email": "unverified@example.com",
        "password": "TestPass123!"
    })
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_get_me(client: AsyncClient):
    reg_resp = await client.post("/api/v1/auth/register", json={
        "email": "me@example.com",
        "username": "meuser",
        "display_name": "Me User",
        "password": "TestPass123!"
    })
    await _verify_user(client, reg_resp)

    login_response = await client.post("/api/v1/auth/login", json={
        "email": "me@example.com",
        "password": "TestPass123!"
    })
    token = login_response.json()["data"]["access_token"]

    response = await client.get("/api/v1/auth/me", headers={
        "Authorization": f"Bearer {token}"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["data"]["email"] == "me@example.com"


@pytest.mark.asyncio
async def test_get_me_unauthorized(client: AsyncClient):
    response = await client.get("/api/v1/auth/me")
    assert response.status_code in [401, 403]


@pytest.mark.asyncio
async def test_refresh_token(client: AsyncClient):
    reg_resp = await client.post("/api/v1/auth/register", json={
        "email": "refresh@example.com",
        "username": "refreshuser",
        "display_name": "Refresh User",
        "password": "TestPass123!"
    })
    await _verify_user(client, reg_resp)

    login_resp = await client.post("/api/v1/auth/login", json={
        "email": "refresh@example.com",
        "password": "TestPass123!"
    })
    refresh_token = login_resp.json()["data"]["refresh_token"]

    response = await client.post("/api/v1/auth/refresh", json={
        "refresh_token": refresh_token
    })
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "access_token" in data["data"]

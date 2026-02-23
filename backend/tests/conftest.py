import asyncio
import pytest
import pytest_asyncio
from unittest.mock import patch
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.models.base import Base
from app.main import app
from app.database import get_db

TEST_DATABASE_URL = "postgresql+asyncpg://learntext:learntext_secret@localhost:5432/learntext_test"

engine = create_async_engine(TEST_DATABASE_URL, echo=False)
TestSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


# ---------------------------------------------------------------------------
# In-memory fake Redis so rate-limiter + auth refresh tokens work in tests
# ---------------------------------------------------------------------------


class FakeRedis:
    """Minimal async dict-backed Redis replacement for tests."""

    def __init__(self):
        self._store: dict[str, str] = {}

    async def get(self, key: str):
        return self._store.get(key)

    async def set(self, key: str, value, *, ex=None):
        self._store[key] = str(value)

    async def delete(self, key: str):
        self._store.pop(key, None)

    async def incr(self, key: str):
        val = int(self._store.get(key, 0)) + 1
        self._store[key] = str(val)
        return val

    async def expire(self, key: str, seconds: int):
        pass  # no-op for tests

    async def exists(self, key: str):
        return key in self._store

    async def close(self):
        self._store.clear()


class FakeRedisService:
    """Drop-in for app.services.redis_service.RedisService backed by FakeRedis."""

    def __init__(self):
        self._redis = FakeRedis()

    async def get(self, key):
        return await self._redis.get(key)

    async def set(self, key, value, *, ex=None):
        await self._redis.set(key, value, ex=ex)

    async def delete(self, key):
        await self._redis.delete(key)

    async def incr(self, key):
        return await self._redis.incr(key)

    async def expire(self, key, seconds):
        await self._redis.expire(key, seconds)

    async def exists(self, key):
        return await self._redis.exists(key)

    async def close(self):
        await self._redis.close()


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------

_fake_redis_service = FakeRedisService()


@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.new_event_loop()
    yield loop
    loop.close()


@pytest_asyncio.fixture(autouse=True)
async def setup_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    # Clear fake redis between tests
    _fake_redis_service._redis._store.clear()


@pytest_asyncio.fixture
async def db_session():
    async with TestSessionLocal() as session:
        yield session


@pytest_asyncio.fixture
async def client(db_session):
    async def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db
    transport = ASGITransport(app=app)
    with patch("app.services.redis_service.get_redis", return_value=_fake_redis_service), \
         patch("app.middleware.rate_limit.get_redis", return_value=_fake_redis_service):
        async with AsyncClient(transport=transport, base_url="http://test", follow_redirects=True) as ac:
            yield ac
    app.dependency_overrides.clear()


async def _extract_verify_token(verify_link: str) -> str:
    """Extract the JWT token from a verify link like http://…/verify-email?token=XXX."""
    from urllib.parse import urlparse, parse_qs
    parsed = urlparse(verify_link)
    return parse_qs(parsed.query)["token"][0]


async def _register_and_login(client: AsyncClient, email: str, username: str) -> dict:
    """Register a user, verify email, log in, and return auth headers."""
    reg_resp = await client.post("/api/v1/auth/register", json={
        "email": email,
        "username": username,
        "display_name": username.title(),
        "password": "TestPass123!"
    })
    # Verify email using the dev verify_link
    verify_link = reg_resp.json()["data"].get("verify_link")
    if verify_link:
        verify_token = await _extract_verify_token(verify_link)
        await client.post("/api/v1/auth/verify-email", json={"token": verify_token})

    resp = await client.post("/api/v1/auth/login", json={
        "email": email,
        "password": "TestPass123!"
    })
    token = resp.json()["data"]["access_token"]
    return {"Authorization": f"Bearer {token}"}


@pytest_asyncio.fixture
async def auth_headers(client):
    return await _register_and_login(client, "testuser@example.com", "testuser")


@pytest_asyncio.fixture
async def second_user_headers(client):
    return await _register_and_login(client, "seconduser@example.com", "seconduser")

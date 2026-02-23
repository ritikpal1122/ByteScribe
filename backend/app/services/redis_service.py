"""Redis service — wraps redis.asyncio for caching, rate limiting, and token storage."""

from __future__ import annotations

from typing import Optional

import redis.asyncio as aioredis

from app.config import get_settings

settings = get_settings()


class RedisService:
    """Thin async wrapper around a Redis connection."""

    def __init__(self, url: str = settings.REDIS_URL) -> None:
        self._redis = aioredis.from_url(
            url,
            encoding="utf-8",
            decode_responses=True,
        )

    # ------------------------------------------------------------------
    # Core operations
    # ------------------------------------------------------------------

    async def get(self, key: str) -> Optional[str]:
        """Get the value for *key*, or ``None`` if it does not exist."""
        return await self._redis.get(key)

    async def set(
        self,
        key: str,
        value: str,
        *,
        ex: Optional[int] = None,
    ) -> None:
        """Set *key* to *value*.  Optionally set expiry *ex* in seconds."""
        await self._redis.set(key, value, ex=ex)

    async def delete(self, key: str) -> None:
        """Delete *key*."""
        await self._redis.delete(key)

    async def incr(self, key: str) -> int:
        """Increment the integer value of *key* by 1.  Returns the new value."""
        return await self._redis.incr(key)

    async def expire(self, key: str, seconds: int) -> None:
        """Set a TTL of *seconds* on *key*."""
        await self._redis.expire(key, seconds)

    async def exists(self, key: str) -> bool:
        """Return ``True`` if *key* exists."""
        return bool(await self._redis.exists(key))

    async def close(self) -> None:
        """Gracefully close the underlying connection pool."""
        await self._redis.close()


# ------------------------------------------------------------------
# Module-level singleton
# ------------------------------------------------------------------

_redis_service: Optional[RedisService] = None


def get_redis() -> RedisService:
    """Return the module-level :class:`RedisService` singleton.

    Creates the instance on first call.
    """
    global _redis_service
    if _redis_service is None:
        _redis_service = RedisService()
    return _redis_service

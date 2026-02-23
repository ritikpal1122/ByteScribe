"""Simple rate-limiting middleware for sensitive endpoints."""
from __future__ import annotations
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse
from app.services.redis_service import get_redis


class RateLimitMiddleware(BaseHTTPMiddleware):
    RATE_LIMITS = {
        "/api/v1/auth/login": (10, 60),    # 10 per minute
        "/api/v1/auth/register": (5, 60),   # 5 per minute
        "/api/v1/auth/refresh": (20, 60),   # 20 per minute
    }

    async def dispatch(self, request: Request, call_next):
        path = request.url.path
        if path in self.RATE_LIMITS and request.method == "POST":
            max_requests, window = self.RATE_LIMITS[path]
            client_ip = request.client.host if request.client else "unknown"
            key = f"ratelimit:{path}:{client_ip}"
            try:
                redis = get_redis()
                current = await redis.get(key)
                if current is not None and int(current) >= max_requests:
                    return JSONResponse(
                        status_code=429,
                        content={"success": False, "data": None, "message": "Too many requests. Please try again later."},
                    )
                count = await redis.incr(key)
                if count == 1:
                    await redis.expire(key, window)
            except Exception:
                pass  # If Redis is down, don't block requests
        return await call_next(request)

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.exceptions import AppException, app_exception_handler, generic_exception_handler
from app.api.router import api_router

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    from app.services.redis_service import get_redis
    redis = get_redis()
    yield
    # Shutdown
    await redis.close()


app = FastAPI(
    title=settings.APP_NAME,
    description="All-in-One Knowledge Sharing & Interview Prep Platform",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
    lifespan=lifespan,
)

# CORS
allowed_origins = [settings.FRONTEND_URL, "http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rate limiting middleware
from app.middleware.rate_limit import RateLimitMiddleware
app.add_middleware(RateLimitMiddleware)

# Exception handlers
app.add_exception_handler(AppException, app_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)

# Routes
app.include_router(api_router, prefix="/api/v1")


@app.get("/api/health")
async def health_check():
    return {"success": True, "data": {"status": "healthy"}, "message": "OK"}


@app.post("/api/seed")
async def run_seed(secret: str = ""):
    """One-time seed endpoint. Remove after seeding."""
    if secret != settings.SECRET_KEY:
        return {"success": False, "message": "Invalid secret"}
    import subprocess
    result = subprocess.run(
        ["python", "scripts/seed_all.py"],
        capture_output=True, text=True, timeout=300,
    )
    return {
        "success": result.returncode == 0,
        "stdout": result.stdout[-2000:] if result.stdout else "",
        "stderr": result.stderr[-2000:] if result.stderr else "",
    }

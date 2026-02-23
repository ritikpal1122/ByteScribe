from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    APP_NAME: str = "LearnText"
    DEBUG: bool = False

    DATABASE_URL: str = "postgresql+asyncpg://learntext:learntext_secret@localhost:5432/learntext"
    REDIS_URL: str = "redis://localhost:6379/0"

    SECRET_KEY: str = "change-me-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    JWT_ALGORITHM: str = "HS256"

    PISTON_URL: str = "https://emkc.org/api/v2/piston"
    SUBMISSION_RATE_LIMIT: int = 10  # per minute

    GITHUB_CLIENT_ID: str = ""
    GITHUB_CLIENT_SECRET: str = ""
    GITHUB_REDIRECT_URI: str = "http://localhost:5173/auth/github/callback"

    ANTHROPIC_API_KEY: str = ""

    FRONTEND_URL: str = "http://localhost:5173"

    # SMTP / Email
    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM_EMAIL: str = "noreply@learntext.dev"
    SMTP_FROM_NAME: str = "LearnText"
    SMTP_USE_TLS: bool = True

    # Email verification
    EMAIL_VERIFY_TOKEN_EXPIRE_HOURS: int = 24
    PASSWORD_RESET_TOKEN_EXPIRE_HOURS: int = 1

    # XP rewards
    XP_SOLVE_PROBLEM: int = 50
    XP_WRITE_ARTICLE: int = 30
    XP_ANSWER_QUESTION: int = 20
    XP_ASK_QUESTION: int = 5
    XP_DAILY_LOGIN: int = 10

    model_config = {"env_file": ".env", "extra": "ignore"}


@lru_cache
def get_settings() -> Settings:
    return Settings()

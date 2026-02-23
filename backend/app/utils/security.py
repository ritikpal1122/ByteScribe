from datetime import datetime, timedelta, timezone

import jwt
from passlib.context import CryptContext

from app.config import get_settings

settings = get_settings()

# ---------------------------------------------------------------------------
# Password hashing (bcrypt via passlib)
# ---------------------------------------------------------------------------

_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(plain_password: str) -> str:
    """Return a bcrypt hash of *plain_password*."""
    return _pwd_context.hash(plain_password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Return ``True`` if *plain_password* matches *hashed_password*."""
    return _pwd_context.verify(plain_password, hashed_password)


# ---------------------------------------------------------------------------
# JWT helpers
# ---------------------------------------------------------------------------


def _create_token(data: dict, expires_delta: timedelta, token_type: str) -> str:
    """Internal helper that builds and encodes a JWT."""
    now = datetime.now(timezone.utc)
    payload = {
        **data,
        "type": token_type,
        "iat": now,
        "exp": now + expires_delta,
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.JWT_ALGORITHM)


def create_access_token(data: dict) -> str:
    """Create a short-lived access token (default 30 min)."""
    expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return _create_token(data, expires, token_type="access")


def create_refresh_token(data: dict) -> str:
    """Create a long-lived refresh token (default 7 days)."""
    expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    return _create_token(data, expires, token_type="refresh")


def decode_token(token: str) -> dict:
    """Decode and verify a JWT.

    Returns the full payload dict on success.
    Raises ``jwt.ExpiredSignatureError`` if the token has expired.
    Raises ``jwt.InvalidTokenError`` for any other validation failure.
    """
    return jwt.decode(
        token,
        settings.SECRET_KEY,
        algorithms=[settings.JWT_ALGORITHM],
    )


def create_email_verify_token(user_id: str) -> str:
    """Create a token for email verification."""
    expires = timedelta(hours=settings.EMAIL_VERIFY_TOKEN_EXPIRE_HOURS)
    return _create_token({"sub": user_id}, expires, token_type="email_verify")


def create_password_reset_token(user_id: str) -> str:
    """Create a token for password reset."""
    expires = timedelta(hours=settings.PASSWORD_RESET_TOKEN_EXPIRE_HOURS)
    return _create_token({"sub": user_id}, expires, token_type="password_reset")

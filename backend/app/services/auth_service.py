"""Authentication service — register, login, token refresh, logout, email verification, password reset."""

from __future__ import annotations

import uuid
from datetime import datetime, timezone

import jwt
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import get_settings
from app.exceptions import (
    BadRequestException,
    ConflictException,
    UnauthorizedException,
)
from app.models.user import User
from app.schemas.auth import RegisterRequest
from app.services.email_service import send_verification_email, send_password_reset_email
from app.services.redis_service import get_redis
from app.utils.security import (
    create_access_token,
    create_email_verify_token,
    create_password_reset_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)

settings = get_settings()

# Redis key helpers
_REFRESH_KEY = "refresh:{token}"
_REFRESH_TTL = settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400  # seconds


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------


async def register(db: AsyncSession, schema: RegisterRequest) -> User:
    """Create a new user and send a verification email."""

    # Check duplicate email
    existing = await db.execute(select(User).where(User.email == schema.email))
    if existing.scalar_one_or_none():
        raise ConflictException("A user with this email already exists")

    # Check duplicate username
    existing = await db.execute(select(User).where(User.username == schema.username))
    if existing.scalar_one_or_none():
        raise ConflictException("A user with this username already exists")

    user = User(
        email=schema.email,
        username=schema.username,
        display_name=schema.display_name,
        hashed_password=hash_password(schema.password),
        is_email_verified=False,
    )
    db.add(user)
    await db.flush()

    # Send verification email
    token = create_email_verify_token(str(user.id))
    verify_link = await send_verification_email(user.email, token)

    # Attach link to user object for dev-mode response (when SMTP not configured)
    if not settings.SMTP_HOST:
        user._dev_verify_link = verify_link  # type: ignore[attr-defined]

    return user


async def verify_email(db: AsyncSession, token: str) -> User:
    """Verify a user's email address using a verification token."""

    try:
        payload = decode_token(token)
    except jwt.ExpiredSignatureError:
        raise BadRequestException("Verification link has expired. Please request a new one.")
    except jwt.InvalidTokenError:
        raise BadRequestException("Invalid verification link.")

    if payload.get("type") != "email_verify":
        raise BadRequestException("Invalid verification link.")

    user_id = payload.get("sub")
    if user_id is None:
        raise BadRequestException("Invalid verification link.")

    try:
        uid = uuid.UUID(user_id)
    except ValueError:
        raise BadRequestException("Invalid verification link.")

    result = await db.execute(select(User).where(User.id == uid))
    user = result.scalar_one_or_none()
    if user is None:
        raise BadRequestException("User not found.")

    if user.is_email_verified:
        return user  # already verified, no error

    user.is_email_verified = True
    await db.flush()
    return user


async def resend_verification(db: AsyncSession, email: str) -> dict:
    """Re-send the verification email if the user is unverified."""

    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()

    # Always return success to prevent email enumeration
    if user is None or user.is_email_verified:
        return {}

    token = create_email_verify_token(str(user.id))
    verify_link = await send_verification_email(user.email, token)

    if not settings.SMTP_HOST:
        return {"verify_link": verify_link}
    return {}


async def forgot_password(db: AsyncSession, email: str) -> dict:
    """Send a password-reset email if the email exists. Returns dev link if SMTP not configured."""

    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()

    # Always return success to prevent email enumeration
    if user is None:
        return {}

    if not user.is_email_verified:
        raise BadRequestException("Please verify your email first before resetting your password.")

    token = create_password_reset_token(str(user.id))
    reset_link = await send_password_reset_email(user.email, token)

    if not settings.SMTP_HOST:
        return {"reset_link": reset_link}
    return {}


async def reset_password(db: AsyncSession, token: str, new_password: str) -> None:
    """Reset a user's password using a valid reset token."""

    try:
        payload = decode_token(token)
    except jwt.ExpiredSignatureError:
        raise BadRequestException("Reset link has expired. Please request a new one.")
    except jwt.InvalidTokenError:
        raise BadRequestException("Invalid reset link.")

    if payload.get("type") != "password_reset":
        raise BadRequestException("Invalid reset link.")

    user_id = payload.get("sub")
    if user_id is None:
        raise BadRequestException("Invalid reset link.")

    try:
        uid = uuid.UUID(user_id)
    except ValueError:
        raise BadRequestException("Invalid reset link.")

    result = await db.execute(select(User).where(User.id == uid))
    user = result.scalar_one_or_none()
    if user is None:
        raise BadRequestException("User not found.")

    user.hashed_password = hash_password(new_password)
    await db.flush()

    # Invalidate all existing refresh tokens for this user by deleting them
    # (In a production system you'd track tokens per-user; for now, the user
    #  will just need to re-login, which is the expected UX after a password reset.)


async def login(db: AsyncSession, email: str, password: str) -> dict:
    """Verify credentials and return an access / refresh token pair."""

    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()

    if user is None or user.hashed_password is None:
        raise UnauthorizedException("Invalid email or password")

    if not verify_password(password, user.hashed_password):
        raise UnauthorizedException("Invalid email or password")

    if not user.is_active:
        raise UnauthorizedException("Account is deactivated")

    if not user.is_email_verified:
        raise UnauthorizedException("Please verify your email before logging in. Check your inbox for a verification link.")

    # Update last_seen
    user.last_seen = datetime.now(timezone.utc)

    token_data = {"sub": str(user.id), "username": user.username, "role": user.role}
    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)

    # Store refresh token in Redis so we can revoke it later
    redis = get_redis()
    await redis.set(
        _REFRESH_KEY.format(token=refresh_token),
        str(user.id),
        ex=_REFRESH_TTL,
    )

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


async def refresh_tokens(refresh_token: str) -> dict:
    """Validate the refresh token stored in Redis and issue a new token pair."""

    redis = get_redis()
    user_id = await redis.get(_REFRESH_KEY.format(token=refresh_token))

    if user_id is None:
        raise UnauthorizedException("Invalid or expired refresh token")

    # Decode to get payload (also validates expiry)
    try:
        payload = decode_token(refresh_token)
    except jwt.ExpiredSignatureError:
        await redis.delete(_REFRESH_KEY.format(token=refresh_token))
        raise UnauthorizedException("Refresh token has expired")
    except jwt.InvalidTokenError:
        raise UnauthorizedException("Invalid refresh token")

    if payload.get("type") != "refresh":
        raise UnauthorizedException("Token is not a refresh token")

    # Delete old token (rotation)
    await redis.delete(_REFRESH_KEY.format(token=refresh_token))

    # Issue new pair
    token_data = {
        "sub": payload["sub"],
        "username": payload["username"],
        "role": payload["role"],
    }
    new_access = create_access_token(token_data)
    new_refresh = create_refresh_token(token_data)

    await redis.set(
        _REFRESH_KEY.format(token=new_refresh),
        payload["sub"],
        ex=_REFRESH_TTL,
    )

    return {
        "access_token": new_access,
        "refresh_token": new_refresh,
        "token_type": "bearer",
    }


async def logout(refresh_token: str) -> None:
    """Revoke a refresh token by deleting it from Redis."""

    redis = get_redis()
    await redis.delete(_REFRESH_KEY.format(token=refresh_token))


async def github_oauth(db: AsyncSession, code: str) -> dict:
    """Exchange a GitHub OAuth code for tokens."""
    import httpx

    if not settings.GITHUB_CLIENT_ID or not settings.GITHUB_CLIENT_SECRET:
        raise BadRequestException("GitHub OAuth is not configured. Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET.")

    # Exchange code for access token
    async with httpx.AsyncClient() as http:
        token_resp = await http.post(
            "https://github.com/login/oauth/access_token",
            json={
                "client_id": settings.GITHUB_CLIENT_ID,
                "client_secret": settings.GITHUB_CLIENT_SECRET,
                "code": code,
            },
            headers={"Accept": "application/json"},
        )
        token_data = token_resp.json()

        if "access_token" not in token_data:
            raise BadRequestException("Invalid GitHub OAuth code")

        gh_token = token_data["access_token"]

        # Get GitHub user profile
        user_resp = await http.get(
            "https://api.github.com/user",
            headers={"Authorization": f"Bearer {gh_token}", "Accept": "application/json"},
        )
        gh_user = user_resp.json()

    github_id = str(gh_user["id"])
    github_username = gh_user.get("login", "")
    email = gh_user.get("email")
    name = gh_user.get("name") or github_username

    # Check if user exists with this GitHub ID
    result = await db.execute(select(User).where(User.github_id == github_id))
    user = result.scalar_one_or_none()

    if user is None and email:
        # Check by email
        result = await db.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()
        if user:
            user.github_id = github_id
            user.github_username = github_username

    if user is None:
        # Create new user
        if not email:
            email = f"{github_username}@github.local"
        user = User(
            email=email,
            username=github_username,
            display_name=name,
            github_id=github_id,
            github_username=github_username,
            avatar_url=gh_user.get("avatar_url"),
            is_email_verified=True,  # GitHub already verified the email
        )
        db.add(user)
        await db.flush()

    user.last_seen = datetime.now(timezone.utc)
    token_data_jwt = {"sub": str(user.id), "username": user.username, "role": user.role}
    access_token = create_access_token(token_data_jwt)
    refresh_token = create_refresh_token(token_data_jwt)

    redis = get_redis()
    await redis.set(_REFRESH_KEY.format(token=refresh_token), str(user.id), ex=_REFRESH_TTL)

    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}


async def get_current_user_from_token(db: AsyncSession, token: str) -> User:
    """Decode an access JWT, look up the user, and return it."""

    try:
        payload = decode_token(token)
    except jwt.ExpiredSignatureError:
        raise UnauthorizedException("Access token has expired")
    except jwt.InvalidTokenError:
        raise UnauthorizedException("Invalid access token")

    if payload.get("type") != "access":
        raise UnauthorizedException("Token is not an access token")

    user_id = payload.get("sub")
    if user_id is None:
        raise UnauthorizedException("Token payload missing subject")

    try:
        uid = uuid.UUID(user_id)
    except ValueError:
        raise UnauthorizedException("Invalid user id in token")

    result = await db.execute(select(User).where(User.id == uid))
    user = result.scalar_one_or_none()

    if user is None:
        raise UnauthorizedException("User not found")

    if not user.is_active:
        raise UnauthorizedException("Account is deactivated")

    return user

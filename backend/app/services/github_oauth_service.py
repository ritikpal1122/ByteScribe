"""GitHub OAuth service — code exchange, profile fetch, user upsert."""

from __future__ import annotations

import uuid
from typing import Optional

import httpx
from sqlalchemy import select, or_
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import get_settings
from app.exceptions import BadRequestException, UnauthorizedException
from app.models.user import User

settings = get_settings()

_GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token"
_GITHUB_USER_URL = "https://api.github.com/user"
_GITHUB_EMAILS_URL = "https://api.github.com/user/emails"


# ---------------------------------------------------------------------------
# OAuth flow helpers
# ---------------------------------------------------------------------------


async def exchange_code(code: str) -> str:
    """Exchange a GitHub OAuth authorization *code* for an access token.

    Returns
    -------
    str
        The GitHub access token.
    """

    payload = {
        "client_id": settings.GITHUB_CLIENT_ID,
        "client_secret": settings.GITHUB_CLIENT_SECRET,
        "code": code,
        "redirect_uri": settings.GITHUB_REDIRECT_URI,
    }

    async with httpx.AsyncClient(timeout=15.0) as client:
        resp = await client.post(
            _GITHUB_TOKEN_URL,
            json=payload,
            headers={"Accept": "application/json"},
        )

    if resp.status_code != 200:
        raise BadRequestException("Failed to exchange GitHub code")

    data = resp.json()
    access_token = data.get("access_token")
    if not access_token:
        error = data.get("error_description", "Unknown error")
        raise BadRequestException(f"GitHub OAuth error: {error}")

    return access_token


async def get_github_user(access_token: str) -> dict:
    """Fetch the authenticated GitHub user's profile.

    Returns
    -------
    dict
        Keys: ``id``, ``login``, ``name``, ``email``, ``avatar_url``, ``bio``.
    """

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Accept": "application/json",
    }

    async with httpx.AsyncClient(timeout=15.0) as client:
        resp = await client.get(_GITHUB_USER_URL, headers=headers)

    if resp.status_code != 200:
        raise UnauthorizedException("Failed to fetch GitHub user profile")

    data = resp.json()

    email = data.get("email")

    # If no public email, try the /user/emails endpoint
    if not email:
        async with httpx.AsyncClient(timeout=15.0) as client:
            emails_resp = await client.get(_GITHUB_EMAILS_URL, headers=headers)
        if emails_resp.status_code == 200:
            emails = emails_resp.json()
            primary = next(
                (e for e in emails if e.get("primary") and e.get("verified")),
                None,
            )
            if primary:
                email = primary["email"]

    return {
        "id": str(data["id"]),
        "login": data.get("login", ""),
        "name": data.get("name") or data.get("login", ""),
        "email": email,
        "avatar_url": data.get("avatar_url"),
        "bio": data.get("bio"),
    }


async def find_or_create_user(
    db: AsyncSession,
    github_user: dict,
) -> User:
    """Find an existing user by ``github_id`` or create a new one.

    If a user with the same email already exists (from password-based
    registration), their account is linked to GitHub.
    """

    github_id = github_user["id"]
    email = github_user.get("email")
    login = github_user.get("login", "")

    # 1. Try to find by github_id
    result = await db.execute(
        select(User).where(User.github_id == github_id)
    )
    user = result.scalar_one_or_none()
    if user:
        # Update avatar in case it changed
        user.avatar_url = github_user.get("avatar_url") or user.avatar_url
        user.github_username = login
        await db.flush()
        return user

    # 2. Try to find by email (link accounts)
    if email:
        result = await db.execute(
            select(User).where(User.email == email)
        )
        user = result.scalar_one_or_none()
        if user:
            user.github_id = github_id
            user.github_username = login
            user.avatar_url = github_user.get("avatar_url") or user.avatar_url
            await db.flush()
            return user

    # 3. Create a new user
    #    Ensure unique username by appending a short random suffix
    base_username = login or f"user-{github_id}"
    username = base_username

    # Check if username is taken
    existing = await db.execute(select(User).where(User.username == username))
    if existing.scalar_one_or_none():
        username = f"{base_username}-{uuid.uuid4().hex[:6]}"

    user = User(
        email=email or f"{github_id}@github.placeholder",
        username=username,
        display_name=github_user.get("name") or login,
        github_id=github_id,
        github_username=login,
        avatar_url=github_user.get("avatar_url"),
        bio=github_user.get("bio"),
        # No hashed_password — OAuth-only account
    )
    db.add(user)
    await db.flush()
    return user

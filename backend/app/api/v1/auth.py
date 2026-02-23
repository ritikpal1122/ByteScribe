from urllib.parse import urlencode

from fastapi import APIRouter, Depends
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.auth import (
    ForgotPasswordRequest,
    GitHubCallbackRequest,
    LoginRequest,
    RefreshRequest,
    RegisterRequest,
    ResendVerificationRequest,
    ResetPasswordRequest,
    VerifyEmailRequest,
)
from app.schemas.base import APIResponse
from app.services import auth_service

router = APIRouter()


@router.post("/register", response_model=APIResponse)
async def register(
    data: RegisterRequest,
    db: AsyncSession = Depends(get_db),
):
    """Register a new user account. A verification email will be sent."""
    from app.config import get_settings
    user = await auth_service.register(db, data)
    response_data: dict = {"id": str(user.id), "username": user.username, "email": user.email}

    # In dev mode (no SMTP), include the verify link so the user can click it directly
    dev_link = getattr(user, "_dev_verify_link", None)
    if dev_link:
        response_data["verify_link"] = dev_link

    return APIResponse(
        success=True,
        data=response_data,
        message="Registration successful. Please check your email to verify your account.",
    )


@router.post("/verify-email", response_model=APIResponse)
async def verify_email(
    data: VerifyEmailRequest,
    db: AsyncSession = Depends(get_db),
):
    """Verify a user's email address using the token from the verification link."""
    user = await auth_service.verify_email(db, data.token)
    return APIResponse(
        success=True,
        data={"id": str(user.id), "username": user.username},
        message="Email verified successfully. You can now log in.",
    )


@router.post("/resend-verification", response_model=APIResponse)
async def resend_verification(
    data: ResendVerificationRequest,
    db: AsyncSession = Depends(get_db),
):
    """Re-send the verification email."""
    result = await auth_service.resend_verification(db, data.email)
    return APIResponse(
        success=True,
        data=result or None,
        message="If an account with this email exists and is unverified, a new verification email has been sent.",
    )


@router.post("/forgot-password", response_model=APIResponse)
async def forgot_password(
    data: ForgotPasswordRequest,
    db: AsyncSession = Depends(get_db),
):
    """Request a password reset email."""
    result = await auth_service.forgot_password(db, data.email)
    return APIResponse(
        success=True,
        data=result or None,
        message="If an account with this email exists, a password reset link has been sent.",
    )


@router.post("/reset-password", response_model=APIResponse)
async def reset_password(
    data: ResetPasswordRequest,
    db: AsyncSession = Depends(get_db),
):
    """Reset a user's password using the token from the reset link."""
    await auth_service.reset_password(db, data.token, data.new_password)
    return APIResponse(
        success=True,
        data=None,
        message="Password reset successfully. You can now log in with your new password.",
    )


@router.post("/login", response_model=APIResponse)
async def login(
    data: LoginRequest,
    db: AsyncSession = Depends(get_db),
):
    """Authenticate and return access + refresh tokens."""
    result = await auth_service.login(db, data.email, data.password)
    return APIResponse(success=True, data=result, message="Login successful")


@router.post("/refresh", response_model=APIResponse)
async def refresh(
    data: RefreshRequest,
):
    """Refresh access token using a valid refresh token."""
    result = await auth_service.refresh_tokens(data.refresh_token)
    return APIResponse(success=True, data=result, message="Tokens refreshed")


@router.post("/logout", response_model=APIResponse)
async def logout(
    data: RefreshRequest,
    current_user: User = Depends(get_current_user),
):
    """Logout and invalidate the current session."""
    await auth_service.logout(data.refresh_token)
    return APIResponse(success=True, data=None, message="Logged out successfully")


@router.get("/me", response_model=APIResponse)
async def me(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Return the currently authenticated user's profile."""
    from app.services.gamification_service import get_streak, get_badges
    streak = await get_streak(db, current_user.id)
    user_badges = await get_badges(db, current_user.id)

    return APIResponse(success=True, data={
        "id": str(current_user.id),
        "username": current_user.username,
        "email": current_user.email,
        "display_name": current_user.display_name,
        "avatar_url": current_user.avatar_url,
        "bio": current_user.bio,
        "role": current_user.role,
        "xp": current_user.xp,
        "reputation": current_user.reputation,
        "problems_solved": current_user.problems_solved,
        "articles_written": current_user.articles_written,
        "answers_given": current_user.answers_given,
        "github_username": current_user.github_username,
        "is_active": current_user.is_active,
        "is_email_verified": current_user.is_email_verified,
        "streak": {
            "current_streak": streak.current_streak if streak else 0,
            "longest_streak": streak.longest_streak if streak else 0,
            "last_activity_date": streak.last_activity_date.isoformat() if streak and streak.last_activity_date else None,
        },
        "badge_count": len(user_badges),
        "created_at": current_user.created_at.isoformat() if current_user.created_at else None,
    }, message="Current user retrieved")


@router.get("/github")
async def github_oauth_redirect():
    """Redirect the user to GitHub's OAuth authorization page."""
    from app.config import get_settings
    settings = get_settings()

    if not settings.GITHUB_CLIENT_ID:
        from app.exceptions import BadRequestException
        raise BadRequestException("GitHub OAuth is not configured.")

    params = urlencode({
        "client_id": settings.GITHUB_CLIENT_ID,
        "redirect_uri": settings.GITHUB_REDIRECT_URI,
        "scope": "user:email",
    })
    return RedirectResponse(
        url=f"https://github.com/login/oauth/authorize?{params}",
        status_code=302,
    )


@router.post("/github", response_model=APIResponse)
async def github_oauth(
    data: GitHubCallbackRequest,
    db: AsyncSession = Depends(get_db),
):
    """Handle GitHub OAuth callback and return tokens."""
    result = await auth_service.github_oauth(db, data.code)
    return APIResponse(success=True, data=result, message="GitHub login successful")


@router.post("/github/callback", response_model=APIResponse)
async def github_oauth_callback(
    data: GitHubCallbackRequest,
    db: AsyncSession = Depends(get_db),
):
    """Handle GitHub OAuth callback (alias for POST /github)."""
    result = await auth_service.github_oauth(db, data.code)
    return APIResponse(success=True, data=result, message="GitHub login successful")

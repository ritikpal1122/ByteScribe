from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class RegisterRequest(BaseModel):
    """Request body for user registration."""

    email: EmailStr
    username: str = Field(..., min_length=3, max_length=30)
    display_name: str = Field(..., min_length=1, max_length=100)
    password: str = Field(..., min_length=8, max_length=128)

    model_config = ConfigDict(from_attributes=True)


class LoginRequest(BaseModel):
    """Request body for email/password login."""

    email: EmailStr
    password: str

    model_config = ConfigDict(from_attributes=True)


class TokenResponse(BaseModel):
    """JWT token pair returned after successful authentication."""

    access_token: str
    refresh_token: str
    token_type: str = "bearer"

    model_config = ConfigDict(from_attributes=True)


class RefreshRequest(BaseModel):
    """Request body to refresh an access token."""

    refresh_token: str

    model_config = ConfigDict(from_attributes=True)


class GitHubCallbackRequest(BaseModel):
    """Request body for GitHub OAuth callback."""

    code: str

    model_config = ConfigDict(from_attributes=True)


class VerifyEmailRequest(BaseModel):
    """Request body for email verification."""

    token: str

    model_config = ConfigDict(from_attributes=True)


class ForgotPasswordRequest(BaseModel):
    """Request body for forgot-password (request reset link)."""

    email: EmailStr

    model_config = ConfigDict(from_attributes=True)


class ResetPasswordRequest(BaseModel):
    """Request body for resetting password with a token."""

    token: str
    new_password: str = Field(..., min_length=8, max_length=128)

    model_config = ConfigDict(from_attributes=True)


class ResendVerificationRequest(BaseModel):
    """Request body for re-sending verification email."""

    email: EmailStr

    model_config = ConfigDict(from_attributes=True)

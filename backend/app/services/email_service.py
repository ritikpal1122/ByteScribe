"""Email service — sends verification and password-reset emails via SMTP."""

from __future__ import annotations

import logging
from email.message import EmailMessage

import aiosmtplib

from app.config import get_settings

settings = get_settings()
logger = logging.getLogger(__name__)


async def _send_email(to: str, subject: str, html_body: str) -> None:
    """Send an email via SMTP.  Silently logs on failure so it never crashes the request."""

    if not settings.SMTP_HOST:
        logger.warning("SMTP not configured — skipping email to %s: %s", to, subject)
        return

    msg = EmailMessage()
    msg["From"] = f"{settings.SMTP_FROM_NAME} <{settings.SMTP_FROM_EMAIL}>"
    msg["To"] = to
    msg["Subject"] = subject
    msg.set_content(subject)  # plain-text fallback
    msg.add_alternative(html_body, subtype="html")

    try:
        await aiosmtplib.send(
            msg,
            hostname=settings.SMTP_HOST,
            port=settings.SMTP_PORT,
            username=settings.SMTP_USER or None,
            password=settings.SMTP_PASSWORD or None,
            start_tls=settings.SMTP_USE_TLS,
        )
        logger.info("Email sent to %s: %s", to, subject)
    except Exception:
        logger.exception("Failed to send email to %s", to)


async def send_verification_email(to: str, token: str) -> str:
    """Send an email-verification link. Returns the link."""

    link = f"{settings.FRONTEND_URL}/verify-email?token={token}"

    if not settings.SMTP_HOST:
        logger.warning(
            "\n╔══════════════════════════════════════════════════╗\n"
            "║  EMAIL VERIFICATION LINK (SMTP not configured)  ║\n"
            "╚══════════════════════════════════════════════════╝\n"
            "  To: %s\n  Link: %s\n", to, link,
        )
        return link

    html = f"""
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #111827;">Verify your email</h2>
        <p style="color: #4b5563; line-height: 1.6;">
            Thanks for signing up for <strong>LearnText</strong>!
            Click the button below to verify your email address.
        </p>
        <a href="{link}"
           style="display: inline-block; margin: 20px 0; padding: 12px 28px;
                  background: #2563eb; color: #fff; text-decoration: none;
                  border-radius: 8px; font-weight: 600; font-size: 14px;">
            Verify Email
        </a>
        <p style="color: #9ca3af; font-size: 13px;">
            If the button doesn't work, copy and paste this link:<br/>
            <a href="{link}" style="color: #2563eb;">{link}</a>
        </p>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
            This link expires in {settings.EMAIL_VERIFY_TOKEN_EXPIRE_HOURS} hours.
            If you didn't create an account, you can ignore this email.
        </p>
    </div>
    """
    await _send_email(to, "Verify your email — LearnText", html)
    return link


async def send_password_reset_email(to: str, token: str) -> str:
    """Send a password-reset link. Returns the link."""

    link = f"{settings.FRONTEND_URL}/reset-password?token={token}"

    if not settings.SMTP_HOST:
        logger.warning(
            "\n╔══════════════════════════════════════════════════╗\n"
            "║  PASSWORD RESET LINK (SMTP not configured)      ║\n"
            "╚══════════════════════════════════════════════════╝\n"
            "  To: %s\n  Link: %s\n", to, link,
        )
        return link

    html = f"""
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #111827;">Reset your password</h2>
        <p style="color: #4b5563; line-height: 1.6;">
            We received a request to reset your <strong>LearnText</strong> password.
            Click the button below to choose a new one.
        </p>
        <a href="{link}"
           style="display: inline-block; margin: 20px 0; padding: 12px 28px;
                  background: #2563eb; color: #fff; text-decoration: none;
                  border-radius: 8px; font-weight: 600; font-size: 14px;">
            Reset Password
        </a>
        <p style="color: #9ca3af; font-size: 13px;">
            If the button doesn't work, copy and paste this link:<br/>
            <a href="{link}" style="color: #2563eb;">{link}</a>
        </p>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 24px;">
            This link expires in {settings.PASSWORD_RESET_TOKEN_EXPIRE_HOURS} hour(s).
            If you didn't request a password reset, you can ignore this email.
        </p>
    </div>
    """
    await _send_email(to, "Reset your password — LearnText", html)
    return link

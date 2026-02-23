from sqlalchemy import select, distinct, or_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.language_doc import LanguageDoc


async def get_docs_by_language(
    db: AsyncSession,
    language: str,
    category: str | None = None,
    search: str | None = None,
) -> list[LanguageDoc]:
    """Retrieve docs for a language, optionally filtered by category and search."""
    stmt = (
        select(LanguageDoc)
        .where(LanguageDoc.language == language)
        .order_by(LanguageDoc.category, LanguageDoc.order)
    )

    if category:
        stmt = stmt.where(LanguageDoc.category == category)

    if search:
        pattern = f"%{search}%"
        stmt = stmt.where(
            or_(
                LanguageDoc.title.ilike(pattern),
                LanguageDoc.content.ilike(pattern),
            )
        )

    result = await db.execute(stmt)
    return list(result.scalars().all())


async def get_categories(db: AsyncSession, language: str) -> list[str]:
    """Return distinct categories for a language."""
    stmt = (
        select(distinct(LanguageDoc.category))
        .where(LanguageDoc.language == language)
        .order_by(LanguageDoc.category)
    )
    result = await db.execute(stmt)
    return [row[0] for row in result.all()]


async def get_supported_languages(db: AsyncSession) -> list[str]:
    """Return list of languages that have docs."""
    stmt = select(distinct(LanguageDoc.language)).order_by(LanguageDoc.language)
    result = await db.execute(stmt)
    return [row[0] for row in result.all()]

"""add language_docs table

Revision ID: j0e1f2g3h4i5
Revises: i9d0e1f2g3h4
Create Date: 2025-01-20 14:00:00.000000
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

revision = "j0e1f2g3h4i5"
down_revision = "i9d0e1f2g3h4"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "language_docs",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("language", sa.String(30), nullable=False, index=True),
        sa.Column("category", sa.String(50), nullable=False, index=True),
        sa.Column("title", sa.String(200), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("code_example", sa.Text(), nullable=True),
        sa.Column("order", sa.Integer(), server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_language_docs_lang_cat", "language_docs", ["language", "category"])


def downgrade() -> None:
    op.drop_index("ix_language_docs_lang_cat", table_name="language_docs")
    op.drop_table("language_docs")

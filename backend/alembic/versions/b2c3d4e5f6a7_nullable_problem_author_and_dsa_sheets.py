"""make problem author_id nullable, add dsa_sheets tables

Revision ID: b2c3d4e5f6a7
Revises: a1b2c3d4e5f6
Create Date: 2026-02-09 23:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = 'b2c3d4e5f6a7'
down_revision: Union[str, None] = 'a1b2c3d4e5f6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # --- Make problem author_id nullable ---
    op.alter_column('problems', 'author_id', existing_type=sa.UUID(), nullable=True)
    op.drop_constraint('problems_author_id_fkey', 'problems', type_='foreignkey')
    op.create_foreign_key('problems_author_id_fkey', 'problems', 'users', ['author_id'], ['id'], ondelete='SET NULL')

    # --- DSA Sheets ---
    op.create_table(
        'dsa_sheets',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('name', sa.String(200), nullable=False, unique=True),
        sa.Column('slug', sa.String(220), nullable=False, unique=True, index=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('icon', sa.String(50), nullable=False, server_default='📋'),
        sa.Column('problem_count', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    op.create_table(
        'dsa_sheet_problems',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('sheet_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('dsa_sheets.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('problem_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('problems.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('section', sa.String(100), nullable=False, server_default='General'),
        sa.Column('order', sa.Integer(), nullable=False, server_default='0'),
        sa.UniqueConstraint('sheet_id', 'problem_id', name='uq_sheet_problem'),
    )

    op.create_table(
        'dsa_sheet_progress',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('sheet_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('dsa_sheets.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('problem_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('problems.id', ondelete='CASCADE'), nullable=False, index=True),
        sa.Column('is_completed', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.UniqueConstraint('user_id', 'sheet_id', 'problem_id', name='uq_user_sheet_problem'),
    )


def downgrade() -> None:
    op.drop_table('dsa_sheet_progress')
    op.drop_table('dsa_sheet_problems')
    op.drop_table('dsa_sheets')

    op.drop_constraint('problems_author_id_fkey', 'problems', type_='foreignkey')
    op.create_foreign_key('problems_author_id_fkey', 'problems', 'users', ['author_id'], ['id'], ondelete='CASCADE')
    op.alter_column('problems', 'author_id', existing_type=sa.UUID(), nullable=False)

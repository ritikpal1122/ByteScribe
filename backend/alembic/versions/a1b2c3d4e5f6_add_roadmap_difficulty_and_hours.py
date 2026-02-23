"""add roadmap difficulty and estimated_hours, make author_id nullable

Revision ID: a1b2c3d4e5f6
Revises: fe1232696e86
Create Date: 2026-02-09 22:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, None] = 'fe1232696e86'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('roadmaps', sa.Column('difficulty', sa.String(20), server_default='beginner', nullable=False))
    op.add_column('roadmaps', sa.Column('estimated_hours', sa.Integer(), server_default='0', nullable=False))
    op.alter_column('roadmaps', 'author_id', existing_type=sa.UUID(), nullable=True)
    # Change FK action from CASCADE to SET NULL
    op.drop_constraint('roadmaps_author_id_fkey', 'roadmaps', type_='foreignkey')
    op.create_foreign_key('roadmaps_author_id_fkey', 'roadmaps', 'users', ['author_id'], ['id'], ondelete='SET NULL')


def downgrade() -> None:
    op.drop_constraint('roadmaps_author_id_fkey', 'roadmaps', type_='foreignkey')
    op.create_foreign_key('roadmaps_author_id_fkey', 'roadmaps', 'users', ['author_id'], ['id'], ondelete='CASCADE')
    op.alter_column('roadmaps', 'author_id', existing_type=sa.UUID(), nullable=False)
    op.drop_column('roadmaps', 'estimated_hours')
    op.drop_column('roadmaps', 'difficulty')

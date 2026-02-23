"""extend study plans with sections, problem links, and sharing

Revision ID: d4e5f6a7b8c9
Revises: c3d4e5f6a7b8
Create Date: 2026-02-10 12:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = 'd4e5f6a7b8c9'
down_revision: Union[str, None] = 'c3d4e5f6a7b8'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # study_plans: add is_public
    op.add_column('study_plans', sa.Column('is_public', sa.Boolean(), nullable=False, server_default='false'))

    # study_plan_items: add section, problem_id, difficulty, estimated_minutes
    op.add_column('study_plan_items', sa.Column('section', sa.String(100), nullable=False, server_default='General'))
    op.add_column('study_plan_items', sa.Column('problem_id', postgresql.UUID(as_uuid=True), nullable=True))
    op.add_column('study_plan_items', sa.Column('difficulty', sa.String(10), nullable=True))
    op.add_column('study_plan_items', sa.Column('estimated_minutes', sa.Integer(), nullable=True))

    op.create_foreign_key(
        'fk_study_plan_items_problem_id',
        'study_plan_items', 'problems',
        ['problem_id'], ['id'],
        ondelete='SET NULL',
    )
    op.create_index('ix_study_plan_items_problem_id', 'study_plan_items', ['problem_id'])


def downgrade() -> None:
    op.drop_index('ix_study_plan_items_problem_id', table_name='study_plan_items')
    op.drop_constraint('fk_study_plan_items_problem_id', 'study_plan_items', type_='foreignkey')
    op.drop_column('study_plan_items', 'estimated_minutes')
    op.drop_column('study_plan_items', 'difficulty')
    op.drop_column('study_plan_items', 'problem_id')
    op.drop_column('study_plan_items', 'section')
    op.drop_column('study_plans', 'is_public')

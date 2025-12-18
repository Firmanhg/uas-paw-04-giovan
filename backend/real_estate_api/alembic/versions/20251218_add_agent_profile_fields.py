"""Add agent profile fields to users

Revision ID: 6de234bcd567
Revises: 5cd123abc456
Create Date: 2025-12-18 01:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6de234bcd567'
down_revision = '5cd123abc456'
branch_labels = None
depends_on = None

def upgrade():
    # Add agent profile fields to users table
    op.add_column('users', sa.Column('phone', sa.String(length=20), nullable=True))
    op.add_column('users', sa.Column('bio', sa.Text(), nullable=True))
    op.add_column('users', sa.Column('avatar', sa.Text(), nullable=True))
    op.add_column('users', sa.Column('company', sa.String(length=200), nullable=True))
    op.add_column('users', sa.Column('license_number', sa.String(length=100), nullable=True))

def downgrade():
    op.drop_column('users', 'license_number')
    op.drop_column('users', 'company')
    op.drop_column('users', 'avatar')
    op.drop_column('users', 'bio')
    op.drop_column('users', 'phone')

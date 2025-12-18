"""Add images columns to properties

Revision ID: 5cd123abc456
Revises: 4ab020c484e1
Create Date: 2025-12-18 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5cd123abc456'
down_revision = '4ab020c484e1'
branch_labels = None
depends_on = None

def upgrade():
    # Add images column (JSON type for array of images)
    op.add_column('properties', sa.Column('images', sa.JSON(), nullable=True))
    # Add img column (Text type for legacy single image support)
    op.add_column('properties', sa.Column('img', sa.Text(), nullable=True))

def downgrade():
    op.drop_column('properties', 'img')
    op.drop_column('properties', 'images')

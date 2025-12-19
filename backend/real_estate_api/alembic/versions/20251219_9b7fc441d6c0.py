"""merge agent profile and chat messages

Revision ID: 9b7fc441d6c0
Revises: 6de234bcd567, 5596fa9cc65c
Create Date: 2025-12-19 11:42:36.564319

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9b7fc441d6c0'
down_revision = ('6de234bcd567', '5596fa9cc65c')
branch_labels = None
depends_on = None

def upgrade():
    pass

def downgrade():
    pass

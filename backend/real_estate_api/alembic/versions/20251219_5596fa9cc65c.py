"""add chat_messages table

Revision ID: 5596fa9cc65c
Revises: 5cd123abc456
Create Date: 2025-12-19 11:31:19.028640

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5596fa9cc65c'
down_revision = '5cd123abc456'
branch_labels = None
depends_on = None

def upgrade():
    # Create chat_messages table
    op.create_table('chat_messages',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('inquiry_id', sa.Integer(), nullable=False),
        sa.Column('sender_id', sa.Integer(), nullable=False),
        sa.Column('message', sa.Text(), nullable=False),
        sa.Column('timestamp', sa.DateTime(), nullable=True),
        sa.Column('message_type', sa.String(length=20), nullable=True),
        sa.ForeignKeyConstraint(['inquiry_id'], ['inquiries.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['sender_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade():
    # Drop chat_messages table
    op.drop_table('chat_messages')

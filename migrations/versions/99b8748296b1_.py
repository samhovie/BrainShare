"""empty message

Revision ID: 99b8748296b1
Revises: d3a0415344bb
Create Date: 2023-07-17 19:03:04.614899

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '99b8748296b1'
down_revision = 'd3a0415344bb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('answers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('time_created', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=False))
        batch_op.add_column(sa.Column('time_updated', sa.DateTime(timezone=True), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('answers', schema=None) as batch_op:
        batch_op.drop_column('time_updated')
        batch_op.drop_column('time_created')

    # ### end Alembic commands ###

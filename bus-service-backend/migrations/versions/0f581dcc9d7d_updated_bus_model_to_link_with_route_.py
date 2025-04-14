"""Updated Bus model to link with Route and added source/destination

Revision ID: 0f581dcc9d7d
Revises: a371875a3cad
Create Date: 2025-04-14 11:31:59.689080

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0f581dcc9d7d'
down_revision = 'a371875a3cad'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bus', schema=None) as batch_op:
        batch_op.add_column(sa.Column('source', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('destination', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('departure_time', sa.String(length=20), nullable=True))
        batch_op.add_column(sa.Column('arrival_time', sa.String(length=20), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bus', schema=None) as batch_op:
        batch_op.drop_column('arrival_time')
        batch_op.drop_column('departure_time')
        batch_op.drop_column('destination')
        batch_op.drop_column('source')

    # ### end Alembic commands ###

import argparse
import sys

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models
from ..models.user import User
from ..models.property import Property


def setup_models(dbsession):
    """
    Add or update models / fixtures in the database.

    """
    # Create sample users (agents and buyers)
    agent1 = User(
        name='Agus Agent',
        email='agent@test.com',
        password_hash='password123',  # In production, use hashed password
        role='agent'
    )
    
    buyer1 = User(
        name='Budi Buyer',
        email='buyer@test.com',
        password_hash='password123',  # In production, use hashed password
        role='buyer'
    )
    
    dbsession.add(agent1)
    dbsession.add(buyer1)
    dbsession.flush()  # Flush to get the IDs
    
    # Create sample properties
    property1 = Property(
        title='Rumah Mewah di Bandung',
        description='Rumah mewah dengan kolam renang dan taman luas',
        price=850000000,
        property_type='house',
        location='Bandung, Jawa Barat',
        bedrooms=4,
        bathrooms=3,
        area=200,
        agent_id=agent1.id
    )
    
    property2 = Property(
        title='Apartemen Modern Jakarta Pusat',
        description='Apartemen modern dengan view kota yang indah',
        price=1200000000,
        property_type='apartment',
        location='Jakarta Pusat',
        bedrooms=2,
        bathrooms=1,
        area=45,
        agent_id=agent1.id
    )
    
    dbsession.add(property1)
    dbsession.add(property2)


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        with env['request'].tm:
            dbsession = env['request'].dbsession
            setup_models(dbsession)
    except OperationalError:
        print('''
Pyramid is having a problem using your SQL database.  The problem
might be caused by one of the following things:

1.  You may need to initialize your database tables with `alembic`.
    Check your README.txt for description and try to run it.

2.  Your database server may not be running.  Check that the
    database server referred to by the "sqlalchemy.url" setting in
    your "development.ini" file is running.
            ''')

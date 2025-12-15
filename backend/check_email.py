"""
Check if email exists in database
"""
from pyramid.paster import get_appsettings
from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from real_estate_api.models import User

config_uri = 'development.ini'
settings = get_appsettings(config_uri)
engine = engine_from_config(settings, 'sqlalchemy.')
Session = sessionmaker(bind=engine)
session = Session()

# Check email
email = 'agentha@gmail.com'
user = session.query(User).filter(User.email == email).first()

if user:
    print(f"❌ Email '{email}' sudah terdaftar!")
    print(f"   Name: {user.name}")
    print(f"   Role: {user.role}")
else:
    print(f"✅ Email '{email}' belum terdaftar, bisa dipakai!")

# List all users
print("\n📋 All users in database:")
users = session.query(User).all()
for u in users:
    print(f"  - {u.email} ({u.name}) - Role: {u.role}")

session.close()

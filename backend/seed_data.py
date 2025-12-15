"""
Seed database with test data
Run: python seed_data.py
"""
from sqlalchemy import engine_from_config
from pyramid.paster import get_appsettings
from real_estate_api.models import User
from real_estate_api.models.meta import Base
from real_estate_api.auth import hash_password
import sys

def seed_users(session):
    """Create test users"""
    
    # Check if users already exist
    existing = session.query(User).filter(User.email == 'buyer@test.com').first()
    if existing:
        print("⚠️  Test users already exist. Skipping...")
        return
    
    users = [
        {
            'name': 'John Buyer',
            'email': 'buyer@test.com',
            'password': 'test123',
            'role': 'buyer',
            'phone': '08123456789'
        },
        {
            'name': 'Jane Agent',
            'email': 'agent@test.com',
            'password': 'test123',
            'role': 'agent',
            'phone': '08987654321'
        },
        {
            'name': 'Admin User',
            'email': 'admin@test.com',
            'password': 'admin123',
            'role': 'agent',
            'phone': '08111111111'
        }
    ]
    
    print("\n🌱 Seeding users...")
    for user_data in users:
        user = User(
            name=user_data['name'],
            email=user_data['email'],
            password_hash=hash_password(user_data['password']),
            role=user_data['role'],
            phone=user_data['phone']
        )
        session.add(user)
        print(f"  ✓ Created: {user_data['email']} (password: {user_data['password']})")
    
    session.commit()
    print("\n✅ Seed completed!\n")

def main():
    """Main seed function"""
    config_uri = 'development.ini'
    
    try:
        settings = get_appsettings(config_uri)
        engine = engine_from_config(settings, 'sqlalchemy.')
        
        from sqlalchemy.orm import sessionmaker
        Session = sessionmaker(bind=engine)
        session = Session()
        
        print("=" * 60)
        print("DATABASE SEED SCRIPT")
        print("=" * 60)
        
        seed_users(session)
        
        print("🎉 All done! Test users:")
        print("  - buyer@test.com / test123")
        print("  - agent@test.com / test123")
        print("  - admin@test.com / admin123\n")
        
        session.close()
        
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()

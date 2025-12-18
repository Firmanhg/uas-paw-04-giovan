from sqlalchemy import Column, Integer, String, Enum, Text
from .meta import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String(100), unique=True)
    password_hash = Column(String(255))
    name = Column(String(100))
    role = Column(Enum('buyer', 'agent'), default='buyer')
    
    # Agent profile fields
    phone = Column(String(20))
    bio = Column(Text)
    avatar = Column(Text)  # URL or base64
    company = Column(String(200))
    license_number = Column(String(100))
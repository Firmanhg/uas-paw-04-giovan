from sqlalchemy import Column, Integer, String, Enum
from .meta import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String(100), unique=True)
    password_hash = Column(String(255))
    name = Column(String(100))
    role = Column(Enum('buyer', 'agent', name='user_role'), default='buyer')
    phone = Column(String(20))
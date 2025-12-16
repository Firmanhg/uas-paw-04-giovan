from sqlalchemy import Column, Integer, String, Enum
from .meta import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(Enum('buyer', 'agent', name='user_role'), default='buyer', nullable=False)
    phone = Column(String(20))
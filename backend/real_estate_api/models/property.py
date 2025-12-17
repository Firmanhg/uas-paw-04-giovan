from sqlalchemy import Column, Integer, String, Text, ForeignKey, Enum, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .meta import Base


class Property(Base):
    __tablename__ = 'properties'
    id = Column(Integer, primary_key=True)
    agent_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    price = Column(Integer, nullable=False)
    property_type = Column(Enum('house', 'apartment', 'villa', 'land', name='property_type'), default='house')
    location = Column(String(200), nullable=False)
    bedrooms = Column(Integer, default=1)
    bathrooms = Column(Integer, default=1)
    area = Column(Integer, nullable=False)  # dalam m2
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    agent = relationship("User", backref="properties")
    photos = relationship("PropertyPhoto", back_populates="property", cascade="all, delete-orphan")
    favorites = relationship("Favorite", back_populates="property", cascade="all, delete-orphan")
    inquiries = relationship("Inquiry", back_populates="property", cascade="all, delete-orphan")


class PropertyPhoto(Base):
    __tablename__ = 'property_photos'
    id = Column(Integer, primary_key=True)
    property_id = Column(Integer, ForeignKey('properties.id'), nullable=False)
    photo_url = Column(String(500), nullable=False)
    
    # Relationship
    property = relationship("Property", back_populates="photos")


class Favorite(Base):
    __tablename__ = 'favorites'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    property_id = Column(Integer, ForeignKey('properties.id'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", backref="favorites")
    property = relationship("Property", back_populates="favorites")


class Inquiry(Base):
    __tablename__ = 'inquiries'
    id = Column(Integer, primary_key=True)
    property_id = Column(Integer, ForeignKey('properties.id'), nullable=False)
    buyer_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    message = Column(Text, nullable=False)
    date = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationships
    buyer = relationship("User", backref="inquiries")
    property = relationship("Property", back_populates="inquiries")
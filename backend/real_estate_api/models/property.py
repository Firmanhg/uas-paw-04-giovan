from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON, BigInteger
from sqlalchemy.orm import relationship
from .meta import Base

class Property(Base):
    __tablename__ = 'properties'
    id = Column(Integer, primary_key=True)
    title = Column(String(200))
    description = Column(Text)
    price = Column(BigInteger)  # Use BigInteger for large prices
    property_type = Column(String(50))  # rumah, apartemen, villa, tanah
    location = Column(String(100))
    bedrooms = Column(Integer, default=1)
    bathrooms = Column(Integer, default=1)
    area = Column(Integer)  # dalam m2
    agent_id = Column(Integer, ForeignKey('users.id'))
    images = Column(JSON)  # Array of image URLs
    agent = relationship("User", backref="properties")
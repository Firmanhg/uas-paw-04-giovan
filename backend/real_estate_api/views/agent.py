"""
Agent Dashboard API endpoints
"""
from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy import func
from datetime import datetime
import json

from ..models import Property, Inquiry, User


@view_config(route_name='agent_stats', renderer='json', request_method='GET')
def get_agent_stats(request):
    """Get agent statistics for dashboard"""
    # Check if user is logged in
    user_id = request.session.get('user_id')
    if not user_id:
        return Response(
            json.dumps({'success': False, 'message': 'Unauthorized'}),
            status=401,
            content_type='application/json'
        )
    
    # Check if user is agent
    user = request.dbsession.query(User).filter(User.id == user_id).first()
    if not user or user.role != 'agent':
        return Response(
            json.dumps({'success': False, 'message': 'Access denied. Agent only.'}),
            status=403,
            content_type='application/json'
        )
    
    # Get total properties listed by this agent
    total_properties = request.dbsession.query(func.count(Property.id))\
        .filter(Property.agent_id == user_id)\
        .scalar() or 0
    
    # Get active listings (assuming all properties are active for now)
    active_listings = total_properties
    
    # Get total inquiries for agent's properties
    total_inquiries = request.dbsession.query(func.count(Inquiry.id))\
        .join(Property)\
        .filter(Property.agent_id == user_id)\
        .scalar() or 0
    
    return {
        'success': True,
        'stats': {
            'total_properties': total_properties,
            'active_listings': active_listings,
            'total_inquiries': total_inquiries,
            'properties_trend': '+0 this month',  # Placeholder
            'inquiries_trend': '+0% this month',   # Placeholder
            'listings_trend': '0 from last week'   # Placeholder
        }
    }


@view_config(route_name='agent_properties', renderer='json', request_method='GET')
def get_agent_properties(request):
    """Get all properties for logged in agent"""
    # Check if user is logged in
    user_id = request.session.get('user_id')
    if not user_id:
        return Response(
            json.dumps({'success': False, 'message': 'Unauthorized'}),
            status=401,
            content_type='application/json'
        )
    
    # Check if user is agent
    user = request.dbsession.query(User).filter(User.id == user_id).first()
    if not user or user.role != 'agent':
        return Response(
            json.dumps({'success': False, 'message': 'Access denied. Agent only.'}),
            status=403,
            content_type='application/json'
        )
    
    # Get properties for this agent
    properties = request.dbsession.query(Property)\
        .filter(Property.agent_id == user_id)\
        .all()
    
    properties_list = []
    for prop in properties:
        properties_list.append({
            'id': prop.id,
            'title': prop.title,
            'location': prop.location,
            'price': float(prop.price) if prop.price else 0,
            'bedrooms': prop.bedrooms,
            'bathrooms': prop.bathrooms,
            'area': float(prop.area) if prop.area else 0,
            'description': prop.description,
            'created_at': prop.created_at.isoformat() if prop.created_at else None
        })
    
    return {
        'success': True,
        'properties': properties_list,
        'total': len(properties_list)
    }


@view_config(route_name='agent_inquiries', renderer='json', request_method='GET')
def get_agent_inquiries(request):
    """Get all inquiries for agent's properties"""
    # Check if user is logged in
    user_id = request.session.get('user_id')
    if not user_id:
        return Response(
            json.dumps({'success': False, 'message': 'Unauthorized'}),
            status=401,
            content_type='application/json'
        )
    
    # Check if user is agent
    user = request.dbsession.query(User).filter(User.id == user_id).first()
    if not user or user.role != 'agent':
        return Response(
            json.dumps({'success': False, 'message': 'Access denied. Agent only.'}),
            status=403,
            content_type='application/json'
        )
    
    # Get inquiries for agent's properties with buyer info
    inquiries = request.dbsession.query(Inquiry, Property, User)\
        .join(Property, Inquiry.property_id == Property.id)\
        .join(User, Inquiry.buyer_id == User.id)\
        .filter(Property.agent_id == user_id)\
        .order_by(Inquiry.inquiry_date.desc())\
        .all()
    
    inquiries_list = []
    for inquiry, property, buyer in inquiries:
        inquiries_list.append({
            'id': inquiry.id,
            'buyer_name': buyer.name,
            'buyer_email': buyer.email,
            'buyer_phone': buyer.phone,
            'property_title': property.title,
            'property_id': property.id,
            'message': inquiry.message,
            'inquiry_date': inquiry.inquiry_date.isoformat() if inquiry.inquiry_date else None
        })
    
    return {
        'success': True,
        'inquiries': inquiries_list,
        'total': len(inquiries_list)
    }

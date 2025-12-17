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
            'total_inquiries': total_inquiries
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
    
    # Get all properties for this agent
    properties = request.dbsession.query(Property)\
        .filter(Property.agent_id == user_id)\
        .all()
    
    properties_list = []
    for prop in properties:
        properties_list.append({
            'id': prop.id,
            'title': prop.title,
            'description': prop.description,
            'price': prop.price,
            'property_type': prop.property_type,
            'location': prop.location,
            'bedrooms': prop.bedrooms,
            'bathrooms': prop.bathrooms,
            'area': prop.area,
            'created_at': prop.created_at.isoformat() if prop.created_at else None
        })
    
    return {
        'success': True,
        'properties': properties_list
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
    
    # Get all inquiries for agent's properties
    inquiries = request.dbsession.query(Inquiry, Property, User)\
        .join(Property, Inquiry.property_id == Property.id)\
        .join(User, Inquiry.buyer_id == User.id)\
        .filter(Property.agent_id == user_id)\
        .all()
    
    inquiries_list = []
    for inquiry, property, buyer in inquiries:
        inquiries_list.append({
            'id': inquiry.id,
            'message': inquiry.message,
            'date': inquiry.date.isoformat() if inquiry.date else None,
            'property': {
                'id': property.id,
                'title': property.title,
                'location': property.location
            },
            'buyer': {
                'id': buyer.id,
                'name': buyer.name,
                'email': buyer.email,
                'phone': buyer.phone
            }
        })
    
    return {
        'success': True,
        'inquiries': inquiries_list
    }

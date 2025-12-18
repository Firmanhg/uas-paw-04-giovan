"""
Agent Profile and Dashboard API endpoints
Combined: Agent profile management + Dashboard statistics
"""
from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy import func
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime
import json

from ..models import Property, User
from ..models import Inquiry


# Agent Profile Endpoints
@view_config(route_name='agent_profile', renderer='json', request_method='GET')
def get_agent_profile(request):
    """
    Get agent profile by ID
    GET /api/agents/{id}
    """
    try:
        agent_id = request.matchdict['id']
        dbsession = request.dbsession
        
        agent = dbsession.query(User).filter_by(id=agent_id, role='agent').first()
        
        if not agent:
            return Response(
                json={"error": "Agent not found"},
                status=404
            )
        
        # Count total properties
        total_properties = dbsession.query(Property).filter_by(agent_id=agent_id).count()
        
        return {
            "status": "success",
            "data": {
                "id": agent.id,
                "name": agent.name,
                "email": agent.email,
                "phone": agent.phone,
                "role": agent.role,
                "total_properties": total_properties
            }
        }
        
    except Exception as e:
        return Response(
            json={"error": "Internal server error", "details": str(e)},
            status=500
        )


@view_config(route_name='agent_profile', renderer='json', request_method='PUT')
def update_agent_profile(request):
    """
    Update agent profile
    PUT /api/agents/{id}
    
    Body: {
        "name": "string",
        "phone": "string",
        "bio": "string",
        "avatar": "string",
        "company": "string",
        "license_number": "string"
    }
    """
    try:
        agent_id = request.matchdict['id']
        data = request.json_body
        dbsession = request.dbsession
        
        agent = dbsession.query(User).filter_by(id=agent_id, role='agent').first()
        
        if not agent:
            return Response(
                json={"error": "Agent not found"},
                status=404
            )
        
        # Update fields if provided
        if 'name' in data:
            agent.name = data['name']
        if 'phone' in data:
            agent.phone = data['phone']
        
        # Email update with validation
        if 'email' in data and data['email'] != agent.email:
            # Check if email already exists
            existing = dbsession.query(User).filter_by(email=data['email']).first()
            if existing:
                return Response(
                    json={"error": "Email already in use"},
                    status=400
                )
            agent.email = data['email']
        
        dbsession.flush()
        
        return {
            "status": "success",
            "message": "Agent profile updated successfully",
            "data": {
                "id": agent.id,
                "name": agent.name,
                "email": agent.email,
                "phone": agent.phone
            }
        }
        
    except ValueError as e:
        return Response(
            json={"error": "Invalid JSON data", "details": str(e)},
            status=400
        )
    except SQLAlchemyError as e:
        request.dbsession.rollback()
        return Response(
            json={"error": "Database error", "details": str(e)},
            status=500
        )
    except Exception as e:
        return Response(
            json={"error": "Internal server error", "details": str(e)},
            status=500
        )


@view_config(route_name='agents_list', renderer='json', request_method='GET')
def list_agents(request):
    """
    Get list of all agents
    GET /api/agents
    """
    try:
        dbsession = request.dbsession
        
        agents = dbsession.query(User).filter_by(role='agent').all()
        
        result = []
        
        for agent in agents:
            total_properties = dbsession.query(Property).filter_by(agent_id=agent.id).count()
            
            result.append({
                "id": agent.id,
                "name": agent.name,
                "email": agent.email,
                "phone": agent.phone,
                "total_properties": total_properties
            })
        
        return {
            "status": "success",
            "count": len(result),
            "data": result
        }
        
    except Exception as e:
        return Response(
            json={"error": "Internal server error", "details": str(e)},
            status=500
        )


# Agent Dashboard Endpoints
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
            'created_at': prop.created_at.isoformat() if hasattr(prop, 'created_at') and prop.created_at else None
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

"""
Agent Profile Views
Handle agent profile operations (get, update)
"""
from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import SQLAlchemyError
from ..models import User
import json


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
        from ..models.property import Property
        total_properties = dbsession.query(Property).filter_by(agent_id=agent_id).count()
        
        return {
            "status": "success",
            "data": {
                "id": agent.id,
                "name": agent.name,
                "email": agent.email,
                "phone": agent.phone,
                "bio": agent.bio,
                "avatar": agent.avatar,
                "company": agent.company,
                "license_number": agent.license_number,
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
        
        # TODO: Verify that the requesting user is the same as agent_id
        # For now, we allow any update
        
        # Update fields if provided
        if 'name' in data:
            agent.name = data['name']
        if 'phone' in data:
            agent.phone = data['phone']
        if 'bio' in data:
            agent.bio = data['bio']
        if 'avatar' in data:
            agent.avatar = data['avatar']
        if 'company' in data:
            agent.company = data['company']
        if 'license_number' in data:
            agent.license_number = data['license_number']
        
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
                "phone": agent.phone,
                "bio": agent.bio,
                "avatar": agent.avatar,
                "company": agent.company,
                "license_number": agent.license_number
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
        from ..models.property import Property
        
        for agent in agents:
            total_properties = dbsession.query(Property).filter_by(agent_id=agent.id).count()
            
            result.append({
                "id": agent.id,
                "name": agent.name,
                "email": agent.email,
                "phone": agent.phone,
                "bio": agent.bio,
                "avatar": agent.avatar,
                "company": agent.company,
                "license_number": agent.license_number,
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

"""
Inquiry/Chat API endpoints
"""
from pyramid.view import view_config
from pyramid.response import Response
import json

from ..models import Property, User
from ..models import Inquiry


@view_config(route_name='create_inquiry', renderer='json', request_method='POST')
def create_inquiry(request):
    """
    Submit inquiry to property agent
    
    POST /api/inquiries
    Body: {
        "property_id": 1,
        "message": "Apakah masih tersedia?"
    }
    """
    try:
        # Check authentication
        user_id = request.session.get('user_id')
        if not user_id:
            return Response(
                json.dumps({'success': False, 'message': 'Unauthorized'}),
                status=401,
                content_type='application/json'
            )
        
        data = request.json_body
        
        # Validate required fields
        if 'property_id' not in data or 'message' not in data:
            return {
                'success': False,
                'message': 'property_id and message are required'
            }
        
        property_id = data['property_id']
        message = data['message']
        
        # Check if property exists
        prop = request.dbsession.query(Property)\
            .filter(Property.id == property_id)\
            .first()
        
        if not prop:
            return Response(
                json.dumps({'success': False, 'message': 'Property not found'}),
                status=404,
                content_type='application/json'
            )
        
        # Create inquiry
        new_inquiry = Inquiry(
            buyer_id=user_id,
            property_id=property_id,
            message=message
        )
        
        request.dbsession.add(new_inquiry)
        request.dbsession.flush()
        
        return {
            'success': True,
            'message': 'Inquiry submitted successfully',
            'inquiry': {
                'id': new_inquiry.id,
                'property_id': property_id,
                'message': message,
                'date': new_inquiry.date.isoformat() if hasattr(new_inquiry, 'date') and new_inquiry.date else None
            }
        }
        
    except Exception as e:
        request.dbsession.rollback()
        return {
            'success': False,
            'message': f'Failed to submit inquiry: {str(e)}'
        }


@view_config(route_name='get_buyer_inquiries', renderer='json', request_method='GET')
def get_buyer_inquiries(request):
    """
    Get all inquiries sent by current user
    
    GET /api/inquiries/buyer
    """
    try:
        # Check authentication
        user_id = request.session.get('user_id')
        if not user_id:
            return Response(
                json.dumps({'success': False, 'message': 'Unauthorized'}),
                status=401,
                content_type='application/json'
            )
        
        # Get all inquiries from this buyer
        inquiries = request.dbsession.query(Inquiry, Property, User)\
            .join(Property, Inquiry.property_id == Property.id)\
            .join(User, Property.agent_id == User.id)\
            .filter(Inquiry.buyer_id == user_id)\
            .all()
        
        inquiries_list = []
        for inquiry, property, agent in inquiries:
            inquiries_list.append({
                'id': inquiry.id,
                'message': inquiry.message,
                'date': inquiry.date.isoformat() if inquiry.date else None,
                'property': {
                    'id': property.id,
                    'title': property.title,
                    'location': property.location,
                    'price': property.price
                },
                'agent': {
                    'id': agent.id,
                    'name': agent.name,
                    'email': agent.email,
                    'phone': agent.phone
                }
            })
        
        return {
            'success': True,
            'inquiries': inquiries_list,
            'total': len(inquiries_list)
        }
        
    except Exception as e:
        return {
            'success': False,
            'message': f'Failed to get inquiries: {str(e)}'
        }


@view_config(route_name='get_all_inquiries', renderer='json', request_method='GET')
def get_all_inquiries(request):
    """
    Get all inquiries for admin
    
    GET /api/inquiries
    """
    try:
        # Check authentication (admin only in production)
        user_id = request.session.get('user_id')
        if not user_id:
            return Response(
                json.dumps({'success': False, 'message': 'Unauthorized'}),
                status=401,
                content_type='application/json'
            )
        
        # Get all inquiries with proper joins
        from sqlalchemy.orm import aliased
        
        BuyerUser = aliased(User)
        AgentUser = aliased(User)
        
        inquiries = request.dbsession.query(Inquiry, Property, AgentUser, BuyerUser)\
            .join(Property, Inquiry.property_id == Property.id)\
            .join(AgentUser, Property.agent_id == AgentUser.id)\
            .join(BuyerUser, Inquiry.buyer_id == BuyerUser.id)\
            .all()
        
        inquiries_list = []
        for inquiry, property, agent, buyer in inquiries:
            inquiries_list.append({
                'id': inquiry.id,
                'message': inquiry.message,
                'date': inquiry.date.isoformat() if inquiry.date else None,
                'property': {
                    'id': property.id,
                    'title': property.title,
                    'location': property.location
                },
                'agent': {
                    'id': agent.id,
                    'name': agent.name
                },
                'buyer': {
                    'id': buyer.id,
                    'name': buyer.name
                }
            })
        
        return {
            'success': True,
            'inquiries': inquiries_list,
            'total': len(inquiries_list)
        }
        
    except Exception as e:
        return {
            'success': False,
            'message': f'Failed to get inquiries: {str(e)}'
        }

"""
Property CRUD API endpoints
"""
from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy import func
import json

from ..models import Property, PropertyPhoto, Inquiry, User


@view_config(route_name='properties_list', renderer='json', request_method='GET')
def get_properties(request):
    """
    Get all properties with optional filters
    
    GET /api/properties?property_type=house&min_price=1000000&max_price=5000000&location=Jakarta&bedrooms=3
    """
    try:
        # Start query
        query = request.dbsession.query(Property)
        
        # Apply filters
        property_type = request.params.get('property_type')
        if property_type:
            query = query.filter(Property.property_type == property_type)
        
        min_price = request.params.get('min_price')
        if min_price:
            query = query.filter(Property.price >= int(min_price))
        
        max_price = request.params.get('max_price')
        if max_price:
            query = query.filter(Property.price <= int(max_price))
        
        location = request.params.get('location')
        if location:
            query = query.filter(Property.location.ilike(f'%{location}%'))
        
        bedrooms = request.params.get('bedrooms')
        if bedrooms:
            query = query.filter(Property.bedrooms >= int(bedrooms))
        
        # Get results
        properties = query.all()
        
        properties_list = []
        for prop in properties:
            # Get first photo as thumbnail
            first_photo = request.dbsession.query(PropertyPhoto)\
                .filter(PropertyPhoto.property_id == prop.id)\
                .first()
            
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
                'thumbnail': first_photo.photo_url if first_photo else None,
                'agent': {
                    'id': prop.agent.id,
                    'name': prop.agent.name,
                    'email': prop.agent.email,
                    'phone': prop.agent.phone
                }
            })
        
        return {
            'success': True,
            'properties': properties_list,
            'total': len(properties_list)
        }
        
    except Exception as e:
        return {
            'success': False,
            'message': f'Failed to get properties: {str(e)}'
        }


@view_config(route_name='property_detail', renderer='json', request_method='GET')
def get_property_detail(request):
    """
    Get property detail by ID
    
    GET /api/properties/{id}
    """
    try:
        property_id = request.matchdict['id']
        
        # Get property
        prop = request.dbsession.query(Property)\
            .filter(Property.id == property_id)\
            .first()
        
        if not prop:
            return Response(
                json.dumps({
                    'success': False,
                    'message': 'Property not found'
                }),
                status=404,
                content_type='application/json'
            )
        
        # Get all photos
        photos = request.dbsession.query(PropertyPhoto)\
            .filter(PropertyPhoto.property_id == property_id)\
            .all()
        
        # Get inquiry count
        inquiry_count = request.dbsession.query(func.count(Inquiry.id))\
            .filter(Inquiry.property_id == property_id)\
            .scalar() or 0
        
        return {
            'success': True,
            'property': {
                'id': prop.id,
                'title': prop.title,
                'description': prop.description,
                'price': prop.price,
                'property_type': prop.property_type,
                'location': prop.location,
                'bedrooms': prop.bedrooms,
                'bathrooms': prop.bathrooms,
                'area': prop.area,
                'created_at': prop.created_at.isoformat() if prop.created_at else None,
                'photos': [photo.photo_url for photo in photos],
                'agent': {
                    'id': prop.agent.id,
                    'name': prop.agent.name,
                    'email': prop.agent.email,
                    'phone': prop.agent.phone
                },
                'inquiry_count': inquiry_count
            }
        }
        
    except Exception as e:
        return {
            'success': False,
            'message': f'Failed to get property: {str(e)}'
        }


@view_config(route_name='create_property', renderer='json', request_method='POST')
def create_property(request):
    """
    Create new property (agent only)
    
    POST /api/properties
    Body: {
        "title": "Rumah Mewah Jakarta",
        "description": "Rumah 2 lantai...",
        "price": 2500000000,
        "property_type": "house",
        "location": "Jakarta Selatan",
        "bedrooms": 4,
        "bathrooms": 3,
        "area": 250
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
        
        # Check if user is agent
        user = request.dbsession.query(User).filter(User.id == user_id).first()
        if not user or user.role != 'agent':
            return Response(
                json.dumps({'success': False, 'message': 'Only agents can create properties'}),
                status=403,
                content_type='application/json'
            )
        
        data = request.json_body
        
        # Validate required fields
        required_fields = ['title', 'price', 'location', 'area']
        for field in required_fields:
            if field not in data or not data[field]:
                return {
                    'success': False,
                    'message': f'Field {field} is required'
                }
        
        # Create property
        new_property = Property(
            agent_id=user_id,
            title=data['title'],
            description=data.get('description', ''),
            price=int(data['price']),
            property_type=data.get('property_type', 'house'),
            location=data['location'],
            bedrooms=int(data.get('bedrooms', 1)),
            bathrooms=int(data.get('bathrooms', 1)),
            area=int(data['area'])
        )
        
        request.dbsession.add(new_property)
        request.dbsession.flush()
        
        return {
            'success': True,
            'message': 'Property created successfully',
            'property': {
                'id': new_property.id,
                'title': new_property.title,
                'price': new_property.price,
                'location': new_property.location
            }
        }
        
    except Exception as e:
        return {
            'success': False,
            'message': f'Failed to create property: {str(e)}'
        }


@view_config(route_name='update_property', renderer='json', request_method='PUT')
def update_property(request):
    """
    Update property (owner only)
    
    PUT /api/properties/{id}
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
        
        property_id = request.matchdict['id']
        
        # Get property
        prop = request.dbsession.query(Property)\
            .filter(Property.id == property_id)\
            .first()
        
        if not prop:
            return Response(
                json.dumps({'success': False, 'message': 'Property not found'}),
                status=404,
                content_type='application/json'
            )
        
        # Check if user is owner
        if prop.agent_id != user_id:
            return Response(
                json.dumps({'success': False, 'message': 'You can only update your own properties'}),
                status=403,
                content_type='application/json'
            )
        
        data = request.json_body
        
        # Update fields
        if 'title' in data:
            prop.title = data['title']
        if 'description' in data:
            prop.description = data['description']
        if 'price' in data:
            prop.price = int(data['price'])
        if 'property_type' in data:
            prop.property_type = data['property_type']
        if 'location' in data:
            prop.location = data['location']
        if 'bedrooms' in data:
            prop.bedrooms = int(data['bedrooms'])
        if 'bathrooms' in data:
            prop.bathrooms = int(data['bathrooms'])
        if 'area' in data:
            prop.area = int(data['area'])
        
        return {
            'success': True,
            'message': 'Property updated successfully',
            'property': {
                'id': prop.id,
                'title': prop.title,
                'price': prop.price,
                'location': prop.location
            }
        }
        
    except Exception as e:
        return {
            'success': False,
            'message': f'Failed to update property: {str(e)}'
        }


@view_config(route_name='delete_property', renderer='json', request_method='DELETE')
def delete_property(request):
    """
    Delete property (owner only)
    
    DELETE /api/properties/{id}
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
        
        property_id = request.matchdict['id']
        
        # Get property
        prop = request.dbsession.query(Property)\
            .filter(Property.id == property_id)\
            .first()
        
        if not prop:
            return Response(
                json.dumps({'success': False, 'message': 'Property not found'}),
                status=404,
                content_type='application/json'
            )
        
        # Check if user is owner
        if prop.agent_id != user_id:
            return Response(
                json.dumps({'success': False, 'message': 'You can only delete your own properties'}),
                status=403,
                content_type='application/json'
            )
        
        # Delete property (cascade will delete photos, favorites, inquiries)
        request.dbsession.delete(prop)
        
        return {
            'success': True,
            'message': 'Property deleted successfully'
        }
        
    except Exception as e:
        return {
            'success': False,
            'message': f'Failed to delete property: {str(e)}'
        }


@view_config(route_name='search_properties', renderer='json', request_method='GET')
def search_properties(request):
    """
    Search properties by keyword
    
    GET /api/properties/search?q=jakarta
    """
    try:
        keyword = request.params.get('q', '')
        
        if not keyword:
            return {
                'success': False,
                'message': 'Search keyword is required'
            }
        
        # Search in title, description, and location
        properties = request.dbsession.query(Property)\
            .filter(
                (Property.title.ilike(f'%{keyword}%')) |
                (Property.description.ilike(f'%{keyword}%')) |
                (Property.location.ilike(f'%{keyword}%'))
            )\
            .all()
        
        properties_list = []
        for prop in properties:
            first_photo = request.dbsession.query(PropertyPhoto)\
                .filter(PropertyPhoto.property_id == prop.id)\
                .first()
            
            properties_list.append({
                'id': prop.id,
                'title': prop.title,
                'price': prop.price,
                'location': prop.location,
                'property_type': prop.property_type,
                'bedrooms': prop.bedrooms,
                'bathrooms': prop.bathrooms,
                'area': prop.area,
                'thumbnail': first_photo.photo_url if first_photo else None
            })
        
        return {
            'success': True,
            'properties': properties_list,
            'total': len(properties_list)
        }
        
    except Exception as e:
        return {
            'success': False,
            'message': f'Search failed: {str(e)}'
        }

"""
Favorites API endpoints
"""
from pyramid.view import view_config
from pyramid.response import Response
import json

from ..models import Favorite, Property, PropertyPhoto, User


@view_config(route_name='add_favorite', renderer='json', request_method='POST')
def add_favorite(request):
    """
    Add property to favorites
    
    POST /api/favorites
    Body: {
        "property_id": 1
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
        
        if 'property_id' not in data:
            return {
                'success': False,
                'message': 'property_id is required'
            }
        
        property_id = data['property_id']
        
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
        
        # Check if already favorited
        existing = request.dbsession.query(Favorite)\
            .filter(Favorite.user_id == user_id, Favorite.property_id == property_id)\
            .first()
        
        if existing:
            return {
                'success': False,
                'message': 'Property already in favorites'
            }
        
        # Add to favorites
        new_favorite = Favorite(
            user_id=user_id,
            property_id=property_id
        )
        
        request.dbsession.add(new_favorite)
        request.dbsession.flush()
        
        return {
            'success': True,
            'message': 'Property added to favorites',
            'favorite': {
                'id': new_favorite.id,
                'property_id': property_id
            }
        }
        
    except Exception as e:
        return {
            'success': False,
            'message': f'Failed to add favorite: {str(e)}'
        }


@view_config(route_name='get_favorites', renderer='json', request_method='GET')
def get_favorites(request):
    """
    Get all favorites for current user
    
    GET /api/favorites
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
        
        # Get all favorites with property details
        favorites = request.dbsession.query(Favorite, Property)\
            .join(Property, Favorite.property_id == Property.id)\
            .filter(Favorite.user_id == user_id)\
            .all()
        
        favorites_list = []
        for favorite, prop in favorites:
            # Get first photo
            first_photo = request.dbsession.query(PropertyPhoto)\
                .filter(PropertyPhoto.property_id == prop.id)\
                .first()
            
            favorites_list.append({
                'id': favorite.id,
                'created_at': favorite.created_at.isoformat() if favorite.created_at else None,
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
                    'thumbnail': first_photo.photo_url if first_photo else None,
                    'agent': {
                        'id': prop.agent.id,
                        'name': prop.agent.name,
                        'phone': prop.agent.phone
                    }
                }
            })
        
        return {
            'success': True,
            'favorites': favorites_list,
            'total': len(favorites_list)
        }
        
    except Exception as e:
        return {
            'success': False,
            'message': f'Failed to get favorites: {str(e)}'
        }


@view_config(route_name='remove_favorite', renderer='json', request_method='DELETE')
def remove_favorite(request):
    """
    Remove property from favorites
    
    DELETE /api/favorites/{id}
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
        
        favorite_id = request.matchdict['id']
        
        # Get favorite
        favorite = request.dbsession.query(Favorite)\
            .filter(Favorite.id == favorite_id)\
            .first()
        
        if not favorite:
            return Response(
                json.dumps({'success': False, 'message': 'Favorite not found'}),
                status=404,
                content_type='application/json'
            )
        
        # Check if user is owner
        if favorite.user_id != user_id:
            return Response(
                json.dumps({'success': False, 'message': 'You can only remove your own favorites'}),
                status=403,
                content_type='application/json'
            )
        
        # Delete favorite
        request.dbsession.delete(favorite)
        
        return {
            'success': True,
            'message': 'Favorite removed successfully'
        }
        
    except Exception as e:
        return {
            'success': False,
            'message': f'Failed to remove favorite: {str(e)}'
        }

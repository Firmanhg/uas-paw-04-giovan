from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import SQLAlchemyError
from ..models.property import Property
from ..models.user import User
import json


@view_config(route_name='properties', renderer='json', request_method='OPTIONS')
@view_config(route_name='property_detail', renderer='json', request_method='OPTIONS')
def cors_options(request):
    """Handle CORS preflight OPTIONS request"""
    return {}


@view_config(route_name='properties', renderer='json', request_method='POST')
def create_property(request):
    """
    Create new property by agent
    Agent bisa menambahkan properti baru ke database
    """
    try:
        # Parse JSON body
        data = request.json_body
        
        # Validasi required fields
        required_fields = ['title', 'description', 'price', 'property_type', 'location']
        for field in required_fields:
            if field not in data:
                return Response(
                    json={"error": f"Field '{field}' is required"},
                    status=400
                )
        
        # TODO: Get agent_id from session
        # Untuk sekarang, kita akan menggunakan agent_id dari body request
        # atau default agent_id = 1
        agent_id = data.get('agent_id', 1)
        
        # Validasi agent_id exists dan role adalah agent
        dbsession = request.dbsession
        agent = dbsession.query(User).filter_by(id=agent_id).first()
        
        if not agent:
            return Response(
                json={"error": "Agent not found"},
                status=404
            )
        
        if agent.role != 'agent':
            return Response(
                json={"error": "Only agents can create properties"},
                status=403
            )
        
        # Create new property
        new_property = Property(
            title=data['title'],
            description=data['description'],
            price=data['price'],
            property_type=data['property_type'],
            listing_type=data.get('listing_type', 'sale'),  # sale or rent
            location=data['location'],
            bedrooms=data.get('bedrooms', 1),
            bathrooms=data.get('bathrooms', 1),
            area=data.get('area', 0),
            agent_id=agent_id,
            images=data.get('images'),  # Support multiple images
            img=data.get('img')  # Legacy single image support
        )
        
        # Save to database
        dbsession.add(new_property)
        dbsession.flush()  # Flush to get the ID
        
        # Return success response
        return {
            "status": "success",
            "message": "Property created successfully",
            "data": {
                "id": new_property.id,
                "title": new_property.title,
                "description": new_property.description,
                "price": new_property.price,
                "property_type": new_property.property_type,
                "location": new_property.location,
                "bedrooms": new_property.bedrooms,
                "bathrooms": new_property.bathrooms,
                "area": new_property.area,
                "agent_id": new_property.agent_id,
                "agent": {
                    "id": agent.id,
                    "name": agent.name,
                    "email": agent.email
                }
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


@view_config(route_name='properties', renderer='json', request_method='GET')
def list_properties(request):
    """
    Get list of all properties with filtering support
    
    Query parameters:
    - min_price: Minimum price
    - max_price: Maximum price
    - property_type: Type of property (house, apartment, etc)
    - location: Location (partial match)
    - min_bedrooms: Minimum number of bedrooms
    - max_bedrooms: Maximum number of bedrooms
    - min_bathrooms: Minimum number of bathrooms
    - agent_id: Filter by agent ID
    """
    try:
        dbsession = request.dbsession
        
        # Start with base query
        query = dbsession.query(Property)
        
        # Apply filters based on query parameters
        
        # Filter by price range
        min_price = request.params.get('min_price')
        if min_price:
            try:
                query = query.filter(Property.price >= int(min_price))
            except ValueError:
                pass
        
        max_price = request.params.get('max_price')
        if max_price:
            try:
                query = query.filter(Property.price <= int(max_price))
            except ValueError:
                pass
        
        # Filter by property type
        property_type = request.params.get('property_type')
        if property_type:
            query = query.filter(Property.property_type.ilike(f'%{property_type}%'))
        
        # Filter by location (partial match)
        location = request.params.get('location')
        if location:
            query = query.filter(Property.location.ilike(f'%{location}%'))
        
        # Filter by bedrooms
        min_bedrooms = request.params.get('min_bedrooms')
        if min_bedrooms:
            try:
                query = query.filter(Property.bedrooms >= int(min_bedrooms))
            except ValueError:
                pass
        
        max_bedrooms = request.params.get('max_bedrooms')
        if max_bedrooms:
            try:
                query = query.filter(Property.bedrooms <= int(max_bedrooms))
            except ValueError:
                pass
        
        # Filter by bathrooms
        min_bathrooms = request.params.get('min_bathrooms')
        if min_bathrooms:
            try:
                query = query.filter(Property.bathrooms >= int(min_bathrooms))
            except ValueError:
                pass
        
        # Filter by agent ID
        agent_id = request.params.get('agent_id')
        if agent_id:
            try:
                query = query.filter(Property.agent_id == int(agent_id))
            except ValueError:
                pass
        
        # Execute query
        properties = query.all()
        
        result = []
        for prop in properties:
            result.append({
                "id": prop.id,
                "title": prop.title,
                "description": prop.description,
                "price": prop.price,
                "property_type": prop.property_type,
                "listing_type": prop.listing_type if hasattr(prop, 'listing_type') else 'sale',
                "location": prop.location,
                "bedrooms": prop.bedrooms,
                "bathrooms": prop.bathrooms,
                "area": prop.area,
                "agent_id": prop.agent_id,
                "images": prop.images,  # Include images array
                "img": prop.img,  # Legacy single image
                "agent": {
                    "id": prop.agent.id,
                    "name": prop.agent.name,
                    "email": prop.agent.email
                } if prop.agent else None
            })
        
        return {
            "status": "success",
            "count": len(result),
            "filters_applied": {
                "min_price": min_price,
                "max_price": max_price,
                "property_type": property_type,
                "location": location,
                "min_bedrooms": min_bedrooms,
                "max_bedrooms": max_bedrooms,
                "min_bathrooms": min_bathrooms,
                "agent_id": agent_id
            },
            "data": result
        }
        
    except Exception as e:
        return Response(
            json={"error": "Internal server error", "details": str(e)},
            status=500
        )


@view_config(route_name='property_detail', renderer='json', request_method='GET')
def get_property_detail(request):
    """
    Get property detail by ID
    """
    try:
        property_id = request.matchdict['id']
        dbsession = request.dbsession
        
        prop = dbsession.query(Property).filter_by(id=property_id).first()
        
        if not prop:
            return Response(
                json={"error": "Property not found"},
                status=404
            )
        
        return {
            "status": "success",
            "data": {
                "id": prop.id,
                "title": prop.title,
                "description": prop.description,
                "price": prop.price,
                "property_type": prop.property_type,
                "listing_type": prop.listing_type if hasattr(prop, 'listing_type') else 'sale',
                "location": prop.location,
                "bedrooms": prop.bedrooms,
                "bathrooms": prop.bathrooms,
                "area": prop.area,
                "agent_id": prop.agent_id,
                "images": prop.images,  # Include images array
                "img": prop.img,  # Legacy single image
                "agent": {
                    "id": prop.agent.id,
                    "name": prop.agent.name,
                    "email": prop.agent.email
                } if prop.agent else None
            }
        }
        
    except Exception as e:
        return Response(
            json={"error": "Internal server error", "details": str(e)},
            status=500
        )


@view_config(route_name='property_detail', renderer='json', request_method='PUT')
def update_property(request):
    """
    Update property by ID (agent only)
    Hanya agent yang memiliki property ini yang bisa mengupdate
    """
    try:
        property_id = request.matchdict['id']
        data = request.json_body
        dbsession = request.dbsession
        
        # Get property from database
        prop = dbsession.query(Property).filter_by(id=property_id).first()
        
        if not prop:
            return Response(
                json={"error": "Property not found"},
                status=404
            )
        
        # TODO: Get agent_id from session
        # Untuk sekarang, ambil dari body atau gunakan agent_id yang ada
        agent_id = data.get('agent_id', prop.agent_id)
        
        # Validasi: hanya agent pemilik property yang bisa update
        if prop.agent_id != agent_id:
            return Response(
                json={"error": "You are not authorized to update this property"},
                status=403
            )
        
        # Update fields yang dikirim
        if 'title' in data:
            prop.title = data['title']
        if 'description' in data:
            prop.description = data['description']
        if 'price' in data:
            prop.price = data['price']
        if 'property_type' in data:
            prop.property_type = data['property_type']
        if 'listing_type' in data:
            prop.listing_type = data['listing_type']
        if 'location' in data:
            prop.location = data['location']
        if 'bedrooms' in data:
            prop.bedrooms = data['bedrooms']
        if 'bathrooms' in data:
            prop.bathrooms = data['bathrooms']
        if 'area' in data:
            prop.area = data['area']
        if 'images' in data:
            prop.images = data['images']
        if 'img' in data:
            prop.img = data['img']
        
        # Flush untuk memastikan perubahan tersimpan
        dbsession.flush()
        
        return {
            "status": "success",
            "message": "Property updated successfully",
            "data": {
                "id": prop.id,
                "title": prop.title,
                "description": prop.description,
                "price": prop.price,
                "property_type": prop.property_type,
                "location": prop.location,
                "bedrooms": prop.bedrooms,
                "bathrooms": prop.bathrooms,
                "area": prop.area,
                "agent_id": prop.agent_id,
                "agent": {
                    "id": prop.agent.id,
                    "name": prop.agent.name,
                    "email": prop.agent.email
                } if prop.agent else None
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


@view_config(route_name='property_detail', renderer='json', request_method='DELETE')
def delete_property(request):
    """
    Delete property by ID (agent only)
    Hanya agent yang memiliki property ini yang bisa menghapus
    """
    try:
        property_id = request.matchdict['id']
        dbsession = request.dbsession
        
        # Get property from database
        prop = dbsession.query(Property).filter_by(id=property_id).first()
        
        if not prop:
            return Response(
                json={"error": "Property not found"},
                status=404
            )
        
        # TODO: Get agent_id from session
        # Untuk sekarang, ambil dari query parameter
        agent_id_str = request.params.get('agent_id')
        
        if not agent_id_str:
            return Response(
                json={"error": "Agent ID is required"},
                status=400
            )
        
        try:
            agent_id = int(agent_id_str)
        except ValueError:
            return Response(
                json={"error": "Invalid agent ID"},
                status=400
            )
        
        # Validasi: hanya agent pemilik property yang bisa delete
        if prop.agent_id != agent_id:
            return Response(
                json={"error": "You are not authorized to delete this property"},
                status=403
            )
        
        # Simpan data property untuk response
        property_data = {
            "id": prop.id,
            "title": prop.title,
            "agent_id": prop.agent_id
        }
        
        # Delete property
        dbsession.delete(prop)
        dbsession.flush()
        
        return {
            "status": "success",
            "message": "Property deleted successfully",
            "data": property_data
        }
        
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

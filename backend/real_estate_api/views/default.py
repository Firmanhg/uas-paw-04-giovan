from pyramid.view import view_config
from pyramid.response import Response

@view_config(route_name='home', renderer='json')
def home_view(request):
    return {
        "message": "API Real Estate - Iterasi 1",
        "status": "success"
    }

# Contoh: daftar user (untuk otentikasi)
@view_config(route_name='users', renderer='json', request_method='GET')
def list_users(request):
    return [
        {
            "id": 1,
            "name": "Agus Agent",
            "email": "agus@example.com",
            "role": "agent"
        },
        {
            "id": 2,
            "name": "Budi Buyer",
            "email": "budi@example.com",
            "role": "buyer"
        }
    ]

# Contoh: daftar properti (untuk listing & filter)
@view_config(route_name='properties', renderer='json', request_method='GET')
def list_properties(request):
    # Data statis untuk iterasi 1
    properties = [
        {
            "id": 1,
            "title": "Rumah Mewah di Bandung",
            "price": 850000000,
            "location": "Bandung, Jawa Barat",
            "property_type": "rumah",
            "bedrooms": 4,
            "bathrooms": 3,
            "area": 200,
            "agent": {"name": "Agus Agent"}
        },
        {
            "id": 2,
            "title": "Apartemen di Jakarta Pusat",
            "price": 1200000000,
            "location": "Jakarta Pusat",
            "property_type": "apartemen",
            "bedrooms": 2,
            "bathrooms": 1,
            "area": 45,
            "agent": {"name": "Agus Agent"}
        }
    ]
    
    # Filter sederhana (hanya contoh logika)
    min_price = request.params.get('min_price')
    max_price = request.params.get('max_price')
    if min_price:
        properties = [p for p in properties if p['price'] >= int(min_price)]
    if max_price:
        properties = [p for p in properties if p['price'] <= int(max_price)]
    
    return properties

# Contoh: detail properti
@view_config(route_name='property_detail', renderer='json', request_method='GET')
def property_detail(request):
    prop_id = request.matchdict['id']
    # Cari properti berdasarkan ID (data statis)
    properties = [
        {
            "id": 1,
            "title": "Rumah Mewah di Bandung",
            "description": "Rumah mewah dengan kolam renang dan taman luas.",
            "price": 850000000,
            "location": "Bandung, Jawa Barat",
            "property_type": "rumah",
            "bedrooms": 4,
            "bathrooms": 3,
            "area": 200,
            "images": [
                "https://example.com/image1.jpg",
                "https://example.com/image2.jpg"
            ],
            "agent": {
                "name": "Agus Agent",
                "email": "agus@example.com"
            }
        }
    ]
    for prop in properties:
        if prop['id'] == int(prop_id):
            return prop
    return {"error": "Property not found"}, 404
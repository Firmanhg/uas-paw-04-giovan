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
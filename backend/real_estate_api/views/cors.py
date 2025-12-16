"""
CORS handler for preflight requests
"""
from pyramid.view import view_config
from pyramid.response import Response


@view_config(route_name='cors_register', renderer='json')
@view_config(route_name='cors_login', renderer='json')
@view_config(route_name='cors_logout', renderer='json')
@view_config(route_name='cors_me', renderer='json')
def cors_preflight(request):
    """
    Handle CORS preflight OPTIONS requests
    """
    response = Response()
    response.status = 200
    response.headers.update({
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '3600',
    })
    return response

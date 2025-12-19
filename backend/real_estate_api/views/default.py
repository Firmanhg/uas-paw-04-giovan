from pyramid.view import view_config
from pyramid.response import Response

# CORS preflight handler for create inquiry
@view_config(route_name='cors_create_inquiry', request_method='OPTIONS')
def cors_create_inquiry(request):
    """Handle CORS preflight for create inquiry"""
    response = Response()
    response.status = '200 OK'
    response.headers.update({
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '3600'
    })
    return response

@view_config(route_name='home', renderer='json')
def home_view(request):
    """API health check endpoint"""
    return {
        "message": "Real Estate API",
        "status": "success",
        "version": "1.0"
    }

# CORS preflight handler for agent profile
@view_config(route_name='cors_agent_profile', request_method='OPTIONS')
def cors_agent_profile(request):
    """Handle CORS preflight for agent profile"""
    response = Response()
    response.status = '200 OK'
    return response

# TODO: Old dummy endpoints removed - now using real database endpoints
# See views/property.py for actual property endpoints

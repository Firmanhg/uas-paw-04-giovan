from pyramid.view import view_config
from pyramid.response import Response

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

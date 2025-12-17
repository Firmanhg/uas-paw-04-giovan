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

# TODO: Old dummy endpoints removed - now using real database endpoints
# See views/property.py for actual property endpoints

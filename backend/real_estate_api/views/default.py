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

# TODO: Implement real property CRUD endpoints with database integration
# - GET /api/properties - List properties with filters
# - GET /api/properties/{id} - Get property detail
# - POST /api/properties - Create property (agent only)
# - PUT /api/properties/{id} - Update property (agent only)
# - DELETE /api/properties/{id} - Delete property (agent only)
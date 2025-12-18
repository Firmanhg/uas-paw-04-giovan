def includeme(config):
    config.add_route('home', '/')
    
    # CORS preflight routes - must be before other routes
    config.add_route('cors_register', '/api/register', request_method='OPTIONS')
    config.add_route('cors_login', '/api/login', request_method='OPTIONS')
    config.add_route('cors_logout', '/api/logout', request_method='OPTIONS')
    config.add_route('cors_me', '/api/me', request_method='OPTIONS')
    
    # Authentication routes
    config.add_route('register', '/api/register')
    config.add_route('login', '/api/login')
    config.add_route('logout', '/api/logout')
    config.add_route('me', '/api/me')
    
    # Agent Dashboard routes
    config.add_route('agent_stats', '/api/agent/stats')
    config.add_route('agent_properties', '/api/agent/properties')
    config.add_route('agent_inquiries', '/api/agent/inquiries')
    
    # Property routes
    config.add_route('properties', '/api/properties')  # GET & POST
    config.add_route('property_detail', '/api/properties/{id}')  # GET, PUT, DELETE
    config.add_route('search_properties', '/api/properties/search')
    
    # Favorites routes
    config.add_route('add_favorite', '/api/favorites', request_method='POST')
    config.add_route('get_favorites', '/api/favorites', request_method='GET')
    config.add_route('remove_favorite', '/api/favorites/{id}', request_method='DELETE')
    
    # Inquiry routes
    config.add_route('create_inquiry', '/api/inquiries', request_method='POST')
    config.add_route('get_buyer_inquiries', '/api/inquiries/buyer')
    config.add_route('get_all_inquiries', '/api/inquiries', request_method='GET')
    
    # Users route (if needed)
    config.add_route('users', '/api/users')  
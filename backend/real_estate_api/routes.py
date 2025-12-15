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
    
    # TODO: Add property CRUD routes when implemented
    # config.add_route('properties', '/api/properties')
    # config.add_route('property_detail', '/api/properties/{id}')  
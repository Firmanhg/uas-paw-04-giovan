def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
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
    
    # API routes
    config.add_route('users', '/api/users')  
    config.add_route('properties', '/api/properties')  
    config.add_route('property_detail', '/api/properties/{id}')  
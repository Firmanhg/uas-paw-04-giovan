def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_static_view('uploads', 'uploads', cache_max_age=3600)
    config.add_route('home', '/')
    
    # CORS preflight routes - must be before other routes
    config.add_route('cors_register', '/api/auth/register', request_method='OPTIONS')
    config.add_route('cors_login', '/api/auth/login', request_method='OPTIONS')
    config.add_route('cors_logout', '/api/auth/logout', request_method='OPTIONS')
    config.add_route('cors_me', '/api/auth/me', request_method='OPTIONS')
    
    # Authentication routes
    config.add_route('register', '/api/auth/register')
    config.add_route('login', '/api/auth/login')
    config.add_route('logout', '/api/auth/logout')
    config.add_route('me', '/api/auth/me')
    
    # Agent routes
    config.add_route('cors_agent_profile', '/api/agents/{id}', request_method='OPTIONS')
    config.add_route('agents_list', '/api/agents')
    config.add_route('agent_profile', '/api/agents/{id}')
    config.add_route('agent_stats', '/api/agent/stats')
    config.add_route('agent_properties', '/api/agent/properties')
    config.add_route('agent_inquiries', '/api/agent/inquiries')
    
    # Property routes
    config.add_route('properties', '/api/properties')  # GET & POST
    config.add_route('featured_properties', '/api/properties/featured')  # GET featured
    config.add_route('search_properties', '/api/properties/search')  # Search
    config.add_route('upload_photos', '/api/properties/{id}/photos')  # Upload photos
    config.add_route('property_detail', '/api/properties/{id}')  # GET, PUT, DELETE
    
    # Favorites routes
    config.add_route('cors_favorites', '/api/favorites', request_method='OPTIONS')
    config.add_route('cors_favorite_delete', '/api/favorites/{id}', request_method='OPTIONS')
    config.add_route('add_favorite', '/api/favorites', request_method='POST')
    config.add_route('get_favorites', '/api/favorites', request_method='GET')
    config.add_route('remove_favorite', '/api/favorites/{id}', request_method='DELETE')
    
    # Inquiry routes
    config.add_route('cors_create_inquiry', '/api/inquiries', request_method='OPTIONS')
    config.add_route('create_inquiry', '/api/inquiries', request_method='POST')
    config.add_route('get_buyer_inquiries', '/api/inquiries/buyer')
    config.add_route('get_all_inquiries', '/api/inquiries', request_method='GET')
    config.add_route('get_inquiry_detail', '/api/inquiries/{id}')
    
    # Chat routes — DIPERBAIKI
    config.add_route('cors_chat_messages', '/api/inquiries/{inquiry_id}/messages', request_method='OPTIONS')
    config.add_route('inquiry_messages', '/api/inquiries/{inquiry_id}/messages')  # satu route untuk GET & POST
    
    # Users route (if needed)
    config.add_route('users', '/api/users')
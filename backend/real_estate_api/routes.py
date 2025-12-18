def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('users', '/api/users')  
    config.add_route('properties', '/api/properties')  
    config.add_route('property_detail', '/api/properties/{id}')
    
    # Agent routes
    config.add_route('agents_list', '/api/agents')
    config.add_route('agent_profile', '/api/agents/{id}')  
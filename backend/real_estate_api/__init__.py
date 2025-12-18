from pyramid.config import Configurator
from pyramid.events import NewResponse
from pyramid.session import SignedCookieSessionFactory


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    # Setup session factory
    session_factory = SignedCookieSessionFactory('your_secret_session_key_here')
    
    with Configurator(settings=settings) as config:
        # Set session factory
        config.set_session_factory(session_factory)
        
        config.include('pyramid_jinja2')
        config.include('pyramid_tm')
        config.include('.models')
        config.include('.routes')
        
        # Enable CORS for frontend with credentials
        def add_cors_headers(event):
            response = event.response
            response.headers.update({
                'Access-Control-Allow-Origin': 'http://localhost:5173',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Max-Age': '3600'
            })
        
        config.add_subscriber(add_cors_headers, NewResponse)
        
        config.scan()
    return config.make_wsgi_app()

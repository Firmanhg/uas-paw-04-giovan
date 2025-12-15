from pyramid.config import Configurator
from pyramid.session import SignedCookieSessionFactory


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    # Setup session factory
    session_factory = SignedCookieSessionFactory('your-secret-key-change-this-in-production')
    
    with Configurator(settings=settings, session_factory=session_factory) as config:
        config.include('pyramid_jinja2')
        config.include('.routes')
        config.include('.models')
        
        # Add CORS headers to all responses
        def add_cors_headers(event):
            def cors_callback(request, response):
                response.headers.update({
                    'Access-Control-Allow-Origin': 'http://localhost:5173',
                    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                    'Access-Control-Allow-Credentials': 'true',
                })
            event.request.add_response_callback(cors_callback)
        
        config.add_subscriber(add_cors_headers, 'pyramid.events.NewRequest')
        
        config.scan()
    return config.make_wsgi_app()

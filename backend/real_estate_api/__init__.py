from pyramid.config import Configurator
from pyramid.events import NewResponse


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('.routes')
        config.include('.models')
        
        # Enable CORS for frontend
        def add_cors_headers(event):
            response = event.response
            response.headers.update({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '3600'
            })
        
        config.add_subscriber(add_cors_headers, NewResponse)
        
        config.scan()
    return config.make_wsgi_app()

from pyramid.config import Configurator
from pyramid.events import NewResponse
from pyramid.session import SignedCookieSessionFactory
import socketio
import eventlet


# Initialize Socket.IO server
sio = socketio.Server(cors_allowed_origins='http://localhost:5173', async_mode='eventlet')

# Socket.IO event handlers
@sio.event
def connect(sid, environ):
    print(f'Client connected: {sid}')

@sio.event
def disconnect(sid):
    print(f'Client disconnected: {sid}')

@sio.event
def join_inquiry(sid, data):
    inquiry_id = data.get('inquiry_id')
    if inquiry_id:
        sio.enter_room(sid, f'inquiry_{inquiry_id}')
        print(f'Client {sid} joined inquiry room {inquiry_id}')

@sio.event
def leave_inquiry(sid, data):
    inquiry_id = data.get('inquiry_id')
    if inquiry_id:
        sio.leave_room(sid, f'inquiry_{inquiry_id}')
        print(f'Client {sid} left inquiry room {inquiry_id}')

@sio.event
def chat_message(sid, data):
    inquiry_id = data.get('inquiry_id')
    if inquiry_id:
        # Broadcast to all clients in the inquiry room (except sender)
        sio.emit('chat_message', data, room=f'inquiry_{inquiry_id}', skip_sid=sid)
        print(f'Message from {sid} in inquiry {inquiry_id}: {data.get("message")}')


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
    
    # Wrap Pyramid app with Socket.IO
    pyramid_app = config.make_wsgi_app()
    app = socketio.WSGIApp(sio, pyramid_app)
    
    return app

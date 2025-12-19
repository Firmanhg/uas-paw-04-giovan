import eventlet
import eventlet.wsgi
from pyramid.paster import get_app

if __name__ == "__main__":
    app = get_app("development.ini", "main")
    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 6543)), app)
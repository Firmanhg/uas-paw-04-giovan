"""
Authentication views for login and register
"""
from pyramid.view import view_config
from pyramid.response import Response
import json
from sqlalchemy.exc import IntegrityError

from ..models.user import User
from ..auth import hash_password, verify_password, generate_token


@view_config(route_name='register', renderer='json', request_method='POST')
def register(request):
    """
    Register a new user (buyer or agent)
    
    POST /api/register
    Body: {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123",
        "role": "buyer",  # or "agent"
        "phone": "081234567890"
    }
    """
    try:
        data = request.json_body
        
        # Validate required fields
        required_fields = ['name', 'email', 'password', 'role']
        for field in required_fields:
            if field not in data or not data[field]:
                return {
                    'success': False,
                    'message': f'Field {field} is required'
                }
        
        # Validate role
        if data['role'] not in ['buyer', 'agent']:
            return {
                'success': False,
                'message': 'Role must be either buyer or agent'
            }
        
        # Validate email format (basic)
        if '@' not in data['email']:
            return {
                'success': False,
                'message': 'Invalid email format'
            }
        
        # Check if email already exists
        dbsession = request.dbsession
        existing_user = dbsession.query(User).filter(User.email == data['email']).first()
        if existing_user:
            return {
                'success': False,
                'message': 'Email already registered'
            }
        
        # Hash password
        hashed_password = hash_password(data['password'])
        
        # Create new user
        new_user = User(
            name=data['name'],
            email=data['email'],
            password_hash=hashed_password,
            role=data['role'],
            phone=data.get('phone', '')
        )
        
        dbsession.add(new_user)
        dbsession.flush()
        
        return {
            'success': True,
            'message': 'User registered successfully',
            'user': {
                'id': new_user.id,
                'name': new_user.name,
                'email': new_user.email,
                'role': new_user.role,
                'phone': new_user.phone
            }
        }
        
    except Exception as e:
        request.dbsession.rollback()
        return {
            'success': False,
            'message': f'Error registering user: {str(e)}'
        }


@view_config(route_name='login', renderer='json', request_method='POST')
def login(request):
    """
    Login user and create session
    
    POST /api/login
    Body: {
        "email": "john@example.com",
        "password": "password123"
    }
    """
    try:
        data = request.json_body
        
        # Validate required fields
        if 'email' not in data or 'password' not in data:
            return {
                'success': False,
                'message': 'Email and password are required'
            }
        
        # Find user by email
        dbsession = request.dbsession
        user = dbsession.query(User).filter(User.email == data['email']).first()
        
        if not user:
            return {
                'success': False,
                'message': 'Invalid email or password'
            }
        
        # Verify password
        if not verify_password(data['password'], user.password_hash):
            return {
                'success': False,
                'message': 'Invalid email or password'
            }
        
        # Generate session token
        token = generate_token()
        
        # Store token in session (you can also use JWT)
        request.session['user_id'] = user.id
        request.session['token'] = token
        
        return {
            'success': True,
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'role': user.role,
                'phone': user.phone
            },
            'token': token
        }
        
    except Exception as e:
        return {
            'success': False,
            'message': f'Error during login: {str(e)}'
        }


@view_config(route_name='logout', renderer='json', request_method='POST')
def logout(request):
    """
    Logout user and clear session
    
    POST /api/logout
    """
    try:
        # Clear session
        request.session.invalidate()
        
        return {
            'success': True,
            'message': 'Logout successful'
        }
        
    except Exception as e:
        return {
            'success': False,
            'message': f'Error during logout: {str(e)}'
        }


@view_config(route_name='me', renderer='json', request_method='GET')
def get_current_user(request):
    """
    Get current logged in user info
    
    GET /api/me
    """
    try:
        # Check if user is logged in
        user_id = request.session.get('user_id')
        
        if not user_id:
            return {
                'success': False,
                'message': 'Not authenticated'
            }
        
        # Get user from database
        dbsession = request.dbsession
        user = dbsession.query(User).filter(User.id == user_id).first()
        
        if not user:
            return {
                'success': False,
                'message': 'User not found'
            }
        
        return {
            'success': True,
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'role': user.role,
                'phone': user.phone
            }
        }
        
    except Exception as e:
        return {
            'success': False,
            'message': f'Error getting user info: {str(e)}'
        }

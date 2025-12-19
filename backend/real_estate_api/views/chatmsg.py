"""
Chat API endpoints for real-time messaging
"""
print("[debug] loading chatmsg.py")
from pyramid.view import view_config
from pyramid.response import Response
import json

from ..models import User, Inquiry, Property, ChatMessage


@view_config(route_name='inquiry_messages', request_method='GET', renderer='json')
def get_chat_messages(request):
    try:
        print(f"[debug] get_chat_messages called: method={request.method} matchdict={getattr(request, 'matchdict', None)}")
        user_id = request.session.get('user_id')
        if not user_id:
            return Response(
                json.dumps({'success': False, 'message': 'Unauthorized'}),
                status=401,
                content_type='application/json; charset=utf-8'
            )
        inquiry_id = request.matchdict['inquiry_id']
        inquiry = request.dbsession.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
        if not inquiry:
            return Response(
                json.dumps({'success': False, 'message': 'Inquiry not found'}),
                status=404,
                content_type='application/json; charset=utf-8'
            )
        property_obj = request.dbsession.query(Property).filter(Property.id == inquiry.property_id).first()
        if not property_obj:
            return Response(
                json.dumps({'success': False, 'message': 'Property not found'}),
                status=404,
                content_type='application/json; charset=utf-8'
            )
        if inquiry.buyer_id != user_id and property_obj.agent_id != user_id:
            return Response(
                json.dumps({'success': False, 'message': 'Access denied'}),
                status=403,
                content_type='application/json; charset=utf-8'
            )
        messages = request.dbsession.query(ChatMessage, User)\
            .join(User, ChatMessage.sender_id == User.id)\
            .filter(ChatMessage.inquiry_id == inquiry_id)\
            .order_by(ChatMessage.timestamp)\
            .all()
        messages_list = []
        for message, sender in messages:
            messages_list.append({
                'id': message.id,
                'message': message.message,
                'timestamp': message.timestamp.isoformat() if message.timestamp else None,
                'message_type': message.message_type,
                'sender': {
                    'id': sender.id,
                    'name': sender.name,
                    'role': sender.role
                }
            })
        return {
            'success': True,
            'messages': messages_list,
            'total': len(messages_list)
        }
    except Exception as e:
        # ✅ PERBAIKAN: return Response dengan status 500 dan charset
        return Response(
            json.dumps({'success': False, 'message': f'Failed to get chat messages: {str(e)}'}),
            status=500,
            content_type='application/json; charset=utf-8'
        )


@view_config(route_name='inquiry_messages', request_method='POST', renderer='json')
def send_chat_message(request):
    try:
        print(f"[debug] send_chat_message called: method={request.method} matchdict={getattr(request, 'matchdict', None)}")
        user_id = request.session.get('user_id')
        if not user_id:
            return Response(
                json.dumps({'success': False, 'message': 'Unauthorized'}),
                status=401,
                content_type='application/json; charset=utf-8'
            )
        inquiry_id = request.matchdict['inquiry_id']
        data = request.json_body
        if 'message' not in data:
            # ✅ Juga perbaiki ini: return Response
            return Response(
                json.dumps({'success': False, 'message': 'message is required'}),
                status=400,
                content_type='application/json; charset=utf-8'
            )
        message_text = data['message']
        message_type = data.get('message_type', 'text')
        inquiry = request.dbsession.query(Inquiry).filter(Inquiry.id == inquiry_id).first()
        if not inquiry:
            return Response(
                json.dumps({'success': False, 'message': 'Inquiry not found'}),
                status=404,
                content_type='application/json; charset=utf-8'
            )
        property_obj = request.dbsession.query(Property).filter(Property.id == inquiry.property_id).first()
        if not property_obj:
            return Response(
                json.dumps({'success': False, 'message': 'Property not found'}),
                status=404,
                content_type='application/json; charset=utf-8'
            )
        if inquiry.buyer_id != user_id and property_obj.agent_id != user_id:
            return Response(
                json.dumps({'success': False, 'message': 'Access denied'}),
                status=403,
                content_type='application/json; charset=utf-8'
            )
        new_message = ChatMessage(
            inquiry_id=inquiry_id,
            sender_id=user_id,
            message=message_text,
            message_type=message_type
        )
        request.dbsession.add(new_message)
        request.dbsession.flush()
        sender = request.dbsession.query(User).filter(User.id == user_id).first()
        return {
            'success': True,
            'message': 'Message sent successfully',
            'chat_message': {
                'id': new_message.id,
                'message': message_text,
                'timestamp': new_message.timestamp.isoformat() if new_message.timestamp else None,
                'message_type': message_type,
                'sender': {
                    'id': sender.id,
                    'name': sender.name,
                    'role': sender.role
                }
            }
        }
    except Exception as e:
        request.dbsession.rollback()
        # ✅ PERBAIKAN: return Response
        return Response(
            json.dumps({'success': False, 'message': f'Failed to send message: {str(e)}'}),
            status=500,
            content_type='application/json; charset=utf-8'
        )
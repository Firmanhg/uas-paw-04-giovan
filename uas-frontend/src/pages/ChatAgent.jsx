import { useLocation, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUser } from '../services/authService';
import { getChatMessages, sendChatMessage } from '../services/api';
import io from 'socket.io-client';

export default function ChatAgent() {
  const { buyerId } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const currentUser = getCurrentUser();

  useEffect(() => {
    fetchInquiryAndMessages();
    const newSocket = io('http://localhost:6543');
    setSocket(newSocket);
<<<<<<< HEAD
    
    // Join inquiry room
    newSocket.emit('join_inquiry', { inquiry_id: buyerId });
=======

    newSocket.emit('join_inquiry', buyerId);
>>>>>>> fbdbe9ec12b15a1619fc2cc2ed7f425b8dc2c8d4
    
    newSocket.on('chat_message', (message) => {
      setMessages(prev => [...prev, message]);
    });
    
    return () => {
      newSocket.disconnect();
    };
  }, [buyerId]);

  const fetchInquiryAndMessages = async () => {
    try {
      setLoading(true);
      
      const mockInquiry = {
        id: buyerId,
        buyer: {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com'
        },
        property: {
          id: 1,
          title: 'Modern Villa on Hilltop'
        }
      };
      setInquiry(mockInquiry);

      const messagesResponse = await getChatMessages(buyerId);
      if (messagesResponse.data.success) {
        setMessages(messagesResponse.data.messages || []);
      }
      
      // Debug: Log current user
      console.log('Current User:', currentUser);
      console.log('Current User ID:', currentUser?.id);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching chat data:', error);
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !socket) return;

    try {
      const messageData = {
        inquiry_id: buyerId,
        message: input.trim(),
        sender_id: currentUser.id
      };

      await sendChatMessage(buyerId, { message: input.trim() });
<<<<<<< HEAD

      // Tambahkan ke state messages secara lokal (langsung tampil)
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          message: input.trim(),
          sender_id: currentUser.id,
          timestamp: new Date().toISOString(),
          sender: { id: currentUser.id, name: currentUser.name, role: currentUser.role }
        }
      ]);

      // Emit via Socket.IO
=======
  
>>>>>>> fbdbe9ec12b15a1619fc2cc2ed7f425b8dc2c8d4
      socket.emit('chat_message', messageData);

      setInput("");
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg text-gray-900">
            Chat with {inquiry?.buyer?.name || 'Buyer'}
          </h2>
          <p className="text-sm text-gray-500">
            Property: {inquiry?.property?.title || 'Loading...'}
          </p>
        </div>

        <Link
          to="/dashboard"
          className="text-sm text-slate-600 hover:text-slate-900 font-medium"
        >
          Back to Dashboard
        </Link>
      </div>

<<<<<<< HEAD
      {/* CHAT BODY */}
      <div className="flex-1 px-6 py-6 flex flex-col gap-4 overflow-y-auto">
=======
      {}
      <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
>>>>>>> fbdbe9ec12b15a1619fc2cc2ed7f425b8dc2c8d4
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            // Debug log untuk setiap message
            console.log(`Message ${index}:`, {
              message: msg.message,
              sender_id: msg.sender_id,
              sender_id_type: typeof msg.sender_id,
              currentUser_id: currentUser?.id,
              currentUser_id_type: typeof currentUser?.id,
              isMatch: msg.sender_id === currentUser?.id,
              isMatchLoose: msg.sender_id == currentUser?.id
            });
            
            // Gunakan sender_id (dari socket) atau sender.id (dari backend)
            const senderId = msg.sender_id ?? msg.sender?.id;
            const isCurrentUser = String(senderId) === String(currentUser?.id);
            return (
              <div
                key={index}
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex flex-col max-w-[70%]">
                  <div
                    className={`px-4 py-2 rounded-lg text-sm ${
                      isCurrentUser
                        ? "bg-slate-800 text-white rounded-tr-none"
                        : "bg-white border text-gray-800 rounded-tl-none"
                    }`}
                  >
                    {msg.message}
                  </div>
                  <div className="text-xs mt-1 opacity-70 text-gray-400 px-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {}
      <div className="bg-white border-t px-6 py-4 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="bg-slate-800 text-white px-5 py-2 rounded-lg font-semibold hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>

    </div>
  );
}
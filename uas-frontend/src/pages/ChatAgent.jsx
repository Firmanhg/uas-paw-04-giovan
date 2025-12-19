import { useLocation, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentUser } from '../services/authService';
import { getChatMessages, sendChatMessage } from '../services/api';
import io from 'socket.io-client';

export default function ChatAgent() {
  const { buyerId } = useParams(); // inquiry id
  const [inquiry, setInquiry] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const currentUser = getCurrentUser();

  useEffect(() => {
    // Fetch inquiry details and chat messages
    fetchInquiryAndMessages();
    
    // Initialize Socket.IO connection
    const newSocket = io('http://localhost:6543');
    setSocket(newSocket);
    
    // Join inquiry room
    newSocket.emit('join_inquiry', buyerId);
    
    // Listen for new messages
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
      
      // For now, we'll create a mock inquiry object
      // In a real app, you'd fetch inquiry details by ID from an API endpoint
      // For demo purposes, we'll set some placeholder data
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
      
      // Fetch chat messages
      const messagesResponse = await getChatMessages(buyerId);
      if (messagesResponse.data.success) {
        setMessages(messagesResponse.data.messages || []);
      }
      
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

      // Send via API
      await sendChatMessage(buyerId, { message: input.trim() });
      
      // Emit via Socket.IO
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

      {/* HEADER */}
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

      {/* CHAT BODY */}
      <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender_id === currentUser?.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-sm px-4 py-2 rounded-lg text-sm ${
                  msg.sender_id === currentUser?.id
                    ? "bg-slate-800 text-white"
                    : "bg-white border text-gray-800"
                }`}
              >
                {msg.message}
                <div className="text-xs mt-1 opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* INPUT */}
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

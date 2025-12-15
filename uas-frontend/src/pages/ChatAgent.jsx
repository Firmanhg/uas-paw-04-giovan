import { useLocation, useParams, Link } from "react-router-dom";
import { useState } from "react";

export default function ChatAgent() {
  const { id } = useParams(); // inquiry id
  const location = useLocation();

  const buyer = location.state?.buyer || {
    name: "Unknown Buyer",
    email: "-",
  };

  const property = location.state?.property || "Unknown Property";

  const [messages, setMessages] = useState([
    {
      sender: "buyer",
      text: "Hello, I'm interested in this property.",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        sender: "agent",
        text: input,
      },
    ]);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* HEADER */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg text-gray-900">
            Chat with {buyer.name}
          </h2>
          <p className="text-sm text-gray-500">
            Property: {property}
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
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "agent" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-sm px-4 py-2 rounded-lg text-sm ${
                msg.sender === "agent"
                  ? "bg-slate-800 text-white"
                  : "bg-white border text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="bg-white border-t px-6 py-4 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
        />
        <button
          onClick={sendMessage}
          className="bg-slate-800 text-white px-5 py-2 rounded-lg font-semibold hover:bg-slate-900"
        >
          Send
        </button>
      </div>

    </div>
  );
}

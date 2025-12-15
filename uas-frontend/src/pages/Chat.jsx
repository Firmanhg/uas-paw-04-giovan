import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, PlusCircle, MoreVertical, MapPin, User } from "lucide-react";

export default function Chat() {
  const [message, setMessage] = useState("");

  // DUMMY DATA CHAT
  const chats = [
    {
      id: 1,
      sender: "me",
      text: "Selamat siang, Pak Budi. Saya lihat iklan rumah di Menteng. Apakah properti tersebut masih tersedia untuk dibeli?",
      time: "14:00",
    },
    {
      id: 2,
      sender: "agent",
      text: "Selamat siang, Betul, Pak. Properti di Menteng masih tersedia. Ada yang bisa saya bantu jelaskan lebih lanjut?",
      time: "14:02",
    },
    {
      id: 3,
      sender: "me",
      text: "Baik, terima kasih. Boleh tahu detail spesifikasi rumahnya? Seperti luas tanah, bangunan, dan jumlah kamar tidur?",
      time: "14:05",
    },
    {
      id: 4,
      sender: "agent",
      text: "Tentu, Pak. Luas tanah 300 m2, luas bangunan 250 m2, ada 4 kamar tidur dan 3 kamar mandi. Sertifikat Hak Milik (SHM).",
      time: "14:06",
    },
    {
      id: 5,
      sender: "me",
      text: "Oke, informasinya sangat membantu. Apakah saya bisa menjadwalkan kunjungan untuk melihat langsung kondisi rumahnya?",
      time: "14:08",
    },
  ];

  const handleSend = (e) => {
    e?.preventDefault?.();
    if (!message.trim()) return;
    // for now just clear input — you can extend to add to chats state or call API
    setMessage("");
  };

  return (
    <div className="bg-white min-h-screen pt-6 pb-10 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-2xl font-bold text-slate-500 mb-6">Chat Agent</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- KOLOM KIRI: CHAT AREA --- */}
          <div className="lg:col-span-2 flex flex-col h-[700px] border border-gray-200 rounded-xl shadow-sm bg-white overflow-hidden">
            {/* 1. Chat Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100"
                    className="w-10 h-10 rounded-full object-cover"
                    alt="Agent"
                  />
                  {/* Status Indicator */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Budi Santoso</h3>
                  <p className="text-xs text-green-600 font-medium">Online</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={20} />
              </button>
            </div>

            {/* 2. Chat Messages List */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 space-y-6">
              {/* Date Separator */}
              <div className="flex justify-center">
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Hari ini</span>
              </div>

              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex flex-col max-w-[80%] ${chat.sender === "me" ? "self-end items-end" : "self-start items-start"}`}
                >
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                      ${chat.sender === "me"
                        ? "bg-slate-800 text-white rounded-tr-none"
                        : "bg-white border border-gray-200 text-slate-700 rounded-tl-none"
                      }`}
                  >
                    {chat.text}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1">
                    {chat.time}
                  </span>
                </div>
              ))}
            </div>

            {/* 3. Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center gap-3">
                <button type="button" className="text-gray-400 hover:text-slate-800 transition">
                  <PlusCircle size={24} />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ketik pesan Anda..."
                  className="flex-1 bg-gray-100 border-none rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-slate-200 text-sm"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition"
                >
                  <Send size={16} />
                  Kirim
                </button>
              </div>
            </form>
          </div>

          {/* --- KOLOM KANAN: SIDEBAR INFO --- */}
          <div className="lg:col-span-1 space-y-6">
            {/* 1. Detail Properti Card */}
            <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white">
              <h3 className="font-bold text-slate-900 mb-4">Detail Properti</h3>

              <div className="rounded-lg overflow-hidden h-40 mb-4 relative">
                <img
                  src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600"
                  className="w-full h-full object-cover"
                  alt="Rumah Menteng"
                />
                <span className="absolute bottom-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                  Dijual
                </span>
              </div>

              <h4 className="font-bold text-slate-900">Rumah di Menteng</h4>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <MapPin size={12} /> Jakarta Pusat, DKI Jakarta
              </p>
              <p className="text-slate-900 font-bold text-lg mt-3">Rp 15.000.000.000</p>
            </div>

            {/* 2. Informasi Agen Card */}
            <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white text-center">
              <h3 className="font-bold text-slate-900 mb-4 text-left">Informasi Agen</h3>

              <div className="flex flex-col items-center">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                  className="w-20 h-20 rounded-full object-cover mb-3 ring-4 ring-gray-50"
                  alt="Agent Profile"
                />
                <h4 className="font-bold text-lg text-slate-900">Budi Santoso</h4>
                <p className="text-sm text-gray-500 mb-5">Agen Properti</p>

                <button className="w-full bg-gray-100 hover:bg-gray-200 text-slate-800 py-2.5 rounded-lg text-sm font-semibold transition">
                  Lihat Profil
                </button>
              </div>
            </div>
          </div>
<<<<<<< Updated upstream
=======


          {/* --- KOLOM KANAN: SIDEBAR INFO --- */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* 1. Detail Properti Card */}
            <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white">
              <h3 className="font-bold text-slate-900 mb-4">Detail Properti</h3>
              
              <div className="rounded-lg overflow-hidden h-40 mb-4 relative">
                <img 
                  src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  className="w-full h-full object-cover" 
                  alt="Rumah Menteng"
                />
                <span className="absolute bottom-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                  Dijual
                </span>
              </div>

              <h4 className="font-bold text-slate-900">Rumah di Menteng</h4>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <MapPin size={12} /> Jakarta Pusat, DKI Jakarta
              </p>
              <p className="text-slate-900 font-bold text-lg mt-3">Rp 15.000.000.000</p>
            </div>

            {/* 2. Informasi Agen Card */}
            <div className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white text-center">
              <h3 className="font-bold text-slate-900 mb-4 text-left">Informasi Agen</h3>
              
              <div className="flex flex-col items-center">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150" 
                  className="w-20 h-20 rounded-full object-cover mb-3 ring-4 ring-gray-50" 
                  alt="Agent Profile"
                />
                <h4 className="font-bold text-lg text-slate-900">Budi Santoso</h4>
                <p className="text-sm text-gray-500 mb-5">Agen Properti</p>
                
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-slate-800 py-2.5 rounded-lg text-sm font-semibold transition">
                  Lihat Profil
                </button>
              </div>
            </div>

          </div>

>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  );
}
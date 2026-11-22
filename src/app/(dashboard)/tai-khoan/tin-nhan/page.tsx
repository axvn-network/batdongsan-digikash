"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_CONVERSATIONS, MOCK_CHAT_MESSAGES } from "@/lib/repositories/mock-data";
import { formatPrice } from "@/lib/utils";
import { Send, CheckCircle2, Building, Phone, ShieldCheck, ArrowLeft } from "lucide-react";

export default function UserMessagesPage() {
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string>("conv-1");
  const [messages, setMessages] = useState(MOCK_CHAT_MESSAGES["conv-1"] || []);
  const [inputVal, setInputVal] = useState("");

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      conversationId: activeConvId,
      senderId: "user-regular-1",
      senderName: "Tôi",
      receiverId: activeConv.participantId,
      content: inputVal.trim(),
      isMine: true,
      createdAt: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMsg]);
    setInputVal("");

    // Simulate Agent Auto-Reply after 1.5s
    setTimeout(() => {
      const replyMsg = {
        id: `msg-reply-${Date.now()}`,
        conversationId: activeConvId,
        senderId: activeConv.participantId,
        senderName: activeConv.participantName,
        receiverId: "user-regular-1",
        content: "Dạ em đã nhận được tin nhắn! Em sẽ kiểm tra hồ sơ và phản hồi lại ngay cho anh nhé.",
        isMine: false,
        createdAt: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1500);
  };

  const selectConversation = (id: string) => {
    setActiveConvId(id);
    setMessages(MOCK_CHAT_MESSAGES[id] || []);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden h-[620px] flex flex-col md:flex-row">
      {/* Left: Conversation List */}
      <div className="w-full md:w-80 border-r border-gray-200 flex flex-col bg-gray-50/50">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="text-base font-bold text-gray-900">Hộp thư trao đổi</h2>
          <p className="text-[11px] text-gray-500 mt-0.5">Nhắn tin trực tiếp với môi giới đã xác thực</p>
        </div>

        <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => selectConversation(c.id)}
              className={`p-3.5 flex items-start space-x-3 cursor-pointer transition-colors ${
                activeConvId === c.id ? "bg-red-50/60 border-l-4 border-[#E03C31]" : "hover:bg-gray-100/60"
              }`}
            >
              <img
                src={c.participantAvatar}
                alt={c.participantName}
                className="w-11 h-11 rounded-full object-cover border border-gray-200 flex-shrink-0"
              />
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-gray-900 truncate">{c.participantName}</h4>
                  <span className="text-[10px] text-gray-400">{c.lastMessageTime}</span>
                </div>
                <p className="text-[10px] text-emerald-700 font-semibold">{c.participantRole}</p>
                <p className="text-xs text-gray-500 truncate mt-1">{c.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Active Chat Area */}
      <div className="flex-1 flex flex-col justify-between bg-white">
        {/* Top Chat Header with Property Info Context */}
        <div className="p-3.5 border-b border-gray-200 flex items-center justify-between bg-gray-50/60">
          <div className="flex items-center space-x-3">
            <img
              src={activeConv.participantAvatar}
              alt=""
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div>
              <div className="flex items-center space-x-1.5">
                <h4 className="text-xs font-bold text-gray-900">{activeConv.participantName}</h4>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <p className="text-[11px] text-emerald-700 font-medium">Đang trực tuyến • Sẵn sàng hỗ trợ</p>
            </div>
          </div>

          {/* Context Property Preview */}
          {activeConv.propertyTitle && (
            <div className="hidden sm:flex items-center space-x-2 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-xs">
              <img
                src={activeConv.propertyImage}
                alt=""
                className="w-8 h-8 rounded object-cover"
              />
              <div className="text-[11px] text-right">
                <p className="font-bold text-[#E03C31]">{activeConv.propertyPrice ? formatPrice(activeConv.propertyPrice) : ""}</p>
                <p className="text-gray-500 truncate max-w-[120px]">{activeConv.propertyTitle}</p>
              </div>
            </div>
          )}
        </div>

        {/* Message Bubble Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-gray-50/30">
          <div className="text-center my-2">
            <span className="text-[10px] bg-gray-200/60 text-gray-500 px-3 py-1 rounded-full">
              Hôm nay • Tin nhắn được bảo mật bởi DigiKash Escrow
            </span>
          </div>

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.isMine ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.isMine
                    ? "bg-[#E03C31] text-white rounded-br-xs shadow-sm"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-xs shadow-xs"
                }`}
              >
                {m.content}
              </div>
              <span className="text-[9px] text-gray-400 mt-1 px-1">{m.createdAt}</span>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 flex items-center space-x-2 bg-white">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Nhập nội dung tin nhắn hoặc câu hỏi về pháp lý, giá cả..."
            className="flex-1 p-2.5 bg-gray-100 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#E03C31] transition-all"
          />
          <button
            type="submit"
            className="p-2.5 bg-[#E03C31] hover:bg-[#B8281F] text-white rounded-xl transition-all shadow-sm flex items-center justify-center flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

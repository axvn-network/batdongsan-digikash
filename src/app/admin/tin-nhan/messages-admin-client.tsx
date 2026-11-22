"use client";

import React, { useState } from "react";
import { MessagesSquare, AlertTriangle, ShieldCheck, Eye, Trash2, X, Send } from "lucide-react";

interface FlaggedConversation {
  id: string;
  buyerName: string;
  buyerPhone: string;
  agentName: string;
  propertyTitle: string;
  flagReason: string;
  messageCount: number;
  lastMessage: string;
  lastSender: string;
  time: string;
  status: string;
}

export function MessagesAdminClient({ initialConversations }: { initialConversations: FlaggedConversation[] }) {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConv, setSelectedConv] = useState<FlaggedConversation | null>(null);

  const handleResolve = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setSelectedConv(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-base">Hội thoại bị gắn cờ ({conversations.length})</h3>
          <p className="text-xs text-gray-500">Phát hiện tự động bởi bộ lọc từ khóa đen (Blacklist)</p>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {conversations.map((c) => (
          <div key={c.id} className="p-5 hover:bg-gray-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-sm">
                  {c.buyerName} ⇄ {c.agentName}
                </span>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Cảnh báo
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">BĐS: {c.propertyTitle}</p>
              <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-xs text-gray-700 italic">
                "{c.lastMessage}"
              </div>
              <p className="text-[11px] text-rose-600 font-semibold">{c.flagReason}</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedConv(c)}
                className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Xem toàn bộ chat
              </button>
              <button
                onClick={() => handleResolve(c.id)}
                className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                Đã xử lý xong
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Preview Modal */}
      {selectedConv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">
                  Kiểm duyệt: {selectedConv.buyerName} ⇄ {selectedConv.agentName}
                </h3>
                <p className="text-xs text-gray-500">{selectedConv.propertyTitle}</p>
              </div>
              <button onClick={() => setSelectedConv(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 bg-gray-50 p-4 rounded-xl max-h-80 overflow-y-auto text-xs">
              <div className="bg-white p-3 rounded-lg border shadow-xs max-w-[85%] self-start">
                <p className="font-bold text-gray-800">{selectedConv.buyerName}:</p>
                <p className="text-gray-600 mt-0.5">Chào anh, em muốn hỏi xem căn hộ này còn không ạ?</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg border border-red-200 shadow-xs max-w-[85%] ml-auto text-right">
                <p className="font-bold text-gray-900">{selectedConv.agentName}:</p>
                <p className="text-red-900 mt-0.5">{selectedConv.lastMessage}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-gray-400">Chế độ kiểm duyệt: Chỉ đọc (Readonly)</span>
              <button
                onClick={() => handleResolve(selectedConv.id)}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
              >
                Gửi cảnh cáo & Đóng vi phạm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { PropertyUser } from "@/types";
import { Phone, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";

export function AgentContactCard({ user }: { user?: PropertyUser }) {
  const [revealed, setRevealed] = useState(false);
  const phone = user?.phone || "0912345678";
  const maskedPhone = phone.slice(0, 4) + "*** ***";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Agent details */}
      <div className="flex items-center space-x-3 pb-3 border-b border-gray-100">
        <img
          src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"}
          alt={user?.name || "Môi giới"}
          className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500/20"
        />
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-flex items-center space-x-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>Môi giới chuyên nghiệp</span>
          </span>
          <h4 className="font-bold text-gray-900 text-base mt-1">{user?.name || "Nguyễn Văn Hùng"}</h4>
          <p className="text-xs text-gray-500">Đã xác thực CCCD & Giấy phép BĐS</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={() => setRevealed(true)}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-[#00A859] hover:bg-[#008F4C] text-white font-bold text-sm rounded-xl transition-all shadow-sm"
        >
          <Phone className="w-4 h-4" />
          <span>{revealed ? phone : `${maskedPhone} • Bấm để hiện số`}</span>
        </button>

        <a
          href={`https://zalo.me/${phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center space-x-2 py-3 bg-[#0068FF] hover:bg-[#0055D4] text-white font-bold text-sm rounded-xl transition-all shadow-sm"
        >
          <span>Chat qua Zalo</span>
        </a>
      </div>

      <div className="pt-2 text-center">
        <span className="text-xs text-gray-400 flex items-center justify-center space-x-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Giao dịch an toàn qua DigiKash Escrow</span>
        </span>
      </div>
    </div>
  );
}

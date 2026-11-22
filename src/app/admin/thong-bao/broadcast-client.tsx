"use client";

import React, { useState } from "react";
import { BellRing, Send, CheckCircle2, Users, Mail, Smartphone } from "lucide-react";

interface BroadcastItem {
  id: string;
  title: string;
  audience: string;
  channel: string;
  sentAt: string;
  sentCount: number;
  openRate: string;
}

export function BroadcastClient({ initialNotifications }: { initialNotifications: BroadcastItem[] }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("ALL_AGENTS");
  const [sendEmail, setSendEmail] = useState(true);
  const [sendInApp, setSendInApp] = useState(true);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const newItem: BroadcastItem = {
      id: `notif-${Date.now()}`,
      title,
      audience: audience === "ALL_AGENTS" ? "Toàn bộ Môi giới" : "Tất cả thành viên",
      channel: `${sendInApp ? "In-App" : ""}${sendInApp && sendEmail ? " + " : ""}${sendEmail ? "Email" : ""}`,
      sentAt: new Date().toLocaleString("vi-VN"),
      sentCount: 950,
      openRate: "0%",
    };

    setNotifications([newItem, ...notifications]);
    setTitle("");
    setBody("");
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Compose Form */}
      <form onSubmit={handleSend} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
          <BellRing className="w-4 h-4 text-[#E03C31]" />
          Soạn thông báo gửi hàng loạt
        </h3>

        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Đã gửi thông báo thành công đến nhóm người dùng mục tiêu!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">Tiêu đề thông báo:</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Cập nhật chính sách đăng tin mới..."
              className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase mb-1">Nhóm người nhận (Audience):</label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-gray-50"
            >
              <option value="ALL_AGENTS">Tất cả Môi giới (AGENT & VERIFIED_AGENT)</option>
              <option value="ALL_USERS">Tất cả thành viên đã đăng ký</option>
              <option value="VERIFIED_AGENTS">Chỉ Môi giới đã xác thực chứng chỉ</option>
            </select>
          </div>
        </div>

        <div className="text-xs">
          <label className="block font-bold text-gray-700 uppercase mb-1">Nội dung chi tiết:</label>
          <textarea
            rows={4}
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Nội dung gửi đến người dùng..."
            className="w-full text-sm border border-gray-300 rounded-lg p-2.5 resize-none"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-gray-100 text-xs">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={sendInApp}
                onChange={(e) => setSendInApp(e.target.checked)}
                className="w-4 h-4 rounded text-red-600"
              />
              <span className="font-semibold text-gray-700">Thông báo In-App (Chuông)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={sendEmail}
                onChange={(e) => setSendEmail(e.target.checked)}
                className="w-4 h-4 rounded text-red-600"
              />
              <span className="font-semibold text-gray-700">Email Marketing (SMTP)</span>
            </label>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#E03C31] hover:bg-[#B8281F] rounded-lg shadow-sm transition-all"
          >
            <Send className="w-4 h-4" />
            Phát thông báo ngay
          </button>
        </div>
      </form>

      {/* History Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h3 className="font-bold text-gray-900 text-base">Lịch sử thông báo đã phát ({notifications.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Tiêu đề</th>
                <th className="py-3 px-4">Nhóm đối tượng</th>
                <th className="py-3 px-4">Kênh gửi</th>
                <th className="py-3 px-4">Số lượng gửi</th>
                <th className="py-3 px-4">Tỷ lệ mở</th>
                <th className="py-3 px-4">Thời gian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {notifications.map((n) => (
                <tr key={n.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-bold text-gray-900 max-w-sm truncate">{n.title}</td>
                  <td className="py-3.5 px-4 font-medium text-gray-700">{n.audience}</td>
                  <td className="py-3.5 px-4 text-gray-600">{n.channel}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-800">{n.sentCount} người</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600">{n.openRate}</td>
                  <td className="py-3.5 px-4 text-gray-400">{n.sentAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

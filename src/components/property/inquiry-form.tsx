"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

interface InquiryFormProps {
  propertyId: string;
  propertyTitle: string;
}

export function InquiryForm({ propertyId, propertyTitle }: InquiryFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("Tôi quan tâm đến bất động sản này, vui lòng liên hệ tư vấn thêm thông tin và lịch xem nhà.");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId,
          propertyTitle,
          senderName: name,
          senderPhone: phone,
          senderEmail: email || undefined,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gửi yêu cầu không thành công");
      }

      setSent(true);
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2">
        <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
        <h4 className="font-bold text-emerald-900 text-sm">Gửi yêu cầu thành công!</h4>
        <p className="text-xs text-emerald-700">
          Người đăng và chuyên viên chăm sóc sẽ liên hệ với bạn trong thời gian sớm nhất qua số điện thoại <strong>{phone}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
      <h4 className="font-bold text-gray-900 text-sm">Yêu cầu liên hệ / Đặt lịch xem</h4>

      {error && (
        <div className="p-2.5 bg-red-50 text-red-600 text-xs rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Họ và tên *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Nguyễn Văn A"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E03C31]"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Số điện thoại *</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0912345678"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E03C31]"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email (tùy chọn)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E03C31]"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Lời nhắn</label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E03C31]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#E03C31] hover:bg-[#B8281F] text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>{loading ? "Đang gửi..." : "Gửi yêu cầu liên hệ"}</span>
        </button>
      </form>
    </div>
  );
}

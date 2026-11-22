"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Phone, Lock, AlertCircle, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"USER" | "AGENT">("USER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password, role }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Đăng ký không thành công");
      }

      router.push("/tai-khoan");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight text-center">
          Tạo tài khoản mới
        </h2>
        <p className="text-xs text-gray-500 text-center mt-1">
          Trở thành thành viên sàn giao dịch bất động sản hàng đầu
        </p>
      </div>

      {error && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
        <div>
          <label className="block text-gray-700 font-bold mb-1">Họ và tên *</label>
          <div className="relative">
            <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              required
              placeholder="Nguyễn Văn A"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E03C31]"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-1">Email *</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="email"
              required
              placeholder="tenban@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E03C31]"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-1">Số điện thoại *</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="tel"
              required
              placeholder="0912345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E03C31]"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-1">Mật khẩu (tối thiểu 6 ký tự) *</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="password"
              required
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E03C31]"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-1">Bạn tham gia với tư cách</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole("USER")}
              className={`py-2 rounded-lg border font-bold transition-all ${
                role === "USER"
                  ? "bg-[#E03C31] text-white border-[#E03C31]"
                  : "bg-gray-50 border-gray-200 text-gray-700"
              }`}
            >
              Người tìm nhà
            </button>
            <button
              type="button"
              onClick={() => setRole("AGENT")}
              className={`py-2 rounded-lg border font-bold transition-all ${
                role === "AGENT"
                  ? "bg-[#E03C31] text-white border-[#E03C31]"
                  : "bg-gray-50 border-gray-200 text-gray-700"
              }`}
            >
              Môi giới BĐS
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#E03C31] hover:bg-[#B8281F] text-white font-bold rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-50 text-sm mt-2"
        >
          <span>{loading ? "Đang khởi tạo tài khoản..." : "Đăng ký thành viên"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
        Đã có tài khoản?{" "}
        <Link href="/dang-nhap" className="font-bold text-[#E03C31] hover:underline">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}

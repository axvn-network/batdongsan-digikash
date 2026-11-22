"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Đăng nhập không thành công");
      }

      if (data.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/tai-khoan");
      }
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
          Đăng nhập tài khoản
        </h2>
        <p className="text-xs text-gray-500 text-center mt-1">
          Quản lý tin đăng, theo dõi danh sách yêu thích và liên hệ môi giới
        </p>
      </div>

      {/* Quick Demo Credentials pill */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 space-y-1">
        <p className="font-bold">Tài khoản mẫu để test hệ thống:</p>
        <p>• Admin: <code>admin@example.com</code> / <code>admin123</code></p>
        <p>• User: <code>user@example.com</code> / <code>user123</code></p>
      </div>

      {error && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4 text-xs">
        <div>
          <label className="block text-gray-700 font-bold mb-1">Email đăng nhập</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E03C31]"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-gray-700 font-bold">Mật khẩu</label>
            <Link href="/quen-mat-khau" className="text-[#E03C31] hover:underline text-[11px]">
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E03C31]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#E03C31] hover:bg-[#B8281F] text-white font-bold rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-50 text-sm"
        >
          <span>{loading ? "Đang xác thực..." : "Đăng nhập ngay"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
        Chưa có tài khoản?{" "}
        <Link href="/dang-ky" className="font-bold text-[#E03C31] hover:underline">
          Đăng ký miễn phí
        </Link>
      </div>
    </div>
  );
}

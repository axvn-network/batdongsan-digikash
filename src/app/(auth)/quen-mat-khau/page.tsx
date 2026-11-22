import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6 text-center">
      <h2 className="text-xl font-bold text-gray-900 tracking-tight">
        Quên mật khẩu?
      </h2>
      <p className="text-xs text-gray-500">
        Nhập địa chỉ email đăng ký để nhận mã OTP xác thực khôi phục mật khẩu tài khoản
      </p>

      <form className="space-y-4 text-xs">
        <div className="relative text-left">
          <label className="block text-gray-700 font-bold mb-1">Email của bạn</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="email"
              required
              placeholder="email@example.com"
              className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#E03C31]"
            />
          </div>
        </div>

        <button
          type="button"
          className="w-full py-3 bg-[#E03C31] text-white font-bold rounded-xl hover:bg-[#B8281F] text-sm"
        >
          Gửi mã khôi phục
        </button>
      </form>

      <Link
        href="/dang-nhap"
        className="inline-flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-900 pt-2"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Quay lại đăng nhập</span>
      </Link>
    </div>
  );
}

import { Metadata } from "next";
import { LoanCalculator } from "@/components/utilities/loan-calculator";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Banknote, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Bảng Tính Lãi Suất Vay Mua Nhà Ngân Hàng 2026 | Batdongsan.com.vn",
  description: "Công cụ tính lãi suất vay mua nhà đất, căn hộ chung cư chính xác nhất. Hỗ trợ tính theo dư nợ giảm dần hoặc trả đều hàng tháng.",
};

export default function TinhLaiVayPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 flex items-center space-x-2">
        <Link href="/" className="hover:text-[#E03C31]">Trang chủ</Link>
        <span>/</span>
        <span className="text-gray-400">Tiện ích</span>
        <span>/</span>
        <span className="text-gray-900 font-semibold">Tính lãi suất vay</span>
      </nav>

      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Công cụ tính lãi suất vay mua nhà
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Lập kế hoạch tài chính an toàn trước khi đặt cọc bất động sản. Cập nhật biểu lãi suất các ngân hàng Vietcombank, BIDV, Techcombank, MB Bank.
        </p>
      </div>

      <LoanCalculator />

      {/* Guide & Advice */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4 text-xs text-gray-600 leading-relaxed">
        <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2">
          <Banknote className="w-5 h-5 text-emerald-600" />
          <span>Lời khuyên chuyên gia khi vay tiền mua nhà</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-gray-50 rounded-xl space-y-1.5 border border-gray-100">
            <h4 className="font-bold text-gray-900">Quy tắc 28/36 trong tài chính cá nhân</h4>
            <p>Tổng số tiền trả nợ mua nhà hàng tháng không nên vượt quá 28% tổng thu nhập hàng tháng của gia đình, và tổng mọi khoản nợ không quá 36%.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl space-y-1.5 border border-gray-100">
            <h4 className="font-bold text-gray-900">Chuẩn bị quỹ dự phòng khẩn cấp</h4>
            <p>Nên giữ lại khoản tiền tương đương ít nhất 3 đến 6 tháng chi phí sinh hoạt sau khi đã thanh toán vốn tự có để phòng ngừa biến động lãi suất hoặc thu nhập.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

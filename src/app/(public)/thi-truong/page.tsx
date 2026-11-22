import Link from "next/link";
import { MOCK_MARKET_DATA } from "@/lib/repositories/mock-data";
import { TrendingUp, BarChart3, ShieldCheck, ArrowUpRight, DollarSign, Percent } from "lucide-react";

export const metadata = {
  title: "Báo cáo Thị trường & Chỉ số Giá Bất động sản",
  description: "Dữ liệu lớn phân tích biến động giá m², tỷ suất sinh lời cho thuê căn hộ và xu hướng cung cầu bất động sản tại các đô thị lớn.",
};

export default function MarketInsightsPage() {
  const { averagePriceByDistrict, quarterlyInsights } = MOCK_MARKET_DATA;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-gray-900">Trang chủ</Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">Báo cáo thị trường</span>
      </nav>

      {/* Hero header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 text-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-4">
        <span className="bg-red-500/20 text-red-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center space-x-1.5">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Dữ liệu thị trường độc quyền DigiKash</span>
        </span>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
          Chỉ số Giá & Báo cáo Thị trường BĐS Quý 1/2024
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
          Tổng hợp và phân tích từ hơn 100.000 tin đăng xác thực, cung cấp góc nhìn minh bạch về mặt bằng giá thực tế và tỷ suất lợi nhuận đầu tư cho người mua nhà.
        </p>
      </div>

      {/* Grid: 3 Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-2">
          <span className="text-xs text-gray-500 font-semibold uppercase">Đơn giá trung bình căn hộ TP.HCM</span>
          <p className="text-2xl font-black text-[#E03C31]">62,5 tr/m²</p>
          <div className="flex items-center space-x-1 text-xs text-emerald-600 font-bold">
            <ArrowUpRight className="w-4 h-4" />
            <span>Tăng 4.8% so với quý trước</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-2">
          <span className="text-xs text-gray-500 font-semibold uppercase">Đơn giá trung bình căn hộ Hà Nội</span>
          <p className="text-2xl font-black text-[#E03C31]">58,2 tr/m²</p>
          <div className="flex items-center space-x-1 text-xs text-emerald-600 font-bold">
            <ArrowUpRight className="w-4 h-4" />
            <span>Tăng 7.4% (Tăng mạnh nhất miền Bắc)</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-2">
          <span className="text-xs text-gray-500 font-semibold uppercase">Tỷ suất sinh lời cho thuê bình quân</span>
          <p className="text-2xl font-black text-blue-600">5.2% / năm</p>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <span>Dẫn đầu bởi phân khúc căn hộ 1-2PN</span>
          </div>
        </div>
      </div>

      {/* Table: Average Price by District */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Bảng giá tham chiếu theo từng Quận / Huyện</h2>
            <p className="text-xs text-gray-500">Cập nhật dựa trên các giao dịch thực tế đã thẩm định pháp lý</p>
          </div>
          <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-bold">
            Dữ liệu xác thực tháng 2/2024
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Khu vực (Quận / Huyện)</th>
                <th className="py-3.5 px-6">Đơn giá trung bình</th>
                <th className="py-3.5 px-6">Biến động (YoY)</th>
                <th className="py-3.5 px-6">Tỷ suất cho thuê (Yield)</th>
                <th className="py-3.5 px-6 text-center">Khám phá BĐS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {averagePriceByDistrict.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-4 px-6 font-bold text-gray-900 text-sm">
                    {item.district}
                  </td>
                  <td className="py-4 px-6 font-extrabold text-[#E03C31] text-sm">
                    {item.avgPriceM2}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      {item.changePct}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-blue-600">
                    {item.rentYield}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Link
                      href={`/bat-dong-san?keyword=${encodeURIComponent(item.district.split(",")[0])}`}
                      className="py-1.5 px-3 bg-gray-100 hover:bg-[#E03C31] hover:text-white text-gray-800 rounded-lg text-xs font-bold transition-colors"
                    >
                      Xem tin đăng
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

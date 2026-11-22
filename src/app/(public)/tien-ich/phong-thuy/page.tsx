import { Metadata } from "next";
import { PhongThuyTool } from "@/components/utilities/phong-thuy-tool";
import Link from "next/link";
import { Compass, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Tra Cứu Phong Thủy Xem Hướng Nhà Hợp Tuổi 2026 | Batdongsan.com.vn",
  description: "Xem hướng nhà theo năm sinh, tính quái số Bát Trạch, xác định 4 hướng tốt Sinh Khí, Thiên Y, Diên Niên, Phục Vị và cách hóa giải hướng xấu.",
};

export default function PhongThuyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 flex items-center space-x-2">
        <Link href="/" className="hover:text-[#E03C31]">Trang chủ</Link>
        <span>/</span>
        <span className="text-gray-400">Tiện ích</span>
        <span>/</span>
        <span className="text-gray-900 font-semibold">Phong thủy hướng nhà</span>
      </nav>

      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Tra cứu phong thủy hướng nhà Bát Trạch
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Ứng dụng lý thuyết Kinh Dịch và Bát Trạch phong thủy để chọn hướng cửa chính, hướng ban công và hướng phòng ngủ sinh tài vượng khí.
        </p>
      </div>

      <PhongThuyTool />
    </div>
  );
}

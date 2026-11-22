import { CompareTable } from "@/components/property/compare-table";
import Link from "next/link";

export const metadata = {
  title: "So sánh bất động sản trực tuyến",
  description: "Công cụ so sánh mức giá, diện tích, số phòng ngủ, hướng nhà và pháp lý giữa các bất động sản",
};

export default function ComparePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-gray-900">Trang chủ</Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">So sánh bất động sản</span>
      </nav>

      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          So sánh bất động sản
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Đối chiếu các thông số quan trọng để đưa ra quyết định đầu tư và chọn nhà chuẩn xác nhất
        </p>
      </div>

      <CompareTable />
    </div>
  );
}

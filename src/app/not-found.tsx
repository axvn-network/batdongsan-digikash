import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-red-50 text-[#E03C31] rounded-full flex items-center justify-center text-3xl font-black mb-4">
        404
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy trang yêu cầu</h2>
      <p className="text-sm text-gray-500 max-w-md mb-6">
        Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 bg-[#E03C31] text-white font-bold text-sm rounded-xl hover:bg-[#B8281F] transition-all"
      >
        Về trang chủ Batdongsan
      </Link>
    </div>
  );
}

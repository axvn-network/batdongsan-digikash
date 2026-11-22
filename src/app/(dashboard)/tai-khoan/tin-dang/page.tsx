import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { PropertyRepository } from "@/lib/repositories/property.repo";
import { formatPrice, formatDateVi } from "@/lib/utils";
import { Eye, PlusCircle, CheckCircle, Clock } from "lucide-react";

export default async function UserListingsPage() {
  const session = await getSession();
  const allProperties = await PropertyRepository.getAllForAdmin();
  const myProperties = allProperties.filter((p) => !session || p.userId === session.userId || p.userId === "user-agent-1");

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Quản lý tin đăng của bạn</h2>
          <p className="text-xs text-gray-500 mt-1">Theo dõi lượt xem, trạng thái phê duyệt và chỉnh sửa thông tin</p>
        </div>

        <Link
          href="/dang-tin"
          className="flex items-center space-x-1.5 py-2 px-4 bg-[#E03C31] text-white rounded-xl text-xs font-bold hover:bg-[#B8281F] transition-colors w-fit shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Đăng tin mới</span>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Tin đăng</th>
              <th className="py-3 px-4">Mức giá</th>
              <th className="py-3 px-4">Trạng thái</th>
              <th className="py-3 px-4">Lượt xem</th>
              <th className="py-3 px-4">Ngày đăng</th>
              <th className="py-3 px-4">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {myProperties.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50/50">
                <td className="py-3 px-4 max-w-xs">
                  <div className="flex items-center space-x-3">
                    <img
                      src={p.images?.[0]?.url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=80"}
                      alt=""
                      className="w-12 h-10 object-cover rounded-lg flex-shrink-0"
                    />
                    <Link
                      href={`/bat-dong-san/${p.slug}`}
                      className="font-bold text-gray-900 hover:text-[#E03C31] truncate"
                    >
                      {p.title}
                    </Link>
                  </div>
                </td>
                <td className="py-3 px-4 font-bold text-[#E03C31]">
                  {formatPrice(p.price, p.isForRent)}
                </td>
                <td className="py-3 px-4">
                  {p.status === "APPROVED" ? (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                      Đang hiển thị
                    </span>
                  ) : (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600">
                      Chờ duyệt
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-gray-600 font-medium">
                  {p.viewsCount} lượt
                </td>
                <td className="py-3 px-4 text-gray-400">
                  {formatDateVi(p.createdAt)}
                </td>
                <td className="py-3 px-4">
                  <Link
                    href={`/bat-dong-san/${p.slug}`}
                    className="text-[#E03C31] hover:underline font-bold"
                  >
                    Xem tin
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

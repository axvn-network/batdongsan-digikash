import { LocationRepository } from "@/lib/repositories/location.repo";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { DanhMucNav } from "../danh-muc-nav";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

export const revalidate = 0;

export default async function AdminDanhMucTinhThanhPage() {
  const cities = await LocationRepository.getCities();

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          { label: "Quản lý danh mục", href: "/admin/danh-muc/loai-bds" },
          { label: "Tỉnh / Thành phố" },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Quản lý Tỉnh / Thành phố
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Danh sách 63 tỉnh thành phố trực thuộc Trung ương và bật/tắt hiển thị trên thanh tìm kiếm
          </p>
        </div>
        <button className="flex items-center space-x-1.5 py-2 px-3.5 bg-[#E03C31] text-white rounded-lg text-xs font-bold hover:bg-[#B8281F] w-fit shadow-sm">
          <PlusCircle className="w-4 h-4" />
          <span>Thêm Tỉnh / Thành</span>
        </button>
      </div>

      <div className="space-y-0">
        <DanhMucNav />
        <div className="bg-white border border-gray-200 border-t-0 rounded-b-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Tên Tỉnh / Thành</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Số quận huyện</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cities.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-bold text-gray-900">{c.name}</td>
                  <td className="py-3.5 px-4 text-gray-500 font-mono">/{c.slug}</td>
                  <td className="py-3.5 px-4 font-semibold text-gray-700">24 quận/huyện</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Hiển thị
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center space-x-2">
                    <button className="p-1.5 text-gray-600 hover:text-blue-600 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-600 hover:text-red-600 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
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

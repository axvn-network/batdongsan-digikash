import { LocationRepository } from "@/lib/repositories/location.repo";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { DanhMucNav } from "../danh-muc-nav";
import { PlusCircle, Edit, Trash2, Upload } from "lucide-react";

export const revalidate = 0;

export default async function AdminDanhMucQuanHuyenPage() {
  const districts = await LocationRepository.getDistrictsByCitySlug("tp-ho-chi-minh");

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          { label: "Quản lý danh mục", href: "/admin/danh-muc/loai-bds" },
          { label: "Quận / Huyện" },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Quản lý Quận / Huyện
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Gắn quận huyện vào từng Tỉnh / Thành phố và hỗ trợ import danh bạ hành chính hàng loạt
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1.5 py-2 px-3.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-200">
            <Upload className="w-4 h-4" />
            <span>Import CSV</span>
          </button>
          <button className="flex items-center space-x-1.5 py-2 px-3.5 bg-[#E03C31] text-white rounded-lg text-xs font-bold hover:bg-[#B8281F] shadow-sm">
            <PlusCircle className="w-4 h-4" />
            <span>Thêm Quận / Huyện</span>
          </button>
        </div>
      </div>

      <div className="space-y-0">
        <DanhMucNav />
        <div className="bg-white border border-gray-200 border-t-0 rounded-b-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Tên Quận / Huyện</th>
                <th className="py-3 px-4">Thuộc Tỉnh / Thành</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Số tin đăng</th>
                <th className="py-3 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {districts.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-bold text-gray-900">{d.name}</td>
                  <td className="py-3.5 px-4 text-gray-600 font-medium">TP. Hồ Chí Minh</td>
                  <td className="py-3.5 px-4 text-gray-500 font-mono">/{d.slug}</td>
                  <td className="py-3.5 px-4 font-semibold text-gray-800">45 tin</td>
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

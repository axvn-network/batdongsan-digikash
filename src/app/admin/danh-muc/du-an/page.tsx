import { LocationRepository } from "@/lib/repositories/location.repo";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { DanhMucNav } from "../danh-muc-nav";
import { PlusCircle, Edit, Trash2, Building } from "lucide-react";

export const revalidate = 0;

export default async function AdminDanhMucDuAnPage() {
  const projects = await LocationRepository.getProjects();

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          { label: "Quản lý danh mục", href: "/admin/danh-muc/loai-bds" },
          { label: "Dự án BĐS" },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Quản lý dự án bất động sản
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Gắn chủ đầu tư, vị trí, khoảng giá tham chiếu và trạng thái mở bán/bàn giao của dự án
          </p>
        </div>
        <button className="flex items-center space-x-1.5 py-2 px-3.5 bg-[#E03C31] text-white rounded-lg text-xs font-bold hover:bg-[#B8281F] shadow-sm">
          <PlusCircle className="w-4 h-4" />
          <span>Thêm Dự án mới</span>
        </button>
      </div>

      <div className="space-y-0">
        <DanhMucNav />
        <div className="bg-white border border-gray-200 border-t-0 rounded-b-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Tên Dự án</th>
                <th className="py-3 px-4">Chủ đầu tư</th>
                <th className="py-3 px-4">Khoảng giá</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={p.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=80"}
                        alt=""
                        className="w-10 h-8 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-bold text-gray-900">{p.name}</p>
                        <p className="text-[11px] text-gray-400 font-mono">/{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-700">{p.developer}</td>
                  <td className="py-3.5 px-4 font-bold text-[#E03C31]">{p.priceRange || "Đang cập nhật"}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {p.status || "Đang mở bán"}
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

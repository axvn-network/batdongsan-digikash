import { PropertyRepository } from "@/lib/repositories/property.repo";
import { PropertiesTable } from "@/components/admin/properties-table";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";

export const revalidate = 0;

export default async function AdminTinDangPage() {
  const properties = await PropertyRepository.getAllForAdmin();

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "Quản lý tin đăng" }]} />
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Quản lý tin đăng bất động sản
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Kiểm duyệt, chỉnh sửa trạng thái, ẩn hoặc xóa các tin đăng trên hệ thống
        </p>
      </div>

      <PropertiesTable initialProperties={properties} />
    </div>
  );
}

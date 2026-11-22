import { RoleRepository } from "@/lib/repositories/role.repo";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { RolesListClient } from "./roles-list-client";

export const revalidate = 0;

export default async function AdminRolesPage() {
  const roles = await RoleRepository.getAll();

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "Phân quyền (RBAC)", href: "/admin/phan-quyen/roles" }, { label: "Vai trò" }]} />
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Quản lý vai trò & Phân quyền hạt mịn (RBAC)
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Định nghĩa 7 vai trò chuẩn của sàn và thiết lập ma trận 52 quyền hạn chi tiết theo tài nguyên
        </p>
      </div>

      <RolesListClient initialRoles={roles} />
    </div>
  );
}

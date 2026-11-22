import { UserRepository } from "@/lib/repositories/user.repo";
import { UsersTable } from "@/components/admin/users-table";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";

export const revalidate = 0;

export default async function AdminNguoiDungPage() {
  const users = await UserRepository.getAll();

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "Quản lý người dùng" }]} />
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Quản lý người dùng & phân quyền
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Xem danh sách thành viên, chuyển đổi vai trò (User / Agent / Admin) và khóa tài khoản vi phạm
        </p>
      </div>

      <UsersTable initialUsers={users} />
    </div>
  );
}

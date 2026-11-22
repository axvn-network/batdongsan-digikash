import { UserRepository } from "@/lib/repositories/user.repo";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { UserPermissionsClient } from "./user-permissions-client";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function AdminUserPermissionsPage({ params }: { params: { id: string } }) {
  const user = await UserRepository.findById(params.id);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          { label: "Quản lý người dùng", href: "/admin/nguoi-dung" },
          { label: user.name, href: `/admin/nguoi-dung/${user.id}` },
          { label: "Phân quyền riêng (Override)" },
        ]}
      />

      <UserPermissionsClient user={user} />
    </div>
  );
}

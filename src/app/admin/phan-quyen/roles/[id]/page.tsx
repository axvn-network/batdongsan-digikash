import { RoleRepository } from "@/lib/repositories/role.repo";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { RoleMatrixClient } from "./role-matrix-client";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function AdminRoleMatrixPage({ params }: { params: { id: string } }) {
  const role = await RoleRepository.findById(params.id);

  if (!role) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          { label: "Phân quyền (RBAC)", href: "/admin/phan-quyen/roles" },
          { label: "Vai trò", href: "/admin/phan-quyen/roles" },
          { label: role.label },
        ]}
      />

      <RoleMatrixClient role={role} />
    </div>
  );
}

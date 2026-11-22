import { UserRepository } from "@/lib/repositories/user.repo";
import { PropertyRepository } from "@/lib/repositories/property.repo";
import { TransactionRepository } from "@/lib/repositories/transaction.repo";
import { AuditLogRepository } from "@/lib/repositories/audit.repo";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { UserDetailClient } from "./user-detail-client";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function AdminUserDetailPage({ params }: { params: { id: string } }) {
  const [user, allProperties, allTransactions, auditLogs] = await Promise.all([
    UserRepository.findById(params.id),
    PropertyRepository.getAllForAdmin(),
    TransactionRepository.getAll(),
    AuditLogRepository.getByEntity("User", params.id),
  ]);

  if (!user) {
    notFound();
  }

  const userProperties = allProperties.filter((p) => p.userId === params.id || p.user?.id === params.id);
  const userTransactions = allTransactions.filter((t) => t.userId === params.id);

  return (
    <div className="space-y-6">
      <AdminBreadcrumb
        items={[
          { label: "Quản lý người dùng", href: "/admin/nguoi-dung" },
          { label: user.name },
        ]}
      />

      <UserDetailClient
        user={user}
        properties={userProperties}
        transactions={userTransactions}
        auditLogs={auditLogs}
      />
    </div>
  );
}

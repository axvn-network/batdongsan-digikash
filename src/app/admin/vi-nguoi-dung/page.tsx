import { UserRepository } from "@/lib/repositories/user.repo";
import { AuditLogRepository } from "@/lib/repositories/audit.repo";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { WalletAdminClient } from "./wallet-admin-client";

export const revalidate = 0;

export default async function AdminViNguoiDungPage() {
  const [users, auditLogs] = await Promise.all([
    UserRepository.getAll(),
    AuditLogRepository.getAll({ entity: "Wallet" }),
  ]);

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "Quản lý ví & số dư người dùng" }]} />
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Quản lý ví tài khoản & Biến động số dư
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Theo dõi số dư khả dụng của thành viên và thực hiện điều chỉnh số dư (+/-) có ghi nhận kiểm toán
        </p>
      </div>

      <WalletAdminClient initialUsers={users} initialAuditLogs={auditLogs} />
    </div>
  );
}

import { AuditLogRepository } from "@/lib/repositories/audit.repo";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { AuditLogClient } from "./audit-log-client";

export const revalidate = 0;

export default async function AdminAuditLogPage() {
  const logs = await AuditLogRepository.getAll();

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "Nhật ký kiểm toán hệ thống (Audit Log)" }]} />
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Nhật ký kiểm toán toàn diện (Immutable Audit Trail)
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Lưu vết bất biến 100% mọi thao tác ghi (tạo, cập nhật, xóa, duyệt tin, đổi quyền, can thiệp ví) phục vụ tuân thủ & bảo mật
        </p>
      </div>

      <AuditLogClient initialLogs={logs} />
    </div>
  );
}

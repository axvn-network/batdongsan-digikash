import { AuditLogItem } from "@/types";

let localAuditLogs: AuditLogItem[] = [
  {
    id: "audit-1",
    userId: "user-super-1",
    userName: "Tổng Quản Trị Hệ Thống",
    userEmail: "superadmin@example.com",
    userRole: "SUPER_ADMIN",
    action: "system.settings.update",
    entity: "Settings",
    entityId: "general",
    before: { maintenanceMode: false, kycThresholdDaily: 10000000 },
    after: { maintenanceMode: false, kycThresholdDaily: 20000000 },
    ip: "118.69.182.42",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    severity: "WARNING",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "audit-2",
    userId: "user-admin-1",
    userName: "Quản Trị Viên DigiKash",
    userEmail: "admin@example.com",
    userRole: "ADMIN",
    action: "property.approve",
    entity: "Property",
    entityId: "prop-1",
    before: { status: "PENDING" },
    after: { status: "APPROVED", isVerified: true },
    ip: "14.161.22.10",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    severity: "INFO",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "audit-3",
    userId: "user-admin-1",
    userName: "Quản Trị Viên DigiKash",
    userEmail: "admin@example.com",
    userRole: "ADMIN",
    action: "user.ban",
    entity: "User",
    entityId: "user-bad-1",
    before: { isBlocked: false },
    after: { isBlocked: true, banReason: "Đăng tin giả mạo khu đô thị Sala" },
    ip: "14.161.22.10",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    severity: "WARNING",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "audit-4",
    userId: "user-mod-1",
    userName: "Kiểm Duyệt Viên Nguyễn",
    userEmail: "moderator@example.com",
    userRole: "MODERATOR",
    action: "property.reject",
    entity: "Property",
    entityId: "prop-99",
    before: { status: "PENDING" },
    after: { status: "REJECTED", rejectReason: "Hình ảnh mờ, số điện thoại chứa ký tự đặc biệt" },
    ip: "123.24.200.15",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    severity: "INFO",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

export class AuditLogRepository {
  static async getAll(filter?: {
    action?: string;
    entity?: string;
    userId?: string;
    severity?: string;
  }): Promise<AuditLogItem[]> {
    let result = [...localAuditLogs];

    if (filter?.action) {
      result = result.filter((l) => l.action.toLowerCase().includes(filter.action!.toLowerCase()));
    }
    if (filter?.entity) {
      result = result.filter((l) => l.entity.toLowerCase() === filter.entity!.toLowerCase());
    }
    if (filter?.userId) {
      result = result.filter((l) => l.userId === filter.userId);
    }
    if (filter?.severity) {
      result = result.filter((l) => l.severity === filter.severity);
    }

    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static async log(data: Omit<AuditLogItem, "id" | "createdAt">): Promise<AuditLogItem> {
    const item: AuditLogItem = {
      ...data,
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
    };
    localAuditLogs.unshift(item);
    return item;
  }

  static async getByEntity(entity: string, entityId: string): Promise<AuditLogItem[]> {
    return localAuditLogs.filter((l) => l.entity === entity && l.entityId === entityId);
  }
}

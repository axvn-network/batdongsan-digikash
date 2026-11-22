import { AuditLogRepository } from "./audit.repo";

export interface ViolationReport {
  id: string;
  propertyId: string;
  propertyTitle: string;
  reporterName: string;
  reporterPhone: string;
  reason: "FAKE_NEWS" | "WRONG_PRICE" | "SOLD" | "OFFENSIVE" | "SPAM";
  reasonLabel: string;
  description: string;
  status: "PENDING" | "RESOLVED" | "DISMISSED";
  reportCount: number;
  createdAt: string;
}

let localReports: ViolationReport[] = [
  {
    id: "rep-1",
    propertyId: "prop-1",
    propertyTitle: "Bán căn hộ The Sun Avenue 2PN 75m² view Landmark 81",
    reporterName: "Nguyễn Văn Hùng",
    reporterPhone: "0912345678",
    reason: "WRONG_PRICE",
    reasonLabel: "Sai giá thực tế",
    description: "Chủ tin rao 3,8 tỷ nhưng khi gọi điện thì báo 4,2 tỷ chưa thuế phí.",
    status: "PENDING",
    reportCount: 3,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: "rep-2",
    propertyId: "prop-2",
    propertyTitle: "Nhà phố Hoàng Cầu Đống Đa 45m² 5 tầng ngõ ô tô",
    reporterName: "Trần Mai Linh",
    reporterPhone: "0988776655",
    reason: "SOLD",
    reasonLabel: "Bất động sản đã bán",
    description: "Nhà này đã bán từ tuần trước nhưng tin vẫn để hiển thị gây phiền hà.",
    status: "PENDING",
    reportCount: 1,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: "rep-3",
    propertyId: "prop-3",
    propertyTitle: "Bán đất nền ven biển Đà Nẵng giá sốc 500 triệu",
    reporterName: "Phạm Thành Nam",
    reporterPhone: "0933557799",
    reason: "FAKE_NEWS",
    reasonLabel: "Tin giả mạo / Lừa đảo",
    description: "Đất nông nghiệp chưa chuyển đổi mục đích, đăng hình ảnh ảo của dự án khác.",
    status: "PENDING",
    reportCount: 5,
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
  },
];

export class ReportRepository {
  static async getAll(status?: string): Promise<ViolationReport[]> {
    if (!status) return localReports;
    return localReports.filter((r) => r.status === status);
  }

  static async resolve(
    id: string,
    action: "RESOLVE" | "DISMISS",
    adminUser?: { id: string; name: string }
  ): Promise<ViolationReport | null> {
    const report = localReports.find((r) => r.id === id);
    if (!report) return null;

    const before = report.status;
    report.status = action === "RESOLVE" ? "RESOLVED" : "DISMISSED";

    await AuditLogRepository.log({
      userId: adminUser?.id || "system",
      userName: adminUser?.name || "Hệ thống",
      userRole: "MODERATOR",
      action: action === "RESOLVE" ? "report.resolve" : "report.dismiss",
      entity: "Report",
      entityId: id,
      before: { status: before },
      after: { status: report.status, propertyId: report.propertyId },
      severity: action === "RESOLVE" ? "WARNING" : "INFO",
    });

    return report;
  }
}

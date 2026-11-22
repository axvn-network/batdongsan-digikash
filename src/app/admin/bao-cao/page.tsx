import { ReportRepository } from "@/lib/repositories/report.repo";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { ReportAdminClient } from "./report-admin-client";

export const revalidate = 0;

export default async function AdminBaoCaoPage() {
  const reports = await ReportRepository.getAll();

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "Quản lý báo cáo vi phạm" }]} />
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Xử lý báo cáo vi phạm từ cộng đồng (User Reports)
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Xem xét các phản ánh tin giả mạo, sai giá thực tế, đã bán hoặc nội dung quấy rối spam
        </p>
      </div>

      <ReportAdminClient initialReports={reports} />
    </div>
  );
}

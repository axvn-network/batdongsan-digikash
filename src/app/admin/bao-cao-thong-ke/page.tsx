import { StatsRepository } from "@/lib/repositories/stats.repo";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { AnalyticsClient } from "./analytics-client";

export const revalidate = 0;

export default async function AdminBaoCaoThongKePage() {
  const stats = await StatsRepository.getAdminKPIs();

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "Báo cáo & Phân tích thị trường sàn" }]} />
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Báo cáo thống kê & Phân tích chuyên sâu (Analytics & BI)
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Theo dõi tốc độ tăng trưởng tin đăng, doanh thu bán gói VIP, hiệu suất phản hồi Leads và mật độ BĐS theo khu vực
        </p>
      </div>

      <AnalyticsClient stats={stats} />
    </div>
  );
}

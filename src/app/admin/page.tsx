import { StatsRepository } from "@/lib/repositories/stats.repo";
import { PropertyRepository } from "@/lib/repositories/property.repo";
import { AuditLogRepository } from "@/lib/repositories/audit.repo";
import { TransactionRepository } from "@/lib/repositories/transaction.repo";
import { ReportRepository } from "@/lib/repositories/report.repo";
import { StatCard } from "@/components/admin/stat-card";
import { TrendChart } from "@/components/admin/trend-chart";
import { PropertiesTable } from "@/components/admin/properties-table";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { AuditTrail } from "@/components/admin/audit-trail";
import { 
  Building2, 
  Clock, 
  Users, 
  MessageSquare, 
  DollarSign, 
  CreditCard,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { formatCurrencyVND } from "@/lib/utils";

export const revalidate = 0; // Dynamic for admin

export default async function AdminDashboardPage() {
  const [stats, properties, auditLogs, pendingTxs, pendingReports] = await Promise.all([
    StatsRepository.getAdminKPIs(),
    PropertyRepository.getAllForAdmin(),
    AuditLogRepository.getAll(),
    TransactionRepository.getAll({ status: "PENDING" }),
    ReportRepository.getAll("PENDING"),
  ]);

  const urgentCount = stats.pendingProperties + pendingTxs.length + pendingReports.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <AdminBreadcrumb items={[{ label: "Dashboard Tổng quan" }]} />
          <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-1">
            Bảng điều khiển quản trị (Admin Overview)
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Hệ thống quản lý vận hành sàn DigiKash Vietnam • Giám sát thời gian thực & workflow duyệt tin
          </p>
        </div>

        {/* Quick status bar */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Hệ thống ổn định
          </span>
          <span className="text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full font-medium">
            Kỳ đối soát: 30 ngày
          </span>
        </div>
      </div>

      {/* 1. 6 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Tổng tin đăng"
          value={stats.totalProperties}
          change="+18.4%"
          isPositive={true}
          icon={Building2}
          subtext="Tin đăng trên sàn"
        />

        <StatCard
          title="Tin chờ duyệt"
          value={stats.pendingProperties}
          change={stats.pendingProperties > 0 ? "Cần xử lý" : "Đã sạch"}
          isPositive={stats.pendingProperties === 0}
          icon={Clock}
          subtext="Tin cần kiểm duyệt"
        />

        <StatCard
          title="Thành viên"
          value={stats.totalUsers}
          change="+12.5%"
          isPositive={true}
          icon={Users}
          subtext="Môi giới & User"
        />

        <StatCard
          title="Leads (30 ngày)"
          value={stats.totalInquiries}
          change="+24.1%"
          isPositive={true}
          icon={MessageSquare}
          subtext="Yêu cầu liên hệ"
        />

        <StatCard
          title="Doanh thu tháng"
          value={formatCurrencyVND(48650000)}
          change="+31.2%"
          isPositive={true}
          icon={DollarSign}
          subtext="Gói VIP & Dịch vụ"
        />

        <StatCard
          title="GD chờ duyệt"
          value={pendingTxs.length}
          change={pendingTxs.length > 0 ? "Chờ bill" : "Hoàn tất"}
          isPositive={pendingTxs.length === 0}
          icon={CreditCard}
          subtext="Chuyển khoản cần khớp"
        />
      </div>

      {/* 2. Cần xử lý ngay (Urgent Action Queue) */}
      <div className="bg-gradient-to-r from-red-50/80 to-amber-50/50 border border-red-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-100 text-[#E03C31] rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Hàng đợi công việc cần xử lý ngay
              </h2>
              <p className="text-xs text-gray-600">
                Có <span className="font-bold text-red-600">{urgentCount}</span> yêu cầu đang chờ nhân viên kiểm duyệt & quản trị viên
              </p>
            </div>
          </div>
          <Link
            href="/admin/duyet-tin"
            className="text-xs font-bold text-[#E03C31] hover:text-[#B8281F] flex items-center gap-1 hover:underline"
          >
            Mở hàng đợi duyệt tin <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-red-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-medium">Tin BĐS chờ phê duyệt</span>
              <p className="text-2xl font-black text-gray-900 mt-1">{stats.pendingProperties} tin</p>
              <span className="text-[11px] text-amber-600 font-semibold">Tự động gắn cờ 1 tin</span>
            </div>
            <Link
              href="/admin/duyet-tin"
              className="px-3 py-1.5 text-xs font-bold bg-red-50 text-[#E03C31] hover:bg-red-100 rounded-lg transition-colors"
            >
              Duyệt ngay
            </Link>
          </div>

          <div className="bg-white rounded-xl p-4 border border-red-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-medium">Giao dịch chuyển khoản chờ xác nhận</span>
              <p className="text-2xl font-black text-gray-900 mt-1">{pendingTxs.length} hóa đơn</p>
              <span className="text-[11px] text-emerald-600 font-semibold">Khách đã tải bill thanh toán</span>
            </div>
            <Link
              href="/admin/giao-dich"
              className="px-3 py-1.5 text-xs font-bold bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
            >
              Khớp bill
            </Link>
          </div>

          <div className="bg-white rounded-xl p-4 border border-red-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-medium">Báo cáo vi phạm từ người dùng</span>
              <p className="text-2xl font-black text-gray-900 mt-1">{pendingReports.length} phản ánh</p>
              <span className="text-[11px] text-rose-600 font-semibold">Tin nghi ngờ sai giá/đã bán</span>
            </div>
            <Link
              href="/admin/bao-cao"
              className="px-3 py-1.5 text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
            >
              Xem xét
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Trends Chart */}
      <TrendChart data={stats.monthlyTrends} />

      {/* 4. Tin đăng mới nhất cần quản lý */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Tin đăng quản lý</h2>
            <p className="text-xs text-gray-500">Xem và can thiệp nhanh các tin đăng mới nhất trên hệ thống</p>
          </div>
          <Link
            href="/admin/tin-dang"
            className="text-xs font-bold text-[#E03C31] hover:text-[#B8281F] flex items-center gap-1 hover:underline"
          >
            Xem tất cả tin đăng <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <PropertiesTable initialProperties={properties} />
      </div>

      {/* 5. Recent Audit Trail */}
      <AuditTrail logs={auditLogs.slice(0, 5)} title="Nhật ký thao tác quản trị gần đây (Audit Log Preview)" />
    </div>
  );
}

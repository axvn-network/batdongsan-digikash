import { PropertyRepository } from "@/lib/repositories/property.repo";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { AdminVerificationAudit } from "@/components/admin/admin-verification-audit";

export const revalidate = 0;

export default async function AdminXacThucPage() {
  const allProperties = await PropertyRepository.getAllForAdmin();
  
  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "Hội đồng kiểm duyệt Sổ đỏ & Pháp lý" }]} />
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center space-x-2">
          <span>Hội đồng Kiểm duyệt Sổ đỏ & Pháp lý</span>
          <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold">
            Chợ BĐS Sạch
          </span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Quy trình thẩm định 4 bước: Số tờ số thửa, Tọa độ GPS trùng khớp, Quy hoạch không dính thu hồi, Cam kết chính chủ
        </p>
      </div>

      <AdminVerificationAudit initialProperties={allProperties} />
    </div>
  );
}

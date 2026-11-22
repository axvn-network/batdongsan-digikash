import { InquiryRepository } from "@/lib/repositories/inquiry.repo";
import { LeadsTable } from "@/components/admin/leads-table";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";

export const revalidate = 0;

export default async function AdminLeadsPage() {
  const inquiries = await InquiryRepository.getAll();

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "Quản lý Leads" }]} />
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Quản lý Yêu cầu tư vấn & Leads khách hàng
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Theo dõi tiến độ xử lý và phản hồi các yêu cầu liên hệ từ người mua nhà
        </p>
      </div>

      <LeadsTable initialLeads={inquiries} />
    </div>
  );
}

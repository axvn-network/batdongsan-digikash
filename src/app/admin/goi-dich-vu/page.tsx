import { PackageRepository } from "@/lib/repositories/package.repo";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { PackageAdminClient } from "./package-admin-client";

export const revalidate = 0;

export default async function AdminGoiDichVuPage() {
  const packages = await PackageRepository.getAll();

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "Quản lý gói dịch vụ (Packages)" }]} />
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Quản lý gói đăng tin & gói hội viên môi giới
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Cấu hình biểu phí, số lượng tin đăng, thời hạn và các tính năng đẩy top, gắn huy hiệu VIP
        </p>
      </div>

      <PackageAdminClient initialPackages={packages} />
    </div>
  );
}

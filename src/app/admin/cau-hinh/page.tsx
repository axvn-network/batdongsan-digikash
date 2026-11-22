import { SettingsRepository } from "@/lib/repositories/settings.repo";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { SettingsAdminClient } from "./settings-admin-client";

export const revalidate = 0;

export default async function AdminCauHinhPage() {
  const settings = await SettingsRepository.getSettings();

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "Cấu hình hệ thống (Settings)" }]} />
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Cấu hình sàn bất động sản (System Settings)
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Thiết lập thông tin thương hiệu, SEO mặc định, cổng thanh toán, bộ lọc từ khóa kiểm duyệt và chế độ bảo trì
        </p>
      </div>

      <SettingsAdminClient initialSettings={settings} />
    </div>
  );
}

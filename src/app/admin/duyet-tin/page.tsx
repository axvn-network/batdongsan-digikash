import { PropertyRepository } from "@/lib/repositories/property.repo";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { ModerationQueueClient } from "./duyet-tin-client";

export const revalidate = 0;

export default async function AdminDuyetTinPage() {
  const allProperties = await PropertyRepository.getAllForAdmin();
  const pendingProperties = allProperties.filter((p) => p.status === "PENDING");

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "Hàng đợi duyệt tin (Moderation Queue)" }]} />
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Hàng đợi kiểm duyệt tin đăng (Moderation Queue)
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Quy trình duyệt tin tốc độ cao với AI auto-flagging và phím tắt thao tác nhanh (Phím A: Duyệt • Phím R: Từ chối • Phím S: Bỏ qua)
        </p>
      </div>

      <ModerationQueueClient initialItems={pendingProperties} />
    </div>
  );
}

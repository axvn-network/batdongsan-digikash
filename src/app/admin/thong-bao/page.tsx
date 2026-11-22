import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { BroadcastClient } from "./broadcast-client";

export const revalidate = 0;

export default function AdminThongBaoPage() {
  const sentNotifications = [
    {
      id: "notif-1",
      title: "Ưu đãi mừng Xuân 2026: Tặng 20% giá trị khi nạp số dư ví DigiKash",
      audience: "Tất cả Môi giới (AGENT & VERIFIED_AGENT)",
      channel: "In-App + Email",
      sentAt: "10/01/2026 09:00",
      sentCount: 840,
      openRate: "68.5%",
    },
    {
      id: "notif-2",
      title: "Thông báo cập nhật Luật Đất Đai sửa đổi về cấp sổ hồng chung cư",
      audience: "Tất cả thành viên",
      channel: "In-App",
      sentAt: "01/01/2026 08:30",
      sentCount: 1250,
      openRate: "82.1%",
    },
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "Hệ thống thông báo sàn (Broadcast)" }]} />
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Gửi thông báo & Chiến dịch Broadcast
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Soạn tin nhắn thông báo đẩy (In-App, Email, Push) gửi đồng loạt theo nhóm đối tượng thành viên
        </p>
      </div>

      <BroadcastClient initialNotifications={sentNotifications} />
    </div>
  );
}

import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { MessagesAdminClient } from "./messages-admin-client";

export const revalidate = 0;

export default function AdminTinNhanPage() {
  const flaggedConversations = [
    {
      id: "conv-1",
      buyerName: "Vũ Minh Trí",
      buyerPhone: "0903344556",
      agentName: "Nguyễn Văn Hùng",
      propertyTitle: "Bán căn hộ The Sun Avenue 2PN 75m²",
      flagReason: "Phát hiện từ khóa nghi vấn cọc ngoài sàn: 'chuyển khoản riêng', 'không qua sàn'",
      messageCount: 8,
      lastMessage: "Anh chuyển thẳng 50 triệu vào số tài khoản cá nhân này của em để giữ căn nhé, không cần cọc qua sàn mất phí.",
      lastSender: "Nguyễn Văn Hùng (Agent)",
      time: "22/02/2026 15:40",
      status: "FLAGGED",
    },
    {
      id: "conv-2",
      buyerName: "Đỗ Thu Hà",
      buyerPhone: "0987654321",
      agentName: "Trần Mai Linh",
      propertyTitle: "Nhà phố Hoàng Cầu Đống Đa 45m²",
      flagReason: "Báo cáo quấy rối từ khách hàng",
      messageCount: 14,
      lastMessage: "Sao chị không trả lời? Căn này chị không chốt ngay trong tối nay là người khác lấy mất đấy!",
      lastSender: "Trần Mai Linh (Agent)",
      time: "21/02/2026 21:10",
      status: "FLAGGED",
    },
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "Kiểm duyệt hội thoại & tin nhắn" }]} />
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Kiểm duyệt tin nhắn & Hội thoại gắn cờ (Chat Moderation)
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Giám sát các cuộc hội thoại chứa từ khóa lừa đảo, cọc ngoài sàn hoặc tin nhắn quấy rối khách hàng
        </p>
      </div>

      <MessagesAdminClient initialConversations={flaggedConversations} />
    </div>
  );
}

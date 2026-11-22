import React from "react";

interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md";
  className?: string;
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  // Property statuses
  PENDING: { label: "Chờ duyệt", bg: "bg-amber-50 border-amber-200", text: "text-amber-800", dot: "bg-amber-500" },
  APPROVED: { label: "Đã duyệt (Active)", bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-800", dot: "bg-emerald-500" },
  ACTIVE: { label: "Đang hoạt động", bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-800", dot: "bg-emerald-500" },
  REJECTED: { label: "Bị từ chối", bg: "bg-rose-50 border-rose-200", text: "text-rose-800", dot: "bg-rose-500" },
  SOLD: { label: "Đã bán", bg: "bg-slate-100 border-slate-300", text: "text-slate-700", dot: "bg-slate-500" },
  RENTED: { label: "Đã cho thuê", bg: "bg-blue-50 border-blue-200", text: "text-blue-800", dot: "bg-blue-500" },
  HIDDEN: { label: "Đã ẩn", bg: "bg-gray-100 border-gray-300", text: "text-gray-600", dot: "bg-gray-400" },
  EXPIRED: { label: "Hết hạn", bg: "bg-orange-50 border-orange-200", text: "text-orange-800", dot: "bg-orange-500" },

  // User / Account
  ACTIVE_USER: { label: "Hoạt động", bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-800", dot: "bg-emerald-500" },
  BANNED: { label: "Đã bị khóa", bg: "bg-rose-100 border-rose-300", text: "text-rose-900", dot: "bg-rose-600" },

  // Roles
  SUPER_ADMIN: { label: "Super Admin", bg: "bg-purple-100 border-purple-300", text: "text-purple-900", dot: "bg-purple-600" },
  ADMIN: { label: "Quản trị viên", bg: "bg-indigo-100 border-indigo-300", text: "text-indigo-900", dot: "bg-indigo-600" },
  MODERATOR: { label: "Kiểm duyệt viên", bg: "bg-cyan-100 border-cyan-300", text: "text-cyan-900", dot: "bg-cyan-600" },
  VERIFIED_AGENT: { label: "Môi giới xác thực", bg: "bg-emerald-100 border-emerald-300", text: "text-emerald-900", dot: "bg-emerald-600" },
  AGENT: { label: "Môi giới", bg: "bg-sky-100 border-sky-300", text: "text-sky-900", dot: "bg-sky-600" },
  USER: { label: "Thành viên", bg: "bg-gray-100 border-gray-300", text: "text-gray-800", dot: "bg-gray-500" },
  GUEST: { label: "Khách", bg: "bg-stone-100 border-stone-300", text: "text-stone-800", dot: "bg-stone-500" },

  // Transactions
  COMPLETED: { label: "Thành công", bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-800", dot: "bg-emerald-500" },
  REFUNDED: { label: "Đã hoàn tiền", bg: "bg-purple-50 border-purple-200", text: "text-purple-800", dot: "bg-purple-500" },
  CANCELLED: { label: "Đã hủy", bg: "bg-gray-100 border-gray-300", text: "text-gray-600", dot: "bg-gray-400" },

  // Leads
  NEW: { label: "Mới gửi", bg: "bg-blue-50 border-blue-200", text: "text-blue-800", dot: "bg-blue-500" },
  PROCESSING: { label: "Đang xử lý", bg: "bg-amber-50 border-amber-200", text: "text-amber-800", dot: "bg-amber-500" },
  RESPONDED: { label: "Đã phản hồi", bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-800", dot: "bg-emerald-500" },

  // Reports
  RESOLVED: { label: "Đã xử lý", bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-800", dot: "bg-emerald-500" },
  DISMISSED: { label: "Đã bác bỏ", bg: "bg-gray-100 border-gray-300", text: "text-gray-700", dot: "bg-gray-500" },

  // Severity
  INFO: { label: "Thông tin", bg: "bg-blue-50 border-blue-200", text: "text-blue-800", dot: "bg-blue-500" },
  WARNING: { label: "Cảnh báo", bg: "bg-amber-50 border-amber-200", text: "text-amber-800", dot: "bg-amber-500" },
  CRITICAL: { label: "Nghiêm trọng", bg: "bg-rose-50 border-rose-200", text: "text-rose-800", dot: "bg-rose-500" },
};

export function StatusBadge({ status, size = "sm", className = "" }: StatusBadgeProps) {
  const upper = (status || "").toUpperCase();
  const config = STATUS_CONFIG[upper] || {
    label: status,
    bg: "bg-gray-100 border-gray-200",
    text: "text-gray-700",
    dot: "bg-gray-400",
  };

  const sizeClass = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border rounded-full ${config.bg} ${config.text} ${sizeClass} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
    </span>
  );
}

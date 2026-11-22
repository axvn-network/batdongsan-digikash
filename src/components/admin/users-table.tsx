"use client";

import { useState } from "react";
import Link from "next/link";
import { User, UserRole } from "@/types";
import { formatDateVi, formatCurrencyVND } from "@/lib/utils";
import { StatusBadge } from "./status-badge";
import { ReasonDialog } from "./reason-dialog";
import { ConfirmDialog } from "./confirm-dialog";
import { 
  Shield, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  Search, 
  Filter, 
  KeyRound, 
  Eye, 
  Wallet,
  AlertCircle
} from "lucide-react";

export function UsersTable({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedUserForBan, setSelectedUserForBan] = useState<User | null>(null);
  const [selectedUserForRole, setSelectedUserForRole] = useState<User | null>(null);
  const [targetRole, setTargetRole] = useState<UserRole>("USER");
  const [loading, setLoading] = useState(false);

  const handleBanConfirm = async (reason: string) => {
    if (!selectedUserForBan) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${selectedUserForBan.id}/ban`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBlocked: !selectedUserForBan.isBlocked, reason }),
      });
      if (res.ok) {
        setUsers((curr) =>
          curr.map((u) => (u.id === selectedUserForBan.id ? { ...u, isBlocked: !u.isBlocked } : u))
        );
        setSelectedUserForBan(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async () => {
    if (!selectedUserForRole) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${selectedUserForRole.id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: targetRole }),
      });
      if (res.ok) {
        setUsers((curr) =>
          curr.map((u) => (u.id === selectedUserForRole.id ? { ...u, role: targetRole } : u))
        );
        setSelectedUserForRole(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter((u) => {
    if (roleFilter !== "ALL" && u.role !== roleFilter) return false;
    if (statusFilter === "ACTIVE" && u.isBlocked) return false;
    if (statusFilter === "BANNED" && !u.isBlocked) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchName = u.name.toLowerCase().includes(q);
      const matchEmail = u.email.toLowerCase().includes(q);
      const matchPhone = (u.phone || "").toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchPhone) return false;
    }
    return true;
  });

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Search & Filter Header */}
      <div className="p-5 border-b border-gray-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-gray-900 text-base">
              Danh sách tài khoản ({filtered.length})
            </h3>
            <p className="text-xs text-gray-500">
              Quản lý vai trò (RBAC), trạng thái hoạt động, số dư ví và phân quyền hạt mịn per-user
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Tìm tên, email, SĐT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 w-52 sm:w-64"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-gray-50"
            >
              <option value="ALL">Tất cả vai trò</option>
              <option value="SUPER_ADMIN">SUPER_ADMIN</option>
              <option value="ADMIN">ADMIN</option>
              <option value="MODERATOR">MODERATOR</option>
              <option value="VERIFIED_AGENT">VERIFIED_AGENT</option>
              <option value="AGENT">AGENT</option>
              <option value="USER">USER</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-gray-50"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="ACTIVE">Hoạt động</option>
              <option value="BANNED">Đã bị khóa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50/60 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Thành viên</th>
              <th className="py-3.5 px-4">Số điện thoại</th>
              <th className="py-3.5 px-4">Vai trò (Role)</th>
              <th className="py-3.5 px-4">Số dư ví (VND)</th>
              <th className="py-3.5 px-4">Trạng thái</th>
              <th className="py-3.5 px-4">Ngày đăng ký</th>
              <th className="py-3.5 px-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={u.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <Link
                        href={`/admin/nguoi-dung/${u.id}`}
                        className="font-bold text-gray-900 hover:text-[#E03C31] block"
                      >
                        {u.name}
                      </Link>
                      <p className="text-[11px] text-gray-400">{u.email}</p>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-gray-700 font-medium">
                  {u.phone || "Chưa cập nhật"}
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5">
                    <StatusBadge status={u.role} size="sm" />
                    {u.role !== "SUPER_ADMIN" && (
                      <button
                        onClick={() => {
                          setSelectedUserForRole(u);
                          setTargetRole(u.role);
                        }}
                        className="text-[10px] text-gray-400 hover:text-indigo-600 underline font-medium"
                      >
                        Đổi
                      </button>
                    )}
                  </div>
                </td>

                <td className="py-3.5 px-4 font-mono font-bold text-gray-800">
                  {formatCurrencyVND(u.walletBalance || 0)}
                </td>

                <td className="py-3.5 px-4">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    u.isBlocked ? "bg-red-100 text-red-700" : "bg-emerald-50 text-emerald-600"
                  }`}>
                    {u.isBlocked ? "Đã khóa" : "Hoạt động"}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-gray-400">
                  {formatDateVi(u.createdAt)}
                </td>

                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                  <div className="flex items-center justify-center space-x-1.5">
                    <Link
                      href={`/admin/nguoi-dung/${u.id}`}
                      className="p-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Xem chi tiết hồ sơ"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    <Link
                      href={`/admin/nguoi-dung/${u.id}/permissions`}
                      className="p-1.5 bg-purple-50 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                      title="Phân quyền hạt mịn per-user"
                    >
                      <KeyRound className="w-4 h-4" />
                    </Link>

                    {u.role !== "SUPER_ADMIN" && (
                      <button
                        onClick={() => setSelectedUserForBan(u)}
                        title={u.isBlocked ? "Mở khóa tài khoản" : "Khóa tài khoản"}
                        className={`p-1.5 rounded-lg transition-colors ${
                          u.isBlocked
                            ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                            : "bg-red-50 text-red-600 hover:bg-red-100"
                        }`}
                      >
                        {u.isBlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ban Reason Dialog */}
      <ReasonDialog
        isOpen={Boolean(selectedUserForBan && !selectedUserForBan.isBlocked)}
        title={`Khóa tài khoản: ${selectedUserForBan?.name}`}
        description="Vui lòng nhập lý do khóa tài khoản để lưu vào Audit Log và gửi email thông báo cho thành viên."
        presetReasons={[
          "Đăng tin giả mạo, sai giá nhiều lần",
          "Spam tin nhắn hoặc quấy rối khách hàng",
          "Vi phạm quy chế giao dịch bất động sản",
          "Nghi vấn lừa đảo nhận tiền cọc bất chính",
        ]}
        confirmText="Xác nhận khóa tài khoản"
        isLoading={loading}
        onConfirm={handleBanConfirm}
        onClose={() => setSelectedUserForBan(null)}
      />

      {/* Unban Confirm Dialog */}
      <ConfirmDialog
        isOpen={Boolean(selectedUserForBan && selectedUserForBan.isBlocked)}
        title={`Mở khóa tài khoản: ${selectedUserForBan?.name}`}
        description="Tài khoản này sẽ được khôi phục quyền đăng nhập và đăng tin trên hệ thống."
        confirmText="Mở khóa ngay"
        variant="primary"
        isLoading={loading}
        onConfirm={() => handleBanConfirm("Quản trị viên mở khóa")}
        onClose={() => setSelectedUserForBan(null)}
      />

      {/* Change Role Modal */}
      {selectedUserForRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900 text-lg">
              Thay đổi vai trò: {selectedUserForRole.name}
            </h3>
            <p className="text-xs text-gray-500">
              Chọn vai trò mới cho tài khoản. Quyền hạn tương ứng sẽ được áp dụng ngay lập tức.
            </p>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Chọn Role:
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value as UserRole)}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:bg-white"
              >
                <option value="USER">USER - Thành viên thường</option>
                <option value="AGENT">AGENT - Môi giới tự do</option>
                <option value="VERIFIED_AGENT">VERIFIED_AGENT - Môi giới xác thực</option>
                <option value="MODERATOR">MODERATOR - Kiểm duyệt viên</option>
                <option value="ADMIN">ADMIN - Quản trị viên vận hành</option>
              </select>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setSelectedUserForRole(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleRoleChange}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-[#E03C31] hover:bg-[#B8281F] rounded-lg shadow-sm"
              >
                Lưu vai trò
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

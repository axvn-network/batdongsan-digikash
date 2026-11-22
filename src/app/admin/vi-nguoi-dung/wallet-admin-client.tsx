"use client";

import React, { useState } from "react";
import { User, AuditLogItem } from "@/types";
import { formatCurrencyVND, formatDateVi } from "@/lib/utils";
import { StatusBadge } from "@/components/admin/status-badge";
import { AuditTrail } from "@/components/admin/audit-trail";
import { Wallet, PlusCircle, MinusCircle, Search, ArrowRight, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface WalletAdminClientProps {
  initialUsers: User[];
  initialAuditLogs: AuditLogItem[];
}

export function WalletAdminClient({ initialUsers, initialAuditLogs }: WalletAdminClientProps) {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(initialAuditLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [adjustType, setAdjustType] = useState<"ADD" | "DEDUCT">("ADD");
  const [amount, setAmount] = useState("500000");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const totalBalance = users.reduce((acc, u) => acc + (u.walletBalance || 0), 0);

  const handleAdjust = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    const num = parseInt(amount, 10);
    if (isNaN(num) || num <= 0 || !reason.trim()) return;

    const diff = adjustType === "ADD" ? num : -num;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/wallet/adjust`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUser.id, amount: diff, reason }),
      });
      if (res.ok) {
        const data = await res.json();
        setUsers((prev) =>
          prev.map((u) => (u.id === selectedUser.id ? { ...u, walletBalance: data.newBalance } : u))
        );
        setSelectedUser(null);
        setReason("");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter((u) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.phone || "").includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-100">
            Tổng số dư ký quỹ trên toàn sàn (Escrow & Wallets)
          </span>
          <p className="text-3xl font-black tracking-tight mt-1">
            {formatCurrencyVND(totalBalance)}
          </p>
          <span className="text-xs text-emerald-100">
            {users.length} tài khoản thành viên & môi giới
          </span>
        </div>
        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
          <Wallet className="w-8 h-8" />
        </div>
      </div>

      {/* Users Wallet Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-gray-900 text-base">Danh sách số dư tài khoản ({filtered.length})</h3>
            <p className="text-xs text-gray-500">Cộng hoặc trừ số dư ví kèm theo lý do bắt buộc</p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm theo tên, email, SĐT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/60 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Thành viên</th>
                <th className="py-3.5 px-4">Vai trò</th>
                <th className="py-3.5 px-4">Số dư ví (VND)</th>
                <th className="py-3.5 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={u.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <p className="font-bold text-gray-900">{u.name}</p>
                        <p className="text-[11px] text-gray-400">{u.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <StatusBadge status={u.role} size="sm" />
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900 text-sm">
                    {formatCurrencyVND(u.walletBalance || 0)}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedUser(u);
                        setAdjustType("ADD");
                        setAmount("500000");
                        setReason("");
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
                    >
                      Điều chỉnh số dư
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900 text-lg">
              Điều chỉnh số dư ví: {selectedUser.name}
            </h3>
            <p className="text-xs text-gray-500">
              Số dư hiện tại: <span className="font-bold text-[#E03C31]">{formatCurrencyVND(selectedUser.walletBalance || 0)}</span>
            </p>

            <form onSubmit={handleAdjust} className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAdjustType("ADD")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-colors ${
                    adjustType === "ADD"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                      : "bg-gray-50 text-gray-600 border-gray-200"
                  }`}
                >
                  + Cộng thêm tiền
                </button>
                <button
                  type="button"
                  onClick={() => setAdjustType("DEDUCT")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-colors ${
                    adjustType === "DEDUCT"
                      ? "bg-rose-50 text-rose-700 border-rose-300"
                      : "bg-gray-50 text-gray-600 border-gray-200"
                  }`}
                >
                  - Khấu trừ tiền
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Số tiền (VND):
                </label>
                <input
                  type="number"
                  step="10000"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Lý do điều chỉnh (Bắt buộc):
                </label>
                <textarea
                  rows={3}
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Nhập lý do chi tiết..."
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5 resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#E03C31] hover:bg-[#B8281F] rounded-lg shadow-sm"
                >
                  Xác nhận lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Wallet Audit Log */}
      <AuditTrail logs={auditLogs} title="Nhật ký điều chỉnh số dư ví (Wallet Audit Trail)" />
    </div>
  );
}

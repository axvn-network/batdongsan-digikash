"use client";

import React, { useState } from "react";
import { User, Property, AuditLogItem } from "@/types";
import { TransactionItem } from "@/lib/repositories/transaction.repo";
import { formatDateVi, formatPrice, formatCurrencyVND } from "@/lib/utils";
import { StatusBadge } from "@/components/admin/status-badge";
import { ReasonDialog } from "@/components/admin/reason-dialog";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { AuditTrail } from "@/components/admin/audit-trail";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  Shield, 
  KeyRound, 
  Lock, 
  Unlock, 
  Wallet, 
  Building2, 
  CreditCard, 
  Clock, 
  PlusCircle, 
  MinusCircle,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserDetailClientProps {
  user: User;
  properties: Property[];
  transactions: TransactionItem[];
  auditLogs: AuditLogItem[];
}

export function UserDetailClient({
  user: initialUser,
  properties,
  transactions,
  auditLogs,
}: UserDetailClientProps) {
  const router = useRouter();
  const [user, setUser] = useState<User>(initialUser);
  const [activeTab, setActiveTab] = useState<"profile" | "properties" | "transactions" | "audit">("profile");
  const [banModalOpen, setBanModalOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [walletAmount, setWalletAmount] = useState<string>("500000");
  const [walletType, setWalletType] = useState<"ADD" | "DEDUCT">("ADD");
  const [walletReason, setWalletReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleToggleBlock = async (reason?: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${user.id}/ban`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isBlocked: !user.isBlocked, reason }),
      });
      if (res.ok) {
        setUser((prev) => ({ ...prev, isBlocked: !prev.isBlocked }));
        setBanModalOpen(false);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdjustWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(walletAmount, 10);
    if (isNaN(num) || num <= 0 || !walletReason.trim()) return;

    const diff = walletType === "ADD" ? num : -num;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/wallet/adjust`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, amount: diff, reason: walletReason }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser((prev) => ({ ...prev, walletBalance: data.newBalance }));
        setWalletModalOpen(false);
        setWalletReason("");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* User Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80"}
            alt=""
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-gray-900">{user.name}</h1>
              <StatusBadge status={user.role} />
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                user.isBlocked ? "bg-red-100 text-red-700" : "bg-emerald-50 text-emerald-600"
              }`}>
                {user.isBlocked ? "Đã khóa" : "Hoạt động"}
              </span>
            </div>
            <p className="text-xs text-gray-500 font-mono">ID: {user.id} • Tham gia: {formatDateVi(user.createdAt)}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/admin/nguoi-dung/${user.id}/permissions`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-200"
          >
            <KeyRound className="w-4 h-4" />
            Phân quyền hạt mịn
          </Link>

          <button
            onClick={() => setWalletModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
          >
            <Wallet className="w-4 h-4" />
            Điều chỉnh số dư ví
          </button>

          {user.role !== "SUPER_ADMIN" && (
            <button
              onClick={() => setBanModalOpen(true)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors shadow-sm ${
                user.isBlocked
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-rose-600 hover:bg-rose-700 text-white"
              }`}
            >
              {user.isBlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              {user.isBlocked ? "Mở khóa tài khoản" : "Khóa tài khoản"}
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl px-4">
        {[
          { id: "profile", label: "Hồ sơ cá nhân", count: null },
          { id: "properties", label: "Tin đăng", count: properties.length },
          { id: "transactions", label: "Giao dịch", count: transactions.length },
          { id: "audit", label: "Nhật ký kiểm toán", count: auditLogs.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`py-3.5 px-5 font-bold text-xs border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === tab.id
                ? "border-[#E03C31] text-[#E03C31]"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === tab.id ? "bg-red-100 text-[#E03C31]" : "bg-gray-100 text-gray-600"
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-sm">Thông tin định danh</h3>
            <div className="divide-y divide-gray-100 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-400">Họ và tên:</span>
                <span className="font-bold text-gray-800">{user.name}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="font-medium text-gray-800">{user.email}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-400">Số điện thoại:</span>
                <span className="font-medium text-gray-800">{user.phone || "Chưa cập nhật"}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-gray-400">Số dư ví DigiKash:</span>
                <span className="font-black text-[#E03C31] text-sm">{formatCurrencyVND(user.walletBalance || 0)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-sm">Chứng chỉ & Xác minh (KYC)</h3>
            {user.agentCertificate ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs">
                <p className="font-bold text-emerald-900">
                  Chứng chỉ hành nghề BĐS: {user.agentCertificate.certNumber}
                </p>
                <p className="text-emerald-700">Ngày cấp: {user.agentCertificate.issueDate}</p>
                <p className="text-emerald-700">CCCD/CMND: {user.agentCertificate.idCard}</p>
                <span className="inline-block mt-2 font-bold px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-800">
                  Trạng thái: {user.agentCertificate.status}
                </span>
              </div>
            ) : (
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-center text-xs text-gray-500">
                Chưa nộp hồ sơ chứng chỉ hành nghề môi giới
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "properties" && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm mb-4">Các tin đăng của người dùng ({properties.length})</h3>
          {properties.length === 0 ? (
            <p className="text-xs text-gray-500">Người dùng này chưa đăng tin bất động sản nào.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {properties.map((p) => (
                <div key={p.id} className="border border-gray-200 rounded-xl p-3 space-y-2">
                  <img src={p.images?.[0]?.url} alt="" className="w-full aspect-video object-cover rounded-lg" />
                  <h4 className="font-bold text-gray-900 text-xs line-clamp-2">{p.title}</h4>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-[#E03C31] text-xs">{formatPrice(p.price, p.isForRent)}</span>
                    <StatusBadge status={p.status} size="sm" />
                  </div>
                  <Link
                    href={`/admin/tin-dang/${p.id}`}
                    className="block text-center text-xs text-blue-600 hover:underline pt-2 border-t border-gray-100"
                  >
                    Xem chi tiết tin
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "transactions" && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-200 bg-gray-50">
            <h3 className="font-bold text-gray-900 text-sm">Lịch sử nạp tiền & mua gói tin ({transactions.length})</h3>
          </div>
          {transactions.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-xs">Chưa có giao dịch thanh toán nào.</div>
          ) : (
            <div className="divide-y divide-gray-100 text-xs">
              {transactions.map((tx) => (
                <div key={tx.id} className="p-4 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-900">{tx.packageName}</span>
                    <p className="text-gray-400 font-mono mt-0.5">{tx.code} • {formatDateVi(tx.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-gray-900 block">{formatCurrencyVND(tx.amount)}</span>
                    <StatusBadge status={tx.status} size="sm" className="mt-1" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "audit" && (
        <AuditTrail logs={auditLogs} title={`Lịch sử kiểm toán tài khoản: ${user.name}`} />
      )}

      {/* Reason Dialog for Ban */}
      <ReasonDialog
        isOpen={banModalOpen}
        title={user.isBlocked ? "Mở khóa tài khoản" : "Khóa tài khoản thành viên"}
        description="Nhập lý do thao tác để lưu trữ vào Audit Trail."
        confirmText={user.isBlocked ? "Xác nhận mở khóa" : "Xác nhận khóa tài khoản"}
        isLoading={loading}
        onConfirm={handleToggleBlock}
        onClose={() => setBanModalOpen(false)}
      />

      {/* Adjust Wallet Modal */}
      {walletModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900 text-lg">Điều chỉnh số dư ví DigiKash</h3>
            <p className="text-xs text-gray-500">
              Số dư hiện tại: <span className="font-bold text-[#E03C31]">{formatCurrencyVND(user.walletBalance || 0)}</span>
            </p>

            <form onSubmit={handleAdjustWallet} className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setWalletType("ADD")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-colors ${
                    walletType === "ADD"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                      : "bg-gray-50 text-gray-600 border-gray-200"
                  }`}
                >
                  + Cộng số dư
                </button>
                <button
                  type="button"
                  onClick={() => setWalletType("DEDUCT")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-colors ${
                    walletType === "DEDUCT"
                      ? "bg-rose-50 text-rose-700 border-rose-300"
                      : "bg-gray-50 text-gray-600 border-gray-200"
                  }`}
                >
                  - Trừ số dư
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
                  value={walletAmount}
                  onChange={(e) => setWalletAmount(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Lý do bắt buộc (ghi vào Audit Log):
                </label>
                <textarea
                  rows={2}
                  required
                  value={walletReason}
                  onChange={(e) => setWalletReason(e.target.value)}
                  placeholder="Ví dụ: Nạp tiền khuyến mãi mở sàn, hoặc hoàn tiền gói tin..."
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5 resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setWalletModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#E03C31] hover:bg-[#B8281F] rounded-lg shadow-sm"
                >
                  Lưu số dư
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

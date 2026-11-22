"use client";

import React, { useState } from "react";
import { TransactionItem } from "@/lib/repositories/transaction.repo";
import { formatCurrencyVND, formatDateVi } from "@/lib/utils";
import { StatusBadge } from "@/components/admin/status-badge";
import { ReasonDialog } from "@/components/admin/reason-dialog";
import { Check, RotateCcw, Eye, X, CreditCard, Search, Filter } from "lucide-react";
import { useRouter } from "next/navigation";

interface TransactionsClientProps {
  initialTransactions: TransactionItem[];
}

export function TransactionsClient({ initialTransactions }: TransactionsClientProps) {
  const router = useRouter();
  const [transactions, setTransactions] = useState<TransactionItem[]>(initialTransactions);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [methodFilter, setMethodFilter] = useState("ALL");
  const [previewBillUrl, setPreviewBillUrl] = useState<string | null>(null);
  const [refundTarget, setRefundTarget] = useState<TransactionItem | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleConfirm = async (txId: string) => {
    setLoadingId(txId);
    try {
      const res = await fetch(`/api/admin/transactions/${txId}/confirm`, { method: "POST" });
      if (res.ok) {
        setTransactions((prev) =>
          prev.map((t) => (t.id === txId ? { ...t, status: "COMPLETED" } : t))
        );
        router.refresh();
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handleRefundConfirm = async (reason: string) => {
    if (!refundTarget) return;
    setLoadingId(refundTarget.id);
    try {
      const res = await fetch(`/api/admin/transactions/${refundTarget.id}/refund`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      if (res.ok) {
        setTransactions((prev) =>
          prev.map((t) => (t.id === refundTarget.id ? { ...t, status: "REFUNDED", refundReason: reason } : t))
        );
        setRefundTarget(null);
        router.refresh();
      }
    } finally {
      setLoadingId(null);
    }
  };

  const filtered = transactions.filter((t) => {
    if (statusFilter !== "ALL" && t.status !== statusFilter) return false;
    if (methodFilter !== "ALL" && t.paymentMethod !== methodFilter) return false;
    return true;
  });

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden space-y-0">
      {/* Filters Header */}
      <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-gray-900 text-base">
            Nhật ký giao dịch ({filtered.length})
          </h3>
          <p className="text-xs text-gray-500">
            Kiểm tra bằng chứng chuyển khoản và quản lý trạng thái thanh toán
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-2.5 py-1.5 bg-gray-50"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="PENDING">Chờ xác nhận (Pending)</option>
            <option value="COMPLETED">Đã thanh toán (Completed)</option>
            <option value="REFUNDED">Đã hoàn tiền (Refunded)</option>
          </select>

          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-2.5 py-1.5 bg-gray-50"
          >
            <option value="ALL">Tất cả phương thức</option>
            <option value="BANK_TRANSFER">Chuyển khoản (Bank)</option>
            <option value="VNPAY">VNPAY QR</option>
            <option value="MOMO">Ví MoMo</option>
            <option value="VIETQR">Napas 247 VietQR</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50/60 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Mã GD</th>
              <th className="py-3.5 px-4">Người thanh toán</th>
              <th className="py-3.5 px-4">Gói dịch vụ</th>
              <th className="py-3.5 px-4">Số tiền</th>
              <th className="py-3.5 px-4">Phương thức</th>
              <th className="py-3.5 px-4">Bằng chứng (Bill)</th>
              <th className="py-3.5 px-4">Trạng thái</th>
              <th className="py-3.5 px-4">Thời gian</th>
              <th className="py-3.5 px-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-gray-800">
                  {tx.code}
                </td>

                <td className="py-3.5 px-4">
                  <span className="font-bold text-gray-900 block">{tx.userName}</span>
                  <span className="text-[11px] text-gray-400">{tx.userEmail}</span>
                </td>

                <td className="py-3.5 px-4 text-gray-700 font-medium">
                  {tx.packageName}
                </td>

                <td className="py-3.5 px-4 font-black text-[#E03C31]">
                  {formatCurrencyVND(tx.amount)}
                </td>

                <td className="py-3.5 px-4 font-semibold text-gray-700">
                  {tx.paymentMethod}
                </td>

                <td className="py-3.5 px-4">
                  {tx.billImageUrl ? (
                    <button
                      onClick={() => setPreviewBillUrl(tx.billImageUrl!)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-1 rounded"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Xem bill
                    </button>
                  ) : (
                    <span className="text-[11px] text-gray-400">Tự động (Cổng)</span>
                  )}
                </td>

                <td className="py-3.5 px-4">
                  <StatusBadge status={tx.status} size="sm" />
                  {tx.refundReason && (
                    <span className="block text-[10px] text-rose-600 mt-1 truncate max-w-xs" title={tx.refundReason}>
                      Lý do: {tx.refundReason}
                    </span>
                  )}
                </td>

                <td className="py-3.5 px-4 text-gray-400">
                  {formatDateVi(tx.createdAt)}
                </td>

                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                  <div className="flex items-center justify-center space-x-1.5">
                    {tx.status === "PENDING" && (
                      <button
                        onClick={() => handleConfirm(tx.id)}
                        disabled={loadingId === tx.id}
                        title="Xác nhận thanh toán & Kích hoạt gói"
                        className="px-2.5 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Xác nhận
                      </button>
                    )}

                    {tx.status === "COMPLETED" && (
                      <button
                        onClick={() => setRefundTarget(tx)}
                        disabled={loadingId === tx.id}
                        title="Hoàn tiền giao dịch"
                        className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bill Preview Modal */}
      {previewBillUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-sm">Bằng chứng chuyển khoản ngân hàng</h3>
              <button onClick={() => setPreviewBillUrl(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <img src={previewBillUrl} alt="Bill" className="w-full rounded-xl border object-contain max-h-[70vh]" />
            <div className="flex justify-end">
              <button
                onClick={() => setPreviewBillUrl(null)}
                className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Refund Reason Dialog */}
      <ReasonDialog
        isOpen={Boolean(refundTarget)}
        title={`Hoàn tiền giao dịch: ${refundTarget?.code}`}
        description="Nhập lý do hoàn tiền bắt buộc để ghi lại nhật ký kiểm toán."
        presetReasons={[
          "Khách hàng chuyển khoản nhầm số tiền",
          "Thanh toán trùng lặp cho cùng một tin đăng",
          "Hủy dịch vụ theo yêu cầu hợp lệ của khách hàng",
        ]}
        confirmText="Xác nhận hoàn tiền"
        isLoading={Boolean(loadingId)}
        onConfirm={handleRefundConfirm}
        onClose={() => setRefundTarget(null)}
      />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { ViolationReport } from "@/lib/repositories/report.repo";
import { formatDateVi } from "@/lib/utils";
import { StatusBadge } from "@/components/admin/status-badge";
import { AlertTriangle, Check, X, Eye, Phone, User, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ReportAdminClientProps {
  initialReports: ViolationReport[];
}

export function ReportAdminClient({ initialReports }: ReportAdminClientProps) {
  const router = useRouter();
  const [reports, setReports] = useState<ViolationReport[]>(initialReports);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAction = async (id: string, action: "RESOLVE" | "DISMISS") => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/reports/${id}/resolve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (res.ok) {
        setReports((prev) =>
          prev.map((r) =>
            r.id === id ? { ...r, status: action === "RESOLVE" ? "RESOLVED" : "DISMISSED" } : r
          )
        );
        router.refresh();
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-base">Danh sách phản ánh vi phạm ({reports.length})</h3>
          <p className="text-xs text-gray-500">Tự động gom nhóm các báo cáo trùng lặp về cùng một tin đăng</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50/60 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Tin đăng bị phản ánh</th>
              <th className="py-3.5 px-4">Lý do vi phạm</th>
              <th className="py-3.5 px-4">Nội dung chi tiết</th>
              <th className="py-3.5 px-4">Người báo cáo</th>
              <th className="py-3.5 px-4">Số lượt báo</th>
              <th className="py-3.5 px-4">Trạng thái</th>
              <th className="py-3.5 px-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reports.map((rep) => (
              <tr key={rep.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3.5 px-4 max-w-xs">
                  <Link
                    href={`/admin/tin-dang/${rep.propertyId}`}
                    className="font-bold text-gray-900 hover:text-[#E03C31] block truncate"
                  >
                    {rep.propertyTitle}
                  </Link>
                  <span className="text-[10px] text-gray-400 font-mono">ID: {rep.propertyId}</span>
                </td>

                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-rose-50 text-rose-700 border border-rose-200">
                    {rep.reasonLabel}
                  </span>
                </td>

                <td className="py-3.5 px-4 max-w-sm text-gray-600">
                  <p className="line-clamp-2">{rep.description}</p>
                </td>

                <td className="py-3.5 px-4 whitespace-nowrap">
                  <p className="font-semibold text-gray-800">{rep.reporterName}</p>
                  <p className="text-[11px] text-gray-400 font-mono">{rep.reporterPhone}</p>
                </td>

                <td className="py-3.5 px-4 whitespace-nowrap font-bold text-rose-600">
                  {rep.reportCount} lần
                </td>

                <td className="py-3.5 px-4 whitespace-nowrap">
                  <StatusBadge status={rep.status} size="sm" />
                </td>

                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                  <div className="flex items-center justify-center space-x-1.5">
                    {rep.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => handleAction(rep.id, "RESOLVE")}
                          disabled={loadingId === rep.id}
                          title="Chấp nhận (Ẩn tin & cảnh cáo tác giả)"
                          className="px-2.5 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Chấp nhận
                        </button>
                        <button
                          onClick={() => handleAction(rep.id, "DISMISS")}
                          disabled={loadingId === rep.id}
                          title="Bác bỏ báo cáo"
                          className="px-2.5 py-1 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                          Bác bỏ
                        </button>
                      </>
                    )}

                    <Link
                      href={`/admin/tin-dang/${rep.propertyId}`}
                      className="p-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Xem tin đăng"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

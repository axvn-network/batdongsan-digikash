"use client";

import React, { useState } from "react";
import { AuditLogItem } from "@/types";
import { StatusBadge } from "@/components/admin/status-badge";
import { ShieldAlert, Search, Download, Clock, User, ArrowRight, Eye, Code } from "lucide-react";

interface AuditLogClientProps {
  initialLogs: AuditLogItem[];
}

export function AuditLogClient({ initialLogs }: AuditLogClientProps) {
  const [logs, setLogs] = useState<AuditLogItem[]>(initialLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [entityFilter, setEntityFilter] = useState("ALL");
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(null);

  const exportCSV = () => {
    const headers = "ID,Action,Entity,EntityID,User,Role,IP,Severity,CreatedAt\n";
    const rows = logs
      .map(
        (l) =>
          `"${l.id}","${l.action}","${l.entity}","${l.entityId || ""}","${l.userName || l.userId || ""}","${l.userRole || ""}","${l.ip || ""}","${l.severity || ""}","${l.createdAt}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit_logs_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const filtered = logs.filter((l) => {
    if (entityFilter !== "ALL" && l.entity !== entityFilter) return false;
    if (severityFilter !== "ALL" && l.severity !== severityFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchAction = l.action.toLowerCase().includes(q);
      const matchUser = (l.userName || "").toLowerCase().includes(q) || (l.userEmail || "").toLowerCase().includes(q);
      const matchEntity = l.entity.toLowerCase().includes(q) || (l.entityId || "").toLowerCase().includes(q);
      if (!matchAction && !matchUser && !matchEntity) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search & Export Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm action, người dùng, entity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg w-64"
            />
          </div>

          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-gray-50"
          >
            <option value="ALL">Tất cả đối tượng (Entity)</option>
            <option value="Property">Property (Tin đăng)</option>
            <option value="User">User (Người dùng)</option>
            <option value="Role">Role (Vai trò)</option>
            <option value="Wallet">Wallet (Ví số dư)</option>
            <option value="Transaction">Transaction (Giao dịch)</option>
            <option value="Settings">Settings (Cấu hình)</option>
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 bg-gray-50"
          >
            <option value="ALL">Tất cả mức độ</option>
            <option value="INFO">INFO (Thông tin)</option>
            <option value="WARNING">WARNING (Cảnh báo)</option>
            <option value="CRITICAL">CRITICAL (Nghiêm trọng)</option>
          </select>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border border-gray-200 shadow-sm"
        >
          <Download className="w-4 h-4" />
          Xuất dữ liệu CSV
        </button>
      </div>

      {/* Logs Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/60 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Thời gian</th>
                <th className="py-3.5 px-4">Hành động (Action)</th>
                <th className="py-3.5 px-4">Đối tượng (Entity)</th>
                <th className="py-3.5 px-4">Người thực hiện</th>
                <th className="py-3.5 px-4">Địa chỉ IP</th>
                <th className="py-3.5 px-4">Mức độ</th>
                <th className="py-3.5 px-4 text-center">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-gray-500 whitespace-nowrap">
                    {new Date(l.createdAt).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                      {l.action}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-gray-800">{l.entity}</span>
                    {l.entityId && (
                      <span className="text-[11px] text-gray-400 font-mono block">#{l.entityId}</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-bold text-gray-900 block">{l.userName || l.userId || "Hệ thống"}</span>
                    <span className="text-[11px] text-gray-400">{l.userRole || "ADMIN"}</span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-gray-500">
                    {l.ip || "127.0.0.1"}
                  </td>

                  <td className="py-3.5 px-4">
                    <StatusBadge status={l.severity || "INFO"} size="sm" />
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => setSelectedLog(l)}
                      className="p-1.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Xem biến động JSON"
                    >
                      <Code className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* JSON Diff Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-sm">
                  Chi tiết bản ghi kiểm toán: {selectedLog.action}
                </h3>
                <p className="text-xs text-gray-400 font-mono">ID: {selectedLog.id}</p>
              </div>
              <button onClick={() => setSelectedLog(null)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <div className="text-xs space-y-2">
              <p><span className="text-gray-400">Người thực hiện:</span> <span className="font-bold">{selectedLog.userName} ({selectedLog.userRole})</span></p>
              <p><span className="text-gray-400">User Agent:</span> <span className="font-mono text-gray-600">{selectedLog.userAgent || "Unknown"}</span></p>
            </div>

            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto space-y-3">
              {selectedLog.before && (
                <div>
                  <span className="text-rose-400 font-bold block mb-1">Dữ liệu trước thay đổi (Before):</span>
                  <pre className="text-rose-200">{JSON.stringify(selectedLog.before, null, 2)}</pre>
                </div>
              )}
              {selectedLog.after && (
                <div className="border-t border-slate-700 pt-3">
                  <span className="text-emerald-400 font-bold block mb-1">Dữ liệu sau thay đổi (After):</span>
                  <pre className="text-emerald-200">{JSON.stringify(selectedLog.after, null, 2)}</pre>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

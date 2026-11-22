"use client";

import React from "react";
import { AuditLogItem } from "@/types";
import { StatusBadge } from "./status-badge";
import { Clock, User, ShieldAlert, ArrowRight } from "lucide-react";

interface AuditTrailProps {
  logs: AuditLogItem[];
  title?: string;
  emptyText?: string;
}

export function AuditTrail({
  logs,
  title = "Lịch sử thao tác & kiểm toán (Audit Trail)",
  emptyText = "Chưa có thao tác kiểm toán nào được ghi nhận.",
}: AuditTrailProps) {
  if (!logs || logs.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" />
          {title}
        </h3>
        <span className="text-xs text-gray-500 font-medium">
          {logs.length} bản ghi thao tác
        </span>
      </div>

      <div className="divide-y divide-gray-100">
        {logs.map((log) => {
          const dateStr = new Date(log.createdAt).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          return (
            <div key={log.id} className="p-4 sm:p-5 hover:bg-gray-50/70 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                    {log.action}
                  </span>
                  <StatusBadge status={log.severity || "INFO"} size="sm" />
                </div>
                <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {dateStr}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                <span className="flex items-center gap-1 font-medium text-gray-900">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  {log.userName || log.userEmail || "Hệ thống"}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-500">{log.userRole || "ADMIN"}</span>
                {log.ip && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="font-mono text-gray-400">IP: {log.ip}</span>
                  </>
                )}
              </div>

              {(log.before || log.after) && (
                <div className="mt-2 text-xs bg-slate-900 text-slate-200 rounded-lg p-3 font-mono overflow-x-auto space-y-1">
                  {log.before && (
                    <div className="text-rose-400">
                      <span className="font-bold">- Trước: </span>
                      {JSON.stringify(log.before)}
                    </div>
                  )}
                  {log.after && (
                    <div className="text-emerald-400">
                      <span className="font-bold">+ Sau: </span>
                      {JSON.stringify(log.after)}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

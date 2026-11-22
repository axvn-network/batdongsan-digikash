"use client";

import { useState } from "react";
import { Inquiry } from "@/types";
import { formatDateVi } from "@/lib/utils";
import { Phone, Mail, CheckCircle2, Clock } from "lucide-react";

export function LeadsTable({ initialLeads }: { initialLeads: Inquiry[] }) {
  const [leads, setLeads] = useState<Inquiry[]>(initialLeads);

  const updateStatus = async (id: string, newStatus: "NEW" | "PROCESSING" | "RESPONDED") => {
    setLeads((curr) =>
      curr.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
  };

  const exportCSV = () => {
    const headers = "ID,Khách hàng,Số điện thoại,Email,Bất động sản,Nội dung,Trạng thái,Thời gian\n";
    const rows = leads.map(l => `"${l.id}","${l.senderName}","${l.senderPhone}","${l.senderEmail || ''}","${l.propertyTitle || ''}","${l.message.replace(/"/g, '""')}","${l.status}","${l.createdAt}"`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-gray-900 text-base">Quản lý Yêu cầu & Khách hàng tiềm năng (Leads)</h3>
          <p className="text-xs text-gray-500">Khách hàng yêu cầu tư vấn, đặt lịch xem hoặc gửi tin nhắn quan tâm</p>
        </div>
        <button
          onClick={exportCSV}
          className="px-3.5 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border border-gray-200"
        >
          Xuất dữ liệu CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50/60 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Khách hàng</th>
              <th className="py-3.5 px-4">Số điện thoại</th>
              <th className="py-3.5 px-4">Bất động sản quan tâm</th>
              <th className="py-3.5 px-4">Nội dung yêu cầu</th>
              <th className="py-3.5 px-4">Trạng thái xử lý</th>
              <th className="py-3.5 px-4">Thời gian</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-gray-900 whitespace-nowrap">
                  {item.senderName}
                </td>

                <td className="py-3.5 px-4 whitespace-nowrap">
                  <a
                    href={`tel:${item.senderPhone}`}
                    className="font-semibold text-emerald-600 hover:underline flex items-center space-x-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{item.senderPhone}</span>
                  </a>
                  {item.senderEmail && (
                    <span className="text-[11px] text-gray-400 block mt-0.5">{item.senderEmail}</span>
                  )}
                </td>

                <td className="py-3.5 px-4 max-w-xs truncate text-gray-700 font-medium">
                  {item.propertyTitle || "Bất động sản"}
                </td>

                <td className="py-3.5 px-4 max-w-sm text-gray-600">
                  <p className="line-clamp-2">{item.message}</p>
                </td>

                <td className="py-3.5 px-4 whitespace-nowrap">
                  <select
                    value={item.status}
                    onChange={(e) => updateStatus(item.id, e.target.value as any)}
                    className={`p-1.5 rounded-lg text-xs font-bold border focus:outline-none ${
                      item.status === "NEW"
                        ? "bg-red-50 text-red-600 border-red-200"
                        : item.status === "PROCESSING"
                        ? "bg-amber-50 text-amber-600 border-amber-200"
                        : "bg-emerald-50 text-emerald-600 border-emerald-200"
                    }`}
                  >
                    <option value="NEW">Mới tiếp nhận</option>
                    <option value="PROCESSING">Đang xử lý</option>
                    <option value="RESPONDED">Đã phản hồi</option>
                  </select>
                </td>

                <td className="py-3.5 px-4 text-gray-400 whitespace-nowrap">
                  {formatDateVi(item.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

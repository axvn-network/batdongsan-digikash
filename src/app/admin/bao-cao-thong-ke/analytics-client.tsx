"use client";

import React from "react";
import { formatCurrencyVND } from "@/lib/utils";
import { BarChart3, TrendingUp, Download, Building, Users, DollarSign, MessageSquare } from "lucide-react";

export function AnalyticsClient({ stats }: { stats: any }) {
  const topDistricts = [
    { name: "Quận Bình Thạnh (TP.HCM)", count: 245, pct: "28%" },
    { name: "Quận Cầu Giấy (Hà Nội)", count: 198, pct: "22%" },
    { name: "TP. Thủ Đức (TP.HCM)", count: 172, pct: "19%" },
    { name: "Quận Nam Từ Liêm (Hà Nội)", count: 140, pct: "16%" },
    { name: "Quận 7 (TP.HCM)", count: 110, pct: "15%" },
  ];

  const packagesRevenue = [
    { name: "Gói VIP Kim Cương", count: 18, rev: 45000000, share: "55%" },
    { name: "Gói VIP Vàng", count: 24, rev: 22800000, share: "28%" },
    { name: "Gói VIP Bạc", count: 40, rev: 14000000, share: "17%" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Bar with export */}
      <div className="flex justify-end">
        <button
          onClick={() => alert("Đang kết xuất báo cáo PDF số liệu sàn...")}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#E03C31] hover:bg-[#B8281F] rounded-lg shadow-sm"
        >
          <Download className="w-4 h-4" />
          Xuất báo cáo PDF / Excel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top 5 Locations Chart */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <Building className="w-4 h-4 text-[#E03C31]" />
              Top 5 Quận / Huyện có nhiều tin đăng nhất
            </h3>
            <span className="text-xs text-gray-400">Tháng này</span>
          </div>

          <div className="space-y-3">
            {topDistricts.map((d, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-800">{d.name}</span>
                  <span className="text-[#E03C31]">{d.count} tin ({d.pct})</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#E03C31] h-2 rounded-full"
                    style={{ width: d.pct }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Package */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              Cơ cấu doanh thu theo gói dịch vụ
            </h3>
            <span className="text-xs font-bold text-emerald-600">81.800.000 ₫</span>
          </div>

          <div className="divide-y divide-gray-100 text-xs">
            {packagesRevenue.map((p, i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">{p.name}</p>
                  <p className="text-gray-400 text-[11px]">{p.count} lượt đăng ký</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-gray-900">{formatCurrencyVND(p.rev)}</p>
                  <span className="text-[11px] text-emerald-600 font-bold">{p.share} thị phần</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs text-gray-500 font-semibold uppercase">Thời gian phản hồi Leads TB</span>
          <p className="text-2xl font-black text-gray-900">18 phút</p>
          <span className="text-xs text-emerald-600 font-semibold">Nhanh hơn 35% so với quý trước</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs text-gray-500 font-semibold uppercase">Tỷ lệ tin có Sổ đỏ chính chủ</span>
          <p className="text-2xl font-black text-emerald-600">68.4%</p>
          <span className="text-xs text-gray-400">Được thẩm định pháp lý</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-2">
          <span className="text-xs text-gray-500 font-semibold uppercase">Tỷ lệ giữ chân Môi giới (Retention)</span>
          <p className="text-2xl font-black text-indigo-600">84.2%</p>
          <span className="text-xs text-emerald-600 font-semibold">Tái gia hạn gói tháng thứ 3</span>
        </div>
      </div>
    </div>
  );
}

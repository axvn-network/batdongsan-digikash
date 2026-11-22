"use client";

import { PriceHistoryItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

export function PriceHistoryChart({ items = [] }: { items?: PriceHistoryItem[] }) {
  if (!items || items.length < 2) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 mb-2">Lịch sử biến động giá</h3>
        <p className="text-xs text-gray-500">
          Chưa đủ dữ liệu lịch sử để hiển thị biểu đồ xu hướng giá cho bất động sản này.
        </p>
      </div>
    );
  }

  // Calculate percentage change
  const firstPrice = items[0].price;
  const lastPrice = items[items.length - 1].price;
  const diff = lastPrice - firstPrice;
  const pct = ((diff / firstPrice) * 100).toFixed(1);

  const maxPrice = Math.max(...items.map((i) => i.price));
  const minPrice = Math.min(...items.map((i) => i.price));
  const range = maxPrice - minPrice || 1;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <h3 className="text-base font-bold text-gray-900">Lịch sử biến động giá</h3>
          <p className="text-xs text-gray-500">Biến động giá niêm yết theo thời gian</p>
        </div>
        <div className="flex items-center space-x-1 bg-red-50 text-[#E03C31] px-2.5 py-1 rounded-full text-xs font-bold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{Number(pct) >= 0 ? `+${pct}%` : `${pct}%`}</span>
        </div>
      </div>

      {/* SVG Responsive Line Chart */}
      <div className="h-44 w-full relative pt-4">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="20" x2="400" y2="20" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="60" x2="400" y2="60" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="0" y1="100" x2="400" y2="100" stroke="#f1f5f9" strokeWidth="1" />

          {/* Polyline */}
          <polyline
            fill="none"
            stroke="#E03C31"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={items
              .map((item, idx) => {
                const x = (idx / (items.length - 1)) * 380 + 10;
                const y = 100 - ((item.price - minPrice) / range) * 80;
                return `${x},${y}`;
              })
              .join(" ")}
          />

          {/* Data Points */}
          {items.map((item, idx) => {
            const x = (idx / (items.length - 1)) * 380 + 10;
            const y = 100 - ((item.price - minPrice) / range) * 80;
            return (
              <g key={item.id || idx}>
                <circle cx={x} cy={y} r="5" fill="#ffffff" stroke="#E03C31" strokeWidth="3" />
              </g>
            );
          })}
        </svg>

        {/* Labels below */}
        <div className="flex justify-between items-center text-[11px] text-gray-500 pt-3">
          {items.map((item, idx) => {
            const date = new Date(item.recordedAt);
            const label = `T${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
            return (
              <div key={idx} className="text-center">
                <p className="font-semibold text-gray-800">{formatPrice(item.price)}</p>
                <p className="text-gray-400 text-[10px]">{label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useCompare } from "@/hooks/use-compare";
import { formatPrice } from "@/lib/utils";
import { Scale, X, ArrowRight } from "lucide-react";

export function CompareBar() {
  const { items, removeItem, clear } = useCompare();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl py-3 px-4 transition-all animate-in slide-in-from-bottom">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left header */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">
              So sánh bất động sản ({items.length}/4)
            </h4>
            <p className="text-xs text-gray-500">Chọn tối đa 4 bất động sản để so sánh các thông số</p>
          </div>
        </div>

        {/* Selected Items */}
        <div className="flex items-center space-x-2 overflow-x-auto max-w-full py-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-lg p-1.5 pr-6 flex-shrink-0"
            >
              <img
                src={item.images?.[0]?.url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=80"}
                alt={item.title}
                className="w-8 h-8 rounded object-cover"
              />
              <div className="max-w-[120px]">
                <p className="text-[11px] font-bold text-gray-900 truncate">{formatPrice(item.price, item.isForRent)}</p>
                <p className="text-[10px] text-gray-500 truncate">{item.title}</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={clear}
            className="text-xs text-gray-500 hover:text-gray-800 px-3 py-2"
          >
            Xóa hết
          </button>
          <Link
            href="/so-sanh"
            className="flex items-center space-x-1.5 bg-[#E03C31] hover:bg-[#B8281F] text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all"
          >
            <span>So sánh ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CITIES, PROPERTY_TYPES, PRICE_RANGES_BUY, PRICE_RANGES_RENT, AREA_RANGES, DIRECTIONS, LEGAL_STATUSES } from "@/lib/constants";
import { Filter, RotateCcw } from "lucide-react";

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isForRent = searchParams.get("isForRent") === "true";
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [district, setDistrict] = useState(searchParams.get("district") || "");
  const [propertyTypeId, setPropertyTypeId] = useState(searchParams.get("propertyTypeId") || "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "");
  const [direction, setDirection] = useState(searchParams.get("direction") || "");
  const [legalStatus, setLegalStatus] = useState(searchParams.get("legalStatus") || "");

  const priceRanges = isForRent ? PRICE_RANGES_RENT : PRICE_RANGES_BUY;

  const applyFilters = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([k, v]) => {
      if (v === null || v === "") {
        params.delete(k);
      } else {
        params.set(k, v);
      }
    });
    params.set("page", "1");
    router.push(`/bat-dong-san?${params.toString()}`);
  };

  const resetAll = () => {
    router.push(isForRent ? "/bat-dong-san?isForRent=true" : "/bat-dong-san?isForRent=false");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-6 text-sm">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center space-x-2 font-bold text-gray-900">
          <Filter className="w-4 h-4 text-[#E03C31]" />
          <span>Bộ lọc tìm kiếm</span>
        </div>
        <button
          onClick={resetAll}
          className="text-xs text-gray-400 hover:text-[#E03C31] flex items-center space-x-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Đặt lại</span>
        </button>
      </div>

      {/* Bộ lọc Sổ đỏ xác thực (Vũ khí khác biệt cốt lõi) */}
      <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
        <label className="flex items-center space-x-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={searchParams.get("isVerifiedOnly") === "true"}
            onChange={(e) => {
              applyFilters({ isVerifiedOnly: e.target.checked ? "true" : null });
            }}
            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300"
          />
          <div>
            <span className="text-xs font-bold text-emerald-900 block">
              ✓ Chỉ hiện tin đã xác thực
            </span>
            <span className="text-[10px] text-emerald-700 block mt-0.5">
              Đã kiểm định sổ đỏ & quy hoạch
            </span>
          </div>
        </label>
      </div>

      {/* Loại hình */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Loại hình</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => applyFilters({ isForRent: "false" })}
            className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
              !isForRent ? "bg-[#E03C31] text-white border-[#E03C31]" : "bg-gray-50 border-gray-200 text-gray-700"
            }`}
          >
            Nhà đất bán
          </button>
          <button
            type="button"
            onClick={() => applyFilters({ isForRent: "true" })}
            className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
              isForRent ? "bg-[#E03C31] text-white border-[#E03C31]" : "bg-gray-50 border-gray-200 text-gray-700"
            }`}
          >
            Cho thuê
          </button>
        </div>
      </div>

      {/* Tỉnh / Thành */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Khu vực</label>
        <select
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            applyFilters({ city: e.target.value || null });
          }}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#E03C31]"
        >
          <option value="">Tất cả tỉnh thành</option>
          {CITIES.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Loại BĐS */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Loại bất động sản</label>
        <select
          value={propertyTypeId}
          onChange={(e) => {
            setPropertyTypeId(e.target.value);
            applyFilters({ propertyTypeId: e.target.value || null });
          }}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#E03C31]"
        >
          <option value="">Tất cả loại nhà đất</option>
          {PROPERTY_TYPES.map((pt) => (
            <option key={pt.id} value={pt.id}>{pt.name}</option>
          ))}
        </select>
      </div>

      {/* Mức giá */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Khoảng giá</label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {priceRanges.map((pr, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                applyFilters({
                  minPrice: pr.min > 0 ? pr.min.toString() : null,
                  maxPrice: pr.max !== Infinity ? pr.max.toString() : null,
                });
              }}
              className="w-full text-left px-2.5 py-1.5 rounded text-xs text-gray-600 hover:bg-red-50 hover:text-[#E03C31] transition-colors"
            >
              {pr.label}
            </button>
          ))}
        </div>
      </div>

      {/* Diện tích */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Diện tích</label>
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {AREA_RANGES.map((ar, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                applyFilters({
                  minArea: ar.min > 0 ? ar.min.toString() : null,
                  maxArea: ar.max !== Infinity ? ar.max.toString() : null,
                });
              }}
              className="w-full text-left px-2.5 py-1.5 rounded text-xs text-gray-600 hover:bg-red-50 hover:text-[#E03C31] transition-colors"
            >
              {ar.label}
            </button>
          ))}
        </div>
      </div>

      {/* Số phòng ngủ */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Số phòng ngủ</label>
        <div className="flex gap-1.5">
          {["1", "2", "3", "4+"].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => {
                const val = num.replace("+", "");
                setBedrooms(val);
                applyFilters({ bedrooms: val });
              }}
              className={`flex-1 py-1.5 text-xs font-medium rounded border ${
                bedrooms === num.replace("+", "")
                  ? "bg-[#E03C31] text-white border-[#E03C31]"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Hướng nhà */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Hướng nhà</label>
        <select
          value={direction}
          onChange={(e) => {
            setDirection(e.target.value);
            applyFilters({ direction: e.target.value || null });
          }}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#E03C31]"
        >
          <option value="">Tất cả hướng</option>
          {DIRECTIONS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Tình trạng pháp lý */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Tình trạng pháp lý</label>
        <select
          value={legalStatus}
          onChange={(e) => {
            setLegalStatus(e.target.value);
            applyFilters({ legalStatus: e.target.value || null });
          }}
          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-xs text-gray-700 focus:outline-none focus:border-[#E03C31]"
        >
          <option value="">Tất cả giấy tờ</option>
          {LEGAL_STATUSES.map((ls) => (
            <option key={ls} value={ls}>{ls}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

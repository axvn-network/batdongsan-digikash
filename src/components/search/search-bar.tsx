"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Building, DollarSign, Maximize2, SlidersHorizontal, Check, ShieldCheck, X } from "lucide-react";
import { PROPERTY_TYPES, CITIES, PRICE_RANGES_BUY, PRICE_RANGES_RENT, AREA_RANGES, DIRECTIONS } from "@/lib/constants";

export function SearchBar() {
  const router = useRouter();
  const [tab, setTab] = useState<"buy" | "rent" | "project">("buy");
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [propertyTypeId, setPropertyTypeId] = useState("");
  const [priceIndex, setPriceIndex] = useState("0");
  const [areaIndex, setAreaIndex] = useState("0");
  const [bedrooms, setBedrooms] = useState("");
  const [direction, setDirection] = useState("");
  const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const priceRanges = tab === "rent" ? PRICE_RANGES_RENT : PRICE_RANGES_BUY;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "project") {
      router.push(`/du-an?q=${encodeURIComponent(keyword)}`);
      return;
    }

    const params = new URLSearchParams();
    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (city) params.set("city", city);
    if (propertyTypeId) params.set("propertyTypeId", propertyTypeId);
    params.set("isForRent", tab === "rent" ? "true" : "false");

    const pIdx = Number(priceIndex);
    if (pIdx > 0 && priceRanges[pIdx]) {
      if (priceRanges[pIdx].min > 0) params.set("minPrice", priceRanges[pIdx].min.toString());
      if (priceRanges[pIdx].max !== Infinity) params.set("maxPrice", priceRanges[pIdx].max.toString());
    }

    const aIdx = Number(areaIndex);
    if (aIdx > 0 && AREA_RANGES[aIdx]) {
      if (AREA_RANGES[aIdx].min > 0) params.set("minArea", AREA_RANGES[aIdx].min.toString());
      if (AREA_RANGES[aIdx].max !== Infinity) params.set("maxArea", AREA_RANGES[aIdx].max.toString());
    }

    if (bedrooms) params.set("bedrooms", bedrooms);
    if (direction) params.set("direction", direction);
    if (isVerifiedOnly) params.set("isVerifiedOnly", "true");

    router.push(`/bat-dong-san?${params.toString()}`);
  };

  const handleReset = () => {
    setKeyword("");
    setCity("");
    setPropertyTypeId("");
    setPriceIndex("0");
    setAreaIndex("0");
    setBedrooms("");
    setDirection("");
    setIsVerifiedOnly(false);
    setShowAdvanced(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-6 border border-white/40 text-left">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4 pb-2 space-x-6 text-sm font-bold">
        <button
          type="button"
          onClick={() => {
            setTab("buy");
            setPriceIndex("0");
          }}
          className={`pb-2 relative transition-colors ${
            tab === "buy" ? "text-[#E03C31]" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Nhà đất bán
          {tab === "buy" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E03C31]" />}
        </button>
        <button
          type="button"
          onClick={() => {
            setTab("rent");
            setPriceIndex("0");
          }}
          className={`pb-2 relative transition-colors ${
            tab === "rent" ? "text-[#E03C31]" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Nhà đất cho thuê
          {tab === "rent" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E03C31]" />}
        </button>
        <button
          type="button"
          onClick={() => {
            setTab("project");
            setPriceIndex("0");
          }}
          className={`pb-2 relative transition-colors ${
            tab === "project" ? "text-[#E03C31]" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          Dự án bất động sản
          {tab === "project" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E03C31]" />}
        </button>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        {/* Main Search Input */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={
                tab === "project"
                  ? "Tìm kiếm dự án (VD: Vinhomes, Masterise, Ecopark...)"
                  : "Tìm kiếm theo địa điểm, dự án, tên đường, khu vực..."
              }
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#E03C31] focus:bg-white transition-all text-gray-800"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center space-x-2 bg-[#E03C31] hover:bg-[#B8281F] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex-shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Tìm kiếm</span>
          </button>
        </div>

        {/* Filters Row */}
        {tab !== "project" && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              {/* Tỉnh / Thành */}
              <div className="relative">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 font-medium focus:outline-none focus:border-[#E03C31]"
                >
                  <option value="">Trên toàn quốc</option>
                  {CITIES.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Loại BĐS */}
              <div className="relative">
                <select
                  value={propertyTypeId}
                  onChange={(e) => setPropertyTypeId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 font-medium focus:outline-none focus:border-[#E03C31]"
                >
                  <option value="">Tất cả loại nhà đất</option>
                  {PROPERTY_TYPES.map((pt) => (
                    <option key={pt.id} value={pt.id}>{pt.name}</option>
                  ))}
                </select>
              </div>

              {/* Mức giá */}
              <div className="relative">
                <select
                  value={priceIndex}
                  onChange={(e) => setPriceIndex(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 font-medium focus:outline-none focus:border-[#E03C31]"
                >
                  {priceRanges.map((pr, idx) => (
                    <option key={idx} value={idx}>{pr.label}</option>
                  ))}
                </select>
              </div>

              {/* Diện tích */}
              <div className="relative">
                <select
                  value={areaIndex}
                  onChange={(e) => setAreaIndex(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-700 font-medium focus:outline-none focus:border-[#E03C31]"
                >
                  {AREA_RANGES.map((ar, idx) => (
                    <option key={idx} value={idx}>{ar.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Filter Control Toggle */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                  showAdvanced || bedrooms || direction || isVerifiedOnly
                    ? "bg-red-50 text-[#E03C31] border-red-200"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Lọc nâng cao {(bedrooms || direction || isVerifiedOnly) && "(Đang chọn)"}</span>
              </button>

              {(city || propertyTypeId || priceIndex !== "0" || areaIndex !== "0" || bedrooms || direction || isVerifiedOnly) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-gray-500 hover:text-[#E03C31] flex items-center space-x-1"
                >
                  <X className="w-3 h-3" />
                  <span>Xóa bộ lọc</span>
                </button>
              )}
            </div>

            {/* Expanded Advanced Filters */}
            {showAdvanced && (
              <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-200 space-y-4 animate-in fade-in duration-200">
                {/* Phòng ngủ */}
                <div>
                  <span className="text-xs font-bold text-gray-700 block mb-2">Số phòng ngủ</span>
                  <div className="flex flex-wrap gap-2">
                    {["", "1", "2", "3", "4", "5+"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setBedrooms(item)}
                        className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                          bedrooms === item
                            ? "bg-[#E03C31] text-white border-[#E03C31]"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {item === "" ? "Bất kỳ" : `${item} PN`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hướng nhà & Xác thực Sổ đỏ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <span className="text-xs font-bold text-gray-700 block mb-1.5">Hướng nhà</span>
                    <select
                      value={direction}
                      onChange={(e) => setDirection(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg p-2 text-xs text-gray-700"
                    >
                      <option value="">Tất cả các hướng</option>
                      {DIRECTIONS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isVerifiedOnly}
                        onChange={(e) => setIsVerifiedOnly(e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-gray-300"
                      />
                      <span className="text-xs font-semibold text-emerald-800 flex items-center space-x-1">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Chỉ tin đã thẩm định sổ đỏ</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick location suggestions */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-gray-500">
          <span className="font-semibold text-gray-700">Tìm kiếm phổ biến:</span>
          {["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Bình Dương", "TP. Thủ Đức"].map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => {
                setCity(loc);
                router.push(`/bat-dong-san?city=${encodeURIComponent(loc)}`);
              }}
              className="bg-gray-100 hover:bg-red-50 hover:text-[#E03C31] px-2.5 py-1 rounded-full transition-colors text-gray-600"
            >
              {loc}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}

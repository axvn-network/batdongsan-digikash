"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "newest";

  const handleSortChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", val);
    params.set("page", "1");
    router.push(`/bat-dong-san?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-2 text-xs">
      <span className="text-gray-500 whitespace-nowrap">Sắp xếp theo:</span>
      <select
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 focus:outline-none focus:border-[#E03C31]"
      >
        <option value="newest">Thông thường (Mới nhất)</option>
        <option value="price_asc">Giá thấp đến cao</option>
        <option value="price_desc">Giá cao đến thấp</option>
        <option value="area_asc">Diện tích bé đến lớn</option>
        <option value="area_desc">Diện tích lớn đến bé</option>
        <option value="views_desc">Xem nhiều nhất</option>
      </select>
    </div>
  );
}

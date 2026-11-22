"use client";

import { useFavorites } from "@/hooks/use-favorites";
import { MOCK_PROPERTIES } from "@/lib/repositories/mock-data";
import { PropertyCard } from "@/components/property/property-card";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function UserFavoritesPage() {
  const { favoriteIds } = useFavorites();
  const favorited = MOCK_PROPERTIES.filter((p) => favoriteIds.includes(p.id));

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Danh sách tin đã lưu ({favorited.length})</h2>
          <p className="text-xs text-gray-500 mt-1">Các bất động sản bạn đánh dấu theo dõi để so sánh và liên hệ sau</p>
        </div>
      </div>

      {favorited.length === 0 ? (
        <div className="py-12 text-center space-y-3">
          <Heart className="w-12 h-12 text-gray-300 mx-auto" />
          <h4 className="font-bold text-gray-700 text-sm">Chưa có tin lưu nào</h4>
          <p className="text-xs text-gray-400">Bấm biểu tượng trái tim trên bất kỳ thẻ tin nào để lưu lại tại đây.</p>
          <Link
            href="/bat-dong-san"
            className="inline-block py-2 px-4 bg-[#E03C31] text-white text-xs font-bold rounded-lg"
          >
            Khám phá tin đăng
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {favorited.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}

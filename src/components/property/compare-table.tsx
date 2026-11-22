"use client";

import Link from "next/link";
import { useCompare } from "@/hooks/use-compare";
import { formatPrice, formatArea, formatPricePerM2 } from "@/lib/utils";
import { X, ExternalLink, Bed, Bath, Compass, FileText, Sofa, MapPin } from "lucide-react";

export function CompareTable() {
  const { items, removeItem, clear } = useCompare();

  if (items.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center space-y-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
          ⚖️
        </div>
        <h3 className="font-bold text-gray-900 text-lg">Chưa có bất động sản nào trong danh sách so sánh</h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Hãy bấm vào biểu tượng cân đong trên thẻ bất động sản bất kỳ để thêm vào bảng so sánh này (tối đa 4 căn).
        </p>
        <Link
          href="/bat-dong-san"
          className="inline-block py-2.5 px-6 bg-[#E03C31] text-white font-bold text-sm rounded-xl hover:bg-[#B8281F] transition-colors"
        >
          Khám phá danh sách tin đăng
        </Link>
      </div>
    );
  }

  const attributes = [
    { label: "Mức giá", key: "price", render: (p: any) => <strong className="text-[#E03C31] text-base">{formatPrice(p.price, p.isForRent)}</strong> },
    { label: "Đơn giá", key: "pricePerM2", render: (p: any) => formatPricePerM2(p.price, p.area, p.isForRent) || "Thoả thuận" },
    { label: "Diện tích", key: "area", render: (p: any) => formatArea(p.area) },
    { label: "Phòng ngủ", key: "bedrooms", render: (p: any) => `${p.bedrooms || 0} phòng` },
    { label: "Phòng tắm", key: "bathrooms", render: (p: any) => `${p.bathrooms || 0} phòng` },
    { label: "Hướng nhà", key: "direction", render: (p: any) => p.direction || "Chưa xác định" },
    { label: "Pháp lý", key: "legalStatus", render: (p: any) => p.legalStatus || "Sổ đỏ / Sổ hồng" },
    { label: "Nội thất", key: "furniture", render: (p: any) => p.furniture || "Cơ bản" },
    { label: "Địa chỉ", key: "address", render: (p: any) => p.address },
    { label: "Khu vực", key: "location", render: (p: any) => `${p.district}, ${p.city}` },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-bold text-gray-900 text-base">Bảng so sánh chi tiết ({items.length} bất động sản)</h2>
        <button onClick={clear} className="text-xs text-red-600 hover:underline">
          Xóa tất cả
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/50">
              <th className="p-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-48">
                Bất động sản
              </th>
              {items.map((item) => (
                <th key={item.id} className="p-4 text-left min-w-[240px] max-w-[280px]">
                  <div className="relative space-y-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute -top-1 right-0 text-gray-400 hover:text-red-500 p-1"
                      title="Bỏ so sánh"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <img
                      src={item.images?.[0]?.url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80"}
                      alt={item.title}
                      className="w-full h-36 object-cover rounded-xl"
                    />
                    <Link
                      href={`/bat-dong-san/${item.slug}`}
                      className="block font-bold text-gray-900 text-xs line-clamp-2 hover:text-[#E03C31]"
                    >
                      {item.title}
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs">
            {attributes.map((attr, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}>
                <td className="p-4 font-bold text-gray-700 bg-gray-50/70 border-r border-gray-100">
                  {attr.label}
                </td>
                {items.map((item) => (
                  <td key={item.id} className="p-4 text-gray-800">
                    {attr.render(item)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="p-4 bg-gray-50/70 border-r border-gray-100 font-bold text-gray-700">
                Thao tác
              </td>
              {items.map((item) => (
                <td key={item.id} className="p-4">
                  <Link
                    href={`/bat-dong-san/${item.slug}`}
                    className="flex items-center justify-center space-x-1 py-2 px-3 bg-[#E03C31] text-white rounded-lg font-bold text-xs hover:bg-[#B8281F] transition-colors"
                  >
                    <span>Xem chi tiết</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

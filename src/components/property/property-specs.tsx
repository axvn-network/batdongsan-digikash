import { Property } from "@/types";
import { formatPrice, formatArea, formatPricePerM2 } from "@/lib/utils";
import { Bed, Bath, Compass, FileText, Sofa, Maximize2, DollarSign } from "lucide-react";

export function PropertySpecs({ property }: { property: Property }) {
  const specs = [
    { label: "Mức giá", value: formatPrice(property.price, property.isForRent), icon: DollarSign, highlight: true },
    { label: "Diện tích", value: formatArea(property.area), icon: Maximize2 },
    { label: "Đơn giá", value: formatPricePerM2(property.price, property.area, property.isForRent) || "Thoả thuận", icon: DollarSign },
    { label: "Phòng ngủ", value: property.bedrooms ? `${property.bedrooms} phòng` : "Không xác định", icon: Bed },
    { label: "Phòng tắm / WC", value: property.bathrooms ? `${property.bathrooms} phòng` : "Không xác định", icon: Bath },
    { label: "Hướng nhà", value: property.direction || "Chưa xác định", icon: Compass },
    { label: "Pháp lý", value: property.legalStatus || "Sổ đỏ / Sổ hồng", icon: FileText },
    { label: "Nội thất", value: property.furniture || "Đầy đủ", icon: Sofa },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-base font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
        Đặc điểm bất động sản
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {specs.map((spec, idx) => {
          const Icon = spec.icon;
          return (
            <div key={idx} className="bg-gray-50/70 p-3.5 rounded-xl border border-gray-100">
              <div className="flex items-center space-x-2 text-gray-400 mb-1">
                <Icon className="w-4 h-4 text-gray-500" />
                <span className="text-xs">{spec.label}</span>
              </div>
              <p className={`text-sm font-bold ${spec.highlight ? "text-[#E03C31]" : "text-gray-900"}`}>
                {spec.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

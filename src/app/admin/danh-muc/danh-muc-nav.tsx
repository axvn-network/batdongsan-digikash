"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, MapPin, Navigation, Building2 } from "lucide-react";

export function DanhMucNav() {
  const pathname = usePathname();

  const tabs = [
    { href: "/admin/danh-muc/loai-bds", label: "Loại hình BĐS", icon: Layers },
    { href: "/admin/danh-muc/tinh-thanh", label: "Tỉnh / Thành phố", icon: MapPin },
    { href: "/admin/danh-muc/quan-huyen", label: "Quận / Huyện", icon: Navigation },
    { href: "/admin/danh-muc/du-an", label: "Dự án BĐS", icon: Building2 },
  ];

  return (
    <div className="flex border-b border-gray-200 bg-white rounded-t-xl px-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`py-3 px-5 font-bold text-xs border-b-2 transition-colors flex items-center gap-2 ${
              active
                ? "border-[#E03C31] text-[#E03C31]"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

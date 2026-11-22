"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, FileCode, Image as ImageIcon } from "lucide-react";

export function CMSNav() {
  const pathname = usePathname();

  const tabs = [
    { href: "/admin/noi-dung/bai-viet", label: "Tin tức & Cẩm nang", icon: FileText },
    { href: "/admin/noi-dung/trang", label: "Trang tĩnh & Pháp lý", icon: FileCode },
    { href: "/admin/noi-dung/banner", label: "Banner quảng cáo", icon: ImageIcon },
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

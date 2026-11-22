"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusCircle, Bookmark, User } from "lucide-react";

export function MobileBottomNavigation() {
  const pathname = usePathname();

  // Không hiển thị trên trang Admin
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    { label: "Khám phá", href: "/", icon: Home },
    { label: "Tìm kiếm", href: "/bat-dong-san", icon: Search },
    { label: "Đăng tin", href: "/dang-tin", icon: PlusCircle, isPrimary: true },
    { label: "Đã lưu", href: "/tai-khoan/yeu-thich", icon: Bookmark },
    { label: "Cá nhân", href: "/tai-khoan", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-neutral-200/80 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-[max(0.375rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          if (item.isPrimary) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-5 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#E03C31] text-white flex items-center justify-center shadow-lg shadow-red-500/30 transform active:scale-95 transition-transform">
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[11px] font-semibold text-neutral-800 mt-1">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[56px] py-1 transition-colors ${
                isActive ? "text-[#E03C31]" : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? "font-semibold" : "font-normal"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileBottomNavigation;

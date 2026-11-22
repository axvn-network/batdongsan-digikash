"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  User, 
  Building2, 
  Heart, 
  MessageSquare, 
  PlusCircle, 
  LogOut 
} from "lucide-react";
import { useSession } from "@/hooks/use-session";
import { useFavorites } from "@/hooks/use-favorites";

export function UserSidebar() {
  const pathname = usePathname();
  const { user, logout } = useSession();
  const { favoriteIds } = useFavorites();

  const links = [
    { href: "/tai-khoan", label: "Thông tin tài khoản", icon: User },
    { href: "/tai-khoan/tin-dang", label: "Quản lý tin đăng", icon: Building2 },
    { href: "/tai-khoan/yeu-thich", label: `Tin đã lưu (${favoriteIds.length})`, icon: Heart },
    { href: "/tai-khoan/tin-nhan", label: "Hộp thư nội bộ", icon: MessageSquare },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border border-gray-200 rounded-xl p-4 shadow-sm h-fit">
      {/* User profile */}
      <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
        <img
          src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
          alt="Avatar"
          className="w-12 h-12 rounded-full object-cover border border-gray-200"
        />
        <div className="overflow-hidden">
          <h4 className="text-sm font-bold text-gray-900 truncate">{user?.name || "Người dùng"}</h4>
          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-[#E03C31] font-bold">
            {user?.role === "AGENT" ? "Môi giới BĐS" : user?.role === "ADMIN" ? "Quản trị viên" : "Khách hàng"}
          </span>
        </div>
      </div>

      <div className="py-3">
        <Link
          href="/dang-tin"
          className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-[#E03C31] text-white rounded-lg text-sm font-semibold hover:bg-[#B8281F] transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Đăng tin mới</span>
        </Link>
      </div>

      <nav className="space-y-1 pt-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-red-50 text-[#E03C31] font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{link.label}</span>
            </Link>
          );
        })}

        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-red-600 transition-colors pt-4 border-t border-gray-100 mt-4"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Đăng xuất</span>
        </button>
      </nav>
    </aside>
  );
}

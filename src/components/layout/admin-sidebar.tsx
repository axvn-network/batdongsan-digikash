"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Building2, 
  CheckSquare,
  ShieldCheck, 
  AlertTriangle,
  Users, 
  Award,
  MessageSquare, 
  MessagesSquare,
  Package,
  CreditCard, 
  Wallet,
  Layers, 
  FileText, 
  FileCode,
  Image as ImageIcon,
  BellRing,
  BarChart3,
  ShieldAlert,
  KeyRound,
  Settings,
  Home, 
  LogOut,
  ChevronDown
} from "lucide-react";
import { useSession } from "@/hooks/use-session";
import { can } from "@/lib/auth/rbac";
import { PermissionKey } from "@/types";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  permission?: PermissionKey;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user } = useSession();

  const sections: NavSection[] = [
    {
      title: "TỔNG QUAN",
      items: [
        { href: "/admin", label: "Dashboard sàn", icon: LayoutDashboard, permission: "system:view_dashboard" },
      ],
    },
    {
      title: "VẬN HÀNH TIN ĐĂNG",
      items: [
        { href: "/admin/tin-dang", label: "Quản lý tin đăng", icon: Building2, permission: "property:view_all" },
        { href: "/admin/duyet-tin", label: "Hàng đợi duyệt tin", icon: CheckSquare, permission: "property:approve", badge: "Live" },
        { href: "/admin/xac-thuc", label: "Kiểm duyệt Sổ đỏ", icon: ShieldCheck, permission: "property:verify" },
        { href: "/admin/bao-cao", label: "Báo cáo vi phạm", icon: AlertTriangle, permission: "report:view" },
      ],
    },
    {
      title: "THÀNH VIÊN & MÔI GIỚI",
      items: [
        { href: "/admin/nguoi-dung", label: "Quản lý người dùng", icon: Users, permission: "user:view_list" },
        { href: "/admin/xac-thuc-moi-gioi", label: "Xác thực môi giới", icon: Award, permission: "agent:verify" },
        { href: "/admin/leads", label: "Yêu cầu / Leads", icon: MessageSquare, permission: "lead:view_all" },
        { href: "/admin/tin-nhan", label: "Kiểm duyệt hội thoại", icon: MessagesSquare, permission: "message:view_all" },
      ],
    },
    {
      title: "TÀI CHÍNH & DỊCH VỤ",
      items: [
        { href: "/admin/goi-dich-vu", label: "Gói đăng tin & VIP", icon: Package, permission: "package:view" },
        { href: "/admin/giao-dich", label: "Lịch sử giao dịch", icon: CreditCard, permission: "transaction:view_all" },
        { href: "/admin/vi-nguoi-dung", label: "Quản lý số dư ví", icon: Wallet, permission: "wallet:adjust" },
      ],
    },
    {
      title: "DỮ LIỆU & NỘI DUNG",
      items: [
        { href: "/admin/danh-muc/loai-bds", label: "Danh mục & Dự án", icon: Layers, permission: "category:view" },
        { href: "/admin/noi-dung/bai-viet", label: "CMS Tin tức / Bài viết", icon: FileText, permission: "post:view" },
        { href: "/admin/noi-dung/trang", label: "Trang tĩnh & Điều khoản", icon: FileCode, permission: "page:view" },
        { href: "/admin/noi-dung/banner", label: "Banner quảng cáo", icon: ImageIcon, permission: "banner:view" },
        { href: "/admin/thong-bao", label: "Gửi thông báo sàn", icon: BellRing, permission: "system:manage_settings" },
      ],
    },
    {
      title: "HỆ THỐNG & PHÂN QUYỀN",
      items: [
        { href: "/admin/bao-cao-thong-ke", label: "Báo cáo & Phân tích", icon: BarChart3, permission: "system:view_analytics" },
        { href: "/admin/phan-quyen/roles", label: "Vai trò & RBAC", icon: KeyRound, permission: "system:manage_roles" },
        { href: "/admin/audit-log", label: "Nhật ký kiểm toán", icon: ShieldAlert, permission: "system:view_audit_log" },
        { href: "/admin/cau-hinh", label: "Cấu hình hệ thống", icon: Settings, permission: "system:manage_settings" },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-[#1E293B] text-slate-300 min-h-screen flex flex-col justify-between border-r border-slate-700/50 flex-shrink-0">
      <div className="flex-1 overflow-y-auto">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-slate-700/60 bg-[#0F172A] sticky top-0 z-10">
          <Link href="/admin" className="flex items-center space-x-2.5">
            <div className="w-7 h-7 bg-[#E03C31] rounded flex items-center justify-center font-black text-white text-base shadow-sm">
              B
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-base leading-tight tracking-tight">Admin Portal</span>
              <span className="text-[10px] text-red-400 font-semibold tracking-wider uppercase">DigiKash Vietnam</span>
            </div>
          </Link>
        </div>

        {/* User profile snippet */}
        <div className="p-4 border-b border-slate-700/60 bg-slate-800/40 flex items-center space-x-3">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
            alt="Admin"
            className="w-10 h-10 rounded-full object-cover border border-slate-600"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">{user?.name || "Admin Portal"}</p>
            <p className="text-xs text-amber-400 font-medium">
              {user?.role === "SUPER_ADMIN" ? "Tổng Quản Trị" : user?.role === "MODERATOR" ? "Kiểm Duyệt Viên" : "Quản Trị Viên"}
            </p>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="p-3 space-y-5">
          {sections.map((section, idx) => {
            // Filter items by permission
            const visibleItems = section.items.filter((item) => {
              if (!item.permission) return true;
              return can(user, item.permission);
            });

            if (visibleItems.length === 0) return null;

            return (
              <div key={idx} className="space-y-1">
                <p className="px-3 text-[11px] font-bold text-slate-400 tracking-wider">
                  {section.title}
                </p>
                <div className="space-y-0.5">
                  {visibleItems.map((link) => {
                    const Icon = link.icon;
                    const active = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          active
                            ? "bg-[#E03C31] text-white shadow-md font-semibold"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-white" : "text-slate-400"}`} />
                          <span className="truncate">{link.label}</span>
                        </div>
                        {link.badge && (
                          <span className="text-[10px] bg-red-500/20 text-red-400 font-bold px-1.5 py-0.5 rounded border border-red-500/30">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom actions */}
      <div className="p-4 border-t border-slate-700/60 space-y-1 bg-[#0F172A]">
        <Link
          href="/"
          className="flex items-center space-x-2.5 px-3 py-2 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Về trang chủ sàn</span>
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
}

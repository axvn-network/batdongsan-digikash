"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "@/hooks/use-session";
import { useFavorites } from "@/hooks/use-favorites";
import { useCompare } from "@/hooks/use-compare";
import { 
  Heart, 
  Scale, 
  PlusCircle, 
  User as UserIcon, 
  Menu, 
  X, 
  LogOut, 
  Building2, 
  ShieldAlert,
  ChevronDown
} from "lucide-react";
import { HeaderControlMenu } from "@/components/layout/header-control-menu";

export function SiteHeader() {
  const { user, logout } = useSession();
  const { favoriteIds } = useFavorites();
  const { items: compareItems } = useCompare();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar for contact & info */}
      <div className="bg-[#F8F9FA] border-b border-gray-100 text-xs text-gray-500 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span>Hotline CSKH: <strong className="text-[#E03C31] font-semibold">1900 1881</strong></span>
            <span>Email hỗ trợ: <strong className="text-gray-700">hotro@batdongsan.com.vn</strong></span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/tin-tuc" className="hover:text-[#E03C31]">Tin tức thị trường</Link>
            <span className="text-gray-300">|</span>
            <Link href="/so-sanh" className="hover:text-[#E03C31] flex items-center space-x-1">
              <Scale className="w-3.5 h-3.5" />
              <span>So sánh ({compareItems.length})</span>
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/tai-khoan/yeu-thich" className="hover:text-[#E03C31] flex items-center space-x-1">
              <Heart className="w-3.5 h-3.5 text-[#E03C31]" />
              <span>Tin đã lưu ({favoriteIds.length})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          {/* SVG logo */}
          <div className="h-10 w-48 relative flex items-center">
            <img src="/logo.svg" alt="Batdongsan.com.vn" className="h-9 object-contain" />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-5 text-sm font-semibold text-gray-700">
          <Link href="/bat-dong-san?isForRent=false" className="hover:text-[#E03C31] transition-colors py-2">
            Nhà đất bán
          </Link>
          <Link href="/bat-dong-san?isForRent=true" className="hover:text-[#E03C31] transition-colors py-2">
            Cho thuê
          </Link>
          <Link href="/du-an" className="hover:text-[#E03C31] transition-colors py-2">
            Dự án
          </Link>
          <Link href="/doanh-nghiep" className="hover:text-[#E03C31] transition-colors py-2">
            Doanh nghiệp
          </Link>
          <Link href="/moi-gioi" className="hover:text-[#E03C31] transition-colors py-2">
            Môi giới
          </Link>
          <Link href="/thi-truong" className="hover:text-[#E03C31] transition-colors py-2">
            Giá thị trường
          </Link>
          <Link href="/tien-ich/tinh-lai-vay" className="hover:text-[#E03C31] transition-colors py-2">
            Tính lãi vay
          </Link>
          <Link href="/tien-ich/phong-thuy" className="hover:text-[#E03C31] transition-colors py-2">
            Phong thủy
          </Link>
          <Link href="/wiki" className="hover:text-[#E03C31] transition-colors py-2">
            Wiki BĐS
          </Link>
        </nav>

        {/* Right Actions: Batdongsan re__control-menu */}
        <div className="flex items-center space-x-2">
          <HeaderControlMenu />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 lg:hidden rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3">
          <Link
            href="/bat-dong-san?isForRent=false"
            className="block py-2 text-sm font-semibold text-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Nhà đất bán
          </Link>
          <Link
            href="/bat-dong-san?isForRent=true"
            className="block py-2 text-sm font-semibold text-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Nhà đất cho thuê
          </Link>
          <Link
            href="/du-an"
            className="block py-2 text-sm font-semibold text-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dự án
          </Link>
          <Link
            href="/doanh-nghiep"
            className="block py-2 text-sm font-semibold text-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Doanh nghiệp BĐS
          </Link>
          <Link
            href="/moi-gioi"
            className="block py-2 text-sm font-semibold text-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Môi giới uy tín
          </Link>
          <Link
            href="/tien-ich/tinh-lai-vay"
            className="block py-2 text-sm font-semibold text-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Tính lãi suất vay mua nhà
          </Link>
          <Link
            href="/tien-ich/phong-thuy"
            className="block py-2 text-sm font-semibold text-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Phong thủy hướng nhà
          </Link>
          <Link
            href="/wiki"
            className="block py-2 text-sm font-semibold text-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Wiki BĐS & Cẩm nang
          </Link>
          <Link
            href="/tin-tuc"
            className="block py-2 text-sm font-semibold text-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Tin tức thị trường
          </Link>
          <Link
            href="/so-sanh"
            className="block py-2 text-sm font-semibold text-gray-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            So sánh ({compareItems.length})
          </Link>
          {!user && (
            <div className="pt-3 border-t border-gray-100 flex space-x-3">
              <Link
                href="/dang-nhap"
                className="flex-1 text-center py-2 border border-gray-300 rounded text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Đăng nhập
              </Link>
              <Link
                href="/dang-ky"
                className="flex-1 text-center py-2 bg-[#E03C31] text-white rounded text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

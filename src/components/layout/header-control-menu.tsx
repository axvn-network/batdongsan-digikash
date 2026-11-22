"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/hooks/use-session";
import { useFavorites } from "@/hooks/use-favorites";
import { 
  Heart, 
  Bell, 
  Smartphone, 
  X, 
  ArrowRight, 
  RotateCw, 
  PieChart, 
  FileText, 
  Users, 
  Briefcase, 
  Tag, 
  Wallet, 
  Settings, 
  Lock, 
  LogOut,
  Plus,
  ShieldCheck,
  ChevronDown
} from "lucide-react";

export function HeaderControlMenu() {
  const { user, logout } = useSession();
  const { favoriteIds } = useFavorites();

  const [showAppPopup, setShowAppPopup] = useState(false);
  const [showSavedPopup, setShowSavedPopup] = useState(false);
  const [showNotiPopup, setShowNotiPopup] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const appRef = useRef<HTMLDivElement>(null);
  const savedRef = useRef<HTMLDivElement>(null);
  const notiRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (appRef.current && !appRef.current.contains(event.target as Node)) {
        setShowAppPopup(false);
      }
      if (savedRef.current && !savedRef.current.contains(event.target as Node)) {
        setShowSavedPopup(false);
      }
      if (notiRef.current && !notiRef.current.contains(event.target as Node)) {
        setShowNotiPopup(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Display user information (fallback to mock 'Nam Vũ' if logged out or default)
  const displayName = user?.name || "Nam Vũ";
  const avatarChar = displayName.charAt(0).toUpperCase() || "V";

  return (
    <div className="re__control-menu flex items-center space-x-2 sm:space-x-3 text-sm">
      {/* 1. Tải ứng dụng (App Info & Popup) */}
      <div className="app-info relative" ref={appRef}>
        <div className="app-label flex items-center">
          <button
            onClick={() => setShowAppPopup(!showAppPopup)}
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:text-[#E03C31] hover:border-red-200 hover:bg-red-50/30 transition-all cursor-pointer"
            title="Tải ứng dụng Batdongsan"
          >
            <Smartphone className="w-3.5 h-3.5 text-gray-500" />
            <span>Tải ứng dụng</span>
          </button>

          <button
            onClick={() => setShowAppPopup(!showAppPopup)}
            className="sm:hidden p-2 rounded-lg text-gray-600 hover:text-[#E03C31] hover:bg-gray-100 transition-colors"
            title="Tải ứng dụng"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* App Popup */}
        {showAppPopup && (
          <div className="app-popup absolute right-0 sm:right-auto sm:left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="app-content space-y-4">
              <div className="app-header flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="app-title font-bold text-gray-900 text-sm">Tải ứng dụng Batdongsan</span>
                <button
                  onClick={() => setShowAppPopup(false)}
                  className="app-close text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="app-qr flex flex-col items-center justify-center p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <img
                  src="https://staticfile.batdongsan.com.vn/images/app/header_qr_code.svg"
                  className="qr-code w-32 h-32 object-contain"
                  alt="QR Code"
                />
                <span className="text-[11px] text-gray-500 mt-2 font-medium">Quét mã để tải ứng dụng iOS & Android</span>
              </div>

              <div className="app-img flex items-center justify-center space-x-2 pt-1">
                <a
                  href="https://batdongsan.onelink.me/8kLq/header_qr_code"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-90 transition-opacity"
                >
                  <img
                    src="https://staticfile.batdongsan.com.vn/images/app/app-store.png"
                    className="h-8 object-contain"
                    alt="App Store"
                  />
                </a>
                <a
                  href="https://batdongsan.onelink.me/8kLq/header_qr_code"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-90 transition-opacity"
                >
                  <img
                    src="https://staticfile.batdongsan.com.vn/images/app/g-play.png"
                    className="h-8 object-contain"
                    alt="Google Play"
                  />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Tin đăng đã lưu (#notiSave) */}
      <div className="re__login-group relative" ref={savedRef}>
        <div className="re__notification" id="notiSave">
          <div className="re__all-btn">
            <button
              onClick={() => setShowSavedPopup(!showSavedPopup)}
              className="relative p-2 rounded-lg text-gray-600 hover:text-[#E03C31] hover:bg-red-50/50 transition-colors"
              title="Danh sách tin đã lưu"
            >
              <Heart className="w-4 h-4" />
              {favoriteIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#E03C31] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {favoriteIds.length}
                </span>
              )}
            </button>
          </div>

          {showSavedPopup && (
            <div className="re__marked-products-popup absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="re__header p-4 border-b border-gray-100 flex items-center justify-between">
                <span className="font-bold text-gray-900 text-sm">Tin đăng đã lưu</span>
                <span className="text-xs text-gray-500 font-semibold">{favoriteIds.length} tin</span>
              </div>

              <div className="re__content p-6">
                {favoriteIds.length === 0 ? (
                  <div className="text-center py-6 space-y-3">
                    <img
                      src="https://staticfile.batdongsan.com.vn/images/empty-state.svg"
                      alt="Chưa có tin lưu"
                      className="w-24 h-24 mx-auto opacity-75"
                    />
                    <p className="text-xs text-gray-500">Bấm nút trái tim trên tin đăng để lưu lại xem sau</p>
                  </div>
                ) : (
                  <div className="space-y-3 text-xs">
                    <p className="text-gray-600 font-medium">Bạn có {favoriteIds.length} bất động sản đã lưu trong danh sách.</p>
                  </div>
                )}
              </div>

              <div className="re__footer bg-gray-50 p-3 border-t border-gray-100 text-center">
                <Link
                  href="/tai-khoan/yeu-thich"
                  onClick={() => setShowSavedPopup(false)}
                  className="re__marked-products-view-more inline-flex items-center space-x-1.5 text-xs font-bold text-[#E03C31] hover:underline"
                >
                  <span>Xem tất cả tin đã lưu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Chuông thông báo (bds-notification) */}
      <div className="notification relative" ref={notiRef}>
        <button
          onClick={() => setShowNotiPopup(!showNotiPopup)}
          className="relative p-2 rounded-lg text-gray-600 hover:text-[#E03C31] hover:bg-gray-100 transition-colors"
          title="Thông báo"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#E03C31] rounded-full"></span>
        </button>

        {showNotiPopup && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <span className="font-bold text-gray-900 text-sm">Thông báo hệ thống</span>
              <span className="text-[11px] text-[#E03C31] font-semibold cursor-pointer hover:underline">Đã đọc tất cả</span>
            </div>
            <div className="divide-y divide-gray-100 text-xs">
              <div className="p-3.5 hover:bg-gray-50 transition-colors space-y-1">
                <p className="font-bold text-gray-900">Chứng nhận Sổ đỏ đã phê duyệt</p>
                <p className="text-gray-500 leading-relaxed text-[11px]">Tin đăng căn hộ của bạn đã được cấp huy hiệu Sổ đỏ thành công.</p>
                <span className="text-[10px] text-gray-400">10 phút trước</span>
              </div>
              <div className="p-3.5 hover:bg-gray-50 transition-colors space-y-1">
                <p className="font-bold text-gray-900">Yêu cầu liên hệ mới</p>
                <p className="text-gray-500 leading-relaxed text-[11px]">Khách hàng Hoàng Minh vừa để lại số điện thoại hẹn xem nhà.</p>
                <span className="text-[10px] text-gray-400">1 giờ trước</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Hồ sơ người dùng & Dropdown đầy đủ (#divUserStt) */}
      <div id="divUserStt" className="relative" ref={userRef}>
        <div className="login-group">
          <div className="box-info">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center space-x-2 py-1 px-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="re__avatar--lg w-8 h-8 rounded-full bg-gradient-to-tr from-[#E03C31] to-red-400 text-white flex items-center justify-center font-bold text-xs shadow-xs border border-white">
                <span className="re__avatar-text">{avatarChar}</span>
              </div>
              <div className="user-name hidden md:flex items-center space-x-1">
                <span className="font-semibold text-gray-800 text-xs max-w-[90px] truncate">{displayName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </div>
            </button>
          </div>

          {/* Full Batdongsan Dropdown Navigation Menu */}
          {showUserDropdown && (
            <div className="re__dropdown-art absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              {/* VIP Listing Voucher Banner */}
              <div className="re__listing-vip-banner-menu-user-info p-3 bg-gradient-to-r from-red-500 to-amber-500 text-white flex items-center justify-between relative overflow-hidden">
                <div className="z-10">
                  <p className="text-xs font-bold uppercase tracking-wider">Gói Voucher Tin VIP</p>
                  <p className="text-[11px] text-red-100">Tiết kiệm đến 40% phí đăng tin</p>
                </div>
                <Link
                  href="/goi-dich-vu"
                  onClick={() => setShowUserDropdown(false)}
                  className="z-10 px-2.5 py-1 bg-white text-red-600 rounded-lg text-[10px] font-extrabold shadow-xs hover:bg-red-50 transition-colors"
                >
                  Nhận ngay
                </Link>
              </div>

              {/* User Header Info */}
              <div className="p-4 border-b border-gray-100">
                <Link
                  href="/tai-khoan"
                  onClick={() => setShowUserDropdown(false)}
                  className="flex items-center space-x-2.5 group"
                >
                  <div className="w-9 h-9 rounded-full bg-[#E03C31] text-white flex items-center justify-center font-bold text-sm">
                    {avatarChar}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-bold text-gray-900 text-sm group-hover:text-[#E03C31] truncate transition-colors">
                      {displayName}
                    </p>
                    <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-600 font-semibold">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{user?.role === "ADMIN" ? "Quản trị viên" : "Môi giới xác thực"}</span>
                    </span>
                  </div>
                </Link>
              </div>

              {/* Menu List */}
              <ul className="py-2 text-xs text-gray-700 divide-y divide-gray-100 font-medium">
                {/* Switch to seller / post */}
                <li className="py-1">
                  <Link
                    href="/dang-tin"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 text-gray-800 hover:text-[#E03C31] transition-colors"
                  >
                    <RotateCw className="w-4 h-4 text-gray-400" />
                    <span>Chuyển sang đăng tin</span>
                  </Link>
                </li>

                {/* Dashboard & Management */}
                <li className="py-1">
                  {user?.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setShowUserDropdown(false)}
                      className="flex items-center space-x-3 px-4 py-2 hover:bg-red-50 text-red-600 font-bold transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#E03C31]" />
                      <span>Admin Portal Quản Trị</span>
                    </Link>
                  )}
                  <Link
                    href="/tai-khoan"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 hover:text-[#E03C31] transition-colors"
                  >
                    <PieChart className="w-4 h-4 text-gray-400" />
                    <span>Tổng quan tài khoản</span>
                  </Link>
                  <Link
                    href="/tai-khoan/tin-dang"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 hover:text-[#E03C31] transition-colors"
                  >
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span>Quản lý tin đăng</span>
                  </Link>
                  <Link
                    href="/admin/leads"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 hover:text-[#E03C31] transition-colors"
                  >
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>Quản lý khách hàng (Leads)</span>
                  </Link>
                  <Link
                    href="/moi-gioi"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 hover:text-[#E03C31] transition-colors"
                  >
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span>Môi giới chuyên nghiệp</span>
                  </Link>
                </li>

                {/* Membership & Topup */}
                <li className="py-1">
                  <Link
                    href="/goi-dich-vu"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 hover:text-[#E03C31] transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>Gói hội viên Pro</span>
                    </div>
                    <span className="text-[10px] font-bold bg-red-100 text-[#E03C31] px-1.5 py-0.5 rounded">
                      -39%
                    </span>
                  </Link>
                  <Link
                    href="/goi-dich-vu"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 hover:text-[#E03C31] transition-colors"
                  >
                    <Wallet className="w-4 h-4 text-gray-400" />
                    <span>Nạp tiền tài khoản</span>
                  </Link>
                </li>

                {/* Account Settings */}
                <li className="py-1">
                  <Link
                    href="/tai-khoan"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 hover:text-[#E03C31] transition-colors"
                  >
                    <Settings className="w-4 h-4 text-gray-400" />
                    <span>Cài đặt tài khoản</span>
                  </Link>
                  <Link
                    href="/tai-khoan"
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 hover:text-[#E03C31] transition-colors"
                  >
                    <Lock className="w-4 h-4 text-gray-400" />
                    <span>Đổi mật khẩu</span>
                  </Link>
                </li>

                {/* Logout */}
                <li className="py-1">
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      logout();
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-red-50 text-red-600 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Đăng xuất</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 5. Nút Đăng Tin (#Header_UserControl_divPostProduct) */}
      <div id="Header_UserControl_divPostProduct">
        <Link
          href="/dang-tin"
          id="linkPostProduct"
          className="re__btn re__btn-se-border--sm re__login inline-flex items-center space-x-1.5 bg-[#E03C31] hover:bg-[#B8281F] text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Đăng tin</span>
        </Link>
      </div>
    </div>
  );
}

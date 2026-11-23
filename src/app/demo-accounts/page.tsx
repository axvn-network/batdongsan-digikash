"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, UserCheck, Key, ExternalLink, Smartphone, Globe, Copy, Check } from "lucide-react";

export default function DemoAccountsPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const accounts = [
    {
      role: "SUPER_ADMIN",
      title: "Tổng Quản Trị Hệ Thống",
      email: "superadmin@example.com",
      pass: "user123",
      desc: "Toàn quyền quản trị: Phân quyền vai trò (RBAC), xem audit log, cấu hình hệ thống.",
      badge: "bg-red-600 text-white",
      loginUrl: "/dang-nhap",
      dashUrl: "/admin",
    },
    {
      role: "ADMIN",
      title: "Quản Trị Viên Vận Hành",
      email: "admin@example.com",
      pass: "admin123",
      desc: "Quản lý bất động sản, người dùng, giao dịch nạp/rút tiền, thống kê doanh thu.",
      badge: "bg-blue-600 text-white",
      loginUrl: "/dang-nhap",
      dashUrl: "/admin",
    },
    {
      role: "MODERATOR",
      title: "Kiểm Duyệt Viên Tin Đăng",
      email: "moderator@example.com",
      pass: "user123",
      desc: "Chuyên trách duyệt tin đăng mới, kiểm tra vi phạm, xác thực hồ sơ môi giới.",
      badge: "bg-amber-600 text-white",
      loginUrl: "/dang-nhap",
      dashUrl: "/admin/duyet-tin",
    },
    {
      role: "VERIFIED_AGENT",
      title: "Môi Giới Đã Xác Thực (VIP)",
      email: "agent.verified@example.com",
      pass: "user123",
      desc: "Huy hiệu môi giới uy tín, quyền đăng tin VIP, quản lý khách hàng tiềm năng (Leads).",
      badge: "bg-emerald-600 text-white",
      loginUrl: "/dang-nhap",
      dashUrl: "/tai-khoan",
    },
    {
      role: "AGENT",
      title: "Môi Giới Tự Do",
      email: "agent@example.com",
      pass: "user123",
      desc: "Đăng tin bất động sản, gửi yêu cầu xác thực chứng chỉ hành nghề môi giới.",
      badge: "bg-cyan-600 text-white",
      loginUrl: "/dang-nhap",
      dashUrl: "/tai-khoan",
    },
    {
      role: "USER",
      title: "Khách Hàng / Cá Nhân",
      email: "user@example.com",
      pass: "user123",
      desc: "Tìm kiếm nhà đất, lưu tin yêu thích, gửi tin nhắn và liên hệ xem nhà.",
      badge: "bg-slate-600 text-white",
      loginUrl: "/dang-nhap",
      dashUrl: "/tai-khoan",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8F9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-[#E03C31] text-xs font-semibold tracking-wide">
            <ShieldCheck className="w-4 h-4" /> BÀN GIAO HỆ THỐNG DIGIKASH VIETNAM
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Tài Khoản Thử Nghiệm & Cổng Truy Cập
          </h1>
          <p className="max-w-2xl mx-auto text-base text-slate-600">
            Cơ sở dữ liệu đang kết nối trực tiếp với <b>Neon PostgreSQL Serverless</b>. Chọn vai trò bên dưới để kiểm tra toàn bộ các tính năng tương ứng.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://github.com/axvn-network/batdongsan-digikash"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">GitHub Repository</h2>
                <p className="text-xs text-slate-500">Mã nguồn & CI/CD Workflows</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>

          <a
            href="https://github.com/axvn-network/batdongsan-digikash/actions/runs/45086597729"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Tải Android APK</h2>
                <p className="text-xs text-slate-500">Bản build Release (3.78 MB)</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>

          <a
            href="https://github.com/axvn-network/batdongsan-digikash/actions/runs/45087096985"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Tải iOS IPA</h2>
                <p className="text-xs text-slate-500">Cài OTA qua InstallOnAir</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* Account Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accounts.map((acc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${acc.badge}`}>
                    {acc.role}
                  </span>
                  <Link
                    href={acc.dashUrl}
                    className="text-xs font-medium text-[#E03C31] hover:underline flex items-center gap-1"
                  >
                    Vào trang {acc.role.includes("ADMIN") || acc.role === "MODERATOR" ? "Quản trị" : "Cá nhân"} →
                  </Link>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">{acc.title}</h2>
                  <p className="text-sm text-slate-500 mt-1">{acc.desc}</p>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 space-y-2 border border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Email:</span>
                    <div className="flex items-center gap-2 font-mono font-medium text-slate-800">
                      <span>{acc.email}</span>
                      <button
                        onClick={() => copyToClipboard(acc.email, `email-${idx}`)}
                        className="text-slate-400 hover:text-slate-700"
                        title="Sao chép email"
                      >
                        {copiedKey === `email-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Mật khẩu:</span>
                    <div className="flex items-center gap-2 font-mono font-medium text-slate-800">
                      <span>{acc.pass}</span>
                      <button
                        onClick={() => copyToClipboard(acc.pass, `pass-${idx}`)}
                        className="text-slate-400 hover:text-slate-700"
                        title="Sao chép mật khẩu"
                      >
                        {copiedKey === `pass-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center gap-3">
                <Link
                  href={`/dang-nhap?email=${encodeURIComponent(acc.email)}`}
                  className="flex-1 text-center py-2 px-4 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                >
                  Đăng nhập với vai trò này
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200/60 text-xs text-amber-800 space-y-2">
          <p className="font-semibold text-amber-900">
            ℹ️ Lưu ý quan trọng khi kiểm thử:
          </p>
          <ul className="list-disc list-inside space-y-1 opacity-90">
            <li>Hệ thống áp dụng <b>RBAC Server-side</b> nghiêm ngặt: Khi đăng nhập bằng tài khoản `USER`, truy cập `/admin` sẽ tự động bị chặn và chuyển hướng.</li>
            <li>Mọi thao tác thay đổi trạng thái bất động sản, duyệt tin, phân quyền đều tự động ghi lại trong <b>Audit Log</b> (`/admin/audit-log`).</li>
            <li>Để cài đặt file IPA trên iPhone từ xa: Vào liên kết tải iOS IPA bên trên, lấy file `.ipa` và tải lên <b>installonair.com</b> để quét mã QR cài đặt trực tiếp không cần máy tính.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

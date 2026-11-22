"use client";

import React, { useState } from "react";
import { SystemSettings } from "@/lib/repositories/settings.repo";
import { Settings, Globe, Mail, CreditCard, ShieldAlert, AlertTriangle, Save, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface SettingsAdminClientProps {
  initialSettings: SystemSettings;
}

export function SettingsAdminClient({ initialSettings }: SettingsAdminClientProps) {
  const router = useRouter();
  const [settings, setSettings] = useState<SystemSettings>(initialSettings);
  const [activeTab, setActiveTab] = useState<"general" | "seo" | "email" | "payment" | "moderation" | "maintenance">("general");
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Save Button Header */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#E03C31] hover:bg-[#B8281F] rounded-lg shadow-sm transition-all disabled:opacity-50"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : savedSuccess ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {savedSuccess ? "Đã lưu cài đặt!" : "Lưu tất cả thay đổi"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl px-4 overflow-x-auto">
        {[
          { id: "general", label: "Thông tin sàn", icon: Globe },
          { id: "seo", label: "SEO & Analytics", icon: Settings },
          { id: "email", label: "Email SMTP", icon: Mail },
          { id: "payment", label: "Cổng thanh toán", icon: CreditCard },
          { id: "moderation", label: "Kiểm duyệt tự động", icon: ShieldAlert },
          { id: "maintenance", label: "Chế độ bảo trì", icon: AlertTriangle },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-3.5 px-4 font-bold text-xs border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-[#E03C31] text-[#E03C31]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Form Containers */}
      <form onSubmit={handleSubmit} className="bg-white rounded-b-2xl border border-gray-200 border-t-0 p-6 shadow-sm space-y-6">
        {activeTab === "general" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Tên sàn giao dịch:</label>
              <input
                type="text"
                value={settings.general.siteName}
                onChange={(e) => setSettings({ ...settings, general: { ...settings.general, siteName: e.target.value } })}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Địa chỉ trang chủ (URL):</label>
              <input
                type="text"
                value={settings.general.siteUrl}
                onChange={(e) => setSettings({ ...settings, general: { ...settings.general, siteUrl: e.target.value } })}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Hotline CSKH:</label>
              <input
                type="text"
                value={settings.general.hotline}
                onChange={(e) => setSettings({ ...settings, general: { ...settings.general, hotline: e.target.value } })}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Email hỗ trợ:</label>
              <input
                type="email"
                value={settings.general.supportEmail}
                onChange={(e) => setSettings({ ...settings, general: { ...settings.general, supportEmail: e.target.value } })}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold text-gray-700 uppercase mb-1">Tên pháp nhân công ty:</label>
              <input
                type="text"
                value={settings.general.companyName}
                onChange={(e) => setSettings({ ...settings, general: { ...settings.general, companyName: e.target.value } })}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold text-gray-700 uppercase mb-1">Địa chỉ trụ sở:</label>
              <input
                type="text"
                value={settings.general.address}
                onChange={(e) => setSettings({ ...settings, general: { ...settings.general, address: e.target.value } })}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
              />
            </div>
          </div>
        )}

        {activeTab === "seo" && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Tiêu đề SEO mặc định (Title):</label>
              <input
                type="text"
                value={settings.seo.defaultTitle}
                onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, defaultTitle: e.target.value } })}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Mô tả SEO mặc định (Description):</label>
              <textarea
                rows={3}
                value={settings.seo.defaultDescription}
                onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, defaultDescription: e.target.value } })}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5 resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Google Analytics ID:</label>
                <input
                  type="text"
                  value={settings.seo.googleAnalyticsId}
                  onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, googleAnalyticsId: e.target.value } })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5 font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Google Search Console Verification:</label>
                <input
                  type="text"
                  value={settings.seo.searchConsoleCode}
                  onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, searchConsoleCode: e.target.value } })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "email" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">SMTP Host:</label>
              <input
                type="text"
                value={settings.email.smtpHost}
                onChange={(e) => setSettings({ ...settings, email: { ...settings.email, smtpHost: e.target.value } })}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">SMTP Port:</label>
              <input
                type="number"
                value={settings.email.smtpPort}
                onChange={(e) => setSettings({ ...settings, email: { ...settings.email, smtpPort: Number(e.target.value) } })}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Email người gửi (From):</label>
              <input
                type="email"
                value={settings.email.senderEmail}
                onChange={(e) => setSettings({ ...settings, email: { ...settings.email, senderEmail: e.target.value } })}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">Tên hiển thị người gửi:</label>
              <input
                type="text"
                value={settings.email.senderName}
                onChange={(e) => setSettings({ ...settings, email: { ...settings.email, senderName: e.target.value } })}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
              />
            </div>
          </div>
        )}

        {activeTab === "payment" && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-gray-50 rounded-xl space-y-3">
              <h4 className="font-bold text-gray-900 text-sm">Cổng thanh toán trực tuyến:</h4>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.payment.enableVnpay}
                    onChange={(e) => setSettings({ ...settings, payment: { ...settings.payment, enableVnpay: e.target.checked } })}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                  />
                  <span className="font-bold text-gray-800">Cổng VNPAY QR</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.payment.enableMomo}
                    onChange={(e) => setSettings({ ...settings, payment: { ...settings.payment, enableMomo: e.target.checked } })}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                  />
                  <span className="font-bold text-gray-800">Ví MoMo Business</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.payment.enableVietQR}
                    onChange={(e) => setSettings({ ...settings, payment: { ...settings.payment, enableVietQR: e.target.checked } })}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                  />
                  <span className="font-bold text-gray-800">Napas 247 VietQR</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Ngân hàng nhận tiền:</label>
                <input
                  type="text"
                  value={settings.payment.bankName}
                  onChange={(e) => setSettings({ ...settings, payment: { ...settings.payment, bankName: e.target.value } })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Số tài khoản ngân hàng:</label>
                <input
                  type="text"
                  value={settings.payment.bankAccountNumber}
                  onChange={(e) => setSettings({ ...settings, payment: { ...settings.payment, bankAccountNumber: e.target.value } })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5 font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Tên chủ tài khoản:</label>
                <input
                  type="text"
                  value={settings.payment.bankAccountName}
                  onChange={(e) => setSettings({ ...settings, payment: { ...settings.payment, bankAccountName: e.target.value } })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5 uppercase font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Chi nhánh ngân hàng:</label>
                <input
                  type="text"
                  value={settings.payment.bankBranch}
                  onChange={(e) => setSettings({ ...settings, payment: { ...settings.payment, bankBranch: e.target.value } })}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "moderation" && (
          <div className="space-y-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer p-4 bg-gray-50 rounded-xl">
              <input
                type="checkbox"
                checked={settings.moderation.enableAutoCheck}
                onChange={(e) => setSettings({ ...settings, moderation: { ...settings.moderation, enableAutoCheck: e.target.checked } })}
                className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
              />
              <div>
                <span className="font-bold text-gray-900 block">Kích hoạt AI kiểm duyệt tự động</span>
                <span className="text-gray-500 text-[11px]">Tự động gắn cờ tin đăng nghi vấn sai giá, từ khóa đen hoặc ảnh trùng lặp</span>
              </div>
            </label>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Ngưỡng cảnh báo lệch giá so với khu vực (%):
              </label>
              <input
                type="number"
                value={settings.moderation.priceDeviationThreshold}
                onChange={(e) => setSettings({ ...settings, moderation: { ...settings.moderation, priceDeviationThreshold: Number(e.target.value) } })}
                className="w-48 text-sm border border-gray-300 rounded-lg p-2.5"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase mb-1">
                Danh sách từ khóa cấm (phân tách bởi dấu phẩy):
              </label>
              <textarea
                rows={3}
                value={settings.moderation.blacklistedKeywords.join(", ")}
                onChange={(e) => setSettings({
                  ...settings,
                  moderation: {
                    ...settings.moderation,
                    blacklistedKeywords: e.target.value.split(",").map((k) => k.trim()).filter(Boolean),
                  },
                })}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
              />
            </div>
          </div>
        )}

        {activeTab === "maintenance" && (
          <div className="p-5 bg-rose-50 border border-rose-200 rounded-xl space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-rose-900 text-sm block">Bật chế độ bảo trì hệ thống</span>
                <span className="text-rose-700 text-xs">Khi bật, khách vãng lai và thành viên sẽ thấy trang thông báo bảo trì</span>
              </div>
              <input
                type="checkbox"
                checked={settings.maintenance.isMaintenanceMode}
                onChange={(e) => setSettings({
                  ...settings,
                  maintenance: { ...settings.maintenance, isMaintenanceMode: e.target.checked },
                })}
                className="w-5 h-5 rounded text-rose-600 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block font-bold text-rose-900 uppercase mb-1">Thông báo hiển thị cho người dùng:</label>
              <textarea
                rows={3}
                value={settings.maintenance.maintenanceNotice}
                onChange={(e) => setSettings({
                  ...settings,
                  maintenance: { ...settings.maintenance, maintenanceNotice: e.target.value },
                })}
                className="w-full text-sm border border-rose-300 rounded-lg p-2.5 bg-white resize-none"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

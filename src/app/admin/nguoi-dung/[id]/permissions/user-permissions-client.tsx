"use client";

import React, { useState } from "react";
import { User, PermissionKey, UserRole } from "@/types";
import { ALL_PERMISSIONS, DEFAULT_ROLE_PERMISSIONS, getUserEffectivePermissions } from "@/lib/auth/rbac";
import { StatusBadge } from "@/components/admin/status-badge";
import { Shield, KeyRound, Check, X, Undo2, Save, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserPermissionsClientProps {
  user: User;
}

export function UserPermissionsClient({ user }: UserPermissionsClientProps) {
  const router = useRouter();
  const [customOverrides, setCustomOverrides] = useState<Record<string, "INHERIT" | "GRANT" | "DENY">>(() => {
    const map: Record<string, "INHERIT" | "GRANT" | "DENY"> = {};
    if (user.customPermissions) {
      for (const cp of user.customPermissions) {
        map[cp.permission] = cp.granted ? "GRANT" : "DENY";
      }
    }
    return map;
  });

  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const roleDefaults = new Set<PermissionKey>(
    DEFAULT_ROLE_PERMISSIONS[user.role as UserRole] || []
  );

  const handleSetState = (permKey: string, state: "INHERIT" | "GRANT" | "DENY") => {
    setCustomOverrides((prev) => ({
      ...prev,
      [permKey]: state,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const overridesList: { permission: string; granted: boolean }[] = [];
      for (const [permKey, state] of Object.entries(customOverrides)) {
        if (state === "GRANT") {
          overridesList.push({ permission: permKey, granted: true });
        } else if (state === "DENY") {
          overridesList.push({ permission: permKey, granted: false });
        }
      }

      const res = await fetch(`/api/admin/users/${user.id}/permissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permissions: overridesList }),
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

  // Group permissions by resource
  const grouped = ALL_PERMISSIONS.reduce<Record<string, typeof ALL_PERMISSIONS>>((acc, curr) => {
    if (!acc[curr.resource]) acc[curr.resource] = [];
    acc[curr.resource].push(curr);
    return acc;
  }, {});

  const resourceLabels: Record<string, string> = {
    property: "Tin đăng bất động sản (Property)",
    user: "Thành viên & Tài khoản (User)",
    agent: "Hồ sơ môi giới (Agent)",
    category: "Danh mục & Dự án (Taxonomy)",
    lead: "Yêu cầu liên hệ & Khách hàng (Lead)",
    message: "Hội thoại & Tin nhắn (Message)",
    package: "Gói dịch vụ đăng tin (Package)",
    transaction: "Giao dịch thanh toán (Transaction)",
    wallet: "Ví & Số dư (Wallet)",
    post: "CMS Bài viết & Tin tức (CMS)",
    page: "Trang tĩnh & Điều khoản (Pages)",
    banner: "Quảng cáo & Banner (Banner)",
    seo: "Cấu hình SEO sàn (SEO)",
    report: "Báo cáo vi phạm (Report)",
    system: "Cấu hình hệ thống & Quản trị (System)",
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-gray-900">
              Phân quyền riêng cho tài khoản: {user.name}
            </h1>
            <StatusBadge status={user.role} />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Quy tắc: Quyền hiệu lực = Union(Role) + User_Granted - User_Denied. Sử dụng để cấp thêm hoặc giới hạn quyền cụ thể mà không cần đổi Role.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#E03C31] hover:bg-[#B8281F] rounded-lg shadow-sm transition-all disabled:opacity-50"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {savedSuccess ? "Đã lưu thành công!" : "Lưu thay đổi phân quyền"}
        </button>
      </div>

      {/* Permission Matrix */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([resource, perms]) => (
          <div key={resource} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-3.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wider">
                {resourceLabels[resource] || resource}
              </h3>
              <span className="text-[11px] text-gray-400 font-medium">
                {perms.length} quyền hạn
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {perms.map((p) => {
                const isRoleDefault = roleDefaults.has(p.key);
                const currentState = customOverrides[p.key] || "INHERIT";

                // Effective calculation
                let isEffective = isRoleDefault;
                if (currentState === "GRANT") isEffective = true;
                if (currentState === "DENY") isEffective = false;

                return (
                  <div
                    key={p.key}
                    className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900">{p.name}</span>
                        <code className="text-[10px] font-mono bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                          {p.key}
                        </code>
                      </div>
                      <p className="text-[11px] text-gray-500">{p.description}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* State selector */}
                      <div className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-gray-100 text-xs">
                        <button
                          type="button"
                          onClick={() => handleSetState(p.key, "INHERIT")}
                          className={`px-2.5 py-1 rounded font-medium transition-colors ${
                            currentState === "INHERIT"
                              ? "bg-white text-gray-900 shadow-xs font-bold"
                              : "text-gray-500 hover:text-gray-900"
                          }`}
                        >
                          Theo Role ({isRoleDefault ? "Có" : "Không"})
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSetState(p.key, "GRANT")}
                          className={`px-2.5 py-1 rounded font-medium transition-colors ${
                            currentState === "GRANT"
                              ? "bg-emerald-600 text-white shadow-xs font-bold"
                              : "text-emerald-700 hover:bg-emerald-100"
                          }`}
                        >
                          + Cấp thêm
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSetState(p.key, "DENY")}
                          className={`px-2.5 py-1 rounded font-medium transition-colors ${
                            currentState === "DENY"
                              ? "bg-rose-600 text-white shadow-xs font-bold"
                              : "text-rose-700 hover:bg-rose-100"
                          }`}
                        >
                          - Thu hồi
                        </button>
                      </div>

                      {/* Effective Badge */}
                      <div className="w-24 text-right">
                        {isEffective ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <Check className="w-3 h-3" /> Hiệu lực
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-200">
                            <X className="w-3 h-3" /> Vô hiệu
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

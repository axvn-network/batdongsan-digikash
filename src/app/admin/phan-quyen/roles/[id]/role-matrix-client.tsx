"use client";

import React, { useState } from "react";
import { RoleDefinition, PermissionKey } from "@/types";
import { ALL_PERMISSIONS } from "@/lib/auth/rbac";
import { StatusBadge } from "@/components/admin/status-badge";
import { ShieldAlert, Save, Check, CheckSquare, Square, AlertTriangle, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface RoleMatrixClientProps {
  role: RoleDefinition;
}

export function RoleMatrixClient({ role }: RoleMatrixClientProps) {
  const router = useRouter();
  const [selectedPerms, setSelectedPerms] = useState<Set<PermissionKey>>(
    new Set(role.permissions)
  );
  const [loading, setLoading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const isSuperAdmin = role.name === "SUPER_ADMIN";

  const handleToggle = (key: PermissionKey) => {
    if (isSuperAdmin) return;
    const next = new Set(selectedPerms);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    setSelectedPerms(next);
  };

  const handleSelectAllResource = (resourceKeys: PermissionKey[]) => {
    if (isSuperAdmin) return;
    const next = new Set(selectedPerms);
    for (const k of resourceKeys) {
      next.add(k);
    }
    setSelectedPerms(next);
  };

  const handleDeselectAllResource = (resourceKeys: PermissionKey[]) => {
    if (isSuperAdmin) return;
    const next = new Set(selectedPerms);
    for (const k of resourceKeys) {
      next.delete(k);
    }
    setSelectedPerms(next);
  };

  const handleSave = async () => {
    if (isSuperAdmin) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/roles/${role.id}/permissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permissions: Array.from(selectedPerms) }),
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

  // Group permissions
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
              Ma trận phân quyền: {role.label} ({role.name})
            </h1>
            <StatusBadge status={role.name} />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Đang được áp dụng cho <span className="font-bold text-gray-800">{role.userCount || 0} thành viên</span> trên sàn
          </p>
        </div>

        {!isSuperAdmin && (
          <button
            onClick={handleSave}
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
            {savedSuccess ? "Đã lưu ma trận!" : "Lưu thay đổi ma trận quyền"}
          </button>
        )}
      </div>

      {/* Warning if many users */}
      {(role.userCount || 0) > 10 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-800">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Cảnh báo tác động diện rộng:</span>
            Vai trò này đang được gán cho {role.userCount} tài khoản. Mọi thay đổi quyền hạn sẽ có hiệu lực ngay lập tức với toàn bộ các tài khoản này trên toàn hệ thống.
          </div>
        </div>
      )}

      {/* Matrix Groups */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([resource, perms]) => {
          const resourceKeys = perms.map((p) => p.key);
          const allSelected = resourceKeys.every((k) => selectedPerms.has(k));
          const someSelected = resourceKeys.some((k) => selectedPerms.has(k));

          return (
            <div key={resource} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-6 py-3.5 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wider">
                    {resourceLabels[resource] || resource}
                  </h3>
                  <span className="text-[11px] text-gray-400 font-mono">
                    ({perms.filter((p) => selectedPerms.has(p.key)).length}/{perms.length})
                  </span>
                </div>

                {!isSuperAdmin && (
                  <div className="flex items-center space-x-2 text-xs">
                    <button
                      type="button"
                      onClick={() => handleSelectAllResource(resourceKeys)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-gray-700 bg-white hover:bg-gray-100 rounded border border-gray-200 transition-colors"
                    >
                      Chọn tất cả
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeselectAllResource(resourceKeys)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-gray-500 bg-white hover:bg-gray-100 rounded border border-gray-200 transition-colors"
                    >
                      Bỏ chọn
                    </button>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {perms.map((p) => {
                  const checked = selectedPerms.has(p.key);
                  return (
                    <label
                      key={p.key}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-colors cursor-pointer ${
                        checked
                          ? "bg-red-50/40 border-red-200 text-gray-900"
                          : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      } ${isSuperAdmin ? "cursor-not-allowed opacity-90" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={isSuperAdmin}
                        onChange={() => handleToggle(p.key)}
                        className="mt-0.5 w-4 h-4 rounded text-red-600 focus:ring-red-500 border-gray-300"
                      />
                      <div className="space-y-0.5 min-w-0">
                        <span className="font-bold text-xs block truncate">{p.name}</span>
                        <code className="text-[10px] font-mono text-gray-400 block">{p.key}</code>
                        <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{p.description}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

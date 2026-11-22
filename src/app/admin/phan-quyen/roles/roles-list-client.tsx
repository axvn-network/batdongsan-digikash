"use client";

import React, { useState } from "react";
import { RoleDefinition } from "@/types";
import { StatusBadge } from "@/components/admin/status-badge";
import { KeyRound, PlusCircle, ShieldCheck, ArrowRight, Lock, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RolesListClientProps {
  initialRoles: RoleDefinition[];
}

export function RolesListClient({ initialRoles }: RolesListClientProps) {
  const router = useRouter();
  const [roles, setRoles] = useState<RoleDefinition[]>(initialRoles);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [roleLabel, setRoleLabel] = useState("");
  const [roleDesc, setRoleDesc] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName.trim() || !roleLabel.trim()) return;

    const newRole: RoleDefinition = {
      id: `role-${Date.now()}`,
      name: roleName.toUpperCase().replace(/\s+/g, "_"),
      label: roleLabel,
      description: roleDesc,
      isSystem: false,
      permissions: [],
      userCount: 0,
    };

    setRoles([...roles, newRole]);
    setCreateModalOpen(false);
    setRoleName("");
    setRoleLabel("");
    setRoleDesc("");
  };

  return (
    <div className="space-y-6">
      {/* Top action */}
      <div className="flex justify-end">
        <button
          onClick={() => setCreateModalOpen(true)}
          className="flex items-center space-x-1.5 py-2 px-4 bg-[#E03C31] text-white rounded-lg text-xs font-bold hover:bg-[#B8281F] shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Thêm vai trò mới</span>
        </button>
      </div>

      {/* Role cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4 flex flex-col justify-between hover:border-gray-300 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <StatusBadge status={role.name} size="sm" />
                {role.isSystem ? (
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1">
                    <Lock className="w-3 h-3" /> System Role
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    Tùy biến
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-base">{role.label}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{role.description}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-gray-100">
                <span className="flex items-center gap-1 text-gray-500">
                  <Users className="w-3.5 h-3.5" />
                  {role.userCount || 0} thành viên
                </span>
                <span className="font-mono font-bold text-[#E03C31]">
                  {role.permissions.length} quyền hạn
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <Link
                href={`/admin/phan-quyen/roles/${role.id}`}
                className="w-full py-2 px-3 text-xs font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-gray-200"
              >
                <span>Xem ma trận quyền</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Create Role Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900 text-lg">Tạo vai trò tùy biến mới</h3>
            <p className="text-xs text-gray-500">
              Định nghĩa tên vai trò và gán quyền hạn hạt mịn sau khi khởi tạo.
            </p>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Mã Role (Code):</label>
                <input
                  type="text"
                  required
                  placeholder="VD: SALE_MANAGER"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5 font-mono uppercase"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Tên hiển thị (Label):</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Trưởng phòng Kinh doanh"
                  value={roleLabel}
                  onChange={(e) => setRoleLabel(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Mô tả vai trò:</label>
                <textarea
                  rows={3}
                  value={roleDesc}
                  onChange={(e) => setRoleDesc(e.target.value)}
                  placeholder="Mô tả phạm vi trách nhiệm của vai trò..."
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5 resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-medium text-white bg-[#E03C31] hover:bg-[#B8281F] rounded-lg shadow-sm"
                >
                  Tạo vai trò
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

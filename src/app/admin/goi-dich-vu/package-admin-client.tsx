"use client";

import React, { useState } from "react";
import { ServicePackageItem } from "@/lib/repositories/package.repo";
import { formatCurrencyVND } from "@/lib/utils";
import { StatusBadge } from "@/components/admin/status-badge";
import { PlusCircle, Edit, Check, X, Star, Package, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface PackageAdminClientProps {
  initialPackages: ServicePackageItem[];
}

export function PackageAdminClient({ initialPackages }: PackageAdminClientProps) {
  const router = useRouter();
  const [packages, setPackages] = useState<ServicePackageItem[]>(initialPackages);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<ServicePackageItem | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [type, setType] = useState<"LISTING" | "MEMBERSHIP" | "ADS">("LISTING");
  const [price, setPrice] = useState("350000");
  const [durationDays, setDurationDays] = useState("30");
  const [listingLimit, setListingLimit] = useState("5");
  const [features, setFeatures] = useState("Ưu tiên hiển thị\nHuy hiệu VIP nổi bật\nĐẩy top định kỳ");
  const [loading, setLoading] = useState(false);

  const handleToggle = (id: string) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const featArray = features.split("\n").map((f) => f.trim()).filter(Boolean);
    if (editingPkg) {
      setPackages((prev) =>
        prev.map((p) =>
          p.id === editingPkg.id
            ? {
                ...p,
                name,
                type,
                price: Number(price),
                durationDays: Number(durationDays),
                listingLimit: Number(listingLimit),
                features: featArray,
              }
            : p
        )
      );
      setEditingPkg(null);
    } else {
      const newPkg: ServicePackageItem = {
        id: `pkg-${Date.now()}`,
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        type,
        price: Number(price),
        durationDays: Number(durationDays),
        listingLimit: Number(listingLimit),
        features: featArray,
        isPopular: false,
        isActive: true,
        order: packages.length + 1,
      };
      setPackages((prev) => [...prev, newPkg]);
      setCreateModalOpen(false);
    }
    setName("");
  };

  const openEdit = (pkg: ServicePackageItem) => {
    setEditingPkg(pkg);
    setName(pkg.name);
    setType(pkg.type);
    setPrice(String(pkg.price));
    setDurationDays(String(pkg.durationDays));
    setListingLimit(String(pkg.listingLimit));
    setFeatures(pkg.features.join("\n"));
  };

  return (
    <div className="space-y-6">
      {/* Top action */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            setEditingPkg(null);
            setName("");
            setPrice("500000");
            setDurationDays("30");
            setListingLimit("10");
            setFeatures("Ưu tiên trên trang chủ\nHuy hiệu xác thực");
            setCreateModalOpen(true);
          }}
          className="flex items-center space-x-1.5 py-2 px-4 bg-[#E03C31] text-white rounded-lg text-xs font-bold hover:bg-[#B8281F] shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tạo gói dịch vụ mới</span>
        </button>
      </div>

      {/* Package cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-2xl border p-5 shadow-sm space-y-4 flex flex-col justify-between transition-all ${
              pkg.isPopular ? "border-[#E03C31] ring-1 ring-red-200" : "border-gray-200"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {pkg.type}
                </span>
                <button
                  onClick={() => handleToggle(pkg.id)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    pkg.isActive
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {pkg.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  {pkg.isActive ? "Đang bật" : "Tạm tắt"}
                </button>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 text-base">{pkg.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-[#E03C31]">
                    {pkg.price === 0 ? "Miễn phí" : formatCurrencyVND(pkg.price)}
                  </span>
                  {pkg.price > 0 && <span className="text-xs text-gray-400 font-medium">/ {pkg.durationDays} ngày</span>}
                </div>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  Hạn mức: <span className="font-bold text-gray-800">{pkg.listingLimit} tin</span>
                </p>
              </div>

              {/* Feature list */}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <p className="text-[11px] font-semibold text-gray-400 uppercase">Quyền lợi đi kèm:</p>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Edit button */}
            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => openEdit(pkg)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200"
              >
                <Edit className="w-3.5 h-3.5" />
                Chỉnh sửa gói
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal create / edit */}
      {(createModalOpen || editingPkg) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-gray-100 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-lg">
                {editingPkg ? `Sửa gói: ${editingPkg.name}` : "Tạo gói dịch vụ mới"}
              </h3>
              <button
                onClick={() => {
                  setCreateModalOpen(false);
                  setEditingPkg(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Tên gói dịch vụ:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="VD: Gói VIP Kim Cương"
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Loại gói:</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-gray-50"
                  >
                    <option value="LISTING">LISTING (Gói đăng tin)</option>
                    <option value="MEMBERSHIP">MEMBERSHIP (Gói hội viên)</option>
                    <option value="ADS">ADS (Gói quảng cáo)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Giá bán (VND):</label>
                  <input
                    type="number"
                    step="50000"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Thời hạn (ngày):</label>
                  <input
                    type="number"
                    required
                    value={durationDays}
                    onChange={(e) => setDurationDays(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase mb-1">Hạn mức số tin:</label>
                  <input
                    type="number"
                    required
                    value={listingLimit}
                    onChange={(e) => setListingLimit(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase mb-1">Tính năng đi kèm (mỗi dòng 1 mục):</label>
                <textarea
                  rows={4}
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setCreateModalOpen(false);
                    setEditingPkg(null);
                  }}
                  className="px-4 py-2 font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-medium text-white bg-[#E03C31] hover:bg-[#B8281F] rounded-lg shadow-sm"
                >
                  Lưu cấu hình gói
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

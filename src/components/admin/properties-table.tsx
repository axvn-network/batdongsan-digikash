"use client";

import { useState } from "react";
import Link from "next/link";
import { Property, PropertyStatus } from "@/types";
import { formatPrice, formatDateVi } from "@/lib/utils";
import { Check, X, Eye, ExternalLink, ShieldCheck, Filter } from "lucide-react";

export function PropertiesTable({ initialProperties }: { initialProperties: Property[] }) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/properties/${id}/approve`, { method: "POST" });
      if (res.ok) {
        setProperties((curr) =>
          curr.map((p) => (p.id === id ? { ...p, status: "APPROVED" } : p))
        );
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handleReject = async (id: string) => {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/admin/properties/${id}/reject`, { method: "POST" });
      if (res.ok) {
        setProperties((curr) =>
          curr.map((p) => (p.id === id ? { ...p, status: "REJECTED" } : p))
        );
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handleToggleVerify = async (id: string, currentStatus?: boolean) => {
    setLoadingId(id);
    const targetStatus = !Boolean(currentStatus);
    try {
      const res = await fetch(`/api/admin/properties/${id}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVerified: targetStatus }),
      });
      if (res.ok) {
        setProperties((curr) =>
          curr.map((p) => (p.id === id ? { ...p, isVerified: targetStatus } : p))
        );
      }
    } finally {
      setLoadingId(null);
    }
  };

  const filtered = properties.filter((p) => {
    if (statusFilter === "ALL") return true;
    return p.status === statusFilter;
  });

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header & Filter tabs */}
      <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-gray-900 text-base">Danh sách tin đăng ({filtered.length})</h3>
          <p className="text-xs text-gray-500">Quản lý và kiểm duyệt tin đăng từ người dùng & môi giới</p>
        </div>

        <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold">
          {[
            { id: "ALL", label: "Tất cả" },
            { id: "PENDING", label: "Chờ duyệt" },
            { id: "APPROVED", label: "Đang hiển thị" },
            { id: "REJECTED", label: "Đã từ chối" },
            { id: "SOLD", label: "Đã bán/thuê" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === tab.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50/60 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Bất động sản</th>
              <th className="py-3.5 px-4">Loại hình</th>
              <th className="py-3.5 px-4">Mức giá</th>
              <th className="py-3.5 px-4">Người đăng</th>
              <th className="py-3.5 px-4">Trạng thái</th>
              <th className="py-3.5 px-4">Ngày đăng</th>
              <th className="py-3.5 px-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3.5 px-4 max-w-xs">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.images?.[0]?.url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=80"}
                      alt=""
                      className="w-12 h-10 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="truncate">
                      <div className="flex items-center space-x-1.5">
                        <Link
                          href={`/bat-dong-san/${item.slug}`}
                          className="font-bold text-gray-900 hover:text-[#E03C31] block truncate"
                        >
                          {item.title}
                        </Link>
                        {item.isVerified && (
                          <span className="flex-shrink-0 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                            ✓ Sổ đỏ
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400 truncate">{item.district}, {item.city}</p>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4 font-medium text-gray-600 whitespace-nowrap">
                  {item.propertyType?.name || (item.isForRent ? "Cho thuê" : "Mua bán")}
                </td>

                <td className="py-3.5 px-4 font-bold text-[#E03C31] whitespace-nowrap">
                  {formatPrice(item.price, item.isForRent)}
                </td>

                <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                  {item.user?.name || "Thành viên"}
                </td>

                <td className="py-3.5 px-4 whitespace-nowrap">
                  {item.status === "APPROVED" && (
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                      Đang hiển thị
                    </span>
                  )}
                  {item.status === "PENDING" && (
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600">
                      Chờ duyệt
                    </span>
                  )}
                  {item.status === "REJECTED" && (
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-50 text-red-600">
                      Từ chối
                    </span>
                  )}
                  {item.status === "SOLD" && (
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600">
                      Đã bán / Cho thuê
                    </span>
                  )}
                </td>

                <td className="py-3.5 px-4 text-gray-400 whitespace-nowrap">
                  {formatDateVi(item.createdAt)}
                </td>

                <td className="py-3.5 px-4 whitespace-nowrap text-center">
                  <div className="flex items-center justify-center space-x-1.5">
                    {item.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => handleApprove(item.id)}
                          disabled={loadingId === item.id}
                          title="Duyệt tin"
                          className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleReject(item.id)}
                          disabled={loadingId === item.id}
                          title="Từ chối"
                          className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handleToggleVerify(item.id, item.isVerified)}
                      disabled={loadingId === item.id}
                      title={item.isVerified ? "Hủy huy hiệu Sổ đỏ" : "Cấp huy hiệu Sổ đỏ"}
                      className={`p-1.5 rounded-lg transition-colors ${
                        item.isVerified
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-700"
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4" />
                    </button>

                    <Link
                      href={`/bat-dong-san/${item.slug}`}
                      target="_blank"
                      className="p-1.5 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Xem trang công khai"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

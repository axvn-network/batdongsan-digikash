"use client";

import { useState } from "react";
import Link from "next/link";
import { Property } from "@/types";
import { formatPrice } from "@/lib/utils";
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText, MapPin, Eye, ExternalLink } from "lucide-react";

export function AdminVerificationAudit({ initialProperties }: { initialProperties: Property[] }) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [filter, setFilter] = useState<"ALL" | "VERIFIED" | "UNVERIFIED">("ALL");
  const [loadingId, setLoadingId] = useState<string | null>(null);

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
        setProperties((prev) =>
          prev.map((p) =>
            p.id === id
              ? { ...p, isVerified: targetStatus, verifiedAt: targetStatus ? new Date().toISOString() : undefined }
              : p
          )
        );
      }
    } finally {
      setLoadingId(null);
    }
  };

  const filtered = properties.filter((p) => {
    if (filter === "VERIFIED") return p.isVerified;
    if (filter === "UNVERIFIED") return !p.isVerified;
    return true;
  });

  const verifiedCount = properties.filter((p) => p.isVerified).length;
  const unverifiedCount = properties.length - verifiedCount;

  return (
    <div className="space-y-6">
      {/* Metrics Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-semibold text-gray-500">Tổng tin đăng thẩm định</p>
          <p className="text-2xl font-black text-gray-900 mt-1">{properties.length}</p>
          <span className="text-[11px] text-gray-400">Trên toàn hệ thống</span>
        </div>
        <div className="bg-white border border-emerald-200 bg-emerald-50/20 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-emerald-800">Đã cấp Huy hiệu Sổ đỏ</p>
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700 mt-1">{verifiedCount}</p>
          <span className="text-[11px] text-emerald-600 font-medium">Bảo lãnh đền 10.000.000 ₫ nếu tin ảo</span>
        </div>
        <div className="bg-white border border-amber-200 bg-amber-50/20 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-amber-800">Chưa cấp xác thực</p>
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-700 mt-1">{unverifiedCount}</p>
          <span className="text-[11px] text-amber-600 font-medium">Cần bổ sung đối soát số tờ/thửa</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <h3 className="font-bold text-gray-900 text-sm">
            Danh sách hồ sơ pháp lý ({filtered.length})
          </h3>
          <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilter("ALL")}
              className={`px-3 py-1.5 rounded-lg ${filter === "ALL" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
            >
              Tất cả ({properties.length})
            </button>
            <button
              onClick={() => setFilter("VERIFIED")}
              className={`px-3 py-1.5 rounded-lg ${filter === "VERIFIED" ? "bg-white text-emerald-700 shadow-sm" : "text-gray-500"}`}
            >
              ✓ Đã xác thực ({verifiedCount})
            </button>
            <button
              onClick={() => setFilter("UNVERIFIED")}
              className={`px-3 py-1.5 rounded-lg ${filter === "UNVERIFIED" ? "bg-white text-amber-700 shadow-sm" : "text-gray-500"}`}
            >
              Chưa xác thực ({unverifiedCount})
            </button>
          </div>
        </div>

        {/* Audit List */}
        <div className="divide-y divide-gray-100">
          {filtered.map((item) => (
            <div key={item.id} className="p-5 hover:bg-gray-50/50 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start space-x-4 max-w-2xl">
                <img
                  src={item.images?.[0]?.url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80"}
                  alt=""
                  className="w-20 h-16 rounded-xl object-cover flex-shrink-0 border border-gray-200"
                />
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/bat-dong-san/${item.slug}`}
                      className="font-bold text-gray-900 hover:text-[#E03C31] text-sm line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    {item.isVerified && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        <span>✓ Sổ đỏ</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{item.address}</span>
                  </p>

                  <div className="flex items-center space-x-4 text-xs">
                    <span className="font-bold text-[#E03C31]">{formatPrice(item.price, item.isForRent)}</span>
                    <span className="text-gray-500">{item.area} m²</span>
                    <span className="text-gray-500 font-medium">Người đăng: <strong className="text-gray-700">{item.user?.name || "Môi giới"}</strong></span>
                  </div>

                  {/* 4 Checkpoint indicators */}
                  <div className="flex flex-wrap gap-2 pt-1 text-[10px]">
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200">
                      Số thửa: 104/TĐ-2023
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200">
                      Tọa độ: {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                    </span>
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                      Quy hoạch: Đất ở đô thị (ODT)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-3 self-end lg:self-center">
                <Link
                  href={`/bat-dong-san/${item.slug}`}
                  target="_blank"
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Xem tin</span>
                </Link>

                <button
                  onClick={() => handleToggleVerify(item.id, item.isVerified)}
                  disabled={loadingId === item.id}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    item.isVerified
                      ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                      : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {loadingId === item.id
                      ? "Đang xử lý..."
                      : item.isVerified
                      ? "Thu hồi xác thực"
                      : "Cấp Huy hiệu Sổ đỏ"}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

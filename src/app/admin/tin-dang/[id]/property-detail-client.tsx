"use client";

import React, { useState } from "react";
import { Property, AuditLogItem, PropertyStatus } from "@/types";
import { formatPrice, formatDateVi, formatCurrencyVND } from "@/lib/utils";
import { StatusBadge } from "@/components/admin/status-badge";
import { ActionButton } from "@/components/admin/action-button";
import { ReasonDialog } from "@/components/admin/reason-dialog";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { AuditTrail } from "@/components/admin/audit-trail";
import { 
  Building2, 
  MapPin, 
  Check, 
  X, 
  Eye, 
  ShieldCheck, 
  Star, 
  EyeOff, 
  ExternalLink,
  Clock,
  User,
  Phone,
  Compass,
  FileText,
  DollarSign,
  Maximize2,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ViolationReport {
  id: string;
  propertyId: string;
  reporterName: string;
  reporterPhone: string;
  reasonLabel: string;
  description: string;
  status: string;
  createdAt: string;
}

interface PropertyDetailClientProps {
  property: Property;
  auditLogs: AuditLogItem[];
  reports: ViolationReport[];
  similarProperties: Property[];
}

export function PropertyDetailClient({
  property: initialProp,
  auditLogs,
  reports,
  similarProperties,
}: PropertyDetailClientProps) {
  const router = useRouter();
  const [property, setProperty] = useState<Property>(initialProp);
  const [activeTab, setActiveTab] = useState<"info" | "history" | "reports" | "similar">("info");
  const [rejectOpen, setRejectOpen] = useState(false);
  const [hideConfirmOpen, setHideConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/properties/${property.id}/approve`, { method: "POST" });
      if (res.ok) {
        setProperty((prev) => ({ ...prev, status: "APPROVED" }));
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRejectConfirm = async (reason: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/properties/${property.id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      if (res.ok) {
        setProperty((prev) => ({ ...prev, status: "REJECTED" }));
        setRejectOpen(false);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVerify = async () => {
    setLoading(true);
    const targetStatus = !Boolean(property.isVerified || property.verification?.isVerified);
    try {
      const res = await fetch(`/api/admin/properties/${property.id}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVerified: targetStatus }),
      });
      if (res.ok) {
        setProperty((prev) => ({ ...prev, isVerified: targetStatus }));
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeature = async () => {
    setLoading(true);
    const targetStatus = !Boolean(property.isFeatured);
    try {
      const res = await fetch(`/api/admin/properties/${property.id}/feature`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: targetStatus }),
      });
      if (res.ok) {
        setProperty((prev) => ({ ...prev, isFeatured: targetStatus }));
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleHide = async () => {
    setLoading(true);
    const newStatus: PropertyStatus = property.status === "HIDDEN" ? "APPROVED" : "HIDDEN";
    try {
      const res = await fetch(`/api/admin/properties/${property.id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setProperty((prev) => ({ ...prev, status: newStatus }));
        setHideConfirmOpen(false);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded">
              ID: {property.id}
            </span>
            <StatusBadge status={property.status} />
            {property.isVerified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                ✓ Sổ đỏ đã duyệt
              </span>
            )}
            {property.isFeatured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                Nổi bật VIP
              </span>
            )}
          </div>
          <h1 className="text-xl font-black text-gray-900">{property.title}</h1>
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            {property.address}, {property.district}, {property.city}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {property.status === "PENDING" && (
            <>
              <ActionButton
                permission="property:approve"
                variant="success"
                icon={Check}
                loading={loading}
                onClick={handleApprove}
              >
                Duyệt tin
              </ActionButton>
              <ActionButton
                permission="property:reject"
                variant="danger"
                icon={X}
                loading={loading}
                onClick={() => setRejectOpen(true)}
              >
                Từ chối
              </ActionButton>
            </>
          )}

          <ActionButton
            permission="property:verify"
            variant={property.isVerified ? "outline" : "primary"}
            icon={ShieldCheck}
            loading={loading}
            onClick={handleToggleVerify}
          >
            {property.isVerified ? "Hủy Sổ đỏ" : "Cấp xác thực Sổ đỏ"}
          </ActionButton>

          <ActionButton
            permission="property:feature"
            variant="outline"
            icon={Star}
            loading={loading}
            onClick={handleToggleFeature}
          >
            {property.isFeatured ? "Hạ VIP" : "Đẩy VIP"}
          </ActionButton>

          <ActionButton
            permission="property:hide"
            variant="ghost"
            icon={property.status === "HIDDEN" ? Eye : EyeOff}
            loading={loading}
            onClick={() => setHideConfirmOpen(true)}
          >
            {property.status === "HIDDEN" ? "Bỏ ẩn" : "Ẩn tin"}
          </ActionButton>

          <Link
            href={`/bat-dong-san/${property.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Xem trang công khai
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl px-4">
        {[
          { id: "info", label: "Thông tin chi tiết", count: null },
          { id: "history", label: "Lịch sử thao tác (Audit)", count: auditLogs.length },
          { id: "reports", label: "Báo cáo vi phạm", count: reports.length },
          { id: "similar", label: "So sánh giá thị trường", count: similarProperties.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`py-3.5 px-5 font-bold text-xs border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === tab.id
                ? "border-[#E03C31] text-[#E03C31]"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === tab.id ? "bg-red-100 text-[#E03C31]" : "bg-gray-100 text-gray-600"
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === "info" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 text-sm mb-3">Hình ảnh tin đăng ({property.images?.length || 0})</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {property.images?.map((img, i) => (
                  <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    {img.isPrimary && (
                      <span className="absolute bottom-1 left-1 bg-black/75 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        Ảnh chính
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-3">
              <h3 className="font-bold text-gray-900 text-sm">Nội dung mô tả</h3>
              <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-sm mb-4">Đặc điểm bất động sản</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block">Mức giá niêm yết:</span>
                  <span className="font-black text-[#E03C31] text-base mt-0.5 block">
                    {formatPrice(property.price, property.isForRent)}
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block">Diện tích:</span>
                  <span className="font-bold text-gray-900 text-base mt-0.5 block">{property.area} m²</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block">Đơn giá / m²:</span>
                  <span className="font-bold text-gray-900 text-base mt-0.5 block">
                    {property.pricePerM2 ? formatCurrencyVND(property.pricePerM2) + "/m²" : "Đang cập nhật"}
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block">Phòng ngủ / Tắm:</span>
                  <span className="font-semibold text-gray-800 mt-0.5 block">
                    {property.bedrooms} PN • {property.bathrooms} WC
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block">Hướng nhà:</span>
                  <span className="font-semibold text-gray-800 mt-0.5 block">{property.direction || "Không xác định"}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block">Pháp lý:</span>
                  <span className="font-semibold text-gray-800 mt-0.5 block">{property.legalStatus || "Đang thẩm định"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info: Owner & Moderation Metadata */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                Thông tin người đăng
              </h3>
              <div className="flex items-center space-x-3 pb-3 border-b border-gray-100">
                <img
                  src={property.user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-gray-900 truncate">{property.user?.name || "Thành viên"}</p>
                  <p className="text-xs text-gray-500">{property.user?.email || "Chưa cập nhật"}</p>
                  <StatusBadge status={property.user?.role || "USER"} size="sm" className="mt-1" />
                </div>
              </div>
              <div className="text-xs space-y-2 text-gray-600">
                <p className="flex items-center justify-between">
                  <span className="text-gray-400">Số điện thoại:</span>
                  <span className="font-semibold text-gray-900">{property.user?.phone || "0901234567"}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-gray-400">Ngày đăng tin:</span>
                  <span className="font-medium">{formatDateVi(property.createdAt)}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-gray-400">Lượt xem tin:</span>
                  <span className="font-bold text-blue-600">{property.viewsCount} lượt</span>
                </p>
              </div>
            </div>

            {/* Verification Details */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Hồ sơ pháp lý nội bộ
              </h3>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs space-y-2">
                <p className="text-emerald-950 font-bold">
                  {property.verification?.legalDocType || "Sổ hồng / Sổ đỏ chính chủ"}
                </p>
                <p className="text-[11px] text-emerald-700">
                  Mã phôi sổ: <span className="font-mono font-bold">{property.verification?.certificateCode || "VN-QSDĐ-559281"}</span>
                </p>
                <p className="text-[11px] text-emerald-700">
                  Thẩm định viên: {property.verification?.verifiedBy || "Tổ thẩm định pháp lý DigiKash"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab History */}
      {activeTab === "history" && (
        <AuditTrail logs={auditLogs} title={`Lịch sử thao tác trên tin #${property.id}`} />
      )}

      {/* Tab Reports */}
      {activeTab === "reports" && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-gray-200 bg-gray-50">
            <h3 className="font-bold text-gray-900 text-sm">Báo cáo vi phạm từ cộng đồng ({reports.length})</h3>
          </div>
          {reports.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-xs">
              Tin đăng này chưa nhận bất kỳ báo cáo phản ánh nào từ người dùng.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {reports.map((rep) => (
                <div key={rep.id} className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600 text-xs bg-rose-50 px-2.5 py-1 rounded-md">
                      {rep.reasonLabel}
                    </span>
                    <span className="text-[11px] text-gray-400">{formatDateVi(rep.createdAt)}</span>
                  </div>
                  <p className="text-xs text-gray-700">{rep.description}</p>
                  <p className="text-[11px] text-gray-400">
                    Người báo: <span className="font-semibold text-gray-700">{rep.reporterName}</span> ({rep.reporterPhone})
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Similar */}
      {activeTab === "similar" && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-sm">So sánh giá với các tin cùng khu vực ({similarProperties.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {similarProperties.map((sim) => (
              <div key={sim.id} className="border border-gray-200 rounded-xl p-3 space-y-2 hover:shadow-md transition-shadow">
                <img src={sim.images?.[0]?.url} alt="" className="w-full aspect-video object-cover rounded-lg" />
                <h4 className="font-bold text-gray-900 text-xs line-clamp-2">{sim.title}</h4>
                <p className="font-black text-[#E03C31] text-xs">{formatPrice(sim.price, sim.isForRent)}</p>
                <p className="text-[11px] text-gray-400">{sim.area} m² • {sim.district}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reason Dialog for Reject */}
      <ReasonDialog
        isOpen={rejectOpen}
        title="Từ chối tin đăng"
        description="Vui lòng nêu rõ lý do từ chối để hệ thống gửi thông báo phản hồi cho người đăng."
        confirmText="Xác nhận từ chối tin"
        isLoading={loading}
        onConfirm={handleRejectConfirm}
        onClose={() => setRejectOpen(false)}
      />

      {/* Confirm Dialog for Hide */}
      <ConfirmDialog
        isOpen={hideConfirmOpen}
        title={property.status === "HIDDEN" ? "Bỏ ẩn tin đăng?" : "Tạm ẩn tin đăng?"}
        description={
          property.status === "HIDDEN"
            ? "Tin đăng sẽ được hiển thị công khai trở lại trên sàn Batdongsan."
            : "Tin đăng sẽ tạm thời không hiển thị trên kết quả tìm kiếm của khách hàng."
        }
        confirmText={property.status === "HIDDEN" ? "Hiển thị lại" : "Ẩn ngay"}
        variant="warning"
        isLoading={loading}
        onConfirm={handleToggleHide}
        onClose={() => setHideConfirmOpen(false)}
      />
    </div>
  );
}

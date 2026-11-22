"use client";

import React, { useState, useEffect } from "react";
import { Property } from "@/types";
import { formatPrice, formatDateVi } from "@/lib/utils";
import { ReasonDialog } from "@/components/admin/reason-dialog";
import { 
  Check, 
  X, 
  SkipForward, 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  User, 
  MapPin, 
  Eye, 
  CheckCircle2,
  Filter
} from "lucide-react";
import Link from "next/link";

interface ModerationQueueClientProps {
  initialItems: Property[];
}

export function ModerationQueueClient({ initialItems }: ModerationQueueClientProps) {
  const [items, setItems] = useState<Property[]>(initialItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterOnlyWarnings, setFilterOnlyWarnings] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Auto-flagging logic demo
  const getAutoFlags = (prop: Property) => {
    const flags: string[] = [];
    if (prop.price < 500000000 && !prop.isForRent) {
      flags.push("Cảnh báo: Giá bán dưới 500 triệu (Bất thường so với thị trường)");
    }
    if (prop.title.includes("gấp") || prop.title.includes("cắt lỗ") || prop.title.includes("vỡ nợ")) {
      flags.push("Từ khóa nhạy cảm: Chứa cụm từ giật gân");
    }
    if ((prop.images?.length || 0) < 3) {
      flags.push("Chất lượng tin: Ít hơn 3 hình ảnh");
    }
    return flags;
  };

  const currentItem = items[currentIndex];

  const filteredItems = filterOnlyWarnings
    ? items.filter((p) => getAutoFlags(p).length > 0)
    : items;

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (rejectOpen || loading || !currentItem) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "a" || e.key === "A") {
        e.preventDefault();
        handleApprove();
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        setRejectOpen(true);
      } else if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, currentItem, rejectOpen, loading]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleApprove = async () => {
    if (!currentItem) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/properties/${currentItem.id}/approve`, { method: "POST" });
      if (res.ok) {
        showToast(`✓ Đã duyệt tin #${currentItem.id}`);
        setItems((prev) => prev.filter((p) => p.id !== currentItem.id));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRejectConfirm = async (reason: string) => {
    if (!currentItem) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/properties/${currentItem.id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      if (res.ok) {
        showToast(`✗ Đã từ chối tin #${currentItem.id}`);
        setItems((prev) => prev.filter((p) => p.id !== currentItem.id));
        setRejectOpen(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    if (items.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % items.length);
    showToast("Đã chuyển sang tin kế tiếp");
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Hàng đợi đã sạch!</h3>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Không còn tin đăng nào đang ở trạng thái chờ duyệt. Tất cả tin đăng trên sàn đều đã được kiểm tra tính hợp lệ.
        </p>
        <Link
          href="/admin/tin-dang"
          className="inline-block px-4 py-2 text-xs font-bold text-white bg-[#E03C31] hover:bg-[#B8281F] rounded-lg transition-colors"
        >
          Về danh sách tất cả tin
        </Link>
      </div>
    );
  }

  const flags = currentItem ? getAutoFlags(currentItem) : [];

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-xl animate-in fade-in slide-in-from-top-2">
          {toastMsg}
        </div>
      )}

      {/* Control Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 text-xs font-semibold text-gray-700">
          <span className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1.5 rounded-lg border border-amber-200">
            <Clock className="w-4 h-4" />
            Đang chờ: {items.length} tin
          </span>
          <span className="text-gray-400">•</span>
          <span>Thời gian chờ TB: ~ 12 phút</span>
        </div>

        {/* Hotkey Guide */}
        <div className="hidden lg:flex items-center space-x-3 text-xs text-gray-500 font-mono">
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded font-bold text-gray-800">A</kbd>
            Duyệt
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded font-bold text-gray-800">R</kbd>
            Từ chối
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded font-bold text-gray-800">S</kbd>
            Bỏ qua
          </span>
        </div>

        <button
          onClick={() => setFilterOnlyWarnings(!filterOnlyWarnings)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
            filterOnlyWarnings
              ? "bg-rose-50 text-rose-700 border-rose-300"
              : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          {filterOnlyWarnings ? "Chỉ xem tin có cờ cảnh báo" : "Lọc tin có cảnh báo"}
        </button>
      </div>

      {/* Active Review Card */}
      {currentItem && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Photos & Details */}
          <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-gray-200 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-gray-400">
                Tin thứ {currentIndex + 1} / {items.length}
              </span>
              <span className="text-xs text-gray-400">Đăng lúc: {formatDateVi(currentItem.createdAt)}</span>
            </div>

            {/* Main Image */}
            <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200">
              <img
                src={currentItem.images?.[0]?.url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"}
                alt=""
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-black/75 text-white font-bold text-xs px-2.5 py-1 rounded-full">
                {currentItem.images?.length || 0} hình ảnh
              </span>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-2">
              {currentItem.images?.slice(1, 5).map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt=""
                  className="w-full aspect-video object-cover rounded-lg border border-gray-200"
                />
              ))}
            </div>

            {/* Title & Desc */}
            <div className="space-y-2">
              <h2 className="text-lg font-black text-gray-900">{currentItem.title}</h2>
              <p className="text-xs text-gray-600 line-clamp-4 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                {currentItem.description}
              </p>
            </div>
          </div>

          {/* Right Column: Metadata & Auto-Flags */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-gray-50/50 space-y-6">
            <div className="space-y-5">
              {/* Auto Flags Box */}
              {flags.length > 0 ? (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    Hệ thống AI phát hiện bất thường ({flags.length}):
                  </span>
                  <ul className="text-xs text-rose-700 space-y-1 list-disc list-inside">
                    {flags.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Không phát hiện cờ vi phạm tự động
                </div>
              )}

              {/* Price & Specs */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-3">
                <div className="flex items-baseline justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs text-gray-500 font-medium">Mức giá:</span>
                  <span className="text-xl font-black text-[#E03C31]">
                    {formatPrice(currentItem.price, currentItem.isForRent)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-400 block">Diện tích:</span>
                    <span className="font-bold text-gray-800">{currentItem.area} m²</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Loại BĐS:</span>
                    <span className="font-bold text-gray-800">{currentItem.isForRent ? "Cho thuê" : "Bán"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Vị trí:</span>
                    <span className="font-semibold text-gray-800 truncate">{currentItem.district}, {currentItem.city}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Pháp lý:</span>
                    <span className="font-semibold text-gray-800">{currentItem.legalStatus || "Đang thẩm định"}</span>
                  </div>
                </div>
              </div>

              {/* Poster info */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center space-x-3">
                <img
                  src={currentItem.user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div className="overflow-hidden text-xs">
                  <p className="font-bold text-gray-900 truncate">{currentItem.user?.name || "Người đăng"}</p>
                  <p className="text-gray-500">{currentItem.user?.phone || "0901234567"}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions (A / R / S) */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handleApprove}
                  disabled={loading}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  Duyệt (A)
                </button>

                <button
                  onClick={() => setRejectOpen(true)}
                  disabled={loading}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  Từ chối (R)
                </button>

                <button
                  onClick={handleSkip}
                  disabled={loading}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl font-bold text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all active:scale-95"
                >
                  <SkipForward className="w-4 h-4" />
                  Bỏ qua (S)
                </button>
              </div>

              <div className="text-center">
                <Link
                  href={`/admin/tin-dang/${currentItem.id}`}
                  className="text-xs text-gray-500 hover:text-gray-800 underline inline-flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Mở trang chi tiết đầy đủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Dialog */}
      <ReasonDialog
        isOpen={rejectOpen}
        title="Từ chối phê duyệt tin đăng"
        description="Chọn hoặc nhập lý do từ chối để hệ thống tự động thông báo đến tác giả tin đăng."
        confirmText="Xác nhận từ chối tin"
        isLoading={loading}
        onConfirm={handleRejectConfirm}
        onClose={() => setRejectOpen(false)}
      />
    </div>
  );
}

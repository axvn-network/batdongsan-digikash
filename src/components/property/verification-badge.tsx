"use client";

import { useState } from "react";
import { VerificationDetails } from "@/types";
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText, X } from "lucide-react";

export function VerificationBadge({ verification }: { verification?: VerificationDetails }) {
  const [showModal, setShowModal] = useState(false);

  if (!verification || !verification.isVerified) {
    return (
      <span className="inline-flex items-center space-x-1 bg-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-full font-medium">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
        <span>Tin đăng tiêu chuẩn</span>
      </span>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-sm transition-all cursor-pointer"
        title="Bấm để xem hồ sơ thẩm định pháp lý"
      >
        <ShieldCheck className="w-4 h-4 text-emerald-200" />
        <span>✓ ĐÃ XÁC THỰC SỔ ĐỎ</span>
      </button>

      {/* Verification Audit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-emerald-100 space-y-5 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Chứng Nhận Bất Động Sản Sạch
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-0.5">
                  Hồ Sơ Thẩm Định Pháp Lý
                </h3>
              </div>
            </div>

            {/* Verification Metadata */}
            <div className="bg-gray-50 rounded-2xl p-4 text-xs space-y-2 border border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-500">Mã chứng nhận:</span>
                <strong className="text-gray-900 font-mono">{verification.certificateCode || "DK-VERIFIED-2024-8891"}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Loại giấy tờ kiểm tra:</span>
                <span className="font-semibold text-emerald-700">{verification.legalDocType || "Sổ hồng chính chủ"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Đơn vị thẩm định:</span>
                <span className="text-gray-700">{verification.verifiedBy || "Ban Pháp Chế DigiKash"}</span>
              </div>
            </div>

            {/* 4 Checklist Criteria */}
            <div className="space-y-3 text-xs">
              <p className="font-bold text-gray-900 uppercase tracking-wide text-[11px]">
                4 Tiêu chuẩn kiểm duyệt bắt buộc:
              </p>

              {[
                { title: "Xác thực danh tính chủ sở hữu", desc: "Ảnh sổ gốc trùng khớp với CCCD của chủ nhà hoặc ủy quyền hợp pháp." },
                { title: "Kiểm tra thông tin quy hoạch", desc: "Không nằm trong diện giải tỏa mở đường hoặc quy hoạch dự án công ích." },
                { title: "Kiểm tra tranh chấp & ngăn chặn", desc: "Không có thông báo ngăn chặn giao dịch tại văn phòng đăng ký đất đai." },
                { title: "Định giá minh bạch theo thị trường", desc: "Mức giá niêm yết đúng giá bán thật, cam kết không kê khống giá ảo." },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-800">{item.title}: </strong>
                    <span className="text-gray-500">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Anti-Fake Guarantee Commitment */}
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
              <p className="font-bold">Cam kết "Chợ Sạch" từ DigiKash:</p>
              <p className="text-[11px] mt-0.5">
                Nếu phát hiện tin đăng này là tin ảo hoặc đã bán nhưng chưa gỡ, vui lòng báo cáo. Sàn sẽ tặng ngay 1.000.000 ₫ vào ví của bạn.
              </p>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all"
            >
              Đóng cửa sổ
            </button>
          </div>
        </div>
      )}
    </>
  );
}

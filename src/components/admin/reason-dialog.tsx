"use client";

import React, { useState } from "react";
import { AlertCircle, X } from "lucide-react";

interface ReasonDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  presetReasons?: string[];
  placeholder?: string;
  confirmText?: string;
  isLoading?: boolean;
  onConfirm: (reason: string) => void;
  onClose: () => void;
}

export function ReasonDialog({
  isOpen,
  title,
  description,
  presetReasons = [
    "Nội dung trùng lặp hoặc chứa từ khóa spam",
    "Hình ảnh không rõ nét, chứa số điện thoại hoặc watermark đối thủ",
    "Giá bán bất thường, sai lệch so với thị trường",
    "Địa chỉ không chính xác hoặc thiếu thông tin quy hoạch",
    "Yêu cầu bổ sung giấy tờ pháp lý / Sổ đỏ chính chủ",
  ],
  placeholder = "Nhập lý do chi tiết để thông báo cho người dùng...",
  confirmText = "Xác nhận & Gửi thông báo",
  isLoading = false,
  onConfirm,
  onClose,
}: ReasonDialogProps) {
  const [selectedPreset, setSelectedPreset] = useState("");
  const [customReason, setCustomReason] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalReason = customReason.trim() || selectedPreset;
    if (!finalReason) return;
    onConfirm(finalReason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-gray-100 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-full bg-rose-100 text-rose-600">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{description}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Chọn lý do mẫu:
            </label>
            <select
              value={selectedPreset}
              onChange={(e) => {
                setSelectedPreset(e.target.value);
                if (e.target.value) setCustomReason(e.target.value);
              }}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            >
              <option value="">-- Chọn lý do thường gặp --</option>
              {presetReasons.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Nội dung chi tiết (Bắt buộc):
            </label>
            <textarea
              rows={3}
              required
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder={placeholder}
              className="w-full text-sm border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Đóng
            </button>
            <button
              type="submit"
              disabled={isLoading || (!selectedPreset && !customReason.trim())}
              className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-sm inline-flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {confirmText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

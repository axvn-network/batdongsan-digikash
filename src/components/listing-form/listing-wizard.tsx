"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PROPERTY_TYPES, CITIES, DIRECTIONS, LEGAL_STATUSES } from "@/lib/constants";
import { Check, ArrowRight, ArrowLeft, Upload, Eye, CheckCircle2, DollarSign, Image as ImageIcon } from "lucide-react";
import { formatPrice, formatArea } from "@/lib/utils";

export function ListingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyTypeId: "can-ho-chung-cu",
    isForRent: false,
    price: 3500000000,
    area: 75,
    bedrooms: 2,
    bathrooms: 2,
    direction: "Đông Nam",
    legalStatus: "Sổ đỏ / Sổ hồng",
    furniture: "Đầy đủ cao cấp",
    city: "Hồ Chí Minh",
    district: "Quận 1",
    address: "123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1",
    latitude: 10.7769,
    longitude: 106.7009,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    ],
    requestVerification: true,
    deedImages: [
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
    ],
    selectedPackage: "pkg-free",
  });

  const nextStep = () => {
    setError("");
    if (step === 1 && !formData.propertyTypeId) {
      setError("Vui lòng chọn loại hình bất động sản");
      return;
    }
    if (step === 2) {
      if (!formData.title || formData.title.length < 10) {
        setError("Tiêu đề phải từ 10 ký tự trở lên");
        return;
      }
      if (!formData.price || formData.price <= 0) {
        setError("Vui lòng nhập mức giá hợp lệ");
        return;
      }
      if (!formData.area || formData.area <= 0) {
        setError("Vui lòng nhập diện tích hợp lệ");
        return;
      }
    }
    if (step === 3 && formData.images.length === 0) {
      setError("Vui lòng thêm ít nhất 1 hình ảnh");
      return;
    }
    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Không thể đăng tin");
      }

      setStep(6); // Success step
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  const addSampleImage = () => {
    const sample = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
    setFormData({ ...formData, images: [...formData.images, sample] });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
        {[
          { num: 1, label: "Loại BĐS" },
          { num: 2, label: "Thông tin" },
          { num: 3, label: "Hình ảnh" },
          { num: 4, label: "Xem trước" },
          { num: 5, label: "Gói tin" },
        ].map((item, idx) => (
          <div key={item.num} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  step > item.num
                    ? "bg-emerald-600 text-white"
                    : step === item.num
                    ? "bg-[#E03C31] text-white ring-4 ring-red-100"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {step > item.num ? <Check className="w-4 h-4" /> : item.num}
              </div>
              <span className={`text-[11px] mt-1.5 font-medium ${
                step === item.num ? "text-[#E03C31] font-bold" : "text-gray-500"
              }`}>
                {item.label}
              </span>
            </div>
            {idx < 4 && (
              <div className={`w-8 sm:w-16 h-0.5 mx-2 -mt-5 transition-all ${
                step > item.num ? "bg-emerald-600" : "bg-gray-200"
              }`} />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Step 1: Chọn loại hình */}
      {step === 1 && (
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900">Chọn hình thức và loại bất động sản</h3>
            <p className="text-xs text-gray-500 mt-1">Chọn chính xác danh mục để tin đăng tiếp cận đúng khách hàng</p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isForRent: false })}
              className={`flex-1 py-3 text-sm font-bold rounded-xl border-2 transition-all ${
                !formData.isForRent ? "border-[#E03C31] bg-red-50/50 text-[#E03C31]" : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Bán nhà đất
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isForRent: true })}
              className={`flex-1 py-3 text-sm font-bold rounded-xl border-2 transition-all ${
                formData.isForRent ? "border-[#E03C31] bg-red-50/50 text-[#E03C31]" : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Cho thuê nhà đất
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {PROPERTY_TYPES.map((pt) => (
              <button
                key={pt.id}
                type="button"
                onClick={() => setFormData({ ...formData, propertyTypeId: pt.id })}
                className={`p-4 rounded-xl border text-left transition-all ${
                  formData.propertyTypeId === pt.id
                    ? "border-[#E03C31] bg-red-50/40 text-gray-900 font-bold shadow-sm"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                <p className="text-sm">{pt.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Thông tin chi tiết */}
      {step === 2 && (
        <div className="space-y-4 max-w-2xl mx-auto text-xs">
          <div>
            <label className="block text-gray-700 font-bold mb-1">Tiêu đề tin đăng *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="VD: Bán căn hộ 2PN Masteri Thảo Điền view sông đẹp lung linh, giá tốt"
              className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#E03C31]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Mức giá (VND) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#E03C31]"
              />
              <span className="text-[11px] text-[#E03C31] font-semibold mt-1 block">
                {formatPrice(formData.price, formData.isForRent)}
              </span>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Diện tích (m²) *</label>
              <input
                type="number"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                className="w-full p-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#E03C31]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Số phòng ngủ</label>
              <input
                type="number"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                className="w-full p-2.5 border border-gray-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Số phòng tắm</label>
              <input
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                className="w-full p-2.5 border border-gray-300 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Hướng nhà</label>
              <select
                value={formData.direction}
                onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-xl text-xs"
              >
                {DIRECTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Pháp lý</label>
              <select
                value={formData.legalStatus}
                onChange={(e) => setFormData({ ...formData, legalStatus: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-xl text-xs"
              >
                {LEGAL_STATUSES.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Tỉnh / Thành phố *</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-xl text-xs"
              >
                {CITIES.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Quận / Huyện *</label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">Địa chỉ chi tiết *</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2.5 border border-gray-300 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">Mô tả chi tiết *</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Mô tả cụ thể về căn nhà, vị trí, tiện ích xung quanh, nội thất, hướng view..."
              className="w-full p-2.5 border border-gray-300 rounded-xl text-sm"
            />
          </div>
        </div>
      )}

      {/* Step 3: Hình ảnh & Pháp lý */}
      {step === 3 && (
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900">Hình ảnh & Hồ sơ pháp lý</h3>
            <p className="text-xs text-gray-500 mt-1">Đăng ít nhất 2 ảnh để tin đăng được tiếp cận khách hàng gấp 3 lần</p>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#E03C31] transition-colors bg-gray-50/50">
            <Upload className="w-9 h-9 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-800">Kéo thả ảnh hoặc bấm để chọn ảnh từ máy</p>
            <p className="text-xs text-gray-400 mt-1">Định dạng JPG, PNG, WebP (Tối đa 10MB/ảnh)</p>
            <button
              type="button"
              onClick={addSampleImage}
              className="mt-3 px-3.5 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs font-semibold"
            >
              + Thêm ảnh mẫu demo
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {formData.images.map((img, idx) => (
              <div key={idx} className="relative rounded-xl overflow-hidden border border-gray-200 h-24">
                <img src={img} alt="" className="w-full h-full object-cover" />
                {idx === 0 && (
                  <span className="absolute top-1 left-1 bg-[#E03C31] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    Ảnh đại diện
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Sổ đỏ verification section */}
          <div className="border border-emerald-200 bg-emerald-50/60 rounded-2xl p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Đăng ký cấp Huy hiệu "Đã xác thực Sổ đỏ"</h4>
                  <p className="text-[11px] text-gray-600">Được ưu tiên hiển thị Top bộ lọc "Chỉ xem tin sạch", tăng 3.5x tỷ lệ liên hệ</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.requestVerification}
                  onChange={(e) => setFormData({ ...formData, requestVerification: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {formData.requestVerification && (
              <div className="pt-3 border-t border-emerald-200/60 space-y-3">
                <p className="text-xs text-gray-700 font-semibold">Tải lên Giấy chứng nhận quyền sử dụng đất (Sổ hồng / Sổ đỏ):</p>
                <div className="flex items-center space-x-3">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-emerald-400">
                    <img
                      src={formData.deedImages[0]}
                      alt="Sổ đỏ preview"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] text-center py-0.5">
                      Bản chụp Sổ đỏ
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p className="font-medium text-emerald-800">✓ Đã đính kèm ảnh mẫu Sổ đỏ hợp lệ</p>
                    <p className="text-[11px] text-gray-500">Bảo mật tuyệt đối: Số serial và tên cá nhân sẽ được làm mờ trên trang công khai.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 bg-white/80 p-3 rounded-xl border border-emerald-100">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-emerald-600 font-bold">1.</span>
                    <span>Kiểm tra số tờ, số thửa</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-emerald-600 font-bold">2.</span>
                    <span>Đối chiếu tọa độ GPS vị trí</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-emerald-600 font-bold">3.</span>
                    <span>Xác minh quy hoạch & tranh chấp</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-emerald-600 font-bold">4.</span>
                    <span>Ký cam kết chính chủ / giá thật</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Step 4: Xem trước */}
      {step === 4 && (
        <div className="space-y-4 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 text-center">Xem trước tin đăng</h3>
          <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50/50 space-y-3">
            <h4 className="font-bold text-base text-gray-900">{formData.title}</h4>
            <div className="flex items-baseline space-x-3">
              <span className="text-[#E03C31] font-extrabold text-lg">
                {formatPrice(formData.price, formData.isForRent)}
              </span>
              <span className="text-gray-600 font-semibold text-sm">
                {formatArea(formData.area)}
              </span>
            </div>
            <p className="text-xs text-gray-500">{formData.address}</p>
            <p className="text-xs text-gray-700 leading-relaxed border-t border-gray-200 pt-3">
              {formData.description || "Chưa có mô tả"}
            </p>
          </div>
        </div>
      )}

      {/* Step 5: Gói dịch vụ */}
      {step === 5 && (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900">Chọn gói đăng tin</h3>
            <p className="text-xs text-gray-500 mt-1">Tin VIP giúp tiếp cận khách hàng tiềm năng nhanh gấp 10 lần</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                id: "pkg-free",
                name: "Tin Thường",
                price: "Miễn phí",
                duration: "30 ngày",
                features: ["Hiển thị danh sách thường", "Hỗ trợ duyệt trong 24h"],
              },
              {
                id: "pkg-vip",
                name: "Tin VIP Nổi Bật",
                price: "299.000 ₫",
                duration: "15 ngày",
                popular: true,
                features: ["Huy hiệu VIP đỏ", "Ưu tiên Top danh mục", "Đẩy tin tự động mỗi ngày"],
              },
              {
                id: "pkg-diamond",
                name: "Tin Kim Cương",
                price: "899.000 ₫",
                duration: "30 ngày",
                features: ["Vị trí VIP1 Trang Chủ", "Banner quảng cáo nổi bật", "Đóng dấu bản quyền ảnh"],
              },
            ].map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => setFormData({ ...formData, selectedPackage: pkg.id })}
                className={`relative rounded-2xl p-5 border-2 cursor-pointer transition-all ${
                  formData.selectedPackage === pkg.id
                    ? "border-[#E03C31] bg-red-50/20 shadow-md scale-102"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E03C31] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase">
                    Phổ biến nhất
                  </span>
                )}
                <h4 className="font-bold text-gray-900 text-base">{pkg.name}</h4>
                <p className="text-[#E03C31] font-black text-xl my-2">{pkg.price}</p>
                <p className="text-xs text-gray-500 mb-4">Thời hạn: {pkg.duration}</p>
                <ul className="space-y-2 text-xs text-gray-600">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 6: Thành công */}
      {step === 6 && (
        <div className="text-center py-8 space-y-4 max-w-md mx-auto">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
          <h3 className="text-2xl font-bold text-gray-900">Đăng tin thành công!</h3>
          <p className="text-xs text-gray-600">
            Tin đăng của bạn đã được tiếp nhận và đang chờ ban quản trị phê duyệt theo tiêu chuẩn chất lượng.
          </p>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => router.push("/tai-khoan/tin-dang")}
              className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold"
            >
              Về quản lý tin
            </button>
            <button
              onClick={() => router.push("/bat-dong-san")}
              className="flex-1 py-2.5 bg-[#E03C31] hover:bg-[#B8281F] text-white rounded-xl text-xs font-bold"
            >
              Xem danh sách BĐS
            </button>
          </div>
        </div>
      )}

      {/* Stepper Buttons */}
      {step < 6 && (
        <div className="flex items-center justify-between pt-8 border-t border-gray-100 mt-8 max-w-2xl mx-auto">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center space-x-1.5 text-xs font-bold text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg border border-gray-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại</span>
            </button>
          ) : <div />}

          {step < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center space-x-1.5 text-xs font-bold bg-[#E03C31] hover:bg-[#B8281F] text-white px-6 py-2.5 rounded-xl shadow-sm transition-all"
            >
              <span>Tiếp tục</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center space-x-1.5 text-xs font-bold bg-[#E03C31] hover:bg-[#B8281F] text-white px-8 py-2.5 rounded-xl shadow-sm transition-all disabled:opacity-50"
            >
              <span>{loading ? "Đang xử lý..." : "Xác nhận & Hoàn tất"}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

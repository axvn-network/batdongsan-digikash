import Link from "next/link";
import { Check, ShieldCheck, Zap, Star, Users, PhoneCall, Sparkles } from "lucide-react";

export const metadata = {
  title: "Gói Dịch Vụ & Hội Viên Môi Giới Chuyên Nghiệp",
  description: "Bảng giá gói đăng tin VIP, gói hội viên Pro Agent và giải pháp tiếp cận khách hàng tiềm năng (Leads) hiệu quả nhất.",
};

export default function PricingPage() {
  const packages = [
    {
      id: "pkg-free",
      name: "Tin Tiêu Chuẩn",
      badge: "Cơ bản",
      price: "0 ₫",
      period: "30 ngày",
      desc: "Phù hợp cho cá nhân chính chủ cần bán hoặc cho thuê căn nhà duy nhất.",
      features: [
        "Đăng tối đa 2 tin/tháng",
        "Hiển thị danh sách tiêu chuẩn",
        "Hỗ trợ duyệt tin trong 24h",
        "Lưu trữ tin đăng 30 ngày",
      ],
      ctaText: "Đăng tin miễn phí",
      ctaHref: "/dang-tin",
      popular: false,
    },
    {
      id: "pkg-vip",
      name: "Tin VIP Nổi Bật",
      badge: "Phổ biến nhất",
      price: "299.000 ₫",
      period: "15 ngày",
      desc: "Tăng lượt xem gấp 5 lần với vị trí ưu tiên và nhãn VIP nổi bật.",
      features: [
        "Huy hiệu VIP Nổi Bật màu đỏ",
        "Ưu tiên hiển thị Top 5 danh mục",
        "Đẩy tin tự động 1 lần/ngày",
        "Gắn nhãn Hình ảnh thật & Sổ đỏ xác thực",
        "Hỗ trợ duyệt nhanh trong 2h",
      ],
      ctaText: "Chọn gói VIP",
      ctaHref: "/dang-tin",
      popular: true,
    },
    {
      id: "pkg-pro",
      name: "Hội Viên Pro Agent",
      badge: "Dành cho môi giới",
      price: "899.000 ₫",
      period: "tháng",
      desc: "Giải pháp toàn diện xây dựng thương hiệu cá nhân và khai thác nguồn khách hàng tiềm năng.",
      features: [
        "Đăng không giới hạn tin (tối đa 30 tin VIP)",
        "Hồ sơ riêng trên Danh Bạ Môi Giới",
        "Huy hiệu 'Môi giới chuyên nghiệp Verified'",
        "Nhận 15 Leads khách hàng độc quyền/tháng",
        "Tự động gắn Watermark bản quyền ảnh",
        "Báo cáo thống kê lượt click & chuyển đổi",
      ],
      ctaText: "Nâng cấp Pro Agent",
      ctaHref: "/dang-tin",
      popular: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-gray-900">Trang chủ</Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">Bảng giá & Gói dịch vụ</span>
      </nav>

      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-red-50 text-[#E03C31] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Giải pháp tăng tốc thanh khoản BĐS</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Bảng Giá Dịch Vụ & Hội Viên Môi Giới
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
          Minh bạch chi phí, tối ưu tỷ lệ chốt giao dịch với công cụ hỗ trợ môi giới chuyên sâu và nguồn lead khách hàng chất lượng cao.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative bg-white rounded-3xl p-8 border-2 flex flex-col justify-between shadow-sm transition-all ${
              pkg.popular
                ? "border-[#E03C31] shadow-xl scale-105 z-10"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {pkg.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E03C31] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow">
                {pkg.badge}
              </span>
            )}

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {pkg.badge}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-1">{pkg.name}</h3>
                <p className="text-xs text-gray-500 mt-2 min-h-[36px]">{pkg.desc}</p>
              </div>

              <div className="pt-2 pb-4 border-b border-gray-100 flex items-baseline space-x-1">
                <span className="text-3xl font-black text-[#E03C31]">{pkg.price}</span>
                <span className="text-xs text-gray-400">/ {pkg.period}</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-600">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Link
                href={pkg.ctaHref}
                className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                  pkg.popular
                    ? "bg-[#E03C31] hover:bg-[#B8281F] text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
              >
                {pkg.ctaText}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Lead Generation Showcase Section */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center space-x-1">
            <PhoneCall className="w-4 h-4" />
            <span>Mô hình Lead Generation Độc Quyền</span>
          </span>
          <h3 className="text-2xl font-bold">Cần thêm khách hàng mua & thuê có tài chính sẵn?</h3>
          <p className="text-xs text-emerald-100 leading-relaxed">
            Hệ thống tự động phân loại nhu cầu của hơn 10.000 khách tìm nhà mỗi tháng và chuyển giao độc quyền cho các môi giới đạt chuẩn Verified Agent tại từng quận/huyện.
          </p>
        </div>
        <Link
          href="/dang-ky"
          className="py-3 px-6 bg-white text-emerald-950 font-bold text-xs rounded-xl shadow-lg hover:bg-emerald-50 transition-colors flex-shrink-0"
        >
          Đăng ký đối tác môi giới
        </Link>
      </div>
    </div>
  );
}

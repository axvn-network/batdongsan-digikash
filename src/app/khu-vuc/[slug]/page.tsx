import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PropertyRepository } from "@/lib/repositories/property.repo";
import { PropertyCard } from "@/components/property/property-card";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ShieldCheck, MapPin, TrendingUp, HelpCircle, ArrowRight, CheckCircle2 } from "lucide-react";

interface PageProps {
  params: { slug: string };
}

// Preset SEO Landing Page Configs
const SEO_LANDING_PAGES: Record<
  string,
  {
    title: string;
    heading: string;
    description: string;
    city: string;
    propertyType?: string;
    isForRent?: boolean;
    avgPrice: string;
    priceGrowth: string;
    verifiedPercentage: string;
    faqs: { q: string; a: string }[];
  }
> = {
  "ban-can-ho-tphcm": {
    title: "Mua Bán Căn Hộ Chung Cư TP.HCM Sổ Đỏ Chính Chủ, Giá Tốt 2026",
    heading: "Bán Căn Hộ Chung Cư TP. Hồ Chí Minh — 100% Sổ Hồng Xác Thực",
    description:
      "Danh sách căn hộ chung cư TP.HCM bán giá tốt, pháp lý chuẩn sổ hồng lâu dài, vị trí đẹp tại Quận 1, Quận 2, Bình Thạnh, Thủ Đức. Cam kết không tin ảo.",
    city: "Hồ Chí Minh",
    propertyType: "can-ho-chung-cu",
    isForRent: false,
    avgPrice: "52,8 triệu/m²",
    priceGrowth: "+6.8%/năm",
    verifiedPercentage: "92%",
    faqs: [
      {
        q: "Làm thế nào để nhận biết căn hộ có sổ hồng chính chủ?",
        a: "Mọi tin đăng có huy hiệu '✓ Đã xác thực Sổ đỏ' trên sàn đều đã được hội đồng pháp lý đối soát số tờ, số thửa và giấy chứng nhận trước khi hiển thị.",
      },
      {
        q: "Phí sang tên chuyển nhượng căn hộ chung cư tại TP.HCM là bao nhiêu?",
        a: "Thuế thu nhập cá nhân bên bán là 2% giá trị chuyển nhượng, lệ phí trước bạ bên mua là 0.5%, cùng phí công chứng và hồ sơ sang tên từ 3-5 triệu đồng.",
      },
      {
        q: "Ngân hàng hỗ trợ vay mua căn hộ TP.HCM tối đa bao nhiêu?",
        a: "Các ngân hàng đối tác hỗ trợ vay lên tới 70% - 80% giá trị thẩm định với thời hạn lên đến 25 năm, lãi suất ưu đãi năm đầu từ 5.9% - 7.5%/năm.",
      },
    ],
  },
  "nha-dat-ban-ha-noi": {
    title: "Mua Bán Nhà Đất Hà Nội Chính Chủ, Pháp Lý Chuẩn Sổ Đỏ 2026",
    heading: "Bán Nhà Đất Hà Nội — Đã Thẩm Định Sổ Đỏ, Không Quy Hoạch",
    description:
      "Mua bán nhà riêng, nhà phố, biệt thự liền kề tại Hà Nội. Vị trí trung tâm Ba Đình, Đống Đa, Cầu Giấy, Tây Hồ. Thông tin quy hoạch minh bạch.",
    city: "Hà Nội",
    isForRent: false,
    avgPrice: "145 triệu/m²",
    priceGrowth: "+9.2%/năm",
    verifiedPercentage: "88%",
    faqs: [
      {
        q: "Mua nhà đất thổ cư Hà Nội cần lưu ý những giấy tờ gì?",
        a: "Cần kiểm tra kỹ Giấy chứng nhận QSDĐ bản gốc, đối chiếu hiện trạng kích thước thực tế với sơ đồ thửa đất, và tra cứu quy hoạch tại phòng TN&MT quận.",
      },
      {
        q: "Có được hỗ trợ kiểm tra quy hoạch trước khi cọc không?",
        a: "Có. Nền tảng cung cấp báo cáo tra cứu quy hoạch độc lập và cam kết hoàn tiền cọc nếu tin đăng sai lệch thông tin quy hoạch.",
      },
    ],
  },
  "cho-thue-can-ho-tphcm": {
    title: "Cho Thuê Căn Hộ Chung Cư TP.HCM Giá Tốt, Đầy Đủ Nội Thất 2026",
    heading: "Cho Thuê Căn Hộ Chung Cư TP.HCM — Giá Thật, Phòng Thật",
    description:
      "Tổng hợp căn hộ cho thuê giá tốt nhất TP.HCM, studio, 1-3 phòng ngủ, nội thất cao cấp tại Vinhomes Central Park, Masteri, The Sun Avenue. Vào ở ngay.",
    city: "Hồ Chí Minh",
    propertyType: "can-ho-chung-cu",
    isForRent: true,
    avgPrice: "16,5 triệu/tháng",
    priceGrowth: "+4.1%/năm",
    verifiedPercentage: "95%",
    faqs: [
      {
        q: "Thời hạn hợp đồng thuê căn hộ thường là bao lâu?",
        a: "Thông thường từ 6 tháng đến 1 năm trở lên, đặt cọc phổ biến là 1 đến 2 tháng tiền thuê.",
      },
      {
        q: "Chi phí dịch vụ quản lý căn hộ do ai chi trả?",
        a: "Tùy thuộc thỏa thuận trong hợp đồng thuê. Phần lớn các chủ nhà chịu phí quản lý, người thuê tự thanh toán điện, nước và gửi xe.",
      },
    ],
  },
  "ban-nha-dat-da-nang": {
    title: "Mua Bán Nhà Đất Đà Nẵng Giá Tốt, Vị Trí Ven Biển Đẹp Nhất 2026",
    heading: "Bán Nhà Đất Đà Nẵng — Đất Nền Ven Biển & Nhà Phố Trung Tâm",
    description:
      "Thị trường mua bán nhà đất Đà Nẵng tại Sơn Trà, Ngũ Hành Sơn, Hải Châu. Tiềm năng đầu tư du lịch và an cư nghỉ dưỡng bền vững.",
    city: "Đà Nẵng",
    isForRent: false,
    avgPrice: "48,2 triệu/m²",
    priceGrowth: "+7.5%/năm",
    verifiedPercentage: "90%",
    faqs: [
      {
        q: "Đầu tư bất động sản Đà Nẵng khu vực nào tiềm năng nhất hiện nay?",
        a: "Khu vực ven biển Mỹ Khê (Sơn Trà, Ngũ Hành Sơn) và trục đô thị Nam Hòa Xuân đang có thanh khoản và tỷ suất tăng giá ổn định nhất.",
      },
    ],
  },
  "ban-can-ho-binh-duong": {
    title: "Mua Bán Căn Hộ Bình Dương Liền Kề TP.HCM, Giá Chỉ Từ 1.2 Tỷ",
    heading: "Bán Căn Hộ Bình Dương — Dĩ An, Thuận An Liền Kề Thủ Đức",
    description:
      "Danh sách căn hộ chung cư Bình Dương giá rẻ, thanh toán linh hoạt, vị trí đắc địa gần ga Metro và trục Quốc Lộ 13.",
    city: "Bình Dương",
    propertyType: "can-ho-chung-cu",
    isForRent: false,
    avgPrice: "31,5 triệu/m²",
    priceGrowth: "+5.4%/năm",
    verifiedPercentage: "94%",
    faqs: [
      {
        q: "Căn hộ Bình Dương có dễ di chuyển vào trung tâm TP.HCM không?",
        a: "Từ Dĩ An và Thuận An di chuyển về Quận 1 chỉ mất 25-35 phút qua Phạm Văn Đồng hoặc Quốc Lộ 13 mở rộng.",
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(SEO_LANDING_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const config = SEO_LANDING_PAGES[params.slug];
  if (!config) return { title: "Bất động sản khu vực | DigiKash Real Estate" };

  return {
    title: `${config.title} | Sàn BĐS Sạch`,
    description: config.description,
    openGraph: {
      title: config.title,
      description: config.description,
      type: "website",
      locale: "vi_VN",
    },
    alternates: {
      canonical: `/khu-vuc/${params.slug}`,
    },
  };
}

export default async function KhuVucLandingPage({ params }: PageProps) {
  const config = SEO_LANDING_PAGES[params.slug];
  if (!config) notFound();

  // Query properties matching this location
  const result = await PropertyRepository.search({
    city: config.city,
    isForRent: config.isForRent,
    limit: 12,
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-between">
      <SiteHeader />

      <main className="flex-grow pb-16">
        {/* Breadcrumb & Hero */}
        <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-4">
            <nav className="text-xs text-gray-400 flex items-center space-x-2">
              <Link href="/" className="hover:text-white">Trang chủ</Link>
              <span>/</span>
              <Link href="/bat-dong-san" className="hover:text-white">Khu vực</Link>
              <span>/</span>
              <span className="text-gray-200 font-semibold">{config.city}</span>
            </nav>

            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Tiêu chuẩn Chợ Sạch — 100% Sổ Đỏ Đối Soát Thực Tế</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                {config.heading}
              </h1>
              <p className="text-sm text-gray-300 leading-relaxed">
                {config.description}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-800 max-w-4xl">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-[11px] text-gray-400">Đơn giá trung bình</p>
                <p className="text-lg font-bold text-white mt-0.5">{config.avgPrice}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-[11px] text-gray-400">Tăng trưởng năm</p>
                <p className="text-lg font-bold text-emerald-400 mt-0.5">{config.priceGrowth}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-[11px] text-gray-400">Tỷ lệ Sổ đỏ kiểm định</p>
                <p className="text-lg font-bold text-emerald-400 mt-0.5">{config.verifiedPercentage}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <p className="text-[11px] text-gray-400">Số tin đăng hiện hữu</p>
                <p className="text-lg font-bold text-white mt-0.5">{result.total} tin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Filter Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-20 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between overflow-x-auto gap-3 text-xs">
            <div className="flex items-center space-x-2 flex-shrink-0">
              <span className="font-bold text-gray-700">Lọc nhanh:</span>
              <Link
                href={`/bat-dong-san?city=${encodeURIComponent(config.city)}&isVerifiedOnly=true`}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 hover:bg-emerald-100 flex items-center space-x-1"
              >
                <span>✓ Chỉ tin có Sổ đỏ</span>
              </Link>
              <Link
                href={`/bat-dong-san?city=${encodeURIComponent(config.city)}&minPrice=0&maxPrice=3000000000`}
                className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
              >
                Dưới 3 tỷ
              </Link>
              <Link
                href={`/bat-dong-san?city=${encodeURIComponent(config.city)}&minPrice=3000000000&maxPrice=5000000000`}
                className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
              >
                Từ 3 - 5 tỷ
              </Link>
              <Link
                href={`/bat-dong-san?city=${encodeURIComponent(config.city)}&minPrice=5000000000`}
                className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
              >
                Trên 5 tỷ
              </Link>
            </div>

            <Link
              href={`/bat-dong-san?city=${encodeURIComponent(config.city)}`}
              className="text-[#E03C31] font-bold hover:underline flex-shrink-0 flex items-center space-x-1"
            >
              <span>Xem trên bản đồ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Content Listing Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-gray-900 tracking-tight">
                Danh sách tin đăng nổi bật ({result.items.length})
              </h2>
              <span className="text-xs text-gray-500">Cập nhật hôm nay</span>
            </div>

            {result.items.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {result.items.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500 text-sm">Hiện chưa có tin đăng phù hợp tiêu chí</p>
              </div>
            )}
          </div>

          {/* FAQ Section (Programmatic SEO Schema target) */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-[#E03C31]" />
              <h3 className="text-lg font-bold text-gray-900">
                Câu hỏi thường gặp về bất động sản tại {config.city}
              </h3>
            </div>

            <div className="divide-y divide-gray-100">
              {config.faqs.map((faq, i) => (
                <div key={i} className="py-4 space-y-1.5">
                  <h4 className="font-bold text-sm text-gray-900 flex items-start space-x-2">
                    <span className="text-[#E03C31]">Q{i + 1}.</span>
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

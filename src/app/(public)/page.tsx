import Link from "next/link";
import { SearchBar } from "@/components/search/search-bar";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyRepository } from "@/lib/repositories/property.repo";
import { LocationRepository } from "@/lib/repositories/location.repo";
import { MOCK_POSTS } from "@/lib/repositories/mock-data";
import { formatDateVi } from "@/lib/utils";
import { LoanCalculator } from "@/components/utilities/loan-calculator";
import { ENTERPRISES } from "@/lib/data/enterprises";
import { 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  MapPin, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  Calculator,
  Compass,
  FileCheck,
  Building,
  CheckCircle2,
  Newspaper
} from "lucide-react";

export const revalidate = 60; // ISR 60s

export default async function HomePage() {
  const [featuredBuy, featuredRent, projects, cities] = await Promise.all([
    PropertyRepository.search({ isForRent: false, limit: 8, status: "APPROVED" }),
    PropertyRepository.search({ isForRent: true, limit: 4, status: "APPROVED" }),
    LocationRepository.getProjects(),
    LocationRepository.getCities(),
  ]);

  return (
    <div className="space-y-12 pb-12">
      {/* 1. HERO SECTION WITH BATDONGSAN SIGNATURE ARCHITECTURAL BANNER & FLOATING SEARCH */}
      <section className="relative min-h-[480px] sm:min-h-[520px] flex items-center justify-center pt-8 pb-14 px-4 overflow-hidden">
        {/* Realistic Architectural Background (Batdongsan style) */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />
        {/* Gradient Vignette overlay for text contrast and premium feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75" />

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-semibold border border-white/15 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Kênh thông tin bất động sản số 1 Việt Nam</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            Tìm ngôi nhà mơ ước của bạn
          </h1>
          <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto font-normal drop-shadow">
            Hơn 100.000+ tin đăng mua bán và cho thuê nhà đất, căn hộ chính chủ, pháp lý minh bạch trên toàn quốc
          </p>

          {/* Floating Search Bar */}
          <div className="pt-2">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* 2. BẤT ĐỘNG SẢN THEO ĐỊA ĐIỂM (BATDONGSAN VISUAL CITIES GRID) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-6 bg-[#E03C31] rounded-sm" />
              <h2 className="text-xl sm:text-2xl font-black text-[#2C2C2C] tracking-tight">
                Bất động sản theo địa điểm
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">Khám phá nhà đất tại các tỉnh thành phố sôi động nhất</p>
          </div>
        </div>

        {/* Asymmetrical Grid matching Batdongsan.com.vn */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: TP. Hồ Chí Minh (Prominent) */}
          <Link
            href="/bat-dong-san?city=H%E1%BB%93%20Ch%C3%AD%20Minh"
            className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
              alt="Hồ Chí Minh"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h4 className="font-bold text-lg sm:text-xl tracking-tight">TP. Hồ Chí Minh</h4>
              <p className="text-xs text-gray-200 mt-0.5">48.250+ tin đăng</p>
            </div>
          </Link>

          {/* Card 2: Hà Nội (Prominent) */}
          <Link
            href="/bat-dong-san?city=H%C3%A0%20N%E1%BB%99i"
            className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80"
              alt="Hà Nội"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h4 className="font-bold text-lg sm:text-xl tracking-tight">Hà Nội</h4>
              <p className="text-xs text-gray-200 mt-0.5">39.800+ tin đăng</p>
            </div>
          </Link>

          {/* Card 3: Đà Nẵng */}
          <Link
            href="/bat-dong-san?city=%C4%90%C3%A0%20N%E1%BA%B5ng"
            className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
              alt="Đà Nẵng"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h4 className="font-bold text-lg sm:text-xl tracking-tight">Đà Nẵng</h4>
              <p className="text-xs text-gray-200 mt-0.5">12.800+ tin đăng</p>
            </div>
          </Link>

          {/* Card 4: Bình Dương */}
          <Link
            href="/bat-dong-san?city=B%C3%ACnh%20D%C6%B0%C6%A1ng"
            className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
          >
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
              alt="Bình Dương"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h4 className="font-bold text-lg sm:text-xl tracking-tight">Bình Dương</h4>
              <p className="text-xs text-gray-200 mt-0.5">14.300+ tin đăng</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. BẤT ĐỘNG SẢN DÀNH CHO BẠN (FEATURED LISTINGS) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-6 bg-[#E03C31] rounded-sm" />
              <h2 className="text-xl sm:text-2xl font-black text-[#2C2C2C] tracking-tight">
                Bất động sản dành cho bạn
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">Tin đăng mua bán nhà đất đã được thẩm định tính xác thực</p>
          </div>

          <Link
            href="/bat-dong-san?isForRent=false"
            className="flex items-center space-x-1 text-xs sm:text-sm font-bold text-[#E03C31] hover:text-[#B8281F] transition-colors"
          >
            <span>Xem tất cả tin bán</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {featuredBuy.items.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* 4. DỰ ÁN BẤT ĐỘNG SẢN NỔI BẬT */}
      <section className="bg-white border-y border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-6 bg-emerald-600 rounded-sm" />
                <h2 className="text-xl sm:text-2xl font-black text-[#2C2C2C] tracking-tight">
                  Dự án bất động sản nổi bật
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-1">Thông tin quy hoạch, bảng giá và tiến độ xây dựng mới nhất</p>
            </div>
            <Link
              href="/du-an"
              className="text-xs font-bold text-[#E03C31] hover:underline flex items-center space-x-1"
            >
              <span>Xem tất cả dự án</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {projects.map((proj) => (
              <Link
                key={proj.id}
                href={`/du-an/${proj.slug}`}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <img
                    src={proj.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"}
                    alt={proj.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    {proj.status || "Đang mở bán"}
                  </span>
                </div>
                <div className="p-3.5 space-y-1.5">
                  <h4 className="font-bold text-[#2C2C2C] text-sm group-hover:text-[#E03C31] transition-colors truncate">
                    {proj.name}
                  </h4>
                  <p className="text-xs text-[#E03C31] font-extrabold">{proj.priceRange}</p>
                  <p className="text-xs text-gray-500 truncate flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span>{proj.location}</span>
                  </p>
                  <p className="text-[11px] text-gray-400 pt-1 border-t border-gray-100">CĐT: {proj.developer}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CHO THUÊ NHÀ ĐẤT GIÁ TỐT */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-6 bg-blue-600 rounded-sm" />
              <h2 className="text-xl sm:text-2xl font-black text-[#2C2C2C] tracking-tight">
                Nhà đất cho thuê giá tốt
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">Căn hộ chung cư, nhà riêng, shophouse và mặt bằng kinh doanh</p>
          </div>

          <Link
            href="/bat-dong-san?isForRent=true"
            className="flex items-center space-x-1 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>Xem tất cả tin thuê</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {featuredRent.items.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* 6. DOANH NGHIỆP & CHỦ ĐẦU TƯ TIÊU BIỂU (BATDONGSAN PARTNERS STRIP) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-6 bg-amber-500 rounded-sm" />
              <h2 className="text-xl sm:text-2xl font-black text-[#2C2C2C] tracking-tight">
                Chủ đầu tư & Doanh nghiệp tiêu biểu
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">Các tập đoàn phát triển bất động sản uy tín hàng đầu Việt Nam</p>
          </div>
          <Link
            href="/doanh-nghiep"
            className="text-xs font-bold text-[#E03C31] hover:underline flex items-center space-x-1"
          >
            <span>Xem danh bạ</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {ENTERPRISES.map((ent) => (
            <Link
              key={ent.slug}
              href={`/doanh-nghiep/${ent.slug}`}
              className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:shadow-md hover:border-[#E03C31] transition-all group"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-50 p-1 border border-gray-100 mb-2.5">
                <img
                  src={ent.logo}
                  alt={ent.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform"
                />
              </div>
              <h4 className="font-bold text-xs text-[#2C2C2C] group-hover:text-[#E03C31] transition-colors truncate w-full">
                {ent.brand}
              </h4>
              <span className="text-[10px] text-gray-400 mt-1">{ent.activeProjectsCount} dự án</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. TIỆN ÍCH & TÍNH LÃI VAY MUA NHÀ */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-6 bg-[#E03C31] rounded-sm" />
              <h2 className="text-xl sm:text-2xl font-black text-[#2C2C2C] tracking-tight">
                Tiện ích & Hỗ trợ người mua nhà
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">Dự tính chi phí vay ngân hàng và xem phong thủy hướng nhà trước khi mua</p>
          </div>

          <div className="flex items-center space-x-3 text-xs font-bold">
            <Link
              href="/tien-ich/tinh-lai-vay"
              className="text-[#E03C31] hover:underline flex items-center space-x-1"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Bảng tính lãi vay</span>
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/tien-ich/phong-thuy"
              className="text-amber-700 hover:underline flex items-center space-x-1"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Phong thủy Bát Trạch</span>
            </Link>
          </div>
        </div>

        <LoanCalculator />
      </section>

      {/* 8. TIN TỨC THỊ TRƯỜNG & PHÂN TÍCH CHUYÊN GIA */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-6 bg-[#E03C31] rounded-sm" />
              <h2 className="text-xl sm:text-2xl font-black text-[#2C2C2C] tracking-tight">
                Tin tức & Góc nhìn chuyên gia
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">Cập nhật chính sách đất đai, quy hoạch và biến động thị trường</p>
          </div>
          <Link
            href="/tin-tuc"
            className="text-xs font-bold text-[#E03C31] hover:underline flex items-center space-x-1"
          >
            <span>Xem thêm tin tức</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_POSTS.map((post) => (
            <Link
              key={post.id}
              href={`/tin-tuc/${post.slug}`}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img
                  src={post.thumbnail || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {post.category}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-[#2C2C2C] text-sm group-hover:text-[#E03C31] transition-colors line-clamp-2 leading-snug mb-2">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-400 mt-3">
                  {formatDateVi(post.createdAt)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 9. TẠI SAO CHỌN BATDONGSAN.COM.VN */}
      <section className="bg-gradient-to-r from-gray-900 via-slate-900 to-red-950 text-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Tại sao chọn Batdongsan.com.vn?</h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-2">Đồng hành cùng hàng triệu người Việt trên hành trình tìm kiếm và xây dựng tổ ấm</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 space-y-3">
              <div className="w-12 h-12 bg-red-500/20 text-[#E03C31] rounded-xl flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base">Pháp lý minh bạch</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                100% tin đăng được kiểm duyệt số hồng, quyền sở hữu và vị trí quy hoạch chính xác trước khi xuất bản.
              </p>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 space-y-3">
              <div className="w-12 h-12 bg-red-500/20 text-[#E03C31] rounded-xl flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base">Biểu đồ giá thị trường</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Dữ liệu lớn cập nhật biến động giá từng khu vực và dự án trong 5 năm, giúp bạn định giá chuẩn xác.
              </p>
            </div>

            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 space-y-3">
              <div className="w-12 h-12 bg-red-500/20 text-[#E03C31] rounded-xl flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base">Môi giới chuyên nghiệp</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Kết nối trực tiếp mạng lưới hơn 50.000+ môi giới được cấp phép hành nghề, tận tâm hỗ trợ giao dịch 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

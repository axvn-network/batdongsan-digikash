import { Metadata } from "next";
import Link from "next/link";
import { Building2, ShieldCheck, MapPin, Phone } from "lucide-react";
import { ENTERPRISES } from "@/lib/data/enterprises";

export const metadata: Metadata = {
  title: "Danh Bạ Doanh Nghiệp & Chủ Đầu Tư BĐS Uy Tín 2026 | Batdongsan.com.vn",
  description: "Danh bạ các chủ đầu tư bất động sản, tập đoàn phát triển dự án và sàn giao dịch uy tín hàng đầu Việt Nam: Vinhomes, Masterise Homes, Nam Long, Khang Điền...",
};

export default function EnterprisesDirectoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb & Header */}
      <div>
        <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
          <Link href="/" className="hover:text-gray-900">Trang chủ</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Doanh nghiệp BĐS</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Danh bạ Chủ đầu tư & Tập đoàn BĐS hàng đầu
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Hồ sơ năng lực, pháp lý dự án và các sản phẩm đang mở bán của những tập đoàn địa ốc hàng đầu Việt Nam
            </p>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ENTERPRISES.map((ent) => (
          <div
            key={ent.slug}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={ent.logo}
                    alt={ent.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-gray-200"
                  />
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-bold text-gray-900 text-base">{ent.name}</h3>
                      <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    </div>
                    <span className="text-xs text-[#E03C31] font-semibold">{ent.brand}</span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  Năm TL: {ent.establishedYear}
                </span>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {ent.description}
              </p>

              <div className="space-y-1.5 text-xs text-gray-500 pt-2 border-t border-gray-100">
                <p className="flex items-center space-x-2 truncate">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{ent.headquarters}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span>{ent.phone}</span>
                </p>
              </div>

              {/* Highlight Projects */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-gray-700">Dự án tiêu biểu:</span>
                <div className="flex flex-wrap gap-1.5">
                  {ent.highlightProjects.map((p, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-gray-50 text-gray-700 text-[10px] border border-gray-200 font-medium"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">
                <strong>{ent.activeProjectsCount}</strong> dự án trên sàn
              </span>
              <Link
                href={`/doanh-nghiep/${ent.slug}`}
                className="px-4 py-2 bg-gray-100 hover:bg-[#E03C31] hover:text-white text-gray-800 rounded-xl font-bold transition-all"
              >
                Xem chi tiết dự án →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

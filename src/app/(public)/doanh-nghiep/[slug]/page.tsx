import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ENTERPRISES } from "@/lib/data/enterprises";
import { PropertyRepository } from "@/lib/repositories/property.repo";
import { PropertyCard } from "@/components/property/property-card";
import { Building2, ShieldCheck, MapPin, Phone, Globe, ExternalLink, Award, ArrowLeft } from "lucide-react";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return ENTERPRISES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const enterprise = ENTERPRISES.find((e) => e.slug === params.slug);
  if (!enterprise) return { title: "Doanh nghiệp BĐS | Batdongsan.com.vn" };
  return {
    title: `${enterprise.name} — Thông Tin Chủ Đầu Tư & Dự Án 2026 | Batdongsan.com.vn`,
    description: enterprise.description,
  };
}

export default async function EnterpriseDetailPage({ params }: PageProps) {
  const enterprise = ENTERPRISES.find((e) => e.slug === params.slug);
  if (!enterprise) notFound();

  // Find properties belonging to this brand
  const result = await PropertyRepository.search({
    keyword: enterprise.brand,
    limit: 6,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 flex items-center space-x-2">
        <Link href="/" className="hover:text-[#E03C31]">Trang chủ</Link>
        <span>/</span>
        <Link href="/doanh-nghiep" className="hover:text-[#E03C31]">Doanh nghiệp BĐS</Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">{enterprise.name}</span>
      </nav>

      {/* Profile Header */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={enterprise.logo}
              alt={enterprise.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-gray-200 flex-shrink-0"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  {enterprise.name}
                </h1>
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              </div>
              <p className="text-xs text-[#E03C31] font-bold mt-0.5">Thương hiệu: {enterprise.brand}</p>
              <p className="text-xs text-gray-500 mt-1">Năm thành lập: <strong>{enterprise.establishedYear}</strong></p>
            </div>
          </div>

          <a
            href={enterprise.website}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold flex items-center space-x-1.5 self-start sm:self-auto transition-colors"
          >
            <span>Trang web chính thức</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
          {enterprise.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600 bg-gray-50/80 p-4 rounded-xl border border-gray-100">
          <p className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>Trụ sở chính: {enterprise.headquarters}</span>
          </p>
          <p className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>Hotline hỗ trợ: {enterprise.phone}</span>
          </p>
        </div>
      </div>

      {/* Active Properties under this developer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">
            Sản phẩm đang rao bán & cho thuê thuộc {enterprise.brand} ({result.items.length})
          </h2>
          <Link
            href={`/bat-dong-san?keyword=${encodeURIComponent(enterprise.brand)}`}
            className="text-xs font-bold text-[#E03C31] hover:underline"
          >
            Xem tất cả tin →
          </Link>
        </div>

        {result.items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.items.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="p-8 bg-white border border-gray-200 rounded-2xl text-center text-xs text-gray-500">
            Hiện tại các tin đăng đang được cập nhật thêm.
          </div>
        )}
      </div>
    </div>
  );
}

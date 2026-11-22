import { notFound } from "next/navigation";
import Link from "next/link";
import { LocationRepository } from "@/lib/repositories/location.repo";
import { PropertyRepository } from "@/lib/repositories/property.repo";
import { PropertyCard } from "@/components/property/property-card";
import { MapPin, Building, ShieldCheck, ChevronRight } from "lucide-react";

export async function generateStaticParams() {
  const projects = await LocationRepository.getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const projects = await LocationRepository.getProjects();
  const proj = projects.find((p) => p.slug === params.slug);
  if (!proj) notFound();

  // Related properties in this city
  const city = proj.location.includes("Hồ Chí Minh") ? "Hồ Chí Minh" : "Hà Nội";
  const properties = await PropertyRepository.search({ city, limit: 3 });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-gray-900">Trang chủ</Link>
        <span>/</span>
        <Link href="/du-an" className="hover:text-gray-900">Dự án</Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">{proj.name}</span>
      </nav>

      {/* Project Banner Card */}
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="relative h-72 sm:h-96 bg-gray-100">
          <img
            src={proj.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"}
            alt={proj.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {proj.status || "Đang mở bán"}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black">{proj.name}</h1>
            <p className="text-sm text-gray-200 flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-red-400" />
              <span>{proj.location}</span>
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50/50 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-400 block">Chủ đầu tư</span>
            <span className="text-sm font-bold text-gray-900">{proj.developer}</span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block">Khoảng giá bán</span>
            <span className="text-sm font-bold text-[#E03C31]">{proj.priceRange}</span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block">Quy mô</span>
            <span className="text-sm font-bold text-gray-900">Đại đô thị sinh thái</span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block">Pháp lý</span>
            <span className="text-sm font-bold text-gray-900">Sở hữu lâu dài (Sổ hồng)</span>
          </div>
        </div>
      </div>

      {/* Properties in this project */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">
          Bất động sản đang giao dịch tại khu vực này
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {properties.items.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

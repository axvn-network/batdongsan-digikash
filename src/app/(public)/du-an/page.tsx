import Link from "next/link";
import { LocationRepository } from "@/lib/repositories/location.repo";
import { MapPin, Building2, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Dự án bất động sản nổi bật toàn quốc",
  description: "Tổng hợp thông tin các dự án căn hộ chung cư, khu đô thị, biệt thự nghỉ dưỡng từ các chủ đầu tư uy tín Vingroup, Masterise Homes, Sun Group...",
};

export default async function ProjectsPage() {
  const projects = await LocationRepository.getProjects();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div>
        <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
          <Link href="/" className="hover:text-gray-900">Trang chủ</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Dự án bất động sản</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Dự án bất động sản nổi bật
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Cơ sở dữ liệu thông tin quy hoạch, tiến độ, mặt bằng và bảng giá các dự án lớn
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <Link
            key={proj.id}
            href={`/du-an/${proj.slug}`}
            className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all flex flex-col"
          >
            <div className="relative h-52 bg-gray-100 overflow-hidden">
              <img
                src={proj.image || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"}
                alt={proj.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                {proj.status || "Đang mở bán"}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-gray-900 text-base group-hover:text-[#E03C31] transition-colors">
                  {proj.name}
                </h3>
                <p className="text-sm font-extrabold text-[#E03C31] mt-1">{proj.priceRange}</p>
                <p className="text-xs text-gray-500 flex items-center space-x-1 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span>{proj.location}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>Chủ đầu tư: <strong>{proj.developer}</strong></span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

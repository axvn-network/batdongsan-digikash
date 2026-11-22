import Link from "next/link";
import { MOCK_AGENT_PROFILES } from "@/lib/repositories/mock-data";
import { ShieldCheck, Star, Phone, MessageSquare, MapPin, Building, Award } from "lucide-react";

export const metadata = {
  title: "Danh bạ Môi giới Bất động sản đã xác thực",
  description: "Kết nối mạng lưới môi giới bất động sản chuyên nghiệp có chứng chỉ hành nghề, được xác thực danh tính và đánh giá thực tế từ khách hàng.",
};

export default function AgentsDirectoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
          <Link href="/" className="hover:text-gray-900">Trang chủ</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Danh bạ Môi giới</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Môi giới Bất động sản Chuyên nghiệp
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              100% môi giới được xác thực Chứng chỉ hành nghề (CCHN), CCCD và đánh giá minh bạch từ người mua
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-800 text-xs px-3.5 py-2 rounded-xl font-bold border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Mạng lưới Verified Agent</span>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_AGENT_PROFILES.map((agent) => (
          <div
            key={agent.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              {/* Avatar + Verified badge */}
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full shadow" title="Đã xác thực chứng chỉ">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="flex-1 overflow-hidden">
                  <Link href={`/moi-gioi/${agent.id}`}>
                    <h3 className="font-bold text-gray-900 text-base hover:text-[#E03C31] transition-colors truncate">
                      {agent.name}
                    </h3>
                  </Link>
                  <div className="flex items-center space-x-1 mt-1 text-xs text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-gray-800">{agent.rating}</span>
                    <span className="text-gray-400">({agent.reviewCount} đánh giá)</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-medium mt-1 truncate">
                    {agent.agentLicense}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                {agent.bio}
              </p>

              {/* Operating areas */}
              <div className="space-y-1.5 pt-2 border-t border-gray-100">
                <span className="text-[11px] text-gray-400 font-semibold block">Khu vực hoạt động chính:</span>
                <div className="flex flex-wrap gap-1.5">
                  {agent.operatingAreas.map((area, i) => (
                    <span key={i} className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-medium">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom stats & CTA */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Kinh nghiệm: <strong>{agent.experienceYears} năm</strong></span>
                <span className="text-gray-500">Đang bán: <strong className="text-[#E03C31]">{agent.activeListingsCount} BĐS</strong></span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${agent.phone}`}
                  className="py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Gọi điện</span>
                </a>
                <Link
                  href={`/moi-gioi/${agent.id}`}
                  className="py-2.5 bg-[#E03C31] hover:bg-[#B8281F] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <span>Xem hồ sơ</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

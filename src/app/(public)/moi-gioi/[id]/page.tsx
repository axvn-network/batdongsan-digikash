import { notFound } from "next/navigation";
import Link from "next/link";
import { MOCK_AGENT_PROFILES, MOCK_REVIEWS, MOCK_PROPERTIES } from "@/lib/repositories/mock-data";
import { PropertyCard } from "@/components/property/property-card";
import { ShieldCheck, Star, Phone, MessageSquare, Award, CheckCircle2, UserCheck, Calendar } from "lucide-react";
import { formatDateVi } from "@/lib/utils";

export async function generateStaticParams() {
  return MOCK_AGENT_PROFILES.map((a) => ({
    id: a.id,
  }));
}

export default function AgentProfilePage({ params }: { params: { id: string } }) {
  const agent = MOCK_AGENT_PROFILES.find((a) => a.id === params.id) || MOCK_AGENT_PROFILES[0];
  if (!agent) notFound();

  const reviews = MOCK_REVIEWS.filter((r) => r.agentId === agent.id);
  const agentProperties = MOCK_PROPERTIES.filter((p) => p.userId === agent.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-gray-900">Trang chủ</Link>
        <span>/</span>
        <Link href="/moi-gioi" className="hover:text-gray-900">Môi giới</Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">{agent.name}</span>
      </nav>

      {/* Profile Header Banner */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-emerald-500 shadow-md"
            />
            <span className="absolute bottom-0 right-0 bg-emerald-600 text-white p-1.5 rounded-full shadow-lg">
              <ShieldCheck className="w-5 h-5" />
            </span>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="bg-emerald-50 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase inline-flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Môi giới chuyên nghiệp DigiKash</span>
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
                  {agent.name}
                </h1>
                <p className="text-xs text-gray-500 font-medium">Số chứng chỉ CCHN: <strong>{agent.agentLicense}</strong></p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center space-x-3">
                <a
                  href={`tel:${agent.phone}`}
                  className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>{agent.phone}</span>
                </a>
                <button
                  type="button"
                  className="py-2.5 px-5 bg-[#E03C31] hover:bg-[#B8281F] text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Yêu cầu tư vấn</span>
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8 pt-3 border-t border-gray-100 text-xs">
              <div className="flex items-center space-x-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-gray-900 text-sm font-black">{agent.rating}</span>
                <span className="text-gray-400">({agent.reviewCount || reviews.length} đánh giá)</span>
              </div>
              <div className="text-gray-600">
                Khu vực: <strong className="text-gray-900">{agent.operatingAreas?.join(", ") || "Toàn quốc"}</strong>
              </div>
              <div className="text-gray-600">
                Thâm niên: <strong className="text-gray-900">{agent.experienceYears} năm</strong>
              </div>
              <div className="text-gray-600">
                Tin đang đăng: <strong className="text-emerald-700 font-bold">{agent.activeListingsCount || agentProperties.length} căn</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Listings by this agent */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">
              Bất động sản đang rao bán & cho thuê ({agentProperties.length})
            </h2>
          </div>

          {agentProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {agentProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-500 text-xs">
              Hiện tại môi giới chưa có tin đăng công khai nào.
            </div>
          )}
        </div>

        {/* Right: Reviews & Trust metrics */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-gray-900 text-sm flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Tiêu chuẩn xác thực DigiKash</span>
            </h3>

            <ul className="space-y-2.5 text-gray-600">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Đã xác minh định danh CCCD gắn chip</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Chứng chỉ hành nghề môi giới BĐS do Sở Xây Dựng cấp</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Cam kết không đăng tin ảo, không thu phí trái quy định</span>
              </li>
            </ul>
          </div>

          {/* Client Reviews */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-gray-900 text-sm">
              Đánh giá từ khách hàng ({reviews.length})
            </h3>

            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="border-b border-gray-100 pb-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-gray-900">{r.authorName}</strong>
                    <div className="flex text-amber-400">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400 text-[10px]">{r.transactionType} • {formatDateVi(r.createdAt)}</p>
                  <p className="text-gray-600 leading-relaxed italic bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                    "{r.comment}"
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-colors">
                Gửi đánh giá cho môi giới
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, FileCheck, Map, ShieldAlert, FileText, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { WIKI_ARTICLES } from "@/lib/data/wiki";

export const metadata: Metadata = {
  title: "Wiki BĐS — Cẩm Nang & Căn Cứ Pháp Lý Bất Động Sản 2026 | Batdongsan.com.vn",
  description: "Bách khoa toàn thư kiến thức bất động sản: quy trình mua bán, thủ tục sang tên sổ đỏ, tra cứu quy hoạch, mẫu hợp đồng đặt cọc và tư vấn pháp lý.",
};

export default function WikiIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-semibold text-emerald-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kho tri thức BĐS độc quyền</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Wiki Bất Động Sản — Cẩm Nang Pháp Lý & Giao Dịch
          </h1>
          <p className="text-sm text-gray-300 leading-relaxed">
            Hệ thống hóa toàn bộ văn bản luật, quy trình công chứng, biểu phí thuế và kinh nghiệm thực chiến giúp bạn giao dịch bất động sản an toàn, không rủi ro.
          </p>
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WIKI_ARTICLES.map((article) => {
          const Icon = article.icon;
          return (
            <Link
              key={article.slug}
              href={`/wiki/${article.slug}`}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-[#E03C31] transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-red-50 text-[#E03C31] rounded-full text-[11px] font-bold">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{article.readTime}</span>
                </div>

                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-700 group-hover:bg-[#E03C31] group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-bold text-gray-900 text-base group-hover:text-[#E03C31] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-400 group-hover:text-[#E03C31] transition-colors">
                <span>Cập nhật: {article.date}</span>
                <span className="flex items-center space-x-1">
                  <span>Đọc cẩm nang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

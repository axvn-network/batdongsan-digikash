import Link from "next/link";
import { MOCK_POSTS } from "@/lib/repositories/mock-data";
import { formatDateVi } from "@/lib/utils";

export const metadata = {
  title: "Tin tức & Báo cáo thị trường bất động sản",
  description: "Cập nhật tin tức thị trường nhà đất, phân tích giá cả, cẩm nang đầu tư và quy hoạch đô thị mới nhất",
};

export default function BlogListPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-gray-900">Trang chủ</Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">Tin tức & Wiki BĐS</span>
      </nav>

      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Tin tức thị trường bất động sản
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Dữ liệu nghiên cứu thị trường, cẩm nang mua bán và biến động lãi suất ngân hàng
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MOCK_POSTS.map((post) => (
          <Link
            key={post.id}
            href={`/tin-tuc/${post.slug}`}
            className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all flex flex-col"
          >
            <div className="relative h-48 bg-gray-100 overflow-hidden">
              <img
                src={post.thumbnail || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-[#E03C31] text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow">
                {post.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-gray-900 text-base group-hover:text-[#E03C31] transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-3 mt-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 text-xs text-gray-400">
                {formatDateVi(post.createdAt)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

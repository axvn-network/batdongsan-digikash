import { notFound } from "next/navigation";
import Link from "next/link";
import { MOCK_POSTS } from "@/lib/repositories/mock-data";
import { formatDateVi } from "@/lib/utils";

export async function generateStaticParams() {
  return MOCK_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = MOCK_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-gray-900">Trang chủ</Link>
        <span>/</span>
        <Link href="/tin-tuc" className="hover:text-gray-900">Tin tức</Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold truncate max-w-sm">{post.title}</span>
      </nav>

      <span className="inline-block bg-red-50 text-[#E03C31] font-bold text-xs px-3 py-1 rounded-full">
        {post.category}
      </span>

      <h1 className="text-2xl sm:text-4xl font-black text-gray-900 leading-tight">
        {post.title}
      </h1>

      <div className="flex items-center space-x-3 text-xs text-gray-400 border-b border-gray-200 pb-4">
        <span>Tác giả: <strong>Ban biên tập Batdongsan</strong></span>
        <span>•</span>
        <span>{formatDateVi(post.createdAt)}</span>
      </div>

      <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-gray-100">
        <img
          src={post.thumbnail || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-base font-semibold text-gray-700 leading-relaxed italic bg-gray-50 p-4 rounded-xl border-l-4 border-[#E03C31]">
        {post.excerpt}
      </p>

      <div className="prose max-w-none text-sm text-gray-800 leading-relaxed space-y-4">
        <p>{post.content}</p>
        <p>
          Thị trường bất động sản đang bước vào chu kỳ phát triển mới với tính minh bạch cao, chú trọng vào năng lực thực tế của chủ đầu tư và khả năng chi trả của người mua nhà. Sự đồng bộ giữa hạ tầng giao thông và các chính sách tháo gỡ điểm nghẽn pháp lý sẽ là động lực tăng trưởng dài hạn cho toàn bộ nền kinh tế.
        </p>
      </div>
    </article>
  );
}

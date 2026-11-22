import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { MOCK_POSTS } from "@/lib/repositories/mock-data";
import { formatDateVi } from "@/lib/utils";
import { CMSNav } from "../cms-nav";
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default function AdminBaiVietPage() {
  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "CMS Nội dung", href: "/admin/noi-dung/bai-viet" }, { label: "Tin tức" }]} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Quản trị nội dung & Tin tức (CMS)
          </h1>
          <p className="text-xs text-gray-500 mt-1">Xuất bản bài viết, báo cáo thị trường và cẩm nang phong thủy</p>
        </div>
        <button className="flex items-center space-x-1.5 py-2 px-3.5 bg-[#E03C31] text-white rounded-lg text-xs font-bold hover:bg-[#B8281F] w-fit shadow-sm">
          <PlusCircle className="w-4 h-4" />
          <span>Viết bài mới</span>
        </button>
      </div>

      <div className="space-y-0">
        <CMSNav />
        <div className="bg-white border border-gray-200 border-t-0 rounded-b-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Tiêu đề bài viết</th>
                <th className="py-3 px-4">Chuyên mục</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4">Ngày xuất bản</th>
                <th className="py-3 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_POSTS.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-bold text-gray-900 max-w-md truncate">
                    {post.title}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full font-semibold text-[10px]">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Đã xuất bản
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-400">
                    {formatDateVi(post.createdAt)}
                  </td>
                  <td className="py-3.5 px-4 text-center space-x-2">
                    <Link
                      href={`/tin-tuc/${post.slug}`}
                      target="_blank"
                      className="p-1.5 text-gray-600 hover:text-gray-900 rounded inline-block"
                      title="Xem bài viết"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button className="p-1.5 text-gray-600 hover:text-blue-600 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-600 hover:text-red-600 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

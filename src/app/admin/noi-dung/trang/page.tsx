import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { CMSNav } from "../cms-nav";
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default function AdminTrangTinhPage() {
  const pages = [
    { id: "p-1", title: "Giới thiệu về Sàn Batdongsan (DigiKash Vietnam)", slug: "gioi-thieu", status: "Đã xuất bản", updatedAt: "15/01/2026" },
    { id: "p-2", title: "Điều khoản thỏa thuận dịch vụ người dùng", slug: "dieu-khoan", status: "Đã xuất bản", updatedAt: "01/01/2026" },
    { id: "p-3", title: "Chính sách bảo mật thông tin & Quyền riêng tư (GDPR/NĐ 13)", slug: "chinh-sach-bao-mat", status: "Đã xuất bản", updatedAt: "05/01/2026" },
    { id: "p-4", title: "Quy chế hoạt động sàn giao dịch thương mại điện tử BĐS", slug: "quy-che-hoat-dong", status: "Đã xuất bản", updatedAt: "10/01/2026" },
    { id: "p-5", title: "Quy trình giải quyết tranh chấp & Khiếu nại giao dịch", slug: "giai-quyet-khieu-nai", status: "Đã xuất bản", updatedAt: "20/01/2026" },
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "CMS Nội dung", href: "/admin/noi-dung/bai-viet" }, { label: "Trang tĩnh" }]} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Quản trị trang tĩnh & Pháp lý (Pages)
          </h1>
          <p className="text-xs text-gray-500 mt-1">Cấu hình nội dung các trang Giới thiệu, Điều khoản, Quy chế và Chính sách bảo mật</p>
        </div>
        <button className="flex items-center space-x-1.5 py-2 px-3.5 bg-[#E03C31] text-white rounded-lg text-xs font-bold hover:bg-[#B8281F] w-fit shadow-sm">
          <PlusCircle className="w-4 h-4" />
          <span>Thêm trang mới</span>
        </button>
      </div>

      <div className="space-y-0">
        <CMSNav />
        <div className="bg-white border border-gray-200 border-t-0 rounded-b-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Tên trang</th>
                <th className="py-3 px-4">Slug URL</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4">Cập nhật lần cuối</th>
                <th className="py-3 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pages.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-bold text-gray-900">{p.title}</td>
                  <td className="py-3.5 px-4 text-gray-500 font-mono">/{p.slug}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-400">{p.updatedAt}</td>
                  <td className="py-3.5 px-4 text-center space-x-2">
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

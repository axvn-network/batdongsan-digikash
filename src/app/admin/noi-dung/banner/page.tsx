import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { CMSNav } from "../cms-nav";
import { PlusCircle, Edit, Trash2, ExternalLink } from "lucide-react";

export const revalidate = 0;

export default function AdminBannerPage() {
  const banners = [
    {
      id: "b-1",
      title: "Banner Khai Xuân Vinhomes Grand Park - Chiết khấu 8%",
      position: "Trang chủ - Top Header",
      imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      link: "https://batdongsan.com.vn/du-an/vinhomes-grand-park",
      clicks: 1420,
      status: "Đang hiển thị",
      duration: "01/01/2026 - 28/02/2026",
    },
    {
      id: "b-2",
      title: "Masteri Centre Point - Chuẩn sống thượng lưu Quận 9",
      position: "Sidebar Danh mục",
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
      link: "https://batdongsan.com.vn/du-an/masteri-centre-point",
      clicks: 865,
      status: "Đang hiển thị",
      duration: "15/01/2026 - 15/03/2026",
    },
    {
      id: "b-3",
      title: "Gói Môi Giới Chuyên Nghiệp DigiKash VIP - Giảm 30%",
      position: "Popup Trang chủ",
      imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
      link: "/goi-dich-vu",
      clicks: 432,
      status: "Tạm dừng",
      duration: "10/01/2026 - 10/02/2026",
    },
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "CMS Nội dung", href: "/admin/noi-dung/bai-viet" }, { label: "Banner" }]} />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Quản trị Banner quảng cáo (Ads & Banners)
          </h1>
          <p className="text-xs text-gray-500 mt-1">Cấu hình chiến dịch quảng cáo, vị trí hiển thị, thời hạn và số lượt nhấp chuột</p>
        </div>
        <button className="flex items-center space-x-1.5 py-2 px-3.5 bg-[#E03C31] text-white rounded-lg text-xs font-bold hover:bg-[#B8281F] w-fit shadow-sm">
          <PlusCircle className="w-4 h-4" />
          <span>Tạo banner mới</span>
        </button>
      </div>

      <div className="space-y-0">
        <CMSNav />
        <div className="bg-white border border-gray-200 border-t-0 rounded-b-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Banner</th>
                <th className="py-3 px-4">Vị trí hiển thị</th>
                <th className="py-3 px-4">Thời gian chạy</th>
                <th className="py-3 px-4">Lượt click</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {banners.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={b.imageUrl} alt="" className="w-14 h-9 object-cover rounded-lg border border-gray-200" />
                      <div className="max-w-xs truncate">
                        <p className="font-bold text-gray-900 truncate">{b.title}</p>
                        <a href={b.link} target="_blank" className="text-[11px] text-blue-600 hover:underline flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" /> Link đích
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-700">{b.position}</td>
                  <td className="py-3.5 px-4 text-gray-500">{b.duration}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">{b.clicks.toLocaleString()} clicks</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      b.status === "Đang hiển thị"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {b.status}
                    </span>
                  </td>
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

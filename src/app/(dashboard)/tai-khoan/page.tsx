import { getSession } from "@/lib/auth/session";
import { UserRepository } from "@/lib/repositories/user.repo";
import { User, Phone, Mail, Shield, Calendar } from "lucide-react";
import { formatDateVi } from "@/lib/utils";

export default async function UserProfilePage() {
  const session = await getSession();
  const user = session ? await UserRepository.findById(session.userId) : null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-900">Thông tin tài khoản</h2>
        <p className="text-xs text-gray-500 mt-1">Quản lý hồ sơ cá nhân và thông tin liên hệ hiển thị trên tin đăng</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"}
          alt={user?.name || "Avatar"}
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow"
        />

        <div className="flex-1 space-y-4 w-full text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 font-medium mb-1">Họ và tên</label>
              <div className="p-3 bg-gray-50 rounded-xl font-bold text-gray-900 border border-gray-200">
                {user?.name || "Chưa cập nhật"}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 font-medium mb-1">Email</label>
              <div className="p-3 bg-gray-50 rounded-xl font-bold text-gray-900 border border-gray-200">
                {user?.email || "Chưa cập nhật"}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 font-medium mb-1">Số điện thoại liên hệ</label>
              <div className="p-3 bg-gray-50 rounded-xl font-bold text-gray-900 border border-gray-200">
                {user?.phone || "0912345678"}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 font-medium mb-1">Vai trò tài khoản</label>
              <div className="p-3 bg-gray-50 rounded-xl font-bold text-[#E03C31] border border-gray-200 uppercase">
                {user?.role || "USER"}
              </div>
            </div>
          </div>

          <div className="pt-2 text-gray-400 text-[11px] flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Thành viên từ ngày {user?.createdAt ? formatDateVi(user.createdAt) : "01/01/2024"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

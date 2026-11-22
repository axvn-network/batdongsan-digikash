import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F1F5F9]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-800 text-sm">Hệ Thống Quản Trị Trung Tâm</span>
            <span className="text-[10px] bg-red-100 text-[#E03C31] font-bold px-2 py-0.5 rounded-full uppercase">
              DigiKash Vietnam
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span>Phiên bản v2.4 (Sản xuất)</span>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

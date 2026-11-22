import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { UserSidebar } from "@/components/layout/user-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      <SiteHeader />
      <div className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <UserSidebar />
          <main className="flex-1 w-full">{children}</main>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

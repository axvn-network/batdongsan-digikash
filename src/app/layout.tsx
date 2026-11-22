import type { Metadata } from "next";
import "@/styles/globals.css";
import { MobileBottomNavigation } from "@/components/layout/mobile-bottom-navigation";

export const metadata: Metadata = {
  title: {
    default: "Batdongsan.com.vn - Kênh thông tin số 1 về bất động sản",
    template: "%s | Batdongsan.com.vn",
  },
  description: "Trang web mua bán, cho thuê nhà đất, căn hộ chung cư, biệt thự, dự án bất động sản hàng đầu tại Việt Nam.",
  keywords: ["bất động sản", "mua bán nhà đất", "cho thuê nhà đất", "chung cư", "batdongsan.com.vn"],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://batdongsan.com.vn",
    siteName: "Batdongsan.com.vn",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans bg-[#F7F8F9] min-h-screen text-slate-800 pb-16 md:pb-0">
        {children}
        <MobileBottomNavigation />
      </body>
    </html>
  );
}

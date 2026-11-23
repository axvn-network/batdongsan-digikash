import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { MobileBottomNavigation } from "@/components/layout/mobile-bottom-navigation";
import { PwaInstallPrompt } from "@/components/pwa/pwa-install-prompt";

export const viewport: Viewport = {
  themeColor: "#E03C31",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Batdongsan DigiKash",
  },
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
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
        <PwaInstallPrompt />
      </body>
    </html>
  );
}

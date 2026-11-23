"use client";

import React, { useEffect, useState } from "react";
import { Download, Share2, X, PlusSquare } from "lucide-react";

export function PwaInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // 1. Đăng ký Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch((err) => {
          console.log("[PWA] Service Worker registration failed: ", err);
        });
      });
    }

    // 2. Kiểm tra nếu app đã được cài (chạy dưới chế độ standalone)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      return; // Không hiển thị nếu đã cài app
    }

    // 3. Phát hiện iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // 4. Lắng nghe sự kiện trước khi cài đặt trên Android/Chrome
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Hiển thị sau 3 giây để người dùng duyệt trang trước
      setTimeout(() => setShowPrompt(true), 3000);
    });

    // Đối với iOS, hiển thị banner hướng dẫn sau 4 giây nếu chưa đóng lần nào
    if (isIosDevice) {
      const dismissed = localStorage.getItem("pwa_ios_dismissed");
      if (!dismissed) {
        setTimeout(() => setShowPrompt(true), 4000);
      }
    }
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    if (isIOS) {
      localStorage.setItem("pwa_ios_dismissed", "true");
    }
  };

  if (!showPrompt) return null;

  return (
    <aside
      aria-label="Cài đặt ứng dụng"
      className="fixed bottom-20 left-4 right-4 md:bottom-6 md:left-auto md:right-6 z-50 max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_10px_35px_rgba(0,0,0,0.15)] border border-slate-200/90 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#E03C31] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-red-500/20 flex-shrink-0">
            BDS
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">
              Cài đặt Batdongsan App
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Trải nghiệm toàn màn hình mượt mà, không giật lag
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-slate-600 p-1 -mr-1 -mt-1"
          aria-label="Đóng"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100">
        {isIOS ? (
          <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <p className="flex items-center gap-2 font-medium text-slate-800">
              <Share2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
              1. Bấm nút <b>Chia sẻ</b> trên thanh Safari
            </p>
            <p className="flex items-center gap-2 font-medium text-slate-800">
              <PlusSquare className="w-4 h-4 text-slate-700 flex-shrink-0" />
              2. Chọn <b>Thêm vào MH chính</b> (Add to Home Screen)
            </p>
          </div>
        ) : (
          <button
            onClick={handleInstallClick}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#E03C31] hover:bg-[#c93228] text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            Cài đặt ngay vào máy (Miễn phí)
          </button>
        )}
      </div>
    </aside>
  );
}

export default PwaInstallPrompt;

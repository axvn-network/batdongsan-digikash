"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Đã xảy ra sự cố!</h2>
      <p className="text-sm text-gray-500 max-w-md mb-6">
        Hệ thống đang gặp trục trặc tạm thời khi tải trang. Vui lòng thử lại.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 bg-[#E03C31] text-white font-bold text-sm rounded-xl hover:bg-[#B8281F]"
      >
        Thử lại
      </button>
    </div>
  );
}

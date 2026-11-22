import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyVND(amount: number): string {
  if (amount === undefined || amount === null) return "0 ₫";
  return `${Math.round(amount).toLocaleString("vi-VN")} ₫`;
}

export function formatPrice(price: number, isForRent: boolean = false): string {
  if (!price || price <= 0) return "Thoả thuận";
  
  if (isForRent) {
    if (price >= 1_000_000_000) {
      const ty = (price / 1_000_000_000).toFixed(1).replace(".0", "");
      return `${ty} tỷ/tháng`;
    }
    if (price >= 1_000_000) {
      const tr = (price / 1_000_000).toFixed(1).replace(".0", "");
      return `${tr} triệu/tháng`;
    }
    return `${price.toLocaleString("vi-VN")} ₫/tháng`;
  }

  if (price >= 1_000_000_000) {
    const ty = (price / 1_000_000_000).toFixed(2).replace(".00", "").replace(/(\.[1-9])0$/, "$1");
    return `${ty} tỷ`;
  }
  if (price >= 1_000_000) {
    const tr = (price / 1_000_000).toFixed(0);
    return `${tr} triệu`;
  }
  return `${price.toLocaleString("vi-VN")} ₫`;
}

export function formatArea(area: number): string {
  if (!area) return "Chưa xác định";
  return `${area.toLocaleString("vi-VN")} m²`;
}

export function formatPricePerM2(price: number, area: number, isForRent: boolean = false): string {
  if (!price || !area || area <= 0 || isForRent) return "";
  const priceM2 = price / area;
  if (priceM2 >= 1_000_000) {
    const tr = (priceM2 / 1_000_000).toFixed(1).replace(".0", "");
    return `~${tr} tr/m²`;
  }
  return `~${Math.round(priceM2).toLocaleString("vi-VN")} ₫/m²`;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9 -]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatDateVi(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function timeAgo(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffHours = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60));
  if (diffHours < 1) return "Vừa đăng";
  if (diffHours < 24) return `${diffHours} giờ trước`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Hôm qua";
  if (diffDays < 30) return `${diffDays} ngày trước`;
  return formatDateVi(d);
}

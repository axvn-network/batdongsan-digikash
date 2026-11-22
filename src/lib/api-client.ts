/**
 * API Client chuẩn hoá cho cả Web SSR/Client và Mobile (Capacitor/Cordova)
 * Hỗ trợ tự động gắn Token, xử lý baseURL và chuẩn hoá lỗi
 */

const API_BASE_URL = (
  typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_BASE_URL
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : ''
).replace(/\/$/, '');

export interface ApiRequestOptions extends RequestInit {
  token?: string;
  params?: Record<string, string | number | boolean | undefined>;
}

export async function apiClient<T = any>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  let url = endpoint;
  
  // Nếu endpoint là relative path và có cấu hình base url hoặc đang chạy trong mobile runtime
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    if (!url.startsWith('/')) {
      url = `/${url}`;
    }
    if (API_BASE_URL) {
      url = `${API_BASE_URL}${url}`;
    }
  }

  // Gắn params query string nếu có
  if (options.params) {
    const urlObj = new URL(url, 'http://localhost');
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlObj.searchParams.append(key, String(value));
      }
    });
    url = url.startsWith('http') ? urlObj.toString() : `${urlObj.pathname}${urlObj.search}`;
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  // Tự động đính kèm bearer token từ localStorage hoặc option
  const authToken = options.token || (typeof window !== 'undefined' ? localStorage.getItem('token') || localStorage.getItem('access_token') : null);
  if (authToken && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const contentType = res.headers.get('content-type');
    let data: any;
    if (contentType && contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      const errorMessage = typeof data === 'object' && data !== null
        ? data.error || data.message || `Lỗi yêu cầu: ${res.status}`
        : `Lỗi kết nối: ${res.statusText || res.status}`;
      throw new Error(errorMessage);
    }

    return data as T;
  } catch (err: any) {
    console.error(`[API Client Error] ${url}:`, err);
    throw err;
  }
}

export default apiClient;

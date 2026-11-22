# HƯỚNG DẪN TRIỂN KHAI TOÀN DIỆN NỀN TẢNG BẤT ĐỘNG SẢN DIGIKASH
*(Next.js 14 App Router + Mobile Capacitor + OWASP Top 10 + Chi phí hạ tầng $0)*

---

## 1. Kiến trúc Đa nền tảng (Single Codebase)

Hệ thống được thiết kế theo mô hình **Một Codebase — Đa Nền Tảng**:

### 1.1 Web Production (SSR / ISR / Dynamic API)
- Chạy với `next.config.mjs` đầy đủ tính năng SSR, server-side caching, image optimization.
- Tự động tích hợp Neon Serverless PostgreSQL Connection Pooler.
- Deploy trên **Vercel Hobby Plan** ($0/tháng).

### 1.2 Mobile App (Android APK / AAB & iOS IPA)
- Đóng gói bằng **Capacitor 8.x** với cấu hình `capacitor.config.ts`.
- Bản build mobile dùng `next.config.mobile.mjs` (`output: 'export'`) sinh bundle tĩnh vào thư mục `out/`.
- Kết nối với Backend Server thông qua `src/lib/api-client.ts` (sử dụng biến môi trường `NEXT_PUBLIC_API_BASE_URL`).

---

## 2. CI/CD Tự Động Build APK & IPA ($0 Không Cần Mac)

Toàn bộ quy trình đóng gói Mobile được tự động hóa qua GitHub Actions:

### 2.1 Android APK (`.github/workflows/android-build.yml`)
- Tự động chạy khi push/PR code.
- Biên dịch mã nguồn Next.js tĩnh → Đồng bộ vào Capacitor Android (`android/`).
- Dùng Gradle JDK 17 sinh ra file `app-debug.apk` và upload lên GitHub Artifacts để tải trực tiếp về điện thoại cài đặt.

### 2.2 iOS IPA Unsigned (`.github/workflows/ios-build.yml`)
- Tận dụng GitHub Actions macOS runner miễn phí (`macos-latest`).
- Chạy `xcodebuild` chế độ `CODE_SIGNING_ALLOWED=NO` để đóng gói thành unsigned `.ipa`.
- **Cách cài lên iPhone cá nhân không cần tài khoản Apple Developer trả phí ($99/năm)**:
  1. Tải file `BatdongsanDigiKash-unsigned.ipa` từ Artifacts của GitHub Actions.
  2. Mở máy tính Windows, cài đặt phần mềm **Sideloadly** hoặc **AltStore**.
  3. Cắm iPhone vào máy tính qua cáp USB, kéo thả file `.ipa` vào Sideloadly, nhập Apple ID cá nhân miễn phí và nhấn **Start**.
  4. Trên iPhone vào: *Cài đặt > Cài đặt chung > Quản lý VPN & Thiết bị* > Nhấn Tin cậy ứng dụng.

---

## 3. Checklist Bảo Mật OWASP Top 10:2025

| Hạng mục OWASP | Giải pháp & File Triển khai |
| :--- | :--- |
| **A01: Broken Access Control** | Hệ thống RBAC 7 Roles & 52 Permissions, kiểm tra chặt chẽ ở tầng API server (`src/lib/auth/rbac.ts`). |
| **A02: Cryptographic Failures & PII** | Bộ lọc che giấu thông tin nhạy cảm `src/lib/security.ts` (`maskSensitiveData`), Argon2id/Bcrypt cho mật khẩu, JWT session server-side. |
| **A03: Injection & XSS** | Tích hợp thư viện `isomorphic-dompurify` làm sạch nội dung nhập tự do (`sanitizeHtml`). Prisma ORM loại bỏ hoàn toàn SQL Injection. |
| **A05: Security Misconfiguration** | Cấu hình bảo vệ nghiêm ngặt trong `next.config.mjs` & `vercel.json`: HSTS (max-age=2 năm), X-Frame-Options: DENY, X-Content-Type-Options: nosniff, gỡ bỏ `x-powered-by`. |
| **A07: Identification and Auth Failures** | Rate limiting, Session timeout, tự động kiểm tra token qua `src/lib/api-client.ts`. |

---

## 4. Mô Hình Hạ Tầng $0/Tháng (Zero Infrastructure Cost)

| Dịch vụ | Nhà cung cấp & Gói miễn phí | Mục đích sử dụng |
| :--- | :--- | :--- |
| **Web & API Hosting** | **Vercel Hobby** ($0) | Deploy Next.js SSR/ISR, Edge Middleware, SSL tự động. |
| **Cơ sở dữ liệu** | **Neon PostgreSQL** ($0) | 0.5 GB lưu trữ, Serverless auto-scaling. |
| **DB Keep-Alive** | **GitHub Actions Cron** ($0) | `.github/workflows/neon-keepalive.yml` ping mỗi 5 phút tới `/api/health` để DB không bị sleep. |
| **Lưu trữ hình ảnh** | **Cloudflare R2** ($0) | 10 GB lưu trữ miễn phí, **$0 phí truyền dữ liệu (Egress Free)**. |
| **Mobile CI/CD** | **GitHub Actions** ($0) | 2,000 phút/tháng build Android & iOS runner hoàn toàn miễn phí. |

---

## 5. Hướng Dẫn Chạy & Phát Triển Cục Bộ

```bash
# Cài đặt thư viện
pnpm install

# Khởi chạy server phát triển
pnpm dev

# Biên dịch bản Web Production
pnpm run build

# Biên dịch bản tĩnh cho Mobile App
pnpm run build:mobile

# Đồng bộ Capacitor
npx cap sync
```

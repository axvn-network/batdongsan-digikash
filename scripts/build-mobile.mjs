import fs from 'fs';
import path from 'path';

// Tạo thư mục out nếu chưa có
const outDir = path.join(process.cwd(), 'out');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Ứng dụng mobile Capacitor tải trực tiếp qua Web View
// Sử dụng single-page shell kết nối tới Backend URL đã cấu hình
const mobileHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>Batdongsan DigiKash</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body, html { width: 100%; height: 100%; overflow: hidden; background-color: #E03C31; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    #splash {
      position: fixed; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; text-align: center; z-index: 100;
      transition: opacity 0.4s ease;
    }
    .logo { width: 96px; height: 96px; border-radius: 20px; background: white; padding: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 25px rgba(0,0,0,0.2); margin-bottom: 20px; }
    .logo svg { width: 64px; height: 64px; fill: #E03C31; }
    h1 { font-size: 22px; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.5px; }
    p { font-size: 14px; opacity: 0.9; }
    .loader { margin-top: 30px; width: 36px; height: 36px; border: 3px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    iframe { width: 100%; height: 100%; border: none; }
  </style>
</head>
<body>
  <div id="splash">
    <div class="logo">
      <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
    </div>
    <h1>Batdongsan DigiKash</h1>
    <p>Sàn Giao Dịch Bất Động Sản Trực Tuyến</p>
    <div class="loader"></div>
  </div>

  <iframe id="app-frame" src="about:blank"></iframe>

  <script>
    const targetUrl = window.localStorage.getItem('API_BASE_URL') || 'https://batdongsan.com.vn';
    const iframe = document.getElementById('app-frame');
    const splash = document.getElementById('splash');

    iframe.onload = () => {
      setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => splash.remove(), 400);
      }, 500);
    };

    iframe.src = targetUrl;
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(outDir, 'index.html'), mobileHtml, 'utf8');
console.log('✓ Successfully generated out/index.html mobile bundle.');

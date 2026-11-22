/**
 * Generate dynamic sitemap XML
 */
import fs from "fs";
import path from "path";
import { MOCK_PROPERTIES } from "../src/lib/repositories/mock-data";

async function generate() {
  const baseUrl = "https://batdongsan.com.vn";
  const urls = [
    `${baseUrl}/`,
    `${baseUrl}/bat-dong-san`,
    `${baseUrl}/du-an`,
    `${baseUrl}/tin-tuc`,
    `${baseUrl}/so-sanh`,
    ...MOCK_PROPERTIES.map((p) => `${baseUrl}/bat-dong-san/${p.slug}`),
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
    <url>
      <loc>${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>`
    )
    .join("")}
</urlset>`;

  const outPath = path.join(process.cwd(), "public", "sitemap.xml");
  fs.writeFileSync(outPath, sitemapXml);
  console.log("✅ Generated public/sitemap.xml successfully!");
}

generate();

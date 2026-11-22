import { MetadataRoute } from "next";
import { MOCK_PROPERTIES, MOCK_POSTS } from "@/lib/repositories/mock-data";
import { WIKI_ARTICLES } from "@/lib/data/wiki";
import { ENTERPRISES } from "@/lib/data/enterprises";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://batdongsan.com.vn";

  const propertyUrls = MOCK_PROPERTIES.map((p) => ({
    url: `${baseUrl}/bat-dong-san/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const programmaticUrls = [
    "ban-can-ho-tphcm",
    "nha-dat-ban-ha-noi",
    "cho-thue-can-ho-tphcm",
    "ban-nha-dat-da-nang",
    "ban-can-ho-binh-duong",
  ].map((slug) => ({
    url: `${baseUrl}/khu-vuc/${slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.85,
  }));

  const wikiUrls = WIKI_ARTICLES.map((article) => ({
    url: `${baseUrl}/wiki/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const enterpriseUrls = ENTERPRISES.map((ent) => ({
    url: `${baseUrl}/doanh-nghiep/${ent.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const postUrls = MOCK_POSTS.map((post) => ({
    url: `${baseUrl}/tin-tuc/${post.slug}`,
    lastModified: new Date(post.publishedAt || post.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/bat-dong-san`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/du-an`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/moi-gioi`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/thi-truong`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/goi-dich-vu`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/so-sanh`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tin-tuc`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tien-ich/tinh-lai-vay`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/tien-ich/phong-thuy`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/wiki`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/doanh-nghiep`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...programmaticUrls,
    ...wikiUrls,
    ...enterpriseUrls,
    ...postUrls,
    ...propertyUrls,
  ];
}

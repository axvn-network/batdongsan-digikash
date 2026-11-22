import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { MOCK_PROPERTIES, MOCK_USERS, MOCK_PROJECTS, MOCK_POSTS, MOCK_INQUIRIES } from "../src/lib/repositories/mock-data";
import { PROPERTY_TYPES, CITIES } from "../src/lib/constants";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Seed Users
  const userMap: Record<string, string> = {};
  for (const user of MOCK_USERS) {
    const defaultPassword = user.email === "admin@example.com" ? "admin123" : "user123";
    const passwordHash = await bcrypt.hash(defaultPassword, 10);
    const savedUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role as any,
      },
      create: {
        id: user.id,
        email: user.email,
        passwordHash,
        name: user.name,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role as any,
      },
    });
    userMap[user.id] = savedUser.id;
  }
  const defaultUserId = Object.values(userMap)[0] || (await prisma.user.findFirst())?.id;
  console.log(`✓ Seeded ${MOCK_USERS.length} users`);

  // Seed Property Types
  for (let i = 0; i < PROPERTY_TYPES.length; i++) {
    const pt = PROPERTY_TYPES[i];
    await prisma.propertyType.upsert({
      where: { slug: pt.slug },
      update: { name: pt.name, order: i },
      create: { id: pt.id, name: pt.name, slug: pt.slug, order: i },
    });
  }
  console.log(`✓ Seeded ${PROPERTY_TYPES.length} property types`);

  // Seed Service Packages
  const packages = [
    { id: "pkg-free", name: "Tin Thường (Miễn Phí)", slug: "tin-thuong", price: 0, durationDays: 30, listingLimit: 3, features: JSON.stringify(["Hiển thị danh sách thường", "Hỗ trợ 24/7"]) },
    { id: "pkg-vip", name: "Tin VIP Nổi Bật", slug: "tin-vip", price: 299000, durationDays: 15, listingLimit: 10, features: JSON.stringify(["Huy hiệu VIP đỏ", "Ưu tiên Top danh mục", "Đẩy tin tự động mỗi ngày"]), isPopular: true },
    { id: "pkg-diamond", name: "Tin Kim Cương (Trang Chủ)", slug: "tin-kim-cuong", price: 899000, durationDays: 30, listingLimit: 30, features: JSON.stringify(["Vị trí VIP1 Trang Chủ", "Banner quảng cáo nổi bật", "Gắn bản quyền ảnh chuyên nghiệp", "Hỗ trợ môi giới VIP"]) },
  ];
  for (const pkg of packages) {
    await prisma.servicePackage.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    });
  }
  console.log(`✓ Seeded ${packages.length} service packages`);

  // Seed Properties
  for (const p of MOCK_PROPERTIES) {
    await prisma.property.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        price: p.price,
        area: p.area,
        status: p.status as any,
      },
      create: {
        id: p.id,
        title: p.title,
        slug: p.slug,
        description: p.description,
        propertyTypeId: p.propertyTypeId,
        price: p.price,
        pricePerM2: p.pricePerM2,
        isForRent: p.isForRent,
        area: p.area,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        direction: p.direction,
        legalStatus: p.legalStatus,
        furniture: p.furniture,
        address: p.address,
        city: p.city,
        district: p.district,
        ward: p.ward,
        latitude: p.latitude,
        longitude: p.longitude,
        status: p.status as any,
        isFeatured: p.isFeatured,
        isVip: p.isVip,
        viewsCount: p.viewsCount,
        userId: userMap[p.userId] || defaultUserId!,
      },
    });

    // Seed Images
    for (const img of p.images) {
      await prisma.propertyImage.upsert({
        where: { id: img.id },
        update: { url: img.url, isPrimary: img.isPrimary, order: img.order },
        create: { id: img.id, propertyId: p.id, url: img.url, isPrimary: img.isPrimary, order: img.order },
      });
    }

    // Seed Price History
    if (p.priceHistory) {
      for (const ph of p.priceHistory) {
        await prisma.priceHistory.upsert({
          where: { id: ph.id },
          update: { price: ph.price },
          create: { id: ph.id, propertyId: p.id, price: ph.price, recordedAt: new Date(ph.recordedAt) },
        });
      }
    }
  }
  console.log(`✓ Seeded ${MOCK_PROPERTIES.length} properties with images & price histories`);

  // Seed Posts
  for (const post of MOCK_POSTS) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: { title: post.title, excerpt: post.excerpt, content: post.content },
      create: {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        thumbnail: post.thumbnail,
        category: post.category,
        authorId: post.authorId,
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      },
    });
  }
  console.log(`✓ Seeded ${MOCK_POSTS.length} blog posts`);

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

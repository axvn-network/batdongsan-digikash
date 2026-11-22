import { AuditLogRepository } from "./audit.repo";

export interface ServicePackageItem {
  id: string;
  name: string;
  slug: string;
  type: "LISTING" | "MEMBERSHIP" | "ADS";
  price: number; // in VND
  durationDays: number;
  listingLimit: number;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  order: number;
}

let localPackages: ServicePackageItem[] = [
  {
    id: "pkg-1",
    name: "Tin Thường (Khởi tạo)",
    slug: "tin-thuong",
    type: "LISTING",
    price: 0,
    durationDays: 30,
    listingLimit: 2,
    features: ["Hiển thị tiêu chuẩn", "Tối đa 10 ảnh", "Hỗ trợ 24/7 qua email"],
    isPopular: false,
    isActive: true,
    order: 1,
  },
  {
    id: "pkg-2",
    name: "Gói VIP Bạc (Đẩy Top)",
    slug: "vip-bac",
    type: "LISTING",
    price: 350000,
    durationDays: 15,
    listingLimit: 5,
    features: ["Ưu tiên trên kết quả tìm kiếm", "Huy hiệu VIP Bạc", "Tự động đẩy top 3 ngày/lần"],
    isPopular: false,
    isActive: true,
    order: 2,
  },
  {
    id: "pkg-3",
    name: "Gói VIP Vàng (Nổi Bật)",
    slug: "vip-vang",
    type: "LISTING",
    price: 950000,
    durationDays: 30,
    listingLimit: 15,
    features: ["Vị trí đầu trang danh mục", "Huy hiệu VIP Vàng viền đỏ", "Đẩy top mỗi ngày", "Hỗ trợ gắn link video YouTube"],
    isPopular: true,
    isActive: true,
    order: 3,
  },
  {
    id: "pkg-4",
    name: "Gói VIP Kim Cương (Chuyên Gia Môi Giới)",
    slug: "vip-kim-cuong",
    type: "MEMBERSHIP",
    price: 2500000,
    durationDays: 30,
    listingLimit: 50,
    features: ["Trang hồ sơ Môi giới chuyên nghiệp", "Huy hiệu Môi giới Uy tín DigiKash", "Ưu tiên nhận Lead khách hàng từ sàn", "Không giới hạn hình ảnh và video VR 360"],
    isPopular: false,
    isActive: true,
    order: 4,
  },
];

export class PackageRepository {
  static async getAll(): Promise<ServicePackageItem[]> {
    return localPackages.sort((a, b) => a.order - b.order);
  }

  static async findById(id: string): Promise<ServicePackageItem | null> {
    return localPackages.find((p) => p.id === id) || null;
  }

  static async create(
    data: Omit<ServicePackageItem, "id">,
    adminUser?: { id: string; name: string }
  ): Promise<ServicePackageItem> {
    const newPkg: ServicePackageItem = {
      ...data,
      id: `pkg-${Date.now()}`,
    };
    localPackages.push(newPkg);

    await AuditLogRepository.log({
      userId: adminUser?.id || "system",
      userName: adminUser?.name || "Hệ thống",
      userRole: "ADMIN",
      action: "package.create",
      entity: "ServicePackage",
      entityId: newPkg.id,
      after: { name: newPkg.name, price: newPkg.price },
      severity: "INFO",
    });

    return newPkg;
  }

  static async update(
    id: string,
    data: Partial<ServicePackageItem>,
    adminUser?: { id: string; name: string }
  ): Promise<ServicePackageItem | null> {
    const pkg = localPackages.find((p) => p.id === id);
    if (!pkg) return null;

    const before = { ...pkg };
    Object.assign(pkg, data);

    await AuditLogRepository.log({
      userId: adminUser?.id || "system",
      userName: adminUser?.name || "Hệ thống",
      userRole: "ADMIN",
      action: "package.update",
      entity: "ServicePackage",
      entityId: id,
      before,
      after: pkg,
      severity: "INFO",
    });

    return pkg;
  }

  static async toggleActive(
    id: string,
    adminUser?: { id: string; name: string }
  ): Promise<ServicePackageItem | null> {
    const pkg = localPackages.find((p) => p.id === id);
    if (!pkg) return null;

    pkg.isActive = !pkg.isActive;

    await AuditLogRepository.log({
      userId: adminUser?.id || "system",
      userName: adminUser?.name || "Hệ thống",
      userRole: "ADMIN",
      action: "package.toggle",
      entity: "ServicePackage",
      entityId: id,
      after: { isActive: pkg.isActive },
      severity: "INFO",
    });

    return pkg;
  }
}

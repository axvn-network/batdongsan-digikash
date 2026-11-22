import { prisma } from "../db";
import { Property, PropertyFilterParams, Paginated, PropertyStatus, MapMarker, BBox } from "@/types";
import { MOCK_PROPERTIES } from "./mock-data";
import { formatPrice } from "../utils";
import { AuditLogRepository } from "./audit.repo";

// In-memory store for dev fallback
let localProperties: Property[] = [...MOCK_PROPERTIES];

let isDbOnline: boolean | null = null;
let lastDbCheck = 0;

function canTryDb(): boolean {
  if (isDbOnline === false) {
    if (Date.now() - lastDbCheck < 60000) return false;
    isDbOnline = null;
  }
  return true;
}

function markDbOffline() {
  isDbOnline = false;
  lastDbCheck = Date.now();
}

function markDbOnline() {
  isDbOnline = true;
}

export class PropertyRepository {
  static async search(params: PropertyFilterParams): Promise<Paginated<Property>> {
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 12;
    const skip = (page - 1) * limit;

    if (canTryDb()) {
      try {
        // Try database query
        const where: any = {};

        if (params.status) {
          where.status = params.status;
        } else {
          where.status = 'APPROVED';
        }

        if (params.isForRent !== undefined) {
          where.isForRent = Boolean(params.isForRent);
        }

        if (params.city) {
          where.city = { contains: params.city, mode: 'insensitive' };
        }

        if (params.district) {
          where.district = { contains: params.district, mode: 'insensitive' };
        }

        if (params.propertyTypeId) {
          where.propertyTypeId = params.propertyTypeId;
        }

        if (params.keyword) {
          where.OR = [
            { title: { contains: params.keyword, mode: 'insensitive' } },
            { address: { contains: params.keyword, mode: 'insensitive' } },
            { description: { contains: params.keyword, mode: 'insensitive' } },
          ];
        }

        if (params.minPrice !== undefined || params.maxPrice !== undefined) {
          where.price = {};
          if (params.minPrice !== undefined) where.price.gte = Number(params.minPrice);
          if (params.maxPrice !== undefined && params.maxPrice !== Infinity) where.price.lte = Number(params.maxPrice);
        }

        if (params.minArea !== undefined || params.maxArea !== undefined) {
          where.area = {};
          if (params.minArea !== undefined) where.area.gte = Number(params.minArea);
          if (params.maxArea !== undefined && params.maxArea !== Infinity) where.area.lte = Number(params.maxArea);
        }

        if (params.bedrooms !== undefined && params.bedrooms > 0) {
          where.bedrooms = { gte: Number(params.bedrooms) };
        }

        if (params.direction) {
          where.direction = params.direction;
        }

        if (params.legalStatus) {
          where.legalStatus = params.legalStatus;
        }

        let orderBy: any = { createdAt: 'desc' };
        if (params.sort === 'price_asc') orderBy = { price: 'asc' };
        if (params.sort === 'price_desc') orderBy = { price: 'desc' };
        if (params.sort === 'area_asc') orderBy = { area: 'asc' };
        if (params.sort === 'area_desc') orderBy = { area: 'desc' };
        if (params.sort === 'views_desc') orderBy = { viewsCount: 'desc' };

        const [items, total] = await Promise.all([
          prisma.property.findMany({
            where,
            include: {
              images: { orderBy: { order: 'asc' } },
              user: { select: { id: true, name: true, phone: true, email: true, avatar: true, role: true } },
              propertyType: true,
            },
            orderBy,
            skip,
            take: limit,
          }),
          prisma.property.count({ where }),
        ]);

        markDbOnline();

        if (total > 0 || items.length > 0) {
          return {
            items: items as any,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          };
        }
      } catch (error) {
        markDbOffline();
      }
    }

    // Local in-memory filter
    let filtered = localProperties.filter((p) => {
      if (params.status && p.status !== params.status) return false;
      if (!params.status && p.status !== 'APPROVED') return false;
      if (params.isForRent !== undefined && p.isForRent !== params.isForRent) return false;
      if (params.isVerifiedOnly && !p.verification?.isVerified) return false;
      if (params.city && !p.city.toLowerCase().includes(params.city.toLowerCase())) return false;
      if (params.district && !p.district.toLowerCase().includes(params.district.toLowerCase())) return false;
      if (params.propertyTypeId && p.propertyTypeId !== params.propertyTypeId) return false;
      if (params.direction && p.direction !== params.direction) return false;
      if (params.legalStatus && p.legalStatus !== params.legalStatus) return false;
      if (params.bedrooms && p.bedrooms < params.bedrooms) return false;
      if (params.minPrice !== undefined && p.price < params.minPrice) return false;
      if (params.maxPrice !== undefined && params.maxPrice !== Infinity && p.price > params.maxPrice) return false;
      if (params.minArea !== undefined && p.area < params.minArea) return false;
      if (params.maxArea !== undefined && params.maxArea !== Infinity && p.area > params.maxArea) return false;
      if (params.keyword) {
        const q = params.keyword.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchAddr = p.address.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        if (!matchTitle && !matchAddr && !matchDesc) return false;
      }
      return true;
    });

    if (params.sort === 'price_asc') filtered.sort((a, b) => a.price - b.price);
    else if (params.sort === 'price_desc') filtered.sort((a, b) => b.price - a.price);
    else if (params.sort === 'area_asc') filtered.sort((a, b) => a.area - b.area);
    else if (params.sort === 'area_desc') filtered.sort((a, b) => b.area - a.area);
    else if (params.sort === 'views_desc') filtered.sort((a, b) => b.viewsCount - a.viewsCount);
    else filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const total = filtered.length;
    const paginatedItems = filtered.slice(skip, skip + limit);

    return {
      items: paginatedItems,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  static async findById(id: string): Promise<Property | null> {
    if (canTryDb()) {
      try {
        const property = await prisma.property.findUnique({
          where: { id },
          include: {
            images: { orderBy: { order: 'asc' } },
            user: { select: { id: true, name: true, phone: true, email: true, avatar: true, role: true } },
            propertyType: true,
            priceHistory: { orderBy: { recordedAt: 'asc' } },
          },
        });
        if (property) {
          markDbOnline();
          return property as any;
        }
      } catch (e) {
        markDbOffline();
      }
    }

    return localProperties.find((p) => p.id === id) || null;
  }

  static async findBySlug(slug: string): Promise<Property | null> {
    if (canTryDb()) {
      try {
        const property = await prisma.property.findUnique({
          where: { slug },
          include: {
            images: { orderBy: { order: 'asc' } },
            user: { select: { id: true, name: true, phone: true, email: true, avatar: true, role: true } },
            propertyType: true,
            priceHistory: { orderBy: { recordedAt: 'asc' } },
          },
        });
        if (property) {
          markDbOnline();
          return property as any;
        }
      } catch (e) {
        markDbOffline();
      }
    }

    return localProperties.find((p) => p.slug === slug) || null;
  }

  static async create(data: Partial<Property>): Promise<Property> {
    const id = `bds-${Date.now()}`;
    const newProperty: Property = {
      id,
      title: data.title || "",
      slug: data.slug || `tin-bds-${Date.now()}`,
      description: data.description || "",
      propertyTypeId: data.propertyTypeId || "can-ho-chung-cu",
      price: data.price || 0,
      pricePerM2: data.area && data.price ? Math.round(data.price / data.area) : null,
      isForRent: data.isForRent || false,
      area: data.area || 50,
      bedrooms: data.bedrooms || 1,
      bathrooms: data.bathrooms || 1,
      direction: data.direction || "Đông",
      legalStatus: data.legalStatus || "Sổ đỏ / Sổ hồng",
      furniture: data.furniture || "Cơ bản",
      address: data.address || "",
      city: data.city || "Hồ Chí Minh",
      district: data.district || "Quận 1",
      ward: data.ward || "",
      latitude: data.latitude || 10.7769,
      longitude: data.longitude || 106.7009,
      status: (data.status as PropertyStatus) || "PENDING",
      isFeatured: data.isFeatured || false,
      isVip: data.isVip || false,
      viewsCount: 1,
      userId: data.userId || "user-regular-1",
      images: data.images || [
        { id: `img-${Date.now()}`, propertyId: id, url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80", isPrimary: true, order: 0 }
      ],
      priceHistory: [
        { id: `ph-${Date.now()}`, propertyId: id, price: data.price || 0, recordedAt: new Date().toISOString() }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    localProperties.unshift(newProperty);

    try {
      await prisma.property.create({
        data: {
          id: newProperty.id,
          title: newProperty.title,
          slug: newProperty.slug,
          description: newProperty.description,
          propertyTypeId: newProperty.propertyTypeId,
          price: newProperty.price,
          pricePerM2: newProperty.pricePerM2,
          isForRent: newProperty.isForRent,
          area: newProperty.area,
          bedrooms: newProperty.bedrooms,
          bathrooms: newProperty.bathrooms,
          direction: newProperty.direction,
          legalStatus: newProperty.legalStatus,
          furniture: newProperty.furniture,
          address: newProperty.address,
          city: newProperty.city,
          district: newProperty.district,
          ward: newProperty.ward,
          latitude: newProperty.latitude,
          longitude: newProperty.longitude,
          status: newProperty.status as any,
          userId: newProperty.userId,
        },
      });
    } catch (e) { }

    return newProperty;
  }

  static async updateStatus(id: string, status: PropertyStatus): Promise<Property | null> {
    const prop = localProperties.find((p) => p.id === id);
    if (prop) {
      prop.status = status;
      prop.updatedAt = new Date().toISOString();
    }
    try {
      await prisma.property.update({
        where: { id },
        data: { status: status as any },
      });
    } catch (e) { }
    return prop || null;
  }

  static async incrementViews(id: string): Promise<void> {
    const prop = localProperties.find((p) => p.id === id);
    if (prop) prop.viewsCount += 1;
    try {
      await prisma.property.update({
        where: { id },
        data: { viewsCount: { increment: 1 } },
      });
    } catch (e) { }
  }

  static async getBBoxMarkers(bbox?: BBox): Promise<MapMarker[]> {
    const approved = localProperties.filter((p) => p.status === 'APPROVED');
    const within = bbox
      ? approved.filter(
        (p) =>
          p.latitude >= bbox.minLat &&
          p.latitude <= bbox.maxLat &&
          p.longitude >= bbox.minLng &&
          p.longitude <= bbox.maxLng
      )
      : approved;

    return within.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      price: p.price,
      priceFormatted: formatPrice(p.price, p.isForRent),
      area: p.area,
      isForRent: p.isForRent,
      latitude: p.latitude,
      longitude: p.longitude,
      image: p.images?.[0]?.url || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      address: `${p.district}, ${p.city}`,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
    }));
  }

  static async getAllForAdmin(): Promise<Property[]> {
    return localProperties;
  }

  static async toggleVerification(id: string, isVerified?: boolean): Promise<Property | null> {
    const prop = localProperties.find((p) => p.id === id);
    if (!prop) return null;
    const targetStatus = isVerified !== undefined ? isVerified : !(prop.isVerified || prop.verification?.isVerified);
    prop.isVerified = targetStatus;
    prop.verifiedAt = targetStatus ? new Date().toISOString() : undefined;
    if (!prop.verification) {
      prop.verification = {
        isVerified: targetStatus,
        certificateCode: targetStatus ? "VN-QSDĐ-" + Math.floor(100000 + Math.random() * 900000) : undefined,
        verifiedAt: prop.verifiedAt,
        legalDocType: "Sổ hồng / Sổ đỏ chính chủ",
        verifiedBy: "Hội đồng Thẩm định DigiKash",
        checkStatus: {
          ownershipMatched: true,
          planningClear: true,
          disputeFree: true,
          priceBenchmarked: true,
        },
      };
    } else {
      prop.verification.isVerified = targetStatus;
      prop.verification.verifiedAt = prop.verifiedAt;
    }
    return prop;
  }

  static async updateStatusWithReason(
    id: string,
    status: PropertyStatus,
    reason?: string,
    adminUser?: { id: string; name: string }
  ): Promise<Property | null> {
    const prop = localProperties.find((p) => p.id === id);
    if (!prop) return null;
    const beforeStatus = prop.status;
    prop.status = status;
    prop.updatedAt = new Date().toISOString();

    await AuditLogRepository.log({
      userId: adminUser?.id || "system",
      userName: adminUser?.name || "Hệ thống",
      userRole: "ADMIN",
      action: status === "APPROVED" ? "property.approve" : status === "REJECTED" ? "property.reject" : "property.change_status",
      entity: "Property",
      entityId: id,
      before: { status: beforeStatus },
      after: { status, reason },
      severity: status === "REJECTED" ? "WARNING" : "INFO",
    });

    return prop;
  }

  static async toggleFeature(
    id: string,
    isFeatured?: boolean,
    adminUser?: { id: string; name: string }
  ): Promise<Property | null> {
    const prop = localProperties.find((p) => p.id === id);
    if (!prop) return null;
    const before = prop.isFeatured;
    prop.isFeatured = isFeatured !== undefined ? isFeatured : !prop.isFeatured;
    prop.updatedAt = new Date().toISOString();

    await AuditLogRepository.log({
      userId: adminUser?.id || "system",
      userName: adminUser?.name || "Hệ thống",
      userRole: "ADMIN",
      action: "property.feature",
      entity: "Property",
      entityId: id,
      before: { isFeatured: before },
      after: { isFeatured: prop.isFeatured },
      severity: "INFO",
    });

    return prop;
  }

  static async transferOwner(
    id: string,
    newUserId: string,
    adminUser?: { id: string; name: string }
  ): Promise<Property | null> {
    const prop = localProperties.find((p) => p.id === id);
    if (!prop) return null;
    const beforeUser = prop.userId;
    prop.userId = newUserId;
    prop.updatedAt = new Date().toISOString();

    await AuditLogRepository.log({
      userId: adminUser?.id || "system",
      userName: adminUser?.name || "Hệ thống",
      userRole: "ADMIN",
      action: "property.transfer_owner",
      entity: "Property",
      entityId: id,
      before: { userId: beforeUser },
      after: { userId: newUserId },
      severity: "WARNING",
    });

    return prop;
  }
}

export type PropertyStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SOLD' | 'RENTED' | 'HIDDEN';

export interface PropertyImage {
  id: string;
  propertyId: string;
  url: string;
  isPrimary: boolean;
  order: number;
}

export interface PropertyType {
  id: string;
  name: string;
  slug: string;
}

export interface PriceHistoryItem {
  id: string;
  propertyId: string;
  price: number;
  recordedAt: string;
}

export interface AgentReview {
  id: string;
  agentId: string;
  authorName: string;
  rating: number; // 1 to 5
  comment: string;
  transactionType: string;
  createdAt: string;
}

export interface PropertyUser {
  id: string;
  name: string;
  phone?: string | null;
  email: string;
  avatar?: string | null;
  role: 'USER' | 'AGENT' | 'ADMIN';
  isVerifiedAgent?: boolean;
  agentLicense?: string | null;
  experienceYears?: number;
  rating?: number;
  reviewCount?: number;
  bio?: string;
  activeListingsCount?: number;
}

export interface VerificationDetails {
  isVerified: boolean;
  certificateCode?: string;
  verifiedAt?: string;
  legalDocType?: string; // "Sổ đỏ", "Sổ hồng", "HĐMB"
  verifiedBy?: string;
  checkStatus?: {
    ownershipMatched: boolean;
    planningClear: boolean;
    disputeFree: boolean;
    priceBenchmarked: boolean;
  };
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  propertyTypeId: string;
  propertyType?: PropertyType;
  price: number;
  pricePerM2?: number | null;
  isForRent: boolean;
  area: number;
  bedrooms: number;
  bathrooms: number;
  direction?: string | null;
  legalStatus?: string | null;
  furniture?: string | null;
  address: string;
  city: string;
  district: string;
  ward?: string | null;
  latitude: number;
  longitude: number;
  status: PropertyStatus;
  isFeatured: boolean;
  isVip: boolean;
  isVerified?: boolean;
  verifiedAt?: string;
  viewsCount: number;
  userId: string;
  user?: PropertyUser;
  projectId?: string | null;
  project?: {
    id: string;
    name: string;
    slug: string;
    developer: string;
  } | null;
  images: PropertyImage[];
  priceHistory?: PriceHistoryItem[];
  verification?: VerificationDetails;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilterParams {
  keyword?: string;
  city?: string;
  district?: string;
  propertyTypeId?: string;
  isForRent?: boolean;
  isVerifiedOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number;
  direction?: string;
  legalStatus?: string;
  status?: PropertyStatus;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'area_asc' | 'area_desc' | 'views_desc';
  page?: number;
  limit?: number;
}

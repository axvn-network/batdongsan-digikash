export interface CityCategory {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  developer: string;
  location: string;
  priceRange?: string;
  image?: string;
  status?: string;
}

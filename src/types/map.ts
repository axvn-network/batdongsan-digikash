export interface BBox {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

export interface MapMarker {
  id: string;
  title: string;
  slug: string;
  price: number;
  priceFormatted: string;
  area: number;
  isForRent: boolean;
  latitude: number;
  longitude: number;
  image: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
}

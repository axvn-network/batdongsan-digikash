export const PROPERTY_TYPES = [
  { id: "can-ho-chung-cu", name: "Căn hộ chung cư", slug: "can-ho-chung-cu" },
  { id: "nha-rieng", name: "Nhà riêng", slug: "nha-rieng" },
  { id: "nha-biet-thu-lien-ke", name: "Nhà biệt thự, liền kề", slug: "nha-biet-thu-lien-ke" },
  { id: "nha-mat-pho", name: "Nhà mặt phố", slug: "nha-mat-pho" },
  { id: "shophouse", name: "Shophouse, nhà phố thương mại", slug: "shophouse" },
  { id: "dat-nen-du-an", name: "Đất nền dự án", slug: "dat-nen-du-an" },
  { id: "ban-dat", name: "Đất thổ cư", slug: "ban-dat" },
  { id: "phong-tro-nha-tro", name: "Phòng trọ, nhà trọ", slug: "phong-tro-nha-tro" },
  { id: "kho-nha-xuong", name: "Kho, nhà xưởng", slug: "kho-nha-xuong" },
];

export const CITIES = [
  { id: "hcm", name: "Hồ Chí Minh", slug: "ho-chi-minh" },
  { id: "hn", name: "Hà Nội", slug: "ha-noi" },
  { id: "dn", name: "Đà Nẵng", slug: "da-nang" },
  { id: "bd", name: "Bình Dương", slug: "binh-duong" },
  { id: "dna", name: "Đồng Nai", slug: "dong-nai" },
  { id: "hp", name: "Hải Phòng", slug: "hai-phong" },
  { id: "vt", name: "Bà Rịa - Vũng Tàu", slug: "ba-ria-vung-tau" },
  { id: "ct", name: "Cần Thơ", slug: "can-tho" },
  { id: "kh", name: "Khánh Hòa", slug: "khanh-hoa" },
  { id: "ld", name: "Lâm Đồng", slug: "lam-dong" },
];

export const PRICE_RANGES_BUY = [
  { label: "Tất cả mức giá", min: 0, max: Infinity },
  { label: "Dưới 1 tỷ", min: 0, max: 1_000_000_000 },
  { label: "1 - 2 tỷ", min: 1_000_000_000, max: 2_000_000_000 },
  { label: "2 - 3 tỷ", min: 2_000_000_000, max: 3_000_000_000 },
  { label: "3 - 5 tỷ", min: 3_000_000_000, max: 5_000_000_000 },
  { label: "5 - 7 tỷ", min: 5_000_000_000, max: 7_000_000_000 },
  { label: "7 - 10 tỷ", min: 7_000_000_000, max: 10_000_000_000 },
  { label: "10 - 20 tỷ", min: 10_000_000_000, max: 20_000_000_000 },
  { label: "Trên 20 tỷ", min: 20_000_000_000, max: Infinity },
];

export const PRICE_RANGES_RENT = [
  { label: "Tất cả mức giá", min: 0, max: Infinity },
  { label: "Dưới 3 triệu", min: 0, max: 3_000_000 },
  { label: "3 - 5 triệu", min: 3_000_000, max: 5_000_000 },
  { label: "5 - 10 triệu", min: 5_000_000, max: 10_000_000 },
  { label: "10 - 20 triệu", min: 10_000_000, max: 20_000_000 },
  { label: "20 - 40 triệu", min: 20_000_000, max: 40_000_000 },
  { label: "Trên 40 triệu", min: 40_000_000, max: Infinity },
];

export const AREA_RANGES = [
  { label: "Tất cả diện tích", min: 0, max: Infinity },
  { label: "Dưới 30 m²", min: 0, max: 30 },
  { label: "30 - 50 m²", min: 30, max: 50 },
  { label: "50 - 80 m²", min: 50, max: 80 },
  { label: "80 - 100 m²", min: 80, max: 100 },
  { label: "100 - 150 m²", min: 100, max: 150 },
  { label: "150 - 200 m²", min: 150, max: 200 },
  { label: "200 - 300 m²", min: 200, max: 300 },
  { label: "Trên 300 m²", min: 300, max: Infinity },
];

export const DIRECTIONS = [
  "Đông",
  "Tây",
  "Nam",
  "Bắc",
  "Đông Bắc",
  "Đông Nam",
  "Tây Bắc",
  "Tây Nam",
];

export const LEGAL_STATUSES = [
  "Sổ đỏ / Sổ hồng",
  "Hợp đồng mua bán",
  "Đang chờ sổ",
  "Giấy tờ hợp lệ",
];

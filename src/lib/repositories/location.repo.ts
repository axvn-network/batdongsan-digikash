import { CITIES, PROPERTY_TYPES } from "../constants";
import { MOCK_PROJECTS } from "./mock-data";
import { CityCategory, ProjectCategory } from "@/types";

export class LocationRepository {
  static async getCities(): Promise<CityCategory[]> {
    return CITIES.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      count: 450,
    }));
  }

  static async getProjects(): Promise<ProjectCategory[]> {
    return MOCK_PROJECTS;
  }

  static async getPropertyTypes() {
    return PROPERTY_TYPES;
  }

  static async getDistrictsByCitySlug(citySlug?: string): Promise<{ id: string; name: string; slug: string }[]> {
    return [
      { id: "q1", name: "Quận 1", slug: "quan-1" },
      { id: "q2", name: "Quận 2 (TP. Thủ Đức)", slug: "quan-2" },
      { id: "q7", name: "Quận 7", slug: "quan-7" },
      { id: "bt", name: "Quận Bình Thạnh", slug: "quan-binh-thanh" },
      { id: "pn", name: "Quận Phú Nhuận", slug: "quan-phu-nhuan" },
      { id: "tb", name: "Quận Tân Bình", slug: "quan-tan-binh" },
      { id: "cg", name: "Quận Cầu Giấy", slug: "quan-cau-giay" },
      { id: "ntl", name: "Quận Nam Từ Liêm", slug: "quan-nam-tu-liem" },
      { id: "tx", name: "Quận Thanh Xuân", slug: "quan-thanh-xuan" },
    ];
  }
}

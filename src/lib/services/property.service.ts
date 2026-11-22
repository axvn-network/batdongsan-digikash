import { PropertyRepository } from "../repositories/property.repo";
import { PropertyFilterParams, Property } from "@/types";
import { slugify } from "../utils";

export class PropertyService {
  static async listProperties(params: PropertyFilterParams) {
    return PropertyRepository.search(params);
  }

  static async getPropertyDetail(slugOrId: string) {
    let prop = await PropertyRepository.findBySlug(slugOrId);
    if (!prop) {
      prop = await PropertyRepository.findById(slugOrId);
    }
    if (prop) {
      PropertyRepository.incrementViews(prop.id).catch(() => {});
    }
    return prop;
  }

  static async createProperty(data: any, userId: string): Promise<Property> {
    const slug = slugify(data.title) + "-" + Date.now().toString().slice(-6);
    return PropertyRepository.create({
      ...data,
      slug,
      userId,
      status: "PENDING",
    });
  }
}

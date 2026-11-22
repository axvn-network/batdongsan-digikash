import { PropertyRepository } from "../repositories/property.repo";
import { PropertyStatus } from "@/types";

export class ModerationService {
  static async approve(propertyId: string) {
    return PropertyRepository.updateStatus(propertyId, "APPROVED");
  }

  static async reject(propertyId: string) {
    return PropertyRepository.updateStatus(propertyId, "REJECTED");
  }

  static async markSold(propertyId: string) {
    return PropertyRepository.updateStatus(propertyId, "SOLD");
  }
}

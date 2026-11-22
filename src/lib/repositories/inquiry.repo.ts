import { Inquiry } from "@/types";
import { MOCK_INQUIRIES } from "./mock-data";

let localInquiries: Inquiry[] = [...MOCK_INQUIRIES];

export class InquiryRepository {
  static async getAll(): Promise<Inquiry[]> {
    return localInquiries;
  }

  static async create(data: {
    propertyId: string;
    propertyTitle?: string;
    senderName: string;
    senderPhone: string;
    senderEmail?: string;
    message: string;
  }): Promise<Inquiry> {
    const newInq: Inquiry = {
      id: `inq-${Date.now()}`,
      propertyId: data.propertyId,
      propertyTitle: data.propertyTitle || "Bất động sản",
      senderName: data.senderName,
      senderPhone: data.senderPhone,
      senderEmail: data.senderEmail || null,
      message: data.message,
      status: "NEW",
      createdAt: new Date().toISOString(),
    };
    localInquiries.unshift(newInq);
    return newInq;
  }

  static async updateStatus(id: string, status: 'NEW' | 'PROCESSING' | 'RESPONDED'): Promise<Inquiry | null> {
    const item = localInquiries.find((i) => i.id === id);
    if (item) {
      item.status = status;
    }
    return item || null;
  }
}

import { PropertyRepository } from "./property.repo";
import { UserRepository } from "./user.repo";
import { InquiryRepository } from "./inquiry.repo";

export class StatsRepository {
  static async getAdminKPIs() {
    const properties = await PropertyRepository.getAllForAdmin();
    const users = await UserRepository.getAll();
    const inquiries = await InquiryRepository.getAll();

    const pendingProperties = properties.filter((p) => p.status === 'PENDING').length;
    const approvedProperties = properties.filter((p) => p.status === 'APPROVED').length;
    const totalViews = properties.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0);

    const monthlyTrends = [
      { month: "T9", listings: 120, views: 18500, inquiries: 45 },
      { month: "T10", listings: 145, views: 24200, inquiries: 62 },
      { month: "T11", listings: 180, views: 31000, inquiries: 84 },
      { month: "T12", listings: 210, views: 39500, inquiries: 110 },
      { month: "T1", listings: 260, views: 48000, inquiries: 142 },
      { month: "T2", listings: 310, views: 56400, inquiries: 178 },
    ];

    const categoryDistribution = [
      { name: "Căn hộ chung cư", value: 45 },
      { name: "Nhà riêng", value: 25 },
      { name: "Nhà mặt phố", value: 15 },
      { name: "Biệt thự, liền kề", value: 10 },
      { name: "Đất nền", value: 5 },
    ];

    return {
      totalProperties: properties.length,
      pendingProperties,
      approvedProperties,
      totalUsers: users.length,
      totalInquiries: inquiries.length,
      totalViews,
      monthlyTrends,
      categoryDistribution,
    };
  }
}

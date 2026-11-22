import { AuditLogRepository } from "./audit.repo";

export interface SystemSettings {
  general: {
    siteName: string;
    siteUrl: string;
    hotline: string;
    supportEmail: string;
    address: string;
    companyName: string;
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    ogImage: string;
    googleAnalyticsId: string;
    searchConsoleCode: string;
  };
  email: {
    provider: string; // "SMTP" | "Resend"
    smtpHost: string;
    smtpPort: number;
    senderEmail: string;
    senderName: string;
  };
  payment: {
    enableVnpay: boolean;
    enableMomo: boolean;
    enableVietQR: boolean;
    bankName: string;
    bankAccountNumber: string;
    bankAccountName: string;
    bankBranch: string;
  };
  moderation: {
    enableAutoCheck: boolean;
    priceDeviationThreshold: number; // e.g. 50%
    blacklistedKeywords: string[];
    requireKycForVip: boolean;
  };
  maintenance: {
    isMaintenanceMode: boolean;
    maintenanceNotice: string;
  };
}

let localSettings: SystemSettings = {
  general: {
    siteName: "Batdongsan.com.vn (DigiKash Vietnam)",
    siteUrl: "https://batdongsan.com.vn",
    hotline: "1900 1881",
    supportEmail: "hotro@batdongsan.com.vn",
    address: "Tầng 31, Keangnam Hanoi Landmark Tower, Nam Từ Liêm, Hà Nội",
    companyName: "Công ty Cổ phần Bất Động Sản DigiKash Việt Nam",
  },
  seo: {
    defaultTitle: "Kênh thông tin Bất động sản số 1 Việt Nam - Batdongsan.com.vn",
    titleTemplate: "%s | Batdongsan.com.vn",
    defaultDescription: "Mua bán nhà đất, cho thuê căn hộ chung cư, biệt thự liền kề chính chủ giá tốt trên toàn quốc. Cập nhật thị trường 24/7.",
    ogImage: "https://staticfile.batdongsan.com.vn/images/banner/default-og.jpg",
    googleAnalyticsId: "G-BDSVN2026",
    searchConsoleCode: "google-site-verification=bds-official-vn-verify",
  },
  email: {
    provider: "SMTP",
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    senderEmail: "no-reply@batdongsan.com.vn",
    senderName: "Hệ Thống Batdongsan.com.vn",
  },
  payment: {
    enableVnpay: true,
    enableMomo: true,
    enableVietQR: true,
    bankName: "Ngân hàng TMCP Ngoại Thương Việt Nam (Vietcombank)",
    bankAccountNumber: "0071000998877",
    bankAccountName: "CTY CP BDS DIGIKASH VIETNAM",
    bankBranch: "Chi nhánh Hoàn Kiếm, Hà Nội",
  },
  moderation: {
    enableAutoCheck: true,
    priceDeviationThreshold: 50,
    blacklistedKeywords: ["lừa đảo", "đa cấp", "bao quy hoạch", "đầu tư ảo", "cam kết lãi 100%"],
    requireKycForVip: true,
  },
  maintenance: {
    isMaintenanceMode: false,
    maintenanceNotice: "Hệ thống đang được nâng cấp hạ tầng định kỳ. Vui lòng quay lại sau 30 phút.",
  },
};

export class SettingsRepository {
  static async getSettings(): Promise<SystemSettings> {
    return localSettings;
  }

  static async updateSettings(
    newSettings: Partial<SystemSettings>,
    adminUser?: { id: string; name: string }
  ): Promise<SystemSettings> {
    const before = JSON.parse(JSON.stringify(localSettings));
    localSettings = {
      ...localSettings,
      ...newSettings,
      general: { ...localSettings.general, ...newSettings.general },
      seo: { ...localSettings.seo, ...newSettings.seo },
      email: { ...localSettings.email, ...newSettings.email },
      payment: { ...localSettings.payment, ...newSettings.payment },
      moderation: { ...localSettings.moderation, ...newSettings.moderation },
      maintenance: { ...localSettings.maintenance, ...newSettings.maintenance },
    };

    await AuditLogRepository.log({
      userId: adminUser?.id || "system",
      userName: adminUser?.name || "Hệ thống",
      userRole: "SUPER_ADMIN",
      action: "system.settings.update",
      entity: "Settings",
      entityId: "system_config",
      before,
      after: localSettings,
      severity: "WARNING",
    });

    return localSettings;
  }
}

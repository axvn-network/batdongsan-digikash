export class NotificationService {
  static async sendInquiryNotification(senderName: string, phone: string, propertyTitle: string) {
    console.log(`[Notification] Khách hàng ${senderName} (${phone}) quan tâm tin: "${propertyTitle}"`);
    return true;
  }
}

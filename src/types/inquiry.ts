export interface Inquiry {
  id: string;
  propertyId: string;
  propertyTitle?: string;
  senderName: string;
  senderPhone: string;
  senderEmail?: string | null;
  message: string;
  status: 'NEW' | 'PROCESSING' | 'RESPONDED';
  createdAt: string;
}

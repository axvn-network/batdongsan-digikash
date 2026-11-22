import { z } from "zod";

export const inquirySchema = z.object({
  propertyId: z.string().min(1, "Thiếu mã bất động sản"),
  senderName: z.string().min(2, "Họ và tên tối thiểu 2 ký tự"),
  senderPhone: z.string().regex(/^(\+84|0)(3|5|7|8|9)\d{8}$/, "Số điện thoại Việt Nam không hợp lệ"),
  senderEmail: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  message: z.string().min(5, "Nội dung yêu cầu tối thiểu 5 ký tự"),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

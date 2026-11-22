import { z } from "zod";

export const propertyCreateSchema = z.object({
  title: z.string().min(10, "Tiêu đề tối thiểu 10 ký tự").max(200, "Tiêu đề tối đa 200 ký tự"),
  description: z.string().min(30, "Mô tả tối thiểu 30 ký tự"),
  propertyTypeId: z.string().min(1, "Vui lòng chọn loại bất động sản"),
  price: z.number().positive("Giá phải lớn hơn 0"),
  isForRent: z.boolean().default(false),
  area: z.number().positive("Diện tích phải lớn hơn 0"),
  bedrooms: z.number().int().min(0).default(0),
  bathrooms: z.number().int().min(0).default(0),
  direction: z.string().optional(),
  legalStatus: z.string().optional(),
  furniture: z.string().optional(),
  address: z.string().min(5, "Địa chỉ không được để trống"),
  city: z.string().min(1, "Vui lòng chọn Tỉnh/Thành phố"),
  district: z.string().min(1, "Vui lòng chọn Quận/Huyện"),
  ward: z.string().optional(),
  latitude: z.number().default(10.7769),
  longitude: z.number().default(106.7009),
  images: z.array(z.string().url()).min(1, "Cần ít nhất 1 ảnh đại diện"),
  projectId: z.string().optional().nullable(),
});

export type PropertyCreateInput = z.infer<typeof propertyCreateSchema>;

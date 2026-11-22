import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email không đúng định dạng"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Họ và tên tối thiểu 2 ký tự"),
  email: z.string().email("Email không đúng định dạng"),
  phone: z.string().regex(/^(\+84|0)(3|5|7|8|9)\d{8}$/, "Số điện thoại Việt Nam không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  role: z.enum(["USER", "AGENT"]).default("USER"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

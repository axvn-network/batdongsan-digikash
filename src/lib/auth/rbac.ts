import { User, UserRole, PermissionKey, PermissionResource, RoleDefinition, PermissionDefinition } from "@/types";

/**
 * Danh sách toàn bộ 52 quyền hạt mịn theo cấu trúc resource:action
 */
export const ALL_PERMISSIONS: PermissionDefinition[] = [
  // Property (Tin đăng)
  { key: "property:view_all", resource: "property", action: "view_all", name: "Xem tất cả tin", description: "Xem được tất cả tin đăng (kể cả chưa duyệt, đã ẩn)" },
  { key: "property:create", resource: "property", action: "create", name: "Tạo tin đăng", description: "Được phép đăng tin bất động sản mới" },
  { key: "property:update_own", resource: "property", action: "update_own", name: "Sửa tin của mình", description: "Cập nhật thông tin các tin do chính mình đăng" },
  { key: "property:update_any", resource: "property", action: "update_any", name: "Sửa tin bất kỳ", description: "Chỉnh sửa tin đăng của bất kỳ ai trong hệ thống" },
  { key: "property:delete_own", resource: "property", action: "delete_own", name: "Xóa tin của mình", description: "Xóa hoặc gỡ các tin do chính mình đăng" },
  { key: "property:delete_any", resource: "property", action: "delete_any", name: "Xóa tin bất kỳ", description: "Xóa bất kỳ tin đăng nào trong hệ thống" },
  { key: "property:approve", resource: "property", action: "approve", name: "Duyệt tin đăng", description: "Xét duyệt tin PENDING chuyển sang ACTIVE" },
  { key: "property:reject", resource: "property", action: "reject", name: "Từ chối tin đăng", description: "Từ chối tin kèm lý do gửi cho người đăng" },
  { key: "property:hide", resource: "property", action: "hide", name: "Ẩn tin đăng", description: "Tạm ẩn tin đăng khỏi danh sách công khai" },
  { key: "property:feature", resource: "property", action: "feature", name: "Gắn nhãn nổi bật / VIP", description: "Gắn huy hiệu nổi bật hoặc đẩy tin lên top" },
  { key: "property:change_status", resource: "property", action: "change_status", name: "Đổi trạng thái tin", description: "Đánh dấu đã bán, đã cho thuê, hết hạn" },
  { key: "property:verify", resource: "property", action: "verify", name: "Xác thực tin (Đã duyệt sổ)", description: "Gắn huy hiệu Đã xác thực pháp lý / Sổ đỏ" },
  { key: "property:transfer_owner", resource: "property", action: "transfer_owner", name: "Chuyển chủ sở hữu tin", description: "Chuyển giao quyền quản lý tin cho môi giới khác" },

  // User & Agent
  { key: "user:view_list", resource: "user", action: "view_list", name: "Xem danh sách thành viên", description: "Xem bảng người dùng và môi giới" },
  { key: "user:view_detail", resource: "user", action: "view_detail", name: "Xem chi tiết người dùng", description: "Xem hồ sơ đầy đủ, lịch sử hoạt động và giao dịch" },
  { key: "user:update_profile", resource: "user", action: "update_profile", name: "Cập nhật hồ sơ thành viên", description: "Sửa thông tin cá nhân của người dùng" },
  { key: "user:ban", resource: "user", action: "ban", name: "Khóa tài khoản", description: "Khóa quyền truy cập của người dùng vi phạm" },
  { key: "user:unban", resource: "user", action: "unban", name: "Mở khóa tài khoản", description: "Kích hoạt lại tài khoản đã bị khóa" },
  { key: "user:change_role", resource: "user", action: "change_role", name: "Đổi vai trò người dùng", description: "Nâng/hạ role giữa USER, AGENT, MODERATOR, ADMIN" },
  { key: "user:reset_password", resource: "user", action: "reset_password", name: "Reset mật khẩu", description: "Gửi link hoặc tạo mật khẩu mới cho thành viên" },
  { key: "user:delete", resource: "user", action: "delete", name: "Xóa tài khoản", description: "Xóa tài khoản khỏi hệ thống (soft delete)" },
  { key: "agent:verify", resource: "agent", action: "verify", name: "Xác thực môi giới", description: "Duyệt chứng chỉ hành nghề và cấp huy hiệu môi giới xác thực" },
  { key: "agent:revoke_verify", resource: "agent", action: "revoke_verify", name: "Thu hồi xác thực môi giới", description: "Hủy bỏ huy hiệu môi giới đã xác thực" },

  // Category & Taxonomy
  { key: "category:view", resource: "category", action: "view", name: "Xem danh mục", description: "Xem loại BĐS, tỉnh thành, quận huyện, dự án" },
  { key: "category:create", resource: "category", action: "create", name: "Thêm danh mục", description: "Tạo mới loại BĐS, vị trí, dự án" },
  { key: "category:update", resource: "category", action: "update", name: "Sửa danh mục", description: "Chỉnh sửa tên, slug, thông tin danh mục" },
  { key: "category:delete", resource: "category", action: "delete", name: "Xóa danh mục", description: "Xóa danh mục không còn sử dụng" },
  { key: "category:reorder", resource: "category", action: "reorder", name: "Sắp xếp danh mục", description: "Thay đổi thứ tự hiển thị ưu tiên của danh mục" },

  // Lead / Inquiry
  { key: "lead:view_all", resource: "lead", action: "view_all", name: "Xem tất cả Leads", description: "Xem toàn bộ yêu cầu liên hệ trên toàn sàn" },
  { key: "lead:view_own", resource: "lead", action: "view_own", name: "Xem Lead của mình", description: "Xem khách hàng liên hệ vào tin do mình đăng" },
  { key: "lead:assign", resource: "lead", action: "assign", name: "Gán Lead cho môi giới", description: "Chuyển giao khách hàng tiềm năng cho agent phụ trách" },
  { key: "lead:update_status", resource: "lead", action: "update_status", name: "Cập nhật trạng thái Lead", description: "Đổi trạng thái: Mới, Đang xử lý, Đã phản hồi, Đã chốt" },
  { key: "lead:export", resource: "lead", action: "export", name: "Xuất dữ liệu Leads", description: "Xuất file CSV danh sách khách hàng tiềm năng" },

  // Message
  { key: "message:view_all", resource: "message", action: "view_all", name: "Kiểm duyệt hội thoại", description: "Xem các cuộc trò chuyện bị gắn cờ vi phạm" },
  { key: "message:flag", resource: "message", action: "flag", name: "Gắn cờ tin nhắn", description: "Đánh dấu cuộc trò chuyện vi phạm chính sách" },
  { key: "message:delete", resource: "message", action: "delete", name: "Xóa tin nhắn", description: "Gỡ bỏ tin nhắn rác hoặc chứa thông tin lừa đảo" },

  // Payment & Package
  { key: "package:view", resource: "package", action: "view", name: "Xem gói dịch vụ", description: "Xem danh sách các gói tin và gói hội viên" },
  { key: "package:create", resource: "package", action: "create", name: "Tạo gói dịch vụ", description: "Tạo bảng giá gói đăng tin / hội viên mới" },
  { key: "package:update", resource: "package", action: "update", name: "Sửa gói dịch vụ", description: "Chỉnh sửa giá, quyền lợi gói dịch vụ" },
  { key: "package:delete", resource: "package", action: "delete", name: "Xóa gói dịch vụ", description: "Ngừng cung cấp gói dịch vụ" },
  { key: "transaction:view_all", resource: "transaction", action: "view_all", name: "Xem giao dịch", description: "Xem nhật ký thanh toán toàn sàn" },
  { key: "transaction:confirm", resource: "transaction", action: "confirm", name: "Xác nhận thanh toán", description: "Duyệt giao dịch chuyển khoản ngân hàng" },
  { key: "transaction:refund", resource: "transaction", action: "refund", name: "Hoàn tiền giao dịch", description: "Thực hiện hoàn tiền cho khách hàng kèm lý do" },
  { key: "wallet:adjust", resource: "wallet", action: "adjust", name: "Điều chỉnh số dư ví", description: "Cộng/trừ số dư ví tài khoản kèm lý do ghi log" },

  // Content (CMS)
  { key: "post:view", resource: "post", action: "view", name: "Xem bài viết CMS", description: "Xem danh sách tin tức, cẩm nang, phong thủy" },
  { key: "post:create", resource: "post", action: "create", name: "Soạn bài viết mới", description: "Tạo bài viết tin tức thị trường BĐS" },
  { key: "post:update", resource: "post", action: "update", name: "Sửa bài viết", description: "Chỉnh sửa nội dung bài viết và SEO meta" },
  { key: "post:delete", resource: "post", action: "delete", name: "Xóa bài viết", description: "Xóa bài viết khỏi trang tin tức" },
  { key: "post:publish", resource: "post", action: "publish", name: "Xuất bản bài viết", description: "Công khai bài viết lên trang tin tức sàn" },
  { key: "post:unpublish", resource: "post", action: "unpublish", name: "Gỡ bài viết", description: "Hạ bài viết về trạng thái nháp" },
  { key: "page:view", resource: "page", action: "view", name: "Xem trang tĩnh", description: "Xem các trang: Giới thiệu, Điều khoản, Chính sách" },
  { key: "page:create", resource: "page", action: "create", name: "Tạo trang tĩnh mới", description: "Thêm trang nội dung tĩnh mới" },
  { key: "page:update", resource: "page", action: "update", name: "Sửa trang tĩnh", description: "Cập nhật văn bản pháp lý, quy chế hoạt động" },
  { key: "page:delete", resource: "page", action: "delete", name: "Xóa trang tĩnh", description: "Gỡ bỏ trang tĩnh" },
  { key: "banner:view", resource: "banner", action: "view", name: "Xem banner quảng cáo", description: "Xem danh sách banner trang chủ & danh mục" },
  { key: "banner:create", resource: "banner", action: "create", name: "Tạo banner mới", description: "Thêm chiến dịch banner quảng cáo" },
  { key: "banner:update", resource: "banner", action: "update", name: "Sửa banner", description: "Đổi ảnh, vị trí, liên kết và thời hạn banner" },
  { key: "banner:delete", resource: "banner", action: "delete", name: "Xóa banner", description: "Gỡ bỏ banner quảng cáo" },
  { key: "seo:manage", resource: "seo", action: "manage", name: "Quản lý SEO mặc định", description: "Cấu hình meta tags, sitemap, OpenGraph mặc định" },

  // Report
  { key: "report:view", resource: "report", action: "view", name: "Xem báo cáo vi phạm", description: "Xem phản ánh tin giả, spam từ người dùng" },
  { key: "report:resolve", resource: "report", action: "resolve", name: "Xử lý vi phạm", description: "Chấp nhận báo cáo, ẩn tin và cảnh cáo tài khoản" },
  { key: "report:dismiss", resource: "report", action: "dismiss", name: "Bác bỏ báo cáo", description: "Đóng báo cáo không hợp lệ" },

  // System
  { key: "system:view_dashboard", resource: "system", action: "view_dashboard", name: "Xem Dashboard quản trị", description: "Xem các chỉ số KPI và biểu đồ sàn" },
  { key: "system:view_analytics", resource: "system", action: "view_analytics", name: "Báo cáo phân tích chuyên sâu", description: "Xem báo cáo tăng trưởng, doanh thu và retention" },
  { key: "system:manage_settings", resource: "system", action: "manage_settings", name: "Cấu hình hệ thống", description: "Cấu hình email, cổng thanh toán, thông tin sàn" },
  { key: "system:view_audit_log", resource: "system", action: "view_audit_log", name: "Xem Audit Log", description: "Xem nhật ký mọi thao tác ghi trên toàn hệ thống" },
  { key: "system:manage_roles", resource: "system", action: "manage_roles", name: "Quản lý Role & RBAC", description: "Tạo role mới, phân bổ quyền hạt mịn" },
  { key: "system:impersonate", resource: "system", action: "impersonate", name: "Đăng nhập thay người dùng", description: "Truy cập tài khoản người dùng để hỗ trợ kỹ thuật" },
  { key: "system:export_data", resource: "system", action: "export_data", name: "Xuất dữ liệu toàn sàn", description: "Xuất database và báo cáo tổng hợp" },
];

/**
 * Bảng phân quyền mặc định theo 7 Role chuẩn của sàn marketplace
 */
export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, PermissionKey[]> = {
  GUEST: [],
  USER: [
    "property:create",
    "property:update_own",
    "property:delete_own",
    "lead:view_own",
  ],
  AGENT: [
    "property:create",
    "property:update_own",
    "property:delete_own",
    "lead:view_own",
  ],
  VERIFIED_AGENT: [
    "property:create",
    "property:update_own",
    "property:delete_own",
    "lead:view_own",
  ],
  MODERATOR: [
    "system:view_dashboard",
    "property:view_all",
    "property:approve",
    "property:reject",
    "property:hide",
    "report:view",
    "report:resolve",
    "report:dismiss",
    "message:view_all",
    "message:flag",
  ],
  ADMIN: [
    "system:view_dashboard",
    "system:view_analytics",
    "property:view_all",
    "property:create",
    "property:update_own",
    "property:update_any",
    "property:delete_own",
    "property:delete_any",
    "property:approve",
    "property:reject",
    "property:hide",
    "property:feature",
    "property:change_status",
    "property:verify",
    "property:transfer_owner",
    "user:view_list",
    "user:view_detail",
    "user:update_profile",
    "user:ban",
    "user:unban",
    "user:reset_password",
    "agent:verify",
    "agent:revoke_verify",
    "category:view",
    "category:create",
    "category:update",
    "category:delete",
    "category:reorder",
    "lead:view_all",
    "lead:view_own",
    "lead:assign",
    "lead:update_status",
    "lead:export",
    "message:view_all",
    "message:flag",
    "message:delete",
    "package:view",
    "package:create",
    "package:update",
    "package:delete",
    "transaction:view_all",
    "transaction:confirm",
    "post:view",
    "post:create",
    "post:update",
    "post:delete",
    "post:publish",
    "post:unpublish",
    "page:view",
    "page:create",
    "page:update",
    "page:delete",
    "banner:view",
    "banner:create",
    "banner:update",
    "banner:delete",
    "seo:manage",
    "report:view",
    "report:resolve",
    "report:dismiss",
  ],
  SUPER_ADMIN: ALL_PERMISSIONS.map((p) => p.key),
};

/**
 * 7 Role mặc định của hệ thống DigiKash Vietnam
 */
export const SYSTEM_ROLES: RoleDefinition[] = [
  {
    id: "role-super-admin",
    name: "SUPER_ADMIN",
    label: "Quản trị viên tối cao",
    description: "Toàn quyền hệ thống, quản lý cấu hình, RBAC, audit log và xử lý giao dịch đặc biệt",
    isSystem: true,
    permissions: DEFAULT_ROLE_PERMISSIONS.SUPER_ADMIN,
    userCount: 1,
  },
  {
    id: "role-admin",
    name: "ADMIN",
    label: "Quản trị viên vận hành",
    description: "Quản lý tin đăng, thành viên, danh mục, giao dịch và nội dung trên toàn sàn",
    isSystem: true,
    permissions: DEFAULT_ROLE_PERMISSIONS.ADMIN,
    userCount: 2,
  },
  {
    id: "role-moderator",
    name: "MODERATOR",
    label: "Kiểm duyệt viên",
    description: "Chuyên trách duyệt/từ chối tin đăng, xem xét báo cáo vi phạm và kiểm duyệt hội thoại",
    isSystem: true,
    permissions: DEFAULT_ROLE_PERMISSIONS.MODERATOR,
    userCount: 1,
  },
  {
    id: "role-verified-agent",
    name: "VERIFIED_AGENT",
    label: "Môi giới đã xác thực",
    description: "Môi giới đã nộp chứng chỉ hành nghề BĐS, có huy hiệu xác thực và ưu tiên hiển thị",
    isSystem: true,
    permissions: DEFAULT_ROLE_PERMISSIONS.VERIFIED_AGENT,
    userCount: 4,
  },
  {
    id: "role-agent",
    name: "AGENT",
    label: "Môi giới tự do",
    description: "Môi giới chưa nộp hồ sơ kiểm duyệt chứng chỉ hành nghề",
    isSystem: true,
    permissions: DEFAULT_ROLE_PERMISSIONS.AGENT,
    userCount: 12,
  },
  {
    id: "role-user",
    name: "USER",
    label: "Thành viên thông thường",
    description: "Người dùng đăng tin cá nhân, lưu tin yêu thích, gửi yêu cầu liên hệ",
    isSystem: true,
    permissions: DEFAULT_ROLE_PERMISSIONS.USER,
    userCount: 840,
  },
  {
    id: "role-guest",
    name: "GUEST",
    label: "Khách vãng lai",
    description: "Người xem tin chưa đăng nhập",
    isSystem: true,
    permissions: DEFAULT_ROLE_PERMISSIONS.GUEST,
    userCount: 0,
  },
];

/**
 * Lấy danh sách quyền hiệu lực của người dùng
 * Công thức: Union(Role_Permissions) + User_Granted - User_Denied
 */
export function getUserEffectivePermissions(
  user: { role?: string; customPermissions?: { permission: string; granted: boolean }[] } | null | undefined
): PermissionKey[] {
  if (!user || !user.role) return [];

  const role = user.role.toUpperCase() as UserRole;

  // SUPER_ADMIN có tất cả quyền
  if (role === "SUPER_ADMIN") {
    return ALL_PERMISSIONS.map((p) => p.key);
  }

  const basePermissions = new Set<PermissionKey>(DEFAULT_ROLE_PERMISSIONS[role] || []);

  if (user.customPermissions && Array.isArray(user.customPermissions)) {
    for (const cp of user.customPermissions) {
      const pKey = cp.permission as PermissionKey;
      if (cp.granted) {
        basePermissions.add(pKey);
      } else {
        basePermissions.delete(pKey);
      }
    }
  }

  return Array.from(basePermissions);
}

/**
 * Kiểm tra phân quyền: can(user, "property:approve")
 */
export function can(
  user: { role?: string; customPermissions?: { permission: string; granted: boolean }[] } | null | undefined,
  permission: PermissionKey
): boolean {
  if (!user || !user.role) return false;
  const role = user.role.toUpperCase() as UserRole;

  if (role === "SUPER_ADMIN") return true;

  const permissions = getUserEffectivePermissions(user);
  return permissions.includes(permission);
}

/**
 * Server-side check bắt buộc có permission
 * Ném lỗi FORBIDDEN nếu không đủ quyền
 */
export function requirePermission(
  user: { role?: string; customPermissions?: { permission: string; granted: boolean }[] } | null | undefined,
  permission: PermissionKey
): void {
  if (!can(user, permission)) {
    const error = new Error(`FORBIDDEN: Bạn không có quyền thực hiện '${permission}'`);
    (error as unknown as { statusCode: number }).statusCode = 403;
    throw error;
  }
}

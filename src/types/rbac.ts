import { UserRole } from "./user";

export type PermissionResource = 
  | "property"
  | "user"
  | "agent"
  | "category"
  | "lead"
  | "message"
  | "package"
  | "transaction"
  | "wallet"
  | "post"
  | "page"
  | "banner"
  | "seo"
  | "report"
  | "system";

export type PropertyPermission =
  | "property:view_all"
  | "property:create"
  | "property:update_own"
  | "property:update_any"
  | "property:delete_own"
  | "property:delete_any"
  | "property:approve"
  | "property:reject"
  | "property:hide"
  | "property:feature"
  | "property:change_status"
  | "property:verify"
  | "property:transfer_owner";

export type UserAgentPermission =
  | "user:view_list"
  | "user:view_detail"
  | "user:update_profile"
  | "user:ban"
  | "user:unban"
  | "user:change_role"
  | "user:reset_password"
  | "user:delete"
  | "agent:verify"
  | "agent:revoke_verify";

export type CategoryPermission =
  | "category:view"
  | "category:create"
  | "category:update"
  | "category:delete"
  | "category:reorder";

export type LeadPermission =
  | "lead:view_all"
  | "lead:view_own"
  | "lead:assign"
  | "lead:update_status"
  | "lead:export";

export type MessagePermission =
  | "message:view_all"
  | "message:flag"
  | "message:delete";

export type PaymentPackagePermission =
  | "package:view"
  | "package:create"
  | "package:update"
  | "package:delete"
  | "transaction:view_all"
  | "transaction:confirm"
  | "transaction:refund"
  | "wallet:adjust";

export type ContentCMSPermission =
  | "post:view"
  | "post:create"
  | "post:update"
  | "post:delete"
  | "post:publish"
  | "post:unpublish"
  | "page:view"
  | "page:create"
  | "page:update"
  | "page:delete"
  | "banner:view"
  | "banner:create"
  | "banner:update"
  | "banner:delete"
  | "seo:manage";

export type ReportPermission =
  | "report:view"
  | "report:resolve"
  | "report:dismiss";

export type SystemPermission =
  | "system:view_dashboard"
  | "system:view_analytics"
  | "system:manage_settings"
  | "system:view_audit_log"
  | "system:manage_roles"
  | "system:impersonate"
  | "system:export_data";

export type PermissionKey =
  | PropertyPermission
  | UserAgentPermission
  | CategoryPermission
  | LeadPermission
  | MessagePermission
  | PaymentPackagePermission
  | ContentCMSPermission
  | ReportPermission
  | SystemPermission;

export interface PermissionDefinition {
  key: PermissionKey;
  resource: PermissionResource;
  action: string;
  name: string;
  description: string;
}

export interface RoleDefinition {
  id: string;
  name: UserRole | string;
  label: string;
  description: string;
  isSystem: boolean;
  permissions: PermissionKey[];
  userCount?: number;
}

export interface AuditLogItem {
  id: string;
  userId?: string | null;
  userName?: string | null;
  userEmail?: string | null;
  userRole?: string | null;
  action: string;
  entity: string;
  entityId?: string | null;
  before?: any;
  after?: any;
  ip?: string | null;
  userAgent?: string | null;
  severity?: "INFO" | "WARNING" | "CRITICAL";
  createdAt: string;
}

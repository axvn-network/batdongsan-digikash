import { RoleDefinition, PermissionKey } from "@/types";
import { SYSTEM_ROLES, DEFAULT_ROLE_PERMISSIONS } from "../auth/rbac";
import { AuditLogRepository } from "./audit.repo";

let localRoles: RoleDefinition[] = [...SYSTEM_ROLES];

export class RoleRepository {
  static async getAll(): Promise<RoleDefinition[]> {
    return localRoles;
  }

  static async findById(id: string): Promise<RoleDefinition | null> {
    return localRoles.find((r) => r.id === id || r.name.toLowerCase() === id.toLowerCase()) || null;
  }

  static async create(data: {
    name: string;
    label: string;
    description: string;
    permissions: PermissionKey[];
  }, adminUser?: { id: string; name: string }): Promise<RoleDefinition> {
    const newRole: RoleDefinition = {
      id: `role-custom-${Date.now()}`,
      name: data.name.toUpperCase().replace(/\s+/g, "_"),
      label: data.label,
      description: data.description,
      isSystem: false,
      permissions: data.permissions,
      userCount: 0,
    };
    localRoles.push(newRole);

    await AuditLogRepository.log({
      userId: adminUser?.id || "system",
      userName: adminUser?.name || "Hệ thống",
      userRole: "SUPER_ADMIN",
      action: "role.create",
      entity: "Role",
      entityId: newRole.id,
      after: { name: newRole.name, label: newRole.label, permissionsCount: newRole.permissions.length },
      severity: "WARNING",
    });

    return newRole;
  }

  static async updatePermissions(
    id: string,
    permissions: PermissionKey[],
    adminUser?: { id: string; name: string }
  ): Promise<RoleDefinition | null> {
    const role = localRoles.find((r) => r.id === id || r.name.toLowerCase() === id.toLowerCase());
    if (!role) return null;

    if (role.name === "SUPER_ADMIN") {
      throw new Error("Không thể thay đổi quyền hạn của SUPER_ADMIN");
    }

    const beforeCount = role.permissions.length;
    role.permissions = permissions;

    await AuditLogRepository.log({
      userId: adminUser?.id || "system",
      userName: adminUser?.name || "Hệ thống",
      userRole: "SUPER_ADMIN",
      action: "role.permissions.update",
      entity: "Role",
      entityId: role.id,
      before: { permissionsCount: beforeCount },
      after: { permissionsCount: permissions.length },
      severity: "WARNING",
    });

    return role;
  }
}

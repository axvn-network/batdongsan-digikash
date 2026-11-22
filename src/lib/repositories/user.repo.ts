import { User, UserRole, UserPermissionOverride } from "@/types";
import { MOCK_USERS } from "./mock-data";
import { AuditLogRepository } from "./audit.repo";

let localUsers: User[] = [...MOCK_USERS];

export class UserRepository {
  static async findByEmail(email: string): Promise<User | null> {
    return localUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  static async findById(id: string): Promise<User | null> {
    return localUsers.find((u) => u.id === id) || null;
  }

  static async getAll(): Promise<User[]> {
    return localUsers;
  }

  static async create(data: { email: string; name: string; phone?: string; role?: UserRole }): Promise<User> {
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      phone: data.phone || null,
      role: data.role || "USER",
      walletBalance: 0,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80`,
      isBlocked: false,
      createdAt: new Date().toISOString(),
    };
    localUsers.push(newUser);
    return newUser;
  }

  static async updateRole(id: string, role: UserRole, adminUser?: { id: string; name: string }): Promise<User | null> {
    const u = localUsers.find((user) => user.id === id);
    if (!u) return null;

    // Safety guard: Cannot change role of SUPER_ADMIN or self-escalate illegally
    if (u.role === "SUPER_ADMIN" && role !== "SUPER_ADMIN") {
      throw new Error("Không thể hạ quyền của SUPER_ADMIN");
    }

    const beforeRole = u.role;
    u.role = role;
    u.updatedAt = new Date().toISOString();

    await AuditLogRepository.log({
      userId: adminUser?.id || "system",
      userName: adminUser?.name || "Hệ thống",
      userRole: "ADMIN",
      action: "user.change_role",
      entity: "User",
      entityId: id,
      before: { role: beforeRole },
      after: { role },
      severity: "WARNING",
    });

    return u;
  }

  static async toggleBlock(id: string, reason?: string, adminUser?: { id: string; name: string }): Promise<User | null> {
    const u = localUsers.find((user) => user.id === id);
    if (!u) return null;

    if (u.role === "SUPER_ADMIN") {
      throw new Error("Không thể khóa tài khoản SUPER_ADMIN");
    }

    const beforeStatus = u.isBlocked;
    u.isBlocked = !u.isBlocked;
    u.updatedAt = new Date().toISOString();

    await AuditLogRepository.log({
      userId: adminUser?.id || "system",
      userName: adminUser?.name || "Hệ thống",
      userRole: "ADMIN",
      action: u.isBlocked ? "user.ban" : "user.unban",
      entity: "User",
      entityId: id,
      before: { isBlocked: beforeStatus },
      after: { isBlocked: u.isBlocked, reason },
      severity: "WARNING",
    });

    return u;
  }

  static async updateCustomPermissions(
    id: string,
    permissions: UserPermissionOverride[],
    adminUser?: { id: string; name: string }
  ): Promise<User | null> {
    const u = localUsers.find((user) => user.id === id);
    if (!u) return null;

    const before = u.customPermissions || [];
    u.customPermissions = permissions;
    u.updatedAt = new Date().toISOString();

    await AuditLogRepository.log({
      userId: adminUser?.id || "system",
      userName: adminUser?.name || "Hệ thống",
      userRole: "SUPER_ADMIN",
      action: "user.permissions.override",
      entity: "User",
      entityId: id,
      before: { customPermissions: before },
      after: { customPermissions: permissions },
      severity: "WARNING",
    });

    return u;
  }

  static async adjustWallet(
    id: string,
    amount: number,
    reason: string,
    adminUser?: { id: string; name: string }
  ): Promise<{ user: User; newBalance: number }> {
    const u = localUsers.find((user) => user.id === id);
    if (!u) throw new Error("Không tìm thấy người dùng");

    const beforeBalance = u.walletBalance || 0;
    const newBalance = Math.max(0, beforeBalance + amount);
    u.walletBalance = newBalance;
    u.updatedAt = new Date().toISOString();

    await AuditLogRepository.log({
      userId: adminUser?.id || "system",
      userName: adminUser?.name || "Hệ thống",
      userRole: "SUPER_ADMIN",
      action: "wallet.adjust",
      entity: "Wallet",
      entityId: id,
      before: { balance: beforeBalance },
      after: { balance: newBalance, amount, reason },
      severity: "WARNING",
    });

    return { user: u, newBalance };
  }

  static async verifyAgent(
    id: string,
    approved: boolean,
    reason?: string,
    adminUser?: { id: string; name: string }
  ): Promise<User | null> {
    const u = localUsers.find((user) => user.id === id);
    if (!u) return null;

    if (!u.agentCertificate) {
      u.agentCertificate = {
        certNumber: `BDS-CERT-${Date.now().toString().slice(-6)}`,
        issueDate: "2024-01-01",
        idCard: "001200000000",
        status: approved ? "VERIFIED" : "REJECTED",
      };
    }

    const before = u.agentCertificate.status;
    u.agentCertificate.status = approved ? "VERIFIED" : "REJECTED";
    if (approved) {
      u.role = "VERIFIED_AGENT";
      u.agentCertificate.verifiedAt = new Date().toISOString();
    } else {
      if (u.role === "VERIFIED_AGENT") u.role = "AGENT";
    }

    await AuditLogRepository.log({
      userId: adminUser?.id || "system",
      userName: adminUser?.name || "Hệ thống",
      userRole: "ADMIN",
      action: approved ? "agent.verify" : "agent.revoke_verify",
      entity: "AgentCertificate",
      entityId: id,
      before: { status: before },
      after: { status: u.agentCertificate.status, reason },
      severity: "INFO",
    });

    return u;
  }
}

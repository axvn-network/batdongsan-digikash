import { AuditLogRepository } from "./audit.repo";
import { formatCurrencyVND } from "../utils";

export interface TransactionItem {
  id: string;
  code: string;
  userId: string;
  userName: string;
  userEmail: string;
  packageName: string;
  packageId: string;
  amount: number; // in VND
  paymentMethod: "VNPAY" | "MOMO" | "VIETQR" | "BANK_TRANSFER";
  status: "PENDING" | "COMPLETED" | "REFUNDED" | "CANCELLED";
  billImageUrl?: string;
  note?: string;
  refundReason?: string;
  createdAt: string;
  updatedAt?: string;
}

let localTransactions: TransactionItem[] = [
  {
    id: "tx-1",
    code: "TX-2026-0881",
    userId: "user-agent-verified-1",
    userName: "Phạm Thành Nam",
    userEmail: "agent.verified@example.com",
    packageName: "Gói VIP Kim Cương (Chuyên Gia Môi Giới)",
    packageId: "pkg-4",
    amount: 2500000,
    paymentMethod: "BANK_TRANSFER",
    status: "PENDING",
    billImageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
    note: "Ủy nhiệm chi Vietcombank số GD 9928172 lúc 10h15",
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: "tx-2",
    code: "TX-2026-0880",
    userId: "user-agent-1",
    userName: "Nguyễn Văn Hùng",
    userEmail: "agent@example.com",
    packageName: "Gói VIP Vàng (Nổi Bật)",
    packageId: "pkg-3",
    amount: 950000,
    paymentMethod: "VNPAY",
    status: "COMPLETED",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "tx-3",
    code: "TX-2026-0879",
    userId: "user-regular-1",
    userName: "Lê Hoàng Long",
    userEmail: "user@example.com",
    packageName: "Gói VIP Bạc (Đẩy Top)",
    packageId: "pkg-2",
    amount: 350000,
    paymentMethod: "MOMO",
    status: "COMPLETED",
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
  {
    id: "tx-4",
    code: "TX-2026-0875",
    userId: "user-agent-1",
    userName: "Nguyễn Văn Hùng",
    userEmail: "agent@example.com",
    packageName: "Gói VIP Bạc (Đẩy Top)",
    packageId: "pkg-2",
    amount: 350000,
    paymentMethod: "VIETQR",
    status: "REFUNDED",
    refundReason: "Khách hàng chuyển khoản nhầm 2 lần vào cùng một tin đăng",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

export class TransactionRepository {
  static async getAll(filter?: { status?: string; method?: string }): Promise<TransactionItem[]> {
    let list = [...localTransactions];
    if (filter?.status) {
      list = list.filter((t) => t.status === filter.status);
    }
    if (filter?.method) {
      list = list.filter((t) => t.paymentMethod === filter.method);
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static async confirm(
    id: string,
    adminUser?: { id: string; name: string }
  ): Promise<TransactionItem | null> {
    const tx = localTransactions.find((t) => t.id === id);
    if (!tx) return null;

    const before = tx.status;
    tx.status = "COMPLETED";
    tx.updatedAt = new Date().toISOString();

    await AuditLogRepository.log({
      userId: adminUser?.id || "system",
      userName: adminUser?.name || "Hệ thống",
      userRole: "ADMIN",
      action: "transaction.confirm",
      entity: "Transaction",
      entityId: id,
      before: { status: before },
      after: { status: "COMPLETED", amount: tx.amount },
      severity: "INFO",
    });

    return tx;
  }

  static async refund(
    id: string,
    reason: string,
    adminUser?: { id: string; name: string }
  ): Promise<TransactionItem | null> {
    const tx = localTransactions.find((t) => t.id === id);
    if (!tx) return null;

    const before = tx.status;
    tx.status = "REFUNDED";
    tx.refundReason = reason;
    tx.updatedAt = new Date().toISOString();

    await AuditLogRepository.log({
      userId: adminUser?.id || "system",
      userName: adminUser?.name || "Hệ thống",
      userRole: "SUPER_ADMIN",
      action: "transaction.refund",
      entity: "Transaction",
      entityId: id,
      before: { status: before },
      after: { status: "REFUNDED", amount: tx.amount, reason },
      severity: "WARNING",
    });

    return tx;
  }
}

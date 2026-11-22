import { TransactionRepository } from "@/lib/repositories/transaction.repo";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { TransactionsClient } from "./transactions-client";

export const revalidate = 0;

export default async function AdminGiaoDichPage() {
  const transactions = await TransactionRepository.getAll();

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "Quản lý giao dịch" }]} />
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Quản lý giao dịch & Đối soát thanh toán
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Xác nhận chuyển khoản ngân hàng qua ảnh bill, quản lý nạp tiền ví và hoàn tiền giao dịch
        </p>
      </div>

      <TransactionsClient initialTransactions={transactions} />
    </div>
  );
}

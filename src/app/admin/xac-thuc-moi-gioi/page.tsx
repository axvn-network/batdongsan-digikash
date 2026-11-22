import { UserRepository } from "@/lib/repositories/user.repo";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";
import { AgentVerifyClient } from "./agent-verify-client";

export const revalidate = 0;

export default async function AdminXacThucMoiGioiPage() {
  const users = await UserRepository.getAll();
  // Filter agents needing verification or already verified
  const agents = users.filter((u) => u.role === "AGENT" || u.role === "VERIFIED_AGENT" || u.agentCertificate);

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: "Xác thực hồ sơ môi giới (Agent Verification)" }]} />
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Kiểm duyệt chứng chỉ hành nghề môi giới BĐS
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Quy trình thẩm định pháp lý chứng chỉ do Sở Xây Dựng cấp và cấp huy hiệu Môi Giới Xác Thực (VERIFIED_AGENT)
        </p>
      </div>

      <AgentVerifyClient initialAgents={agents} />
    </div>
  );
}

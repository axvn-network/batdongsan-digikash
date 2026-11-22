"use client";

import React, { useState } from "react";
import { User } from "@/types";
import { formatDateVi } from "@/lib/utils";
import { StatusBadge } from "@/components/admin/status-badge";
import { ReasonDialog } from "@/components/admin/reason-dialog";
import { 
  Award, 
  ShieldCheck, 
  Check, 
  X, 
  FileText, 
  Eye, 
  UserCheck, 
  Calendar,
  CreditCard,
  Building
} from "lucide-react";
import { useRouter } from "next/navigation";

interface AgentVerifyClientProps {
  initialAgents: User[];
}

export function AgentVerifyClient({ initialAgents }: AgentVerifyClientProps) {
  const router = useRouter();
  const [agents, setAgents] = useState<User[]>(initialAgents);
  const [previewDocUrl, setPreviewDocUrl] = useState<string | null>(null);
  const [selectedAgentForReject, setSelectedAgentForReject] = useState<User | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleApprove = async (agentId: string) => {
    setLoadingId(agentId);
    try {
      const res = await fetch(`/api/admin/agents/${agentId}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: true }),
      });
      if (res.ok) {
        setAgents((prev) =>
          prev.map((a) =>
            a.id === agentId
              ? {
                  ...a,
                  role: "VERIFIED_AGENT",
                  agentCertificate: a.agentCertificate
                    ? { ...a.agentCertificate, status: "VERIFIED" }
                    : undefined,
                }
              : a
          )
        );
        router.refresh();
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handleRejectConfirm = async (reason: string) => {
    if (!selectedAgentForReject) return;
    setLoadingId(selectedAgentForReject.id);
    try {
      const res = await fetch(`/api/admin/agents/${selectedAgentForReject.id}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: false, reason }),
      });
      if (res.ok) {
        setAgents((prev) =>
          prev.map((a) =>
            a.id === selectedAgentForReject.id
              ? {
                  ...a,
                  role: "AGENT",
                  agentCertificate: a.agentCertificate
                    ? { ...a.agentCertificate, status: "REJECTED" }
                    : undefined,
                }
              : a
          )
        );
        setSelectedAgentForReject(null);
        router.refresh();
      }
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent) => {
          const cert = agent.agentCertificate;
          const isVerified = agent.role === "VERIFIED_AGENT" || cert?.status === "VERIFIED";

          return (
            <div
              key={agent.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={agent.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"}
                    alt=""
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{agent.name}</h3>
                    <p className="text-xs text-gray-500">{agent.email}</p>
                    <p className="text-xs text-gray-500 font-medium">SĐT: {agent.phone || "0912345678"}</p>
                  </div>
                </div>

                <StatusBadge status={agent.role} />
              </div>

              {/* Certificate details */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-700">
                  <span className="text-gray-400">Số chứng chỉ:</span>
                  <span className="font-mono font-bold text-gray-900">
                    {cert?.certNumber || "BDS-HCM-2023-0899"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span className="text-gray-400">CCCD/CMND:</span>
                  <span className="font-mono font-semibold">{cert?.idCard || "079095012345"}</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span className="text-gray-400">Ngày cấp:</span>
                  <span className="font-medium">{cert?.issueDate || "15/06/2023"}</span>
                </div>
              </div>

              {/* Document Preview Thumbnail with Watermark badge */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 group bg-gray-100">
                <img
                  src={cert?.documentUrl || "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=800&q=80"}
                  alt="Chứng chỉ"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setPreviewDocUrl(cert?.documentUrl || "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=1200&q=80")}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-black/75 rounded-lg flex items-center gap-1.5 hover:bg-black"
                  >
                    <Eye className="w-4 h-4" />
                    Xem bản sao chứng chỉ
                  </button>
                </div>
                <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-amber-500/90 text-white px-2 py-0.5 rounded shadow">
                  Bản sao lưu nội bộ DigiKash
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-400">
                  {isVerified ? "✓ Đã được phê duyệt" : "Chờ thẩm định"}
                </span>

                <div className="flex items-center space-x-2">
                  {!isVerified ? (
                    <>
                      <button
                        onClick={() => handleApprove(agent.id)}
                        disabled={loadingId === agent.id}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
                      >
                        <Check className="w-4 h-4" />
                        Duyệt xác thực
                      </button>
                      <button
                        onClick={() => setSelectedAgentForReject(agent)}
                        disabled={loadingId === agent.id}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-sm"
                      >
                        <X className="w-4 h-4" />
                        Từ chối
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setSelectedAgentForReject(agent)}
                      disabled={loadingId === agent.id}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Thu hồi xác thực
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Watermarked Document Preview Modal */}
      {previewDocUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 space-y-4 relative">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                Hồ sơ chứng chỉ hành nghề môi giới BĐS
              </h3>
              <button
                onClick={() => setPreviewDocUrl(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document with visible watermark */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-900 flex items-center justify-center">
              <img src={previewDocUrl} alt="Chứng chỉ" className="w-full h-full object-contain" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="text-white/25 text-3xl sm:text-5xl font-black rotate-[-30deg] uppercase tracking-widest text-center">
                  Bản sao lưu nội bộ<br />DigiKash Vietnam
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setPreviewDocUrl(null)}
                className="px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Dialog */}
      <ReasonDialog
        isOpen={Boolean(selectedAgentForReject)}
        title={`Từ chối / Thu hồi chứng chỉ: ${selectedAgentForReject?.name}`}
        description="Nhập lý do thẩm định không đạt (ví dụ: Chứng chỉ hết hạn, số hiệu không tra cứu được trên cổng Sở Xây Dựng...)"
        presetReasons={[
          "Số chứng chỉ không tra cứu được trên cơ sở dữ liệu Sở Xây Dựng",
          "Ảnh chụp chứng chỉ mờ, mất góc hoặc có dấu hiệu chỉnh sửa",
          "Thông tin họ tên hoặc số CCCD không trùng khớp với hồ sơ",
          "Chứng chỉ hành nghề đã hết thời hạn hiệu lực",
        ]}
        confirmText="Xác nhận"
        isLoading={Boolean(loadingId)}
        onConfirm={handleRejectConfirm}
        onClose={() => setSelectedAgentForReject(null)}
      />
    </div>
  );
}

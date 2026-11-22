import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  subtext?: string;
}

export function StatCard({ title, value, change, isPositive, icon: Icon, subtext }: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</span>
        <div className="p-2.5 bg-red-50 text-[#E03C31] rounded-xl">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-black text-gray-900 tracking-tight">{value}</span>
        {change && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
          }`}>
            {change}
          </span>
        )}
      </div>

      {subtext && <p className="text-[11px] text-gray-400 font-medium">{subtext}</p>}
    </div>
  );
}

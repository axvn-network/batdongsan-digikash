import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "vip" | "success";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-[#E03C31] text-white hover:bg-[#B8281F]",
    secondary: "border-transparent bg-gray-100 text-gray-800",
    destructive: "border-transparent bg-red-500 text-white",
    outline: "border-gray-200 text-gray-700",
    vip: "border-transparent bg-amber-500 text-white font-bold",
    success: "border-transparent bg-emerald-600 text-white",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };

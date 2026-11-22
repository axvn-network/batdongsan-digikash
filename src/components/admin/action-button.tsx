"use client";

import React from "react";
import { useSession } from "@/hooks/use-session";
import { PermissionKey } from "@/types";
import { can } from "@/lib/auth/rbac";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  permission?: PermissionKey;
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost" | "success";
  size?: "sm" | "md" | "lg";
  icon?: React.ComponentType<{ className?: string }>;
  loading?: boolean;
}

export function ActionButton({
  permission,
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  loading = false,
  disabled,
  className = "",
  ...props
}: ActionButtonProps) {
  const { user } = useSession();

  // If permission required and user lacks it, disable or hide
  const hasPerm = permission ? can(user, permission) : true;

  if (!hasPerm) {
    return null;
  }

  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-2.5 py-1.5 text-xs gap-1.5",
    md: "px-3.5 py-2 text-sm gap-2",
    lg: "px-4 py-2.5 text-base gap-2.5",
  }[size];

  const variantStyles = {
    primary: "bg-[#E03C31] text-white hover:bg-[#B8281F] focus:ring-red-400 shadow-sm",
    secondary: "bg-slate-800 text-white hover:bg-slate-750 focus:ring-slate-500 shadow-sm",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-400 shadow-sm",
    success: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-400 shadow-sm",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-300 shadow-sm",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-200",
  }[variant];

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
      ) : Icon ? (
        <Icon className="w-4 h-4 flex-shrink-0" />
      ) : null}
      {children}
    </button>
  );
}

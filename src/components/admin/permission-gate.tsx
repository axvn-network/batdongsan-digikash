"use client";

import React from "react";
import { useSession } from "@/hooks/use-session";
import { PermissionKey } from "@/types";
import { can } from "@/lib/auth/rbac";

interface PermissionGateProps {
  permission: PermissionKey;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Component kiểm tra quyền người dùng ở phía Client
 * Nếu người dùng có quyền thì render children, ngược lại hiển thị fallback hoặc ẩn.
 */
export function PermissionGate({ permission, children, fallback = null }: PermissionGateProps) {
  const { user } = useSession();

  if (!can(user, permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

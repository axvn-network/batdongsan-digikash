export type UserRole = 
  | 'GUEST'
  | 'USER'
  | 'AGENT'
  | 'VERIFIED_AGENT'
  | 'MODERATOR'
  | 'ADMIN'
  | 'SUPER_ADMIN';

export interface UserPermissionOverride {
  userId: string;
  permission: string;
  granted: boolean; // true = cấp thêm, false = thu hồi
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  avatar?: string | null;
  role: UserRole;
  isBlocked?: boolean;
  walletBalance?: number; // Số dư ví (VND)
  agentCertificate?: {
    certNumber: string;
    issueDate: string;
    idCard: string;
    verifiedAt?: string;
    documentUrl?: string;
    status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  };
  customPermissions?: UserPermissionOverride[];
  createdAt: string;
  updatedAt?: string;
}

export interface UserSession {
  user: User;
  token: string;
}

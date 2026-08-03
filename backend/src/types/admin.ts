export interface AdminProfile {
  id: string;
  email: string;
  role: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalUsers: number;
  premiumUsers: number;
  todayMatches: number;
  activeSubscriptions: number;
  revenue: number;
  upcomingMatches: number;
}

export interface AuditLogEntry {
  id: string;
  adminId?: string;
  action: string;
  details?: string;
  ip?: string;
  createdAt: Date;
}

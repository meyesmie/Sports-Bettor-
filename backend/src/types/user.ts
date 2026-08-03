export interface UserProfile {
  id: string;
  email: string;
  fullName: string | null;
  emailVerified: boolean;
  subscribed: boolean;
  subscriptionExp: Date | null;
  createdAt: Date;
}

export interface UserUpdateInput {
  fullName?: string;
  email?: string;
}

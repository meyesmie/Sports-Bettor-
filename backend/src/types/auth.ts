export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  fullName?: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  userId?: string;
  adminId?: string;
}

export interface ResetPasswordInput {
  token: string;
  newPassword: string;
}

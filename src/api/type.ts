export interface IUserRole {
  USER: "USER";
  ADMIN: "ADMIN";
}

export interface ErrorResponse {
  message: string | string[];
}

export interface User {
  id: string;
  fullname: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  otpToken: string | null;
  role: IUserRole;
  tokenVersion: number;
  isGoogleRegister: boolean;
  isFacebookRegister: boolean;
  createdAt: string;
  updatedAt: string;
  profileImage: string;
  web3Nickname?: string;
  enableTwofactorAuth: boolean;
}
